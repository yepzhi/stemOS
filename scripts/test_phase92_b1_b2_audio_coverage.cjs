/**
 * stemOS LXP — Phase 92 Verification Suite:
 * CEFR B1 & B2 Full Neural Audio Coverage, TTS Map Integration & Service Worker v6.9.0
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 ==============================================================');
console.log('🧪 RUNNING PHASE 92: B1 & B2 AUDIO COVERAGE & SW v6.9.0 TESTS');
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

const ROOT = path.join(__dirname, '..');
const MCER_AUDIO_DIR = path.join(ROOT, 'content/audio/mcer');
const modTracks = require(path.join(ROOT, 'content/mcer_tracks.js'));
const tts = require(path.join(ROOT, 'content/stemos_tts.js'));

// Test 1: All 8 B1 and B2 Units have their MP3 files on disk
test('All B1 & B2 units (b1-u1..u4, b2-u1..u4) have complete MP3 files on disk', () => {
  const units = ['b1-u1', 'b1-u2', 'b1-u3', 'b1-u4', 'b2-u1', 'b2-u2', 'b2-u3', 'b2-u4'];
  let checkedCount = 0;

  units.forEach(uid => {
    const u = modTracks.getUnitById(uid);
    assert(u, `Unit ${uid} must exist in mcer_tracks`);

    // Dialogue turns
    const dLines = Array.isArray(u.dialogue) ? u.dialogue : (u.dialogue && u.dialogue.lines ? u.dialogue.lines : []);
    dLines.forEach((_, idx) => {
      const file = path.join(MCER_AUDIO_DIR, `${u.id}-d${idx + 1}.mp3`);
      assert(fs.existsSync(file), `Missing audio turn file: ${file}`);
      assert(fs.statSync(file).size > 1000, `Audio turn file too small: ${file}`);
      checkedCount++;
    });

    // Full dialogue
    const fullFile = path.join(MCER_AUDIO_DIR, `${u.id}-dialogue-full.mp3`);
    assert(fs.existsSync(fullFile), `Missing full dialogue file: ${fullFile}`);
    assert(fs.statSync(fullFile).size > 5000, `Full dialogue file too small: ${fullFile}`);
    checkedCount++;

    // Vocabulary
    (u.vocabulary || []).forEach(v => {
      const slug = v.term.toLowerCase().replace(/[^a-z0-9]/g, '');
      const vFile = path.join(MCER_AUDIO_DIR, `${u.id}-vocab-${slug}.mp3`);
      assert(fs.existsSync(vFile), `Missing vocab file: ${vFile}`);
      assert(fs.statSync(vFile).size > 1000, `Vocab file too small: ${vFile}`);
      checkedCount++;
    });

    // Pronunciation
    (u.pronunciationLab || []).forEach(p => {
      const word = p.word || p.term;
      const slug = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      const pFile = path.join(MCER_AUDIO_DIR, `${u.id}-pron-${slug}.mp3`);
      assert(fs.existsSync(pFile), `Missing pronunciation file: ${pFile}`);
      assert(fs.statSync(pFile).size > 1000, `Pronunciation file too small: ${pFile}`);
      checkedCount++;
    });

    // Listening
    if (u.listeningLab && u.listeningLab.audioScript) {
      const lFile = path.join(MCER_AUDIO_DIR, `${u.id}-listening-lab.mp3`);
      assert(fs.existsSync(lFile), `Missing listening lab file: ${lFile}`);
      assert(fs.statSync(lFile).size > 5000, `Listening lab file too small: ${lFile}`);
      checkedCount++;
    }

    // Reading
    const rPassage = u.reading ? (u.reading.passage || u.reading.text) : null;
    if (rPassage) {
      const rFile = path.join(MCER_AUDIO_DIR, `${u.id}-reading-passage.mp3`);
      assert(fs.existsSync(rFile), `Missing reading passage file: ${rFile}`);
      assert(fs.statSync(rFile).size > 5000, `Reading passage file too small: ${rFile}`);
      checkedCount++;
    }

    // Crucible
    if (u.crucible && u.crucible.modelResponse) {
      const cFile = path.join(MCER_AUDIO_DIR, `${u.id}-crucible-model.mp3`);
      assert(fs.existsSync(cFile), `Missing crucible model file: ${cFile}`);
      assert(fs.statSync(cFile).size > 5000, `Crucible model file too small: ${cFile}`);
      checkedCount++;
    }
  });

  assert.strictEqual(checkedCount, 150, `Expected 150 B1 and B2 files verified, got ${checkedCount}`);
});

// Test 2: content/stemos_tts.js getMcerAudioList returns comprehensive catalog (>= 280 items)
test('content/stemos_tts.js exports comprehensive MCER catalog with B1 and B2 assets', () => {
  const audioList = tts.getMcerAudioList();
  assert(Array.isArray(audioList), 'getMcerAudioList must return an array');
  assert(audioList.length >= 280, `Expected >= 280 items, got ${audioList.length}`);

  const b1Count = audioList.filter(u => u.includes('/b1-')).length;
  const b2Count = audioList.filter(u => u.includes('/b2-')).length;
  assert(b1Count >= 70, `Expected >= 70 B1 audio items, got ${b1Count}`);
  assert(b2Count >= 70, `Expected >= 70 B2 audio items, got ${b2Count}`);
});

// Test 3: MCER_STATIC_AUDIO dictionary maps normalized keys for B1 & B2 dialogues and scripts
test('MCER_STATIC_AUDIO resolves normalized text keys for B1 & B2', () => {
  function normalizeKey(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  const sampleChecks = [
    { text: 'Brian, could you walk me through the inspection sequence for this stamped bracket?', expected: '/content/audio/mcer/b1-u1-d1.mp3' },
    { text: 'Standard Operating Procedure (SOP)', expected: '/content/audio/mcer/b1-u1-vocab-standardoperatingproceduresop.mp3' },
    { text: 'Automation', expected: '/content/audio/mcer/b1-u1-pron-automation.mp3' },
    { text: modTracks.getUnitById('b1-u1').crucible.modelResponse, expected: '/content/audio/mcer/b1-u1-crucible-model.mp3' },
    { text: 'Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM.', expected: '/content/audio/mcer/b2-u3-d1.mp3' },
    { text: modTracks.getUnitById('b2-u4').crucible.modelResponse, expected: '/content/audio/mcer/b2-u4-crucible-model.mp3' }
  ];

  sampleChecks.forEach(sample => {
    const key = normalizeKey(sample.text);
    const resolved = tts.MCER_STATIC_AUDIO[key];
    assert.strictEqual(resolved, sample.expected, `Expected ${sample.text} to resolve to ${sample.expected}, got ${resolved}`);
  });
});

// Test 4: sw.js bumps cache to v6.9.0 and includes B1/B2 precache
test('Service Worker sw.js bumps cache to v6.9.0-mcer-full-audio and precaches B1 & B2 audio', () => {
  const swCode = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  assert(swCode.includes("const CACHE_NAME = 'stemos-lxp-v6.9.0-mcer-full-audio';"), 'sw.js must bump CACHE_NAME to v6.9.0-mcer-full-audio');
  assert(swCode.includes('/content/audio/mcer/b1-u1-d1.mp3'), 'sw.js must include b1-u1 audio');
  assert(swCode.includes('/content/audio/mcer/b2-u4-crucible-model.mp3'), 'sw.js must include b2-u4 audio');
});

// Test 5: Exact Parity with dev/ folder
test('dev/ folder maintains 100% bit-for-bit parity for sw.js and content/stemos_tts.js', () => {
  const rootSw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const devSw = fs.readFileSync(path.join(ROOT, 'dev/sw.js'), 'utf8');
  assert.strictEqual(rootSw, devSw, 'sw.js and dev/sw.js must be identical');

  const rootTts = fs.readFileSync(path.join(ROOT, 'content/stemos_tts.js'), 'utf8');
  const devTts = fs.readFileSync(path.join(ROOT, 'dev/content/stemos_tts.js'), 'utf8');
  assert.strictEqual(rootTts, devTts, 'content/stemos_tts.js and dev/content/stemos_tts.js must be identical');
});

console.log('\n==============================================================');
console.log(`🏁 PHASE 92 COMPLETED: ${passed}/${passed + failed} TESTS PASSED`);
console.log('==============================================================\n');

if (failed > 0) process.exit(1);
