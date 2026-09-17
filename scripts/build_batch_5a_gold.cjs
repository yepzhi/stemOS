/**
 * scripts/build_batch_5a_gold.cjs
 * Authors complete Gold Standard modules for:
 * 1. industrial-operations (io-m1 to io-m5)
 * 2. healthcare-tech (health-m1 to health-m5)
 * Updates their track status from "blueprint" to "full".
 */

const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '../content/courses.js');
const { LXP_COURSES } = require(coursesPath);

// ============================================================================
// 1. INDUSTRIAL OPERATIONS (io-m1 to io-m5)
// ============================================================================

const io_m1 = {
  id: "io-m1",
  title: "USMCA/T-MEC Cross-Border Customs & Pedimentos",
  titleES: "Aduanas Transfronterizas T-MEC y Pedimentos de Importación",
  icon: "fa-solid fa-truck-ramp-box",
  isGoldModel: true,
  readings: [
    {
      id: "io-m1-r1",
      title: "Cross-Border Customs Architecture: USMCA Rules of Origin, IMMEX & Pedimento Execution",
      duration: "15 min",
      content: `
# Cross-Border Customs Architecture: USMCA Rules of Origin, IMMEX & Pedimento Execution

In the era of North American nearshoring, manufacturing efficiency is inseparable from cross-border customs velocity. A high-volume Tier-1 automotive or electronics plant operating in Monterrey, Saltillo, or Ciudad Juárez depends on seamless transit across the United States–Mexico border, predominantly through major land ports like Laredo (World Trade Bridge / Colombia Solidarity), Otay Mesa, and Pharr. 

Moving raw materials, sub-assemblies, and finished goods across this frontier requires strict compliance with binational legal frameworks: the **United States-Mexico-Canada Agreement (USMCA / T-MEC)**, the Mexican **IMMEX program**, and the digital customs declaration known as the **Pedimento Aduanal**.

---

## 1. The Legal Framework: USMCA Rules of Origin & Tariff Elimination

The USMCA replaced NAFTA with significantly stricter compliance mandates designed to incentivize regional procurement of automotive components, steel, aluminum, and advanced electronics.

### Preferential Tariff Treatment
Under USMCA, goods qualify for duty-free or preferential tariff entry only if they satisfy strict **Rules of Origin (RoO)** specified by Harmonized Tariff Schedule (HTS / Fracción Arancelaria) codes:
1. **Wholly Obtained or Produced**: Goods grown, mined, or harvested entirely within North America (e.g., agricultural products, raw minerals).
2. **Tariff Shift (Change in Tariff Classification)**: Non-originating components imported from Asia or Europe must undergo substantial transformation within Mexico, the US, or Canada, resulting in a shift in their HTS chapter, heading, or subheading (e.g., turning raw steel coils into automotive stampings).
3. **Regional Value Content (RVC)**: Demands that a specified percentage of the product’s total value originate within the USMCA trade zone.

### RVC Mathematical Formulations
The agreement establishes two primary methods for calculating RVC:

#### Transaction Value Method (TVM):
$$\\text{RVC} = \\frac{\\text{TV} - \\text{VNM}}{\\text{TV}} \\times 100$$

Where $\\text{TV}$ is the transaction value of the good (adjusted to FOB basis) and $\\text{VNM}$ is the value of non-originating materials used in production.

#### Net Cost Method (NCM):
$$\\text{RVC} = \\frac{\\text{NC} - \\text{VNM}}{\\text{NC}} \\times 100$$

Where $\\text{NC}$ represents the net cost of the product (excluding sales promotion, marketing, royalties, and non-allowable interest). For core automotive parts (engines, transmissions, EV battery packs), USMCA mandates an RVC threshold of up to **$75\\%$ under Net Cost**, along with requirements that $70\\%$ of corporate steel and aluminum purchases originate in North America.

---

## 2. The IMMEX Program & VAT Certification (Anexo 24 / 30)

Mexico’s **IMMEX (Manufacturing, Maquiladora and Export Services Industry)** program allows foreign and domestic manufacturers to temporarily import raw materials, machinery, and tooling without paying the general import duty (IGI) or the standard $16\\%$ Value Added Tax (IVA).

### The Tax Credit Mechanism (IVA/IEPS Certification)
Under the Mexican Tax Administration Service (**SAT**), companies with IMMEX registration apply for **IVA/IEPS Certification (Levels A, AA, AAA)**. A certified company obtains a $100\\%$ fiscal credit on the $16\\%$ VAT due at customs entry. To maintain this privilege, the plant must prove that temporarily imported components are physically transformed and re-exported within statutory deadlines (typically 18 months).

### Automated Inventory Control (Anexo 24 & Anexo 30)
- **Anexo 24**: A legally mandated software system tracking real-time bills of materials (BOM), raw material receipts, scrap rates, and finished goods export shipments.
- **Anexo 30**: SAT’s centralized digital balance control system (CCCyG). Every time an export pedimento clears customs, Anexo 30 credits the original temporary import pedimento, discharging the fiscal liability. Unaccounted-for materials are treated by SAT as illegal domestic diversions subject to severe retroactive penalties.

---

## 3. The Pedimento Aduanal: Structure & Data Integrity

The **Pedimento** is the legal fiscal affidavit generated by a licensed Mexican Customs Broker (**Agente Aduanal**) and submitted electronically to SAT’s automated customs portal (SAAI / VUCEM).

### Key Pedimento Fields & Document Codes (Claves)
- **Clave de Pedimento**: Identifies the customs regime:
  - **A1**: Definite import or export of goods.
  - **IN**: Temporary import of raw materials for transformation by an IMMEX company.
  - **AF**: Temporary import of fixed assets (machinery, injection molds, robots) under IMMEX.
  - **RT**: Return of transformed finished goods to foreign markets.
  - **V1**: Virtual transfer of goods between two distinct IMMEX maquiladoras inside Mexico.
- **Fracción Arancelaria (HTS 8-digit + 2-digit NICO)**: Establishes exact tariff rate, commercial description, and non-tariff regulatory compliance (NOM standards).
- **Contribuciones (Taxes & Fees)**: Quantifies DTA (Derecho de Trámite Aduanero), PRV (Prevalidación fee), and applicable duties.
- **DODA / PITA (Digital Tracking Barcodes)**: Replaced physical paper stamped pedimentos with QR/RFID digital cards scanned by automated gate readers at the international border.

---

## 4. Engineering Field Scenario: The Fast-Track Border Clearance at Laredo

Consider a daily cross-border supply chain operation between a Tier-1 wiring harness plant in Saltillo, Coahuila, and an OEM assembly plant in Arlington, Texas:

### The Inspection Protocol & C-TPAT / OEA Fast Lanes
1. **Pre-Clearance Validation**: The Saltillo plant generates the commercial invoice, packing list, and electronic Anexo 24 export ledger. The Mexican customs broker files the **RT export pedimento**, while the US customs broker files the **US CBP Entry Summary (Form 7501)** via the Automated Commercial Environment (ACE).
2. **Physical Loading & Tamper-Evident Seals**: The 53-foot dry van is loaded, and an **ISO 17712 certified high-security bolt seal** is clamped across the locking bars. The seal number is digitally logged on the electronic manifest.
3. **C-TPAT / OEA FAST Lane Processing**: Because both the manufacturer and the cross-border drayage carrier are certified under **C-TPAT (Customs-Trade Partnership Against Terrorism)** and Mexico's **OEA**, the truck enters the dedicated FAST (Free and Secure Trade) lane at the Nuevo Laredo customs facility.
4. **Automated Customs Selection (Semáforo Fiscal)**: The driver approaches the automated boom barrier and scans the PITA/DODA badge:
   - **Green Light (Desaduanamiento Libre)**: The system verifies digital clearances in under 3 seconds; the barrier lifts immediately without human contact.
   - **Red Light (Reconocimiento Aduanero)**: The truck is routed to the inspection bay for non-intrusive gamma-ray imaging (vacis) and physical seal verification by SAT inspectors.
5. **Bridge Crossing & US CBP Release**: The tractor crosses the Rio Grande over the World Trade Bridge. The driver presents the CBP FAST card and barcode to the US border booth, where biometric facial recognition and automated radiation portals release the shipment into US commerce in under 90 seconds.

---

> **Key Takeaway**: Cross-border logistics mastery requires synchronizing USMCA Regional Value Content (RVC) calculations, IMMEX temporary import tracking (Anexo 24/30), and exact Pedimento documentation. Leveraging C-TPAT/OEA certifications and digital FAST clearance prevents border bottlenecks that threaten Just-in-Time assembly lines.
`
    }
  ],
  dialogue: {
    title: "Expediting a Bonded Trailer at the Laredo Border Crossing",
    titleES: "Agilizando un Remolque en Tránsito Aduanal en el Cruce de Laredo",
    scenarioContext: "A US Logistics Director in Dallas and a Mexican Customs Compliance Manager in Monterrey coordinate to resolve a pedimento validation hold on an urgent shipment of stamped engine brackets.",
    characters: [
      { name: "Robert Miller", role: "Director of Supply Chain Logistics", company: "Apex Powertrain Systems (Dallas, TX)" },
      { name: "Sofía Villarreal", role: "Customs Compliance & Trade Manager", company: "Apex Precision Components (Monterrey, NL)" }
    ],
    turns: [
      {
        speaker: "Robert Miller",
        text: "Sofia, our Arlington assembly line is running on critical inventory for those engine mounting brackets. Dispatch shows trailer fifty-two is stuck on the Mexican side of the World Trade Bridge. What is the hold-up at customs?",
        translation: "Sofía, nuestra línea de ensamblaje en Arlington está con inventario crítico de soportes de motor. El despacho muestra que el remolque 52 está detenido en el lado mexicano del Puente World Trade. ¿Cuál es la demora en aduanas?",
        targetTerms: ["critical inventory", "stuck on the Mexican side", "customs hold-up"]
      },
      {
        speaker: "Sofía Villarreal",
        text: "The delay was caused by a mismatch in the automated prevalidation system. Our customs broker flagged a discrepancy between the commercial invoice and the export pedimento regarding the eight-digit tariff classification.",
        translation: "La demora fue causada por una discrepancia en el sistema automatizado de prevalidación. Nuestro agente aduanal detectó una inconsistencia entre la factura comercial y el pedimento de exportación respecto a la fracción arancelaria de ocho dígitos.",
        targetTerms: ["prevalidation system", "customs broker", "export pedimento", "tariff classification"]
      },
      {
        speaker: "Robert Miller",
        text: "Did the tariff shift affect our USMCA preferential origin claim? If US Customs rejects the certificate of origin, we could face standard Most-Favored-Nation duties and secondary inspection.",
        translation: "¿Afectó el salto arancelario nuestra reclamación de origen preferencial T-MEC? Si la aduana de EE.UU. rechaza el certificado de origen, podríamos enfrentar aranceles de Nación Más Favorecida e inspección secundaria.",
        targetTerms: ["tariff shift", "preferential origin claim", "certificate of origin", "Most-Favored-Nation duties"]
      },
      {
        speaker: "Sofía Villarreal",
        text: "No, the Regional Value Content comfortably satisfies the seventy-five percent net cost rule. The issue was simply a clerical typo in the NICO commercial identifier on the RT pedimento. The broker has already submitted the electronic amendment.",
        translation: "No, el Contenido de Valor Regional cumple holgadamente con la regla del setenta y cinco por ciento de costo neto. El problema fue un simple error tipográfico en el identificador comercial NICO en el pedimento RT. El agente aduanal ya envió la rectificación electrónica.",
        targetTerms: ["Regional Value Content", "net cost rule", "clerical typo", "electronic amendment"]
      },
      {
        speaker: "Robert Miller",
        text: "Outstanding. Once the amendment clears SAT prevalidation, will the driver still be able to utilize the dedicated C-TPAT FAST lane to bypass the general cargo queue?",
        translation: "Excelente. Una vez que la rectificación pase la prevalidación del SAT, ¿podrá el chofer seguir utilizando el carril exclusivo C-TPAT FAST para esquivar la fila de carga general?",
        targetTerms: ["clears SAT prevalidation", "C-TPAT FAST lane", "general cargo queue"]
      },
      {
        speaker: "Sofía Villarreal",
        text: "Yes, both the drayage carrier and tractor are FAST certified with valid high-security bolt seals. We should receive the green light on the digital barcode scanner within fifteen minutes, putting the trailer across the Rio Grande before noon.",
        translation: "Sí, tanto la empresa de transfer como el tractocamión están certificados en FAST con sellos de alta seguridad vigentes. Deberíamos recibir luz verde en el escáner de código de barras digital en quince minutos, cruzando el Río Bravo antes del mediodía.",
        targetTerms: ["drayage carrier", "high-security bolt seals", "green light", "barcode scanner"]
      }
    ],
    contrastTips: [
      {
        school: "The paper is with the customs officer.",
        native: "The export pedimento is undergoing automated electronic prevalidation.",
        explanation: "In industrial trade, modern customs operations are completely digitized; professional engineers refer specifically to 'pedimento prevalidation' and 'customs brokerage' rather than generic papers."
      },
      {
        school: "We pay no taxes because of free trade.",
        native: "The shipment qualifies for preferential duty-free treatment under USMCA Rules of Origin.",
        explanation: "Duty-free entry is never automatic; it requires strict legal qualification under specific Rules of Origin (RoO) and Regional Value Content (RVC) calculations."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Pedimento Aduanal",
      ipa: "/pe.ðiˈmen.to a.ðwaˈnal/",
      es: "Pedimento de importación/exportación",
      category: "Customs & Compliance",
      definition: "The official electronic fiscal declaration submitted to Mexican customs (SAT) validating legal entry, duty payment, and regulatory compliance of goods.",
      collocations: ["clear an import pedimento", "rectify a pedimento error", "file an RT export pedimento", "pedimento validation code"],
      falseFriends: "Do not confuse 'pedimento' with 'petition' (a formal request to an authority). A pedimento is strictly a customs entry document.",
      nativeUsage: "The auditor requested the original pedimento along with the Anexo 24 discharge balance."
    },
    {
      term: "Regional Value Content (RVC)",
      ipa: "/ˈriː.dʒən.əl ˈvæl.juː ˈkɒn.tent/",
      es: "Contenido de Valor Regional (CVR)",
      category: "Trade Agreements",
      definition: "The statutory percentage of a manufactured product’s cost or value that must originate within the USMCA trade zone to qualify for duty-free entry.",
      collocations: ["meet the RVC threshold", "calculate RVC via net cost", "RVC audit trail", "regional value requirement"],
      falseFriends: "Avoid translating literally as 'regional value content' without specifying whether the Net Cost or Transaction Value method applies.",
      nativeUsage: "Under USMCA automotive rules, Tier-1 suppliers must document a minimum 75% RVC to avoid standard tariff penalties."
    },
    {
      term: "Customs Broker",
      ipa: "/ˈkʌs.təmz ˈbroʊ.kər/",
      es: "Agente aduanal",
      category: "Logistics Operations",
      definition: "A licensed legal representative authorized by national customs authorities to classify merchandise, calculate duties, and submit official clearance entries.",
      collocations: ["rely on a licensed customs broker", "brokerage clearance fee", "power of attorney for customs broker", "liaise with the broker"],
      falseFriends: "'Customs' (with an 's') means aduana, whereas 'custom' without an 's' means habit or tailor-made.",
      nativeUsage: "Our Mexican customs broker verified the tariff classification before authorizing the drayage tractor to cross."
    },
    {
      term: "Harmonized Tariff Schedule (HTS)",
      ipa: "/ˈhɑːr.mə.naɪzd ˈtær.ɪf ˈskɛdʒ.uːl/",
      es: "Sistema Arancelario Armonizado (Fracción Arancelaria)",
      category: "Classification",
      definition: "An internationally standardized 6-to-10-digit numerical code used worldwide to classify traded products and assess applicable import duties and trade rules.",
      collocations: ["classify under HTS code", "determine the correct tariff heading", "tariff shift requirement", "10-digit HTS subheading"],
      falseFriends: "Do not confuse 'tariff' (arancel/impuesto) with 'rate' (tasa general).",
      nativeUsage: "Changing the machining process resulted in a new HTS classification that altered our certificate of origin."
    },
    {
      term: "IMMEX Program",
      ipa: "/ˈɪm.ɛks ˈproʊ.ɡræm/",
      es: "Programa IMMEX (Maquiladora)",
      category: "Fiscal Regimes",
      definition: "A Mexican federal initiative permitting manufacturers to import raw materials and production machinery temporarily without paying import duties or 16% VAT.",
      collocations: ["hold an active IMMEX registry", "re-export within the IMMEX window", "IMMEX temporary importation", "maintain Anexo 24 compliance"],
      falseFriends: "IMMEX is an official acronym and should never be translated as 'import-export program'.",
      nativeUsage: "To preserve our IMMEX tax benefits, we reconcile all raw aluminum inventory monthly in Anexo 30."
    },
    {
      term: "C-TPAT Certification",
      ipa: "/ˈsiː.tæp ˌsɜːr.tə.fɪˈkeɪ.ʃən/",
      es: "Certificación C-TPAT (Seguridad en la Cadena de Suministro)",
      category: "Supply Chain Security",
      definition: "Customs-Trade Partnership Against Terrorism: A US CBP voluntary supply-chain security program offering expedited border clearance to verified trusted traders.",
      collocations: ["maintain C-TPAT compliance", "access dedicated FAST lanes", "conduct C-TPAT supply chain audits", "tamper-evident bolt seals"],
      falseFriends: "C-TPAT relates specifically to cargo physical security and counter-contraband measures, not financial tax auditing.",
      nativeUsage: "By requiring C-TPAT certification from our drayage partners, we cut average border wait times from four hours to under forty minutes."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Calculating Regional Value Content under USMCA",
      botQuestion: "Your plant in Saltillo manufactures an electric steering actuator with a Net Cost of $120 USD. Due to global supply shortages, you source $36 USD worth of precision micro-bearings and electronic chips from Germany and Japan. The remaining materials and direct labor originate in Mexico and the US. Does this actuator qualify for duty-free entry under the USMCA 70% Net Cost RVC threshold? Show the calculation formula and explain your conclusion.",
      requiredKeywords: ["net cost", "non-originating", "70%", "formula", "rvc"],
      minKeywords: 3,
      feedbackSuccess: "Spot on! Using the Net Cost formula: RVC = ((NC - VNM) / NC) * 100 = (($120 - $36) / $120) * 100 = ($84 / $120) * 100 = 70.0%. The component exactly hits the 70% threshold, qualifying it for duty-free USMCA treatment.",
      feedbackRetry: "Review the USMCA Net Cost formula: RVC = ((NC - VNM) / NC) * 100. Subtract the non-originating materials ($36) from the net cost ($120), divide by the net cost, and multiply by 100 to check if it reaches 70%."
    },
    {
      step: 2,
      concept: "Resolving Border Discrepancies and Pedimento Rectification",
      botQuestion: "A truck carrying 40 pallets of automotive sensors triggers a 'Red Light' (Reconocimiento Aduanero) at the Nuevo Laredo customs platform because the pallet count in the container physically exceeds the quantity declared on the IN pedimento by 2 pallets. What are the immediate legal risks under Mexican customs law, and what formal procedure must the customs broker execute to resolve it without facing equipment seizure?",
      requiredKeywords: ["pedimento", "broker", "rectification", "seizure", "discrepancy", "sat"],
      minKeywords: 3,
      feedbackSuccess: "Excellent analysis. Unmanifested merchandise risks PAMA (Procedimiento Administrativo en Materia Aduanera), resulting in asset seizure and hefty fines. The customs broker must file a formal electronic pedimento rectification (rectificación de pedimento) and settle any differential taxes and fines before releasing the goods.",
      feedbackRetry: "Focus on Mexican customs enforcement: unmanifested surplus cargo triggers administrative proceedings (PAMA). Mention the role of the customs broker in executing a formal 'rectification' (rectificación de pedimento) and paying administrative adjustments."
    }
  ],
  quiz: [
    {
      q: "Under the USMCA Net Cost method, what is the formula for calculating Regional Value Content (RVC)?",
      options: [
        "RVC = ((NC - VNM) / NC) * 100",
        "RVC = (VNM / NC) * 100",
        "RVC = ((TV - NC) / TV) * 100",
        "RVC = (NC / Total Assets) * 100"
      ],
      answer: 0
    },
    {
      q: "What is the primary operational benefit of the Mexican IMMEX program with IVA/IEPS Certification?",
      options: [
        "It eliminates all labor union negotiations in manufacturing plants",
        "It grants a 100% fiscal credit on the 16% VAT for temporary raw material and machinery imports",
        "It permits trucks to cross the border without any customs documentation",
        "It allows companies to sell products in Mexico without paying income tax"
      ],
      answer: 1
    },
    {
      q: "Which Pedimento key code (Clave) is used for the temporary importation of raw materials by an IMMEX company?",
      options: [
        "A1",
        "AF",
        "IN",
        "RT"
      ],
      answer: 2
    },
    {
      q: "Why do automotive suppliers invest in C-TPAT and OEA security certifications?",
      options: [
        "To obtain cheaper electrical utility rates from CFE",
        "To qualify for dedicated FAST lanes and expedited cross-border customs clearance",
        "To avoid paying corporate income taxes in the United States",
        "To bypass safety inspections required by OSHA"
      ],
      answer: 1
    }
  ]
};

const io_m2 = {
  id: "io-m2",
  title: "Lean Manufacturing: 5S, Kanban and Value Stream Mapping (VSM)",
  titleES: "Manufactura Esbelta: 5S, Kanban y Mapeo de la Cadena de Valor (VSM)",
  icon: "fa-solid fa-arrows-split-up-and-left",
  isGoldModel: true,
  readings: [
    {
      id: "io-m2-r1",
      title: "Lean Production Architecture: Value Stream Mapping, Takt Time & Pull Flow Dynamics",
      duration: "15 min",
      content: `
# Lean Production Architecture: Value Stream Mapping, Takt Time & Pull Flow Dynamics

The Toyota Production System (TPS), formalized globally as **Lean Manufacturing**, transformed modern industrial engineering from a batch-and-queue mass production mindset into an agile, customer-driven operational philosophy. At its core, Lean seeks the relentless identification and elimination of **Muda (Waste)**—any activity that consumes resources, time, or floor space without adding tangible value from the perspective of the paying customer.

In world-class manufacturing plants across Querétaro, Guanajuato, and the US Midwest, operational excellence relies on three foundational engineering methodologies: **Value Stream Mapping (VSM)**, precision **Takt Time synchronization**, and closed-loop **Kanban pull systems**.

---

## 1. The Taxonomy of Waste (The 7+1 Mudas)

To eliminate operational friction, engineers systematically categorize non-value-added activities into eight defined wastes:
1. **Overproduction**: Producing components ahead of schedule or in excess of customer demand. Recognized by Taiichi Ohno as the mother of all wastes because it conceals all underlying defects, balance issues, and machine breakdowns.
2. **Waiting (Starvation / Blockage)**: Idle machine or operator time caused by upstream bottlenecks, delayed raw materials, or prolonged tool changeovers.
3. **Transport**: Unnecessary mechanical conveying, forklift shuttling, or cross-bay transit of WIP (Work-in-Process).
4. **Over-Processing**: Performing tighter machining tolerances, redundant visual inspections, or unnecessary finishing beyond customer specifications.
5. **Inventory (Excess Stock)**: Capital tied up in raw materials, subassemblies, and buffer warehouses that generates carrying costs and risks obsolescence.
6. **Motion**: Inefficient ergonomics, walking, bending, or reaching by technicians due to poor workstation layout.
7. **Defects (Rework & Scrap)**: Producing non-conforming parts that consume raw materials, rework labor, and engineering bandwidth.
8. **Underutilized Human Potential (The 8th Waste)**: Failing to engage operators’ frontline insights, creativity, and problem-solving skills in continuous improvement (**Kaizen**).

---

## 2. Value Stream Mapping (VSM): Current State to Future State

A **Value Stream** encompasses all actions (both value-adding and non-value-adding) required to bring a product from initial raw material receipt to final customer delivery.

\`\`\`
VSM Timeline Architecture:
Raw Material Inbound ---> Stamping ---> Welding ---> Assembly ---> Finished Goods Outbound
Inventory (Days):         3.2 days      1.8 days     0.5 days      2.0 days
Cycle Time (Seconds):      45 sec        38 sec       52 sec
-----------------------------------------------------------------------------------------
Production Lead Time (PLT) = 7.5 days | Value-Added Time (VAT) = 135 seconds
Process Cycle Efficiency (PCE) = VAT / PLT = 135 s / (7.5 * 28,800 s) = 0.0625%
\`\`\`

### The VSM Diagnostic Sequence
1. **Define the Product Family**: Group parts that share similar processing steps and downstream equipment.
2. **Document the Current State**: Walk the physical line from shipping back to receiving ("Go to Gemba"). Record real operating data rather than idealized ERP standards:
   - **Cycle Time (C/T)**: The time it takes an operator or machine to complete one full part cycle.
   - **Changeover Time (C/O)**: Time elapsed between the last good piece of Product A and the first good piece of Product B (addressed via SMED - Single-Minute Exchange of Die).
   - **Uptime / OEE**: Overall Equipment Effectiveness.
   - **WIP Inventory Counts**: Physical counts between operations converted into days of supply.
3. **Calculate Process Cycle Efficiency (PCE)**:
   $$\\text{PCE} = \\frac{\\text{Total Value-Added Time (VAT)}}{\\text{Total Production Lead Time (PLT)}} \\times 100$$
   In unoptimized traditional plants, PCE is typically **under $1\\%$**, meaning components spend $99\\%$ of their plant lifespan sitting idle in queues.
4. **Design the Future State**: Introduce continuous one-piece flow, eliminate intermediate staging, establish pacemaker processes, and connect decoupled cells using pull supermarkets.

---

## 3. Pacing the Factory: Takt Time, Cycle Time & Line Balancing

A lean factory does not run at maximum machine speed; it runs at the exact rhythm demanded by market consumption:

### Takt Time Calculation
Derived from the German word for baton rhythm (*Taktzeit*):

$$\\text{Takt Time} = \\frac{\\text{Net Available Operating Time per Shift}}{\\text{Customer Demand per Shift}}$$

*Example*:
- Net Shift Time: 8 hours ($28,800\\ \\text{s}$) minus two 15-minute breaks and 10 minutes of daily 5S cleanup = $26,400\\ \\text{seconds}$.
- Daily Customer Demand: 550 assemblies across 1 shift.
$$\\text{Takt Time} = \\frac{26,400\\ \\text{s}}{550\\ \\text{units}} = 48.0\\ \\text{seconds/unit}$$

Every 48 seconds, exactly one completed assembly must roll off the packaging line. 

### Line Balancing & The Operator Loading Chart (Yamazumi)
If an individual workstation exhibits a Cycle Time of 56 seconds, it exceeds Takt Time, creating a permanent bottleneck that starves downstream stations. Conversely, an operation with a Cycle Time of 24 seconds causes operator idling or excessive buffer accumulation. Line balancing redistributes work elements across standardized work routines to keep every station operating at **$90\\text{--}95\\%$ of Takt Time**, building in an ergonomic buffer for minor variances.

---

## 4. Engineering Field Scenario: Implementing a Two-Bin Kanban Loop

In a high-precision metal stamping facility supplying automotive transmissions:

### The Problem
The assembly cell frequently suffered line stoppages because operators ran out of internal O-rings, while the central warehouse held an excess inventory of 150,000 units gathering dust.

### The Lean Solution: A Physical Two-Bin Kanban Loop
1. **Bin Sizing Formulation**:
   $$\\text{Kanban Quantity} = \\frac{D \\times L \\times (1 + S)}{C}$$
   Where $D$ is daily demand (1,200 O-rings), $L$ is replenishment lead time (0.5 days), $S$ is safety factor ($10\\%$), and $C$ is bin capacity (300 units).
   $$\\text{Number of Kanban Bins} = \\frac{1,200 \\times 0.5 \\times 1.10}{300} = 2.2 \\approx 3\\ \\text{bins}$$
2. **Workstation Visual Factory Setup**:
   - The cell operator has two labeled plastic bins of O-rings line-side on a gravity flow rack.
   - The operator works exclusively from **Bin 1**.
   - When Bin 1 is empty, the operator slides it to the top return rail and detaches the magnetic **Kanban Card** (specifying part number, bin size, supplier storage rack, and barcode).
   - The operator immediately begins pulling parts from **Bin 2** without interruption.
3. **The Water Beetle (Mizusumashi) Replenishment**:
   - A dedicated material handler follows a strict 30-minute timed route (Milk-Run) picking up empty Kanban cards.
   - The handler scans the card at the supermarket, retrieves exactly one pre-kitted 300-count bin, and returns it to the workstation rack before Bin 2 is depleted.
4. **Poka-Yoke & Andon Integration**:
   - A photoelectric light curtain verifies that the operator touches the O-ring bin during every assembly cycle. If the operator attempts to advance the part fixture without breaking the sensor beam, the fixture clamps lock automatically (**Poka-Yoke**), and an amber **Andon** light flashes to prompt correction before a defective seal can escape.

---

> **Key Takeaway**: Lean manufacturing replaces chaotic push production with visual, synchronized pull flow. By aligning workstation cycle times to customer Takt Time, mapping value streams, and sizing closed-loop Kanban loops, industrial engineers slash lead times and drive near-zero inventory overhead.
`
    }
  ],
  dialogue: {
    title: "Resolving a Line Bottleneck via Yamazumi Balancing",
    titleES: "Resolviendo un Cuello de Botella de Línea mediante Balanceo Yamazumi",
    scenarioContext: "A Continuous Improvement Lead in Guanajuato and a VP of Manufacturing in Detroit analyze line-balancing data after a customer demand surge threatens delivery schedules.",
    characters: [
      { name: "Jim Bradley", role: "VP of Global Manufacturing Operations", company: "AeroMotion Powertrain (Detroit, MI)" },
      { name: "Mariana Morales", role: "Continuous Improvement & Lean Champion", company: "AeroMotion Silao Plant (Guanajuato, MX)" }
    ],
    turns: [
      {
        speaker: "Jim Bradley",
        text: "Mariana, our OEM customer just increased their weekly release schedule by twenty percent for the Gen-Four transaxle. If we cannot match their required takt time, we risk incurring expedited freight charges or shutting down their assembly plant.",
        translation: "Mariana, nuestro cliente OEM acaba de incrementar su programa semanal de pedidos un veinte por ciento para el transeje Gen-Cuatro. Si no logramos igualar el takt time requerido, nos arriesgamos a pagar fletes aéreos urgentes o parar su planta de ensamblaje.",
        targetTerms: ["release schedule", "takt time", "expedited freight charges", "shutting down"]
      },
      {
        speaker: "Mariana Morales",
        text: "Under the new production schedule, our takt time drops from fifty-eight seconds down to forty-six seconds. We walked the gemba this morning, and station three—the planetary carrier press fit—has a measured cycle time of fifty-two seconds. It is a hard bottleneck.",
        translation: "Bajo el nuevo programa de producción, nuestro takt time se reduce de cincuenta y ocho a cuarenta y seis segundos. Caminamos por el gemba esta mañana y la estación tres—el ajuste por prensa del portaplanetarios—tiene un cycle time medido de cincuenta y dos segundos. Es un cuello de botella crítico.",
        targetTerms: ["takt time drops", "walked the gemba", "cycle time", "hard bottleneck"]
      },
      {
        speaker: "Jim Bradley",
        text: "A six-second gap above takt time is unsustainable. Are we seeing operator waiting time or machine index delays? We cannot afford a capital expenditure on an additional hydraulic press right now.",
        translation: "Una brecha de seis segundos por encima del takt time es insostenible. ¿Estamos viendo tiempo de espera del operador o retrasos de indexación de la máquina? No podemos costear la compra de una prensa hidráulica adicional en este momento.",
        targetTerms: ["gap above takt time", "operator waiting time", "machine index delays", "capital expenditure"]
      },
      {
        speaker: "Mariana Morales",
        text: "We performed a time-study and charted an operator Yamazumi diagram. Fourteen seconds of the station's cycle time are consumed by non-value-added manual deburring and secondary barcode scanning. We can offload those tasks upstream to station two, which currently runs at thirty-five seconds.",
        translation: "Realizamos un estudio de tiempos y trazamos un diagrama Yamazumi de operadores. Catorce segundos del ciclo de la estación se consumen en rebabeo manual sin valor agregado y escaneo secundario de códigos de barras. Podemos transferir esas tareas aguas arriba a la estación dos, que actualmente opera a treinta y cinco segundos.",
        targetTerms: ["time-study", "Yamazumi diagram", "non-value-added", "offload those tasks"]
      },
      {
        speaker: "Jim Bradley",
        text: "That would balance station three down to thirty-eight seconds, providing an eight-second safety buffer below our forty-six second takt time. What about the changeover time during model changeovers?",
        translation: "Eso balancearía la estación tres a treinta y ocho segundos, proporcionando un margen de seguridad de ocho segundos por debajo de nuestro takt time de cuarenta y seis segundos. ¿Qué hay del tiempo de cambio durante los cambios de modelo?",
        targetTerms: ["balance station down", "safety buffer", "changeover time", "model changeovers"]
      },
      {
        speaker: "Mariana Morales",
        text: "Our SMED team converted the die clamping bolts to hydraulic quick-release clamps and pre-stages all fixtures on rolling carts. We slashed changeover downtime from forty-two minutes to eight minutes, ensuring our single-piece pull flow remains uninterrupted.",
        translation: "Nuestro equipo de SMED convirtió los pernos de sujeción de troquel a mordazas hidráulicas de liberación rápida y prepara todos los dispositivos en carros rodantes. Redujimos el paro por cambio de modelo de cuarenta y dos minutos a ocho minutos, asegurando que nuestro flujo continuo de una sola pieza no se interrumpa.",
        targetTerms: ["SMED team", "quick-release clamps", "slashed changeover downtime", "single-piece pull flow"]
      }
    ],
    contrastTips: [
      {
        school: "We need to make parts faster.",
        native: "We need to synchronize our station cycle time to customer takt time.",
        explanation: "In Lean engineering, producing faster than takt time creates overproduction waste; the goal is exact synchronization rather than uncontrolled speed."
      },
      {
        school: "We put extra parts in the warehouse just in case.",
        native: "We sized a two-bin Kanban pull supermarket to eliminate buffer overstock.",
        explanation: "Professional lean facilities replace 'just-in-case' stockpiling with calculated Kanban replenishment loops."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Takt Time",
      ipa: "/ˈtɑːkt ˌtaɪm/",
      es: "Tiempo takt / Ritmo de demanda del cliente",
      category: "Lean Metrics",
      definition: "The precise rhythm at which a manufacturing facility must produce units to exactly satisfy customer demand without creating overproduction or shortages.",
      collocations: ["pace production to takt time", "calculate takt time", "station cycle time exceeds takt", "takt time synchronization"],
      falseFriends: "Do not confuse takt time (customer demand rate) with cycle time (actual time taken to perform a process).",
      nativeUsage: "When weekly demand surged to 3,000 units, the manufacturing engineer recomputed the line takt time to 32 seconds."
    },
    {
      term: "Value Stream Mapping (VSM)",
      ipa: "/ˈvæl.juː ˌstriːm ˈmæp.ɪŋ/",
      es: "Mapeo de la Cadena de Valor",
      category: "Lean Diagnostics",
      definition: "A visual flowcharting technique documenting both information and material flows from supplier receipt to customer shipment, distinguishing value-added from waste.",
      collocations: ["develop a current-state VSM", "design the future-state map", "identify bottlenecks on the VSM", "quantify process cycle efficiency"],
      falseFriends: "VSM is not an ordinary organizational workflow chart; it specifically maps manufacturing timeline data (C/T, C/O, WIP days).",
      nativeUsage: "The VSM revealed that although machining took only four minutes, parts spent eleven days waiting in queue across buffer warehouses."
    },
    {
      term: "Kanban Pull System",
      ipa: "/ˈkɑːn.bɑːn ˌpʊl ˈsɪs.təm/",
      es: "Sistema de jale Kanban",
      category: "Material Control",
      definition: "A visual scheduling mechanism (using cards, bins, or electronic signals) authorizing upstream production or material movement only when downstream inventory is consumed.",
      collocations: ["implement a two-bin Kanban", "trigger a replenishment Kanban", "Kanban card authorization", "supermarket pull system"],
      falseFriends: "Kanban is a pull signal, not a batch work order or inventory storage location.",
      nativeUsage: "When the assembly cell scans the empty bin's Kanban barcode, an automated tugger is dispatched to replenish the line."
    },
    {
      term: "Poka-Yoke",
      ipa: "/ˌpoʊ.kəˈjoʊ.keɪ/",
      es: "Mecanismo a prueba de errores",
      category: "Quality Engineering",
      definition: "A mechanical, electrical, or sensory device built into a machine or fixture that physically prevents an operator from committing an assembly error or passing a defect.",
      collocations: ["install a Poka-Yoke sensor", "foolproof fixture design", "Poka-Yoke interlock", "prevent incorrect part orientation"],
      falseFriends: "Poka-Yoke refers specifically to physical mistake-proofing, not to administrative checklists or worker warnings.",
      nativeUsage: "We added an asymmetrical guide pin as a Poka-Yoke to make it physically impossible to load the gasket upside down."
    },
    {
      term: "Single-Minute Exchange of Die (SMED)",
      ipa: "/ˈsɪŋ.ɡəl ˌmɪn.ɪt ɪksˈtʃeɪndʒ əv ˈdaɪ/",
      es: "Cambio rápido de troqueles (SMED)",
      category: "Operational Agility",
      definition: "A lean methodology developed by Shigeo Shingo to reduce machine tool setup and changeover times to single-digit minutes (under 10 minutes).",
      collocations: ["execute a SMED workshop", "convert internal setup to external setup", "quick-disconnect hydraulic fittings", "slash changeover downtime"],
      falseFriends: "'Exchange of die' refers to tooling changeovers, not to the destruction or failure of equipment.",
      nativeUsage: "By applying SMED techniques, the stamping department reduced press changeover times from 65 minutes down to 7 minutes."
    },
    {
      term: "Andon Cord / Board",
      ipa: "/ˈæn.dɒn ˌkɔːrd/",
      es: "Sistema Andon (Alerta visual de paro de línea)",
      category: "Visual Management",
      definition: "A visual and audible notification system that highlights operational status, allowing operators to immediately signal abnormalities or halt production.",
      collocations: ["pull the Andon cord", "Andon board escalation", "trigger an amber Andon warning", "halt the line via Andon"],
      falseFriends: "Andon is not a disciplinary alarm; it is an empowered quality escalation signal.",
      nativeUsage: "The operator pulled the Andon cord the moment the torque wrench detected a cross-threaded bolt, halting the line before the chassis moved."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Calculating Takt Time and Identifying Station Imbalance",
      botQuestion: "Your assembly plant operates a single 8-hour shift per day. After deducting two 15-minute scheduled rest breaks and 10 minutes of daily maintenance, the customer requires 440 transmission control modules per day. What is the exact Takt Time in seconds? If Station 4 requires 62 seconds of manual assembly, what operational consequence will occur if the line is not rebalanced?",
      requiredKeywords: ["takt", "seconds", "bottleneck", "starve", "rebalance", "overtime"],
      minKeywords: 3,
      feedbackSuccess: "Spot on! Net available time is 480 min - 40 min = 440 minutes (26,400 seconds). Takt Time = 26,400 s / 440 units = 60.0 seconds. Because Station 4 takes 62 seconds (exceeding takt time by 2 seconds), it will become a permanent bottleneck, accumulating WIP upstream, starving downstream stations, and causing missed deliveries or mandatory overtime.",
      feedbackRetry: "First calculate the net operating time in seconds: (8 hr * 60 min - 40 min breaks) * 60 seconds. Divide by customer demand (440 units) to find Takt Time. Then compare Station 4's 62-second cycle time against your result."
    },
    {
      step: 2,
      concept: "Applying SMED: Internal vs External Setup Activities",
      botQuestion: "A CNC machining cell takes 50 minutes to perform a tool changeover between batches. During this downtime, the technician leaves the stopped machine to fetch specialized Allen wrenches, retrieve new carbide inserts from the tool crib, and verify part drawings. Categorize these activities as 'Internal' or 'External' setup, and propose a SMED improvement to reduce machine downtime.",
      requiredKeywords: ["internal", "external", "smed", "crib", "downtime", "pre-stage"],
      minKeywords: 3,
      feedbackSuccess: "Excellent Lean diagnosis! Fetching tools, searching for inserts, and reviewing drawings are all 'External Setup' elements because they can be performed while the previous batch is still running on the machine. Under SMED, all tools, fixtures, and inserts must be pre-staged in a dedicated setup cart prior to stopping the spindle, converting idle downtime into active cutting time.",
      feedbackRetry: "Remember the core rule of SMED: 'Internal' activities can only be done when the machine is stopped. 'External' activities can be done while the machine is running. Explain how pre-staging tools and inserts before machine shutdown slashes downtime."
    }
  ],
  quiz: [
    {
      q: "What is the primary difference between Takt Time and Cycle Time in a Lean production system?",
      options: [
        "Takt Time is the rate of customer demand, while Cycle Time is the actual time required to complete a process",
        "Takt Time measures machine downtime, while Cycle Time measures operator breaks",
        "Takt Time is calculated in hours, while Cycle Time is strictly measured in days",
        "There is no difference; both terms represent the same manufacturing metric"
      ],
      answer: 0
    },
    {
      q: "Which of the eight wastes (Mudas) is considered the most critical by Taiichi Ohno because it conceals all other factory problems?",
      options: [
        "Motion",
        "Overproduction",
        "Transport",
        "Over-Processing"
      ],
      answer: 1
    },
    {
      q: "In a physical two-bin Kanban system, what action triggers the replenishment of parts?",
      options: [
        "The shift supervisor conducts an annual inventory audit",
        "The first bin is emptied, and its attached Kanban card is sent to the warehouse or supermarket",
        "Both bins become completely empty and the assembly line shuts down",
        "An automated email is generated by human resources every Friday"
      ],
      answer: 1
    },
    {
      q: "What is the fundamental objective of the SMED (Single-Minute Exchange of Die) methodology?",
      options: [
        "To increase the speed of cutting tools by 500%",
        "To convert internal setup steps into external ones and reduce changeover times to under 10 minutes",
        "To replace human operators with multi-axis robots",
        "To eliminate all physical inspections from the cleanroom"
      ],
      answer: 1
    }
  ]
};

const io_m3 = {
  id: "io-m3",
  title: "Six Sigma DMAIC Methodology & Statistical Quality Control",
  titleES: "Metodología Six Sigma DMAIC y Control Estadístico de la Calidad",
  icon: "fa-solid fa-chart-line",
  isGoldModel: true,
  readings: [
    {
      id: "io-m3-r1",
      title: "Six Sigma DMAIC Architecture: Statistical Process Control, Capability & Root Cause Containment",
      duration: "15 min",
      content: `
# Six Sigma DMAIC Architecture: Statistical Process Control, Capability & Root Cause Containment

Modern industrial manufacturing operates under extreme precision tolerances where minor variations can lead to catastrophic field failures, warranty recalls, and multi-million dollar liability claims. In automotive engine blocks, aerospace turbine blades, and precision electronics, ensuring that $99\\%$ of products meet specifications is unacceptable—a $1\\%$ defect rate in a plant producing 1,000,000 components translates to 10,000 defective parts entering the market.

**Six Sigma** provides the mathematical framework to drive defect rates down to **3.4 Defects Per Million Opportunities (DPMO)** by identifying and reducing process variation. Guided by the **DMAIC (Define, Measure, Analyze, Improve, Control)** methodology and **Statistical Process Control (SPC)**, engineers shift quality management from reactive inspection to predictive variance control.

---

## 1. The DMAIC Lifecycle Framework

DMAIC represents an unvarying, data-driven 5-phase project roadmap for eliminating systemic manufacturing variation:

\`\`\`
DMAIC Problem-Solving Flow:
[Define]   ---> [Measure]   ---> [Analyze]   ---> [Improve]   ---> [Control]
Problem Charter  Gage R&R         Root Cause (ANOVA) DOE Factorial    SPC Charts
VOC / CTQ Specs  Baseline DPMO    Fishbone / 5 Whys  Action Plan      OCAP Protocols
\`\`\`

1. **Define**: Establish the Project Charter, business case, and Customer Critical-to-Quality (**CTQ**) characteristics via the Voice of the Customer (VOC).
2. **Measure**: Quantify current performance baseline. Critical step: Validate the measurement system itself via **Gage R&R** before collecting process data.
3. **Analyze**: Isolate root causes ($\text{root causes } X_s$) of variation in output ($Y$) using statistical testing (ANOVA, Hypothesis Testing, Multi-Vari Charts) and structured cause-and-effect tools (Ishikawa Fishbone diagrams, Failure Modes and Effects Analysis - FMEA).
4. **Improve**: Optimize process variables using **Design of Experiments (DOE)** to identify parameter interactions and establish mathematical transfer functions ($Y = f(X_1, X_2, \dots, X_n)$).
5. **Control**: Institutionalize sustainable gains using Statistical Process Control (SPC) charting, standardized work instructions, and automated Out-of-Control Action Plans (OCAP).

---

## 2. Measurement System Analysis (MSA): Gage Repeatability & Reproducibility (Gage R&R)

Before analyzing manufacturing data, engineers must verify that the measurement instrument and human appraisers are not introducing false variation:

$$\\sigma_{\\text{total}}^2 = \\sigma_{\\text{product}}^2 + \\sigma_{\\text{measurement}}^2$$

Where $\\sigma_{\\text{measurement}}^2$ (Gage R&R) consists of:
- **Repeatability (Equipment Variation - EV)**: Variation observed when one appraiser measures the same part multiple times using the same gage.
- **Reproducibility (Appraiser Variation - AV)**: Variation observed when different appraisers measure the same part using the same gage.

### Gage R&R Acceptance Criteria (%GRR)
$$\\%\\text{GRR} = \\frac{\\sigma_{\\text{Gage R&R}}}{\\sigma_{\\text{Total}}} \\times 100$$
- **$<10\\%$**: Acceptable measurement system.
- **$10\\%\\text{--}30\\%$**: Marginally acceptable depending on application criticality and gage cost.
- **$>30\\%$**: Unacceptable system; measurement error obscures true process variation. Must be redesigned before making engineering conclusions.

---

## 3. Process Capability Indices: $C_p$ vs. $C_{pk}$

A process can be highly repeatable (low standard deviation $\\sigma$) while producing non-conforming parts if its mean ($\mu$) is off-center relative to customer specification limits (Upper Specification Limit - USL, Lower Specification Limit - LSL).

### Potential Capability ($C_p$)
Evaluates the process spread relative to the tolerance width, assuming perfect centering:

$$C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\sigma}$$

### Actual Process Capability ($C_{pk}$)
Accounts for both process variation and mean shift (centering):

$$C_{pk} = \\min\\left(\\frac{\\text{USL} - \\mu}{3\\sigma}, \\frac{\\mu - \\text{LSL}}{3\\sigma}\\right)$$

\`\`\`
Visualizing Process Capability:
LSL                                 USL
 |           Centered Process        |
 |                /\\                 |
 |               /  \\                |  Cp = 1.67, Cpk = 1.67 (World-Class)
 |--------------/----\\---------------|
 
LSL                                 USL
 |                    Shifted Mean   |
 |                         /\\       |
 |                        /  \\      |  Cp = 1.67, Cpk = 0.85 (Failing! Scrap Risk!)
 |-----------------------/----\\------|
\`\`\`

### Automotive Supplier Standards
- **$C_{pk} < 1.0$**: Incapable process; defects are actively being produced.
- **$C_{pk} = 1.33$**: Traditional 4-Sigma threshold (66 PPM defect rate).
- **$C_{pk} \\ge 1.67$**: Automotive Tier-1 gold standard for safety-critical dimensions (PPAP requirement), providing robustness against thermal expansion and tool wear.

---

## 4. Engineering Field Scenario: Statistical Process Control (SPC) & OCAP Containment

In a precision CNC machining cell producing aluminum cylinder heads in Saltillo:

### The Problem
During the morning production shift, the valve seat bore diameter (Nominal: $32.000\\ \\text{mm} \\pm 0.015\\ \\text{mm}$) triggered a high-dimension alarm on the coordinate measuring machine (CMM).

### Real-Time SPC Monitoring: X-bar and R Charts
The cell tracks subgroup samples ($n=5$ parts every 30 minutes) on an **X-bar (Average) and R (Range) Control Chart**. Control limits are calculated using statistical constants ($A_2, D_3, D_4$):

$$\\text{UCL}_{\\bar{X}} = \\bar{\\bar{X}} + A_2 \\cdot \\bar{R}, \\quad \\text{LCL}_{\\bar{X}} = \\bar{\\bar{X}} - A_2 \\cdot \\bar{R}$$

### Detecting an Out-of-Control Condition via Western Electric Rules
The CMM data revealed a **Trend Violation (Western Electric Rule 3)**: seven consecutive subgroup averages steadily increasing toward the Upper Control Limit ($\text{UCL} = 32.012\\ \\text{mm}$), even though no individual part had breached the absolute USL ($32.015\\ \\text{mm}$) yet.

### Executing the Out-of-Control Action Plan (OCAP)
Instead of waiting for actual non-conforming parts to be produced, the quality technician immediately executed the mandatory 4-step OCAP:
1. **Immediate Machine Interlock**: The technician paused spindle rotation on CNC Cell #4.
2. **Lot Quarantine**: The 60 cylinder heads produced since the last in-control subgroup sample were quarantined in red hold bins and tagged for $100\\%$ CMM dimensional verification.
3. **Root Cause Physical Inspection**: The tooling engineer examined the boring bar insert under an optical microscope, discovering built-up edge (BUE) micro-welding on the carbide rake face caused by a clogged high-pressure coolant nozzle.
4. **Corrective Action & Process Verification**: The coolant line was flushed, a fresh coated carbide insert was torqued in place, and three consecutive verification parts measured at $\\mu = 32.001\\ \\text{mm}$ with $C_{pk} = 1.82$ before the supervisor unlocked the spindle.

---

> **Key Takeaway**: Six Sigma replaces subjective troubleshooting with rigorous statistical physics. By validating measurement systems through Gage R&R, tracking $C_{pk}$ capability, and enforcing rapid OCAP containment when SPC trends drift, engineering teams guarantee predictable, near-zero-defect mass production.
`
    }
  ],
  dialogue: {
    title: "Root-Cause Investigation of a Cpk Drop on a CNC Boring Line",
    titleES: "Investigación de Causa Raíz de una Caída de Cpk en una Línea de Barrenado CNC",
    scenarioContext: "A Quality Director in Saltillo and a Senior Reliability Engineer in Cincinnati analyze a sudden decline in process capability on an automated automotive piston line.",
    characters: [
      { name: "David Vance", role: "Senior Reliability Engineering Manager", company: "Tri-State Powertrain (Cincinnati, OH)" },
      { name: "Ing. Carlos Mendoza", role: "Director of Quality Assurance", company: "Motores del Norte (Saltillo, Coahuila)" }
    ],
    turns: [
      {
        speaker: "David Vance",
        text: "Carlos, I am looking at our daily SPC dashboard for the Saltillo plant. The capability index on the wrist pin bore diameter plummeted from one point seven-two down to zero point nine-eight over the last two shifts. What caused the capability collapse?",
        translation: "Carlos, estoy viendo nuestro panel diario de SPC para la planta de Saltillo. El índice de capacidad en el diámetro del barreno del perno de pistón se desplomó de 1.72 a 0.98 en los últimos dos turnos. ¿Qué causó el colapso de capacidad?",
        targetTerms: ["SPC dashboard", "capability index", "plummeted", "capability collapse"]
      },
      {
        speaker: "Ing. Carlos Mendoza",
        text: "We noticed the downward trend at ten AM during routine X-bar charting. Our Cp remained strong at one point six-five, but our Cpk cratered due to a severe negative mean shift toward the Lower Specification Limit.",
        translation: "Notamos la tendencia a la baja a las 10 AM durante el gráfico X-barra de rutina. Nuestro Cp se mantuvo fuerte en 1.65, pero nuestro Cpk se desplomó debido a un severo corrimiento de la media hacia el Límite de Especificación Inferior.",
        targetTerms: ["downward trend", "X-bar charting", "Cp remained strong", "negative mean shift"]
      },
      {
        speaker: "David Vance",
        text: "If Cp is steady but Cpk is failing, that indicates the process spread did not widen—the entire distribution shifted off-center. Did we first rule out measurement error with a Gage R and R check on the automated air gage?",
        translation: "Si Cp es estable pero Cpk está fallando, eso indica que la dispersión del proceso no se amplió—toda la distribución se desplazó del centro. ¿Descartamos primero el error de medición con una prueba de Gage R&R en el calibrador de aire automatizado?",
        targetTerms: ["process spread", "shifted off-center", "Gage R and R check", "air gage"]
      },
      {
        speaker: "Ing. Carlos Mendoza",
        text: "Yes, our metrology lab ran a ten-part, three-operator Gage R and R study. The measurement variation accounted for only six point two percent of total tolerance, so the gage is completely sound.",
        translation: "Sí, nuestro laboratorio de metrología corrió un estudio Gage R&R de diez partes y tres operadores. La variación de medición representó solo el 6.2 por ciento de la tolerancia total, por lo que el calibrador es completamente confiable.",
        targetTerms: ["Gage R and R study", "measurement variation", "total tolerance", "gage is completely sound"]
      },
      {
        speaker: "David Vance",
        text: "Good. What did the Ishikawa fishbone analysis point to? Is the drift driven by thermal spindle elongation, cutting fluid degradation, or raw casting hardness variation?",
        translation: "Bien. ¿Hacia dónde apuntó el análisis de espina de pescado de Ishikawa? ¿El corrimiento está impulsado por elongación térmica del husillo, degradación del fluido de corte o variación de dureza en la fundición cruda?",
        targetTerms: ["Ishikawa fishbone analysis", "thermal spindle elongation", "cutting fluid degradation", "casting hardness variation"]
      },
      {
        speaker: "Ing. Carlos Mendoza",
        text: "We traced the assignable cause to the chilling unit on CNC four. The chiller compressor failed, allowing coolant temperature to climb from twenty to thirty-eight degrees Celsius. The thermal expansion of the reamer tool caused the bore undersize drift. We triggered the OCAP, repaired the chiller, and restored Cpk to one point eight.",
        translation: "Rastreamos la causa asignable a la unidad de enfriamiento en el CNC cuatro. El compresor del enfriador falló, permitiendo que la temperatura del refrigerante subiera de veinte a treinta y ocho grados Celsius. La expansión térmica de la rima causó el diámetro bajo. Activamos el OCAP, reparamos el enfriador y restauramos el Cpk a 1.8.",
        targetTerms: ["assignable cause", "thermal expansion", "triggered the OCAP", "restored Cpk"]
      }
    ],
    contrastTips: [
      {
        school: "The parts are good because they are inside the tolerance limits.",
        native: "The process is stable and capable, demonstrating a Cpk of one point six-seven.",
        explanation: "In modern Tier-1 manufacturing, simply meeting broad tolerance borders is insufficient; customers require statistical verification of process capability and centering."
      },
      {
        school: "We will check the problem when parts break.",
        native: "We initiated an Out-of-Control Action Plan (OCAP) based on run-rule trend violations.",
        explanation: "SPC detects out-of-control statistical trends and triggers containment long before defective parts breach customer specification boundaries."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Process Capability Index (Cpk)",
      ipa: "/ˈprɒs.ɛs ˌkeɪ.pəˈbɪl.ə.ti ˈɪn.dɛks /ˌsiː.piːˈkeɪ/",
      es: "Índice de Capacidad del Proceso (Cpk)",
      category: "Statistical Quality",
      definition: "A statistical metric that evaluates both the dispersion and centering of a manufacturing process relative to customer specification limits (USL/LSL).",
      collocations: ["demonstrate a Cpk above 1.67", "calculate process capability", "Cpk degradation over time", "PPAP capability submission"],
      falseFriends: "Do not confuse Cpk (which penalizes off-center means) with Cp (which measures spread only).",
      nativeUsage: "The automotive OEM will not authorize volume production until the supplier proves a stable Cpk of at least 1.67."
    },
    {
      term: "Gage R&R (Repeatability & Reproducibility)",
      ipa: "/ˈɡeɪdʒ ɑːr ənd ɑːr/",
      es: "Estudio Gage R&R (Repetibilidad y Reproducibilidad)",
      category: "Metrology & MSA",
      definition: "A statistical evaluation measuring how much of total observed process variation originates from the measurement tool (repeatability) and the human inspectors (reproducibility).",
      collocations: ["run an ANOVA Gage R&R", "exceed the 10% Gage R&R limit", "evaluate measurement system error", "repeatability vs reproducibility"],
      falseFriends: "'Gage' in metrology refers to a precision measuring instrument, not to guessing or sizing broadly.",
      nativeUsage: "Before retooling the grinding station, the quality engineer completed a Gage R&R to ensure the micrometers were capable."
    },
    {
      term: "Statistical Process Control (SPC)",
      ipa: "/stəˈtɪs.tɪ.kəl ˈprɒs.ɛs kənˈtroʊl/",
      es: "Control Estadístico de Procesos (CEP / SPC)",
      category: "Process Monitoring",
      definition: "The deployment of statistical control charts (X-bar, R, p-charts) to distinguish common-cause natural variation from assignable-cause special variation in real time.",
      collocations: ["deploy real-time SPC", "monitor X-bar and R charts", "breach Upper Control Limits", "SPC trend violation"],
      falseFriends: "Control limits on an SPC chart are calculated from process data ($\pm 3\sigma$), whereas specification limits (USL/LSL) are defined by the customer drawing.",
      nativeUsage: "The automated assembly line logged SPC data points every ten seconds to detect tool wear before defects were generated."
    },
    {
      term: "Out-of-Control Action Plan (OCAP)",
      ipa: "/ˈaʊt əv kənˈtroʊl ˈæk.ʃən ˌplæn/",
      es: "Plan de Acción para Procesos Fuera de Control (OCAP)",
      category: "Quality Containment",
      definition: "A standardized, pre-approved flowchart directing technicians on immediate containment, machine interlocks, and root-cause actions when an SPC chart triggers an alarm.",
      collocations: ["trigger the mandatory OCAP", "execute containment protocol", "OCAP disposition of quarantine inventory", "sign off on OCAP closure"],
      falseFriends: "OCAP is an operational escalation protocol, not a routine maintenance schedule.",
      nativeUsage: "Following the OCAP instructions, the technician quarantined 150 bracket housings and shut down Spindle B for inspection."
    },
    {
      term: "Design of Experiments (DOE)",
      ipa: "/dɪˈzaɪn əv ɪkˈspɛr.ə.mənts/",
      es: "Diseño de Experimentos (DOE)",
      category: "Process Optimization",
      definition: "A systematic mathematical method for manipulating multiple input parameters ($X_s$) simultaneously to evaluate their interactions and impact on output quality ($Y$).",
      collocations: ["conduct a full factorial DOE", "analyze parameter interactions", "derive the empirical transfer function", "DOE response surface methodology"],
      falseFriends: "'Experiment' in engineering refers to rigorous statistical matrix testing, not a casual or haphazard trial.",
      nativeUsage: "The injection molding team ran a 16-run fractional factorial DOE to pinpoint the optimal combination of barrel temperature and pack pressure."
    },
    {
      term: "Fishbone Diagram (Ishikawa / 5M+E)",
      ipa: "/ˈfɪʃ.boʊn ˈdaɪ.ə.ɡræm/",
      es: "Diagrama de Espina de Pescado (Ishikawa)",
      category: "Root Cause Analysis",
      definition: "A visual brainstorming tool structuring potential root causes into six standardized industrial categories: Man, Machine, Material, Method, Measurement, and Milieu (Environment).",
      collocations: ["facilitate a fishbone brainstorming session", "populate the 6M categories", "trace root causes on Ishikawa", "pair fishbone with 5 Whys"],
      falseFriends: "A fishbone diagram organizes hypotheses; it does not replace empirical testing to prove the true root cause.",
      nativeUsage: "During the 8D containment meeting, the team mapped the porosity defects on a fishbone diagram to isolate casting variables."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Interpreting Cp versus Cpk Discrepancies",
      botQuestion: "Your supplier of aluminum die-cast housings reports a Cp of 1.75 and a Cpk of 0.82 on the critical seal groove depth. As the lead quality engineer, what does this mathematical difference tell you about the state of their manufacturing process? What immediate risk does it pose, and what corrective action should you demand from the supplier?",
      requiredKeywords: ["spread", "centering", "mean", "specification", "scrap", "shift"],
      minKeywords: 3,
      feedbackSuccess: "Spot on! A high Cp (1.75) proves the process has very tight variation (small standard deviation) and is inherently capable. However, the low Cpk (0.82) proves the process mean is significantly off-center, drifting close to or beyond one of the specification limits. This poses an immediate risk of producing non-conforming scrap parts. You must demand an immediate tool offset adjustment to re-center the mean between USL and LSL.",
      feedbackRetry: "Remember: Cp measures only process spread ((USL - LSL) / 6 sigma), while Cpk accounts for the process mean. Explain what it means when spread is small but the mean is shifted toward a specification boundary."
    },
    {
      step: 2,
      concept: "Evaluating Gage R&R Study Results",
      botQuestion: "A Tier-1 supplier submits a PPAP package where the Gage R&R on a laser micrometer measuring valve stem diameter is calculated at 34.8% of total process tolerance. The supplier argues that the parts are within tolerance, so the gage should be approved. How do you respond based on AIAG MSA guidelines?",
      requiredKeywords: ["unacceptable", "30%", "reject", "measurement error", "msa", "variation"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding quality governance. Under AIAG MSA standards, any Gage R&R exceeding 30% is mathematically unacceptable because the measurement system variation consumes too much of the total tolerance band, obscuring true process trends. You must reject the PPAP submission and require the supplier to fix or replace the measurement system before approving serial production.",
      feedbackRetry: "Refer to the standard AIAG thresholds for Gage R&R: <10% is acceptable, 10-30% is marginal, and >30% is unacceptable. Explain why a 34.8% measurement error invalidates the reliability of the inspection data."
    }
  ],
  quiz: [
    {
      q: "What does it indicate when a manufacturing process exhibits a high Cp (e.g., 1.80) but a low Cpk (e.g., 0.75)?",
      options: [
        "The measurement instrument is broken",
        "The process has very low variation but is operating off-center relative to specification limits",
        "The operators are working too slowly",
        "The customer drawing has no tolerance limits"
      ],
      answer: 1
    },
    {
      q: "According to AIAG Measurement System Analysis (MSA) standards, what is the acceptable threshold for a Gage R&R study?",
      options: [
        "Under 10% is acceptable; over 30% is unacceptable",
        "Under 50% is acceptable for all parts",
        "Gage R&R should always equal exactly 100%",
        "There are no percentage thresholds in modern metrology"
      ],
      answer: 0
    },
    {
      q: "On an SPC control chart, what is the critical difference between Control Limits and Specification Limits?",
      options: [
        "Control limits are defined by the customer; specification limits are calculated from machine data",
        "Control limits reflect natural process variation (±3 sigma); specification limits are engineering tolerances defined by customer requirements",
        "Control limits are only used for scrap parts; specification limits are only used for prototypes",
        "Both limits are identical and interchangeable"
      ],
      answer: 1
    },
    {
      q: "What is the primary function of an Out-of-Control Action Plan (OCAP)?",
      options: [
        "To negotiate union wage agreements during shift transitions",
        "To provide a standardized protocol for containment, investigation, and correction when an SPC alarm triggers",
        "To calculate annual corporate profit margins",
        "To order raw materials automatically from overseas suppliers"
      ],
      answer: 1
    }
  ]
};

const io_m4 = {
  id: "io-m4",
  title: "Incoterms 2020 Operational Execution (FOB, DDP, EXW)",
  titleES: "Ejecución Operativa de Incoterms 2020 (FOB, DDP, EXW)",
  icon: "fa-solid fa-file-contract",
  isGoldModel: true,
  readings: [
    {
      id: "io-m4-r1",
      title: "Incoterms 2020 Operational Execution: Risk Allocation, Cost Transfer Points & Freight Contracts",
      duration: "15 min",
      content: `
# Incoterms 2020 Operational Execution: Risk Allocation, Cost Transfer Points & Freight Contracts

In international cross-border manufacturing and multi-modal freight distribution, commercial misunderstandings regarding transport obligations can instantly generate catastrophic supply chain paralysis, legal litigation, and crippling financial losses. When cargo is damaged at sea, stranded at a customs terminal, or detained under maritime demurrage penalties, clear contractual boundaries dictate who pays and who bears legal responsibility.

The **International Commercial Terms (Incoterms 2020)**, published by the International Chamber of Commerce (ICC), serve as the universal contractual language governing global trade. They clearly divide eleven recognized operational rules into two distinct dimensions: the **Transfer of Risk** (where the seller’s responsibility for physical loss or damage shifts to the buyer) and the **Allocation of Costs** (who pays for packing, inland drayage, international freight, terminal handling, export clearance, and import duties).

---

## 1. The Core Taxonomy of Incoterms 2020

The eleven Incoterms are organized into four structural groups reflecting escalating seller liability:

\`\`\`
Spectrum of Seller Obligation:
[EXW - Ex Works]  --->  [FCA / FOB]  --->  [CPT / CIP / CIF]  --->  [DDP - Delivered Duty Paid]
Minimum Seller Obligation                                            Maximum Seller Obligation
Buyer handles everything                                             Seller handles everything
\`\`\`

### Group E: Departure Rule
- **EXW (Ex Works)**: The seller makes goods available at their own facility (factory or warehouse). The buyer assumes all costs and risks of loading goods onto the collecting vehicle, export clearance, international freight, and final delivery. 
*Industrial Caution*: EXW is often misused in international trade; sellers should generally avoid EXW if they must assist in loading or handling Mexican export pedimentos.

### Group F: Main Carriage Unpaid by Seller
- **FCA (Free Carrier - Any Transport Mode)**: The seller delivers goods, cleared for export, to a designated carrier or terminal named by the buyer. Highly recommended modern alternative to FOB for containerized multimodal cargo.
- **FOB (Free on Board - Sea / Inland Waterway Only)**: The seller delivers goods cleared for export and loads them physically over the ship's rail onto the vessel nominated by the buyer at the named port of shipment (e.g., FOB Port of Manzanillo or FOB Port of Long Beach). Risk transfers the instant the container is safely secured on board.

### Group C: Main Carriage Paid by Seller (Dual Transfer Point Rules)
Under all C-rules, there are two distinct critical points: **Cost** travels to the destination port, but **Risk** transfers at the origin loading port!
- **CPT (Carriage Paid To) / CIP (Carriage and Insurance Paid To)**: Any transport mode. Seller pays freight to destination, but risk transfers when handed to the first carrier. CIP mandates maximum Institute Cargo Clauses (A) all-risk insurance coverage.
- **CFR (Cost and Freight) / CIF (Cost, Insurance and Freight)**: Maritime transport only. Seller pays freight (and minimum Clause C insurance under CIF) to destination port, but cargo risk shifts to buyer the moment goods cross the ship's rail at origin.

### Group D: Arrival Rules
- **DAP (Delivered at Place)**: Seller delivers goods ready for unloading at the buyer’s specified destination, bearing all risks and transport costs except import customs clearance and import taxes.
- **DPU (Delivered at Place Unloaded)**: The only Incoterm where the seller is legally responsible for physically unloading goods at the destination terminal.
- **DDP (Delivered Duty Paid)**: Maximum seller obligation. The seller handles inland drayage, export clearance, international shipping, marine insurance, destination import clearance, payment of all import tariffs, VAT/IVA, and final offload coordinates.

---

## 2. Risk Transfer vs. Cost Allocation Matrix

The table below summarizes operational responsibilities across the most common industrial terms:

| Incoterm 2020 | Export Clearance | Loading at Origin | International Freight | Transit Cargo Insurance | Import Clearance & Duties | Risk Transfer Point |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **EXW** | Buyer | Buyer | Buyer | Buyer | Buyer | Seller’s factory floor |
| **FCA** | Seller | Seller | Buyer | Buyer | Buyer | At named carrier terminal |
| **FOB** | Seller | Seller | Buyer | Buyer | Buyer | On board vessel at origin port |
| **CIF** | Seller | Seller | Seller | Seller (Clause C) | Buyer | On board vessel at origin port |
| **DAP** | Seller | Seller | Seller | Negotiable | Buyer | On vehicle at destination |
| **DDP** | Seller | Seller | Seller | Seller | Seller | At buyer’s receiving dock |

---

## 3. Demurrage, Detention & Marine Cargo Claims

Operational failure to understand Incoterms frequently results in massive auxiliary port penalties:

### Demurrage vs. Detention
- **Demurrage**: Storage fees charged by the shipping line or port terminal when a loaded container remains inside the marine terminal yard beyond contracted "free days" (typically 4 to 7 days). Demurrage easily reaches **$200 to $450 USD per container per day**.
- **Detention**: Per-diem equipment usage fees charged when an empty container is picked up for inland delivery or export packing and is not returned to the shipping line’s container depot within the agreed free time.

### The Bill of Lading (B/L) & Financial Settlement
The **Bill of Lading** serves as:
1. A receipt of cargo issued by the carrier.
2. The legal contract of carriage defining freight terms.
3. A document of title (negotiable B/L) required to claim goods from the carrier or negotiate payment under a bank **Letter of Credit (L/C)**.

---

## 4. Engineering Field Scenario: The EXW vs. DDP Machine Tooling Dispute

A Tier-1 stamping facility in Querétaro negotiated the procurement of a 600-ton progressive mechanical stamping press valued at $1.8 million USD from a German machine tool builder in Stuttgart:

### The Contractual Error
The purchasing department agreed to purchase the press under **EXW Stuttgart**. When a specialized heavy-haul flatbed truck arrived at the Stuttgart factory, the German manufacturer refused to lift the 45-ton press crown onto the trailer, stating that under ICC EXW rules, the seller has zero obligation to load goods or secure rigging. The transport carrier lacked specialized 50-ton overhead cranes, causing a 4-day line stoppage and emergency rigging rental fees of €28,000.

### The Export Clearance Crisis
Furthermore, under German foreign trade law, an unregistered Mexican buyer cannot legally file an export declaration (Ausfuhranmeldung) with German customs. The press sat impounded at Hamburg port accumulating demurrage.

### The Solution: Renegotiating to FCA or DPU
The industrial engineering and legal teams stepped in and amended the master contract from EXW to **FCA Stuttgart (Seller’s Factory)**:
- Under FCA Factory, the seller is legally obligated to load the heavy equipment onto the buyer's collecting transport using the factory’s certified gantry cranes.
- The seller is responsible for executing official German export customs clearance.
- Once loaded, transport risk transferred cleanly to the Mexican buyer’s multi-modal marine logistics provider.
For future complete turnkey installations, the plant transitioned to **DAP Querétaro Plant**, requiring the tool builder to deliver the press directly to the Mexican facility dock before final handover.

---

> **Key Takeaway**: Selecting the correct Incoterm 2020 rule dictates legal survival in cross-border supply chains. Engineers and procurement leaders must avoid EXW for heavy international industrial equipment, prefer FCA for containerized multi-modal shipments, and recognize that under C-terms, the point of cost transfer does not equal the point of risk transfer.
`
    }
  ],
  dialogue: {
    title: "Negotiating Shipping Terms for High-Tonnage Tooling",
    titleES: "Negociando Términos de Envío para Herramental de Alto Tonelaje",
    scenarioContext: "A Senior Procurement Manager in Guadalajara and a Global Logistics Director in Chicago resolve a contractual deadlock over FOB vs DDP terms for stamping dies sourced from Asia.",
    characters: [
      { name: "Marcus Vance", role: "Global Logistics Director", company: "MagnaForce Powertrain (Chicago, IL)" },
      { name: "Lic. Andrea Salgado", role: "Strategic Sourcing & Trade Lead", company: "MagnaForce Bajío (Guadalajara, MX)" }
    ],
    turns: [
      {
        speaker: "Marcus Vance",
        text: "Andrea, the quotation for those four progressive stamping dies from the tooling vendor in Busan came in at two point two million dollars under DDP Guadalajara. Finance thinks the landed cost is too high and wants us to force the vendor into EXW Busan.",
        translation: "Andrea, la cotización para esos cuatro troqueles progresivos de estampado del proveedor en Busan llegó a 2.2 millones de dólares bajo DDP Guadalajara. Finanzas cree que el costo total de importación es muy alto y quiere que obliguemos al proveedor a cotizar EXW Busan.",
        targetTerms: ["landed cost", "DDP Guadalajara", "EXW Busan", "tooling vendor"]
      },
      {
        speaker: "Lic. Andrea Salgado",
        text: "Marcus, buying heavy precision dies under EXW in South Korea would be an operational disaster. Under EXW, our team would be legally responsible for loading forty-ton dies at their plant, handling Korean export permits, and arranging marine transport. We have zero logistical presence in Busan.",
        translation: "Marcus, comprar troqueles de precisión pesados bajo EXW en Corea del Sur sería un desastre operativo. Bajo EXW, nuestro equipo sería legalmente responsable de cargar troqueles de cuarenta toneladas en su planta, tramitar permisos de exportación coreanos y coordinar el transporte marítimo. Tenemos cero presencia logística en Busan.",
        targetTerms: ["operational disaster", "legally responsible", "export permits", "logistical presence"]
      },
      {
        speaker: "Marcus Vance",
        text: "You make a strong point. But on DDP terms, the vendor is building a massive contingency cushion into the shipping quote to protect themselves against Mexican customs clearance delays and port demurrage at Manzanillo.",
        translation: "Tienes un punto muy válido. Pero en términos DDP, el proveedor está cargando un margen de contingencia enorme en la cotización de flete para protegerse de retrasos aduanales mexicanos y demoras portuarias en Manzanillo.",
        targetTerms: ["contingency cushion", "customs clearance delays", "port demurrage"]
      },
      {
        speaker: "Lic. Andrea Salgado",
        text: "Exactly. The ideal balance is FCA Busan or FOB Busan. The vendor handles Korean export clearance and loads the ocean crates onto the container vessel. From there, our corporate logistics forwarder takes over marine transit and customs entry into Mexico under our IMMEX registry.",
        translation: "Exactamente. El equilibrio ideal es FCA Busan o FOB Busan. El proveedor gestiona el despacho de exportación coreano y carga las cajas marítimas en el buque portacontenedores. A partir de ahí, nuestro agente de carga corporativo asume el tránsito marítimo y la entrada aduanal a México bajo nuestro registro IMMEX.",
        targetTerms: ["FCA Busan", "FOB Busan", "export clearance", "customs entry", "IMMEX registry"]
      },
      {
        speaker: "Marcus Vance",
        text: "That saves us over one hundred and eighty thousand dollars in inflated vendor freight margins while retaining control of port clearance. Who carries the risk of transit damage during the transpacific ocean crossing?",
        translation: "Eso nos ahorra más de ciento ochenta mil dólares en márgenes inflados de flete del proveedor mientras retenemos el control del despacho portuario. ¿Quién asume el riesgo de daño en tránsito durante el cruce transpacífico?",
        targetTerms: ["inflated vendor freight margins", "retaining control", "risk of transit damage"]
      },
      {
        speaker: "Lic. Andrea Salgado",
        text: "Under FOB, risk shifts to us the moment the dies pass the ship's rail in Busan. We will bind our corporate marine cargo policy under Institute Cargo Clauses A, ensuring complete all-risk coverage from port to our plant floor in Guadalajara.",
        translation: "Bajo FOB, el riesgo se transfiere a nosotros en el momento en que los troqueles cruzan la borda del buque en Busan. Aseguraremos nuestra póliza de carga marítima corporativa bajo las Cláusulas de Carga del Instituto A, garantizando cobertura contra todo riesgo desde el puerto hasta nuestra planta en Guadalajara.",
        targetTerms: ["risk shifts to us", "marine cargo policy", "Institute Cargo Clauses A", "all-risk coverage"]
      }
    ],
    contrastTips: [
      {
        school: "We use DDP so we do not have to worry about anything.",
        native: "DDP inflates vendor margins; negotiating FCA allows us to utilize our corporate freight volume and IMMEX tax credits.",
        explanation: "While DDP sounds convenient, foreign vendors charge exorbitant risk premiums to cover unfamiliar foreign customs systems; sophisticated multinationals prefer FCA/FOB."
      },
      {
        school: "Under CIF, the seller pays for all damage until delivery.",
        native: "Under CIF, the seller pays freight costs to destination, but cargo risk shifts to the buyer at the origin loading port.",
        explanation: "A frequent misunderstanding: Group C terms separate cost from risk. Risk transfers at the port of origin, even though the seller pays the ocean carrier."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Delivered Duty Paid (DDP)",
      ipa: "/dɪˈlɪv.əd ˈdjuː.ti ˌpeɪd/",
      es: "Entregado con Derechos Pagados (DDP)",
      category: "Incoterms 2020",
      definition: "An Incoterm placing maximum responsibility on the seller, who must pay all transport costs, export/import clearances, import duties, and taxes to the buyer's destination.",
      collocations: ["quote under DDP terms", "maximum seller liability under DDP", "DDP landed cost calculation", "clear import customs under DDP"],
      falseFriends: "DDP requires the foreign seller to act as the legal importer of record, which is often legally restricted in countries like Mexico without a local tax ID (RFC).",
      nativeUsage: "The procurement team rejected the DDP quote because our IMMEX certification allows us to import the machinery duty-free under our own registry."
    },
    {
      term: "Free on Board (FOB)",
      ipa: "/ˌfriː ɒn ˈbɔːrd/",
      es: "Franco a Bordo (FOB)",
      category: "Incoterms 2020",
      definition: "A maritime Incoterm where the seller clears goods for export and places them on board the nominated vessel at the named port; risk transfers to the buyer at that instant.",
      collocations: ["ship FOB Shanghai", "FOB loading port", "risk transfers over the ship's rail", "FOB ocean contract"],
      falseFriends: "FOB is legally restricted to sea and inland waterway transport only; for containerized truck or air cargo, the correct modern term is FCA.",
      nativeUsage: "Once the container was hoisted onto the vessel at Manzanillo, the FOB terms transferred cargo risk entirely to the customer in Yokohama."
    },
    {
      term: "Ex Works (EXW)",
      ipa: "/ˌɛks ˈwɜːrks/",
      es: "En Fábrica (EXW)",
      category: "Incoterms 2020",
      definition: "An Incoterm placing minimum responsibility on the seller, making goods available at their warehouse; the buyer assumes all loading, export, transport, and customs risks.",
      collocations: ["procure under EXW terms", "buyer assumes loading risk under EXW", "avoid EXW for international freight", "EXW factory gate"],
      falseFriends: "Do not assume the seller will load your truck under EXW; legally, the seller has zero obligation to provide cranes or forklifts.",
      nativeUsage: "Because our freight forwarder lacked an export license in Germany, converting the contract from EXW to FCA was mandatory."
    },
    {
      term: "Demurrage & Detention",
      ipa: "/dɪˈmʌr.ɪdʒ ənd dɪˈtɛn.ʃən/",
      es: "Demoras y Detenciones Portuarias",
      category: "Maritime Logistics",
      definition: "Financial penalties assessed by shipping lines: demurrage when a container remains inside the port past free days; detention when an empty container is kept outside the port.",
      collocations: ["accrue daily demurrage charges", "request ten free days of demurrage", "return empty box to avoid detention", "dispute terminal demurrage invoices"],
      falseFriends: "Demurrage applies strictly to terminal/port storage delays, not to ordinary truck driving delays on highways.",
      nativeUsage: "The customs hold at the port lasted eight days, triggering over three thousand dollars in unexpected container demurrage fees."
    },
    {
      term: "Bill of Lading (B/L)",
      ipa: "/ˌbɪl əv ˈleɪ.dɪŋ/",
      es: "Conocimiento de Embarque (B/L)",
      category: "Trade Documentation",
      definition: "A legally binding document issued by a freight carrier acknowledging receipt of cargo, detailing transport terms, and serving as a transferable document of title.",
      collocations: ["issue an original Bill of Lading", "endorse a negotiable B/L", "telex release of ocean B/L", "clean on-board Bill of Lading"],
      falseFriends: "'Lading' is an archaic nautical term for loading/cargo; it does not mean 'landing' or 'unloading'.",
      nativeUsage: "The bank will not release payment under the Letter of Credit until the supplier presents a clean on-board Bill of Lading."
    },
    {
      term: "Free Carrier (FCA)",
      ipa: "/ˌfriː ˈkær.i.ər/",
      es: "Franco Porteador (FCA)",
      category: "Incoterms 2020",
      definition: "A flexible multi-modal Incoterm where the seller clears goods for export and delivers them to a specified carrier or terminal nominated by the buyer.",
      collocations: ["deliver FCA airport terminal", "load onto buyer's truck under FCA", "recommend FCA over FOB for containers", "FCA named place of delivery"],
      falseFriends: "Under FCA (seller's facility), the seller IS responsible for loading onto the collecting vehicle, unlike EXW.",
      nativeUsage: "The ICC strongly recommends FCA instead of FOB for modern containerized trade moving through intermodal rail ramps."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Differentiating Cost Allocation from Risk Transfer in Group C Incoterms",
      botQuestion: "Your manufacturing plant in Monterrey purchases five containers of specialized resin from a chemical plant in Antwerp under CIF Veracruz (Incoterms 2020). During a severe storm in the mid-Atlantic, two containers break loose and fall overboard. The seller arranged and paid for the ocean shipping freight to Veracruz. Who bears the financial loss of the lost cargo: the Belgian seller or your Mexican company? Explain why based on Incoterms 2020 rules.",
      requiredKeywords: ["risk", "cost", "board", "loading", "veracruz", "insurance"],
      minKeywords: 3,
      feedbackSuccess: "Spot on! Under CIF (and all Group C terms), cost and risk transfer at different points. The seller pays the freight cost to Veracruz, but the risk of loss transfers to the buyer the instant the containers are loaded on board the ship at the origin port (Antwerp). Therefore, your Mexican company bears the loss; however, because it is CIF, you will file an insurance claim against the marine cargo policy provided by the seller.",
      feedbackRetry: "Remember that Group C Incoterms feature dual critical points: the seller pays freight costs to the destination port, but where does the physical risk transfer occur? Check when risk passes to the buyer during ocean loading."
    },
    {
      step: 2,
      concept: "Operational Pitfalls of EXW in International Machinery Procurement",
      botQuestion: "A procurement agent signs an EXW contract to purchase a 30-ton CNC gantry mill from a manufacturer in Japan. When the local heavy-haul rigging contractor arrives to pick up the machine, the Japanese vendor refuses to load it onto the truck or prepare Japanese export customs declarations. Is the Japanese vendor legally justified under Incoterms 2020? What should the contract have specified instead?",
      requiredKeywords: ["exw", "fca", "load", "export", "obligation", "justified"],
      minKeywords: 3,
      feedbackSuccess: "Accurate contractual verdict. Under EXW (Incoterms 2020), the seller has zero obligation to load goods onto the collecting transport or execute export customs clearance; the Japanese vendor is completely legally justified. The contract should have specified FCA (Seller's Factory), which legally obligates the seller to load the equipment onto the vehicle and handle all domestic export clearance procedures.",
      feedbackRetry: "Review the definition of EXW: does the seller have any duty to load goods or clear export customs? Explain why the vendor is within their rights and what term (such as FCA) should have been used instead."
    }
  ],
  quiz: [
    {
      q: "Under Incoterms 2020, what is the primary operational flaw of using EXW (Ex Works) for international equipment purchases?",
      options: [
        "The seller is forced to pay all foreign import taxes",
        "The seller has zero obligation to load goods onto the transport or clear export customs, which creates severe logistical bottlenecks for foreign buyers",
        "The buyer is not allowed to insure the cargo",
        "It can only be used for air freight shipments"
      ],
      answer: 1
    },
    {
      q: "Under CIF (Cost, Insurance and Freight), at what exact location does the risk of cargo damage transfer from seller to buyer?",
      options: [
        "When the goods are unloaded at the buyer's destination warehouse",
        "When the goods are safely loaded on board the vessel at the port of origin",
        "When the shipping line receives payment from the bank",
        "When the customs broker stamps the import pedimento"
      ],
      answer: 1
    },
    {
      q: "What is 'Demurrage' in international container shipping?",
      options: [
        "A discount granted for shipping environmentally friendly cargo",
        "A daily penalty fee charged when a container remains inside the port terminal beyond contracted free days",
        "The fee paid to clean ocean vessels after crossing the equator",
        "The insurance premium paid to protect against pirate attacks"
      ],
      answer: 1
    },
    {
      q: "Why does the International Chamber of Commerce (ICC) recommend FCA instead of FOB for modern containerized shipments?",
      options: [
        "FCA is only valid for railway freight",
        "In containerized shipping, the seller delivers goods to an inland container yard or terminal before loading on a vessel, making FCA’s risk transfer point more accurate than FOB's ship rail requirement",
        "FOB requires the buyer to pay all export tariffs",
        "FCA eliminates the need for an ocean Bill of Lading"
      ],
      answer: 1
    }
  ]
};

const io_m5 = {
  id: "io-m5",
  title: "Warehouse Management Systems (WMS) & Milk-Run Scheduling",
  titleES: "Sistemas de Gestión de Almacenes (WMS) y Rutas de Recolección Milk-Run",
  icon: "fa-solid fa-warehouse",
  isGoldModel: true,
  readings: [
    {
      id: "io-m5-r1",
      title: "Intralogistics Architecture: WMS Slotting, EDI Messaging & Milk-Run Transportation Dynamics",
      duration: "15 min",
      content: `
# Intralogistics Architecture: WMS Slotting, EDI Messaging & Milk-Run Transportation Dynamics

In modern high-velocity supply chains, a warehouse is no longer a static holding pen for inventory; it functions as a high-speed material routing switchboard. As manufacturing embraces **Just-In-Time (JIT)** and **Just-In-Sequence (JIS)** principles, holding massive buffers of raw materials on the factory floor is an obsolete liability. Space on the production floor must be reserved for value-adding assembly cells, not static pallet racks.

Achieving this agility requires orchestrating digital and physical intralogistics: deploying **Warehouse Management Systems (WMS)** integrated with enterprise ERP networks via **Electronic Data Interchange (EDI)**, optimizing dynamic **Slotting Algorithms**, and executing scheduled multi-stop cyclical collection routes known as **Milk-Runs**.

---

## 1. Enterprise WMS Architecture & EDI Integration

A modern industrial plant synchronizes its ERP (e.g., SAP S/4HANA, Oracle NetSuite) with a dedicated WMS (e.g., Manhattan, Blue Yonder, SAP EWM) through standardized EDI protocols:

\`\`\`
EDI Digital Communication Architecture:
OEM Customer ERP                     Tier-1 Supplier WMS / MES
      |                                           |
      |--- EDI 850 (Purchase Order) ------------->|
      |--- EDI 830 (Long-Term Forecast Plan) ---->|
      |--- EDI 862 (Just-In-Time Daily Call-off)->|
      |<-- EDI 856 (Advance Shipping Notice - ASN)| (Dispatched with Barcode License Plates)
      |<-- EDI 810 (Commercial Electronic Invoice)|
\`\`\`

### Key EDI Transaction Sets in Manufacturing Logistics
- **EDI 850 / ORDERS**: Purchase Order authorization specifying delivery dates, part numbers, and contract pricing.
- **EDI 862 / DELJIT**: Just-In-Time Shipping Schedule. Sent by automotive OEMs to call off specific hourly part releases based on live assembly sequence.
- **EDI 856 / ASN (Advance Shipping Notice)**: Transmitted the exact instant a truck leaves the supplier's loading dock. The ASN contains the digital packing hierarchy: trailer number, carrier SCAC code, pallet barcode IDs (SSCC - Serial Shipping Container Codes), and individual lot numbers.
- **Automated Receiving via ASN**: When the truck docks at the receiving facility, dock workers scan the 2D GS1-128 master barcode on each pallet. The WMS cross-references the scanned license plate against the pending EDI 856 file, automatically performing inventory receipt, checking tolerances, and updating inventory balances in under **3 seconds without manual data entry**.

---

## 2. Dynamic Slotting Algorithms & ABC Velocity Analysis

Warehouse space efficiency and order picking travel time are governed by **Slotting Optimization**: determining the optimal physical storage location for every SKU based on velocity, physical dimensions, weight, and product affinity.

### ABC Inventory Velocity Classification (Pareto Principle)
- **Class A SKUs (Fast Movers)**: Top $15\\text{--}20\\%$ of active part numbers representing $70\\text{--}80\\%$ of total picking activity. Slotted at waist-to-shoulder height ("Golden Zone") along primary central aisles closest to the outbound shipping docks to minimize forklift travel distance.
- **Class B SKUs (Medium Movers)**: Approximately $30\\%$ of SKUs accounting for $15\\text{--}20\\%$ of volume. Placed in intermediate rack tiers.
- **Class C SKUs (Slow Movers)**: $50\\%$ of catalog items accounting for under $5\\%$ of daily picks. Slotted in upper rack levels or remote warehouse zones requiring specialized reach trucks.

### Modern Picking Topologies
1. **Zone Picking**: The warehouse is partitioned into distinct sectors; pickers retrieve SKUs only within their assigned zone ("pick-and-pass").
2. **Wave Picking**: Grouping picking orders across common delivery time windows or milk-run departures.
3. **Pick-to-Light / Voice Picking**: Digital LED displays mounted on rack faces illuminate exact pick quantities, eliminating paper pick lists and slashing picking errors by over $95\\%$.

---

## 3. Milk-Run Transportation Dynamics: Internal & External Logistics

The term **Milk-Run** originates from historic rural dairy routes where a single wagon collected empty bottles and dropped off fresh milk daily across multiple farms in a circular loop. In automotive clusters like Querétaro, Silao, and Puebla, Milk-Runs represent the pinnacle of lean transport.

### External Milk-Runs (Cyclical Supplier Routing)
Instead of five separate Tier-2 component suppliers hiring five separate half-empty 53-foot trailers to deliver parts to a Tier-1 stamping plant, a single dedicated logistics carrier executes a synchronized multi-stop route:

\`\`\`
External Milk-Run Routing Loop:
[Tier-1 Plant] ---> [Supplier A (Stamping)] ---> [Supplier B (Sensors)] ---> [Supplier C (Plastics)] ---> [Tier-1 Plant]
Picks up empty       Loads 4 containers          Loads 6 containers          Loads 5 containers            Delivers full load
returnable totes     Swaps empty totes           Swaps empty totes           Swaps empty totes             on exact schedule
\`\`\`

#### Operational Advantages:
- Standardized, fixed-schedule delivery windows (e.g., exactly at 07:15, 11:15, 15:15).
- High trailer volumetric fill rates ($>85\\%$).
- Slashes line-side buffer stock from days down to a 4-hour operating reserve.
- Facilitates the return of standard reusable packaging (collapsible plastic totes and dunnage), eliminating cardboard waste.

### Internal Milk-Runs (The Mizusumashi Tugger Train)
Inside the plant, electric tugger trains tow multi-car flatbed carts running on fixed 30-minute cycles:
- The tugger driver follows magnetic guide strips or painted floor aisles.
- The driver delivers small, sequenced batches of parts directly to line-side gravity racks while picking up empty Kanban bins and scrap containers.

---

## 4. Engineering Field Scenario: Managing a Dock-Door Bottleneck via ASN & Cross-Docking

At an aerospace logistics hub in Querétaro supplying commercial aircraft wire harnesses and fuselage brackets:

### The Crisis
The receiving yard experienced severe tractor gridlock. Twelve flatbeds were backed up along the access road, drivers were running out of allowable driving hours, and receiving supervisors were manually typing invoice data into the ERP, leading to line shortages inside the plant.

### The Solution: Cross-Docking & Time-Slotted Dock Management
1. **Enforcing Mandatory EDI 856 ASN Compliance**: The plant notified all suppliers that un-manifested deliveries lacking a pre-validated EDI 856 would be turned away.
2. **Dock Scheduling Software Integration**: Suppliers must book delivery appointments through a web-based dock scheduling portal linked to the WMS. Deliveries are assigned to specific dock doors in rigid 30-minute windows.
3. **Pure Cross-Docking Flow**:
   - Instead of staging incoming pallets in high-bay warehouse racks, the WMS identifies that forty incoming wire spool containers are needed on Assembly Lines 2 and 4 within the next two hours.
   - The pallets are unloaded from Dock 3, immediately scanned via RFID portal arches, and transported straight across the staging floor to the outbound internal tugger station at Dock 8 without ever being put away in long-term warehouse storage.
4. **Results**:
   - Inbound trailer dwell time dropped from **3.5 hours down to 28 minutes**.
   - Floor inventory holding costs were reduced by $42\\%$, and dock congestion was completely eliminated.

---

> **Key Takeaway**: High-performance intralogistics replaces sprawling, static warehouses with synchronized dynamic flow. Leveraging EDI 856 ASN digital pre-clearance, ABC slotting optimization, cross-docking velocity, and cyclical milk-run transportation keeps manufacturing cells fed in exact sequence with minimal capital investment in buffer inventory.
`
    }
  ],
  dialogue: {
    title: "Optimizing a Regional Supplier Milk-Run in the Bajío Corridor",
    titleES: "Optimizando una Ruta Milk-Run de Proveedores Regionales en el Corredor del Bajío",
    scenarioContext: "A Regional Logistics Dispatcher in Querétaro and an Inbound Materials Manager in Silao adjust transport loops to eliminate dock congestion and stockouts.",
    characters: [
      { name: "Lic. Fernando Garza", role: "Inbound Supply Chain Manager", company: "Bajío Automotive Assembly (Silao, Guanajuato)" },
      { name: "Ing. Daniela Orozco", role: "Regional Logistics Operations Lead", company: "Trans-Bajío Logistics Hub (Querétaro, Qro)" }
    ],
    turns: [
      {
        speaker: "Lic. Fernando Garza",
        text: "Daniela, our Silao assembly line is experiencing erratic material delivery. Yesterday we had three Tier-Two suppliers arrive at dock four simultaneously at four PM, causing a two-hour bottleneck, while this morning our injection molding line was nearly starved of plastic clips.",
        translation: "Daniela, nuestra línea de ensamblaje en Silao está experimentando entregas de material erráticas. Ayer tuvimos tres proveedores Tier-Dos que llegaron al andén cuatro simultáneamente a las cuatro PM, causando un cuello de botella de dos horas, mientras que esta mañana nuestra línea de inyección de plástico estuvo a punto de parar por falta de clips.",
        targetTerms: ["erratic material delivery", "dock bottleneck", "injection molding line", "starved of plastic clips"]
      },
      {
        speaker: "Ing. Daniela Orozco",
        text: "The issue is that those suppliers are still using direct Less-Than-Truckload carriers. We need to transition them into our centralized regional milk-run loop. We can consolidate pickups across Querétaro, Celaya, and Irapuato into two dedicated daily multi-stop circuits.",
        translation: "El problema es que esos proveedores todavía están utilizando transportistas consolidados directos (LTL). Necesitamos transferirlos a nuestra ruta milk-run regional centralizada. Podemos consolidar recolecciones en Querétaro, Celaya e Irapuato en dos circuitos dedicados diarios con múltiples paradas.",
        targetTerms: ["Less-Than-Truckload carriers", "centralized regional milk-run", "consolidate pickups", "multi-stop circuits"]
      },
      {
        speaker: "Lic. Fernando Garza",
        text: "How will that affect our dock scheduling and receiving velocity? We cannot afford to have trailers unloading for more than forty minutes.",
        translation: "¿Cómo afectará eso nuestra programación de andenes y la velocidad de recepción? No podemos permitirnos tener remolques descargando durante más de cuarenta minutos.",
        targetTerms: ["dock scheduling", "receiving velocity", "unloading time"]
      },
      {
        speaker: "Ing. Daniela Orozco",
        text: "It will dramatically accelerate receiving. Every supplier on the milk-run will be mandated to transmit an EDI eight-fifty-six Advance Shipping Notice prior to truck departure. When the consolidated trailer docks, your operators simply scan the master license plate barcode on each pallet for instantaneous WMS receipt.",
        translation: "Acelerará drásticamente la recepción. A cada proveedor en el milk-run se le exigirá transmitir un Aviso Anticipado de Embarque EDI 856 antes de la salida del camión. Cuando el remolque consolidado atraque, sus operadores simplemente escanearán el código de barras de placa maestra en cada tarima para una recepción instantánea en el WMS.",
        targetTerms: ["EDI eight-fifty-six", "Advance Shipping Notice", "master license plate barcode", "WMS receipt"]
      },
      {
        speaker: "Lic. Fernando Garza",
        text: "Excellent. That also solves our empty packaging problem. The milk-run truck can pick up collapsed returnable plastic totes on the return leg, eliminating our cardboard waste and tote storage shortages.",
        translation: "Excelente. Eso también resuelve nuestro problema de empaque vacío. El camión del milk-run puede recolectar contenedores de plástico retornables colapsados en el viaje de regreso, eliminando nuestro desperdicio de cartón y la escasez de almacenamiento de contenedores.",
        targetTerms: ["empty packaging problem", "returnable plastic totes", "cardboard waste", "tote storage shortages"]
      },
      {
        speaker: "Ing. Daniela Orozco",
        text: "Precisely. We will simulate the new route timing tomorrow morning, lock in two-hour transit windows, and connect the inbound schedule directly to your line-side Kanban replenishment system.",
        translation: "Precisamente. Simularemos los tiempos de la nueva ruta mañana por la mañana, fijaremos ventanas de tránsito de dos horas y conectaremos el programa de entrada directamente con su sistema de reabastecimiento Kanban a pie de línea.",
        targetTerms: ["simulate route timing", "transit windows", "line-side Kanban replenishment"]
      }
    ],
    contrastTips: [
      {
        school: "The truck comes when it is full.",
        native: "The carrier operates on a fixed-schedule milk-run pickup window.",
        explanation: "Modern lean logistics rejects waiting for full truckloads; parts move on precise cyclical schedules to maintain continuous line-side flow."
      },
      {
        school: "We count every box by hand when the truck arrives.",
        native: "We execute automated receiving by scanning the master pallet barcode against the EDI 856 ASN.",
        explanation: "Automated warehouses use EDI Advance Shipping Notices (ASN) and GS1-128 barcode license plates for instantaneous digital receiving."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Advance Shipping Notice (ASN / EDI 856)",
      ipa: "/ədˈvæns ˈʃɪp.ɪŋ ˌnoʊ.tɪs/",
      es: "Aviso Anticipado de Embarque (ASN / EDI 856)",
      category: "Digital Supply Chain",
      definition: "An electronic data transmission sent by a supplier to a customer detailing the exact contents, packaging hierarchy, carrier details, and pallet barcodes of an inbound shipment before it arrives.",
      collocations: ["transmit an EDI 856 ASN", "match physical receipt to ASN", "automated receiving via ASN", "ASN hierarchy validation"],
      falseFriends: "An ASN is not a shipping quote or order acknowledgment; it is a live dispatch notification linked to barcode license plates.",
      nativeUsage: "Because the vendor failed to transmit the ASN prior to truck arrival, the pallets could not clear the automated receiving dock."
    },
    {
      term: "Milk-Run Logistics",
      ipa: "/ˈmɪlk ˌrʌn ləˈdʒɪs.tɪks/",
      es: "Logística de Ruta Recolectora (Milk-Run)",
      category: "Transport Optimization",
      definition: "A recurring, cyclical transport route where a single vehicle visits multiple supplier facilities to pick up predetermined sub-batches and deliver returnable empty containers.",
      collocations: ["schedule a regional milk-run", "milk-run replenishment loop", "optimize milk-run routing", "fixed-time pickup window"],
      falseFriends: "Milk-run has nothing to do with dairy products in industrial manufacturing; it refers strictly to multi-stop scheduled collection loops.",
      nativeUsage: "Switching from individual LTL shipments to a daily milk-run slashed regional transport costs by 34%."
    },
    {
      term: "Cross-Docking",
      ipa: "/ˈkrɒs ˌdɒk.ɪŋ/",
      es: "Cruce de Andén (Cross-Docking)",
      category: "Warehouse Operations",
      definition: "A logistics technique where inbound materials are unloaded directly from receiving docks and transferred to outbound trailers or assembly lines with little or no intermediate storage.",
      collocations: ["implement cross-docking procedures", "cross-dock staging lane", "zero-inventory cross-docking", "rapid dock-to-dock transfer"],
      falseFriends: "Do not confuse cross-docking with long-term racking; goods spend hours, not days, on a cross-dock floor.",
      nativeUsage: "The urgent sensor modules were cross-docked immediately upon receipt and loaded onto the plant tugger train within twenty minutes."
    },
    {
      term: "Warehouse Management System (WMS)",
      ipa: "/ˈwɛər.haʊs ˈmæn.ɪdʒ.mənt ˈsɪs.təm/",
      es: "Sistema de Gestión de Almacenes (WMS)",
      category: "Software Platforms",
      definition: "An enterprise software application controlling daily warehouse operations, including inventory tracking, directed putaway, slotting optimization, picking waves, and shipping validation.",
      collocations: ["deploy an enterprise WMS", "interface WMS with ERP", "directed picking via WMS", "real-time inventory visibility"],
      falseFriends: "WMS is an operational execution engine, whereas ERP handles broader financial accounting and high-level procurement planning.",
      nativeUsage: "The WMS directed the forklift operator to the exact rack bin coordinate using automated RFID positioning."
    },
    {
      term: "Slotting Optimization",
      ipa: "/ˈslɒt.ɪŋ ˌɒp.tɪ.maɪˈzeɪ.ʃən/",
      es: "Optimización de Ubicaciones (Slotting)",
      category: "Intralogistics",
      definition: "The algorithmic placement of inventory within a warehouse based on SKU pick frequency, physical ergonomics, size, weight, and product affinity to minimize operator travel distance.",
      collocations: ["execute a seasonal slotting review", "Golden Zone slotting", "velocity-based slotting algorithm", "reduce picker travel distance"],
      falseFriends: "Slotting refers to inventory warehouse rack assignment, not to calendar scheduling or machining slots.",
      nativeUsage: "By moving the fast-moving Class A brackets to Golden Zone slotting near dock doors, we reduced average pick travel time by twenty percent."
    },
    {
      term: "Returnable Dunnage / Packaging",
      ipa: "/rɪˈtɜːr.nə.bəl ˈdʌn.ɪdʒ/",
      es: "Embalaje retornable / Material de estiba",
      category: "Packaging Logistics",
      definition: "Durable, reusable containers, specialized foam inserts, plastic totes, or steel racks designed to protect parts during transit and be returned to suppliers for repeated closed-loop use.",
      collocations: ["manage returnable dunnage loops", "eliminate disposable cardboard", "standardized collapsible totes", "custom thermoformed dunnage"],
      falseFriends: "'Dunnage' refers to internal bracing and packing materials, not to waste or damage.",
      nativeUsage: "Our OEM contract requires all stamped brackets to ship in returnable plastic dunnage to prevent scratching and eliminate disposal fees."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Calculating Velocity-Based Slotting (ABC Analysis)",
      botQuestion: "A plant warehouse stores 500 different metal stamping part numbers. An audit reveals that 60 part numbers account for 78% of all daily forklift pick movements. In what warehouse zone should these 60 part numbers be slotted, and what physical ergonomic principle ('Golden Zone') should guide their vertical rack placement?",
      requiredKeywords: ["class a", "golden zone", "aisle", "travel", "waist", "dock"],
      minKeywords: 3,
      feedbackSuccess: "Spot on! Under ABC analysis, these 60 part numbers represent Class A fast-movers (Pareto 80/20 rule). They should be slotted along the primary travel aisles closest to the outbound shipping docks to minimize travel distance. Vertically, they must be placed in the 'Golden Zone' (between waist and shoulder height) to allow rapid, ergonomic access without unnecessary bending, stretching, or high-mast forklift hoisting.",
      feedbackRetry: "Identify the ABC classification for items representing ~80% of volume. Explain where they should be placed relative to shipping docks and describe the 'Golden Zone' ergonomic height (between waist and chest/shoulders)."
    },
    {
      step: 2,
      concept: "Evaluating Cross-Docking vs. Traditional Storage",
      botQuestion: "Your plant receives daily shipments of high-volume wire harnesses from a supplier in Celaya. Currently, pallets are unloaded, transported to high-bay storage racks, entered into WMS inventory, and then picked 4 hours later to be moved to the assembly line. Propose an operational redesign utilizing Cross-Docking and EDI 856 to slash handling labor and floor transit time.",
      requiredKeywords: ["cross-docking", "edi 856", "asn", "storage", "unloaded", "staging"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding supply chain design! By requiring the supplier to transmit an EDI 856 Advance Shipping Notice (ASN) with pallet barcodes, the WMS can identify impending line-side demand before the truck even arrives. Upon docking, the pallets bypass high-bay putaway entirely (pure Cross-Docking): they are scanned at the dock door and routed directly across the staging staging floor to the line-side tugger train, eliminating two forklift movements and 4 hours of idle storage time.",
      feedbackRetry: "Explain how receiving the ASN before truck arrival allows the WMS to know that the parts are needed immediately on the line. Describe how cross-docking bypasses high-bay storage racks."
    }
  ],
  quiz: [
    {
      q: "What is the primary operational purpose of an EDI 856 Advance Shipping Notice (ASN)?",
      options: [
        "To negotiate union labor wages for truck drivers",
        "To provide the customer's WMS with detailed digital contents, pallet barcodes, and carrier data before the shipment physically arrives, enabling rapid automated receiving",
        "To request a return of defective products",
        "To apply for a government tax refund on diesel fuel"
      ],
      answer: 1
    },
    {
      q: "In an industrial warehouse, what is 'Golden Zone' slotting?",
      options: [
        "Storing goods in a high-security vault locked with a biometric scanner",
        "Placing fast-moving (Class A) inventory at waist-to-shoulder height to optimize picking speed and reduce ergonomic strain",
        "Storing packaging materials on the roof of the warehouse",
        "Painting forklift parking spots with yellow reflective paint"
      ],
      answer: 1
    },
    {
      q: "What is the defining characteristic of a Milk-Run logistics route?",
      options: [
        "Trucks only travel at midnight when traffic is light",
        "A single transport vehicle follows a recurring, fixed-schedule multi-stop circuit collecting sub-batches from multiple suppliers and exchanging returnable packaging",
        "It is only used for shipping perishable dairy products",
        "Suppliers pay the freight cost only if the truck arrives early"
      ],
      answer: 1
    },
    {
      q: "How does pure Cross-Docking improve supply chain velocity?",
      options: [
        "By eliminating forklift equipment and requiring manual hand carrying",
        "By transferring incoming goods directly from receiving docks to outbound transport or assembly lines with little or no intermediate warehouse storage",
        "By tripling the amount of buffer inventory kept in high-bay racks",
        "By requiring all shipments to travel exclusively by maritime container ships"
      ],
      answer: 1
    }
  ]
};

// ============================================================================
// 2. HEALTHCARE TECH (health-m1 to health-m5)
// ============================================================================

const health_m1 = {
  id: "health-m1",
  title: "ISO 13485 & FDA Medical Device Quality Assurance",
  titleES: "ISO 13485 y Aseguramiento de Calidad en Dispositivos Médicos FDA",
  icon: "fa-solid fa-notes-medical",
  isGoldModel: true,
  readings: [
    {
      id: "health-m1-r1",
      title: "Medical Device Quality Systems: FDA 21 CFR Part 820, ISO 13485 & Regulatory Pathways",
      duration: "15 min",
      content: `
# Medical Device Quality Systems: FDA 21 CFR Part 820, ISO 13485 & Regulatory Pathways

The design, manufacturing, and commercialization of medical devices represent one of the most rigorously regulated engineering domains in the world. Unlike consumer electronics or automotive assemblies where product defects cause financial loss or customer dissatisfaction, a malfunctioning medical device—such as a coronary stent, hemodialysis machine, or surgical robotic end-effector—can result in catastrophic patient injury or loss of life.

In premier medical device manufacturing clusters across Northern Mexico (Tijuana, Mexicali, Ciudad Juárez) and the United States (San Diego, Minneapolis, Boston), quality assurance engineers navigate two harmonized legal frameworks: **FDA 21 CFR Part 820 (Quality System Regulation / QMSR)** and **ISO 13485:2016**.

---

## 1. Regulatory Device Classification & Market Clearance Pathways

Before a medical device can be manufactured or distributed in the United States, the Food and Drug Administration (**FDA**) categorizes it based on patient risk and the degree of regulatory control required to assure safety and effectiveness:

\`\`\`
FDA Device Classification Spectrum:
[Class I - Low Risk]      ---> [Class II - Moderate Risk]  ---> [Class III - High Risk]
General Controls Only          General + Special Controls        PMA Required
510(k) Exempt (Most)           510(k) Clearance Mandatory        Clinical Trials Mandatory
(e.g., scalpel, elastic band)  (e.g., catheter, infusion pump)   (e.g., pacemaker, heart valve)
\`\`\`

### Class I: Low Risk (General Controls)
- Subject only to General Controls: facility registration, device listing, Good Manufacturing Practices (GMP), proper labeling, and adverse event reporting (MDR).
- *Examples*: Manual surgical instruments, examination gloves, tongue depressors, hospital bed accessories. Most Class I devices are exempt from premarket notification ($510(\\text{k})$).

### Class II: Moderate Risk (General & Special Controls / 510(k))
- Requires proving **Substantial Equivalence (SE)** to a legally marketed **Predicate Device** through a **510(k) Premarket Notification** submission.
- Must satisfy Special Controls: performance standards, post-market surveillance, biocompatibility validation (ISO 10993), electrical safety (IEC 60601), and device-specific FDA guidance documents.
- *Examples*: Diagnostic ultrasound transducers, intravascular catheters, motorized wheelchairs, bone screws.

### Class III: High Risk (PMA - Premarket Approval)
- Devices that support or sustain human life, are implanted substantially into the body, or present potential unreasonable risk of illness or injury.
- Requires a formal **Premarket Approval (PMA)** application containing extensive laboratory bench testing, animal trials, and rigorous multi-center human **Clinical Investigations (IDE - Investigational Device Exemption)** proving clinical safety and efficacy.
- *Examples*: Implantable cardiac defibrillators (ICDs), prosthetic heart valves, deep brain stimulators, drug-eluting vascular stents.

---

## 2. Quality System Frameworks: ISO 13485 vs. FDA 21 CFR Part 820 (QMSR)

A medical device manufacturer cannot produce devices without an audited and certified Quality Management System (QMS):

### ISO 13485:2016
The international consensus standard governing medical device quality management systems worldwide (Europe MDR, Health Canada, Japan PMDA, Australia TGA). It emphasizes risk management throughout product realization, cleanliness of products, sterile barrier controls, validation of automated processes, and traceability.

### FDA 21 CFR Part 820 (Quality System Regulation - QSR)
The United States federal law mandating design controls, document control, purchasing controls, process validation, and complaint management for medical devices manufactured or sold in the US.
- **The QMSR Harmonization**: The FDA's finalized **Quality Management System Regulation (QMSR)** explicitly incorporates ISO 13485:2016 by reference, harmonizing US federal audits with global regulatory inspections while retaining specific FDA statutory authorities (such as strict 15-day Medical Device Reporting for deaths or serious injuries under Part 803).

### Medical Device Single Audit Program (MDSAP)
Allows a single regulatory audit conducted by an authorized Auditing Organization (AO) to satisfy the QMS requirements of five major participating health authorities: US FDA, Health Canada, Brazil ANVISA, Australia TGA, and Japan MHLW/PMDA.

---

## 3. The Core Subsystems: CAPA, Non-Conformance & Document Control

The FDA inspects manufacturing facilities using the **QSIT (Quality System Inspection Technique)** approach, which audits four primary QMS subsystems:

\`\`\`
QSIT Inspection Subsystem Matrix:
1. Management Controls   ---> Sets policy, resources, and annual executive reviews.
2. Design Controls       ---> Validates that device meets clinical user needs (21 CFR 820.30).
3. Corrective/Preventive ---> Investigates complaints, scrap trends, and initiates CAPAs.
4. Production/Process    ---> Controls cleanrooms, calibration, sterilization, and equipment validation.
\`\`\`

### Corrective and Preventive Action (CAPA)
The CAPA subsystem is the primary target of FDA Form 483 warning letters:
1. **Identification**: Capturing quality signals from customer complaints, non-conformance reports (NCR), audit findings, or out-of-spec scrap data.
2. **Containment**: Immediately quarantining suspect lots to prevent distribution.
3. **Root Cause Analysis (RCA)**: Deploying Ishikawa fishbone diagrams, Is/Is Not analysis, and 5 Whys to isolate true systemic failure mechanisms rather than attributing issues to "operator error."
4. **Corrective Action Implementation**: Modifying tooling, updating cleanroom SOPs, or re-programming automated vision inspection routines.
5. **Verification of Effectiveness (VoE)**: Auditing the process across a defined post-implementation time window (e.g., 90 days or 50,000 units) to statistically confirm that the failure has not recurred.

---

## 4. Engineering Field Scenario: Managing an FDA Form 483 Inspection Observation

At a high-volume medical device cleanroom in Tijuana, Baja California, producing sterile IV infusion sets for US hospitals:

### The Crisis: An FDA Form 483 Audit Finding
During an unannounced FDA inspection, the lead investigator reviewed the complaint handling database and issued an official **FDA Form 483 inspection observation**:
> *"The manufacturer failed to establish and maintain adequate procedures for implementing Corrective and Preventive Action, in that complaint investigations regarding micro-cracks on the luer-lock connectors were closed without an adequate verification of effectiveness."*

### The Engineering & Regulatory Action Plan
1. **Immediate 15-Day Written Response**: Under FDA protocol, the Director of QA has exactly **15 business days** to submit a formal, comprehensive written response to the FDA District Office detailing immediate containment and corrective commitments.
2. **Immediate Lot Containment & Health Hazard Evaluation (HHE)**: A cross-functional team evaluated the risk of micro-cracks (potential fluid leakage, air embolism, loss of sterility) using ISO 14971 risk matrices. Historical lots were quarantined, and an HHE concluded the occurrence rate was low with zero reported adverse patient events.
3. **True Root Cause Investigation**: Engineers discovered that the ultrasonic horn welding the polycarbonate luer fitting was experiencing acoustic horn resonance degradation after 500,000 cycles, generating micro-fissures in the weld flange.
4. **Systemic Corrective Action**:
   - The preventative maintenance SOP was revised to mandate acoustic horn frequency spectrum analysis every 100,000 cycles.
   - An in-line multi-camera vision inspection system was installed at the cleanroom assembly station to reject luer micro-cracks automatically with $100\\%$ optical coverage.
5. **VoE Validation & Closure**: The QA team monitored 250,000 consecutive units over 60 days with zero micro-crack occurrences, submitted the final VoE report to the FDA, and successfully closed the observation without receiving a Warning Letter.

---

> **Key Takeaway**: Medical device quality engineering requires uncompromising regulatory rigor. Whether determining 510(k) predicate equivalence, maintaining ISO 13485/QMSR compliance, or closing high-stakes CAPAs, documentation integrity and verified patient safety are paramount.
`
    }
  ],
  dialogue: {
    title: "Addressing an FDA Cleanroom Audit Finding in Tijuana",
    titleES: "Atendiendo un Hallazgo de Auditoría FDA en una Sala Limpia de Tijuana",
    scenarioContext: "A Senior Regulatory Affairs Director in San Diego and a Cleanroom Quality Manager in Tijuana draft a formal response to an FDA Form 483 observation regarding catheter packaging seals.",
    characters: [
      { name: "Dr. Evelyn Reed", role: "VP of Global Regulatory Affairs", company: "VascularPrecision Devices (San Diego, CA)" },
      { name: "Ing. Marco Estrada", role: "Quality Assurance & Plant Compliance Manager", company: "VascularPrecision Tijuana Facility (Baja California, MX)" }
    ],
    turns: [
      {
        speaker: "Dr. Evelyn Reed",
        text: "Marco, I just reviewed the FDA Form 483 issued at the conclusion of yesterday's inspection in Tijuana. The investigator cited an observation under Part eight-twenty point one-hundred regarding inadequate CAPA root-cause analysis on those heat-sealed Tyvek pouches.",
        translation: "Marco, acabo de revisar el Formulario FDA 483 emitido al concluir la inspección de ayer en Tijuana. El inspector citó una observación bajo la Parte 820.100 respecto a un análisis de causa raíz de CAPA inadecuado en esas bolsas de Tyvek termoselladas.",
        targetTerms: ["FDA Form 483", "Part eight-twenty", "inadequate CAPA", "heat-sealed Tyvek pouches"]
      },
      {
        speaker: "Ing. Marco Estrada",
        text: "Yes, Dr. Reed. The investigator reviewed CAPA twenty-four-zero-eight, which investigated seal-creep failures on our coronary balloon catheters. We concluded that the operator adjusted the sealer platen temperature incorrectly and retrained the technician, which the FDA rightly flagged as an insufficient root cause.",
        translation: "Sí, Dra. Reed. El inspector revisó el CAPA 24-08, que investigó fallas de deslizamiento de sellado en nuestros catéteres de balón coronario. Concluimos que el operador ajustó incorrectamente la temperatura de la platina de sellado y reentrenamos al técnico, lo cual la FDA señaló con justa razón como una causa raíz insuficiente.",
        targetTerms: ["seal-creep failures", "balloon catheters", "retrained the technician", "insufficient root cause"]
      },
      {
        speaker: "Dr. Evelyn Reed",
        text: "The FDA consistently rejects 'operator retraining' as a standalone CAPA solution. We have exactly fifteen business days to submit our formal response to the FDA District Office. We must present an engineering root-cause analysis and a concrete Verification of Effectiveness protocol.",
        translation: "La FDA rechaza sistemáticamente el 'reentrenamiento del operador' como solución única de CAPA. Tenemos exactamente quince días hábiles para enviar nuestra respuesta formal a la Oficina de Distrito de la FDA. Debemos presentar un análisis de causa raíz de ingeniería y un protocolo concreto de Verificación de Efectividad.",
        targetTerms: ["operator retraining", "fifteen business days", "formal response", "Verification of Effectiveness"]
      },
      {
        speaker: "Ing. Marco Estrada",
        text: "Our tooling engineers disassembled the heat sealer this morning. We discovered that the thermal thermocouple embedded in the top platen was drifting by twelve degrees Celsius due to cable fatigue, masking the true temperature drop during continuous high-speed sealing.",
        translation: "Nuestros ingenieros de herramental desensamblaron la selladora térmica esta mañana. Descubrimos que el termopar térmico incrustado en la platina superior tenía una desviación de doce grados Celsius debido a fatiga de cable, ocultando la caída real de temperatura durante el sellado continuo de alta velocidad.",
        targetTerms: ["tooling engineers", "thermocouple embedded", "cable fatigue", "temperature drop"]
      },
      {
        speaker: "Dr. Evelyn Reed",
        text: "That is a legitimate physical assignable cause. What corrective and preventive actions are we locking into our formal commitment letter?",
        translation: "Esa es una causa asignable física legítima. ¿Qué acciones correctivas y preventivas estamos fijando en nuestra carta de compromiso formal?",
        targetTerms: ["assignable cause", "corrective and preventive actions", "commitment letter"]
      },
      {
        speaker: "Ing. Marco Estrada",
        text: "We are upgrading all cleanroom pouch sealers to dual-calibrated digital RTD temperature sensors with automatic temperature interlocks. If platen temperature deviates by more than one point five degrees, the sealing cycle aborts automatically. We will validate fifty thousand pouches over sixty days to prove zero seal defects.",
        translation: "Estamos actualizando todas las selladoras de bolsas de sala limpia a sensores de temperatura RTD digitales con calibración dual e interbloqueos automáticos de temperatura. Si la temperatura de la platina se desvía más de 1.5 grados, el ciclo de sellado se aborta automáticamente. Validaremos cincuenta mil bolsas durante sesenta días para demostrar cero defectos de sellado.",
        targetTerms: ["RTD temperature sensors", "temperature interlocks", "cycle aborts automatically", "prove zero seal defects"]
      }
    ],
    contrastTips: [
      {
        school: "We told the worker to be more careful next time.",
        native: "We engineered an automated temperature interlock to mistake-proof the sealing process.",
        explanation: "The FDA and ISO 13485 auditors will reject operator blame; regulatory compliance requires systemic engineering controls (Poka-Yoke) and process redesign."
      },
      {
        school: "Our device is safe because we tested it in the lab.",
        native: "Our device demonstrated substantial equivalence to the predicate device under 510(k) special controls.",
        explanation: "Medical safety is a formal legal concept established through regulatory equivalence, ISO 10993 biocompatibility, and validated design controls."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "FDA 21 CFR Part 820",
      ipa: "/ˌɛf.diːˈeɪ ˈtwɛn.ti wʌn ˌsiː.ɛfˈɑːr pɑːrt ˌeɪt ˈtwɛn.ti/",
      es: "Regulación de Sistemas de Calidad de la FDA (21 CFR 820 / QMSR)",
      category: "Medical Regulatory",
      definition: "The United States federal law governing medical device quality management systems, detailing mandates for design controls, document management, purchasing, and CAPA.",
      collocations: ["audit under Part 820", "Part 820 compliance inspection", "QMSR harmonization with ISO 13485", "design control mandates"],
      falseFriends: "21 CFR Part 820 is federal law, not a voluntary guideline like ISO standards; violations result in federal injunctions or seizures.",
      nativeUsage: "The medical device startup overhauled its manufacturing line to achieve full compliance with FDA 21 CFR Part 820 before submitting its 510(k)."
    },
    {
      term: "510(k) Premarket Notification",
      ipa: "/ˌfaɪv ˌtɛn ˈkeɪ ˌpriːˈmɑːr.kɪt ˌnoʊ.tɪ.fɪˈkeɪ.ʃən/",
      es: "Notificación Precomercial 510(k)",
      category: "Market Clearance",
      definition: "A regulatory submission made to the FDA demonstrating that a new Class II medical device is substantially equivalent to an already legally marketed predicate device.",
      collocations: ["submit a 510(k) dossier", "demonstrate substantial equivalence", "identify an eligible predicate device", "obtain 510(k) clearance"],
      falseFriends: "The FDA 'clears' a 510(k) device; it does not 'approve' it. The term 'approved' is reserved strictly for high-risk Class III PMA devices.",
      nativeUsage: "The regulatory team obtained 510(k) clearance for the disposable laparoscopic trocar in less than five months by proving substantial equivalence."
    },
    {
      term: "ISO 13485:2016",
      ipa: "/ˌaɪ.ɛsˈoʊ ˌwʌn ˌθriː ˌfɔːr ˌeɪt ˈfaɪv/",
      es: "Norma ISO 13485:2016",
      category: "Quality Standards",
      definition: "The international quality management system standard specific to the design, manufacture, packaging, and servicing of medical devices.",
      collocations: ["maintain ISO 13485 certification", "MDSAP multi-country audit", "risk-based approach under ISO 13485", "sterile barrier validation"],
      falseFriends: "Do not confuse ISO 13485 with generic ISO 9001; ISO 13485 eliminates customer satisfaction requirements in favor of patient safety and regulatory compliance.",
      nativeUsage: "Our contract manufacturing plant in Mexicali successfully renewed its ISO 13485 certification with zero major non-conformances."
    },
    {
      term: "Corrective and Preventive Action (CAPA)",
      ipa: "/kəˈrɛk.tɪv ənd prɪˈvɛn.tɪv ˈæk.ʃən /ˌkeɪ.piːˈeɪ/",
      es: "Acción Correctiva y Preventiva (CAPA)",
      category: "Quality Systems",
      definition: "A formal regulatory subsystem investigating systemic non-conformances, isolating true root causes, implementing engineering corrections, and verifying their long-term effectiveness.",
      collocations: ["initiate a formal CAPA", "perform root-cause analysis", "verify CAPA effectiveness (VoE)", "close an audit CAPA"],
      falseFriends: "A CAPA is not a routine machine repair ticket; it addresses systemic product or quality system failures that could impact patient safety.",
      nativeUsage: "The QA director presented the completed CAPA documentation proving that the catheter leak rate had dropped to zero after retooling."
    },
    {
      term: "FDA Form 483",
      ipa: "/ˌɛf.diːˈeɪ fɔːrm ˌfɔːr ˌeɪti ˈθriː/",
      es: "Formulario FDA 483 (Observaciones de Inspección)",
      category: "Regulatory Auditing",
      definition: "An official document issued by FDA investigators at the conclusion of an inspection notifying facility management of objectionable conditions violating federal regulations.",
      collocations: ["receive an FDA Form 483", "respond within 15 business days", "draft a 483 remediation plan", "avoid an escalation to Warning Letter"],
      falseFriends: "A Form 483 is an inspection observation list, not a final legal penalty or product recall; however, failure to respond adequately leads to Warning Letters.",
      nativeUsage: "The plant manager mobilized a task force to answer the three observations listed on the FDA Form 483 before the 15-day deadline."
    },
    {
      term: "Substantial Equivalence (SE)",
      ipa: "/səbˈstæn.ʃəl ɪˈkwɪv.ə.ləns/",
      es: "Equivalencia Sustancial",
      category: "FDA Classification",
      definition: "The regulatory benchmark under a 510(k) proving that a new device has the same intended use and technological characteristics as a legally marketed predicate device.",
      collocations: ["prove substantial equivalence", "compare with predicate device", "equivalent safety and effectiveness", "510(k) equivalence rationale"],
      falseFriends: "'Substantial' does not mean identical; it means the differences do not raise new questions of safety and efficacy.",
      nativeUsage: "Comparative bench testing confirmed substantial equivalence between our ceramic hip implant and the primary market predicate."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Determining Regulatory Pathway: 510(k) vs. PMA",
      botQuestion: "A biomedical engineering startup in Tijuana is developing a novel bio-resorbable cardiovascular stent designed to be implanted into coronary arteries to prevent restenosis, gradually dissolving over 18 months. The regulatory affairs intern suggests filing a 510(k) Premarket Notification using a legacy bare-metal stent as the predicate device. As the Senior Regulatory Engineer, evaluate this recommendation and explain the correct regulatory pathway under FDA guidelines.",
      requiredKeywords: ["class iii", "pma", "premarket approval", "clinical", "implanted", "risk"],
      minKeywords: 3,
      feedbackSuccess: "Spot on! The intern's advice is completely incorrect. A bio-resorbable cardiovascular stent is an implantable life-sustaining device with novel pharmacological/material mechanisms, classifying it strictly as an FDA Class III device. It cannot use a 510(k) because a dissolving stent introduces fundamental new questions of safety and degradation kinetics. The correct regulatory pathway is a formal Premarket Approval (PMA) supported by multi-center human clinical trials (IDE).",
      feedbackRetry: "Review the risk tier of coronary implants: are bio-resorbable stents moderate risk (Class II) or high risk (Class III)? Explain why novel dissolving implants require Premarket Approval (PMA) and clinical trials rather than a simple 510(k) predicate comparison."
    },
    {
      step: 2,
      concept: "Formulating a Robust Response to an FDA 483 CAPA Observation",
      botQuestion: "An FDA investigator issues a Form 483 observation stating that your plant closed three customer complaints regarding cracked dialyzer filter housings simply by 'retraining the cleanroom assembly technicians,' without conducting an engineering investigation into mold injection parameters or verifying effectiveness. Outline the three essential elements your formal response to the FDA must contain to prevent escalation to a Warning Letter.",
      requiredKeywords: ["root cause", "containment", "verification", "effectiveness", "15 days", "engineering"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding regulatory strategy! Your response must: 1) Submit within the mandatory 15 business-day deadline; 2) Detail an immediate containment risk evaluation (quarantine of suspect lots, Health Hazard Evaluation); 3) Present an empirical engineering root-cause investigation (e.g., polymer melt temperature and injection pack pressure analysis rather than operator blaming); and 4) Establish a measurable Verification of Effectiveness (VoE) protocol monitoring scrap and complaints over a defined operational timeframe (e.g., 90 days).",
      feedbackRetry: "Remember that the FDA rejects operator retraining as a sufficient corrective action. State the 15-day response timeline, describe how you will investigate physical injection molding parameters (root cause), and explain the Verification of Effectiveness (VoE) requirement."
    }
  ],
  quiz: [
    {
      q: "Under FDA regulations, what is the primary objective of a 510(k) Premarket Notification for a Class II medical device?",
      options: [
        "To negotiate wholesale pricing with US health insurance companies",
        "To prove that the new device is substantially equivalent in safety and effectiveness to a legally marketed predicate device",
        "To bypass all cleanroom sterilization requirements",
        "To patent the device's electrical schematics in fifty countries"
      ],
      answer: 1
    },
    {
      q: "How does the FDA's new QMSR (Quality Management System Regulation) impact US medical device manufacturing?",
      options: [
        "It eliminates all federal inspections of manufacturing plants",
        "It explicitly incorporates ISO 13485:2016 by reference into 21 CFR Part 820, harmonizing US requirements with global standards",
        "It bans all foreign manufacturing of medical devices in Mexico",
        "It makes medical devices exempt from risk management requirements"
      ],
      answer: 1
    },
    {
      q: "When an FDA investigator issues an FDA Form 483 at the close of a facility inspection, how many business days does management have to submit a formal written response?",
      options: [
        "5 business days",
        "15 business days",
        "60 business days",
        "1 calendar year"
      ],
      answer: 1
    },
    {
      q: "Why is 'operator retraining' generally rejected by FDA and ISO 13485 auditors as a standalone CAPA solution for recurring defects?",
      options: [
        "Because technicians are not allowed to be trained in cleanrooms",
        "Because it blames human workers instead of investigating underlying physical tooling, material, or design root causes and mistake-proofing the process",
        "Because retraining operators costs too much money",
        "Because training records are kept off-site by human resources"
      ],
      answer: 1
    }
  ]
};


module.exports = { io_m1, io_m2, io_m3, io_m4, io_m5, health_m1 };
