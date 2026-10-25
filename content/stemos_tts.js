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

  const PLACEMENT_STATIC_AUDIO = {
    [normalizeKey("Good morning, my name is Robert. My employee badge number is 4-2-9-0.")]: '/content/audio/pt-l01.mp3',
    [normalizeKey("Attention all operators. The cafeteria will be closed for cleaning from two o'clock to three o'clock this afternoon.")]: '/content/audio/pt-l02.mp3',
    [normalizeKey("Please place the calibrated torque wrench in Cabinet B on the top shelf.")]: '/content/audio/pt-l03.mp3',
    [normalizeKey("Station four experienced twenty minutes of unexpected downtime yesterday because an optical sensor became loose.")]: '/content/audio/pt-l04.mp3',
    [normalizeKey("The delivery of raw stainless steel brackets was rescheduled from Monday morning to Wednesday afternoon.")]: '/content/audio/pt-l05.mp3',
    [normalizeKey("The pneumatic clamp cylinder is leaking compressed air behind the manifold. We must shut the air valve before replacing the seal.")]: '/content/audio/pt-l06.mp3',
    [normalizeKey("If the hole diameter exceeds zero point zero five millimeters from the CAD specification, the automated robot will segregate the part into the red quarantine bin.")]: '/content/audio/pt-l07.mp3',
    [normalizeKey("I understand your concern about delivery lead times; however, switching to an unverified local vendor poses a significant quality risk.")]: '/content/audio/pt-l08.mp3',
    [normalizeKey("We are running short on time during this engineering review. Let's table the discussion regarding the secondary filtration bracket until Friday's morning sync.")]: '/content/audio/pt-l09.mp3',
    [normalizeKey("Our containment action was fully effective: all fifteen hundred finished subassemblies in transit were placed on electronic hold in warehouse quarantine, confirming zero defect escapes to the customer.")]: '/content/audio/pt-l10.mp3',
    [normalizeKey("Welcome to stemOS. Audio check complete. Your speakers and speech synthesis are working perfectly.")]: '/content/audio/pt-test-audio.mp3'
  };

  // stemOS MCER Tracks Static Audio Map (Piper Neural High-Fidelity Pre-Rendered Offline Assets)
  const MCER_STATIC_AUDIO = {
    // Dialogue lines
    [normalizeKey("Good morning! Welcome to the team. Are you Alex Rivera?")]: '/content/audio/mcer/a1-u1-d1.mp3',
    [normalizeKey("Good morning, Mark. Yes, I am. It is a pleasure to meet you in person.")]: '/content/audio/mcer/a1-u1-d2.mp3',
    [normalizeKey("It is great to meet you too, Alex. How do you spell your last name?")]: '/content/audio/mcer/a1-u1-d3.mp3',
    [normalizeKey("It is R-I-V-E-R-A. Rivera. What is your email address?")]: '/content/audio/mcer/a1-u1-d4.mp3',
    [normalizeKey("My email is mark@stemos.org. Welcome aboard!")]: '/content/audio/mcer/a1-u1-d5.mp3',
    [normalizeKey("Thank you, Mark. I am very happy to be here.")]: '/content/audio/mcer/a1-u1-d6.mp3',
    [normalizeKey("Good morning! Welcome to the team. Are you Alex Rivera? Good morning, Mark. Yes, I am. It is a pleasure to meet you in person. It is great to meet you too, Alex. How do you spell your last name? It is R-I-V-E-R-A. Rivera. What is your email address? My email is mark@stemos.org. Welcome aboard! Thank you, Mark. I am very happy to be here.")]: '/content/audio/mcer/a1-u1-dialogue-full.mp3',
    [normalizeKey("Mark says: Good morning! Welcome to the team. Are you Alex Rivera?. Alex says: Good morning, Mark. Yes, I am. It is a pleasure to meet you in person.. Mark says: It is great to meet you too, Alex. How do you spell your last name?. Alex says: It is R-I-V-E-R-A. Rivera. What is your email address?. Mark says: My email is mark@stemos.org. Welcome aboard!. Alex says: Thank you, Mark. I am very happy to be here.")]: '/content/audio/mcer/a1-u1-dialogue-full.mp3',
    
    // Vocab terms + examples
    [normalizeKey("Hello")]: '/content/audio/mcer/a1-u1-vocab-hello.mp3',
    [normalizeKey("Hello. Hello! My name is Alex.")]: '/content/audio/mcer/a1-u1-vocab-hello.mp3',
    [normalizeKey("Welcome")]: '/content/audio/mcer/a1-u1-vocab-welcome.mp3',
    [normalizeKey("Welcome. Welcome to our team.")]: '/content/audio/mcer/a1-u1-vocab-welcome.mp3',
    [normalizeKey("Name")]: '/content/audio/mcer/a1-u1-vocab-name.mp3',
    [normalizeKey("Name. What is your last name?")]: '/content/audio/mcer/a1-u1-vocab-name.mp3',
    [normalizeKey("Student")]: '/content/audio/mcer/a1-u1-vocab-student.mp3',
    [normalizeKey("Student. Are you a new student here?")]: '/content/audio/mcer/a1-u1-vocab-student.mp3',
    [normalizeKey("Coworker")]: '/content/audio/mcer/a1-u1-vocab-coworker.mp3',
    [normalizeKey("Coworker. Diana is my new coworker.")]: '/content/audio/mcer/a1-u1-vocab-coworker.mp3',
    [normalizeKey("Pleasure")]: '/content/audio/mcer/a1-u1-vocab-pleasure.mp3',
    [normalizeKey("Pleasure. It is a pleasure to meet you.")]: '/content/audio/mcer/a1-u1-vocab-pleasure.mp3',
    [normalizeKey("Colleague")]: '/content/audio/mcer/a1-u1-vocab-colleague.mp3',
    [normalizeKey("Colleague. Mark is an experienced colleague.")]: '/content/audio/mcer/a1-u1-vocab-colleague.mp3',
    [normalizeKey("Morning")]: '/content/audio/mcer/a1-u1-vocab-morning.mp3',
    [normalizeKey("Morning. Good morning, everyone.")]: '/content/audio/mcer/a1-u1-vocab-morning.mp3',

    // Listening Lab & Reading
    [normalizeKey("Good morning. All incoming engineering interns must step to Window 2. Please state your full legal name, spelling your last name clearly, and provide your university affiliate identification number. Remember that visitor badges are temporary and expire daily at seventeen hundred hours.")]: '/content/audio/mcer/a1-u1-listening-lab.mp3',
    [normalizeKey("Welcome to Northern Tech Manufacturing Facility. All incoming engineering interns must complete their security credential verification by 08:30 AM on Day One. Please bring your official university credentials and emergency contact sheet to Human Resources on the second floor, Room 210. Assigned equipment lockers are located in Corridor B. Personal cell phones must remain inside your locker during active machine operations.")]: '/content/audio/mcer/a1-u1-reading-passage.mp3',
    
    // Plant Crucible Model
    [normalizeKey("Good morning. My name is Alex Rivera, employee number 84029. I am the new mechatronics intern assigned to Sub-Assembly Line 3 under shift supervisor Mark Reynolds.")]: '/content/audio/mcer/a1-u1-crucible-model.mp3',

    // Unit 2 Assets
    [normalizeKey("Good morning, team. Today we review equipment safety procedures on the shop floor.")]: '/content/audio/mcer/a1-u2-d1.mp3',
    [normalizeKey("Understood, Steve. I have inspected my personal protective equipment.")]: '/content/audio/mcer/a1-u2-d2.mp3',
    [normalizeKey("Good morning, team. Today we review equipment safety procedures on the shop floor. Understood, Steve. I have inspected my personal protective equipment.")]: '/content/audio/mcer/a1-u2-dialogue-full.mp3',
    [normalizeKey("Safety. Safety is our top operational priority.")]: '/content/audio/mcer/a1-u2-vocab-safety.mp3',
    [normalizeKey("Inspection. Daily machine inspection begins at seven AM.")]: '/content/audio/mcer/a1-u2-vocab-inspection.mp3',
    [normalizeKey("Attention technicians. Line 2 conveyor speed is calibrated at point five meters per second. Maintain safe distance.")]: '/content/audio/mcer/a1-u2-listening-lab.mp3'
  };

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
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Aaron') || v.name.includes('Daniel') || v.name.includes('Jenny') || v.name.includes('Ava') || v.name.includes('Guy'))
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

    // 1b. Check pre-rendered Placement Test US Neural Audio
    if (PLACEMENT_STATIC_AUDIO[normKey]) {
      playAudioUrl(PLACEMENT_STATIC_AUDIO[normKey], sessionId, { ...options, rawText: cleaned });
      return;
    }

    // 1c. Check pre-rendered stemOS MCER Track Audio (Zero-latency Piper/Neural static assets)
    if (MCER_STATIC_AUDIO[normKey]) {
      playAudioUrl(MCER_STATIC_AUDIO[normKey], sessionId, { ...options, rawText: cleaned });
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
    version: '1.3.0',
    engine: 'Piper Neural (Mini PC Edge) + Web Speech API Fallback',
    cleanText: cleanText,
    speak: speak,
    stop: stop,
    isPlaying: () => isPlaying,
    MCER_STATIC_AUDIO: MCER_STATIC_AUDIO,
    getMcerAudioList: () => Array.from(new Set(Object.values(MCER_STATIC_AUDIO))),
    clearCache: () => {
      audioBlobCache.forEach(url => URL.revokeObjectURL(url));
      audioBlobCache.clear();
    }
  };
}));
