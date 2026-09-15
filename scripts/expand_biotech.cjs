// scripts/expand_biotech.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Biotech:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// BIOTECH: Bioprocessing, cGMP & Cleanrooms (biotech-m1)
// -------------------------------------------------------------
const biotechReading = `
> **Industry Alignment & Regulatory Standard**: Aligned with **FDA 21 CFR Part 211 (cGMP)** and **ISO 14644 (Cleanrooms)**. Essential for Bioprocessing Engineers, Quality Assurance (QA) Specialists, and Life Science Technicians.

# Bioprocessing, cGMP, and Cleanroom Technology

The biotechnology industry transforms living cells into microscopic factories to produce life-saving therapeutics, such as monoclonal antibodies, vaccines, and recombinant proteins. Unlike traditional chemical synthesis, bioprocessing is highly sensitive to environmental factors and contamination.

## 1. Upstream and Downstream Processing
Biomanufacturing is divided into two distinct phases:
- **Upstream Processing**: The initial stage where genetically engineered cells (e.g., CHO - Chinese Hamster Ovary cells) are cultivated. It begins in small flasks and scales up to massive **Bioreactors** where temperature, pH, and dissolved oxygen are strictly controlled to maximize cell growth and protein expression.
- **Downstream Processing**: Once the cells have produced the target therapeutic, the protein must be isolated and purified. This involves **Centrifugation** to separate cells from the liquid broth, followed by **Chromatography** (e.g., affinity, ion-exchange) to capture the specific protein and remove impurities like host cell DNA and endotoxins.

## 2. cGMP (Current Good Manufacturing Practice)
The FDA strictly enforces cGMP regulations to ensure the identity, strength, quality, and purity of drug products.
- **Traceability**: Every raw material, equipment calibration, and operator action must be documented. The golden rule is: *"If it isn't documented, it didn't happen."*
- **SOPs (Standard Operating Procedures)**: Deviations from validated SOPs can result in a batch rejection (costing millions of dollars) or a severe FDA warning letter.
- **Aseptic Technique**: Operators must execute procedures without introducing microbial contamination.

## 3. Cleanroom Classification (ISO 14644)
Because therapeutics are often injected directly into patients, they must be manufactured in sterile environments.
- **Cleanrooms**: Specialized facilities where the concentration of airborne particles is controlled. They use **HEPA (High-Efficiency Particulate Air)** filters to sweep the room with clean air.
- **ISO Classifications**: Cleanrooms are graded by the number of particles per cubic meter. An **ISO Class 5** (formerly Class 100) environment is highly sterile and typically used for the final aseptic filling of vials, whereas an ISO Class 8 might be used for less critical prep areas.
- **Gowning**: Operators act as the biggest source of contamination. They must wear specialized sterile garments (bunny suits, goggles, double gloves) to prevent shedding skin cells and microbes into the controlled environment.

---
> **Key Takeaway**: A successful bioprocessing facility relies equally on the biological science in the **Bioreactor**, the rigorous documentation of **cGMP**, and the strict environmental control of an **ISO-certified Cleanroom**.
`;

const biotechDialogue = {
  title: "Upstream Deviation: Bioreactor Contamination",
  titleES: "Desviación en Upstream: Contaminación en Biorreactor",
  scenarioContext: "San Diego, CA (Biomanufacturing Hub). Shift Handover between Lead Bioprocess Engineer and QA Manager.",
  characters: [
    { name: "Dr. Elena Rojas", role: "Lead Bioprocess Engineer", avatar: "ER", color: "var(--cyan)" },
    { name: "Mark Stevenson", role: "Quality Assurance (QA) Manager", avatar: "MS", color: "var(--amber)" }
  ],
  turns: [
    {
      speaker: "Dr. Elena Rojas",
      text: "Mark, we have a critical deviation in Bioreactor B-104. During the upstream cultivation phase, the dissolved oxygen sensors spiked, and the CHO cell viability dropped from 98% to 65% in two hours.",
      translation: "Mark, tenemos una desviación crítica en el Biorreactor B-104. Durante la fase de cultivo upstream, los sensores de oxígeno disuelto se dispararon y la viabilidad de las células CHO cayó del 98% al 65% en dos horas.",
      targetTerms: ["critical deviation", "Bioreactor", "upstream", "dissolved oxygen", "cell viability"]
    },
    {
      speaker: "Mark Stevenson",
      text: "That indicates a potential microbial contamination. Did the operators log any pressure drops across the HEPA filters or breaches in aseptic technique during the media feed?",
      translation: "Eso indica una posible contaminación microbiana. ¿Registraron los operadores alguna caída de presión a través de los filtros HEPA o brechas en la técnica aséptica durante la alimentación del medio?",
      targetTerms: ["microbial contamination", "HEPA filters", "aseptic technique", "media feed"]
    },
    {
      speaker: "Dr. Elena Rojas",
      text: "The HEPA filter logs in the ISO Class 7 cleanroom look normal. However, I suspect a sterile seal failed on the addition port. We pulled a sample for bioburden testing, but we have to quarantine the batch.",
      translation: "Los registros del filtro HEPA en el cuarto limpio ISO Clase 7 se ven normales. Sin embargo, sospecho que falló un sello estéril en el puerto de adición. Tomamos una muestra para pruebas de biocarga (bioburden), pero tenemos que poner el lote en cuarentena.",
      targetTerms: ["ISO Class 7 cleanroom", "sterile seal", "addition port", "bioburden testing", "quarantine the batch"]
    },
    {
      speaker: "Mark Stevenson",
      text: "Under cGMP guidelines, we must initiate a CAPA (Corrective and Preventive Action) immediately. Halt downstream processing for this lot until the lab confirms the contaminant. If it's a mycoplasma breach, we'll need to decontaminate the entire suite.",
      translation: "Bajo las pautas cGMP, debemos iniciar un CAPA (Acción Correctiva y Preventiva) inmediatamente. Detén el procesamiento downstream para este lote hasta que el laboratorio confirme el contaminante. Si es una brecha de micoplasma, tendremos que descontaminar toda la suite.",
      targetTerms: ["cGMP guidelines", "CAPA", "downstream processing", "contaminant", "decontaminate"]
    }
  ],
  contrastTips: [
    {
      school: "The cells died because of bacteria.",
      native: "The CHO cell viability dropped due to a microbial contamination breach.",
      explanation: "En la industria biofarmacéutica, no se dice simplemente que las células murieron; se habla de la 'viabilidad celular' (cell viability) y 'contaminación microbiana' (microbial contamination)."
    },
    {
      school: "We need to fix the mistake and throw away the medicine.",
      native: "We must initiate a CAPA, quarantine the batch, and halt downstream processing.",
      explanation: "El cumplimiento de cGMP requiere terminología regulatoria exacta: CAPA (Corrective and Preventive Action), cuarentena ('quarantine') y detener la fase ('halt processing')."
    }
  ]
};

const biotechLexicon = [
  {
    term: "Bioreactor",
    ipa: "/ˌbaɪ.oʊ.riˈæk.tər/",
    es: "Biorreactor",
    category: "Equipamiento Upstream",
    definition: "A controlled vessel or system that supports a biologically active environment, used to grow cells or microorganisms under optimal conditions (temperature, pH, oxygen) to produce a desired biological product.",
    collocations: ["stainless steel bioreactor", "single-use bioreactor", "cell cultivation"],
    falseFriends: "No es un reactor nuclear; es un tanque de fermentación altamente controlado para cultivar células.",
    nativeUsage: "The CHO cells are currently in the exponential growth phase inside the 2000-liter bioreactor."
  },
  {
    term: "Downstream Processing",
    ipa: "/ˈdaʊn.striːm ˈprɑː.sɛ.sɪŋ/",
    es: "Procesamiento Downstream (Purificación)",
    category: "Fases de Manufactura",
    definition: "The recovery and purification of biosynthetic products, particularly pharmaceuticals, from natural sources such as animal or bacterial cell cultures. Involves chromatography and filtration.",
    collocations: ["downstream purification", "chromatography column", "protein recovery"],
    falseFriends: "No significa 'corriente abajo' en un río; en biotecnología es la fase donde se aísla y purifica el medicamento después de cultivarlo.",
    nativeUsage: "After the bioreactor harvest, the broth moves to downstream processing to separate the monoclonal antibodies from the host cell proteins."
  },
  {
    term: "cGMP",
    ipa: "/siː-dʒiː-ɛm-piː/",
    es: "Buenas Prácticas de Manufactura Actuales",
    category: "Asuntos Regulatorios",
    definition: "Current Good Manufacturing Practice. Regulations enforced by the FDA that provide for systems that assure proper design, monitoring, and control of manufacturing processes and facilities.",
    collocations: ["cGMP compliance", "FDA guidelines", "batch record documentation"],
    falseFriends: "Es un acrónimo. La 'c' (current) es vital porque las tecnologías y expectativas de calidad cambian constantemente.",
    nativeUsage: "Failing to sign the batch record exactly when the step was completed is a severe cGMP violation."
  },
  {
    term: "CAPA",
    ipa: "/ˈkæp.ə/",
    es: "Acción Correctiva y Preventiva",
    category: "Gestión de Calidad (QA)",
    definition: "Corrective and Preventive Action. A system for investigating, solving, and preventing deviations, non-conformances, and systemic issues in a manufacturing process.",
    collocations: ["initiate a CAPA", "root cause analysis", "close the CAPA report"],
    falseFriends: "No es una 'capa' de ropa; es el protocolo formal para investigar por qué falló algo y asegurar que no vuelva a pasar.",
    nativeUsage: "Because the cleanroom temperature exceeded the validated range, QA forced us to open a CAPA to investigate the HVAC failure."
  },
  {
    term: "HEPA Filter",
    ipa: "/ˈhɛp.ə ˈfɪl.tər/",
    es: "Filtro HEPA (Filtro de Aire de Alta Eficiencia)",
    category: "Sistemas Cleanroom",
    definition: "High-Efficiency Particulate Air filter. A type of pleated mechanical air filter designed to remove at least 99.97% of dust, pollen, mold, bacteria, and any airborne particles with a size of 0.3 microns.",
    collocations: ["HEPA filtration", "laminar flow hood", "airborne particulates"],
    falseFriends: "HEPA es un estándar estricto (0.3 micrones), no cualquier filtro de aire.",
    nativeUsage: "The ISO Class 5 filling suite relies on ceiling-mounted HEPA filters to maintain unidirectional clean airflow over the open vials."
  },
  {
    term: "Aseptic Technique",
    ipa: "/əˈsɛp.tɪk tɛkˈniːk/",
    es: "Técnica Aséptica",
    category: "Operaciones Cleanroom",
    definition: "A set of specific practices and procedures performed under carefully controlled conditions with the goal of minimizing contamination by pathogens.",
    collocations: ["strict aseptic technique", "sterile gowning", "microbial contamination"],
    falseFriends: "Asepsia significa ausencia de microbios, no simplemente 'limpio'.",
    nativeUsage: "Operators must demonstrate perfect aseptic technique when connecting the sterile transfer lines to the bioreactor."
  }
];

const biotechSocratic = [
  {
    step: 1,
    concept: "Upstream vs. Downstream",
    botQuestion: "Welcome to the Biotech QA Audit! In biomanufacturing, what is the primary difference between 'upstream' and 'downstream' processing? If I need to use chromatography to purify a monoclonal antibody, which phase am I in?",
    requiredKeywords: ["upstream", "grow", "cells", "bioreactor", "downstream", "purify", "isolate", "chromatography"],
    minKeywords: 3,
    feedbackSuccess: "Exactly! Upstream is where we grow the cells in the bioreactor, and downstream is where we purify the target protein. Chromatography is a classic downstream purification technique.",
    feedbackRetry: "Think about the sequence: first you cultivate the cells, then you extract the medicine. Which one is 'upstream' and which one involves purification ('downstream')?"
  },
  {
    step: 2,
    concept: "cGMP & CAPA",
    botQuestion: "Suppose a technician forgets to document a temperature check on the bioreactor batch record. According to 'cGMP' rules, why is this a massive problem, and what quality protocol (acronym starting with C) must be initiated to investigate it?",
    requiredKeywords: ["cgmp", "documented", "happen", "traceability", "capa", "corrective", "action"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! In cGMP, 'if it isn't documented, it didn't happen.' A missing signature breaks traceability, and QA must initiate a CAPA (Corrective and Preventive Action) to investigate the root cause.",
    feedbackRetry: "Remember the golden rule of FDA compliance: 'If it isn't _____, it didn't happen.' Also, what is the 4-letter acronym for 'Corrective and Preventive Action'?"
  }
];

if (!LXP_COURSES["biotechnology"]) {
  LXP_COURSES["biotechnology"] = {
    id: "biotechnology",
    category: "cat-science",
    title: "Biotechnology & Life Sciences",
    titleES: "Biotecnología y Ciencias de la Vida",
    icon: "🧬",
    desc: "Master cGMP regulations, upstream/downstream bioprocessing, and ISO cleanroom protocols.",
    descES: "Domina las regulaciones cGMP, el bioprocesamiento upstream/downstream y los protocolos de cuartos limpios ISO.",
    modules_required: 1,
    modules: [
      {
        id: "biotech-m1",
        title: "Bioprocessing, cGMP & Cleanrooms",
        titleES: "Bioprocesamiento, cGMP y Cuartos Limpios",
        isGoldModel: true,
        readings: [
          {
            id: "biotech-m1-r1",
            title: "Biomanufacturing & Quality Assurance",
            duration: "13 min",
            content: biotechReading,
            vocabulary: biotechLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: biotechDialogue,
        lexiconMatrix: biotechLexicon,
        socraticChallenges: biotechSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["biotechnology"].modules[0] = {
    id: "biotech-m1",
    title: "Bioprocessing, cGMP & Cleanrooms",
    titleES: "Bioprocesamiento, cGMP y Cuartos Limpios",
    isGoldModel: true,
    readings: [
      {
        id: "biotech-m1-r1",
        title: "Biomanufacturing & Quality Assurance",
        duration: "13 min",
        content: biotechReading,
        vocabulary: biotechLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: biotechDialogue,
    lexiconMatrix: biotechLexicon,
    socraticChallenges: biotechSocratic,
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
console.log('Successfully added Biotech module to courses.js');
