// scripts/expand_pm.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for PM:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// PROJECT MANAGEMENT: Agile & PMBOK (pm-m1)
// -------------------------------------------------------------
const pmReading = `
> **Industry Alignment & Certification Standard**: Aligned with **PMI PMBOK® Guide 7th Edition** and **Agile Scrum Framework**. Essential for Project Managers, Scrum Masters, and Engineering Team Leads.

# Project Management and Professional Communication

Engineering brilliant technology is only half the battle; delivering it on time, within budget, and to the client's specifications requires rigorous project management. Today's high-tech industries rely on a blend of traditional predictive planning and modern adaptive frameworks to navigate complex supply chains and shifting requirements.

## 1. Predictive (Waterfall) vs. Adaptive (Agile)
- **Predictive (Waterfall)**: The traditional approach where the project is fully planned upfront. It moves linearly through phases: Requirements, Design, Implementation, Verification, and Maintenance. It is ideal for construction or hardware manufacturing where changes late in the process are catastrophically expensive.
- **Adaptive (Agile)**: An iterative approach designed to embrace change. Instead of delivering the entire product at the end, the team delivers functional increments of the product in short cycles (usually 2-4 weeks). It is the dominant methodology in software development.

## 2. The Scrum Framework
Scrum is the most popular Agile framework, providing specific roles, events, and artifacts to manage complex knowledge work.
- **Roles**: The **Product Owner** maximizes the value of the product and manages the backlog. The **Scrum Master** is a servant-leader who removes impediments and ensures the team follows Scrum theory. The **Developers** do the actual work.
- **Sprints**: A time-boxed iteration (usually two weeks) during which a "Done", usable, and potentially releasable product increment is created.
- **The Daily Scrum**: A 15-minute daily sync for the Developers to inspect progress toward the Sprint Goal and adapt their plan for the next 24 hours. *It is not a status report for management.*

## 3. Scope Management and Communication
Failure to control the boundaries of a project is the most common reason for budget overruns.
- **Scope Creep**: The uncontrolled expansion to product or project scope without adjustments to time, cost, and resources. A professional Project Manager must ruthlessly defend the scope and negotiate change requests through a formal board.
- **Stakeholder Management**: Identifying the people or organizations impacted by the project and tailoring communication strategies to their needs. A Chief Technology Officer requires a high-level executive summary of risks, while an engineering lead requires detailed technical blockers.

---
> **Key Takeaway**: Modern engineering leadership requires mastering both the structured predictability of the **PMBOK** and the rapid iteration of **Agile Scrum**, while fiercely protecting the team from **Scope Creep**.
`;

const pmDialogue = {
  title: "Agile Retrospective: Scope Creep",
  titleES: "Retrospectiva Ágil: Desviación del Alcance",
  scenarioContext: "Austin, TX (Software Hub) ⇄ Remote Dev Team. Discussing a missed deadline in the Sprint Retrospective.",
  characters: [
    { name: "Sarah Jenkins", role: "Scrum Master", avatar: "SJ", color: "var(--cyan)" },
    { name: "Ing. David Torres", role: "Lead Full-Stack Developer", avatar: "DT", color: "var(--amber)" }
  ],
  turns: [
    {
      speaker: "Sarah Jenkins",
      text: "David, looking at our burndown chart for Sprint 4, we missed our commitment by 30 story points. What was the main impediment blocking the team?",
      translation: "David, viendo nuestro gráfico de trabajo pendiente (burndown chart) para el Sprint 4, fallamos en nuestro compromiso por 30 puntos de historia. ¿Cuál fue el principal impedimento que bloqueó al equipo?",
      targetTerms: ["burndown chart", "Sprint 4", "commitment", "story points", "impediment"]
    },
    {
      speaker: "Ing. David Torres",
      text: "The main blocker was scope creep. Mid-sprint, the Product Owner asked us to add real-time analytics to the dashboard. It completely derailed our velocity.",
      translation: "El bloqueador principal fue la desviación del alcance (scope creep). A mitad del sprint, el Product Owner nos pidió agregar analíticas en tiempo real al panel. Descarriló por completo nuestra velocidad.",
      targetTerms: ["blocker", "scope creep", "Mid-sprint", "Product Owner", "velocity"]
    },
    {
      speaker: "Sarah Jenkins",
      text: "I see. As the Scrum Master, I should have protected the Sprint Backlog. Changes to the scope during an active sprint should be heavily restricted to protect the team's focus.",
      translation: "Ya veo. Como Scrum Master, debí haber protegido el Backlog del Sprint. Los cambios al alcance durante un sprint activo deben estar fuertemente restringidos para proteger el enfoque del equipo.",
      targetTerms: ["Scrum Master", "Sprint Backlog", "scope", "active sprint"]
    },
    {
      speaker: "Ing. David Torres",
      text: "Agreed. For the next sprint, if a stakeholder requests a new feature, we must push it to the Product Backlog for refinement, rather than injecting it directly into our current iteration.",
      translation: "De acuerdo. Para el próximo sprint, si una parte interesada (stakeholder) solicita una nueva función, debemos enviarla al Backlog del Producto para su refinamiento, en lugar de inyectarla directamente en nuestra iteración actual.",
      targetTerms: ["stakeholder", "Product Backlog", "refinement", "iteration"]
    }
  ],
  contrastTips: [
    {
      school: "The boss added more work and we couldn't finish.",
      native: "We experienced severe scope creep mid-sprint, which derailed our velocity.",
      explanation: "En la gestión de proyectos de software, no se habla de 'jefes agregando trabajo', sino de 'scope creep' (desviación del alcance) afectando la 'velocity' (velocidad del equipo ágil)."
    },
    {
      school: "I had a problem that stopped me.",
      native: "I had a blocker/impediment that prevented me from completing the story.",
      explanation: "En los Daily Scrums, los problemas que detienen el progreso se reportan formalmente como 'blockers' o 'impediments'."
    }
  ]
};

const pmLexicon = [
  {
    term: "Scope Creep",
    ipa: "/skoʊp kriːp/",
    es: "Desviación / Corrupción del Alcance",
    category: "Gestión de Proyectos",
    definition: "The uncontrolled expansion to product or project scope without adjustments to time, cost, and resources.",
    collocations: ["avoid scope creep", "manage scope", "change request"],
    falseFriends: "No es un 'alcance espeluznante' (creepy); 'creep' aquí significa arrastrarse o expandirse lentamente sin ser notado.",
    nativeUsage: "The project failed because the client's constant feature requests caused massive scope creep."
  },
  {
    term: "Scrum Master",
    ipa: "/skrʌm ˈmæs.tər/",
    es: "Scrum Master (Facilitador Ágil)",
    category: "Metodología Ágil",
    definition: "The role responsible for ensuring Scrum is understood and enacted. Scrum Masters do this by ensuring that the Scrum Team adheres to Scrum theory, practices, and rules.",
    collocations: ["servant-leader", "remove impediments", "facilitate events"],
    falseFriends: "No es el 'jefe' del equipo de desarrollo; es un líder-sirviente que facilita el proceso y quita bloqueos.",
    nativeUsage: "Our Scrum Master canceled the unnecessary meetings so the developers could focus on the sprint goal."
  },
  {
    term: "Stakeholder",
    ipa: "/ˈsteɪkˌhoʊl.dər/",
    es: "Parte Interesada / Involucrado",
    category: "Negocios",
    definition: "An individual, group, or organization that may affect, be affected by, or perceive itself to be affected by a decision, activity, or outcome of a project.",
    collocations: ["stakeholder management", "key stakeholders", "manage expectations"],
    falseFriends: "No es el que 'sostiene el filete' (steak); es alguien con un interés o inversión (stake) en el proyecto.",
    nativeUsage: "Before changing the software architecture, we need to get buy-in from the key stakeholders."
  },
  {
    term: "Sprint Backlog",
    ipa: "/sprɪnt ˈbæk.lɔːɡ/",
    es: "Lista de Pendientes del Sprint",
    category: "Metodología Ágil",
    definition: "The set of Product Backlog items selected for the Sprint, plus a plan for delivering the product Increment and realizing the Sprint Goal.",
    collocations: ["protect the backlog", "refine the backlog", "user stories"],
    falseFriends: "No es un 'registro de espalda'; es el inventario de tareas comprometidas para la iteración actual.",
    nativeUsage: "Once the sprint starts, the sprint backlog is locked and no new features can be added without canceling the sprint."
  },
  {
    term: "Impediment",
    ipa: "/ɪmˈpɛd.ə.mənt/",
    es: "Impedimento / Bloqueador",
    category: "Comunicación Profesional",
    definition: "Any obstacle that prevents the team from achieving its goal or completing work efficiently (often referred to interchangeably with 'blocker').",
    collocations: ["remove impediments", "report a blocker", "Daily Scrum"],
    falseFriends: "Es sinónimo de obstáculo o bloqueo, usado formalmente en las reuniones diarias.",
    nativeUsage: "My main impediment today is that the testing database is down, blocking my QA tasks."
  },
  {
    term: "Velocity",
    ipa: "/vəˈlɑː.sə.ti/",
    es: "Velocidad (Puntos por Sprint)",
    category: "Métricas Ágiles",
    definition: "A measure of the amount of work a Team can tackle during a single Sprint, usually calculated by adding up the story points of all fully completed user stories.",
    collocations: ["team velocity", "predictable velocity", "burndown chart"],
    falseFriends: "En Scrum, no es rapidez en km/h, sino la capacidad de producción del equipo medida en 'story points' por iteración.",
    nativeUsage: "If our team's average velocity is 40 points, we shouldn't commit to 60 points in the next sprint."
  }
];

const pmSocratic = [
  {
    step: 1,
    concept: "Scope Creep & Stakeholders",
    botQuestion: "Welcome to the PMO (Project Management Office)! If a client (a key 'stakeholder') keeps asking for extra features without increasing the budget or timeline, what is the professional term for this uncontrolled expansion? Why is it dangerous?",
    requiredKeywords: ["scope", "creep", "stakeholder", "uncontrolled", "budget", "time"],
    minKeywords: 3,
    feedbackSuccess: "Perfect! That is 'Scope Creep', driven by stakeholders. It is incredibly dangerous because it forces the team to do more work within the same time and budget, leading to burnout and missed deadlines.",
    feedbackRetry: "Think about the word 'Scope' (the boundaries of the project). What happens when it slowly 'creeps' outward? Who are the people (starts with 'S') demanding these changes?"
  },
  {
    step: 2,
    concept: "Scrum Roles & Impediments",
    botQuestion: "In the Agile Scrum framework, if a developer cannot finish their code because a server is down, what do they call this problem during the Daily Scrum? Whose specific role (title) is it to remove this obstacle?",
    requiredKeywords: ["impediment", "blocker", "scrum", "master", "remove"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! The developer reports an 'impediment' or 'blocker', and the Scrum Master is the servant-leader responsible for removing it so the team can maintain their velocity.",
    feedbackRetry: "What is the formal word for a 'blocker' or obstacle? And who is the 'Master' of the Scrum process tasked with removing it?"
  }
];

if (!LXP_COURSES["project-management"]) {
  LXP_COURSES["project-management"] = {
    id: "project-management",
    category: "cat-career",
    title: "Project Management & Communication",
    titleES: "Gestión de Proyectos y Comunicación",
    icon: "📊",
    desc: "Master Agile Scrum frameworks, PMBOK methodologies, and professional stakeholder communication.",
    descES: "Domina marcos de trabajo Agile Scrum, metodologías PMBOK y comunicación profesional con stakeholders.",
    modules_required: 1,
    modules: [
      {
        id: "pm-m1",
        title: "Agile & PMBOK",
        titleES: "Agile y PMBOK",
        isGoldModel: true,
        readings: [
          {
            id: "pm-m1-r1",
            title: "Scope Management & Scrum",
            duration: "10 min",
            content: pmReading,
            vocabulary: pmLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: pmDialogue,
        lexiconMatrix: pmLexicon,
        socraticChallenges: pmSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["project-management"].modules[0] = {
    id: "pm-m1",
    title: "Agile & PMBOK",
    titleES: "Agile y PMBOK",
    isGoldModel: true,
    readings: [
      {
        id: "pm-m1-r1",
        title: "Scope Management & Scrum",
        duration: "10 min",
        content: pmReading,
        vocabulary: pmLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: pmDialogue,
    lexiconMatrix: pmLexicon,
    socraticChallenges: pmSocratic,
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
console.log('Successfully added PM module to courses.js');
