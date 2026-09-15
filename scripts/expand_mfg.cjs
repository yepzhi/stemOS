// scripts/expand_mfg.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Advanced Manufacturing:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// ADVANCED MANUFACTURING: GD&T & Additive Manufacturing (mfg-m1)
// -------------------------------------------------------------
const mfgReading = `
> **Industry Alignment & Engineering Standard**: Aligned with **ASME Y14.5 (GD&T)** and **ASTM International Committee F42 on Additive Manufacturing Technologies**. Essential for Manufacturing Engineers, CNC Machinists, and Quality Inspectors.

# Engineering and Advanced Manufacturing

Modern manufacturing has moved far beyond simple assembly lines. The production of aerospace turbines, medical implants, and high-performance automotive components requires microscopic precision and a universal engineering language to communicate exactly what needs to be built.

## 1. Geometric Dimensioning and Tolerancing (GD&T)
GD&T is the universal language of engineering design. It is a system of symbols and rules used on engineering drawings to communicate manufacturing constraints.
- **Tolerances**: No manufacturing process is perfect; every cut has a margin of error. A tolerance specifies how much variation is allowed from the nominal dimension. If a tolerance is too tight, the part becomes unnecessarily expensive to machine.
- **Datums**: A theoretically exact plane, axis, or point location that GD&T tolerances are referenced to. Think of it as the "anchor" from which all measurements are taken.
- **Feature Control Frame**: A rectangular box on a drawing that contains the geometric characteristic symbol (e.g., flatness, perpendicularity, true position), the tolerance value, and the referenced datums.

## 2. CNC Machining (Subtractive Manufacturing)
Computer Numerical Control (CNC) machining involves removing material from a solid block to achieve the desired shape.
- **Milling and Turning**: In **milling**, the cutting tool rotates while the workpiece is stationary. In **turning** (using a lathe), the workpiece rotates while the cutting tool is stationary.
- **G-Code**: The programming language that tells the CNC machine exactly where to move the cutting tool, how fast to spin the spindle, and when to turn on the coolant.

## 3. Additive Manufacturing (3D Printing)
Instead of cutting material away, Additive Manufacturing (AM) builds a part layer by layer.
- **Selective Laser Sintering (SLS)**: A high-power laser fuses small particles of polymer powder into a solid structure based on a 3D CAD model.
- **Direct Metal Laser Sintering (DMLS)**: Similar to SLS, but it melts metal powders (e.g., titanium or Inconel) to create fully dense metal parts. DMLS is heavily used in aerospace to print complex internal cooling channels inside rocket engine nozzles—geometries that are physically impossible to create using traditional CNC machining.
- **Post-Processing**: Additive parts rarely come out of the printer ready for use. They often require heat treatment to relieve internal stresses and CNC machining to achieve the tight surface finish tolerances required by GD&T.

---
> **Key Takeaway**: The future of production blends the complex geometries of **Additive Manufacturing** with the extreme precision of **CNC Machining**, all strictly governed by the universal language of **GD&T**.
`;

const mfgDialogue = {
  title: "Quality Control: GD&T True Position Failure",
  titleES: "Control de Calidad: Falla de Posición Verdadera (GD&T)",
  scenarioContext: "Toluca, MX (Automotive Manufacturing Plant). Inspecting a machined engine block.",
  characters: [
    { name: "Ing. Roberto Valdez", role: "Quality Control Inspector", avatar: "RV", color: "var(--cyan)" },
    { name: "Sarah Miller", role: "CNC Programming Lead", avatar: "SM", color: "var(--amber)" }
  ],
  turns: [
    {
      speaker: "Ing. Roberto Valdez",
      text: "Sarah, we have a non-conformance on the latest batch of engine blocks. The CMM (Coordinate Measuring Machine) report shows that the four mounting holes are out of tolerance.",
      translation: "Sarah, tenemos una no conformidad (non-conformance) en el último lote de bloques de motor. El reporte de la CMM (Máquina de Medición por Coordenadas) muestra que los cuatro agujeros de montaje están fuera de tolerancia.",
      targetTerms: ["non-conformance", "engine blocks", "Coordinate Measuring Machine", "out of tolerance"]
    },
    {
      speaker: "Sarah Miller",
      text: "Out of tolerance? I checked the diameter with a micrometer, and it’s perfectly within the +/- 0.05 millimeter spec.",
      translation: "¿Fuera de tolerancia? Revisé el diámetro con un micrómetro y está perfectamente dentro de la especificación de +/- 0.05 milímetros.",
      targetTerms: ["diameter", "micrometer", "spec"]
    },
    {
      speaker: "Ing. Roberto Valdez",
      text: "The diameter is fine. The issue is the GD&T Feature Control Frame. The true position of the holes relative to Datum A and Datum B shifted by 0.2 millimeters. The mating part won't align.",
      translation: "El diámetro está bien. El problema es el Marco de Control de Características de GD&T (Feature Control Frame). La posición verdadera (true position) de los agujeros en relación con el Datum A y el Datum B se desplazó 0.2 milímetros. La pieza de acoplamiento no se alineará.",
      targetTerms: ["GD&T", "Feature Control Frame", "true position", "Datum", "mating part", "align"]
    },
    {
      speaker: "Sarah Miller",
      text: "Ah, I see. The spindle must have experienced thermal expansion during the heavy milling operation, causing the tool path to drift. I will update the G-Code to add a cool-down pause before drilling those critical holes.",
      translation: "Ah, ya veo. El husillo (spindle) debe haber experimentado expansión térmica durante la operación de fresado pesado, causando que la trayectoria de la herramienta (tool path) se desvíe. Actualizaré el Código G (G-Code) para agregar una pausa de enfriamiento antes de perforar esos agujeros críticos.",
      targetTerms: ["spindle", "thermal expansion", "milling operation", "tool path", "drift", "G-Code"]
    }
  ],
  contrastTips: [
    {
      school: "The holes are in the wrong place.",
      native: "The true position of the holes relative to Datum A is out of tolerance.",
      explanation: "En la manufactura de precisión, no se dice 'el lugar equivocado'; se especifica la falla exacta en GD&T: 'True Position out of tolerance relative to a Datum'."
    },
    {
      school: "The machine got too hot and moved.",
      native: "The spindle experienced thermal expansion, causing the tool path to drift.",
      explanation: "Los ingenieros describen el fenómeno físico exacto: 'thermal expansion' (expansión térmica) del 'spindle' (husillo) que afecta el 'tool path' (trayectoria de la herramienta)."
    }
  ]
};

const mfgLexicon = [
  {
    term: "GD&T",
    ipa: "/dʒiː-diː-æn-tiː/",
    es: "Dimensionamiento y Tolerancias Geométricas",
    category: "Ingeniería de Diseño",
    definition: "Geometric Dimensioning and Tolerancing. A system of symbols, rules, and definitions used to define the nominal geometry of parts and assemblies, to communicate the allowable variation in form and possible size of individual features.",
    collocations: ["GD&T symbols", "ASME Y14.5", "Feature Control Frame"],
    falseFriends: "Es un lenguaje visual internacional; los planos en Alemania, Japón y EE.UU. usan exactamente los mismos símbolos GD&T.",
    nativeUsage: "The engineering drawing uses GD&T to ensure the aerospace parts are perfectly interchangeable on the assembly line."
  },
  {
    term: "Datum",
    ipa: "/ˈdeɪ.təm/",
    es: "Datum / Referencia Geométrica",
    category: "GD&T",
    definition: "A theoretically exact plane, point, or axis from which dimensional measurements are made to other features on the part.",
    collocations: ["Datum A", "primary datum reference", "Datum simulator"],
    falseFriends: "En este contexto no significa 'dato' (información); es una referencia física de anclaje geométrico.",
    nativeUsage: "Before inspecting the true position of the holes, the part must be clamped flush against Datum A."
  },
  {
    term: "True Position",
    ipa: "/truː pəˈzɪʃ.ən/",
    es: "Posición Verdadera",
    category: "GD&T",
    definition: "The exact, theoretically perfect coordinate location of a feature, such as the center of a hole, as defined by basic dimensions on a drawing.",
    collocations: ["true position tolerance", "out of position", "feature control frame"],
    falseFriends: "No es una 'posición honesta'; es la coordenada (X,Y,Z) matemáticamente perfecta dictada por el plano.",
    nativeUsage: "The hole's diameter was correct, but its true position drifted by 0.1mm, causing assembly issues."
  },
  {
    term: "Spindle",
    ipa: "/ˈspɪn.dəl/",
    es: "Husillo",
    category: "Maquinado CNC",
    definition: "The rotating axis of the machine, which often has a shaft at its heart. In a milling machine, the spindle holds and spins the cutting tool. In a lathe, it holds and spins the workpiece.",
    collocations: ["spindle speed", "high-speed spindle", "spindle thermal expansion"],
    falseFriends: "No es un 'huso' de tejer; es el eje rotatorio principal de alta potencia de una máquina CNC.",
    nativeUsage: "Increase the spindle speed to 10,000 RPM to achieve a smoother surface finish on the aluminum block."
  },
  {
    term: "Additive Manufacturing",
    ipa: "/ˈæd.ɪ.tɪv ˌmæn.jəˈfæk.tʃɚ.ɪŋ/",
    es: "Manufactura Aditiva (Impresión 3D)",
    category: "Procesos de Producción",
    definition: "The process of joining materials to make objects from 3D model data, usually layer upon layer, as opposed to subtractive manufacturing methodologies (like CNC machining).",
    collocations: ["metal additive manufacturing", "DMLS", "layer-by-layer"],
    falseFriends: "No es 'añadir extras'; es el término industrial formal para la impresión 3D a nivel de ingeniería.",
    nativeUsage: "The complex internal cooling channels of the rocket nozzle can only be created using metal additive manufacturing."
  },
  {
    term: "Coordinate Measuring Machine (CMM)",
    ipa: "/koʊˈɔːr.dən.ət ˈmɛʒ.ər.ɪŋ məˈʃiːn/",
    es: "Máquina de Medición por Coordenadas (MMC)",
    category: "Control de Calidad",
    definition: "A device that measures the geometry of physical objects by sensing discrete points on the surface of the object with a probe, verifying if the part meets GD&T specifications.",
    collocations: ["CMM report", "touch probe", "automated CMM inspection"],
    falseFriends: "No es una máquina de coser; es un robot de altísima precisión usado en laboratorios de metrología.",
    nativeUsage: "The CMM inspection report proved that the aerospace turbine blade perfectly matched the CAD model."
  }
];

const mfgSocratic = [
  {
    step: 1,
    concept: "GD&T & Datums",
    botQuestion: "Welcome to the Metrology Lab! When reading an engineering drawing, what is the acronym for the system of symbols (Geometric Dimensioning and Tolerancing)? And what do we call the 'exact reference plane' or anchor point that all measurements are taken from?",
    requiredKeywords: ["gd&t", "datum", "reference", "measurements"],
    minKeywords: 2,
    feedbackSuccess: "Perfect! GD&T is the universal language of engineering, and a 'Datum' is the exact reference plane used to anchor the measurements.",
    feedbackRetry: "The acronym stands for Geometric Dimensioning & Tolerancing (4 letters/symbols). The 'anchor point' for measurements starts with the letter 'D'."
  },
  {
    step: 2,
    concept: "Subtractive vs Additive & CNC",
    botQuestion: "If a CNC machine cuts material away from a solid block of aluminum to make a part, is that 'additive' or 'subtractive' manufacturing? What is the name of the rotating shaft (starts with 'S') that holds the cutting tool in the CNC machine?",
    requiredKeywords: ["subtractive", "spindle", "rotating", "cnc", "cutting"],
    minKeywords: 2,
    feedbackSuccess: "Spot-on! CNC machining is 'subtractive' because it removes material. The rotating shaft that spins the cutting tool is called the 'spindle'.",
    feedbackRetry: "Think about math: if you are cutting material AWAY, are you adding or subtracting? And what is the technical term for the spinning axis that holds the drill bit? (Starts with S-P-I-N...)"
  }
];

if (!LXP_COURSES["advanced-manufacturing"]) {
  LXP_COURSES["advanced-manufacturing"] = {
    id: "advanced-manufacturing",
    category: "cat-engineering",
    title: "Engineering & Advanced Manufacturing",
    titleES: "Ingeniería y Manufactura Avanzada",
    icon: "🏭",
    desc: "Master GD&T (ASME Y14.5), CNC machining vocabulary, and metal additive manufacturing (DMLS).",
    descES: "Domina GD&T (ASME Y14.5), vocabulario de maquinado CNC y manufactura aditiva metálica (DMLS).",
    modules_required: 1,
    modules: [
      {
        id: "mfg-m1",
        title: "GD&T & Additive Manufacturing",
        titleES: "GD&T y Manufactura Aditiva",
        isGoldModel: true,
        readings: [
          {
            id: "mfg-m1-r1",
            title: "Precision Engineering & CNC",
            duration: "12 min",
            content: mfgReading,
            vocabulary: mfgLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: mfgDialogue,
        lexiconMatrix: mfgLexicon,
        socraticChallenges: mfgSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["advanced-manufacturing"].modules[0] = {
    id: "mfg-m1",
    title: "GD&T & Additive Manufacturing",
    titleES: "GD&T y Manufactura Aditiva",
    isGoldModel: true,
    readings: [
      {
        id: "mfg-m1-r1",
        title: "Precision Engineering & CNC",
        duration: "12 min",
        content: mfgReading,
        vocabulary: mfgLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: mfgDialogue,
    lexiconMatrix: mfgLexicon,
    socraticChallenges: mfgSocratic,
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
console.log('Successfully added Advanced Manufacturing module to courses.js');
