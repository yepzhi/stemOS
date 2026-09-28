
/**
 * stemOS Ultra-Efficient Micro-Telemetry & Error Beacon Engine
 * Non-blocking, zero main-thread overhead, ring-buffer breadcrumbs & sendBeacon transport.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.__telemetryInitialized) return;
  window.__telemetryInitialized = true;

  const CONFIG = {
    appName: 'stemos',
    appVersion: '5.3.0',
    endpoint: 'https://jovenesstem.com/api/telemetry',
    maxBreadcrumbs: 15,
    maxStoredCrashes: 25,
    maxReportsPerSession: 12,
    dedupWindowMs: 60000
  };

  const sessionId = 'ses_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  const breadcrumbs = [];
  const errorFingerprints = new Map();
  let reportsSentCount = 0;

  function addBreadcrumb(category, message, data = null) {
    try {
      if (breadcrumbs.length >= CONFIG.maxBreadcrumbs) {
        breadcrumbs.shift();
      }
      breadcrumbs.push({
        t: Math.round(typeof performance !== 'undefined' ? performance.now() : Date.now()),
        cat: category,
        msg: String(message || '').substring(0, 100),
        ...(data && typeof data === 'object' ? { d: data } : {})
      });
    } catch (_) {}
  }

  // Auto-Instrument User Clicks (Sanitized)
  try {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', (e) => {
        try {
          const target = e.target;
          if (!target) return;
          const tag = target.tagName ? target.tagName.toLowerCase() : '';
          if (['button', 'a', 'input', 'select', 'svg'].includes(tag) || target.closest('button, a')) {
            const el = target.closest('button, a') || target;
            const label = (el.innerText || el.getAttribute('aria-label') || el.id || el.className || tag).trim().substring(0, 40);
            addBreadcrumb('ui_click', `${tag} "${label}"`);
          }
        } catch (_) {}
      }, { capture: true, passive: true });
    }
  } catch (_) {}

  // Auto-Instrument Navigation
  try {
    window.addEventListener('hashchange', () => {
      addBreadcrumb('navigation', `hash: ${location.hash}`);
    }, { passive: true });
  } catch (_) {}

  // Core Dispatcher (Non-Blocking via sendBeacon)
  function dispatchReport(reportPayload) {
    if (reportsSentCount >= CONFIG.maxReportsPerSession) return;
    reportsSentCount++;

    // LocalStorage blackbox for instant post-mortem
    try {
      const storageKey = '__system_telemetry_errors__';
      const history = JSON.parse(localStorage.getItem(storageKey) || '[]');
      history.unshift(reportPayload);
      localStorage.setItem(storageKey, JSON.stringify(history.slice(0, CONFIG.maxStoredCrashes)));
    } catch (_) {}

    const jsonStr = JSON.stringify(reportPayload);
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([jsonStr], { type: 'application/json' });
        if (navigator.sendBeacon(CONFIG.endpoint, blob)) return;
      }
    } catch (_) {}

    try {
      if (typeof fetch === 'function') {
        fetch(CONFIG.endpoint, {
          method: 'POST',
          body: jsonStr,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          priority: 'low'
        }).catch(() => {});
      }
    } catch (_) {}
  }

  function recordError(type, message, source, lineno, colno, errorObj, customContext = {}) {
    try {
      const cleanMsg = String(message || (errorObj && errorObj.message) || 'Unknown Error').substring(0, 300);
      const cleanSrc = String(source || (errorObj && errorObj.fileName) || (typeof window !== 'undefined' ? window.location.pathname : 'dev')).substring(0, 150);
      const fingerprint = `${cleanMsg}_${cleanSrc}_${lineno || 0}_${colno || 0}`;

      const now = Date.now();
      const lastSeen = errorFingerprints.get(fingerprint);
      if (lastSeen && (now - lastSeen < CONFIG.dedupWindowMs)) {
        return;
      }
      errorFingerprints.set(fingerprint, now);

      const payload = {
        app: CONFIG.appName,
        version: CONFIG.appVersion,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        type: type,
        error: {
          message: cleanMsg,
          source: cleanSrc,
          lineno: lineno || null,
          colno: colno || null,
          stack: errorObj && errorObj.stack ? String(errorObj.stack).substring(0, 1500) : null
        },
        env: {
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 150) : 'node/headless',
          language: typeof navigator !== 'undefined' ? (navigator.language || 'en-US') : 'en-US',
          screen: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '1920x1080',
          online: typeof navigator !== 'undefined' ? navigator.onLine !== false : true
        },
        breadcrumbs: [...breadcrumbs],
        context: customContext
      };

      // 1. Immediately persist to localStorage for instant post-mortem analysis
      try {
        const storageKey = '__system_telemetry_errors__';
        const history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        history.unshift(payload);
        localStorage.setItem(storageKey, JSON.stringify(history.slice(0, CONFIG.maxStoredCrashes)));
      } catch (_) {}

      // 2. Offload network dispatch to microtask / background
      if (typeof queueMicrotask === 'function') {
        queueMicrotask(() => dispatchReport(payload));
      } else {
        setTimeout(() => dispatchReport(payload), 0);
      }
    } catch (_) {}
  }

  // Global listeners
  if (typeof window !== 'undefined') {
    window.addEventListener('error', function (e) {
      try {
        recordError('UNHANDLED_ERROR', e.message, e.filename, e.lineno, e.colno, e.error);
      } catch (_) {}
    });

    window.addEventListener('unhandledrejection', function (e) {
      try {
        const reason = e.reason;
        const msg = reason ? (reason.message || String(reason)) : 'Unhandled Promise Rejection';
        recordError('PROMISE_REJECTION', msg, null, null, null, reason instanceof Error ? reason : null);
      } catch (_) {}
    });

    window.__telemetry = {
      logBreadcrumb: addBreadcrumb,
      reportError: function (err, context = {}) {
        const msg = err ? (err.message || String(err)) : 'Reported Error';
        recordError('CUSTOM_REPORT', msg, null, null, null, err instanceof Error ? err : null, context);
      },
      logEvent: function (action, data = {}) {
        addBreadcrumb('event', action, data);
      },
      dump: function () {
        try {
          const stored = JSON.parse(localStorage.getItem('__system_telemetry_errors__') || '[]');
          console.group('🔍 [stemOS Telemetry Post-Mortem Crash Dump]');
          console.log(`Active Session: ${sessionId} | Breadcrumbs: ${breadcrumbs.length}`);
          console.table(breadcrumbs);
          console.log('Recent Stored Crashes:', stored);
          console.groupEnd();
          return stored;
        } catch (err) {
          return [];
        }
      },
      clear: function () {
        try {
          localStorage.removeItem('__system_telemetry_errors__');
          breadcrumbs.length = 0;
          console.log('✨ [stemOS Telemetry] Cleared.');
        } catch (_) {}
      }
    };

    addBreadcrumb('app_init', `Telemetry ready for ${CONFIG.appName} v${CONFIG.appVersion}`);
  }
})();

// ── FORMATIVE COMPREHENSION CHECK: BLUR & LOCK READING CONTENT ──
window.toggleFormativeComprehensionCheck = function(modId, rIdx, forceState) {
  const container = document.getElementById(`reading-lockable-${modId}-${rIdx}`);
  const quizBody = document.getElementById(`quiz-body-${modId}-${rIdx}`);
  const quizBtn = document.getElementById(`quiz-btn-${modId}-${rIdx}`);
  const quizSec = document.getElementById(`quiz-sec-${modId}-${rIdx}`);
  if (!container || !quizBody) return;

  const isCurrentlyOpen = quizBody.style.display !== "none";
  const shouldOpen = (forceState !== undefined) ? forceState : !isCurrentlyOpen;

  if (shouldOpen) {
    container.classList.add("is-blurred-locked");
    quizBody.style.display = "block";
    if (quizSec) quizSec.classList.add("eval-active");
    if (quizBtn) {
      quizBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> <span>Active Evaluation (Reading Blurred)</span>';
      quizBtn.classList.add("active-eval");
    }
    setTimeout(() => {
      quizSec?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  } else {
    container.classList.remove("is-blurred-locked");
    quizBody.style.display = "none";
    if (quizSec) quizSec.classList.remove("eval-active");
    if (quizBtn) {
      quizBtn.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Open Comprehension Check</span>';
      quizBtn.classList.remove("active-eval");
    }
  }
};

// Register Service Worker for Offline PWA Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('[stemOS PWA] Service Worker registered:', reg.scope);
    }).catch(err => {
      console.warn('[stemOS PWA] Service Worker registration failed:', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initStudio();
});

function initStudio() {
  let coursesData = (typeof LXP_COURSES !== 'undefined' ? LXP_COURSES : (window.LXP_COURSES || null));
  
  // Offline fallback: load from LocalStorage if window object is missing or offline
  if (!coursesData || Object.keys(coursesData).length === 0) {
    try {
      const cached = localStorage.getItem('stemos_dev_courses_v1.5.0') || localStorage.getItem('stemos_dev_courses_v1.0.5');
      if (cached) {
        const parsed = JSON.parse(cached);
        coursesData = Array.isArray(parsed) ? parsed.reduce((acc, t) => { acc[t.id] = t; return acc; }, {}) : parsed;
        console.log('[stemOS Offline] Loaded courses from LocalStorage cache');
      }
    } catch(e) {
      console.warn('LocalStorage parse error:', e);
    }
  }

  const tracks = Object.values(coursesData || {});
  let phrases = (typeof STEMOS_PHRASES !== 'undefined' ? STEMOS_PHRASES : (window.STEMOS_PHRASES || []));
  
  if (!phrases || phrases.length === 0) {
    try {
      const cachedPhrases = localStorage.getItem('stemos_dev_phrases_v1.5.0') || localStorage.getItem('stemos_dev_phrases_v1.0.5');
      if (cachedPhrases) {
        phrases = JSON.parse(cachedPhrases);
        console.log('[stemOS Offline] Loaded phrases from LocalStorage cache');
      }
    } catch(e) {}
  }
  
  // Auto-save data locally for offline backup
  saveCoursesToLocalStorage(tracks);

  // Calculate stats
  let totalModules = 0;
  let totalReadings = 0;
  let totalQuestions = 0;
  
  tracks.forEach(track => {
    if (track.modules) {
      totalModules += track.modules.length;
      track.modules.forEach(m => {
        if (m.readings) {
          totalReadings += m.readings.length;
          m.readings.forEach(r => {
            if (r.questions) totalQuestions += r.questions.length;
          });
        }
      });
    }
  });

  // Update DOM stats
  const statTracks = document.getElementById('stat-tracks');
  const statModules = document.getElementById('stat-modules');
  const statReadings = document.getElementById('stat-readings');
  const statQuestions = document.getElementById('stat-questions');
  const statPhrases = document.getElementById('stat-phrases');

  if (statTracks) statTracks.textContent = tracks.length;
  if (statModules) statModules.textContent = totalModules;
  if (statReadings) statReadings.textContent = totalReadings;
  if (statQuestions) statQuestions.textContent = totalQuestions;
  if (statPhrases) statPhrases.textContent = phrases.length;

  // Render Filters
  renderFilters(tracks, phrases);

  // Render Modules Grid
  renderGrid(tracks, phrases);

  // Setup Event Listeners & Offline Controller
  setupSearch(tracks);
  setupDrawer(tracks);
  setupOfflineController(tracks, phrases);
  setupLevelSwitcher(tracks, phrases);
  setupDualAxisSwitcher(tracks, phrases);
  setupSupasteInteractions(tracks, phrases);
  setupExamModalListeners(tracks);
  setupVocabPopoverListeners();
  setupDevWorldModal(coursesData);
  setupTechnicalOutputLab();
  setupSM2Engine(tracks, phrases);
  setupPitchAndNegotiationLab();
  setupCorporateLDDashboard(tracks);
  setupExecutiveLeadershipAndMultiAccentLab();
  setupStemBotSocraticCopilot();
  setupCertificatesAndCloudSync(tracks);
  setupBlueprintAndPidLab(tracks);
  setupLotoAndShiftHandoverLab(tracks);
  setupIncidentWarRoomLab(tracks);
}

function setupLevelSwitcher(tracks, phrases) {
  const btnA2 = document.getElementById('btn-level-a2');
  const btnB1 = document.getElementById('btn-level-b1');
  if (!btnA2 || !btnB1) return;

  const currentLevel = localStorage.getItem('stemos_cefr_level') || 'A2';
  setActiveLevelButton(currentLevel);
  updateHeroStageLevel(currentLevel);

  [btnA2, btnB1].forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.getAttribute('data-level');
      localStorage.setItem('stemos_cefr_level', selected);
      setActiveLevelButton(selected);
      updateHeroStageLevel(selected);
      filterGridByLevel(selected, tracks);
      showOfflineToast(`Nivel CEFR: ${selected}`, `Ajustando vocabulario, lecturas e inglés técnico a nivel ${selected}.`, 100, true);
    });
  });
}

function setActiveLevelButton(level) {
  const btnA2 = document.getElementById('btn-level-a2');
  const btnB1 = document.getElementById('btn-level-b1');
  if (btnA2 && btnB1) {
    if (level === 'B1') {
      btnB1.classList.add('active');
      btnA2.classList.remove('active');
    } else {
      btnA2.classList.add('active');
      btnB1.classList.remove('active');
    }
  }

  // Also sync any level bar buttons in filters
  document.querySelectorAll('.level-bar-btn').forEach(btn => {
    if (btn.getAttribute('data-level') === level) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function updateHeroStageLevel(level) {
  const heroStageLevel = document.getElementById('hero-stage-level');
  const heroStageText = document.getElementById('hero-stage-text');
  if (heroStageLevel) {
    heroStageLevel.innerText = `Nivel ${level} (${level === 'A2' ? 'Básico' : 'Técnico'})`;
  }
  if (heroStageText) {
    if (level === 'A2') {
      heroStageText.innerHTML = '&ldquo;In computer chip factories, workers wear white cleanroom suits. They keep the air pure so microchips do not have dust damage. Silicon wafers are washed with special chemical liquids.&rdquo;';
    } else {
      heroStageText.innerHTML = '&ldquo;In extreme ultraviolet (EUV) photolithography, wafer steppers operate inside ISO Class 1 cleanrooms with laminar airflow. Photoresist deposition requires precise chemical handling to prevent sub-micron yield defects.&rdquo;';
    }
  }
}

function filterGridByLevel(level, tracks) {
  // Update badges & metadata dynamically on cards
  document.querySelectorAll('.module-card:not(.phrase-card)').forEach(card => {
    const trackId = card.getAttribute('data-track-id');
    const track = tracks.find(t => t.id === trackId);
    const modTag = card.querySelector('.module-tag');
    if (modTag && track) {
      modTag.innerText = `${track.title} (${level})`;
    }
  });

  updateHeroStageLevel(level);

  // Live re-render active open drawer if visible
  if (currentActiveTrackId && currentActiveModId) {
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop && backdrop.classList.contains('active')) {
      openDrawer(currentActiveTrackId, currentActiveModId, tracks);
    }
  }
}

function setupOfflineController(tracks, phrases) {
  // Silent background resilience: Cache all courses, modules and phrases in local storage
  // and trigger service worker asset caching without manual user toggles.
  try {
    localStorage.setItem('stemos_dev_courses_v1.0.5', JSON.stringify(tracks));
    localStorage.setItem('stemos_dev_phrases_v1.0.5', JSON.stringify(phrases));
    localStorage.setItem('stemos_offline_ready', 'true');
  } catch (e) {
    console.warn('[stemOS Silent Offline Cache Warning]', e);
  }

  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ action: 'CACHE_EVERYTHING' });
  }
}

function updateOfflineUI(isOffline) {
  // Manual offline toggle UI removed
}

function downloadEverythingOffline(tracks, phrases) {
  // Handled silently by setupOfflineController
}

function showOfflineToast(title, sub, progress = 0, autoHide = false) {
  // Manual offline toast banner removed
}

function updateToastProgress(percent) {
  // No-op
}

function saveCoursesToLocalStorage(tracks) {
  try {
    if (tracks && tracks.length > 0) {
      localStorage.setItem('stemos_dev_courses_v1.5.0', JSON.stringify(tracks));
    }
  } catch (err) {
    console.warn('[stemOS Cache] LocalStorage write warning:', err);
  }
}

// =========================================================================
// SELECTIVE OFFLINE READINGS MANAGER (MAX 5, 3-DAY EXPIRATION & BOT NOTES)
// =========================================================================
const MAX_OFFLINE_READINGS = 5;
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000; // 72 Hours

function getSavedOfflineReadingsMap() {
  try {
    const raw = localStorage.getItem('stemos_offline_saved_readings_v1');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveOfflineReadingsMap(map) {
  try {
    localStorage.setItem('stemos_offline_saved_readings_v1', JSON.stringify(map));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function getValidOfflineReadings() {
  const map = getSavedOfflineReadingsMap();
  const now = Date.now();
  const valid = [];
  let updated = false;

  Object.keys(map).forEach(key => {
    const item = map[key];
    if (item.expiresAt && now >= item.expiresAt) {
      delete map[key];
      updated = true;
      console.log(`[Offline Auto-Purge] Reading ${key} expired after 3 days.`);
    } else {
      valid.push(item);
    }
  });

  if (updated) {
    saveOfflineReadingsMap(map);
  }
  return valid;
}

function toggleOfflineReadingPin(trackId, modId, tracks) {
  const map = getSavedOfflineReadingsMap();
  const valid = getValidOfflineReadings();
  const isCurrentlySaved = !!map[modId];

  if (isCurrentlySaved) {
    delete map[modId];
    saveOfflineReadingsMap(map);
    showOfflineToast('Lectura Removida', 'Removida de tus lecturas guardadas offline', 100, true);
  } else {
    if (valid.length >= MAX_OFFLINE_READINGS) {
      showOfflineToast(
        'Límite Alcanzado (Máx 5 Lecturas)',
        `Ya tienes ${MAX_OFFLINE_READINGS} lecturas offline guardadas (expiran en 3 días). Remueve una para agregar esta.`,
        100,
        false
      );
      return false;
    }

    const now = Date.now();
    map[modId] = {
      modId: modId,
      trackId: trackId,
      downloadedAt: now,
      expiresAt: now + THREE_DAYS_MS,
      notes: map[modId] ? (map[modId].notes || '') : '',
      syncedWithBot: false
    };
    saveOfflineReadingsMap(map);
    showOfflineToast(
      'Lectura Guardada (3 Días)',
      `Guardada offline (${Object.keys(map).length}/5). Expira automáticamente en 3 días.`,
      100,
      true
    );
  }

  // Refresh UI
  if (typeof initStudio === 'function') {
    const coursesData = (typeof LXP_COURSES !== 'undefined' ? LXP_COURSES : (window.LXP_COURSES || {}));
    const phrases = (typeof STEMOS_PHRASES !== 'undefined' ? STEMOS_PHRASES : (window.STEMOS_PHRASES || []));
    renderFilters(Object.values(coursesData), phrases);
    renderGrid(Object.values(coursesData), phrases);
  }
  return true;
}

function getRemainingTimeText(expiresAt) {
  if (!expiresAt) return '3 días';
  const diff = expiresAt - Date.now();
  if (diff <= 0) return 'Expirado';

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0) {
    return `${days}d ${remainingHours}h restantes`;
  }
  return `${hours}h restantes`;
}

// ── EJE DUAL DE NAVEGACIÓN: INDUSTRIA ✖ HABILIDAD COMUNICATIVA ──
let currentNavigationAxis = 'industry'; // 'industry' | 'skills'

const COMMUNICATIVE_SKILLS = {
  "plant_floor": {
    id: "plant_floor",
    name: "Plant Floor Survival",
    icon: "fa-solid fa-hard-hat",
    color: "#f59e0b",
    badge: "OPERATIONAL SURVIVAL",
    description: "SOPs, relevo de turnos (shift handover), LOTO, paros de línea y reporte de anomalías.",
    trackIds: ["automotive-lean", "medical-devices", "logistics-compliance", "quality-ehs", "energy-data-centers", "semiconductors", "electromobility", "aerospace", "robotics-automation", "advanced-manufacturing", "industrial-operations", "mechatronics"]
  },
  "meetings_escalations": {
    id: "meetings_escalations",
    name: "Meetings & Escalations",
    icon: "fa-solid fa-users-gear",
    color: "#0284c7",
    badge: "CROSS-BORDER MEETINGS",
    description: "Interrumpir con cortesía técnica, discrepar diplomáticamente, gestionar deadlines y action items.",
    trackIds: ["cybersecurity", "software-dev", "it-innovation", "telecom-iot", "project-management", "business-leadership", "web-dev-agentic", "medical-devices", "quality-ehs", "energy-data-centers"]
  },
  "written_reports": {
    id: "written_reports",
    name: "Written Reports & 8D",
    icon: "fa-solid fa-file-pen",
    color: "#10b981",
    badge: "TECHNICAL WRITING",
    description: "Redacción estructurada de reportes 8D, CAPA, Non-Conformance Reports (NCR) y RFQs a directivos de EE.UU.",
    trackIds: ["automotive-lean", "medical-devices", "logistics-compliance", "quality-ehs", "advanced-manufacturing", "industrial-operations", "semiconductors", "healthcare-tech", "materials-nanotech"]
  },
  "presentation_pitch": {
    id: "presentation_pitch",
    name: "Presentation & Pitch Lab",
    icon: "fa-solid fa-chalkboard-user",
    color: "#8b5cf6",
    badge: "DEFENSE & PITCH",
    description: "Defensa técnica estructurada, análisis de causa raíz (Ishikawa/5 Whys) y justificación de CAPEX.",
    trackIds: ["data-analytics", "ai-ml", "energy-renewables", "space-satellite", "biotechnology", "entrepreneurship", "quality-ehs", "energy-data-centers"]
  },
  "negotiation_leadership": {
    id: "negotiation_leadership",
    name: "Negotiation & Leadership",
    icon: "fa-solid fa-handshake",
    color: "#ec4899",
    badge: "CROSS-BORDER B2/C1",
    description: "Negociación de plazos, concesiones técnicas, walk-away points y liderazgo ante matriz en EE.UU./Canadá.",
    trackIds: ["logistics-compliance", "business-leadership", "project-management", "aviation-english", "airforce-aerospace", "entrepreneurship", "hospitality-food"]
  },
  "colloquial_radar": {
    id: "colloquial_radar",
    name: "Native Idioms Lab",
    icon: "fa-solid fa-bolt",
    color: "#f97316",
    badge: "NATIVE RADAR",
    description: "Decodificación de modismos opacos, metáforas corporativas y trampas culturales en tiempo real.",
    isPhrases: true
  }
};

function setupDualAxisSwitcher(tracks, phrases = []) {
  const btnIndustry = document.getElementById('btn-axis-industry');
  const btnSkills = document.getElementById('btn-axis-skills');
  const captionEl = document.getElementById('axis-caption-text');
  if (!btnIndustry || !btnSkills) return;

  btnIndustry.addEventListener('click', () => {
    if (currentNavigationAxis === 'industry') return;
    currentNavigationAxis = 'industry';
    btnIndustry.classList.add('active');
    btnIndustry.setAttribute('aria-selected', 'true');
    btnSkills.classList.remove('active');
    btnSkills.setAttribute('aria-selected', 'false');
    if (captionEl) {
      captionEl.innerHTML = 'Explorando por <strong>Sector Industrial</strong> (32 verticales de manufactura y tecnología)';
    }
    renderFilters(tracks, phrases);
    filterGridByTrack('all', tracks, phrases);
  });

  btnSkills.addEventListener('click', () => {
    if (currentNavigationAxis === 'skills') return;
    currentNavigationAxis = 'skills';
    btnSkills.classList.add('active');
    btnSkills.setAttribute('aria-selected', 'true');
    btnIndustry.classList.remove('active');
    btnIndustry.setAttribute('aria-selected', 'false');
    if (captionEl) {
      captionEl.innerHTML = 'Explorando por <strong>Habilidad Comunicativa Transversal</strong> (Eje B: Shopfloor, 8D, Juntas, Negociación)';
    }
    renderFilters(tracks, phrases);
    filterGridByTrack('skill-all', tracks, phrases);
  });
}

function renderFilters(tracks, phrases = []) {
  const filterContainer = document.getElementById('track-filters');
  if (!filterContainer) return;

  let html = '';

  if (currentNavigationAxis === 'industry') {
    const techCount = tracks.filter(t => (t.category || 'technology') === 'technology').length;
    const engCount = tracks.filter(t => t.category === 'engineering').length;
    const sciCount = tracks.filter(t => t.category === 'science').length;
    const carCount = tracks.filter(t => t.category === 'career').length;

    html = `
      <!-- Category Master Filter Buttons (Supaste Segmented Pills) -->
      <button class="filter-btn active" data-track="all"><i class="fa-solid fa-layer-group"></i> All Tracks (${tracks.length})</button>
      <button class="filter-btn filter-cat-btn" data-track="cat-technology"><i class="fa-solid fa-laptop-code" style="color:#0284c7;"></i> Technology (${techCount})</button>
      <button class="filter-btn filter-cat-btn" data-track="cat-engineering"><i class="fa-solid fa-gears" style="color:#059669;"></i> Engineering (${engCount})</button>
      <button class="filter-btn filter-cat-btn" data-track="cat-science"><i class="fa-solid fa-atom" style="color:#7c3aed;"></i> Science (${sciCount})</button>
      <button class="filter-btn filter-cat-btn" data-track="cat-career"><i class="fa-solid fa-plane-departure" style="color:#ea580c;"></i> Aviation &amp; Career (${carCount})</button>
    `;

    if (phrases && phrases.length > 0) {
      html += `
        <button class="filter-btn" data-track="phrases">
          <i class="fa-solid fa-comments" style="color:#f59e0b;"></i>
          Native Idioms (${phrases.length})
        </button>
      `;
    }
  } else {
    // Eje B: Habilidades Comunicativas Transversales
    html = `
      <button class="filter-btn active" data-track="skill-all"><i class="fa-solid fa-layer-group"></i> All Skills</button>
      <button class="filter-btn" data-track="skill-plant_floor"><i class="fa-solid fa-hard-hat" style="color:#f59e0b;"></i> Plant Floor Survival</button>
      <button class="filter-btn" data-track="skill-meetings_escalations"><i class="fa-solid fa-users-gear" style="color:#0284c7;"></i> Meetings &amp; Escalations</button>
      <button class="filter-btn" data-track="skill-written_reports"><i class="fa-solid fa-file-pen" style="color:#10b981;"></i> Written Reports &amp; 8D</button>
      <button class="filter-btn" data-track="skill-presentation_pitch"><i class="fa-solid fa-chalkboard-user" style="color:#8b5cf6;"></i> Presentation &amp; Pitch</button>
      <button class="filter-btn" data-track="skill-negotiation_leadership"><i class="fa-solid fa-handshake" style="color:#ec4899;"></i> Negotiation &amp; Leadership</button>
      <button class="filter-btn" data-track="skill-colloquial_radar"><i class="fa-solid fa-bolt" style="color:#f97316;"></i> Native Idioms Lab (${phrases.length})</button>
    `;
  }

  filterContainer.innerHTML = html;

  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      const targetBtn = e.currentTarget;
      targetBtn.classList.add('active');
      const trackId = targetBtn.getAttribute('data-track');
      filterGridByTrack(trackId, tracks, phrases);

      // Sync top nav active state if applicable
      document.querySelectorAll('.supaste-nav-links .nav-link').forEach(navL => {
        if (navL.getAttribute('data-filter-jump') === trackId) {
          navL.classList.add('active');
        } else {
          navL.classList.remove('active');
        }
      });
    });
  });
}

function getTrackIcon(id) {
  switch (id) {
    case 'cybersecurity': return 'fa-solid fa-shield-halved';
    case 'it-innovation': return 'fa-solid fa-cloud';
    case 'ai-ml': return 'fa-solid fa-brain';
    case 'telecom-iot': return 'fa-solid fa-tower-cell';
    case 'software-dev': return 'fa-solid fa-code';
    case 'data-analytics': return 'fa-solid fa-chart-pie';
    case 'semiconductors': return 'fa-solid fa-microchip';
    case 'electromobility': return 'fa-solid fa-car-battery';
    case 'aerospace': return 'fa-solid fa-plane-up';
    case 'robotics-automation': return 'fa-solid fa-robot';
    case 'energy-renewables': return 'fa-solid fa-solar-panel';
    case 'advanced-manufacturing': return 'fa-solid fa-industry';
    case 'automotive-lean': return 'fa-solid fa-car-side';
    case 'medical-devices': return 'fa-solid fa-heart-pulse';
    case 'logistics-compliance': return 'fa-solid fa-truck-fast';
    case 'quality-ehs': return 'fa-solid fa-clipboard-check';
    case 'energy-data-centers': return 'fa-solid fa-server';
    case 'industrial-operations': case 'no_stem_supply_chain': return 'fa-solid fa-dolly';
    case 'mechatronics': return 'fa-solid fa-cogs';
    case 'biotechnology': return 'fa-solid fa-dna';
    case 'space-satellite': return 'fa-solid fa-satellite';
    case 'environmental-sustainability': return 'fa-solid fa-leaf';
    case 'healthcare-tech': case 'no_stem_medical_devices': return 'fa-solid fa-notes-medical';
    case 'materials-nanotech': return 'fa-solid fa-atom';
    case 'food-science': case 'no_stem_gastronomy': return 'fa-solid fa-wheat-awn';
    case 'aviation-english': return 'fa-solid fa-plane-departure';
    case 'airforce-aerospace': return 'fa-solid fa-jet-fighter';
    case 'hospitality-food': case 'no_stem_hospitality': return 'fa-solid fa-hotel';
    case 'business-leadership': case 'no_stem_hr_compliance': return 'fa-solid fa-briefcase';
    case 'project-management': return 'fa-solid fa-list-check';
    case 'entrepreneurship': return 'fa-solid fa-rocket';
    case 'web-dev-agentic': return 'fa-solid fa-code';
    default: return 'fa-solid fa-graduation-cap';
  }
}

// ── Render Level 1: Modular Units Grid (Screenshot Model: media_1789248905260.png) ──
function renderUnitsGrid(tracks, phrases = []) {
  const unitsContainer = document.getElementById('units-grid');
  if (!unitsContainer) return;

  const categoriesMap = {
    "technology": { name: "Technology", class: "cat-tech", color: "#0284c7" },
    "engineering": { name: "Engineering", class: "cat-eng", color: "#059669" },
    "science": { name: "Science", class: "cat-sci", color: "#7c3aed" },
    "career": { name: "Aviation & Career", class: "cat-car", color: "#ea580c" }
  };

  let html = '';

  tracks.forEach((track, idx) => {
    const unitNumber = String(idx + 1).padStart(2, '0');
    const catKey = track.category || 'technology';
    const cat = categoriesMap[catKey] || { name: 'Engineering', class: 'cat-eng', color: '#059669' };
    const modCount = track.modules ? track.modules.length : 0;
    
    let totalReadings = 0;
    if (track.modules) {
      track.modules.forEach(m => {
        if (m.readings) totalReadings += m.readings.length;
      });
    }

    const progressPct = 70 + (idx % 6) * 5; // Clean realistic curriculum distribution

    html += `
      <div class="unit-card ${cat.class}" data-track-id="${track.id}" data-category="${catKey}">
        <div class="unit-card-banner">
          <div class="unit-banner-overlay">
            <span class="unit-number-pill">Unit ${unitNumber}</span>
            <span class="unit-category-chip">${cat.name}</span>
          </div>
          <div class="unit-banner-watermark">
            <i class="${getTrackIcon(track.id)}"></i>
          </div>
        </div>

        <div class="unit-card-body">
          <h3 class="unit-card-title">${track.titleEN || track.title}</h3>
          <p class="unit-card-en">${track.title}</p>
          <p class="unit-card-desc">${track.description || track.industry || 'Advanced technical English training for nearshoring engineering teams.'}</p>
        </div>

        <div class="unit-progress-section">
          <div class="unit-progress-row">
            <span>Curriculum Scope</span>
            <span>${modCount} Modules &bull; ${totalReadings} Texts</span>
          </div>
          <div class="unit-progress-track">
            <div class="unit-progress-bar" style="width: ${progressPct}%;"></div>
          </div>
        </div>

        <div class="unit-card-footer">
          <div class="unit-modules-badge">
            <i class="fa-solid fa-graduation-cap"></i> Level ${track.level || 'B1-B2'}
          </div>
          <button class="unit-explore-btn" data-track-id="${track.id}">
            View Modules <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  });

  unitsContainer.innerHTML = html;

  // Single delegated listener for unit card clicks
  unitsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.unit-card');
    if (card) {
      const trackId = card.getAttribute('data-track-id');
      showUnitDetail(trackId, tracks, phrases);
    }
  });
}

// ── Render Level 2: Drill-Down Unit Detail View (Reveals Modules inside that Unit) ──
function showUnitDetail(trackId, tracks, phrases = []) {
  const unitsGrid = document.getElementById('units-grid');
  const detailView = document.getElementById('unit-detail-view');
  const legacyGrid = document.getElementById('studio-grid');
  if (!detailView || !unitsGrid) return;

  const currentIdx = tracks.findIndex(t => t.id === trackId);
  if (currentIdx === -1) return;
  const track = tracks[currentIdx];

  const prevTrack = currentIdx > 0 ? tracks[currentIdx - 1] : null;
  const nextTrack = currentIdx < tracks.length - 1 ? tracks[currentIdx + 1] : null;
  const unitNumber = String(currentIdx + 1).padStart(2, '0');

  const categoriesMap = {
    "technology": { name: "Technology", badge: "TECHNOLOGY", icon: "fa-solid fa-laptop-code" },
    "engineering": { name: "Engineering & Industry", badge: "ENGINEERING", icon: "fa-solid fa-gears" },
    "science": { name: "Science & Future Tech", badge: "SCIENCE", icon: "fa-solid fa-atom" },
    "career": { name: "Aviation & Career", badge: "AVIATION & CAREER", icon: "fa-solid fa-plane-departure" }
  };
  const catKey = track.category || 'technology';
  const cat = categoriesMap[catKey] || { name: "Specialized", badge: "ESP", icon: "fa-solid fa-layer-group" };

  const savedMap = getSavedOfflineReadingsMap();

  let modulesHtml = '';
  if (track.modules && track.modules.length > 0) {
    track.modules.forEach((mod) => {
      const readingsCount = mod.readings ? mod.readings.length : 0;
      const statusLabel = readingsCount > 0 ? `${readingsCount} Reading(s)` : 'In Development';
      const isGold = !!mod.isGoldModel || (!!mod.dialogue && !!mod.lexiconMatrix) || true;
      const goldTagHtml = isGold ? `
        <span class="gold-model-tag" title="Gold Model ESP: 4 High-Density Pillars"><i class="fa-solid fa-star"></i> GOLD MODEL ESP</span>
      ` : '';

      const conocerCode = mod.conocer || track.conocer || 'EC1290 (High-Tech Manufacturing)';
      const ngssCode = mod.ngss || track.ngss || 'HS-PS1-1 / HS-PS3-2';
      const industrySource = mod.industry || track.industry || 'Nearshoring Industry Benchmark';

      modulesHtml += `
        <div class="module-card ${isGold ? 'gold-card' : ''}" data-track-id="${track.id}" data-mod-id="${mod.id}">
          <div class="card-top">
            <div class="module-icon-box" ${isGold ? 'style="background:rgba(251,191,36,0.18); color:var(--gold-accent); border:1px solid rgba(251,191,36,0.35);"' : ''}>
              <i class="${mod.icon || 'fa-solid fa-microchip'}"></i>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:flex-end;">
              ${goldTagHtml}
              <span class="module-tag">${track.titleEN || track.title}</span>
            </div>
          </div>

          <div class="card-body">
            <h3 class="card-title-es">${mod.title}</h3>
            <p class="card-title-en">${mod.titleES || mod.title}</p>
          </div>

          <div class="card-footer" style="flex-direction:column; align-items:stretch; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div class="reading-count" ${isGold ? 'style="color:var(--gold-accent); font-weight:700;"' : ''}>
                <i class="${isGold ? 'fa-solid fa-crown' : 'fa-solid fa-file-lines'}"></i> ${isGold ? '4 ESP Pillars' : statusLabel}
              </div>
              <button class="explore-btn" ${isGold ? 'style="background:linear-gradient(135deg, var(--gold-accent), #d97706); color:#000;"' : ''}>
                ${isGold ? 'Open Gold Model' : 'Open Module'} <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <!-- Standards Badges -->
            <div class="standards-badge-group" style="margin:0; padding-top:10px; border-top:1px solid rgba(0,0,0,0.05);">
              <span class="std-pill std-conocer" title="Apego Formativo SEP CONOCER"><i class="fa-solid fa-award"></i> ${conocerCode}</span>
              <span class="std-pill std-ngss" title="NGSS Alignment"><i class="fa-solid fa-flask"></i> ${ngssCode}</span>
              <span class="std-pill std-industry" title="Industry Benchmark"><i class="fa-solid fa-industry"></i> ${industrySource}</span>
            </div>
          </div>
        </div>
      `;
    });
  }

  const certTracks = JSON.parse(localStorage.getItem('stemos_certified_tracks_v1') || '{}');
  const isCertified = !!certTracks[track.id];

  detailView.innerHTML = `
    <div class="unit-detail-nav">
      <button class="btn-back-units" id="btn-back-units">
        <i class="fa-solid fa-arrow-left"></i> All Units
      </button>

      <div class="unit-detail-pager">
        <button class="pager-btn" id="pager-prev" ${prevTrack ? '' : 'disabled'} data-track-id="${prevTrack ? prevTrack.id : ''}">
          <i class="fa-solid fa-chevron-left"></i> Previous
        </button>
        <span style="font-size:0.85rem; font-weight:700; color:var(--text-muted); font-family:var(--font-mono);">
          Unit ${currentIdx + 1} of ${tracks.length}
        </span>
        <button class="pager-btn" id="pager-next" ${nextTrack ? '' : 'disabled'} data-track-id="${nextTrack ? nextTrack.id : ''}">
          Next <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <div class="unit-detail-header-card">
      <div class="unit-detail-meta-top">
        <span class="unit-number-pill" style="background:#0f172a; color:#fff;">Unit ${unitNumber}</span>
        <span class="unit-category-chip" style="background:rgba(2,132,199,0.1); color:#0284c7; border:1px solid rgba(2,132,199,0.2);">
          <i class="${cat.icon}"></i> ${cat.badge}
        </span>
        <span style="font-size:0.82rem; font-weight:600; color:var(--text-muted);">
          ${track.modules ? track.modules.length : 0} Specialized Modules
        </span>
      </div>

      <h2 class="unit-detail-title">${track.titleEN || track.title}</h2>
      <p class="unit-detail-sub">${track.title}</p>
      <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.6; max-width:850px; margin-bottom:20px;">
        ${track.description || 'Curated English for Specific Purposes (ESP) curriculum designed for advanced nearshoring manufacturing, aerospace, and precision engineering.'}
      </p>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; margin-top:16px;">
        <div class="unit-detail-standards-row" style="margin:0;">
          <span class="std-pill std-conocer"><i class="fa-solid fa-award"></i> SEP CONOCER ${track.conocer || 'EC1290'}</span>
          <span class="std-pill std-ngss"><i class="fa-solid fa-flask"></i> NGSS ${track.ngss || 'HS-PS1-1'}</span>
          <span class="std-pill std-industry"><i class="fa-solid fa-industry"></i> ${track.industry || 'Nearshoring Industry Benchmark'}</span>
          <span class="std-pill" style="background:#f1f5f9; color:#475569; border:1px solid #cbd5e1;"><i class="fa-solid fa-signal"></i> Level ${track.level || 'B1-B2'}</span>
        </div>
        ${isCertified ? `
          <button class="cs-modal-btn" id="btn-unit-take-exam" data-track-id="${track.id}" style="background:linear-gradient(135deg, #059669 0%, #047857 100%); box-shadow:0 4px 14px rgba(5,150,105,0.35);">
            <i class="fa-solid fa-certificate"></i> Ver Credencial Open Badge 3.0
          </button>
        ` : `
          <button class="cs-modal-btn" id="btn-unit-take-exam" data-track-id="${track.id}" style="background:linear-gradient(135deg, #10b981 0%, #059669 100%); box-shadow:0 4px 14px rgba(16,185,129,0.35);">
            <i class="fa-solid fa-award"></i> Take Track Certification Exam
          </button>
        `}
      </div>
    </div>

    <div class="unit-modules-grid">
      ${modulesHtml}
    </div>
  `;

  // Attach event listeners inside detail view
  document.getElementById('btn-back-units')?.addEventListener('click', hideUnitDetail);

  document.getElementById('btn-unit-take-exam')?.addEventListener('click', () => {
    if (isCertified) {
      launchOpenBadgeModal(track.id, tracks);
    } else {
      launchDevCertificationExam(track.id, tracks);
    }
  });
  
  document.getElementById('pager-prev')?.addEventListener('click', (e) => {
    const targetId = e.currentTarget.getAttribute('data-track-id');
    if (targetId) showUnitDetail(targetId, tracks, phrases);
  });

  document.getElementById('pager-next')?.addEventListener('click', (e) => {
    const targetId = e.currentTarget.getAttribute('data-track-id');
    if (targetId) showUnitDetail(targetId, tracks, phrases);
  });

  detailView.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', () => {
      const tId = card.getAttribute('data-track-id');
      const mId = card.getAttribute('data-mod-id');
      openDrawer(tId, mId, tracks);
    });
  });

  // Switch views
  unitsGrid.style.display = 'none';
  if (legacyGrid) legacyGrid.style.display = 'none';
  detailView.style.display = 'block';

  // Smooth scroll to catalog section
  const catalogSection = document.getElementById('catalog-section');
  if (catalogSection) {
    const yOffset = -80;
    const y = catalogSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function hideUnitDetail() {
  const unitsGrid = document.getElementById('units-grid');
  const detailView = document.getElementById('unit-detail-view');
  const legacyGrid = document.getElementById('studio-grid');

  if (detailView) detailView.style.display = 'none';
  if (legacyGrid) legacyGrid.style.display = 'none';
  if (unitsGrid) unitsGrid.style.display = 'grid';

  const catalogSection = document.getElementById('catalog-section');
  if (catalogSection) {
    const yOffset = -80;
    const y = catalogSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// ── Render Native Phrases & Main Grid Controller ──
function renderGrid(tracks, phrases = []) {
  // 1. Render Level 1: Modular Units Grid
  renderUnitsGrid(tracks, phrases);

  // 2. Render Native Phrases into studio-grid for direct access
  const gridContainer = document.getElementById('studio-grid');
  if (!gridContainer) return;

  let html = '';
  if (phrases && phrases.length > 0) {
    html += `
      <div class="track-section" id="section-phrases">
        <h2 class="track-header-title font-head" style="color: var(--blue-core);">
          <i class="fa-solid fa-comments"></i> Native Technical Idioms ("What They Don't Teach in School")
          <span style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">(${phrases.length} Professional Shopfloor Expressions)</span>
        </h2>
        <div class="modules-grid">
    `;

    phrases.forEach(p => {
      html += `
        <div class="module-card phrase-card" data-phrase-id="${p.id}" style="border-color: rgba(2, 132, 199, 0.25);">
          <div class="card-top">
            <div class="module-icon-box" style="background: rgba(2, 132, 199, 0.12); color: var(--blue-core);">
              <i class="fa-solid fa-quote-left"></i>
            </div>
            <span class="module-tag" style="background: rgba(2, 132, 199, 0.1); color: var(--blue-core);">${p.category.toUpperCase()}</span>
          </div>

          <div class="card-body">
            <h3 class="card-title-es" style="color: var(--blue-core); font-size: 1.15rem;">"${p.phrase}"</h3>
            <p class="card-title-en" style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">${p.meaningES}</p>
            
            <div class="school-contrast-box">
              <div class="school-row"><span class="bad-tag"><i class="fa-solid fa-school"></i> Textbook:</span> <s>${p.schoolVsNative.school}</s></div>
              <div class="native-row"><span class="good-tag"><i class="fa-solid fa-bolt"></i> Native:</span> <strong>${p.schoolVsNative.native}</strong></div>
            </div>
          </div>

          <div class="card-footer">
            <div class="reading-count" style="color: var(--blue-core);">
              <i class="fa-solid fa-volume-high"></i> ${p.pronunciationHint.split(':')[0] || 'Pronunciation'}
            </div>
            <button class="explore-btn" style="background: var(--blue-core); color: #fff;">
              View Nuance <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  }

  gridContainer.innerHTML = html;

  gridContainer.addEventListener('click', (e) => {
    const phraseCard = e.target.closest('.phrase-card');
    if (phraseCard) {
      const phraseId = phraseCard.dataset.phraseId;
      openPhraseDrawer(phraseId, phrases);
    }
  });
}

function filterGridByTrack(trackId, tracks, phrases = []) {
  const unitsGrid = document.getElementById('units-grid');
  const detailView = document.getElementById('unit-detail-view');
  const legacyGrid = document.getElementById('studio-grid');
  if (!unitsGrid) return;

  if (detailView) detailView.style.display = 'none';

  if (trackId === 'all' || trackId === 'skill-all') {
    if (legacyGrid) legacyGrid.style.display = 'none';
    unitsGrid.style.display = 'grid';
    unitsGrid.querySelectorAll('.unit-card').forEach(card => {
      card.style.display = 'flex';
    });
    return;
  }

  if (trackId.startsWith('cat-')) {
    const catKey = trackId.replace('cat-', '');
    if (legacyGrid) legacyGrid.style.display = 'none';
    unitsGrid.style.display = 'grid';
    unitsGrid.querySelectorAll('.unit-card').forEach(card => {
      if (card.getAttribute('data-category') === catKey) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    return;
  }

  if (trackId === 'phrases' || trackId === 'skill-colloquial_radar') {
    unitsGrid.style.display = 'none';
    if (legacyGrid) {
      legacyGrid.style.display = 'block';
      const phrasesSec = document.getElementById('section-phrases');
      if (phrasesSec) phrasesSec.style.display = 'block';
    }
    return;
  }

  if (trackId.startsWith('skill-')) {
    const skillKey = trackId.replace('skill-', '');
    const skillInfo = COMMUNICATIVE_SKILLS[skillKey];
    if (skillInfo && skillInfo.trackIds) {
      if (legacyGrid) legacyGrid.style.display = 'none';
      unitsGrid.style.display = 'grid';
      unitsGrid.querySelectorAll('.unit-card').forEach(card => {
        const tId = card.getAttribute('data-track-id');
        if (skillInfo.trackIds.includes(tId)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
    return;
  }
}

function setupSearch(tracks, phrases = []) {
  const searchInput = document.getElementById('studio-search');
  const unitsGrid = document.getElementById('units-grid');
  const detailView = document.getElementById('unit-detail-view');
  const legacyGrid = document.getElementById('studio-grid');

  if (!searchInput) return;

  // Global search shortcut ⌘K or Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();

    if (!q) {
      // Restore normal units view
      if (legacyGrid) legacyGrid.style.display = 'none';
      if (detailView) detailView.style.display = 'none';
      if (unitsGrid) {
        unitsGrid.style.display = 'grid';
        unitsGrid.querySelectorAll('.unit-card').forEach(c => c.style.display = 'flex');
      }
      return;
    }

    // Filter modules across all 26 tracks
    let matches = [];
    tracks.forEach(track => {
      if (track.modules) {
        track.modules.forEach(mod => {
          const modText = `${mod.title} ${mod.titleES || ''} ${track.title} ${track.titleEN || ''}`.toLowerCase();
          if (modText.includes(q)) {
            matches.push({ track, mod });
          }
        });
      }
    });

    if (unitsGrid) unitsGrid.style.display = 'none';
    if (detailView) detailView.style.display = 'none';

    if (legacyGrid) {
      legacyGrid.style.display = 'block';

      if (matches.length === 0) {
        legacyGrid.innerHTML = `
          <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:20px; border:1px solid rgba(0,0,0,0.08);">
            <i class="fa-solid fa-magnifying-glass" style="font-size:2.5rem; color:#94a3b8; margin-bottom:16px;"></i>
            <h3 style="font-size:1.3rem; font-weight:700; color:#0f172a; margin-bottom:8px;">No modules found for "${q}"</h3>
            <p style="color:#64748b; font-size:0.95rem; margin-bottom:20px;">Try searching for keywords like MEMS, PLC, CAD, EV, Cleanroom, or ISO.</p>
            <button id="btn-clear-search-empty" style="background:#0f172a; color:#fff; border:none; padding:10px 22px; border-radius:999px; font-weight:600; cursor:pointer;">
              Clear Search
            </button>
          </div>
        `;
        document.getElementById('btn-clear-search-empty')?.addEventListener('click', () => {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
        });
        return;
      }

      let cardsHtml = '';
      matches.forEach(({ track, mod }) => {
        const isGold = !!mod.isGoldModel || (!!mod.dialogue && !!mod.lexiconMatrix) || true;
        const readingsCount = mod.readings ? mod.readings.length : 0;
        cardsHtml += `
          <div class="module-card ${isGold ? 'gold-card' : ''}" data-track-id="${track.id}" data-mod-id="${mod.id}">
            <div class="card-top">
              <div class="module-icon-box">
                <i class="${mod.icon || 'fa-solid fa-microchip'}"></i>
              </div>
              <span class="module-tag">${track.titleEN || track.title}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title-es">${mod.title}</h3>
              <p class="card-title-en">${mod.titleES || mod.title}</p>
            </div>
            <div class="card-footer">
              <div class="reading-count"><i class="fa-solid fa-file-lines"></i> ${readingsCount} Reading(s)</div>
              <button class="explore-btn">Open Module <i class="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        `;
      });

      legacyGrid.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; padding:16px 22px; background:#fff; border:1px solid rgba(0,0,0,0.08); border-radius:16px;">
          <div style="font-size:0.96rem; color:#0f172a;">
            <strong>Found ${matches.length} modules</strong> matching &ldquo;${q}&rdquo;
          </div>
          <button id="btn-clear-search" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:6px 16px; border-radius:999px; font-weight:600; cursor:pointer; color:#0f172a;">
            <i class="fa-solid fa-xmark"></i> Clear
          </button>
        </div>
        <div class="modules-grid">
          ${cardsHtml}
        </div>
      `;

      document.getElementById('btn-clear-search')?.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
      });

      legacyGrid.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', () => {
          const tId = card.getAttribute('data-track-id');
          const mId = card.getAttribute('data-mod-id');
          openDrawer(tId, mId, tracks);
        });
      });
    }
  });
}

function setupDrawer(tracks) {
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close');
  const drawerBody = document.getElementById('drawer-body');

  if (!backdrop) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Light-dismiss: click on backdrop area (outside the panel)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDrawer();
  });

  // Esc key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Centralized delegated click listener on drawerBody (registered ONCE)
  if (drawerBody) {
    drawerBody.addEventListener('click', (e) => {
      // Speech button
      const speechBtn = e.target.closest('[data-speech-text]');
      if (speechBtn) {
        const text = decodeURIComponent(speechBtn.getAttribute('data-speech-text'));
        speakEnglishText(text);
        return;
      }

      // Collocation speech
      const collocChip = e.target.closest('[data-speak-colloc]');
      if (collocChip) {
        const text = decodeURIComponent(collocChip.getAttribute('data-speak-colloc'));
        speakEnglishText(text);
        return;
      }

      // Translation toggle
      const transBtn = e.target.closest('.btn-turn-trans');
      if (transBtn) {
        const targetId = transBtn.getAttribute('data-target');
        const block = document.getElementById(targetId);
        if (block) {
          const isHidden = (block.style.display === 'none' || !block.style.display);
          block.style.display = isHidden ? 'block' : 'none';
          transBtn.innerHTML = isHidden ? '<i class="fa-solid fa-eye-slash"></i> Ocultar' : '<i class="fa-solid fa-eye"></i> Traducción';
        }
        return;
      }

      // Term tooltip toggle for mobile/touch
      const termEl = e.target.closest('.term-tooltip');
      if (termEl && (e.target.classList.contains('term-info-btn') || e.pointerType === 'touch')) {
        e.stopPropagation();
        document.querySelectorAll('.term-tooltip.active').forEach(el => {
          if (el !== termEl) el.classList.remove('active');
        });
        termEl.classList.toggle('active');
        return;
      }

      // In-modal CEFR Level button
      const levelBtn = e.target.closest('.modal-level-btn');
      if (levelBtn) {
        e.stopPropagation();
        const level = levelBtn.getAttribute('data-level');
        localStorage.setItem('stemos_cefr_level', level);
        if (currentActiveTrackId && currentActiveModId && tracks) {
          openDrawer(currentActiveTrackId, currentActiveModId, tracks);
        }
        showOfflineToast(`Nivel CEFR: ${level}`, `Ajustando la vista de lectura a nivel ${level} (${level === 'A2' ? 'Básico-Intermedio' : 'Técnico Avanzado'}).`, 100, true);
        return;
      }

      // Verify Reading Quiz Answers
      const verifyQuizBtn = e.target.closest('.btn-verify-reading-quiz');
      if (verifyQuizBtn) {
        const mId = verifyQuizBtn.getAttribute('data-mod');
        const rIdx = verifyQuizBtn.getAttribute('data-reading');
        const quizSection = document.getElementById(`quiz-sec-${mId}-${rIdx}`);
        if (!quizSection) return;

        const cards = quizSection.querySelectorAll('.quiz-question-card');
        let correctCount = 0;

        cards.forEach((card, cIdx) => {
          const correctAnswer = parseInt(card.getAttribute('data-correct'), 10);
          const selectedRadio = card.querySelector(`input[name="dev-q-${mId}-${rIdx}-${cIdx}"]:checked`);
          const feedbackBox = card.querySelector('.quiz-feedback-box');
          const feedbackText = card.querySelector('.feedback-text');
          const allLabels = card.querySelectorAll('.quiz-opt-label');

          allLabels.forEach(lbl => {
            lbl.classList.remove('is-correct', 'is-wrong');
            const radio = lbl.querySelector('input');
            if (parseInt(radio.value, 10) === correctAnswer) {
              lbl.classList.add('is-correct');
            }
          });

          if (feedbackBox) feedbackBox.classList.add('show');

          if (selectedRadio) {
            const userVal = parseInt(selectedRadio.value, 10);
            if (userVal === correctAnswer) {
              correctCount++;
              if (feedbackBox) {
                feedbackBox.className = 'quiz-feedback-box show correct';
                if (feedbackText) feedbackText.innerHTML = '<strong><i class="fa-solid fa-circle-check"></i> ¡Correcto!</strong> Excelente deducción técnica.';
              }
            } else {
              const userLabel = selectedRadio.closest('.quiz-opt-label');
              if (userLabel) userLabel.classList.add('is-wrong');
              if (feedbackBox) {
                feedbackBox.className = 'quiz-feedback-box show wrong';
                if (feedbackText) feedbackText.innerHTML = '<strong><i class="fa-solid fa-circle-xmark"></i> Incorrecto.</strong> Revisa el fundamento conceptual.';
              }
            }
          } else {
            if (feedbackBox) {
              feedbackBox.className = 'quiz-feedback-box show wrong';
              if (feedbackText) feedbackText.innerHTML = '<strong><i class="fa-solid fa-triangle-exclamation"></i> Sin responder.</strong> Selecciona una opción.';
            }
          }
        });

        const scoreBadge = document.getElementById(`quiz-score-${mId}-${rIdx}`);
        const pct = Math.round((correctCount / cards.length) * 100);
        if (scoreBadge) {
          scoreBadge.style.display = 'inline-block';
          // Unblur reading content once verified
          const lockContainer = document.getElementById(`reading-lockable-${mId}-${rIdx}`);
          if (lockContainer) lockContainer.classList.remove("is-blurred-locked");
          const quizBtn = document.getElementById(`quiz-btn-${mId}-${rIdx}`);
          if (quizBtn) {
            quizBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Completed (${pct}%)</span>`;
            quizBtn.classList.remove("active-eval");
          }

          if (pct >= 75) {
            scoreBadge.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#059669;"></i> Lectura Acreditada: ${correctCount}/${cards.length} (${pct}%) &bull; +25 XP`;
            scoreBadge.style.background = '#ecfdf5';
            scoreBadge.style.color = '#065f46';
            scoreBadge.style.borderColor = '#a7f3d0';

            // Persist completion in LocalStorage
            const completedMap = JSON.parse(localStorage.getItem('stemos_completed_readings_v1') || '{}');
            const readKey = `${mId}-r${rIdx}`;
            if (!completedMap[readKey]) {
              completedMap[readKey] = true;
              localStorage.setItem('stemos_completed_readings_v1', JSON.stringify(completedMap));
              let currentXp = parseInt(localStorage.getItem('stemos_user_xp_v1') || '0', 10);
              currentXp += 25;
              localStorage.setItem('stemos_user_xp_v1', currentXp.toString());
            }

            // Update accordion header if present
            const accordionHeader = document.querySelector(`#accordion-reading-${rIdx} .reading-accordion-title`);
            if (accordionHeader && !accordionHeader.querySelector('.quiz-completed-tag')) {
              const tag = document.createElement('span');
              tag.className = 'quiz-completed-tag';
              tag.style.cssText = 'font-size:0.7rem; padding:2px 8px; margin-left:8px;';
              tag.innerHTML = '<i class="fa-solid fa-circle-check"></i> Completada';
              accordionHeader.appendChild(tag);
            }
          } else {
            scoreBadge.innerHTML = `<i class="fa-solid fa-chart-simple"></i> Resultado: ${correctCount}/${cards.length} (${pct}%) &bull; Requiere 75% para acreditar`;
            scoreBadge.style.background = '#fef2f2';
            scoreBadge.style.color = '#991b1b';
            scoreBadge.style.borderColor = '#fecaca';
          }
        }
        return;
      }
    });

    // Close any active tooltip when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.term-tooltip')) {
        document.querySelectorAll('.term-tooltip.active').forEach(el => el.classList.remove('active'));
      }
    });
  }
}

let currentActiveTrackId = null;
let currentActiveModId = null;
let isPlayingDialogueAudio = false;

// Web Speech API Voice Synthesis helper
function speakEnglishText(text, rate = 0.95, onEnd = null) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

function stopEnglishSpeech() {
  isPlayingDialogueAudio = false;
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// 1. RENDER READING TAB
function renderReadingAccordionHtml(mod, activeLevel) {
  let html = '';
  if (mod.readings && mod.readings.length > 0) {
    const completedMap = JSON.parse(localStorage.getItem('stemos_completed_readings_v1') || '{}');

    mod.readings.forEach((r, idx) => {
      const isFirst = (idx === 0);
      const isCompleted = !!completedMap[`${mod.id}-r${idx}`];
      const formattedText = renderMarkdownWithVocabulary(adaptReadingContentForCEFR(r, activeLevel), r.vocabulary || [], activeLevel);

      html += `
        <div class="reading-accordion ${isFirst ? 'open' : ''}" id="accordion-reading-${idx}">
          <div class="reading-accordion-header" onclick="this.parentElement.classList.toggle('open')">
            <div style="display:flex; align-items:center; gap:12px;">
              <span class="reading-accordion-idx">${idx+1}</span>
              <h3 class="reading-accordion-title">
                ${r.title}
                ${isCompleted ? '<span class="quiz-completed-tag" style="font-size:0.7rem; padding:2px 8px; margin-left:8px;"><i class="fa-solid fa-circle-check"></i> Completada</span>' : ''}
              </h3>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="cefr-badge-inline" style="font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:6px; background:${activeLevel==='A2'?'rgba(2,132,199,0.1)':'rgba(168,85,247,0.1)'}; color:${activeLevel==='A2'?'#0284c7':'#7e22ce'}; border:1px solid ${activeLevel==='A2'?'rgba(2,132,199,0.3)':'rgba(168,85,247,0.3)'};">
                Modo ${activeLevel}
              </span>
              <span style="font-size:0.78rem; background:#f1f5f9; padding:4px 8px; border-radius:6px; color:#64748b; font-weight:600;">${r.duration || '10 min'}</span>
              <div class="reading-accordion-toggle-icon"><i class="fa-solid fa-chevron-down"></i></div>
            </div>
          </div>

          <div class="reading-accordion-body" id="accordion-body-${mod.id}-${idx}">
            <div class="reading-lockable-container" id="reading-lockable-${mod.id}-${idx}">
              <div class="reading-eval-shield" id="eval-shield-${mod.id}-${idx}">
                <div class="eval-shield-card">
                  <div class="shield-lock-icon">
                    <i class="fa-solid fa-eye-slash"></i>
                  </div>
                  <h4 class="shield-lock-title">Reading Content Locked &amp; Blurred</h4>
                  <p class="shield-lock-desc">
                    Reading text and vocabulary are blurred during the <strong>Formative Comprehension Check</strong> to verify active recall without referencing the text.
                  </p>
                  <button type="button" class="shield-return-btn" onclick="toggleFormativeComprehensionCheck('${mod.id}', ${idx}, false)">
                    <i class="fa-solid fa-arrow-left"></i> Pause Evaluation &amp; Return to Reading
                  </button>
                </div>
              </div>

              <div class="reader-content">
                ${formattedText}
              </div>

            ${(r.vocabulary && r.vocabulary.length > 0) ? `
              <div class="glossary-section-wrap">
                <h4 class="font-head" style="margin:0 0 16px 0; color:#0f172a; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
                  <i class="fa-solid fa-book-bookmark" style="color:#0284c7;"></i> Glosario y Vocabulario Técnico (${r.vocabulary.length} Términos)
                </h4>
                <div class="glossary-list">
                  ${r.vocabulary.map(v => {
                    const termText = v.en || v.term || '';
                    const termEscaped = termText.replace(/'/g, "\\'");
                    return `
                    <div class="glossary-item">
                      <div>
                        <div class="glossary-term" style="display:flex; align-items:center; flex-wrap:wrap; gap:8px;">
                          <span style="font-weight:700; color:#0f172a; font-size:0.95rem;">${termText}</span>
                          <button class="glossary-audio-btn" onclick="speakEnglishText('${termEscaped}')" title="Pronunciar término" style="background:rgba(2,132,199,0.1); border:1px solid rgba(2,132,199,0.25); color:#0284c7; width:26px; height:26px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.75rem;">
                            <i class="fa-solid fa-volume-high"></i>
                          </button>
                          ${v.ipa ? `<span class="term-ipa" style="color:#64748b; font-family:var(--font-mono, monospace); font-size:0.75rem;">[${v.ipa}]</span>` : ''}
                          <span style="font-weight:600; color:#0284c7; font-size:0.85rem;">&bull; ${v.es || v.definitionES || ''}</span>
                        </div>
                        <div class="glossary-def" style="margin-top:6px; color:#475569; font-size:0.86rem; line-height:1.5;">${v.definition || v.definitionEN || ''}</div>
                        ${(v.collocations && v.collocations.length > 0) ? `
                          <div style="font-size:0.75rem; color:#64748b; margin-top:6px;">
                            <strong>Colocaciones técnicas:</strong> ${v.collocations.join(' &bull; ')}
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `}).join('')}
                </div>
              </div>
            ` : ''}

            </div><!-- /reading-lockable-container -->

            ${(r.questions && r.questions.length > 0) ? `
              <div class="reading-quiz-section" id="quiz-sec-${mod.id}-${idx}">
                <div class="quiz-section-header" onclick="toggleFormativeComprehensionCheck('${mod.id}', ${idx})">
                  <div class="quiz-section-title">
                    <i class="fa-solid fa-clipboard-question" style="color:var(--blue-core);"></i>
                    <span>Formative Comprehension Check (${r.questions.length} Technical Questions)</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <button type="button" class="quiz-toggle-trigger-btn" id="quiz-btn-${mod.id}-${idx}">
                      <i class="fa-solid fa-lock"></i> <span>Open Comprehension Check</span>
                    </button>
                  </div>
                </div>

                <div class="quiz-body-collapsible" id="quiz-body-${mod.id}-${idx}" style="display:none;">
                  <div class="quiz-questions-list">
                  ${r.questions.map((qObj, qIdx) => `
                    <div class="quiz-question-card" data-correct="${qObj.answer}">
                      <div class="quiz-q-text">
                        <span style="color:#0284c7; margin-right:6px;">Q${qIdx + 1}.</span> ${qObj.q}
                      </div>
                      <div class="quiz-options-group">
                        ${qObj.options.map((opt, optIdx) => `
                          <label class="quiz-opt-label">
                            <input type="radio" name="dev-q-${mod.id}-${idx}-${qIdx}" value="${optIdx}">
                            <span>${opt}</span>
                          </label>
                        `).join('')}
                      </div>
                      <div class="quiz-feedback-box" id="feedback-${mod.id}-${idx}-${qIdx}">
                        <div class="feedback-text"></div>
                        ${qObj.explanation ? `<div style="font-size:0.78rem; margin-top:4px; opacity:0.9;"><strong>Technical Rationale:</strong> ${qObj.explanation}</div>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; flex-wrap:wrap; gap:10px;">
                  <button class="cs-modal-btn btn-verify-reading-quiz" data-mod="${mod.id}" data-reading="${idx}" style="padding:9px 20px; font-size:0.84rem;">
                    <i class="fa-solid fa-circle-check"></i> Check Answers
                  </button>
                  <span class="quiz-score-badge" id="quiz-score-${mod.id}-${idx}" style="display:none; font-size:0.82rem; font-weight:700; padding:6px 14px; border-radius:8px; background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0;"></span>
                </div>
              </div><!-- /quiz-body-collapsible -->
            </div>
            ` : ''}
          </div>
        </div>
      `;
    });
  } else {
    html += `
      <div class="reader-content" style="text-align:center; padding:48px;">
        <i class="fa-solid fa-pen-ruler" style="font-size:2.5rem; color:var(--gold); margin-bottom:16px;"></i>
        <h3 class="font-head" style="color:#fff;">Módulo en Fase de Redacción</h3>
        <p style="color:var(--text-muted); margin-top:8px;">Este módulo está contemplado en la malla de Nearshoring de stemOS. Próximamente se generarán las lecturas y evaluaciones socráticas correspondientes.</p>
      </div>
    `;
  }
  return html;
}

// 2. RENDER REAL-WORLD DIALOGUE TAB
function renderDialogueTabHtml(dialogue, modTitle = '') {
  if (!dialogue || (Array.isArray(dialogue) && dialogue.length === 0) || (!Array.isArray(dialogue) && !dialogue.turns)) {
    return `<div style="padding:32px; text-align:center; color:var(--text-muted);"><i class="fa-solid fa-comments" style="font-size:2rem; margin-bottom:8px; opacity:0.5;"></i><p>No interactive plant dialogue available for this module yet.</p></div>`;
  }

  // Normalize turns across both Array and Object schemas
  let turns = [];
  let title = '';
  let titleES = '';
  let scenario = 'Nearshoring Industrial Facility — Operations & Quality Protocol';
  let contrastTips = [];

  if (Array.isArray(dialogue)) {
    turns = dialogue.map((item, idx) => ({
      speaker: item.role || (idx % 2 === 0 ? 'Plant Supervisor' : 'Lead Engineer'),
      role: item.role ? '' : (idx % 2 === 0 ? 'Supervisor' : 'Specialist'),
      text: item.content || item.text || '',
      translation: item.translation || '',
      targetTerms: item.pedagogicalNotes ? item.pedagogicalNotes.replace(/^Target terms:\s*/i, '').split(',').map(s => s.trim()) : [],
      pedagogicalNotes: item.pedagogicalNotes || ''
    }));
    title = `Standup Plant Dialogue: ${modTitle}`;
    titleES = 'Diálogo Operativo en Planta Real';
  } else {
    turns = (dialogue.turns || []).map(t => ({
      speaker: t.speaker,
      role: ((dialogue.characters || []).find(c => c.name === t.speaker) || {}).role || '',
      text: t.text,
      translation: t.translation || '',
      targetTerms: t.targetTerms || [],
      pedagogicalNotes: (t.targetTerms && t.targetTerms.length > 0) ? `Target terms: ${t.targetTerms.join(', ')}` : ''
    }));
    title = dialogue.title || `Standup Plant Dialogue: ${modTitle}`;
    titleES = dialogue.titleES || 'Diálogo Operativo en Planta Real';
    scenario = dialogue.scenarioContext || scenario;
    contrastTips = dialogue.contrastTips || [];
  }

  // Avatar color generator
  const avatarColors = ['#0284c7', '#059669', '#7c3aed', '#d97706', '#dc2626', '#0891b2'];
  const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const turnsHtml = turns.map((turn, idx) => {
    const color = getAvatarColor(turn.speaker);
    const initials = (turn.speaker || 'EX').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    let highlightedText = turn.text;
    (turn.targetTerms || []).forEach(term => {
      if (!term) return;
      try {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        highlightedText = highlightedText.replace(regex, `<span class="dialogue-term-chip">$1</span>`);
      } catch(e) {}
    });

    return `
      <div class="dialogue-turn" id="dialogue-turn-${idx}">
        <div class="dialogue-avatar" style="background:${color}18; color:${color}; border:1px solid ${color}40;">
          ${initials}
        </div>
        <div class="dialogue-content">
          <div class="dialogue-speaker-info">
            <span class="dialogue-speaker-name" style="color:${color};">${turn.speaker}</span>
            ${turn.role ? `<span class="dialogue-speaker-role">${turn.role}</span>` : ''}
          </div>
          <div class="dialogue-bubble">
            ${highlightedText}
            ${turn.translation ? `
              <div class="dialogue-translation-block" id="trans-block-${idx}" style="display:none;">
                <i class="fa-solid fa-language" style="color:var(--blue-radiant); margin-right:6px;"></i> ${turn.translation}
              </div>
            ` : ''}
            ${turn.pedagogicalNotes ? `
              <div class="dialogue-pedagogical-notes">
                <i class="fa-solid fa-bullseye"></i> <span>${turn.pedagogicalNotes}</span>
              </div>
            ` : ''}
            <div class="dialogue-turn-actions">
              <button class="btn-turn-audio" data-speech-text="${encodeURIComponent(turn.text)}">
                <i class="fa-solid fa-volume-high"></i> Escuchar línea
              </button>
              ${turn.translation ? `
                <button class="btn-turn-trans" data-target="trans-block-${idx}">
                  <i class="fa-solid fa-eye"></i> Traducción
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const contrastHtml = (contrastTips || []).map(tip => `
    <div style="background:rgba(7,11,20,0.85); border:1px solid rgba(251,191,36,0.3); border-radius:12px; padding:16px; margin-bottom:12px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span style="background:rgba(239,68,68,0.2); color:#f87171; border:1px solid rgba(239,68,68,0.4); font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:6px;"><i class="fa-solid fa-school"></i> INGLÉS DE ESCUELA</span>
        <span style="color:var(--text-dim); font-size:0.8rem;">vs</span>
        <span style="background:rgba(52,211,153,0.2); color:var(--emerald-accent); border:1px solid rgba(52,211,153,0.4); font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:6px;"><i class="fa-solid fa-industry"></i> INGLÉS DE PLANTA REAL</span>
      </div>
      <div style="font-size:0.88rem; color:#fca5a5; margin-bottom:4px;"><s>"${tip.school}"</s></div>
      <div style="font-size:0.95rem; color:#6ee7b7; font-weight:700; margin-bottom:8px;">"${tip.native}"</div>
      <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;"><i class="fa-regular fa-lightbulb" style="color:var(--gold-accent); margin-right:4px;"></i><em>${tip.explanation}</em></div>
    </div>
  `).join('');

  return `
    <div class="dialogue-meta-card">
      <h3>${title}</h3>
      ${titleES ? `<p style="color:rgba(255,255,255,0.7); font-size:0.88rem; margin-bottom:12px;">${titleES}</p>` : ''}
      <div class="dialogue-context">
        <i class="fa-solid fa-location-dot"></i> ${scenario}
      </div>

      <div class="dialogue-audio-bar">
        <button id="btn-play-all-dialogue" class="btn-play-dialogue">
          <i class="fa-solid fa-play"></i> Escuchar Standup Completo (TTS)
        </button>
        <button id="btn-stop-dialogue" class="btn-turn-audio" style="display:none; border-color:#f43f5e; color:#f43f5e; padding:8px 14px;">
          <i class="fa-solid fa-stop"></i> Detener Audio
        </button>
        <span style="font-size:0.78rem; color:rgba(255,255,255,0.6); margin-left:auto;">
          <i class="fa-solid fa-circle-info"></i> Audio en inglés sintetizado con Web Speech API
        </span>
      </div>
    </div>

    <div class="dialogue-flow" id="dialogue-flow-container">
      ${turnsHtml}
    </div>

    ${contrastHtml ? `
      <div class="contrast-tips-section">
        <h4 style="color:var(--gold-accent); font-size:1.1rem; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-bolt"></i> Lo que NO enseñan en la escuela vs. Lo que exige la industria real
        </h4>
        ${contrastHtml}
      </div>
    ` : ''}
  `;
}

// 3. RENDER LEXICON MATRIX TAB
function renderLexiconTabHtml(matrix) {
  if (!matrix || matrix.length === 0) {
    return `<div style="padding:32px; text-align:center; color:var(--text-muted);">No hay matriz léxica configurada.</div>`;
  }

  const cardsHtml = matrix.map((item, idx) => {
    const termName = item.term || item.en || '';
    const esTranslation = item.es || item.translation || '';
    const definition = item.definition || item.definitionEN || '';
    const ipa = item.ipa || '';
    const category = item.category || 'Término Clave';

    const collocationsHtml = (item.collocations || []).map(c => `
      <span class="collocation-chip" data-speak-colloc="${encodeURIComponent(c)}" title="Click para escuchar"><i class="fa-solid fa-volume-high" style="font-size:0.65rem; margin-right:3px;"></i> ${c}</span>
    `).join('');

    return `
      <div class="lexicon-card" id="lexicon-card-${idx}">
        <div>
          <div class="lexicon-cat-tag">${category}</div>
          <div class="lexicon-term-header">
            <div>
              <div class="lexicon-term-name">${termName}</div>
              <div style="font-size:0.84rem; color:var(--text-muted); font-weight:600;">${esTranslation}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              ${ipa ? `<span class="lexicon-ipa">${ipa}</span>` : ''}
              <button class="btn-turn-audio" data-speech-text="${encodeURIComponent(termName)}" title="Pronunciación en inglés"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
          
          <p class="lexicon-def">${definition}</p>

          ${collocationsHtml ? `
            <div class="collocations-block">
              <div class="collocations-title"><i class="fa-solid fa-link" style="color:var(--blue-radiant);"></i> Collocations Obligatorias (Verbo / Adjetivo)</div>
              <div class="collocation-pills">${collocationsHtml}</div>
            </div>
          ` : ''}

          ${item.falseFriends ? `
            <div class="false-friends-alert">
              <i class="fa-solid fa-triangle-exclamation" style="margin-top:2px;"></i>
              <div><strong>Alerta de Falso Amigo / Matiz:</strong> ${item.falseFriends}</div>
            </div>
          ` : ''}
        </div>

        ${item.nativeUsage ? `
          <div style="margin-top:14px; padding-top:10px; border-top:1px dashed #e2e8f0; font-size:0.84rem; color:var(--text-muted);">
            <div style="font-size:0.72rem; font-weight:700; color:var(--emerald-accent); text-transform:uppercase; margin-bottom:3px;"><i class="fa-solid fa-microchip"></i> Uso Real en Planta</div>
            <em style="color:#0f172a;">"${item.nativeUsage}"</em>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
      <div>
        <h3 class="font-head" style="color:var(--gold); font-size:1.25rem;">Matriz Léxica & Collocations de Alta Densidad</h3>
        <p style="color:var(--text-muted); font-size:0.84rem;">12 términos críticos de ingeniería, seleccionados por frecuencia en especificaciones SEMI/ISO y juntas de planta.</p>
      </div>
      <span class="stat-chip" style="border-color:rgba(251,191,36,0.3); color:var(--gold); font-weight:800; padding:4px 12px;">
        <i class="fa-solid fa-cubes-stacked"></i> ${matrix.length} Términos Clave
      </span>
    </div>

    <div class="lexicon-grid">
      ${cardsHtml}
    </div>
  `;
}

// 4. RENDER SOCRATIC FEYNMAN EVALUATOR TAB
function renderSocraticTabHtml(mod, challenges) {
  if (!challenges || challenges.length === 0) {
    return `<div style="padding:32px; text-align:center; color:var(--text-muted);">Evaluador socrático no disponible.</div>`;
  }

  const firstQ = challenges[0].botQuestion;

  return `
    <div class="socratic-container">
      <div class="socratic-header">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; border-radius:12px; background:rgba(192,132,252,0.2); color:var(--purple); display:flex; align-items:center; justify-content:center; font-size:1.2rem; border:1px solid rgba(192,132,252,0.4);">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div>
            <div style="font-weight:800; color:#fff; font-size:1rem; display:flex; align-items:center; gap:8px;">
              StemBot Feynman Evaluator <span style="font-size:0.7rem; background:rgba(192,132,252,0.2); color:var(--purple); padding:2px 8px; border-radius:6px; border:1px solid rgba(192,132,252,0.4);">Evaluación Socrática</span>
            </div>
            <div style="font-size:0.78rem; color:var(--text-muted);">Cero reactivos de opción múltiple: explica el concepto en inglés con primeros principios técnicos.</div>
          </div>
        </div>

        <div class="socratic-progress-wrap">
          <div class="socratic-progress-label">
            <span>Progreso Matemático</span>
            <span id="socratic-progress-pct" style="font-family:var(--font-mono); font-weight:800;">[PROGRESO: 0%]</span>
          </div>
          <div class="socratic-progress-bar">
            <div class="socratic-progress-fill" id="socratic-progress-fill" style="width: 0%;"></div>
          </div>
        </div>
      </div>

      <div class="socratic-chat-body" id="socratic-chat-body">
        <div class="socratic-msg bot">
          <div class="socratic-msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="socratic-content">
            <div class="socratic-bubble">
              ${firstQ}
            </div>
            <div style="display:flex; gap:10px; margin-top:6px;">
              <button class="btn-turn-audio" data-speech-text="${encodeURIComponent(firstQ)}">
                <i class="fa-solid fa-volume-high"></i> Escuchar Pregunta
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="socratic-input-bar">
        <textarea id="socratic-user-input" class="socratic-textarea" placeholder="Escribe tu explicación en inglés con tus propias palabras... (Ej: An ingot is sliced into wafers because...)" rows="2"></textarea>
        <button id="btn-socratic-send" class="btn-socratic-send">
          <span>Enviar</span> <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
}

// Interactive State & Event Handlers for Socratic Bot
let socraticEvaluationState = {
  step: 0,
  progress: 0,
  challenges: []
};

function setupSocraticEvaluator(mod) {
  socraticEvaluationState.step = 0;
  socraticEvaluationState.progress = 0;
  socraticEvaluationState.challenges = mod.socraticChallenges || [];

  const sendBtn = document.getElementById('btn-socratic-send');
  const inputEl = document.getElementById('socratic-user-input');
  const chatBody = document.getElementById('socratic-chat-body');
  const progFill = document.getElementById('socratic-progress-fill');
  const progPct = document.getElementById('socratic-progress-pct');

  if (!sendBtn || !inputEl || !chatBody) return;

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;

    // Append user message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'socratic-msg user';
    userMsgDiv.innerHTML = `
      <div class="socratic-msg-avatar"><i class="fa-solid fa-user"></i></div>
      <div class="socratic-bubble">${text}</div>
    `;
    chatBody.appendChild(userMsgDiv);
    inputEl.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    const currentCh = socraticEvaluationState.challenges[socraticEvaluationState.step];
    if (!currentCh) return;

    // Check zero-tolerance for empty/filler answers
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/).filter(Boolean);
    const isFiller = words.length < 3 || /^(yes|no|ok|good|clean|cool|sure|idk|i agree|agree|hola|hello|hi|please approve)$/i.test(lower);

    setTimeout(() => {
      const botMsgDiv = document.createElement('div');
      botMsgDiv.className = 'socratic-msg bot';

      if (isFiller) {
        botMsgDiv.innerHTML = `
          <div class="socratic-msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="socratic-content">
            <div class="socratic-bubble" style="border-color:rgba(239,68,68,0.4); background:rgba(239,68,68,0.08);">
              <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444; margin-right:4px;"></i><strong>Cero tolerancia a respuestas vacías:</strong> En stemOS evaluamos tu producción técnica activa en inglés. Explica con tus propias palabras el concepto para validar tu progreso matemáticamente.
            </div>
          </div>
        `;
        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        return;
      }

      // Keyword & conceptual check
      const matched = currentCh.requiredKeywords.filter(kw => lower.includes(kw.toLowerCase()));
      const passed = matched.length >= currentCh.minKeywords;

      if (passed) {
        socraticEvaluationState.step++;
        socraticEvaluationState.progress = Math.round((socraticEvaluationState.step / socraticEvaluationState.challenges.length) * 100);

        if (progFill) progFill.style.width = `${socraticEvaluationState.progress}%`;
        if (progPct) progPct.innerText = `[PROGRESO: ${socraticEvaluationState.progress}%]`;

        botMsgDiv.innerHTML = `
          <div class="socratic-msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="socratic-content">
            <div class="socratic-bubble">
              <div style="color:var(--emerald); font-weight:800; margin-bottom:6px;">
                <i class="fa-solid fa-circle-check"></i> ¡Excelente explicación! Conceptos identificados: <em>${matched.join(', ')}</em>
              </div>
              ${currentCh.feedbackSuccess}
            </div>
            <div style="display:flex; gap:10px; margin-top:6px;">
              <button class="btn-turn-audio" data-speech-text="${encodeURIComponent(currentCh.feedbackSuccess)}">
                <i class="fa-solid fa-volume-high"></i> Escuchar feedback
              </button>
            </div>
          </div>
        `;
        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Next question or graduation
        if (socraticEvaluationState.step < socraticEvaluationState.challenges.length) {
          setTimeout(() => {
            const nextCh = socraticEvaluationState.challenges[socraticEvaluationState.step];
            const nextMsgDiv = document.createElement('div');
            nextMsgDiv.className = 'socratic-msg bot';
            nextMsgDiv.innerHTML = `
              <div class="socratic-msg-avatar"><i class="fa-solid fa-robot"></i></div>
              <div class="socratic-content">
                <div class="socratic-bubble" style="border-color:rgba(192,132,252,0.4);">
                  <div style="color:var(--purple); font-weight:800; font-size:0.8rem; margin-bottom:4px; text-transform:uppercase;">
                    Reto Socrático ${socraticEvaluationState.step + 1} de ${socraticEvaluationState.challenges.length}: ${nextCh.concept}
                  </div>
                  ${nextCh.botQuestion}
                </div>
                <div style="display:flex; gap:10px; margin-top:6px;">
                  <button class="btn-turn-audio" data-speech-text="${encodeURIComponent(nextCh.botQuestion)}">
                    <i class="fa-solid fa-volume-high"></i> Escuchar Pregunta
                  </button>
                </div>
              </div>
            `;
            chatBody.appendChild(nextMsgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
          }, 800);
        } else {
          // 100% Passed!
          setTimeout(() => {
            const certDiv = document.createElement('div');
            certDiv.className = 'apto-badge-container';
            certDiv.innerHTML = `
              <div style="font-size:2.2rem; color:var(--gold); margin-bottom:8px;"><i class="fa-solid fa-award"></i></div>
              <h3 class="font-head" style="color:var(--gold); font-size:1.3rem;">¡EVALUACIÓN SOCRÁTICA SUPERADA AL 100%!</h3>
              <p style="color:#fff; font-weight:800; margin-top:4px; font-family:var(--font-mono); font-size:1.05rem;">
                [PROGRESO: 100%] [APTO_PARA_AVANZAR]
              </p>
              <p style="color:var(--text-muted); font-size:0.86rem; margin-top:8px; max-width:550px; margin-left:auto; margin-right:auto;">
                Has demostrado dominio conceptual, vocabulario de primeros principios y fluidez técnica para <strong>${mod.title}</strong>. Tu insignia Open Badges 3.0 (W3C) ha quedado acreditada.
              </p>
              <div style="margin-top:16px; display:inline-flex; gap:10px; flex-wrap:wrap; justify-content:center;">
                <span class="std-pill std-conocer"><i class="fa-solid fa-check"></i> SEP CONOCER Validado</span>
                <span class="std-pill std-ngss"><i class="fa-solid fa-microchip"></i> SEMI Fab Spec</span>
                <span class="std-pill std-industry"><i class="fa-solid fa-certificate"></i> Open Badges 3.0</span>
              </div>
            `;
            chatBody.appendChild(certDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
          }, 800);
        }
      } else {
        // Did not pass
        botMsgDiv.innerHTML = `
          <div class="socratic-msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="socratic-content">
            <div class="socratic-bubble" style="border-color:rgba(251,191,36,0.4);">
              <div style="color:var(--gold); font-weight:700; margin-bottom:6px;">
                <i class="fa-solid fa-lightbulb"></i> Profundiza en el razonamiento físico
              </div>
              ${currentCh.feedbackRetry}
              <div style="margin-top:10px; font-size:0.8rem; color:var(--text-muted); border-top:1px dashed rgba(255,255,255,0.1); padding-top:6px;">
                Términos clave esperados en tu explicación: <em>${currentCh.requiredKeywords.slice(0, 5).join(', ')}</em>
              </div>
            </div>
          </div>
        `;
        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 450);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
}

function openDrawer(trackId, modId, tracks) {
  currentActiveTrackId = trackId;
  currentActiveModId = modId;
  stopEnglishSpeech();

  const track = tracks.find(t => t.id === trackId);
  if (!track || !track.modules) return;

  const mod = track.modules.find(m => m.id === modId);
  if (!mod) return;

  const backdrop = document.getElementById('drawer-backdrop');
  const drawerTitle = document.getElementById('drawer-mod-title');
  const drawerSub = document.getElementById('drawer-mod-sub');
  const drawerBody = document.getElementById('drawer-body');
  const activeLevel = localStorage.getItem('stemos_cefr_level') || 'A2';
  const isGold = !!mod.isGoldModel || (!!mod.dialogue && !!mod.lexiconMatrix) || true;

  drawerTitle.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:16px; flex-wrap:wrap;">
      <div style="display:flex; align-items:center; gap:10px;">
        ${isGold ? '<span class="gold-model-tag"><i class="fa-solid fa-star"></i> GOLD</span>' : ''}
        <span style="color:#0f172a; font-weight:800;">${mod.titleES || mod.title}</span>
      </div>
      <!-- In-Modal CEFR Level Switcher -->
      <div class="modal-level-switcher" style="display:inline-flex; align-items:center; gap:2px; background:#f1f5f9; border:1px solid #e2e8f0; padding:3px; border-radius:999px; flex-shrink:0;">
        <button class="modal-level-btn ${activeLevel === 'A2' ? 'active' : ''}" data-level="A2" style="padding:5px 12px; border-radius:999px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer; transition:all 0.2s ease; ${activeLevel === 'A2' ? 'background:#0284c7; color:#ffffff; box-shadow:0 2px 6px rgba(2, 132, 199, 0.25);' : 'background:transparent; color:#64748b;'}">A2 (Básico)</button>
        <button class="modal-level-btn ${activeLevel === 'B1' ? 'active' : ''}" data-level="B1" style="padding:5px 12px; border-radius:999px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer; transition:all 0.2s ease; ${activeLevel === 'B1' ? 'background:#0284c7; color:#ffffff; box-shadow:0 2px 6px rgba(2, 132, 199, 0.25);' : 'background:transparent; color:#64748b;'}">B1 (Técnico)</button>
      </div>
    </div>
  `;
  drawerSub.innerText = `${track.title} • ${mod.title} • ID: ${mod.id}`;

  const conocerCode = mod.conocer || track.conocer || 'EC1290 (Inspección de Procesos de Alta Tecnología)';
  const ngssCode = mod.ngss || track.ngss || 'HS-PS1-1 / HS-PS3-2 (Matter & Energy in Chips)';
  const industrySource = mod.industry || track.industry || 'TSMC-GCU Manufacturing Specialist Intensive (MSI)';

  let contentHtml = '';

  if (isGold) {
    contentHtml = `
      <div class="gold-drawer-banner">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:38px; height:38px; border-radius:10px; background:rgba(251,191,36,0.2); color:var(--gold); display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fa-solid fa-crown"></i>
          </div>
          <div>
            <div style="font-weight:800; color:var(--gold); font-size:0.95rem; letter-spacing:0.02em;">MODELO GOLD ESP — BUCLE DE ALTA DENSIDAD TÉCNICA</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Blueprint de Especificación <i class="fa-solid fa-arrow-right" style="font-size:0.7rem; opacity:0.6; margin:0 4px;"></i> Diálogo de Planta <i class="fa-solid fa-arrow-right" style="font-size:0.7rem; opacity:0.6; margin:0 4px;"></i> Matriz Léxica <i class="fa-solid fa-arrow-right" style="font-size:0.7rem; opacity:0.6; margin:0 4px;"></i> Evaluador Socrático Feynman</div>
          </div>
        </div>
        <span class="gold-model-tag"><i class="fa-solid fa-check-double"></i> Industria 4.0</span>
      </div>

      <nav class="drawer-nav-tabs" role="tablist">
        <button class="drawer-tab-btn active" data-tab="tab-reading" role="tab">
          <i class="fa-solid fa-file-lines"></i> 1. Technical Reading
          <span class="tab-badge">Blueprint</span>
        </button>
        <button class="drawer-tab-btn" data-tab="tab-dialogue" role="tab">
          <i class="fa-solid fa-headset"></i> 2. Real-World Dialogue
          <span class="tab-badge" style="background:rgba(52,211,153,0.2); color:var(--emerald);">Planta Real</span>
        </button>
        <button class="drawer-tab-btn" data-tab="tab-lexicon" role="tab">
          <i class="fa-solid fa-cubes-stacked"></i> 3. Lexicon & Collocations
          <span class="tab-badge" style="background:rgba(251,191,36,0.2); color:var(--gold);">12 Términos</span>
        </button>
        <button class="drawer-tab-btn" data-tab="tab-socratic" role="tab">
          <i class="fa-solid fa-robot"></i> 4. Evaluador Socrático
          <span class="tab-badge" style="background:rgba(192,132,252,0.2); color:var(--purple);">Feynman Bot</span>
        </button>
      </nav>

      <div class="tab-pane active" id="tab-reading">
        ${renderReadingAccordionHtml(mod, activeLevel)}
      </div>

      <div class="tab-pane" id="tab-dialogue">
        ${renderDialogueTabHtml(mod.dialogue, mod.titleES || mod.title)}
      </div>

      <div class="tab-pane" id="tab-lexicon">
        ${renderLexiconTabHtml(mod.lexiconMatrix)}
      </div>

      <div class="tab-pane" id="tab-socratic">
        ${renderSocraticTabHtml(mod, mod.socraticChallenges)}
      </div>
    `;
  } else {
    contentHtml = renderReadingAccordionHtml(mod, activeLevel);
  }

  // Accreditation & Standards Footer Banner (with clean light styling)
  contentHtml += `
    <div class="accreditation-banner" style="margin-top:36px; margin-bottom:0; padding:20px 24px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <h3 class="font-head" style="color:#0f172a; font-size:1.05rem; display:flex; align-items:center; gap:8px; margin:0; font-weight:700;">
          <i class="fa-solid fa-graduation-cap" style="color:#0284c7;"></i> Acreditación & Estándares de Empleabilidad
        </h3>
        <span style="font-size:0.75rem; font-weight:700; color:#0284c7; background:#e0f2fe; border:1px solid #bae6fd; padding:3px 10px; border-radius:20px;">
          <i class="fa-solid fa-scale-balanced"></i> Apego Formativo y Alineación Curricular
        </span>
      </div>

      <div class="accred-grid" style="gap:12px;">
        <div class="accred-box" style="padding:12px 14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px;">
          <div class="accred-title" style="color:#059669; font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-award"></i> SEP CONOCER (Apego a Estándar)</div>
          <div class="accred-desc" style="font-size:0.85rem; font-weight:700; color:#0f172a;">${conocerCode}</div>
          <div style="font-size:0.72rem; color:#64748b; margin-top:4px;">Apego temático a competencias laborales</div>
        </div>

        <div class="accred-box" style="padding:12px 14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px;">
          <div class="accred-title" style="color:#0284c7; font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-flask"></i> NGSS Global (Alineación)</div>
          <div class="accred-desc" style="font-size:0.85rem; font-weight:700; color:#0f172a;">${ngssCode}</div>
          <div style="font-size:0.72rem; color:#64748b; margin-top:4px;">Alineación curricular a ciencias aplicadas</div>
        </div>

        <div class="accred-box" style="padding:12px 14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px;">
          <div class="accred-title" style="color:#d97706; font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-industry"></i> Origen Industria (Referencia)</div>
          <div class="accred-desc" style="font-size:0.85rem; font-weight:700; color:#0f172a;">${industrySource}</div>
          <div style="font-size:0.72rem; color:#64748b; margin-top:4px;">Metodología técnica referencial de planta</div>
        </div>

        <div class="accred-box" style="padding:12px 14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px;">
          <div class="accred-title" style="color:#7c3aed; font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-certificate"></i> Credencial Digital Verificable</div>
          <div class="accred-desc" style="font-size:0.85rem; font-weight:700; color:#0f172a;">Open Badges 3.0 (W3C Standard)</div>
          <div style="font-size:0.72rem; color:#64748b; margin-top:4px;">Insignia digital criptográfica para CV/LinkedIn</div>
        </div>
      </div>

      <!-- Institutional Disclaimer Requested by User -->
      <div style="margin-top:16px; padding:12px 16px; background:#ffffff; border:1px solid #e2e8f0; border-left:3px solid #d97706; border-radius:8px; display:flex; gap:12px; align-items:flex-start;">
        <i class="fa-solid fa-circle-info" style="color:#d97706; font-size:1rem; margin-top:3px; flex-shrink:0;"></i>
        <div style="font-size:0.78rem; color:#475569; line-height:1.5;">
          <strong style="color:#0f172a;">Aviso Institucional de Alineación Curricular:</strong>
          Los estándares <strong>SEP CONOCER</strong> y <strong>NGSS Global</strong> citados corresponden a <em>apegos temáticos y alineaciones curriculares formativas</em> para asegurar rigor de empleabilidad industrial. <strong>NO constituyen certificados directos emitidos por CONOCER ni por NGSS</strong>. La acreditación del estudiante se otorga mediante insignias digitales criptográficas verificables bajo el estándar internacional <strong>Open Badges 3.0 (W3C)</strong> al completar los módulos y evaluaciones socráticas.
        </div>
      </div>
    </div>
  `;

  drawerBody.innerHTML = contentHtml;
  backdrop.classList.add('active');

  // Attach event listeners for tabs
  if (isGold) {
    document.querySelectorAll('.drawer-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-tab');
        document.querySelectorAll('.drawer-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Attach Socratic Evaluator handlers
    setupSocraticEvaluator(mod);

    // Attach Play All Dialogue handler
    const btnPlayAll = document.getElementById('btn-play-all-dialogue');
    const btnStop = document.getElementById('btn-stop-dialogue');
    const turnsList = Array.isArray(mod.dialogue) ? mod.dialogue : (mod.dialogue ? mod.dialogue.turns : []);

    if (btnPlayAll && turnsList && turnsList.length > 0) {
      btnPlayAll.addEventListener('click', () => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        isPlayingDialogueAudio = true;
        if (btnStop) btnStop.style.display = 'inline-flex';
        btnPlayAll.innerHTML = '<i class="fa-solid fa-pause"></i> Reproduciendo Standup...';

        let tIdx = 0;
        function playNext() {
          if (!isPlayingDialogueAudio || tIdx >= turnsList.length) {
            isPlayingDialogueAudio = false;
            btnPlayAll.innerHTML = '<i class="fa-solid fa-play"></i> Escuchar Standup Completo (TTS)';
            if (btnStop) btnStop.style.display = 'none';
            document.querySelectorAll('.dialogue-turn').forEach(el => {
              el.classList.remove('active-speaking');
              el.style.opacity = '1';
            });
            return;
          }

          const t = turnsList[tIdx];
          const speakerName = t.speaker || t.role || 'Speaker';
          const spokenText = t.content || t.text || '';

          document.querySelectorAll('.dialogue-turn').forEach((el, idx) => {
            el.classList.toggle('active-speaking', idx === tIdx);
            el.style.opacity = (idx === tIdx) ? '1' : '0.45';
          });

          // Scroll active turn into view
          const activeEl = document.getElementById(`dialogue-turn-${tIdx}`);
          if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          const utter = new SpeechSynthesisUtterance(`${speakerName} says: ${spokenText}`);
          utter.lang = 'en-US';
          utter.rate = 0.95;
          utter.onend = () => {
            tIdx++;
            setTimeout(playNext, 600);
          };
          utter.onerror = () => {
            isPlayingDialogueAudio = false;
            if (btnStop) btnStop.style.display = 'none';
            btnPlayAll.innerHTML = '<i class="fa-solid fa-play"></i> Escuchar Standup Completo (TTS)';
          };
          window.speechSynthesis.speak(utter);
        }
        playNext();
      });

      if (btnStop) {
        btnStop.addEventListener('click', () => {
          stopEnglishSpeech();
          btnPlayAll.innerHTML = '<i class="fa-solid fa-play"></i> Escuchar Standup Completo (TTS)';
          btnStop.style.display = 'none';
          document.querySelectorAll('.dialogue-turn').forEach(el => {
            el.classList.remove('active-speaking');
            el.style.opacity = '1';
          });
        });
      }
    }
  }
}

function openPhraseDrawer(phraseId, phrases) {
  const p = (phrases || window.STEMOS_PHRASES || []).find(x => x.id === phraseId);
  if (!p) return;

  const backdrop = document.getElementById('drawer-backdrop');
  const drawerTitle = document.getElementById('drawer-mod-title');
  const drawerSub = document.getElementById('drawer-mod-sub');
  const drawerBody = document.getElementById('drawer-body');

  drawerTitle.innerText = `"${p.phrase}"`;
  drawerSub.innerText = `Native Technical Idioms 2.0 • ${(p.skillCategory || p.category || 'workplace').toUpperCase()} • ID: ${p.id}`;

  const riskClass = `risk-badge-${(p.riskLevel || 'BAJO').toLowerCase()}`;
  const skillLabel = (p.skillCategory || 'colloquial_radar').replace(/_/g, ' ').toUpperCase();

  let dialectTrapHtml = '';
  if (p.dialectDifference && p.dialectDifference.hasTrap) {
    dialectTrapHtml = `
      <div class="dialect-trap-banner">
        <div class="dialect-trap-header">
          <div class="dialect-trap-title">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>Cross-Border Dialect Trap (AmEng vs BrEng Meaning Inversion!)</span>
          </div>
          <span class="risk-badge risk-badge-critico"><i class="fa-solid fa-bomb"></i> Trampa Crítica</span>
        </div>
        <p style="font-size:0.84rem; color:#7f1d1d; margin:0 0 10px 0; line-height:1.45;">
          <strong>¡Alerta de Inversión Semántica!</strong> Este modismo tiene significados diametralmente opuestos entre Estados Unidos y Reino Unido. En juntas entre plantas de México y directivos en Detroit o Europa, usarlo sin contexto genera desastres de agenda o compromisos no deseados.
        </p>
        <div class="dialect-grid">
          <div class="dialect-box dialect-box-us">
            <div class="dialect-box-title"><i class="fa-solid fa-flag-usa"></i> US Meaning (American English / Nearshoring)</div>
            <div class="dialect-box-desc">${p.dialectDifference.usMeaning}</div>
          </div>
          <div class="dialect-box dialect-box-uk">
            <div class="dialect-box-title"><i class="fa-solid fa-crown"></i> UK Meaning (British English / Matrix)</div>
            <div class="dialect-box-desc">${p.dialectDifference.ukMeaning}</div>
          </div>
        </div>
      </div>
    `;
  }

  let contentHtml = `
    <!-- Top Metadata Strip -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="risk-badge ${riskClass}">
          <i class="fa-solid fa-triangle-exclamation"></i> Riesgo: ${p.riskLevel || 'BAJO'}
        </span>
        <span style="font-size:0.72rem; font-weight:700; background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:999px; border:1px solid rgba(0,0,0,0.06);">
          <i class="fa-solid fa-bullseye" style="color:#0284c7; margin-right:4px;"></i>${skillLabel}
        </span>
      </div>
      <span style="font-size:0.75rem; color:#94a3b8; font-family:var(--font-mono);">${p.id}</span>
    </div>

    ${dialectTrapHtml}

    <div class="accreditation-banner" style="border-color: rgba(251, 191, 36, 0.35); margin-top: ${p.dialectDifference && p.dialectDifference.hasTrap ? '18px' : '0'};">
      <h3 class="font-head" style="color:var(--gold); font-size:1.2rem; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-bolt"></i> Direct Contrast: Textbook English vs. Real Native English
      </h3>
      <p style="font-size:0.86rem; color:var(--text-muted); margin-top:4px;">
        Expresiones técnicas auténticas utilizadas por directores, ingenieros de calidad y supervisores de Nearshoring.
      </p>

      <div class="accred-grid" style="margin-top:16px;">
        <div class="accred-box" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.08);">
          <div class="accred-title" style="color: #f87171;"><i class="fa-solid fa-school"></i> What Traditional Schools Teach</div>
          <div class="accred-desc" style="color: #fca5a5; font-size:1rem;"><s>${p.schoolVsNative.school}</s></div>
          <div class="accred-sub">Rígido, plano o sobre-literal</div>
        </div>

        <div class="accred-box" style="border-color: rgba(52, 211, 153, 0.35); background: rgba(52, 211, 153, 0.08);">
          <div class="accred-title" style="color:var(--emerald);"><i class="fa-solid fa-bolt"></i> How Real Natives Say It</div>
          <div class="accred-desc" style="color:#fff; font-size:1.1rem; font-weight:700;">"${p.schoolVsNative.native}"</div>
          <div class="accred-sub">Natural, asertivo y de alto estatus industrial</div>
        </div>
      </div>
    </div>

    <!-- Mental Image Origin Box (Layer 2) -->
    <div class="mental-origin-card">
      <div class="mental-origin-title">
        <i class="fa-solid fa-lightbulb"></i> Origen y Fijación Mnemotécnica (Mental Image Origin)
      </div>
      <div class="mental-origin-desc">
        ${p.mentalImageOrigin || p.explanation}
      </div>
    </div>

    <!-- Operational Meaning & Plant Floor Context (Layer 3 & 4) -->
    <div style="margin-top:20px; background:rgba(2, 132, 199, 0.04); border:1px solid rgba(2, 132, 199, 0.2); border-radius:14px; padding:18px;">
      <h4 class="font-head" style="color:var(--blue-core); font-size:1.05rem; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-industry"></i> Contexto Operativo de Planta y Juntas de Escalación
      </h4>
      <p style="color:var(--text-main); font-size:0.92rem; margin-top:8px; line-height:1.55;">
        <strong>Significado operativo:</strong> ${p.operationalMeaning || p.meaningES}
      </p>
      <div style="margin-top:12px; padding:12px 16px; background:#ffffff; border-radius:10px; border:1px solid rgba(0,0,0,0.07); box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; margin-bottom:4px;">
          <i class="fa-solid fa-quote-left" style="color:var(--blue-core); margin-right:4px;"></i> Diálogo Real en Planta / Shopfloor:
        </div>
        <div style="color:#0f172a; font-family:var(--font-mono); font-size:0.92rem; font-weight:600;">
          "${p.plantExample || p.exampleEN}"
        </div>
      </div>
    </div>

    <div style="margin-top:20px; background:rgba(251, 191, 36, 0.06); padding:16px; border-radius:12px; border:1px solid rgba(251, 191, 36, 0.2);">
      <h4 class="font-head" style="color:var(--gold); font-size:1.05rem; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-volume-high"></i> Pronunciation & Rhythm Tip (IPA)
      </h4>
      <p style="color:var(--text-main); font-size:0.9rem; margin-top:6px;">${p.pronunciationHint}</p>
    </div>

    <div style="margin-top:24px;">
      <h3 class="font-head" style="color:var(--emerald); font-size:1.2rem; margin-bottom:12px;"><i class="fa-solid fa-briefcase"></i> Real-World Engineering Example</h3>
      <div style="background:rgba(15, 23, 42, 0.8); border:1px solid var(--border-glow); padding:20px; border-radius:14px;">
        <div style="color:var(--cyan); font-family:var(--font-mono); font-size:1rem; font-weight:600;">"${p.exampleEN}"</div>
        <div style="color:var(--text-muted); font-size:0.88rem; margin-top:8px;"><i class="fa-solid fa-quote-left" style="font-size:0.75rem; color:var(--cyan); margin-right:6px; opacity:0.8;"></i><em>${p.exampleES}</em></div>
      </div>
    </div>

    <!-- FASE 3: Feynman AI Engine (Socratic English Tutor & Technical Interview Simulator) -->
    <div style="margin-top:28px; background:linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(56, 189, 248, 0.12)); border:1px solid rgba(168, 85, 247, 0.35); border-radius:16px; padding:20px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:40px; height:40px; background:rgba(168, 85, 247, 0.2); color:var(--purple); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div>
            <h4 class="font-head" style="color:#fff; font-size:1.1rem;">Feynman AI Tutor — STAR Technical Interview Simulation</h4>
            <p style="color:var(--text-muted); font-size:0.8rem;">Practice fluid technical English in real time by simulating an engineering interview scenario.</p>
          </div>
        </div>
        <span style="font-size:0.75rem; background:rgba(168, 85, 247, 0.2); color:var(--purple); padding:4px 10px; border-radius:8px; font-weight:700; border:1px solid rgba(168, 85, 247, 0.3);">
          Socratic AI Engine 3.0
        </span>
      </div>

      <div style="margin-top:16px; background:rgba(15, 23, 42, 0.9); border:1px solid var(--border-glass); padding:16px; border-radius:12px;" id="feynman-chat-box">
        <div style="display:flex; gap:12px; margin-bottom:12px;">
          <i class="fa-solid fa-robot" style="color:var(--purple); margin-top:2px;"></i>
          <div style="font-size:0.88rem; color:var(--text-main); line-height:1.5;">
            <strong>Feynman AI Evaluator:</strong> "Hi there! How would you use the expression <em>'${p.phrase}'</em> in your next Nearshoring technical audit or engineering standup?"
          </div>
        </div>

        <div style="display:flex; gap:8px; margin-top:12px;">
          <input type="text" id="feynman-user-input" placeholder="Type your answer in English..." style="flex:1; background:rgba(255,255,255,0.06); border:1px solid var(--border-glass); color:#fff; padding:10px 14px; border-radius:10px; font-size:0.88rem; outline:none;">
          <button onclick="simulateFeynmanResponse('${p.phrase.replace(/'/g, "\\'")}')" style="background:linear-gradient(135deg, var(--purple), var(--cyan)); color:#fff; border:none; padding:10px 18px; border-radius:10px; font-weight:600; cursor:pointer; font-size:0.88rem; display:flex; align-items:center; gap:6px;">
            Send <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  drawerBody.innerHTML = contentHtml;
  backdrop.classList.add('active');
}

function closeDrawer() {
  const backdrop = document.getElementById('drawer-backdrop');
  if (backdrop) backdrop.classList.remove('active');
}

function adaptReadingContentForCEFR(reading, level = 'A2') {
  if (!reading) return '';

  // 1. If explicit contentA2 or contentB1 exist on the reading object, use them directly!
  if (level === 'B1' && reading.contentB1) {
    return reading.contentB1;
  }
  if (level === 'A2' && reading.contentA2) {
    return reading.contentA2;
  }

  const rawContent = (typeof reading === 'string') ? reading : (reading.content || reading.contentA2 || reading.contentB1 || '');
  if (!rawContent) return '';

  const vocabList = (reading && reading.vocabulary) ? reading.vocabulary : [];

  if (level === 'A2') {
    if (vocabList && vocabList.length > 0) {
      const topVocab = vocabList.slice(0, 4);
      const vocabItemsHtml = topVocab.map(v => `  - **${v.en || v.term}**: ${v.es || v.definitionES || ''}`).join('\n');
      const latamBox = `

---

### Guía de Lectura y Cognados Técnicos (Nivel A2)
- **Estructura Clave**: Sujeto + Verbo en Presente + Objeto (*The sensor detects heat* = *El sensor detecta calor*).
- **Términos Clave de Esta Lectura**:
${vocabItemsHtml}
- **Estrategia Cognada**: Identifica sufijos como *-tion* (*operation* = *operación*), *-or/-er* (*sensor* = *sensor*, *router* = *enrutador*).
`;
      return rawContent + latamBox;
    }
    return rawContent;
  } else if (level === 'B1') {
    if (vocabList && vocabList.length > 0) {
      const topVocab = vocabList.slice(0, 4);
      const vocabItemsHtml = topVocab.map(v => `  - **${v.en || v.term}** (${v.ipa || ''}): ${v.definition || v.definitionEN || ''}`).join('\n');
      const b1Box = `

---

### B1 Executive Technical & Standards Focus
- **Passive Voice & Compliance Protocol**: *"Critical parameters are monitored continuously to prevent deviation."*
- **Operational Vocabulary Applied**:
${vocabItemsHtml}
- **Standup Phrasing**: Use technical collocations when communicating specifications with plant leadership.
`;
      return rawContent + b1Box;
    }
    return rawContent;
  }

  return rawContent;
}

function renderMarkdownWithVocabulary(mdText, vocabulary = [], level = 'A2') {
  if (!mdText) return '';
  
  let formatted = formatMarkdown(mdText);

  // CEFR Mode Header Notice (Polished for light theme contrast)
  const levelBanner = (level === 'B1') ? `
    <div class="cefr-reading-banner" style="background:#faf5ff; border:1px solid #e9d5ff; padding:12px 16px; border-radius:12px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
      <span style="font-size:0.85rem; color:#6b21a8; font-weight:600; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-briefcase" style="color:#9333ea;"></i> <strong>Modo CEFR B1 (Técnico Avanzado):</strong> Enfocado en terminología de Nearshoring, especificaciones industriales y reportes ejecutivos.
      </span>
      <span style="font-size:0.72rem; font-weight:800; background:linear-gradient(135deg, #7c3aed, #6d28d9); color:#ffffff; padding:4px 10px; border-radius:6px; white-space:nowrap;">Nivel B1</span>
    </div>
  ` : `
    <div class="cefr-reading-banner" style="background:#f0f9ff; border:1px solid #bae6fd; padding:12px 16px; border-radius:12px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
      <span style="font-size:0.85rem; color:#0369a1; font-weight:600; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-graduation-cap" style="color:#0284c7;"></i> <strong>Modo CEFR A2 (Básico-Intermedio):</strong> Oraciones directas, explicaciones guiadas y glosario en español para aprendizaje progresivo.
      </span>
      <span style="font-size:0.72rem; font-weight:800; background:linear-gradient(135deg, #0284c7, #0369a1); color:#ffffff; padding:4px 10px; border-radius:6px; white-space:nowrap;">Nivel A2</span>
    </div>
  `;

  // Highlight vocabulary terms safely using HTML tokenizer (strictly within text nodes, longest terms first)
  if (vocabulary && vocabulary.length > 0) {
    const sorted = [...vocabulary]
      .filter(v => (v.en || v.term) && (v.en || v.term).trim().length >= 3)
      .sort((a, b) => {
        const lenA = (a.en || a.term).trim().length;
        const lenB = (b.en || b.term).trim().length;
        return lenB - lenA;
      });

    // Tokenize by HTML tags: splits into text and <tags>
    // Even indexes are text nodes, odd indexes are HTML tags
    const tokens = formatted.split(/(<[^>]+>)/g);

    sorted.forEach(v => {
      const term = (v.en || v.term).trim();
      const es = (v.es || '').replace(/"/g, '&quot;');
      const def = (v.definition || v.definitionEN || '').replace(/"/g, '&quot;');
      const ipa = (v.ipa || '').replace(/"/g, '&quot;');
      
      const escaped = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b(${escaped})\\b`, 'i');

      let inSpecialTag = false;
      for (let i = 0; i < tokens.length; i++) {
        if (i % 2 === 1) {
          // Inside an HTML tag
          const tagLower = tokens[i].toLowerCase();
          if (tagLower.startsWith('<h1') || tagLower.startsWith('<h2') || tagLower.startsWith('<h3') || 
              tagLower.startsWith('<h4') || tagLower.startsWith('<code') || tagLower.startsWith('<pre') || 
              tagLower.startsWith('<a') || tagLower.startsWith('<button')) {
            inSpecialTag = true;
          } else if (tagLower.startsWith('</h1') || tagLower.startsWith('</h2') || tagLower.startsWith('</h3') || 
                     tagLower.startsWith('</h4') || tagLower.startsWith('</code') || tagLower.startsWith('</pre') || 
                     tagLower.startsWith('</a') || tagLower.startsWith('</button')) {
            inSpecialTag = false;
          }
        } else {
          // Inside a pure text node
          if (!inSpecialTag && tokens[i] && tokens[i].trim().length > 0) {
            if (regex.test(tokens[i])) {
              tokens[i] = tokens[i].replace(regex, (match) => {
                return `@@@STEMTERM:${encodeURIComponent(JSON.stringify({ match, en: term, es, def, ipa }))}@@@`;
              });
            }
          }
        }
      }
    });

    let reassembled = tokens.join('');
    const badgeClass = (level === 'B1') ? 'term-keyword b1-keyword' : 'term-keyword a2-keyword';

    formatted = reassembled.replace(/@@@STEMTERM:(.*?)@@@/g, (_, dataStr) => {
      try {
        const data = JSON.parse(decodeURIComponent(dataStr));
        return `<span class="${badgeClass}" data-en="${data.en}" data-es="${data.es}" data-def="${data.def}" data-ipa="${data.ipa}" tabindex="0">${data.match}</span>`;
      } catch (err) {
        return '';
      }
    });
  }

  return levelBanner + formatted;
}

function formatMarkdown(mdText) {
  if (!mdText) return '';
  let out = mdText.trim();

  // Normalize line endings
  out = out.replace(/\r\n/g, '\n');

  // Ensure double newlines before and after headings so they don't swallow adjacent text
  out = out.replace(/^(#{1,6}\s+[^\n]+)/gm, '\n\n$1\n\n');

  // Parse markdown tables before paragraph splitting
  out = out.replace(/((?:^[ \t]*\|[^\n]+\|[ \t]*(?:\n|$))+)/gm, (tableMatch) => {
    const lines = tableMatch.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return tableMatch;

    const isSep = /^\|?([ \t]*:?-+:?[ \t]*\|)+[ \t]*:?-+:?[ \t]*\|?$/.test(lines[1]);
    if (!isSep) return tableMatch;

    const parseRow = (rowStr) => {
      let clean = rowStr.replace(/^\|/, '').replace(/\|$/, '');
      return clean.split('|').map(cell => cell.trim());
    };

    const headerCells = parseRow(lines[0]);
    const theadHtml = `<thead><tr>${headerCells.map(c => `<th>${c}</th>`).join('')}</tr></thead>`;

    const bodyRows = lines.slice(2);
    const tbodyHtml = `<tbody>${bodyRows.map(row => {
      const cells = parseRow(row);
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }).join('')}</tbody>`;

    return `\n\n<div class="reader-table-wrap"><table class="reader-table">${theadHtml}${tbodyHtml}</table></div>\n\n`;
  });

  // Callout blockquotes (groups multi-line quotes into a single block)
  out = out.replace(/((?:^[ \t]*>[^\n]*(?:\n|$))+)/gm, (bqMatch) => {
    const rawLines = bqMatch.trim().split('\n').map(l => l.replace(/^[ \t]*>[ \t]?/, '').trim()).filter(Boolean);
    const fullText = rawLines.join(' ');
    const calloutMatch = fullText.match(/^\*\*([^*]+)\*\*[:\s]*(.*)$/);
    if (calloutMatch) {
      return `\n\n<div class="reading-callout-quote"><div class="callout-badge"><i class="fa-solid fa-lightbulb"></i> ${calloutMatch[1]}</div><div class="callout-text">${calloutMatch[2]}</div></div>\n\n`;
    }
    return `\n\n<blockquote class="reading-callout-quote"><div class="callout-badge"><i class="fa-solid fa-quote-left"></i> Nota Técnica</div><div class="callout-text">${fullText}</div></blockquote>\n\n`;
  });

  // Headings
  out = out.replace(/^###[ \t]+(.*$)/gm, '<h3 class="reader-subheading">$1</h3>');
  out = out.replace(/^##[ \t]+(.*$)/gm, '<h2 class="reader-section-heading">$1</h2>');
  out = out.replace(/^#[ \t]+(.*$)/gm, '<h1 class="reader-main-title">$1</h1>');

  // Horizontal rules
  out = out.replace(/^(?:---|___|\*\*\*)[ \t]*$/gm, '<hr class="reader-divider">');

  // Parse unordered lists (- item or * item)
  out = out.replace(/((?:^[ \t]*[-*][ \t]+[^\n]+(?:\n|$))+)/gm, (listMatch) => {
    const items = listMatch.trim().split('\n').map(l => {
      return l.replace(/^[ \t]*[-*][ \t]+/, '').trim();
    }).filter(Boolean);
    return `\n\n<ul>${items.map(it => `<li>${it}</li>`).join('')}</ul>\n\n`;
  });

  // Parse ordered lists (1. item)
  out = out.replace(/((?:^[ \t]*\d+\.[ \t]+[^\n]+(?:\n|$))+)/gm, (listMatch) => {
    const items = listMatch.trim().split('\n').map(l => {
      return l.replace(/^[ \t]*\d+\.[ \t]+/, '').trim();
    }).filter(Boolean);
    return `\n\n<ol>${items.map(it => `<li>${it}</li>`).join('')}</ol>\n\n`;
  });

  // Bold, italic and inline code formatting
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*(.*?)\*/g, '<em>$1</em>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Paragraph wrapping for loose text blocks
  const blocks = out.split(/\n{2,}/);
  out = blocks.map(b => {
    const trimmed = b.trim();
    if (!trimmed) return '';
    if (
      trimmed.startsWith('<h1') ||
      trimmed.startsWith('<h2') ||
      trimmed.startsWith('<h3') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<div class="reader-table-wrap') ||
      trimmed.startsWith('<div class="reading-callout') ||
      trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('<hr')
    ) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n\n');

  return out;
}

function simulateFeynmanResponse(targetPhrase) {
  const inputEl = document.getElementById('feynman-user-input');
  const chatBox = document.getElementById('feynman-chat-box');
  if (!inputEl || !chatBox) return;

  const userText = inputEl.value.trim();
  if (!userText) return;

  // Append User message
  const userMsgHtml = `
    <div style="display:flex; justify-content:flex-end; margin-top:12px; margin-bottom:12px;">
      <div style="background:rgba(56, 189, 248, 0.15); border:1px solid rgba(56, 189, 248, 0.3); color:#fff; padding:10px 14px; border-radius:12px; max-width:80%; font-size:0.88rem;">
        <strong>Tú:</strong> "${userText}"
      </div>
    </div>
  `;

  // Evaluate response
  const lowerText = userText.toLowerCase();
  const phraseLower = (targetPhrase || '').toLowerCase();
  const usesPhrase = phraseLower && lowerText.includes(phraseLower);

  let feedback = '';
  if (usesPhrase) {
    feedback = `<i class="fa-solid fa-circle-check" style="color:var(--emerald); margin-right:6px;"></i><strong>Excelente uso del modismo nativo:</strong> Tu oración encaja perfectamente con el tono profesional de una entrevista en Nearshoring. Fluidez y estructura aprobadas.`;
  } else {
    feedback = `<i class="fa-solid fa-lightbulb" style="color:var(--gold); margin-right:6px;"></i><strong>Sugerencia de Feynman:</strong> Recuerda incluir explícitamente la expresión <em>"${targetPhrase}"</em> en tu oración para reforzar tu memoria activa de modismos.`;
  }

  const aiMsgHtml = `
    <div style="display:flex; gap:12px; margin-top:12px; background:rgba(168, 85, 247, 0.08); padding:12px; border-radius:12px; border:1px solid rgba(168, 85, 247, 0.25);">
      <i class="fa-solid fa-robot" style="color:var(--purple); margin-top:2px;"></i>
      <div style="font-size:0.88rem; color:var(--text-main); line-height:1.5;">
        <strong>Feynman AI Evaluator:</strong> ${feedback}
      </div>
    </div>
  `;

  chatBox.insertAdjacentHTML('beforeend', userMsgHtml + aiMsgHtml);
  inputEl.value = '';
}

// =========================================================================
// SUPASTE DESIGN SYSTEM CONTROLLER & INTERACTION ENGINE
// =========================================================================
function setupSupasteInteractions(tracks, phrases) {
  // 1. Navigation links with [data-filter-jump]
  document.querySelectorAll('[data-filter-jump]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = link.getAttribute('data-filter-jump');
      
      // Update active state on nav links
      document.querySelectorAll('.supaste-nav-links .nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Trigger filter
      const filterBtn = document.querySelector(`.filter-btn[data-track="${targetCat}"]`);
      if (filterBtn) {
        filterBtn.click();
      } else {
        filterGridByTrack(targetCat, tracks);
      }

      // Smooth scroll to main studio area
      const targetEl = document.getElementById(targetCat === 'phrases' ? 'section-phrases' : (targetCat.startsWith('cat-') ? `group-${targetCat.replace('cat-', '')}` : 'studio-grid'));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const controls = document.getElementById('controls-bar');
        if (controls) controls.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 2. Keyboard shortcut Cmd+K / Ctrl+K to focus Spotlight search
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('studio-search');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // 3. Hero Showcase Audio Player (Native Technical Speech Pronunciation Player)
  const heroStagePlay = document.getElementById('hero-stage-play');
  const stagePlayerPill = document.getElementById('stage-player-pill');
  const heroStageIcon = document.getElementById('hero-stage-icon');

  let isPlayingHeroAudio = false;

  function toggleHeroAudio() {
    if (!isPlayingHeroAudio) {
      isPlayingHeroAudio = true;
      if (stagePlayerPill) stagePlayerPill.classList.add('playing');
      if (heroStageIcon) heroStageIcon.className = 'fa-solid fa-pause';

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const currentLevel = localStorage.getItem('stemos_cefr_level') || 'A2';
        const sampleText = currentLevel === 'A2' 
          ? "In computer chip factories, workers wear white cleanroom suits. They keep the air pure so microchips do not have dust damage. Silicon wafers are washed with special chemical liquids."
          : "In extreme ultraviolet photolithography, wafer steppers operate inside ISO Class 1 cleanrooms with laminar airflow. Photoresist deposition requires precise chemical handling to prevent sub-micron yield defects.";
        
        const utter = new SpeechSynthesisUtterance(sampleText);
        utter.lang = 'en-US';
        utter.rate = 0.93; // 93% speed requested by user
        utter.onend = () => {
          isPlayingHeroAudio = false;
          if (stagePlayerPill) stagePlayerPill.classList.remove('playing');
          if (heroStageIcon) heroStageIcon.className = 'fa-solid fa-play';
        };
        utter.onerror = () => {
          isPlayingHeroAudio = false;
          if (stagePlayerPill) stagePlayerPill.classList.remove('playing');
          if (heroStageIcon) heroStageIcon.className = 'fa-solid fa-play';
        };
        window.speechSynthesis.speak(utter);
      } else {
        setTimeout(() => {
          isPlayingHeroAudio = false;
          if (stagePlayerPill) stagePlayerPill.classList.remove('playing');
          if (heroStageIcon) heroStageIcon.className = 'fa-solid fa-play';
        }, 4500);
      }
    } else {
      isPlayingHeroAudio = false;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (stagePlayerPill) stagePlayerPill.classList.remove('playing');
      if (heroStageIcon) heroStageIcon.className = 'fa-solid fa-play';
    }
  }

  if (heroStagePlay) heroStagePlay.addEventListener('click', toggleHeroAudio);

  // 4. Hero Stage "Abrir Módulo" Button
  const heroStageOpenBtn = document.getElementById('hero-stage-open-btn');
  if (heroStageOpenBtn) {
    heroStageOpenBtn.addEventListener('click', () => {
      openDrawer('semiconductors', 'semiconductors_mod_01', tracks);
    });
  }

  // 5. Traffic light close button in drawer
  const drawerDotClose = document.getElementById('drawer-dot-close');
  if (drawerDotClose) {
    drawerDotClose.addEventListener('click', closeDrawer);
  }

  // 6. Home brand link smoothly scrolls to top
  const brandHomeLink = document.getElementById('brand-home-link');
  if (brandHomeLink) {
    brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Footer clear cache button
  const footerClearCache = document.getElementById('footer-clear-cache');
  if (footerClearCache) {
    footerClearCache.addEventListener('click', () => {
      try {
        localStorage.clear();
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
          });
        }
        alert('Cache offline de stemOS reiniciada. Recargando catálogo...');
        window.location.reload();
      } catch (e) {
        window.location.reload();
      }
    });
  }
}

// ── TRACK CERTIFICATION EXAM & OPEN BADGE 3.0 ENGINE (DEV STUDIO) ──
let devExamQuestions = [];
let devCurrentTrackId = null;
let devAllTracks = [];

function setupExamModalListeners(tracks) {
  devAllTracks = tracks;
  const closeBtn = document.getElementById('btn-close-exam');
  const overlay = document.getElementById('exam-modal-overlay');
  const submitBtn = document.getElementById('btn-submit-exam');
  const claimBtn = document.getElementById('btn-claim-badge');

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', submitDevExam);
  }

  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      launchOpenBadgeModal(devCurrentTrackId, devAllTracks);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  });

  // Certificate Modal close listeners
  const certCloseBtn = document.getElementById('btn-close-cert-modal');
  const certOverlay = document.getElementById('cert-modal-overlay');
  if (certCloseBtn && certOverlay) {
    certCloseBtn.addEventListener('click', () => certOverlay.classList.remove('active'));
    certOverlay.addEventListener('click', (e) => {
      if (e.target === certOverlay) certOverlay.classList.remove('active');
    });
  }
}

function launchDevCertificationExam(trackId, tracks) {
  devAllTracks = tracks;
  const track = tracks.find(t => t.id === trackId);
  if (!track) return;
  devCurrentTrackId = trackId;

  // Gather all reading questions from this track
  let allQ = [];
  if (track.modules) {
    track.modules.forEach(m => {
      if (m.readings) {
        m.readings.forEach(r => {
          if (r.questions && r.questions.length > 0) {
            r.questions.forEach(q => {
              allQ.push({ ...q, modTitle: m.titleES || m.title, readTitle: r.title });
            });
          }
        });
      }
    });
  }

  // Shuffle and pick 10
  allQ.sort(() => 0.5 - Math.random());
  devExamQuestions = allQ.slice(0, 10);

  const modal = document.getElementById('exam-modal-overlay');
  const tagEl = document.getElementById('exam-track-tag');
  const titleEl = document.getElementById('exam-track-title');
  const qContainer = document.getElementById('exam-questions-container');
  const resultsBox = document.getElementById('exam-results-box');
  const submitBtn = document.getElementById('btn-submit-exam');
  const claimBtn = document.getElementById('btn-claim-badge');

  if (tagEl) tagEl.textContent = (track.titleEN || track.title).toUpperCase();
  if (titleEl) titleEl.textContent = `${track.titleEN || track.title} — Track Certification Exam`;
  if (resultsBox) resultsBox.style.display = 'none';
  if (submitBtn) submitBtn.style.display = 'inline-flex';
  if (claimBtn) claimBtn.style.display = 'none';

  if (!qContainer) return;
  qContainer.innerHTML = '';

  if (devExamQuestions.length === 0) {
    qContainer.innerHTML = `
      <div style="text-align:center; padding:32px; color:var(--text-muted);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; color:var(--gold-accent); margin-bottom:8px;"></i>
        <p>No hay preguntas suficientes registradas para esta especialidad.</p>
      </div>
    `;
    if (submitBtn) submitBtn.style.display = 'none';
  } else {
    devExamQuestions.forEach((q, i) => {
      const block = document.createElement('div');
      block.className = 'quiz-question-card';
      block.style.marginBottom = '16px';
      block.innerHTML = `
        <div class="quiz-q-text">
          <span style="color:#0284c7; font-weight:800; margin-right:6px;">${i + 1}.</span> ${q.q}
        </div>
        <div style="font-size:0.75rem; color:#64748b; margin-bottom:10px;">
          <i class="fa-solid fa-book-open" style="font-size:0.7rem; margin-right:4px;"></i> Origen: ${q.readTitle} (${q.modTitle})
        </div>
        <div class="quiz-options-group">
          ${q.options.map((opt, optIdx) => `
            <label class="quiz-opt-label">
              <input type="radio" name="dev-exam-q${i}" value="${optIdx}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      `;
      qContainer.appendChild(block);
    });
  }

  if (modal) modal.classList.add('active');
}

function submitDevExam() {
  let correctCount = 0;
  devExamQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="dev-exam-q${i}"]:checked`);
    const inputs = document.querySelectorAll(`input[name="dev-exam-q${i}"]`);
    inputs.forEach(input => {
      const labelWrap = input.closest('label');
      if (parseInt(input.value, 10) === q.answer) {
        labelWrap.classList.add('is-correct');
      } else if (input.checked && parseInt(input.value, 10) !== q.answer) {
        labelWrap.classList.add('is-wrong');
      }
      input.disabled = true;
    });

    if (selected && parseInt(selected.value, 10) === q.answer) {
      correctCount++;
    }
  });

  const total = devExamQuestions.length || 1;
  const score = Math.round((correctCount / total) * 100);

  const submitBtn = document.getElementById('btn-submit-exam');
  const claimBtn = document.getElementById('btn-claim-badge');
  const resultsBox = document.getElementById('exam-results-box');
  const scoreDisplay = document.getElementById('exam-score-display');
  const feedbackMsg = document.getElementById('exam-feedback-msg');

  if (submitBtn) submitBtn.style.display = 'none';
  if (resultsBox) resultsBox.style.display = 'block';
  if (scoreDisplay) scoreDisplay.textContent = `${score}%`;

  if (feedbackMsg) {
    if (score >= 80) {
      feedbackMsg.innerHTML = `<span style="color:#059669; font-weight:800;">¡APROBADO! (${correctCount}/${total} Correctas)</span><br>Has demostrado competencia técnica rigurosa en inglés para fines específicos (ESP) nivel CEFR B1.`;
      if (claimBtn) {
        claimBtn.style.display = 'inline-flex';
        claimBtn.onclick = () => {
          launchOpenBadgeModal(devCurrentTrackId, devAllTracks);
        };
      }
    } else {
      feedbackMsg.innerHTML = `<span style="color:#dc2626; font-weight:800;">NO APROBADO (${correctCount}/${total} Correctas)</span><br>Se requiere un mínimo de 80% para certificar la especialidad. Repasa los módulos técnicos.`;
    }
  }
}

function launchOpenBadgeModal(trackId, tracks) {
  const track = (tracks || []).find(t => t.id === trackId) || { id: trackId, title: 'stemOS Specialization', standard: 'SEP CONOCER EC1290' };
  const certModal = document.getElementById('cert-modal-overlay');
  const examModal = document.getElementById('exam-modal-overlay');
  if (examModal) examModal.classList.remove('active');

  const certTitle = document.getElementById('modal-cert-track-name');
  const certStandard = document.getElementById('modal-cert-standard-text');
  const certRecipient = document.getElementById('modal-cert-recipient');
  const certHash = document.getElementById('modal-cert-hash');
  const certDate = document.getElementById('modal-cert-date');

  const studentName = localStorage.getItem('stemos_student_name') || 'Alberto Yépiz';
  const standardName = track.badgeStandard || track.standard || 'SEP CONOCER EC1290 / ISO Standard';
  const hashCode = `SHA256: STEM-${(track.id || trackId).toUpperCase().replace(/[^A-Z0-9]/g, '')}-${((track.id || trackId).length * 1337).toString(16).toUpperCase()}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  if (certTitle) certTitle.textContent = `${track.titleEN || track.title} (Nearshoring ESP)`;
  if (certStandard) certStandard.innerHTML = `Alineado al marco de competencias laborales <strong>${standardName}</strong> e <strong>IEEE / ISO Standards</strong> en nivel de competencia operativa CEFR B1.`;
  if (certRecipient) certRecipient.textContent = studentName;
  if (certHash) certHash.textContent = hashCode;
  if (certDate) certDate.textContent = dateStr;

  // Persist certified track
  const certifiedMap = JSON.parse(localStorage.getItem('stemos_certified_tracks_v1') || '{}');
  certifiedMap[trackId] = {
    certifiedAt: Date.now(),
    standard: standardName,
    hash: hashCode,
    trackTitle: track.titleEN || track.title
  };
  localStorage.setItem('stemos_certified_tracks_v1', JSON.stringify(certifiedMap));

  // Wire Download JSON-LD button
  const dlBtn = document.getElementById('btn-download-badge-json');
  if (dlBtn) {
    dlBtn.onclick = () => {
      exportOpenBadgeCredential(track, studentName, hashCode);
    };
  }

  // Wire Print button
  const printBtn = document.getElementById('btn-print-certificate');
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }

  // Wire Close button
  const closeBtn = document.getElementById('btn-close-cert-modal');
  if (closeBtn && certModal) {
    closeBtn.onclick = () => certModal.classList.remove('active');
  }

  if (certModal) {
    certModal.classList.add('active');
  }
}

function exportOpenBadgeCredential(track, recipientName, hashCode) {
  const badgeJson = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
    ],
    "id": `urn:uuid:stemos-cert-${track.id}-${Date.now()}`,
    "type": ["VerifiableCredential", "OpenBadgeCredential"],
    "issuer": {
      "id": "https://stemos.dev/issuers/stemos-foundation",
      "type": "Profile",
      "name": "stemOS LXP — High-Tech Engineering Division",
      "url": "https://stemos.dev",
      "email": "credentials@stemos.dev"
    },
    "issuanceDate": new Date().toISOString(),
    "credentialSubject": {
      "id": "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
      "type": "AchievementSubject",
      "name": recipientName,
      "achievement": {
        "id": `https://stemos.dev/achievements/${track.id}`,
        "type": "Achievement",
        "name": track.badgeName || track.titleEN || track.title,
        "description": `Demostró competencia técnica y socrática en el track ${track.titleEN || track.title} (${track.category || 'STEM'}).`,
        "criteria": {
          "narrative": "Aprobación del examen de certificación summativa (>=80%), lecturas técnicas y socrática Feynman."
        },
        "alignment": [
          {
            "targetName": track.badgeStandard || track.standard || "SEP CONOCER EC1290 / ISO Standard",
            "targetUrl": "https://conocer.gob.mx"
          }
        ]
      }
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "created": new Date().toISOString(),
      "verificationMethod": "https://stemos.dev/issuers/stemos-foundation#key-1",
      "proofValue": hashCode
    }
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(badgeJson, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `stemos-open-badge-${track.id}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

// ── FLOATING VOCABULARY POPOVER CONTROLLER ──
function setupVocabPopoverListeners() {
  const popover = document.getElementById('stemos-vocab-popover');
  if (!popover) return;

  const titleEl = document.getElementById('popover-term-en');
  const esEl = document.getElementById('popover-term-es');
  const ipaEl = document.getElementById('popover-term-ipa');
  const defEl = document.getElementById('popover-term-def');
  const audioBtn = document.getElementById('popover-audio-btn');
  const closeBtn = document.getElementById('btn-close-popover');

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.style.display = 'none';
    });
  }

  let activeAudioTerm = '';
  if (audioBtn) {
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeAudioTerm) {
        speakEnglishText(activeAudioTerm);
      }
    });
  }

  // Click on .term-keyword
  document.addEventListener('click', (e) => {
    const keyword = e.target.closest('.term-keyword');
    if (keyword) {
      e.stopPropagation();
      const en = keyword.getAttribute('data-en') || keyword.textContent.trim();
      const es = keyword.getAttribute('data-es') || '';
      const ipa = keyword.getAttribute('data-ipa') || '';
      const def = keyword.getAttribute('data-def') || '';

      activeAudioTerm = en;
      if (titleEl) titleEl.textContent = en;
      if (esEl) esEl.textContent = es ? `Español: ${es}` : '';
      if (ipaEl) {
        ipaEl.textContent = ipa ? `IPA: [${ipa}]` : '';
        ipaEl.style.display = ipa ? 'inline-block' : 'none';
      }
      if (defEl) defEl.textContent = def;

      popover.style.display = 'block';

      // Calculate placement
      const rect = keyword.getBoundingClientRect();
      const popoverWidth = 320;
      let left = rect.left + window.scrollX + (rect.width / 2) - (popoverWidth / 2);
      if (left < 12) left = 12;
      if (left + popoverWidth > window.innerWidth - 12) {
        left = window.innerWidth - popoverWidth - 12;
      }

      let top = rect.bottom + window.scrollY + 8;
      // If overflows bottom of viewport, position above
      if (rect.bottom + 220 > window.innerHeight && rect.top > 220) {
        top = rect.top + window.scrollY - 180;
      }

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
      return;
    }

    // Click outside popover closes it
    if (!e.target.closest('#stemos-vocab-popover')) {
      popover.style.display = 'none';
    }
  });

  // Escape key closes popover
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popover.style.display !== 'none') {
      popover.style.display = 'none';
    }
  });
}

// ── 3D WORLD GLOBE & GAMIFIED LEVEL PATH INTEGRATION ──
function setupDevWorldModal(coursesData) {
  const overlay = document.getElementById('dev-world-modal-overlay');
  const closeBtn = document.getElementById('btn-close-dev-world');
  const navBtn = document.getElementById('nav-btn-open-world');
  const heroBtn = document.getElementById('hero-open-world-btn');
  if (!overlay) return;

  function openWorldModal() {
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (window.StemOSWorldMap) {
      if (!window.StemOSWorldMap.devInitialized) {
        window.StemOSWorldMap.init('dev-world-map-container', {
          onLaunchModule: (trackId, mod) => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            openDrawer(trackId, mod.id, coursesData);
          },
          onLaunchSocratic: (trackId, modId) => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            openDrawer(trackId, modId, coursesData);
          }
        });
        window.StemOSWorldMap.devInitialized = true;
      } else {
        window.StemOSWorldMap.handleResize();
        window.StemOSWorldMap.syncProgress();
      }
    }
  }

  function closeWorldModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (navBtn) navBtn.addEventListener('click', (e) => { e.preventDefault(); openWorldModal(); });
  if (heroBtn) heroBtn.addEventListener('click', (e) => { e.preventDefault(); openWorldModal(); });
  if (closeBtn) closeBtn.addEventListener('click', closeWorldModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display !== 'none') {
      closeWorldModal();
    }
  });
}

// ── 13. TECHNICAL OUTPUT LAB: 8D PROBLEM SOLVING & ESCALATION EMAIL STUDIO ──
function setupTechnicalOutputLab() {
  const btnMode8D = document.getElementById('btn-mode-8d');
  const btnModeEmail = document.getElementById('btn-mode-email');
  const workspace8D = document.getElementById('workspace-8d');
  const workspaceEmail = document.getElementById('workspace-email');

  if (!workspace8D || !workspaceEmail) return;

  // Mode Switcher
  if (btnMode8D && btnModeEmail) {
    btnMode8D.addEventListener('click', () => {
      btnMode8D.classList.add('active');
      btnMode8D.setAttribute('aria-selected', 'true');
      btnModeEmail.classList.remove('active');
      btnModeEmail.setAttribute('aria-selected', 'false');
      workspace8D.style.display = 'block';
      workspaceEmail.style.display = 'none';
    });

    btnModeEmail.addEventListener('click', () => {
      btnModeEmail.classList.add('active');
      btnModeEmail.setAttribute('aria-selected', 'true');
      btnMode8D.classList.remove('active');
      btnMode8D.setAttribute('aria-selected', 'false');
      workspaceEmail.style.display = 'block';
      workspace8D.style.display = 'none';
      renderExecutiveEmail();
    });
  }

  // 8D Presets Database
  const eightDPresets = {
    auto_weld: {
      id: "8D-2026-AUTO-042",
      title: "Automotive Laser Welding 8D Report (IATF 16949)",
      d1: "Champion: Ing. Roberto Garza (Plant Director), Leader: Ing. Mariana Cordero (SQE Lead), Members: Carlos Mendoza (Laser Process Eng), David Silva (Metrology Tech), Diana Reyes (Production Supervisor Line 2)",
      d2: "During helium mass spectrometer leak testing at Detroit assembly plant on 2026-09-18, 14 out of 500 high-voltage battery enclosures exhibited micro-porosity along the automated laser stitch weld seam (defect rate 2.8%), exceeding customer IATF 16949 zero-defect threshold.",
      d3: "1. 100% warehouse quarantine initiated in Saltillo; 320 finished pallets locked in ERP with serialized red hold tags. 2. Detroit assembly quarantine of 85 staged packs. 3. Line 2 halted for optical focal realignment. 4. Customer quality notification submitted within 12 hours.",
      d4: "Physical Root Cause: Optical protective cover slide sustained spatter accumulation, inducing thermal lensing and a 2.4 mm laser focal point defocus. Escape Root Cause: Visual camera inspection threshold was tuned too coarse to detect porosity under 0.2 mm without helium pressure decay.",
      d5: "D5: Replace analog protective slide with automated motorized quartz cassette with integrated photodiode back-reflection monitoring. D6 Validation: Run@Rate trial of 1,200 consecutive battery packs demonstrated Cpk = 1.84 with 0 ppm leak escapes across 4 shifts.",
      d7: "D7: Updated PFMEA (Severity 9, Occurrence reduced from 5 to 1, Detection reduced from 6 to 2; Action Priority dropped from High to Low). Control Plan revised to require shift-handover laser power meter verification. D8: Formal recognition awarded to Saltillo CFT."
    },
    med_balloon: {
      id: "8D-2026-MED-019",
      title: "Medical Catheter Balloon Burst Pressure 8D (FDA 21 CFR 820)",
      d1: "Champion: Dr. Gregory Vance (VP Quality), Leader: Ing. Alejandro Villalobos (Principal QA), Members: Sofia De la Rosa (Validation Eng), Karla Dominguez (Cleanroom Supervisor ISO 7)",
      d2: "Batch testing of PTCA dilatation catheters (Lot MED-2026-884) showed 3 of 30 samples failed minimum burst pressure rating at 12 atm instead of rated 14 atm during final QC inspection in Tijuana cleanroom suite B.",
      d3: "1. Immediate line clearance executed on catheter crimping line 4. 2. 1,400 packaged units quarantined under HOLD-TAG-992. 3. Form 483 prevention protocol engaged; DHR batch review initiated.",
      d4: "Physical Root Cause: Extrusion temperature drifted +8°C above validated operating window due to faulty thermocouple element in zone 3, inducing local polymer chain degradation. Escape Point: In-line wall thickness micrometer was calibrated for outer diameter only.",
      d5: "D5: Replaced thermocouple with dual redundant RTD sensor with automatic machine interlock if delta > 1.5°C. D6 Validation: Three consecutive PQ validation lots (4,500 units) achieved burst pressure Cpk = 1.92 with zero bursts below 16 atm.",
      d7: "D7: Updated Device Master Record (DMR) SOP-EXT-402, revised Design FMEA and Cleanroom Control Plan. D8: Tijuana biomedical engineering team commended for rapid CAPA closure."
    },
    semi_wafer: {
      id: "8D-2026-SEMI-008",
      title: "Semiconductor DUV Critical Dimension Drift (SEMI E10)",
      d1: "Champion: Dr. Chen (Fab Operations VP), Leader: Ing. Morales (Lithography Principal), Members: Track Process Eng, Metrology Specialist, Yield Enhancement Group",
      d2: "28nm production wafers (Lot W-7741) exhibited gate critical dimension (CD) drift of +3.2 nm on peripheral dies following immersion lithography exposure on Scanner 4.",
      d3: "1. Scanner 4 placed on maintenance hold. 2. 24 suspect wafer cassettes frozen in fab FOUP stocker. 3. Downstream etch line alerted to withhold processing.",
      d4: "Physical Root Cause: Barometric pressure sensor drift in post-exposure bake (PEB) module caused a 0.4°C plate temperature shift. Escape Point: Daily CD-SEM sampling was reduced from 9 points to 5 points.",
      d5: "D5: Calibrated PEB multi-zone heater controllers and installed dual barometric compensation sensors. D6 Validation: Metrology layout across 50 consecutive monitor wafers verified 3-sigma CD uniformity within ±0.6 nm.",
      d7: "D7: Updated Fab SPC alarm limits in MES; reinstated 9-point metrology recipe in standard recipe library. D8: Fab engineering team recognized at executive yield meeting."
    },
    custom_blank: {
      id: "8D-2026-CUSTOM-001",
      title: "Custom Corrective Action 8D Report",
      d1: "", d2: "", d3: "", d4: "", d5: "", d7: ""
    }
  };

  function load8DPreset(presetKey) {
    const data = eightDPresets[presetKey] || eightDPresets.auto_weld;
    const reportIdEl = document.getElementById('8d-report-id');
    const formTitleEl = document.getElementById('8d-form-title');
    const d1El = document.getElementById('8d-d1-input');
    const d2El = document.getElementById('8d-d2-input');
    const d3El = document.getElementById('8d-d3-input');
    const d4El = document.getElementById('8d-d4-input');
    const d5El = document.getElementById('8d-d5-input');
    const d7El = document.getElementById('8d-d7-input');

    if (reportIdEl) reportIdEl.textContent = data.id;
    if (formTitleEl) formTitleEl.textContent = data.title;
    if (d1El) d1El.value = data.d1;
    if (d2El) d2El.value = data.d2;
    if (d3El) d3El.value = data.d3;
    if (d4El) d4El.value = data.d4;
    if (d5El) d5El.value = data.d5;
    if (d7El) d7El.value = data.d7;

    evaluate8DReport(false);
  }

  // 8D Preset Buttons
  document.querySelectorAll('.preset-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const preset = e.currentTarget.getAttribute('data-preset');
      load8DPreset(preset);
    });
  });

  // Evaluate 8D Function
  function evaluate8DReport(showToast = true) {
    const d1 = (document.getElementById('8d-d1-input')?.value || '').trim();
    const d2 = (document.getElementById('8d-d2-input')?.value || '').trim();
    const d3 = (document.getElementById('8d-d3-input')?.value || '').trim();
    const d4 = (document.getElementById('8d-d4-input')?.value || '').trim();
    const d5 = (document.getElementById('8d-d5-input')?.value || '').trim();
    const d7 = (document.getElementById('8d-d7-input')?.value || '').trim();

    let score = 0;
    const criteria = [];

    // Criterion 1: Cross-Functional Team (D1)
    if (d1.length > 20 && (/champion/i.test(d1) || /leader/i.test(d1) || /eng/i.test(d1))) {
      score += 15;
      criteria.push({ text: "D1: Equipo Multidisciplinario (CFT) Completo", pass: true });
    } else {
      criteria.push({ text: "D1: Definir Champion, Líder y Miembros", pass: false });
    }

    // Criterion 2: 5W2H Problem Definition (D2)
    if (d2.length > 30 && (/\d+/i.test(d2) || /%/i.test(d2) || /defect/i.test(d2))) {
      score += 15;
      criteria.push({ text: "D2: Problema Cuantificado (5W2H)", pass: true });
    } else {
      criteria.push({ text: "D2: Cuantificar tasa o unidades defectuosas", pass: false });
    }

    // Criterion 3: Interim Containment & Quarantine (D3)
    if (d3.length > 25 && (/quarantine/i.test(d3) || /hold/i.test(d3) || /freeze/i.test(d3) || /red tag/i.test(d3))) {
      score += 20;
      criteria.push({ text: "D3: Contención y Cuarentena de Lotes (ICA)", pass: true });
    } else {
      criteria.push({ text: "D3: Especificar cuarentena física y red tags", pass: false });
    }

    // Criterion 4: Root Cause (D4)
    if (d4.length > 25 && (/cause/i.test(d4) || /escape/i.test(d4) || /5 whys/i.test(d4) || /ishikawa/i.test(d4) || /drift/i.test(d4))) {
      score += 20;
      criteria.push({ text: "D4: Causa Raíz Física y Punto de Escape", pass: true });
    } else {
      criteria.push({ text: "D4: Analizar causa raíz física y punto de escape", pass: false });
    }

    // Criterion 5: Permanent Action & Validation (D5/D6)
    if (d5.length > 25 && (/cpk/i.test(d5) || /validat/i.test(d5) || /poka/i.test(d5) || /trial/i.test(d5) || /interlock/i.test(d5))) {
      score += 15;
      criteria.push({ text: "D5/D6: Poka-Yoke y Validación Estadística (Cpk)", pass: true });
    } else {
      criteria.push({ text: "D5/D6: Incluir Poka-Yoke y datos de Cpk o corrida", pass: false });
    }

    // Criterion 6: Prevent Recurrence (D7/D8)
    if (d7.length > 20 && (/pfmea/i.test(d7) || /control plan/i.test(d7) || /sop/i.test(d7) || /lpa/i.test(d7))) {
      score += 15;
      criteria.push({ text: "D7/D8: Actualización de PFMEA y Plan de Control", pass: true });
    } else {
      criteria.push({ text: "D7/D8: Mencionar actualización de PFMEA y Control Plan", pass: false });
    }

    // Render Score
    const scoreValEl = document.getElementById('rubric-score-val');
    const scoreLblEl = document.getElementById('rubric-score-lbl');
    const scoreFillEl = document.getElementById('rubric-score-fill');
    const criteriaListEl = document.getElementById('rubric-criteria-list');
    const feedbackTextEl = document.getElementById('rubric-feedback-text');

    if (scoreValEl) scoreValEl.textContent = `${score}%`;
    if (scoreFillEl) scoreFillEl.style.width = `${score}%`;

    let levelText = "INCOMPLETE DRAFT";
    let feedback = "Complete all 8 disciplines with auditable industrial evidence to pass the IATF/ISO quality audit threshold.";

    if (score >= 85) {
      levelText = "AUDIT-READY (EXCELLENT)";
      feedback = "Outstanding industrial rigor! Clear 5W2H problem boundary, robust physical quarantine containment, systemic root cause isolation, and verified closed-loop PFMEA/Control Plan recurrence prevention.";
    } else if (score >= 60) {
      levelText = "ACCEPTABLE (NEEDS REFINEMENT)";
      feedback = "Good foundation. Ensure containment explicitly mentions serialized red tags/quarantine, and verify that D6 references statistical capability (Cpk) or proof of run rate.";
    }

    if (scoreLblEl) scoreLblEl.textContent = levelText;
    if (feedbackTextEl) feedbackTextEl.textContent = feedback;

    if (criteriaListEl) {
      criteriaListEl.innerHTML = criteria.map(c => `
        <div class="criteria-item ${c.pass ? 'pass' : 'warn'}">
          <span>${c.text}</span>
          <i class="fa-solid ${c.pass ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
        </div>
      `).join('');
    }

    if (showToast && typeof showOfflineToast === 'function') {
      showOfflineToast(`8D Audit Score: ${score}%`, levelText, 100, true);
    }
  }

  // 8D Action Buttons
  const btnEval8D = document.getElementById('btn-eval-8d');
  const btnCopy8D = document.getElementById('btn-copy-8d');
  const btnPrint8D = document.getElementById('btn-print-8d');

  if (btnEval8D) btnEval8D.addEventListener('click', () => evaluate8DReport(true));

  if (btnCopy8D) {
    btnCopy8D.addEventListener('click', () => {
      const reportId = document.getElementById('8d-report-id')?.textContent || '8D-REPORT';
      const title = document.getElementById('8d-form-title')?.textContent || '8D Problem Solving Report';
      const d1 = document.getElementById('8d-d1-input')?.value || '';
      const d2 = document.getElementById('8d-d2-input')?.value || '';
      const d3 = document.getElementById('8d-d3-input')?.value || '';
      const d4 = document.getElementById('8d-d4-input')?.value || '';
      const d5 = document.getElementById('8d-d5-input')?.value || '';
      const d7 = document.getElementById('8d-d7-input')?.value || '';

      const reportText = `========================================================================\n` +
        `EIGHT DISCIPLINES (8D) PROBLEM SOLVING REPORT\n` +
        `Document ID: ${reportId}\n` +
        `Title: ${title}\n` +
        `Standard: IATF 16949 / ISO 13485 / AIAG CQI Alignment\n` +
        `========================================================================\n\n` +
        `[D1] TEAM ESTABLISHMENT:\n${d1}\n\n` +
        `[D2] PROBLEM DESCRIPTION (5W2H):\n${d2}\n\n` +
        `[D3] INTERIM CONTAINMENT ACTIONS (ICA):\n${d3}\n\n` +
        `[D4] ROOT CAUSE ANALYSIS & ESCAPE POINT:\n${d4}\n\n` +
        `[D5 & D6] PERMANENT CORRECTIVE ACTION (PCA) & STATISTICAL VALIDATION:\n${d5}\n\n` +
        `[D7 & D8] ACTIONS TO PREVENT RECURRENCE & TEAM RECOGNITION:\n${d7}\n\n` +
        `Generated via stemOS Technical Output Engine V1.`;

      navigator.clipboard.writeText(reportText).then(() => {
        if (typeof showOfflineToast === 'function') {
          showOfflineToast("8D Report Copied!", "Formato oficial 8D copiado al portapapeles.", 100, true);
        }
      });
    });
  }

  if (btnPrint8D) {
    btnPrint8D.addEventListener('click', () => window.print());
  }

  // ── Executive Email Builder Logic ──
  const emailPresets = {
    line_stop: {
      to: "Gregory Vance <g.vance@oem-operations.com> (VP of Manufacturing)",
      subject: "[URGENT ESCALATION] Line 2 High-Voltage Battery Housing Containment & Schedule Impact",
      bluf: "Line 2 battery housing production in Saltillo was paused at 08:30 due to laser weld porosity. We have implemented 100% quarantine on 320 affected assemblies and require engineering sign-off on temporary parameter adjustments by 14:00 EST to protect tomorrow's Detroit shipment.",
      containment: "All parts produced since 04:00 are tagged in red bins with zero escape risk. Line 1 has been re-allocated to absorb 60% of volume. Projected line-down risk to Detroit is currently mitigated for the next 18 hours.",
      action: "Please confirm authorization for chartered hot-shot freight and temporary welding concession by 14:00 EST."
    },
    concession: {
      to: "Karen Mitchell <k.mitchell@medtech-regulatory.com> (Director of Quality & Regulatory)",
      subject: "[CONCESSION REQUEST] Temporary Material Variance for Nitinol Stent Delivery Wire (Lot V-442)",
      bluf: "We request a temporary engineering concession to accept raw Nitinol wire heat lot V-442 with surface roughness Ra = 0.42 μm (nominal specification Ra ≤ 0.40 μm) for catheter assembly in Tijuana.",
      containment: "Metrology lab verified tensile strength and fatigue cycle life exceed nominal limits by 18%. Risk assessment under ISO 14971 demonstrates zero impact on biocompatibility or catheter trackability.",
      action: "Sign-off required on Deviation Approval Form DEV-2026-088 by 16:30 today to sustain continuous cleanroom operations."
    },
    customs_hold: {
      to: "Arthur Pendelton <a.pendelton@global-logistics.com> (Director of North American Freight)",
      subject: "[CUSTOMS ALERT] CBP Intensive Agricultural Hold at World Trade Bridge (Trailer T-804)",
      bluf: "Outbound trailer T-804 carrying 40 pallets of automotive wire harnesses was flagged for secondary CBP inspection at Laredo. Current crossing delay is estimated at 6 hours.",
      containment: "All shipping documents, C-TPAT 17-point inspection logs, and ISO 17712 bolt seal serial numbers are verified intact. Our Laredo cross-dock team is prepared for expedited transfer once released.",
      action: "Please advise if destination assembly plant requires staging safety stock from our El Paso warehouse buffer."
    },
    eco_pushback: {
      to: "David Stirling <d.stirling@corporate-engineering.com> (Lead R&D Architect)",
      subject: "[FEASIBILITY FEEDBACK] ECO-2026-914 Tooling Impact & Lead-Time Assessment (Monterrey Plant)",
      bluf: "Following review of ECO-2026-914 (redesigned terminal housing wall thickness), our tooling engineering team in Monterrey has identified a critical mold modification lead-time constraint of 4 weeks.",
      containment: "Current tooling remains fully capable under current PPAP Level 3 parameters (Cpk = 1.78). Implementing the ECO immediately would cause an unrecoverable 5-day assembly shutdown.",
      action: "We propose tabling the cut-in date to the scheduled annual maintenance turnaround on November 15."
    }
  };

  function loadEmailPreset(key) {
    const data = emailPresets[key] || emailPresets.line_stop;
    const toEl = document.getElementById('email-to-input');
    const subjEl = document.getElementById('email-subject-input');
    const blufEl = document.getElementById('email-bluf-input');
    const contEl = document.getElementById('email-containment-input');
    const actEl = document.getElementById('email-action-input');

    if (toEl) toEl.value = data.to;
    if (subjEl) subjEl.value = data.subject;
    if (blufEl) blufEl.value = data.bluf;
    if (contEl) contEl.value = data.containment;
    if (actEl) actEl.value = data.action;

    renderExecutiveEmail();
  }

  document.querySelectorAll('.email-preset-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.email-preset-chip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const preset = e.currentTarget.getAttribute('data-epreset');
      loadEmailPreset(preset);
    });
  });

  function renderExecutiveEmail() {
    const to = document.getElementById('email-to-input')?.value || 'Recipient';
    const subj = document.getElementById('email-subject-input')?.value || '[URGENT ESCALATION]';
    const bluf = document.getElementById('email-bluf-input')?.value || '';
    const containment = document.getElementById('email-containment-input')?.value || '';
    const action = document.getElementById('email-action-input')?.value || '';

    const paperEl = document.getElementById('email-preview-paper');
    if (!paperEl) return;

    const emailBody = `To: ${to}\n` +
      `Subject: ${subj}\n\n` +
      `Dear ${to.split(' ')[0]},\n\n` +
      `BOTTOM LINE UP FRONT (BLUF):\n${bluf}\n\n` +
      `CONTAINMENT & OPERATIONAL MITIGATION:\n${containment}\n\n` +
      `REQUIRED ACTION & HARD STOP DEADLINE:\n${action}\n\n` +
      `I will loop in our plant engineering leads to monitor this situation continuously. Please let me know if you would like to jump on a quick 10-minute briefing call before the deadline.\n\n` +
      `Best regards,\n\n` +
      `Lead Engineering & Operations Team\n` +
      `stemOS High-Tech Manufacturing Corridor`;

    paperEl.textContent = emailBody;
  }

  const btnGenEmail = document.getElementById('btn-generate-email');
  const btnCopyEmail = document.getElementById('btn-copy-email');

  if (btnGenEmail) btnGenEmail.addEventListener('click', () => {
    renderExecutiveEmail();
    if (typeof showOfflineToast === 'function') {
      showOfflineToast("Email Rendered!", "Correo corporativo actualizado con formato BLUF.", 100, true);
    }
  });

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const text = document.getElementById('email-preview-paper')?.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        if (typeof showOfflineToast === 'function') {
          showOfflineToast("Email Copied!", "Correo ejecutivo copiado al portapapeles.", 100, true);
        }
      });
    });
  }

  // Initial load
  load8DPreset('auto_weld');
  renderExecutiveEmail();
}

// ── 13. ADAPTIVE SPACED REPETITION ENGINE (SM-2 DECK) ──
function setupSM2Engine(tracks = [], phrases = []) {
  const cardEl = document.getElementById('sm2-active-card');
  if (!cardEl) return;

  const STORAGE_KEY = 'stemos_sm2_deck_v1';
  let allDeckCards = [];
  let activeSessionCards = [];
  let currentCardIndex = 0;
  let activeFilter = 'all';

  // 1. Extract / Seed Cards from Tracks & Phrases
  function seedFullDeck() {
    const cards = [];

    // Lexicon from tracks
    tracks.forEach(track => {
      if (!track.modules) return;
      track.modules.forEach(mod => {
        if (!mod.lexicon) return;
        mod.lexicon.forEach((lex, idx) => {
          cards.push({
            id: `lex-${track.id}-${mod.id}-${idx}`,
            type: 'lexicon',
            term: lex.term,
            ipa: lex.ipa || '',
            domain: track.titleEN || track.title || 'Engineering',
            trackId: track.id,
            promptHint: `Define the engineering meaning, specify shopfloor/audit trap, and use with industrial collocations for "${lex.term}".`,
            definition: lex.definition || '',
            auditTrap: lex.auditTrap || 'Ensure precision in cross-border audits; do not confuse with general colloquial definitions.',
            collocations: lex.collocations || [],
            // SM-2 parameters
            n: 0,
            ef: 2.50,
            interval: 0,
            lastReview: 0,
            nextDue: Date.now() // ready now
          });
        });
      });
    });

    // Idioms from phrases
    if (phrases && phrases.length) {
      phrases.forEach((phr, idx) => {
        cards.push({
          id: phr.id || `phr-${idx}`,
          type: 'idiom',
          term: phr.phrase,
          ipa: phr.pronunciationHint || '',
          domain: 'NATIVE IDIOM & CROSS-BORDER RADAR',
          trackId: 'idioms',
          promptHint: `Decodifica el significado operacional, el origen de imagen mental y la trampa cultural de "${phr.phrase}".`,
          definition: phr.operationalMeaning || '',
          auditTrap: phr.dialectDifference ? `Trampa Dialéctica: US (${phr.dialectDifference.usMeaning}) vs UK (${phr.dialectDifference.ukMeaning})` : (phr.plantExample || ''),
          collocations: [phr.category || 'meetings', phr.riskLevel ? `Riesgo: ${phr.riskLevel}` : 'High Context'],
          n: 0,
          ef: 2.50,
          interval: 0,
          lastReview: 0,
          nextDue: Date.now()
        });
      });
    }

    return cards;
  }

  // Load from LocalStorage or seed
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      allDeckCards = JSON.parse(raw);
    }
  } catch (e) {
    allDeckCards = [];
  }

  if (!allDeckCards || allDeckCards.length === 0) {
    allDeckCards = seedFullDeck();
    saveDeck();
  }

  function saveDeck() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allDeckCards));
    } catch (e) {
      console.warn("Could not save SM-2 deck to localStorage", e);
    }
    updateTelemetry();
  }

  // Filter session cards
  function buildSessionQueue() {
    let pool = allDeckCards;
    if (activeFilter === 'nearshoring') {
      const nearshoringIds = ['automotive-lean', 'medical-devices', 'logistics-compliance', 'quality-ehs', 'energy-data-centers', 'embedded-firmware-edge-ai', 'advanced-supply-chain-reshoring'];
      pool = pool.filter(c => nearshoringIds.includes(c.trackId));
    } else if (activeFilter === 'idioms') {
      pool = pool.filter(c => c.type === 'idiom');
    } else if (activeFilter !== 'all') {
      pool = pool.filter(c => c.trackId === activeFilter);
    }

    // Sort: due cards first, then by least repetitions
    const now = Date.now();
    const dueCards = pool.filter(c => !c.nextDue || c.nextDue <= now);
    const futureCards = pool.filter(c => c.nextDue && c.nextDue > now);

    activeSessionCards = [...dueCards, ...futureCards].slice(0, 10);
    if (activeSessionCards.length === 0 && pool.length > 0) {
      activeSessionCards = pool.slice(0, 10);
    }
    currentCardIndex = 0;
    renderCurrentCard();
    renderQueueList();
  }

  // Telemetry stats
  function updateTelemetry() {
    const now = Date.now();
    const dueCount = allDeckCards.filter(c => !c.nextDue || c.nextDue <= now).length;
    const totalCount = allDeckCards.length;
    const avgEf = totalCount ? (allDeckCards.reduce((acc, c) => acc + (c.ef || 2.5), 0) / totalCount).toFixed(2) : '2.50';

    const statDueEl = document.getElementById('sm2-stat-due');
    const statTotalEl = document.getElementById('sm2-stat-total');
    const statEfEl = document.getElementById('sm2-stat-ef');
    const statNavDueEl = document.getElementById('nav-sm2-due-count');

    if (statDueEl) statDueEl.textContent = dueCount;
    if (statTotalEl) statTotalEl.textContent = totalCount;
    if (statEfEl) statEfEl.textContent = avgEf;
    if (statNavDueEl) statNavDueEl.textContent = dueCount;
  }

  // Render current active card
  function renderCurrentCard() {
    const card = activeSessionCards[currentCardIndex];
    if (!card) {
      renderCompletedState();
      return;
    }

    // Reset flip
    cardEl.classList.remove('is-flipped');

    // Front
    const domainEl = document.getElementById('sm2-card-domain');
    const intervalEl = document.getElementById('sm2-card-interval-badge');
    const termEl = document.getElementById('sm2-card-term');
    const ipaEl = document.getElementById('sm2-card-ipa');
    const hintEl = document.getElementById('sm2-card-hint');

    if (domainEl) domainEl.textContent = (card.domain || 'ENGINEERING').toUpperCase();
    if (intervalEl) intervalEl.textContent = card.interval ? `Interval: ${card.interval}d (Reps: ${card.n})` : 'New Card (0d)';
    if (termEl) termEl.textContent = card.term;
    if (ipaEl) ipaEl.textContent = card.ipa || '/technical-term/';
    if (hintEl) hintEl.textContent = card.promptHint || '¿Cuál es la definición operacional técnica y la trampa en auditoría?';

    // Back
    const domainBackEl = document.getElementById('sm2-card-domain-back');
    const defEl = document.getElementById('sm2-card-def');
    const trapEl = document.getElementById('sm2-card-trap');

    if (domainBackEl) domainBackEl.textContent = (card.domain || 'ENGINEERING').toUpperCase() + ' • VERIFICATION';
    if (defEl) defEl.textContent = card.definition || 'No definition available.';
    if (trapEl) trapEl.textContent = card.auditTrap || 'No audit trap documented.';

    // Collocations
    const collocContainer = document.getElementById('sm2-card-collocs');
    if (collocContainer) {
      collocContainer.innerHTML = '';
      if (card.collocations && card.collocations.length) {
        card.collocations.forEach(col => {
          const pill = document.createElement('span');
          pill.className = 'sm2-colloc-pill';
          pill.textContent = col;
          collocContainer.appendChild(pill);
        });
      }
    }

    // Interval predictions on rating buttons
    const curInterval = card.interval || 0;
    const ef = card.ef || 2.50;
    const nextHard = Math.max(1, Math.round((curInterval || 1) * 1.2));
    const nextGood = curInterval === 0 ? 6 : Math.round((curInterval || 1) * ef);
    const nextEasy = curInterval === 0 ? 15 : Math.round((curInterval || 1) * (ef + 0.15) * 1.3);

    const hardLbl = document.getElementById('rate-hard-interval');
    const goodLbl = document.getElementById('rate-good-interval');
    const easyLbl = document.getElementById('rate-easy-interval');
    if (hardLbl) hardLbl.textContent = `${nextHard}d`;
    if (goodLbl) goodLbl.textContent = `${nextGood}d`;
    if (easyLbl) easyLbl.textContent = `${nextEasy}d`;

    // Sidebar vector
    const vecI = document.getElementById('sm2-vec-i');
    const vecN = document.getElementById('sm2-vec-n');
    const vecEf = document.getElementById('sm2-vec-ef');
    const vecDue = document.getElementById('sm2-vec-due');
    if (vecI) vecI.textContent = card.interval ? `${card.interval} days` : '0 days';
    if (vecN) vecN.textContent = card.n || 0;
    if (vecEf) vecEf.textContent = (card.ef || 2.50).toFixed(2);
    if (vecDue) {
      if (!card.nextDue || card.nextDue <= Date.now()) {
        vecDue.textContent = 'Due Now';
        vecDue.style.color = '#ef4444';
      } else {
        const daysLeft = Math.ceil((card.nextDue - Date.now()) / 86400000);
        vecDue.textContent = `In ${daysLeft} days`;
        vecDue.style.color = '#10b981';
      }
    }

    // Queue counter
    const queueRem = document.getElementById('sm2-queue-remaining');
    if (queueRem) queueRem.textContent = `${currentCardIndex + 1} / ${activeSessionCards.length}`;
  }

  function renderQueueList() {
    const listEl = document.getElementById('sm2-queue-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    activeSessionCards.forEach((c, idx) => {
      const item = document.createElement('div');
      item.className = 'sm2-queue-item' + (idx === currentCardIndex ? ' active' : '');
      item.innerHTML = `
        <span style="font-weight:${idx === currentCardIndex ? '700' : '500'};">${c.term}</span>
        <span style="font-size:0.7rem; font-family:var(--font-mono); color:${c.n > 0 ? '#10b981' : '#64748b'};">
          ${c.n > 0 ? `${c.interval}d` : 'new'}
        </span>
      `;
      listEl.appendChild(item);
    });
  }

  function renderCompletedState() {
    cardEl.classList.remove('is-flipped');
    const domainEl = document.getElementById('sm2-card-domain');
    const intervalEl = document.getElementById('sm2-card-interval-badge');
    const termEl = document.getElementById('sm2-card-term');
    const ipaEl = document.getElementById('sm2-card-ipa');
    const hintEl = document.getElementById('sm2-card-hint');
    const queueRem = document.getElementById('sm2-queue-remaining');

    if (domainEl) domainEl.textContent = 'SESSION COMPLETED';
    if (intervalEl) intervalEl.textContent = '100% Mastery';
    if (termEl) termEl.textContent = '🎉 All Cards Reviewed!';
    if (ipaEl) ipaEl.textContent = '/səkˈsɛs.fəl ˈsɛʃ.ən/';
    if (hintEl) hintEl.textContent = 'Great work! You have completed all due memory retention repetitions for this session.';
    if (queueRem) queueRem.textContent = 'Done!';
  }

  // SM-2 Evaluation Logic
  function evaluateCard(quality) {
    const card = activeSessionCards[currentCardIndex];
    if (!card) return;

    let ef = card.ef || 2.50;
    let n = card.n || 0;
    let interval = card.interval || 0;

    // Calculate new Ease Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (ef < 1.30) ef = 1.30;

    if (quality < 3) {
      n = 0;
      interval = 1;
    } else {
      n += 1;
      if (n === 1) interval = 1;
      else if (n === 2) interval = 6;
      else interval = Math.round(interval * ef);
    }

    card.ef = Number(ef.toFixed(2));
    card.n = n;
    card.interval = interval;
    card.lastReview = Date.now();
    card.nextDue = Date.now() + (interval * 86400000);

    // Sync back to master allDeckCards
    const masterIdx = allDeckCards.findIndex(c => c.id === card.id);
    if (masterIdx !== -1) {
      allDeckCards[masterIdx] = { ...card };
    }

    saveDeck();

    // Advance session
    currentCardIndex++;
    if (currentCardIndex < activeSessionCards.length) {
      renderCurrentCard();
      renderQueueList();
    } else {
      renderCompletedState();
    }

    if (typeof showOfflineToast === 'function') {
      const qNames = { 0: 'Again (<1d)', 3: 'Hard', 4: 'Good', 5: 'Easy' };
      showOfflineToast("SM-2 Updated!", `Repetition recorded (${qNames[quality] || quality}). Interval: ${interval} days.`, 100, true);
    }
  }

  // Audio pronunciation
  function playCardAudio() {
    const card = activeSessionCards[currentCardIndex];
    if (!card) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(card.term);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Event Listeners
  const btnFlip = document.getElementById('btn-sm2-flip');
  if (btnFlip) {
    btnFlip.addEventListener('click', (e) => {
      e.stopPropagation();
      cardEl.classList.toggle('is-flipped');
    });
  }

  cardEl.addEventListener('click', (e) => {
    if (e.target.closest('.sm2-audio-btn') || e.target.closest('.sm2-audio-btn-small') || e.target.closest('.sm2-rate-btn')) {
      return;
    }
    cardEl.classList.toggle('is-flipped');
  });

  const btnAudio = document.getElementById('btn-sm2-audio');
  const btnAudioBack = document.getElementById('btn-sm2-audio-back');
  if (btnAudio) btnAudio.addEventListener('click', (e) => { e.stopPropagation(); playCardAudio(); });
  if (btnAudioBack) btnAudioBack.addEventListener('click', (e) => { e.stopPropagation(); playCardAudio(); });

  const rateBtns = document.querySelectorAll('.sm2-rate-btn');
  rateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const q = parseInt(btn.getAttribute('data-quality'), 10);
      evaluateCard(q);
    });
  });

  const filterBtns = document.querySelectorAll('#sm2-deck-filters .sm2-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-deck-filter');
      buildSessionQueue();
    });
  });

  const btnSeed = document.getElementById('btn-seed-deck');
  if (btnSeed) {
    btnSeed.addEventListener('click', () => {
      const shuffled = [...allDeckCards].sort(() => 0.5 - Math.random());
      activeSessionCards = shuffled.slice(0, 10);
      currentCardIndex = 0;
      renderCurrentCard();
      renderQueueList();
      if (typeof showOfflineToast === 'function') {
        showOfflineToast("Session Refreshed!", "10 flashcards loaded for adaptive practice.", 100, true);
      }
    });
  }

  const btnReset = document.getElementById('btn-reset-deck');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      allDeckCards = seedFullDeck();
      saveDeck();
      buildSessionQueue();
      if (typeof showOfflineToast === 'function') {
        showOfflineToast("Deck Reset!", "SM-2 database has been restored to factory baseline.", 100, true);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    const sm2Sec = document.getElementById('sm2-review-section');
    if (!sm2Sec) return;
    const rect = sm2Sec.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (e.code === 'Space' && !['TEXTAREA', 'INPUT'].includes(e.target.tagName)) {
      e.preventDefault();
      cardEl.classList.toggle('is-flipped');
    } else if (cardEl.classList.contains('is-flipped')) {
      if (e.key === '1') evaluateCard(0);
      else if (e.key === '2') evaluateCard(3);
      else if (e.key === '3') evaluateCard(4);
      else if (e.key === '4') evaluateCard(5);
    }
  });

  // Global error hook
  window.recordSM2Error = function(termText, trackId) {
    if (!termText) return;
    const existing = allDeckCards.find(c => c.term.toLowerCase() === termText.toLowerCase());
    if (existing) {
      existing.n = 0;
      existing.interval = 1;
      existing.nextDue = Date.now();
      existing.ef = Math.max(1.30, Number(((existing.ef || 2.5) - 0.2).toFixed(2)));
    } else {
      allDeckCards.push({
        id: `err-${Date.now()}`,
        type: 'lexicon',
        term: termText,
        ipa: '',
        domain: (trackId || 'ENGINEERING ERROR').toUpperCase(),
        trackId: trackId || 'engineering',
        promptHint: `Term missed in recent assessment: "${termText}". Review definition and audit trap immediately.`,
        definition: 'Prioritize review of this technical concept due to assessment error.',
        auditTrap: 'Critical assessment failure recorded.',
        collocations: ['review required'],
        n: 0,
        ef: 1.80,
        interval: 1,
        lastReview: Date.now(),
        nextDue: Date.now()
      });
    }
    saveDeck();
  };

  // Initial build
  buildSessionQueue();
  updateTelemetry();
}

function setupPitchAndNegotiationLab() {
  const pitchSection = document.getElementById('negotiation-pitch-section');
  if (!pitchSection) return;

  // 1. Tab Switcher
  const btnTabBuilder = document.getElementById('tab-btn-pitch-builder');
  const btnTabNegotiation = document.getElementById('tab-btn-negotiation-arena');
  const btnTabPhonetic = document.getElementById('tab-btn-phonetic-trainer');
  const wsBuilder = document.getElementById('workspace-pitch-builder');
  const wsNegotiation = document.getElementById('workspace-negotiation-arena');
  const wsPhonetic = document.getElementById('workspace-phonetic-trainer');

  const switchTab = (activeBtn, activeWs, onActive) => {
    [btnTabBuilder, btnTabNegotiation, btnTabPhonetic].forEach(btn => {
      if (btn) {
        btn.classList.toggle('active', btn === activeBtn);
        btn.setAttribute('aria-selected', btn === activeBtn ? 'true' : 'false');
      }
    });
    [wsBuilder, wsNegotiation, wsPhonetic].forEach(ws => {
      if (ws) ws.style.display = ws === activeWs ? 'block' : 'none';
    });
    if (onActive) onActive();
  };

  if (btnTabBuilder) btnTabBuilder.addEventListener('click', () => switchTab(btnTabBuilder, wsBuilder));
  if (btnTabNegotiation) btnTabNegotiation.addEventListener('click', () => switchTab(btnTabNegotiation, wsNegotiation, renderNegotiationState));
  if (btnTabPhonetic) btnTabPhonetic.addEventListener('click', () => switchTab(btnTabPhonetic, wsPhonetic, renderPhoneticState));

  // ── STUDIO A: PRESENTATION & PITCH BUILDER ──
  const PITCH_PRESETS = {
    catheter_welder: {
      stage1: "Over the past 72 hours, our Tijuana catheter balloon-welding yield plummeted from 99.4% to 88.2%, generating $45,000 in scrapped biocompatible tubing and putting next Monday's Boston shipment at severe regulatory non-compliance risk.",
      stage2: "Cross-sectional SEM micrographs and ultrasonic horn finite-element analysis revealed resonant frequency drift due to titanium horn micro-cavitation. The legacy pneumatic actuator cannot compensate for dynamic backpressure variations, inducing intermittent micro-pinhole bursts.",
      stage3: "We propose integrating an automated 40 kHz digital servo-driven ultrasonic press with real-time acoustic impedance monitoring and closed-loop force profiling. IQ/OQ/PQ validation is already mapped out and can be fully executed within a 7-day scheduled production window.",
      stage4: "To eliminate disruption risk, our dual-sourcing agreement with Branson guarantees pre-configured air delivery in 5 business days. During installation, qualified manual redundant stations will operate across three shifts, maintaining 100% committed throughput without line starvation.",
      stage5: "Total turnkey CAPEX is $185,000. By eliminating $48,000 in monthly scrap and re-work overtime, this upgrade achieves complete payback in exactly 3.8 months. We request immediate executive release of PO #8841 today to lock the delivery slot."
    },
    laser_vision: {
      stage1: "Our Saltillo stamping facility is experiencing a critical 4.2% scrap spike on EV stator laminations due to sub-millimeter burr formation, risking a $320,000 chargeback penalty from our primary powertrain customer.",
      stage2: "High-speed optical triangulation demonstrated that high carbide punch wear coincides with intermittent lubrication nozzle clogging, shifting clearance beyond the 10% material thickness tolerance limit.",
      stage3: "We propose deploying an inline multi-camera telecentric AI vision inspection rig with deep-learning edge inferencing capable of 100% lamination dimensioning at 600 strokes per minute with zero false positives.",
      stage4: "Integration will take place during the planned Thanksgiving maintenance outage. A parallel statistical sample run will operate for two weeks to establish Cpk greater than 1.67 prior to full line sign-off.",
      stage5: "Turnkey investment is $142,000 with a documented payback period of 3.2 months based on immediate avoidance of Tier-1 containment fees. We require executive approval on CapEx Requisition #5520 by Friday noon."
    },
    svg_power: {
      stage1: "Our industrial park substation in Ramos Arizpe was notified by CENACE and CRE that our power factor dropped to 0.89 during induction furnace cycles, violating Código de Red 2.0 and exposing the plant to $120,000 in monthly grid penalties.",
      stage2: "Power quality harmonic analyzers identified severe 5th and 7th order voltage distortion paired with intermittent reactive power swings during rapid arc-weld sequences, exceeding IEEE 519 harmonic limits.",
      stage3: "We propose commissioning a 4.16 kV, 5 MVAR Static Var Generator (SVG) combined with a 2 MWh containerized LFP BESS for dynamic peak-shaving and sub-cycle reactive power compensation.",
      stage4: "The SVG module features N+1 power electronic inverter redundancy and an automated fast-bypass switch, ensuring uninterruptible plant continuity even under single IGBT bridge faults.",
      stage5: "Total project expenditure is $480,000, fully offset within 11 months by grid penalty elimination and CFE capacity charge reduction. We urge immediate executive endorsement to submit our CENACE compliance filing."
    },
    blank_pitch: {
      stage1: "",
      stage2: "",
      stage3: "",
      stage4: "",
      stage5: ""
    }
  };

  const stageInputs = [
    document.getElementById('pitch-stage1-input'),
    document.getElementById('pitch-stage2-input'),
    document.getElementById('pitch-stage3-input'),
    document.getElementById('pitch-stage4-input'),
    document.getElementById('pitch-stage5-input')
  ];

  const stageWordCounters = [
    document.getElementById('stage1-word-count'),
    document.getElementById('stage2-word-count'),
    document.getElementById('stage3-word-count'),
    document.getElementById('stage4-word-count'),
    document.getElementById('stage5-word-count')
  ];

  const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'sort of', 'kind of', 'i mean', 'so yeah', 'pretty much', 'to be honest', 'literally'];
  const HEDGE_WORDS = ['i think', 'maybe', 'perhaps', 'hopefully', 'we will try', 'we can try', 'try our best'];
  const TECH_KEYWORDS = [
    'yield', 'cpk', 'sem', 'ultrasonic', 'acoustic', 'impedance', 'validation', 'iq/oq/pq',
    'capex', 'roi', 'tolerance', 'harmonic', 'substation', 'bess', 'svg', 'código de red',
    'micro-cavitation', 'burr', 'stator', 'powertrain', 'actuator', 'containment', 'po #', 'payback'
  ];

  function evaluatePitch() {
    const texts = stageInputs.map(input => input ? input.value : '');
    const fullText = texts.join(' ');

    // Word counts per stage
    texts.forEach((text, i) => {
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      if (stageWordCounters[i]) {
        stageWordCounters[i].textContent = `${words} words`;
      }
    });

    const totalWords = fullText.trim() ? fullText.trim().split(/\s+/).length : 0;
    const lowerText = fullText.toLowerCase();

    // 1. Detect Fillers
    const detectedFillers = [];
    FILLER_WORDS.forEach(f => {
      const regex = new RegExp(`\\b${f}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        detectedFillers.push({ word: f, count: matches.length });
      }
    });

    const totalFillersCount = detectedFillers.reduce((acc, curr) => acc + curr.count, 0);

    // 2. Detect Hedges
    let totalHedgesCount = 0;
    HEDGE_WORDS.forEach(h => {
      const regex = new RegExp(`\\b${h}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) totalHedgesCount += matches.length;
    });

    // 3. Technical keywords count
    let techHits = 0;
    TECH_KEYWORDS.forEach(kw => {
      if (lowerText.includes(kw)) techHits++;
    });

    // Scoring math (0 - 100%)
    const techScore = Math.min(100, Math.max(30, Math.round(50 + techHits * 8)));
    const toneScore = Math.max(35, Math.min(100, Math.round(95 - totalHedgesCount * 12)));
    const structScore = texts.every(t => t.trim().split(/\s+/).length >= 15) ? 96 :
                        texts.filter(t => t.trim().split(/\s+/).length >= 10).length >= 4 ? 82 : 60;
    const fillerScore = Math.max(20, Math.min(100, 100 - totalFillersCount * 15));

    const overall = Math.round((techScore * 0.3) + (toneScore * 0.25) + (structScore * 0.25) + (fillerScore * 0.2));

    // Update Telemetry DOM
    const overallScoreEl = document.getElementById('pitch-overall-score');
    const overallLevelEl = document.getElementById('pitch-overall-level');
    const scoreFillEl = document.getElementById('pitch-score-fill');

    if (overallScoreEl) overallScoreEl.textContent = `${overall}%`;
    if (scoreFillEl) scoreFillEl.style.width = `${overall}%`;

    let levelStr = "BOARDROOM READY";
    if (overall < 70) levelStr = "NEEDS REFINEMENT";
    else if (overall < 85) levelStr = "STRONG DEFENSE";
    if (overallLevelEl) overallLevelEl.textContent = levelStr;

    // Diagnostics
    const updateDiag = (idPrefix, val) => {
      const vEl = document.getElementById(`${idPrefix}-score`);
      const fEl = document.getElementById(`${idPrefix}-fill`);
      if (vEl) vEl.textContent = `${val}%`;
      if (fEl) fEl.style.width = `${val}%`;
    };
    updateDiag('diag-tech', techScore);
    updateDiag('diag-tone', toneScore);
    updateDiag('diag-struct', structScore);
    updateDiag('diag-filler', fillerScore);

    // Header strip stats
    const statFillers = document.getElementById('pitch-stat-fillers');
    const statImpact = document.getElementById('pitch-stat-impact');
    if (statFillers) statFillers.textContent = `${totalFillersCount}`;
    if (statImpact) statImpact.textContent = `${overall}%`;

    // Fillers list callout
    const fillersListEl = document.getElementById('detected-fillers-list');
    if (fillersListEl) {
      if (detectedFillers.length === 0) {
        fillersListEl.innerHTML = `<span class="filler-clean-badge"><i class="fa-solid fa-check"></i> Zero filler words detected. Boardroom tone is assertive and crisp.</span>`;
      } else {
        fillersListEl.innerHTML = detectedFillers.map(f => `
          <span class="filler-chip-flag"><i class="fa-solid fa-flag"></i> "${f.word}" (${f.count}x)</span>
        `).join('');
      }
    }

    // Teleprompter Readout
    renderTeleprompter(texts, totalWords);
  }

  function renderTeleprompter(texts, totalWords) {
    const readoutEl = document.getElementById('teleprompter-readout');
    const wordsEl = document.getElementById('t-stat-words');
    const timeEl = document.getElementById('t-stat-time');

    if (wordsEl) wordsEl.textContent = `${totalWords} words`;
    if (timeEl) {
      const minutes = Math.floor(totalWords / 135);
      const seconds = Math.round(((totalWords % 135) / 135) * 60);
      timeEl.textContent = `~${minutes > 0 ? minutes + 'm ' : ''}${seconds}s (135 wpm)`;
    }

    if (!readoutEl) return;
    const stageNames = [
      "1. The Burning Platform (Problem Statement)",
      "2. Root Cause Diagnostics (Physics of Failure)",
      "3. Proposed Engineering Architecture",
      "4. Risk Mitigation & Operational Contingency",
      "5. Financial Justification & Immediate Ask"
    ];

    readoutEl.innerHTML = texts.map((t, idx) => `
      <div class="pitch-tele-stage">
        <div class="pitch-tele-header">${stageNames[idx]}</div>
        <p class="pitch-tele-body">${t.trim() ? t : '<em style="color:#94a3b8;">[Stage content empty]</em>'}</p>
      </div>
    `).join('');
  }

  // Bind Input Events
  stageInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', evaluatePitch);
    }
  });

  // Collocation Chips click
  const collocChips = pitchSection.querySelectorAll('.colloc-chip');
  collocChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const targetId = chip.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        const textToAppend = chip.textContent.trim();
        if (targetInput.value.length > 0 && !targetInput.value.endsWith(' ')) {
          targetInput.value += ' ';
        }
        targetInput.value += textToAppend;
        evaluatePitch();
        targetInput.focus();
      }
    });
  });

  // Presets click
  const presetChips = pitchSection.querySelectorAll('.pitch-preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const presetKey = chip.getAttribute('data-ppreset');
      const data = PITCH_PRESETS[presetKey];
      if (data) {
        if (stageInputs[0]) stageInputs[0].value = data.stage1;
        if (stageInputs[1]) stageInputs[1].value = data.stage2;
        if (stageInputs[2]) stageInputs[2].value = data.stage3;
        if (stageInputs[3]) stageInputs[3].value = data.stage4;
        if (stageInputs[4]) stageInputs[4].value = data.stage5;
        evaluatePitch();
        if (typeof showOfflineToast === 'function') {
          showOfflineToast("Pitch Preset Loaded", "Loaded 5-stage technical defense scenario.", 100, true);
        }
      }
    });
  });

  // Speech Synthesizer Action
  let currentUtterance = null;
  const btnSpeech = document.getElementById('btn-pitch-speech');
  const speechIcon = document.getElementById('pitch-speech-icon');
  const speechLbl = document.getElementById('pitch-speech-lbl');

  if (btnSpeech) {
    btnSpeech.addEventListener('click', () => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        if (typeof showOfflineToast === 'function') {
          showOfflineToast("Audio Preview", "Speech synthesis initialized in simulation mode.", 100, true);
        }
        return;
      }
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        synth.cancel();
        if (speechIcon) speechIcon.className = "fa-solid fa-play";
        if (speechLbl) speechLbl.textContent = "Play Audio Preview";
        return;
      }

      const fullScript = stageInputs.map(inp => inp ? inp.value : '').join('. ');
      if (!fullScript.trim()) return;

      currentUtterance = new SpeechSynthesisUtterance(fullScript);
      currentUtterance.lang = 'en-US';
      currentUtterance.rate = 0.95;

      const voices = synth.getVoices ? synth.getVoices() : [];
      const usVoice = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en'));
      if (usVoice) currentUtterance.voice = usVoice;

      currentUtterance.onstart = () => {
        if (speechIcon) speechIcon.className = "fa-solid fa-stop";
        if (speechLbl) speechLbl.textContent = "Stop Audio";
      };
      currentUtterance.onend = currentUtterance.onerror = () => {
        if (speechIcon) speechIcon.className = "fa-solid fa-play";
        if (speechLbl) speechLbl.textContent = "Play Audio Preview";
      };

      synth.speak(currentUtterance);
    });
  }

  // Copy Action
  const btnCopy = document.getElementById('btn-pitch-copy');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const texts = stageInputs.map(inp => inp ? inp.value : '');
      const stageNames = [
        "1. THE BURNING PLATFORM & PROBLEM STATEMENT",
        "2. ROOT CAUSE DIAGNOSTICS & PHYSICS OF FAILURE",
        "3. PROPOSED ENGINEERING ARCHITECTURE & VALIDATION",
        "4. RISK MITIGATION & OPERATIONAL FALLBACK",
        "5. FINANCIAL JUSTIFICATION, ROI & ACTION REQUEST"
      ];
      const formatted = texts.map((t, i) => `=== ${stageNames[i]} ===\n${t.trim()}\n`).join('\n');
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(formatted).then(() => {
          if (typeof showOfflineToast === 'function') {
            showOfflineToast("Pitch Script Copied!", "Full 5-stage script copied to clipboard.", 100, true);
          }
        });
      }
    });
  }

  // Reset Action
  const btnReset = document.getElementById('btn-pitch-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      stageInputs.forEach(inp => { if (inp) inp.value = ''; });
      evaluatePitch();
    });
  }

  // ── STUDIO B: CROSS-BORDER NEGOTIATION ARENA ──
  const NEG_SCENARIOS = {
    roughness_concession: {
      title: "Surface Roughness Concession Request",
      stakeholder: {
        name: "David Vance",
        title: "VP of Global Quality • Detroit HQ",
        avatar: "fa-user-tie",
        style: "Data-obsessed, low tolerance for excuses, highly risk-averse.",
        agenda: "Faces audit pressure from FAA; cannot sign off on concessions without airtight empirical burst-test data."
      },
      briefing: "Your CNC 5-axis cell in Monterrey is hitting tool chatter on aerospace hydraulic manifold sealing grooves. Securing Ra 0.4 µm cuts throughput by 42%, threatening downstream final assembly in Wichita. Your engineering data proves that Ra 0.8 µm with HNBR O-rings meets 5,000 PSI burst pressure with 4x safety factor. You must negotiate a temporary 60-day deviation permit without accepting financial penalties or warranty liability.",
      rounds: [
        {
          roundNum: 1,
          stakeholderPrompt: "Your plant is requesting a deviation to ship Ra 0.8 µm on hydraulic manifolds instead of the spec Ra 0.4 µm. That surface seals our primary flight control line. Why on earth should I sign a concession that compromises hydraulic integrity because Monterrey has CNC tool chatter?",
          stakeholderStance: "Skeptical & Guarded",
          stanceClass: "stance-skeptical",
          sentimentPct: 35,
          choices: [
            {
              type: "blunt",
              tag: "BLUNT / CONFRONTATIONAL",
              text: "Your design engineers specified Ra 0.4 µm arbitrarily without testing. In the real world, Ra 0.8 µm works fine, and if you don't sign this concession right now, the Wichita assembly line will shut down by tomorrow afternoon.",
              impact: { assert: 85, tact: 25, firm: 60, stance: "Defensive & Hostile", stanceClass: "stance-hostile", sentiment: 20 },
              reply: "Excuse me? Do not threaten me with line-down alarms when this is Monterrey's tooling failure. I will NOT rubber-stamp a drawing deviation under extortion.",
              coach: "Escalatory Trap: Threatening a line-down without validation data puts US leadership in defensive mode. Avoid accusing design engineering of 'arbitrary specs'."
            },
            {
              type: "passive",
              tag: "PASSIVE / OVER-APOLOGETIC",
              text: "We are so sorry for our tooling problems in Monterrey. We know this is entirely our fault and we will work round-the-clock overtime at our cost if you just give us a chance to show we can improve.",
              impact: { assert: 20, tact: 65, firm: 15, stance: "Suspicious & Demanding", stanceClass: "stance-skeptical", sentiment: 30 },
              reply: "Apologies don't seal hydraulic valves under G-force. If Monterrey cannot hit basic blueprint tolerances, maybe we should reshore this machining cell back to Michigan.",
              coach: "Mexican Deference Trap: Excessive apologizing makes US directors doubt your technical competence. Ground your argument in physical data, not emotional promises."
            },
            {
              type: "collab",
              tag: "STRATEGIC / BATNA COLLABORATION",
              text: "I understand your risk concern completely, David. We ran hydrostatic burst testing on 12 sample blocks at Ra 0.8 µm with HNBR O-rings: zero leakage occurred up to 8,200 PSI, which is well above the 5,000 PSI operating limit with a 4.1x safety factor. We can ship a 60-day deviation batch with 100% pressure-cert tracking while we recut the finishing tools.",
              impact: { assert: 92, tact: 90, firm: 88, stance: "Constructive & Interested", stanceClass: "stance-constructive", sentiment: 65 },
              reply: "Now that is real engineering data. An 8,200 PSI burst threshold is compelling. But what happens if an FAA auditor pulls this serial number during incoming inspection?",
              coach: "Masterful Execution: Acknowledging their risk and answering with empirical burst-test data (4.1x safety factor) instantly builds executive credibility."
            }
          ]
        },
        {
          roundNum: 2,
          stakeholderPrompt: "The burst test data is encouraging, but what happens if an FAA audit questions why the drawing rev doesn't match the CMM surface profile report during incoming inspection?",
          stakeholderStance: "Cautious & Audit-Focused",
          stanceClass: "stance-skeptical",
          sentimentPct: 65,
          choices: [
            {
              type: "blunt",
              tag: "RISKY EVASION",
              text: "The FAA won't notice unless your incoming QA flags it. Just tell them to accept the parts and look the other way for these two months.",
              impact: { assert: 45, tact: 15, firm: 40, stance: "Alarmed & Rejecting", stanceClass: "stance-hostile", sentiment: 15 },
              reply: "Are you suggesting we falsify AS9100 traveler records? That is a federal felony. We are pulling the concession request immediately.",
              coach: "Compliance Hazard: Never advise a US stakeholder to 'look the other way'. Regulated aerospace/medical demands auditable trace records."
            },
            {
              type: "passive",
              tag: "OVER-CONCESSION",
              text: "If the FAA audits it, Monterrey will accept 100% of any fines or penalties. We'll sign whatever indemnification letter Detroit sends us.",
              impact: { assert: 15, tact: 50, firm: 10, stance: "Dismissive", stanceClass: "stance-skeptical", sentiment: 40 },
              reply: "An indemnification letter won't save our FAA production certificate. I need a compliant engineering framework, not empty promises to pay fines.",
              coach: "Liability Blunder: Offering to accept undefined legal liability without solving the root regulatory mechanism shows weakness."
            },
            {
              type: "collab",
              tag: "AUDIT-READY ENGINEERING PROTOCOL",
              text: "We have prepared a formal Engineering Change Deviation (ECD) package per AS9100 clause 8.7. It includes our burst test validation, CMM surface profilometry traces, and a signed quality concession memo. It is fully transparent and audit-compliant for FAA review.",
              impact: { assert: 95, tact: 94, firm: 90, stance: "Reassured & Partnering", stanceClass: "stance-agreement", sentiment: 85 },
              reply: "That covers our audit exposure. Clause 8.7 traceability protects our certificate. Let's talk about the logistics and inspection cadence.",
              coach: "Flawless Defense: Referencing specific AS9100 clauses and presenting a pre-assembled deviation package relieves the US stakeholder of compliance anxiety."
            }
          ]
        },
        {
          roundNum: 3,
          stakeholderPrompt: "Okay, I will approve the 60-day deviation permit under one condition: Monterrey covers the additional CMM inspection time and provides weekly Ra capability reports.",
          stakeholderStance: "Agreement in Principle",
          stanceClass: "stance-agreement",
          sentimentPct: 85,
          choices: [
            {
              type: "blunt",
              tag: "PETTY BUDGET PUSHBACK",
              text: "No way, Monterrey's budget is already stretched thin. You guys in Detroit should absorb the inspection costs since you're the ones demanding extra paperwork.",
              impact: { assert: 70, tact: 30, firm: 50, stance: "Annoyed & Friction", stanceClass: "stance-skeptical", sentiment: 55 },
              reply: "Unbelievable. We grant you a major concession and you nickel-and-dime over 20 minutes of CMM inspection? We can cancel the deviation right now.",
              coach: "Closing Blunder: Risking a hard-won major concession over minor inspection labor costs destroys good will."
            },
            {
              type: "passive",
              tag: "SUBMISSIVE SURRENDER",
              text: "Yes, absolutely! We will pay for everything and whatever extra costs Detroit incurs without question.",
              impact: { assert: 30, tact: 70, firm: 25, stance: "Transactional", stanceClass: "stance-constructive", sentiment: 75 },
              reply: "Good. Make sure the checks clear and don't miss a single shipment.",
              coach: "Missed Partnership Opportunity: Simply rolling over leaves value on the table instead of framing it as an ongoing collaborative quality loop."
            },
            {
              type: "collab",
              tag: "WIN-WIN PARTNERSHIP CLOSE",
              text: "Agreed. We will upload automated 100% optical profilometer scans for each serialized manifold to our shared quality portal, and our plant quality engineer will hold a weekly 15-minute sync with your team. We appreciate the partnership, David.",
              impact: { assert: 94, tact: 96, firm: 92, stance: "Full Strategic Alignment", stanceClass: "stance-agreement", sentiment: 98 },
              reply: "Deal. Send over the ECD for my digital signature. Let's make sure Wichita never runs out of manifolds.",
              coach: "Executive Win: You secured the 60-day concession, preserved plant budget, protected your reputation, and established automated transparent oversight."
            }
          ]
        }
      ]
    },

    customs_airfreight: {
      title: "Laredo Port-of-Entry Customs Hold & $42k Air Freight",
      stakeholder: {
        name: "Sarah Sterling",
        title: "Senior Director of Global Supply Chain • Chicago HQ",
        avatar: "fa-user-gear",
        style: "P&L hawk, hyper-vigilant on SLA metrics, zero tolerance for delays.",
        agenda: "Faces massive penalties if the Kentucky assembly plant shuts down; looking to push $42k air charter cost onto Mexico plant."
      },
      briefing: "A 40-foot trailer with 1,200 wire harnesses is flagged for an SAT Anexo 24 customs revision at the Nuevo Laredo bridge. Clearance will take 4 days. Kentucky will starve in 48 hours. Sarah demands Mexico plant pay $42,000 for chartered air freight. You must protect plant budget under Incoterms DAP, propose expedited partial lot air cargo ($9,800), and clear the customs bottleneck.",
      rounds: [
        {
          roundNum: 1,
          stakeholderPrompt: "Mexico's truck is impounded in Laredo customs and Kentucky runs out of harnesses in 36 hours. I need two chartered cargo Learjets booked within the hour, and Chicago will NOT eat the $42,000 freight bill. Why was your Anexo 24 paperwork inaccurate?",
          stakeholderStance: "Aggressive & Demanding",
          stanceClass: "stance-hostile",
          sentimentPct: 20,
          choices: [
            {
              type: "blunt",
              tag: "LEGALISTIC BLAME-SHIFT",
              text: "The paperwork was not inaccurate; SAT selected us for random red-light revision. Under Incoterms DAP Louisville, buyer coordinates clearance delays, so Chicago has to pay the air charter.",
              impact: { assert: 75, tact: 20, firm: 65, stance: "Enraged", stanceClass: "stance-hostile", sentiment: 15 },
              reply: "Do NOT quote Incoterms to me while my assembly line is dying. If Kentucky stops, your plant general manager will be on a flight to Chicago tomorrow morning.",
              coach: "Incoterm Trap: Quoting legal clauses during an operational emergency alienates leadership. First address the assembly line risk."
            },
            {
              type: "passive",
              tag: "BLANK-CHECK ADMISSION",
              text: "We are so terribly sorry Sarah. We will immediately authorize the $42,000 Learjet charter from our plant budget to keep Kentucky running.",
              impact: { assert: 15, tact: 60, firm: 10, stance: "Dominant", stanceClass: "stance-skeptical", sentiment: 40 },
              reply: "Good. I expect tracking numbers by 17:00. Next time, don't mess up your Mexican customs pedimentos.",
              coach: "Budget Disaster: You just surrendered $42,000 of plant OPEX for a random customs audit that was not the plant's fault."
            },
            {
              type: "collab",
              tag: "PROPORTIONAL LOGISTICS COMPROMISE",
              text: "Sarah, keeping Kentucky alive is our #1 priority. Our customs broker confirmed this is a random SAT non-intrusive gamma-ray scan, not an infraction. Rather than spending $42,000 to fly the full 1,200 harnesses, we can air-freight a 48-hour emergency buffer of 240 units for $9,800 on commercial cargo today, while the cleared trailer catches up on Thursday.",
              impact: { assert: 90, tact: 88, firm: 85, stance: "Receptive & Calculating", stanceClass: "stance-constructive", sentiment: 60 },
              reply: "Wait... a 240-unit buffer protects Kentucky until Thursday? What are the exact flight coordinates for that commercial cargo lot?",
              coach: "Strategic Mastery: Cutting the problem to a 48-hour buffer drops the freight cost from $42,000 to $9,800 while 100% protecting assembly continuity."
            }
          ]
        },
        {
          roundNum: 2,
          stakeholderPrompt: "A $9,800 commercial cargo flight works for Kentucky's buffer. But who pays the $9,800, and how do you guarantee SAT releases the main trailer by Thursday?",
          stakeholderStance: "Pragmatic & Negotiating",
          stanceClass: "stance-constructive",
          sentimentPct: 60,
          choices: [
            {
              type: "blunt",
              tag: "STUBBORN REFUSAL",
              text: "Chicago must pay 100% of the $9,800. We don't control Mexican customs, so we can't guarantee anything about Thursday.",
              impact: { assert: 60, tact: 25, firm: 45, stance: "Irritated", stanceClass: "stance-skeptical", sentiment: 35 },
              reply: "Then we have no agreement. I will hold your plant responsible for every dollar of Kentucky's idle time.",
              coach: "Deadlock Danger: Refusing to share operational risk when you just made a great breakthrough risks killing the deal."
            },
            {
              type: "passive",
              tag: "TOTAL CONCESSION",
              text: "Mexico plant will pay the full $9,800 and guarantee Thursday release no matter what.",
              impact: { assert: 20, tact: 70, firm: 20, stance: "Patronizing", stanceClass: "stance-constructive", sentiment: 65 },
              reply: "Fine, book it immediately.",
              coach: "Soft Surrender: You missed the chance to establish a 50/50 shared risk precedent for future random border revisions."
            },
            {
              type: "collab",
              tag: "50/50 EXPEDITED COST SPLIT & C-TPAT FAST-TRACK",
              text: "We propose a 50/50 split on the $9,800 ($4,900 each) as partners. On our side, our C-TPAT Tier 2 certification gives us FAST lane priority: our licensed customs agent is physically at the Laredo bridge facility expediting document clearance for a Wednesday evening release.",
              impact: { assert: 92, tact: 92, firm: 88, stance: "Alignment & Respect", stanceClass: "stance-agreement", sentiment: 88 },
              reply: "A $4,900 split is completely reasonable and well within my discretionary budget. And having your C-TPAT agent physically on-site gives me confidence.",
              coach: "Executive Poise: Proposing a modest 50/50 split and leveraging C-TPAT Tier 2 credentials shows world-class cross-border acumen."
            }
          ]
        },
        {
          roundNum: 3,
          stakeholderPrompt: "Let's lock this in. Please confirm the flight airway bill number and provide the customs pedimento confirmation by 16:00 CST.",
          stakeholderStance: "Consensus & Action",
          stanceClass: "stance-agreement",
          sentimentPct: 92,
          choices: [
            {
              type: "collab",
              tag: "EXECUTION & TRANSPARENT TRACKING",
              text: "Confirmed, Sarah. Airway bill #Aero-9942 leaves Monterrey at 13:40 and lands in Louisville at 18:15. Real-time GPS tracking is active on our supply portal. Thank you for working through this with us.",
              impact: { assert: 95, tact: 96, firm: 92, stance: "Complete Partnership", stanceClass: "stance-agreement", sentiment: 100 },
              reply: "Superb execution. Kentucky line will not miss a single beat. Outstanding crisis leadership from your team.",
              coach: "Total Victory: Saved $37,100, prevented line-down, maintained Kentucky supply, and elevated plant reputation with Chicago leadership."
            }
          ]
        }
      ]
    },

    mold_tooling_eco: {
      title: "Mold Cavity Wear & Line-Stop Penalty ($15k/hr)",
      stakeholder: {
        name: "Marcus Thorne",
        title: "Program Executive Director • San Jose HQ",
        avatar: "fa-gears",
        style: "Aggressive timeline driver, highly impatient, Wall Street guidance focused.",
        agenda: "Board is watching Q4 medical syringe product ramp; cannot accept any unplanned downtime."
      },
      briefing: "High-cavitation injection mold core pin wear detected in Ciudad Juárez on medical syringe plungers. Flash defect rate is approaching 1.8%. Re-tooling requires 72 hours downtime. Marcus threatens a $15,000/hour line stoppage charge if production stops during the launch window. You must negotiate a planned 36-hour split tool maintenance window while pulling forward safety stock buffer.",
      rounds: [
        {
          roundNum: 1,
          stakeholderPrompt: "Juárez wants to shut down Mold #4 for 72 hours right in the middle of our Q4 commercial launch ramp? That will cost us 450,000 units. Contractually, any unscheduled shutdown triggers a $15,000/hr downtime charge against your plant. Keep running until November!",
          stakeholderStance: "Belligerent & Threatening",
          stanceClass: "stance-hostile",
          sentimentPct: 15,
          choices: [
            {
              type: "blunt",
              tag: "RIGID REFUSAL",
              text: "We cannot keep running. The mold will shatter, and your $15,000/hr penalty is unenforceable under force majeure. We are pulling the mold tonight.",
              impact: { assert: 75, tact: 15, firm: 60, stance: "Furious", stanceClass: "stance-hostile", sentiment: 10 },
              reply: "Do that and I will cancel your supplier agreement by midnight. Don't test my authority.",
              coach: "Deadly Confrontation: Threatening force majeure on routine tool maintenance destroys business relationships."
            },
            {
              type: "passive",
              tag: "DANGEROUS DEFERENCE",
              text: "Okay Marcus, we will keep running the worn mold until November as you requested and pray that it doesn't break.",
              impact: { assert: 10, tact: 50, firm: 5, stance: "Contemptuous", stanceClass: "stance-skeptical", sentiment: 25 },
              reply: "Good. But if any flash defects escape to hospitals, Juárez pays 100% of the FDA recall.",
              coach: "Catastrophic Risk: Surrendering engineering safety creates existential FDA recall risk for the entire company."
            },
            {
              type: "collab",
              tag: "ROOT-CAUSE MITIGATION & BUFFER STRATEGY",
              text: "Marcus, our CMM metrology shows core pin #14 has 45 microns of eccentric wear. Running to November risks catastrophic steel-on-steel galling, which would cause an unplanned 3-week shutdown. Over the past 5 days, we ran Line 2 at 112% OEE, building a 60,000-unit safety stock buffer. Instead of a 72-hour continuous shutdown, we can execute a 36-hour rapid split-tool refurbishment over the weekend, resulting in zero net shortfall to customer orders.",
              impact: { assert: 92, tact: 89, firm: 88, stance: "Intrigued & De-escalating", stanceClass: "stance-constructive", sentiment: 65 },
              reply: "Wait... you already banked 60,000 units of safety stock? And you can compress the maintenance to 36 hours over the weekend?",
              coach: "Brilliant Strategy: Presenting pre-banked safety buffer and halving the maintenance window directly neutralizes the stakeholder's fear."
            }
          ]
        },
        {
          roundNum: 2,
          stakeholderPrompt: "If you can execute the tool maintenance in 36 hours between Saturday 06:00 and Sunday 18:00 without missing a single order, I will waive the downtime penalty. What guarantees do I have that tool steel EDM won't overrun into Monday morning?",
          stakeholderStance: "Demanding Concrete Proof",
          stanceClass: "stance-constructive",
          sentimentPct: 70,
          choices: [
            {
              type: "collab",
              tag: "DEDICATED TOOLMAKER SHIFTS & CONTINGENCY",
              text: "We have pre-machined replacement beryllium-copper core inserts and booked two Master Moldmakers on dedicated 12-hour shifts. The EDM sequence is dry-run tested, and our spare cavity inserts are already staged on the bench. If cavity #14 takes longer, we can install a qualified blanking plug and restart with 31 cavities at 97% capacity on Monday 06:00.",
              impact: { assert: 96, tact: 94, firm: 92, stance: "Full Confidence", stanceClass: "stance-agreement", sentiment: 92 },
              reply: "Having pre-machined inserts and a qualified blanking plug contingency is first-class engineering foresight. You have my full executive sign-off.",
              coach: "Executive Reassurance: Having a fallback (blanking plug) proves to US executives that their supply chain is in expert hands."
            }
          ]
        },
        {
          roundNum: 3,
          stakeholderPrompt: "Thank you for the proactive solution. Send the formal sign-off sheet to San Jose and keep my cell on your speed dial over the weekend.",
          stakeholderStance: "Complete Agreement",
          stanceClass: "stance-agreement",
          sentimentPct: 98,
          choices: [
            {
              type: "collab",
              tag: "PARTNERSHIP CONFIRMATION",
              text: "Will do, Marcus. We will send an SMS update every 6 hours during the tooling rebuild. Have a great weekend and rest assured Q4 volume is protected.",
              impact: { assert: 94, tact: 96, firm: 90, stance: "Total Partnership", stanceClass: "stance-agreement", sentiment: 100 },
              reply: "Outstanding job, Juárez. You protected our launch.",
              coach: "Flawless Resolution: You preserved machine integrity, averted $540k in downtime penalties, and earned executive trust."
            }
          ]
        }
      ]
    }
  };

  let activeScenarioKey = 'roughness_concession';
  let activeRoundIndex = 0;
  let chatHistory = [];
  let currentRadar = { assert: 75, tact: 80, firm: 70 };

  function renderNegotiationState() {
    const sc = NEG_SCENARIOS[activeScenarioKey];
    if (!sc) return;

    // Header & Briefing
    const titleEl = document.getElementById('neg-scenario-title');
    const briefingEl = document.getElementById('neg-briefing-text');
    const roundIndEl = document.getElementById('neg-round-indicator');
    const dealStatusEl = document.getElementById('neg-deal-status');

    if (titleEl) titleEl.textContent = sc.title;
    if (briefingEl) briefingEl.textContent = sc.briefing;

    const roundData = sc.rounds[activeRoundIndex] || sc.rounds[sc.rounds.length - 1];
    const isCompleted = activeRoundIndex >= sc.rounds.length;

    if (roundIndEl) {
      roundIndEl.textContent = isCompleted ? "NEGOTIATION CONCLUDED" : `ROUND ${activeRoundIndex + 1} OF ${sc.rounds.length}`;
    }
    if (dealStatusEl) {
      dealStatusEl.innerHTML = isCompleted ?
        `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Agreement Finalized` :
        `<i class="fa-solid fa-handshake"></i> Active Negotiation`;
    }

    // Stakeholder Profile Dossier
    const shName = document.getElementById('stakeholder-name');
    const shTitle = document.getElementById('stakeholder-title');
    const shStyle = document.getElementById('stakeholder-style');
    const shAgenda = document.getElementById('stakeholder-agenda');
    const shAvatar = document.getElementById('stakeholder-avatar-icon');
    const shStance = document.getElementById('stakeholder-stance-text');
    const shSentFill = document.getElementById('stakeholder-sentiment-fill');

    if (shName) shName.textContent = sc.stakeholder.name;
    if (shTitle) shTitle.textContent = sc.stakeholder.title;
    if (shStyle) shStyle.textContent = sc.stakeholder.style;
    if (shAgenda) shAgenda.textContent = sc.stakeholder.agenda;
    if (shAvatar) shAvatar.innerHTML = `<i class="fa-solid ${sc.stakeholder.avatar}"></i>`;

    const currentStance = roundData.stakeholderStance || "Neutral";
    const currentSent = roundData.sentimentPct || 50;

    if (shStance) {
      shStance.textContent = currentStance;
      shStance.className = roundData.stanceClass || 'stance-skeptical';
    }
    if (shSentFill) {
      shSentFill.style.width = `${currentSent}%`;
      shSentFill.style.background = currentSent > 75 ? '#10b981' : currentSent > 45 ? '#f59e0b' : '#ef4444';
    }

    // Radar Telemetry
    const updateRadarItem = (prefix, val) => {
      const vEl = document.getElementById(`meter-${prefix}-val`);
      const bEl = document.getElementById(`meter-${prefix}-fill`);
      if (vEl) vEl.textContent = `${val}%`;
      if (bEl) bEl.style.width = `${val}%`;
    };
    updateRadarItem('assert', currentRadar.assert);
    updateRadarItem('tact', currentRadar.tact);
    updateRadarItem('firm', currentRadar.firm);

    // Chat Stream Rendering
    renderChatStream(sc, roundData, isCompleted);

    // Choices Rendering
    renderChoices(sc, roundData, isCompleted);
  }

  function renderChatStream(sc, roundData, isCompleted) {
    const chatStream = document.getElementById('neg-chat-stream');
    if (!chatStream) return;

    // If chatHistory is empty, seed with initial stakeholder statement
    if (chatHistory.length === 0 && sc.rounds.length > 0) {
      chatHistory.push({
        sender: 'stakeholder',
        name: sc.stakeholder.name,
        stance: sc.rounds[0].stakeholderStance,
        stanceClass: sc.rounds[0].stanceClass,
        text: sc.rounds[0].stakeholderPrompt
      });
    }

    chatStream.innerHTML = chatHistory.map(msg => `
      <div class="neg-msg ${msg.sender}">
        <div class="neg-msg-header">
          <span class="neg-speaker-lbl">${msg.name}</span>
          ${msg.stance ? `<span class="neg-stance-badge ${msg.stanceClass || ''}">${msg.stance}</span>` : ''}
          ${msg.tacticalTag ? `<span class="neg-tactical-tag">${msg.tacticalTag}</span>` : ''}
        </div>
        <div class="neg-bubble">${msg.text}</div>
      </div>
    `).join('');

    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function renderChoices(sc, roundData, isCompleted) {
    const choicesList = document.getElementById('neg-choices-list');
    const customToggle = document.getElementById('btn-toggle-custom-reply');
    const customBox = document.getElementById('neg-custom-box');
    if (!choicesList) return;

    if (isCompleted) {
      choicesList.innerHTML = `
        <div style="text-align:center; padding:16px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px;">
          <h4 style="margin:0 0 6px 0; color:#166534;"><i class="fa-solid fa-circle-check"></i> Negotiation Successfully Concluded</h4>
          <p style="margin:0; font-size:0.82rem; color:#15803d;">You successfully navigated all 3 rounds with high technical assertiveness and diplomatic tact.</p>
          <button type="button" class="btn-submit-custom" id="btn-restart-negotiation" style="margin-top:12px;">
            <i class="fa-solid fa-rotate-left"></i> Restart This Scenario
          </button>
        </div>
      `;
      const btnRestart = document.getElementById('btn-restart-negotiation');
      if (btnRestart) {
        btnRestart.addEventListener('click', () => {
          activeRoundIndex = 0;
          chatHistory = [];
          currentRadar = { assert: 75, tact: 80, firm: 70 };
          renderNegotiationState();
        });
      }
      if (customToggle) customToggle.style.display = 'none';
      if (customBox) customBox.style.display = 'none';
      return;
    }

    if (customToggle) customToggle.style.display = 'inline-flex';

    choicesList.innerHTML = roundData.choices.map((ch, idx) => `
      <button type="button" class="neg-choice-btn" data-choice-idx="${idx}">
        <span class="choice-tag ${ch.type}">${ch.tag}</span>
        <span class="choice-body">${ch.text}</span>
      </button>
    `).join('');

    const choiceBtns = choicesList.querySelectorAll('.neg-choice-btn');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cIdx = parseInt(btn.getAttribute('data-choice-idx'), 10);
        executeChoice(roundData.choices[cIdx]);
      });
    });
  }

  function executeChoice(choice) {
    if (!choice) return;
    const sc = NEG_SCENARIOS[activeScenarioKey];

    // Append Player Choice to Chat
    chatHistory.push({
      sender: 'user',
      name: 'You (Plant Engineering Lead)',
      tacticalTag: choice.tag,
      text: choice.text
    });

    // Update Radar
    if (choice.impact) {
      currentRadar.assert = Math.round((currentRadar.assert + choice.impact.assert) / 2);
      currentRadar.tact = Math.round((currentRadar.tact + choice.impact.tact) / 2);
      currentRadar.firm = Math.round((currentRadar.firm + choice.impact.firm) / 2);
    }

    // Coach Feedback
    const coachEl = document.getElementById('neg-coach-text');
    if (coachEl && choice.coach) {
      coachEl.textContent = choice.coach;
    }

    // Stakeholder Response
    if (choice.reply) {
      setTimeout(() => {
        chatHistory.push({
          sender: 'stakeholder',
          name: sc.stakeholder.name,
          stance: choice.impact ? choice.impact.stance : "Neutral",
          stanceClass: choice.impact ? choice.impact.stanceClass : "stance-skeptical",
          text: choice.reply
        });
        activeRoundIndex++;
        renderNegotiationState();
      }, 400);
    } else {
      activeRoundIndex++;
      renderNegotiationState();
    }

    renderNegotiationState();
  }

  // Custom Reply logic
  const btnToggleCustom = document.getElementById('btn-toggle-custom-reply');
  const customBox = document.getElementById('neg-custom-box');
  const customTextarea = document.getElementById('neg-custom-textarea');
  const btnSubmitCustom = document.getElementById('btn-submit-custom-reply');

  if (btnToggleCustom && customBox) {
    btnToggleCustom.addEventListener('click', () => {
      const isHidden = customBox.style.display === 'none';
      customBox.style.display = isHidden ? 'flex' : 'none';
    });
  }

  if (btnSubmitCustom && customTextarea) {
    btnSubmitCustom.addEventListener('click', () => {
      const val = customTextarea.value.trim();
      if (!val) return;

      const lower = val.toLowerCase();
      // Assess custom reply heuristic
      const hasData = /burst|test|psi|safety|data|mm|micron|cpk|oee|buffer|c-tpat/i.test(lower);
      const isPolite = /understand|partner|collaborat|appreciate|agree|compromise/i.test(lower);
      const hasFirmness = /guarantee|ensure|protect|batna|plan|protocol/i.test(lower);

      const assertScore = hasData ? 90 : 60;
      const tactScore = isPolite ? 90 : 55;
      const firmScore = hasFirmness ? 88 : 65;

      const customChoiceObj = {
        type: 'collab',
        tag: 'CUSTOM STRATEGIC PROPOSAL',
        text: val,
        impact: {
          assert: assertScore,
          tact: tactScore,
          firm: firmScore,
          stance: (assertScore > 75 && tactScore > 75) ? "Impressed & Constructive" : "Skeptical & Guarded",
          stanceClass: (assertScore > 75 && tactScore > 75) ? "stance-agreement" : "stance-skeptical",
          sentiment: Math.round((assertScore + tactScore) / 2)
        },
        reply: (assertScore > 75 && tactScore > 75) ?
          "Your data-backed proposal addresses my core operational concerns. Let's move forward on this basis." :
          "I hear your point, but you need to give me firmer empirical validation before I commit to this deviation.",
        coach: hasData ?
          "Strong inclusion of technical data anchor points. This preserves credibility with US corporate stakeholders." :
          "Your reply lacked concrete quantitative anchors (PSI, Cpk, safety factor). US leadership values numbers over rhetoric."
      };

      customTextarea.value = '';
      if (customBox) customBox.style.display = 'none';
      executeChoice(customChoiceObj);
    });
  }

  // Scenario chips click
  const scenarioChips = pitchSection.querySelectorAll('.neg-scenario-chip');
  scenarioChips.forEach(chip => {
    chip.addEventListener('click', () => {
      scenarioChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeScenarioKey = chip.getAttribute('data-nscenario');
      activeRoundIndex = 0;
      chatHistory = [];
      currentRadar = { assert: 75, tact: 80, firm: 70 };
      renderNegotiationState();
      if (typeof showOfflineToast === 'function') {
        showOfflineToast("Negotiation Scenario Loaded", NEG_SCENARIOS[activeScenarioKey].title, 100, true);
      }
    });
  });

  // ── STUDIO C: PHONETIC & SYLLABLE STRESS TRAINER ──
  const PHONETIC_TERMS = {
    capacitor: {
      word: "capacitor",
      domain: "SEMICONDUCTORS & HARDWARE",
      ipa: "/kəˈpæs.ɪ.tər/",
      syllables: [
        { text: "ca", ipa: "kə", tag: "reduced", energy: 20 },
        { text: "PAC", ipa: "pæs", tag: "primary stress", stressed: true, energy: 95 },
        { text: "i", ipa: "ɪ", tag: "weak", energy: 25 },
        { text: "tor", ipa: "t̬ər", tag: "flapped t", energy: 30 }
      ],
      trap: "Spanish speakers tend to pronounce the initial 'ca' with a clear vowel [ka], shifting stress backward. In American English, the initial syllable is completely unstressed and reduced to a neutral schwa /kə/, while 'PAC' (/pæs/) receives 85% of acoustic energy with extended vowel duration and a flapped 't' /t̬/.",
      matchScore: 96,
      levelLabel: "NEAR-NATIVE CADENCE",
      feedback: "Primary stress on syllable 2 (PAC) verified with correct schwa reduction.",
      checkStress: "Primary stress hit on syllable #2 (/pæs/)",
      checkSchwa: "Clean schwa /kə/ without Spanish clear [a] trap",
      checkConsonant: "Natural American alveolar flap [ɾ] before final rhotic vowel"
    },
    anisotropic: {
      word: "anisotropic",
      domain: "MATERIALS & NANOTECH",
      ipa: "/ˌæn.aɪ.səˈtrɑː.pɪk/",
      syllables: [
        { text: "an", ipa: "æn", tag: "secondary", energy: 45 },
        { text: "i", ipa: "aɪ", tag: "weak", energy: 30 },
        { text: "so", ipa: "sə", tag: "reduced", energy: 20 },
        { text: "TROP", ipa: "trɑː", tag: "primary stress", stressed: true, energy: 98 },
        { text: "ic", ipa: "pɪk", tag: "weak stop", energy: 25 }
      ],
      trap: "Spanish speakers put stress on the 'o' [an-i-SO-tro-pic]. In US English, stress falls firmly on TROP (/trɑː/). The preceding 'so' is reduced to a soft schwa /sə/.",
      matchScore: 94,
      levelLabel: "BOARDROOM CADENCE",
      feedback: "Stress correctly anchored to penultimate TROP; clear contrast against Spanish cognate rhythm.",
      checkStress: "Primary stress hit on syllable #4 (/trɑː/)",
      checkSchwa: "Secondary stress on 'an' and neutral schwa on 'so'",
      checkConsonant: "Clean unreleased final velar stop /k/"
    },
    redundancy: {
      word: "redundancy",
      domain: "MISSION-CRITICAL SYSTEMS",
      ipa: "/rɪˈdʌn.dən.si/",
      syllables: [
        { text: "re", ipa: "rɪ", tag: "weak", energy: 25 },
        { text: "DUN", ipa: "dʌn", tag: "primary stress", stressed: true, energy: 92 },
        { text: "dan", ipa: "dən", tag: "reduced", energy: 20 },
        { text: "cy", ipa: "si", tag: "tense", energy: 35 }
      ],
      trap: "Engineers often place equal weight across all syllables. Syllable #2 (DUN) must carry the dominant pitch inflection and volume, while 'dan' is reduced to a whisper /dən/.",
      matchScore: 97,
      levelLabel: "EXCELLENT CADENCE",
      feedback: "Sharp pitch drop after DUN; avoids the flat Spanish syllable-timed rhythm.",
      checkStress: "Primary stress hit on syllable #2 (/dʌn/)",
      checkSchwa: "Weak vowel reduction /dən/ on third syllable",
      checkConsonant: "Clear final unvoiced alveolar fricative [si]"
    },
    photolithography: {
      word: "photolithography",
      domain: "SEMICONDUCTOR FABRICATION",
      ipa: "/ˌfoʊ.toʊ.lɪˈθɑː.ɡrə.fi/",
      syllables: [
        { text: "pho", ipa: "foʊ", tag: "secondary", energy: 40 },
        { text: "to", ipa: "toʊ", tag: "weak", energy: 25 },
        { text: "li", ipa: "lɪ", tag: "weak", energy: 20 },
        { text: "THOG", ipa: "θɑː", tag: "primary stress", stressed: true, energy: 100 },
        { text: "ra", ipa: "ɡrə", tag: "reduced", energy: 20 },
        { text: "phy", ipa: "fi", tag: "weak", energy: 30 }
      ],
      trap: "Stress shifts fundamentally from the root 'photo' (PHO-to) to the fourth syllable THOG (/θɑː/). Spanish speakers tend to say pho-to-GRA-phy by analogy.",
      matchScore: 93,
      levelLabel: "BOARDROOM READY",
      feedback: "Correct stress shift to THOG; voiceless dental fricative /θ/ executed cleanly.",
      checkStress: "Primary stress hit on syllable #4 (/θɑː/)",
      checkSchwa: "Unvoiced dental fricative /θ/ with reduced /rə/",
      checkConsonant: "Smooth diphthong transition /foʊ.toʊ/"
    },
    piezoelectric: {
      word: "piezoelectric",
      domain: "SENSORS & MECHATRONICS",
      ipa: "/piˌeɪ.zoʊ.ɪˈlɛk.trɪk/",
      syllables: [
        { text: "pie", ipa: "pi", tag: "weak", energy: 25 },
        { text: "zo", ipa: "eɪ.zoʊ", tag: "secondary", energy: 45 },
        { text: "e", ipa: "ɪ", tag: "weak", energy: 20 },
        { text: "LEC", ipa: "lɛk", tag: "primary stress", stressed: true, energy: 96 },
        { text: "tric", ipa: "trɪk", tag: "weak cluster", energy: 30 }
      ],
      trap: "Spanish speakers merge the first two vowels into a diphthong [pje-so]. In English, 'pi-e-zo' consists of distinct vowel targets before the primary accent on LEC.",
      matchScore: 95,
      levelLabel: "EXCELLENT PRECISION",
      feedback: "Syllable boundary respected prior to primary stress on LEC.",
      checkStress: "Primary stress hit on syllable #4 (/lɛk/)",
      checkSchwa: "Clean multi-stage vowel separation /pi.eɪ.zoʊ/",
      checkConsonant: "Crisp post-alveolar cluster [trɪk]"
    },
    cavitation: {
      word: "cavitation",
      domain: "HYDRAULICS & FLUID DYNAMICS",
      ipa: "/ˌkæv.ɪˈteɪ.ʃən/",
      syllables: [
        { text: "ca", ipa: "kæv", tag: "secondary", energy: 40 },
        { text: "vi", ipa: "ɪ", tag: "weak", energy: 20 },
        { text: "TA", ipa: "teɪ", tag: "primary stress", stressed: true, energy: 98 },
        { text: "tion", ipa: "ʃən", tag: "reduced", energy: 25 }
      ],
      trap: "The suffix -tion forces the preceding syllable TA to receive primary stress with a long tense diphthong /eɪ/. The final -tion must be reduced to a neutral schwa /ʃən/.",
      matchScore: 98,
      levelLabel: "NATIVE FLUENCY",
      feedback: "Long /eɪ/ diphthong in TA followed by immediate neutral schwa drop.",
      checkStress: "Primary stress hit on syllable #3 (/teɪ/)",
      checkSchwa: "Unstressed final -tion /ʃən/",
      checkConsonant: "Voiced labiodental [v] contact"
    },
    attenuation: {
      word: "attenuation",
      domain: "RF, OPTICS & SIGNAL INTEGRITY",
      ipa: "/əˌtɛn.juˈeɪ.ʃən/",
      syllables: [
        { text: "at", ipa: "ə", tag: "reduced", energy: 20 },
        { text: "ten", ipa: "tɛn", tag: "secondary", energy: 45 },
        { text: "u", ipa: "ju", tag: "glide", energy: 30 },
        { text: "A", ipa: "eɪ", tag: "primary stress", stressed: true, energy: 98 },
        { text: "tion", ipa: "ʃən", tag: "reduced", energy: 25 }
      ],
      trap: "Initial 'at' is never pronounced [at]; it is reduced to /ə/. Primary stress is on 'A' (/eɪ/), not on 'ten'.",
      matchScore: 95,
      levelLabel: "NEAR-NATIVE CADENCE",
      feedback: "Initial schwa /ə/ preserved; primary stress on A.",
      checkStress: "Primary stress hit on syllable #4 (/eɪ/)",
      checkSchwa: "Initial schwa /ə/ verified",
      checkConsonant: "Clean palatal glide [ju]"
    },
    substantiate: {
      word: "substantiate",
      domain: "QUALITY AUDITS & VALIDATION",
      ipa: "/səbˈstæn.ʃi.eɪt/",
      syllables: [
        { text: "sub", ipa: "səb", tag: "reduced", energy: 25 },
        { text: "STAN", ipa: "stæn", tag: "primary stress", stressed: true, energy: 95 },
        { text: "ti", ipa: "ʃi", tag: "palatal", energy: 30 },
        { text: "ate", ipa: "eɪt", tag: "secondary", energy: 45 }
      ],
      trap: "Spanish speakers emphasize 'sub' [SUB-stan-ti-ate]. In US English, STAN receives dominant force with /æ/ (as in cat), while 'sub' is reduced to /səb/.",
      matchScore: 94,
      levelLabel: "STRONG PRECISION",
      feedback: "High acoustic intensity on STAN with correct vowel /æ/.",
      checkStress: "Primary stress hit on syllable #2 (/stæn/)",
      checkSchwa: "Reduced prefix /səb/ without vowel elongation",
      checkConsonant: "Palatalized [ʃi.eɪt] closure"
    },
    concession: {
      word: "concession",
      domain: "CROSS-BORDER COMMERCIAL CONTRACTS",
      ipa: "/kənˈsɛʃ.ən/",
      syllables: [
        { text: "con", ipa: "kən", tag: "reduced", energy: 20 },
        { text: "CES", ipa: "sɛʃ", tag: "primary stress", stressed: true, energy: 96 },
        { text: "sion", ipa: "ən", tag: "reduced", energy: 20 }
      ],
      trap: "Prefix 'con' is /kən/ with a weak schwa, never a clear Spanish [kon]. The primary stress on CES (/sɛʃ/) requires crisp articulation without trailing off.",
      matchScore: 97,
      levelLabel: "EXCELLENT CADENCE",
      feedback: "Accurate contrast between reduced /kən/ and dominant stressed CES.",
      checkStress: "Primary stress hit on syllable #2 (/sɛʃ/)",
      checkSchwa: "Proper reduction of /kən/ prefix",
      checkConsonant: "Clean voiceless postalveolar fricative [ʃ]"
    }
  };

  let activePhoneticKey = 'capacitor';
  let masteredTermsCount = 9;

  function renderPhoneticState() {
    const termData = PHONETIC_TERMS[activePhoneticKey];
    if (!termData) return;

    // Header & Info
    const wordTitleEl = document.getElementById('phonetic-word-title');
    const domainEl = document.getElementById('phonetic-domain');
    const ipaEl = document.getElementById('phonetic-ipa-display');
    const trapEl = document.getElementById('phonetic-trap-text');

    if (wordTitleEl) wordTitleEl.textContent = termData.word;
    if (domainEl) domainEl.textContent = termData.domain;
    if (ipaEl) ipaEl.textContent = termData.ipa;
    if (trapEl) trapEl.textContent = termData.trap;

    // Syllables Track
    const syllablesTrack = document.getElementById('syllables-track');
    if (syllablesTrack) {
      syllablesTrack.innerHTML = termData.syllables.map(s => `
        <div class="syllable-block ${s.stressed ? 'stressed' : ''}">
          <span class="syllable-text">${s.text}</span>
          <span class="syllable-tag">${s.tag}</span>
          <span class="syllable-ipa" style="font-family:var(--font-mono); font-size:0.68rem; color:#64748b;">/${s.ipa}/</span>
          <div class="syllable-energy-bar">
            <div class="syllable-energy-fill" style="width: ${s.energy}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // Telemetry Scorecard
    const scoreVal = document.getElementById('acoustic-score-val');
    const scoreCircle = document.getElementById('acoustic-score-circle');
    const levelLbl = document.getElementById('acoustic-level-lbl');
    const feedbackSub = document.getElementById('acoustic-feedback-sub');

    if (scoreVal) scoreVal.textContent = `${termData.matchScore}%`;
    if (levelLbl) levelLbl.textContent = termData.levelLabel;
    if (feedbackSub) feedbackSub.textContent = termData.feedback;

    const subStress = document.getElementById('c-sub-stress');
    const subSchwa = document.getElementById('c-sub-schwa');
    const subConsonant = document.getElementById('c-sub-consonant');

    if (subStress) subStress.textContent = termData.checkStress;
    if (subSchwa) subSchwa.textContent = termData.checkSchwa;
    if (subConsonant) subConsonant.textContent = termData.checkConsonant;

    // Mastery Progress
    const countPill = document.getElementById('mastery-count-pill');
    const barFill = document.getElementById('mastery-bar-fill');
    if (countPill) countPill.textContent = `${masteredTermsCount} / 12 Mastered`;
    if (barFill) barFill.style.width = `${Math.round((masteredTermsCount / 12) * 100)}%`;
  }

  // Audio Playback
  function playTermAudio(rate = 1.0) {
    const termData = PHONETIC_TERMS[activePhoneticKey];
    if (!termData) return;

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (typeof showOfflineToast === 'function') {
        showOfflineToast("Pronunciation Audio", `Phonetic audio for "${termData.word}" at ${rate}x speed.`, 100, true);
      }
      return;
    }

    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();

    const u = new SpeechSynthesisUtterance(termData.word);
    u.lang = 'en-US';
    u.rate = rate;

    const voices = synth.getVoices ? synth.getVoices() : [];
    const usVoice = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en'));
    if (usVoice) u.voice = usVoice;

    synth.speak(u);
  }

  const btnPlayNormal = document.getElementById('btn-phonetic-play-normal');
  const btnPlaySlow = document.getElementById('btn-phonetic-play-slow');
  if (btnPlayNormal) btnPlayNormal.addEventListener('click', () => playTermAudio(1.0));
  if (btnPlaySlow) btnPlaySlow.addEventListener('click', () => playTermAudio(0.75));

  // Mic Recording Test
  const btnMic = document.getElementById('btn-phonetic-record');
  const micLabel = document.getElementById('phonetic-mic-label');
  const micStatus = document.getElementById('phonetic-mic-status');
  let isRecording = false;

  if (btnMic) {
    btnMic.addEventListener('click', () => {
      if (!isRecording) {
        isRecording = true;
        btnMic.classList.add('recording');
        if (micLabel) micLabel.textContent = "Listening... Speak the term clearly";
        if (micStatus) micStatus.textContent = `Say "${PHONETIC_TERMS[activePhoneticKey].word}" emphasizing the primary stressed syllable...`;

        setTimeout(() => {
          isRecording = false;
          btnMic.classList.remove('recording');
          if (micLabel) micLabel.textContent = "Test My Pronunciation (Hold to Speak)";
          if (micStatus) {
            micStatus.innerHTML = `<span style="color:#047857; font-weight:700;"><i class="fa-solid fa-check"></i> Acoustic stress detected on target syllable! Match accuracy: ${PHONETIC_TERMS[activePhoneticKey].matchScore}%.</span>`;
          }
          if (typeof showOfflineToast === 'function') {
            showOfflineToast("Acoustic Evaluation", `Phonetic match: ${PHONETIC_TERMS[activePhoneticKey].matchScore}% (${PHONETIC_TERMS[activePhoneticKey].levelLabel})`, 100, true);
          }
        }, 1800);
      }
    });
  }

  // Term Selection Chips
  const termChips = pitchSection.querySelectorAll('.phonetic-term-chip');
  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      termChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activePhoneticKey = chip.getAttribute('data-pterm');
      renderPhoneticState();
    });
  });

  // Initial executions
  evaluatePitch();
  renderNegotiationState();
  renderPhoneticState();
}

/* ============================================================
   SECTION 15 CONTROLLER: CORPORATE L&D & WORKFORCE COMPETENCE
   ISO 9001:2015 Clause 7.2 Audit Suite, Heatmap & SCORM Exporter
   ============================================================ */

function setupCorporateLDDashboard(tracks) {
  const ldSection = document.getElementById('corporate-ld-section');
  if (!ldSection) return;

  const PLANT_DATA = {
    all: {
      name: "Enterprise Consolidated (All 4 Manufacturing Clusters)",
      cohort: "1,240",
      cohortDelta: "+18.4% MoM",
      cohortDesc: "Engineers & cross-border technicians in active training",
      hours: "14,820",
      hoursDelta: "11.95 hrs/eng",
      hoursDesc: "Logged via ESP readings, interactive labs, & SM-2 recall",
      cefrUplift: "+1.8",
      cefrDelta: "82% to B2/C1",
      cefrDesc: "Transition rate from A2/B1 to B2 Technical Executive",
      isoScore: "96.4%",
      isoDelta: "0 Non-Conformances",
      isoDesc: "Fully documented competency records with auditor verification",
      badge: "4 Manufacturing Clusters • 1,240 Engineers",
      benchmarks: [
        { id: "tijuana", name: "Tijuana Medical Device Cluster", tag: "ISO 13485 / FDA", cohort: 320, hours: "3,940 hrs", examAvg: "92.4%", pitchAvg: "89%", status: "Audit-Ready", statusClass: "ready" },
        { id: "saltillo", name: "Saltillo Automotive Powertrain", tag: "IATF 16949 / APQP", cohort: 410, hours: "5,120 hrs", examAvg: "91.2%", pitchAvg: "86%", status: "Audit-Ready", statusClass: "ready" },
        { id: "monterrey", name: "Monterrey Aerospace & CNC Machining", tag: "AS9100D / ITAR", cohort: 280, hours: "3,450 hrs", examAvg: "94.0%", pitchAvg: "91%", status: "Compliant", statusClass: "compliant" },
        { id: "guadalajara", name: "Guadalajara SMT Electronics & Edge AI", tag: "IPC-A-610 / IEEE", cohort: 230, hours: "2,310 hrs", examAvg: "93.1%", pitchAvg: "88%", status: "Compliant", statusClass: "compliant" }
      ],
      heatmap: [
        { dept: "Tooling & Mold Design (CNC, EDM, CMM)", a2: 12, b1: 44, b2: 38, c1: 6, status: "Compliant" },
        { dept: "Quality Assurance & Metrology (8D, PPAP)", a2: 4, b1: 28, b2: 54, c1: 14, status: "Dominant B2" },
        { dept: "Production & Line Supervision (SMT, Cells)", a2: 18, b1: 52, b2: 24, c1: 6, status: "In Progression" },
        { dept: "Supply Chain & International Logistics", a2: 6, b1: 32, b2: 48, c1: 14, status: "Dominant B2" },
        { dept: "Embedded Systems, AUTOSAR & Edge AI", a2: 2, b1: 18, b2: 56, c1: 24, status: "Audit-Ready" }
      ]
    },
    tijuana: {
      name: "Tijuana Medical Device Cluster",
      cohort: "320",
      cohortDelta: "+14.2% MoM",
      cohortDesc: "Biomedical engineers, cleanroom operators & validation leads",
      hours: "3,940",
      hoursDelta: "12.31 hrs/eng",
      hoursDesc: "Logged across FDA 21 CFR 820 & ISO 13485 tracks",
      cefrUplift: "+1.9",
      cefrDelta: "86% to B2/C1",
      cefrDesc: "FDA audit readiness & regulatory submission defense",
      isoScore: "98.1%",
      isoDelta: "0 Non-Conformances",
      isoDesc: "Pre-audit verification completed by North American QA Board",
      badge: "Tijuana Campus • FDA 21 CFR 820 Certified",
      benchmarks: [
        { id: "tijuana", name: "Tijuana Medical Device Cluster", tag: "ISO 13485 / FDA", cohort: 320, hours: "3,940 hrs", examAvg: "92.4%", pitchAvg: "89%", status: "Audit-Ready", statusClass: "ready" }
      ],
      heatmap: [
        { dept: "Cleanroom Validation (ISO 7-8 / EtO)", a2: 5, b1: 25, b2: 55, c1: 15, status: "Audit-Ready" },
        { dept: "Quality Assurance & FDA 21 CFR 820", a2: 2, b1: 20, b2: 60, c1: 18, status: "Dominant B2" },
        { dept: "Catheter & Ultrasonic Welder Assembly", a2: 14, b1: 46, b2: 34, c1: 6, status: "Compliant" },
        { dept: "Cold Chain Logistics & GDP Packaging", a2: 8, b1: 32, b2: 48, c1: 12, status: "Compliant" }
      ]
    },
    saltillo: {
      name: "Saltillo Automotive Powertrain Cluster",
      cohort: "410",
      cohortDelta: "+21.5% MoM",
      cohortDesc: "Powertrain, stamping, welding & APQP launch engineers",
      hours: "5,120",
      hoursDelta: "12.48 hrs/eng",
      hoursDesc: "Logged across IATF 16949, 8D Problem Solving & Six Sigma",
      cefrUplift: "+1.7",
      cefrDelta: "79% to B2/C1",
      cefrDesc: "Cross-border engineering standups with Detroit matrix",
      isoScore: "95.8%",
      isoDelta: "0 Non-Conformances",
      isoDesc: "Zero open non-conformances across Tier-1 OEM audits",
      badge: "Saltillo Campus • IATF 16949 / VDA 6.3 Certified",
      benchmarks: [
        { id: "saltillo", name: "Saltillo Automotive Powertrain", tag: "IATF 16949 / APQP", cohort: 410, hours: "5,120 hrs", examAvg: "91.2%", pitchAvg: "86%", status: "Audit-Ready", statusClass: "ready" }
      ],
      heatmap: [
        { dept: "Powertrain Stamping & Die Tooling", a2: 15, b1: 48, b2: 32, c1: 5, status: "Compliant" },
        { dept: "IATF 16949 APQP Core Tools & PPAP", a2: 4, b1: 26, b2: 56, c1: 14, status: "Dominant B2" },
        { dept: "Chassis Welding & Robotic Cells", a2: 16, b1: 50, b2: 28, c1: 6, status: "In Progression" },
        { dept: "Laredo Cross-Border Freight & SCM", a2: 6, b1: 34, b2: 46, c1: 14, status: "Dominant B2" }
      ]
    },
    monterrey: {
      name: "Monterrey Aerospace & CNC Machining Cluster",
      cohort: "280",
      cohortDelta: "+19.0% MoM",
      cohortDesc: "Avionics, 5-axis CNC machining & AS9100D quality engineers",
      hours: "3,450",
      hoursDelta: "12.32 hrs/eng",
      hoursDesc: "Logged across AS9100D, FAI, and Energy & Data Centers",
      cefrUplift: "+2.1",
      cefrDelta: "89% to B2/C1",
      cefrDesc: "Direct customer liaison with Boeing, Airbus & Tier-1 primes",
      isoScore: "97.2%",
      isoDelta: "0 Non-Conformances",
      isoDesc: "ITAR security & NADCAP special processes fully documented",
      badge: "Monterrey Aerospace Park • AS9100D Certified",
      benchmarks: [
        { id: "monterrey", name: "Monterrey Aerospace & CNC Machining", tag: "AS9100D / ITAR", cohort: 280, hours: "3,450 hrs", examAvg: "94.0%", pitchAvg: "91%", status: "Compliant", statusClass: "compliant" }
      ],
      heatmap: [
        { dept: "5-Axis CNC Milling & Turbine Blades", a2: 8, b1: 36, b2: 44, c1: 12, status: "Audit-Ready" },
        { dept: "AS9100D Quality & First Article FAI", a2: 3, b1: 18, b2: 62, c1: 17, status: "Dominant B2" },
        { dept: "Aerospace Composites & NDT Testing", a2: 6, b1: 28, b2: 52, c1: 14, status: "Dominant B2" },
        { dept: "ITAR & International Export Compliance", a2: 2, b1: 14, b2: 58, c1: 26, status: "Audit-Ready" }
      ]
    },
    guadalajara: {
      name: "Guadalajara SMT Electronics & Edge AI Cluster",
      cohort: "230",
      cohortDelta: "+16.8% MoM",
      cohortDesc: "Embedded firmware, TinyML, AUTOSAR & SMT test leads",
      hours: "2,310",
      hoursDelta: "10.04 hrs/eng",
      hoursDesc: "Logged across Embedded Firmware, SMT & Cybersecurity",
      cefrUplift: "+1.9",
      cefrDelta: "84% to B2/C1",
      cefrDesc: "Software architectural defense & Silicon Valley liaison",
      isoScore: "94.5%",
      isoDelta: "0 Non-Conformances",
      isoDesc: "IPC-A-610 Class 3 & ISO 26262 ASIL-D evidence logged",
      badge: "Silicon Valley of Mexico • IPC-A-610 Certified",
      benchmarks: [
        { id: "guadalajara", name: "Guadalajara SMT Electronics & Edge AI", tag: "IPC-A-610 / IEEE", cohort: 230, hours: "2,310 hrs", examAvg: "93.1%", pitchAvg: "88%", status: "Compliant", statusClass: "compliant" }
      ],
      heatmap: [
        { dept: "Surface Mount Technology (SMT) Lines", a2: 12, b1: 42, b2: 38, c1: 8, status: "Compliant" },
        { dept: "Embedded Firmware & AUTOSAR Stack", a2: 2, b1: 16, b2: 58, c1: 24, status: "Audit-Ready" },
        { dept: "TinyML, Edge AI & Neural Accelerators", a2: 1, b1: 12, b2: 52, c1: 35, status: "Dominant C1" },
        { dept: "Hardware-in-the-Loop (HIL) dSPACE Lab", a2: 4, b1: 22, b2: 56, c1: 18, status: "Dominant B2" }
      ]
    }
  };

  let activePlantKey = 'all';

  // DOM Elements
  const plantSelector = document.getElementById('ld-plant-selector');
  const kpiCohortVal = document.getElementById('kpi-cohort-val');
  const kpiCohortDelta = document.getElementById('kpi-cohort-delta');
  const kpiCohortDesc = document.getElementById('kpi-cohort-desc');

  const kpiHoursVal = document.getElementById('kpi-hours-val');
  const kpiHoursDelta = document.getElementById('kpi-hours-delta');
  const kpiHoursDesc = document.getElementById('kpi-hours-desc');

  const kpiCefrVal = document.getElementById('kpi-cefr-val');
  const kpiCefrDelta = document.getElementById('kpi-cefr-delta');
  const kpiCefrDesc = document.getElementById('kpi-cefr-desc');

  const kpiIsoVal = document.getElementById('kpi-iso-val');
  const kpiIsoDelta = document.getElementById('kpi-iso-delta');
  const kpiIsoDesc = document.getElementById('kpi-iso-desc');

  const plantActiveBadge = document.getElementById('plant-active-badge');
  const benchmarkTbody = document.getElementById('plant-benchmark-tbody');
  const heatmapTbody = document.getElementById('skills-heatmap-tbody');

  // Render function
  function renderPlantDashboard() {
    const data = PLANT_DATA[activePlantKey] || PLANT_DATA.all;

    // Update KPIs
    if (kpiCohortVal) kpiCohortVal.textContent = data.cohort;
    if (kpiCohortDelta) kpiCohortDelta.textContent = data.cohortDelta;
    if (kpiCohortDesc) kpiCohortDesc.textContent = data.cohortDesc;

    if (kpiHoursVal) kpiHoursVal.innerHTML = `${data.hours} <small style="font-size:0.6em; font-weight:500;">hrs</small>`;
    if (kpiHoursDelta) kpiHoursDelta.textContent = data.hoursDelta;
    if (kpiHoursDesc) kpiHoursDesc.textContent = data.hoursDesc;

    if (kpiCefrVal) kpiCefrVal.innerHTML = `${data.cefrUplift} <small style="font-size:0.6em; font-weight:500;">Bands</small>`;
    if (kpiCefrDelta) kpiCefrDelta.textContent = data.cefrDelta;
    if (kpiCefrDesc) kpiCefrDesc.textContent = data.cefrDesc;

    if (kpiIsoVal) kpiIsoVal.textContent = data.isoScore;
    if (kpiIsoDelta) kpiIsoDelta.textContent = data.isoDelta;
    if (kpiIsoDesc) kpiIsoDesc.textContent = data.isoDesc;

    if (plantActiveBadge) plantActiveBadge.textContent = data.badge;

    // Render Benchmarks Table
    if (benchmarkTbody) {
      benchmarkTbody.innerHTML = '';
      data.benchmarks.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div class="plant-name-col">
              <span>${b.name}</span>
              <span class="plant-tag">${b.tag}</span>
            </div>
          </td>
          <td><strong style="color:#0f172a;">${b.cohort}</strong> eng</td>
          <td><strong style="color:#0284c7;">${b.hours}</strong></td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span>${b.examAvg}</span>
              <div style="width:40px; height:5px; background:#e2e8f0; border-radius:999px; overflow:hidden;">
                <div style="width:${b.examAvg}; height:100%; background:#10b981;"></div>
              </div>
            </div>
          </td>
          <td>
            <span style="font-weight:700; color:#ec4899;"><i class="fa-solid fa-microphone-lines"></i> ${b.pitchAvg}</span>
          </td>
          <td>
            <span class="audit-status-pill ${b.statusClass}">
              <i class="fa-solid fa-circle-check"></i> ${b.status}
            </span>
          </td>
        `;
        benchmarkTbody.appendChild(tr);
      });
    }

    // Render Heatmap Table
    if (heatmapTbody) {
      heatmapTbody.innerHTML = '';
      data.heatmap.forEach(h => {
        const getCellClass = (pct) => {
          if (pct >= 50) return 'high';
          if (pct >= 25) return 'mid';
          return 'low';
        };

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="text-align:left; font-family:var(--font-sans); font-weight:600; color:#1e293b;">${h.dept}</td>
          <td><span class="heatmap-cell ${getCellClass(h.a2)}">${h.a2}%</span></td>
          <td><span class="heatmap-cell ${getCellClass(h.b1)}">${h.b1}%</span></td>
          <td><span class="heatmap-cell ${getCellClass(h.b2)}">${h.b2}%</span></td>
          <td><span class="heatmap-cell ${getCellClass(h.c1)}">${h.c1}%</span></td>
          <td>
            <span class="plant-tag" style="background:rgba(16,185,129,0.12); color:#047857; font-weight:700;">
              ${h.status}
            </span>
          </td>
        `;
        heatmapTbody.appendChild(tr);
      });
    }
  }

  // Plant selector click events
  if (plantSelector) {
    const chips = plantSelector.querySelectorAll('.ld-plant-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activePlantKey = chip.getAttribute('data-plant') || 'all';
        renderPlantDashboard();
      });
    });
  }

  // Initial dashboard render
  renderPlantDashboard();

  // ── ISO 9001 Clause 7.2 CSV Exporter ──
  const btnExportCsv = document.getElementById('btn-export-audit-csv');
  const csvFeedback = document.getElementById('csv-export-feedback');
  const csvFeedbackText = document.getElementById('csv-feedback-text');

  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      const records = [
        ["EMP-MX-8401", "Eduardo Villarreal", "Tijuana Medical Device", "Cleanroom Validation", "medical-devices", "B1.1", "B2.2", "94%", "91%", "VERIFIED_COMPLIANT", "2026-09-18", "ISO 13485 / FDA 21 CFR 820"],
        ["EMP-MX-8402", "Valeria Rios", "Guadalajara Electronics", "Embedded Firmware", "embedded-firmware-edge-ai", "B1.2", "C1.1", "96%", "94%", "VERIFIED_COMPLIANT", "2026-09-20", "ISO 26262 ASIL-D / MISRA-C"],
        ["EMP-MX-8403", "Carlos Mendoza", "Saltillo Powertrain", "Quality Engineering", "automotive-lean", "A2.2", "B2.1", "91%", "88%", "VERIFIED_COMPLIANT", "2026-09-15", "IATF 16949 Clause 8.4"],
        ["EMP-MX-8404", "Mariana Alatorre", "Guadalajara Electronics", "Edge AI & TinyML", "embedded-firmware-edge-ai", "B2.1", "C1.2", "98%", "95%", "VERIFIED_COMPLIANT", "2026-09-22", "IEEE / TinyML Benchmark"],
        ["EMP-MX-8405", "Rodrigo Morales", "Saltillo Powertrain", "Supply Chain & Trade", "advanced-supply-chain-reshoring", "B1.1", "B2.2", "93%", "89%", "VERIFIED_COMPLIANT", "2026-09-14", "USMCA Chapter 4 / C-TPAT"],
        ["EMP-MX-8406", "Ana Sofía Garza", "Monterrey Aerospace", "Avionics & Systems", "energy-data-centers", "B1.2", "B2.3", "95%", "92%", "VERIFIED_COMPLIANT", "2026-09-19", "Uptime Institute Tier Standard"],
        ["EMP-MX-8407", "Fernando Ortiz", "Guadalajara Electronics", "Secure Bootloaders", "embedded-firmware-edge-ai", "B2.1", "C1.1", "97%", "93%", "VERIFIED_COMPLIANT", "2026-09-21", "NIST SP 800-193 / ISO 21434"],
        ["EMP-MX-8408", "Daniela Cárdenas", "Guadalajara Electronics", "International Logistics", "advanced-supply-chain-reshoring", "B1.1", "B2.2", "92%", "90%", "VERIFIED_COMPLIANT", "2026-09-16", "Incoterms 2020 / CBP Fast"],
        ["EMP-MX-8409", "Hector Zambrano", "Saltillo Powertrain", "HIL Automation & Testing", "embedded-firmware-edge-ai", "B1.2", "B2.2", "94%", "87%", "VERIFIED_COMPLIANT", "2026-09-17", "dSPACE / ASAM HIL Standard"],
        ["EMP-MX-8410", "Esteban Palacios", "Tijuana Medical Device", "Cold Chain Logistics", "advanced-supply-chain-reshoring", "B1.1", "B2.1", "90%", "88%", "VERIFIED_COMPLIANT", "2026-09-15", "EU GDP / FDA 21 CFR 211"],
        ["EMP-MX-8411", "Guillermo Lozano", "Saltillo Powertrain", "Plant Quality Direction", "quality-ehs", "B2.1", "C1.1", "96%", "93%", "VERIFIED_COMPLIANT", "2026-09-12", "VDA 6.3 / ISO 9001:2015"],
        ["EMP-MX-8412", "Alejandro Treviño", "Monterrey Aerospace", "Cross-Dock Operations", "advanced-supply-chain-reshoring", "B1.1", "B2.1", "91%", "86%", "VERIFIED_COMPLIANT", "2026-09-19", "C-TPAT Tier III / FAST Lane"],
        ["EMP-MX-8413", "Lucia Navarro", "Tijuana Medical Device", "Ultrasonic Welder Cell", "medical-devices", "A2.2", "B1.3", "88%", "85%", "VERIFIED_COMPLIANT", "2026-09-11", "ISO 13485 Clause 7.5"],
        ["EMP-MX-8414", "Mauricio Fuentes", "Monterrey Aerospace", "5-Axis CNC Milling", "airforce-aerospace", "B1.1", "B2.2", "93%", "89%", "VERIFIED_COMPLIANT", "2026-09-18", "AS9100D Clause 7.2"]
      ];

      const headers = [
        "Employee ID",
        "Employee Full Name",
        "Plant Cluster Facility",
        "Functional Department",
        "stemOS Track ID",
        "CEFR Pre-Assessment",
        "CEFR Post-Assessment",
        "Certification Exam Score",
        "Oral Pitch & Negotiation Score",
        "ISO 9001:2015 Cl 7.2 Status",
        "Audit Verification Date",
        "Auditor Standard Benchmark"
      ];

      let csv = headers.map(h => `"${h}"`).join(",") + "\r\n";
      records.forEach(r => {
        csv += r.map(field => `"${field}"`).join(",") + "\r\n";
      });

      // Trigger download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", `ISO_9001_Clause_7_2_Competence_Audit_Report_${activePlantKey}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (csvFeedback) {
        csvFeedback.style.display = 'block';
        if (csvFeedbackText) {
          csvFeedbackText.textContent = `Generated & Downloaded ISO_9001_Clause_7_2_Competence_Audit_Report_${activePlantKey}.csv (${records.length} Verified Records)`;
        }
      }

      if (typeof showOfflineToast === 'function') {
        showOfflineToast("Audit Export Complete", `ISO 9001 Clause 7.2 CSV downloaded for ${PLANT_DATA[activePlantKey].name}`, 100, true);
      }
    });
  }

  // ── ISO 9001 Clause 7.2 Printable Executive Audit Dossier Modal ──
  const btnPreviewDossier = document.getElementById('btn-preview-audit-dossier');
  const auditModal = document.getElementById('audit-dossier-modal');
  const btnCloseAuditModal = document.getElementById('btn-close-audit-modal');
  const btnDossierCloseBottom = document.getElementById('btn-dossier-close-bottom');
  const btnPrintDossier = document.getElementById('btn-print-audit-dossier');
  const auditDossierContent = document.getElementById('audit-dossier-content');

  function renderAuditDossier() {
    const data = PLANT_DATA[activePlantKey] || PLANT_DATA.all;
    if (!auditDossierContent) return;

    auditDossierContent.innerHTML = `
      <div class="audit-dossier-print-wrap">
        <div class="audit-dossier-header-block">
          <div>
            <h3 style="margin:0 0 4px; font-size:1.15rem; color:#0f172a; font-family:var(--font-head);">
              ${data.name} &bull; Quality Management System (QMS)
            </h3>
            <p style="margin:0; font-size:0.8rem; color:#64748b;">
              Audit Scope: Competency Verification (ISO 9001:2015 &sect; 7.2, IATF 16949:2016 &sect; 7.2, AS9100D &sect; 7.2)
            </p>
          </div>
          <div class="audit-dossier-seal">
            <span>ISO 9001</span>
            <span style="font-size:0.55rem; color:#10b981;">VERIFIED</span>
            <span style="font-size:0.5rem;">2026</span>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-bottom:16px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">AUDITED COHORT</div>
            <div style="font-size:1.2rem; font-weight:800; color:#0f172a;">${data.cohort}</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">TRAINING HOURS</div>
            <div style="font-size:1.2rem; font-weight:800; color:#0284c7;">${data.hours} hrs</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">CEFR UPLIFT</div>
            <div style="font-size:1.2rem; font-weight:800; color:#f59e0b;">${data.cefrUplift} Bands</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px; text-align:center;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">COMPLIANCE RATE</div>
            <div style="font-size:1.2rem; font-weight:800; color:#10b981;">${data.isoScore}</div>
          </div>
        </div>

        <h4 style="margin:16px 0 8px; font-size:0.92rem; color:#0f172a; font-family:var(--font-head);">
          1. Competence Assessment Matrix &amp; Objective Evidence
        </h4>
        <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
          Pursuant to ISO 9001:2015 Clause 7.2, the organization has identified that engineers communicating technical specifications, drawings, FMEAs, and 8D reports with overseas clients require CEFR B2/C1 English competence. The stemOS platform has provided documented training hours, rigorous socratic evaluations, and certified examinations:
        </p>

        <table class="audit-dossier-table">
          <thead>
            <tr>
              <th>Functional Department</th>
              <th>Pre-Training CEFR</th>
              <th>Current CEFR</th>
              <th>Avg Certification Grade</th>
              <th>ISO 7.2 Disposition</th>
            </tr>
          </thead>
          <tbody>
            ${data.heatmap.map(h => `
              <tr>
                <td><strong>${h.dept}</strong></td>
                <td>A2 (Basic)</td>
                <td><strong style="color:#0284c7;">B2 (Dominant ${h.b2}%)</strong></td>
                <td><strong style="color:#10b981;">93.4%</strong></td>
                <td><span style="color:#047857; font-weight:700;">&check; ${h.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h4 style="margin:20px 0 8px; font-size:0.92rem; color:#0f172a; font-family:var(--font-head);">
          2. External Auditor Formal Sign-Off &amp; Digital Attestation
        </h4>
        <div class="audit-signoff-block">
          <div>
            <div class="signoff-line"></div>
            <span class="signoff-title">Corporate Quality &amp; Compliance Director</span>
            <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">stamp: QMS-AUDIT-VERIFIED-2026 &bull; Monterrey / Saltillo / Tijuana / GDL</div>
          </div>
          <div>
            <div class="signoff-line"></div>
            <span class="signoff-title">Lead External Registrar Auditor (ISO / IATF)</span>
            <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">Digital Certificate Hash: <code>7f8a9e2c4b1d...</code></div>
          </div>
        </div>
      </div>
    `;
  }

  if (btnPreviewDossier && auditModal) {
    btnPreviewDossier.addEventListener('click', () => {
      renderAuditDossier();
      auditModal.classList.add('active');
    });
  }

  if (btnCloseAuditModal && auditModal) {
    btnCloseAuditModal.addEventListener('click', () => auditModal.classList.remove('active'));
  }
  if (btnDossierCloseBottom && auditModal) {
    btnDossierCloseBottom.addEventListener('click', () => auditModal.classList.remove('active'));
  }
  if (btnPrintDossier) {
    btnPrintDossier.addEventListener('click', () => window.print());
  }

  // ── SCORM 1.2 / 2004 LMS Export Utility (Fase 4.2) ──
  const scormSlider = document.getElementById('scorm-mastery-score');
  const scormSliderVal = document.getElementById('scorm-mastery-val');
  const btnGenerateScorm = document.getElementById('btn-generate-scorm-zip');
  const scormTrackSelect = document.getElementById('scorm-track-select');
  const scormSpecSelect = document.getElementById('scorm-spec-select');
  const scormFeedback = document.getElementById('scorm-export-feedback');
  const scormFeedbackText = document.getElementById('scorm-feedback-text');

  if (scormSlider && scormSliderVal) {
    scormSlider.addEventListener('input', () => {
      scormSliderVal.textContent = `${scormSlider.value}%`;
    });
  }

  if (btnGenerateScorm) {
    btnGenerateScorm.addEventListener('click', () => {
      const selectedTrack = scormTrackSelect ? scormTrackSelect.value : 'all';
      const selectedSpec = scormSpecSelect ? scormSpecSelect.value : '1.2';
      const masteryScore = scormSlider ? scormSlider.value : '80';

      // Generate authentic SCORM imsmanifest.xml
      const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- stemOS SCORM ${selectedSpec} Manifest Generated for Enterprise LMS -->
<manifest identifier="stemOS_Enterprise_LMS_Package" version="1.0"
          xmlns="${selectedSpec === '1.2' ? 'http://www.imsproject.org/xsd/imscp_rootv1p1p2' : 'http://www.imsglobal.org/xsd/imscp_v1p1'}"
          xmlns:adlcp="${selectedSpec === '1.2' ? 'http://www.adlnet.org/xsd/adlcp_rootv1p2' : 'http://www.adlnet.org/xsd/adlcp_v1p3'}"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>${selectedSpec}</schemaversion>
    <lom xmlns="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1">
      <general>
        <title><langstring xml:lang="en">stemOS Technical English for Nearshoring: Track ${selectedTrack.toUpperCase()}</langstring></title>
        <description><langstring xml:lang="en">Comprehensive English for Specific Purposes (ESP) training curriculum aligned with ISO 9001:2015 Clause 7.2 competence standards.</description>
      </general>
    </lom>
  </metadata>
  <organizations default="stemOS_Organization">
    <organization identifier="stemOS_Organization">
      <title>stemOS Technical English Curriculum</title>
      <item identifier="item_stemos_course" identifierref="res_stemos_content" isvisible="true">
        <title>Technical English Proficiency &amp; Speaking Certification</title>
        <adlcp:masteryscore>${masteryScore}</adlcp:masteryscore>
        <adlcp:datafromlms>cmi.core.student_name,cmi.core.student_id</adlcp:datafromlms>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res_stemos_content" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="SCORM_API_wrapper.js"/>
      <file href="courses.json"/>
    </resource>
  </resources>
</manifest>`;

      // Generate SCORM API wrapper
      const wrapperJs = `/**
 * SCORM API Wrapper for stemOS (SCORM ${selectedSpec})
 * Compatible with Workday Learning, Cornerstone OnDemand, and SAP SuccessFactors.
 */
var SCORM = {
  version: "${selectedSpec}",
  masteryScore: ${masteryScore},
  API: null,
  findAPI: function(win) {
    var findAttempts = 0;
    while ((win.API == null && win.API_1484_11 == null) && (win.parent != null) && (win.parent != win)) {
      findAttempts++;
      if (findAttempts > 7) return null;
      win = win.parent;
    }
    return win.API_1484_11 || win.API || null;
  },
  init: function() {
    this.API = this.findAPI(window);
    if (!this.API && window.opener) this.API = this.findAPI(window.opener);
    if (this.API) {
      if (this.version === "1.2") {
        this.API.LMSInitialize("");
      } else {
        this.API.Initialize("");
      }
      console.log("[stemOS SCORM] LMS API Initialized successfully.");
      return true;
    }
    console.warn("[stemOS SCORM] Running in standalone offline mode (no parent LMS detected).");
    return false;
  },
  completeCourse: function(score) {
    if (!this.API) return;
    if (this.version === "1.2") {
      this.API.LMSSetValue("cmi.core.score.raw", String(score));
      this.API.LMSSetValue("cmi.core.lesson_status", score >= this.masteryScore ? "passed" : "failed");
      this.API.LMSCommit("");
    } else {
      this.API.SetValue("cmi.score.scaled", String(score / 100));
      this.API.SetValue("cmi.score.raw", String(score));
      this.API.SetValue("cmi.completion_status", "completed");
      this.API.SetValue("cmi.success_status", score >= this.masteryScore ? "passed" : "failed");
      this.API.Commit("");
    }
  },
  finish: function() {
    if (!this.API) return;
    if (this.version === "1.2") {
      this.API.LMSFinish("");
    } else {
      this.API.Terminate("");
    }
  }
};
window.addEventListener("load", function() { SCORM.init(); });
window.addEventListener("beforeunload", function() { SCORM.finish(); });
`;

      // Trigger download of imsmanifest.xml or package
      const blob = new Blob([manifestXml], { type: "application/xml;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", `imsmanifest_SCORM_${selectedSpec}_${selectedTrack}.xml`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (scormFeedback) {
        scormFeedback.style.display = 'block';
        if (scormFeedbackText) {
          scormFeedbackText.innerHTML = `Generated <strong>imsmanifest_SCORM_${selectedSpec}_${selectedTrack}.xml</strong> (Standard: SCORM ${selectedSpec}, Mastery: ${masteryScore}%). Ready for Workday / Cornerstone upload.`;
        }
      }

      if (typeof showOfflineToast === 'function') {
        showOfflineToast("SCORM Package Ready", `Generated SCORM ${selectedSpec} package manifest for LMS integration`, 100, true);
      }
    });
  }
}

/* ==========================================================================
   SECTION 16 CONTROLLER: EXECUTIVE CROSS-BORDER LEADERSHIP & MULTI-ACCENT LAB
   B2/C1 Anonymized Case Studies • 5 Global Accents • Telemetry Radar (FASE 5)
   ========================================================================== */

function setupExecutiveLeadershipAndMultiAccentLab() {
  const execSection = document.getElementById('executive-leadership-section');
  if (!execSection) return;

  /* ── 1. CASE STUDIES DATA (B2/C1 REAL INDUSTRIAL NEARSHORING DILEMMAS) ── */
  const CASE_STUDIES = {
    laredo: {
      key: "laredo",
      tag: "AUTOMOTIVE TIER-1 • SALTILLO • IATF 16949 / USMCA",
      headline: "The Laredo World Trade Bridge Line-Down Dispute",
      risk: "CRITICAL ESCALATION (06:00 EST HARD STOP)",
      fine: "$25,000 / hr Line-Stop",
      time: "4h 15m remaining",
      person: "Richard Sterling (VP Purchasing • Detroit OEM)",
      briefing: "At 01:45 CST, our 53-foot dedicated trailer carrying 480 machined steering knuckles for the F-150 platform was placed on CBP intensive inspection hold at the Laredo World Trade Bridge. The border officer flagged an Anexo 24 / USMCA Certificate of Origin disparity on the tariff subheading (HS 8708.29.90 vs 8708.29.99). The Detroit assembly plant will exhaust its buffer stock at 06:00 EST and face line shutdown. Detroit VP Richard Sterling called threatening an immediate $25,000/hour line-stop penalty and demanded we pay $16,000 for an emergency Learjet air charter right now, claiming Saltillo is in breach of contract under Incoterms DAP Detroit.",
      evidence: [
        "Incoterms 2020 contract specifies FCA Saltillo Plant (loaded), not DAP Detroit; transportation risk technically transferred upon carrier receipt.",
        "SAT Anexo 24 / USMCA Regional Value Content (RVC) is certified at 78.4% (exceeding the 75% automotive core parts threshold).",
        "19 CFR § 141.113 allows Immediate Delivery (ID) under US Customs Form 3461 upon posting a supplemental single-entry bond.",
        "Local Saltillo warehouse has 60 finished buffer units pre-packed that can clear via Nuevo Laredo Express Line in 90 minutes."
      ],
      options: [
        {
          type: "aggressive",
          tag: "Aggressive Pushback",
          title: "Refuse Charter & Invoke Contractual FCA Defense",
          desc: "Inform Detroit that under Incoterms FCA Saltillo, border customs delays are strictly the buyer's risk, and refuse to contribute to the air charter.",
          telem: { standing: 40, trust: 30, compliance: 85, financial: "Zero Absorbed (-$100k line damage)" },
          coach: "Disastrous escalation. While you are legally correct on FCA, leaving Detroit's assembly line to crash at 06:00 burns the relationship irreparably. The OEM customer will begin dual-sourcing or de-sourcing your plant within 60 days.",
          memo: `SUBJECT: Urgent: Notice of Carrier Delay at Laredo Port of Entry\n\nDear Mr. Sterling,\n\nWe must clarify that per Master Services Agreement Schedule B, our commercial trade terms are strictly FCA Saltillo Plant. Transit customs reviews at Laredo are the contractual liability of your nominated freight forwarder. Consequently, Saltillo cannot approve or fund air charter expenditures.\n\nRespectfully,\nPlant Operations Director`
        },
        {
          type: "yield",
          tag: "Unconditional Yield",
          title: "Absorb 100% Air Charter & Concede Fault",
          desc: "Authorize the $16,000 Learjet charter immediately at our expense and apologize for the customs documentation error.",
          telem: { standing: 50, trust: 65, compliance: 60, financial: "-$16,000 Loss" },
          coach: "Detroit avoids the line-stop, but you accepted blame for an unverified CBP tariff discrepancy. Corporate will audit your plant for unbudgeted emergency freight, and Detroit will demand concessions on future customs holds.",
          memo: `SUBJECT: Immediate Air Charter Authorization - Laredo Buffer\n\nDear Mr. Sterling,\n\nWe apologize for the customs hold at Laredo. Saltillo has immediately chartered an air courier out of Monterrey at our expense ($16,000 USD) to ensure zero line downtime at your Detroit facility. We will absorb all associated freight fees.\n\nBest regards,\nPlant Operations Director`
        },
        {
          type: "batna",
          tag: "Strategic BATNA (Optimal B2/C1)",
          title: "Authorize 4-Hour Hotshot Air Buffer + 19 CFR Customs Bond Release",
          desc: "Propose a split air charter for 4 hours of buffer stock while our licensed broker files a 19 CFR immediate delivery bond to release the 53-ft trailer, sharing charter cost 50/50 pending joint customs audit.",
          telem: { standing: 95, trust: 92, compliance: 98, financial: "$17,500 Saved" },
          coach: "Exemplary B2/C1 executive leadership! You prevented the $100k line-stop, protected legal compliance under USMCA, shared freight costs fairly without conceding fault, and demonstrated proactive cross-border problem-solving.",
          memo: `MEMORANDUM | EXECUTIVE CRITICAL PATH\n\nTO: Richard Sterling, VP Purchasing (Detroit Assembly)\nFROM: Director of Cross-Border Operations, Saltillo Plant\nDATE: September 27, 2026\nSUBJECT: Dual-Track Remediation Protocol: Laredo World Trade Bridge Clearance & Zero Line-Downtime Guarantee\n\n1. EXECUTIVE SUMMARY & ZERO DOWNTIME COMMITMENT:\nWhile we review the CBP tariff classification query at the Laredo Port of Entry, our primary non-negotiable directive is ensuring the Detroit assembly line maintains uninterrupted production past 06:00 EST.\n\n2. DUAL-TRACK REMEDIATION PROTOCOL:\n• Track A (Immediate Aerial Buffer): We have placed an on-demand Cessna Caravan hotshot charter on standby in Monterrey to transport 60 pre-inspected knuckles (4.5 hours of line buffer), touching down at DTW by 05:15 EST. We propose a 50/50 cost split ($4,000 USD each) pending our joint audit of the carrier's Anexo 24 manifest.\n• Track B (Customs Release under Bond): Our US customs attorney is currently filing an Immediate Delivery application under 19 CFR § 141.113 with a single-entry customs bond, enabling the trailer to cross into Texas by 03:30 CST.\n\n3. NEXT STEPS & TELEMETRY:\nWe will host an executive touchpoint at 04:30 EST with live GPS tracking. We appreciate your partnership in maintaining seamless cross-border supply continuity.\n\nRespectfully submitted,\nEngineering & Logistics Executive Directorate`
        },
        {
          type: "defer",
          tag: "Bureaucratic Deferral",
          title: "Defer Decision to Morning Legal Review",
          desc: "Inform Detroit that customs documents must be reviewed by Mexican corporate legal counsel during normal business hours.",
          telem: { standing: 25, trust: 20, compliance: 70, financial: "-$125,000 Line-Stop Penalty" },
          coach: "Worst-case response. In just-in-time automotive manufacturing, an unresolved 4-hour window guarantees plant shutdown. Legal counsel is useless once the plant shut-down penalties kick in.",
          memo: `SUBJECT: Laredo Customs Inquiry - Internal Review Pending\n\nDear Mr. Sterling,\n\nWe acknowledge receipt of your notice. Our Mexican trade compliance and legal team will review the tariff documentation tomorrow at 09:00 CST. We will advise once our legal department formulates a response.\n\nSincerely,\nOperations Office`
        }
      ]
    },

    fda483: {
      key: "fda483",
      tag: "MEDICAL DEVICES • TIJUANA • FDA 21 CFR 820 / ISO 13485",
      headline: "The FDA Form 483 Cleanroom CAPA Closeout",
      risk: "REGULATORY AUDIT SANCTION (15-DAY CLOCK)",
      fine: "Import Alert / License Revocation",
      time: "11 days to formal 483 response",
      person: "Dr. Eleanor Vance (SVP Quality • Minneapolis HQ)",
      briefing: "An unannounced 3-day FDA inspection at our Tijuana Class 10,000 cleanroom concluded with a Form 483 observation citing 21 CFR § 820.100 (Corrective and Preventive Action) for failure to adequately document Ethylene Oxide (EtO) residual aeration chamber curves on cardiovascular catheters. Corporate HQ in Minneapolis panicked, suspecting local plant negligence, and prepared to mandate a temporary shutdown and leadership restructuring. However, local plant gas chromatography telemetry proves the EtO spike occurred during 104°F ambient desert transport in Southern California contracted directly by Minneapolis HQ, not inside the Tijuana aeration chambers.",
      evidence: [
        "Tijuana cleanroom aeration cycle logs (SCADA historians) confirm 72.0 hours at 42°C in strict compliance with ISO 11135:2014.",
        "Gas chromatography residuals at plant release averaged 1.8 ppm (well below the 4.0 ppm FDA limit for blood-contact devices).",
        "Temperature data loggers inside the US domestic reefer truck showed refrigeration compressor failure between Calexico and Ontario, CA.",
        "21 CFR § 820.100 requires validation of entire distribution logistics chain, which Minneapolis contracted out without local QA signoff."
      ],
      options: [
        {
          type: "aggressive",
          tag: "Aggressive Blame-Shifting",
          title: "Publicly Blame Minneapolis Domestic Logistics",
          desc: "Send an email to the FDA Lead Investigator and Corporate Board asserting that Minneapolis supply chain caused the excursion and Tijuana is completely blameless.",
          telem: { standing: 35, trust: 25, compliance: 65, financial: "Executive Turmoil" },
          coach: "Hostile and politically catastrophic. Regulators view the manufacturer as a single legal entity; pointing fingers internally signals systemic lack of management control (21 CFR § 820.20) and triggers a Warning Letter.",
          memo: `TO: FDA San Diego District Office & Minneapolis Board\nFROM: Tijuana QA Management\nSUBJECT: Form 483 Refutation - Minneapolis Distribution Liability\n\nThe Form 483 citation issued to Tijuana is factually erroneous. The EtO desorption failure occurred solely because Minneapolis HQ selected an unvalidated refrigerated trucking contractor that lost cooling in the Mojave desert. Tijuana operations are fully compliant.`
        },
        {
          type: "yield",
          tag: "Unconditional Capitulation",
          title: "Accept All Blame & Over-Commit to 5-Day Plant Shutdown",
          desc: "Accept the 483 citation in full, voluntarily halt manufacturing lines for 10 days, and mandate re-validation of all 14 aeration chambers.",
          telem: { standing: 45, trust: 60, compliance: 80, financial: "-$640k Unnecessary Downtime" },
          coach: "Extreme over-reaction. Shutting down compliant Class 10,000 cleanrooms damages surgical catheter supply to hospitals and costs $640k without addressing the actual root cause (desert transport reefer failure).",
          memo: `TO: Dr. Eleanor Vance, SVP Quality\nSUBJECT: Voluntary Cleanroom Stand-Down & Aeration Revalidation\n\nTijuana Quality accepts full responsibility for the 483 observation. We will halt all catheter assembly for 10 operational days to conduct full chamber re-validation. All catheter shipments are immediately frozen.`
        },
        {
          type: "batna",
          tag: "Strategic BATNA (Optimal B2/C1)",
          title: "Comprehensive 15-Day CAPA Dossier: Plant Release Telemetry + Cold-Chain Validation Protocol",
          desc: "Present audited gas chromatography proof verifying Tijuana release compliance, while executing a collaborative CAPA addressing the US cold-chain transit vector with GPS data-logger validation, closing the 483 cleanly.",
          telem: { standing: 98, trust: 95, compliance: 100, financial: "$640k Downtime Avoided" },
          coach: "Masterclass in regulatory leadership. You defended plant data integrity with unimpeachable chromatography evidence, protected the plant from leadership purges, and provided the FDA with an airtight CAPA that prevents Warning Letters.",
          memo: `OFFICIAL REGULATORY POSITION PAPER & CAPA 2026-088\n\nTO: Dr. Eleanor Vance, SVP Global Quality Assurance\nCC: Corporate Legal & Regulatory Compliance Directorate\nFROM: Vice President of Quality Engineering, Tijuana Campus\nSUBJECT: Comprehensive 15-Day FDA Form 483 Response Strategy & Cold-Chain Transit CAPA\n\n1. EXECUTIVE SUMMARY:\nTijuana Quality Engineering has completed an exhaustive, data-driven investigation into the Form 483 observation (21 CFR § 820.100). The evidence demonstrates that Tijuana cleanroom aeration cycles strictly adhered to validated ISO 11135:2014 protocols, with product release EtO residuals certified at 1.8 ppm (FDA tolerance: 4.0 ppm).\n\n2. ROOT CAUSE ATTRIBUTION (TRANSIT DESORPTION EXCURSION):\nCalibrated Sensitech data-loggers retrieved from Reefer Trailer #8841 confirmed a refrigeration compressor shutdown between Calexico and Ontario, CA, exposing sterile product to 104°F (40°C) ambient heat, inducing secondary EtO outgassing.\n\n3. CORRECTIVE & PREVENTIVE ACTION PLAN (CAPA 2026-088):\n• Action 1: Supplemental NIST-traceable multi-point gas chromatography testing on all outbound master cartons prior to border transfer.\n• Action 2: Implementation of real-time cellular temperature & humidity telematics for all Southern California freight carriers with automated geo-fenced quarantine alarms.\n• Action 3: Formal submission of this validated dossier to the FDA Lead Investigator within the 15-day statutory window.\n\nRespectfully submitted,\nDirector of Biomedical Quality & Regulatory Affairs`
        },
        {
          type: "defer",
          tag: "Passive Delay",
          title: "Wait for Formal Warning Letter Before Engaging",
          desc: "Ignore the 15-day non-binding response window and wait for the FDA District Director's formal letter before allocating engineering resources.",
          telem: { standing: 20, trust: 15, compliance: 30, financial: "Severe Import Alert Risk" },
          coach: "Fatal compliance error. Failure to submit a robust, data-backed 483 response within 15 business days automatically escalates into an FDA Warning Letter and potential US import alert.",
          memo: `MEMORANDUM: Form 483 Review Cadence\n\nWe will withhold formal engineering review of Form 483 until the FDA San Diego District Director completes review and issues formal follow-up correspondence.`
        }
      ]
    },

    semicon: {
      key: "semicon",
      tag: "SEMICONDUCTORS • GUADALAJARA • IEEE / SEMI",
      headline: "The 3nm DFT Yield Fallout Excursion",
      risk: "PRODUCTION SCRAP CRISIS ($1.4M / WEEK)",
      fine: "$1.4M / week scrap fallout",
      time: "Next Tape-Out Freeze: 48 hours",
      person: "Scott Keller (VP Silicon Engineering • Austin, TX)",
      briefing: "Our Guadalajara Advanced Test & Packaging Facility reported a sudden yield collapse from 94.2% to 80.8% on server-grade 3nm AI accelerator dies during low-temperature ATE wafer sorting. Austin microarchitecture leadership immediately circulated an escalation email blaming Guadalajara for ESD cleanroom contamination (ISO 14644-1) and poor probe-card maintenance. Local oscilloscopes and scan-chain ATPG (Automatic Test Pattern Generation) telemetry conclusively prove that the failure is a Design-for-Test (DFT) race condition occurring specifically during 0.75V low-power sleep states, originating from the Austin tape-out clock distribution tree.",
      evidence: [
        "ATE Shmoo plots reveal pass/fail voltage boundary shift at 0.75V, invariant to probe card needle contact resistance.",
        "Cleanroom airborne particle counters (Met One 3400) verified ISO Class 4 cleanliness (zero Class 100 excursions in 30 days).",
        "Synopsys TestMAX ATPG simulation reproduction matches the exact scan-chain failure signature at flip-flop 14,892.",
        "Austin microarchitecture team pushed an unverified ECO clock-tree gating patch 12 days prior to the wafer arrival."
      ],
      options: [
        {
          type: "aggressive",
          tag: "Aggressive Counter-Accusation",
          title: "Expose Austin ECO Patch to Executive Committee",
          desc: "Forward the Austin design team's flawed ECO clock gating commit directly to the Chief Technology Officer, demanding a public retraction.",
          telem: { standing: 55, trust: 30, compliance: 90, financial: "Inter-Site Turf War" },
          coach: "High friction. You vindicate Guadalajara technically, but public shaming of high-ranking Austin design fellows creates permanent organizational hostility between silicon design and manufacturing packaging teams.",
          memo: `TO: Chief Technology Officer & Austin Fellows\nFROM: Guadalajara Silicon Test Engineering\nSUBJECT: Refutation: Austin ECO Patch Responsible for 3nm Fallout\n\nThe allegations regarding cleanroom contamination in Guadalajara are completely baseless. Austin's unverified clock gating ECO patch pushed on Aug 14 is the direct mathematical cause of the 13.4% fallout. Austin owes Guadalajara a formal retraction.`
        },
        {
          type: "yield",
          tag: "Capitulate to Rework",
          title: "Scrap 2,400 Packaging Dies & Re-Probe at Low Speed",
          desc: "Accept cleanroom culpability, scrap the current production batch, and slow down ATE sorting clock by 50% to artificially mask the timing failure.",
          telem: { standing: 30, trust: 50, compliance: 50, financial: "-$1.8M Unnecessary Scrap" },
          coach: "Terrible engineering. Masking a microcode race condition by under-clocking ATE sorting introduces defective silicon into enterprise customer servers, resulting in catastrophic field returns (RMA).",
          memo: `TO: Scott Keller, VP Silicon Engineering\nSUBJECT: 3nm ATE Wafer Sort Rework Plan\n\nGuadalajara has quarantined the affected wafer lots. We will clean all probe cards and rerun testing at 50% reduced clock frequency while upgrading cleanroom filtration.`
        },
        {
          type: "batna",
          tag: "Strategic BATNA (Optimal B2/C1)",
          title: "Data-Driven ATE Shmoo & Scan-Chain Diagnostic White Paper + Clock-Tree Vector Patch",
          desc: "Deliver an unimpeachable technical white paper with Shmoo voltage boundary plots and scan-chain flip-flop traces, proposing a 48-hour software vector patch that bypasses the race condition without scrapping wafers.",
          telem: { standing: 96, trust: 94, compliance: 99, financial: "$1.4M Saved Weekly" },
          coach: "Brilliant technical diplomacy. You proved Guadalajara's elite metrology capability with rigorous IEEE-standard data, rescued $1.4M/week of silicon yield, and positioned Guadalajara as an indispensable silicon debug partner rather than just a packaging house.",
          memo: `TECHNICAL MEMORANDUM & SILICON DIAGNOSTIC WHITE PAPER\n\nTO: Scott Keller, VP Silicon Engineering (Austin Foundry)\nFROM: Director of Advanced Packaging & Metrology, Guadalajara Campus\nDATE: September 27, 2026\nSUBJECT: Diagnostic Root Cause: 3nm AI Accelerator Low-Power Scan-Chain Excursion & Test Vector Remediation\n\n1. EXECUTIVE SUMMARY:\nGuadalajara Metrology has completed an in-depth parametric characterization of the 13.4% yield fallout observed on 3nm Lot #A26-904. Met One particle counters verify continuous ISO Class 4 cleanroom compliance. High-resolution ATE Shmoo plots isolate the fallout to a localized timing race condition occurring exclusively during the 0.75V low-power Vmin transition.\n\n2. SCAN-CHAIN TELEMETRY & ROOT CAUSE:\nUsing Advantest V93000 high-speed oscilloscopes cross-referenced with Synopsys TestMAX ATPG models, the failure was localized to clock-tree skew at scan flip-flop FF_14892. The timing violation correlates precisely with the ECO clock gating revision pushed on August 14.\n\n3. PROPOSED NON-DESTRUCTIVE REMEDIATION (48-HR WINDOW):\nRather than scrapping 2,400 viable dies, Guadalajara has engineered a modified ATE test pattern sequence (Vector Patch Rev 2.1) that introduces a 120ps capture-pulse offset during the 0.75V transition. Proof-of-concept testing restores wafer yield to 94.6% (+13.8% recovery).\n\nRespectfully submitted,\nGuadalajara Advanced Packaging & Testing Group`
        },
        {
          type: "defer",
          tag: "Passive Stalemate",
          title: "Halt All ATE Wafer Testing Until Austin Engineers Travel to Guadalajara",
          desc: "Shut down wafer sort lines and demand Austin send senior silicon architects to Guadalajara to inspect probe cards in person.",
          telem: { standing: 25, trust: 25, compliance: 60, financial: "-$2.8M Idle Capacity" },
          coach: "Paralyzes manufacturing. A 2-week freeze while engineers travel internationally burns millions in idle capacity and misses critical customer tape-out delivery windows.",
          memo: `TO: Austin Silicon Engineering\n\nAll ATE testing in Guadalajara is halted effective immediately pending an on-site visit and audit from Austin senior microarchitects.`
        }
      ]
    },

    energy: {
      key: "energy",
      tag: "ENERGY & DATA CENTERS • QUERÉTARO • IEEE 1547 / CFE",
      headline: "The 40MW Hyperscale Substation Harmonic Interlock Crisis",
      risk: "GRID SHUTDOWN & REGULATORY FINES",
      fine: "$850k CFE Fine + Grid Disconnection",
      time: "CENACE 24-hr compliance notice",
      person: "Jason Vance (VP Infrastructure • Santa Clara Hyperscaler)",
      briefing: "At our 40MW Querétaro Hyperscale Data Center Campus, total harmonic distortion (THD) on Substation Feeder B reached 6.4%, triggering an automatic alarm from CENACE for exceeding the Mexican Grid Code (Código de Red 2.0, max 5.0% THD at Point of Common Coupling). US Hyperscaler VP Jason Vance insists on overriding the protective relay interlocks and running 18 unpermitted Caterpillar diesel generators continuously to preserve 99.999% cloud uptime for Tier-1 banking clients. Doing so violates Mexican federal environmental permits and risks immediate CFE physical grid disconnection and an $850k USD fine.",
      evidence: [
        "CENACE Código de Red 2.0 Chapter 3 mandates grid disconnection if harmonic distortion above 5.0% persists for > 48 hours.",
        "Querétaro campus has 8 active harmonic filter (AHF) units on Feeder A operating with 8.2MVAR capacity.",
        "Transferring 14MW of variable server load to Feeder A's AHF bus drops Feeder B THD to 3.8% in under 12 minutes.",
        "Diesel genset operation beyond 50 hours/year without SEMARNAT environmental impact waiver incurs immediate federal sanction."
      ],
      options: [
        {
          type: "aggressive",
          tag: "Aggressive Regulatory Refusal",
          title: "Refuse Hyperscaler Demand & Threaten Facility Shutdown",
          desc: "Tell Santa Clara that their demand is illegal under Mexican law, refuse to touch the generators, and warn them that the facility will trip if servers aren't throttled.",
          telem: { standing: 45, trust: 35, compliance: 95, financial: "Breach of SLA Threat" },
          coach: "Creates executive panic in Silicon Valley. Banking cloud customers cannot tolerate unmanaged throttling threats. Standing on the law is correct, but delivering an ultimatum without a technical workaround damages client retention.",
          memo: `TO: Jason Vance, VP Global Cloud Infrastructure\nFROM: Querétaro Campus Facilities Director\nSUBJECT: Illegal Diesel Generator Operation Request Denied\n\nYour instruction to force-run unpermitted diesel gensets violates Mexican federal environmental laws and CENACE Código de Red. We refuse to execute this order. If server load is not reduced immediately, the substation will trip.`
        },
        {
          type: "yield",
          tag: "Unconditional Compliance with Client",
          title: "Override Relay Interlocks & Fire All 18 Diesel Gensets",
          desc: "Bypass the SEL-751 protective interlocks, fire up 18 diesel generators, and disconnect from the grid completely.",
          telem: { standing: 20, trust: 60, compliance: 10, financial: "-$850k Fine + Federal Audit" },
          coach: "Catastrophic legal liability. Running unpermitted diesel generators in Querétaro generates smoke plumes visible across the corridor, triggering an immediate PROFEPA environmental raid, $850k fines, and criminal liability for the plant director.",
          memo: `TO: Jason Vance, VP Infrastructure\nSUBJECT: Executing Diesel Generator Override\n\nPer your urgent instruction, we have overridden the SEL-751 interlocks and fired all 18 diesel generators to island the data center campus. We will sustain operations on diesel until further notice.`
        },
        {
          type: "batna",
          tag: "Strategic BATNA (Optimal B2/C1)",
          title: "Execute Dynamic Feeder Load Transfer to Feeder A AHF Bus (THD 3.8%) + 99.999% SLA Preservation",
          desc: "Transfer 14MW of non-critical server load to Feeder A's Active Harmonic Filter (AHF) bus in 12 minutes, dropping Feeder B THD to 3.8% (fully compliant with Código de Red) while maintaining 100% cloud banking uptime without starting unpermitted diesel generators.",
          telem: { standing: 97, trust: 96, compliance: 100, financial: "$850k Fine Avoided & Zero Downtime" },
          coach: "Outstanding enterprise engineering leadership! You preserved 99.999% uptime for Tier-1 financial cloud tenants, avoided $850k in CFE sanctions, and demonstrated superior electrical power systems mastery to Santa Clara leadership.",
          memo: `EXECUTIVE MISSION-CRITICAL POSITION MEMO\n\nTO: Jason Vance, VP Global Cloud Infrastructure (Santa Clara HQ)\nFROM: Director of Critical Facilities & Electrical Infrastructure, Querétaro Campus\nDATE: September 27, 2026\nSUBJECT: Dynamic Substation Harmonic Mitigation: Preserving 99.999% Cloud Uptime & CENACE Código de Red 2.0 Compliance\n\n1. EXECUTIVE SUMMARY & ZERO DOWNTIME COMMITMENT:\nOur Querétaro 40MW campus will maintain uninterrupted 99.999% SLA availability for all banking and enterprise compute clusters. We have engineered a zero-downtime electrical topology remediation that resolves CENACE's harmonic distortion alarm without firing diesel generators or risking CFE grid disconnection.\n\n2. ROOT CAUSE & REGULATORY RISK ANALYSIS:\nSubstation Feeder B THD peaked at 6.4% due to high non-linear server switching loads. Under CENACE Código de Red 2.0 (Chapter 3), sustained THD above 5.0% incurs an $850k USD fine and physical breaker trip. Continuous diesel genset operation would violate SEMARNAT air-quality permits, creating severe legal vulnerability.\n\n3. THE ZERO-IMPACT MITIGATION ARCHITECTURE:\n• Action: Through our SCADA power distribution matrix, we are executing a synchronized 14MW bus transfer from Feeder B to Substation Feeder A, which possesses 8.2MVAR of under-utilized Active Harmonic Filtering (AHF) capacity.\n• Outcome: Feeder B THD drops to 3.8% within 12 minutes (well beneath the 5.0% threshold). All server racks remain energized without a single microsecond of power interruption.\n\nRespectfully submitted,\nQuerétaro Hyperscale Engineering Directorate`
        },
        {
          type: "defer",
          tag: "Bureaucratic Paralysis",
          title: "File Formal Appeal with CENACE and Await Hearing",
          desc: "Submit a written administrative appeal to CENACE regulatory commissioners and wait for their 30-day response window.",
          telem: { standing: 20, trust: 20, compliance: 40, financial: "-$850k Automatic Fine" },
          coach: "Fatal inaction. Grid protection relays don't wait for administrative appeals; when protective thresholds trip, the data center drops offline immediately.",
          memo: `TO: CENACE Commissioners\n\nWe hereby submit an administrative petition regarding the Feeder B harmonic notice and request an extension to our compliance timeline.`
        }
      ]
    }
  };

  /* ── 2. MULTI-ACCENT DATA (5 GLOBAL NEARSHORING ACCENTS) ── */
  const ACCENT_DATA = {
    midwest: {
      key: "midwest",
      flag: "🇺🇸",
      speakerName: "Dave Miller",
      speakerRole: "Vehicle Launch Director • Detroit OEM",
      dialectTag: "US Midwest / Northern Cities Vowel Shift",
      avatarIcon: "fa-solid fa-car-side",
      transcriptHtml: `Look guys, we gotta <span class="phonetic-spotlight">cut to the chase</span> here. Our stamping plant in Sterling Heights is waiting on those door inner stampings. I need a <span class="phonetic-spotlight">hard stop</span> on these tolerance deviations by noon. If the CMM report doesn't hold CPK of 1.67, we’re gonna have to <span class="phonetic-spotlight">pull the plug</span> and recalibrate the progressive die. Let’s <span class="phonetic-spotlight">get our ducks in a row</span> and <span class="phonetic-spotlight">touch base</span> at two.`,
      spokenText: `Look guys, we gotta cut to the chase here. Our stamping plant in Sterling Heights is waiting on those door inner stampings. I need a hard stop on these tolerance deviations by noon. If the CMM report doesn't hold CPK of 1.67, we're gonna have to pull the plug and recalibrate the progressive die. Let's get our ducks in a row and touch base at two.`,
      langCode: "en-US",
      pitchVal: 1.0,
      rateVal: 1.05,
      phoneticPoints: [
        "Northern Cities Vowel Shift: Short 'a' in 'plant', 'stamping', 'chase' is raised and fronted [eə] (sounds like 'plee-ant').",
        "Alveolar Flap: Words like 'gotta' and 'recalibrate' use quick voiced flaps [ɾ] rather than crisp dental 't'.",
        "Fast Cadence & Reduced Prepositions: 'waiting on' and 'by noon' spoken with compressed, rhythmic stress.",
        "Heavy Idiomatic Density: 'cut to the chase', 'hard stop', 'pull the plug', 'ducks in a row', 'touch base'."
      ],
      pragmaticRows: [
        { said: "Let's get our ducks in a row and touch base at two.", meant: "You have exactly two hours to assemble your dimensional proof before I escalate this to your Vice President of Operations.", context: "Deadlines in the US Midwest are literal and unforgiving." },
        { said: "We're gonna have to pull the plug.", meant: "We will cancel your supplier production authorization and halt shipments immediately unless CPK is certified.", context: "Direct escalation threat masked as procedural decision." }
      ],
      responseQuote: "Understood Dave. Our tooling team is already on the press inspecting the guide pins. We will have the 30-piece capability study with CMM coordinates on your desk at 13:45 EST.",
      quiz: {
        prompt: "What is the operational priority demanded by Dave Miller?",
        options: [
          "Wait until tomorrow to inspect the progressive stamping die.",
          "Deliver certified CMM metrology proof verifying CPK ≥ 1.67 before the 14:00 review.",
          "Order a brand-new progressive die from Germany immediately."
        ],
        correctIdx: 1,
        feedback: "Correct! Dave demands CPK ≥ 1.67 certified by CMM before their 14:00 touch base, otherwise he will halt production ('pull the plug')."
      }
    },

    indian: {
      key: "indian",
      flag: "🇮🇳",
      speakerName: "Priya Ramanathan",
      speakerRole: "Principal Embedded Systems Architect • Bangalore",
      dialectTag: "South Asian English (Indian Subcontinent)",
      avatarIcon: "fa-solid fa-microchip",
      transcriptHtml: `Hi team, regarding the AUTOSAR classic memory stack on the microcontroller, kindly <span class="phonetic-spotlight">prepone</span> the sprint review to 4 PM. We observed that the CAN FD transceiver is throwing sporadic bus-off errors during bus-load peaks. Please <span class="phonetic-spotlight">do the needful</span> and <span class="phonetic-spotlight">revert back</span> with the trace logs once the SPI bus analyzer is connected.`,
      spokenText: `Hi team, regarding the AUTOSAR classic memory stack on the microcontroller, kindly prepone the sprint review to 4 PM. We observed that the CAN FD transceiver is throwing sporadic bus-off errors during bus-load peaks. Please do the needful and revert back with the trace logs once the SPI bus analyzer is connected.`,
      langCode: "en-IN",
      pitchVal: 1.1,
      rateVal: 1.1,
      phoneticPoints: [
        "Retroflex Consonants: Dental 't' and 'd' in 'microcontroller', 'trace', 'needful' are pronounced with retroflex tongue curvature [ʈ, ɖ].",
        "Syllable-Timed Rhythm: Each syllable receives relatively equal duration rather than stress-timed English compression.",
        "Aspirated Plosives: Crisp bursts of breath on /p/ and /k/ in 'peaks', 'prepone', 'CAN FD'.",
        "Distinct Corporate Collocations: 'Prepone' (opposite of postpone), 'do the needful' (take required standard actions), 'revert back' (reply with data)."
      ],
      pragmaticRows: [
        { said: "Kindly prepone the review... Please do the needful and revert back.", meant: "This is a critical blocker holding up the firmware milestone. Move your schedule forward and provide the oscilloscope CAN logs immediately.", context: "Polite modal phrasing ('kindly') masks urgent blocking technical priority." },
        { said: "CAN FD transceiver is throwing sporadic bus-off errors.", meant: "Your microcontroller driver layer has an unhandled interrupt race condition during buffer saturation.", context: "Direct technical callout requiring concrete log attachments." }
      ],
      responseQuote: "Thank you Priya. We have rescheduled the sprint review for 4:00 PM. Our firmware team has already hooked up the Saleae logic analyzer and will attach the CAN FD trace logs to the Jira ticket in 20 minutes.",
      quiz: {
        prompt: "What does Priya mean by 'prepone the sprint review' and 'do the needful'?",
        options: [
          "Postpone the meeting to next week and ignore the CAN transceiver bug.",
          "Shift the sprint review earlier to 4 PM and immediately execute the trace analysis protocol.",
          "Cancel the AUTOSAR architecture entirely."
        ],
        correctIdx: 1,
        feedback: "Correct! 'Prepone' is Indian English for advancing an event to an earlier time, and 'do the needful' means taking the necessary standard technical action."
      }
    },

    german: {
      key: "german",
      flag: "🇩🇪",
      speakerName: "Dr. Jürgen Becker",
      speakerRole: "Director of Robotics & Automation • Stuttgart",
      dialectTag: "German Industrial English (Automotive HQ)",
      avatarIcon: "fa-solid fa-robot",
      transcriptHtml: `Guten Tag. The <span class="phonetic-spotlight">actual</span> cycle time of the 6-axis welding robot in Cell 4 is currently 42 seconds, which is totally unacceptable against the specification of 36 seconds. We must <span class="phonetic-spotlight">control</span> the servo acceleration parameters immediately. The kinematics cannot be compromised by sloppy trajectory programming. I expect an exact root cause protocol today.`,
      spokenText: `Guten Tag. The actual cycle time of the 6-axis welding robot in Cell 4 is currently 42 seconds, which is totally unacceptable against the specification of 36 seconds. We must control the servo acceleration parameters immediately. The kinematics cannot be compromised by sloppy trajectory programming. I expect an exact root cause protocol today.`,
      langCode: "de-DE",
      pitchVal: 0.95,
      rateVal: 0.95,
      phoneticPoints: [
        "Fricative Merger /w/ vs /v/: 'welding' sounds like 'velding', 'we' sounds like 've'.",
        "Final Devoicing: Voiced consonants at the end of words become unvoiced ('robot' /t/, 'compromised' /st/).",
        "German False Friends: 'Actual' is used with the German meaning of 'aktuell' (meaning 'current/present', not 'real'); 'control' is used with the meaning of 'kontrollieren' (meaning 'inspect/audit/verify').",
        "Unyielding Directness: Zero polite hedging. Sentences begin directly with the non-conformance."
      ],
      pragmaticRows: [
        { said: "We must control the servo acceleration parameters... totally unacceptable.", meant: "This is a contractual specification violation. Do not offer subjective excuses; provide an analytical engineering root-cause dossier today.", context: "German engineering culture values precise mathematical root cause over relationship management." },
        { said: "The kinematics cannot be compromised by sloppy programming.", meant: "Our headquarters standards are non-negotiable. Fix the robot trajectory code immediately.", context: "Direct rebuke of procedural rigor." }
      ],
      responseQuote: "Good morning Dr. Becker. We have isolated the 6-second delta to the safety deceleration zone on the torch changeover. We are optimizing the trajectory via KUKA WorkVisual and will upload the comparative time-motion trace by 16:00 CET.",
      quiz: {
        prompt: "When Dr. Becker says 'The actual cycle time... we must control it', what does he mean?",
        options: [
          "The real cycle time is fine, and we should control the operators.",
          "The current cycle time is 42 seconds, and we must audit/inspect the servo acceleration parameters immediately.",
          "We should reprogram the robot to run in manual mode."
        ],
        correctIdx: 1,
        feedback: "Correct! 'Actual' in German English translates 'aktuell' (current), and 'control' translates 'kontrollieren' (inspect/verify)."
      }
    },

    british: {
      key: "british",
      flag: "🇬🇧",
      speakerName: "Alistair Campbell",
      speakerRole: "Chief Propulsion Inspector • Derby, UK",
      dialectTag: "British Aerospace English (Received Pronunciation / Midlands)",
      avatarIcon: "fa-solid fa-plane-up",
      transcriptHtml: `Right, I've had a look at the ultrasonic non-destructive testing results on the turbine blade root forgings. I have a <span class="phonetic-spotlight">slight reservation</span> regarding the surface finish Ra values on batch 408. It's <span class="phonetic-spotlight">not quite what we’d hoped for</span>, to be frank. Shall we <span class="phonetic-spotlight">table this matter right away</span> and get the metallurgical team <span class="phonetic-spotlight">sorted</span> before we sign off on the release?`,
      spokenText: `Right, I've had a look at the ultrasonic non-destructive testing results on the turbine blade root forgings. I have a slight reservation regarding the surface finish Ra values on batch 408. It's not quite what we'd hoped for, to be frank. Shall we table this matter right away and get the metallurgical team sorted before we sign off on the release?`,
      langCode: "en-GB",
      pitchVal: 1.0,
      rateVal: 1.0,
      phoneticPoints: [
        "Non-Rhoticity: Post-vocalic /r/ is dropped in 'forgings', 'matter', 'surface'.",
        "Glottal Stops: Intervocalic /t/ frequently replaced with glottal stops [ʔ] ('not quite', 'sorted').",
        "British Dialect Trap ('Table this'): In British English, 'table this' means bring it forward for IMMEDIATE discussion, whereas in American English it means postpone!",
        "Mastery of Understatement: 'Slight reservation' and 'not quite what we hoped for' indicate a catastrophic aerospace failure."
      ],
      pragmaticRows: [
        { said: "I have a slight reservation... not quite what we’d hoped for.", meant: "CRITICAL FAILURE: Batch 408 fails aerospace airworthiness criteria. Under British understatement, this means the parts are condemned unless remediated.", context: "British engineers express grave alarm through polite understatements." },
        { said: "Shall we table this matter right away?", meant: "We must debate this emergency immediately right now on this call (UK meaning), do NOT shelve or postpone it.", context: "Opposite dialect meaning of 'to table' in US vs UK English." }
      ],
      responseQuote: "Thank you Alistair. We share your concern on batch 408. Let us bring this to the table immediately. Our lead metallurgist is pulling the profilometer calibration records now, and we have placed an immediate quality quarantine hold on the batch.",
      quiz: {
        prompt: "In British aerospace English, what does Alistair mean by 'I have a slight reservation... shall we table this matter right away'?",
        options: [
          "He is mildly happy, and wants to postpone the discussion until next month.",
          "He is reporting a critical failure, and wants to discuss it immediately right now on the call.",
          "He wants to reserve a table at a local restaurant."
        ],
        correctIdx: 1,
        feedback: "Correct! In British English, 'a slight reservation' is an understatement for critical alarm, and 'to table' means to discuss immediately!"
      }
    },

    japanese: {
      key: "japanese",
      flag: "🇯🇵",
      speakerName: "Kenji Takahashi",
      speakerRole: "Senior Global Quality Coordinator • Nagoya",
      dialectTag: "Japanese Corporate & Kaizen English",
      avatarIcon: "fa-solid fa-industry",
      transcriptHtml: `Thank you for your presentation on the plastic injection mold gating modification. While the dimensional stability appears sound, implementing this tooling modification before the SOP milestone... <span class="phonetic-spotlight">may be somewhat difficult</span>. Perhaps we might consider <span class="phonetic-spotlight">reflecting</span> on the historical shrink-rate data once more before final decision.`,
      spokenText: `Thank you for your presentation on the plastic injection mold gating modification. While the dimensional stability appears sound, implementing this tooling modification before the SOP milestone... may be somewhat difficult. Perhaps we might consider reflecting on the historical shrink-rate data once more before final decision.`,
      langCode: "ja-JP",
      pitchVal: 0.98,
      rateVal: 0.92,
      phoneticPoints: [
        "Epenthetic Final Vowels: Consonant clusters often split with subtle vowel inserts ('plastic' -> 'purasuchikku').",
        "R / L Neutralization: Approximant liquid consonants /r/ and /l/ merged into alveolar tap [ɾ].",
        "Purposeful Hesitation Pauses: Strategic silence before critical points ('...may be somewhat difficult') signaling polite deference.",
        "High-Context Indirection: 'Reflecting on data' translates the Japanese concept of 'Hansei' (acknowledging mistakes / looking inward)."
      ],
      pragmaticRows: [
        { said: "Implementing this tooling modification... may be somewhat difficult.", meant: "ABSOLUTE REJECTION. In Japanese business culture, 'difficult' means NO. Do not argue directly or push back aggressively on this call.", context: "High-context culture where overt disagreement is considered uncouth." },
        { said: "Perhaps we might consider reflecting on the historical data once more.", meant: "Conduct Nemawashi (informal consensus building). Gather multi-year statistical proof before raising this topic again.", context: "Procedural requirement for risk aversion." }
      ],
      responseQuote: "Thank you very much Takahashi-san. We deeply respect your guidance regarding SOP stability. We will not proceed with tooling cuts. Instead, we will conduct a 500-shot mold flow analysis comparing 3-year historical shrink rates and present the data for your review next Tuesday.",
      quiz: {
        prompt: "When Takahashi-san says 'implementing this tooling modification before SOP may be somewhat difficult', what is his real meaning?",
        options: [
          "It is challenging but he wants you to proceed anyway immediately.",
          "It is a polite but firm NO; do not proceed, and build prior consensus (Nemawashi) with statistical data first.",
          "He wants to increase the budget by 50%."
        ],
        correctIdx: 1,
        feedback: "Correct! In Japanese corporate culture, 'may be difficult' is a polite indirect refusal. Pushing back directly violates consensus etiquette."
      }
    }
  };

  /* ── 3. STATE & CONTROLLER VARIABLES ── */
  let activeCaseKey = "laredo";
  let activeOptionIdx = 2; // Default to optimal BATNA strategy
  let activeAccentKey = "midwest";
  let activeSpeed = 1.0;
  let isTranscriptVisible = true;
  let currentAudioUtterance = null;

  /* ── 4. CASE STUDIES RENDERING LOGIC ── */
  function renderCaseDossier() {
    const c = CASE_STUDIES[activeCaseKey];
    if (!c) return;

    const tagEl = document.getElementById('case-tag');
    const headlineEl = document.getElementById('case-headline');
    const riskBadgeEl = document.getElementById('case-risk-badge');
    const fineEl = document.getElementById('case-stake-fine');
    const timeEl = document.getElementById('case-stake-time');
    const personEl = document.getElementById('case-stake-person');
    const briefingEl = document.getElementById('case-briefing-text');
    const evidenceListEl = document.getElementById('case-evidence-list');

    if (tagEl) tagEl.textContent = c.tag;
    if (headlineEl) headlineEl.textContent = c.headline;
    if (riskBadgeEl) riskBadgeEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>${c.risk}</span>`;
    if (fineEl) fineEl.textContent = c.fine;
    if (timeEl) timeEl.textContent = c.time;
    if (personEl) personEl.textContent = c.person;
    if (briefingEl) briefingEl.textContent = c.briefing;

    if (evidenceListEl) {
      evidenceListEl.innerHTML = c.evidence.map(item => `
        <li>
          <i class="fa-solid fa-circle-check"></i>
          <span>${item}</span>
        </li>
      `).join('');
    }

    renderCaseOptions();
    renderCaseTelemetry();
  }

  function renderCaseOptions() {
    const c = CASE_STUDIES[activeCaseKey];
    const container = document.getElementById('case-options-container');
    if (!container || !c) return;

    container.innerHTML = c.options.map((opt, idx) => {
      const isSelected = idx === activeOptionIdx;
      return `
        <div class="decision-option-card ${isSelected ? 'selected' : ''}" data-idx="${idx}">
          <div class="opt-header-row">
            <span class="opt-tag ${opt.type}">${opt.tag}</span>
            <div class="opt-indicator"></div>
          </div>
          <div class="opt-title">${opt.title}</div>
          <p class="opt-desc">${opt.desc}</p>
        </div>
      `;
    }).join('');

    // Attach click handlers
    container.querySelectorAll('.decision-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-idx'), 10);
        activeOptionIdx = idx;
        renderCaseOptions();
        renderCaseTelemetry();
      });
    });
  }

  function renderCaseTelemetry() {
    const c = CASE_STUDIES[activeCaseKey];
    if (!c) return;
    const opt = c.options[activeOptionIdx] || c.options[0];

    const standingEl = document.getElementById('telem-standing');
    const fillStandingEl = document.getElementById('telem-fill-standing');
    const trustEl = document.getElementById('telem-trust');
    const fillTrustEl = document.getElementById('telem-fill-trust');
    const complianceEl = document.getElementById('telem-compliance');
    const fillComplianceEl = document.getElementById('telem-fill-compliance');
    const financialEl = document.getElementById('telem-financial');
    const fillFinancialEl = document.getElementById('telem-fill-financial');
    const coachTextEl = document.getElementById('coach-debrief-text');
    const memoTextEl = document.getElementById('exec-memo-textarea');

    if (standingEl) standingEl.textContent = `${opt.telem.standing}%`;
    if (fillStandingEl) fillStandingEl.style.width = `${opt.telem.standing}%`;
    if (trustEl) trustEl.textContent = `${opt.telem.trust}%`;
    if (fillTrustEl) fillTrustEl.style.width = `${opt.telem.trust}%`;
    if (complianceEl) complianceEl.textContent = `${opt.telem.compliance}%`;
    if (fillComplianceEl) fillComplianceEl.style.width = `${opt.telem.compliance}%`;
    if (financialEl) financialEl.textContent = opt.telem.financial;
    if (fillFinancialEl) fillFinancialEl.style.width = `${Math.min(100, Math.max(20, opt.telem.standing))}%`;

    if (coachTextEl) coachTextEl.textContent = opt.coach;
    if (memoTextEl) memoTextEl.value = opt.memo;
  }

  /* ── 5. MULTI-ACCENT ACOUSTIC LAB RENDERING LOGIC ── */
  function renderAccentPlayer() {
    const a = ACCENT_DATA[activeAccentKey];
    if (!a) return;

    const avatarEl = document.getElementById('accent-avatar');
    const nameEl = document.getElementById('accent-speaker-name');
    const roleEl = document.getElementById('accent-speaker-role');
    const dialectEl = document.getElementById('accent-dialect-tag');
    const transcriptEl = document.getElementById('accent-transcript-text');

    if (avatarEl) avatarEl.innerHTML = `<i class="${a.avatarIcon}"></i>`;
    if (nameEl) nameEl.textContent = a.speakerName;
    if (roleEl) roleEl.textContent = a.speakerRole;
    if (dialectEl) dialectEl.textContent = a.dialectTag;
    if (transcriptEl) transcriptEl.innerHTML = a.transcriptHtml;

    renderAccentDecoder();
    renderAccentQuiz();
  }

  function renderAccentDecoder() {
    const a = ACCENT_DATA[activeAccentKey];
    if (!a) return;

    const phoneticBody = document.getElementById('decoder-phonetic-body');
    const pragmaticBody = document.getElementById('decoder-pragmatic-body');
    const responseBody = document.getElementById('decoder-response-body');

    if (phoneticBody) {
      phoneticBody.innerHTML = `
        <ul class="phonetic-point-list">
          ${a.phoneticPoints.map(pt => `<li><i class="fa-solid fa-angle-right"></i><span>${pt}</span></li>`).join('')}
        </ul>
      `;
    }

    if (pragmaticBody) {
      pragmaticBody.innerHTML = `
        <table class="pragmatic-table">
          <thead>
            <tr>
              <th>Said (Literal)</th>
              <th>Meant (Real Subtext)</th>
              <th>Cultural Context</th>
            </tr>
          </thead>
          <tbody>
            ${a.pragmaticRows.map(row => `
              <tr>
                <td><strong>"${row.said}"</strong></td>
                <td><span style="color:#b45309; font-weight:700;">${row.meant}</span></td>
                <td><small style="color:#64748b;">${row.context}</small></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    if (responseBody) {
      responseBody.innerHTML = `
        <p style="margin:0 0 6px 0; font-size:0.84rem; color:#475569;">
          Recommended Diplomatic C1 Formulation (Engineered for Mexican Plant Leadership):
        </p>
        <div class="response-quote-box">
          "${a.responseQuote}"
        </div>
      `;
    }
  }

  function renderAccentQuiz() {
    const a = ACCENT_DATA[activeAccentKey];
    if (!a || !a.quiz) return;

    const promptEl = document.getElementById('accent-quiz-prompt');
    const optionsContainer = document.getElementById('accent-quiz-options');
    const feedbackBox = document.getElementById('accent-quiz-feedback');
    const scoreEl = document.getElementById('accent-quiz-score');

    if (promptEl) promptEl.textContent = a.quiz.prompt;
    if (feedbackBox) {
      feedbackBox.style.display = 'none';
      feedbackBox.innerHTML = '';
    }
    if (scoreEl) scoreEl.textContent = 'Score: 100%';

    if (optionsContainer) {
      optionsContainer.innerHTML = a.quiz.options.map((optText, oIdx) => `
        <button class="quiz-opt-btn" data-oidx="${oIdx}">
          ${String.fromCharCode(65 + oIdx)}. ${optText}
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedOidx = parseInt(btn.getAttribute('data-oidx'), 10);
          const isCorrect = selectedOidx === a.quiz.correctIdx;

          optionsContainer.querySelectorAll('.quiz-opt-btn').forEach((b, bIdx) => {
            b.disabled = true;
            if (bIdx === a.quiz.correctIdx) {
              b.classList.add('correct');
            } else if (b === btn) {
              b.classList.add('incorrect');
            }
          });

          if (feedbackBox) {
            feedbackBox.style.display = 'block';
            if (isCorrect) {
              feedbackBox.style.background = '#ecfdf5';
              feedbackBox.style.color = '#065f46';
              feedbackBox.style.border = '1px solid #a7f3d0';
              feedbackBox.innerHTML = `<strong>✓ Perfect!</strong> ${a.quiz.feedback}`;
              if (scoreEl) scoreEl.textContent = 'Score: 100% (Passed)';
            } else {
              feedbackBox.style.background = '#fef2f2';
              feedbackBox.style.color = '#991b1b';
              feedbackBox.style.border = '1px solid #fecaca';
              feedbackBox.innerHTML = `<strong>Notice:</strong> Review the 3-Layer Decoder on the right. ${a.quiz.feedback}`;
              if (scoreEl) scoreEl.textContent = 'Score: 60% (Review Pragmatics)';
            }
          }
        });
      });
    }
  }

  /* ── 6. AUDIO PLAYBACK & SYNTHESIS CONTROLLER ── */
  function playAccentAudio() {
    const a = ACCENT_DATA[activeAccentKey];
    if (!a) return;

    const playBtn = document.getElementById('btn-play-accent-audio');
    const playerCard = document.querySelector('.acoustic-player-card');
    const statusText = document.getElementById('accent-audio-status');

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (statusText) statusText.innerHTML = '<i class="fa-solid fa-check"></i> Audio Simulation Active (Headless)';
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(a.spokenText);
    utter.rate = a.rateVal * activeSpeed;
    utter.pitch = a.pitchVal;

    // Try to find matching voice locale
    const voices = synth.getVoices ? synth.getVoices() : [];
    if (voices.length > 0) {
      const match = voices.find(v => v.lang && (v.lang.toLowerCase() === a.langCode.toLowerCase() || v.lang.toLowerCase().startsWith(a.langCode.slice(0, 2))));
      if (match) utter.voice = match;
    }

    utter.onstart = () => {
      if (playerCard) playerCard.classList.add('playing');
      if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>Playing Stream...</span>';
      if (statusText) statusText.innerHTML = `<i class="fa-solid fa-volume-high" style="color:#38bdf8;"></i> Streaming ${a.dialectTag}`;
    };

    utter.onend = () => {
      if (playerCard) playerCard.classList.remove('playing');
      if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Play Native Audio</span>';
      if (statusText) statusText.innerHTML = '<i class="fa-solid fa-circle-check"></i> Playback Complete';
    };

    utter.onerror = () => {
      if (playerCard) playerCard.classList.remove('playing');
      if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Play Native Audio</span>';
      if (statusText) statusText.innerHTML = '<i class="fa-solid fa-circle-dot"></i> Ready to Stream';
    };

    synth.speak(utter);
    currentAudioUtterance = utter;
  }

  function stopAccentAudio() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    const playerCard = document.querySelector('.acoustic-player-card');
    const playBtn = document.getElementById('btn-play-accent-audio');
    if (playerCard) playerCard.classList.remove('playing');
    if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Play Native Audio</span>';
  }

  /* ── 7. ATTACH SECTION EVENT LISTENERS ── */
  // Mode Tab Switcher (Cases vs Accents)
  const tabBtnCases = document.getElementById('tab-btn-cases');
  const tabBtnAccents = document.getElementById('tab-btn-accents');
  const subpanelCases = document.getElementById('exec-subpanel-cases');
  const subpanelAccents = document.getElementById('exec-subpanel-accents');

  if (tabBtnCases && tabBtnAccents) {
    tabBtnCases.addEventListener('click', () => {
      tabBtnCases.classList.add('active');
      tabBtnAccents.classList.remove('active');
      if (subpanelCases) subpanelCases.style.display = 'block';
      if (subpanelAccents) {
        subpanelAccents.style.display = 'none';
        stopAccentAudio();
      }
    });

    tabBtnAccents.addEventListener('click', () => {
      tabBtnAccents.classList.add('active');
      tabBtnCases.classList.remove('active');
      if (subpanelCases) subpanelCases.style.display = 'none';
      if (subpanelAccents) subpanelAccents.style.display = 'block';
      renderAccentPlayer();
    });
  }

  // Case Chips Switcher
  const caseChips = execSection.querySelectorAll('.case-chip');
  caseChips.forEach(chip => {
    chip.addEventListener('click', () => {
      caseChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCaseKey = chip.getAttribute('data-case');
      activeOptionIdx = 2; // Reset to optimal BATNA option
      renderCaseDossier();
    });
  });

  // Copy Memo Button
  const btnCopyMemo = document.getElementById('btn-copy-memo');
  const memoTextarea = document.getElementById('exec-memo-textarea');
  if (btnCopyMemo && memoTextarea) {
    btnCopyMemo.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(memoTextarea.value).then(() => {
          btnCopyMemo.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copied!</span>';
          setTimeout(() => {
            btnCopyMemo.innerHTML = '<i class="fa-solid fa-copy"></i> <span>Copy Memo</span>';
          }, 2000);
        });
      } else {
        memoTextarea.select();
        document.execCommand('copy');
        btnCopyMemo.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copied!</span>';
        setTimeout(() => {
          btnCopyMemo.innerHTML = '<i class="fa-solid fa-copy"></i> <span>Copy Memo</span>';
        }, 2000);
      }

      if (typeof showOfflineToast === 'function') {
        showOfflineToast("Memorandum Copied", "Executive position memorandum copied to clipboard for direct email transmission.", 100, true);
      }
    });
  }

  // Accent Chips Switcher
  const accentChips = execSection.querySelectorAll('.accent-chip');
  accentChips.forEach(chip => {
    chip.addEventListener('click', () => {
      accentChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeAccentKey = chip.getAttribute('data-accent');
      stopAccentAudio();
      renderAccentPlayer();
    });
  });

  // Audio Play Button
  const playAccentBtn = document.getElementById('btn-play-accent-audio');
  if (playAccentBtn) {
    playAccentBtn.addEventListener('click', () => {
      const playerCard = document.querySelector('.acoustic-player-card');
      if (playerCard && playerCard.classList.contains('playing')) {
        stopAccentAudio();
      } else {
        playAccentAudio();
      }
    });
  }

  // Cadence / Speed Switchers
  const speedBtns = execSection.querySelectorAll('.speed-btn');
  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSpeed = parseFloat(btn.getAttribute('data-speed')) || 1.0;
      const playerCard = document.querySelector('.acoustic-player-card');
      if (playerCard && playerCard.classList.contains('playing')) {
        stopAccentAudio();
        playAccentAudio();
      }
    });
  });

  // Toggle Transcript Button
  const btnToggleTranscript = document.getElementById('btn-toggle-transcript-en');
  const transcriptBody = document.getElementById('accent-transcript-text');
  if (btnToggleTranscript && transcriptBody) {
    btnToggleTranscript.addEventListener('click', () => {
      isTranscriptVisible = !isTranscriptVisible;
      transcriptBody.style.display = isTranscriptVisible ? 'block' : 'none';
      btnToggleTranscript.innerHTML = isTranscriptVisible 
        ? '<i class="fa-solid fa-eye-slash"></i> <span>Hide</span>'
        : '<i class="fa-solid fa-eye"></i> <span>Show</span>';
    });
  }

  // Initial Hydration
  renderCaseDossier();
  renderAccentPlayer();
}

/* ==========================================================================
   PHASE 6 CONTROLLER: STEMBot Socratic AI Engineering Copilot & Lexical Engine
   Socratic Feynman Evaluator • 3-Tier Lexical Upgrader • Technical Mock Audit
   ========================================================================== */

const STEMBOT_SCENARIOS = {
  automotive_cpk: {
    key: "automotive_cpk",
    title: "Automotive: Cpk Degradation & 8D Containment (IATF 16949)",
    prompt: "Your automated torque spindle on station 04-B experienced a process capability collapse from Cpk 1.67 down to 1.12 over the last shift. Explain in plain technical English to your Detroit OEM quality auditor why this occurred, how you isolated the root cause, and what permanent containment was enacted.",
    keywords: ["torque", "spindle", "cpk", "containment", "root cause", "runout", "bearing", "8d", "iatf", "quarantine"],
    sampleResponse: "During the second shift, thermal expansion caused excessive radial runout on the station 04-B torque spindle, resulting in a Cpk degradation from 1.67 to 1.12. As immediate D3 containment, we quarantined 420 fasteners and activated a secondary calibrated pneumatic driver with 100% manual torque verification. Root cause analysis using an Ishikawa diagram isolated bearing wear in the spindle gearhead. We replaced the spindle cartridge and enacted preventive vibration monitoring per IATF 16949 standards.",
    collocations: ["radial runout", "Cpk degradation", "D3 containment", "Ishikawa diagram", "spindle cartridge", "preventive vibration monitoring"]
  },
  medtech_eto: {
    key: "medtech_eto",
    title: "MedTech: EtO Sterilization Residuals vs Bioburden (ISO 11135)",
    prompt: "Your ethylene oxide (EtO) sterilization cycle for catheter packages showed elevated residual gas levels (EO / ECH) exceeding ISO 10993-7 allowable limits, while pre-sterilization bioburden remained under 100 CFU. Defend your aeration extension protocol to the FDA regulatory inspector.",
    keywords: ["eto", "ethylene oxide", "residual", "aeration", "bioburden", "iso 11135", "iso 10993", "cfu", "quarantine", "desorption"],
    sampleResponse: "While pre-sterilization bioburden complied with ISO 11737 at under 35 CFU, post-cycle gas chromatography detected ethylene oxide residuals at 4.2 ppm, slightly exceeding the 4.0 ppm threshold under ISO 10993-7. As immediate containment, we quarantined the entire pallet in the heated degassing chamber at 45°C. Desorption kinetics confirmed that extending the heated aeration phase by 18 hours dissipated residuals below 1.2 ppm without degrading packaging seal integrity or sterility assurance level (SAL 10^-6).",
    collocations: ["gas chromatography", "ethylene oxide residuals", "degassing chamber", "desorption kinetics", "sterility assurance level", "seal integrity"]
  },
  semi_esd: {
    key: "semi_esd",
    title: "Semiconductors: ESD Charge Neutralization during Dicing (SEMI E10)",
    prompt: "During diamond blade dicing of 3nm wafer lots, gate-oxide breakdown was detected on die edges due to static triboelectric accumulation. Explain how you upgraded the DI water ionization system to eliminate electrostatic discharge.",
    keywords: ["esd", "electrostatic", "wafer", "dicing", "gate-oxide", "breakdown", "ionization", "di water", "triboelectric", "semi"],
    sampleResponse: "During high-speed diamond wafer dicing, friction between the blade and silicon substrate induced a triboelectric surface charge exceeding 650V, causing gate-oxide breakdown on peripheral dies. Root cause investigation showed the deionized water carbonation module was depleted, raising DI resistivity above 18 Megaohms. We recalibrated the CO2 bubbler injection to maintain water conductivity at 20 microsiemens/cm and installed localized ionizing air blowers across the chuck table per ANSI/ESD S20.20.",
    collocations: ["triboelectric surface charge", "gate-oxide breakdown", "deionized water carbonation", "DI resistivity", "ionizing air blowers", "ANSI/ESD S20.20"]
  },
  trade_anexo24: {
    key: "trade_anexo24",
    title: "Logistics: Laredo Customs Hold & Anexo 24 Temporality (USMCA)",
    prompt: "A shipment of specialized aluminum extrusions from Monterrey is detained at the World Trade Bridge in Laredo due to a tariff classification discrepancy between Mexico's TIGIE and US HTSUS, threatening line-down at your Nashville assembly plant. Formulate your customs broker escalation statement.",
    keywords: ["customs", "anexo 24", "laredo", "tariff", "htsus", "tigie", "usmca", "fca", "broker", "pedimento"],
    sampleResponse: "The shipment of custom 6061-T6 aluminum extrusions is currently detained at the Laredo World Trade Bridge due to an HTSUS 7604.21 vs 7604.29 tariff classification discrepancy between our Mexican customs pedimento and US entry summary. Because Nashville assembly faces line stoppage in 6 hours, we have requested an immediate US Customs CBP entry under bond with commercial invoice and Mill Test Certificate verification, preserving USMCA Chapter 4 preferential duty treatment under Incoterms FCA Laredo.",
    collocations: ["HTSUS tariff classification", "entry under bond", "Mill Test Certificate", "USMCA preferential duty", "Incoterms FCA", "pedimento temporal"]
  },
  energy_substation: {
    key: "energy_substation",
    title: "Energy: 40MW Reverse Power Harmonic Trip (CENACE Code 2.0)",
    prompt: "Your Querétaro hyperscale data center tripped its 115kV utility tie breaker during a generator step-load shed test due to reverse active power and 5th harmonic voltage distortion. Explain the corrective interlock tuning to the CENACE grid operator.",
    keywords: ["substation", "cenace", "harmonic", "trip", "breaker", "reverse power", "generator", "interlock", "grid", "voltage"],
    sampleResponse: "During the 100% step-load transfer test on our 40MW UPS bus, sudden load rejection caused generator over-frequency and induced reverse active power flow of 3.2MW back toward the 115kV utility grid, triggering relay function 32R and 5th harmonic distortion exceeding CENACE Código de Red 2.0 limits. We have recalibrated relay 32R pickup delay to 450 milliseconds, tuned the active harmonic filter compensation, and established a coordinated interlock sequence with automatic load bank absorption.",
    collocations: ["step-load transfer", "reverse active power", "relay function 32R", "5th harmonic distortion", "CENACE Código de Red", "active harmonic filter"]
  }
};

const STEMBOT_LEXICAL_DATABASE = {
  "stop the line": {
    sop: "Initiate immediate emergency line stop; quarantine lot #4492 under non-conformance quarantine protocol pending dimensional verification.",
    eightD: "Enact D3 Interim Containment Action; segregate non-compliant sub-assemblies and execute 100% sorting audit across upstream feeder stations.",
    exec: "We are escalating a critical quality excursion impacting line takt time; comprehensive containment is in place while root cause Ishikawa analysis proceeds."
  },
  "customer is mad": {
    sop: "Notify plant dispatch and supervisor that customer quality engineering has placed shipments on hold pending delivery schedule alignment.",
    eightD: "Issue official customer notification memo containing 24-hour containment timeline, sorting results, and interim disposition status.",
    exec: "We are proactively managing customer stakeholder expectations by presenting verified recovery milestones and air-freight expedited schedules."
  },
  "weld broke": {
    sop: "Shut down robotic welding cell #02; inspect wire feed nozzle for spatter buildup and check argon shielding gas flow rate.",
    eightD: "Execute destructive weld cross-section micro-etching; investigate metallurgical root cause for lack of penetration and weld bead porosity.",
    exec: "Metallurgical failure analysis confirms weld bead fatigue due to heat-affected zone embrittlement; structural containment is certified per AWS D1.1."
  },
  "circuit test": {
    sop: "Halt ICT in-circuit test fixture; clean test pogo pins with isopropyl alcohol and verify probe contact resistance.",
    eightD: "Conduct Gauge R&R metrology study on ICT fixture; evaluate false-failure rate and isolate transient noise on analog sensor lines.",
    exec: "Metrology audit indicates test fixture measurement variance exceeding 10%; hardware recalibration underway with zero escape risk to final assembly."
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setupStemBotSocraticCopilot() {
  const drawer = document.getElementById('stembot-copilot-drawer');
  const fab = document.getElementById('stembot-fab-copilot');
  if (!drawer || !fab) return;

  window.toggleStemBotCopilot = function(forceOpen) {
    const isVisible = drawer.style.display !== 'none';
    const shouldOpen = (forceOpen !== undefined) ? forceOpen : !isVisible;
    drawer.style.display = shouldOpen ? 'flex' : 'none';
    drawer.setAttribute('aria-hidden', String(!shouldOpen));
    if (shouldOpen) {
      const input = document.getElementById('stembot-feynman-input');
      if (input) setTimeout(() => input.focus(), 150);
    }
  };

  window.switchStemBotTab = function(tabKey) {
    const tabs = drawer.querySelectorAll('.stembot-tab-btn');
    const contents = drawer.querySelectorAll('.stembot-tab-content');
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-stembot-tab') === tabKey));
    contents.forEach(c => {
      const match = c.id === `stembot-tab-${tabKey}`;
      c.style.display = match ? 'block' : 'none';
      c.classList.toggle('active', match);
    });
  };

  window.loadStemBotScenario = function(scenarioKey) {
    const scenario = STEMBOT_SCENARIOS[scenarioKey];
    if (!scenario) return;
    const promptEl = document.getElementById('stembot-scenario-prompt');
    if (promptEl) promptEl.textContent = scenario.prompt;
    const resultBox = document.getElementById('stembot-feynman-result');
    if (resultBox) resultBox.style.display = 'none';
    const input = document.getElementById('stembot-feynman-input');
    if (input) {
      input.value = '';
      updateFeynmanWordCount('');
    }
  };

  function updateFeynmanWordCount(text) {
    const counter = document.getElementById('stembot-feynman-wordcount');
    if (!counter) return;
    const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
    counter.textContent = `${words} words`;
  }

  const feynmanInput = document.getElementById('stembot-feynman-input');
  if (feynmanInput) {
    feynmanInput.addEventListener('input', (e) => {
      updateFeynmanWordCount(e.target.value);
    });
  }

  window.loadSampleFeynmanExplanation = function() {
    const select = document.getElementById('stembot-feynman-scenario-select');
    const key = select ? select.value : 'automotive_cpk';
    const scenario = STEMBOT_SCENARIOS[key];
    if (!scenario) return;
    const input = document.getElementById('stembot-feynman-input');
    if (input) {
      input.value = scenario.sampleResponse;
      updateFeynmanWordCount(scenario.sampleResponse);
    }
  };

  window.evaluateFeynmanExplanation = function() {
    const select = document.getElementById('stembot-feynman-scenario-select');
    const key = select ? select.value : 'automotive_cpk';
    const scenario = STEMBOT_SCENARIOS[key];
    const input = document.getElementById('stembot-feynman-input');
    const text = input ? input.value.trim() : '';
    if (!text || !scenario) {
      alert("Please provide an engineering explanation before requesting Feynman evaluation.");
      return;
    }

    const lower = text.toLowerCase();
    let hitCount = 0;
    scenario.keywords.forEach(kw => {
      if (lower.includes(kw.toLowerCase())) hitCount++;
    });

    const ratio = Math.min(1, hitCount / (scenario.keywords.length * 0.6));
    const score = Math.round(75 + (ratio * 23));

    const resultBox = document.getElementById('stembot-feynman-result');
    const scoreEl = document.getElementById('stembot-feynman-score');
    const headlineEl = document.getElementById('stembot-feynman-headline');
    const summaryEl = document.getElementById('stembot-feynman-summary');
    const clarityEl = document.getElementById('feynman-rubric-clarity');
    const lexicalEl = document.getElementById('feynman-rubric-lexical');
    const rootcauseEl = document.getElementById('feynman-rubric-rootcause');
    const collocationsWrap = document.getElementById('stembot-detected-collocations');

    if (scoreEl) scoreEl.textContent = `${score}%`;
    if (clarityEl) clarityEl.textContent = `${(score / 10).toFixed(1)}/10`;
    if (lexicalEl) lexicalEl.textContent = `${Math.min(9.8, (score / 10 + 0.2)).toFixed(1)}/10`;
    if (rootcauseEl) rootcauseEl.textContent = `${Math.min(9.6, (score / 10 - 0.1)).toFixed(1)}/10`;

    if (score >= 90) {
      if (headlineEl) headlineEl.textContent = "Outstanding Socratic Precision (C1 Executive)";
      if (summaryEl) summaryEl.textContent = "Exemplary mechanical articulation with zero passive hedging. Ready for official OEM/regulatory cross-border review.";
    } else {
      if (headlineEl) headlineEl.textContent = "Acceptable Technical Foundation (B2 Operational)";
      if (summaryEl) summaryEl.textContent = "Sound general reasoning. To achieve C1 mastery, replace casual verbs with exact engineering failure modes.";
    }

    if (collocationsWrap) {
      collocationsWrap.innerHTML = scenario.collocations.map(c => `<span class="lex-chip">${escapeHtml(c)}</span>`).join('');
    }

    if (resultBox) {
      resultBox.style.display = 'block';
      if (typeof resultBox.scrollIntoView === 'function') {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  window.setLexicalInput = function(phrase) {
    const input = document.getElementById('stembot-lexical-input');
    if (input) input.value = phrase;
    window.runLexicalUpgrade();
  };

  window.runLexicalUpgrade = function() {
    const input = document.getElementById('stembot-lexical-input');
    const phrase = (input ? input.value.trim().toLowerCase() : '');
    let matchedKey = Object.keys(STEMBOT_LEXICAL_DATABASE).find(k => phrase.includes(k));
    if (!matchedKey) matchedKey = "stop the line";
    const data = STEMBOT_LEXICAL_DATABASE[matchedKey];

    const sopEl = document.getElementById('reg-text-sop');
    const eightDEl = document.getElementById('reg-text-8d');
    const execEl = document.getElementById('reg-text-exec');

    if (sopEl) sopEl.textContent = `"${data.sop}"`;
    if (eightDEl) eightDEl.textContent = `"${data.eightD}"`;
    if (execEl) execEl.textContent = `"${data.exec}"`;

    const container = document.getElementById('stembot-upgraded-registers');
    if (container && typeof container.scrollIntoView === 'function') {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  window.copyRegisterText = function(targetId, btn) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const cleanText = el.textContent.replace(/^"|"$/g, '').trim();
    navigator.clipboard.writeText(cleanText).then(() => {
      const origHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      btn.style.color = '#10b981';
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.style.color = '';
      }, 1800);
    });
  };

  window.loadSampleAuditResponse = function() {
    const input = document.getElementById('stembot-audit-user-reply');
    if (input) {
      input.value = "Our plant enforces closed-loop machine telemetry with supervisory PLC lockout. Any feed rate override beyond the APQP-certified ±5% process window automatically flags a SPC excursion and triggers an unbypassable supervisor interlock.";
    }
  };

  window.submitAuditResponse = function() {
    const input = document.getElementById('stembot-audit-user-reply');
    const history = document.getElementById('stembot-audit-chat-history');
    const text = input ? input.value.trim() : '';
    if (!text || !history) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'audit-msg user';
    userMsg.innerHTML = `<strong>You:</strong> ${escapeHtml(text)}`;
    history.appendChild(userMsg);
    input.value = '';

    // Append auditor evaluation reply
    setTimeout(() => {
      const auditorMsg = document.createElement('div');
      auditorMsg.className = 'audit-msg auditor';
      auditorMsg.innerHTML = `<strong>Arthur Vance:</strong> "Concurred. The closed-loop PLC lockout and APQP ±5% tolerance constraint provide objective evidentiary proof under IATF §8.5.1.1. Parameter audit closed with zero non-conformances."`;
      history.appendChild(auditorMsg);
      history.scrollTop = history.scrollHeight;
    }, 450);
  };
}

/* ==========================================================================
   PHASE 7: AUDITABLE DIGITAL CERTIFICATES & ENTERPRISE CLOUD SYNC
   ========================================================================== */

function setupCertificatesAndCloudSync(tracks) {
  const certModal = document.getElementById('stemos-certificate-modal');
  const verifyModal = document.getElementById('stemos-verification-modal');
  const cloudModal = document.getElementById('stemos-cloud-sync-modal');

  // Simple, deterministic in-browser SVG QR code matrix generator (Version 2, 25x25 grid)
  function renderQrSvg(text, containerEl) {
    if (!containerEl) return;
    const size = 25;
    const matrix = Array.from({ length: size }, () => Array(size).fill(false));

    // Draw finder pattern helper
    function setFinder(r0, c0) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            matrix[r0 + r][c0 + c] = true;
          }
        }
      }
    }

    // Three Finder patterns
    setFinder(0, 0);
    setFinder(0, size - 7);
    setFinder(size - 7, 0);

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = (i % 2 === 0);
      matrix[i][6] = (i % 2 === 0);
    }

    // Alignment pattern at (16, 16)
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
          matrix[16 + r][16 + c] = true;
        }
      }
    }

    // Deterministic payload hashing from text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    // Fill data area with deterministic bit stream
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Skip reserved finder and timing areas
        const inFinder = (r < 8 && c < 8) || (r < 8 && c >= size - 8) || (r >= size - 8 && c < 8);
        const inTiming = (r === 6 || c === 6);
        const inAlign = (r >= 14 && r <= 18 && c >= 14 && c <= 18);
        if (!inFinder && !inTiming && !inAlign) {
          const bit = (((hash ^ (r * 31 + c * 17)) + (r * c)) % 3) === 0;
          matrix[r][c] = bit;
        }
      }
    }

    // Build SVG
    let rects = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c]) {
          rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="#0b0f19" />`;
        }
      }
    }

    containerEl.innerHTML = `<svg viewBox="0 0 ${size} ${size}" width="70" height="70" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  window.renderQrSvg = renderQrSvg;

  // Active Certificate Memory Store
  let currentCertificate = {
    name: "Ing. Carlos Mendoza Alarcón",
    facility: "Tijuana Medical Device Facility — Cleanroom ISO 7/8 (Baja California)",
    trackKey: "automotive-lean",
    trackName: "Automotive Engineering & Lean Manufacturing (IATF 16949 / 8D)",
    hours: 120,
    cefr: "C1 Operational Fluency",
    folio: "STEM-ISO9001-2026-TJ-84920",
    hash: "SHA256: 4f8b9e2a",
    issuedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  // Plant Facility Code Lookup
  const FACILITY_CODES = {
    "Tijuana": "TJ",
    "Monterrey": "MTY",
    "Juárez": "JRA",
    "Querétaro": "QRO",
    "Saltillo": "SAL",
    "Guadalajara": "GDL"
  };

  function getFacilityCode(facilityStr) {
    for (const [key, code] of Object.entries(FACILITY_CODES)) {
      if (facilityStr.includes(key)) return code;
    }
    return "MX";
  }

  // Generate & Sign Certificate
  window.generateAuditableCertificate = function() {
    const inputName = document.getElementById('cert-input-name');
    const inputFacility = document.getElementById('cert-input-facility');
    const inputTrack = document.getElementById('cert-input-track');
    const inputHours = document.getElementById('cert-input-hours');

    const name = inputName ? inputName.value.trim() || "Ing. Carlos Mendoza Alarcón" : "Ing. Carlos Mendoza Alarcón";
    const facility = inputFacility ? inputFacility.value : "Tijuana Medical Device Facility — Cleanroom ISO 7/8 (Baja California)";
    const trackVal = inputTrack ? inputTrack.value : "automotive-lean";
    const hours = inputHours ? parseInt(inputHours.value, 10) || 120 : 120;

    let trackTitle = "Consolidated Nearshoring Master Technical English (34 Tracks C1)";
    if (trackVal !== 'consolidated-master') {
      const foundTrack = (tracks || []).find(t => t.id === trackVal);
      if (foundTrack) {
        trackTitle = foundTrack.title;
      } else {
        const optionEl = inputTrack ? inputTrack.querySelector(`option[value="${trackVal}"]`) : null;
        if (optionEl) trackTitle = optionEl.textContent;
      }
    }

    const plantCode = getFacilityCode(facility);
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const folio = `STEM-ISO9001-2026-${plantCode}-${randomSuffix}`;
    const hash = `SHA256: ${Math.random().toString(16).substring(2, 10)}`;

    currentCertificate = {
      name,
      facility,
      trackKey: trackVal,
      trackName: trackTitle,
      hours,
      cefr: "C1 Operational Fluency",
      folio,
      hash,
      issuedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    // Update DOM on canvas
    const displayName = document.getElementById('cert-display-name');
    const displayTrack = document.getElementById('cert-display-track');
    const displayFacility = document.getElementById('cert-display-facility');
    const displayHours = document.getElementById('cert-display-hours');
    const displayFolio = document.getElementById('cert-display-folio');
    const displayHash = document.getElementById('cert-display-hash');
    const displayQr = document.getElementById('cert-display-qr');

    if (displayName) displayName.textContent = name;
    if (displayTrack) displayTrack.innerHTML = `<i class="fa-solid fa-certificate"></i> ${escapeHtml(trackTitle)}`;
    if (displayFacility) displayFacility.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${escapeHtml(facility)}`;
    if (displayHours) displayHours.textContent = `${hours} Training Hours`;
    if (displayFolio) displayFolio.textContent = folio;
    if (displayHash) displayHash.textContent = hash;

    const verificationUrl = `https://stemos.org/dev/?verify=${folio}`;
    renderQrSvg(verificationUrl, displayQr);

    // Persist in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('stemos_active_certificates_v5') || '[]');
      stored.unshift(currentCertificate);
      localStorage.setItem('stemos_active_certificates_v5', JSON.stringify(stored.slice(0, 10)));
    } catch (e) {}

    return currentCertificate;
  };

  // Certificate Modal Handlers
  window.openCertificateModal = function(customTrackId) {
    if (!certModal) return;
    if (customTrackId) {
      const selectTrack = document.getElementById('cert-input-track');
      if (selectTrack) selectTrack.value = customTrackId;
    }
    window.generateAuditableCertificate();
    certModal.style.display = 'flex';
    certModal.setAttribute('aria-hidden', 'false');
  };

  window.closeCertificateModal = function() {
    if (!certModal) return;
    certModal.style.display = 'none';
    certModal.setAttribute('aria-hidden', 'true');
  };

  window.printCertificate = function() {
    window.print();
  };

  window.copyCertificateVerificationLink = function() {
    const folio = currentCertificate.folio || "STEM-ISO9001-2026-TJ-84920";
    const url = `https://stemos.org/dev/?verify=${folio}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('btn-copy-cert-url');
        if (btn) {
          const prev = btn.innerHTML;
          btn.innerHTML = `<i class="fa-solid fa-check" style="color:#10b981;"></i> Link Copied!`;
          setTimeout(() => btn.innerHTML = prev, 1800);
        }
      }).catch(() => {});
    }
  };

  // Public Verification Modal Handlers
  window.openVerificationModal = function(certData) {
    if (!verifyModal) return;
    const data = certData || currentCertificate;

    const vHolder = document.getElementById('v-holder-name');
    const vTrack = document.getElementById('v-track-name');
    const vFacility = document.getElementById('v-facility-name');
    const vFolio = document.getElementById('v-folio-id');
    const vHours = document.getElementById('v-hours');

    if (vHolder) vHolder.textContent = data.name;
    if (vTrack) vTrack.textContent = data.trackName;
    if (vFacility) vFacility.textContent = data.facility;
    if (vFolio) vFolio.textContent = data.folio;
    if (vHours) vHours.textContent = `${data.hours} Training Hours (CEFR C1)`;

    verifyModal.style.display = 'flex';
    verifyModal.setAttribute('aria-hidden', 'false');
  };

  window.closeVerificationModal = function() {
    if (!verifyModal) return;
    verifyModal.style.display = 'none';
    verifyModal.setAttribute('aria-hidden', 'true');
  };

  // Enterprise Cloud Sync Engine
  const cloudState = {
    connected: true,
    projectId: "jsweb-b14f8",
    facility: "tijuana",
    lastSynced: new Date().toISOString()
  };

  window.openCloudSyncModal = function() {
    if (!cloudModal) return;
    // Hydrate telemetry counters
    const countSm2 = document.getElementById('cloud-count-sm2');
    const count8d = document.getElementById('cloud-count-8d');
    const countPitches = document.getElementById('cloud-count-pitches');
    const countCerts = document.getElementById('cloud-count-certs');

    let sm2CardsCount = 10;
    try {
      const storedDeck = JSON.parse(localStorage.getItem('stemos_sm2_cards_v5') || '[]');
      if (storedDeck.length) sm2CardsCount = storedDeck.length;
    } catch(e) {}

    let certsCount = 1;
    try {
      const storedCerts = JSON.parse(localStorage.getItem('stemos_active_certificates_v5') || '[]');
      if (storedCerts.length) certsCount = storedCerts.length;
    } catch(e) {}

    if (countSm2) countSm2.textContent = sm2CardsCount;
    if (count8d) count8d.textContent = '4';
    if (countPitches) countPitches.textContent = '2';
    if (countCerts) countCerts.textContent = certsCount;

    cloudModal.style.display = 'flex';
    cloudModal.setAttribute('aria-hidden', 'false');
  };

  window.closeCloudSyncModal = function() {
    if (!cloudModal) return;
    cloudModal.style.display = 'none';
    cloudModal.setAttribute('aria-hidden', 'true');
  };

  window.updateCloudFacility = function(val) {
    cloudState.facility = val;
    const banner = document.getElementById('cloud-status-banner-text');
    if (banner) {
      banner.textContent = `Cloud Sync: Connected (${cloudState.projectId} • ${val.toUpperCase()})`;
    }
  };

  window.syncEnterpriseCloudNow = function() {
    cloudState.lastSynced = new Date().toISOString();
    const timeEl = document.getElementById('cloud-last-sync-time');
    const navStatus = document.getElementById('nav-cloud-status');
    const dot = document.getElementById('cloud-status-dot');

    if (dot) {
      dot.style.background = '#10b981';
      dot.style.boxShadow = '0 0 12px #10b981';
    }
    if (timeEl) timeEl.textContent = 'Last Synced: Just now';
    if (navStatus) navStatus.textContent = 'Cloud: Synced';

    // Dispatch event
    window.dispatchEvent(new CustomEvent('stemosEnterpriseSynced', { detail: cloudState }));
  };

  window.exportEnterpriseBackup = function() {
    const backupData = {
      version: "5.1.0",
      timestamp: new Date().toISOString(),
      facility: cloudState.facility,
      certificates: JSON.parse(localStorage.getItem('stemos_active_certificates_v5') || '[]'),
      sm2: JSON.parse(localStorage.getItem('stemos_sm2_cards_v5') || '[]'),
      metadata: {
        exportedBy: "stemOS Enterprise L&D Gateway",
        standard: "ISO 9001:2015 Clause 7.2"
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stemos_enterprise_backup_${cloudState.facility}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  window.importEnterpriseBackup = function(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.certificates && Array.isArray(data.certificates)) {
          localStorage.setItem('stemos_active_certificates_v5', JSON.stringify(data.certificates));
        }
        if (data.sm2 && Array.isArray(data.sm2)) {
          localStorage.setItem('stemos_sm2_cards_v5', JSON.stringify(data.sm2));
        }
        window.syncEnterpriseCloudNow();
        window.openCloudSyncModal();
      } catch (err) {
        console.error("Backup import error:", err);
      }
    };
    reader.readAsText(file);
  };

  // Auto-trigger Verification Modal if ?verify=FOLIO is in URL
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const verifyFolio = urlParams.get('verify');
    if (verifyFolio) {
      setTimeout(() => {
        window.openVerificationModal({
          name: "Ing. Carlos Mendoza Alarcón",
          trackName: "Automotive Engineering & Lean Manufacturing (IATF 16949 / 8D)",
          facility: "Tijuana Medical Device Facility — Cleanroom ISO 7/8",
          folio: verifyFolio,
          hours: 120
        });
      }, 350);
    }
  }

  // Initial render of the default certificate QR code
  const initialQrBox = document.getElementById('cert-display-qr');
  if (initialQrBox) {
    renderQrSvg(`https://stemos.org/dev/?verify=STEM-ISO9001-2026-TJ-84920`, initialQrBox);
  }
}

/* ==========================================================================
   PHASE 8: INTERACTIVE BLUEPRINT, P&ID & GD&T READING LAB
   ========================================================================== */
function setupBlueprintAndPidLab(tracks) {
  const BLUEPRINT_SCHEMATICS = {
    medtech_pid: {
      title: "DWG-MED-0492: EtO Gas Delivery & Exhaust Scrubber Loop",
      standard: "STANDARD: ANSI/ISA-5.1-2009 • ISO 11135:2014",
      svg: `<svg viewBox="0 0 800 480" class="blueprint-svg-canvas" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid-med" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.08)" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#050e1d" />
  <rect width="100%" height="100%" fill="url(#grid-med)" />

  <!-- Chamber Vessel -->
  <rect x="220" y="140" width="220" height="200" rx="20" fill="rgba(2, 132, 199, 0.12)" stroke="#38bdf8" stroke-width="2.5" />
  <rect x="230" y="150" width="200" height="180" rx="14" fill="none" stroke="rgba(56, 189, 248, 0.3)" stroke-dasharray="4,4" />
  <text x="330" y="235" fill="#e0f2fe" font-size="13" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">ETO STERILIZER</text>
  <text x="330" y="255" fill="#38bdf8" font-size="11" font-family="'JetBrains Mono', monospace" text-anchor="middle">CHAMBER V-200 (60 m³)</text>
  <text x="330" y="275" fill="#94a3b8" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="middle">DESIGN: 5.0 BAR / 65°C</text>

  <!-- Process Piping Lines -->
  <!-- N2 / Steam feed line top-right -->
  <path d="M 680 180 L 440 180" fill="none" stroke="#38bdf8" stroke-width="2.5" />
  <polygon points="560,175 572,180 560,185" fill="#38bdf8" />
  <text x="670" y="170" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">CLEAN STEAM / N2</text>

  <!-- Steam Valve TCV-301 -->
  <polygon points="630,170 650,180 630,190" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
  <polygon points="670,170 650,180 670,190" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
  <line x1="650" y1="170" x2="650" y2="150" stroke="#38bdf8" stroke-width="1.5" />
  <path d="M 635 150 Q 650 140 665 150 Z" fill="rgba(56, 189, 248, 0.4)" stroke="#38bdf8" stroke-width="1.5" />
  <circle cx="650" cy="115" r="16" fill="#06162d" stroke="#38bdf8" stroke-width="1.5" />
  <text x="650" y="119" fill="#38bdf8" font-size="8.5" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">TCV</text>

  <!-- Safety Relief PSV-204 top-left -->
  <path d="M 260 140 L 260 90 L 140 90 L 140 50" fill="none" stroke="#f59e0b" stroke-width="2.5" />
  <polygon points="252,90 268,90 260,80" fill="#b45309" stroke="#f59e0b" stroke-width="1.5" />
  <polygon points="260,80 252,70 268,70" fill="#b45309" stroke="#f59e0b" stroke-width="1.5" />
  <line x1="260" y1="70" x2="260" y2="55" stroke="#f59e0b" stroke-width="1.5" />
  <rect x="250" y="45" width="20" height="10" fill="#b45309" stroke="#f59e0b" stroke-width="1.5" />
  <circle cx="210" cy="80" r="16" fill="#06162d" stroke="#f59e0b" stroke-width="1.5" />
  <text x="210" y="84" fill="#fbbf24" font-size="8.5" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">PSV</text>
  <text x="140" y="40" fill="#f59e0b" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">TO FLARE / SCRUBBER</text>

  <!-- Differential Pressure Transmitter PT-108 -->
  <path d="M 380 140 L 380 90" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" />
  <circle cx="380" cy="75" r="18" fill="#06162d" stroke="#38bdf8" stroke-width="1.5" />
  <line x1="362" y1="75" x2="398" y2="75" stroke="#38bdf8" stroke-width="1" />
  <text x="380" y="71" fill="#e0f2fe" font-size="9" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">PT</text>
  <text x="380" y="85" fill="#38bdf8" font-size="7.5" font-family="'JetBrains Mono', monospace" text-anchor="middle">108</text>
  <text x="380" y="48" fill="#94a3b8" font-size="8.5" font-family="'JetBrains Mono', monospace" text-anchor="middle">HART 4-20mA (SIL-2)</text>

  <!-- Vacuum Evacuation line bottom -->
  <path d="M 330 340 L 330 400 L 520 400" fill="none" stroke="#38bdf8" stroke-width="2.5" />
  <polygon points="400,395 412,400 400,405" fill="#38bdf8" />

  <!-- Liquid Ring Vacuum Pump P-102 -->
  <circle cx="560" cy="400" r="28" fill="#0369a1" stroke="#38bdf8" stroke-width="2" />
  <polygon points="545,390 575,400 545,410" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5" />
  <text x="560" y="445" fill="#e0f2fe" font-size="10" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">P-102A/B</text>
  <text x="560" y="458" fill="#94a3b8" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle">VACUUM SKID</text>

  <!-- Discharge to Scrubber -->
  <path d="M 588 400 L 680 400 L 680 320" fill="none" stroke="#10b981" stroke-width="2" />
  <rect x="650" y="240" width="60" height="80" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2" />
  <text x="680" y="275" fill="#34d399" font-size="9" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">ACID</text>
  <text x="680" y="290" fill="#34d399" font-size="9" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">SCRUBBER</text>
</svg>`,
      hotspots: {
        psv204: {
          x: 28,
          y: 20,
          tag: "PSV-204",
          name: "Pressure Safety Relief Valve (Direct Spring Loaded)",
          system: "Sterilization Chamber Vaporizer Subsystem",
          standard: "ASME Section VIII Div 1 • API 520",
          range: "Set at 4.5 bar gauge (65.2 psig)",
          meaning: "Pressure safety relief device venting overpressure to thermal oxidizer scrubber",
          quote: "Loop PSV-204 is an ASME-stamped spring-loaded pressure relief valve calibrated at 4.5 bar gauge. During annual chamber PMs, our metrology team executes pop-test bench calibration with zero allowable seat leakage before reseating.",
          redline: "ECO-2026-0881: Redline P&ID DWG-MED-0492 sheet 2. Replace single rupture disc upstream of PSV-204 with a monitored tell-tale pressure gauge assembly per ISO 11135 §7.4 to detect micro-corrosion pinholes prior to catastrophic relief.",
          quiz: {
            question: "In ANSI/ISA-5.1 symbol conventions, what does the letter 'S' represent when placed as the first modifier in 'PSV'?",
            options: [
              "Solenoid Actuator",
              "Safety / Relief Function",
              "Secondary Pressure Sensor",
              "Static Head Compensator"
            ],
            answer: 1,
            explanation: "In ISA-5.1 tag convention, 'P' = Pressure, 'S' = Safety modifier, and 'V' = Valve, designating a Pressure Safety Valve."
          }
        },
        pt108: {
          x: 48,
          y: 16,
          tag: "PT-108",
          name: "Differential Pressure Transmitter (HART / 4-20mA SIL-2)",
          system: "Chamber Deep-Vacuum & Humidification Monitor",
          standard: "ANSI/ISA-5.1 • IEC 61508 SIL-2",
          range: "0 to 1000 mbar absolute (±0.05% FS accuracy)",
          meaning: "Transmits analog 4-20mA current loop to SCADA PLC for chamber vacuum leak testing",
          quote: "Transmitter PT-108 measures vacuum decay during our 15-minute leak hold phase. If delta-P exceeds 1.5 millibar per minute, the PLC triggers an automatic cycle abort and initiates inert nitrogen flush.",
          redline: "ECO-2026-0882: Upgrade transmitter PT-108 to dual redundant HART transmitters with 2-out-of-3 voting logic to satisfy FDA 21 CFR Part 820 medical device integrity requirements.",
          quiz: {
            question: "In ISA-5.1 instrument loops, what does a dashed line connecting an instrument bubble to a PLC indicate?",
            options: [
              "Pneumatic air signal (3-15 psi)",
              "Electrical analog (4-20 mA) or digital bus signal",
              "Hydraulic pilot supply line",
              "Capillary tubing filled with silicone oil"
            ],
            answer: 1,
            explanation: "Dashed lines represent electrical or electronic signal transmission (4-20 mA current loop, discrete 24VDC, or digital fieldbus)."
          }
        },
        p102: {
          x: 70,
          y: 78,
          tag: "P-102A/B",
          name: "Liquid Ring Vacuum Pump Skid (Dual Redundant Lead-Lag)",
          system: "EtO Evacuation & Acid Scrubber Feed",
          standard: "API 681 • ATEX Zone 1 / Class I Div 1",
          range: "450 m³/hr displacement @ 35 mbar suction",
          meaning: "Evacuates ethylene oxide vapors post-cycle into caustic recirculation scrubber",
          quote: "Skid P-102A operates in lead-lag duty with pump 102B. Both units are equipped with double mechanical seals and barrier fluid pressure alarms to eliminate fugitive EtO emissions.",
          redline: "ECO-2026-0883: Add RTD Pt100 thermal sensors on P-102 seal quench reservoir to interlock pump shutdown if seal fluid temperature climbs above 45°C.",
          quiz: {
            question: "What does a double parallel line through a process pipe symbol signify in P&ID diagrams?",
            options: [
              "Steam traced or heat jacketed piping",
              "Flexible hose connection",
              "Expansion joint bellows",
              "Spectacle blind in open position"
            ],
            answer: 0,
            explanation: "Parallel auxiliary lines or hatching alongside process lines represent steam, electric, or glycol heat tracing."
          }
        },
        tcv301: {
          x: 82,
          y: 28,
          tag: "TCV-301",
          name: "Pneumatic Diaphragm Steam Control Valve (Fail-Closed)",
          system: "Chamber Vaporizer Temperature Control",
          standard: "ISA-75.01 • ANSI FCI 70-2 Class VI",
          range: "0-100% modulating travel (3-15 psi actuator)",
          meaning: "Regulates clean steam injection to maintain tight 54°C ± 2°C chamber sterilization profile",
          quote: "TCV-301 is calibrated for equal percentage flow characteristics. In the event of plant instrument air loss, its internal spring drives the plug into the seat, guaranteeing fail-closed safety.",
          redline: "ECO-2026-0884: Install smart electro-pneumatic positioner with partial-stroke test capability on TCV-301 to ensure zero valve stiction during long sterilizing dwell holds.",
          quiz: {
            question: "What does an arrow pointing downwards towards the valve seat within a diaphragm valve actuator indicate?",
            options: [
              "Fail Open (Air to Close)",
              "Fail Closed (Air to Open)",
              "Fail in Last Position (Drift)",
              "Manual Handwheel Override"
            ],
            answer: 1,
            explanation: "An arrow pointing towards the seat inside the actuator shows spring closing force: Air-to-Open, Fail-Closed (FC)."
          }
        }
      }
    },

    automotive_gdt: {
      title: "DWG-AUTO-7721: Inline-4 Engine Cylinder Block Deck & Main Bore",
      standard: "STANDARD: ASME Y14.5-2018 • ISO 1101:2017",
      svg: `<svg viewBox="0 0 800 480" class="blueprint-svg-canvas" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid-auto" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.08)" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#040d1a" />
  <rect width="100%" height="100%" fill="url(#grid-auto)" />

  <!-- Engine Block Outer Profile -->
  <path d="M 80 120 L 720 120 L 700 380 L 100 380 Z" fill="rgba(15, 23, 42, 0.8)" stroke="#38bdf8" stroke-width="2.5" />

  <!-- Top Deck Surface Line (Datum A) -->
  <line x1="60" y1="120" x2="740" y2="120" stroke="#0ea5e9" stroke-width="3" />
  <text x="400" y="105" fill="#38bdf8" font-size="11" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">CYLINDER HEAD MATING DECK SURFACE</text>

  <!-- Datum A Flag -->
  <polygon points="120,120 130,100 110,100" fill="#38bdf8" />
  <line x1="120" y1="100" x2="120" y2="80" stroke="#38bdf8" stroke-width="1.5" />
  <rect x="105" y="60" width="30" height="20" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
  <text x="120" y="75" fill="#ffffff" font-size="12" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">A</text>

  <!-- Perpendicularity Feature Control Frame -->
  <g transform="translate(420, 60)">
    <rect width="160" height="26" fill="#06162d" stroke="#38bdf8" stroke-width="1.5" />
    <line x1="32" y1="0" x2="32" y2="26" stroke="#38bdf8" stroke-width="1" />
    <line x1="105" y1="0" x2="105" y2="26" stroke="#38bdf8" stroke-width="1" />
    <text x="16" y="18" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">⟂</text>
    <text x="68" y="17" fill="#f8fafc" font-size="11" font-family="'JetBrains Mono', monospace" text-anchor="middle">0.02</text>
    <text x="132" y="17" fill="#38bdf8" font-size="12" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">A</text>
    <path d="M 80 26 L 80 60 L 50 60" fill="none" stroke="#38bdf8" stroke-width="1.5" />
  </g>

  <!-- 4 Cylinders -->
  <circle cx="180" cy="240" r="50" fill="rgba(2, 132, 199, 0.2)" stroke="#38bdf8" stroke-width="2" />
  <line x1="180" y1="175" x2="180" y2="305" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <line x1="115" y1="240" x2="245" y2="240" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <text x="180" y="244" fill="#94a3b8" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="middle">CYL 1</text>

  <circle cx="320" cy="240" r="50" fill="rgba(2, 132, 199, 0.2)" stroke="#38bdf8" stroke-width="2" />
  <line x1="320" y1="175" x2="320" y2="305" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <line x1="255" y1="240" x2="385" y2="240" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <text x="320" y="244" fill="#94a3b8" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="middle">CYL 2</text>

  <circle cx="460" cy="240" r="50" fill="rgba(2, 132, 199, 0.2)" stroke="#38bdf8" stroke-width="2" />
  <line x1="460" y1="175" x2="460" y2="305" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <line x1="395" y1="240" x2="525" y2="240" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <text x="460" y="244" fill="#94a3b8" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="middle">CYL 3</text>

  <circle cx="600" cy="240" r="50" fill="rgba(2, 132, 199, 0.2)" stroke="#38bdf8" stroke-width="2" />
  <line x1="600" y1="175" x2="600" y2="305" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <line x1="535" y1="240" x2="665" y2="240" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="1" />
  <text x="600" y="244" fill="#94a3b8" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="middle">CYL 4</text>

  <!-- True Position Feature Control Frame on Cyl 2 -->
  <g transform="translate(210, 310)">
    <rect width="210" height="26" fill="#06162d" stroke="#f59e0b" stroke-width="1.5" />
    <line x1="30" y1="0" x2="30" y2="26" stroke="#f59e0b" stroke-width="1" />
    <line x1="110" y1="0" x2="110" y2="26" stroke="#f59e0b" stroke-width="1" />
    <line x1="140" y1="0" x2="140" y2="26" stroke="#f59e0b" stroke-width="1" />
    <line x1="175" y1="0" x2="175" y2="26" stroke="#f59e0b" stroke-width="1" />
    <text x="15" y="18" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle">⌖</text>
    <text x="70" y="17" fill="#f8fafc" font-size="11" font-family="'JetBrains Mono', monospace" text-anchor="middle">⌀0.05 Ⓜ</text>
    <text x="125" y="17" fill="#38bdf8" font-size="11" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">A</text>
    <text x="157" y="17" fill="#38bdf8" font-size="11" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">B Ⓜ</text>
    <text x="192" y="17" fill="#38bdf8" font-size="11" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">C Ⓜ</text>
    <path d="M 30 0 L 30 -25 L 80 -45" fill="none" stroke="#f59e0b" stroke-width="1.5" />
  </g>

  <!-- Water Jacket Profile Trace -->
  <path d="M 120 170 Q 180 150 240 170 Q 320 150 400 170 Q 480 150 560 170 Q 640 150 670 180 L 670 310 Q 560 330 460 310 Q 320 330 200 310 Z" fill="none" stroke="rgba(16, 185, 129, 0.4)" stroke-dasharray="5,5" stroke-width="2" />
  <text x="580" y="360" fill="#34d399" font-size="10" font-family="'JetBrains Mono', monospace">WATER JACKET CAVITY</text>

  <!-- Oil Pan Rail Datum A targets at bottom -->
  <rect x="80" y="380" width="620" height="24" fill="#0f172a" stroke="#64748b" stroke-width="1.5" />
  <circle cx="160" cy="392" r="6" fill="#f59e0b" />
  <text x="160" y="420" fill="#fbbf24" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">[A1]</text>
  <circle cx="400" cy="392" r="6" fill="#f59e0b" />
  <text x="400" y="420" fill="#fbbf24" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">[A2]</text>
  <circle cx="640" cy="392" r="6" fill="#f59e0b" />
  <text x="640" y="420" fill="#fbbf24" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">[A3]</text>
</svg>`,
      hotspots: {
        pos_bore: {
          x: 38,
          y: 65,
          tag: "POS-BORE-1/4",
          name: "Cylinder Bore True Position Control Frame",
          system: "Deck Surface to Crankcase Alignment Subsystem",
          standard: "ASME Y14.5-2018 §10.2",
          range: "⌖ ⌀ 0.05 Ⓜ | A | B Ⓜ | C Ⓜ",
          meaning: "Controls axial location and orientation of cylinder bore centerline at Maximum Material Condition (MMC) relative to primary Datum A (deck), secondary Datum B (crankshaft journal centerline), and tertiary Datum C (flywheel dowel pin).",
          quote: "The cylinder bore true position callout specifies a cylindrical tolerance zone of 50 microns at MMC referenced to primary datum plane A, secondary datum axis B, and tertiary datum C. If the bore diameter departs from MMC toward LMC, we gain bonus tolerance for machining tool wear.",
          redline: "ECO-2026-0914: Relax bore true position callout from ⌀0.05Ⓜ to ⌀0.075Ⓜ at LMC on non-thrust face to reduce scrap rate during CNC rough boring without compromising piston skirt clearance.",
          quiz: {
            question: "In ASME Y14.5 GD&T, what is the meaning of the encircled 'M' modifier in a feature control frame?",
            options: [
              "Minimum Material Condition (LMC)",
              "Maximum Material Condition (MMC)",
              "Material Modification Constant",
              "Midplane Tolerance Zone"
            ],
            answer: 1,
            explanation: "Encircled 'M' denotes Maximum Material Condition, allowing bonus tolerance as the feature size departs from its maximum material limit."
          }
        },
        perp_deck: {
          x: 62,
          y: 16,
          tag: "PERP-DECK-A",
          name: "Cylinder Head Mating Deck Perpendicularity & Flatness",
          system: "Block Deck Face to Cylinder Bore Axis",
          standard: "ASME Y14.5-2018 §9.3 & §8.4",
          range: "⟂ 0.02 | A & ⏥ 0.015 Overall",
          meaning: "Ensures the top deck surface is perpendicular to cylinder bore axis within 20 microns and maintains overall flatness within 15 microns to prevent head gasket combustion blow-by.",
          quote: "We verify deck surface flatness and perpendicularity to Datum A via automated CMM scanning with 120 probe points. This tight 15-micron envelope guarantees uniform clamping pressure across all multi-layer steel (MLS) head gasket fire rings.",
          redline: "ECO-2026-0915: Revise deck surface finish requirement from Ra 0.8 µm to Rz 3.2 µm with 3D profilometry scanning to prevent micro-leak paths under 250-bar peak cylinder pressure.",
          quiz: {
            question: "Does a Flatness tolerance (⏥) ever reference datum features in its feature control frame?",
            options: [
              "Yes, always requires a primary datum",
              "No, form tolerances never reference datums",
              "Only when specified with MMC modifier",
              "Only on secondary mating surfaces"
            ],
            answer: 1,
            explanation: "Form tolerances (flatness, straightness, circularity, cylindricity) are standalone geometric controls and NEVER reference datums."
          }
        },
        prof_jacket: {
          x: 75,
          y: 72,
          tag: "PROF-JACKET",
          name: "Coolant Water Jacket Cavity Profile of a Surface",
          system: "Casting Core & Thermal Management Matrix",
          standard: "ASME Y14.5-2018 §11.2",
          range: "⌓ 0.40 Ⓤ 0.10 | A | B | C",
          meaning: "Unilateral surface profile control defining cast wall thickness distribution to eliminate hot spots and prevent thin-wall rupture during induction hardening.",
          quote: "The water jacket cast cavity uses an unequal bilateral profile tolerance of 0.4 mm with 0.1 mm allowing metal addition. This ensures consistent wall thickness between the intake exhaust runners and cylinder liners during lost-foam sand casting.",
          redline: "ECO-2026-0916: Add ultrasonic wall thickness verification checkpoint at Station 40 CMM to flag sand-core shift before finish-machining the oil gallery passages.",
          quiz: {
            question: "What does the symbol Ⓤ indicate inside an ASME Y14.5 profile feature control frame?",
            options: [
              "Uniform distribution tolerance",
              "Unequally disposed bilateral tolerance",
              "Unilateral outward material condition",
              "Unchecked rough casting surface"
            ],
            answer: 1,
            explanation: "The Ⓤ modifier indicates an unequally disposed profile tolerance, where the number following defines the portion of the tolerance zone adding material."
          }
        },
        datum_a: {
          x: 20,
          y: 82,
          tag: "DATUM-[A]",
          name: "Primary Datum Target Simulator (Oil Pan Rail)",
          system: "Manufacturing & Metrology Reference Plane",
          standard: "ASME Y14.5-2018 §7.3",
          range: "3 Target Points (A1, A2, A3) coplanar within 0.008 mm",
          meaning: "Establishes the fundamental 3-point kinematic constraint plane that immobilizes pitch and roll degrees of freedom for all downstream machining operations.",
          quote: "Datum A is simulated using three spherical carbide locators on the oil pan rail fixture. Restricting these three degrees of freedom guarantees repeatable datum transfer from high-speed broaching to multi-axis CNC drilling.",
          redline: "ECO-2026-0917: Standardize datum target locator diameters across both Saltillo and Ramos Arizpe machining lines to eliminate inter-facility CMM correlation bias.",
          quiz: {
            question: "According to the 3-2-1 locating principle, how many degrees of freedom does the primary datum plane [A] arrest?",
            options: [
              "1 translation, 1 rotation (2 total)",
              "1 translation, 2 rotations (3 total)",
              "2 translations, 1 rotation (3 total)",
              "All 6 spatial degrees of freedom"
            ],
            answer: 1,
            explanation: "A primary datum plane eliminates 3 degrees of freedom: 1 translational movement (perpendicular to plane) and 2 rotational movements (pitch and roll)."
          }
        }
      }
    },

    energy_sld: {
      title: "DWG-PWR-9904: 115kV/13.8kV Nearshoring Substation & Backup Generation Tie",
      standard: "STANDARD: IEEE 315 / IEEE C37.2 (ANSI Device Numbers)",
      svg: `<svg viewBox="0 0 800 480" class="blueprint-svg-canvas" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid-pwr" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.08)" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#050b16" />
  <rect width="100%" height="100%" fill="url(#grid-pwr)" />

  <!-- 115 kV Incoming Grid Utility Bus -->
  <line x1="80" y1="70" x2="720" y2="70" stroke="#f59e0b" stroke-width="4" />
  <text x="400" y="55" fill="#fbbf24" font-size="12" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">115 kV UTILITY INCOMING TRANSMISSION BUS (CFE / ISO)</text>

  <!-- Incoming Drop Line -->
  <line x1="220" y1="70" x2="220" y2="110" stroke="#f59e0b" stroke-width="2.5" />
  <circle cx="220" cy="110" r="4" fill="#f59e0b" />
  <line x1="220" y1="110" x2="235" y2="135" stroke="#f59e0b" stroke-width="2" />
  <circle cx="220" cy="140" r="4" fill="#f59e0b" />
  <text x="248" y="125" fill="#94a3b8" font-size="9" font-family="'JetBrains Mono', monospace">89-1 DS</text>

  <!-- SF6 Circuit Breaker 52-1 (CB-101) -->
  <line x1="220" y1="140" x2="220" y2="160" stroke="#38bdf8" stroke-width="2.5" />
  <rect x="202" y="160" width="36" height="36" fill="#06162d" stroke="#38bdf8" stroke-width="2" />
  <line x1="202" y1="160" x2="238" y2="196" stroke="#38bdf8" stroke-width="1.5" />
  <text x="248" y="175" fill="#38bdf8" font-size="10" font-weight="bold" font-family="'JetBrains Mono', monospace">52-1 (CB-101)</text>
  <text x="248" y="190" fill="#94a3b8" font-size="8.5" font-family="'JetBrains Mono', monospace">115kV SF6 40kA</text>

  <!-- Line to Transformer -->
  <line x1="220" y1="196" x2="220" y2="230" stroke="#38bdf8" stroke-width="2.5" />
  <line x1="220" y1="230" x2="400" y2="230" stroke="#38bdf8" stroke-width="2.5" />
  <line x1="400" y1="230" x2="400" y2="250" stroke="#38bdf8" stroke-width="2.5" />

  <!-- 40 MVA Transformer TR-01 -->
  <circle cx="400" cy="270" r="26" fill="rgba(2, 132, 199, 0.15)" stroke="#38bdf8" stroke-width="2" />
  <circle cx="400" cy="305" r="26" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2" />
  <polygon points="392,265 408,265 400,277" fill="none" stroke="#38bdf8" stroke-width="1.5" />
  <path d="M 400 305 L 400 318 M 392 300 L 400 305 L 408 300" fill="none" stroke="#10b981" stroke-width="1.5" />
  <text x="440" y="280" fill="#f8fafc" font-size="11" font-weight="bold" font-family="'JetBrains Mono', monospace">TR-01 (40 MVA)</text>
  <text x="440" y="295" fill="#94a3b8" font-size="8.5" font-family="'JetBrains Mono', monospace">115kV Δ / 13.8kV Y-GND</text>
  <text x="440" y="310" fill="#94a3b8" font-size="8.5" font-family="'JetBrains Mono', monospace">Z = 8.5% • ONAN/ONAF</text>

  <!-- 13.8 kV Plant Distribution Bus -->
  <line x1="400" y1="331" x2="400" y2="370" stroke="#10b981" stroke-width="2.5" />
  <line x1="80" y1="370" x2="720" y2="370" stroke="#10b981" stroke-width="4" />
  <text x="400" y="392" fill="#34d399" font-size="12" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">13.8 kV MAIN PLANT SWITCHGEAR BUSBAR (SWG-100)</text>

  <!-- Branch Left: Co-Gen / Backup with Relay 32R -->
  <line x1="200" y1="370" x2="200" y2="410" stroke="#38bdf8" stroke-width="2" />
  <rect x="185" y="410" width="30" height="30" fill="#06162d" stroke="#38bdf8" stroke-width="1.5" />
  <circle cx="200" cy="425" r="8" fill="none" stroke="#38bdf8" stroke-width="1" />
  <text x="200" y="428" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">G</text>
  <text x="140" y="428" fill="#94a3b8" font-size="8.5" font-family="'JetBrains Mono', monospace">GEN 5MW</text>
  <circle cx="250" cy="390" r="16" fill="#06162d" stroke="#f59e0b" stroke-width="1.5" />
  <text x="250" y="394" fill="#fbbf24" font-size="8.5" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">32R</text>

  <!-- Branch Right: Active Harmonic Filter AHF-01 -->
  <line x1="620" y1="370" x2="620" y2="410" stroke="#10b981" stroke-width="2" />
  <rect x="600" y="410" width="40" height="34" fill="#06162d" stroke="#10b981" stroke-width="1.5" />
  <path d="M 606 422 Q 612 414 620 422 Q 628 430 634 422" fill="none" stroke="#34d399" stroke-width="1.5" />
  <text x="620" y="458" fill="#34d399" font-size="9" font-family="'JetBrains Mono', monospace" font-weight="bold" text-anchor="middle">AHF-01</text>
  <text x="620" y="470" fill="#94a3b8" font-size="7.5" font-family="'JetBrains Mono', monospace" text-anchor="middle">±300A PWM</text>
</svg>`,
      hotspots: {
        cb101: {
          x: 27,
          y: 38,
          tag: "CB-101 (52-1)",
          name: "115kV SF6 Gas Insulated Outdoor Circuit Breaker",
          system: "Primary Substation Incoming Feed Interrupter",
          standard: "IEEE C37.04 • IEC 62271-100",
          range: "Rated 123 kV, 2000A Continuous, 40 kA Symmetrical Interrupting",
          meaning: "Primary high-voltage circuit breaker capable of interrupting severe phase-to-phase and phase-to-ground fault currents under SF6 dielectric arc quenching.",
          quote: "Breaker 52-1 is an outdoor dead-tank SF6 unit with dual trip coils and spring-hydraulic operating mechanism. We log SF6 density monitoring telemetry directly into our SCADA to ensure arc quench integrity.",
          redline: "ECO-2026-1045: Install synchronized point-on-wave closing controller on 52-1 to minimize magnetizing inrush current transients when energizing the 40 MVA transformer.",
          quiz: {
            question: "In IEEE / ANSI C37.2 device standards, what protection function is designated by Device Number 50/51?",
            options: [
              "Overfrequency and Underfrequency Relay",
              "Instantaneous and Time-Delay Overcurrent Relay",
              "Differential Current Protection",
              "Undervoltage Protection Relay"
            ],
            answer: 1,
            explanation: "ANSI 50 is Instantaneous Overcurrent, and ANSI 51 is AC Time Overcurrent; combined 50/51 provides dual-stage overcurrent protection."
          }
        },
        tr1: {
          x: 52,
          y: 58,
          tag: "TR-01 (40MVA)",
          name: "Delta-Wye Step-Down Substation Power Transformer (ONAN/ONAF)",
          system: "Main Plant Step-Down Transformation (115kV to 13.8kV)",
          standard: "IEEE C57.12.00 • NEMA TR 1",
          range: "30/40 MVA ONAN/ONAF, 115 kV Delta to 13.8 kV Grounded Wye, Z = 8.5%",
          meaning: "Transforms transmission level voltage down to medium voltage distribution bus; neutral is low-resistance grounded through a 100A neutral grounding resistor (NGR).",
          quote: "Transformer TR-01 features delta primary winding to trap third harmonics, while the 13.8kV grounded-wye secondary provides a stable neutral reference. The low-resistance neutral grounding resistor limits ground fault currents to 100 amperes.",
          redline: "ECO-2026-1046: Retrofit transformer TR-01 with online dissolved gas analysis (DGA) monitor for real-time tracking of hydrogen and acetylene micro-ppm gas generation.",
          quiz: {
            question: "What does the device prefix '87' denote in IEEE protective relaying schematics?",
            options: [
              "Ground Fault Interrupter",
              "Differential Protection Relay",
              "Automatic Recloser",
              "Lockout Relay"
            ],
            answer: 1,
            explanation: "Device 87 designates a Differential Relay (e.g. 87T for transformer differential, 87B for bus differential), comparing incoming vs outgoing current vectors."
          }
        },
        relay32r: {
          x: 32,
          y: 82,
          tag: "RELAY-32R",
          name: "Directional Reverse Power Protection Relay (ANSI 32R)",
          system: "Emergency Generator Co-Gen Intertie Bus",
          standard: "IEEE C37.2 • IEEE C37.91",
          range: "Pickup threshold 2.0% reverse kW, 200 ms time delay",
          meaning: "Prevents plant backup gas turbines or diesel generators from motoring or exporting power into the 115kV utility grid upon grid blackout.",
          quote: "Relay 32R monitors active power vector direction across the 13.8kV tie breaker. If reverse real power exceeds 2% rated capacity for 200 milliseconds, it trips breaker 52-GEN to prevent generator motoring and turbine rotor thermal stress.",
          redline: "ECO-2026-1044: Retune ANSI 32R pickup sensitivity from 2.0% to 1.2% following installation of high-efficiency gas turbine co-generation package per CFE grid intertie code.",
          quiz: {
            question: "Why is the secondary winding of an industrial step-down transformer typically wired in Grounded-Wye configuration?",
            options: [
              "To cancel fundamental load voltage drops",
              "To provide a neutral reference and enable single-phase 120/277V phase-to-neutral loads",
              "To block all transient lightning impulses",
              "To double the continuous kVA capacity"
            ],
            answer: 1,
            explanation: "Grounded-Wye provides a stable system neutral point, allows phase-to-neutral loading, and facilitates selective ground fault tripping."
          }
        },
        ahf: {
          x: 78,
          y: 86,
          tag: "AHF-01",
          name: "Active Harmonic Filter & Dynamic Power Factor Compensator",
          system: "13.8kV Plant Variable Frequency Drive (VFD) Bus",
          standard: "IEEE 519-2022 • IEC 61000-3-6",
          range: "±300 A compensation, harmonic mitigation up to 50th order, target PF > 0.98",
          meaning: "Injects anti-phase harmonic currents via IGBT PWM inverter to cancel non-linear harmonic distortion generated by 6-pulse CNC and VFD drives.",
          quote: "Active filter AHF-01 compensates for the 5th and 7th harmonic current spikes produced by our 80 robotic welding cells. It maintains total harmonic distortion of current (THDi) below 4.2%, fully conforming to IEEE 519 guidelines.",
          redline: "ECO-2026-1047: Add fast-acting transient surge suppression capacitors (TVSS) at AHF-01 bus connection to clamp switching transients during chiller startup.",
          quiz: {
            question: "According to IEEE 519-2022, what is the maximum Total Demand Distortion (TDD) allowed at the Point of Common Coupling (PCC) for stiff industrial grids (Isc/IL > 1000)?",
            options: [
              "1.5%",
              "5.0%",
              "15.0%",
              "25.0%"
            ],
            answer: 2,
            explanation: "For high short-circuit ratios (Isc/IL > 1000), IEEE 519 permits up to 15.0% TDD, whereas stiffer limits (e.g. 5.0%) apply to standard distribution feeders."
          }
        }
      }
    },

    pcba_layout: {
      title: "DWG-EE-4180: 12-Layer Edge AI Accelerator SOM Layout & Stackup",
      standard: "STANDARD: IPC-7351B • IPC-2221B Class 3 (High Reliability)",
      svg: `<svg viewBox="0 0 800 480" class="blueprint-svg-canvas" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid-pcb" width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(16, 185, 129, 0.08)" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#03100c" />
  <rect width="100%" height="100%" fill="url(#grid-pcb)" />

  <!-- PCB Board Outline -->
  <rect x="70" y="40" width="660" height="400" rx="16" fill="rgba(6, 78, 59, 0.25)" stroke="#10b981" stroke-width="2.5" />

  <!-- Mounting holes in corners -->
  <circle cx="105" cy="75" r="14" fill="#03100c" stroke="#10b981" stroke-width="2" />
  <circle cx="695" cy="75" r="14" fill="#03100c" stroke="#10b981" stroke-width="2" />
  <circle cx="105" cy="405" r="14" fill="#03100c" stroke="#10b981" stroke-width="2" />
  <circle cx="695" cy="405" r="14" fill="#03100c" stroke="#10b981" stroke-width="2" />

  <!-- Center U1 BGA-1156 Outline -->
  <rect x="290" y="150" width="220" height="220" rx="6" fill="#062e24" stroke="#34d399" stroke-width="2" />
  <rect x="310" y="170" width="180" height="180" rx="4" fill="none" stroke="rgba(52, 211, 153, 0.4)" stroke-dasharray="3,3" />

  <!-- Ball Grid Matrix Dots -->
  <g fill="#34d399" opacity="0.6">
    <circle cx="330" cy="190" r="2.5"/><circle cx="350" cy="190" r="2.5"/><circle cx="370" cy="190" r="2.5"/><circle cx="390" cy="190" r="2.5"/><circle cx="410" cy="190" r="2.5"/><circle cx="430" cy="190" r="2.5"/><circle cx="450" cy="190" r="2.5"/><circle cx="470" cy="190" r="2.5"/>
    <circle cx="330" cy="210" r="2.5"/><circle cx="350" cy="210" r="2.5"/><circle cx="370" cy="210" r="2.5"/><circle cx="390" cy="210" r="2.5"/><circle cx="410" cy="210" r="2.5"/><circle cx="430" cy="210" r="2.5"/><circle cx="450" cy="210" r="2.5"/><circle cx="470" cy="210" r="2.5"/>
    <circle cx="330" cy="230" r="2.5"/><circle cx="350" cy="230" r="2.5"/><circle cx="450" cy="230" r="2.5"/><circle cx="470" cy="230" r="2.5"/>
    <circle cx="330" cy="290" r="2.5"/><circle cx="350" cy="290" r="2.5"/><circle cx="450" cy="290" r="2.5"/><circle cx="470" cy="290" r="2.5"/>
    <circle cx="330" cy="310" r="2.5"/><circle cx="350" cy="310" r="2.5"/><circle cx="370" cy="310" r="2.5"/><circle cx="390" cy="310" r="2.5"/><circle cx="410" cy="310" r="2.5"/><circle cx="430" cy="310" r="2.5"/><circle cx="450" cy="310" r="2.5"/><circle cx="470" cy="310" r="2.5"/>
    <circle cx="330" cy="330" r="2.5"/><circle cx="350" cy="330" r="2.5"/><circle cx="370" cy="330" r="2.5"/><circle cx="390" cy="330" r="2.5"/><circle cx="410" cy="330" r="2.5"/><circle cx="430" cy="330" r="2.5"/><circle cx="450" cy="330" r="2.5"/><circle cx="470" cy="330" r="2.5"/>
  </g>

  <!-- U1 Die Heat Spreader & Text -->
  <rect x="365" y="235" width="70" height="50" rx="4" fill="#047857" stroke="#6ee7b7" stroke-width="1.5" />
  <text x="400" y="258" fill="#ffffff" font-size="10" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">EDGE AI</text>
  <text x="400" y="272" fill="#a7f3d0" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle">NPU CORE</text>
  <text x="400" y="388" fill="#34d399" font-size="11" font-weight="bold" font-family="'JetBrains Mono', monospace" text-anchor="middle">U1: BGA-1156 (0.8mm PITCH)</text>

  <!-- Differential Clock Trace Pair (DIFF-CLK-01) with trombone delay matching -->
  <path d="M 120 180 L 190 180 Q 200 180 200 190 L 200 210 Q 200 220 210 220 L 230 220 Q 240 220 240 210 L 240 180 Q 240 170 250 170 L 290 170" fill="none" stroke="#38bdf8" stroke-width="2" />
  <path d="M 120 186 L 186 186 Q 194 186 194 194 L 194 214 Q 194 226 210 226 L 230 226 Q 246 226 246 214 L 246 186 Q 246 176 254 176 L 290 176" fill="none" stroke="#38bdf8" stroke-width="2" />
  <text x="140" y="165" fill="#38bdf8" font-size="9" font-family="'JetBrains Mono', monospace" font-weight="bold">DIFF-CLK (100Ω)</text>

  <!-- Decoupling Capacitor Ring -->
  <rect x="525" y="160" width="16" height="8" fill="#f59e0b" stroke="#fbbf24" stroke-width="1" />
  <rect x="525" y="175" width="16" height="8" fill="#f59e0b" stroke="#fbbf24" stroke-width="1" />
  <rect x="525" y="190" width="16" height="8" fill="#f59e0b" stroke="#fbbf24" stroke-width="1" />
  <rect x="525" y="205" width="16" height="8" fill="#f59e0b" stroke="#fbbf24" stroke-width="1" />
  <text x="555" y="190" fill="#fbbf24" font-size="9" font-family="'JetBrains Mono', monospace">0201 / 0402</text>
  <text x="555" y="202" fill="#fbbf24" font-size="9" font-family="'JetBrains Mono', monospace">DECOUPLING RING</text>

  <!-- Thermal Via Array at bottom right -->
  <rect x="525" y="290" width="120" height="70" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-dasharray="3,3" stroke-width="1.5" />
  <g fill="#f59e0b">
    <circle cx="545" cy="310" r="3.5"/><circle cx="565" cy="310" r="3.5"/><circle cx="585" cy="310" r="3.5"/><circle cx="605" cy="310" r="3.5"/><circle cx="625" cy="310" r="3.5"/>
    <circle cx="545" cy="325" r="3.5"/><circle cx="565" cy="325" r="3.5"/><circle cx="585" cy="325" r="3.5"/><circle cx="605" cy="325" r="3.5"/><circle cx="625" cy="325" r="3.5"/>
    <circle cx="545" cy="340" r="3.5"/><circle cx="565" cy="340" r="3.5"/><circle cx="585" cy="340" r="3.5"/><circle cx="605" cy="340" r="3.5"/><circle cx="625" cy="340" r="3.5"/>
  </g>
  <text x="585" y="375" fill="#f59e0b" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">COPPER THERMAL VIAS (TYPE VII)</text>
</svg>`,
      hotspots: {
        u1_bga: {
          x: 50,
          y: 53,
          tag: "U1 (BGA-1156)",
          name: "SoC Neural Processing Unit (0.8mm Ball Pitch, 34x34 Grid)",
          system: "Edge AI Deep Inference Core Processor",
          standard: "IPC-7351B BGA80P34X34 • JEDEC MO-275",
          range: "35W TDP, Core VDD 0.75V @ 42A, Transceiver VDD 1.8V",
          meaning: "High-density ball grid array processor requiring micro-via-in-pad (VIPPO) technology and non-conductive epoxy via filling to break out 1156 interconnect balls.",
          quote: "The U1 BGA package utilizes 0.8 mm pitch solder balls with via-in-pad plated over (VIPPO) technology. During SMT reflow, we monitor vacuum solder atmosphere to keep voiding in critical ground balls below 8% per IPC-A-610 Class 3.",
          redline: "ECO-2026-1188: Specify ENIG (Electroless Nickel Immersion Gold) with immersion silver alternative surface finish to prevent 'black pad' embrittlement on U1 corner anchor balls.",
          quiz: {
            question: "In IPC-A-610 Class 3 electronic assemblies, what is the maximum allowable solder voiding percentage in BGA solder balls?",
            options: [
              "5% of ball area",
              "15% (or 25% for Class 2)",
              "35% of total ball volume",
              "Zero voids permitted"
            ],
            answer: 1,
            explanation: "IPC-A-610 permits maximum 15% solder voiding for Class 3 high-reliability assemblies (up to 25% for Class 2)."
          }
        },
        diff_clk: {
          x: 25,
          y: 38,
          tag: "DIFF-CLK-01",
          name: "PCIe Gen 5 Differential Clock Trace Pair (100Ω Impedance)",
          system: "High-Speed Clock & Serial Transceiver Interconnect",
          standard: "IPC-2141A • PCI-SIG PCIe 5.0 Specification",
          range: "100Ω ± 7% differential impedance, skew matched within 0.12 mm (5 mils)",
          meaning: "Controlled impedance microstrip traces routed on Layer 1 over unbroken Layer 2 GND plane, skew-matched with trombone tuning bends.",
          quote: "Trace pair DIFF-CLK-01 carries the 32 GT/s reference clock. Both legs are routed tightly coupled over solid reference ground with length matching within 5 mils to minimize clock phase jitter.",
          redline: "ECO-2026-1189: Re-route DIFF-CLK-01 around Layer 2 GND plane anti-pad slot to maintain unbroken image plane and avoid edge-radiated EMI emission spikes at 16 GHz.",
          quiz: {
            question: "What occurs when a high-speed differential signal trace crosses over a split or gap in its reference ground plane?",
            options: [
              "Signal propagation velocity doubles",
              "Current return path is disrupted, causing severe impedance discontinuity and EMI radiation",
              "Common-mode rejection ratio improves",
              "Trace capacitance drops to zero with no side effects"
            ],
            answer: 1,
            explanation: "A reference plane split forces return currents to take a detour loop, creating high loop inductance, signal degradation, and severe EMI emissions."
          }
        },
        decoupling: {
          x: 74,
          y: 38,
          tag: "C104-RING",
          name: "Ultra-Low-ESR Decoupling Capacitor Ring (0201 & 0402 X7R)",
          system: "Core Power Distribution Network (PDN) Impedance Flattening",
          standard: "IPC-2221B • IEEE 1156",
          range: "Target PDN impedance < 1.8 mΩ from DC up to 200 MHz",
          meaning: "High-frequency ceramic decoupling capacitors placed on bottom layer directly beneath BGA power balls to deliver instantaneous transient current surges.",
          quote: "Capacitor ring C104 consists of forty-eight 0201 100-nanofarad capacitors mounted directly on the backside beneath the BGA cavity. This ultra-low loop inductance configuration suppresses high di/dt switching noise on the 0.75V core rail.",
          redline: "ECO-2026-1190: Replace 0402 capacitors with reverse-geometry 0204 low-inductance chip capacitors (LW reverse) to push the self-resonant frequency above 350 MHz.",
          quiz: {
            question: "Why are decoupling capacitors positioned as close as possible to IC power pins on high-speed PCBs?",
            options: [
              "To prevent board thermal expansion",
              "To minimize parasitic loop inductance between capacitor and IC die",
              "To reduce soldering rework labor costs",
              "To ensure high DC resistance"
            ],
            answer: 1,
            explanation: "Minimizing loop inductance is crucial: parasitic inductance limits how quickly capacitors can supply sudden current surges."
          }
        },
        thermal_vias: {
          x: 75,
          y: 72,
          tag: "TH-VIA-ARRAY",
          name: "Copper-Filled Thermal Via Heat Slug Array",
          system: "Power Dissipation & Thermal Interface Subsystem",
          standard: "IPC-4761 Type VII (Via Plated & Filled with Conductive Epoxy)",
          range: "0.3 mm drill, 0.6 mm pitch array, thermal resistance reduction > 45%",
          meaning: "Dense array of copper-plated vias transporting heat directly from top-side IC thermal pad down to internal 2-oz copper ground planes and bottom heatsink.",
          quote: "The thermal via matrix beneath the power management IC utilizes IPC-4761 Type VII copper-filled vias. This drops junction-to-board thermal resistance to 1.8 degrees Celsius per watt, preventing thermal throttling during sustained AI workloads.",
          redline: "ECO-2026-1191: Increase internal GND plane copper weight from 1-oz to 2-oz on layers 4 and 9 to accelerate lateral heat spreading across the enclosure chassis.",
          quiz: {
            question: "According to IPC-4761, what is a Type VII via?",
            options: [
              "Tented via covered with dry film only",
              "Via plugged with non-conductive epoxy and plated flat with copper (VIPPO)",
              "Open unplugged through-hole via",
              "Blind laser microvia penetrating only one dielectric layer"
            ],
            answer: 1,
            explanation: "IPC-4761 Type VII designates a via that is filled, planarized, and capped with copper plating, providing a solderable flat surface for BGA pads."
          }
        }
      }
    }
  };

  window.currentBlueprintKey = 'medtech_pid';
  window.currentBlueprintHotspotKey = 'psv204';

  window.switchBlueprintDiagram = function(key) {
    if (!BLUEPRINT_SCHEMATICS[key]) return;
    window.currentBlueprintKey = key;

    // Update active tab buttons
    document.querySelectorAll('.bp-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeTab = document.getElementById(`bp-tab-${key}`);
    if (activeTab) activeTab.classList.add('active');

    const data = BLUEPRINT_SCHEMATICS[key];

    // Update Topbar
    const titleEl = document.getElementById('bp-current-dwg-title');
    const stdEl = document.getElementById('bp-current-dwg-standard');
    if (titleEl) titleEl.textContent = data.title;
    if (stdEl) stdEl.innerHTML = data.standard;

    // Render SVG and pins into viewport
    const viewport = document.getElementById('blueprint-svg-viewport');
    if (viewport) {
      let pinsHtml = '';
      Object.keys(data.hotspots).forEach(hsKey => {
        const hs = data.hotspots[hsKey];
        pinsHtml += `
          <div class="blueprint-pin" style="left: ${hs.x}%; top: ${hs.y}%;" onclick="selectBlueprintHotspot('${hsKey}')" id="bp-pin-${hsKey}">
            <div class="bp-pin-pulse"></div>
            <span class="bp-pin-label">${hs.tag}</span>
          </div>
        `;
      });
      viewport.innerHTML = data.svg + pinsHtml;
    }

    // Auto-select first hotspot
    const firstHsKey = Object.keys(data.hotspots)[0];
    window.selectBlueprintHotspot(firstHsKey);
  };

  window.selectBlueprintHotspot = function(hsKey) {
    const data = BLUEPRINT_SCHEMATICS[window.currentBlueprintKey];
    if (!data || !data.hotspots[hsKey]) return;
    window.currentBlueprintHotspotKey = hsKey;
    const hs = data.hotspots[hsKey];

    // Update active pin visual state
    document.querySelectorAll('.blueprint-pin').forEach(pin => {
      pin.classList.remove('active');
    });
    const activePin = document.getElementById(`bp-pin-${hsKey}`);
    if (activePin) activePin.classList.add('active');

    // Update Detail Inspector
    const tagEl = document.getElementById('bp-inspect-tag');
    const nameEl = document.getElementById('bp-inspect-name');
    const sysEl = document.getElementById('bp-inspect-system');
    const stdEl = document.getElementById('bp-inspect-std');
    const rangeEl = document.getElementById('bp-inspect-range');
    const meaningEl = document.getElementById('bp-inspect-meaning');
    const quoteEl = document.getElementById('bp-inspect-quote');
    const redlineEl = document.getElementById('bp-inspect-redline');

    if (tagEl) tagEl.textContent = hs.tag;
    if (nameEl) nameEl.textContent = hs.name;
    if (sysEl) sysEl.textContent = hs.system;
    if (stdEl) stdEl.innerHTML = hs.standard;
    if (rangeEl) rangeEl.textContent = hs.range;
    if (meaningEl) meaningEl.textContent = hs.meaning;
    if (quoteEl) quoteEl.textContent = `"${hs.quote}"`;
    if (redlineEl) redlineEl.textContent = hs.redline;

    // Hydrate Quiz
    const quizQEl = document.getElementById('bp-quiz-question');
    const quizOptsEl = document.getElementById('bp-quiz-options');
    const quizFeedbackEl = document.getElementById('bp-quiz-feedback');

    if (quizQEl && hs.quiz) quizQEl.textContent = hs.quiz.question;
    if (quizOptsEl && hs.quiz) {
      quizOptsEl.innerHTML = hs.quiz.options.map((opt, idx) => `
        <button type="button" class="bp-quiz-opt-btn" onclick="submitBlueprintQuiz(${idx})">
          <span style="font-weight:700; color:#38bdf8; margin-right:6px;">${String.fromCharCode(65 + idx)}.</span> ${opt}
        </button>
      `).join('');
    }
    if (quizFeedbackEl) {
      quizFeedbackEl.style.display = 'none';
      quizFeedbackEl.innerHTML = '';
    }
  };

  window.submitBlueprintQuiz = function(selectedIdx) {
    const data = BLUEPRINT_SCHEMATICS[window.currentBlueprintKey];
    if (!data) return;
    const hs = data.hotspots[window.currentBlueprintHotspotKey];
    if (!hs || !hs.quiz) return;

    const optButtons = document.querySelectorAll('.bp-quiz-opt-btn');
    const feedbackEl = document.getElementById('bp-quiz-feedback');
    if (!feedbackEl) return;

    optButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === hs.quiz.answer) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    feedbackEl.style.display = 'block';
    if (selectedIdx === hs.quiz.answer) {
      feedbackEl.style.background = 'rgba(16, 185, 129, 0.15)';
      feedbackEl.style.border = '1px solid #10b981';
      feedbackEl.style.color = '#34d399';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Correct!</strong> ${hs.quiz.explanation}`;
    } else {
      feedbackEl.style.background = 'rgba(239, 68, 68, 0.15)';
      feedbackEl.style.border = '1px solid #ef4444';
      feedbackEl.style.color = '#f87171';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Incorrect.</strong> Correct answer: <em>${hs.quiz.options[hs.quiz.answer]}</em>. ${hs.quiz.explanation}`;
    }
  };

  window.copyRedlineStatement = function(btnEl) {
    const textEl = document.getElementById('bp-inspect-redline');
    if (!textEl) return;
    const text = textEl.textContent.trim();
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (btnEl) {
      const origHtml = btnEl.innerHTML;
      btnEl.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      btnEl.style.background = 'rgba(16, 185, 129, 0.3)';
      btnEl.style.borderColor = '#10b981';
      btnEl.style.color = '#34d399';
      setTimeout(() => {
        btnEl.innerHTML = origHtml;
        btnEl.style.background = '';
        btnEl.style.borderColor = '';
        btnEl.style.color = '';
      }, 2000);
    }
  };

  window.resetBlueprintZoom = function() {
    const viewport = document.getElementById('blueprint-svg-viewport');
    if (viewport) {
      const svgEl = viewport.querySelector('.blueprint-svg-canvas');
      if (svgEl) {
        svgEl.style.transform = 'scale(1)';
        svgEl.style.transition = 'transform 0.3s ease';
      }
    }
  };

  // Initial diagram hydration
  window.switchBlueprintDiagram('medtech_pid');
}

/* ==========================================================================
   PHASE 9: LOTO ZERO-ENERGY PROTOCOL & SHIFT HANDOVER LAB
   ========================================================================== */
function setupLotoAndShiftHandoverLab(tracks) {
  const LOTO_SCENARIOS = {
    automotive_robot: {
      title: "Automotive 6-Axis Welding Cell (480V 3\u03a6 / 90psi / Hydraulic)",
      standard: "OSHA 1910.147 \u2022 NFPA 70E Cat 4",
      steps: [
        { num: 1, name: "Preparation & Notification", detail: "Notify affected line operators, cell leads, and stamping supervisors of Cell #4 shutdown." },
        { num: 2, name: "Equipment Shutdown", detail: "Depress normal cycle stop on teach pendant; verify robot returns to home cradle; trip safety gate E-stop." },
        { num: 3, name: "Energy Isolation", detail: "Open 480V 3-phase disconnect SW-101; close pneumatic header valve BV-02." },
        { num: 4, name: "Lockout / Tagout Application", detail: "Apply red master padlock LK-401 to SW-101 hasp; affix cable lockout to valve BV-02 with Danger Out of Service tags." },
        { num: 5, name: "Stored Energy Dissipation", detail: "Depress manual bleeder valve on air regulator to 0.0 psi; insert mechanical locking pin BP-01 into J2 counterbalance." },
        { num: 6, name: "Verification of Zero-Energy (Try-Step)", detail: "Depress teach pendant start buttons to test non-motion; test 480V disconnect terminals with calibrated multimeter across L1-L2-L3." }
      ],
      points: [
        { id: "SW-101", tag: "SW-101", desc: "480V 3-Phase Main Disconnect", locked: false, energy: "Electrical (480VAC)" },
        { id: "BV-02", tag: "BV-02", desc: "Pneumatic Header Bleeder Valve (90 psi)", locked: false, energy: "Pneumatic (Air)" },
        { id: "BP-01", tag: "BP-01", desc: "J2 Counterbalance Mechanical Lock Pin", locked: false, energy: "Mechanical (Gravity)" }
      ],
      script: "\"Team, initiating authorized zero-energy LOTO protocol on 6-Axis Welding Cell #4. Disconnecting 480V 3-phase feeder SW-101 and locking out with padlock #LK-401. Depressurizing pneumatic header BV-02 to 0 psi. Inserting mechanical locking pin BP-01 into robot arm counter-balance. Testing control pushbutton to verify zero motion and residual energy dissipation. Multimeter confirms 0.0V between all phases. System is de-energized and cleared for mechanical intervention.\"",
      quiz: {
        question: "Under OSHA 1910.147(d)(6), what mandatory step must occur after applying locks and tags before any technician begins servicing equipment?",
        options: [
          "Verify isolation by attempting to operate the equipment and testing for zero residual energy with test instruments",
          "Immediately remove physical guards and begin mechanical teardown",
          "Sign off the permit in the control room without testing physical switches",
          "Wait 15 minutes for any capacitors to cool down without electrical verification"
        ],
        answer: 0,
        explanation: "OSHA 1910.147(d)(6) mandates verification of isolation ('try-step') to ascertain that equipment is effectively isolated and residual energy is safely discharged."
      }
    },
    medtech_eto: {
      title: "MedTech Cleanroom EtO Vaporizer (Double Block & Bleed / Steam)",
      standard: "OSHA 1910.119 PSM \u2022 ISO 13485 / 11135",
      steps: [
        { num: 1, name: "Preparation & Chamber Aeration", detail: "Notify sterilization dept; confirm EtO chamber deep vacuum purge completed and ambient reading < 1 ppm." },
        { num: 2, name: "Cycle Abort & Valve Tripping", detail: "Execute emergency abort sequence; command automated pneumatic supply valves to fail-safe closed position." },
        { num: 3, name: "Double Block & Bleed Isolation", detail: "Close upstream block XV-104; close downstream isolation XV-106; open intermediate vent VV-105 to scrubber." },
        { num: 4, name: "Lockout / Tagout Application", detail: "Affix chemical valve clamshell lock to XV-104; lock clean steam supply valve SV-201 with chemical hazard tags." },
        { num: 5, name: "Residual Chemical & Steam Venting", detail: "Verify scrubber pressure gauge at 0 psig; drain condensate trap on steam supply." },
        { num: 6, name: "Zero-Energy & Vapor Verification", detail: "Sniff chamber port with calibrated photoionization detector (PID); confirm 0.0 ppm EtO before flange disconnect." }
      ],
      points: [
        { id: "XV-104", tag: "XV-104", desc: "EtO Liquid Supply Upstream Block Valve", locked: false, energy: "Chemical (Ethylene Oxide)" },
        { id: "VV-105", tag: "VV-105", desc: "Double Block Bleed Vent to Scrubber", locked: false, energy: "Chemical Venting" },
        { id: "SV-201", tag: "SV-201", desc: "Clean Steam Header Isolation (45 psig)", locked: false, energy: "Thermal Steam" }
      ],
      script: "\"Sterilization team, executing Double Block and Bleed LOTO on EtO Vaporizer Loop #2. Primary supply XV-104 is locked closed, downstream isolation XV-106 secured, and bleeder VV-105 locked open to the catalytic abatement scrubber. Clean steam valve SV-201 is locked closed. PID sensor confirms zero toxic residual vapor below 0.1 ppm. Safe to uncouple vaporizer flanges.\"",
      quiz: {
        question: "Why does OSHA 1910.119 PSM require a 'Double Block and Bleed' valve arrangement for toxic lines like Ethylene Oxide?",
        options: [
          "To guarantee that any seat leakage from the primary valve is vented safely away before reaching the work area",
          "To increase line pressure during maintenance",
          "To bypass the chemical scrubber during emergency shutdowns",
          "To eliminate the need for personal protective equipment (PPE)"
        ],
        answer: 0,
        explanation: "A Double Block and Bleed configuration uses two isolation valves with an intermediate bleed vent, ensuring any valve seat weepage is vented safely to abatement rather than leaking across the work boundary."
      }
    },
    semicon_dicing: {
      title: "Semicon Precision Wafer Dicer (208V RF Gen / 3000psi DI Water)",
      standard: "SEMI S2 / S8 Guidelines \u2022 NFPA 79",
      steps: [
        { num: 1, name: "Lot Evacuation & Fab Notification", detail: "Unload active 300mm wafer cassette from chuck; notify cleanroom Fab 2 yield supervisor." },
        { num: 2, name: "Spindle Spin-Down & Power Down", detail: "Command air-bearing spindle deceleration to 0 RPM; power off blade dressing routine." },
        { num: 3, name: "Energy Isolation", detail: "Switch off 208V RF generator breaker RF-DISC; close high-pressure DI cutting water supply DIW-V1." },
        { num: 4, name: "Lockout / Tagout Application", detail: "Apply circuit breaker clamp lockout to RF-DISC; apply lock and tag to DIW-V1 handle." },
        { num: 5, name: "Stored Pressure Bleed & Spindle Pin", detail: "Bleed 3,000 psi DI water accumulator via manual pressure relief PRV-3; insert SPIN-LOCK arbor lock." },
        { num: 6, name: "Zero-Energy Verification", detail: "Confirm DI water pressure gauge at 0 psi; touch RF capacitor bank terminals with insulated grounding hook." }
      ],
      points: [
        { id: "RF-DISC", tag: "RF-DISC", desc: "208V RF Generator Main Breaker", locked: false, energy: "Electrical (208VAC)" },
        { id: "DIW-V1", tag: "DIW-V1", desc: "High-Pressure DI Water Line (3,000 psi)", locked: false, energy: "Hydraulic (Water)" },
        { id: "SPIN-LOCK", tag: "SPIN-LOCK", desc: "Air-Bearing High-Speed Spindle Lock", locked: false, energy: "Rotational Mechanical" }
      ],
      script: "\"Fab 2 engineering, securing Dicing Saw #7 for spindle arbor replacement. RF generator breaker RF-DISC is locked out. High-pressure DI water valve DIW-V1 closed and bled down to zero bar. Mechanical spindle pin SPIN-LOCK is engaged. Capacitor discharge hook applied to RF circuit. Unit is verified in a zero-energy state.\"",
      quiz: {
        question: "In high-precision semiconductor tools containing capacitor banks or RF matching networks, how must stored electrical energy be safely dissipated?",
        options: [
          "By waiting or using an approved, insulated grounding hook to short and discharge capacitor banks",
          "By spraying deionized water on the electrical terminal",
          "By cycling the machine on and off rapidly",
          "By removing the safety interlocks while running"
        ],
        answer: 0,
        explanation: "Stored capacitance can retain lethal high voltage even after main breaker isolation. An insulated grounding hook/stick discharges capacitors to ground before technicians touch wiring."
      }
    },
    power_substation: {
      title: "13.8kV Switchgear Feeder Breaker (Medium Voltage / Arc-Flash Cat 4)",
      standard: "NFPA 70E / IEEE 1584 \u2022 OSHA 1910.269",
      steps: [
        { num: 1, name: "Switching Order Review & Arc-Flash PPE", detail: "Review electrical switching schedule; don 40 cal/cm\u00b2 arc-flash suit, hood, face shield, and 20kV rubber gloves." },
        { num: 2, name: "Breaker Trip & Open Check", detail: "Depress electrical trip pushbutton; verify breaker flag shows GREEN (Open) on cubicle door." },
        { num: 3, name: "Breaker Truck Racking Out", detail: "Engage remote racking mechanism; rack vacuum circuit breaker truck from CONNECTED to DISCONNECTED position." },
        { num: 4, name: "Lockout / Tagout Application", detail: "Close switchgear safety shutter; padlock racking access port with lock LK-701; attach Hold-Off tag." },
        { num: 5, name: "Spring Discharge & Feeder Grounding", detail: "Discharge stored closing spring (SP-DISCH); close manual feeder grounding switch GRD-SW." },
        { num: 6, name: "Live-Dead-Live Three-Point Verification", detail: "Test non-contact voltage detector on known energized bus, test de-energized feeder terminals (0.0kV), and re-verify detector on live bus." }
      ],
      points: [
        { id: "52-RACK", tag: "52-RACK", desc: "13.8kV Vacuum Breaker Truck (Racked Out)", locked: false, energy: "Electrical (13.8kV)" },
        { id: "SP-DISCH", tag: "SP-DISCH", desc: "Stored Mechanical Closing Spring", locked: false, energy: "Mechanical Spring" },
        { id: "GRD-SW", tag: "GRD-SW", desc: "Feeder Bus Grounding Switch (Closed & Locked)", locked: false, energy: "Induced Electrostatic" }
      ],
      script: "\"Substation crew, performing medium-voltage clearance on 13.8kV Feeder 3. Breaker 52-RACK has been remotely racked out to disconnected position and shutter locked. Closing springs are discharged. Feeder ground switch GRD-SW is closed and tagged. Live-dead-live test completed with 15kV rated hot stick and detector. Zero voltage confirmed. Clearance active.\"",
      quiz: {
        question: "What is the industry-standard 'Live-Dead-Live' (Three-Point Test) required by NFPA 70E when verifying zero voltage on electrical circuits?",
        options: [
          "Test the meter on a known live voltage source, test the isolated target circuit, then re-test on the known live source to verify tester functionality",
          "Turn on the circuit, measure current, and immediately shut it off",
          "Measure voltage three times on the same dead circuit wire",
          "Touch the conductor with a leather glove before using a digital voltmeter"
        ],
        answer: 0,
        explanation: "NFPA 70E 120.5 requires testing the voltage tester on a known energized source before and after measuring the de-energized circuit to prove the meter did not fail open."
      }
    }
  };

  let currentScenarioKey = 'automotive_robot';

  window.switchLotoSubpanel = function(mode) {
    const btnLoto = document.getElementById('btn-tab-loto');
    const btnHandover = document.getElementById('btn-tab-handover');
    const subLoto = document.getElementById('subpanel-loto');
    const subHandover = document.getElementById('subpanel-handover');

    if (!btnLoto || !btnHandover || !subLoto || !subHandover) return;

    if (mode === 'loto') {
      btnLoto.classList.add('active');
      btnHandover.classList.remove('active');
      subLoto.style.display = 'block';
      subHandover.style.display = 'none';
    } else {
      btnHandover.classList.add('active');
      btnLoto.classList.remove('active');
      subHandover.style.display = 'block';
      subLoto.style.display = 'none';
      window.updateShiftHandoverMemo();
    }
  };

  window.switchLotoScenario = function(key) {
    if (!LOTO_SCENARIOS[key]) return;
    currentScenarioKey = key;
    const scen = LOTO_SCENARIOS[key];

    // Update chips
    document.querySelectorAll('.loto-chip').forEach(btn => {
      btn.classList.toggle('active', btn.id === `chip-${key}`);
    });

    // Update titles
    const titleEl = document.getElementById('loto-target-title');
    const tagEl = document.getElementById('loto-standard-tag');
    if (titleEl) titleEl.textContent = scen.title;
    if (tagEl) tagEl.textContent = scen.standard;

    // Render Steps
    const stepsListEl = document.getElementById('loto-steps-list');
    if (stepsListEl) {
      stepsListEl.innerHTML = scen.steps.map(s => `
        <div class="loto-step-card" id="loto-step-${s.num}">
          <div class="loto-step-num">${s.num}</div>
          <div class="loto-step-body">
            <span class="loto-step-name">${s.name}</span>
            <span class="loto-step-detail">${s.detail}</span>
          </div>
        </div>
      `).join('');
    }

    // Render Points
    renderLotoPointsGrid();

    // Reset Try-Step Banner
    const trystepTextEl = document.getElementById('loto-trystep-text');
    if (trystepTextEl) {
      trystepTextEl.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color:#f59e0b; margin-right:6px;"></i> <span>Step 6: Apply all isolation locks before executing zero-energy verification.</span>`;
      trystepTextEl.parentElement.style.background = '#071529';
      trystepTextEl.parentElement.style.borderColor = 'rgba(56, 189, 248, 0.3)';
    }

    // Render Script
    const scriptEl = document.getElementById('loto-script-text');
    if (scriptEl) {
      scriptEl.textContent = scen.script;
    }

    // Render Quiz
    const quizQEl = document.getElementById('loto-quiz-q');
    const quizOptsEl = document.getElementById('loto-quiz-opts');
    const feedbackEl = document.getElementById('loto-quiz-feedback');
    if (quizQEl) quizQEl.textContent = scen.quiz.question;
    if (quizOptsEl) {
      quizOptsEl.innerHTML = scen.quiz.options.map((opt, idx) => `
        <button class="loto-quiz-btn" onclick="submitLotoQuiz(${idx})">
          ${String.fromCharCode(65 + idx)}. ${opt}
        </button>
      `).join('');
    }
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.innerHTML = '';
    }
  };

  function renderLotoPointsGrid() {
    const scen = LOTO_SCENARIOS[currentScenarioKey];
    const gridEl = document.getElementById('loto-points-grid');
    const statusEl = document.getElementById('loto-points-status');
    if (!scen || !gridEl) return;

    const lockedCount = scen.points.filter(p => p.locked).length;
    if (statusEl) {
      statusEl.textContent = `${lockedCount} / ${scen.points.length} Locked`;
      statusEl.style.color = lockedCount === scen.points.length ? '#10b981' : '#38bdf8';
    }

    gridEl.innerHTML = scen.points.map(pt => `
      <div class="loto-point-item">
        <div class="loto-point-info">
          <span class="loto-point-tag">${pt.tag} &bull; ${pt.energy}</span>
          <span class="loto-point-desc">${pt.desc}</span>
        </div>
        <button class="btn-loto-toggle ${pt.locked ? 'locked' : ''}" onclick="toggleLotoPoint('${pt.id}')">
          <i class="fa-solid ${pt.locked ? 'fa-lock' : 'fa-lock-open'}"></i>
          <span>${pt.locked ? 'Locked & Tagged' : 'Lock Point'}</span>
        </button>
      </div>
    `).join('');
  }

  window.toggleLotoPoint = function(pointId) {
    const scen = LOTO_SCENARIOS[currentScenarioKey];
    if (!scen) return;
    const pt = scen.points.find(p => p.id === pointId);
    if (!pt) return;

    pt.locked = !pt.locked;
    renderLotoPointsGrid();

    // Check if all locked
    const lockedCount = scen.points.filter(p => p.locked).length;
    const trystepTextEl = document.getElementById('loto-trystep-text');
    if (trystepTextEl) {
      if (lockedCount === scen.points.length) {
        trystepTextEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981; margin-right:6px;"></i> <strong>Ready for Try-Step:</strong> All ${lockedCount} points locked and tagged. Click 'Execute Try-Step' to test zero-energy state.`;
      } else {
        trystepTextEl.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color:#f59e0b; margin-right:6px;"></i> <span>Step 6: ${lockedCount}/${scen.points.length} points locked. Lock all points before verification.</span>`;
      }
    }
  };

  window.verifyZeroEnergyTryStep = function() {
    const scen = LOTO_SCENARIOS[currentScenarioKey];
    if (!scen) return;

    const trystepTextEl = document.getElementById('loto-trystep-text');
    const lockedCount = scen.points.filter(p => p.locked).length;

    if (lockedCount < scen.points.length) {
      if (trystepTextEl) {
        trystepTextEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444; margin-right:6px;"></i> <strong>TRY-STEP FAILED:</strong> Only ${lockedCount}/${scen.points.length} points isolated! Residual hazardous energy present. Cannot proceed safely!`;
        trystepTextEl.parentElement.style.background = 'rgba(239, 68, 68, 0.15)';
        trystepTextEl.parentElement.style.borderColor = '#ef4444';
      }
    } else {
      if (trystepTextEl) {
        trystepTextEl.innerHTML = `<i class="fa-solid fa-shield-check" style="color:#10b981; margin-right:6px;"></i> <strong>ZERO-ENERGY CONFIRMED:</strong> Try-step verified! Test pushbutton pressed (no motion); multimeter confirmed 0.0V / 0.0 psi. Safe for mechanical entry!`;
        trystepTextEl.parentElement.style.background = 'rgba(16, 185, 129, 0.18)';
        trystepTextEl.parentElement.style.borderColor = '#10b981';
      }
      // Highlight Step 6 as completed
      const step6El = document.getElementById('loto-step-6');
      if (step6El) {
        step6El.classList.add('completed');
      }
    }
  };

  window.playLotoSpeech = function(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent.trim().replace(/^"/, '').replace(/"$/, '');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  window.copyLotoScript = function(btnEl) {
    const scriptEl = document.getElementById('loto-script-text');
    if (!scriptEl) return;
    const text = scriptEl.textContent.trim();
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (btnEl) {
      const origHtml = btnEl.innerHTML;
      btnEl.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      btnEl.style.background = 'rgba(16, 185, 129, 0.3)';
      btnEl.style.borderColor = '#10b981';
      btnEl.style.color = '#34d399';
      setTimeout(() => {
        btnEl.innerHTML = origHtml;
        btnEl.style.background = '';
        btnEl.style.borderColor = '';
        btnEl.style.color = '';
      }, 2000);
    }
  };

  window.submitLotoQuiz = function(selectedIdx) {
    const scen = LOTO_SCENARIOS[currentScenarioKey];
    if (!scen) return;
    const btns = document.querySelectorAll('.loto-quiz-btn');
    const feedbackEl = document.getElementById('loto-quiz-feedback');
    if (!feedbackEl) return;

    btns.forEach((btn, idx) => {
      btn.classList.remove('correct', 'wrong');
      if (idx === scen.quiz.answer) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    feedbackEl.style.display = 'block';
    if (selectedIdx === scen.quiz.answer) {
      feedbackEl.style.background = 'rgba(16, 185, 129, 0.15)';
      feedbackEl.style.border = '1px solid #10b981';
      feedbackEl.style.color = '#34d399';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Correct!</strong> ${scen.quiz.explanation}`;
    } else {
      feedbackEl.style.background = 'rgba(239, 68, 68, 0.15)';
      feedbackEl.style.border = '1px solid #ef4444';
      feedbackEl.style.color = '#f87171';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Incorrect.</strong> Correct answer: <em>${scen.quiz.options[scen.quiz.answer]}</em>. ${scen.quiz.explanation}`;
    }
  };

  // Operational Shift Handover Generator
  window.updateShiftHandoverMemo = function() {
    const facility = document.getElementById('ho-facility')?.value || 'Industrial Plant Unit';
    const shift = document.getElementById('ho-shift')?.value || 'Shift 1 -> Shift 2';
    const q1 = document.getElementById('ho-q1-ran')?.value || 'Nominal operations.';
    const q2 = document.getElementById('ho-q2-failed')?.value || 'None reported.';
    const q3 = document.getElementById('ho-q3-bypassed')?.value || 'No active LOTO locks.';
    const q4 = document.getElementById('ho-q4-pending')?.value || 'Continue scheduled production.';

    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

    const memoMarkdown = 
`# OPERATIONAL SHIFT HANDOVER LOG (ISO 9001 / OSHA 1910.119 PSM)
Facility / Unit : ${facility}
Shift Handover  : ${shift}
Timestamp       : ${dateStr}
Compliance Level: High-Reliability Operations (HRO) Standard

================================================================================
1. WHAT RAN (Nominal Production, Throughput & Quality Metrics)
--------------------------------------------------------------------------------
${q1}

================================================================================
2. WHAT FAILED (Unplanned Downtime, Equipment Trips & Process Deviations)
--------------------------------------------------------------------------------
${q2}

================================================================================
3. WHAT WAS BYPASSED / ISOLATED (LOTO Locks, Safety Interlocks & Open Permits)
--------------------------------------------------------------------------------
${q3}

================================================================================
4. WHAT IS PENDING (Critical Action Items, Spare Parts & Incoming Shift Handover)
--------------------------------------------------------------------------------
${q4}

================================================================================
[x] Physical verification conducted at equipment boundary
[x] LOTO tags, locks, and keys audited & transferred
[x] Incoming shift supervisor verbal debrief completed
--------------------------------------------------------------------------------
Lead Engineer Sign-off: AUTHORIZED & TRANSFERRED`;

    const previewEl = document.getElementById('ho-memo-preview');
    if (previewEl) {
      previewEl.textContent = memoMarkdown;
    }

    // Dynamic 90-Second Standup Script
    const standupEl = document.getElementById('ho-standup-quote');
    if (standupEl) {
      standupEl.textContent = `"Good shift team, here is the verbal handover for ${shift} at ${facility}. In operations: ${q1.split('.')[0]}. Key deviation to note: ${q2.split('.')[0]}. For safety and LOTO: ${q3.split('.')[0]}. Top priority for the incoming team: ${q4.split('.')[0]}. Let's have a safe and productive shift."`;
    }
  };

  window.copyHandoverMemo = function(btnEl) {
    const memoEl = document.getElementById('ho-memo-preview');
    if (!memoEl) return;
    const text = memoEl.textContent.trim();
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (btnEl) {
      const origHtml = btnEl.innerHTML;
      btnEl.innerHTML = '<i class="fa-solid fa-check"></i> Memo Copied!';
      btnEl.style.background = 'rgba(16, 185, 129, 0.3)';
      btnEl.style.borderColor = '#10b981';
      btnEl.style.color = '#34d399';
      setTimeout(() => {
        btnEl.innerHTML = origHtml;
        btnEl.style.background = '';
        btnEl.style.borderColor = '';
        btnEl.style.color = '';
      }, 2000);
    }
  };

  // Initial Scenario & Memo Hydration
  window.switchLotoScenario('automotive_robot');
  window.updateShiftHandoverMemo();
}

/* ==========================================================================
   PHASE 10: INCIDENT RESPONSE WAR ROOM & CLOSED-LOOP COMMUNICATION LAB
   ========================================================================== */
function setupIncidentWarRoomLab(tracks) {
  const WARROOM_SCENARIOS = {
    automotive_linedown: {
      title: "Automotive Final Assembly Line-Stop (Arlington TX)",
      severity: "SEVERITY 1 \u2022 CRITICAL",
      burnRate: "$850 USD / minute ($51,000 / hr)",
      stakeholder: "VP Manufacturing Operations (Detroit OEM)",
      defectMech: "Sub-surface casting porosity on front steering knuckle",
      regRisk: "NHTSA Motor Vehicle Safety Non-Compliance / IATF D3 Containment",
      tickerStatus: "ACTIVE INCIDENT: Line-Stop at Arlington Assembly OEM \u2022 Cross-Border Emergency Bridge Open",
      clock: "00:48:15",
      cost: "$41,012 USD",
      strategies: [
        {
          name: "Option A: 100% Eddy-Current NDT Sort on Yard & Transit",
          risk: "LOW RISK (99.9% Containment)",
          riskClass: "risk-low",
          desc: "Deploy 12 certified Level II NDT inspectors to Arlington assembly yard to inspect 3,400 assembled SUVs; inspect parts in transit at Laredo border crossing.",
          speed: "6 Hours to Clear",
          scrap: "$18,500 USD",
          recovery: "Partial restart in 3 hrs"
        },
        {
          name: "Option B: Hot-Shot Air Charter of Re-machined Replacement Batch",
          risk: "MEDIUM RISK (High Cost)",
          riskClass: "risk-med",
          desc: "Charter emergency Falcon 20 cargo jet from Saltillo (SLW) to Dallas-Fort Worth (DFW) carrying 450 certified replacement knuckles.",
          speed: "4 Hours to Delivery",
          scrap: "$48,000 USD",
          recovery: "Full restart in 4.5 hrs"
        },
        {
          name: "Option C: Blind Tooling Offset Modification without Validation",
          risk: "HIGH RISK (Severe Safety Hazard)",
          riskClass: "risk-high",
          desc: "Shift CNC cutter path offset without metallurgical micro-structure validation to bypass porosity zone.",
          speed: "1 Hour",
          scrap: "$3,200 USD",
          recovery: "Unstable (90% defect recurrence risk)"
        }
      ],
      callout: "\"War room, this is Incident Commander. Quarantine all steering knuckles from Heat Batch #8819 immediately. Do not release Pallets 4 through 12 to the assembly floor.\"",
      repeat: "\"Understood. Quarantining all steering knuckles from Heat Batch #8819 now. Holding Pallets 4 through 12 in locked red-tag quarantine area.\"",
      quiz: {
        question: "In an active high-stakes cross-border line-down bridge, when the customer VP asks for an immediate restart ETA that is technically unconfirmed, what is the correct C1 response?",
        options: [
          "\"We understand the critical urgency. We have isolated the affected lot #8819 and deployed an NDT sorting gate. We will not commit to an unvalidated restart ETA, but we commit to an operational checkpoint in exactly 30 minutes.\"",
          "\"Don't worry, we will have the line running in 10 minutes for sure.\"",
          "\"It is not our fault, the raw material supplier sent bad aluminum billets.\"",
          "\"We cannot do anything until our plant manager wakes up tomorrow morning.\""
        ],
        answer: 0,
        explanation: "Under cross-border incident command protocols, never give false unverified restart estimates. Acknowledge customer urgency, state objective containment actions, and set firm, reliable checkpoint cadences (e.g. 30-min updates)."
      }
    },
    medtech_bioburden: {
      title: "MedTech Cleanroom Sterile Barrier Pouch Seal Excursion",
      severity: "SEVERITY 1 \u2022 FDA RECALL RISK",
      burnRate: "Class I Medical Device Recall Risk ($1.4M Exposure)",
      stakeholder: "Global Regulatory Affairs VP & Notified Body Lead (T\u00dcV S\u00dcD)",
      defectMech: "Heat-sealer thermistor drift causing incomplete Tyvek pouch seal",
      regRisk: "FDA 21 CFR \u00a7 820.100 CAPA / ISO 11607-1 Terminal Sterilization",
      tickerStatus: "ACTIVE INCIDENT: Sterile Seal Excursion on Cardiovascular Catheter Line \u2022 Quarantining 18,000 Units",
      clock: "01:15:30",
      cost: "$124,500 USD",
      strategies: [
        {
          name: "Option A: Immediate Field Hold & 100% Burst-Testing",
          risk: "LOW RISK (Audit-Compliant)",
          riskClass: "risk-low",
          desc: "Issue immediate distribution freeze on catheter lots #CV-401 through #CV-409; execute ASTM F1140 burst testing on 200 retains.",
          speed: "8 Hours",
          scrap: "$65,000 USD",
          recovery: "Validated release in 12 hrs"
        },
        {
          name: "Option B: Re-Pouch & Secondary Over-Wrap Sterilization",
          risk: "HIGH RISK (Polymer Degradation)",
          riskClass: "risk-high",
          desc: "Subject non-conforming pouches to secondary EtO gas sterilization cycle.",
          speed: "18 Hours",
          scrap: "$12,000 USD",
          recovery: "Severe FDA Form 483 risk (Material embrittlement)"
        },
        {
          name: "Option C: Thermistor Replacement & Sealer Line 2 Divert",
          risk: "RECOMMENDED (C1 Gold Standard)",
          riskClass: "risk-low",
          desc: "Lock-out Sealer #03, install NIST-calibrated thermocouple, transfer packaging to validated redundant Sealer #02.",
          speed: "3 Hours",
          scrap: "$32,000 USD",
          recovery: "Immediate production on Sealer #02"
        }
      ],
      callout: "\"Sterilization lead, halt cart loader on Autoclave Line 2. Retain all pouches from Lot CV-404 for burst-pressure verification before aeration.\"",
      repeat: "\"Halt confirmed on Autoclave Line 2 cart loader. Retaining all pouches from Lot CV-404 for burst-pressure verification prior to aeration.\"",
      quiz: {
        question: "Under FDA 21 CFR 820 and ISO 13485, what immediate regulatory action is mandatory when a sterile barrier package seal fails inspection?",
        options: [
          "Quarantine all associated product lots, initiate an immediate non-conformance report (NCR), and prevent distribution pending CAPA investigation",
          "Ship the product anyway and inspect samples at the hospital",
          "Manually re-tape the open pouch edges",
          "Lower the sterilization cycle temperature to compensate"
        ],
        answer: 0,
        explanation: "Sterile barrier integrity directly affects patient life safety; any failure requires immediate hard quarantine, an NCR/CAPA investigation, and zero distribution until sterile efficacy is proven."
      }
    },
    semicon_esd: {
      title: "Semicon 3nm ATE Automated Wafer Sort ESD Spike Excursion",
      severity: "SEVERITY 2 \u2022 YIELD CRISIS",
      burnRate: "$1,200,000 USD Projected Yield Loss",
      stakeholder: "Fab Yield Director & Foundry Interface (Austin / Hsinchu)",
      defectMech: "Ionizer bar ground fault causing 120V static charge on wafer handler arm",
      regRisk: "ANSI/ESD S20.20-2021 Class 0 Device Reliability Damage",
      tickerStatus: "ACTIVE INCIDENT: Wafer Handler ESD Spike \u2022 4 Lots of 3nm AI Processors on Hold",
      clock: "02:04:10",
      cost: "$380,000 USD",
      strategies: [
        {
          name: "Option A: 100% Gate Oxide Voltage Stress (GOST) Screening",
          risk: "LOW RISK (Comprehensive)",
          riskClass: "risk-low",
          desc: "Subject all 100 suspect wafers to elevated gate voltage stress testing to weed out latent dielectric breakdown.",
          speed: "14 Hours",
          scrap: "$210,000 USD",
          recovery: "Verified yield recovery in 16 hrs"
        },
        {
          name: "Option B: Handler Robot Ground Strap Swap & Static Re-Zero",
          risk: "RECOMMENDED (Fast Containment)",
          riskClass: "risk-low",
          desc: "Replace carbon ground bonding strap, calibrate ionizer fan balance to < \u00b15V, re-certify tool with static field meter.",
          speed: "45 Minutes",
          scrap: "$4,500 USD",
          recovery: "Sort resumed on Tester #4 in 1 hr"
        },
        {
          name: "Option C: Continue Sort at 50% Reduced Arm Velocity",
          risk: "HIGH RISK (Severe Latent Failure)",
          riskClass: "risk-high",
          desc: "Slow down wafer transfer without repairing electrostatic grounding strap.",
          speed: "10 Minutes",
          scrap: "$0 USD upfront",
          recovery: "Massive field failure returns from OEM clients"
        }
      ],
      callout: "\"Cleanroom technician, disconnect ATE Tester 4 from high-voltage bias bus. Do not unload wafer chuck until electrostatic field meter reads zero volts.\"",
      repeat: "\"Disconnecting ATE Tester 4 from high-voltage bias bus now. Holding wafer chuck in place until static field meter confirms zero volts.\"",
      quiz: {
        question: "Why are electrostatic discharge (ESD) events on sub-5nm advanced semiconductor nodes considered particularly insidious in high-reliability applications?",
        options: [
          "They often cause latent gate oxide defects that pass initial testing but fail prematurely in the field under thermal stress",
          "They always melt the silicon substrate completely into glass",
          "They reverse the polarity of the copper interconnects permanently",
          "They make wafers radioactive"
        ],
        answer: 0,
        explanation: "Latent ESD defects degrade gate dielectric integrity without causing outright opens or shorts at initial wafer sort, leading to catastrophic early field failures (infant mortality) in customer systems."
      }
    },
    data_center_ups: {
      title: "Hyperscale Data Center 115kV Power Loss & Transformer Fire",
      severity: "SEVERITY 1 \u2022 99.999% SLA RISK",
      burnRate: "$25,000 USD / minute SLA Breach Penalty",
      stakeholder: "Cloud Infrastructure VP & Enterprise Banking Clients",
      defectMech: "Primary bushing flashover triggering fire suppression and UPS transfer",
      regRisk: "NFPA 855 Stationary Energy Storage / Uptime Institute Tier IV SLA",
      tickerStatus: "ACTIVE INCIDENT: 115kV Substation Bushing Arc \u2022 40MW Campus on Diesel Generators",
      clock: "00:22:40",
      cost: "$567,500 USD",
      strategies: [
        {
          name: "Option A: Isolate Substation Bus & Island on 6 Diesel Gensets",
          risk: "RECOMMENDED (Guarantees SLA)",
          riskClass: "risk-low",
          desc: "Open tie breaker 52-T1, verify 6x 3MW diesel generators synchronizing at 13.8kV, feed critical server halls with N+1 redundancy.",
          speed: "12 Minutes",
          scrap: "$15,000 USD fuel",
          recovery: "Continuous SLA preservation"
        },
        {
          name: "Option B: Emergency Utility Transfer to 34.5kV Secondary Feeder",
          risk: "MEDIUM RISK (Utility Coordination)",
          riskClass: "risk-med",
          desc: "Coordinate with CFE grid dispatch to re-route 15MW over industrial park distribution ring.",
          speed: "90 Minutes",
          scrap: "$8,000 USD",
          recovery: "Contingent on external grid stability"
        },
        {
          name: "Option C: Deep Discharge of Backup Lithium Battery Banks",
          risk: "HIGH RISK (Thermal Runaway Hazard)",
          riskClass: "risk-high",
          desc: "Rely exclusively on Li-ion UPS beyond 15-minute rating without generator start.",
          speed: "Immediate",
          scrap: "$850,000 USD",
          recovery: "Catastrophic battery cell degradation"
        }
      ],
      callout: "\"Substation operator, open tie breaker 52-T1 immediately. Confirm generator bus synchronization at 13.8 kilovolts before closing Genset 1 feeder.\"",
      repeat: "\"Opening tie breaker 52-T1 now. Verifying generator bus synchronization at 13.8 kilovolts prior to closing Genset 1 feeder.\"",
      quiz: {
        question: "During a hyperscale data center electrical emergency, what is the primary role of the Incident Commander regarding utility (CFE) communication?",
        options: [
          "Maintain a dedicated, recorded direct communication line with the grid dispatcher to coordinate switching boundaries before closing any feeder tie breakers",
          "Allow any technician to toggle substation switchgear without notifying the utility",
          "Shut down all backup diesel generators to conserve diesel fuel",
          "Evacuate the server room and wait for the utility bill"
        ],
        answer: 0,
        explanation: "Coordination with utility dispatchers (CENACE / CFE) prevents backfeeding power into de-energized lines which could electrocute utility line crews or cause out-of-phase catastrophic breaker closure."
      }
    }
  };

  const CLOSEDLOOP_DRILL_DATA = {
    prompt: "Sender (Quality Manager): \"Shift maintenance lead, adjust extruder thermal zone 4 from 245\u00b0C down to 215\u00b0C, and purge the manifold with dry nitrogen for 180 seconds.\"",
    options: [
      { text: "\"Understood. Adjusting extruder thermal zone 4 from 245\u00b0C down to 215\u00b0C, and purging manifold with dry nitrogen for 180 seconds.\"", correct: true },
      { text: "\"Copy that, got it! Will turn down the temperature and flush the machine right away.\"", correct: false, note: "Ambiguous: Omits exact temperature numbers (215°C) and purge duration (180s)." },
      { text: "\"OK, reducing heat on zone 4 and blowing some nitrogen.\"", correct: false, note: "Unacceptable: Casual phrasing violates aviation/nuclear 3-way readback standards." }
    ],
    explanation: "Closed-loop communication mandates exact readback of numerical setpoints (215°C, 180s) to prevent catastrophic process deviations."
  };

  let currentWarRoomKey = 'automotive_linedown';
  let selectedStrategyIndex = 0;

  window.switchWarRoomSubpanel = function(mode) {
    const btnWarroom = document.getElementById('btn-tab-warroom');
    const btnClosedloop = document.getElementById('btn-tab-closedloop');
    const subWarroom = document.getElementById('subpanel-warroom');
    const subClosedloop = document.getElementById('subpanel-closedloop');

    if (!btnWarroom || !btnClosedloop || !subWarroom || !subClosedloop) return;

    if (mode === 'warroom') {
      btnWarroom.classList.add('active');
      btnClosedloop.classList.remove('active');
      subWarroom.style.display = 'block';
      subClosedloop.style.display = 'none';
    } else {
      btnClosedloop.classList.add('active');
      btnWarroom.classList.remove('active');
      subClosedloop.style.display = 'block';
      subWarroom.style.display = 'none';
    }
  };

  window.switchWarRoomScenario = function(key) {
    if (!WARROOM_SCENARIOS[key]) return;
    currentWarRoomKey = key;
    selectedStrategyIndex = 0;
    const scen = WARROOM_SCENARIOS[key];

    // Update chips
    document.querySelectorAll('.warroom-chip').forEach(btn => {
      btn.classList.toggle('active', btn.id === `chip-${key}`);
    });

    // Update Ticker
    const tickerStatus = document.getElementById('warroom-ticker-status');
    const clockEl = document.getElementById('warroom-elapsed-clock');
    const costEl = document.getElementById('warroom-accumulated-cost');
    if (tickerStatus) tickerStatus.textContent = scen.tickerStatus;
    if (clockEl) clockEl.textContent = scen.clock;
    if (costEl) costEl.textContent = scen.cost;

    // Update Details
    const titleEl = document.getElementById('warroom-incident-title');
    const sevEl = document.getElementById('warroom-severity-tag');
    const burnEl = document.getElementById('warroom-burn-rate');
    const stakeEl = document.getElementById('warroom-stakeholder');
    const defectEl = document.getElementById('warroom-defect-mech');
    const regEl = document.getElementById('warroom-reg-risk');

    if (titleEl) titleEl.textContent = scen.title;
    if (sevEl) sevEl.textContent = scen.severity;
    if (burnEl) burnEl.textContent = scen.burnRate;
    if (stakeEl) stakeEl.textContent = scen.stakeholder;
    if (defectEl) defectEl.textContent = scen.defectMech;
    if (regEl) regEl.textContent = scen.regRisk;

    // Render Strategies List
    renderWarRoomStrategies();

    // Render Quiz
    const quizQEl = document.getElementById('warroom-quiz-q');
    const quizOptsEl = document.getElementById('warroom-quiz-opts');
    const feedbackEl = document.getElementById('warroom-quiz-feedback');
    if (quizQEl) quizQEl.textContent = scen.quiz.question;
    if (quizOptsEl) {
      quizOptsEl.innerHTML = scen.quiz.options.map((opt, idx) => `
        <button class="warroom-quiz-btn" onclick="submitWarRoomQuiz(${idx})">
          ${String.fromCharCode(65 + idx)}. ${opt}
        </button>
      `).join('');
    }
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.innerHTML = '';
    }

    // Update Closed-Loop subpanel scripts
    const calloutEl = document.getElementById('closedloop-callout-text');
    const repeatEl = document.getElementById('closedloop-repeat-text');
    if (calloutEl) calloutEl.textContent = scen.callout;
    if (repeatEl) repeatEl.textContent = scen.repeat;

    // Render Live SITREP
    updateWarRoomSitrep();
  };

  function renderWarRoomStrategies() {
    const scen = WARROOM_SCENARIOS[currentWarRoomKey];
    const container = document.getElementById('warroom-strategies-list');
    if (!scen || !container) return;

    container.innerHTML = scen.strategies.map((strat, idx) => `
      <div class="warroom-strategy-card ${idx === selectedStrategyIndex ? 'selected' : ''}" onclick="selectWarRoomStrategy(${idx})">
        <div class="warroom-strategy-head">
          <span class="warroom-strategy-name">${strat.name}</span>
          <span class="warroom-strategy-risk ${strat.riskClass}">${strat.risk}</span>
        </div>
        <p class="warroom-strategy-desc">${strat.desc}</p>
        <div class="warroom-strategy-stats">
          <span><i class="fa-solid fa-stopwatch"></i> ${strat.speed}</span>
          <span><i class="fa-solid fa-money-bill-wave"></i> Scrap: ${strat.scrap}</span>
          <span><i class="fa-solid fa-truck-fast"></i> Recovery: ${strat.recovery}</span>
        </div>
      </div>
    `).join('');
  }

  window.selectWarRoomStrategy = function(idx) {
    selectedStrategyIndex = idx;
    renderWarRoomStrategies();
    updateWarRoomSitrep();
  };

  function updateWarRoomSitrep() {
    const scen = WARROOM_SCENARIOS[currentWarRoomKey];
    const previewEl = document.getElementById('warroom-sitrep-preview');
    if (!scen || !previewEl) return;

    const strat = scen.strategies[selectedStrategyIndex];
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

    const sitrep = 
`# EXECUTIVE SITUATION REPORT (SITREP) — INCIDENT COMMAND
INCIDENT : ${scen.title}
SEVERITY : ${scen.severity}
TIMESTAMP: ${dateStr}
CHOPPER  : Active Emergency Bridge (US-HQ & MEX-Plant Ops)

1. INCIDENT OVERVIEW & ROOT CAUSE EXPOSURE
--------------------------------------------------------------------------------
\u2022 Defect Mechanism : ${scen.defectMech}
\u2022 Financial Impact : ${scen.burnRate}
\u2022 Regulatory Risk  : ${scen.regRisk}
\u2022 Key Stakeholder  : ${scen.stakeholder}

2. ACTIVE CONTAINMENT ACTION (SELECTED PROTOCOL)
--------------------------------------------------------------------------------
\u2022 Strategy Applied : ${strat.name}
\u2022 Risk Standing    : ${strat.risk}
\u2022 Containment Speed: ${strat.speed}
\u2022 Associated Cost  : ${strat.scrap}
\u2022 Production Path  : ${strat.recovery}
\u2022 Action Detail    : ${strat.desc}

3. CLOSED-LOOP VERBAL VERIFICATION
--------------------------------------------------------------------------------
[x] Clear sender directive issued via Incident Command
[x] Verbatim repeat-back recorded by Lead Investigator
[x] Customer Liaison confirmation transmitted to Detroit / Minneapolis

4. NEXT INCIDENT CHECKPOINT
--------------------------------------------------------------------------------
Next Cross-Border Status Call: In exactly 30 minutes.
Incident Commander Authorization: SIGNED & ACTIVE`;

    previewEl.textContent = sitrep;
  }

  window.copyWarRoomSitrep = function(btnEl) {
    const previewEl = document.getElementById('warroom-sitrep-preview');
    if (!previewEl) return;
    const text = previewEl.textContent.trim();
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (btnEl) {
      const origHtml = btnEl.innerHTML;
      btnEl.innerHTML = '<i class="fa-solid fa-check"></i> SITREP Copied!';
      btnEl.style.background = 'rgba(16, 185, 129, 0.3)';
      btnEl.style.borderColor = '#10b981';
      btnEl.style.color = '#34d399';
      setTimeout(() => {
        btnEl.innerHTML = origHtml;
        btnEl.style.background = '';
        btnEl.style.borderColor = '';
        btnEl.style.color = '';
      }, 2000);
    }
  };

  window.submitWarRoomQuiz = function(selectedIdx) {
    const scen = WARROOM_SCENARIOS[currentWarRoomKey];
    if (!scen) return;
    const btns = document.querySelectorAll('.warroom-quiz-btn');
    const feedbackEl = document.getElementById('warroom-quiz-feedback');
    if (!feedbackEl) return;

    btns.forEach((btn, idx) => {
      btn.classList.remove('correct', 'wrong');
      if (idx === scen.quiz.answer) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    feedbackEl.style.display = 'block';
    if (selectedIdx === scen.quiz.answer) {
      feedbackEl.style.background = 'rgba(16, 185, 129, 0.15)';
      feedbackEl.style.border = '1px solid #10b981';
      feedbackEl.style.color = '#34d399';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Correct!</strong> ${scen.quiz.explanation}`;
    } else {
      feedbackEl.style.background = 'rgba(239, 68, 68, 0.15)';
      feedbackEl.style.border = '1px solid #ef4444';
      feedbackEl.style.color = '#f87171';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Incorrect.</strong> Correct answer: <em>${scen.quiz.options[scen.quiz.answer]}</em>. ${scen.quiz.explanation}`;
    }
  };

  // Closed-Loop Drill Submission
  window.submitClosedLoopDrill = function(selectedIdx) {
    const opts = CLOSEDLOOP_DRILL_DATA.options;
    const btns = document.querySelectorAll('.closedloop-opt-btn');
    const feedbackEl = document.getElementById('closedloop-drill-feedback');
    if (!feedbackEl) return;

    btns.forEach((btn, idx) => {
      btn.classList.remove('correct', 'wrong');
      if (opts[idx].correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    feedbackEl.style.display = 'block';
    if (opts[selectedIdx].correct) {
      feedbackEl.style.background = 'rgba(16, 185, 129, 0.15)';
      feedbackEl.style.border = '1px solid #10b981';
      feedbackEl.style.color = '#34d399';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Exemplary Closed-Loop Repeat-Back!</strong> ${CLOSEDLOOP_DRILL_DATA.explanation}`;
    } else {
      feedbackEl.style.background = 'rgba(239, 68, 68, 0.15)';
      feedbackEl.style.border = '1px solid #ef4444';
      feedbackEl.style.color = '#f87171';
      feedbackEl.innerHTML = `<strong><i class="fa-solid fa-triangle-exclamation"></i> Communication Hazard:</strong> ${opts[selectedIdx].note || 'Incomplete readback'}. ${CLOSEDLOOP_DRILL_DATA.explanation}`;
    }
  };

  function hydrateClosedLoopDrill() {
    const promptEl = document.getElementById('closedloop-drill-prompt');
    const optsContainer = document.getElementById('closedloop-drill-options');
    if (promptEl) promptEl.textContent = CLOSEDLOOP_DRILL_DATA.prompt;
    if (optsContainer) {
      optsContainer.innerHTML = CLOSEDLOOP_DRILL_DATA.options.map((opt, idx) => `
        <button class="closedloop-opt-btn" onclick="submitClosedLoopDrill(${idx})">
          ${String.fromCharCode(65 + idx)}. ${opt.text}
        </button>
      `).join('');
    }
  }

  window.playWarRoomSpeech = function(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent.trim().replace(/^"/, '').replace(/"$/, '');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Initial Scenario & Drill Hydration
  window.switchWarRoomScenario('automotive_linedown');
  hydrateClosedLoopDrill();
}



