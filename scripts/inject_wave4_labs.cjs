const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '..', 'content/courses.js');
let content = fs.readFileSync(coursesPath, 'utf8');

const ctx = { window: {}, module: { exports: {} } };
vm.runInNewContext(content, ctx);
const courses = ctx.LXP_COURSES || ctx.module.exports;

// 1. Materials Science & Nanotech: nano-m1-r2
const matTrack = courses['materials-nanotech'];
const matM1 = matTrack.modules.find(m => m.id === 'nano-m1');
if (matM1 && !matM1.readings.some(r => r.id === 'nano-m1-r2')) {
  matM1.readings.push({
    id: 'nano-m1-r2',
    title: 'Applied Lab: Scanning Electron Microscopy (SEM), Energy-Dispersive X-ray Spectroscopy (EDS) & Nanomaterials',
    duration: '15 min',
    content: `
> **Nanomaterials Metrology Standard**: Aligned with **ISO/TS 80004 (Nanotechnologies - Vocabulary)** and **ASTM E1508 (Standard Guide for Quantitative Analysis by Energy-Dispersive Spectroscopy)**. Prepares materials scientists and semiconductor failure analysis engineers to calibrate field-emission SEMs and map elemental composition via characteristic X-rays.

# Applied Laboratory: Scanning Electron Microscopy (SEM), EDS & Nanomaterials

Characterizing nanomaterials (graphene nanoplatelets, carbon nanotubes, and sub-10nm quantum dots) requires resolving structural morphology beyond the Abbe diffraction limit of optical microscopy ($d = \\lambda / (2\\,\\text{NA}) \\approx 200\\,\\text{nm}$). High-resolution Field Emission Scanning Electron Microscopy (FE-SEM) combined with Energy-Dispersive X-ray Spectroscopy (EDS) enables nanometer-scale imaging and simultaneous qualitative/quantitative microanalysis.

## 1. Electron Beam-Specimen Interactions & Signals
When an accelerated focused primary electron beam ($E_0 = 1\\text{ to }30\\,\\text{keV}$) strikes a specimen, it forms a teardrop-shaped **Interaction Volume**:
1. **Secondary Electrons (SE)**: Low-energy electrons ($< 50\\,\\text{eV}$) generated near the top surface (depth $< 10\\,\\text{nm}$) by inelastic scattering. Detected by an Everhart-Thornley or in-lens detector, SE yields high-resolution topographic imagery with crisp edge contrast.
2. **Backscattered Electrons (BSE)**: High-energy beam electrons elastically deflected by atomic nuclei. The backscatter coefficient ($\\eta$) scales monotonically with the atomic number ($Z$), providing atomic-number composition contrast (Z-contrast) where heavier elements (e.g. gold, tungsten) appear brighter than lighter elements (silicon, carbon).

## 2. Energy-Dispersive X-ray Spectroscopy (EDS)
When a primary beam electron ejects an inner-shell core electron (e.g., K-shell), an outer-shell electron drops into the vacancy, releasing a characteristic X-ray photon with energy equal to the atomic orbital difference:
$$\\Delta E = E_L - E_K$$
- **Silicon Drift Detectors (SDD)**: Thermoelectrically cooled SDDs capture X-ray photons at count rates exceeding 1,000,000 counts per second.
- **Moseley's Law**: Because characteristic X-ray energies are unique to each element ($E \\propto (Z - 1)^2$), EDS produces elemental distribution maps revealing micro-segregation, alloy inclusions, and thin-film boundary diffusion.

## 3. Sample Preparation & Conductive Sputter Coating
Non-conductive polymer or ceramic nanomaterials accumulate negative electrostatic charge from incoming electrons, causing severe beam deflection, image distortion, and thermal degradation:
- **DC Magnetron Sputter Coating**: Applies an ultra-thin (2 to 5 nm) continuous film of gold, platinum, or carbon under argon plasma to provide an electrical discharge path to ground.
- **Low-Voltage FE-SEM (Beam Deceleration)**: Decelerating the primary beam immediately prior to specimen impact ($E_0 < 1.0\\,\\text{kV}$) establishes unity electron yield ($\\sigma + \\eta = 1$), enabling zero-charge imaging of uncoated delicate biological or polymer nanofibers.

---
> **Key Takeaway**: Advanced materials failure analysis relies on **FE-SEM topographic imaging, atomic Z-contrast backscattering, and quantitative EDS characteristic X-ray mapping** to validate nanoscale structures.
`,
    vocabulary: [
      {
        en: 'Secondary Electrons (SE)',
        es: 'Electrones Secundarios (SE)',
        definition: 'Low-energy electrons ejected from conduction or valence bands near the specimen surface, providing high-resolution topographic surface imaging.',
        ipa: '/ˈsɛk.ənˌdɛr.i ɪˈlɛk.trɑːnz/',
        collocations: ['Everhart-Thornley SE detector', 'high-resolution SE topography', 'surface escape depth']
      },
      {
        en: 'Backscattered Electrons (BSE)',
        es: 'Electrones Retrodispersados (BSE)',
        definition: 'Primary beam electrons elastically scattered back out of the sample by atomic nuclei, revealing elemental composition contrast (Z-contrast).',
        ipa: '/ˈbækˌskæt.ərd ɪˈlɛk.trɑːnz/',
        collocations: ['atomic number Z-contrast', 'BSE compositional imaging', 'elastic electron scattering']
      },
      {
        en: 'Energy-Dispersive X-ray Spectroscopy (EDS)',
        es: 'Espectroscopía de Rayos X por Energía Dispersiva (EDS)',
        definition: 'Analytical technique used for the elemental identification and chemical quantitative characterization of a microscopic sample.',
        ipa: '/ˈɛn.ər.dʒi dɪˈspɜːr.sɪv ˈɛks.reɪ spɛkˈtrɑː.skə.pi/',
        collocations: ['silicon drift detector (SDD)', 'characteristic X-ray spectrum', 'elemental EDS compositional mapping']
      },
      {
        en: 'Sputter Coating',
        es: 'Recubrimiento por Pulverización Catódica (Sputtering)',
        definition: 'Process of depositing a nanometer-thin conductive metal layer onto non-conductive specimens to prevent electrostatic charging under electron beams.',
        ipa: '/ˈspʌt.ər ˈkoʊ.tɪŋ/',
        collocations: ['magnetron sputter coater', 'platinum conductive film', 'eliminate electrostatic charging']
      }
    ],
    questions: [
      {
        q: 'Why do heavier elements (e.g. tungsten or gold) appear noticeably brighter than lighter elements (e.g. silicon or carbon) in Backscattered Electron (BSE) SEM imaging?',
        options: [
          'Because heavier elements reflect more sunlight',
          'Because the elastic backscattering coefficient (eta) increases with atomic number (Z), causing heavier nuclei to deflect a higher fraction of primary electrons into the BSE detector',
          'Because heavy elements are naturally radioactive and glow',
          'Because light elements absorb all electrical power'
        ],
        answer: 1,
        explanation: 'The probability of Rutherford elastic scattering is proportional to the square of atomic number (Z^2). Nuclei with higher positive charge deflect more primary beam electrons back out of the specimen, producing a higher BSE signal and brighter pixels that correlate with higher atomic mass.'
      },
      {
        q: 'What physical process generates the characteristic X-rays detected by Energy-Dispersive X-ray Spectroscopy (EDS)?',
        options: [
          'Frictional heat generated when the sample is cut with a diamond saw',
          'The relaxation of an outer-shell electron into an inner-shell vacancy created by primary beam ionization, emitting an X-ray photon with energy unique to that element',
          'Nuclear fusion inside the microscope column',
          'The evaporation of liquid nitrogen'
        ],
        answer: 1,
        explanation: 'When the energetic electron beam dislodges an inner core electron (e.g., K-shell), an electron from a higher energy shell (L or M) falls to occupy the vacancy. The discrete energy released as an X-ray photon is precisely equal to the quantum energy gap between the shells, acting as an elemental fingerprint.'
      },
      {
        q: 'Why must non-conductive specimens (such as ceramic or biological nanofibers) be coated with a nanometer-thin conductive film prior to standard SEM examination?',
        options: [
          'To make the sample heavier so it doesn\'t float away in the vacuum chamber',
          'To provide an electrical discharge path to ground, preventing trapped negative electron charges from deflecting the electron beam and causing severe image distortion',
          'To paint the sample so it shows up in color',
          'To prevent the sample from melting in water'
        ],
        answer: 1,
        explanation: 'Non-conductive materials cannot conduct away incoming electrons, causing negative charge to accumulate on the surface. This electrostatic charging field repels and deflects the primary electron beam, leading to severe astigmatism, abnormal brightness bursts, and image drift.'
      },
      {
        q: 'Which electron signal provides the highest spatial resolution for imaging surface topography in an FE-SEM, and why?',
        options: [
          'Secondary Electrons (SE), because their low kinetic energy (<50 eV) ensures that only electrons excited within the top 5 to 10 nanometers of the surface can escape without being reabsorbed',
          'High-energy gamma rays',
          'Infrared heat waves',
          'Visible red laser light'
        ],
        answer: 0,
        explanation: 'Because secondary electrons have low kinetic energy (<50 eV), they suffer from very short inelastic mean free paths; any SE created deeper than 5-10nm is reabsorbed by the material. Therefore, detected SEs emerge only from the immediate beam impact area, yielding nanometer topographic resolution.'
      }
    ]
  });
  console.log('[UPDATED] Injected nano-m1-r2');
}

// 2. Environmental Sustainability: env-m1-r2
const envTrack = courses['environmental-sustainability'];
const envM1 = envTrack.modules.find(m => m.id === 'env-m1');
if (envM1 && !envM1.readings.some(r => r.id === 'env-m1-r2')) {
  envM1.readings.push({
    id: 'env-m1-r2',
    title: 'Applied Lab: GHG Protocol Scope 1/2/3 Accounting, ISO 14064 & Zero Liquid Discharge (ZLD)',
    duration: '15 min',
    content: `
> **Environmental Governance & Sustainability Standard**: Aligned with **GHG Protocol Corporate Accounting and Reporting Standard**, **ISO 14064-1 (Greenhouse Gases)**, and **EPA Effluent Guidelines (Zero Liquid Discharge)**. Prepares sustainability engineers and plant environmental managers to audit industrial carbon footprints and design closed-loop wastewater reclamation systems.

# Applied Laboratory: GHG Protocol Scope 1/2/3 Accounting, ISO 14064 & ZLD

Global supply chains, automotive OEMs, and semiconductor fabs in northern Mexico are increasingly subject to Corporate Sustainability Due Diligence Directives (CSDDD) and carbon border adjustment mechanisms (CBAM). Quantifying emissions requires rigorous boundary accounting across Scope 1, Scope 2, and Scope 3 footprints paired with circular resource conservation.

## 1. Greenhouse Gas (GHG) Protocol Scopes
Corporate emissions are partitioned into three distinct operational scopes:
1. **Scope 1 (Direct Emissions)**: Greenhouse gases released directly from sources owned or controlled by the facility, including natural gas combustion in boilers, diesel backup generators, and fugitive refrigerant leaks (HFCs):
   $$\\text{Emissions}_{\\text{GHG}} = \\text{Fuel Consumed} \\times \\text{Emission Factor} \\times \\text{GWP}$$
2. **Scope 2 (Indirect Emissions from Purchased Energy)**: Emissions generated off-site during the generation of electricity, steam, heating, or cooling purchased by the company. Calculated via:
   - **Location-Based Method**: Uses the regional electrical grid average emission factor (e.g. CFE national grid emission factor in Mexico $\\approx 0.423\\,\\text{tCO}_2\\text{e/MWh}$).
   - **Market-Based Method**: Accounts for contractual renewable energy instruments (Clean Energy Certificates - CELs, Power Purchase Agreements - PPAs).
3. **Scope 3 (Value Chain Emissions)**: Upstream and downstream emissions across 15 categories, including raw material procurement, shipping freight, employee commuting, and end-of-life product disposal. Scope 3 often represents 80% to 90% of total corporate impact.

## 2. Zero Liquid Discharge (ZLD) Systems
Water scarcity in northern desert industrial corridors (Sonora, Nuevo León, Chihuahua) necessitates **Zero Liquid Discharge (ZLD)** to purify and recycle 95% to 99% of plant industrial wastewater:
- **Pre-Treatment & Multi-Media Filtration**: Removes suspended solids, heavy metal precipitates, and biological matter.
- **High-Recovery Reverse Osmosis (RO)**: High-pressure spiral-wound polyamide membranes concentrate dissolved salts up to 70,000 to 100,000 ppm Total Dissolved Solids (TDS).
- **Mechanical Vapor Recompression (MVR) Crystallizer**: Evaporates remaining brine under vacuum; clean distilled water is condensed back to the manufacturing loop while dry salt cake is harvested for solid industrial disposal.

---
> **Key Takeaway**: Industrial sustainability engineering balances **GHG Protocol Scope 1/2/3 accounting compliance with closed-loop circular systems like Zero Liquid Discharge (ZLD)** to satisfy ESG audits and global export directives.
`,
    vocabulary: [
      {
        en: 'Scope 1/2/3 Emissions',
        es: 'Emisiones de Alcance 1, 2 y 3 (GHG Protocol)',
        definition: 'Standard categorization of greenhouse gas emissions separating direct on-site combustion (Scope 1), purchased electricity (Scope 2), and value chain activities (Scope 3).',
        ipa: '/skoʊp wʌn tuː θriː ɪˈmɪʃ.ənz/',
        collocations: ['audit Scope 3 value chain', 'Scope 2 market-based accounting', 'Scope 1 direct stationary combustion']
      },
      {
        en: 'Zero Liquid Discharge (ZLD)',
        es: 'Descarga Cero de Líquidos (ZLD)',
        definition: 'Water treatment process that purifies and recycles all wastewater produced by a facility, leaving only dry solid residue with zero liquid effluent.',
        ipa: '/ˈzɪr.oʊ ˈlɪk.wɪd ˈdɪs.tʃɑːrdʒ/',
        collocations: ['implement ZLD evaporator', 'closed-loop ZLD water recovery', 'brine crystallizer system']
      },
      {
        en: 'Carbon Border Adjustment Mechanism (CBAM)',
        es: 'Mecanismo de Ajuste en Frontera por Carbono (CBAM)',
        definition: 'Tariff tool that equalizes the price of carbon paid for domestic European production with that paid for imported carbon-intensive goods.',
        ipa: '/ˈkɑːr.bən ˈbɔːr.dər əˈdʒʌst.mənt ˈmɛk.ə.nɪz.əm/',
        collocations: ['CBAM reporting compliance', 'embedded carbon tariff', 'decarbonize export supply chain']
      },
      {
        en: 'Global Warming Potential (GWP)',
        es: 'Potencial de Calentamiento Global (GWP)',
        definition: 'Metric measuring how much energy the emissions of 1 ton of a gas will absorb over a given period of time, relative to 1 ton of carbon dioxide.',
        ipa: '/ˈɡloʊ.bəl ˈwɔːr.mɪŋ pəˈtɛn.ʃəl/',
        collocations: ['calculate CO2 equivalent using GWP', 'refrigerant high-GWP fugitive leakage', '100-year GWP horizon']
      }
    ],
    questions: [
      {
        q: 'Under the GHG Protocol Corporate Standard, what constitutes a Scope 2 indirect carbon emission?',
        options: [
          'Gasoline purchased by employees for personal vacation road trips',
          'Greenhouse gases generated off-site during the generation of purchased electricity, steam, heating, or cooling consumed by the reporting company',
          'Carbon dioxide exhaled by workers during meetings',
          'Methane released by volcanic eruptions'
        ],
        answer: 1,
        explanation: 'Scope 2 accounts for indirect emissions associated with the generation of purchased or acquired energy (electricity, steam, heating, cooling) consumed within the facility\'s operational boundaries. Scope 1 covers direct on-site combustion, while Scope 3 covers broader value chain activities.'
      },
      {
        q: 'What is the primary technological difference between Location-Based and Market-Based Scope 2 emission accounting?',
        options: [
          'Location-based accounting is free, while market-based requires paying money to the bank',
          'Location-based reflects average emissions intensity of the local grid where energy is consumed, while market-based reflects emissions from specific contractual agreements (e.g. PPAs or renewable energy certificates)',
          'Location-based only applies to islands',
          'Market-based only applies to grocery stores'
        ],
        answer: 1,
        explanation: 'Location-based accounting uses average emission factors for the physical geographic electrical grid feeding the facility. Market-based accounting allows companies that purchase certified renewable energy (via Green Tariffs, PPAs, or EACs/CELs) to claim the lower contractual emission factor.'
      },
      {
        q: 'What is the definitive physical goal of a Zero Liquid Discharge (ZLD) industrial wastewater plant?',
        options: [
          'To pump wastewater into deep underground injection wells',
          'To recover and recycle 95% to 99% of wastewater as pure distilled condensate, converting all remaining dissolved salts into dry solid cake with zero liquid discharge into municipal sewers or rivers',
          'To let water evaporate outdoors in open uncovered ponds',
          'To dilute wastewater with tap water before dumping'
        ],
        answer: 1,
        explanation: 'ZLD systems eliminate liquid effluent discharge entirely. By combining high-recovery reverse osmosis with thermal evaporators and crystallizers, the facility recovers clean water back into production while reducing contaminants to dry, solid salt cake that can be safely disposed of in licensed landfills.'
      },
      {
        q: 'Why are Scope 3 emissions typically the most challenging yet critical component of corporate carbon footprint accounting?',
        options: [
          'Because Scope 3 emissions are invisible to radar',
          'Because they occur across upstream suppliers and downstream customers outside the company\'s direct physical control, requiring complex supply chain data exchange and lifecycle modeling',
          'Because Scope 3 emissions only occur in winter',
          'Because the law forbids companies from measuring Scope 3'
        ],
        answer: 1,
        explanation: 'Scope 3 encompasses 15 upstream and downstream categories across the value chain (such as raw material extraction, purchased components, freight logistics, and consumer product use). Gathering primary supplier data and calculating accurate lifecycle emissions requires extensive coordination beyond the factory gate.'
      }
    ]
  });
  console.log('[UPDATED] Injected env-m1-r2');
}

// 3. Healthcare Technology: health-m1-r2
const healthTrack = courses['healthcare-tech'];
const healthM1 = healthTrack.modules.find(m => m.id === 'health-m1');
if (healthM1 && !healthM1.readings.some(r => r.id === 'health-m1-r2')) {
  healthM1.readings.push({
    id: 'health-m1-r2',
    title: 'Applied Lab: Medical Device Design Controls (DHF/DMR/DHR), ISO 14971 Risk & FDA 510(k)',
    duration: '15 min',
    content: `
> **Medical Device Regulatory Standard**: Aligned with **FDA 21 CFR Part 820 (Quality System Regulation / QMSR)**, **ISO 13485:2016 (Medical Devices - Quality Management Systems)**, and **ISO 14971:2019 (Application of Risk Management to Medical Devices)**. Prepares biomedical regulatory affairs and manufacturing quality engineers to maintain Design History Files and establish Substantial Equivalence.

# Applied Laboratory: Medical Device Design Controls, ISO 14971 & FDA 510(k)

Medical device manufacturing centers (such as Baja California and Chihuahua medical hubs) produce life-sustaining cardiovascular catheters, orthopedic implants, and patient telemetry monitors. Bringing devices to market in the US and globally requires complying with strict Design Control requirements and formal risk management frameworks.

## 1. The Design Controls Architecture (21 CFR 820.30)
Design controls establish a closed-loop engineering traceability matrix:
1. **User Needs $\\to$ Design Inputs**: Transforming clinical requirements (e.g. "Catheter must withstand vascular insertion pressure") into measurable engineering specifications (e.g. "Burst pressure $> 35\\,\\text{psi}$, outer diameter $< 1.33\\,\\text{mm}$").
2. **Design Verification vs. Design Validation**:
   - **Verification ("Did we build the device right?")**: Laboratory testing proving that design outputs satisfy design inputs (tensile pull tests, electrical dielectric testing per IEC 60601-1).
   - **Validation ("Did we build the right device?")**: Clinical simulation, user studies, and usability engineering (IEC 62366) proving the finished device functions safely and effectively under real-world clinical use.

## 2. The Core Quality Records Trilogy: DHF, DMR, and DHR
Regulatory auditors evaluate three critical historical repositories:
- **Design History File (DHF)**: The complete compilation of records demonstrating that the device was developed in accordance with approved design plans and regulatory controls.
- **Device Master Record (DMR)**: The comprehensive "recipe" and manufacturing instructions required to produce the device (CAD drawings, bills of materials, cleanroom assembly procedures, inspection test protocols).
- **Device History Record (DHR)**: The specific production batch traveler proving that an individual serialized lot was manufactured according to the DMR (autoclave sterilization records, lot numbers, operator sign-offs, and final QA releases).

## 3. ISO 14971 Risk Management & FDA 510(k) Substantial Equivalence
1. **Failure Modes, Effects, and Criticality Analysis (FMECA)**:
   $$\\text{Risk Priority} = \\text{Severity} \\times \\text{Probability of Occurrence}$$
   For biomedical devices, risks must be reduced **As Low As Possible (AFAP)** regardless of financial cost through inherent safe design, protective barriers (e.g. dual redundant check valves), and user warnings.
2. **FDA 510(k) Premarket Notification**: For Class II medical devices, proving that the new device is **Substantially Equivalent (SE)** to a legally marketed predicate device in intended use, technological characteristics, and safety profile without requiring costly multi-year clinical trials.

---
> **Key Takeaway**: Biomedical engineering compliance demands maintaining **unbroken traceability between DHF design controls, DMR manufacturing specifications, and DHR lot traceability** while executing ISO 14971 risk mitigations.
`,
    vocabulary: [
      {
        en: 'Design History File (DHF)',
        es: 'Expediente de Diseño del Dispositivo (DHF)',
        definition: 'Compilation of records that describes the design history of a finished medical device, demonstrating compliance with design controls.',
        ipa: '/dɪˈzaɪn ˈhɪs.tər.i faɪl/',
        collocations: ['audit DHF design verification', 'trace design inputs to outputs in DHF', 'DHF design freeze']
      },
      {
        en: 'Device Master Record (DMR)',
        es: 'Registro Maestro del Dispositivo (DMR)',
        definition: 'Compilation of records containing the procedures and specifications for a finished medical device (the manufacturing recipe).',
        ipa: '/dɪˈvaɪs ˈmæs.tər ˈrɛk.ərd/',
        collocations: ['maintain DMR manufacturing specs', 'DMR bill of materials', 'release DMR revision']
      },
      {
        en: 'Device History Record (DHR)',
        es: 'Registro Histórico de Producción del Lote (DHR)',
        definition: 'Compilation of records containing the production history of an individual manufactured batch, confirming adherence to the DMR.',
        ipa: '/dɪˈvaɪs ˈhɪs.tər.i ˈrɛk.ərd/',
        collocations: ['sign off cleanroom lot DHR', 'DHR sterilization release certificate', 'trace defective serial in DHR']
      },
      {
        en: 'Substantial Equivalence (SE)',
        es: 'Equivalencia Sustancial (SE en FDA 510k)',
        definition: 'Regulatory finding by the FDA that a new device is as safe and effective as a legally marketed predicate device.',
        ipa: '/səbˈstæn.ʃəl ɪˈkwɪv.ə.ləns/',
        collocations: ['demonstrate substantial equivalence to predicate', 'FDA 510(k) premarket notification clearance', 'substantially equivalent performance data']
      }
    ],
    questions: [
      {
        q: 'What is the fundamental difference between Design Verification and Design Validation in medical device engineering?',
        options: [
          'Verification is done on paper, while validation is done in a hospital',
          'Verification proves design outputs meet design inputs ("Did we build the device right?"), while validation proves the device satisfies user clinical needs in real use conditions ("Did we build the right device?")',
          'There is no difference; they are exact synonyms',
          'Validation is only performed for toys'
        ],
        answer: 1,
        explanation: 'Design Verification confirms through objective evidence (bench testing, tensile stress tests, electrical insulation tests) that the engineering output matches specifications. Design Validation confirms through clinical evaluation or simulated use studies that the device functions safely and intuitively in the hands of intended clinicians.'
      },
      {
        q: 'In the medical device quality records trilogy, what specific document contains the actual production history and sterilization release of a manufactured batch of pacemakers?',
        options: [
          'The Design History File (DHF)',
          'The Device History Record (DHR)',
          'The company employee handbook',
          'The sales catalog'
        ],
        answer: 1,
        explanation: 'The Device History Record (DHR) contains the actual lot traveler records, serial numbers, date of manufacture, quantity released, operator inspection initials, and sterilization validation documentation proving that the specific batch was produced in strict compliance with the Device Master Record (DMR).'
      },
      {
        q: 'What primary regulatory hurdle must a Class II medical device manufacturer satisfy to obtain FDA 510(k) market clearance in the United States?',
        options: [
          'Demonstrating Substantial Equivalence (SE) to a legally marketed predicate device regarding intended use and technological safety characteristics',
          'Passing a written test administered to the CEO',
          'Donating 100 devices to medical charities',
          'Manufacturing the device exclusively inside the White House'
        ],
        answer: 0,
        explanation: 'Under section 510(k) of the Food, Drug and Cosmetic Act, the applicant must demonstrate that their proposed device is Substantially Equivalent (SE) to an already cleared "predicate device" in intended use, performance, and risk profile, avoiding the need for a full Pre-Market Approval (PMA) clinical trial.'
      },
      {
        q: 'Under ISO 14971:2019, what is the mandatory priority hierarchy for implementing risk control measures in medical device design?',
        options: [
          '1. Print warning stickers, 2. Lower the price, 3. Ignore minor risks',
          '1. Inherently safe design and manufacture, 2. Protective measures in the device or manufacturing process (e.g. interlocks), 3. Information for safety (labels and user warnings)',
          '1. Blame the doctor, 2. Buy insurance, 3. Recall the product',
          '1. Stop production immediately'
        ],
        answer: 1,
        explanation: 'ISO 14971 mandates that risk control must first eliminate hazards through inherently safe design (e.g., non-toxic materials, physical geometry). If risks remain, secondary protection must be implemented (alarms, physical barriers). Only as a last resort are labeling instructions and user manual warnings permitted.'
      }
    ]
  });
  console.log('[UPDATED] Injected health-m1-r2');
}

// 4. Aviation English: aveng-m1-r2
const avTrack = courses['aviation-english'];
const avM1 = avTrack.modules.find(m => m.id === 'aveng-m1');
if (avM1 && !avM1.readings.some(r => r.id === 'aveng-m1-r2')) {
  avM1.readings.push({
    id: 'aveng-m1-r2',
    title: 'Applied Lab: ICAO Annex 10 Radiotelephony, Non-Standard Phraseology & CFIT Prevention',
    duration: '15 min',
    content: `
> **International Aviation Operations Standard**: Aligned with **ICAO Annex 10 (Aeronautical Telecommunications)**, **ICAO Doc 9432 (Manual of Radiotelephony)**, and **ICAO Doc 9835 (Language Proficiency Requirements - Level 4 Operational)**. Prepares airline flight crews, avionics engineers, and air traffic controllers to execute standardized pilot-controller communications and resolve airborne emergencies.

# Applied Laboratory: ICAO Annex 10 Radiotelephony & CFIT Prevention

Aviation history proves that linguistic ambiguity is fatal. The deadliest accident in aviation history (Tenerife airport disaster, 1977) and numerous Controlled Flight Into Terrain (CFIT) accidents occurred not due to mechanical failures, but due to non-standard radiotelephony, colloquial idioms, and truncated readbacks. The International Civil Aviation Organization (ICAO) mandates standardized phraseology and Level 4 minimum operational English proficiency.

## 1. Fundamental Rules of ICAO Radiotelephony
To guarantee crisp acoustic clarity over high-frequency (HF) and very high frequency (VHF) amplitude modulation (AM) channels:
1. **Prohibition of Conversational English**: Phrases like "Yeah, okay", "Take off", or "We are rolling" are strictly forbidden. The word **"CLEARED"** is reserved exclusively for air traffic control departure or landing clearances (e.g., "Cleared for takeoff", "Cleared to land"). In all other taxi and holding communications, the terms "DEPARTURE" or "HOLD SHORT" must be used.
2. **Mandatory Full Readback Items**:
   - Runway in use, heading clearances, speed instructions.
   - Altitude and flight level assignments, altimeter settings (QNH / QNE).
   - Transponder squawk codes (e.g., "Squawk 7700 for emergency").
   - Runway hold short instructions (e.g., "Hold short of runway 05 Right").

## 2. Emergency Escalation Protocols: MAYDAY vs. PAN-PAN
Aeronautical radiotelephony establishes strict emergency declarations:
- **MAYDAY (Repeated 3 Times)**: Distressed condition where an aircraft is threatened by serious and/or imminent danger and requires immediate assistance (dual engine flameout, uncontained in-flight cargo fire, rapid depressurization).
- **PAN-PAN (Repeated 3 Times)**: Urgency condition concerning the safety of an aircraft or person on board that does not require immediate distress intervention (medical emergency on board, single hydraulic loop failure with redundant backup intact, fuel advisory state).

## 3. Controlled Flight Into Terrain (CFIT) & TAWS/EGPWS Callouts
Terrain Awareness and Warning Systems (TAWS / EGPWS) monitor radar altimeters, GPS coordinates, and terrain elevation databases:
- **Standardized Cockpit Escape Maneuver**:
  When the automated synthesized warning announces:
  \`\`\`
  "TERRAIN, TERRAIN! PULL UP! PULL UP!"
  \`\`\`
  Pilot Flying must immediately disengage autopilot, advance throttles to maximum takeoff/go-around (TO/GA) thrust, rotate to initial pitch-up limit, and retract speedbrakes. The pilot must transmit to ATC:
  \`\`\`
  "[Callsign], PULL UP, GOING AROUND!"
  \`\`\`
  ATC instructions cannot countermand an active EGPWS pull-up warning.

---
> **Key Takeaway**: Aeronautical safety relies on **strict ICAO standard phraseology, complete verbatim readback discipline, and unhesitating response to EGPWS/TAWS terrain warnings** to prevent catastrophic CFIT accidents.
`,
    vocabulary: [
      {
        en: 'Controlled Flight Into Terrain (CFIT)',
        es: 'Vuelo Controlado Contra el Terreno (CFIT)',
        definition: 'Accident in which an airworthy aircraft under complete pilot control is unintentionally flown into terrain, obstacles, or water without prior awareness.',
        ipa: '/kənˈtroʊld flaɪt ˈɪntuː təˈreɪn/',
        collocations: ['prevent CFIT accident', 'EGPWS terrain alert warning', 'maintain situational awareness']
      },
      {
        en: 'Readback Discipline',
        es: 'Disciplina de Colación (Readback)',
        definition: 'Mandatory practice where the receiving pilot repeats back critical instructions verbatim to ensure mutual understanding with ATC.',
        ipa: '/ˈriːd.bæk ˈdɪs.ə.plɪn/',
        collocations: ['mandatory full readback', 'hearback error detection', 'read back runway hold short instruction']
      },
      {
        en: 'ICAO Standard Phraseology',
        es: 'Fraseología Estándar de la OACI',
        definition: 'Carefully curated lexicon and communication rules defined by ICAO to eliminate ambiguity in international aviation radio exchanges.',
        ipa: '/aɪˈkeɪoʊ ˈstændərd ˌfreɪziˈɑːlədʒi/',
        collocations: ['adhere to ICAO phraseology', 'eliminate colloquial radio speech', 'ICAO Level 4 operational English']
      },
      {
        en: 'Mayday / Pan-Pan',
        es: 'Llamadas de Socorro (Mayday) y Urgencia (Pan-Pan)',
        definition: 'International radiotelephony emergency signals indicating immediate life-threatening distress (Mayday) or urgent safety threat (Pan-Pan).',
        ipa: '/ˈmeɪ.deɪ / pæn pæn/',
        collocations: ['declare a Mayday emergency', 'squawk 7700 emergency transponder', 'transmit Pan-Pan urgency signal']
      }
    ],
    questions: [
      {
        q: 'Why does ICAO radiotelephony strictly restrict the word "CLEARED" exclusively to actual takeoff and landing authorizations?',
        options: [
          'Because the word "cleared" takes too long to pronounce',
          'Because using "cleared" in routing or taxi contexts caused catastrophic runway collisions (such as the 1977 Tenerife disaster) where pilots mistook route clearances for permission to take off',
          'Because air traffic controllers pay a tax each time they say the word',
          'Because radar antennas stop turning when "cleared" is spoken'
        ],
        answer: 1,
        explanation: 'At Tenerife, the transmission "You are cleared to the Papa beacon..." was misinterpreted by the pilot as takeoff clearance, colliding into another 747 on the fog-covered runway. ICAO subsequently reserved "cleared" strictly for takeoff and landing; all other messages must use words like "PROCEED", "TAXI", or "APPROVED".'
      },
      {
        q: 'What is the required immediate pilot action upon receiving an automated cockpit EGPWS warning: "TERRAIN, TERRAIN! PULL UP!"?',
        options: [
          'Look out the window to see if mountains are visible',
          'Immediately disconnect autopilot, advance throttles to maximum go-around thrust (TO/GA), smoothly rotate pitch to the aerodynamic limit, and ignore conflicting ATC vectors until terrain clearance is achieved',
          'Radio ATC and ask for advice on what to do',
          'Turn off the EGPWS circuit breaker to silence the alarm'
        ],
        answer: 1,
        explanation: 'Standard operating procedures (SOPs) mandate that an EGPWS warning requires instantaneous, unhesitating execution of the maximum performance escape maneuver: maximum thrust, aggressive pitch rotation, and speedbrake retraction. Time cannot be wasted negotiating with ATC.'
      },
      {
        q: 'What distinguishes a "PAN-PAN" radiotelephony transmission from a "MAYDAY" transmission?',
        options: [
          'Pan-Pan indicates a culinary problem with passenger meals',
          'Mayday signifies grave, imminent danger requiring immediate priority (e.g. engine fire), whereas Pan-Pan indicates an urgent condition concerning safety (e.g. medical emergency) that does not require immediate distress intervention',
          'Pan-Pan is only spoken in French',
          'There is no operational difference'
        ],
        answer: 1,
        explanation: 'Derived from French "panne" (breakdown) and "m\'aider" (help me), Pan-Pan signals an urgent situation requiring priority handling but not yet threatening immediate catastrophic loss of life, whereas Mayday signifies severe and imminent distress requiring instant crash rescue deployment.'
      },
      {
        q: 'Why is verbatim "Readback" by the flight crew legally mandatory for altimeter settings (QNH) and runway hold-short instructions?',
        options: [
          'To keep the pilots from falling asleep during descent',
          'To allow the air traffic controller to execute "Hearback" validation, catching any misheard altitudes or unauthorized runway incursions before accidents occur',
          'To test the microphone battery volume',
          'To record sound for flight attendant training videos'
        ],
        answer: 1,
        explanation: 'The readback-hearback closed-loop ensures that any misunderstanding in numbers (e.g. climbing to Flight Level 150 vs. 50, or holding short of Runway 24 vs. crossing) is immediately recognized by the controller and corrected before an altitude bust or runway incursion takes place.'
      }
    ]
  });
  console.log('[UPDATED] Injected aveng-m1-r2');
}

// 5. Food Science: food-m1-r2
const foodTrack = courses['food-science'];
const foodM1 = foodTrack.modules.find(m => m.id === 'food-m1');
if (foodM1 && !foodM1.readings.some(r => r.id === 'food-m1-r2')) {
  foodM1.readings.push({
    id: 'food-m1-r2',
    title: 'Applied Lab: HACCP Critical Limits, Thermal Lethality (D/z/F0 Kinetics) & Cold-Chain IoT',
    duration: '15 min',
    content: `
> **Food Safety Engineering Standard**: Aligned with **ISO 22000 (Food Safety Management Systems)**, **Codex Alimentarius HACCP Guidelines**, and **FDA Food Safety Modernization Act (FSMA - 21 CFR Part 117)**. Prepares food processing and bioprocess engineers to calculate thermal sterilization lethality and establish automated Critical Control Point (CCP) telemetry monitoring.

# Applied Laboratory: HACCP Critical Limits, Thermal Lethality & Cold-Chain IoT

Commercial food manufacturing facilities (such as agricultural processing and packaging hubs in northwestern Mexico) process perishable commodities destined for North American supermarket cold-chains. Ensuring food safety requires establishing scientifically validated preventive controls and continuous Critical Control Point (CCP) monitoring under Hazard Analysis Critical Control Point (HACCP) principles.

## 1. Thermal Lethality Kinetics: D-Value, z-Value, and F0
To guarantee the complete destruction of hazardous spore-forming pathogens (*Clostridium botulinum* in low-acid canned foods):
1. **Decimal Reduction Time ($D$-value)**: The time required at a specified temperature ($T$) to reduce the microbial population by one logarithmic order ($90\\%$ reduction):
   $$D = \\frac{t}{\\log_{10} N_0 - \\log_{10} N}$$
2. **Thermal Resistance Constant ($z$-value)**: The temperature increase required to reduce the $D$-value by a factor of 10. For *C. botulinum*, $z = 10^\\circ\\text{C}$ ($18^\\circ\\text{F}$).
3. **Sterilization Value ($F_0$)**: The equivalent time in minutes at $121.1^\\circ\\text{C}$ ($250^\\circ\\text{F}$) required to achieve commercial sterility:
   $$F_0 = \\int_0^t 10^{\\frac{T(t) - 121.1}{z}} dt$$
   The gold standard "12D Botulinum Cook" mandates a minimum $F_0 = 3.0\\,\\text{minutes}$ at the thermal slowest heating point (cold spot) of the container, reducing spores by $10^{12}$.

## 2. HACCP Critical Control Point (CCP) Architecture
HACCP establishes a 7-principle regulatory matrix:
1. **Hazard Analysis**: Identify biological (pathogens), chemical (mycotoxins, pesticide residues), and physical hazards (glass, metal shavings).
2. **Critical Limits**: Measurable, scientific boundaries separating acceptable from unacceptable conditions (e.g. "Internal retort core temperature must exceed $121.1^\\circ\\text{C}$ for $\\ge 18\\,\\text{minutes}$").
3. **Corrective Actions**: Automatic flow diversion valves redirect under-pasteurized dairy or beverage liquid back to balance tanks if pasteurization heat exchanger temperature drops even $0.1^\\circ\\text{C}$ below critical limit.

## 3. IoT Cold-Chain Telemetry & Temperature Abuses
Perishable fruit, meat, and dairy exports crossing border checkpoints (e.g. Nogales or Otay Mesa) utilize refrigerated trailers (reefers) monitored by automated telemetry:
- **Continuous Multi-Zone Temperature Probes**: Real-time logging of supply air and return air temperatures transmitted over cellular LTE-M/NB-IoT.
- **Mean Kinetic Temperature (MKT)**: Evaluates the non-linear biological impact of transient temperature excursions:
  $$T_K = \\frac{\\Delta H / R}{-\\ln\\left( \\frac{1}{n} \\sum_{i=1}^n e^{-\\frac{\\Delta H}{R T_i}} \\right)}$$
  Ensures that short border transit delays do not compromise enzymatic freshness or allow spore germination.

---
> **Key Takeaway**: Industrial food bioprocessing safety integrates **microbial thermal lethality kinetics ($F_0$ calculations), HACCP CCP automation, and IoT cold-chain telemetry monitoring** to meet FDA FSMA export certifications.
`,
    vocabulary: [
      {
        en: 'Hazard Analysis Critical Control Point (HACCP)',
        es: 'Análisis de Peligros y Puntos Críticos de Control (HACCP)',
        definition: 'Systematic preventive approach to food safety addressing biological, chemical, and physical hazards in production processes.',
        ipa: '/ˈhæs.ʌp/',
        collocations: ['HACCP critical control point (CCP)', 'establish HACCP critical limits', 'mandatory HACCP plan audit']
      },
      {
        en: 'Decimal Reduction Time (D-Value)',
        es: 'Tiempo de Reducción Decimal (Valor D)',
        definition: 'Time in minutes at a given temperature required to destroy 90% (one log cycle) of a target microbial population.',
        ipa: '/ˈdɛs.ə.məl rɪˈdʌk.ʃən taɪm/',
        collocations: ['calculate microbial D-value', 'logarithmic reduction kinetics', 'D-value at reference temperature']
      },
      {
        en: 'Commercial Sterility (F0 Value)',
        es: 'Esterilidad Comercial (Valor F0)',
        definition: 'Total integrated thermal lethality expressed in equivalent minutes at 121.1°C (250°F) required to render food free of Clostridium botulinum spores.',
        ipa: '/kəˈmɜːr.ʃəl stəˈrɪl.ə.ti/',
        collocations: ['achieve 12D botulinum cook', 'F0 lethality calculation', 'cold spot thermal penetration']
      },
      {
        en: 'Cold-Chain Telemetry',
        es: 'Telemetría de Cadena de Frío',
        definition: 'Automated digital IoT sensor systems continuously monitoring and logging refrigerated transport temperatures across the distribution network.',
        ipa: '/koʊld tʃeɪn təˈlɛm.ə.tri/',
        collocations: ['real-time reefer telemetry', 'mean kinetic temperature (MKT)', 'temperature excursion alert']
      }
    ],
    questions: [
      {
        q: 'What is the minimum biological safety objective of the classic "12D Botulinum Cook" in commercial low-acid retort food canning?',
        options: [
          'To make the cans look shiny on supermarket shelves',
          'To deliver sufficient thermal lethality to achieve a 12-decimal (10^12) log reduction of Clostridium botulinum spores, achieving an F0 value of at least 3.0 minutes at the container cold spot',
          'To cook food using microwave radiation exclusively',
          'To freeze food to minus 100 degrees Celsius'
        ],
        answer: 1,
        explanation: 'Because Clostridium botulinum produces deadly neurotoxins in anaerobic low-acid environments, canning regulations mandate a 12D cook: reducing the hypothetical spore population by 12 orders of magnitude (from 1 billion spores to 1 in a thousand). This corresponds to an integrated thermal lethality F0 of at least 3.0 minutes at 121.1°C.'
      },
      {
        q: 'What distinguishes a Critical Control Point (CCP) from a standard prerequisite sanitary procedure in a certified HACCP food facility?',
        options: [
          'CCPs are written in red ink',
          'A CCP is a specific step at which control can be applied and is essential to prevent, eliminate, or reduce a food safety hazard to an acceptable level, backed by measurable numerical Critical Limits',
          'CCPs only apply to employee parking lots',
          'CCPs are optional suggestions that managers can ignore'
        ],
        answer: 1,
        explanation: 'Prerequisite programs (like handwashing or general cleaning) maintain a sanitary environment, but a Critical Control Point (CCP) is a specific operational step (e.g. metal detection, retort thermal processing, or flash pasteurization) where measurable limits must be met to directly prevent or eliminate foodborne illness.'
      },
      {
        q: 'How does an automated Flow Diversion Valve (FDV) protect consumers during high-temperature short-time (HTST) milk or beverage pasteurization?',
        options: [
          'It diverts milk directly into employee coffee cups',
          'If the temperature sensor at the end of the holding tube detects that liquid temperature has dropped even 0.1°C below the legal critical limit, the FDV instantly diverts the product back to the balance tank for reprocessing',
          'It adds sugar to mask bacterial growth',
          'It shuts off water to the boiler'
        ],
        answer: 1,
        explanation: 'In pasteurization systems, a fail-safe pneumatic Flow Diversion Valve is stationed at the discharge of the holding tube. If temperature drops below the validated critical limit (e.g., 72°C for 15 seconds), the valve snaps to diverted position, preventing unpasteurized product from reaching the clean cooling or packaging zones.'
      },
      {
        q: 'Why is Mean Kinetic Temperature (MKT) a more accurate biological indicator of pharmaceutical and food shelf-life degradation than a simple arithmetic average temperature?',
        options: [
          'Because MKT uses imaginary numbers',
          'Because chemical reaction rates and microbial growth increase non-linearly with temperature per the Arrhenius equation; MKT gives greater mathematical weight to high-temperature thermal excursions',
          'Because MKT is calculated without using mathematics',
          'Because MKT only measures frozen ice'
        ],
        answer: 1,
        explanation: 'Chemical and microbial degradation kinetics follow the exponential Arrhenius relationship with activation energy. A short 2-hour spike to 30°C causes far more biological degradation than 22 hours at 4°C; an arithmetic average hides this spike, while MKT calculates the true non-linear thermal degradation impact.'
      }
    ]
  });
  console.log('[UPDATED] Injected food-m1-r2');
}

// Write back to courses.js
const outputJS = `// stemOS Learning Experience Platform - Course Catalog
// Comprehensive Technical English (ESP) curriculum for high-tech engineering tracks.

var LXP_COURSES = ${JSON.stringify(courses, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LXP_COURSES;
}
`;

fs.writeFileSync(coursesPath, outputJS, 'utf8');
console.log('[SUCCESS] content/courses.js updated with Wave 4 applied engineering labs!');
