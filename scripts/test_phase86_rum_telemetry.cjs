/**
 * Test Suite: Phase 86 — Real User Monitoring (RUM) & Web Vitals Telemetry Engine
 * Validates:
 * 1. content/stemos_rum.js structure, exports, metrics observers and threshold calculations.
 * 2. sw.js cache name bump (v6.6.0) and pre-caching of /content/stemos_rum.js.
 * 3. 9 HTML portals script integration with defer.
 * 4. Simulated session telemetry recording and report export.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 ==============================================================');
console.log('🧪 STARTING PHASE 86: REAL USER MONITORING (RUM) & TELEMETRY TEST');
console.log('🧪 ==============================================================\n');

let totalTests = 0;
let passedTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${description}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${description}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

// ── SUITE 1: Module File & Syntax ──
console.log('📦 SUITE 1: RUM Telemetry Core Script Integrity');
const rumPath = path.join(ROOT_DIR, 'content', 'stemos_rum.js');
test('content/stemos_rum.js exists', () => {
  assert(fs.existsSync(rumPath), 'File must exist');
});

const rumContent = fs.readFileSync(rumPath, 'utf8');

test('stemos_rum.js contains PerformanceObserver for Core Web Vitals', () => {
  assert(rumContent.includes("type: 'largest-contentful-paint'"), 'Observes LCP');
  assert(rumContent.includes("type: 'layout-shift'"), 'Observes CLS');
  assert(rumContent.includes("type: 'paint'"), 'Observes Paint (FCP)');
  assert(rumContent.includes("type: 'navigation'"), 'Observes Navigation timing');
  assert(rumContent.includes("type: 'first-input'"), 'Observes FID');
  assert(rumContent.includes("type: 'event'"), 'Observes INP');
});

test('stemos_rum.js filters layout-shift using hadRecentInput', () => {
  assert(rumContent.includes('!entry.hadRecentInput'), 'Must filter out user-triggered shifts');
});

test('stemos_rum.js defines CWV threshold standards', () => {
  assert(rumContent.includes('lcp: { good: 2500, needsImprovement: 4000 }'), 'LCP thresholds match CWV standards');
  assert(rumContent.includes('cls: { good: 0.1,  needsImprovement: 0.25 }'), 'CLS thresholds match CWV standards');
  assert(rumContent.includes('inp: { good: 200,  needsImprovement: 500 }'), 'INP thresholds match CWV standards');
});

test('stemos_rum.js exposes complete public API', () => {
  assert(rumContent.includes('getMetrics:'), 'Must expose getMetrics');
  assert(rumContent.includes('getRatings:'), 'Must expose getRatings');
  assert(rumContent.includes('getOverallScore:'), 'Must expose getOverallScore');
  assert(rumContent.includes('recordEvent:'), 'Must expose recordEvent');
  assert(rumContent.includes('exportReport:'), 'Must expose exportReport');
  assert(rumContent.includes('clearHistory:'), 'Must expose clearHistory');
  assert(rumContent.includes('renderHUD:'), 'Must expose renderHUD');
});

test('stemos_rum.js loads as CommonJS module without errors', () => {
  const RUM = require(rumPath);
  assert(RUM !== null && typeof RUM === 'object', 'Export must be an object');
  assert(typeof RUM.version === 'string', 'version property is present');
  assert(typeof RUM.getMetrics === 'function', 'getMetrics is a function');
  assert(typeof RUM.getOverallScore === 'function', 'getOverallScore is a function');
});

test('stemos_rum.js CommonJS exports valid baseline ratings and overall score', () => {
  const RUM = require(rumPath);
  const metrics = RUM.getMetrics();
  assert(metrics && typeof metrics.sessionId === 'string', 'sessionId exists');
  const score = RUM.getOverallScore();
  assert(typeof score === 'number' && score >= 0 && score <= 100, 'Health score is 0-100');
});

// ── SUITE 2: Service Worker Pre-Caching & Version Bump ──
console.log('\n📱 SUITE 2: Service Worker v6.6.0 Pre-Cache Integration');
const swPath = path.join(ROOT_DIR, 'sw.js');
const swContent = fs.readFileSync(swPath, 'utf8');

test('sw.js CACHE_NAME bumped to stemos-lxp-v6.6.0+ (RUM / telemetry / phonetics)', () => {
  assert(/CACHE_NAME\s*=\s*'stemos-lxp-v6\.[6-9]\./.test(swContent), 'Cache name matches Phase 86+');
});

test('sw.js precaches /content/stemos_rum.js', () => {
  assert(swContent.includes("'/content/stemos_rum.js'"), 'Assets array includes /content/stemos_rum.js');
});

// ── SUITE 3: Cross-Portal HTML Script Integration ──
console.log('\n🌐 SUITE 3: Cross-Portal HTML Integration (9 Portals)');
const portals = [
  'index.html',
  'dev.html',
  'tracks.html',
  'placement.html',
  'register.html',
  'teacher.html',
  'admin.html',
  'app.html',
  'privacy.html'
];

portals.forEach((portal) => {
  test(`${portal} includes /content/stemos_rum.js with defer`, () => {
    const filePath = path.join(ROOT_DIR, portal);
    assert(fs.existsSync(filePath), `${portal} exists`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert(content.includes('<script src="/content/stemos_rum.js" defer></script>'), `${portal} has stemos_rum.js script tag`);
  });
});

// ── SUITE 4: Functional Telemetry & Event Recording Simulation ──
console.log('\n📊 SUITE 4: Telemetry Event Recording & Reporting Simulation');
test('recordEvent stores custom event and returns valid event payload', () => {
  const RUM = require(rumPath);
  const evt = RUM.recordEvent('test_phase86_event', { key: 'value', score: 98 });
  assert(evt.name === 'test_phase86_event', 'Event name matches');
  assert(evt.data.score === 98, 'Event payload matches');
  assert(typeof evt.timestamp === 'string', 'Timestamp is ISO string');
  
  const report = RUM.exportReport();
  assert(report && report.current, 'Report contains current metrics');
  assert(Array.isArray(report.current.customEvents), 'customEvents is array');
  const recorded = report.current.customEvents.find(e => e.name === 'test_phase86_event');
  assert(recorded !== undefined, 'Recorded event exists in exported report');
});

console.log('\n🏁 ==============================================================');
console.log(`🏁 PHASE 86 COMPLETED: ${passedTests}/${totalTests} TESTS PASSING`);
console.log('🏁 ==============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
