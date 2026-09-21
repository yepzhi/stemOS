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

  if (statTracks) statTracks.innerText = tracks.length;
  if (statModules) statModules.innerText = totalModules;
  if (statReadings) statReadings.innerText = totalReadings;
  if (statQuestions) statQuestions.innerText = totalQuestions;
  if (statPhrases) statPhrases.innerText = phrases.length;

  // Render Filters
  renderFilters(tracks, phrases);

  // Render Modules Grid
  renderGrid(tracks, phrases);

  // Setup Event Listeners & Offline Controller
  setupSearch(tracks);
  setupDrawer(tracks);
  setupOfflineController(tracks, phrases);
  setupLevelSwitcher(tracks, phrases);
  setupSupasteInteractions(tracks, phrases);
  setupExamModalListeners(tracks);
  setupVocabPopoverListeners();
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

function renderFilters(tracks, phrases = []) {
  const filterContainer = document.getElementById('track-filters');
  if (!filterContainer) return;

  const techCount = tracks.filter(t => (t.category || 'technology') === 'technology').length;
  const engCount = tracks.filter(t => t.category === 'engineering').length;
  const sciCount = tracks.filter(t => t.category === 'science').length;
  const carCount = tracks.filter(t => t.category === 'career').length;

  let html = `
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

  if (trackId === 'all') {
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

  if (trackId === 'phrases') {
    unitsGrid.style.display = 'none';
    if (legacyGrid) {
      legacyGrid.style.display = 'block';
      const phrasesSec = document.getElementById('section-phrases');
      if (phrasesSec) phrasesSec.style.display = 'block';
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

          <div class="reading-accordion-body">
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

            ${(r.questions && r.questions.length > 0) ? `
              <div class="reading-quiz-section" id="quiz-sec-${mod.id}-${idx}">
                <div class="quiz-section-header">
                  <div class="quiz-section-title">
                    <i class="fa-solid fa-clipboard-question" style="color:var(--blue-core);"></i>
                    <span>Formative Comprehension Check (${r.questions.length} Technical Questions)</span>
                  </div>
                  <span style="font-size:0.75rem; font-weight:700; color:#0284c7; background:#e0f2fe; padding:3px 10px; border-radius:6px; border:1px solid #bae6fd;">
                    Active ESP Evaluation
                  </span>
                </div>

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
  drawerSub.innerText = `Native Technical Idioms • ${p.category.toUpperCase()} • ID: ${p.id}`;

  let contentHtml = `
    <div class="accreditation-banner" style="border-color: rgba(251, 191, 36, 0.35);">
      <h3 class="font-head" style="color:var(--gold); font-size:1.2rem; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-bolt"></i> Direct Contrast: Textbook English vs. Real Native English
      </h3>
      <p style="font-size:0.86rem; color:var(--text-muted); margin-top:4px;">
        Authentic technical expressions used by engineers, technical managers, and nearshoring leaders in advanced high-tech industries.
      </p>

      <div class="accred-grid" style="margin-top:16px;">
        <div class="accred-box" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.08);">
          <div class="accred-title" style="color: #f87171;"><i class="fa-solid fa-school"></i> What Traditional Schools Teach</div>
          <div class="accred-desc" style="color: #fca5a5; font-size:1rem;"><s>${p.schoolVsNative.school}</s></div>
          <div class="accred-sub">Rigid, overly literal, or outdated phrasing</div>
        </div>

        <div class="accred-box" style="border-color: rgba(52, 211, 153, 0.35); background: rgba(52, 211, 153, 0.08);">
          <div class="accred-title" style="color:var(--emerald);"><i class="fa-solid fa-bolt"></i> How Real Natives Say It</div>
          <div class="accred-desc" style="color:#fff; font-size:1.1rem; font-weight:700;">"${p.schoolVsNative.native}"</div>
          <div class="accred-sub">Natural, fluid, high-impact industry communication</div>
        </div>
      </div>
    </div>

    <div style="margin-top:28px;">
      <h3 class="font-head" style="color:var(--cyan); font-size:1.2rem; margin-bottom:10px;"><i class="fa-solid fa-lightbulb"></i> Nuance & Context Breakdown</h3>
      <p style="color:var(--text-main); font-size:0.95rem; line-height:1.7; background:rgba(255,255,255,0.03); padding:16px; border-radius:12px; border:1px solid var(--border-glass);">
        ${p.explanation}
      </p>

      <div style="margin-top:20px; background:rgba(251, 191, 36, 0.06); padding:16px; border-radius:12px; border:1px solid rgba(251, 191, 36, 0.2);">
        <h4 class="font-head" style="color:var(--gold); font-size:1.05rem; display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-volume-high"></i> Pronunciation & Rhythm Tip
        </h4>
        <p style="color:var(--text-main); font-size:0.9rem; margin-top:6px;">${p.pronunciationHint}</p>
      </div>

      <div style="margin-top:24px;">
        <h3 class="font-head" style="color:var(--emerald); font-size:1.2rem; margin-bottom:12px;"><i class="fa-solid fa-briefcase"></i> Real-World Engineering & Nearshoring Context</h3>
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



