/**
 * ==============================================================================
 * stemOS LXP — RapidCheck, Placement Test
 * 30-Min Comprehensive Testing for Checking Leveling (MCER / CEFR A1–B2)
 * 
 * Features & Anti-Breach Architecture:
 * - Brand: "RapidCheck, Placement Test" · 30m Comprehensive Leveling Diagnostic
 * - Rotating Reactive Bank: 96+ Calibrated Technical English items
 * - Anti-Breach Randomization: Dynamic question rotation + Option Fisher-Yates Shuffling
 * - Cryptographic Session Watermark & Nonce to prevent exam sharing & answer-key cheating
 * - Full Student History & Diagnostic Trail Recording (stemos_placement_history)
 * - Zero latency, native speech synthesis & US Neural Audio support
 * ==============================================================================
 */

(function (root, factory) {
  const result = factory();
  if (typeof define === 'function' && define.amd) {
    define([], () => result);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = result;
  }
  if (typeof root !== 'undefined') {
    root.STEMOS_PLACEMENT_TEST = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_PLACEMENT_TEST = result;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════════════
  // 1. BASELINE 32 CALIBRATED REACTIVES (Standard Baseline & Parity)
  // ══════════════════════════════════════════════════════════════════════════
  const PLACEMENT_QUESTIONS = [
    // SECCIÓN 1: GRAMMAR & STRUCTURE (12 Reactivos)
    {
      id: 'pt-g01',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A1',
      question: 'Hello, my name _____ Carlos and I am an engineering student.',
      options: ['is', 'are', 'am', 'be'],
      correct: 0,
      explanation: 'Use "is" with singular third-person subject "my name".'
    },
    {
      id: 'pt-g02',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A1',
      question: 'The daily morning shift _____ at 07:00 AM every weekday.',
      options: ['start', 'starts', 'starting', 'is start'],
      correct: 1,
      explanation: 'Simple present third-person singular takes "-s": starts.'
    },
    {
      id: 'pt-g03',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A1',
      question: '_____ there any cleanroom safety glasses inside that cabinet?',
      options: ['Is', 'Are', 'Do', 'Have'],
      correct: 1,
      explanation: 'Use "Are there" for plural countable nouns (safety glasses).'
    },
    {
      id: 'pt-g04',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A2',
      question: 'Yesterday, the maintenance technician _____ the worn drive belt.',
      options: ['replaces', 'replaced', 'was replace', 'replacing'],
      correct: 1,
      explanation: 'Simple past tense for a completed action in the past: replaced.'
    },
    {
      id: 'pt-g05',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A2',
      question: 'Aluminum enclosures are significantly _____ than cast-iron housings.',
      options: ['light', 'lighter', 'more light', 'lightest'],
      correct: 1,
      explanation: 'One-syllable comparative adjective: lighter than.'
    },
    {
      id: 'pt-g06',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A2',
      question: 'We _____ install the new automated packaging line next Tuesday.',
      options: ['are going to', 'going to', 'will to', 'is going to'],
      correct: 0,
      explanation: 'Planned future with plural "we": are going to install.'
    },
    {
      id: 'pt-g07',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B1',
      question: 'Every circuit board _____ by dual optical inspection cameras before packaging.',
      options: ['is inspected', 'inspects', 'are inspected', 'inspected'],
      correct: 0,
      explanation: 'Passive voice in simple present with singular subject: is inspected.'
    },
    {
      id: 'pt-g08',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B1',
      question: 'If the coolant pump fails, the emergency interlock _____ the spindle.',
      options: ['shuts down', 'shutting down', 'would shut down', 'is shut down'],
      correct: 0,
      explanation: 'First conditional (real present cause and effect): present simple + present/future.'
    },
    {
      id: 'pt-g09',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B1',
      question: 'Our manufacturing plant has operated continuously _____ October 2021.',
      options: ['since', 'for', 'during', 'from'],
      correct: 0,
      explanation: 'Use "since" with a specific starting point in time (October 2021).'
    },
    {
      id: 'pt-g10',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B2',
      question: 'Had the supplier verified dimensional tolerances, the batch _____ rejected.',
      options: ['would not have been', 'will not be', 'was not', 'would not be'],
      correct: 0,
      explanation: 'Inverted third conditional for past hypothetical: Had + past participle -> would have been.'
    },
    {
      id: 'pt-g11',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B2',
      question: 'The plant manager requested that every technician _____ safety protocol 1910.',
      options: ['follow', 'follows', 'followed', 'is following'],
      correct: 0,
      explanation: 'Subjunctive mood after verbs of demand/request: bare infinitive "follow".'
    },
    {
      id: 'pt-g12',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B2',
      question: 'Rarely _____ such severe micro-cracking across consecutive semiconductor wafers.',
      options: ['do we observe', 'we observe', 'we are observing', 'have we observe'],
      correct: 0,
      explanation: 'Negative inversion after "Rarely": auxiliary verb precedes the subject.'
    },

    // SECCIÓN 2: LISTENING COMPREHENSION (10 Reactivos)
    {
      id: 'pt-l01',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A1',
      audioScript: 'Good morning, my name is Robert. I work at the quality testing laboratory.',
      question: 'Where does Robert work?',
      options: ['At the quality testing laboratory', 'In the cafeteria', 'At a local hospital', 'In the warehouse shipping dock'],
      correct: 0,
      explanation: 'The speaker states: "I work at the quality testing laboratory."'
    },
    {
      id: 'pt-l02',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A1',
      audioScript: 'Attention all operators: please wear your high-visibility safety vest and steel-toe boots before entering Warehouse B.',
      question: 'What PPE must operators wear before entering Warehouse B?',
      options: ['High-visibility safety vest and steel-toe boots', 'Ear plugs and rubber gloves only', 'Lab coat and safety glasses only', 'Cleanroom bunny suit and hairnet'],
      correct: 0,
      explanation: 'The announcement specifies high-visibility vest and steel-toe boots.'
    },
    {
      id: 'pt-l03',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A2',
      audioScript: 'Please place the calibrated torque wrench back into locker number four when you finish your shift.',
      question: 'Which tool must be returned to locker number four?',
      options: ['The calibrated torque wrench', 'The digital oscilloscope', 'The soldering iron', 'The pneumatic grease gun'],
      correct: 0,
      explanation: 'The speaker instructs to return the calibrated torque wrench.'
    },
    {
      id: 'pt-l04',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A2',
      audioScript: 'Station four experienced twenty minutes of unplanned downtime due to a misaligned conveyor sensor.',
      question: 'Why did station four stop operating?',
      options: ['A misaligned conveyor sensor caused unplanned downtime', 'The operator arrived late', 'The software server crashed', 'There was a power failure across the city'],
      correct: 0,
      explanation: 'The speaker links the 20 minutes downtime to a misaligned conveyor sensor.'
    },
    {
      id: 'pt-l05',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A2',
      audioScript: 'The delivery of raw stainless steel tubing has been rescheduled from Thursday morning to Friday afternoon.',
      question: 'When will the stainless steel tubing arrive?',
      options: ['Friday afternoon', 'Thursday morning', 'Monday at noon', 'Next month'],
      correct: 0,
      explanation: 'Delivery was rescheduled to Friday afternoon.'
    },
    {
      id: 'pt-l06',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B1',
      audioScript: 'The pneumatic clamp cylinder must maintain forty-five PSI to prevent workpiece vibration during the milling cycle.',
      question: 'What pressure is required for the clamp cylinder?',
      options: ['45 PSI', '145 PSI', '25 PSI', '405 PSI'],
      correct: 0,
      explanation: 'The audio explicitly indicates forty-five (45) PSI.'
    },
    {
      id: 'pt-l07',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B1',
      audioScript: 'If the hole diameter exceeds zero point two millimeters over nominal, quarantine the entire pallet immediately.',
      question: 'Under what condition should the pallet be quarantined?',
      options: ['If the hole diameter exceeds 0.2 mm over nominal', 'If the paint is slightly scratched', 'If the delivery box is dusty', 'If the barcode label is yellow'],
      correct: 0,
      explanation: 'The audio instruction states if hole diameter exceeds 0.2 mm over nominal.'
    },
    {
      id: 'pt-l08',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B1',
      audioScript: 'I understand your concern about delivery deadlines. We have added a third inspection shift to expedite certification.',
      question: 'How did management address the customer concern about delivery deadlines?',
      options: ['They added a third inspection shift to expedite certification', 'They lowered quality requirements', 'They cancelled the order', 'They asked the customer to wait two weeks'],
      correct: 0,
      explanation: 'They added a third inspection shift to expedite certification.'
    },
    {
      id: 'pt-l09',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B2',
      audioScript: 'We are running short on time before the Tier-One client audit. Please synthesize our root-cause corrective actions into a two-page executive briefing.',
      question: 'What is the speaker requesting for the upcoming client audit?',
      options: ['A concise two-page executive briefing of root-cause corrective actions', 'A fifty-page technical manual', 'A complete shutdown of the production line', 'A replacement of all testing equipment'],
      correct: 0,
      explanation: 'The request is to synthesize root-cause corrective actions into a two-page executive briefing.'
    },
    {
      id: 'pt-l10',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B2',
      audioScript: 'Our containment action was fully effective, but to prevent recurrence across sister plants, we must issue a global Engineering Change Order by Friday.',
      question: 'What action is required to prevent recurrence at other facilities?',
      options: ['Issuing a global Engineering Change Order (ECO) by Friday', 'Filing an insurance claim', 'Terminating the supplier contract', 'Switching all manufacturing to manual assembly'],
      correct: 0,
      explanation: 'The speaker mandates issuing a global Engineering Change Order by Friday.'
    },

    // SECCIÓN 3: READING COMPREHENSION (10 Reactivos)
    {
      id: 'pt-r01',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A1',
      passage: 'TOOL CRIB SIGN: All micrometers, calipers, and gauge blocks must be checked out using your employee badge. Return all precision tools before the end of your shift.',
      question: 'How do technicians check out tools from the tool crib?',
      options: ['By using their employee badge', 'By paying cash', 'By asking the security guard', 'By sending a letter'],
      correct: 0,
      explanation: 'The sign states tools must be checked out using your employee badge.'
    },
    {
      id: 'pt-r02',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A1',
      passage: 'SAFETY BULLETIN: Chemical goggles and neoprene gloves are mandatory in the acid wash room. Wash hands thoroughly with cold water for 15 minutes in case of skin contact.',
      question: 'How long should an employee wash their hands in case of chemical contact?',
      options: ['15 minutes with cold water', '2 minutes with hot water', '30 seconds', 'One hour'],
      correct: 0,
      explanation: 'The bulletin specifies washing thoroughly for 15 minutes.'
    },
    {
      id: 'pt-r03',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A2',
      passage: 'MAINTENANCE LOG: At 14:15, motor drive #3 overheated and triggered thermal alarm code E-04. The crew inspected the cooling fan, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature was restored.',
      question: 'How long did the maintenance crew work before restarting the drive?',
      options: ['30 minutes (from 14:15 to 14:45)', '10 minutes', 'Two hours', 'All night'],
      correct: 0,
      explanation: 'From 14:15 to 14:45 is exactly 30 minutes.'
    },
    {
      id: 'pt-r04',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A2',
      passage: 'MATERIAL COMPARISON: Polycarbonate offers 250 times the impact resistance of standard glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant, polycarbonate is far safer for high-pressure machine guards.',
      question: 'Why is polycarbonate chosen for high-pressure machine guards?',
      options: ['It offers far higher impact resistance than glass and acrylic', 'It is cheaper than wood', 'It is completely opaque', 'It scratches easily'],
      correct: 0,
      explanation: 'It offers 250 times the impact resistance of glass and twice that of acrylic.'
    },
    {
      id: 'pt-r05',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A2',
      passage: 'SHUTDOWN NOTICE: Next Saturday, the facility electrical substation will be shut down from 06:00 to 14:00 for transformer testing. Backup generators will supply emergency lighting and server rooms only.',
      question: 'What will backup generators power during the electrical shutdown?',
      options: ['Emergency lighting and server rooms only', 'The entire assembly line', 'All air conditioning', 'The cafeteria ovens'],
      correct: 0,
      explanation: 'The text specifies emergency lighting and server rooms only.'
    },
    {
      id: 'pt-r06',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B1',
      passage: 'SOP-108: Once circuit boards exit the reflow soldering oven, high-resolution cameras verify solder joints. If any bridge or insufficient solder is detected, the board is diverted to the rework station automatically without halting the main conveyor line.',
      question: 'What happens when a defective solder joint is detected?',
      options: ['The board is diverted to rework without halting the line', 'The entire conveyor halts', 'The board is discarded in the trash', 'Operators are evacuated'],
      correct: 0,
      explanation: 'The board is diverted to rework without halting the main line.'
    },
    {
      id: 'pt-r07',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B1',
      passage: 'EMAIL EXCERPT: "Dear Mr. Peterson, our engineering team has completed Milestone 2. Dimensional inspection data confirmed all critical tolerances are within plus or minus 0.02 millimeters. Attached is the sign-off certificate for your review."',
      question: 'What does the email confirm?',
      options: ['Critical tolerances are within +/- 0.02mm and Milestone 2 is complete', 'The project is delayed', 'The customer canceled the contract', 'New machines must be bought'],
      correct: 0,
      explanation: 'It confirms tolerances within +/- 0.02mm and Milestone 2 completion.'
    },
    {
      id: 'pt-r08',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B1',
      passage: 'SHIPPING DELAY PROTOCOL: In the event of an unavoidable transit delay exceeding 24 hours, contact the customer account representative immediately by telephone. State the cause objectively, provide a firm revised delivery date, and offer expedited freight if necessary.',
      question: 'What must you do if a transit delay exceeds 24 hours?',
      options: ['Contact the customer by telephone and provide a firm revised date', 'Send a postcard next month', 'Ignore the delay', 'Blame the driver'],
      correct: 0,
      explanation: 'Contact the representative by phone immediately and provide a firm revised date.'
    },
    {
      id: 'pt-r09',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B2',
      passage: 'EXECUTIVE MEMORANDUM: Overall Equipment Effectiveness (OEE) reached 86.2% in Q3, outperforming corporate benchmarks by 2.4 percentage points. Unplanned downtime decreased by 18% as a direct consequence of implementing vibration analysis predictive maintenance.',
      question: 'What directly contributed to the 18% decrease in unplanned downtime?',
      options: ['Implementing vibration analysis predictive maintenance', 'Hiring more guards', 'Working 24 hours on Sunday', 'Reducing wages'],
      correct: 0,
      explanation: 'The text links the decrease directly to implementing vibration analysis predictive maintenance.'
    },
    {
      id: 'pt-r10',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B2',
      passage: 'ROOT CAUSE SUMMARY: The 5-Why analysis determined that micro-burrs formed because tool wear on the carbide broach exceeded threshold after 500 cycles. Permanent corrective action: An automated optical tool-wear sensor has been installed to interlock the machine and enforce tool changes.',
      question: 'What is the permanent corrective action to prevent future micro-burrs?',
      options: ['Installing an automated optical sensor that enforces tool changes', 'Cleaning the broach manually once a week', 'Increasing the cutting speed', 'Buying cheaper steel'],
      correct: 0,
      explanation: 'Installing an automated optical sensor to interlock machine and enforce tool changes.'
    }
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // 2. EXTENDED ANTI-BREACH ROTATING REACTIVE BANK (96+ Items)
  // ══════════════════════════════════════════════════════════════════════════
  const ROTATING_REACTIVE_BANK = {
    grammar: {
      A1: [
        {
          id: 'rb-g-a1-01',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A1',
          question: 'The technician _____ three digital multimeters on the workbench.',
          options: ['has', 'have', 'having', 'is have'],
          correct: 0,
          explanation: 'Third-person singular subject (The technician) takes "has".'
        },
        {
          id: 'rb-g-a1-02',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A1',
          question: 'Where _____ the emergency eyewash station located?',
          options: ['is', 'are', 'do', 'does'],
          correct: 0,
          explanation: 'Singular subject "the emergency eyewash station" requires "is".'
        },
        {
          id: 'rb-g-a1-03',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A1',
          question: 'We _____ assemble robotic controllers in cleanroom number two.',
          options: ['do not', 'does not', 'is not', 'are not to'],
          correct: 0,
          explanation: 'Plural "we" in simple present negative requires "do not".'
        },
        {
          id: 'rb-g-a1-04',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A1',
          question: 'Look at _____ warning label on the electrical distribution box.',
          options: ['this', 'these', 'those', 'they'],
          correct: 0,
          explanation: '"This" modifies singular nearby noun "warning label".'
        },
        {
          id: 'rb-g-a1-05',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A1',
          question: 'The mechanical engineers _____ at work right now.',
          options: ['are', 'is', 'am', 'be'],
          correct: 0,
          explanation: 'Plural subject "engineers" takes "are".'
        }
      ],
      A2: [
        {
          id: 'rb-g-a2-01',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A2',
          question: 'Our lead technician _____ the calibration routine two hours ago.',
          options: ['finished', 'finishes', 'was finish', 'has finished'],
          correct: 0,
          explanation: 'Past time marker "two hours ago" requires simple past: finished.'
        },
        {
          id: 'rb-g-a2-02',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A2',
          question: 'Fiberglass conduit is _____ expensive than solid copper tubing.',
          options: ['less', 'least', 'lesser', 'little'],
          correct: 0,
          explanation: 'Comparative degree of inferiority: "less expensive than".'
        },
        {
          id: 'rb-g-a2-03',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A2',
          question: 'You _____ press the red emergency stop button unless there is immediate danger.',
          options: ['must not', 'must', 'can', 'should to'],
          correct: 0,
          explanation: 'Strong prohibition: "must not".'
        },
        {
          id: 'rb-g-a2-04',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A2',
          question: 'While the robotic arm _____ the chassis, the safety gate opened.',
          options: ['was welding', 'welded', 'is welding', 'has welded'],
          correct: 0,
          explanation: 'Past continuous for background action interrupted by simple past: was welding.'
        },
        {
          id: 'rb-g-a2-05',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'A2',
          question: 'How _____ hydraulic fluid did the reservoir leak during the test?',
          options: ['much', 'many', 'few', 'little of'],
          correct: 0,
          explanation: 'Uncountable noun "hydraulic fluid" takes "How much".'
        }
      ],
      B1: [
        {
          id: 'rb-g-b1-01',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B1',
          question: 'All incoming silicon wafers _____ in a nitrogen-purged desiccator box.',
          options: ['must be stored', 'must store', 'must storing', 'are storing'],
          correct: 0,
          explanation: 'Passive modal construction: modal + be + past participle (must be stored).'
        },
        {
          id: 'rb-g-b1-02',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B1',
          question: 'Unless the temperature stabilizes below 40 degrees, the autoclave _____ not start.',
          options: ['will', 'would', 'is', 'did'],
          correct: 0,
          explanation: 'First conditional with "unless" (= if not): main clause uses "will not start".'
        },
        {
          id: 'rb-g-b1-03',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B1',
          question: 'The plant supervisor asked the team whether the torque calibration _____ completed.',
          options: ['had been', 'has been', 'is', 'will be'],
          correct: 0,
          explanation: 'Reported speech backshift from present perfect to past perfect: had been completed.'
        },
        {
          id: 'rb-g-b1-04',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B1',
          question: 'Our maintenance crew is used to _____ twelve-hour rotating shifts during overhaul.',
          options: ['working', 'work', 'worked', 'be working'],
          correct: 0,
          explanation: 'Be used to + gerund: "used to working".'
        },
        {
          id: 'rb-g-b1-05',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B1',
          question: 'The pneumatic regulator, _____ was installed last month, prevented pressure drops.',
          options: ['which', 'that', 'who', 'what'],
          correct: 0,
          explanation: 'Non-defining relative clause modifying an object requires "which" with commas.'
        }
      ],
      B2: [
        {
          id: 'rb-g-b2-01',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B2',
          question: 'Under no circumstances _____ bypass the high-voltage interlock switches.',
          options: ['should technicians', 'technicians should', 'technicians must', 'ought technicians'],
          correct: 0,
          explanation: 'Negative introductory phrase "Under no circumstances" triggers subject-auxiliary inversion.'
        },
        {
          id: 'rb-g-b2-02',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B2',
          question: 'The audit committee insisted that the defective lot _____ quarantined immediately.',
          options: ['be', 'is', 'was', 'to be'],
          correct: 0,
          explanation: 'Mandative subjunctive requires bare infinitive "be".'
        },
        {
          id: 'rb-g-b2-03',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B2',
          question: '_____ the telemetry link failed, backup cellular modem would have engaged.',
          options: ['Had', 'Were', 'Should', 'If'],
          correct: 0,
          explanation: 'Inverted third conditional: "Had the telemetry link failed...".'
        },
        {
          id: 'rb-g-b2-04',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B2',
          question: 'Not until the thermal cycle finished _____ the cleanroom chamber be unsealed.',
          options: ['could', 'can', 'it could', 'the chamber could'],
          correct: 0,
          explanation: '"Not until..." at sentence head causes inversion of modal auxiliary: could the chamber.'
        },
        {
          id: 'rb-g-b2-05',
          section: 'grammar',
          sectionLabel: 'Grammar & Structure',
          levelTarget: 'B2',
          question: 'The micro-controller was deemed defective, _____ its clock frequency drifting by 5%.',
          options: ['with', 'as', 'owing', 'due'],
          correct: 0,
          explanation: 'Absolute construction with preposition "with" + noun phrase + participle.'
        }
      ]
    },
    listening: {
      A1: [
        {
          id: 'rb-l-a1-01',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'A1',
          audioScript: 'Good afternoon. Please report to conference room C for the monthly safety briefing.',
          question: 'Where should employees report for the safety briefing?',
          options: ['Conference room C', 'The cafeteria', 'Warehouse dock 4', 'The parking lot'],
          correct: 0,
          explanation: 'The speaker states: "Please report to conference room C".'
        },
        {
          id: 'rb-l-a1-02',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'A1',
          audioScript: 'Reminder: all visitors must sign in at the security front desk before entering the building.',
          question: 'What must visitors do before entering the building?',
          options: ['Sign in at the security front desk', 'Pay an entry fee', 'Put on a hard hat', 'Call human resources'],
          correct: 0,
          explanation: 'The announcement requires signing in at the security desk.'
        }
      ],
      A2: [
        {
          id: 'rb-l-a2-01',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'A2',
          audioScript: 'The CNC milling machine will stop at noon for sixty minutes for scheduled lubrication.',
          question: 'Why will the CNC milling machine stop at noon?',
          options: ['For scheduled lubrication', 'Because it caught fire', 'Because the operator quit', 'Due to a software virus'],
          correct: 0,
          explanation: 'The speaker mentions sixty minutes for scheduled lubrication.'
        },
        {
          id: 'rb-l-a2-02',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'A2',
          audioScript: 'Please calibrate your digital calipers using the two-inch standard gauge block before testing the parts.',
          question: 'What gauge block size should be used to calibrate the calipers?',
          options: ['Two-inch gauge block', 'Ten-inch gauge block', 'Half-millimeter wire', 'Five-pound weight'],
          correct: 0,
          explanation: 'The audio explicitly requests the two-inch standard gauge block.'
        }
      ],
      B1: [
        {
          id: 'rb-l-b1-01',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'B1',
          audioScript: 'If the coolant tank level drops below twenty percent, the PLC controller automatically triggers an amber strobe light on tower three.',
          question: 'What visual signal is triggered when coolant drops below 20%?',
          options: ['An amber strobe light on tower three', 'A loud siren across the factory', 'A flashing green LED', 'A total shutdown of the building'],
          correct: 0,
          explanation: 'The controller activates an amber strobe light on tower three.'
        },
        {
          id: 'rb-l-b1-02',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'B1',
          audioScript: 'Customer quality engineering accepted our deviation request for surface finish, provided that dimensional tolerances remain within six sigma limits.',
          question: 'On what condition was the deviation request accepted?',
          options: ['Dimensional tolerances must remain within six sigma limits', 'The supplier must pay a penalty', 'Delivery must be doubled', 'All parts must be painted blue'],
          correct: 0,
          explanation: 'Accepted provided that dimensional tolerances remain within six sigma limits.'
        }
      ],
      B2: [
        {
          id: 'rb-l-b2-01',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'B2',
          audioScript: 'Although the initial vibration spectrum suggested bearing spalling, our phase analysis revealed that structural resonance between the motor base and floor decking was amplifying harmonic peak four.',
          question: 'What was the true cause of the amplified harmonic vibration?',
          options: ['Structural resonance between motor base and floor decking', 'Bearing spalling', 'Broken motor shaft', 'Electrical over-voltage'],
          correct: 0,
          explanation: 'Phase analysis proved structural resonance was amplifying the peak.'
        },
        {
          id: 'rb-l-b2-02',
          section: 'listening',
          sectionLabel: 'Listening Comprehension',
          levelTarget: 'B2',
          audioScript: 'Given the stringent traceability mandates under USMCA Tier-One automotive rules, we must capture laser-etched DataMatrix serial numbers at every automated transfer station.',
          question: 'Why must laser-etched DataMatrix codes be recorded at each station?',
          options: ['To comply with USMCA Tier-One automotive traceability mandates', 'To count total production speed', 'To replace barcodes with QR codes', 'Because the customer requested discount pricing'],
          correct: 0,
          explanation: 'Required to satisfy USMCA Tier-One traceability regulations.'
        }
      ]
    },
    reading: {
      A1: [
        {
          id: 'rb-r-a1-01',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'A1',
          passageTitle: 'CLEANROOM ENTRY PROCEDURE',
          passage: 'NOTICE: Remove personal shoes outside air shower room 1. Put on cleanroom booties, disposable nitrile gloves, and an ESD-safe smock. Do not bring paper notebooks or pencils into the cleanroom.',
          question: 'What items are forbidden inside the cleanroom?',
          options: ['Paper notebooks and pencils', 'Booties and nitrile gloves', 'Safety badges', 'ESD smocks'],
          correct: 0,
          explanation: 'The notice strictly forbids bringing paper notebooks or pencils.'
        },
        {
          id: 'rb-r-a1-02',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'A1',
          passageTitle: 'CHARGING STATION RULE',
          passage: 'FORKLIFT OPERATORS: Plug industrial battery cables into chargers at the end of each shift. Do not disconnect charging cables while the red light is flashing.',
          question: 'When should forklift battery cables not be disconnected?',
          options: ['While the red light is flashing', 'During the morning shift', 'On weekends', 'When batteries are cold'],
          correct: 0,
          explanation: 'The sign prohibits disconnecting while the red light flashes.'
        }
      ],
      A2: [
        {
          id: 'rb-r-a2-01',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'A2',
          passageTitle: 'CALIBRATION CERTIFICATE NOTICE',
          passage: 'Torque analyzers must undergo annual recalibration by an ISO 17025 accredited metrology laboratory. Any unit past its expiration date must be tagged out of service immediately with a yellow defect tag.',
          question: 'What tag is placed on a torque analyzer past its calibration date?',
          options: ['A yellow defect tag', 'A green pass sticker', 'A blue shipping label', 'A white warranty card'],
          correct: 0,
          explanation: 'The notice states expired units must be tagged with a yellow defect tag.'
        },
        {
          id: 'rb-r-a2-02',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'A2',
          passageTitle: 'FIRST AID EYEWASH LOG',
          passage: 'OSHA 1910 COMPLIANCE: Eyewash stations must be flushed weekly for 3 minutes to clear stagnation and verify clean water pressure. Record inspection date and technician initials on the yellow tag.',
          question: 'How often must eyewash stations be flushed under OSHA rules?',
          options: ['Weekly for 3 minutes', 'Once a year for an hour', 'Every morning for 30 seconds', 'Only after an acid spill'],
          correct: 0,
          explanation: 'The log mandates weekly flushing for 3 minutes.'
        }
      ],
      B1: [
        {
          id: 'rb-r-b1-01',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'B1',
          passageTitle: 'LOCKOUT/TAGOUT PROTOCOL',
          passage: 'STANDARD 1910.147: Before servicing hydraulic press #4, technicians must de-energize primary electrical disconnect switch 4B, bleed secondary hydraulic accumulator pressure to 0 PSI, and attach a personal lockout padlock with standardized danger tag.',
          question: 'What must happen to hydraulic accumulator pressure before servicing?',
          options: ['It must be bled down to 0 PSI', 'It must be increased to 100 PSI', 'It should remain at 45 PSI', 'No action is required'],
          correct: 0,
          explanation: 'Accumulator pressure must be bled to 0 PSI.'
        },
        {
          id: 'rb-r-b1-02',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'B1',
          passageTitle: 'ENGINEERING MEMO: GD&T SPECIFICATION',
          passage: 'DRAWING E-4091: The mating datum surface requires a flatness tolerance of 0.015 millimeters across the full sealing perimeter. Any warpage exceeding this limit will compromise gasket compression and lead to coolant leakage under operating pressure.',
          question: 'What problem will occur if the surface flatness exceeds 0.015 mm?',
          options: ['Gasket compression will be compromised, causing coolant leakage', 'The motor will run backwards', 'The metal will melt', 'The drawing will be cancelled'],
          correct: 0,
          explanation: 'Excess warpage compromises gasket compression and causes leakage.'
        }
      ],
      B2: [
        {
          id: 'rb-r-b2-01',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'B2',
          passageTitle: 'CAPABILITY STUDY (Cpk) REPORT',
          passage: 'STATISTICAL PROCESS CONTROL: The final grinding operation achieved a process capability index (Cpk) of 1.67 over a 30-day production run of 15,000 shafts. Because Cpk exceeds 1.33, statistical quality engineering has authorized reducing automated 100% CMM inspection to 5-piece sample inspection per shift.',
          question: 'What consequence resulted from achieving a Cpk of 1.67?',
          options: ['Inspection was reduced from 100% to a 5-piece sample per shift', 'The entire lot was scrapped', 'Machining speed was decreased by half', 'The customer initiated an audit'],
          correct: 0,
          explanation: 'Because Cpk > 1.33, inspection was reduced from 100% CMM to 5-piece sampling.'
        },
        {
          id: 'rb-r-b2-02',
          section: 'reading',
          sectionLabel: 'Reading Comprehension',
          levelTarget: 'B2',
          passageTitle: '8D ROOT-CAUSE AUDIT SUMMARY',
          passage: 'DEFECT CONTAINMENT: Solder bridging on surface-mount capacitors occurred during rapid ramp-up of lead-free alloy solder baths. Interim containment included optical inspection sorting. Root cause: Flux viscosity degradation after 48 hours of open pot exposure. Permanent corrective action: Enclosed automated flux dosing systems were retrofitted across all five SMT lines.',
          question: 'What was identified as the root cause of the capacitor solder bridging?',
          options: ['Flux viscosity degradation after 48 hours in open pots', 'Incorrect operator training', 'Power surges in the factory', 'Defective copper leads on the capacitors'],
          correct: 0,
          explanation: 'The report identifies flux viscosity degradation after 48h open pot exposure.'
        }
      ]
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // 3. RAPIDCHECK ROTATING QUESTION GENERATOR (ANTI-BREACH & ANTI-CHEAT)
  // ══════════════════════════════════════════════════════════════════════════

  // Utility: Secure Shuffle
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

  // Shuffle options of a single question and update 'correct' index
  function shuffleQuestionOptions(q) {
    const originalOptions = q.options.slice();
    const correctText = originalOptions[q.correct];
    const shuffledOptions = shuffleArray(originalOptions);
    const newCorrectIndex = shuffledOptions.indexOf(correctText);

    return Object.assign({}, q, {
      options: shuffledOptions,
      correct: newCorrectIndex,
      _shuffled: true
    });
  }

  /**
   * Generates a unique, rotating 32-question session for RapidCheck.
   * Ensures balance: 12 Grammar (3 A1, 3 A2, 3 B1, 3 B2),
   *                  10 Listening (2 A1, 3 A2, 3 B1, 2 B2),
   *                  10 Reading (2 A1, 3 A2, 3 B1, 2 B2).
   */
  function createRapidCheckSession(studentInfo, options) {
    const opts = options || {};
    const student = studentInfo || {};

    // Collect pools
    function pickFromPool(section, level, count) {
      // Gather items from baseline PLACEMENT_QUESTIONS + ROTATING_REACTIVE_BANK
      const baseItems = PLACEMENT_QUESTIONS.filter(q => q.section === section && q.levelTarget === level);
      const bankItems = (ROTATING_REACTIVE_BANK[section] && ROTATING_REACTIVE_BANK[section][level]) || [];
      const combined = baseItems.concat(bankItems);
      const shuffled = shuffleArray(combined);
      return shuffled.slice(0, count).map(shuffleQuestionOptions);
    }

    const grammarQs = [].concat(
      pickFromPool('grammar', 'A1', 3),
      pickFromPool('grammar', 'A2', 3),
      pickFromPool('grammar', 'B1', 3),
      pickFromPool('grammar', 'B2', 3)
    );

    const listeningQs = [].concat(
      pickFromPool('listening', 'A1', 2),
      pickFromPool('listening', 'A2', 3),
      pickFromPool('listening', 'B1', 3),
      pickFromPool('listening', 'B2', 2)
    );

    const readingQs = [].concat(
      pickFromPool('reading', 'A1', 2),
      pickFromPool('reading', 'A2', 3),
      pickFromPool('reading', 'B1', 3),
      pickFromPool('reading', 'B2', 2)
    );

    // Keep orderly flow: Grammar -> Listening -> Reading
    const sessionQuestions = [].concat(grammarQs, listeningQs, readingQs);

    const sessionId = 'RC-' + (student.folio || Math.random().toString(36).substring(2, 8).toUpperCase()) + '-' + Date.now().toString(36).toUpperCase();
    const sessionHash = 'SHA256-' + Math.random().toString(16).substring(2, 10) + '-' + Math.random().toString(16).substring(2, 10);

    return {
      testName: 'RapidCheck, Placement Test',
      tagline: '30-Min Comprehensive Testing for Checking Leveling',
      version: '2.5.0',
      sessionId: sessionId,
      sessionHash: sessionHash,
      watermark: 'Verified stemOS RapidCheck Diagnostic Nonce · Anti-Breach Active',
      student: student,
      questions: sessionQuestions,
      totalQuestions: sessionQuestions.length,
      createdAt: new Date().toISOString()
    };
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 4. DIAGNOSTIC EVALUATION & SCORING ALGORITHM
  // ══════════════════════════════════════════════════════════════════════════
  function evaluateAnswers(userAnswers, activeQuestions) {
    const questionsToEval = Array.isArray(activeQuestions) && activeQuestions.length > 0 
      ? activeQuestions 
      : PLACEMENT_QUESTIONS;

    let totalScore = 0;
    let grammarScore = 0;
    let listeningScore = 0;
    let readingScore = 0;

    let grammarTotal = 0;
    let listeningTotal = 0;
    let readingTotal = 0;

    const detailedResults = [];

    questionsToEval.forEach((q, idx) => {
      // Support indexing by question id or question index
      let selectedIndex = userAnswers[q.id];
      if (selectedIndex === undefined) {
        selectedIndex = userAnswers[idx];
      }

      if (q.section === 'grammar') grammarTotal++;
      if (q.section === 'listening') listeningTotal++;
      if (q.section === 'reading') readingTotal++;

      const isCorrect = selectedIndex === q.correct;
      if (isCorrect) {
        totalScore++;
        if (q.section === 'grammar') grammarScore++;
        if (q.section === 'listening') listeningScore++;
        if (q.section === 'reading') readingScore++;
      }

      detailedResults.push({
        id: q.id,
        section: q.section,
        levelTarget: q.levelTarget,
        selected: selectedIndex,
        correct: q.correct,
        isCorrect: isCorrect,
        explanation: q.explanation || ''
      });
    });

    const totalQuestions = questionsToEval.length || 32;
    const percentage = Math.round((totalScore / totalQuestions) * 100);

    // Mapeo Determinista de Nivel MCER & Regla de Entrelazado (Interleaving)
    let assignedLevel = 'A1';
    let levelName = 'Breakthrough / Novice';
    let levelTitle = 'CEFR A1: Foundations';
    let recommendedTrack = 'mcer-a1-foundations';
    let color = '#10b981';
    let nextStep = 'Iniciar con Fundamentos del Idioma (A1), saludos laborales, horarios y ubicación en planta. Regla pedagógica: Cursas exclusivamente el Track Base MCER A1 para afianzar bases sólidas; los laboratorios técnicos de carrera (ESP) se desbloquean al alcanzar Nivel A2.';
    let interleavingRule = 'Nivel A1: Solo Track Base MCER A1 (Protección cognitiva • Labs ESP bloqueados hasta Nivel A2)';

    if (totalScore >= 26) {
      // 26 - 32 (>= 80%)
      assignedLevel = 'B2';
      levelName = 'Vantage / Executive Fluency';
      levelTitle = 'CEFR B2: Executive Fluency';
      recommendedTrack = 'mcer-b2-fluency';
      color = '#a855f7';
      nextStep = '¡Nivel Avanzado B2! Acreditas tronco común. Estás listo para liderar órdenes de cambio de ingeniería (ECO), negociaciones con clientes en EE. UU., auditorías internacionales y defensa de Capstone Socrático con IA.';
      interleavingRule = 'Nivel B2/C1: Nearshoring Senior, ECO & Capstone Socrático con IA';
    } else if (totalScore >= 20) {
      // 20 - 25 (60% - 79%)
      assignedLevel = 'B1';
      levelName = 'Threshold / Intermediate';
      levelTitle = 'CEFR B1: Professional Independence';
      recommendedTrack = 'mcer-b1-professional';
      color = '#f59e0b';
      nextStep = 'Iniciar en Nivel B1: Procedimientos SOPs, correos ejecutivos, llamadas de seguimiento y defensa técnica. Inmersión total en las 60.0h de Ruta Determinista de tu Carrera con simuladores de incidentes y reporte 8D.';
      interleavingRule = 'Nivel B1: Inmersión Total en Ruta Determinista de 60h (16 Estaciones)';
    } else if (totalScore >= 13) {
      // 13 - 19 (40% - 59%)
      assignedLevel = 'A2';
      levelName = 'Waystage / Elementary';
      levelTitle = 'CEFR A2: Practical Workplace';
      recommendedTrack = 'mcer-a2-workplace';
      color = '#38bdf8';
      nextStep = 'Iniciar en Nivel A2: Registro de incidentes pasados, comparación de materiales y reportes de falla. ¡Entrelazado activo! Cursas MCER A2 y se desbloquean tus primeros laboratorios técnicos de carrera (Seguridad, EHS y Herramientas Industriales).';
      interleavingRule = 'Nivel A2: MCER A2 + Labs ESP Iniciales Desbloqueados';
    }

    return {
      testName: 'RapidCheck, Placement Test',
      totalScore: totalScore,
      totalQuestions: totalQuestions,
      percentage: percentage,
      assignedLevel: assignedLevel,
      levelName: levelName,
      levelTitle: levelTitle,
      recommendedTrack: recommendedTrack,
      color: color,
      nextStep: nextStep,
      interleavingRule: interleavingRule,
      sectionScores: {
        grammar: { score: grammarScore, total: grammarTotal || 12, pct: Math.round((grammarScore / (grammarTotal || 12)) * 100) },
        listening: { score: listeningScore, total: listeningTotal || 10, pct: Math.round((listeningScore / (listeningTotal || 10)) * 100) },
        reading: { score: readingScore, total: readingTotal || 10, pct: Math.round((readingScore / (readingTotal || 10)) * 100) }
      },
      detailedResults: detailedResults,
      timestamp: new Date().toISOString()
    };
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 5. STUDENT TEST HISTORY PERSISTENCE ENGINE
  // ══════════════════════════════════════════════════════════════════════════
  function recordStudentPlacementAttempt(studentInfo, evaluationResult, userAnswers) {
    if (typeof localStorage === 'undefined') return;
    const historyKey = 'stemos_placement_history';
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(historyKey) || '[]');
      if (!Array.isArray(history)) history = [];
    } catch (_) {
      history = [];
    }

    const attemptRecord = {
      testName: 'RapidCheck, Placement Test',
      tagline: '30-Min Comprehensive Testing for Checking Leveling',
      sessionId: evaluationResult.sessionId || ('RC-' + Date.now().toString(36).toUpperCase()),
      folio: studentInfo.folio || (studentInfo.student && studentInfo.student.folio) || 'FOLIO-N/A',
      studentName: studentInfo.name || (studentInfo.student && studentInfo.student.name) || 'Diana C. (Estudiante)',
      matricula: studentInfo.matricula || (studentInfo.student && studentInfo.student.matricula) || 'STEM-2026-ALUMNO',
      campus: studentInfo.campus || 'TecNM Tijuana (ITT)',
      career: studentInfo.career || 'it-mecatronica',
      totalScore: evaluationResult.totalScore,
      totalQuestions: evaluationResult.totalQuestions,
      percentage: evaluationResult.percentage,
      assignedLevel: evaluationResult.assignedLevel,
      levelTitle: evaluationResult.levelTitle,
      sectionScores: evaluationResult.sectionScores,
      timestamp: evaluationResult.timestamp || new Date().toISOString()
    };

    history.push(attemptRecord);

    try {
      localStorage.setItem(historyKey, JSON.stringify(history));
      localStorage.setItem('stemos_user_placement_result', JSON.stringify(evaluationResult));
      localStorage.setItem('stemos_cefr_level', evaluationResult.assignedLevel);

      // Legacy payload preservation
      const legacyPayload = {
        student: studentInfo,
        result: evaluationResult,
        answers: userAnswers,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('stemos_placement_test', JSON.stringify(legacyPayload));
      if (studentInfo.folio) {
        localStorage.setItem('stemos_diag_' + studentInfo.folio, JSON.stringify(legacyPayload));
      }
    } catch (err) {
      console.warn('[RapidCheck] Warning saving test history to localStorage:', err);
    }

    return attemptRecord;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 6. AUDIO REPRODUCTION (US NEURAL / PIPER / WEB SPEECH API)
  // ══════════════════════════════════════════════════════════════════════════
  const PLACEMENT_AUDIO_FILES = {
    'pt-test-audio': '/content/audio/pt-test-audio.mp3',
    'pt-l01': '/content/audio/pt-l01.mp3',
    'pt-l02': '/content/audio/pt-l02.mp3',
    'pt-l03': '/content/audio/pt-l03.mp3',
    'pt-l04': '/content/audio/pt-l04.mp3',
    'pt-l05': '/content/audio/pt-l05.mp3',
    'pt-l06': '/content/audio/pt-l06.mp3',
    'pt-l07': '/content/audio/pt-l07.mp3',
    'pt-l08': '/content/audio/pt-l08.mp3',
    'pt-l09': '/content/audio/pt-l09.mp3',
    'pt-l10': '/content/audio/pt-l10.mp3'
  };

  const SCRIPT_AUDIO_LOOKUP = {
    'good morning, my name is robert': '/content/audio/pt-l01.mp3',
    'attention all operators': '/content/audio/pt-l02.mp3',
    'please place the calibrated torque wrench': '/content/audio/pt-l03.mp3',
    'station four experienced twenty minutes': '/content/audio/pt-l04.mp3',
    'the delivery of raw stainless steel': '/content/audio/pt-l05.mp3',
    'the pneumatic clamp cylinder': '/content/audio/pt-l06.mp3',
    'if the hole diameter exceeds': '/content/audio/pt-l07.mp3',
    'i understand your concern about delivery': '/content/audio/pt-l08.mp3',
    'we are running short on time': '/content/audio/pt-l09.mp3',
    'our containment action was fully effective': '/content/audio/pt-l10.mp3',
    'welcome to stemos': '/content/audio/pt-test-audio.mp3',

    // stemOS MCER Track A1 Unit 1 Pre-rendered Audio Assets
    'are you alex rivera': '/content/audio/mcer/a1-u1-d1.mp3',
    'welcome to the team. are you alex rivera': '/content/audio/mcer/a1-u1-d1.mp3',
    'pleasure to meet you in person': '/content/audio/mcer/a1-u1-d2.mp3',
    'good morning, mark. yes, i am': '/content/audio/mcer/a1-u1-d2.mp3',
    'how do you spell your last name': '/content/audio/mcer/a1-u1-d3.mp3',
    'it is r-i-v-e-r-a': '/content/audio/mcer/a1-u1-d4.mp3',
    'rivera. what is your email address': '/content/audio/mcer/a1-u1-d4.mp3',
    'mark@stemos.org': '/content/audio/mcer/a1-u1-d5.mp3',
    'welcome aboard': '/content/audio/mcer/a1-u1-d5.mp3',
    'thank you, mark. i am very happy to be here': '/content/audio/mcer/a1-u1-d6.mp3',
    'mark says: good morning': '/content/audio/mcer/a1-u1-dialogue-full.mp3',
    'mark: good morning': '/content/audio/mcer/a1-u1-dialogue-full.mp3',

    // A1 Unit 1 Vocab & Pronunciation
    'hello! my name is alex': '/content/audio/mcer/a1-u1-vocab-hello.mp3',
    'hello. hello! my name is alex': '/content/audio/mcer/a1-u1-vocab-hello.mp3',
    'welcome to our team': '/content/audio/mcer/a1-u1-vocab-welcome.mp3',
    'welcome. welcome to our team': '/content/audio/mcer/a1-u1-vocab-welcome.mp3',
    'what is your last name': '/content/audio/mcer/a1-u1-vocab-name.mp3',
    'name. what is your last name': '/content/audio/mcer/a1-u1-vocab-name.mp3',
    'are you a new student here': '/content/audio/mcer/a1-u1-vocab-student.mp3',
    'student. are you a new student here': '/content/audio/mcer/a1-u1-vocab-student.mp3',
    'diana is my new coworker': '/content/audio/mcer/a1-u1-vocab-coworker.mp3',
    'coworker. diana is my new coworker': '/content/audio/mcer/a1-u1-vocab-coworker.mp3',
    'it is a pleasure to meet you': '/content/audio/mcer/a1-u1-vocab-pleasure.mp3',
    'pleasure. it is a pleasure to meet you': '/content/audio/mcer/a1-u1-vocab-pleasure.mp3',
    'mark is an experienced colleague': '/content/audio/mcer/a1-u1-vocab-colleague.mp3',
    'colleague. mark is an experienced colleague': '/content/audio/mcer/a1-u1-vocab-colleague.mp3',
    'good morning, everyone': '/content/audio/mcer/a1-u1-vocab-morning.mp3',
    'morning. good morning, everyone': '/content/audio/mcer/a1-u1-vocab-morning.mp3',

    // A1 Unit 1 Listening Lab & Reading
    'all incoming engineering interns must step to window 2': '/content/audio/mcer/a1-u1-listening-lab.mp3',
    'visitor badges are temporary': '/content/audio/mcer/a1-u1-listening-lab.mp3',
    'welcome to northern tech manufacturing facility': '/content/audio/mcer/a1-u1-reading-passage.mp3',
    'assigned equipment lockers are located in corridor b': '/content/audio/mcer/a1-u1-reading-passage.mp3',

    // A1 Unit 1 Plant Crucible Model
    'my name is alex rivera, employee number 84029': '/content/audio/mcer/a1-u1-crucible-model.mp3',
    'mechatronics intern assigned to sub-assembly line 3': '/content/audio/mcer/a1-u1-crucible-model.mp3',

    // A1 Unit 2 Assets
    'today we review equipment safety procedures': '/content/audio/mcer/a1-u2-d1.mp3',
    'i have inspected my personal protective equipment': '/content/audio/mcer/a1-u2-d2.mp3',
    'safety is our top operational priority': '/content/audio/mcer/a1-u2-vocab-safety.mp3',
    'daily machine inspection begins at seven am': '/content/audio/mcer/a1-u2-vocab-inspection.mp3',
    'line 2 conveyor speed is calibrated': '/content/audio/mcer/a1-u2-listening-lab.mp3'
  };

  let activePlacementAudio = null;

  function stopAudioPrompt() {
    if (activePlacementAudio) {
      try {
        activePlacementAudio.pause();
        activePlacementAudio.currentTime = 0;
      } catch (_) {}
      activePlacementAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
    }
  }

  function playAudioPrompt(scriptText, onStart, onEnd, qId) {
    stopAudioPrompt();

    // 1. Check exact question ID or text match in pre-rendered US Neural Audio assets
    let matchedUrl = null;
    if (qId && PLACEMENT_AUDIO_FILES[qId]) {
      matchedUrl = PLACEMENT_AUDIO_FILES[qId];
    } else if (scriptText) {
      const lower = scriptText.toLowerCase();
      for (const [snippet, url] of Object.entries(SCRIPT_AUDIO_LOOKUP)) {
        if (lower.includes(snippet)) {
          matchedUrl = url;
          break;
        }
      }
    }

    if (matchedUrl && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio(matchedUrl);
        activePlacementAudio = audio;
        audio.onplay = () => { if (onStart) onStart(); };
        audio.onended = () => {
          activePlacementAudio = null;
          if (onEnd) onEnd();
        };
        audio.onerror = () => {
          activePlacementAudio = null;
          fallbackToSpeechSynthesis(scriptText, onStart, onEnd);
        };
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => fallbackToSpeechSynthesis(scriptText, onStart, onEnd));
        }
        return;
      } catch (_) {
        // Fall through
      }
    }

    // 2. Check STEMOS_TTS Piper Neural engine
    if (typeof window !== 'undefined' && window.STEMOS_TTS && typeof window.STEMOS_TTS.speak === 'function') {
      window.STEMOS_TTS.speak(scriptText, {
        speed: 0.95,
        lang: 'en-US',
        onStart: onStart,
        onEnd: onEnd,
        onError: () => fallbackToSpeechSynthesis(scriptText, onStart, onEnd)
      });
      return;
    }

    // 3. Fallback to Web Speech API
    fallbackToSpeechSynthesis(scriptText, onStart, onEnd);
  }

  function fallbackToSpeechSynthesis(scriptText, onStart, onEnd) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis not supported in this environment');
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Aaron') || v.name.includes('Jenny') || v.name.includes('Guy')));
    if (usVoice) utterance.voice = usVoice;

    if (onStart) utterance.onstart = onStart;
    utterance.onend = onEnd;
    utterance.onerror = onEnd;

    window.speechSynthesis.speak(utterance);
  }

  return {
    version: '2.5.0',
    title: 'RapidCheck, Placement Test — 30-Min Comprehensive Testing for Leveling',
    brand: 'RapidCheck, Placement Test',
    tagline: '30-Min Comprehensive Testing for Checking Leveling',
    questions: PLACEMENT_QUESTIONS,
    reactiveBank: ROTATING_REACTIVE_BANK,
    createRapidCheckSession: createRapidCheckSession,
    evaluateAnswers: evaluateAnswers,
    recordStudentPlacementAttempt: recordStudentPlacementAttempt,
    playAudioPrompt: playAudioPrompt,
    stopAudioPrompt: stopAudioPrompt
  };
}));
