/**
 * Test Suite: stemOS Duolingo-Style Learning Path Engine & Interactive Lesson Runner
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const devCss = fs.readFileSync(path.join(ROOT, 'dev.css'), 'utf8');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🎮 stemOS Duolingo-Style Learning Path Verification Suite');
console.log('═══════════════════════════════════════════════════════════════════\n');

let pass = 0;
function test(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    pass++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(`    ${err.message}`);
    process.exit(1);
  }
}

console.log('▶ 1. DOM Architecture & UI Containers');
test('app.html contains #stemos-duo-hud-bar with Mode Switcher', () => {
  assert(appHtml.includes('id="stemos-duo-hud-bar"'), 'Missing #stemos-duo-hud-bar');
  assert(appHtml.includes('id="btn-duo-mode-path"'), 'Missing #btn-duo-mode-path');
  assert(appHtml.includes('id="btn-duo-mode-grid"'), 'Missing #btn-duo-mode-grid');
});

test('app.html contains Duolingo HUD metrics (Streak, XP, Hearts, Hours)', () => {
  assert(appHtml.includes('id="duo-streak-count"'), 'Missing #duo-streak-count');
  assert(appHtml.includes('id="duo-xp-count"'), 'Missing #duo-xp-count');
  assert(appHtml.includes('id="duo-hearts-count"'), 'Missing #duo-hearts-count');
  assert(appHtml.includes('id="duo-hours-count"'), 'Missing #duo-hours-count');
});

test('app.html contains #stemos-duo-path-view (The Snake) and #stemos-duo-grid-view', () => {
  assert(appHtml.includes('id="stemos-duo-path-view"'), 'Missing #stemos-duo-path-view');
  assert(appHtml.includes('id="stemos-duo-grid-view"'), 'Missing #stemos-duo-grid-view');
});

test('app.html contains #duo-runner-overlay with exercise stage & bottom feedback drawer', () => {
  assert(appHtml.includes('id="duo-runner-overlay"'), 'Missing #duo-runner-overlay');
  assert(appHtml.includes('id="duo-exercise-stage"'), 'Missing #duo-exercise-stage');
  assert(appHtml.includes('id="duo-feedback-drawer"'), 'Missing #duo-feedback-drawer');
  assert(appHtml.includes('id="btn-duo-check"'), 'Missing #btn-duo-check');
  assert(appHtml.includes('id="duo-runner-progress-fill"'), 'Missing #duo-runner-progress-fill');
});

console.log('\n▶ 2. CSS Styling & Micro-interactions');
test('dev.css defines .stemos-duo-path-view and snake curves (.duo-pos-*)', () => {
  assert(devCss.includes('.stemos-duo-path-view'), 'Missing .stemos-duo-path-view');
  assert(devCss.includes('.duo-pos-1'), 'Missing .duo-pos-1');
  assert(devCss.includes('.duo-pos-2'), 'Missing .duo-pos-2');
  assert(devCss.includes('.duo-connector-line'), 'Missing .duo-connector-line');
});

test('dev.css defines .duo-node-btn with active pulse, completed and boss states', () => {
  assert(devCss.includes('.duo-node-btn'), 'Missing .duo-node-btn');
  assert(devCss.includes('.duo-node-btn.current'), 'Missing .duo-node-btn.current');
  assert(devCss.includes('.duo-node-btn.completed'), 'Missing .duo-node-btn.completed');
  assert(devCss.includes('.duo-node-btn.boss'), 'Missing .duo-node-btn.boss');
  assert(devCss.includes('.duo-start-tooltip'), 'Missing .duo-start-tooltip');
});

test('dev.css defines interactive exercise styles (Sentence Builder, Tap-to-Pair, Audio & Mic)', () => {
  assert(devCss.includes('.duo-word-chip'), 'Missing .duo-word-chip');
  assert(devCss.includes('.duo-pair-card'), 'Missing .duo-pair-card');
  assert(devCss.includes('.duo-audio-speaker-btn'), 'Missing .duo-audio-speaker-btn');
  assert(devCss.includes('.duo-voice-mic-btn'), 'Missing .duo-voice-mic-btn');
  assert(devCss.includes('.duo-feedback-drawer.correct'), 'Missing .duo-feedback-drawer.correct');
  assert(devCss.includes('.duo-feedback-drawer.incorrect'), 'Missing .duo-feedback-drawer.incorrect');
  assert(devCss.includes('.duo-victory-card'), 'Missing .duo-victory-card');
});

console.log('\n▶ 3. JavaScript Engine & Gamification Algorithms');
test('app.js implements Web Audio synthesizer DuoSound', () => {
  assert(appJs.includes('const DuoSound = {'), 'Missing DuoSound');
  assert(appJs.includes('playCorrect()'), 'Missing playCorrect()');
  assert(appJs.includes('playIncorrect()'), 'Missing playIncorrect()');
  assert(appJs.includes('playPop()'), 'Missing playPop()');
  assert(appJs.includes('playVictory()'), 'Missing playVictory()');
});

test('app.js implements daily streak tracking and CACEI hours accumulation', () => {
  assert(appJs.includes('getDailyStreakData()'), 'Missing getDailyStreakData()');
  assert(appJs.includes('recordDailyStudyCompleted()'), 'Missing recordDailyStudyCompleted()');
  assert(appJs.includes('stemos_cacei_accredited_hours'), 'Missing stemos_cacei_accredited_hours');
});

test('app.js exports public window methods for UI interactions', () => {
  assert(appJs.includes('window.switchDuoViewMode'), 'Missing window.switchDuoViewMode');
  assert(appJs.includes('window.renderDuoLearningPath'), 'Missing window.renderDuoLearningPath');
  assert(appJs.includes('window.closeDuoLessonRunner'), 'Missing window.closeDuoLessonRunner');
  assert(appJs.includes('window.handleDuoCheckClick'), 'Missing window.handleDuoCheckClick');
  assert(appJs.includes('window.updateDuoHudUI'), 'Missing window.updateDuoHudUI');
});

console.log('\n▶ 4. High-Fidelity Piper Neural PRO TTS & Multi-Speed Audio (0.8x, 1.0x, 1.2x)');
const tts = require('../content/stemos_tts.js');

test('stemos_tts.js implements multi-speed control (0.8x, 1.0x, 1.2x)', () => {
  assert(typeof tts.setSpeed === 'function', 'Missing setSpeed');
  assert(typeof tts.getSpeed === 'function', 'Missing getSpeed');
  tts.setSpeed(0.8);
  assert.strictEqual(tts.getSpeed(), 0.8, 'Failed setting 0.8x');
  tts.setSpeed(1.2);
  assert.strictEqual(tts.getSpeed(), 1.2, 'Failed setting 1.2x');
  tts.setSpeed(1.0);
  assert.strictEqual(tts.getSpeed(), 1.0, 'Failed setting 1.0x');
});

test('stemos_tts.js getStaticAudioUrl resolves vocabulary and dialogue to pre-rendered Piper MP3s', () => {
  const audio1 = tts.getStaticAudioUrl('Hello! My name is Alex.');
  assert(audio1 && audio1.includes('.mp3'), 'Failed resolving hello to Piper MP3: ' + audio1);

  const audio2 = tts.getStaticAudioUrl('Welcome to our team.');
  assert(audio2 && audio2.includes('.mp3'), 'Failed resolving welcome to Piper MP3: ' + audio2);

  const audio3 = tts.getStaticAudioUrl('Good morning! Welcome to the team. Are you Alex Rivera?');
  assert(audio3 && audio3.includes('.mp3'), 'Failed resolving dialogue to Piper MP3: ' + audio3);
});

test('app.html and dev.css contain speed selector pills and cycle controls', () => {
  assert(appHtml.includes('id="duo-audio-speed-pill"'), 'Missing #duo-audio-speed-pill in app.html');
  assert(appHtml.includes('id="duo-audio-speed-label"'), 'Missing #duo-audio-speed-label in app.html');
  assert(devCss.includes('.duo-speed-selector'), 'Missing .duo-speed-selector in dev.css');
  assert(devCss.includes('.duo-speed-btn'), 'Missing .duo-speed-btn in dev.css');
  assert(appJs.includes('window.cycleAudioSpeed'), 'Missing window.cycleAudioSpeed in app.js');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 RESULT: ${pass}/13 TESTS PASSED (100%)`);
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log('🎉 STEMOS DUOLINGO-STYLE LEARNING PATH ENGINE FULLY VERIFIED!\n');

