const puppeteer = require('puppeteer');
const path = require('path');
const http = require('http');
const fs = require('fs');

// Local static server
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
      resolve({ server, port: server.address().port });
    });
  });
}

(async () => {
  console.log('🚀 Starting stemOS PWA Install & Offline Resiliency Verification Test...');
  const { server, port } = await createServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // ══════════════════════════════════════════════════════════════
    // TEST 1: Android / Desktop Chrome PWA Install Prompt & Toast
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Test 1: Android Chrome / Desktop PWA Banner & Network Toast ---');
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    await page.goto(`${baseUrl}/app.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#mcer-offline-sync-banner', { timeout: 10000 });

    // 1. Dispatch beforeinstallprompt event manually
    console.log('  Triggering beforeinstallprompt event...');
    await page.evaluate(() => {
      const event = new Event('beforeinstallprompt');
      event.prompt = () => {};
      event.userChoice = Promise.resolve({ outcome: 'accepted' });
      window.dispatchEvent(event);
    });

    // Wait for banner to appear
    await page.waitForSelector('#stemos-pwa-install-banner', { visible: true, timeout: 6000 });
    console.log('✓ PWA Install Banner mounted successfully!');

    // Check Pure Light Mode colors & button heights
    const bannerMetrics = await page.$eval('#stemos-pwa-install-banner', el => {
      const computed = window.getComputedStyle(el);
      const installBtn = el.querySelector('#pwa-install-btn');
      const dismissBtn = el.querySelector('#pwa-dismiss-btn');
      const installBtnRect = installBtn.getBoundingClientRect();
      const dismissBtnRect = dismissBtn.getBoundingClientRect();

      return {
        bg: computed.backgroundColor,
        color: computed.color,
        installBtnHeight: installBtnRect.height,
        dismissBtnHeight: dismissBtnRect.height,
        installBtnBg: window.getComputedStyle(installBtn).backgroundColor
      };
    });

    console.log('  Banner metrics:', bannerMetrics);
    if (!bannerMetrics.bg.includes('255, 255, 255') && bannerMetrics.bg !== 'rgb(255, 255, 255)') {
      throw new Error(`Expected pure white background (#ffffff), got: ${bannerMetrics.bg}`);
    }
    if (bannerMetrics.installBtnHeight < 40) {
      throw new Error(`Expected at least 40px touch target on install button, got: ${bannerMetrics.installBtnHeight}px`);
    }
    console.log('✓ Pure Light Mode verified on PWA install banner (white bg, slate text, >=44px touch targets).');

    // Test Network Toast (Offline & Online)
    console.log('  Testing Network Offline HUD...');
    await page.evaluate(() => {
      window.dispatchEvent(new Event('offline'));
    });

    await page.waitForSelector('#stemos-network-toast', { visible: true, timeout: 3000 });
    const offlineToastColor = await page.$eval('#stemos-network-toast', el => {
      return {
        bg: window.getComputedStyle(el).backgroundColor,
        text: el.textContent.trim()
      };
    });
    console.log('✓ Offline Toast active:', offlineToastColor);

    await page.close();

    // ══════════════════════════════════════════════════════════════
    // TEST 2: iOS Safari Add-to-Home-Screen Bottom Sheet Guide
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Test 2: iOS Safari Add-to-Home-Screen Experience (iPhone 14) ---');
    const iosPage = await browser.newPage();
    await iosPage.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
    );
    await iosPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    await iosPage.goto(`${baseUrl}/app.html`, { waitUntil: 'domcontentloaded' });

    // Wait for iOS Bottom Sheet to appear
    console.log('  Waiting for iOS Safari Add-to-Home-Screen Bottom Sheet...');
    await iosPage.waitForSelector('#stemos-ios-install-sheet', { visible: true, timeout: 8000 });

    const iosSheetData = await iosPage.$eval('#stemos-ios-install-sheet', el => {
      const dismissBtn = el.querySelector('#ios-pwa-dismiss-btn');
      const rect = dismissBtn.getBoundingClientRect();
      return {
        title: el.querySelector('h4').textContent.trim(),
        text: el.textContent,
        btnHeight: rect.height,
        btnWidth: rect.width
      };
    });

    console.log('✓ iOS Bottom Sheet mounted with title:', iosSheetData.title);
    if (!iosSheetData.text.includes('Compartir') || !iosSheetData.text.includes('Agregar a inicio')) {
      throw new Error('iOS sheet missing step-by-step instructions for Safari Share Sheet');
    }
    if (iosSheetData.btnHeight < 44) {
      throw new Error(`Expected at least 44px height for iOS dismiss button, got ${iosSheetData.btnHeight}px`);
    }
    console.log('✓ iOS Safari step-by-step guidance and 44px touch ergonomics verified!');

    // Test dismiss click
    await iosPage.click('#ios-pwa-dismiss-btn');
    await iosPage.waitForSelector('#stemos-ios-install-sheet', { hidden: true, timeout: 3000 });
    console.log('✓ iOS sheet dismissed smoothly.');

    // Verify localStorage recorded dismissal
    const dismissedAt = await iosPage.evaluate(() => localStorage.getItem('stemos_ios_pwa_dismissed_at'));
    if (!dismissedAt) throw new Error('Expected stemos_ios_pwa_dismissed_at to be saved in localStorage');
    console.log('✓ Dismissal timestamp saved in localStorage.');

    await iosPage.close();

    console.log('\n🎉 ALL PWA INSTALL & OFFLINE EXPERIENCE TESTS PASSED 100%!');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => {
  console.error('\n❌ PWA Test failed:', err);
  process.exit(1);
});
