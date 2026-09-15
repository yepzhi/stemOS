// scripts/expand_nano.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Nano:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// MATERIALS & NANOTECH: Advanced Materials Characterization (nano-m1)
// -------------------------------------------------------------
const nanoReading = `
> **Industry Alignment & Testing Standard**: Aligned with **ASTM International Standards for Advanced Materials** and **ISO/TS 80004 (Nanotechnologies)**. Essential for Materials Scientists, Metallurgical Engineers, and Nanofabrication Technicians.

# Advanced Materials and Nanotechnology

The boundaries of modern engineering are entirely dictated by the properties of the materials available. From the thermal shielding on a spacecraft to the structural integrity of a hydrogen fuel cell, breakthroughs in technology are fundamentally breakthroughs in materials science and nanotechnology.

## 1. The Nanoscale and Quantum Effects
Nanotechnology involves the manipulation of matter on an atomic, molecular, and supramolecular scale—typically between 1 and 100 nanometers.
- **Surface Area to Volume Ratio**: As particles shrink to the nanoscale, their surface area relative to their volume increases exponentially. This makes nanoparticles highly reactive, which is critical for designing more efficient catalysts in industrial chemistry or batteries.
- **Quantum Confinement**: Below 10 nanometers, classical physics gives way to quantum mechanics. Materials like **Quantum Dots** exhibit unique optical and electronic properties simply based on their physical size, enabling ultra-precise medical imaging and advanced displays.

## 2. Advanced Composites and Metamaterials
Modern aerospace and automotive industries rely heavily on replacing heavy metals with advanced engineered materials.
- **Carbon Fiber Reinforced Polymers (CFRP)**: These composites provide a strength-to-weight ratio vastly superior to aluminum or steel. However, they are anisotropic (their strength is directional) and prone to delamination under impact.
- **Metamaterials**: Artificial materials engineered to have properties that have not yet been found in nature. By structuring a material's physical geometry at a scale smaller than the wavelength of the phenomena they influence, engineers can manipulate electromagnetic waves (e.g., creating invisibility cloaks for radar or super-lenses).

## 3. Material Characterization
Before a new material can be used in a commercial product, its physical and chemical properties must be rigorously characterized using advanced microscopy and spectroscopy.
- **SEM (Scanning Electron Microscopy)**: Uses a focused beam of electrons to generate high-resolution, 3D-like topographical images of a material's surface, essential for identifying micro-fractures or grain boundaries.
- **XRD (X-Ray Diffraction)**: A non-destructive technique used to determine the crystallographic structure of a material, revealing the atomic arrangement and identifying specific chemical compounds within a sample.

---
> **Key Takeaway**: Controlling matter at the nanoscale via **Quantum Confinement** and engineering **Advanced Composites** allows us to surpass the limits of natural materials. However, these innovations demand strict characterization using **SEM** and **XRD** to guarantee structural integrity.
`;

const nanoDialogue = {
  title: "Material Failure Analysis: Composite Delamination",
  titleES: "Análisis de Falla de Material: Delaminación de Compuesto",
  scenarioContext: "Querétaro, MX (Aerospace Cluster). Reviewing a structural failure in a carbon fiber drone wing.",
  characters: [
    { name: "Dr. Hector Silva", role: "Chief Metallurgist & Materials Scientist", avatar: "HS", color: "var(--cyan)" },
    { name: "Laura Chen", role: "Quality Engineering Lead", avatar: "LC", color: "var(--emerald)" }
  ],
  turns: [
    {
      speaker: "Laura Chen",
      text: "Dr. Silva, the latest batch of drone wings failed the stress test. The Carbon Fiber Reinforced Polymer (CFRP) panels snapped at 80% of the designed load limit.",
      translation: "Dr. Silva, el último lote de alas de dron falló la prueba de estrés. Los paneles de Polímero Reforzado con Fibra de Carbono (CFRP) se rompieron al 80% del límite de carga diseñado.",
      targetTerms: ["stress test", "Carbon Fiber Reinforced Polymer", "CFRP", "load limit"]
    },
    {
      speaker: "Dr. Hector Silva",
      text: "I analyzed the fracture under the Scanning Electron Microscope (SEM). The failure wasn't in the carbon fibers themselves. The images show massive delamination between the composite layers.",
      translation: "Analicé la fractura bajo el Microscopio Electrónico de Barrido (SEM). La falla no fue en las fibras de carbono en sí. Las imágenes muestran una delaminación masiva entre las capas del compuesto.",
      targetTerms: ["fracture", "Scanning Electron Microscope", "SEM", "delamination", "composite layers"]
    },
    {
      speaker: "Laura Chen",
      text: "If it's delamination, the epoxy resin matrix must have cured improperly in the autoclave. Could there be a contaminant or a void in the matrix?",
      translation: "Si es delaminación, la matriz de resina epoxi debió haberse curado incorrectamente en el autoclave. ¿Podría haber un contaminante o un vacío (void) en la matriz?",
      targetTerms: ["epoxy resin matrix", "cured", "autoclave", "contaminant", "void"]
    },
    {
      speaker: "Dr. Hector Silva",
      text: "Exactly. We're running an X-Ray Diffraction (XRD) scan now to check for crystallization anomalies in the resin. Until we identify the root cause, place a hold on all CFRP layup processes.",
      translation: "Exactamente. Estamos realizando un escaneo de Difracción de Rayos X (XRD) ahora para verificar anomalías de cristalización en la resina. Hasta que identifiquemos la causa raíz, suspenda todos los procesos de laminado (layup) de CFRP.",
      targetTerms: ["X-Ray Diffraction", "XRD", "crystallization anomalies", "root cause", "layup processes"]
    }
  ],
  contrastTips: [
    {
      school: "The plastic broke because it was weak.",
      native: "The CFRP panel suffered delamination under the applied stress load.",
      explanation: "En ingeniería de materiales, los compuestos no 'se rompen' simplemente; sufren fallas específicas como 'delamination' (separación de capas) o 'fracture' debido a un 'stress load' (carga de estrés)."
    },
    {
      school: "Let's look at the material closely.",
      native: "We need to characterize the fracture using Scanning Electron Microscopy (SEM).",
      explanation: "El término profesional para analizar la estructura microscópica de un material es 'characterize' (caracterizar), utilizando equipos específicos como el SEM."
    }
  ]
};

const nanoLexicon = [
  {
    term: "Nanoscale",
    ipa: "/ˈnæn.oʊˌskeɪl/",
    es: "Nanoescala",
    category: "Física",
    definition: "A scale of length ranging from 1 to 100 nanometers, where materials begin to exhibit unique quantum and physical properties not seen in bulk materials.",
    collocations: ["nanoscale engineering", "surface area", "quantum confinement"],
    falseFriends: "No es simplemente 'muy pequeño'; es la escala específica donde la física clásica deja de funcionar y domina la mecánica cuántica.",
    nativeUsage: "At the nanoscale, gold particles change color and become highly reactive catalysts."
  },
  {
    term: "Delamination",
    ipa: "/diːˌlæm.əˈneɪ.ʃən/",
    es: "Delaminación",
    category: "Falla de Materiales",
    definition: "A mode of failure in laminated composite materials where the layers separate, causing a significant loss of mechanical toughness and structural integrity.",
    collocations: ["interlaminar delamination", "composite failure", "shear stress"],
    falseFriends: "No tiene que ver con 'laminar' un documento de identidad; es cuando las capas de un material compuesto de alta tecnología se despegan.",
    nativeUsage: "The carbon fiber wing experienced catastrophic delamination after a bird strike impact."
  },
  {
    term: "Scanning Electron Microscopy (SEM)",
    ipa: "/ˈskæn.ɪŋ ɪˈlɛk.trɑːn maɪˈkrɑː.skə.pi/",
    es: "Microscopía Electrónica de Barrido (MEB)",
    category: "Caracterización",
    definition: "A type of electron microscope that produces images of a sample by scanning the surface with a focused beam of electrons, providing detailed 3D topographical information.",
    collocations: ["SEM analysis", "surface topography", "electron beam"],
    falseFriends: "Es 'Scanning' (barrido), no 'Scamming' (estafa).",
    nativeUsage: "We used SEM to characterize the micro-fractures in the 3D-printed titanium alloy."
  },
  {
    term: "X-Ray Diffraction (XRD)",
    ipa: "/ˈɛks.reɪ dɪˈfræk.ʃən/",
    es: "Difracción de Rayos X (DRX)",
    category: "Caracterización",
    definition: "An analytical technique primarily used for phase identification of a crystalline material and can provide information on unit cell dimensions.",
    collocations: ["XRD pattern", "crystal structure", "phase identification"],
    falseFriends: "No es una simple radiografía médica; se usa para ver cómo están ordenados los átomos en un cristal.",
    nativeUsage: "The XRD results confirmed that the battery cathode material was properly crystallized without impurities."
  },
  {
    term: "Composite Material",
    ipa: "/kəmˈpɑː.zɪt məˈtɪr.i.əl/",
    es: "Material Compuesto",
    category: "Ingeniería",
    definition: "A material produced from two or more constituent materials with notably different chemical or physical properties that, when merged, create a material with characteristics different from the individual components.",
    collocations: ["fiber-reinforced composite", "epoxy matrix", "high strength-to-weight ratio"],
    falseFriends: "No es un material 'compostable' (para abono); es un material avanzado hecho de varias partes (ej. fibra de carbono + resina).",
    nativeUsage: "Aerospace engineers prefer composite materials because they are lighter than aluminum but stronger than steel."
  },
  {
    term: "Quantum Dots",
    ipa: "/ˈkwɑːn.təm dɑːts/",
    es: "Puntos Cuánticos",
    category: "Nanotecnología",
    definition: "Nanoscale semiconductor particles whose electronic and optical properties are highly tunable by simply changing their size, due to quantum mechanical effects.",
    collocations: ["tunable bandgap", "medical imaging", "QLED displays"],
    falseFriends: "No son 'puntos' hechos de átomos al azar; son semiconductores cristalinos exactos.",
    nativeUsage: "By adjusting the size of the quantum dots, we can tune the solar cell to absorb specific wavelengths of infrared light."
  }
];

const nanoSocratic = [
  {
    step: 1,
    concept: "Nanoscale & Properties",
    botQuestion: "Welcome to the Materials Science Lab! When a material shrinks down to the 'nanoscale' (1-100 nm), what happens to its surface-area-to-volume ratio? How does this affect its chemical reactivity?",
    requiredKeywords: ["nanoscale", "surface", "area", "volume", "ratio", "increases", "reactive"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! At the nanoscale, the surface area to volume ratio increases exponentially. This makes nanoparticles highly reactive and excellent catalysts.",
    feedbackRetry: "Think about cutting a block into millions of tiny pieces. You expose more of the inside. What happens to the 'surface area' compared to its 'volume'? Does it become more or less chemically reactive?"
  },
  {
    step: 2,
    concept: "Composites & Delamination",
    botQuestion: "If an aerospace engineer is testing a Carbon Fiber Reinforced Polymer (CFRP) wing and it fails because the layers peel apart, what is the specific engineering term for this failure? What instrument (acronym) would you use to examine the surface fracture up close?",
    requiredKeywords: ["delamination", "layers", "composite", "sem", "scanning", "electron", "microscope", "microscopy"],
    minKeywords: 2,
    feedbackSuccess: "Perfect! The separation of layers in a composite is called 'delamination', and a Materials Scientist would use an SEM (Scanning Electron Microscope) to characterize the fracture topography.",
    feedbackRetry: "When the layers of a laminated composite separate, it's called 'de-_______-ation'. To look at the tiny micro-fractures on the surface, what 3-letter acronym is used for the electron microscope?"
  }
];

if (!LXP_COURSES["materials-nanotech"]) {
  LXP_COURSES["materials-nanotech"] = {
    id: "materials-nanotech",
    category: "cat-science",
    title: "Materials Science & Nanotechnology",
    titleES: "Ciencia de Materiales y Nanotecnología",
    icon: "🔬",
    desc: "Master material characterization (SEM/XRD), quantum confinement, and advanced composites.",
    descES: "Domina la caracterización de materiales (SEM/XRD), confinamiento cuántico y materiales compuestos avanzados.",
    modules_required: 1,
    modules: [
      {
        id: "nano-m1",
        title: "Advanced Materials & Characterization",
        titleES: "Materiales Avanzados y Caracterización",
        isGoldModel: true,
        readings: [
          {
            id: "nano-m1-r1",
            title: "Nanoscale Physics & Composites",
            duration: "11 min",
            content: nanoReading,
            vocabulary: nanoLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: nanoDialogue,
        lexiconMatrix: nanoLexicon,
        socraticChallenges: nanoSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["materials-nanotech"].modules[0] = {
    id: "nano-m1",
    title: "Advanced Materials & Characterization",
    titleES: "Materiales Avanzados y Caracterización",
    isGoldModel: true,
    readings: [
      {
        id: "nano-m1-r1",
        title: "Nanoscale Physics & Composites",
        duration: "11 min",
        content: nanoReading,
        vocabulary: nanoLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: nanoDialogue,
    lexiconMatrix: nanoLexicon,
    socraticChallenges: nanoSocratic,
    quiz: []
  };
}

const header = `/**
 * stemOS LXP Course Content Database
 * ====================================
 * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks
 */

var LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};

var LXP_COURSES = ${JSON.stringify(LXP_COURSES, null, 4)};

if (typeof window !== 'undefined') {
    window.LXP_CATEGORIES = LXP_CATEGORIES;
    window.LXP_COURSES = LXP_COURSES;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LXP_CATEGORIES, LXP_COURSES };
}
`;

fs.writeFileSync(coursesPath, header, 'utf8');
console.log('Successfully added Nano module to courses.js');
