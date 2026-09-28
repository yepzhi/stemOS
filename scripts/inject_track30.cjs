/**
 * scripts/inject_track30.cjs
 * Injects Track 30: International Logistics & Global Trade Compliance
 * (Incoterms 2020 / USMCA T-MEC Rules of Origin / IMMEX Anexo 24-31 / C-TPAT / Pedimentos / HTS Classification)
 * into content/courses.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '../content/courses.js');
let fileContent = fs.readFileSync(coursesPath, 'utf8');

// Define Track 30 Data
const track30 = {
    id: "logistics-compliance",
    title: "Logística Internacional, Aduanas y Cumplimiento T-MEC",
    titleEN: "International Logistics & Global Trade Compliance",
    level: "B1-B2",
    category: "engineering",
    description: "Operaciones de comercio exterior y cadena de suministro transfronteriza: Incoterms® 2020 (FCA, DDP, DAP), reglas de origen y certificación T-MEC, programa IMMEX (Anexo 24 y 31), despacho aduanero con pedimentos y seguridad C-TPAT.",
    status: "full",
    totalModules: 6,
    standard: "Incoterms® 2020 (ICC) / USMCA (T-MEC) / IMMEX Anexo 24-31 / C-TPAT / WCO SAFE Framework",
    modules: [
        {
            id: "log-m1",
            title: "Incoterms® 2020 in Cross-Border Manufacturing (FCA, DDP, DAP & Risk Transfer)",
            titleES: "Incoterms® 2020 en Manufactura Transfronteriza (FCA, DDP, DAP y Transferencia de Riesgo)",
            icon: "fa-solid fa-truck-moving",
            isGoldModel: true,
            readings: [
                {
                    id: "log-m1-r1",
                    title: "Incoterms 2020 Architecture: Allocating Costs, Risks & Customs Clearance",
                    duration: "15 min",
                    content: `> **Global Trade Standard**: Published by the **International Chamber of Commerce (ICC - Incoterms® 2020)**. Essential for Supply Chain Directors, Logistics Managers, and International Purchasing Leads operating across US-Mexico-Canada manufacturing corridors (Laredo, Otay Mesa, El Paso, Monterrey, Querétaro).

# Incoterms® 2020 in Cross-Border Manufacturing

### 1. The Critical Purpose of Incoterms
In international trade, misunderstandings regarding freight logistics cost billions annually. **Incoterms® (International Commercial Terms)** are an internationally standardized set of 11 three-letter trade terms published by the ICC.

Incoterms define three non-negotiable legal responsibilities between buyer and seller:
1. **Transfer of Risk**: The exact physical point in the logistics journey where the risk of loss or cargo damage shifts from the seller to the buyer.
2. **Allocation of Costs**: Who pays for packaging, export drayage, ocean/air/rail freight, transit insurance, terminal handling charges (THC), and customs duties.
3. **Customs Clearance Formalities**: Who acts as the legal Importer of Record (IOR) or Exporter of Record (EOR) responsible for export declarations and import duty payment.

> **Common Audit Trap**: Incoterms **do not** transfer product title or ownership, nor do they define payment terms (e.g., Net 30, Letter of Credit) or breach of contract remedies. Ownership transfer must be explicitly stipulated in the commercial contract.

### 2. High-Frequency Terms in North American Nearshoring
In manufacturing corridors connecting Mexican maquiladoras with US OEM assembly hubs, three Incoterms dominate:

| Term | Full Name | Risk Transfer Point | Freight Cost Allocation | Export / Import Clearance |
| :--- | :--- | :--- | :--- | :--- |
| **EXW** | **Ex Works** | Seller's factory floor when goods are made available (unloaded). | Buyer assumes 100% of freight, loading, insurance, and transit. | Buyer handles export & import. *(Dangerous trap for foreign buyers unable to clear Mexican export customs).* |
| **FCA** | **Free Carrier** | When goods are loaded onto the buyer's carrier at seller's facility, or delivered to buyer's border cross-dock. | Seller pays drayage to transfer point; Buyer pays main international freight. | **Seller clears export; Buyer clears import.** *(The optimal recommended replacement for EXW).* |
| **DAP** | **Delivered at Place** | At the named destination point ready for unloading from the arriving conveyance. | Seller pays all transportation to the destination; Buyer pays unloading costs. | Seller clears export; **Buyer clears import & pays duties/taxes.** |
| **DDP** | **Delivered Duty Paid** | At buyer's warehouse door, cleared for import, ready for unloading. | Seller pays 100% of transit costs, including import customs duties and VAT. | **Seller acts as Importer of Record (IOR)** and clears both export and import. |

### 3. The Dangerous Trap of DDP for Foreign Sellers
While US automotive buyers often demand **DDP** (wanting parts delivered to their factory dock with zero administrative hassle), executing DDP into Mexico requires the foreign seller to possess a Mexican corporate tax ID (RFC) registered in the official **Padrón de Importadores**. Without a registered legal entity in Mexico, a US supplier cannot legally clear import customs under DDP.`
                },
                {
                    id: "log-m1-r2",
                    title: "Bill of Lading (BOL), Transfer of Risk & Cargo Insurance Claims",
                    duration: "13 min",
                    content: `> **Operational Logistics Standard**: Governed by the **Carriage of Goods by Sea Act (COGSA)**, **Uniform Commercial Code (UCC Article 7)**, and **Mexican Ley de Vías Generales de Comunicación**.

### 1. The Legal Trinity of the Bill of Lading (BOL)
The **Bill of Lading (BOL)** is the most important legal instrument in physical transportation. It fulfills three simultaneous functions:
1. **Receipt of Goods**: A signed acknowledgment by the freight carrier that goods were received in apparent good order and condition.
2. **Document of Title**: Endorsement of an original negotiable BOL allows the holder to claim ownership of the cargo at port.
3. **Contract of Carriage**: Establishes the terms and conditions under which the carrier transports the cargo from origin to destination.

### 2. Clean vs Claused (Foul) Bill of Lading
- **Clean BOL**: The carrier notes zero packaging damage, dented drums, or torn pallet wrap upon cargo receipt. Banks will **only** release funds under a commercial Letter of Credit (LC) against a pristine Clean BOL.
- **Claused / Foul BOL**: The driver or port agent annotates physical anomalies (e.g., *"12 cartons crushed, water stains observed on pallet 4"*). A Claused BOL immediately freezes bank payments and establishes carrier liability for cargo insurance claims.`
                }
            ],
            dialogue: [
                {
                    role: "Gregory Walsh (VP of Global Procurement, Detroit)",
                    content: "Good morning, Gabriela. We are finalizing our five-year purchase agreement for aluminum transmission housings from your Saltillo foundry. Our corporate purchasing mandate requires all Tier-1 suppliers to quote strictly on a DDP Detroit assembly plant basis.",
                    translation: "Buenos días, Gabriela. Estamos finalizando nuestro contrato de compra a cinco años para carcasas de transmisión de aluminio de su fundición en Saltillo. Nuestro mandato corporativo de compras exige que todos los proveedores Tier-1 coticen estrictamente sobre una base DDP planta de ensamble de Detroit.",
                    pedagogicalNotes: "Target terms: purchase agreement, aluminum transmission housings, Tier-1 suppliers, DDP (Delivered Duty Paid), Detroit assembly plant"
                },
                {
                    role: "Lic. Gabriela Montemayor (Director of Supply Chain & Global Trade, Monterrey)",
                    content: "Good morning, Gregory. While we understand Detroit's preference for DDP, our legal and customs compliance counsel strongly recommends negotiating on an FCA Laredo, Texas cross-dock basis instead. Under FCA Laredo, we handle Mexican export clearance and the drayage bridge crossing, but your US customs broker clears entry into the US.",
                    translation: "Buenos días, Gregory. Aunque entendemos la preferencia de Detroit por DDP, nuestro asesor legal y de cumplimiento aduanero recomienda enfáticamente negociar sobre una base FCA cross-dock Laredo, Texas en su lugar. Bajo FCA Laredo, nosotros manejamos el despacho de exportación mexicano y el cruce del puente transfer, pero su agente aduanal estadounidense gestiona la entrada a EE.UU.",
                    pedagogicalNotes: "Target terms: customs compliance counsel, FCA (Free Carrier), cross-dock, export clearance, drayage bridge crossing, US customs broker"
                },
                {
                    role: "Gregory Walsh (VP of Global Procurement, Detroit)",
                    content: "What is your primary concern with DDP? Our purchasing team does not want to manage freight forwarders or US customs paperwork.",
                    translation: "¿Cuál es su principal preocupación con DDP? Nuestro equipo de compras no desea gestionar transportistas de carga ni trámites aduanales de EE.UU.",
                    pedagogicalNotes: "Target terms: freight forwarders, US customs paperwork"
                },
                {
                    role: "Lic. Gabriela Montemayor (Director of Supply Chain & Global Trade, Monterrey)",
                    content: "Under DDP, if a CBP port inspection or agricultural hold delays the trailer at the World Trade Bridge, our company would bear 100% of detention fees and potential line-down penalties. Under DAP or FCA Laredo with your preferred logistics partner, risk transfers once the trailer is staged on the US side, aligning with standard T-MEC manufacturing practices.",
                    translation: "Bajo DDP, si una inspección portuaria de CBP o una retención agrícola retrasa el remolque en el Puente del Comercio Mundial, nuestra empresa asumiría el 100% de las tarifas de detención y las posibles penalizaciones por paro de línea. Bajo DAP o FCA Laredo con su socio logístico preferido, el riesgo se transfiere una vez que el remolque se ubica en el lado estadounidense, alineándose con las prácticas de manufactura estándar del T-MEC.",
                    pedagogicalNotes: "Target terms: CBP port inspection, World Trade Bridge, detention fees, line-down penalties, transfer of risk"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Incoterms® 2020",
                    ipa: "/ˈɪn.koʊˌtɜːrmz ˈtwɛn.ti ˈtwɛn.ti/",
                    es: "Términos Internacionales de Comercio (Incoterms 2020)",
                    category: "Comercio Internacional",
                    definition: "The 11 globally recognized commercial rules published by the International Chamber of Commerce defining the allocation of costs, risks, and customs clearance tasks between buyer and seller.",
                    collocations: ["Incoterms rule", "ICC official publication", "stipulate Incoterms in contract"],
                    falseFriends: "No regulan la transferencia de propiedad (título) del bien ni las penalizaciones por incumplimiento de pago; solo costos, riesgos físicos y aduanas.",
                    nativeUsage: "The procurement contract specified Incoterms 2020 FCA Monterrey for all raw steel shipments."
                },
                {
                    term: "Free Carrier (FCA)",
                    ipa: "/friː ˈkær.i.ɚ/",
                    es: "Franco Transportista (FCA - Incoterm)",
                    category: "Logística y Transporte",
                    definition: "An Incoterm rule where the seller delivers the goods, cleared for export, to the carrier nominated by the buyer at the seller's premises or another named place.",
                    collocations: ["FCA named place", "transfer of risk under FCA", "FCA cross-dock facility"],
                    falseFriends: "Es el término moderno preferido para reemplazar a EXW en manufactura transfronteriza, ya que el vendedor asume legalmente el despacho de exportación.",
                    nativeUsage: "Under FCA Laredo, the Mexican exporter delivers the auto parts to the Texas logistics cross-dock."
                },
                {
                    term: "Delivered Duty Paid (DDP)",
                    ipa: "/dɪˈlɪv.ɚd ˈduː.ti peɪd/",
                    es: "Entregada Derechos Pagados (DDP - Incoterm)",
                    category: "Aduanas y Flete",
                    definition: "The Incoterm imposing maximum obligation on the seller, who must bear all costs and risks of transportation, pay export and import duties, and handle import customs clearance.",
                    collocations: ["DDP shipment", "seller acts as Importer of Record under DDP", "DDP price quote"],
                    falseFriends: "DDP exige que el vendedor pague todos los impuestos de importación y actúe como importador registrado en el país de destino.",
                    nativeUsage: "The Detroit automaker insisted on DDP terms so that shipments arrived at the plant without customs intervention."
                },
                {
                    term: "Transfer of Risk",
                    ipa: "/ˈtræns.fɚ əv rɪsk/",
                    es: "Transmisión / Transferencia del riesgo físico de las mercancías",
                    category: "Derecho Mercantil",
                    definition: "The exact geographic and operational moment when responsibility for physical damage, loss, or theft of cargo passes from the seller to the buyer.",
                    collocations: ["point of risk transfer", "transfer of risk upon loading", "insurable risk transfer"],
                    falseFriends: "No coincide necesariamente con el punto de pago financiero; está definido estrictamente por el Incoterm acordado.",
                    nativeUsage: "Under CIP terms, transfer of risk occurs when goods are handed to the first carrier, even though the seller pays freight to destination."
                },
                {
                    term: "Bill of Lading (BOL)",
                    ipa: "/bɪl əv ˈleɪ.dɪŋ/",
                    es: "Conocimiento de Embarque / Carta de Porte (BOL)",
                    category: "Documentación Logística",
                    definition: "A detailed document issued by a freight carrier acknowledging receipt of cargo for shipment, acting as a receipt, a contract of carriage, and a document of title.",
                    collocations: ["clean bill of lading", "original negotiable BOL", "endorse the BOL"],
                    falseFriends: "No es una simple factura comercial; es el título de propiedad legal que permite retirar la mercancía en aduana o puerto.",
                    nativeUsage: "The carrier stamped the Bill of Lading clean after verifying all 40 shipping pallets were undamaged."
                },
                {
                    term: "Importer of Record (IOR)",
                    ipa: "/ɪmˈpɔːr.tɚ əv ˈrɛk.ɚd/",
                    es: "Importador Registrado (IOR / Responsable Legal ante Aduana)",
                    category: "Aduanas y Regulación",
                    definition: "The entity or individual legally responsible for ensuring that imported goods comply with all local customs laws, filing declarations, and paying assessed duties and taxes.",
                    collocations: ["act as Importer of Record", "IOR compliance liability", "third-party IOR service"],
                    falseFriends: "El IOR asume responsabilidad legal civil y penal directa ante CBP en EE.UU. o el SAT en México ante declaraciones fraudulentas.",
                    nativeUsage: "Foreign companies without a Mexican tax ID must hire a licensed third-party Importer of Record to clear goods into Mexico."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Incoterms Risk vs Ownership",
                    botQuestion: "Welcome to the International Trade & Logistics Lab! Do Incoterms® 2020 define the exact point where legal ownership and title of the goods transfer from the seller to the buyer?",
                    requiredKeywords: ["no", "title", "ownership", "contract", "property"],
                    minKeywords: 2,
                    feedbackSuccess: "Correct! Incoterms define only the transfer of physical risk, allocation of transportation costs, and customs formalities. Legal title and ownership transfer must be explicitly stipulated in the commercial contract.",
                    feedbackRetry: "Remember the golden legal rule of Incoterms: they govern physical risk and costs, but do they transfer legal title?"
                },
                {
                    step: 2,
                    concept: "DDP Importer of Record",
                    botQuestion: "Under the Incoterm DDP (Delivered Duty Paid), which party (the buyer or the seller) is legally responsible for clearing import customs, paying import tariffs, and acting as the Importer of Record (IOR)?",
                    requiredKeywords: ["seller", "exporter"],
                    minKeywords: 1,
                    feedbackSuccess: "Spot on! Under DDP, the seller assumes maximum obligation, acting as the Importer of Record, handling import customs clearance, and paying all applicable duties and taxes.",
                    feedbackRetry: "DDP stands for Delivered Duty Paid. Who pays the duties and clears customs: buyer or seller?"
                }
            ],
            quiz: [
                {
                    q: "Under Incoterms® 2020, what is the primary operational difference between EXW (Ex Works) and FCA (Free Carrier)?",
                    options: [
                        "Under FCA the seller is responsible for export customs clearance and loading, whereas under EXW the buyer assumes all export clearance burdens",
                        "EXW applies only to air freight, while FCA applies only to maritime cargo",
                        "Under FCA the seller must pay import duties in the destination country",
                        "There is no difference; they are interchangeable abbreviations"
                    ],
                    answer: 0
                },
                {
                    q: "What makes a 'Clean' Bill of Lading (BOL) mandatory when financing international trade through a commercial Letter of Credit (LC)?",
                    options: [
                        "It certifies that the carrier received the cargo in apparent good order and condition with no recorded damages, which banks require before releasing funds",
                        "It proves that the shipping container was washed with industrial soap",
                        "It guarantees that the truck driver possesses a clean driving record",
                        "It indicates that zero customs duties will be assessed"
                    ],
                    answer: 0
                },
                {
                    q: "Why can agreeing to DDP terms into Mexico be legally problematic for a US-based manufacturer that does not have a Mexican subsidiary?",
                    options: [
                        "Because Mexican customs law requires the Importer of Record to hold a registered Mexican RFC and be enrolled in the official Padrón de Importadores",
                        "Because English is not an official language in North America",
                        "Because US trucks are prohibited from crossing the international border bridges",
                        "Because DDP shipments cannot be insured under international maritime law"
                    ],
                    answer: 0
                },
                {
                    q: "What are the three core legal functions fulfilled by a Bill of Lading (BOL)?",
                    options: [
                        "Receipt of goods, document of title, and contract of carriage",
                        "Driver identification card, vehicle registration, and parking ticket",
                        "Certificate of origin, employee timecard, and factory blueprint",
                        "Environmental inspection log, tax invoice, and credit score report"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "log-m2",
            title: "USMCA / T-MEC Rules of Origin, RVC Calculations & Certificates of Origin",
            titleES: "Reglas de Origen T-MEC / USMCA, Cálculos de VCR y Certificación de Origen",
            icon: "fa-solid fa-stamp",
            isGoldModel: true,
            readings: [
                {
                    id: "log-m2-r1",
                    title: "T-MEC / USMCA Rules of Origin Architecture & Tariff Shift Criteria",
                    duration: "15 min",
                    content: `> **Trade Agreement Authority**: Governed by the **United States-Mexico-Canada Agreement (USMCA / T-MEC / CUSMA)**, specifically **Chapter 4 (Rules of Origin)** and **Chapter 5 (Origin Procedures)**. Crucial for Trade Compliance Officers, Customs Managers, and Cost Accountants.

# USMCA / T-MEC Rules of Origin & RVC Calculations

### 1. The Core Objective of Preferential Trade
The USMCA (T-MEC in Mexico) eliminated import tariffs ($0\\%$ duty) on qualifying goods traded between the US, Mexico, and Canada. However, preferential tariff treatment is not automatic. To claim $0\\%$ duty, a manufactured component must prove **originating status** under strict Rules of Origin.

If a Mexican maquiladora imports cheap microchips or steel from China, packages them in Tijuana, and exports them to Texas, that product is **non-originating** and subject to full Most-Favored-Nation (MFN) tariffs or punitive Section 301 duties.

### 2. Methodologies for Determining Originating Status
A good qualifies as originating if it satisfies one of three primary legal mechanisms:
1. **Wholly Obtained or Produced (WO)**: Goods extracted, harvested, or produced entirely within the USMCA territory (e.g., silver mined in Zacatecas, crude oil extracted in Alberta).
2. **Tariff Shift (Change in Tariff Classification - CTC)**: All non-originating raw materials imported from outside North America undergo a specified transformation resulting in a change in Harmonized System (HS) code:
   - **CC (Change in Chapter)**: Change at the 2-digit level (e.g., Chapter 72 Steel $\\rightarrow$ Chapter 87 Automotive).
   - **CTH (Change in Tariff Heading)**: Change at the 4-digit level (e.g., Heading 8407 Engine $\\rightarrow$ Heading 8409 Parts).
   - **CTSH (Change in Tariff Subheading)**: Change at the 6-digit level.
3. **Regional Value Content (RVC)**: Mandating that a minimum percentage of the component's total value consists of North American labor, materials, and overhead.`
                },
                {
                    id: "log-m2-r2",
                    title: "Regional Value Content (RVC) Formulas: Transaction Value vs Net Cost",
                    duration: "14 min",
                    content: `> **Trade Compliance Formula**: Governed by **USMCA Article 4.5 (Regional Value Content)**.

### 1. The Two Legal RVC Formulas
Manufacturers calculate Regional Value Content (RVC) using either the **Transaction Value Method** or the **Net Cost Method**:

#### Method A: Transaction Value Method (TVM)
$$\\text{RVC} = \\left( \\frac{\\text{TV} - \\text{VNM}}{\\text{TV}} \\right) \\times 100$$
Where:
- $\\text{TV} = \\text{Transaction Value (FOB selling price of the good)}$
- $\\text{VNM} = \\text{Value of Non-Originating Materials (materials imported from Asia or Europe)}$

#### Method B: Net Cost Method (NCM) — Mandatory for Automotive & Core Parts
Automotive components and vehicles cannot use Transaction Value; they must use **Net Cost**:
$$\\text{RVC} = \\left( \\frac{\\text{NC} - \\text{VNM}}{\\text{NC}} \\right) \\times 100$$
Where:
- $\\text{NC} = \\text{Net Cost (Total manufacturing cost minus sales promotion, marketing, royalties, and non-allowable interest)}$

### 2. Automotive Rules of Origin Tightening under T-MEC
Under old NAFTA rules, passenger vehicles required $62.5\\%$ RVC. The T-MEC instituted far more aggressive rules:
- **Vehicle RVC Threshold**: Increased to **$75\\%$** under Net Cost.
- **Core Parts Requirement**: Engines, transmissions, body panels, and steering systems must meet **$75\\%$** RVC.
- **Steel & Aluminum Purchasing Mandate**: At least **$70\\%$** of the corporate steel and aluminum purchased by an automaker must be melted and poured within North America.
- **Labor Value Content (LVC)**: At least **$40\\% - 45\\%$** of the value of passenger vehicles must be produced by manufacturing workers earning at least **$16 USD per hour** (primarily US and Canadian plants, driving high-wage wage leveling).`
                }
            ],
            dialogue: [
                {
                    role: "Specialist Brian O'Connor (US Customs & Border Protection Import Specialist)",
                    content: "Good morning, Licenciada Arteaga. CBP is conducting a focused origin verification audit on your company's shipments of electric vehicle battery disconnect units imported through the Otay Mesa port under USMCA tariff preference. Can you provide the Bill of Materials and your RVC calculation worksheet?",
                    translation: "Buenos días, Licenciada Arteaga. CBP está realizando una auditoría de verificación de origen focalizada en los embarques de su empresa de unidades de desconexión de batería de vehículos eléctricos importadas por el puerto de Otay Mesa bajo preferencia arancelaria T-MEC. ¿Podría proporcionar la Lista de Materiales y su hoja de cálculo de VCR?",
                    pedagogicalNotes: "Target terms: focused origin verification audit, battery disconnect units, USMCA tariff preference, Bill of Materials (BOM), RVC calculation worksheet"
                },
                {
                    role: "Lic. Marcela Arteaga (Director of Customs & Trade Compliance, Tijuana)",
                    content: "Good morning, Officer O'Connor. Here is our auditable USMCA origin dossier. Our battery disconnect unit is classified under HTS subheading 8537.10. We calculated Regional Value Content using the Net Cost method, as required for automotive electrical sub-assemblies under Article 4.5.",
                    translation: "Buenos días, Oficial O'Connor. Aquí tiene nuestro expediente auditable de origen T-MEC. Nuestra unidad de desconexión de batería está clasificada bajo la subpartida arancelaria HTS 8537.10. Calculamos el Contenido de Valor Regional utilizando el método de Costo Neto, como lo exige para subensambles eléctricos automotrices el Artículo 4.5.",
                    pedagogicalNotes: "Target terms: auditable USMCA origin dossier, HTS subheading, Net Cost method, automotive electrical sub-assemblies"
                },
                {
                    role: "Specialist Brian O'Connor (US Customs & Border Protection Import Specialist)",
                    content: "I see three high-voltage relays sourced from a supplier in Shenzhen, China listed under non-originating materials. What was your total VNM deduction relative to your factory net cost?",
                    translation: "Veo tres relevadores de alto voltaje provenientes de un proveedor en Shenzhen, China listados bajo materiales no originarios. ¿Cuál fue su deducción total de VNM en relación con su costo neto de fábrica?",
                    pedagogicalNotes: "Target terms: non-originating materials (VNM), VNM deduction, factory net cost"
                },
                {
                    role: "Lic. Marcela Arteaga (Director of Customs & Trade Compliance, Tijuana)",
                    content: "The Shenzhen relays represent $42.10 USD of VNM out of a total Net Cost of $168.40 USD. Applying the formula $(168.40 - 42.10) / 168.40$, our originating content yields an RVC of 75.0%, exactly satisfying the core automotive threshold. All other molded housings and wire harnesses carry signed supplier certificates of origin from Mexican and US vendors.",
                    translation: "Los relevadores de Shenzhen representan $42.10 USD de VNM de un Costo Neto total de $168.40 USD. Aplicando la fórmula $(168.40 - 42.10) / 168.40$, nuestro contenido originario arroja un VCR del 75.0%, satisfaciendo exactamente el umbral automotriz esencial. Todas las demás carcasas moldeadas y arneses de cables cuentan con certificados de origen firmados por proveedores mexicanos y estadounidenses.",
                    pedagogicalNotes: "Target terms: VNM, Net Cost, RVC of 75.0%, core automotive threshold, signed supplier certificates of origin"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Regional Value Content (RVC)",
                    ipa: "/ˈriː.dʒən.əl ˈvæl.juː ˈkɑːn.tɛnt/",
                    es: "Contenido de Valor Regional (VCR)",
                    category: "Reglas de Origen",
                    definition: "The percentage of a manufactured product's total value that must originate from within the USMCA (T-MEC) member countries to qualify for preferential zero-duty treatment.",
                    collocations: ["calculate RVC", "satisfy RVC threshold", "Net Cost RVC calculation"],
                    falseFriends: "No es simplemente el porcentaje de piezas físicas; es un cálculo monetario financiero estricto basado en costos de materiales, mano de obra y gastos de planta.",
                    nativeUsage: "The engineering team replaced an Asian resin with a North American blend to boost RVC above the mandatory 65% limit."
                },
                {
                    term: "Tariff Shift (Change in Tariff Classification)",
                    ipa: "/ˈtær.ɪf ʃɪft/",
                    es: "Salto Arancelario (Cambio de Clasificación Arancelaria)",
                    category: "Criterios de Origen",
                    definition: "A rule of origin requirement where non-originating imported raw materials must undergo substantial manufacturing transformation resulting in a change of Harmonized System (HS) code.",
                    collocations: ["meet tariff shift rule", "Change in Tariff Heading (CTH)", "substantial transformation"],
                    falseFriends: "Un simple ensamble o empaquetado cosmético no califica como salto arancelario sustancial ante aduanas.",
                    nativeUsage: "Machining the raw imported steel billets into precision crankshafts satisfied the CTH tariff shift rule."
                },
                {
                    term: "Net Cost Method",
                    ipa: "/nɛt kɑːst ˈmɛθ.əd/",
                    es: "Método de Costo Neto (para cálculo de VCR)",
                    category: "Contabilidad de Costos y Aduanas",
                    definition: "A method of calculating RVC based on total manufacturing cost minus excluded costs such as sales promotion, marketing, royalties, and non-allowable interest.",
                    collocations: ["apply Net Cost formula", "automotive Net Cost rule", "excluded costs under Net Cost"],
                    falseFriends: "Obligatorio para la industria automotriz y piezas esenciales en el T-MEC; no se permite usar el valor de transacción comercial.",
                    nativeUsage: "Automotive Tier-1 suppliers must maintain accounting systems capable of segregating Net Cost for annual USMCA audits."
                },
                {
                    term: "Non-Originating Materials (VNM)",
                    ipa: "/nɑːn əˈrɪdʒ.əˌneɪ.tɪŋ məˈtɪr.i.əlz/",
                    es: "Valor de Materiales No Originarios (VNM)",
                    category: "Cumplimiento T-MEC",
                    definition: "The value of materials, components, or sub-assemblies imported from outside the USMCA free-trade zone (e.g., from China, Germany, or Japan) used in the production of a finished good.",
                    collocations: ["deduct VNM", "VNM customs value", "track non-originating bill of materials"],
                    falseFriends: "Cualquier componente que carezca de un certificado de origen válido firmado debe clasificarse legalmente como VNM.",
                    nativeUsage: "Customs auditors penalized the importer because imported electronic sensors were treated as originating without vendor proof."
                },
                {
                    term: "Labor Value Content (LVC)",
                    ipa: "/ˈleɪ.bɚ ˈvæl.juː ˈkɑːn.tɛnt/",
                    es: "Contenido de Valor Laboral (CVL del T-MEC)",
                    category: "Regulación Automotriz T-MEC",
                    definition: "A revolutionary USMCA automotive rule requiring that 40% to 45% of passenger vehicle content be manufactured by facilities paying production workers at least $16 USD per hour.",
                    collocations: ["meet LVC requirements", "$16 dollar hourly wage threshold", "LVC audit certification"],
                    falseFriends: "Diseñado específicamente para equilibrar la competitividad salarial entre México, Estados Unidos y Canadá.",
                    nativeUsage: "Automakers balanced high-wage R&D and US powertrain assembly to meet the 40% Labor Value Content mandate."
                },
                {
                    term: "Certificate of Origin",
                    ipa: "/sɚˈtɪf.ə.kət əv ˈɔːr.ə.dʒɪn/",
                    es: "Certificación de Origen (Declaración Jurada T-MEC)",
                    category: "Documentación Aduanera",
                    definition: "The formal legal declaration (containing nine required minimum data elements under USMCA Chapter 5) certifying that goods qualify for preferential duty-free treatment.",
                    collocations: ["issue USMCA certificate of origin", "origin verification audit", "electronic origin statement"],
                    falseFriends: "Bajo el T-MEC ya no existe un formato impreso oficial del gobierno (como el antiguo formato TLCAN); puede emitirse en cualquier documento comercial (factura) con los 9 datos mínimos.",
                    nativeUsage: "The customs manager signed the USMCA Certificate of Origin under penalty of perjury."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "USMCA Automotive RVC Threshold",
                    botQuestion: "Under the USMCA / T-MEC rules of origin for passenger vehicles and core automotive parts (engines, transmissions, suspension), what is the mandatory minimum Regional Value Content (RVC) percentage required under the Net Cost method?",
                    requiredKeywords: ["75", "75%", "seventy-five"],
                    minKeywords: 1,
                    feedbackSuccess: "Exact! The USMCA elevated the automotive core parts and vehicle RVC threshold to 75% under the Net Cost method, up from the old NAFTA 62.5% requirement.",
                    feedbackRetry: "It is a percentage between 70% and 80%. Remember the strict tightening of automotive rules under T-MEC."
                },
                {
                    step: 2,
                    concept: "Labor Value Content (LVC) Wage Rate",
                    botQuestion: "What is the minimum hourly production wage mandated by the USMCA Labor Value Content (LVC) rule for the 40% to 45% high-wage manufacturing portion of vehicles?",
                    requiredKeywords: ["16", "$16", "sixteen"],
                    minKeywords: 1,
                    feedbackSuccess: "Spot on! The USMCA Labor Value Content (LVC) mandates an hourly production wage of at least $16 USD to qualify vehicles for preferential duty-free access.",
                    feedbackRetry: "Think of the landmark wage rate: it is a specific dollar figure starting with 16."
                }
            ],
            quiz: [
                {
                    q: "What is a 'Tariff Shift' (Change in Tariff Classification) under USMCA rules of origin?",
                    options: [
                        "A rule requiring non-originating imported raw materials to undergo substantial manufacturing transformation resulting in a change in HS tariff heading or subheading",
                        "Moving a manufacturing plant from one country to another overnight",
                        "Switching banks when paying foreign currency invoices",
                        "Changing the currency symbol on a commercial invoice"
                    ],
                    answer: 0
                },
                {
                    q: "Under the USMCA Net Cost method, which corporate expenses are legally excluded from the calculation of Net Cost?",
                    options: [
                        "Sales promotion, marketing, royalties, and non-allowable interest costs",
                        "Direct cleanroom assembly labor wages",
                        "Raw steel, resin, and copper material purchases",
                        "Factory electricity and machinery maintenance"
                    ],
                    answer: 0
                },
                {
                    q: "Under modern USMCA origin procedures, is an official government-printed Certificate of Origin form still required?",
                    options: [
                        "No; the certification can be placed on an invoice or any commercial document as long as it contains the 9 required minimum data elements",
                        "Yes; a paper form stamped by the United Nations is mandatory for every box",
                        "Yes; it must be handwritten in green calligraphy ink",
                        "Certificates of origin were completely abolished and are no longer used"
                    ],
                    answer: 0
                },
                {
                    q: "What is the steel and aluminum purchasing requirement for passenger vehicle manufacturers under USMCA?",
                    options: [
                        "At least 70% of corporate steel and aluminum purchases must be melted and poured in North America",
                        "100% of steel must be imported from South America",
                        "Automakers are prohibited from using aluminum in vehicle frames",
                        "Steel purchases must be reviewed annually by the World Health Organization"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "log-m3",
            title: "IMMEX Maquiladora Regimes, Anexo 24/31 & Temporary Import Inventories",
            titleES: "Régimen Maquilador IMMEX, Anexo 24/31 y Control de Inventarios de Importación Temporal",
            icon: "fa-solid fa-boxes-stacked",
            isGoldModel: true,
            readings: [
                {
                    id: "log-m3-r1",
                    title: "The IMMEX Decree: Duty-Free Temporary Imports for Export Manufacturing",
                    duration: "15 min",
                    content: `> **Mexican Foreign Trade Legislation**: Governed by the **Decreto para el Fomento de la Industria Manufacturera, Maquiladora y de Servicios de Exportación (IMMEX)** and the **Mexican Customs Law (Ley Aduanera, Art. 106 & 108)**.

# IMMEX Maquiladora Regimes & Inventory Audits

### 1. What is the IMMEX Program?
The **IMMEX** program is the cornerstone of Mexico's $500+ billion USD manufacturing export economy. It allows authorized manufacturing plants (maquiladoras) to **temporarily import raw materials, components, packaging, and production machinery without paying General Import Tax (IGI / Tariffs) or Value Added Tax (16% IVA)**, under the strict legal condition that the finished goods are subsequently exported within statutory deadlines.

Key operational characteristics:
- **Temporary Import Timeframes (Article 108)**: Raw materials and components can remain temporarily in Mexico for up to **18 months** (or up to 36 months for companies holding VAT/IEPS Certification). Production machinery and tooling can remain for the duration of the IMMEX program.
- **Mandatory Return or Transformation**: Every kilogram of imported steel, resin, or microchips must be accounted for as exported finished product, lawful scrap, or destruction witnessed by tax authorities.
- **Diversion Penalty**: Selling temporarily imported raw materials into the Mexican domestic market without executing a formal customs change of regime (pedimento de cambio de régimen F4) constitutes criminal customs fraud (contraband).`
                },
                {
                    id: "log-m3-r2",
                    title: "Anexo 24 Automated Inventory Control vs Anexo 31 VAT/IEPS Credit System",
                    duration: "13 min",
                    content: `> **SAT Tax Compliance Standard**: Governed by the **Reglas Generales de Comercio Exterior (RGCE - Anexo 24 and Anexo 31)**.

### 1. Anexo 24: Automated Inventory Control System
Mexican Customs Law mandates that every IMMEX company operate an automated **Anexo 24 inventory software system** interfacing directly with plant ERP (SAP, Oracle, Epicor):
- **First-In, First-Out (FIFO / PEPS)**: Systematically matches imported raw materials (registered under entry pedimentos **IN**) against exported finished goods (registered under exit pedimentos **RT**).
- **Bill of Materials (BOM / Descargos)**: When a finished medical catheter or automotive alternator is exported, the system automatically *discharges* (descarga) the proportional components from the oldest open temporary import pedimento.

### 2. Anexo 31: The SCCCyG VAT Credit and Guarantee System
In 2014, Mexico amended its tax laws to apply 16% Value Added Tax (IVA) to all temporary imports unless certified:
- **VAT/IEPS Certification (A, AA, AAA)**: Companies demonstrating pristine tax compliance obtain a $100\\%$ fiscal credit on IVA at the customs border.
- **Anexo 31 Integration**: The SAT maintains a centralized electronic ledger (SCCCyG). Every time goods enter under an **IN** pedimento, the virtual VAT credit is debited. When the company transmits proof of export within 18 months, the credit balance is discharged. Failure to balance Anexo 31 results in immediate cancellation of the VAT certification and massive tax liability.`
                }
            ],
            dialogue: [
                {
                    role: "Auditor Fernando Garza (SAT Foreign Trade Audit Supervisor)",
                    content: "Licenciada Treviño, we are conducting a structural electronic audit of your plant's Anexo 24 inventory system and Anexo 31 credit balance for the third quarter. Our cross-check shows an unresolved balance of 180 metric tons of copper magnet wire imported under pedimentos from fourteen months ago.",
                    translation: "Licenciada Treviño, estamos realizando una auditoría electrónica estructural del sistema de inventarios Anexo 24 de su planta y el saldo de crédito del Anexo 31 para el tercer trimestre. Nuestro cruce de información muestra un saldo no descargado de 180 toneladas métricas de alambre magneto de cobre importado bajo pedimentos de hace catorce meses.",
                    pedagogicalNotes: "Target terms: structural electronic audit, Anexo 24 inventory system, Anexo 31 credit balance, unresolved balance, copper magnet wire"
                },
                {
                    role: "Lic. Patricia Treviño (Customs & IMMEX Compliance Manager, Querétaro)",
                    content: "Good morning, Auditor Garza. That copper wire was consumed in the production of automotive starter solenoids exported to Ohio last month. The descargo delay occurred because our engineering team recently updated the parent part number in SAP following an ECO, causing a temporary synchronization gap in our automated Anexo 24 interface.",
                    translation: "Buenos días, Auditor Garza. Ese alambre de cobre se consumió en la producción de solenoides de arranque automotrices exportados a Ohio el mes pasado. La demora en el descargo ocurrió porque nuestro equipo de ingeniería actualizó recientemente el número de parte padre en SAP tras un ECO, provocando una brecha temporal de sincronización en nuestra interfaz automatizada de Anexo 24.",
                    pedagogicalNotes: "Target terms: automotive starter solenoids, descargo delay, parent part number, ECO, synchronization gap, Anexo 24 interface"
                },
                {
                    role: "Auditor Fernando Garza (SAT Foreign Trade Audit Supervisor)",
                    content: "Can you provide the bill of materials explosion matching the exported RT pedimentos to the original IN entry pedimentos to verify that the 18-month statutory temporary import window was not exceeded?",
                    translation: "¿Podría proporcionar la explosión de lista de materiales que coteje los pedimentos de exportación RT con los pedimentos de entrada IN originales para verificar que no se haya excedido el plazo legal de importación temporal de 18 meses?",
                    pedagogicalNotes: "Target terms: bill of materials explosion, RT export pedimentos, IN entry pedimentos, 18-month statutory window"
                },
                {
                    role: "Lic. Patricia Treviño (Customs & IMMEX Compliance Manager, Querétaro)",
                    content: "Certainly. Here is the validated FIFO discharge report. As you can see, all 180 tons were fully incorporated into finished solenoids exported under valid RT pedimentos within month 15, well within our authorized timeframe. Our Anexo 31 transmission was reconciled this morning.",
                    translation: "Por supuesto. Aquí tiene el reporte de descargo PEPS (FIFO) validado. Como puede observar, las 180 toneladas se incorporaron completamente en solenoides terminados exportados bajo pedimentos RT válidos dentro del mes 15, muy dentro de nuestro plazo autorizado. Nuestra transmisión de Anexo 31 fue conciliada esta mañana.",
                    pedagogicalNotes: "Target terms: FIFO discharge report, RT pedimentos, authorized timeframe, Anexo 31 transmission reconciled"
                }
            ],
            lexiconMatrix: [
                {
                    term: "IMMEX Program",
                    ipa: "/ˈɪm.ɛks ˈproʊ.ɡræm/",
                    es: "Programa IMMEX (Régimen de Maquila y Exportación)",
                    category: "Régimen Aduanero",
                    definition: "A Mexican federal foreign trade program that allows manufacturing companies to temporarily import raw materials, components, and machinery duty-free and VAT-free on the condition that finished goods are exported.",
                    collocations: ["hold an active IMMEX decree", "IMMEX authorized facility", "comply with IMMEX obligations"],
                    falseFriends: "Las materias primas importadas bajo IMMEX no son propiedad definitiva; están bajo régimen fiscal temporal con obligación legal de retorno o cambio de régimen.",
                    nativeUsage: "The electronics assembly plant operates under an IMMEX manufacturing modality to import surface-mount components duty-free."
                },
                {
                    term: "Anexo 24",
                    ipa: "/əˈnɛk.soʊ ˈtwɛn.ti fɔːr/",
                    es: "Anexo 24 (Sistema Automatizado de Control de Inventarios)",
                    category: "Software Aduanero SAT",
                    definition: "The mandatory automated inventory control software required by Mexican Customs Law that tracks temporary imports, BOM explosions, and export discharges on a FIFO basis.",
                    collocations: ["Anexo 24 software audit", "Anexo 24 discharge gap", "synchronize ERP with Anexo 24"],
                    falseFriends: "No es una simple hoja de Excel; debe ser un software especializado auditado por el SAT que impida inconsistencias arancelarias.",
                    nativeUsage: "The customs team reconciled Anexo 24 records with plant SAP production orders to prepare for the annual tax audit."
                },
                {
                    term: "Anexo 31 (SCCCyG)",
                    ipa: "/əˈnɛk.soʊ ˈθɜːr.ti wʌn/",
                    es: "Anexo 31 (Sistema de Control de Cuentas de Créditos y Garantías)",
                    category: "Control Fiscal SAT",
                    definition: "The electronic tax ledger operated by SAT that monitors virtual VAT credits granted to IMMEX companies with VAT/IEPS Certification, matching temporary import debits against export discharges.",
                    collocations: ["Anexo 31 credit balance", "reconcile Anexo 31 transmissions", "Anexo 31 expired inventory warning"],
                    falseFriends: "Si el inventario temporal supera el plazo legal sin descargarse en Anexo 31, el crédito fiscal de IVA se revoca y se exige el pago del 16% con recargos.",
                    nativeUsage: "Failure to transmit export pedimento data to Anexo 31 triggered an automatic audit inquiry from SAT."
                },
                {
                    term: "Descargo (Discharge of Inventory)",
                    ipa: "/dɛsˈkɑːr.ɡoʊ/",
                    es: "Descargo aduanero de inventario de importación temporal",
                    category: "Operaciones Aduaneras",
                    definition: "The electronic deduction and matching of imported raw materials from the oldest open temporary import pedimento based on the bill of materials (BOM) of exported finished goods.",
                    collocations: ["execute monthly descargos", "descargo error in Anexo 24", "BOM descargo ratio"],
                    falseFriends: "Descargo no significa 'descargar archivos de internet' (download); es la baja fiscal y contable de insumos temporales al salir del país.",
                    nativeUsage: "Exporting 5,000 surgical trocars automatically discharged 250 kilograms of stainless steel tubing in Anexo 24."
                },
                {
                    term: "Pedimento IN vs RT",
                    ipa: "/pə.dɪˈmɛn.toʊ aɪ.ɛn / ɑːr.tiː/",
                    es: "Claves de Pedimento IN (Entrada Temporal) y RT (Retorno de Exportación)",
                    category: "Claves de Comercio Exterior",
                    definition: "Official Mexican customs declaration codes; IN designates temporary raw material import by an IMMEX facility, and RT designates the return/export of finished products or transformed goods.",
                    collocations: ["file pedimento IN", "match RT to IN", "pedimento key classification"],
                    falseFriends: "Son códigos fiscales oficiales del Anexo 22 que determinan la legalidad del régimen aduanero.",
                    nativeUsage: "The customs broker verified that every resin lot entered under an IN pedimento was matched to an RT export pedimento."
                },
                {
                    term: "VAT/IEPS Certification (Certificación de IVA)",
                    ipa: "/viː.eɪ.tiː ˌsɚ.tə.fəˈkeɪ.ʃən/",
                    es: "Certificación en Materia de IVA e IEPS (Rubros A, AA, AAA)",
                    category: "Beneficio Fiscal",
                    definition: "A certification granted by SAT to compliant IMMEX manufacturers providing a 100% tax credit on the 16% VAT assessed at the border on temporary imports.",
                    collocations: ["obtain AAA VAT certification", "renew VAT certification", "VAT credit balance"],
                    falseFriends: "Sin esta certificación, una maquiladora debe desembolsar el 16% de IVA en efectivo en cada cruce aduanal fronterizo.",
                    nativeUsage: "Maintaining AAA VAT Certification saves our Tijuana manufacturing plant millions of dollars in monthly cash flow."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "IMMEX Temporary Import Purpose",
                    botQuestion: "What is the primary economic and fiscal benefit of the IMMEX program for manufacturing maquiladoras in Mexico when importing raw materials?",
                    requiredKeywords: ["duty", "tariff", "vat", "iva", "tax", "free", "temporary"],
                    minKeywords: 2,
                    feedbackSuccess: "Exact! The IMMEX program allows manufacturing plants to import raw materials, parts, and tooling free of general import duties (IGI) and 16% VAT, provided they are transformed and exported.",
                    feedbackRetry: "Think about taxes: what two major taxes (import tariffs and consumption tax) are exempted on temporary imports?"
                },
                {
                    step: 2,
                    concept: "Anexo 24 Inventory Method",
                    botQuestion: "Under Mexican Customs Law, what automated inventory accounting method must Anexo 24 systems use when discharging imported raw materials against exported finished goods?",
                    requiredKeywords: ["fifo", "peps", "first in", "first out"],
                    minKeywords: 1,
                    feedbackSuccess: "Spot on! Anexo 24 mandates the FIFO (First-In, First-Out / PEPS) method to ensure that raw materials from the oldest open temporary import pedimentos are discharged first.",
                    feedbackRetry: "Remember the universal accounting acronym for using the oldest inventory first: F-I-F-O."
                }
            ],
            quiz: [
                {
                    q: "Under the IMMEX program, what legal obligation is incurred when importing raw materials under pedimento clave 'IN'?",
                    options: [
                        "The raw materials must be transformed, incorporated into finished goods, and exported within statutory deadlines (typically 18 to 36 months)",
                        "The raw materials must be sold immediately in the local Mexican retail market",
                        "The raw materials must be donated to local universities within 30 days",
                        "The parts can remain permanently in Mexico without ever being tracked"
                    ],
                    answer: 0
                },
                {
                    q: "What is the primary function of an Anexo 24 software system in a Mexican manufacturing plant?",
                    options: [
                        "Automated customs inventory control tracking temporary imports, BOM component explosions, and export discharges on a FIFO basis",
                        "Designing 3D CAD mechanical drawings for surgical instruments",
                        "Calculating weekly employee payroll and overtime hours",
                        "Monitoring factory air conditioning temperature"
                    ],
                    answer: 0
                },
                {
                    q: "What happens under Anexo 31 if an IMMEX company fails to prove that temporarily imported raw materials were exported before the statutory deadline expires?",
                    options: [
                        "The virtual 16% VAT credit is canceled, and the company must pay the full VAT plus inflation adjustments, surcharges, and penalties",
                        "The SAT congratulates the company for storing inventory",
                        "The raw materials are automatically gifted to the plant manager",
                        "Nothing; temporary imports have zero deadlines under Mexican law"
                    ],
                    answer: 0
                },
                {
                    q: "What Mexican customs pedimento clave is used to formally return and export finished goods transformed by an IMMEX facility?",
                    options: [
                        "Pedimento RT",
                        "Pedimento A1 (Definitive Import)",
                        "Pedimento V1 (Virtual Transfer)",
                        "Pedimento K1"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "log-m4",
            title: "Customs Brokerage, HTS Tariff Classification & Pedimento Audits",
            titleES: "Agencia Aduanal, Clasificación Arancelaria HTS y Auditoría de Pedimentos",
            icon: "fa-solid fa-file-invoice-dollar",
            isGoldModel: true,
            readings: [
                {
                    id: "log-m4-r1",
                    title: "The Harmonized Tariff Schedule (HTS): 6-Digit Global Baseline to 10-Digit National Codes",
                    duration: "15 min",
                    content: `> **Customs Classification Standard**: Governed by the **World Customs Organization (WCO) Harmonized Commodity Description and Coding System (HS)** and national tariff schedules (**HTSUS in USA / TIGIE & NICO in Mexico**).

# Customs Brokerage & Tariff Classification

### 1. The Structure of the Harmonized System (HS)
Every physical object traded across international borders—from a tiny surface-mount resistor to a 50-ton hydraulic press—must be assigned an official **Harmonized Tariff Schedule (HTS)** code.

The structure is hierarchical and internationally harmonized across over 200 countries up to the first **6 digits**:
$$\\underbrace{87}_{\\text{Chapter}} \\; \\underbrace{08}_{\\text{Heading}} \\; \\underbrace{29}_{\\text{Subheading}} \\; \\underbrace{90}_{\\text{Tariff Item (National)}} \\; \\underbrace{02}_{\\text{Statistical Suffix / NICO}}$$

- **Chapter (2 digits)**: Broad industrial category (e.g., Chapter 85: Electrical machinery, Chapter 87: Vehicles and parts).
- **Heading (4 digits)**: Specific product grouping within the chapter (e.g., 8708: Parts and accessories of motor vehicles).
- **Subheading (6 digits)**: International standardized definition.
- **National Tariff Code & Statistical Suffix (8 to 10 digits)**: Country-specific subdivisions defining exact duty rates, non-tariff regulations, and trade statistics (e.g., the 10-digit **HTSUS** in the US, or the 8-digit **Fracción Arancelaria + 2-digit NICO** in Mexico).

### 2. General Rules for the Interpretation (GRI) of the Harmonized System
Classifying complex engineering products is a legal science governed strictly by the **General Rules of Interpretation (GRI 1 through 6)**:
- **GRI 1**: Classification is determined first by the terms of the headings and relative section or chapter notes.
- **GRI 2(a)**: Incomplete or unfinished articles having the essential character of the complete good (e.g., an unpainted car chassis without engine is still classified as a motor vehicle).
- **GRI 3(b)**: Mixtures, composite goods, and goods put up in sets for retail sale are classified according to the material or component that gives them their **Essential Character**.`
                },
                {
                    id: "log-m4-r2",
                    title: "The Mexican Pedimento Aduanal & The 10-Year Post-Clearance Audit Window",
                    duration: "13 min",
                    content: `> **Mexican Tax Legislation**: Governed by the **Ley Aduanera (Articles 36, 43, 81) & Código Fiscal de la Federación (CFF, Art. 67)**.

### 1. The Pedimento Aduanal: Legal Identity of Cross-Border Goods
The **Pedimento Aduanal** is the official tax declaration document submitted to Mexican Customs (ANAM / SAT) by a licensed Customs Broker (**Agente Aduanal**) on behalf of the importer or exporter. It establishes:
- Legal entry or exit of goods into the national territory.
- Declared commercial and customs value (Valor en Aduana).
- Origin and supplier tax details.
- Exact breakdown of assessed duties and taxes: General Import Tax (IGI), Customs Processing Fee (DTA - Derecho de Trámite Aduanero), and Value Added Tax (IVA).

### 2. Post-Clearance Audits & Glosa Data Synchronization
Clearing goods through the customs port green light (desaduanamiento libre) **does not mean** the shipment was deemed compliant forever:
- **Article 67 (CFF)**: Mexican tax authorities (SAT) have a statutory **5-year audit window** (extendable to **10 years** if inventory accounting irregularities exist) to review pedimentos, commercial invoices, and tariff classifications.
- **Data Stage (Glosa SAT)**: Importers must download monthly electronic Glosa datalogs from SAT to audit and verify that their internal ERP matches customs broker pedimento declarations down to the cent.`
                }
            ],
            dialogue: [
                {
                    role: "Specialist William Thorne (Senior US Customs Broker, Laredo, Texas)",
                    content: "Eduardo, good afternoon. We are preparing the US customs entry summary for your daily convoy of five tractor-trailers carrying automotive electronic throttle bodies from Saltillo into Laredo. In box 33, what is your verified 10-digit HTSUS classification?",
                    translation: "Eduardo, buenas tardes. Estamos preparando el resumen de entrada de aduanas de EE.UU. para su convoy diario de cinco tractocamiones que transportan cuerpos de aceleración electrónicos automotrices de Saltillo hacia Laredo. En la casilla 33, ¿cuál es su clasificación arancelaria HTSUS verificada de 10 dígitos?",
                    pedagogicalNotes: "Target terms: entry summary, tractor-trailers, electronic throttle bodies, 10-digit HTSUS classification"
                },
                {
                    role: "Lic. Eduardo Cantú (Foreign Trade Specialist, Saltillo)",
                    content: "Good afternoon, William. We classified the throttle bodies under HTSUS 8409.91.5085 as parts suitable for use solely or principally with spark-ignition internal combustion piston engines, carrying a 0% duty rate under our USMCA origin certification.",
                    translation: "Buenas tardes, William. Clasificamos los cuerpos de aceleración bajo el HTSUS 8409.91.5085 como partes adecuadas para su uso exclusiva o principalmente con motores de émbolo de encendido por chispa, con una tasa de arancel del 0% bajo nuestra certificación de origen T-MEC.",
                    pedagogicalNotes: "Target terms: HTSUS 8409.91.5085, spark-ignition internal combustion engines, 0% duty rate, USMCA origin certification"
                },
                {
                    role: "Specialist William Thorne (Senior US Customs Broker, Laredo, Texas)",
                    content: "Understood. The entry also includes an integrated stepper actuator motor. Did your legal team confirm this doesn't shift the classification to electrical machinery under heading 8501?",
                    translation: "Entendido. La entrada también incluye un motor actuador a pasos integrado. ¿Confirmó su equipo legal que esto no cambia la clasificación a maquinaria eléctrica bajo la partida 8501?",
                    pedagogicalNotes: "Target terms: integrated stepper actuator motor, heading 8501"
                },
                {
                    role: "Lic. Eduardo Cantú (Foreign Trade Specialist, Saltillo)",
                    content: "Yes, our trade compliance attorneys reviewed General Interpretative Rule 3(b). The mechanical throttle valve constitutes the essential character of the assembly, so heading 8409 takes legal precedence over the auxiliary electrical actuator. We have the binding classification ruling on file.",
                    translation: "Sí, nuestros abogados de cumplimiento comercial revisaron la Regla General Interpretativa 3(b). La válvula de mariposa mecánica constituye el carácter esencial del ensamble, por lo que la partida 8409 tiene precedencia legal sobre el actuador eléctrico auxiliar. Tenemos la resolución arancelaria vinculante en expediente.",
                    pedagogicalNotes: "Target terms: General Interpretative Rule 3(b), essential character, legal precedence, binding classification ruling"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Harmonized Tariff Schedule (HTS)",
                    ipa: "/ˈhɑːr.mə.naɪzd ˈtær.ɪf ˈskɛdʒ.uːl/",
                    es: "Sistema Armonizado de Designación y Codificación de Mercancías (HTS)",
                    category: "Clasificación Arancelaria",
                    definition: "The standardized numerical coding system developed by the World Customs Organization (WCO) used by customs authorities worldwide to classify goods for customs duties, taxes, and trade statistics.",
                    collocations: ["6-digit HTS code", "10-digit national HTSUS code", "tariff classification dispute"],
                    falseFriends: "Los primeros 6 dígitos son idénticos en todo el mundo; los dígitos 7 al 10 varían según la legislación de cada país.",
                    nativeUsage: "The trade compliance manager audited the master product database to verify the accuracy of all 10-digit HTS codes."
                },
                {
                    term: "Pedimento Aduanal",
                    ipa: "/pə.dɪˈmɛn.toʊ ˌæd.wəˈnɑːl/",
                    es: "Pedimento Aduanal (Declaración Fiscal de Entrada/Salida de Mercancías)",
                    category: "Derecho Aduanero Mexicano",
                    definition: "The official tax and customs declaration required in Mexico by the Tax Administration Service (SAT) proving the legal import, export, and transit of merchandise.",
                    collocations: ["file pedimento with SAT", "pedimento validation error", "audit pedimento history"],
                    falseFriends: "No es una simple orden de compra o factura; es un documento fiscal oficial que ampara la legal estancia de bienes en México.",
                    nativeUsage: "The factory maintained scanned copies of all pedimento declarations for ten years to satisfy customs audits."
                },
                {
                    term: "Agente Aduanal (Customs Broker)",
                    ipa: "/ˈkʌs.təmz ˈbroʊ.kɚ/",
                    es: "Agente Aduanal (Representante Legal Autorizado ante Aduana)",
                    category: "Intermediación Aduanera",
                    definition: "A private individual licensed by the federal government authorized to handle the clearance of goods on behalf of importers and exporters through customs ports of entry.",
                    collocations: ["licensed customs broker", "brokerage fee", "power of attorney for customs broker"],
                    falseFriends: "El agente aduanal es corresponsable solidario ante la ley fiscal si se declara una fracción arancelaria incorrecta o un valor subvaluado.",
                    nativeUsage: "Our customs broker transmitted the electronic pedimento to the customs validation system at the Laredo bridge."
                },
                {
                    term: "Essential Character (GRI 3b)",
                    ipa: "/ɪˈsɛn.ʃəl ˈkær.ɪk.tɚ/",
                    es: "Carácter Esencial (Regla General Interpretativa 3b)",
                    category: "Criterio de Clasificación",
                    definition: "The core principle under customs law stating that composite goods or sets consisting of different materials are classified based on the component that determines its primary function or value.",
                    collocations: ["determine essential character", "GRI 3(b) analysis", "predominant material character"],
                    falseFriends: "No se basa únicamente en el peso o el costo, sino en la función técnica que define la utilidad del producto final.",
                    nativeUsage: "Under GRI 3(b), the custom surgical kit was classified under the primary scalpel heading because it provided the essential character."
                },
                {
                    term: "Glosa SAT (Data Stage)",
                    ipa: "/ˈɡloʊ.sə ɛs.eɪ.tiː/",
                    es: "Glosa de Comercio Exterior (Data Stage del SAT)",
                    category: "Auditoría Fiscal",
                    definition: "The official electronic customs database extract provided by the Mexican tax authority detailing every transaction, pedimento, tax calculation, and fraction cleared under a company's tax ID.",
                    collocations: ["download monthly Glosa data", "Glosa reconciliation", "discrepancy between ERP and Glosa"],
                    falseFriends: "Es la fuente de verdad definitiva del gobierno fiscal; cualquier discrepancia con el ERP interno de la planta genera multas.",
                    nativeUsage: "The internal audit team performed a line-by-line reconciliation of the company's SAP records against the official Glosa SAT files."
                },
                {
                    term: "Binding Ruling",
                    ipa: "/ˈbaɪn.dɪŋ ˈruː.lɪŋ/",
                    es: "Resolución Arancelaria Vinculante (Criterio Oficial de Clasificación)",
                    category: "Certeza Jurídica",
                    definition: "An official written decision issued by customs authorities (e.g., CBP or SAT) establishing the definitive legal tariff classification, country of origin, or valuation for a specific product.",
                    collocations: ["request a binding ruling", "CBP binding ruling letter", "present binding ruling to customs auditor"],
                    falseFriends: "Protege legalmente a la empresa contra multas y re-clasificaciones retroactivas en caso de discrepancia en aduana.",
                    nativeUsage: "We submitted a formal request for a CBP binding ruling to guarantee our new medical biosensor enters at a 0% tariff rate."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Harmonized System Digit Standardization",
                    botQuestion: "In the Harmonized Tariff Schedule (HTS), up to how many digits is the product code internationally standardized across all World Customs Organization (WCO) member countries?",
                    requiredKeywords: ["6", "six"],
                    minKeywords: 1,
                    feedbackSuccess: "Exact! The first 6 digits of any HTS code (Chapter, Heading, and Subheading) are standardized globally across all member countries of the World Customs Organization.",
                    feedbackRetry: "Remember the hierarchy: Chapter is 2, Heading is 4, and the international standard sub-heading stops at how many digits?"
                },
                {
                    step: 2,
                    concept: "Essential Character (GRI 3b)",
                    botQuestion: "When classifying a composite good made of both plastic and precision electronic microchips where no single heading covers the whole item, what customs legal rule determines classification based on the component giving the item its primary utility?",
                    requiredKeywords: ["essential character", "gri 3", "gri 3b", "rule 3"],
                    minKeywords: 1,
                    feedbackSuccess: "Spot on! General Rule of Interpretation 3(b) mandates that composite goods be classified according to the material or component that imparts their 'Essential Character'.",
                    feedbackRetry: "Think of the term starting with 'Essential...' which defines what makes the product truly function."
                }
            ],
            quiz: [
                {
                    q: "What portion of an HTS tariff classification code is standardized globally across all World Customs Organization member nations?",
                    options: [
                        "The first 6 digits (Chapter, Heading, and Subheading)",
                        "All 10 digits exactly",
                        "Only the first 2 digits (Chapter only)",
                        "None; every country invents completely unrelated numbers"
                    ],
                    answer: 0
                },
                {
                    q: "What is a 'Pedimento Aduanal' under Mexican customs and tax law?",
                    options: [
                        "The official fiscal and legal customs declaration submitted by a licensed customs broker proving the lawful import or export of merchandise",
                        "A casual receipt issued by a toll booth operator on a highway",
                        "A temporary visa issued to international tourists visiting Mexico",
                        "A certificate of good conduct issued by local police"
                    ],
                    answer: 0
                },
                {
                    q: "Under General Rule of Interpretation 3(b) (GRI 3b), how are multi-component or composite goods legally classified?",
                    options: [
                        "According to the component or material that gives the assembly its Essential Character",
                        "By taking an average of all the prices in the assembly",
                        "By classifying under whichever heading has the highest import tax rate",
                        "By letting the truck driver pick their favorite number at the border"
                    ],
                    answer: 0
                },
                {
                    q: "Why do multinational companies request a formal 'Binding Ruling' from customs agencies like CBP or SAT?",
                    options: [
                        "To obtain an official, legally binding determination of tariff classification that protects the company against retrospective audits and penalties",
                        "To legally avoid paying corporate income taxes forever",
                        "To exempt their factory from fire and occupational safety inspections",
                        "To speed up the speed limit of their delivery trucks"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "log-m5",
            title: "Supply Chain Security: C-TPAT 17-Point Inspections, FAST Lanes & OEA",
            titleES: "Seguridad en la Cadena de Suministro: Inspección de 17 Puntos C-TPAT, Carriles FAST y OEA",
            icon: "fa-solid fa-shield-halved",
            isGoldModel: true,
            readings: [
                {
                    id: "log-m5-r1",
                    title: "C-TPAT & OEA Framework: Mitigating Contraband, Narcotics & Cargo Theft",
                    duration: "15 min",
                    content: `> **Supply Chain Security Standard**: Governed by the **Customs-Trade Partnership Against Terrorism (C-TPAT / US CBP)**, **Operador Económico Autorizado (OEA / SAT Mexico)**, and the **WCO SAFE Framework of Standards**.

# Supply Chain Security: C-TPAT & FAST Lanes

### 1. The Real Threat in Cross-Border Logistics
The US-Mexico border is the busiest commercial land crossing in the world, with over 15,000 tractor-trailers crossing daily through Laredo, Texas alone. Organized transnational crime syndicates constantly target legitimate manufacturing supply chains to smuggle narcotics, weapons, contraband, or unauthorized migrants.

A single tractor-trailer from an automotive or medical maquiladora found contaminated with contraband at the international bridge triggers catastrophic consequences:
- Immediate seizure of the commercial tractor and trailer.
- Indefinite shutdown and suspension of the manufacturing plant's expedited customs access.
- Millions of dollars in customer line-down penalties and criminal federal investigations.

### 2. C-TPAT & OEA Certification
To secure cargo, US Customs and Border Protection created **C-TPAT (Customs-Trade Partnership Against Terrorism)**, harmonized with Mexico's **OEA (Operador Económico Autorizado)**:
- Companies undergo rigorous physical security audits of their plant perimeter, CCTV surveillance, badge access control, cybersecurity, and carrier background vetting.
- **The Core Benefit**: Certified companies receive **drastically reduced inspection rates** (up to 80% fewer intrusive border holds) and access to **FAST (Free and Secure Trade) dedicated expedited bridge lanes**, cutting border crossing transit from 8 hours down to 30 minutes.`
                },
                {
                    id: "log-m5-r2",
                    title: "The Mandatory 17-Point Tractor & Trailer Inspection & High-Security ISO 17712 Bolt Seals",
                    duration: "13 min",
                    content: `> **Operational Security Protocol**: Aligned with **C-TPAT Minimum Security Criteria (MSC Section 3.2 - Conveyance and Container Security)**.

### 1. The 17-Point Truck & Trailer Physical Inspection
Before any commercial trailer departs a Mexican manufacturing plant bound for the international border, trained security guards and drivers must execute and document a **17-Point Physical Inspection**:

1. **Bumper & Engine Compartment**: Checking for false compartments inside air intake filters and behind the radiator grill.
2. **Engine / Transmission / Steering**: Inspecting wheel wells, brake drums, and axle housings.
3. **Fifth Wheel / Tractor Frame**: Checking between the chassis frame rails and drive axles.
4. **Fuel Tanks**: Tapping fuel tanks to detect acoustic hollow changes indicating hidden compartments.
5. **Cab & Sleeper Compartment**: Inspecting under bunk mattresses, headliners, and interior dashboard panels.
6. **Outside / Undercarriage of Trailer**: Scanning air brake reservoirs, tire spare carriers, and refrigerated unit reefer housings.
7. **Floor / Interior Walls / Ceiling**: Measuring interior vs exterior trailer dimensions using laser tape measures to detect **false front walls**.
8. **Exterior Doors & Locking Rods**: Verifying door hinges and rivet welds have not been tampered with or replaced with hollow screws.

### 2. High-Security ISO 17712 Bolt Seals & The VVTT Protocol
Once loaded, the trailer must be locked using a certified **ISO 17712 High-Security Bolt Seal** applying the mandatory **VVTT Protocol**:
- **View**: Visually inspect the seal and locking mechanism for signs of pre-tampering.
- **Verify**: Verify that the engraved serialized number on the seal matches the Bill of Lading, invoice, and gate pass verbatim.
- **Tug**: Firmly pull and tug the seal by hand to ensure it is locked into place.
- **Twist**: Twist and turn the bolt to ensure it cannot be unscrewed or popped open.`
                }
            ],
            dialogue: [
                {
                    role: "Specialist James Becker (C-TPAT Supply Chain Security Specialist, San Diego)",
                    content: "Captain Ramos, we are conducting a C-TPAT re-validation audit of your shipping dock and outbound staging yard in Tijuana. I want to observe a security guard performing the mandatory 17-point container inspection on an outbound trailer destined for the Otay Mesa commercial port.",
                    translation: "Capitán Ramos, estamos realizando una auditoría de revalidación de C-TPAT de su muelle de embarque y patio de maniobras de salida en Tijuana. Deseo observar a un guardia de seguridad realizando la inspección obligatoria de 17 puntos de contenedor en un remolque de salida con destino al puerto comercial de Otay Mesa.",
                    pedagogicalNotes: "Target terms: C-TPAT re-validation audit, shipping dock, outbound staging yard, 17-point container inspection, outbound trailer"
                },
                {
                    role: "Capitán Roberto Ramos (Director of Corporate Security & Asset Protection, Tijuana)",
                    content: "Certainly, Officer Becker. Let's step over to dock 4. The guard is currently using a calibrated ultrasonic thickness gauge and a laser measuring tape to verify the interior versus exterior depth of the trailer's front bulkhead to rule out false wall compartments.",
                    translation: "Por supuesto, Oficial Becker. Pasemos al muelle 4. El guardia está utilizando actualmente un medidor de espesor ultrasónico calibrado y una cinta métrica láser para verificar la profundidad interior contra la exterior del mamparo frontal del remolque para descartar compartimentos de pared falsa.",
                    pedagogicalNotes: "Target terms: ultrasonic thickness gauge, laser measuring tape, front bulkhead, false wall compartments"
                },
                {
                    role: "Specialist James Becker (C-TPAT Supply Chain Security Specialist, San Diego)",
                    content: "I notice the high-security bolt seal on the desk. Can you walk me through your procedure for affixing the seal and logging the serial number on the bill of lading?",
                    translation: "Noto el sello de perno de alta seguridad en el escritorio. ¿Podría explicarme su procedimiento para colocar el sello y registrar el número de serie en el conocimiento de embarque?",
                    pedagogicalNotes: "Target terms: high-security bolt seal, affixing the seal, serial number, bill of lading"
                },
                {
                    role: "Capitán Roberto Ramos (Director of Corporate Security & Asset Protection, Tijuana)",
                    content: "We enforce the strict VVTT protocol: View, Verify, Tug, and Twist. The guard verifies the engraved serial number against the SAP shipping order, snaps the ISO 17712 bolt into the primary right-door locking cam, tugs it firmly, and twists the cylinder. A high-resolution CCTV camera records the serial number before the driver receives the signed gate pass.",
                    translation: "Hacemos cumplir el estricto protocolo VVTT: Ver, Verificar, Tirar (Tug) y Girar (Twist). El guardia verifica el número de serie grabado contra la orden de embarque de SAP, encaja el perno ISO 17712 en la leva de bloqueo de la puerta derecha primaria, tira de él con firmeza y gira el cilindro. Una cámara CCTV de alta resolución registra el número de serie antes de que el conductor reciba el pase de salida firmado.",
                    pedagogicalNotes: "Target terms: VVTT protocol (View, Verify, Tug, Twist), ISO 17712 bolt, right-door locking cam, high-resolution CCTV camera, gate pass"
                }
            ],
            lexiconMatrix: [
                {
                    term: "C-TPAT (Customs-Trade Partnership Against Terrorism)",
                    ipa: "/ˈsiː.tiːˌpæt/",
                    es: "Asociación Aduana-Comercio Contra el Terrorismo (C-TPAT)",
                    category: "Seguridad Logística",
                    definition: "A voluntary public-private supply chain security program led by US Customs and Border Protection (CBP) focused on securing commercial cargo against contraband, narcotics, and terrorism.",
                    collocations: ["C-TPAT certified partner", "C-TPAT validation audit", "C-TPAT Tier 3 green lane status"],
                    falseFriends: "No es una norma de calidad estética; es una certificación de seguridad física, perimetral, digital y humana.",
                    nativeUsage: "Our Monterrey manufacturing plant maintained C-TPAT Tier 2 status, granting our trucks access to the FAST lane."
                },
                {
                    term: "17-Point Inspection",
                    ipa: "/ˌsɛv.ənˈtiːn pɔɪnt ɪnˈspɛk.ʃən/",
                    es: "Inspección de seguridad de 17 puntos para tractocamiones y remolques",
                    category: "Protocolo de Seguridad",
                    definition: "The mandatory physical examination conducted on all commercial highway conveyances and ocean containers prior to loading, checking for false compartments and structural tampering.",
                    collocations: ["conduct 17-point inspection", "17-point checklist log", "inspect fifth wheel and bulkhead"],
                    falseFriends: "Debe realizarse de manera metódica y documentada con registro fotográfico antes de permitir la salida del patio.",
                    nativeUsage: "The security guard completed the 17-point inspection, checking the fuel tank baffles and trailer floor for tampering."
                },
                {
                    term: "ISO 17712 High-Security Bolt Seal",
                    ipa: "/ˌaɪ.ɛsˈoʊ ˈsɛv.ən.tiːn ˈsɛv.ən ˈtwɛlv boʊlt siːl/",
                    es: "Sello de perno de alta seguridad certificado ISO 17712",
                    category: "Hardware de Seguridad",
                    definition: "A heavy-duty mechanical locking seal tested against tensile pull, shear cut, and impact standards, designed to provide physical deterrence and evidence of cargo tampering.",
                    collocations: ["affix ISO 17712 bolt seal", "tamper-evident seal", "bolt seal cutter"],
                    falseFriends: "Un simple cincho de plástico no cumple con C-TPAT; solo sellos de perno de acero certificados son legales para cruces fronterizos.",
                    nativeUsage: "CBP officers at the bridge verified that the container's ISO 17712 bolt seal was untampered and matched the manifest."
                },
                {
                    term: "VVTT Protocol (View, Verify, Tug, Twist)",
                    ipa: "/viː viː tiː tiː ˈproʊ.tə.kɑːl/",
                    es: "Protocolo VVTT de colocación e inspección de sellos de seguridad",
                    category: "Procedimiento Operativo",
                    definition: "The standardized procedure required by CBP for verifying high-security bolt seals: View the seal, Verify serial number, Tug firmly downward, and Twist to confirm positive lock.",
                    collocations: ["execute VVTT check", "train drivers on VVTT protocol", "log VVTT inspection"],
                    falseFriends: "Es una técnica física activa; evita que pernos mal cerrados se abran durante el viaje en carretera.",
                    nativeUsage: "Every outbound driver must demonstrate the VVTT protocol before receiving their commercial customs documentation."
                },
                {
                    term: "FAST Lane (Free and Secure Trade)",
                    ipa: "/fæst leɪn/",
                    es: "Carril FAST (Comercio Libre y Seguro)",
                    category: "Infraestructura Fronteriza",
                    definition: "A dedicated commercial border-crossing lane reserved exclusively for shipments where the importer, foreign manufacturer, freight carrier, and driver are all C-TPAT certified.",
                    collocations: ["cross via FAST lane", "FAST driver card", "FAST lane lane-reduction advantage"],
                    falseFriends: "No es una autopista de peaje más rápida para turistas; es un carril aduanero exclusivo de bajo riesgo con clearance acelerado.",
                    nativeUsage: "Using the FAST lane at the World Trade Bridge reduced our border crossing queue from six hours down to twenty minutes."
                },
                {
                    term: "False Bulkhead / False Wall",
                    ipa: "/fɔːls ˈbʌlk.hɛd / fɔːls wɔːl/",
                    es: "Mamparo falso / Pared falsa en remolques (compartimento oculto)",
                    category: "Detección de Contrabando",
                    definition: "An artificial compartment constructed inside the front or rear of a shipping container or trailer used by criminal syndicates to conceal narcotics or illegal contraband.",
                    collocations: ["detect false bulkhead", "laser measurement for false wall", "bulkhead cavity inspection"],
                    falseFriends: "Se detecta comparando la longitud exterior medida con la longitud interior útil con cinta láser.",
                    nativeUsage: "The security team flagged the trailer when a laser measure showed a two-foot discrepancy indicative of a false bulkhead."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "VVTT Protocol Meaning",
                    botQuestion: "When securing a shipping container with an ISO 17712 high-security bolt seal under C-TPAT standards, what four action words do the letters in the 'VVTT' protocol stand for?",
                    requiredKeywords: ["view", "verify", "tug", "twist"],
                    minKeywords: 4,
                    feedbackSuccess: "Exact! The VVTT protocol stands for View, Verify (the serial number), Tug (to confirm locking), and Twist (to ensure the bolt cannot unscrew).",
                    feedbackRetry: "Remember the four sequential actions: View the seal, Verify the number, and what two physical movements with your hands?"
                },
                {
                    step: 2,
                    concept: "FAST Lane Eligibility",
                    botQuestion: "What four entities in a commercial supply chain must all be C-TPAT certified in order for a truck to legally use the expedited FAST (Free and Secure Trade) lane at the US border?",
                    requiredKeywords: ["importer", "manufacturer", "carrier", "driver"],
                    minKeywords: 3,
                    feedbackSuccess: "Spot on! The FAST lane mandates that the importer, the foreign manufacturing plant, the logistics carrier (trucking company), and the commercial driver must ALL hold active C-TPAT / FAST certifications.",
                    feedbackRetry: "Think about every link in the physical chain: who makes the part, who buys it, who transports it, and who sits behind the steering wheel?"
                }
            ],
            quiz: [
                {
                    q: "What is the primary operational advantage of achieving C-TPAT and OEA certification for a manufacturing exporter in Mexico?",
                    options: [
                        "Access to expedited FAST lanes and up to an 80% reduction in intrusive commercial customs border inspections",
                        "Exemption from all federal labor laws and safety regulations",
                        "The ability to ship weapons and toxic chemicals without an import permit",
                        "A free fleet of new commercial trucks provided by the government"
                    ],
                    answer: 0
                },
                {
                    q: "What type of seal is legally mandated by C-TPAT Minimum Security Criteria for all commercial trailers crossing the international border?",
                    options: [
                        "ISO 17712 certified High-Security Bolt Seal",
                        "A piece of colored masking tape",
                        "A plastic supermarket twist-tie",
                        "A standard padlock bought at a grocery store"
                    ],
                    answer: 0
                },
                {
                    q: "How do security inspectors detect a 'False Bulkhead' (hidden front wall) in a shipping trailer during a 17-point inspection?",
                    options: [
                        "By measuring and comparing the trailer's external length against its internal usable length using a laser measuring tool",
                        "By asking the driver if they hid anything inside",
                        "By painting the trailer a different color",
                        "By weighing the trailer on a bathroom scale"
                    ],
                    answer: 0
                },
                {
                    q: "What does the 'Tug' step in the VVTT seal protocol verify?",
                    options: [
                        "It confirms through downward physical force that the bolt seal has positively locked into the locking chamber and cannot slip out",
                        "It measures the gross weight of the trailer tires",
                        "It cleans dirt off the truck door handle",
                        "It signals the warehouse crane to begin loading pallets"
                    ],
                    answer: 0
                }
            ]
        },
        {
            id: "log-m6",
            title: "Freight Forwarding, Demurrage, Detention & Ocean/Air Bill of Lading (BOL)",
            titleES: "Agenciamiento de Carga, Demoras, Detenciones y Conocimientos de Embarque Marítimo/Aéreo",
            icon: "fa-solid fa-ship",
            isGoldModel: true,
            readings: [
                {
                    id: "log-m6-r1",
                    title: "Maritime & Air Freight: Ocean Bill of Lading (B/L) vs Air Waybill (AWB)",
                    duration: "15 min",
                    content: `> **International Transport Law**: Governed by the **Hague-Visby Rules / Hamburg Rules** for ocean freight and the **Montreal Convention 1999** for international air carriage (IATA).

# Freight Forwarding & Supply Chain Disruption

### 1. Modes of International Freight Carriage
In modern global supply chains connecting Asian chipmakers and European machine tool builders with North American factories:
- **Ocean Freight (FCL / LCL)**: The backbone of global volume. 
  - **FCL (Full Container Load)**: Exclusive use of a standard 20-foot, 40-foot, or 40-foot High-Cube ($HC$) shipping container.
  - **LCL (Less than Container Load)**: Consolidating freight from multiple shippers into a shared container at a Container Freight Station (CFS).
- **Air Freight**: For emergency line-down production shipments, high-value electronics, or cold-chain active pharmaceuticals.
  - Calculated based on **Volumetric (Chargeable) Weight**: 
    $$\\text{Volumetric Weight (kg)} = \\frac{\\text{Length (cm)} \\times \\text{Width (cm)} \\times \\text{Height (cm)}}{6,000}$$
    The airline bills whichever is greater: the actual gross scale weight or the volumetric weight.

### 2. Ocean B/L vs Air Waybill (AWB)
- **Ocean Bill of Lading (B/L)**: Issued as an original negotiable document of title. Goods will **not** be released at the port of discharge (e.g., Manzanillo or Long Beach) without physical presentation and endorsement of the original B/L or an authorized **Telex Release / Sea Waybill**.
- **Air Waybill (AWB)**: Issued by air freight carriers (IATA). The AWB is a receipt for cargo and a contract of carriage, but it is **never a negotiable document of title**; goods are delivered directly to the named consignee upon customs clearance.`
                },
                {
                    id: "log-m6-r2",
                    title: "Demurrage, Detention & Free Time in Port Operations",
                    duration: "13 min",
                    content: `> **Operational Port Standard**: Governed by shipping line container tariffs and the **Federal Maritime Commission (FMC - Ocean Shipping Reform Act)**.

### 1. The Financial Avalanche of Port Disruption
Supply chain managers frequently confuse **Demurrage** with **Detention**, leading to hundreds of thousands of dollars in unexpected penalties:

| Penalty Type | Geographic Location | What it Charges For | Standard Free Time |
| :--- | :--- | :--- | :--- |
| **Demurrage** | **Inside the Port Terminal / CFS** | Storage charges for a container occupying terminal space **before** it is picked up and cleared by the importer. | $4\\text{ to }7\\text{ calendar days}$ |
| **Detention** | **Outside the Port / At Importer's Yard** | Per-diem equipment fee charged by the shipping line for holding the container **after** pickup until the empty box is returned to the carrier's depot. | $5\\text{ to }10\\text{ calendar days}$ |

### 2. Mitigating Port Bottlenecks
When ports like Manzanillo, Lázaro Cárdenas, or Long Beach experience congestion or customs system crashes:
- Negotiating extended **Free Time (14 to 21 days combined demurrage/detention)** prior to booking the ocean freight booking confirmation.
- Direct-to-Rail intermodal transfer (Intermodal Rail Ramp) moving containers directly from vessel to inland rail terminals (Pantaco, Silao, Monterrey) avoiding congested port gates.`
                }
            ],
            dialogue: [
                {
                    role: "Specialist Arthur Pendelton (Director of International Freight, Hamburg Süd, Rotterdam)",
                    content: "Licenciado Morales, our vessel just berthed at the Port of Manzanillo carrying twenty-two 40-foot High-Cube containers of automated assembly robotic arms from Bremen. Your free time for demurrage inside the terminal expires on Friday. What is your customs clearance and drayage schedule?",
                    translation: "Licenciado Morales, nuestro buque acaba de atracar en el Puerto de Manzanillo transportando veintidós contenedores High-Cube de 40 pies con brazos robóticos de ensamble automatizado desde Bremen. Su tiempo libre para demoras dentro de la terminal vence el viernes. ¿Cuál es su programa de despacho aduanal y acarreo?",
                    pedagogicalNotes: "Target terms: Port of Manzanillo, 40-foot High-Cube containers, free time, demurrage inside the terminal, drayage schedule"
                },
                {
                    role: "Lic. Fernando Morales (Logistics & International Operations Lead, San Luis Potosí)",
                    content: "Good morning, Arthur. Our customs broker already pre-validated the entry pedimentos with the maritime customs office. We have dedicated double-chassis drayage carriers staged outside the port gate to pull the first ten containers tomorrow morning directly to our rail ramp terminal.",
                    translation: "Buenos días, Arthur. Nuestro agente aduanal ya pre-validó los pedimentos de entrada con la aduana marítima. Tenemos transportistas de acarreo con chasis doble posicionados fuera de la puerta del puerto para retirar los primeros diez contenedores mañana por la mañana directamente a nuestra terminal de rampa ferroviaria.",
                    pedagogicalNotes: "Target terms: pre-validated entry pedimentos, maritime customs office, double-chassis drayage carriers, rail ramp terminal"
                },
                {
                    role: "Specialist Arthur Pendelton (Director of International Freight, Hamburg Süd, Rotterdam)",
                    content: "Remember that your detention clock starts ticking the moment those containers gate out. The per-diem detention rate is $225 USD per box per day after day 7.",
                    translation: "Recuerde que su reloj de detención comienza a correr en el momento en que esos contenedores salen por la puerta. La tarifa de detención por día (per-diem) es de $225 USD por caja por día después del día 7.",
                    pedagogicalNotes: "Target terms: detention clock, gate out, per-diem detention rate"
                },
                {
                    role: "Lic. Fernando Morales (Logistics & International Operations Lead, San Luis Potosí)",
                    content: "Understood. Our San Luis Potosí assembly plant has two unloading crews scheduled around the clock. The empty containers will be de-staged, inspected, and returned to your inland depot in Querétaro by day 4, well within our authorized detention window.",
                    translation: "Entendido. Nuestra planta de ensamble de San Luis Potosí tiene dos cuadrillas de descarga programadas las 24 horas. Los contenedores vacíos serán des-estibados, inspeccionados y retornados a su patio interior en Querétaro para el día 4, muy dentro de nuestra ventana de detención autorizada.",
                    pedagogicalNotes: "Target terms: around the clock, de-staged, inland depot, authorized detention window"
                }
            ],
            lexiconMatrix: [
                {
                    term: "Demurrage vs Detention",
                    ipa: "/dɪˈmɜːr.ɪdʒ / dɪˈtɛn.ʃən/",
                    es: "Demoras (en terminal portuaria) vs Detenciones (fuera de puerto)",
                    category: "Cargos de Flete y Almacenaje",
                    definition: "Demurrage is the penalty fee charged for storing containers inside the port terminal beyond free time; Detention is the per-diem fee charged by the carrier for holding the container equipment outside the port before returning it empty.",
                    collocations: ["demurrage charges", "negotiate detention free time", "per-diem container penalty"],
                    falseFriends: "Demurrage ocurre adentro del puerto; Detention ocurre afuera en el patio de la empresa cuando tardan en descargar y devolver la caja vacía.",
                    nativeUsage: "The logistics manager negotiated 14 days of combined free time to protect against port demurrage and container detention."
                },
                {
                    term: "Free Time",
                    ipa: "/friː taɪm/",
                    es: "Días libres de almacenaje y detención (Free Time)",
                    category: "Contratos de Flete Marítimo",
                    definition: "The agreed-upon period during which an importer or exporter can use a shipping container or hold cargo inside a terminal without incurring demurrage or detention charges.",
                    collocations: ["standard 7-day free time", "extend free time window", "free time expiration alert"],
                    falseFriends: "No es tiempo libre recreativo; es el plazo contractual estricto antes de que comiencen las multas por día de uso de equipo.",
                    nativeUsage: "The shipping line granted 21 days of free time for our refrigerated ocean containers arriving in Manzanillo."
                },
                {
                    term: "Air Waybill (AWB)",
                    ipa: "/ɛr ˈweɪˌbɪl/",
                    es: "Guía Aérea (AWB / Contrato de Transporte Aéreo IATA)",
                    category: "Transporte Aéreo",
                    definition: "A non-negotiable transport document issued by an air carrier that acts as a receipt for goods and a contract of carriage, but unlike an ocean B/L, does not represent legal title to the cargo.",
                    collocations: ["master air waybill (MAWB)", "house air waybill (HAWB)", "AWB consignment tracking"],
                    falseFriends: "Nunca es un título de propiedad negociable; la aerolínea entrega la carga directamente al consignatario nombrado en el documento.",
                    nativeUsage: "The freight forwarder emailed the master air waybill number so we could track the emergency air shipment from Frankfurt."
                },
                {
                    term: "Telex Release (Express Release)",
                    ipa: "/ˈtɛl.ɛks rɪˈliːs/",
                    es: "Liberación Telemática / Telex Release de Conocimiento Marítimo",
                    category: "Operaciones Portuarias",
                    definition: "An electronic message sent by the carrier at origin authorizing the destination port agent to release cargo to the named consignee without requiring presentation of physical paper bills of lading.",
                    collocations: ["request a telex release", "express bill of lading release", "telex fee"],
                    falseFriends: "Elimina el retraso de enviar documentos físicos originales por correo internacional DHL/FedEx.",
                    nativeUsage: "Once the supplier confirmed payment receipt, the ocean carrier issued a telex release to unload the containers in Veracruz."
                },
                {
                    term: "Volumetric / Chargeable Weight",
                    ipa: "/ˌvɑːl.jəˈmɛt.rɪk weɪt/",
                    es: "Peso Volumétrico / Peso Cobrable (en Flete Aéreo)",
                    category: "Tarificación de Carga",
                    definition: "A calculation reflecting cargo density based on its cubic dimensions, used by airlines and couriers to bill for low-density lightweight packages occupying high cargo hold volume.",
                    collocations: ["chargeable weight calculation", "dimensional weight factor", "cubic volume divider"],
                    falseFriends: "Una caja grande llena de plumas pesa poco en báscula, pero se cobra según su peso volumétrico en metros cúbicos.",
                    nativeUsage: "Because the plastic catheter housings were light but bulky, the airline charged based on volumetric weight rather than gross weight."
                },
                {
                    term: "Drayage",
                    ipa: "/ˈdreɪ.ɪdʒ/",
                    es: "Acarreo terrestre / Flete de corta distancia portuaria o fronteriza",
                    category: "Transporte Terrestre",
                    definition: "The specialized short-distance overland transportation of freight containers between an ocean port terminal, international border bridge, rail ramp, and nearby warehouse facility.",
                    collocations: ["drayage carrier", "cross-border drayage transfer", "drayage chassis fee"],
                    falseFriends: "Drayage se refiere exclusivamente al tramo corto de enlace (ej. del puente o puerto a la bodega de trasbordo), no al flete carretero de larga distancia.",
                    nativeUsage: "The transfer drayage driver hauled the loaded container across the international commercial bridge into Nuevo Laredo."
                }
            ],
            socraticChallenges: [
                {
                    step: 1,
                    concept: "Demurrage vs Detention",
                    botQuestion: "In international maritime shipping, what is the exact operational and geographic distinction between Demurrage charges and Detention charges?",
                    requiredKeywords: ["inside", "outside", "terminal", "port", "equipment", "container", "depot"],
                    minKeywords: 3,
                    feedbackSuccess: "Exact! Demurrage is charged when a loaded container sits INSIDE the port terminal beyond free time, whereas Detention is charged when the container equipment is held OUTSIDE the port in the customer's yard beyond free time.",
                    feedbackRetry: "Think about location: is the container still sitting inside the port terminal, or was it pulled out to the company's yard?"
                },
                {
                    step: 2,
                    concept: "Air Waybill Title",
                    botQuestion: "Unlike a traditional Ocean Bill of Lading, is an international Air Waybill (AWB) a negotiable document of title to the cargo?",
                    requiredKeywords: ["no", "non-negotiable", "not", "title"],
                    minKeywords: 2,
                    feedbackSuccess: "Spot on! An Air Waybill (AWB) is strictly a non-negotiable receipt and contract of carriage; it is NEVER a negotiable document of title, meaning the carrier releases the cargo directly to the named consignee.",
                    feedbackRetry: "Can you endorse and transfer ownership of an Air Waybill like an ocean document of title, or is it non-negotiable?"
                }
            ],
            quiz: [
                {
                    q: "What is the critical geographic and legal difference between Demurrage and Detention in container shipping?",
                    options: [
                        "Demurrage applies to storage inside the port terminal, while Detention applies to container equipment held outside the terminal beyond free time",
                        "Demurrage is paid in Mexican pesos, while Detention is paid in euros",
                        "Demurrage applies only to air cargo, while Detention applies only to rail freight",
                        "There is no difference; they are identical terms for maritime insurance"
                    ],
                    answer: 0
                },
                {
                    q: "Why does an airline bill an air freight shipment based on 'Volumetric Weight' rather than actual gross weight if the package contains lightweight, bulky products?",
                    options: [
                        "Because aircraft cargo holds have limited physical space, so low-density bulky cargo must be billed according to the volume it occupies",
                        "Because airline scales are not calibrated for weights under 100 kilograms",
                        "Because international aviation law mandates that all cargo weigh at least 500 kilograms",
                        "To calculate the altitude at which the airplane must fly"
                    ],
                    answer: 0
                },
                {
                    q: "What is a 'Telex Release' in ocean freight operations?",
                    options: [
                        "An electronic notification authorizing the destination port to release cargo to the consignee without waiting for physical paper bills of lading to arrive by mail",
                        "An antique telegraph machine kept in museum displays",
                        "A mechanical valve used to release water pressure from a ship's ballast tanks",
                        "An announcement made over a ship's loudspeaker system"
                    ],
                    answer: 0
                },
                {
                    q: "What does the logistics term 'Drayage' describe in cross-border supply chains?",
                    options: [
                        "Short-distance transportation of shipping containers between a port, border bridge, or rail ramp and a nearby cross-dock warehouse",
                        "Driving a truck across an entire continent over two weeks",
                        "Pumping fuel into an ocean container ship",
                        "Inspecting the chemical composition of plastic pallets"
                    ],
                    answer: 0
                }
            ]
        }
    ]
};

// Check if logistics-compliance already exists
if (fileContent.includes('"logistics-compliance"')) {
    console.log("Track 'logistics-compliance' already exists in courses.js! Replacing...");
}

// Find the last occurrence of "    }\n};" or "}\n};"
const lastBraceIndex = fileContent.lastIndexOf('\n};');
if (lastBraceIndex === -1) {
    console.error("Could not find the closing brace of LXP_COURSES in content/courses.js");
    process.exit(1);
}

// Format track30 as indented JSON
const track30JSON = JSON.stringify(track30, null, 4);
const indentedTrack30 = track30JSON.split('\n').map((line, idx) => {
    return (idx === 0 ? '    "logistics-compliance": ' : '    ') + line;
}).join('\n');

const updatedContent = fileContent.slice(0, lastBraceIndex) + ',\n' + indentedTrack30 + fileContent.slice(lastBraceIndex);

fs.writeFileSync(coursesPath, updatedContent, 'utf8');
console.log("Successfully injected Track 30 into content/courses.js!");

// Validate syntax
try {
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(updatedContent, sandbox);
    const courses = sandbox.window.LXP_COURSES || sandbox.LXP_COURSES;
    console.log("Syntax validation PASSED!");
    console.log("Total tracks now:", Object.keys(courses).length);
    console.log("Track 30 exists:", !!courses["logistics-compliance"]);
    console.log("Track 30 modules count:", courses["logistics-compliance"].modules.length);
} catch (err) {
    console.error("Syntax validation FAILED:", err);
    // restore original
    fs.writeFileSync(coursesPath, fileContent, 'utf8');
    process.exit(1);
}
