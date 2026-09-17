/**
 * scripts/build_business_leadership_gold.cjs
 * Authors complete Gold Standard modules for:
 * business-leadership (biz-m1 to biz-m5)
 * Updates track status to "full".
 */

const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '../content/courses.js');
const { LXP_COURSES } = require(coursesPath);

// biz-m1
const biz_m1 = {
  id: "biz-m1",
  title: "Executive Decision Making & C-Suite Board Presentations",
  titleES: "Toma de Decisiones Ejecutivas y Presentaciones a Consejos Directivos",
  icon: "fa-solid fa-person-chalkboard",
  isGoldModel: true,
  readings: [
    {
      id: "biz-m1-r1",
      title: "Executive Communication Architecture: The Pyramid Principle, Data Synthesis & Boardroom Persuasion",
      duration: "15 min",
      content: `
# Executive Communication Architecture: The Pyramid Principle, Data Synthesis & Boardroom Persuasion

In senior management and executive engineering leadership, technical brilliance alone is insufficient. An engineering director who presents a 90-slide technical dissertation filled with intricate circuit schematics and minute mathematical proofs to a corporate Board of Directors will fail to secure capital. C-suite executives and board members operate under severe cognitive time constraints: they evaluate strategic enterprise risk, capital allocation, and shareholder returns across dozens of global business units simultaneously.

To persuade executive decision-makers, leaders must master the **Minto Pyramid Principle**, deploy **Bottom Line Up Front (BLUF)** communication, distill complex operational data into actionable financial metrics (**EBITDA, ROIC, Free Cash Flow**), and command boardroom presence during adversarial Q&A sessions.

---

## 1. The Minto Pyramid Principle: Top-Down Deductive Synthesis

Developed by Barbara Minto at McKinsey & Company, the **Pyramid Principle** inverted traditional academic storytelling. In academic writing, a researcher presents background context, details methodologies, reviews experimental data, and finally reveals the conclusion at the very end. In executive communication, this bottom-up structure is disastrous—busy executives become impatient or interrupt before the speaker reaches the point.

\`\`\`
The Executive Pyramid Principle Architecture:
                  [ Core Recommendation / Bottom Line Up Front (BLUF) ]
                                          |
          +-------------------------------+-------------------------------+
          |                               |                               |
    [ Key Line 1: Strategic ROI ]   [ Key Line 2: Risk Mitigation ] [ Key Line 3: Speed-to-Market ]
          |                               |                               |
     (Supporting                     (Supporting                     (Supporting
      Quantitative Data)              Quantitative Data)              Quantitative Data)
\`\`\`

### The SCQA Narrative Hook
Before delivering the pyramid, executives frame the business context using the **SCQA Framework**:
1. **Situation (S)**: The baseline, uncontroversial reality that everyone agrees upon (*"Our Monterrey plant is currently operating at 94% stamping press capacity under existing OEM contracts"*).
2. **Complication (C)**: The external catalyst or crisis disrupting that equilibrium (*"Our primary customer just awarded us a new EV battery enclosure program requiring a 45% production surge by Q3 next year"*).
3. **Question (Q)**: The core strategic challenge (*"How do we expand manufacturing throughput without exceeding our corporate leverage ratio or delaying delivery milestones?"*).
4. **Answer (A / BLUF)**: The immediate, definitive executive recommendation (*"We recommend investing $32 million USD in a fully automated servo-stamping cell in Monterrey, funded via supplier equipment leasing, generating a 22% ROIC within 24 months"*).

---

## 2. Board Deck Engineering: High Signal-to-Noise Ratio

A **Board Deck** is not a teleprompter for the speaker; it is an executive decision-making tool. World-class presentations adhere to the **10-Slide Rule** and eliminate visual clutter:

### The Action Title Mandate
Every slide title must be an **Action Title** that summarizes the core takeaway of the slide in one complete, assertive sentence. 
- *Prohibited Passive Title*: *"Q3 Scrap Rates."*
- *Executive Action Title*: *"Automated vision inspection reduced Q3 stamping scrap from 4.2% to 1.1%, delivering $1.4M USD in annualized savings."*
A board director flipping through the deck in 60 seconds should understand the complete strategic narrative simply by reading the slide titles.

### The Rule of Mutually Exclusive, Collectively Exhaustive (MECE)
Supporting arguments must be **MECE**:
- **Mutually Exclusive**: No overlap between categories (no double-counting of benefits or risks).
- **Collectively Exhaustive**: All potential strategic alternatives have been evaluated, leaving zero blind spots.

---

## 3. Financial Synthesis for Technical Leaders: EBITDA, ROIC & Payback

When proposing engineering automation or facility expansion, C-suite executives evaluate technical projects through three fundamental corporate finance metrics:

\`\`\`
Executive Financial Valuation Matrix:
1. EBITDA Margin:                    (Operating Profit + D&A) / Total Revenue
2. Return on Invested Capital (ROIC): Net Operating Profit After Tax (NOPAT) / Total Invested Capital
3. Payback Period:                   Initial Capital Investment / Annual Net Cash Inflow
4. Internal Rate of Return (IRR):    Discount rate making Net Present Value (NPV) equal to zero
\`\`\`

### 1. EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)
Measures pure operational profitability before capital financing structures and accounting tax shields. Executives want to know: *"Will this automated robotic welding line expand our plant EBITDA margin from 14% to 18%?"*

### 2. ROIC vs. WACC (The Value Creation Spread)
A company only creates true economic shareholder value if its **ROIC exceeds its Weighted Average Cost of Capital (WACC)**:
$$\\text{Economic Value Added (EVA)} = \\text{Invested Capital} \\times (\\text{ROIC} - \\text{WACC})$$
If corporate cost of capital (WACC) is $9\\%$, an engineering capital expenditure (CAPEX) project delivering an ROIC of $21\\%$ creates massive economic value; a project delivering $8\\%$ destroys capital even if it is technically impressive.

---

## 4. Engineering Field Scenario: Defending a $45M Capital Request in Chicago

At the global headquarters of an automotive Tier-1 supplier in Chicago, Illinois:

### The High-Stakes Boardroom Setting
The Vice President of Mexico Operations stood before the Board of Directors and Chief Executive Officer to request authorization for a **$\\$45\\ \\text{Million USD Capital Expenditure (CAPEX)}$** to construct a specialized aluminum die-casting plant in Saltillo, Coahuila.

### The Adversarial Challenge from the Audit Committee Chair
Ten seconds into the presentation, the Audit Committee Chair interrupted:
> *"Victor, interest rates are at a 15-year high, and US-Mexico cross-border freight costs have surged 18%. Why should we allocate forty-five million dollars of capital to a greenfield foundry in Mexico rather than outsourcing production to certified Tier-2 casting suppliers in Ohio?"*

### Executing the Executive Bridging & The Rule of Three
Instead of becoming defensive or shuffling through technical slides, the VP maintained executive composure, paused for two seconds, and deployed **The Rule of Three**:

1. **Acknowledge and Reframe**: *"That is the exact strategic trade-off our executive team evaluated over the past four months, Mr. Chairman."*
2. **Deliver the Three Pillared Defense (BLUF)**:
   - *"First, **Unit Economics**: In-house high-pressure die-casting in Saltillo delivers a finished component cost of twenty-eight dollars per housing versus forty-one dollars from Ohio vendors, saving eighty-two million dollars over the six-year program life."*
   - *"Second, **Quality Control & Scrap Containment**: Outsourcing structural battery housings introduces a three-week transit pipeline; an undetected casting porosity defect would trap twenty thousand defective units in transit before containment. In Saltillo, line-side CT-scanning provides closed-loop feedback in four minutes."*
   - *"Third, **Tariff Resilience under USMCA**: Because the Saltillo facility utilizes North American aluminum ingot, it satisfies the seventy-five percent Regional Value Content threshold, guaranteeing zero import duties under USMCA rules."*
3. **The Closing Synthesis**: *"The net present value of the Saltillo plant is forty-two million dollars with an Internal Rate of Return of twenty-six percent, paying back our investment in two point eight years. That is why in-house capital allocation is superior to vendor outsourcing."*
4. **The Board Vote**: The Audit Committee Chair nodded in approval, and the board unanimously authorized the $\\$45\\ \\text{M}$ capital allocation.

---

> **Key Takeaway**: Executive persuasion transforms engineering complexity into strategic commercial clarity. By utilizing the Minto Pyramid Principle, framing recommendations with BLUF, quantifying EBITDA and ROIC value creation, and answering tough board inquiries with structured poise, technical leaders secure corporate investment.
`
    }
  ],
  dialogue: {
    title: "Defending a $45M Capital Allocation at the Chicago Board Meeting",
    titleES: "Defendiendo una Asignación de Capital de $45M en la Junta Directiva de Chicago",
    scenarioContext: "A Vice President of North American Operations in Monterrey defends a major capital expansion budget before the Chairman of the Board and Chief Financial Officer in Chicago.",
    characters: [
      { name: "Arthur Kensington", role: "Chairman of the Board of Directors", company: "Apex Mobility Systems (Chicago, IL)" },
      { name: "Ing. Víctor Reséndez", role: "VP of Mexico Manufacturing Operations", company: "Apex Powertrain México (Monterrey, NL)" }
    ],
    turns: [
      {
        speaker: "Arthur Kensington",
        text: "Victor, looking at your capital expenditure proposal for forty-five million dollars to expand the Monterrey die-casting plant, Finance notes that our corporate cost of capital is sitting at nine percent. Why should we deploy our free cash flow into Mexican fixed assets rather than executing our planned share repurchase program?",
        translation: "Víctor, viendo tu propuesta de gasto de capital de cuarenta y cinco millones de dólares para expandir la planta de fundición a presión de Monterrey, Finanzas señala que nuestro costo de capital corporativo está en nueve por ciento. ¿Por qué deberíamos destinar nuestro flujo de caja libre a activos fijos mexicanos en lugar de ejecutar nuestro programa de recompra de acciones?",
        targetTerms: ["capital expenditure proposal", "cost of capital", "free cash flow", "share repurchase program"]
      },
      {
        speaker: "Ing. Víctor Reséndez",
        text: "Mr. Chairman, the bottom line up front is that this expansion delivers an Internal Rate of Return of twenty-six percent and an annualized Return on Invested Capital of twenty-one percent, generating twelve points of positive spread over our nine percent WACC.",
        translation: "Señor Presidente, la conclusión principal por adelantado es que esta expansión entrega una Tasa Interna de Retorno del veintiséis por ciento y un Retorno sobre Capital Invertido anualizado del veintiuno por ciento, generando doce puntos de margen positivo sobre nuestro WACC del nueve por ciento.",
        targetTerms: ["bottom line up front", "Internal Rate of Return", "Return on Invested Capital", "positive spread over WACC"]
      },
      {
        speaker: "Arthur Kensington",
        text: "Those financial projections look compelling on paper. But what is driving that margin expansion? Are we relying primarily on labor arbitrage, or are there structural operational efficiencies?",
        translation: "Esas proyecciones financieras se ven atractivas en papel. Pero, ¿qué está impulsando esa expansión de margen? ¿Estamos dependiendo principalmente del arbitraje laboral, o existen eficiencias operativas estructurales?",
        targetTerms: ["financial projections", "margin expansion", "labor arbitrage", "operational efficiencies"]
      },
      {
        speaker: "Ing. Víctor Reséndez",
        text: "Labor arbitrage accounts for less than twenty percent of the savings. The core driver is vertical supply chain integration. Currently, we purchase cast aluminum motor housings from third-party vendors in Asia, incurring four thousand dollars per container in maritime freight and eighteen days of pipeline inventory buffer.",
        translation: "El arbitraje laboral representa menos del veinte por ciento de los ahorros. El impulsor principal es la integración vertical de la cadena de suministro. Actualmente, compramos carcasas de motor de aluminio fundido a proveedores en Asia, incurriendo en cuatro mil dólares por contenedor de flete marítimo y dieciocho días de inventario de amortiguamiento en tránsito.",
        targetTerms: ["vertical supply chain integration", "third-party vendors", "maritime freight", "pipeline inventory buffer"]
      },
      {
        speaker: "Arthur Kensington",
        text: "What about the execution risk of commissioning high-tonnage automated casting cells in Monterrey? Can the local engineering team handle the technological ramp-up without schedule slippage?",
        translation: "¿Qué hay del riesgo de ejecución al comisionar celdas de fundición automatizadas de alto tonelaje en Monterrey? ¿Puede el equipo de ingeniería local manejar el arranque tecnológico sin desviaciones de calendario?",
        targetTerms: ["execution risk", "high-tonnage automated casting cells", "technological ramp-up", "schedule slippage"]
      },
      {
        speaker: "Ing. Víctor Reséndez",
        text: "Our Monterrey engineering center already operates three automated five-thousand-ton cells with an average Overall Equipment Effectiveness of eighty-seven percent, outperforming our European plants. We have locked in turnkey commissioning contracts with suppliers and will hit full serial volume within fourteen months.",
        translation: "Nuestro centro de ingeniería de Monterrey ya opera tres celdas automatizadas de cinco mil toneladas con una Efectividad General de los Equipos promedio del ochenta y siete por ciento, superando a nuestras plantas europeas. Hemos asegurado contratos de comisionamiento llave en mano con proveedores y alcanzaremos volumen de serie completo en catorce meses.",
        targetTerms: ["Overall Equipment Effectiveness", "outperforming our European plants", "turnkey commissioning contracts", "full serial volume"]
      }
    ],
    contrastTips: [
      {
        school: "I have forty slides showing all our machine blueprints.",
        native: "The bottom line up front is an investment of forty-five million delivering a twenty-six percent IRR and a two-point-eight year payback.",
        explanation: "Board executives demand the financial conclusion and business case first (BLUF); detailed engineering schematics belong in backup appendices."
      },
      {
        school: "We want to do this because the engineers like the new technology.",
        native: "This capital investment generates twelve points of economic value creation over our corporate cost of capital.",
        explanation: "Engineering proposals must be framed in enterprise finance terminology (ROIC vs. WACC, EBITDA expansion) rather than technological novelty."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "The Pyramid Principle",
      ipa: "/ðə ˈpɪr.ə.mɪd ˈprɪn.sə.pəl/",
      es: "El Principio de la Pirámide (Metodología Minto)",
      category: "Executive Communication",
      definition: "A top-down structured communication framework developed by Barbara Minto where the core conclusion or recommendation is presented first, followed by supporting grouped arguments.",
      collocations: ["structure slides per the Pyramid Principle", "top-down deductive reasoning", "Pyramid Principle synthesis", "SCQA narrative framework"],
      falseFriends: "The Pyramid Principle is an executive communication model, not a financial pyramid scheme or architectural structure.",
      nativeUsage: "The strategy consultant restructured the executive deck using the Pyramid Principle to ensure the board saw the recommendation within thirty seconds."
    },
    {
      term: "Bottom Line Up Front (BLUF)",
      ipa: "/ˈbɒt.əm ˌlaɪn ʌp ˈfrʌnt /blʌf/",
      es: "Conclusión Principal por Adelantado (BLUF)",
      category: "Executive Communication",
      definition: "The practice of stating the primary decision, financial impact, and strategic recommendation in the opening sentence of an executive briefing, email, or presentation.",
      collocations: ["lead with the BLUF", "BLUF executive summary", "provide a clear BLUF", "concise BLUF statement"],
      falseFriends: "'Bluff' in everyday speech means a deceptive lie, but in corporate management, BLUF is an acronym for direct, transparent honesty.",
      nativeUsage: "The engineering director opened his presentation with the BLUF: 'We recommend decommissioning Line 3 to save $2.4M annually.'"
    },
    {
      term: "Return on Invested Capital (ROIC)",
      ipa: "/rɪˈtɜːrn ɒn ɪnˈvɛs.tɪd ˈkæp.ɪ.təl /ˌɑːr.oʊ.aɪˈsiː/",
      es: "Retorno sobre el Capital Invertido (ROIC)",
      category: "Corporate Finance",
      definition: "A core financial metric assessing how efficiently a company allocates its capital to generate profits, calculated as Net Operating Profit After Tax (NOPAT) divided by Invested Capital.",
      collocations: ["exceed the corporate ROIC hurdle rate", "generate positive spread over WACC", "ROIC value creation", "ROIC benchmarking"],
      falseFriends: "ROIC measures return on all invested debt and equity capital, unlike ROE (Return on Equity) which measures returns only to common stockholders.",
      nativeUsage: "The capital committee approved the automation project because its projected ROIC of 22% was double the company's cost of capital."
    },
    {
      term: "EBITDA Margin",
      ipa: "/ɪˈbɪt.dɑː ˈmɑːr.dʒɪn/",
      es: "Margen EBITDA (Utilidad antes de Intereses, Impuestos, Depreciación y Amortización)",
      category: "Financial Valuation",
      definition: "A profitability ratio measuring a company's operational earnings as a percentage of total revenue, excluding non-operating financing costs and non-cash accounting depreciation.",
      collocations: ["expand the EBITDA margin by 300 bps", "EBITDA margin target", "operational cash generation via EBITDA", "consolidated EBITDA performance"],
      falseFriends: "EBITDA measures operating cash earnings; it does not account for necessary ongoing capital equipment replacement expenditures (CAPEX).",
      nativeUsage: "The plant manager was awarded an executive bonus after increasing the Saltillo facility's EBITDA margin from 12% to 16%."
    },
    {
      term: "Capital Expenditure (CAPEX)",
      ipa: "/ˈkæp.ɪ.təl ɪkˈspɛn.dɪ.tʃər /ˈkæp.ɛks/",
      es: "Gasto de Capital (CAPEX / Activos Fijos)",
      category: "Corporate Finance",
      definition: "Funds allocated by a business to acquire, upgrade, or construct physical long-term assets such as industrial buildings, stamping presses, robotics, or facilities.",
      collocations: ["authorize a $45M CAPEX budget", "CAPEX versus OPEX trade-off", "multi-year CAPEX allocation", "CAPEX depreciation schedule"],
      falseFriends: "CAPEX is capitalized on the balance sheet and depreciated over years, unlike OPEX (operating expenses) which are deducted immediately from revenue.",
      nativeUsage: "The board voted to approve thirty million dollars in CAPEX for a new battery assembly facility in Querétaro."
    },
    {
      term: "Weighted Average Cost of Capital (WACC)",
      ipa: "/ˈweɪ.tɪd ˈæv.ər.ɪdʒ ˌkɒst əv ˈkæp.ɪ.təl /wæk/",
      es: "Costo Promedio Ponderado de Capital (WACC / CPPC)",
      category: "Corporate Finance",
      definition: "The blended average rate of return a company is expected to pay to all its security holders (debt holders and equity shareholders) to finance its assets.",
      collocations: ["benchmark against corporate WACC", "exceed the 9% WACC threshold", "calculate project WACC", "WACC hurdle rate"],
      falseFriends: "WACC represents the company's cost of money; an investment must generate returns above WACC to create genuine economic value.",
      nativeUsage: "Because our corporate WACC increased to 10%, any new manufacturing initiative must demonstrate an internal rate of return of at least 15%."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Structuring an Executive Proposal via the SCQA Framework",
      botQuestion: "Your plant engineering team in Monterrey has designed an automated robotic welding upgrade costing $8.5M USD that will eliminate an ongoing micro-crack defect on EV chassis subassemblies, reducing scrap by 75% and saving $3.2M USD annually (payback in 2.6 years). Transform this technical proposal into a top-down executive SCQA opening statement suitable for the Chief Operating Officer.",
      requiredKeywords: ["situation", "complication", "question", "answer", "bluf", "payback"],
      minKeywords: 3,
      feedbackSuccess: "Spot on executive synthesis! SCQA Architecture: 1) Situation: Our Monterrey facility currently manufactures 120,000 EV chassis subassemblies annually under contract for our primary OEM client; 2) Complication: Rising chassis welding cycle speeds have driven heat-affected micro-crack scrap rates to 3.8%, risking customer containment penalties and warranty liabilities; 3) Question: How do we eliminate chassis weld defects and protect our contractual margins without halting line output? 4) Answer (BLUF): We recommend investing $8.5M USD in an automated robotic laser-welding cell in Monterrey, slashing scrap by 75%, generating $3.2M USD in annualized cash savings, and achieving full capital payback in 2.6 years with an ROIC of 28%.",
      feedbackRetry: "Structure the response following the four distinct steps: Situation (current baseline), Complication (the defect problem), Question (the strategic challenge), and Answer / BLUF (the $8.5M investment, $3.2M savings, and 2.6-year payback)."
    },
    {
      step: 2,
      concept: "Evaluating Economic Value Added (EVA) against Corporate WACC",
      botQuestion: "A manufacturing division submits two competing capital expenditure proposals to the corporate investment committee. Project Alpha (Tooling Retooling): Invested Capital: $10M; Expected Annual NOPAT: $1.4M (ROIC: 14%). Project Beta (Warehouse Expansion): Invested Capital: $20M; Expected Annual NOPAT: $1.8M (ROIC: 9%). If the corporate Weighted Average Cost of Capital (WACC) is 10.0%, calculate the Economic Value Added (EVA) for both projects and determine which project creates shareholder value.",
      requiredKeywords: ["eva", "roic", "wacc", "value creation", "destroy", "spread"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding financial valuation! EVA = Invested Capital * (ROIC - WACC). 1) Project Alpha: EVA = $10M * (14% - 10%) = $10M * (+4%) = +$400,000 USD positive economic value created annually. 2) Project Beta: EVA = $20M * (9% - 10%) = $20M * (-1%) = -$200,000 USD negative economic value (destroys shareholder wealth). Verdict: Project Alpha creates true shareholder value because its ROIC exceeds the cost of capital by 400 basis points. Project Beta must be rejected because its return is below the 10% cost of money, destroying $200k in corporate value every year despite showing positive accounting profit.",
      feedbackRetry: "Calculate the spread (ROIC - WACC) for both projects. If ROIC > WACC (10%), the project creates value; if ROIC < WACC, the project destroys capital. Multiply the spread by the invested capital to determine EVA."
    }
  ],
  quiz: [
    {
      q: "Under the Minto Pyramid Principle, what is the fundamental rule for structuring executive communications?",
      options: [
        "Explain all background engineering formulas before presenting any conclusions",
        "Place the bottom line and core recommendation up front (BLUF), followed by mutually exclusive supporting arguments and data",
        "Always use at least 100 slides to prove thoroughness",
        "Let the audience guess the conclusion at the end of the meeting"
      ],
      answer: 1
    },
    {
      q: "When does an engineering capital expenditure project create genuine economic shareholder value?",
      options: [
        "Whenever the equipment uses the newest version of software",
        "Only when the Return on Invested Capital (ROIC) exceeds the company's Weighted Average Cost of Capital (WACC)",
        "When the machines are painted the corporate brand color",
        "Whenever the project costs more than ten million dollars"
      ],
      answer: 1
    },
    {
      q: "On an executive board slide deck, what is an 'Action Title'?",
      options: [
        "A title written in flashing red neon fonts",
        "A complete, assertive takeaway sentence that summarizes the core strategic insight of the slide rather than a passive topic label",
        "A title that includes movie sound effects",
        "A title listing the names of all junior engineers on the team"
      ],
      answer: 1
    },
    {
      q: "What is EBITDA Margin in financial analysis?",
      options: [
        "The total weight of the factory building in metric tons",
        "A profitability metric evaluating operating cash earnings as a percentage of revenue, before the impact of interest, taxes, depreciation, and amortization",
        "The fee paid to commercial real estate agents",
        "The discount given to retail customers on Black Friday"
      ],
      answer: 1
    }
  ]
};

console.log("Saving biz_m1...");

module.exports = { biz_m1 };
