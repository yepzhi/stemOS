/**
 * stemOS Enterprise Offline Sync Engine & IndexedDB Mutation Queue
 * Phase 88 — Resilient Field Operations, Additive XP Merge & Exponential Backoff
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.STEMOS_SYNC = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    var DB_NAME = 'stemos_offline_db';
    var DB_VERSION = 1;
    var STORE_NAME = 'mutation_queue';

    var memoryQueue = []; // Fallback for environments without IndexedDB (e.g. Node.js unit tests)
    var isOnline = (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') ? navigator.onLine : true;
    var isSyncing = false;
    var listeners = [];

    // UUID Generator for offline mutations
    function generateUUID() {
        return 'mut_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Open or initialize IndexedDB
    function getDB() {
        return new Promise(function (resolve, reject) {
            if (typeof indexedDB === 'undefined') {
                return resolve(null);
            }
            var request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    var store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('status', 'status', { unique: false });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('entityType', 'entityType', { unique: false });
                }
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onerror = function (event) {
                resolve(null);
            };
        });
    }

    // Enqueue Mutation
    function enqueueMutation(entityType, action, payload, options) {
        options = options || {};
        var mutation = {
            id: generateUUID(),
            entityType: entityType,
            action: action,
            payload: payload || {},
            strategy: options.strategy || 'LWW', // 'LWW', 'XP_ACCUMULATIVE', 'MAX_PROGRESS'
            status: 'pending',
            retries: 0,
            timestamp: new Date().toISOString(),
            retryAfter: 0
        };

        return getDB().then(function (db) {
            if (!db) {
                memoryQueue.push(mutation);
                notifyListeners('enqueued', mutation);
                return mutation;
            }
            return new Promise(function (resolve, reject) {
                var tx = db.transaction(STORE_NAME, 'readwrite');
                var store = tx.objectStore(STORE_NAME);
                store.add(mutation);
                tx.oncomplete = function () {
                    notifyListeners('enqueued', mutation);
                    resolve(mutation);
                };
                tx.onerror = function () {
                    // Fallback to memory
                    memoryQueue.push(mutation);
                    resolve(mutation);
                };
            });
        });
    }

    // Fetch Pending Mutations
    function getPendingMutations() {
        return getDB().then(function (db) {
            if (!db) {
                return memoryQueue.filter(function (m) { return m.status === 'pending'; });
            }
            return new Promise(function (resolve, reject) {
                var tx = db.transaction(STORE_NAME, 'readonly');
                var store = tx.objectStore(STORE_NAME);
                var request = store.getAll();
                request.onsuccess = function () {
                    var items = (request.result || []).filter(function (m) {
                        return m.status === 'pending';
                    });
                    resolve(items);
                };
                request.onerror = function () {
                    resolve(memoryQueue.filter(function (m) { return m.status === 'pending'; }));
                };
            });
        });
    }

    // Conflict Resolution Algorithms
    function resolveConflict(clientDoc, serverDoc, strategy) {
        if (!serverDoc) return Object.assign({}, clientDoc);
        if (!clientDoc) return Object.assign({}, serverDoc);

        var merged = Object.assign({}, serverDoc);

        if (strategy === 'XP_ACCUMULATIVE') {
            // Additive merge: offline earned XP and coins add directly to server totals
            var clientEarnedXP = Number(clientDoc.xpEarnedOffline || clientDoc.xp || 0);
            var clientEarnedCoins = Number(clientDoc.coinsEarnedOffline || clientDoc.coins || 0);
            merged.xp = (Number(serverDoc.xp) || 0) + clientEarnedXP;
            merged.coins = (Number(serverDoc.coins) || 0) + clientEarnedCoins;
            merged.lastSyncTimestamp = new Date().toISOString();
            return merged;
        }

        if (strategy === 'MAX_PROGRESS') {
            // Monotonic non-decreasing progression (never rewind progress)
            var clientLevel = Number(clientDoc.level || 0);
            var serverLevel = Number(serverDoc.level || 0);
            merged.level = Math.max(clientLevel, serverLevel);

            var clientLessons = Number(clientDoc.completedLessonsCount || 0);
            var serverLessons = Number(serverDoc.completedLessonsCount || 0);
            merged.completedLessonsCount = Math.max(clientLessons, serverLessons);

            merged.lastSyncTimestamp = new Date().toISOString();
            return merged;
        }

        // Default: Last-Write-Wins (LWW) based on timestamps
        var clientTime = clientDoc.updatedAt ? new Date(clientDoc.updatedAt).getTime() : 0;
        var serverTime = serverDoc.updatedAt ? new Date(serverDoc.updatedAt).getTime() : 0;

        if (clientTime >= serverTime) {
            return Object.assign({}, serverDoc, clientDoc, { lastSyncTimestamp: new Date().toISOString() });
        }
        return Object.assign({}, clientDoc, serverDoc, { lastSyncTimestamp: new Date().toISOString() });
    }

    // Dispatch Events to subscribers / UI
    function notifyListeners(eventName, data) {
        listeners.forEach(function (fn) {
            try { fn(eventName, data); } catch (e) {}
        });
        if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
            try {
                window.dispatchEvent(new CustomEvent('stemos:sync-status', {
                    detail: { event: eventName, data: data, isOnline: isOnline }
                }));
            } catch (e) {}
        }
    }

    // Setup Network Listeners
    if (typeof window !== 'undefined') {
        window.addEventListener('online', function () {
            isOnline = true;
            notifyListeners('online', { online: true });
            api.flushQueue();
        });
        window.addEventListener('offline', function () {
            isOnline = false;
            notifyListeners('offline', { online: false });
        });
    }

    // Helper: Resolve active userId and institutionId accurately (Firebase auth().currentUser lacks .institutionId)
    function resolveAuthContext() {
        var fbUser = null;
        if (typeof window !== 'undefined' && typeof window.firebase !== 'undefined' && window.firebase.auth) {
            try { fbUser = window.firebase.auth().currentUser; } catch (_) {}
        }
        var adapterUser = (typeof window !== 'undefined' && window.STEMOS_FIREBASE && typeof window.STEMOS_FIREBASE.getAuthUser === 'function')
            ? window.STEMOS_FIREBASE.getAuthUser()
            : null;
        var profile = null;
        try {
            if (typeof localStorage !== 'undefined') {
                var rawProf = localStorage.getItem('stemos_student_profile');
                if (rawProf) profile = JSON.parse(rawProf);
            }
        } catch (_) {}

        var userId = (fbUser && fbUser.uid) ||
                     (adapterUser && (adapterUser.uid || adapterUser.id || adapterUser.matricula)) ||
                     (profile && (profile.uid || profile.studentId)) ||
                     'student-local';
        var instId = (profile && (profile.institutionId || profile.subsystem || profile.system)) ||
                     (adapterUser && adapterUser.institutionId) ||
                     'tecnm-saltillo';
        return { userId: userId, instId: instId, fbUser: fbUser };
    }

    // Helper: Normalize CEFR code to satisfy firestore.rules isValidMcerProgress (`A1`..`C2`)
    function normalizeCefrCode(raw) {
        var code = String(raw || 'A1').toUpperCase().trim();
        if (code === 'C1-C2' || code === 'C1_C2' || code.indexOf('C1') === 0) return 'C1';
        if (code.indexOf('C2') === 0) return 'C2';
        if (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(code) !== -1) return code;
        return 'A1';
    }

    // Built-in Firebase Firestore Sender for MCER Progression
    function defaultFirestoreSender(mutation) {
        if (typeof window === 'undefined') return Promise.resolve(mutation);

        var db = null;
        if (window.STEMOS_FIREBASE_CONFIG && typeof window.STEMOS_FIREBASE_CONFIG.getDb === 'function') {
            db = window.STEMOS_FIREBASE_CONFIG.getDb();
        } else if (typeof window.firebase !== 'undefined' && window.firebase.firestore) {
            try { db = window.firebase.firestore(); } catch (_) {}
        }

        var ctx = resolveAuthContext();
        var userId = ctx.userId;
        var instId = ctx.instId;

        if (!db) {
            // Air-gapped fallback: update local Firebase Adapter state
            if (window.STEMOS_FIREBASE && typeof window.STEMOS_FIREBASE.updateStudentProgress === 'function' && mutation.payload) {
                try {
                    window.STEMOS_FIREBASE.updateStudentProgress(userId, {
                        xp: mutation.payload.xpEarned || 0,
                        progress: mutation.payload.progress || 100,
                        activityText: 'Completó ' + (mutation.payload.unitTitle || 'Unidad MCER')
                    });
                } catch (_) {}
            }
            return Promise.resolve(mutation);
        }

        if (mutation.entityType === 'MCER_UNIT_PROGRESS') {
            var p = mutation.payload || {};
            var cefrVal = normalizeCefrCode(p.cefr || p.level);
            return db.collection('institutions').doc(instId)
                .collection('students').doc(userId)
                .collection('mcer_progress').doc(p.unitId || 'unit-unknown')
                .set({
                    unitId: p.unitId,
                    unitTitle: p.unitTitle || '',
                    cefr: cefrVal,
                    level: cefrVal,
                    score: p.score || 0,
                    passed: Boolean(p.passed),
                    xpEarned: p.xpEarned || 0,
                    completedAt: p.completedAt || new Date().toISOString(),
                    updatedAt: p.updatedAt || new Date().toISOString(),
                    syncedAt: new Date().toISOString()
                }, { merge: true })
                .then(function () {
                    if (p.xpEarned && typeof window.firebase !== 'undefined' && window.firebase.firestore && window.firebase.firestore.FieldValue) {
                        try {
                            db.collection('institutions').doc(instId).collection('students').doc(userId).set({
                                xp: window.firebase.firestore.FieldValue.increment(p.xpEarned),
                                lastActiveAt: new Date().toISOString()
                            }, { merge: true }).catch(function () {});
                        } catch (_) {}
                    }
                    return mutation;
                }).catch(function (err) {
                    console.warn('[stemOS Sync] Firestore write error, retrying later:', err);
                    throw err;
                });
        }

        if (mutation.entityType === 'CURRICULUM_CONFIG') {
            var cfg = mutation.payload || {};
            var cfgInst = cfg.institutionId || instId;
            if (!cfg.classId || !cfg.trackKey) return Promise.resolve(mutation);
            return db.collection('institutions').doc(cfgInst)
                .collection('classes').doc(cfg.classId)
                .collection('curriculum_config').doc(cfg.trackKey)
                .set(Object.assign({}, cfg, { syncedAt: new Date().toISOString() }), { merge: true })
                .then(function () { return mutation; });
        }

        if (mutation.entityType === 'CLASS_ASSIGNMENT') {
            var asg = mutation.payload || {};
            var asgInst = asg.institutionId || instId;
            if (!asg.classId || !asg.id) return Promise.resolve(mutation);
            return db.collection('institutions').doc(asgInst)
                .collection('classes').doc(asg.classId)
                .collection('assignments').doc(asg.id)
                .set(Object.assign({}, asg, { syncedAt: new Date().toISOString() }), { merge: true })
                .then(function () { return mutation; });
        }

        return Promise.resolve(mutation);
    }

    var api = {
        version: '1.2.0-phase89',

        isOnline: function () {
            return isOnline;
        },

        enqueueMutation: enqueueMutation,
        queueMutation: function (entityType, payload, options) {
            return enqueueMutation(entityType, 'UPSERT', payload, options);
        },
        getPendingMutations: getPendingMutations,
        resolveConflict: resolveConflict,

        onSyncEvent: function (callback) {
            if (typeof callback === 'function') {
                listeners.push(callback);
            }
        },

        // Flush queue to Firestore or custom sender (Smart Batch Commit)
        flushQueue: function (customSender) {
            if (isSyncing) return Promise.resolve({ synced: 0, status: 'already_syncing' });
            isSyncing = true;
            notifyListeners('sync_start', {});

            function sequentialFlush(items, activeSender) {
                var syncPromises = items.map(function (mutation) {
                    return activeSender(mutation).then(function () {
                        mutation.status = 'synced';
                        return getDB().then(function (db) {
                            if (!db) return mutation;
                            return new Promise(function (res) {
                                var tx = db.transaction(STORE_NAME, 'readwrite');
                                var store = tx.objectStore(STORE_NAME);
                                store.delete(mutation.id);
                                tx.oncomplete = function () { res(mutation); };
                                tx.onerror = function () { res(mutation); };
                            });
                        });
                    }).catch(function (err) {
                        mutation.retries += 1;
                        mutation.retryAfter = Date.now() + Math.min(30000, Math.pow(2, mutation.retries) * 1000);
                        return mutation;
                    });
                });

                return Promise.all(syncPromises).then(function (results) {
                    isSyncing = false;
                    var syncedCount = results.filter(function (r) { return r.status === 'synced'; }).length;
                    notifyListeners('sync_complete', { synced: syncedCount });
                    if (syncedCount > 0) {
                        notifyListeners('firestore_synced', { synced: syncedCount });
                    }
                    return { synced: syncedCount, total: results.length };
                });
            }

            return getPendingMutations().then(function (pending) {
                if (pending.length === 0) {
                    isSyncing = false;
                    notifyListeners('sync_complete', { synced: 0 });
                    return { synced: 0, remaining: 0 };
                }

                // If default sender and Firestore batch is supported, execute atomic batch commit
                var db = null;
                if (window.STEMOS_FIREBASE_CONFIG && typeof window.STEMOS_FIREBASE_CONFIG.getDb === 'function') {
                    db = window.STEMOS_FIREBASE_CONFIG.getDb();
                } else if (typeof window.firebase !== 'undefined' && window.firebase.firestore) {
                    try { db = window.firebase.firestore(); } catch (_) {}
                }

                if (!customSender && db && typeof db.batch === 'function') {
                    var ctx = resolveAuthContext();
                    var userId = ctx.userId;
                    var instId = ctx.instId;

                    var batch = db.batch();
                    var totalXp = 0;
                    var processedMutations = [];
                    var remainingMutations = [];

                    pending.forEach(function (m) {
                        if (m.entityType === 'MCER_UNIT_PROGRESS' && m.payload) {
                            var p = m.payload;
                            var cefrVal = normalizeCefrCode(p.cefr || p.level);
                            var docRef = db.collection('institutions').doc(instId)
                                .collection('students').doc(userId)
                                .collection('mcer_progress').doc(p.unitId || 'unit-unknown');
                            batch.set(docRef, {
                                unitId: p.unitId,
                                unitTitle: p.unitTitle || '',
                                cefr: cefrVal,
                                level: cefrVal,
                                score: p.score || 0,
                                passed: Boolean(p.passed),
                                xpEarned: p.xpEarned || 0,
                                completedAt: p.completedAt || new Date().toISOString(),
                                updatedAt: p.updatedAt || new Date().toISOString(),
                                syncedAt: new Date().toISOString()
                            }, { merge: true });

                            if (p.xpEarned) totalXp += p.xpEarned;
                            processedMutations.push(m);
                        } else {
                            remainingMutations.push(m);
                        }
                    });

                    if (processedMutations.length > 0) {
                        return batch.commit().then(function () {
                            if (totalXp > 0 && typeof window.firebase !== 'undefined' && window.firebase.firestore && window.firebase.firestore.FieldValue) {
                                try {
                                    var studentRef = db.collection('institutions').doc(instId).collection('students').doc(userId);
                                    studentRef.set({
                                        xp: window.firebase.firestore.FieldValue.increment(totalXp),
                                        lastActiveAt: new Date().toISOString()
                                    }, { merge: true }).catch(function () {});
                                } catch (_) {}
                            }
                            return getDB().then(function (idb) {
                                if (!idb) {
                                    memoryQueue = memoryQueue.filter(function (m) {
                                        return !processedMutations.some(function (pm) { return pm.id === m.id; });
                                    });
                                    return processedMutations.length;
                                }
                                return new Promise(function (res) {
                                    var tx = idb.transaction(STORE_NAME, 'readwrite');
                                    var store = tx.objectStore(STORE_NAME);
                                    processedMutations.forEach(function (pm) {
                                        store.delete(pm.id);
                                    });
                                    tx.oncomplete = function () { res(processedMutations.length); };
                                    tx.onerror = function () { res(processedMutations.length); };
                                });
                            });
                        }).then(function (batchSyncedCount) {
                            if (remainingMutations.length > 0) {
                                return sequentialFlush(remainingMutations, defaultFirestoreSender).then(function (seqRes) {
                                    var totalSynced = batchSyncedCount + (seqRes ? seqRes.synced : 0);
                                    return { synced: totalSynced, total: pending.length };
                                });
                            }
                            isSyncing = false;
                            notifyListeners('sync_complete', { synced: batchSyncedCount });
                            notifyListeners('firestore_synced', { synced: batchSyncedCount });
                            return { synced: batchSyncedCount, total: pending.length };
                        }).catch(function (batchErr) {
                            console.warn('[stemOS Sync] Batch commit error, falling back to sequential retry:', batchErr);
                            return sequentialFlush(pending, defaultFirestoreSender);
                        });
                    }
                }

                var sender = (typeof customSender === 'function') ? customSender : defaultFirestoreSender;
                return sequentialFlush(pending, sender);
            });
        },

        clearQueue: function () {
            memoryQueue = [];
            return getDB().then(function (db) {
                if (!db) return true;
                return new Promise(function (resolve) {
                    var tx = db.transaction(STORE_NAME, 'readwrite');
                    tx.objectStore(STORE_NAME).clear();
                    tx.oncomplete = function () { resolve(true); };
                    tx.onerror = function () { resolve(false); };
                });
            });
        }
    };

    return api;
}));
