// scripts/expand_robotics.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Robotics:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// ROBOTICS & AUTOMATION: 6-DoF Kinematics & IEC 61131 (robot-m1)
// -------------------------------------------------------------
const robotReading = `
> **Industry Alignment & Safety Standard**: Aligned with **ISO 10218-1 (Robots and robotic devices — Safety requirements)** and **IEC 61131-3 (Programmable Controllers)**. Essential for automation engineers, system integrators, and plant floor robotics technicians.

# 6-DoF Industrial Robotics, Collaborative Robots (Cobots) & Kinematic Control

The integration of Six Degrees of Freedom (6-DoF) articulated robots and collaborative robots (Cobots) has revolutionized modern manufacturing, transitioning assembly lines from rigid automation to highly flexible, safety-rated intelligent cells.

## 1. Kinematics and Inverse Kinematics (IK)
Industrial articulated robots position their End-of-Arm Tooling (EOAT) in 3D space using complex mathematical transformations:
- **Forward Kinematics**: Calculates the exact Cartesian coordinates ($X, Y, Z, Rx, Ry, Rz$) of the end-effector based on known joint angles ($\\theta_1, \\theta_2, ..., \\theta_6$).
- **Inverse Kinematics (IK)**: The computationally intensive process where the robot controller calculates the required joint angles to reach a desired target Cartesian coordinate. Since multiple joint configurations can reach the same point (e.g., elbow-up vs. elbow-down), the controller must avoid **kinematic singularities**—positions where the robot loses a degree of freedom and infinite joint velocities are mathematically required, triggering a safety fault.

## 2. Collaborative Robots (Cobots) and ISO 10218
Unlike traditional industrial robots confined within physical safety fences and light curtains, Cobots are designed to share a workspace with human operators:
1. **Power and Force Limiting (PFL)**: Cobots feature dual-encoder joints and torque sensors. If the arm detects a sudden spike in motor current (indicating a collision with a human), the safety controller halts motion within milliseconds.
2. **Speed and Separation Monitoring (SSM)**: Utilizing LiDAR scanners or 3D time-of-flight cameras, the robotic cell dynamically scales down the robot's Tool Center Point (TCP) velocity as a human enters the collaborative zone, ultimately enforcing a Category 0 or Category 1 Safe Stop if the minimum separation distance is breached.

## 3. IEC 61131-3 PLC Integration & Fieldbus Networks
Robots rarely operate in isolation. They are orchestrated by a master Programmable Logic Controller (PLC):
- **IEC 61131-3 Programming**: Engineers write supervisory control logic using standard languages like Ladder Diagram (LD) or Structured Text (ST). 
- **Deterministic Fieldbus**: The PLC commands the robot controller via industrial ethernet protocols such as **PROFINET IRT** or **EtherCAT**. These networks provide sub-millisecond deterministic cyclic data exchange, ensuring that a robotic weld triggers exactly when the conveyor encoder reports the chassis is in position.
- **Safety over Ethernet (CIP Safety / PROFIsafe)**: Emergency stop (E-Stop) signals and safety gate interlocks are transmitted over the same ethernet cable using black-channel cryptographic safety protocols, eliminating complex hardwiring.

---
> **Key Takeaway**: Advanced automation merges **spatial mathematics (Inverse Kinematics, Singularities)** with **functional safety (ISO 10218, Force Limiting)** and **deterministic network orchestration (PROFINET, IEC 61131-3)**.
`;

const robotDialogue = {
  title: "Robotic Cell Commissioning: Singularities and PROFIsafe Faults",
  titleES: "Puesta en Marcha de Celda Robótica: Singularidades y Fallos PROFIsafe",
  scenarioContext: "Querétaro, Qro (Aerospace Machining Cell) ⇄ Stuttgart, Germany (Automation OEM Support). Live commissioning debug.",
  characters: [
    { name: "Ing. Carlos Mendoza", role: "Lead Automation Integrator (Querétaro)", avatar: "CM", color: "var(--cyan)" },
    { name: "Lukas Weber", role: "Senior Robotics Controls Engineer (Stuttgart)", avatar: "LW", color: "var(--amber)" }
  ],
  turns: [
    {
      speaker: "Ing. Carlos Mendoza",
      text: "Lukas, we are validating the payload transfer on the new 6-axis milling robot. Whenever the Tool Center Point approaches the zenith of the CNC fixture, joint 4 spins uncontrollably and the controller throws a kinematics singularity fault.",
      translation: "Lukas, estamos validando la transferencia de carga útil en el nuevo robot de fresado de 6 ejes. Cada vez que el Centro de Herramienta (TCP) se acerca al cenit del montaje CNC, la articulación 4 gira sin control y el controlador arroja un fallo de singularidad cinemática.",
      targetTerms: ["payload transfer", "Tool Center Point (TCP)", "zenith", "kinematics singularity fault"]
    },
    {
      speaker: "Lukas Weber",
      text: "That’s a classic wrist singularity, Carlos. Joints 4 and 6 are perfectly aligned in a straight line, making joint 5's axis vector zero. The inverse kinematics solver divides by zero, commanding infinite acceleration. You need to offset the approach angle by at least 5 degrees.",
      translation: "Esa es una clásica singularidad de muñeca, Carlos. Las articulaciones 4 y 6 están perfectamente alineadas en línea recta, haciendo que el vector del eje de la articulación 5 sea cero. El solucionador de cinemática inversa divide por cero, comandando una aceleración infinita. Necesitas desfasar el ángulo de aproximación por al menos 5 grados.",
      targetTerms: ["wrist singularity", "axis vector", "inverse kinematics solver", "offset the approach angle"]
    },
    {
      speaker: "Ing. Carlos Mendoza",
      text: "Understood, I'll rewrite the structured text motion block to interpolate a joint move (PTP) instead of a linear move (LIN) near that zone. However, we're also getting intermittent PROFIsafe communication drops from the safety PLC.",
      translation: "Entendido, reescribiré el bloque de movimiento en texto estructurado para interpolar un movimiento de articulación (PTP) en lugar de un movimiento lineal (LIN) cerca de esa zona. Sin embargo, también estamos teniendo caídas intermitentes de comunicación PROFIsafe desde el PLC de seguridad.",
      targetTerms: ["structured text motion block", "interpolate", "joint move (PTP)", "linear move (LIN)", "PROFIsafe communication drops"]
    },
    {
      speaker: "Lukas Weber",
      text: "Check the PROFINET update time in the hardware config. If you have the cyclic watchdog set to 2 milliseconds, background network jitter might cause a timeout. Increase the F-Watchdog time to 8 milliseconds for the robot's safety telegram.",
      translation: "Revisa el tiempo de actualización de PROFINET en la configuración de hardware. Si tienes el watchdog cíclico ajustado a 2 milisegundos, la fluctuación de fondo de la red podría causar un tiempo de espera excedido. Aumenta el tiempo del F-Watchdog a 8 milisegundos para el telegrama de seguridad del robot.",
      targetTerms: ["cyclic watchdog", "network jitter", "timeout", "F-Watchdog time", "safety telegram"]
    }
  ],
  contrastTips: [
    {
      school: "The robot arm got stuck and moved very fast.",
      native: "The robot controller encountered a wrist singularity, causing a safety fault due to infinite commanded joint acceleration.",
      explanation: "En la industria no se dice 'got stuck'; se diagnostica el problema matemático exacto (singularidad cinemática) que provocó el paro de seguridad."
    },
    {
      school: "I will make the machine move in a straight line.",
      native: "I will program a linear interpolation (LIN) move for the Tool Center Point (TCP).",
      explanation: "El vocabulario técnico distingue entre movimientos interpolados lineales (LIN) y movimientos eje por eje (PTP / Joint)."
    }
  ]
};

const robotLexicon = [
  {
    term: "Inverse Kinematics (IK)",
    ipa: "/ɪnˈvɜːrs ˌkɪn.əˈmæt.ɪks/",
    es: "Cinemática Inversa",
    category: "Matemáticas Robóticas",
    definition: "The mathematical process of calculating the variable joint parameters needed to place the end of a kinematic chain in a given position and orientation.",
    collocations: ["IK solver", "kinematic singularity", "calculate joint angles"],
    falseFriends: "No es mecánica de reversa; es el cálculo matricial para determinar cómo mover cada motor para alcanzar una coordenada XYZ.",
    nativeUsage: "The robotic controller's inverse kinematics solver failed because the target coordinate was outside the physical reach envelope."
  },
  {
    term: "Tool Center Point (TCP)",
    ipa: "/tuːl ˈsɛn.tər pɔɪnt/",
    es: "Centro de Herramienta (TCP)",
    category: "Programación Robótica",
    definition: "The focal point of the robotic end-effector (tool) relative to which all programmed motion paths and velocities are calculated.",
    collocations: ["calibrate the TCP", "TCP velocity", "TCP offset"],
    falseFriends: "En este contexto, TCP no significa 'Transmission Control Protocol' (redes), sino el punto físico exacto de la pinza o antorcha.",
    nativeUsage: "After changing the welding torch nozzle, we had to recalibrate the Tool Center Point offset to maintain weld accuracy."
  },
  {
    term: "Kinematic Singularity",
    ipa: "/ˌkɪn.əˈmæt.ɪk ˌsɪŋ.ɡjəˈlær.ə.ti/",
    es: "Singularidad Cinemática",
    category: "Mecánica Robótica",
    definition: "A robot configuration where two or more joint axes align, causing a loss of a degree of freedom and requiring infinite joint speeds to maintain linear motion.",
    collocations: ["wrist singularity", "pass through singularity", "singularity avoidance algorithm"],
    falseFriends: "No es un agujero negro astronómico; es una posición geométrica donde el robot matemáticamente se 'traba'.",
    nativeUsage: "Programming a linear path directly over the robot's base will trigger a kinematic singularity fault on joint 1."
  },
  {
    term: "End-of-Arm Tooling (EOAT)",
    ipa: "/ɛnd əv ɑːrm ˈtuː.lɪŋ/",
    es: "Herramienta de Extremo de Brazo",
    category: "Hardware de Robot",
    definition: "The specialized equipment, such as grippers, welding torches, or vacuum cups, mounted at the end of the robotic arm to interact with parts.",
    collocations: ["custom EOAT design", "EOAT payload capacity", "pneumatic EOAT gripper"],
    falseFriends: "No se dice 'the robot hand'; el término industrial obligatorio es EOAT o End-Effector.",
    nativeUsage: "The lightweight carbon fiber EOAT allowed us to increase the payload capacity for the heavy casting components."
  },
  {
    term: "Collaborative Robot (Cobot)",
    ipa: "/kəˈlæb.rə.tɪv ˈroʊ.bɑːt/",
    es: "Robot Colaborativo (Cobot)",
    category: "Automatización",
    definition: "A robot intended for direct human-robot interaction within a shared workspace without physical safety fencing, relying on force and speed limits.",
    collocations: ["cobot payload limit", "ISO 10218 compliance", "force-limited cobot"],
    falseFriends: "Un cobot no es cualquier robot pequeño; debe cumplir certificaciones de seguridad biométrica estrictas para no lastimar humanos.",
    nativeUsage: "The facility replaced caged industrial robots with cobots to allow operators to perform simultaneous quality checks on the same assembly bench."
  },
  {
    term: "Programmable Logic Controller (PLC)",
    ipa: "/ˈproʊ.ɡræm.ə.bəl ˈlɑː.dʒɪk kənˈtroʊ.lər/",
    es: "Controlador Lógico Programable",
    category: "Sistemas de Control",
    definition: "An industrial solid-state computer that monitors inputs and makes decisions based on a custom program to control outputs (machines or processes).",
    collocations: ["safety PLC", "PLC ladder logic", "PLC scan time"],
    falseFriends: "No es un PC de escritorio; es un cerebro industrial determinista y robusto resistente a vibración e interferencia electromagnética.",
    nativeUsage: "The master PLC orchestrates the conveyor belt speed, the robot pick-and-place sequence, and the safety light curtains."
  }
];

const robotSocratic = [
  {
    step: 1,
    concept: "Inverse Kinematics & Singularities",
    botQuestion: "Welcome to the Robotics Engineering Audit! Explain in English what a 'Kinematic Singularity' is during a linear move. Why does it cause the robot controller to throw a fault?",
    requiredKeywords: ["singularity", "axes", "align", "infinite", "speed", "acceleration", "linear", "inverse kinematics"],
    minKeywords: 3,
    feedbackSuccess: "Perfect! When joint axes align (like a wrist singularity), the robot loses a degree of freedom. To maintain a linear TCP path through this zone, the inverse kinematics solver demands infinite joint speeds, causing a safety fault.",
    feedbackRetry: "Think about the math! What happens when two axes line up perfectly? What does the controller calculate that the physical motors cannot perform? (Mention infinite speed and inverse kinematics)."
  },
  {
    step: 2,
    concept: "Cobot Safety vs Traditional Robots",
    botQuestion: "According to ISO 10218, what makes a Collaborative Robot (Cobot) fundamentally different from a traditional industrial robot in terms of safety? Mention at least one specific technical feature.",
    requiredKeywords: ["force limiting", "torque sensors", "speed", "separation", "fences", "human", "shared workspace"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! Cobots operate in a shared workspace without physical fences by utilizing Power and Force Limiting (PFL) with torque sensors, or Speed and Separation Monitoring (SSM) to safely halt upon human contact.",
    feedbackRetry: "How does a cobot 'feel' a collision? Think about torque sensors, force limiting, and the absence of physical safety fences."
  }
];

if (!LXP_COURSES["robotics-automation"]) {
  LXP_COURSES["robotics-automation"] = {
    id: "robotics-automation",
    category: "cat-engineering",
    title: "Robotics & Automation",
    titleES: "Robótica Industrial y Automatización",
    icon: "🏭",
    desc: "Master 6-DoF kinematics, IEC 61131-3 PLC programming, and ISO 10218 collaborative robotics safety protocols.",
    descES: "Domina cinemática 6-DoF, programación de PLCs IEC 61131-3 y protocolos de seguridad de robótica colaborativa ISO 10218.",
    modules_required: 1,
    modules: [
      {
        id: "robot-m1",
        title: "6-DoF Kinematics & IEC 61131",
        titleES: "Cinemática 6-DoF e IEC 61131",
        isGoldModel: true,
        readings: [
          {
            id: "robot-m1-r1",
            title: "6-DoF Industrial Robotics & Collaborative Kinematics",
            duration: "12 min",
            content: robotReading,
            vocabulary: robotLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: robotDialogue,
        lexiconMatrix: robotLexicon,
        socraticChallenges: robotSocratic,
        quiz: []
      }
    ]
  };
} else {
  // If course exists, just append the module
  LXP_COURSES["robotics-automation"].modules[0] = {
    id: "robot-m1",
    title: "6-DoF Kinematics & IEC 61131",
    titleES: "Cinemática 6-DoF e IEC 61131",
    isGoldModel: true,
    readings: [
      {
        id: "robot-m1-r1",
        title: "6-DoF Industrial Robotics & Collaborative Kinematics",
        duration: "12 min",
        content: robotReading,
        vocabulary: robotLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: robotDialogue,
    lexiconMatrix: robotLexicon,
    socraticChallenges: robotSocratic,
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
console.log('Successfully added Robotics module to courses.js');
