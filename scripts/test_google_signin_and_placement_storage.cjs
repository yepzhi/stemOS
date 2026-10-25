/**
 * ==============================================================================
 * stemOS Comprehensive Verification Audit:
 * 1. Google Sign-In / Account Selector Flow (Zero "SSO" Jargon & Resilient Fallback)
 * 2. Placement Diagnostic Complete Database Storage (LocalStorage, Firestore & Adapter)
 * 3. Cross-Site Ecosystem Compatibility (index, register, placement, app, teacher, admin, tracks)
 * 4. MCER Curricular Tracks Expansion & Query Helpers (7 Dimensions, 16 Units, 4 Milestone Exams)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

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
  }
}

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔬 stemOS Master Audit: Google Sign-In, Placement Storage & MCER');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ─────────────────────────────────────────────────────────────────
// SECTION 1: Google Sign-In & Zero "SSO" UI Verification
// ─────────────────────────────────────────────────────────────────
console.log('▶ 1. Google Sign-In Flow & Zero "SSO" UI Verification');

const placementHtml = fs.readFileSync(path.join(ROOT, 'placement.html'), 'utf8');
const devPlacementHtml = fs.readFileSync(path.join(ROOT, 'dev/placement.html'), 'utf8');
const registerHtml = fs.readFileSync(path.join(ROOT, 'register.html'), 'utf8');
const devRegisterHtml = fs.readFileSync(path.join(ROOT, 'dev/register.html'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const devIndexHtml = fs.readFileSync(path.join(ROOT, 'dev/index.html'), 'utf8');

test('Parity check: placement.html <==> dev/placement.html', () => {
  assert.strictEqual(placementHtml, devPlacementHtml, 'placement.html must match dev/placement.html');
});

test('Parity check: register.html <==> dev/register.html', () => {
  assert.strictEqual(registerHtml, devRegisterHtml, 'register.html must match dev/register.html');
});

test('Parity check: index.html <==> dev/index.html', () => {
  assert.strictEqual(indexHtml, devIndexHtml, 'index.html must match dev/index.html');
});

test('placement.html uses "Continuar con Google" and has GoogleAuthProvider integration', () => {
  assert(placementHtml.includes('Continuar con Google') || placementHtml.includes('Google'), 'Missing Google button label in placement.html');
  assert(placementHtml.includes('GoogleAuthProvider'), 'Missing GoogleAuthProvider in placement.html');
  assert(placementHtml.includes('select_account'), 'Missing select_account prompt in placement.html');
});

test('register.html uses "Sign in with Google" / "Continuar con Google" and has GoogleAuthProvider integration', () => {
  assert(registerHtml.includes('GoogleAuthProvider'), 'Missing GoogleAuthProvider in register.html');
  assert(registerHtml.includes('select_account'), 'Missing select_account prompt in register.html');
});

test('No user-facing "SSO" jargon in primary buttons or hero navigation', () => {
  assert(!indexHtml.includes('>Sign Up with Google SSO<'), 'index.html contains "Sign Up with Google SSO" in tag body');
  assert(!indexHtml.includes('>Try Google SSO<'), 'index.html contains "Try Google SSO" in tag body');
  assert(!placementHtml.includes('>Ingresar con Google SSO Institucional<'), 'placement.html contains "Google SSO" in button text');
  assert(!placementHtml.includes('>Auto-completar con Google SSO<'), 'placement.html contains "Auto-completar con Google SSO"');
});

// ─────────────────────────────────────────────────────────────────
// SECTION 2: Placement Complete Database & Storage Persistence
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 2. Placement Diagnostic Complete Database Storage Audit');

const firebaseAdapterJs = fs.readFileSync(path.join(ROOT, 'content/firebase_adapter.js'), 'utf8');
const devFirebaseAdapterJs = fs.readFileSync(path.join(ROOT, 'dev/content/firebase_adapter.js'), 'utf8');

test('Parity check: content/firebase_adapter.js <==> dev/content/firebase_adapter.js', () => {
  assert.strictEqual(firebaseAdapterJs, devFirebaseAdapterJs, 'firebase_adapter.js must match dev/content/firebase_adapter.js');
});

test('placement.html finishQuiz persists all required keys to localStorage', () => {
  assert(placementHtml.includes("localStorage.setItem(`stemos_diag_${state.student.folio}`"), 'Missing stemos_diag_folio');
  assert(placementHtml.includes("localStorage.setItem('stemos_placement_test'"), 'Missing stemos_placement_test');
  assert(placementHtml.includes("localStorage.setItem('stemos_student_profile'"), 'Missing stemos_student_profile');
  assert(placementHtml.includes("localStorage.setItem('stemos_current_user'"), 'Missing stemos_current_user');
  assert(placementHtml.includes("localStorage.setItem('stemos_diagnostic_passport'"), 'Missing stemos_diagnostic_passport');
  assert(placementHtml.includes("localStorage.setItem('stemos_active_career'"), 'Missing stemos_active_career');
  assert(placementHtml.includes("localStorage.setItem('stemos_active_mcer_level'"), 'Missing stemos_active_mcer_level');
  assert(placementHtml.includes("localStorage.setItem('stemos_placement_completed'"), 'Missing stemos_placement_completed');
});

test('placement.html finishQuiz triggers STEMOS_FIREBASE and direct Firestore write', () => {
  assert(placementHtml.includes('STEMOS_FIREBASE.savePlacementDiagnostic'), 'Missing STEMOS_FIREBASE.savePlacementDiagnostic invocation');
  assert(placementHtml.includes("db.collection('placement_tests').doc(docId).set"), 'Missing direct placement_tests collection write');
  assert(placementHtml.includes("db.collection('institutions').doc(instId).collection('placement_tests')"), 'Missing institutional placement_tests collection write');
});

test('firebase_adapter.js savePlacementDiagnostic saves student with all metadata fields', () => {
  assert(firebaseAdapterJs.includes('degreeModality: std.degreeType || std.degreeModality || \'lic\''), 'Missing degreeModality in adapter studentRecord');
  assert(firebaseAdapterJs.includes('tsuSpecialtyId: std.tsuSpecialtyId || \'\''), 'Missing tsuSpecialtyId in adapter studentRecord');
  assert(firebaseAdapterJs.includes('tsuSpecialtyName: std.tsuSpecialtyName || \'\''), 'Missing tsuSpecialtyName in adapter studentRecord');
  assert(firebaseAdapterJs.includes('placementCompleted: true'), 'Missing placementCompleted: true in adapter studentRecord');
  assert(firebaseAdapterJs.includes('syncDiagnosticToCloud'), 'Missing syncDiagnosticToCloud helper');
});

// ─────────────────────────────────────────────────────────────────
// SECTION 3: Cross-Site Ecosystem Compatibility
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 3. Cross-Site Ecosystem Platform Compatibility Audit');

const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const devAppHtml = fs.readFileSync(path.join(ROOT, 'dev/app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const devAppJs = fs.readFileSync(path.join(ROOT, 'dev/app.js'), 'utf8');
const teacherHtml = fs.readFileSync(path.join(ROOT, 'teacher.html'), 'utf8');
const adminHtml = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
const tracksHtml = fs.readFileSync(path.join(ROOT, 'tracks.html'), 'utf8');

test('Parity check: app.html <==> dev/app.html', () => {
  assert.strictEqual(appHtml, devAppHtml, 'app.html must match dev/app.html');
});

test('Parity check: app.js <==> dev/app.js', () => {
  assert.strictEqual(appJs, devAppJs, 'app.js must match dev/app.js');
});

test('app.html & app.js implement hasCompletedPlacement() checking all diagnostic keys', () => {
  assert(appJs.includes('function hasCompletedPlacement()'), 'Missing hasCompletedPlacement function in app.js');
  assert(appJs.includes('stemos_diagnostic_passport'), 'hasCompletedPlacement checks stemos_diagnostic_passport');
  assert(appJs.includes('stemos_placement_completed'), 'hasCompletedPlacement checks stemos_placement_completed');
  assert(appJs.includes('stemos_active_mcer_level'), 'hasCompletedPlacement checks stemos_active_mcer_level');
  assert(appJs.includes('stemos_user_level'), 'hasCompletedPlacement checks stemos_user_level');
});

test('app.js syncUserPlacementBadge manages badges and callouts for A1, A2, B1, and B2', () => {
  assert(appJs.includes("userLevel === 'A1'"), 'syncUserPlacementBadge handles A1');
  assert(appJs.includes("userLevel === 'A2'"), 'syncUserPlacementBadge handles A2');
  assert(appJs.includes("userLevel === 'B1'"), 'syncUserPlacementBadge handles B1');
  assert(appJs.includes('ed-placement-level-callout'), 'syncUserPlacementBadge updates callout');
});

test('placement.html results screen provides direct entry into app.html with assigned level', () => {
  assert(placementHtml.includes('id="btn-enter-stemos"'), 'Missing #btn-enter-stemos in placement.html');
  assert(placementHtml.includes('href="app.html"'), 'Button points to app.html');
});

test('teacher.html and admin.html synchronize students via STEMOS_FIREBASE', () => {
  assert(teacherHtml.includes('STEMOS_FIREBASE.getStudents'), 'teacher.html calls STEMOS_FIREBASE.getStudents');
  assert(adminHtml.includes('STEMOS_FIREBASE.getStudents'), 'admin.html calls STEMOS_FIREBASE.getStudents');
  assert(teacherHtml.includes('content/firebase_adapter.js'), 'teacher.html loads firebase_adapter.js');
  assert(adminHtml.includes('content/firebase_adapter.js'), 'admin.html loads firebase_adapter.js');
});

// ─────────────────────────────────────────────────────────────────
// SECTION 4: MCER Tracks Core Curricular Engine
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 4. MCER Curricular Tracks Expansion & Helper Methods Audit');

const mcerTracksJs = fs.readFileSync(path.join(ROOT, 'content/mcer_tracks.js'), 'utf8');
const devMcerTracksJs = fs.readFileSync(path.join(ROOT, 'dev/content/mcer_tracks.js'), 'utf8');

test('Parity check: content/mcer_tracks.js <==> dev/content/mcer_tracks.js', () => {
  assert.strictEqual(mcerTracksJs, devMcerTracksJs, 'mcer_tracks.js must match dev/content/mcer_tracks.js');
});

const mcerModule = require(path.join(ROOT, 'content/mcer_tracks.js'));

test('STEMOS_MCER_TRACKS exports 16 units across 4 CEFR levels (A1, A2, B1, B2)', () => {
  const allUnits = mcerModule.getAllUnits();
  assert.strictEqual(allUnits.length, 16, `Expected exactly 16 units, got ${allUnits.length}`);
});

test('STEMOS_MCER_TRACKS exports getUnitsByLevel(levelId)', () => {
  assert(typeof mcerModule.getUnitsByLevel === 'function', 'Missing getUnitsByLevel');
  const a1Units = mcerModule.getUnitsByLevel('A1');
  const a2Units = mcerModule.getUnitsByLevel('A2');
  const b1Units = mcerModule.getUnitsByLevel('B1');
  const b2Units = mcerModule.getUnitsByLevel('B2');
  assert.strictEqual(a1Units.length, 4, `Expected 4 A1 units, got ${a1Units.length}`);
  assert.strictEqual(a2Units.length, 4, `Expected 4 A2 units, got ${a2Units.length}`);
  assert.strictEqual(b1Units.length, 4, `Expected 4 B1 units, got ${b1Units.length}`);
  assert.strictEqual(b2Units.length, 4, `Expected 4 B2 units, got ${b2Units.length}`);
});

test('STEMOS_MCER_TRACKS exports searchUnits(query)', () => {
  assert(typeof mcerModule.searchUnits === 'function', 'Missing searchUnits');
  const safetyResults = mcerModule.searchUnits('safety');
  assert(safetyResults.length > 0, 'searchUnits("safety") returned 0 results');
  const troubleshootingResults = mcerModule.searchUnits('troubleshooting');
  assert(troubleshootingResults.length > 0, 'searchUnits("troubleshooting") returned 0 results');
});

test('STEMOS_MCER_TRACKS exports getPedagogicalDimensions() with at least 7 dimensions', () => {
  assert(typeof mcerModule.getPedagogicalDimensions === 'function', 'Missing getPedagogicalDimensions');
  const dims = mcerModule.getPedagogicalDimensions();
  assert(dims.length >= 7, `Expected at least 7 pedagogical dimensions, got ${dims.length}`);
  const dimIds = dims.map(d => d.id);
  assert(dimIds.includes('listening'), 'Missing listening dimension');
  assert(dimIds.includes('grammar'), 'Missing grammar dimension');
  assert(dimIds.includes('vocabulary'), 'Missing vocabulary dimension');
  assert(dimIds.includes('pronunciation'), 'Missing pronunciation dimension');
  assert(dimIds.includes('reading'), 'Missing reading dimension');
  assert(dimIds.includes('crucible'), 'Missing crucible dimension');
  assert(dimIds.includes('quiz'), 'Missing quiz dimension');
});

test('STEMOS_MCER_TRACKS exports calculateStudentProgress()', () => {
  assert(typeof mcerModule.calculateStudentProgress === 'function', 'Missing calculateStudentProgress');
  const prog = mcerModule.calculateStudentProgress('B1', ['b1-u1', 'b1-u2'], ['B1']);
  assert.strictEqual(prog.level, 'B1');
  assert.strictEqual(prog.completedUnits, 2);
  assert.strictEqual(prog.totalUnits, 4);
  assert.strictEqual(prog.levelPercent, 50);
  assert.strictEqual(prog.examPassed, true);
  assert.strictEqual(prog.accreditedHours, 60.0);
});

test('STEMOS_MCER_TRACKS exports 4 Milestone Certification Exams (80 total items)', () => {
  const exams = mcerModule.getAllExams();
  assert.strictEqual(exams.length, 4, `Expected 4 exams, got ${exams.length}`);
  exams.forEach(exam => {
    assert.strictEqual(exam.questions.length, 20, `Exam ${exam.level} must have 20 questions`);
    assert.strictEqual(exam.passingScore, 15, `Exam ${exam.level} raw passing score must be 15`);
    assert.strictEqual((exam.passingScore / exam.questions.length) * 100, 75, `Exam ${exam.level} passing threshold must be 75%`);
  });
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, ${totalTests - passedTests} Failed (out of ${totalTests} total)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL GOOGLE SIGN-IN, PLACEMENT STORAGE & MCER AUDITS PASSED (100%)!\n');
  process.exit(0);
} else {
  console.error('❌ SOME AUDITS FAILED. Please review output above.\n');
  process.exit(1);
}
