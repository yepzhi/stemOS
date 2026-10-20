/**
 * stemOS Universal Neural TTS Engine (Piper Mini PC & Web Speech API)
 * ═════════════════════════════════════════════════════════════════════
 * Architectural Invariant:
 * 1. Primary: High-fidelity Neural Piper TTS hosted on campus Mini PC
 *    Edge Gateway (/api/tts or configured PIPER_TTS_ENDPOINT).
 * 2. Static Pre-Rendered Neural Audio: Instant playback for hero
 *    Cleanroom ISO Class 1 photolithography protocols.
 * 3. Fallback: Native browser Web Speech API (en-US, Samantha / Google US)
 *    if Mini PC edge server is offline, busy, or unreachable.
 * 4. Zero-Latency Memory Cache: Reused audio blobs are cached in memory.
 * ═════════════════════════════════════════════════════════════════════
 */
(function (root, factory) {
  const result = factory();
  if (typeof define === 'function' && define.amd) {
    define([], () => result);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = result;
  }
  if (typeof root !== 'undefined') {
    root.STEMOS_TTS = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_TTS = result;

    // Bind convenience helpers for stemOS Studio components
    window.speakEnglishText = function (text, rate, onEnd) {
      result.speak(text, { speed: rate || 0.93, lang: 'en-US', onEnd: onEnd });
    };
    window.stopEnglishSpeech = function () {
      result.stop();
    };
    window.speakText = function (text, lang) {
      result.speak(text, { lang: lang || 'en-US', speed: 0.93 });
    };
    window.stopSpeech = function () {
      result.stop();
    };

    // Safe interception for legacy window.speechSynthesis.speak callers in Studio
    if ('speechSynthesis' in window && !window.__STEMOS_SPEECH_INTERCEPTED__) {
      window.__STEMOS_SPEECH_INTERCEPTED__ = true;
      const originalSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
      const originalCancel = window.speechSynthesis.cancel.bind(window.speechSynthesis);
      window.STEMOS_NATIVE_SPEAK = originalSpeak;
      window.STEMOS_NATIVE_CANCEL = originalCancel;

      window.speechSynthesis.speak = function (utterance) {
        if (!utterance) return;
        if (utterance._isNativeFallback) {
          return originalSpeak(utterance);
        }
        result.speak(utterance.text, {
          speed: utterance.rate || 0.93,
          lang: utterance.lang || 'en-US',
          onStart: () => {
            if (typeof utterance.onstart === 'function') utterance.onstart();
          },
          onEnd: () => {
            if (typeof utterance.onend === 'function') utterance.onend();
          },
          onError: (err) => {
            if (typeof utterance.onerror === 'function') utterance.onerror(err);
          }
        });
      };

      window.speechSynthesis.cancel = function () {
        result.stop();
        originalCancel();
      };
    }
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Config & State
  const audioBlobCache = new Map();
  let currentAudio = null;
  let currentSessionId = 0;
  let isPlaying = false;
  let isPiperActive = true;

  // Static pre-rendered cleanroom audio for instantaneous zero-latency playback (Piper Neural Lessac High)
  const STATIC_AUDIO_MAP = {
    cleanroom_photolithography_b1: '/content/audio/cleanroom_photolithography.wav?v=2.1.0-piper-neural',
    cleanroom_basic_a2: '/content/audio/cleanroom_basic_a2.wav?v=2.1.0-piper-neural'
  };

  function normalizeKey(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  const CLEANROOM_B1_KEY = normalizeKey(
    "In extreme ultraviolet (EUV) photolithography, wafer steppers operate inside ISO Class 1 cleanrooms with laminar airflow. Photoresist deposition requires precise chemical handling to prevent sub-micron yield defects."
  );
  const CLEANROOM_B1_ALT_KEY = normalizeKey(
    "In extreme ultraviolet photolithography, wafer steppers operate inside ISO Class 1 cleanrooms with laminar airflow. Photoresist deposition requires precise chemical handling to prevent sub-micron yield defects."
  );
  const CLEANROOM_A2_KEY = normalizeKey(
    "In computer chip factories, workers wear white cleanroom suits. They keep the air pure so microchips do not have dust damage. Silicon wafers are washed with special chemical liquids."
  );

  function cleanText(text) {
    if (!text) return '';
    return text
      .replace(/\[\w+\]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/<[^>]*>?/gm, '')
      .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
      .replace(/&mdash;/g, ' - ')
      .replace(/#{1,6}\s+/g, '')
      .trim();
  }

  function getMiniPCEndpoint() {
    if (typeof window !== 'undefined') {
      if (window.PIPER_TTS_ENDPOINT) return window.PIPER_TTS_ENDPOINT;
      try {
        const stored = localStorage.getItem('stemos_minipc_tts_url');
        if (stored) return stored;
      } catch (_) {}
      return '/api/tts';
    }
    return 'http://127.0.0.1:8080/api/tts';
  }

  function stop() {
    currentSessionId++;
    isPlaying = false;
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.src = '';
      } catch (_) {}
      currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.STEMOS_NATIVE_CANCEL) {
          window.STEMOS_NATIVE_CANCEL();
        } else {
          window.speechSynthesis.cancel();
        }
      } catch (_) {}
    }
  }

  /**
   * Speak using Native Web Speech API (Default Fallback)
   */
  function speakSystemDefault(text, options = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (options.onEnd) options.onEnd();
      return;
    }
    try {
      if (window.STEMOS_NATIVE_CANCEL) {
        window.STEMOS_NATIVE_CANCEL();
      } else {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance._isNativeFallback = true;
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.speed || 0.93;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      const bestVoice = voices.find(v => 
        (v.lang && (v.lang.startsWith('en') || v.lang === 'en-US')) &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Aaron') || v.name.includes('Daniel') || v.name.includes('Jenny') || v.name.includes('Ava'))
      );
      if (bestVoice) utterance.voice = bestVoice;

      utterance.onstart = () => {
        isPlaying = true;
        if (options.onStart) options.onStart();
      };
      utterance.onend = () => {
        isPlaying = false;
        if (options.onEnd) options.onEnd();
      };
      utterance.onerror = (e) => {
        isPlaying = false;
        if (options.onError) options.onError(e);
        else if (options.onEnd) options.onEnd();
      };

      if (window.STEMOS_NATIVE_SPEAK) {
        window.STEMOS_NATIVE_SPEAK(utterance);
      } else {
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.warn('[stemOS TTS] Web Speech fallback error:', err);
      isPlaying = false;
      if (options.onEnd) options.onEnd();
    }
  }

  /**
   * Primary entry point: Piper Neural TTS on Mini PC with automatic fallback
   */
  async function speak(text, options = {}) {
    const cleaned = cleanText(text);
    if (!cleaned) return;

    stop();
    const sessionId = currentSessionId;
    const speed = options.speed || 0.93;
    const lang = options.lang || 'en-US';
    const voice = options.voice || 'en_US-lessac-medium';
    const normKey = normalizeKey(cleaned);

    // 1. Check static pre-rendered cleanroom audio (Photolithography ISO Class 1)
    if (normKey === CLEANROOM_B1_KEY || normKey === CLEANROOM_B1_ALT_KEY) {
      playAudioUrl(STATIC_AUDIO_MAP.cleanroom_photolithography_b1, sessionId, { ...options, rawText: cleaned });
      return;
    }
    if (normKey === CLEANROOM_A2_KEY) {
      playAudioUrl(STATIC_AUDIO_MAP.cleanroom_basic_a2, sessionId, { ...options, rawText: cleaned });
      return;
    }

    // 2. Check in-memory audio blob cache for instant replay
    const cacheKey = `${voice}_${speed}_${cleaned}`;
    if (audioBlobCache.has(cacheKey)) {
      try {
        const cachedUrl = audioBlobCache.get(cacheKey);
        playAudioUrl(cachedUrl, sessionId, { ...options, rawText: cleaned });
        return;
      } catch (_) {}
    }

    // 3. Attempt Piper Neural TTS from Mini PC Edge Gateway (/api/tts)
    if (isPiperActive && typeof fetch === 'function') {
      try {
        const controller = new AbortController();
        // Fast 2.5s timeout before falling back to system default voice
        const timeout = setTimeout(() => controller.abort(), 2500);

        const endpoint = getMiniPCEndpoint();
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'audio/wav, audio/mpeg, audio/*'
          },
          body: JSON.stringify({
            input: cleaned,
            text: cleaned,
            model: 'piper-neural',
            voice: voice,
            speed: speed,
            lang: lang
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('audio') || contentType.includes('octet-stream')) {
            const blob = await response.blob();
            if (blob && blob.size > 256) {
              if (sessionId !== currentSessionId) return; // Stale session
              const audioUrl = URL.createObjectURL(blob);
              audioBlobCache.set(cacheKey, audioUrl);
              playAudioUrl(audioUrl, sessionId, { ...options, rawText: cleaned });
              return;
            }
          }
        }
      } catch (err) {
        // Fall through to system default voice
      }
    }

    // 4. Fallback to Native Web Speech API Default
    if (sessionId === currentSessionId) {
      speakSystemDefault(cleaned, options);
    }
  }

  function playAudioUrl(url, sessionId, options = {}) {
    const audio = new Audio(url);
    currentAudio = audio;

    audio.onplay = () => {
      if (sessionId !== currentSessionId) {
        audio.pause();
        return;
      }
      isPlaying = true;
      if (options.onStart) options.onStart();
    };

    audio.onended = () => {
      if (sessionId !== currentSessionId) return;
      isPlaying = false;
      currentAudio = null;
      if (options.onEnd) options.onEnd();
    };

    audio.onerror = (e) => {
      console.warn('[stemOS TTS] Audio play error, falling down to default voice:', e);
      if (sessionId !== currentSessionId) return;
      currentAudio = null;
      speakSystemDefault(options.rawText || '', options);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('[stemOS TTS] Audio play promise rejected, falling down to default voice:', err);
        if (sessionId === currentSessionId) {
          currentAudio = null;
          speakSystemDefault(options.rawText || '', options);
        }
      });
    }
  }

  return {
    version: '1.2.0',
    engine: 'Piper Neural (Mini PC Edge) + Web Speech API Fallback',
    cleanText: cleanText,
    speak: speak,
    stop: stop,
    isPlaying: () => isPlaying,
    clearCache: () => {
      audioBlobCache.forEach(url => URL.revokeObjectURL(url));
      audioBlobCache.clear();
    }
  };
}));
