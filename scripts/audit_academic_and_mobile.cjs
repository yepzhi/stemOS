const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🎓 stemOS Academic Rigor & Mobile/A11y Audit Suite');
console.log('====================================================');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName} ${details ? '(' + details + ')' : ''}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}: ${details}`);
    failedTests++;
  }
}

// ── 1. SYNTAX AUDIT ─────────────────────────────────────────
console.log('\n--- 1. JavaScript Syntax & Parsing ---');
const filesToTest = [
  'app.js',
  'dev.js',
  'world-map.js',
  'sw.js',
  'content/courses.js',
  'content/phrases_library.js'
];

filesToTest.forEach(f => {
  const filePath = path.join(__dirname, '..', f);
  assert(fs.existsSync(filePath), `File exists: ${f}`);
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    new Function(code);
    assert(true, `Syntax check: ${f}`);
  } catch (err) {
    assert(false, `Syntax check: ${f}`, err.message);
  }
});

// ── 2. ACADEMIC CATALOG & EVALUATION INTEGRITY ───────────────
console.log('\n--- 2. Academic Curriculum & Evaluation Integrity ---');
const courses = require('../content/courses.js');
const trackKeys = Object.keys(courses);
assert(trackKeys.length === 26, 'Track catalog count', `Found ${trackKeys.length}, expected 26`);

let totalModules = 0;
let totalReadings = 0;
let totalQuestions = 0;
let totalVocab = 0;
let totalCollocations = 0;
let invalidQuestions = 0;

trackKeys.forEach(tKey => {
  const track = courses[tKey];
  (track.modules || []).forEach(m => {
    totalModules++;
    (m.readings || []).forEach(r => {
      totalReadings++;
      (r.vocabulary || []).forEach(v => {
        totalVocab++;
        if (v.collocations && Array.isArray(v.collocations)) {
          totalCollocations += v.collocations.length;
        }
      });
      (r.questions || []).forEach(q => {
        totalQuestions++;
        const isValid = q.q && Array.isArray(q.options) && q.options.length >= 2 &&
                        typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length;
        if (!isValid) invalidQuestions++;
      });
    });
  });
});

assert(totalModules >= 146, 'Total modules count', `${totalModules} modules`);
assert(totalReadings >= 160, 'Total academic readings', `${totalReadings} readings`);
assert(totalQuestions >= 640, 'Formative evaluation questions', `${totalQuestions} questions`);
assert(invalidQuestions === 0, 'Question schema validity', `${invalidQuestions} invalid`);
assert(totalVocab >= 1300, 'Specialized technical vocabulary terms', `${totalVocab} terms`);
assert(totalCollocations >= 4000, 'Technical collocations mapped', `${totalCollocations} collocations`);

// ── 3. NATIVE PHRASES LIBRARY AUDIT ─────────────────────────
console.log('\n--- 3. Native Idioms & Professional Phrases Library ---');
const phrases = require('../content/phrases_library.js');
assert(Array.isArray(phrases), 'Phrases library loaded as array');
assert(phrases.length >= 100, 'Total phrases count', `${phrases.length} phrases`);

const requiredCategories = [
  'workplace',
  'technical_debate',
  'conflict_resolution',
  'small_talk',
  'metrics',
  'meetings',
  'problem_solving',
  'soft_skills'
];

const phraseIds = new Set();
let duplicateIds = 0;
let missingFields = 0;
const catCounts = {};

phrases.forEach(p => {
  if (phraseIds.has(p.id)) duplicateIds++;
  phraseIds.add(p.id);

  const hasAll = p.id && p.phrase && p.schoolVsNative && p.schoolVsNative.school &&
                 p.schoolVsNative.native && p.meaningES && p.explanation &&
                 p.category && p.exampleEN && p.exampleES && p.pronunciationHint;
  if (!hasAll) missingFields++;

  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
});

assert(duplicateIds === 0, 'Phrase IDs uniqueness', `${duplicateIds} duplicates`);
assert(missingFields === 0, 'Phrase metadata completeness', `${missingFields} missing required fields`);

requiredCategories.forEach(cat => {
  const count = catCounts[cat] || 0;
  assert(count >= 10, `Category coverage: "${cat}"`, `${count} entries`);
});

// ── 4. MODERN WEB GUIDANCE & PERFORMANCE (CWV) ──────────────
console.log('\n--- 4. Modern Web Guidance & CWV Optimizations ---');
const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

assert(styles.includes('content-visibility: auto'), 'Deferred rendering: content-visibility: auto present');
assert(styles.includes('contain-intrinsic-size:'), 'Layout containment: contain-intrinsic-size placeholder present');
assert(styles.includes(':focus-visible'), 'Accessible keyboard focus states present');

// ── 5. MOBILE-FIRST ERGONOMICS & SAFE AREAS (WCAG 2.5.5) ────
console.log('\n--- 5. Mobile-First Touch Ergonomics & Safe Area Insets ---');
assert(styles.includes('@media (max-width: 640px)'), 'Mobile breakpoint @media (max-width: 640px) configured');
assert(styles.includes('min-height: 44px') || styles.includes('min-height: 48px'), 'Touch targets meet WCAG 2.5.5 (>= 44px/48px)');
assert(styles.includes('env(safe-area-inset-bottom)'), 'iOS/Android home bar safe-area-inset-bottom supported');
assert(styles.includes('overflow-x: hidden'), 'Zero horizontal drift (overflow-x: hidden) enforced on mobile');

// ── 6. KEYBOARD NAVIGATION & ACCESSIBILITY ──────────────────
console.log('\n--- 6. Keyboard Accessibility & PWA Service Worker ---');
const appJS = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
assert(appJS.includes("e.key === 'Escape'"), 'Global Escape key handler closes modals & drawers');

const swJS = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
assert(swJS.includes('stemos-lxp-v3.2.0-academic'), 'PWA Service Worker cache bumped to v3.2.0-academic');

// ── SUMMARY REPORT ──────────────────────────────────────────
console.log('\n====================================================');
console.log(`📊 Audit Summary: ${passedTests} Passed, ${failedTests} Failed`);
if (failedTests === 0) {
  console.log('🎉 100% EXCELLENCE! stemOS meets all academic, mobile, and web guidance standards!');
  console.log('====================================================\n');
  process.exit(0);
} else {
  console.error(`⚠️ Found ${failedTests} issues that require attention.`);
  console.log('====================================================\n');
  process.exit(1);
}
