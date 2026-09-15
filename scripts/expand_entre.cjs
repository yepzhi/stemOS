// scripts/expand_entre.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Entrepreneurship:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// ENTREPRENEURSHIP: Startups & Venture Capital (entre-m1)
// -------------------------------------------------------------
const entreReading = `
> **Industry Alignment & Business Standard**: Aligned with **Lean Startup Methodology** and **Silicon Valley Venture Capital Due Diligence**. Essential for Founders, CTOs, and Product Managers.

# Tech Entrepreneurship, Innovation, and Venture Capital

Building a revolutionary piece of technology is only the first step. To bring it to the world, engineers must often become entrepreneurs. The technology startup ecosystem operates on its own specialized language, focusing on rapid iteration, market validation, and high-risk capital.

## 1. The Lean Startup Methodology
Most startups fail not because their technology doesn't work, but because they build something nobody wants. The Lean Startup methodology combats this by emphasizing speed and customer feedback over rigid business plans.
- **Minimum Viable Product (MVP)**: The version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort. It is not a "broken" product; it is the core functionality necessary to test a hypothesis.
- **Pivot vs. Persevere**: If the MVP proves that the initial hypothesis was wrong, the startup must **pivot**—a structured course correction designed to test a new fundamental hypothesis about the product, strategy, or engine of growth.
- **Product-Market Fit (PMF)**: The holy grail for a startup. It means being in a good market with a product that can satisfy that market. You know you have PMF when customers are buying the product faster than you can make it.

## 2. Venture Capital (VC) and Fundraising
Startups that aim to scale massively usually require external funding. This capital comes from Angel Investors or Venture Capitalists.
- **Bootstrapping**: Funding a company using personal finances or the operating revenues of the new company. This preserves equity (ownership) but usually limits the speed of growth.
- **Seed Round**: The first official equity funding stage. It typically helps the company finance its first steps, including market research and product development, often ending with the launch of the MVP.
- **Series A, B, C**: Subsequent rounds of funding designed to scale the business, enter new markets, or acquire competitors. 
- **Burn Rate and Runway**: **Burn Rate** is the rate at which a company is spending its venture capital to finance overhead before generating positive cash flow. **Runway** is the amount of time the company has before it runs out of money (calculated as Cash Balance divided by Burn Rate).

## 3. Intellectual Property and Due Diligence
Before a VC writes a check, they perform rigorous **Due Diligence**—an investigation or audit of a potential investment.
- **Cap Table (Capitalization Table)**: A spreadsheet that details who owns what in the company (founders, investors, employees with stock options).
- **IP Protection**: Investors want to ensure the startup actually owns its core technology. Patents, trademarks, and strictly enforced Non-Disclosure Agreements (NDAs) are critical during technical due diligence.

---
> **Key Takeaway**: Engineering innovation must be paired with extreme market focus (**MVP** and **Product-Market Fit**) and disciplined financial management (**Burn Rate** and **Runway**) to survive the rigorous **Due Diligence** of Venture Capitalists.
`;

const entreDialogue = {
  title: "Board Meeting: Seed Round Runway",
  titleES: "Reunión de Junta: Pista Financiera en Ronda Semilla",
  scenarioContext: "Silicon Valley, CA (Venture Capital Office). The founding team is pitching their hardware startup's progress.",
  characters: [
    { name: "Jessica Chen", role: "Partner, Horizon Ventures", avatar: "JC", color: "var(--cyan)" },
    { name: "Ing. Mateo Ruiz", role: "CEO & Co-Founder", avatar: "MR", color: "var(--amber)" }
  ],
  turns: [
    {
      speaker: "Jessica Chen",
      text: "Mateo, your user growth is impressive, but looking at the financials, your monthly burn rate has increased to $150k. With your current cash balance, your runway is down to barely four months.",
      translation: "Mateo, tu crecimiento de usuarios es impresionante, pero viendo las finanzas, tu tasa de consumo mensual (burn rate) ha aumentado a $150k. Con tu saldo de efectivo actual, tu pista (runway) se ha reducido a apenas cuatro meses.",
      targetTerms: ["financials", "burn rate", "cash balance", "runway"]
    },
    {
      speaker: "Ing. Mateo Ruiz",
      text: "We know. The hardware prototyping for the MVP was more expensive than anticipated. However, we've finally achieved strong product-market fit; our churn rate is less than 2%.",
      translation: "Lo sabemos. El prototipado de hardware para el MVP fue más caro de lo anticipado. Sin embargo, finalmente hemos logrado un fuerte ajuste producto-mercado (product-market fit); nuestra tasa de abandono (churn rate) es de menos del 2%.",
      targetTerms: ["MVP", "product-market fit", "churn rate"]
    },
    {
      speaker: "Jessica Chen",
      text: "That low churn rate is exactly what we want to see. But before we lead your Series A round, we need to conduct full technical due diligence and review the updated cap table.",
      translation: "Esa baja tasa de abandono es exactamente lo que queremos ver. Pero antes de liderar tu ronda Serie A, necesitamos realizar una debida diligencia (due diligence) técnica completa y revisar la tabla de capitalización (cap table) actualizada.",
      targetTerms: ["Series A round", "due diligence", "cap table"]
    },
    {
      speaker: "Ing. Mateo Ruiz",
      text: "We are ready. We have also filed two provisional patents for the core sensor technology, ensuring our IP is fully protected before scaling.",
      translation: "Estamos listos. También hemos presentado dos patentes provisionales para la tecnología de sensores central, asegurando que nuestra propiedad intelectual (IP) esté completamente protegida antes de escalar.",
      targetTerms: ["provisional patents", "sensor technology", "IP", "scaling"]
    }
  ],
  contrastTips: [
    {
      school: "We spend a lot of money and will run out in 4 months.",
      native: "Our burn rate is high, reducing our runway to four months.",
      explanation: "En finanzas de startups, el gasto mensual para operar a pérdida se llama 'burn rate', y el tiempo de vida restante con el efectivo actual es el 'runway'."
    },
    {
      school: "We checked that people like our first basic product.",
      native: "Our MVP has demonstrated strong product-market fit.",
      explanation: "El 'producto básico' es el Minimum Viable Product (MVP), y la aceptación comprobada en el mercado es el codiciado 'Product-Market Fit'."
    }
  ]
};

const entreLexicon = [
  {
    term: "Minimum Viable Product (MVP)",
    ipa: "/ˈmɪn.ɪ.məm ˈvaɪ.ə.bəl ˈprɑː.dʌkt/",
    es: "Producto Mínimo Viable (MVP)",
    category: "Desarrollo de Producto",
    definition: "A version of a product with just enough features to be usable by early customers who can then provide feedback for future product development.",
    collocations: ["launch an MVP", "iterate the MVP", "core functionality"],
    falseFriends: "No significa que el producto es defectuoso o 'mínimamente funcional' de mala forma; es la versión más pequeña posible para validar un negocio.",
    nativeUsage: "Instead of building the full app, we launched an MVP using a simple landing page to test customer interest."
  },
  {
    term: "Burn Rate",
    ipa: "/bɜːrn reɪt/",
    es: "Tasa de Quema / Consumo (de Capital)",
    category: "Finanzas de Startup",
    definition: "The rate at which a new company is spending its venture capital to finance overhead before generating positive cash flow from operations.",
    collocations: ["monthly burn rate", "reduce the burn rate", "cash flow"],
    falseFriends: "No es la tasa de incendios; es qué tan rápido la empresa está quemando (gastando) el dinero de los inversionistas.",
    nativeUsage: "If we don't reduce our monthly burn rate, we will be out of business by Q3."
  },
  {
    term: "Runway",
    ipa: "/ˈrʌn.weɪ/",
    es: "Pista (Tiempo de vida financiero)",
    category: "Finanzas de Startup",
    definition: "The amount of time a company has until it runs out of cash, assuming current income and expenses stay constant. Calculated as Cash Balance ÷ Monthly Burn Rate.",
    collocations: ["extend the runway", "12 months of runway", "run out of cash"],
    falseFriends: "En este contexto no es una pista de aterrizaje para aviones, es la 'pista' de tiempo que tiene la empresa para despegar financieramente.",
    nativeUsage: "The new $2M seed investment gives us 18 months of runway to finish developing the hardware."
  },
  {
    term: "Due Diligence",
    ipa: "/duː ˈdɪl.ɪ.dʒəns/",
    es: "Debida Diligencia (Auditoría de Inversión)",
    category: "Legal y Financiero",
    definition: "An investigation, audit, or review performed to confirm facts or details of a matter under consideration, typically before a venture capital firm signs a term sheet.",
    collocations: ["technical due diligence", "pass due diligence", "legal audit"],
    falseFriends: "No es simplemente ser 'diligente'; es una auditoría legal y financiera exhaustiva y formal.",
    nativeUsage: "The VC firm discovered a flaw in our software architecture during their technical due diligence."
  },
  {
    term: "Product-Market Fit (PMF)",
    ipa: "/ˈprɑː.dʌkt ˈmɑːr.kɪt fɪt/",
    es: "Ajuste Producto-Mercado",
    category: "Estrategia",
    definition: "The degree to which a product satisfies a strong market demand. It is the first step to building a successful venture.",
    collocations: ["achieve PMF", "strong PMF", "scale after PMF"],
    falseFriends: "No es un producto 'en forma'; es el momento crítico donde el mercado realmente necesita y compra lo que estás haciendo.",
    nativeUsage: "You shouldn't spend money on massive marketing campaigns until you have definitively achieved product-market fit."
  },
  {
    term: "Cap Table",
    ipa: "/kæp ˈteɪ.bəl/",
    es: "Tabla de Capitalización",
    category: "Legal y Financiero",
    definition: "A spreadsheet or table that shows the capitalization, or ownership stakes, in a startup or early-stage company.",
    collocations: ["clean cap table", "equity distribution", "stock options"],
    falseFriends: "No es una 'mesa con gorras'; es el documento legal que dice quién es dueño de qué porcentaje de la empresa.",
    nativeUsage: "The new investor refused to fund us because our cap table was too complicated with too many early advisors holding large equity stakes."
  }
];

const entreSocratic = [
  {
    step: 1,
    concept: "MVP & Product-Market Fit",
    botQuestion: "Welcome to the Startup Incubator! Instead of spending two years building a perfect, complex app in secret, what is the 'lean' strategy you should use? Once you launch it, what is the ultimate goal (3-word phrase starting with P) that proves people actually want to buy it?",
    requiredKeywords: ["mvp", "minimum", "viable", "product", "product-market", "fit", "pmf"],
    minKeywords: 2,
    feedbackSuccess: "Perfect! You build a Minimum Viable Product (MVP) to quickly test your idea, and you keep iterating until you achieve Product-Market Fit (PMF) – the proof that the market actually wants your product.",
    feedbackRetry: "Think about the acronym for 'Minimum Viable Product'. And what is the term for when your product perfectly matches the needs of the market?"
  },
  {
    step: 2,
    concept: "Burn Rate & Runway",
    botQuestion: "If your startup has $500,000 in the bank and you are spending $50,000 a month to pay developers without making any profit, what is the term for that $50k/month spending? And how many months of 'runway' do you have left?",
    requiredKeywords: ["burn", "rate", "10", "ten", "months", "runway"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! The $50k spending is your 'Burn Rate', and dividing your $500k cash balance by that burn rate means you have exactly 10 months of 'Runway' left before you go bankrupt.",
    feedbackRetry: "The money you are 'burning' through each month is called the B____ R____. If you divide $500k by $50k, how many months of 'Runway' do you get?"
  }
];

if (!LXP_COURSES["entrepreneurship"]) {
  LXP_COURSES["entrepreneurship"] = {
    id: "entrepreneurship",
    category: "cat-career",
    title: "Entrepreneurship & Innovation English",
    titleES: "Emprendimiento e Innovación Tecnológica",
    icon: "💡",
    desc: "Master Lean Startup methodology, Venture Capital financials, and technical due diligence.",
    descES: "Domina la metodología Lean Startup, finanzas de Venture Capital y auditorías técnicas (due diligence).",
    modules_required: 1,
    modules: [
      {
        id: "entre-m1",
        title: "Startups & Venture Capital",
        titleES: "Startups y Capital Emprendedor",
        isGoldModel: true,
        readings: [
          {
            id: "entre-m1-r1",
            title: "MVP, Product-Market Fit & Due Diligence",
            duration: "10 min",
            content: entreReading,
            vocabulary: entreLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: entreDialogue,
        lexiconMatrix: entreLexicon,
        socraticChallenges: entreSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["entrepreneurship"].modules[0] = {
    id: "entre-m1",
    title: "Startups & Venture Capital",
    titleES: "Startups y Capital Emprendedor",
    isGoldModel: true,
    readings: [
      {
        id: "entre-m1-r1",
        title: "MVP, Product-Market Fit & Due Diligence",
        duration: "10 min",
        content: entreReading,
        vocabulary: entreLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: entreDialogue,
    lexiconMatrix: entreLexicon,
    socraticChallenges: entreSocratic,
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
console.log('Successfully added Entrepreneurship module to courses.js');
