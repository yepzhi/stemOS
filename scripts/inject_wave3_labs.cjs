const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '..', 'content/courses.js');
let content = fs.readFileSync(coursesPath, 'utf8');

const ctx = { window: {}, module: { exports: {} } };
vm.runInNewContext(content, ctx);
const courses = ctx.LXP_COURSES || ctx.module.exports;

// 1. Mechatronics: mechatronics-m1-r2
const mechaTrack = courses['mechatronics'];
const mechaM1 = mechaTrack.modules.find(m => m.id === 'mechatronics-m1');
if (mechaM1 && !mechaM1.readings.some(r => r.id === 'mechatronics-m1-r2')) {
  mechaM1.readings.push({
    id: 'mechatronics-m1-r2',
    title: 'Applied Lab: IEC 61131-3 PLC Programming (Structured Text vs. Ladder), SIL 3 & Safety Relays',
    duration: '15 min',
    content: `
> **Industrial Automation Standard**: Aligned with **IEC 61131-3 (Programmable Controllers - Programming Languages)** and **IEC 62061 / ISO 13849-1 (Safety of Machinery - Safety-Related Parts of Control Systems SIL 3 / PLe)**. Prepares mechatronics controls engineers to architect fail-safe PLC ladder and structured text routines with dual-channel emergency stop interlocks.

# Applied Laboratory: IEC 61131-3 PLC Programming, SIL 3 & Safety Relays

Industrial automation systems require deterministic execution where input scan, logic execution, and output actuation cycles occur within predictable millisecond windows. Furthermore, when machines interact with human operators, safety-critical circuits must achieve Safety Integrity Level 3 (SIL 3) and Performance Level e (PLe).

## 1. IEC 61131-3 Programming Paradigms: LD vs. ST
IEC 61131-3 standardizes five programming languages for programmable logic controllers:
1. **Ladder Diagram (LD)**: Graphic language based on relay ladder logic schematics. Ideal for discrete combinational logic, optical sensor interlocks, and solenoid valves.
2. **Structured Text (ST)**: High-level textual language (syntactically similar to Pascal/C). Superior for complex mathematical calculations, PID control loops, array indexing, and recipe management:
\`\`\`iec61131
/* Structured Text: Closed-Loop Proportional-Integral (PI) Flow Regulator */
IF bSystemAutoMode AND NOT bEmergencyStopTriggered THEN
    rFlowError := rFlowSetpoint - rFlowFeedbackSensor;
    rIntegralTerm := rIntegralTerm + (rFlowError * rCycleTimeSeconds);
    rOutputDutyCycle := (kP * rFlowError) + (kI * rIntegralTerm);
    rOutputDutyCycle := LIMIT(0.0, rOutputDutyCycle, 100.0);
ELSE
    rIntegralTerm := 0.0;
    rOutputDutyCycle := 0.0;
END_IF;
\`\`\`

## 2. Safety Integrity Levels (SIL 3 / ISO 13849-1 PLe)
Standard consumer PLCs cannot be used for life-safety functions because single component failures (e.g., a welded output relay contact) can cause actuators to remain energized during an emergency:
- **Safety PLCs (1oo2D / 2oo3 Architecture)**: Feature redundant microprocessors running synchronized scan cycles with cross-comparison hardware watchdogs.
- **Pulse Testing on Dual-Channel Inputs**: To detect short circuits between input conductors, safety input modules inject microsecond test pulses (dark tests). If a wire shorts to 24VDC, the lack of test-pulse attenuation triggers an immediate emergency shutdown (Category 4 / PLe).

## 3. Interlocking Protocols: OSSD Outputs & Light Curtains
Optical Safety devices (e.g. Keyence or Sick Safety Light Curtains) emit **Output Signal Switching Device (OSSD)** signals:
1. Two redundant static semiconductor outputs switch between 24VDC and ground.
2. If an operator breaks the infrared light grid, both OSSD lines drop to 0V within 15 milliseconds, de-energizing force-guided safety contactors and discharging pneumatic pressure dump valves.

---
> **Key Takeaway**: Industrial mechatronics demands mastering **IEC 61131-3 Structured Text mathematical control, dual-channel OSSD safety pulse testing, and ISO 13849-1 Category 4 architecture** to guarantee zero occupational fatalities in manufacturing lines.
`,
    vocabulary: [
      {
        en: 'Structured Text (ST)',
        es: 'Texto Estructurado (ST)',
        definition: 'High-level block-structured programming language defined in IEC 61131-3 used for complex mathematical and algorithmic PLC control.',
        ipa: '/ˈstrʌktʃərd tɛkst/',
        collocations: ['write structured text routine', 'IEC 61131-3 programming language', 'compile ST function block']
      },
      {
        en: 'Safety Integrity Level (SIL 3)',
        es: 'Nivel de Integridad de Seguridad (SIL 3)',
        definition: 'Relative level of risk reduction provided by a safety function, with SIL 3 requiring probability of failure on demand under 10^-3 to 10^-4.',
        ipa: '/ˈseɪfti ɪnˈtɛɡrɪti ˈlɛvəl/',
        collocations: ['certify SIL 3 compliance', 'safety instrumented function (SIF)', 'probability of failure on demand']
      },
      {
        en: 'Output Signal Switching Device (OSSD)',
        es: 'Dispositivo de Conmutación de Señal de Salida (OSSD)',
        definition: 'Fail-safe solid-state semiconductor outputs on safety sensors that periodically turn off for microseconds to detect wiring faults.',
        ipa: '/ˈaʊt.pʊt ˈsɪɡ.nəl ˈswɪtʃ.ɪŋ dɪˈvaɪs/',
        collocations: ['OSSD safety light curtain', 'pulse-tested OSSD outputs', 'dual-channel OSSD disconnect']
      },
      {
        en: 'Force-Guided Relays',
        es: 'Relevadores con Contactos Guiados Forzadamente',
        definition: 'Mechanical relays designed so that normally open (NO) and normally closed (NC) contacts can never be closed simultaneously, even if welded.',
        ipa: '/fɔːrs ˈɡaɪdɪd ˈriːleɪz/',
        collocations: ['force-guided contact monitoring', 'weld-resistant safety relay', 'dual-channel safety relay module']
      }
    ],
    questions: [
      {
        q: 'Why are standard non-safety PLCs strictly prohibited from managing emergency stop circuits on industrial manufacturing lines?',
        options: [
          'Because non-safety PLCs lack an internet connection',
          'Because a single internal hardware fault (such as a shorted output transistor or welded relay contact) could cause dangerous machinery to keep moving despite pressing the E-Stop button',
          'Because safety PLCs are cheaper and use less copper',
          'Because safety relays only work in cold rooms'
        ],
        answer: 1,
        explanation: 'In standard PLCs, a single hardware failure (such as a memory bit flip, CPU lockup, or welded output contact) can fail in an energized "unsafe" state. Certified safety PLCs employ dual redundant processors (1oo2 architecture) with continuous hardware self-diagnostics that force the system into a de-energized safe state upon any discrepancy.'
      },
      {
        q: 'What is the purpose of dark test microsecond pulses on safety sensor Output Signal Switching Device (OSSD) lines?',
        options: [
          'To conserve electricity during factory nighttime shifts',
          'To verify that the output can turn off and detect cross-wiring shorts to 24VDC without dropping enough voltage to de-energize the safety contactors',
          'To transmit serial data to the printer',
          'To clean dust off the optical lenses'
        ],
        answer: 1,
        explanation: 'OSSD outputs periodically drop from 24VDC to 0V for a few microseconds (dark test). Because mechanical contactors have physical inertia and cannot open in microseconds, they remain energized; however, the sensor internal circuitry verifies that the line is not short-circuited to an external 24V supply.'
      },
      {
        q: 'When programming complex numerical algorithms like PID regulation or array matrix manipulation in IEC 61131-3, why is Structured Text (ST) preferred over Ladder Diagram (LD)?',
        options: [
          'Structured Text requires no compiler to run',
          'Structured Text provides concise algebraic syntax, loop constructs (FOR, WHILE), and floating-point math that would require clumsy and confusing multi-rung relay logic in Ladder Diagram',
          'Ladder Diagram cannot turn on motors',
          'Structured Text is only available in Python'
        ],
        answer: 1,
        explanation: 'While Ladder Diagram is excellent for discrete logic gates and interlocks, implementing algebraic math, filtering algorithms, and conditional branching in LD requires sprawling arithmetic blocks across dozens of rungs that are tedious to read and maintain. Structured Text handles complex math natively.'
      },
      {
        q: 'What mechanical design feature ensures that force-guided contact safety relays (EN 50205) can reliably detect contact welding?',
        options: [
          'The contacts are made of indestructible diamond',
          'All contacts are mechanically linked together so that if a normally open (NO) contact welds shut, the normally closed (NC) monitoring contact is physically prevented from closing when de-energized',
          'They explode when exposed to heat',
          'They use radio signals instead of springs'
        ],
        answer: 1,
        explanation: 'In force-guided relays (Class A per EN 50205), all contact armatures are mechanically interlocked. If a power contact welds due to an overcurrent surge, the auxiliary NC contact remains held open by the physical link, enabling the safety PLC to detect the fault before allowing the machine to re-arm.'
      }
    ]
  });
  console.log('[UPDATED] Injected mechatronics-m1-r2');
}

// 2. Advanced Manufacturing: mfg-m1-r2
const mfgTrack = courses['advanced-manufacturing'];
const mfgM1 = mfgTrack.modules.find(m => m.id === 'mfg-m1');
if (mfgM1 && !mfgM1.readings.some(r => r.id === 'mfg-m1-r2')) {
  mfgM1.readings.push({
    id: 'mfg-m1-r2',
    title: 'Applied Lab: ASME Y14.5-2018 GD&T: True Position, Datum Reference Frames & MMC Verification',
    duration: '15 min',
    content: `
> **Mechanical Metrology Standard**: Aligned with **ASME Y14.5-2018 (Dimensioning and Tolerancing)** and **ISO 1101 (Geometrical Product Specifications - GPS)**. Equips manufacturing, tooling, and coordinate measuring machine (CMM) quality engineers to calculate bonus tolerances and establish datum reference frames.

# Applied Laboratory: ASME Y14.5-2018 GD&T: True Position, Datum Reference Frames & MMC Verification

Traditional plus-or-minus coordinate tolerancing (e.g. $X \\pm 0.1\\,\\text{mm}, Y \\pm 0.1\\,\\text{mm}$) produces a square tolerance zone that artificially rejects functional parts and permits 41% greater deviation across corners than along axes. **Geometric Dimensioning and Tolerancing (GD&T)** establishes cylindrical tolerance zones and unambiguous datum reference frames (DRF) matching functional assembly constraints.

## 1. Datum Reference Frame (DRF) & The 3-2-1 Rule
To eliminate all six spatial degrees of freedom (3 translational, 3 rotational) during machining and inspection:
1. **Primary Datum (Datum A)**: Establishes a minimum of 3 contact points on a high-precision surface plate, arresting pitch, roll, and Z translation.
2. **Secondary Datum (Datum B)**: Constrains 2 points perpendicular to Datum A, arresting yaw and X translation.
3. **Tertiary Datum (Datum C)**: Constrains 1 point perpendicular to both A and B, arresting Y translation.

## 2. True Position at Maximum Material Condition (MMC)
In feature control frames, specifying **True Position** with the Maximum Material Condition modifier ($\\text{M}$) introduces the concept of **Bonus Tolerance**:
$$\\text{Total Allowed Positional Tolerance} = \\text{Specified Tolerance} + \\text{Bonus Tolerance}$$
- **Maximum Material Condition (MMC)**: The state where a feature contains the maximum amount of material within its dimensional limits (smallest hole diameter or largest pin/shaft diameter).
- **Bonus Tolerance Calculation**:
  If an aerospace bolt hole is specified as:
  $$\\phi 10.0 \\pm 0.2\\,\\text{mm} \\quad \\left[ \\bigoplus \\;\\; \\phi 0.1\\,(\\text{M}) \\;\\; A \\;\\; B \\;\\; C \\right]$$
  - At MMC ($D = 9.8\\,\\text{mm}$), allowed positional tolerance is strictly $\\phi 0.1\\,\\text{mm}$.
  - If the hole is machined at its upper limit of size ($D = 10.2\\,\\text{mm}$), bonus tolerance is:
    $$\\text{Bonus} = D_{\\text{actual}} - D_{\\text{MMC}} = 10.2 - 9.8 = 0.4\\,\\text{mm}$$
    Total allowable positional tolerance expands to $\\phi 0.1 + 0.4 = \\phi 0.5\\,\\text{mm}$, ensuring 100% functional bolt assembly while drastically reducing scrap rates.

## 3. Coordinate Measuring Machine (CMM) & Optical Scanning Inspection
1. **Renishaw Tactile Touch-Trigger Probes**: CMM ruby styli capture spatial points ($x, y, z$) on the machined component to construct reconstructed mathematical surfaces and calculate deviation vectors from nominal CAD models.
2. **Blue Light 3D Optical Metrology (GOM ATOS)**: Structured blue light fringes project over complex stamped surfaces, acquiring millions of points to generate full-field color deviation heatmaps.

---
> **Key Takeaway**: Advanced manufacturing profitability relies on **ASME Y14.5 GD&T discipline, proper 3-2-1 datum establishment, and leveraging MMC bonus tolerances** to ensure assembly interoperability between cross-border aerospace and automotive plants.
`,
    vocabulary: [
      {
        en: 'Datum Reference Frame (DRF)',
        es: 'Marco de Referencia de Datums (DRF)',
        definition: 'System of three mutually perpendicular reference planes established by datum features used to constrain all degrees of freedom of a part.',
        ipa: '/ˈdeɪ.təm ˈrɛf.ər.əns freɪm/',
        collocations: ['establish 3-2-1 datum frame', 'primary datum surface', 'align CMM coordinate system']
      },
      {
        en: 'Maximum Material Condition (MMC)',
        es: 'Condición de Máximo Material (MMC)',
        definition: 'Condition in which a feature of size contains the maximum amount of material within the stated limits of size (smallest hole or largest shaft).',
        ipa: '/ˈmæksɪməm məˈtɪriəl kənˈdɪʃən/',
        collocations: ['MMC modifier in feature control frame', 'virtual condition calculation', 'bonus tolerance at MMC']
      },
      {
        en: 'True Position',
        es: 'Posición Verdadera',
        definition: 'The theoretically exact location of a feature defined by basic dimensions, creating a cylindrical tolerance zone in GD&T.',
        ipa: '/truː pəˈzɪʃ.ən/',
        collocations: ['cylindrical true position zone', 'true position deviation', 'calculate true position radial error']
      },
      {
        en: 'Bonus Tolerance',
        es: 'Tolerancia Adicional (Bono de Tolerancia)',
        definition: 'Additional geometric tolerance gained when a manufactured feature departs from its specified material condition limit toward LMC.',
        ipa: '/ˈboʊ.nəs ˈtɑːl.ər.əns/',
        collocations: ['harvest MMC bonus tolerance', 'increase allowable positional tolerance', 'functional assembly clearance']
      }
    ],
    questions: [
      {
        q: 'Why is cylindrical True Position tolerancing in GD&T superior to traditional square plus/minus (+/-) coordinate tolerancing?',
        options: [
          'Because cylindrical tolerance zones are easier to draw with a pencil',
          'Because traditional square tolerance zones allow 41% more error across corners than along axes, whereas circular True Position provides uniform 360-degree clearance matching round pins and bolts',
          'Because GD&T eliminates the need for precision tools',
          'Because square tolerance zones cause metal to rust faster'
        ],
        answer: 1,
        explanation: 'In +/- square tolerancing, the diagonal corners allow a displacement equal to sqrt(2) (~1.41 times) the axis tolerance. Since circular mating fasteners (screws, bolts) have identical radial clearance in all directions, True Position establishes a cylindrical zone, providing 57% greater allowable functional area without compromising assembly.'
      },
      {
        q: 'If a hole specified as diameter 12.0 +/- 0.2 mm with True Position 0.1 mm (MMC) is machined with an actual diameter of 12.2 mm, what is the total allowable positional tolerance?',
        options: [
          '0.1 mm',
          '0.5 mm (0.1 mm base tolerance + 0.4 mm MMC bonus tolerance)',
          '12.2 mm',
          'Zero, the part is scrap'
        ],
        answer: 1,
        explanation: 'The Maximum Material Condition (MMC) for a hole is its smallest size (11.8 mm). The actual hole is 12.2 mm, giving a bonus of (12.2 - 11.8) = 0.4 mm. Adding this bonus to the base specified tolerance of 0.1 mm yields a total allowable True Position tolerance of 0.5 mm.'
      },
      {
        q: 'What is the minimum number of physical contact points required on a Primary Datum surface under the 3-2-1 rule to constrain orientation?',
        options: [
          '1 contact point',
          'At least 3 non-collinear contact points to define a unique spatial plane and arrest 3 degrees of freedom',
          '100 contact points',
          'Zero points'
        ],
        answer: 1,
        explanation: 'Under the fundamental 3-2-1 locating principle of ASME Y14.5, a primary datum plane requires at least 3 non-collinear contact points to establish a stable reference plane, arresting two rotational degrees of freedom (pitch and roll) and one translational degree of freedom.'
      },
      {
        q: 'What does a boxed numerical value (e.g. [50.0]) indicate on an engineering drawing adhering to ASME Y14.5?',
        options: [
          'A price in US dollars',
          'A Basic Dimension representing the theoretically exact location from which GD&T geometric tolerance zones are established',
          'A dimension that workers can ignore',
          'The weight of the part in kilograms'
        ],
        answer: 1,
        explanation: 'A dimension enclosed in a rectangle is a Basic Dimension. It carries no direct +/- tolerance of its own; instead, it defines the theoretically exact position or orientation from which the geometric tolerance zones (such as True Position or Profile) are located.'
      }
    ]
  });
  console.log('[UPDATED] Injected mfg-m1-r2');
}

// 3. Industrial Operations: io-m1-r2
const ioTrack = courses['industrial-operations'];
const ioM1 = ioTrack.modules.find(m => m.id === 'io-m1');
if (ioM1 && !ioM1.readings.some(r => r.id === 'io-m1-r2')) {
  ioM1.readings.push({
    id: 'io-m1-r2',
    title: 'Applied Lab: USMCA/T-MEC Compliance, IMMEX Anexo 24/31 & Regional Value Content (RVC)',
    duration: '15 min',
    content: `
> **International Trade & Customs Compliance Standard**: Aligned with **USMCA/T-MEC Rules of Origin (Uniform Regulations)**, **Mexico Foreign Trade Law (Ley Aduanera)**, and **SAT Resolution of Foreign Trade (RGCE Anexo 24 and 31)**. Prepares supply chain, customs, and nearshoring plant controllers to manage temporary import balances and preferential tariff qualification.

# Applied Laboratory: USMCA/T-MEC Compliance, IMMEX Anexo 24/31 & Regional Value Content (RVC)

Manufacturing maquiladoras operating in northern Mexico under the IMMEX (Manufacturing, Maquiladora and Export Services Industry) program import billions of dollars in raw materials, CNC tooling, and sub-assemblies duty-free on a temporary basis. However, customs compliance requires strict automated inventory accounting and adherence to strict Regional Value Content (RVC) thresholds.

## 1. Automated Inventory Control: Anexo 24 & Anexo 31
To maintain VAT (IVA) exemption under Article 28-A of the Mexican VAT Law:
1. **Anexo 24 (Automated Inventory Control System)**: Tracks the chronological entrance of temporarily imported raw materials (*Pedimento Clave IN*) and matches them against exported finished goods (*Pedimento Clave RT*) through engineering bills of materials (BOMs).
2. **Anexo 31 (Credit and Guarantee Control System - SCCCyG)**: Electronic ledger operated by the SAT (Tax Administration Service). Temporary imports deduct from the company's fiscal credit balance; upon confirmed electronic customs dispatch of finished products, credit balances are discharged. Failure to discharge temporary balances within allowable timeframes (typically 18 to 36 months) triggers punitive retroactive General Import Taxes (IGI), VAT penalties, and loss of IMMEX certification.

## 2. USMCA / T-MEC Regional Value Content (RVC) Calculations
To qualify for 0% preferential tariff rates when shipping vehicles, electronics, or medical devices across the US-Mexico border, products must satisfy product-specific rules of origin:
1. **Net Cost Method**:
   $$\\text{RVC} = \\frac{\\text{NC} - \\text{VNM}}{\\text{NC}} \\times 100$$
   Where $\\text{NC}$ is the total Net Cost of producing the good (excluding sales promotion, royalty, and shipping costs), and $\\text{VNM}$ is the Value of Non-Originating Materials imported from outside North America (e.g. raw steel or electronics imported from Asia).
2. **Transaction Value Method**:
   $$\\text{RVC} = \\frac{\\text{TV} - \\text{VNM}}{\\text{TV}} \\times 100$$
   Where $\\text{TV}$ is the transaction value (adjusted FOB invoice price). For automotive core parts (engines, transmissions, batteries), the USMCA mandates an elevated RVC threshold of 75% to eliminate tariff penalties.

## 3. Essential Customs Documentation: Pedimentos & Certificates of Origin
- **Pedimento Aduanal**: The legal fiscal declaration submitted by an authorized Customs Broker (Agente Aduanal) detailing tariff fraction classification (Fracción Arancelaria / HTS code), commercial value, exchange rates, and country of origin.
- **Labor Value Content (LVC)**: Specific to USMCA automotive sectors, mandating that 40% to 45% of vehicle value must be produced by manufacturing workers earning at least $16 USD per hour.

---
> **Key Takeaway**: Cross-border nearshoring operations depend upon **immaculate Anexo 24/31 customs inventory reconciliation, rigorous USMCA Regional Value Content audits, and precise HTS tariff classification** to safeguard tariff-free supply chain velocity.
`,
    vocabulary: [
      {
        en: 'Regional Value Content (RVC)',
        es: 'Contenido de Valor Regional (VCR)',
        definition: 'Percentage indicating the share of a product manufactured using materials originating within the USMCA/T-MEC free trade territory.',
        ipa: '/ˈriːdʒənəl ˈvæljuː ˈkɑːntɛnt/',
        collocations: ['calculate RVC under net cost method', 'satisfy 75% RVC threshold', 'value of non-originating materials (VNM)']
      },
      {
        en: 'Anexo 24 / Anexo 31',
        es: 'Anexo 24 y Anexo 31 (Control Aduanero IMMEX)',
        definition: 'Automated digital inventory systems mandated by Mexican SAT to reconcile temporarily imported raw materials against exported finished goods.',
        ipa: '/əˈnɛk.soʊ/',
        collocations: ['reconcile Anexo 24 inventory', 'Anexo 31 VAT tax credit ledger', 'temporary import discharge balance']
      },
      {
        en: 'Pedimento Aduanal',
        es: 'Pedimento Aduanal de Importación/Exportación',
        definition: 'Official fiscal customs document in Mexico certifying the legal clearance and tariff payment of imported or exported commercial merchandise.',
        ipa: '/pɛdɪˈmɛntoʊ/',
        collocations: ['file electronic pedimento', 'customs broker pedimento validation', 'pedimento clave IN / RT']
      },
      {
        en: 'Bill of Materials (BOM)',
        es: 'Lista de Materiales y Explosión de Insumos (BOM)',
        definition: 'Comprehensive inventory list of raw materials, components, and assemblies required to construct a finished manufactured product.',
        ipa: '/bɪl əv məˈtɪriəlz/',
        collocations: ['engineering BOM explosion', 'reconcile customs BOM scrap rates', 'multi-level manufacturing BOM']
      }
    ],
    questions: [
      {
        q: 'Under USMCA / T-MEC, how is Regional Value Content (RVC) calculated using the Net Cost Method?',
        options: [
          'By dividing the weight of the truck by the number of wheels',
          'RVC = ((Net Cost - Value of Non-Originating Materials) / Net Cost) * 100',
          'By adding sales tax and freight insurance to the total invoice',
          'By multiplying the number of employees by their hourly wage'
        ],
        answer: 1,
        explanation: 'Under the USMCA Net Cost method, the value of non-originating materials (VNM) imported from outside the US, Mexico, and Canada is subtracted from total net manufacturing cost, and divided by total net cost. The resulting percentage must meet or exceed the specific threshold for that tariff code (e.g. 75% for automotive core parts).'
      },
      {
        q: 'What is the primary function of SAT Anexo 24 in an IMMEX manufacturing maquiladora in Mexico?',
        options: [
          'To monitor the ambient temperature of employee cafeterias',
          'To maintain an automated inventory accounting ledger that legally tracks and reconciles temporarily imported raw materials against exported finished goods using engineering BOMs',
          'To design new car models',
          'To purchase office stationary'
        ],
        answer: 1,
        explanation: 'Anexo 24 is a mandatory software system that cross-references temporary import pedimentos (IN) with export pedimentos (RT) based on production bills of materials. It proves to tax authorities that duty-free imported components were indeed converted and exported rather than diverted into the domestic Mexican economy.'
      },
      {
        q: 'What severe financial risk does an IMMEX company face if it fails to discharge its temporary import balances in Anexo 31 within regulatory timeframes?',
        options: [
          'Nothing happens; customs balances expire automatically without cost',
          'The temporary tax exemption is retroactively revoked, and the company must immediately pay all General Import Taxes (IGI), full 16% VAT, inflationary updates, and severe surcharges',
          'The factory must change its corporate color scheme',
          'All factory equipment is turned into scrap metal'
        ],
        answer: 1,
        explanation: 'If temporary imports remain unexported past the legal stay period (typically 18 to 36 months), SAT deems the goods to be illegally diverted into domestic commerce, triggering massive retroactive import tariffs, VAT debts, inflation adjustments, and possible cancellation of the company\'s IMMEX registry.'
      },
      {
        q: 'What does the Labor Value Content (LVC) rule mandate specifically for automotive manufacturing under USMCA?',
        options: [
          'All vehicles must be built exclusively by robotic cobots',
          'At least 40% to 45% of the vehicle value must be produced by manufacturing workers earning at least $16 USD per hour',
          'All assembly workers must speak three languages',
          'No human may touch the vehicle during assembly'
        ],
        answer: 1,
        explanation: 'USMCA introduced the groundbreaking Labor Value Content (LVC) requirement, which mandates that 40% of passenger vehicles (and 45% of light trucks) must be manufactured in production facilities where assembly workers earn an average base wage of at least $16 USD per hour.'
      }
    ]
  });
  console.log('[UPDATED] Injected io-m1-r2');
}

// 4. Data Analytics: data-m1-r2
const dataTrack = courses['data-analytics'];
const dataM1 = dataTrack.modules.find(m => m.id === 'data-m1');
if (dataM1 && !dataM1.readings.some(r => r.id === 'data-m1-r2')) {
  dataM1.readings.push({
    id: 'data-m1-r2',
    title: 'Applied Lab: Apache Iceberg Lakehouse Architecture, Parquet Compaction & Stream-Table Duality',
    duration: '15 min',
    content: `
> **Big Data & Analytics Architecture Standard**: Aligned with **Open Table Formats (Apache Iceberg, Delta Lake)** and **Distributed Query Processing (Trino, Apache Spark, Flink)**. Prepares data engineers to architect ACID-compliant petabyte-scale lakehouses, eliminate small-file problems via Z-order bin-packing, and implement time-travel query semantics.

# Applied Laboratory: Apache Iceberg Lakehouse Architecture, Parquet Compaction & Stream-Table Duality

Traditional Apache Hive metastore architectures suffered from directory-level locking, slow partition pruning over object storage (Amazon S3, MinIO), and a total absence of ACID transactions. **Apache Iceberg** reorganizes data lakes into true transactional lakehouses by decoupling table state from underlying storage directory paths using hierarchical snapshot metadata.

## 1. Apache Iceberg Three-Tier Architecture
Iceberg manages data files through three distinct metadata tiers:
1. **Iceberg Catalog**: Stores the current metadata pointer (*Metadata File Location*). Supported catalogs include REST Catalog, AWS Glue, and Nessie.
2. **Metadata Layer**:
   - **Snapshot Metadata File**: Contains complete table schema, partition specs, and list of historical snapshots.
   - **Manifest List File**: Lists all manifest files composing a specific snapshot, recording partition boundary ranges for rapid pruning.
   - **Manifest Files**: Index individual data files (Apache Parquet or ORC) with column-level minimum and maximum statistical boundaries.
3. **Data Layer**: Immutable Apache Parquet columnar files storing compressed row groups with Snappy or ZSTD compression and dictionary encoding.

## 2. Parquet Compaction & Small-File Mitigation
High-throughput streaming ingestion from Apache Kafka or IoT sensors generates thousands of tiny 500KB files, causing immense metadata overhead and crippling analytical query engines:
- **Bin-Packing Compaction**: A recurring compaction procedure groups small Parquet files into optimal 128MB to 512MB columnar files:
\`\`\`sql
-- Apache Iceberg rewrite_data_files Spark stored procedure
CALL system.rewrite_data_files(
    table => 'telemetry_lakehouse.sensor_readings',
    strategy => 'binpack',
    options => map('max-file-size-bytes', '536870912') -- 512 MB target
);
\`\`\`
- **Z-Order Clustering / Space-Filling Curves**: Orders data multidimensionally across multiple columns (e.g. \`plant_id\` and \`timestamp\`), ensuring query engines skip over 90% of data files via manifest min/max statistics.

## 3. Time-Travel Queries & Schema Evolution
Because snapshots are immutable and reference historic manifest lists, data analysts can execute deterministic time-travel queries for auditing and reproducible ML training pipelines:
\`\`\`sql
-- Querying exact historical state prior to calibration anomaly
SELECT plant_id, AVG(vibration_rms)
FROM telemetry_lakehouse.sensor_readings
FOR SYSTEM_TIME AS OF '2026-09-15 08:00:00.000 UTC'
GROUP BY plant_id;
\`\`\`
Schema evolution (adding, renaming, dropping columns) is an $O(1)$ metadata operation with zero costly data rewriting.

---
> **Key Takeaway**: Modern industrial data engineering synthesizes **Apache Iceberg ACID snapshot management, Parquet compaction strategies, and Z-order multidimensional indexing** to provide sub-second analytical queries over massive industrial telemetry streams.
`,
    vocabulary: [
      {
        en: 'Apache Iceberg',
        es: 'Apache Iceberg (Formato de Tabla Abierta)',
        definition: 'Open table format for huge analytic datasets providing ACID transactions, snapshot isolation, and schema evolution on object storage.',
        ipa: '/əˈpætʃi ˈaɪsbɜːrɡ/',
        collocations: ['Iceberg metadata snapshot tree', 'query Iceberg REST catalog', 'hidden partitioning in Iceberg']
      },
      {
        en: 'Parquet Compaction',
        es: 'Compactación de Archivos Parquet',
        definition: 'Optimization process that merges thousands of small streaming files into larger, uniform columnar blocks to optimize disk I/O and query speed.',
        ipa: '/pɑːrˈkeɪ kəmˈpækʃən/',
        collocations: ['execute bin-packing compaction', 'mitigate small-file problem', 'rewrite data files procedure']
      },
      {
        en: 'Time-Travel Query',
        es: 'Consulta Histórica de Viaje en el Tiempo',
        definition: 'Capability in modern lakehouse formats to query past states of a table using previous snapshot IDs or timestamps.',
        ipa: '/taɪm ˈtrævəl ˈkwɪri/',
        collocations: ['execute time-travel query', 'reproducible ML snapshot', 'rollback to previous snapshot ID']
      },
      {
        en: 'Z-Order Clustering',
        es: 'Agrupamiento Z-Order (Curva de Llenado Espacial)',
        definition: 'Technique that clusters multidimensional data into linear memory order to maximize data skipping across multiple query filter columns.',
        ipa: '/zɛd ˈɔːrdər ˈklʌstərɪŋ/',
        collocations: ['Z-order clustering algorithm', 'multidimensional data skipping', 'space-filling Hilbert curve']
      }
    ],
    questions: [
      {
        q: 'Why was the classic Apache Hive table format replaced by modern open table formats like Apache Iceberg in enterprise lakehouses?',
        options: [
          'Because Hive only worked on floppy disks',
          'Because Hive relied on directory-level listings and filesystem renames that caused slow queries, race conditions, and an absence of atomic ACID transactions on cloud object storage like S3',
          'Because Iceberg deletes all old data automatically',
          'Because Iceberg is written in HTML'
        ],
        answer: 1,
        explanation: 'Hive treated folder paths as partitions, requiring recursive S3 LIST operations that scale linearly with file counts and make atomic transactions impossible. Iceberg tracks files individually using explicit snapshot metadata trees, enabling true ACID consistency, fast metadata pruning, and zero file-listing overhead.'
      },
      {
        q: 'What serious performance degradation is caused by streaming ingestion pipelines generating thousands of tiny (e.g. 500KB) Parquet files?',
        options: [
          'The computer monitor runs out of colors',
          'The "small-file problem" causes massive query planning latency and I/O bottlenecks because query engines must issue thousands of individual HTTP GET requests to read minimal amounts of data',
          'The files turn into audio recordings',
          'The Kafka brokers stop accepting network connections'
        ],
        answer: 1,
        explanation: 'Cloud object storage is optimized for large sequential reads (128MB-512MB). Thousands of tiny 500KB files force query engines like Trino or Spark to execute millions of network round-trips for metadata and headers, crippling query performance until bin-pack compaction merges them.'
      },
      {
        q: 'How does Apache Iceberg achieve non-destructive "Time-Travel" querying over historical data?',
        options: [
          'By reversing the electrical current in the hard drive',
          'By maintaining immutable historical snapshot records and manifest lists, allowing queries to point to the exact state of data files as they existed at any specific timestamp',
          'By asking the user to remember previous numbers',
          'By keeping all deleted computers in a museum'
        ],
        answer: 1,
        explanation: 'In Iceberg, data files and manifest lists are never overwritten; new commits simply create new snapshots referencing added and existing files. Historical snapshots remain accessible in metadata, allowing analysts to query historical states using AS OF timestamps until expired by maintenance retention policies.'
      },
      {
        q: 'What is the primary benefit of Z-Order clustering when applied to an Iceberg table containing industrial sensor telemetry?',
        options: [
          'It translates column names to alphabetical order',
          'It co-locates data multidimensionally along multiple search axes (such as plant_id and timestamp), enabling query engines to skip over 80-90% of irrelevant data files using manifest min/max statistics',
          'It encrypts passwords in the database',
          'It compresses images by reducing resolution'
        ],
        answer: 1,
        explanation: 'Linear sorting only optimizes data skipping for the first column. Z-Order curves interleave binary bits across multiple columns simultaneously, giving equal sorting weight to multiple dimensions (e.g., equipment ID and date), allowing the engine to skip entire clusters of non-matching files.'
      }
    ]
  });
  console.log('[UPDATED] Injected data-m1-r2');
}

// 5. Space & Satellite: space-m1-r2
const spaceTrack = courses['space-satellite'];
const spaceM1 = spaceTrack.modules.find(m => m.id === 'space-m1');
if (spaceM1 && !spaceM1.readings.some(r => r.id === 'space-m1-r2')) {
  spaceM1.readings.push({
    id: 'space-m1-r2',
    title: 'Applied Lab: Orbital Mechanics: Two-Line Elements (TLE), SGP4 Propagation & Doppler Shift',
    duration: '15 min',
    content: `
> **Astrodynamics & Aerospace Ground Station Standard**: Aligned with **NASA Space Communications and Navigation (SCaN)** and **CCSDS (Consultative Committee for Space Data Systems - 502.0-B-2 Orbit Data Messages)**. Prepares aerospace and satellite communications engineers to propagate Low Earth Orbit (LEO) trajectories, model atmospheric drag, and compensate for high-speed RF Doppler shifts.

# Applied Laboratory: Orbital Mechanics: Two-Line Elements (TLE), SGP4 Propagation & Doppler Shift

Operating constellations of CubeSats in Low Earth Orbit (LEO, 400km to 700km altitude) requires predicting satellite ground tracks and antenna elevation pointing vectors with high mathematical fidelity. Because satellites orbit at velocities exceeding 7.6 km/s, orbital propagation models must account for Earth's oblateness ($J_2$) and dynamic thermospheric atmospheric drag.

## 1. Classical Keplerian Elements & Two-Line Element (TLE) Format
Orbit geometry in the Earth-Centered Inertial (ECI - J2000) frame is defined by six Keplerian parameters:
1. **Semi-major Axis ($a$)**: Defines orbit size and orbital period per Kepler's Third Law ($T = 2\\pi \\sqrt{a^3/\\mu}$).
2. **Eccentricity ($e$)**: Shape of the ellipse ($e = 0$ for circular LEO orbits).
3. **Inclination ($i$)**: Angle between the orbital plane and the Earth's equatorial plane.
4. **Right Ascension of the Ascending Node ($\\Omega$ / RAAN)**: Angle from the vernal equinox to the ascending node.
5. **Argument of Perigee ($\\omega$)**: Orientation of the ellipse within the orbital plane.
6. **Mean Anomaly ($M$)**: Angular position of the satellite relative to perigee assuming a constant angular velocity.

The standard NORAD **Two-Line Element (TLE)** encodes these parameters into two 69-character lines:
\`\`\`tle
ISS (ZARYA)
1 25544U 98067A   26265.51234567  .00016717  00000-0  10270-3 0  9993
2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.49815340456789
\`\`\`

## 2. SGP4 Perturbation Modeling ($J_2$ & Atmospheric Drag)
Unperturbed two-body Keplerian mechanics is valid only for point masses in a vacuum. In low Earth orbit:
- **Earth Oblateness Perturbation ($J_2$)**: Because Earth bulges at the equator due to its rotation, the non-spherical gravitational potential induces:
  - **Nodal Precession**: Continuous drift of the orbital plane ($\dot{\\Omega}$). Sun-synchronous orbits leverage $J_2$ by tuning inclination to approximately $97.5^\\circ$ so that nodal precession equals exactly $0.9856^\\circ/\\text{day}$ (matching Earth's revolution around the Sun).
  - **Perigee Precession**: Rotation of the major axis ($\dot{\\omega}$) inside the orbital plane.
- **SGP4 (Simplified General Perturbations-4)**: The standard analytical propagation algorithm modeling $J_2, J_3, J_4$ gravitational zonal harmonics and aerodynamic ballistic drag ($B^*$).

## 3. Ground Station Tracking & RF Doppler Compensation
When an LEO satellite passes overhead at $v = 7.6\\,\\text{km/s}$, the received radio frequency ($f_r$) shifts substantially relative to transmitter carrier frequency ($f_0$):
$$f_r = f_0 \\left( 1 - \\frac{\\vec{v} \\cdot \\hat{r}}{c} \\right)$$
For an S-band downlink at $2.2\\,\\text{GHz}$, the maximum Doppler shift exceeds $\\pm 55\\,\\text{kHz}$. Ground station Software Defined Radios (SDRs) must execute continuous closed-loop frequency tracking to maintain phase lock and prevent bit error rate (BER) degradation.

---
> **Key Takeaway**: Satellite operations bridge **Keplerian mechanics, SGP4 perturbation algorithms, and RF Doppler compensation** to maintain uninterrupted telemetry downlinks with LEO spacecraft.
`,
    vocabulary: [
      {
        en: 'Two-Line Element (TLE)',
        es: 'Conjunto de Elementos de Dos Líneas (TLE)',
        definition: 'Standard data format encoding a list of orbital elements for an Earth-orbiting object at a given point in time (epoch).',
        ipa: '/tuː laɪn ˈɛlɪmənt/',
        collocations: ['decode TLE orbital epoch', 'parse NORAD two-line elements', 'TLE propagation error']
      },
      {
        en: 'SGP4 Propagator',
        es: 'Propagador Orbital SGP4',
        definition: 'Analytical algorithm that calculates satellite position and velocity vectors over time, accounting for Earth oblateness and atmospheric drag.',
        ipa: '/ɛs dʒiː piː fɔːr/',
        collocations: ['SGP4 analytical model', 'propagate orbit ephemeris', 'B-star drag coefficient']
      },
      {
        en: 'Doppler Shift',
        es: 'Efecto Doppler de Radiofrecuencia',
        definition: 'Change in the apparent frequency of radio signals caused by the high relative velocity between a satellite and a ground tracking station.',
        ipa: '/ˈdɑːplər ʃɪft/',
        collocations: ['compensate RF Doppler shift', 'S-band Doppler curve', 'zero Doppler crossing point']
      },
      {
        en: 'Sun-Synchronous Orbit (SSO)',
        es: 'Órbita Heliosincrónica (SSO)',
        definition: 'Near-polar orbit whose nodal precession rate exactly matches Earth mean orbital rotation around the Sun, maintaining constant solar illumination.',
        ipa: '/sʌn ˈsɪŋkrənəs ˈɔːrbɪt/',
        collocations: ['sun-synchronous dawn-dusk orbit', 'J2 nodal precession tuning', 'consistent solar illumination angle']
      }
    ],
    questions: [
      {
        q: 'How does a Sun-Synchronous Orbit (SSO) maintain identical solar lighting conditions for Earth observation satellites throughout the year?',
        options: [
          'By keeping the satellite permanently attached to a tall space elevator',
          'By selecting a specific retrograde orbital inclination (around 97 to 98 degrees) so that Earth oblateness (J2) forces the orbital plane to precess at exactly 0.9856 degrees per day, matching Earth revolution around the Sun',
          'By turning off the satellite during nighttime',
          'By reflecting sunlight with giant space mirrors'
        ],
        answer: 1,
        explanation: 'Because the Earth bulges at the equator, non-spherical gravity causes the right ascension of the ascending node (RAAN) to precess. By tuning orbit inclination to ~97.5 degrees, the nodal precession rate matches Earth orbital motion (360 deg / 365.25 days = 0.9856 deg/day), ensuring the satellite crosses the equator at the exact same local solar time each day.'
      },
      {
        q: 'Why must satellite ground stations dynamically compensate for Doppler shift during an S-band (2.2 GHz) Low Earth Orbit pass?',
        options: [
          'Because the high orbital velocity (~7.6 km/s) shifts the received radio frequency by up to +/- 55 kHz, which would cause the receiver demodulator to lose carrier frequency lock and drop data packets',
          'Because Doppler shifts change the color of the satellite antenna',
          'Because ground stations are moving backwards',
          'Because radio waves turn into sound waves in space'
        ],
        answer: 0,
        explanation: 'At 7.6 km/s orbital velocity, the relative line-of-sight velocity toward and away from the ground station creates a massive frequency shift of up to +/- 55 kHz at S-band (2.2 GHz). Without automated SDR Doppler compensation tracking the calculated frequency curve, the demodulator PLL loses lock.'
      },
      {
        q: 'What is the function of the B* (B-star) drag term encoded in NORAD Two-Line Element (TLE) sets?',
        options: [
          'It denotes the monetary cost of the satellite launch in billions',
          'It is a modified aerodynamic ballistic drag coefficient parameter used by the SGP4 propagator to model altitude decay caused by atmospheric drag',
          'It specifies the number of solar panels on the CubeSat',
          'It represents the brightness of the satellite in the night sky'
        ],
        answer: 1,
        explanation: 'In the SGP4 mathematical formulation, B* represents an aerodynamic parameter combining the drag coefficient (Cd), frontal area (A), and mass (m) multiplied by atmospheric density. It allows the analytical model to account for thermospheric friction and calculate orbital decay over time.'
      },
      {
        q: 'What point in time does the "Zero Doppler Crossing" mark during an overhead satellite ground track pass?',
        options: [
          'The moment the satellite battery runs out',
          'The Time of Closest Approach (TCA) where the satellite radial velocity relative to the ground station is zero, shifting from positive (approaching) to negative (receding) frequency',
          'The moment the satellite is launched from the rocket',
          'The end of the mission when it burns in the atmosphere'
        ],
        answer: 1,
        explanation: 'As a satellite approaches a ground station, relative velocity causes a positive frequency shift (+df). At the Time of Closest Approach (TCA) or peak elevation, the velocity vector is perpendicular to the line of sight (radial velocity = 0), so the received frequency exactly equals nominal carrier frequency f0 before shifting negative.'
      }
    ]
  });
  console.log('[UPDATED] Injected space-m1-r2');
}

// Save courses.js
const outputJS = `// stemOS Learning Experience Platform - Course Catalog
// Comprehensive Technical English (ESP) curriculum for high-tech engineering tracks.

var LXP_COURSES = ${JSON.stringify(courses, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LXP_COURSES;
}
`;

fs.writeFileSync(coursesPath, outputJS, 'utf8');
console.log('[SUCCESS] content/courses.js updated with Wave 3 applied engineering labs!');
