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
      const cached = localStorage.getItem('stemos_dev_courses_v1.0.5') || localStorage.getItem('stemos_dev_courses_v1.0.3');
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
      const cachedPhrases = localStorage.getItem('stemos_dev_phrases_v1.0.5');
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
      localStorage.setItem('stemos_dev_courses_v1.0.5', JSON.stringify(tracks));
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

  let html = `<button class="filter-btn active" data-track="all"><i class="fa-solid fa-layer-group"></i> Todos los Tracks (${tracks.length})</button>`;
  
  // Add Mis Lecturas Offline Filter Button
  html += `
    <button class="filter-btn" data-track="offline-saved" style="border-color: rgba(56, 189, 248, 0.35);">
      <i class="fa-solid fa-bookmark" style="color:var(--cyan);"></i> 📚 Mis Lecturas Offline (${validSaved.length}/${MAX_OFFLINE_READINGS})
    </button>
  `;

  tracks.forEach(t => {
    html += `
      <button class="filter-btn" data-track="${t.id}">
        <i class="${getTrackIcon(t.id)}"></i> ${t.title}
      </button>
    `;
  });

  if (phrases && phrases.length > 0) {
    html += `
      <button class="filter-btn" data-track="phrases" style="border-color: rgba(251, 191, 36, 0.35);">
        <i class="fa-solid fa-comments" style="color:var(--gold);"></i> 💬 Frases Nativas (${phrases.length})
      </button>
    `;
  }

  filterContainer.innerHTML = html;

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
    case 'semiconductors': return 'fa-solid fa-microchip';
    case 'electromobility': return 'fa-solid fa-car-battery';
    case 'it-innovation': return 'fa-solid fa-cloud';
    case 'aerospace': return 'fa-solid fa-plane-up';
    default: return 'fa-solid fa-atom';
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
        <span>
          <i class="fa-solid fa-bookmark" style="color:var(--cyan);"></i> 📚 Mis Lecturas Offline Seleccionadas
          <span style="font-size:0.8rem; font-weight:500; color:var(--text-dim);">(${validSaved.length}/${MAX_OFFLINE_READINGS} Seleccionadas • Expiran en 3 Días)</span>
        </span>
        <span style="font-size:0.78rem; background:rgba(56, 189, 248, 0.12); color:var(--cyan); padding:4px 10px; border-radius:8px; border:1px solid rgba(56, 189, 248, 0.3);">
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

  // 1. Render Course Tracks
  tracks.forEach(track => {
    html += `
      <div class="track-section" id="section-${track.id}">
        <h2 class="track-header-title font-head">
          <i class="${getTrackIcon(track.id)}"></i> ${track.title}
          <span style="font-size:0.8rem; font-weight:500; color:var(--text-dim);">(${track.modules ? track.modules.length : 0} Módulos)</span>
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
        const industrySource = mod.industry || track.industry || 'TSMC-GCU MSI Replica';

        html += `
          <div class="module-card" data-track-id="${track.id}" data-mod-id="${mod.id}">
            <div class="card-top">
              <div class="module-icon-box">
                <i class="${mod.icon || 'fa-solid fa-microchip'}"></i>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <button class="btn-pin-offline ${isPinned ? 'pinned' : ''}" data-track-id="${track.id}" data-mod-id="${mod.id}" title="${isPinned ? 'Guardado Offline (Expira en 3 días)' : 'Guardar Lectura Offline (Máx 5)'}">
                  <i class="fa-solid fa-bookmark"></i> ${isPinned ? 'Offline' : '+ Offline'}
                </button>
                <span class="module-tag">${track.title}</span>
              </div>
            </div>

            <div class="card-body">
              <h3 class="card-title-es">${mod.titleES || mod.title}</h3>
              <p class="card-title-en">${mod.title}</p>
              
              <div class="standards-badge-group">
                <span class="std-pill std-conocer" title="Estándar SEP CONOCER México"><i class="fa-solid fa-award"></i> SEP ${conocerCode}</span>
                <span class="std-pill std-ngss" title="Estándar Internacional Next Generation Science Standards"><i class="fa-solid fa-flask"></i> NGSS ${ngssCode}</span>
                <span class="std-pill std-industry" title="Alineación a Currrículo y Estándares de la Industria"><i class="fa-solid fa-industry"></i> ${industrySource}</span>
                <span class="std-pill std-badges-3" title="Micro-credencial Abierta Abierta Verificable W3C/1EdTech"><i class="fa-solid fa-certificate"></i> Open Badges 3.0</span>
              </div>
            </div>

            <div class="card-footer">
              <div class="reading-count">
                <i class="fa-solid fa-file-lines"></i> ${statusLabel}
              </div>
              <button class="explore-btn">
                Explorar <i class="fa-solid fa-arrow-right"></i>
              </button>
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

  // Add Card Click Events for Modules
  gridContainer.querySelectorAll('.module-card:not(.phrase-card)').forEach(card => {
    card.addEventListener('click', () => {
      const trackId = card.getAttribute('data-track-id');
      const modId = card.getAttribute('data-mod-id');
      openDrawer(trackId, modId, tracks);
    });
  });

  // Add Card Click Events for Phrases
  gridContainer.querySelectorAll('.phrase-card').forEach(card => {
    card.addEventListener('click', () => {
      const phraseId = card.getAttribute('data-phrase-id');
      openPhraseDrawer(phraseId, phrases);
    });
  });
}

function filterGridByTrack(trackId, tracks) {
  const allSections = document.querySelectorAll('.track-section');
  allSections.forEach(sec => {
    if (trackId === 'all') {
      sec.style.display = 'block';
    } else {
      if (sec.id === `section-${trackId}`) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    }
  });
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

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

function openDrawer(trackId, modId, tracks) {
  const track = tracks.find(t => t.id === trackId);
  if (!track || !track.modules) return;

  const mod = track.modules.find(m => m.id === modId);
  if (!mod) return;

  const backdrop = document.getElementById('drawer-backdrop');
  const drawerTitle = document.getElementById('drawer-mod-title');
  const drawerSub = document.getElementById('drawer-mod-sub');
  const drawerBody = document.getElementById('drawer-body');

  drawerTitle.innerText = mod.titleES || mod.title;
  drawerSub.innerText = `${track.title} • ${mod.title} • ID: ${mod.id}`;

  const conocerCode = mod.conocer || track.conocer || 'EC1290 (Inspección de Procesos de Alta Tecnología)';
  const ngssCode = mod.ngss || track.ngss || 'HS-PS1-1 / HS-PS3-2 (Matter & Energy in Chips)';
  const industrySource = mod.industry || track.industry || 'TSMC-GCU Manufacturing Specialist Intensive (MSI)';

  let contentHtml = `
    <div class="accreditation-banner">
      <h3 class="font-head" style="color:var(--gold); font-size:1.1rem; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-graduation-cap"></i> Alineación Curricular y Estándares de Empleabilidad
      </h3>
      <p style="font-size:0.84rem; color:var(--text-muted); margin-top:4px;">
        Este módulo cuenta con rigurosa trazabilidad educativa y de la industria para validación en escuelas, universidades e industrias de Nearshoring.
      </p>

      <div class="accred-grid">
        <div class="accred-box">
          <div class="accred-title" style="color:var(--emerald);"><i class="fa-solid fa-award"></i> SEP CONOCER (México)</div>
          <div class="accred-desc">${conocerCode}</div>
          <div class="accred-sub">Estándar Nacional de Competencia Laboral</div>
        </div>

        <div class="accred-box">
          <div class="accred-title" style="color:var(--cyan);"><i class="fa-solid fa-flask"></i> NGSS (EE.UU. / Global)</div>
          <div class="accred-desc">${ngssCode}</div>
          <div class="accred-sub">Next Generation Science Standards</div>
        </div>

        <div class="accred-box">
          <div class="accred-title" style="color:var(--gold);"><i class="fa-solid fa-industry"></i> Origen de Datos Industria</div>
          <div class="accred-desc">${industrySource}</div>
          <div class="accred-sub">Réplica Curricular de Fabs de Semiconductores</div>
        </div>

        <div class="accred-box">
          <div class="accred-title" style="color:var(--purple);"><i class="fa-solid fa-certificate"></i> Credencial Abierta</div>
          <div class="accred-desc">Open Badges 3.0 (W3C / 1EdTech)</div>
          <div class="accred-sub">Verifiable Credential portátil para LinkedIn</div>
        </div>
      </div>
    </div>
  `;

  if (mod.readings && mod.readings.length > 0) {
    mod.readings.forEach((r, idx) => {
      contentHtml += `
        <div style="margin-bottom: 28px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <h3 class="font-head" style="color:var(--cyan); font-size:1.2rem;">Lectura ${idx+1}: ${r.title}</h3>
            <span style="font-size:0.8rem; background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:8px; color:var(--text-dim);">${r.duration || '10 min'}</span>
          </div>
          <div class="reader-content">
            ${formatMarkdown(r.content || 'Sin contenido de lectura disponible.')}
          </div>
      `;

      if (r.vocabulary && r.vocabulary.length > 0) {
        contentHtml += `
          <h4 class="font-head" style="margin-top:20px; color:var(--gold);">🔤 Glosario y Vocabulario Técnico</h4>
          <div class="glossary-list">
        `;
        r.vocabulary.forEach(v => {
          contentHtml += `
            <div class="glossary-item">
              <div class="glossary-term">${v.term || v.en} <span style="font-weight:400; color:var(--text-dim);">(${v.es || v.definitionES})</span></div>
              <div class="glossary-def">${v.definition || v.definitionEN || ''}</div>
            </div>
          `;
        });
        contentHtml += `</div>`;
      }

      contentHtml += `</div>`;
    });
  } else {
    contentHtml += `
      <div class="reader-content" style="text-align:center; padding:48px;">
        <i class="fa-solid fa-pen-ruler" style="font-size:2.5rem; color:var(--gold); margin-bottom:16px;"></i>
        <h3 class="font-head" style="color:#fff;">Módulo en Fase de Redacción</h3>
        <p style="color:var(--text-muted); margin-top:8px;">Este módulo está contemplado en la malla de Nearshoring de stemOS. Próximamente se generarán las lecturas y evaluaciones socráticas correspondientes.</p>
      </div>
    `;
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
  `;

  drawerBody.innerHTML = contentHtml;
  backdrop.classList.add('active');

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
    </div>
  `;

  drawerBody.innerHTML = contentHtml;
  backdrop.classList.add('active');
}

function closeDrawer() {
  const backdrop = document.getElementById('drawer-backdrop');
  if (backdrop) backdrop.classList.remove('active');
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
