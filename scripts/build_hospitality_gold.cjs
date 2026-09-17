/**
 * scripts/build_hospitality_gold.cjs
 * Authors complete Gold Standard modules for:
 * hospitality-food (hosp-m1 to hosp-m5)
 * Updates track status to "full".
 */

const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '../content/courses.js');
const { LXP_COURSES } = require(coursesPath);

// hosp-m1
const hosp_m1 = {
  id: "hosp-m1",
  title: "Forbes 5-Star Standards & VIP Guest Experience",
  titleES: "Estándares Forbes 5 Estrellas y Experiencia de Huéspedes VIP",
  icon: "fa-solid fa-star",
  isGoldModel: true,
  readings: [
    {
      id: "hosp-m1-r1",
      title: "Forbes Travel Guide 5-Star Standards: Anticipatory Service, Guest Profiling & Luxury Etiquette",
      duration: "15 min",
      content: `
# Forbes Travel Guide 5-Star Standards: Anticipatory Service, Guest Profiling & Luxury Etiquette

In luxury hospitality, flawless physical infrastructure—marble bathtubs, private plunge pools, and bespoke thread-count Egyptian linens—represents merely the baseline point of entry. What distinguishes world-renowned ultra-luxury properties in Los Cabos, Punta Mita, the Riviera Maya, and Mexico City from standard premium hotels is the invisible, effortless execution of **Anticipatory Service**.

The global gold standard in luxury benchmarking is the **Forbes Travel Guide (FTG)**, which evaluates properties across more than 900 rigorous, objective standards. Achieving the coveted Forbes 5-Star rating demands eliminating mechanical service scripts in favor of intuitive emotional intelligence, active guest profiling, and refined luxury vernacular.

---

## 1. The Forbes 5-Star Core Service Benchmarks

Forbes evaluations are conducted anonymously by incognito professional inspectors over a minimum 3-day stay. Approximately $75\\%$ of the star rating is weighted heavily on **Service Quality and Emotional Engagement**, while only $25\\%$ reflects physical facility architecture.

\`\`\`
Forbes 5-Star Service Pillars:
1. Technical Proficiency:     Timing, accuracy, procedural execution, cleanliness, posture.
2. Emotional Intelligence:    Genuine warmth, personalized thoughtfulness, active listening.
3. Anticipatory Execution:    Addressing unexpressed needs before the guest articulates them.
4. Professional Presence:     Pristine grooming, non-intrusive body language, luxury vernacular.
\`\`\`

### The Temporal Precision Standards
Under FTG criteria, service speed is timed down to the second:
- **Arrival Greeting**: The guest must be acknowledged curbside within **30 seconds** of vehicle arrival.
- **Telephone Response**: All incoming external and internal calls must be answered within **three rings (approx. 10 seconds)** with a warm, personalized greeting.
- **Luggage Delivery**: Luggage must arrive in the guest suite within **10 minutes** of check-in, positioned on designated luggage benches with zippers unclipped and handles facing forward.
- **Beverage Delivery**: Poolside or lounge drinks must be served within **5 minutes** of order placement, accompanied by chilled glassware and appropriate garnishes.

### The Spatial Proximity Rules (The 10/5 Rule)
- **At 10 Feet (3 Meters)**: Staff must establish warm, direct eye contact and offer a subtle, welcoming head nod or genuine smile.
- **At 5 Feet (1.5 Meters)**: Staff must deliver an audible, personalized verbal greeting (*"Good afternoon, Mr. Hastings; wonderful to see you enjoying the terrace"*).

---

## 2. Anticipatory Service vs. Reactive Hospitality

Traditional hospitality is reactive: the guest asks for ice, and the attendant delivers ice. Ultra-luxury hospitality is **anticipatory**: the attendant notices the guest reading without reading glasses on the beach and discreetly brings a lens cleaning microfiber cloth and an adjustable book rest.

\`\`\`
Service Evolution Spectrum:
[ Reactive Service ]       ---> [ Attentive Service ]        ---> [ Anticipatory Luxury ]
"How can I help you?"           "I see you finished your water."   Noticing guest running shoes;
Guest must request every item.  Refilling without asking.         placing fresh chilled electrolytes
                                                                   and fresh towel at doorstep.
\`\`\`

### Institutionalizing Guest Profiling via CRM
Anticipatory service is not accidental; it is driven by rigorous inter-departmental communication and real-time Property Management System (PMS) guest profiling:
- **Intra-Day Briefings (The Morning Lineup)**: Every shift begins with a 15-minute operational briefing reviewing arriving VIP guest dossiers: preferred room temperature ($20.5^\\circ\\text{C}$), dietary intolerances (celiac/gluten-free), beverage preferences (sparkling mineral water with Meyer lemon), and family pet names.
- **Glitch & Recovery Tracking**: If a guest mentions off-hand to a pool valet that their ocean excursion caused a mild sunburn, the valet logs a CRM alert. Within one hour, housekeeping places chilled organic aloe vera gel and fresh cucumber slices bedside during evening turndown without the guest ever uttering a formal request.

---

## 3. Luxury Vernacular: Eliminating Prohibited Colloquialisms

In a 5-Star environment, language directly shapes the perception of elegance. Casual slang diminishes luxury cachet. Staff undergo rigorous linguistic training to replace commonplace expressions with refined luxury vernacular:

| Prohibited Casual Phrase | Elevated 5-Star Luxury Vernacular | Psychological Rationale |
| :--- | :--- | :--- |
| *"No problem!"* | *"It is an absolute pleasure, Mr. Vance."* | "No problem" implies that serving the guest was potentially an inconvenience or burden. |
| *"You guys want more drinks?"* | *"May I offer the ladies and gentlemen another cocktail?"* | "You guys" is overly familiar, gender-exclusive, and lacks professional dignity. |
| *"Hold on a second."* | *"Allow me just a moment to verify that with the concierge, Mrs. Reed."* | Respects the guest’s valuable time while projecting refined composure. |
| *"I don't know."* | *"Allow me to inquire directly with our executive chef and return to you immediately."* | Takes personal ownership of the inquiry rather than deflecting responsibility. |
| *"Yeah, sure."* | *"Certainly, I will arrange that with pleasure."* | Projects eager, polished hospitality excellence. |

---

## 4. Engineering Field Scenario: The 5-Star Evening Turndown Execution

At a cliffside luxury resort in Los Cabos, Baja California Sur, hosting a Forbes Travel Guide undercover inspector during high season:

### The Turndown Ritual Protocol (18:00 to 21:00)
Housekeeping attendants work in synchronized pairs to execute the **45-Point Forbes Turndown Sequence** while the guest is dining at the resort's signature restaurant:

1. **Environmental Harmonization**:
   - The master HVAC is set to the guest's preferred sleep temperature ($20.0^\\circ\\text{C}$).
   - Dimmable recessed lighting is adjusted to evening mood warmth ($2,700\\ \\text{Kelvin}$ at $25\\%$ luminosity).
   - Motorized sheer curtains and blackout drapes are drawn completely to guarantee total morning privacy.
   - The audio soundbar is activated to ambient acoustic guitar melodies at whisper volume ($38\\ \\text{dBA}$).
2. **The Sleep Sanctuary Execution**:
   - Decorative daytime throw pillows and heavy bed scarves are removed and stored inside lidded closet cedar bins.
   - High-thread-count Egyptian sateen cotton sheets are turned down at an exact $45^\\circ$ triangle fold on the guest's preferred exit side.
   - A plush bedside linen foot mat is placed on the floor, aligned precisely with the bed edge, topped with fresh terrycloth slippers angled toward the bed.
   - A crystal carafe of chilled artisanal mineral water with a high-ball tumbler resting on a linen coaster is placed on the nightstand.
3. **Bespoke Personalization**:
   - The attendant notices a paperback novel resting on the patio lounger. The attendant transfers the novel to the bedside nightstand, inserting a custom leather-embossed resort bookmark at the open page.
   - Electronics cord management: messy laptop and smartphone charging cables on the desk are neatly organized using branded leather velcro cable wraps.
4. **Bathroom Re-Sanitization**:
   - Used terrycloth towels are replaced with fresh $800\\text{-GSM}$ Turkish cotton towels folded with seams turned inward.
   - Fragrant bath salts and plush bathrobes are staged adjacent to the soaking tub.
   - An artisan dark chocolate truffle infused with Mexican vanilla and Damiana liqueur resting in a hand-carved copal wood box is set beside a handwritten goodnight card signed by the guest’s personal butler.

---

> **Key Takeaway**: Forbes 5-Star hospitality is the art of invisible perfection. By mastering temporal speed benchmarks, anticipating unexpressed guest desires through CRM profiling, eliminating casual vernacular, and executing flawless room rituals, luxury professionals create unforgettable emotional resonance.
`
    }
  ],
  dialogue: {
    title: "Conducting a Forbes 5-Star Pre-Audit Briefing in Los Cabos",
    titleES: "Llevando a Cabo una Sesión Informativa Pre-Auditoría Forbes 5 Estrellas en Los Cabos",
    scenarioContext: "A Director of Guest Experience in Los Cabos and a Senior Luxury Hospitality Consultant in New York conduct an intensive operational review before an incognito Forbes inspection.",
    characters: [
      { name: "Eleanor Davenport", role: "Executive Luxury Hospitality Auditor", company: "Prestige Hospitality Advisory (New York, NY)" },
      { name: "Lic. Mateo Cárdenas", role: "Director of Guest Experience & Butler Services", company: "Cabo Sereno Ocean Resort (Los Cabos, BCS)" }
    ],
    turns: [
      {
        speaker: "Eleanor Davenport",
        text: "Mateo, our mock Forbes inspection revealed several technical vulnerabilities across your front-of-house operations. Yesterday at the oceanfront infinity pool, the valet answered a guest request with 'No problem, guys,' and luggage delivery for suite forty-two exceeded fourteen minutes.",
        translation: "Mateo, nuestra inspección simulada de Forbes reveló varias vulnerabilidades técnicas en sus operaciones de contacto con el huésped. Ayer en la piscina infinita frente al mar, el mesero respondió a la solicitud de un huésped con 'No hay problema, muchachos', y la entrega de equipaje para la suite 42 superó los catorce minutos.",
        targetTerms: ["mock Forbes inspection", "technical vulnerabilities", "front-of-house operations", "luggage delivery exceeded"]
      },
      {
        speaker: "Lic. Mateo Cárdenas",
        text: "Thank you for the candid feedback, Eleanor. Using colloquial slang like 'No problem' or 'guys' is an unacceptable breach of our luxury vernacular standards. We are retraining the entire food and beverage brigade today to reinforce phrases like 'Certainly, with pleasure' and 'Allow me to arrange that immediately.'",
        translation: "Gracias por la retroalimentación franca, Eleanor. Usar jerga coloquial como 'No hay problema' o 'muchachos' es una violación inaceptable de nuestros estándares de lenguaje de lujo. Estamos reentrenando a toda la brigada de alimentos y bebidas hoy para reforzar frases como 'Ciertamente, con gusto' y 'Permítame coordinar eso de inmediato.'",
        targetTerms: ["candid feedback", "breach of luxury vernacular", "reinforce phrases", "with pleasure"]
      },
      {
        speaker: "Eleanor Davenport",
        text: "What caused the four-minute delay on luggage delivery? Under Forbes standards, ten minutes from check-in registration to in-suite luggage placement is the hard ceiling.",
        translation: "¿Qué causó el retraso de cuatro minutos en la entrega de equipaje? Bajo los estándares de Forbes, diez minutos desde el registro en recepción hasta la colocación del equipaje en la suite es el límite estricto.",
        targetTerms: ["four-minute delay", "hard ceiling", "luggage placement"]
      },
      {
        speaker: "Lic. Mateo Cárdenas",
        text: "The delay was caused by a communication breakdown between the front desk dispatch and the bell captain via the radio channel. We have transitioned all arrival dispatching to our mobile PMS tablets. The bell team now receives automated push notifications the moment the curbside doorman confirms vehicle arrival.",
        translation: "La demora fue causada por una falla de comunicación entre el despacho de recepción y el capitán de botones por el canal de radio. Hemos transferido todo el despacho de llegadas a nuestras tabletas PMS móviles. El equipo de botones ahora recibe notificaciones push automatizadas en el momento en que el portero de entrada confirma la llegada del vehículo.",
        targetTerms: ["communication breakdown", "bell captain", "mobile PMS tablets", "automated push notifications"]
      },
      {
        speaker: "Eleanor Davenport",
        text: "Excellent. Remember that emotional engagement carries twice the weight of mechanical efficiency. How is your team demonstrating anticipatory service beyond standard scripted interactions?",
        translation: "Excelente. Recuerda que la conexión emocional tiene el doble de peso que la eficiencia mecánica. ¿Cómo está demostrando tu equipo un servicio anticipatorio más allá de las interacciones estandarizadas?",
        targetTerms: ["emotional engagement", "twice the weight", "anticipatory service", "scripted interactions"]
      },
      {
        speaker: "Lic. Mateo Cárdenas",
        text: "Our butlers review the guest CRM profile prior to arrival. If the profile indicates the guest enjoys morning trail running, the butler places fresh electrolyte infusions, a local trail map, and customized running sweatbands bedside during evening turndown. It is personal, intuitive, and completely unprompted.",
        translation: "Nuestros mayordomos revisan el perfil CRM del huésped antes de la llegada. Si el perfil indica que el huésped disfruta correr en senderos por la mañana, el mayordomo coloca infusiones frescas de electrolitos, un mapa de senderos locales y muñequeras personalizadas para correr al lado de la cama durante el servicio nocturno de cortesía. Es personal, intuitivo y completamente espontáneo.",
        targetTerms: ["guest CRM profile", "electrolyte infusions", "evening turndown", "completely unprompted"]
      }
    ],
    contrastTips: [
      {
        school: "We give good service because we are friendly.",
        native: "We deliver Forbes 5-Star anticipatory service governed by precise temporal and spatial standards.",
        explanation: "Friendliness alone does not satisfy 5-Star audits; luxury service requires disciplined temporal speed, spatial rules (10/5 Rule), and tailored guest profiling."
      },
      {
        school: "I tell the guest 'no problem' to be nice.",
        native: "I respond with 'It is our absolute pleasure, Mrs. Reed,' elevating the professional dignity of the interaction.",
        explanation: "'No problem' implies a potential burden; luxury vernacular frames service as an honor and genuine pleasure."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Forbes 5-Star Standards",
      ipa: "/fɔːrbz ˈfaɪv ˌstɑːr ˈstæn.dərdz/",
      es: "Estándares Forbes 5 Estrellas",
      category: "Hospitality Benchmarking",
      definition: "The global benchmark of luxury hospitality excellence, comprising over 900 objective, unannounced inspection criteria evaluating service execution and emotional engagement.",
      collocations: ["achieve a Forbes 5-Star rating", "audit against Forbes criteria", "incognito inspection", "5-Star service excellence"],
      falseFriends: "Forbes ratings are awarded by incognito professional inspectors based on rigorous standards, unlike crowdsourced online review stars.",
      nativeUsage: "The resort underwent six months of intensive staff simulation to prepare for the unannounced Forbes 5-Star audit."
    },
    {
      term: "Anticipatory Service",
      ipa: "/ænˈtɪs.ə.pəˌtɔːr.i ˈsɜːr.vɪs/",
      es: "Servicio Anticipatorio / Intuitivo",
      category: "Guest Experience",
      definition: "The intuitive luxury practice of identifying and fulfilling a guest’s unexpressed desires and emotional preferences before the guest verbalizes a request.",
      collocations: ["demonstrate anticipatory service", "fulfill unexpressed guest needs", "anticipatory intuition", "anticipatory room amenities"],
      falseFriends: "Anticipatory service requires proactive action; reactive service only occurs after the guest asks.",
      nativeUsage: "Noticing that the guest had a hoarse cough, the butler demonstrated anticipatory service by delivering hot honey-lemon tea without being asked."
    },
    {
      term: "Turndown Service",
      ipa: "/ˈtɜːrn.daʊn ˌsɜːr.vɪs/",
      es: "Servicio de Cortesía Nocturna (Turndown)",
      category: "Housekeeping Operations",
      definition: "A refined evening housekeeping ritual preparing the guest room for sleep, including bed turn-down, lighting dimming, temperature adjustment, foot mats, and bespoke amenities.",
      collocations: ["execute evening turndown", "turndown amenity presentation", "turndown timing protocol", "45-point turndown checklist"],
      falseFriends: "Turndown is an evening preparation ritual, not the rejection of a business offer.",
      nativeUsage: "During evening turndown, the attendant folded the duvet at a 45-degree angle and placed slippers on a bedside linen mat."
    },
    {
      term: "Luxury Vernacular",
      ipa: "/ˈlʌk.ʃər.i vərˈnæk.jə.lər/",
      es: "Lenguaje de Lujo / Vocabulario Refinado",
      category: "Service Etiquette",
      definition: "The elevated, polished vocabulary and verbal syntax mandated in luxury hospitality, eliminating casual slang ('no problem', 'you guys') in favor of refined courtesy.",
      collocations: ["mandate luxury vernacular", "eliminate prohibited colloquialisms", "professional verbal poise", "polished speech cadence"],
      falseFriends: "Vernacular refers to professional spoken linguistic register, not a foreign regional dialect.",
      nativeUsage: "The front-desk team was trained in luxury vernacular, replacing 'sure thing' with 'It will be my absolute pleasure.'"
    },
    {
      term: "Guest Profiling (CRM)",
      ipa: "/ɡɛst ˈproʊ.faɪl.ɪŋ /ˌsiː.ɑːrˈɛm/",
      es: "Perfilamiento del Huésped (CRM)",
      category: "Guest Data Management",
      definition: "The systematic logging of guest preferences, physiological habits, dietary restrictions, and historical feedback in enterprise software to personalize future stays.",
      collocations: ["update the guest CRM profile", "cross-reference VIP preferences", "profile-driven room staging", "historical preference logging"],
      falseFriends: "Guest profiling in hospitality is personalized service curation, not criminal background investigation.",
      nativeUsage: "The concierge checked the CRM profile, noting that the guest preferred extra goose-down pillows and chilled San Pellegrino on arrival."
    },
    {
      term: "The 10/5 Rule",
      ipa: "/ðə ˈtɛn ˈfaɪv ˌruːl/",
      es: "Regla del 10/5 (Distancia de Reconocimiento)",
      category: "Service Standards",
      definition: "A luxury hospitality spatial standard requiring staff to make warm eye contact and smile at 10 feet, followed by an audible, personalized greeting at 5 feet.",
      collocations: ["practice the 10/5 rule", "spatial awareness standard", "warm greeting at five feet", "eye contact at ten feet"],
      falseFriends: "The 10/5 rule relates to physical foot distances, not to shift working hours or discount percentages.",
      nativeUsage: "The resort general manager commended the pool staff for flawlessly observing the 10/5 rule throughout the afternoon."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Applying Luxury Vernacular in High-Pressure Service Interactions",
      botQuestion: "A guest in a Los Cabos luxury resort suite dials the Butler Desk at 11:30 PM: 'Hi, the air conditioning is making a faint rattling sound, and I have a crucial board meeting tomorrow morning at 8:00 AM.' The rookie butler responds: 'Yeah, no problem. I'll call maintenance and see if someone can check it out.' Critique this response from a Forbes 5-Star perspective and re-author the butler's script using refined luxury vernacular.",
      requiredKeywords: ["pleasure", "apologize", "immediately", "rest", "assist", "inconvenience"],
      minKeywords: 3,
      feedbackSuccess: "Spot on luxury service refinement! Critique: The phrase 'Yeah, no problem' is highly prohibited slang that minimizes the guest's frustration, while 'see if someone can check it out' projects passive indifference and zero ownership. Optimal 5-Star Re-write: 'I sincerely apologize for that disturbance to your evening, Mr. Vance. Allow me to dispatch our lead engineering supervisor immediately to resolve the sound silently. In the meantime, would you permit me to prepare an adjacent executive suite so that your rest remains completely uninterrupted before your morning board meeting? It is our absolute priority to ensure your comfort.'",
      feedbackRetry: "Identify why 'Yeah, no problem' violates 5-Star standards. Rephrase the response with sincere empathy, an apology for the noise, immediate personal ownership, and an elevated luxury solution (such as immediate quiet repair or offering an alternate resting suite)."
    },
    {
      step: 2,
      concept: "Designing an Anticipatory Turndown Ritual from CRM Data",
      botQuestion: "The morning CRM briefing notes that arriving VIP guests in Villa 12 (Mr. and Mrs. Sterling) are celebrating their 20th wedding anniversary. Mrs. Sterling is an avid amateur botanist with a severe strawberry allergy, while Mr. Sterling drinks single-malt Scotch. Propose three personalized, unrequested anticipatory turndown amenities for their arrival evening that comply with Forbes 5-Star standards.",
      requiredKeywords: ["scotch", "botanical", "allergy", "anniversary", "turndown", "bespoke"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding luxury curation! 1) Botanical & Floral Curated Amenity: A live, potted endemic Baja desert orchid accompanied by a leather-bound botanical field guide to local flora (avoiding standard cut roses), ensuring zero strawberry or berry garnishes are anywhere in the villa; 2) Anniversary Toast: A bottle of aged single-malt Scotch whiskey accompanied by hand-blown artisanal crystal tumblers and hand-carved crystal clear ice spheres; 3) Bespoke Turndown Touch: A handwritten congratulatory card from the General Manager, alongside customized linen pillowcases embroidered with their wedding date monogram, and evening ambient jazz staged on the sound system.",
      feedbackRetry: "Incorporate the three specific CRM data points: 1) The 20th wedding anniversary, 2) The wife's botany passion (and strict strawberry allergy avoidance), and 3) The husband's preference for single-malt Scotch. Propose three elegant, non-scripted amenities."
    }
  ],
  quiz: [
    {
      q: "Under Forbes Travel Guide 5-Star standards, what percentage of the final evaluation score is weighted on Service Quality vs Physical Facility?",
      options: [
        "10% Service, 90% Facility",
        "Approximately 75% Service Quality and Emotional Engagement, and 25% Physical Facility",
        "50% Service, 50% Facility",
        "100% Physical Facility architecture"
      ],
      answer: 1
    },
    {
      q: "What is the primary psychological flaw of using the phrase 'No problem!' when responding to a luxury guest request?",
      options: [
        "It is too quiet to hear",
        "It subtly implies that fulfilling the guest's request could have been an inconvenience or problem, diminishing the dignity of hospitality",
        "It is grammatically incorrect in British English",
        "It violates local labor laws"
      ],
      answer: 1
    },
    {
      q: "What does the '10/5 Rule' mandate in luxury guest areas?",
      options: [
        "Staff must work 10 hours and take 5 hours of rest",
        "Staff must make eye contact and smile at 10 feet, and offer a warm verbal greeting at 5 feet",
        "Drinks must be served within 10 minutes and food within 5 minutes",
        "Rooms must have 10 pillows and 5 towels"
      ],
      answer: 1
    },
    {
      q: "What distinguishes 'Anticipatory Service' from standard 'Reactive Service' in ultra-luxury hotels?",
      options: [
        "Anticipatory service charges double the room rate",
        "Anticipatory service intuitively recognizes and satisfies unexpressed guest needs through observation and CRM data before the guest has to ask",
        "Anticipatory service is performed entirely by artificial intelligence robots",
        "Anticipatory service requires guests to fill out a 20-page questionnaire upon arrival"
      ],
      answer: 1
    }
  ]
};

// hosp-m2
const hosp_m2 = {
  id: "hosp-m2",
  title: "Property Management Systems (PMS): Check-In, Folios and ADR",
  titleES: "Sistemas de Gestión Hotelera (PMS): Check-In, Folios y Tarifa Promedio (ADR)",
  icon: "fa-solid fa-hotel",
  isGoldModel: true,
  readings: [
    {
      id: "hosp-m2-r1",
      title: "Hotel Enterprise Management: PMS Architecture, RevPAR Optimization & Folio Accounting",
      duration: "15 min",
      content: `
# Hotel Enterprise Management: PMS Architecture, RevPAR Optimization & Folio Accounting

A grand luxury resort or bustling international commercial hotel is an intricate financial and logistical machine operating 24 hours a day, 365 days a year. Rooms are cleaned, checked into, billed, minibar charges posted, spa treatments scheduled, and corporate conferences invoiced across hundreds of rooms simultaneously. Coordinating this continuous operational velocity requires the central nervous system of modern hospitality: the **Property Management System (PMS)**.

Mastering hotel operations requires understanding enterprise PMS workflows (such as Oracle Opera Cloud, Amadeus Hospitality, and protel), calculating core **Revenue Management KPIs (ADR, Occupancy, RevPAR)**, and executing flawless front-desk **Folio Accounting and Pre-Authorization Routing**.

---

## 1. The Financial Metrics of Hospitality: ADR, RevPAR & Yield Management

Hotel profitability cannot be evaluated by looking at room rates alone or occupancy percentages alone; financial performance is evaluated through three intertwined revenue management metrics:

\`\`\`
Hospitality Revenue Equations:
1. Occupancy Percentage (OCC %):   (Rooms Sold / Total Available Rooms) * 100
2. Average Daily Rate (ADR):       Total Room Revenue / Rooms Sold
3. Revenue Per Available Room:     ADR * OCC %   OR   Total Room Revenue / Total Available Rooms
\`\`\`

### The Power of RevPAR (Revenue Per Available Room)
Consider two competing 200-room luxury resorts in Cancún on the same night:
- **Resort A**: Sells 180 rooms ($90\\%\\ \\text{OCC}$) at an aggressive discount rate of $\$200\\ \\text{USD}\\ \\text{ADR}$.
  $$\\text{RevPAR}_A = 200 \\times 0.90 = \\$180.00\\ \\text{USD}$$
  $$\\text{Total Room Revenue} = 180 \\times 200 = \\$36,000\\ \\text{USD}$$
  *Operational Cost*: Cleaning and laundry expenses for 180 rooms.
- **Resort B**: Sells 120 rooms ($60\\%\\ \\text{OCC}$) at a premium rate of $\$350\\ \\text{USD}\\ \\text{ADR}$.
  $$\\text{RevPAR}_B = 350 \\times 0.60 = \\$210.00\\ \\text{USD}$$
  $$\\text{Total Room Revenue} = 120 \\times 350 = \\$42,000\\ \\text{USD}$$
  *Operational Cost*: Cleaning and laundry expenses for only 120 rooms.

Resort B earned **$\\$6,000\\ \\text{USD}$ more revenue** while incurring substantially lower operational wear-and-tear, laundry utility costs, and housekeeping labor. **RevPAR** reveals the true yield efficiency of the asset.

### Yield Management & Dynamic Pricing Algorithms
Modern PMS platforms connect directly via Central Reservation Systems (CRS) and Channel Managers to Global Distribution Systems (GDS: Sabre, Amadeus) and Online Travel Agencies (OTAs: Expedia, Booking.com):
- **Dynamic Pricing Algorithms**: Automatically adjust published BAR (Best Available Rate) every 15 minutes based on live airport flight arrival volumes, regional weather forecasts, competitor rate parity, and historical booking pace curves.
- **Rate Parity Agreements**: Contractual mandates between hotels and OTAs stipulating that the hotel cannot advertise cheaper room rates on its direct website than those displayed on public OTA portals, bypassed through exclusive direct-booking loyalty member rates.

---

## 2. Front-Desk Financial Engineering: The Architecture of Guest Folios

When a guest checks in, the PMS opens an electronic financial ledger called a **Guest Folio**. In luxury and corporate hospitality, a single room rarely operates on a single generic bill.

\`\`\`
Folio Split Architecture:
[ Master Room Account ] ------------------------------------+
                                                            |
[ Folio A: Corporate Master (Room & Tax) ]                  [ Folio B: Guest Incidental Account ]
- Room Night Rate: $450.00 / night                          - Room Service Dinners: $142.50
- State Lodging Tax (ISH): 4%                               - Spa Swedish Massage:  $220.00
- Value Added Tax (IVA):  16%                               - Minibar Consumption:   $48.00
Billed directly to Corporate Master Billing Account         Billed to Guest's Personal Credit Card
via Direct Bill City Ledger Account at checkout.            settled upon morning checkout.
\`\`\`

### Automated Routing Rules
Using the PMS, front-desk agents establish automated transaction routing codes:
- Any charge with Transaction Code \`1000\` (Room Charge) or \`7000\` (Lodging Taxes) routes automatically to **Folio A**.
- Any charge with Transaction Code \`2000\` (Food & Beverage) or \`3000\` (Spa & Wellness) routes automatically to **Folio B**.
This prevents embarrassing checkout disputes where business travelers are accidentally billed for corporate room charges or companies are billed for minibar champagne.

---

## 3. The Pre-Authorization Hold Protocol

A primary financial risk faced by hotels is **chargeback loss** or **guest departure without settlement (skipping)**. Front-desk agents execute credit card security protocols during check-in:

### The Mathematical Authorization Calculation
$$\\text{Pre-Auth Hold Amount} = (\\text{Room Rate} + \\text{Taxes}) \\times \\text{Nights} + (\\text{Incidental Hold per Night} \\times \\text{Nights})$$

*Example*:
- Room Rate: $\$400\\ \\text{USD} + 20\\%\\ \\text{tax} = \\$480\\ \\text{USD/night}$.
- Length of Stay: 4 nights.
- Daily Incidental Policy: $\$150\\ \\text{USD/night}$ to cover potential restaurant, minibar, and spa spending.
$$\\text{Pre-Auth Hold} = (480 \\times 4) + (150 \\times 4) = \\$1,920 + \\$600 = \\$2,520.00\\ \\text{USD}$$

### Operational Protocol: Hold vs. Charge
- **Authorization Hold (Incremental Auth)**: The PMS places a temporary freeze against the cardholder's credit limit; funds are **not withdrawn or transferred**.
- **Settlement / Capture**: Occurs exclusively during final checkout when actual charges are tabulated and processed.
- *Front-Desk Phrasing*: Attendants must never say *"I am charging your card two thousand five hundred dollars."* The correct professional phrasing is: *"Mr. Hastings, I will be placing a temporary authorization hold on your credit card for the room, tax, and an incidental buffer of one hundred and fifty dollars per evening. This hold will release automatically upon final checkout."*

---

## 4. Engineering Field Scenario: Managing an Overbooking Walk in Cancún

At a 450-room beachfront resort in Cancún during spring peak season:

### The Operational Crisis
Due to an algorithm synchronization delay between the central channel manager and an international wholesale tour operator, the resort achieved **$104\\%\\ \\text{Occupancy}$** on a Saturday evening. All 450 physical rooms were occupied, but 18 confirmed reservations were arriving on evening flights. The hotel was officially in an **Overbooked Situation**, requiring 18 guests to be **"Walked"** to an alternate property.

### Executing the Professional Walking Protocol
"Walking" a confirmed guest is among the highest-risk service failures in the hospitality industry. Handled poorly, it results in viral social media outrage and catastrophic corporate account cancellation. The Front Office Manager executed the standardized 5-step containment protocol:

1. **Target Selection Criteria**:
   - High-tier loyalty members (Diamond/Black Tier), honeymoon couples, and direct-booking VIPs were strictly protected.
   - The team selected 18 one-night transient reservations booked through third-party discount OTAs who were arriving late.
2. **Partner Hotel Sourcing**:
   - The Front Office Manager secured 18 comparable luxury suites at a sister 5-Star resort located 5 minutes down the beach, pre-authorizing the master account so the guests paid zero fees.
3. **The Executive Face-to-Face Engagement**:
   - When the guest arrived at the desk, the Front Office Director immediately escorted them to the private VIP lounge to deliver the news privately away from the lobby:
   - *"Mr. and Mrs. Albright, upon auditing our oceanfront suites this afternoon, our engineering team discovered an unforeseen plumbing leak in your assigned suite. To ensure your complete comfort, we have personally arranged an upgraded Presidential Suite for you at our sister resort, The Grand Coral. We have fully covered your room charge for the evening, arranged private luxury SUV transportation, and provided a complimentary two-hundred-dollar dining voucher."*
4. **The Return & Recovery**:
   - The guests were chauffeured in private Cadillac Escalades. The following morning, the resort sent private transportation to bring them back, checked them into an upgraded penthouse suite, and placed a bottle of vintage champagne with the General Manager’s personal handwritten welcome note.
5. **Outcome**: Seventeen of the eighteen walked guests posted 5-star reviews praising the resort's handling of the situation, and corporate reputation was protected.

---

> **Key Takeaway**: The Property Management System is the operational and financial heart of hospitality. By mastering RevPAR dynamics, configuring multi-folio accounting routing, calculating credit pre-authorizations, and executing graceful overbooking walks, hotel leaders maximize financial yield while protecting brand integrity.
`
    }
  ],
  dialogue: {
    title: "Reconciling Folio Routing Rules and ADR Forecasting in Cancún",
    titleES: "Conciliando Reglas de Enrutamiento de Folios y Proyecciones de ADR en Cancún",
    scenarioContext: "A Front Office Director in Cancún and a Corporate Director of Revenue Management in Miami review daily ADR pacing and split-folio billing for a 300-room corporate international summit.",
    characters: [
      { name: "Julian Vance", role: "Corporate VP of Revenue Optimization", company: "Caribe Resorts International (Miami, FL)" },
      { name: "Lic. Fernanda Montes", role: "Front Office Operations Director", company: "Caribe Grand Resort (Cancún, Q. Roo)" }
    ],
    turns: [
      {
        speaker: "Julian Vance",
        text: "Fernanda, looking at our live PMS dashboard for the upcoming TechAmericas convention, we have three hundred rooms blocked out over four nights. Our projected ADR is pacing at four hundred and ten dollars, but our RevPAR index against the competitive set is lagging by four points.",
        translation: "Fernanda, viendo nuestro panel de PMS en vivo para la próxima convención TechAmericas, tenemos trescientas habitaciones bloqueadas durante cuatro noches. Nuestro ADR proyectado va a un ritmo de 410 dólares, pero nuestro índice de RevPAR frente al grupo competitivo está rezagado por cuatro puntos.",
        targetTerms: ["live PMS dashboard", "rooms blocked out", "projected ADR", "RevPAR index lagging"]
      },
      {
        speaker: "Lic. Fernanda Montes",
        text: "Good morning, Julian. The RevPAR lag is driven by the fifty shoulder-night rooms before the conference that remain unbooked. I recommend releasing those unreserved block rooms back into our central channel manager today to capture high-rate transient leisure demand at an ADR of five hundred and twenty dollars.",
        translation: "Buenos días, Julian. El rezago en RevPAR está impulsado por las cincuenta habitaciones en noches adyacentes antes de la conferencia que permanecen sin reservar. Recomiendo liberar esas habitaciones bloqueadas no reservadas de vuelta a nuestro administrador de canales central hoy para capturar demanda de placer individual de alta tarifa a un ADR de 520 dólares.",
        targetTerms: ["RevPAR lag", "shoulder-night rooms", "channel manager", "transient leisure demand"]
      },
      {
        speaker: "Julian Vance",
        text: "Agreed. That will push our weekend occupancy to ninety-four percent and drive our monthly RevPAR past three hundred and eighty dollars. Now, how are we managing billing routing for the three hundred corporate convention delegates?",
        translation: "De acuerdo. Eso llevará nuestra ocupación de fin de semana al noventa y cuatro por ciento e impulsará nuestro RevPAR mensual por encima de 380 dólares. Ahora, ¿cómo estamos gestionando el enrutamiento de facturación para los trescientos delegados de la convención corporativa?",
        targetTerms: ["weekend occupancy", "drive our monthly RevPAR", "billing routing", "convention delegates"]
      },
      {
        speaker: "Lic. Fernanda Montes",
        text: "We established an automated two-way folio split in the PMS. All room charges and state lodging taxes route directly to Master Folio A under a corporate direct-bill city ledger account. All discretionary charges—minibar, room service, and golf green fees—route automatically to Folio B.",
        translation: "Establecimos una división de folios automatizada en dos vías en el PMS. Todos los cargos de habitación e impuestos estatales de hospedaje se enrutan directamente al Folio Maestro A bajo una cuenta de crédito corporativo directo en city ledger. Todos los cargos discrecionales—frigobar, servicio a la habitación y green fees de golf—se enrutan automáticamente al Folio B.",
        targetTerms: ["folio split in the PMS", "Master Folio A", "city ledger account", "discretionary charges", "Folio B"]
      },
      {
        speaker: "Julian Vance",
        text: "What credit pre-authorization hold are you placing on the delegates' personal credit cards at check-in for Folio B?",
        translation: "¿Qué retención de preautorización de crédito están colocando en las tarjetas de crédito personales de los delegados al registrarse para el Folio B?",
        targetTerms: ["pre-authorization hold", "personal credit cards", "check-in for Folio B"]
      },
      {
        speaker: "Lic. Fernanda Montes",
        text: "We are securing an incidental pre-authorization of one hundred and fifty dollars per night. Our front-desk agents explicitly explain that this is a temporary pending hold, not a settled charge. That completely prevents check-out invoice disputes while guaranteeing zero credit default for the resort.",
        translation: "Estamos asegurando una preautorización de incidentales de ciento cincuenta dólares por noche. Nuestros agentes de recepción explican explícitamente que se trata de una retención temporal pendiente, no de un cargo liquidado. Eso previene por completo disputas de factura al momento del check-out mientras garantiza cero incumplimiento de crédito para el resort.",
        targetTerms: ["incidental pre-authorization", "temporary pending hold", "settled charge", "invoice disputes"]
      }
    ],
    contrastTips: [
      {
        school: "We charged your card for the room and extras.",
        native: "We placed an incidental pre-authorization hold on your card, which releases upon checkout.",
        explanation: "Front-desk agents must distinguish an authorization hold (temporary freeze on funds) from an actual processed transaction charge."
      },
      {
        school: "Our hotel is full so we are making a lot of money.",
        native: "Our RevPAR increased by twelve percent due to strategic ADR yield management.",
        explanation: "High occupancy at low room rates yields lower profits than optimized pricing; revenue success is evaluated through RevPAR rather than raw occupancy percentage."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Property Management System (PMS)",
      ipa: "/ˈprɒp.ər.ti ˈmæn.ɪdʒ.mənt ˈsɪs.təm /ˌpiː.ɛmˈɛs/",
      es: "Sistema de Gestión Hotelera (PMS)",
      category: "Hotel Technology",
      definition: "The core enterprise software platform managing front-desk check-in, room inventory, housekeeping status, billing folios, and central reservation interfaces.",
      collocations: ["deploy an enterprise PMS", "cloud-based PMS terminal", "interface PMS with POS systems", "night audit run in PMS"],
      falseFriends: "In hospitality, PMS refers to hotel operations software, not residential property real estate management.",
      nativeUsage: "The front-desk agent checked the guest into suite 408 on the PMS, automatically generating digital room key cards."
    },
    {
      term: "Revenue Per Available Room (RevPAR)",
      ipa: "/ˈrɛv.pɑːr/",
      es: "Ingresos por Habitación Disponible (RevPAR)",
      category: "Revenue Management",
      definition: "The primary financial KPI measuring total room revenue divided by total available rooms (or ADR multiplied by Occupancy Percentage).",
      collocations: ["maximize monthly RevPAR", "outperform competitive set in RevPAR", "RevPAR penetration index", "calculate RevPAR yield"],
      falseFriends: "RevPAR accounts for all rooms in the hotel (empty and full), whereas ADR evaluates only rooms that were actually sold.",
      nativeUsage: "Despite lower occupancy during hurricane season, the resort grew RevPAR by eight percent through premium villa pricing."
    },
    {
      term: "Average Daily Rate (ADR)",
      ipa: "/ˈæv.ər.ɪdʒ ˈdeɪ.li ˌreɪt /ˌeɪ.diːˈɑːr/",
      es: "Tarifa Promedio Diaria (ADR)",
      category: "Financial Metrics",
      definition: "A revenue KPI calculating the average rental revenue earned per paid occupied room over a given time period (Total Room Revenue / Rooms Sold).",
      collocations: ["increase ADR during peak season", "maintain luxury ADR boundaries", "discounted ADR for groups", "ADR benchmarking"],
      falseFriends: "ADR excludes complimentary rooms and out-of-order rooms; it measures strictly paid room revenue.",
      nativeUsage: "During the Formula One race weekend, luxury hotels in Mexico City achieved an unprecedented ADR of $750 USD."
    },
    {
      term: "Guest Folio",
      ipa: "/ɡɛst ˈfoʊ.li.oʊ/",
      es: "Folio de Cuenta de Huésped",
      category: "Front-Office Accounting",
      definition: "The detailed electronic ledger record tracking all financial transactions, room charges, taxes, payments, and incidental postings during a guest's stay.",
      collocations: ["open a split guest folio", "post charges to Master Folio A", "settle the guest folio at checkout", "folio transaction routing"],
      falseFriends: "A folio in hotel accounting is a financial invoice statement, not a printed sheet of paper in a book.",
      nativeUsage: "The convention delegate requested their folio be split so that corporate room charges were separated from personal dining expenses."
    },
    {
      term: "Pre-Authorization Hold",
      ipa: "/ˌpriː.ɔː.θər.aɪˈzeɪ.ʃən ˌhoʊld/",
      es: "Retención de Preautorización",
      category: "Payment Processing",
      definition: "A temporary hold placed on a guest's credit card credit limit at check-in to secure estimated funds for room charges, taxes, and potential incidentals without processing a live charge.",
      collocations: ["place an incidental pre-auth hold", "release pre-authorization at checkout", "incremental authorization hold", "insufficient funds for pre-auth"],
      falseFriends: "A pre-authorization is a hold, not a financial withdrawal; the money remains in the cardholder's account balance until settled.",
      nativeUsage: "At check-in, the agent placed a $600 USD pre-authorization hold on the customer's American Express card to cover incidentals."
    },
    {
      term: "Walking a Guest (Overbooking)",
      ipa: "/ˈwɔː.kɪŋ ə ˌɡɛst/",
      es: "Desviar a un Huésped por Sobreventa (Walking)",
      category: "Front-Office Operations",
      definition: "The hospitality practice of relocating a guest with a confirmed reservation to a comparable competitor hotel when the property is 100% full due to deliberate overbooking.",
      collocations: ["walk an overbooked guest", "graceful walking protocol", "cover transportation for walked guest", "overbooking contingency plan"],
      falseFriends: "Walking a guest does not mean accompanying them on a pedestrian stroll; it means relocating them to another hotel due to overbooking.",
      nativeUsage: "When the hotel reached 104% occupancy, the front office manager walked four late arrivals to a nearby 5-star partner resort."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Calculating RevPAR and Evaluating Pricing Strategies",
      botQuestion: "A 300-room luxury beachfront hotel in Punta Mita is analyzing two potential pricing strategies for a long holiday weekend: Strategy 1: Price rooms at $600 USD ADR, achieving 80% occupancy. Strategy 2: Price rooms at $750 USD ADR, achieving 65% occupancy. Calculate the RevPAR and Total Room Revenue for both strategies. Which strategy generates higher revenue, and what secondary operational cost advantages does it offer?",
      requiredKeywords: ["revpar", "revenue", "adr", "occupancy", "laundry", "costs"],
      minKeywords: 3,
      feedbackSuccess: "Spot on revenue management calculations! 1) Strategy 1: RevPAR = $600 * 0.80 = $480 USD. Total Revenue = 300 rooms * 0.80 * $600 = $144,000 USD (240 rooms sold); 2) Strategy 2: RevPAR = $750 * 0.65 = $487.50 USD. Total Revenue = 300 rooms * 0.65 * $750 = $146,250 USD (195 rooms sold); 3) Conclusion: Strategy 2 generates $2,250 USD more gross revenue while selling 45 fewer rooms. This provides massive secondary operational advantages: 45 fewer rooms of housekeeping labor, lower laundry and linen replacement costs, less physical wear-and-tear, reduced restaurant congestion, and a more exclusive luxury guest experience.",
      feedbackRetry: "Calculate RevPAR = ADR * Occupancy% for each option. Multiply by total rooms (300) to find total revenue. Compare the numbers and explain the operational savings of having fewer rooms to clean and service."
    },
    {
      step: 2,
      concept: "Formulating Professional Pre-Authorization Phrasing at Check-In",
      botQuestion: "A first-time luxury guest checks into a presidential suite for three nights at $1,200 USD/night plus 20% tax. The resort requires a $250 USD/night incidental deposit. Total hold: ($1,440 * 3) + ($250 * 3) = $5,070 USD. The guest observes the credit card terminal and gasps: 'Wait, why are you charging my card over five thousand dollars before I have even stepped foot in the room?' As the Lead Front Desk Attendant, deliver a polished, reassuring explanation that clarifies the transaction and de-escalates the guest.",
      requiredKeywords: ["authorization", "hold", "pending", "incidentals", "settlement", "checkout"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding professional front-desk de-escalation! Script: 'I completely understand your concern, Mr. Thorne; allow me to put your mind at ease. We are not processing an actual charge against your account today. This is simply a temporary pending authorization hold required by banking protocols to secure your suite reservation and open an incidental dining and spa line for your three-night stay. No funds leave your account; upon checkout on Sunday, we will review your exact itemized invoice together, and this temporary hold will be released immediately. It is our absolute pleasure to welcome you to the resort.'",
      feedbackRetry: "Reassure the guest that this is an 'authorization hold' rather than a live charge. Explain that the hold secures the room and provides incidental credit for restaurants and spas, and confirm that the hold releases upon final checkout when the bill is settled."
    }
  ],
  quiz: [
    {
      q: "How is Revenue Per Available Room (RevPAR) mathematically calculated in hotel management?",
      options: [
        "Total Hotel Profit divided by Total Employee Salaries",
        "Average Daily Rate (ADR) multiplied by Occupancy Percentage (or Total Room Revenue divided by Total Available Rooms)",
        "The price of the cheapest room on the website",
        "Total restaurant food sales divided by the number of chairs"
      ],
      answer: 1
    },
    {
      q: "In hotel Property Management Systems (PMS), what is a 'Guest Folio Split'?",
      options: [
        "Tearing the paper bill in half with scissors",
        "Dividing transactions into separate accounts (e.g., Folio A for corporate room and tax, and Folio B for personal incidental expenses)",
        "Canceling a guest's reservation without notice",
        "Giving a 50% discount to all arriving guests"
      ],
      answer: 1
    },
    {
      q: "What is the critical financial difference between a Credit Card Pre-Authorization Hold and a Processed Charge?",
      options: [
        "A pre-authorization hold is a temporary freeze on the cardholder's credit limit with zero funds transferred until checkout settlement, whereas a charge immediately transfers money",
        "A pre-authorization hold can only be done in cash",
        "A charge can only be processed after six months",
        "There is no difference; banks treat both identically"
      ],
      answer: 0
    },
    {
      q: "In luxury hotel operations, what does 'Walking a Guest' refer to?",
      options: [
        "Escorting a guest on a nature hike through the resort grounds",
        "Relocating a confirmed reservation to a comparable luxury competitor property with all expenses covered due to an overbooked hotel capacity",
        "Refusing to allow a guest to use the elevator",
        "Walking a guest's pet dog around the garden"
      ],
      answer: 1
    }
  ]
};

// hosp-m3
const hosp_m3 = {
  id: "hosp-m3",
  title: "Fine Dining Service, Wine Pairing and Table Etiquette",
  titleES: "Servicio de Alta Gastronomía, Maridaje de Vinos y Etiqueta de Mesa",
  icon: "fa-solid fa-wine-glass",
  isGoldModel: true,
  readings: [
    {
      id: "hosp-m3-r1",
      title: "Fine Dining Mechanics: Brigade System, Decanting Protocol & Multi-Course Wine Pairing",
      duration: "15 min",
      content: `
# Fine Dining Mechanics: Brigade System, Decanting Protocol & Multi-Course Wine Pairing

In Michelin-starred, AAA Five Diamond, and Relais & Châteaux dining rooms, dinner is not merely sustenance; it is a synchronized three-hour theatrical performance. Every plate cover, wine goblet pour, crumb sweeping motion, and napkin refold is executed according to centuries of formal culinary choreography. From Mexico City’s world-ranking contemporary gastronomic temples (Pujol, Quintonil) to classical French dining rooms, service precision elevates culinary art into an unforgettable sensory journey.

Mastering haute cuisine front-of-house operations demands understanding the classical **Brigade de Cuisine & Dining Room Hierarchy**, the geometry of formal **Mise en Place Table Covers**, the sensory science of **Multi-Course Wine & Beverage Pairing**, and the ritual mechanics of **Decanting Aged Vintages**.

---

## 1. The Classical Dining Room Brigade Hierarchy (The Auguste Escoffier Legacy)

Fine dining service relies on rigid organizational discipline:

\`\`\`
Fine Dining Service Brigade Hierarchy:
[ Maître d'Hôtel / General Manager ]   Orchestrates floor pacing, VIP seating, and dining room atmosphere.
               |
[ Head Sommelier (Chef Sommelier) ]    Curates wine cellar, executes decanting rituals, directs pairings.
               |
[ Captain (Chef de Rang) ]             Supervises dedicated station (4-5 tables); takes orders, finishes tableside.
               |
[ Front Server (Demi-Chef de Rang) ]   Delivers synchronized plates, pours water, explains complex culinary techniques.
               |
[ Commis (Back Server / Runner) ]      Transports dishes from kitchen pass, clears covers, handles crumb trays.
\`\`\`

### The Universal Service Mechanics
Across all formal dining rooms, service executes according to unyielding spatial rules:
- **Serve from the Left with the Left Hand**: Food plates are served to the guest’s left side using the server’s left arm, ensuring the server’s body does not create an awkward barrier in front of the diner.
- **Clear from the Right with the Right Hand**: Soiled plates and silverware are removed from the guest’s right side using the server’s right hand.
- **Pour Beverages Exclusively from the Right**: Water, wine, and coffee are poured from the guest's right side, holding the bottle with the label turned outward toward the guest, never allowing the bottle neck to physically touch the lip of the crystal glass.
- **Order of Service**: Ladies first, followed by gentlemen, concluding with the table host (regardless of gender).

---

## 2. The Geometry of Table Mise en Place (The Cover)

A **Cover** represents the physical layout of china, silver, linen, and glassware allocated to a single diner. Alignment is measured to the millimeter:

\`\`\`
Formal 7-Course Cover Layout:
[ B&B Plate + Butter Knife ]                                  [ White Wine ]  [ Red Wine ]  [ Water Goblet ]
(Top Left of Cover)                                                \               |              /
                                                                 [ Dessert Spoon & Fork ] (Top Center)
                                                                 
[ Fish Knife ]  [ Meat Knife ]  [ Charger / Service Plate ]  [ Meat Fork ]  [ Fish Fork ]  [ Salad Fork ]
---------------------------------------------------------------------------------------------------------
                                 ^ EXACTLY 1.0 INCH (2.5 CM) FROM THE TABLE EDGE ^
\`\`\`

### Key Cover Standards
1. **The Base Line**: The bottom edge of all flatware and the charger plate must align exactly **1.0 inch (2.5 cm)** from the edge of the table.
2. **Outside-In Silverware Sequencing**: Flatware is arranged strictly in the order of consumption from the outside inward (e.g., outermost soup spoon first $\rightarrow$ fish knife/fork second $\rightarrow$ main meat knife/fork innermost).
3. **Napkin Protocol**: If a guest excuses themselves from the table during the meal, the server immediately approaches the table using discreet silver tongs, refolds the napkin, and places it neatly on the left side of the charger plate (or on the arm of the chair) before the guest returns.

---

## 3. Sensory Wine Pairing Architecture: Acidity, Tannins & Terroir

Pairing wine or Mexican artisanal spirits (Mezcal, Tequila, Bacanora) with modern culinary menus requires understanding food-beverage chemistry:

### The Core Biochemical Rules of Pairing
- **Acidity Bridges**: High-acid foods (ceviches, citrus sauces, tomatoes) make low-acid wines taste flat and flabby. High-acid wines (Sauvignon Blanc, Albariño, Champagne) clean the palate, cutting through rich buttery emulsified sauces.
- **Tannin & Protein Affinity**: Astringent polyphenolic tannins in heavy red wines (Cabernet Sauvignon, Nebbiolo, Syrah) bind directly to saliva proteins, creating a dry mouthfeel. When paired with high-protein, marbled meats (Wagyu ribeye, roasted lamb), the fat and protein bind the tannins, softening the wine into a velvety texture.
- **Sweetness Hierarchy**: The dessert wine (Sauternes, Port, Late Harvest Tokaji) must always have a higher residual sugar concentration than the dessert itself; otherwise, the dessert makes the wine taste sharp, sour, and unpleasantly acidic.
- **Terroir Harmonization**: Traditional regional foods naturally complement regional wines ("What grows together, goes together"—e.g., Baja California grilled Pacific lobster with Valle de Guadalupe oaked Chardonnay).

---

## 4. Engineering Field Scenario: The Decanting Ritual for an Aged Vintage

At a Michelin-starred fine dining restaurant in Mexico City's Polanco district:

### The Order
A table of VIP international collectors orders a bottle of **1990 Château Margaux (Grand Cru Classé, Bordeaux)** valued at $\$2,400\\ \\text{USD}$.

### The Dual Objectives of Decanting
1. **Aeration (Waking up the Wine)**: Allowing controlled oxygen contact to dissipate volatile sulfur compounds and bloom complex secondary and tertiary aromas (leather, cedar, black truffle, cassis).
2. **Sediment Separation**: Aged red wines naturally precipitate potassium bitartrate crystals and polymerized tannins over decades, forming a bitter, gritty sludge at the bottom of the bottle. Decanting removes the clear liquid while trapping the sediment.

### Executing the Classical Candle Decanting Protocol
The Head Sommelier executes an unhurried 7-step ritual tableside:

1. **Cellar Transport & Presentation**: The bottle is retrieved from the climate-controlled cellar ($14^\\circ\\text{C}, 70\\%\\ \\text{RH}$) resting horizontally in a woven wicker wine basket to prevent shaking sediment. The Sommelier presents the bottle to the host, displaying the label and verifying vintage and appellation verbally.
2. **Capsule Cutting**: Using the foil cutter blade on a Sommelier corkscrew, the sommelier cuts the lead capsule **below the second lower lip** of the bottle neck to prevent wine from touching oxidized metal during pouring.
3. **Extraction & Cork Inspection**: The sommelier drives the grooved worm into the cork center, easing the 34-year-old aged cork out slowly with zero audible squeak or pop. The sommelier inspects the cork for mold or crumbling, presenting the cork on a silver coaster for the host’s tactile inspection.
4. **Candle Illumination**: A clean paraffin candle is lit on the tableside guéride service cart.
5. **The Continuous Decanting Pour**:
   - The sommelier holds the mouth-blown crystal decanter in the left hand and the bottle in the right hand.
   - The neck of the bottle is positioned directly above the candle flame at a distance of 6 inches.
   - The sommelier pours the wine into the decanter in one continuous, steady, unhurried stream.
   - The candle flame shines brilliantly through the glass neck: the instant the sommelier observes the dark, cloudy plume of bitter sediment approaching the shoulder, the pour is instantly halted. Approximately $25\\ \\text{mL}$ of liquid containing all sediment remains inside the bottle.
6. **Host Tasting Pour**: A small $30\\ \\text{mL}$ sample is poured into the host's Riedel Bordeaux crystal glass for aroma and balance approval.
7. **Table Service**: Upon host nod, the wine is served clockwise around the table, pouring from the guest's right side, rotating the decanter wrist upward to prevent dripping.

---

> **Key Takeaway**: Fine dining service is an exact science of sensory choreography. By mastering the Brigade hierarchy, precise cover geometry, biochemical pairing dynamics, and classical tableside decanting rituals, hospitality professionals transform gastronomy into an elite art form.
`
    }
  ],
  dialogue: {
    title: "Presenting an 8-Course Pairing Menu to International Culinary Critics",
    titleES: "Presentando un Menú de Maridaje de 8 Tiempos a Críticos Culinarios Internacionales",
    scenarioContext: "A Head Sommelier in Mexico City and an Executive Chef from Lyon collaborate to present an innovative Mexican-French tasting menu to Michelin inspectors in Polanco.",
    characters: [
      { name: "Chef Jean-Luc Moreau", role: "Executive Culinary Director", company: "L'Ermitage Gastronomique (Lyon & CDMX)" },
      { name: "Lic. Andrea Carvajal", role: "Head Sommelier & Cellar Master", company: "Restaurante Quetzal (Polanco, CDMX)" }
    ],
    turns: [
      {
        speaker: "Chef Jean-Luc Moreau",
        text: "Andrea, for course five of tonight's tasting menu, we are serving braised short rib in an artisanal mole negro infused with seventy percent Oaxacan cacao and dried chilhuacle peppers. It has intense sweet, spicy, and bitter notes. What wine pairing can stand up to that complex viscosity?",
        translation: "Andrea, para el quinto tiempo del menú de degustación de esta noche, estamos sirviendo costilla braseada en mole negro artesanal infusionado con setenta por ciento de cacao oaxaqueño y chiles chilhuacles secos. Tiene notas intensas dulces, especiadas y amargas. ¿Qué maridaje de vino puede hacer frente a esa compleja viscosidad?",
        targetTerms: ["braised short rib", "mole negro", "Oaxacan cacao", "complex viscosity"]
      },
      {
        speaker: "Lic. Andrea Carvajal",
        text: "A standard high-tannin Cabernet Sauvignon would clash with the dried chili heat, creating a harsh metallic bitterness on the palate. I have selected a 2018 Nebbiolo from Valle de Guadalupe aged twenty-four months in neutral French oak. The high natural acidity cuts through the beef fat, while the tertiary aromas of tobacco and dried plum harmonize with the mole.",
        translation: "Un Cabernet Sauvignon estándar de alto tanino chocaría con el picante del chile seco, creando un amargor metálico áspero en el paladar. He seleccionado un Nebbiolo 2018 del Valle de Guadalupe con crianza de veinticuatro meses en roble francés neutro. La alta acidez natural corta la grasa de la res, mientras que los aromas terciarios de tabaco y ciruela pasa armonizan con el mole.",
        targetTerms: ["high-tannin", "clash with chili heat", "metallic bitterness", "high natural acidity", "tertiary aromas"]
      },
      {
        speaker: "Chef Jean-Luc Moreau",
        text: "Brilliant pairing. How will your sommelier brigade handle glassware service and pouring temperatures at the table? The ambient room temperature is currently twenty-one degrees.",
        translation: "Maridaje brillante. ¿Cómo manejará tu brigada de sommeliers el servicio de cristalería y las temperaturas de servicio en la mesa? La temperatura ambiental de la sala es actualmente de veintiún grados.",
        targetTerms: ["glassware service", "pouring temperatures", "ambient room temperature"]
      },
      {
        speaker: "Lic. Andrea Carvajal",
        text: "We are decanting the Nebbiolo forty-five minutes prior to service to soften the tannins. The wine will be poured at precisely seventeen degrees Celsius in Riedel Vinum Syrah glasses to focus the aroma bouquet toward the nose. Service will be poured strictly from the guest's right side with the label presented.",
        translation: "Estamos decantando el Nebbiolo cuarenta y cinco minutos antes del servicio para suavizar los taninos. El vino se servirá a exactamente diecisiete grados Celsius en copas Riedel Vinum Syrah para enfocar el bouquet de aromas hacia la nariz. El servicio se servirá estrictamente por el lado derecho del huésped con la etiqueta a la vista.",
        targetTerms: ["decanting forty-five minutes prior", "soften the tannins", "focus the aroma bouquet", "poured from the right"]
      },
      {
        speaker: "Chef Jean-Luc Moreau",
        text: "What about the transition to course six—the pre-dessert palate cleanser featuring prickly pear sorbet and lime-cilantro foam?",
        translation: "¿Qué hay de la transición al sexto tiempo—el limpiador de paladar previo al postre con sorbete de xoconostle y espuma de limón-cilantro?",
        targetTerms: ["transition to course six", "palate cleanser", "prickly pear sorbet"]
      },
      {
        speaker: "Lic. Andrea Carvajal",
        text: "The back servers will clear all red wine glasses and meat cutlery from the right, wipe down any bread crumbs with our silver crumbing tool, and lay down chilled mother-of-pearl spoons. We will pour an ancestral Oaxacan Tobalá mezcal infused with damiana at eight degrees Celsius to reset the palate.",
        translation: "Los meseros retirarán todas las copas de vino tinto y cubiertos de carne por la derecha, limpiarán las migajas de pan con nuestra pala recogemigas de plata y colocarán cucharas de madreperla frías. Serviremos un mezcal ancestral Oaxaqueño Tobalá infusionado con damiana a ocho grados Celsius para reiniciar el paladar.",
        targetTerms: ["clear all red wine glasses", "silver crumbing tool", "mother-of-pearl spoons", "reset the palate"]
      }
    ],
    contrastTips: [
      {
        school: "We put all the forks on the table together.",
        native: "We aligned a classical 7-course cover exactly one inch from the table edge with outside-in flatware sequencing.",
        explanation: "Fine dining geometry requires millimeter precision (1 inch / 2.5 cm from edge) and strict sequencing matching the tasting menu progression."
      },
      {
        school: "We pour wine to make the customer happy.",
        native: "We executed the candle decanting ritual to separate aged sediment and aerate the vintage bouquet.",
        explanation: "Serving fine aged wine is a formal mechanical ritual involving decanters, candle inspection to trap sediment, and temperature control."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Brigade de Cuisine / Salle",
      ipa: "/brɪˈɡɑːd də kwɪˈziːn / sɑːl/",
      es: "Brigada de Cocina y Comedor (Sistema Escoffier)",
      category: "Culinary Hierarchy",
      definition: "The classical hierarchical staffing structure developed by Auguste Escoffier dividing restaurant kitchen and dining room duties into specialized roles (Maître d', Chef de Rang, Sommelier, Commis).",
      collocations: ["direct the dining room brigade", "coordinate kitchen and service brigade", "classical Escoffier brigade", "Chef de Rang station management"],
      falseFriends: "Brigade is an organized professional culinary team, not an army military infantry unit.",
      nativeUsage: "Under the direction of the Maître d'Hôtel, the dining room brigade synchronized the synchronized dome removal for table four."
    },
    {
      term: "Decanting (Candle Decanting)",
      ipa: "/dɪˈkæn.tɪŋ / ˈkæn.dəl dɪˌkæn.tɪŋ/",
      es: "Decantación (Decantación a la Vela)",
      category: "Sommelier Protocols",
      definition: "The deliberate pouring of wine from its bottle into a crystal decanter over an open candle flame to separate bitter sediment in aged vintages and aerate the wine bouquet.",
      collocations: ["decant an aged Bordeaux", "candle decanting tableside", "separate bitartrate sediment", "aeration in wide-bottom decanter"],
      falseFriends: "Decanting is a delicate mechanical pouring process, not simply uncorking a bottle and letting it sit on a counter.",
      nativeUsage: "The sommelier lit a candle to monitor the bottle neck, carefully decanting the 1982 vintage to trap the sediment."
    },
    {
      term: "Table Cover (Mise en Place)",
      ipa: "/ˈteɪ.bəl ˌkʌv.ər / ˌmiːz ɒn ˈplɑːs/",
      es: "Montaje de Mesa (Cover / Mise en Place)",
      category: "Dining Mechanics",
      definition: "The complete geometric arrangement of flatware, charger plates, stemware, and linens allocated to a single diner, set exactly 1 inch from the table edge.",
      collocations: ["set a classical 7-course cover", "outside-in silverware cover", "align charger plate to table edge", "refresh the cover between courses"],
      falseFriends: "A 'cover' in restaurant operations can mean either the physical table setting or the count of dining guests seated.",
      nativeUsage: "Before the VIP tasting dinner, the captain used a wooden ruler to ensure every fork in the cover was exactly one inch from the table edge."
    },
    {
      term: "Tannin & Protein Binding",
      ipa: "/ˈtæn.ɪn ənd ˈproʊ.tiːn ˌbaɪn.dɪŋ/",
      es: "Interacción de Taninos y Proteínas",
      category: "Sensory Pairing",
      definition: "The chemical phenomenon where astringent polyphenols (tannins) in red wine bind to salivary and meat proteins, softening the astringency of the wine and cutting beef fat.",
      collocations: ["soften tannins through protein binding", "marbled ribeye with high-tannin red", "astringency on the palate", "polyphenolic mouthfeel"],
      falseFriends: "Tannins are natural grape and oak compounds causing dry mouthfeel; they are not artificial chemical additives.",
      nativeUsage: "The sommelier paired the heavily marbled Wagyu strip loin with a high-tannin Barolo, using protein binding to create a velvety finish."
    },
    {
      term: "Crumbing Protocol (Silent Service)",
      ipa: "/ˈkrʌm.ɪŋ ˈproʊ.tə.kɒl/",
      es: "Servicio de Limpieza de Migajas (Crumbing)",
      category: "Table Etiquette",
      definition: "The quiet, tableside removal of bread crumbs and debris from the tablecloth between the entrée and dessert courses using a curved silver crumber or folded linen.",
      collocations: ["crumb the table before dessert", "silver crumbing tool", "discreet crumbing technique", "silent table maintenance"],
      falseFriends: "Crumbing refers to sweeping crumbs off the table, not coating food in bread crumbs.",
      nativeUsage: "Between the fish and dessert courses, the commis server discreetly used a silver crumbing blade to restore the white linen tablecloth."
    },
    {
      term: "Tasting Menu (Menu Dégustation)",
      ipa: "/ˈteɪ.stɪŋ ˌmɛn.juː / məˈnjuː deɪ.ɡuːˈsteɪ.ʃən/",
      es: "Menú de Degustación (Menu Dégustation)",
      category: "Gastronomic Concepts",
      definition: "A curated multi-course culinary progression (typically 7 to 14 small dishes) showcasing the executive chef's signature philosophy, accompanied by wine pairings.",
      collocations: ["order the 9-course tasting menu", "curate a wine-paired tasting menu", "menu dégustation progression", "palate cleanser in tasting menu"],
      falseFriends: "A tasting menu consists of small, structured bite-sized courses, not full-sized à la carte main dishes.",
      nativeUsage: "The gastronomic restaurant in Polanco offered a 12-course tasting menu highlighting pre-Hispanic Mexican ingredients."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Applying Biochemical Pairing Principles to High-Acid Foods",
      botQuestion: "A guest orders a fresh Pacific sea bass ceviche cured in Key lime juice, tossed with serrano chilies and fresh cilantro. The guest asks the sommelier to recommend a heavy, buttery, oaked California Chardonnay ($14% ABV, low acidity, heavy oak vanillin). Explain why this pairing will fail based on the chemistry of food acidity, and recommend an optimal grape varietal pairing.",
      requiredKeywords: ["acidity", "flabby", "citrus", "cut", "sauvignon blanc", "contrast"],
      minKeywords: 3,
      feedbackSuccess: "Spot on sommelier science! Acid in food fundamentally alters wine perception: when food has higher acidity than the wine, the wine's acid is perceived as suppressed, causing a low-acid, buttery oaked Chardonnay to taste completely flat, flabby, overly alcoholic, and unpleasantly cloying. Furthermore, oak vanillin clashes with fresh herbal cilantro and serrano heat. The correct recommendation is a high-acid, un-oaked white wine—such as a crisp Sauvignon Blanc, Albariño, or Sancerre: the high wine acidity matches the lime juice, cutting cleanly through the raw fish oils and refreshing the palate.",
      feedbackRetry: "Explain the rule of acid matching: food that is higher in acid makes low-acid wines taste 'flat' or 'flabby.' Recommend an un-oaked, high-acid white wine (like Sauvignon Blanc, Albariño, or Chablis) to harmonize with the lime ceviche."
    },
    {
      step: 2,
      concept: "Troubleshooting a Broken Cork during Tableside Wine Service",
      botQuestion: "While opening an expensive 1985 vintage Barolo tableside in front of VIP diners, the 39-year-old aged cork snaps in half, with the lower 2 centimeters remaining lodged tightly inside the bottle neck. Describe the immediate physical and verbal protocol the sommelier must execute to recover the cork without contaminating the wine with cork crumbs or alarming the guests.",
      requiredKeywords: ["apologize", "ah-so", "extractor", "crumbs", "strainer", "decant"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding professional sommelier composure! 1) Verbal Poise: Maintain total calm; do not display panic or frustration. Address the host with polite assurance: 'Aged corks from this era are exceptionally delicate, Mr. Vance; allow me a brief moment to extract the remaining segment cleanly'; 2) Physical Recovery: Do not force a standard corkscrew worm into the remaining crumbly cork (which pushes it into the wine). Utilize a specialized two-pronged **Ah-So wine extractor**: gently rock the longer and shorter spring-steel blades between the glass neck and cork sides, twisting slowly upward to pull the lower plug intact; 3) Contingency Cleanliness: If minor cork flecks detached, pour through a sterile fine mesh silver wine funnel strainer during candle decanting to guarantee zero floating particles enter the crystal decanter.",
      feedbackRetry: "Describe how to maintain verbal composure, explain the use of an 'Ah-So' two-pronged vintage cork puller rather than forcing a screw deeper, and mention decanting through a fine silver mesh strainer if cork fragments break off."
    }
  ],
  quiz: [
    {
      q: "Under classical fine dining service mechanics, from which side of the guest must food plates be served and cleared?",
      options: [
        "Served from the left with the left hand, cleared from the right with the right hand",
        "Served from the right, cleared from the left",
        "Both served and cleared exclusively from the front",
        "It does not matter as long as the server is fast"
      ],
      answer: 0
    },
    {
      q: "What is the primary physical objective of the Candle Decanting ritual for aged red wines?",
      options: [
        "To heat the wine up to 40°C before drinking",
        "To shine light through the neck of the bottle while pouring in a steady stream, allowing the sommelier to stop immediately when dark, bitter sediment reaches the bottle shoulder",
        "To burn off any alcohol fumes",
        "To make the dining table look romantic"
      ],
      answer: 1
    },
    {
      q: "In a formal 7-course table cover (Mise en Place), what is the golden rule for flatware sequencing?",
      options: [
        "Use the silverware from the outside inward, matching the order of courses served",
        "Use whatever fork looks cleanest",
        "All cutlery must be placed in a glass at the center of the table",
        "Knives are placed on the left and forks on the right"
      ],
      answer: 0
    },
    {
      q: "Why does pairing an astringent, high-tannin red wine with heavily marbled grilled steak create a balanced, velvety mouthfeel?",
      options: [
        "The steak's red blood color matches the wine",
        "Tannins bind chemically to the animal proteins and fats in the meat rather than stripping saliva proteins from the tongue, softening the astringency of the wine",
        "The salt in the steak neutralizes all wine alcohol",
        "Steak cools the wine down"
      ],
      answer: 1
    }
  ]
};

// hosp-m4
const hosp_m4 = {
  id: "hosp-m4",
  title: "Service Recovery & Conflict Resolution Protocols (LAST Model)",
  titleES: "Recuperación de Servicio y Resolución de Conflictos (Modelo LAST)",
  icon: "fa-solid fa-handshake-angle",
  isGoldModel: true,
  readings: [
    {
      id: "hosp-m4-r1",
      title: "Service Recovery Architecture: The LAST Model, Frontline Empowerment & Loyalty Restoration",
      duration: "15 min",
      content: `
# Service Recovery Architecture: The LAST Model, Frontline Empowerment & Loyalty Restoration

In luxury and high-touch hospitality, operating with $100\\%$ technical flawlessness every minute of every day is a statistical impossibility. Air conditioning compressors experience unexpected electrical faults; luxury airport transfers encounter highway gridlock; and kitchen lines occasionally misinterpret a severe shellfish allergy ticket. 

What separates world-class hospitality brands from mediocre operations is not the complete absence of service failures, but the speed, empathy, and institutional empowerment deployed to execute **Service Recovery**.

When managed with psychological sophistication, resolving a service breakdown can actually produce what social scientists call the **Service Recovery Paradox**: a psychological phenomenon where a customer whose problem was resolved with extraordinary generosity and speed displays **higher brand loyalty and lifetime spend** than a customer who experienced an uneventful, baseline stay.

---

## 1. The LAST Framework for Conflict De-escalation

In high-stakes conflict resolution with distressed luxury guests, improvised arguments or bureaucratic deflections (*"It's hotel policy"*) instantly inflame tensions. Staff are trained in the **LAST Model**:

\`\`\`
The LAST Service Recovery Cycle:
[ L: Listen ]   ---> Active listening without interruption. Validate emotional frustration.
      |
[ A: Apologize] ---> Sincere, unreserved institutional apology. Take absolute ownership.
      |
[ S: Solve ]    ---> Immediate tangible resolution utilizing frontline financial empowerment.
      |
[ T: Thank ]    ---> Express genuine gratitude to the guest for bringing the issue to light.
\`\`\`

### 1. Listen (Active Emotional Attunement)
- **Do Not Interrupt**: Allow the guest to vent completely. Research in crisis psychology demonstrates that interrupting an agitated customer resets their emotional frustration timer.
- **Non-Defensive Body Language**: Maintain calm, compassionate eye contact. Slightly tilt the head forward, keep palms open, and avoid crossing arms or looking at computer screens.
- **Verbal Validation**: Use reflective listening: *"I hear how deeply frustrating it was to wait forty minutes for room service after a ten-hour transatlantic flight, Mr. Sterling."*

### 2. Apologize (Personal Ownership vs. Deflection)
- Deliver a sincere, empathetic apology without excusing the failure or blaming colleagues:
  - *Prohibited Excuses*: *"Our dishwasher called in sick"* or *"The computer crashed."*
  - *Empowered Ownership*: *"I sincerely apologize that your dinner arrived cold this evening. This falls completely below our standards, and I am taking personal responsibility to make this right for you immediately."*

### 3. Solve (Immediate Action & The Empowerment Budget)
- Formulate a solution that addresses both the physical breakdown (getting hot food) and the emotional injury (providing an elevated compensatory gesture).
- **The Frontline Empowerment Budget**: In leading luxury brands (such as The Ritz-Carlton and Four Seasons), every single employee—from housekeeping room attendants to pool valets—is legally authorized to spend up to **$\\$2,000\\ \\text{USD}$ per guest incident** without seeking managerial sign-off. This eliminates the fatal phrase *"Let me ask my manager,"* resolving issues in minutes.

### 4. Thank (Gratitude for Feedback)
- Close the interaction by thanking the guest for their candor: *"Thank you so much for bringing this to my direct attention, Mrs. Reed; your feedback allows us to correct our line timing and ensure your remaining stay is flawless."*

---

## 2. The Psychology of the Service Recovery Paradox

The **Service Recovery Paradox (SRP)** is grounded in expectation-disconfirmation theory:

\`\`\`
Service Recovery Paradox Dynamics:
High Customer Loyalty
  ^                                           [ Flawlessly Recovered Guest ]
  |                                                  / (Exceeds Original Satisfaction)
  |      [ Baseline Satisfied Guest ]               /
  |              ----------------------------------/
  |                                               /
  |                                              /
  |                                  [ Service Breakdown Occurs ]
  |                                             |
  v                                             v
Low Customer Loyalty                    (Unrecovered Failure Leads to Permanent Churn)
\`\`\`

### Conditions Governing the Paradox
The paradox does not occur automatically:
1. **Severity of Failure**: The failure must not be perceived as deliberate, reckless, or life-threatening. A noisy mini-fridge can be recovered into customer delight; severe food poisoning resulting in hospitalization will rarely trigger the paradox.
2. **Prior Reliability**: The guest must perceive that the failure was an isolated anomaly in an otherwise exceptional property.
3. **Speed & Generosity of Remedy**: The recovery gesture must exceed the perceived value of the original loss. If a dinner is delayed by an hour, taking $10\\%$ off the bill is seen as cheap and insulting; waiving the entire meal check, sending private vintage digestifs, and arranging a complimentary oceanfront massage creates the paradox.

---

## 3. De-escalation Techniques for Highly Agitated Guests

When handling aggressive or angry guests at the front desk:

### 1. The Isolation Technique
Never argue or resolve a volatile conflict in the middle of a crowded lobby where other arriving guests can hear. Calmly invite the guest into a private VIP lounge or quiet executive office:
- *"Mr. Vance, your comfort and privacy are paramount to us. May I invite you into our private salon so we can review this comfortably with a fresh espresso?"*

### 2. The "Fogging" Technique
Acknowledge the guest's emotion and agreeing with their facts without accepting irrational insults:
- *Guest*: *"Your staff are completely incompetent and this hotel is a disaster!"*
- *Manager*: *"You are completely right that waiting an hour for your suite is unacceptable, Mr. Vance, and I understand why you are furious. I am here to personally take care of this right now."*

### 3. Avoiding Institutional Traps
Never quote written policies, contract clauses, or hotel terms. Words like *"policy," "regulations,"* and *"non-refundable"* act as accelerants on emotional anger.

---

## 4. Engineering Field Scenario: Resolving a Cancelled VIP Helicopter Transfer

At a cliffside ultra-luxury resort in the Riviera Maya:

### The Crisis
A billionaire venture capitalist and his family booked the resort's signature private twin-engine helicopter transfer from Cancún International Airport to the resort's helipad ($3,500\\ \\text{USD}$). Due to sudden mechanical hydraulic sensor fault on the aircraft, the flight was aborted while the family waited on the tarmac in $35^\\circ\\text{C}$ tropical heat. The family was forced to travel in an un-airconditioned airport shuttle van, arriving at the resort two hours late, furious, and threatening to cancel their $\\$45,000\\ \\text{USD}$ week-long villa reservation.

### Executing the High-Stakes Recovery Sequence
The Resort General Manager met the family curbside, having prepared the recovery action plan in advance:

1. **Curbside Reception & VIP Isolation**: The GM greeted Mr. Thorne by name, bypassing the lobby entirely, and escorted the family straight to their beachfront Presidential Villa where private check-in was arranged.
2. **Unreserved Apology (LAST Framework)**:
   - *"Mr. Thorne, I will not offer excuses. Having your private flight cancelled on the tarmac after a long journey is completely unacceptable. You trusted us with your family's arrival, and we failed to deliver the seamless luxury experience you deserve. I am deeply and personally sorry."*
3. **The Compensatory Action**:
   - The GM waived the entire $\\$3,500\\ \\text{USD}$ transfer fee.
   - The resort arranged a complimentary private luxury yacht charter for the following afternoon to Isla Mujeres, staffed with the executive chef and open champagne bar (a $\\$6,000\\ \\text{USD}$ retail value).
   - Housekeeping staged the villa with personalized gifts for the children and chilled Dom Pérignon champagne for the parents.
4. **Follow-Through & Verification**:
   - The GM returned personally the next morning at breakfast to check on the family's comfort and verify the yacht departure logistics.
5. **The Outcome (The Paradox Realized)**:
   - The family was so touched by the GM's humility, speed, and lavish compensatory gesture that they extended their villa stay by three additional nights, spent over $\\$12,000\\ \\text{USD}$ on private wine cellar reserves, and re-booked the Presidential Villa for the upcoming New Year's holiday.

---

> **Key Takeaway**: Service breakdowns are inevitable; service failure is a choice. By applying the LAST model (Listen, Apologize, Solve, Thank), eliminating defensive excuses, and empowering staff with generous recovery authority, luxury operators turn catastrophic mistakes into lifelong brand loyalty.
`
    }
  ],
  dialogue: {
    title: "De-escalating a Cancelled VIP Yacht Excursion in the Riviera Maya",
    titleES: "Desescalando una Excursión VIP en Yate Cancelada en la Riviera Maya",
    scenarioContext: "A Resort General Manager in the Riviera Maya and an Executive Guest Relations Director resolve an intense luxury confrontation after poor weather forces an excursion cancellation.",
    characters: [
      { name: "Lord Alistair Sterling", role: "High-Net-Worth VIP Guest", company: "Private Client (London, UK)" },
      { name: "Lic. Valeria Santoro", role: "Resort General Manager", company: "Mayakoba Luxury Sanctuary (Riviera Maya, Q. Roo)" }
    ],
    turns: [
      {
        speaker: "Lord Alistair Sterling",
        text: "Valeria, this is utterly disgraceful. I booked your eighty-foot private catamaran four months ago to celebrate my wife's fiftieth birthday with our guests. Your concierge just informed me twenty minutes before boarding that the harbor master closed the port due to sea swells. This has ruined our entire holiday.",
        translation: "Valeria, esto es completamente vergonzoso. Reservé su catamarán privado de ochenta pies hace cuatro meses para celebrar el cumpleaños número cincuenta de mi esposa con nuestros invitados. Su concierge acaba de informarme veinte minutos antes de abordar que la capitanía de puerto cerró el puerto debido al oleaje. Esto ha arruinado todas nuestras vacaciones.",
        targetTerms: ["utterly disgraceful", "eighty-foot private catamaran", "harbor master closed the port", "ruined our entire holiday"]
      },
      {
        speaker: "Lic. Valeria Santoro",
        text: "Lord Sterling, I hear your profound disappointment, and I share your frustration entirely. Today is Lady Sterling's milestone fiftieth birthday, and having this voyage cancelled at the last minute is deeply distressing. I apologize unreservedly for the distress this has caused your family.",
        translation: "Lord Sterling, entiendo su profunda decepción y comparto su frustración por completo. Hoy es el cumpleaños número cincuenta de Lady Sterling, y que este viaje se cancele a último momento es sumamente angustiante. Le pido una disculpa sin reservas por el malestar que esto ha causado a su familia.",
        targetTerms: ["profound disappointment", "milestone fiftieth birthday", "deeply distressing", "apologize unreservedly"]
      },
      {
        speaker: "Lord Alistair Sterling",
        text: "An apology does not provide a celebration for twenty guests who are dressed and standing in the lobby. What are you going to do about it?",
        translation: "Una disculpa no ofrece una celebración para veinte invitados que están vestidos y de pie en el lobby. ¿Qué va a hacer al respecto?",
        targetTerms: ["celebration for twenty guests", "standing in the lobby"]
      },
      {
        speaker: "Lic. Valeria Santoro",
        text: "While maritime port regulations strictly prohibit sea navigation today for passenger safety, I have already mobilized our culinary and events teams. We have reserved our private jungle cenote lagoon exclusively for your party this afternoon, completely closed to all other resort guests.",
        translation: "Si bien las regulaciones portuarias marítimas prohíben estrictamente la navegación marítima hoy por seguridad de los pasajeros, ya he movilizado a nuestros equipos de cocina y eventos. Hemos reservado nuestra laguna privada de cenote en la selva exclusivamente para su grupo esta tarde, completamente cerrada para todos los demás huéspedes del resort.",
        targetTerms: ["maritime port regulations", "private jungle cenote lagoon", "exclusively for your party"]
      },
      {
        speaker: "Lord Alistair Sterling",
        text: "A cenote? What about the live Caribbean jazz band and the champagne pairing lunch we arranged on the yacht?",
        translation: "¿Un cenote? ¿Qué hay de la banda de jazz caribeño en vivo y el almuerzo maridado con champaña que coordinamos en el yate?",
        targetTerms: ["Caribbean jazz band", "champagne pairing lunch"]
      },
      {
        speaker: "Lic. Valeria Santoro",
        text: "Our team has already transferred the live jazz ensemble, the floral arrangements, and our Executive Chef to the cenote pavilion. We are flying in fresh Oaxacan truffles via helicopter from Cancun, and I have personally uncorked vintage Krug champagne from our private reserve with our compliments. Private luxury golf buggies are staged outside to transport your guests right now.",
        translation: "Nuestro equipo ya trasladó al ensamble de jazz en vivo, los arreglos florales y a nuestro Chef Ejecutivo al pabellón del cenote. Estamos trayendo trufas oaxaqueñas frescas en helicóptero desde Cancún y he descorchado personalmente champaña vintage Krug de nuestra reserva privada como cortesía nuestra. Carritos de golf de lujo privados están listos afuera para transportar a sus invitados ahora mismo.",
        targetTerms: ["live jazz ensemble", "vintage Krug champagne", "with our compliments", "private luxury golf buggies"]
      }
    ],
    contrastTips: [
      {
        school: "The port is closed by the government so it is not our fault.",
        native: "While maritime authorities closed the port, I have taken personal ownership to create an even more extraordinary celebration for you.",
        explanation: "In luxury service recovery, blaming government authorities or weather is seen as cheap deflection; leaders take absolute personal ownership of guest happiness."
      },
      {
        school: "I can give you a small discount on your bill.",
        native: "We have arranged a complimentary exclusive experience valued at twice your original booking.",
        explanation: "The Service Recovery Paradox requires overwhelming generosity that replaces disappointment with astonishment and delight."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "LAST Recovery Framework",
      ipa: "/læst rɪˈkʌv.ər.i ˈfreɪm.wɜːrk/",
      es: "Marco de Recuperación LAST (Escuchar, Disculpar, Resolver, Agradecer)",
      category: "Service Psychology",
      definition: "A standardized conflict resolution model: Listen actively without interruption, Apologize sincerely with ownership, Solve immediately with empowerment, and Thank the guest for their candor.",
      collocations: ["apply the LAST framework", "de-escalate via LAST", "frontline LAST execution", "LAST recovery sequence"],
      falseFriends: "LAST is an acronym for Listen, Apologize, Solve, Thank; it does not mean final or previous.",
      nativeUsage: "The concierge applied the LAST framework to de-escalate the agitated guest whose luggage was delayed by the airline."
    },
    {
      term: "Service Recovery Paradox (SRP)",
      ipa: "/ˈsɜːr.vɪs rɪˈkʌv.ər.i ˈpær.ə.dɒks/",
      es: "Paradoja de la Recuperación de Servicio (SRP)",
      category: "Customer Loyalty",
      definition: "A business phenomenon where a customer whose service problem is resolved with exceptional speed and generosity exhibits higher brand loyalty than a customer who experienced zero defects.",
      collocations: ["trigger the service recovery paradox", "exceed original loyalty through SRP", "generous compensatory recovery", "expectation disconfirmation theory"],
      falseFriends: "A paradox is an apparent contradiction that is actually true; it does not mean a corporate disaster.",
      nativeUsage: "By waiving the villa fee and hosting a private dinner, the hotel triggered the service recovery paradox, securing a multi-year client."
    },
    {
      term: "Frontline Empowerment",
      ipa: "/ˈfrʌnt.laɪn ɪmˈpaʊ.ər.mənt/",
      es: "Empoderamiento del Personal de Primera Línea",
      category: "Management Strategy",
      definition: "The institutional authority granted to customer-facing staff to spend financial resources (e.g., up to $2,000 USD) immediately to solve customer complaints without managerial approval.",
      collocations: ["exercise frontline empowerment", "discretionary empowerment budget", "empower staff to resolve issues", "zero managerial bottlenecks"],
      falseFriends: "Empowerment gives staff actual financial spending authority; it is not just motivational praise.",
      nativeUsage: "Using her frontline empowerment, the server sent a complimentary bottle of Dom Pérignon to table six after an entrée delay."
    },
    {
      term: "Compensatory Amenity",
      ipa: "/kəmˈpɛn.sə.tɔːr.i əˈmɛn.ə.ti/",
      es: "Amenidad Compensatoria (Gesto de Desagravio)",
      category: "Service Recovery",
      definition: "A tangible luxury gift, upgrade, dining credit, or VIP service provided complimentary to an aggrieved guest to restore emotional goodwill and demonstrate institutional remorse.",
      collocations: ["send a compensatory amenity", "curated recovery amenity", "complimentary spa credit", "restore goodwill via amenities"],
      falseFriends: "A compensatory amenity is an apologetic luxury gift, not formal legal financial indemnity.",
      nativeUsage: "Housekeeping delivered a compensatory amenity consisting of artisan chocolates and a spa massage certificate to suite 204."
    },
    {
      term: "Guest Escalation",
      ipa: "/ɡɛst ˌɛs.kəˈleɪ.ʃən/",
      es: "Escalamiento de Queja de Huésped",
      category: "Conflict Management",
      definition: "The critical operational moment when an unresolved customer grievance intensifies in emotional hostility and demands the immediate intervention of executive leadership.",
      collocations: ["handle a high-stakes guest escalation", "prevent escalation to social media", "de-escalate hostile interactions", "executive escalation protocol"],
      falseFriends: "Escalation in hospitality refers to rising conflict severity, not physical movement up an escalator staircase.",
      nativeUsage: "The Front Office Manager intervened during the guest escalation, moving the conversation into the private executive lounge."
    },
    {
      term: "Active Listening",
      ipa: "/ˈæk.tɪv ˈlɪs.ən.ɪŋ/",
      es: "Escucha Activa",
      category: "Communication Skills",
      definition: "A structured communication technique requiring the listener to fully concentrate, comprehend, validate, and respond empathetically without interrupting or preparing defensive replies.",
      collocations: ["practice active listening", "validate emotions via active listening", "non-defensive posture", "reflective verbal affirmation"],
      falseFriends: "Active listening requires deliberate silence and emotional validation, not arguing back immediately.",
      nativeUsage: "By practicing active listening for ten minutes without interruption, the manager allowed the customer to vent their initial frustration."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Evaluating the Limits of the Service Recovery Paradox",
      botQuestion: "A guest dining at a 5-Star resort's seafood grill informs the server that they have a life-threatening anaphylactic peanut allergy. The kitchen accidentally uses peanut oil in the fryers, causing the guest to experience acute respiratory distress requiring emergency epinephrine injection by paramedics in the middle of the dining room. The hotel manager offers a 100% complimentary meal, a free night's stay, and a fruit basket. Will the Service Recovery Paradox apply in this scenario? Explain why or why not based on the psychological limits of SRP.",
      requiredKeywords: ["severity", "life-threatening", "negligence", "paradox", "trust", "hospitalization"],
      minKeywords: 3,
      feedbackSuccess: "Spot on psychological analysis! The Service Recovery Paradox will NOT apply in this catastrophic scenario. Scientific research establishes that SRP has rigid boundary limits: it collapses when a service failure involves severe physical harm, life-threatening danger, gross institutional negligence, or medical emergencies. Anaphylactic shock caused by an ignored medical allergy destroys fundamental psychological trust and personal safety. No amount of complimentary fruit, free meals, or waived room charges can turn a near-fatal poisoning into customer delight or brand loyalty; the outcome is legal liability and permanent customer churn.",
      feedbackRetry: "Analyze the severity of the failure: can a life-threatening medical emergency caused by kitchen negligence trigger the Service Recovery Paradox? Explain how severe bodily harm breaks the psychological conditions of SRP."
    },
    {
      step: 2,
      concept: "De-escalating a Public Lobby Scene using the Isolation Technique",
      botQuestion: "At 3:00 PM during peak check-in with 25 arriving guests in the marble lobby, an irate guest begins shouting at the front desk: 'You people are thieves! You overcharged my American Express card by ten thousand dollars! I demand to see the owner right now!' Describe the exact physical posture, verbal de-escalation phrasing, and spatial movement the Front Office Director must execute within 30 seconds to defuse this public scene.",
      requiredKeywords: ["isolation", "lounge", "private", "calm", "posture", "ownership"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding crisis management choreography! 1) Immediate Approach & Body Language: The Front Office Director immediately steps out from behind the desk, standing slightly to the side (never face-to-face confrontationally) with open palms, relaxed shoulders, and an empathetic, calm demeanor; 2) Verbal De-escalation Phrasing: Deliver immediate personal ownership and validation: 'Mr. Vance, I am the Front Office Director, and I hear your urgency. A discrepancy of that magnitude is completely alarming, and I will personally take care of this right now'; 3) The Isolation Movement: Discreetly guide the guest out of the public lobby: 'Your financial privacy is of utmost importance to us. Please step with me into our private executive salon so we can pull up your exact banking ledger in complete quiet and resolve this immediately.'",
      feedbackRetry: "Describe the three steps: 1) Body language (non-defensive, open palms), 2) Verbal acknowledgment taking personal ownership of the concern, and 3) The Isolation Technique (inviting the guest into a private office or salon away from other guests in the lobby)."
    }
  ],
  quiz: [
    {
      q: "What does the acronym 'LAST' stand for in luxury hospitality service recovery?",
      options: [
        "Late Arrival Settlement Technique",
        "Listen, Apologize, Solve, Thank",
        "Loyalty Auditing Standard Test",
        "Luxury Accommodation Sales Training"
      ],
      answer: 1
    },
    {
      q: "What is the 'Service Recovery Paradox' (SRP)?",
      options: [
        "The paradox that good service costs zero money",
        "A psychological phenomenon where a customer whose complaint is resolved with extraordinary speed and generosity develops higher brand loyalty than a customer who experienced zero failures",
        "The fact that hotels make more money when they are empty",
        "The rule that guests never complain about bad food"
      ],
      answer: 1
    },
    {
      q: "Why is 'Frontline Empowerment' considered essential in 5-Star conflict resolution?",
      options: [
        "It eliminates the need for any managers in the hotel",
        "It authorizes customer-facing staff to spend funds immediately (e.g., up to $2,000) to resolve problems on the spot without frustrating delays or managerial bureaucracy",
        "It allows employees to work from home",
        "It gives employees free meals in the restaurant"
      ],
      answer: 1
    },
    {
      q: "Why is the 'Isolation Technique' recommended when dealing with an extremely angry guest in a hotel lobby?",
      options: [
        "To lock the guest in a room until the police arrive",
        "To protect the guest's privacy and prevent emotional panic or negative perceptions from spreading to other arriving guests in the public area",
        "To avoid having to pay the guest any compensation",
        "Because the lobby has no comfortable chairs"
      ],
      answer: 1
    }
  ]
};

// hosp-m5
const hosp_m5 = {
  id: "hosp-m5",
  title: "Events, Banquets & Luxury Conference Management",
  titleES: "Gestión de Eventos, Banquetes y Convenciones de Lujo",
  icon: "fa-solid fa-champagne-glasses",
  isGoldModel: true,
  readings: [
    {
      id: "hosp-m5-r1",
      title: "MICE Operations: Banquet Event Order (BEO) Execution, Audiovisual Staging & Master Billing",
      duration: "15 min",
      content: `
# MICE Operations: Banquet Event Order (BEO) Execution, Audiovisual Staging & Master Billing

The global **MICE (Meetings, Incentives, Conferences, and Exhibitions)** sector represents the highest-margin, highest-revenue vertical in the hospitality industry. While leisure travelers book one or two rooms, a single international corporate summit or luxury wedding retreat can consume 300 suites, book multi-million-dollar food and beverage programs, and reserve entire ballroom complexes for five consecutive days in premier destinations like Punta Mita, Los Cabos, and the Riviera Maya.

Executing flawless luxury banquets and conventions requires mastery of three operational pillars: the legally binding operational blueprint known as the **Banquet Event Order (BEO)**, precision **Audiovisual & Ballroom Staging Kinetics**, and high-stakes financial **Contract Management (Attrition, Food & Beverage Minimums, and Master Accounts)**.

---

## 1. The Operational Blueprint: The Banquet Event Order (BEO)

In banquet and catering operations, informal verbal agreements between event planners and sales managers are recipes for disaster. The **Banquet Event Order (BEO)**—often called the Event Function Sheet—is the definitive operational contract distributed to every operating department (Executive Kitchen, Stewarding, Banquet Setup, Audiovisual, Engineering, and Housekeeping).

\`\`\`
Anatomy of a Banquet Event Order (BEO):
+---------------------------------------------------------------------------------+
| BEO # 2408-B | Group: Global Tech Leadership Summit | Date: 14-Oct | Room: Grand Ballroom |
| Attendance: 350 Gtd / 385 Set (10% Over-set) | On-Site Contact: Ms. Sarah Jenkins       |
+---------------------------------------------------------------------------------+
| TIME:       | FUNCTION DETAILS:                     | RESPONSIBLE DEPARTMENT:   |
| 17:00-18:00 | Pre-Function Cocktail Reception       | Banquet Beverage / Bar    |
|             | Passed canapés, 3 open premium bars. | Stewarding (Champagne flutes)|
| 18:00-20:30 | Plated 4-Course Gala Dinner           | Executive Chef / Banquets |
|             | 320 Filet Mignon, 30 Vegan Risotto.   | Banquet Captain (35 staff)|
| 20:30-22:00 | Keynote Address & Live Awards Show    | PSAV / In-House AV Team   |
|             | Rigged LED Wall, 6 Lav Mics, DMX Cues | Engineering (HVAC Boost)  |
+---------------------------------------------------------------------------------+
| SETUP SPECS: Banquet rounds of 10. White floor-length damask linen.              |
| Gold Chiavari chairs. 1.5-meter clearance between chair backs for server aisles.|
+---------------------------------------------------------------------------------+
\`\`\`

### The Guarantee vs. The Over-Set Rule
- **The Guarantee (GTD)**: The legally binding minimum guest count provided by the client (typically 72 hours prior to the event). The client is billed for this minimum number even if fewer guests attend.
- **The Over-Set (Typically $3\\%\\text{--}5\\%$)**: The physical number of extra seats and meals prepared by the banquet and culinary team above the guarantee. For an event with a 300-person guarantee, the room is set with 315 physical seats and the kitchen preps 315 proteins to accommodate surprise executive VIP arrivals without delay.

---

## 2. Ballroom Turnover Kinetics & Audiovisual Staging

High-volume conference hotels must execute rapid room transformations (turnovers) within strict time windows:

\`\`\`
Common Conference Room Configurations:
1. Theater Setup:        Chairs in rows facing stage (Maximum capacity, zero writing space).
2. Classroom Setup:      Tables with chairs facing stage (Pads, pens, power strips; high-density training).
3. Banquet Rounds:       Circular 60-inch (8 guests) or 72-inch (10-12 guests) tables for formal dining.
4. Hollow Square / U:    Continuous tables surrounding open center; eye contact for executive board meetings.
\`\`\`

### The 45-Minute Turnover Choreography
A classic operational challenge: transitioning a 500-seat general session **Classroom Setup** into a 500-seat formal **Banquet Rounds Gala** during a 60-minute cocktail hour:
- A dedicated 20-person banquet setup crew sweeps the room in synchronized waves.
- Wave 1 strips table linens and folds classroom tables onto rolling dollies.
- Wave 2 rolls in pre-set circular banquet tables from backstage staging corridors.
- Wave 3 aligns Chiavari chairs using laser-guided centerlines to maintain mandatory **1.5-meter server transit aisles**.
- Wave 4 places floral centerpieces, polished silver covers, and glassware.
- The HVAC engineering team activates pre-cooling 30 minutes before doors open, dropping room temperature to $19.5^\\circ\\text{C}$ to counterbalance the metabolic body heat of 500 seated diners.

### Audiovisual (AV) & Rigging Integration
Modern luxury conferences demand broadcast-level production:
- **LED Video Walls**: Pitch-pixel displays ($1.9\\text{--}2.5\\ \\text{mm}$) hung from certified ceiling dead-hang motor points with documented weight load engineering calculations.
- **RF Spectrum Management**: Coordinating dozens of wireless UHF lapel microphones to prevent frequency clashes with local emergency services or cellular towers.
- **Dedicated Enterprise Bandwidth (VLAN)**: Corporate summits mandate dedicated symmetrical fiber internet (e.g., $500\\ \\text{Mbps}$ upload/download) isolated on secure virtual LANs with cellular 5G failover redundancy.

---

## 3. High-Stakes MICE Financial Engineering: Contracts, Attrition & Minimums

Corporate event agreements involve hundreds of thousands of dollars and carry strict contractual clauses:

### 1. The Attrition Clause (Slippage)
Hotels block out hundreds of rooms months in advance, turning away other business. The **Attrition Clause** protects the hotel against groups failing to fulfill their contracted room commitments:
$$\\text{Allowable Slippage Threshold} = 15\\%\\text{--}20\\%$$
$$\\text{Contracted Minimum Commitment} = 80\\%\\ \\text{of Total Room Block}$$

*Financial Scenario*:
- Contracted Room Block: 400 room nights at $\$400\\ \\text{USD/night} = \\$160,000\\ \\text{USD}$.
- Minimum Attrition Obligation ($80\\%$): $320\\ \\text{room nights}$.
- Actual Rooms Picked Up: 260 room nights.
- Attrition Penalty Billed: $(320 - 260) = 60\\ \\text{shortfall rooms} \\times \\$400 = \\$24,000\\ \\text{USD}$.
The client must pay the $\$24,000\\ \\text{USD}$ penalty directly to the Master Account, compensating the hotel for the perishable unsold inventory.

### 2. Food & Beverage (F&B) Minimums
Contracts establish a non-negotiable dollar minimum spent on catering:
- If a client books the Grand Ballroom on a Saturday evening with a $\$60,000\\ \\text{USD}$ F&B minimum, but their final dinner menu and bar spend tabulates to only $\$48,000\\ \\text{USD}$, the hotel bills the remaining $\$12,000\\ \\text{USD}$ as an **un-met F&B shortfall fee**, or permits the client to purchase high-end vintage wine cases to take home to achieve the minimum.

---

## 4. Engineering Field Scenario: Managing an Emergency Power Outage during a Keynote

At a convention resort in Punta Mita hosting the global annual conference of a Silicon Valley technology titan:

### The Crisis
At 10:15 AM, during the opening live-streamed keynote address by the company's CEO to 400 in-person executives and 50,000 global virtual viewers, a municipal grid substation outside the resort exploded due to a tropical lightning strike:
- High-voltage grid utility power failed instantly across the entire region.
- The ballroom plunged into total darkness for two seconds.

### The Automated Engineering Response
1. **UPS Battery Buffering**: The audiovisual broadcast control racks and main LED wall processors were connected to high-capacity **Uninterruptible Power Supply (UPS)** battery arrays. The live streaming broadcast did not drop for a single millisecond.
2. **Automated Emergency Generator Synchronization**: Within 7 seconds, the resort’s dual $1.5\\ \\text{Megawatt}$ Caterpillar diesel backup generators auto-cranked, synchronized phase frequencies, and the automated transfer switch (ATS) snapped closed, restoring full ballroom stage lighting, HVAC chillers, and sound reinforcement systems.
3. **The Banquet Transition**:
   - While the keynote concluded flawlessly, the outage compromised municipal water pressure to the main banquet prep kitchen right before the 12:00 PM plated luncheon.
   - The Director of Banquets immediately activated the culinary contingency plan: transferring soup and braised beef cooking to the auxiliary outdoor mesquite wood-fired hearths and gas convection ovens, serving 400 perfectly temperature-controlled meals on schedule with zero guest awareness of the municipal catastrophe.

---

> **Key Takeaway**: Luxury MICE operations require military-grade operational synchronization. By structuring clear Banquet Event Orders, mastering rapid ballroom turnover kinetics, enforcing protective attrition contracts, and architecting redundant emergency power systems, event directors deliver world-class corporate gatherings.
`
    }
  ],
  dialogue: {
    title: "Finalizing the BEO for a 400-Guest Technology Executive Summit",
    titleES: "Finalizando el BEO para una Cumbre de Ejecutivos de Tecnología de 400 Invitados",
    scenarioContext: "A Director of Catering & Conference Services in Punta Mita and a Global Corporate Event Planner in Chicago conduct the final BEO review for a multi-million-dollar executive retreat.",
    characters: [
      { name: "Sarah Jenkins", role: "VP of Global Events & Brand Experiences", company: "Novus Cloud Systems (Chicago, IL)" },
      { name: "Lic. Carlos Aréchiga", role: "Director of Catering & Conference Services", company: "Punta Mita Luxury Ocean Resort (Nayarit, MX)" }
    ],
    turns: [
      {
        speaker: "Sarah Jenkins",
        text: "Carlos, we have forty-eight hours until our four hundred global vice presidents land in Puerto Vallarta. I am reviewing the final Banquet Event Orders for Thursday's gala dinner. On the BEO, you have listed an attendance guarantee of three hundred and eighty, but our latest registration audit shows four hundred and six confirmed delegates.",
        translation: "Carlos, estamos a cuarenta y ocho horas de que nuestros cuatrocientos vicepresidentes globales aterricen en Puerto Vallarta. Estoy revisando los BEO finales para la cena de gala del jueves. En el BEO, tienes listada una garantía de asistencia de 380, pero nuestra última auditoría de registro muestra 406 delegados confirmados.",
        targetTerms: ["Banquet Event Orders", "attendance guarantee", "registration audit", "confirmed delegates"]
      },
      {
        speaker: "Lic. Carlos Aréchiga",
        text: "Good morning, Sarah. I saw that registration surge this morning. Our standard BEO over-set policy is three percent, but because we are handling high-profile executives, I have already instructed the banquet captain and Executive Chef to prepare an over-set of eight percent. We will have four hundred and fifteen physical seats and plated filet mignon portions locked in.",
        translation: "Buenos días, Sarah. Vi ese incremento de registros esta mañana. Nuestra política estándar de sobremontaje en BEO es del tres por ciento, pero debido a que estamos manejando ejecutivos de alto perfil, ya he instruido al capitán de banquetes y al Chef Ejecutivo para preparar un sobremontaje del ocho por ciento. Tendremos 415 asientos físicos y porciones de filete miñón preparadas.",
        targetTerms: ["over-set policy", "banquet captain", "over-set of eight percent", "physical seats"]
      },
      {
        speaker: "Sarah Jenkins",
        text: "That gives us an essential safety cushion. Now, what about the room turnaround between our afternoon general session and the evening awards gala? We have only fifty minutes to convert the Grand Ballroom from classroom training to banquet rounds.",
        translation: "Eso nos da un margen de seguridad esencial. Ahora, ¿qué hay del cambio de salón entre nuestra sesión general de la tarde y la gala de premiación nocturna? Tenemos solo cincuenta minutos para convertir el Gran Salón de montaje tipo aula a mesas redondas de banquete.",
        targetTerms: ["room turnaround", "general session", "classroom training", "banquet rounds"]
      },
      {
        speaker: "Lic. Carlos Aréchiga",
        text: "We have rehearsed the choreography. At five PM sharp, our twenty-five-person setup crew will clear the classroom tables onto rolling dollies while your guests enjoy cocktails on the oceanfront lawn. We are pre-staging forty-two round tables with linens and centerpieces in the adjacent foyer to roll in seamlessly within thirty-five minutes.",
        translation: "Hemos ensayado la coreografía. A las cinco en punto, nuestro equipo de montaje de veinticinco personas retirará las mesas tipo aula en carros rodantes mientras sus invitados disfrutan de cocteles en el jardín frente al mar. Estamos prearmando cuarenta y dos mesas redondas con manteles y centros de mesa en el vestíbulo adyacente para ingresarlas fluidamente en treinta y cinco minutos.",
        targetTerms: ["rehearsed the choreography", "setup crew", "rolling dollies", "pre-staging round tables"]
      },
      {
        speaker: "Sarah Jenkins",
        text: "What about the audiovisual power requirements for our keynote CEO presentation? The production agency is bringing in a twenty-foot curved LED wall and high-output theatrical spotlights.",
        translation: "¿Qué hay de los requerimientos de energía audiovisual para la presentación del CEO? La agencia de producción traerá una pantalla LED curva de veinte pies y reflectores teatrales de alta potencia.",
        targetTerms: ["audiovisual power requirements", "curved LED wall", "theatrical spotlights"]
      },
      {
        speaker: "Lic. Carlos Aréchiga",
        text: "Our Chief Engineer has allocated a dedicated three-phase four-hundred-ampere cam-lock power tie-in on our isolated technical subpanel. It is backed by our dual on-site diesel generators with an automated transfer switch, guaranteeing zero power flicker even if an external municipal blackout strikes.",
        translation: "Nuestro Ingeniero en Jefe ha asignado una conexión eléctrica dedicada trifásica de cuatrocientos amperios tipo cam-lock en nuestro subpanel técnico aislado. Está respaldada por nuestros generadores diésel duales en sitio con interruptor de transferencia automática, garantizando cero parpadeo de energía incluso si ocurre un apagón municipal externo.",
        targetTerms: ["cam-lock power tie-in", "isolated technical subpanel", "diesel generators", "automated transfer switch"]
      }
    ],
    contrastTips: [
      {
        school: "We will tell the kitchen how many people are coming on the day.",
        native: "We locked in the final attendance guarantee on the signed BEO seventy-two hours prior to the event.",
        explanation: "Banquets require rigid contractual guarantees (GTD) on formal BEO documents so the kitchen can purchase provisions and schedule staff legally."
      },
      {
        school: "We will change the room tables when we have time.",
        native: "We executed a timed 45-minute room turnover using rolling dollies and pre-staged banquet rounds.",
        explanation: "MICE operations treat room conversions as precision industrial time-and-motion operations, synchronizing setup crews, linens, and AV integration."
      }
    ]
  },
  lexiconMatrix: [
    {
      term: "Banquet Event Order (BEO)",
      ipa: "/ˈbæŋ.kwɪt ɪˈvɛnt ˌɔːr.dər /ˌbiː.iːˈoʊ/",
      es: "Orden de Evento de Banquete (BEO)",
      category: "Event Operations",
      definition: "The master operational contract and blueprint detailing room setup, timelines, menu items, beverage packages, billing, and departmental responsibilities for a catered function.",
      collocations: ["distribute the final BEO", "sign off on the BEO guarantee", "BEO revision notice", "execute setup per BEO specifications"],
      falseFriends: "A BEO is a binding operational contract, not a preliminary sales proposal or informal menu flyer.",
      nativeUsage: "The banquet captain reviewed the BEO to verify the timeline for the champagne toast and allergy meal counts."
    },
    {
      term: "Attendance Guarantee (GTD)",
      ipa: "/əˈtɛn.dəns ˌɡær.ənˈtiː /ˌdʒiː.tiːˈdiː/",
      es: "Garantía de Asistencia (GTD)",
      category: "Contract Management",
      definition: "The binding minimum guest count provided by the client (typically 72 hours in advance) representing the minimum number of meals the client must pay for regardless of actual turnout.",
      collocations: ["submit the final 72-hour guarantee", "billed based on guarantee", "over-set above guarantee", "lock in the attendance guarantee"],
      falseFriends: "The guarantee is a financial commitment by the customer, not a warranty issued by the hotel.",
      nativeUsage: "Although only 240 guests attended the luncheon, the client was billed for their contracted guarantee of 280 attendees."
    },
    {
      term: "Attrition Clause",
      ipa: "/əˈtrɪʃ.ən ˌklɔːz/",
      es: "Cláusula de Atrición / Penalización por Deserción",
      category: "MICE Contracts",
      definition: "A contractual clause holding an event client financially liable for room nights or catering spend that falls below an agreed percentage (typically 80%) of the original room block.",
      collocations: ["enforce the attrition clause", "calculate attrition shortfall penalty", "80% allowable attrition threshold", "mitigate group attrition"],
      falseFriends: "Attrition in hotel contracts refers to un-booked rooms in a group block, not natural employee turnover.",
      nativeUsage: "Because the corporate group used only 65% of their contracted room block, the hotel billed an attrition penalty of $18,000 USD."
    },
    {
      term: "Room Turnover (Turnaround)",
      ipa: "/ruːm ˈtɜːrnˌoʊ.vər / ˈtɜːrn.əˌraʊnd/",
      es: "Conversión de Salón (Turnover)",
      category: "Banquet Logistics",
      definition: "The rapid physical reconfiguration of a ballroom from one function setup (e.g., classroom conference) to another (e.g., formal gala dinner) within a tight time window.",
      collocations: ["execute a 45-minute room turnover", "ballroom turnaround kinetics", "pre-stage tables for turnover", "synchronized setup crew"],
      falseFriends: "Room turnover in banquets is ballroom furniture reconfiguration, not daily cleaning of a guest bedroom.",
      nativeUsage: "The banquet team completed the turnover of the Grand Ballroom from classroom to 400 banquet rounds in under forty minutes."
    },
    {
      term: "Over-Set",
      ipa: "/ˈoʊ.vər ˌsɛt/",
      es: "Sobremontaje (Over-Set)",
      category: "Banquet Operations",
      definition: "The additional percentage of tables, chairs, and meals (typically 3% to 5%) prepared by the hotel above the contracted guarantee to accommodate unexpected guest arrivals seamlessly.",
      collocations: ["prepare a 5% over-set", "over-set capacity in ballroom", "extra covers for over-set", "kitchen prep for over-set"],
      falseFriends: "Over-set is an intentional safety buffer, not an accidental error of setting too many plates.",
      nativeUsage: "With a guarantee of 300 guests, the banquet captain set 315 seats to provide a 5% over-set for unexpected executive attendees."
    },
    {
      term: "MICE Industry",
      ipa: "/maɪs ˈɪn.də.stri/",
      es: "Industria MICE (Reuniones, Incentivos, Convenciones y Exposiciones)",
      category: "Hospitality Industry",
      definition: "The high-yield sector of hospitality specializing in corporate Meetings, Incentive travel, Conferences, and Exhibitions.",
      collocations: ["lead the regional MICE market", "MICE sales director", "MICE tourism destination", "bidding for international MICE summits"],
      falseFriends: "MICE is an acronym for Meetings, Incentives, Conferences, Exhibitions; it has nothing to do with rodents.",
      nativeUsage: "Cancún and the Riviera Maya are the primary MICE revenue generators in Latin America, hosting major international congresses."
    }
  ],
  socraticChallenges: [
    {
      step: 1,
      concept: "Calculating Contractual Attrition Shortfalls",
      botQuestion: "A pharmaceutical association signs a contract with a resort in Los Cabos blocking 500 room nights at $350 USD per night for their annual congress. The contract contains an 80% Attrition Clause. Upon group departure, the final pickup report shows the group only utilized 340 room nights. Calculate the minimum room night obligation, the room night shortfall, and the exact attrition penalty the hotel will invoice to the master account.",
      requiredKeywords: ["400", "60", "21,000", "attrition", "obligation", "shortfall"],
      minKeywords: 3,
      feedbackSuccess: "Spot on contractual math! 1) Minimum Room Night Obligation: 500 contracted room nights * 80% = 400 room nights; 2) Shortfall: 400 minimum obligation - 340 actual picked-up rooms = 60 shortfall room nights; 3) Attrition Penalty: 60 shortfall rooms * $350 USD contracted rate = $21,000 USD billed directly to the corporate master invoice.",
      feedbackRetry: "Compute 80% of the 500 contracted rooms to find the minimum obligation. Subtract the actual pickup (340) from that threshold to find the shortfall. Multiply the shortfall by the $350 room rate to calculate the final penalty."
    },
    {
      step: 2,
      concept: "Executing Over-Set Allocations for VIP Protocol Fluctuations",
      botQuestion: "An international diplomatic summit signs a BEO with an Attendance Guarantee of 250 delegates for a formal state dinner. The event protocol officer warns that regional foreign ministers may arrive unannounced. The banquet captain applies a 5% over-set. How many physical places and meals must the banquet setup and culinary brigade prepare? What operational disaster occurs if the over-set is forgotten and 260 delegates arrive?",
      requiredKeywords: ["263", "over-set", "seats", "embarrassment", "delays", "guarantee"],
      minKeywords: 3,
      feedbackSuccess: "Outstanding event operations analysis! 1) Mathematical Over-set: 250 GTD * 1.05 = 262.5 (rounded up to 263 physical seats and prepped meals); 2) Operational Impact: If over-set is neglected, the 10 unexpected VIP ministers will arrive to find zero available chairs or place settings. While regular guests are eating, servers would scramble to carry in mismatched folding chairs, set noisy silverware, and the kitchen would face a 30-minute delay cooking additional proteins from scratch, creating severe diplomatic embarrassment, protocol breach, and brand damage.",
      feedbackRetry: "Calculate 5% above 250 (250 * 1.05 = ~263). Then describe the operational failure if 260 VIPs show up to a 250-seat room (scrambling for furniture, delayed meal prep, and diplomatic embarrassment)."
    }
  ],
  quiz: [
    {
      q: "What is the primary function of a Banquet Event Order (BEO) in hotel catering operations?",
      options: [
        "A marketing flyer given to tourists on the beach",
        "The master operational blueprint detailing timelines, room setup, menus, AV requirements, and departmental responsibilities for a catered event",
        "A hotel employee's payroll receipt",
        "A certificate of health inspection from the city"
      ],
      answer: 1
    },
    {
      q: "In hotel group contracts, what is an 'Attrition Clause'?",
      options: [
        "A clause giving all guests free champagne",
        "A contractual provision holding a group client financially liable if they fail to fill a specified minimum percentage (typically 80%) of their contracted room block",
        "A clause requiring the hotel to close down during rainy weather",
        "A guarantee that food will be served within 5 minutes"
      ],
      answer: 1
    },
    {
      q: "Why do luxury banquet departments prepare an 'Over-Set' (typically 3% to 5%) above the contracted attendance guarantee?",
      options: [
        "Because banquet servers like to eat extra food after work",
        "To ensure that unexpected extra guests or VIPs can be seated immediately with matching chairs, linens, and meals without operational panic or delays",
        "To make the room look crowded for photographs",
        "Because chairs are always broken"
      ],
      answer: 1
    },
    {
      q: "What does the MICE industry acronym stand for?",
      options: [
        "Modern International Culinary Excellence",
        "Meetings, Incentives, Conferences, and Exhibitions",
        "Major Investment and Capital Expenditures",
        "Medical Imaging and Clinical Engineering"
      ],
      answer: 1
    }
  ]
};

console.log("Applying complete Hospitality modules to LXP_COURSES...");

// Inject all 5 into hospitality-food track
LXP_COURSES["hospitality-food"].status = "full";
LXP_COURSES["hospitality-food"].modules = [hosp_m1, hosp_m2, hosp_m3, hosp_m4, hosp_m5];

// Save back to courses.js
const header = `// stemOS Learning Experience Platform - Course Catalog\n// Comprehensive Technical English (ESP) curriculum for high-tech engineering tracks.\n\nvar LXP_COURSES = `;
const footer = `;\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { LXP_COURSES };\n}\n`;

fs.writeFileSync(coursesPath, header + JSON.stringify(LXP_COURSES, null, 4) + footer, 'utf-8');
console.log("Successfully updated hospitality-food track to FULL with 5 Gold Modules!");
