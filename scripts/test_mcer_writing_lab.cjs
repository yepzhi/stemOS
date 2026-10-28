/**
 * test_mcer_writing_lab.cjs
 * Comprehensive test suite verifying the 4-skills MCER implementation with Writing Lab (CEFR A1-B2)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  \x1b[32m[PASS]\x1b[0m ${message}`);
        passCount++;
    } else {
        console.error(`  \x1b[31m[FAIL]\x1b[0m ${message}`);
        failCount++;
    }
}

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('✍️  stemOS MCER 4-Skills Integration: Writing Lab & AI Rubric Audit');
console.log('═══════════════════════════════════════════════════════════════════\n');

// 1. Check Root vs Dev Mirror Parity
console.log('▶ 1. Root vs Dev Mirror Parity');
const filesToCheck = ['app.html', 'app.js', 'content/mcer_tracks.js'];
filesToCheck.forEach(file => {
    const rootPath = path.join(__dirname, '..', file);
    const devPath = path.join(__dirname, '..', 'dev', file);
    assert(fs.existsSync(rootPath), `Root file exists: ${file}`);
    assert(fs.existsSync(devPath), `Dev file exists: dev/${file}`);
    const rootBuf = fs.readFileSync(rootPath);
    const devBuf = fs.readFileSync(devPath);
    assert(rootBuf.equals(devBuf), `File Parity 100% bit-for-bit: ${file} === dev/${file}`);
});

// 2. Load and verify content/mcer_tracks.js
console.log('\n▶ 2. MCER Writing Lab Pedagogical Rigor across all 16 units');
const mcerCode = fs.readFileSync(path.join(__dirname, '..', 'content/mcer_tracks.js'), 'utf8');
const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(mcerCode, sandbox);

const catalog = sandbox.window.STEMOS_MCER_TRACKS;
assert(catalog && typeof catalog.getAllUnits === 'function', 'STEMOS_MCER_TRACKS is exported with getAllUnits()');
assert(typeof catalog.evaluateWritingSubmission === 'function', 'STEMOS_MCER_TRACKS exports evaluateWritingSubmission()');

const units = catalog.getAllUnits();
assert(units.length === 16, `Exported units count is exactly 16 (found: ${units.length})`);

units.forEach(u => {
    const lab = u.writingLab;
    const hasLab = lab && 
                   typeof lab.title === 'string' &&
                   typeof lab.prompt === 'string' &&
                   typeof lab.instruction === 'string' &&
                   typeof lab.minWords === 'number' && lab.minWords >= 15 &&
                   Array.isArray(lab.targetKeywords) && lab.targetKeywords.length >= 3 &&
                   typeof lab.starterTemplate === 'string' &&
                   typeof lab.modelAnswer === 'string';
    assert(hasLab, `Unit ${u.id} (${u.modulo}) has full Writing Lab (minWords: ${lab ? lab.minWords : 0}, keywords: ${lab ? lab.targetKeywords.length : 0})`);
});

// 3. Test AI Writing Evaluator
console.log('\n▶ 3. Writing Lab AI Rubric Evaluator Engine');
// Test with passing text using modelAnswer
const sampleUnit = units[0]; // A1 Unit 1
const testSubmissionGood = sampleUnit.writingLab.modelAnswer;
const evalGood = catalog.evaluateWritingSubmission(sampleUnit.id, testSubmissionGood);
assert(evalGood.passed === true, `Good submission passes evaluation (Score: ${evalGood.score}%)`);
assert(evalGood.xpAwarded >= 100, `Awards correct XP on pass (+${evalGood.xpAwarded} XP)`);
assert(evalGood.feedback.length > 20, 'Generates pedagogical feedback');

// Test with empty/short text
const evalShort = catalog.evaluateWritingSubmission(sampleUnit.id, "Hi");
assert(evalShort.passed === false, `Too short submission correctly fails (Score: ${evalShort.score}%)`);

// 4. Test DOM Hooks in app.html
console.log('\n▶ 4. app.html DOM Elements & Accessibility');
const appHtml = fs.readFileSync(path.join(__dirname, '..', 'app.html'), 'utf8');
assert(appHtml.includes('data-mcer-tab="writing"'), 'app.html contains Writing Lab tab button in modal navigation');
assert(appHtml.includes('id="mcer-screen-writing"'), 'app.html contains #mcer-screen-writing container');
assert(appHtml.includes('id="mcer-writing-input"'), 'app.html contains #mcer-writing-input textarea');
assert(appHtml.includes('id="btn-mcer-evaluate-writing"'), 'app.html contains #btn-mcer-evaluate-writing evaluation trigger');
assert(appHtml.includes('id="mcer-writing-feedback-card"'), 'app.html contains #mcer-writing-feedback-card feedback display');
assert(appHtml.includes('id="mcer-writing-keywords-chips"'), 'app.html contains #mcer-writing-keywords-chips for live technical keyword tracking');

// 5. Test app.js wiring
console.log('\n▶ 5. app.js Event Wiring & State Management');
const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
assert(appJs.includes('renderMcerWritingLab(unit)'), 'app.js calls renderMcerWritingLab on unit modal open');
assert(appJs.includes('switchMcerModalTab'), 'app.js switchMcerModalTab handles tab switching');
assert(appJs.includes('allScreens.forEach') || appJs.includes('allScreenKeys.forEach'), 'app.js toggles all pedagogical screens including writing');
assert(appJs.includes('stemos_writing_'), 'app.js persists student writing submission to localStorage');

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passCount} Passed, ${failCount} Failed (Total: ${passCount + failCount})`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failCount > 0) {
    process.exit(1);
} else {
    console.log('🎉 ALL 4-SKILLS WRITING LAB AUDITS PASSED WITH 100% INTEGRITY!\n');
}
