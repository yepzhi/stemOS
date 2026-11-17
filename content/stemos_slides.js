/**
 * ==============================================================================
 * stemOS LXP — Visor Interactivo de Slides de Clase (50 Minutos)
 * Basado en elemento nativo <dialog> (.showModal) conforme a estándares W3C/ARIA.
 * Sin dependencias externas, compatible con CSP strict y proyector de aula.
 * ==============================================================================
 */
(function (root, factory) {
  const result = factory(root);
  if (typeof define === 'function' && define.amd) {
    define([], () => result);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = result;
  }
  if (typeof root !== 'undefined') {
    root.STEMOS_SLIDES = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_SLIDES = result;
  }
}(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  let dialogEl = null;
  let currentSlides = [];
  let currentIndex = 0;
  let currentMeta = {};

  function esc(val) {
    return String(val == null ? '' : val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function injectStyles() {
    if (typeof document === 'undefined' || document.getElementById('stemos-slides-style')) return;
    const style = document.createElement('style');
    style.id = 'stemos-slides-style';
    style.textContent = `
      dialog#stemos-slides-dialog {
        margin: auto;
        width: min(960px, 95vw);
        max-width: 960px;
        max-height: 92dvh;
        border: 2px solid #cbd5e1;
        border-radius: 22px;
        padding: 0;
        background: #ffffff;
        color: #0f172a;
        box-shadow: 0 28px 80px rgba(15, 23, 42, 0.32);
        overflow: hidden;
        overscroll-behavior: contain;
        font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      }
      dialog#stemos-slides-dialog::backdrop {
        background: rgba(15, 23, 42, 0.72);
        backdrop-filter: blur(4px);
        overflow: hidden;
        overscroll-behavior: contain;
      }
      .slides-shell {
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 520px;
        max-height: 92dvh;
      }
      .slides-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 20px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
      }
      .slides-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 800;
        background: #dcfce7;
        color: #166534;
        border: 1px solid #86efac;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .slides-stage {
        padding: 26px 32px;
        overflow-y: auto;
        overscroll-behavior: contain;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }
      .slides-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 12px 20px;
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
      }
      .slide-btn {
        appearance: none;
        border: 2px solid #e2e8f0;
        background: #ffffff;
        color: #0f172a;
        border-radius: 12px;
        padding: 8px 14px;
        font-weight: 800;
        font-size: 0.85rem;
        cursor: pointer;
        transition: transform 0.1s ease, background 0.15s ease;
      }
      .slide-btn:hover { background: #f1f5f9; }
      .slide-btn.primary {
        background: #58cc02;
        color: #ffffff;
        border-color: #46a302;
        box-shadow: 0 3px 0 #46a302;
      }
      .slide-btn.primary:hover { background: #4eb802; }
      .slide-btn.blue {
        background: #1cb0f6;
        color: #ffffff;
        border-color: #0e8ac7;
        box-shadow: 0 3px 0 #0e8ac7;
      }
      .slide-h2 {
        font-size: clamp(1.35rem, 2.5vw, 1.85rem);
        font-weight: 900;
        line-height: 1.2;
        color: #0f172a;
        margin: 0;
      }
      .slide-sub {
        font-size: 1.02rem;
        color: #475569;
        margin: 0;
        line-height: 1.5;
      }
      .slide-card {
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        padding: 16px 18px;
      }
      .slide-grid-2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 14px;
      }
      .slide-vocab-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 12px;
      }
      .slide-speak-btn {
        border: 1px solid #bae6fd;
        background: #e0f2fe;
        color: #0369a1;
        border-radius: 8px;
        padding: 3px 8px;
        font-size: 0.72rem;
        font-weight: 800;
        cursor: pointer;
      }
      .slide-dots {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .slide-dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: #cbd5e1;
        border: none;
        padding: 0;
        cursor: pointer;
      }
      .slide-dot.active {
        width: 24px;
        background: #58cc02;
      }
    `;
    document.head.appendChild(style);
  }

  function speakText(text) {
    if (!text) return;
    const ttsApi = (typeof STEMOS_TTS !== 'undefined' && STEMOS_TTS) || (root && root.STEMOS_TTS);
    if (ttsApi && typeof ttsApi.speak === 'function') {
      ttsApi.speak(text, { lang: 'en-US' });
      return;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.94;
        window.speechSynthesis.speak(u);
      } catch (_) {}
    }
  }

  function buildSlidesFromPayload(payload) {
    if (!payload) return [];
    if (Array.isArray(payload.slidesDeck) && payload.slidesDeck.length) {
      return payload.slidesDeck;
    }
    const vocab = (payload.vocab || payload.vocabulary || []).slice(0, 6);
    const lines = Array.isArray(payload.dialogue)
      ? payload.dialogue
      : (payload.dialogue && Array.isArray(payload.dialogue.lines) ? payload.dialogue.lines : []);
    const act = payload.classroomActivity || { title: 'Práctica en Aula', steps: ['Trabajo colaborativo en parejas (12 min).'] };
    return [
      {
        n: 1,
        kind: 'cover',
        title: payload.title,
        subtitle: payload.titleES || payload.title,
        badge: `${payload.level || 'MCER'} · 50 MIN`,
        canDo: payload.canDo || '',
        industryTag: payload.industryContext || ''
      },
      {
        n: 2,
        kind: 'hook',
        title: 'Situación Real & Contraste Clave',
        context: payload.warmupPrompt || payload.canDo || '',
        comparisonWrong: (payload.commonMistake && payload.commonMistake.bad) || 'Traducción literal palabra por palabra.',
        comparisonRight: (payload.commonMistake && payload.commonMistake.good) || 'Uso contextual preciso.',
        note: (payload.commonMistake && payload.commonMistake.exp) || ''
      },
      {
        n: 3,
        kind: 'formula',
        title: 'Estructura Visual & Regla de Oro',
        formulaHtml: payload.grammarFormulaHtml || (payload.grammarBox && payload.grammarBox.formula) || '',
        explanationES: payload.explanationES || (payload.grammarBox && payload.grammarBox.explanation) || '',
        goldenRule: payload.goldenRuleES || (payload.grammarBox && payload.grammarBox.goldenRule) || ''
      },
      {
        n: 4,
        kind: 'vocab',
        title: 'Vocabulario Esencial & Acento Prosódico',
        items: vocab
      },
      {
        n: 5,
        kind: 'dialogue',
        title: 'Diálogo Modelado & Falso Cognado',
        lines,
        falseCognate: payload.falseCognate || (payload.falseCognates && payload.falseCognates[0]) || null
      },
      {
        n: 6,
        kind: 'activity',
        title: 'Dinámica en Aula & Reto Online Duolingo',
        activityTitle: act.title,
        steps: act.steps || [],
        duoMinutes: payload.onlinePracticeMinutes || 18
      }
    ];
  }

  function renderSlideContent(slide) {
    if (!slide) return '';
    if (slide.kind === 'cover') {
      return `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div><span class="slides-badge">${esc(slide.badge)}</span></div>
          <h2 class="slide-h2">${esc(slide.title)}</h2>
          <p class="slide-sub" style="font-weight:700;color:#1e293b;">${esc(slide.subtitle)}</p>
          <div class="slide-card" style="background:#f0fdf4;border-color:#86efac;">
            <div style="font-size:0.75rem;font-weight:900;color:#166534;text-transform:uppercase;margin-bottom:4px;">Objetivo Can-Do (50 Minutos)</div>
            <div style="font-size:1.05rem;font-weight:700;color:#0f172a;">${esc(slide.canDo)}</div>
          </div>
          <div class="slide-card">
            <div style="font-size:0.75rem;font-weight:900;color:#0369a1;text-transform:uppercase;margin-bottom:4px;">Entorno Cotidiano &amp; Industrial</div>
            <div style="font-size:0.95rem;color:#334155;">${esc(slide.industryTag)}</div>
          </div>
        </div>
      `;
    }
    if (slide.kind === 'hook') {
      return `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <h2 class="slide-h2">${esc(slide.title)}</h2>
          <div class="slide-card" style="background:#eff6ff;border-color:#93c5fd;">
            <div style="font-weight:700;color:#1e3a8a;font-size:1.02rem;">${esc(slide.context)}</div>
          </div>
          <div class="slide-grid-2">
            <div class="slide-card" style="background:#fef2f2;border-color:#fca5a5;">
              <div style="font-size:0.75rem;font-weight:900;color:#b91c1c;margin-bottom:6px;">✗ ERROR COMÚN / CALCO</div>
              <div style="font-family:ui-monospace,monospace;font-size:0.98rem;font-weight:700;color:#7f1d1d;">${esc(slide.comparisonWrong)}</div>
            </div>
            <div class="slide-card" style="background:#f0fdf4;border-color:#86efac;">
              <div style="font-size:0.75rem;font-weight:900;color:#15803d;margin-bottom:6px;">✓ INGLÉS ESTÁNDAR NATURAL</div>
              <div style="font-family:ui-monospace,monospace;font-size:0.98rem;font-weight:700;color:#14532d;">${esc(slide.comparisonRight)}</div>
            </div>
          </div>
          ${slide.note ? `<p class="slide-sub" style="font-size:0.92rem;"><strong>Por qué:</strong> ${esc(slide.note)}</p>` : ''}
        </div>
      `;
    }
    if (slide.kind === 'formula') {
      return `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <h2 class="slide-h2">${esc(slide.title)}</h2>
          <div class="slide-card">${slide.formulaHtml || ''}</div>
          <div style="font-size:0.98rem;line-height:1.55;color:#1e293b;">${slide.explanationES || ''}</div>
          ${slide.goldenRule ? `<div class="slide-card" style="background:#fefce8;border-color:#fde047;"><strong style="color:#854d0e;">Regla de Oro:</strong> <span style="color:#713f12;">${slide.goldenRule}</span></div>` : ''}
        </div>
      `;
    }
    if (slide.kind === 'vocab') {
      const items = Array.isArray(slide.items) ? slide.items : [];
      return `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <h2 class="slide-h2">${esc(slide.title)}</h2>
          <div class="slide-vocab-grid">
            ${items.map((v, idx) => `
              <div class="slide-card" style="padding:12px 14px;display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
                  <strong style="font-size:1.05rem;color:#0f172a;">${esc(v.en)}</strong>
                  <button type="button" class="slide-speak-btn" data-speak-idx="${idx}" aria-label="Escuchar ${esc(v.en)}">🔊 Oír</button>
                </div>
                <div style="font-size:0.86rem;font-weight:700;color:#475569;">${esc(v.es)}</div>
                ${v.pinkStress ? `<div style="font-size:0.74rem;font-weight:800;color:#db2777;">Acento: ${esc(v.pinkStress)} ${v.ipa ? `· ${esc(v.ipa)}` : ''}</div>` : ''}
                ${v.example ? `<div style="font-size:0.78rem;color:#334155;border-top:1px solid #e2e8f0;padding-top:4px;margin-top:2px;">"${esc(v.example)}"</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    if (slide.kind === 'dialogue') {
      const lines = Array.isArray(slide.lines) ? slide.lines : [];
      const fc = slide.falseCognate;
      return `
        <div style="display:flex;flex-direction:column;gap:12px;">
          <h2 class="slide-h2">${esc(slide.title)}</h2>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${lines.map((l, idx) => `
              <div class="slide-card" style="padding:10px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <div>
                  <span style="font-size:0.75rem;font-weight:900;color:#0369a1;text-transform:uppercase;">${esc(l.speaker)}:</span>
                  <span style="font-weight:700;color:#0f172a;"> ${esc(l.en)}</span>
                  <div style="font-size:0.82rem;color:#64748b;">${esc(l.es)}</div>
                </div>
                <button type="button" class="slide-speak-btn" data-speak-line="${idx}" aria-label="Escuchar diálogo">🔊</button>
              </div>
            `).join('')}
          </div>
          ${fc && fc.term ? `
            <div class="slide-card" style="background:#fff7ed;border-color:#fdba74;padding:10px 14px;">
              <strong style="color:#9a3412;">⚠ Trampa / Falso Cognado (${esc(fc.term)}):</strong>
              <span style="color:#7c2d12;font-size:0.88rem;"> Evita "${esc(fc.mistake)}" → Usa <strong>${esc(fc.correct)}</strong>. ${esc(fc.tip || '')}</span>
            </div>` : ''}
        </div>
      `;
    }
    // activity slide
    const steps = Array.isArray(slide.steps) ? slide.steps : [];
    return `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <h2 class="slide-h2">${esc(slide.title)}</h2>
        <div class="slide-card" style="background:#faf5ff;border-color:#d8b4fe;">
          <div style="font-size:0.75rem;font-weight:900;color:#6b21a8;text-transform:uppercase;">Actividad Presencial (12–15 min)</div>
          <h3 style="margin:4px 0 8px;color:#0f172a;">${esc(slide.activityTitle)}</h3>
          <ol style="margin:0;padding-left:20px;line-height:1.55;color:#1e293b;">
            ${steps.map((s) => `<li>${esc(s)}</li>`).join('')}
          </ol>
        </div>
        <div class="slide-card" style="background:#f0fdf4;border-color:#86efac;">
          <div style="font-weight:900;color:#166534;">🚀 Siguiente Bloque: Reto Online Duolingo (${esc(slide.duoMinutes || 18)} min)</div>
          <div style="font-size:0.9rem;color:#14532d;margin-top:4px;">Abre el módulo en tu dispositivo para completar Vocab Sprint, Sentence Builder, Audio Lab y Drills antes de imprimir tu Power Sheet de 1 hoja.</div>
        </div>
      </div>
    `;
  }

  function ensureDialog() {
    if (typeof document === 'undefined') return null;
    injectStyles();
    if (dialogEl && document.body.contains(dialogEl)) return dialogEl;
    dialogEl = document.createElement('dialog');
    dialogEl.id = 'stemos-slides-dialog';
    dialogEl.setAttribute('aria-labelledby', 'stemos-slides-title');
    dialogEl.innerHTML = `
      <div class="slides-shell">
        <div class="slides-topbar">
          <div>
            <span class="slides-badge" id="stemos-slides-badge">SLIDES 50M</span>
            <span id="stemos-slides-title" style="font-weight:800;font-size:0.92rem;color:#0f172a;margin-left:8px;"></span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span id="stemos-slides-counter" style="font-size:0.8rem;font-weight:800;color:#64748b;">1 / 6</span>
            <button type="button" class="slide-btn" id="stemos-slides-close" aria-label="Cerrar presentación">✕ Cerrar</button>
          </div>
        </div>
        <div class="slides-stage" id="stemos-slides-stage"></div>
        <div class="slides-footer">
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="slide-btn" id="stemos-slides-prev">← Anterior</button>
            <div class="slide-dots" id="stemos-slides-dots"></div>
            <button type="button" class="slide-btn primary" id="stemos-slides-next">Siguiente →</button>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="slide-btn" id="stemos-slides-powersheet">🖨 Power Sheet (1 Hoja)</button>
            <button type="button" class="slide-btn blue" id="stemos-slides-play-duo" style="display:none;">⚡ Iniciar Reto Duo</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(dialogEl);

    dialogEl.addEventListener('close', () => {
      dialogEl.returnValue = '';
    });
    dialogEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    });

    dialogEl.querySelector('#stemos-slides-close').addEventListener('click', closeDeck);
    dialogEl.querySelector('#stemos-slides-prev').addEventListener('click', prevSlide);
    dialogEl.querySelector('#stemos-slides-next').addEventListener('click', nextSlide);
    dialogEl.querySelector('#stemos-slides-powersheet').addEventListener('click', () => {
      if (currentMeta.powerSheetUrl && typeof window !== 'undefined') {
        window.open(currentMeta.powerSheetUrl, '_blank', 'noopener');
      }
    });
    dialogEl.querySelector('#stemos-slides-play-duo').addEventListener('click', () => {
      const cb = currentMeta.onStartDuo;
      closeDeck();
      if (typeof cb === 'function') cb();
    });

    return dialogEl;
  }

  function renderCurrentSlide() {
    if (!dialogEl) return;
    const slide = currentSlides[currentIndex];
    const stage = dialogEl.querySelector('#stemos-slides-stage');
    const counter = dialogEl.querySelector('#stemos-slides-counter');
    const dotsEl = dialogEl.querySelector('#stemos-slides-dots');
    const prevBtn = dialogEl.querySelector('#stemos-slides-prev');
    const nextBtn = dialogEl.querySelector('#stemos-slides-next');

    stage.innerHTML = renderSlideContent(slide);
    counter.textContent = `${currentIndex + 1} / ${currentSlides.length}`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === currentSlides.length - 1 ? '✓ Fin de Slides' : 'Siguiente →';

    dotsEl.innerHTML = currentSlides.map((_, idx) =>
      `<button type="button" class="slide-dot ${idx === currentIndex ? 'active' : ''}" data-dot="${idx}" aria-label="Slide ${idx + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.slide-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        currentIndex = Number(dot.getAttribute('data-dot')) || 0;
        renderCurrentSlide();
      });
    });

    // Attach TTS listeners cleanly
    if (slide && slide.kind === 'vocab' && Array.isArray(slide.items)) {
      stage.querySelectorAll('[data-speak-idx]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const item = slide.items[Number(btn.getAttribute('data-speak-idx'))];
          if (item) speakText(item.en);
        });
      });
    }
    if (slide && slide.kind === 'dialogue' && Array.isArray(slide.lines)) {
      stage.querySelectorAll('[data-speak-line]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const line = slide.lines[Number(btn.getAttribute('data-speak-line'))];
          if (line) speakText(line.en);
        });
      });
    }
  }

  function openDeck(payloadOrId, opts) {
    const options = opts || {};
    let payload = payloadOrId;
    if (typeof payloadOrId === 'string') {
      const clsApi = (typeof STEMOS_MCER_CLASSES !== 'undefined' && STEMOS_MCER_CLASSES) || (root && root.STEMOS_MCER_CLASSES);
      if (clsApi) payload = clsApi.getClassById(payloadOrId);
    }
    if (!payload) return false;

    const slides = buildSlidesFromPayload(payload);
    if (!slides.length) return false;

    const dlg = ensureDialog();
    if (!dlg) return false;

    currentSlides = slides;
    currentIndex = 0;
    const isEsp = !!payload.isEsp;
    const psUrl = options.powerSheetUrl || (isEsp
      ? `powersheet.html?esp=${encodeURIComponent(`${payload.trackId}:${payload.modId}`)}`
      : `powersheet.html?lesson=${encodeURIComponent(payload.id)}`);
    currentMeta = {
      id: payload.id,
      powerSheetUrl: psUrl,
      onStartDuo: options.onStartDuo || null
    };

    dlg.querySelector('#stemos-slides-badge').textContent = `${payload.level || 'MCER'} · 50 MIN`;
    dlg.querySelector('#stemos-slides-title').textContent = payload.titleES || payload.title || '';
    const duoBtn = dlg.querySelector('#stemos-slides-play-duo');
    duoBtn.style.display = typeof currentMeta.onStartDuo === 'function' ? 'inline-flex' : 'none';

    renderCurrentSlide();
    if (!dlg.open) {
      dlg.showModal();
    }
    return true;
  }

  function nextSlide() {
    if (currentIndex < currentSlides.length - 1) {
      currentIndex += 1;
      renderCurrentSlide();
    } else {
      closeDeck();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderCurrentSlide();
    }
  }

  function closeDeck() {
    if (dialogEl && dialogEl.open) {
      dialogEl.close('');
    }
  }

  return {
    version: '2026.11-slides-v1',
    buildSlidesFromPayload,
    openDeck,
    nextSlide,
    prevSlide,
    closeDeck
  };
}));
