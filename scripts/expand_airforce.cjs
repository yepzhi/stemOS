// scripts/expand_airforce.cjs — Air Force Aerospace English (af-m2 through af-m5)
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const coursesPath = path.resolve(__dirname, '../content/courses.js');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(fs.readFileSync(coursesPath, 'utf8'), sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;
console.log('Expanding Air Force Aerospace...');

const afM2 = { id: "af-m2", title: "Military Avionics: HUD, AESA Radar & EW Suites", titleES: "Aviónica Militar: HUD, Radar AESA y Suites de Guerra Electrónica", icon: "fa-solid fa-satellite-dish", readings: [{ id: "af-m2-r1", title: "Head-Up Display Systems, AESA Radar Technology & Electronic Warfare Architecture", duration: "13 min", content: `
> **Industry Alignment**: Aligned with **MIL-STD-1553B (Digital Data Bus)**, **NATO STANAG 3910 (Avionics Data Bus)**, and **IEEE 1394b (FireWire for Avionics)**.

# Head-Up Display Systems, AESA Radar Technology & Electronic Warfare Architecture

Modern tactical aircraft integrate multiple avionics subsystems into a unified sensor fusion architecture. The pilot receives a composite tactical picture through the **Head-Up Display (HUD)**, **Helmet-Mounted Display (HMD)**, and **Multi-Function Displays (MFDs)**, while the aircraft's **Active Electronically Scanned Array (AESA)** radar and **Electronic Warfare (EW)** suite operate autonomously.

## 1. Head-Up Display (HUD) & Helmet-Mounted Display Systems

The **HUD** projects critical flight and weapons data onto a transparent combiner glass in the pilot's forward field of view, enabling the pilot to maintain eyes-out situational awareness:
- **Flight symbology**: Pitch ladder, bank angle, airspeed tape, altitude tape, heading tape, angle of attack (AoA) bracket, flight path marker (velocity vector).
- **Weapons symbology**: Target designation diamond, continuously computed impact point (CCIP) for air-to-ground, gun cross/pipper, missile seeker circle.
- **Wide-Field-of-View (WFOV) HUDs**: Modern HUDs (BAE Systems, Elbit) provide 25°×18° field of view with >10,000 cd/m² luminance for visibility in direct sunlight.

**Helmet-Mounted Display Systems (HMDS)** like the F-35's AN/PAS-46 project symbology directly onto the pilot's visor, enabling off-boresight target cueing—the pilot simply looks at a target and designates it, regardless of aircraft heading.

## 2. AESA (Active Electronically Scanned Array) Radar

AESA radar represents a generational leap from mechanically scanned and passive electronically scanned arrays:
- **Architecture**: Hundreds to thousands of individual **Transmit/Receive (T/R) modules**, each containing its own signal generator and phase shifter. Each element can independently control beam direction, frequency, and waveform.
- **Beam Agility**: Electronic beam steering enables simultaneous multi-function operation: tracking multiple air targets, performing ground mapping (SAR—Synthetic Aperture Radar), guiding semi-active missiles, and conducting electronic attack—all interleaved at microsecond intervals.
- **Low Probability of Intercept (LPI)**: AESA radars spread energy across wide bandwidths and rapidly change frequencies (frequency hopping), making them extremely difficult for enemy radar warning receivers to detect and classify.
- **Operational Range**: Modern AESA radars (AN/APG-81 on F-35, AN/APG-82(V)1 on F-15EX) detect fighter-sized targets beyond 150 nautical miles while tracking over 20 targets simultaneously.

## 3. Electronic Warfare (EW) Suite

The EW suite provides the aircraft with self-protection and offensive electronic attack capabilities:
- **Radar Warning Receiver (RWR)**: Detects, identifies, and geolocates hostile radar emissions. Classifies threats by comparing received signal parameters (frequency, pulse repetition frequency, scan pattern) against a mission data file (threat library).
- **Electronic Countermeasures (ECM/Jamming)**: Transmits electromagnetic energy to deceive or disrupt enemy radar. Techniques include noise jamming (overpowering the radar's receiver), deceptive jamming (creating false targets), and range-gate pull-off (RGPO—gradually shifting the apparent target range).
- **Chaff & Flare Dispensers**: Chaff (metallic strips) creates radar-reflective clouds to break missile radar lock. Flares (pyrotechnic decoys) seduce infrared-guided missiles away from the aircraft's heat signature.
- **Directed Infrared Countermeasures (DIRCM)**: Laser-based systems that track and dazzle the seekers of incoming IR missiles.

---
> **Key Takeaway**: Military avionics integrate **HUD/HMD symbology** for eyes-out tactical awareness, **AESA radar** with beam-agile multi-function capability, and **EW suites** (RWR, ECM, chaff/flare, DIRCM) providing layered self-protection in contested electromagnetic environments.
`,
    vocabulary: [
      { en: "Head-Up Display (HUD)", es: "Pantalla de Visualización Frontal (HUD)", definition: "Transparent display projecting flight and weapons data into the pilot's forward field of view without requiring them to look down at instruments.", ipa: "/hʌd/", collocations: ["HUD symbology", "flight path marker", "combiner glass"] },
      { en: "AESA Radar", es: "Radar AESA (Barrido Electrónico Activo)", definition: "Radar with hundreds of independent transmit/receive modules enabling agile electronic beam steering and simultaneous multi-function operation.", ipa: "/ˌeɪ.iː.ɛs.ˈeɪ/", collocations: ["T/R modules", "beam agility", "low probability of intercept"] },
      { en: "Radar Warning Receiver (RWR)", es: "Receptor de Alerta Radar (RWR)", definition: "Passive sensor detecting and classifying hostile radar emissions to warn the pilot of threats.", ipa: "/ˌɑːr.dʌb.əl.juːˈɑːr/", collocations: ["RWR threat display", "threat library", "hostile emitter classification"] },
      { en: "Electronic Countermeasures (ECM)", es: "Contramedidas Electrónicas (ECM)", definition: "Techniques using electromagnetic energy to deceive, disrupt, or deny enemy radar and communications systems.", ipa: "/ˌiː.siːˈɛm/", collocations: ["noise jamming", "deceptive ECM", "self-protection jamming"] },
      { en: "Low Probability of Intercept (LPI)", es: "Baja Probabilidad de Interceptación (LPI)", definition: "Radar emission characteristic making detection by enemy receivers extremely difficult through spread spectrum and frequency agility.", ipa: "/ˌɛl.piːˈaɪ/", collocations: ["LPI waveform", "frequency hopping", "covert radar operation"] },
      { en: "Synthetic Aperture Radar (SAR)", es: "Radar de Apertura Sintética (SAR)", definition: "Radar imaging technique creating high-resolution ground maps by synthesizing a large antenna aperture from aircraft motion.", ipa: "/ˌɛs.eɪˈɑːr/", collocations: ["SAR ground mapping", "SAR imagery resolution", "strip-map SAR mode"] }
    ],
    questions: [
      { q: "What is the primary advantage of AESA radar over mechanically scanned radar?", options: ["It is cheaper to manufacture", "Electronic beam steering enables simultaneous multi-function operation at microsecond intervals", "It requires no electrical power", "It only works in clear weather"], answer: 1 },
      { q: "What does a Radar Warning Receiver (RWR) do?", options: ["Transmits jamming signals", "Detects, identifies, and geolocates hostile radar emissions", "Navigates the aircraft", "Controls the landing gear"], answer: 1 },
      { q: "What is the purpose of chaff dispensed from a military aircraft?", options: ["To improve radar performance", "To create radar-reflective clouds that break enemy missile radar lock", "To fuel the engines", "To communicate with ground stations"], answer: 1 },
      { q: "What does 'off-boresight target cueing' mean with a Helmet-Mounted Display?", options: ["Aiming straight ahead only", "The pilot can designate targets simply by looking at them, regardless of aircraft heading", "A GPS navigation technique", "A maintenance procedure"], answer: 1 }
    ]
  }]
};

const afM3 = { id: "af-m3", title: "Tactical Data Networks: Link 16 & C4ISR Architecture", titleES: "Redes Tácticas de Datos: Link 16 y Arquitectura C4ISR", icon: "fa-solid fa-network-wired", readings: [{ id: "af-m3-r1", title: "Link 16 TADIL-J, Network-Centric Warfare & C4ISR Integration", duration: "12 min", content: `
> **Industry Alignment**: Aligned with **NATO STANAG 5516 (Link 16)**, **MIL-STD-6016 (TADIL-J Message Standard)**, and **U.S. DoD Joint Publication 6-0 (Joint Communications System)**.

# Link 16 TADIL-J, Network-Centric Warfare & C4ISR Integration

Modern military operations depend on secure, jam-resistant data networks that share real-time tactical information between aircraft, ships, ground forces, and command centers. **Link 16** is the primary tactical data link used by NATO and allied forces.

## 1. Link 16 Architecture

Link 16 (also designated **TADIL-J / Tactical Digital Information Link - J**) operates on the L-band (960–1215 MHz) using **frequency hopping spread spectrum (FHSS)** across 51 pseudo-randomly selected frequencies, changing frequency every 13 microseconds. This provides inherent resistance to jamming and interception.

- **JTIDS/MIDS Terminal**: Each platform carries a Joint Tactical Information Distribution System / Multifunctional Information Distribution System terminal that transmits and receives **J-series messages** in fixed time slots assigned by a **Network Design** document.
- **Time Division Multiple Access (TDMA)**: The Link 16 network divides time into 12.8-minute **epochs**, each containing 98,304 individual time slots. Each participant is assigned specific slots for transmission, preventing collisions.
- **Participant Groups**: Platforms are organized into **Net Participation Groups (NPGs)** based on function: Surveillance, Fighter-to-Fighter, Air Control, Weapons Coordination.

## 2. J-Series Messages

Link 16 transmits standardized message types:
- **J2.2 (Air Track)**: Position, altitude, speed, heading, and identification (friend/foe/unknown) of an airborne contact.
- **J3.2 (Surface Track)**: Ship or ground vehicle track data.
- **J7.0 (Command)**: Weapons assignment and engagement orders.
- **J9.0 (Electronic Warfare)**: Emitter reports and jamming coordination.
- **J12.6 (Mission Assignment)**: Targeting data and coordinates.

## 3. C4ISR Architecture

**C4ISR** stands for **Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance**. It represents the integrated architecture enabling military decision-making:

- **Command & Control (C2)**: The authority structure and decision-making processes through which commanders direct forces.
- **Communications**: The data transport layer (Link 16, SATCOM, HF/UHF radios, cyber networks).
- **Computers**: Processing nodes that fuse sensor data, maintain the Common Operational Picture (COP), and run decision-support algorithms.
- **Intelligence**: Analysis of collected information to produce actionable intelligence products.
- **Surveillance & Reconnaissance (ISR)**: Sensors that collect information: AESA radar, electro-optical/infrared (EO/IR) cameras, signals intelligence (SIGINT) receivers, unmanned aerial systems (UAS).

## 4. Network-Centric Warfare (NCW)

The fundamental concept is that **shared situational awareness** dramatically improves combat effectiveness:
- Every platform contributes sensor data to the network.
- A composite **Common Operational Picture (COP)** is generated and distributed to all participants.
- Any "shooter" can engage any target detected by any "sensor" on the network, enabling **distributed kill chains**.

---
> **Key Takeaway**: **Link 16** provides NATO forces with a **jam-resistant, TDMA-based tactical data link** sharing real-time track data through J-series messages. Integrated within the **C4ISR architecture**, it enables **network-centric warfare** where shared situational awareness creates decisive information superiority.
`,
    vocabulary: [
      { en: "Link 16 (TADIL-J)", es: "Link 16 (TADIL-J)", definition: "NATO tactical data link operating on L-band with frequency hopping, enabling secure real-time information exchange between military platforms.", ipa: "/lɪŋk sɪksˈtiːn/", collocations: ["Link 16 time slot", "MIDS terminal", "J-series message"] },
      { en: "C4ISR", es: "C4ISR (Mando, Control, Comunicaciones, Computadoras, Inteligencia, Vigilancia y Reconocimiento)", definition: "Integrated military architecture encompassing command, control, communications, computers, intelligence, surveillance, and reconnaissance.", ipa: "/ˌsiː.fɔːr.aɪ.ɛs.ˈɑːr/", collocations: ["C4ISR integration", "joint C4ISR", "sensor-to-shooter"] },
      { en: "Common Operational Picture (COP)", es: "Imagen Operacional Común (COP)", definition: "Shared display of tactical information fusing all sensor data into a single unified view for all participants.", ipa: "/kɒp/", collocations: ["maintain the COP", "real-time COP update", "situational awareness via COP"] },
      { en: "Frequency Hopping Spread Spectrum (FHSS)", es: "Espectro Ensanchado por Salto de Frecuencia (FHSS)", definition: "Transmission technique rapidly changing carrier frequency among 51 pseudo-random channels to resist jamming and interception.", ipa: "/ˈfriː.kwən.si ˈhɒp.ɪŋ/", collocations: ["FHSS anti-jam", "pseudo-random hopping", "spread spectrum signal"] },
      { en: "Time Division Multiple Access (TDMA)", es: "Acceso Múltiple por División de Tiempo (TDMA)", definition: "Network access method dividing time into discrete slots assigned to participants to prevent transmission collisions.", ipa: "/ˌtiː.diː.ɛm.ˈeɪ/", collocations: ["TDMA time slot", "epoch structure", "slot assignment"] },
      { en: "Network-Centric Warfare (NCW)", es: "Guerra Centrada en Red (NCW)", definition: "Doctrine where shared network information creates superior situational awareness and enables distributed engagement.", ipa: "/ˈnɛt.wɜːrk ˈsɛn.trɪk/", collocations: ["distributed kill chain", "sensor-to-shooter link", "information superiority"] }
    ],
    questions: [
      { q: "How does Link 16 resist enemy jamming?", options: ["By transmitting at maximum power only", "Through frequency hopping spread spectrum across 51 frequencies, changing every 13 microseconds", "By using unencrypted signals", "By operating only at night"], answer: 1 },
      { q: "What does a J2.2 message in Link 16 contain?", options: ["Weather data", "Air track data: position, altitude, speed, heading, and identification of airborne contacts", "Maintenance schedules", "Fuel status reports"], answer: 1 },
      { q: "What does the 'I' in C4ISR stand for?", options: ["Internet", "Intelligence", "Infrastructure", "Integration"], answer: 1 },
      { q: "In Network-Centric Warfare, what is a 'distributed kill chain'?", options: ["A physical chain on the aircraft", "Any shooter can engage any target detected by any sensor on the network", "A maintenance procedure", "A supply chain concept"], answer: 1 }
    ]
  }]
};

const afM4 = { id: "af-m4", title: "NATO STANAG Compliance & Multinational Interoperability", titleES: "Cumplimiento STANAG OTAN e Interoperabilidad Multinacional", icon: "fa-solid fa-handshake", readings: [{ id: "af-m4-r1", title: "STANAG Framework, Interoperability Levels & Coalition Operations", duration: "11 min", content: `
> **Industry Alignment**: Aligned with **NATO STANAG 6001 (Language Proficiency)**, **STANAG 4586 (UAV Interoperability)**, and **Allied Joint Publication AJP-6 (C3 Doctrine)**.

# STANAG Framework, Interoperability Levels & Coalition Operations

NATO's **Standardization Agreements (STANAGs)** are the foundation of multinational military interoperability. They establish common procedures, equipment interfaces, and technical standards ensuring that forces from 31+ member nations can operate together seamlessly.

## 1. The STANAG System

A STANAG is a normative document establishing an agreement among member nations to adopt the same or similar military equipment, ammunition, supplies, and operational procedures. The process:
1. **Ratification**: Each nation reviews and officially accepts the STANAG.
2. **Implementation**: Nations modify their national doctrine, training, and equipment to comply.
3. **Verification**: Through exercises and evaluations, NATO assesses actual interoperability levels.

Key STANAGs for aerospace operations:
- **STANAG 6001**: Language proficiency standardized profile. Level 3 (Professional) across listening, speaking, reading, and writing is required for most NATO staff positions.
- **STANAG 4586**: Interoperability standard for unmanned aerial systems (UAS), defining common data link interfaces and control architectures.
- **STANAG 4609**: Digital motion imagery standards for full-motion video (FMV) from ISR platforms.
- **STANAG 5516**: Link 16 technical implementation standard.

## 2. Interoperability Levels (NIOL)

NATO defines interoperability across four levels:
- **Level 1 (De-Confliction)**: Minimal interaction; forces avoid interfering with each other's operations through geographic or temporal separation.
- **Level 2 (Coordination)**: Forces share information and synchronize activities but maintain separate command structures.
- **Level 3 (Collaboration)**: Shared planning, common procedures, and integrated logistics. Joint staff work together daily.
- **Level 4 (Full Integration)**: Seamless combined operations under unified command, using shared systems, networks, and doctrine as if they were a single force.

## 3. Language Interoperability

English is the designated working language of NATO. **STANAG 6001** rates military personnel on a 0-5 scale:
- **Level 0 (No Proficiency)**: Cannot function in the language.
- **Level 1 (Survival)**: Elementary needs only.
- **Level 2 (Functional)**: Can handle routine social and professional situations.
- **Level 3 (Professional)**: Can participate effectively in most formal and informal conversations on practical, social, and professional topics.
- **Level 4 (Expert)**: Fluent, precise, and culturally attuned.
- **Level 5 (Highly Articulate Native)**: Equivalent to a well-educated native speaker.

Most NATO billets require SLP (Standardized Language Profile) 3-3-3-3 across all four skills.

## 4. Combined Air Operations Center (CAOC)

The **CAOC** is the central command facility for planning and executing NATO air operations:
- **Air Tasking Order (ATO)**: The master document assigning specific missions, targets, and time-on-target to all participating aircraft from all contributing nations.
- **Special Instructions (SPINS)**: Supplementary tactical directives covering rules of engagement (ROE), communications plans, identification procedures, and airspace coordination.
- **Battle Rhythm**: The daily cycle of intelligence briefings, planning sessions, ATO production, and mission execution monitoring.

---
> **Key Takeaway**: NATO **STANAGs** standardize everything from language proficiency (6001) to data links (5516) and UAV interfaces (4586). **Interoperability levels** progress from de-confliction to full integration, enabled by English as the working language and centralized air operations through the **CAOC** and its **Air Tasking Order**.
`,
    vocabulary: [
      { en: "STANAG (Standardization Agreement)", es: "STANAG (Acuerdo de Estandarización)", definition: "NATO normative document establishing common procedures, equipment interfaces, and technical standards for multinational interoperability.", ipa: "/ˈstæn.æɡ/", collocations: ["ratify a STANAG", "STANAG compliance", "implement STANAG 6001"] },
      { en: "Interoperability", es: "Interoperabilidad", definition: "The ability of military forces from different nations to operate together effectively using compatible systems, procedures, and doctrine.", ipa: "/ˌɪn.tər.ɒp.ər.əˈbɪl.ɪ.ti/", collocations: ["technical interoperability", "interoperability testing", "coalition interoperability"] },
      { en: "Air Tasking Order (ATO)", es: "Orden de Tarea Aérea (ATO)", definition: "Master planning document assigning specific air missions, targets, and timing to all participating aircraft in a theater of operations.", ipa: "/ˌeɪ.tiːˈoʊ/", collocations: ["publish the ATO", "ATO cycle", "mission assignment in ATO"] },
      { en: "Rules of Engagement (ROE)", es: "Reglas de Enfrentamiento (ROE)", definition: "Directives defining the circumstances, conditions, and limitations under which military force may be applied.", ipa: "/ruːlz ɒv/", collocations: ["ROE restrictions", "weapons release authority", "escalation of force ROE"] },
      { en: "Combined Air Operations Center (CAOC)", es: "Centro de Operaciones Aéreas Combinadas (CAOC)", definition: "NATO facility responsible for planning, directing, and coordinating all air operations in a theater.", ipa: "/keɪ.ɒk/", collocations: ["CAOC battle rhythm", "CAOC mission planning", "Joint Force Air Component"] },
      { en: "Standardized Language Profile (SLP)", es: "Perfil Lingüístico Estandarizado (SLP)", definition: "NATO STANAG 6001 rating expressing an individual's proficiency in listening, speaking, reading, and writing on a 0-5 scale.", ipa: "/ˌɛs.ɛlˈpiː/", collocations: ["SLP 3-3-3-3", "language proficiency testing", "NATO language requirement"] }
    ],
    questions: [
      { q: "What is a STANAG?", options: ["A type of aircraft", "A NATO standardization agreement establishing common procedures and standards for interoperability", "A fuel type", "A weather code"], answer: 1 },
      { q: "What STANAG 6001 level is typically required for NATO staff positions?", options: ["Level 1 (Survival)", "Level 3 (Professional) across all four skills", "Level 5 (Native)", "Level 0 (No Proficiency)"], answer: 1 },
      { q: "What is the Air Tasking Order (ATO)?", options: ["A maintenance manual", "The master document assigning air missions, targets, and timing to all participating aircraft", "A training schedule", "A fuel requisition form"], answer: 1 },
      { q: "At NATO Interoperability Level 4, what is achieved?", options: ["Minimal de-confliction only", "Seamless combined operations under unified command as a single force", "Information sharing only", "Separate operations with no interaction"], answer: 1 }
    ]
  }]
};

const afM5 = { id: "af-m5", title: "Defense Aerospace MRO, Airframe Depot Maintenance & AS9110", titleES: "MRO Aeroespacial de Defensa, Mantenimiento de Aeronaves y AS9110", icon: "fa-solid fa-wrench", readings: [{ id: "af-m5-r1", title: "Military MRO Operations, Depot-Level Maintenance & AS9110C Quality Systems", duration: "12 min", content: `
> **Industry Alignment**: Aligned with **AS9110C (Quality Management Systems for Aviation Maintenance)**, **MIL-STD-1530 (Aircraft Structural Integrity Program)**, and **NAVAIR/AFMC Depot Maintenance Standards**.

# Military MRO Operations, Depot-Level Maintenance & AS9110C Quality Systems

**Maintenance, Repair, and Overhaul (MRO)** of military aircraft is a complex engineering discipline ensuring that combat aircraft maintain structural integrity, airworthiness, and mission capability throughout their operational lifespan (often 30–50 years).

## 1. Maintenance Levels

Military aviation maintenance is organized into three tiers:

- **Organizational Level (O-Level)**: Flight line maintenance performed by squadron personnel. Includes pre-flight/post-flight inspections, servicing (fuel, oil, hydraulic fluid), minor repairs (tire changes, filter replacements), and fault isolation using Built-In Test Equipment (BITE).
- **Intermediate Level (I-Level)**: Specialized maintenance at the wing or base level. Includes component repair (avionics LRU bench testing), engine module removal/installation, and non-destructive inspection (NDI) of structural elements.
- **Depot Level (D-Level)**: The most comprehensive maintenance, performed at major facilities (Ogden ALC, Warner Robins ALC, or contractor depots). Includes complete airframe teardown, structural inspection, corrosion treatment, systems overhaul, technology insertion (avionics upgrades), and life extension modifications.

## 2. Programmed Depot Maintenance (PDM)

A **PDM** event is a scheduled depot visit occurring at fixed intervals (typically every 4–8 years or after a set number of flight hours):
1. **Induction**: Aircraft arrives and undergoes wash rack cleaning, full documentation review, and initial deficiency assessment.
2. **Disassembly**: Panels, fairings, access doors, and components are removed for inspection. The airframe is stripped to structural members.
3. **Inspection**: **Non-Destructive Inspection (NDI)** methods—eddy current, ultrasonic, magnetic particle, radiographic—examine critical structure for fatigue cracks, corrosion, and disbonds.
4. **Repair & Modification**: Structural repairs per engineering disposition. Modification compliance (Time Compliance Technical Orders—TCTOs) installs upgrades and safety modifications.
5. **Reassembly & Test**: Components reinstalled, systems tested, functional check flights performed.
6. **Delivery**: Aircraft returns to operational unit with refreshed structural life.

## 3. AS9110C Quality Management

**AS9110C** is the aerospace quality management standard specifically for maintenance organizations (equivalent to AS9100D for manufacturing):
- **Process Approach**: All maintenance activities are documented as controlled processes with defined inputs, outputs, resources, and performance metrics.
- **Human Factors in Maintenance (HFIM)**: Addresses the "Dirty Dozen" human factors causing maintenance errors: lack of communication, complacency, lack of knowledge, distraction, lack of teamwork, fatigue, lack of resources, pressure, lack of assertiveness, stress, lack of awareness, and norms.
- **Foreign Object Damage/Debris (FOD) Prevention**: Rigorous tool control, hardware accountability, and workspace cleanliness programs to prevent FOD from causing catastrophic in-flight failures.
- **Configuration Management**: Ensures that every aircraft's actual configuration (installed parts, software versions, modification status) matches the master engineering records.

## 4. Corrosion Control & Structural Life Management

- **Aircraft Structural Integrity Program (ASIP)**: MIL-STD-1530 requires tracking individual aircraft fatigue damage through flight-by-flight load monitoring, periodic inspection, and analytical life predictions.
- **Corrosion Prevention and Control Program (CPCP)**: Systematic inspection, treatment (chromate conversion coatings, primer application), and documentation of all corrosion findings.
- **Damage Tolerance Analysis**: Engineering methodology proving that if a crack exists, it will be detected by scheduled inspections before growing to critical length that would cause structural failure.

---
> **Key Takeaway**: Military MRO operates across **three maintenance levels** (O/I/D-Level) with **Programmed Depot Maintenance** events performing complete structural inspection using **NDI methods**. Quality is governed by **AS9110C**, addressing human factors, FOD prevention, and configuration management to maintain combat aircraft safely for decades of service.
`,
    vocabulary: [
      { en: "MRO (Maintenance, Repair & Overhaul)", es: "MRO (Mantenimiento, Reparación y Revisión General)", definition: "The complete lifecycle of maintaining aircraft airworthiness through scheduled inspections, component repair, and depot-level overhaul.", ipa: "/ˌɛm.ɑːr.ˈoʊ/", collocations: ["MRO facility", "depot-level MRO", "MRO turnaround time"] },
      { en: "Non-Destructive Inspection (NDI)", es: "Inspección No Destructiva (NDI/END)", definition: "Examination techniques (eddy current, ultrasonic, magnetic particle) that detect defects without damaging the component.", ipa: "/nɒn dɪˈstrʌk.tɪv/", collocations: ["NDI methods", "eddy current inspection", "ultrasonic NDI"] },
      { en: "Programmed Depot Maintenance (PDM)", es: "Mantenimiento Programado de Depósito (PDM)", definition: "Scheduled comprehensive maintenance event at a depot facility involving airframe teardown, inspection, repair, and modification.", ipa: "/ˌpiː.diːˈɛm/", collocations: ["PDM induction", "PDM cycle interval", "depot turnaround"] },
      { en: "Foreign Object Damage/Debris (FOD)", es: "Daño/Escombros por Objetos Extraños (FOD)", definition: "Damage or debris from loose objects (tools, hardware, materials) that can cause catastrophic failure if ingested or left in an aircraft.", ipa: "/fɒd/", collocations: ["FOD prevention program", "FOD walk-down", "tool accountability"] },
      { en: "AS9110C", es: "AS9110C (Norma de Calidad para Mantenimiento Aeroespacial)", definition: "Aerospace quality management standard for maintenance organizations, addressing human factors, configuration management, and process control.", ipa: "/ˌeɪ.ɛs.naɪn.wʌn.wʌn.ˈoʊ/", collocations: ["AS9110 audit", "quality management system", "maintenance process control"] },
      { en: "Damage Tolerance", es: "Tolerancia al Daño", definition: "Engineering methodology proving that cracks will be detected by inspection before reaching critical size that causes structural failure.", ipa: "/ˈdæm.ɪdʒ ˈtɒl.ər.əns/", collocations: ["damage tolerance analysis", "crack growth prediction", "inspection interval determination"] }
    ],
    questions: [
      { q: "What level of maintenance involves complete airframe teardown and structural inspection?", options: ["Organizational Level (O-Level)", "Intermediate Level (I-Level)", "Depot Level (D-Level)", "Pre-flight inspection"], answer: 2 },
      { q: "What does FOD stand for and why is it critical?", options: ["Flight Operations Document — for planning", "Foreign Object Damage/Debris — loose objects can cause catastrophic in-flight failure", "Fuel Oil Delivery — for logistics", "Forward Operating Depot — a base type"], answer: 1 },
      { q: "What standard governs quality management specifically for aerospace maintenance organizations?", options: ["ISO 9001", "AS9100D", "AS9110C", "MIL-STD-1553"], answer: 2 },
      { q: "What is the purpose of Damage Tolerance Analysis?", options: ["To make aircraft fly faster", "To prove cracks will be detected by inspection before reaching critical failure size", "To reduce fuel consumption", "To improve radar performance"], answer: 1 }
    ]
  }]
};

// ─── APPLY ─────────────────────────────────────
const course = LXP_COURSES["airforce-aerospace"];
for (const mod of [afM2, afM3, afM4, afM5]) {
  const idx = course.modules.findIndex(m => m.id === mod.id);
  if (idx !== -1) { course.modules[idx] = mod; console.log(`  ✅ ${mod.id}`); }
  else { course.modules.push(mod); console.log(`  ➕ ${mod.id}`); }
}

const header = `/**\n * stemOS LXP Course Content Database\n * ====================================\n * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks\n */\n\nvar LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};\n\nvar LXP_COURSES = ${JSON.stringify(LXP_COURSES, null, 4)};\n\nif (typeof window !== 'undefined') {\n    window.LXP_CATEGORIES = LXP_CATEGORIES;\n    window.LXP_COURSES = LXP_COURSES;\n}\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { LXP_CATEGORIES, LXP_COURSES };\n}\n`;
fs.writeFileSync(coursesPath, header, 'utf8');
console.log(`\n✅ Air Force Aerospace expanded. File: ${(fs.statSync(coursesPath).size/1024).toFixed(1)} KB`);
