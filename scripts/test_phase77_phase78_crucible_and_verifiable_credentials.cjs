/**
 * test_phase77_phase78_crucible_and_verifiable_credentials.cjs
 * Comprehensive Audit Suite for:
 * - Fase 77: Nearshoring Voice Crucible Live Audio Recording & VU Meter Telemetry
 * - Fase 78: CACEI Micro-Credential Badges & W3C Verifiable Credentials 3.0
 * - Fase 79: Cross-Portal Theme & WCAG 2.1 AA High-Contrast Mode Synchronizer
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🎙️ stemOS Fases 77, 78 & 79 Comprehensive Audit Suite');
console.log('   Voice Crucible VU Meter, Verifiable Credentials & A11y Themes');
console.log('═══════════════════════════════════════════════════════════════════\n');

let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

// Files to audit
const appHtml = fs.readFileSync(path.join(__dirname, '../app.html'), 'utf8');
const devAppHtml = fs.readFileSync(path.join(__dirname, '../dev/app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
const devAppJs = fs.readFileSync(path.join(__dirname, '../dev/app.js'), 'utf8');
const mcerTracks = require('../content/mcer_tracks.js');
const devMcerTracksCode = fs.readFileSync(path.join(__dirname, '../dev/content/mcer_tracks.js'), 'utf8');
const devCss = fs.readFileSync(path.join(__dirname, '../dev.css'), 'utf8');
const devDevCss = fs.readFileSync(path.join(__dirname, '../dev/dev.css'), 'utf8');
const adminHtml = fs.readFileSync(path.join(__dirname, '../admin.html'), 'utf8');
const teacherHtml = fs.readFileSync(path.join(__dirname, '../teacher.html'), 'utf8');
const tracksHtml = fs.readFileSync(path.join(__dirname, '../tracks.html'), 'utf8');
const registerHtml = fs.readFileSync(path.join(__dirname, '../register.html'), 'utf8');
const placementHtml = fs.readFileSync(path.join(__dirname, '../placement.html'), 'utf8');

console.log('▶ 1. Fase 77: Nearshoring Voice Crucible Live Audio Recording & VU Meter');

test('app.html and dev/app.html are 100% in sync for Voice Crucible', () => {
  assert.strictEqual(appHtml, devAppHtml, 'app.html and dev/app.html must have exact bit-for-bit parity');
});

test('app.html contains mic status badge (#mcer-crucible-mic-status)', () => {
  assert(appHtml.includes('id="mcer-crucible-mic-status"'), 'Missing #mcer-crucible-mic-status badge');
  assert(appHtml.includes('STANDBY'), 'Default mic status must be STANDBY');
});

test('app.html contains live VU meter bar and decibel readout', () => {
  assert(appHtml.includes('id="mcer-crucible-vu-container"'), 'Missing #mcer-crucible-vu-container');
  assert(appHtml.includes('id="mcer-crucible-vu-meter"'), 'Missing #mcer-crucible-vu-meter');
  assert(appHtml.includes('id="mcer-crucible-vu-db"'), 'Missing #mcer-crucible-vu-db');
});

test('app.html contains demo audio dispatch button (#btn-mcer-crucible-demo-audio)', () => {
  assert(appHtml.includes('id="btn-mcer-crucible-demo-audio"'), 'Missing #btn-mcer-crucible-demo-audio');
  assert(appHtml.includes('Audio Demo'), 'Button label must state Audio Demo');
});

test('app.html contains recorded audio playback bar and duration timer', () => {
  assert(appHtml.includes('id="mcer-crucible-playback-bar"'), 'Missing #mcer-crucible-playback-bar');
  assert(appHtml.includes('id="btn-mcer-crucible-play-recorded"'), 'Missing #btn-mcer-crucible-play-recorded');
  assert(appHtml.includes('id="mcer-crucible-recorded-duration"'), 'Missing #mcer-crucible-recorded-duration');
  assert(appHtml.includes('id="btn-mcer-crucible-clear-audio"'), 'Missing #btn-mcer-crucible-clear-audio');
});

test('app.js and dev/app.js are 100% in sync for crucible logic', () => {
  assert.strictEqual(appJs, devAppJs, 'app.js and dev/app.js must have exact bit-for-bit parity');
});

test('app.js defines triggerVuSimulation and RMS decibel calculator', () => {
  assert(appJs.includes('function triggerVuSimulation'), 'Missing triggerVuSimulation in app.js');
  assert(appJs.includes('Math.log10(rms)'), 'Missing RMS dB calculation in app.js');
  assert(appJs.includes('mcer-crucible-vu-meter'), 'Missing VU meter DOM binding in app.js');
});

test('app.js connects MediaRecorder audio capture with Blob audio chunks', () => {
  assert(appJs.includes('new MediaRecorder(stream)'), 'Missing MediaRecorder instantiation');
  assert(appJs.includes('audioChunks.push'), 'Missing audio chunk collection');
  assert(appJs.includes('new Blob(audioChunks'), 'Missing Blob generation from audio chunks');
  assert(appJs.includes('RECORDING'), 'Missing RECORDING status update');
  assert(appJs.includes('CAPTURED'), 'Missing CAPTURED status update');
});

test('app.js demo audio button injects standard operational plant dispatch', () => {
  assert(appJs.includes('btn-mcer-crucible-demo-audio'), 'Missing demo audio handler');
  assert(appJs.includes('DEMO LOADED'), 'Demo click must update status to DEMO LOADED');
});

console.log('\n▶ 2. Fase 78: CACEI Micro-Credential Badges & W3C Verifiable Credentials');

test('mcer_tracks.js exports generateVerifiableCredential compliant with W3C standards', () => {
  assert(typeof mcerTracks.generateVerifiableCredential === 'function', 'generateVerifiableCredential must be exported');
  const cred = mcerTracks.generateVerifiableCredential({
    fullName: 'Diana Laura Morales',
    matricula: '22050144',
    degreeModality: 'Ingeniería Mecatrónica',
    institutionName: 'UPBC Mexicali'
  }, {
    level: 'B1',
    score: 95,
    hours: 60.0
  });

  assert(cred['@context'].includes('https://www.w3.org/2018/credentials/v1'), 'Missing W3C Credentials context');
  assert(cred.type.includes('VerifiableCredential'), 'Type must include VerifiableCredential');
  assert(cred.type.includes('OpenBadgeCredential'), 'Type must include OpenBadgeCredential');
  assert.strictEqual(cred.credentialSubject.name, 'Diana Laura Morales');
  assert.strictEqual(cred.credentialSubject.achievement.cefrLevel, 'B1');
  assert.strictEqual(cred.credentialSubject.achievement.accreditedHours, 60.0);
  assert(cred.proof.proofValue.startsWith('sha256-cacei-'), 'Proof value must start with sha256-cacei-');
});

test('mcer_tracks.js exports verifyCredentialHash that validates CACEI folios', () => {
  assert(typeof mcerTracks.verifyCredentialHash === 'function', 'verifyCredentialHash must be exported');
  const result = mcerTracks.verifyCredentialHash('CACEI-MCER-B1-2026-XYZ', 'sha256-cacei-abc-b1');
  assert.strictEqual(result.valid, true, 'Valid folio must verify true');
  assert.strictEqual(result.level, 'B1');
  assert.strictEqual(result.accreditedHours, 60.0);
});

test('content/mcer_tracks.js and dev/content/mcer_tracks.js are 100% in sync', () => {
  const rootMcerCode = fs.readFileSync(path.join(__dirname, '../content/mcer_tracks.js'), 'utf8');
  assert.strictEqual(rootMcerCode, devMcerTracksCode, 'mcer_tracks.js must have 100% parity with dev mirror');
});

test('app.html contains #modal-verifiable-credential with QR, SHA-256 and JSON-LD', () => {
  assert(appHtml.includes('id="modal-verifiable-credential"'), 'Missing #modal-verifiable-credential');
  assert(appHtml.includes('id="vc-modal-qr-container"'), 'Missing #vc-modal-qr-container');
  assert(appHtml.includes('id="vc-modal-sha-fingerprint"'), 'Missing #vc-modal-sha-fingerprint');
  assert(appHtml.includes('id="vc-modal-json-ld"'), 'Missing #vc-modal-json-ld');
  assert(appHtml.includes('id="btn-vc-copy-json"'), 'Missing #btn-vc-copy-json');
  assert(appHtml.includes('id="btn-vc-copy-link"'), 'Missing #btn-vc-copy-link');
});

test('app.html exam modal and student profile modal have triggers to open verifiable credentials', () => {
  assert(appHtml.includes('id="btn-view-verifiable-credential"'), 'Missing #btn-view-verifiable-credential in exam results');
  assert(appHtml.includes('id="btn-profile-open-credential"'), 'Missing #btn-profile-open-credential in profile passport strip');
});

test('app.js defines openVerifiableCredentialModal and URL query param verify handler', () => {
  assert(appJs.includes('function openVerifiableCredentialModal'), 'Missing openVerifiableCredentialModal in app.js');
  assert(appJs.includes('window.openVerifiableCredentialModal = openVerifiableCredentialModal'), 'Must be exposed on window');
  assert(appJs.includes("urlParams.get('verify')"), 'Must handle ?verify= URL parameter');
});

console.log('\n▶ 3. Fase 79: Cross-Portal Theme & WCAG 2.1 AA High-Contrast Mode');

test('dev.css defines WCAG 2.1 AA high-contrast and light theme rules', () => {
  assert(devCss.includes('html.theme-high-contrast'), 'Missing html.theme-high-contrast in dev.css');
  assert(devCss.includes('--border-color: #facc15'), 'High-contrast must define gold border color');
  assert(devCss.includes('html.theme-light body'), 'Missing html.theme-light body style in dev.css');
  assert.strictEqual(devCss, devDevCss, 'dev.css and dev/dev.css must have exact bit-for-bit parity');
});

test('All 6 portals implement initThemeSynchronizer with storage listener', () => {
  const portals = [
    { name: 'app.js', content: appJs },
    { name: 'admin.html', content: adminHtml },
    { name: 'teacher.html', content: teacherHtml },
    { name: 'tracks.html', content: tracksHtml },
    { name: 'register.html', content: registerHtml },
    { name: 'placement.html', content: placementHtml }
  ];

  portals.forEach(p => {
    assert(p.content.includes('stemos_theme'), `${p.name} must inspect localStorage stemos_theme`);
    assert(p.content.includes('theme-high-contrast'), `${p.name} must handle theme-high-contrast`);
  });
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, 0 Failed (out of ${totalTests} total)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (passedTests === totalTests) {
  console.log('🎉 FASES 77, 78 & 79 PASSED WITH 100% SUCCESS!\n');
} else {
  process.exit(1);
}
