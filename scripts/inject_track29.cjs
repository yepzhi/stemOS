/**
 * scripts/inject_track29.cjs
 * Injects Track 29: Medical Devices & Biomedical Regulatory Engineering
 * (FDA 21 CFR Part 820 / ISO 13485:2016 / ISO 14644-1 Cleanrooms / DHF-DMR-DHR / IQ-OQ-PQ / Bioburden / ISO 14971)
 * into content/courses.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '../content/courses.js');
let fileContent = fs.readFileSync(coursesPath, 'utf8');

// Define Track 29 Data
const track29 = {
    id: "medical-devices",
    title: "Dispositivos Médicos y Normativa Biomédica",
    titleEN: "Medical Devices & Biomedical Regulatory Engineering",
    level: "B1-B2",
    category: "engineering",
    description: "Sistemas de gestión de calidad para dispositivos médicos (FDA 21 CFR Part 820 / ISO 13485), cuartos limpios ISO 14644 (Clase 7 y 8), control de diseño (DHF, DMR, DHR), validación IQ/OQ/PQ, esterilización (EtO/Gamma) y gestión de riesgos ISO 14971.",
    status: "full",
    totalModules: 6,
    standard: "FDA 21 CFR Part 820 (QMSR) / ISO 13485:2016 / ISO 14971 / ISO 14644-1 / ISO 11607",
    modules: [
        {
            id: "med-m1",
            title: "FDA 21 CFR Part 820 & ISO 13485:2016 Medical QMS & Audits",
            titleES: "Gestión de Calidad Médica FDA 21 CFR 820 e ISO 13485 y Auditorías Regulatorias",
            icon: "fa-solid fa-file-medical",
            isGoldModel: true,
            readings: [
                {
                    id: "med-m1-r1",
                    title: "FDA Quality System Regulation (QMSR) Harmonization with ISO 13485",
                    duration: "15 min",
                    content: `> **Regulatory Standard & Legal Authority**: Governed by the **United States Food and Drug Administration (FDA) 21 CFR Part 820** and **ISO 13485:2016 (Medical devices — Quality management systems — Requirements for regulatory purposes)**. Crucial for Quality Assurance Directors, Regulatory Affairs (RA) Associates, and Compliance Engineers in medical device manufacturing clusters (Tijuana, Mexicali, Ciudad Juárez, Reynosa).

# FDA 21 CFR Part 820 & ISO 13485:2016 Medical QMS & Audits

### 1. The Global Medical Device Regulatory Landscape
Unlike general commercial manufacturing or automotive production, medical device manufacturing directly impacts human life and physiological safety. A single defect in an intravenous catheter, cardiac pacemaker lead, or surgical stapler can result in permanent patient injury or death.

Historically, medical device facilities shipping to the United States operated under the FDA's **Quality System Regulation (QSR - 21 CFR Part 820)**, while European and international markets mandated certification to **ISO 13485**. In recent years, the FDA executed the final **Quality Management System Regulation (QMSR)** harmonization rule, aligning Part 820 directly with the structure and risk-management principles of ISO 13485:2016.

Key foundations of this unified medical QMS include:
- **Risk-Based Approach**: Risk management is not a standalone document; it must permeate every process from supplier qualification to post-market surveillance.
- **Management Responsibility**: Executive management must demonstrate active oversight through scheduled Management Reviews, resource allocation, and quality policy enforcement.
- **Traceability of Personnel**: Stringent documentation showing that all operators entering controlled environments possess validated training records for specific assembly steps.

### 2. FDA Form 483 vs Warning Letter vs Recall
During an unannounced or scheduled FDA inspection (conducted by FDA Consumer Safety Officers), findings are classified into escalating legal tiers:
1. **FDA Form 483 (Inspectional Observations)**: A formal notice issued at the conclusion of an inspection listing conditions that, in the investigator's judgment, represent violations of the Food, Drug, and Cosmetic (FD&C) Act. The manufacturer has exactly **15 business days** to submit a thorough, evidence-backed Corrective Action response.
2. **Warning Letter**: Issued by the FDA Center for Devices and Radiological Health (CDRH) when a company's 483 response is inadequate, incomplete, or reveals systemic breakdown. Warning letters are published on the FDA public website, freeze government procurement, and immediately halt export certificates (Certificate to Foreign Government - CFG).
3. **Medical Device Recalls (Class I, II, III)**:
   - **Class I**: Reasonable probability that use of or exposure to the device will cause **serious adverse health consequences or death** (e.g., defective defibrillator capacitors).
   - **Class II**: Exposure may cause temporary or medically reversible adverse health consequences.
   - **Class III**: Use of the device is not likely to cause adverse health consequences (e.g., minor labeling error).

### 3. Medical Device Single Audit Program (MDSAP)
To reduce audit fatigue, the **MDSAP** framework allows a single recognized Auditing Organization (AO) to conduct an annual audit satisfying the regulatory QMS mandates of five sovereign jurisdictions simultaneously:
- **United States** (FDA)
- **Canada** (Health Canada)
- **Brazil** (ANVISA)
- **Japan** (MHLW/PMDA)
- **Australia** (TGA)`
                },
                {
                    id: "med-m1-r2",
                    title: "Medical Audit Trail, Line Clearance & Good Documentation Practices (GDP)",
                    duration: "13 min",
                    content: `> **Operational Quality Standard**: Aligned with **ALCOA+ Principles for Data Integrity** and **ISO 13485 Clause 4.2 (Documentation Requirements)**.

### 1. Good Documentation Practices (GDP) & ALCOA+
In medical device cleanrooms and test laboratories, an unwritten law reigns: *"If it is not documented, it did not happen."* Every record, signature, and entry must satisfy **ALCOA+**:
- **Attributable**: Identifies the person who performed the action, signed in indelible ink or secured via 21 CFR Part 11 compliant digital signature.
- **Legible**: Traceable and readable throughout the required product shelf-life (often device lifetime plus 2 years).
- **Contemporaneous**: Recorded at the exact moment the task is executed—never backdated or pre-signed.
- **Original**: Primary source record, not a transcribed copy.
- **Accurate**: Honest representation of measurements without unauthorized rounding or whitewashing.
- **Complete, Consistent, Enduring & Available**: Archival integrity throughout audit cycles.

### 2. Strict Line Clearance Protocols
To prevent **mix-ups and cross-contamination** between differing product variants, cleanroom assembly lines must execute a formal **Line Clearance** prior to introducing any new production order:
- All parts, components, sub-assemblies, and rejected items from the preceding batch must be physically evacuated from the cleanroom cell.
- Obsolete work instructions, drawing travelers, and serialized labels must be cleared and accounted for in the scrap log.
- Cleanroom work surfaces must be wiped down with validated disinfectant (e.g., 70% Sterile Isopropyl Alcohol / IPA).
- The Line Clearance checklist must be co-signed by the Line Lead and an independent Quality Inspector before the new Device History Record (DHR) is opened.`
                }
            ],
            dialogue: [
                {
                    role: "Specialist Karen Vance (FDA Lead Investigator, San Diego District)",
                    content: "Good morning, Engineer Villalobos. We are conducting an inspection of your Class II cardiovascular guide catheter cleanroom line. I would like to begin by reviewing your trending log for non-conformances and your CAPA log for the past twelve months.",
                    translation: "Buenos días, Ingeniero Villalobos. Estamos realizando una inspección de su línea de cuarto limpio para catéteres guía cardiovasculares Clase II. Me gustaría comenzar revisando su registro de tendencias de no conformidades y su registro de CAPA de los últimos doce meses.",
                    pedagogicalNotes: "Target terms: Class II cardiovascular guide catheter, cleanroom line, non-conformances trending log, CAPA log"
                },
                {
                    role: "Ing. Alejandro Villalobos (Director of Quality & Regulatory Affairs, Tijuana)",
                    content: "Good morning, Investigator Vance. Welcome to our facility. Here is our secure terminal displaying our 21 CFR Part 11 compliant electronic Quality Management System. As you can see, our CAPA log shows seven open actions, all currently tracking within their targeted verification-of-effectiveness deadlines.",
                    translation: "Buenos días, Investigadora Vance. Bienvenida a nuestras instalaciones. Aquí tiene nuestra terminal segura que muestra nuestro Sistema de Gestión de Calidad electrónico que cumple con 21 CFR Parte 11. Como puede ver, nuestro registro de CAPA muestra siete acciones abiertas, todas actualmente en seguimiento dentro de sus plazos de verificación de eficacia.",
                    pedagogicalNotes: "Target terms: 21 CFR Part 11 compliant, electronic QMS, open actions, verification-of-effectiveness deadlines"
                },
                {
                    role: "Specialist Karen Vance (FDA Lead Investigator, San Diego District)",
                    content: "I notice CAPA 2026-042 was opened following a customer complaint regarding catheter tip delamination. What interim containment was executed on the shopfloor while the root cause investigation was underway?",
                    translation: "Noto que la CAPA 2026-042 se abrió tras una queja de cliente sobre la delaminación de la punta del catéter. ¿Qué contención provisional se ejecutó en piso de producción mientras se desarrollaba la investigación de causa raíz?",
                    pedagogicalNotes: "Target terms: customer complaint, catheter tip delamination, interim containment, root cause investigation"
                },
                {
                    role: "Ing. Alejandro Villalobos (Director of Quality & Regulatory Affairs, Tijuana)",
                    content: "We immediately initiated a warehouse quarantine on all finished lots sharing that polymer resin extrusion heat. Furthermore, our cleanroom team performed an immediate line clearance, calibrated the ultrasonic tip-forming dies, and instituted 100% tensile pull-testing at our final packaging barrier station.",
                    translation: "Iniciamos de inmediato una cuarentena en almacén para todos los lotes terminados que compartían esa corrida de extrusión de resina polimérica. Además, nuestro equipo de cuarto limpio realizó un despeje de línea inmediato, calibró los dados de conformado ultrasónico de punta e instituyó pruebas de tracción al 100% en nuestra estación final de empaque barrera.",
                    pedagogicalNotes: "Target terms: warehouse quarantine, extrusion heat, line clearance, ultrasonic tip-forming dies, tensile pull-testing, packaging barrier"
                }
            ],
            lexiconMatrix: [
                {
                    term: "FDA 21 CFR Part 820",
                    ipa: "/ˌɛf.diːˈeɪ ˈtwɛn.ti wʌn ˌsiː.ɛfˈɑːr pɑːrt eɪt ˈtwɛn.ti/",
                    es: "Reglamento del Sistema de Calidad de la FDA (QMSR)",
                    category: "Normativa Regulatoria",
                    definition: "The United States federal regulation governing the methods used in, and the facilities and controls used for, the design, manufacture, packaging, labeling, storage, installation, and servicing of all finished medical devices.",
                    collocations: ["Part 820 compliance", "FDA surveillance inspection", "QMSR transition"],
                    falseFriends: "No es una guía optativa; es una ley federal vinculante con consecuencias penales por negligencia grave.",
                    nativeUsage: "The Tijuana plant upgraded its SOPs to harmonize with the revised FDA 21 CFR Part 820 QMSR rule."
                },
                {
                    term: "ISO 13485:2016",
                    ipa: "/ˌaɪ.ɛsˈoʊ θɜːrˈtiːn fɔːr ˈeɪ.ti faɪv/",
                    es: "Norma internacional de gestión de calidad para dispositivos médicos",
                    category: "Estándares Médicos",
                    definition: "The internationally recognized standard for quality management systems specific to medical devices, focusing on regulatory compliance, risk management, and design control.",
                    collocations: ["ISO 13485 certification", "notified body audit", "design dossier compliance"],
                    falseFriends: "Difiere de ISO 9001 en que prioriza la seguridad del paciente y cumplimiento legal por encima de la satisfacción comercial del cliente.",
                    nativeUsage: "Our contract manufacturing facility achieved ISO 13485:2016 certification without a single non-conformance."
                },
                {
                    term: "FDA Form 483",
                    ipa: "/ˌɛf.diːˈeɪ fɔːrm fɔːr ˈeɪ.ti θriː/",
                    es: "Formulario 483 de la FDA (Observaciones de Inspección)",
                    category: "Auditoría FDA",
                    definition: "A formal document presented by FDA investigators to top management at the end of an on-site audit detailing observed conditions violating Good Manufacturing Practices (GMP).",
                    collocations: ["issue a Form 483", "respond to 483 observations", "15-day response window"],
                    falseFriends: "No es una multa instantánea; es una notificación formal de hallazgos que exige un plan de acción correctiva en 15 días.",
                    nativeUsage: "The QA team worked around the clock to submit a bulletproof response to the FDA Form 483 within the mandated 15-day timeline."
                },
                {
                    term: "Line Clearance",
                    ipa: "/laɪn ˈklɪr.əns/",
                    es: "Despeje de línea de ensamble",
                    category: "Control en Piso Limpio",
                    definition: "The standardized procedure of completely clearing a workstation and assembly line of all components, tools, labels, and records from a previous job before commencing a new lot.",
                    collocations: ["conduct line clearance", "sign off on line clearance", "line clearance checklist"],
                    falseFriends: "No significa 'limpiar el piso con agua'; es la verificación metódica de cero residuos o etiquetas del lote anterior para evitar confusiones de producto.",
                    nativeUsage: "The cleanroom supervisor verified the line clearance checklist before loading the new lot of stent delivery catheters."
                },
                {
                    term: "Good Documentation Practices (GDP)",
                    ipa: "/ɡʊd ˌdɑː.kjə.mɛnˈteɪ.ʃən ˈpræk.tɪ.sɪz/",
                    es: "Buenas Prácticas de Documentación (BPD / GDP)",
                    category: "Aseguramiento de Calidad",
                    definition: "A system of strict guidelines ensuring that all recorded data, lab notebooks, and production logs are attributable, legible, contemporaneous, original, and accurate (ALCOA+).",
                    collocations: ["GDP compliance", "single-line strike-through with initial and date", "ALCOA standards"],
                    falseFriends: "Prohibido el uso de líquido corrector (white-out) o sobreescritura; los errores se corrigen con una sola línea recta, fecha, inicial y justificación.",
                    nativeUsage: "During the audit, the inspector flagged a GDP violation because an operator omitted the date next to a correction."
                },
                {
                    term: "MDSAP (Medical Device Single Audit Program)",
                    ipa: "/ˈɛm.diː.sæp/",
                    es: "Programa de Auditoría Única para Dispositivos Médicos",
                    category: "Auditorías Globales",
                    definition: "A global initiative that allows a single regulatory audit conducted by an authorized Auditing Organization to satisfy the QMS requirements of the US, Canada, Brazil, Japan, and Australia.",
                    collocations: ["MDSAP certified facility", "MDSAP audit model", "Health Canada MDSAP mandate"],
                    falseFriends: "No sustituye las inspecciones de causa justificada de la FDA, pero exime a la planta de múltiples auditorías rutinarias extranjeras.",
                    nativeUsage: "By passing the annual MDSAP audit, our Juárez plant maintained export access to both the US FDA and Health Canada."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "FDA Form 483 Timelines",
                    botQuestion: "Welcome to the Medical Device Regulatory Lab! If an FDA investigator issues an FDA Form 483 following an audit of your cleanroom facility, how many business days does your company have to submit a formal written corrective action response?",
                    requiredKeywords: ["15", "fifteen", "business days", "days"],
                    minKeywords: 2,
                    feedbackSuccess: "Exact! The FDA mandates a strict 15-business-day window to submit a comprehensive corrective action response with objective evidence to avoid escalation to a Warning Letter.",
                    feedbackRetry: "Remember the federal statutory window: it is a number of business days between 10 and 20."
                },
                {
                    step: 2,
                    concept: "Good Documentation Practices (GDP)",
                    botQuestion: "In a medical device manufacturing facility, what is the mandatory GDP protocol if an operator writes down an incorrect calibration value on a paper Device History Record (DHR)? How must it be corrected?",
                    requiredKeywords: ["single line", "strike", "initial", "date", "reason"],
                    minKeywords: 3,
                    feedbackSuccess: "Spot on! The operator must draw a single strike-through line across the incorrect entry, write the correct value alongside, and provide their initials, date, and brief rationale—never using white-out or scribbles.",
                    feedbackRetry: "Think about ALCOA+. You cannot obliterate the original data. You need a single line strike-through, initials, and date."
                }
            ],
            quiz: [
                {
                    q: "What is the primary objective of harmonizing FDA 21 CFR Part 820 into the Quality Management System Regulation (QMSR)?",
                    options: [
                        "To align FDA medical device quality regulations directly with the global ISO 13485:2016 standard and its risk-management principles",
                        "To eliminate all FDA plant audits in Mexican maquiladoras",
                        "To allow medical devices to be sold without clinical trials or pre-market clearance",
                        "To replace all human cleanroom operators with autonomous humanoid robots"
                    ],
                    answer: 0
                },
                {
                    q: "Under Good Documentation Practices (GDP), what do the ALCOA+ principles mandate for recorded data?",
                    options: [
                        "Data must be Attributable, Legible, Contemporaneous, Original, and Accurate",
                        "Data can be approximated from memory at the end of the work week",
                        "Correction fluid (white-out) must be used on all spelling mistakes",
                        "Records should be shredded after 30 days to protect intellectual property"
                    ],
                    answer: 0
                },
                {
                    q: "What is the operational purpose of executing a strict 'Line Clearance' before beginning a new cleanroom batch?",
                    options: [
                        "To remove all components, travelers, labels, and tools from the prior job to prevent catastrophic product mix-ups and cross-contamination",
                        "To let the operators take an unscheduled 45-minute lunch break",
                        "To shut down the cleanroom HEPA filters and save electrical energy",
                        "To clean the facility windows with ammonia-based cleaners"
                    ],
                    answer: 0
                },
                {
                    q: "Which sovereign regulatory agencies participate in the Medical Device Single Audit Program (MDSAP)?",
                    options: [
                        "USA (FDA), Canada (Health Canada), Brazil (ANVISA), Japan (MHLW/PMDA), and Australia (TGA)",
                        "China (NMPA), Russia (Roszdravnadzor), and India (CDSCO) exclusively",
                        "European Union member states only",
                        "OPEC member nations"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "med-m2",
            title: "Design Controls & The Documentation Trinity: DHF, DMR, DHR",
            titleES: "Controles de Diseño y la Trinidad Documental: DHF, DMR, DHR y Control de Cambios",
            icon: "fa-solid fa-folder-tree",
            isGoldModel: true,
            readings: [
                {
                    id: "med-m2-r1",
                    title: "The Medical Documentation Trinity: DHF vs DMR vs DHR",
                    duration: "15 min",
                    content: `> **Engineering Documentation Standard**: Governed by **FDA 21 CFR 820.30 (Design Controls)**, **820.181 (Device Master Record)**, and **820.184 (Device History Record)**.

# The Medical Documentation Trinity: DHF vs DMR vs DHR

In medical device engineering, confusing the acronyms **DHF, DMR, and DHR** is a fatal audit trap. These three documents represent the complete lifecycle of a medical device:

| Acronym | Full Name | Lifecycle Stage | Analogy | Core Contents |
| :--- | :--- | :--- | :--- | :--- |
| **DHF** | **Design History File** | R&D & Design Validation | *The Design Diary* | Design inputs, design outputs, design verification/validation protocols, risk analysis (FMEA), clinical trial data, and design transfer sign-offs. Proves how the device was designed. |
| **DMR** | **Device Master Record** | Manufacturing Recipe | *The Master Cookbook* | Complete engineering drawings, BOM (Bill of Materials), software source code, equipment calibration specs, cleanroom assembly SOPs, and packaging/labeling artwork. |
| **DHR** | **Device History Record** | Production Batch Tracking | *The Birth Certificate* | Serial/lot numbers, quantity manufactured, raw material lot certificates, environmental cleanroom readings during the shift, operator signatures, and final release sign-offs. |

### 1. The Design Controls Cascade (Waterfall Model)
Under 21 CFR 820.30, design development follows a disciplined validation cascade:
1. **User Needs**: What the surgeon, clinician, or patient requires (e.g., *"The vascular stent must navigate through tortuous 2 mm femoral arteries without kinking"*).
2. **Design Inputs**: Measurable physical, chemical, and electrical engineering criteria derived from User Needs (e.g., *"Outer diameter $\le 1.85\\text{ mm}$, trackability force $\le 0.4\\text{ N}$, kink resistance radius $\ge 5\\text{ mm}$"*).
3. **Design Outputs**: The completed blueprints, component specifications, and assembly procedures (which eventually populate the DMR).
4. **Design Verification**: Testing whether the **Design Output matches the Design Input** (*"Did we design the device right?"* — benchtop testing, tensile testing, burst pressure testing).
5. **Design Validation**: Testing whether the device **satisfies User Needs** under realistic clinical operating conditions (*"Did we design the right device?"* — animal studies, simulated cadaver trials, human clinical evaluations).`
                },
                {
                    id: "med-m2-r2",
                    title: "Engineering Change Orders (ECO), Redlines & Design Transfer",
                    duration: "12 min",
                    content: `> **Engineering Quality Standard**: Aligned with **ISO 13485 Clause 7.3.9 (Control of Design and Development Changes)**.

### 1. Design Transfer Milestone
Design Transfer is the formal gateway where an R&D prototype moves from the laboratory into commercial high-volume cleanroom manufacturing. Key milestones include:
- Verifying that manufacturing operators can consistently produce acceptable yields using only the drafted Device Master Record (DMR) SOPs.
- Proving that production tooling, test fixtures, and gages are calibrated and qualified via Installation, Operational, and Performance Qualification (IQ/OQ/PQ).
- Obtaining formal cross-functional sign-off from R&D, Manufacturing Engineering, Quality, and Regulatory Affairs.

### 2. Engineering Change Orders (ECO) & Change Control
In a regulated medical plant, an engineer cannot modify a drill bit size, laser weld speed, or adhesive brand through informal verbal instructions:
- **Change Request (CR)**: Justifies the technical, cost, or quality reason for the proposed modification.
- **Risk Assessment**: Evaluates potential impacts on biocompatibility, electrical safety, or mechanical strength under ISO 14971.
- **Regulatory Assessment**: Determines whether the modification requires a new FDA 510(k) pre-market notification or a European CE Mark dossier supplement.
- **Engineering Change Order (ECO)**: The binding document that formally revises the DMR, establishes effective implementation dates, and mandates training of cleanroom assembly personnel.`
                }
            ],
            dialogue: [
                {
                    role: "Dr. Gregory Vance (VP of R&D, Irvine, California)",
                    content: "Rodrigo, our San Diego design team is completing the Design Transfer package for the Gen-3 laparoscopic surgical trocar. We are handing over the Design History File. Has your Juárez engineering team reviewed the draft Device Master Record?",
                    translation: "Rodrigo, nuestro equipo de diseño en San Diego está completando el paquete de Transferencia de Diseño para el trocar quirúrgico laparoscópico Gen-3. Les estamos transfiriendo el Expediente de Historia del Diseño (DHF). ¿Ha revisado su equipo de ingeniería en Juárez el borrador del Registro Maestro del Dispositivo (DMR)?",
                    pedagogicalNotes: "Target terms: Design Transfer package, laparoscopic surgical trocar, Design History File (DHF), Device Master Record (DMR)"
                },
                {
                    role: "Ing. Rodrigo Saldaña (Principal Manufacturing Engineer, Ciudad Juárez)",
                    content: "Yes, Gregory. We cross-referenced the bill of materials and assembly drawings in the DMR against our pilot cleanroom cell. Our primary concern is the adhesive curing cycle in step 14; the specified UV exposure window is too narrow for standard conveyor speeds.",
                    translation: "Sí, Gregory. Cotejamos la lista de materiales y los planos de ensamble del DMR contra nuestra celda piloto de cuarto limpio. Nuestra principal preocupación es el ciclo de curado de adhesivo en el paso 14; la ventana de exposición UV especificada es demasiado estrecha para las velocidades estándar de transportador.",
                    pedagogicalNotes: "Target terms: bill of materials (BOM), assembly drawings, pilot cleanroom cell, adhesive curing cycle, UV exposure window"
                },
                {
                    role: "Dr. Gregory Vance (VP of R&D, Irvine, California)",
                    content: "Good catch. We cannot change that curing tolerance without an approved ECO and an update to the design verification report in the DHF. Can you draft an Engineering Change Request with thermal sensor logs from your pilot run?",
                    translation: "Buena observación. No podemos cambiar esa tolerancia de curado sin un ECO aprobado y una actualización al reporte de verificación de diseño en el DHF. ¿Podrías redactar una Solicitud de Cambio de Ingeniería con registros de sensores térmicos de su corrida piloto?",
                    pedagogicalNotes: "Target terms: approved ECO, design verification report, DHF, Engineering Change Request (ECR), pilot run"
                },
                {
                    role: "Ing. Rodrigo Saldaña (Principal Manufacturing Engineer, Ciudad Juárez)",
                    content: "I will upload the ECR with thermal camera datalogs and shear strength test data by 3:00 PM today so regulatory affairs can confirm no 510(k) filing impact before we release the production DHR travelers.",
                    translation: "Subiré el ECR con los registros de datos de cámara térmica y datos de prueba de resistencia al corte hoy a las 3:00 PM para que asuntos regulatorios confirme que no hay impacto en el registro 510(k) antes de liberar las hojas viajeras del DHR de producción.",
                    pedagogicalNotes: "Target terms: shear strength test data, regulatory affairs, 510(k) filing impact, production DHR travelers"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Design History File (DHF)",
                    ipa: "/dɪˈzaɪn ˈhɪs.tɚ.i faɪl/",
                    es: "Expediente de Historia del Diseño (DHF)",
                    category: "Documentación Médica",
                    definition: "A compilation of records that describes the design history of a finished medical device, demonstrating that it was developed in accordance with approved design plans.",
                    collocations: ["compile the DHF", "DHF design review", "audit the DHF"],
                    falseFriends: "No es la historia de la empresa ni un currículum; es el expediente exhaustivo de I+D que prueba la verificación y validación del diseño.",
                    nativeUsage: "The auditor examined the DHF to verify that every user need had a corresponding clinical validation test."
                },
                {
                    term: "Device Master Record (DMR)",
                    ipa: "/dɪˈvaɪs ˈmæs.tɚ ˈrɛk.ɚd/",
                    es: "Registro Maestro del Dispositivo (DMR / Receta de Fabricación)",
                    category: "Manufactura Médica",
                    definition: "A comprehensive compilation of records containing the complete technical procedures, blueprints, BOMs, and specifications for manufacturing a finished medical device.",
                    collocations: ["release the DMR", "DMR specifications", "assembly instructions in DMR"],
                    falseFriends: "DMR es la 'receta maestra' general; DHR es el registro individual de una orden o lote específico producido.",
                    nativeUsage: "Any change to a component tolerance requires a formal Engineering Change Order to update the DMR."
                },
                {
                    term: "Device History Record (DHR)",
                    ipa: "/dɪˈvaɪs ˈhɪs.tɚ.i ˈrɛk.ɚd/",
                    es: "Registro de Historia del Dispositivo (DHR / Acta de Nacimiento del Lote)",
                    category: "Trazabilidad de Lote",
                    definition: "A compilation of records containing the complete production history of a specific finished medical device lot, including serialized travelers, test results, and release signatures.",
                    collocations: ["review the DHR package", "DHR sign-off", "sterile batch DHR"],
                    falseFriends: "Es el documento individual que acompaña a cada lote físico en piso; sin su firma de liberación el lote no puede ser exportado.",
                    nativeUsage: "The quality inspector reviewed the DHR to ensure all 500 pacemaker leads passed 100% dielectric insulation testing."
                },
                {
                    term: "Design Verification",
                    ipa: "/dɪˈzaɪn ˌvɛr.ə.fəˈkeɪ.ʃən/",
                    es: "Verificación de Diseño (¿Diseñamos bien el dispositivo?)",
                    category: "Ingeniería de Diseño",
                    definition: "Confirmation by examination and provision of objective evidence that specified design output requirements have fulfilled the design input specifications.",
                    collocations: ["execute design verification", "verification test protocol", "benchtop verification testing"],
                    falseFriends: "No confundir con Validación; Verificación prueba datos técnicos contra especificaciones en banco de pruebas.",
                    nativeUsage: "Design verification proved the surgical blade maintains sharpness after 100 simulated incisions."
                },
                {
                    term: "Design Validation",
                    ipa: "/dɪˈzaɪn ˌvæl.əˈdeɪ.ʃən/",
                    es: "Validación de Diseño (¿Diseñamos el dispositivo correcto?)",
                    category: "Ensayos Clínicos",
                    definition: "Establishing by objective evidence that device specifications conform with user needs and intended medical uses under simulated or actual clinical conditions.",
                    collocations: ["clinical design validation", "cadaveric validation trial", "human factors validation"],
                    falseFriends: "Valida la experiencia clínica real con médicos cirujanos o usuarios finales, no solo mediciones dimensionales en fábrica.",
                    nativeUsage: "Simulated surgery in animal models formed the core of our laparoscopic grasper design validation."
                },
                {
                    term: "Engineering Change Order (ECO)",
                    ipa: "/ˌɛn.dʒəˈnɪr.ɪŋ tʃeɪndʒ ˈɔːr.dɚ/",
                    es: "Orden de Cambio de Ingeniería (ECO)",
                    category: "Control de Cambios",
                    definition: "A formal document authorizing and specifying changes to engineering drawings, materials, software, or manufacturing processes in the Device Master Record.",
                    collocations: ["initiate an ECO", "route ECO for cross-functional approval", "ECO implementation date"],
                    falseFriends: "No es una sugerencia verbal; es una modificación técnica formal con evaluación de impacto regulatorio y de riesgos.",
                    nativeUsage: "The manufacturing plant released an ECO to replace an obsolete stainless steel alloy with medical-grade titanium."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "The Medical Documentation Trinity",
                    botQuestion: "In medical device manufacturing, what is the exact technical acronym for the master 'cookbook' or file containing the complete blueprints, bill of materials (BOM), assembly SOPs, and packaging artwork required to manufacture a device?",
                    requiredKeywords: ["dmr", "device master record"],
                    minKeywords: 1,
                    feedbackSuccess: "Correct! The DMR (Device Master Record) is the definitive manufacturing recipe containing all engineering drawings, BOMs, and SOPs necessary to produce the device.",
                    feedbackRetry: "Remember the three acronyms: DHF is the design diary, DHR is the lot birth certificate, and this one is the Device Master Record."
                },
                {
                    step: 2,
                    concept: "Verification vs Validation",
                    botQuestion: "What is the crucial conceptual difference between Design Verification and Design Validation under FDA 21 CFR 820.30?",
                    requiredKeywords: ["verification", "validation", "inputs", "outputs", "user needs"],
                    minKeywords: 2,
                    feedbackSuccess: "Outstanding! Design Verification confirms that Design Outputs satisfy Design Inputs ('Did we design the device right?'), whereas Design Validation confirms that the device satisfies User Needs under clinical conditions ('Did we design the right device?').",
                    feedbackRetry: "Think about the questions: 'Did we design the device right against engineering specs?' vs 'Did we design the right device for user and clinical needs?'."
                }
            ],
            quiz: [
                {
                    q: "Which medical documentation file contains the batch-specific records, operator signatures, environmental cleanroom logs, and serial numbers for a specific manufactured lot?",
                    options: [
                        "Device History Record (DHR)",
                        "Design History File (DHF)",
                        "Device Master Record (DMR)",
                        "Employee Personnel File"
                    ],
                    answer: 0
                },
                {
                    q: "Under FDA 21 CFR 820.30 Design Controls, what is the role of Design Verification?",
                    options: [
                        "Proving with objective evidence that Design Outputs meet the specified Design Inputs through benchtop and functional testing",
                        "Conducting focus groups with hospital marketing executives",
                        "Setting the retail hospital sale price for the finished device",
                        "Printing serial numbers on customer cardboard boxes"
                    ],
                    answer: 0
                },
                {
                    q: "What must be formally executed before any change to a component material, assembly process, or tolerance can be applied on a medical cleanroom floor?",
                    options: [
                        "An Engineering Change Order (ECO) with risk assessment and cross-functional sign-off",
                        "An informal sticky note on the operator's workbench",
                        "A casual phone call to the cleanroom janitorial staff",
                        "An announcement on social media"
                    ],
                    answer: 0
                },
                {
                    q: "What core documents reside within a Device History File (DHF)?",
                    options: [
                        "Design plans, User Needs, Design Inputs, Verification/Validation protocols, risk management files (ISO 14971), and design reviews",
                        "Monthly cafeteria lunch menus and holiday schedules",
                        "Supplier invoices for cleanroom janitorial supplies",
                        "Corporate tax returns filed in Delaware"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "med-m3",
            title: "Cleanroom Operations: ISO 14644 (Class 7 & 8), Gowning & Bioburden Control",
            titleES: "Operaciones en Cuarto Limpio: ISO 14644 (Clase 7 y 8), Protocolos de Vestido y Control de Bioburden",
            icon: "fa-solid fa-vest-patches",
            isGoldModel: true,
            readings: [
                {
                    id: "med-m3-r1",
                    title: "ISO 14644-1 Cleanroom Classification, Airborne Particle Counts & Differential Pressure",
                    duration: "15 min",
                    content: `> **Engineering Cleanroom Standard**: Governed by **ISO 14644-1:2015 (Classification of air cleanliness by particle concentration)** and **ISO 14644-2 (Monitoring to provide evidence of cleanroom performance)**. Essential for Facilities Engineers, Cleanroom Supervisors, and Microbiology Quality Analysts.

# Cleanroom Operations: ISO 14644 (Class 7 & 8) & Bioburden Control

### 1. What is an ISO Classified Cleanroom?
In medical device manufacturing, atmospheric airborne dust, skin flakes, synthetic fibers, and bacteria present catastrophic risks. An airborne particle settling onto a vascular implant can trigger a lethal thromboembolism or bloodstream infection.

A **Cleanroom** is an enclosed environment engineered to control airborne particulate contamination, microbial levels, temperature, relative humidity (RH), and air pressure differentials.

### 2. ISO 14644-1 Cleanroom Air Cleanliness Classes
The standard defines cleanliness based on maximum allowable concentrations of airborne particles per cubic meter of air ($particles/m^3$):

| ISO Class | Equivalent US FS 209E Class | Max Particles $\ge 0.5\\mu m$ per $m^3$ | Max Particles $\ge 5.0\\mu m$ per $m^3$ | Common Medical Device Applications |
| :--- | :--- | :--- | :--- | :--- |
| **ISO 5** | Class 100 | $3,520$ | $29$ | Laminar flow hoods, sterile fill/finish, micro-optics. |
| **ISO 7** | Class 10,000 | $352,000$ | $2,930$ | Primary assembly of invasive cardiovascular catheters, orthopedic implants, and sterile barrier packaging. |
| **ISO 8** | Class 100,000 | $3,520,000$ | $29,300$ | Sub-assembly staging, molding of plastic housing components, gowning airlocks. |

### 3. Critical Environmental Parameters
Maintaining cleanroom integrity requires continuous automated monitoring of four critical physics parameters:
1. **HEPA / ULPA Filtration**: High-Efficiency Particulate Air (HEPA) filters capture $\ge 99.97\\%$ of particles down to $0.3\\mu m$. Air changes per hour (ACH) typically range from 30 to 60 ACH in ISO 7 suites.
2. **Positive Differential Pressure Cascade**: Cleanrooms maintain positive air pressure relative to adjacent corridors (typically $+10\\text{ to }+15\\text{ Pascals}$ or $+0.04\\text{ to }+0.06\\text{ inches of water column}$). When an airlock door opens, air rushes *outward*, preventing contaminated hallway air from entering.
3. **Temperature & Relative Humidity (RH)**: Maintained strictly at $68^\\circ\\text{F} \\pm 3^\\circ\\text{F}$ ($20^\\circ\\text{C} \\pm 2^\\circ\\text{C}$) and $30\\% - 60\\%\\text{ RH}$. Excess humidity encourages microbial proliferation; low humidity triggers static electrical discharge (ESD).
4. **Isokinetic Particle Counters**: Calibrated optical particle sensors positioned at critical assembly points continuously sample cleanroom air volume.`
                },
                {
                    id: "med-m3-r2",
                    title: "Aseptic Gowning Protocols, Air Showers & Bioburden Environmental Monitoring",
                    duration: "13 min",
                    content: `> **Microbiology Standard**: Aligned with **ISO 11737-1 (Determination of a population of microorganisms on products - Bioburden)** and **USP <1116> (Microbial Control and Monitoring of Cleanrooms)**.

### 1. Personnel as the Primary Contamination Vector
Over $80\\%$ of airborne particles and viable microorganisms inside a cleanroom originate from human operators shedding dead skin cells (squames), respiratory droplets, hair fragments, and makeup residue. Consequently, entering a cleanroom requires strict adherence to an **Aseptic Gowning Protocol**:
- **Zone 1 (Pre-Entry Antechamber)**: Remove outdoor shoes and don dedicated cleanroom safety shoes; remove all jewelry, watches, and cosmetics.
- **Zone 2 (Gowning Airlock)**:
  1. Don sterile bouffant hair net (ensuring zero exposed hair) and beard cover.
  2. Perform surgical hand scrubbing with antimicrobial soap followed by automated hand drying.
  3. Don lint-free disposable face mask covering nose and mouth.
  4. Don non-shedding Tyvek cleanroom coveralls (bunny suit), ensuring the suit never touches the floor during entry.
  5. Step over the physical **Sticky Mat / Cleanroom Bench Divider** into the clean buffer zone.
  6. Don sterile boot covers over pant legs; don sterile powder-free nitrile gloves, tucking coverall cuffs beneath glove gauntlets.
  7. Spray gloved hands with sterile 70% IPA and proceed through the **Air Shower** (30-second high-velocity HEPA purge).

### 2. Environmental Monitoring (EM) & Bioburden
- **Settle Plates (Passive Air)**: Petri dishes containing Tryptic Soy Agar (TSA) exposed to ambient cleanroom air for 4 hours to capture settling bacteria and fungi.
- **Contact Plates (RODAC)**: Convex agar plates pressed directly onto operator fingertips, forearms, gowning suits, and stainless steel workbench surfaces.
- **Bioburden Testing**: Quantifying the baseline microbial count on unsterilized products ($CFU / unit$ - Colony Forming Units) prior to final sterilization.`
                }
            ],
            dialogue: [
                {
                    role: "Dr. Marcus Chen (Corporate Biosafety Auditor, Minneapolis)",
                    content: "Mariela, let's walk through your gowning antechamber and review your differential pressure cascade logs for the ISO Class 7 vascular stent crimping suite. I noticed your differential pressure gauge dropped to 6 Pascals yesterday afternoon.",
                    translation: "Mariela, recorramos su antecámara de vestido y revisemos sus registros de cascada de presión diferencial para la suite ISO Clase 7 de engarzado de stents vasculares. Noté que su manómetro de presión diferencial cayó a 6 Pascales ayer por la tarde.",
                    pedagogicalNotes: "Target terms: gowning antechamber, differential pressure cascade logs, ISO Class 7, differential pressure gauge"
                },
                {
                    role: "Ing. Mariela Cárdenas (Cleanroom Facilities & Microbiology Lead, Reynosa)",
                    content: "Yes, Dr. Chen. At 14:20 yesterday, an interlock alarm tripped when an operator inadvertently opened both the airlock entry door and the cleanroom exit door simultaneously. Our BMS logged a containment alert, and production was halted for 45 minutes while the HVAC system purged the air and recovered a steady 14 Pascals.",
                    translation: "Sí, Dr. Chen. A las 14:20 de ayer, sonó una alarma de enclavamiento cuando un operador abrió inadvertidamente la puerta de entrada de la esclusa y la puerta de salida del cuarto limpio al mismo tiempo. Nuestro sistema BMS registró una alerta de contención, y la producción se detuvo durante 45 minutos mientras el sistema HVAC purgaba el aire y recuperaba unos constantes 14 Pascales.",
                    pedagogicalNotes: "Target terms: interlock alarm, airlock entry door, BMS (Building Management System), containment alert, HVAC purge"
                },
                {
                    role: "Dr. Marcus Chen (Corporate Biosafety Auditor, Minneapolis)",
                    content: "How did your microbiology team verify environmental recovery before releasing operators back onto the crimping line?",
                    translation: "¿Cómo verificó su equipo de microbiología la recuperación ambiental antes de autorizar el regreso de los operadores a la línea de engarzado?",
                    pedagogicalNotes: "Target terms: microbiology team, environmental recovery, crimping line"
                },
                {
                    role: "Ing. Mariela Cárdenas (Cleanroom Facilities & Microbiology Lead, Reynosa)",
                    content: "Our QC microbiologists ran active isokinetic air particle samples across all six crimping workstations, confirming counts dropped below 120,000 particles per cubic meter—well below the ISO 7 threshold. We also placed settle plates and executed touch RODAC testing on all glove contacts.",
                    translation: "Nuestros microbiólogos de control de calidad ejecutaron muestras activas de partículas de aire isocinéticas en las seis estaciones de trabajo de engarzado, confirmando que los conteos cayeron por debajo de 120,000 partículas por metro cúbico, muy por debajo del umbral de ISO 7. También colocamos placas de sedimentación y ejecutamos pruebas de contacto RODAC en todos los guantes.",
                    pedagogicalNotes: "Target terms: active isokinetic air particle samples, ISO 7 threshold, settle plates, RODAC touch testing"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Cleanroom ISO Class 7",
                    ipa: "/ˈkliːn.ruːm ˌaɪ.ɛsˈoʊ klæs ˈsɛv.ən/",
                    es: "Cuarto Limpio ISO Clase 7 (Clase 10,000)",
                    category: "Infraestructura Médica",
                    definition: "A controlled environment where airborne particulate concentration is maintained at or below 352,000 particles of size 0.5 microns or larger per cubic meter of air.",
                    collocations: ["ISO 7 certification", "ISO 7 cleanroom suite", "HEPA filtered ISO 7"],
                    falseFriends: "No equivale a un quirófano de hospital; es un entorno industrial de alta manufactura con renovación continua de aire forzado.",
                    nativeUsage: "The catheter assembly process was relocated into the new ISO Class 7 cleanroom to reduce particulate defects."
                },
                {
                    term: "Differential Pressure Cascade",
                    ipa: "/ˌdɪf.əˈrɛn.ʃəl ˈprɛʃ.ɚ kæsˈkeɪd/",
                    es: "Cascada de presión diferencial positiva",
                    category: "Ingeniería de Climatización (HVAC)",
                    definition: "The deliberate maintenance of higher air pressure inside cleaner rooms compared to adjacent dirtier corridors, preventing contaminants from entering when doors open.",
                    collocations: ["positive pressure cascade", "differential pressure sensor", "maintain 12 to 15 Pascals"],
                    falseFriends: "Si la presión se invierte y se vuelve negativa, los contaminantes exteriores son succionados hacia el cuarto limpio.",
                    nativeUsage: "The HVAC automation system alarmed when the differential pressure between the airlock and cleanroom dropped below 10 Pa."
                },
                {
                    term: "Bioburden",
                    ipa: "/ˈbaɪ.oʊˌbɜːr.dən/",
                    es: "Carga microbiana (Bioburden)",
                    category: "Microbiología",
                    definition: "The population of viable microorganisms present on or inside a raw material, medical device component, or sterile barrier system prior to sterilization.",
                    collocations: ["bioburden testing", "pre-sterilization bioburden baseline", "CFU limit"],
                    falseFriends: "No es la suciedad visible; es el recuento cuantitativo en laboratorio de bacterias vivas en unidades formadoras de colonias (CFU).",
                    nativeUsage: "Bioburden validation confirmed the surgical implants carried less than 10 CFU per device prior to gamma irradiation."
                },
                {
                    term: "Gowning Protocol",
                    ipa: "/ˈɡaʊ.nɪŋ ˈproʊ.tə.kɑːl/",
                    es: "Protocolo de vestido aséptico de cuarto limpio",
                    category: "Higiene y Control Operativo",
                    definition: "The standardized sequential donning of specialized lint-free cleanroom apparel (bouffant, mask, Tyvek bunny suit, boot covers, sterile gloves) to contain human shedding.",
                    collocations: ["aseptic gowning qualification", "gowning SOP", "breach of gowning protocol"],
                    falseFriends: "Gown no es solo una bata médica; en manufactura de dispositivos involucra el traje completo de Tyvek hermético.",
                    nativeUsage: "All manufacturing technicians must pass annual gowning qualification involving microbial contact plate testing."
                },
                {
                    term: "RODAC Plate (Contact Agar Plate)",
                    ipa: "/ˈroʊ.dæk pleɪt/",
                    es: "Placa RODAC (Placa de agar por contacto para monitoreo microbiológico)",
                    category: "Monitoreo Ambiental",
                    definition: "Replicate Organism Detection and Counting plate; a specialized convex nutrient agar dish pressed directly onto surfaces or operator gloves to sample viable bacteria.",
                    collocations: ["surface RODAC sampling", "RODAC touch plate", "acceptable CFU count on RODAC"],
                    falseFriends: "Es un método microbiológico de muestreo físico directo, no una placa de radiografía.",
                    nativeUsage: "Microbiology technicians took RODAC touch plate samples from the operators' gloves at the end of the shift."
                },
                {
                    term: "HEPA Filter",
                    ipa: "/ˈhɛp.ə ˈfɪl.tɚ/",
                    es: "Filtro HEPA (Filtro de aire de alta eficiencia)",
                    category: "Filtración Industrial",
                    definition: "High-Efficiency Particulate Air filter capable of trapping at least 99.97% of airborne particles with a size of 0.3 microns.",
                    collocations: ["HEPA filter integrity test", "DOP smoke challenge test", "terminal ceiling HEPA"],
                    falseFriends: "No es un filtro de aire acondicionado común; requiere pruebas anuales de fuga de humo con aerosol DOP/PAO.",
                    nativeUsage: "Facilities maintenance performed the annual challenge test to certify the cleanroom ceiling HEPA filters."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Cleanroom Pressure Cascade",
                    botQuestion: "Why do medical device cleanrooms maintain a positive differential air pressure relative to outer corridors and gowning airlocks?",
                    requiredKeywords: ["positive", "pressure", "outward", "contaminants", "enter", "prevent"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! Positive differential pressure forces air to rush outward when doors open, physically preventing unfiltered air and particulate contaminants from entering the clean manufacturing zone.",
                    feedbackRetry: "Think about air physics. If the cleanroom is at higher pressure than the hallway, which way will the air flow when a door cracks open?"
                },
                {
                    step: 2,
                    concept: "Bioburden Definition",
                    botQuestion: "In medical device manufacturing, what does the term 'Bioburden' specifically measure on a finished component prior to terminal sterilization?",
                    requiredKeywords: ["microorganisms", "bacteria", "viable", "colony", "cfu", "count", "population"],
                    minKeywords: 2,
                    feedbackSuccess: "Outstanding! Bioburden is the baseline population of viable microorganisms (measured in Colony Forming Units - CFU) living on a product prior to undergoing sterilization.",
                    feedbackRetry: "Focus on microorganisms and living bacteria on the device before it enters the sterilizer."
                }
            ],
            quiz: [
                {
                    q: "Under ISO 14644-1, what is the maximum allowable concentration of particles >= 0.5 microns in an ISO Class 7 cleanroom per cubic meter of air?",
                    options: [
                        "352,000 particles/m³",
                        "3,520 particles/m³",
                        "3,520,000 particles/m³",
                        "Zero particles/m³"
                    ],
                    answer: 0
                },
                {
                    q: "What is the primary source of particulate and microbial contamination in an operational medical device cleanroom?",
                    options: [
                        "Human operators shedding skin flakes, hair fragments, respiratory droplets, and clothing lint",
                        "Stainless steel tables deteriorating",
                        "HEPA filter media dissolving into the air",
                        "LED lighting emitting ultraviolet photons"
                    ],
                    answer: 0
                },
                {
                    q: "What is the operational function of an airlock interlock mechanism between a gowning room and a cleanroom?",
                    options: [
                        "To prevent both the outer and inner doors from opening simultaneously, maintaining the pressure barrier",
                        "To lock operators inside if they make a manufacturing mistake",
                        "To save electricity by turning off the lights when doors close",
                        "To measure operator body temperature via infrared lasers"
                    ],
                    answer: 0
                },
                {
                    q: "What agar plate is specifically designed with a convex surface to press directly against cleanroom benches and operator gloves for microbial testing?",
                    options: [
                        "RODAC plate (Contact plate)",
                        "Standard Petri dish without agar",
                        "Liquid broth tube",
                        "Glass microscope slide"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "med-m4",
            title: "Process Validation: IQ, OQ, PQ & Packaging Integrity (ISO 11607)",
            titleES: "Validación de Procesos: IQ, OQ, PQ y Barrera Estéril de Empaque (ISO 11607)",
            icon: "fa-solid fa-microscope",
            isGoldModel: true,
            readings: [
                {
                    id: "med-m4-r1",
                    title: "The Process Validation Trinity: Installation (IQ), Operational (OQ) & Performance Qualification (PQ)",
                    duration: "15 min",
                    content: `> **Engineering Validation Standard**: Governed by **GHTF/SG3/N99-10 (Quality Management Systems - Process Validation Guidance)** and **FDA 21 CFR 820.75 (Process Validation)**. Crucial for Validation Engineers, Automation Leads, and Manufacturing Engineers.

# Process Validation: IQ, OQ, PQ & Packaging Integrity

### 1. When is Process Validation Mandatory?
Under FDA 21 CFR 820.75, when the results of a manufacturing process **cannot be fully verified by subsequent inspection and testing** (or where destructive testing would be required to verify each unit, such as sterile heat seal integrity or catheter balloon burst strength), the process **must be validated with a high degree of assurance**.

Validation proves that a manufacturing system will consistently produce product meeting predetermined quality specifications when operating within defined process parameter windows.

### 2. The Validation Triad: IQ, OQ, PQ
Validation follows a three-stage qualification sequence:

#### 1. Installation Qualification (IQ): *"Is it installed correctly?"*
- Verifies that equipment, tooling, piping, electrical supplies, compressed air, and software have been delivered and installed strictly according to manufacturer specifications and plant safety codes.
- Critical deliverables: Calibration certificates for temperature controllers, pressure transducers, and load cells; preventive maintenance schedules; spare parts lists; utility supply verification (voltage stability, dry oil-free compressed air).

#### 2. Operational Qualification (OQ): *"Does it operate consistently across edge-of-envelope parameter limits?"*
- Evaluates equipment operation across the upper and lower operating parameter limits (Worst-Case testing / Edge-of-Envelope).
- Determines process capability ($C_p / C_{pk}$) and proves that components produced at the worst-case parameter combinations (e.g., minimum seal temperature + minimum dwell time + minimum pressure, and maximum seal temperature + maximum dwell time + maximum pressure) still meet all mechanical specifications.
- Establishes the documented **Operating Window** for standard shopfloor production.

#### 3. Performance Qualification (PQ): *"Does it perform reliably under real full-scale production conditions over time?"*
- Demonstrates long-term stability and repeatability under full commercial manufacturing conditions, using regular shopfloor operators, typical raw material lot variations, shift changes, and environmental fluctuations.
- The automotive/medical industry standard mandates running **three consecutive, successful full-scale production lots** with zero non-conformances before commercial release.`
                },
                {
                    id: "med-m4-r2",
                    title: "Sterile Barrier Systems & Packaging Validation (ISO 11607-1/2)",
                    duration: "13 min",
                    content: `> **Medical Packaging Standard**: Governed by **ISO 11607-1 & ISO 11607-2 (Packaging for terminally sterilized medical devices)**.

### 1. The Sterile Barrier System (SBS)
A medical device is only as sterile as its packaging. The **Sterile Barrier System (SBS)** (typically a thermoformed plastic blister tray sealed with a porous **Tyvek®** lid, or a Tyvek/poly pouch) has two critical engineering functions:
1. Allow the sterilizing agent (e.g., Ethylene Oxide gas) to enter and exit freely without bursting the package.
2. Provide an impermeable microbial barrier maintaining sterility throughout shipping, handling, and shelf-life storage (often 3 to 5 years) until the point of opening in a sterile surgical suite.

### 2. Mandatory Packaging Integrity Validation Tests
To validate a heat-sealing packaging machine under ISO 11607-2:
- **Seal Strength Test (ASTM F88)**: A tensile peel test measuring the peak force (Newtons or pounds-force per linear inch) required to separate the Tyvek lid from the plastic tray flange.
- **Bubble Emission Leak Test (ASTM F2096)**: The sealed package is submerged in water and pressurized to identify pinholes or unsealed channels by observing escaping air bubbles.
- **Dye Penetration Test (ASTM F1929)**: Injecting a high-visibility synthetic dye along the seal margin to detect microscopic capillary leak channels ($> 50\\mu m$).
- **Accelerated Aging (ASTM F1980)**: Subjecting sealed packaging to elevated thermal and humidity conditions ($55^\\circ\\text{C}$ / $60\\%\\text{ RH}$) to simulate 3-year or 5-year real-time shelf life based on the Arrhenius reaction rate reaction model ($Q_{10} = 2$).`
                }
            ],
            dialogue: [
                {
                    role: "Specialist Scott Miller (Lead Validation Engineer, Boston)",
                    content: "Karla, our corporate validation team is reviewing your PQ protocol for the automated pouch sealing machine on the arthroscopic surgical shaver line in Mexicali. How did your team establish the lower and upper sealing limits during OQ?",
                    translation: "Karla, nuestro equipo corporativo de validación está revisando su protocolo de PQ para la máquina selladora automatizada de bolsas en la línea de rasuradores quirúrgicos artroscópicos en Mexicali. ¿Cómo estableció su equipo los límites de sellado inferior y superior durante la OQ?",
                    pedagogicalNotes: "Target terms: PQ protocol, automated pouch sealing machine, arthroscopic surgical shaver line, OQ (Operational Qualification)"
                },
                {
                    role: "Ing. Karla Dominguez (Validation & Process Engineering Manager, Mexicali)",
                    content: "During the OQ phase, Scott, we ran a full Design of Experiments (DOE) varying temperature between 120°C and 140°C, seal pressure between 40 and 60 PSI, and dwell time between 1.2 and 2.5 seconds. All peel-strength test specimens from our worst-case extreme corners exceeded our acceptance criterion of 1.5 Newtons per inch without any seal delamination.",
                    translation: "Durante la fase de OQ, Scott, ejecutamos un Diseño de Experimentos (DOE) completo variando la temperatura entre 120°C y 140°C, la presión de sellado entre 40 y 60 PSI, y el tiempo de permanencia entre 1.2 y 2.5 segundos. Todas las probetas de prueba de resistencia al despegue de nuestras esquinas extremas de peor caso superaron nuestro criterio de aceptación de 1.5 Newtons por pulgada sin delaminación de sello.",
                    pedagogicalNotes: "Target terms: Design of Experiments (DOE), dwell time, worst-case extreme corners, peel-strength test specimens, seal delamination"
                },
                {
                    role: "Specialist Scott Miller (Lead Validation Engineer, Boston)",
                    content: "That provides robust confidence for the operating window. What is your sample size strategy for the three-lot Performance Qualification (PQ)?",
                    translation: "Eso proporciona una sólida confianza para la ventana de operación. ¿Cuál es su estrategia de tamaño de muestra para la Calificación de Desempeño (PQ) de tres lotes?",
                    pedagogicalNotes: "Target terms: operating window, sample size strategy, three-lot PQ"
                },
                {
                    role: "Ing. Karla Dominguez (Validation & Process Engineering Manager, Mexicali)",
                    content: "We are sampling 60 sealed pouches per lot across three consecutive shifts, combining ASTM F88 tensile peel testing with ASTM F1929 dye penetration. If all 180 samples demonstrate zero capillary leaks and Cpk remains above 1.67, we will submit the final PQ summary report for QA sign-off.",
                    translation: "Estamos muestreando 60 bolsas selladas por lote en tres turnos consecutivos, combinando pruebas de despegue por tracción ASTM F88 con penetración de colorante ASTM F1929. Si las 180 muestras demuestran cero fugas capilares y el Cpk permanece por encima de 1.67, enviaremos el reporte de resumen de PQ final para firma de Aseguramiento de Calidad.",
                    pedagogicalNotes: "Target terms: ASTM F88 tensile peel testing, ASTM F1929 dye penetration, capillary leaks, Cpk above 1.67, PQ summary report"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Process Validation",
                    ipa: "/ˈprɑː.sɛs ˌvæl.əˈdeɪ.ʃən/",
                    es: "Validación de procesos de manufactura",
                    category: "Ingeniería de Calidad",
                    definition: "Establishing by objective evidence that a process consistently produces a result or product satisfying its predetermined specifications and quality attributes.",
                    collocations: ["process validation protocol", "validation master plan (VMP)", "re-validation criteria"],
                    falseFriends: "Mandatoria legalmente cuando la inspección al 100% no es posible o destruiría el producto (ej. sellos estériles).",
                    nativeUsage: "The ultrasonic catheter welding process underwent rigorous process validation before commercial launch."
                },
                {
                    term: "Installation Qualification (IQ)",
                    ipa: "/ˌɪn.stəˈleɪ.ʃən ˌkwɑː.lə.fəˈkeɪ.ʃən/",
                    es: "Calificación de Instalación (IQ)",
                    category: "Validación de Equipos",
                    definition: "Documented verification that all equipment, piping, electrical wiring, and auxiliary systems have been delivered and installed in accordance with engineering drawings and safety requirements.",
                    collocations: ["execute IQ protocol", "IQ checklist", "IQ/OQ/PQ sequence"],
                    falseFriends: "No prueba si la pieza sale buena; solo certifica que la máquina está montada, cableada y calibrada correctamente.",
                    nativeUsage: "The technician completed the IQ protocol by verifying line voltage, air pressure sensors, and calibration tags on the RF sealer."
                },
                {
                    term: "Operational Qualification (OQ)",
                    ipa: "/ˌɑː.pəˈreɪ.ʃən.əl ˌkwɑː.lə.fəˈkeɪ.ʃən/",
                    es: "Calificación de Operación (OQ)",
                    category: "Validación de Parámetros",
                    definition: "Documented verification that equipment operates as intended throughout predetermined upper and lower operating parameter limits (worst-case testing).",
                    collocations: ["OQ parameter challenge", "worst-case testing during OQ", "establish operating window"],
                    falseFriends: "Debe retar los límites extremos de la máquina, no probar únicamente los valores nominales ideales.",
                    nativeUsage: "During OQ, we proved the laser marker creates readable UDI barcodes even at the lowest laser power setting."
                },
                {
                    term: "Performance Qualification (PQ)",
                    ipa: "/pɚˈfɔːr.məns ˌkwɑː.lə.fəˈkeɪ.ʃən/",
                    es: "Calificación de Desempeño (PQ)",
                    category: "Validación de Producción",
                    definition: "Documented evidence that the integrated manufacturing process consistently produces acceptable product under commercial operating conditions over multiple consecutive lots.",
                    collocations: ["three consecutive PQ batches", "PQ acceptance criteria", "PQ final report sign-off"],
                    falseFriends: "Exige típicamente 3 lotes completos consecutivos en piso real con operadores de turno estándar.",
                    nativeUsage: "The plant manager signed the PQ release after three consecutive batches of guidewires met all tensile specifications."
                },
                {
                    term: "Sterile Barrier System (SBS)",
                    ipa: "/ˈstɛr.əl ˈbær.i.ɚ ˈsɪs.təm/",
                    es: "Sistema de Barrera Estéril (SBS)",
                    category: "Empaque Médico",
                    definition: "The minimum package that minimizes the risk of ingress of microorganisms and allows aseptic presentation of the medical device at the point of use (ISO 11607).",
                    collocations: ["SBS integrity", "Tyvek pouch SBS", "maintain sterile barrier"],
                    falseFriends: "No es la caja de cartón exterior (empaque de transporte); es el envase primario sellado que toca o aísla el dispositivo estéril.",
                    nativeUsage: "A puncture in the sterile barrier system immediately voids the sterility of the orthopedic implant."
                },
                {
                    term: "Dye Penetration Test (ASTM F1929)",
                    ipa: "/daɪ ˌpɛn.əˈtreɪ.ʃən tɛst/",
                    es: "Prueba de penetración de colorante para sellos estériles",
                    category: "Ensayos de Empaque",
                    definition: "A standardized test method using synthetic dye solutions to visually detect microscopic leak channels through porous packaging seals down to 50 microns.",
                    collocations: ["ASTM F1929 dye test", "capillary leak detection", "dye migration in seal"],
                    falseFriends: "No es una prueba de pintura cosmética; es una prueba destructiva para comprobar que no existan canales microscópicos por donde entren bacterias.",
                    nativeUsage: "The packaging engineer injected dye solution into the Tyvek pouch seal to verify zero capillary channels existed."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "The Validation Sequence",
                    botQuestion: "In medical device manufacturing, what is the mandatory sequential order of the three stages of process qualification, from initial machine delivery to full commercial lot validation?",
                    requiredKeywords: ["iq", "oq", "pq"],
                    minKeywords: 3,
                    feedbackSuccess: "Exact! The mandatory sequence is IQ (Installation Qualification), followed by OQ (Operational Qualification), and culminating in PQ (Performance Qualification).",
                    feedbackRetry: "Remember the three letters: Installation, Operational, and Performance Qualification."
                },
                {
                    step: 2,
                    concept: "OQ Worst-Case Testing",
                    botQuestion: "Why does Operational Qualification (OQ) specifically mandate testing at 'worst-case' parameter limits (the outer edges of temperature, pressure, or dwell time)?",
                    requiredKeywords: ["worst-case", "limits", "tolerance", "operating window", "extreme", "robust"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! Testing at the upper and lower extremes (worst-case) proves that even if machine parameters drift toward allowable tolerance limits during production, parts will still meet all quality and safety criteria.",
                    feedbackRetry: "Think about machine drift. What happens if temperature drops to the lowest allowable setting on a cold winter morning?"
                }
            ],
            quiz: [
                {
                    q: "Under FDA 21 CFR 820.75, when is process validation legally mandated for a medical device manufacturing line?",
                    options: [
                        "When the output of a process cannot be fully verified by subsequent non-destructive inspection or testing",
                        "Only when the medical device is sold directly to military hospitals",
                        "When the equipment costs less than $10,000 USD",
                        "Only if the manufacturing facility operates in North America"
                    ],
                    answer: 0
                },
                {
                    q: "What does Installation Qualification (IQ) verify?",
                    options: [
                        "That equipment, utilities, wiring, and safety interlocks are installed according to manufacturer and engineering specifications",
                        "That operators can run the line without taking rest breaks",
                        "That the product passes 5-year accelerated aging tests",
                        "That hospital purchasing managers will approve the invoice"
                    ],
                    answer: 0
                },
                {
                    q: "Under ISO 11607, what is the primary functional requirement of a Sterile Barrier System (SBS)?",
                    options: [
                        "To prevent the ingress of microorganisms and allow aseptic presentation of the device at the point of surgical use",
                        "To display bright full-color promotional advertisements to patients",
                        "To make the package heavy enough so it does not blow away in the wind",
                        "To prevent hospital nurses from opening the package without a key"
                    ],
                    answer: 0
                },
                {
                    q: "How many consecutive successful production lots are universally required during Performance Qualification (PQ) to demonstrate manufacturing process stability?",
                    options: [
                        "Three (3) consecutive lots",
                        "One (1) single prototype part",
                        "Fifty (50) years of continuous production",
                        "Zero lots; simulations in CAD are sufficient"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "med-m5",
            title: "Risk Management (ISO 14971) & Root Cause Medical CAPA / Non-Conformance",
            titleES: "Gestión de Riesgos (ISO 14971) y CAPA de Causa Raíz / No Conformidades Médicas",
            icon: "fa-solid fa-triangle-exclamation",
            isGoldModel: true,
            readings: [
                {
                    id: "med-m5-r1",
                    title: "ISO 14971:2019 Application of Risk Management to Medical Devices",
                    duration: "15 min",
                    content: `> **Medical Risk Management Standard**: Governed by **ISO 14971:2019 (Medical devices — Application of risk management to medical devices)** and **ISO/TR 24971**.

# Risk Management (ISO 14971) & Root Cause Medical CAPA

### 1. The Core Philosophy of Medical Risk Management
Unlike general commercial manufacturing where risk is evaluated primarily as financial liability, **ISO 14971** defines risk strictly around patient safety:
$$\\text{Risk} = \\text{Severity of Harm} \\times \\text{Probability of Occurrence of that Harm}$$

A fundamental principle of ISO 14971:2019 is that economic or cosmetic considerations **cannot be used to justify an unacceptable medical risk**. All known and foreseeable risks must be reduced to an acceptable level as far as possible (AFAP).

### 2. The Risk Management Lifecycle
1. **Risk Analysis**: Identifying intended use, reasonably foreseeable misuse, and potential **Hazards** (potential sources of harm, e.g., electrical leakage, toxic leachate, particulate shedding, sharp burrs).
2. **Hazardous Situations & Harm**: Mapping how a hazard leads to clinical harm (e.g., *Hazard: micro-crack in balloon wall $\\rightarrow$ Hazardous Situation: balloon bursts during angioplasty inflation $\\rightarrow$ Harm: arterial dissection or emergency bypass surgery*).
3. **Risk Evaluation**: Plotting Severity (Catastrophic, Critical, Serious, Minor, Negligible) against Probability of Occurrence ($P_1 \\times P_2$) on an approved Risk Acceptability Matrix.
4. **Risk Control Hierarchy**:
   - **Step 1: Inherently Safe Design**: Eliminate the hazard at the source (e.g., replacing a sharp pointed trocar blade with a blunt auto-retracting cannula).
   - **Step 2: Protective Measures**: Incorporate physical safeguards (e.g., pressure relief valves, optical interlocks).
   - **Step 3: Information for Safety**: Warnings in the Instructions for Use (IFU), packaging contraindications, or training requirements (the least effective control).
5. **Benefit-Risk Analysis**: If residual risk exceeds acceptable thresholds, clinical data must prove that the medical therapeutic benefit to the patient outweighs the residual risk.`
                },
                {
                    id: "med-m5-r2",
                    title: "Corrective and Preventive Action (CAPA) Architecture & Root Cause Investigations",
                    duration: "13 min",
                    content: `> **Regulatory Enforcement Standard**: Governed by **FDA 21 CFR 820.100 (Corrective and preventive action)** and **ISO 13485 Clause 8.5.2/8.5.3**.

### 1. Why CAPA is the #1 Driver of FDA Warning Letters
More than $50\\%$ of all FDA Warning Letters cite deficiencies in **CAPA systems**: failure to investigate root causes, failure to verify corrective action effectiveness, or treating systemic defects as isolated human errors.

A compliant medical CAPA system requires a rigorous closed-loop lifecycle:
1. **Identification & Containment**: Capturing signals from internal non-conformances (NCRs), audit findings, or post-market customer complaints. Immediate quarantine of suspect stock.
2. **Investigation & Root Cause Analysis**: Utilizing structured methodologies (**5 Whys, Ishikawa 6M, Fault Tree Analysis / FTA**) to uncover systemic flaws in training, equipment maintenance, or raw material variation rather than blaming operator carelessness.
3. **Corrective Action Plan**: Designing permanent engineering or procedural interventions (updating DMR drawings, reprogramming PLC interlocks, re-validating tooling).
4. **Verification of Effectiveness (VoE)**: The most critical step audited by the FDA. The CAPA cannot be closed immediately after implementing a fix; the team must establish a measurable tracking window (e.g., zero recurring defect escapes across 10 consecutive production lots over 90 days).`
                }
            ],
            dialogue: [
                {
                    role: "Specialist Richard Thornton (FDA Consumer Safety Officer, Irvine District)",
                    content: "Engineer De la Rosa, I am reviewing your plant's CAPA log. CAPA 2025-089 was opened eight months ago regarding an endotracheal tube cuff leak. Your root cause lists 'operator failed to follow SOP during heat-staking'. Why was this attributed solely to human error?",
                    translation: "Ingeniero De la Rosa, estoy revisando el registro de CAPA de su planta. La CAPA 2025-089 se abrió hace ocho meses respecto a una fuga en el manguito de un tubo endotraqueal. Su causa raíz indica 'el operador no siguió el SOP durante el sellado térmico'. ¿Por qué se atribuyó esto únicamente a error humano?",
                    pedagogicalNotes: "Target terms: CAPA log, endotracheal tube cuff leak, root cause, human error, heat-staking"
                },
                {
                    role: "Ing. Sofía De la Rosa (Quality Systems & CAPA Lead, Ciudad Juárez)",
                    content: "That was our preliminary assessment, Officer Thornton. However, our engineering review rejected that conclusion. We performed a 5 Whys investigation and discovered that thermal drift in the thermocouple was causing intermittent temperature drops of 15°C that were invisible on the analog gauge.",
                    translation: "Esa fue nuestra evaluación preliminar, Oficial Thornton. Sin embargo, nuestra revisión de ingeniería rechazó esa conclusión. Realizamos una investigación de 5 Porqués y descubrimos que la deriva térmica en el termopar estaba causando caídas intermitentes de temperatura de 15°C que eran invisibles en el manómetro analógico.",
                    pedagogicalNotes: "Target terms: preliminary assessment, 5 Whys investigation, thermal drift, thermocouple, analog gauge"
                },
                {
                    role: "Specialist Richard Thornton (FDA Consumer Safety Officer, Irvine District)",
                    content: "What permanent corrective action was implemented, and how did you verify effectiveness?",
                    translation: "¿Qué acción correctiva permanente se implementó y cómo verificaron la eficacia?",
                    pedagogicalNotes: "Target terms: permanent corrective action, verify effectiveness"
                },
                {
                    role: "Ing. Sofía De la Rosa (Quality Systems & CAPA Lead, Ciudad Juárez)",
                    content: "We replaced the analog controller with a digital closed-loop PID controller featuring automated lockouts if temperature drifts by ±2°C. For Verification of Effectiveness, we monitored 25,000 units over four months with 100% pneumatic pressure decay testing, achieving zero cuff leaks.",
                    translation: "Reemplazamos el controlador analógico con un controlador digital PID de lazo cerrado con bloqueos automáticos si la temperatura se desvía ±2°C. Para la Verificación de Eficacia, monitoreamos 25,000 unidades durante cuatro meses con pruebas de caída de presión neumática al 100%, logrando cero fugas de manguito.",
                    pedagogicalNotes: "Target terms: digital closed-loop PID controller, automated lockout, Verification of Effectiveness (VoE), pneumatic pressure decay testing"
                }
            ],
            lexiconMatrix: [
                {
                    term: "ISO 14971:2019",
                    ipa: "/ˌaɪ.ɛsˈoʊ ˈfɔːr.tiːn naɪn ˈsɛv.ən.ti wʌn/",
                    es: "Norma internacional de gestión de riesgos para dispositivos médicos",
                    category: "Gestión de Riesgos",
                    definition: "The global benchmark standard specifying a process for a medical device manufacturer to identify hazards, estimate and evaluate risks, control these risks, and monitor effectiveness of controls.",
                    collocations: ["ISO 14971 risk management file", "hazard identification", "benefit-risk determination"],
                    falseFriends: "Evalúa primordialmente el daño al paciente y al personal médico, no el riesgo de pérdida económica de la empresa.",
                    nativeUsage: "The biomedical design team updated the ISO 14971 risk management report following a minor surgical complaint."
                },
                {
                    term: "CAPA (Corrective and Preventive Action)",
                    ipa: "/ˈkæp.ə/",
                    es: "Acción Correctiva y Preventiva (CAPA)",
                    category: "Sistemas de Calidad",
                    definition: "A regulatory-mandated continuous improvement system designed to collect information, investigate non-conformances, identify root causes, and verify that corrective interventions permanently prevent recurrence.",
                    collocations: ["open a CAPA", "CAPA root cause investigation", "close a CAPA following VoE"],
                    falseFriends: "No es simplemente un reporte de scrap; es una investigación formal obligatoria ante fallas sistémicas o quejas de producto.",
                    nativeUsage: "The QA director presented the closed CAPA package to the FDA auditor, proving the corrective action eliminated catheter kinking."
                },
                {
                    term: "Verification of Effectiveness (VoE)",
                    ipa: "/ˌvɛr.ə.fəˈkeɪ.ʃən əv ɪˌfɛk.tɪv.nəs/",
                    es: "Verificación de Eficacia (VoE en CAPA)",
                    category: "Cierre de Auditoría",
                    definition: "The mandatory audit step where objective evidence is gathered over a statistically significant timeframe to confirm that an implemented corrective action successfully eliminated the problem without creating new risks.",
                    collocations: ["pass VoE criteria", "VoE tracking window", "extend VoE monitoring period"],
                    falseFriends: "Una CAPA nunca debe cerrarse inmediatamente después de arreglar la máquina; requiere un periodo de prueba de efectividad en producción real.",
                    nativeUsage: "The CAPA remained open for 90 days to satisfy the verification-of-effectiveness protocol before final closure."
                },
                {
                    term: "Hazard vs Harm",
                    ipa: "/ˈhæz.ɚd / hɑːrm/",
                    es: "Peligro vs Daño (Conceptos clave de ISO 14971)",
                    category: "Análisis de Riesgo",
                    definition: "A Hazard is a potential source of harm (e.g., electrical voltage); Harm is the actual physical injury, damage to health, or death suffered by a human being.",
                    collocations: ["identify biological hazard", "severity of harm", "mitigate catastrophic harm"],
                    falseFriends: "Hazard es la condición potencial de riesgo; Harm es la lesión clínica real en el paciente.",
                    nativeUsage: "The engineering team modified the trocar tip to eliminate the hazard of accidental abdominal wall puncture."
                },
                {
                    term: "Non-Conformance Report (NCR)",
                    ipa: "/ˌnɑːn kənˈfɔːr.məns rɪˈpɔːrt/",
                    es: "Reporte de No Conformidad (NCR)",
                    category: "Control en Piso",
                    definition: "A formal quality document recording that a product, raw material, or manufacturing process step has failed to satisfy specified engineering or regulatory requirements.",
                    collocations: ["generate an NCR", "disposition of NCR lot", "NCR trending analysis"],
                    falseFriends: "Documenta el evento no conforme inmediato; si el evento se repite o es crítico, escala inmediatamente a una CAPA.",
                    nativeUsage: "Quality control generated an NCR when dimensional wall thickness on extruded tubing fell below minimum tolerance."
                },
                {
                    term: "Instructions for Use (IFU)",
                    ipa: "/ɪnˈstrʌk.ʃənz fɔːr juːs/",
                    es: "Instrucciones de Uso (IFU / Inserto Médico)",
                    category: "Etiquetado y Cumplimiento",
                    definition: "The legally binding document provided to physicians and patients detailing the device's indications, contraindications, clinical warnings, and step-by-step operating instructions.",
                    collocations: ["IFU labeling review", "contraindications in IFU", "e-IFU electronic leaflet"],
                    falseFriends: "No es un folleto publicitario; está estrictamente regulado y auditado por la FDA como parte del etiquetado oficial.",
                    nativeUsage: "The regulatory affairs team updated the IFU to add a clinical contraindication for pediatric patients."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Root Cause in CAPA Investigations",
                    botQuestion: "When conducting a root cause investigation under FDA 21 CFR 820.100 following an assembly line failure, why does the FDA heavily penalize companies that conclude the root cause was simply 'operator error'?",
                    requiredKeywords: ["systemic", "training", "procedure", "root cause", "blame", "system"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! The FDA views attributing defects to 'operator error' as a superficial investigation that fails to address systemic root causes like ambiguous SOPs, poor workstation ergonomics, or lack of poka-yoke error proofing.",
                    feedbackRetry: "Think about systemic factors. Why did the operator make the mistake? Were the instructions confusing or was the machine missing a sensor?"
                },
                {
                    step: 2,
                    concept: "Verification of Effectiveness (VoE)",
                    botQuestion: "Why is it an audit violation to close a CAPA immediately upon releasing an Engineering Change Order (ECO) to fix a machine?",
                    requiredKeywords: ["effectiveness", "verify", "evidence", "recurrence", "monitor", "time"],
                    minKeywords: 2,
                    feedbackSuccess: "Exact! Regulations mandate a formal Verification of Effectiveness (VoE) period where production is monitored over time to gather objective data proving the defect has not recurred before the CAPA can be officially closed.",
                    feedbackRetry: "Focus on proof over time. You must verify that the fix actually worked in production over a monitoring window."
                }
            ],
            quiz: [
                {
                    q: "Under ISO 14971, how is medical device 'Risk' mathematically and conceptually defined?",
                    options: [
                        "The combination of the Severity of Harm and the Probability of Occurrence of that Harm",
                        "The total manufacturing cost divided by the unit sale price",
                        "The likelihood that the plant manager will resign within 12 months",
                        "The number of competitors selling similar products in Europe"
                    ],
                    answer: 0
                },
                {
                    q: "What is the primary reason why FDA investigators issue Warning Letters regarding company CAPA systems?",
                    options: [
                        "Failure to thoroughly investigate root causes, relying on superficial 'operator error' excuses, and failure to verify corrective action effectiveness",
                        "Using black ballpoint pens instead of blue ink pens",
                        "Closing CAPAs too slowly during national holiday breaks",
                        "Printing CAPA reports on glossy photo paper"
                    ],
                    answer: 0
                },
                {
                    q: "In the ISO 14971 Risk Control hierarchy, what is the highest priority and most effective method to mitigate a hazard?",
                    options: [
                        "Inherently Safe Design (eliminating or reducing the hazard through physical product design)",
                        "Printing a small warning sentence in the paper Instructions for Use (IFU)",
                        "Having operators sign a statement promising to be more careful",
                        "Buying commercial liability insurance"
                    ],
                    answer: 0
                },
                {
                    q: "What must be established and fulfilled before a medical device CAPA can be formally closed in an electronic QMS?",
                    options: [
                        "Verification of Effectiveness (VoE) proving through objective production data that the fix prevented defect recurrence",
                        "A casual verbal agreement between two floor supervisors",
                        "Deleting the customer complaint record from the database",
                        "Paying an inspection fee to the local county courthouse"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "med-m6",
            title: "Sterilization Modalities (EtO, Gamma, E-Beam) & Lot Release Testing",
            titleES: "Modalidades de Esterilización (EtO, Gamma, E-Beam) y Liberación Paramétrica de Lote",
            icon: "fa-solid fa-atom",
            isGoldModel: true,
            readings: [
                {
                    id: "med-m6-r1",
                    title: "Sterilization Physics: Ethylene Oxide (EtO) vs Gamma Irradiation vs Electron Beam (E-Beam)",
                    duration: "15 min",
                    content: `> **Sterilization Standards**: Governed by **ISO 11135 (Ethylene oxide)**, **ISO 11137-1/2 (Radiation sterilization - Gamma & E-beam)**, and **USP <71> (Sterility Tests)**.

# Sterilization Modalities & Parametric Lot Release

### 1. The Sterility Assurance Level (SAL $10^{-6}$)
For a terminally sterilized medical device intended to contact blood or compromised tissue, global pharmacopeias mandate a **Sterility Assurance Level (SAL)** of $10^{-6}$:
$$\\text{SAL } 10^{-6} \\implies \\text{Probability of finding a single viable surviving microorganism is } \\le 1 \\text{ in } 1,000,000 \\text{ units.}$$

Achieving this requires applying validated industrial sterilization modalities capable of killing the most resistant biological spores known to science.

### 2. Major Industrial Sterilization Modalities

| Modality | Physical Agent | Target Microorganism Indicator | Material Compatibility & Physics | Operational Trade-Offs |
| :--- | :--- | :--- | :--- | :--- |
| **Ethylene Oxide (EtO)** | Toxic alkylating gas ($C_2H_4O$) under controlled humidity and temperature ($50^\\circ\\text{C}$). | *Bacillus atrophaeus* spores ($10^6$). | Ideal for temperature-sensitive polymer catheters, electronics, and optical optics. | Long cycle times (12-24h) plus mandatory **aeration degas cycles (24-72h)** to eliminate carcinogenic EtO residuals (ISO 10993-7). |
| **Gamma Radiation** | Ionizing gamma rays emitted by Cobalt-60 ($^{60}\\text{Co}$) radioactive isotopes. | *Bacillus pumilus* or microbial bioburden. | Deep penetration through high-density pallets. No degassing required; immediate product release capability. | High radiation doses ($25 - 40\\text{ kGy}$) cause embrittlement, yellowing, and cross-linking degradation in PTFE and certain polymers. |
| **Electron Beam (E-Beam)** | Accelerated high-energy electron stream generated by particle accelerators. | *Bacillus pumilus* spores. | High-speed, high-throughput in-line processing (seconds per box). Lower thermal degradation. | Limited depth of physical penetration compared to Gamma; requires precise density matching of shipping boxes. |

### 3. Biological Indicators (BI) & Process Challenge Devices (PCD)
To challenge an EtO cycle, engineers place **Process Challenge Devices (PCD)** in the most difficult-to-sterilize locations inside the pallet (e.g., inside long narrow catheter lumens):
- The PCD contains an inoculated carrier holding $\ge 10^6$ bacterial spores of *Bacillus atrophaeus*.
- Following cycle completion, BIs are sent to the microbiology lab for 7-day incubation (or rapid 24-hour enzyme-fluorescence readout) to confirm 100% microbial kill.`
                },
                {
                    id: "med-m6-r2",
                    title: "Parametric Release, EtO Residuals Testing & Endotoxin (LAL) Testing",
                    duration: "13 min",
                    content: `> **Toxicology & Release Standard**: Aligned with **ISO 10993-7 (Ethylene oxide sterilization residuals)** and **USP <85> (Bacterial Endotoxins Test - LAL)**.

### 1. Parametric Release vs Biological Indicator Release
Traditionally, medical lots could not be released from quarantine until biological indicators completed laboratory incubation. Under **Parametric Release** (ISO 11135), a lot can be released based solely on automated physical sensor records:
- Microprocessor verification that chamber temperature, relative humidity, gas concentration, exposure time, and vacuum pressure curves matched validated specifications throughout the cycle.

### 2. Ethylene Oxide Residual Limits (ISO 10993-7)
Because EtO and its breakdown product **Ethylene Chlorohydrin (ECH)** are mutagenic and toxic, gas-sterilized implants must undergo gas chromatography testing to verify residual concentrations fall below strict parts-per-million (ppm) thresholds based on patient contact duration (limited exposure, prolonged exposure, or permanent implant).

### 3. Bacterial Endotoxin (LAL / Pyrogen) Testing
Killing bacteria is not enough. When Gram-negative bacteria die, their cell walls release **endotoxins (lipopolysaccharides / LPS)**:
- Endotoxins can survive sterilization cycles and cause fatal pyrogenic septic shock when introduced into human blood.
- Lots are tested via the **Limulus Amebocyte Lysate (LAL)** assay to confirm endotoxin levels are below strict FDA limits (typically $\le 0.5\\text{ EU/mL}$ or $\le 20\\text{ EU/device}$).`
                }
            ],
            dialogue: [
                {
                    role: "Dr. Evelyn Reed (Director of Sterilization Science, Minneapolis)",
                    content: "Manuel, I am reviewing the contract sterilization records for our latest production lot of neurovascular flow-diverter stents processed through your EtO facility in Baja California. Can you confirm the gas chromatography results for ethylene oxide residuals?",
                    translation: "Manuel, estoy revisando los registros de esterilización por contrato para nuestro último lote de producción de stents desviadores de flujo neurovascular procesados en su planta de EtO en Baja California. ¿Podrías confirmar los resultados de cromatografía de gases para residuos de óxido de etileno?",
                    pedagogicalNotes: "Target terms: contract sterilization records, neurovascular flow-diverter stents, EtO facility, gas chromatography results, ethylene oxide residuals"
                },
                {
                    role: "Ing. Manuel Hinojosa (Sterilization Operations Director, Tijuana)",
                    content: "Certainly, Dr. Reed. The lot completed a 48-hour heated aeration cycle at 45°C. Our analytical chemistry lab verified that residual EtO is at 0.8 parts per million, and ethylene chlorohydrin is below 2.0 ppm—comfortably below the ISO 10993-7 permanent implant limit of 4.0 mg per device.",
                    translation: "Por supuesto, Dra. Reed. El lote completó un ciclo de aireación térmica de 48 horas a 45°C. Nuestro laboratorio de química analítica verificó que el EtO residual está en 0.8 partes por millón, y el clorohidrina de etileno está por debajo de 2.0 ppm, confortablemente por debajo del límite de implante permanente de ISO 10993-7 de 4.0 mg por dispositivo.",
                    pedagogicalNotes: "Target terms: heated aeration cycle, analytical chemistry lab, residual EtO, parts per million, ethylene chlorohydrin, permanent implant limit"
                },
                {
                    role: "Dr. Evelyn Reed (Director of Sterilization Science, Minneapolis)",
                    content: "What about the LAL endotoxin testing and your internal Process Challenge Devices (PCDs)?",
                    translation: "¿Qué hay de las pruebas de endotoxinas LAL y sus Dispositivos de Reto de Proceso (PCDs) internos?",
                    pedagogicalNotes: "Target terms: LAL endotoxin testing, Process Challenge Devices (PCDs)"
                },
                {
                    role: "Ing. Manuel Hinojosa (Sterilization Operations Director, Tijuana)",
                    content: "All 16 internal PCD spore strips showed zero growth after 48 hours of rapid incubation. Our turbidimetric kinetic LAL assay reported endotoxin concentrations under 0.05 Endotoxin Units per milliliter, satisfying our USP <85> release criteria. The lot is fully clear for commercial shipment.",
                    translation: "Las 16 tiras de esporas en PCDs internos mostraron cero crecimiento tras 48 horas de incubación rápida. Nuestro ensayo LAL cinético turbidimétrico reportó concentraciones de endotoxina por debajo de 0.05 Unidades de Endotoxina por mililitro, satisfaciendo nuestros criterios de liberación de USP <85>. El lote está completamente listo para embarque comercial.",
                    pedagogicalNotes: "Target terms: PCD spore strips, rapid incubation, turbidimetric kinetic LAL assay, Endotoxin Units per milliliter, USP <85> release criteria"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Sterility Assurance Level (SAL 10⁻⁶)",
                    ipa: "/stəˈrɪl.ə.ti əˈʃʊr.əns ˈlɛv.əl/",
                    es: "Nivel de Aseguramiento de la Esterilidad (SAL 10⁻⁶)",
                    category: "Esterilización Médica",
                    definition: "The statistical probability of a single viable surviving microorganism being present on an item after terminal sterilization, universally required to be one in one million (10⁻⁶).",
                    collocations: ["achieve SAL 10^-6", "validated SAL level", "overkill sterilization approach"],
                    falseFriends: "No es una garantía de cero bacterias al 100% matemático; es un cálculo probabilístico de una en un millón respaldado por validación de ciclo.",
                    nativeUsage: "The sterilization cycle was validated using the overkill method to guarantee an SAL of 10⁻⁶."
                },
                {
                    term: "Ethylene Oxide (EtO) Sterilization",
                    ipa: "/ˈɛθ.əˌliːn ˈɑːk.saɪd ˌstɛr.ə.ləˈzeɪ.ʃən/",
                    es: "Esterilización por Óxido de Etileno (EtO)",
                    category: "Modalidad de Esterilización",
                    definition: "A low-temperature gas sterilization process commonly used for medical devices that cannot withstand the high temperatures of steam autoclaves or the polymer degradation of radiation.",
                    collocations: ["EtO sterilization chamber", "EtO gas concentration", "aeration degas cycle"],
                    falseFriends: "Requiere una fase prolongada de aireación posterior para evacuar los residuos tóxicos del gas antes del empaque final.",
                    nativeUsage: "Most disposable catheter assemblies are sterilized using EtO because radiation weakens their polyurethane joints."
                },
                {
                    term: "Process Challenge Device (PCD)",
                    ipa: "/ˈprɑː.sɛs ˈtʃæl.ɪndʒ dɪˈvaɪs/",
                    es: "Dispositivo de Reto de Proceso (PCD)",
                    category: "Control Biológico",
                    definition: "An engineered test item designed with internal tortuous pathways or narrow lumens housing a biological indicator, placed in the most difficult-to-penetrate location in a sterilization load.",
                    collocations: ["internal PCD", "external PCD", "spore kill in PCD"],
                    falseFriends: "Es un dispositivo de prueba física de laboratorio, no un producto destinado a la venta hospitalaria.",
                    nativeUsage: "The sterilization engineer placed PCDs containing Bacillus atrophaeus spores at the center of each pallet."
                },
                {
                    term: "Limulus Amebocyte Lysate (LAL) Assay",
                    ipa: "/ˈlɪm.jə.ləs əˈmiː.bəˌsaɪt ˈlaɪˌseɪt ˈæs.eɪ/",
                    es: "Ensayo LAL (Prueba de Endotoxinas Bacterianas / Pirogenicidad)",
                    category: "Ensayos Farmacopeicos",
                    definition: "An aqueous extract of blood cells from the horseshoe crab used to detect and quantify bacterial endotoxins (pyrogens) capable of triggering fatal shock in patients.",
                    collocations: ["kinetic chromogenic LAL", "endotoxin unit limit (EU/mL)", "USP <85> bacterial endotoxin test"],
                    falseFriends: "Detecta endotoxinas liberadas por bacterias muertas, las cuales aún pueden causar fiebre fatal en pacientes aunque el producto esté estéril.",
                    nativeUsage: "Every catheter batch must pass the LAL test to verify bacterial endotoxins remain below 0.5 EU/mL."
                },
                {
                    term: "Aeration Cycle",
                    ipa: "/eɪˈreɪ.ʃən ˈsaɪ.kəl/",
                    es: "Ciclo de aireación y desgasificación de EtO",
                    category: "Seguridad Toxicológica",
                    definition: "The controlled thermal degassing phase following an EtO sterilization cycle, where air is continuously circulated to reduce toxic gas residues to safe levels.",
                    collocations: ["heated aeration cell", "minimum 48-hour aeration", "EtO residual degassing"],
                    falseFriends: "No es simplemente abrir la ventana; es un proceso en cámara climatizada controlada a 40-50°C para acelerar la evaporación de gases tóxicos.",
                    nativeUsage: "The catheter lot remained in the heated aeration chamber for 72 hours until gas chromatography confirmed EtO levels fell below 4 ppm."
                },
                {
                    term: "Parametric Release",
                    ipa: "/ˌpær.əˈmɛt.rɪk rɪˈliːs/",
                    es: "Liberación Paramétrica de Lote Estéril",
                    category: "Aseguramiento de Calidad",
                    definition: "The authorized commercial release of a terminally sterilized batch based exclusively on real-time sensor recordings of physical process parameters rather than waiting for biological spore incubation.",
                    collocations: ["qualify for parametric release", "ISO 11135 parametric release", "temperature and gas pressure curves"],
                    falseFriends: "Exige una validación histórica extremadamente madura y sensores redundantes certificados por organismos reguladores.",
                    nativeUsage: "Parametric release shortened our shipping lead-time from seven days down to twenty-four hours."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Sterility Assurance Level (SAL)",
                    botQuestion: "What does the medical standard Sterility Assurance Level of 10⁻⁶ mathematically mean when releasing an invasive sterile catheter to a hospital?",
                    requiredKeywords: ["one in a million", "million", "probability", "viable", "surviving", "microorganism"],
                    minKeywords: 2,
                    feedbackSuccess: "Exact! An SAL of 10⁻⁶ represents a statistical probability of no more than one in one million (10⁻⁶) that a viable microorganism has survived terminal sterilization on the finished device.",
                    feedbackRetry: "Think about the power of ten: 10⁻⁶ means 1 in how many units?"
                },
                {
                    step: 2,
                    concept: "Endotoxins vs Sterility",
                    botQuestion: "Why is passing a sterility test alone not enough to guarantee patient safety on a vascular catheter, requiring a separate LAL Bacterial Endotoxin test?",
                    requiredKeywords: ["endotoxins", "pyrogens", "fever", "shock", "dead", "cell wall", "toxic"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! Even when bacteria are 100% killed by sterilization, their dead cell walls release endotoxins (pyrogens) that can trigger lethal septic shock and violent fever if introduced into human bloodstream, requiring the LAL assay.",
                    feedbackRetry: "What happens when bacteria die? What toxic substances remain in their cell walls that cause fever and septic shock?"
                }
            ],
            quiz: [
                {
                    q: "What is the universal Sterility Assurance Level (SAL) mandated by global pharmacopeias for terminally sterilized medical implants?",
                    options: [
                        "SAL 10⁻⁶ (one in one million probability of a viable organism)",
                        "SAL 10⁻¹ (one in ten probability)",
                        "SAL 50% (half the lot is sterile)",
                        "Zero percent certainty"
                    ],
                    answer: 0
                },
                {
                    q: "Why is Ethylene Oxide (EtO) gas sterilization chosen over Gamma radiation for delicate polymer catheters containing micro-electronics?",
                    options: [
                        "Because Gamma radiation causes embrittlement, discoloration, and structural degradation in certain polymers and electronic circuits",
                        "Because EtO sterilization is completely non-toxic and odorless",
                        "Because EtO cycles take only 30 seconds to complete",
                        "Because Gamma radiation is legally banned in Mexico"
                    ],
                    answer: 0
                },
                {
                    q: "What is the biological indicator spore organism universally used to validate Ethylene Oxide (EtO) sterilization cycles?",
                    options: [
                        "Bacillus atrophaeus",
                        "Escherichia coli",
                        "Influenza virus",
                        "Candida albicans"
                    ],
                    answer: 0
                },
                {
                    q: "What does the Limulus Amebocyte Lysate (LAL) test specifically detect and quantify?",
                    options: [
                        "Bacterial endotoxins (lipopolysaccharide pyrogens) from Gram-negative bacteria",
                        "Heavy metal contamination such as lead or mercury",
                        "The percentage of sterile gas remaining inside packaging",
                        "The battery life of electronic pacemakers"
                    ],
                    answer: 0
                }
            ]
        }
    ]
};

// Check if medical-devices already exists
if (fileContent.includes('"medical-devices"')) {
    console.log("Track 'medical-devices' already exists in courses.js! Replacing...");
    // Find where it starts and ends and replace
    const startIndex = fileContent.indexOf('    "medical-devices": {');
    if (startIndex !== -1) {
        // We will do a clean replacement
        const lastBraceIndex = fileContent.lastIndexOf('\n};');
        const before = fileContent.slice(0, startIndex);
        // Find closing brace of medical-devices
        // Safer: reload LXP_COURSES in memory
    }
}

// Find the last occurrence of "    }\n};" or "}\n};"
const lastBraceIndex = fileContent.lastIndexOf('\n};');
if (lastBraceIndex === -1) {
    console.error("Could not find the closing brace of LXP_COURSES in content/courses.js");
    process.exit(1);
}

// Format track29 as indented JSON
const track29JSON = JSON.stringify(track29, null, 4);
const indentedTrack29 = track29JSON.split('\n').map((line, idx) => {
    return (idx === 0 ? '    "medical-devices": ' : '    ') + line;
}).join('\n');

const updatedContent = fileContent.slice(0, lastBraceIndex) + ',\n' + indentedTrack29 + fileContent.slice(lastBraceIndex);

fs.writeFileSync(coursesPath, updatedContent, 'utf8');
console.log("Successfully injected Track 29 into content/courses.js!");

// Validate syntax
try {
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(updatedContent, sandbox);
    const courses = sandbox.window.LXP_COURSES || sandbox.LXP_COURSES;
    console.log("Syntax validation PASSED!");
    console.log("Total tracks now:", Object.keys(courses).length);
    console.log("Track 29 exists:", !!courses["medical-devices"]);
    console.log("Track 29 modules count:", courses["medical-devices"].modules.length);
} catch (err) {
    console.error("Syntax validation FAILED:", err);
    // restore original
    fs.writeFileSync(coursesPath, fileContent, 'utf8');
    process.exit(1);
}
