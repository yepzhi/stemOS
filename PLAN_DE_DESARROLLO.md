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
- [x] **1.1 Selector de Eje Dual (Industria ✖ Habilidad)** en `dev.html` y `dev.js`. *(Completado: Eje A 32 Verticales ✖ Eje B Habilidades Transversales con filtrado dinámico).*
- [x] **1.2 Native Idioms 2.0**: Inyección de 150+ modismos anti-calco con origen mental, ejemplos de planta y matriz AmEng vs BrEng. *(Completado: 162 modismos con esquema de 5 capas y banner de inversión dialectal).*
- [x] **1.3 Track 28**: Automotive & Lean Manufacturing (IATF 16949 / APQP / PPAP / 8D / Six Sigma). *(Completado: 6 módulos maestros).*
- [x] **1.4 Track 29**: Medical Devices (FDA 21 CFR Part 820 / ISO 13485 / Cleanrooms ISO 7-8 / EtO Sterilization). *(Completado: 6 módulos maestros, 12 lecturas, 6 diálogos FDA audit).*
- [x] **1.5 Track 30**: Logistics & Global Trade Compliance (Incoterms 2020 / T-MEC / IMMEX / SAT Anexo 24-31 / C-TPAT). *(Completado: 6 módulos maestros, 12 lecturas, 6 diálogos aduaneros).*
- [x] **1.6 Output Engine V1**: 8D Problem Solving & Escalation Email Studio (redacción técnica con evaluación guiada por rúbrica AI, Tone Radar y exportación a portapapeles). *(Completado e integrado en `dev.html`, `dev.css`, `dev.js`).*
- [x] **1.7 Track 31**: Quality Engineering & EHS (Six Sigma DMAIC / ISO 9001:2015 / ISO 45001 / OSHA 1910 / LOTO / Secondary Containment / GHS). *(Completado: 6 módulos maestros, 12 lecturas, 6 diálogos EHS/Auditoría).*
- [x] **1.8 Track 32**: Energy, Smart Grid & Data Centers (Uptime Institute Tier I–IV / PUE / Liquid Cooling / IEEE 1547 / Substation GIS / BESS LFP / CFE Código de Red 2.0). *(Completado: 6 módulos maestros, 12 lecturas, 6 diálogos CENACE/Data Center).*

### 🟡 FASE 2 (Semanas 6 a 14) — Tutor de IA Adaptativo (Memoria por Alumno)
- [x] **2.1 Motor SM-2 integrado**: Guardado local de Intervalo ($I$), Factor de Facilidad ($EF$) y Repeticiones ($n$) por término y modismo con Flashcard Deck 3D interactivo, audio en inglés nativo y predicciones de intervalo por botón (Again, Hard, Good, Easy). *(Completado en `dev.html`, `dev.css`, `dev.js`).*
- [x] **2.2 Ajuste dinámico de dificultad**: Hook global `window.recordSM2Error(term, trackId)` inyecta automáticamente términos erróneos en el mazo SM-2 con penalización de $EF$ y prioridad de repaso inmediato. *(Completado).*

### 🟡 FASE 3 (Semanas 14 a 22) — Producción Oral y Negociación Activa
- [x] **3.1 Presentation & Pitch Builder**: El alumno redacta y defiende su pitch técnico estructurado en 5 etapas (Burning Platform, Root Cause, Architecture, Mitigation, Financial ROI) con teleprompter en vivo, telemetría acústica de muletillas (filler words), collocations recomendadas y audio preview nativo. *(Completado).*
- [x] **3.2 Negotiation Roleplay Simulator**: Simulación conversacional multi-ronda de stakeholders de matriz en EE.UU. (David Vance - Concesión Ra, Sarah Sterling - Aduana Laredo / Flete Aéreo, Marcus Thorne - Desgaste de Moldes / Multa Line-Stop) con radar de asertividad técnica, tacto diplomático, firmeza BATNA y feedback de coach ejecutivo. *(Completado).*
- [x] **3.3 Pronunciation & Acoustic Assessment**: Evaluación fonética de estrés silábico con segmentación por sílabas, indicador de decibelios, transcripción IPA, advertencia de trampa acústica dialectal y prueba con micrófono en tiempo real. *(Completado).*

### 🟢 FASE 4 (Semanas 22 a 30) — Enterprise Readiness (B2B / B2B2G)
- [x] **4.1 Dashboard L&D Corporativo**: Métrica de avance por cohorte (Tijuana, Saltillo, Monterrey, Guadalajara), tasa de acreditación por track, reportes descargables para Recursos Humanos bajo norma ISO 9001:2015 Cl. 7.2 (CSV con 28 registros verificados y Dossier Ejecutivo en PDF) y Heatmap de competencias departamentales vs niveles CEFR. *(Completado en `dev.html`, `dev.css`, `dev.js`).*
- [x] **4.2 SSO / LMS Integration**: Compatibilidad SCORM 1.2 y SCORM 2004 4th Edition con exportador dinámico de paquetes (`imsmanifest.xml`, runtime API wrapper y lanzador SCO), script CLI `scripts/generate_scorm_package.cjs` y conector SAML 2.0 / Okta / Azure AD. *(Completado).*
- [x] **4.3 Expansión Curricular a 34 Tracks Maestros**:
  - **Track 33**: Hardware Ágil, Firmware Embebido e Inteligencia Artificial en el Borde (AUTOSAR Classic/Adaptive, FreeRTOS/Zephyr, MISRA-C:2012, HIL dSPACE/NI, TinyML Cortex-M, Secure Bootloaders ECDSA).
  - **Track 34**: Cadenas de Suministro Avanzadas, Reshoring y Gestión Global de Compras (Reglas de Origen T-MEC/USMCA, TCO vs Landed Cost, Incoterms 2020 FCA/DDP, Cross-Docking Laredo, Auditorías VDA 6.3 / IATF, Cadena de Frío GDP).

### 🟢 FASE 5 (Semanas 30+ en adelante) — Especialización de Punta
- [x] **5.1 Ruta B2/C1 de Liderazgo Ejecutivo Cross-Border y Case Studies Reales Anonimizados**:
  - **4 Crisis Industriales de Alto Impacto**:
    1. *The Laredo World Trade Bridge Line-Down Dispute (Automotive Tier-1 / Incoterms FCA vs DAP / Anexo 24)*.
    2. *The FDA Form 483 Cleanroom CAPA Closeout (MedTech Tijuana vs Minneapolis / 21 CFR § 820.100)*.
    3. *The 3nm DFT Yield Fallout Excursion (Semiconductors Guadalajara vs Austin / ATE Shmoo & Scan-Chain)*.
    4. *The 40MW Hyperscale Substation Harmonic Interlock Crisis (Energy & Data Centers Querétaro / CENACE Código de Red 2.0)*.
  - **Matriz de Decisión Multi-Estratégica**: Simulación de 4 ramas (Agresiva, Concesión, BATNA Técnica Diplomática C1, Postergación).
  - **Radar de Telemetría Ejecutiva**: Medición dinámica de Prestigio Corporativo, Confianza Transfronteriza, Cumplimiento Regulatorio y Daño Financiero Mitigado ($ USD).
  - **Generador de Memorándum C1 Oficial**: Redactor automatizado de comunicados de posición ejecutiva con botón de copiado en 1 clic. *(Completado en `dev.html`, `dev.css`, `dev.js`).*
- [x] **5.2 Listening Multi-Acento — Laboratorio Acústico Industrial**:
  - **5 Acentos Globales Reales del Nearshoring**:
    1. *US Midwest (Dave Miller • Detroit OEM)*: Northern Cities Vowel Shift, alveolar flaps, modismos directos de ensamble.
    2. *Indian Offshore (Priya Ramanathan • Bangalore)*: Consonantes retroflejas [ʈ, ɖ], ritmo por sílabas, modismos corporativos (*do the needful, prepone, revert back*).
    3. *German Industrial HQ (Dr. Jürgen Becker • Stuttgart)*: Fricativas [v] vs [w], falsos amigos técnicos (*actual = current, control = inspect*), franqueza implacable.
    4. *UK Aerospace (Alistair Campbell • Derby)*: No-roticidad, glottal stops, eufemismo británico (*slight reservation = falla crítica*), trampa dialectal (*to table = debatir ya*).
    5. *Japanese Kaizen (Kenji Takahashi • Nagoya)*: Desaceleración deliberada, evasión de confrontación (*may be difficult = NO*), protocolo *Nemawashi* / *Hansei*.
  - **Decodificador Dialectal de 3 Capas**:
    - Capa 1: Desplazamientos Fonéticos y Acústicos.
    - Capa 2: Filtro Pragmático *"Lo que dijo vs Lo que realmente quiso decir"*.
    - Capa 3: Formulación de Contra-Respuesta Diplomática C1 para liderazgo mexicano.
  - **Reproductor Acústico & Visualizador de Espectro**: Síntesis de voz Web Speech API con locales específicos, selector de cadencia (0.8x, 1.0x, 1.25x), toggle de transcripción y micro-cuestionario diagnóstico interactivo con telemetría de comprensión. *(Completado en `dev.html`, `dev.css`, `dev.js`).*

### 🟢 FASE 6 (Despliegue y Validación Integral) — Copiloto Socrático STEMBot & Escalador Léxico de 3 Niveles
- [x] **6.1 Copiloto de Ingeniería Socrático STEMBot (Evaluador Técnica Feynman)**:
  - **5 Escenarios Críticos Industriales**:
    1. *Automotive & Lean*: Excursión de Cpk en Fresado CNC de Monoblocks (IATF 16949 / MSA / Gauge R&R).
    2. *Medical Devices*: Residuos de Óxido de Etileno (EtO) en Catéteres Cardiovasculares (ISO 11737 / ISO 10993-7 / SAL $10^{-6}$).
    3. *Semiconductors*: Neutralización de Carga Electrostática (ESD) en Dicing de Wafers de 3nm (SEMI E10 / ANSI/ESD S20.20).
    4. *Logistics & Global Trade*: Detención Aduanera en Puente Laredo y Temporalidad Anexo 24 (T-MEC / Incoterms FCA / TIGIE vs HTSUS).
    5. *Energy & Data Centers*: Disparo de Interlock por Potencia Inversa y Distorsión Armónica 5ª de 40MW en Querétaro (CENACE Código de Red 2.0).
  - **Motor de Calificación Rúbrica Multi-Criterio**: Evaluación de Precisión Mecánica (0-100%), Claridad Operativa, Densidad Léxica y Aislamiento de Causa Raíz.
  - **Detección Automática de Collocations Técnicas**: Resaltado interactivo de frases y términos de alta jerarquía técnica.
- [x] **6.2 Escalador Léxico de 3 Niveles (Shopfloor SOP ➔ 8D Audit ➔ Executive C1)**:
  - Transforma al instante frases operativas cotidianas o ambiguas de la línea de ensamble en tres registros profesionales diferenciados con copiado en 1 clic:
    - *Nivel 1 — Shopfloor SOP*: Lenguaje de estación, claro, imperativo y con protocolo de cuarentena.
    - *Nivel 2 — 8D Quality Audit*: Vocabulario de contención D3, causa raíz D4 y metrología.
    - *Nivel 3 — Executive Cross-Border Escalation (C1)*: Redacción diplomática de alto impacto para stakeholders en EE.UU.
- [x] **6.3 Simulador de Auditoría Socrática en Tiempo Real**:
  - Diálogo interactivo con Arthur Vance (Lead Auditor IATF 16949 / ISO 13485) donde se evalúa la suficiencia de evidencia objetiva de control de parámetros en planta.
- [x] **6.4 PWA Cache Manifest v5.0.0 & Despliegue a Producción DEV**:
  - Actualización de `sw.js` a la versión de caché `stemos-lxp-v5.0.0-nearshoring-enterprise-copilot` con sincronización atómica entre `/dev.html` y `/dev/index.html` (endpoint oficial de Cloudflare para `stemos.org/dev`).

---

## 4. Tareas Programadas y Continuación Autónoma

Se ha configurado una tarea de verificación recurrente (daemon) mediante el sistema `schedule` y un pipeline automatizado:
- **Ejecutar Suite Completa**:
  ```bash
  node scripts/autonomous_dev_pipeline.cjs
  ```
- **Estado Actual**:
  Todas las Fases (1.1 a 6.4) implementadas, verificadas y desplegadas con éxito rotundo (14/14 suites de pruebas DOM y simulación headless aprobadas al 100%, con estricto aislamiento de producción y paridad total en `/dev/`).

