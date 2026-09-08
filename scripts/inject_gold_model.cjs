// scripts/inject_gold_model.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Current courses loaded:', Object.keys(LXP_COURSES).length);

// 1. BUILD GOLD MODEL 1: SEMICONDUCTORS (semi-m1)
const semiGoldReadingContent = `
> **Industry Certification & Foundry Spec**: This reading adheres to **SEMI (Semiconductor Equipment and Materials International)** Fab Specifications and **ISO 14644-1 Cleanroom Standards**. Master this foundational technical English to operate in Tier-1 fabrication and packaging facilities (TSMC, Intel, Texas Instruments).

# Cleanrooms, Silicon Wafers & Photolithography: The Silicon Foundry Blueprint

In high-volume semiconductor fabrication plants (*fabs*), manufacturing microprocessors with sub-5-nanometer feature sizes demands extreme physical isolation and atomic-level precision. An operational wafer fab represents the most tightly controlled manufacturing environment in human history.

## 1. Monocrystalline Silicon and the Czochralski Ingot Process

All microchip production begins with electronic-grade silicon (**EGS**) purified to **99.9999999%** ("nine-nines" purity). 

1. **Crystal Growth (Czochralski Method)**: Raw molten silicon is held in a quartz crucible at **1,425°C**. A small seed crystal of single-crystal silicon with an exact crystallographic orientation (typically $\\langle 100 \\rangle$ or $\\langle 111 \\rangle$) is lowered into the melt. As the seed rotates and is slowly pulled upward, silicon atoms freeze onto the seed crystal, forming a giant cylindrical single crystal called an **Ingot** (or *boule*) weighing over 100 kilograms.
2. **Wafer Slicing & Polishing**: The ingot is ground to an exact 300mm diameter and sliced into thin discs called **Wafers** using high-speed diamond-wire saws. Each wafer is chemically etched and subjected to **Chemical Mechanical Planarization (CMP)** with abrasive colloidal silica slurry until its surface roughness is under **0.1 nanometers**—flatter than any natural surface on Earth.

## 2. Cleanroom Architecture and Airborne Particle Control (ISO 14644-1)

A semiconductor fab operates as an **ISO Class 1 Cleanroom**:
- **Airborne Particle Metric**: Maintains fewer than **10 particles** of size $\\ge 0.1$ micrometers per cubic meter of air. By comparison, ordinary ambient outdoor air contains over **35,000,000 particles** per cubic meter.
- **Laminar Positive Pressure**: Clean air is forced downward through ultra-low penetration air (**ULPA**) filters in continuous laminar sheets, escaping through perforated floor tiles. Positive static air pressure ensures that when doors open, air rushes *outward*, preventing dust infiltration.
- **The "Killer Defect" Threat**: A modern FinFET or Gate-All-Around (GAA) transistor has a gate length of 3 to 12 nanometers. A floating dust particle of 0.2 microns is **20 to 50 times larger** than the transistor itself. If a single speck of dust lands on a wafer during lithography, it creates catastrophic bridge shorts or open-circuit voids, destroying adjacent dies.

## 3. The Core Photolithography Cycle

Photolithography is the pacing step of the entire foundry, repeated 40 to 80 times to build up vertical metal and dielectric layers:

1. **Photoresist Spin-Coating**: Liquid light-sensitive organic polymer (**Photoresist**) is dispensed onto the wafer center while the chuck spins at **3,000 RPM**, creating an ultra-uniform thin film (30–60nm thick).
2. **Stepper / Scanner Alignment**: The wafer enters an **Extreme Ultraviolet (EUV)** scanner operating at a wavelength of **13.5 nanometers**. A master fused-quartz mask called a **Reticle** (containing the microscopic circuit blueprints) is aligned over the wafer using laser interferometers with sub-nanometer tolerance.
3. **UV Exposure & Chemical Development**: EUV photons chemically alter the exposed photoresist. In positive resist, exposed areas become soluble and are washed away by an alkaline developer solution, leaving behind sharp relief patterns.
4. **Anisotropic Plasma Etching (Dry Etch)**: The unmasked silicon is carved away using reactive ion plasma (e.g., $CF_4$ / $SF_6$). Unlike wet chemical etching which is **isotropic** (eating equally in all directions and causing lateral undercut), dry plasma etching is strictly **anisotropic**, cutting vertical sidewall trenches with zero lateral deviation.
5. **Doping via Ion Implantation**: Accelerated beam ions (Boron for P-type, Phosphorus for N-type) penetrate the open silicon areas to create P-N junctions, transforming inert silicon into conductive transistor switches.

## 4. Die Singulation and Wafer Yield Economics

Once fabrication is complete, the circular 300mm wafer contains hundreds of identical rectangular microchips called **Dies**:
- **Wafer Probe Testing**: Microscopic needle probes test each individual die at high clock frequencies. Defective dies are marked with digital ink.
- **Die Singulation**: Diamond saws dice the wafer along scribe streets, separating functional dies from edge scrap.
- **Yield ($\\%$)**: The critical profitability metric:
  $$\\text{Yield} = \\frac{\\text{Number of Functional Dies}}{\\text{Total Theoretical Dies on Wafer}} \\times 100$$
Foundries run multi-million-dollar yield learning curves to push yields from an initial 65% above **92%**, where every fraction of a percent represents millions of dollars in net margin.

---

> **Key Takeaway**: Semiconductor fabrication links **monocrystalline substrate preparation (Czochralski ingots, 300mm wafers)** with **ultraclean environmental isolation (ISO Class 1)** and **optical micro-patterning (photolithography, EUV steppers, anisotropic dry etching)**. Mastering these technical English terms is essential for process engineers liaising with international foundry hubs.
`;

const semiGoldDialogue = {
  title: "Daily Fab Standup: Yield Excursion & Reticle Alignment Root Cause Analysis",
  titleES: "Standup Diario de Planta: Análisis de Causa Raíz (RCA) por Caída de Rendimiento",
  scenarioContext: "Austin, TX (Fab OEM Headquarters) ⇄ Mexicali, B.C. (Advanced Testing & Packaging Cluster). 08:30 AM Standup via Microsoft Teams.",
  characters: [
    { name: "David Vance", role: "VP of Foundry Engineering (Austin HQ)", avatar: "DV", color: "var(--cyan)" },
    { name: "Ing. Sofía Mendoza", role: "Lead Cleanroom Process Engineer (Mexicali Fab)", avatar: "SM", color: "var(--emerald)" }
  ],
  turns: [
    {
      speaker: "David Vance",
      text: "Morning, team. Let's get straight to it. Our yield telemetry from Lot 4081 shows an alarming 4.2% yield loss on the 300mm wafer line. Sofía, do we have preliminary defect density figures from the wafer inspection tools?",
      translation: "Buenos días, equipo. Vamos directo al grano. Nuestra telemetría de rendimiento del Lote 4081 muestra una alarmante pérdida de yield del 4.2% en la línea de obleas de 300mm. Sofía, ¿tenemos cifras preliminares de densidad de defectos de las herramientas de inspección de obleas?",
      targetTerms: ["yield telemetry", "yield loss", "300mm wafer", "defect density"]
    },
    {
      speaker: "Ing. Sofía Mendoza",
      text: "Yes, David. We ran automated optical inspection (AOI) right after the post-exposure bake. The defect density spiked to 0.18 defects per square centimeter, predominantly on the outer perimeter of the silicon wafers.",
      translation: "Sí, David. Corrimos inspección óptica automatizada (AOI) justo después del post-exposure bake. La densidad de defectos se disparó a 0.18 defectos por centímetro cuadrado, predominantemente en el perímetro exterior de las obleas de silicio.",
      targetTerms: ["automated optical inspection", "post-exposure bake", "defect density", "silicon wafers"]
    },
    {
      speaker: "David Vance",
      text: "That sounds like a spin-coating issue or reticle haze. Was there any anomaly during the photoresist application or the EUV stepper alignment?",
      translation: "Eso suena como un problema de recubrimiento centrífugo (spin-coating) o turbidez en la retícula (reticle haze). ¿Hubo alguna anomalía durante la aplicación de la resina fotosensible o la alineación del stepper EUV?",
      targetTerms: ["spin-coating", "reticle haze", "photoresist", "stepper alignment"]
    },
    {
      speaker: "Ing. Sofía Mendoza",
      text: "Exactly. The photoresist viscosity drifted off-spec by 3% due to a minor cleanroom humidity fluctuation in Bay 4. Consequently, the edge bead removal wasn't uniform, causing photoresist flaking right before the anisotropic plasma etch.",
      translation: "Exacto. La viscosidad de la resina se desvió 3% de la especificación debido a una fluctuación menor de humedad en la bahía 4 del cuarto limpio. En consecuencia, la eliminación del borde (edge bead removal) no fue uniforme, provocando desprendimientos justo antes del grabado por plasma anisotrópico.",
      targetTerms: ["photoresist viscosity", "cleanroom humidity", "edge bead removal", "anisotropic plasma etch"]
    },
    {
      speaker: "David Vance",
      text: "Outstanding catch, Sofía. If that flaking had passed through to ion implantation, we would have scrapped the entire batch of dies. Let's issue an immediate Engineering Change Order (ECO) to tighten the Bay 4 environmental tolerances and recalibrate the spin-coater dispense nozzles.",
      translation: "Excelente detección, Sofía. Si ese desprendimiento hubiera pasado a la implantación iónica, habríamos tenido que desechar todo el lote de pastillas (dies). Emitamos de inmediato una Orden de Cambio de Ingeniería (ECO) para ajustar las tolerancias ambientales de la Bahía 4 y recalibrar las boquillas de dosificación del spin-coater.",
      targetTerms: ["ion implantation", "batch of dies", "Engineering Change Order (ECO)", "recalibrate"]
    },
    {
      speaker: "Ing. Sofía Mendoza",
      text: "I'll have the CAPA corrective action report uploaded before 1:00 PM CST and will monitor the pilot run on the next silicon ingot slice.",
      translation: "Tendré el reporte de acción correctiva CAPA subido antes de la 1:00 PM CST y monitorearé la corrida piloto en el próximo corte de lingote de silicio.",
      targetTerms: ["CAPA corrective action", "pilot run", "silicon ingot"]
    }
  ],
  contrastTips: [
    {
      school: "We have a problem with the photo machine and the silicon chips are broken.",
      native: "We observed a critical yield excursion due to photoresist viscosity drift and stepper reticle misalignment.",
      explanation: "En la escuela se dice 'broken chips', pero en la industria de semiconductores se dice 'yield excursion' o 'die defect density spike'."
    },
    {
      school: "Clean room with no dust.",
      native: "ISO Class 1 biocleanroom with laminar positive-pressure HEPA filtration (<10 particles ≥0.1µm/m³).",
      explanation: "Un cliente de EE.UU. espera que especifiques la norma ISO 14644-1 y el conteo de partículas, no adjetivos vagos como 'very clean'."
    }
  ]
};

const semiGoldLexiconMatrix = [
  {
    term: "Silicon Wafer",
    ipa: "/ˈsɪl.ɪ.kən ˈweɪ.fər/",
    es: "Oblea de Silicio",
    category: "Substrato & Material",
    definition: "Thin slice of monocrystalline semiconductor crystal used as the substrate for integrated circuits.",
    collocations: ["to slice a wafer", "wafer bowing", "notch alignment", "300mm prime wafer"],
    falseFriends: "Falso amigo: 'Wafer' en tech NUNCA es una galleta; 'Silicon' es silicio químico, mientras que 'Silicone' (con -e) es silicona plástica.",
    nativeUsage: "The robotic vacuum arm transfers 300mm silicon wafers into the front opening unified pod (FOUP)."
  },
  {
    term: "Cleanroom (ISO Class 1)",
    ipa: "/ˈkliːn.ruːm/",
    es: "Cuarto Limpio / Sala Limpia",
    category: "Infraestructura Fab",
    definition: "Controlled environment maintaining fewer than 10 particles ≥0.1µm per cubic meter of air under ISO 14644-1.",
    collocations: ["to enter the cleanroom", "positive air pressure", "laminar airflow", "bunny suit gowning"],
    falseFriends: "No es simplemente 'una habitación limpia'; requiere protocolo de despresurización y esclusas de aire.",
    nativeUsage: "Technicians must complete electrostatic discharge (ESD) grounding before entering the ISO Class 1 cleanroom bay."
  },
  {
    term: "Photolithography",
    ipa: "/ˌfoʊ.toʊ.lɪˈθɑː.ɡrə.fi/",
    es: "Fotolitografía",
    category: "Proceso Central",
    definition: "Optical process of transferring geometric circuit patterns from a photomask onto a chemical photoresist layer.",
    collocations: ["extreme ultraviolet (EUV) photolithography", "sub-5nm patterning", "stepper exposure cycle"],
    falseFriends: "En inglés se pronuncia con acento en la tercera sílaba: /lɪ-THOG-rə-fi/.",
    nativeUsage: "Photolithography accounts for over 35% of total wafer processing time in modern foundry operations."
  },
  {
    term: "Photoresist",
    ipa: "/ˌfoʊ.toʊ.rɪˈzɪst/",
    es: "Resina Fotosensible / Fotorresina",
    category: "Química de Proceso",
    definition: "Light-sensitive organic polymer spin-coated onto wafers that changes solubility upon exposure to ultraviolet radiation.",
    collocations: ["spin-coat photoresist", "positive vs negative resist", "soft-bake photoresist", "resist strip"],
    falseFriends: "No traducir como 'resistencia' (resistor). Es una resina líquida química fotosensible.",
    nativeUsage: "The spin coater dispenses 2 milliliters of liquid photoresist at 3,000 RPM to achieve a uniform 40nm thin film."
  },
  {
    term: "Reticle (Photomask)",
    ipa: "/ˈrɛt.ɪ.kəl/",
    es: "Retícula / Fotomáscara",
    category: "Herramental Óptico",
    definition: "Master fused-quartz plate containing chromium circuit patterns projected at 4x optical reduction onto the wafer.",
    collocations: ["align the reticle", "reticle pellicle inspection", "reticle haze defect", "mask writer"],
    falseFriends: "No confundir con 'retícula' de diseño gráfico o cuadrícula simple. Es un cristal de cuarzo de ultra alta pureza de $100K+ USD.",
    nativeUsage: "The laser interferometer verified reticle alignment within a 1.2-nanometer margin of error."
  },
  {
    term: "Stepper / Scanner",
    ipa: "/ˈstɛp.ər/",
    es: "Fotolitógrafo Stepper / Escáner",
    category: "Equipo de Capital (CapEx)",
    definition: "High-precision lithography machine that exposes wafers field-by-field using step-and-scan mechanical stages.",
    collocations: ["recalibrate the stepper", "numerical aperture (NA)", "stepper throughput", "scanner optics"],
    falseFriends: "No es un escalador de gimnasio; es la máquina más cara de la civilización humana (un scanner ASML EUV cuesta ~$200M USD).",
    nativeUsage: "The EUV scanner utilizes anamorphic mirrors to direct 13.5nm extreme ultraviolet light onto the wafer stage."
  },
  {
    term: "Plasma Etching (Dry Etch)",
    ipa: "/ˈplæz.mə ˈɛtʃ.ɪŋ/",
    es: "Grabado por Plasma / Grabado Seco",
    category: "Remoción de Material",
    definition: "Process utilizing reactive gaseous plasma ions (e.g., CF4) to selectively remove unmasked dielectric or conductive layers.",
    collocations: ["anisotropic plasma etch", "etch selectivity", "vertical sidewall profile", "reactive ion etching (RIE)"],
    falseFriends: "'Etch' no es 'gravar' impuestos; es decapar o erosionar químicamente el silicio con precisión atómica.",
    nativeUsage: "Anisotropic dry etching ensures strictly vertical trench sidewalls without lateral undercutting of the circuit traces."
  },
  {
    term: "Ion Implantation (Doping)",
    ipa: "/ˈaɪ.ən ˌɪm.plænˈteɪ.ʃən/",
    es: "Implantación Iónica / Dopaje",
    category: "Modificación Eléctrica",
    definition: "High-voltage acceleration of dopant ions (Boron, Phosphorus, Arsenic) into the silicon crystal lattice to create P-N junctions.",
    collocations: ["implant dopant atoms", "thermal annealing cycle", "doping concentration gradient", "P-N junction formation"],
    falseFriends: "Doping en deportes es ilegal; en semiconductores es el proceso intencional más crítico para crear transistores.",
    nativeUsage: "Following ion implantation, the wafer undergoes rapid thermal annealing to repair silicon crystal damage."
  },
  {
    term: "Chemical Mechanical Planarization (CMP)",
    ipa: "/ˌkɛm.ɪ.kəl məˈkæn.ɪ.kəl/",
    es: "Planarización Químico-Mecánica",
    category: "Pulido de Capas",
    definition: "Nanoscale polishing process using chemical abrasive slurry and rotating polyurethane pads to flatten wafer topography.",
    collocations: ["CMP slurry dispense", "pad conditioning", "planarize dielectric oxide", "topography dishing"],
    falseFriends: "No es lijar ni pulir carrocerías; la remoción se mide en ångströms (10^-10 m).",
    nativeUsage: "CMP is performed between each metallization layer to ensure the surface remains within the scanner's depth of focus."
  },
  {
    term: "Die / Dies",
    ipa: "/daɪ/ , /daɪz/",
    es: "Pastilla / Dado / Circuito Integrado Individual",
    category: "Componente Físico",
    definition: "Individual functional microchip cut from the finished wafer prior to packaging. Plural is 'dies' (or 'dice').",
    collocations: ["good dies per wafer (GDW)", "die singulation", "die attach", "flip-chip packaging"],
    falseFriends: "'Die' en inglés general significa morir; en microelectrónica es el chip individual sin encapsular.",
    nativeUsage: "A single 300mm wafer yields approximately 650 functional micro-controller dies after diamond saw dicing."
  },
  {
    term: "Yield",
    ipa: "/jiːld/",
    es: "Rendimiento Porcentual de Producción",
    category: "Métrica Económica Clave",
    definition: "Percentage of non-defective, fully functional chips obtained from a processed wafer relative to theoretical capacity.",
    collocations: ["maximize die yield", "yield excursion", "yield learning curve", "scrap rate reduction"],
    falseFriends: "En señales de tráfico significa 'Ceda el paso'; en manufactura es la métrica reina que determina la rentabilidad de la planta.",
    nativeUsage: "Increasing overall fab yield from 86% to 92% translated into an additional $14 million USD in quarterly gross profit."
  },
  {
    term: "Defect Density",
    ipa: "/ˈdiː.fɛkt ˈdɛn.sɪ.ti/",
    es: "Densidad de Defectos",
    category: "Control de Calidad",
    definition: "Number of critical flaws, killer particles, or crystal dislocations measured per unit area (defects/cm²).",
    collocations: ["killer defect", "defect density baseline", "in-line inspection telemetry", "particle counter drift"],
    falseFriends: "No es simplemente 'cuántos defectos hay', es una relación matemática espacial que modela la probabilidad de falla según el modelo Poisson.",
    nativeUsage: "The newly installed chemical air filtration units reduced baseline defect density to below 0.04 defects/cm²."
  }
];

const semiGoldSocraticChallenges = [
  {
    step: 1,
    concept: "Wafer vs Ingot vs Die",
    botQuestion: "Welcome to the Feynman Socratic Audit! I am your lead process evaluator. Explain the physical and functional difference between an Ingot, a Wafer, and a Die in English. Why can't we manufacture microchips directly from raw silicon blocks without cutting wafers first?",
    requiredKeywords: ["ingot", "wafer", "die", "crystal", "czochralski", "slice", "photolithography", "surface", "flat"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! An ingot is the raw single-crystal cylinder pulled via Czochralski growth, which is sliced into thin planar wafers so photolithography steppers can project microscopic 2D patterns with depth of focus, yielding individual functional dies after singulation.",
    feedbackRetry: "You're getting there! Remember: an Ingot is the cylindrical single crystal, sliced into thin discs called Wafers so light can focus on a flat surface, which are later diced into individual microchips called Dies. Try explaining why flatness matters!"
  },
  {
    step: 2,
    concept: "Cleanroom Class 1 & Killer Particles",
    botQuestion: "In a TSMC or Intel cleanroom audit, explain why airborne particle counts are regulated to fewer than 10 particles per cubic meter. What happens physically to an integrated circuit if a 0.2-micron particle lands on the wafer during the photoresist spin-coat or exposure?",
    requiredKeywords: ["cleanroom", "particle", "photoresist", "short circuit", "open circuit", "defect", "yield", "reticle", "dust"],
    minKeywords: 3,
    feedbackSuccess: "Brilliant explanation of contamination physics! A 0.2-micron dust particle is massive compared to 3-nanometer transistor gates; it blocks ultraviolet light like a boulder, creating fatal circuit shorts, bridge defects, and catastrophic yield loss.",
    feedbackRetry: "Focus on the scale: modern transistors are 3 to 10 nanometers wide. If a 200-nanometer particle lands during photoresist exposure, what happens to the light pattern and the conductive copper traces?"
  },
  {
    step: 3,
    concept: "Isotropic vs Anisotropic Plasma Etching",
    botQuestion: "Describe the crucial engineering difference between Wet Chemical Etching (isotropic) and Dry Plasma Etching (anisotropic). Why is anisotropic plasma etching non-negotiable for sub-10nm transistor nodes?",
    requiredKeywords: ["isotropic", "anisotropic", "plasma", "chemical", "sidewall", "vertical", "undercut", "resolution"],
    minKeywords: 3,
    feedbackSuccess: "Flawless technical precision! Wet chemical etching is isotropic (etches in all directions simultaneously, causing severe undercut beneath the mask). Dry plasma etching uses accelerated directional ions to etch strictly vertical sidewalls without lateral erosion, preserving microscopic feature resolution.",
    feedbackRetry: "Think about directionality! 'Isotropic' means etching equally in all directions (sideways undercut). 'Anisotropic' plasma etching uses accelerated ions to carve strictly straight vertical sidewalls. Contrast both!"
  }
];

// Inject Gold Model into semiconductors track
if (LXP_COURSES["semiconductors"]) {
  const scTrack = LXP_COURSES["semiconductors"];
  if (scTrack.modules && scTrack.modules[0]) {
    const mod1 = scTrack.modules[0];
    mod1.isGoldModel = true;
    mod1.goldBadge = "⭐ MODELO GOLD ESP";
    mod1.title = "Cleanrooms, Wafers & Photolithography";
    mod1.titleES = "Salas Limpias, Obleas y Fotolitografía (Modelo Gold)";
    
    // Replace reading with Gold spec
    mod1.readings[0] = {
      id: "semi-m1-r1",
      title: "Cleanrooms, Silicon Wafers & Photolithography: The Foundry Blueprint",
      duration: "12 min",
      content: semiGoldReadingContent,
      vocabulary: semiGoldLexiconMatrix.map(item => ({
        en: item.term,
        es: item.es,
        definition: item.definition,
        ipa: item.ipa,
        collocations: item.collocations
      })),
      questions: [
        { q: "Why must wafers be ultra-flat before entering photolithography steppers?", options: ["To fit inside the shipping box", "Because stepper optics have a nanometer-scale depth of focus", "To reflect normal sunlight", "To reduce shipping weight"], answer: 1 },
        { q: "What distinguishes an ISO Class 1 cleanroom from standard rooms?", options: ["It has no doors", "It maintains fewer than 10 particles ≥0.1µm per cubic meter", "It operates at freezing temperatures", "It requires complete darkness"], answer: 1 },
        { q: "Why is dry plasma etching preferred over wet chemical etching in sub-10nm nodes?", options: ["Plasma etching is isotropic and cuts sideways", "Plasma etching is anisotropic and cuts strictly vertical sidewalls without undercut", "Wet chemicals are illegal in Mexico", "Plasma etching produces no heat"], answer: 1 },
        { q: "What does Die Yield directly determine in foundry business operations?", options: ["The color of the silicon wafer", "The percentage of functional chips and overall plant profit margin", "The speed of the cleanroom air filters", "The thickness of the reticle quartz"], answer: 1 }
      ]
    };

    mod1.dialogue = semiGoldDialogue;
    mod1.lexiconMatrix = semiGoldLexiconMatrix;
    mod1.socraticChallenges = semiGoldSocraticChallenges;

    console.log('✓ Successfully injected Gold Model into semiconductors (semi-m1)');
  }
}

// 2. BUILD GOLD MODEL 2: ROBOTICS & AUTOMATION (robot-m1)
const robotGoldDialogue = {
  title: "Robotic Cell Commissioning: Kinematic Singularity & TCP Calibration",
  titleES: "Puesta en Marcha de Celda Robótica: Singularidad Cinemática y Calibración de TCP",
  scenarioContext: "Detroit, MI (OEM Body-in-White Engineering) ⇄ Saltillo, Coahuila (Automotive Assembly Plant). Commissioning Station 14 via Secure Video.",
  characters: [
    { name: "Kevin Miller", role: "Principal Automation Architect (Detroit OEM)", avatar: "KM", color: "var(--cyan)" },
    { name: "Ing. Carlos Garza", role: "Lead Robotics & Automation Integrator (Saltillo Plant)", avatar: "CG", color: "var(--emerald)" }
  ],
  turns: [
    {
      speaker: "Kevin Miller",
      text: "Carlos, we're reviewing the line telemetry from Station 14. The 6-axis spot welding robot threw an overcurrent fault on Axis 5 during the door-pillar weld path. Are we running into a wrist singularity?",
      translation: "Carlos, estamos revisando la telemetría de la línea de la Estación 14. El robot de soldadura por puntos de 6 ejes arrojó una falla de sobrecorriente en el Eje 5 durante la trayectoria de soldadura del pilar de la puerta. ¿Estamos cayendo en una singularidad de muñeca?",
      targetTerms: ["6-axis", "spot welding robot", "overcurrent fault", "wrist singularity"]
    },
    {
      speaker: "Ing. Carlos Garza",
      text: "Exactly, Kevin. When the tool center point (TCP) interpolated linearly across the B-pillar flange, Axis 4 and Axis 6 became collinear. The inverse kinematics algorithm tried to command an infinite angular velocity to maintain the path.",
      translation: "Exacto, Kevin. Cuando el punto central de la herramienta (TCP) interpoló linealmente a través de la pestaña del pilar B, el Eje 4 y el Eje 6 se volvieron colineales. El algoritmo de cinemática inversa intentó ordenar una velocidad angular infinita para mantener la trayectoria.",
      targetTerms: ["tool center point (TCP)", "interpolated linearly", "collinear", "inverse kinematics"]
    },
    {
      speaker: "Kevin Miller",
      text: "That explains the servo drive trip. Can we alter the approach angle or rotate the welding gun's seventh external axis by 5 degrees to avoid the alignment?",
      translation: "Eso explica el disparo del servoaccionamiento. ¿Podemos alterar el ángulo de aproximación o rotar el séptimo eje externo de la pistola de soldadura 5 grados para evitar la alineación?",
      targetTerms: ["servo drive trip", "approach angle", "external axis"]
    },
    {
      speaker: "Ing. Carlos Garza",
      text: "Yes. I adjusted the orientation vector in the teach pendant and ran a dry cycle at 20% reduced speed. The robot cleared the weld sequence with zero axis resonance, maintaining our required plus-minus 0.02mm repeatability.",
      translation: "Sí. Ajusté el vector de orientación en el teach pendant y ejecuté un ciclo en seco al 20% de velocidad reducida. El robot completó la secuencia de soldadura con cero resonancia de ejes, manteniendo nuestra repetibilidad requerida de más-menos 0.02 mm.",
      targetTerms: ["teach pendant", "dry cycle", "repeatability"]
    },
    {
      speaker: "Kevin Miller",
      text: "Excellent work, Carlos. Upload the modified robot program (TP file) to the central cell repository and let's sign off on the production validation run.",
      translation: "Excelente trabajo, Carlos. Sube el programa del robot modificado (archivo TP) al repositorio central de la celda y firmemos la corrida de validación de producción.",
      targetTerms: ["robot program", "production validation run"]
    }
  ],
  contrastTips: [
    {
      school: "The arm machine stopped because it cannot move.",
      native: "The 6-axis articulated robot faulted out due to a kinematic wrist singularity during linear TCP interpolation.",
      explanation: "Usa la terminología formal de cinemática inversa y describe la causa raíz en lugar de 'the machine stopped'."
    }
  ]
};

const robotGoldLexiconMatrix = [
  {
    term: "Inverse Kinematics (IK)",
    ipa: "/ɪnˈvɜːs ˌkɪn.əˈmæt.ɪks/",
    es: "Cinemática Inversa",
    category: "Matemáticas de Control",
    definition: "Mathematical computation determining the required joint angles to position an end-effector at a specified Cartesian pose.",
    collocations: ["solve inverse kinematics", "analytical vs numerical IK", "IK solver convergence"],
    falseFriends: "No confundir con 'inverso' general. Es el cálculo inverso de la geometría del manipulador.",
    nativeUsage: "The robot controller calculates real-time inverse kinematics solutions at a 1-millisecond clock rate."
  },
  {
    term: "Tool Center Point (TCP)",
    ipa: "/tuːl ˈsɛn.tər pɔɪnt/",
    es: "Punto Central de la Herramienta (TCP)",
    category: "Geometría de Herramental",
    definition: "The origin coordinate of the tool frame located at the working tip of the end-effector.",
    collocations: ["calibrate the TCP", "TCP 4-point method", "TCP speed vector", "reorient around TCP"],
    falseFriends: "No es el centro de la máquina, sino el punto exacto de contacto donde se suelda, corta o ensambla.",
    nativeUsage: "Accurate TCP calibration ensures that the robot can rotate around a fixed spatial point without lateral drift."
  },
  {
    term: "Kinematic Singularity",
    ipa: "/ˌkɪn.əˈmæt.ɪk ˌsɪŋ.ɡjʊˈlær.ɪ.ti/",
    es: "Singularidad Cinemática",
    category: "Dinámica y Límites",
    definition: "Configuration where joint axes align, causing the Jacobian matrix to lose rank and demanding infinite joint velocity.",
    collocations: ["wrist singularity", "shoulder singularity", "singularity avoidance algorithm"],
    falseFriends: "No es singularidad gravitacional ni astronómica; es una pérdida matemática de grados de libertad mecánicos.",
    nativeUsage: "The path planner automatically routes trajectories around kinematic singularities to prevent axis overspeed faults."
  },
  {
    term: "End-Effector",
    ipa: "/ɛnd ɪˈfɛk.tər/",
    es: "Efector Final / Herramienta de Brazo",
    category: "Mecánica Terminal",
    definition: "The peripheral device attached to the robot mounting flange that interacts with workpieces (gripper, welder, laser).",
    collocations: ["pneumatic end-effector", "quick-change tool flange", "end-effector payload capacity"],
    falseFriends: "No es simplemente 'la mano'; abarca pistolas de soldadura, cabezales láser y ventosas de vacío.",
    nativeUsage: "The dual-vacuum end-effector can pick and place two lithium-ion battery cells simultaneously."
  },
  {
    term: "Pose Repeatability (ISO 9283)",
    ipa: "/poʊz rɪˌpiː.təˈbɪl.ɪ.ti/",
    es: "Repetibilidad de Pose",
    category: "Métrica de Calidad",
    definition: "Closeness of agreement between the poses attained by a robot after moving to the same command position multiple times.",
    collocations: ["high repeatability", "sub-millimeter repeatability (±0.02mm)", "repeatability drift"],
    falseFriends: "Diferente de 'Accuracy'. Un robot puede ser muy repetible (dar siempre en el mismo punto) aunque esté ligeramente descalibrado del punto absoluto.",
    nativeUsage: "This high-speed SCARA robot offers a pose repeatability of ±0.01mm for surface-mount component placement."
  },
  {
    term: "Teach Pendant",
    ipa: "/tiːtʃ ˈpɛn.dənt/",
    es: "Consola de Programación / Teach Pendant",
    category: "Interfaz Hombre-Máquina",
    definition: "Handheld control terminal with a deadman switch used to manually jog the robot, teach waypoints, and write routines.",
    collocations: ["enable the teach pendant", "jog the robot axes", "3-position deadman switch"],
    falseFriends: "No es un 'colgante' decorativo; es la consola industrial de control manual con pantalla táctil y botones de seguridad.",
    nativeUsage: "The robotics technician depressed the deadman switch to half-position to jog Axis 2 using the teach pendant."
  }
];

const robotGoldSocraticChallenges = [
  {
    step: 1,
    concept: "TCP and Kinematic Transformations",
    botQuestion: "Welcome to the Robotics Socratic Evaluation! Explain what a Tool Center Point (TCP) is and why calibration is vital before teaching points on an automated spot-welding line. What happens if the TCP is off by 2 millimeters?",
    requiredKeywords: ["tcp", "tool", "center", "point", "calibrate", "weld", "flange", "frame", "accuracy", "error"],
    minKeywords: 3,
    feedbackSuccess: "Excellent! The TCP defines the focal point where the welding gun tip contacts the metal. If the TCP is uncalibrated, rotating the torch will sweep the tip in an arc rather than pivoting in place, missing weld seams and causing collision trips.",
    feedbackRetry: "Remember: The Tool Center Point (TCP) is the exact spatial coordinate of the working tip. If it's not calibrated accurately, what happens when the robot attempts to rotate around that point during a weld?"
  },
  {
    step: 2,
    concept: "Kinematic Singularities in 6-Axis Robots",
    botQuestion: "In an industrial cell audit, how would you explain a 'Kinematic Wrist Singularity' to a non-technical plant director? Why does the robot trigger an overcurrent fault when two axes align collinearly?",
    requiredKeywords: ["singularity", "wrist", "axes", "align", "collinear", "velocity", "infinite", "jacobian", "overcurrent", "motor"],
    minKeywords: 3,
    feedbackSuccess: "Outstanding explanation! When Axis 4 and Axis 6 align collinearly, the robot mathematically loses one degree of freedom. To maintain a straight linear path, the controller commands the motor to spin at infinite angular speed, which instantly triggers an overcurrent safety trip.",
    feedbackRetry: "Think of arm alignment: when two rotational axes line up along the same straight line, the arm can't move sideways without spinning the joint infinitely fast. Mention axes alignment and motor current!"
  }
];

if (LXP_COURSES["robotics-automation"]) {
  const robTrack = LXP_COURSES["robotics-automation"];
  if (robTrack.modules && robTrack.modules[0]) {
    const mod1 = robTrack.modules[0];
    mod1.isGoldModel = true;
    mod1.goldBadge = "⭐ MODELO GOLD ESP";
    mod1.title = "6-Axis Kinematics & TCP Calibration";
    mod1.titleES = "Cinemática de 6 Ejes y Calibración de TCP (Modelo Gold)";
    mod1.dialogue = robotGoldDialogue;
    mod1.lexiconMatrix = robotGoldLexiconMatrix;
    mod1.socraticChallenges = robotGoldSocraticChallenges;
    console.log('✓ Successfully injected Gold Model into robotics-automation (robot-m1)');
  }
}

// Write back to courses.js
const header = `/**
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

// Make available for window and import
if (typeof window !== 'undefined') {
    window.LXP_CATEGORIES = LXP_CATEGORIES;
    window.LXP_COURSES = LXP_COURSES;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LXP_CATEGORIES: LXP_CATEGORIES,
        LXP_COURSES: LXP_COURSES
    };
}
`;

fs.writeFileSync(coursesPath, header, 'utf8');
console.log('Master database successfully updated with Gold Models in:', coursesPath);
