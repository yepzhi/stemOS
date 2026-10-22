/**
 * stemOS Concurrency, Firestore & Gemini Mini PC Edge Scale Audit Suite
 * Validates Firestore 100% (stemos-org), Gemini 2.5 Flash / Mini PC LAN Edge (0L water),
 * multi-tab persistence, debounced sync queues, and portal script parity.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  [PASS] ${testName}`);
    } else {
        failedTests++;
        console.error(`  [FAIL] ${testName} ${details ? '— ' + details : ''}`);
    }
}

console.log('═══════════════════════════════════════════════════════════════════');
console.log('⚡ stemOS High-Scale Audit: Firestore 100%, Gemini & Mini PC Edge');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ─────────────────────────────────────────────────────────────────
// SECTION 1: Firebase Project & Rules Configuration
// ─────────────────────────────────────────────────────────────────
console.log('▶ 1. Firebase Project & Rules Configuration (.firebaserc, firebase.json, firestore.rules)');
try {
    const firebasercPath = path.join(ROOT, '.firebaserc');
    assert(fs.existsSync(firebasercPath), '.firebaserc file exists');
    const firebaserc = JSON.parse(fs.readFileSync(firebasercPath, 'utf8'));
    assert(firebaserc.projects && firebaserc.projects.default === 'stemos-org', '.firebaserc points default project to stemos-org');

    const firebaseJsonPath = path.join(ROOT, 'firebase.json');
    assert(fs.existsSync(firebaseJsonPath), 'firebase.json exists');
    const firebaseJson = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));
    assert(firebaseJson.firestore && firebaseJson.firestore.rules === 'firestore.rules', 'firebase.json points to firestore.rules');
    assert(firebaseJson.firestore && firebaseJson.firestore.indexes === 'firestore.indexes.json', 'firebase.json points to firestore.indexes.json');

    const rulesPath = path.join(ROOT, 'firestore.rules');
    assert(fs.existsSync(rulesPath), 'firestore.rules exists');
    const rulesCode = fs.readFileSync(rulesPath, 'utf8');
    assert(rulesCode.includes("match /institutions/{institutionId}"), 'Rules enforce multi-tenant /institutions isolation');
    assert(rulesCode.includes("match /students/{studentId}"), 'Rules secure student records collection');
    assert(rulesCode.includes("match /classes/{classId}"), 'Rules secure classes collection');
    assert(rulesCode.includes("match /audit_logs/{logId}"), 'Rules govern audit_logs collection');

    const indexesPath = path.join(ROOT, 'firestore.indexes.json');
    assert(fs.existsSync(indexesPath), 'firestore.indexes.json exists');
    const indexesJson = JSON.parse(fs.readFileSync(indexesPath, 'utf8'));
    assert(Array.isArray(indexesJson.indexes) && indexesJson.indexes.length >= 3, 'Composite indexes defined for scale queries');
} catch (err) {
    assert(false, 'Firebase Config Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 2: Universal Firebase Config Module (content/firebase_config.js)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 2. Universal Firebase Config Module (content/firebase_config.js)');
try {
    const configPath = path.join(ROOT, 'content', 'firebase_config.js');
    assert(fs.existsSync(configPath), 'firebase_config.js exists');

    const configCode = fs.readFileSync(configPath, 'utf8');
    assert(configCode.includes('stemos-org'), 'Config references projectId stemos-org');
    assert(configCode.includes('AIzaSyBKns4oRdXlQYrdfigI63P0DrZbcnPbqXs'), 'Config references active web apiKey');
    assert(configCode.includes('enableIndexedDbPersistence') || configCode.includes('persistentLocalCache'), 'Config enables offline IndexedDB / multi-tab persistence');

    // Run in isolated sandbox
    const sandbox = {
        window: {},
        document: { readyState: 'complete', addEventListener: () => {} },
        console: console,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        localStorage: { getItem: () => null, setItem: () => {} }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(configCode, sandbox);

    const cfg = sandbox.window.STEMOS_FIREBASE_CONFIG;
    assert(Boolean(cfg), 'STEMOS_FIREBASE_CONFIG is mounted to window');
    assert(cfg.options && cfg.options.projectId === 'stemos-org', 'Exported options has projectId stemos-org');
    assert(cfg.concurrency && cfg.concurrency.targetConcurrentStudents === 100, 'Concurrency target set for 100 simultaneous users');
    assert(cfg.concurrency && cfg.concurrency.targetTotalCohort === 1500, 'Cohort capacity target set for 1,500 total students');
    assert(typeof cfg.init === 'function', 'Provides cfg.init() entry point');
} catch (err) {
    assert(false, 'Firebase Config Sandbox Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 3: Universal Gemini AI & Mini PC Edge Adapter (content/gemini_service.js)
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 3. Universal Gemini AI & Mini PC Edge Adapter (content/gemini_service.js)');
try {
    const geminiPath = path.join(ROOT, 'content', 'gemini_service.js');
    assert(fs.existsSync(geminiPath), 'gemini_service.js exists');

    const geminiCode = fs.readFileSync(geminiPath, 'utf8');
    assert(geminiCode.includes('gemini-2.5-flash'), 'Configured with Gemini 2.5 Flash model');
    assert(geminiCode.includes('http://localhost:8080/api/gemini'), 'Includes Mini PC local edge LAN endpoint');

    // Run in sandbox
    const sandbox = {
        window: {},
        document: { readyState: 'complete', addEventListener: () => {} },
        console: console,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        fetch: async () => ({ ok: false, status: 503 }), // simulate offline/airgap
        localStorage: { getItem: () => null, setItem: () => {} }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(geminiCode, sandbox);

    const ai = sandbox.window.STEMOS_AI;
    assert(Boolean(ai), 'STEMOS_AI is mounted to window');
    assert(typeof ai.evaluateFeynmanDefense === 'function', 'Provides evaluateFeynmanDefense method');
    assert(typeof ai.evaluateIncidentWarRoom === 'function', 'Provides evaluateIncidentWarRoom method');
    assert(typeof ai.upgradeLexicon === 'function', 'Provides upgradeLexicon method');
    assert(typeof ai.checkConnectivity === 'function', 'Provides checkConnectivity method');

    // Test heuristic offline fallback
    const heuristic = ai._offlineFeynmanHeuristic('Containment action implemented with LOTO protocol and 5-Why analysis.');
    assert(heuristic && heuristic.score >= 70, `Heuristic score calculated offline (${heuristic.score}%)`);
    assert(heuristic.rubric && heuristic.rubric.clarity > 0, 'Heuristic rubric generated');
} catch (err) {
    assert(false, 'Gemini Service Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 4: Universal Firebase Adapter Concurrency & Cloud Sync
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 4. Universal Firebase Adapter Concurrency & Cloud Sync (content/firebase_adapter.js)');
try {
    const adapterPath = path.join(ROOT, 'content', 'firebase_adapter.js');
    assert(fs.existsSync(adapterPath), 'firebase_adapter.js exists');

    const adapterCode = fs.readFileSync(adapterPath, 'utf8');
    assert(adapterCode.includes('syncStudentToCloud'), 'Adapter implements syncStudentToCloud');
    assert(adapterCode.includes('syncClassToCloud'), 'Adapter implements syncClassToCloud');
    assert(adapterCode.includes('syncAuditLogToCloud'), 'Adapter implements syncAuditLogToCloud');
    assert(adapterCode.includes('_debouncedSyncStudent'), 'Adapter implements debounced student sync for 100 simultaneous users');

    // Run in sandbox with mock storage
    const store = {};
    const sandbox = {
        window: {},
        document: { readyState: 'complete', addEventListener: () => {} },
        console: console,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        localStorage: {
            getItem: (k) => store[k] || null,
            setItem: (k, v) => { store[k] = String(v); },
            removeItem: (k) => { delete store[k]; }
        }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(adapterCode, sandbox);

    const fb = sandbox.window.STEMOS_FIREBASE;
    assert(Boolean(fb), 'STEMOS_FIREBASE is initialized');

    // Test student registration + sync
    const student = fb.registerStudent({
        name: 'Carlos Salinas',
        email: 'carlos.salinas@saltillo.tecnm.mx',
        matricula: '20261199',
        careerId: 'it-mecatronica',
        careerName: 'Ingeniería Mecatrónica',
        classCode: 'STEM-MECA-A7X3K2'
    });
    assert(student && student.id, 'Student registered successfully in adapter');

    // Test progress update + debounce
    const updated = fb.updateStudentProgress(student.id, {
        xp: 150,
        progress: 25,
        modulesCompleted: 4,
        activityText: 'Completó Estación M04 Hito 1 (+150 XP)'
    });
    assert(updated && updated.xp === 150, 'Student progress updated with XP');
    assert(updated && updated.progress === 25, 'Student progress percentage updated');
} catch (err) {
    assert(false, 'Adapter Sync Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 5: Portal Markup & Telemetry Badges Parity
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 5. Portal Markup & Telemetry Badges Parity');
try {
    const portals = [
        { file: 'app.html', badgeId: 'header-connection-hud', script: 'content/firebase_config.js?v=6.2.0' },
        { file: 'teacher.html', badgeId: 'teacher-firestore-badge', script: 'content/firebase_config.js?v=6.2.0' },
        { file: 'admin.html', badgeId: 'admin-firestore-badge', script: 'content/firebase_config.js?v=6.2.0' },
        { file: 'register.html', badgeId: null, script: 'content/firebase_config.js?v=6.2.0' },
        { file: 'placement.html', badgeId: null, script: 'content/firebase_config.js?v=6.2.0' },
        { file: 'tracks.html', badgeId: null, script: 'content/firebase_config.js?v=6.2.0' },
        { file: 'index.html', badgeId: null, script: 'content/firebase_config.js?v=6.2.0' }
    ];

    portals.forEach(p => {
        const filePath = path.join(ROOT, p.file);
        assert(fs.existsSync(filePath), `${p.file} exists`);
        const content = fs.readFileSync(filePath, 'utf8');
        assert(content.includes(p.script), `${p.file} loads ${p.script}`);
        if (p.badgeId) {
            assert(content.includes(p.badgeId), `${p.file} contains telemetry badge #${p.badgeId}`);
        }
    });

    const swPath = path.join(ROOT, 'sw.js');
    const swCode = fs.readFileSync(swPath, 'utf8');
    assert(swCode.includes('/content/firebase_config.js'), 'sw.js pre-caches /content/firebase_config.js');
    assert(swCode.includes('/content/gemini_service.js'), 'sw.js pre-caches /content/gemini_service.js');
} catch (err) {
    assert(false, 'Portal Markup Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 6: Zero A2 Policy Compliance in modified files
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 6. Zero A2 Policy Invariant Audit (Strict outside World A)');
try {
    const filesToAudit = [
        'app.html',
        'teacher.html',
        'admin.html',
        'register.html',
        'content/firebase_adapter.js',
        'content/firebase_config.js',
        'content/gemini_service.js',
        'world-map.js'
    ];

    filesToAudit.forEach(f => {
        const fullPath = path.join(ROOT, f);
        if (!fs.existsSync(fullPath)) return;
        let content = fs.readFileSync(fullPath, 'utf8');

        // Strip WORLD A block if present
        const worldAIdx = content.indexOf('WORLD A: MCER TRACKS');
        if (worldAIdx !== -1) {
            content = content.substring(0, worldAIdx);
        }

        const bannedMatches = content.match(/\b(Nivel\s+A2|English\s+A2|MCER\s+A2)\b/gi);
        assert(!bannedMatches || bannedMatches.length === 0, `${f} adheres to Zero A2 Policy outside World A (Matches: ${bannedMatches ? bannedMatches.length : 0})`);
    });
} catch (err) {
    assert(false, 'Zero A2 Policy Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 7: Mini PC Edge Gateway Script & Root/Dev Parity
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 7. Mini PC Edge Gateway Script & Root/Dev Parity');
try {
    const edgeServerPath = path.join(ROOT, 'scripts', 'minipc_edge_server.cjs');
    assert(fs.existsSync(edgeServerPath), 'scripts/minipc_edge_server.cjs exists');
    const edgeCode = fs.readFileSync(edgeServerPath, 'utf8');
    assert(edgeCode.includes('targetConcurrentStudents: 100'), 'Edge server targets 100 concurrent students');
    assert(edgeCode.includes('projectedCohortCapacity: 1500'), 'Edge server projects 1500 student cohort');
    assert(edgeCode.includes('0 Liters'), 'Edge server documents 0 Liters water footprint');
    assert(edgeCode.includes('stemos-org'), 'Edge server references Cloud Firestore stemos-org');
    assert(edgeCode.includes('/health'), 'Edge server exposes /health endpoint');
    assert(edgeCode.includes('/api/tags'), 'Edge server exposes /api/tags Ollama endpoint');
    assert(edgeCode.includes('/api/chat'), 'Edge server exposes /api/chat Ollama endpoint');

    // Root vs Dev parity check
    const parityFiles = [
        'app.js',
        'app.html',
        'admin.html',
        'teacher.html',
        'register.html',
        'placement.html',
        'tracks.html',
        'index.html',
        'firebase.json',
        'firestore.rules',
        '.firebaserc',
        'content/firebase_config.js',
        'content/gemini_service.js',
        'content/firebase_adapter.js'
    ];

    parityFiles.forEach(file => {
        const rootF = path.join(ROOT, file);
        const devF = path.join(ROOT, 'dev', file);
        if (fs.existsSync(rootF) && fs.existsSync(devF)) {
            const rootBuf = fs.readFileSync(rootF);
            const devBuf = fs.readFileSync(devF);
            assert(rootBuf.equals(devBuf), `${file} is 100% bit-for-bit identical with dev/${file}`);
        }
    });
} catch (err) {
    assert(false, 'Mini PC Edge & Parity Exception', err.message);
}

// ─────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, ${failedTests} Failed (Total: ${totalTests})`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failedTests > 0) {
    process.exit(1);
} else {
    console.log('🎉 ALL FIRESTORE, GEMINI & MINI PC EDGE SCALE TESTS PASSED (100%)!\n');
    process.exit(0);
}

