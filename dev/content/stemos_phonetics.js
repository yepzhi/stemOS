/**
 * stemOS Acoustic Phonetics & Multi-Dialect Pronunciation Trainer Engine
 * Phase 87 — Web Audio API Real-Time FFT Formant, Pitch & Syllable Stress Analyzer
 * Dialects: US General American, US-Mexico Border Tech, British Aerospace, German Industrial Tech.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.STEMOS_PHONETICS = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    var DIALECT_PRESETS = {
        'us_general': {
            id: 'us_general',
            name: 'General American (Midwest / Silicon Valley)',
            rhoticity: 'fully-rhotic',
            vowelFlap: true,
            pitchAnchorHz: 120, // default male/female normalized mid
            targetFormants: {
                // F1 (openness Hz), F2 (frontness Hz)
                'iy': [280, 2250], // fleece
                'ih': [400, 1900], // kit
                'eh': [550, 1750], // dress
                'ae': [690, 1660], // trap
                'aa': [710, 1100], // lot / father
                'uw': [310, 870],  // goose
                'er': [490, 1350]  // nurse (rhotic retroflex)
            }
        },
        'us_texas_border': {
            id: 'us_texas_border',
            name: 'Nearshore Border Tech (Texas / Monterrey / Cd. Juárez)',
            rhoticity: 'rhotic',
            vowelFlap: false,
            pitchAnchorHz: 130,
            targetFormants: {
                'iy': [290, 2200],
                'ih': [420, 1850],
                'eh': [530, 1700],
                'ae': [680, 1620],
                'aa': [730, 1150],
                'uw': [320, 910],
                'er': [510, 1320]
            }
        },
        'uk_rp': {
            id: 'uk_rp',
            name: 'British RP / Aerospace (Cambridge / Bristol)',
            rhoticity: 'non-rhotic',
            vowelFlap: false,
            pitchAnchorHz: 125,
            targetFormants: {
                'iy': [275, 2300],
                'ih': [390, 1950],
                'eh': [560, 1800],
                'ae': [660, 1720],
                'aa': [680, 1050],
                'uw': [300, 950],
                'er': [520, 1400]
            }
        },
        'de_tech': {
            id: 'de_tech',
            name: 'German Industrial Tech (Munich / Silicon Saxony)',
            rhoticity: 'uvular-rhotic',
            vowelFlap: false,
            pitchAnchorHz: 115,
            targetFormants: {
                'iy': [285, 2220],
                'ih': [410, 1880],
                'eh': [540, 1730],
                'ae': [670, 1650],
                'aa': [720, 1080],
                'uw': [315, 890],
                'er': [500, 1360]
            }
        }
    };

    var activeDialectId = 'us_general';
    var audioCtx = null;
    var analyserNode = null;
    var isAnalyzing = false;

    // Autocorrelation Pitch Detector (YIN-like simplified normalized autocorrelation)
    function detectPitch(floatBuffer, sampleRate) {
        var SIZE = floatBuffer.length;
        var MAX_SAMPLES = Math.floor(SIZE / 2);
        var bestOffset = -1;
        var bestCorrelation = 0;
        var rms = 0;

        for (var i = 0; i < SIZE; i++) {
            var val = floatBuffer[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) return { pitch: 0, rms: rms }; // Silence/noise floor

        // Speech fundamental frequency range: 60 Hz to 600 Hz
        var minOffset = Math.max(1, Math.floor(sampleRate / 600));
        var maxOffset = Math.min(MAX_SAMPLES, Math.floor(sampleRate / 60));

        var correlations = new Float32Array(maxOffset + 2);
        for (var offset = minOffset; offset <= maxOffset; offset++) {
            var diffSum = 0;
            for (var j = 0; j < MAX_SAMPLES; j++) {
                diffSum += Math.abs(floatBuffer[j] - floatBuffer[j + offset]);
            }
            correlations[offset] = 1 - (diffSum / MAX_SAMPLES);
        }

        // Find the FIRST local peak above 0.8 to capture true fundamental period T0
        for (var off = minOffset + 1; off < maxOffset; off++) {
            var curr = correlations[off];
            var prev = correlations[off - 1];
            var next = correlations[off + 1];
            if (curr > 0.75 && curr >= prev && curr >= next) {
                bestOffset = off;
                bestCorrelation = curr;
                break;
            }
        }

        // Fallback to highest correlation if no sharp local peak found above 0.75
        if (bestOffset < 0) {
            for (var off2 = minOffset; off2 <= maxOffset; off2++) {
                if (correlations[off2] > bestCorrelation && correlations[off2] > 0.6) {
                    bestCorrelation = correlations[off2];
                    bestOffset = off2;
                }
            }
        }

        if (bestCorrelation > 0.6 && bestOffset > 0) {
            var fundamentalFreq = sampleRate / bestOffset;
            return { pitch: Math.round(fundamentalFreq), rms: Number(rms.toFixed(4)), correlation: Number(bestCorrelation.toFixed(3)) };
        }
        return { pitch: 0, rms: Number(rms.toFixed(4)), correlation: 0 };
    }

    // Peak Picker for Formant Detection from Frequency Magnitude Spectrum
    function extractFormants(freqData, sampleRate, fftSize) {
        var binResolution = (sampleRate / 2) / (freqData.length);
        var peaks = [];

        // Scan between 200 Hz and 3200 Hz (speech vowel formant zone)
        var minBin = Math.floor(200 / binResolution);
        var maxBin = Math.floor(3200 / binResolution);

        for (var i = minBin + 1; i < maxBin - 1; i++) {
            var prev = freqData[i - 1];
            var curr = freqData[i];
            var next = freqData[i + 1];
            if (curr > prev && curr > next && curr > 100) { // threshold 100/255
                var hz = Math.round(i * binResolution);
                peaks.push({ freq: hz, power: curr });
            }
        }

        peaks.sort(function (a, b) { return b.power - a.power; });
        var topPeaks = peaks.slice(0, 4).sort(function (a, b) { return a.freq - b.freq; });

        return {
            f1: topPeaks[0] ? topPeaks[0].freq : 0,
            f2: topPeaks[1] ? topPeaks[1].freq : 0,
            peaks: topPeaks
        };
    }

    // Pronunciation accuracy matcher comparing acoustic parameters
    function scoreUtterance(recordedData, targetVowelKey, dialectId) {
        var dialect = DIALECT_PRESETS[dialectId || activeDialectId] || DIALECT_PRESETS['us_general'];
        var targetFormants = dialect.targetFormants[targetVowelKey] || [500, 1700];
        var targetF1 = targetFormants[0];
        var targetF2 = targetFormants[1];

        var recF1 = recordedData.f1 || targetF1;
        var recF2 = recordedData.f2 || targetF2;

        // Euclidean distance in formant space normalized
        var deltaF1 = Math.abs(recF1 - targetF1) / targetF1;
        var deltaF2 = Math.abs(recF2 - targetF2) / targetF2;
        var formantError = (deltaF1 * 0.5) + (deltaF2 * 0.5);

        var accuracy = Math.max(0, Math.min(100, Math.round((1 - formantError) * 100)));
        var rating = 'Excellent';
        if (accuracy < 60) rating = 'Needs Practice';
        else if (accuracy < 80) rating = 'Good';

        return {
            score: accuracy,
            rating: rating,
            dialect: dialect.name,
            targetFormants: { f1: targetF1, f2: targetF2 },
            measuredFormants: { f1: recF1, f2: recF2 },
            pitchHz: recordedData.pitch || dialect.pitchAnchorHz
        };
    }

    var api = {
        version: '1.0.0-phase87',

        getDialects: function () {
            return Object.keys(DIALECT_PRESETS).map(function (k) {
                return DIALECT_PRESETS[k];
            });
        },

        getActiveDialect: function () {
            return DIALECT_PRESETS[activeDialectId];
        },

        setActiveDialect: function (id) {
            if (DIALECT_PRESETS[id]) {
                activeDialectId = id;
                return true;
            }
            return false;
        },

        detectPitchFromBuffer: detectPitch,
        extractFormantsFromSpectrum: extractFormants,
        scorePronunciation: scoreUtterance,

        // Real-Time Web Audio Analyzer Setup
        startLiveAnalysis: function (mediaStream, onFrameCallback) {
            if (typeof window === 'undefined') return;
            var AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;

            audioCtx = new AudioContextClass();
            var source = audioCtx.createMediaStreamSource(mediaStream);
            analyserNode = audioCtx.createAnalyser();
            analyserNode.fftSize = 2048;
            analyserNode.smoothingTimeConstant = 0.8;
            source.connect(analyserNode);

            isAnalyzing = true;
            var timeBuffer = new Float32Array(analyserNode.fftSize);
            var freqBuffer = new Uint8Array(analyserNode.frequencyBinCount);

            function loop() {
                if (!isAnalyzing) return;
                analyserNode.getFloatTimeDomainData(timeBuffer);
                analyserNode.getByteFrequencyData(freqBuffer);

                var pitchResult = detectPitch(timeBuffer, audioCtx.sampleRate);
                var formantsResult = extractFormants(freqBuffer, audioCtx.sampleRate, analyserNode.fftSize);

                if (typeof onFrameCallback === 'function') {
                    onFrameCallback({
                        pitch: pitchResult.pitch,
                        rms: pitchResult.rms,
                        f1: formantsResult.f1,
                        f2: formantsResult.f2,
                        correlation: pitchResult.correlation
                    });
                }
                requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop);
        },

        stopLiveAnalysis: function () {
            isAnalyzing = false;
            if (audioCtx && audioCtx.state !== 'closed') {
                try {
                    audioCtx.close();
                } catch (e) {}
            }
        }
    };

    return api;
}));
