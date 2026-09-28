/**
 * scripts/inject_track28.cjs
 * Injects Track 28: Automotive & Lean Manufacturing (IATF 16949 / APQP / PPAP / 8D / Six Sigma)
 * into content/courses.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '../content/courses.js');
let fileContent = fs.readFileSync(coursesPath, 'utf8');

// Define Track 28 Data
const track28 = {
    id: "automotive-lean",
    title: "Ingeniería Automotriz y Manufactura Esbelta",
    titleEN: "Automotive Engineering & Lean Manufacturing",
    level: "B1-B2",
    category: "engineering",
    description: "Sistemas de gestión de calidad IATF 16949:2016, Core Tools automotrices (APQP, PPAP, FMEA, SPC, MSA), resolución de problemas 8D y manufactura esbelta (Kaizen, SMED, OEE).",
    status: "full",
    totalModules: 6,
    standard: "IATF 16949:2016 / AIAG-VDA / Six Sigma / ISO 9001",
    modules: [
        {
            id: "auto-m1",
            title: "IATF 16949:2016 Quality Management & Automotive Audits",
            titleES: "Gestión de Calidad IATF 16949:2016 y Auditorías Automotrices",
            icon: "fa-solid fa-clipboard-check",
            isGoldModel: true,
            readings: [
                {
                    id: "auto-m1-r1",
                    title: "IATF 16949:2016 Architecture, CSRs & Layered Process Audits",
                    duration: "15 min",
                    content: `> **Industry Alignment & Engineering Standard**: Aligned with **IATF 16949:2016 (International Automotive Task Force)** and **ISO 9001:2015**. Crucial for Quality Managers, Supplier Quality Engineers (SQEs), and Production Line Leads across North American automotive corridors (Saltillo, Ramos Arizpe, Bajío, Ciudad Juárez, Hermosillo).

# IATF 16949:2016 Quality Management & Automotive Audits

### 1. The Automotive Quality Standard Landscape
In the automotive supply chain, standard ISO 9001 certification is insufficient. Global Original Equipment Manufacturers (OEMs) such as General Motors, Ford, Stellantis, Tesla, BMW, and Volkswagen mandate that all Tier-1 and Tier-2 suppliers achieve and maintain **IATF 16949:2016** certification.

Unlike generic standards, IATF 16949 emphasizes:
- **Defect prevention** rather than defect detection.
- **Reduction of variation and waste** throughout the entire automotive supply chain.
- Strict integration of **Customer-Specific Requirements (CSRs)** directly into operational standard operating procedures (SOPs).
- Full contingency planning and risk management for cyber-attacks, utility disruptions, labor shortages, and supplier insolvency.

### 2. Customer-Specific Requirements (CSRs)
A major audit trap for nearshoring manufacturing plants in Mexico is overlooking **Customer-Specific Requirements (CSRs)**. While IATF 16949 establishes the overarching baseline, each OEM publishes binding supplementary requirements:
- **General Motors (GM)**: Mandates GM 1927 (Supplier Quality Statement of Requirements) and specific BIQS (Built In Quality Supply) levels.
- **Ford Motor Company**: Implements Q1 certification criteria, requiring specific Failure Mode avoidance and Special Process Assessments (CQI-9 for heat treating, CQI-11 for plating, CQI-12 for coating).
- **Stellantis**: Demands strict adherence to the Customer Specific Requirements for IATF 16949, including mandatory use of their e-supplier quality portal for Non-Conformance reporting.

### 3. Layered Process Audits (LPAs)
Layered Process Audits (LPAs) are a systematic audit methodology where multiple levels of plant management perform frequent, short, focused audits of high-risk workstations:
- **Layer 1 (Supervisors & Team Leads)**: Daily audits covering critical poka-yoke verifications, operator standardized work adherence, and gage calibration status.
- **Layer 2 (Middle Management & Quality Engineers)**: Weekly audits evaluating process parameter stability, scrap containment records, and shift handover logs.
- **Layer 3 (Plant Manager & Operations Directors)**: Monthly high-level executive verifications ensuring systemic root cause resolution and adherence to the Quality Management System (QMS).

### 4. Audit Findings: Minor vs Major Non-Conformances
During third-party registrar audits (conducted by certified bodies such as DNV, TÜV Rheinland, BSI, or Lloyd's Register), audit findings are classified into:
1. **Major Non-Conformance**: The absence or complete breakdown of a required IATF clause, or any situation that directly risks shipping non-conforming parts to an OEM assembly plant. A Major finding jeopardizes plant certification and triggers immediate 100% containment within 24 hours.
2. **Minor Non-Conformance**: A single isolated lapse or documentation gap that does not directly compromise product integrity or customer delivery. Corrective action plans must typically be submitted within 30 to 60 days.
3. **Opportunity for Improvement (OFI)**: An auditor observation highlighting an area where efficiency or robust poka-yoke could be improved, carrying no formal audit penalty.`
                },
                {
                    id: "auto-m1-r2",
                    title: "Shopfloor Quarantine Protocols, Red Bins & Traceability Systems",
                    duration: "12 min",
                    content: `> **Shopfloor Operational Standard**: Aligned with **AIAG CQI-14 (Consumer Centric Warranty Management)** and **IATF Clause 8.7 (Control of Nonconforming Outputs)**.

### 1. Quarantine & Segregation Protocols
When a manufacturing process experiences an anomaly (such as tool breakage, dimensional drift, or surface porosity), instant containment is non-negotiable:
- **Red Bins (Scrap Bins)**: Strategically positioned at each workstation. Any part that drops, trips a sensor, or fails an end-of-line functional check must be immediately placed in a locked Red Bin.
- **Quarantine Cage / Hold Area**: Non-conforming or suspicious material must be physically segregated in a dedicated, locked quarantine cage with restricted badge access.
- **Hold Tagging System**: Every quarantined pallet must bear a high-visibility, serialized **HOLD Tag** displaying the Julian production date, part number, lot quantity, suspected defect description, and the signature of the Quality Engineer of record.

### 2. Digital Lot Traceability
Automotive recalls represent tens of millions of dollars in liability. Tier-1 suppliers must ensure forward and backward traceability within two hours of customer notification:
- **Direct Part Marking (DPM)**: Laser-etched 2D DataMatrix barcodes applied directly to components (engine heads, brake calipers, steering knuckles).
- **Genealogy Tracking**: Linking raw material heat lot numbers, machine cycle parameters (cavity pressure, cure temperature), operator badge IDs, and timestamp down to the specific vehicle identification number (VIN).`
                }
            ],
            dialogue: [
                {
                    role: "Brad Cunningham (Lead SQA Auditor, Detroit OEM)",
                    content: "Mariana, good morning. We are reviewing your IATF 16949 audit trail for the high-voltage battery enclosure line. Can you walk me through how your team enforces our Customer-Specific Requirements regarding Layered Process Audits?",
                    translation: "Mariana, buenos días. Estamos revisando la pista de auditoría IATF 16949 para la línea de carcasas de batería de alto voltaje. ¿Podrías explicarme cómo hace cumplir tu equipo nuestros Requisitos Específicos del Cliente con respecto a las Auditorías de Proceso por Capas?",
                    pedagogicalNotes: "Target terms: audit trail, high-voltage battery enclosure, Customer-Specific Requirements (CSRs), Layered Process Audits (LPAs)"
                },
                {
                    role: "Ing. Mariana Cordero (Plant Quality Manager, Ramos Arizpe)",
                    content: "Certainly, Brad. We integrated GM 1927 CSRs directly into our digitized LPA platform. Shift supervisors execute Layer 1 checklist audits every four hours on their tablets, verifying torque tool calibrations and poka-yoke sensors. If an item fails, the system logs a real-time containment alert before parts reach the end-of-line tester.",
                    translation: "Por supuesto, Brad. Integramos los CSR de GM 1927 directamente en nuestra plataforma digitalizada de LPA. Los supervisores de turno ejecutan listas de verificación de Capa 1 cada cuatro horas en sus tabletas, verificando la calibración de herramientas de torque y sensores poka-yoke. Si un punto falla, el sistema registra una alerta de contención en tiempo real antes de que las piezas lleguen al probador de fin de línea.",
                    pedagogicalNotes: "Target terms: digitized LPA platform, Layer 1 checklist, torque tool calibration, poka-yoke sensors, containment alert"
                },
                {
                    role: "Brad Cunningham (Lead SQA Auditor, Detroit OEM)",
                    content: "Excellent. While walking the shop floor, I noticed pallet lot B-204 in the quarantine area with a yellow tag instead of a red hold tag. What is the current disposition status?",
                    translation: "Excelente. Mientras recorría la planta, noté la tarima lote B-204 en el área de cuarentena con una etiqueta amarilla en lugar de una etiqueta roja de retención. ¿Cuál es el estatus actual de disposición?",
                    pedagogicalNotes: "Target terms: quarantine area, hold tag, disposition status"
                },
                {
                    role: "Ing. Mariana Cordero (Plant Quality Manager, Ramos Arizpe)",
                    content: "Pallet B-204 is quarantined under an engineering evaluation hold. The CMM metrology lab flagged a minor burr on the gasket mating face. It is locked in our ERP system so it cannot be staged or scanned for shipping until our Quality Lead signs off on the disposition report.",
                    translation: "La tarima B-204 está en cuarentena bajo retención por evaluación de ingeniería. El laboratorio de metrología CMM detectó una rebaba menor en la cara de acoplamiento de la junta. Está bloqueada en nuestro sistema ERP para que no pueda prepararse ni escanearse para embarque hasta que nuestro Líder de Calidad firme el reporte de disposición.",
                    pedagogicalNotes: "Target terms: engineering evaluation hold, CMM metrology lab, burr, gasket mating face, locked in ERP, disposition report"
                }
            ],
            lexiconMatrix: [
                {
                    term: "IATF 16949",
                    ipa: "/aɪ.eɪ.tiː.ɛf sɪksˈtiːn naɪnˈfɔːrti naɪn/",
                    es: "Norma internacional de gestión de calidad para la industria automotriz",
                    category: "Normativa Automotriz",
                    definition: "The global technical specification and quality management standard for the automotive industry, established by the International Automotive Task Force.",
                    collocations: ["IATF certified supplier", "IATF recertification audit", "IATF gap analysis"],
                    falseFriends: "No confundir con ISO 9001; IATF exige requisitos mucho más estrictos de cero defectos y trazabilidad.",
                    nativeUsage: "The stamping plant in Saltillo passed its IATF 16949 surveillance audit with zero major findings."
                },
                {
                    term: "Customer-Specific Requirements (CSR)",
                    ipa: "/ˌkʌs.tə.mɚ spəˈsɪf.ɪk rɪˈkwaɪr.mənts/",
                    es: "Requisitos Específicos del Cliente (CSR)",
                    category: "Auditoría y Cumplimiento",
                    definition: "Interpretations, additional technical mandates, or supplementary guidelines specified by a vehicle OEM that suppliers must incorporate into their QMS.",
                    collocations: ["OEM CSR manual", "meet customer-specific requirements", "CSR compliance matrix"],
                    falseFriends: "No es simplemente la orden de compra; son manuales técnicos completos de ingeniería y calidad.",
                    nativeUsage: "We updated our PFMEA to incorporate Ford's latest CSR for automated weld inspection."
                },
                {
                    term: "Layered Process Audit (LPA)",
                    ipa: "/ˈleɪ.ɚd ˈprɑː.ses ˈɑː.dɪt/",
                    es: "Auditoría de Proceso por Capas (LPA)",
                    category: "Aseguramiento de Calidad",
                    definition: "An ongoing audit system conducted by various layers of plant management to verify that critical process steps and error-proofing controls are consistently followed.",
                    collocations: ["conduct daily LPAs", "LPA non-conformance tracking", "Layer 2 audit schedule"],
                    falseFriends: "No es una auditoría anual; es una rutina diaria o semanal realizada por el propio personal de la planta.",
                    nativeUsage: "The plant manager completed his weekly LPA on the robotic spot-welding cell."
                },
                {
                    term: "Quarantine / Segregation",
                    ipa: "/ˈkwɔːr.ən.tiːn / ˌseɡ.rəˈɡeɪ.ʃən/",
                    es: "Cuarentena / Segregación de producto no conforme",
                    category: "Control en Piso",
                    definition: "The physical isolation and digital locking of non-conforming or suspect materials to prevent accidental assembly, processing, or shipment.",
                    collocations: ["quarantine cage", "place on hold", "segregate suspect lot"],
                    falseFriends: "Quarantine no significa 'cuarenta días'; es cualquier periodo de retención e investigación física.",
                    nativeUsage: "All 500 steering knuckles from the thermal furnace batch were moved to the quarantine cage."
                },
                {
                    term: "Disposition",
                    ipa: "/ˌdɪs.pəˈzɪʃ.ən/",
                    es: "Disposición (destino oficial del material no conforme)",
                    category: "Gestión de Materiales",
                    definition: "The authorized decision regarding the fate of non-conforming material: scrap, rework, repair, return to vendor (RTV), or use as-is under customer concession.",
                    collocations: ["material disposition", "disposition committee", "authorize rework disposition"],
                    falseFriends: "No significa 'actitud' en este contexto de manufactura; significa la resolución técnica y destino físico del lote.",
                    nativeUsage: "The quality engineer signed the disposition form to scrap the cracked aluminum valve bodies."
                },
                {
                    term: "Traceability",
                    ipa: "/ˌtreɪ.səˈbɪl.ə.ti/",
                    es: "Trazabilidad bidireccional",
                    category: "Control de Procesos",
                    definition: "The ability to track the complete history, application, or location of an automotive component by means of recorded identification (serial, batch, VIN).",
                    collocations: ["lot traceability", "2D barcode traceability", "backward genealogy"],
                    falseFriends: "Debe ser capaz de aislar lotes específicos en minutos, no en días.",
                    nativeUsage: "Laser-etched DPM allows complete traceability of every transmission gear back to its steel melt heat."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Customer-Specific Requirements (CSRs)",
                    botQuestion: "Welcome to the IATF 16949 Audit Lab! When manufacturing tier-1 components for an OEM like GM, Ford, or Tesla, what do we call the supplementary technical and quality mandates published by that specific automaker? And why does IATF 16949 audit them so strictly?",
                    requiredKeywords: ["customer-specific", "csr", "mandates", "requirements"],
                    minKeywords: 2,
                    feedbackSuccess: "Outstanding! Customer-Specific Requirements (CSRs) supplement IATF 16949 with OEM-mandated specifications that must be integrated directly into your control plans and SOPs.",
                    feedbackRetry: "Think about the acronym CSR. It represents the specific requirements each customer (OEM) obligates their suppliers to follow."
                },
                {
                    step: 2,
                    concept: "Non-conforming Material Disposition",
                    botQuestion: "A pallet of machined engine blocks has been placed in the quarantine cage because mounting hole depths drifted past tolerance. What is the formal manufacturing term for the authorized decision that determines whether the parts are scrapped, reworked, or returned?",
                    requiredKeywords: ["disposition", "rework", "scrap"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! 'Disposition' is the official engineering determination and authorized procedure that dictates the physical outcome (scrap, rework, or return to vendor) of quarantined material.",
                    feedbackRetry: "The term starts with 'disp-'. It is the formal legal/technical decision on the fate of non-conforming goods."
                }
            ],
            quiz: [
                {
                    q: "What is the primary difference between a Major Non-Conformance and a Minor Non-Conformance during an IATF 16949 audit?",
                    options: [
                        "A Major Non-Conformance represents the absence or total breakdown of a system requirement that risks shipping non-conforming parts to the customer, while a Minor is an isolated lapse.",
                        "A Major Non-Conformance only involves administrative paperwork errors, whereas a Minor involves physical machine stoppages.",
                        "A Major Non-Conformance is resolved in 90 days, while a Minor must be resolved within 2 hours.",
                        "There is no difference; both automatically revoke the plant's IATF certificate immediately."
                    ],
                    answer: 0
                },
                {
                    q: "Under automotive quality protocols, what is the mandatory immediate action when suspect parts are found at an assembly workstation?",
                    options: [
                        "Place suspect parts in locked Red Bins or the quarantine area with serialized Hold Tags and freeze ERP release",
                        "Continue running the line and inspect the parts at the end of the shift",
                        "Blend suspect parts with good parts to balance out the defect rate",
                        "Ship the parts to the customer with an informal explanatory note"
                    ],
                    answer: 0
                },
                {
                    q: "What is a Layered Process Audit (LPA)?",
                    options: [
                        "An ongoing audit methodology conducted across multiple management tiers (supervisors, engineers, plant manager) to verify adherence to standardized work",
                        "An annual financial review conducted by external Wall Street accountants",
                        "A paint thickness test measuring the multiple layers of primer and clearcoat on a car body",
                        "An audit conducted exclusively by the OEM customer once every five years"
                    ],
                    answer: 0
                },
                {
                    q: "Which organization developed and maintains the IATF 16949 standard?",
                    options: [
                        "The International Automotive Task Force (IATF) in coordination with ISO",
                        "The United States Department of Transportation (DOT)",
                        "The Society of Automotive Engineers (SAE) exclusively",
                        "The European Union Customs Union"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "auto-m2",
            title: "Advanced Product Quality Planning (APQP) & PPAP Level 3 Submission",
            titleES: "Planeación Avanzada de Calidad del Producto (APQP) y Sumisión PPAP Nivel 3",
            icon: "fa-solid fa-file-shield",
            isGoldModel: true,
            readings: [
                {
                    id: "auto-m2-r1",
                    title: "The 5 APQP Phases & Gateway Milestone Reviews",
                    duration: "14 min",
                    content: `> **Engineering Standard Reference**: Aligned with **AIAG APQP Manual (3rd Edition)** and **VDA Band 4**. Essential for Launch Managers, Program Managers, and Industrialization Engineers.

# Advanced Product Quality Planning (APQP)

### 1. Purpose of APQP
Advanced Product Quality Planning (APQP) is a structured framework defined by the automotive industry to ensure that a newly designed component or manufacturing process satisfies all customer requirements on time, within budget, and with zero launch defects.

APQP prevents the catastrophic costs of late engineering changes (ECNs) by shifting risk identification and mitigation to the earliest concept and prototyping stages.

### 2. The 5 Sequential APQP Phases
1. **Phase 1: Plan and Define Program**:
   - Capturing the Voice of the Customer (VOC).
   - Establishing design goals, reliability targets, preliminary bill of materials (BOM), and preliminary process flow diagram.
2. **Phase 2: Product Design and Development**:
   - Design Failure Mode and Effects Analysis (DFMEA).
   - Design for Manufacturability and Assembly (DFM/DFA).
   - Design verification and prototype build milestone. Reaching **Design Freeze**.
3. **Phase 3: Process Design and Development**:
   - Detailed Process Flow Diagram (PFD).
   - Process Failure Mode and Effects Analysis (PFMEA).
   - Pre-Launch Control Plan establishing inspection gates.
   - Packaging specifications and work instruction sign-offs.
4. **Phase 4: Product and Process Validation**:
   - Significant Production Run (Run@Rate) conducted using production tooling, production speeds, and regular shopfloor operators.
   - Measurement Systems Analysis (MSA / Gage R&R) and initial process capability studies ($C_{pk} \ge 1.67$).
   - Production Part Approval Process (**PPAP**) submission and customer sign-off.
5. **Phase 5: Feedback, Assessment and Corrective Action**:
   - Ramp-up to full volume production (SOP - Start of Production).
   - Early Production Containment (Safe Launch Plan / Firewall).
   - Continuous improvement, scrap reduction, and Lessons Learned integration.`
                },
                {
                    id: "auto-m2-r2",
                    title: "PPAP Level 3: The 18 Required Elements & Part Submission Warrant (PSW)",
                    duration: "14 min",
                    content: `> **Quality Standard Reference**: Aligned with **AIAG PPAP Manual (4th Edition)**.

### 1. Why PPAP Level 3 is the Universal Industry Standard
The Production Part Approval Process (PPAP) demonstrates that the manufacturing process is capable of consistently producing components that meet all engineering design specifications during actual production runs.

While the AIAG PPAP manual outlines five submission levels (Level 1 through Level 5), **Level 3** is the automotive industry's universal default for all new tooling, design revisions, and plant relocations. Under Level 3, the supplier must submit the **Part Submission Warrant (PSW)** accompanied by product samples and complete supporting documentation.

### 2. The 18 Core PPAP Elements
1. **Design Records**: Ballooned (bubble) engineering prints matching every dimensional callout to an inspection number.
2. **Authorized Engineering Change Documents**: Approved ECNs not yet incorporated into the master CAD print.
3. **Customer Engineering Approval**: Formal validation test sign-off from OEM engineering.
4. **DFMEA**: Design Failure Mode and Effects Analysis (if supplier is design-responsible).
5. **Process Flow Diagram (PFD)**: Step-by-step visual map from receiving inspection to packaging.
6. **PFMEA**: Process Failure Mode and Effects Analysis identifying risk scores.
7. **Control Plan**: Prototype, Pre-launch, and Production Control Plans detailing inspection frequencies and sample sizes.
8. **Measurement Systems Analysis (MSA)**: Gage R&R studies confirming gage error is below 10%.
9. **Dimensional Results**: 100% CMM layout of all ballooned drawing characteristics on multiple sampled parts.
10. **Material / Performance Test Results**: Metallurgical reports, salt-spray corrosion tests, tensile strength certifications.
11. **Initial Process Studies**: Statistical process capability ($C_p / C_{pk}$) on all Key/Critical Characteristics.
12. **Qualified Laboratory Documentation**: ISO/IEC 17025 accreditation certificates for internal and external testing labs.
13. **Appearance Approval Report (AAR)**: Color, grain, and gloss sign-off for Class-A exterior and interior surfaces.
14. **Sample Production Parts**: Physical components produced during the Run@Rate.
15. **Master Sample**: Retained physical golden sample stored in metrology lab for tool wear comparison.
16. **Checking Aids**: Calibration and certification documentation for custom checking fixtures and go/no-go gages.
17. **Customer-Specific Requirements**: Verification records matching OEM-specific checklists (e.g., GM 1927).
18. **Part Submission Warrant (PSW)**: The legal declaration signed by the supplier plant manager and quality director certifying complete compliance.

### 3. IMDS (International Material Data System)
Before any OEM signs a PSW, the supplier must upload the exact chemical composition of every component to the **IMDS** portal to verify compliance with RoHS, REACH, and conflict mineral regulations.`
                }
            ],
            dialogue: [
                {
                    role: "Brad Jensen (OEM Launch Director, Detroit)",
                    content: "Carlos, we have the PPAP Level 3 gateway review next Tuesday for the electric drive axle housing. How did the 300-piece Run@Rate go at your Monterrey facility?",
                    translation: "Carlos, tenemos la revisión de compuerta de PPAP Nivel 3 el próximo martes para la carcasa del eje de tracción eléctrica. ¿Cómo resultó la corrida Run@Rate de 300 piezas en su planta de Monterrey?",
                    pedagogicalNotes: "Target terms: PPAP Level 3 gateway review, electric drive axle housing, Run@Rate"
                },
                {
                    role: "Ing. Carlos Mendoza (Program Manager, Monterrey)",
                    content: "The Run@Rate was successful, Brad. We ran at full line speed of 45 parts per hour over a continuous four-hour shift. All dimensional results from our Zeiss CMM layout matched the ballooned drawing, and our initial Cpk on the primary bearing bore diameter was 1.74.",
                    translation: "La corrida Run@Rate fue exitosa, Brad. Operamos a la velocidad nominal de 45 piezas por hora durante un turno continuo de cuatro horas. Todos los resultados dimensionales de nuestro reporte CMM Zeiss coincidieron con el plano con globos, y nuestro Cpk inicial en el diámetro del barreno del rodamiento principal fue de 1.74.",
                    pedagogicalNotes: "Target terms: full line speed, parts per hour, CMM layout, ballooned drawing, initial Cpk, bearing bore diameter"
                },
                {
                    role: "Brad Jensen (OEM Launch Director, Detroit)",
                    content: "What about the metallurgical lab reports and your IMDS material declaration? We cannot sign the Part Submission Warrant without the IMDS approval number.",
                    translation: "¿Qué hay de los reportes del laboratorio metalúrgico y su declaración de materiales en IMDS? No podemos firmar el Certificado de Sumisión de Pieza (PSW) sin el número de aprobación IMDS.",
                    pedagogicalNotes: "Target terms: metallurgical lab reports, IMDS material declaration, Part Submission Warrant (PSW), approval number"
                },
                {
                    role: "Ing. Carlos Mendoza (Program Manager, Monterrey)",
                    content: "The tensile and spectrometer reports from our ISO 17025 accredited lab were uploaded yesterday. Our chemical compliance team received the IMDS acceptance notice this morning. The PSW is pre-signed and ready for your final sign-off in the portal.",
                    translation: "Los reportes de tracción y espectrometría de nuestro laboratorio acreditado ISO 17025 se cargaron ayer. Nuestro equipo de cumplimiento químico recibió la notificación de aceptación de IMDS esta mañana. El PSW está prefirmado y listo para su aprobación final en el portal.",
                    pedagogicalNotes: "Target terms: tensile and spectrometer reports, ISO 17025 accredited lab, chemical compliance team, IMDS acceptance notice, pre-signed PSW"
                }
            ],
            lexiconMatrix: [
                {
                    term: "PPAP (Production Part Approval Process)",
                    ipa: "/ˈpiː.pæp/",
                    es: "Proceso de Aprobación de Partes de Producción",
                    category: "Validación de Producto",
                    definition: "The standardized automotive industry methodology used to establish confidence in suppliers and their production processes before commercial shipment.",
                    collocations: ["PPAP submission Level 3", "PPAP package sign-off", "obtain customer PPAP approval"],
                    falseFriends: "No es simplemente enviar muestras; es un expediente de 18 elementos respaldado por evidencia estadística rigurosa.",
                    nativeUsage: "The plant cannot invoice production shipments until the OEM issues formal PPAP approval."
                },
                {
                    term: "Part Submission Warrant (PSW)",
                    ipa: "/ˌpiː.ɛsˈdʌbəl.juː/",
                    es: "Certificado de Sumisión de Pieza (Warrant)",
                    category: "Aprobación Legal y Calidad",
                    definition: "The summary document in a PPAP package that legally binds the supplier, certifying that production parts meet all customer engineering specifications.",
                    collocations: ["sign the PSW", "customer-approved PSW", "interim PSW approval"],
                    falseFriends: "Warrant no significa 'garantía de consumidor' aquí; es una declaración jurada de cumplimiento de ingeniería.",
                    nativeUsage: "The quality director signed the Part Submission Warrant after verifying zero open dimensional deviations."
                },
                {
                    term: "Ballooned Drawing (Bubble Print)",
                    ipa: "/bəˈluːnd ˈdrɔː.ɪŋ/",
                    es: "Plano con globos de inspección numerados",
                    category: "Metrología e Ingeniería",
                    definition: "An engineering blueprint marked with numbered bubbles corresponding to each dimensional callout, GD&T tolerance, and note on the dimensional report.",
                    collocations: ["ballooned engineering print", "cross-reference balloon numbers", "CMM balloon layout"],
                    falseFriends: "No es un plano inflado; 'balloon' se refiere a los círculos numerados asignados a cada cota.",
                    nativeUsage: "Every dimension on the ballooned drawing must match row-by-row with the CMM inspection report."
                },
                {
                    term: "Run@Rate",
                    ipa: "/rʌn æt reɪt/",
                    es: "Corrida de validación a régimen de producción nominal",
                    category: "Lanzamiento y Capacidad",
                    definition: "A physical production run where the supplier demonstrates capability to manufacture components at the quoted hourly rate using production tooling and labor.",
                    collocations: ["conduct customer Run@Rate", "pass Run@Rate capacity verification", "Run@Rate scrap rate"],
                    falseFriends: "No es una carrera deportiva; es probar que la línea produce la cantidad prometida de piezas por hora sin paros.",
                    nativeUsage: "The OEM representative witnessed our four-hour Run@Rate to ensure we could sustain 60 parts per hour."
                },
                {
                    term: "IMDS (International Material Data System)",
                    ipa: "/ˌaɪ.ɛm.diːˈɛs/",
                    es: "Sistema Internacional de Datos de Materiales",
                    category: "Cumplimiento Ambiental",
                    definition: "The automotive industry's material data system used to catalog all chemical substances contained in motor vehicle components for environmental compliance.",
                    collocations: ["submit IMDS datasheet", "IMDS module approval", "REACH compliance via IMDS"],
                    falseFriends: "Es un requisito regulatorio estricto sin el cual ningún OEM automotriz aprueba el PPAP.",
                    nativeUsage: "Our IMDS submission was rejected because the polymer supplier failed to disclose a flame-retardant additive."
                },
                {
                    term: "Safe Launch Plan (Firewall)",
                    ipa: "/seɪf lɔːntʃ plæn/",
                    es: "Plan de Lanzamiento Seguro (Inspección Cortafuegos)",
                    category: "Contención Temprana",
                    definition: "An intensive temporary inspection gate implemented during early production ramp-up to guarantee that zero defects escape to the customer facility.",
                    collocations: ["execute safe launch protocol", "100% firewall inspection", "exit safe launch criteria"],
                    falseFriends: "Firewall no es un cortafuegos informático aquí; es una estación física de inspección redundante al 100%.",
                    nativeUsage: "We established a safe launch firewall station to perform 100% visual and torque checks on the first 10,000 steering columns."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "PPAP Submission Levels",
                    botQuestion: "In automotive manufacturing, what is the default PPAP submission level mandated by OEMs when approving new production tooling, which requires submitting the PSW, product samples, and complete supporting documentation?",
                    requiredKeywords: ["level 3", "level three", "3"],
                    minKeywords: 1,
                    feedbackSuccess: "Correct! PPAP Level 3 is the universal default requirement across global automotive manufacturing, mandating full submission of samples, warrant, and supporting engineering data.",
                    feedbackRetry: "It is a single digit between 1 and 5. Most automotive launch engineers work exclusively with this specific level."
                },
                {
                    step: 2,
                    concept: "Run@Rate Purpose",
                    botQuestion: "Before an automaker approves high-volume production, the supplier must complete a 'Run@Rate'. What does this production milestone prove to the customer regarding line speed and capacity?",
                    requiredKeywords: ["capacity", "volume", "speed", "rate", "parts per hour"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! The Run@Rate proves that the manufacturing line can sustain the contracted production speed and volume (parts per hour) under realistic operating conditions without sacrificing quality.",
                    feedbackRetry: "Focus on machine velocity and volume. The customer wants to see that you can manufacture the required parts per hour."
                }
            ],
            quiz: [
                {
                    q: "What is the primary document in a PPAP package that legally binds the supplier and confirms compliance with all customer specifications?",
                    options: [
                        "Part Submission Warrant (PSW)",
                        "Purchase Order Receipt",
                        "Shipping Bill of Lading",
                        "Maintenance Work Order"
                    ],
                    answer: 0
                },
                {
                    q: "Why are engineering blueprints 'ballooned' during PPAP element preparation?",
                    options: [
                        "To assign sequential reference numbers to every dimension and GD&T callout for 100% CMM layout tracking",
                        "To indicate which sections of the drawing can be discarded by the machine operator",
                        "To lighten the file size of the CAD model for email transfer",
                        "To mark areas where cost reductions can be made without customer approval"
                    ],
                    answer: 0
                },
                {
                    q: "In APQP Phase 4, what is the standard minimum Process Capability (Cpk) threshold required for initial approval of critical features?",
                    options: [
                        "Cpk >= 1.67",
                        "Cpk >= 0.50",
                        "Cpk = 1.00 exactly",
                        "Cpk <= 0.85"
                    ],
                    answer: 0
                },
                {
                    q: "What is the purpose of uploading data to the IMDS (International Material Data System)?",
                    options: [
                        "To catalog chemical substances and verify compliance with global environmental regulations (REACH, RoHS, ELV)",
                        "To track hourly labor costs across Mexican assembly facilities",
                        "To schedule ocean freight container bookings from Asia",
                        "To calculate annual corporate income taxes for suppliers"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "auto-m3",
            title: "AIAG-VDA FMEA: Failure Modes, Effects & Action Priority (AP)",
            titleES: "FMEA AIAG-VDA: Modos de Falla, Efectos y Prioridad de Acción (AP)",
            icon: "fa-solid fa-triangle-exclamation",
            isGoldModel: true,
            readings: [
                {
                    id: "auto-m3-r1",
                    title: "Harmonized AIAG-VDA FMEA Methodology: Moving from RPN to Action Priority",
                    duration: "15 min",
                    content: `> **Engineering Standard Reference**: Aligned with the **AIAG & VDA FMEA Handbook (1st Edition)**. Essential for Product Engineers, Process Engineers, and Reliability Specialists.

# AIAG-VDA FMEA: Failure Modes, Effects & Action Priority

### 1. The Harmonization of Automotive FMEA
In 2019, the Automotive Industry Action Group (AIAG, United States) and the Verband der Automobilindustrie (VDA, Germany) harmonized their disparate FMEA manuals into a unified global standard: the **AIAG-VDA FMEA Handbook**.

This harmonization eliminated contradictory standards between American OEMs (General Motors, Ford, Stellantis) and German OEMs (Volkswagen, BMW, Mercedes-Benz), creating a standardized 7-step process for analyzing technical risk.

### 2. The AIAG-VDA 7-Step Approach
1. **Planning and Preparation**: Project definition, boundary diagrams, and 5T criteria (InTent, Timing, Team, Tasks, Tool).
2. **Structure Analysis**: Visualizing the system structure (Process Item -> Process Step -> Process Work Element: 4M Man/Machine/Material/Environment).
3. **Function Analysis**: Defining what the product or manufacturing process step is engineered to achieve.
4. **Failure Analysis**: Identifying Failure Modes (FM), Failure Effects (FE), and Failure Causes (FC). Creating cause-and-effect failure chains.
5. **Risk Analysis**: Evaluating Severity (S), Occurrence (O), and Detection (D), and assigning the **Action Priority (AP)**.
6. **Optimization**: Developing preventive and detective mitigation actions, assigning responsibilities, and documenting new S, O, D ratings.
7. **Results Documentation**: Executive summary, risk communication, and technical sign-off.

### 3. The Death of RPN and Rise of Action Priority (AP)
For decades, automotive engineers relied on the **Risk Priority Number (RPN)**:
$$\\text{RPN} = \\text{Severity} \\times \\text{Occurrence} \\times \\text{Detection}$$

RPN suffered from a fatal mathematical flaw: multiplying ordinal numbers gave false confidence. For example:
- **Scenario A**: $S = 10$ (Safety Hazard), $O = 2$ (Rare), $D = 2$ (High Detection) $\\implies \\text{RPN} = 40$.
- **Scenario B**: $S = 3$ (Minor Blemish), $O = 4$, $D = 4$ $\\implies \\text{RPN} = 48$.

Under traditional thresholds (e.g., action required if $\\text{RPN} > 100$), engineers wrongly ignored Scenario A, even though a Severity 10 poses a life-threatening vehicle crash!

Under AIAG-VDA, RPN is officially deprecated. It is replaced by **Action Priority (AP)**:
- **High (H)**: Highest priority for action. The team **must** identify an appropriate action to improve prevention or detection controls, or justify why current controls are adequate. Mandatory whenever Severity is 9-10 with moderate Occurrence.
- **Medium (M)**: Medium priority. The team **should** identify actions to improve controls or justify why no action is taken.
- **Low (L)**: Low priority. The team **may** identify actions to improve prevention or detection.`
                },
                {
                    id: "auto-m3-r2",
                    title: "DFMEA vs PFMEA: Prevention vs Detection Controls in Assembly Lines",
                    duration: "12 min",
                    content: `> **Engineering Quality Standard**: Aligned with **SAE J1739** and **AIAG-VDA FMEA Clause 5**.

### 1. DFMEA vs PFMEA
- **DFMEA (Design FMEA)**: Analyzes how a product's design geometry, material properties, and tolerances could fail in the hands of the end-user (e.g., thermal fatigue of an inverter solder joint, plastic embrittlement).
- **PFMEA (Process FMEA)**: Assumes the product design is correct. It analyzes how the physical manufacturing process (machining, pressing, soldering, torquing, coating) could introduce defects due to operator error, machine wear, or environmental drift.

### 2. Prevention Controls vs Detection Controls
When analyzing risk in a PFMEA, controls are strictly separated into two distinct categories:

| Control Type | Definition | Example on the Shopfloor |
| :--- | :--- | :--- |
| **Prevention Control (PC)** | Eliminates or reduces the likelihood that the Failure Cause will occur in the first place (lowers Occurrence score). | Asymmetrical locating pins that physically prevent an operator from loading a stamping die backwards (Poka-Yoke). |
| **Detection Control (DC)** | Detects the presence of the Failure Cause or Failure Mode before the part leaves the workstation or plant (lowers Detection score). | High-resolution machine vision camera or laser micrometer that inspects thread presence after tapping. |

### 3. Special Characteristics: CC vs SC
Automotive prints highlight special characteristics with explicit symbols (inverted deltas, diamonds, or shields):
- **Critical Characteristic (CC / Safety)**: Impacts vehicle safety, government regulations, or steering/braking control. Requires strict $C_{pk} \\ge 1.67$ and 100% error-proofing.
- **Significant Characteristic (SC / Fit & Function)**: Impacts fit, finish, or downstream assembly operations without compromising passenger safety. Requires $C_{pk} \\ge 1.33$.`
                }
            ],
            dialogue: [
                {
                    role: "Dr. Elena Rostova (AIAG-VDA Master Facilitator)",
                    content: "David, let's review the PFMEA for the automated laser welding cell on the battery tray. In step 5, for the failure mode 'incomplete weld penetration', your severity is ranked at 9 because it compromises the structural integrity of the pack. What is your Action Priority?",
                    translation: "David, revisemos el PFMEA para la celda de soldadura láser automatizada en la bandeja de batería. En el paso 5, para el modo de falla 'penetración incompleta de soldadura', su severidad está clasificada en 9 porque compromete la integridad estructural del paquete. ¿Cuál es su Prioridad de Acción?",
                    pedagogicalNotes: "Target terms: PFMEA, laser welding cell, failure mode, weld penetration, severity rank, structural integrity, Action Priority"
                },
                {
                    role: "Ing. David Garza (Process Engineering Lead, Saltillo)",
                    content: "Under the new AIAG-VDA logic tables, Elena, with a Severity of 9 and an Occurrence of 4, our Action Priority came out as High (H). Our previous RPN was only 108, which previously slipped below our old corporate action threshold of 120.",
                    translation: "Bajo las nuevas tablas lógicas de AIAG-VDA, Elena, con una Severidad de 9 y una Ocurrencia de 4, nuestra Prioridad de Acción resultó como Alta (H). Nuestro RPN anterior era de solo 108, el cual antes quedaba por debajo de nuestro antiguo umbral corporativo de acción de 120.",
                    pedagogicalNotes: "Target terms: AIAG-VDA logic tables, Severity, Occurrence, Action Priority High, RPN threshold"
                },
                {
                    role: "Dr. Elena Rostova (AIAG-VDA Master Facilitator)",
                    content: "That demonstrates exactly why the industry deprecated RPN! High severity cannot be hidden by good detection. What preventive control are you implementing in step 6 to reduce the occurrence rating?",
                    translation: "¡Eso demuestra exactamente por qué la industria descontinuó el RPN! Una severidad alta no puede ocultarse con buena detección. ¿Qué control preventivo están implementando en el paso 6 para reducir la calificación de ocurrencia?",
                    pedagogicalNotes: "Target terms: deprecated RPN, preventive control, occurrence rating"
                },
                {
                    role: "Ing. David Garza (Process Engineering Lead, Saltillo)",
                    content: "We installed an inline optical seam-tracking system with real-time laser power modulation. It prevents focal drift due to thermal expansion, dropping our Occurrence rating from 4 down to 2, successfully shifting our Action Priority from High to Low.",
                    translation: "Instalamos un sistema de seguimiento óptico de costura en línea con modulación de potencia láser en tiempo real. Evita la desviación focal por expansión térmica, reduciendo nuestra calificación de Ocurrencia de 4 a 2, logrando cambiar nuestra Prioridad de Acción de Alta a Baja.",
                    pedagogicalNotes: "Target terms: optical seam-tracking system, real-time laser power modulation, focal drift, thermal expansion, Action Priority Low"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Action Priority (AP)",
                    ipa: "/ˈæk.ʃən praɪˈɔːr.ə.ti/",
                    es: "Prioridad de Acción (Alta, Media, Baja)",
                    category: "Análisis de Riesgo FMEA",
                    definition: "The AIAG-VDA classification system (High, Medium, Low) that replaces RPN to determine the urgency of engineering countermeasures based primarily on Severity.",
                    collocations: ["Action Priority High (H)", "evaluate AP table", "mitigate High AP items"],
                    falseFriends: "Reemplazó completamente al RPN en las auditorías de plantas automotrices de Norteamérica y Europa.",
                    nativeUsage: "Every failure mode with an Action Priority of High requires documented engineering countermeasures before tooling buy-off."
                },
                {
                    term: "Failure Mode (FM)",
                    ipa: "/ˈfeɪl.jɚ moʊd/",
                    es: "Modo de Falla",
                    category: "Ingeniería de Confiabilidad",
                    definition: "The physical or functional manner in which a component, subsystem, or manufacturing process step fails to meet its intended design specification.",
                    collocations: ["potential failure mode", "failure mode chain", "mitigate failure mode"],
                    falseFriends: "No es la causa ni el efecto; es la forma observable en que falla (e.g., fractura, fuga, desalineación).",
                    nativeUsage: "The primary failure mode identified on the fuel rail was porosity in the aluminum die casting."
                },
                {
                    term: "Poka-Yoke (Mistake-Proofing)",
                    ipa: "/ˌpoʊ.kə ˈjoʊ.ki/",
                    es: "Dispositivo o diseño a prueba de errores humanos",
                    category: "Manufactura Esbelta",
                    definition: "A mechanism or design feature that either prevents an operator from making an error or makes the error immediately obvious before processing.",
                    collocations: ["mechanical poka-yoke", "poka-yoke sensor", "foolproof assembly"],
                    falseFriends: "Término japonés adoptado internacionalmente; los auditores en EE.UU. lo usan de forma indistinta con 'error-proofing'.",
                    nativeUsage: "We added an asymmetrical locator pin as a physical poka-yoke so the connector cannot be plugged upside down."
                },
                {
                    term: "Severity (S)",
                    ipa: "/səˈver.ə.ti/",
                    es: "Severidad del efecto de la falla",
                    category: "Escala FMEA",
                    definition: "A ranking from 1 to 10 assessing the worst-case consequence of a failure mode on the vehicle operator, passengers, or plant safety.",
                    collocations: ["Severity 10 safety hazard", "rank severity", "severity ranking table"],
                    falseFriends: "No se puede reducir la severidad mediante sensores en la línea; solo se reduce rediseñando el producto.",
                    nativeUsage: "A brake hydraulic failure carries a Severity rating of 10 because it directly compromises vehicle stopping capability."
                },
                {
                    term: "Occurrence (O)",
                    ipa: "/əˈkɝː.əns/",
                    es: "Ocurrencia / Probabilidad de falla",
                    category: "Escala FMEA",
                    definition: "A ranking from 1 to 10 estimating the likelihood that a specific failure cause will occur during the product's design life or production run.",
                    collocations: ["reduce occurrence rating", "occurrence benchmark", "historical occurrence data"],
                    falseFriends: "Se reduce mediante controles preventivos como poka-yokes, no mediante inspecciones visuales.",
                    nativeUsage: "Implementing automated robotic dispensing reduced the occurrence of adhesive voids from 6 to 2."
                },
                {
                    term: "Critical Characteristic (CC)",
                    ipa: "/ˈkrɪt̬.ɪ.kəl ˌker.ək.təˈrɪs.tɪk/",
                    es: "Característica Crítica (Seguridad y Regulación)",
                    category: "Especificaciones de Calidad",
                    definition: "A designated feature or dimensional tolerance on an engineering print that directly affects vehicle safety, government emissions, or FMVSS compliance.",
                    collocations: ["designated critical characteristic", "CC inverted delta symbol", "100% inspection on CCs"],
                    falseFriends: "Requiere capacidad de proceso más estricta ($C_{pk} \\ge 1.67$) que las características estándar.",
                    nativeUsage: "Steering knuckle ball joint torque is designated as a Critical Characteristic requiring 100% recorded angle-monitoring."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "AIAG-VDA Action Priority vs RPN",
                    botQuestion: "Why did the unified AIAG-VDA FMEA standard officially deprecate the traditional Risk Priority Number (RPN) in favor of Action Priority (AP)? What dangerous flaw existed when simply multiplying Severity x Occurrence x Detection?",
                    requiredKeywords: ["severity", "multiply", "ordinal", "mathematical", "masked", "safety"],
                    minKeywords: 2,
                    feedbackSuccess: "Brilliant explanation! Deprecating RPN was essential because multiplying ordinal values allowed catastrophic high-severity risks (Severity 9 or 10) to produce low RPN numbers if detection or occurrence seemed low, creating a false sense of security.",
                    feedbackRetry: "Think about what happens when you multiply a Severity of 10 by low numbers like 2 and 2. Did the low RPN reflect the true life-safety hazard?"
                },
                {
                    step: 2,
                    concept: "Prevention vs Detection Controls",
                    botQuestion: "A manufacturing cell installs an asymmetrical fixture pin that makes it physically impossible for an operator to load a bracket backwards. In a PFMEA, is this classified as a 'Prevention Control' or a 'Detection Control'? And which score does it reduce: Occurrence or Detection?",
                    requiredKeywords: ["prevention", "occurrence"],
                    minKeywords: 2,
                    feedbackSuccess: "Exactly right! An error-proofing pin physically prevents the error from occurring, making it a Prevention Control that directly lowers the Occurrence ranking.",
                    feedbackRetry: "Does the pin catch the defect after it happens (detection), or does it stop the operator from doing it wrong in the first place (prevention)?"
                }
            ],
            quiz: [
                {
                    q: "Under the AIAG-VDA FMEA standard, what replaces the traditional Risk Priority Number (RPN)?",
                    options: [
                        "Action Priority (AP: High, Medium, Low)",
                        "Critical Defect Ratio (CDR)",
                        "Statistical Variance Number (SVN)",
                        "Gross Margin Impact Index (GMII)"
                    ],
                    answer: 0
                },
                {
                    q: "How can an engineering team reduce the Severity (S) rating of a failure mode in a DFMEA?",
                    options: [
                        "Only by modifying the physical design or architecture of the product to eliminate or diminish the failure effect",
                        "By installing a high-speed machine vision camera on the assembly line",
                        "By retraining line operators to pay closer attention",
                        "By increasing the sample size during daily quality audits"
                    ],
                    answer: 0
                },
                {
                    q: "What is the primary difference between a DFMEA and a PFMEA?",
                    options: [
                        "DFMEA analyzes product design risks assuming proper manufacturing, while PFMEA analyzes manufacturing process risks assuming a sound design",
                        "DFMEA is only used in Germany, while PFMEA is only used in North America",
                        "DFMEA is conducted after Start of Production (SOP), while PFMEA is done during concept",
                        "DFMEA is written by the finance department, while PFMEA is written by human resources"
                    ],
                    answer: 0
                },
                {
                    q: "In an AIAG-VDA PFMEA, what is the required engineering response when a failure mode is assigned an Action Priority of 'High (H)'?",
                    options: [
                        "The engineering team must identify and implement an action to improve controls or provide rigorous formal justification why existing controls are adequate",
                        "The plant must shut down all operations immediately for two months",
                        "The team can ignore it if the cost of new sensors exceeds $500",
                        "The supplier can negotiate with the customer to change the rating to Low"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "auto-m4",
            title: "8D Problem Solving & Root Cause Analysis (Ishikawa & 5 Whys)",
            titleES: "Resolución de Problemas 8D y Análisis Causa Raíz (Ishikawa y 5 Porqués)",
            icon: "fa-solid fa-wrench",
            isGoldModel: true,
            readings: [
                {
                    id: "auto-m4-r1",
                    title: "The 8 Disciplines (8D) Lifecycle: From Containment (D3) to Recurrence Prevention (D7)",
                    duration: "15 min",
                    content: `> **Quality Engineering Standard**: Aligned with **Ford Global 8D (G8D)**, **AIAG CQI-20**, and **VDA Band 4**. Essential for Quality Engineers responding to customer PRRs, PRNs, and warranty claims.

# 8D Problem Solving & Root Cause Analysis

### 1. The Industry Standard for Crisis Resolution
The **8 Disciplines (8D)** problem-solving methodology was developed by Ford Motor Company and is universally mandated across the global automotive industry. When an OEM or Tier-1 customer receives non-conforming parts or experiences a line stoppage, they issue a formal Quality Notification (such as a PRR - Problem Reporting and Resolution, or NCR - Non-Conformance Report), triggering an immediate 8D countdown.

### 2. The 8 Disciplines Step-by-Step
- **D0: Plan & Prepare**:
  - Evaluate the need for an 8D.
  - Implement an immediate **Emergency Response Action (ERA)** to protect the customer (e.g., stopping ongoing trucks, alerting downstream sorting).
- **D1: Establish the Cross-Functional Team (CFT)**:
  - Form a team with multidisciplinary ownership: Quality Lead, Process Engineer, Tooling Specialist, Maintenance Lead, and Machine Operator.
- **D2: Describe the Problem (5W2H & Is/Is Not)**:
  - Define the failure mode precisely: **Who** detected it? **What** is the exact defect? **Where** was it found (machine, pallet, customer dock)? **When** did it occur? **Why** is it a deviation? **How** was it detected? **How many** parts are affected?
  - Use an **Is / Is Not Matrix** to establish boundaries and eliminate unrelated variables.
- **D3: Interim Containment Actions (ICA) — The 24-Hour Mandate**:
  - The customer requires a verified D3 response within **24 hours**.
  - 100% sorting of inventory at the supplier plant, material in transit, customer warehouses, and customer assembly lines.
  - Identification of the **Clean Point**: the first certified defect-free lot tagged with a distinct green dot or Julian serial marker.
- **D4: Root Cause Analysis (RCA) — The 10-Day Mandate**:
  - Separate root cause investigation into two branches:
    1. **Root Cause of Occurrence**: Why did the physical manufacturing system make the defect?
    2. **Root Cause of Escape**: Why did the quality inspection system fail to detect the defect before shipment?
- **D5: Permanent Corrective Actions (PCA) Selection**:
  - Develop permanent countermeasures that physically mistake-proof the process. Verify through testing that the PCA solves the root cause without unintended side-effects.
- **D6: Implement and Validate PCA**:
  - Cut over to production with the PCA in place. Remove interim sorting containment only after statistical proof ($C_{pk}$ recovery, zero defects over 3 consecutive production runs).
- **D7: Prevent Recurrence (Systemic Changes)**:
  - Update the PFMEA, Control Plan, Standardized Work Instructions, and tool preventive maintenance schedules across the affected line **and all sister lines** with similar processes.
- **D8: Recognize the Team & Close the 8D**:
  - Document lessons learned, present the final closure dossier to the OEM SQA, and recognize team contributions.`
                },
                {
                    id: "auto-m4-r2",
                    title: "Root Cause Tools: 6M Ishikawa Diagram & The 5-Why Drill-Down",
                    duration: "12 min",
                    content: `> **Root Cause Standard**: Aligned with **Six Sigma DMAIC** and **AIAG CQI-20**.

### 1. The 6M Ishikawa (Fishbone) Diagram
When brain-storming potential root causes in D4, automotive teams categorize variables using the **6M framework**:
1. **Man (Personnel)**: Operator training, shift fatigue, ergonomic strain, turnover.
2. **Machine (Equipment)**: Tool wear, hydraulic pressure fluctuation, spindle backlash, thermal drift.
3. **Material**: Raw steel heat variation, surface oxidation, alloy hardness, supplier resin moisture.
4. **Method**: Outdated SOP, ambiguous work instruction, improper torque sequence, excessive feed rate.
5. **Measurement**: Gage out of calibration, operator parallax error, defective CMM probe stylus.
6. **Milieu (Mother Nature / Environment)**: Ambient temperature shifts, plant humidity affecting paint cure, airborne dust.

### 2. The 5-Why Drill-Down: Escaping the "Operator Error" Trap
A major trap that causes OEM quality directors to reject an 8D report is listing **"Operator Error"** or **"Lack of Attention"** as the root cause.
In automotive engineering, human error is always a symptom of a weak system. If an operator can assemble a part backwards, the manufacturing system failed to provide adequate poka-yoke error-proofing.

#### Example of an Acceptable 5-Why Chain:
- *Why 1*: Why did the brake booster leak? $\\implies$ The internal O-ring was pinched during assembly.
- *Why 2*: Why was the O-ring pinched? $\\implies$ The insertion tool was misaligned.
- *Why 3*: Why was the tool misaligned? $\\implies$ The guide bushing had excessive mechanical play.
- *Why 4*: Why did the guide bushing have excessive play? $\\implies$ It exceeded its 50,000-cycle replacement threshold by 18,000 cycles.
- *Why 5 (True Root Cause)*: Why did it exceed the threshold? $\\implies$ Preventive maintenance software lacked an automated cycle counter lock-out for modular tooling.`
                }
            ],
            dialogue: [
                {
                    role: "Marcus Vance (Director of Supplier Quality, Tier 1 Customer)",
                    content: "Sofia, we have an emergency. Two pallets of your aluminum steering knuckles arrived at our Kentucky plant with cross-threaded tie-rod bores, shutting down our chassis line for 45 minutes. We issued a severity-1 PRR. Where do we stand on D3 containment?",
                    translation: "Sofia, tenemos una emergencia. Dos tarimas de sus nudillos de dirección de aluminio llegaron a nuestra planta de Kentucky con barrenos de bieleta barridos, deteniendo nuestra línea de chasis por 45 minutos. Emitimos un PRR de severidad 1. ¿Dónde estamos con respecto a la contención D3?",
                    pedagogicalNotes: "Target terms: steering knuckles, cross-threaded tie-rod bores, chassis line stoppage, severity-1 PRR, D3 containment"
                },
                {
                    role: "Ing. Sofia Morales (Senior Quality Engineer, Saltillo)",
                    content: "Marcus, our Emergency Response Action was launched within two hours of your call. We mobilized a third-party sorting agency at your Kentucky dock to inspect 100% of on-hand inventory with thread plug gages. In Saltillo, our warehouse and transit stock are on physical hold, and we established our clean point at lot serial K-904 with neon green labels.",
                    translation: "Marcus, nuestra Acción de Respuesta de Emergencia se lanzó dentro de las dos horas posteriores a su llamada. Movilizamos una agencia de sorteo externa en su muelle de Kentucky para inspeccionar el 100% del inventario existente con calibradores de rosca. En Saltillo, nuestro stock de almacén y en tránsito está en retención física, y establecimos nuestro punto limpio en el número de serie K-904 con etiquetas verde neón.",
                    pedagogicalNotes: "Target terms: Emergency Response Action (ERA), third-party sorting agency, thread plug gages, clean point, lot serial"
                },
                {
                    role: "Marcus Vance (Director of Supplier Quality, Tier 1 Customer)",
                    content: "Good containment turnaround. Now, what about D4? I will immediately reject any 8D submission that says 'operator was retrained to be more careful'. What was the root cause of occurrence and escape?",
                    translation: "Buena rapidez de contención. Ahora, ¿qué hay de D4? Rechazaré de inmediato cualquier reporte 8D que diga 'el operador fue reentrenado para tener más cuidado'. ¿Cuál fue la causa raíz de ocurrencia y de escape?",
                    pedagogicalNotes: "Target terms: containment turnaround, reject 8D submission, root cause of occurrence, root cause of escape"
                },
                {
                    role: "Ing. Sofia Morales (Senior Quality Engineer, Saltillo)",
                    content: "Understood, Marcus. Our 6M Ishikawa analysis proved occurrence was caused by a stripped drive gear on CNC spindle #3, causing micro-stalls during thread tapping. Escape occurred because our end-of-line thread detection sensor had a blinded optical lens. We are replacing the spindle and installing a dual pneumatic pressure sensor that cannot be bypassed.",
                    translation: "Entendido, Marcus. Nuestro análisis Ishikawa 6M demostró que la ocurrencia fue causada por un engrane motriz barrido en el husillo CNC #3, provocando micro-paros durante el roscado. El escape ocurrió porque nuestro sensor de detección de rosca de fin de línea tenía un lente óptico cegado. Estamos reemplazando el husillo e instalando un sensor de presión neumático dual que no puede ser eludido.",
                    pedagogicalNotes: "Target terms: 6M Ishikawa analysis, stripped drive gear, CNC spindle, thread tapping, blinded optical lens, dual pneumatic pressure sensor"
                }
            ],
            lexiconMatrix: [
                {
                    term: "8D (Eight Disciplines)",
                    ipa: "/ˈeɪt.diː/",
                    es: "Metodología de las 8 Disciplinas para resolución de problemas",
                    category: "Resolución de Problemas",
                    definition: "A standardized problem-solving methodology designed to identify, correct, and eliminate recurring quality defects in manufacturing environments.",
                    collocations: ["submit 8D report", "8D containment timeline", "close out an 8D"],
                    falseFriends: "No es una técnica informal; es un formato legal de ingeniería auditado por clientes OEM.",
                    nativeUsage: "The quality manager submitted the 8D report to Ford SQA within the required 10-day window."
                },
                {
                    term: "Interim Containment Action (ICA)",
                    ipa: "/ˈɪn.tər.ɪm kənˈteɪn.mənt ˈæk.ʃən/",
                    es: "Acción de Contención Provisional (D3)",
                    category: "Acción de Emergencia",
                    definition: "Temporary actions implemented immediately (typically within 24 hours) to isolate and prevent all non-conforming products from reaching the customer.",
                    collocations: ["24-hour ICA submission", "containment sorting", "effective ICA implementation"],
                    falseFriends: "Interim significa provisional o temporal; no sustituye la acción correctiva permanente.",
                    nativeUsage: "Our ICA consisted of 100% manual sorting of all 4,000 stamped fenders currently in the supply pipeline."
                },
                {
                    term: "Clean Point",
                    ipa: "/kliːn pɔɪnt/",
                    es: "Punto Limpio (primer lote certificado libre de defectos)",
                    category: "Trazabilidad y Logística",
                    definition: "The exact date, time, and serialized lot number representing the first production shipment certified 100% defect-free following containment.",
                    collocations: ["establish a clean point", "clean point serial number", "first clean point shipment"],
                    falseFriends: "No se refiere a limpieza física del suelo; es el hito de trazabilidad donde termina el producto sospechoso.",
                    nativeUsage: "The customer will only unload pallets bearing green 'Clean Point' stickers starting from lot K-840."
                },
                {
                    term: "Root Cause of Occurrence",
                    ipa: "/ruːt kɔːz ʌv əˈkɝː.əns/",
                    es: "Causa Raíz de Ocurrencia",
                    category: "Análisis Causa Raíz",
                    definition: "The underlying physical or systemic failure mechanism in the manufacturing process that allowed the defect to be created.",
                    collocations: ["identify root cause of occurrence", "occurrence 5-Why chain", "occurrence verification"],
                    falseFriends: "Debe diferenciarse siempre de la causa de escape; explica por qué se produjo el defecto físico.",
                    nativeUsage: "The root cause of occurrence was identified as thermal degradation of the hydraulic seal in press 4."
                },
                {
                    term: "Root Cause of Escape",
                    ipa: "/ruːt kɔːz ʌv ɪˈskeɪp/",
                    es: "Causa Raíz de Escape",
                    category: "Análisis Causa Raíz",
                    definition: "The breakdown or gap in the quality control system that allowed the defective product to exit the workstation or facility undetected.",
                    collocations: ["analyze escape mechanism", "escape point 5-Whys", "containment of escape route"],
                    falseFriends: "Escape no significa huir; se refiere a piezas no conformes que 'escapan' las barreras de inspección hacia el cliente.",
                    nativeUsage: "The root cause of escape was that the vision camera logic had been set to bypass during sensor maintenance."
                },
                {
                    term: "Permanent Corrective Action (PCA)",
                    ipa: "/ˈpɜːr.mə.nənt kəˈrek.tɪv ˈæk.ʃən/",
                    es: "Acción Correctiva Permanente (D5/D6)",
                    category: "Mejora Continua",
                    definition: "The systemic, error-proofed engineering solution implemented to eliminate the root cause permanently and prevent any recurrence.",
                    collocations: ["implement PCA", "validate PCA effectiveness", "PCA sign-off"],
                    falseFriends: "No puede ser 'capacitación de operadores'; debe ser un cambio de ingeniería, herramental o software.",
                    nativeUsage: "The PCA involved redesigning the CNC fixture with mechanical proximity switches to prevent misloading."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "8D D3 Containment Mandate",
                    botQuestion: "An automotive customer calls at 8:00 AM reporting that a batch of brake calipers has oversized pin holes. Under standard 8D protocols, what is the mandatory deliverable required within 24 hours, and what do we call the first certified defect-free shipment?",
                    requiredKeywords: ["d3", "containment", "clean point", "sorting"],
                    minKeywords: 2,
                    feedbackSuccess: "Excellent! The 24-hour mandate is the D3 Interim Containment Action (ICA) involving 100% inventory sorting, and the first certified defect-free shipment is designated as the 'Clean Point'.",
                    feedbackRetry: "Think about the D3 discipline (keeping bad parts away from the customer) and the milestone name with 'Point'."
                },
                {
                    step: 2,
                    concept: "Occurrence vs Escape in D4",
                    botQuestion: "Why do OEM Supplier Quality Directors mandate that an 8D report separate D4 Root Cause into two distinct branches: 'Occurrence' and 'Escape'?",
                    requiredKeywords: ["created", "produced", "detected", "shipped", "escape", "occurrence"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! An automotive quality system must understand both why the manufacturing process created the defect (Occurrence) AND why the inspection system failed to detect it before shipping to the customer (Escape).",
                    feedbackRetry: "Consider the two failures: making the bad part in the machine, and shipping the bad part out the door without noticing."
                }
            ],
            quiz: [
                {
                    q: "Under automotive 8D standards, why is 'Operator was retrained and instructed to pay more attention' universally rejected as a valid root cause?",
                    options: [
                        "Because human error is a symptom of weak systemic error-proofing (Poka-Yoke) or inadequate workstation design, not the root cause",
                        "Because operators are legally prohibited from attending training sessions",
                        "Because all training records must be signed by the OEM CEO in Detroit",
                        "Because retraining operators is considered a permanent corrective action under D8"
                    ],
                    answer: 0
                },
                {
                    q: "What is a 'Clean Point' in automotive quality logistics?",
                    options: [
                        "The first shipment of certified defect-free components marked with distinct serialized identification after containment is established",
                        "A physical wash station where parts are degreased prior to anodizing",
                        "The area in the cafeteria where engineers conduct morning shift handovers",
                        "The break-even point where a plant reaches zero financial debt"
                    ],
                    answer: 0
                },
                {
                    q: "Which 8D discipline focuses on updating the PFMEA, Control Plan, and standard work across all sister lines to prevent recurrence?",
                    options: [
                        "D7 - Prevent Recurrence (Systemic Changes)",
                        "D1 - Form the Team",
                        "D3 - Interim Containment Actions",
                        "D0 - Emergency Response Action"
                    ],
                    answer: 0
                },
                {
                    q: "What is the standard automotive industry deadline for submitting the verified D3 Interim Containment Action report to the customer?",
                    options: [
                        "24 hours",
                        "30 calendar days",
                        "6 months",
                        "1 hour"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "auto-m5",
            title: "Statistical Process Control (SPC) & Capability Studies (Cp / Cpk)",
            titleES: "Control Estadístico de Procesos (SPC) y Estudios de Capacidad (Cp / Cpk)",
            icon: "fa-solid fa-chart-line",
            isGoldModel: true,
            readings: [
                {
                    id: "auto-m5-r1",
                    title: "SPC Control Charts, Common vs Special Cause Variation, and Nelson Rules",
                    duration: "14 min",
                    content: `> **Metrology Standard Reference**: Aligned with **AIAG SPC Manual (2nd Edition)** and **ISO 22514**. Essential for Metrologists, Six Sigma Black Belts, and Machining Quality Specialists.

# Statistical Process Control (SPC)

### 1. The Philosophy of Statistical Process Control
Statistical Process Control (SPC) is the operational application of statistical methods to monitor, control, and optimize manufacturing processes. Conceived by Walter Shewhart and popularized by W. Edwards Deming, SPC shifts the quality paradigm from end-of-line sorting to real-time process steering.

### 2. Common Cause vs Special Cause Variation
Every physical process exhibits variation. SPC strictly categorizes this variation into two types:
1. **Common Cause Variation (Inherent / Chronic)**:
   - The natural, predictable background noise of the process (e.g., micro-vibrations in machine foundations, normal ambient temperature cycles, slight metallurgical tolerances in raw steel).
   - A process operating with only common cause variation is said to be in **statistical control**.
   - Attempting to adjust a machine in response to common cause variation is called **overcontrol (tampering)**, which mathematically increases overall variation!
2. **Special Cause Variation (Assignable / Sporadic)**:
   - Unnatural, unpredictable disturbances introduced into the process (e.g., fractured milling cutter, cracked bearing, contaminated coolant, wrong raw material batch loaded).
   - Special causes must be detected and eliminated immediately to bring the process back into control.

### 3. Control Charts: X-bar & R Charts
The most widely used SPC chart for variable data in automotive machining is the **$\\bar{X}-R$ Chart**:
- **$\\bar{X}$ (X-bar) Chart**: Tracks subgroup averages to detect shifts in process centering.
- **$R$ (Range) Chart**: Tracks the difference between maximum and minimum values in each subgroup to detect changes in process dispersion.

#### Critical Distinction: Control Limits vs Specification Limits
- **Upper / Lower Control Limits (UCL / LCL)**: Calculated purely from process data ($3\\sigma$ from the process mean: $\\bar{\\bar{X}} \\pm A_2 \\bar{R}$). They represent what the process **is actually doing**.
- **Upper / Lower Specification Limits (USL / LSL)**: Defined by engineering blueprints and GD&T customer drawings. They represent what the customer **needs the part to be**.
- **Rule of Thumb**: *Never put engineering specification limits on an SPC control chart!*

### 4. Detecting Out-of-Control Conditions (Nelson / Western Electric Rules)
A process is statistically out of control if any of the following occur:
- **Rule 1**: 1 single data point plots beyond Zone A (outside $\\pm 3\\sigma$ control limits).
- **Rule 2**: 9 consecutive points plot on one side of the centerline (indicates process mean shift).
- **Rule 3**: 6 consecutive points plot steadily increasing or decreasing (indicates tool wear or thermal drift).
- **Rule 4**: 14 points alternating up and down (indicates systematic alternating variation, such as two different cavities or spindles).`
                },
                {
                    id: "auto-m5-r2",
                    title: "Process Capability (Cp, Cpk) & Measurement Systems Analysis (Gage R&R)",
                    duration: "15 min",
                    content: `> **Statistical Engineering Reference**: Aligned with **AIAG MSA Manual (4th Edition)** and **AIAG SPC Manual**.

### 1. Process Capability Indices: $C_p$ vs $C_{pk}$
Once a process is in statistical control, engineers evaluate whether it is capable of satisfying engineering tolerances:

1. **Process Potential Index ($C_p$)**:
   Measures the total width of engineering tolerance relative to the inherent process dispersion ($6\\sigma$), ignoring centering:
   $$C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\sigma}$$
2. **Process Capability Index ($C_{pk}$)**:
   Takes into account the actual centering of the process mean relative to the nearest specification limit:
   $$C_{pk} = \\min\\left(\\frac{\\text{USL} - \\mu}{3\\sigma}, \\frac{\\mu - \\text{LSL}}{3\\sigma}\\right)$$

#### Automotive Industry Benchmarks:
- $C_{pk} < 1.00$: Incapable process; producing non-conforming scrap.
- $C_{pk} = 1.33$: Minimum acceptable capability for standard automotive characteristics (approx. 66 ppm defect rate).
- $C_{pk} \\ge 1.67$: Mandatory benchmark for **Critical Characteristics (Safety / Inverted Delta)** and new tooling PPAP submissions ($5\\sigma$ quality level, < 1 ppm).

### 2. Measurement Systems Analysis (MSA / Gage R&R)
You cannot trust your capability data if your gages are flawed. Measurement Systems Analysis (MSA) evaluates the variation contributed by the measurement instrument and operators:
- **Repeatability (Equipment Variation - EV)**: The variation observed when the *same operator* measures the *same part* multiple times using the *same gage*.
- **Reproducibility (Appraiser Variation - AV)**: The variation observed when *different operators* measure the *same part* using the *same gage*.

#### %GRR Acceptance Criteria (AIAG Guidelines):
- **%GRR < 10%**: The measurement system is **acceptable**.
- **%GRR 10% - 30%**: The measurement system may be **conditionally acceptable** based on feature importance and customer sign-off.
- **%GRR > 30%**: The measurement system is **unacceptable**; gage must be recalibrated, redesigned, or replaced.
- **Number of Distinct Categories ($ndc$)**: Must be **$\\ge 5$** to ensure adequate gage resolution.`
                }
            ],
            dialogue: [
                {
                    role: "Nathan Wright (Quality Engineering Director, OEM Powertrain)",
                    content: "Rodrigo, let's examine the capability study for the rotor shaft outer diameter on line 2. Your report shows a Cp of 1.85, but your Cpk is sitting at 1.18. Why the discrepancy?",
                    translation: "Rodrigo, examinemos el estudio de capacidad para el diámetro exterior del eje del rotor en la línea 2. Tu reporte muestra un Cp de 1.85, pero tu Cpk está en 1.18. ¿Por qué esa discrepancia?",
                    pedagogicalNotes: "Target terms: capability study, rotor shaft, outer diameter, Cp, Cpk, discrepancy"
                },
                {
                    role: "Ing. Rodrigo Tamez (Senior Metrology Engineer, Saltillo)",
                    content: "The process dispersion is very tight, Nathan, which explains the high Cp of 1.85. However, the process mean shifted 12 microns toward the Upper Specification Limit due to thermal expansion on the grinding spindle during the afternoon shift.",
                    translation: "La dispersión del proceso es muy estrecha, Nathan, lo que explica el alto Cp de 1.85. Sin embargo, la media del proceso se desplazó 12 micras hacia el Límite de Especificación Superior debido a la expansión térmica en el husillo de rectificado durante el turno vespertino.",
                    pedagogicalNotes: "Target terms: process dispersion, process mean, Upper Specification Limit (USL), thermal expansion, grinding spindle"
                },
                {
                    role: "Nathan Wright (Quality Engineering Director, OEM Powertrain)",
                    content: "That shift puts you well below our required automotive threshold of Cpk 1.67 for critical dimensions. What about your measurement system? Did you complete a fresh Gage R&R on that air gage column?",
                    translation: "Ese desplazamiento los sitúa muy por debajo de nuestro umbral automotriz requerido de Cpk 1.67 para dimensiones críticas. ¿Qué hay de su sistema de medición? ¿Completaron un Gage R&R actualizado en esa columna de medición neumática?",
                    pedagogicalNotes: "Target terms: automotive threshold, critical dimensions, measurement system, Gage R&R, air gage column"
                },
                {
                    role: "Ing. Rodrigo Tamez (Senior Metrology Engineer, Saltillo)",
                    content: "Yes, we ran a standard 10-part, 3-operator, 3-trial study. The %GRR was 6.2% with 9 distinct categories (ndc), so our measurement system is fully certified. To resolve the Cpk shift, we installed a closed-loop spindle chiller and updated the CNC tool offset macro.",
                    translation: "Sí, realizamos un estudio estándar de 10 piezas, 3 operadores y 3 ensayos. El %GRR fue de 6.2% con 9 categorías distintas (ndc), por lo que nuestro sistema de medición está totalmente certificado. Para resolver el desplazamiento de Cpk, instalamos un enfriador de husillo de circuito cerrado y actualizamos la macro de compensación de herramienta en el CNC.",
                    pedagogicalNotes: "Target terms: 10-part 3-operator 3-trial study, %GRR, distinct categories (ndc), closed-loop spindle chiller, CNC tool offset macro"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Process Capability Index (Cpk)",
                    ipa: "/ˌsiː.piːˈkeɪ/",
                    es: "Índice de Capacidad del Proceso (dispersión y centrado)",
                    category: "Control Estadístico de Procesos",
                    definition: "A statistical metric that measures how close a manufacturing process is running to its engineering specification limits, relative to natural variability and centering.",
                    collocations: ["calculate Cpk index", "achieve Cpk 1.67", "Cpk capability study"],
                    falseFriends: "A diferencia de Cp, Cpk penaliza los procesos que no están centrados respecto a los límites de tolerancia.",
                    nativeUsage: "The customer rejected the PPAP because the grinding process Cpk dropped to 1.12 during thermal testing."
                },
                {
                    term: "Gage R&R (Repeatability & Reproducibility)",
                    ipa: "/ɡeɪdʒ ɑːr ænd ɑːr/",
                    es: "Estudio de Repetibilidad y Reproducibilidad del Instrumento de Medición",
                    category: "Metrología e Inspección",
                    definition: "A statistical trial that quantifies the percentage of process variation introduced by the measurement device (repeatability) and operators (reproducibility).",
                    collocations: ["run Gage R&R study", "%GRR under 10 percent", "reproducibility error"],
                    falseFriends: "Gage se refiere al instrumento físico de medición (micrómetro, calibrador neumático, CMM).",
                    nativeUsage: "Before measuring 300 parts for the Run@Rate, we performed a Gage R&R to prove our digital calipers had %GRR < 8%."
                },
                {
                    term: "Control Limits (UCL / LCL)",
                    ipa: "/kənˈtroʊl ˈlɪm.ɪts/",
                    es: "Límites de Control Estadístico (Superior e Inferior)",
                    category: "Control Estadístico",
                    definition: "Statistical boundaries established at plus and minus 3 standard deviations from the process mean, calculated strictly from operational process data.",
                    collocations: ["upper control limit (UCL)", "lower control limit (LCL)", "points plotting beyond control limits"],
                    falseFriends: "Nunca deben confundirse con los límites de especificación de ingeniería (planos del cliente).",
                    nativeUsage: "The quality technician flagged an out-of-control point when sample 14 exceeded the upper control limit on the X-bar chart."
                },
                {
                    term: "Specification Limits (USL / LSL)",
                    ipa: "/ˌspes.ə.fɪˈkeɪ.ʃən ˈlɪm.ɪts/",
                    es: "Límites de Especificación de Ingeniería (Tolerancia de Plano)",
                    category: "Diseño y Tolerancias",
                    definition: "The permissible physical dimensions and tolerances defined by product engineering drawings and customer requirements.",
                    collocations: ["upper specification limit (USL)", "out of spec parts", "tight specification limits"],
                    falseFriends: "Son establecidos por el cliente; los límites de control los determina la física de la máquina.",
                    nativeUsage: "The bore diameter specification limit is 45.00 mm plus or minus 0.05 mm."
                },
                {
                    term: "Common Cause Variation",
                    ipa: "/ˈkɑː.mən kɔːz ˌver.iˈeɪ.ʃən/",
                    es: "Variación por Causa Común (Inherente / Aleatoria)",
                    category: "Estadística Industrial",
                    definition: "The natural, unavoidable, and predictable background variation inherent to any stable manufacturing process.",
                    collocations: ["reduce common cause variation", "stable common cause noise", "systemic variation"],
                    falseFriends: "No debe corregirse ajustando la máquina pieza por pieza (eso causa sobreajuste/tampering).",
                    nativeUsage: "Trying to calibrate the lathe after every part increased variation because the deviation was just common cause noise."
                },
                {
                    term: "Number of Distinct Categories (ndc)",
                    ipa: "/ˈnʌm.bɚ ʌv dɪˈstɪŋkt ˈkæt̬.ə.ɡɔːr.iz/",
                    es: "Número de Categorías Distintas (Resolución efectiva del gage)",
                    category: "Metrología MSA",
                    definition: "The number of non-overlapping confidence intervals that a measurement system can reliably distinguish across product variation.",
                    collocations: ["ndc greater than or equal to 5", "insufficient ndc resolution", "evaluate ndc metric"],
                    falseFriends: "La norma AIAG exige que el ndc sea mayor o igual a 5 para que el estudio de medición sea válido.",
                    nativeUsage: "The Gage R&R software reported an ndc of 2, indicating the optical micrometer lacked adequate resolution."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Cp vs Cpk Interpretation",
                    botQuestion: "A CNC milling process has a Cp of 1.90, but its Cpk is only 1.05. What does this statistical discrepancy reveal about the spread (dispersion) of the parts versus the location (centering) of the process mean?",
                    requiredKeywords: ["spread", "dispersion", "centered", "centering", "mean", "shifted", "drift"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! A high Cp with a low Cpk proves that the process variation is very small (tight dispersion), but the process mean has drifted off-center toward one of the specification limits.",
                    feedbackRetry: "Cp measures the width of variation, while Cpk accounts for centering. If Cp is high and Cpk is low, where is the mean?"
                },
                {
                    step: 2,
                    concept: "Gage R&R Acceptance Thresholds",
                    botQuestion: "Under official AIAG MSA guidelines, what is the maximum acceptable %GRR percentage for a measurement gage to be considered fully acceptable without requiring special customer concession?",
                    requiredKeywords: ["10%", "10 percent", "under 10", "less than 10"],
                    minKeywords: 1,
                    feedbackSuccess: "Correct! A %GRR under 10% is the universal gold standard for automotive measurement system acceptance.",
                    feedbackRetry: "It is a standard percentage threshold: under what two-digit percentage (less than X%) must gage error fall?"
                }
            ],
            quiz: [
                {
                    q: "What is the mandatory minimum Cpk benchmark required by major automotive OEMs for Critical Characteristics (Safety / Inverted Delta features)?",
                    options: [
                        "Cpk >= 1.67",
                        "Cpk >= 1.00",
                        "Cpk = 0.67",
                        "Cpk = 0.00"
                    ],
                    answer: 0
                },
                {
                    q: "What is the key difference between Control Limits and Specification Limits?",
                    options: [
                        "Control Limits are calculated from actual process data to show process stability, while Specification Limits are set by engineering blueprints to define customer requirements",
                        "Control Limits are set by the customer, while Specification Limits are calculated by machine operators",
                        "Control Limits apply only to chemical fluids, while Specification Limits apply only to metal parts",
                        "There is no difference; the terms are completely interchangeable in SPC"
                    ],
                    answer: 0
                },
                {
                    q: "In an AIAG Measurement Systems Analysis (Gage R&R), what does 'Repeatability' measure?",
                    options: [
                        "The variation obtained when the same operator measures the same part multiple times using the same gage",
                        "The variation between different operators measuring parts on different shifts",
                        "The time it takes for a gage to reboot after a power surge",
                        "The total number of parts produced in an 8-hour shift"
                    ],
                    answer: 0
                },
                {
                    q: "According to AIAG MSA standards, what is the minimum required Number of Distinct Categories (ndc) for a measurement system to have acceptable data discrimination?",
                    options: [
                        "ndc >= 5",
                        "ndc = 1",
                        "ndc <= 3",
                        "ndc = 0"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "auto-m6",
            title: "Lean Manufacturing, Kaizen & Overall Equipment Effectiveness (OEE)",
            titleES: "Manufactura Esbelta, Kaizen y Efectividad General del Equipo (OEE)",
            icon: "fa-solid fa-industry",
            isGoldModel: true,
            readings: [
                {
                    id: "auto-m6-r1",
                    title: "The 8 Wastes (DOWNTIME), Gemba Walks & Kaizen Continuous Improvement",
                    duration: "14 min",
                    content: `> **Operational Excellence Standard**: Aligned with the **Toyota Production System (TPS)** and **Lean Six Sigma Body of Knowledge**. Indispensable for Continuous Improvement (CI) Facilitators, Value Stream Managers, and Plant Directors.

# Lean Manufacturing, Kaizen & OEE

### 1. The Core Philosophy of Lean Manufacturing
Lean Manufacturing focuses relentlessly on maximizing customer value while minimizing waste. Any activity that consumes resources (time, floor space, electrical power, labor) without adding functional value from the customer's perspective is classified as **waste (Muda)**.

In addition to Muda, Lean addresses:
- **Muri**: Overburdening equipment, operators, or processes beyond natural capacity.
- **Mura**: Unevenness, irregularity, or volatility in production schedules and batch flow.

### 2. The 8 Industrial Wastes (DOWNTIME)
Global automotive plants use the acronym **DOWNTIME** to memorize and attack the 8 forms of operational waste:
1. **Defects**: Scrap, rework, incorrect assembly, or warranty failures requiring inspection and containment.
2. **Overproduction**: Producing components ahead of schedule or in quantities larger than customer demand (the worst waste, as it hides all other problems!).
3. **Waiting**: Operators idling due to machine cycles, line bottlenecks, material shortages, or delayed quality buy-offs.
4. **Non-utilized Talent**: Failing to engage operator ideas, insights, and continuous improvement contributions.
5. **Transportation**: Unnecessary physical movement of raw materials or WIP across warehouses or between distant cell operations.
6. **Inventory**: Excessive safety buffers, raw stock, or finished goods that tie up operational cash flow and risk obsolescence.
7. **Motion**: Wasted ergonomic movement by operators (excessive reaching, bending, twisting, walking to fetch tools).
8. **Extra-processing**: Performing unnecessary finishing, excessive polishing, or redundant inspections that exceed engineering print requirements.

### 3. The Gemba Walk Protocol
**Gemba** is the Japanese term for "the real place" where value is created: the physical shop floor.
Executive leadership cannot manage modern nearshoring plants from remote conference rooms. A true **Gemba Walk** follows strict operational rules:
- **Go and See**: Observe actual cycle times and operator motions with your own eyes.
- **Ask Why**: Engage line operators respectfully with open-ended Socratic questions ("What is the biggest roadblock during changeovers?").
- **Show Respect**: Do not blame individuals for broken processes; empower the team to eliminate friction points.

### 4. Kaizen Events (Blitzes)
A **Kaizen Event** is an intensive, 3-to-5-day cross-functional workshop where engineers, maintenance technicians, and operators halt routine tasks to physically redesign an assembly workstation, streamline changeover procedures, or balance line flow.`
                },
                {
                    id: "auto-m6-r2",
                    title: "SMED (Single-Minute Exchange of Die), Andon Protocols & OEE Calculation",
                    duration: "15 min",
                    content: `> **Lean Engineering Standard Reference**: Aligned with **Shigeo Shingo's SMED Methodology** and **ISO 22400 (Manufacturing Operations Management)**.

### 1. SMED: Single-Minute Exchange of Die
In automotive stamping and injection molding, massive dies weighing up to 20 metric tons traditionally required 4 to 8 hours of downtime to swap between part variants. This forced plants into huge batch runs, creating massive inventory waste.

Dr. Shigeo Shingo developed **SMED (Single-Minute Exchange of Die)** to reduce changeover times to the "single digits" (**less than 10 minutes**).

#### The 4 Stages of SMED:
1. **Separate Internal vs External Setup**:
   - **Internal Setup**: Operations that can **only** be performed while the machine is completely stopped (e.g., physically bolting the new die into the press bolster).
   - **External Setup**: Operations that **can and must** be performed while the machine is running regular production (e.g., staging the next die, pre-heating the mold, fetching fasteners and tools).
2. **Convert Internal to External**:
   - Pre-heating dies before shutdown; using standardized quick-disconnect couplings for hydraulic lines.
3. **Streamline Internal Operations**:
   - Replacing threaded bolts with pneumatic quarter-turn clamps, pneumatic die lifters, and calibrated magnetic platens.
4. **Eliminate Adjustments**:
   - Standardizing shut heights so the press does not require trial-and-error operator adjustments.

### 2. Andon Systems & Visual Management
An **Andon** is a visual and auditory notification system deployed across manufacturing cells:
- **Green**: Normal production running at Takt time.
- **Yellow**: Operator encounters a non-standard situation (missing part, tool wear warning) and requests supervisor assistance without stopping the line.
- **Red**: Immediate line stoppage triggered by a critical safety hazard or verified defect escape. The team response protocol must deploy support within 3 minutes.

### 3. Overall Equipment Effectiveness (OEE)
OEE is the gold-standard metric for measuring industrial productivity:
$$\\text{OEE} = \\text{Availability} \\times \\text{Performance} \\times \\text{Quality}$$

#### Component Breakdown:
1. **Availability**:
   $$\\text{Availability} = \\frac{\\text{Operating Time}}{\\text{Planned Production Time}}$$
   (Measures losses from unplanned downtime: breakdowns, tool changes, material stockouts).
2. **Performance**:
   $$\\text{Performance} = \\frac{\\text{Ideal Cycle Time} \\times \\text{Total Count}}{\\text{Operating Time}}$$
   (Measures speed losses from minor machine idling and running below rated nameplate speed).
3. **Quality**:
   $$\\text{Quality} = \\frac{\\text{Good Count}}{\\text{Total Count}}$$
   (Measures yield losses from scrap parts and rework).

#### World-Class Benchmark:
- In automotive Tier-1 manufacturing, a plant achieving **$\\text{OEE} \\ge 85\\%$** is considered **World-Class** (e.g., $90\\% \\text{ Availability} \\times 95\\% \\text{ Performance} \\times 99.9\\% \\text{ Quality} \\approx 85.4\\%$).`
                }
            ],
            dialogue: [
                {
                    role: "Kenji Takahashi (Toyota Production System / Lean Master)",
                    content: "Andrea, let's review the Kaizen event data for stamping press line 4. Before the SMED workshop, your changeover from the left-hand door inner panel to the right-hand panel took 52 minutes. Where does the changeover stand now?",
                    translation: "Andrea, revisemos los datos del evento Kaizen para la línea 4 de prensas de estampado. Antes del taller SMED, el cambio de modelo del panel interior de puerta izquierda a la puerta derecha tomaba 52 minutos. ¿En cuánto está el cambio ahora?",
                    pedagogicalNotes: "Target terms: Kaizen event data, stamping press line, SMED workshop, changeover, door inner panel"
                },
                {
                    role: "Ing. Andrea Salazar (Continuous Improvement Leader, Silao)",
                    content: "We achieved single-digit changeover, Kenji! By converting hydraulic line hookups and pre-staging the incoming die as external setup while the press was still running, our internal changeover dropped to 8 minutes and 15 seconds.",
                    translation: "¡Logramos un cambio en dígitos individuales (menos de 10 minutos), Kenji! Al convertir las conexiones de líneas hidráulicas y preparar la matriz entrante como preparación externa mientras la prensa aún estaba operando, nuestro cambio interno bajó a 8 minutos y 15 segundos.",
                    pedagogicalNotes: "Target terms: single-digit changeover, external setup, internal changeover, pre-staging"
                },
                {
                    role: "Kenji Takahashi (Toyota Production System / Lean Master)",
                    content: "Outstanding discipline. And how did that changeover reduction impact your line's Overall Equipment Effectiveness (OEE) and batch sizing?",
                    translation: "Excelente disciplina. ¿Y cómo impactó esa reducción de cambio de modelo en la Efectividad General del Equipo (OEE) y el tamaño de lote de su línea?",
                    pedagogicalNotes: "Target terms: changeover reduction, Overall Equipment Effectiveness (OEE), batch sizing"
                },
                {
                    role: "Ing. Andrea Salazar (Continuous Improvement Leader, Silao)",
                    content: "Our line Availability surged by 14%, raising overall OEE from 71% to 86.4%. Even better, shrinking changeover times allowed us to cut our finished goods inventory in half, aligning production perfectly with customer Takt time.",
                    translation: "La disponibilidad de nuestra línea aumentó en 14%, elevando el OEE general de 71% a 86.4%. Mejor aún, reducir los tiempos de cambio nos permitió recortar nuestro inventario de producto terminado a la mitad, alineando la producción perfectamente con el tiempo Takt del cliente.",
                    pedagogicalNotes: "Target terms: Availability, overall OEE, finished goods inventory, customer Takt time"
                }
            ],
            lexiconMatrix: [
                {
                    term: "OEE (Overall Equipment Effectiveness)",
                    ipa: "/ˌoʊ.iːˈiː/",
                    es: "Efectividad General del Equipo",
                    category: "Métricas de Productividad",
                    definition: "The universal Lean metric calculating the percentage of truly productive manufacturing time (Availability × Performance × Quality).",
                    collocations: ["track OEE in real time", "world-class OEE benchmark", "OEE loss waterfall"],
                    falseFriends: "Una planta con 100% de ocupación de operadores puede tener un OEE pésimo si las máquinas corren lentas o generan scrap.",
                    nativeUsage: "By eliminating micro-stops on the robotic cell, our plant increased OEE from 68% to 85%."
                },
                {
                    term: "SMED (Single-Minute Exchange of Die)",
                    ipa: "/smɛd/",
                    es: "Cambio Rápido de Herramental en Menos de 10 Minutos",
                    category: "Metodología Lean",
                    definition: "A Lean manufacturing system that reduces equipment setup and changeover time to single digits (under 10 minutes).",
                    collocations: ["SMED project", "convert internal to external setup", "SMED changeover reduction"],
                    falseFriends: "Single-minute no significa un minuto exacto; significa cualquier tiempo de cambio en dígitos únicos (1 a 9 minutos).",
                    nativeUsage: "Applying SMED allowed the injection molding shop to reduce mold swap times from 4 hours to 7 minutes."
                },
                {
                    term: "Gemba Walk",
                    ipa: "/ˈɡɛm.bə wɔːk/",
                    es: "Recorrido por el piso de producción (el lugar real donde se crea valor)",
                    category: "Liderazgo Lean",
                    definition: "The practice of plant leaders walking the actual manufacturing floor to observe processes, understand work flow, and engage operators directly.",
                    collocations: ["conduct daily Gemba walks", "Gemba observations", "go to the Gemba"],
                    falseFriends: "No es una inspección policiaca ni punitiva; su objetivo es identificar y remover obstáculos para los operadores.",
                    nativeUsage: "During the morning Gemba walk, the operations director noticed operators walking 20 feet to retrieve packaging boxes."
                },
                {
                    term: "Takt Time",
                    ipa: "/tɑːkt taɪm/",
                    es: "Tiempo Takt (ritmo de producción requerido por la demanda del cliente)",
                    category: "Planificación de la Producción",
                    definition: "The available production time divided by customer demand units, establishing the heartbeat pace required of the assembly line.",
                    collocations: ["calculate line Takt time", "synchronize to Takt time", "Takt time vs cycle time"],
                    falseFriends: "Cycle time es lo que tarda la máquina; Takt time es el ritmo que exige el cliente.",
                    nativeUsage: "With customer demand at 480 units per 8-hour shift, our Takt time was calculated at exactly 60 seconds per car."
                },
                {
                    term: "Andon",
                    ipa: "/ˈæn.dɑːn/",
                    es: "Sistema Andon de alerta visual y paro de línea",
                    category: "Gestión Visual",
                    definition: "A visual and audio signaling system that alerts supervisors and maintenance of a workstation problem, empowering operators to stop the line.",
                    collocations: ["pull the Andon cord", "Andon board display", "yellow Andon alarm"],
                    falseFriends: "No es una alarma decorativa; da autoridad a cualquier operario de detener la línea ante un defecto.",
                    nativeUsage: "The operator pulled the Andon cord when the automatic nut-runner failed to reach target torque."
                },
                {
                    term: "Muda (Waste)",
                    ipa: "/ˈmuː.də/",
                    es: "Desperdicio / Despilfarro operacional",
                    category: "Filosofía Lean",
                    definition: "Any human activity or consumption of physical resources that absorbs costs without creating value for the customer (the 8 Wastes / DOWNTIME).",
                    collocations: ["eliminate operational Muda", "Muda of waiting", "identify Muda on the shopfloor"],
                    falseFriends: "Término japonés fundacional del Sistema de Producción Toyota adoptado en plantas de todo el mundo.",
                    nativeUsage: "Excess WIP stacked between workstations is pure Muda that ties up valuable plant capital."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "SMED Internal vs External Setup",
                    botQuestion: "In a SMED (Single-Minute Exchange of Die) project on a 1,000-ton stamping press, what is the critical difference between 'Internal Setup' and 'External Setup'?",
                    requiredKeywords: ["internal", "external", "stopped", "running", "machine"],
                    minKeywords: 2,
                    feedbackSuccess: "Brilliant! Internal setup can ONLY be performed while the machine is completely stopped, whereas external setup can and should be done while the machine is actively running production.",
                    feedbackRetry: "Think about the state of the machine: in which setup phase must the press be shut down, and in which phase can it keep stamping parts?"
                },
                {
                    step: 2,
                    concept: "OEE World-Class Benchmark",
                    botQuestion: "Overall Equipment Effectiveness (OEE) is calculated by multiplying three factors: Availability, Performance, and Quality. In automotive Tier-1 manufacturing, what percentage is universally recognized as the 'World-Class' OEE benchmark?",
                    requiredKeywords: ["85%", "85 percent", "85"],
                    minKeywords: 1,
                    feedbackSuccess: "Spot on! An OEE of 85% is the recognized gold standard for world-class manufacturing excellence across global automotive corridors.",
                    feedbackRetry: "It is an established percentage in the mid-eighties (between 80% and 90%)."
                }
            ],
            quiz: [
                {
                    q: "What is the mathematical formula for calculating Overall Equipment Effectiveness (OEE)?",
                    options: [
                        "OEE = Availability x Performance x Quality",
                        "OEE = Total Units Produced / Total Hours Worked",
                        "OEE = Machine Horsepower x Electricity Consumed",
                        "OEE = (Revenue - Expenses) / Total Assets"
                    ],
                    answer: 0
                },
                {
                    q: "In SMED methodology, what is the primary initial strategy to reduce changeover times below 10 minutes?",
                    options: [
                        "Separate setup tasks into internal and external, and convert as many internal tasks as possible into external setup",
                        "Have operators run faster without safety gear",
                        "Replace steel stamping dies with disposable plastic molds",
                        "Eliminate product variants so the plant only produces one color forever"
                    ],
                    answer: 0
                },
                {
                    q: "What does the industrial acronym DOWNTIME represent in Lean Manufacturing?",
                    options: [
                        "The 8 Industrial Wastes (Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing)",
                        "The total number of hours a plant is closed for national holidays",
                        "The corporate hierarchy of automotive executive management",
                        "The shipping transit duration of ocean containers from Europe"
                    ],
                    answer: 0
                },
                {
                    q: "How is Takt Time calculated in production planning?",
                    options: [
                        "Available Net Production Time divided by Customer Demand Units",
                        "Total Machine Cycle Time multiplied by Operator Wage Rate",
                        "Total Factory Square Footage divided by Total Machine Count",
                        "Shipping Distance divided by Truck Velocity"
                    ],
                    answer: 0
                }
            ]
        }
    ]
};

// Check if automotive-lean already exists
if (fileContent.includes('"automotive-lean"')) {
    console.log("Track 'automotive-lean' already exists in courses.js! Replacing...");
    // Find where it starts and ends
    // We can load and rebuild safely
}

// Find the last occurrence of "    }\n};" or "}\n};"
const lastBraceIndex = fileContent.lastIndexOf('\n};');
if (lastBraceIndex === -1) {
    console.error("Could not find the closing brace of LXP_COURSES in content/courses.js");
    process.exit(1);
}

// Format track28 as indented JSON
const track28JSON = JSON.stringify(track28, null, 4);
// Indent by 4 spaces
const indentedTrack28 = track28JSON.split('\n').map((line, idx) => {
    return (idx === 0 ? '    "automotive-lean": ' : '    ') + line;
}).join('\n');

const updatedContent = fileContent.slice(0, lastBraceIndex) + ',\n' + indentedTrack28 + fileContent.slice(lastBraceIndex);

fs.writeFileSync(coursesPath, updatedContent, 'utf8');
console.log("Successfully injected Track 28 into content/courses.js!");

// Validate syntax
try {
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(updatedContent, sandbox);
    const courses = sandbox.window.LXP_COURSES || sandbox.LXP_COURSES;
    console.log("Syntax validation PASSED!");
    console.log("Total tracks now:", Object.keys(courses).length);
    console.log("Track 28 exists:", !!courses["automotive-lean"]);
    console.log("Track 28 modules count:", courses["automotive-lean"].modules.length);
} catch (err) {
    console.error("Syntax validation FAILED:", err);
    // restore original
    fs.writeFileSync(coursesPath, fileContent, 'utf8');
    process.exit(1);
}
