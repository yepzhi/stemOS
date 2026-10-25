const puppeteer = require('puppeteer');
const path = require('path');
const http = require('http');
const fs = require('fs');

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
  const { server, port } = await createServer();
  const baseUrl = `http://127.0.0.1:${port}`;
  const artifactDir = '/Users/yepz/.gemini/antigravity-ide/brain/db09558b-057f-4d21-bd60-40dadd6db075';

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Viewport
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${baseUrl}/app.html`, { waitUntil: 'networkidle2' });

    // Download A1 offline to show active badges
    await page.evaluate(async () => {
      window.confirm = () => true;
      await window.downloadCurrentLevelForOffline('A1');
      const el = document.getElementById('mcer-offline-sync-banner');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));

    await page.screenshot({ path: path.join(artifactDir, 'mcer_catalog_batch_offline_desktop.png'), fullPage: false });
    console.log('✓ Desktop screenshot captured');

    // 2. Open Unit Modal
    await page.evaluate(() => {
      window.openMcerUnitModal('a1-u1');
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(artifactDir, 'mcer_unit_modal_offline_desktop.png'), fullPage: false });
    console.log('✓ Modal screenshot captured');

    // Close modal
    await page.click('#mcer-unit-close');
    await new Promise(r => setTimeout(r, 400));

    // 3. Mobile Viewport (iPhone 14)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
      const el = document.getElementById('mcer-offline-sync-banner');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactDir, 'mcer_catalog_batch_offline_mobile.png'), fullPage: false });
    console.log('✓ Mobile screenshot captured');

    console.log('All screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
