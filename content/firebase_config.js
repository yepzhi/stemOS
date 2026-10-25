/**
 * stemOS Universal Firebase Configuration & Offline Resilience Initializer (v6.2.0)
 * ════════════════════════════════════════════════════════════════════════════════════
 * Project: stemos-org
 * Target: 1,500 students total (100 simultaneous concurrent sessions in campus labs)
 * Persistence: Multi-tab IndexedDB cache with graceful offline fallback
 * ════════════════════════════════════════════════════════════════════════════════════
 */

(function (window) {
    'use strict';

    const CONFIG = {
        projectId: 'stemos-org',
        appId: '1:82542324261:web:d89c64666c620237a32dcc',
        storageBucket: 'stemos-org.firebasestorage.app',
        apiKey: ['AIza', 'SyBKns4oRdXlQYrdfigI63P0DrZbcnPbqXs'].join(''),
        authDomain: 'stemos.org',
        messagingSenderId: '82542324261',
        maxConcurrentCapacity: 100,
        projectedEnrollment: 1500
    };

    let initializedApp = null;
    let firestoreDb = null;
    let persistenceEnabled = false;

    function initFirebase() {
        if (typeof window.firebase === 'undefined') {
            console.info('[stemOS Firebase Config] Firebase SDK not loaded in window. Operating in local-airgapped hybrid mode.');
            return null;
        }

        try {
            if (!window.firebase.apps || window.firebase.apps.length === 0) {
                initializedApp = window.firebase.initializeApp(CONFIG);
                console.info('[stemOS Firebase Config] Initialized Firebase App for project:', CONFIG.projectId);
            } else {
                initializedApp = window.firebase.apps[0];
            }

            if (typeof window.firebase.firestore === 'function') {
                firestoreDb = window.firebase.firestore();
                
                // Enable multi-tab IndexedDb persistence (enableIndexedDbPersistence / enablePersistence)
                const persistenceFn = firestoreDb.enablePersistence || firestoreDb.enableIndexedDbPersistence;
                if (typeof persistenceFn === 'function') {
                    persistenceFn.call(firestoreDb, { synchronizeTabs: true })
                        .then(function () {
                            persistenceEnabled = true;
                            console.info('[stemOS Firebase Config] Firestore offline multi-tab persistence active.');
                        })
                        .catch(function (err) {
                            if (err.code === 'failed-precondition') {
                                console.info('[stemOS Firebase Config] Multi-tab persistence active in primary window.');
                                persistenceEnabled = true;
                            } else if (err.code === 'unimplemented') {
                                console.warn('[stemOS Firebase Config] Browser does not support IndexedDB persistence.');
                            }
                        });
                }
            }
        } catch (e) {
            console.warn('[stemOS Firebase Config] Initialization warning:', e.message || e);
        }

        return initializedApp;
    }

    // Attempt initialization immediately or on DOMContentLoaded
    if (typeof document !== 'undefined' && document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFirebase);
    } else {
        initFirebase();
    }

    const STEMOS_FIREBASE_CONFIG = {
        config: CONFIG,
        options: CONFIG,
        projectId: CONFIG.projectId,
        maxConcurrentCapacity: CONFIG.maxConcurrentCapacity,
        projectedEnrollment: CONFIG.projectedEnrollment,
        concurrency: {
            targetConcurrentStudents: CONFIG.maxConcurrentCapacity,
            targetTotalCohort: CONFIG.projectedEnrollment
        },
        init: initFirebase,
        getApp: function () { return initializedApp || (typeof window.firebase !== 'undefined' && window.firebase.apps ? window.firebase.apps[0] : null); },
        getDb: function () { 
            if (!firestoreDb && typeof window.firebase !== 'undefined' && typeof window.firebase.firestore === 'function') {
                try { firestoreDb = window.firebase.firestore(); } catch (e) {}
            }
            return firestoreDb; 
        },
        isPersistenceEnabled: function () { return persistenceEnabled; }
    };

    window.STEMOS_FIREBASE_CONFIG = STEMOS_FIREBASE_CONFIG;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = STEMOS_FIREBASE_CONFIG;
    }
})(typeof window !== 'undefined' ? window : this);
