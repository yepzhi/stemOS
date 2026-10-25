const puppeteer = require('puppeteer');
const path = require('path');
const http = require('http');
const fs = require('fs');

// Simple static HTTP server for testing
function startStaticServer(port = 8189) {
  const root = path.join(__dirname, '..');
  const server = http.createServer((req, res) => {
    let filePath = path.join(root, req.url.split('?')[0]);
    if (filePath.endsWith('/')) filePath += 'index.html';

    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.svg': 'image/svg+xml'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

(async () => {
  console.log('🚀 [TEST] Starting Offline Download, 3-Day Expiry & Static Audio Test...');
  const server = await startStaticServer(8189);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Open app
    await page.goto('http://127.0.0.1:8189/app.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.STEMOS_MCER_TRACKS !== 'undefined');

    console.log('✅ Page loaded with STEMOS_MCER_TRACKS');

    // 1. Verify STEMOS_TTS has MCER_STATIC_AUDIO & getMcerAudioList
    const ttsCheck = await page.evaluate(() => {
      return {
        hasTTS: !!window.STEMOS_TTS,
        hasAudioList: typeof window.STEMOS_TTS.getMcerAudioList === 'function',
        audioCount: window.STEMOS_TTS.getMcerAudioList().length,
        version: window.STEMOS_TTS.version
      };
    });
    console.log('✅ STEMOS_TTS check:', ttsCheck);
    if (!ttsCheck.hasTTS || ttsCheck.audioCount === 0) {
      throw new Error('STEMOS_TTS getMcerAudioList failed or returned 0 audios');
    }

    // 2. Open A1 Unit 1 Modal
    await page.evaluate(() => {
      window.openMcerUnitModal('a1-u1', true);
    });

    const isModalOpen = await page.evaluate(() => {
      const modal = document.getElementById('modal-mcer-unit');
      return modal && modal.hasAttribute('open');
    });
    console.log('✅ Modal open state:', isModalOpen);
    if (!isModalOpen) throw new Error('Modal did not open');

    // 3. Check Offline Download Button
    const btnState = await page.evaluate(() => {
      const btn = document.getElementById('btn-mcer-offline-toggle');
      const label = document.getElementById('mcer-offline-btn-label');
      return {
        exists: !!btn,
        text: label ? label.textContent.trim() : '',
        className: btn ? btn.className : ''
      };
    });
    console.log('✅ Offline button initial state:', btnState);
    if (!btnState.exists || !btnState.text.includes('Descargar Offline')) {
      throw new Error('Offline button not found or incorrect initial label');
    }

    // 4. Download Unit for Offline
    await page.evaluate(async () => {
      await window.downloadMcerUnitForOffline('a1-u1');
    });

    // Check localStorage
    const offlineRecord = await page.evaluate(() => {
      const raw = localStorage.getItem('stemos_offline_units');
      const units = raw ? JSON.parse(raw) : {};
      return units['a1-u1'] || null;
    });
    console.log('✅ Offline storage record:', {
      unitId: offlineRecord.unitId,
      audioCount: offlineRecord.audioCount,
      hasExpiry: !!offlineRecord.expiresAt,
      hoursRemaining: Math.round((offlineRecord.expiresAt - offlineRecord.downloadedAt) / 3600000)
    });

    if (!offlineRecord || offlineRecord.unitId !== 'a1-u1') {
      throw new Error('Offline record not saved in localStorage');
    }
    const ttlHours = Math.round((offlineRecord.expiresAt - offlineRecord.downloadedAt) / 3600000);
    if (ttlHours !== 72) {
      throw new Error(`Expected 72 hours TTL (3 days), got ${ttlHours}`);
    }

    // 5. Verify Button UI updated to Active with Remaining Days
    const btnActiveState = await page.evaluate(() => {
      const btn = document.getElementById('btn-mcer-offline-toggle');
      const label = document.getElementById('mcer-offline-btn-label');
      return {
        isActive: btn.classList.contains('active'),
        text: label.textContent.trim()
      };
    });
    console.log('✅ Offline button active state:', btnActiveState);
    if (!btnActiveState.isActive || !btnActiveState.text.includes('Offline Activo')) {
      throw new Error('Button did not update to active offline state');
    }

    // 6. Test 3-Day Expiration Eviction
    const expiryTest = await page.evaluate(() => {
      const raw = JSON.parse(localStorage.getItem('stemos_offline_units') || '{}');
      // Set to 1 hour in the past (expired)
      raw['a1-u1'].expiresAt = Date.now() - 3600000;
      localStorage.setItem('stemos_offline_units', JSON.stringify(raw));

      // Trigger expiration check
      window.updateMcerOfflineButtonUI('a1-u1');

      const after = JSON.parse(localStorage.getItem('stemos_offline_units') || '{}');
      const btn = document.getElementById('btn-mcer-offline-toggle');
      const label = document.getElementById('mcer-offline-btn-label');
      return {
        wasEvicted: !after['a1-u1'],
        buttonLabel: label.textContent.trim(),
        isExpiredOrReset: !btn.classList.contains('active')
      };
    });
    console.log('✅ 3-Day Expiration Eviction Test:', expiryTest);
    if (!expiryTest.wasEvicted || !expiryTest.isExpiredOrReset) {
      throw new Error('Expired offline unit was not automatically evicted');
    }

    // Re-download for subsequent tests
    await page.evaluate(async () => {
      await window.downloadMcerUnitForOffline('a1-u1');
    });

    // 7. Test Offline Mutation Enqueuing & Firestore Sync
    const syncTest = await page.evaluate(async () => {
      if (!window.STEMOS_SYNC) return { error: 'No STEMOS_SYNC' };

      // Enqueue progress mutation
      const mut = await window.STEMOS_SYNC.enqueueMutation('MCER_UNIT_PROGRESS', 'SAVE_PROGRESS', {
        unitId: 'a1-u1',
        unitTitle: 'Personal Introductions',
        score: 100,
        passed: true,
        xpEarned: 300,
        completedAt: new Date().toISOString()
      }, { strategy: 'XP_ACCUMULATIVE' });

      const pendingBefore = await window.STEMOS_SYNC.getPendingMutations();

      // Flush queue with cloud sync processor
      const flushResult = await window.STEMOS_SYNC.flushQueue(async (m) => {
        return { success: true, synced: true, mutationId: m.id };
      });

      return {
        mutationId: mut.id,
        pendingCountBefore: pendingBefore.length,
        flushSynced: flushResult.synced
      };
    });
    console.log('✅ Offline Mutation & Sync Test:', syncTest);
    if (syncTest.pendingCountBefore < 1 || syncTest.flushSynced < 1) {
      throw new Error('Sync mutation queue flush failed');
    }

    // 8. Test Static Audio Pre-rendered Lookup in SCRIPT_AUDIO_LOOKUP
    const audioLookupTest = await page.evaluate(() => {
      if (!window.STEMOS_PLACEMENT_TEST) return { error: 'No placement test' };
      // Test audio prompt matching
      let playedUrl = null;
      const originalAudio = window.Audio;
      window.Audio = function(url) {
        playedUrl = url;
        return {
          play: () => Promise.resolve(),
          pause: () => {}
        };
      };

      window.STEMOS_PLACEMENT_TEST.playAudioPrompt('are you alex rivera');
      window.Audio = originalAudio;

      return { playedUrl };
    });
    console.log('✅ Static Audio Lookup Test:', audioLookupTest);
    if (!audioLookupTest.playedUrl || !audioLookupTest.playedUrl.includes('a1-u1-d1.mp3')) {
      throw new Error(`Expected /content/audio/mcer/a1-u1-d1.mp3, got ${audioLookupTest.playedUrl}`);
    }

    console.log('\n🎉 ALL OFFLINE DOWNLOAD, 3-DAY EXPIRY & STATIC AUDIO TESTS PASSED!');

  } finally {
    await browser.close();
    server.close();
  }
})();
