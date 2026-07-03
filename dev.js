/**
 * stemOS Dev Content Studio — JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initStudio();
});

function initStudio() {
  const coursesData = (typeof LXP_COURSES !== 'undefined' ? LXP_COURSES : (window.LXP_COURSES || {}));
  const tracks = Object.values(coursesData);
  
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
  document.getElementById('stat-tracks').innerText = tracks.length;
  document.getElementById('stat-modules').innerText = totalModules;
  document.getElementById('stat-readings').innerText = totalReadings;

  // Render Filters
  renderFilters(tracks);

  // Render Modules Grid
  renderGrid(tracks);

  // Setup Event Listeners
  setupSearch(tracks);
  setupDrawer();
}

function renderFilters(tracks) {
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

function renderGrid(tracks) {
  const gridContainer = document.getElementById('studio-grid');
  if (!gridContainer) return;

  let html = '';

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

  gridContainer.innerHTML = html;

  // Add Card Click Events
  gridContainer.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', () => {
      const trackId = card.getAttribute('data-track-id');
      const modId = card.getAttribute('data-mod-id');
      openDrawer(trackId, modId, tracks);
    });
  });
}

function filterGridByTrack(trackId, tracks) {
  tracks.forEach(t => {
    const section = document.getElementById(`section-${t.id}`);
    if (section) {
      if (trackId === 'all' || trackId === t.id) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
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
