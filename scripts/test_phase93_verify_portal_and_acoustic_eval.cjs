/**
 * stemOS LXP — Phase 93 Verification Suite:
 * W3C Open Badges 3.0 Public Verification Portal (/verify) & Real-Time Acoustic Pronunciation Evaluator
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 ==============================================================');
console.log('🧪 RUNNING PHASE 93: VERIFICATION PORTAL & ACOUSTIC EVAL TESTS');
console.log('🧪 ==============================================================\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`    ${err.message}\n`);
    failed++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✓ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`    ${err.message}\n`);
    failed++;
  }
}

const ROOT = path.join(__dirname, '..');

async function runAll() {
  // Test 1
  test('verify.html contains complete W3C Open Badges 3.0 UI components', () => {
    const verifyPath = path.join(ROOT, 'verify.html');
    assert(fs.existsSync(verifyPath), 'verify.html must exist in root');
    const html = fs.readFileSync(verifyPath, 'utf8');

    assert(html.includes('W3C Open Badges 3.0'), 'Must mention W3C Open Badges 3.0');
    assert(html.includes('id="dropzone"'), 'Must have drag & drop zone');
    assert(html.includes('id="search-query"'), 'Must have search query input');
    assert(html.includes('id="result-container"'), 'Must have result container');
    assert(html.includes('/api/credentials/verify'), 'Must query edge verification endpoint');
    assert(html.includes('stemos-ed25519-hmac-sha256-2026'), 'Must display cryptosuite identifier');
    assert(html.includes('navigator.serviceWorker.register'), 'Must register Service Worker for offline verification');
  });

  // Test 2
  test('_redirects contains SPA routing rules for /verify and /credentials/*', () => {
    const redPath = path.join(ROOT, '_redirects');
    const content = fs.readFileSync(redPath, 'utf8');

    assert(content.includes('/verify/* /verify.html 200'), 'Must route /verify/* to /verify.html');
    assert(content.includes('/credentials/* /verify.html 200'), 'Must route /credentials/* to /verify.html');
  });

  // Test 3
  await testAsync('worker.js handles both query params, raw W3C JSON, and browser redirects for /api/credentials/verify', async () => {
    const workerModule = await import(`file://${path.join(ROOT, 'worker.js')}`);
    const worker = workerModule.default;
    const mockEnv = {
      CREDENTIAL_SIGNING_SECRET: 'test_secret_phase93',
      OPEN_BADGES_PUBLIC_KEY_X: 'test_public_key'
    };

    // 1. Browser HTML GET request -> redirects to /verify.html?folio=...
    const browserReq = new Request('https://stemos.org/api/credentials/verify?folio=STEMOS-OB3-B2-TEST', {
      headers: { 'Accept': 'text/html,application/xhtml+xml' }
    });
    const redirectRes = await worker.fetch(browserReq, mockEnv);
    assert.strictEqual(redirectRes.status, 302, 'Browser HTML navigation must redirect with 302');
    assert(redirectRes.headers.get('location').includes('/verify.html?folio=STEMOS-OB3-B2-TEST'), 'Redirect destination must point to verify.html');

    // 2. Sign a test credential
    const signReq = new Request('https://stemos.org/api/credentials/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientName: 'Ana Gomez',
        matricula: '2026-UPBC-402',
        cefrLevel: 'B2',
        accreditedHours: 240,
        careerName: 'Ingeniería en Mecatrónica'
      })
    });
    const signRes = await worker.fetch(signReq, mockEnv);
    assert.strictEqual(signRes.status, 200, 'Signing must return HTTP 200');
    const signData = await signRes.json();
    assert(signData.credential, 'Must return W3C credential');
    assert(signData.credential.proof.proofValue, 'Must contain cryptographic proofValue');

    // 3. Verify raw W3C Credential object via POST
    const verifyPostReq = new Request('https://stemos.org/api/credentials/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: signData.credential })
    });
    const verifyRes = await worker.fetch(verifyPostReq, mockEnv);
    assert.strictEqual(verifyRes.status, 200, 'Verification of signed credential must return 200');
    const verifyData = await verifyRes.json();
    assert.strictEqual(verifyData.valid, true, 'Credential must be cryptographically valid');
    assert.strictEqual(verifyData.recipientName, 'Ana Gomez', 'Recipient name must match');
    assert.strictEqual(verifyData.cefrLevel, 'B2', 'Level must match');
  });

  // Test 4
  test('app.js integrates real-time acoustic pronunciation evaluator and verification URL', () => {
    const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

    assert(appJs.includes('btn-mic-pl-record'), 'Pronunciation lab must include mic recording button');
    assert(appJs.includes('pl-acoustic-feedback'), 'Pronunciation lab must include acoustic feedback badge');
    assert(appJs.includes('STEMOS_PHONETICS.scorePronunciation'), 'Must invoke STEMOS_PHONETICS.scorePronunciation');
    assert(appJs.includes('STEMOS_PHONETICS.startLiveAnalysis'), 'Must invoke STEMOS_PHONETICS.startLiveAnalysis');
    assert(appJs.includes('STEMOS_PHONETICS.stopLiveAnalysis'), 'Must invoke STEMOS_PHONETICS.stopLiveAnalysis');
    assert(appJs.includes('/verify?folio='), 'Verifiable credential link must point to /verify portal');
  });

  // Test 5
  test('sw.js precaches /verify and /verify.html in ASSETS_TO_CACHE', () => {
    const swJs = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    assert(swJs.includes("'/verify.html'"), 'sw.js must precache /verify.html');
    assert(swJs.includes("'/verify'"), 'sw.js must precache /verify');
  });

  // Test 6
  test('dev/ folder maintains 100% exact parity for verify.html, sw.js, and app.js', () => {
    const rootVerify = fs.readFileSync(path.join(ROOT, 'verify.html'), 'utf8');
    const devVerify = fs.readFileSync(path.join(ROOT, 'dev/verify.html'), 'utf8');
    assert.strictEqual(rootVerify, devVerify, 'verify.html and dev/verify.html must be identical');

    const rootSw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    const devSw = fs.readFileSync(path.join(ROOT, 'dev/sw.js'), 'utf8');
    assert.strictEqual(rootSw, devSw, 'sw.js and dev/sw.js must be identical');

    const rootApp = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
    const devApp = fs.readFileSync(path.join(ROOT, 'dev/app.js'), 'utf8');
    assert.strictEqual(rootApp, devApp, 'app.js and dev/app.js must be identical');
  });

  console.log('\n==============================================================');
  console.log(`🏁 PHASE 93 TEST SUMMARY: ${passed}/${passed + failed} TESTS COMPLETED`);
  console.log('==============================================================\n');

  if (failed > 0) process.exit(1);
}

runAll();
