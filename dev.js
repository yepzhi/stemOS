/**
 * stemOS Dev Content Studio — JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initStudio();
});

function initStudio() {
  const coursesData = window.LXP_COURSES || {};
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
        const statusClass = readingsCount > 0 ? 'full' : 'draft';
        const statusLabel = readingsCount > 0 ? `${readingsCount} Lectura(s)` : 'En desarrollo';

        html += `
          <div class="module-card" data-track-id="${track.id}" data-mod-id="${mod.id}">
            <div class="card-top">
              <div class="module-icon-box">
                <i class="${mod.icon || 'fa-solid fa-book-open'}"></i>
              </div>
              <span class="module-tag">${track.standard || 'CONOCER / NGSS'}</span>
            </div>

            <div class="card-body">
              <h3 class="card-title-es">${mod.titleES || mod.title}</h3>
              <p class="card-title-en">${mod.title}</p>
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

  let contentHtml = '';

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
