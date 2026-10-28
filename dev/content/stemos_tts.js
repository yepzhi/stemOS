/**
 * stemOS Universal Neural TTS Engine (Piper Mini PC & Web Speech API)
 * ═════════════════════════════════════════════════════════════════════
 * Architectural Invariant:
 * 1. Primary: High-fidelity Neural Piper TTS hosted on campus Mini PC
 *    Edge Gateway (/api/tts or configured PIPER_TTS_ENDPOINT).
 * 2. Static Pre-Rendered Neural Audio: Instant playback for hero
 *    Cleanroom ISO Class 1 photolithography protocols.
 * 3. Fallback: Native browser Web Speech API (en-US, Samantha / Google US)
 *    if Mini PC edge server is offline, busy, or unreachable.
 * 4. Zero-Latency Memory Cache: Reused audio blobs are cached in memory.
 * ═════════════════════════════════════════════════════════════════════
 */
(function (root, factory) {
  const result = factory();
  if (typeof define === 'function' && define.amd) {
    define([], () => result);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = result;
  }
  if (typeof root !== 'undefined') {
    root.STEMOS_TTS = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_TTS = result;

    // Bind convenience helpers for stemOS Studio components
    window.speakEnglishText = function (text, rate, onEnd) {
      result.speak(text, { speed: rate || 0.93, lang: 'en-US', onEnd: onEnd });
    };
    window.stopEnglishSpeech = function () {
      result.stop();
    };
    window.speakText = function (text, lang) {
      result.speak(text, { lang: lang || 'en-US', speed: 0.93 });
    };
    window.stopSpeech = function () {
      result.stop();
    };

    // Safe interception for legacy window.speechSynthesis.speak callers in Studio
    if ('speechSynthesis' in window && !window.__STEMOS_SPEECH_INTERCEPTED__) {
      window.__STEMOS_SPEECH_INTERCEPTED__ = true;
      const originalSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
      const originalCancel = window.speechSynthesis.cancel.bind(window.speechSynthesis);
      window.STEMOS_NATIVE_SPEAK = originalSpeak;
      window.STEMOS_NATIVE_CANCEL = originalCancel;

      window.speechSynthesis.speak = function (utterance) {
        if (!utterance) return;
        if (utterance._isNativeFallback) {
          return originalSpeak(utterance);
        }
        result.speak(utterance.text, {
          speed: utterance.rate || 0.93,
          lang: utterance.lang || 'en-US',
          onStart: () => {
            if (typeof utterance.onstart === 'function') utterance.onstart();
          },
          onEnd: () => {
            if (typeof utterance.onend === 'function') utterance.onend();
          },
          onError: (err) => {
            if (typeof utterance.onerror === 'function') utterance.onerror(err);
          }
        });
      };

      window.speechSynthesis.cancel = function () {
        result.stop();
        originalCancel();
      };
    }
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Config & State
  const audioBlobCache = new Map();
  let currentAudio = null;
  let currentSessionId = 0;
  let isPlaying = false;
  let isPiperActive = true;

  // Static pre-rendered cleanroom audio for instantaneous zero-latency playback (Piper Neural Lessac High)
  const STATIC_AUDIO_MAP = {
    cleanroom_photolithography_b1: '/content/audio/cleanroom_photolithography.wav?v=2.1.0-piper-neural',
    cleanroom_basic_a2: '/content/audio/cleanroom_basic_a2.wav?v=2.1.0-piper-neural'
  };

  function normalizeKey(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  const CLEANROOM_B1_KEY = normalizeKey(
    "In extreme ultraviolet (EUV) photolithography, wafer steppers operate inside ISO Class 1 cleanrooms with laminar airflow. Photoresist deposition requires precise chemical handling to prevent sub-micron yield defects."
  );
  const CLEANROOM_B1_ALT_KEY = normalizeKey(
    "In extreme ultraviolet photolithography, wafer steppers operate inside ISO Class 1 cleanrooms with laminar airflow. Photoresist deposition requires precise chemical handling to prevent sub-micron yield defects."
  );
  const CLEANROOM_A2_KEY = normalizeKey(
    "In computer chip factories, workers wear white cleanroom suits. They keep the air pure so microchips do not have dust damage. Silicon wafers are washed with special chemical liquids."
  );

  const PLACEMENT_STATIC_AUDIO = {
    [normalizeKey("Good morning, my name is Robert. My employee badge number is 4-2-9-0.")]: '/content/audio/pt-l01.mp3',
    [normalizeKey("Attention all operators. The cafeteria will be closed for cleaning from two o'clock to three o'clock this afternoon.")]: '/content/audio/pt-l02.mp3',
    [normalizeKey("Please place the calibrated torque wrench in Cabinet B on the top shelf.")]: '/content/audio/pt-l03.mp3',
    [normalizeKey("Station four experienced twenty minutes of unexpected downtime yesterday because an optical sensor became loose.")]: '/content/audio/pt-l04.mp3',
    [normalizeKey("The delivery of raw stainless steel brackets was rescheduled from Monday morning to Wednesday afternoon.")]: '/content/audio/pt-l05.mp3',
    [normalizeKey("The pneumatic clamp cylinder is leaking compressed air behind the manifold. We must shut the air valve before replacing the seal.")]: '/content/audio/pt-l06.mp3',
    [normalizeKey("If the hole diameter exceeds zero point zero five millimeters from the CAD specification, the automated robot will segregate the part into the red quarantine bin.")]: '/content/audio/pt-l07.mp3',
    [normalizeKey("I understand your concern about delivery lead times; however, switching to an unverified local vendor poses a significant quality risk.")]: '/content/audio/pt-l08.mp3',
    [normalizeKey("We are running short on time during this engineering review. Let's table the discussion regarding the secondary filtration bracket until Friday's morning sync.")]: '/content/audio/pt-l09.mp3',
    [normalizeKey("Our containment action was fully effective: all fifteen hundred finished subassemblies in transit were placed on electronic hold in warehouse quarantine, confirming zero defect escapes to the customer.")]: '/content/audio/pt-l10.mp3',
    [normalizeKey("Welcome to stemOS. Audio check complete. Your speakers and speech synthesis are working perfectly.")]: '/content/audio/pt-test-audio.mp3'
  };

  // stemOS MCER Tracks Static Audio Map (Piper Neural High-Fidelity Pre-Rendered Offline Assets)
  const MCER_STATIC_AUDIO = {
    // Dialogue lines
    [normalizeKey("Good morning! Welcome to the team. Are you Alex Rivera?")]: '/content/audio/mcer/a1-u1-d1.mp3',
    [normalizeKey("Good morning, Mark. Yes, I am. It is a pleasure to meet you in person.")]: '/content/audio/mcer/a1-u1-d2.mp3',
    [normalizeKey("It is great to meet you too, Alex. How do you spell your last name?")]: '/content/audio/mcer/a1-u1-d3.mp3',
    [normalizeKey("It is R-I-V-E-R-A. Rivera. What is your email address?")]: '/content/audio/mcer/a1-u1-d4.mp3',
    [normalizeKey("My email is mark@stemos.org. Welcome aboard!")]: '/content/audio/mcer/a1-u1-d5.mp3',
    [normalizeKey("Thank you, Mark. I am very happy to be here.")]: '/content/audio/mcer/a1-u1-d6.mp3',
    [normalizeKey("Good morning! Welcome to the team. Are you Alex Rivera? Good morning, Mark. Yes, I am. It is a pleasure to meet you in person. It is great to meet you too, Alex. How do you spell your last name? It is R-I-V-E-R-A. Rivera. What is your email address? My email is mark@stemos.org. Welcome aboard! Thank you, Mark. I am very happy to be here.")]: '/content/audio/mcer/a1-u1-dialogue-full.mp3',
    [normalizeKey("Mark says: Good morning! Welcome to the team. Are you Alex Rivera?. Alex says: Good morning, Mark. Yes, I am. It is a pleasure to meet you in person.. Mark says: It is great to meet you too, Alex. How do you spell your last name?. Alex says: It is R-I-V-E-R-A. Rivera. What is your email address?. Mark says: My email is mark@stemos.org. Welcome aboard!. Alex says: Thank you, Mark. I am very happy to be here.")]: '/content/audio/mcer/a1-u1-dialogue-full.mp3',
    
    // Vocab terms + examples
    [normalizeKey("Hello")]: '/content/audio/mcer/a1-u1-vocab-hello.mp3',
    [normalizeKey("Hello. Hello! My name is Alex.")]: '/content/audio/mcer/a1-u1-vocab-hello.mp3',
    [normalizeKey("Welcome")]: '/content/audio/mcer/a1-u1-vocab-welcome.mp3',
    [normalizeKey("Welcome. Welcome to our team.")]: '/content/audio/mcer/a1-u1-vocab-welcome.mp3',
    [normalizeKey("Name")]: '/content/audio/mcer/a1-u1-vocab-name.mp3',
    [normalizeKey("Name. What is your last name?")]: '/content/audio/mcer/a1-u1-vocab-name.mp3',
    [normalizeKey("Student")]: '/content/audio/mcer/a1-u1-vocab-student.mp3',
    [normalizeKey("Student. Are you a new student here?")]: '/content/audio/mcer/a1-u1-vocab-student.mp3',
    [normalizeKey("Coworker")]: '/content/audio/mcer/a1-u1-vocab-coworker.mp3',
    [normalizeKey("Coworker. Diana is my new coworker.")]: '/content/audio/mcer/a1-u1-vocab-coworker.mp3',
    [normalizeKey("Pleasure")]: '/content/audio/mcer/a1-u1-vocab-pleasure.mp3',
    [normalizeKey("Pleasure. It is a pleasure to meet you.")]: '/content/audio/mcer/a1-u1-vocab-pleasure.mp3',
    [normalizeKey("Colleague")]: '/content/audio/mcer/a1-u1-vocab-colleague.mp3',
    [normalizeKey("Colleague. Mark is an experienced colleague.")]: '/content/audio/mcer/a1-u1-vocab-colleague.mp3',
    [normalizeKey("Morning")]: '/content/audio/mcer/a1-u1-vocab-morning.mp3',
    [normalizeKey("Morning. Good morning, everyone.")]: '/content/audio/mcer/a1-u1-vocab-morning.mp3',

    // Listening Lab & Reading
    [normalizeKey("Good morning. All incoming engineering interns must step to Window 2. Please state your full legal name, spelling your last name clearly, and provide your university affiliate identification number. Remember that visitor badges are temporary and expire daily at seventeen hundred hours.")]: '/content/audio/mcer/a1-u1-listening-lab.mp3',
    [normalizeKey("Welcome to Northern Tech Manufacturing Facility. All incoming engineering interns must complete their security credential verification by 08:30 AM on Day One. Please bring your official university credentials and emergency contact sheet to Human Resources on the second floor, Room 210. Assigned equipment lockers are located in Corridor B. Personal cell phones must remain inside your locker during active machine operations.")]: '/content/audio/mcer/a1-u1-reading-passage.mp3',
    
    // Plant Crucible Model
    [normalizeKey("Good morning. My name is Alex Rivera, employee number 84029. I am the new mechatronics intern assigned to Sub-Assembly Line 3 under shift supervisor Mark Reynolds.")]: '/content/audio/mcer/a1-u1-crucible-model.mp3',

    // Unit 2 Assets (Workplace Routines, Time & Schedules)
    [normalizeKey("Hi Javier, what shift do you work this week on Line 4?")]: '/content/audio/mcer/a1-u2-d1.mp3',
    [normalizeKey("I work the first shift, from 7:00 AM to 3:30 PM, Monday through Friday.")]: '/content/audio/mcer/a1-u2-d2.mp3',
    [normalizeKey("Great. When does your crew have the morning safety briefing?")]: '/content/audio/mcer/a1-u2-d3.mp3',
    [normalizeKey("We always hold the safety briefing at 7:15 AM in front of the main Kanban board.")]: '/content/audio/mcer/a1-u2-d4.mp3',
    [normalizeKey("And what time is your scheduled lunch break?")]: '/content/audio/mcer/a1-u2-d5.mp3',
    [normalizeKey("First shift takes lunch at 11:30 AM for thirty minutes in Cafeteria B.")]: '/content/audio/mcer/a1-u2-d6.mp3',
    [normalizeKey("Elena asks: Hi Javier, what shift do you work this week on Line 4? Javier answers: I work the first shift, from 7:00 AM to 3:30 PM, Monday through Friday. Elena asks: Great. When does your crew have the morning safety briefing? Javier answers: We always hold the safety briefing at 7:15 AM in front of the main Kanban board. Elena asks: And what time is your scheduled lunch break? Javier explains: First shift takes lunch at 11:30 AM for thirty minutes in Cafeteria B.")]: '/content/audio/mcer/a1-u2-dialogue-full.mp3',
    [normalizeKey("Schedule")]: '/content/audio/mcer/a1-u2-vocab-schedule.mp3',
    [normalizeKey("Schedule. My schedule starts at 8:00 AM sharp.")]: '/content/audio/mcer/a1-u2-vocab-schedule.mp3',
    [normalizeKey("Routine")]: '/content/audio/mcer/a1-u2-vocab-routine.mp3',
    [normalizeKey("Routine. Daily routines help us stay organized.")]: '/content/audio/mcer/a1-u2-vocab-routine.mp3',
    [normalizeKey("Afternoon")]: '/content/audio/mcer/a1-u2-vocab-afternoon.mp3',
    [normalizeKey("Afternoon. Our second session meets in the afternoon.")]: '/content/audio/mcer/a1-u2-vocab-afternoon.mp3',
    [normalizeKey("Weekend")]: '/content/audio/mcer/a1-u2-vocab-weekend.mp3',
    [normalizeKey("Weekend. Do you have classes on the weekend?")]: '/content/audio/mcer/a1-u2-vocab-weekend.mp3',
    [normalizeKey("Break")]: '/content/audio/mcer/a1-u2-vocab-break.mp3',
    [normalizeKey("Break. We take a 30-minute lunch break at noon.")]: '/content/audio/mcer/a1-u2-vocab-break.mp3',
    [normalizeKey("On Time")]: '/content/audio/mcer/a1-u2-vocab-ontime.mp3',
    [normalizeKey("On Time. The meeting starts on time at 9:00 AM.")]: '/content/audio/mcer/a1-u2-vocab-ontime.mp3',
    [normalizeKey("Usually")]: '/content/audio/mcer/a1-u2-vocab-usually.mp3',
    [normalizeKey("Usually. I usually finish my tasks before 5:00 PM.")]: '/content/audio/mcer/a1-u2-vocab-usually.mp3',
    [normalizeKey("Plant operations run on three continuous shifts. Shift 1 runs from 07:00 to 15:30. Shift 2 operates from 15:30 to 23:30. Shift 3 runs from 23:30 to 07:00. To prevent production bottlenecks, cafeteria meal times are strictly staggered: Group A dines at 11:30 AM, and Group B dines at 12:15 PM. Operators must never leave active conveyor lines unattended during break handoffs.")]: '/content/audio/mcer/a1-u2-listening-lab.mp3',
    [normalizeKey("Hello Javier, first shift produced 420 finished units today on Line 4. The line ran on schedule without stoppage. We always update the digital log before leaving. Scheduled belt maintenance takes place at 4:00 PM.")]: '/content/audio/mcer/a1-u2-crucible-model.mp3',

    // Unit 3 Assets (Workstation Navigation, Tools & Supplies)
    [normalizeKey("Mateo, where are the replacement optical proximity sensors?")]: '/content/audio/mcer/a1-u3-d1.mp3',
    [normalizeKey("There are three sealed boxes on the middle shelf, right next to the digital calipers.")]: '/content/audio/mcer/a1-u3-d2.mp3',
    [normalizeKey("Great. Is there any electrical insulation tape left in the drawer?")]: '/content/audio/mcer/a1-u3-d3.mp3',
    [normalizeKey("Yes, there is a fresh roll inside the top drawer of the green mobile cart.")]: '/content/audio/mcer/a1-u3-d4.mp3',
    [normalizeKey("Excellent. Please grab the 5mm hex wrench as well before we enter the cell.")]: '/content/audio/mcer/a1-u3-d5.mp3',
    [normalizeKey("Got it. I have the hex wrench and sensors ready.")]: '/content/audio/mcer/a1-u3-d6.mp3',
    [normalizeKey("Tom asks: Mateo, where are the replacement optical proximity sensors? Mateo answers: There are three sealed boxes on the middle shelf, right next to the digital calipers. Tom asks: Great. Is there any electrical insulation tape left in the drawer? Mateo replies: Yes, there is a fresh roll inside the top drawer of the green mobile cart. Tom instructs: Excellent. Please grab the 5mm hex wrench as well before we enter the cell. Mateo confirms: Got it. I have the hex wrench and sensors ready.")]: '/content/audio/mcer/a1-u3-dialogue-full.mp3',
    [normalizeKey("Toolbox")]: '/content/audio/mcer/a1-u3-vocab-toolbox.mp3',
    [normalizeKey("Toolbox. There is a calibrated torque wrench in the yellow toolbox.")]: '/content/audio/mcer/a1-u3-vocab-toolbox.mp3',
    [normalizeKey("Spare Parts")]: '/content/audio/mcer/a1-u3-vocab-spareparts.mp3',
    [normalizeKey("Spare Parts. Spare parts are kept in Cabinet B across from the tool crib.")]: '/content/audio/mcer/a1-u3-vocab-spareparts.mp3',
    [normalizeKey("Safety Goggles")]: '/content/audio/mcer/a1-u3-vocab-safetygoggles.mp3',
    [normalizeKey("Safety Goggles. Safety goggles are mandatory inside the production zone.")]: '/content/audio/mcer/a1-u3-vocab-safetygoggles.mp3',
    [normalizeKey("Storage Rack")]: '/content/audio/mcer/a1-u3-vocab-storagerack.mp3',
    [normalizeKey("Storage Rack. Raw materials are stacked on the lower storage rack.")]: '/content/audio/mcer/a1-u3-vocab-storagerack.mp3',
    [normalizeKey("Emergency Exit")]: '/content/audio/mcer/a1-u3-vocab-emergencyexit.mp3',
    [normalizeKey("Emergency Exit. The emergency exit is between Line 2 and the testing bay.")]: '/content/audio/mcer/a1-u3-vocab-emergencyexit.mp3',
    [normalizeKey("Calipers")]: '/content/audio/mcer/a1-u3-vocab-calipers.mp3',
    [normalizeKey("Calipers. Use the digital calipers to measure the outer diameter.")]: '/content/audio/mcer/a1-u3-vocab-calipers.mp3',
    [normalizeKey("Tool Crib")]: '/content/audio/mcer/a1-u3-vocab-toolcrib.mp3',
    [normalizeKey("Tool Crib. Sign out precision torque drivers at the central tool crib.")]: '/content/audio/mcer/a1-u3-vocab-toolcrib.mp3',
    [normalizeKey("Under 5S housekeeping standards, every tool has a designated shadow outline. All specialized calibration gauges must be signed out electronically using your employee badge. Operators must clean all grease and metal shavings from calipers before returning them to Shelf 4. Never leave loose hand tools on top of active machine guards or electrical enclosures.")]: '/content/audio/mcer/a1-u3-listening-lab.mp3',
    [normalizeKey("Good afternoon. There is a master Lockout/Tagout padlock cabinet on Wall C, directly between the tool crib and the automated test bay. In addition, there are two emergency eyewash stations located ten feet to your right next to the chemical rack.")]: '/content/audio/mcer/a1-u3-crucible-model.mp3',

    // Unit 4 Assets (Simple Directives, Safety Signs & Protocols)
    [normalizeKey("David, please stop the feeder conveyor for a moment.")]: '/content/audio/mcer/a1-u4-d1.mp3',
    [normalizeKey("Sure. Done. The red beacon is on. Is there a problem?")]: '/content/audio/mcer/a1-u4-d2.mp3',
    [normalizeKey("Yes, can you hand me the 10mm Allen wrench from the magnetic tray?")]: '/content/audio/mcer/a1-u4-d3.mp3',
    [normalizeKey("Here you go. Do you need an inspection flashlight as well?")]: '/content/audio/mcer/a1-u4-d4.mp3',
    [normalizeKey("Yes, please. Hold it right here on the lower motor bracket.")]: '/content/audio/mcer/a1-u4-d5.mp3',
    [normalizeKey("Careful! The notice says the gear housing is extremely hot.")]: '/content/audio/mcer/a1-u4-d6.mp3',
    [normalizeKey("Good catch. Put on your thermal gloves before touching the casing.")]: '/content/audio/mcer/a1-u4-d7.mp3',
    [normalizeKey("Rachel says: David, please stop the feeder conveyor for a moment. David responds: Sure. Done. The red beacon is on. Is there a problem? Rachel asks: Yes, can you hand me the 10mm Allen wrench from the magnetic tray? David replies: Here you go. Do you need an inspection flashlight as well? Rachel answers: Yes, please. Hold it right here on the lower motor bracket. David warns: Careful! The notice says the gear housing is extremely hot. Rachel confirms: Good catch. Put on your thermal gloves before touching the casing.")]: '/content/audio/mcer/a1-u4-dialogue-full.mp3',
    [normalizeKey("Caution")]: '/content/audio/mcer/a1-u4-vocab-caution.mp3',
    [normalizeKey("Caution. Caution: Hot surface, do not touch without heat-resistant gloves.")]: '/content/audio/mcer/a1-u4-vocab-caution.mp3',
    [normalizeKey("Ear Protection")]: '/content/audio/mcer/a1-u4-vocab-earprotection.mp3',
    [normalizeKey("Ear Protection. Ear protection is required beyond this yellow boundary line.")]: '/content/audio/mcer/a1-u4-vocab-earprotection.mp3',
    [normalizeKey("Shut Down")]: '/content/audio/mcer/a1-u4-vocab-shutdown.mp3',
    [normalizeKey("Shut Down. Please shut down the conveyor motor before clearing the jam.")]: '/content/audio/mcer/a1-u4-vocab-shutdown.mp3',
    [normalizeKey("Authorized Personnel")]: '/content/audio/mcer/a1-u4-vocab-authorized.mp3',
    [normalizeKey("Authorized Personnel. High-voltage enclosure: authorized licensed personnel only.")]: '/content/audio/mcer/a1-u4-vocab-authorized.mp3',
    [normalizeKey("Keep Clear")]: '/content/audio/mcer/a1-u4-vocab-keepclear.mp3',
    [normalizeKey("Keep Clear. Keep this forklift corridor clear of wooden pallets at all times.")]: '/content/audio/mcer/a1-u4-vocab-keepclear.mp3',
    [normalizeKey("Emergency Stop")]: '/content/audio/mcer/a1-u4-vocab-emergencystop.mp3',
    [normalizeKey("Emergency Stop. Hit the red mushroom emergency stop button in case of jam.")]: '/content/audio/mcer/a1-u4-vocab-emergencystop.mp3',
    [normalizeKey("Hard Hat")]: '/content/audio/mcer/a1-u4-vocab-hardhat.mp3',
    [normalizeKey("Hard Hat. Wear your hard hat inside the overhead crane zone.")]: '/content/audio/mcer/a1-u4-vocab-hardhat.mp3',
    [normalizeKey("DANGER: AUTOMATIC EQUIPMENT MAY ENERGIZE OR START WITHOUT NOTICE. Always verify Lockout/Tagout de-energization before reaching into mechanical pinch points. Keep hands and loose clothing away from rotating spindle drives. Do not bypass safety interlock switches under any operational circumstances.")]: '/content/audio/mcer/a1-u4-listening-lab.mp3',
    [normalizeKey("Excuse me, please stop immediately. Safety goggles and hard hats are mandatory beyond the yellow line. This is a restricted high-voltage robotic cell. Do not cross the safety interlock line. Please report to the security office to sign in.")]: '/content/audio/mcer/a1-u4-crucible-model.mp3',

    // ==========================================
    // LEVEL A2 (ELEMENTARY / WAYSTAGE)
    // ==========================================

    // A2 Unit 1 - Past Actions & Shift Incident Logs
    [normalizeKey("Good morning, Claudia. Here is the shift handover log for Line 4.")]: '/content/audio/mcer/a2-u1-d1.mp3',
    [normalizeKey("Thanks, Luis. Did you experience any downtime during the graveyard shift?")]: '/content/audio/mcer/a2-u1-d2.mp3',
    [normalizeKey("Yes, Station 4 stopped for about thirty minutes because a proximity sensor came loose.")]: '/content/audio/mcer/a2-u1-d3.mp3',
    [normalizeKey("Did the maintenance technician replace the unit?")]: '/content/audio/mcer/a2-u1-d4.mp3',
    [normalizeKey("No, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward.")]: '/content/audio/mcer/a2-u1-d5.mp3',
    [normalizeKey("Did you log the stop in the digital MES system?")]: '/content/audio/mcer/a2-u1-d6.mp3',
    [normalizeKey("Yes, I logged code E-104 and recorded thirty minutes of total downtime.")]: '/content/audio/mcer/a2-u1-d7.mp3',
    [normalizeKey("Luis says: Good morning, Claudia. Here is the shift handover log for Line 4. Claudia asks: Thanks, Luis. Did you experience any downtime during the graveyard shift? Luis explains: Yes, Station 4 stopped for about thirty minutes because a proximity sensor came loose. Claudia asks: Did the maintenance technician replace the unit? Luis answers: No, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward. Claudia asks: Did you log the stop in the digital MES system? Luis confirms: Yes, I logged code E-104 and recorded thirty minutes of total downtime.")]: '/content/audio/mcer/a2-u1-dialogue-full.mp3',
    [normalizeKey("Good morning, Claudia. Here is the shift handover log for Line 4. Thanks, Luis. Did you experience any downtime during the graveyard shift? Yes, Station 4 stopped for about thirty minutes because a proximity sensor came loose. Did the maintenance technician replace the unit? No, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward. Did you log the stop in the digital MES system? Yes, I logged code E-104 and recorded thirty minutes of total downtime.")]: '/content/audio/mcer/a2-u1-dialogue-full.mp3',
    [normalizeKey("Malfunction")]: '/content/audio/mcer/a2-u1-vocab-malfunction.mp3',
    [normalizeKey("Malfunction. The hydraulic pump malfunctioned around 11:30 AM yesterday.")]: '/content/audio/mcer/a2-u1-vocab-malfunction.mp3',
    [normalizeKey("Replaced")]: '/content/audio/mcer/a2-u1-vocab-replaced.mp3',
    [normalizeKey("Replaced. We replaced the worn timing belt during preventive maintenance.")]: '/content/audio/mcer/a2-u1-vocab-replaced.mp3',
    [normalizeKey("Inspection")]: '/content/audio/mcer/a2-u1-vocab-inspection.mp3',
    [normalizeKey("Inspection. Quality completed the dimensional inspection this morning.")]: '/content/audio/mcer/a2-u1-vocab-inspection.mp3',
    [normalizeKey("Downtime")]: '/content/audio/mcer/a2-u1-vocab-downtime.mp3',
    [normalizeKey("Downtime. Line 2 experienced 45 minutes of unexpected downtime.")]: '/content/audio/mcer/a2-u1-vocab-downtime.mp3',
    [normalizeKey("Logged")]: '/content/audio/mcer/a2-u1-vocab-logged.mp3',
    [normalizeKey("Logged. The technician logged the voltage variance in the shift binder.")]: '/content/audio/mcer/a2-u1-vocab-logged.mp3',
    [normalizeKey("Tripped")]: '/content/audio/mcer/a2-u1-vocab-tripped.mp3',
    [normalizeKey("Tripped. The main circuit breaker tripped due to excessive motor current.")]: '/content/audio/mcer/a2-u1-vocab-tripped.mp3',
    [normalizeKey("Calibrated")]: '/content/audio/mcer/a2-u1-vocab-calibrated.mp3',
    [normalizeKey("Calibrated. We calibrated the load cell before starting production.")]: '/content/audio/mcer/a2-u1-vocab-calibrated.mp3',
    [normalizeKey("Date: Oct 18. Technician: R. Gomez. At 14:15, spindle drive #3 overheated and triggered thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature stabilized at 48°C. Total downtime was 30 minutes.")]: '/content/audio/mcer/a2-u1-reading-passage.mp3',
    [normalizeKey("Date: October 18th. Technician: R. Gomez. At 14:15, spindle drive number 3 overheated and triggered thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature stabilized at 48 degrees Celsius. Total downtime was 30 minutes.")]: '/content/audio/mcer/a2-u1-listening-lab.mp3',
    [normalizeKey("Yesterday at 14:15, spindle drive number 3 overheated and tripped thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the line. Normal operating temperature stabilized at 48 degrees Celsius after thirty minutes of downtime.")]: '/content/audio/mcer/a2-u1-crucible-model.mp3',

    // A2 Unit 2 - Comparing Equipment, Specs & Materials
    [normalizeKey("Ken, we have two vendor quotes for our end-mill bits: carbide and cobalt steel.")]: '/content/audio/mcer/a2-u2-d1.mp3',
    [normalizeKey("Cobalt steel is cheaper, but carbide tooling is much more durable at high RPMs.")]: '/content/audio/mcer/a2-u2-d2.mp3',
    [normalizeKey("Will carbide survive our thermal stress specs during titanium milling?")]: '/content/audio/mcer/a2-u2-d3.mp3',
    [normalizeKey("Yes, carbide is the most heat-resistant material for this aerospace bracket.")]: '/content/audio/mcer/a2-u2-d4.mp3',
    [normalizeKey("Then carbide is the most cost-effective option over the full production run.")]: '/content/audio/mcer/a2-u2-d5.mp3',
    [normalizeKey("Agreed. It will give us a tighter tolerance and fewer tool changes.")]: '/content/audio/mcer/a2-u2-d6.mp3',
    [normalizeKey("Sara says: Ken, we have two vendor quotes for our end-mill bits: carbide and cobalt steel. Ken explains: Cobalt steel is cheaper, but carbide tooling is much more durable at high RPMs. Sara asks: Will carbide survive our thermal stress specs during titanium milling? Ken answers: Yes, carbide is the most heat-resistant material for this aerospace bracket. Sara says: Then carbide is the most cost-effective option over the full production run. Ken agrees: Agreed. It will give us a tighter tolerance and fewer tool changes.")]: '/content/audio/mcer/a2-u2-dialogue-full.mp3',
    [normalizeKey("Ken, we have two vendor quotes for our end-mill bits: carbide and cobalt steel. Cobalt steel is cheaper, but carbide tooling is much more durable at high RPMs. Will carbide survive our thermal stress specs during titanium milling? Yes, carbide is the most heat-resistant material for this aerospace bracket. Then carbide is the most cost-effective option over the full production run. Agreed. It will give us a tighter tolerance and fewer tool changes.")]: '/content/audio/mcer/a2-u2-dialogue-full.mp3',
    [normalizeKey("Durable")]: '/content/audio/mcer/a2-u2-vocab-durable.mp3',
    [normalizeKey("Durable. Carbide cutting tips are significantly more durable than high-speed steel.")]: '/content/audio/mcer/a2-u2-vocab-durable.mp3',
    [normalizeKey("Lightweight")]: '/content/audio/mcer/a2-u2-vocab-lightweight.mp3',
    [normalizeKey("Lightweight. Aluminum alloys are lighter than structural carbon steel.")]: '/content/audio/mcer/a2-u2-vocab-lightweight.mp3',
    [normalizeKey("Cost-Effective")]: '/content/audio/mcer/a2-u2-vocab-costeffective.mp3',
    [normalizeKey("Cost-Effective. Refurbishing servo drives is more cost-effective than buying replacements.")]: '/content/audio/mcer/a2-u2-vocab-costeffective.mp3',
    [normalizeKey("Tolerance")]: '/content/audio/mcer/a2-u2-vocab-tolerance.mp3',
    [normalizeKey("Tolerance. The wire EDM machine holds a tighter tolerance than the CNC mill.")]: '/content/audio/mcer/a2-u2-vocab-tolerance.mp3',
    [normalizeKey("Throughput")]: '/content/audio/mcer/a2-u2-vocab-throughput.mp3',
    [normalizeKey("Throughput. The multi-spindle lathe achieves a higher throughput per hour.")]: '/content/audio/mcer/a2-u2-vocab-throughput.mp3',
    [normalizeKey("Corrosion-Resistant")]: '/content/audio/mcer/a2-u2-vocab-corrosionresistant.mp3',
    [normalizeKey("Corrosion-Resistant. Stainless steel 316 is more corrosion-resistant in marine environments.")]: '/content/audio/mcer/a2-u2-vocab-corrosionresistant.mp3',
    [normalizeKey("When selecting clear machine safety enclosures, polycarbonate provides 250 times the impact resistance of standard tempered glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant and marginally cheaper, polycarbonate is significantly safer for high-pressure pneumatic chip containment under ISO 14120 safety regulations.")]: '/content/audio/mcer/a2-u2-listening-lab.mp3',
    [normalizeKey("I recommend purchasing Tungsten Carbide inserts for the CNC milling cells. Although Carbide is twenty percent more expensive than High-Speed Steel, it is significantly more durable at high cutting speeds. It provides tighter dimensional tolerance and achieves fifteen percent higher throughput with fewer tool changes.")]: '/content/audio/mcer/a2-u2-crucible-model.mp3',

    // A2 Unit 3 - Scheduling, Agendas & Future Deadlines
    [normalizeKey("Good morning, Mr. Barnes. We are going to conduct our annual metrology audit next month.")]: '/content/audio/mcer/a2-u3-d1.mp3',
    [normalizeKey("Hello Patricia. What dates are best for your engineering team?")]: '/content/audio/mcer/a2-u3-d2.mp3',
    [normalizeKey("We are planning for Tuesday the 14th. Will your inspection crew be ready by then?")]: '/content/audio/mcer/a2-u3-d3.mp3',
    [normalizeKey("Yes, I will confirm the flight details and email the calibration certificates today.")]: '/content/audio/mcer/a2-u3-d4.mp3',
    [normalizeKey("Perfect. We will arrange cleanroom visitor badges before your arrival.")]: '/content/audio/mcer/a2-u3-d5.mp3',
    [normalizeKey("Thank you. I will see you on the 14th at 08:30 AM.")]: '/content/audio/mcer/a2-u3-d6.mp3',
    [normalizeKey("Patricia says: Good morning, Mr. Barnes. We are going to conduct our annual metrology audit next month. Mr. Barnes asks: Hello Patricia. What dates are best for your engineering team? Patricia replies: We are planning for Tuesday the 14th. Will your inspection crew be ready by then? Mr. Barnes answers: Yes, I will confirm the flight details and email the calibration certificates today. Patricia confirms: Perfect. We will arrange cleanroom visitor badges before your arrival. Mr. Barnes concludes: Thank you. I will see you on the 14th at 08:30 AM.")]: '/content/audio/mcer/a2-u3-dialogue-full.mp3',
    [normalizeKey("Good morning, Mr. Barnes. We are going to conduct our annual metrology audit next month. Hello Patricia. What dates are best for your engineering team? We are planning for Tuesday the 14th. Will your inspection crew be ready by then? Yes, I will confirm the flight details and email the calibration certificates today. Perfect. We will arrange cleanroom visitor badges before your arrival. Thank you. I will see you on the 14th at 08:30 AM.")]: '/content/audio/mcer/a2-u3-dialogue-full.mp3',
    [normalizeKey("Deadline")]: '/content/audio/mcer/a2-u3-vocab-deadline.mp3',
    [normalizeKey("Deadline. The hard deadline for the pre-production sample is next Thursday.")]: '/content/audio/mcer/a2-u3-vocab-deadline.mp3',
    [normalizeKey("Reschedule")]: '/content/audio/mcer/a2-u3-vocab-reschedule.mp3',
    [normalizeKey("Reschedule. Can we reschedule the laser calibration review to 10:00 AM?")]: '/content/audio/mcer/a2-u3-vocab-reschedule.mp3',
    [normalizeKey("Milestone")]: '/content/audio/mcer/a2-u3-vocab-milestone.mp3',
    [normalizeKey("Milestone. Reaching 50,000 continuous cycles is our primary project milestone.")]: '/content/audio/mcer/a2-u3-vocab-milestone.mp3',
    [normalizeKey("Delivery Date")]: '/content/audio/mcer/a2-u3-vocab-deliverydate.mp3',
    [normalizeKey("Delivery Date. The steel vendor confirmed the raw billet delivery date for Monday morning.")]: '/content/audio/mcer/a2-u3-vocab-deliverydate.mp3',
    [normalizeKey("Follow Up")]: '/content/audio/mcer/a2-u3-vocab-followup.mp3',
    [normalizeKey("Follow Up. I will follow up with the plant director after the ISO audit.")]: '/content/audio/mcer/a2-u3-vocab-followup.mp3',
    [normalizeKey("Shutdown")]: '/content/audio/mcer/a2-u3-vocab-shutdown.mp3',
    [normalizeKey("Shutdown. Annual electrical substation shutdown takes place in December.")]: '/content/audio/mcer/a2-u3-vocab-shutdown.mp3',
    [normalizeKey("Notice: Next Saturday, November 3rd, the main electrical substation will be shut down from 06:00 to 14:00 for transformer dielectric oil analysis. Backup diesel generators will supply emergency lighting and critical server racks only. All production equipment must be fully de-energized by Friday afternoon at 17:00.")]: '/content/audio/mcer/a2-u3-listening-lab.mp3',
    [normalizeKey("Good morning leads. We are going to conduct scheduled preventive maintenance on electrical substation B next Friday from 02:00 to 06:00 AM. Production Line 1 will shut down during this four-hour window. Backup diesel generators will supply power to cleanroom Bay 3, and normal operations will resume promptly at 06:30 AM.")]: '/content/audio/mcer/a2-u3-crucible-model.mp3',

    // A2 Unit 4 - Troubleshooting & Describing Problems
    [normalizeKey("Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very sluggishly.")]: '/content/audio/mcer/a2-u4-d1.mp3',
    [normalizeKey("Sure. Let me check the inline pressure regulator. It shows 40 PSI, but it should be 85 PSI.")]: '/content/audio/mcer/a2-u4-d2.mp3',
    [normalizeKey("Do you hear that hissing sound behind the manifold block?")]: '/content/audio/mcer/a2-u4-d3.mp3',
    [normalizeKey("Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring.")]: '/content/audio/mcer/a2-u4-d4.mp3',
    [normalizeKey("Understood. I will hit the pneumatic isolation valve right now.")]: '/content/audio/mcer/a2-u4-d5.mp3',
    [normalizeKey("Thanks. Always bleed the residual line pressure before disconnecting the hose.")]: '/content/audio/mcer/a2-u4-d6.mp3',
    [normalizeKey("Oscar asks: Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very sluggishly. Sam responds: Sure. Let me check the inline pressure regulator. It shows 40 PSI, but it should be 85 PSI. Oscar asks: Do you hear that hissing sound behind the manifold block? Sam answers: Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring. Oscar confirms: Understood. I will hit the pneumatic isolation valve right now. Sam concludes: Thanks. Always bleed the residual line pressure before disconnecting the hose.")]: '/content/audio/mcer/a2-u4-dialogue-full.mp3',
    [normalizeKey("Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very sluggishly. Sure. Let me check the inline pressure regulator. It shows 40 PSI, but it should be 85 PSI. Do you hear that hissing sound behind the manifold block? Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring. Understood. I will hit the pneumatic isolation valve right now. Thanks. Always bleed the residual line pressure before disconnecting the hose.")]: '/content/audio/mcer/a2-u4-dialogue-full.mp3',
    [normalizeKey("Leak")]: '/content/audio/mcer/a2-u4-vocab-leak.mp3',
    [normalizeKey("Leak. There is a hydraulic fluid leak under the main clamp cylinder.")]: '/content/audio/mcer/a2-u4-vocab-leak.mp3',
    [normalizeKey("Vibration")]: '/content/audio/mcer/a2-u4-vocab-vibration.mp3',
    [normalizeKey("Vibration. The blower motor has an abnormal vibration at high speeds.")]: '/content/audio/mcer/a2-u4-vocab-vibration.mp3',
    [normalizeKey("Overheating")]: '/content/audio/mcer/a2-u4-vocab-overheating.mp3',
    [normalizeKey("Overheating. The servo controller is overheating due to blocked air ventilation.")]: '/content/audio/mcer/a2-u4-vocab-overheating.mp3',
    [normalizeKey("Tighten")]: '/content/audio/mcer/a2-u4-vocab-tighten.mp3',
    [normalizeKey("Tighten. Please tighten the four hex bolts to 35 Newton-meters.")]: '/content/audio/mcer/a2-u4-vocab-tighten.mp3',
    [normalizeKey("Reset")]: '/content/audio/mcer/a2-u4-vocab-reset.mp3',
    [normalizeKey("Reset. Press and hold the blue button for three seconds to reset the PLC.")]: '/content/audio/mcer/a2-u4-vocab-reset.mp3',
    [normalizeKey("Air Pressure Drop")]: '/content/audio/mcer/a2-u4-vocab-airpressuredrop.mp3',
    [normalizeKey("Air Pressure Drop. An air pressure drop caused the pneumatic gripper to release.")]: '/content/audio/mcer/a2-u4-vocab-airpressuredrop.mp3',
    [normalizeKey("Alarm E-12 indicates pneumatic actuator timeout. Step 1: Inspect the main air supply gauge. If pressure is below 6.0 bar, verify that the facility main ball valve is open. Step 2: Check cylinder reed sensors for magnetic alignment. If the green LED does not illuminate at stroke end, adjust sensor position. Step 3: Check for audible hose leaks. Step 4: If issue persists, notify shift supervisor.")]: '/content/audio/mcer/a2-u4-listening-lab.mp3',
    [normalizeKey("First, you must inspect the digital torque display and verify the calibration sticker is valid. Second, you have to set the target torque to exactly 45 Newton-meters. Next, you should tighten each bolt in a star sequence until the audible beep sounds. Finally, you must log the verified values on the digital quality tablet.")]: '/content/audio/mcer/a2-u4-crucible-model.mp3',

    // === Unit B1-U1: Explaining Workflows & Standard Operating Procedures ===
    [normalizeKey("Brian, could you walk me through the inspection sequence for this stamped bracket?")]: '/content/audio/mcer/b1-u1-d1.mp3',
    [normalizeKey("Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge.")]: '/content/audio/mcer/b1-u1-d2.mp3',
    [normalizeKey("What occurs if a hole diameter is out of specification?")]: '/content/audio/mcer/b1-u1-d3.mp3',
    [normalizeKey("If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES.")]: '/content/audio/mcer/b1-u1-d4.mp3',
    [normalizeKey("And once the lot passes all three dimensional checks?")]: '/content/audio/mcer/b1-u1-d5.mp3',
    [normalizeKey("Subsequently, the lot traveler is stamped and the parts are routed to the powder-coating line.")]: '/content/audio/mcer/b1-u1-d6.mp3',
    [normalizeKey("Brian, could you walk me through the inspection sequence for this stamped bracket? Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge. What occurs if a hole diameter is out of specification? If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES. And once the lot passes all three dimensional checks? Subsequently, the lot traveler is stamped and the parts are routed to the powder-coating line.")]: '/content/audio/mcer/b1-u1-dialogue-full.mp3',
    [normalizeKey("Andrea says: Brian, could you walk me through the inspection sequence for this stamped bracket?. Brian says: Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge.. Andrea says: What occurs if a hole diameter is out of specification?. Brian says: If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES.. Andrea says: And once the lot passes all three dimensional checks?. Brian says: Subsequently, the lot traveler is stamped and the parts are routed to the powder-coating line.")]: '/content/audio/mcer/b1-u1-dialogue-full.mp3',
    [normalizeKey("Standard Operating Procedure (SOP)")]: '/content/audio/mcer/b1-u1-vocab-standardoperatingproceduresop.mp3',
    [normalizeKey("Standard Operating Procedure (SOP). All operators must follow the approved SOP to ensure repeatable quality.")]: '/content/audio/mcer/b1-u1-vocab-standardoperatingproceduresop.mp3',
    [normalizeKey("Sequential")]: '/content/audio/mcer/b1-u1-vocab-sequential.mp3',
    [normalizeKey("Sequential. The test protocol requires strict sequential execution of five steps.")]: '/content/audio/mcer/b1-u1-vocab-sequential.mp3',
    [normalizeKey("Discrepancy")]: '/content/audio/mcer/b1-u1-vocab-discrepancy.mp3',
    [normalizeKey("Discrepancy. A dimensional discrepancy was detected between CAD and physical part.")]: '/content/audio/mcer/b1-u1-vocab-discrepancy.mp3',
    [normalizeKey("Calibrated")]: '/content/audio/mcer/b1-u1-vocab-calibrated.mp3',
    [normalizeKey("Calibrated. The micrometer is calibrated every six months according to ISO 17025.")]: '/content/audio/mcer/b1-u1-vocab-calibrated.mp3',
    [normalizeKey("Root Cause")]: '/content/audio/mcer/b1-u1-vocab-rootcause.mp3',
    [normalizeKey("Root Cause. The engineering team investigated the root cause of the weld fracture.")]: '/content/audio/mcer/b1-u1-vocab-rootcause.mp3',
    [normalizeKey("Quarantine")]: '/content/audio/mcer/b1-u1-vocab-quarantine.mp3',
    [normalizeKey("Quarantine. Non-conforming lots are segregated in the red quarantine cage.")]: '/content/audio/mcer/b1-u1-vocab-quarantine.mp3',
    [normalizeKey("Automation")]: '/content/audio/mcer/b1-u1-pron-automation.mp3',
    [normalizeKey("Programmable")]: '/content/audio/mcer/b1-u1-pron-programmable.mp3',
    [normalizeKey("Proximity")]: '/content/audio/mcer/b1-u1-pron-proximity.mp3',
    [normalizeKey("Welcome to Line 1 SMT workflow overview. First, solder paste is automatically applied to bare printed circuit boards via a high-precision stencil printer. Next, passive components are placed by dual-head pick-and-place robots at fifty thousand components per hour. Finally, assemblies are conveyed through a ten-zone convection reflow oven where solder joints are formed under a nitrogen atmosphere.")]: '/content/audio/mcer/b1-u1-listening-lab.mp3',
    [normalizeKey("Purpose: To verify surface mount component alignment. Procedure: Once PCBs enter the inspection conveyor, dual 4K cameras capture top-side fiducial markers. Image processing algorithms compare component placement against Gerber design files. If any capacitor or IC exceeds 0.05mm tilt, the PCB is automatically routed to the manual rework station for microscopic audit.")]: '/content/audio/mcer/b1-u1-reading-passage.mp3',
    [normalizeKey("During automated packaging, optical sensor S-2 on conveyor three intermittently drops its 24-volt DC signal. If the translucent blister pack reflects ambient LED light, the sensor beam deflects and the PLC ladder logic fails to trigger the pneumatic pusher. We adjusted the optical gain potentiometer and shielded the sensor bracket, which restored full operational cycle throughput.")]: '/content/audio/mcer/b1-u1-crucible-model.mp3',
    // === Unit B1-U2: Professional Email Correspondence & Status Reports ===
    [normalizeKey("Daniel, have you drafted the status update email to the Detroit client?")]: '/content/audio/mcer/b1-u2-d1.mp3',
    [normalizeKey("Yes, Jessica. I have outlined the three completed milestones and attached the FEA stress simulation.")]: '/content/audio/mcer/b1-u2-d2.mp3',
    [normalizeKey("Did you mention that we need their sign-off on the revised mounting bracket by Friday?")]: '/content/audio/mcer/b1-u2-d3.mp3',
    [normalizeKey("Yes, I wrote: \"Could you please confirm your formal approval of drawing Rev-C by Friday at 16:00 EST?\"")]: '/content/audio/mcer/b1-u2-d4.mp3',
    [normalizeKey("Excellent wording. That sets a clear timeline without sounding confrontational.")]: '/content/audio/mcer/b1-u2-d5.mp3',
    [normalizeKey("Daniel, have you drafted the status update email to the Detroit client? Yes, Jessica. I have outlined the three completed milestones and attached the FEA stress simulation. Did you mention that we need their sign-off on the revised mounting bracket by Friday? Yes, I wrote: \"Could you please confirm your formal approval of drawing Rev-C by Friday at 16:00 EST?\" Excellent wording. That sets a clear timeline without sounding confrontational.")]: '/content/audio/mcer/b1-u2-dialogue-full.mp3',
    [normalizeKey("Jessica says: Daniel, have you drafted the status update email to the Detroit client?. Daniel says: Yes, Jessica. I have outlined the three completed milestones and attached the FEA stress simulation.. Jessica says: Did you mention that we need their sign-off on the revised mounting bracket by Friday?. Daniel says: Yes, I wrote: \"Could you please confirm your formal approval of drawing Rev-C by Friday at 16:00 EST?\". Jessica says: Excellent wording. That sets a clear timeline without sounding confrontational.")]: '/content/audio/mcer/b1-u2-dialogue-full.mp3',
    [normalizeKey("Deliverable")]: '/content/audio/mcer/b1-u2-vocab-deliverable.mp3',
    [normalizeKey("Deliverable. The preliminary CAD drawing is our primary deliverable this week.")]: '/content/audio/mcer/b1-u2-vocab-deliverable.mp3',
    [normalizeKey("Action Item")]: '/content/audio/mcer/b1-u2-vocab-actionitem.mp3',
    [normalizeKey("Action Item. Please review the action items listed at the end of the meeting minutes.")]: '/content/audio/mcer/b1-u2-vocab-actionitem.mp3',
    [normalizeKey("Inquiry")]: '/content/audio/mcer/b1-u2-vocab-inquiry.mp3',
    [normalizeKey("Inquiry. We received an inquiry from the customer regarding thermal tolerances.")]: '/content/audio/mcer/b1-u2-vocab-inquiry.mp3',
    [normalizeKey("Attached")]: '/content/audio/mcer/b1-u2-vocab-attached.mp3',
    [normalizeKey("Attached. Please find attached the signed inspection sign-off sheet.")]: '/content/audio/mcer/b1-u2-vocab-attached.mp3',
    [normalizeKey("Follow-Up")]: '/content/audio/mcer/b1-u2-vocab-followup.mp3',
    [normalizeKey("Follow-Up. I am writing to follow up on our phone conversation from Tuesday.")]: '/content/audio/mcer/b1-u2-vocab-followup.mp3',
    [normalizeKey("Sign-Off")]: '/content/audio/mcer/b1-u2-vocab-signoff.mp3',
    [normalizeKey("Sign-Off. We obtained executive sign-off from the client director.")]: '/content/audio/mcer/b1-u2-vocab-signoff.mp3',
    [normalizeKey("Deviation")]: '/content/audio/mcer/b1-u2-pron-deviation.mp3',
    [normalizeKey("Capability")]: '/content/audio/mcer/b1-u2-pron-capability.mp3',
    [normalizeKey("Statistical")]: '/content/audio/mcer/b1-u2-pron-statistical.mp3',
    [normalizeKey("Hello quality team. Following up on my email regarding the plastic injection batch 402. We noticed minor sink marks near the structural rib bosses. Could you please provide an official 8D containment report by tomorrow midday? We also request that you place remaining warehouse inventory on quarantine hold until corrective tooling inserts arrive.")]: '/content/audio/mcer/b1-u2-listening-lab.mp3',
    [normalizeKey("Subject: Weekly Project Status Update: Assembly Line #5 Ramp-Up. Dear Operations Committee: We have successfully completed Milestone 2 on schedule. Cycle time has been reduced from 45 seconds to 38.2 seconds, meeting our Phase-1 KPI target. Action Items: (1) Vendor will deliver replacement servo drive by Wednesday. (2) Quality team will conduct Gage R&R validation on Friday. Please find attached the full telemetry dataset.")]: '/content/audio/mcer/b1-u2-reading-passage.mp3',
    [normalizeKey("Our statistical process control chart shows that the machining diameter has drifted toward the upper specification limit, causing our Cpk capability index to drop from 1.67 to 1.18. This dimensional variation was caused by thermal expansion of the lathe spindle during high-ambient afternoon shifts. We have installed a closed-loop coolant refrigeration jacket to stabilize thermal equilibrium and maintain 1.67 Cpk.")]: '/content/audio/mcer/b1-u2-crucible-model.mp3',
    // === Unit B1-U3: Technical Phone Calls, Standups & Clarifications ===
    [normalizeKey("Good morning, Gabriela. Could you run through yesterday’s yield numbers on the EV battery trays?")]: '/content/audio/mcer/b1-u3-d1.mp3',
    [normalizeKey("Good morning, Kevin. Yesterday we reached a first-pass yield of 97.4%, which is an increase of 2.1%.")]: '/content/audio/mcer/b1-u3-d2.mp3',
    [normalizeKey("That sounds promising. Did you encounter any porosity issues on the friction stir welds?")]: '/content/audio/mcer/b1-u3-d3.mp3',
    [normalizeKey("I am sorry, the connection cut out for a second. Could you repeat that last question, please?")]: '/content/audio/mcer/b1-u3-d4.mp3',
    [normalizeKey("Sure! I asked if you observed any porosity defects on the weld seams.")]: '/content/audio/mcer/b1-u3-d5.mp3',
    [normalizeKey("Understood. We observed zero porosity on ultrasonic testing. All fifty welds met ISO 25239 specs.")]: '/content/audio/mcer/b1-u3-d6.mp3',
    [normalizeKey("Good morning, Gabriela. Could you run through yesterday’s yield numbers on the EV battery trays? Good morning, Kevin. Yesterday we reached a first-pass yield of 97.4%, which is an increase of 2.1%. That sounds promising. Did you encounter any porosity issues on the friction stir welds? I am sorry, the connection cut out for a second. Could you repeat that last question, please? Sure! I asked if you observed any porosity defects on the weld seams. Understood. We observed zero porosity on ultrasonic testing. All fifty welds met ISO 25239 specs.")]: '/content/audio/mcer/b1-u3-dialogue-full.mp3',
    [normalizeKey("Kevin says: Good morning, Gabriela. Could you run through yesterday’s yield numbers on the EV battery trays?. Gabriela says: Good morning, Kevin. Yesterday we reached a first-pass yield of 97.4%, which is an increase of 2.1%.. Kevin says: That sounds promising. Did you encounter any porosity issues on the friction stir welds?. Gabriela says: I am sorry, the connection cut out for a second. Could you repeat that last question, please?. Kevin says: Sure! I asked if you observed any porosity defects on the weld seams.. Gabriela says: Understood. We observed zero porosity on ultrasonic testing. All fifty welds met ISO 25239 specs.")]: '/content/audio/mcer/b1-u3-dialogue-full.mp3',
    [normalizeKey("Clarify")]: '/content/audio/mcer/b1-u3-vocab-clarify.mp3',
    [normalizeKey("Clarify. Could you clarify whether the tolerance is plus or minus 0.02mm?")]: '/content/audio/mcer/b1-u3-vocab-clarify.mp3',
    [normalizeKey("Catch Up")]: '/content/audio/mcer/b1-u3-vocab-catchup.mp3',
    [normalizeKey("Catch Up. Let us catch up on the supplier audit action items after the call.")]: '/content/audio/mcer/b1-u3-vocab-catchup.mp3',
    [normalizeKey("Break Down")]: '/content/audio/mcer/b1-u3-vocab-breakdown.mp3',
    [normalizeKey("Break Down. Can you break down the failure rates by operating temperature?")]: '/content/audio/mcer/b1-u3-vocab-breakdown.mp3',
    [normalizeKey("Run Through")]: '/content/audio/mcer/b1-u3-vocab-runthrough.mp3',
    [normalizeKey("Run Through. Let me run through the four critical checklist items before we hang up.")]: '/content/audio/mcer/b1-u3-vocab-runthrough.mp3',
    [normalizeKey("Bottleneck")]: '/content/audio/mcer/b1-u3-vocab-bottleneck.mp3',
    [normalizeKey("Bottleneck. The manual deburring station is our primary throughput bottleneck.")]: '/content/audio/mcer/b1-u3-vocab-bottleneck.mp3',
    [normalizeKey("Standup")]: '/content/audio/mcer/b1-u3-vocab-standup.mp3',
    [normalizeKey("Standup. We hold a 15-minute virtual standup every morning at 08:00.")]: '/content/audio/mcer/b1-u3-vocab-standup.mp3',
    [normalizeKey("Hydraulic")]: '/content/audio/mcer/b1-u3-pron-hydraulic.mp3',
    [normalizeKey("Pneumatic")]: '/content/audio/mcer/b1-u3-pron-pneumatic.mp3',
    [normalizeKey("Oscilloscope")]: '/content/audio/mcer/b1-u3-pron-oscilloscope.mp3',
    [normalizeKey("Morning everyone. Let us start our 15-minute cross-border standup. Yesterday, the embedded software sprint completed the CAN bus communication stack. Today, we are validating telemetry packets over the wireless gateway. Our sole blocker is that we are waiting for updated pinout schematics from the hardware hardware team in Austin. Could someone clarify who owns that deliverable?")]: '/content/audio/mcer/b1-u3-listening-lab.mp3',
    [normalizeKey("International remote engineering calls require structured communication. (1) State your main point concisely: \"Yesterday I completed X, today I am working on Y, and my blocker is Z.\" (2) Never hesitate to seek clarification if an acoustic drop or technical acronym is unfamiliar. Use professional formulas such as \"Could you please rephrase that?\" (3) Conclude calls by confirming assigned ownership.")]: '/content/audio/mcer/b1-u3-reading-passage.mp3',
    [normalizeKey("We investigated the sudden pressure drop from 200 bar down to 85 bar on Stamping Press #4. If the pilot-operated relief valve sticks open, the primary cylinder cannot build required forming tonnage. We de-energized the hydraulic power unit, tagged out the motor, and disassembled manifold block B. We discovered a ruptured fluoroelastomer O-ring seal, which was replaced and tested successfully under 220 bar.")]: '/content/audio/mcer/b1-u3-crucible-model.mp3',
    // === Unit B1-U4: Constructive Disagreements, Solutions & 8D Actions ===
    [normalizeKey("I believe the micro-cracks on the stampings are caused by inadequate hydraulic oil lubrication.")]: '/content/audio/mcer/b1-u4-d1.mp3',
    [normalizeKey("I see your point, Richard; however, our lubricant viscosity logs show normal readings across all three shifts.")]: '/content/audio/mcer/b1-u4-d2.mp3',
    [normalizeKey("What else could explain the repeated shear tear-out on the corner radii?")]: '/content/audio/mcer/b1-u4-d3.mp3',
    [normalizeKey("If we inspect the carbide die under magnification, we will see that tool wear exceeded 0.08mm. The data suggests tool fatigue is the primary root cause.")]: '/content/audio/mcer/b1-u4-d4.mp3',
    [normalizeKey("That makes sense. If we swap out the die insert today, we can run a test batch of fifty parts.")]: '/content/audio/mcer/b1-u4-d5.mp3',
    [normalizeKey("Agreed. That will validate our D5 corrective action before we submit the 8D report.")]: '/content/audio/mcer/b1-u4-d6.mp3',
    [normalizeKey("I believe the micro-cracks on the stampings are caused by inadequate hydraulic oil lubrication. I see your point, Richard; however, our lubricant viscosity logs show normal readings across all three shifts. What else could explain the repeated shear tear-out on the corner radii? If we inspect the carbide die under magnification, we will see that tool wear exceeded 0.08mm. The data suggests tool fatigue is the primary root cause. That makes sense. If we swap out the die insert today, we can run a test batch of fifty parts. Agreed. That will validate our D5 corrective action before we submit the 8D report.")]: '/content/audio/mcer/b1-u4-dialogue-full.mp3',
    [normalizeKey("Richard says: I believe the micro-cracks on the stampings are caused by inadequate hydraulic oil lubrication.. Valeria says: I see your point, Richard; however, our lubricant viscosity logs show normal readings across all three shifts.. Richard says: What else could explain the repeated shear tear-out on the corner radii?. Valeria says: If we inspect the carbide die under magnification, we will see that tool wear exceeded 0.08mm. The data suggests tool fatigue is the primary root cause.. Richard says: That makes sense. If we swap out the die insert today, we can run a test batch of fifty parts.. Valeria says: Agreed. That will validate our D5 corrective action before we submit the 8D report.")]: '/content/audio/mcer/b1-u4-dialogue-full.mp3',
    [normalizeKey("Countermeasure")]: '/content/audio/mcer/b1-u4-vocab-countermeasure.mp3',
    [normalizeKey("Countermeasure. The permanent countermeasure is to install optical safety interlocks.")]: '/content/audio/mcer/b1-u4-vocab-countermeasure.mp3',
    [normalizeKey("Compromise")]: '/content/audio/mcer/b1-u4-vocab-compromise.mp3',
    [normalizeKey("Compromise. We reached an engineering compromise on the wall thickness.")]: '/content/audio/mcer/b1-u4-vocab-compromise.mp3',
    [normalizeKey("Containment")]: '/content/audio/mcer/b1-u4-vocab-containment.mp3',
    [normalizeKey("Containment. Immediate containment was implemented by 100% sorting of finished goods.")]: '/content/audio/mcer/b1-u4-vocab-containment.mp3',
    [normalizeKey("Ishikawa Diagram")]: '/content/audio/mcer/b1-u4-vocab-ishikawadiagram.mp3',
    [normalizeKey("Ishikawa Diagram. The team completed an Ishikawa diagram to map out contributing factors.")]: '/content/audio/mcer/b1-u4-vocab-ishikawadiagram.mp3',
    [normalizeKey("Corrective Action")]: '/content/audio/mcer/b1-u4-vocab-correctiveaction.mp3',
    [normalizeKey("Corrective Action. CAPA #402 requires re-tooling the injection nozzle.")]: '/content/audio/mcer/b1-u4-vocab-correctiveaction.mp3',
    [normalizeKey("Non-Conforming")]: '/content/audio/mcer/b1-u4-vocab-nonconforming.mp3',
    [normalizeKey("Non-Conforming. Twenty non-conforming shafts were segregated from the assembly bay.")]: '/content/audio/mcer/b1-u4-vocab-nonconforming.mp3',
    [normalizeKey("Logistics")]: '/content/audio/mcer/b1-u4-pron-logistics.mp3',
    [normalizeKey("Procurement")]: '/content/audio/mcer/b1-u4-pron-procurement.mp3',
    [normalizeKey("Inventory")]: '/content/audio/mcer/b1-u4-pron-inventory.mp3',
    [normalizeKey("I appreciate your proposal to tighten shaft tolerances to five microns, but if we adopt that specification, machining cycle times will increase by forty percent. Furthermore, tool wear will escalate significantly. It seems to me that we could achieve identical structural concentricity by improving our fixture clamping rigidity instead.")]: '/content/audio/mcer/b1-u4-listening-lab.mp3',
    [normalizeKey("The 8D (Eight Disciplines) problem-solving standard is required by global automotive and aerospace OEMs under IATF 16949. Discipline 3 requires immediate containment within 24 hours to protect the customer from defect escapes. Disciplines 4 and 5 demand rigorous root-cause identification using 5-Why analysis and verification of permanent corrective actions. Discipline 7 updates institutional FMEAs to prevent recurrence across sister plants.")]: '/content/audio/mcer/b1-u4-reading-passage.mp3',
    [normalizeKey("We are tracking shipment lot #489 containing 5,000 automotive microcontroller units currently held at Otay Mesa customs for tariff classification review. Our customs broker submitted revised manufacturer certificates of origin this morning. If customs releases the bonded trailer by 14:00, our dedicated carrier will deliver the crates directly to the Mexicali plant dock before the third shift begins, avoiding any assembly downtime.")]: '/content/audio/mcer/b1-u4-crucible-model.mp3',
    // === Unit B2-U1: Engineering Change Orders & Technical Specs ===
    [normalizeKey("Elena, we received Engineering Change Order ECO-884 from the automotive OEM in Detroit.")]: '/content/audio/mcer/b2-u1-d1.mp3',
    [normalizeKey("What is the scope of the revision, Marcus? Does it impact our active tooling?")]: '/content/audio/mcer/b2-u1-d2.mp3',
    [normalizeKey("The customer increased the heat-sink fin thickness by 1.2 millimeters to improve thermal dissipation during fast-charging.")]: '/content/audio/mcer/b2-u1-d3.mp3',
    [normalizeKey("Will our existing stamping progressive dies have to be re-machined?")]: '/content/audio/mcer/b2-u1-d4.mp3',
    [normalizeKey("Yes, the die cavity must be modified by EDM, which requires a three-day maintenance window. However, unit manufacturing cost remains unchanged.")]: '/content/audio/mcer/b2-u1-d5.mp3',
    [normalizeKey("Make sure that all work-in-progress inventory is quarantined before the new drawing revision takes effect on Monday.")]: '/content/audio/mcer/b2-u1-d6.mp3',
    [normalizeKey("Elena, we received Engineering Change Order ECO-884 from the automotive OEM in Detroit. What is the scope of the revision, Marcus? Does it impact our active tooling? The customer increased the heat-sink fin thickness by 1.2 millimeters to improve thermal dissipation during fast-charging. Will our existing stamping progressive dies have to be re-machined? Yes, the die cavity must be modified by EDM, which requires a three-day maintenance window. However, unit manufacturing cost remains unchanged. Make sure that all work-in-progress inventory is quarantined before the new drawing revision takes effect on Monday.")]: '/content/audio/mcer/b2-u1-dialogue-full.mp3',
    [normalizeKey("Marcus says: Elena, we received Engineering Change Order ECO-884 from the automotive OEM in Detroit.. Elena says: What is the scope of the revision, Marcus? Does it impact our active tooling?. Marcus says: The customer increased the heat-sink fin thickness by 1.2 millimeters to improve thermal dissipation during fast-charging.. Elena says: Will our existing stamping progressive dies have to be re-machined?. Marcus says: Yes, the die cavity must be modified by EDM, which requires a three-day maintenance window. However, unit manufacturing cost remains unchanged.. Elena says: Make sure that all work-in-progress inventory is quarantined before the new drawing revision takes effect on Monday.")]: '/content/audio/mcer/b2-u1-dialogue-full.mp3',
    [normalizeKey("Engineering Change Order (ECO)")]: '/content/audio/mcer/b2-u1-vocab-engineeringchangeordereco.mp3',
    [normalizeKey("Engineering Change Order (ECO). ECO #901 modifies the mounting flange thickness from 3mm to 4.5mm.")]: '/content/audio/mcer/b2-u1-vocab-engineeringchangeordereco.mp3',
    [normalizeKey("Bill of Materials (BOM)")]: '/content/audio/mcer/b2-u1-vocab-billofmaterialsbom.mp3',
    [normalizeKey("Bill of Materials (BOM). The multi-level BOM was updated to reflect the new silicone O-rings.")]: '/content/audio/mcer/b2-u1-vocab-billofmaterialsbom.mp3',
    [normalizeKey("Deviation Permit")]: '/content/audio/mcer/b2-u1-vocab-deviationpermit.mp3',
    [normalizeKey("Deviation Permit. The OEM granted a deviation permit for batch #45 to prevent production halt.")]: '/content/audio/mcer/b2-u1-vocab-deviationpermit.mp3',
    [normalizeKey("Traceability")]: '/content/audio/mcer/b2-u1-vocab-traceability.mp3',
    [normalizeKey("Traceability. Full QR laser-etched traceability is mandatory under ISO 9001:2015.")]: '/content/audio/mcer/b2-u1-vocab-traceability.mp3',
    [normalizeKey("Scrap Rate")]: '/content/audio/mcer/b2-u1-vocab-scraprate.mp3',
    [normalizeKey("Scrap Rate. The automated deburring cell reduced the overall scrap rate to 0.4%.")]: '/content/audio/mcer/b2-u1-vocab-scraprate.mp3',
    [normalizeKey("Obsolescence")]: '/content/audio/mcer/b2-u1-vocab-obsolescence.mp3',
    [normalizeKey("Obsolescence. We issued an ECO due to electronic microcontroller obsolescence.")]: '/content/audio/mcer/b2-u1-vocab-obsolescence.mp3',
    [normalizeKey("Hypothesis")]: '/content/audio/mcer/b2-u1-pron-hypothesis.mp3',
    [normalizeKey("Systematic")]: '/content/audio/mcer/b2-u1-pron-systematic.mp3',
    [normalizeKey("Containment")]: '/content/audio/mcer/b2-u1-pron-containment.mp3',
    [normalizeKey("Members of the board: ECO-2026-88 requests a transition from FR-4 substrate to high-frequency Rogers laminate for our 5G transceiver modules. Had we conducted thermal dissipation simulations earlier in Q2, the dielectric breakdown issue would have been mitigated without halting pre-production. I move that we approve the ECO subject to supplier PPAP re-certification by October thirty-first.")]: '/content/audio/mcer/b2-u1-listening-lab.mp3',
    [normalizeKey("Engineering Change Management is a critical discipline in US-Mexico nearshoring contracts. When an OEM issues an ECO, cross-border engineering teams must perform a 4-dimensional impact assessment: (1) Tooling re-machining lead time, (2) Scrap risk of obsolete work-in-progress (WIP) stock, (3) BOM revision in ERP/MES software, and (4) PPAP (Production Part Approval Process) level 3 re-submission. Failure to execute rigorous change control can result in multi-million-dollar warranty claims.")]: '/content/audio/mcer/b2-u1-reading-passage.mp3',
    [normalizeKey("Our multidisciplinary 8D team performed a five-why root cause investigation on the cracked titanium brackets. Scanning electron microscopy confirmed that the fissures originated from excessive quenching rates during thermal heat treatment, rather than fatigue stress. As permanent corrective action D5, we reprogrammed the induction furnace ramp-down rate and installed dual-wavelength pyrometers to ensure uniform cooling, eliminating recurrence.")]: '/content/audio/mcer/b2-u1-crucible-model.mp3',
    // === Unit B2-U2: Cross-Border Negotiations & Executive Facilitation ===
    [normalizeKey("Good morning, everyone. Let us begin our Quarterly Business Review on time. Today our primary objective is to finalize the ramp-up schedule for the Mexicali expansion.")]: '/content/audio/mcer/b2-u2-d1.mp3',
    [normalizeKey("Thanks, Javier. From our side in California, the delivery timelines for the stamping presses appear somewhat tight.")]: '/content/audio/mcer/b2-u2-d2.mp3',
    [normalizeKey("I appreciate your concern, Sarah. What we might want to consider is phasing the qualification into two two-week sprints. That would allow early batch sampling while secondary tooling is being installed.")]: '/content/audio/mcer/b2-u2-d3.mp3',
    [normalizeKey("That is a reasonable compromise. It provides the risk mitigation our OEM board requires.")]: '/content/audio/mcer/b2-u2-d4.mp3',
    [normalizeKey("Excellent. Let us circle back to the logistics milestones right after reviewing the capital expenditure slides.")]: '/content/audio/mcer/b2-u2-d5.mp3',
    [normalizeKey("Good morning, everyone. Let us begin our Quarterly Business Review on time. Today our primary objective is to finalize the ramp-up schedule for the Mexicali expansion. Thanks, Javier. From our side in California, the delivery timelines for the stamping presses appear somewhat tight. I appreciate your concern, Sarah. What we might want to consider is phasing the qualification into two two-week sprints. That would allow early batch sampling while secondary tooling is being installed. That is a reasonable compromise. It provides the risk mitigation our OEM board requires. Excellent. Let us circle back to the logistics milestones right after reviewing the capital expenditure slides.")]: '/content/audio/mcer/b2-u2-dialogue-full.mp3',
    [normalizeKey("Javier says: Good morning, everyone. Let us begin our Quarterly Business Review on time. Today our primary objective is to finalize the ramp-up schedule for the Mexicali expansion.. Sarah says: Thanks, Javier. From our side in California, the delivery timelines for the stamping presses appear somewhat tight.. Javier says: I appreciate your concern, Sarah. What we might want to consider is phasing the qualification into two two-week sprints. That would allow early batch sampling while secondary tooling is being installed.. Sarah says: That is a reasonable compromise. It provides the risk mitigation our OEM board requires.. Javier says: Excellent. Let us circle back to the logistics milestones right after reviewing the capital expenditure slides.")]: '/content/audio/mcer/b2-u2-dialogue-full.mp3',
    [normalizeKey("Circle Back")]: '/content/audio/mcer/b2-u2-vocab-circleback.mp3',
    [normalizeKey("Circle Back. Let us circle back to the tooling budget once we review the yield data.")]: '/content/audio/mcer/b2-u2-vocab-circleback.mp3',
    [normalizeKey("Stakeholder")]: '/content/audio/mcer/b2-u2-vocab-stakeholder.mp3',
    [normalizeKey("Stakeholder. All key stakeholders must sign off on the facility validation protocol.")]: '/content/audio/mcer/b2-u2-vocab-stakeholder.mp3',
    [normalizeKey("Touch Base")]: '/content/audio/mcer/b2-u2-vocab-touchbase.mp3',
    [normalizeKey("Touch Base. I will touch base with your quality director tomorrow morning.")]: '/content/audio/mcer/b2-u2-vocab-touchbase.mp3',
    [normalizeKey("Leverage")]: '/content/audio/mcer/b2-u2-vocab-leverage.mp3',
    [normalizeKey("Leverage. We can leverage our automated inspection line to reduce labor costs.")]: '/content/audio/mcer/b2-u2-vocab-leverage.mp3',
    [normalizeKey("Table a Topic")]: '/content/audio/mcer/b2-u2-vocab-tableatopic.mp3',
    [normalizeKey("Table a Topic. Given our tight agenda, let us table the packaging discussion until Friday.")]: '/content/audio/mcer/b2-u2-vocab-tableatopic.mp3',
    [normalizeKey("Wrap Up")]: '/content/audio/mcer/b2-u2-vocab-wrapup.mp3',
    [normalizeKey("Wrap Up. Before we wrap up, let us confirm the three critical action items.")]: '/content/audio/mcer/b2-u2-vocab-wrapup.mp3',
    [normalizeKey("Photolithography")]: '/content/audio/mcer/b2-u2-pron-photolithography.mp3',
    [normalizeKey("Contamination")]: '/content/audio/mcer/b2-u2-pron-contamination.mp3',
    [normalizeKey("Substrate")]: '/content/audio/mcer/b2-u2-pron-substrate.mp3',
    [normalizeKey("Thank you for joining this executive commercial session. While we appreciate your proposal for an eight percent price rebate at three hundred thousand units, our nearshoring volume projections indicate five hundred thousand units for Q1. On condition that you commit to guaranteed four-week lead times and localized buffer warehousing in Tijuana, we are prepared to sign a two-year exclusive supply agreement.")]: '/content/audio/mcer/b2-u2-listening-lab.mp3',
    [normalizeKey("In high-stakes corporate nearshoring environments, linguistic proficiency must be paired with executive presence. Effective meeting leaders employ hedging strategies to offer critical perspectives without provoking defensive reactions: \"It would appear that the data suggests an alternate hypothesis\" replaces blunt confrontation. Facilitators keep multi-disciplinary discussions focused by actively managing conversational turns, parking tangential topics, and driving decisive accountability.")]: '/content/audio/mcer/b2-u2-reading-passage.mp3',
    [normalizeKey("Airborne particle sensors in EUV Photolithography Bay 2 registered an excursion exceeding ISO Class 1 thresholds at 09:40 AM. We immediately suspended wafer stepper processing and isolated the automated track. Differential pressure dropped two Pascals due to a clogged pre-filter on HEPA fan unit 4. The HEPA filter was replaced under continuous laminar purge, and airborne particle counts have returned to baseline zero.")]: '/content/audio/mcer/b2-u2-crucible-model.mp3',
    // === Unit B2-U3: Formal Escalations, Root Cause & Executive Memos ===
    [normalizeKey("Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM.")]: '/content/audio/mcer/b2-u3-d1.mp3',
    [normalizeKey("What did the Ishikawa fishbone diagram confirm as the underlying root cause?")]: '/content/audio/mcer/b2-u3-d2.mp3',
    [normalizeKey("It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove.")]: '/content/audio/mcer/b2-u3-d3.mp3',
    [normalizeKey("And what permanent corrective action (D5) have we implemented?")]: '/content/audio/mcer/b2-u3-d4.mp3',
    [normalizeKey("We integrated an optical laser tool-wear sensor that halts the machine automatically after 500 cycles.")]: '/content/audio/mcer/b2-u3-d5.mp3',
    [normalizeKey("Excellent work. That provides an airtight, data-driven response for our upcoming customer quality audit.")]: '/content/audio/mcer/b2-u3-d6.mp3',
    [normalizeKey("Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM. What did the Ishikawa fishbone diagram confirm as the underlying root cause? It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove. And what permanent corrective action (D5) have we implemented? We integrated an optical laser tool-wear sensor that halts the machine automatically after 500 cycles. Excellent work. That provides an airtight, data-driven response for our upcoming customer quality audit.")]: '/content/audio/mcer/b2-u3-dialogue-full.mp3',
    [normalizeKey("Hector says: Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM.. Dr. Vance says: What did the Ishikawa fishbone diagram confirm as the underlying root cause?. Hector says: It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove.. Dr. Vance says: And what permanent corrective action (D5) have we implemented?. Hector says: We integrated an optical laser tool-wear sensor that halts the machine automatically after 500 cycles.. Dr. Vance says: Excellent work. That provides an airtight, data-driven response for our upcoming customer quality audit.")]: '/content/audio/mcer/b2-u3-dialogue-full.mp3',
    [normalizeKey("Non-Conformance Report (NCR)")]: '/content/audio/mcer/b2-u3-vocab-nonconformancereportncr.mp3',
    [normalizeKey("Non-Conformance Report (NCR). Quality issued an NCR due to surface roughness deviations on batch #20.")]: '/content/audio/mcer/b2-u3-vocab-nonconformancereportncr.mp3',
    [normalizeKey("Containment Action")]: '/content/audio/mcer/b2-u3-vocab-containmentaction.mp3',
    [normalizeKey("Containment Action. Our containment action involved quarantining 1,200 suspect housings.")]: '/content/audio/mcer/b2-u3-vocab-containmentaction.mp3',
    [normalizeKey("Root Cause Analysis")]: '/content/audio/mcer/b2-u3-vocab-rootcauseanalysis.mp3',
    [normalizeKey("Root Cause Analysis. The 5-Why root cause analysis confirmed a cracked nozzle O-ring.")]: '/content/audio/mcer/b2-u3-vocab-rootcauseanalysis.mp3',
    [normalizeKey("Mitigation Plan")]: '/content/audio/mcer/b2-u3-vocab-mitigationplan.mp3',
    [normalizeKey("Mitigation Plan. The engineering team presented a robust mitigation plan to prevent recurrence.")]: '/content/audio/mcer/b2-u3-vocab-mitigationplan.mp3',
    [normalizeKey("Executive Sponsorship")]: '/content/audio/mcer/b2-u3-vocab-executivesponsorship.mp3',
    [normalizeKey("Executive Sponsorship. We have executive sponsorship from the VP of Quality to execute the fix.")]: '/content/audio/mcer/b2-u3-vocab-executivesponsorship.mp3',
    [normalizeKey("CAPA")]: '/content/audio/mcer/b2-u3-vocab-capa.mp3',
    [normalizeKey("CAPA. CAPA #801 closed successfully following a 30-day zero-defect trial.")]: '/content/audio/mcer/b2-u3-vocab-capa.mp3',
    [normalizeKey("Compliance")]: '/content/audio/mcer/b2-u3-pron-compliance.mp3',
    [normalizeKey("Specification")]: '/content/audio/mcer/b2-u3-pron-specification.mp3',
    [normalizeKey("Traceability")]: '/content/audio/mcer/b2-u3-pron-traceability.mp3',
    [normalizeKey("Good afternoon. This briefing addresses our customer escalation regarding field inverter failures. Under no circumstances should non-conforming batch units be re-certified without an exhaustive metallurgical failure analysis. Preliminary scans indicate inter-granular stress corrosion cracking on the copper busbars. I am establishing an executive war room effective immediately to oversee containment across all North American service centers.")]: '/content/audio/mcer/b2-u3-listening-lab.mp3',
    [normalizeKey("MEMORANDUM. TO: Plant Operations Executive Committee. FROM: Quality Task Force. SUBJECT: Containment Protocol for Lot #849 Weld Discrepancy. Summary: During random destructive pull testing on Oct 19, five brackets failed below the 5.0 kN tensile specification. Immediate containment: All 1,500 finished assemblies in transit have been placed on electronic hold in warehouse quarantine. Root cause investigation is active. Zero defect escapes to customer confirmed.")]: '/content/audio/mcer/b2-u3-reading-passage.mp3',
    [normalizeKey("Engineering Change Order ECO-9042 modifies the silicone conformal coating thickness specification from 50 to 75 microns. This revision complies with updated IPC-CC-830 humidity resistance guidelines. Full traceability records, revised Gerber CAD drawings, and customer engineering sign-off approvals are archived in our PLM system under revision Charlie, ensuring seamless production line cutover.")]: '/content/audio/mcer/b2-u3-crucible-model.mp3',
    // === Unit B2-U4: American Business Idioms & Cultural Radar ===
    [normalizeKey("Lorena, thanks for jumping on the call. Do you have a ballpark figure for the cleanroom expansion in Mexicali?")]: '/content/audio/mcer/b2-u4-d1.mp3',
    [normalizeKey("Yes, Scott. We estimate around $350,000 to $400,000 USD, depending on the HEPA filtration tier we select.")]: '/content/audio/mcer/b2-u4-d2.mp3',
    [normalizeKey("That fits comfortably within our capital expenditure envelope. What is our low-hanging fruit to start immediate preparation?")]: '/content/audio/mcer/b2-u4-d3.mp3',
    [normalizeKey("We can clear the existing warehouse partition this week without disrupting current assembly lines.")]: '/content/audio/mcer/b2-u4-d4.mp3',
    [normalizeKey("Great. Let us make sure nobody drops the ball on the environmental permits with the city.")]: '/content/audio/mcer/b2-u4-d5.mp3',
    [normalizeKey("Understood. I will touch base with our environmental health and safety lead this afternoon.")]: '/content/audio/mcer/b2-u4-d6.mp3',
    [normalizeKey("Lorena, thanks for jumping on the call. Do you have a ballpark figure for the cleanroom expansion in Mexicali? Yes, Scott. We estimate around $350,000 to $400,000 USD, depending on the HEPA filtration tier we select. That fits comfortably within our capital expenditure envelope. What is our low-hanging fruit to start immediate preparation? We can clear the existing warehouse partition this week without disrupting current assembly lines. Great. Let us make sure nobody drops the ball on the environmental permits with the city. Understood. I will touch base with our environmental health and safety lead this afternoon.")]: '/content/audio/mcer/b2-u4-dialogue-full.mp3',
    [normalizeKey("Scott says: Lorena, thanks for jumping on the call. Do you have a ballpark figure for the cleanroom expansion in Mexicali?. Lorena says: Yes, Scott. We estimate around $350,000 to $400,000 USD, depending on the HEPA filtration tier we select.. Scott says: That fits comfortably within our capital expenditure envelope. What is our low-hanging fruit to start immediate preparation?. Lorena says: We can clear the existing warehouse partition this week without disrupting current assembly lines.. Scott says: Great. Let us make sure nobody drops the ball on the environmental permits with the city.. Lorena says: Understood. I will touch base with our environmental health and safety lead this afternoon.")]: '/content/audio/mcer/b2-u4-dialogue-full.mp3',
    [normalizeKey("Move the Needle")]: '/content/audio/mcer/b2-u4-vocab-movetheneedle.mp3',
    [normalizeKey("Move the Needle. Incremental training is good, but automation is what will truly move the needle on productivity.")]: '/content/audio/mcer/b2-u4-vocab-movetheneedle.mp3',
    [normalizeKey("Drop the Ball")]: '/content/audio/mcer/b2-u4-vocab-droptheball.mp3',
    [normalizeKey("Drop the Ball. The freight carrier dropped the ball by forgetting the customs import paperwork.")]: '/content/audio/mcer/b2-u4-vocab-droptheball.mp3',
    [normalizeKey("Bandwidth")]: '/content/audio/mcer/b2-u4-vocab-bandwidth.mp3',
    [normalizeKey("Bandwidth. I do not have the bandwidth to take on a third automation project this quarter.")]: '/content/audio/mcer/b2-u4-vocab-bandwidth.mp3',
    [normalizeKey("Low-Hanging Fruit")]: '/content/audio/mcer/b2-u4-vocab-lowhangingfruit.mp3',
    [normalizeKey("Low-Hanging Fruit. Fixing compressed air leaks is low-hanging fruit for immediate energy savings.")]: '/content/audio/mcer/b2-u4-vocab-lowhangingfruit.mp3',
    [normalizeKey("Ballpark Figure")]: '/content/audio/mcer/b2-u4-vocab-ballparkfigure.mp3',
    [normalizeKey("Ballpark Figure. Can you give me a ballpark figure for the tooling retrofit costs?")]: '/content/audio/mcer/b2-u4-vocab-ballparkfigure.mp3',
    [normalizeKey("Touch Base")]: '/content/audio/mcer/b2-u4-vocab-touchbase.mp3',
    [normalizeKey("Touch Base. Let us touch base tomorrow afternoon to verify the cleanroom airflow readings.")]: '/content/audio/mcer/b2-u4-vocab-touchbase.mp3',
    [normalizeKey("Feasibility")]: '/content/audio/mcer/b2-u4-pron-feasibility.mp3',
    [normalizeKey("Sustainability")]: '/content/audio/mcer/b2-u4-pron-sustainability.mp3',
    [normalizeKey("Electrification")]: '/content/audio/mcer/b2-u4-pron-electrification.mp3',
    [normalizeKey("Team, let us look at the big picture. We are in the final lap of the nearshoring transition. I want everyone to touch base with our supply chain partners before we pull the trigger on the expanded manufacturing facility. Remember to keep your ear to the ground regarding local regulatory shifts. Do not cut corners on quality, because what is on the line is our multi-year customer trust.")]: '/content/audio/mcer/b2-u4-listening-lab.mp3',
    [normalizeKey("When American engineering executives remark \"I do not have the bandwidth,\" they are politely declining additional responsibilities due to a full schedule, not referring to internet connectivity. Similarly, \"touching base\" implies a brief five-minute alignment check, not a formal two-hour presentation. Recognizing these corporate colloquial markers ensures seamless collaboration and elevates professional credibility across international teams.")]: '/content/audio/mcer/b2-u4-reading-passage.mp3',
    [normalizeKey("Good morning, members of the executive steering committee. Our capstone proposal outlines an automated prismatic lithium-ion battery cell assembly line designed specifically for Northern Mexico nearshoring corridors. By deploying six-axis robotic winding cells, integrated vision inspection, and closed-loop thermal testing, this facility achieves a cycle time of 4.2 seconds per cell with a 99.4 percent first-pass yield, reducing supply chain lead times to US assembly plants by sixty percent.")]: '/content/audio/mcer/b2-u4-crucible-model.mp3',
  };

  function cleanText(text) {
    if (!text) return '';
    return text
      .replace(/\[\w+\]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/<[^>]*>?/gm, '')
      .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
      .replace(/&mdash;/g, ' - ')
      .replace(/#{1,6}\s+/g, '')
      .trim();
  }

  function getMiniPCEndpoint() {
    if (typeof window !== 'undefined') {
      if (window.PIPER_TTS_ENDPOINT) return window.PIPER_TTS_ENDPOINT;
      try {
        const stored = localStorage.getItem('stemos_minipc_tts_url');
        if (stored) return stored;
      } catch (_) {}
      return '/api/tts';
    }
    return 'http://127.0.0.1:8080/api/tts';
  }

  function stop() {
    currentSessionId++;
    isPlaying = false;
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.src = '';
      } catch (_) {}
      currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.STEMOS_NATIVE_CANCEL) {
          window.STEMOS_NATIVE_CANCEL();
        } else {
          window.speechSynthesis.cancel();
        }
      } catch (_) {}
    }
  }

  /**
   * Speak using Native Web Speech API (Default Fallback)
   */
  function speakSystemDefault(text, options = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (options.onEnd) options.onEnd();
      return;
    }
    try {
      if (window.STEMOS_NATIVE_CANCEL) {
        window.STEMOS_NATIVE_CANCEL();
      } else {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance._isNativeFallback = true;
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.speed || 0.93;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      const bestVoice = voices.find(v => 
        (v.lang && (v.lang.startsWith('en') || v.lang === 'en-US')) &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Aaron') || v.name.includes('Daniel') || v.name.includes('Jenny') || v.name.includes('Ava') || v.name.includes('Guy'))
      );
      if (bestVoice) utterance.voice = bestVoice;

      utterance.onstart = () => {
        isPlaying = true;
        if (options.onStart) options.onStart();
      };
      utterance.onend = () => {
        isPlaying = false;
        if (options.onEnd) options.onEnd();
      };
      utterance.onerror = (e) => {
        isPlaying = false;
        if (options.onError) options.onError(e);
        else if (options.onEnd) options.onEnd();
      };

      if (window.STEMOS_NATIVE_SPEAK) {
        window.STEMOS_NATIVE_SPEAK(utterance);
      } else {
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.warn('[stemOS TTS] Web Speech fallback error:', err);
      isPlaying = false;
      if (options.onEnd) options.onEnd();
    }
  }

  /**
   * Primary entry point: Piper Neural TTS on Mini PC with automatic fallback
   */
  async function speak(text, options = {}) {
    const cleaned = cleanText(text);
    if (!cleaned) return;

    stop();
    const sessionId = currentSessionId;
    const speed = options.speed || 0.93;
    const lang = options.lang || 'en-US';
    const voice = options.voice || 'en_US-lessac-medium';
    const normKey = normalizeKey(cleaned);

    // 1. Check static pre-rendered cleanroom audio (Photolithography ISO Class 1)
    if (normKey === CLEANROOM_B1_KEY || normKey === CLEANROOM_B1_ALT_KEY) {
      playAudioUrl(STATIC_AUDIO_MAP.cleanroom_photolithography_b1, sessionId, { ...options, rawText: cleaned });
      return;
    }
    if (normKey === CLEANROOM_A2_KEY) {
      playAudioUrl(STATIC_AUDIO_MAP.cleanroom_basic_a2, sessionId, { ...options, rawText: cleaned });
      return;
    }

    // 1b. Check pre-rendered Placement Test US Neural Audio
    if (PLACEMENT_STATIC_AUDIO[normKey]) {
      playAudioUrl(PLACEMENT_STATIC_AUDIO[normKey], sessionId, { ...options, rawText: cleaned });
      return;
    }

    // 1c. Check pre-rendered stemOS MCER Track Audio (Zero-latency Piper/Neural static assets)
    if (MCER_STATIC_AUDIO[normKey]) {
      playAudioUrl(MCER_STATIC_AUDIO[normKey], sessionId, { ...options, rawText: cleaned });
      return;
    }

    // 2. Check in-memory audio blob cache for instant replay
    const cacheKey = `${voice}_${speed}_${cleaned}`;
    if (audioBlobCache.has(cacheKey)) {
      try {
        const cachedUrl = audioBlobCache.get(cacheKey);
        playAudioUrl(cachedUrl, sessionId, { ...options, rawText: cleaned });
        return;
      } catch (_) {}
    }

    // 3. Attempt Piper Neural TTS from Mini PC Edge Gateway (/api/tts)
    if (isPiperActive && typeof fetch === 'function') {
      try {
        const controller = new AbortController();
        // Fast 2.5s timeout before falling back to system default voice
        const timeout = setTimeout(() => controller.abort(), 2500);

        const endpoint = getMiniPCEndpoint();
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'audio/wav, audio/mpeg, audio/*'
          },
          body: JSON.stringify({
            input: cleaned,
            text: cleaned,
            model: 'piper-neural',
            voice: voice,
            speed: speed,
            lang: lang
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('audio') || contentType.includes('octet-stream')) {
            const blob = await response.blob();
            if (blob && blob.size > 256) {
              if (sessionId !== currentSessionId) return; // Stale session
              const audioUrl = URL.createObjectURL(blob);
              audioBlobCache.set(cacheKey, audioUrl);
              playAudioUrl(audioUrl, sessionId, { ...options, rawText: cleaned });
              return;
            }
          }
        }
      } catch (err) {
        // Fall through to system default voice
      }
    }

    // 4. Fallback to Native Web Speech API Default
    if (sessionId === currentSessionId) {
      speakSystemDefault(cleaned, options);
    }
  }

  async function playAudioUrl(url, sessionId, options = {}) {
    let playUrl = url;
    let isBlobUrl = false;

    // Check if available in offline CacheStorage
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cachedResponse = await caches.match(url);
        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          if (blob && blob.size > 0) {
            playUrl = URL.createObjectURL(blob);
            isBlobUrl = true;
          }
        }
      } catch (_) {}
    }

    if (sessionId !== currentSessionId) {
      if (isBlobUrl) URL.revokeObjectURL(playUrl);
      return;
    }

    const audio = new Audio(playUrl);
    currentAudio = audio;

    audio.onplay = () => {
      if (sessionId !== currentSessionId) {
        audio.pause();
        if (isBlobUrl) URL.revokeObjectURL(playUrl);
        return;
      }
      isPlaying = true;
      if (options.onStart) options.onStart();
    };

    audio.onended = () => {
      if (isBlobUrl) URL.revokeObjectURL(playUrl);
      if (sessionId !== currentSessionId) return;
      isPlaying = false;
      currentAudio = null;
      if (options.onEnd) options.onEnd();
    };

    audio.onerror = (e) => {
      if (isBlobUrl) URL.revokeObjectURL(playUrl);
      console.warn('[stemOS TTS] Audio play error, falling down to default voice:', e);
      if (sessionId !== currentSessionId) return;
      currentAudio = null;
      speakSystemDefault(options.rawText || '', options);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('[stemOS TTS] Audio play promise rejected, falling down to default voice:', err);
        if (sessionId === currentSessionId) {
          if (isBlobUrl) URL.revokeObjectURL(playUrl);
          currentAudio = null;
          speakSystemDefault(options.rawText || '', options);
        }
      });
    }
  }

  return {
    version: '1.3.0',
    engine: 'Piper Neural (Mini PC Edge) + Web Speech API Fallback',
    cleanText: cleanText,
    speak: speak,
    stop: stop,
    isPlaying: () => isPlaying,
    MCER_STATIC_AUDIO: MCER_STATIC_AUDIO,
    getMcerAudioList: () => Array.from(new Set(Object.values(MCER_STATIC_AUDIO))),
    clearCache: () => {
      audioBlobCache.forEach(url => URL.revokeObjectURL(url));
      audioBlobCache.clear();
    }
  };
}));
