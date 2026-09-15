const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Biotechnology Modules 2-5...');

const track = LXP_COURSES["biotechnology"];
if (!track) {
    console.log("Track biotechnology not found!");
    process.exit(1);
}

// Module 2: CRISPR-Cas9 & Genetic Engineering Methodologies
track.modules[1] = {
    id: "biotech-m2",
    title: "CRISPR-Cas9 & Genetic Engineering Methodologies",
    titleES: "CRISPR-Cas9 y Metodologías de Ingeniería Genética",
    icon: "fa-solid fa-dna",
    readings: [
        {
            id: "biotech-m2-r1",
            title: "Precision Gene Editing",
            duration: "10 min",
            content: `
# Precision Gene Editing

For decades, genetic engineering relied on inefficient techniques like viral vectors to insert DNA randomly. **CRISPR-Cas9** changed everything by allowing scientists to edit DNA with absolute precision.

## The CRISPR Mechanism

CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) is actually a bacterial immune system used to fight off viruses. Scientists adapted it into a two-part tool:
1. **Cas9 Enzyme**: The "molecular scissors" that can cut the double-stranded DNA.
2. **Guide RNA (gRNA)**: A customizable piece of RNA that guides the Cas9 enzyme to the exact spot on the genome that needs to be cut.

## Knock-outs and Knock-ins

Once Cas9 cuts the DNA, the cell's natural repair mechanisms kick in:
- **NHEJ (Non-Homologous End Joining)**: A sloppy repair process that usually disables the gene (a "Knock-out"). Useful for turning off disease-causing genes.
- **HDR (Homology-Directed Repair)**: If scientists provide a DNA template, the cell will use it to fix the break, effectively pasting new genetic code into the genome (a "Knock-in").

---
> **Key Takeaway**: CRISPR-Cas9 revolutionized biotechnology because it is programmable, cheap, and works in almost every living organism, from bacteria to humans.
`,
            vocabulary: [
                {
                    en: "Genome",
                    es: "Genoma",
                    definition: "The complete set of genes or genetic material present in a cell or organism."
                },
                {
                    en: "Enzyme",
                    es: "Enzima",
                    definition: "A substance produced by a living organism which acts as a catalyst to bring about a specific biochemical reaction."
                },
                {
                    en: "Knock-out",
                    es: "Inactivación genética (Knock-out)",
                    definition: "A genetic technique in which an organism is engineered to carry genes that have been made inoperative."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: Downstream Processing: Chromatography & Ultrafiltration
track.modules[2] = {
    id: "biotech-m3",
    title: "Downstream Processing: Chromatography & Ultrafiltration",
    titleES: "Procesamiento Descendente: Cromatografía y Ultrafiltración",
    icon: "fa-solid fa-filter",
    readings: [
        {
            id: "biotech-m3-r1",
            title: "Purifying Biological Products",
            duration: "12 min",
            content: `
# Purifying Biological Products

In a bioreactor, genetically engineered bacteria produce a valuable protein (like insulin). But that protein is swimming in a "soup" of bacterial cells, nutrients, and waste. The process of extracting and purifying the target protein is called **Downstream Processing**.

## Centrifugation and Lysis

First, the cells must be separated from the liquid broth (often using huge industrial centrifuges). If the protein is inside the bacteria, the cells must be broken open (lysed) using high-pressure homogenizers.

## Chromatography

The most critical purification step is **Chromatography**. The liquid is pumped through a massive column packed with specialized resin beads.
- **Affinity Chromatography**: The beads are coated with a molecule that *only* binds to the target protein. Everything else washes through. The target protein is then released using a chemical wash.
- **Ion-Exchange Chromatography**: Separates proteins based on their electrical charge.

## Ultrafiltration

Finally, the purified protein must be concentrated. **Ultrafiltration** pushes the liquid through a microscopic membrane. The pores are just small enough to trap the protein while letting water and salts pass through.

---
> **Key Takeaway**: Downstream processing is often the most expensive and complex part of biomanufacturing, sometimes accounting for up to 80% of total production costs.
`,
            vocabulary: [
                {
                    en: "Downstream processing",
                    es: "Procesamiento descendente",
                    definition: "The recovery and purification of biosynthetic products from natural sources such as animal or bacterial tissue."
                },
                {
                    en: "Chromatography",
                    es: "Cromatografía",
                    definition: "A laboratory technique for the separation of a mixture into its components."
                },
                {
                    en: "Centrifuge",
                    es: "Centrífuga",
                    definition: "A machine with a rapidly rotating container that applies centrifugal force to its contents to separate fluids of different densities."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: Current Good Manufacturing Practices (cGMP) in Cleanrooms
track.modules[3] = {
    id: "biotech-m4",
    title: "Current Good Manufacturing Practices (cGMP) in Cleanrooms",
    titleES: "Buenas Prácticas de Manufactura (cGMP) en Cuartos Limpios",
    icon: "fa-solid fa-shield-virus",
    readings: [
        {
            id: "biotech-m4-r1",
            title: "Ensuring Sterility in Biomanufacturing",
            duration: "10 min",
            content: `
# Ensuring Sterility in Biomanufacturing

If you are manufacturing a biologic drug (like a monoclonal antibody) that will be injected into a patient's bloodstream, a single speck of dust or bacteria can be deadly.

## Cleanrooms

Biomanufacturing takes place in **Cleanrooms**. These are highly controlled environments classified by the maximum number of particles permitted per cubic meter of air.
- They use massive **HEPA (High-Efficiency Particulate Air)** filters to constantly cycle and clean the air.
- The rooms are kept at positive pressure, so if a door opens, air rushes *out*, preventing contaminated air from coming *in*.

## cGMP (Current Good Manufacturing Practices)

The FDA legally enforces **cGMP**. It is a strict system that ensures products are consistently produced and controlled according to quality standards.
- **Traceability**: Every single raw material must be tracked. If a batch fails, engineers must be able to trace exactly which bag of sugar fed the bacteria 3 weeks ago.
- **Gowning**: Humans are the dirtiest things in a cleanroom. Operators must wear full sterile "bunny suits" (goggles, masks, coveralls, double gloves) to prevent shedding skin cells.

---
> **Key Takeaway**: In cGMP biomanufacturing, documentation is as important as the product. The golden rule is: "If it wasn't documented, it didn't happen."
`,
            vocabulary: [
                {
                    en: "Cleanroom",
                    es: "Cuarto limpio / Sala blanca",
                    definition: "An engineered space that maintains a very low concentration of airborne particulates."
                },
                {
                    en: "Sterile",
                    es: "Estéril",
                    definition: "Free from bacteria or other living microorganisms; totally clean."
                },
                {
                    en: "Traceability",
                    es: "Trazabilidad",
                    definition: "The capability to trace something, like a raw material, through all stages of production."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: Enzyme Kinetics & Industrial Biocatalysis Applications
track.modules[4] = {
    id: "biotech-m5",
    title: "Enzyme Kinetics & Industrial Biocatalysis Applications",
    titleES: "Cinética Enzimática y Aplicaciones de Biocatálisis Industrial",
    icon: "fa-solid fa-flask",
    readings: [
        {
            id: "biotech-m5-r1",
            title: "Industrial Biocatalysis",
            duration: "10 min",
            content: `
# Industrial Biocatalysis

Traditional chemical manufacturing relies on toxic solvents, extreme heat, and high pressure to force reactions. **Biocatalysis** uses natural enzymes to perform these exact same chemical reactions at room temperature, in water, with zero toxic byproducts.

## Enzyme Kinetics

Enzymes are protein catalysts. **Enzyme Kinetics** is the study of how fast they work.
- **Substrate**: The target molecule the enzyme binds to.
- **Active Site**: The precise physical "pocket" on the enzyme where the reaction happens.
- **Michaelis-Menten Equation**: The mathematical model used by engineers to calculate the maximum velocity ($V_{max}$) of the reaction and how efficiently the enzyme binds to the substrate.

## Industrial Applications

Enzymes are used at a massive scale today:
- **Detergents**: Protease and lipase enzymes in laundry detergent break down blood and fat stains at cold temperatures.
- **Food & Beverage**: Amylase enzymes convert corn starch into high-fructose corn syrup.
- **Pharmaceuticals**: Highly specific enzymes are used to synthesize complex drug molecules that are impossible to build using traditional chemistry.

---
> **Key Takeaway**: Industrial biocatalysis is rapidly replacing toxic chemical engineering, leading to greener, more sustainable manufacturing processes across the globe.
`,
            vocabulary: [
                {
                    en: "Catalyst",
                    es: "Catalizador",
                    definition: "A substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change."
                },
                {
                    en: "Substrate",
                    es: "Sustrato",
                    definition: "The substance on which an enzyme acts."
                },
                {
                    en: "Kinetics",
                    es: "Cinética",
                    definition: "The branch of chemistry or biochemistry concerned with measuring and studying the rates of reactions."
                }
            ]
        }
    ],
    quiz: []
};

track.status = "full";

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
console.log('✅ Biotechnology modules expanded and status set to "full".');
