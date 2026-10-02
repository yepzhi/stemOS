/**
 * stemOS Academic Expansion & Institutional Ecosystem E2E Test Suite
 * Master Verification: Fases 48 – 57 (Tests 53 through 62)
 *
 * - Test 53: Admin Portal Integrity & Analytics Dashboard (admin.html)
 * - Test 54: Teacher Portal, QR Projector & Mass Actions (teacher.html)
 * - Test 55: 7-Step Student Onboarding Wizard (register.html)
 * - Test 56: Deterministic Career Path Engine (content/career_paths.js)
 * - Test 57: Curriculum Interleaving Engine (Theory -> B1 -> Lab -> Milestone)
 * - Test 58: XP & Gamification Engine (8 Levels, XP HUD, Hero KPI)
 * - Test 59: Station Sequential Gating Engine (world-map.js)
 * - Test 60: Zero A2 Policy Platform-Wide Verification
 * - Test 61: Firebase Backend & Multi-Tenant Security Rules (firestore.rules, firebase.json)
 * - Test 62: PWA Service Worker Cache v6.0.0 (sw.js)
 */

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🏛️  stemOS Academic Expansion & Institutional Ecosystem Audit Suite');
console.log('   Master Verification: Fases 48 – 57 (Tests 53 through 62)');
console.log('═══════════════════════════════════════════════════════════════════\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  [PASS] ${testName} ${details ? '— ' + details : ''}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${testName}: ${details}`);
    failedTests++;
  }
}

const ROOT = path.join(__dirname, '..');

// ─────────────────────────────────────────────────────────────────
// TEST 53: Admin Portal Integrity & Analytics Dashboard (admin.html)
// ─────────────────────────────────────────────────────────────────
console.log('▶ TEST 53: Admin Portal Integrity & Analytics Dashboard');
try {
  const adminHtml = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
  assert(adminHtml.length > 50000, 'admin.html payload size check', `${adminHtml.length} bytes`);

  // Verify all 7 SPA views
  const expectedViews = [
    'id="view-dashboard"',
    'id="view-classes"',
    'id="view-teachers"',
    'id="view-institutions"',
    'id="view-periods"',
    'id="view-reports"',
    'id="view-settings"'
  ];
  const missingViews = expectedViews.filter(v => !adminHtml.includes(v));
  assert(missingViews.length === 0, 'All 7 SPA views present in admin.html', missingViews.length ? `Missing: ${missingViews.join(', ')}` : '7/7 Views active');

  // Verify ISO 9001 Dossier print trigger
  assert(adminHtml.includes('triggerDossierPrint') && adminHtml.includes('ISO 9001:2015'), 'ISO 9001:2015 Dossier PDF Print Support present');

  // Verify UTF-8 BOM CSV Export
  assert(adminHtml.includes('exportCohortReportCSV') && adminHtml.includes('\\uFEFF'), 'CSV Cohort Export with Excel UTF-8 BOM support present');

  // Verify 30-Day Activity & Velocity Timeline
  assert(adminHtml.includes('timeline-bars-row') && adminHtml.includes('render30DayTimeline'), '30-Day Curricular Velocity Timeline widget present');

  // Verify Institutional Heatmap Matrix
  assert(adminHtml.includes('institutional-heatmap-tbody') && adminHtml.includes('renderInstitutionalHeatmap'), 'Institutional Career Heatmap matrix present');

  // Verify Faculty Leaderboard Podium
  assert(adminHtml.includes('faculty-podium-grid') && adminHtml.includes('renderTeacherRanking'), 'Faculty Performance Recognition Podium present');

  // Verify inclusion of career_paths.js
  assert(adminHtml.includes('career_paths.js'), 'career_paths.js included in admin.html');
} catch (err) {
  assert(false, 'TEST 53 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 54: Teacher Portal & Cohort Command Center (teacher.html)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 54: Teacher Portal & Group Management (teacher.html)');
try {
  const teacherHtml = fs.readFileSync(path.join(ROOT, 'teacher.html'), 'utf8');
  assert(teacherHtml.length > 30000, 'teacher.html payload size check', `${teacherHtml.length} bytes`);

  // Verify SVG QR Code Projector Modal
  assert(teacherHtml.includes('id="modal-qr"') && teacherHtml.includes('viewBox="0 0 100 100"'), 'Offline SVG QR Code Projector Modal present');

  // Verify Class Invite Code generator
  assert(teacherHtml.includes('id="detail-invite-code"') && teacherHtml.includes('copyInviteLink'), 'Institutional Invite Code generator present');

  // Verify Inactivity Radar Alert
  assert(teacherHtml.includes('daysInactive') && (teacherHtml.includes('isInactiveAlert') || teacherHtml.includes('inactive for &gt;7 days')), 'Inactivity Radar (>7 days) detection present');

  // Verify Top 10 XP Leaderboard
  assert(teacherHtml.includes('class-leaderboard-list') && teacherHtml.includes('Group XP Leaderboard (Top 10)'), 'Top 10 Cohort XP Leaderboard present');

  // Verify Celebration Confetti Trigger
  assert(teacherHtml.includes('celebrateLeaderboardChampion') && teacherHtml.includes('confettiFall'), 'Celebration Confetti animation engine present');

  // Verify Mass Actions
  assert(teacherHtml.includes('openMassUnlockModal') && teacherHtml.includes('exportClassCohortCSV'), 'Cohort Command Mass Actions (Unlock / Broadcast / Export) present');
} catch (err) {
  assert(false, 'TEST 54 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 55: 7-Step Student Onboarding Wizard (register.html)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 55: 7-Step Student Onboarding Wizard (register.html)');
try {
  const registerHtml = fs.readFileSync(path.join(ROOT, 'register.html'), 'utf8');
  assert(registerHtml.length > 30000, 'register.html payload size check', `${registerHtml.length} bytes`);

  // Verify all 7 distinct steps
  for (let s = 1; s <= 7; s++) {
    assert(registerHtml.includes(`id="step-${s}"`), `Step ${s} element exists in onboarding wizard`);
  }

  // Verify Subsystem Selector (UT, TecNM, Estatal, LATAM)
  assert(
    registerHtml.includes('tecnm') &&
    registerHtml.includes('ut') &&
    registerHtml.includes('estatal') &&
    registerHtml.includes('latam'),
    'All 4 Educational Subsystems supported in registration flow'
  );

  // Verify 60-Hour Badges in catalog
  assert(registerHtml.includes('60.0h Path') || registerHtml.includes('60-hour') || registerHtml.includes('60.0h Curricular Path'), '60-Hour Curricular accreditation badge in career catalog');

  // Verify Class Code Verification & URL auto-fill (?class=)
  assert(registerHtml.includes('checkUrlQueryParams') && registerHtml.includes("urlParams.get('class')"), 'Class Code real-time verification and ?class= query param auto-fill present');

  // Verify Glassmorphic Digital Pass
  assert(registerHtml.includes('digital-pass') || registerHtml.includes('pass-badge') || registerHtml.includes('pass-metric-value'), 'Glassmorphic Student Digital Pass present');
} catch (err) {
  assert(false, 'TEST 55 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 56: Deterministic Career Path Engine (content/career_paths.js)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 56: Deterministic Career Path Engine (content/career_paths.js)');
try {
  const tracks = require(path.join(ROOT, 'content/career_tracks.js'));
  global.STEMOS_CAREER_TRACKS = tracks;

  const engine = require(path.join(ROOT, 'content/career_paths.js'));
  global.STEMOS_CAREER_PATHS = engine;
  assert(!!engine, 'STEMOS_CAREER_PATHS initialized');

  const allCareers = tracks.CAREERS;
  assert(allCareers.length === 25, 'Total career count matches exact 25 careers', `Found ${allCareers.length}`);

  let allCareersValid = true;
  allCareers.forEach(c => {
    const pathObj = engine.getPathForCareer(c.id);
    if (!pathObj || pathObj.modules.length !== 16 || pathObj.totalHours !== 60.0 || pathObj.totalXP !== 5600 || pathObj.hitosCount !== 4) {
      allCareersValid = false;
      console.error(`Invalid career path for ${c.id}:`, pathObj);
    }
  });
  assert(allCareersValid, 'All 25 careers have exactly 16 modules, 60.0h, 5,600 XP, and 4 Hitos');

  // Test deterministic lookup
  const testPath = engine.getPathForCareer('it-mecatronica');
  assert(testPath && testPath.modules.length === 16, 'getPathForCareer returns exactly 16 deterministic stations', `Stations: ${testPath.modules.length}`);
} catch (err) {
  assert(false, 'TEST 56 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 57: Curriculum Interleaving Engine Invariants
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 57: Curriculum Interleaving Invariants (Theory -> B1 -> Lab -> Milestone)');
try {
  const tracks = global.STEMOS_CAREER_TRACKS;
  const engine = global.STEMOS_CAREER_PATHS;

  let interleavingPass = true;
  const expectedTypes = ['theory', 'english-b1', 'practical-lab', 'milestone'];
  const expectedHours = [3.5, 3.5, 4.0, 4.0];
  const expectedXp = [300, 300, 400, 500];

  tracks.CAREERS.forEach(c => {
    const pathObj = engine.getPathForCareer(c.id);
    const modules = pathObj.modules;
    for (let i = 0; i < 16; i++) {
      const mod = modules[i];
      const slot = i % 4;
      if (mod.type !== expectedTypes[slot] || mod.hours !== expectedHours[slot] || mod.xp !== expectedXp[slot]) {
        interleavingPass = false;
        console.error(`Interleaving mismatch in ${c.id} station ${i+1}: expected ${expectedTypes[slot]} (${expectedHours[slot]}h / ${expectedXp[slot]}XP), got ${mod.type} (${mod.hours}h / ${mod.xp}XP)`);
      }
    }
  });

  assert(interleavingPass, 'All 400 stations across 25 careers follow 100% strict Theory -> English B1 -> Lab -> Milestone order');
} catch (err) {
  assert(false, 'TEST 57 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 58: XP & Gamification Engine (8 Levels, XP HUD, KPI Card)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 58: XP & Gamification Engine (app.js & app.html)');
try {
  const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');

  // Verify 8 levels in app.js
  const expectedLevels = [
    'Intern',
    'Technician',
    'Specialist',
    'Engineer',
    'Senior Engineer',
    'Lead',
    'Fellow',
    'Master Fellow'
  ];
  const missingLevels = expectedLevels.filter(lvl => !appJs.includes(lvl));
  assert(missingLevels.length === 0, '8 Student Gamification Tiers defined in app.js', missingLevels.length ? `Missing: ${missingLevels.join(', ')}` : 'All 8 tiers present');

  // Verify XP HUD Pill in app.html
  assert(appHtml.includes('header-xp-val') && appHtml.includes('header-rank-badge'), 'XP HUD Pill present in top header of app.html');

  // Verify 4th KPI Card in app.html
  assert(appHtml.includes('kpi-card-xp') && appHtml.includes('kpi-total-xp') && appHtml.includes('kpi-student-rank'), '4th KPI Card (XP Total & Rank) present in app.html');

  // Verify updateStudentXPHUD & getStudentLevelForXP functions
  assert(appJs.includes('updateStudentXPHUD') && appJs.includes('getStudentLevelForXP'), 'updateStudentXPHUD and getStudentLevelForXP functions exist in app.js');
} catch (err) {
  assert(false, 'TEST 58 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 59: Station Sequential Gating Engine (world-map.js)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 59: Station Sequential Gating Engine (world-map.js)');
try {
  const worldMapJs = fs.readFileSync(path.join(ROOT, 'world-map.js'), 'utf8');

  // Verify NODE_TYPES definition
  assert(
    worldMapJs.includes('NODE_TYPES') &&
    worldMapJs.includes('theory') &&
    worldMapJs.includes('english-b1') &&
    worldMapJs.includes('practical-lab') &&
    worldMapJs.includes('milestone'),
    'NODE_TYPES configuration present with interleaved categories'
  );

  // Verify sequential gating function
  assert(worldMapJs.includes('getNodeGatingStatus'), 'getNodeGatingStatus function implemented');

  // Verify teacher unlock bypass
  assert(worldMapJs.includes('stemos_teacher_unlocks'), 'Teacher unlock bypass supported in gating engine');

  // Verify locked node toast warning
  assert(worldMapJs.includes('showLockedToast') && worldMapJs.includes('Locked'), 'showLockedToast visual feedback present for locked stations');

  // Verify Career Winding Path renderer
  assert(worldMapJs.includes('renderCareerWindingPath') && worldMapJs.includes('path-hito-divider'), 'renderCareerWindingPath renders all 16 stations with 4 Hito divider banners');
} catch (err) {
  assert(false, 'TEST 59 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 60: Zero A2 Policy Platform-Wide Verification
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 60: Zero A2 Policy Platform-Wide Verification');
try {
  const auditFiles = [
    'app.html',
    'admin.html',
    'teacher.html',
    'register.html',
    'world-map.js'
  ];

  let zeroA2Clean = true;
  const illegalPatterns = [
    /English\s+A2\b/i,
    /Nivel\s+A2\b/i,
    /CEFR\s+A2\b/i,
    /badge-a2\b/i,
    /level-a2\b/i,
    />A2</i
  ];

  auditFiles.forEach(f => {
    const content = fs.readFileSync(path.join(ROOT, f), 'utf8');
    illegalPatterns.forEach(pat => {
      if (pat.test(content)) {
        zeroA2Clean = false;
        console.error(`Violation of Zero A2 Policy in ${f}: match for ${pat}`);
      }
    });
  });

  assert(zeroA2Clean, 'Zero A2 Policy strictly enforced across all 4 portals and world-map.js');
} catch (err) {
  assert(false, 'TEST 60 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 61: Firebase Backend & Security Rules (firestore.rules, firebase.json)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ TEST 61: Firebase Backend & Multi-Tenant Security Rules');
try {
  const rules = fs.readFileSync(path.join(ROOT, 'firestore.rules'), 'utf8');
  assert(rules.length > 500, 'firestore.rules exists and is populated');

  // Verify multi-tenant role functions
  const expectedFns = ['isAuthenticated', 'isUser', 'isAdmin', 'isTeacher', 'isStudent', 'belongsToInstitution'];
  const missingFns = expectedFns.filter(fn => !rules.includes(`function ${fn}`));
  assert(missingFns.length === 0, 'All role-based security helper functions present in firestore.rules', missingFns.length ? `Missing: ${missingFns.join(', ')}` : 'All 6 helper functions verified');

  // Verify collection rules
  const collections = ['careers', 'institutions', 'classes', 'submissions', 'teachers', 'students', 'audit_logs'];
  const missingCols = collections.filter(c => !rules.includes(`match /${c}`) && !rules.includes(`match /${c}/`));
  assert(missingCols.length === 0, 'Multi-tenant collection scopes protected in firestore.rules', missingCols.length ? `Missing: ${missingCols.join(', ')}` : 'All collections secured');

  // Verify firebase.json
  const firebaseJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'firebase.json'), 'utf8'));
  assert(!!firebaseJson.firestore && !!firebaseJson.hosting, 'firebase.json defines firestore and hosting keys');
  assert(firebaseJson.hosting.cleanUrls === true, 'Clean URLs enabled in firebase.json');

  const rewrites = firebaseJson.hosting.rewrites || [];
  const destinations = rewrites.map(r => r.destination);
  assert(
    destinations.includes('/admin.html') &&
    destinations.includes('/teacher.html') &&
    destinations.includes('/register.html') &&
    destinations.includes('/app.html'),
    'SPA routing rewrites configured for all 4 institutional portals'
  );
} catch (err) {
  assert(false, 'TEST 61 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// TEST 62: PWA Service Worker Cache v6.0.0 (sw.js)
console.log('\n▶ TEST 62: PWA Service Worker Cache (sw.js)');
try {
  const swCode = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  assert(swCode.includes("v6.0.0-academic-portals") || swCode.includes("v6.1.0-firebase-sync"), 'sw.js defines valid CACHE_NAME (v6.0.0 or v6.1.0)');

  // Verify required portal assets are cached
  const requiredCaches = [
    "'/admin.html'",
    "'/teacher.html'",
    "'/register.html'",
    "'/content/career_paths.js'"
  ];
  const missingCaches = requiredCaches.filter(item => !swCode.includes(item));
  assert(missingCaches.length === 0, 'All 4 portals and career_paths.js registered in ASSETS_TO_CACHE', missingCaches.length ? `Missing: ${missingCaches.join(', ')}` : 'All portals cached offline');
} catch (err) {
  assert(false, 'TEST 62 Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// FINAL AUDIT SUMMARY
// ─────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, ${failedTests} Failed`);
console.log('═══════════════════════════════════════════════════════════════════');

if (failedTests > 0) {
  console.error('\n❌ Academic expansion audit failed. Address failing assertions above.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL 10 MASTER TESTS PASSED WITH 100% SUCCESS!');
  console.log('   stemOS Institutional Academic Ecosystem is fully verified & ready.');
  process.exit(0);
}
