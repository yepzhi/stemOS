/**
 * stemOS — Phase 62 Audit Test Suite
 * Validates MCER Core Catalog (A1–B2) & Lightweight Placement Test Engine
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔬 stemOS Phase 62: MCER Core Catalog & Placement Test Audit');
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

// ─────────────────────────────────────────────────────────────────
// 1. FILE PARITY & INTEGRITY
// ─────────────────────────────────────────────────────────────────
console.log('▶ 1. File Parity & Source Integrity');

const pMcerRoot = path.join(__dirname, '../content/mcer_tracks.js');
const pMcerDev = path.join(__dirname, '../dev/content/mcer_tracks.js');
const pPtRoot = path.join(__dirname, '../content/placement_test.js');
const pPtDev = path.join(__dirname, '../dev/content/placement_test.js');

test('content/mcer_tracks.js exists and is non-empty', () => {
  assert(fs.existsSync(pMcerRoot), 'File missing');
  assert(fs.statSync(pMcerRoot).size > 1000, 'File too small');
});

test('dev/content/mcer_tracks.js is identical to root content', () => {
  assert(fs.existsSync(pMcerDev), 'dev mirror missing');
  assert.strictEqual(fs.readFileSync(pMcerRoot, 'utf8'), fs.readFileSync(pMcerDev, 'utf8'), 'Parity mismatch');
});

test('content/placement_test.js exists and is non-empty', () => {
  assert(fs.existsSync(pPtRoot), 'File missing');
  assert(fs.statSync(pPtRoot).size > 1000, 'File too small');
});

test('dev/content/placement_test.js is identical to root content', () => {
  assert(fs.existsSync(pPtDev), 'dev mirror missing');
  assert.strictEqual(fs.readFileSync(pPtRoot, 'utf8'), fs.readFileSync(pPtDev, 'utf8'), 'Parity mismatch');
});

// ─────────────────────────────────────────────────────────────────
// 2. MCER CORE CURRICULAR CATALOG (A1 - B2)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 2. MCER Core Curricular Catalog Architecture');

const mcerCatalog = require(pMcerRoot);

test('STEMOS_MCER_TRACKS exports valid API structure', () => {
  assert(mcerCatalog.version, 'version missing');
  assert(Array.isArray(mcerCatalog.levels), 'levels must be an array');
  assert.strictEqual(mcerCatalog.levels.length, 4, 'Must contain exactly 4 CEFR levels');
});

const levelCodes = ['A1', 'A2', 'B1', 'B2'];
levelCodes.forEach((code, idx) => {
  test(`Level ${code} is fully populated with 4 units & milestone`, () => {
    const lvl = mcerCatalog.levels[idx];
    assert.strictEqual(lvl.code, code, `Expected ${code}`);
    assert(lvl.totalHours === 15.0, 'Hours must be 15.0');
    assert(Array.isArray(lvl.units), 'units must be array');
    assert.strictEqual(lvl.units.length, 4, 'Level must contain 4 units');
    assert(lvl.milestone, 'milestone object required');
    assert(lvl.milestone.badgeId, 'badgeId required');

    lvl.units.forEach((u, uIdx) => {
      assert(u.id, `Unit ${uIdx + 1} id missing`);
      assert(u.title, `Unit ${uIdx + 1} title missing`);
      assert(u.cefrDescriptor, `Unit ${uIdx + 1} CEFR descriptor missing`);
      assert(u.grammarFocus, `Unit ${uIdx + 1} grammar focus missing`);
      assert(Array.isArray(u.vocabulary) && u.vocabulary.length >= 5, `Unit ${uIdx + 1} vocabulary >= 5 required`);
      assert(u.dialogue && u.dialogue.lines && u.dialogue.lines.length >= 4, `Unit ${uIdx + 1} dialogue required`);
      assert(u.reading && u.reading.question && u.reading.options, `Unit ${uIdx + 1} reading required`);
      assert(Array.isArray(u.quiz) && u.quiz.length >= 3, `Unit ${uIdx + 1} quiz >= 3 required`);
    });
  });
});

test('getAllUnits() returns exactly 16 curricular units', () => {
  const units = mcerCatalog.getAllUnits();
  assert.strictEqual(units.length, 16, 'Expected 16 units across 4 levels');
});

// ─────────────────────────────────────────────────────────────────
// 3. PLACEMENT TEST ENGINE (GRAMMAR, LISTENING, READING)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 3. Placement Test Engine Verification');

const placementEngine = require(pPtRoot);

test('STEMOS_PLACEMENT_TEST exports 32 questions', () => {
  assert(Array.isArray(placementEngine.questions), 'questions array required');
  assert.strictEqual(placementEngine.questions.length, 32, 'Expected 32 questions');
});

test('Grammar section contains exactly 12 questions', () => {
  const grammarQs = placementEngine.questions.filter(q => q.section === 'grammar');
  assert.strictEqual(grammarQs.length, 12, 'Expected 12 grammar questions');
  grammarQs.forEach(q => {
    assert(q.options && q.options.length === 4, 'Must have 4 options');
    assert(typeof q.correct === 'number', 'correct index required');
  });
});

test('Listening section contains exactly 10 questions with audio scripts', () => {
  const listeningQs = placementEngine.questions.filter(q => q.section === 'listening');
  assert.strictEqual(listeningQs.length, 10, 'Expected 10 listening questions');
  listeningQs.forEach(q => {
    assert(q.audioScript && q.audioScript.length > 10, 'audioScript required');
    assert(q.options && q.options.length === 4, 'Must have 4 options');
    assert(typeof q.correct === 'number', 'correct index required');
  });
});

test('Reading section contains exactly 10 questions with reading passages', () => {
  const readingQs = placementEngine.questions.filter(q => q.section === 'reading');
  assert.strictEqual(readingQs.length, 10, 'Expected 10 reading questions');
  readingQs.forEach(q => {
    assert(q.passage && q.passage.length > 20, 'passage text required');
    assert(q.options && q.options.length === 4, 'Must have 4 options');
    assert(typeof q.correct === 'number', 'correct index required');
  });
});

// ─────────────────────────────────────────────────────────────────
// 4. DETERMINISTIC SCORING & CEFR LEVEL DETERMINATION
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 4. Diagnostic Evaluation Simulation');

test('Evaluation Simulation: 0 correct -> CEFR A1 (0%)', () => {
  const answers = {};
  const res = placementEngine.evaluateAnswers(answers);
  assert.strictEqual(res.totalScore, 0);
  assert.strictEqual(res.percentage, 0);
  assert.strictEqual(res.assignedLevel, 'A1');
  assert.strictEqual(res.recommendedTrack, 'mcer-a1-foundations');
});

test('Evaluation Simulation: 15 correct -> CEFR A2 (47%)', () => {
  const answers = {};
  placementEngine.questions.slice(0, 15).forEach(q => {
    answers[q.id] = q.correct;
  });
  const res = placementEngine.evaluateAnswers(answers);
  assert.strictEqual(res.totalScore, 15);
  assert.strictEqual(res.assignedLevel, 'A2');
  assert.strictEqual(res.recommendedTrack, 'mcer-a2-workplace');
});

test('Evaluation Simulation: 22 correct -> CEFR B1 (69%)', () => {
  const answers = {};
  placementEngine.questions.slice(0, 22).forEach(q => {
    answers[q.id] = q.correct;
  });
  const res = placementEngine.evaluateAnswers(answers);
  assert.strictEqual(res.totalScore, 22);
  assert.strictEqual(res.assignedLevel, 'B1');
  assert.strictEqual(res.recommendedTrack, 'mcer-b1-professional');
});

test('Evaluation Simulation: 30 correct -> CEFR B2 (94%)', () => {
  const answers = {};
  placementEngine.questions.slice(0, 30).forEach(q => {
    answers[q.id] = q.correct;
  });
  const res = placementEngine.evaluateAnswers(answers);
  assert.strictEqual(res.totalScore, 30);
  assert.strictEqual(res.assignedLevel, 'B2');
  assert.strictEqual(res.recommendedTrack, 'mcer-b2-fluency');
});

test('Evaluation Simulation: 32/32 correct -> 100% Perfect B2', () => {
  const answers = {};
  placementEngine.questions.forEach(q => {
    answers[q.id] = q.correct;
  });
  const res = placementEngine.evaluateAnswers(answers);
  assert.strictEqual(res.totalScore, 32);
  assert.strictEqual(res.percentage, 100);
  assert.strictEqual(res.sectionScores.grammar.score, 12);
  assert.strictEqual(res.sectionScores.listening.score, 10);
  assert.strictEqual(res.sectionScores.reading.score, 10);
  assert.strictEqual(res.assignedLevel, 'B2');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed (out of ${passed + failed} total)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 62 MCER CORE & PLACEMENT TEST TESTS PASSED (100%)!\n');
}
