const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Advanced Manufacturing Modules 2-5...');

const track = LXP_COURSES["advanced-manufacturing"];
if (!track) {
    console.log("Track advanced-manufacturing not found!");
    process.exit(1);
}

// Module 2: Metal Additive Manufacturing: DMLS, SLM and Binder Jetting
track.modules[1] = {
    id: "mfg-m2",
    title: "Metal Additive Manufacturing: DMLS, SLM and Binder Jetting",
    titleES: "Manufactura Aditiva de Metales: DMLS, SLM y Binder Jetting",
    icon: "fa-solid fa-cube",
    readings: [
        {
            id: "mfg-m2-r1",
            title: "Industrial 3D Printing of Metals",
            duration: "10 min",
            content: `
# Industrial 3D Printing of Metals

While plastic 3D printing is common, the aerospace and medical industries rely on **Metal Additive Manufacturing (AM)** to create lightweight, complex parts that cannot be traditionally machined.

## DMLS and SLM

**Direct Metal Laser Sintering (DMLS)** and **Selective Laser Melting (SLM)** are powder-bed fusion techniques. 
1. A thin layer of fine metal powder (like Titanium or Inconel) is spread across the build platform.
2. A high-powered laser melts the powder exactly where the part's cross-section is.
3. The platform lowers, more powder is spread, and the process repeats.

These methods create parts with extreme density and strength, ideal for jet engine turbine blades.

## Binder Jetting

Unlike lasers that melt metal, **Binder Jetting** uses a print head to deposit a liquid binding agent onto the powder bed. This creates a "green part" which is fragile. The part is then placed in a sintering furnace to burn away the binder and fuse the metal particles together.
- **Advantage**: It is much faster and cheaper for mass production than laser-based systems.

---
> **Key Takeaway**: Metal Additive Manufacturing allows engineers to design organic, topology-optimized shapes that reduce the weight of an aircraft by hundreds of kilograms.
`,
            vocabulary: [
                {
                    en: "Sintering",
                    es: "Sinterización",
                    definition: "The process of compacting and forming a solid mass of material by heat or pressure without melting it to the point of liquefaction."
                },
                {
                    en: "Powder-bed fusion",
                    es: "Fusión de lecho de polvo",
                    definition: "An additive manufacturing process in which thermal energy selectively fuses regions of a powder bed."
                },
                {
                    en: "Topology optimization",
                    es: "Optimización topológica",
                    definition: "A mathematical method that optimizes material layout within a given design space."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: Digital Twins & Industrial Simulation (Siemens, Dassault)
track.modules[2] = {
    id: "mfg-m3",
    title: "Digital Twins & Industrial Simulation (Siemens, Dassault)",
    titleES: "Gemelos Digitales y Simulación Industrial",
    icon: "fa-solid fa-clone",
    readings: [
        {
            id: "mfg-m3-r1",
            title: "The Power of the Digital Twin",
            duration: "12 min",
            content: `
# The Power of the Digital Twin

Building a physical prototype of a new factory line costs millions of dollars. Instead, modern engineers use a **Digital Twin**.

## What is a Digital Twin?

A Digital Twin is a highly complex virtual model that is the exact counterpart of a physical physical object or process. Companies use software like **Siemens NX** or **Dassault Systèmes DELMIA** to create these twins.

## Simulation Before Production

Before a single robot is installed on the factory floor, the Digital Twin is used to:
1. **Simulate Kinematics**: Verify that the robotic arms won't collide with each other.
2. **Ergonomic Assessment**: Ensure human workers can reach tools without straining their backs.
3. **Throughput Analysis**: Calculate exactly how many parts the line will produce per hour.

## Real-Time Synchronization

The most advanced Digital Twins are connected to the physical factory via Industrial IoT sensors. If a physical motor overheats, the virtual Digital Twin turns red in the simulation software, allowing remote engineers to diagnose the problem instantly.

---
> **Key Takeaway**: Digital Twins eliminate the "trial and error" phase of manufacturing, saving millions in capital expenditure (CapEx) and preventing costly downtime.
`,
            vocabulary: [
                {
                    en: "Digital Twin",
                    es: "Gemelo Digital",
                    definition: "A virtual representation that serves as the real-time digital counterpart of a physical object or process."
                },
                {
                    en: "Kinematics",
                    es: "Cinemática",
                    definition: "The branch of mechanics concerned with the motion of objects without reference to the forces which cause the motion."
                },
                {
                    en: "Throughput",
                    es: "Rendimiento / Tasa de producción",
                    definition: "The amount of material or items passing through a system or process."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: High-Speed 5-Axis CNC Milling & Toolpath Optimization
track.modules[3] = {
    id: "mfg-m4",
    title: "High-Speed 5-Axis CNC Milling & Toolpath Optimization",
    titleES: "Fresado CNC de 5 Ejes de Alta Velocidad",
    icon: "fa-solid fa-cogs",
    readings: [
        {
            id: "mfg-m4-r1",
            title: "Advanced Subtractive Manufacturing",
            duration: "10 min",
            content: `
# Advanced Subtractive Manufacturing

While 3D printing adds material, **CNC (Computer Numerical Control)** machining removes material from a solid block to achieve extreme tolerances (up to 0.001 mm).

## 3-Axis vs 5-Axis CNC

A standard 3-axis CNC moves a cutting tool along the X, Y, and Z axes. 
A **5-Axis CNC** adds two rotational axes (usually A and B). This allows the cutting tool to approach the part from almost any angle.
- **Benefit**: Complex parts (like an impeller) can be machined in a single setup, drastically reducing human error and production time.

## High-Speed Machining (HSM)

HSM involves using very high spindle speeds (e.g., 20,000 RPM) but very light cuts. This reduces the heat generated on the cutting tool and transfers the heat into the chips that fly away. 

## Toolpath Optimization

CAM (Computer-Aided Manufacturing) software calculates the exact path the tool must take. Modern **Trochoidal Milling** toolpaths keep the tool engaged with the material at a constant angle, preventing tool breakage and allowing for much deeper cuts.

---
> **Key Takeaway**: 5-axis CNC machines and optimized toolpaths have transformed subtractive manufacturing, making it possible to cut hardened steels faster and with tighter tolerances than ever before.
`,
            vocabulary: [
                {
                    en: "Subtractive Manufacturing",
                    es: "Manufactura Sustractiva",
                    definition: "Manufacturing processes that remove material from a solid block to produce a part."
                },
                {
                    en: "Spindle",
                    es: "Husillo",
                    definition: "The rotating axis of the machine, which often holds the cutting tool."
                },
                {
                    en: "Tolerance",
                    es: "Tolerancia",
                    definition: "The allowable limit or limits of variation in a physical dimension."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: Overall Equipment Effectiveness (OEE) & Kaizen Principles
track.modules[4] = {
    id: "mfg-m5",
    title: "Overall Equipment Effectiveness (OEE) & Kaizen Principles",
    titleES: "Efectividad Global del Equipo (OEE) y Principios Kaizen",
    icon: "fa-solid fa-chart-line",
    readings: [
        {
            id: "mfg-m5-r1",
            title: "Measuring Manufacturing Productivity",
            duration: "10 min",
            content: `
# Measuring Manufacturing Productivity

How do plant managers know if their factory is truly efficient? They use a gold-standard metric called **OEE (Overall Equipment Effectiveness)**.

## The Three Factors of OEE

OEE is calculated by multiplying three factors:
1. **Availability**: Is the machine running when it is scheduled to run? (Subtracts downtime, breakdowns, and setup time).
2. **Performance**: Is the machine running at its maximum designed speed? (Subtracts minor stops and slow cycles).
3. **Quality**: Is the machine producing good parts? (Subtracts scrap, defects, and parts that need rework).

**OEE = Availability × Performance × Quality**

An OEE of 100% means you are producing only good parts, as fast as possible, with no stop time. World-class manufacturing plants aim for an OEE of 85%.

## Kaizen: Continuous Improvement

When OEE is low, engineers use **Kaizen** (Japanese for "Continuous Improvement"). It is the philosophy that small, incremental changes made daily will result in massive productivity gains over time. 
Instead of spending a million dollars on a new machine, Kaizen asks: "How can we reduce the tool changeover time by 3 minutes today?"

---
> **Key Takeaway**: OEE gives you a mathematical baseline for factory performance, while Kaizen provides the cultural philosophy to constantly improve that number.
`,
            vocabulary: [
                {
                    en: "Downtime",
                    es: "Tiempo de inactividad / Paro",
                    definition: "Time during which a machine, especially a computer, is out of action or unavailable for use."
                },
                {
                    en: "Scrap",
                    es: "Desecho / Chatarra",
                    definition: "Manufactured parts that do not meet quality standards and must be discarded or melted down."
                },
                {
                    en: "Changeover",
                    es: "Cambio de formato / Cambio de modelo",
                    definition: "The process of converting a line or machine from running one product to another."
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
console.log('✅ Advanced Manufacturing modules expanded and status set to "full".');
