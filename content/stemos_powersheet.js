/**
 * ==============================================================================
 * stemOS LXP — Motor Generador de POWER SHEETS (1 Hoja Exacta) & Guía Docente 50m
 * Genera handouts imprimibles / descargables offline para:
 *   - 84 Clases Modulares MCER (a1-c01 .. c1-c12)
 *   - 16 Unidades Canónicas MCER (a1-u1 .. b2-u4)
 *   - Módulos ESP / Carreras STEM (esp:<trackId>:<modId>)
 *   - Impresión por lotes (?unit=a1-u1&batch=true o ?level=A1&batch=true)
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
    root.STEMOS_POWERSHEET = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_POWERSHEET = result;
  }
}(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  function esc(val) {
    return String(val == null ? '' : val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function resolveItem(query) {
    const q = query || {};
    const clsApi = (typeof STEMOS_MCER_CLASSES !== 'undefined' && STEMOS_MCER_CLASSES) || (root && root.STEMOS_MCER_CLASSES);
    const tracksApi = (typeof STEMOS_MCER_TRACKS !== 'undefined' && STEMOS_MCER_TRACKS) || (root && root.STEMOS_MCER_TRACKS);
    const espApi = (typeof STEMOS_ESP_DESIGNS !== 'undefined' && STEMOS_ESP_DESIGNS) || (root && root.STEMOS_ESP_DESIGNS);
    const pathsApi = (typeof STEMOS_CAREER_PATHS !== 'undefined' && STEMOS_CAREER_PATHS) || (root && root.STEMOS_CAREER_PATHS);
    const coursesMap = (typeof LXP_COURSES !== 'undefined' && LXP_COURSES) || (root && root.LXP_COURSES);

    if (q.esp) {
      const rawEsp = String(q.esp);
      const colonIdx = rawEsp.indexOf(':');
      const trackId = colonIdx >= 0 ? rawEsp.slice(0, colonIdx) : rawEsp;
      const modId = colonIdx >= 0 ? rawEsp.slice(colonIdx + 1) : 'M01';
      let modObj = null;
      let rawCourse = null;
      if (pathsApi) {
        const getter = pathsApi.getPathForCareer || pathsApi.getPath;
        const career = typeof getter === 'function' ? getter.call(pathsApi, trackId) : (pathsApi.careers && pathsApi.careers[trackId]);
        if (career && Array.isArray(career.modules)) {
          modObj = career.modules.find((m) => m.id === modId) || career.modules[0];
          rawCourse = { id: trackId, title: career.careerName, standard: (modObj && modObj.standard) || 'ABET / CACEI', modules: career.modules };
        }
      }
      if (!modObj && coursesMap && coursesMap[trackId]) {
        rawCourse = coursesMap[trackId];
        modObj = (rawCourse.modules || []).find((m) => m.id === modId) || (rawCourse.modules && rawCourse.modules[0]);
      }
      if (espApi && modObj) {
        return espApi.buildEspClassPayload(trackId, modObj, rawCourse);
      }
    }

    const lessonId = q.lesson || q.id;
    if (lessonId) {
      if (clsApi) {
        const cls = clsApi.getClassById(lessonId);
        if (cls) return cls;
      }
      if (tracksApi) {
        const unit = tracksApi.getUnitById(lessonId);
        if (unit) {
          return {
            id: unit.id,
            unitId: unit.id,
            level: unit.cefr || unit.levelCode || 'MCER',
            modularity: 'communicative-crucible',
            modularityMeta: { name: 'Modularidad Unidad Maestra MCER (Integración 50m)', onlineDuoMinutes: 20 },
            hasSlides: false,
            durationMinutes: 50,
            onlinePracticeMinutes: 20,
            title: unit.title,
            titleES: unit.titleES || unit.title,
            grammarFocus: unit.grammarFocus || '',
            canDo: unit.canDo || unit.cefrDescriptor || '',
            industryContext: unit.industryFocus || 'Entorno cotidiano e industrial Nearshoring STEM',
            grammarFormulaHtml: (unit.grammarBox && unit.grammarBox.formula) || '',
            explanationES: (unit.grammarBox && unit.grammarBox.explanation) || '',
            goldenRuleES: (unit.grammarBox && unit.grammarBox.goldenRule) || '',
            commonMistake: (unit.grammarBox && unit.grammarBox.commonMistake) || { bad: 'Traducción literal directa', good: 'Estructura comunicativa natural', exp: 'Revisa concordancia sujeto-verbo y registro.' },
            falseCognate: (unit.falseCognates && unit.falseCognates[0]) || null,
            vocab: (unit.vocabulary || []).slice(0, 6),
            dialogue: (unit.dialogue && unit.dialogue.lines) ? unit.dialogue.lines.slice(0, 4) : [],
            drills: (unit.grammarDrills && unit.grammarDrills.length ? unit.grammarDrills : unit.unitQuiz || []).slice(0, 4),
            instructionalPhases: [
              { block: '00–05 min', phase: 'Activación Can-Do', desc: 'Plantea el objetivo funcional de la unidad y conecta con experiencia diaria.' },
              { block: '05–15 min', phase: 'Síntesis Gramatical', desc: 'Revisa la fórmula clave en blocks visuales y alerta de falso cognado.' },
              { block: '15–28 min', phase: 'Práctica Guiada en Aula', desc: 'Roleplay breve por parejas aplicando léxico de la unidad.' },
              { block: '28–46 min', phase: 'Reto Online Duolingo (20 min)', desc: 'Completa los 5 micro-pasos digitales en app.html.' },
              { block: '46–50 min', phase: 'Exit Ticket & Power Sheet', desc: 'Autoevaluación en hoja de 1 página.' }
            ],
            classroomActivity: {
              title: 'Simulación Integradora de Unidad',
              grouping: 'Parejas rotativas',
              materials: 'Power Sheet de Unidad',
              steps: ['Practican diálogo base y luego sustituyen 2 datos propios.', 'Completan sección de producción escrita.']
            },
            powerSheet: {
              fillBlanks: [
                '1. Identify two key terms from this unit in context.',
                '2. Write one affirmative and one question sentence using today\'s formula.'
              ],
              reorder: ['English / practice / daily / builds / confidence / .'],
              writePrompt: (unit.writingLab && unit.writingLab.prompt) || 'Redacta 3–4 líneas aplicando la estructura central de la unidad:',
              answerKey: (unit.writingLab && unit.writingLab.sampleAnswer) || 'Verifica concordancia verbal y vocabulario clave de la unidad.'
            }
          };
        }
      }
    }
    return null;
  }

  function resolveBatch(query) {
    const q = query || {};
    const clsApi = (typeof STEMOS_MCER_CLASSES !== 'undefined' && STEMOS_MCER_CLASSES) || (root && root.STEMOS_MCER_CLASSES);
    const cfgApi = (typeof STEMOS_CURRICULUM_CONFIG !== 'undefined' && STEMOS_CURRICULUM_CONFIG) || (root && root.STEMOS_CURRICULUM_CONFIG);
    const espApi = (typeof STEMOS_ESP_DESIGNS !== 'undefined' && STEMOS_ESP_DESIGNS) || (root && root.STEMOS_ESP_DESIGNS);
    const pathsApi = (typeof STEMOS_CAREER_PATHS !== 'undefined' && STEMOS_CAREER_PATHS) || (root && root.STEMOS_CAREER_PATHS);
    const coursesMap = (typeof LXP_COURSES !== 'undefined' && LXP_COURSES) || (root && root.LXP_COURSES);
    const classId = q.classId || (cfgApi && cfgApi.getActiveStudentClassId()) || 'DEFAULT';

    if (q.unit && clsApi) {
      let list = clsApi.getClassesByUnit(q.unit);
      if (cfgApi && list.length) {
        const trackKey = cfgApi.getTrackKey('mcer', list[0].level);
        const eff = cfgApi.getEffectiveSequence(classId, trackKey, { includeHidden: false });
        const byId = {};
        list.forEach((c) => { byId[c.id] = c; });
        const ordered = eff.filter((e) => byId[e.id]).map((e) => byId[e.id]);
        if (ordered.length) list = ordered;
      }
      return list;
    }

    if (q.level && clsApi) {
      if (cfgApi) {
        const trackKey = cfgApi.getTrackKey('mcer', q.level);
        const eff = cfgApi.getEffectiveSequence(classId, trackKey, { includeHidden: false });
        if (eff.length) return eff.map((c) => clsApi.getClassById(c.id) || c);
      }
      return clsApi.getClassesByLevel(q.level);
    }

    if (q.espTrack && espApi) {
      let mods = [];
      let rawCourse = null;
      if (pathsApi) {
        const getter = pathsApi.getPathForCareer || pathsApi.getPath;
        const career = typeof getter === 'function' ? getter.call(pathsApi, q.espTrack) : (pathsApi.careers && pathsApi.careers[q.espTrack]);
        if (career && Array.isArray(career.modules)) {
          mods = career.modules;
          rawCourse = { id: q.espTrack, title: career.careerName, modules: career.modules };
        }
      }
      if (!mods.length && coursesMap && coursesMap[q.espTrack]) {
        rawCourse = coursesMap[q.espTrack];
        mods = rawCourse.modules || [];
      }
      if (cfgApi && mods.length) {
        const eff = cfgApi.getEffectiveSequence(classId, cfgApi.getTrackKey('esp', q.espTrack), { includeHidden: false, canonicalItems: mods });
        if (eff.length) mods = eff;
      }
      return mods.map((m) => espApi.buildEspClassPayload(q.espTrack, m, rawCourse));
    }

    const single = resolveItem(q);
    return single ? [single] : [];
  }

  function renderStudentSheet(item, opts) {
    const o = Object.assign({ showKey: true, cohortLabel: '' }, opts);
    const vocab = (item.vocab || []).slice(0, 6);
    const dialogue = (item.dialogue || []).slice(0, 4);
    const ps = item.powerSheet || {};
    const blanks = (ps.fillBlanks || []).slice(0, 4);
    const reorder = (ps.reorder || []).slice(0, 2);
    const fc = item.falseCognate;
    const phases = (item.instructionalPhases || []).slice(0, 5);
    const duoMin = item.onlinePracticeMinutes || 18;
    const clsBadge = `${item.level || 'MCER'} · ${String(item.id || '').toUpperCase()}`;

    return `
      <article class="ps-page ps-student" data-lesson-id="${esc(item.id)}">
        <header class="ps-head">
          <div class="ps-head-left">
            <div class="ps-brand-row">
              <span class="ps-logo">stemOS</span>
              <span class="ps-pill green">POWER SHEET · 1 HOJA</span>
              <span class="ps-pill blue">${esc(clsBadge)}</span>
              <span class="ps-pill purple">CLASE 50 MIN (${esc(duoMin)}M DUO ONLINE)</span>
              ${o.cohortLabel ? `<span class="ps-pill slate">${esc(o.cohortLabel)}</span>` : ''}
            </div>
            <h1 class="ps-title">${esc(item.title)}</h1>
            <div class="ps-subtitle">${esc(item.titleES || '')} — <em>${esc(item.industryContext || '')}</em></div>
          </div>
          <div class="ps-student-box">
            <div class="ps-field"><span>Nombre:</span><span class="ps-line"></span></div>
            <div class="ps-field"><span>Grupo / Fecha:</span><span class="ps-line"></span></div>
          </div>
        </header>

        <section class="ps-cando">
          <div><strong>🎯 Objetivo Can-Do de la Clase:</strong> ${esc(item.canDo || '')}</div>
          <div class="ps-pacing-strip">
            ${phases.map((p) => `<span class="ps-phase-chip"><b>${esc(p.block)}</b> ${esc(p.phase)}</span>`).join('')}
          </div>
        </section>

        <div class="ps-grid-main">
          <!-- COLUMNA IZQUIERDA: BLUEPRINT + LÉXICO + DIÁLOGO -->
          <div class="ps-col">
            <section class="ps-box accent-green">
              <div class="ps-box-title">1. FÓRMULA VISUAL &amp; REGLA DE ORO</div>
              <div class="ps-formula">${item.grammarFormulaHtml || ''}</div>
              <div class="ps-prose">${item.explanationES || ''}</div>
              ${item.goldenRuleES ? `<div class="ps-golden"><strong>💡 Regla de Oro:</strong> ${item.goldenRuleES}</div>` : ''}
              ${item.commonMistake && item.commonMistake.bad ? `
                <div class="ps-contrast">
                  <span class="ps-bad">✗ ${esc(item.commonMistake.bad)}</span>
                  <span class="ps-good">✓ ${esc(item.commonMistake.good)}</span>
                </div>` : ''}
            </section>

            <section class="ps-box accent-blue">
              <div class="ps-box-title">2. VOCABULARIO CLAVE &amp; ACENTO PROSÓDICO (${vocab.length} términos)</div>
              <div class="ps-vocab-list">
                ${vocab.map((v) => `
                  <div class="ps-vocab-row">
                    <div><strong>${esc(v.en)}</strong> ${v.pinkStress ? `<span class="ps-stress">[${esc(v.pinkStress)}]</span>` : ''} <span class="ps-es">· ${esc(v.es)}</span></div>
                    ${v.example ? `<div class="ps-ex">"${esc(v.example)}"</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </section>

            <section class="ps-box accent-amber">
              <div class="ps-box-title">3. MICRO-DIÁLOGO EN CONTEXTO &amp; ALERTA DE CALCO</div>
              <div class="ps-dialogue">
                ${dialogue.map((l) => `
                  <div class="ps-line-row"><b>${esc(l.speaker)}:</b> ${esc(l.en)} <span class="ps-es-mini">(${esc(l.es)})</span></div>
                `).join('')}
              </div>
              ${fc && fc.term ? `
                <div class="ps-false-cognate">
                  <b>⚠ Trampa (${esc(fc.term)}):</b> No es "${esc(fc.mistake)}" → Usa <b>${esc(fc.correct)}</b>.
                </div>` : ''}
            </section>
          </div>

          <!-- COLUMNA DERECHA: TALLER PRESENCIAL + PRÁCTICA ESCRITA EN HOJA + EXIT TICKET -->
          <div class="ps-col">
            <section class="ps-box accent-purple">
              <div class="ps-box-title">4. RETO COMUNICATIVO EN AULA (12–15 MIN)</div>
              <div class="ps-act-title">${esc((item.classroomActivity && item.classroomActivity.title) || 'Práctica en Parejas')}</div>
              <div class="ps-act-meta"><b>Agrupación:</b> ${esc((item.classroomActivity && item.classroomActivity.grouping) || 'Parejas')}</div>
              <ol class="ps-steps">
                ${((item.classroomActivity && item.classroomActivity.steps) || []).map((s) => `<li>${esc(s)}</li>`).join('')}
              </ol>
            </section>

            <section class="ps-box accent-slate">
              <div class="ps-box-title">5. EJERCICIOS DE REFUERZO PARA CASA (WRITE &amp; PRACTICE)</div>
              <div class="ps-subtitle-mini">A. Completa con la forma correcta:</div>
              <div class="ps-blanks">
                ${blanks.map((b) => `<div class="ps-blank-item">${esc(b)}</div>`).join('')}
              </div>
              ${reorder.length ? `
                <div class="ps-subtitle-mini" style="margin-top:5px;">B. Ordena las palabras en inglés correcto:</div>
                ${reorder.map((r) => `
                  <div class="ps-reorder-item">
                    <div class="ps-scramble">${esc(r)}</div>
                    <div class="ps-write-line"></div>
                  </div>
                `).join('')}
              ` : ''}
              <div class="ps-subtitle-mini" style="margin-top:5px;">C. ${esc(ps.writePrompt || 'Produce 2 oraciones aplicando el tema de hoy:')}</div>
              <div class="ps-write-lines">
                <div class="ps-write-line"></div>
                <div class="ps-write-line"></div>
                <div class="ps-write-line"></div>
              </div>
            </section>

            <section class="ps-box ps-exit-ticket">
              <div class="ps-box-title">6. EXIT TICKET (MIN 46–50) &amp; RETO ONLINE (${esc(duoMin)}M)</div>
              <div class="ps-exit-checks">
                <label>☐ Completé los ${(item.duoSteps && item.duoSteps.length) || 5} micro-pasos Duolingo en <b>stemOS</b></label>
                <label>☐ Puedo cumplir el "Can-Do" oral sin leer apuntes</label>
              </div>
              <div class="ps-deep-link">
                ⚡ Refuerza online: <code>app.html#play=${esc(item.id)}</code> · <b>+${esc(item.xp || 280)} XP</b>
              </div>
            </section>
          </div>
        </div>

        <footer class="ps-footer">
          <span>stemOS Dual Immersion Curriculum · EAQUALS &amp; MCER Aligned</span>
          ${o.showKey && ps.answerKey ? `<span class="ps-answer-key"><b>Autoevaluación:</b> ${esc(ps.answerKey)}</span>` : '<span>Conservar en portafolio del estudiante</span>'}
        </footer>
      </article>
    `;
  }

  function renderTeacherGuideSheet(item, opts) {
    const o = Object.assign({ cohortLabel: '' }, opts);
    const phases = item.instructionalPhases || [];
    const drills = (item.drills || []).slice(0, 4);
    const ps = item.powerSheet || {};
    const act = item.classroomActivity || {};
    const duoMin = item.onlinePracticeMinutes || 18;
    const modName = (item.modularityMeta && item.modularityMeta.name) || item.modularity || 'Modularidad 50m';

    return `
      <article class="ps-page ps-teacher" data-lesson-id="${esc(item.id)}">
        <header class="ps-head teacher">
          <div class="ps-head-left">
            <div class="ps-brand-row">
              <span class="ps-logo teacher">stemOS FACILITADOR</span>
              <span class="ps-pill purple">GUÍA DOCENTE 50 MIN</span>
              <span class="ps-pill blue">${esc(item.level || 'MCER')} · ${esc(String(item.id || '').toUpperCase())}</span>
              <span class="ps-pill green">${item.hasSlides ? '🖥 CON SLIDES PROYECTOR' : '📋 PIZARRA + HOJA'}</span>
              ${o.cohortLabel ? `<span class="ps-pill slate">${esc(o.cohortLabel)}</span>` : ''}
            </div>
            <h1 class="ps-title">${esc(item.title)} — ${esc(item.titleES || '')}</h1>
            <div class="ps-subtitle"><strong>Modularidad:</strong> ${esc(modName)} · <strong>Ref:</strong> ${esc(item.eaqualsRef || item.standard || 'MCER')} · <strong>Contexto:</strong> ${esc(item.industryContext || '')}</div>
          </div>
        </header>

        <section class="ps-cando teacher">
          <strong>Objetivo Observable de Sesión (Can-Do):</strong> ${esc(item.canDo || '')}
        </section>

        <section class="ps-box accent-blue" style="margin-bottom:6px;">
          <div class="ps-box-title">PLAN MINUTO A MINUTO DE CLASE (TOTAL: 50 MIN · ONLINE DUO: ${esc(duoMin)} MIN)</div>
          <table class="ps-timing-table">
            <thead>
              <tr><th>Bloque</th><th>Fase Instruccional</th><th>Guía de Facilitación Docente</th></tr>
            </thead>
            <tbody>
              ${phases.map((p) => `
                <tr>
                  <td class="td-block"><b>${esc(p.block)}</b></td>
                  <td class="td-phase">${esc(p.phase)}</td>
                  <td>${esc(p.desc)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </section>

        <div class="ps-grid-main">
          <div class="ps-col">
            <section class="ps-box accent-purple">
              <div class="ps-box-title">DINÁMICA PRESENCIAL GUIADA &amp; MATERIALES</div>
              <div><b>Actividad:</b> ${esc(act.title || '')} (${esc(act.grouping || 'Parejas')})</div>
              <div><b>Materiales:</b> ${esc(act.materials || 'Power Sheet impreso + Proyector')}</div>
              <ol class="ps-steps">
                ${(act.steps || []).map((s) => `<li>${esc(s)}</li>`).join('')}
              </ol>
            </section>

            <section class="ps-box accent-amber">
              <div class="ps-box-title">ERROR L1→L2 ANTICIPADO &amp; DIAGNÓSTICO</div>
              <div><b>Gancho inicial:</b> ${esc(item.warmupPrompt || '')}</div>
              <div class="ps-contrast" style="margin-top:4px;">
                <span class="ps-bad">✗ Esperado erróneo: ${esc(item.commonMistake && item.commonMistake.bad)}</span>
                <span class="ps-good">✓ Corrección esperada: ${esc(item.commonMistake && item.commonMistake.good)}</span>
              </div>
              <div class="ps-prose" style="margin-top:3px;">${esc((item.commonMistake && item.commonMistake.exp) || '')}</div>
            </section>
          </div>

          <div class="ps-col">
            <section class="ps-box accent-green">
              <div class="ps-box-title">CLAVE COMPLETA DE RETO ONLINE Y POWER SHEET</div>
              <div class="ps-blanks">
                ${drills.map((d, i) => `
                  <div class="ps-drill-key">
                    <b>Q${i + 1}:</b> ${esc(d.q)} → <span class="ps-ans-badge">✓ ${esc(d.opts && d.opts[d.ans])}</span>
                    <div class="ps-es-mini"><i>Pista socrática:</i> ${esc(d.socraticHint || d.exp)}</div>
                  </div>
                `).join('')}
              </div>
              <div class="ps-golden" style="margin-top:5px;">
                <b>Solucionario Power Sheet:</b> ${esc(ps.answerKey || 'Revisar coherencia gramatical.')}
              </div>
            </section>

            <section class="ps-box accent-slate">
              <div class="ps-box-title">SECUENCIA DUOLINGO ONLINE EN CLASE (${esc(duoMin)} MIN)</div>
              <div class="ps-duo-steps-list">
                ${(item.duoSteps || []).map((s) => `<span class="ps-phase-chip"><b>${s.step}. ${esc(s.title)}</b> (${s.minutes}m)</span>`).join('')}
              </div>
              <div class="ps-deep-link" style="margin-top:5px;">
                Entrega al alumno el Power Sheet de 1 hoja al minuto 46: <code>powersheet.html?lesson=${esc(item.id)}</code>
              </div>
            </section>
          </div>
        </div>

        <footer class="ps-footer">
          <span>stemOS Teacher Playbook · Sesión 50m</span>
          <span>Acreditación sugerida: ${esc(item.accreditedHours || 3.0)}h · +${esc(item.xp || 280)} XP</span>
        </footer>
      </article>
    `;
  }

  function getEmbeddedCss() {
    return `
      :root { --ink:#0f172a; --muted:#475569; --border:#cbd5e1; --green:#15803d; --blue:#0369a1; --purple:#6b21a8; --amber:#b45309; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:'Plus Jakarta Sans','Inter',system-ui,-apple-system,sans-serif; background:#e2e8f0; color:var(--ink); }
      .ps-pages-wrap { display:flex; flex-direction:column; align-items:center; gap:18px; padding:18px 12px 48px; }
      .ps-page {
        width:200mm; min-height:262mm;
        background:#fff; border:1.5px solid #94a3b8; border-radius:10px;
        padding:5.5mm 6.5mm; display:flex; flex-direction:column; justify-content:space-between;
        box-shadow:0 12px 32px rgba(15,23,42,0.12); page-break-after:always; break-after:page;
      }
      .ps-page:last-child { page-break-after:auto; break-after:auto; }
      .ps-head { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; border-bottom:2px solid #0f172a; padding-bottom:5px; margin-bottom:5px; }
      .ps-head-left { flex:1; min-width:0; }
      .ps-brand-row { display:flex; flex-wrap:wrap; align-items:center; gap:4px; margin-bottom:3px; }
      .ps-logo { font-weight:900; font-size:0.85rem; color:#fff; background:#58cc02; padding:2px 7px; border-radius:6px; letter-spacing:0.02em; }
      .ps-logo.teacher { background:#6b21a8; }
      .ps-pill { font-size:0.62rem; font-weight:800; padding:2px 6px; border-radius:999px; text-transform:uppercase; border:1px solid #cbd5e1; background:#f8fafc; color:#334155; }
      .ps-pill.green { background:#dcfce7; color:#166534; border-color:#86efac; }
      .ps-pill.blue { background:#e0f2fe; color:#0369a1; border-color:#7dd3fc; }
      .ps-pill.purple { background:#f3e8ff; color:#6b21a8; border-color:#d8b4fe; }
      .ps-pill.slate { background:#f1f5f9; color:#334155; }
      .ps-title { margin:0; font-size:1.06rem; font-weight:900; line-height:1.15; color:#0f172a; }
      .ps-subtitle { font-size:0.72rem; color:#475569; margin-top:2px; }
      .ps-student-box { width:56mm; display:flex; flex-direction:column; gap:5px; padding-top:2px; font-size:0.68rem; font-weight:700; color:#334155; }
      .ps-field { display:flex; align-items:flex-end; gap:4px; }
      .ps-line { flex:1; border-bottom:1.2px solid #475569; height:11px; }
      .ps-cando { background:#f0fdf4; border:1px solid #86efac; border-radius:7px; padding:5px 8px; margin-bottom:5px; font-size:0.72rem; line-height:1.3; }
      .ps-cando.teacher { background:#faf5ff; border-color:#d8b4fe; }
      .ps-pacing-strip { display:flex; flex-wrap:wrap; gap:4px; margin-top:4px; }
      .ps-phase-chip { font-size:0.6rem; background:#fff; border:1px solid #cbd5e1; border-radius:5px; padding:1.5px 5px; color:#1e293b; }
      .ps-grid-main { display:grid; grid-template-columns:1fr 1fr; gap:6px; flex:1; min-height:0; }
      .ps-col { display:flex; flex-direction:column; gap:5px; min-height:0; }
      .ps-box { border:1.2px solid #cbd5e1; border-top-width:3px; border-radius:7px; padding:4px 6px; font-size:0.65rem; line-height:1.26; background:#fff; }
      .ps-box.accent-green { border-top-color:#22c55e; }
      .ps-box.accent-blue { border-top-color:#0ea5e9; }
      .ps-box.accent-amber { border-top-color:#f59e0b; }
      .ps-box.accent-purple { border-top-color:#8b5cf6; }
      .ps-box.accent-slate { border-top-color:#475569; flex:1; display:flex; flex-direction:column; }
      .ps-box-title { font-size:0.63rem; font-weight:900; text-transform:uppercase; letter-spacing:0.04em; color:#334155; margin-bottom:3px; }
      .ps-formula { margin-bottom:3px; }
      .mcer-formula-chip { display:inline-block; padding:1px 5px; border-radius:5px; font-weight:800; font-size:0.65rem; border:1px solid #cbd5e1; background:#f8fafc; }
      .mcer-formula-chip.subject { background:#dbeafe; color:#1e3a8a; border-color:#93c5fd; }
      .mcer-formula-chip.operator { background:#fef3c7; color:#92400e; border-color:#fcd34d; }
      .mcer-formula-chip.verb { background:#dcfce7; color:#166534; border-color:#86efac; }
      .mcer-formula-chip.complement { background:#f3e8ff; color:#6b21a8; border-color:#d8b4fe; }
      .ps-prose { color:#1e293b; font-size:0.67rem; }
      .ps-golden { margin-top:3px; background:#fefce8; border:1px solid #fde047; border-radius:5px; padding:3px 6px; font-size:0.66rem; color:#713f12; }
      .ps-contrast { display:flex; flex-direction:column; gap:2px; margin-top:3px; font-size:0.65rem; }
      .ps-bad { color:#b91c1c; background:#fef2f2; padding:1px 5px; border-radius:4px; }
      .ps-good { color:#15803d; background:#f0fdf4; padding:1px 5px; border-radius:4px; font-weight:700; }
      .ps-vocab-list { display:flex; flex-direction:column; gap:3px; }
      .ps-vocab-row { border-bottom:1px dashed #e2e8f0; padding-bottom:2px; }
      .ps-vocab-row:last-child { border-bottom:none; padding-bottom:0; }
      .ps-stress { color:#db2777; font-size:0.63rem; font-weight:800; }
      .ps-es { color:#475569; }
      .ps-ex { color:#334155; font-size:0.63rem; font-style:italic; }
      .ps-dialogue { display:flex; flex-direction:column; gap:2px; }
      .ps-line-row { font-size:0.66rem; }
      .ps-es-mini { color:#64748b; font-size:0.62rem; }
      .ps-false-cognate { margin-top:3px; background:#fff7ed; border:1px solid #fdba74; border-radius:5px; padding:3px 5px; font-size:0.64rem; color:#7c2d12; }
      .ps-act-title { font-weight:800; font-size:0.74rem; color:#0f172a; }
      .ps-act-meta { font-size:0.64rem; color:#475569; margin:1px 0 3px; }
      .ps-steps { margin:0; padding-left:15px; font-size:0.67rem; }
      .ps-steps li { margin-bottom:2px; }
      .ps-subtitle-mini { font-size:0.66rem; font-weight:800; color:#0f172a; margin-bottom:2px; }
      .ps-blanks { display:flex; flex-direction:column; gap:3px; font-size:0.66rem; }
      .ps-reorder-item { margin-bottom:3px; }
      .ps-scramble { font-family:ui-monospace,monospace; font-size:0.64rem; background:#f8fafc; padding:1.5px 4px; border-radius:4px; border:1px solid #e2e8f0; }
      .ps-write-lines { display:flex; flex-direction:column; gap:8px; margin-top:4px; }
      .ps-write-line { border-bottom:1px solid #94a3b8; height:11px; }
      .ps-exit-ticket { background:#f8fafc; border-top-color:#0f172a; }
      .ps-exit-checks { display:flex; flex-direction:column; gap:2px; font-size:0.65rem; font-weight:700; }
      .ps-deep-link { margin-top:3px; font-size:0.63rem; color:#0369a1; background:#e0f2fe; padding:2px 6px; border-radius:5px; }
      .ps-timing-table { width:100%; border-collapse:collapse; font-size:0.65rem; }
      .ps-timing-table th, .ps-timing-table td { border:1px solid #cbd5e1; padding:3px 5px; text-align:left; vertical-align:top; }
      .ps-timing-table th { background:#f1f5f9; font-weight:800; }
      .ps-timing-table .td-block { white-space:nowrap; width:64px; }
      .ps-timing-table .td-phase { font-weight:700; width:135px; }
      .ps-drill-key { border-bottom:1px dashed #e2e8f0; padding-bottom:2px; }
      .ps-ans-badge { font-weight:800; color:#15803d; }
      .ps-duo-steps-list { display:flex; flex-wrap:wrap; gap:4px; }
      .ps-footer { display:flex; justify-content:space-between; align-items:center; gap:8px; border-top:1px solid #cbd5e1; padding-top:4px; margin-top:4px; font-size:0.6rem; color:#64748b; }
      .ps-answer-key { color:#334155; max-width:65%; text-align:right; }
      @page { size: letter portrait; margin: 7mm; }
      body.paper-a4 .ps-page { width: 196mm; min-height: 277mm; }
      @media print {
        body { background:#fff !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
        .no-print { display:none !important; }
        .ps-pages-wrap { padding:0 !important; gap:0 !important; }
        .ps-page { width:100% !important; min-height:262mm; max-height:263mm; overflow:hidden; break-inside:avoid; border-radius:0 !important; box-shadow:none !important; border:1px solid #cbd5e1 !important; margin:0 !important; }
        body.paper-a4 .ps-page { min-height:277mm; max-height:278mm; }
      }
    `;
  }

  function exportStandaloneHtml(pagesHtml, title) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title || 'stemOS Power Sheet')}</title>
<style>${getEmbeddedCss()}</style>
</head>
<body>
<div class="ps-pages-wrap">${pagesHtml}</div>
</body>
</html>`;
  }

  function renderFromQuery(query) {
    const q = query || {};
    const mode = q.mode === 'teacher' ? 'teacher' : 'student';
    const showKey = q.showKey !== '0' && q.showKey !== 'false';
    const items = (q.batch === 'true' || q.unit || q.level || q.espTrack) ? resolveBatch(q) : [resolveItem(q)].filter(Boolean);
    const pagesHtml = items.map((item) => (mode === 'teacher'
      ? renderTeacherGuideSheet(item, { cohortLabel: q.cohortLabel || '' })
      : renderStudentSheet(item, { showKey, cohortLabel: q.cohortLabel || '' }))).join('\n');
    return {
      mode,
      count: items.length,
      items,
      pagesHtml,
      css: getEmbeddedCss()
    };
  }

  return {
    version: '2026.11-powersheet-v1',
    resolveItem,
    resolveBatch,
    renderStudentSheet,
    renderTeacherGuideSheet,
    renderFromQuery,
    exportStandaloneHtml,
    getEmbeddedCss
  };
}));
