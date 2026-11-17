/**
 * ==============================================================================
 * stemOS LXP — Diseños Instruccionales 50 Minutos para Modularidades ESP & Carreras
 * Envuelve las 4 modularidades de Career Paths / Courses:
 *   1) theory        — Fundamentos Técnicos & Terminología Industrial (50 min)
 *   2) english-b1    — Inglés Técnico Aplicado (SOPs, Reportes, Negociación) (50 min)
 *   3) practical-lab — Laboratorio Práctico & Diagnóstico en Escenario (50 min)
 *   4) milestone     — Evaluación Integradora & Acreditación Hito (50 min)
 * ==============================================================================
 */
(function (root, factory) {
  const result = factory();
  if (typeof define === 'function' && define.amd) {
    define([], () => result);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = result;
  }
  if (typeof root !== 'undefined') {
    root.STEMOS_ESP_DESIGNS = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_ESP_DESIGNS = result;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const ESP_MODULARITY_TEMPLATES = {
    'theory': {
      id: 'theory',
      name: 'Modularidad ESP-1: Fundamentos Técnicos & Léxico Industrial (50 min)',
      badge: 'TEORÍA + LÉXICO 50m',
      hasSlides: true,
      totalMinutes: 50,
      onlineDuoMinutes: 17,
      focus: 'Dominio conceptual de arquitectura/normativa técnica (ISO/IEC/IEEE) con traducción bilingüe y acento técnico.',
      phases: [
        { block: '00–05 min', phase: 'Ignición Industrial', desc: 'Plantea 1 caso real de planta o falla costosa relacionada con la norma técnica del día.' },
        { block: '05–16 min', phase: 'Blueprint Técnico (+ Slides)', desc: 'Disección visual del estándar (ej. Purdue, LOTO, ACES, IATF) + 6 términos críticos con IPA y colocaciones.' },
        { block: '16–28 min', phase: 'Mapeo Técnico en Equipo', desc: 'Equipos etiquetan un diagrama o flujo técnico en inglés y traducen especificaciones críticas sin glosario.' },
        { block: '28–45 min', phase: 'Reto Online Duolingo (17 min)', desc: 'Secuencia en app.html: Technical Vocab Sprint (4m) + Reading Brief (5m) + Collocation Builder (4m) + Quiz (4m).' },
        { block: '45–50 min', phase: 'Exit Ticket & Power Sheet', desc: 'Verificación de 3 colocaciones clave y entrega/descarga del Power Sheet ESP de 1 hoja.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Tech Vocab Sprint', minutes: 4 },
        { step: 2, type: 'sentence_builder', title: 'Spec Builder', minutes: 4 },
        { step: 3, type: 'listening', title: 'Technical Audio Lab', minutes: 5 },
        { step: 4, type: 'grammar_drills', title: 'Concept Quiz', minutes: 4 }
      ],
      activityTemplate: {
        title: 'Etiquetado Bilingüe de Arquitectura / Norma Industrial',
        grouping: 'Parejas o Tríos técnicos',
        materials: 'Diagrama en proyector + Power Sheet ESP (Sección Mapa/Términos)',
        steps: [
          'Cada pareja identifica 4 términos en inglés del estándar de hoy y redacta 1 colocación operativa real en piso.',
          'Intercambian hojas y verifican precisión conceptual usando el estándar normativo citado.'
        ]
      }
    },
    'english-b1': {
      id: 'english-b1',
      name: 'Modularidad ESP-2: Comunicación Técnica & Turnos en Inglés (50 min)',
      badge: 'ENGLISH LAB 50m',
      hasSlides: true,
      totalMinutes: 50,
      onlineDuoMinutes: 18,
      focus: 'Uso funcional de inglés operativo en cambios de turno (shift handoffs), SOPs, reportes 8D y juntas técnicas.',
      phases: [
        { block: '00–05 min', phase: 'Audio Real de Piso / Junta', desc: 'Escucha breve de intercambio técnico en inglés sin texto y extracción del problema principal.' },
        { block: '05–15 min', phase: 'Estructura & Registro (+ Slides)', desc: 'Fórmula comunicativa del módulo (SOP imperativo, 8D pasivo o pitching técnico) + 1 alerta de falso cognado.' },
        { block: '15–27 min', phase: 'Roleplay Shift Handoff / Ticket', desc: 'Práctica oral cronometrada simulando entrega de turno, escalación a proveedor o defensa técnica en inglés.' },
        { block: '27–45 min', phase: 'Reto Online Duolingo (18 min)', desc: 'Vocab Sprint (3m) + Sentence Builder (4m) + Audio Lab (4m) + Writing & Drills (4m) + Voice Check (3m).' },
        { block: '45–50 min', phase: 'Exit Ticket & Power Sheet', desc: 'Revisión de plantilla de reporte/frase clave y descarga del Power Sheet bilingüe.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Phrase Sprint', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Report Builder', minutes: 4 },
        { step: 3, type: 'listening', title: 'Handoff Audio Lab', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'SOP & Grammar Check', minutes: 4 },
        { step: 5, type: 'voice_crucible', title: 'Voice Handoff', minutes: 3 }
      ],
      activityTemplate: {
        title: 'Simulación Shift Handoff / Escalación Técnica Bilingüe',
        grouping: 'Parejas (Ingeniero Saliente / Supervisor EE. UU.)',
        materials: 'Bitácora de falla + Power Sheet ESP',
        steps: [
          'En 90 segundos el ingeniero saliente reporta estado, incidencia e instrucción usando las frases del módulo.',
          'El supervisor formula 2 preguntas de aclaración exigiendo precisión de datos/tiempos en inglés.'
        ]
      }
    },
    'practical-lab': {
      id: 'practical-lab',
      name: 'Modularidad ESP-3: Laboratorio Práctico & Diagnóstico en Simulador (50 min)',
      badge: 'LAB SIM 50m',
      hasSlides: false,
      totalMinutes: 50,
      onlineDuoMinutes: 19,
      focus: 'Toma de decisiones en crisis técnica, telemetría SCADA, aislamiento LOTO y troubleshooting bajo reloj.',
      phases: [
        { block: '00–05 min', phase: 'Alerta de Telemetría (Incidente)', desc: 'Presentación del estado anómalo (alarma, paro de línea o caída de nodo) y restricción de tiempo.' },
        { block: '05–14 min', phase: 'Protocolo de Contención & Vocabulario Crítico', desc: 'Revisión rápida del árbol de decisión técnico y comandos de seguridad en inglés.' },
        { block: '14–26 min', phase: 'War Room en Tríos (Checklist)', desc: 'Resolución colaborativa de pasos de diagnóstico ordenando secuencia de aislamiento/recuperación.' },
        { block: '26–45 min', phase: 'Simulador & Reto Online Duolingo (19 min)', desc: 'Ejecución del simulador de laboratorio + verificación de protocolo y diagnóstico en app.html.' },
        { block: '45–50 min', phase: 'Bitácora de Cierre & Power Sheet', desc: 'Registro del root cause en el Power Sheet de 1 hoja para portafolio de evidencias.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Safety & Fault Terms', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Procedure Sequencing', minutes: 5 },
        { step: 3, type: 'listening', title: 'Alert Comprehension', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'Troubleshooting Lab', minutes: 7 }
      ],
      activityTemplate: {
        title: 'War Room: Árbol de Contención y Secuencia Cero-Fallas',
        grouping: 'Equipos de 3 (Lead, Diagnostician, Safety Auditor)',
        materials: 'Checklist de protocolo en Power Sheet ESP',
        steps: [
          'Ordenan los 4 pasos de diagnóstico sin omitir verificaciones de seguridad/calidad.',
          'Sustentan verbalmente en inglés por qué descartaron la hipótesis incorrecta.'
        ]
      }
    },
    'milestone': {
      id: 'milestone',
      name: 'Modularidad ESP-4: Evaluación Hito & Crisol Socrático (50 min)',
      badge: 'CHECKPOINT HITO 50m',
      hasSlides: false,
      totalMinutes: 50,
      onlineDuoMinutes: 20,
      focus: 'Síntesis integradora del Hito, defensa socrática oral/escrita y emisión de evidencia acreditable (W3C/ABET/CACEI).',
      phases: [
        { block: '00–05 min', phase: 'Briefing de Rúbrica Hito', desc: 'Alineación de criterios de aprobación del Hito y estándares normativos aplicables.' },
        { block: '05–14 min', phase: 'Calibración Socrática Express', desc: 'Repaso rápido de las 3 preguntas más retadoras del bloque y trampa frecuente.' },
        { block: '14–25 min', phase: 'Defensa Oral en Tríadas', desc: 'Mini-defensa cronometrada (2 min) ante evaluador par con retroalimentación directa.' },
        { block: '25–45 min', phase: 'Checkpoint & Boss Crucible Online (20 min)', desc: 'Evaluación sumativa de los micro-pasos del hito + Defensa Socrática IA / Examen de Hito en app.html.' },
        { block: '45–50 min', phase: 'Acreditación & Power Sheet Integrador', desc: 'Registro de XP/horas acreditadas (3.5–4.0h) y guardado del Power Sheet resumen del Hito.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Milestone Blitz', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Executive Synthesis', minutes: 4 },
        { step: 3, type: 'listening', title: 'Audit Audio Prompt', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'Hito Exam', minutes: 4 },
        { step: 5, type: 'voice_crucible', title: 'Socratic Boss Defense', minutes: 5 }
      ],
      activityTemplate: {
        title: 'Mini-Tribunal Técnico de Hito (3 Minutos)',
        grouping: 'Tríos rotativos (Defensor + 2 Evaluadores)',
        materials: 'Rúbrica ABET/CONOCER del Hito en Power Sheet',
        steps: [
          'El defensor expone solución al caso integrador conectando estándar normativo + léxico técnico inglés.',
          'Evaluadores aplican 1 pregunta socrática de seguimiento antes de pasar al examen online.'
        ]
      }
    }
  };

  function getTemplate(type) {
    return ESP_MODULARITY_TEMPLATES[type] || ESP_MODULARITY_TEMPLATES.theory;
  }

  function getAllTemplates() {
    return Object.values(ESP_MODULARITY_TEMPLATES);
  }

  function extractVocabFromCourseMod(modObj) {
    if (!modObj) return [];
    const readingVocab = (modObj.readings && modObj.readings[0] && Array.isArray(modObj.readings[0].vocabulary))
      ? modObj.readings[0].vocabulary.map((v) => ({
          en: v.en || v.term || 'Technical Term',
          es: v.es || v.translation || 'Término técnico',
          ipa: v.ipa || '',
          pinkStress: String(v.en || '').toUpperCase().split(' ').slice(0, 3).join(' '),
          example: (v.collocations && v.collocations[0]) ? `Standard usage: ${v.collocations[0]}.` : (v.definition || ''),
          exampleES: v.definition || v.es || ''
        }))
      : [];
    if (readingVocab.length) return readingVocab.slice(0, 6);

    const lex = Array.isArray(modObj.lexiconMatrix) ? modObj.lexiconMatrix : [];
    if (lex.length) {
      return lex.slice(0, 6).map((item) => ({
        en: item.term || item.en || 'Term',
        es: item.translation || item.es || 'Definición',
        ipa: item.ipa || '',
        pinkStress: item.stress || String(item.term || '').toUpperCase(),
        example: item.example || item.context || '',
        exampleES: item.exampleES || item.notes || ''
      }));
    }
    return [];
  }

  function buildEspClassPayload(trackOrCareerId, modObj, rawCourseObj) {
    const modType = (modObj && modObj.type) || 'theory';
    const tpl = getTemplate(modType);
    const courseMod = (rawCourseObj && Array.isArray(rawCourseObj.modules))
      ? rawCourseObj.modules.find((m) => m.id === (modObj && modObj.id)) || rawCourseObj.modules[0]
      : (modObj && (modObj.readings || modObj.quiz) ? modObj : null);

    let vocab = extractVocabFromCourseMod(courseMod);
    if (!vocab.length && modObj) {
      const words = String(modObj.title || '').split(/[:,&\-]+/).map((s) => s.trim()).filter(Boolean).slice(0, 4);
      vocab = words.map((w) => ({
        en: w,
        es: `Concepto clave (${modObj.standard || 'Normativa Industrial'})`,
        ipa: '',
        pinkStress: w.toUpperCase(),
        example: modObj.competency || `Apply ${w} under ${modObj.standard || 'ISO/IEEE'} protocols.`,
        exampleES: `Aplica ${w} conforme a ${modObj.standard || 'estándares industriales'}.`
      }));
    }

    const dialogue = (courseMod && Array.isArray(courseMod.dialogue) && courseMod.dialogue.length)
      ? courseMod.dialogue.map((d) => ({
          speaker: d.speaker || d.role || 'Engineer',
          en: d.en || d.text || d.line || '',
          es: d.es || d.translation || ''
        }))
      : [
          {
            speaker: 'Lead Engineer',
            en: `Team, today's 50-minute focus is "${(modObj && modObj.title) || 'Industrial Protocol'}". Confirm ${(vocab[0] && vocab[0].en) || 'system baseline'} before deployment.`,
            es: `Equipo, el enfoque de 50 min de hoy es "${(modObj && modObj.title) || 'Protocolo Industrial'}". Confirmen línea base antes del despliegue.`
          },
          {
            speaker: 'Specialist',
            en: `Confirmed. We aligned documentation with ${(modObj && modObj.standard) || 'ISO/IEC compliance'} and logged all telemetry checkpoints.`,
            es: `Confirmado. Alineamos documentación con ${(modObj && modObj.standard) || 'cumplimiento ISO/IEC'} y registramos puntos de control.`
          }
        ];

    const drills = (courseMod && Array.isArray(courseMod.quiz) && courseMod.quiz.length)
      ? courseMod.quiz.slice(0, 4).map((q) => ({
          q: q.question || q.q || '',
          opts: q.options || q.opts || [],
          ans: typeof q.correct === 'number' ? q.correct : (q.ans || 0),
          exp: q.explanation || q.exp || 'Alineado a normativa técnica del módulo.',
          socraticHint: q.socraticHint || `Relaciona con ${modObj && modObj.standard ? modObj.standard : 'la competencia técnica'}.`
        }))
      : [
          {
            q: `Which deliverable demonstrates mastery of "${(modObj && (modObj.shortTitle || modObj.title)) || 'this ESP module'}"?`,
            opts: [
              (modObj && modObj.competency) || 'Verified technical compliance & English operational handoff',
              'Skipping standard verification under schedule pressure',
              'Unlogged ad-hoc changes without cross-shift communication',
              'Translating technical acronyms word-for-word into Spanish'
            ],
            ans: 0,
            exp: 'La competencia exige evidencia técnica verificable conforme al estándar y comunicación precisa en inglés.',
            socraticHint: 'Revisa el estándar normativo del módulo.'
          }
        ];

    const v0 = (vocab[0] && vocab[0].en) || 'protocol';
    const v1 = (vocab[1] && vocab[1].en) || 'compliance';
    const standard = (modObj && modObj.standard) || (rawCourseObj && rawCourseObj.standard) || 'ISO / IEEE / ABET';

    return {
      id: `esp:${trackOrCareerId}:${(modObj && modObj.id) || 'M01'}`,
      modId: (modObj && modObj.id) || 'M01',
      trackId: trackOrCareerId,
      isEsp: true,
      level: (rawCourseObj && rawCourseObj.level) || (modType === 'english-b1' ? 'B1 ESP' : 'STEM ESP'),
      modularity: modType,
      modularityMeta: tpl,
      hasSlides: tpl.hasSlides,
      durationMinutes: 50,
      onlinePracticeMinutes: tpl.onlineDuoMinutes,
      accreditedHours: (modObj && modObj.hours) || 3.5,
      xp: (modObj && modObj.xp) || 300,
      standard,
      title: (modObj && modObj.title) || 'ESP Engineering Module',
      titleES: (modObj && (modObj.titleES || modObj.shortTitle || modObj.title)) || 'Módulo Técnico ESP',
      canDo: (modObj && modObj.competency) || tpl.focus,
      industryContext: `${standard} · ${(modObj && modObj.cluster) || 'Nearshoring Industrial STEM'}`,
      grammarFormulaHtml: `<div style="font-size:0.84rem;color:#0f172a;font-weight:700;">Eje Técnico: <code>${standard}</code> · Competencia: ${(modObj && modObj.competency) || tpl.focus}</div>`,
      explanationES: `Sesión modular de <strong>50 minutos</strong> (${tpl.badge}) diseñada para integrar la competencia técnica <strong>${(modObj && modObj.title) || ''}</strong> con producción bilingüe operativa y ${tpl.onlineDuoMinutes} min de práctica online en <em>stemOS</em>.`,
      goldenRuleES: `Domina siempre 1 término normativo (${v0}), 1 colocación de acción y 1 enunciado de reporte claro bajo <strong>${standard}</strong>.`,
      commonMistake: {
        bad: 'Depender de traducción literal al reportar fallas o saltarse la verificación documental por prisa.',
        good: `Comunicar estado + evidencia + norma (${standard}) con frases técnicas concretas.`,
        exp: 'La acreditación industrial (ABET / CACEI / CONOCER) evalúa precisión técnica y trazabilidad en inglés.'
      },
      falseCognate: {
        term: 'Compliance vs Complacency / Spec',
        mistake: 'Traducir "technical compliance" como "complacencia"',
        correct: 'Cumplimiento normativo verificable',
        tip: 'Usa siempre "in compliance with [ISO/OSHA/IEEE]" para certificar apego a norma.'
      },
      vocab,
      dialogue,
      drills,
      instructionalPhases: tpl.phases,
      duoSteps: tpl.duoSteps,
      classroomActivity: tpl.activityTemplate,
      powerSheet: {
        fillBlanks: [
          `1. All procedures must align with ___ standards. (${standard.split(' ')[0]} / informal)`,
          `2. Verify "${v0}" before signing off shift handoff. (baseline / guess)`,
          `3. Cross-team documentation prioritizes clarity and ___. (${v1} / ambiguity)`,
          '4. Logged deviations trigger formal root-cause ___. (containment / ignore)'
        ],
        reorder: [`standards / ${standard.split(' ')[0]} / must / verify / Engineers / .`],
        writePrompt: `Redacta 3 líneas en inglés técnico integrando "${v0}" bajo la norma ${standard}:`,
        answerKey: `1) ${standard.split(' ')[0]} · 2) baseline · 3) ${v1} · 4) containment | Standard verification logged under ${standard}.`
      }
    };
  }

  return {
    version: '2026.11-esp-50m-v1',
    templates: ESP_MODULARITY_TEMPLATES,
    getTemplate,
    getAllTemplates,
    buildEspClassPayload
  };
}));
