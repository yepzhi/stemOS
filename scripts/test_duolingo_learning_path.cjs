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

console.log('\n▶ 5. MCER Winding Path, White Profile & Living Aurora');
test('app.js supports dual-mode MCER tracks vs ESP tracks in renderDuoLearningPath', () => {
  assert(appJs.includes('// ── A. MCER CORE MODE (A1 to B2 Standard American English) ──'), 'Missing MCER Core mode');
  assert(appJs.includes('// ── B. ESP CAREER TRACK MODE (Engineering 60.0h Tracks) ──'), 'Missing ESP career mode');
  assert(appJs.includes('openMcerUnitModal(mod.id)'), 'Missing openMcerUnitModal on MCER unit click');
});

test('DuoSound uses low-pass filtered warm chimes (playBell) and tactile pop', () => {
  assert(appJs.includes('playBell('), 'Missing playBell in DuoSound');
  assert(appJs.includes('createBiquadFilter()'), 'Missing createBiquadFilter in DuoSound');
});

test('app.html student profile modal uses clean white glassmorphic theme and living aurora canvas', () => {
  assert(appHtml.includes('<!-- Student Profile & Institutional Digital Pass Modal (Phase 86 - White Glassmorphic Bento Grid) -->'), 'Missing white modal comment');
  assert(appHtml.includes('background: rgba(255, 255, 255, 0.96)'), 'Missing white background in profile modal');
  assert(appHtml.includes('/content/stemos_aurora.js'), 'Missing stemos_aurora.js script tag');
  assert(appHtml.includes('data-aurora-full'), 'Missing data-aurora-full on body');
});

console.log('\n▶ 6. Sequential Progression Locking, Audio STOP, English Milestones & Clean UI');
test('app.js enforces canonical sequential unit progression and prerequisite gating', () => {
  assert(appJs.includes('CANONICAL_MCER_UNIT_IDS'), 'Missing CANONICAL_MCER_UNIT_IDS');
  assert(appJs.includes('function isMcerUnitCompleted'), 'Missing isMcerUnitCompleted');
  assert(appJs.includes('function isMcerUnitUnlocked'), 'Missing isMcerUnitUnlocked');
  assert(appJs.includes('!isDemo && !isMcerUnitUnlocked(unitId)'), 'openMcerUnitModal missing unlock check');
  assert(appJs.includes('ed-unit-card${!isUnlocked ? \' unit-locked\' : \'\'}'), 'renderMcerUnitsGrid missing unit-locked class');
});

test('app.html and app.js implement multi-location audio STOP buttons and speed selectors', () => {
  assert(appHtml.includes('id="btn-mcer-header-stop-audio"'), 'Missing #btn-mcer-header-stop-audio in header');
  assert(appHtml.includes('id="btn-mcer-stop-dialogue"'), 'Missing #btn-mcer-stop-dialogue in dialogue screen');
  assert(appHtml.includes('id="btn-mcer-stop-listening"'), 'Missing #btn-mcer-stop-listening in listening screen');
  assert(appHtml.includes('class="mcer-speed-btn"'), 'Missing .mcer-speed-btn in app.html');
  assert(appJs.includes('function stopAllStemOSAudio()'), 'Missing stopAllStemOSAudio() in app.js');
  assert(appJs.includes('function setStemOSSpeechSpeed('), 'Missing setStemOSSpeechSpeed() in app.js');
  assert(appJs.includes('duo-stop-btn'), 'Missing duo-stop-btn in interactive audio exercises');
});

test('MCER milestones use standard English labels without mixed Spanish', () => {
  assert(appJs.includes("${isMcer ? 'MILESTONE' : 'HITO'} ${hitoNum}"), 'Missing MILESTONE conditional label');
  assert(appJs.includes('Level A1 · Foundations & Everyday Work (60.0h)'), 'Spanish Nivel A1 still present in mcerHitoNames');
  assert(!appJs.includes("'Nivel A1 · Foundations & Everyday Work (60.0h)'"), 'Spanish Nivel A1 found in mcerHitoNames');
});

test('app.html and app.js omit redundant banners and cards in MCER view', () => {
  assert(!appHtml.includes('id="mcer-active-track-banner"'), 'Redundant #mcer-active-track-banner should be removed');
  assert(appJs.includes('if (!isMcer) {'), 'Header card should be omitted in MCER mode');
  assert(!appHtml.includes('<button type="button" class="btn-mcer-offline-download" id="btn-mcer-offline-toggle" title="Descargar unidad completa y audios para modo offline (Expira en 3 días)">\n                            <i class="fa-solid fa-cloud-arrow-down"></i>'), 'Duplicate cloud icon should not exist in offline download button');
});

console.log('\n▶ 7. Placement Back Button & 3D World HUD Personalization');
const placementHtml = fs.readFileSync(path.join(ROOT, 'placement.html'), 'utf8');
const worldMapJs = fs.readFileSync(path.join(ROOT, 'world-map.js'), 'utf8');

test('placement.html includes #btn-back-to-app with .btn-back-app pointing to app.html', () => {
  assert(placementHtml.includes('id="btn-back-to-app"'), 'Missing #btn-back-to-app in placement.html');
  assert(placementHtml.includes('class="btn-back-app"'), 'Missing .btn-back-app class in placement.html');
  assert(placementHtml.includes('href="app.html"'), 'Back button must link to app.html');
  assert(placementHtml.includes('lblBackToApp'), 'Missing lblBackToApp in PLACEMENT_I18N');
});

test('world-map.js omits redundant 26-career selector, biome subtitle, and generic realm filters for routed students', () => {
  assert(worldMapJs.includes('id="wm-career-name-display"'), 'Missing #wm-career-name-display for personalized career');
  assert(!worldMapJs.includes('id="wm-career-select"'), 'wm-career-select dropdown should be removed from HUD');
  assert(!worldMapJs.includes('class="world-shared-pill"'), 'world-shared-pill should be removed');
  assert(!worldMapJs.includes('id="wm-biome-subtitle"'), 'wm-biome-subtitle should be removed');
  assert(!worldMapJs.includes('class="world-realm-filters"'), 'world-realm-filters should be removed');
  assert(!worldMapJs.includes('Todos (26)'), 'Generic Todos (26) should be removed');
});

console.log('\n▶ 8. atWork Lab Unified Navigation (Executive Email & 8D Problem Solving)');
test('app.html contains unified #nav-btn-atwork and #dock-btn-atwork with data-view="atwork-lab" and label atWork Lab', () => {
  assert(appHtml.includes('id="nav-btn-atwork"'), 'Missing #nav-btn-atwork in app.html rail');
  assert(appHtml.includes('atWork Lab'), 'Missing atWork Lab label in app.html rail');
  assert(appHtml.includes('id="dock-btn-atwork"'), 'Missing #dock-btn-atwork in app.html mobile dock');
  assert(appHtml.includes('data-view="atwork-lab"'), 'Missing data-view="atwork-lab"');
  assert(appHtml.includes('id="btn-hero-launch-atwork"'), 'Missing #btn-hero-launch-atwork quick launcher');
});

test('app.js handles atwork-lab view routing directly to Output Workspace', () => {
  assert(appJs.includes("viewName === 'atwork-lab'"), 'Missing atwork-lab view router check in app.js');
  assert(appJs.includes('renderExecutiveEmail()'), 'Missing renderExecutiveEmail call on view activation');
  assert(appJs.includes('window.openAtWorkLab'), 'Missing window.openAtWorkLab helper');
});

console.log('\n▶ 9. Universal Duolingo Lesson Launchers & 5-Step Micro-Progression');
test('app.js exports startDuoLessonForUnit, openDuoLesson, and DUO_STEPS_META', () => {
  assert(appJs.includes('window.startDuoLessonForUnit = startDuoLessonForUnit;'), 'Missing window.startDuoLessonForUnit');
  assert(appJs.includes('window.openDuoLesson = openDuoLesson;'), 'Missing window.openDuoLesson');
  assert(appJs.includes('window.DUO_STEPS_META = DUO_STEPS_META;'), 'Missing window.DUO_STEPS_META');
});

test('app.js renders 5-step micro-lesson buttons and direct Duolingo play button', () => {
  assert(appJs.includes('class="duo-sub-step-btn"'), 'Missing duo-sub-step-btn in app.js');
  assert(appJs.includes('class="btn-play-duo-direct"'), 'Missing btn-play-duo-direct in app.js');
  assert(appJs.includes('class="btn-syllabus-direct"'), 'Missing btn-syllabus-direct in app.js');
});

test('app.html contains #btn-mcer-launch-duo in unit modal and #wmd-btn-launch-duo in career drawer', () => {
  assert(appHtml.includes('id="btn-mcer-launch-duo"'), 'Missing #btn-mcer-launch-duo in app.html');
  assert(appHtml.includes('id="wmd-btn-launch-duo"'), 'Missing #wmd-btn-launch-duo in app.html');
});

test('dev.css defines .duo-steps-strip, .duo-sub-step-btn, .btn-play-duo-direct, and .btn-mcer-launch-duo', () => {
  assert(devCss.includes('.duo-steps-strip'), 'Missing .duo-steps-strip in dev.css');
  assert(devCss.includes('.duo-sub-step-btn'), 'Missing .duo-sub-step-btn in dev.css');
  assert(devCss.includes('.btn-play-duo-direct'), 'Missing .btn-play-duo-direct in dev.css');
  assert(devCss.includes('.btn-mcer-launch-duo'), 'Missing .btn-mcer-launch-duo in dev.css');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 RESULT: ${pass}/28 TESTS PASSED (100%)`);
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log('🎉 STEMOS DUOLINGO-STYLE LEARNING PATH ENGINE FULLY VERIFIED!\n');

