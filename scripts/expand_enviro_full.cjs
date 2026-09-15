const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Environmental Sustainability Modules 2-5...');

const track = LXP_COURSES["environmental-sustainability"];
if (!track) {
    console.log("Track environmental-sustainability not found!");
    process.exit(1);
}

// Module 2: Industrial Wastewater Treatment: Reverse Osmosis and ZLD Systems
track.modules[1] = {
    id: "enviro-m2",
    title: "Industrial Wastewater Treatment: Reverse Osmosis and ZLD Systems",
    titleES: "Tratamiento de Aguas Residuales: Ósmosis Inversa y Sistemas ZLD",
    icon: "fa-solid fa-water",
    readings: [
        {
            id: "enviro-m2-r1",
            title: "Closing the Water Loop",
            duration: "10 min",
            content: `
# Closing the Water Loop

Industrial processes, particularly in semiconductor and textile manufacturing, consume millions of gallons of freshwater daily and produce highly toxic effluent. **Zero Liquid Discharge (ZLD)** is an engineering approach that ensures not a single drop of wastewater leaves the factory.

## Reverse Osmosis (RO)

The workhorse of industrial water treatment is **Reverse Osmosis**. 
Normal osmosis naturally moves water from low salt concentration to high salt concentration. Reverse Osmosis uses massive, high-pressure pumps to force salty wastewater through a semi-permeable membrane in the *opposite* direction.
- Pure water molecules pass through the membrane (the permeate).
- Heavy metals, salts, and chemicals are blocked and concentrated (the brine).

## ZLD Systems (Zero Liquid Discharge)

RO can recover about 80% of the water. To achieve ZLD, the remaining toxic brine is pumped into thermal evaporators and crystallizers.
- The water is boiled off as steam, captured, and condensed back into pure liquid water.
- What remains is a dry, solid block of salt and chemicals that is safely disposed of in a specialized landfill or sold as raw material.

---
> **Key Takeaway**: ZLD systems require massive amounts of energy to run high-pressure pumps and evaporators, but they protect local ecosystems from irreversible contamination.
`,
            vocabulary: [
                {
                    en: "Effluent",
                    es: "Efluente / Aguas residuales",
                    definition: "Liquid waste or sewage discharged into a river or the sea."
                },
                {
                    en: "Membrane",
                    es: "Membrana",
                    definition: "A pliable sheet-like structure acting as a boundary, lining, or partition in an organism or filtration system."
                },
                {
                    en: "Brine",
                    es: "Salmuera",
                    definition: "Water highly impregnated with salt."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: Carbon Capture, Utilization and Storage (CCUS) Technologies
track.modules[2] = {
    id: "enviro-m3",
    title: "Carbon Capture, Utilization and Storage (CCUS) Technologies",
    titleES: "Tecnologías de Captura, Uso y Almacenamiento de Carbono (CCUS)",
    icon: "fa-solid fa-smog",
    readings: [
        {
            id: "enviro-m3-r1",
            title: "Tackling Industrial Emissions",
            duration: "12 min",
            content: `
# Tackling Industrial Emissions

While renewable energy is replacing coal for electricity, industries like cement and steel manufacturing chemically release $CO_2$ directly from their raw materials. To reach net-zero emissions, we must capture this carbon at the source.

## Carbon Capture Technologies

- **Post-Combustion Capture**: The exhaust gases (flue gas) from a factory are bubbled through a liquid solvent (like amines). The solvent chemically binds to the $CO_2$ but lets the nitrogen and oxygen escape. The solvent is then heated to release the pure $CO_2$.
- **Direct Air Capture (DAC)**: Giant industrial fans pull normal ambient air over solid sorbent filters that trap $CO_2$. This is much more difficult because $CO_2$ makes up only 0.04% of the atmosphere.

## Storage and Utilization

Once we have captured thousands of tons of compressed liquid $CO_2$, what do we do with it?
1. **Storage**: The $CO_2$ is pumped 2 kilometers underground into porous rock formations (like depleted oil wells or saline aquifers) where it mineralizes into solid rock over thousands of years.
2. **Utilization**: $CO_2$ can be injected into concrete to make it stronger, or combined with green hydrogen to synthesize carbon-neutral aviation fuels.

---
> **Key Takeaway**: CCUS is not an excuse to keep burning fossil fuels, but it is an absolute engineering necessity for decarbonizing heavy industries like cement and steel.
`,
            vocabulary: [
                {
                    en: "Flue gas",
                    es: "Gas de combustión",
                    definition: "The gas exiting to the atmosphere via a flue, which is a pipe or channel for conveying exhaust gases."
                },
                {
                    en: "Solvent",
                    es: "Solvente / Disolvente",
                    definition: "Able to dissolve other substances."
                },
                {
                    en: "Aquifer",
                    es: "Acuífero",
                    definition: "A body of permeable rock which can contain or transmit groundwater."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: Circular Economy: Cradle-to-Cradle Life Cycle Assessment (LCA)
track.modules[3] = {
    id: "enviro-m4",
    title: "Circular Economy: Cradle-to-Cradle Life Cycle Assessment (LCA)",
    titleES: "Economía Circular y Análisis de Ciclo de Vida (LCA)",
    icon: "fa-solid fa-recycle",
    readings: [
        {
            id: "enviro-m4-r1",
            title: "Designing for the End of Life",
            duration: "10 min",
            content: `
# Designing for the End of Life

The traditional manufacturing model is linear: **Take, Make, Dispose**. The **Circular Economy** aims to decouple economic growth from resource consumption by designing products that never become waste.

## Life Cycle Assessment (LCA)

To truly know if a product is "green," engineers perform a **Life Cycle Assessment**. This is a rigorous scientific method to calculate the environmental impact of a product from the moment the raw materials are mined until it is thrown away.
- **Scope 1 Emissions**: Direct emissions from owned or controlled sources (e.g., fuel burned in company trucks).
- **Scope 2 Emissions**: Indirect emissions from the generation of purchased electricity.
- **Scope 3 Emissions**: All other indirect emissions in the value chain (e.g., the emissions created by the supplier who mined the aluminum).

## Cradle-to-Cradle Design

"Cradle-to-Grave" thinking ends at the landfill. "Cradle-to-Cradle" thinking dictates that at the end of a product's life, 100% of its materials must return to the industrial cycle (as high-quality raw materials) or the biological cycle (as safe compost).
- **Example**: Designing a smartphone using standardized screws instead of chemical adhesives, so that when it breaks, a robot can easily disassemble it and recycle the rare-earth metals.

---
> **Key Takeaway**: True sustainability is not just about recycling plastic bottles; it is a fundamental redesign of industrial supply chains to ensure materials flow in infinite loops.
`,
            vocabulary: [
                {
                    en: "Linear",
                    es: "Lineal",
                    definition: "Arranged in or extending along a straight or nearly straight line (Take-Make-Dispose)."
                },
                {
                    en: "Scope",
                    es: "Alcance",
                    definition: "The extent of the area or subject matter that something deals with or to which it is relevant."
                },
                {
                    en: "Supply chain",
                    es: "Cadena de suministro",
                    definition: "The sequence of processes involved in the production and distribution of a commodity."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: ISO 14001 Environmental Auditing & Zero-Waste Certification
track.modules[4] = {
    id: "enviro-m5",
    title: "ISO 14001 Environmental Auditing & Zero-Waste Certification",
    titleES: "Auditoría Ambiental ISO 14001 y Certificación Zero-Waste",
    icon: "fa-solid fa-clipboard-check",
    readings: [
        {
            id: "enviro-m5-r1",
            title: "Environmental Management Systems",
            duration: "10 min",
            content: `
# Environmental Management Systems

Corporate sustainability promises are meaningless without standardized, third-party verification. **ISO 14001** is the internationally recognized standard for Environmental Management Systems (EMS).

## The ISO 14001 Framework

ISO 14001 does not dictate exactly how much a company must reduce its emissions. Instead, it provides a framework to ensure the company is legally compliant and actively improving. It follows the **Plan-Do-Check-Act (PDCA)** cycle:
- **Plan**: Establish environmental objectives (e.g., reduce electricity use by 10%).
- **Do**: Implement the processes (e.g., install motion-sensor LED lighting).
- **Check**: Monitor and measure the processes (e.g., audit the monthly electricity bill).
- **Act**: Take actions to continually improve (e.g., install solar panels).

## Zero-Waste to Landfill Certification

A specific and rigorous goal for modern factories is achieving "Zero Waste to Landfill" certification.
This means that at least 99% of all waste generated by the facility is diverted from landfills through:
- **Reduction**: Using less packaging material.
- **Reuse**: Sending wooden pallets back to the supplier.
- **Recycling**: Segregating plastics, metals, and cardboard.
- **Waste-to-Energy (WtE)**: Burning non-recyclable trash in high-temperature incinerators to generate electricity (the absolute last resort).

---
> **Key Takeaway**: Achieving ISO 14001 certification proves to clients, investors, and governments that a factory's environmental commitments are backed by rigorous, audited data.
`,
            vocabulary: [
                {
                    en: "Audit",
                    es: "Auditoría",
                    definition: "An official inspection of an organization's accounts or procedures, typically by an independent body."
                },
                {
                    en: "Compliance",
                    es: "Cumplimiento (legal o normativo)",
                    definition: "The action or fact of complying with a wish or command, or adhering to laws and regulations."
                },
                {
                    en: "Landfill",
                    es: "Vertedero / Basurero",
                    definition: "A place to dispose of refuse and other waste material by burying it and covering it over with soil."
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
console.log('✅ Environmental Sustainability modules expanded and status set to "full".');
