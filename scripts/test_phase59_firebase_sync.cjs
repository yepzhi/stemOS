/**
 * stemOS Phase 59 E2E Verification Suite:
 * Universal Firebase Cloud & Offline Hybrid Adapter, Cross-Portal Roster Sync & Student Profile Bridge
 */

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔥 stemOS Phase 59: Universal Firebase Adapter & Profile Bridge Audit');
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

// Mock browser localStorage & CustomEvent environment for testing
const mockLocalStorage = {};
global.localStorage = {
    getItem: (k) => mockLocalStorage[k] || null,
    setItem: (k, v) => { mockLocalStorage[k] = v.toString(); },
    removeItem: (k) => { delete mockLocalStorage[k]; },
    clear: () => { Object.keys(mockLocalStorage).forEach(k => delete mockLocalStorage[k]); }
};
global.window = global;
global.CustomEvent = class {
    constructor(name, params) {
        this.name = name;
        this.detail = params ? params.detail : null;
    }
};
global.dispatchEvent = () => true;

// 1. Test Adapter Module Loading
console.log('▶ 1. Adapter Module Integrity (content/firebase_adapter.js)');
try {
    const adapterPath = path.join(ROOT, 'content/firebase_adapter.js');
    assert(fs.existsSync(adapterPath), 'firebase_adapter.js file exists');
    
    // Require / execute script in global context
    require(adapterPath);
    assert(!!global.STEMOS_FIREBASE, 'STEMOS_FIREBASE global object created');
    assert(global.STEMOS_FIREBASE.version === '6.1.0', 'Adapter reports version 6.1.0', global.STEMOS_FIREBASE.version);
    assert(global.STEMOS_FIREBASE.isInitialized === true, 'Adapter initialized automatically');
} catch (e) {
    assert(false, 'Adapter module loading exception', e.message);
}

// 2. Test Connection Status & Offline Hybrid Fallback
console.log('\n▶ 2. Hybrid Cloud & Offline Connection Status');
try {
    const status = global.STEMOS_FIREBASE.getConnectionStatus();
    assert(status.online === true, 'Connection status reports online');
    assert(typeof status.label === 'string' && status.label.length > 0, 'Connection status label present', status.label);
    assert(status.badgeClass === 'badge-sky' || status.badgeClass === 'badge-emerald', 'Valid badge styling class', status.badgeClass);
} catch (e) {
    assert(false, 'Connection status check failed', e.message);
}

// 3. Test Invite Code Resolution & Class Retrieval
console.log('\n▶ 3. Class Code Resolution Engine');
try {
    const defaultClass = global.STEMOS_FIREBASE.getClassByCode('STEM-MECA-A7X3K2');
    assert(!!defaultClass, 'Default invite code STEM-MECA-A7X3K2 resolved');
    assert(defaultClass.careerId === 'it-mecatronica', 'Resolved class points to it-mecatronica');
    assert(defaultClass.studentsCount >= 30, 'Resolved class studentsCount valid', defaultClass.studentsCount);

    const nonExistent = global.STEMOS_FIREBASE.getClassByCode('INVALID-CODE-999');
    assert(nonExistent === null, 'Invalid code returns null cleanly');
} catch (e) {
    assert(false, 'Class code resolution failed', e.message);
}

// 4. Test Class Creation & Auto-Code Generation
console.log('\n▶ 4. Dynamic Group / Class Creation');
try {
    const createdClass = global.STEMOS_FIREBASE.createClass({
        name: 'Mecatrónica 8°A — Test Lab',
        careerId: 'it-mecatronica',
        careerName: 'Ingeniería Mecatrónica',
        teacherId: 't1',
        teacherName: 'Ing. Roberto Hernández',
        maxCapacity: 35
    });

    assert(!!createdClass.id, 'Class created with unique ID', createdClass.id);
    assert(/^STEM-MECA-[A-Z0-9]{6}$/.test(createdClass.inviteCode), 'Invite code conforms to STEM-CAREER-RANDOM format', createdClass.inviteCode);
    
    // Verify it is immediately resolvable by code
    const lookup = global.STEMOS_FIREBASE.getClassByCode(createdClass.inviteCode);
    assert(!!lookup && lookup.id === createdClass.id, 'Newly created class instantly resolvable by code');
} catch (e) {
    assert(false, 'Class creation failed', e.message);
}

// 5. Test Student Registration & Class Binding
console.log('\n▶ 5. Student Registration & Roster Synchronization');
try {
    const student = global.STEMOS_FIREBASE.registerStudent({
        fullName: 'Diana Laura Morales',
        matricula: '22050144',
        email: 'd.morales@saltillo.tecnm.mx',
        system: 'it',
        careerId: 'it-mecatronica',
        careerName: 'Ingeniería Mecatrónica',
        hub: 'Saltillo',
        classCode: 'STEM-MECA-A7X3K2'
    });

    assert(student.name === 'Diana Laura Morales', 'Student registered with correct name');
    assert(student.matricula === '22050144', 'Matrícula recorded');
    assert(student.classCode === 'STEM-MECA-A7X3K2', 'Student bound to class code');
    assert(!!student.classId, 'Class ID linked to student record', student.classId);

    // Verify localStorage persistence for app.html
    const storedProfile = JSON.parse(mockLocalStorage['stemos_student_profile']);
    assert(storedProfile.name === 'Diana Laura Morales', 'stemos_student_profile saved in localStorage');
    assert(mockLocalStorage['stemos_active_career'] === 'it-mecatronica', 'stemos_active_career saved in localStorage');

    // Verify auth bridge
    const authUser = global.STEMOS_FIREBASE.getAuthUser();
    assert(authUser && authUser.displayName === 'Diana Laura Morales', 'getAuthUser retrieves registered student');
} catch (e) {
    assert(false, 'Student registration failed', e.message);
}

// 6. Test Progress Updating & Metric Recalculation
console.log('\n▶ 6. Student Progress & Class Averages Recalculation');
try {
    const updated = global.STEMOS_FIREBASE.updateStudentProgress('22050144', {
        xp: 450,
        progress: 75,
        modulesCompleted: 12,
        hoursCompleted: 45.0,
        activityText: '<strong>Diana Laura Morales</strong> scored 100% in <em>LOTO Zero-Energy Sim</em>'
    });

    assert(updated.xp === 450, 'Student XP updated to 450');
    assert(updated.progress === 75, 'Progress percentage updated to 75%');
    assert(updated.modulesCompleted === 12, 'Modules completed updated to 12');

    // Verify activity was appended to feed
    const activities = global.STEMOS_FIREBASE.getActivities(5);
    assert(activities.length > 0, 'Activity feed populated');
    assert(activities[0].text.includes('Diana Laura Morales'), 'Latest activity mentions student');
} catch (e) {
    assert(false, 'Progress update failed', e.message);
}

// 7. Verify Portal HTML & Script Integrations
console.log('\n▶ 7. Portal Markup & Integration Verifications');
try {
    const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
    assert(appHtml.includes('content/firebase_adapter.js?v=6.1.0'), 'app.html includes firebase_adapter.js');
    assert(appHtml.includes('id="header-student-name"'), 'app.html contains #header-student-name');
    assert(appHtml.includes('id="header-student-subsystem"'), 'app.html contains #header-student-subsystem');
    assert(appHtml.includes('id="student-profile-modal"'), 'app.html contains #student-profile-modal');
    assert(appHtml.includes('id="sp-modal-career"'), 'app.html contains #sp-modal-career');

    const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
    assert(appJs.includes('initStudentProfileBridge'), 'app.js defines initStudentProfileBridge');
    assert(appJs.includes('openStudentProfileModal'), 'app.js defines openStudentProfileModal');

    const registerHtml = fs.readFileSync(path.join(ROOT, 'register.html'), 'utf8');
    assert(registerHtml.includes('content/firebase_adapter.js?v=6.1.0'), 'register.html includes firebase_adapter.js');
    assert(registerHtml.includes('STEMOS_FIREBASE.getClassByCode'), 'register.html calls STEMOS_FIREBASE.getClassByCode');
    assert(registerHtml.includes('STEMOS_FIREBASE.registerStudent'), 'register.html calls STEMOS_FIREBASE.registerStudent');

    const adminHtml = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
    assert(adminHtml.includes('content/firebase_adapter.js?v=6.1.0'), 'admin.html includes firebase_adapter.js');
    assert(adminHtml.includes('STEMOS_FIREBASE.getStudents'), 'admin.html syncs students via STEMOS_FIREBASE');

    const teacherHtml = fs.readFileSync(path.join(ROOT, 'teacher.html'), 'utf8');
    assert(teacherHtml.includes('content/firebase_adapter.js?v=6.1.0'), 'teacher.html includes firebase_adapter.js');
    assert(teacherHtml.includes('STEMOS_FIREBASE.getStudents'), 'teacher.html syncs students via STEMOS_FIREBASE');

    const swJs = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    assert(swJs.includes('v6.1.0-firebase-sync'), 'sw.js cache name updated to v6.1.0-firebase-sync');
    assert(swJs.includes('/content/firebase_adapter.js'), 'sw.js pre-caches /content/firebase_adapter.js');
} catch (e) {
    assert(false, 'Portal integration verification failed', e.message);
}

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, ${failedTests} Failed`);
console.log('═══════════════════════════════════════════════════════════════════');

if (failedTests > 0) {
    process.exit(1);
} else {
    console.log('\n🎉 ALL PHASE 59 FIREBASE & PROFILE BRIDGE TESTS PASSED (100%)!\n');
    process.exit(0);
}
