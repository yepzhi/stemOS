/**
 * scripts/inject_track31.cjs
 * Injects Track 31: Quality Engineering & EHS
 * (Six Sigma DMAIC / ISO 9001:2015 / ISO 45001 / OSHA 1910 / LOTO / Machine Guarding / GHS / HazMat)
 * into content/courses.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '../content/courses.js');
let fileContent = fs.readFileSync(coursesPath, 'utf8');

// Define Track 31 Data
const track31 = {
    id: "quality-ehs",
    title: "Ingeniería de Calidad y Seguridad Ocupacional (EHS)",
    titleEN: "Quality Engineering & Environmental Health and Safety (EHS)",
    level: "B1-B2",
    category: "engineering",
    description: "Gestión avanzada de calidad industrial y seguridad ocupacional: Six Sigma DMAIC, control estadístico de procesos (Cp, Cpk, Gage R&R), auditorías ISO 9001:2015 / IATF, protocolos de energía cero LOTO (OSHA 29 CFR 1910.147), ergonomía industrial (NIOSH) y gestión ambiental ISO 14001 / GHS.",
    status: "full",
    totalModules: 6,
    standard: "ISO 9001:2015 / ISO 45001:2018 / ISO 14001:2015 / OSHA 29 CFR 1910 / AIAG-VDA / NFPA 70E",
    modules: [
        {
            id: "qe-m1",
            title: "Six Sigma DMAIC & Statistical Process Control (SPC)",
            titleES: "Six Sigma DMAIC y Control Estadístico de Procesos (SPC)",
            icon: "fa-solid fa-chart-line",
            isGoldModel: true,
            readings: [
                {
                    id: "qe-m1-r1",
                    title: "DMAIC Framework & Process Capability (Cp, Cpk, Pp, Ppk) in High-Volume Manufacturing",
                    duration: "15 min",
                    content: `> **Quality Engineering Standard**: **ASQ (American Society for Quality) Six Sigma Body of Knowledge** and **AIAG Statistical Process Control (SPC) Manual 2nd Edition**. Crucial for Quality Assurance Managers, Black Belts, and Process Engineers operating high-volume assembly lines.

# Six Sigma DMAIC & Process Capability Architecture

### 1. The DMAIC Problem-Solving Engine
In advanced nearshoring plants, solving chronic scrap and yield issues requires a structured, empirical methodology rather than intuitive guesswork. The **DMAIC** roadmap provides this framework:
1. **Define**: Formulate the project charter, establish the business case, map high-level process flow via **SIPOC** (Suppliers, Inputs, Process, Outputs, Customers), and capture the **Voice of the Customer (VOC)** translated into measurable **Critical to Quality (CTQ)** parameters.
2. **Measure**: Quantify current baseline performance. Verify measurement precision and reproducibility via **Measurement Systems Analysis (MSA / Gage R&R)** before collecting process data.
3. **Analyze**: Identify the root causes of defect variation using statistical hypothesis testing (ANOVA, 2-Sample t-Test, Chi-Square), regression analysis, and multi-vari charts.
4. **Improve**: Design, pilot, and validate countermeasures using **Design of Experiments (DOE)** to optimize process setpoints and mistake-proof (Poka-Yoke) the workstation.
5. **Control**: Institutionalize the gains through updated **Standard Operating Procedures (SOPs)**, Statistical Process Control (SPC) charting, and a reaction plan documented in an **Out-of-Control Action Plan (OCAP)**.

### 2. Process Capability vs Process Performance: Cp vs Cpk vs Ppk
A critical point of cross-border friction during customer audits is the technical distinction between short-term capability and long-term process performance:

| Metric | Name | Formula / Interpretation | Standard Target |
| :--- | :--- | :--- | :--- |
| **Cp** | **Process Capability** | $Cp = \\frac{USL - LSL}{6\\sigma_{within}}$ — Measures the *potential* capability assuming the process is perfectly centered between specification limits. Ignores process shift. | $\\ge 1.33$ (General) / $\\ge 1.67$ (Critical/Safety) |
| **Cpk** | **Process Capability Index** | $Cpk = \\min\\left(\\frac{USL - \\mu}{3\\sigma_{within}}, \\frac{\\mu - LSL}{3\\sigma_{within}}\\right)$ — Measures actual capability accounting for process centering drift. Reflects *within-subgroup* variation. | $\\ge 1.33$ (Standard production) / $\\ge 1.67$ (Automotive/Medical) |
| **Pp** | **Process Performance** | $Pp = \\frac{USL - LSL}{6\\sigma_{overall}}$ — Uses sample standard deviation ($s$) across all historical batches. Evaluates total historical spread. | $\\ge 1.33$ |
| **Ppk** | **Process Performance Index** | $Ppk = \\min\\left(\\frac{USL - \\bar{\\bar{X}}}{3s}, \\frac{\\bar{\\bar{X}} - LSL}{3s}\\right)$ — Accounts for centering using overall standard deviation. Required for initial PPAP part qualification. | $\\ge 1.67$ (PPAP submission baseline) |

> **Audit Trap**: When $Cp$ is high (e.g., $1.80$) but $Cpk$ is low (e.g., $0.95$), the process has low internal variation but is significantly decentered toward one specification limit. Never attempt to adjust machine speed or feed rates before centering the mean.`
                },
                {
                    id: "qe-m1-r2",
                    title: "Statistical Process Control (SPC), Control Charts & Measurement Systems Analysis (Gage R&R)",
                    duration: "14 min",
                    content: `> **Engineering Metric**: **AIAG MSA Manual 4th Edition**. Acceptance criteria: $\%GRR < 10\\%$ is fully acceptable; $10\\% \\le \\%GRR \\le 30\\%$ is marginally acceptable conditional on customer sign-off; $\\%GRR > 30\\%$ indicates an unacceptable measurement system requiring immediate calibration or sensor redesign.

# Statistical Process Control & Gage R&R Protocols

### 1. Control Limits vs Specification Limits
A catastrophic communication error on the plant floor is confusing **Control Limits (UCL / LCL)** with **Specification Limits (USL / LSL)**:
- **Specification Limits (USL/LSL)** are established by design engineering or customer blueprints. They dictate whether a physical part is functionally conforming or defective.
- **Control Limits (UCL/LCL)** are calculated statistically from real process output data ($\pm 3\\sigma_{\\bar{X}}$). They represent the natural Voice of the Process.
- **Action Principle**: A process can be completely within specification limits while being completely out of statistical control (displaying runs, trends, or stratification).

### 2. Nelson Rules for Special Cause Variation
Process engineers monitor Shewhart control charts ($\bar{X}-R$ or I-MR charts). An out-of-control signal triggers an immediate **OCAP (Out-of-Control Action Plan)** when:
- **Rule 1**: One single point falls outside the $3\\sigma$ control limits.
- **Rule 2**: Nine consecutive points fall on the same side of the center line (indicating a process mean shift).
- **Rule 3**: Six consecutive points steadily increasing or decreasing (indicating continuous tool wear or sensor drift).
- **Rule 4**: Fourteen consecutive points alternating up and down (indicating over-control or hunting).

### 3. Measurement Systems Analysis: Gage R&R
Before analyzing any SPC chart, the measurement equipment and human appraisers must be validated using **Gage Repeatability & Reproducibility (Gage R&R)**:
- **Repeatability (Equipment Variation - EV)**: Variation observed when *one single appraiser* measures the exact same characteristic multiple times using the same instrument.
- **Reproducibility (Appraiser Variation - AV)**: Variation observed between *different appraisers* measuring the same part using the same instrument.
- **Number of Distinct Categories ($ndc$)**: Indicates the resolution capability of the gage. Must be $\ge 5$ to divide the process into meaningful analytical groups.`
                }
            ],
            dialogues: [
                {
                    id: "qe-m1-d1",
                    title: "Master Black Belt vs Plant Quality Director: Process Drift & Gage R&R Failure",
                    participants: [
                        { role: "Plant Quality Director (Juárez, Mexico)", name: "Ing. Rodrigo Garza" },
                        { role: "Corporate Master Black Belt (Detroit, USA)", name: "Dr. Mark Vance" }
                    ],
                    scenario: "The morning production report shows that the precision CNC milling line for steering knuckles has experienced a Cpk drop from 1.67 down to 1.08, triggering a yellow alert at OEM headquarters.",
                    lines: [
                        { speaker: "Dr. Mark Vance", text: "Rodrigo, good morning. I’m looking at the overnight telemetry for Line 4. Your Cpk on the steering knuckle inner bearing bore plunged to 1.08 over the last three shifts. That violates our Tier 1 quality agreement of a minimum 1.33 ongoing Cpk. What’s driving the capability drop?" },
                        { speaker: "Ing. Rodrigo Garza", text: "Good morning, Mark. We caught the shift immediately at 03:00 on the X-bar and R chart. Rule 3 triggered—six consecutive points trending downward. We initiated our OCAP, quarantined the last 400 parts, and conducted a preliminary tool wear analysis." },
                        { speaker: "Dr. Mark Vance", text: "Did the machining center experience severe insert wear, or did someone tamper with the spindle offset?" },
                        { speaker: "Ing. Rodrigo Garza", text: "Neither, actually. When our metrology tech re-measured the quarantined lot on the Zeiss CMM, the bore diameter came back at nominal 45.002 mm with a standard deviation of 0.003. That gives an actual Cpk of 1.72. The issue was on the plant floor air gage." },
                        { speaker: "Dr. Mark Vance", text: "Are you saying the plant floor measurement system gave a false out-of-control alarm?" },
                        { speaker: "Ing. Rodrigo Garza", text: "Exactly. We pulled the air gage and ran a Variable Gage R&R with 3 operators and 10 parts. The %GRR came out at 34.8%, and the number of distinct categories was only 2. The air pressure regulator on the shop floor pneumatic line had dropped from 6 bar to 4.2 bar, corrupting the air gage calibration." },
                        { speaker: "Dr. Mark Vance", text: "That is a textbook equipment variation failure. Did you repair the pneumatic regulator and re-baseline the gage?" },
                        { speaker: "Ing. Rodrigo Garza", text: "Yes. We installed a dedicated closed-loop pressure regulator with digital transducer feedback. Post-fix Gage R&R dropped to 7.4% with an ndc of 8. The quarantined parts have been 100% verified on the CMM and released with zero defect escapes." },
                        { speaker: "Dr. Mark Vance", text: "Excellent containment discipline, Rodrigo. Please upload the Gage R&R study and the OCAP log to our corporate portal before the afternoon executive stand-up." }
                    ]
                }
            ],
            lexicon: [
                {
                    term: "Process Capability Index (Cpk)",
                    ipa: "/ˈprɑː.sɛs ˌkeɪ.pəˈbɪl.ə.t̬i ˈɪn.dɛks/",
                    definition: "A statistical metric measuring how close a process is operating relative to its specification limits, factoring in both natural spread (6-sigma) and mean centering.",
                    collocations: ["demonstrate a minimum Cpk", "capability degradation", "tighten process capability"],
                    auditTrap: "Do not report Cp in place of Cpk to customer auditors. Cp ignores mean decentering and will conceal chronic off-target production."
                },
                {
                    term: "Gage Repeatability & Reproducibility (Gage R&R)",
                    ipa: "/ɡeɪdʒ rɪˌpiː.t̬əˈbɪl.ə.t̬i ænd ˌriː.proʊ.duː.səˈbɪl.ə.t̬i/",
                    definition: "An experimental evaluation of the variance introduced into process data by the measurement instrument itself (repeatability) and the operators operating it (reproducibility).",
                    collocations: ["conduct a Gage R&R study", "exceed the 10% threshold", "appraiser variation"],
                    auditTrap: "If %GRR exceeds 30%, the measurement system cannot legally be used for product disposition or PPAP sign-off."
                },
                {
                    term: "Out-of-Control Action Plan (OCAP)",
                    ipa: "/aʊt əv kənˈtroʊl ˈæk.ʃən plæn/",
                    definition: "A mandatory predetermined flowchart specifying the immediate containment, quarantine, and troubleshooting actions operators must execute when an SPC chart generates a special-cause alarm.",
                    collocations: ["trigger the OCAP", "execute containment protocol", "OCAP disposition flowchart"],
                    auditTrap: "During ISO/IATF audits, auditors will check whether operators actually follow the steps written in the OCAP when a point exceeds control limits."
                },
                {
                    term: "Common Cause vs Special Cause Variation",
                    ipa: "/ˈkɑː.mən kɔːz / ˈspɛʃ.əl kɔːz ˌvɛr.iˈeɪ.ʃən/",
                    definition: "Common cause variation is the inherent, random noise of a stable system. Special cause variation is an assignable, external disturbance (tool breakage, raw material batch shift, operator error).",
                    collocations: ["eliminate special cause", "inherent process noise", "assignable root cause"],
                    auditTrap: "Adjusting a machine process in response to common cause variation is called 'tampering' (over-control) and will mathematically double process variance."
                },
                {
                    term: "Number of Distinct Categories (ndc)",
                    ipa: "/ˈnʌm.bɚ əv dɪˈstɪŋkt ˈkæt̬.ə.ɡɔːr.iz/",
                    definition: "A metric derived from Gage R&R indicating how many non-overlapping statistical intervals the measurement system can distinguish across the process spread. Must be 5 or higher.",
                    collocations: ["achieve an ndc of 5 or greater", "adequate measurement resolution", "ndc calculation"],
                    auditTrap: "An ndc below 5 indicates data is effectively being rounded off into gross bins, rendering subtle SPC trend detection impossible."
                },
                {
                    term: "Critical to Quality (CTQ)",
                    ipa: "/ˈkrɪt̬.ɪ.kəl tuː ˈkwɑː.lə.t̬i/",
                    definition: "The key measurable physical, electrical, or functional characteristics of a product whose performance directly dictates customer satisfaction or regulatory compliance.",
                    collocations: ["identify CTQ parameters", "flow down CTQs", "monitor CTQ drift"],
                    auditTrap: "CTQs must always have measurable numerical tolerances, not vague subjective descriptions like 'smooth surface' or 'firm click'."
                }
            ],
            socraticChallenges: [
                {
                    id: "qe-m1-sc1",
                    title: "Defending Decentered Process vs Widened Tolerances",
                    prompt: "A customer auditor points out that your injection molding line has a Cp of 2.10, but your Cpk is only 1.15. The client demands a formal explanation. How do you technically articulate the issue and propose the correct corrective action without requesting tolerance relief?",
                    idealResponse: "Acknowledge that while the process possesses exceptional inherent capability (Cp = 2.10 indicates process spread consumes only 47% of tolerance band), the process mean has shifted toward the Upper Specification Limit. State that rather than requesting tolerance widening, engineering is adjusting tool cooling water flow and injection pack pressure to re-center the mean at nominal, which will immediately restore Cpk above 1.67."
                },
                {
                    id: "qe-m1-sc2",
                    title: "Gage R&R Marginal Acceptance Protocol",
                    prompt: "Your new optical coordinate measuring machine shows a Gage R&R of 18.5% with an ndc of 6. Production wants to deploy it immediately, but Quality Assurance hesitates. What is the engineering protocol under AIAG guidelines?",
                    idealResponse: "Under AIAG 4th Edition standards, a Gage R&R between 10% and 30% is conditionally acceptable based on process criticality, customer agreement, and gage expense. Since ndc is 6 (satisfying the >= 5 rule), QA can approve temporary deployment for non-safety critical features while submitting a formal concession and optimization plan to reduce appraiser alignment variance."
                }
            ],
            quiz: [
                {
                    question: "What does it indicate if an engineering process displays a Cp of 1.95 but a Cpk of 0.88?",
                    options: [
                        "The measurement equipment has high operator reproducibility error.",
                        "The process has low inherent variation but is significantly decentered from nominal.",
                        "The process specification limits are too tight for modern CNC equipment.",
                        "The process contains severe common cause variation requiring machine overhaul."
                    ],
                    correctIndex: 1,
                    explanation: "Cp compares tolerance width to 6-sigma spread without regard to location. A high Cp with a low Cpk proves that the spread is tight, but the process center has shifted toward one of the specification limits."
                },
                {
                    question: "According to AIAG Measurement Systems Analysis (MSA) guidelines, what is the minimum required value for Number of Distinct Categories (ndc)?",
                    options: [
                        "ndc >= 3",
                        "ndc >= 5",
                        "ndc >= 10",
                        "ndc >= 1.33"
                    ],
                    correctIndex: 1,
                    explanation: "AIAG standard dictates that an ndc of 5 or greater is mandatory for a measurement system to be capable of dividing the data into enough distinct intervals for SPC analysis."
                },
                {
                    question: "Under the Nelson Rules for SPC control charts, which condition triggers a special-cause alarm?",
                    options: [
                        "Three consecutive points located within 1 sigma of the centerline.",
                        "Six consecutive points steadily increasing or decreasing.",
                        "Random distribution of points between upper and lower control limits.",
                        "Every measured part conforming to customer blueprint specification limits."
                    ],
                    correctIndex: 1,
                    explanation: "Six consecutive points continuously increasing or decreasing represents Nelson Rule 3, indicating non-random trend variation such as continuous tool wear, temperature buildup, or sensor drift."
                },
                {
                    question: "What is the primary operational consequence of 'tampering' (adjusting machine offsets based on common cause variation)?",
                    options: [
                        "It centers the mean and eliminates all scrap.",
                        "It increases the overall process variance, often doubling output scatter.",
                        "It improves the Gage R&R from 25% down to under 10%.",
                        "It automatically closes customer non-conformance reports."
                    ],
                    correctIndex: 1,
                    explanation: "Deming demonstrated mathematically that adjusting a stable process in response to common cause noise (treating random variation as if it were special cause) increases process variance by up to 100%."
                }
            ]
        },
        {
            id: "qe-m2",
            title: "Root Cause Analysis, 8D Interlock & Failure Modes (Ishikawa, 5 Whys, AIAG-VDA FMEA)",
            titleES: "Análisis de Causa Raíz, Interbloqueo 8D y Modos de Falla (Ishikawa, 5 Porqués, FMEA)",
            icon: "fa-solid fa-code-branch",
            isGoldModel: true,
            readings: [
                {
                    id: "qe-m2-r1",
                    title: "Disciplined Root Cause Determination: 6M Ishikawa, 5 Whys & Escape Point Analysis",
                    duration: "15 min",
                    content: `> **Engineering Standard**: **AIAG CQI-20 Effective Problem Solving** and **VDA 8D Manual**. Required for all quality engineers responding to Customer Concern Notifications (CCN) and Non-Conformance Reports (NCR).

# Disciplined Root Cause Determination & 8D Interlock

### 1. The Distinction Between Direct Cause and Root Cause
In cross-border engineering escalation, junior engineers frequently confuse the **direct symptom** with the **systemic root cause**:
- **Direct Cause (Physical Cause)**: The immediate mechanism that produced the physical failure (e.g., *'The wire harness insulation melted due to excessive electrical current'*).
- **Escape Point (Detection Failure)**: Why did the internal quality control system fail to intercept the defect before it crossed the plant threshold? (e.g., *'The end-of-line high-potential tester had its current cutoff threshold bypassed during maintenance'*).
- **Systemic Root Cause (Management / Design Failure)**: The organizational or procedural breakdown that allowed the condition to be created (e.g., *'Engineering change management SOP lacked a mandatory validation protocol for test fixture software revisions'*).

### 2. The 6M Cause-and-Effect (Ishikawa / Fishbone) Diagram
To avoid premature conclusions, cross-functional teams brainstorm through the **6M framework**:
1. **Machine**: Fixture wear, hydraulic pressure fluctuation, spindle runout, sensor calibration drift.
2. **Method**: Outdated SOP, ambiguous visual aid, incorrect tightening sequence, unvalidated cycle time.
3. **Material**: Tensile strength variance between resin lots, alloy hardness non-conformance, packaging degradation.
4. **Man (People)**: Inadequate training certification, ergonomics fatigue, lack of shift handover documentation.
5. **Measurement**: Inadequate gage resolution, operator parallax error on micrometer, dirty optical sensor lens.
6. **Milieu (Environment)**: Ambient humidity causing polymer hygroscopic swelling, shopfloor temperature swings affecting CMM expansion.

### 3. The 5 Whys Discipline & The Escape Point
The 5 Whys must generate two parallel interrogation trees:
1. **Occurrence Root Cause Tree**: Why was the defect created physically on the manufacturing line?
2. **Escape Root Cause Tree**: Why did the inspection, testing, or containment barrier fail to catch it?

> **Audit Trap**: Stopping at 'Operator failed to follow visual inspection SOP' is an immediate audit finding. In modern quality systems, human error is an *outcome*, never a root cause. The true root cause must answer why the process allowed an un-mistake-proofed condition to rely on fallible human visual inspection.`
                },
                {
                    id: "qe-m2-r2",
                    title: "AIAG-VDA Failure Mode and Effects Analysis (FMEA): Action Priority (AP) vs RPN",
                    duration: "14 min",
                    content: `> **Harmonized Quality Standard**: **AIAG-VDA FMEA Handbook 1st Edition (2019)**. Replaced the legacy RPN (Risk Priority Number = S × O × D) system with the standardized **Action Priority (AP: High, Medium, Low)** logic across global automotive and aerospace supply chains.

# Modern AIAG-VDA FMEA Architecture

### 1. The 7-Step FMEA Approach
The harmonized AIAG-VDA methodology follows a strict seven-step sequence:
1. **Planning and Preparation**: Project definition, boundary diagrams, and project plan.
2. **Structure Analysis**: Visualizing the system tree (System $\\rightarrow$ Subsystem $\\rightarrow$ Component Element).
3. **Function Analysis**: Function allocations, requirements, and engineering characteristics.
4. **Failure Analysis**: Failure chain modeling (Failure Effect [FE] $\\rightarrow$ Failure Mode [FM] $\\rightarrow$ Failure Cause [FC]).
5. **Risk Analysis**: Assigning Severity (S), Occurrence (O), and Detection (D) ratings from 1 to 10.
6. **Optimization**: Identifying preventive and detection actions to reduce O and D ratings; reassigning Action Priority.
7. **Results Documentation**: Formal technical report and management sign-off.

### 2. Action Priority (AP) Logic vs Legacy RPN
Under the old system, multiplying $S \\times O \\times D$ produced mathematically flawed thresholds (e.g., $S=10, O=2, D=2 \\rightarrow RPN=40$ was often ignored, despite posing a catastrophic safety hazard).

Under **AIAG-VDA Action Priority (AP)**:
- **Severity (S)** is prioritized first. If $S = 9-10$ (Safety or regulatory non-compliance), the Action Priority is **High (H)** unless Occurrence is extremely low and Detection is virtually 100% automated.
- **Occurrence (O)** evaluates the effectiveness of current *prevention* controls.
- **Detection (D)** evaluates the ability of current *detection* controls to intercept the failure mode before shipment.
- **AP Classifications**:
  - **High (H)**: Highest priority for review and action. Engineering **must** either identify corrective design/process changes or obtain written customer executive concession.
  - **Medium (M)**: Medium priority. Engineering should identify action to reduce Occurrence or Detection.
  - **Low (L)**: Low priority. Actions are optional or best practice.`
                }
            ],
            dialogues: [
                {
                    id: "qe-m2-d1",
                    title: "Quality Assurance Engineer vs US OEM Customer Quality Director: Defending 8D Root Cause",
                    participants: [
                        { role: "Senior QA Engineer (Saltillo, Mexico)", name: "Ing. Sofía Morales" },
                        { role: "Director of Supplier Quality (Ohio, USA)", name: "Bradley Cooper" }
                    ],
                    scenario: "A Tier 1 transmission assembly plant in Ohio received a shipment of aluminum cast oil pans with microscopic micro-porosity in the gasket sealing channel, resulting in hydrostatic oil leaks on the dyno bench.",
                    lines: [
                        { speaker: "Bradley Cooper", text: "Sofía, we reviewed your interim D3 containment report for the transmission oil pan leaks. 100% sort is in place, but your D4 root cause draft claims 'Die casting injection pressure dropped intermittently.' That is a physical symptom, not a systemic root cause. If I present this to our VP, he will reject the 8D immediately." },
                        { speaker: "Ing. Sofía Morales", text: "Understood, Bradley. That was only step 1 of our 5 Whys. We completed the full 6M Ishikawa and fishbone analysis this morning with casting metallurgy and maintenance engineering. Let me walk you through both the occurrence root cause and the escape root cause." },
                        { speaker: "Bradley Cooper", text: "Please go ahead. Why did the hydraulic injection pressure drop on Die Casting Machine #3?" },
                        { speaker: "Ing. Sofía Morales", text: "Why 1: The hydraulic accumulator pressure dropped from 140 bar to 95 bar during the second intensification phase. Why 2: Nitrogen pre-charge gas inside the bladder had leaked past the valve stem seal. Why 3: The elastomer O-ring experienced thermal degradation. Why 4: The scheduled preventive maintenance interval for bladder seal replacement was set at 50,000 shots based on legacy ambient specs, but operating near the hot casting mold degraded the polymer at 32,000 shots." },
                        { speaker: "Bradley Cooper", text: "Now that is an actionable engineering root cause: an invalid PM cycle under high-heat operational reality. Now what about your escape point? How did porous castings get past your leak tester?" },
                        { speaker: "Ing. Sofía Morales", text: "That is our D4 Escape Root Cause: The differential pressure decay leak tester had its pressure decay threshold set to 0.8 mbar instead of 0.3 mbar. Why? When the machine software was updated three weeks ago, default engineering parameters overwrote the customized part-specific recipe because recipe locking had not been activated in the PLC." },
                        { speaker: "Bradley Cooper", text: "That explains why the defect escaped to our dyno bench. What are the permanent corrective actions under D5 and D6?" },
                        { speaker: "Ing. Sofía Morales", text: "For Occurrence: We replaced the bladder seals with high-temperature fluoroelastomer (FKM) and revised PM frequency to every 25,000 shots in SAP PM. For Escape: We locked the PLC recipe behind biometric password protection and added a daily mastering protocol with a certified 0.3 mbar calibrated leak orifice. If mastering fails, the station locks out automatically." },
                        { speaker: "Bradley Cooper", text: "Robust mistakeproofing. Upload the revised PFMEA with updated Action Priority ratings and the revised Control Plan, and I will sign off on D5." }
                    ]
                }
            ],
            lexicon: [
                {
                    term: "Escape Point",
                    ipa: "/ɪˈskeɪp pɔɪnt/",
                    definition: "The exact inspection, testing, or process verification station where a non-conformance should have been intercepted but escaped detection due to faulty calibration, human error, or inadequate sensor limits.",
                    collocations: ["identify the escape point", "containment at the escape point", "audit the escape point"],
                    auditTrap: "An 8D report is incomplete and will be rejected by Tier 1 OEMs if it only explains why the defect was made without identifying the escape point."
                },
                {
                    term: "Action Priority (AP)",
                    ipa: "/ˈæk.ʃən praɪˈɔːr.ə.t̬i/",
                    definition: "The standardized risk classification (High, Medium, Low) established in AIAG-VDA FMEA to prioritize corrective engineering actions based on the logical interaction of Severity, Occurrence, and Detection.",
                    collocations: ["high action priority", "reduce the AP level", "AP evaluation matrix"],
                    auditTrap: "Do not calculate RPN (Risk Priority Number) for programs requiring the harmonized AIAG-VDA 2019 standard; AP logic is mandatory."
                },
                {
                    term: "Poka-Yoke (Mistake-Proofing)",
                    ipa: "/ˈpoʊ.kə ˈjoʊk/",
                    definition: "A physical, electrical, or software mechanism designed into a manufacturing process to make it impossible for an operator to assemble a part incorrectly or allow a non-conforming part to advance.",
                    collocations: ["implement a poka-yoke", "fail-safe poka-yoke device", "sensor-based mistake-proofing"],
                    auditTrap: "Visual inspection or retraining is NOT mistake-proofing. Poka-yoke requires a hard physical stop, guide pin, optical barcode interlock, or electrical interlock."
                },
                {
                    term: "Ishikawa 6M Framework",
                    ipa: "/ɪ.ʃiˈkɑː.wə sɪks ɛm/",
                    definition: "A systematic root cause brainstorming taxonomy categorizing potential defect causes under Machine, Method, Material, Man, Measurement, and Milieu (Environment).",
                    collocations: ["populate the 6M categories", "cause-and-effect fishbone", "6M brainstorm session"],
                    auditTrap: "Avoid grouping all human-related causes under 'Man'. If the operator lacked clear instructions, the true 6M category is 'Method'."
                },
                {
                    term: "Containment Action (D3)",
                    ipa: "/kənˈteɪn.mənt ˈæk.ʃən/",
                    definition: "Immediate provisional actions executed within 24 hours of defect discovery to isolate non-conforming inventory in transit, warehouse, and production to protect the customer from defect escapes.",
                    collocations: ["put a certified containment in place", "firewall containment", "D3 quarantine boundary"],
                    auditTrap: "Containment is never permanent; it must be monitored daily and removed only after permanent corrective actions (D6) prove 100% verified."
                },
                {
                    term: "Process Failure Mode and Effects Analysis (PFMEA)",
                    ipa: "/ˈprɑː.sɛs ˈfeɪl.jɚ moʊd ænd ɪˈfɛkts əˈnæl.ə.sɪs/",
                    definition: "A living proactive engineering analytical document evaluating potential process failure modes, their severity on downstream customers, and prevention/detection controls.",
                    collocations: ["update the PFMEA", "living quality document", "PFMEA line walk"],
                    auditTrap: "Auditors check date stamps on PFMEAs. If a customer complaint occurred but the PFMEA was not updated to reflect the new failure cause, an audit finding will be issued."
                }
            ],
            socraticChallenges: [
                {
                    id: "qe-m2-sc1",
                    title: "Defending Against 'Retraining' as a Corrective Action",
                    prompt: "Your quality intern submits an 8D proposing 'Retrain operator on proper soldering iron angle' as the permanent corrective action for cold solder joints. As Lead Quality Engineer, how do you challenge this response and guide them toward a compliant automotive/aerospace solution?",
                    idealResponse: "Explain that 'retraining' is an administrative control with high failure probability that does not resolve the physical root cause and is universally rejected in automotive/aerospace audits. Challenge the intern to investigate why the soldering temperature or dwell time fluctuated, and guide them to implement an engineering control such as a programmable soldering robot with automated thermal feedback and cycle interlocks (Poka-Yoke)."
                },
                {
                    id: "qe-m2-sc2",
                    title: "Overcoming AIAG-VDA High Action Priority Finding",
                    prompt: "During an FMEA review of an airbag squib connector assembly, the team identifies a failure mode with Severity = 10 (Failure to deploy), Occurrence = 3, and Detection = 5. The resulting Action Priority is High (H). The engineering manager wants to downgrade it to Low because 'Occurrence is only 3'. How do you respond?",
                    idealResponse: "Clarify that under the AIAG-VDA harmonized logic, any failure mode with Severity 9 or 10 involving regulatory non-compliance or vehicle safety defaults to High Action Priority when Detection is 5 or worse, regardless of moderate Occurrence. Emphasize that engineering is legally obligated to either redesign the connector geometry to prevent mis-insertion physically or implement 100% automated optical/electrical interlocks to drive Detection down to 1."
                }
            ],
            quiz: [
                {
                    question: "In the 8D methodology, what is the crucial purpose of 'Escape Point Analysis'?",
                    options: [
                        "To assign disciplinary penalties to the inspector who approved the defective lot.",
                        "To calculate how many emergency exit doors are required in the manufacturing cell.",
                        "To identify why existing testing and inspection barriers failed to detect the defect before shipment.",
                        "To justify why the customer should pay for sorting costs."
                    ],
                    correctIndex: 2,
                    explanation: "Escape Point Analysis determines the exact weakness in the inspection, testing, or quality firewall that permitted the defect to leave the manufacturing station and reach the customer."
                },
                {
                    question: "Why was the traditional RPN (Risk Priority Number) calculation replaced by Action Priority (AP) in the AIAG-VDA 2019 FMEA standard?",
                    options: [
                        "Because RPN calculations required advanced calculus that shopfloor operators could not compute.",
                        "Because RPN products could conceal critical high-severity safety risks behind low occurrence or detection numbers.",
                        "Because automotive OEMs wanted to eliminate all documentation requirements.",
                        "Because German VDA standards prohibited the use of numerical scores."
                    ],
                    correctIndex: 1,
                    explanation: "Multiplying S x O x D gave equal weight to all factors, allowing catastrophic safety hazards (Severity 10) to appear low priority if Occurrence happened to be 2. AP ensures high-severity risks receive top engineering priority."
                },
                {
                    question: "Which of the following constitutes an authentic engineering 'Poka-Yoke' (mistake-proofing) solution?",
                    options: [
                        "Displaying a brightly colored laminated visual alert above the operator workstation.",
                        "Adding an asymmetrical alignment tab to a stamping connector so it physically cannot be inserted backwards.",
                        "Requiring the shift supervisor to sign a secondary inspection travel sheet.",
                        "Conducting monthly refresher training for all assembly operators."
                    ],
                    correctIndex: 1,
                    explanation: "True Poka-Yoke relies on physical, mechanical, or automated electrical constraints (like asymmetric keying or interlocks) that make improper assembly physically impossible, independent of human vigilance."
                },
                {
                    question: "In an Ishikawa diagram, an incorrect tightening torque caused by an uncalibrated pneumatic torque wrench should be classified under which 6M category?",
                    options: [
                        "Man (Human error)",
                        "Measurement (or Machine/Tooling calibration)",
                        "Milieu (Atmospheric pressure)",
                        "Material (Bolt tensile strength)"
                    ],
                    correctIndex: 1,
                    explanation: "Tooling and instrumentation calibration deficiencies fall under Measurement or Machine/Tooling, not 'Man'. The operator was using the tool as provided."
                }
            ]
        },
        {
            id: "qe-m3",
            title: "ISO 9001:2015 & IATF QMS Auditing Protocols (Surveillance, Non-Conformances & CAPA)",
            titleES: "Protocolos de Auditoría de SGC ISO 9001:2015 e IATF (Vigilancia, No Conformidades y CAPA)",
            icon: "fa-solid fa-clipboard-check",
            isGoldModel: true,
            readings: [
                {
                    id: "qe-m3-r1",
                    title: "ISO 9001:2015 High-Level Structure (Annex SL) & Risk-Based Quality Management",
                    duration: "15 min",
                    content: `> **Global QMS Standard**: **ISO 9001:2015 Quality Management Systems — Requirements** and **ISO 19011:2018 Guidelines for Auditing Management Systems**. Universal foundation for industrial manufacturing, medical, aerospace, and technical supplier qualification.

# ISO 9001:2015 Architecture & Risk-Based Management

### 1. The Annex SL High-Level Structure (HLS)
Modern ISO management standards (ISO 9001 for Quality, ISO 14001 for Environment, ISO 45001 for Occupational Health) share a unified 10-clause architecture known as **Annex SL**:
- **Clauses 1–3**: Scope, Normative References, Terms and Definitions.
- **Clause 4: Context of the Organization**: Identifying internal/external issues and interested parties' expectations.
- **Clause 5: Leadership**: Top management accountability, Quality Policy, organizational roles and authorities.
- **Clause 6: Planning**: Actions to address risks and opportunities (Risk-Based Thinking), Quality Objectives.
- **Clause 7: Support**: Resources, competence, awareness, communication, and **Documented Information** (Clause 7.5).
- **Clause 8: Operation**: Operational planning, customer requirements review, design and development controls, supplier control (Clause 8.4), and production control (Clause 8.5).
- **Clause 9: Performance Evaluation**: Monitoring, measurement, analysis, internal audits (Clause 9.2), and **Management Review** (Clause 9.3).
- **Clause 10: Improvement**: Non-conformity and corrective action (Clause 10.2), continual improvement.

### 2. Risk-Based Thinking: Eliminating 'Preventive Action'
A historic evolution in ISO 9001:2015 was the elimination of the separate 'Preventive Action' clause. Instead, the entire standard is built upon **Risk-Based Thinking (Clause 6.1)**:
- Quality managers must demonstrate proactive risk identification (using Failure Mode matrices, SWOT analysis, or formal Risk Registers) before designing processes.
- Risk management is embedded into change management (Clause 6.3): any modification to tooling, software, raw materials, or layout requires documented risk assessment prior to execution.

> **Common Audit Trap**: Claiming 'We do not have risks because we are certified' will trigger a severe Major Non-Conformance against Clause 6.1. Auditors expect to see a live Risk Register tracking supply chain bottlenecks, operator turnover, equipment obsolescence, and mitigation actions.`
                },
                {
                    id: "qe-m3-r2",
                    title: "Lead Auditor Protocols: Objective Evidence, Major Non-Conformance, Minor Non-Conformance & OFI",
                    duration: "14 min",
                    content: `> **Auditing Standard**: **ISO 19011:2018** and **IATF Rules for Achieving and Maintaining IATF Recognition 5th Edition**.

# Audit Grading & Non-Conformance Resolution

### 1. The Hierarchy of Audit Findings
When external certification bodies (TÜV, BSI, DNV, Lloyd's Register) or Tier 1 customer auditors inspect a manufacturing facility, findings are classified into three strict tiers:

| Finding Category | Definition & Criteria | Consequence / Resolution Timeline |
| :--- | :--- | :--- |
| **Major Non-Conformance** | Absence or total breakdown of a system required by the standard, or a condition that results in non-conforming product reaching the customer or severe regulatory risk. | **Immediate threat to certification**. Re-audit required within 90 days. Formal 8D response and containment required within 48–72 hours. |
| **Minor Non-Conformance** | An isolated lapse in discipline or single procedural failure that does not indicate a systemic collapse of the QMS (e.g., one calibration sticker missing on a secondary caliper). | Does not withhold certification. Formal CAPA plan required within 30 to 60 days, verified at next surveillance audit. |
| **Opportunity for Improvement (OFI)** | A process condition that complies with the standard's minimum requirements but represents potential vulnerability or suboptimal practice. | No mandatory formal CAPA required, but evaluated during subsequent audits to see if the plant reviewed the feedback. |

### 2. The Anatomy of a Bulletproof Non-Conformance Statement
Professional lead auditors formulate findings using a non-negotiable three-part statement:
1. **The Requirement**: Citation of the exact clause from the standard or internal SOP (e.g., *'According to ISO 9001:2015 Clause 7.1.5.1, monitoring equipment must be calibrated at specified intervals'*).
2. **The Deficiency**: The exact failure observed (e.g., *'The micrometer on Line 2 Station 4 was found in active production with calibration expired on August 15'*).
3. **The Objective Evidence**: Unambiguous data trail (e.g., *'Serial number MIT-4092, calibration tag #A8812, verified by auditor at 10:45 AM during stamping operation'*).`
                }
            ],
            dialogues: [
                {
                    id: "qe-m3-d1",
                    title: "ISO/IATF Lead Auditor vs QA Director: Clause 8.5 Traceability & Non-Conformance Defense",
                    participants: [
                        { role: "Third-Party Lead Auditor (TÜV SÜD)", name: "Arthur Pendelton" },
                        { role: "Plant Quality Assurance Director (Reynosa, Mexico)", name: "Ing. Laura Treviño" }
                    ],
                    scenario: "During an annual IATF 16949 / ISO 9001 surveillance audit, the lead auditor is sampling laser-welded structural brackets on the shop floor and identifies a discrepancy in material traceability tags.",
                    lines: [
                        { speaker: "Arthur Pendelton", text: "Laura, let's look at pallet #B-204 at Station 6. The traveler sheet specifies cold-rolled steel coil heat number #8841-A. However, when I scan the laser QR code etched directly onto the bracket, the database returns coil lot #9012-B. That indicates an absence of material traceability under Clause 8.5.2." },
                        { speaker: "Ing. Laura Treviño", text: "Thank you for pointing that out, Arthur. Let me pull up our Manufacturing Execution System (MES) batch transition log. Coil #8841-A ran out at 09:15 AM today. Coil #9012-B was loaded at 09:22 AM. The laser etcher received the automated MES handshake and updated the internal data string correctly." },
                        { speaker: "Arthur Pendelton", text: "Then why did the printed physical traveler sheet on the tote still reference the depleted coil lot? The operator was actively running parts with conflicting documentation." },
                        { speaker: "Ing. Laura Treviño", text: "You are correct. The material handler loaded the new coil into the decoiler but failed to print the refreshed MES lot traveler sheet at the line terminal, violating our internal SOP-PRD-042." },
                        { speaker: "Arthur Pendelton", text: "Under ISO 9001 Clause 8.5.2 and IATF Clause 8.5.2.1, this constitutes a breakdown of identification and traceability controls. Given that the direct part laser marking was digitally synchronized, I will classify this as a Minor Non-Conformance rather than a Major, provided you demonstrate immediate containment." },
                        { speaker: "Ing. Laura Treviño", text: "Understood. As immediate containment, we are placing a temporary hold on the 80 brackets processed during that coil transition. Quality control will scan 100% of the lot against the MES database to verify serial alignment before release." },
                        { speaker: "Arthur Pendelton", text: "And your systemic corrective action?" },
                        { speaker: "Ing. Laura Treviño", text: "We will modify the decoiler PLC logic. When a new coil barcode is scanned, the stamping press will not cycle until the operator prints and scans the newly generated traveler barcode, creating a fool-proof physical-digital interlock." },
                        { speaker: "Arthur Pendelton", text: "A robust engineering solution. I will document this as Minor Non-Conformance #02 with a 60-day closure verification." }
                    ]
                }
            ],
            lexicon: [
                {
                    term: "Objective Evidence",
                    ipa: "/əbˈdʒɛk.tɪv ˈɛv.ə.dəns/",
                    definition: "Verifiable data, physical records, test results, or direct observational statements that substantiate the existence or verification of a quality requirement, free from opinion or conjecture.",
                    collocations: ["provide objective evidence", "lack of objective evidence", "audit objective evidence"],
                    auditTrap: "Saying 'we always do it this way' carries zero weight in an ISO audit without verifiable documented records or timestamped system logs."
                },
                {
                    term: "Non-Conformance Report (NCR)",
                    ipa: "/nɑːn kənˈfɔːr.məns rɪˈpɔːrt/",
                    definition: "A formal documented record issued when a product, process, or management system requirement fails to satisfy specified criteria or regulatory clauses.",
                    collocations: ["issue an NCR", "disposition an NCR", "close out the NCR"],
                    auditTrap: "Failing to log internal NCRs to look good in audits is a red flag. Experienced auditors know zero internal NCRs indicates a hidden or suppressed reporting culture."
                },
                {
                    term: "Corrective and Preventive Action (CAPA)",
                    ipa: "/kəˈrɛk.tɪv ænd prɪˈvɛn.tɪv ˈæk.ʃən/",
                    definition: "A structured organizational process to eliminate the root cause of an existing non-conformity (corrective) or potential vulnerability (preventive) to prevent recurrence.",
                    collocations: ["initiate a CAPA", "verify CAPA effectiveness", "CAPA log review"],
                    auditTrap: "A CAPA cannot be closed upon implementing the solution. It must remain open until an 'effectiveness check' (e.g., 60 days of zero defects) validates the fix."
                },
                {
                    term: "Management Review (Clause 9.3)",
                    ipa: "/ˈmæn.ədʒ.mənt rɪˈvjuː/",
                    definition: "A mandatory periodic review by executive leadership evaluating the suitability, adequacy, effectiveness, and strategic alignment of the Quality Management System.",
                    collocations: ["conduct annual management review", "management review inputs", "executive review meeting"],
                    auditTrap: "Auditors require formal minutes, attendance lists showing top site leadership, and measurable action items with deadlines from Management Review meetings."
                },
                {
                    term: "Surveillance Audit",
                    ipa: "/sɚˈveɪ.ləns ˈɑː.dɪt/",
                    definition: "A periodic on-site audit conducted by an accredited registrar (typically annually during a 3-year certification cycle) to verify ongoing QMS compliance.",
                    collocations: ["pass the surveillance audit", "surveillance audit cycle", "external registrar audit"],
                    auditTrap: "Surveillance audits sample random processes. Failing to maintain documentation between audits can lead to immediate certification suspension."
                },
                {
                    term: "Risk-Based Thinking (Clause 6.1)",
                    ipa: "/rɪsk beɪst ˈθɪŋ.kɪŋ/",
                    definition: "A systematic approach across all organizational processes to identify, evaluate, and mitigate potential hazards before they materialize into defects or customer dissatisfaction.",
                    collocations: ["embed risk-based thinking", "risk register updates", "proactive risk assessment"],
                    auditTrap: "Do not confuse business risk (financial/market) with QMS product risk. ISO 9001 focuses on risks affecting conformity of products and services."
                }
            ],
            socraticChallenges: [
                {
                    id: "qe-m3-sc1",
                    title: "Defending an Incomplete Training Record During an ISO Audit",
                    prompt: "During an audit of Clause 7.2 (Competence), an auditor discovers that a newly hired CNC operator has been running production for two weeks without an authorized signature on their training matrix. How do you respond to prevent this finding from escalating into a Major Non-Conformance?",
                    idealResponse: "Acknowledge the immediate documentation lapse transparently. Present corroborating objective evidence of actual competence: show the automated HR digital onboarding module completion timestamp, the completed quiz with 100% score, and the 100% first-pass yield logs on the operator's machine. Accept a Minor Non-Conformance for the missing physical sign-off while demonstrating that product quality and operator safety were never compromised."
                },
                {
                    id: "qe-m3-sc2",
                    title: "Evaluating CAPA Effectiveness Verification Criteria",
                    prompt: "A CAPA was opened after a customer received cracked bracket welds. The engineering team installed a robotic torch cleaner and wants to close the CAPA today. What objective evidence must you demand as QA Director before authorizing closure?",
                    idealResponse: "Refuse immediate closure. Explain that implementing a corrective action does not prove effectiveness. Require a mandatory validation monitoring period (e.g., 60 days or 25,000 continuous weld cycles) demonstrating zero cracked welds on destructive macro-etch tests and zero customer warranty claims, supported by updated PFMEA and Control Plan documentation."
                }
            ],
            quiz: [
                {
                    question: "Under ISO 9001:2015, what happened to the traditional standalone requirement for 'Preventive Action'?",
                    options: [
                        "It was completely eliminated because prevention is no longer considered necessary.",
                        "It was subsumed into the holistic concept of 'Risk-Based Thinking' embedded throughout the entire standard (Clause 6.1).",
                        "It was replaced by mandatory Six Sigma Black Belt certification for all plant managers.",
                        "It was moved into ISO 14001 environmental safety requirements."
                    ],
                    correctIndex: 1,
                    explanation: "ISO 9001:2015 eliminated the separate 'preventive action' clause because the entire standard was rewritten around proactive 'Risk-Based Thinking', requiring organizations to anticipate risks across all processes."
                },
                {
                    question: "What differentiates a 'Major Non-Conformance' from a 'Minor Non-Conformance' during an ISO certification audit?",
                    options: [
                        "Major non-conformances involve monetary fines, whereas minor ones do not.",
                        "A Major Non-Conformance represents the total absence or systemic breakdown of a required clause, directly threatening product quality or certification.",
                        "A Minor Non-Conformance can only be issued against document numbering errors.",
                        "Major non-conformances can only be issued by government labor inspectors."
                    ],
                    correctIndex: 1,
                    explanation: "A Major Non-Conformance indicates a systemic failure of the QMS or a severe condition jeopardizing product integrity, putting certification at risk until verified containment and correction occur."
                },
                {
                    question: "What three non-negotiable elements must be present in every professional audit non-conformance statement?",
                    options: [
                        "The operator's name, the machine serial number, and the financial cost of scrap.",
                        "The specific requirement/clause, the observed deficiency, and the objective evidence.",
                        "The plant manager's signature, the supplier part number, and the shipping date.",
                        "The customer's email address, the root cause, and the supplier invoice."
                    ],
                    correctIndex: 1,
                    explanation: "Under ISO 19011 auditing principles, a finding must state: 1) The exact requirement (standard or procedure), 2) The exact non-conforming condition, and 3) The concrete objective evidence observed."
                },
                {
                    question: "When is it technically permissible to formally close a Corrective and Preventive Action (CAPA)?",
                    options: [
                        "Immediately upon issuing the purchase order for replacement tooling.",
                        "As soon as the engineering change notice (ECN) is signed off by the maintenance supervisor.",
                        "Only after a defined evaluation period provides objective evidence that the corrective action successfully eliminated recurrence.",
                        "Within exactly 24 hours of receiving the customer complaint."
                    ],
                    correctIndex: 2,
                    explanation: "A CAPA cannot be legitimately closed until an 'effectiveness verification' confirms that over an extended operational window, the root cause has been eradicated and no defect recurrence has occurred."
                }
            ]
        },
        {
            id: "qe-m4",
            title: "OSHA 1910, Control of Hazardous Energy (LOTO) & Machine Guarding",
            titleES: "OSHA 1910, Control de Energía Peligrosa (LOTO) y Guardas de Maquinaria",
            icon: "fa-solid fa-lock",
            isGoldModel: true,
            readings: [
                {
                    id: "qe-m4-r1",
                    title: "OSHA 29 CFR 1910.147 Lockout/Tagout (LOTO): The 6-Step De-energization Standard",
                    duration: "15 min",
                    content: `> **Industrial Safety Standard**: **OSHA (Occupational Safety and Health Administration) 29 CFR 1910.147** and **NOM-004-STPS (Mexico)**. Mandatory life-critical standard across manufacturing plants globally. Non-compliance results in severe criminal liabilities, immediate plant shutdowns, and catastrophic workplace fatalities.

# OSHA 29 CFR 1910.147 & The Zero Energy State

### 1. The Core Philosophy of LOTO
Lockout/Tagout (LOTO) establishes minimum performance requirements to prevent unexpected energization or startup of machinery that could cause severe injury or death during servicing or maintenance.
- **The Golden Rule**: One Person, One Lock, One Key. No employee may ever apply a lock on behalf of another or use a master key without an emergency corporate protocol.
- **Types of Hazardous Energy**: Electrical, mechanical, hydraulic, pneumatic, chemical, thermal, and gravitational potential energy.

### 2. The Standard 6-Step De-Energization Sequence
Every authorized employee servicing machinery must execute the non-negotiable six steps:
1. **Preparation for Shutdown**: Notify all affected employees, identify energy sources, magnitudes, and hazards.
2. **Machine Shutdown**: Utilize normal operating stop controls (push button, toggle switch) to stop the machine.
3. **Machine Isolation**: Physically disconnect the machine from its energy sources (open electrical disconnect breaker, close pneumatic ball valve, drop hydraulic lock pin). Never use control circuitry (e.g., E-stop or interlock switch) as an energy isolation device!
4. **LOTO Device Application**: Apply authorized red padlocks and lockout hasps to isolation devices with individualized tags stating employee name, department, and contact info.
5. **Residual Energy Dissipation (Bleed/Block)**: Relieve stored pressure in pneumatic/hydraulic accumulators, discharge electrical capacitors, vent residual steam/chemicals, and insert physical mechanical safety blocks under vertical press rams to arrest gravitational drop.
6. **Zero Energy Verification (The 'Try' Step)**: Verify zero energy state! First visually inspect pressure gages and voltmeters; then attempt to restart the machine using local startup controls (pushing the START button). Ensure the machine does not move. Return controls to OFF before starting work.

> **Life-Critical Audit Trap**: An Emergency Stop button (E-Stop) or safety interlock gate is NOT an energy-isolating device under OSHA 1910.147. Operating personnel performing internal mechanical maintenance relying solely on an E-stop face immediate termination and severe regulatory penalties.`
                },
                {
                    id: "qe-m4-r2",
                    title: "Machine Guarding & Functional Safety: ISO 13849-1 (PLr), Interlocks & Emergency Stops",
                    duration: "14 min",
                    content: `> **Machinery Safety Standard**: **ISO 13849-1 Safety of Machinery (Performance Levels PL a–e)**, **IEC 62061 (SIL 1–3)**, and **OSHA 29 CFR 1910.212**.

# Machine Guarding & Functional Safety Engineering

### 1. The Hierarchy of Machine Safeguarding
Whenever hazardous machine components (nip points, rotating shafts, stamping dies, robotic arms) present amputation or crushing hazards, engineering safeguarding must follow:
- **Fixed Guards**: Permanent physical barriers requiring tools to remove (sheet metal, polycarbonate panels). The gold standard for passive protection.
- **Interlocked Movable Guards**: Doors or hinged barriers equipped with monitored safety interlock switches. Opening the guard disconnects safety circuit power, commanding an immediate safe stop.
- **Presence-Sensing Devices (Optoelectronic)**: Safety light curtains and laser area scanners that detect entry into a hazard zone and break the safety circuit within milliseconds.

### 2. Safety Integrity: Performance Level (PL) & Category Architecture
Modern functional safety does not rely on standard PLC software inputs. It requires dual-channel redundancy and cross-monitoring under **ISO 13849-1**:

| Parameter | Meaning & Industrial Application |
| :--- | :--- |
| **Category 4 (Cat 4)** | A single fault inside the safety system (e.g., a shorted wire or welded relay contact) does not lead to the loss of safety function. The fault is detected at or before the next safety demand. |
| **Performance Level e (PLe)** | Highest safety integrity rating ($Probability of Dangerous Failure per Hour < 10^{-7}$). Mandatory for high-speed mechanical power presses, robotic cells, and hydraulic shear blades. |
| **Safety Interlock Switches** | RFID coded safety sensors or mechanical key-trapped switches that resist defeat or tampering by operators. |
| **NFPA 70E Arc Flash Boundary** | The approach distance from energized electrical equipment within which a person could receive a second-degree burn ($1.2\\text{ cal/cm}^2$). Requires arc-rated PPE suits. |`
                }
            ],
            dialogues: [
                {
                    id: "qe-m4-d1",
                    title: "EHS Manager vs Maintenance Supervisor: Immediate Stop-Work Authority on LOTO Breach",
                    participants: [
                        { role: "Plant EHS Manager (Monterrey, Mexico)", name: "Ing. Alejandro Cárdenas" },
                        { role: "Senior Maintenance Supervisor", name: "Héctor Guzmán" }
                    ],
                    scenario: "During an EHS gemba walk in the stamping department, the EHS Manager spots a maintenance technician with his upper body inside the bed of an 800-ton hydraulic press clearing a jammed metal blank.",
                    lines: [
                        { speaker: "Ing. Alejandro Cárdenas", text: "Stop work right now! Héctor, step away from that press console immediately! Technician inside the die bed, pull out of that machine right now!" },
                        { speaker: "Héctor Guzmán", text: "Alejandro, relax! We just have a misfed blank jammed between the upper and lower die. The press is on E-stop and I have my hand on the reset switch. It will only take thirty seconds to pry it loose with a crowbar." },
                        { speaker: "Ing. Alejandro Cárdenas", text: "Héctor, as EHS Manager, I am exercising formal Stop-Work Authority. Look at that hydraulic press. The main electrical disconnect is closed, the hydraulic pump is pressurized, and there is no mechanical safety die block installed under the ram. An E-stop is a control circuit, NOT an energy isolation device!" },
                        { speaker: "Héctor Guzmán", text: "The line has been down for twenty minutes, and production control is breathing down my neck about meeting shift quotas. Installing the die block and locking out the main breaker takes ten minutes." },
                        { speaker: "Ing. Alejandro Cárdenas", text: "I don't care if the line is down for twenty hours. If that proportional valve seals rupture or a hydraulic solenoid fails right now, that 15-ton ram will drop under gravitational weight and crush your technician instantly. Under OSHA 1910.147 and our plant safety rules, zero human body parts enter a die bed without verified zero energy." },
                        { speaker: "Héctor Guzmán", text: "You're right, Alejandro. I let production pressure compromise protocol. That was an unacceptable shortcut." },
                        { speaker: "Ing. Alejandro Cárdenas", text: "Here is what we do: The technician steps out of the light curtain. You open the main electrical breaker, attach your personal red padlock and hasp. Bleed the hydraulic accumulator pressure down to zero bar, and swing the mechanical safety block into place with its interlock engaged. Then push the start button to verify zero motion." },
                        { speaker: "Héctor Guzmán", text: "Understood. We are executing the full 6-step LOTO sequence right now. I will log the incident and conduct an immediate safety stand-down with the entire maintenance crew." }
                    ]
                }
            ],
            lexicon: [
                {
                    term: "Zero Energy State",
                    ipa: "/ˈzɪr.oʊ ˈɛn.ɚ.dʒi steɪt/",
                    definition: "The operational condition of machinery where all sources of electrical, mechanical, hydraulic, pneumatic, chemical, thermal, and gravitational energy have been completely isolated, dissipated, and blocked.",
                    collocations: ["verify zero energy state", "achieve zero energy", "residual zero energy check"],
                    auditTrap: "Turning off the power switch does NOT achieve zero energy. Trapped air in pneumatic cylinders or raised mechanical weights must be physically dissipated or mechanically blocked."
                },
                {
                    term: "Lockout/Tagout (LOTO)",
                    ipa: "/ˈlɑːk.aʊt ˈtæɡ.aʊt/",
                    definition: "A formal OSHA safety procedure requiring physical locks and identification tags placed on energy-isolating devices to ensure equipment cannot be energized during maintenance.",
                    collocations: ["apply LOTO protocol", "authorized LOTO employee", "LOTO isolation point"],
                    auditTrap: "Never share locks or keys. 'One lock, one person, one key' is an absolute universal safety mandate across all global manufacturing facilities."
                },
                {
                    term: "Stop-Work Authority (SWA)",
                    ipa: "/stɑːp wɝːk əˈθɔːr.ə.t̬i/",
                    definition: "The organizational policy and ethical power empowering every employee, regardless of rank or seniority, to immediately stop any operation perceived to be unsafe or non-compliant.",
                    collocations: ["exercise stop-work authority", "invoke SWA", "support stop-work culture"],
                    auditTrap: "Retaliating against or reprimanding an employee for exercising Stop-Work Authority in good faith is a severe violation of international labor and EHS standards."
                },
                {
                    term: "Presence-Sensing Device",
                    ipa: "/ˈprɛz.əns ˈsɛn.sɪŋ dɪˈvaɪs/",
                    definition: "An optoelectronic safeguarding device (such as a safety light curtain or laser scanner) that creates a sensing field to command an immediate machine stop when an object or person enters.",
                    collocations: ["safety light curtain", "laser area scanner", "minimum safety distance"],
                    auditTrap: "Light curtains must be installed at a calculated safety distance (ISO 13855) so the machine achieves complete stop before a human hand can reach the hazard point."
                },
                {
                    term: "Category 4 / Performance Level e (PLe)",
                    ipa: "/ˈkæt̬.ə.ɡɔːr.i fɔːr / pɚˈfɔːr.məns ˈlɛv.əl iː/",
                    definition: "The highest safety architecture rating under ISO 13849-1, requiring dual redundant channels and automatic fault cross-monitoring so that a single component failure cannot lead to loss of the safety function.",
                    collocations: ["Cat 4 safety circuit", "achieve PLe rating", "safety relay cross-monitoring"],
                    auditTrap: "Standard commercial PLCs cannot be used for emergency stops or light curtain logic; they lack redundant processors and fail-safe watchdog circuits."
                },
                {
                    term: "Arc Flash Boundary",
                    ipa: "/ɑːrk flæʃ ˈbaʊn.dɚ.i/",
                    definition: "The designated approach distance from energized electrical conductors within which an unprotected person would suffer second-degree burns if an electrical arc flash occurred (NFPA 70E).",
                    collocations: ["arc-rated PPE", "arc flash hazard analysis", "incident energy level"],
                    auditTrap: "Opening an energized 480V distribution panel without verifying arc flash boundary calculations and wearing appropriate arc-rated face shields violates OSHA NFPA 70E."
                }
            ],
            socraticChallenges: [
                {
                    id: "qe-m4-sc1",
                    title: "Challenging E-Stop as a Maintenance Isolation Device",
                    prompt: "A line technician claims that pressing the red Mushroom E-Stop button is sufficient to change a saw blade because 'it cuts the circuit immediately and saves 15 minutes of downtime'. How do you refute this argument using engineering and OSHA standards?",
                    idealResponse: "Explain that an E-stop button is a control circuit device, not an energy-isolating device under OSHA 29 CFR 1910.147. Point out that a software glitch, welded internal contact, or accidental reset could command the motor to run unexpectedly. Reiterate that machine isolation requires physically opening the main electrical disconnect, locking it with a personal padlock, and verifying zero energy before touching the saw blade."
                },
                {
                    id: "qe-m4-sc2",
                    title: "Calculating Safety Light Curtain Distance (ISO 13855)",
                    prompt: "Engineering installed a safety light curtain 200 mm away from a fast-acting hydraulic shearing blade. The blade takes 250 milliseconds to come to a complete mechanical stop after sensor break. Is this installation compliant? How do you assess it?",
                    idealResponse: "Assess using the ISO 13855 / OSHA formula: $S = (K \\times T) + C$, where human hand approach speed $K = 1600\\text{ mm/s}$ (or $2000\\text{ mm/s}$) and stopping time $T = 0.25\\text{ s}$. The stopping travel distance alone is $1600 \\times 0.25 = 400\\text{ mm}$, plus depth penetration constant $C$. Since the curtain is only 200 mm away, an operator reaching into the hazard could make contact with the blade 200 mm before it stops. The installation is non-compliant and presents imminent amputation hazard; the curtain must be relocated back to at least 450-500 mm."
                }
            ],
            quiz: [
                {
                    question: "Under OSHA 29 CFR 1910.147, why is an Emergency Stop button (E-Stop) NOT permitted as a lockout device?",
                    options: [
                        "Because E-Stops do not have bright enough warning labels.",
                        "Because an E-Stop relies on control circuitry and PLC logic, which can fail or be accidentally reset, rather than physically isolating power.",
                        "Because E-Stops can only be operated by licensed electricians.",
                        "Because OSHA regulations only apply to companies with more than 5,000 employees."
                    ],
                    correctIndex: 1,
                    explanation: "OSHA specifically defines control circuit devices (pushbuttons, selector switches, E-stops, interlocks) as non-energy-isolating devices because internal component failures can cause unexpected machine restarts."
                },
                {
                    question: "What is the non-negotiable final step of the OSHA 6-step LOTO de-energization procedure prior to starting maintenance work?",
                    options: [
                        "Signing the overtime authorization sheet with the shift supervisor.",
                        "Conducting zero energy verification (the 'Try' step) by attempting to restart the equipment using normal controls.",
                        "Painting the machine disconnect box yellow.",
                        "Emailing the customer quality manager that the line is offline."
                    ],
                    correctIndex: 1,
                    explanation: "Step 6 ('Verification of Isolation') requires the authorized employee to verify that electrical, mechanical, and stored energy are truly zero by testing with meters and attempting to start the machine using normal controls."
                },
                {
                    question: "What is the core principle of 'Category 4' functional safety architecture under ISO 13849-1?",
                    options: [
                        "A single component failure will immediately halt the machine, but can never lead to a loss of the safety function.",
                        "Safety devices must be inspected once every four years.",
                        "It allows mechanical interlocks to be bypassed during production speed runs.",
                        "It requires four separate locks on every electrical cabinet."
                    ],
                    correctIndex: 0,
                    explanation: "Category 4 requires dual-channel redundancy and automatic diagnostic cross-monitoring such that an internal component fault (like a stuck relay contact) will not prevent the safety function from safely executing."
                },
                {
                    question: "What is the purpose of mechanical safety blocks when servicing vertical hydraulic stamping presses?",
                    options: [
                        "To keep the floor clean from oil drips.",
                        "To physically prevent the heavy upper ram from falling under gravitational force in case of hydraulic seal or pressure failure.",
                        "To provide an ergonomic footrest for maintenance technicians.",
                        "To absorb electrical noise from high-frequency inverter drives."
                    ],
                    correctIndex: 1,
                    explanation: "Gravitational potential energy cannot be locked out with an electrical breaker. Heavy press rams must be physically supported by rated mechanical safety blocks or die pins to prevent crushing injuries if hydraulic pressure drops."
                }
            ]
        },
        {
            id: "qe-m5",
            title: "ISO 45001:2018 (Occupational Health) & Industrial Ergonomics (NIOSH)",
            titleES: "ISO 45001:2018 (Salud Ocupacional) y Ergonomía Industrial (NIOSH)",
            icon: "fa-solid fa-person-digging",
            isGoldModel: true,
            readings: [
                {
                    id: "qe-m5-r1",
                    title: "ISO 45001:2018 Occupational Health and Safety Management Systems: Hierarchy of Controls",
                    duration: "15 min",
                    content: `> **Global OHS Standard**: **ISO 45001:2018 Occupational Health and Safety Management Systems — Requirements with Guidance for Use**. Replaced OHSAS 18001 as the worldwide benchmark for worker safety and hazard mitigation.

# ISO 45001:2018 & The Hierarchy of Controls

### 1. Hazard Identification and Risk Assessment (HIRA)
Under ISO 45001 Clause 6.1.2, organizations must systematically identify workplace hazards and assess risks across routine, non-routine, and emergency operations:
- **Hazard**: A source or situation with a potential to cause injury, ill-health, or fatality.
- **Risk**: The combination of the likelihood of occurrence of a work-related hazardous event and the severity of injury or ill-health.
- **Worker Consultation & Participation (Clause 5.4)**: Non-negotiable requirement to involve non-managerial shopfloor workers in hazard identification, risk assessment, and incident investigations.

### 2. The Universal Hierarchy of Controls (Clause 8.1.2)
When eliminating hazards or reducing risks, engineering teams must apply controls in order of decreasing effectiveness:

\`\`\`
1. ELIMINATION       [Most Effective: Physically remove the hazard completely]
   │
2. SUBSTITUTION      [Replace the hazard with a safer material or lower energy process]
   │
3. ENGINEERING       [Isolate people from the hazard (guards, ventilation, damping)]
   │
4. ADMINISTRATIVE    [Change the way people work (SOPs, job rotation, training)]
   │
5. PPE               [Least Effective: Protect the worker with personal protective gear]
\`\`\`

> **Audit Trap**: Proposing earplugs or respirators as the primary permanent countermeasure for excessive noise or toxic fumes will result in an audit non-conformance. Personal Protective Equipment (PPE) is strictly the last line of defense; engineering must first evaluate source elimination, acoustic baffling, or localized LEV (Local Exhaust Ventilation).`
                },
                {
                    id: "qe-m5-r2",
                    title: "Industrial Ergonomics, NIOSH Lifting Equation & Hearing Conservation Programs (OSHA 85 dBA)",
                    duration: "14 min",
                    content: `> **Ergonomic & Occupational Health Standards**: **NIOSH (National Institute for Occupational Safety and Health) Lifting Equation**, **OSHA 29 CFR 1910.95 Occupational Noise Exposure**, and **ISO 11228 (Manual handling)**.

# Industrial Ergonomics & Hearing Conservation

### 1. The NIOSH Manual Lifting Equation
Musculoskeletal Disorders (MSDs) from repetitive lifting and awkward postures account for over 35% of all industrial lost-time injuries. The NIOSH equation calculates the **Recommended Weight Limit (RWL)** for two-handed manual lifting:

$$RWL = LC \\times HM \\times VM \\times DM \\times AM \\times FM \\times CM$$

Where:
- **LC (Load Constant)**: $23\\text{ kg}$ ($51\\text{ lbs}$) under ideal conditions.
- **HM (Horizontal Multiplier)**: Penalizes distance between load and worker's body ($HM = 25/H$).
- **VM (Vertical Multiplier)**: Penalizes lifting from floor level or above shoulders.
- **DM (Distance Multiplier)**: Vertical travel distance.
- **AM (Asymmetric Multiplier)**: Penalizes twisting during the lift ($AM = 1 - 0.0032A$).
- **FM (Frequency Multiplier)**: Number of lifts per minute over duration.
- **CM (Coupling Multiplier)**: Quality of hand-to-object grip handles.
- **Lifting Index (LI)**: $LI = \\frac{Actual\\ Weight}{RWL}$. If $LI > 1.0$, the task poses ergonomic risk; if $LI > 3.0$, the task poses acute injury hazard requiring immediate mechanical lift-assist tooling.

### 2. OSHA Hearing Conservation (OSHA 1910.95)
Continuous noise exposure damages delicate hair cells in the cochlea, causing irreversible sensorineural hearing loss:
- **Action Level**: $85\\text{ dBA}$ 8-hour Time-Weighted Average (TWA). Triggers mandatory inclusion in Hearing Conservation Program (annual audiometric testing, baseline audiogram, and voluntary ear protection).
- **Permissible Exposure Limit (PEL)**: $90\\text{ dBA}$ 8-hour TWA. Triggers mandatory engineering acoustic controls, mandatory dual hearing protection, and administrative exposure limits.`
                }
            ],
            dialogues: [
                {
                    id: "qe-m5-d1",
                    title: "Ergonomics Specialist & Plant Physician vs Production Manager: Repetitive Strain Redesign",
                    participants: [
                        { role: "Ergonomics & Safety Specialist", name: "Dra. Carmen Valenzuela" },
                        { role: "Assembly Production Manager (Chihuahua, Mexico)", name: "Ing. Bernardo Serna" }
                    ],
                    scenario: "Three assembly line operators in the harness insertion cell have reported acute carpal tunnel syndrome and tenosynovitis within the past quarter, generating a high medical claim rate.",
                    lines: [
                        { speaker: "Dra. Carmen Valenzuela", text: "Bernardo, our quarterly medical log shows three recordable cumulative trauma disorders on Line 2 Station 3—the heavy wire harness firewall grommet insertion. The operators are experiencing wrist numbness and tendinitis." },
                        { speaker: "Ing. Bernardo Serna", text: "Carmen, we already bought ergonomic wrist braces for everyone at that station, and we rotate operators every two hours. What else can we do without slowing down the takt time?" },
                        { speaker: "Dra. Carmen Valenzuela", text: "Wrist braces and job rotation are administrative controls at the bottom of the ISO 45001 Hierarchy of Controls. They do not eliminate the root ergonomic stress. We conducted a Rapid Upper Limb Assessment (RULA) and a NIOSH push/pinch force analysis yesterday." },
                        { speaker: "Ing. Bernardo Serna", text: "What did the RULA score show?" },
                        { speaker: "Dra. Carmen Valenzuela", text: "The RULA score was 7—indicating imminent risk of musculoskeletal injury requiring immediate change. The manual pinch force required to seat that rubber grommet is 78 Newtons with extreme wrist radial deviation, repeated 60 times an hour over an 8-hour shift." },
                        { speaker: "Ing. Bernardo Serna", text: "What is your engineering proposal?" },
                        { speaker: "Dra. Carmen Valenzuela", text: "We need an engineering control: a counterbalanced pneumatic grommet-seating tool. The operator merely aligns the tool tip, and pneumatic pressure seats the seal with zero manual wrist force. That reduces manual pinch force from 78 N down to 4 N and drops the RULA score to 2." },
                        { speaker: "Ing. Bernardo Serna", text: "What is the tooling cost and implementation lead time?" },
                        { speaker: "Dra. Carmen Valenzuela", text: "Tooling is $3,200 USD from an authorized automation supplier. Considering that one carpal tunnel surgery and lost-time compensation in Mexico averages over $9,000 USD—not to mention the human cost—the ROI is achieved in less than four months." },
                        { speaker: "Ing. Bernardo Serna", text: "Agreed. Let's issue the capital expenditure request today. I want that pneumatic tool installed on the line by next week." }
                    ]
                }
            ],
            lexicon: [
                {
                    term: "Hierarchy of Controls",
                    ipa: "/ˈhaɪ.rɑːr.ki əv kənˈtroʊlz/",
                    definition: "The standardized system prioritizing hazard mitigation strategies from most effective (Elimination, Substitution, Engineering) to least effective (Administrative, Personal Protective Equipment).",
                    collocations: ["apply the hierarchy of controls", "engineering controls over PPE", "hazard reduction hierarchy"],
                    auditTrap: "Suggesting PPE as the primary long-term solution for an industrial hazard is an automatic finding in ISO 45001 audits."
                },
                {
                    term: "Musculoskeletal Disorder (MSD)",
                    ipa: "/ˌmʌs.kjə.loʊˈskɛl.ə.t̬əl dɪsˈɔːr.dɚ/",
                    definition: "Injuries and disorders affecting muscles, nerves, tendons, ligaments, and joints (e.g., carpal tunnel syndrome, lumbar disc herniation, rotator cuff tendinitis) caused by ergonomic strain.",
                    collocations: ["prevent workplace MSDs", "ergonomic risk factor", "cumulative trauma disorder"],
                    auditTrap: "MSDs rarely result from a single acute incident; they develop from chronic repetition, high contact stress, vibration, or awkward postures over months."
                },
                {
                    term: "Recommended Weight Limit (RWL)",
                    ipa: "/ˌrɛk.əˈmɛn.dɪd weɪt ˈlɪm.ɪt/",
                    definition: "The calculated maximum weight in the NIOSH lifting equation that nearly all healthy workers can lift over a defined duration without increased risk of low back pain.",
                    collocations: ["calculate the RWL", "exceed the recommended weight limit", "NIOSH lifting equation"],
                    auditTrap: "The standard 23 kg Load Constant only applies under perfect conditions. Any torso twist or long reach drastically slashes the allowable RWL down to 10 kg or less."
                },
                {
                    term: "Time-Weighted Average (TWA)",
                    ipa: "/taɪm ˈweɪ.t̬ɪd ˈæv.ɚ.ɪdʒ/",
                    definition: "The average exposure level to an environmental hazard (such as noise in dBA or airborne chemical vapors in ppm) calculated over a standard 8-hour workday and 40-hour workweek.",
                    collocations: ["8-hour TWA", "exceed the TWA threshold", "dosimeter measurement"],
                    auditTrap: "Short periods of silence do not cancel out extreme peak noise. High sound levels (e.g., 105 dBA stamping) rapidly exhaust the allowable 8-hour noise dose."
                },
                {
                    term: "Rapid Upper Limb Assessment (RULA)",
                    ipa: "/ˈræp.ɪd ˈʌp.ɚ lɪm əˈsɛs.mənt/",
                    definition: "A standardized ergonomic survey method evaluating biomechanical and postural loading on the neck, trunk, and upper limbs during manual assembly tasks.",
                    collocations: ["conduct a RULA survey", "high RULA score", "ergonomic posture assessment"],
                    auditTrap: "A RULA score of 7 requires immediate engineering redesign. Do not claim the workstation is acceptable with a score of 7 simply because the operator is experienced."
                },
                {
                    term: "Action Level vs Permissible Exposure Limit (PEL)",
                    ipa: "/ˈæk.ʃən ˈlɛv.əl / pɚˈmɪs.ə.bəl ɪkˈspoʊ.ʒɚ ˈlɪm.ɪt/",
                    definition: "The Action Level (e.g., 85 dBA noise) triggers mandatory health monitoring and baseline audiograms; the PEL (e.g., 90 dBA) represents the legal upper ceiling requiring mandatory controls.",
                    collocations: ["exceed the action level", "statutory PEL limit", "hearing conservation enrollment"],
                    auditTrap: "An employer cannot wait until the PEL (90 dBA) is exceeded to begin hearing conservation; mandatory medical baselines start at the 85 dBA Action Level."
                }
            ],
            socraticChallenges: [
                {
                    id: "qe-m5-sc1",
                    title: "Defending Ergonomic Automation vs Personal Back Belts",
                    prompt: "A warehouse logistics manager proposes issuing elastic 'back support belts' to material handlers unloading 25 kg boxes from shipping containers, arguing it solves ergonomic back strain at minimal cost. As EHS Lead, how do you challenge this using NIOSH and ISO 45001 standards?",
                    idealResponse: "Clarify that NIOSH conducted extensive medical reviews and determined there is zero statistical evidence that back support belts prevent industrial back injuries. Explain that back belts are not recognized as PPE and create a false sense of security. Demand solutions aligned with the Hierarchy of Controls: implement an engineering control, such as a vacuum tube lifter or scissor-lift pallet positioner that eliminates manual spinal loading entirely."
                },
                {
                    id: "qe-m5-sc2",
                    title: "Noise Exposure Mitigation Strategy",
                    prompt: "Sound level measurements near a high-speed metal punching press indicate an 8-hour TWA of 94 dBA. The production supervisor wants to hand out disposable foam earplugs and consider the issue closed. How do you respond from a regulatory and audit perspective?",
                    idealResponse: "Point out that an 8-hour TWA of 94 dBA exceeds OSHA's Permissible Exposure Limit (PEL) of 90 dBA and the 85 dBA Action Level. Emphasize that under OSHA 1910.95 and ISO 45001, PPE (earplugs) cannot be used as the permanent sole solution when the PEL is breached. Demand an engineering acoustic study to install sound-damping acoustic curtains, vibration isolator pads under the press feet, and automated air nozzle silencers to drive ambient noise below 85 dBA."
                }
            ],
            quiz: [
                {
                    question: "In the ISO 45001 / OSHA Hierarchy of Controls, which category is considered the MOST effective at mitigating workplace hazards?",
                    options: [
                        "Personal Protective Equipment (PPE)",
                        "Administrative Controls (Warning signs and training)",
                        "Elimination (Physically removing the hazard)",
                        "Engineering Controls (Guards and ventilation)"
                    ],
                    correctIndex: 2,
                    explanation: "Elimination physically removes the hazard from the workplace entirely, making injury physically impossible and representing the pinnacle of the Hierarchy of Controls."
                },
                {
                    question: "What is the standard OSHA 8-hour Time-Weighted Average (TWA) 'Action Level' for occupational noise exposure that mandates an employer Hearing Conservation Program?",
                    options: [
                        "75 dBA",
                        "85 dBA",
                        "90 dBA",
                        "105 dBA"
                    ],
                    correctIndex: 1,
                    explanation: "OSHA 29 CFR 1910.95 establishes the Action Level at 85 dBA 8-hour TWA, triggering mandatory annual audiometric baseline testing, training, and hearing protector availability."
                },
                {
                    question: "Under the NIOSH Manual Lifting Equation, what is the ideal 'Load Constant' (LC) under perfect conditions?",
                    options: [
                        "15 kg (33 lbs)",
                        "23 kg (51 lbs)",
                        "35 kg (77 lbs)",
                        "50 kg (110 lbs)"
                    ],
                    correctIndex: 1,
                    explanation: "The NIOSH Lifting Equation establishes a baseline Load Constant (LC) of 23 kg (51 lbs), which represents the maximum weight healthy individuals can safely lift under perfect geometry."
                },
                {
                    question: "What is a primary requirement of Clause 5.4 in the ISO 45001:2018 standard?",
                    options: [
                        "Requiring all employees to pay for their own safety boots.",
                        "Mandating the active consultation and participation of non-managerial workers in safety decisions and incident reviews.",
                        "Automating 100% of manufacturing workstations within three years.",
                        "Submitting weekly accident logs to the United Nations."
                    ],
                    correctIndex: 1,
                    explanation: "Clause 5.4 of ISO 45001 is a critical governance clause requiring documented mechanisms for non-managerial shopfloor workers to participate actively in OHS hazard identification, risk assessment, and policy formation."
                }
            ]
        },
        {
            id: "qe-m6",
            title: "Environmental Management (ISO 14001:2015), Chemical Safety (GHS) & Hazardous Waste",
            titleES: "Gestión Ambiental (ISO 14001:2015), Seguridad Química (GHS) y Residuos Peligrosos",
            icon: "fa-solid fa-leaf",
            isGoldModel: true,
            readings: [
                {
                    id: "qe-m6-r1",
                    title: "ISO 14001:2015 Environmental Aspects, Life Cycle Perspective & Spill Prevention",
                    duration: "15 min",
                    content: `> **Environmental Management Standard**: **ISO 14001:2015 Environmental Management Systems — Requirements with Guidance for Use** and **SEMARNAT / EPA RCRA (Resource Conservation and Recovery Act)**.

# ISO 14001:2015 & Industrial Environmental Stewardship

### 1. Environmental Aspects vs Environmental Impacts
A frequent point of confusion during external ISO 14001 audits is the distinction between an **Aspect** and an **Impact** (Clause 6.1.2):
- **Environmental Aspect (The Cause)**: An element of an organization’s activities, products, or services that interacts or can interact with the environment (e.g., *consumption of electrical energy, generation of spent degreasing solvent, wastewater discharge, volatile organic compound emissions*).
- **Environmental Impact (The Effect)**: Any change to the environment, whether adverse or beneficial, wholly or partially resulting from an organization’s environmental aspects (e.g., *depletion of fossil fuels, groundwater contamination, photochemical smog formation, acidification of local soil*).
- **Significant Environmental Aspects**: Aspects identified through risk-scoring (frequency, severity, legal compliance, community sensitivity) that require documented operational controls and measurable environmental objectives.

### 2. The Life Cycle Perspective (Clause 8.1)
ISO 14001:2015 introduced the **Life Cycle Perspective**:
- Environmental controls must extend beyond factory walls. Engineers must consider raw material extraction, packaging design, supplier logistics, customer end-of-life disposal, and recyclability.
- **Secondary Containment Principle**: All liquid chemical storage tanks, drums, and tote containers (IBCs) must have secondary containment berms capable of holding at least **110% of the volume of the largest container** or 10% of the total aggregate volume, whichever is greater.`
                },
                {
                    id: "qe-m6-r2",
                    title: "OSHA HazCom Standard, GHS Classification, Safety Data Sheets (SDS) & Hazardous Waste Manifests",
                    duration: "14 min",
                    content: `> **Chemical Safety Standard**: **UN Globally Harmonized System (GHS)**, **OSHA 29 CFR 1910.1200 (HazCom)**, **NOM-018-STPS-2015 (Mexico)**, and **Ley General del Equilibrio Ecológico y la Protección al Ambiente (LGEEPA)**.

# Chemical Safety & Hazardous Waste Compliance

### 1. The 16-Section GHS Safety Data Sheet (SDS)
Under the Globally Harmonized System (GHS), all chemical manufacturers and industrial employers must maintain a standardized 16-section Safety Data Sheet (SDS) accessible to all workers:
- **Section 1**: Identification (chemical name, manufacturer, emergency 24/7 hotline).
- **Section 2**: Hazard(s) Identification (GHS pictograms, signal word: *DANGER* vs *WARNING*, hazard statements, precautionary statements).
- **Section 4**: First-Aid Measures.
- **Section 7**: Handling and Storage (incompatible chemicals, e.g., oxidizers separated from flammable solvents).
- **Section 8**: Exposure Controls / Personal Protection (OSHA PEL, ACGIH TLV).
- **Section 9**: Physical and Chemical Properties (flash point, vapor pressure, pH).
- **Section 13**: Disposal Considerations (hazardous waste classification).

### 2. Hazardous Waste: Cradle-to-Grave Liability
Under North American environmental jurisprudence (EPA RCRA in the US, SEMARNAT in Mexico):
- **Cradle-to-Grave Principle**: The company that generates hazardous waste remains legally and financially liable for that waste from the moment it is generated, during transit, through final treatment or incineration. Hiring a licensed third-party waste hauler does NOT transfer liability if the hauler illegally dumps the waste.
- **Manifest Tracking**: Every shipment of hazardous waste (spent oils, etching acids, paint sludge) must be accompanied by an official Hazardous Waste Manifest signed by generator, transporter, and disposal facility.`
                }
            ],
            dialogues: [
                {
                    id: "qe-m6-d1",
                    title: "Environmental Compliance Specialist vs General Manager: Emergency Chemical Spill Response",
                    participants: [
                        { role: "Environmental Compliance Engineer", name: "Ing. Daniela Soto" },
                        { role: "Plant General Manager (Matamoros, Mexico)", name: "David Vance" }
                    ],
                    scenario: "A forklift backing up near the chemical staging dock punctured a 1,000-liter intermediate bulk container (IBC) of trichloroethylene-based industrial degreaser.",
                    lines: [
                        { speaker: "Ing. Daniela Soto", text: "David, I have activated our plant Environmental Emergency Response Team. At 14:15, a forklift punctured a 1,000-liter IBC of chlorinated solvent degreaser on the north loading dock. Approximately 400 liters spilled before the bladder was rotated." },
                        { speaker: "David Vance", text: "Daniela, is there any fire danger? Did the liquid reach the municipal storm drain outside the dock?" },
                        { speaker: "Ing. Daniela Soto", text: "There is no immediate fire hazard because trichloroethylene has no open flash point, but it has severe inhalation toxicity. The most critical news: our secondary containment berm captured 100% of the liquid within the sealed epoxy floor. Zero chemical entered the storm sewer or municipal drain." },
                        { speaker: "David Vance", text: "Thank God for that secondary containment berm. What is our current vapor concentration inside the dock?" },
                        { speaker: "Ing. Daniela Soto", text: "Photoionization detector readings show VOC vapor levels at 65 ppm near the spill. The OSHA PEL is 100 ppm, but ACGIH TLV is only 10 ppm. I ordered an immediate evacuation of the dock and shut down the HVAC air dampers to prevent vapor recirculation into the main assembly plant." },
                        { speaker: "David Vance", text: "Good call. How are we disposing of the captured solvent?" },
                        { speaker: "Ing. Daniela Soto", text: "Our HAZMAT technicians are suited in Level B vapor PPE with self-contained breathing apparatus. They are deploying non-reactive chemical absorbent pads and inert polypropylene socks. All contaminated absorbent will be sealed into UN-rated steel recovery drums." },
                        { speaker: "David Vance", text: "Do we need to notify SEMARNAT, PROFEPA, or the local civil protection authorities?" },
                        { speaker: "Ing. Daniela Soto", text: "Because the spill exceeded the 50 kg reportable quantity threshold for chlorinated solvents, we are legally required to file an initial emergency notification with PROFEPA within 24 hours, even though containment prevented any environmental release. I already have the incident manifest drafted for your signature." },
                        { speaker: "David Vance", text: "Bring it to my desk right away. Superb execution of our ISO 14001 emergency preparedness plan, Daniela." }
                    ]
                }
            ],
            lexicon: [
                {
                    term: "Secondary Containment",
                    ipa: "/ˈsɛk.ənˌdɛr.i kənˈteɪn.mənt/",
                    definition: "A physical containment system (such as an epoxy-lined berm or double-walled tank) engineered to capture leaks or catastrophic spills from primary chemical storage vessels.",
                    collocations: ["110% secondary containment rule", "containment berm inspection", "spill containment pallet"],
                    auditTrap: "Secondary containment basins that have open drain valves or are full of rainwater provide zero legal containment and will trigger an immediate environmental violation."
                },
                {
                    term: "Cradle-to-Grave Liability",
                    ipa: "/ˈkreɪ.dəl tuː ɡreɪv ˌlaɪ.əˈbɪl.ə.t̬i/",
                    definition: "The strict legal doctrine holding the hazardous waste generator perpetually responsible for environmental damages and cleanup costs from the creation of the waste to its ultimate disposal.",
                    collocations: ["cradle-to-grave responsibility", "RCRA hazardous waste generator", "manifest chain of custody"],
                    auditTrap: "You cannot contract out of hazardous waste liability. If your licensed waste contractor dumps spent solvents illegally, the government will hold your company financially responsible."
                },
                {
                    term: "Safety Data Sheet (SDS)",
                    ipa: "/ˈseɪf.ti ˈdeɪ.t̬ə ʃiːt/",
                    definition: "A comprehensive 16-section technical document providing chemical properties, physical hazards, toxicological data, handling precautions, and emergency response procedures under GHS.",
                    collocations: ["accessible GHS SDS binder", "review Section 8 exposure limits", "updated SDS archive"],
                    auditTrap: "An SDS older than 3–5 years or missing localized language (Spanish for Mexico, English for US) violates chemical hazard communication laws."
                },
                {
                    term: "Significant Environmental Aspect",
                    ipa: "/sɪɡˈnɪf.ə.kənt ɪnˌvaɪ.rənˈmɛn.t̬əl ˈæs.pɛkt/",
                    definition: "An element of an organization’s activities or products that has, or can have, a substantial environmental impact based on formal quantitative evaluation criteria under ISO 14001.",
                    collocations: ["identify significant aspects", "aspect evaluation matrix", "operational controls for aspects"],
                    auditTrap: "An environmental objective (Clause 6.2) must exist for every aspect deemed 'significant'. Failure to align objectives with significant aspects is a standard audit non-conformance."
                },
                {
                    term: "Reportable Quantity (RQ)",
                    ipa: "/rɪˈpɔːr.t̬ə.bəl ˈkwɑːn.t̬ə.t̬i/",
                    definition: "The threshold mass or volume of a hazardous chemical release that triggers mandatory immediate legal notification to federal environmental authorities (EPA, SEMARNAT, PROFEPA).",
                    collocations: ["exceed the reportable quantity", "immediate statutory notification", "RQ chemical table"],
                    auditTrap: "Failing to report a spill that exceeds the RQ within the statutory deadline (often 24 hours) carries severe criminal penalties and massive regulatory fines."
                },
                {
                    term: "Volatile Organic Compound (VOC)",
                    ipa: "/ˈvɑː.lə.t̬əl ɔːrˈɡæn.ɪk ˈkɑːm.paʊnd/",
                    definition: "Organic chemicals with high vapor pressure at room temperature (e.g., solvents, thinners, paints) that evaporate into the atmosphere, contributing to ground-level ozone and smog.",
                    collocations: ["VOC emissions monitoring", "low-VOC solvent substitution", "scrubber VOC destruction efficiency"],
                    auditTrap: "Industrial air emission permits specify strict annual VOC tonnage caps. Exceeding permitted VOC limits can result in air permit revocation and line shutdowns."
                }
            ],
            socraticChallenges: [
                {
                    id: "qe-m6-sc1",
                    title: "Defending Cradle-to-Grave Liability to Executive Management",
                    prompt: "Your Finance Director wants to switch to a cheaper local waste hauler that offers a 50% discount for drum disposal, arguing 'Once the waste leaves our gate, it's their problem'. How do you defend the company against this strategy using environmental law?",
                    idealResponse: "Explain the legal doctrine of 'Cradle-to-Grave' liability under environmental statutes (EPA RCRA / SEMARNAT LGEEPA). Point out that the legal generator of hazardous waste retains perpetual liability regardless of waste hauler contracts. If an unauthorized hauler illegally dumps or contaminates soil, the government holds the generator strictly, jointly, and severally liable for multi-million dollar Superfund remediation and potential criminal prosecution."
                },
                {
                    id: "qe-m6-sc2",
                    title: "Distinguishing Environmental Aspects from Impacts in an Audit",
                    prompt: "During an ISO 14001 stage 2 audit, the auditor reviews your Aspect/Impact matrix. For the stamping press line, the matrix lists 'Noise pollution' as an Aspect and 'High decibels' as an Impact. The auditor prepares to write a finding. How do you correct this technically?",
                    idealResponse: "Clarify immediately to the auditor that the terms were transposed: The Environmental Aspect (the activity/cause interacting with the environment) is 'Acoustic emissions from high-speed stamping operations', and the Environmental Impact (the resulting effect on the environment/humans) is 'Noise pollution, disturbance to surrounding residential communities, and potential worker hearing impairment'. Present the corrected terminology to demonstrate compliance with Clause 6.1.2."
                }
            ],
            quiz: [
                {
                    question: "Under ISO 14001:2015, what is the precise difference between an 'Environmental Aspect' and an 'Environmental Impact'?",
                    options: [
                        "Aspects refer to paper recycling, while impacts refer exclusively to toxic chemical waste.",
                        "An Aspect is the cause (an element of activities interacting with the environment), while an Impact is the effect (the resulting change to the environment).",
                        "Aspects are regulated by municipal law, while impacts are governed by international treaties.",
                        "There is no difference; the terms are completely interchangeable in environmental audits."
                    ],
                    correctIndex: 1,
                    explanation: "Under ISO 14001 definitions, an Environmental Aspect is the activity/input/output that interacts with nature (e.g., water consumption, exhaust emissions), while the Impact is the resulting change to the environment (e.g., aquifer depletion, air quality degradation)."
                },
                {
                    question: "What is the universal engineering requirement for 'Secondary Containment' of hazardous liquid chemicals?",
                    options: [
                        "The berm must be painted safety red and inspected once every ten years.",
                        "The containment system must hold at least 110% of the volume of the largest container or 10% of total aggregate volume.",
                        "The secondary container must be made entirely of disposable cardboard.",
                        "It is only required for outdoor storage facilities in cold climates."
                    ],
                    correctIndex: 1,
                    explanation: "Environmental engineering standards dictate that secondary containment berms must hold a minimum of 110% of the volume of the single largest vessel to safely retain catastrophic ruptures without environmental release."
                },
                {
                    question: "Under the UN Globally Harmonized System (GHS), how many standardized sections must be included in every official Safety Data Sheet (SDS)?",
                    options: [
                        "5 sections",
                        "10 sections",
                        "16 sections",
                        "24 sections"
                    ],
                    correctIndex: 2,
                    explanation: "GHS mandates a strict 16-section standardized format for Safety Data Sheets, ensuring universal placement of identification, hazard classification, firefighting, handling, exposure limits, and disposal guidelines."
                },
                {
                    question: "What does the environmental legal doctrine of 'Cradle-to-Grave Liability' mean for an industrial manufacturing facility?",
                    options: [
                        "The company is only liable for waste while it physically remains inside the plant perimeter.",
                        "The generator retains perpetual legal and financial liability for hazardous waste from generation through ultimate disposal, regardless of third-party contracts.",
                        "Liability ends exactly 30 days after the waste manifest is signed by the truck driver.",
                        "Only government agencies can be held liable for chemical cleanup costs."
                    ],
                    correctIndex: 1,
                    explanation: "Cradle-to-grave liability establishes that the original waste generator remains perpetually liable for cleanup, contamination, and damages throughout the entire lifecycle of the waste."
                }
            ]
        }
    ]
};

// Injection logic
const targetMarker = '\n};';
const lastIndex = fileContent.lastIndexOf(targetMarker);

if (lastIndex === -1) {
    console.error("Could not find closing '};' marker in content/courses.js");
    process.exit(1);
}

// Format track31 as JavaScript object string with indentation
const trackString = ',\n    "quality-ehs": ' + JSON.stringify(track31, null, 8).replace(/^/gm, '    ').trim();

const newContent = fileContent.slice(0, lastIndex) + trackString + fileContent.slice(lastIndex);

// Validate JS syntax in VM before writing
try {
    const script = new vm.Script(newContent);
    const sandbox = { window: {}, LXP_COURSES: {} };
    script.runInNewContext(sandbox);
    console.log("Syntax validation PASSED!");
} catch (err) {
    console.error("Syntax validation FAILED:", err.message);
    process.exit(1);
}

// Write back to courses.js
fs.writeFileSync(coursesPath, newContent, 'utf8');
console.log("Successfully injected Track 31: Quality Engineering & EHS into content/courses.js!");
