/**
 * scripts/append_food_3_4_5.cjs
 * Appends food_m3, food_m4, food_m5 and updates food-science track to "full".
 */

const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '../content/courses.js');
const { LXP_COURSES } = require(coursesPath);

// Require food_m1 and food_m2 from build_food_science_gold.cjs
// First let's make sure build_food_science_gold exports them:
let part1Code = fs.readFileSync(path.join(__dirname, 'build_food_science_gold.cjs'), 'utf-8');
if (!part1Code.includes("module.exports =")) {
  part1Code += `\nmodule.exports = { food_m1, food_m2 };\n`;
  fs.writeFileSync(path.join(__dirname, 'build_food_science_gold.cjs'), part1Code, 'utf-8');
}

const { food_m1, food_m2 } = require('./build_food_science_gold.cjs');
console.log("Imported food_m1 and food_m2 successfully.");

// food-m3
const food_m3 = {
  id: "food-m3",
  title: "Modified Atmosphere Packaging (MAP) & Barrier Polymers",
  titleES: "Envasado en Atmósfera Modificada (MAP) y Polímeros de Barrera",
  icon: "fa-solid fa-box-tissue",
  isGoldModel: true,
  readings: [
    {
      id: "food-m3-r1",
      title: "Modified Atmosphere Packaging (MAP): Gas Tri-Blends, EVOH Barrier Films & Shelf-Life Extension",
      duration: "15 min",
      content: `
# Modified Atmosphere Packaging (MAP): Gas Tri-Blends, EVOH Barrier Films & Shelf-Life Extension

Modern retail consumers demand fresh, preservative-free foods with extended shelf life—fresh-cut salads that remain crisp for two weeks, fresh red meat that retains its bright ruby-red color for days in display cases, and artisanal fresh pasta that resists mold spoilage without added chemical sorbates. Delivering this quality across continental supply chains requires **Modified Atmosphere Packaging (MAP)**, a sophisticated preservation technology that alters the internal gas composition surrounding the food inside high-barrier hermetically sealed polymer pouches.

Mastering MAP engineering requires understanding the biochemistry of the **Primary Protective Gas Tri-Blend ($CO_2, N_2, O_2$)**, the permeability physics of **Barrier Polymers (EVOH, PVDC, oriented polyamides)**, and the integration of **Active Packaging Scavengers**.

---

## 1. The Biochemistry of Modified Atmosphere Gas Tri-Blends

Unlike vacuum packaging which collapses flexible pouches around delicate products, MAP displaces ambient atmospheric air ($78\\%\\ N_2, 21\\%\\ O_2, 0.04\\%\\ CO_2$) with tailored gas formulations engineered for specific physiological matrices:

\`\`\`
MAP Industrial Gas Formulation Spectrum:
Target Food Matrix:          Gas Formulation (CO2 / N2 / O2):     Preservation Objective:
Fresh Red Beef / Lamb        70% O2 / 30% CO2 / 0% N2             Preserves oxymyoglobin red bloom while CO2 inhibits bacteria.
Fresh Bakery & Hard Cheeses  0% O2 / 30% CO2 / 70% N2             Complete O2 starvation halts mold; N2 prevents pouch crush.
Fresh-Cut Salads & Berries   3-5% O2 / 5-8% CO2 / Balance N2      Maintains minimal respiration; prevents anaerobic fermentation.
Raw Poultry & Pork           0% O2 / 40% CO2 / 60% N2             CO2 halts Pseudomonas spoilage; avoids myoglobin oxidation.
\`\`\`

### 1. Carbon Dioxide ($CO_2$): The Active Antimicrobial Shield
$CO_2$ is the sole bacteriostatic and fungistatic component in standard MAP mixtures. When flushed into a pack, gaseous $CO_2$ dissolves directly into the aqueous and lipid phases of the food:

$$\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-$$

The resulting carbonic acid lowers localized intracellular pH and dissolves directly into bacterial cell membranes, disrupting nutrient transport enzymes and cellular decarboxylation reactions. $CO_2$ aggressively inhibits common aerobic spoilage organisms (such as *Pseudomonas* species). 
- *The Volume Dissolution Trap*: Because $CO_2$ dissolves rapidly into moisture, packaging moist products with $>50\\%\\ CO_2$ creates an internal vacuum over 48 hours, causing package shrinkage or **pack collapse** unless buffered with inert filler gases.

### 2. Nitrogen ($N_2$): The Inert Mechanical Cushion
Nitrogen is tasteless, odorless, and virtually insoluble in water and fat. It functions as an inert filler gas, displacing oxygen to prevent lipid oxidation and cushioning fragile products (such as potato chips or leafy greens) against mechanical crushing during shipping.

### 3. Oxygen ($O_2$): The Selective Metabolic Regulator
While oxygen is generally eliminated from food packaging to prevent oxidative rancidity and aerobic microbial growth, it is intentionally retained in two critical applications:
- **Red Meat Color Dynamics**: Deoxymyoglobin (purple) requires high oxygen ($60\\text{--}80\\%\\ O_2$) to form **oxymyoglobin**, creating the bright cherry-red color expected by supermarket consumers.
- **Fresh Produce Respiration (Equilibrium MAP - EMAP)**: Fresh-cut fruits and vegetables are living tissues that continue to respire post-harvest (consuming $O_2$ and exhaling $CO_2$). Completely starving produce of oxygen below $1\\text{--}2\\%\\ O_2$ triggers anaerobic fermentation, producing ethanol, acetaldehyde, and repulsive off-odors.

---

## 2. High-Barrier Polymers & Permeability Kinetics (OTR / WVTR)

A modified gas atmosphere is worthless if the packaging material leaks gas across its molecular matrix. Barrier polymers are evaluated by two thermodynamic permeability benchmarks:

### 1. Oxygen Transmission Rate (OTR)
The volume of oxygen gas passing through a square meter of film per 24 hours under standardized temperature and humidity conditions:

$$\\text{OTR} = \\frac{\\text{cm}^3}{\\text{m}^2 \\cdot 24\\ \\text{h} \\cdot \\text{bar}} \\quad (\\text{at } 23^\\circ\\text{C}, 0\\%\\ \\text{RH per ASTM D3985})$$

### 2. Water Vapor Transmission Rate (WVTR)
$$\\text{WVTR} = \\frac{\\text{g}}{\\text{m}^2 \\cdot 24\\ \\text{h}} \\quad (\\text{at } 38^\\circ\\text{C}, 90\\%\\ \\text{RH per ASTM F1249})$$

\`\`\`
Multi-Layer Co-Extruded Barrier Structure:
[ Outer Print Layer: Polyethylene Terephthalate (PET) ]  Mechanical puncture resistance & gloss
[ Core Tie-Layer: Modified Polyolefin Adhesive ]        Bonding incompatible polymers
[ Central High-Barrier: Ethylene Vinyl Alcohol (EVOH) ]   Near-zero OTR (<0.5 cm3/m2/day)
[ Inner Tie-Layer: Modified Polyolefin Adhesive ]        Bonding incompatible polymers
[ Inner Sealant Layer: Polyethylene (LDPE / LLDPE) ]     Low-temperature hermetic heat sealing
\`\`\`

### The Unique Physics of EVOH (Ethylene Vinyl Alcohol)
EVOH delivers the lowest oxygen permeability of any commercial resin ($OTR < 0.2\\ \\text{cm}^3/\\text{m}^2\\cdot\\text{day}$). However, the hydroxyl ($-OH$) groups that make EVOH such a tight gas barrier are highly hydrophilic: in high-humidity environments ($>75\\%\\ \\text{RH}$), water molecules plasticize the EVOH polymer chains, causing its oxygen barrier to collapse by over $1,000\\%$. To protect it, packaging engineers sandwich EVOH between hydrophobic polyolefin layers (PE or PP) in 5-to-9-layer co-extruded films.

---

## 3. Active Packaging & Headspace Integrity Verification

When passive barrier films alone cannot maintain target atmospheres, **Active Packaging** technologies interact chemically with the package environment:

### Oxygen Scavengers (Ferrous Oxide Sachets)
Sachets containing powdered iron and sodium chloride catalysts react irreversibly with trapped headspace oxygen:

$$4\\text{Fe} + 3\\text{O}_2 + 6\\text{H}_2\\text{O} \\rightarrow 4\\text{Fe(OH)}_3$$

Oxygen scavengers pull residual headspace $O_2$ down from $0.5\\%$ to **$<0.01\\%$ (less than 100 ppm)** within 24 hours, preventing mold growth on bakery goods and nuts without adding chemical additives.

### Quality Control: Headspace Gas Chromatography
Before shipping palletized product, technicians test random sample packs using optical or electrochemical headspace gas analyzers (ASTM F2714):
- A syringe needle is pushed through a self-adhesive septum on the package lid.
- The instrument draws $10\\ \\text{mL}$ of headspace gas, displaying exact $\%\\ O_2$ and $\%\\ CO_2$ concentrations in seconds.
- Packaging lines also incorporate **high-voltage leak detection (HVLD)** or in-line carbon dioxide sniffer chambers that detect defective micro-channel seals at 120 packs per minute.

---

## 4. Engineering Field Scenario: Mitigating Pack Collapse on Fresh Cheese in Jalisco

At an artisanal cheese packaging plant in Los Altos de Jalisco exporting fresh Panela and Oaxaca cheese to the US market:

### The Packaging Failure
The plant transitioned from vacuum packing to MAP using a $60\\%\\ CO_2 / 40\\%\\ N_2$ gas flush to preserve cheese texture and prevent crushing the delicate curd matrix. However, 24 hours after palletizing, $100\\%$ of the retail pouches experienced severe **pack collapse**:
- The flexible top lidding film contracted tightly around the cheese blocks, squeezing whey moisture out into the pouch and warping the retail cardboard display sleeves.

### The Scientific Root-Cause Diagnosis
1. **$CO_2$ Absorption Dynamics**: Fresh Panela cheese contains $52\\%$ moisture and $24\\%$ butterfat. The high concentration of carbon dioxide dissolved rapidly into the product's liquid and lipid phases, creating a severe partial vacuum inside the hermetically sealed pouch.
2. **Headspace Volumetric Analysis**: The initial gas-to-product volume ratio ($G/P$) was only $0.8:1$. The total volume of dissolved $CO_2$ exceeded the volume of non-condensable nitrogen gas remaining in the headspace.

### The Engineering Solution
1. **Reformulating the Gas Tri-Blend**: Engineers modified the gas flush formulation from $60\\%\\ CO_2 / 40\\%\\ N_2$ to **$30\\%\\ CO_2 / 70\\%\\ N_2$**.
   - $30\\%\\ CO_2$ was validated in microbiology challenge studies as completely sufficient to inhibit psychrotrophic molds and yeasts for 45 days.
   - The $70\\%\\ N_2$ inert fraction provided an incompressible mechanical cushion, permanently preventing internal vacuum formation.
2. **Adjusting the Gas-to-Product Ratio**: The thermoforming mold depth was adjusted to increase the $G/P$ headspace ratio to **$1.5:1$**, ensuring ample nitrogen buffer.
3. **Outcome**: The revised packaging maintained perfect pillow-pack geometry throughout 60 days of refrigerated shelf life, with zero whey syneresis and complete consumer acceptance.

---

> **Key Takeaway**: Modified Atmosphere Packaging extends food freshness through precision atmospheric control. By tuning $CO_2/N_2/O_2$ ratios, deploying multi-layer EVOH barrier films, and preventing pack collapse, packaging engineers safeguard quality across continental supply chains.
`
    }
  ],
  dialogue: {
    title: "Optimizing Modified Atmosphere Ratios for Avocado Export",
    titleES: "Optimizando Ratios de Atmósfera Modificada para Exportación de Aguacate",
    scenarioContext: "A Packaging R&D Engineer in Uruapan, Michoacán, and an Import Produce Category Manager in Los Angeles optimize MAP gas mixtures to double the transit life of fresh-cut avocado halves.",
    characters: [
      { name: "Julian Mercado", role: "Produce Category Sourcing Director", company: "Pacific Fresh Wholesale (Los Angeles, CA)" },
      { name: "Ing. Beatriz Albarrán", role: "Packaging Materials & Post-Harvest Engineer", company: "Michoacán AgroPacking (Uruapan, Michoacán)" }
    ],
    turns: [
      {
        speaker: "Julian Mercado",
        text: "Beatriz, our Southern California supermarket accounts want to retail fresh-cut ready-to-eat avocado halves. The current vacuum-skin packages crush the fruit flesh and cause enzymatic browning within forty-eight hours. Can MAP technology deliver twelve days of display life?",
        translation: "Beatriz, nuestros clientes de supermercados en el sur de California quieren vender mitades de aguacate fresco listas para consumir. Los empaques de vacío actuales aplastan la pulpa de la fruta y causan pardeamiento enzimático en cuarenta y ocho horas. ¿Puede la tecnología MAP entregar doce días de vida en anaquel?",
        targetTerms: ["ready-to-eat avocado halves", "vacuum-skin packages", "enzymatic browning", "display life"]
      },
      {
        speaker: "Ing. Beatriz Albarrán",
        text: "Yes, Julian. The primary failure mechanism is polyphenol oxidase oxidation triggered by ambient oxygen, combined with high post-harvest respiration. We have engineered a multi-layer micro-perforated Equilibrium MAP film incorporating an EVOH barrier and a tailored gas flush.",
        translation: "Sí, Julian. El mecanismo de falla principal es la oxidación por polifenol oxidasa detonada por el oxígeno ambiental, combinada con alta respiración poscosecha. Hemos diseñado una película de Atmósfera Modificada en Equilibrio microperforada multicapa que incorpora una barrera de EVOH y una inyección de gas a la medida.",
        targetTerms: ["polyphenol oxidase oxidation", "post-harvest respiration", "Equilibrium MAP film", "EVOH barrier"]
      },
      {
        speaker: "Julian Mercado",
        text: "What gas mixture are you flushing into the headspace? If you eliminate oxygen completely, do we risk triggering anaerobic fermentation and off-odors?",
        translation: "¿Qué mezcla de gas están inyectando en el espacio de cabeza? Si eliminan el oxígeno por completo, ¿arriesgamos detonar fermentación anaeróbica y malos olores?",
        targetTerms: ["gas mixture", "flushing into the headspace", "anaerobic fermentation", "off-odors"]
      },
      {
        speaker: "Ing. Beatriz Albarrán",
        text: "Exactly. Zero percent oxygen causes the avocado flesh to ferment, producing off-flavors and ethanol. We flush the tray with four percent oxygen, twelve percent carbon dioxide, and eighty-four percent nitrogen. The four percent oxygen keeps respiration aerobic, while the twelve percent CO2 suppresses fungal decay.",
        translation: "Exactamente. Cero por ciento de oxígeno causa que la pulpa del aguacate fermente, produciendo sabores extraños y etanol. Purgamos la bandeja con cuatro por ciento de oxígeno, doce por ciento de dióxido de carbono y ochenta y cuatro por ciento de nitrógeno. El cuatro por ciento de oxígeno mantiene la respiración aeróbica, mientras que el doce por ciento de CO2 suprime el deterioro fúngico.",
        targetTerms: ["ferment", "four percent oxygen", "carbon dioxide", "suppresses fungal decay"]
      },
      {
        speaker: "Julian Mercado",
        text: "How do you maintain that four percent oxygen equilibrium as the fruit continues to respire during the three-day truck transit to Los Angeles?",
        translation: "¿Cómo mantienen ese equilibrio de cuatro por ciento de oxígeno mientras la fruta continúa respirando durante el tránsito en camión de tres días a Los Ángeles?",
        targetTerms: ["maintain equilibrium", "continues to respire", "truck transit"]
      },
      {
        speaker: "Ing. Beatriz Albarrán",
        text: "We utilize laser micro-perforation on the top barrier film. We tune the film's Oxygen Transmission Rate to match the exact respiration rate of the avocado tissue at four degrees Celsius, establishing a permanent equilibrium atmosphere throughout transit and retail display.",
        translation: "Utilizamos microperforación por láser en la película barrera superior. Calibramos la Tasa de Transmisión de Oxígeno de la película para que coincida con la tasa de respiración exacta del tejido de aguacate a cuatro grados Celsius, estableciendo una atmósfera de equilibrio permanente durante todo el tránsito y exhibición.",
        targetTerms: ["laser micro-perforation", "Oxygen Transmission Rate", "respiration rate", "equilibrium atmosphere"]
      }
    ],
    contrastTips: [
      {
        school: "We put the food in plastic bags with air removed.",
        native: "We engineered an Equilibrium Modified Atmosphere Packaging system using multi-layer EVOH barrier films.",
        explanation: "In modern food science, MAP is a precision biochemical preservation technique that balances respiration rates with targeted gas tri-blends, not generic vacuum bagging."
      },
      {
        school: "Carbon dioxide gas in the package is just dead air.",
        native: "Carbon dioxide dissolves into product moisture as carbonic acid, functioning as an active antimicrobial agent.",
        explanation: "CO2 is biochemically active in food packaging, lowering microbial cell pH and directly halting bacterial enzyme activity."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Modified Atmosphere Packaging (MAP)",
      ipa: "/ˈmɒd.ɪ.faɪd ˈæt.məs.fɪər ˈpæk.ɪ.dʒɪŋ/",
      es: "Envasado en Atmósfera Modificada (EAM / MAP)",
      category: "Packaging Science",
      definition: "An industrial packaging technique replacing ambient air inside a package with a tailored protective gas blend (typically CO2, N2, and O2) to slow biochemical degradation and microbial growth.",
      collocations: ["flush with MAP gas blend", "extend shelf life via MAP", "MAP thermoforming tray sealer", "equilibrium MAP for fresh produce"],
      falseFriends: "MAP alters the initial gas atmosphere; Controlled Atmosphere (CA) storage actively monitors and adjusts gases inside entire refrigerated warehouse rooms.",
      nativeUsage: "By switching to Modified Atmosphere Packaging, the poultry processing plant extended fresh chicken breast shelf life from 6 to 16 days."
    },
    {
      term: "Oxygen Transmission Rate (OTR)",
      ipa: "/ˈɒk.sɪ.dʒən trænzˈmɪʃ.ən ˌreɪt/",
      es: "Tasa de Transmisión de Oxígeno (TTO / OTR)",
      category: "Polymer Physics",
      definition: "The measurement of the amount of oxygen gas that passes through a barrier film over a specified surface area and time under controlled temperature and relative humidity.",
      collocations: ["measure OTR per ASTM D3985", "high-barrier low-OTR film", "OTR degradation under humidity", "micro-perforated OTR tuning"],
      falseFriends: "OTR measures gas permeability through the solid polymer matrix; it is distinct from mechanical leaks through package seal channels.",
      nativeUsage: "The co-extruded packaging film exhibited an ultra-low OTR of 0.15 cubic centimeters per square meter per day."
    },
    {
      term: "EVOH (Ethylene Vinyl Alcohol)",
      ipa: "/ˌiː.viː.oʊˈeɪtʃ / ˈɛv.ɒx/",
      es: "EVOH (Copolímero de Etileno y Alcohol Vinílico)",
      category: "Barrier Resins",
      definition: "A high-performance semi-crystalline copolymer resin renowned for delivering exceptional gas barrier properties against oxygen and aromas, commonly co-extruded in multi-layer structures.",
      collocations: ["co-extrude an EVOH barrier layer", "hydrophilic sensitivity of EVOH", "protect EVOH with outer polyolefins", "EVOH thermoformed tray"],
      falseFriends: "EVOH is vulnerable to moisture plasticization, requiring encapsulation between hydrophobic resins like PE or PP.",
      nativeUsage: "The meat packaging film incorporated a 5-micron central core of EVOH to shield the steaks from atmospheric oxygen."
    },
    {
      term: "Headspace Gas Analysis",
      ipa: "/ˈhɛd.speɪs ˈɡæs əˌnæl.ə.sɪs/",
      es: "Análisis de Gases del Espacio de Cabeza",
      category: "Quality Inspection",
      definition: "The analytical measurement of residual oxygen and carbon dioxide concentrations inside the gas pocket (headspace) of a sealed food package to verify MAP integrity.",
      collocations: ["perform destructive headspace gas testing", "measure residual O2 in headspace", "electrochemical headspace sensor", "headspace sampling septum"],
      falseFriends: "Headspace refers specifically to the gas volume above the food inside a package, not human psychology.",
      nativeUsage: "The QA inspector inserted a sampling probe through a foam septum to perform routine headspace gas analysis on line two."
    },
    {
      term: "Pack Collapse (Atmospheric Shrinkage)",
      ipa: "/ˈpæk kəˌlæps/",
      es: "Colapso del Envase (Efecto Vacío Inducido)",
      category: "Packaging Defects",
      definition: "A packaging defect occurring when carbon dioxide dissolves rapidly into the moisture or fat of food, creating an internal partial vacuum that causes flexible films to crush inward.",
      collocations: ["prevent pack collapse with nitrogen", "CO2 solubilization and pack collapse", "internal vacuum formation", "distorted retail tray geometry"],
      falseFriends: "Pack collapse is a chemical gas absorption phenomenon, not physical crushing caused by heavy warehouse stacking.",
      nativeUsage: "Adding 50% nitrogen as an inert filler gas resolved the pack collapse defect on the refrigerated pork loin packages."
    },
    {
      term: "Active Packaging (Oxygen Scavenger)",
      ipa: "/ˈæk.tɪv ˈpæk.ɪ.dʒɪŋ/",
      es: "Envasado Activo (Absorbente de Oxígeno)",
      category: "Functional Packaging",
      definition: "Packaging systems incorporating chemically active substances (such as iron-based scavengers or antimicrobial sachets) that actively absorb undesirable gases or release preservative compounds.",
      collocations: ["insert an oxygen scavenger sachet", "active scavenging mechanism", "reduce residual O2 below 100 ppm", "active barrier technology"],
      falseFriends: "Active packaging interacts chemically with the food or atmosphere, unlike passive packaging which acts strictly as an inert barrier.",
      nativeUsage: "The bakery packaged its gluten-free muffins with an active oxygen scavenger sachet, extending mold-free shelf life to ninety days."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Selecting Gas Tri-Blends to Prevent Enzymatic Browning vs Fermentation",
      botQuestion: "A packaging engineer in Michoacán is tasked with selecting a MAP gas mixture for fresh-cut peeled jicama sticks. Ambient oxygen causes rapid brown discoloration via polyphenol oxidase, but completely removing oxygen (0% O2) triggers anaerobic fermentation and sour off-odors. Propose a balanced gas tri-blend (O2 / CO2 / N2 percentages) and explain the biological function of each gas component.",
      requiredKeywords: ["oxygen", "carbon dioxide", "nitrogen", "respiration", "aerobic", "fermentation"],
      minKeywords: 3,
      feedbackSuccess: "Spot on post-harvest engineering! An optimal gas formulation for fresh-cut jicama: 3–5% O2, 6–10% CO2, and balance N2 (85–91%). Function of each: 1) Low Oxygen (3–5%): High enough to sustain minimal aerobic tissue respiration and prevent anaerobic alcoholic fermentation, but low enough to drastically slow down polyphenol oxidase browning; 2) Carbon Dioxide (6–10%): Dissolves into surface moisture to suppress bacterial and fungal growth; 3) Nitrogen: Inert carrier gas preventing pack collapse and mechanical bruising.",
      feedbackRetry: "Balance the competing biochemical requirements: keep O2 low (around 3-5%) to delay browning while avoiding 0% O2 anaerobic fermentation. Add CO2 (around 5-10%) for antimicrobial protection, and balance with inert N2."
    },
    {
      step: 2,
      concept: "Diagnosing Moisture Vulnerability in EVOH Barrier Films",
      botQuestion: "A snack manufacturing plant replaces PVDC packaging films with an unlaminated monolayer EVOH film to package salty fried plantain chips. When shipped through a humid coastal port (35°C, 95% RH), the plantain chips become stale, soft, and rancid within four days. Explain the molecular mechanism behind this barrier failure, and propose the standard co-extrusion solution used in flexible packaging.",
      requiredKeywords: ["hydrophilic", "humidity", "evoh", "plasticize", "co-extrusion", "polyolefin"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding polymer physics diagnosis! EVOH's tight gas barrier depends on intermolecular hydrogen bonding between its hydroxyl (-OH) groups. However, EVOH is extremely hydrophilic: under high relative humidity (95% RH), water molecules penetrate the resin, plasticizing the polymer matrix and causing free volume to expand, which increases the Oxygen Transmission Rate (OTR) by orders of magnitude. The solution is multi-layer co-extrusion: encapsulating the EVOH barrier layer between hydrophobic polyolefin outer layers (such as LDPE, LLDPE, or PP) with tie-layer adhesives, shielding the EVOH core from atmospheric moisture.",
      feedbackRetry: "Describe how moisture affects EVOH: the hydroxyl groups attract water, which plasticizes the chains and destroys the oxygen barrier. Explain how sandwiching EVOH between moisture-proof polyolefins (like PE or PP) protects it."
    }
  ],
  quiz: [
    {
      q: "What is the primary antimicrobial mechanism of Carbon Dioxide (CO2) in Modified Atmosphere Packaging?",
      options: [
        "It freezes the product instantly",
        "It dissolves into the product's water phase as carbonic acid, lowering intracellular pH and inhibiting bacterial metabolic enzymes",
        "It bleaches the food to make it look clean",
        "It acts as an explosive gas to destroy insects"
      ],
      answer: 1
    },
    {
      q: "Why is an unlaminated monolayer of EVOH unsuitable for packaging high-moisture foods in humid climates?",
      options: [
        "EVOH is radioactive",
        "EVOH is highly hydrophilic; moisture absorption plasticizes its polymer chains, causing its oxygen barrier to collapse",
        "EVOH dissolves in sunlight",
        "EVOH can only be produced in black color"
      ],
      answer: 1
    },
    {
      q: "Why must fresh-cut respiring produce (such as pre-cut salads or broccoli florets) never be packaged in 0% Oxygen atmospheres?",
      options: [
        "Oxygen makes salads taste bitter",
        "Completely eliminating oxygen triggers anaerobic respiration, causing the plant tissue to ferment and produce ethanol, off-odors, and tissue breakdown",
        "Produce requires 100% oxygen to stay green",
        "Plastic pouches cannot hold 0% oxygen"
      ],
      answer: 1
    },
    {
      q: "What causes 'Pack Collapse' in Modified Atmosphere Packaging of moist foods like fresh cheeses or meats?",
      options: [
        "The delivery driver dropped the box",
        "High concentrations of carbon dioxide dissolve rapidly into the product's water and fat phases, creating an internal vacuum that crushes flexible packaging inward",
        "The nitrogen gas reacted with the plastic",
        "The temperature dropped below absolute zero"
      ],
      answer: 1
    }
  ]
};

// food-m4
const food_m4 = {
  id: "food-m4",
  title: "Water Activity (Aw), pH Kinetics and Shelf-Life Modeling",
  titleES: "Actividad de Agua (Aw), Cinética de pH y Modelado de Vida de Anaquel",
  icon: "fa-solid fa-droplet",
  isGoldModel: true,
  readings: [
    {
      id: "food-m4-r1",
      title: "Water Activity (Aw) Thermodynamics, Equilibrium pH & Hurdle Technology",
      duration: "15 min",
      content: `
# Water Activity (Aw) Thermodynamics, Equilibrium pH & Hurdle Technology

In food preservation science, total moisture content is often dangerously deceptive. Honey containing $18\\%$ water is completely shelf-stable for decades at room temperature without preservatives, whereas beef jerky containing the exact same $18\\%$ moisture content will rot and support toxic mold growth within weeks unless its thermodynamic water binding is strictly controlled.

What dictates microbial proliferation, chemical enzymatic browning, and lipid rancidity is not the total quantity of water in a food system, but rather the **energy state and availability of that water**—a fundamental physical parameter quantified as **Water Activity ($A_w$)**.

Combining thermodynamic water activity control with **Equilibrium pH kinetics** and the multi-target preservation framework known as **Hurdle Technology** empowers food scientists to design shelf-stable, high-moisture foods without relying on severe thermal over-processing.

---

## 1. Thermodynamic Fundamentals: Water Activity ($A_w$) vs. Moisture Content

**Water Activity ($A_w$)** is the ratio of the vapor pressure of water in a food matrix ($p$) to the vapor pressure of pure water ($p_0$) at the exact same temperature:

$$A_w = \\frac{p}{p_0} = \\frac{\\text{ERH}}{100}$$

Where $\\text{ERH}$ is the **Equilibrium Relative Humidity** of the air surrounding the food inside a sealed headspace chamber. Pure distilled water has an $A_w = 1.000$, while bone-dry food has an $A_w = 0.000$.

\`\`\`
Microbial Growth Boundaries Across the Water Activity Spectrum:
Aw Range:      Target Organisms Inhibited:                         Commercial Food Examples:
1.00 - 0.95    None. All pathogens flourish.                      Fresh meat, fresh milk, cut fruit.
0.95 - 0.91    Gram-negative rods (Pseudomonas, E. coli halted).   Hard cheeses, cured ham, bread.
0.91 - 0.86    Salmonella, Clostridium botulinum strictly halted. Salami, high-sugar jams, soy sauce.
0.86 - 0.80    Staphylococcus aureus aerobic growth halted.       Soft fruit purees, flour, sweet jerky.
0.80 - 0.65    Most xerophilic molds and yeasts inhibited.        Dried fruits, nuts, fruit powders.
0.60           ABSOLUTE MICROBIAL GROWTH FLOOR.                   Honey, milk powder, chocolate, pasta.
\`\`\`

### The Critical Pathogen Thresholds
- **$A_w = 0.93$**: Universal inhibition boundary for *Clostridium botulinum* neurotoxin production in anaerobic environments.
- **$A_w = 0.85$**: The federal regulatory boundary defined by FDA 21 CFR Part 113/114. Any food with $A_w > 0.85$ is classified as a moist, perishable medium requiring thermal sterilization or refrigeration. Below $A_w \\le 0.85$, pathogenic bacteria cannot multiply.
- **$A_w = 0.60$**: The absolute biological limit below which no living microorganism (including specialized xerophilic molds like *Wallemia sebi* or osmophilic yeasts like *Zygosaccharomyces rouxii*) can proliferate due to cellular osmotic dehydration.

---

## 2. Equilibrium pH Kinetics: Low-Acid vs. Acidified Foods

Alongside water activity, hydrogen ion concentration ($\text{pH} = -\\log_{10}[\\text{H}^+]$) dictates regulatory status and microbial survival:

### The Critical Threshold: $\\text{pH} = 4.60$
The spores of *Clostridium botulinum* cannot germinate or produce lethal neurotoxin in foods with an **equilibrium $\\text{pH} \\le 4.60$**. This scientific dividing line creates two distinct legal categories under US FDA regulations:

1. **Low-Acid Canned Foods (LACF - 21 CFR Part 113)**: Any food (other than alcoholic beverages) with an equilibrium $\\text{pH} > 4.60$ and $A_w > 0.85$ (e.g., canned corn, tuna, refried beans, vegetable soups). LACF products legally mandate commercial sterilization under high-pressure retort autoclaves ($F_0 \\ge 3.0\\ \\text{min}$ at $121.1^\\circ\\text{C}$).
2. **Acidified Foods (21 CFR Part 114)**: Low-acid ingredients (such as cucumbers, artichokes, or hot peppers) to which acid or acid foods are added to achieve a finished **equilibrium $\\text{pH} \\le 4.60$** within 24 hours of packing. Because the acidic pH prevents botulinum germination, acidified foods can be safely preserved using mild boiling-water atmospheric pasteurization ($85\\text{--}95^\\circ\\text{C}$), preserving crisp texture.

\`\`\`
Buffering Capacity & Equilibrium pH:
Adding vinegar to fresh jalapeño peppers:
Initial surface brine pH = 3.20  (Acidic)
Pepper core tissue pH   = 6.10  (Low-Acid)
-------------------------------------------------------------
After 24-48 Hours of Mass Diffusion:
Equilibrium Finished pH = 4.15  <-- Must be <= 4.60 at equilibrium!
\`\`\`

---

## 3. Hurdle Technology (The Leistner Multi-Target Model)

Pioneered by German food scientist Lothar Leistner, **Hurdle Technology** synthesizes multiple mild preservation barriers that pathogens cannot simultaneously overcome:

\`\`\`
Hurdle Technology Mechanism:
[ Microbial Population ]
           |
           v
       [ Hurdle 1: Mild Heat (F) ]           --> Weakens vegetative cells
           |
           v
       [ Hurdle 2: Chill Storage (t) ]        --> Slows metabolic repair
           |
           v
       [ Hurdle 3: Reduced pH (Acid) ]        --> Disrupts transmembrane proton gradient
           |
           v
       [ Hurdle 4: Lowered Aw (Humectants) ]  --> Induces cellular plasmolysis
           |
           v
       [ Hurdle 5: Preservative / MAP (Eh) ] --> Inhibits residual enzymatic respiration
           |
           v
[ ZERO MICROBIAL RECOVERY / COMMERCIAL STABILITY ]
\`\`\`

By intelligently stacking hurdles, each barrier can be kept mild. Instead of cooking a fruit puree into a nutrient-depleted, dark paste at $121^\\circ\\text{C}$, the food scientist adjusts pH to $4.2$ with citric acid, adds glycerol/sorbitol humectants to drop $A_w$ to $0.84$, flushes with $N_2$ gas, and applies mild pasteurization at $78^\\circ\\text{C}$, delivering a fresh, vibrant, shelf-stable product.

---

## 4. Engineering Field Scenario: Formulating a Shelf-Stable Chamoy Paste in Sinaloa

At a confectionery and agro-industrial fruit processing facility in Culiacán, Sinaloa, exporting traditional Mexican chamoy fruit paste to the US market:

### The Product Reformulation Challenge
The initial artisan chamoy recipe incorporated apricot pulp, chili powder, and cane sugar. In early US distribution, jars placed on un-refrigerated warehouse shelves swelled, blew their metal lids, and developed surface yeast colonies (*Zygosaccharomyces*). Testing revealed:
- Moisture Content: $34.5\\%$
- Water Activity: $A_w = 0.89$
- Product pH: $4.85$

Because $\\text{pH} > 4.60$ and $A_w > 0.85$, the product was legally classified as an unapproved Low-Acid Canned Food subject to immediate FDA border detention.

### Applying Hurdle Technology Reformulation
The product development team applied thermodynamic reformulation:
1. **pH Acidification (Hurdle 1)**: Formulators added encapsulated malic acid and citric acid in a $1:2$ ratio, shifting equilibrium pH down to **$\\text{pH} = 3.80$** (well below the $4.60$ botulinum threshold).
2. **Water Activity Depression via Humectants (Hurdle 2)**:
   - Increasing granular sucrose alone would cause sugar crystallization (graining) during storage.
   - Engineers substituted a fraction of sucrose with **food-grade liquid vegetable glycerin (glycerol)** and high-fructose corn syrup ($HFCS\\ 55$). Glycerol has a low molecular weight ($92.1\\ \\text{g/mol}$) and high hygroscopicity, binding free water molecules through strong hydrogen bonding without affecting visual clarity.
   - Chilled-mirror dew point hygrometer testing (Aqualab 4TE) verified the new water activity dropped to **$A_w = 0.82$** (below the $0.85$ pathogenic bacterial limit).
3. **Mild Thermal Hot-Fill (Hurdle 3)**: The paste was hot-filled into glass jars at $85^\\circ\\text{C}$ with a 2-minute inversion to commercially sterilize the lid liner.
4. **Accelerated Shelf-Life Testing (ASLT)**: Re-formulated samples incubated in environmental chambers at $37^\\circ\\text{C}$ and $75\\%\\ \\text{RH}$ for 12 weeks demonstrated zero yeast outgrowth, zero container swelling, and full regulatory compliance as an Acid Food.

---

> **Key Takeaway**: Food stability is governed by thermodynamics rather than gross moisture. By controlling water activity ($A_w \\le 0.85$), validating equilibrium $\\text{pH} \\le 4.60$, and combining synergistic hurdles, food engineers achieve shelf stability while maximizing sensory and nutritional quality.
`
    }
  ],
  dialogue: {
    title: "Reformulating a Fruit Puree for Water Activity and Acidification Compliance",
    titleES: "Reformulando un Puré de Frutas para Cumplimiento de Actividad de Agua y Acidificación",
    scenarioContext: "A Quality Director in Culiacán, Sinaloa, and a Food Formulations Specialist in Dallas reformulate an artisan mango-chili paste to meet FDA 21 CFR 114 acidified food requirements.",
    characters: [
      { name: "Dr. Marcus Thorne", role: "Principal Food Formulation Scientist", company: "Lone Star Specialty Foods (Dallas, TX)" },
      { name: "Ing. Laura Zazueta", role: "Director of Quality Assurance & Process Authority", company: "Conservas del Pacífico (Culiacán, Sinaloa)" }
    ],
    turns: [
      {
        speaker: "Dr. Marcus Thorne",
        text: "Laura, our regulatory counsel reviewed the FDA submission for the imported mango-chili spread. Because the product formulation sits at an equilibrium pH of four point seven-two and a measured water activity of zero point eight-eight, the FDA flagged it as an unregistered Low-Acid Canned Food. We cannot ship this into the US without retort sterilization.",
        translation: "Laura, nuestro asesor regulatorio revisó el trámite de la FDA para el untable de mango-chile importado. Debido a que la formulación del producto se encuentra en un pH de equilibrio de 4.72 y una actividad de agua medida de 0.88, la FDA lo señaló como un Alimento Enlatado de Baja Acidez no registrado. No podemos ingresar esto a EE.UU. sin esterilización en retorta.",
        targetTerms: ["equilibrium pH", "measured water activity", "Low-Acid Canned Food", "retort sterilization"]
      },
      {
        speaker: "Ing. Laura Zazueta",
        text: "Running this delicate mango spread through an autoclave at one hundred and twenty-one degrees would burn the natural sugars, destroy the fresh aroma, and turn the yellow paste into a brown sludge. We must re-engineer the recipe using hurdle technology to qualify under Part one-fourteen as an Acidified Food.",
        translation: "Correr este delicado untable de mango por una retorta a 121 grados quemaría los azúcares naturales, destruiría el aroma fresco y convertiría la pasta amarilla en un lodo café. Debemos rediseñar la receta usando tecnología de obstáculos para calificar bajo la Parte 114 como Alimento Acidificado.",
        targetTerms: ["autoclave at one hundred and twenty-one", "hurdle technology", "qualify under Part one-fourteen", "Acidified Food"]
      },
      {
        speaker: "Dr. Marcus Thorne",
        text: "How do you plan to bring the equilibrium pH below four point six without making the product unpalatably sour to American consumers?",
        translation: "¿Cómo planeas llevar el pH de equilibrio por debajo de 4.6 sin hacer que el producto sea desagradablemente ácido para los consumidores estadounidenses?",
        targetTerms: ["equilibrium pH below four point six", "unpalatably sour"]
      },
      {
        speaker: "Ing. Laura Zazueta",
        text: "We will introduce a buffered blend of citric acid and malic acid. Malic acid complements the natural stone-fruit flavor profile of mango, masking sharpness while driving the equilibrium pH down to three point nine-five. We will also add sodium citrate as an acid buffer to stabilize pH over shelf life.",
        translation: "Introduciremos una mezcla amortiguada de ácido cítrico y ácido málico. El ácido málico complementa el perfil de sabor a fruta de hueso natural del mango, enmascarando la acidez punzante mientras lleva el pH de equilibrio a 3.95. También agregaremos citrato de sodio como amortiguador de ácido para estabilizar el pH durante la vida de anaquel.",
        targetTerms: ["buffered blend", "malic acid", "equilibrium pH down to three point nine-five", "sodium citrate buffer"]
      },
      {
        speaker: "Dr. Marcus Thorne",
        text: "That handles the acidification hurdle. What about water activity? At zero point eight-eight, we still face osmotolerant yeast spoilage if consumers leave the opened jar at room temperature.",
        translation: "Eso maneja el obstáculo de acidificación. ¿Qué hay de la actividad de agua? En 0.88, todavía enfrentamos descomposición por levaduras osmotolerantes si los consumidores dejan el frasco abierto a temperatura ambiente.",
        targetTerms: ["acidification hurdle", "water activity", "osmotolerant yeast spoilage"]
      },
      {
        speaker: "Ing. Laura Zazueta",
        text: "We are substituting twelve percent of the liquid water with vegetable glycerin and high-fructose corn syrup. The low molecular weight of glycerol strongly binds free water molecules, depressing our water activity from zero point eight-eight down to zero point eight-two. With hot-fill packaging at eighty-five degrees, the product is completely shelf-stable for eighteen months.",
        translation: "Estamos sustituyendo el doce por ciento del agua líquida con glicerina vegetal y jarabe de maíz de alta fructosa. El bajo peso molecular del glicerol enlaza fuertemente las moléculas de agua libre, reduciendo nuestra actividad de agua de 0.88 a 0.82. Con envasado en caliente a ochenta y cinco grados, el producto es completamente estable en anaquel por dieciocho meses.",
        targetTerms: ["vegetable glycerin", "binds free water molecules", "depressing our water activity", "hot-fill packaging"]
      }
    ],
    contrastTips: [
      {
        school: "Moisture content and water activity are the same thing.",
        native: "Moisture content measures total water mass, whereas water activity (Aw) measures the thermodynamic energy state available to microorganisms.",
        explanation: "Two foods can have identical percentage moisture contents but drastically different water activities depending on how tightly water is bound by solutes."
      },
      {
        school: "We added lemon juice, so the food is safe.",
        native: "We measured an equilibrium pH of three point eight, legally satisfying FDA 21 CFR 114 acidified food requirements.",
        explanation: "Food safety compliance requires verified, calibrated measurement of equilibrium pH throughout the entire product mass, not casual acid addition."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Water Activity (Aw)",
      ipa: "/ˈwɔː.tər ækˈtɪv.ə.ti /ˌeɪˈdʌb.əl.juː/",
      es: "Actividad de Agua (Aw)",
      category: "Food Thermodynamics",
      definition: "The ratio of the vapor pressure of water in a food system to the vapor pressure of pure water at the same temperature, quantifying the availability of water for microbial growth.",
      collocations: ["measure water activity via dew point", "depress Aw with humectants", "Aw threshold of 0.85", "equilibrium relative humidity"],
      falseFriends: "Water activity is a unitless ratio between 0.00 and 1.00; it is distinct from moisture percentage (which is measured in grams of water per 100g).",
      nativeUsage: "By lowering the water activity of the beef jerky to 0.78, the processor ensured that Salmonella and Staph aureus could not grow."
    },
    {
      term: "Equilibrium pH",
      ipa: "/ˌiː.kwəˈlɪb.ri.əm ˌpiːˈeɪtʃ/",
      es: "pH de Equilibrio",
      category: "Food Chemistry",
      definition: "The uniform pH throughout a solid-liquid food mixture achieved after complete acid penetration and molecular diffusion across all particulate tissues.",
      collocations: ["verify equilibrium pH below 4.60", "pH equilibrium testing protocol", "equilibrate over 24 hours", "calibrated glass electrode pH meter"],
      falseFriends: "Surface pH is not equilibrium pH; regulatory validation requires homogenizing the entire particulate sample to measure true equilibrium.",
      nativeUsage: "The pickle processor blended whole cucumbers with brine to measure the final equilibrium pH of 4.15."
    },
    {
      term: "Hurdle Technology",
      ipa: "/ˈhɜːr.dəl tɛkˌnɒl.ə.dʒi/",
      es: "Tecnología de Obstáculos (Barreras Múltiples)",
      category: "Food Preservation",
      definition: "The synergistic combination of multiple mild preservation factors (e.g., Aw, pH, temperature, redox potential, preservatives) to control microbial growth without thermal damage.",
      collocations: ["apply hurdle technology", "synergistic preservation hurdles", "Leistner multi-target hurdle concept", "microbial metabolic exhaustion"],
      falseFriends: "'Hurdle' in food science refers to preservation barriers, not physical athletic track obstacles.",
      nativeUsage: "Using hurdle technology allowed the dairy brand to produce a shelf-stable cheese spread by combining mild heat, pH 5.0, and Aw 0.92."
    },
    {
      term: "Low-Acid Canned Food (LACF)",
      ipa: "/loʊ ˈæs.ɪd kænd ˌfuːd/",
      es: "Alimento Enlatado de Baja Acidez (LACF)",
      category: "FDA Regulations",
      definition: "Any food (other than alcoholic beverages) packaged in a hermetically sealed container with an equilibrium pH greater than 4.60 and a water activity greater than 0.85.",
      collocations: ["file an FDA LACF scheduled process", "LACF 21 CFR Part 113 mandates", "retort sterilization of LACF", "Clostridium botulinum risk in LACF"],
      falseFriends: "Low-acid means high pH (pH > 4.60); it does not mean the food tastes bland or mild.",
      nativeUsage: "Because canned green beans are a low-acid food, the cannery must operate under mandatory FDA LACF registration."
    },
    {
      term: "Acidified Food",
      ipa: "/əˈsɪd.ɪ.faɪd ˌfuːd/",
      es: "Alimento Acidificado (21 CFR 114)",
      category: "Food Regulations",
      definition: "A low-acid food to which acid or acid foods are added to achieve an equilibrium pH of 4.60 or below and a water activity greater than 0.85.",
      collocations: ["register an acidified food filing", "acidify with acetic or citric acid", "Part 114 acidified food guidelines", "monitor equilibrium pH batch records"],
      falseFriends: "Fermented foods (like naturally sour sauerkraut) are legally exempt from acidified food rules because acid is produced by bacteria, not added manually.",
      nativeUsage: "The jarred roasted red peppers were classified as an acidified food because vinegar was added to reduce pH below 4.60."
    },
    {
      term: "Humectant",
      ipa: "/hjuːˈmɛk.tənt/",
      es: "Humectante",
      category: "Ingredient Technology",
      definition: "A hygroscopic food ingredient (such as glycerol, sorbitol, propylene glycol, or sucrose) added to bind free water molecules, depressing water activity without eliminating moisture.",
      collocations: ["add glycerol as a humectant", "humectant water-binding capacity", "depress Aw with sugar alcohols", "maintain soft texture via humectants"],
      falseFriends: "Humectants lower water activity while keeping products moist and soft to the bite; they do not dry the food out.",
      nativeUsage: "The soft-baked cookie manufacturer added sorbitol as a humectant to keep the crumb tender while dropping Aw to 0.72."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Differentiating Low-Acid vs Acidified Food Regulatory Classifications",
      botQuestion: "A food manufacturer in Guanajuato packs canned whole artichoke hearts in water and salt. The natural artichoke heart tissue has a pH of 5.8. The plant manager proposes two options: Option A: Retort the cans in steam autoclaves at 121°C for 30 minutes; Option B: Add citric acid to the brine so that the entire jar reaches an equilibrium pH of 4.10, followed by atmospheric pasteurization at 90°C. Classify Option A and Option B under FDA 21 CFR regulations and explain the processing difference.",
      requiredKeywords: ["lacf", "acidified", "113", "114", "4.60", "retort"],
      minKeywords: 3,
      feedbackSuccess: "Spot on regulatory classification! Option A is a Low-Acid Canned Food (LACF) under 21 CFR Part 113 because equilibrium pH > 4.60 and Aw > 0.85; it legally requires high-pressure retort sterilization (F0 >= 3.0 min) to destroy C. botulinum spores. Option B is an Acidified Food under 21 CFR Part 114 because acid is added to lower equilibrium pH <= 4.60 (reaching 4.10); because botulinum spores cannot germinate below pH 4.60, mild atmospheric pasteurization at 90°C is sufficient to destroy vegetative pathogens and molds while preserving delicate artichoke texture.",
      feedbackRetry: "Identify the two FDA categories: Option A maintains pH > 4.60 (LACF per 21 CFR 113 requiring retort autoclaves), while Option B adds acid to achieve equilibrium pH <= 4.60 (Acidified Food per 21 CFR 114 allowing mild 90°C pasteurization)."
    },
    {
      step: 2,
      concept: "Deploying Humectants to Prevent Osmophilic Yeast Spoilage",
      botQuestion: "A fruit filling used in shelf-stable toaster pastries has a water activity of Aw = 0.88. The bakery discovers that although pathogenic bacteria cannot grow, osmophilic yeasts (Zygosaccharomyces rouxii) ferment the filling over a 60-day storage period, causing packages to swell. Why does Aw = 0.88 fail to stop these yeasts, and how can the food scientist lower Aw below 0.75 without causing sugar recrystallization?",
      requiredKeywords: ["yeast", "osmophilic", "glycerol", "humectant", "crystallization", "sorbitol"],
      minKeywords: 3,
      feedbackSuccess: "Brilliant food science troubleshooting! 1) Osmophilic yeasts are xerotolerant organisms capable of metabolic growth down to Aw = 0.65 (well below the bacterial 0.85 limit); at Aw = 0.88, they flourish. 2) If the scientist simply adds more granulated sucrose, the solution will exceed saturation limits and sugar crystals will precipitate out (graining defect). To depress Aw below 0.75 safely, the scientist should incorporate liquid polyol humectants like vegetable glycerin (glycerol) or sorbitol: their low molecular weight exerts high colligative osmotic pressure and strong hydrogen bonding, depressing water activity without crystallizing.",
      feedbackRetry: "Explain that osmophilic yeasts survive down to Aw = 0.65, so Aw = 0.88 is insufficient. Describe how adding high-solubility humectants with low molecular weight (such as vegetable glycerin or sorbitol) depresses water activity without triggering sucrose crystallization."
    }
  ],
  quiz: [
    {
      q: "What is the critical equilibrium pH threshold separating Low-Acid Canned Foods (LACF) from Acidified Foods under FDA regulations?",
      options: [
        "pH 7.00",
        "pH 4.60",
        "pH 2.50",
        "pH 8.50"
      ],
      answer: 1
    },
    {
      q: "Why can honey remain shelf-stable for centuries without refrigeration despite containing 18% water?",
      options: [
        "Bees add toxic chemical preservatives",
        "Its extremely high concentration of sugars exerts high osmotic pressure, lowering its water activity (Aw < 0.60) below the biological limit for all microbial growth",
        "Honey contains no oxygen",
        "Honey is stored in complete darkness"
      ],
      answer: 1
    },
    {
      q: "Under 21 CFR Part 114, how is an 'Acidified Food' defined?",
      options: [
        "Food grown in acidic volcanic soil",
        "A low-acid food to which acid or acid foods are added to achieve a finished equilibrium pH of 4.60 or below and a water activity greater than 0.85",
        "Any food that has spoiled and turned sour",
        "Carbonated soda beverages only"
      ],
      answer: 1
    },
    {
      q: "How does the Hurdle Technology concept improve food quality compared to traditional heavy thermal processing?",
      options: [
        "By replacing all food ingredients with artificial synthetic chemicals",
        "By intelligently combining multiple mild preservation barriers (e.g., Aw, pH, mild heat, chilling) that synergistically inhibit pathogens without destroying taste, color, or nutrients",
        "By requiring food to be boiled for 24 hours continuously",
        "By eliminating the need for sanitary packaging"
      ],
      answer: 1
    }
  ]
};

// food-m5
const food_m5 = {
  id: "food-m5",
  title: "Functional Food Ingredients, Fermentation & Precision Agritech",
  titleES: "Ingredientes Funcionales, Fermentación y Agrotecnología de Precisión",
  icon: "fa-solid fa-wheat-awn",
  isGoldModel: true,
  readings: [
    {
      id: "food-m5-r1",
      title: "Bioprocessing & Agritech: Industrial Fermentation, NIR Spectroscopy & FSMA Traceability",
      duration: "15 min",
      content: `
# Bioprocessing & Agritech: Industrial Fermentation, NIR Spectroscopy & FSMA Traceability

The modern agro-industrial sector is undergoing an unprecedented technological revolution. Consumer demand for gut-microbiome health, plant-based protein alternatives, and hyper-transparent supply chains has elevated food processing from traditional agricultural harvesting into advanced biological systems engineering. 

In major agritech corridors across Mexico (the Bajío greenhouse belt, Sinaloa irrigated valleys, and Jalisco agave bioprocessing hubs) and the United States, industrial food operations deploy three cutting-edge technologies: **Industrial Submerged & Solid-State Fermentation**, in-line optical sorting and **Near-Infrared (NIR) Spectroscopy**, and digital end-to-end supply chain traceability under **FDA FSMA Rule 204**.

---

## 1. Industrial Precision Fermentation & Functional Ingredients

Fermentation has evolved from spontaneous artisanal preservation into genetically optimized, high-yield biomanufacturing:

\`\`\`
Industrial Bioprocessing Spectrum:
1. Biomass Fermentation:      Cultivating microbial protein mass (e.g., Fusarium venenatum mycoprotein).
2. Precision Fermentation:    Engineered yeasts/bacteria producing recombinant enzymes or dairy proteins.
3. Submerged Liquid Culture:  Stirred-tank bioreactors for probiotics (Lactobacillus, Bifidobacterium).
4. Solid-State Fermentation:  Substrate matrices for filamentous fungal enzymes and koji cultivation.
\`\`\`

### Bioreactor Environmental Kinetics
In industrial submerged fermentation vessels ($10,000\\text{--}100,000\\ \\text{liters}$):
- **Dissolved Oxygen ($dO_2$)**: Maintained via sparger aeration and variable-speed Rushton impellers. Critical oxygen mass transfer coefficient:
  $$\\text{OTR} = k_L a \\cdot (C^* - C_L)$$
  Where $k_L a$ is the volumetric oxygen mass transfer coefficient, $C^*$ is saturation dissolved oxygen concentration, and $C_L$ is actual dissolved oxygen in the broth.
- **pH & Temperature Equilibrium**: Closed-loop dosing of sterile ammonia hydroxide ($NH_4OH$) or sulfuric acid ($H_2SO_4$) coupled with jacketed cooling coils to dissipate biological metabolic heat.

### Functional Prebiotics & Bioactive Compounds
Beyond living probiotics, plants extract and synthesize **Prebiotic Soluble Fibers**:
- **Fructooligosaccharides (FOS) & Inulin**: Extracted from agave (*Agave tequilana*) and chicory roots. These $\\beta(2\\rightarrow 1)$ fructan polymers pass undigested through the human stomach and small intestine into the colon, where they are selectively fermented by beneficial bifidobacteria into immunomodulatory Short-Chain Fatty Acids (SCFAs: acetate, propionate, butyrate).
- **High-Moisture Extrusion Cooking (HMEC)**: Twin-screw extruders operating at $140\\text{--}180^\\circ\\text{C}$ and $30\\text{--}50\\ \\text{bar}$ align soy, pea, and faba bean plant proteins along long-pitch cooling dies, re-creating the fibrous, striated texture of whole-muscle animal meat.

---

## 2. In-Line Agritech: Near-Infrared (NIR) Spectroscopy & Optical Sorting

Traditional quality control relied on sampling a handful of tomatoes or grain bags, grinding them up in a lab, and waiting two hours for refractometer or moisture oven results. Modern precision agritech evaluates $100\\%$ of agricultural raw materials in real time:

### Near-Infrared (NIR) Spectroscopy Principles
Operating in the electromagnetic spectrum between $780\\ \\text{nm}$ and $2500\\ \\text{nm}$, NIR radiation interacts with fundamental molecular bonds:
- Carbon-Hydrogen ($\\text{C-H}$): Lipids and fats.
- Oxygen-Hydrogen ($\\text{O-H}$): Moisture and water activity.
- Nitrogen-Hydrogen ($\\text{N-H}$): Protein content.

\`\`\`
In-Line Optical Inspection Layout:
High-Speed Bulk Produce Conveyor (3 m/s) ---> [ Broad-Spectrum Halogen Illumination ]
                                                    |
                                                    v
[ Pneumatic High-Speed Ejector Array ] <--- [ Multi-Spectral CCD + InGaAs NIR Sensor ]
Fires micro-air jets to blast out           Computes Brix, internal rot, and foreign material
defective fruit in under 5 milliseconds     via multivariate Partial Least Squares (PLS)
\`\`\`

By calibrating multivariate **Partial Least Squares (PLS) chemometric models**, an NIR spectrometer mounted above an apple or melon grading conveyor measures **Soluble Solids Content ($^\\circ\\text{Brix}$)**, internal browning defects, and titratable acidity in **under 10 milliseconds per fruit** without puncturing or destroying the skin.

### High-Speed Optical Sorter Pneumatics
Optical sorting channels utilize high-speed linear CCD cameras paired with pulsed LEDs:
- In fresh berry packaging in Michoacán, cameras capture 40,000 frames per second.
- Computer vision algorithms detect color hue, mold spots, and physical insect defects.
- A high-density manifold of 128 micro-pneumatic air nozzles blasts defective berries out of the free-falling produce curtain in mid-air at throughputs exceeding **40 metric tons per hour**.

---

## 3. Digital Farm-to-Fork Traceability: FSMA Rule 204 Compliance

Under **Section 204 of the US Food Safety Modernization Act (FSMA Rule 204)**, the FDA established the Food Traceability List (FTL), mandating digital end-to-end event tracking for high-risk categories (fresh leafy greens, melons, berries, tomatoes, soft cheeses, and finfish).

### The Architecture of FSMA 204: CTEs and KDEs
Traceability is anchored on two foundational concepts:
1. **Critical Tracking Events (CTEs)**: Key operational events in a product’s lifecycle:
   - **Harvesting**: Field coordinates and crew ID.
   - **Cooling / Initial Packing**: Post-harvest precooling and packing into master containers.
   - **Receiving**: Inbound shipment verification.
   - **Transformation**: Processing raw bulk tomatoes into jarred salsa.
   - **Shipping**: Outbound dispatch to distribution centers.
2. **Key Data Elements (KDEs)**: Mandatory digital data attributes linked to every CTE:
   - **Traceability Lot Code (TLC)**: A unique alpha-numeric identifier generated at the initial packing or transformation step.
   - GPS coordinates of growing fields, harvest dates, TLC source descriptions, and carrier bills of lading.

Under FSMA 204, when a foodborne outbreak occurs, every supply chain participant must be capable of providing this digital traceability spreadsheet to FDA investigators **within 24 hours of official request**.

---

## 4. Engineering Field Scenario: In-Line NIR Sugar Calibration for Agave Inulin

At an industrial prebiotic extraction facility in Tepatitlán, Jalisco:

### The Operational Challenge
The plant extracts prebiotic inulin from raw agave piñas for export to North American nutraceutical brands. Incoming agave trucks displayed massive natural variation in inulin polymerization degree and sugar concentration ($18\\%\\text{--}32\\%\\ \\text{Total Sugars}$). The manual laboratory anthrone-sulfuric acid colorimetric assay took 90 minutes per truck, creating a line of idling tractor-trailers stretching onto the highway.

### The Precision Engineering Solution
1. **In-Line NIR Installation**: Engineers installed an industrial diffuse-reflectance NIR spectrometer (InGaAs detector array, $900\\text{--}1700\\ \\text{nm}$) above the primary shredded agave fiber conveyor belt.
2. **Chemometric Model Calibration**:
   - The quality team collected 350 calibration samples across five harvesting seasons.
   - Reference HPLC chromatography data was correlated with raw NIR spectral absorption peaks (specifically the second overtone of $\\text{C-H}$ stretch at $1190\\ \\text{nm}$ and $\\text{O-H}$ combination bands at $1450\\ \\text{nm}$).
   - A robust Partial Least Squares (PLS) regression model achieved a coefficient of determination of $R^2 = 0.982$ with a Root Mean Square Error of Cross-Validation (RMSECV) of $<0.45\\%$.
3. **Automated Extraction Tuning**:
   - The in-line NIR sensor transmits real-time inulin content readings every 500 milliseconds over industrial Ethernet/IP to the plant SCADA system.
   - The SCADA system automatically modulates the continuous counter-current diffuser water flow rate and extraction temperature in real time, matching the exact inulin concentration of the incoming agave.
4. **Results**:
   - Truck intake analytical wait time dropped from **90 minutes down to zero (real-time grading)**.
   - Extraction yield increased by $8.4\\%$, and consistent prebiotic fiber purity ($>92\\%$ inulin on dry basis) was locked into every export batch.

---

> **Key Takeaway**: Modern food bioprocessing merges biological precision with digital velocity. By deploying controlled submerged fermentation, in-line NIR spectroscopy, and FSMA 204 digital traceability ledgers, agro-industrial engineers deliver functional nutrition with total transparency.
`
    }
  ],
  dialogue: {
    title: "Commissioning an In-Line NIR Spectrometer for Agave Prebiotic Processing",
    titleES: "Comisionando un Espectrómetro NIR en Línea para Procesamiento de Prebióticos de Agave",
    scenarioContext: "A Senior Fermentation Bioprocess Engineer in Jalisco and an Agritech Systems Architect in San Francisco optimize in-line NIR chemometrics and bioreactor yields for functional inulin production.",
    characters: [
      { name: "Julian Vance", role: "VP of Agritech Sensing & Automation", company: "BioHarvest Technologies (San Francisco, CA)" },
      { name: "Ing. Esteban Macías", role: "Lead Bioprocess & Fermentation Engineer", company: "AgaveBio Functional Ingredients (Arandas, Jalisco)" }
    ],
    turns: [
      {
        speaker: "Julian Vance",
        text: "Esteban, our San Francisco engineering team just reviewed the remote telemetry from the diffuse-reflectance NIR spectrometer installed over your raw agave shredder. The spectral baseline is exhibiting significant drift in the fourteen-hundred nanometer water absorption band.",
        translation: "Esteban, nuestro equipo de ingeniería en San Francisco acaba de revisar la telemetría remota del espectrómetro NIR de reflectancia difusa instalado sobre su triturador de agave crudo. La línea base espectral está exhibiendo una desviación significativa en la banda de absorción de agua de 1400 nanómetros.",
        targetTerms: ["diffuse-reflectance NIR spectrometer", "spectral baseline", "significant drift", "absorption band"]
      },
      {
        speaker: "Ing. Esteban Macías",
        text: "Good catch, Julian. We noticed that yesterday during peak afternoon ambient heat. The ambient temperature in the shredding bay reached thirty-six degrees Celsius, which induced thermal wavelength shift on the uncooled InGaAs sensor array. We just connected the thermoelectric Peltier cooling jacket to stabilize sensor temperature at exactly twenty degrees.",
        translation: "Buena observación, Julian. Notamos eso ayer durante el calor ambiental pico de la tarde. La temperatura ambiental en la bahía de trituración alcanzó los 36 grados Celsius, lo que indujo un corrimiento térmico de longitud de onda en la matriz de sensores InGaAs no enfriada. Acabamos de conectar la camisa de enfriamiento termoeléctrico Peltier para estabilizar la temperatura del sensor en exactamente veinte grados.",
        targetTerms: ["ambient temperature", "thermal wavelength shift", "InGaAs sensor array", "thermoelectric Peltier cooling"]
      },
      {
        speaker: "Julian Vance",
        text: "That should eliminate the thermal spectral noise. How is your Partial Least Squares chemometric model tracking against your laboratory HPLC reference measurements for prebiotic inulin polymer chain lengths?",
        translation: "Eso debería eliminar el ruido espectral térmico. ¿Cómo está rastreando su modelo quimiométrico de Mínimos Cuadrados Parciales frente a sus mediciones de referencia de HPLC de laboratorio para las longitudes de cadena del polímero de inulina prebiótica?",
        targetTerms: ["spectral noise", "Partial Least Squares chemometric model", "HPLC reference measurements", "inulin polymer chain lengths"]
      },
      {
        speaker: "Ing. Esteban Macías",
        text: "After applying a second-derivative mathematical transformation and Standard Normal Variate scatter correction to the spectra, our R-squared correlation with HPLC reached zero point nine-eight. The in-line sensor now predicts degree of polymerization and total soluble fructans with an error under zero point four percent.",
        translation: "Después de aplicar una transformación matemática de segunda derivada y corrección de dispersión por Variable Normal Estándar a los espectros, nuestra correlación R-cuadrada con HPLC alcanzó 0.98. El sensor en línea ahora predice el grado de polimerización y fructanos solubles totales con un error inferior al 0.4 por ciento.",
        targetTerms: ["second-derivative transformation", "Standard Normal Variate scatter correction", "R-squared correlation", "degree of polymerization"]
      },
      {
        speaker: "Julian Vance",
        text: "Outstanding accuracy. Are you feeding those real-time Brix and inulin signals directly into your downstream counter-current diffuser PLC?",
        translation: "Precisión sobresaliente. ¿Están alimentando esas señales de Brix e inulina en tiempo real directamente en el PLC de su difusor de contracorriente aguas abajo?",
        targetTerms: ["feeding real-time signals", "counter-current diffuser PLC"]
      },
      {
        speaker: "Ing. Esteban Macías",
        text: "Yes, the PLC automatically modulates the hot extraction water ratio and residence time to maintain an exact eight-to-one liquid-to-solid ratio. That stabilized our extraction yield at ninety-four percent while generating continuous Traceability Lot Code records satisfying FSMA Rule two-hundred-and-four.",
        translation: "Sí, el PLC modula automáticamente la relación de agua de extracción caliente y el tiempo de residencia para mantener una proporción exacta de líquido a sólido de ocho a uno. Eso estabilizó nuestro rendimiento de extracción en noventa y cuatro por ciento mientras genera registros continuos de Código de Lote de Trazabilidad que cumplen con la Regla 204 de FSMA.",
        targetTerms: ["liquid-to-solid ratio", "extraction yield", "Traceability Lot Code records", "FSMA Rule two-hundred-and-four"]
      }
    ],
    contrastTips: [
      {
        school: "We test the fruit by tasting it.",
        native: "We measure internal sugar Brix and acid ratios in real time using in-line Near-Infrared (NIR) Spectroscopy.",
        explanation: "Modern precision agro-industry replaces subjective human tasting with calibrated diffuse-reflectance NIR optical chemometrics."
      },
      {
        school: "We write the farm name on the wooden box.",
        native: "We generate digital Key Data Elements (KDEs) linked to a unique Traceability Lot Code under FSMA Rule 204.",
        explanation: "US FDA FSMA Rule 204 mandates machine-readable digital supply chain event tracking capable of full forward-and-backward trace within 24 hours."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Near-Infrared (NIR) Spectroscopy",
      ipa: "/ˌnɪər ˈɪn.frə.rɛd spɛkˈtrɒs.kə.pi/",
      es: "Espectroscopía del Infrarrojo Cercano (NIR)",
      category: "Analytical Agritech",
      definition: "A non-destructive optical analytical technique measuring electromagnetic absorption between 780–2500 nm to quantify chemical constituents (sugars, moisture, proteins) in milliseconds.",
      collocations: ["deploy in-line NIR spectroscopy", "calibrate NIR chemometric models", "diffuse-reflectance NIR sensor", "non-destructive Brix grading"],
      falseFriends: "NIR measures vibrational molecular overtones; it is distinct from thermal infrared cameras that only measure surface temperature.",
      nativeUsage: "The grain terminal utilized an in-line NIR spectrometer to measure wheat protein content at forty metric tons per hour."
    },
    {
      term: "Precision Fermentation",
      ipa: "/prɪˈsɪʒ.ən ˌfɜːr.mənˈteɪ.ʃən/",
      es: "Fermentación de Precisión",
      category: "Bioprocessing",
      definition: "The deployment of genetically tailored microbial hosts (yeasts, fungi, bacteria) inside controlled bioreactors to produce specific functional proteins, enzymes, or bioactive compounds.",
      collocations: ["produce enzymes via precision fermentation", "submerged fermentation bioreactor", "recombinant protein expression", "downstream bioseparation"],
      falseFriends: "Precision fermentation produces pure targeted functional molecules, unlike traditional bulk fermentation which ferments whole food substrates.",
      nativeUsage: "The biotechnology startup utilized precision fermentation to produce animal-free dairy whey proteins indistinguishable from bovine whey."
    },
    {
      term: "High-Moisture Extrusion (HMEC)",
      ipa: "/haɪ ˈmɔɪs.tʃər ɪkˈstruː.ʒən/",
      es: "Extrusión de Alta Humedad (HMEC)",
      category: "Food Engineering",
      definition: "A twin-screw thermal extrusion process operating at 40–70% moisture and elevated temperatures to shear and realign plant proteins into striated, whole-muscle meat textures.",
      collocations: ["texturize soy protein via HMEC", "long cooling die extrusion", "align protein fibrillar structure", "twin-screw food extruder"],
      falseFriends: "HMEC produces wet, fibrous meat analogs; dry extrusion produces puffed breakfast cereals and dry pet kibble.",
      nativeUsage: "The plant-based meat facility commissioned a high-moisture extrusion line to produce fibrous chicken-free cutlets from pea protein."
    },
    {
      term: "Critical Tracking Events (CTEs)",
      ipa: "/ˈkrɪt.ɪ.kəl ˈtræk.ɪŋ ɪˌvɛnts/",
      es: "Eventos Críticos de Trazabilidad (CTE / FSMA 204)",
      category: "Regulatory Traceability",
      definition: "Mandatory supply chain milestone events defined under FDA FSMA Rule 204 (Harvesting, Cooling, Initial Packing, Receiving, Transformation, Shipping) requiring electronic record capture.",
      collocations: ["document mandatory CTE milestones", "capture KDEs at each CTE", "FSMA 204 compliance audit", "traceability event logging"],
      falseFriends: "CTEs are specific supply chain milestone events under FSMA 204, distinct from HACCP Critical Control Points (CCPs).",
      nativeUsage: "The packinghouse recorded the Initial Packing CTE, generating a unique Traceability Lot Code linked to the farm harvest coordinates."
    },
    {
      term: "Key Data Elements (KDEs)",
      ipa: "/kiː ˈdeɪ.tə ˈɛl.ə.mənts/",
      es: "Elementos Clave de Datos (KDE / FSMA 204)",
      category: "Regulatory Traceability",
      definition: "The specific digital data attributes (e.g., date, time, location identifier, lot code, quantity, unit of measure) that must be recorded and linked to each Critical Tracking Event.",
      collocations: ["transmit KDEs to trading partners", "store electronic KDE records", "provide KDEs to FDA within 24 hours", "KDE spreadsheet reconciliation"],
      falseFriends: "KDEs are structured regulatory data records, not informal paper delivery notes.",
      nativeUsage: "During the mock recall, the produce distributor exported the complete KDE ledger for forty pallets of cantaloupes in under three hours."
    },
    {
      term: "Chemometrics (Partial Least Squares)",
      ipa: "/ˌkɛm.oʊˈmɛt.rɪks / ˈpɑːr.ʃəl liːst ˈskwɛərz/",
      es: "Quimiometría (Mínimos Cuadrados Parciales - PLS)",
      category: "Data Science",
      definition: "The application of mathematical and statistical methods to chemical and spectral data, extracting quantitative concentrations from overlapping optical absorption spectra.",
      collocations: ["build a PLS calibration model", "chemometric multivariate analysis", "spectral noise filtering", "validate RMSECV prediction error"],
      falseFriends: "Chemometrics is a branch of computational data science applied to chemistry, not a laboratory wet chemical reaction.",
      nativeUsage: "The agritech software used multivariate chemometrics to translate raw NIR absorbance spectra into accurate protein and moisture percentages."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Understanding Molecular Bonds Measured in Food NIR Spectroscopy",
      botQuestion: "An in-line NIR spectrometer is being commissioned over a continuous cheese processing line in Jalisco to measure Moisture Content, Milk Fat, and Protein. Identify the primary fundamental molecular chemical bonds (e.g., C-H, O-H, N-H) that correlate with each of these three food components in the NIR absorption spectrum (780–2500 nm).",
      requiredKeywords: ["o-h", "c-h", "n-h", "moisture", "fat", "protein"],
      minKeywords: 3,
      feedbackSuccess: "Spot on spectroscopy physics! 1) Moisture Content correlates directly with Oxygen-Hydrogen (O-H) stretching vibrations (prominent absorption bands at ~1450 nm and ~1940 nm); 2) Milk Fat correlates with Carbon-Hydrogen (C-H) stretching overtones from fatty acid hydrocarbon chains (bands at ~1200 nm, 1720 nm, and 2300 nm); 3) Protein Content correlates with Nitrogen-Hydrogen (N-H) peptide bond vibrations from amino acid polymers (bands at ~1510 nm and 2050 nm).",
      feedbackRetry: "Identify the atomic bonds for each constituent: water is H2O (O-H bonds), fats are hydrocarbons (C-H bonds), and proteins are made of amino acids containing amines/peptides (N-H bonds)."
    },
    {
      step: 2,
      concept: "Executing FSMA Rule 204 Outbreak Traceability within Statutory Deadlines",
      botQuestion: "The US FDA contacts a fresh berry distributor in Jalisco regarding a multi-state Salmonella outbreak traced to exported blackberries. Under FSMA Rule 204, what is the maximum statutory time window your company has to produce the complete electronic traceability spreadsheet? What mandatory Key Data Elements (KDEs) must be provided for the 'Transformation / Packing' Critical Tracking Event (CTE)?",
      requiredKeywords: ["24 hours", "traceability lot code", "tlc", "date", "harvest", "location"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding regulatory compliance execution! 1) Statutory Deadline: Under FSMA Rule 204, the electronic sortable spreadsheet must be provided to the FDA within exactly 24 hours of official request; 2) Mandatory KDEs for the Packing CTE include: Traceability Lot Code (TLC), TLC Source Identifier (FDA Food Facility Registration Number or GPS coordinates of the packing facility), Date of Initial Packing, Product Description, Quantity and Packaging Unit (e.g., 12 x 6-oz clamshells), and the linked Harvest CTE records (field location, harvest date, and harvest crew ID).",
      feedbackRetry: "State the mandatory 24-hour deadline under FSMA 204. Then list the core KDEs: Traceability Lot Code (TLC), packing date, facility location identifier, product description, and harvest origin linkages."
    }
  ],
  quiz: [
    {
      q: "Under FDA FSMA Rule 204, within how many hours must a food company provide digital traceability records upon official regulatory request during an outbreak investigation?",
      options: [
        "Within 24 hours",
        "Within 10 business days",
        "Within 30 calendar days",
        "At the end of the fiscal year"
      ],
      answer: 0
    },
    {
      q: "In precision agritech sorting lines, what physical mechanism allows Near-Infrared (NIR) Spectroscopy to grade fruit sweetness non-destructively?",
      options: [
        "It uses X-rays to photograph the seeds",
        "It measures the optical absorption of light in the 780–2500 nm range, where C-H and O-H molecular vibrations correlate with sugar and moisture concentrations",
        "It weighs each fruit on a high-speed scale",
        "It injects chemical dyes through the skin"
      ],
      answer: 1
    },
    {
      q: "What is the primary technological difference between traditional dry extrusion and High-Moisture Extrusion Cooking (HMEC)?",
      options: [
        "Dry extrusion is used for ice cream; HMEC is used for soup",
        "HMEC operates at high moisture (40–70%) with a long cooling die to shear and realign plant proteins into fibrous meat-like textures, whereas dry extrusion produces puffed cereals and snacks",
        "Dry extrusion requires liquid nitrogen cooling",
        "HMEC can only process whole beef muscle"
      ],
      answer: 1
    },
    {
      q: "What is a 'Traceability Lot Code' (TLC) under US FSMA Rule 204?",
      options: [
        "The postal zip code of the retail grocery store",
        "A unique alphanumeric descriptor assigned to a specific batch of food at the initial packing or transformation stage that remains linked across all downstream distribution events",
        "The retail sale price barcode on the cash register",
        "The serial number of the delivery truck"
      ],
      answer: 1
    }
  ]
};

console.log("Applying complete Food Science modules to LXP_COURSES...");

// Inject all 5 into food-science track
LXP_COURSES["food-science"].status = "full";
LXP_COURSES["food-science"].modules = [food_m1, food_m2, food_m3, food_m4, food_m5];

// Save back to courses.js
const header = `// stemOS Learning Experience Platform - Course Catalog\n// Comprehensive Technical English (ESP) curriculum for high-tech engineering tracks.\n\nvar LXP_COURSES = `;
const footer = `;\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { LXP_COURSES };\n}\n`;

fs.writeFileSync(coursesPath, header + JSON.stringify(LXP_COURSES, null, 4) + footer, 'utf-8');
console.log("Successfully updated food-science track to FULL with 5 Gold Modules!");
