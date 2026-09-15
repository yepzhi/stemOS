const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Materials & Nanotech Modules 2-5...');

const track = LXP_COURSES["materials-nanotech"];
if (!track) {
    console.log("Track materials-nanotech not found!");
    process.exit(1);
}

// Module 2: Carbon Nanomaterials: Graphene, Carbon Nanotubes and Fullerenes
track.modules[1] = {
    id: "mat-m2",
    title: "Carbon Nanomaterials: Graphene, Carbon Nanotubes and Fullerenes",
    titleES: "Nanomateriales de Carbono: Grafeno, Nanotubos de Carbono y Fullerenos",
    icon: "fa-solid fa-hexagon-nodes",
    readings: [
        {
            id: "mat-m2-r1",
            title: "The Carbon Revolution",
            duration: "10 min",
            content: `
# The Carbon Revolution

Carbon is one of the most versatile elements on Earth. By rearranging its atoms at the nanoscale, scientists have created materials with properties that seem like science fiction.

## Graphene

**Graphene** is a single layer of carbon atoms arranged in a 2D hexagonal lattice (like chicken wire). 
- It is 200 times stronger than steel by weight.
- It is an incredible conductor of heat and electricity.
- It is almost completely transparent.
- **Applications**: Flexible electronics, advanced batteries, and ultra-strong composite materials.

## Carbon Nanotubes (CNTs)

Imagine taking a sheet of graphene and rolling it into a seamless cylinder. That is a **Carbon Nanotube**. 
Depending on how the sheet is rolled (its "chirality"), a CNT can be either metallic (conducting electricity like copper) or a semiconductor (acting like silicon).

## Fullerenes

Also known as "Buckyballs," fullerenes are carbon molecules in the shape of a hollow sphere (like a soccer ball made of 60 carbon atoms). They are primarily used in medical research for targeted drug delivery, acting as a microscopic cage to carry medicine directly to a cancer cell.

---
> **Key Takeaway**: Carbon nanomaterials possess mechanical and electrical properties far superior to traditional metals, but mass-producing them cheaply remains the biggest hurdle for commercialization.
`,
            vocabulary: [
                {
                    en: "Lattice",
                    es: "Red cristalina / Estructura reticular",
                    definition: "A regular repeated three-dimensional arrangement of atoms, ions, or molecules in a metal or other crystalline solid."
                },
                {
                    en: "Semiconductor",
                    es: "Semiconductor",
                    definition: "A solid substance that has a conductivity between that of an insulator and that of most metals."
                },
                {
                    en: "Chirality",
                    es: "Quiralidad",
                    definition: "A property of asymmetry important in several branches of science."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: Electron Microscopy: SEM, TEM, AFM and Diffraction Spectroscopy
track.modules[2] = {
    id: "mat-m3",
    title: "Electron Microscopy: SEM, TEM, AFM and Diffraction Spectroscopy",
    titleES: "Microscopía Electrónica: SEM, TEM, AFM y Espectroscopía",
    icon: "fa-solid fa-microscope",
    readings: [
        {
            id: "mat-m3-r1",
            title: "Seeing the Invisible",
            duration: "12 min",
            content: `
# Seeing the Invisible

Traditional optical microscopes are limited by the wavelength of visible light; they cannot resolve anything smaller than 200 nanometers. To see viruses, nanoparticles, or individual atoms, scientists use **Electron Microscopes**.

## SEM and TEM

Instead of light, these microscopes fire a beam of highly energetic electrons in a vacuum.
- **Scanning Electron Microscope (SEM)**: Bounces electrons *off the surface* of a sample to create stunning, high-resolution 3D images of topographies (like the eye of a fly or the surface of a microchip).
- **Transmission Electron Microscope (TEM)**: Shoots electrons *through* an ultra-thin slice of a sample. It provides internal structural information and has a much higher resolution than SEM, capable of imaging individual columns of atoms.

## Atomic Force Microscopy (AFM)

AFM doesn't use lenses or beams. Instead, it uses a microscopic physical probe (a cantilever) that literally "feels" the surface of the sample, much like a blind person reading Braille. It can map a surface down to the atomic level.

## Spectroscopy

While microscopy shows you what a material looks like, **Spectroscopy** (like X-Ray Diffraction or EDS) tells you exactly what elements are in it by measuring how the material scatters X-rays or light.

---
> **Key Takeaway**: In nanotechnology, you cannot build what you cannot see. Advanced microscopy is the foundational tool that makes nanoscale engineering possible.
`,
            vocabulary: [
                {
                    en: "Resolution",
                    es: "Resolución",
                    definition: "The shortest distance between two points on a specimen that can still be distinguished by the observer or camera system as separate entities."
                },
                {
                    en: "Vacuum",
                    es: "Vacío",
                    definition: "A space entirely devoid of matter."
                },
                {
                    en: "Topography",
                    es: "Topografía",
                    definition: "The arrangement of the natural and artificial physical features of an area."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: Thin Film Deposition: PVD Sputtering, CVD and Atomic Layer Deposition
track.modules[3] = {
    id: "mat-m4",
    title: "Thin Film Deposition: PVD Sputtering, CVD and Atomic Layer Deposition",
    titleES: "Deposición de Películas Finas: PVD, CVD y ALD",
    icon: "fa-solid fa-layer-group",
    readings: [
        {
            id: "mat-m4-r1",
            title: "Building Atom by Atom",
            duration: "10 min",
            content: `
# Building Atom by Atom

The semiconductor industry (which makes computer chips) and the solar panel industry rely on **Thin Film Deposition**—the process of applying a microscopic layer of material onto a substrate (like a silicon wafer).

## PVD (Physical Vapor Deposition)

In PVD (often called Sputtering), a solid block of metal (the target) is placed in a vacuum chamber. Argon plasma is fired at the target, knocking individual metal atoms loose. These atoms fly across the chamber and stick to the substrate, forming a pure, highly conductive metallic film. It is purely a physical process.

## CVD (Chemical Vapor Deposition)

In CVD, the substrate is exposed to volatile chemical gases in a heated chamber. The gases react with the heat and deposit a solid film onto the surface. Unlike PVD, this involves a chemical reaction. It is often used to deposit high-quality insulators (like silicon dioxide).

## ALD (Atomic Layer Deposition)

As microchips get smaller, precision becomes paramount. ALD is a variant of CVD that deposits material exactly *one atomic layer at a time*. It pulses gas A into the chamber, which bonds to the surface. Then it purges the chamber and pulses gas B, which reacts with layer A. This creates perfect, uniform films even on complex 3D nanostructures.

---
> **Key Takeaway**: Without Thin Film Deposition, modern electronics—from the screen on your smartphone to the processor running it—would not exist.
`,
            vocabulary: [
                {
                    en: "Substrate",
                    es: "Sustrato",
                    definition: "The base material on which processing is conducted to produce electronic devices."
                },
                {
                    en: "Plasma",
                    es: "Plasma",
                    definition: "An ionized gas consisting of positive ions and free electrons."
                },
                {
                    en: "Volatile",
                    es: "Volátil",
                    definition: "Easily evaporated at normal temperatures."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: Smart Polymers, Shape Memory Alloys (SMA) and Superconductors
track.modules[4] = {
    id: "mat-m5",
    title: "Smart Polymers, Shape Memory Alloys (SMA) and Superconductors",
    titleES: "Polímeros Inteligentes, Aleaciones de Memoria y Superconductores",
    icon: "fa-solid fa-brain",
    readings: [
        {
            id: "mat-m5-r1",
            title: "Materials with a Memory",
            duration: "10 min",
            content: `
# Materials with a Memory

Most materials are passive (a piece of steel stays a piece of steel). **Smart Materials** actively respond to changes in their environment (temperature, stress, magnetic fields, or electricity).

## Shape Memory Alloys (SMAs)

An SMA (like **Nitinol**, a mix of Nickel and Titanium) remembers its original shape. 
- You can bend a Nitinol wire completely out of shape when it is cold. 
- But if you heat it (by passing an electrical current through it, or dropping it in hot water), it instantly snaps back to its original shape with immense force. 
- **Applications**: Medical stents that expand inside an artery, or actuators in robotics that act like artificial muscles.

## Smart Polymers

Also known as stimuli-responsive polymers, these plastics change their properties when exposed to stimuli like pH, temperature, or light. Some hydrogels shrink dramatically when heated, squeezing out water (useful for targeted drug delivery).

## Superconductors

Normally, when electricity flows through a wire, electrical resistance creates heat, wasting energy. **Superconductors** are materials that have exactly *zero electrical resistance* when cooled below a critical temperature (usually close to absolute zero, using liquid nitrogen or helium).
- **Applications**: MRI machines, Maglev (magnetic levitation) bullet trains, and quantum computers.

---
> **Key Takeaway**: Smart materials blur the line between a structure and a machine, allowing components to sense and react without the need for complex electronics.
`,
            vocabulary: [
                {
                    en: "Alloy",
                    es: "Aleación",
                    definition: "A metal made by combining two or more metallic elements, especially to give greater strength or resistance to corrosion."
                },
                {
                    en: "Polymer",
                    es: "Polímero",
                    definition: "A substance that has a molecular structure consisting chiefly or entirely of a large number of similar units bonded together, e.g., many synthetic organic materials used as plastics and resins."
                },
                {
                    en: "Resistance",
                    es: "Resistencia (eléctrica)",
                    definition: "A measure of the difficulty to pass an electric current through a conductor."
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
console.log('✅ Materials & Nanotech modules expanded and status set to "full".');
