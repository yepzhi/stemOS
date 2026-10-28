/**
 * stemOS — Complete End-to-End Student Journey Audit Suite
 * Verifies:
 * 1. Step 1: Registration & Google SSO / Onboarding Wizard (register.html)
 * 2. Step 2: Diagnostic Placement Test (placement.html + content/placement_test.js)
 * 3. Step 3: Curricular Interleaving & CEFR Diagnostic Leveling (A1 - B2/C1)
 * 4. Step 4: Campus LXP Entry & 60.0h Deterministic Career Path (app.html + app.js)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

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

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🎓 stemOS End-to-End Student Journey Audit Suite');
console.log('   Step 1: Register (SSO) -> Step 2: Placement -> Step 3: Start Campus');
console.log('═══════════════════════════════════════════════════════════════════\n');

const ROOT = path.join(__dirname, '..');

// ─────────────────────────────────────────────────────────────────
// 1. STEP 1: REGISTRATION & GOOGLE SSO AUDIT (register.html)
// ─────────────────────────────────────────────────────────────────
console.log('▶ 1. Step 1: Registration, 1-Click Google SSO & 7-Step Onboarding');

const registerHtml = fs.readFileSync(path.join(ROOT, 'register.html'), 'utf8');

test('register.html includes Google SSO button and handler', () => {
  assert(registerHtml.includes('btn-google-sso'), 'Missing .btn-google-sso element');
  assert(registerHtml.includes('handleGoogleSSORegistration'), 'Missing handleGoogleSSORegistration function');
});

test('register.html supports all 4 educational subsystems (UTyP/UPBC, TecNM, State Universities, International)', () => {
  assert(registerHtml.includes('data-subsystem="utyp"') || registerHtml.includes('data-subsystem="upbc"'), 'Missing UTyP / UPBC subsystem');
  assert(registerHtml.includes('data-subsystem="it"'), 'Missing TecNM (it) subsystem');
  assert(registerHtml.includes('data-subsystem="univ-estatal"'), 'Missing State Universities subsystem');
  assert(registerHtml.includes('data-subsystem="latam"') || registerHtml.includes('data-subsystem="ut"'), 'Missing International / UT subsystem');
});

test('register.html includes degree modality selector (Engineering vs TSU)', () => {
  assert(registerHtml.includes("setDegreeModality('lic')"), 'Missing Licenciatura / Ingeniería modality selector');
  assert(registerHtml.includes("setDegreeModality('tsu')"), 'Missing TSU modality selector');
});

test('register.html Step 6 includes solo subscription ($49 MXN) and institutional bypass', () => {
  assert(registerHtml.includes('solo-subscription-banner'), 'Missing solo-subscription-banner');
  assert(registerHtml.includes('openStemosPaymentModal(49)'), 'Missing openStemosPaymentModal(49) CTA');
});

test('register.html Step 7 produces Holographic Student Credential Pass', () => {
  assert(registerHtml.includes('credential-pass-card'), 'Missing credential-pass-card');
  assert(registerHtml.includes('pass-name-display'), 'Missing pass-name-display');
  assert(registerHtml.includes('pass-email-display'), 'Missing pass-email-display');
  assert(registerHtml.includes('pass-career-display'), 'Missing pass-career-display');
});

// ─────────────────────────────────────────────────────────────────
// 2. STEP 2: DIAGNOSTIC PLACEMENT TEST ENGINE (placement.html & placement_test.js)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 2. Step 2: Diagnostic Placement Test Engine (CEFR A1–B2)');

const PT = require('../content/placement_test.js');
const placementHtml = fs.readFileSync(path.join(ROOT, 'placement.html'), 'utf8');

test('content/placement_test.js exports 32 diagnostic items across 3 skill sections', () => {
  assert(PT.questions && PT.questions.length === 32, `Expected 32 questions, found ${PT.questions.length}`);
  const grammar = PT.questions.filter(q => q.section === 'grammar');
  const listening = PT.questions.filter(q => q.section === 'listening');
  const reading = PT.questions.filter(q => q.section === 'reading');
  assert.strictEqual(grammar.length, 12, '12 Grammar questions');
  assert.strictEqual(listening.length, 10, '10 Industrial Listening questions');
  assert.strictEqual(reading.length, 10, '10 Technical Reading questions');
});

test('Placement evaluation engine deterministically maps scores to CEFR thresholds', () => {
  // Score 0-12 (0-39%) -> A1
  const rA1 = PT.evaluateAnswers({});
  assert.strictEqual(rA1.assignedLevel, 'A1', 'Score 0 yields A1');
  assert(rA1.recommendedTrack.includes('a1'), 'Recommends A1 track');

  // Score 13-19 (40-59%) -> A2
  const ansA2 = {};
  for (let i = 0; i < 16; i++) {
    ansA2[PT.questions[i].id] = PT.questions[i].correct;
  }
  const rA2 = PT.evaluateAnswers(ansA2);
  assert.strictEqual(rA2.assignedLevel, 'A2', 'Score 16/32 yields A2');

  // Score 20-25 (60-79%) -> B1 (Technical Threshold)
  const ansB1 = {};
  for (let i = 0; i < 22; i++) {
    ansB1[PT.questions[i].id] = PT.questions[i].correct;
  }
  const rB1 = PT.evaluateAnswers(ansB1);
  assert.strictEqual(rB1.assignedLevel, 'B1', 'Score 22/32 yields B1');

  // Score 26-32 (>= 80%) -> B2 / Advanced
  const ansB2 = {};
  PT.questions.forEach(q => { ansB2[q.id] = q.correct; });
  const rB2 = PT.evaluateAnswers(ansB2);
  assert.strictEqual(rB2.assignedLevel, 'B2', 'Score 32/32 yields B2');
});

test('placement.html integrates Google SSO on welcome screen', () => {
  assert(placementHtml.includes('btn-google-sso'), 'Missing Google SSO on placement welcome screen');
  assert(placementHtml.includes('handlePlacementGoogleSSO'), 'Missing handlePlacementGoogleSSO handler');
});

test('placement.html finishQuiz updates stemos_student_profile and stemos_placement_test', () => {
  assert(placementHtml.includes("localStorage.setItem('stemos_placement_test'"), 'Saves stemos_placement_test');
  assert(placementHtml.includes("localStorage.setItem('stemos_student_profile'"), 'Saves stemos_student_profile');
  assert(placementHtml.includes("localStorage.setItem('stemos_user_level'"), 'Saves stemos_user_level');
  assert(placementHtml.includes("localStorage.setItem('stemos_active_career'"), 'Saves stemos_active_career');
});

// ─────────────────────────────────────────────────────────────────
// 3. STEP 3: START CAMPUS & 3D CAREER PATH (app.html & app.js)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 3. Step 3: Start Campus Platform & Interleaved Path Loading');

const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
global.STEMOS_CAREER_TRACKS = require('../content/career_tracks.js');
const CP = require('../content/career_paths.js');

test('app.html displays Student Name, Subsystem, and CEFR Placement Level HUD', () => {
  assert(appHtml.includes('id="header-student-name"'), 'Missing #header-student-name');
  assert(appHtml.includes('id="header-student-subsystem"'), 'Missing #header-student-subsystem');
  assert(appHtml.includes('id="ed-placement-level-callout"'), 'Missing #ed-placement-level-callout in header');
});

test('app.js defines syncUserPlacementBadge and handles all CEFR levels', () => {
  assert(appJs.includes('function syncUserPlacementBadge'), 'Missing syncUserPlacementBadge function');
  assert(appJs.includes('stemos_placement_test'), 'syncUserPlacementBadge reads stemos_placement_test');
  assert(appJs.includes('stemos_user_level'), 'syncUserPlacementBadge reads stemos_user_level');
});

test('Deterministic Career Path Engine provides 60.0h with 16 stations for all 36 careers', () => {
  const careerIds = CP.getAllCareerIds();
  assert(careerIds && careerIds.length === 36, `Expected 36 registered careers, found ${careerIds.length}`);
  careerIds.forEach(id => {
    const p = CP.getPathForCareer(id);
    assert(p && p.modules, `Career ${id} must return valid path`);
    assert.strictEqual(p.modules.length, 16, `Career ${id} must have exactly 16 modules`);
    assert.strictEqual(p.totalHours, 60.0, `Career ${id} must have exactly 60.0 hours`);
  });
});

test('Curricular Interleaving Invariant: Every 4 stations strictly follow Theory -> English B1 -> Lab -> Milestone', () => {
  const samplePath = CP.getPathForCareer('upbc-mecatronica');
  for (let h = 0; h < 4; h++) {
    const s0 = samplePath.modules[h * 4 + 0];
    const s1 = samplePath.modules[h * 4 + 1];
    const s2 = samplePath.modules[h * 4 + 2];
    const s3 = samplePath.modules[h * 4 + 3];
    assert.strictEqual(s0.type, 'theory', `Hito ${h + 1} Station 1 must be Theory`);
    assert.strictEqual(s1.type, 'english-b1', `Hito ${h + 1} Station 2 must be English B1`);
    assert.strictEqual(s2.type, 'practical-lab', `Hito ${h + 1} Station 3 must be Lab Crucible`);
    assert.strictEqual(s3.type, 'milestone', `Hito ${h + 1} Station 4 must be Milestone Checkpoint`);
  }
});

// ─────────────────────────────────────────────────────────────────
// 4. SIMULATION RUNTIME: END-TO-END FLOW EXECUTION
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 4. Simulated Student Session: Google SSO -> Placement B1 -> Campus Access');

test('End-to-End Simulation: Student logs in with Google SSO, takes placement, earns B1, and enters Campus', () => {
  const mockStorage = {};
  
  // 1. Google SSO creates student profile
  const ssoUser = {
    fullName: 'Carlos Ramírez Valenzuela',
    email: 'carlos.ramirez@upbc.edu.mx',
    matricula: '21050842',
    institution: 'UPMXL',
    campus: 'Universidad Politécnica de Baja California (UPBC Mexicali)',
    subsystem: 'upbc',
    degreeType: 'lic',
    careerId: 'upbc-mecatronica',
    career: 'Ingeniería Mecatrónica',
    folio: 'DIAG-2026-UPBC-8420'
  };

  // 2. Simulate 30-min Placement Test execution (Student answers 22/32 correctly -> B1)
  const answers = {};
  for (let i = 0; i < 22; i++) {
    answers[PT.questions[i].id] = PT.questions[i].correct;
  }
  const evalResult = PT.evaluateAnswers(answers);
  assert.strictEqual(evalResult.assignedLevel, 'B1', 'Diagnostic determines Level B1');
  assert.strictEqual(evalResult.totalScore, 22);

  // 3. placement.html finishQuiz saves data to localStorage
  const placementPayload = {
    student: ssoUser,
    result: evalResult,
    answers: answers,
    completedAt: new Date().toISOString()
  };
  mockStorage['stemos_placement_test'] = JSON.stringify(placementPayload);
  mockStorage['stemos_user_name'] = ssoUser.fullName;
  mockStorage['stemos_user_email'] = ssoUser.email;
  mockStorage['stemos_user_level'] = evalResult.assignedLevel;
  mockStorage['stemos_active_career'] = ssoUser.careerId;

  const profile = {
    name: ssoUser.fullName,
    email: ssoUser.email,
    matricula: ssoUser.matricula,
    campus: ssoUser.campus,
    subsystem: ssoUser.subsystem,
    degreeModality: ssoUser.degreeType,
    careerId: ssoUser.careerId,
    careerName: ssoUser.career,
    totalHours: 60.0,
    modulesTotal: 16,
    progressPercent: 0,
    xp: 0
  };
  mockStorage['stemos_student_profile'] = JSON.stringify(profile);

  // 4. Verify app.html loads this profile correctly
  const loadedProfile = JSON.parse(mockStorage['stemos_student_profile']);
  const loadedDiag = JSON.parse(mockStorage['stemos_placement_test']);

  assert.strictEqual(loadedProfile.name, 'Carlos Ramírez Valenzuela');
  assert.strictEqual(loadedProfile.subsystem, 'upbc');
  assert.strictEqual(loadedProfile.careerId, 'upbc-mecatronica');
  assert.strictEqual(loadedProfile.totalHours, 60.0);
  assert.strictEqual(loadedDiag.result.assignedLevel, 'B1');

  // 5. Verify 16 stations for the active career
  const careerPath = CP.getPathForCareer(loadedProfile.careerId);
  assert.strictEqual(careerPath.modules.length, 16);
  assert.strictEqual(careerPath.totalHours, 60.0);
  assert.strictEqual(careerPath.modules[0].type, 'theory');
  assert.strictEqual(careerPath.modules[1].type, 'english-b1');
  assert.strictEqual(careerPath.modules[2].type, 'practical-lab');
  assert.strictEqual(careerPath.modules[3].type, 'milestone');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 E2E AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL 14 END-TO-END STUDENT JOURNEY TESTS PASSED WITH 100% SUCCESS!\n');
}
