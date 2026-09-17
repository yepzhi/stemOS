/**
 * scripts/build_food_science_gold.cjs
 * Authors complete Gold Standard modules for:
 * food-science (food-m1 to food-m5)
 * Updates track status to "full".
 */

const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '../content/courses.js');
const { LXP_COURSES } = require(coursesPath);

// food-m1
const food_m1 = {
  id: "food-m1",
  title: "Food Microbiology & HACCP Critical Control Points",
  titleES: "Microbiología de Alimentos y Puntos Críticos de Control HACCP",
  icon: "fa-solid fa-shield-halved",
  isGoldModel: true,
  readings: [
    {
      id: "food-m1-r1",
      title: "Food Safety Microbiology: Pathogen Kinetics, HACCP Architecture & Environmental Monitoring",
      duration: "15 min",
      content: `
# Food Safety Microbiology: Pathogen Kinetics, HACCP Architecture & Environmental Monitoring

In high-volume industrial food and beverage manufacturing, an undetected microbial pathogen in a packaged product does not simply cause consumer illness—it triggers catastrophic nationwide recalls, brand destruction, criminal liability under the US Food Safety Modernization Act (**FSMA**), and severe human tragedy. Modern industrial food plants processing meat, dairy, fresh-cut produce, and aseptic beverages operate with the clinical cleanliness and monitoring rigor of pharmaceutical cleanrooms.

Guaranteeing food safety requires understanding the growth kinetics of foodborne pathogens (*Salmonella enterica*, *Listeria monocytogenes*, *Escherichia coli* O157:H7, and *Clostridium botulinum*), implementing the **7 Principles of HACCP (Hazard Analysis Critical Control Point)**, and enforcing proactive **Environmental Monitoring Programs (EMP)**.

---

## 1. Microbial Pathogen Kinetics & Risk Profiles

Food microbiology categorizes biological threats according to cell structure, spore formation capability, and physiological growth limits:

\`\`\`
Key Foodborne Pathogens Taxonomy:
- Salmonella enterica:        Gram-negative, non-spore-forming rod. Cross-contamination in poultry/produce.
- Listeria monocytogenes:     Gram-positive psychrotroph. Multiplies at refrigeration temps (down to -0.4°C).
- Clostridium botulinum:      Gram-positive obligate anaerobic spore-former. Produces lethal neurotoxin.
- Shiga toxin E. coli (STEC): Enterohemorrhagic rod. Causes severe hemolytic uremic syndrome (HUS).
\`\`\`

### The Unique Danger of Listeria monocytogenes
Unlike most mesophilic bacteria whose growth halts under $4.0^\\circ\\text{C}$, *Listeria monocytogenes* is a **psychrotroph** capable of slow metabolic multiplication inside industrial cold storage rooms ($0^\\circ\\text{C}\\text{--}4^\\circ\\text{C}$). Furthermore, *Listeria* forms resilient **biofilms**—complex multicellular matrices anchored to wet stainless steel drains, conveyor rollers, and slicing blades that resist standard quaternary ammonium sanitizers.

### The Thermal Spore Defense of Clostridium botulinum
*Clostridium botulinum* spores are ubiquitous in soil and raw agricultural products. In vegetative form, the bacteria produce **botulinum neurotoxin**, one of the most lethal biological substances known ($LD_{50} \\approx 1\\text{--}3\\ \\text{ng/kg}$). Because the spores survive boiling water ($100^\\circ\\text{C}$) under atmospheric pressure for hours, canning low-acid foods (pH $>4.60$) requires high-pressure steam autoclaves reaching at least **$121.1^\\circ\\text{C}$**.

---

## 2. The 7 Principles of HACCP (Codex Alimentarius & FSMA)

Originally engineered by the Pillsbury Company and NASA to ensure $100\\%$ contamination-free food for human spaceflight missions, **HACCP** is the mandatory global foundation of food quality systems (GFSI, SQF, BRCGS):

\`\`\`
The 7 HACCP Principles Lifecycle:
[1. Hazard Analysis] ---> [2. Identify CCPs] ---> [3. Establish Critical Limits]
                                                                |
[7. Documentation]  <--- [6. Verification]  <--- [5. Corrective Actions] <-- [4. Monitoring]
\`\`\`

1. **Conduct a Hazard Analysis**: Identify all potential biological (pathogens), chemical (cleaning chemicals, mycotoxins, undeclared allergens), and physical (metal shavings, glass shards) hazards across every processing step.
2. **Determine Critical Control Points (CCPs)**: A step at which control can be applied and is essential to prevent, eliminate, or reduce a food safety hazard to an acceptable level. CCPs are determined using standard **Codex Decision Trees** (e.g., continuous in-line pasteurization heater or in-line metal detector).
3. **Establish Critical Limits**: Measurable, scientifically validated maximum or minimum boundaries:
   - *Example*: *"Thermal pasteurizer hold tube product temperature must remain $\\ge 72.0^\\circ\\text{C}$ for a minimum residence time of $\\ge 15.0\\ \\text{seconds}$."*
4. **Establish Monitoring Procedures**: Continuous data logging using calibrated RTD sensors, flow meters, or automated x-ray inspection rejection cameras.
5. **Establish Corrective Actions**: Immediate containment protocols when a critical limit is breached:
   - *Example*: Automated actuation of a **Flow Diversion Valve (FDV)** that instantly diverts under-processed juice back to the raw balance tank, quarantining any suspect downstream product.
6. **Establish Verification Procedures**: Auditing activities verifying that the HACCP plan is operating effectively (e.g., daily thermometric calibration, ATP bioluminescence hygiene swabbing, and third-party microbiological challenge studies).
7. **Establish Record-Keeping & Documentation**: Maintaining immutable digital records of all CCP monitoring logs, deviations, calibrations, and corrective action sign-offs.

---

## 3. Environmental Monitoring Programs (EMP) & Zone Sanitation

Traditional food manufacturing inspected the finished product right before shipping. Modern quality systems recognize that finished product testing alone is statistically incapable of catching low-level, sporadic contamination. Plants enforce **Environmental Monitoring Programs (EMP)** structured around **Four Cleanliness Zones**:

\`\`\`
Industrial Cleanliness Zoning Architecture:
[ Zone 1: Direct Product Contact ]     Conveyor belts, slicer blades, filler nozzles, hopper chutes.
[ Zone 2: Non-Contact Adjacent ]       Equipment frames, motor housings, operator control buttons.
[ Zone 3: Surrounding Facility ]       Cleanroom walls, floor drains, overhead catwalks, air handling vents.
[ Zone 4: Remote Outer Areas ]         Warehouse corridors, employee locker rooms, loading docks.
\`\`\`

### Pathogen Swabbing & Rapid ATP Bioluminescence
- **ATP Swabbing**: Measures total organic matter via luciferin-luciferase bioluminescence within 15 seconds. An RLU (Relative Light Unit) reading $<30$ confirms physical cleaning before chemical sanitization is applied.
- **Microbiological Sponge Swabbing**: Technicians swab Zone 1 and Zone 2 surfaces with neutralizer broth sponges, analyzing samples via **Polymerase Chain Reaction (PCR)** for *Listeria* species or *Salmonella*.
- **Seek and Destroy Philosophy**: In a world-class plant, finding zero pathogen hits in Zone 3 or Zone 4 floor drains over a year is considered a warning sign of poor swabbing technique rather than perfect hygiene. Inspectors aggressively search for harboring harborage niches to eliminate biofilms before they can migrate to Zone 1 product contact surfaces.

---

## 4. Engineering Field Scenario: Managing an In-Line Metal Detector CCP Rejection

At an automated salsa and guacamole packaging plant in Uruapan, Michoacán, exporting retail jars to US supermarket chains:

### The Critical Control Point Failure
At 14:20 during the afternoon shift, the multi-frequency in-line **Metal Detector (CCP-3)** on Packaging Line B actuated its pneumatic pusher arm, rejecting four consecutive glass jars of avocado dip into a locked reject bin. The packaging conveyor automatically locked out, halting the line.

### Executing the Mandated HACCP Corrective Action Protocol
1. **Immediate Lot Quarantine**: The quality supervisor immediately placed a red regulatory hold tag on the last 45 minutes of production (680 jars), isolating the pallets in the QA quarantine cage.
2. **Challenge Test Verification**: The technician retrieved the certified testing wands embedded with calibrated metal test spheres:
   - Ferrous: $1.5\\ \\text{mm}$
   - Non-Ferrous: $2.0\\ \\text{mm}$
   - Stainless Steel 316: $2.5\\ \\text{mm}$
   Each wand was placed into a test jar and passed through the detector aperture. The detector successfully identified and rejected all three wands, confirming that the inspection instrument had not drifted out of calibration.
3. **Physical Contaminant Root-Cause Analysis**:
   - The four rejected jars were inspected using a high-resolution industrial cabinet x-ray scanner.
   - The x-ray revealed a $3.2\\ \\text{mm}$ curved metallic sliver embedded in the dip of jar #2.
   - Maintenance disassembled the upstream stainless steel high-shear emulsifier pump. A chipped impeller vane made of 316L stainless steel was discovered; cavitation had fractured a micro-fragment into the product stream.
4. **Corrective & Preventive Action (CAPA)**:
   - The pump impeller was replaced with a heavy-duty electropolished replacement.
   - All 680 quarantined jars were run through the x-ray machine; zero additional metal inclusions were detected, and the lot was authorized for release.
   - The preventive maintenance SOP was updated to include weekly ultrasonic thickness and dye-penetrant crack testing of the emulsifier blades. The CCP event log was signed off by the QA Director, satisfying FSMA audit requirements.

---

> **Key Takeaway**: Industrial food safety is an uncompromised scientific discipline. By mastering microbial growth limits, identifying CCP boundaries under HACCP, enforcing four-zone environmental swabbing, and executing rapid containment when critical limits are breached, food engineers guarantee public health and international market access.
`
    }
  ],
  dialogue: {
    title: "Auditing HACCP Critical Limits during an FDA Foreign Supplier Audit",
    titleES: "Auditando Límites Críticos HACCP durante una Auditoría FDA de Proveedor Extranjero",
    scenarioContext: "A Director of Food Safety in Guadalajara and a US FDA Import Compliance Specialist in Nogales review cold-chain data and pasteurization CCP logs for an exported fruit puree line.",
    characters: [
      { name: "Patricia Campbell", role: "FDA Foreign Supplier Verification Auditor", company: "US FDA Import Operations (Nogales Port of Entry)" },
      { name: "Ing. Jorge Villaseñor", role: "Director of Quality Assurance & HACCP Coordinator", company: "AgroFrut Industrial (Guadalajara, Jalisco)" }
    ],
    turns: [
      {
        speaker: "Patricia Campbell",
        text: "Ingeniero Villaseñor, under the Foreign Supplier Verification Program of FSMA, we are reviewing your HACCP documentation for the aseptic mango puree exported through Arizona. I am looking at your thermal pasteurization logs for line one on Tuesday. At eleven-fifteen AM, your hold tube temperature dipped to seventy-one point two degrees Celsius.",
        translation: "Ingeniero Villaseñor, bajo el Programa de Verificación de Proveedores Extranjeros de FSMA, estamos revisando su documentación HACCP para el puré de mango aséptico exportado a través de Arizona. Estoy viendo sus registros de pasteurización térmica para la línea uno el martes. A las 11:15 AM, la temperatura de su tubo de retención cayó a 71.2 grados Celsius.",
        targetTerms: ["Foreign Supplier Verification Program", "HACCP documentation", "thermal pasteurization logs", "hold tube temperature"]
      },
      {
        speaker: "Ing. Jorge Villaseñor",
        text: "Good morning, Inspector Campbell. Our Critical Limit at Critical Control Point Two is established at a minimum of seventy-two point zero degrees Celsius with a twenty-second hold time to ensure a six-log reduction of Salmonella. When that temperature drop occurred, our automated Flow Diversion Valve actuated in zero point four seconds.",
        translation: "Buenos días, Inspectora Campbell. Nuestro Límite Crítico en el Punto Crítico de Control Dos está establecido en un mínimo de 72.0 grados Celsius con un tiempo de retención de veinte segundos para asegurar una reducción de seis logaritmos de Salmonella. Cuando ocurrió esa caída de temperatura, nuestra Válvula de Desviación de Flujo automatizada actuó en 0.4 segundos.",
        targetTerms: ["Critical Limit", "Critical Control Point Two", "six-log reduction", "Flow Diversion Valve"]
      },
      {
        speaker: "Patricia Campbell",
        text: "Was any under-processed product allowed to enter the aseptic surge tank or reach the packaging filler heads during that valve transition?",
        translation: "¿Se permitió que algún producto subprocesado entrara al tanque de compensación aséptica o llegara a los cabezales de llenado de empaque durante esa transición de válvula?",
        targetTerms: ["under-processed product", "aseptic surge tank", "filler heads", "valve transition"]
      },
      {
        speaker: "Ing. Jorge Villaseñor",
        text: "Zero product escaped. The flow diversion line loops directly back to the raw product balance tank. Furthermore, our downstream aseptic filling line has an automatic interlock that paused carton filling until the pasteurizer completed three minutes of continuous in-spec temperature equilibrium.",
        translation: "Cero producto escapó. La línea de desviación de flujo regresa directamente al tanque de balance de producto crudo. Además, nuestra línea de llenado aséptico aguas abajo tiene un interbloqueo automático que pausó el llenado de cajas hasta que el pasteurizador completó tres minutos de equilibrio de temperatura continuo dentro de especificación.",
        targetTerms: ["raw product balance tank", "automatic interlock", "temperature equilibrium"]
      },
      {
        speaker: "Patricia Campbell",
        text: "That is an engineered fail-safe. What about your environmental monitoring program for post-pasteurization packaging areas? Have you detected any Listeria genus in Zone Two or Zone Three over the past quarter?",
        translation: "Ese es un mecanismo a prueba de fallas bien diseñado. ¿Qué hay de su programa de monitoreo ambiental para las áreas de empaque posteriores a la pasteurización? ¿Han detectado algún género de Listeria en Zona Dos o Zona Tres durante el último trimestre?",
        targetTerms: ["engineered fail-safe", "environmental monitoring program", "post-pasteurization packaging", "Listeria genus"]
      },
      {
        speaker: "Ing. Jorge Villaseñor",
        text: "We take fifty-two environmental sponge swabs weekly. In week thirty-one, we detected a presumptive positive for Listeria innocua on a trench drain in Zone Three near the palletizer. We immediately executed our deep-sanitation protocol with peracetic acid foam, followed by three consecutive days of vector swabbing with negative results.",
        translation: "Tomamos cincuenta y dos hisopos de esponja ambientales semanalmente. En la semana treinta y uno, detectamos un presuntivo positivo para Listeria innocua en un drenaje de trinchera en Zona Tres cerca del paletizador. Ejecutamos de inmediato nuestro protocolo de sanitización profunda con espuma de ácido peracético, seguido de tres días consecutivos de hisopado radial con resultados negativos.",
        targetTerms: ["sponge swabs", "presumptive positive", "Listeria innocua", "peracetic acid foam", "vector swabbing"]
      }
    ],
    contrastTips: [
      {
        school: "We clean the kitchen every afternoon.",
        native: "We execute validated Zone Sanitation and verify zero organic residue via ATP bioluminescence swabbing.",
        explanation: "In industrial food processing, generic 'cleaning' is replaced by validated sanitation standard operating procedures (SSOP) verified with quantifiable ATP limits."
      },
      {
        school: "If food smells good, it is safe to eat.",
        native: "The product achieved a validated six-log thermal reduction of vegetative pathogens under HACCP Critical Control Points.",
        explanation: "Lethal foodborne pathogens like Salmonella, Listeria, and botulinum toxin produce no odor, taste, or visual spoilage; safety is assured strictly through validated thermal lethality."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Critical Control Point (CCP)",
      ipa: "/ˈkrɪt.ɪ.kəl kənˈtroʊl ˌpɔɪnt/",
      es: "Punto Crítico de Control (PCC / CCP)",
      category: "Food Safety Systems",
      definition: "A specific operational step in a food manufacturing process where control can be applied and is essential to prevent, eliminate, or reduce a biological, chemical, or physical hazard to safe levels.",
      collocations: ["establish a CCP on the pasteurizer", "monitor CCP critical limits", "CCP deviation protocol", "audit CCP validation logs"],
      falseFriends: "A CCP is not a routine quality checkpoint like jar weight; it addresses critical public health food safety hazards.",
      nativeUsage: "The metal detector is designated as CCP-4 because it represents the final defense against metal fragment ingestion before palletizing."
    },
    {
      term: "Critical Limit",
      ipa: "/ˈkrɪt.ɪ.kəl ˈlɪm.ɪt/",
      es: "Límite Crítico",
      category: "HACCP Architecture",
      definition: "A maximum or minimum scientific threshold (such as temperature, time, pH, water activity, or chlorine concentration) to which a hazard must be controlled at a CCP to prevent food contamination.",
      collocations: ["breach the critical limit", "validate critical limit boundaries", "set critical limit at 72°C", "critical limit deviation"],
      falseFriends: "Critical limits are rigid food safety boundaries; they are distinct from operational process tolerances used for recipe flavor.",
      nativeUsage: "If the hold tube temperature drops below the 72.0°C critical limit, the flow diversion valve automatically triggers."
    },
    {
      term: "Listeria monocytogenes",
      ipa: "/lɪˈstɪər.i.ə ˌmɒn.oʊ.saɪˈtɒdʒ.ə.niːz/",
      es: "Listeria monocytogenes",
      category: "Food Microbiology",
      definition: "A virulent Gram-positive foodborne pathogen capable of growing under refrigeration temperatures and forming persistent biofilms on damp industrial food processing equipment.",
      collocations: ["test for Listeria monocytogenes", "psychrotrophic pathogen kinetics", "harbor in floor drain biofilms", "zero-tolerance pathogen policy"],
      falseFriends: "Listeria is an organism name, not an illness; the illness caused is called 'listeriosis'.",
      nativeUsage: "The ready-to-eat salad packaging room operates under strict hygiene positive air pressure to prevent airborne Listeria contamination."
    },
    {
      term: "Environmental Monitoring Program (EMP)",
      ipa: "/ɪnˌvaɪ.rənˈmɛn.təl ˈmɒn.ɪ.tər.ɪŋ ˈproʊ.ɡræm/",
      es: "Programa de Monitoreo Ambiental (PMA / EMP)",
      category: "Plant Sanitation",
      definition: "A systematic microbiological swabbing program that evaluates environmental cleanliness across four defined facility zones to detect and eliminate pathogen niches before they contaminate product.",
      collocations: ["implement an aggressive EMP", "Zone 1 direct contact swabbing", "vector swabbing around drain positive", "sponge swab sample collection"],
      falseFriends: "In food plants, EMP monitors microbial pathogen cleanliness on machinery, not outdoor weather or industrial smokestack air emissions.",
      nativeUsage: "Our EMP includes 120 weekly environmental swabs targeting Zone 2 slicer frames and Zone 3 wastewater trenches."
    },
    {
      term: "Flow Diversion Valve (FDV)",
      ipa: "/floʊ daɪˈvɜːr.ʒən ˌvælv/",
      es: "Válvula de Desviación de Flujo",
      category: "Thermal Processing",
      definition: "An automated safety valve positioned at the outlet of a pasteurizer hold tube that automatically diverts under-heated liquid product back to the raw balance tank if temperature drops below critical limits.",
      collocations: ["actuate the flow diversion valve", "fail-safe diversion response time", "divert sub-pasteurized milk", "FDV seat seal integrity"],
      falseFriends: "'Diversion' in fluid engineering means rerouting flow, not entertainment or distraction.",
      nativeUsage: "The RTD sensor triggered the flow diversion valve within 200 milliseconds of detecting a drop to 71.5°C."
    },
    {
      term: "ATP Bioluminescence Assay",
      ipa: "/ˌeɪ.tiːˈpiː ˌbaɪ.oʊˌluː.mɪˈnɛs.əns ˈæs.eɪ/",
      es: "Ensayo de Bioluminiscencia de ATP",
      category: "Sanitation Metrology",
      definition: "A rapid optical swab test utilizing firefly luciferase enzymes to measure cellular adenosine triphosphate (ATP), providing quantitative surface cleanliness results in Relative Light Units (RLU) within seconds.",
      collocations: ["verify sanitation via ATP swabs", "RLU cleanliness threshold", "luciferase enzymatic reaction", "pre-operational ATP inspection"],
      falseFriends: "ATP testing measures organic residual soil, not living bacteria specifically; a low ATP score proves cleanliness, not sterility.",
      nativeUsage: "Before commencing production, the sanitation supervisor swabbed the stainless steel hopper, recording an ATP reading of 12 RLU."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Determining Critical Control Points via the Codex Decision Tree",
      botQuestion: "In a poultry processing plant in Querétaro, whole chicken carcasses pass through a chlorinated chilling water bath (Water temperature: 1.5°C; Free available chlorine: 50 ppm; Residence time: 45 minutes) designed to eliminate Salmonella and Campylobacter. Apply the Codex Decision Tree questions: 1) Is there a hazard at this step? 2) Are control measures in place? 3) Is this step specifically designed to eliminate or reduce the hazard to an acceptable level? Conclude whether the immersion chiller is a Critical Control Point (CCP) and define its Critical Limits.",
      requiredKeywords: ["ccp", "critical control point", "critical limit", "chlorine", "temperature", "salmonella"],
      minKeywords: 3,
      feedbackSuccess: "Spot on HACCP analysis! 1) Yes, Salmonella and Campylobacter cross-contamination is a high biological hazard; 2) Yes, chilled water, chemical dosing, and residence time controls exist; 3) Yes, the immersion chiller is specifically engineered to reduce microbial populations to an acceptable level. Therefore, Question 3 confirms this step IS a Critical Control Point (CCP-1). Critical Limits must specify: Water temperature <= 4.0°C, Free available chlorine 50–100 ppm, and minimum carcass contact time >= 40 minutes.",
      feedbackRetry: "Walk through the three decision tree questions: confirm the biological hazard (Salmonella), describe the control measures (chlorine and chilling), and state whether this step is specifically designed to eliminate the hazard. Conclude that it is a CCP with specific temperature and chlorine limits."
    },
    {
      step: 2,
      concept: "Executing Vector Swabbing following a Zone 3 Listeria Presumptive Positive",
      botQuestion: "During weekly EMP testing, an environmental sponge swab from a Zone 3 floor drain located between the packaging room and the raw processing hallway tests 'presumptive positive' for Listeria species. Outline the immediate corrective actions, explain the principle of 'Vector Swabbing', and establish the re-testing criterion required to declare the niche eradicated.",
      requiredKeywords: ["vector", "swab", "drain", "sanitation", "consecutive", "negative"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding food safety response! Corrective actions: 1) Quarantine the area and perform immediate mechanical scrub down and foaming with peracetic acid/quaternary ammonium sanitizers; 2) Vector Swabbing (Radial Swabbing): Take sponge swabs in a 360-degree starburst pattern (at least 4 to 8 swabs radiating 1 to 5 meters outwards onto floors, walls, forklift wheels, and adjacent equipment legs) to pinpoint the exact harborage source; 3) Re-testing: Execute intensive daily swabbing for three consecutive production days—the site cannot be declared eradicated until all vector swabs return 100% negative for Listeria.",
      feedbackRetry: "Define the immediate chemical sanitation protocol, explain how 'Vector Swabbing' samples points radially outwards from the positive drain to trace the origin, and mention the standard requirement of 3 consecutive days of negative test results."
    }
  ],
  quiz: [
    {
      q: "Why is Listeria monocytogenes considered one of the most formidable bacterial threats in refrigerated food processing plants?",
      options: [
        "It can only survive in temperatures above 80°C",
        "It is a psychrotrophic pathogen that can actively multiply at refrigeration temperatures (down to 0°C) and forms resilient biofilms on damp stainless steel",
        "It turns food a bright green color within ten seconds",
        "It is only found in dry desert sand"
      ],
      answer: 1
    },
    {
      q: "Under the 7 Principles of HACCP, what is the definition of a Critical Limit?",
      options: [
        "The maximum amount of money a company can spend on advertising",
        "A scientifically validated maximum or minimum threshold (such as temperature, time, or pH) that must be maintained at a CCP to prevent food contamination",
        "The number of workers allowed on the packaging floor at one time",
        "The legal weight of a shipping container"
      ],
      answer: 1
    },
    {
      q: "In an industrial Environmental Monitoring Program (EMP), what does 'Zone 1' represent?",
      options: [
        "The parking lot outside the security gate",
        "Surfaces that come into direct physical contact with food products (e.g., conveyor belts, slicer blades, filling nozzles)",
        "The corporate executive offices",
        "The boiler room in the basement"
      ],
      answer: 1
    },
    {
      q: "What is the primary function of a Flow Diversion Valve (FDV) in a continuous milk or juice pasteurizer?",
      options: [
        "To add sugar and artificial flavoring to the liquid",
        "To automatically reroute under-heated product back to the raw balance tank if temperature drops below the required critical limit, preventing contaminated product from reaching the filler",
        "To increase the speed of the packaging machine by 200%",
        "To pump wastewater into municipal sewers"
      ],
      answer: 1
    }
  ]
};

// food-m2
const food_m2 = {
  id: "food-m2",
  title: "Thermal Preservation: Pasteurization, Retort Canning and Aseptic Filling",
  titleES: "Preservación Térmica: Pasteurización, Retortas y Llenado Aséptico",
  icon: "fa-solid fa-temperature-high",
  isGoldModel: true,
  readings: [
    {
      id: "food-m2-r1",
      title: "Thermal Kinetics: D-Value, Z-Value, F0 12D Botulinum Cook & Aseptic Systems",
      duration: "15 min",
      content: `
# Thermal Kinetics: D-Value, Z-Value, F0 12D Botulinum Cook & Aseptic Systems

Thermal processing represents the most widespread and historically significant preservation method in human food civilization. From Nicolas Appert's original glass jar canning experiments for Napoleon’s army to modern continuous Ultra-High Temperature (UHT) aseptic beverage plants, the objective remains unvarying: applying sufficient thermal heat energy to destroy pathogenic and spoilage microorganisms and inactivate degrading enzymes, while preserving as much nutritional bioavailability, color, and organoleptic flavor as possible.

Designing industrial thermal preservation schedules requires mastering the mathematics of microbial death kinetics: the **Decimal Reduction Time ($D$-value)**, the **Thermal Resistance Constant ($Z$-value)**, the **Total Lethality Index ($F_0$)**, and the mandatory **$12D$ Botulinum Cook** in commercial steam retorts and aseptic carton fillers.

---

## 1. Microbial Death Kinetics: D-Value and Z-Value

Thermal destruction of microorganisms follows first-order chemical reaction kinetics. When subjected to a constant lethal temperature, a bacterial population decreases logarithmically over time:

$$\\log_{10}(N) = \\log_{10}(N_0) - \\frac{t}{D}$$

Where $N_0$ is the initial microbial population, $N$ is surviving population after heating time $t$, and $D$ is the Decimal Reduction Time.

### Decimal Reduction Time ($D$-value)
The time in minutes required at a specific constant temperature ($T$) to destroy $90\\%$ (one logarithmic cycle) of a specific target microbial population:

$$D_T = \\frac{t}{\\log_{10}(N_0) - \\log_{10}(N)}$$

*Example*: If a strain of *Salmonella enterica* in mango juice has a $D_{65^\\circ\\text{C}} = 0.40\\ \\text{minutes}$, heating the juice at $65^\\circ\\text{C}$ for $0.40\\ \\text{minutes}$ reduces the population from $1,000,000\\ (10^6)$ cells down to $100,000\\ (10^5)$ cells. Reducing it to $1\\ (10^0)$ cell requires $6 \\times D = 2.4\\ \\text{minutes}$ ($6D$ process).

### Thermal Resistance Constant ($Z$-value)
Quantifies the temperature dependency of the $D$-value. The $Z$-value represents the temperature increase (in degrees Celsius or Fahrenheit) required to reduce the $D$-value by a factor of 10 ($90\\%$ reduction in processing time):

$$Z = \\frac{T_2 - T_1}{\\log_{10}(D_1) - \\log_{10}(D_2)}$$

For *Clostridium botulinum* spores, the universal regulatory reference values are:
- Reference Temperature: $T_{\\text{ref}} = 121.1^\\circ\\text{C}\\ (250^\\circ\\text{F})$.
- Reference $D$-value: $D_{121.1^\\circ\\text{C}} = 0.21\\ \\text{minutes}$.
- Thermal $Z$-value: $Z = 10.0^\\circ\\text{C}\\ (18^\\circ\\text{F})$.

---

## 2. Total Lethality & The 12D Botulinum Cook ($F_0$)

In real-world food containers, temperature is never instantaneous; cans heat up slowly and cool down gradually. Total thermal lethality accumulated throughout the entire heating and cooling cycle is integrated into the **Lethality Index ($F_0$)**:

$$F_0 = \\int_0^t 10^{\\frac{T(t) - 121.1}{Z}} \\, dt$$

Where $T(t)$ is the real-time core temperature at the slowest-heating point (the **cold spot**) of the container, measured using calibrated wireless thermocouple dataloggers.

### The 12D Process for Low-Acid Canned Foods (LACF)
Under FDA 21 CFR Part 113, all shelf-stable low-acid foods (equilibrium $\\text{pH} > 4.60$ and water activity $A_w > 0.85$, such as canned meats, refried beans, and soups) must undergo a minimum **$12D$ thermal botulinum cook**:
$$\\text{Minimum } F_0 = 12 \\times D_{121.1} = 12 \\times 0.21\\ \\text{min} = 2.52\\ \\text{minutes}$$

In industrial commercial practice, Process Authorities establish target **$F_0$ values between $4.0$ and $6.0\\ \\text{minutes}$** to build an engineering safety margin against high spore bioburden, variable fill weights, and steam distribution cold spots inside the retort.

---

## 3. Retort Canning vs. Continuous HTST & UHT Aseptic Processing

Depending on product rheology and packaging format, thermal preservation is divided into two primary processing architectures:

\`\`\`
Thermal Processing Paradigms:
[ Retort In-Container Sterilization ]   Product packaged raw in cans/pouches, then cooked inside autoclave.
                                       High thermal exposure (121°C for 20-50 min). High flavor degradation.
                                       
[ UHT / Continuous Aseptic Filling ]   Liquid sterilized in seconds (140°C for 4 sec) in tube-in-tube exchangers.
                                       Cooled, then pumped into sterile cartons inside sterile laminar chamber.
\`\`\`

### 1. Industrial Retort Autoclaves (Batch & Continuous)
- **Overpressure Water Immersion / Water Spray Retorts**: Designed for flexible retort pouches and polypropylene trays that would burst under internal pressure if not counterbalanced by external compressed air overpressure ($2.0\\text{--}3.5\\ \\text{bar}$).
- **Rotary Retorts**: The autoclave cage rotates cans at $10\\text{--}25\\ \\text{RPM}$, inducing forced convection inside liquid products, slashing cold-spot heating time by up to $60\\%$.

### 2. UHT & Aseptic Packaging (Tetra Pak / Combibloc)
- **Direct Steam Injection (DSI) / Infusion**: Pure culinary steam is injected directly into the milk or plant beverage, flashing temperature to $145^\\circ\\text{C}$ in $0.1\\ \\text{seconds}$, followed by flash-vacuum chamber cooling to remove the condensed water vapor.
- **Indirect Tubular Heat Exchangers**: Triple-tube concentric heat exchangers with product-to-product heat regeneration efficiency exceeding $85\\%$.
- **Aseptic Barrier Cartons**: Pre-sterilized multi-layer composite packaging (Polyethylene / Paperboard / Polyethylene / Aluminum Foil / Polyethylene) sterilized in-line with vaporized hydrogen peroxide ($H_2O_2$) and hot sterile air before aseptic filling and ultrasonic hermetic sealing.

---

## 4. Engineering Field Scenario: Retort Temperature Deviation Containment

At a shelf-stable refried bean canning plant in Culiacán, Sinaloa, exporting 15-ounce steel cans to the southwestern US:

### The Operational Deviation
During Retort Batch #84 inside Steam Retort #3 (holding 4,200 cans of refried pinto beans), the main boiler facility experienced an electrical brownout at minute 18 of a 35-minute cook cycle:
- Retort steam pressure dropped from $1.4\\ \\text{bar}$ to $0.6\\ \\text{bar}$.
- Retort chamber temperature plunged from $121.5^\\circ\\text{C}$ down to $112.0^\\circ\\text{C}$ for 7 minutes before secondary auxiliary steam boilers restored pressure.

### The Thermal Process Authority Intervention
Under 21 CFR 113.89, any temperature drop below the scheduled retort temperature is a mandatory **Scheduled Process Deviation**:
1. **Immediate Retort Hold & Quarantine**: The retort operator extended the cook cycle by 12 minutes under manual steam override. The entire batch of 4,200 cans was segregated in the holding warehouse with physical red lockouts.
2. **Cold-Spot Thermocouple Numerical Integration**: The plant’s certified Process Authority downloaded the wireless Ellab thermocouple temperature logs from the reference cold-spot can (located in the geometric center of Can #4 in the bottom retort basket):
   - Conduction-heating refried beans heat via slow molecular diffusion, meaning the cold spot temperature dipped only to $114.2^\\circ\\text{C}$ due to thermal inertia.
   - The Process Authority executed General Method numerical integration of the lethal rate curve ($L = 10^{(T - 121.1)/10}$):
     $$F_0 = \\sum L_i \\cdot \\Delta t = 4.82\\ \\text{minutes}$$
3. **Regulatory Disposition**: Because the integrated $F_0$ of $4.82\\ \\text{minutes}$ comfortably exceeded the regulatory minimum of $3.0\\ \\text{minutes}$ ($12D$ botulinum cook), the Process Authority formally signed off on a deviation release report, certifying that commercial sterility had been achieved without destroying product viscosity or safety.

---

> **Key Takeaway**: Thermal food engineering reconciles microbial lethality with nutritional preservation. By calculating $D$-values, $Z$-values, and integrating cold-spot $F_0$ curves to enforce the $12D$ botulinum cook, process authorities guarantee absolute shelf-stability in low-acid foods.
`
    }
  ],
  dialogue: {
    title: "Evaluating a Cold-Spot Thermocouple Curve for Low-Acid Retort Canning",
    titleES: "Evaluando una Curva de Termopar de Punto Frío para Retortas de Alimentos de Baja Acidez",
    scenarioContext: "A Certified Process Authority in Querétaro and a Retort Operations Director in Chicago review thermal penetration datalogger curves for a newly formulated shelf-stable black bean puree.",
    characters: [
      { name: "Warren Hastings", role: "Director of Retort Operations", company: "Heartland Foods (Chicago, IL)" },
      { name: "Dra. Carmen Belmonte", role: "Certified Thermal Process Authority", company: "Centro Agroindustrial del Bajío (Querétaro, Qro)" }
    ],
    turns: [
      {
        speaker: "Warren Hastings",
        text: "Dra. Belmonte, our R&D group in Chicago reformulated the black bean puree by increasing the starch concentration to enhance creaminess. We just pulled the wireless thermocouple data from the thermal penetration test in our water-spray retort. The heating curve shows significant lag.",
        translation: "Dra. Belmonte, nuestro grupo de I+D en Chicago reformuló el puré de frijol negro incrementando la concentración de almidón para mejorar la cremosidad. Acabamos de extraer los datos de termopares inalámbricos de la prueba de penetración térmica en nuestra retorta de aspersión de agua. La curva de calentamiento muestra un retraso significativo.",
        targetTerms: ["reformulated the puree", "wireless thermocouple data", "thermal penetration test", "heating curve shows lag"]
      },
      {
        speaker: "Dra. Carmen Belmonte",
        text: "That is precisely what we anticipated, Warren. Higher starch viscosity transitions the heat transfer mechanism from convective mixing to pure conduction. Looking at probe seven positioned at the geometric center of the pouch, the product required twenty-two minutes just to cross one hundred and ten degrees Celsius.",
        translation: "Eso es precisamente lo que anticipábamos, Warren. La mayor viscosidad del almidón cambia el mecanismo de transferencia de calor de mezcla convectiva a pura conducción. Al ver la sonda siete colocada en el centro geométrico de la bolsa, el producto requirió veintidós minutos solo para cruzar los 110 grados Celsius.",
        targetTerms: ["starch viscosity", "convective mixing", "pure conduction", "geometric center"]
      },
      {
        speaker: "Warren Hastings",
        text: "What is our integrated F-zero value at the end of the forty-minute cook cycle? Did we achieve the minimum twelve-D botulinum lethality?",
        translation: "¿Cuál es nuestro valor F-cero integrado al final del ciclo de cocción de cuarenta minutos? ¿Alcanzamos la letalidad mínima doce-D de botulinum?",
        targetTerms: ["integrated F-zero value", "cook cycle", "twelve-D botulinum lethality"]
      },
      {
        speaker: "Dra. Carmen Belmonte",
        text: "Integrating the lethality curve with a z-value of ten degrees Celsius yields an F-zero of only two point one minutes. That fails both our FDA scheduled process requirement of three point zero minutes and our internal corporate safety target of five point zero minutes.",
        translation: "Integrar la curva de letalidad con un valor z de diez grados Celsius arroja un F-cero de solo 2.1 minutos. Eso reprueba tanto nuestro requerimiento de proceso programado de la FDA de 3.0 minutos como nuestro objetivo de seguridad corporativo interno de 5.0 minutos.",
        targetTerms: ["z-value of ten degrees", "F-zero of only two point one", "fails both requirements", "corporate safety target"]
      },
      {
        speaker: "Warren Hastings",
        text: "If we simply extend the static retort cycle time by ten minutes, we will scorch the bean paste against the pouch walls, creating severe dark discoloration and burnt off-flavors.",
        translation: "Si simplemente extendemos el tiempo de ciclo de retorta estática por diez minutos, quemaremos la pasta de frijol contra las paredes de la bolsa, generando una severa decoloración oscura y sabores a quemado.",
        targetTerms: ["extend the static retort cycle", "scorch the bean paste", "discoloration", "burnt off-flavors"]
      },
      {
        speaker: "Dra. Carmen Belmonte",
        text: "Then we must introduce agitation. If we run this product in our continuous rotary retort at fifteen RPM, the internal headspace bubble will force continuous axial mixing through the viscous puree. That should triple our heat penetration rate and deliver an F-zero of six point zero in thirty minutes without thermal scorching.",
        translation: "Entonces debemos introducir agitación. Si corremos este producto en nuestra retorta rotativa continua a quince RPM, la burbuja del espacio de cabeza forzará un mezclado axial continuo a través del puré viscoso. Eso debería triplicar nuestra tasa de penetración de calor y entregar un F-cero de 6.0 en treinta minutos sin quemado térmico.",
        targetTerms: ["introduce agitation", "continuous rotary retort", "axial mixing", "without thermal scorching"]
      }
    ],
    contrastTips: [
      {
        school: "We cooked the food until it was boiling hot.",
        native: "We integrated cold-spot thermocouple curves to verify a minimum F-zero lethality of five point zero minutes.",
        explanation: "Commercial canning requires mathematical verification of thermal lethality ($F_0$) at the container cold spot, not arbitrary subjective boiling."
      },
      {
        school: "Pasteurized milk is sterilized milk.",
        native: "Pasteurization destroys vegetative pathogens (requiring cold chain storage), whereas UHT delivers complete commercial sterility.",
        explanation: "Pasteurization eliminates vegetative pathogens while leaving thermoresistant spores intact; UHT processing renders milk shelf-stable at room temperature."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "D-Value (Decimal Reduction Time)",
      ipa: "/ˈdiː ˌvæl.juː/",
      es: "Valor D (Tiempo de Reducción Decimal)",
      category: "Thermal Kinetics",
      definition: "The time in minutes required at a constant temperature to kill 90% (one logarithmic reduction) of a specific target microbial population.",
      collocations: ["calculate the D-value at 121°C", "D-value of Clostridium botulinum", "one-log population reduction", "thermal resistance testing"],
      falseFriends: "The D-value is measured in units of time (minutes), not temperature or unitless ratios.",
      nativeUsage: "The laboratory established that Salmonella in orange juice has a D-value of 0.35 minutes at 65 degrees Celsius."
    },
    {
      term: "Z-Value",
      ipa: "/ˈzɛd ˌvæl.juː / ˈziː ˌvæl.juː/",
      es: "Valor Z (Constante de Resistencia Térmica)",
      category: "Thermal Kinetics",
      definition: "The change in temperature required to change the microbial D-value by a factor of 10 (one logarithmic cycle), quantifying the temperature sensitivity of the organism.",
      collocations: ["assume a z-value of 10°C", "z-value temperature sensitivity", "calculate thermal lethal rate", "Bigelow model z-value"],
      falseFriends: "The Z-value is measured in temperature units (°C or °F), unlike the D-value which is measured in time.",
      nativeUsage: "For low-acid thermal canning calculations, FDA regulations mandate a standardized z-value of 10.0°C (18°F) for botulinum spores."
    },
    {
      term: "F0 Lethality Value",
      ipa: "/ˌɛf ˈzɪə.roʊ ˈlɛθ.əl.ɪ.ti ˌvæl.juː/",
      es: "Valor de Letalidad F0",
      category: "Process Authority",
      definition: "The equivalent time in minutes at 121.1°C (250°F) delivering the same total microbial lethality as the actual integrated time-temperature heating profile at the container cold spot.",
      collocations: ["achieve an F0 of at least 3.0 minutes", "integrate cold-spot F0", "target commercial sterility F0", "F0 deviation review"],
      falseFriends: "F0 is an integrated equivalent time, not the total clock time the retort spends running.",
      nativeUsage: "Although the can spent 40 minutes in the retort, the integrated F0 at the cold spot reached exactly 5.2 minutes."
    },
    {
      term: "Retort Sterilization",
      ipa: "/rɪˈtɔːrt ˌstɛr.əl.aɪˈzeɪ.ʃən/",
      es: "Esterilización en Retorta (Autoclave Industrial)",
      category: "Food Preservation",
      definition: "An industrial pressure vessel using pressurized saturated steam, hot water immersion, or water spray with compressed air overpressure to commercially sterilize sealed cans or pouches.",
      collocations: ["overpressure water-spray retort", "continuous rotary retort", "load crates into the retort", "retort scheduled process"],
      falseFriends: "A retort in food processing is an industrial autoclave; it does not mean an angry verbal answer.",
      nativeUsage: "The flexible retort pouches were sterilized in an overpressure water immersion retort to prevent pouch seals from bursting."
    },
    {
      term: "UHT (Ultra-High Temperature) Processing",
      ipa: "/ˌjuː.eɪtʃˈtiː ˈprɒs.ɛs.ɪŋ/",
      es: "Procesamiento UHT (Ultra Alta Temperatura)",
      category: "Continuous Processing",
      definition: "A continuous flow thermal treatment heating liquid foods to 135–150°C for 2–5 seconds, followed by rapid flash cooling and aseptic packaging to produce shelf-stable products.",
      collocations: ["UHT continuous tubular system", "direct steam injection UHT", "shelf-stable UHT dairy milk", "aseptic tank buffering"],
      falseFriends: "UHT milk is commercially sterile and requires zero refrigeration before opening, unlike pasteurized HTST milk.",
      nativeUsage: "The dairy cooperative installed a direct steam injection UHT line capable of processing 15,000 liters of milk per hour."
    },
    {
      term: "Aseptic Packaging",
      ipa: "/eɪˈsɛp.tɪk ˈpæk.ɪ.dʒɪŋ/",
      es: "Envasado Aséptico",
      category: "Packaging Technology",
      definition: "The commercial filling of pre-sterilized and cooled food into pre-sterilized packaging containers inside a hermetically sealed, sterile laminar airflow enclosure.",
      collocations: ["fill in an aseptic chamber", "hydrogen peroxide vapor sterilization", "multi-layer aseptic carton", "maintain aseptic seal hermeticity"],
      falseFriends: "Aseptic packaging sterilizes product and packaging separately before filling, unlike retort canning which cooks both together.",
      nativeUsage: "The organic soymilk was packaged in multi-layer aseptic cartons with an ambient shelf-life of twelve months."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Calculating 12D Process Time from D-Values",
      botQuestion: "A food microbiology lab determines that Clostridium sporogenes PA 3679 spores (a heat-resistant surrogate for Clostridium botulinum) in a canned meat stew have a D-value of D121.1 = 0.85 minutes. What is the minimum thermal holding time at 121.1°C required to achieve a 12D cook? If the initial spore load in the raw stew is 10^4 spores per can, what is the theoretical probability of a surviving spore in a finished can?",
      requiredKeywords: ["10.2", "12d", "spores", "minutes", "probability", "surviving"],
      minKeywords: 3,
      feedbackSuccess: "Spot on thermal arithmetic! 1) Holding time = 12 * D121.1 = 12 * 0.85 minutes = 10.2 minutes of equivalent holding at 121.1°C; 2) Surviving population: Starting at N0 = 10^4 spores and subtracting 12 log cycles yields 10^(4 - 12) = 10^-8 spores per can. This equates to a probability of only 1 non-sterile can in every 100,000,000 processed cans, satisfying commercial sterility requirements.",
      feedbackRetry: "Multiply the D-value (0.85 min) by 12 to find the total 12D processing time. Then subtract 12 from the starting log exponent (10^4) to determine the surviving spore concentration."
    },
    {
      step: 2,
      concept: "Evaluating Heat Transfer Mechanics in Liquid vs Solid Canned Foods",
      botQuestion: "A cannery in Sinaloa packs both whole-kernel sweet corn in liquid brine and thick cream-style corn puree into identical 16-ounce tin cans. Explain why the cream-style corn requires almost triple the retort cooking time of the whole-kernel corn to achieve the same F0 lethality at the cold spot, referencing convective vs conductive heat transfer.",
      requiredKeywords: ["convection", "conduction", "viscosity", "cold spot", "heat transfer", "brine"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding thermal physics analysis! Whole-kernel corn in low-viscosity liquid brine heats predominantly through natural Convection currents: heated brine becomes less dense and rises rapidly, driving turbulent fluid circulation that heats the can quickly. In contrast, cream-style corn is a thick, highly viscous starch paste that prevents convective fluid movement; heat can only penetrate through molecular Conduction, which is orders of magnitude slower. Therefore, the geometric cold spot takes significantly longer to reach sterilizing temperatures, requiring longer retort cycles.",
      feedbackRetry: "Contrast the heat transfer mechanisms: low-viscosity brine allows rapid Convection (fluid circulating currents), while viscous starch puree restricts movement and relies on slow Conduction (heat diffusing slowly through solid matter)."
    }
  ],
  quiz: [
    {
      q: "In thermal food processing, what does the D-value represent?",
      options: [
        "The diameter of the processing pipe",
        "The time in minutes at a given constant temperature required to destroy 90% (one log cycle) of a microbial population",
        "The maximum dilution ratio of chemical sanitizers",
        "The density of the liquid food"
      ],
      answer: 1
    },
    {
      q: "What is the mandatory minimum thermal process for low-acid canned foods (LACF) to destroy Clostridium botulinum spores?",
      options: [
        "Heating in an open kettle at 80°C for 5 minutes",
        "A 12D thermal process delivering a minimum F0 lethality of at least 2.5 to 3.0 minutes",
        "Freezing the cans at -20°C for three weeks",
        "Washing the outer can surface with chlorine bleach"
      ],
      answer: 1
    },
    {
      q: "What is the primary operational difference between Retort Canning and Aseptic Packaging?",
      options: [
        "Retort canning uses cardboard; aseptic packaging uses heavy glass",
        "Retort canning cooks product and packaging together inside an autoclave, whereas aseptic processing sterilizes food and packaging separately before filling in a sterile environment",
        "Aseptic packaging is only used for solid raw meats",
        "Retort canning eliminates all vitamins permanently"
      ],
      answer: 1
    },
    {
      q: "Why is rotational agitation utilized in continuous rotary retorts for viscous foods?",
      options: [
        "To make the cans look polished",
        "To force the internal headspace bubble through the liquid, inducing forced convective mixing and slashing thermal penetration time",
        "To cool the retort down with ambient wind",
        "To prevent operators from touching the cans"
      ],
      answer: 1
    }
  ]
};

console.log("Saving food_m1 and food_m2...");

module.exports = { food_m1, food_m2 };
