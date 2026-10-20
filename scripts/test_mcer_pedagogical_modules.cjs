/**
 * stemOS — MCER 60.0h Pedagogical Modules & Plant Crucible Audit Suite
 * ══════════════════════════════════════════════════════════════════════
 * Validates:
 * 1. 100% of the 16 MCER units have False Cognates (Alertas de Falsos Amigos)
 * 2. 100% of the 16 MCER units have Pronunciation Lab with Syllable Stress
 * 3. 100% of the 16 MCER units have Crucible Simulations with Lead Model Audio Transcripts & Rubrics
 * 4. Interactive DOM components in app.html and app.js
 * 5. 100% Bit-for-bit file parity between root and dev/ mirrors
 * ══════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔬 stemOS MCER 60.0h Pedagogical Modules & Industrial Crucible Audit');
console.log('═══════════════════════════════════════════════════════════════════\n');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  [PASS] ${description}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${description}`);
    console.error(`         ${err.message}`);
    failed++;
  }
}

// 1. File Parity
console.log('▶ 1. Root vs Dev Mirror Parity');
const parityPairs = [
  ['content/mcer_tracks.js', 'dev/content/mcer_tracks.js'],
  ['app.html', 'dev/app.html'],
  ['app.js', 'dev/app.js']
];

parityPairs.forEach(([r, d]) => {
  test(`File Parity: ${r} === ${d}`, () => {
    const rootPath = path.join(ROOT, r);
    const devPath = path.join(ROOT, d);
    assert(fs.existsSync(rootPath), `Root missing: ${r}`);
    assert(fs.existsSync(devPath), `Dev missing: ${d}`);
    const rootBuf = fs.readFileSync(rootPath);
    const devBuf = fs.readFileSync(devPath);
    assert(rootBuf.equals(devBuf), `Parity mismatch between ${r} and ${d}`);
  });
});

// 2. MCER Tracks Pedagogical Dataset
console.log('\n▶ 2. 16 Units Pedagogical Rigor (False Cognates, Stress & Crucible)');
const mcerCatalog = require(path.join(ROOT, 'content/mcer_tracks.js'));
const allUnits = mcerCatalog.getAllUnits();

test('Catalog exports exactly 16 normalized units across 4 CEFR levels', () => {
  assert.strictEqual(allUnits.length, 16, 'Expected exactly 16 units');
});

allUnits.forEach((u, idx) => {
  test(`Unit ${u.id} (${u.cefr} U${u.unitNumber}) includes False Cognates, Stress & Crucible`, () => {
    // False Cognates
    assert(Array.isArray(u.falseCognates), `Unit ${u.id} falseCognates must be an array`);
    assert(u.falseCognates.length >= 2, `Unit ${u.id} must have at least 2 false cognates (found ${u.falseCognates.length})`);
    u.falseCognates.forEach(fc => {
      assert(fc.term, `Term required in ${u.id}`);
      assert(fc.mistake, `Mistake required in ${u.id}`);
      assert(fc.correct, `Correct meaning required in ${u.id}`);
      assert(fc.tip, `Engineering tip required in ${u.id}`);
    });

    // Pronunciation Lab
    assert(Array.isArray(u.pronunciationLab), `Unit ${u.id} pronunciationLab must be an array`);
    assert(u.pronunciationLab.length >= 2, `Unit ${u.id} must have at least 2 pronunciation words (found ${u.pronunciationLab.length})`);
    u.pronunciationLab.forEach(pl => {
      assert(pl.term, `Term required in ${u.id}`);
      assert(pl.stress, `Stress required in ${u.id}`);
      assert(pl.ipa, `IPA required in ${u.id}`);
      assert(pl.rule, `Phonetic rule required in ${u.id}`);
    });

    // Industrial Crucible Simulation
    assert(u.crucible, `Unit ${u.id} crucible object required`);
    assert(u.crucible.title, `Crucible title required in ${u.id}`);
    assert(u.crucible.context, `Crucible context required in ${u.id}`);
    assert(u.crucible.scenario, `Crucible scenario required in ${u.id}`);
    assert(u.crucible.modelResponse && u.crucible.modelResponse.length > 30, `Crucible model response required in ${u.id}`);
    assert(Array.isArray(u.crucible.keywords) && u.crucible.keywords.length >= 3, `Crucible keywords (>=3) required in ${u.id}`);
    assert(u.crucible.rubric, `Crucible rubric criteria required in ${u.id}`);
  });
});

// 3. HTML & JS Component Wiring
console.log('\n▶ 3. Interactive UI Elements in app.html & app.js');
const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

test('app.html contains False Cognates and Pronunciation Lab containers', () => {
  assert(appHtml.includes('id="mcer-false-cognates-section"'), 'mcer-false-cognates-section missing');
  assert(appHtml.includes('id="mcer-false-cognates-grid"'), 'mcer-false-cognates-grid missing');
  assert(appHtml.includes('id="mcer-pronunciation-lab-section"'), 'mcer-pronunciation-lab-section missing');
  assert(appHtml.includes('id="mcer-pronunciation-lab-grid"'), 'mcer-pronunciation-lab-grid missing');
});

test('app.html contains Interactive Crucible Input & AI Rubric Dashboard', () => {
  assert(appHtml.includes('id="btn-mcer-crucible-play-model"'), 'btn-mcer-crucible-play-model missing');
  assert(appHtml.includes('id="mcer-crucible-model-text"'), 'mcer-crucible-model-text missing');
  assert(appHtml.includes('id="mcer-crucible-input"'), 'mcer-crucible-input missing');
  assert(appHtml.includes('id="btn-mcer-crucible-dictate"'), 'btn-mcer-crucible-dictate missing');
  assert(appHtml.includes('id="btn-mcer-crucible-submit"'), 'btn-mcer-crucible-submit missing');
  assert(appHtml.includes('id="mcer-crucible-results-box"'), 'mcer-crucible-results-box missing');
  assert(appHtml.includes('id="mcer-rubric-grammar-score"'), 'mcer-rubric-grammar-score missing');
  assert(appHtml.includes('id="mcer-rubric-lexicon-score"'), 'mcer-rubric-lexicon-score missing');
  assert(appHtml.includes('id="mcer-rubric-pragmatics-score"'), 'mcer-rubric-pragmatics-score missing');
});

test('app.js implements rendering and AI grading for crucible', () => {
  assert(appJs.includes('mcer-false-cognates-grid'), 'app.js must populate false cognates grid');
  assert(appJs.includes('mcer-pronunciation-lab-grid'), 'app.js must populate pronunciation lab grid');
  assert(appJs.includes('btn-mcer-crucible-play-model'), 'app.js must bind model audio player');
  assert(appJs.includes('btn-mcer-crucible-dictate'), 'app.js must bind speech dictation');
  assert(appJs.includes('btn-mcer-crucible-submit'), 'app.js must bind crucible evaluation');
  assert(appJs.includes('stemos_crucible_'), 'app.js must track crucible completion');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
console.log('═══════════════════════════════════════════════════════════════════');

if (failed > 0) {
  process.exit(1);
}
console.log('🎉 ALL PEDAGOGICAL & INDUSTRIAL CRUCIBLE TESTS PASSED (100%)!\n');
