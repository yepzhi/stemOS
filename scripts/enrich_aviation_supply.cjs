// scripts/enrich_aviation_supply.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

// 1. AVIATION MRO
const mroReading = `
> **Aviation Authority & Maintenance Standard**: Aligned with **FAA 14 CFR Part 145 (Repair Stations)** and **EASA Part-145 Maintenance Regulations**. Critical for powerplant technicians and powerplant airworthiness inspectors.

# Turbofan Hot-Section Inspection, Borescope Diagnostics & FAA Part 145

Commercial high-bypass turbofan jet engines (e.g., CFM LEAP-1B, GE9X) operate under severe thermal, mechanical, and rotational stress. The turbine hot-section—comprising the combustor, High-Pressure Turbine (HPT) nozzles, and HPT rotor blades—experiences operating gas temperatures exceeding **1,700°C**, far higher than the melting point of bare superalloy metals.

## 1. High-Pressure Turbine (HPT) Blade Metallurgy & Thermal Barrier Coatings

1. **Single-Crystal Superalloys**: Modern HPT blades are vacuum-cast as single crystals (SX nickel-based superalloys like CMSX-4), eliminating grain boundaries that cause high-temperature **creep rupture**.
2. **Thermal Barrier Coatings (TBC)**: A 150-micron ceramic topcoat of yttria-stabilized zirconia (YSZ) is plasma-sprayed onto the blade, dropping metal substrate temperatures by up to **150°C**.
3. **Internal Convection & Film Cooling**: High-pressure compressor discharge bleed air (300°C) is routed through serpentine cooling passages inside the hollow blade and expelled through laser-drilled micro-holes, creating an insulating pneumatic cooling boundary layer over the airfoil.

## 2. Video Borescope Optical Measurement & Damage Assessment

Under scheduled maintenance (A/C Checks) or engine telemetry exceedances, powerplant technicians perform internal **Video Borescope Inspection (VBI)** without disassembling the engine core:
- **Optical Measurement Techniques**: Utilizing high-definition 3D stereo or shadow measurement probes to quantify defect dimensions:
  - **Leading Edge Erosion & Foreign Object Debris (FOD)**: Dents, nicks, and tip curling caused by ingested airborne sand or runway debris.
  - **Thermal Coating Spallation**: Loss of the ceramic TBC layer exposing bare superalloy to rapid oxidation and hot corrosion (**sulfidation**).
  - **Creep & Leading-Edge Cracking**: High-cycle thermal fatigue microcracks along blade trailing edges.
- **Engine Maintenance Manual (EMM) Limits**: The technician must cross-reference measured crack lengths against the OEM Aircraft Maintenance Manual (AMM) and Engine Maintenance Manual (EMM). Minor trailing edge cracks under 1.5mm may be approved for a specified flight cycle interval, whereas leading edge cracks or cracks extending to the blade root serration (fir-tree) mandate immediate engine removal.

## 3. FAA Form 8130-3 Airworthiness Release Mandates

When an engine component is repaired or overhauled at an FAA Part 145 repair station:
- **Traceability**: All replacement parts must trace back to certified OEM type-certificate holders or FAA Parts Manufacturer Approval (PMA).
- **Authorized Release Certificate (FAA Form 8130-3 / EASA Form 1)**: The certified powerplant inspector signs the legal return-to-service statement certifying that the assembly was inspected and conforms to all applicable Airworthiness Directives (**ADs**) and Service Bulletins (**SBs**).

---
> **Key Takeaway**: Aviation MRO links **aerothermodynamics (single-crystal superalloys, film cooling, TBC spallation)** with **optical metrology (3D video borescope inspection, defect sizing)** and **strict international airworthiness law (FAA Part 145, Form 8130-3, EMM limits)**.
`;

const mroDialogue = {
  title: "AOG Hot-Section Escrow: CFM LEAP-1B Borescope Blade Spallation Audit",
  titleES: "Inspección de Emergencia AOG: Evaluación Borescópica por Desprendimiento de Recubrimiento Térmico",
  scenarioContext: "Atlanta, GA (Fleet Airworthiness Compliance) ⇄ Toluca, Edo. Méx. (FAA Part 145 MRO Hub). Aircraft on Ground (AOG) Video Conference.",
  characters: [
    { name: "Frank Callahan", role: "FAA Part 145 Fleet Airworthiness Auditor (Atlanta)", avatar: "FC", color: "var(--cyan)" },
    { name: "Ing. Mariana Morales", role: "Chief Powerplant Inspector (Toluca MRO Base)", avatar: "MM", color: "var(--emerald)" }
  ],
  turns: [
    {
      speaker: "Frank Callahan",
      text: "Mariana, the Boeing 737 MAX is Aircraft on Ground (AOG) in Toluca following an EGT overtemperature spike on climb-out. Have your technicians fed the video borescope into the Stage 1 High-Pressure Turbine (HPT) inspection port?",
      translation: "Mariana, el Boeing 737 MAX está en tierra (AOG) en Toluca tras un pico de sobretemperatura EGT en el ascenso. ¿Tus técnicos ya introdujeron el videoborescopio en el puerto de inspección de la Etapa 1 de la turbina de alta presión (HPT)?",
      targetTerms: ["Aircraft on Ground (AOG)", "EGT overtemperature spike", "video borescope", "Stage 1 High-Pressure Turbine"]
    },
    {
      speaker: "Ing. Mariana Morales",
      text: "Yes, Frank. We used a 3D stereo measurement borescope probe. We identified ceramic Thermal Barrier Coating (TBC) spallation on Blade 18, measuring 3.2mm in width. However, dye inspection and optical magnification confirm zero superalloy base metal parent cracks.",
      translation: "Sí, Frank. Utilizamos una sonda de boroscopio de medición estéreo 3D. Identificamos desprendimiento (spallation) del recubrimiento de barrera térmica (TBC) en la pala 18, que mide 3.2mm de ancho. Sin embargo, la inspección y amplificación óptica confirman cero grietas en el metal base de la superaleación.",
      targetTerms: ["3D stereo measurement", "Thermal Barrier Coating (TBC)", "spallation", "parent cracks"]
    },
    {
      speaker: "Frank Callahan",
      text: "What does the Engine Maintenance Manual (EMM) Chapter 72 say for Stage 1 HPT blade surface spallation? Is it within dispatch limits for a ferry flight, or does it require immediate drop of the turbine module?",
      translation: "¿Qué indica el Manual de Mantenimiento de Motor (EMM) Capítulo 72 para desprendimiento superficial de palas HPT Etapa 1? ¿Está dentro de límites de despacho para un vuelo de traslado (ferry flight), o requiere el desmontaje inmediato del módulo de turbina?",
      targetTerms: ["Engine Maintenance Manual (EMM)", "dispatch limits", "ferry flight", "turbine module drop"]
    },
    {
      speaker: "Ing. Mariana Morales",
      text: "EMM Table 72-51 permits coating spallation up to 4.0mm provided cooling film holes remain unclogged and oxidation is under Category B. We borescope-probed all 32 cooling holes and verified full airflow. I am issuing an authorized FAA Form 8130-3 airworthiness release for 50 cyclic hours under repetitive inspection.",
      translation: "La tabla EMM 72-51 permite desprendimiento de recubrimiento de hasta 4.0mm siempre que los orificios de película de refrigeración no estén obstruidos y la oxidación esté bajo Categoría B. Inspeccionamos con boroscopio los 32 orificios de refrigeración y verificamos flujo completo. Estoy emitiendo la liberación de aeronavegabilidad autorizada FAA Formulario 8130-3 por 50 horas cíclicas bajo inspección repetitiva.",
      targetTerms: ["cooling film holes", "FAA Form 8130-3 airworthiness release", "repetitive inspection"]
    }
  ],
  contrastTips: [
    {
      school: "Look inside the plane engine with a camera.",
      native: "Perform a 3D stereo video borescope inspection to quantify high-pressure turbine blade thermal barrier coating spallation.",
      explanation: "En aviación comercial se especifica la técnica exacta (video borescope, 3D stereo measurement) y el componente termodinámico preciso."
    },
    {
      school: "The mechanic signs the paper so the plane can fly.",
      native: "The certified powerplant inspector executes an authorized FAA Form 8130-3 return-to-service airworthiness release.",
      explanation: "No es un 'papel'; es el documento legal regulatorio internacional FAA Form 8130-3 / EASA Form 1."
    }
  ]
};

const mroLexicon = [
  {
    term: "Video Borescope Inspection (VBI)",
    ipa: "/ˈvɪd.i.oʊ ˈbɔːr.skəʊp ɪnˈspɛk.ʃən/",
    es: "Inspección por Videoboroscopio",
    category: "Metrología Óptica",
    definition: "Non-destructive visual examination technique using a flexible articulating camera tube inserted through casing ports to inspect internal engine stages.",
    collocations: ["3D stereo measurement probe", "guide tube insertion", "borescope port plug torque"],
    falseFriends: "No es un endoscopio médico; es un equipo de fibra óptica industrial de grado aeroespacial que soporta aceite y calor residual.",
    nativeUsage: "Technicians performed a borescope inspection through Port 4 to inspect the high-pressure turbine nozzle guide vanes."
  },
  {
    term: "Thermal Barrier Coating (TBC)",
    ipa: "/ˈθɜːr.məl ˈbær.i.ər ˈkoʊ.tɪŋ/",
    es: "Recubrimiento de Barrera Térmica (TBC)",
    category: "Materiales Cerámicos",
    definition: "Ceramic material (e.g., Yttria-Stabilized Zirconia) applied to superalloy engine components to insulate them from gas temperatures above 1,500°C.",
    collocations: ["TBC spallation", "plasma-spray coating", "bond coat oxidation"],
    falseFriends: "No es pintura resistente al calor; es una cerámica refractaria aplicada por deposición física en fase vapor por haz de electrones (EB-PVD).",
    nativeUsage: "The ceramic thermal barrier coating lowers the base metal temperature of the turbine blade by 170°C."
  },
  {
    term: "FAA Form 8130-3 (Airworthiness Release)",
    ipa: "/ˌɛf.eɪˈeɪ fɔːrm ˌeɪt.wʌnˈθriː.oʊ/",
    es: "Formulario FAA 8130-3 (Aprobación de Aeronavegabilidad)",
    category: "Certificación Regulatoria",
    definition: "Official FAA document certifying that an aircraft part or engine has been inspected or overhauled in accordance with federal airworthiness standards.",
    collocations: ["return-to-service statement", "certifying statement in block 14a", "dual release FAA/EASA"],
    falseFriends: "No es una factura comercial; es la credencial legal civil sin la cual ninguna aerolínea puede instalar una refacción en un avión comercial.",
    nativeUsage: "The overhauled fuel pump cannot be cleared through customs without an authorized FAA Form 8130-3 certificate."
  },
  {
    term: "Aircraft on Ground (AOG)",
    ipa: "/ˌeɪ.oʊˈdʒiː / ˈɛər.kræft ɑːn ɡraʊnd/",
    es: "Aeronave en Tierra por Falla (AOG)",
    category: "Estado Operativo Crítico",
    definition: "High-priority aviation emergency condition indicating that an aircraft is grounded due to a mechanical failure and cannot fly until repaired.",
    collocations: ["AOG priority courier", "AOG parts desk", "resolve AOG critical delay"],
    falseFriends: "No significa un avión estacionado normalmente en la terminal; es la alerta logística más costosa en la aviación ($50,000+ USD por hora de retraso).",
    nativeUsage: "The airline declared AOG status in Mexico City and chartered an emergency courier flight to deliver the replacement turbine blade."
  },
  {
    term: "Creep Rupture",
    ipa: "/kriːp ˈrʌp.tʃər/",
    es: "Ruptura por Termofluencia (Creep)",
    category: "Metalurgia de Falla",
    definition: "Time-dependent permanent deformation and fracture of metals subjected to sustained mechanical stress at elevated temperatures.",
    collocations: ["creep deformation", "stress-rupture life", "single-crystal creep resistance"],
    falseFriends: "Creep no significa persona extraña; en física de materiales es la deformación plástica lenta a altas temperaturas de operación.",
    nativeUsage: "Single-crystal casting eliminates grain boundaries where creep rupture typically initiates under extreme rotational stress."
  },
  {
    term: "Spallation",
    ipa: "/spɔːˈleɪ.ʃən/",
    es: "Desprendimiento / Exfoliación (Spalling)",
    category: "Mecanismo de Desgaste",
    definition: "Flaking or chipping off of a material surface, especially ceramic coatings on turbine blades under cyclic thermal shock.",
    collocations: ["coating spallation limit", "delamination spallation", "spalled area measurement"],
    falseFriends: "No traducir como pelar; es el desprendimiento cerámico catastrófico provocado por incompatibilidad de expansión térmica.",
    nativeUsage: "The borescope measured 4.2mm of coating spallation along the leading edge of the high-pressure turbine blade."
  },
  {
    term: "Airworthiness Directive (AD)",
    ipa: "/ˈɛərˌwɜːr.ði.nəs dɪˈrɛk.tɪv/",
    es: "Directiva de Aeronavegabilidad (AD)",
    category: "Regulación Aeronáutica",
    definition: "Legally enforceable regulation issued by aviation authorities (FAA/EASA) to correct an unsafe condition in an aircraft product.",
    collocations: ["mandatory AD compliance", "repetitive AD inspection interval", "Emergency Airworthiness Directive"],
    falseFriends: "No es una recomendación opcional; el incumplimiento de una AD cancela inmediatamente el certificado de vuelo de la aeronave.",
    nativeUsage: "The airline grounded six aircraft overnight to comply with an Emergency Airworthiness Directive on engine fuel control units."
  },
  {
    term: "Sulfidation (Hot Corrosion)",
    ipa: "/ˌsʌl.fɪˈdeɪ.ʃən/",
    es: "Sulfidación / Corrosión en Caliente",
    category: "Corrosión Química",
    definition: "Accelerated oxidation and attack of turbine superalloys caused by sodium sulfate deposits from atmospheric marine salt and fuel sulfur.",
    collocations: ["Type I vs Type II sulfidation", "sulfidation pitting", "aluminide protective diffusion coating"],
    falseFriends: "Ocurre especialmente en aeronaves que vuelan cerca de rutas marítimas y costas donde el aire contiene salitre y humedad.",
    nativeUsage: "Operating in coastal environments accelerated sulfidation on the uncooled low-pressure turbine nozzle stages."
  },
  {
    term: "Time Since Overhaul (TSO)",
    ipa: "/taɪm sɪns ˈoʊ.vər.hɔːl/",
    es: "Tiempo Desde Última Revisión Mayor (TSO)",
    category: "Registro de Mantenimiento",
    definition: "Operating hours or flight cycles accumulated by an aircraft component since its last comprehensive overhaul.",
    collocations: ["TSO logbook verification", "TSO cycle threshold", "zero-time overhaul"],
    falseFriends: "Diferente de Time Since New (TSN); el TSO se reinicia a cero tras un desensamble y reacondicionamiento certificado en taller Part 145.",
    nativeUsage: "The engine records indicated 4,800 flight cycles Time Since Overhaul (TSO) prior to the high-pressure turbine inspection."
  },
  {
    term: "Foreign Object Debris (FOD)",
    ipa: "/ˈfɔːr.ən ˈɑːb.dʒɛkt ˈdɛb.riː/",
    es: "Daño por Objetos Extraños (FOD)",
    category: "Seguridad Operacional",
    definition: "Substances, debris, or objects alien to an aircraft that cause damage to engines, airfoils, or systems.",
    collocations: ["FOD ingestion damage", "runway FOD sweeper", "FOD prevention program"],
    falseFriends: "Se pronuncia /ɛf-oʊ-diː/ o FOD. Incluye desde herramientas olvidadas por mecánicos hasta aves o grava aspiradas por la turbina.",
    nativeUsage: "Borescope imaging confirmed that a small stone ingested on takeoff caused leading-edge nicks on three fan blades."
  },
  {
    term: "Fir-Tree Root Serration",
    ipa: "/fɜːr triː ruːt sɛˈreɪ.ʃən/",
    es: "Fijación de Raíz en Pino (Fir-Tree)",
    category: "Diseño Mecánico",
    definition: "Multi-toothed mechanical interlocking root configuration securing turbine blades into the rotating turbine disk.",
    collocations: ["fir-tree root dovetail", "root crack inspection", "centrifugal retention load"],
    falseFriends: "No es un árbol de navidad; es la geometría de ranuras más resistente de la ingeniería mecánica para soportar 100,000G de fuerza centrífuga.",
    nativeUsage: "Eddy-current non-destructive inspection showed zero fatigue cracks in the turbine disk fir-tree root serrations."
  },
  {
    term: "Compressor Stall Margin",
    ipa: "/kəmˈprɛs.ər stɔːl ˈmɑːr.dʒɪn/",
    es: "Margen de Pérdida de Compresor",
    category: "Aerodinámica de Turbinas",
    definition: "Operating buffer between normal engine airflow conditions and the onset of aerodynamic stall or surge in compressor stages.",
    collocations: ["compressor surge margin", "variable stator vane scheduling", "stall margin degradation"],
    falseFriends: "No es que el motor se apague; es la inversión violenta del flujo de aire supersónico que provoca explosiones y pérdida de empuje.",
    nativeUsage: "Eroded high-pressure compressor blade tips degraded the engines stall margin, triggering a surge warning during takeoff thrust."
  }
];

const mroSocratic = [
  {
    step: 1,
    concept: "Thermal Barrier Coatings & Superalloy Melting Points",
    botQuestion: "Welcome to the FAA Part 145 Powerplant Audit! Explain in English why modern turbofan engines require ceramic Thermal Barrier Coatings (TBC). What is the temperature paradox between combustion gases and the superalloy melting point?",
    requiredKeywords: ["temperature", "combustion", "melting point", "ceramic", "tbc", "superalloy", "cooling", "barrier"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! Operating gas temperatures in modern turbofans exceed 1,700°C, which is well above the melting point of nickel-based superalloys (around 1,350°C). Ceramic Thermal Barrier Coatings combined with internal film cooling maintain metal substrate temperatures below critical failure thresholds.",
    feedbackRetry: "Think about the numbers: combustion gas is 1,700°C, but metal melts at 1,350°C. How does a ceramic barrier and internal cooling air prevent the blade from melting?"
  },
  {
    step: 2,
    concept: "FAA Form 8130-3 Legal Airworthiness Return-to-Service",
    botQuestion: "Why is an FAA Form 8130-3 (or EASA Form 1) mandatory before installing an overhauled engine component on a commercial airliner? What does the certifying statement legally confirm?",
    requiredKeywords: ["faa", "form", "airworthiness", "return to service", "inspection", "compliance", "approved", "traceability", "directives"],
    minKeywords: 3,
    feedbackSuccess: "Outstanding regulatory knowledge! FAA Form 8130-3 is the legal Authorized Release Certificate confirming that work performed complies with all applicable Federal Aviation Regulations, Airworthiness Directives, and OEM specifications, establishing legal traceability.",
    feedbackRetry: "Focus on legal authority and compliance: why cant an airline just use a regular commercial receipt? What must a certified Part 145 inspector state regarding Airworthiness Directives and OEM specifications?"
  }
];

if (LXP_COURSES["aviation-english"] && LXP_COURSES["aviation-english"].modules) {
  const m1 = LXP_COURSES["aviation-english"].modules[0];
  m1.isGoldModel = true;
  m1.title = "Turbofan Hot-Section Inspection, Borescope Diagnostics & FAA Part 145";
  m1.titleES = "Inspección de Sección Caliente de Turbofán, Boroscopía y FAA Parte 145";
  m1.readings[0] = {
    id: "aveng-m1-r1",
    title: "Turbofan Hot-Section Inspection & FAA Part 145",
    duration: "14 min",
    content: mroReading,
    vocabulary: mroLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
  };
  m1.dialogue = mroDialogue;
  m1.lexiconMatrix = mroLexicon;
  m1.socraticChallenges = mroSocratic;
  console.log("✓ Successfully enriched aviation-english (aveng-m1)");
}

// 2. SUPPLY CHAIN
const supplyReading = `
> **International Trade & Logistics Standard**: Governed by the **United States-Mexico-Canada Agreement (USMCA / T-MEC Rules of Origin)**, **C-TPAT (Customs-Trade Partnership Against Terrorism)**, and **WCO SAFE Framework**. Essential for cross-border freight logisticians and customs brokers.

# Cross-Border Customs Telematics, USMCA Rules of Origin & Freight Nearshoring

The acceleration of industrial nearshoring to Mexico has transformed cross-border logistics corridors (e.g., Laredo/Nuevo Laredo, Otay Mesa, Ciudad Juárez) into high-velocity supply chains demanding automated telematics, bonded warehousing, and strict tariff compliance.

## 1. USMCA / T-MEC Regional Value Content (RVC) Calculations

To qualify for duty-free preferential tariff treatment under the USMCA:
1. **Automotive Core Parts Threshold**: Passenger vehicles and core powertrain components must achieve **75% Regional Value Content (RVC)** produced within North America (up from 62.5% under NAFTA).
2. **Calculation Methodologies**:
   - **Net Cost Method**:
     $$\\text{RVC} = \\frac{\\text{Net Cost} - \\text{Value of Non-Originating Materials (VNM)}}{\\text{Net Cost}} \\times 100$$
   - **Transaction Value Method**:
     $$\\text{RVC} = \\frac{\\text{Transaction Value (FOB)} - \\text{VNM}}{\\text{Transaction Value (FOB)}} \\times 100$$
3. **Labor Value Content (LVC)**: 40% to 45% of auto parts value must be produced by manufacturing plants paying production workers a minimum of **$16 USD per hour**. Failure to mathematically prove origin triggers standard Most Favored Nation (MFN) tariffs of 2.5% to 25%.

## 2. Cross-Border Freight Telematics & Automated Commercial Environment (ACE)

Moving freight across the US-Mexico border involves complex intermodal handoffs:
- **Drayage (Transfer) Trucking**: Mexican line-haul trailers transfer cargo to specialized licensed transfer tractors (drayage) to cross international bridges (e.g., World Trade Bridge in Laredo, Texas).
- **Electronic Manifest Filing (ACE & Carta Porte)**:
  - In Mexico, the SAT digital tax authority mandates the **Complemento Carta Porte** linked to an electronic CFDI invoice with dynamic cryptographic QR codes.
  - In the US, U.S. Customs and Border Protection (**CBP**) requires electronic cargo manifests filed via the **Automated Commercial Environment (ACE)** at least 1 hour prior to truck arrival at the border crossing.
- **C-TPAT / FAST Dedicated Lanes**: Certified carriers participate in Free and Secure Trade (FAST) biometric lanes, cutting border transit times from 6 hours to under **45 minutes**.

## 3. Customs Hold Demurrage, Bonded Facilities & Detention Economics

Logistics coordinators must manage real-time exceptions:
- **Customs Holds & Intensive Exams**: If manifest weights differ by over 3%, CBP issues an Intensive Examination hold at a Centralized Examination Station (CES), incurring costly daily **demurrage** (warehouse storage fees) and **detention** (carrier equipment delay charges).
- **In-Bond Logistics**: Bonded carriers transport imported components under customs bond directly to internal bonded warehouses (IMMEX / Maquiladora facilities) without paying import duties until final distribution into the domestic market.

---
> **Key Takeaway**: Nearshoring supply chain links **trade law (USMCA Regional Value Content, LVC calculations)** with **border telematics (ACE electronic manifests, C-TPAT FAST lanes)** and **transport economics (drayage, demurrage, bonded logistics)**.
`;

const supplyDialogue = {
  title: "Laredo World Trade Bridge Customs Clearance Delay & Telematics Tracking",
  titleES: "Retención Aduanal en el Puente de Comercio Mundial en Laredo y Rastreo Telemático",
  scenarioContext: "Chicago, IL (North American Logistics Control Tower) ⇄ Laredo, TX / Nuevo Laredo (Cross-Border Hub). Live Drayage Tracking.",
  characters: [
    { name: "Robert Higgins", role: "VP of North American Supply Chain (Chicago)", avatar: "RH", color: "var(--cyan)" },
    { name: "Lic. Gabriela Ortiz", role: "Director of Cross-Border Operations (Laredo/Nuevo Laredo)", avatar: "GO", color: "var(--gold)" }
  ],
  turns: [
    {
      speaker: "Robert Higgins",
      text: "Gabriela, our telematics dashboard shows Trailer 9042 carrying semiconductor assembly components has been idling for four hours at the World Trade Bridge crossing in Laredo. The Dallas assembly plant has only 8 hours of buffer stock left. Why has the truck not cleared U.S. Customs?",
      translation: "Gabriela, nuestro tablero telemático muestra que el remolque 9042 con componentes de ensamble de semiconductores lleva cuatro horas detenido en el cruce del Puente de Comercio Mundial en Laredo. La planta de ensamble de Dallas solo tiene 8 horas de inventario de seguridad. ¿Por qué el camión no ha liberado Aduanas de EE.UU.?",
      targetTerms: ["telematics dashboard", "idling", "World Trade Bridge", "buffer stock", "U.S. Customs clearance"]
    },
    {
      speaker: "Lic. Gabriela Ortiz",
      text: "Hello Robert. U.S. Customs and Border Protection (CBP) issued a secondary inspection hold. The Mexican supplier's customs broker filed the USMCA certificate of origin under HTS Code 8542.31, but the electronic ACE manifest had a typographical transposition error on the container seal number.",
      translation: "Hola Robert. La Oficina de Aduanas y Protección Fronteriza de EE.UU. (CBP) emitió una retención para inspección secundaria. El agente aduanal del proveedor mexicano tramitó el certificado de origen T-MEC bajo la Fracción Arancelaria 8542.31, pero el manifiesto electrónico ACE tenía un error tipográfico de transposición en el número de sello del contenedor.",
      targetTerms: ["secondary inspection hold", "customs broker", "USMCA certificate of origin", "HTS Code", "ACE manifest"]
    },
    {
      speaker: "Robert Higgins",
      text: "A seal mismatch is an automatic C-TPAT red flag. Can we retransmit the corrected ACE e-manifest immediately to avoid the truck being diverted to an intensive Centralized Examination Station (CES)? We cannot afford demurrage and line downtime.",
      translation: "Una discrepancia en el sello es una bandera roja automática en C-TPAT. ¿Podemos retransmitir el e-manifiesto ACE corregido de inmediato para evitar que el camión sea desviado a una Estación Centralizada de Examen (CES)? No podemos absorber cargos de almacenaje (demurrage) ni paros de línea.",
      targetTerms: ["C-TPAT red flag", "retransmit ACE e-manifest", "Centralized Examination Station (CES)", "demurrage charges"]
    },
    {
      speaker: "Lic. Gabriela Ortiz",
      text: "Already done, Robert. The customs broker transmitted the amended ACE electronic manifest, and CBP confirmed the cryptographic seal match. The drayage tractor has entered the C-TPAT FAST lane. The trailer will cross the international bridge within 25 minutes and arrive in Dallas by 6:00 PM CST.",
      translation: "Ya quedó resuelto, Robert. El agente aduanal transmitió el manifiesto electrónico ACE corregido y CBP confirmó la coincidencia del sello criptográfico. El tractocamión de transferencia (drayage) ya ingresó al carril C-TPAT FAST. El remolque cruzará el puente internacional en 25 minutos y llegará a Dallas a las 6:00 PM CST.",
      targetTerms: ["amended ACE manifest", "drayage tractor", "C-TPAT FAST lane", "cross the international bridge"]
    }
  ],
  contrastTips: [
    {
      school: "The truck is stopped at the border by police.",
      native: "U.S. Customs issued an administrative hold on the shipment due to a container seal mismatch on the electronic ACE cargo manifest.",
      explanation: "En la escuela se dice 'police stopped the truck', pero en logística internacional se especifica la autoridad aduanal (CBP) y el motivo documental exacto (ACE manifest, seal discrepancy)."
    },
    {
      school: "Special tax paper for Mexico, Canada and USA.",
      native: "USMCA preferential Certificate of Origin validating Regional Value Content (RVC) under the Net Cost method.",
      explanation: "Se debe especificar la regla de origen formal de USMCA/T-MEC y la fórmula matemática de Valor de Contenido Regional (RVC)."
    }
  ]
};

const supplyLexicon = [
  {
    term: "Regional Value Content (RVC)",
    ipa: "/ˈriː.dʒən.əl ˈvæl.juː ˈkɑːn.tɛnt/",
    es: "Valor de Contenido Regional (VCR / RVC)",
    category: "Regla de Origen Arancelaria",
    definition: "Percentage of a product's value produced within the USMCA (T-MEC) trade zone required to qualify for zero-tariff preferential treatment.",
    collocations: ["Net Cost method", "75% automotive RVC threshold", "non-originating materials (VNM)"],
    falseFriends: "No es un simple cálculo de costos locales; es una auditoría jurídica de procedencia de cada tornillo y componente.",
    nativeUsage: "The EV battery pack achieved 78% Regional Value Content, comfortably exceeding the USMCA 75% threshold."
  },
  {
    term: "Automated Commercial Environment (ACE)",
    ipa: "/ˈɔː.təˌmeɪ.tɪd kəˈmɜːr.ʃəl ɪnˈvaɪ.rən.mənt/",
    es: "Sistema Automatizado de Comercio (ACE CBP)",
    category: "Plataforma de Aduanas de EE.UU.",
    definition: "Primary electronic data interchange portal through which international trade documents and electronic manifests are filed with U.S. Customs.",
    collocations: ["ACE e-manifest filing", "ACE electronic release", "customs entry summary"],
    falseFriends: "No es una palabra común de 'as'; son las siglas de la plataforma centralizada obligatoria de la aduana estadounidense.",
    nativeUsage: "Carriers must submit the electronic cargo manifest via the ACE portal at least one hour before the truck reaches the border."
  },
  {
    term: "Customs-Trade Partnership Against Terrorism (C-TPAT)",
    ipa: "/ˈsiː.tiːˌpæt/",
    es: "Certificación de Seguridad en Comercio (C-TPAT)",
    category: "Seguridad en Cadena de Suministro",
    definition: "Voluntary supply chain security program led by U.S. CBP that provides expedited border processing for certified low-risk traders.",
    collocations: ["C-TPAT certified carrier", "C-TPAT security audit", "Tier 3 C-TPAT partner"],
    falseFriends: "No es un trámite aduanero común; audita candados, cercas perimetrales, antecedentes de choferes y sellos ISO 17712.",
    nativeUsage: "Achieving C-TPAT certification allows our logistics fleet to utilize the dedicated FAST lanes at the Laredo border crossing."
  },
  {
    term: "Drayage Trucking",
    ipa: "/ˈdreɪ.ɪdʒ ˈtrʌk.ɪŋ/",
    es: "Transporte de Transferencia / Drayage",
    category: "Operación de Transporte",
    definition: "Short-distance trucking service that moves shipping containers or trailers between international border ports, railyards, and local warehouses.",
    collocations: ["cross-border drayage tractor", "drayage interchange agreement", "drayage terminal congestion"],
    falseFriends: "No es transporte de larga distancia (over-the-road); es exclusivamente el tractor de cruce que traslada el remolque por el puente internacional.",
    nativeUsage: "The cross-border drayage driver picked up the trailer in Nuevo Laredo and delivered it across the World Trade Bridge to Laredo, Texas."
  },
  {
    term: "Harmonized Tariff Schedule (HTS Code)",
    ipa: "/ˈhɑːr.mə.naɪzd ˈtær.ɪf ˈskɛdʒ.uːl/",
    es: "Fracción Arancelaria / Código HTS",
    category: "Clasificación Aduanal",
    definition: "Standardized 10-digit numerical classification system used by customs authorities worldwide to assess import duties and trade statistics.",
    collocations: ["10-digit HTS classification", "tariff duty rate", "misclassified HTS heading"],
    falseFriends: "Un error de un dígito en el código HTS puede desatar multas de cientos de miles de dólares por evasión arancelaria involuntaria.",
    nativeUsage: "Electric vehicle motors are classified under HTS Code 8501.53, qualifying for duty-free entry under USMCA rules of origin."
  },
  {
    term: "Demurrage / Detention",
    ipa: "/dɪˈmɜːr.ɪdʒ / dɪˈtɛn.ʃən/",
    es: "Cargos de Almacenaje (Demurrage) y Demora (Detention)",
    category: "Costos de Transporte",
    definition: "Penalties charged for delays: Demurrage applies when cargo sits in a port or terminal past free time; Detention applies when carrier equipment is held too long.",
    collocations: ["accrue demurrage charges", "free time window (48 hours)", "detention fee per diem"],
    falseFriends: "Demurrage es por retención del espacio en terminal; Detention es por retener la caja de tráiler o contenedor del transportista.",
    nativeUsage: "The customs hold cost the importer $850 per day in terminal demurrage fees until the paper audit was resolved."
  },
  {
    term: "Bill of Lading (BOL)",
    ipa: "/bɪl əv ˈleɪ.dɪŋ/",
    es: "Conocimiento de Embarque / Carta de Porte (BOL)",
    category: "Documento Legal",
    definition: "Legal contract between the shipper and carrier detailing the type, quantity, and destination of goods being transported.",
    collocations: ["clean bill of lading", "electronic bill of lading (e-BOL)", "BOL consignee address"],
    falseFriends: "No es una 'cuenta' de cobro; es el título de propiedad y contrato formal de transporte de la mercancía en tránsito.",
    nativeUsage: "The warehouse receiver verified that the serial numbers on the pallet matched the line items on the Bill of Lading."
  },
  {
    term: "Bonded Warehouse (In-Bond Logistics)",
    ipa: "/ˈbɑːn.dɪd ˈwɛər.haʊs/",
    es: "Recinto Fiscalizado / Almacén de Depósito Fiscal",
    category: "Régimen Aduanero",
    definition: "Secured customs-controlled facility where imported goods can be stored, manipulated, or manufactured without paying duties until final entry.",
    collocations: ["in-bond transit movement", "bonded warehouse inventory", "customs bonded carrier"],
    falseFriends: "No es un almacén 'unido' físicamente; está respaldado por una fianza legal financiera (bond) ante la autoridad aduanal.",
    nativeUsage: "Components are stored duty-free in the bonded warehouse and taxes are only assessed when goods leave for domestic assembly lines."
  },
  {
    term: "Centralized Examination Station (CES)",
    ipa: "/ˈsɛn.trə.laɪzd ɪɡˌzæm.əˈneɪ.ʃən/",
    es: "Estación Centralizada de Examen Aduanal (CES)",
    category: "Inspección Aduanal",
    definition: "Privately operated facility bonded by CBP where commercial cargo is unloaded and physically inspected for contraband or trade compliance.",
    collocations: ["intensive CES inspection", "CES unloading fee", "CBP secondary exam order"],
    falseFriends: "No es un centro de exámenes escolares; es el patio aduanal donde vacían completamente el tráiler para auditoría física profunda.",
    nativeUsage: "When the X-ray scanner flagged an anomalous density in the pallet, CBP ordered the container transferred to the CES for devanning."
  },
  {
    term: "Supply Chain Telematics",
    ipa: "/səˈplaɪ tʃeɪn ˌtɛl.əˈmæt.ɪks/",
    es: "Telemática en Cadena de Suministro",
    category: "Tecnología de Rastreo",
    definition: "Integration of telecommunications and GPS sensors providing real-time location, temperature, shock, and door-seal status of freight.",
    collocations: ["IoT asset tracker", "geofence boundary alert", "cold-chain temperature log"],
    falseFriends: "No es solo 'llamar al chofer'; es telemetría satelital en tiempo real transmitida por sensores IoT instalados en el remolque.",
    nativeUsage: "Telematics sensors alerted logistics dispatch that the refrigerated container door was opened outside the authorized geofence."
  },
  {
    term: "Free on Board (FOB)",
    ipa: "/friː ɑːn bɔːrd/",
    es: "Franco a Bordo (Incoterm FOB)",
    category: "Términos de Comercio Internacional",
    definition: "Incoterm designating that seller assumes all risks and costs up to the point of loading onto the transport vessel/vehicle, where ownership transfers.",
    collocations: ["FOB origin vs FOB destination", "Incoterms 2020 rules", "FOB invoice value"],
    falseFriends: "FOB no significa que el transporte sea 'gratis' (free); significa que el vendedor está libre de responsabilidad una vez cargada la mercancía.",
    nativeUsage: "Under FOB Nuevo Laredo terms, the buyer assumes freight insurance and transit risk once the drayage truck crosses the bridge."
  },
  {
    term: "Pedimento Aduanal",
    ipa: "/ˌpɛd.ɪˈmɛn.toʊ ˌɑː.dwəˈnɑːl/",
    es: "Pedimento Aduanal de Importación/Exportación",
    category: "Documento Aduanal Mexicano",
    definition: "Official Mexican fiscal document certified by a customs broker demonstrating the legal entry or exit of goods through Mexican customs.",
    collocations: ["pedimento consolidado", "validación electrónica de pedimento", "anexo 22 del pedimento"],
    falseFriends: "En inglés técnico de nearshoring se mantiene el término formal 'Pedimento' o se traduce como 'Mexican Customs Declaration Document'.",
    nativeUsage: "The Mexican customs auditor verified that the serial numbers matched the definitive import pedimento in the corporate archives."
  }
];

const supplySocratic = [
  {
    step: 1,
    concept: "USMCA Regional Value Content Net Cost Method",
    botQuestion: "Welcome to the Nearshoring Trade Compliance Audit! Explain in English how Regional Value Content (RVC) is calculated under the USMCA Net Cost method. Why must automotive core parts achieve 75% RVC to qualify for duty-free status?",
    requiredKeywords: ["rvc", "net cost", "non-originating", "formula", "usmca", "origin", "tariff", "percentage", "75%"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! Under the USMCA Net Cost method, RVC = [(Net Cost - Value of Non-Originating Materials) / Net Cost] * 100. Core automotive parts must achieve at least 75% RVC to ensure that high-value manufacturing and Tier-1 supply chains remain anchored in North America.",
    feedbackRetry: "Remember the formula: Net Cost minus Value of Non-Originating Materials (VNM) divided by Net Cost. Why does the USMCA mandate 75% RVC for duty-free entry?"
  },
  {
    step: 2,
    concept: "Drayage Trucking vs Over-the-Road Freight",
    botQuestion: "In cross-border trade between Mexico and the United States, what is the operational purpose of a Drayage (transfer) truck? Why don't long-haul Mexican line tractors drive directly to Chicago without swapping?",
    requiredKeywords: ["drayage", "transfer", "border", "bridge", "interstate", "regulations", "tractor", "line-haul", "customs"],
    minKeywords: 3,
    feedbackSuccess: "Outstanding logistics explanation! Cross-border drayage trucks specialize strictly in moving trailers across international border bridges. Regulatory differences, insurance limits, cabotage laws, and bridge queuing times make dedicated drayage transfers far more cost-effective than tying up long-haul line-haul tractors.",
    feedbackRetry: "Think about cross-border operations: border bridge waits can last hours, and federal trucking regulations differ between countries. What is the role of the short-distance transfer tractor?"
  }
];

if (LXP_COURSES["industrial-operations"] && LXP_COURSES["industrial-operations"].modules) {
  const m1 = LXP_COURSES["industrial-operations"].modules[0];
  m1.isGoldModel = true;
  m1.title = "Cross-Border Customs Telematics, USMCA Rules of Origin & Freight Nearshoring";
  m1.titleES = "Telemática Aduanal Transfronteriza, Reglas T-MEC y Logística Nearshoring";
  m1.readings[0] = {
    id: "sc-m1-r1",
    title: "Cross-Border Customs Telematics & USMCA Rules of Origin",
    duration: "14 min",
    content: supplyReading,
    vocabulary: supplyLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
  };
  m1.dialogue = supplyDialogue;
  m1.lexiconMatrix = supplyLexicon;
  m1.socraticChallenges = supplySocratic;
  console.log("✓ Successfully enriched industrial-operations (sc-m1)");
}

// WRITE BACK
const updatedHeader = `/**
 * stemOS LXP Course Content Database
 * ====================================
 * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks
 * 
 * Organizado en 4 Categorías Maestras y 26 Tracks Modulares:
 *  - 🔵 TECHNOLOGY (6 Tracks)
 *  - 🟢 ENGINEERING & INDUSTRY (8 Tracks)
 *  - 🟣 SCIENCE & FUTURE TECHNOLOGY (6 Tracks)
 *  - 🟠 AVIATION, CAREER & PROFESSIONAL ENGLISH (6 Tracks)
 * 
 * Target Level: A2+ / B1 CEFR Multi-Nivel
 * Incluye Modelos Gold ESP (Lectura de especificación pura, Diálogo real de planta, Matriz de colocaciones y Evaluador Socrático Feynman).
 */

var LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};

var LXP_COURSES = ${JSON.stringify(LXP_COURSES, null, 4)};

if (typeof window !== "undefined") {
    window.LXP_CATEGORIES = LXP_CATEGORIES;
    window.LXP_COURSES = LXP_COURSES;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        LXP_CATEGORIES: LXP_CATEGORIES,
        LXP_COURSES: LXP_COURSES
    };
}
`;

fs.writeFileSync(coursesPath, updatedHeader, "utf8");
console.log("Master database updated with 6 rich Gold ESP Tracks!");
