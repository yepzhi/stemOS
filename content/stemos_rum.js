/**
 * stemOS Enterprise Real User Monitoring (RUM) & Web Vitals Telemetry Engine
 * Phase 86 — Continuous Core Web Vitals & Ergonomic Performance Observability
 * Observes: LCP, CLS, INP, FID, FCP, TTFB via native PerformanceObserver API.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.STEMOS_RUM = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    var STORAGE_KEY = 'stemos_rum_telemetry_v1';
    var MAX_STORED_SESSIONS = 50;

    var metrics = {
        sessionId: 'rum-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7),
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.pathname : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        connection: {
            effectiveType: (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.effectiveType) || 'unknown',
            downlink: (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.downlink) || 0,
            rtt: (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.rtt) || 0,
            saveData: Boolean(typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData)
        },
        fcp: null,       // First Contentful Paint
        lcp: null,       // Largest Contentful Paint
        cls: 0,          // Cumulative Layout Shift
        fid: null,       // First Input Delay
        inp: null,       // Interaction to Next Paint
        ttfb: null,      // Time to First Byte
        domInteractive: null,
        domComplete: null,
        deviceMemory: (typeof navigator !== 'undefined' && navigator.deviceMemory) || null,
        hardwareConcurrency: (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || null,
        customEvents: []
    };

    var thresholds = {
        lcp: { good: 2500, needsImprovement: 4000 },
        fcp: { good: 1800, needsImprovement: 3000 },
        cls: { good: 0.1,  needsImprovement: 0.25 },
        inp: { good: 200,  needsImprovement: 500 },
        fid: { good: 100,  needsImprovement: 300 },
        ttfb:{ good: 800,  needsImprovement: 1800 }
    };

    function evaluateRating(metricName, val) {
        if (val === null || val === undefined) return 'pending';
        var t = thresholds[metricName];
        if (!t) return 'unknown';
        if (val <= t.good) return 'good';
        if (val <= t.needsImprovement) return 'needs-improvement';
        return 'poor';
    }

    function saveSessionTelemetry() {
        if (typeof localStorage === 'undefined') return;
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var history = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(history)) history = [];
            
            // Upsert current session
            var idx = history.findIndex(function(s) { return s.sessionId === metrics.sessionId; });
            if (idx >= 0) {
                history[idx] = metrics;
            } else {
                history.push(metrics);
            }
            if (history.length > MAX_STORED_SESSIONS) {
                history = history.slice(history.length - MAX_STORED_SESSIONS);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (e) {
            console.warn('[stemOS RUM] Telemetry storage quota or error:', e);
        }
    }

    function initObservers() {
        if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
            console.log('[stemOS RUM] PerformanceObserver not supported in this environment.');
            return;
        }

        // 1. Navigation Timing (TTFB, DOM Interactive, DOM Complete)
        try {
            var navEntries = performance.getEntriesByType('navigation');
            if (navEntries && navEntries.length > 0) {
                var nav = navEntries[0];
                metrics.ttfb = Math.round(nav.responseStart);
                metrics.domInteractive = Math.round(nav.domInteractive);
                metrics.domComplete = Math.round(nav.domComplete);
                saveSessionTelemetry();
            } else {
                var navObserver = new PerformanceObserver(function (entryList) {
                    var entries = entryList.getEntries();
                    if (entries.length > 0) {
                        var n = entries[0];
                        metrics.ttfb = Math.round(n.responseStart);
                        metrics.domInteractive = Math.round(n.domInteractive);
                        metrics.domComplete = Math.round(n.domComplete);
                        saveSessionTelemetry();
                    }
                });
                navObserver.observe({ type: 'navigation', buffered: true });
            }
        } catch (e) {}

        // 2. First Contentful Paint (FCP)
        try {
            var fcpObserver = new PerformanceObserver(function (entryList) {
                var entries = entryList.getEntriesByName('first-contentful-paint');
                if (entries.length > 0) {
                    metrics.fcp = Math.round(entries[0].startTime);
                    saveSessionTelemetry();
                    fcpObserver.disconnect();
                }
            });
            fcpObserver.observe({ type: 'paint', buffered: true });
        } catch (e) {}

        // 3. Largest Contentful Paint (LCP)
        try {
            var lcpObserver = new PerformanceObserver(function (entryList) {
                var entries = entryList.getEntries();
                if (entries.length > 0) {
                    var last = entries[entries.length - 1];
                    metrics.lcp = Math.round(last.startTime);
                    saveSessionTelemetry();
                }
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {}

        // 4. Cumulative Layout Shift (CLS)
        try {
            var clsObserver = new PerformanceObserver(function (entryList) {
                var entries = entryList.getEntries();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    // Only count shifts without recent user interaction
                    if (!entry.hadRecentInput) {
                        metrics.cls = Number((metrics.cls + entry.value).toFixed(4));
                    }
                }
                saveSessionTelemetry();
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {}

        // 5. First Input Delay (FID)
        try {
            var fidObserver = new PerformanceObserver(function (entryList) {
                var entries = entryList.getEntries();
                if (entries.length > 0) {
                    var firstInput = entries[0];
                    metrics.fid = Math.round(firstInput.processingStart - firstInput.startTime);
                    saveSessionTelemetry();
                    fidObserver.disconnect();
                }
            });
            fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {}

        // 6. Interaction to Next Paint (INP)
        try {
            var inpObserver = new PerformanceObserver(function (entryList) {
                var entries = entryList.getEntries();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.duration && (!metrics.inp || entry.duration > metrics.inp)) {
                        metrics.inp = Math.round(entry.duration);
                        saveSessionTelemetry();
                    }
                }
            });
            inpObserver.observe({ type: 'event', durationThreshold: 40, buffered: true });
        } catch (e) {}

        // Save on page lifecycle end
        if (typeof window !== 'undefined') {
            window.addEventListener('visibilitychange', function () {
                if (document.visibilityState === 'hidden') {
                    saveSessionTelemetry();
                }
            });
            window.addEventListener('pagehide', saveSessionTelemetry);
        }
    }

    // Public API
    var api = {
        version: '1.0.0-phase86',
        
        getMetrics: function () {
            return JSON.parse(JSON.stringify(metrics));
        },

        getRatings: function () {
            return {
                fcp: { value: metrics.fcp, rating: evaluateRating('fcp', metrics.fcp) },
                lcp: { value: metrics.lcp, rating: evaluateRating('lcp', metrics.lcp) },
                cls: { value: metrics.cls, rating: evaluateRating('cls', metrics.cls) },
                inp: { value: metrics.inp, rating: evaluateRating('inp', metrics.inp) },
                fid: { value: metrics.fid, rating: evaluateRating('fid', metrics.fid) },
                ttfb: { value: metrics.ttfb, rating: evaluateRating('ttfb', metrics.ttfb) }
            };
        },

        getOverallScore: function () {
            var ratings = api.getRatings();
            var scores = [];
            var weights = { lcp: 0.35, cls: 0.25, inp: 0.20, fcp: 0.10, ttfb: 0.10 };
            
            Object.keys(weights).forEach(function (k) {
                var r = ratings[k] ? ratings[k].rating : 'pending';
                if (r === 'good') scores.push(100 * weights[k]);
                else if (r === 'needs-improvement') scores.push(65 * weights[k]);
                else if (r === 'poor') scores.push(30 * weights[k]);
                else scores.push(90 * weights[k]); // default neutral high for pending
            });

            var total = Math.round(scores.reduce(function(a, b){ return a + b; }, 0));
            return Math.min(100, Math.max(0, total));
        },

        recordEvent: function (name, data) {
            var evt = {
                name: String(name || 'custom_event'),
                data: data || {},
                timestamp: new Date().toISOString(),
                timeOffset: Math.round(performance.now())
            };
            metrics.customEvents.push(evt);
            saveSessionTelemetry();
            return evt;
        },

        exportReport: function () {
            var history = [];
            if (typeof localStorage !== 'undefined') {
                try {
                    history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                } catch (e) {}
            }
            return {
                current: metrics,
                ratings: api.getRatings(),
                score: api.getOverallScore(),
                historyCount: history.length,
                history: history
            };
        },

        clearHistory: function () {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(STORAGE_KEY);
            }
            metrics.customEvents = [];
            saveSessionTelemetry();
        },

        renderHUD: function () {
            if (typeof document === 'undefined') return;
            var existing = document.getElementById('stemos-rum-hud');
            if (existing) {
                existing.remove();
                return;
            }

            var ratings = api.getRatings();
            var score = api.getOverallScore();
            
            var hud = document.createElement('div');
            hud.id = 'stemos-rum-hud';
            hud.style.cssText = [
                'position: fixed',
                'bottom: 18px',
                'right: 18px',
                'z-index: 999999',
                'background: rgba(3, 7, 18, 0.94)',
                'border: 1px solid rgba(56, 189, 248, 0.4)',
                'box-shadow: 0 16px 36px rgba(0,0,0,0.6), 0 0 20px rgba(56, 189, 248, 0.2)',
                'backdrop-filter: blur(16px)',
                '-webkit-backdrop-filter: blur(16px)',
                'border-radius: 14px',
                'padding: 14px 18px',
                'color: #f8fafc',
                'font-family: "JetBrains Mono", monospace',
                'font-size: 12px',
                'min-width: 260px',
                'line-height: 1.5',
                'animation: stemos-fadein 0.2s ease-out'
            ].join(';');

            function colorFor(r) {
                if (r === 'good') return '#4ade80';
                if (r === 'needs-improvement') return '#facc15';
                if (r === 'poor') return '#f87171';
                return '#94a3b8';
            }

            hud.innerHTML = [
                '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">',
                '  <span style="font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 6px;">',
                '    ⚡ stemOS RUM Scorecard',
                '  </span>',
                '  <button id="rum-hud-close" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 14px;">✕</button>',
                '</div>',
                '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">',
                '  <span style="color: #cbd5e1;">CWV Health Index:</span>',
                '  <strong style="color: #38bdf8; font-size: 14px;">' + score + ' / 100</strong>',
                '</div>',
                '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">',
                '  <div>LCP: <span style="color:' + colorFor(ratings.lcp.rating) + ';">' + (ratings.lcp.value ? ratings.lcp.value + 'ms' : 'measuring…') + '</span></div>',
                '  <div>CLS: <span style="color:' + colorFor(ratings.cls.rating) + ';">' + ratings.cls.value + '</span></div>',
                '  <div>FCP: <span style="color:' + colorFor(ratings.fcp.rating) + ';">' + (ratings.fcp.value ? ratings.fcp.value + 'ms' : 'measuring…') + '</span></div>',
                '  <div>TTFB: <span style="color:' + colorFor(ratings.ttfb.rating) + ';">' + (ratings.ttfb.value ? ratings.ttfb.value + 'ms' : 'measuring…') + '</span></div>',
                '  <div>INP: <span style="color:' + colorFor(ratings.inp.rating) + ';">' + (ratings.inp.value ? ratings.inp.value + 'ms' : 'idle') + '</span></div>',
                '  <div>FID: <span style="color:' + colorFor(ratings.fid.rating) + ';">' + (ratings.fid.value ? ratings.fid.value + 'ms' : 'waiting') + '</span></div>',
                '</div>',
                '<div style="margin-top: 10px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 10px; color: #64748b; display: flex; justify-content: space-between;">',
                '  <span>Net: ' + (metrics.connection.effectiveType || '4g').toUpperCase() + '</span>',
                '  <span>RTT: ' + metrics.connection.rtt + 'ms</span>',
                '</div>'
            ].join('\n');

            document.body.appendChild(hud);
            document.getElementById('rum-hud-close').onclick = function () {
                hud.remove();
            };
        }
    };

    // Auto-init in browser
    if (typeof window !== 'undefined') {
        initObservers();
        // Keyboard shortcut: Ctrl+Shift+U or Alt+Shift+U to toggle RUM HUD
        window.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'U' || e.key === 'u')) {
                api.renderHUD();
            }
        });
        // Dispatch ready event
        try {
            window.dispatchEvent(new CustomEvent('stemos:rum-ready', { detail: { session: metrics.sessionId } }));
        } catch (e) {}
    }

    return api;
}));
