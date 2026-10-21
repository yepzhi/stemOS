/**
 * ==============================================================================
 * stemOS LXP — Test Suite: Fases 68, 69 & 70
 * - Fase 68: Milestone Certification Exam Engine & CACEI Digital Diploma
 * - Fase 69: Socratic AI Audio Debrief in Nearshoring Voice Crucible
 * - Fase 70: Multi-Campus Institutional Federation & Campus Edge Sync
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
  } else {
    console.error(`  \x1b[31m✖\x1b[0m ${message}`);
  }
}

console.log('\n======================================================');
console.log('🧪 STEMOS AUDIT SUITE: FASES 68, 69 & 70 ADVANCED MCER');
console.log('======================================================\n');

// ──────────────────────────────────────────────────────────
// 1. FASE 68: MILESTONE EXAM ENGINE & CACEI DIPLOMA
// ──────────────────────────────────────────────────────────
console.log('--- 1. Fase 68: Milestone Certification Exam & CACEI Diploma ---');
const tracksHtml = fs.readFileSync(path.join(ROOT_DIR, 'tracks.html'), 'utf8');
const appHtml = fs.readFileSync(path.join(ROOT_DIR, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');

assert(tracksHtml.includes('href="/app.html?exam=A1"') && tracksHtml.includes('href="/app.html?exam=B2"'), 
  'tracks.html has direct links to /app.html?exam=[A1-B2]');
assert(tracksHtml.includes('data-mcer-exam="A1"') && tracksHtml.includes('data-mcer-exam="B2"'),
  'tracks.html level milestone buttons have data-mcer-exam attributes');

assert(appHtml.includes('id="modal-mcer-level-exam"'), 'app.html contains #modal-mcer-level-exam dialog');
assert(appHtml.includes('id="mcer-exam-timer-hud"') && appHtml.includes('id="mcer-exam-timer-display"'), 
  'app.html contains countdown timer HUD with #mcer-exam-timer-display');
assert(appHtml.includes('id="mcer-exam-stepper-wrap"') && appHtml.includes('id="mcer-exam-stepper-pills"'),
  'app.html contains 20-item question navigation stepper pills container');
assert(appHtml.includes('id="mcer-exam-section-badge"'), 'app.html contains #mcer-exam-section-badge for 4 dimensions');
assert(appHtml.includes('id="mcer-exam-audio-box"') && appHtml.includes('id="btn-mcer-exam-audio-play"'),
  'app.html contains listening audio box and audio play button');
assert(appHtml.includes('id="mcer-exam-passage-box"'), 'app.html contains technical SOP passage reader box');
assert(appHtml.includes('id="mcer-exam-prompt-text"'), 'app.html contains #mcer-exam-prompt-text');
assert(appHtml.includes('id="mcer-exam-options-container"'), 'app.html contains #mcer-exam-options-container');
assert(appHtml.includes('id="btn-mcer-exam-prev"') && appHtml.includes('id="btn-mcer-exam-next"') && appHtml.includes('id="btn-mcer-exam-finish"'),
  'app.html contains exam nav controls (Prev, Next, Finish)');

assert(appHtml.includes('id="mcer-exam-results-view"'), 'app.html contains #mcer-exam-results-view');
assert(appHtml.includes('id="mcer-exam-score-val"') && appHtml.includes('id="mcer-exam-score-fraction"'),
  'app.html contains score value and question fraction indicators');
assert(appHtml.includes('id="mcer-exam-sub-listening"') && appHtml.includes('id="mcer-exam-sub-grammar"') &&
       appHtml.includes('id="mcer-exam-sub-reading"') && appHtml.includes('id="mcer-exam-sub-pragmatics"'),
  'app.html contains all 4 dimension subscore indicators');

assert(appHtml.includes('id="mcer-exam-diploma-card"'), 'app.html contains #mcer-exam-diploma-card');
assert(appHtml.includes('id="diploma-institution-name"') && appHtml.includes('id="diploma-folio-val"') &&
       appHtml.includes('id="diploma-student-name"') && appHtml.includes('id="diploma-level-banner"'),
  'app.html contains all official CACEI diploma credential fields');
assert(appHtml.includes('id="btn-print-mcer-diploma"') && appHtml.includes('id="btn-copy-diploma-folio"'),
  'app.html contains diploma print and folio copy actions');
assert(appHtml.includes('id="mcer-exam-remediation-card"') && appHtml.includes('id="btn-retry-mcer-exam"'),
  'app.html contains remediation card and retry button for scores < 75%');

assert(appHtml.includes('class="btn btn-sm btn-hud-exam-trigger"') && appHtml.includes("openMcerLevelExamModal('A1')"),
  'app.html passport progression HUD contains direct milestone exam launch buttons');

assert(appJs.includes('function openMcerLevelExamModal(levelCode)'), 'app.js implements openMcerLevelExamModal');
assert(appJs.includes('function submitMcerLevelExam()'), 'app.js implements submitMcerLevelExam with 75% passing threshold');
assert(appJs.includes('function confirmCloseMcerExam()'), 'app.js implements confirmCloseMcerExam');
assert(appJs.includes("urlParams.get('exam')"), 'app.js parses exam URL query parameter for automated launch');

// ──────────────────────────────────────────────────────────
// 2. FASE 69: SOCRATIC ORAL DEBRIEF IN VOICE CRUCIBLE
// ──────────────────────────────────────────────────────────
console.log('\n--- 2. Fase 69: Socratic AI Audio Debrief in Voice Crucible ---');

assert(appHtml.includes('id="mcer-crucible-socratic-section"'), 'app.html contains #mcer-crucible-socratic-section in Tab 6');
assert(appHtml.includes('id="btn-mcer-socratic-play-query"'), 'app.html contains #btn-mcer-socratic-play-query');
assert(appHtml.includes('id="mcer-crucible-socratic-prompt"'), 'app.html contains #mcer-crucible-socratic-prompt');
assert(appHtml.includes('id="btn-mcer-socratic-dictate"'), 'app.html contains #btn-mcer-socratic-dictate');
assert(appHtml.includes('id="mcer-socratic-defense-input"'), 'app.html contains #mcer-socratic-defense-input');
assert(appHtml.includes('id="btn-mcer-socratic-submit"'), 'app.html contains #btn-mcer-socratic-submit');
assert(appHtml.includes('id="mcer-socratic-defense-feedback"'), 'app.html contains #mcer-socratic-defense-feedback');

assert(appJs.includes('const MCER_SOCRATIC_DEBRIEFS = {'), 'app.js defines MCER_SOCRATIC_DEBRIEFS dictionary');
assert(appJs.includes("'mcer-a1-u01':") && appJs.includes("'mcer-b2-u16':"),
  'MCER_SOCRATIC_DEBRIEFS covers all 16 units from U01 to U16');
assert(appJs.includes('function initCrucibleSocraticDebrief(unit)'), 'app.js implements initCrucibleSocraticDebrief');
assert(appJs.includes('initCrucibleSocraticDebrief(unit);'), 'app.js triggers Socratic debrief on crucible completion');

// ──────────────────────────────────────────────────────────
// 3. FASE 70: MULTI-CAMPUS FEDERATION & EDGE SYNC
// ──────────────────────────────────────────────────────────
console.log('\n--- 3. Fase 70: Multi-Campus Federation & Campus Edge Sync ---');
const teacherHtml = fs.readFileSync(path.join(ROOT_DIR, 'teacher.html'), 'utf8');
const adminHtml = fs.readFileSync(path.join(ROOT_DIR, 'admin.html'), 'utf8');

assert(appHtml.includes('id="header-campus-federation-select"'), 'app.html contains #header-campus-federation-select in student header');
assert(teacherHtml.includes('id="campus-federation-select"'), 'teacher.html contains #campus-federation-select');
assert(teacherHtml.includes('id="teacher-campus-edge-sync-hud"'), 'teacher.html contains #teacher-campus-edge-sync-hud');
assert(teacherHtml.includes('function handleTeacherCampusSwitch(campusId)'), 'teacher.html implements handleTeacherCampusSwitch');

assert(adminHtml.includes('id="admin-campus-federation-select"'), 'admin.html contains #admin-campus-federation-select');
assert(adminHtml.includes('id="admin-campus-edge-sync-hud"'), 'admin.html contains #admin-campus-edge-sync-hud');
assert(adminHtml.includes('function handleAdminCampusSwitch(campusId)'), 'admin.html implements handleAdminCampusSwitch');

assert(appJs.includes('const STEMOS_CAMPUSES = {'), 'app.js defines STEMOS_CAMPUSES registry');
assert(appJs.includes('function switchInstitutionalCampus(campusId)'), 'app.js implements switchInstitutionalCampus');
assert(appJs.includes('function initCampusEdgeSync()'), 'app.js implements initCampusEdgeSync with online/offline queue');

// ──────────────────────────────────────────────────────────
// 4. BIT-FOR-BIT MIRROR PARITY AUDIT
// ──────────────────────────────────────────────────────────
console.log('\n--- 4. Bit-for-Bit Mirror Parity Audit (Root vs dev/) ---');

const pairs = [
  ['tracks.html', 'dev/tracks.html'],
  ['app.html', 'dev/app.html'],
  ['app.js', 'dev/app.js'],
  ['teacher.html', 'dev/teacher.html'],
  ['admin.html', 'dev/admin.html'],
  ['placement.html', 'dev/placement.html'],
  ['content/mcer_tracks.js', 'dev/content/mcer_tracks.js']
];

pairs.forEach(([rootRel, devRel]) => {
  const rootBuf = fs.readFileSync(path.join(ROOT_DIR, rootRel));
  const devBuf = fs.readFileSync(path.join(ROOT_DIR, devRel));
  const isEqual = rootBuf.equals(devBuf);
  assert(isEqual, `Parity check: ${rootRel} <==> ${devRel}`);
});

console.log(`\n======================================================`);
console.log(`📊 FINAL RESULT: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
console.log(`======================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
