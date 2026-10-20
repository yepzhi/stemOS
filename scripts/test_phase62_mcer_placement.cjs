/**
 * stemOS — Phase 62 Master Audit Test Suite
 * Validates MCER Core Catalog (A1–B2), Lightweight 3-Skill Placement Test Engine,
 * Whitish Aurora Placement Web App, and Dual-World UI Integrations.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔬 stemOS Phase 62: MCER Core Catalog, Whitish Aurora Placement & UI Audit');
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

const pPlaceHtmlRoot = path.join(__dirname, '../placement.html');
const pPlaceHtmlDev = path.join(__dirname, '../dev/placement.html');
const pAppHtmlRoot = path.join(__dirname, '../app.html');
const pAppHtmlDev = path.join(__dirname, '../dev/app.html');
const pAppJsRoot = path.join(__dirname, '../app.js');
const pAppJsDev = path.join(__dirname, '../dev/app.js');
const pTeacherHtmlRoot = path.join(__dirname, '../teacher.html');
const pTeacherHtmlDev = path.join(__dirname, '../dev/teacher.html');
const pAdminHtmlRoot = path.join(__dirname, '../admin.html');
const pAdminHtmlDev = path.join(__dirname, '../dev/admin.html');

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

test('placement.html exists and matches dev/placement.html', () => {
  assert(fs.existsSync(pPlaceHtmlRoot), 'placement.html missing');
  assert(fs.existsSync(pPlaceHtmlDev), 'dev/placement.html missing');
  assert.strictEqual(fs.readFileSync(pPlaceHtmlRoot, 'utf8'), fs.readFileSync(pPlaceHtmlDev, 'utf8'), 'Parity mismatch');
});

test('app.html parity with dev/app.html', () => {
  assert.strictEqual(fs.readFileSync(pAppHtmlRoot, 'utf8'), fs.readFileSync(pAppHtmlDev, 'utf8'), 'Parity mismatch in app.html');
});

test('app.js parity with dev/app.js', () => {
  assert.strictEqual(fs.readFileSync(pAppJsRoot, 'utf8'), fs.readFileSync(pAppJsDev, 'utf8'), 'Parity mismatch in app.js');
});

test('teacher.html parity with dev/teacher.html', () => {
  assert.strictEqual(fs.readFileSync(pTeacherHtmlRoot, 'utf8'), fs.readFileSync(pTeacherHtmlDev, 'utf8'), 'Parity mismatch in teacher.html');
});

test('admin.html parity with dev/admin.html', () => {
  assert.strictEqual(fs.readFileSync(pAdminHtmlRoot, 'utf8'), fs.readFileSync(pAdminHtmlDev, 'utf8'), 'Parity mismatch in admin.html');
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

// ─────────────────────────────────────────────────────────────────
// 5. WHITISH AURORA PLACEMENT APP & USER FLOW AUDIT
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 5. Whitish Aurora Placement App (placement.html) Audit');

const placementHtml = fs.readFileSync(pPlaceHtmlRoot, 'utf8');

test('placement.html incorporates Whitish Aurora styling & orbs', () => {
  assert(placementHtml.includes('aurora-bg'), 'aurora-bg required');
  assert(placementHtml.includes('aurora-mesh'), 'aurora-mesh required');
  assert(placementHtml.includes('aurora-orb orb-1'), 'aurora orbs required');
  assert(placementHtml.includes('--bg-base: #f8fafc'), 'whitish base background required');
  assert(!placementHtml.includes('--bg-dark: #050505'), 'black glow background must be absent');
});

test('placement.html has 30-minute timer configured', () => {
  assert(placementHtml.includes('30:00'), '30:00 countdown badge required');
  assert(placementHtml.includes('30 * 60'), '30 minutes time limit calculation required');
});

test('placement.html implements all 5 sequential screens', () => {
  assert(placementHtml.includes('id="screen-welcome"'), 'screen-welcome required');
  assert(placementHtml.includes('id="screen-survey"'), 'screen-survey required');
  assert(placementHtml.includes('id="screen-instructions"'), 'screen-instructions required');
  assert(placementHtml.includes('id="screen-quiz"'), 'screen-quiz required');
  assert(placementHtml.includes('id="screen-results"'), 'screen-results required');
});

test('placement.html includes institutional registration fields', () => {
  assert(placementHtml.includes('id="reg-first-name"'), 'first name field required');
  assert(placementHtml.includes('id="reg-last-name"'), 'last name field required');
  assert(placementHtml.includes('id="reg-email"'), 'email field required');
  assert(placementHtml.includes('id="reg-matricula"'), 'matricula field required');
  assert(placementHtml.includes('id="reg-institution"'), 'institution field required');
  assert(placementHtml.includes('id="reg-career"'), 'career field required');
  assert(placementHtml.includes('id="toggle-audio-check"'), 'audio check toggle required');
});

test('placement.html includes Web Speech API audio player & animated waveform', () => {
  assert(placementHtml.includes('id="listening-audio-box"'), 'listening audio box required');
  assert(placementHtml.includes('id="audio-wave-anim"'), 'audio waveform animation required');
  assert(placementHtml.includes('id="btn-play-prompt"'), 'play audio button required');
});

// ─────────────────────────────────────────────────────────────────
// 6. DUAL-WORLD & PLATFORM UI INTEGRATION AUDIT
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 6. Dual-World & Platform UI Integration Audit');

const appHtml = fs.readFileSync(pAppHtmlRoot, 'utf8');
const appJs = fs.readFileSync(pAppJsRoot, 'utf8');
const teacherHtml = fs.readFileSync(pTeacherHtmlRoot, 'utf8');
const adminHtml = fs.readFileSync(pAdminHtmlRoot, 'utf8');

test('app.html has Dual-World navigation bar (MCER vs ESP)', () => {
  assert(appHtml.includes('id="btn-world-mcer"'), 'btn-world-mcer button required');
  assert(appHtml.includes('id="btn-world-esp"'), 'btn-world-esp button required');
  assert(appHtml.includes('id="section-world-mcer"'), 'section-world-mcer container required');
  assert(appHtml.includes('id="section-world-esp"'), 'section-world-esp container required');
  assert(appHtml.includes('id="ed-mcer-units-grid"'), 'ed-mcer-units-grid required');
});

test('app.html includes MCER Unit Interactive Study modal with 4 tabs', () => {
  assert(appHtml.includes('id="modal-mcer-unit"'), 'modal-mcer-unit dialog required');
  assert(appHtml.includes('data-mcer-tab="dialogue"'), 'dialogue tab required');
  assert(appHtml.includes('data-mcer-tab="vocab"'), 'vocab tab required');
  assert(appHtml.includes('data-mcer-tab="reading"'), 'reading tab required');
  assert(appHtml.includes('data-mcer-tab="quiz"'), 'quiz tab required');
});

test('app.html links to placement.html in rail and hero', () => {
  assert(appHtml.includes('id="nav-btn-placement"'), 'nav rail button required');
  assert(appHtml.includes('href="placement.html"'), 'placement.html link required');
  assert(appHtml.includes('id="btn-hero-launch-placement"'), 'hero launch button required');
});

test('app.js includes MCER rendering and placement badge sync methods', () => {
  assert(appJs.includes('renderMcerUnitsGrid'), 'renderMcerUnitsGrid function required');
  assert(appJs.includes('openMcerUnitModal'), 'openMcerUnitModal function required');
  assert(appJs.includes('syncUserPlacementBadge'), 'syncUserPlacementBadge function required');
});

test('teacher.html includes Program Curricular Type in group modal and CEFR in roster', () => {
  assert(teacherHtml.includes('id="new-group-program"'), 'new-group-program select required');
  assert(teacherHtml.includes('MCER Tracks (Standard American English · A1–B2)'), 'MCER track option required');
  assert(teacherHtml.includes('<th>CEFR Level</th>'), 'CEFR Level column in roster required');
  assert(teacherHtml.includes('placementLevel'), 'placementLevel data field required');
});

test('admin.html includes Cohort Placement Diagnostic Baseline Card', () => {
  assert(adminHtml.includes('Evaluación Diagnóstica MCER de Ingreso (A1–B2)'), 'MCER banner heading required');
  assert(adminHtml.includes('1,500 alumnos'), '1,500 students cohort capacity noted');
  assert(adminHtml.includes('href="placement.html"'), 'link to placement.html in admin required');
  assert(adminHtml.includes('CEFR A1 · Foundations'), 'A1 card required');
  assert(adminHtml.includes('CEFR A2 · Waystage'), 'A2 card required');
  assert(adminHtml.includes('CEFR B1 · Threshold'), 'B1 card required');
  assert(adminHtml.includes('CEFR B2 · Vantage'), 'B2 card required');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed (out of ${passed + failed} total)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 62 MCER CORE & PLACEMENT TEST TESTS PASSED (100%)!\n');
}
