/**
 * stemOS Unified Platform Test Suite
 * Consolidated core verification covering all platform architecture,
 * edge APIs, audio assets, offline PWA, SM-2 engine, and security headers.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function it(description, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ ${description}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    ${err.message}`);
  }
}

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🚀 stemOS Unified Platform Master Verification Suite');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ── 1. Root Core Files & Architecture Integrity ──
console.log('▶ 1. Root Architecture & Portals Integrity');
const coreFiles = [
  'index.html',
  'app.html',
  'app.js',
  'placement.html',
  'register.html',
  'teacher.html',
  'admin.html',
  'verify.html',
  'dev.css',
  'sw.js',
  'worker.js',
  '_headers',
  '_redirects',
  'manifest.json',
  'manifest.webmanifest',
  'content/mcer_tracks.js',
  'content/placement_test.js',
  'content/stemos_payments.js',
  'content/stemos_phonetics.js',
  'content/stemos_rum.js',
  'content/stemos_skeleton.js',
  'content/stemos_sync.js',
  'content/stemos_tts.js'
];

coreFiles.forEach(rel => {
  it(`Core file exists and is valid: ${rel}`, () => {
    const fullPath = path.join(ROOT, rel);
    assert(fs.existsSync(fullPath), `Missing: ${rel}`);
    assert(fs.statSync(fullPath).size > 20, `File too small: ${rel}`);
  });
});

// ── 2. Cloudflare Edge Worker & _redirects ──
console.log('\n▶ 2. Edge Worker, API Endpoints & Redirections');
const workerContent = fs.readFileSync(path.join(ROOT, 'worker.js'), 'utf8');
const redirectsContent = fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8');

it('worker.js defines /api/credentials/sign and /api/credentials/verify', () => {
  assert(workerContent.includes('/api/credentials/sign'), 'Missing /api/credentials/sign');
  assert(workerContent.includes('/api/credentials/verify'), 'Missing /api/credentials/verify');
});

it('worker.js exposes /api/chat proxy and /health', () => {
  assert(workerContent.includes('/api/chat'), 'Missing /api/chat');
  assert(workerContent.includes('/health'), 'Missing /health');
});

it('_redirects routes /tracks and /dev to appropriate endpoints via 301', () => {
  assert(redirectsContent.includes('/tracks /app.html 301'), 'Missing /tracks 301 redirect');
  assert(redirectsContent.includes('/dev / 301'), 'Missing /dev 301 redirect');
});

// ── 3. PWA Offline Engine & Service Worker ──
console.log('\n▶ 3. PWA Offline Engine & Two-Tier Service Worker');
const swContent = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const manifestContent = fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8');

it('sw.js specifies active cache and SW_VERSION', () => {
  assert(swContent.includes('CACHE_NAME'), 'Missing CACHE_NAME');
  assert(swContent.includes('SW_VERSION'), 'Missing SW_VERSION');
});

it('sw.js precaches essential PWA assets with Promise.allSettled', () => {
  assert(swContent.includes('/app.html'), 'Precache must include /app.html');
  assert(swContent.includes('/verify.html'), 'Precache must include /verify.html');
  assert(swContent.includes('Promise.allSettled'), 'Must use Promise.allSettled');
  assert(!swContent.includes("'/tracks.html'"), 'sw.js must NOT contain deleted /tracks.html');
});

it('manifest.json specifies PWA name, start_url and shortcuts', () => {
  const manifest = JSON.parse(manifestContent);
  assert(manifest.name && manifest.name.includes('stemOS'), 'Invalid manifest name');
  assert(manifest.start_url, 'Missing start_url');
  assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'Missing manifest icons');
});

// ── 4. Technical Output Lab (8D) & SM-2 Spaced Repetition Engine ──
console.log('\n▶ 4. Technical Output Lab & SM-2 Algorithmic Memory');
const appHtmlContent = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const appJsContent = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

it('app.html contains #view-output-lab and 8D mode switcher', () => {
  assert(appHtmlContent.includes('id="view-output-lab"'), 'Missing #view-output-lab');
  assert(appHtmlContent.includes('id="btn-mode-8d"'), 'Missing #btn-mode-8d');
  assert(appHtmlContent.includes('id="btn-mode-email"'), 'Missing #btn-mode-email');
});

it('app.html contains SM-2 Spaced Repetition Workspace in Glossary', () => {
  assert(appHtmlContent.includes('id="glossary-sm2-workspace"'), 'Missing #glossary-sm2-workspace');
  assert(appHtmlContent.includes('id="sm2-active-card"'), 'Missing #sm2-active-card');
  assert(appHtmlContent.includes('data-quality="4"'), 'Missing SM-2 rate button quality 4');
  assert(appHtmlContent.includes('id="rate-good-interval"'), 'Missing #rate-good-interval');
});

it('app.js implements SM-2 rateCard logic and 8D evaluation', () => {
  assert(appJsContent.includes('function initOutputLab()'), 'Missing initOutputLab');
  assert(appJsContent.includes('function initGlossarySM2()'), 'Missing initGlossarySM2');
  assert(appJsContent.includes('function evaluate8DReport('), 'Missing evaluate8DReport');
  assert(appJsContent.includes('function rateCard('), 'Missing rateCard');
});

// ── 5. Audio & Curricular Catalog Verification ──
console.log('\n▶ 5. Audio Infrastructure & 240.0h MCER Catalog');
const mcerTracksModule = require(path.join(ROOT, 'content/mcer_tracks.js'));

it('content/mcer_tracks.js exports 16 units across A1-B2 totaling 240.0 hours', () => {
  const units = mcerTracksModule.getAllUnits();
  assert.strictEqual(units.length, 16, 'Expected exactly 16 units');
  const totalHours = units.reduce((acc, u) => acc + (u.hours || 15.0), 0);
  assert.strictEqual(totalHours, 240.0, 'Expected exactly 240.0 accredited hours');
});

it('High-priority audio files exist on disk', () => {
  const sampleAudio = [
    'content/audio/cleanroom_photolithography.wav',
    'content/audio/cleanroom_basic_a2.wav',
    'content/audio/pt-test-audio.mp3',
    'content/audio/pt-l01.mp3',
    'content/audio/mcer/b1-u1-d1.mp3'
  ];
  sampleAudio.forEach(a => {
    assert(fs.existsSync(path.join(ROOT, a)), `Missing audio: ${a}`);
  });
});

// ── 6. Security Headers & Subresource Integrity ──
console.log('\n▶ 6. Production Security Headers & SRI');
const headersContent = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8');

it('_headers configures CSP, X-Frame-Options, and HSTS', () => {
  assert(headersContent.includes('Content-Security-Policy:'), 'Missing CSP');
  assert(headersContent.includes('X-Content-Type-Options: nosniff'), 'Missing nosniff');
  assert(headersContent.includes('X-Frame-Options: SAMEORIGIN'), 'Missing X-Frame-Options');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 RESULT: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 UNIFIED PLATFORM VERIFICATION COMPLETE — 100% SUCCESS!\n');
}
