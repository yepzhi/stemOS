/**
 * Test Suite: Phase 87 — Acoustic Phonetics & Multi-Dialect Pronunciation Trainer Engine
 * Validates:
 * 1. content/stemos_phonetics.js module integrity and dialect presets.
 * 2. Autocorrelation pitch detection on synthetic sine waves.
 * 3. Formant peak extraction from spectral data.
 * 4. Pronunciation scoring algorithm and distance calculation.
 * 5. Service Worker pre-caching and v6.7.0 cache bump.
 * 6. Portal script integration across 5 main learning interfaces.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🎙️ ==============================================================');
console.log('🎙️ STARTING PHASE 87: ACOUSTIC PHONETICS & DIALECT TRAINER TEST');
console.log('🎙️ ==============================================================\n');

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

// ── SUITE 1: Module File & Dialect Presets ──
console.log('📦 SUITE 1: Phonetics Engine & Dialect Presets');
const phoneticsPath = path.join(ROOT_DIR, 'content', 'stemos_phonetics.js');
test('content/stemos_phonetics.js exists', () => {
  assert(fs.existsSync(phoneticsPath), 'File must exist');
});

const Phonetics = require(phoneticsPath);

test('stemos_phonetics.js exports version string', () => {
  assert(typeof Phonetics.version === 'string', 'Version string present');
  assert(Phonetics.version.includes('phase87'), 'Version notes phase87');
});

test('Phonetics engine defines all 4 regional STEM dialects', () => {
  const dialects = Phonetics.getDialects();
  assert(Array.isArray(dialects), 'getDialects returns array');
  assert.strictEqual(dialects.length, 4, '4 dialects registered');
  
  const ids = dialects.map(d => d.id);
  assert(ids.includes('us_general'), 'Contains us_general');
  assert(ids.includes('us_texas_border'), 'Contains us_texas_border');
  assert(ids.includes('uk_rp'), 'Contains uk_rp');
  assert(ids.includes('de_tech'), 'Contains de_tech');
});

test('Dialect switching and active dialect getter work', () => {
  assert.strictEqual(Phonetics.getActiveDialect().id, 'us_general', 'Default is us_general');
  const switched = Phonetics.setActiveDialect('us_texas_border');
  assert.strictEqual(switched, true, 'Switch succeeded');
  assert.strictEqual(Phonetics.getActiveDialect().id, 'us_texas_border', 'Active is now us_texas_border');
  // Reset back to us_general
  Phonetics.setActiveDialect('us_general');
});

// ── SUITE 2: Acoustic Calculations (Pitch & Formants) ──
console.log('\n🔊 SUITE 2: Acoustic FFT Formants & Pitch Autocorrelation');

test('detectPitchFromBuffer returns 0 on silent/flat buffer', () => {
  const silentBuffer = new Float32Array(2048);
  const res = Phonetics.detectPitchFromBuffer(silentBuffer, 44100);
  assert.strictEqual(res.pitch, 0, 'Pitch is 0 on silence');
  assert.strictEqual(res.rms, 0, 'RMS is 0');
});

test('detectPitchFromBuffer accurately tracks synthetic 200 Hz sine wave', () => {
  const sampleRate = 44100;
  const targetHz = 200;
  const buffer = new Float32Array(2048);
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = 0.8 * Math.sin(2 * Math.PI * targetHz * (i / sampleRate));
  }
  const res = Phonetics.detectPitchFromBuffer(buffer, sampleRate);
  assert(res.pitch >= 195 && res.pitch <= 205, `Detected pitch (${res.pitch}) close to ${targetHz} Hz`);
  assert(res.correlation > 0.8, 'High autocorrelation for periodic wave');
});

test('extractFormantsFromSpectrum detects spectral peak coordinates', () => {
  const sampleRate = 44100;
  const fftSize = 2048;
  const binResolution = (sampleRate / 2) / (fftSize / 2);
  const freqData = new Uint8Array(fftSize / 2);
  
  // Create peaks around 500 Hz (bin ~23) and 1800 Hz (bin ~83)
  const bin500 = Math.round(500 / binResolution);
  const bin1800 = Math.round(1800 / binResolution);
  
  freqData[bin500] = 220;
  freqData[bin500 - 1] = 150;
  freqData[bin500 + 1] = 150;
  
  freqData[bin1800] = 200;
  freqData[bin1800 - 1] = 140;
  freqData[bin1800 + 1] = 140;

  const formants = Phonetics.extractFormantsFromSpectrum(freqData, sampleRate, fftSize);
  assert(formants.f1 > 0, 'F1 detected');
  assert(formants.f2 > 0, 'F2 detected');
  assert(Math.abs(formants.f1 - 500) < 50, `F1 (${formants.f1}) close to 500 Hz`);
  assert(Math.abs(formants.f2 - 1800) < 60, `F2 (${formants.f2}) close to 1800 Hz`);
});

// ── SUITE 3: Scoring & Accuracy Engine ──
console.log('\n🎯 SUITE 3: Pronunciation Accuracy Scoring Engine');

test('scorePronunciation awards high score when formants match target', () => {
  // Target for 'iy' in us_general is [280, 2250]
  const matchedData = { f1: 280, f2: 2250, pitch: 120 };
  const result = Phonetics.scorePronunciation(matchedData, 'iy', 'us_general');
  assert.strictEqual(result.score, 100, 'Score is 100 for exact match');
  assert.strictEqual(result.rating, 'Excellent', 'Rating is Excellent');
});

test('scorePronunciation penalizes acoustic divergence', () => {
  // Completely off formants
  const divergedData = { f1: 800, f2: 1100, pitch: 120 };
  const result = Phonetics.scorePronunciation(divergedData, 'iy', 'us_general');
  assert(result.score < 60, `Score is penalized (${result.score} < 60)`);
  assert.strictEqual(result.rating, 'Needs Practice', 'Rating is Needs Practice');
});

// ── SUITE 4: Service Worker Pre-Caching Integration ──
console.log('\n📱 SUITE 4: Service Worker v6.7.0 Pre-Cache Integration');
const swPath = path.join(ROOT_DIR, 'sw.js');
const swContent = fs.readFileSync(swPath, 'utf8');

test('sw.js CACHE_NAME bumped to stemos-lxp-v6.7.0+ (phonetic-trainer / sync)', () => {
  assert(/CACHE_NAME\s*=\s*'stemos-lxp-v6\.[7-9]\./.test(swContent), 'Cache name matches Phase 87+');
});

test('sw.js precaches /content/stemos_phonetics.js', () => {
  assert(swContent.includes("'/content/stemos_phonetics.js'"), 'Assets array includes stemos_phonetics.js');
});

// ── SUITE 5: Cross-Portal HTML Integration ──
console.log('\n🌐 SUITE 5: Cross-Portal HTML Integration');
const speechPortals = ['index.html', 'dev.html', 'tracks.html', 'app.html', 'placement.html'];

speechPortals.forEach((portal) => {
  test(`${portal} includes /content/stemos_phonetics.js with defer`, () => {
    const filePath = path.join(ROOT_DIR, portal);
    assert(fs.existsSync(filePath), `${portal} exists`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert(
      content.includes('<script src="/content/stemos_phonetics.js" defer></script>'),
      `${portal} has stemos_phonetics.js script tag`
    );
  });
});

console.log('\n🏁 ==============================================================');
console.log(`🏁 PHASE 87 COMPLETED: ${passedTests}/${totalTests} TESTS PASSING`);
console.log('🏁 ==============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
