/**
 * FASE 83 — Progressive Web App (PWA) Enterprise Installability, Offline Resiliency Engine & App Manifest Architecture
 * Test Suite: test_phase83_pwa_offline_manifest.cjs
 *
 * Verifies:
 * 1. manifest.json & manifest.webmanifest W3C compliance, standalone mode, shortcuts, and metadata
 * 2. Vector SVG Icons (192px, 512px, maskable) presence and validity
 * 3. Service Worker sw.js v6.4.0 resilient pre-caching, manifest inclusion, and offline fallbacks
 * 4. Client PWA lifecycle controller (content/stemos_pwa.js)
 * 5. Cross-portal HTML integration (manifest link, theme-color, apple-mobile-web-app-capable, stemos_pwa.js)
 * 6. Cloudflare _headers manifest MIME type and caching rules
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS — ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL — ${message}`);
  }
}

console.log('🚀 RUNNING PHASE 83 TEST SUITE: PWA ENTERPRISE INSTALLABILITY & OFFLINE ENGINE');
console.log('============================================================================\n');

// ─── SUITE 1: Web App Manifest W3C Compliance ───
console.log('📦 SUITE 1 — Web App Manifest Compliance');
const manifestPath = path.join(ROOT_DIR, 'manifest.json');
const webmanifestPath = path.join(ROOT_DIR, 'manifest.webmanifest');

assert(fs.existsSync(manifestPath), 'manifest.json exists in root directory');
assert(fs.existsSync(webmanifestPath), 'manifest.webmanifest exists in root directory');

let manifestData = null;
try {
  manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(true, 'manifest.json is valid JSON');
} catch (e) {
  assert(false, `manifest.json parsing error: ${e.message}`);
}

if (manifestData) {
  assert(manifestData.name && manifestData.name.includes('stemOS'), 'Manifest defines full name with stemOS');
  assert(manifestData.short_name === 'stemOS', 'Manifest defines short_name: stemOS');
  assert(manifestData.display === 'standalone', 'Manifest specifies display: standalone');
  assert(manifestData.start_url && manifestData.start_url.startsWith('/'), 'Manifest specifies valid start_url');
  assert(manifestData.background_color === '#030712', 'Manifest background_color matches deep obsidian palette');
  assert(manifestData.theme_color === '#0284c7', 'Manifest theme_color matches primary blue (#0284c7)');
  assert(Array.isArray(manifestData.icons) && manifestData.icons.length >= 3, 'Manifest defines at least 3 icons');

  const has192 = manifestData.icons.some(i => i.sizes === '192x192');
  const has512 = manifestData.icons.some(i => i.sizes === '512x512');
  const hasMaskable = manifestData.icons.some(i => i.purpose && i.purpose.includes('maskable'));

  assert(has192, 'Manifest includes 192x192 icon');
  assert(has512, 'Manifest includes 512x512 icon');
  assert(hasMaskable, 'Manifest includes maskable icon for Android adaptive icons');

  assert(Array.isArray(manifestData.shortcuts) && manifestData.shortcuts.length >= 4, 'Manifest defines shortcuts for main portals (>= 4)');
}

// ─── SUITE 2: Vector SVG Icons Integrity ───
console.log('\n🎨 SUITE 2 — Vector SVG Icons Integrity');
const icon192Path = path.join(ROOT_DIR, 'icon-192.svg');
const icon512Path = path.join(ROOT_DIR, 'icon-512.svg');
const iconMaskablePath = path.join(ROOT_DIR, 'icon-maskable.svg');

assert(fs.existsSync(icon192Path), 'icon-192.svg exists');
assert(fs.existsSync(icon512Path), 'icon-512.svg exists');
assert(fs.existsSync(iconMaskablePath), 'icon-maskable.svg exists');

if (fs.existsSync(icon192Path)) {
  const content = fs.readFileSync(icon192Path, 'utf8');
  assert(content.includes('<svg') && content.includes('viewBox="0 0 192 192"'), 'icon-192.svg is a valid 192x192 SVG');
  assert(content.includes('stem'), 'icon-192.svg contains stemOS visual branding');
}

if (fs.existsSync(icon512Path)) {
  const content = fs.readFileSync(icon512Path, 'utf8');
  assert(content.includes('<svg') && content.includes('viewBox="0 0 512 512"'), 'icon-512.svg is a valid 512x512 SVG');
}

if (fs.existsSync(iconMaskablePath)) {
  const content = fs.readFileSync(iconMaskablePath, 'utf8');
  assert(content.includes('<svg') && content.includes('viewBox="0 0 512 512"'), 'icon-maskable.svg is a valid 512x512 SVG');
}

// ─── SUITE 3: Service Worker v6.4.0 Offline Engine ───
console.log('\n⚡ SUITE 3 — Service Worker sw.js v6.4.0 Engine');
const swPath = path.join(ROOT_DIR, 'sw.js');
assert(fs.existsSync(swPath), 'sw.js exists');

if (fs.existsSync(swPath)) {
  const swContent = fs.readFileSync(swPath, 'utf8');
  assert(swContent.includes('v6.4.0') || swContent.includes('v6.5.0'), 'sw.js CACHE_NAME bumped to v6.4.0 or v6.5.0');
  assert(swContent.includes('/manifest.json'), 'sw.js precaches /manifest.json');
  assert(swContent.includes('/icon-192.svg'), 'sw.js precaches /icon-192.svg');
  assert(swContent.includes('/icon-512.svg'), 'sw.js precaches /icon-512.svg');
  assert(swContent.includes('/content/stemos_pwa.js'), 'sw.js precaches /content/stemos_pwa.js');
  assert(swContent.includes('Promise.allSettled'), 'sw.js uses resilient Promise.allSettled precaching');
  assert(swContent.includes('caches.match'), 'sw.js provides offline cache fallback on fetch failure');
}

// ─── SUITE 4: Client PWA Controller Module ───
console.log('\n📱 SUITE 4 — Client PWA Lifecycle Module (content/stemos_pwa.js)');
const pwaScriptPath = path.join(ROOT_DIR, 'content', 'stemos_pwa.js');
assert(fs.existsSync(pwaScriptPath), 'content/stemos_pwa.js exists');

if (fs.existsSync(pwaScriptPath)) {
  const pwaContent = fs.readFileSync(pwaScriptPath, 'utf8');
  assert(pwaContent.includes("navigator.serviceWorker.register('/sw.js'"), 'stemos_pwa.js registers /sw.js');
  assert(pwaContent.includes("window.addEventListener('offline'"), 'stemos_pwa.js listens to offline network events');
  assert(pwaContent.includes("window.addEventListener('online'"), 'stemos_pwa.js listens to online network events');
  assert(pwaContent.includes('beforeinstallprompt'), 'stemos_pwa.js captures beforeinstallprompt for custom UI');
  assert(pwaContent.includes('stemos-network-toast'), 'stemos_pwa.js creates floating network toast HUD');
  assert(pwaContent.includes('window.stemOS_PWA'), 'stemos_pwa.js exposes window.stemOS_PWA API');
}

// ─── SUITE 5: Cross-Portal HTML Integration ───
console.log('\n🌐 SUITE 5 — Cross-Portal HTML Integration');
const targetPortals = [
  'index.html',
  'app.html',
  'dev.html',
  'register.html',
  'placement.html',
  'tracks.html',
  'teacher.html',
  'admin.html',
  'privacy.html'
];

targetPortals.forEach((portal) => {
  const portalPath = path.join(ROOT_DIR, portal);
  assert(fs.existsSync(portalPath), `Portal exists: ${portal}`);
  if (fs.existsSync(portalPath)) {
    const content = fs.readFileSync(portalPath, 'utf8');
    assert(content.includes('href="/manifest.json"'), `${portal} links to /manifest.json`);
    assert(content.includes('name="theme-color"'), `${portal} defines theme-color`);
    if (portal === 'privacy.html') {
      assert(!content.includes('stemos_pwa.js'), 'privacy.html is a standalone static legal document for Google OAuth compliance');
    } else {
      assert(content.includes('stemos_pwa.js'), `${portal} includes stemos_pwa.js client script`);
    }
  }
});

// ─── SUITE 6: Cloudflare Headers Manifest Rules ───
console.log('\n🔒 SUITE 6 — Cloudflare _headers Manifest Rules');
const headersPath = path.join(ROOT_DIR, '_headers');
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, 'utf8');
  assert(headers.includes('/manifest.json'), '_headers defines /manifest.json rule');
  assert(headers.includes('application/manifest+json'), '_headers sets application/manifest+json MIME type');
}

console.log('\n============================================================================');
console.log(`📊 PHASE 83 TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
if (failedTests > 0) {
  console.error(`❌ ${failedTests} test(s) failed.`);
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 83 TESTS PASSED! Enterprise PWA installability & offline resiliency verified.');
  process.exit(0);
}
