#!/usr/bin/env node
/**
 * stemOS Verification Suite:
 * MCER 50-Minute Modular Classes (84) + ESP 50m + Teacher Reordering + POWER SHEETS + Slides
 */
'use strict';

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function check(label, cond, detail) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${label}${detail ? ' — ' + detail : ''}`);
  }
}

console.log('═══════════════════════════════════════════════════════════════════');
console.log('📚 stemOS CEFR 50m Modular Curriculum, Reordering & Power Sheets Test');
console.log('═══════════════════════════════════════════════════════════════════\n');

const rootDir = path.join(__dirname, '..');
const mcerTracks = require(path.join(rootDir, 'content/mcer_tracks.js'));
const mcerClasses = require(path.join(rootDir, 'content/mcer_classes_50m.js'));
const careerPaths = require(path.join(rootDir, 'content/career_paths.js'));
const espDesigns = require(path.join(rootDir, 'content/esp_lesson_designs.js'));
const curriculumCfg = require(path.join(rootDir, 'content/stemos_curriculum_config.js'));
const slidesMod = require(path.join(rootDir, 'content/stemos_slides.js'));
const powerSheet = require(path.join(rootDir, 'content/stemos_powersheet.js'));

global.STEMOS_MCER_TRACKS = mcerTracks;
global.STEMOS_MCER_CLASSES = mcerClasses;
global.STEMOS_CAREER_PATHS = careerPaths;
global.STEMOS_ESP_DESIGNS = espDesigns;
global.STEMOS_CURRICULUM_CONFIG = curriculumCfg;

console.log('▶ 1. Canonical Units Invariant & Backfilled Grammar Boxes');
const units = mcerTracks.getAllUnits();
check('STEMOS_MCER_TRACKS keeps 16 canonical units', units.length === 16, `Got ${units.length}`);
check('Canonical total hours remain 240.0h', units.reduce((a, u) => a + u.hours, 0) === 240);
check('All 16 canonical units have grammarBox populated', units.every((u) => u.grammarBox && u.grammarBox.explanation));
check('All 16 canonical units link childClassIds (72 classes)', units.reduce((a, u) => a + (u.childClassIds ? u.childClassIds.length : 0), 0) === 72);

console.log('\n▶ 2. 84 Modular 50-Minute MCER Classes (A1–B2 + C1–C2 Extension)');
const allClasses = mcerClasses.getAllClasses();
const summary = mcerClasses.getCefrCoverageSummary();
check('Total modular classes === 84', allClasses.length === 84 && summary.totalClasses === 84, `Got ${allClasses.length}`);
check('Per-level counts: A1=20, A2=20, B1=16, B2=16, C1-C2=12',
  summary.byLevel.A1 === 20 &&
  summary.byLevel.A2 === 20 &&
  summary.byLevel.B1 === 16 &&
  summary.byLevel.B2 === 16 &&
  summary.byLevel['C1-C2'] === 12,
  JSON.stringify(summary.byLevel)
);
check('Every class is 50 min with 15–20 min online Duo practice',
  allClasses.every((c) => c.durationMinutes === 50 && c.onlinePracticeMinutes >= 15 && c.onlinePracticeMinutes <= 20)
);
check('Every class has vocab, drills, dialogue, classroomActivity & powerSheet',
  allClasses.every((c) =>
    c.vocab && c.vocab.length >= 2 &&
    c.drills && c.drills.length >= 2 &&
    c.dialogue && c.dialogue.length >= 2 &&
    c.classroomActivity && c.classroomActivity.steps && c.classroomActivity.steps.length >= 1 &&
    c.powerSheet && c.powerSheet.fillBlanks && c.powerSheet.fillBlanks.length >= 3 && c.powerSheet.writePrompt && c.powerSheet.answerKey
  )
);
check('Slides decks auto-generated on classes with hasSlides=true',
  allClasses.filter((c) => c.hasSlides).every((c) => Array.isArray(c.slidesDeck) && c.slidesDeck.length === 6)
);
check('toRunnableUnit hydrates dialogue.lines[i].text, drills.options & grammarBox',
  (() => {
    const r = mcerClasses.toRunnableUnit('a1-c06');
    return r && r.dialogue && r.dialogue.lines[0].text && r.grammarDrills[0].options && r.grammarBox && r.grammarBox.explanationES;
  })()
);

console.log('\n▶ 3. EAQUALS–British Council A1 Critical Gap Closure');
const a1Blob = mcerClasses.getClassesByLevel('A1')
  .map((c) => `${c.title} ${c.titleES} ${c.grammarFocus} ${c.canDo}`)
  .join(' | ')
  .toLowerCase();
const criticalA1Topics = [
  { label: 'Verb to be aff/neg/questions', re: /to be.*affirmative|negatives.*questions|short answers/i },
  { label: 'Personal Info, Forms, Countries & Spelling', re: /countries|spelling|personal information/i },
  { label: 'Addresses & Places in Town', re: /address|places in town|city/i },
  { label: 'Directions (Turn left / straight)', re: /direction|turn left/i },
  { label: 'Numbers & Telling Time', re: /numbers|time/i },
  { label: 'There is/are & Prepositions of place', re: /there is.*are|prepositions of place/i },
  { label: 'Demonstratives & a/an/the', re: /this\/that\/these\/those|a \/ an \/ the/i },
  { label: 'Possessive adjectives & genitive \'s', re: /possessive/i },
  { label: 'Present Simple + Frequency adverbs', re: /present simple.*frequency|routines/i },
  { label: 'Present Continuous', re: /present continuous/i },
  { label: 'Was / Were & Simple Past intro', re: /was.*were|past/i },
  { label: 'Can / Can\'t ability & requests', re: /can \/ can't/i },
  { label: 'Future Plans (going to)', re: /going to/i },
  { label: 'Comparatives & Superlatives (A1)', re: /comparative/i },
  { label: 'How much/many, Prices & I\'d like', re: /how much|i'd like|ordering/i },
  { label: 'Connectors (and/but/or/because)', re: /because|connectors/i }
];
for (const topic of criticalA1Topics) {
  check(`A1 covers ${topic.label}`, topic.re.test(a1Blob));
}

console.log('\n▶ 4. ESP 50-Minute Modularities (4 Types) & Track Hydration');
const espTemplates = espDesigns.getAllTemplates();
check('ESP designs cover all 4 modularities (theory, english-b1, practical-lab, milestone)',
  ['theory', 'english-b1', 'practical-lab', 'milestone'].every((t) => espTemplates.some((tpl) => tpl.id === t))
);
check('Every ESP template specifies 50 min & 15–20m online Duo',
  espTemplates.every((tpl) => tpl.totalMinutes === 50 && tpl.onlineDuoMinutes >= 15 && tpl.onlineDuoMinutes <= 20)
);
const upbcEnergiaPath = careerPaths.getPathForCareer('upbc-energia');
const espPayload = espDesigns.buildEspClassPayload('upbc-energia', upbcEnergiaPath.modules[0], upbcEnergiaPath);
check('ESP payload hydrates from career_paths module with Power Sheet & phases',
  espPayload && espPayload.isEsp && espPayload.powerSheet.fillBlanks.length >= 3 && espPayload.instructionalPhases.length === 5
);

console.log('\n▶ 5. Teacher Sequence Reordering, Progress Preservation & Gating');
const classId = 'test-cohort-4A';
const a1Track = curriculumCfg.getTrackKey('mcer', 'A1');
const officialA1 = curriculumCfg.getCanonicalItems(a1Track).map((c) => c.id);
// Move a1-c06 to slot #2 (after a1-c01, a1-c02), hide a1-c05, and force-unlock a1-c10
const customOrdered = ['a1-c01', 'a1-c02', 'a1-c06', ...officialA1.filter((id) => !['a1-c01', 'a1-c02', 'a1-c06'].includes(id))];
curriculumCfg.saveConfig(classId, a1Track, {
  orderedIds: customOrdered,
  hiddenIds: ['a1-c05'],
  unlockedIds: ['a1-c10'],
  updatedBy: 'teacher-qa@stemos.edu.mx'
});
const studentSeq = curriculumCfg.getEffectiveSequence(classId, a1Track, { includeHidden: false });
const teacherSeq = curriculumCfg.getEffectiveSequence(classId, a1Track, { includeHidden: true });
check('Custom order puts a1-c06 in 3rd slot (index 2) for students', studentSeq[2].id === 'a1-c06');
check('Hidden lesson a1-c05 omitted from student sequence but visible in teacher view',
  !studentSeq.some((c) => c.id === 'a1-c05') && teacherSeq.some((c) => c.id === 'a1-c05' && c.isHidden)
);
const doneByStudent = new Set(['a1-c01', 'a1-c02']);
check('Completed lessons preserve status across reordering',
  doneByStudent.has('a1-c02') && curriculumCfg.isItemUnlockedInSequence('a1-c06', studentSeq, doneByStudent, [], false)
);
check('Next sequential lesson after a1-c06 remains locked until a1-c06 is completed',
  !curriculumCfg.isItemUnlockedInSequence(studentSeq[3].id, studentSeq, doneByStudent, [], false)
);
check('Explicit teacher unlock opens target lesson immediately',
  curriculumCfg.isItemUnlockedInSequence('a1-c10', studentSeq, doneByStudent, [], false)
);
check('getNextItemInSequence advances from a1-c02 -> a1-c06 (respecting teacher custom order)',
  curriculumCfg.getNextItemInSequence('a1-c02', studentSeq).id === 'a1-c06'
);

console.log('\n▶ 6. Power Sheets Generator (Student 1-Page, Teacher 50m Guide, Batch & Offline HTML)');
const psStudent = powerSheet.renderFromQuery({ lesson: 'a1-c06', mode: 'student', classId });
const psTeacher = powerSheet.renderFromQuery({ lesson: 'a1-c06', mode: 'teacher', classId });
const psBatch = powerSheet.renderFromQuery({ level: 'A1', batch: 'true', classId });
const psEsp = powerSheet.renderFromQuery({ esp: 'upbc-energia:M01', mode: 'student' });
const standaloneHtml = powerSheet.exportStandaloneHtml(psStudent.pagesHtml, 'Power Sheet Test');
check('Student Power Sheet renders 1 single page with fillBlanks & write lines',
  psStudent.count === 1 && psStudent.pagesHtml.includes('POWER SHEET · 1 HOJA') && psStudent.pagesHtml.includes('ps-write-line')
);
check('Teacher Power Sheet renders 50m minute-by-minute playbook & answer key',
  psTeacher.count === 1 && psTeacher.pagesHtml.includes('GUÍA DOCENTE 50 MIN') && psTeacher.pagesHtml.includes('Solucionario Power Sheet')
);
check('Batch Power Sheet honors custom order & omits hidden lesson (19 active in A1)',
  psBatch.count === 19 && psBatch.items[2].id === 'a1-c06', `count=${psBatch.count}, 3rd=${psBatch.items[2] && psBatch.items[2].id}`
);
check('ESP Power Sheet renders Career Path module cleanly',
  psEsp.count === 1 && psEsp.pagesHtml.includes('Utility-Scale Solar PV')
);
check('Offline HTML export embeds @media print 1-page constraints cleanly',
  standaloneHtml.includes('<!DOCTYPE html>') && standaloneHtml.includes('@page { size: letter portrait') && standaloneHtml.includes('max-height:263mm')
);
check('Slides builder creates 6 structured slides for slide-enabled classes & ESP',
  slidesMod.buildSlidesFromPayload(allClasses[0]).length === 6 &&
  slidesMod.buildSlidesFromPayload(espPayload).length === 6
);

console.log('\n▶ 7. Portal & Security Rules File Integration');
const rulesSrc = fs.readFileSync(path.join(rootDir, 'firestore.rules'), 'utf8');
const teacherSrc = fs.readFileSync(path.join(rootDir, 'teacher.html'), 'utf8');
const appHtmlSrc = fs.readFileSync(path.join(rootDir, 'app.html'), 'utf8');
const swSrc = fs.readFileSync(path.join(rootDir, 'sw.js'), 'utf8');

check('firestore.rules secures /curriculum_config/{trackKey} & /assignments/{assignmentId}',
  rulesSrc.includes('match /curriculum_config/{trackKey}') &&
  rulesSrc.includes('match /assignments/{assignmentId}') &&
  rulesSrc.includes('isClassOwner(')
);
check('teacher.html includes drag handle, keyboard arrows, powersheet & slides controls',
  teacherSrc.includes('seq-drag-handle') &&
  teacherSrc.includes('moveSequenceItemBy') &&
  teacherSrc.includes('powersheet.html') &&
  teacherSrc.includes('stemos_slides.js')
);
check('app.html & sw.js load all new 50m curriculum & powersheet modules',
  appHtmlSrc.includes('mcer_classes_50m.js') &&
  appHtmlSrc.includes('stemos_curriculum_config.js') &&
  swSrc.includes('/powersheet.html') &&
  swSrc.includes('/content/mcer_classes_50m.js')
);

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 RESULT: ${passed}/${passed + failed} CHECKS PASSED (${Math.round((passed / (passed + failed)) * 100)}%)`);
console.log('═══════════════════════════════════════════════════════════════════');

if (failed > 0) process.exit(1);
