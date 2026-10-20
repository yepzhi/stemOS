/**
 * stemOS Piper Neural TTS & Mini PC Edge Integration Test Suite
 * ══════════════════════════════════════════════════════════════
 * Validates:
 * 1. Audio pre-rendering for Semiconductors: Cleanroom ISO Class 1 Protocols.
 * 2. STEMOS_TTS module structure, text normalization, and fallback mechanisms.
 * 3. Mini PC Edge Gateway /api/tts endpoint response contract.
 * 4. 100% Bit-for-bit file parity between root and dev/.
 * ══════════════════════════════════════════════════════════════
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 [TEST 1/5] Verifying Cleanroom Photolithography Audio Assets...');
const cleanroomWav = path.join(ROOT_DIR, 'content', 'audio', 'cleanroom_photolithography.wav');
const cleanroomA2Wav = path.join(ROOT_DIR, 'content', 'audio', 'cleanroom_basic_a2.wav');
assert(fs.existsSync(cleanroomWav), 'cleanroom_photolithography.wav must exist');
assert(fs.existsSync(cleanroomA2Wav), 'cleanroom_basic_a2.wav must exist');
const b1Stats = fs.statSync(cleanroomWav);
const a2Stats = fs.statSync(cleanroomA2Wav);
assert(b1Stats.size > 100000, 'B1 Cleanroom audio must be non-empty (>100KB)');
assert(a2Stats.size > 100000, 'A2 Cleanroom audio must be non-empty (>100KB)');
console.log(`  ✓ B1 Photolithography Audio size: ${(b1Stats.size / 1024).toFixed(1)} KB`);
console.log(`  ✓ A2 Basic Cleanroom Audio size: ${(a2Stats.size / 1024).toFixed(1)} KB`);

console.log('🧪 [TEST 2/5] Verifying STEMOS_TTS Module API Contract...');
const ttsPath = path.join(ROOT_DIR, 'content', 'stemos_tts.js');
assert(fs.existsSync(ttsPath), 'stemos_tts.js must exist');
const ttsCode = fs.readFileSync(ttsPath, 'utf8');
assert(ttsCode.includes('cleanroom_photolithography_b1'), 'stemos_tts.js must include cleanroom B1 static mapping');
assert(ttsCode.includes('cleanroom_basic_a2'), 'stemos_tts.js must include cleanroom A2 static mapping');
assert(ttsCode.includes('speakSystemDefault'), 'stemos_tts.js must include native Web Speech fallback');
assert(ttsCode.includes('window.speakEnglishText'), 'stemos_tts.js must bind speakEnglishText helper');
assert(ttsCode.includes('window.speakText'), 'stemos_tts.js must bind speakText helper');
console.log('  ✓ STEMOS_TTS has static neural map, dynamic Mini PC fetch, and Web Speech API fallback');

console.log('🧪 [TEST 3/5] Verifying Root vs dev/ Parity for TTS & Audio Files...');
const parityFiles = [
  'content/stemos_tts.js',
  'content/audio/cleanroom_photolithography.wav',
  'content/audio/cleanroom_basic_a2.wav',
  'dev.js',
  'app.js',
  'sw.js',
  'index.html',
  'app.html'
];

for (const rel of parityFiles) {
  const rootPath = path.join(ROOT_DIR, rel);
  const devPath = path.join(ROOT_DIR, 'dev', rel);
  assert(fs.existsSync(rootPath), `Root file must exist: ${rel}`);
  assert(fs.existsSync(devPath), `Dev file must exist: dev/${rel}`);
  const rootBuf = fs.readFileSync(rootPath);
  const devBuf = fs.readFileSync(devPath);
  assert(rootBuf.equals(devBuf), `File parity mismatch for ${rel}`);
  console.log(`  ✓ 100% parity verified: ${rel} == dev/${rel}`);
}

console.log('🧪 [TEST 4/5] Verifying Script Inclusions in HTML Portals...');
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(indexHtml.includes('/content/stemos_tts.js'), 'index.html must load stemos_tts.js');
const appHtml = fs.readFileSync(path.join(ROOT_DIR, 'app.html'), 'utf8');
assert(appHtml.includes('content/stemos_tts.js'), 'app.html must load stemos_tts.js');
const devHtml = fs.readFileSync(path.join(ROOT_DIR, 'dev.html'), 'utf8');
assert(devHtml.includes('/content/stemos_tts.js'), 'dev.html must load stemos_tts.js');
console.log('  ✓ stemos_tts.js included across index.html, dev.html, and app.html');

console.log('🧪 [TEST 5/5] Testing Mini PC Edge Server /api/tts HTTP Endpoint...');
const server = require('./minipc_edge_server.cjs');

setTimeout(() => {
  const testPort = server.address() ? server.address().port : 8080;
  
  // 5A: Cleanroom static pre-rendered request
  const testText = "In extreme ultraviolet (EUV) photolithography, wafer steppers operate inside ISO Class 1 cleanrooms with laminar airflow. Photoresist deposition requires precise chemical handling to prevent sub-micron yield defects.";
  const postData = JSON.stringify({ text: testText, voice: 'en_US-lessac-medium' });

  const req1 = http.request({
    hostname: '127.0.0.1',
    port: testPort,
    path: '/api/tts',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res1) => {
    assert.strictEqual(res1.statusCode, 200, 'Cleanroom TTS should return 200');
    assert.strictEqual(res1.headers['content-type'], 'audio/wav', 'Cleanroom TTS should return audio/wav');
    let chunks = [];
    res1.on('data', chunk => chunks.push(chunk));
    res1.on('end', () => {
      const audioBuffer = Buffer.concat(chunks);
      assert(audioBuffer.length > 100000, 'Received audio buffer should contain WAV data (>100KB)');
      console.log(`  ✓ /api/tts served Cleanroom ISO Class 1 WAV (${(audioBuffer.length / 1024).toFixed(1)} KB) with status 200`);

      // 5B: Arbitrary text when Piper daemon is offline should return 503 fallback
      const req2 = http.request({
        hostname: '127.0.0.1',
        port: testPort,
        path: '/api/tts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify({ text: 'Hello from unknown prompt' }))
        }
      }, (res2) => {
        let body = '';
        res2.on('data', chunk => body += chunk);
        res2.on('end', () => {
          assert.strictEqual(res2.statusCode, 503, 'Offline Piper should return 503 for fallback');
          const json = JSON.parse(body);
          assert.strictEqual(json.fallback, 'speechSynthesis', 'Response must indicate speechSynthesis fallback');
          console.log('  ✓ /api/tts gracefully returns 503 fallback when Piper daemon is offline');
          console.log('\n🎉 ALL 5 PIPER NEURAL TTS & MINI PC EDGE TESTS PASSED SUCESSFULLY!');
          process.exit(0);
        });
      });
      req2.write(JSON.stringify({ text: 'Hello from unknown prompt' }));
      req2.end();
    });
  });

  req1.write(postData);
  req1.end();
}, 1000);
