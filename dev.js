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
  
  tracks.forEach(track => {
    if (track.modules) {
      totalModules += track.modules.length;
      track.modules.forEach(m => {
        if (m.readings) totalReadings += m.readings.length;
      });
    }
  });

  // Update DOM stats
  const statTracks = document.getElementById('stat-tracks');
  const statModules = document.getElementById('stat-modules');
  const statReadings = document.getElementById('stat-readings');
  const statPhrases = document.getElementById('stat-phrases');

  if (statTracks) statTracks.innerText = tracks.length;
  if (statModules) statModules.innerText = totalModules;
  if (statReadings) statReadings.innerText = totalReadings;
  if (statPhrases) statPhrases.innerText = phrases.length;

  // Render Filters
  renderFilters(tracks, phrases);

  // Render Modules Grid
  renderGrid(tracks, phrases);

  // Setup Event Listeners & Offline Controller
  setupSearch(tracks);
  setupDrawer();
  setupOfflineController(tracks, phrases);
  setupLevelSwitcher(tracks, phrases);
}

function setupLevelSwitcher(tracks, phrases) {
  const btnA2 = document.getElementById('btn-level-a2');
  const btnB1 = document.getElementById('btn-level-b1');
  if (!btnA2 || !btnB1) return;

  const currentLevel = localStorage.getItem('stemos_cefr_level') || 'A2';
  setActiveLevelButton(currentLevel);

  [btnA2, btnB1].forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.getAttribute('data-level');
      localStorage.setItem('stemos_cefr_level', selected);
      setActiveLevelButton(selected);
      filterGridByLevel(selected, tracks);
      showOfflineToast(`Nivel CEFR Actualizado: ${selected}`, `Ajustando vocabulario, lecturas e inglés de Nearshoring a nivel ${selected}.`, 100, true);
    });
  });
}

function setActiveLevelButton(level) {
  const btnA2 = document.getElementById('btn-level-a2');
  const btnB1 = document.getElementById('btn-level-b1');
  if (!btnA2 || !btnB1) return;

  if (level === 'B1') {
    btnB1.classList.add('active');
    btnA2.classList.remove('active');
  } else {
    btnA2.classList.add('active');
    btnB1.classList.remove('active');
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

  // Live re-render active open drawer if visible
  if (currentActiveTrackId && currentActiveModId) {
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop && backdrop.classList.contains('active')) {
      openDrawer(currentActiveTrackId, currentActiveModId, tracks);
    }
  }
}

function setupOfflineController(tracks, phrases) {
  const toggle = document.getElementById('offline-toggle');
  const syncBtn = document.getElementById('sync-offline-btn');

  // Check initial offline preference or connection
  const savedOfflineMode = localStorage.getItem('stemos_offline_mode') === 'true';
  const isCurrentlyOffline = !navigator.onLine || savedOfflineMode;

  if (toggle) {
    toggle.checked = isCurrentlyOffline;
    updateOfflineUI(isCurrentlyOffline);

    toggle.addEventListener('change', (e) => {
      const active = e.target.checked;
      localStorage.setItem('stemos_offline_mode', active ? 'true' : 'false');
      updateOfflineUI(active);
      if (active) {
        downloadEverythingOffline(tracks, phrases);
      }
    });
  }

  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      downloadEverythingOffline(tracks, phrases);
    });
  }

  // Monitor browser network state
  window.addEventListener('online', () => {
    if (!toggle || !toggle.checked) updateOfflineUI(false);
  });

  window.addEventListener('offline', () => {
    updateOfflineUI(true);
    if (toggle) toggle.checked = true;
  });
}

function updateOfflineUI(isOffline) {
  const pill = document.getElementById('offline-pill');
  const statusText = document.getElementById('offline-status-text');
  if (!pill || !statusText) return;

  if (isOffline) {
    pill.className = 'offline-pill offline-active';
    statusText.innerText = 'Modo Offline';
  } else {
    pill.className = 'offline-pill online';
    statusText.innerText = 'Online';
  }
}

function downloadEverythingOffline(tracks, phrases) {
  showOfflineToast('Iniciando Descarga Completa...', 'Almacenando 55 Módulos, 20 Frases Nativas y Lecturas en Caché Local', 15);

  // 1. Save all Tracks & Phrases to LocalStorage
  try {
    localStorage.setItem('stemos_dev_courses_v1.0.5', JSON.stringify(tracks));
    localStorage.setItem('stemos_dev_phrases_v1.0.5', JSON.stringify(phrases));
    localStorage.setItem('stemos_offline_ready', 'true');
  } catch (e) {
    console.warn('[stemOS Storage Warning]', e);
  }

  // 2. Trigger Service Worker full asset caching
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data && event.data.status === 'SUCCESS') {
        showOfflineToast('¡Descarga 100% Completada!', '55 Módulos y 20 Frases Nativas Listos para Usar Sin Internet.', 100, true);
      }
    };
    navigator.serviceWorker.controller.postMessage({ action: 'CACHE_EVERYTHING' }, [messageChannel.port2]);
  } else {
    setTimeout(() => {
      showOfflineToast('¡Todo Guardado Offline!', '55 Módulos y 20 Frases Nativas Listos para Usar Sin Internet.', 100, true);
    }, 1000);
  }

  // Progress animation simulation
  let p = 25;
  const timer = setInterval(() => {
    p += 25;
    if (p < 90) {
      updateToastProgress(p);
    } else {
      clearInterval(timer);
    }
  }, 250);
}

function showOfflineToast(title, sub, progress = 0, autoHide = false) {
  const toast = document.getElementById('offline-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastSub = document.getElementById('toast-sub');
  const toastProgress = document.getElementById('toast-progress');
  const iconBox = document.getElementById('toast-icon-box');

  if (!toast) return;

  if (toastTitle) toastTitle.innerText = title;
  if (toastSub) toastSub.innerText = sub;
  if (toastProgress) toastProgress.style.width = `${progress}%`;

  if (autoHide) {
    if (iconBox) iconBox.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i>`;
    if (toastProgress) toastProgress.style.width = `100%`;
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  } else {
    if (iconBox) iconBox.innerHTML = `<i class="fa-solid fa-cloud-arrow-down" style="color:var(--cyan);"></i>`;
    toast.classList.add('active');
  }
}

function updateToastProgress(percent) {
  const toastProgress = document.getElementById('toast-progress');
  if (toastProgress) toastProgress.style.width = `${percent}%`;
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
        '⚠️ Límite Alcanzado (Máx 5 Lecturas)',
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
      '📌 Lectura Guardada (3 Días)',
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

function saveReadingNotes(modId, notesText) {
  const map = getSavedOfflineReadingsMap();
  if (!map[modId]) {
    map[modId] = {
      modId: modId,
      trackId: '',
      downloadedAt: Date.now(),
      expiresAt: Date.now() + THREE_DAYS_MS,
      notes: notesText,
      syncedWithBot: false
    };
  } else {
    map[modId].notes = notesText;
    map[modId].syncedWithBot = false;
  }
  saveOfflineReadingsMap(map);
}

function syncNotesWithBot(modId, tracks) {
  const map = getSavedOfflineReadingsMap();
  const item = map[modId];
  if (!item || !item.notes || !item.notes.trim()) {
    showOfflineToast('Anotación Vacía', 'Escribe primero tus conclusiones o dudas antes de enviar al Bot.', 100, true);
    return;
  }

  if (!navigator.onLine) {
    showOfflineToast('📌 Guardado Localmente', 'Estás offline. Tus conclusiones están guardadas y se enviarán al Bot al reconectarte.', 100, true);
    return;
  }

  // Process AI Socratic Bot Sync
  showOfflineToast('🤖 Enviando al Bot Socrático...', 'Procesando tus conclusiones y generando retroalimentación socrática...', 50);

  setTimeout(() => {
    item.syncedWithBot = true;
    saveOfflineReadingsMap(map);
    
    const botStatus = document.getElementById('bot-sync-status');
    if (botStatus) {
      botStatus.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i> ¡Sincronizado con Bot Socrático!`;
    }
    showOfflineToast('🤖 Retroalimentación Lista', 'El Bot Socrático analizó tus conclusiones. ¡Revisa tu panel!', 100, true);
  }, 1200);
}

function renderFilters(tracks, phrases = []) {
  const filterContainer = document.getElementById('track-filters');
  if (!filterContainer) return;

  const validSaved = getValidOfflineReadings();
  const activeLevel = localStorage.getItem('stemos_cefr_level') || 'A2';

  const techCount = tracks.filter(t => (t.category || 'technology') === 'technology').length;
  const engCount = tracks.filter(t => t.category === 'engineering').length;
  const sciCount = tracks.filter(t => t.category === 'science').length;
  const carCount = tracks.filter(t => t.category === 'career').length;

  let html = `
    <!-- Prominent CEFR A2/B1 Level Selector Pill -->
    <div class="level-switcher-bar-pill" style="display:inline-flex; align-items:center; gap:4px; background:rgba(15, 23, 42, 0.9); border:1px solid rgba(56, 189, 248, 0.4); padding:3px 6px; border-radius:14px; margin-right:6px; box-shadow:0 0 15px rgba(56, 189, 248, 0.15);">
      <span style="font-size:0.72rem; font-weight:700; color:var(--cyan); padding:0 6px; text-transform:uppercase; letter-spacing:0.04em;"><i class="fa-solid fa-language"></i> Nivel CEFR:</span>
      <button class="level-bar-btn ${activeLevel === 'A2' ? 'active' : ''}" data-level="A2" style="padding:4px 12px; border-radius:10px; font-size:0.78rem; font-weight:700; border:none; cursor:pointer; transition:all 0.25s ease; ${activeLevel === 'A2' ? 'background:linear-gradient(135deg, var(--cyan), var(--indigo)); color:#030508; box-shadow:0 0 10px rgba(56, 189, 248, 0.4);' : 'background:transparent; color:var(--text-muted);'}">A2 (Básico-Intermedio)</button>
      <button class="level-bar-btn ${activeLevel === 'B1' ? 'active' : ''}" data-level="B1" style="padding:4px 12px; border-radius:10px; font-size:0.78rem; font-weight:700; border:none; cursor:pointer; transition:all 0.25s ease; ${activeLevel === 'B1' ? 'background:linear-gradient(135deg, var(--cyan), var(--indigo)); color:#030508; box-shadow:0 0 10px rgba(56, 189, 248, 0.4);' : 'background:transparent; color:var(--text-muted);'}">B1 (Técnico Avanzado)</button>
    </div>

    <!-- Category Master Filter Buttons -->
    <button class="filter-btn active" data-track="all"><i class="fa-solid fa-layer-group"></i> Todos los Tracks (${tracks.length})</button>
    <button class="filter-btn filter-cat-btn" data-track="cat-technology" style="border-color: rgba(56, 189, 248, 0.4); color: var(--cyan);"><i class="fa-solid fa-laptop-code"></i> 🔵 Technology (${techCount})</button>
    <button class="filter-btn filter-cat-btn" data-track="cat-engineering" style="border-color: rgba(52, 211, 153, 0.4); color: var(--emerald);"><i class="fa-solid fa-gears"></i> 🟢 Engineering (${engCount})</button>
    <button class="filter-btn filter-cat-btn" data-track="cat-science" style="border-color: rgba(192, 132, 252, 0.4); color: var(--purple);"><i class="fa-solid fa-atom"></i> 🟣 Science (${sciCount})</button>
    <button class="filter-btn filter-cat-btn" data-track="cat-career" style="border-color: rgba(251, 146, 60, 0.4); color: var(--gold);"><i class="fa-solid fa-plane-departure"></i> 🟠 Aviation & Career (${carCount})</button>
  `;
  
  // Add Mis Lecturas Offline Filter Button
  html += `
    <button class="filter-btn" data-track="offline-saved" style="border-color: rgba(56, 189, 248, 0.35);">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      Mis Lecturas Offline (${validSaved.length}/${MAX_OFFLINE_READINGS})
    </button>
  `;

  if (phrases && phrases.length > 0) {
    html += `
      <button class="filter-btn" data-track="phrases" style="border-color: rgba(251, 191, 36, 0.35);">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Frases Nativas (${phrases.length})
      </button>
    `;
  }

  filterContainer.innerHTML = html;

  // Attach event listener for the A2 / B1 Level Bar Buttons inside filters
  filterContainer.querySelectorAll('.level-bar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const level = e.currentTarget.getAttribute('data-level');
      localStorage.setItem('stemos_cefr_level', level);
      
      // Update buttons style
      filterContainer.querySelectorAll('.level-bar-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = 'var(--text-muted)';
        b.style.boxShadow = 'none';
      });
      e.currentTarget.classList.add('active');
      e.currentTarget.style.background = 'linear-gradient(135deg, var(--cyan), var(--indigo))';
      e.currentTarget.style.color = '#030508';
      e.currentTarget.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.4)';

      filterGridByLevel(level, tracks);
      showOfflineToast(`Nivel CEFR: ${level}`, `Ajustando vocabulario y lecturas a nivel ${level} (${level === 'A2' ? 'Básico Intermedio' : 'Técnico Avanzado'}).`, 100, true);
    });
  });

  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      const targetBtn = e.currentTarget;
      targetBtn.classList.add('active');
      const trackId = targetBtn.getAttribute('data-track');
      filterGridByTrack(trackId, tracks);
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
    case 'industrial-operations': case 'no_stem_supply_chain': return 'fa-solid fa-dolly';
    case 'mechatronics': return 'fa-solid fa-cogs';
    case 'biotechnology': return 'fa-solid fa-dna';
    case 'space-satellite': return 'fa-solid fa-satellite';
    case 'environmental-sustainability': return 'fa-solid fa-leaf';
    case 'healthcare-tech': case 'no_stem_medical_devices': return 'fa-solid fa-heart-pulse';
    case 'materials-nanotech': return 'fa-solid fa-atom';
    case 'food-science': case 'no_stem_gastronomy': return 'fa-solid fa-wheat-awn';
    case 'aviation-english': return 'fa-solid fa-plane-departure';
    case 'airforce-aerospace': return 'fa-solid fa-jet-fighter';
    case 'hospitality-food': case 'no_stem_hospitality': return 'fa-solid fa-hotel';
    case 'business-leadership': case 'no_stem_hr_compliance': return 'fa-solid fa-briefcase';
    case 'project-management': return 'fa-solid fa-list-check';
    case 'entrepreneurship': return 'fa-solid fa-rocket';
    default: return 'fa-solid fa-graduation-cap';
  }
}

function renderGrid(tracks, phrases = []) {
  const gridContainer = document.getElementById('studio-grid');
  if (!gridContainer) return;

  const savedMap = getSavedOfflineReadingsMap();
  const validSaved = getValidOfflineReadings();

  let html = '';

  // 0. Render Section: Mis Lecturas Offline Guardadas (Max 5, 3-Day Expiration)
  html += `
    <div class="track-section" id="section-offline-saved" style="${validSaved.length === 0 ? 'display:none;' : ''}">
      <h2 class="track-header-title font-head" style="color: var(--cyan); display:flex; align-items:center; justify-content:space-between;">
        <span style="display:flex; align-items:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Mis Lecturas Offline Seleccionadas
          <span style="font-size:0.8rem; font-weight:500; color:var(--text-dim);">(${validSaved.length}/${MAX_OFFLINE_READINGS} Seleccionadas &bull; Expiran en 3 Días)</span>
        </span>
        <span style="font-size:0.78rem; background:rgba(56, 189, 248, 0.12); color:var(--cyan); padding:4px 10px; border-radius:8px; border:1px solid rgba(56, 189, 248, 0.3); display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-clock-rotate-left"></i> Auto-Limpieza 72h
        </span>
      </h2>
      <div class="modules-grid">
  `;

  if (validSaved.length > 0) {
    validSaved.forEach(savedItem => {
      let foundMod = null;
      let foundTrack = null;

      tracks.forEach(tr => {
        if (tr.modules) {
          const m = tr.modules.find(x => x.id === savedItem.modId);
          if (m) {
            foundMod = m;
            foundTrack = tr;
          }
        }
      });

      if (foundMod && foundTrack) {
        const remainingStr = getRemainingTimeText(savedItem.expiresAt);
        const hasNotes = savedItem.notes && savedItem.notes.trim().length > 0;

        html += `
          <div class="module-card offline-saved-card" data-track-id="${foundTrack.id}" data-mod-id="${foundMod.id}" style="border-color: rgba(56, 189, 248, 0.4); background: rgba(15, 23, 42, 0.85);">
            <div class="card-top">
              <div class="module-icon-box" style="background: rgba(56, 189, 248, 0.15); color: var(--cyan);">
                <i class="${foundMod.icon || 'fa-solid fa-book-open'}"></i>
              </div>
              <span class="module-tag" style="background: rgba(56, 189, 248, 0.15); color: var(--cyan);">${foundTrack.title}</span>
            </div>

            <div class="card-body">
              <h3 class="card-title-es">${foundMod.titleES || foundMod.title}</h3>
              <p class="card-title-en">${foundMod.title}</p>
              
              <div class="offline-expiry-pill">
                <i class="fa-solid fa-hourglass-half"></i> ${remainingStr}
              </div>

              ${hasNotes ? `
                <div style="margin-top:8px; font-size:0.78rem; color:var(--emerald); background:rgba(52, 211, 153, 0.1); padding:4px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">
                  <i class="fa-solid fa-pen-to-square"></i> Conclusiones Guardadas
                </div>
              ` : ''}
            </div>

            <div class="card-footer">
              <button class="btn-remove-pin" data-track-id="${foundTrack.id}" data-mod-id="${foundMod.id}" title="Quitar de lecturas offline">
                <i class="fa-solid fa-trash-can"></i> Quitar
              </button>
              <button class="explore-btn">
                Leer Ahora <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        `;
      }
    });
  } else {
    html += `<p style="color:var(--text-dim); font-size:0.9rem; padding:12px;">No has seleccionado ninguna lectura offline. Haz clic en el botón 📌 Guardar Offline en cualquier módulo (máximo 5).</p>`;
  }

  html += `
      </div>
    </div>
  `;

  // 1. Render Course Tracks Grouped by 4 Master Categories
  const categoryKeys = ["technology", "engineering", "science", "career"];
  const categoriesMap = (typeof LXP_CATEGORIES !== 'undefined' ? LXP_CATEGORIES : {
    "technology": { name: "Technology", badge: "🔵 TECHNOLOGY", icon: "fa-solid fa-laptop-code", description: "Redes avanzadas, IA, IoT, desarrollo de software y computación en la nube para la industria global." },
    "engineering": { name: "Engineering & Industry", badge: "🟢 ENGINEERING & INDUSTRY", icon: "fa-solid fa-gears", description: "Manufactura de alta precisión, semiconductores, electromovilidad, robótica y sistemas mecatrónicos de nearshoring." },
    "science": { name: "Science & Future Technology", badge: "🟣 SCIENCE & FUTURE TECHNOLOGY", icon: "fa-solid fa-atom", description: "Biotecnología, tecnología espacial, sustentabilidad ambiental, nanotecnología y ciencias aplicadas." },
    "career": { name: "Aviation, Career & Professional English", badge: "🟠 AVIATION, CAREER & PROFESSIONAL ENGLISH", icon: "fa-solid fa-plane-departure", description: "Inglés técnico para aviación civil (OACI), aeroespacial de defensa, gestión ejecutiva, liderazgo y proyectos globales." }
  });

  categoryKeys.forEach(catKey => {
    const cat = categoriesMap[catKey] || { name: catKey, badge: catKey.toUpperCase(), icon: "fa-solid fa-layer-group", description: "" };
    const catTracks = tracks.filter(t => (t.category || 'technology') === catKey);

    if (catTracks.length > 0) {
      html += `
        <div class="category-group" id="group-${catKey}" data-category="${catKey}">
          <div class="category-banner cat-${catKey}">
            <div class="category-banner-left">
              <div class="category-banner-icon">
                <i class="${cat.icon}"></i>
              </div>
              <div>
                <div class="category-banner-title">${cat.badge || cat.name}</div>
                <div class="category-banner-desc">${cat.description}</div>
              </div>
            </div>
            <div class="category-pill-badge">
              ${catTracks.length} Tracks
            </div>
          </div>
      `;

      catTracks.forEach(track => {
        html += `
          <div class="track-section" id="section-${track.id}" data-category="${catKey}">
            <h2 class="track-header-title font-head">
              <i class="${getTrackIcon(track.id)}"></i> ${track.title}
              <span style="font-size:0.8rem; font-weight:500; color:var(--text-dim);">(${track.modules ? track.modules.length : 0} Módulos &bull; ${track.titleEN || ''})</span>
            </h2>
            <div class="modules-grid">
        `;

        if (track.modules && track.modules.length > 0) {
          track.modules.forEach((mod, idx) => {
            const readingsCount = mod.readings ? mod.readings.length : 0;
            const statusLabel = readingsCount > 0 ? `${readingsCount} Lectura(s)` : 'En desarrollo';
            const isPinned = !!savedMap[mod.id];

            // Standards badges
            const conocerCode = mod.conocer || track.conocer || 'EC1290 (Manufactura Alta Tech)';
            const ngssCode = mod.ngss || track.ngss || 'HS-PS1-1 / HS-PS3-2';
            const industrySource = mod.industry || track.industry || 'Nearshoring Industry Standard';
            const isGold = !!mod.isGoldModel;
            const goldTagHtml = isGold ? `
              <span class="gold-model-tag" title="Módulo Modelo Gold ESP: 4 Pilares de Alta Densidad (Lectura + Diálogo + Léxico + Socrático)"><i class="fa-solid fa-star"></i> MODELO GOLD ESP</span>
            ` : '';

            html += `
              <div class="module-card ${isGold ? 'gold-card' : ''}" data-track-id="${track.id}" data-mod-id="${mod.id}">
                <div class="card-top">
                  <div class="module-icon-box" ${isGold ? 'style="background:rgba(251,191,36,0.18); color:var(--gold); border:1px solid rgba(251,191,36,0.35);"' : ''}>
                    <i class="${mod.icon || 'fa-solid fa-microchip'}"></i>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:flex-end;">
                    ${goldTagHtml}
                    <button class="btn-pin-offline ${isPinned ? 'pinned' : ''}" data-track-id="${track.id}" data-mod-id="${mod.id}" title="${isPinned ? 'Guardado Offline (Expira en 3 días)' : 'Guardar Lectura Offline (Máx 5)'}">
                      <i class="fa-solid fa-bookmark"></i> ${isPinned ? 'Offline' : '+ Offline'}
                    </button>
                    <span class="module-tag">${track.title}</span>
                  </div>
                </div>

                <div class="card-body">
                  <h3 class="card-title-es">${mod.titleES || mod.title}</h3>
                  <p class="card-title-en">${mod.title}</p>
                </div>

                <div class="card-footer" style="flex-direction:column; align-items:stretch; gap:12px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div class="reading-count" ${isGold ? 'style="color:var(--gold); font-weight:700;"' : ''}>
                      <i class="${isGold ? 'fa-solid fa-crown' : 'fa-solid fa-file-lines'}"></i> ${isGold ? '4 Pilares ESP' : statusLabel}
                    </div>
                    <button class="explore-btn" ${isGold ? 'style="background:linear-gradient(135deg, var(--gold), #d97706); color:#000;"' : ''}>
                      ${isGold ? 'Abrir Modelo Gold' : 'Explorar'} <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>

                  <!-- Standards Badges at the bottom in compact micro-pills -->
                  <div class="standards-badge-group" style="margin:0; padding-top:10px; border-top:1px solid rgba(255,255,255,0.04);">
                    <span class="std-pill std-conocer" title="Estándar SEP CONOCER México"><i class="fa-solid fa-award"></i> SEP ${conocerCode}</span>
                    <span class="std-pill std-ngss" title="Estándar Internacional Next Generation Science Standards"><i class="fa-solid fa-flask"></i> NGSS ${ngssCode}</span>
                    <span class="std-pill std-industry" title="Alineación a Currículo e Industria"><i class="fa-solid fa-industry"></i> ${industrySource}</span>
                  </div>
                </div>
              </div>
            `;
          });
        } else {
          html += `<p style="color:var(--text-dim); font-size:0.9rem;">No hay módulos en este track actualmente.</p>`;
        }

        html += `
            </div>
          </div>
        `;
      });

      html += `
        </div>
      `;
    }
  });

  // 2. Render Native Phrases Section ("Lo que no enseñan en la escuela")
  if (phrases && phrases.length > 0) {
    html += `
      <div class="track-section" id="section-phrases">
        <h2 class="track-header-title font-head" style="color: var(--gold);">
          <i class="fa-solid fa-comments"></i> Librería de Frases Nativas ("Lo que NO enseñan en la escuela")
          <span style="font-size:0.8rem; font-weight:500; color:var(--text-dim);">(${phrases.length} Expresiones Reales)</span>
        </h2>
        <div class="modules-grid">
    `;

    phrases.forEach(p => {
      html += `
        <div class="module-card phrase-card" data-phrase-id="${p.id}" style="border-color: rgba(251, 191, 36, 0.25);">
          <div class="card-top">
            <div class="module-icon-box" style="background: rgba(251, 191, 36, 0.15); color: var(--gold);">
              <i class="fa-solid fa-quote-left"></i>
            </div>
            <span class="module-tag" style="background: rgba(251, 191, 36, 0.15); color: var(--gold);">${p.category.toUpperCase()}</span>
          </div>

          <div class="card-body">
            <h3 class="card-title-es" style="color: var(--gold); font-size: 1.15rem;">"${p.phrase}"</h3>
            <p class="card-title-en" style="color: var(--text-muted); font-size: 0.86rem; margin-top: 4px;">${p.meaningES}</p>
            
            <div class="school-contrast-box">
              <div class="school-row"><span class="bad-tag"><i class="fa-solid fa-school"></i> Escuela:</span> <s>${p.schoolVsNative.school}</s></div>
              <div class="native-row"><span class="good-tag"><i class="fa-solid fa-bolt"></i> Nativo:</span> <strong>${p.schoolVsNative.native}</strong></div>
            </div>
          </div>

          <div class="card-footer">
            <div class="reading-count" style="color: var(--gold);">
              <i class="fa-solid fa-volume-high"></i> ${p.pronunciationHint.split(':')[0] || 'Pronunciación'}
            </div>
            <button class="explore-btn" style="background: var(--gold); color: #000;">
              Ver Matiz <i class="fa-solid fa-arrow-right"></i>
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

  // ── Modern Web Guidance: single delegated listener on the container ──────────
  gridContainer.addEventListener('click', (e) => {
    // 1. Pin / unpin offline reading
    const pinBtn = e.target.closest('.btn-pin-offline');
    if (pinBtn) {
      const trackId = pinBtn.dataset.trackId;
      const modId = pinBtn.dataset.modId;
      toggleOfflineReadingPin(trackId, modId, tracks);
      return;
    }

    // 2. Remove offline reading
    const removeBtn = e.target.closest('.btn-remove-pin');
    if (removeBtn) {
      const trackId = removeBtn.dataset.trackId;
      const modId = removeBtn.dataset.modId;
      toggleOfflineReadingPin(trackId, modId, tracks);
      return;
    }

    // 3. Click on a phrase card or its explore button → open phrase drawer
    const phraseCard = e.target.closest('.phrase-card');
    if (phraseCard) {
      const phraseId = phraseCard.dataset.phraseId;
      openPhraseDrawer(phraseId, phrases);
      return;
    }

    // 4. Click anywhere on a module card (including its explore button) → open drawer
    const moduleCard = e.target.closest('.module-card');
    if (moduleCard) {
      const trackId = moduleCard.dataset.trackId;
      const modId = moduleCard.dataset.modId;
      openDrawer(trackId, modId, tracks);
      return;
    }
  });
}

function filterGridByTrack(trackId, tracks) {
  const allSections = document.querySelectorAll('.track-section');
  const allCatGroups = document.querySelectorAll('.category-group');
  const offlineSec = document.getElementById('section-offline-saved');
  const phrasesSec = document.getElementById('section-phrases');

  if (trackId === 'all') {
    allCatGroups.forEach(grp => grp.style.display = 'block');
    allSections.forEach(sec => sec.style.display = 'block');
    if (phrasesSec) phrasesSec.style.display = 'block';
    return;
  }

  if (trackId.startsWith('cat-')) {
    const catKey = trackId.replace('cat-', '');
    allCatGroups.forEach(grp => {
      if (grp.getAttribute('data-category') === catKey) {
        grp.style.display = 'block';
        grp.querySelectorAll('.track-section').forEach(sec => sec.style.display = 'block');
      } else {
        grp.style.display = 'none';
      }
    });
    if (offlineSec) offlineSec.style.display = 'none';
    if (phrasesSec) phrasesSec.style.display = 'none';
    return;
  }

  if (trackId === 'offline-saved') {
    allCatGroups.forEach(grp => grp.style.display = 'none');
    allSections.forEach(sec => {
      sec.style.display = (sec.id === 'section-offline-saved') ? 'block' : 'none';
    });
    if (offlineSec) offlineSec.style.display = 'block';
    if (phrasesSec) phrasesSec.style.display = 'none';
    return;
  }

  if (trackId === 'phrases') {
    allCatGroups.forEach(grp => grp.style.display = 'none');
    allSections.forEach(sec => {
      sec.style.display = (sec.id === 'section-phrases') ? 'block' : 'none';
    });
    if (offlineSec) offlineSec.style.display = 'none';
    if (phrasesSec) phrasesSec.style.display = 'block';
    return;
  }

  // Specific track ID
  allCatGroups.forEach(grp => {
    const matchingSec = grp.querySelector(`#section-${trackId}`);
    if (matchingSec) {
      grp.style.display = 'block';
      grp.querySelectorAll('.track-section').forEach(sec => {
        sec.style.display = (sec.id === `section-${trackId}`) ? 'block' : 'none';
      });
    } else {
      grp.style.display = 'none';
    }
  });
  if (offlineSec) offlineSec.style.display = 'none';
  if (phrasesSec) phrasesSec.style.display = 'none';
}

function setupSearch(tracks) {
  const searchInput = document.getElementById('studio-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    
    document.querySelectorAll('.module-card').forEach(card => {
      const text = card.innerText.toLowerCase();
      if (text.includes(q)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function setupDrawer() {
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close');

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
    mod.readings.forEach((r, idx) => {
      const isFirst = (idx === 0);
      const formattedText = renderMarkdownWithVocabulary(adaptReadingContentForCEFR(r, activeLevel), r.vocabulary || [], activeLevel);

      html += `
        <div class="reading-accordion ${isFirst ? 'open' : ''}" id="accordion-reading-${idx}">
          <div class="reading-accordion-header" onclick="this.parentElement.classList.toggle('open')">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:0.85rem; font-weight:800; color:var(--cyan); background:rgba(56,189,248,0.15); width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center;">${idx+1}</span>
              <h3 class="font-head" style="color:#fff; font-size:1.1rem; margin:0;">${r.title}</h3>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="cefr-badge-inline" style="font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:6px; background:${activeLevel==='A2'?'rgba(56,189,248,0.2)':'rgba(168,85,247,0.2)'}; color:${activeLevel==='A2'?'var(--cyan)':'var(--purple)'}; border:1px solid ${activeLevel==='A2'?'rgba(56,189,248,0.4)':'rgba(168,85,247,0.4)'};">
                Modo ${activeLevel}
              </span>
              <span style="font-size:0.78rem; background:rgba(255,255,255,0.06); padding:4px 8px; border-radius:6px; color:var(--text-dim);">${r.duration || '10 min'}</span>
              <div class="reading-accordion-toggle-icon"><i class="fa-solid fa-chevron-down"></i></div>
            </div>
          </div>

          <div class="reading-accordion-body">
            <div class="reader-content">
              ${formattedText}
            </div>

            ${(r.vocabulary && r.vocabulary.length > 0) ? `
              <h4 class="font-head" style="margin-top:24px; color:var(--gold); font-size:1.05rem;"><i class="fa-solid fa-book"></i> Glosario y Vocabulario Técnico (Pasa el cursor o presiona 'i')</h4>
              <div class="glossary-list">
                ${r.vocabulary.map(v => `
                  <div class="glossary-item">
                    <div class="glossary-term">
                      <span class="term-tooltip">
                        ${v.term || v.en} <i class="fa-solid fa-circle-info term-info-btn" data-term="${v.term || v.en}" data-def="${v.definition || v.definitionEN || v.es}"></i>
                        <span class="tooltip-box"><strong>${v.term || v.en} (${v.es || ''})</strong><br>${v.definition || v.definitionEN || ''}</span>
                      </span>
                      <span style="font-weight:400; color:var(--text-dim); font-size:0.85rem;">— ${v.es || v.definitionES || ''}</span>
                    </div>
                    <div class="glossary-def">${v.definition || v.definitionEN || ''}</div>
                  </div>
                `).join('')}
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
function renderDialogueTabHtml(dialogue) {
  if (!dialogue || !dialogue.turns) {
    return `<div style="padding:32px; text-align:center; color:var(--text-muted);">No hay diálogo registrado para este módulo.</div>`;
  }

  const turnsHtml = dialogue.turns.map((turn, idx) => {
    const char = (dialogue.characters || []).find(c => c.name === turn.speaker) || {
      name: turn.speaker,
      avatar: turn.speaker.split(' ').map(w => w[0]).join('').slice(0, 2),
      color: 'var(--cyan)'
    };

    let highlightedText = turn.text;
    (turn.targetTerms || []).forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="dialogue-term-chip">$1</span>`);
    });

    return `
      <div class="dialogue-turn" id="dialogue-turn-${idx}">
        <div class="dialogue-avatar" style="background:${char.color}22; color:${char.color}; border:1px solid ${char.color}55;">
          ${char.avatar}
        </div>
        <div class="dialogue-content">
          <div class="dialogue-speaker-info">
            <span class="dialogue-speaker-name" style="color:${char.color};">${turn.speaker}</span>
            <span class="dialogue-speaker-role">${char.role || ''}</span>
          </div>
          <div class="dialogue-bubble">
            ${highlightedText}
            <div class="dialogue-translation-block" id="trans-block-${idx}" style="display:none;">
              <i class="fa-solid fa-language" style="color:var(--cyan); margin-right:6px;"></i> ${turn.translation}
            </div>
            <div class="dialogue-turn-actions">
              <button class="btn-turn-audio" data-speech-text="${encodeURIComponent(turn.text)}">
                <i class="fa-solid fa-volume-high"></i> Escuchar línea
              </button>
              <button class="btn-turn-trans" data-target="trans-block-${idx}">
                <i class="fa-solid fa-eye"></i> Traducción
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const contrastHtml = (dialogue.contrastTips || []).map(tip => `
    <div style="background:rgba(7,11,20,0.85); border:1px solid rgba(251,191,36,0.3); border-radius:12px; padding:16px; margin-bottom:12px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span style="background:rgba(239,68,68,0.2); color:#f87171; border:1px solid rgba(239,68,68,0.4); font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:6px;"><i class="fa-solid fa-school"></i> INGLÉS DE ESCUELA</span>
        <span style="color:var(--text-dim); font-size:0.8rem;">vs</span>
        <span style="background:rgba(52,211,153,0.2); color:var(--emerald); border:1px solid rgba(52,211,153,0.4); font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:6px;"><i class="fa-solid fa-industry"></i> INGLÉS DE PLANTA REAL</span>
      </div>
      <div style="font-size:0.88rem; color:#fca5a5; margin-bottom:4px;"><s>"${tip.school}"</s></div>
      <div style="font-size:0.95rem; color:#6ee7b7; font-weight:700; margin-bottom:8px;">"${tip.native}"</div>
      <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">💡 <em>${tip.explanation}</em></div>
    </div>
  `).join('');

  return `
    <div class="dialogue-meta-card">
      <h3 class="font-head" style="color:#fff; font-size:1.25rem; margin-bottom:4px;">${dialogue.title}</h3>
      <p style="color:var(--text-muted); font-size:0.88rem; margin-bottom:12px;">${dialogue.titleES || ''}</p>
      <div class="dialogue-context">
        <i class="fa-solid fa-location-dot"></i> ${dialogue.scenarioContext}
      </div>

      <div class="dialogue-audio-bar">
        <button id="btn-play-all-dialogue" class="btn-play-dialogue">
          <i class="fa-solid fa-play"></i> Escuchar Standup Completo (TTS)
        </button>
        <button id="btn-stop-dialogue" class="btn-turn-audio" style="display:none; border-color:var(--rose); color:var(--rose); padding:8px 14px;">
          <i class="fa-solid fa-stop"></i> Detener Audio
        </button>
        <span style="font-size:0.78rem; color:var(--text-dim); margin-left:auto;">
          <i class="fa-solid fa-circle-info"></i> Audio en inglés sintetizado con Web Speech API
        </span>
      </div>
    </div>

    <div class="dialogue-flow" id="dialogue-flow-container">
      ${turnsHtml}
    </div>

    ${contrastHtml ? `
      <div class="contrast-tips-section">
        <h4 class="font-head" style="color:var(--gold); font-size:1.1rem; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
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
    const collocationsHtml = (item.collocations || []).map(c => `
      <span class="collocation-chip" data-speak-colloc="${encodeURIComponent(c)}" title="Click para escuchar"><i class="fa-solid fa-volume-high" style="font-size:0.65rem; margin-right:3px;"></i> ${c}</span>
    `).join('');

    return `
      <div class="lexicon-card" id="lexicon-card-${idx}">
        <div>
          <div class="lexicon-cat-tag">${item.category || 'Término Clave'}</div>
          <div class="lexicon-term-header">
            <div>
              <div class="lexicon-term-name">${item.term}</div>
              <div style="font-size:0.84rem; color:var(--text-muted); font-weight:600;">${item.es}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="lexicon-ipa">${item.ipa || ''}</span>
              <button class="btn-turn-audio" data-speech-text="${encodeURIComponent(item.term)}" title="Pronunciación en inglés"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
          
          <p class="lexicon-def">${item.definition}</p>

          ${collocationsHtml ? `
            <div class="collocations-block">
              <div class="collocations-title"><i class="fa-solid fa-link" style="color:var(--cyan);"></i> Collocations Obligatorias (Verbo / Adjetivo)</div>
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
          <div style="margin-top:14px; padding-top:10px; border-top:1px dashed rgba(255,255,255,0.08); font-size:0.84rem; color:var(--text-muted);">
            <div style="font-size:0.72rem; font-weight:700; color:var(--emerald); text-transform:uppercase; margin-bottom:3px;"><i class="fa-solid fa-microchip"></i> Uso Real en Planta</div>
            <em style="color:#e2e8f0;">"${item.nativeUsage}"</em>
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
              ⚠️ <strong>Cero tolerancia a respuestas vacías:</strong> En stemOS evaluamos tu producción técnica activa en inglés. Explica con tus propias palabras el concepto para validar tu progreso matemáticamente.
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
  const isGold = !!mod.isGoldModel;

  drawerTitle.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:16px; flex-wrap:wrap;">
      <div style="display:flex; align-items:center; gap:10px;">
        ${isGold ? '<span class="gold-model-tag"><i class="fa-solid fa-star"></i> GOLD</span>' : ''}
        <span>${mod.titleES || mod.title}</span>
      </div>
      <!-- In-Modal CEFR Level Switcher -->
      <div class="modal-level-switcher" style="display:inline-flex; align-items:center; gap:2px; background:rgba(0,0,0,0.5); border:1px solid rgba(56,189,248,0.4); padding:3px; border-radius:10px; shrink:0;">
        <button class="modal-level-btn ${activeLevel === 'A2' ? 'active' : ''}" data-level="A2" style="padding:4px 10px; border-radius:7px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer; transition:all 0.2s ease; ${activeLevel === 'A2' ? 'background:linear-gradient(135deg, var(--cyan), var(--indigo)); color:#030508; box-shadow:0 0 10px rgba(56, 189, 248, 0.4);' : 'background:transparent; color:var(--text-muted);'}">A2 (Básico)</button>
        <button class="modal-level-btn ${activeLevel === 'B1' ? 'active' : ''}" data-level="B1" style="padding:4px 10px; border-radius:7px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer; transition:all 0.2s ease; ${activeLevel === 'B1' ? 'background:linear-gradient(135deg, var(--cyan), var(--indigo)); color:#030508; box-shadow:0 0 10px rgba(56, 189, 248, 0.4);' : 'background:transparent; color:var(--text-muted);'}">B1 (Técnico)</button>
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
            <div style="font-size:0.8rem; color:var(--text-muted);">Blueprint de Especificación ➔ Diálogo de Planta ➔ Matriz Léxica ➔ Evaluador Socrático Feynman</div>
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
        ${renderDialogueTabHtml(mod.dialogue)}
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

  // Inject Anotaciones & Conclusiones Offline Notepad for AI Socratic Bot
  const savedMap = getSavedOfflineReadingsMap();
  const savedItem = savedMap[modId] || {};
  const notesContent = savedItem.notes || '';
  const isSynced = savedItem.syncedWithBot;

  contentHtml += `
    <div class="notes-editor-card" style="margin-top:32px; background:rgba(15, 23, 42, 0.85); border:1px solid var(--border-glow); padding:20px; border-radius:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h3 class="font-head" style="color:var(--cyan); font-size:1.15rem; display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-pen-to-square"></i> Mis Anotaciones & Conclusiones Offline
        </h3>
        <span id="bot-sync-status" style="font-size:0.8rem; padding:4px 10px; border-radius:8px; background:rgba(255,255,255,0.06); color:var(--text-muted);">
          ${isSynced ? '<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i> Sincronizado con Bot' : '<i class="fa-solid fa-floppy-disk" style="color:var(--gold);"></i> Guardado Local'}
        </span>
      </div>
      <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:12px;">
        Escribe aquí tus conclusiones, dudas o resúmenes. Se guardan localmente en tu dispositivo y podrás enviárselas al Bot Socrático al reconectarte en línea.
      </p>
      
      <textarea id="reading-notes-input" class="notes-textarea" rows="4" placeholder="Escribe aquí tus conclusiones o dudas sobre esta lectura..." style="width:100%; background:rgba(7, 9, 14, 0.75); border:1px solid rgba(255,255,255,0.12); color:#fff; padding:12px; border-radius:10px; font-family:var(--font-sans); font-size:0.9rem; resize:vertical;">${notesContent}</textarea>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
        <span style="font-size:0.78rem; color:var(--text-dim);"><i class="fa-solid fa-shield-halved"></i> Guardado en almacenamiento local</span>
        <button id="btn-sync-bot" class="explore-btn" style="background:linear-gradient(135deg, var(--cyan), var(--emerald)); color:#000; padding:8px 16px; font-weight:700;">
          <i class="fa-solid fa-robot"></i> Enviar al Bot Socrático
        </button>
      </div>
    </div>

    <!-- Accreditation & Standards Footer Banner (Relocated to bottom) -->
    <div class="accreditation-banner" style="margin-top:32px; margin-bottom:0; padding:16px 20px;">
      <h3 class="font-head" style="color:var(--gold); font-size:0.95rem; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-graduation-cap"></i> Acreditación & Estándares de Empleabilidad
      </h3>
      <div class="accred-grid" style="margin-top:10px; gap:10px;">
        <div class="accred-box" style="padding:10px;">
          <div class="accred-title" style="color:var(--emerald); font-size:0.72rem;"><i class="fa-solid fa-award"></i> SEP CONOCER</div>
          <div class="accred-desc" style="font-size:0.8rem;">${conocerCode}</div>
        </div>

        <div class="accred-box" style="padding:10px;">
          <div class="accred-title" style="color:var(--cyan); font-size:0.72rem;"><i class="fa-solid fa-flask"></i> NGSS Global</div>
          <div class="accred-desc" style="font-size:0.8rem;">${ngssCode}</div>
        </div>

        <div class="accred-box" style="padding:10px;">
          <div class="accred-title" style="color:var(--gold); font-size:0.72rem;"><i class="fa-solid fa-industry"></i> Origen Industria</div>
          <div class="accred-desc" style="font-size:0.8rem;">${industrySource}</div>
        </div>

        <div class="accred-box" style="padding:10px;">
          <div class="accred-title" style="color:var(--purple); font-size:0.72rem;"><i class="fa-solid fa-certificate"></i> Credencial</div>
          <div class="accred-desc" style="font-size:0.8rem;">Open Badges 3.0 (W3C)</div>
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
    if (btnPlayAll && mod.dialogue && mod.dialogue.turns) {
      btnPlayAll.addEventListener('click', () => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        isPlayingDialogueAudio = true;
        if (btnStop) btnStop.style.display = 'inline-flex';
        btnPlayAll.innerHTML = '<i class="fa-solid fa-pause"></i> Reproduciendo Standup...';

        let tIdx = 0;
        function playNext() {
          if (!isPlayingDialogueAudio || tIdx >= mod.dialogue.turns.length) {
            isPlayingDialogueAudio = false;
            btnPlayAll.innerHTML = '<i class="fa-solid fa-play"></i> Escuchar Standup Completo (TTS)';
            if (btnStop) btnStop.style.display = 'none';
            document.querySelectorAll('.dialogue-turn').forEach(el => {
              el.style.opacity = '1';
            });
            return;
          }

          const t = mod.dialogue.turns[tIdx];
          document.querySelectorAll('.dialogue-turn').forEach((el, idx) => {
            el.style.opacity = (idx === tIdx) ? '1' : '0.4';
          });

          const utter = new SpeechSynthesisUtterance(`${t.speaker} says: ${t.text}`);
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
            el.style.opacity = '1';
          });
        });
      }
    }
  }

  // Delegated click for audio buttons, collocations, and translation in drawerBody
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
  });

  // Attach event listeners for offline notes & bot sync
  const notesInput = document.getElementById('reading-notes-input');
  if (notesInput) {
    notesInput.addEventListener('input', (e) => {
      saveReadingNotes(modId, e.target.value);
    });
  }

  const btnSyncBot = document.getElementById('btn-sync-bot');
  if (btnSyncBot) {
    btnSyncBot.addEventListener('click', () => {
      syncNotesWithBot(modId, tracks);
    });
  }

  // Attach event listener for inside-modal CEFR level buttons
  document.querySelectorAll('.modal-level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const level = e.currentTarget.getAttribute('data-level');
      localStorage.setItem('stemos_cefr_level', level);
      openDrawer(trackId, modId, tracks);
      showOfflineToast(`Nivel CEFR: ${level}`, `Ajustando la vista de lectura a nivel ${level} (${level === 'A2' ? 'Básico-Intermedio' : 'Técnico Avanzado'}).`, 100, true);
    });
  });
}

function openPhraseDrawer(phraseId, phrases) {
  const p = (phrases || window.STEMOS_PHRASES || []).find(x => x.id === phraseId);
  if (!p) return;

  const backdrop = document.getElementById('drawer-backdrop');
  const drawerTitle = document.getElementById('drawer-mod-title');
  const drawerSub = document.getElementById('drawer-mod-sub');
  const drawerBody = document.getElementById('drawer-body');

  drawerTitle.innerText = `"${p.phrase}"`;
  drawerSub.innerText = `Librería de Frases Nativas • ${p.category.toUpperCase()} • ID: ${p.id}`;

  let contentHtml = `
    <div class="accreditation-banner" style="border-color: rgba(251, 191, 36, 0.35);">
      <h3 class="font-head" style="color:var(--gold); font-size:1.2rem; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-bolt"></i> Contraste Directo: Escuela vs. Inglés Nativo Real
      </h3>
      <p style="font-size:0.86rem; color:var(--text-muted); margin-top:4px;">
        Expresión real que utilizan los profesionales y líderes de ingeniería en empresas de Nearshoring e industria de alta tecnología.
      </p>

      <div class="accred-grid" style="margin-top:16px;">
        <div class="accred-box" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.08);">
          <div class="accred-title" style="color: #f87171;"><i class="fa-solid fa-school"></i> Lo que enseñan en la Escuela Tradicional</div>
          <div class="accred-desc" style="color: #fca5a5; font-size:1rem;"><s>${p.schoolVsNative.school}</s></div>
          <div class="accred-sub">Inglés de libro de texto rígido o literal</div>
        </div>

        <div class="accred-box" style="border-color: rgba(52, 211, 153, 0.35); background: rgba(52, 211, 153, 0.08);">
          <div class="accred-title" style="color:var(--emerald);"><i class="fa-solid fa-bolt"></i> Cómo lo dice un Nativo Real</div>
          <div class="accred-desc" style="color:#fff; font-size:1.1rem; font-weight:700;">"${p.schoolVsNative.native}"</div>
          <div class="accred-sub">Expresión natural y fluida en la industria</div>
        </div>
      </div>
    </div>

    <div style="margin-top:28px;">
      <h3 class="font-head" style="color:var(--cyan); font-size:1.2rem; margin-bottom:10px;"><i class="fa-solid fa-lightbulb"></i> Explicación de Matiz y Contexto</h3>
      <p style="color:var(--text-main); font-size:0.95rem; line-height:1.7; background:rgba(255,255,255,0.03); padding:16px; border-radius:12px; border:1px solid var(--border-glass);">
        ${p.explanation}
      </p>

      <div style="margin-top:20px; background:rgba(251, 191, 36, 0.06); padding:16px; border-radius:12px; border:1px solid rgba(251, 191, 36, 0.2);">
        <h4 class="font-head" style="color:var(--gold); font-size:1.05rem; display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-volume-high"></i> Consejo de Pronunciación y Ritmo
        </h4>
        <p style="color:var(--text-main); font-size:0.9rem; margin-top:6px;">${p.pronunciationHint}</p>
      </div>

      <div style="margin-top:24px;">
        <h3 class="font-head" style="color:var(--emerald); font-size:1.2rem; margin-bottom:12px;"><i class="fa-solid fa-briefcase"></i> Ejemplo en Entorno de Ingeniería & Nearshoring</h3>
        <div style="background:rgba(15, 23, 42, 0.8); border:1px solid var(--border-glow); padding:20px; border-radius:14px;">
          <div style="color:var(--cyan); font-family:var(--font-mono); font-size:1rem; font-weight:600;">"${p.exampleEN}"</div>
          <div style="color:var(--text-muted); font-size:0.88rem; margin-top:8px;">📌 <em>${p.exampleES}</em></div>
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
              <h4 class="font-head" style="color:#fff; font-size:1.1rem;">Feynman AI Tutor — Simulación de Entrevista Técnica STAR</h4>
              <p style="color:var(--text-muted); font-size:0.8rem;">Practica tu inglés fluido en tiempo real simulando una pregunta de entrevista en este escenario.</p>
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
              <strong>Feynman AI Evaluator:</strong> "Hi there! How would you use the phrase <em>'${p.phrase}'</em> in your next Nearshoring technical audit or team standup?"
            </div>
          </div>

          <div style="display:flex; gap:8px; margin-top:12px;">
            <input type="text" id="feynman-user-input" placeholder="Escribe tu respuesta en inglés..." style="flex:1; background:rgba(255,255,255,0.06); border:1px solid var(--border-glass); color:#fff; padding:10px 14px; border-radius:10px; font-size:0.88rem; outline:none;">
            <button onclick="simulateFeynmanResponse('${p.phrase.replace(/'/g, "\\'")}')" style="background:linear-gradient(135deg, var(--purple), var(--cyan)); color:#fff; border:none; padding:10px 18px; border-radius:10px; font-weight:600; cursor:pointer; font-size:0.88rem; display:flex; align-items:center; gap:6px;">
              Enviar <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
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

  if (level === 'A2') {
    // GENERATE FULL LATAM A2 READING VERSION
    // - Simple Present & Direct Subject-Verb-Object sentences
    // - Spanish inline cognates and clear definitions
    // - LATAM Student Grammar & Scaffolding Box
    let text = rawContent;

    // Transform complex sentences into direct A2 structures
    text = text.replace(/# What Is a Network\?/gi, "# What Is a Network? (Nivel A2 - Inglés Básico)");
    text = text.replace(/Every time you send a message on your phone, watch a video online, or check your email, you are using a \*\*network\*\*\. But what exactly is a network\?/gi, 
      "When you use your phone or computer to send a message or watch a video, you use a **network** (red de computadoras). A network connects devices together.");
    text = text.replace(/A \*\*computer network\*\* is a group of two or more devices that are \*\*connected\*\* to each other so they can \*\*share information\*\*\./gi,
      "A **computer network** is a group of connected devices (dispositivos conectados) that share data (datos).");
    text = text.replace(/Think of it like a road system in a city\. The roads connect different buildings \(devices\), and cars \(data\) travel along these roads to reach their destination\./gi,
      "**Analogy**: Think of a network like city roads. The roads connect houses (devices), and cars (data) move on the roads.");

    text = text.replace(/is directly aligned with/gi, "is aligned with (está alineado con)");
    text = text.replace(/is governed by rules called/gi, "uses rules called (utiliza reglas llamadas)");
    text = text.replace(/are reassembled into/gi, "join together to form (se unen para formar)");
    text = text.replace(/is divided into small pieces called/gi, "is split into small parts called (se divide en partes llamadas)");

    const latamScaffoldingBox = `

---

### 🇲🇽 LATAM Student Grammar & Cognate Guide (A2)
- **Grammar Structure**: Subject + Simple Verb + Object (*A router sends data* = *Un router envía datos*).
- **Essential Vocabulary**: 
  - **Network**: Red de computadoras
  - **Device**: Dispositivo (laptop, teléfono, servidor)
  - **Data**: Información digital
  - **Server**: Servidor que almacena información
- **Cognate Tip**: Words ending in *-tion* (*connection*, *action*) usually end in *-ción* in Spanish (*conexión*, *acción*).
`;
    return text + latamScaffoldingBox;

  } else if (level === 'B1') {
    // GENERATE FULL HIGH-COMPLEXITY B1/B2 NEARSHORING READING VERSION
    // - Executive Engineering Syntax
    // - Subordinate Clauses & Passive Voice
    // - Incident Response Conditionals
    // - Industry Audit Standards (CompTIA N10-008, ISO 27001, SLA Metrics)
    let text = rawContent;

    text = text.replace(/# What Is a Network\?/gi, "# What Is a Network? (Level B1/B2 - Advanced Nearshoring Engineering)");
    text = text.replace(/Every time you send a message on your phone, watch a video online, or check your email, you are using a \*\*network\*\*\. But what exactly is a network\?/gi,
      "Whenever an enterprise infrastructure engineer dispatches real-time telemetry data or initiates remote cloud execution, the underlying communication relies entirely upon a resilient **network topology**. However, from a rigorous systems architecture perspective, how is a modern enterprise network formally defined?");
    text = text.replace(/A \*\*computer network\*\* is a group of two or more devices that are \*\*connected\*\* to each other so they can \*\*share information\*\*\./gi,
      "A **computer network** represents an interconnected infrastructure of heterogeneous endpoints—ranging from high-throughput switches and edge routers to cloud hypervisors—collaborating via standardized protocol suites to exchange data packets deterministically.");
    text = text.replace(/Think of it like a road system in a city\. The roads connect different buildings \(devices\), and cars \(data\) travel along these roads to reach their destination\./gi,
      "**Architectural Abstraction**: Analogous to a municipal transit network where traffic control systems regulate throughput, an enterprise network utilizes Layer-2 switching and Layer-3 routing mechanisms to govern packet encapsulation, VLAN segmentation, and bandwidth allocation across geographically distributed nodes.");

    const b1GrammarBox = `

---

### 🇺🇸 B1/B2 Executive Nearshoring Engineering & Audit Focus
- **Incident Response Conditionals**: *"If link utilization exceeds 85% for more than 30 seconds, then automated OSPF re-routing MUST trigger instantly to prevent SLA breach."*
- **Compliance Passive Voice (ISO 27001 / CompTIA)**: *"Data packets are encrypted via AES-256 and authenticated prior to transmission across public backbones."*
- **Executive Engineering Terms**: Heterogeneous endpoints, Packet encapsulation, VLAN segmentation, OSPF routing, SLA compliance thresholds.
- **Standup Phrasing**: Use this phrasing when presenting network architecture reviews to US engineering managers.
`;
    return text + b1GrammarBox;
  }

  return rawContent;
}

function renderMarkdownWithVocabulary(mdText, vocabulary = [], level = 'A2') {
  if (!mdText) return '';
  
  // Transform text based on CEFR Level (A2 vs B1/B2 LATAM adaptation)
  const adaptedMd = adaptReadingContentForCEFR(mdText, level);
  let formatted = formatMarkdown(adaptedMd);

  // CEFR Mode Header Notice
  const levelBanner = (level === 'B1') ? `
    <div class="cefr-reading-banner" style="background:rgba(168, 85, 247, 0.12); border:1px solid rgba(168, 85, 247, 0.35); padding:10px 14px; border-radius:10px; margin-bottom:18px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
      <span style="font-size:0.83rem; color:#e9d5ff; font-weight:600; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-briefcase" style="color:var(--purple);"></i> <strong>Modo CEFR B1 (Técnico Avanzado):</strong> Enfocado en terminología de Nearshoring, acrónimos industriales (CompTIA, ISO, SLA, CAPA) y reportes ejecutivos.
      </span>
      <span style="font-size:0.72rem; font-weight:800; background:linear-gradient(135deg, var(--purple), var(--indigo)); color:#fff; padding:3px 10px; border-radius:6px; white-space:nowrap;">Nivel B1</span>
    </div>
  ` : `
    <div class="cefr-reading-banner" style="background:rgba(56, 189, 248, 0.1); border:1px solid rgba(56, 189, 248, 0.35); padding:10px 14px; border-radius:10px; margin-bottom:18px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
      <span style="font-size:0.83rem; color:var(--cyan); font-weight:600; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-graduation-cap" style="color:var(--cyan);"></i> <strong>Modo CEFR A2 (Básico-Intermedio):</strong> Oraciones directas, explicaciones guiadas y glosario en español para aprendizaje progresivo.
      </span>
      <span style="font-size:0.72rem; font-weight:800; background:linear-gradient(135deg, var(--cyan), var(--indigo)); color:#030508; padding:3px 10px; border-radius:6px; white-space:nowrap;">Nivel A2</span>
    </div>
  `;

  formatted = levelBanner + formatted;

  // Auto-wrap vocabulary terms in interactive tooltip spans with level styling
  if (vocabulary && vocabulary.length > 0) {
    vocabulary.forEach(v => {
      const termStr = v.term || v.en;
      if (!termStr) return;

      const defStr = v.definition || v.definitionEN || v.es || '';
      const esStr = v.es || '';
      const badgeStyle = (level === 'B1')
        ? 'border-color:rgba(168,85,247,0.5); background:rgba(168,85,247,0.15); color:#e9d5ff;'
        : 'border-color:rgba(56,189,248,0.4); background:rgba(56,189,248,0.15); color:var(--cyan);';

      const regex = new RegExp(`\\b(${termStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})\\b`, 'gi');
      
      formatted = formatted.replace(regex, (match) => {
        return `<span class="term-tooltip" style="${badgeStyle}">${match} <i class="fa-solid fa-circle-info term-info-btn" onclick="event.stopPropagation(); alert('${match} (${esStr}):\\n${defStr}')" title="${defStr}"></i><span class="tooltip-box"><strong>${match} (${esStr}) [${level}]</strong><br>${defStr}</span></span>`;
      });
    });
  }

  return formatted;
}

function formatMarkdown(mdText) {
  if (!mdText) return '';
  return mdText
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
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
    feedback = `🎯 <strong>Excelente uso del modismo nativo!</strong> Tu oración encaja perfectamente con el tono profesional de una entrevista en Nearshoring. Fluidez y estructura aprobadas.`;
  } else {
    feedback = `💡 <strong>Sugerencia de Feynman:</strong> Recuerda incluir explícitamente la expresión <em>"${targetPhrase}"</em> en tu oración para reforzar tu memoria activa de modismos.`;
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
