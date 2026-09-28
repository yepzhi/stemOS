/**
 * scripts/inject_track34.cjs
 * Injects Track 34: Advanced Supply Chain Reshoring & Global SCM
 * (USMCA Rules of Origin / Incoterms 2020 / Total Cost of Ownership / Laredo Cross-Docking / VDA 6.3 Supplier Audits / Cold Chain)
 * into content/courses.js
 */

const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '../content/courses.js');
let fileContent = fs.readFileSync(coursesPath, 'utf8');

// Define Track 34 Data
const track34 = {
    id: "advanced-supply-chain-reshoring",
    title: "Cadenas de Suministro Avanzadas, Reshoring y Gestión Global de Compras (SCM)",
    titleEN: "Advanced Supply Chain Reshoring & Global SCM",
    level: "B2-C1",
    category: "business",
    description: "Estrategias avanzadas de reconfiguración de cadenas de suministro globales y relocalización (nearshoring/reshoring): cálculo de Reglas de Origen T-MEC/USMCA (Valor de Contenido Regional VCR y Contenido de Valor Laboral CVL), análisis de Costo Total de Propiedad (TCO vs FOB), gestión de riesgos bajo Incoterms 2020 (FCA vs DDP), operaciones aduaneras y cross-docking en Laredo/Nuevo Laredo, auditorías a proveedores bajo VDA 6.3 / IATF 16949 y trazabilidad en cadena de frío (GDP).",
    status: "full",
    totalModules: 6,
    standard: "USMCA/T-MEC Rules of Origin / Incoterms 2020 (ICC) / VDA 6.3 / IATF 16949 Clause 8.4 / Good Distribution Practice (GDP) / C-TPAT",
    modules: [
        {
            id: "scm-m1",
            title: "USMCA / T-MEC Rules of Origin: Regional Value Content (RVC) & Labor Value Content (LVC)",
            titleES: "Reglas de Origen T-MEC / USMCA: Valor de Contenido Regional (VCR) y Contenido de Valor Laboral (CVL)",
            icon: "fa-solid fa-file-invoice-dollar",
            isGoldModel: true,
            readings: [
                {
                    id: "scm-m1-r1",
                    title: "Regional Value Content Calculation: Net Cost Method vs Transaction Value & Tariff Shift Rules",
                    duration: "15 min",
                    content: `> **Trade Compliance Standard**: **USMCA / T-MEC Chapter 4 (Rules of Origin)** and **Uniform Regulations**. Governing framework for duty-free preferential tariff treatment between Mexico, the United States, and Canada.

# USMCA / T-MEC: Quantitative Rules of Origin & Tariff Shifts

### 1. The Imperative of Origin Determination
Under the United States-Mexico-Canada Agreement (**USMCA / T-MEC**), goods traded across North American borders do not automatically qualify for zero-tariff preferential duty rates. Products must undergo rigorous legal origin qualification. Failure to prove origin exposes importers to retroactive Customs duties, punitive anti-dumping tariffs, and severe monetary penalties assessed by US Customs and Border Protection (**CBP**) and Mexico's SAT.

### 2. The Tariff Shift Mechanism (Change in Tariff Classification)
When non-originating raw materials or components (e.g., steel rod from South Korea, passive electronic resistors from Taiwan) undergo transformation in a Mexican manufacturing plant:
- **Change in Chapter (CC)**: The finished good must shift at the 2-digit Harmonized System (HS) level (e.g., from HS Chapter 72 raw iron to Chapter 84 machinery).
- **Change in Tariff Heading (CTH)**: Requires a shift at the 4-digit HS heading level.
- **Change in Tariff Subheading (CTSH)**: Requires a shift at the 6-digit HS subheading level.

### 3. Quantitative Origin Calculations: RVC Methods
When the tariff shift rule alone is insufficient, the product must satisfy a minimum **Regional Value Content (RVC)** percentage:

#### Method A: Transaction Value Method (TVM)
Based on the commercial invoice price paid for the good:

$$\\text{RVC} = \\frac{\\text{TV} - \\text{VNM}}{\\text{TV}} \\times 100$$

Where:
- $\\text{TV}$ is the Transaction Value of the good, adjusted to an FOB basis.
- $\\text{VNM}$ is the Value of Non-Originating Materials used by the producer.

#### Method B: Net Cost Method (NCM)
Required for automotive passenger vehicles, light trucks, and heavy industrial machinery:

$$\\text{RVC} = \\frac{\\text{NC} - \\text{VNM}}{\\text{NC}} \\times 100$$

Where:
- $\\text{NC}$ is the Net Cost of the good, calculated by subtracting excluded costs (sales promotion, marketing, royalties, shipping and packing costs, and non-allowable interest costs) from total manufacturing cost.`
                },
                {
                    id: "scm-m1-r2",
                    title: "Automotive Labor Value Content (LVC) & Steel and Aluminum Purchasing Mandates",
                    duration: "14 min",
                    content: `> **Automotive Trade Standard**: **USMCA Automotive Appendix (Article 7)**. Unique structural labor and raw material requirements governing North American vehicle assembly.

# Automotive LVC & Steel/Aluminum Purchasing Mandates

### 1. The Labor Value Content (LVC) Requirement
To qualify for 0% preferential tariffs under USMCA, passenger vehicles must achieve a **40% Labor Value Content (LVC)** (45% for light/heavy trucks). This mandate stipulates that a designated proportion of the vehicle must be manufactured in production facilities where production workers earn an average wage of at least **US $16 per hour**:
- **High-Wage Material and Manufacturing Expenditures**: Minimum 25% for passenger cars (30% for trucks).
- **High-Wage Technology Expenditures**: Up to 10% credit for enterprise expenditures on R&D and software engineering within North America.
- **High-Wage Assembly Credit**: A 5% credit if the assembly facility operates an engine, transmission, or advanced lithium battery assembly plant paying the minimum $16/hr wage.

### 2. The 70% Steel & Aluminum Purchasing Rule
Article 6 of the Automotive Appendix requires that at least **70% of an automaker's corporate steel and aluminum purchases** (by value) must originate in North America. Furthermore, to count as originating steel, the metal must be **\"melted and poured\"** within North America, preventing third-party transshipment of Asian slab steel processed through regional rolling mills.`
                }
            ],
            vocabulary: [
                {
                    en: "Regional Value Content (RVC)",
                    es: "Valor de Contenido Regional (VCR)",
                    definition: "Percentage threshold indicating the portion of a product produced within USMCA territory required to qualify for tariff exemption.",
                    ipa: "/ˈriː.dʒən.əl ˈvæl.juː ˈkɑːn.tɛnt/",
                    collocations: ["satisfy RVC threshold", "Net Cost RVC calculation", "non-originating material deduction"]
                },
                {
                    en: "Labor Value Content (LVC)",
                    es: "Contenido de Valor Laboral (CVL)",
                    definition: "USMCA requirement mandating that 40-45% of an automotive vehicle's value must be produced by workers earning at least $16 USD/hour.",
                    ipa: "/ˈleɪ.bər ˈvæl.juː ˈkɑːn.tɛnt/",
                    collocations: ["high-wage manufacturing credit", "LVC certification audit", "comply with 40% LVC benchmark"]
                },
                {
                    en: "Tariff Shift",
                    es: "Salto Arancelario",
                    definition: "Transformation rule requiring foreign raw materials to change their Harmonized System classification heading upon processing.",
                    ipa: "/ˈtær.ɪf ʃɪft/",
                    collocations: ["substantial transformation", "change in tariff classification", "satisfy tariff shift criteria"]
                },
                {
                    en: "Melted and Poured",
                    es: "Fundido y Vaciado (Acero)",
                    definition: "Origin requirement mandating that steel must have been initially smelted and cast within North America to receive duty-free treatment.",
                    ipa: "/ˈmɛl.tɪd ænd pɔːrd/",
                    collocations: ["melted and poured verification", "steel mill test report (MTR)", "transshipment circumvention"]
                }
            ],
            questions: [
                {
                    id: "scm-q1",
                    prompt: "Under the USMCA Net Cost Method, how is Regional Value Content (RVC) calculated for automotive assemblies?",
                    options: [
                        "By dividing the final retail MSRP price by the shipping freight cost.",
                        "By subtracting the Value of Non-Originating Materials (VNM) from the Net Cost (NC) and dividing by Net Cost, multiplied by 100.",
                        "By multiplying the total number of factory workers by 16 dollars per hour.",
                        "By adding import duties paid at the maritime port of entry to the wholesale price."
                    ],
                    correctIndex: 1,
                    explanation: "The Net Cost Method calculates RVC as ((NC - VNM) / NC) * 100, where excluded promotional, royalty, and non-allowable interest expenses are stripped from total cost."
                }
            ],
            dialogues: [
                {
                    speaker: "Courtney Vance",
                    role: "Global Trade Compliance Director (Chicago HQ)",
                    text: "Our CBP post-entry audit flagged an aluminum heat exchanger assembly coming from our Saltillo facility. The auditor claims our RVC dropped to 58%, below the 62.5% threshold. What changed in your bill of materials (BOM)?"
                },
                {
                    speaker: "Rodrigo Morales",
                    role: "Supply Chain & Customs Compliance Manager (Saltillo Facility)",
                    text: "We traced the issue to an alternate brazing alloy supplier selected during the Q1 port congestion. While the primary extrusion remained North American, the uncertified secondary brazing foil was sourced from East Asia without a USMCA certificate of origin. We have transitioned back to our domestic supplier in Querétaro and recalibrated the Net Cost formula to 68.4% RVC."
                }
            ]
        },
        {
            id: "scm-m2",
            title: "Total Cost of Ownership (TCO) vs Landed Cost & Reshoring Economics",
            titleES: "Costo Total de Propiedad (TCO) vs Costo Puesto en Planta (Landed Cost) y Economía de Relocalización",
            icon: "fa-solid fa-chart-pie",
            readings: [
                {
                    id: "scm-m2-r1",
                    title: "Beyond FOB Price: Working Capital In-Transit, Scrap Quarantine & Geopolitical Disruption Penalties",
                    duration: "14 min",
                    content: `> **Strategic Procurement Standard**: **Total Cost of Ownership (TCO) Framework (Reshoring Initiative)** and **APICS / ASCM Supply Chain Operations Reference (SCOR)** model.

# Total Cost of Ownership: Deconstructing the Purchase Price Fallacy

### 1. The \"Piece-Price Fallacy\" in Global Sourcing
For decades, procurement departments evaluated suppliers based purely on **FOB Unit Purchase Price** (Free On Board port of origin). A stamping component quoted at $2.10 in Shenzhen appeared dramatically cheaper than a $2.85 quote from Monterrey, Mexico. However, evaluating sourcing strictly on piece price ignores the hidden operational multipliers that destroy enterprise operating margins.

### 2. The Comprehensive TCO Cost Equation

\`\`\`
Total Cost of Ownership (TCO) =
    Unit Purchase Price (FOB)
  + Ocean Freight & Bunker Fuel Surcharges
  + Port Handling, Demurrage & Drayage
  + Import Customs Tariffs & Brokerage Fees
  + In-Transit Working Capital Carrying Cost (45–60 days pipeline inventory)
  + Safety Stock Buffer Inventory Carrying Cost (WACC x Holding Cost)
  + Quality Containment, Scrap & Air Freight Expediting Penalties
  + Intellectual Property (IP) Exfiltration Risk & Legal Defense
\`\`\`

### 3. Quantitative Case Comparison: Transpacific vs Nearshoring

| Cost Driver Factor | Transpacific Sourcing (Asia) | Nearshoring Sourcing (Mexico) |
| :--- | :--- | :--- |
| **FOB Unit Price** | **$2.10** *(Apparent savings)* | **$2.85** |
| **Transit Lead Time** | **42–60 Days** (Ocean transit, port queue) | **2–4 Days** (Dedicated cross-border dry van) |
| **Pipeline Working Capital** | High (Requires 8 weeks inventory floating on ocean) | Low (Just-In-Time JIT delivery via bonded highway) |
| **Buffer Safety Stock** | 60 Days on-hand warehouse inventory | 7 Days on-hand inventory |
| **Tariffs & USMCA Eligibility** | 7.5% – 25% Section 301 Tariffs | **0% Preferential Duty** under USMCA Rules of Origin |
| **Quality Risk Containment** | Defect found 6 weeks after stamping; 120k units trapped at sea | Defect identified in 48 hours; line halted with zero trapped pipeline inventory |
| **Expedited Air Freight Risk** | $450,000 charter flight to avert automotive line shutdown | $12,000 expedited hot-shot team truck run from Monterrey |
| **Effective Net TCO per Unit** | **$3.62** | **$3.04** *(Nearshoring delivers 16% true savings)* |`
                }
            ],
            vocabulary: [
                {
                    en: "Total Cost of Ownership (TCO)",
                    es: "Costo Total de Propiedad (TCO)",
                    definition: "Comprehensive financial estimate encompassing direct purchase price, shipping, tariffs, inventory carrying costs, and quality failure liabilities.",
                    ipa: "/ˈtoʊ.təl kɔːst əv ˈoʊ.nər.ʃɪp/",
                    collocations: ["comprehensive TCO evaluation", "TCO cost modeling tool", "hidden logistics multipliers"]
                },
                {
                    en: "Landed Cost",
                    es: "Costo Puesto en Planta (Landed Cost)",
                    definition: "Total price of a product once it has arrived at the buyer's warehouse dock, including freight, insurance, and import duties.",
                    ipa: "/ˈlæn.dɪd kɔːst/",
                    collocations: ["calculate true landed cost", "port drayage surcharges", "landed cost variance"]
                },
                {
                    en: "Working Capital Carrying Cost",
                    es: "Costo de Mantenimiento de Capital de Trabajo",
                    definition: "Cost of tied-up capital in inventory during long transit times, calculated using the enterprise Weighted Average Cost of Capital (WACC).",
                    ipa: "/ˈwɜːr.kɪŋ ˈkæp.ɪ.təl ˈkær.i.ɪŋ kɔːst/",
                    collocations: ["pipeline inventory financing", "WACC inventory carrying rate", "reduce working capital exposure"]
                }
            ],
            questions: [
                {
                    id: "scm-q2",
                    prompt: "Why can a component with a higher piece price from a Mexican nearshoring supplier yield a lower Total Cost of Ownership (TCO) than a lower-quoted transpacific supplier?",
                    options: [
                        "Because international maritime shipping is legally barred under World Trade Organization rules.",
                        "Because Mexican factories are exempt from all environmental regulations.",
                        "Because dramatic reductions in transit time (2-4 days vs 60 days) slash inventory carrying costs, eliminate Section 301 tariffs, and minimize catastrophic air-freight expediting risks.",
                        "Because USMCA eliminates the need for quality control inspections entirely."
                    ],
                    correctIndex: 2,
                    explanation: "Nearshoring reduces lead time from 60 days to 2-4 days, eliminating massive in-transit inventory financing, reducing required safety stock, avoiding US Section 301 tariffs, and averting multi-hundred-thousand-dollar emergency air charters."
                }
            ],
            dialogues: [
                {
                    speaker: "Bradley Vance",
                    role: "VP of Global Strategic Procurement (Cleveland HQ)",
                    text: "The stamping quote from Monterrey came in at $3.15 per unit, which is 40 cents higher than our historical supplier in Ningbo. How do you justify this sourcing recommendation to our CFO?"
                },
                {
                    speaker: "Gabriela Soto",
                    role: "Nearshoring Supply Chain Strategist (Monterrey Hub)",
                    text: "When you factor in the 25% Section 301 tariffs, ocean spot rates at $4,800 per 40-foot container, and 8 weeks of pipeline inventory financed at our 11% corporate WACC, the true landed cost from Ningbo is $3.82. Sourcing from Monterrey achieves a net delivered cost of $3.28 under USMCA duty-free terms, saving $540,000 annually while compressing lead time from 55 days to 72 hours."
                }
            ]
        },
        {
            id: "scm-m3",
            title: "Incoterms 2020: Risk Allocation, Freight Demurrage & Title Transfer",
            titleES: "Incoterms 2020: Asignación de Riesgos, Estadías de Flete y Transferencia de Propiedad",
            icon: "fa-solid fa-truck-ramp-box",
            readings: [
                {
                    id: "scm-m3-r1",
                    title: "FCA (Free Carrier) vs DDP (Delivered Duty Paid) in Cross-Border US-Mexico Trucking Operations",
                    duration: "14 min",
                    content: `> **International Trade Standard**: **Incoterms 2020 (International Chamber of Commerce - ICC Publication No. 723E)**. Universally accepted commercial terms defining the division of costs, risks, and responsibilities between buyer and seller.

# Incoterms 2020 in Cross-Border Logistics: FCA vs DDP

### 1. The Anatomy of Cross-Border Freight Transfer
In cross-border logistics between Mexico and the United States, commercial contracts frequently misapply maritime Incoterms (e.g., FOB or CIF) to overland trucking operations. Under ICC rules, multimodal terms (**FCA, CPT, CIP, DAP, DPU, DDP**) must be utilized for intermodal truck and rail movements.

### 2. Detailed Comparison: FCA vs DDP

| Dimension | FCA (Free Carrier - Named Place) | DDP (Delivered Duty Paid - Named Destination) |
| :--- | :--- | :--- |
| **Seller's Risk End-Point** | When the cargo is handed over to the buyer's designated carrier at seller's facility or cross-dock (e.g., *FCA Monterrey Plant, Incoterms 2020*). | At the buyer's dock in the US/Canada, after import customs clearance and tariff payment (e.g., *DDP Chicago Warehouse*). |
| **Export Clearance (SAT)** | **Seller (Mexican Supplier)** must clear export customs and generate electronic Anexo 24 / CFDI with Complemento Carta Porte. | Seller handles Mexican export clearance. |
| **Cross-Border Drayage & Crossing** | **Buyer** assumes cost and operational risk during bridge crossing and Laredo transload. | **Seller** must contract Mexican line-haul, cross-border drayage transfer, and US line-haul carrier. |
| **Import Clearance (US CBP)** | **Buyer (US Customer)** acts as Importer of Record (IOR) and files CBP Entry 7501. | **Seller** must register as a Foreign Non-Resident Importer with CBP, post an international customs bond, and pay duties. |
| **Operational Pitfall** | Buyer must maintain sophisticated customs broker relationships at land border crossings. | Extremely hazardous for Mexican suppliers unfamiliar with US FDA, DOT, or EPA compliance requirements; delays at customs trigger demurrage for which seller is liable. |

### 3. Demurrage vs Detention in Overland and Intermodal Freight
- **Demurrage**: Storage fees assessed when a trailer or container remains parked inside an ocean terminal, intermodal rail ramp, or bonded customs yard beyond the allocated free time (typically 24–48 hours at land border ports).
- **Detention (Per Diem)**: Charges accrued when the carrier's tractor or trailer equipment is detained outside the terminal beyond contractual free time (e.g., trailer sitting un-unloaded at a buyer's receiving dock for 4 days).`
                }
            ],
            vocabulary: [
                {
                    en: "Incoterms 2020",
                    es: "Incoterms 2020",
                    definition: "Standardized trade definitions promulgated by the International Chamber of Commerce defining the precise moment of cost and risk transfer.",
                    ipa: "/ˈɪn.koʊˌtɜːrmz ˈtwɛn.ti ˈtwɛn.ti/",
                    collocations: ["incorporate Incoterms into commercial contract", "named place of delivery", "shift of transit risk"]
                },
                {
                    en: "Importer of Record (IOR)",
                    es: "Importador de Registro (IOR)",
                    definition: "Entity formally responsible for ensuring imported goods comply with all local laws and for paying assessed customs duties and tariffs.",
                    ipa: "/ɪmˈpɔːr.tər əv ˈrɛk.ərd/",
                    collocations: ["designate US Importer of Record", "post continuous customs bond", "file CBP entry documentation"]
                },
                {
                    en: "Demurrage & Detention",
                    es: "Demoras y Estadías de Flete",
                    definition: "Penalties assessed by carriers and terminals when equipment or terminal yard storage exceeds contractually agreed free time limits.",
                    ipa: "/dɪˈmɜːr.ɪdʒ ænd dɪˈtɛn.ʃən/",
                    collocations: ["accrue border demurrage charges", "negotiate trailer detention window", "settle per diem equipment penalty"]
                }
            ],
            questions: [
                {
                    id: "scm-q3",
                    prompt: "Why is agreeing to DDP (Delivered Duty Paid) terms potentially perilous for a Mexican manufacturer exporting engineered goods to a US customer?",
                    options: [
                        "Because DDP terms prohibit goods from being transported by highway truck.",
                        "Because under DDP, the seller must act as the US Importer of Record, assume all US customs regulatory compliance liabilities (FDA/EPA/DOT), and pay all border delays and demurrage penalties.",
                        "Because DDP cancels all intellectual property rights for the manufactured goods.",
                        "Because DDP terms require payment to be made exclusively in gold bullion."
                    ],
                    correctIndex: 1,
                    explanation: "Under DDP, the seller bears maximum obligation, acting as foreign Importer of Record with US CBP, assuming all liability for import duties, border inspection delays, and equipment demurrage until delivered to the customer dock."
                }
            ],
            dialogues: [
                {
                    speaker: "Markus Thorne",
                    role: "Vice President of SCM Operations (San Jose HQ)",
                    text: "We want our purchase orders issued on DDP San Jose warehouse terms to insulate ourselves from any cross-border logistics friction at the Laredo bridge."
                },
                {
                    speaker: "Daniela Cárdenas",
                    role: "International Logistics Director (Guadalajara Electronics)",
                    text: "DDP poses significant regulatory exposure because US EPA compliance certifications on the specialized potting compound must be filed directly by a domestic US entity. We propose shifting to FCA Monterrey Hub or CPT San Jose, where we manage and prepay freight up to your receiving dock, but your customs team remains Importer of Record for seamless CBP entry."
                }
            ]
        },
        {
            id: "scm-m4",
            title: "Customs Brokerage, Laredo Cross-Docking & B1/B2 Bonded Corridor Operations",
            titleES: "Agenciamiento Aduanal, Cross-Docking en Laredo y Operaciones de Corredor Fiscalizado",
            icon: "fa-solid fa-warehouse",
            readings: [
                {
                    id: "scm-m4-r1",
                    title: "The Anatomy of a Land Border Crossing: Mexican Line-Haul, Transfer B1 Drayage & US Carrier Interchange",
                    duration: "15 min",
                    content: `> **Border Operations Standard**: **US CBP FAST (Free and Secure Trade)**, **C-TPAT Tier III**, and **SAT Esquema de Certificación de Empresas (OEA)**.

# Laredo Border Logistics: Cross-Docking & Intermodal Transfer

### 1. The Laredo / Nuevo Laredo Trade Corridor
The World Trade Bridge (Puente del Comercio Mundial) and Colombia Solidarity Bridge between Nuevo Laredo, Tamaulipas, and Laredo, Texas, handle over **14,000 commercial tractor-trailers daily**, representing more than 40% of all overland trade between Mexico and the United States.

### 2. The Three-Leg Drayage System

\`\`\`
[ Mexico Line-Haul Carrier ] ---> Drop at Nuevo Laredo Yard
                                         |
[ B1 Drayage Transfer Tractor (Transfer) ] ---> World Trade Bridge (Crossing)
                                         |
[ US CBP & Mexican Aduana Inspection ]
                                         |
[ Laredo Logistics Cross-Dock Facility ] ---> Transload / Inspection
                                         |
[ US Domestic Line-Haul Carrier ] ---> Final Delivery to US Destination
\`\`\`

1. **Leg 1: Mexican Line-Haul**: Mexican freight carrier transports trailer from interior plant (e.g., Saltillo, Silao, Querétaro) to carrier terminal in Nuevo Laredo.
2. **Leg 2: Transfer Drayage (El Transfer)**: Specialized local drayage tractors registered with US FMCSA and operated by B-1 visa drivers couple to the trailer and pull it across the international bridge through Mexican customs export gates and US CBP primary inspection booths.
3. **Leg 3: Laredo Cross-Dock Transload & US Line-Haul**: In Laredo, cargo is often inspected at a bonded cross-dock facility, transferred onto a domestic US 53-foot dry van or temperature-controlled reefer, and dispatched via US interstate highways.

### 3. C-TPAT / OEA Dedicated Green Lanes (FAST)
Importers certified under **C-TPAT (Customs-Trade Partnership Against Terrorism)** and Mexican **OEA (Operador Económico Autorizado)** utilize dedicated FAST lanes:
- Pre-filed electronic manifests (**e-Manifest / ACE**).
- High-security ISO 17712 mechanical bolt seals verified with RFID.
- Reduces border bridge transit wait time from 6–8 hours during peak congestion down to **45–60 minutes**.`
                }
            ],
            vocabulary: [
                {
                    en: "Cross-Docking",
                    es: "Cruce de Andén (Cross-Docking)",
                    definition: "Logistics practice of unloading materials from an incoming truck and loading them directly into outbound vehicles with little or no storage in between.",
                    ipa: "/ˈkrɔːs ˌdɑː.kɪŋ/",
                    collocations: ["Laredo cross-dock facility", "transload freight across docks", "minimize warehouse dwelling time"]
                },
                {
                    en: "Drayage / Transfer",
                    es: "Servicio de Transfer / Arrastre Fronterizo",
                    definition: "Short-haul trucking movement hauling freight across the international border bridge between Mexican and US terminals.",
                    ipa: "/ˈdreɪ.ɪdʒ/",
                    collocations: ["contract B1 transfer driver", "drayage crossing delays", "international bridge toll"]
                },
                {
                    en: "Automated Commercial Environment (ACE)",
                    es: "Entorno Comercial Automatizado (ACE de CBP)",
                    definition: "Primary electronic system through which the US trade community reports imports and exports to US Customs and Border Protection.",
                    ipa: "/ˈɔː.təˌmeɪ.tɪd kəˈmɜːr.ʃəl ɪnˈvaɪ.rən.mənt/",
                    collocations: ["transmit ACE e-manifest", "CBP ACE entry summary", "automated broker interface"]
                }
            ],
            questions: [
                {
                    id: "scm-q4",
                    prompt: "What is the primary role of a 'transfer' (drayage) tractor in the Laredo / Nuevo Laredo commercial trucking corridor?",
                    options: [
                        "To transport goods by air across the Gulf of Mexico.",
                        "To perform the specialized short-distance international bridge crossing between carrier terminals on both sides of the border.",
                        "To assemble electronic circuit boards inside the truck cab.",
                        "To deliver packages directly to residential consumer doorsteps."
                    ],
                    correctIndex: 1,
                    explanation: "Drayage ('transfer') operators specialize exclusively in hauling loaded trailers across the international border bridges between Mexican staging yards and US cross-dock terminals."
                }
            ],
            dialogues: [
                {
                    speaker: "Tyler Henderson",
                    role: "Director of Inbound Logistics (Atlanta Distribution Center)",
                    text: "Our shipment of 40 palletized wire harnesses has been stationary in Laredo for 36 hours. What is causing this dwell time?"
                },
                {
                    speaker: "Alejandro Treviño",
                    role: "Border Operations Dispatcher (Laredo Cross-Dock)",
                    text: "US CBP placed a random trade enforcement hold for non-intrusive VACIS gamma-ray imaging. The container cleared inspection at 09:00 hours with no anomalies. It is currently at our cross-dock being transloaded onto a dedicated Werner team-driver dry van, scheduled to arrive at your Atlanta dock within 22 hours."
                }
            ]
        },
        {
            id: "scm-m5",
            title: "Supplier Quality Audits under VDA 6.3 & Dual-Sourcing Risk Mitigation",
            titleES: "Auditorías de Calidad a Proveedores bajo VDA 6.3 y Mitigación de Riesgos por Abastecimiento Dual",
            icon: "fa-solid fa-list-check",
            readings: [
                {
                    id: "scm-m5-r1",
                    title: "VDA 6.3 Process Audit: P2 to P7 Questions, Downgrading Rules & Turtle Diagram Analysis",
                    duration: "15 min",
                    content: `> **Global Automotive Audit Standard**: **VDA 6.3 Process Audit (Verband der Automobilindustrie - 4th Edition)** and **IATF 16949 Clause 8.4 (Control of Externally Provided Processes, Products and Services)**.

# VDA 6.3: Assessing Process Robustness in Nearshoring Supply Bases

### 1. The Purpose of VDA 6.3
Unlike ISO 9001, which audits high-level quality management systems, **VDA 6.3** audits the direct operational robustness of the manufacturing process from product development down to serial production and customer service. It is the gold standard required by German, European, and top-tier global automakers (BMW, Mercedes-Benz, Volkswagen Group, Tesla).

### 2. The Process Audit Structure (Elements P2 to P7)

| Element Code | Audit Scope & Process Focus | Key Inquiry Area |
| :--- | :--- | :--- |
| **P2** | Project Management | Resource allocation, milestone gate reviews, escalation protocols. |
| **P3** | Planning Product & Process Development | Design FMEA, Process FMEA, prototype validation schedules. |
| **P4** | Implementation of Product & Process Development | Tooling pre-series verification, Cpk capability, PPAP buy-off. |
| **P5** | Supplier Management | Sub-tier supplier qualification, incoming material incoming inspection. |
| **P6** | Process Analysis / Production | **Largest element**: Workstation standard work, poka-yoke error proofing, calibration, traceability. |
| **P7** | Customer Care / Satisfaction | Failure analysis turnaround time (8D discipline), containment effectiveness. |

### 3. Downgrading Rules & Classification (A, B, C)
Total score calculation yields a percentage compliance ($E_G$):
- **Level A (Quality Capable)**: Score $\\ge 90\\%$. Approved for serial volume production.
- **Level B (Conditionally Capable)**: $80\\% \\le \\text{Score} < 90\\%$. Requires formal corrective action plan (CAP); supplier placed on probationary status.
- **Level C (Not Quality Capable)**: Score $< 80\\%$. Immediate supplier block; cannot be awarded new programs.

**Automatic Downgrading Trigger**:
Even if an overall score exceeds 90%, if any single critical question (*\"*-marked question, e.g., P6.4.3: Are parts identified and traceable throughout production?) receives **zero points**, the supplier is **automatically downgraded from Level A to Level B or C**.`
                }
            ],
            vocabulary: [
                {
                    en: "VDA 6.3 Process Audit",
                    es: "Auditoría de Proceso VDA 6.3",
                    definition: "German automotive standard auditing the capability and maturity of manufacturing processes across serial production stages.",
                    ipa: "/faʊ deː aː zɛks pʊŋkt draɪ/",
                    collocations: ["conduct on-site VDA 6.3 audit", "downgrade to Level B rating", "critical asterisk question"]
                },
                {
                    en: "Dual-Sourcing Strategy",
                    es: "Estrategia de Abastecimiento Dual",
                    definition: "Supply chain risk mitigation practice allocating production volume between two independent suppliers (e.g., 70/30 split) to ensure business continuity.",
                    ipa: "/ˈduː.əl ˈsɔːr.sɪŋ ˈstræt.ə.dʒi/",
                    collocations: ["mitigate single-source risk", "volume allocation split", "resilient dual-source architecture"]
                },
                {
                    en: "Poka-Yoke Error Proofing",
                    es: "Dispositivo a Prueba de Errores (Poka-Yoke)",
                    definition: "Physical or electronic mechanism integrated into a production process that physically prevents an operator from committing an error.",
                    ipa: "/ˈpoʊ.kə ˈjoʊ.ki ˈɛr.ər ˈpruː.fɪŋ/",
                    collocations: ["mechanical poka-yoke fixture", "optical sensor interlock", "zero-defect assembly gate"]
                }
            ],
            questions: [
                {
                    id: "scm-q5",
                    prompt: "In a VDA 6.3 automotive process audit, what is the consequence if a manufacturing plant achieves an overall score of 93% but scores 0 points on a single critical asterisk (*-marked) question?",
                    options: [
                        "The plant is automatically awarded an A+ rating with honors.",
                        "The plant is automatically downgraded to Level B or C despite the high numerical score.",
                        "The auditor is dismissed and replaced.",
                        "The plant must close down for one calendar year."
                    ],
                    correctIndex: 1,
                    explanation: "Under strict VDA 6.3 rules, a failure (0 points) on any single *-marked question triggers an automatic downgrade from Level A to Level B or C, preventing unmonitored serial production."
                }
            ],
            dialogues: [
                {
                    speaker: "Hans Richter",
                    role: "Lead Supplier Quality Auditor (Munich Matrix)",
                    text: "On Line 3, we observed that operator rework on non-conforming housings is documented on paper sheets without being scanned into your MES serial traceability system. This touches critical question P6.5.3."
                },
                {
                    speaker: "Guillermo Lozano",
                    role: "Plant Quality Director (San Luis Potosí Facility)",
                    text: "We acknowledge the finding. We have immediately locked the manual rework station and implemented a barcode interlock on our laser engraver; the rework station cannot release the part until the MES registers the engineering disposition code. We will submit the 8D containment record within 24 hours."
                }
            ]
        },
        {
            id: "scm-m6",
            title: "Cold Chain, GDP Compliance & Temperature-Controlled International Freight",
            titleES: "Cadena de Frío, Cumplimiento de Buenas Prácticas de Distribución (GDP) y Carga Refrigerada Internacional",
            icon: "fa-solid fa-snowflake",
            readings: [
                {
                    id: "scm-m6-r1",
                    title: "Active vs Passive Packaging, Temperature Data Loggers & Validation under EU GDP & FDA 21 CFR 211",
                    duration: "14 min",
                    content: `> **Life Sciences Logistics Standard**: **EU Good Distribution Practice (GDP) 2013/C 343/01** and **US FDA 21 CFR Part 211.142 (Warehousing and Distribution)**. Mandatory standards for shipping biopharmaceuticals, vaccines, and biologics across borders.

# Cold Chain Integrity: Validated Distribution of Life Sciences Payloads

### 1. Temperature Control Categories in Cross-Border Freight
1. **Cryogenic / Ultra-Low**: Below $-70^{\\circ}\\text{C}$ utilizing liquid nitrogen dry shippers (e.g., mRNA vaccines, cellular therapies).
2. **Frozen**: $-20^{\\circ}\\text{C}$ controlled freezer units (e.g., blood plasma derivatives, diagnostic enzymes).
3. **Refrigerated (Cold Chain)**: $+2^{\\circ}\\text{C}$ to $+8^{\\circ}\\text{C}$ (e.g., monoclonal antibodies, insulin, injectable biologics).
4. **Controlled Room Temperature (CRT)**: $+15^{\\circ}\\text{C}$ to $+25^{\\circ}\\text{C}$ (protecting sensitive tablets and lyophilized vials from extreme desert or tropical highway temperatures).

### 2. Active vs. Passive Thermal Packaging
- **Passive Packaging Systems**: Vacuum insulated panels (VIP) and phase-change materials (PCM) maintaining temperature for 72 to 120 hours without external electrical power.
- **Active Systems**: Temperature-controlled reefer trailers equipped with autonomous Thermo King or Carrier refrigeration units, integrated telematics, dual-temperature zones, and continuous electric standby.

### 3. Temperature Excursion Management & Real-Time IoT Telematics
A **temperature excursion** occurs when cargo temperature drifts outside the validated specification.
- Every shipment contains calibrated NIST-traceable USB or cellular IoT temperature data loggers.
- IoT monitors stream real-time GPS coordinates, temperature, humidity, and door-opening optical sensor alerts directly to the quality assurance command center.
- Under GDP Clause 9.2, if a temperature excursion occurs during international transit, the entire shipment must be quarantined immediately upon arrival until Quality Assurance conducts a formal stability evaluation.`
                }
            ],
            vocabulary: [
                {
                    en: "Temperature Excursion",
                    es: "Excursión de Temperatura",
                    definition: "Event in which temperature-sensitive pharmaceuticals or medical supplies deviate from specified label storage temperatures during transit.",
                    ipa: "/ˈtɛm.prə.tʃər ɪkˈskɜːr.ʒən/",
                    collocations: ["investigate temperature excursion", "quarantine exposed batch", "mean kinetic temperature (MKT)"]
                },
                {
                    en: "Good Distribution Practice (GDP)",
                    es: "Buenas Prácticas de Distribución (GDP)",
                    definition: "Quality standard governing the storage, transport, and handling of active pharmaceutical ingredients and medical products.",
                    ipa: "/ɡʊd ˌdɪs.trɪˈbjuː.ʃən ˈpræk.tɪs/",
                    collocations: ["GDP certified transport fleet", "GDP compliance audit", "maintain unbroken cold chain"]
                },
                {
                    en: "Phase-Change Material (PCM)",
                    es: "Material de Cambio de Fase (PCM)",
                    definition: "Thermal storage compound that absorbs and releases latent heat at specific transition temperatures to regulate internal package climates.",
                    ipa: "/feɪz tʃeɪndʒ məˈtɪr.i.əl/",
                    collocations: ["PCM cooling pack", "pre-conditioned thermal blanket", "passive shipper thermal retention"]
                }
            ],
            questions: [
                {
                    id: "scm-q6",
                    prompt: "Under Good Distribution Practice (GDP), what immediate action must be taken when a calibrated data logger indicates a temperature excursion occurred during cross-border transit?",
                    options: [
                        "The products must be sold immediately at a discounted price.",
                        "The data logger must be discarded and replaced with a blank one.",
                        "The entire shipment must be physically quarantined upon arrival, documented, and held until Quality Assurance evaluates stability data.",
                        "The driver must pay a cash fine directly to customs."
                    ],
                    correctIndex: 2,
                    explanation: "Under GDP, any temperature excursion triggers an immediate quarantine of the shipment; goods cannot be released to stock or production until a documented stability evaluation verifies product integrity."
                }
            ],
            dialogues: [
                {
                    speaker: "Dr. Evelyn Reed",
                    role: "Global Head of Quality Assurance (Pharma HQ)",
                    text: "Our refrigerated trailer delivering high-purity biological reagents from Tijuana to San Diego recorded a 42-minute temperature spike to 11.2 degrees Celsius while waiting in the secondary customs inspection bay. What is the disposition of this lot?"
                },
                {
                    speaker: "Esteban Palacios",
                    role: "Cold Chain Logistics Director (Tijuana Medical Facility)",
                    text: "The shipment was placed under quarantine hold at our validated cold-room facility upon dock arrival. We extracted the time-temperature integration profile and calculated the Mean Kinetic Temperature (MKT), which remained at 4.6 degrees Celsius. We have submitted the MKT analysis and stability test data to your QA committee for formal release approval."
                }
            ]
        }
    ]
};

// Check if already injected
const matchExisting = fileContent.match(/"advanced-supply-chain-reshoring"\s*:/);
if (matchExisting) {
    console.log("Track 34 is already present in courses.js! Skipping duplicate insertion.");
} else {
    const lastBraceIndex = fileContent.lastIndexOf('};');
    if (lastBraceIndex === -1) {
        console.error("Could not find '};' in courses.js");
        process.exit(1);
    }

    const before = fileContent.substring(0, lastBraceIndex);
    const after = fileContent.substring(lastBraceIndex);

    const track34Str = `,\n    "advanced-supply-chain-reshoring": ` + JSON.stringify(track34, null, 8);

    const updatedContent = before + track34Str + "\n" + after;
    fs.writeFileSync(coursesPath, updatedContent, 'utf8');
    console.log("Successfully injected Track 34 (advanced-supply-chain-reshoring) into content/courses.js!");
}
