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
  
  // Offline fallback: load from LocalStorage if window object is missing
  if (!coursesData || Object.keys(coursesData).length === 0) {
    try {
      const cached = localStorage.getItem('stemos_dev_courses_v1.0.3');
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
  const phrases = (typeof STEMOS_PHRASES !== 'undefined' ? STEMOS_PHRASES : (window.STEMOS_PHRASES || []));
  
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
  setupOfflineController(tracks);
}

function setupOfflineController(tracks) {
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
        saveCoursesToLocalStorage(tracks);
      }
    });
  }

  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      saveCoursesToLocalStorage(tracks);
      const originalText = syncBtn.innerHTML;
      syncBtn.innerHTML = `<i class="fa-solid fa-check" style="color:var(--emerald);"></i> Saved!`;
      setTimeout(() => {
        syncBtn.innerHTML = originalText;
      }, 2000);
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

function saveCoursesToLocalStorage(tracks) {
  try {
    if (tracks && tracks.length > 0) {
      localStorage.setItem('stemos_dev_courses_v1.0.3', JSON.stringify(tracks));
    }
  } catch (err) {
    console.warn('[stemOS Cache] LocalStorage write warning:', err);
  }
}

function renderFilters(tracks, phrases = []) {
  const filterContainer = document.getElementById('track-filters');
  if (!filterContainer) return;

  let html = `<button class="filter-btn active" data-track="all"><i class="fa-solid fa-layer-group"></i> Todos los Tracks (${tracks.length})</button>`;
  
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

  let html = '';

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
              <span class="module-tag">${track.title}</span>
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
    contentHtml = `
      <div class="reader-content" style="text-align:center; padding:48px;">
        <i class="fa-solid fa-pen-ruler" style="font-size:2.5rem; color:var(--gold); margin-bottom:16px;"></i>
        <h3 class="font-head" style="color:#fff;">Módulo en Fase de Redacción</h3>
        <p style="color:var(--text-muted); margin-top:8px;">Este módulo está contemplado en la malla de Nearshoring de stemOS. Próximamente se generarán las lecturas y evaluaciones socráticas correspondientes.</p>
      </div>
    `;
  }

  drawerBody.innerHTML = contentHtml;
  backdrop.classList.add('active');
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
