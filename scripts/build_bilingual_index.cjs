/**
 * stemOS — Complete Bilingual (EN | ES) Landing Page Builder & Parity Synchronizer
 * ══════════════════════════════════════════════════════════════════════════════════
 * This script ensures:
 * 1. index.html defaults to English on initial load.
 * 2. Every single section, card, button, tag, and footer has a data-i18n attribute.
 * 3. 100% of data-i18n keys are fully defined in STEMOS_I18N.en and STEMOS_I18N.es.
 * 4. Language switching bidirectionally updates the entire DOM, document.title, 
 *    input placeholders, active pill classes, and dynamic reality gap drill.
 * 5. Bit-for-bit file parity is maintained between index.html and dev/index.html.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const indexPath = path.join(ROOT_DIR, 'index.html');
const devIndexPath = path.join(ROOT_DIR, 'dev', 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

// ── 1. DICTIONARIES DEFINITION ──
const STEMOS_I18N = {
  en: {
    head_title: 'stemOS — The Technical English Operating System for Advanced Industry & Nearshoring',
    head_desc: 'stemOS is an ESP (English for Specific Purposes) platform with 34 specialized industry tracks for semiconductor, aerospace, robotics, automotive, medical device, logistics, quality engineering & EHS, energy & data centers, embedded firmware & Edge AI, and advanced supply chain reshoring.',

    nav_standards: 'Standards',
    nav_academic: 'Academic',
    nav_student_journey: 'Student CX',
    nav_catalog: 'ESP Catalog',
    nav_placement: 'Placement',
    nav_pricing: 'Pricing',
    btn_signup_nav: 'Sign Up',

    mob_nav_portals: '<i class="fa-solid fa-graduation-cap"></i> Academic Portals',
    mob_nav_admin: 'Admin Portal &amp; School Manager',
    mob_nav_teacher: 'Faculty &amp; Teacher Portal',
    mob_nav_register: 'Student Registration Google SSO',
    mob_nav_app: 'Campus LXP 3D (Students)',
    mob_nav_cat_group: '<i class="fa-solid fa-layer-group"></i> Catalog &amp; Proposal',
    mob_nav_pricing: 'Institutional Proposal &amp; Pricing',
    mob_nav_catalog: '34 Tracks &amp; Labs Catalog ↗',
    mob_nav_cx: 'Student Journey (CX)',
    mob_nav_academic: 'Academic System 60h (25)',
    mob_nav_standards: 'Standards vs. Academia',

    hero_subtitle: '<strong>34 specialized industry tracks</strong> (ESP) and CEFR leveling tracks (A1 to C1) &mdash; engineered for semiconductor manufacturing, aerospace avionics, industrial robotics, automotive engineering, medical devices, global logistics, quality &amp; EHS, data centers, and nearshoring. Aligned with IEEE, SEMI, ISO, IATF, FDA, OSHA, and USMCA standards.',
    btn_take_placement: 'Placement Test (30 min)',
    btn_tracks: 'Explore 34 Tracks &amp; Labs',
    btn_pricing: 'View Proposal &amp; Pricing',
    btn_zoom_nav: 'Schedule 15m Zoom',

    dock_title: 'Nearshoring Simulators &amp; Labs:',
    dock_cx: 'Student Journey (CX)',
    dock_academic: 'Academic System 60h (25)',
    dock_standards: 'Standards vs. Academia',
    dock_pricing: 'Proposal &amp; Pricing',
    dock_catalog: '34 Tracks &amp; Labs ↗',
    dock_placement: 'Placement Test A1–C1',
    dock_lxp: 'Campus LXP 3D',

    stat_lbl_tracks: 'ESP Tracks',
    stat_lbl_modules: 'Modules',
    stat_lbl_readings: 'Readings',
    stat_lbl_questions: 'MCQ Questions',
    stat_lbl_phrases: 'Native Idioms',
    stat_lbl_cases: 'Case Studies B2/C1',
    stat_lbl_accents: 'Global Accents',
    stat_lbl_offline: 'Offline PWA',

    stage_title: 'stemOS Studio &mdash; Semiconductors: Photolithography Cleanroom Protocols',
    stage_level: 'Level B1',
    stage_std: 'IEEE Standard',
    stage_speaker: '<i class="fa-solid fa-headphones"></i> Technical Pronunciation (Native Audio)',
    stage_reading_title: 'Cleanroom ISO Class 1 Protocols',
    stage_socratic: '<i class="fa-solid fa-brain"></i> <span><strong>Socratic Bot:</strong> &ldquo;Why does uniform photoresist deposition prevent defects at 3nm nodes?&rdquo;</span>',
    stage_btn_open: 'Open Module',

    val_badge: '<i class="fa-solid fa-industry"></i> THE NEARSHORING ADVANTAGE',
    val_title: 'Why Generic English Fails on the Modern Shopfloor',
    val_subtitle: 'Standard ESL curricula teach social small talk and hotel greetings. stemOS develops the specialized, high-density technical vocabulary engineers, operators, and quality leads need to execute zero-defect manufacturing.',
    val_card1_title: 'Cleanrooms &amp; Sub-Micron Precision',
    val_card1_desc: 'From EUV photolithography to laminar airflow cleanrooms (ISO 14644-1). Engineers learn exact chemical handling, wafer stepper calibration, and yield defect containment protocols in uncompromised English.',
    val_card2_title: 'Safety-Critical &amp; Zero-Trust Systems',
    val_card2_desc: 'Master AS9100 aerospace compliance, PLC ladder logic loop troubleshooting, and OT/ICS zero-trust network defenses. Prevent catastrophic miscommunications across multi-tiered supplier chains.',
    val_card3_title: 'Cross-Border Engineering Leadership',
    val_card3_desc: 'Nearshoring facilities require Mexican and Latin American technical teams to present 8D root-cause analyses, SPC capability studies (Cp/Cpk), and PPAP documentation directly to US and European headquarters.',

    val_meth_badge: '<i class="fa-solid fa-award"></i> PEDAGOGICAL ARCHITECTURE',
    val_meth_title: 'The 4 Pillars of the stemOS Gold Model',
    val_meth_intro: 'Every module delivers structured technical immersion through four validated cognitive stages:',
    val_pillar1_title: 'Technical Reading',
    val_pillar1_desc: '800-word authentic blueprints, standard operating procedures (SOPs), and peer-level engineering whitepapers.',
    val_pillar2_title: 'Interactive Plant Dialogue',
    val_pillar2_desc: 'Real-world shopfloor exchanges between production supervisors, QA auditors, and field technicians.',
    val_pillar3_title: 'Audited Lexicon &amp; IPA',
    val_pillar3_desc: 'High-density technical terminology with precise phonetic transcriptions and industry collocations.',
    val_pillar4_title: 'Socratic AI Inquiry',
    val_pillar4_desc: 'Critical thinking prompts evaluating design trade-offs, root-cause reasoning, and engineering justification.',
    val_strip_lbl: 'Institutional &amp; Global Standards:',

    std_badge: '<i class="fa-solid fa-scale-balanced"></i> GLOBAL STANDARDS &bull; THE ACADEMIC-INDUSTRIAL BRIDGE',
    std_title: 'Connected to Global Industry Standards, <br><span style="background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">The Specialization Bridge for Engineering</span>',
    std_subtitle: 'Universities build essential foundations of grammar, syntax, and academic rigor. <strong>stemOS provides the operational specialization bridge</strong>, directly connecting coursework to the international normative standards that audit and certify global Tier-1s.',

    std_acad_badge: '<i class="fa-solid fa-triangle-exclamation"></i> <span>GENERAL LINGUISTIC FOUNDATIONS</span>',
    std_acad_title: 'The Essential Academic Foundation',
    std_acad_desc: 'University curriculum focused on fundamental grammar, reading comprehension, and general academic communication.',
    std_acad_pt1: '<strong>Solid structural and syntax foundations</strong><p>Structural grammar, general vocabulary, and foundational communication skills indispensable for the learner.</p>',
    std_acad_pt2: '<strong>Broad-competency syllabi</strong><p>Programs designed for a wide spectrum of professions and general vocational preparation in early semesters.</p>',
    std_acad_pt3: '<strong>Passive technical reading focus</strong><p>Manual reading and theoretical comprehension without intensive simulation of plant incidents or normative standards.</p>',
    std_acad_pt4: '<strong>Formative and summative academic exams</strong><p>Periodic evaluations via exams and coursework targeting degree requirements and graduation benchmarks.</p>',
    std_acad_pt5: '<strong>Need for subsequent industry specialization</strong><p>Upon entering advanced manufacturing or nearshoring plants, engineers require an operational bridge to Tier-1 standards.</p>',
    std_acad_footer: '<i class="fa-solid fa-circle-exclamation"></i> <span>Foundational Stage: Indispensable base complemented by plant floor specialization and Nearshoring standards.</span>',

    std_ind_badge: '<i class="fa-solid fa-certificate"></i> <span>STEMOS ESP METHODOLOGY</span>',
    std_ind_title: 'Live Alignment with Global Standards',
    std_ind_desc: 'Pedagogical engineering 100% connected to the international regulatory standards auditing global Tier-1s.',
    std_ind_pt1: '<strong>Mapped to active global regulatory standards</strong><p>SEMI, IEEE, IEC 62443, ISO 26262, NIST SP 800-82, ASME BPVC, OSHA 1910.147, and Tier-1 vendor audits.</p>',
    std_ind_pt2: '<strong>Hyper-updated dynamic syllabus at Nearshoring pace</strong><p>Sub-2nm EUV photolithography, two-phase immersion cooling, SMR modular reactors, 3D chiplets, and USMCA rules of origin.</p>',
    std_ind_pt3: '<strong>Immersion in mission-critical &amp; zero-defect protocols</strong><p>Authentic P&amp;ID schematics, LOTO lockout/tagout procedures, thermal runaway mitigation, and shift logs.</p>',
    std_ind_pt4: '<strong>Feynman AI Socratic Tutor &amp; Plant Simulators</strong><p>Students defend design trade-offs, troubleshoot in virtual War Rooms, and practice executive negotiation under pressure.</p>',
    std_ind_pt5: '<strong>Day-one shopfloor readiness</strong><p>Drafts 8D reports, passes regulatory audits, and communicates fluently with corporate HQs in Detroit, Austin, or Stuttgart.</p>',
    std_ind_footer: '<i class="fa-solid fa-award"></i> <span>Outcome: W3C Open Badges 3.0 certification with verifiable SHA-256 hash and high international employability profiles.</span>',

    std_clust_badge: '<i class="fa-solid fa-microchip"></i> INTERNATIONAL STANDARDS MATRIX',
    std_clust_title: 'The Standards Governing Advanced Industry Across Our 34 Tracks',
    std_clust_desc: 'Each stemOS module is not an abstract language exercise: it is an operational simulation under real engineering specifications:',
    std_c1_title: 'Semiconductors &amp; Nanotechnology',
    std_c1_desc: 'EUV photolithography with tin laser-produced plasma (LPP) at 13.5 nm, advanced 3D microbump packaging, atomic layer deposition (ALD), and airborne molecular contamination (AMC) control.',
    std_c2_title: 'Industrial Cybersecurity &amp; OT Networks',
    std_c2_desc: 'Industrial DMZ isolation under the Purdue Model, MITM attack mitigation on Modbus/DNP3 fieldbuses, SCADA ransomware triage, and PLC incident response.',
    std_c3_title: 'Electromobility &amp; EV Batteries',
    std_c3_desc: 'Thermal runaway containment protocols, 800V SiC inverter architectures, CAN/CAN-FD BMS telemetry, and megawatt heavy charging for commercial logistics.',
    std_c4_title: 'Aerospace, Defense &amp; Avionics',
    std_c4_desc: 'Safety-critical fly-by-wire software assurance (DAL A), standardized ICAO aviation radiotelephony phraseology, and critical geometric dimensioning and tolerancing (GD&amp;T).',
    std_c5_title: 'Plant Operations &amp; Process Safety',
    std_c5_desc: 'Lockout/Tagout (LOTO) procedures for zero-energy verification, arc flash boundary calculations, shift handovers, and rigorous P&amp;ID schematic walkthroughs.',
    std_c6_title: 'Nearshoring, USMCA &amp; Tier-1 Quality',
    std_c6_desc: 'Drafting 8D root-cause corrective action reports for US corporate auditors, SPC capability studies (Cp/Cpk), USMCA regional value content rules, and client audit defenses.',

    std_drill_tag: '<i class="fa-solid fa-bolt"></i> INTERACTIVE CONTRAST TEST',
    std_drill_title: 'Compare in Real Time: The Reality Gap',
    std_drill_btn_acad: '<i class="fa-solid fa-graduation-cap"></i> Typical University Exam',
    std_drill_btn_ind: '<i class="fa-solid fa-industry"></i> stemOS Technical Challenge',
    std_drill_note: '⚠️ <strong>Curricular Gap Diagnostic:</strong> Zero value in advanced manufacturing. This evaluation fails to test whether the engineer can read a P&amp;ID schematic, de-energize high-voltage equipment under OSHA 1910.147 LOTO, contain sub-micron wafer defects under SEMI S2, or defend an 8D root-cause report before Detroit or Silicon Valley auditors.',

    std_stat1_lbl: 'Audited Tracks with Regulatory Mapping',
    std_stat2_lbl: 'Alignment with Global Standards (IEEE, SEMI, ISO)',
    std_stat3_lbl: 'Grammar Filler or Generic Hotel Dialogues',
    std_stat4_lbl: 'Operational Plant Integration Time',

    inst_badge: '<i class="fa-solid fa-graduation-cap"></i> INSTITUTIONAL ACADEMIC SYSTEM &bull; 60 AUDITABLE HOURS',
    inst_title: '<span style="color:#ffffff; text-shadow:0 2px 16px rgba(0,0,0,0.7);">Curricular Ecosystem for Technological Universities,</span> <br><span style="background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #2dd4bf 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">TecNM, State Universities, and Latin American Institutions</span>',
    inst_subtitle: 'Curricular structure of <strong>60.0 auditable chronological hours</strong> (4 milestones of 15h = 5,600 XP) distributed across 25 master career tracks. Each track implements a <strong>unified deterministic path</strong> with strict pedagogical interleaving (<em>Theory &rarr; English B1 &rarr; Lab &rarr; Milestone</em>) under the <strong>Zero A2</strong> directive (100% Industrial B1 Technical English).',

    inst_portal_admin_title: 'School Manager &amp; Admin',
    inst_portal_admin_desc: 'Multi-institution command center for rectors and directors. Enrollment management, TecNM/UT cohorts, ISO 9001:2015 PDF reports, and UTF-8 BOM Excel export.',
    inst_portal_teacher_title: 'Faculty &amp; Teacher Portal',
    inst_portal_teacher_desc: 'Classroom control and attendance. Offline classroom QR code projector, inactivity radar (>7 days), XP leaderboard, and teacher curricular unlock.',
    inst_portal_register_title: 'Student Onboarding Wizard',
    inst_portal_register_desc: 'Guided 7-step onboarding flow: class code verification, educational subsystem selection (TecNM, UT, State), 25 60h career catalog, and student digital pass.',
    inst_portal_app_title: 'Campus LXP &amp; 3D World',
    inst_portal_app_desc: 'Student learning platform with deterministic 3D world, skill tree, Feynman AI Socratic Tutor, and 8 gamification tiers.',
    inst_portal_action_open: 'Open in Dev Studio',
    inst_portal_action_start: 'Start in Dev Studio',
    inst_portal_action_enter: 'Enter in Dev Studio',

    inst_filter_all: '<i class="fa-solid fa-layer-group"></i> <span>All Careers (25)</span>',
    inst_filter_tecnm: '<i class="fa-solid fa-microchip"></i> <span>TecNM (10)</span>',
    inst_filter_ut: '<i class="fa-solid fa-gears"></i> <span>Tech Universities (6)</span>',
    inst_filter_estatales: '<i class="fa-solid fa-landmark"></i> <span>State Universities (6)</span>',
    inst_filter_latam: '<i class="fa-solid fa-earth-americas"></i> <span>LATAM (3)</span>',

    cat_preview_badge: '<i class="fa-solid fa-layer-group"></i> CURRICULAR CATALOG &bull; 34 ESP TRACKS &bull; LABORATORIES',
    cat_preview_title: '34 Specialized Tracks &amp; Industrial Simulation Laboratories',
    cat_preview_desc: 'Each student accesses technical labs (Output Lab 8D, SM-2 Spaced Repetition, STAR Interview, Incident War Room, SCADA Digital Twin) integrated directly within their assigned track or via the specialized labs tab.',
    cat_preview_btn: '<i class="fa-solid fa-arrow-up-right-from-square"></i> <span>Open 34 Tracks &amp; Simulators Tab</span>',

    badge_cx_journey: '<i class="fa-solid fa-route"></i> STUDENT EXPERIENCE &bull; 4 STEPS TO GLOBAL EMPLOYABILITY',
    title_cx_journey: 'From Day Zero to Certified Bilingual Engineer in 4 Steps: <br><span style="background: linear-gradient(135deg, #38bdf8 0%, #10b981 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">The stemOS Customer Experience (CX)</span>',
    subtitle_cx_journey: 'A frictionless pedagogical journey interleaving CEFR leveling with career-specific technical specialization, culminating in verifiable credentials and direct employability in the nearshoring industry.',
    cx_step1_badge: 'STEP 01 &bull; ZERO-FRICTION ACCESS',
    cx_step1_title: '1. One-Click Institutional Google SSO Sign-Up',
    cx_step1_desc: 'Instant access with your university institutional email (@upbc.edu.mx, @tecnm.mx, @uabc.edu.mx). No passwords to memorize or tedious forms: stemOS auto-detects your university, campus, engineering track, and degree modality.',
    cx_step1_btn: 'Sign Up with Google SSO',
    cx_step2_badge: 'STEP 02 &bull; ADAPTIVE INTERLEAVING',
    cx_step2_title: '2. Placement Test &amp; Curricular Interleaving (CEFR + ESP)',
    cx_step2_desc: '30-minute diagnostic (Grammar, Industrial Listening, and Technical Reading). The algorithm applies the strict pedagogical interleaving rule:',
    cx_step2_rule_a1: '<strong>Below A2 (A1 Level):</strong> Progresses <em>exclusively</em> through Foundation Track CEFR A1. Protects the student from early technical cognitive overload, solidifying grammar and phonetics before engineering concepts.',
    cx_step2_rule_a2: '<strong>A2 Level Achieved:</strong> Unlocks CEFR A2 and <em>begins interleaving foundational ESP labs</em> (Industrial safety lexicon, OSHA/EHS standards, and basic shop tools).',
    cx_step2_rule_b1: '<strong>B1 Level (Technical Threshold):</strong> Full immersion into the <em>60.0h Deterministic Career Path</em> (16 stations: theory foundations, simulators, 8D report, and capstones).',
    cx_step2_rule_b2: '<strong>B2 / C1 Level (Senior):</strong> North American client negotiation, Engineering Change Orders (ECO), international audits, and Socratic Capstone defense.',
    cx_step2_btn: 'Take Diagnostic Placement Test',
    cx_step3_badge: 'STEP 03 &bull; W3C CREDENTIALS',
    cx_step3_title: '3. Earn Official Certificates &amp; Verifiable Badges',
    cx_step3_desc: 'Every achieved milestone (4 milestones of 15h in the 60h track) issues an auditable digital badge under W3C Open Badges 3.0 and ISO 9001:2015. Upon completion, students receive a certificate with cryptographic QR for instant verification by international recruiters.',
    cx_step3_btn: 'View Certification Portal',
    cx_step4_badge: 'STEP 04 &bull; GLOBAL ENGINEERING',
    cx_step4_title: '4. Master Career-Specific Technical English (ESP) for Life',
    cx_step4_desc: 'You do not learn generic conversational English; you master the exact terminology of your engineering field: Mechatronics, Semiconductors, IT, Renewable Energy, or Medical Devices. Fully prepared for technical STAR method interviews and cross-border nearshoring teams.',
    cx_step4_btn: 'Explore 34 Curricular Tracks',
    cx_banner_title: 'The Full High-Demand Talent Development Pipeline',
    cx_banner_desc: 'Engineered for Mexican technological universities to meet CACEI, ABET, and ISO 9001:2015 accreditation benchmarks, directly accelerating regional engineering placement rates in multinational Tier-1s.',
    cx_btn_placement: '<i class="fa-solid fa-vial"></i> Take Placement Test',
    cx_btn_google: '<i class="fa-brands fa-google"></i> Try Google SSO',

    pricing_badge: '<i class="fa-solid fa-file-invoice-dollar"></i> FLAT INSTITUTIONAL LICENSE &bull; UNIVERSITY PROPOSAL',
    pricing_title: 'Institutional Higher Education Investment, <br><span style="background: linear-gradient(135deg, #10b981 0%, #38bdf8 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Single University Invoice &amp; Zero Cost to Students</span>',
    pricing_subtitle: 'Transparent institutional model: no mandatory textbooks, no student out-of-pocket fees, and unlimited 24/7 access for your entire engineering enrollment.',
    memo_quote: '&ldquo;<strong>Mario, thank you for your trust.</strong> Based on your requirements (<strong>≈1,500 students</strong>, unlimited access per student, and zero textbook purchases), I propose a <strong>flat institutional license</strong>: a single invoice for the University and zero cost to students.<br><br>All options include <strong>unlimited access for all ~1,500 students</strong> and a <strong>faculty dashboard for English professors</strong> to monitor group practice in real time.&rdquo;',
    memo_tag: 'Special Attention: University &bull; Cohort ≈1,500 Students',

    plan_indiv_badge: '<i class="fa-solid fa-bolt"></i> INSTANT ACCESS &bull; $49 MXN / MO',
    plan_indiv_tag: 'Individual Plan &bull; Online Payment',
    plan_individual_name: 'Individual Student',
    plan_individual_summary: 'Personal online access with instant activation. Register free now and unlock all benefits.',
    plan_indiv_period: 'Recurring monthly billing &bull; Cancel anytime',
    plan_indiv_metric: '<i class="fa-solid fa-circle-check"></i> <span><strong>All benefits included</strong> &bull; Card / SPEI / Apple Pay</span>',
    plan_indiv_f1: '<strong>Full unlimited access</strong> to all 34 ESP Tracks + CEFR Leveling',
    plan_indiv_f2: '<strong>Feynman AI Socratic Tutor:</strong> interactive technical troubleshooting practice',
    plan_indiv_f3: '<strong>Instant online payment:</strong> Cards, SPEI Transfer, Apple Pay or Google Pay',
    plan_indiv_f4: '<strong>Plant simulators and labs:</strong> LOTO, GD&amp;T, P&amp;ID and virtual audits',
    plan_indiv_f5: '<strong>Digital Certificates &amp; Open Badges 3.0</strong> verifiable via QR code',
    plan_indiv_f6: '<strong>Free registration now:</strong> create your account in 1 minute and start practicing',
    btn_pay_individual: 'Subscribe for $49 MXN/mo',
    sublink_register_free: 'No account yet? <strong>Register free here</strong>',

    plan_1_badge: '<i class="fa-solid fa-star"></i> MOST RECOMMENDED &bull; MOST COMPLETE',
    plan_1_tag: 'Option 1 &bull; Full Coverage',
    plan_1_name: '4-Month Campus Pilot',
    plan_1_summary: 'Covers computer labs plus remote access from home or mobile at no extra cost.',
    plan_1_period: 'per 4-month term',
    plan_1_metric: '<i class="fa-solid fa-calculator" style="color:#10b981;"></i> <span>Equivalent to <strong>~$63 MXN per student</strong> for the entire term</span>',
    plan_1_f1: '<strong>Unlimited access</strong> for all ~1,500 enrolled students',
    plan_1_f2: '<strong>Covers on-campus labs</strong> across all computer centers',
    plan_1_f3: '<strong>Mobile and remote access:</strong> practice from home or phone at zero extra fee',
    plan_1_f4: '<strong>Faculty dashboard:</strong> real-time group tracking for English teachers',
    plan_1_f5: '<strong>Zero student cost:</strong> no mandatory textbook purchases',
    plan_1_f6: '<strong>34 ESP Tracks + CEFR Leveling</strong> and nearshoring simulators included',
    btn_plan_1: '<i class="fa-brands fa-whatsapp"></i> <span>Choose 4-Month Pilot</span>',

    plan_2_badge: '<i class="fa-solid fa-shield-halved"></i> BEST ANNUAL VALUE &bull; FROZEN PRICE',
    plan_2_tag: 'Option 2 &bull; Annual Guarantee',
    plan_2_name: 'Annual Campus License',
    plan_2_summary: 'Comprehensive institutional plan for 3 four-month terms with priority faculty support.',
    plan_2_period: 'for 3 terms ($80,000 per term)',
    plan_2_metric: '<i class="fa-solid fa-piggy-bank"></i> <span><strong>$45,000 MXN savings</strong> compared to individual terms</span>',
    plan_2_f1: '<strong>Everything in Option 1</strong> (Campus + Home/Mobile for ~1,500 students)',
    plan_2_f2: '<strong>Price locked for one full year</strong> (3 academic terms)',
    plan_2_f3: '<strong>Priority technical &amp; pedagogical support</strong> for teaching faculty',
    plan_2_f4: '<strong>Continuous content updates</strong> by career track and industrial standards',
    plan_2_f5: '<strong>Institutional Certificates &amp; Open Badges 3.0</strong> with SHA-256 hash',
    btn_plan_2: '<i class="fa-brands fa-whatsapp"></i> <span>Request Annual License</span>',

    plan_3_badge: '<i class="fa-solid fa-desktop"></i> ON-PREMISE &bull; COMPUTER LABS',
    plan_3_tag: 'Option 3 &bull; Computer Labs',
    plan_3_name: 'Computer Lab Only',
    plan_3_summary: 'Access restricted to computer center workstations across all rotating shifts.',
    plan_3_period: 'per workstation / computer per term',
    plan_3_metric: '<i class="fa-solid fa-network-wired"></i> <span>Example: <strong>80 workstations = $80,000 MXN + VAT</strong></span>',
    plan_3_f1: '<strong>Workstation access</strong> across school computer labs',
    plan_3_f2: '<strong>Valid for all students</strong> across morning and evening shifts',
    plan_3_f3: '<strong>Local faculty dashboard</strong> for lab monitoring',
    plan_3_f4: '<em>Does not include remote home or mobile access</em>',
    btn_calc_lab: 'Calculate by Workstations',

    hub_badge: '<i class="fa-solid fa-comments"></i> DIRECT DIALOGUE &bull; INSTITUTIONAL ASSESSMENT',
    hub_title: 'How many workstations do you have across all your labs?',
    hub_desc: 'If this fits your goals, let us connect for <strong>15 minutes on Zoom</strong> to walk you through the live portal, the 25 career tracks, and the faculty dashboard.',
    calc_lbl_input: '<i class="fa-solid fa-desktop" style="color:#38bdf8;"></i> <span>Number of lab computers:</span>',
    calc_lbl_unit: 'workstations',
    calc_res_lbl_op3: 'Option 3 Investment (Lab Only):',
    calc_res_sub_op3: '($1,000 per workstation / term)',
    calc_res_lbl_op1: 'Option 1 Investment (Full Pilot):',
    calc_res_sub_op1: 'Includes home &amp; mobile access for all 1,500 students!',
    btn_whatsapp: 'Contact via Direct WhatsApp',
    btn_zoom: 'Schedule 15 min via Zoom',
    btn_email: 'Send Official Email',

    modal_zoom_title: 'Schedule 15-Minute Zoom Session',
    modal_zoom_desc: 'Executive demonstration of the stemOS portal, walkthrough of the 25 60-hour career tracks, and review of the faculty group monitoring dashboard.',
    modal_zoom_calendly: '<i class="fa-solid fa-calendar-check" style="margin-right:6px;"></i> Instant scheduling available via <strong>Calendly</strong>',
    modal_zoom_btn: 'Open Calendly <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7rem;"></i>',

    footer_brand_desc: 'Advanced English for Specific Purposes (ESP) platform built for semiconductor manufacturing, electromobility, aerospace, and high-precision strategic technologies.',
    footer_title_esp: 'ESP Specializations',
    footer_title_platform: 'Platform',
    footer_link_top: 'Back to Top',
    footer_link_campus: 'Student Campus',
    footer_link_cache: 'Refresh PWA Cache',
    footer_copy: '&copy; 2026 stemOS &bull; All rights reserved.',
    footer_dev: 'Built with Supaste-Engine &bull; Offline First PWA'
  },

  es: {
    head_title: 'stemOS — El Sistema Operativo de Inglés Técnico para la Industria de Alta Tecnología',
    head_desc: 'stemOS es la plataforma de Inglés para Fines Específicos (ESP) con 34 tracks especializados para semiconductores, aeroespacial, robótica, automotriz, dispositivos médicos, logística, calidad y EHS, centros de datos y nearshoring.',

    nav_standards: 'Estándares',
    nav_academic: 'Académico',
    nav_student_journey: 'Ruta CX',
    nav_catalog: 'Catálogo ESP',
    nav_placement: 'Placement',
    nav_pricing: 'Precios',
    btn_signup_nav: 'Regístrate',

    mob_nav_portals: '<i class="fa-solid fa-graduation-cap"></i> Portales Académicos',
    mob_nav_admin: 'Portal Admin &amp; School Manager',
    mob_nav_teacher: 'Portal Docente &amp; Faculty',
    mob_nav_register: 'Registro Estudiantil Google SSO',
    mob_nav_app: 'Campus LXP 3D (Estudiantes)',
    mob_nav_cat_group: '<i class="fa-solid fa-layer-group"></i> Catálogo &amp; Propuesta',
    mob_nav_pricing: 'Propuesta Institucional &amp; Precios',
    mob_nav_catalog: 'Catálogo de 34 Tracks &amp; Labs ↗',
    mob_nav_cx: 'Ruta del Alumno (CX)',
    mob_nav_academic: 'Sistema Académico 60h (25)',
    mob_nav_standards: 'Estándares vs. Academia',

    hero_subtitle: '<strong>34 tracks especializados de industria</strong> (ESP) y tracks de nivelación MCER (A1 a C1) &mdash; diseñados para fabricación de semiconductores, aviónica aeroespacial, robótica industrial, ingeniería automotriz, dispositivos médicos, logística internacional, calidad y EHS, centros de datos y nearshoring. Alineados con estándares IEEE, SEMI, ISO, IATF, FDA, OSHA y T-MEC.',
    btn_take_placement: 'Test de Ubicación (30 min)',
    btn_tracks: 'Explorar 34 Tracks &amp; Labs',
    btn_pricing: 'Ver Propuesta &amp; Precios',
    btn_zoom_nav: 'Agendar Zoom 15m',

    dock_title: 'Simuladores &amp; Labs de Nearshoring:',
    dock_cx: 'Ruta del Alumno (CX)',
    dock_academic: 'Sistema Académico 60h (25)',
    dock_standards: 'Estándares vs. Academia',
    dock_pricing: 'Propuesta &amp; Precios',
    dock_catalog: '34 Tracks &amp; Labs ↗',
    dock_placement: 'Placement Test A1–C1',
    dock_lxp: 'Campus LXP 3D',

    stat_lbl_tracks: 'Tracks ESP',
    stat_lbl_modules: 'Módulos',
    stat_lbl_readings: 'Lecturas',
    stat_lbl_questions: 'Preguntas Opción Múltiple',
    stat_lbl_phrases: 'Modismos Nativos',
    stat_lbl_cases: 'Casos de Estudio B2/C1',
    stat_lbl_accents: 'Acentos Globales',
    stat_lbl_offline: 'PWA Offline',

    stage_title: 'stemOS Studio &mdash; Semiconductores: Protocolos de Fotolitografía en Cuarto Limpio',
    stage_level: 'Nivel B1',
    stage_std: 'Norma IEEE',
    stage_speaker: '<i class="fa-solid fa-headphones"></i> Pronunciación Técnica (Audio Nativo)',
    stage_reading_title: 'Protocolos de Cuarto Limpio ISO Clase 1',
    stage_socratic: '<i class="fa-solid fa-brain"></i> <span><strong>Bot Socrático:</strong> &ldquo;¿Por qué la deposición uniforme de fotorresina previene defectos en nodos de 3nm?&rdquo;</span>',
    stage_btn_open: 'Abrir Módulo',

    val_badge: '<i class="fa-solid fa-industry"></i> LA VENTAJA DEL NEARSHORING',
    val_title: 'Por Qué el Inglés Genérico Falla en la Planta Industrial Moderna',
    val_subtitle: 'Los planes de estudio estándar enseñan charlas sociales y saludos de hotel. stemOS desarrolla el vocabulario técnico especializado de alta densidad que ingenieros y operadores necesitan para manufactura cero defectos.',
    val_card1_title: 'Cuartos Limpios y Precisión Submicrónica',
    val_card1_desc: 'Desde fotolitografía EUV hasta cuartos limpios de flujo laminar (ISO 14644-1). Los ingenieros aprenden manejo químico exacto, calibración de steppers y contención de defectos en inglés riguroso.',
    val_card2_title: 'Sistemas Críticos de Seguridad y Zero-Trust',
    val_card2_desc: 'Domina cumplimiento aeroespacial AS9100, diagnóstico de bucles ladder en PLC y defensa de redes OT/ICS. Evita fallas críticas de comunicación en cadenas de suministro Tier-1.',
    val_card3_title: 'Liderazgo de Ingeniería Transfronterizo',
    val_card3_desc: 'Las plantas de nearshoring exigen que los equipos de México y LATAM presenten análisis 8D de causa raíz, estudios SPC (Cp/Cpk) y documentación PPAP directo a corporativos en EE. UU. y Europa.',

    val_meth_badge: '<i class="fa-solid fa-award"></i> ARQUITECTURA PEDAGÓGICA',
    val_meth_title: 'Los 4 Pilares del Modelo Gold de stemOS',
    val_meth_intro: 'Cada módulo entrega inmersión técnica estructurada a través de cuatro etapas cognitivas validadas:',
    val_pillar1_title: 'Lectura Técnica',
    val_pillar1_desc: 'Planos auténticos de 800 palabras, procedimientos operativos estándar (SOPs) y whitepapers de ingeniería.',
    val_pillar2_title: 'Diálogo Interactivo en Planta',
    val_pillar2_desc: 'Intercambios reales en piso entre supervisores de producción, auditores de calidad y técnicos de campo.',
    val_pillar3_title: 'Léxico Auditado y Fonética IPA',
    val_pillar3_desc: 'Terminología técnica de alta densidad con transcripciones fonéticas precisas y colocaciones industriales.',
    val_pillar4_title: 'Indagación Socrática con IA',
    val_pillar4_desc: 'Preguntas de pensamiento crítico que evalúan compensaciones de diseño, causa raíz y justificación de ingeniería.',
    val_strip_lbl: 'Estándares Institucionales y Globales:',

    std_badge: '<i class="fa-solid fa-scale-balanced"></i> ESTÁNDARES GLOBALES &bull; EL PUENTE ACADÉMICO-INDUSTRIAL',
    std_title: 'Conectado a Estándares de la Industria Global, <br><span style="background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">El Puente de Especialización para la Ingeniería</span>',
    std_subtitle: 'Las universidades construyen los cimientos esenciales de gramática, sintaxis y rigor académico. <strong>stemOS proporciona el puente de especialización operativa</strong>, conectando el aula directamente con los estándares normativos internacionales que auditan y certifican a los Tier-1 globales.',

    std_acad_badge: '<i class="fa-solid fa-triangle-exclamation"></i> <span>FORMACIÓN LINGÜÍSTICA GENERAL &amp; FUNDAMENTOS</span>',
    std_acad_title: 'La Base Académica Esencial',
    std_acad_desc: 'Formación universitaria centrada en gramática fundamental, lecto-comprensión y comunicación académica general.',
    std_acad_pt1: '<strong>Fundamentos sólidos de estructura y sintaxis lingüística</strong><p>Gramática estructural, vocabulario general y habilidades básicas de comunicación escrita y oral indispensables para el estudiante.</p>',
    std_acad_pt2: '<strong>Planes de estudio enfocados en competencias generales</strong><p>Programas diseñados para un espectro amplio de profesiones y preparación integral en etapas tempranas de formación profesional.</p>',
    std_acad_pt3: '<strong>Enfoque en lectura técnica y comprensión pasiva</strong><p>Comprensión de manuales y textos teóricos sin exposición intensiva a incidentes operativos de planta ni normas normativas.</p>',
    std_acad_pt4: '<strong>Evaluaciones académicas formativas y sumativas</strong><p>Evaluación periódica mediante exámenes y tareas orientadas al cumplimiento curricular y certificación de nivel de egreso.</p>',
    std_acad_pt5: '<strong>Necesidad de especialización posterior para la industria</strong><p>Al egresar hacia plantas de manufactura avanzada o nearshoring, el ingeniero requiere un puente de especialización en estándares Tier-1.</p>',
    std_acad_footer: '<i class="fa-solid fa-circle-exclamation"></i> <span>Etapa Fundacional: Base indispensable que se complementa con la especialización en planta y estándares de Nearshoring.</span>',

    std_ind_badge: '<i class="fa-solid fa-certificate"></i> <span>METODOLOGÍA STEMOS ESP</span>',
    std_ind_title: 'Alineación Viva con Estándares Globales',
    std_ind_desc: 'Ingeniería pedagógica conectada al 100% con los estándares internacionales normativos que auditan a los Tier-1 globales.',
    std_ind_pt1: '<strong>Mapeado a estándares normativos globales activos</strong><p>Normas SEMI, IEEE, IEC 62443, ISO 26262, NIST SP 800-82, ASME BPVC, OSHA 1910.147 y auditorías de proveedores Tier-1.</p>',
    std_ind_pt2: '<strong>Syllabus dinámico hiper-actualizado al ritmo del Nearshoring</strong><p>Fotolitografía EUV sub-2nm, enfriamiento por inmersión bifásica, reactores modulares SMR, chiplets 3D y reglas de origen T-MEC.</p>',
    std_ind_pt3: '<strong>Inmersión en protocolos de misión crítica y cero defectos</strong><p>Diagramas P&amp;ID auténticos, procedimientos de desenergización LOTO, mitigación de desbocamiento térmico y bitácoras de turno.</p>',
    std_ind_pt4: '<strong>Feynman AI Tutor Socrático y Simuladores de Planta</strong><p>El alumno defiende decisiones de diseño, resuelve incidentes en War Rooms virtuales y practica negociación ejecutiva bajo presión.</p>',
    std_ind_pt5: '<strong>Operatividad inmediata desde el primer día</strong><p>Redacta reportes 8D, atiende auditorías regulatorias y se comunica con fluidez con corporativos en Detroit, Austin o Stuttgart.</p>',
    std_ind_footer: '<i class="fa-solid fa-award"></i> <span>Resultado: Certificación W3C Open Badges 3.0 con hash SHA-256 verificable y perfiles de alta empleabilidad internacional.</span>',

    std_clust_badge: '<i class="fa-solid fa-microchip"></i> MATRIZ DE ESTÁNDARES INTERNACIONALES',
    std_clust_title: 'Los Estándares que Rigen a la Industria y Gobiernan Nuestros 34 Tracks',
    std_clust_desc: 'Cada módulo de stemOS no es un ejercicio lingüístico abstracto: es una simulación de operación bajo especificaciones de ingeniería reales:',
    std_c1_title: 'Semiconductores &amp; Nanotecnología',
    std_c1_desc: 'Fotolitografía EUV con fuentes láser de plasma inducido por estaño a 13.5 nm, empaquetado avanzado 3D con microbumps, deposición atómica (ALD) y monitoreo de contaminación molecular (AMC).',
    std_c2_title: 'Ciberseguridad Industrial &amp; Redes OT',
    std_c2_desc: 'Aislamiento de la DMZ industrial bajo el modelo Purdue, mitigación de ataques man-in-the-middle en buses Modbus/DNP3, triaje de ransomware en SCADA y respuesta ante incidentes en PLC.',
    std_c3_title: 'Electromovilidad &amp; Baterías EV',
    std_c3_desc: 'Protocolos de contención de desbocamiento térmico (thermal runaway), arquitectura de inversores SiC a 800V, telemetría BMS CAN/CAN-FD y recarga pesada megavatio para flotas de transporte.',
    std_c4_title: 'Aeroespacial, Defensa &amp; Aviónica',
    std_c4_desc: 'Aseguramiento de software crítico de vuelo por cable (Fly-by-Wire DAL A), comunicación estandarizada de radiotelefonía aeronáutica ICAO y gestión de tolerancias geométricas críticas (GD&amp;T).',
    std_c5_title: 'Operaciones de Planta &amp; Seguridad de Procesos',
    std_c5_desc: 'Protocolos de candadeo y tarjeteo (LOTO) para desenergización cero energía, cálculo de fronteras de relámpago de arco eléctrico, relevo de turno (shift handover) y lectura de diagramas P&amp;ID.',
    std_c6_title: 'Nearshoring, T-MEC &amp; Calidad Tier-1',
    std_c6_desc: 'Redacción de reportes 8D de causa raíz para corporativos en EE. UU., estudios de capacidad de proceso (Cp/Cpk), arbitraje arancelario de contenido regional y defensas de auditoría con clientes.',

    std_drill_tag: '<i class="fa-solid fa-bolt"></i> PRUEBA INTERACTIVA DE CONTRASTE',
    std_drill_title: 'Compara en Tiempo Real: El Abismo de la Realidad',
    std_drill_btn_acad: '<i class="fa-solid fa-graduation-cap"></i> Examen Universitario Típico',
    std_drill_btn_ind: '<i class="fa-solid fa-industry"></i> Desafío Técnico stemOS',
    std_drill_note: '⚠️ <strong>Diagnóstico de Desfase:</strong> Cero valor en planta de manufactura avanzada. Esta evaluación no mide si el ingeniero es capaz de leer un diagrama P&amp;ID, aislar una fuente de alta tensión bajo OSHA 1910.147 LOTO, reportar un defecto wafer sub-micrónico bajo SEMI S2, ni defender un reporte de causa raíz 8D ante un auditor de Detroit o Silicon Valley.',

    std_stat1_lbl: 'Tracks Auditados con Mapeo Normativo',
    std_stat2_lbl: 'Alineación con Estándares Globales (IEEE, SEMI, ISO)',
    std_stat3_lbl: 'Relleno Gramatical o Diálogos Genéricos de Hotel',
    std_stat4_lbl: 'Tiempo de Integración Operativa en Planta',

    inst_badge: '<i class="fa-solid fa-graduation-cap"></i> SISTEMA ACADÉMICO INSTITUCIONAL &bull; 60 HORAS AUDITABLES',
    inst_title: '<span style="color:#ffffff; text-shadow:0 2px 16px rgba(0,0,0,0.7);">Ecosistema Curricular para Universidades Tecnológicas,</span> <br><span style="background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #2dd4bf 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">TecNM, Estatales de México y Universidades LATAM</span>',
    inst_subtitle: 'Estructura curricular de <strong>60.0 horas cronológicas auditables</strong> (4 hitos de 15h = 5,600 XP) distribuida en 25 carreras maestras. Cada carrera implementa un <strong>camino determinista unificado</strong> con entreverado pedagógico estricto (<em>Theory &rarr; English B1 &rarr; Lab &rarr; Milestone</em>) bajo la directriz de <strong>Zero A2</strong> (100% Inglés B1 Técnico Industrial).',

    inst_portal_admin_title: 'School Manager &amp; Admin',
    inst_portal_admin_desc: 'Centro de mando multi-institución para rectores y directores. Gestión de matrícula, cohortes TecNM/UT, reportes ISO 9001:2015 en PDF y exportación Excel UTF-8 BOM.',
    inst_portal_teacher_title: 'Portal Docente &amp; Grupos',
    inst_portal_teacher_desc: 'Control de grupos y asistencia. Proyector de códigos QR offline para salón, radar de inactividad (>7 días), tabla de clasificación de XP y desbloqueo curricular docente.',
    inst_portal_register_title: 'Student Onboarding Wizard',
    inst_portal_register_desc: 'Flujo guiado de 7 pasos: verificación de código de clase, selección de subsistema (TecNM, UT, Estatal), catálogo de 25 carreras de 60h y credencial digital de alumno.',
    inst_portal_app_title: 'Campus LXP &amp; Mundo 3D',
    inst_portal_app_desc: 'Plataforma del estudiante con mundo 3D determinista, árbol de habilidades, Feynman AI Socratic Tutor y 8 tiers de gamificación.',
    inst_portal_action_open: 'Abrir en Dev Studio',
    inst_portal_action_start: 'Iniciar en Dev Studio',
    inst_portal_action_enter: 'Ingresar en Dev Studio',

    inst_filter_all: '<i class="fa-solid fa-layer-group"></i> <span>Todas las Carreras (25)</span>',
    inst_filter_tecnm: '<i class="fa-solid fa-microchip"></i> <span>TecNM (10)</span>',
    inst_filter_ut: '<i class="fa-solid fa-gears"></i> <span>Univ. Tecnológicas (6)</span>',
    inst_filter_estatales: '<i class="fa-solid fa-landmark"></i> <span>Univ. Estatales (6)</span>',
    inst_filter_latam: '<i class="fa-solid fa-earth-americas"></i> <span>LATAM (3)</span>',

    cat_preview_badge: '<i class="fa-solid fa-layer-group"></i> CATÁLOGO CURRICULAR &bull; 34 TRACKS ESP &bull; LABORATORIOS',
    cat_preview_title: '34 Tracks Especializados &amp; Laboratorios de Simulación Industrial',
    cat_preview_desc: 'Cada alumno accede a sus laboratorios técnicos (Output Lab 8D, SM-2 Spaced Repetition, STAR Interview, War Room de Incidentes, SCADA Digital Twin) integrados directamente dentro de su track asignado o en la pestaña especializada de laboratorios.',
    cat_preview_btn: '<i class="fa-solid fa-arrow-up-right-from-square"></i> <span>Abrir Pestaña de 34 Tracks &amp; Simuladores</span>',

    badge_cx_journey: '<i class="fa-solid fa-route"></i> EXPERIENCIA DEL ALUMNO &bull; 4 PASOS HACIA EL EMPLEO GLOBAL',
    title_cx_journey: 'De Cero a Ingeniero Bilingüe Certificado en 4 Pasos: <br><span style="background: linear-gradient(135deg, #38bdf8 0%, #10b981 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">El Customer Experience (CX) de stemOS</span>',
    subtitle_cx_journey: 'Un recorrido pedagógico sin fricción que entrelaza la nivelación MCER con la especialización técnica de tu carrera, culminando en certificaciones verificables y empleabilidad directa en la industria de nearshoring.',
    cx_step1_badge: 'PASO 01 &bull; ACCESO CERO FRICCIÓN',
    cx_step1_title: '1. Registro con Google SSO Institucional en 1 Clic',
    cx_step1_desc: 'Acceso instantáneo con el correo de tu universidad (@upbc.edu.mx, @tecnm.mx, @uabc.edu.mx). Sin contraseñas que olvidar ni formularios tediosos: stemOS auto-detecta tu universidad, campus, carrera y modalidad (Ingeniería / TSU).',
    cx_step1_btn: 'Registrarse con Google SSO',
    cx_step2_badge: 'PASO 02 &bull; INTERLEAVING ADAPTATIVO',
    cx_step2_title: '2. Placement Test &amp; Entrelazado Curricular (MCER + ESP)',
    cx_step2_desc: 'Diagnóstico de 30 minutos (Gramática, Escucha industrial y Lectura técnica). El algoritmo aplica la regla estricta de entrelazado cognitivo:',
    cx_step2_rule_a1: '<strong>Menor a A2 (Nivel A1):</strong> Cursa <em>exclusivamente</em> el Track Base MCER A1. Protege al alumno de frustración técnica temprana, consolidando gramática y pronunciación básica antes de ver terminología de ingeniería.',
    cx_step2_rule_a2: '<strong>Nivel A2 alcanzado:</strong> Desbloquea MCER A2 y <em>comienza a incluir labs ESP</em> (Vocabulario de seguridad industrial, normas OSHA/EHS y herramientas de taller).',
    cx_step2_rule_b1: '<strong>Nivel B1 (Umbral Técnico):</strong> Inmersión total en la <em>Ruta Determinista de 60.0h de su Carrera</em> (16 estaciones: fundamentos, simuladores, reporte 8D e hitos).',
    cx_step2_rule_b2: '<strong>Nivel B2 / C1 (Senior):</strong> Negociación con clientes de EE. UU., órdenes de cambio de ingeniería (ECO), auditorías internacionales y defensa de Capstone con IA Socrática.',
    cx_step2_btn: 'Hacer Placement Test Diagnóstico',
    cx_step3_badge: 'PASO 03 &bull; CREDENCIALES W3C',
    cx_step3_title: '3. Obtén Certificados Oficiales &amp; Insignias Verificables',
    cx_step3_desc: 'Cada hito superado (4 hitos de 15h cada uno en la ruta de 60h) otorga una insignia digital auditable bajo W3C Open Badges 3.0 e ISO 9001:2015. Al graduarse, el alumno recibe su certificado con QR criptográfico para verificación inmediata por reclutadores internacionales.',
    cx_step3_btn: 'Ver Portal de Certificación',
    cx_step4_badge: 'PASO 04 &bull; INGENIERÍA GLOBAL',
    cx_step4_title: '4. Domina el Inglés Técnico (ESP) de tu Carrera de por Vida',
    cx_step4_desc: 'No aprendes inglés general genérico; dominas la terminología exacta de tu especialidad: Mecatrónica, Semiconductores, TI, Energía Renovable o Manufactura Médica. Preparado para entrevistas de trabajo en inglés (método STAR) y equipos globales de nearshoring.',
    cx_step4_btn: 'Explorar 34 Tracks Curriculares',
    cx_banner_title: 'El Ciclo Completo de Formación de Talento de Alta Demanda',
    cx_banner_desc: 'Diseñado para que las universidades mexicanas cumplan con los requisitos de acreditación CACEI, ABET e ISO 9001:2015, elevando el índice de inserción laboral en empresas transnacionales.',
    cx_btn_placement: '<i class="fa-solid fa-vial"></i> Iniciar Placement Test',
    cx_btn_google: '<i class="fa-brands fa-google"></i> Probar Google SSO',

    pricing_badge: '<i class="fa-solid fa-file-invoice-dollar"></i> LICENCIA INSTITUCIONAL PLANA &bull; PROPUESTA UNIVERSITARIA',
    pricing_title: 'Inversión Institucional para Universidades, <br><span style="background: linear-gradient(135deg, #10b981 0%, #38bdf8 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Una Sola Factura y Cero Cobro a los Alumnos</span>',
    pricing_subtitle: 'Modelo transparente sin compra obligatoria de libros, sin cobro individual a los estudiantes y con acceso ilimitado para toda la matrícula de ingeniería.',
    memo_quote: '&ldquo;<strong>Mario, gracias por la confianza.</strong> Con lo que me cuentas (<strong>≈1,500 alumnos</strong>, sin límite de uso por estudiante y sin compra de libros), te propongo una <strong>licencia institucional plana</strong>: una sola factura para la Universidad y cero cobro a los alumnos.<br><br>Todas las opciones incluyen <strong>acceso ilimitado para los ~1,500 alumnos</strong> y un <strong>panel para que los docentes de inglés</strong> vean la práctica de cada grupo.&rdquo;',
    memo_tag: 'Atención Especial: Universidad &bull; Cohorte ≈1,500 Alumnos',

    plan_indiv_badge: '<i class="fa-solid fa-bolt"></i> ACCESO INMEDIATO &bull; $49 MXN / MES',
    plan_indiv_tag: 'Plan Individual &bull; Pago en Línea',
    plan_individual_name: 'Estudiante Individual',
    plan_individual_summary: 'Acceso personal en línea con activación instantánea. Regístrate gratis ahora y desbloquea todos los beneficios.',
    plan_indiv_period: 'Facturación mensual recurrente &bull; Cancela cuando quieras',
    plan_indiv_metric: '<i class="fa-solid fa-circle-check"></i> <span><strong>Todos los beneficios incluidos</strong> &bull; Pago SPEI / Tarjeta</span>',
    plan_indiv_f1: '<strong>Acceso total e ilimitado</strong> a los 34 Tracks ESP + Nivelación MCER',
    plan_indiv_f2: '<strong>Tutor Socrático Feynman con IA:</strong> práctica interactiva de resolución técnica',
    plan_indiv_f3: '<strong>Pago en línea inmediato:</strong> Tarjetas, Transferencia SPEI, Apple Pay o Google Pay',
    plan_indiv_f4: '<strong>Simuladores y laboratorios de planta:</strong> LOTO, GD&amp;T, P&amp;ID y auditorías virtuales',
    plan_indiv_f5: '<strong>Emisión de Certificados Digitales y Open Badges 3.0</strong> verificables con código QR',
    plan_indiv_f6: '<strong>Registro gratis ahora:</strong> crea tu cuenta en 1 minuto y empieza a practicar',
    btn_pay_individual: 'Suscribirme por $49/mes',
    sublink_register_free: '¿Aún no tienes cuenta? <strong>Regístrate gratis aquí</strong>',

    plan_1_badge: '<i class="fa-solid fa-star"></i> MÁS RECOMENDADA &bull; LA MÁS COMPLETA',
    plan_1_tag: 'Opción 1 &bull; Cobertura Total',
    plan_1_name: 'Piloto Cuatrimestral',
    plan_1_summary: 'Cubre los laboratorios y además el acceso desde casa o celular sin costo extra.',
    plan_1_period: 'por cuatrimestre',
    plan_1_metric: '<i class="fa-solid fa-calculator" style="color:#10b981;"></i> <span>Equivale a <strong>~$63 pesos por alumno</strong> en todo el cuatrimestre</span>',
    plan_1_f1: '<strong>Acceso ilimitado</strong> para los ~1,500 alumnos matriculados',
    plan_1_f2: '<strong>Cubre los laboratorios</strong> del centro de cómputo en campus',
    plan_1_f3: '<strong>Acceso móvil y remoto:</strong> práctica desde casa o celular sin costo extra',
    plan_1_f4: '<strong>Panel docente de inglés:</strong> seguimiento de práctica en vivo por grupo',
    plan_1_f5: '<strong>Cero cobro a los alumnos:</strong> sin compra obligatoria de libros',
    plan_1_f6: '<strong>34 Tracks ESP + Nivelación MCER</strong> y simuladores de nearshoring incluidos',
    btn_plan_1: '<i class="fa-brands fa-whatsapp"></i> <span>Elegir Piloto Cuatrimestral</span>',

    plan_2_badge: '<i class="fa-solid fa-shield-halved"></i> MEJOR VALOR ANUAL &bull; PRECIO CONGELADO',
    plan_2_tag: 'Opción 2 &bull; Garantía Anual',
    plan_2_name: 'Licencia Anual de Campus',
    plan_2_summary: 'Plan integral institucional para 3 cuatrimestres con soporte docente prioritario.',
    plan_2_period: 'por 3 cuatrimestres ($80,000 por cuatrimestre)',
    plan_2_metric: '<i class="fa-solid fa-piggy-bank"></i> <span><strong>Ahorro de $45,000 MXN</strong> respecto a cuatrimestres individuales</span>',
    plan_2_f1: '<strong>Todo lo de la Opción 1</strong> (Campus + Casa/Celular para ~1,500 alumnos)',
    plan_2_f2: '<strong>Precio congelado por un año completo</strong> (3 cuatrimestres)',
    plan_2_f3: '<strong>Soporte técnico y pedagógico prioritario</strong> para la plantilla docente',
    plan_2_f4: '<strong>Actualización continua de contenidos</strong> por carrera y normas industriales',
    plan_2_f5: '<strong>Emisión de certificados y Open Badges 3.0</strong> institucionales con hash SHA-256',
    btn_plan_2: '<i class="fa-brands fa-whatsapp"></i> <span>Solicitar Licencia Anual</span>',

    plan_3_badge: '<i class="fa-solid fa-desktop"></i> ON-PREMISE &bull; SALAS DE CÓMPUTO',
    plan_3_tag: 'Opción 3 &bull; Centros de Cómputo',
    plan_3_name: 'Solo Laboratorio',
    plan_3_summary: 'Acceso en las computadoras del centro de cómputo para todos los turnos.',
    plan_3_period: 'por equipo / computadora por cuatrimestre',
    plan_3_metric: '<i class="fa-solid fa-network-wired"></i> <span>Ejemplo: <strong>80 computadoras = $80,000 MXN + IVA</strong></span>',
    plan_3_f1: '<strong>Acceso en las computadoras</strong> del centro de cómputo escolar',
    plan_3_f2: '<strong>Válido para todos los alumnos</strong> en sus distintos turnos (matutino/vespertino)',
    plan_3_f3: '<strong>Panel docente local</strong> para monitoreo en aula de cómputo',
    plan_3_f4: '<em>No incluye acceso remoto desde casa o celular</em>',
    btn_calc_lab: 'Calcular por Equipos',

    hub_badge: '<i class="fa-solid fa-comments"></i> CONVERSACIÓN DIRECTA &bull; DIAGNÓSTICO INSTITUCIONAL',
    hub_title: '¿Cuántos equipos tienen entre todos sus laboratorios?',
    hub_desc: 'Y si te late, lo vemos <strong>15 min por Zoom</strong> y te muestro el portal en vivo, las 25 carreras y el panel docente.',
    calc_lbl_input: '<i class="fa-solid fa-desktop" style="color:#38bdf8;"></i> <span>Número de computadoras en laboratorios:</span>',
    calc_lbl_unit: 'equipos',
    calc_res_lbl_op3: 'Inversión Opción 3 (Solo Lab):',
    calc_res_sub_op3: '($1,000 por equipo / cuatrimestre)',
    calc_res_lbl_op1: 'Inversión Opción 1 (Piloto Total):',
    calc_res_sub_op1: '¡Incluye acceso en casa/celular para los 1,500 alumnos!',
    btn_whatsapp: 'Contactar por WhatsApp Directo',
    btn_zoom: 'Agendar 15 min por Zoom',
    btn_email: 'Enviar Correo Oficial',

    modal_zoom_title: 'Agendar Sesión de 15 min en Zoom',
    modal_zoom_desc: 'Demostración ejecutiva del portal stemOS, recorrido por las 25 carreras de 60 horas y revisión del panel docente de seguimiento de grupos.',
    modal_zoom_calendly: '<i class="fa-solid fa-calendar-check" style="margin-right:6px;"></i> Agenda inmediata disponible vía <strong>Calendly</strong>',
    modal_zoom_btn: 'Abrir Calendly <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7rem;"></i>',

    footer_brand_desc: 'Plataforma avanzada de Inglés para Fines Específicos (ESP) desarrollada para manufactura de semiconductores, electromovilidad, aeroespacial y tecnologías de alta precisión.',
    footer_title_esp: 'Especialidades ESP',
    footer_title_platform: 'Plataforma',
    footer_link_top: 'Volver Arriba',
    footer_link_campus: 'Campus del Estudiante',
    footer_link_cache: 'Actualizar Caché PWA',
    footer_copy: '&copy; 2026 stemOS &bull; Todos los derechos reservados.',
    footer_dev: 'Desarrollado con Supaste-Engine &bull; PWA Offline First'
  }
};

console.log(`✅ Loaded complete dictionaries: EN keys = ${Object.keys(STEMOS_I18N.en).length}, ES keys = ${Object.keys(STEMOS_I18N.es).length}`);

// Ensure key symmetry
for (const k of Object.keys(STEMOS_I18N.en)) {
  if (!STEMOS_I18N.es[k]) throw new Error(`Missing ES key for: ${k}`);
}
for (const k of Object.keys(STEMOS_I18N.es)) {
  if (!STEMOS_I18N.en[k]) throw new Error(`Missing EN key for: ${k}`);
}

// ── 2. DOM TRANSFORMATION & ATTRIBUTE INJECTION ──
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const document = dom.window.document;

// Head title & meta
const titleEl = document.querySelector('title');
if (titleEl) {
  titleEl.setAttribute('data-i18n', 'head_title');
  titleEl.textContent = STEMOS_I18N.en.head_title;
}

// Language switch buttons
const btnEn = document.getElementById('lang-btn-en');
const btnEs = document.getElementById('lang-btn-es');
if (btnEn && btnEs) {
  btnEn.className = 'lang-btn active';
  btnEs.className = 'lang-btn';
}

// Mobile navigation links
const mobGroupTitles = document.querySelectorAll('.mobile-nav-group-title');
if (mobGroupTitles.length >= 2) {
  mobGroupTitles[0].setAttribute('data-i18n', 'mob_nav_portals');
  mobGroupTitles[0].innerHTML = STEMOS_I18N.en.mob_nav_portals;
  mobGroupTitles[1].setAttribute('data-i18n', 'mob_nav_cat_group');
  mobGroupTitles[1].innerHTML = STEMOS_I18N.en.mob_nav_cat_group;
}

const mobLinks = document.querySelectorAll('.mobile-nav-content a.mobile-nav-item');
mobLinks.forEach(a => {
  const href = a.getAttribute('href') || '';
  let key = null;
  if (href.includes('admin.html')) key = 'mob_nav_admin';
  else if (href.includes('teacher.html')) key = 'mob_nav_teacher';
  else if (href.includes('register.html')) key = 'mob_nav_register';
  else if (href.includes('app.html')) key = 'mob_nav_app';
  else if (href.includes('pricing-institutional-section')) key = 'mob_nav_pricing';
  else if (href.includes('tracks.html')) key = 'mob_nav_catalog';
  else if (href.includes('student-cx-journey-section')) key = 'mob_nav_cx';
  else if (href.includes('institutional-academic-section')) key = 'mob_nav_academic';
  else if (href.includes('industry-standards-section')) key = 'mob_nav_standards';

  if (key) {
    const icon = a.querySelector('i');
    const iconHtml = icon ? icon.outerHTML + ' ' : '';
    a.innerHTML = `${iconHtml}<span data-i18n="${key}">${STEMOS_I18N.en[key]}</span>`;
  }
});

// Hero subtitle
const heroSub = document.querySelector('.supaste-hero-subtitle');
if (heroSub) {
  heroSub.setAttribute('data-i18n', 'hero_subtitle');
  heroSub.innerHTML = STEMOS_I18N.en.hero_subtitle;
}

// Hero CTAs
const btnTakePlacement = document.getElementById('hero-btn-take-placement');
if (btnTakePlacement) {
  const span = btnTakePlacement.querySelector('span');
  if (span) { span.setAttribute('data-i18n', 'btn_take_placement'); span.textContent = STEMOS_I18N.en.btn_take_placement; }
}

const btnExploreTracks = document.querySelector('.supaste-hero-actions a.supaste-btn-primary');
if (btnExploreTracks) {
  const span = btnExploreTracks.querySelector('span');
  if (span) { span.setAttribute('data-i18n', 'btn_tracks'); span.textContent = STEMOS_I18N.en.btn_tracks; }
}

const btnHeroPricing = document.getElementById('hero-btn-view-pricing');
if (btnHeroPricing) {
  const span = btnHeroPricing.querySelector('span');
  if (span) { span.setAttribute('data-i18n', 'btn_pricing'); span.textContent = STEMOS_I18N.en.btn_pricing; }
}

// Hero Simulators Dock
const dockTitleSpan = document.querySelector('.dock-badge-title span:last-child');
if (dockTitleSpan) {
  dockTitleSpan.setAttribute('data-i18n', 'dock_title');
  dockTitleSpan.textContent = STEMOS_I18N.en.dock_title;
}

// Metrics strip labels
const metricPills = document.querySelectorAll('.supaste-metrics-strip .metric-pill');
const metricKeys = ['stat_lbl_tracks', 'stat_lbl_modules', 'stat_lbl_readings', 'stat_lbl_questions', 'stat_lbl_phrases', 'stat_lbl_cases', 'stat_lbl_accents', 'stat_lbl_offline'];
metricPills.forEach((p, i) => {
  if (metricKeys[i]) {
    const lbl = p.querySelector('.metric-lbl');
    if (lbl) {
      lbl.setAttribute('data-i18n', metricKeys[i]);
      lbl.textContent = STEMOS_I18N.en[metricKeys[i]];
    }
  }
});

// Showcase stage window
const winTitle = document.querySelector('.supaste-stage-window .window-title span');
if (winTitle) {
  winTitle.setAttribute('data-i18n', 'stage_title');
  winTitle.innerHTML = STEMOS_I18N.en.stage_title;
}
const stageLevel = document.getElementById('hero-stage-level');
if (stageLevel) {
  stageLevel.setAttribute('data-i18n', 'stage_level');
  stageLevel.textContent = STEMOS_I18N.en.stage_level;
}
const stageStdSpan = document.querySelector('.win-tag-conocer span') || document.querySelector('.win-tag-conocer');
if (stageStdSpan) {
  const icon = stageStdSpan.querySelector('i');
  stageStdSpan.innerHTML = (icon ? icon.outerHTML + ' ' : '') + `<span data-i18n="stage_std">${STEMOS_I18N.en.stage_std}</span>`;
}
const stageSpeaker = document.querySelector('.stage-track-info .stage-speaker');
if (stageSpeaker) {
  stageSpeaker.setAttribute('data-i18n', 'stage_speaker');
  stageSpeaker.innerHTML = STEMOS_I18N.en.stage_speaker;
}
const stageReadingTitle = document.querySelector('.stage-track-info .stage-reading-title');
if (stageReadingTitle) {
  stageReadingTitle.setAttribute('data-i18n', 'stage_reading_title');
  stageReadingTitle.textContent = STEMOS_I18N.en.stage_reading_title;
}
const stageSocratic = document.querySelector('.stage-socratic-badge');
if (stageSocratic) {
  stageSocratic.setAttribute('data-i18n', 'stage_socratic');
  stageSocratic.innerHTML = STEMOS_I18N.en.stage_socratic;
}
const stageOpenBtnSpan = document.querySelector('#hero-stage-open-btn span');
if (stageOpenBtnSpan) {
  stageOpenBtnSpan.setAttribute('data-i18n', 'stage_btn_open');
  stageOpenBtnSpan.textContent = STEMOS_I18N.en.stage_btn_open;
}

// ── Value Proposition Section ──
const valSec = document.getElementById('value-proposition');
if (valSec) {
  const badge = valSec.querySelector('.section-badge');
  if (badge) { badge.setAttribute('data-i18n', 'val_badge'); badge.innerHTML = STEMOS_I18N.en.val_badge; }
  const title = valSec.querySelector('.section-title');
  if (title) { title.setAttribute('data-i18n', 'val_title'); title.textContent = STEMOS_I18N.en.val_title; }
  const sub = valSec.querySelector('.section-subtitle');
  if (sub) { sub.setAttribute('data-i18n', 'val_subtitle'); sub.textContent = STEMOS_I18N.en.val_subtitle; }

  // Bento cards
  const cards = valSec.querySelectorAll('.promo-card');
  if (cards.length >= 3) {
    cards[0].querySelector('.promo-card-title').setAttribute('data-i18n', 'val_card1_title');
    cards[0].querySelector('.promo-card-title').innerHTML = STEMOS_I18N.en.val_card1_title;
    cards[0].querySelector('.promo-card-desc').setAttribute('data-i18n', 'val_card1_desc');
    cards[0].querySelector('.promo-card-desc').textContent = STEMOS_I18N.en.val_card1_desc;

    cards[1].querySelector('.promo-card-title').setAttribute('data-i18n', 'val_card2_title');
    cards[1].querySelector('.promo-card-title').innerHTML = STEMOS_I18N.en.val_card2_title;
    cards[1].querySelector('.promo-card-desc').setAttribute('data-i18n', 'val_card2_desc');
    cards[1].querySelector('.promo-card-desc').textContent = STEMOS_I18N.en.val_card2_desc;

    cards[2].querySelector('.promo-card-title').setAttribute('data-i18n', 'val_card3_title');
    cards[2].querySelector('.promo-card-title').innerHTML = STEMOS_I18N.en.val_card3_title;
    cards[2].querySelector('.promo-card-desc').setAttribute('data-i18n', 'val_card3_desc');
    cards[2].querySelector('.promo-card-desc').textContent = STEMOS_I18N.en.val_card3_desc;
  }

  // 4 Pillars
  const methBadge = valSec.querySelector('.methodology-header .section-badge');
  if (methBadge) { methBadge.setAttribute('data-i18n', 'val_meth_badge'); methBadge.innerHTML = STEMOS_I18N.en.val_meth_badge; }
  const methTitle = valSec.querySelector('.methodology-title');
  if (methTitle) { methTitle.setAttribute('data-i18n', 'val_meth_title'); methTitle.textContent = STEMOS_I18N.en.val_meth_title; }
  const methIntro = valSec.querySelector('.methodology-intro');
  if (methIntro) { methIntro.setAttribute('data-i18n', 'val_meth_intro'); methIntro.textContent = STEMOS_I18N.en.val_meth_intro; }

  const pillars = valSec.querySelectorAll('.method-pillar');
  if (pillars.length >= 4) {
    pillars[0].querySelector('.pillar-title').setAttribute('data-i18n', 'val_pillar1_title');
    pillars[0].querySelector('.pillar-title').textContent = STEMOS_I18N.en.val_pillar1_title;
    pillars[0].querySelector('.pillar-desc').setAttribute('data-i18n', 'val_pillar1_desc');
    pillars[0].querySelector('.pillar-desc').textContent = STEMOS_I18N.en.val_pillar1_desc;

    pillars[1].querySelector('.pillar-title').setAttribute('data-i18n', 'val_pillar2_title');
    pillars[1].querySelector('.pillar-title').textContent = STEMOS_I18N.en.val_pillar2_title;
    pillars[1].querySelector('.pillar-desc').setAttribute('data-i18n', 'val_pillar2_desc');
    pillars[1].querySelector('.pillar-desc').textContent = STEMOS_I18N.en.val_pillar2_desc;

    pillars[2].querySelector('.pillar-title').setAttribute('data-i18n', 'val_pillar3_title');
    pillars[2].querySelector('.pillar-title').innerHTML = STEMOS_I18N.en.val_pillar3_title;
    pillars[2].querySelector('.pillar-desc').setAttribute('data-i18n', 'val_pillar3_desc');
    pillars[2].querySelector('.pillar-desc').textContent = STEMOS_I18N.en.val_pillar3_desc;

    pillars[3].querySelector('.pillar-title').setAttribute('data-i18n', 'val_pillar4_title');
    pillars[3].querySelector('.pillar-title').textContent = STEMOS_I18N.en.val_pillar4_title;
    pillars[3].querySelector('.pillar-desc').setAttribute('data-i18n', 'val_pillar4_desc');
    pillars[3].querySelector('.pillar-desc').textContent = STEMOS_I18N.en.val_pillar4_desc;
  }

  const stripLbl = valSec.querySelector('.standards-strip-label');
  if (stripLbl) { stripLbl.setAttribute('data-i18n', 'val_strip_lbl'); stripLbl.innerHTML = STEMOS_I18N.en.val_strip_lbl; }
}

// ── Industry Standards Section ──
const stdSec = document.getElementById('industry-standards-section');
if (stdSec) {
  const badge = stdSec.querySelector('.section-badge.badge-industry-standards');
  if (badge) { badge.setAttribute('data-i18n', 'std_badge'); badge.innerHTML = STEMOS_I18N.en.std_badge; }
  const title = stdSec.querySelector('.section-title');
  if (title) { title.setAttribute('data-i18n', 'std_title'); title.innerHTML = STEMOS_I18N.en.std_title; }
  const sub = stdSec.querySelector('.section-subtitle');
  if (sub) { sub.setAttribute('data-i18n', 'std_subtitle'); sub.innerHTML = STEMOS_I18N.en.std_subtitle; }

  // Left col (academic)
  const acadCol = stdSec.querySelector('.col-academic');
  if (acadCol) {
    const b = acadCol.querySelector('.reality-badge-academic');
    if (b) { b.setAttribute('data-i18n', 'std_acad_badge'); b.innerHTML = STEMOS_I18N.en.std_acad_badge; }
    const t = acadCol.querySelector('.reality-col-title');
    if (t) { t.setAttribute('data-i18n', 'std_acad_title'); t.textContent = STEMOS_I18N.en.std_acad_title; }
    const d = acadCol.querySelector('.reality-col-desc');
    if (d) { d.setAttribute('data-i18n', 'std_acad_desc'); d.textContent = STEMOS_I18N.en.std_acad_desc; }

    const pts = acadCol.querySelectorAll('.reality-point-body');
    const acadPtKeys = ['std_acad_pt1', 'std_acad_pt2', 'std_acad_pt3', 'std_acad_pt4', 'std_acad_pt5'];
    pts.forEach((pt, i) => {
      if (acadPtKeys[i]) { pt.setAttribute('data-i18n', acadPtKeys[i]); pt.innerHTML = STEMOS_I18N.en[acadPtKeys[i]]; }
    });

    const f = acadCol.querySelector('.reality-col-footer');
    if (f) { f.setAttribute('data-i18n', 'std_acad_footer'); f.innerHTML = STEMOS_I18N.en.std_acad_footer; }
  }

  // Right col (industry)
  const indCol = stdSec.querySelector('.col-industry');
  if (indCol) {
    const b = indCol.querySelector('.reality-badge-industry');
    if (b) { b.setAttribute('data-i18n', 'std_ind_badge'); b.innerHTML = STEMOS_I18N.en.std_ind_badge; }
    const t = indCol.querySelector('.reality-col-title');
    if (t) { t.setAttribute('data-i18n', 'std_ind_title'); t.textContent = STEMOS_I18N.en.std_ind_title; }
    const d = indCol.querySelector('.reality-col-desc');
    if (d) { d.setAttribute('data-i18n', 'std_ind_desc'); d.textContent = STEMOS_I18N.en.std_ind_desc; }

    const pts = indCol.querySelectorAll('.reality-point-body');
    const indPtKeys = ['std_ind_pt1', 'std_ind_pt2', 'std_ind_pt3', 'std_ind_pt4', 'std_ind_pt5'];
    pts.forEach((pt, i) => {
      if (indPtKeys[i]) { pt.setAttribute('data-i18n', indPtKeys[i]); pt.innerHTML = STEMOS_I18N.en[indPtKeys[i]]; }
    });

    const f = indCol.querySelector('.reality-col-footer');
    if (f) { f.setAttribute('data-i18n', 'std_ind_footer'); f.innerHTML = STEMOS_I18N.en.std_ind_footer; }
  }

  // 6 Clusters
  const clBadge = stdSec.querySelector('.standards-clusters-header .section-badge');
  if (clBadge) { clBadge.setAttribute('data-i18n', 'std_clust_badge'); clBadge.innerHTML = STEMOS_I18N.en.std_clust_badge; }
  const clTitle = stdSec.querySelector('.standards-clusters-title');
  if (clTitle) { clTitle.setAttribute('data-i18n', 'std_clust_title'); clTitle.textContent = STEMOS_I18N.en.std_clust_title; }
  const clDesc = stdSec.querySelector('.standards-clusters-desc');
  if (clDesc) { clDesc.setAttribute('data-i18n', 'std_clust_desc'); clDesc.textContent = STEMOS_I18N.en.std_clust_desc; }

  const clCards = stdSec.querySelectorAll('.std-cluster-card');
  const clKeys = [
    { title: 'std_c1_title', desc: 'std_c1_desc' },
    { title: 'std_c2_title', desc: 'std_c2_desc' },
    { title: 'std_c3_title', desc: 'std_c3_desc' },
    { title: 'std_c4_title', desc: 'std_c4_desc' },
    { title: 'std_c5_title', desc: 'std_c5_desc' },
    { title: 'std_c6_title', desc: 'std_c6_desc' }
  ];
  clCards.forEach((c, i) => {
    if (clKeys[i]) {
      const h = c.querySelector('.std-cluster-name');
      if (h) { h.setAttribute('data-i18n', clKeys[i].title); h.innerHTML = STEMOS_I18N.en[clKeys[i].title]; }
      const p = c.querySelector('.std-cluster-text');
      if (p) { p.setAttribute('data-i18n', clKeys[i].desc); p.textContent = STEMOS_I18N.en[clKeys[i].desc]; }
    }
  });

  // Drill widget
  const drillTag = stdSec.querySelector('.drill-tag');
  if (drillTag) { drillTag.setAttribute('data-i18n', 'std_drill_tag'); drillTag.innerHTML = STEMOS_I18N.en.std_drill_tag; }
  const drillTitle = stdSec.querySelector('.drill-title');
  if (drillTitle) { drillTitle.setAttribute('data-i18n', 'std_drill_title'); drillTitle.textContent = STEMOS_I18N.en.std_drill_title; }
  const btnDrillAcad = document.getElementById('btn-drill-academic');
  if (btnDrillAcad) { btnDrillAcad.setAttribute('data-i18n', 'std_drill_btn_acad'); btnDrillAcad.innerHTML = STEMOS_I18N.en.std_drill_btn_acad; }
  const btnDrillInd = document.getElementById('btn-drill-industry');
  if (btnDrillInd) { btnDrillInd.setAttribute('data-i18n', 'std_drill_btn_ind'); btnDrillInd.innerHTML = STEMOS_I18N.en.std_drill_btn_ind; }
  const drillNote = stdSec.querySelector('.drill-analysis-note');
  if (drillNote) { drillNote.setAttribute('data-i18n', 'std_drill_note'); drillNote.innerHTML = STEMOS_I18N.en.std_drill_note; }

  // Stats bar
  const statLabels = stdSec.querySelectorAll('.standards-stats-bar .std-stat-label');
  const statKeys = ['std_stat1_lbl', 'std_stat2_lbl', 'std_stat3_lbl', 'std_stat4_lbl'];
  statLabels.forEach((l, i) => {
    if (statKeys[i]) { l.setAttribute('data-i18n', statKeys[i]); l.textContent = STEMOS_I18N.en[statKeys[i]]; }
  });
}

// ── Institutional Academic Ecosystem Section ──
const instSec = document.getElementById('institutional-academic-section');
if (instSec) {
  const badge = instSec.querySelector('.section-badge.badge-academic-ecosystem');
  if (badge) { badge.setAttribute('data-i18n', 'inst_badge'); badge.innerHTML = STEMOS_I18N.en.inst_badge; }
  const title = instSec.querySelector('.section-title');
  if (title) { title.setAttribute('data-i18n', 'inst_title'); title.innerHTML = STEMOS_I18N.en.inst_title; }
  const sub = instSec.querySelector('.section-subtitle');
  if (sub) { sub.setAttribute('data-i18n', 'inst_subtitle'); sub.innerHTML = STEMOS_I18N.en.inst_subtitle; }

  const portalCards = instSec.querySelectorAll('.inst-portal-card');
  const pKeys = [
    { title: 'inst_portal_admin_title', desc: 'inst_portal_admin_desc', action: 'inst_portal_action_open' },
    { title: 'inst_portal_teacher_title', desc: 'inst_portal_teacher_desc', action: 'inst_portal_action_open' },
    { title: 'inst_portal_register_title', desc: 'inst_portal_register_desc', action: 'inst_portal_action_start' },
    { title: 'inst_portal_app_title', desc: 'inst_portal_app_desc', action: 'inst_portal_action_enter' }
  ];
  portalCards.forEach((c, i) => {
    if (pKeys[i]) {
      const t = c.querySelector('.inst-portal-title');
      if (t) { t.setAttribute('data-i18n', pKeys[i].title); t.innerHTML = STEMOS_I18N.en[pKeys[i].title]; }
      const d = c.querySelector('.inst-portal-desc');
      if (d) { d.setAttribute('data-i18n', pKeys[i].desc); d.textContent = STEMOS_I18N.en[pKeys[i].desc]; }
      const a = c.querySelector('.inst-portal-action span');
      if (a) { a.setAttribute('data-i18n', pKeys[i].action); a.textContent = STEMOS_I18N.en[pKeys[i].action]; }
    }
  });

  // Filters
  const filters = instSec.querySelectorAll('.inst-filter-btn');
  const filterKeys = ['inst_filter_all', 'inst_filter_tecnm', 'inst_filter_ut', 'inst_filter_estatales', 'inst_filter_latam'];
  filters.forEach((f, i) => {
    if (filterKeys[i]) {
      f.setAttribute('data-i18n', filterKeys[i]);
      f.innerHTML = STEMOS_I18N.en[filterKeys[i]];
    }
  });
}

// Catalog Preview Banner
const catBanner = document.getElementById('catalog-preview-banner');
if (catBanner) {
  const b = catBanner.querySelector('.preview-banner-badge');
  if (b) { b.setAttribute('data-i18n', 'cat_preview_badge'); b.innerHTML = STEMOS_I18N.en.cat_preview_badge; }
  const t = catBanner.querySelector('.preview-banner-title');
  if (t) { t.setAttribute('data-i18n', 'cat_preview_title'); t.innerHTML = STEMOS_I18N.en.cat_preview_title; }
  const d = catBanner.querySelector('.preview-banner-desc');
  if (d) { d.setAttribute('data-i18n', 'cat_preview_desc'); d.textContent = STEMOS_I18N.en.cat_preview_desc; }
  const btn = catBanner.querySelector('.btn-open-tracks-studio');
  if (btn) { btn.setAttribute('data-i18n', 'cat_preview_btn'); btn.innerHTML = STEMOS_I18N.en.cat_preview_btn; }
}

// ── Student CX Journey Section ──
const cxSec = document.getElementById('student-cx-journey-section');
if (cxSec) {
  const badge = cxSec.querySelector('.section-badge.badge-cx-journey');
  if (badge) { badge.setAttribute('data-i18n', 'badge_cx_journey'); badge.innerHTML = STEMOS_I18N.en.badge_cx_journey; }
  const title = cxSec.querySelector('.section-title');
  if (title) { title.setAttribute('data-i18n', 'title_cx_journey'); title.innerHTML = STEMOS_I18N.en.title_cx_journey; }
  const sub = cxSec.querySelector('.section-subtitle');
  if (sub) { sub.setAttribute('data-i18n', 'subtitle_cx_journey'); sub.textContent = STEMOS_I18N.en.subtitle_cx_journey; }

  // Step 1
  const s1Badge = cxSec.querySelector('#cx-card-step-1 .cx-step-tag');
  if (s1Badge) { s1Badge.setAttribute('data-i18n', 'cx_step1_badge'); s1Badge.innerHTML = STEMOS_I18N.en.cx_step1_badge; }
  const s1Title = cxSec.querySelector('#cx-card-step-1 .cx-step-title');
  if (s1Title) { s1Title.setAttribute('data-i18n', 'cx_step1_title'); s1Title.innerHTML = STEMOS_I18N.en.cx_step1_title; }
  const s1Desc = cxSec.querySelector('#cx-card-step-1 .cx-step-desc');
  if (s1Desc) { s1Desc.setAttribute('data-i18n', 'cx_step1_desc'); s1Desc.textContent = STEMOS_I18N.en.cx_step1_desc; }
  const s1Btn = cxSec.querySelector('#cx-card-step-1 .cx-step-btn');
  if (s1Btn) { s1Btn.setAttribute('data-i18n', 'cx_step1_btn'); s1Btn.textContent = STEMOS_I18N.en.cx_step1_btn; }

  // Step 2
  const s2Badge = cxSec.querySelector('#cx-card-step-2 .cx-step-tag');
  if (s2Badge) { s2Badge.setAttribute('data-i18n', 'cx_step2_badge'); s2Badge.innerHTML = STEMOS_I18N.en.cx_step2_badge; }
  const s2Title = cxSec.querySelector('#cx-card-step-2 .cx-step-title');
  if (s2Title) { s2Title.setAttribute('data-i18n', 'cx_step2_title'); s2Title.innerHTML = STEMOS_I18N.en.cx_step2_title; }
  const s2Desc = cxSec.querySelector('#cx-card-step-2 .cx-step-desc');
  if (s2Desc) { s2Desc.setAttribute('data-i18n', 'cx_step2_desc'); s2Desc.textContent = STEMOS_I18N.en.cx_step2_desc; }
  const s2Btn = cxSec.querySelector('#cx-card-step-2 .cx-step-btn');
  if (s2Btn) { s2Btn.setAttribute('data-i18n', 'cx_step2_btn'); s2Btn.textContent = STEMOS_I18N.en.cx_step2_btn; }

  // Step 3
  const s3Badge = cxSec.querySelector('#cx-card-step-3 .cx-step-tag');
  if (s3Badge) { s3Badge.setAttribute('data-i18n', 'cx_step3_badge'); s3Badge.innerHTML = STEMOS_I18N.en.cx_step3_badge; }
  const s3Title = cxSec.querySelector('#cx-card-step-3 .cx-step-title');
  if (s3Title) { s3Title.setAttribute('data-i18n', 'cx_step3_title'); s3Title.innerHTML = STEMOS_I18N.en.cx_step3_title; }
  const s3Desc = cxSec.querySelector('#cx-card-step-3 .cx-step-desc');
  if (s3Desc) { s3Desc.setAttribute('data-i18n', 'cx_step3_desc'); s3Desc.textContent = STEMOS_I18N.en.cx_step3_desc; }
  const s3Btn = cxSec.querySelector('#cx-card-step-3 .cx-step-btn');
  if (s3Btn) { s3Btn.setAttribute('data-i18n', 'cx_step3_btn'); s3Btn.textContent = STEMOS_I18N.en.cx_step3_btn; }

  // Step 4
  const s4Badge = cxSec.querySelector('#cx-card-step-4 .cx-step-tag');
  if (s4Badge) { s4Badge.setAttribute('data-i18n', 'cx_step4_badge'); s4Badge.innerHTML = STEMOS_I18N.en.cx_step4_badge; }
  const s4Title = cxSec.querySelector('#cx-card-step-4 .cx-step-title');
  if (s4Title) { s4Title.setAttribute('data-i18n', 'cx_step4_title'); s4Title.innerHTML = STEMOS_I18N.en.cx_step4_title; }
  const s4Desc = cxSec.querySelector('#cx-card-step-4 .cx-step-desc');
  if (s4Desc) { s4Desc.setAttribute('data-i18n', 'cx_step4_desc'); s4Desc.textContent = STEMOS_I18N.en.cx_step4_desc; }
  const s4Btn = cxSec.querySelector('#cx-card-step-4 .cx-step-btn');
  if (s4Btn) { s4Btn.setAttribute('data-i18n', 'cx_step4_btn'); s4Btn.textContent = STEMOS_I18N.en.cx_step4_btn; }

  // Summary banner
  const cxTitle = cxSec.querySelector('.cx-summary-title');
  if (cxTitle) { cxTitle.setAttribute('data-i18n', 'cx_banner_title'); cxTitle.textContent = STEMOS_I18N.en.cx_banner_title; }
  const cxDesc = cxSec.querySelector('.cx-summary-desc');
  if (cxDesc) { cxDesc.setAttribute('data-i18n', 'cx_banner_desc'); cxDesc.textContent = STEMOS_I18N.en.cx_banner_desc; }

  const cxBtns = cxSec.querySelectorAll('.cx-journey-summary-bar a.btn-signup-pill');
  if (cxBtns.length >= 2) {
    cxBtns[0].setAttribute('data-i18n', 'cx_btn_placement');
    cxBtns[0].innerHTML = STEMOS_I18N.en.cx_btn_placement;
    cxBtns[1].setAttribute('data-i18n', 'cx_btn_google');
    cxBtns[1].innerHTML = STEMOS_I18N.en.cx_btn_google;
  }
}

// ── Pricing Section ──
const prSec = document.getElementById('pricing-institutional-section');
if (prSec) {
  const badge = prSec.querySelector('.section-badge.badge-pricing-institutional');
  if (badge) { badge.setAttribute('data-i18n', 'pricing_badge'); badge.innerHTML = STEMOS_I18N.en.pricing_badge; }
  const title = prSec.querySelector('.section-title');
  if (title) { title.setAttribute('data-i18n', 'pricing_title'); title.innerHTML = STEMOS_I18N.en.pricing_title; }
  const sub = prSec.querySelector('.section-subtitle');
  if (sub) { sub.setAttribute('data-i18n', 'pricing_subtitle'); sub.textContent = STEMOS_I18N.en.pricing_subtitle; }

  const memo = prSec.querySelector('.pricing-memo-quote');
  if (memo) { memo.setAttribute('data-i18n', 'memo_quote'); memo.innerHTML = STEMOS_I18N.en.memo_quote; }
  const memoTag = prSec.querySelector('.pricing-memo-tag');
  if (memoTag) { memoTag.setAttribute('data-i18n', 'memo_tag'); memoTag.innerHTML = STEMOS_I18N.en.memo_tag; }

  // Cards
  const pCards = prSec.querySelectorAll('.pricing-card');
  if (pCards.length === 4) {
    // Individual
    const c0Badge = pCards[0].querySelector('.pricing-card-badge-individual');
    if (c0Badge) { c0Badge.setAttribute('data-i18n', 'plan_indiv_badge'); c0Badge.innerHTML = STEMOS_I18N.en.plan_indiv_badge; }
    const c0Tag = pCards[0].querySelector('.pricing-plan-tag');
    if (c0Tag) { c0Tag.setAttribute('data-i18n', 'plan_indiv_tag'); c0Tag.innerHTML = STEMOS_I18N.en.plan_indiv_tag; }
    const c0Name = pCards[0].querySelector('.pricing-plan-name');
    if (c0Name) { c0Name.setAttribute('data-i18n', 'plan_individual_name'); c0Name.textContent = STEMOS_I18N.en.plan_individual_name; }
    const c0Sum = pCards[0].querySelector('.pricing-plan-summary');
    if (c0Sum) { c0Sum.setAttribute('data-i18n', 'plan_individual_summary'); c0Sum.textContent = STEMOS_I18N.en.plan_individual_summary; }
    const c0Per = pCards[0].querySelector('.pricing-period');
    if (c0Per) { c0Per.setAttribute('data-i18n', 'plan_indiv_period'); c0Per.innerHTML = STEMOS_I18N.en.plan_indiv_period; }
    const c0Met = pCards[0].querySelector('.pricing-unit-metric');
    if (c0Met) { c0Met.setAttribute('data-i18n', 'plan_indiv_metric'); c0Met.innerHTML = STEMOS_I18N.en.plan_indiv_metric; }
    const c0Feats = pCards[0].querySelectorAll('.pricing-features-list li span');
    const c0FeatKeys = ['plan_indiv_f1', 'plan_indiv_f2', 'plan_indiv_f3', 'plan_indiv_f4', 'plan_indiv_f5', 'plan_indiv_f6'];
    c0Feats.forEach((f, i) => { if (c0FeatKeys[i]) { f.setAttribute('data-i18n', c0FeatKeys[i]); f.innerHTML = STEMOS_I18N.en[c0FeatKeys[i]]; } });
    const c0Btn = pCards[0].querySelector('.pricing-card-action button span');
    if (c0Btn) { c0Btn.setAttribute('data-i18n', 'btn_pay_individual'); c0Btn.textContent = STEMOS_I18N.en.btn_pay_individual; }
    const c0Sub = pCards[0].querySelector('.pricing-card-sublink span');
    if (c0Sub) { c0Sub.setAttribute('data-i18n', 'sublink_register_free'); c0Sub.innerHTML = STEMOS_I18N.en.sublink_register_free; }

    // Plan 1 (Piloto)
    const c1Badge = pCards[1].querySelector('.pricing-card-badge-glow');
    if (c1Badge) { c1Badge.setAttribute('data-i18n', 'plan_1_badge'); c1Badge.innerHTML = STEMOS_I18N.en.plan_1_badge; }
    const c1Tag = pCards[1].querySelector('.pricing-plan-tag');
    if (c1Tag) { c1Tag.setAttribute('data-i18n', 'plan_1_tag'); c1Tag.innerHTML = STEMOS_I18N.en.plan_1_tag; }
    const c1Name = pCards[1].querySelector('.pricing-plan-name');
    if (c1Name) { c1Name.setAttribute('data-i18n', 'plan_1_name'); c1Name.textContent = STEMOS_I18N.en.plan_1_name; }
    const c1Sum = pCards[1].querySelector('.pricing-plan-summary');
    if (c1Sum) { c1Sum.setAttribute('data-i18n', 'plan_1_summary'); c1Sum.textContent = STEMOS_I18N.en.plan_1_summary; }
    const c1Per = pCards[1].querySelector('.pricing-period');
    if (c1Per) { c1Per.setAttribute('data-i18n', 'plan_1_period'); c1Per.textContent = STEMOS_I18N.en.plan_1_period; }
    const c1Met = pCards[1].querySelector('.pricing-unit-metric');
    if (c1Met) { c1Met.setAttribute('data-i18n', 'plan_1_metric'); c1Met.innerHTML = STEMOS_I18N.en.plan_1_metric; }
    const c1Feats = pCards[1].querySelectorAll('.pricing-features-list li span');
    const c1FeatKeys = ['plan_1_f1', 'plan_1_f2', 'plan_1_f3', 'plan_1_f4', 'plan_1_f5', 'plan_1_f6'];
    c1Feats.forEach((f, i) => { if (c1FeatKeys[i]) { f.setAttribute('data-i18n', c1FeatKeys[i]); f.innerHTML = STEMOS_I18N.en[c1FeatKeys[i]]; } });
    const c1Btn = pCards[1].querySelector('.pricing-card-action a');
    if (c1Btn) { c1Btn.setAttribute('data-i18n', 'btn_plan_1'); c1Btn.innerHTML = STEMOS_I18N.en.btn_plan_1; }

    // Plan 2 (Anual)
    const c2Badge = pCards[2].querySelector('.pricing-card-badge-normal');
    if (c2Badge) { c2Badge.setAttribute('data-i18n', 'plan_2_badge'); c2Badge.innerHTML = STEMOS_I18N.en.plan_2_badge; }
    const c2Tag = pCards[2].querySelector('.pricing-plan-tag');
    if (c2Tag) { c2Tag.setAttribute('data-i18n', 'plan_2_tag'); c2Tag.innerHTML = STEMOS_I18N.en.plan_2_tag; }
    const c2Name = pCards[2].querySelector('.pricing-plan-name');
    if (c2Name) { c2Name.setAttribute('data-i18n', 'plan_2_name'); c2Name.textContent = STEMOS_I18N.en.plan_2_name; }
    const c2Sum = pCards[2].querySelector('.pricing-plan-summary');
    if (c2Sum) { c2Sum.setAttribute('data-i18n', 'plan_2_summary'); c2Sum.textContent = STEMOS_I18N.en.plan_2_summary; }
    const c2Per = pCards[2].querySelector('.pricing-period');
    if (c2Per) { c2Per.setAttribute('data-i18n', 'plan_2_period'); c2Per.textContent = STEMOS_I18N.en.plan_2_period; }
    const c2Met = pCards[2].querySelector('.pricing-unit-metric');
    if (c2Met) { c2Met.setAttribute('data-i18n', 'plan_2_metric'); c2Met.innerHTML = STEMOS_I18N.en.plan_2_metric; }
    const c2Feats = pCards[2].querySelectorAll('.pricing-features-list li span');
    const c2FeatKeys = ['plan_2_f1', 'plan_2_f2', 'plan_2_f3', 'plan_2_f4', 'plan_2_f5'];
    c2Feats.forEach((f, i) => { if (c2FeatKeys[i]) { f.setAttribute('data-i18n', c2FeatKeys[i]); f.innerHTML = STEMOS_I18N.en[c2FeatKeys[i]]; } });
    const c2Btn = pCards[2].querySelector('.pricing-card-action a');
    if (c2Btn) { c2Btn.setAttribute('data-i18n', 'btn_plan_2'); c2Btn.innerHTML = STEMOS_I18N.en.btn_plan_2; }

    // Plan 3 (Lab)
    const c3Badge = pCards[3].querySelector('.pricing-card-badge-muted');
    if (c3Badge) { c3Badge.setAttribute('data-i18n', 'plan_3_badge'); c3Badge.innerHTML = STEMOS_I18N.en.plan_3_badge; }
    const c3Tag = pCards[3].querySelector('.pricing-plan-tag');
    if (c3Tag) { c3Tag.setAttribute('data-i18n', 'plan_3_tag'); c3Tag.innerHTML = STEMOS_I18N.en.plan_3_tag; }
    const c3Name = pCards[3].querySelector('.pricing-plan-name');
    if (c3Name) { c3Name.setAttribute('data-i18n', 'plan_3_name'); c3Name.textContent = STEMOS_I18N.en.plan_3_name; }
    const c3Sum = pCards[3].querySelector('.pricing-plan-summary');
    if (c3Sum) { c3Sum.setAttribute('data-i18n', 'plan_3_summary'); c3Sum.textContent = STEMOS_I18N.en.plan_3_summary; }
    const c3Per = pCards[3].querySelector('.pricing-period');
    if (c3Per) { c3Per.setAttribute('data-i18n', 'plan_3_period'); c3Per.textContent = STEMOS_I18N.en.plan_3_period; }
    const c3Met = pCards[3].querySelector('.pricing-unit-metric');
    if (c3Met) { c3Met.setAttribute('data-i18n', 'plan_3_metric'); c3Met.innerHTML = STEMOS_I18N.en.plan_3_metric; }
    const c3Feats = pCards[3].querySelectorAll('.pricing-features-list li span');
    const c3FeatKeys = ['plan_3_f1', 'plan_3_f2', 'plan_3_f3', 'plan_3_f4'];
    c3Feats.forEach((f, i) => { if (c3FeatKeys[i]) { f.setAttribute('data-i18n', c3FeatKeys[i]); f.innerHTML = STEMOS_I18N.en[c3FeatKeys[i]]; } });
    const c3BtnSpan = pCards[3].querySelector('.pricing-card-action a span');
    if (c3BtnSpan) { c3BtnSpan.setAttribute('data-i18n', 'btn_calc_lab'); c3BtnSpan.textContent = STEMOS_I18N.en.btn_calc_lab; }
  }

  // Calculator Hub
  const hubBadge = prSec.querySelector('.pricing-hub-badge');
  if (hubBadge) { hubBadge.setAttribute('data-i18n', 'hub_badge'); hubBadge.innerHTML = STEMOS_I18N.en.hub_badge; }
  const hubTitle = prSec.querySelector('.pricing-hub-title');
  if (hubTitle) { hubTitle.setAttribute('data-i18n', 'hub_title'); hubTitle.textContent = STEMOS_I18N.en.hub_title; }
  const hubDesc = prSec.querySelector('.pricing-hub-desc');
  if (hubDesc) { hubDesc.setAttribute('data-i18n', 'hub_desc'); hubDesc.innerHTML = STEMOS_I18N.en.hub_desc; }

  const calcLabel = prSec.querySelector('.calc-label');
  if (calcLabel) { calcLabel.setAttribute('data-i18n', 'calc_lbl_input'); calcLabel.innerHTML = STEMOS_I18N.en.calc_lbl_input; }
  const calcUnit = prSec.querySelector('.calc-unit');
  if (calcUnit) { calcUnit.setAttribute('data-i18n', 'calc_lbl_unit'); calcUnit.textContent = STEMOS_I18N.en.calc_lbl_unit; }

  const calcResItems = prSec.querySelectorAll('.calc-res-item');
  if (calcResItems.length >= 2) {
    const lbl0 = calcResItems[0].querySelector('.calc-res-lbl');
    if (lbl0) { lbl0.setAttribute('data-i18n', 'calc_res_lbl_op3'); lbl0.textContent = STEMOS_I18N.en.calc_res_lbl_op3; }
    const sub0 = calcResItems[0].querySelector('.calc-res-sub');
    if (sub0) { sub0.setAttribute('data-i18n', 'calc_res_sub_op3'); sub0.textContent = STEMOS_I18N.en.calc_res_sub_op3; }

    const lbl1 = calcResItems[1].querySelector('.calc-res-lbl');
    if (lbl1) { lbl1.setAttribute('data-i18n', 'calc_res_lbl_op1'); lbl1.textContent = STEMOS_I18N.en.calc_res_lbl_op1; }
    const sub1 = calcResItems[1].querySelector('.calc-res-sub');
    if (sub1) { sub1.setAttribute('data-i18n', 'calc_res_sub_op1'); sub1.textContent = STEMOS_I18N.en.calc_res_sub_op1; }
  }

  const btnWa = prSec.querySelector('.btn-hub-whatsapp span');
  if (btnWa) { btnWa.setAttribute('data-i18n', 'btn_whatsapp'); btnWa.textContent = STEMOS_I18N.en.btn_whatsapp; }
  const btnZoom = prSec.querySelector('.btn-hub-zoom span');
  if (btnZoom) { btnZoom.setAttribute('data-i18n', 'btn_zoom'); btnZoom.textContent = STEMOS_I18N.en.btn_zoom; }
  const btnEmail = prSec.querySelector('.btn-hub-email span');
  if (btnEmail) { btnEmail.setAttribute('data-i18n', 'btn_email'); btnEmail.textContent = STEMOS_I18N.en.btn_email; }
}

// ── Zoom Modal ──
const zoomModal = document.getElementById('stemos-zoom-modal');
if (zoomModal) {
  const zt = zoomModal.querySelector('h3');
  if (zt) { zt.setAttribute('data-i18n', 'modal_zoom_title'); zt.textContent = STEMOS_I18N.en.modal_zoom_title; }
  const zd = zoomModal.querySelector('p');
  if (zd) { zd.setAttribute('data-i18n', 'modal_zoom_desc'); zd.textContent = STEMOS_I18N.en.modal_zoom_desc; }
  const zcal = zoomModal.querySelector('div[style*="background:rgba(11,92,255"] > div');
  if (zcal) { zcal.setAttribute('data-i18n', 'modal_zoom_calendly'); zcal.innerHTML = STEMOS_I18N.en.modal_zoom_calendly; }
  const zbtn = zoomModal.querySelector('div[style*="background:rgba(11,92,255"] > a');
  if (zbtn) { zbtn.setAttribute('data-i18n', 'modal_zoom_btn'); zbtn.innerHTML = STEMOS_I18N.en.modal_zoom_btn; }
}

// ── Footer ──
const footer = document.querySelector('.supaste-footer');
if (footer) {
  const fDesc = footer.querySelector('.footer-desc');
  if (fDesc) { fDesc.setAttribute('data-i18n', 'footer_brand_desc'); fDesc.textContent = STEMOS_I18N.en.footer_brand_desc; }
  const colTitles = footer.querySelectorAll('.footer-col-title');
  if (colTitles.length >= 2) {
    colTitles[0].setAttribute('data-i18n', 'footer_title_esp');
    colTitles[0].textContent = STEMOS_I18N.en.footer_title_esp;
    colTitles[1].setAttribute('data-i18n', 'footer_title_platform');
    colTitles[1].textContent = STEMOS_I18N.en.footer_title_platform;
  }
  const fLinks = footer.querySelectorAll('.footer-links a');
  fLinks.forEach(a => {
    const t = a.textContent.trim();
    if (t === 'Back to Top' || t === 'Volver Arriba') {
      a.setAttribute('data-i18n', 'footer_link_top');
      a.textContent = STEMOS_I18N.en.footer_link_top;
    } else if (t === 'Student Campus' || t === 'Campus del Estudiante') {
      a.setAttribute('data-i18n', 'footer_link_campus');
      a.textContent = STEMOS_I18N.en.footer_link_campus;
    } else if (t === 'Refresh PWA Cache' || t === 'Actualizar Caché PWA') {
      a.setAttribute('data-i18n', 'footer_link_cache');
      a.textContent = STEMOS_I18N.en.footer_link_cache;
    }
  });

  const bSpans = footer.querySelectorAll('.footer-bottom-row span');
  if (bSpans.length >= 2) {
    bSpans[0].setAttribute('data-i18n', 'footer_copy');
    bSpans[0].innerHTML = STEMOS_I18N.en.footer_copy;
    bSpans[1].setAttribute('data-i18n', 'footer_dev');
    bSpans[1].innerHTML = STEMOS_I18N.en.footer_dev;
  }
}

// ── SCRIPT INJECTION ──
function formatJsObject(obj, indent = 4) {
  const pad = ' '.repeat(indent);
  const padInner = ' '.repeat(indent + 2);
  const lines = Object.entries(obj).map(([k, v]) => {
    const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
    if (typeof v === 'object' && v !== null) {
      return `${padInner}${keyStr}: ${formatJsObject(v, indent + 2)}`;
    }
    const escaped = String(v)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '')
      .replace(/\n/g, '\\n');
    return `${padInner}${keyStr}: '${escaped}'`;
  });
  return `{\n${lines.join(',\n')}\n${pad}}`;
}

const updatedScript = `
    // ─── INTERACTIVE LAB CALCULATOR ───
    function updateLabCalc(val) {
      val = parseInt(val, 10) || 0;
      var slider = document.getElementById('slider-lab-equipos');
      var input = document.getElementById('input-lab-equipos');
      if (slider) slider.value = val;
      if (input) input.value = val;
      var totalOp3 = val * 1000;
      var formatted = '$' + totalOp3.toLocaleString('es-MX') + ' MXN + IVA';
      var calcEl = document.getElementById('calc-val-op3');
      if (calcEl) calcEl.textContent = formatted;
    }

    // ─── ZOOM MODAL CONTROLS ───
    function openZoomDemoModal() {
      var modal = document.getElementById('stemos-zoom-modal');
      if (modal) modal.style.display = 'flex';
    }
    function closeZoomDemoModal() {
      var modal = document.getElementById('stemos-zoom-modal');
      if (modal) modal.style.display = 'none';
    }
    function submitZoomRequest(e) {
      if (e && e.preventDefault) e.preventDefault();
      var form = document.getElementById('zoom-demo-form');
      var success = document.getElementById('zoom-success-msg');
      if (form) form.style.display = 'none';
      if (success) success.style.display = 'block';
      setTimeout(function() {
        closeZoomDemoModal();
        if (form) form.style.display = 'flex';
        if (success) success.style.display = 'none';
      }, 3500);
    }

    window.updateLabCalc = updateLabCalc;
    window.openZoomDemoModal = openZoomDemoModal;
    window.closeZoomDemoModal = closeZoomDemoModal;
    window.submitZoomRequest = submitZoomRequest;

    const STEMOS_I18N = ${formatJsObject(STEMOS_I18N, 4)};

    function setPlatformLanguage(lang) {
      if (!STEMOS_I18N[lang]) lang = 'en';
      try {
        localStorage.setItem('stemos_lang', lang);
      } catch (e) {}

      document.documentElement.lang = lang;
      if (STEMOS_I18N[lang].head_title) {
        document.title = STEMOS_I18N[lang].head_title;
      }

      var btnEs = document.getElementById('lang-btn-es');
      var btnEn = document.getElementById('lang-btn-en');
      if (btnEs && btnEn) {
        if (lang === 'es') {
          btnEs.classList.add('active');
          btnEn.classList.remove('active');
        } else {
          btnEn.classList.add('active');
          btnEs.classList.remove('active');
        }
      }

      var dict = STEMOS_I18N[lang];
      if (!dict) return;

      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.innerHTML = dict[key];
        }
      });

      var searchInput = document.getElementById('inst-career-search');
      if (searchInput) {
        searchInput.placeholder = (lang === 'es') ? 'Buscar carrera, norma o tecnología...' : 'Search career, standard, or technology...';
      }

      if (typeof window.switchRealityGapDrill === 'function') {
        var activeMode = 'academic';
        var btnInd = document.getElementById('btn-drill-industry');
        if (btnInd && btnInd.classList.contains('active')) {
          activeMode = 'industry';
        }
        window.switchRealityGapDrill(activeMode);
      }
    }

    window.STEMOS_I18N = STEMOS_I18N;
    window.setPlatformLanguage = setPlatformLanguage;

    document.addEventListener('DOMContentLoaded', function() {
      var savedLang = 'en';
      try {
        savedLang = localStorage.getItem('stemos_lang') || 'en';
      } catch (e) {}
      setPlatformLanguage(savedLang);
    });
`;

// Locate and replace script
const scripts = document.querySelectorAll('script');
let i18nScriptEl = null;
scripts.forEach(s => {
  if (s.textContent.includes('STEMOS_I18N') && s.textContent.includes('setPlatformLanguage')) {
    i18nScriptEl = s;
  }
});

if (i18nScriptEl) {
  i18nScriptEl.textContent = updatedScript;
} else {
  const newScript = document.createElement('script');
  newScript.textContent = updatedScript;
  document.body.appendChild(newScript);
}

// Validate DOM for missing keys
const allI18n = document.querySelectorAll('[data-i18n]');
console.log(`🔍 Auditing ${allI18n.length} DOM elements with [data-i18n]...`);
let errCount = 0;
allI18n.forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (!STEMOS_I18N.en[key]) {
    console.error(`❌ Missing EN translation for DOM key: "${key}"`);
    errCount++;
  }
  if (!STEMOS_I18N.es[key]) {
    console.error(`❌ Missing ES translation for DOM key: "${key}"`);
    errCount++;
  }
});

if (errCount > 0) {
  throw new Error(`Encountered ${errCount} missing translations. Build halted.`);
}

console.log(`✨ All ${allI18n.length} [data-i18n] elements verified with 100% bilingual coverage!`);

// Serialize and write
const finalHtml = dom.serialize();
fs.writeFileSync(indexPath, finalHtml, 'utf8');
fs.writeFileSync(devIndexPath, finalHtml, 'utf8');

console.log(`💾 Successfully synchronized index.html and dev/index.html (${finalHtml.length} bytes).`);

module.exports = { STEMOS_I18N };

