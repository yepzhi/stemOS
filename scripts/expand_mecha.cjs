// scripts/expand_mecha.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Mechatronics:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// MECHATRONICS: Robotics & PLC (mechatronics-m1)
// -------------------------------------------------------------
const mechaReading = `
> **Industry Alignment & Automation Standard**: Aligned with **IEC 61131-3 (PLC Programming)** and **ISO 10218 (Robots and Robotic Devices)**. Essential for Automation Engineers, Controls Technicians, and Mechatronics Integrators.

# Mechatronics, Robotics, and Industrial Automation

Mechatronics is the synergistic integration of mechanical engineering, electronics, control engineering, and computer science. It is the foundation of modern automated manufacturing, moving industries from manual labor to intelligent, autonomous production lines.

## 1. Programmable Logic Controllers (PLCs)
The brain of an industrial automation system is the PLC, a ruggedized computer designed specifically to control manufacturing processes.
- **Ladder Logic**: The most common programming language for PLCs. It visually resembles the electrical relay diagrams it was designed to replace, with "rungs" containing inputs (contacts) and outputs (coils).
- **I/O Modules**: PLCs interact with the physical world through Input/Output modules. Sensors (like proximity switches or thermocouples) send data to the Inputs, and the PLC's program logic dictates the response sent to the Outputs (like motors, valves, or pneumatic actuators).
- **SCADA (Supervisory Control and Data Acquisition)**: A high-level software architecture that gathers data in real-time from PLCs across an entire factory floor, providing operators with a graphical interface (HMI) to monitor and control the systems.

## 2. Industrial Robotics and Kinematics
Robots are the muscles of the mechatronic system, executing repetitive or dangerous tasks with extreme precision.
- **Degrees of Freedom (DOF)**: The number of independent parameters that define a robot's configuration. A standard industrial robotic arm (articulated robot) typically has 6 DOF, allowing it to reach any point in its workspace with any orientation.
- **End Effector**: The "hand" of the robot. Depending on the application, the end effector (or End-of-Arm Tooling, EOAT) could be a welding torch, a vacuum gripper, or a paint sprayer.
- **Forward and Inverse Kinematics**: **Forward kinematics** calculates the exact position of the end effector based on the given angles of the robot's joints. **Inverse kinematics** does the opposite (and much harder) calculation: determining the required joint angles to place the end effector at a specific target (X,Y,Z) coordinate.

## 3. Actuators and Drives
Translating electrical control signals into physical movement requires powerful actuators.
- **Servo Motors**: A rotary actuator that allows for precise control of angular position, velocity, and acceleration. They use a closed-loop system, relying on an encoder to feed position data back to the controller, correcting any errors in real-time.
- **Pneumatics vs. Hydraulics**: **Pneumatic systems** use compressed air for fast, clean, and relatively low-force movements (like sorting packages on a conveyor). **Hydraulic systems** use pressurized liquid for heavy-duty, high-force applications (like stamping presses), but risk fluid leaks.

---
> **Key Takeaway**: A Mechatronics engineer must seamlessly program the logic in a **PLC**, design the **SCADA** monitoring system, calculate the **Inverse Kinematics** for the robotic arm, and tune the **Servo Motors** to execute the physical work.
`;

const mechaDialogue = {
  title: "Line Down: PLC Fault & Actuator Tuning",
  titleES: "Línea Detenida: Falla de PLC y Ajuste de Actuador",
  scenarioContext: "Detroit, MI (Automotive Assembly Plant). A robotic welding cell has stopped mid-production.",
  characters: [
    { name: "Ing. Carlos Mendoza", role: "Mechatronics Integrator", avatar: "CM", color: "var(--cyan)" },
    { name: "John Davis", role: "Maintenance Supervisor", avatar: "JD", color: "var(--amber)" }
  ],
  turns: [
    {
      speaker: "John Davis",
      text: "Carlos, Line 4 is down. The HMI shows a general fault on the 6-axis welding robot. It stopped halfway through its trajectory. The line is losing $5,000 a minute.",
      translation: "Carlos, la Línea 4 está detenida. La interfaz HMI muestra una falla general en el robot de soldadura de 6 ejes. Se detuvo a la mitad de su trayectoria. La línea está perdiendo $5,000 por minuto.",
      targetTerms: ["Line 4 is down", "HMI", "general fault", "6-axis", "trajectory"]
    },
    {
      speaker: "Ing. Carlos Mendoza",
      text: "I'm checking the PLC ladder logic now. The safety interlock rung is closed, so it's not a safety sensor. Let me look at the servo drive parameters over the industrial network.",
      translation: "Estoy revisando la lógica de escalera (ladder logic) del PLC ahora. El peldaño del enclavamiento de seguridad está cerrado, así que no es un sensor de seguridad. Déjame ver los parámetros del servomotor a través de la red industrial.",
      targetTerms: ["ladder logic", "safety interlock", "rung", "servo drive", "industrial network"]
    },
    {
      speaker: "John Davis",
      text: "Did one of the axes hit a hard stop? The pneumatic clamp holding the chassis looks like it lost pressure right before the robot faulted.",
      translation: "¿Alguno de los ejes golpeó un tope mecánico (hard stop)? La abrazadera neumática que sostiene el chasis parece haber perdido presión justo antes de que el robot fallara.",
      targetTerms: ["axes", "hard stop", "pneumatic clamp", "pressure", "faulted"]
    },
    {
      speaker: "Ing. Carlos Mendoza",
      text: "You're right. The PLC detected the pressure drop on the pneumatic clamp and triggered an emergency halt to prevent a collision. The robot's inverse kinematics program is fine. We need to replace the leaking pneumatic valve.",
      translation: "Tienes razón. El PLC detectó la caída de presión en la abrazadera neumática y activó un paro de emergencia para evitar una colisión. El programa de cinemática inversa del robot está bien. Necesitamos reemplazar la válvula neumática que tiene fuga.",
      targetTerms: ["pressure drop", "emergency halt", "collision", "inverse kinematics", "pneumatic valve"]
    }
  ],
  contrastTips: [
    {
      school: "The robot stopped because the air tube broke.",
      native: "The PLC triggered an emergency halt due to a pressure drop in the pneumatic clamp.",
      explanation: "En la automatización, un 'air tube' se describe como un sistema 'pneumatic' (neumático), y la parada es un 'emergency halt' comandado por el 'PLC'."
    },
    {
      school: "I'm reading the computer program for the machine.",
      native: "I'm troubleshooting the ladder logic in the PLC to identify the fault.",
      explanation: "El 'programa' de una máquina industrial se refiere específicamente como 'ladder logic' (lógica de escalera) ejecutada en un 'PLC'."
    }
  ]
};

const mechaLexicon = [
  {
    term: "Programmable Logic Controller (PLC)",
    ipa: "/piː-ɛl-siː/",
    es: "Controlador Lógico Programable (PLC)",
    category: "Automatización",
    definition: "An industrial solid-state computer that monitors inputs and outputs, and makes logic-based decisions for automated processes or machines.",
    collocations: ["PLC programming", "ladder logic", "I/O modules"],
    falseFriends: "No es una 'PC' normal; es una computadora industrial robusta diseñada para no fallar nunca en entornos extremos.",
    nativeUsage: "The technician connected their laptop to the PLC to troubleshoot the malfunctioning conveyor belt."
  },
  {
    term: "Ladder Logic",
    ipa: "/ˈlæd.ər ˈlɑː.dʒɪk/",
    es: "Lógica de Escalera (Lenguaje Ladder)",
    category: "Programación",
    definition: "A programming language that represents a program by a graphical diagram based on the circuit diagrams of relay logic hardware.",
    collocations: ["troubleshoot ladder logic", "rungs and coils", "normally open contact"],
    falseFriends: "No tiene que ver con escaleras físicas (stairs); se llama así porque el código visual parece una escalera de mano (ladder).",
    nativeUsage: "I added a new rung to the ladder logic to ensure the motor doesn't start until the safety gate is closed."
  },
  {
    term: "SCADA",
    ipa: "/ˈskeɪ.də/",
    es: "SCADA (Supervisión, Control y Adquisición de Datos)",
    category: "Sistemas",
    definition: "Supervisory Control and Data Acquisition. A control system architecture comprising computers, networked data communications, and graphical user interfaces for high-level process supervisory management.",
    collocations: ["SCADA system", "HMI display", "real-time monitoring"],
    falseFriends: "No es una marca; es la arquitectura de red de toda la fábrica que conecta todos los PLCs a la sala de control.",
    nativeUsage: "The plant manager monitored the temperature of all three boilers simultaneously from the central SCADA dashboard."
  },
  {
    term: "Inverse Kinematics",
    ipa: "/ɪnˈvɜːrs ˌkɪn.əˈmæt.ɪks/",
    es: "Cinemática Inversa",
    category: "Robótica",
    definition: "The mathematical process of calculating the variable joint parameters (angles) needed to place the end of a kinematic chain (such as a robot end effector) in a given position and orientation relative to the start of the chain.",
    collocations: ["solve inverse kinematics", "robot trajectory", "joint space"],
    falseFriends: "No es 'movimiento al revés'; es la matemática compleja que le dice al robot cuánto doblar cada articulación para llegar a un punto XYZ.",
    nativeUsage: "The robot's software struggled to compute the inverse kinematics near its singularity point, causing erratic movement."
  },
  {
    term: "End Effector",
    ipa: "/ɛnd ɪˈfɛk.tər/",
    es: "Efector Final / Herramienta de Fin de Brazo",
    category: "Robótica",
    definition: "The device at the end of a robotic arm, designed to interact with the environment (e.g., a gripper, welding torch, or suction cup). Also called End-of-Arm Tooling (EOAT).",
    collocations: ["custom end effector", "vacuum gripper", "EOAT"],
    falseFriends: "No es el 'efecto final' de una película; es literalmente la 'mano' del robot que hace el trabajo.",
    nativeUsage: "We had to design a custom 3D-printed end effector to pick up the fragile glass panels without breaking them."
  },
  {
    term: "Servo Motor",
    ipa: "/ˈsɜːr.voʊ ˈmoʊ.tər/",
    es: "Servomotor",
    category: "Actuadores",
    definition: "A rotary or linear actuator that allows for precise control of angular or linear position, velocity, and acceleration. It consists of a suitable motor coupled to a sensor for position feedback (closed-loop).",
    collocations: ["servo drive", "position feedback", "closed-loop control"],
    falseFriends: "No es un motor que 'sirve' cosas; es un motor de altísima precisión que 'sabe' en todo momento en qué ángulo exacto está.",
    nativeUsage: "The CNC machine uses three high-torque servo motors to drive the X, Y, and Z axes with micrometer precision."
  }
];

const mechaSocratic = [
  {
    step: 1,
    concept: "PLCs & Ladder Logic",
    botQuestion: "Welcome to the Factory Floor! What is the 3-letter acronym for the rugged industrial computer that acts as the 'brain' of the assembly line? And what is the name of the visual programming language it uses that looks like an electrical relay diagram (starts with 'Ladder...')?",
    requiredKeywords: ["plc", "programmable", "logic", "controller", "ladder"],
    minKeywords: 2,
    feedbackSuccess: "Perfect! The PLC (Programmable Logic Controller) is the brain, and it is traditionally programmed using 'Ladder Logic'.",
    feedbackRetry: "The industrial computer acronym stands for Programmable Logic Controller (P _ _). Its programming language resembles something you climb to reach the roof (L _ _ _ _ _ Logic)."
  },
  {
    step: 2,
    concept: "Robotics & Inverse Kinematics",
    botQuestion: "If you want a 6-axis robot's 'hand' (the End Effector) to move to the exact coordinate X:100, Y:50, Z:200, the robot must calculate the required angles for all 6 joints. What is this complex mathematical calculation called? (Hint: It's the opposite of Forward Kinematics).",
    requiredKeywords: ["inverse", "kinematics", "calculate", "angles", "joints"],
    minKeywords: 2,
    feedbackSuccess: "Exactly! The robot uses 'Inverse Kinematics' to calculate the joint angles needed to position the end effector at a specific 3D coordinate.",
    feedbackRetry: "If calculating where the hand ends up based on joint angles is 'Forward' Kinematics, what is the 'opposite' calculation called?"
  }
];

if (!LXP_COURSES["mechatronics"]) {
  LXP_COURSES["mechatronics"] = {
    id: "mechatronics",
    category: "cat-engineering",
    title: "Mechanical Engineering & Mechatronics",
    titleES: "Ingeniería Mecánica y Mecatrónica",
    icon: "⚙️",
    desc: "Master PLC programming (Ladder Logic), industrial robotics (Inverse Kinematics), and SCADA.",
    descES: "Domina la programación de PLCs (Ladder Logic), robótica industrial (cinemática inversa) y SCADA.",
    modules_required: 1,
    modules: [
      {
        id: "mechatronics-m1",
        title: "Robotics & PLC Automation",
        titleES: "Robótica y Automatización PLC",
        isGoldModel: true,
        readings: [
          {
            id: "mechatronics-m1-r1",
            title: "Industrial Control Systems",
            duration: "11 min",
            content: mechaReading,
            vocabulary: mechaLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: mechaDialogue,
        lexiconMatrix: mechaLexicon,
        socraticChallenges: mechaSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["mechatronics"].modules[0] = {
    id: "mechatronics-m1",
    title: "Robotics & PLC Automation",
    titleES: "Robótica y Automatización PLC",
    isGoldModel: true,
    readings: [
      {
        id: "mechatronics-m1-r1",
        title: "Industrial Control Systems",
        duration: "11 min",
        content: mechaReading,
        vocabulary: mechaLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: mechaDialogue,
    lexiconMatrix: mechaLexicon,
    socraticChallenges: mechaSocratic,
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
console.log('Successfully added Mechatronics module to courses.js');
