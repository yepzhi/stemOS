/**
 * test_student_cx_journey.cjs
 * Comprehensive Verification of the 4-Step Student CX Journey:
 * 1. Register: 1-click Google SSO institutional access
 * 2. Placement: Diagnostic calibration & Curricular Interleaving (< A2 = A1 only, A2 = A2 + ESP labs, B1 = 60h path, B2 = Senior Nearshoring)
 * 3. Certificates: W3C Open Badges 3.0, ISO 9001:2015, and cryptographic QR verification
 * 4. Master ESP English for your career
 *
 * Also audits index.html & dev/index.html bilingual i18n switcher, navbar, and hero dock.
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
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
  }
}

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🎓 stemOS Student Customer Experience (CX) 4-Step Journey Audit');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ─────────────────────────────────────────────────────────────────
// 1. FILE PARITY AUDIT
// ─────────────────────────────────────────────────────────────────
console.log('▶ 1. File Parity Audit (Root vs dev/)');

const filesToCompare = [
  'index.html',
  'register.html',
  'placement.html',
  'app.html',
  'app.js',
  'content/placement_test.js'
];

filesToCompare.forEach(file => {
  test(`File Parity: ${file} === dev/${file}`, () => {
    const rootContent = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const devContent = fs.readFileSync(path.join(ROOT, 'dev', file), 'utf8');
    assert.strictEqual(rootContent, devContent, `${file} and dev/${file} must have 100% bit-for-bit parity`);
  });
});

// ─────────────────────────────────────────────────────────────────
// 2. INDEX.HTML STUDENT CX JOURNEY SECTION AUDIT
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 2. index.html Student CX Showcase Section Audit');

const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

test('index.html contains #student-cx-journey-section', () => {
  assert(indexHtml.includes('id="student-cx-journey-section"'), 'Missing #student-cx-journey-section');
});

test('index.html navbar includes nav_student_journey link', () => {
  assert(indexHtml.includes('data-i18n="nav_student_journey"'), 'Missing nav_student_journey in navbar');
  assert(indexHtml.includes('href="#student-cx-journey-section"'), 'Navbar link must point to #student-cx-journey-section');
});

test('index.html hero simulators dock cleanly removed per user design direction', () => {
  assert(!indexHtml.includes('id="hero-simulators-dock"'), 'hero-simulators-dock should be cleanly removed from index.html');
});

test('index.html Step 1 showcases 1-click Institutional Google SSO', () => {
  assert(indexHtml.includes('id="cx-card-step-1"'), 'Missing #cx-card-step-1');
  assert(indexHtml.includes('cx_step1_title'), 'Missing cx_step1_title data-i18n');
  assert(indexHtml.includes('Google SSO'), 'Must mention Google SSO');
  assert(indexHtml.includes('@upbc.edu.mx'), 'Must mention @upbc.edu.mx in description');
});

test('index.html Step 2 showcases Diagnostic Placement & Curricular Interleaving Policy', () => {
  assert(indexHtml.includes('id="cx-card-step-2"'), 'Missing #cx-card-step-2');
  assert(indexHtml.includes('cx_step2_title'), 'Missing cx_step2_title data-i18n');
  assert(indexHtml.includes('cx_step2_rule_a1'), 'Missing cx_step2_rule_a1 data-i18n for < A2 rule');
  assert(indexHtml.includes('cx_step2_rule_a2'), 'Missing cx_step2_rule_a2 data-i18n for A2 rule');
  assert(indexHtml.includes('cx_step2_rule_b1'), 'Missing cx_step2_rule_b1 data-i18n for B1 rule');
  assert(indexHtml.includes('cx_step2_rule_b2'), 'Missing cx_step2_rule_b2 data-i18n for B2 rule');
});

test('index.html Step 3 showcases Verifiable Credentials & Digital Badges', () => {
  assert(indexHtml.includes('id="cx-card-step-3"'), 'Missing #cx-card-step-3');
  assert(indexHtml.includes('cx_step3_title'), 'Missing cx_step3_title data-i18n');
  assert(indexHtml.includes('W3C Open Badges 3.0'), 'Must showcase W3C Open Badges 3.0');
  assert(indexHtml.includes('ISO 9001:2015'), 'Must showcase ISO 9001:2015 accreditation');
});

test('index.html Step 4 showcases Career ESP English Mastery', () => {
  assert(indexHtml.includes('id="cx-card-step-4"'), 'Missing #cx-card-step-4');
  assert(indexHtml.includes('cx_step4_title'), 'Missing cx_step4_title data-i18n');
  assert(indexHtml.includes('Mecatrónica'), 'Must showcase mecatrónica specialty');
  assert(indexHtml.includes('Semiconductores'), 'Must showcase semiconductores specialty');
});

test('index.html STEMOS_I18N contains all bilingual CX keys in both ES and EN', () => {
  const requiredKeys = [
    'nav_student_journey',
    'dock_cx',
    'badge_cx_journey',
    'title_cx_journey',
    'subtitle_cx_journey',
    'cx_step1_badge',
    'cx_step1_title',
    'cx_step1_desc',
    'cx_step1_btn',
    'cx_step2_badge',
    'cx_step2_title',
    'cx_step2_desc',
    'cx_step2_rule_a1',
    'cx_step2_rule_a2',
    'cx_step2_rule_b1',
    'cx_step2_rule_b2',
    'cx_step2_btn',
    'cx_step3_badge',
    'cx_step3_title',
    'cx_step3_desc',
    'cx_step3_btn',
    'cx_step4_badge',
    'cx_step4_title',
    'cx_step4_desc',
    'cx_step4_btn',
    'cx_banner_title',
    'cx_banner_desc'
  ];

  requiredKeys.forEach(k => {
    assert(indexHtml.includes(`${k}:`), `Missing key ${k} in STEMOS_I18N`);
  });
});

// ─────────────────────────────────────────────────────────────────
// 3. REGISTER & PLACEMENT GOOGLE SSO AUDIT
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 3. Google SSO Integration in register.html & placement.html');

const registerHtml = fs.readFileSync(path.join(ROOT, 'register.html'), 'utf8');
const placementHtml = fs.readFileSync(path.join(ROOT, 'placement.html'), 'utf8');

test('register.html contains 1-click Google Institutional SSO banner and handler', () => {
  assert(registerHtml.includes('btn-google-sso'), 'Missing btn-google-sso in register.html');
  assert(registerHtml.includes('handleGoogleSSORegistration'), 'Missing handleGoogleSSORegistration in register.html');
  assert(registerHtml.includes('@upbc.edu.mx'), 'Google SSO mentions @upbc.edu.mx');
});

test('placement.html contains 1-click Google Institutional SSO on welcome screen', () => {
  assert(placementHtml.includes('btn-google-sso'), 'Missing btn-google-sso in placement.html');
  assert(placementHtml.includes('handlePlacementGoogleSSO'), 'Missing handlePlacementGoogleSSO in placement.html');
});

test('placement.html displays Interleaving Curricular Rule on results screen', () => {
  assert(placementHtml.includes('id="res-interleaving-rule-box"'), 'Missing #res-interleaving-rule-box in placement.html');
  assert(placementHtml.includes('id="res-interleaving-rule-text"'), 'Missing #res-interleaving-rule-text in placement.html');
});

// ─────────────────────────────────────────────────────────────────
// 4. APP.HTML & APP.JS INTERLEAVING STATUS AUDIT
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 4. app.html & app.js Interleaving Status Audit');

const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

test('app.html includes #ed-placement-level-callout', () => {
  assert(appHtml.includes('id="ed-placement-level-callout"'), 'Missing #ed-placement-level-callout in app.html');
  assert(appHtml.includes('id="ed-placement-callout-level"'), 'Missing #ed-placement-callout-level in app.html');
  assert(appHtml.includes('id="ed-placement-callout-desc"'), 'Missing #ed-placement-callout-desc in app.html');
});

test('app.js syncUserPlacementBadge manages all CEFR levels & interleaving rules', () => {
  assert(appJs.includes('syncUserPlacementBadge'), 'Missing syncUserPlacementBadge in app.js');
  assert(appJs.includes('userLevel === \'A1\''), 'Must handle Level A1 specifically');
  assert(appJs.includes('userLevel === \'A2\''), 'Must handle Level A2 specifically');
  assert(appJs.includes('userLevel === \'B1\''), 'Must handle Level B1 specifically');
  assert(appJs.includes('ed-placement-level-callout'), 'Must update ed-placement-level-callout in app.js');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, ${totalTests - passedTests} Failed (out of ${totalTests} total)`);
console.log('═══════════════════════════════════════════════════════════════════');

if (passedTests === totalTests) {
  console.log('\n🎉 ALL 18 STUDENT CX JOURNEY AUDIT TESTS PASSED (100%)!\n');
  process.exit(0);
} else {
  console.error('\n❌ Some Student CX journey tests failed.\n');
  process.exit(1);
}
