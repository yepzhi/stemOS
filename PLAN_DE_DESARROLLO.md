# stemOS — Plan de Desarrollo y Roadmap Maestro de Producto
> **Documento Estratégico y Técnico de Próximos Pasos**  
> **Autor:** Alberto Hernández Yépiz  
> **Agente de Desarrollo:** Antigravity  
> **Ubicación:** `/Users/yepz/stemOS/PLAN_DE_DESARROLLO.md`  
> **Fecha de Actualización:** Septiembre 2026  
> **Estado:** Listo para ejecución inmediata (Fase 1)

---

## 0. Resumen Ejecutivo y Tesis de Producto

**stemOS** cuenta con un nicho defendible de alto valor: **Inglés para Fines Específicos (ESP)** ultra-vertical para la industria de manufactura avanzada y nearshoring en México (semiconductores, aeroespacial, robótica, electromovilidad), alineado a estándares auditables reales (**IEEE, SEMI, ISO 14644-1, AS9100, IEC 62443, OACI/ICAO, SEP CONOCER EC1290**).

### El Diagnóstico Crítico:
1. **Fuerte en Insumo (Input), Débil en Producción (Output)**: La plataforma hoy evalúa lectura, audios y preguntas socráticas de opción múltiple. Carece de redacción técnica evaluada (reportes 8D, correos de escalación a clientes de EE.UU., RFQs, incident reports), defensa oral de proyectos (pitch/presentación) y simulación de negociación.
2. **Banco de Modismos Delgado y con Calcos Transparentes**: Los modismos transparentes (calcos literales como *"time is money"*) no aportan valor pedagógico. Se requiere un banco de **150+ modismos opacos, no literales y de alto contexto de planta y juntas**, con análisis de trampas dialécticas (AmEng vs BrEng, ej. *table this discussion*).
3. **Navegación Unidimensional (Solo Vertical Industrial)**: Se requiere un **Eje Dual**: Industria (a qué sector perteneces) ✖ Habilidad Comunicativa Transversal (qué necesitas hacer hoy: sobrevivir en planta, liderar una junta, redactar un 8D, negociar con casa matriz).
4. **Verticales Faltantes del Nearshoring Real Mexicano**:
   - Automotriz / Manufactura Esbelta (IATF 16949 / Lean Six Sigma — Bajío y Norte)
   - Dispositivos Médicos (FDA 21 CFR 820 / ISO 13485 — Tijuana, Juárez)
   - Logística, Comercio Exterior y Aduanas (Incoterms 2020 / T-MEC / IMMEX)
   - Calidad y Cumplimiento (EHS / Six Sigma DMAIC / OSHA)
   - Energía y Data Centers (Centros de cómputo y red eléctrica)
5. **Reutilización de Infraestructura Existente**:
   - Reutilizar el motor de repetición espaciada **SM-2** de JóvenesSTEM para memoria y retención adaptativa de vocabulario débil por alumno.
   - Conectar con la infraestructura de IA (`yzai`/STEMBot).

---

## 1. El Eje Dual de Navegación (Industria ✖ Habilidad)

### Eje A — Verticales Industriales (Existentes + Nuevas)
1. Technology: Ciberseguridad, TI, AI/ML, Telecom/IoT, Software Dev, Data Science, Web Dev con IA Agéntica.
2. Engineering: Semiconductores, Electromovilidad, Aeroespacial, Robótica, Energía Limpia, Manufactura Avanzada, Mecatrónica.
3. Science: Biotecnología, Espacio, Sustentabilidad, Nanotecnología, Alimentos.
4. Career: Aviación, Aeroespacial Militar, Hospitalidad, Negocios, Project Management, Emprendimiento.
5. **[Nuevas Verticales Nearshoring]**:
   - **Track 28**: Automotive & Lean Manufacturing (IATF 16949 / APQP / PPAP / 8D)
   - **Track 29**: Medical Devices (FDA 21 CFR Part 820 / ISO 13485 / Cleanroom ISO 7-8)
   - **Track 30**: Logistics & Global Trade Compliance (Incoterms 2020 / T-MEC / IMMEX / C-TPAT)
   - **Track 31**: Quality Engineering & EHS (Six Sigma DMAIC / ISO 9001 / ISO 45001 / OSHA)
   - **Track 32**: Energy & Data Centers (Tier III/IV / PUE / IEEE 1547 / Substation Safety)

### Eje B — Habilidades Comunicativas Transversales (Nuevo)
1. **Plant Floor Survival**: Instrucciones de operación, relevo de turnos (shift handover), Lock-out/Tag-out (LOTO), reporte de anomalías y paros de línea.
2. **Meetings & Escalations**: Interrumpir con cortesía técnica, discrepar diplomáticamente, gestionar plazos, dar seguimiento a action items.
3. **Written Reports & Email English**: Redacción estructurada de reportes 8D, CAPA, Non-Conformance Reports (NCR), RFQs y correos de escalación a directivos de EE.UU.
4. **Presentation & Pitch Lab**: Defensa estructurada de casos técnicos, análisis de causa raíz (Ishikawa/5 Whys) y justificación de presupuesto de ingeniería.
5. **Negotiation & Cross-Border Leadership (B2/C1)**: Negociación de entregables, concesiones técnicas y liderazgo ante matriz en EE.UU./Canadá.
6. **Native Idioms & Colloquial Radar**: Decodificación de modismos opacos, metáforas corporativas y trampas culturales en tiempo real.

---

## 2. Estructura de Native Idioms Lab 2.0 (Matriz de 5 Capas)

Cada modismo en `content/phrases_library.js` debe implementar el siguiente esquema estricto:

```javascript
{
  "id": "phr-table-discussion",
  "phrase": "Let's table this discussion",
  "category": "meetings_escalations",
  "operationalMeaning": "Posponer temporalmente un tema para priorizar lo urgente (US).",
  "mentalImageOrigin": "Práctica parlamentaria donde una ley se retiraba del debate colocándola sobre la mesa en reposo.",
  "plantExample": "We are getting too deep into the weeds with this valve tolerance. Let's table this discussion until the supplier provides the CMM report.",
  "dialectDifference": {
    "hasTrap": true,
    "usMeaning": "Posponer / Suspender temporalmente (Postpone/Shelve)",
    "ukMeaning": "Poner a discusión inmediata AHORA (Put forward for immediate debate)"
  },
  "riskLevel": "CRÍTICO", // Riesgo alto de malentendido de agenda cross-border
  "pronunciationHint": "/ˈteɪ.bəl ðɪs dɪˈskʌʃ.ən/"
}
```

### Banco Semilla Obligatorio (150+ modismos priorizados):
- **Planta / Operaciones**: *cut corners, drop the ball, put out fires, the devil is in the details, back to the drawing board, low-hanging fruit, stand down, sanity check, choke point, bottleneck, bulletproof, plug and play, rule of thumb.*
- **Juntas / Escalación**: *table this discussion, let's circle back, above my pay grade, read the room, loop someone in, touch base, cover your bases, on the same page, in the weeds, I don't have the bandwidth, take it offline, play devil's advocate, bring to the table, hard stop, hard deadline.*
- **Negociación / Liderazgo**: *move the needle, boil the ocean (scope creep), kick the can down the road, throw someone under the bus, ballpark figure, run it up the flagpole, hold your feet to the fire, push back, bottom line, give and take, deal breaker, walk away point, leverage.*

---

## 3. Hoja de Ruta por Fases (Phasing)

### 🔴 FASE 1 (Semanas 0 a 6) — Cerrar Brechas de Alto Impacto
- [ ] **1.1 Selector de Eje Dual (Industria ✖ Habilidad)** en `dev.html` y `dev.js`.
- [ ] **1.2 Native Idioms 2.0**: Inyección de 150+ modismos anti-calco con origen mental, ejemplos de planta y matriz AmEng vs BrEng.
- [ ] **1.3 Track 28**: Automotive & Lean Manufacturing (IATF 16949 / APQP / PPAP / 8D / Six Sigma).
- [ ] **1.4 Track 29**: Medical Devices (FDA 21 CFR Part 820 / ISO 13485 / Cleanrooms).
- [ ] **1.5 Track 30**: Logistics & Global Trade Compliance (Incoterms 2020 / T-MEC / IMMEX / C-TPAT).
- [ ] **1.6 Output Engine V1**: 8D Problem Solving & Escalation Email Builder (redacción técnica con evaluación guiada).

### 🟡 FASE 2 (Semanas 6 a 14) — Tutor de IA Adaptativo (Memoria por Alumno)
- [ ] **2.1 Motor SM-2 integrado**: Guardado local/nube de Intervalo ($I$), Factor de Facilidad ($EF$) y Repeticiones ($n$) por término y modismo.
- [ ] **2.2 Ajuste dinámico de dificultad**: Socratic Bot recuerda errores históricos del alumno y programa repasos espaciados.

### 🟡 FASE 3 (Semanas 14 a 22) — Producción Oral y Negociación Activa
- [ ] **3.1 Presentation & Pitch Builder**: El alumno graba o redacta su defensa técnica con feedback de estructura, claridad y muletillas.
- [ ] **3.2 Negotiation Roleplay Simulator**: Simulación conversacional de stakeholders difíciles (cliente exigente, director de operaciones en EE.UU.).

### 🟢 FASE 4 (Semanas 22 a 30) — Enterprise Readiness (B2B / B2B2G)
- [ ] **4.1 Dashboard L&D Corporativo**: Métrica de avance por cohorte, tasa de acreditación por track, reportes descargables para Recursos Humanos.
- [ ] **4.2 SSO / LMS Integration**: Compatibilidad SCORM y Single Sign-On institucional.

### 🟢 FASE 5 (Semanas 30+ en adelante) — Especialización de Punta
- [ ] **5.1 Ruta B2/C1 de Liderazgo Ejecutivo Cross-Border**.
- [ ] **5.2 Listening Multi-Acento**: Clips de audio con acentos reales de la industria (Midwest US, British, Indian, Chinese).
- [ ] **5.3 Case Studies Reales Anonimizados**: Lecciones basadas en incidentes reales de manufactura y comunicación en plantas de México.

---

## 4. Próxima Acción Inmediata al Preguntar "¿Qué sigue?"

Tan pronto indiques retomar, comenzaremos inmediatamente con el **Bloque 1 de la Fase 1**:

1. **Entregable 1.1**: Implementar el **Eje B de Habilidades Comunicativas** en `dev.html` y `dev.js` con filtros cruzados dinámicos.
2. **Entregable 1.2**: Ampliar `content/phrases_library.js` a 150+ modismos con la estructura de 5 capas (mental image, plant example, dialect difference, risk level).
3. **Entregable 1.3**: Inyectar el currículum maestro del **Track 28: Automotive & Lean Manufacturing (IATF 16949 / APQP / 8D)** en `content/courses.js`.
