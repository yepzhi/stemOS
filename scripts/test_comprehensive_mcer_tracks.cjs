/**
 * test_comprehensive_mcer_tracks.cjs
 * Comprehensive Verification Suite for stemOS MCER Curricular Ecosystem (CEFR A1–B2 • 240.0 Accredited Hours)
 * Tests:
 * 1. Root vs Dev Mirror Parity (content/mcer_tracks.js, app.html, app.js, tracks.html)
 * 2. 4 Levels & 16 Units 7-Dimension Pedagogical Architecture
 * 3. 464 Total Standardized MCQs Inventory (384 Unit MCQs + 80 Level Milestone Exam MCQs)
 * 4. 4 Milestone Certification Exams (A1, A2, B1, B2) with 75% Passing Threshold
 * 5. DOM & Interactive UI Hooks in app.html, app.js, and tracks.html
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName}${details ? ' -> ' + details : ''}`);
    failed++;
  }
}

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('🔬 stemOS Comprehensive MCER Tracks & Level Certification Audit');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ── 1. Root vs Dev Parity ──────────────────────────────────────────
console.log('▶ 1. Root vs Dev Mirror Parity');
const filesToVerify = [
  'content/mcer_tracks.js',
  'app.html',
  'app.js',
  'tracks.html'
];

filesToVerify.forEach(relPath => {
  const rootFile = path.join(ROOT_DIR, relPath);
  const devFile = path.join(ROOT_DIR, 'dev', relPath);
  
  assert(fs.existsSync(rootFile), `Root file exists: ${relPath}`);
  assert(fs.existsSync(devFile), `Dev file exists: dev/${relPath}`);
  
  const rootContent = fs.readFileSync(rootFile, 'utf8');
  const devContent = fs.readFileSync(devFile, 'utf8');
  assert(rootContent === devContent, `100% Bit-for-bit Parity: ${relPath} === dev/${relPath}`);
});

// ── 2. MCER Curricular Catalog Architecture ────────────────────────
console.log('\n▶ 2. Curricular Architecture & 240.0 Accredited Hours');
const catalogPath = path.join(ROOT_DIR, 'content/mcer_tracks.js');
let STEMOS_MCER_TRACKS = null;

try {
  const code = fs.readFileSync(catalogPath, 'utf8');
  const sandbox = { window: {}, module: {}, exports: {} };
  const vm = require('vm');
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  STEMOS_MCER_TRACKS = sandbox.window.STEMOS_MCER_TRACKS || sandbox.module.exports;
} catch (e) {
  console.error('Failed to load STEMOS_MCER_TRACKS in sandbox:', e.message);
}

assert(!!STEMOS_MCER_TRACKS, 'STEMOS_MCER_TRACKS exported and loadable in sandbox');

const levels = STEMOS_MCER_TRACKS.levels || {};
assert(Object.keys(levels).length === 4, 'Catalog contains exactly 4 CEFR levels: A1, A2, B1, B2');

const allUnits = STEMOS_MCER_TRACKS.getAllUnits ? STEMOS_MCER_TRACKS.getAllUnits() : [];
assert(allUnits.length === 16, `Catalog exports exactly 16 curricular units (found: ${allUnits.length})`);

let totalHours = 0;
allUnits.forEach(u => {
  totalHours += (u.estimatedHours || 15.0);
});
assert(totalHours === 240.0, `Total accredited curriculum equals 240.0 hours (found: ${totalHours}h)`);

// ── 3. 7 Pedagogical Dimensions Verification (16 Units) ───────────
console.log('\n▶ 3. 7 Pedagogical Dimensions Rigor Across All 16 Units');
let totalListeningMCQs = 0;
let totalGrammarMCQs = 0;
let totalVocabMCQs = 0;
let totalReadingMCQs = 0;
let totalQuizMCQs = 0;

allUnits.forEach(u => {
  const uId = u.id;
  const cefr = u.cefr;

  // Dim 1: Dialogue
  const hasDialogue = (Array.isArray(u.dialogue) && u.dialogue.length >= 2) || 
                      (u.dialogue && Array.isArray(u.dialogue.lines) && u.dialogue.lines.length >= 2);
  
  // Dim 2: Vocab & Phonetics & Collocation MCQs
  const hasVocab = Array.isArray(u.vocabulary) && u.vocabulary.length >= 6;
  const hasStress = Array.isArray(u.pronunciationLab) && u.pronunciationLab.length >= 2;
  const hasFalseCognates = Array.isArray(u.falseCognates) && u.falseCognates.length >= 2;
  const vMCQs = Array.isArray(u.vocabularyExercises) ? u.vocabularyExercises : [];
  const hasVocabMCQs = vMCQs.length === 4 && vMCQs.every(q => q.q && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === 'number' && q.exp);
  totalVocabMCQs += vMCQs.length;

  // Dim 3: Listening Lab (3 MCQs)
  const lLab = u.listeningLab;
  const hasListeningLab = lLab && lLab.title && lLab.audioScript && Array.isArray(lLab.questions) && lLab.questions.length === 3;
  const lMCQsValid = hasListeningLab && lLab.questions.every(q => q.q && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === 'number' && q.exp);
  if (hasListeningLab) totalListeningMCQs += lLab.questions.length;

  // Dim 4: Grammar Drills (5 MCQs)
  const gDrills = Array.isArray(u.grammarDrills) ? u.grammarDrills : [];
  const hasGrammarDrills = gDrills.length === 5 && gDrills.every(q => q.q && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === 'number' && q.exp && q.socraticHint);
  totalGrammarMCQs += gDrills.length;

  // Dim 5: Reading SOPs (4 MCQs)
  const rObj = u.reading;
  const rQuestions = rObj && Array.isArray(rObj.questions) ? rObj.questions : [];
  const hasReadingSOP = rObj && rObj.title && rObj.passage && rQuestions.length === 4;
  const rMCQsValid = hasReadingSOP && rQuestions.every(q => q.q && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === 'number' && q.exp);
  totalReadingMCQs += rQuestions.length;

  // Dim 6: Crucible Simulation
  const cruc = u.crucible;
  const hasCrucible = cruc && cruc.title && cruc.context && cruc.scenario && cruc.modelResponse && Array.isArray(cruc.keywords) && cruc.keywords.length >= 3;

  // Dim 7: Mastery Quiz (8 MCQs)
  const uQuiz = Array.isArray(u.unitQuiz) ? u.unitQuiz : [];
  const hasQuiz = uQuiz.length === 8 && uQuiz.every(q => q.question && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === 'number' && q.explanation && q.socraticHint);
  totalQuizMCQs += uQuiz.length;

  const unitComplete = hasDialogue && hasVocab && hasStress && hasFalseCognates && hasVocabMCQs &&
                       hasListeningLab && lMCQsValid && hasGrammarDrills && hasReadingSOP && rMCQsValid &&
                       hasCrucible && hasQuiz;

  assert(unitComplete, `Unit ${uId} (${cefr} U${u.unitNumber}) implements all 7 Pedagogical Dimensions with complete data`);
});

const unitQuestionsTotal = totalListeningMCQs + totalGrammarMCQs + totalVocabMCQs + totalReadingMCQs + totalQuizMCQs;
console.log(`\n  [INVENTORY] Unit Question Breakdown across 16 units:`);
console.log(`    - Listening MCQs:  ${totalListeningMCQs} (16 units x 3)`);
console.log(`    - Grammar MCQs:    ${totalGrammarMCQs} (16 units x 5)`);
console.log(`    - Vocab MCQs:      ${totalVocabMCQs} (16 units x 4)`);
console.log(`    - Reading MCQs:    ${totalReadingMCQs} (16 units x 4)`);
console.log(`    - Mastery Quizzes: ${totalQuizMCQs} (16 units x 8)`);
console.log(`    - Subtotal:        ${unitQuestionsTotal} items`);

assert(totalListeningMCQs === 48, 'Listening MCQs count is exactly 48 (16 x 3)');
assert(totalGrammarMCQs === 80, 'Grammar Drills count is exactly 80 (16 x 5)');
assert(totalVocabMCQs === 64, 'Vocab MCQs count is exactly 64 (16 x 4)');
assert(totalReadingMCQs === 64, 'Reading MCQs count is exactly 64 (16 x 4)');
assert(totalQuizMCQs === 128, 'Unit Mastery Quizzes count is exactly 128 (16 x 8)');
assert(unitQuestionsTotal === 384, 'Total Unit Questions equals exactly 384 MCQs');

// ── 4. Level Milestone Certification Exams (80 MCQs) ───────────────
console.log('\n▶ 4. Level Milestone Certification Exams (A1–B2 • 80 MCQs)');
assert(typeof STEMOS_MCER_TRACKS.getLevelExam === 'function', 'STEMOS_MCER_TRACKS exports getLevelExam(levelId)');

const examLevels = ['a1', 'a2', 'b1', 'b2'];
let totalExamMCQs = 0;

examLevels.forEach(lvl => {
  const exam = STEMOS_MCER_TRACKS.getLevelExam(lvl);
  assert(!!exam, `Milestone Exam ${lvl.toUpperCase()} exists`);
  assert(exam.totalItems === 20 && Array.isArray(exam.questions) && exam.questions.length === 20, `Exam ${lvl.toUpperCase()} contains exactly 20 standardized items`);
  assert(exam.passScorePct === 75, `Exam ${lvl.toUpperCase()} sets 75% passing mark`);
  assert(exam.timeMinutes >= 40 && exam.timeMinutes <= 60, `Exam ${lvl.toUpperCase()} sets level-appropriate time limit (${exam.timeMinutes} min)`);

  const allItemsValid = exam.questions.every(q => {
    return q.q && 
           Array.isArray(q.options) && q.options.length === 4 && 
           typeof q.answer === 'number' && q.answer >= 0 && q.answer <= 3 &&
           q.exp && q.section && q.category;
  });
  assert(allItemsValid, `Exam ${lvl.toUpperCase()} questions all contain valid 4 options, answers and technical rationales`);

  totalExamMCQs += exam.questions.length;
});

assert(totalExamMCQs === 80, `Total Milestone Certification Exam Questions equals exactly 80 MCQs (4 x 20)`);
const grandTotalMCQs = unitQuestionsTotal + totalExamMCQs;
assert(grandTotalMCQs === 464, `Grand Total Standardized MCQs across ecosystem is exactly 464 items (found: ${grandTotalMCQs})`);

// ── 5. DOM & Interactive UI Hooks ──────────────────────────────────
console.log('\n▶ 5. DOM & UI Hooks in app.html, app.js and tracks.html');
const appHtml = fs.readFileSync(path.join(ROOT_DIR, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');
const tracksHtml = fs.readFileSync(path.join(ROOT_DIR, 'tracks.html'), 'utf8');

// app.html hooks
assert(appHtml.includes('id="btn-mcer-launch-level-exam"'), 'app.html contains #btn-mcer-launch-level-exam in track banner');
assert(appHtml.includes('data-mcer-tab="listening"'), 'app.html contains Listening Lab tab in study modal');
assert(appHtml.includes('data-mcer-tab="grammar"'), 'app.html contains Grammar Drills tab in study modal');
assert(appHtml.includes('id="mcer-screen-listening"'), 'app.html contains #mcer-screen-listening');
assert(appHtml.includes('id="mcer-screen-grammar"'), 'app.html contains #mcer-screen-grammar');
assert(appHtml.includes('id="mcer-vocab-exercises-container"'), 'app.html contains #mcer-vocab-exercises-container');
assert(appHtml.includes('id="modal-mcer-level-exam"'), 'app.html contains #modal-mcer-level-exam dialog');
assert(appHtml.includes('id="btn-submit-mcer-exam"'), 'app.html contains #btn-submit-mcer-exam button');

// app.js hooks
assert(appJs.includes("screens = ['dialogue', 'vocab', 'listening', 'grammar', 'reading', 'crucible', 'quiz']"), 'app.js switchMcerModalTab handles all 7 pedagogical screens');
assert(appJs.includes('openMcerLevelExam'), 'app.js defines openMcerLevelExam(levelId)');
assert(appJs.includes('btn-mcer-launch-level-exam'), 'app.js wires #btn-mcer-launch-level-exam');
assert(appJs.includes('btn-submit-mcer-listening'), 'app.js wires #btn-submit-mcer-listening');
assert(appJs.includes('btn-submit-mcer-grammar'), 'app.js wires #btn-submit-mcer-grammar');
assert(appJs.includes('btn-submit-mcer-vocab'), 'app.js wires #btn-submit-mcer-vocab');

// tracks.html hooks
assert(tracksHtml.includes('id="tab-btn-mcer"'), 'tracks.html contains #tab-btn-mcer in workspace tab bar');
assert(tracksHtml.includes('id="mcer-catalog-section"'), 'tracks.html contains #mcer-catalog-section');
assert(tracksHtml.includes('id="tracks-mcer-units-grid"'), 'tracks.html contains #tracks-mcer-units-grid');
assert(tracksHtml.includes('switchTracksWorkspaceView(\'mcer\')'), 'tracks.html wires switchTracksWorkspaceView for mcer');
assert(tracksHtml.includes('initTracksMcerGrid'), 'tracks.html implements initTracksMcerGrid()');

// ── Final Summary ──────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed (out of ${passed + failed} total)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed === 0) {
  console.log('🎉 ALL COMPREHENSIVE MCER TRACKS, EXAMS & UI AUDITS PASSED (100%)!\n');
  process.exit(0);
} else {
  console.error(`❌ ${failed} AUDIT(S) FAILED. Please review output above.\n`);
  process.exit(1);
}
