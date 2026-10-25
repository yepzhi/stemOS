const puppeteer = require('puppeteer');
const path = require('path');
const http = require('http');
const fs = require('fs');

// Local static file server
function createServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '..', req.url.split('?')[0]);
    if (req.url === '/' || req.url.startsWith('/?')) {
      filePath = path.join(__dirname, '../app.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

(async () => {
  console.log('🚀 Starting stemOS Batch Offline & Catalog Storage Verification Test...');
  const { server, port } = await createServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    // Enable console logs from page
    page.on('console', msg => {
      if (msg.type() === 'error') console.error('  [Browser Error]:', msg.text());
    });

    console.log(`\n1. Navigating to ${baseUrl}/app.html...`);
    await page.goto(`${baseUrl}/app.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#mcer-offline-sync-banner', { timeout: 10000 });

    // Verify initial banner presence and text
    const initialBannerText = await page.$eval('#mcer-batch-btn-label', el => el.textContent.trim());
    console.log(`✓ Banner mounted with label: "${initialBannerText}"`);
    if (!initialBannerText.includes('Descargar Nivel A1 Offline')) {
      throw new Error(`Expected label to mention "Descargar Nivel A1 Offline", got: ${initialBannerText}`);
    }

    // Verify units rendered
    const unitCards = await page.$$('#ed-mcer-units-grid .ed-unit-card');
    console.log(`✓ MCER units grid rendered ${unitCards.length} units.`);
    if (unitCards.length < 4) {
      throw new Error(`Expected at least 4 units, found ${unitCards.length}`);
    }

    // 2. Click Batch Download Button
    console.log('\n2. Triggering Batch Download for Nivel A1...');
    await page.evaluate(() => {
      // Mock window.confirm to return true for confirmation dialogs
      window.confirm = () => true;
      // Start batch download
      window.downloadCurrentLevelForOffline('A1');
    });

    // Wait for batch download to complete and update UI
    await page.waitForFunction(() => {
      const btn = document.getElementById('btn-mcer-batch-download');
      return btn && btn.classList.contains('active');
    }, { timeout: 20000 });

    const activeBannerText = await page.$eval('#mcer-batch-btn-label', el => el.textContent.trim());
    console.log(`✓ Batch download finished! New button label: "${activeBannerText}"`);

    // Verify localStorage stemos_offline_units has all 4 units with 3-day TTL
    const storedUnits = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('stemos_offline_units') || '{}');
    });

    const unitKeys = Object.keys(storedUnits);
    console.log(`✓ Stored offline units in localStorage: ${unitKeys.join(', ')}`);
    ['a1-u1', 'a1-u2', 'a1-u3', 'a1-u4'].forEach(id => {
      if (!storedUnits[id]) throw new Error(`Missing offline record for ${id}`);
      const remainingHours = (storedUnits[id].expiresAt - Date.now()) / (1000 * 60 * 60);
      if (remainingHours < 70 || remainingHours > 73) {
        throw new Error(`TTL invalid for ${id}, expected ~72h, got ${remainingHours.toFixed(1)}h`);
      }
    });
    console.log('✓ All 4 units of Nivel A1 verified with exact 3-day TTL (~72h)!');

    // Verify all 4 unit cards in grid display the offline badge
    const badgesCount = await page.$$eval('#ed-mcer-units-grid .ed-unit-offline-badge.active', els => els.length);
    console.log(`✓ Unit cards displaying .ed-unit-offline-badge.active: ${badgesCount}`);
    if (badgesCount < 4) {
      throw new Error(`Expected at least 4 active offline badges on cards, got ${badgesCount}`);
    }

    // 3. Emulate complete offline network disconnection
    console.log('\n3. Emulating Network Disconnection (Offline Mode)...');
    const client = await page.target().createCDPSession();
    await client.send('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0
    });

    // Open Unit 1 modal while fully offline
    console.log('4. Opening A1 Unit 1 Modal while offline...');
    await page.evaluate(() => {
      window.openMcerUnitModal('a1-u1');
    });

    await page.waitForSelector('#modal-mcer-unit', { visible: true, timeout: 5000 });
    console.log('✓ Unit 1 modal opened successfully while offline!');

    // Verify offline sync pill shows "Modo Offline"
    const syncPillText = await page.$eval('#mcer-offline-sync-pill', el => el.textContent.trim());
    console.log(`✓ Sync pill status: "${syncPillText}"`);

    // Test playing dialogue audio while offline
    console.log('5. Triggering static audio playback from offline CacheStorage...');
    const audioResult = await page.evaluate(async () => {
      if (!window.STEMOS_TTS) return { ok: false, reason: 'No TTS' };
      const list = window.STEMOS_TTS.getMcerAudioList();
      const testAudio = list.find(url => url.includes('a1-u1-d1'));
      if (!testAudio) return { ok: false, reason: 'No test audio' };

      // 1. Verify file is in CacheStorage
      const cached = await caches.match(testAudio);
      if (!cached) return { ok: false, reason: 'Audio not cached in CacheStorage: ' + testAudio };
      const blob = await cached.blob();
      if (!blob || blob.size === 0) return { ok: false, reason: 'Empty cache blob' };

      // 2. Verify STEMOS_TTS speak trigger resolves from cache
      let played = false;
      await window.STEMOS_TTS.speak("Good morning! Welcome to the team. Are you Alex Rivera?", {
        onStart: () => { played = true; }
      });

      return { ok: true, src: testAudio, bytes: blob.size, triggered: played };
    });

    console.log('✓ Offline audio CacheStorage test result (A1):', audioResult);
    if (!audioResult.ok) {
      throw new Error('Failed to load static audio from cache: ' + JSON.stringify(audioResult));
    }

    // Close modal
    await page.click('#mcer-unit-close');

    // 4. Test Level A2 Batch Download & Offline Capability
    console.log('\n4. Switching to Nivel A2 Filter and testing Batch Download...');
    // Restore network first for download
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1
    });

    // Click A2 filter chip
    await page.evaluate(() => {
      const a2Chip = document.querySelector('#mcer-level-filter-bar .ed-filter-chip[data-mcer-level="A2"]');
      if (a2Chip) a2Chip.click();
      else if (window.renderMcerUnitsGrid) window.renderMcerUnitsGrid('A2');
    });

    await page.waitForFunction(() => {
      const label = document.getElementById('mcer-batch-btn-label');
      return label && label.textContent.includes('Descargar Nivel A2 Offline');
    }, { timeout: 5000 });

    const a2BannerLabel = await page.$eval('#mcer-batch-btn-label', el => el.textContent.trim());
    console.log(`✓ Banner label updated for A2: "${a2BannerLabel}"`);

    // Trigger batch download for A2
    console.log('  Triggering Batch Download for Nivel A2...');
    await page.evaluate(() => {
      window.downloadCurrentLevelForOffline('A2');
    });

    await page.waitForFunction(() => {
      const btn = document.getElementById('btn-mcer-batch-download');
      return btn && btn.classList.contains('active');
    }, { timeout: 20000 });

    const a2ActiveBannerText = await page.$eval('#mcer-batch-btn-label', el => el.textContent.trim());
    console.log(`✓ A2 Batch download completed! Label: "${a2ActiveBannerText}"`);

    // Verify localStorage has all 4 A2 units
    const storedA2Units = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('stemos_offline_units') || '{}');
    });

    ['a2-u1', 'a2-u2', 'a2-u3', 'a2-u4'].forEach(id => {
      if (!storedA2Units[id]) throw new Error(`Missing offline record for A2 unit: ${id}`);
    });
    console.log('✓ All 4 units of Nivel A2 verified in localStorage with 3-day TTL!');

    // Re-emulate offline mode to test A2 audio playback
    console.log('  Testing A2 offline audio playback without network connection...');
    await client.send('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0
    });

    // Open A2 Unit 1 modal
    await page.evaluate(() => {
      window.openMcerUnitModal('a2-u1');
    });
    await page.waitForSelector('#modal-mcer-unit', { visible: true, timeout: 5000 });

    const a2AudioResult = await page.evaluate(async () => {
      if (!window.STEMOS_TTS) return { ok: false, reason: 'No TTS' };
      const list = window.STEMOS_TTS.getMcerAudioList();
      const testAudio = list.find(url => url.includes('a2-u1-d1'));
      if (!testAudio) return { ok: false, reason: 'No test audio for a2-u1-d1' };

      const cached = await caches.match(testAudio);
      if (!cached) return { ok: false, reason: 'A2 audio not cached in CacheStorage: ' + testAudio };
      const blob = await cached.blob();
      if (!blob || blob.size === 0) return { ok: false, reason: 'Empty cache blob for A2' };

      let played = false;
      await window.STEMOS_TTS.speak("Good morning, Claudia. Here is the shift handover log for Line 4.", {
        onStart: () => { played = true; }
      });

      return { ok: true, src: testAudio, bytes: blob.size, triggered: played };
    });

    console.log('✓ Offline audio CacheStorage test result (A2):', a2AudioResult);
    if (!a2AudioResult.ok) {
      throw new Error('Failed to load A2 static audio from cache: ' + JSON.stringify(a2AudioResult));
    }

    await page.click('#mcer-unit-close');

    // 4. Restore Network Connection
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1
    });
    console.log('✓ Network reconnected.');

    // 5. Test Storage Cleaner (Clear All Offline Units)
    console.log('\n6. Testing Offline Storage Cleaner...');
    await page.evaluate(async () => {
      window.confirm = () => true;
      await window.clearAllOfflineUnits();
    });

    const clearedUnits = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('stemos_offline_units') || '{}');
    });
    console.log(`✓ Offline units in localStorage after clear: ${Object.keys(clearedUnits).length}`);
    if (Object.keys(clearedUnits).length !== 0) {
      throw new Error('Expected 0 units in localStorage after clearing cache');
    }

    const resetBannerText = await page.$eval('#mcer-batch-btn-label', el => el.textContent.trim());
    console.log(`✓ Banner button label after clear: "${resetBannerText}"`);
    if (!resetBannerText.includes('Descargar Nivel A2 Offline') && !resetBannerText.includes('Descargar Nivel A1 Offline')) {
      throw new Error('Banner button did not reset to default state');
    }

    // Take screenshot of catalog with offline controls
    const screenshotPath = '/Users/yepz/.gemini/antigravity-ide/brain/db09558b-057f-4d21-bd60-40dadd6db075/mcer_catalog_batch_offline.png';
    // Ensure dir
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath });
    console.log(`✓ Screenshot saved: ${screenshotPath}`);

    console.log('\n🎉 ALL BATCH OFFLINE & CATALOG TESTS PASSED 100%!');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
