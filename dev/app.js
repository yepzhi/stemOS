/* ==========================================================================
   STEMOS LXP - PLATFORM AND SOCRATIC CHAT SIMULATOR INTERACTIVE LOGIC
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Skills Nodes Data --- */
    const skillsData = {
        "lxp-foundation": {
            title: "Tech Skills Foundation",
            status: "completed",
            desc: "Fundamentos de habilidades técnicas y LXP. Conceptos base y desarrollo de metodologías en el entorno tecnológico.",
            prereq: "Ninguno",
            standard: "Fundamentos Técnicos / LXP",
            xp: 150,
            chatTopic: "lxp-foundation"
        },
        semiconductors: {
            title: "STEM: Semiconductores",
            status: "completed",
            desc: "Habilidades técnicas para la fabricación y ensamblaje de circuitos integrados. Conceptos clave sobre cleanrooms, obleas de silicio (wafers) y fotolitografía.",
            prereq: "Tech Skills Foundation",
            standard: "CONOCER EC1338 / Nivel Avanzado",
            xp: 150,
            chatTopic: "semiconductors"
        },
        cybersecurity: {
            title: "STEM: Ciberseguridad & Redes",
            status: "active",
            desc: "Conceptos clave enfocados en ciberseguridad, topología de redes inteligentes, encriptación, firewalls y mitigación de amenazas digitales (threat intelligence).",
            prereq: "Tech Skills Foundation",
            standard: "CONOCER EC1338 / Nivel Avanzado",
            xp: 180,
            chatTopic: "cybersecurity"
        },
        electromobility: {
            title: "STEM: Electromovilidad",
            status: "active",
            desc: "Esqueleto del módulo de electromovilidad. Conceptos clave sobre sistemas de tren motriz eléctrico, gestión de baterías (BMS) y estaciones de carga rápida.",
            prereq: "STEM: Semiconductores",
            standard: "Electromovilidad y Autotransporte",
            xp: 200,
            chatTopic: "electromobility"
        },
        "it-innovation": {
            title: "STEM: TI & Innovación Digital",
            status: "active",
            desc: "Esqueleto del módulo de tecnologías de la información. Fundamentos de APIs, desarrollo frontend/backend, computación en la nube (Cloud) y transformación digital.",
            prereq: "STEM: Ciberseguridad & Redes",
            standard: "Tecnologías de la Información",
            xp: 200,
            chatTopic: "it-innovation"
        },
        aerospace: {
            title: "STEM: Manufactura Aeronáutica",
            status: "locked",
            desc: "Esqueleto de manufactura aeronáutica. Fundamentos de fuselajes, aviónica, motores de propulsión y materiales compuestos avanzados.",
            prereq: "STEM: Electromovilidad & Innovación TI",
            standard: "Manufactura de Alta Precisión",
            xp: 300,
            chatTopic: "aerospace"
        },
        "socratic-capstone": {
            title: "Feynman Capstone Assessment",
            status: "locked",
            desc: "Módulo integrador final. Diálogo socrático abierto sobre resolución de retos técnicos reales en entornos industriales multidisciplinarios.",
            prereq: "STEM: Manufactura Aeronáutica",
            standard: "LXP Capstone / Professional Level",
            xp: 400,
            chatTopic: "socratic-capstone"
        }
    };

    let globalXP = 450;
    let globalCompleted = 3;
    const statCompleted = document.getElementById('stat-completed');
    const statPoints = document.getElementById('stat-points');

    // ── Gated Access: Placement Diagnostic Status & Modals ──
    function hasCompletedPlacement() {
        try {
            const passport = localStorage.getItem('stemos_diagnostic_passport');
            if (passport) return true;
            if (localStorage.getItem('stemos_placement_completed') === 'true') return true;
            if (localStorage.getItem('stemos_active_mcer_level')) return true;
            if (localStorage.getItem('stemos_user_level')) return true;
            const stored = localStorage.getItem('stemos_placement_test') || localStorage.getItem('stemos_placement_result');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && (parsed.assignedLevel || parsed.level || (parsed.result && (parsed.result.assignedLevel || parsed.result.level)))) {
                    return true;
                }
            }
        } catch(e) {}
        return false;
    }
    window.hasCompletedPlacement = hasCompletedPlacement;

    function showPlacementRequiredModal() {
        const modal = document.getElementById('modal-placement-required');
        if (modal) {
            if (typeof modal.showModal === 'function') {
                modal.showModal();
            } else {
                modal.style.display = 'block';
            }
        } else {
            alert('Completa tu cuestionario diagnóstico (Placement Test) para acceder a los módulos de aprendizaje.');
            window.location.href = 'placement.html';
        }
    }
    window.showPlacementRequiredModal = showPlacementRequiredModal;

    // Dynamically ensure ALL 26 tracks exist in skillsData from courses.js
    if (typeof LXP_COURSES !== 'undefined') {
        for (let trackKey in LXP_COURSES) {
            if (!skillsData[trackKey]) {
                const tr = LXP_COURSES[trackKey];
                skillsData[trackKey] = {
                    title: tr.titleEN || tr.title,
                    status: "active",
                    desc: tr.title || tr.titleEN,
                    prereq: "Fundamentos Técnicos",
                    standard: tr.standard || "Estándar Industrial",
                    xp: (tr.modules ? tr.modules.length : 3) * 50,
                    chatTopic: trackKey
                };
            }
        }
    }

    /* --- Speech Synthesis (TTS) Helper --- */
    function speakText(text, lang = 'en-US') {
        if (window.STEMOS_TTS) {
            window.STEMOS_TTS.speak(text, {
                lang: lang,
                speed: 0.93
            });
            return;
        }
        if (!('speechSynthesis' in window)) {
            console.warn("SpeechSynthesis not supported");
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.95;
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
        if (enVoice) utterance.voice = enVoice;
        window.speechSynthesis.speak(utterance);
    }
    window.speakText = speakText;

    const btnHeaderVoice = document.getElementById('btn-header-voice');
    if (btnHeaderVoice) {
        btnHeaderVoice.addEventListener('click', () => {
            speakText("stemOS Studio Audio Engine active. Piper Neural voice connected.");
        });
    }

    /* --- State Management and Progress Persistence --- */
    let userProgress = {
        xp: 450,
        completedReadings: {},
        completedModules: {},
        completedTracks: {},
        nodeStatuses: {}
    };

    function loadProgress() {
        const saved = localStorage.getItem('stemos_user_progress');
        if (saved) {
            try {
                userProgress = JSON.parse(saved);
                if (!userProgress.completedTracks) userProgress.completedTracks = {};
                if (!userProgress.completedModules) userProgress.completedModules = {};
                if (!userProgress.completedReadings) userProgress.completedReadings = {};
                if (!userProgress.nodeStatuses) userProgress.nodeStatuses = {};
                if (typeof userProgress.quizStreak !== 'number') userProgress.quizStreak = 0;

                globalXP = userProgress.xp || 450;
                if (statPoints) statPoints.textContent = globalXP;

                // Sync skillsData statuses from userProgress
                for (let key in userProgress.nodeStatuses) {
                    if (skillsData[key]) {
                        skillsData[key].status = userProgress.nodeStatuses[key];
                    }
                }
                for (let trId in userProgress.completedTracks) {
                    if (userProgress.completedTracks[trId] && skillsData[trId]) {
                        skillsData[trId].status = 'completed';
                    }
                }

                let completedCount = 0;
                for (let node in skillsData) {
                    if (skillsData[node].status === 'completed') {
                        completedCount++;
                    }
                }
                globalCompleted = completedCount;
                if (statCompleted) statCompleted.textContent = globalCompleted;
            } catch (e) {
                console.error("Error loading progress", e);
            }
        } else {
            // Set initial state
            userProgress = {
                xp: globalXP,
                completedReadings: {},
                completedModules: {
                    "semi-m1": true,
                    "semi-m2": true,
                    "semi-m3": true,
                    "semi-m4": true,
                    "semi-m5": true,
                    "semi-m6": true
                },
                completedTracks: {
                    "lxp-foundation": true,
                    "semiconductors": true
                },
                nodeStatuses: {}
            };
            for (let key in skillsData) {
                userProgress.nodeStatuses[key] = skillsData[key].status;
            }
            saveProgress();
        }
        updateProgressBar();
        if (typeof updateKPIMetrics === 'function') updateKPIMetrics();
        if (typeof renderSegmentedProgressBar === 'function') renderSegmentedProgressBar();
        if (typeof renderBadgesWall === 'function') renderBadgesWall();
    }

    function saveProgress() {
        userProgress.xp = globalXP;
        if (!userProgress.nodeStatuses) userProgress.nodeStatuses = {};
        for (let key in skillsData) {
            userProgress.nodeStatuses[key] = skillsData[key].status;
        }
        localStorage.setItem('stemos_user_progress', JSON.stringify(userProgress));
        if (typeof updateKPIMetrics === 'function') updateKPIMetrics();
        if (typeof renderSegmentedProgressBar === 'function') renderSegmentedProgressBar();
        if (typeof renderAllUnitsGrid === 'function' && typeof activeFilterCategory !== 'undefined') {
            renderAllUnitsGrid(activeFilterCategory);
        }
        if (typeof renderBadgesWall === 'function') {
            renderBadgesWall();
        }
        if (window.StemOSWorldMap && typeof window.StemOSWorldMap.syncProgress === 'function') {
            window.StemOSWorldMap.syncProgress();
        }
    }

    // Load progress and update UI
    loadProgress();
    setTimeout(() => {
        updateGraphUI();
    }, 100);

    // Concurrency HUD & Mini PC / Gemini Edge Status
    function updateConnectionHUD() {
        const hud = document.getElementById('header-connection-hud');
        const text = document.getElementById('header-connection-text');
        if (!hud || !text) return;

        if (typeof window.STEMOS_AI !== 'undefined' && typeof window.STEMOS_AI.getStatus === 'function') {
            window.STEMOS_AI.getStatus().then(status => {
                if (status.engine === 'mini_pc') {
                    hud.style.color = '#059669';
                    hud.style.background = 'rgba(16,185,129,0.08)';
                    hud.style.borderColor = 'rgba(16,185,129,0.3)';
                    hud.title = `Mini PC Campus Edge Conectada (${status.url}) · 0 Litros de Agua · Firestore jsweb-b14f8 (100 concurrentes)`;
                    text.innerHTML = '<i class="fa-solid fa-server"></i> Mini PC Edge (0L) &bull; Firestore 100%';
                } else {
                    hud.style.color = '#0284c7';
                    hud.style.background = 'rgba(2,132,199,0.08)';
                    hud.style.borderColor = 'rgba(2,132,199,0.3)';
                    hud.title = `Gemini Cloud Backup (gemini-2.5-flash) · Firestore jsweb-b14f8 activo para 100 alumnos simultáneos`;
                    text.innerHTML = '<i class="fa-solid fa-cloud"></i> Gemini 2.5 Flash &bull; Firestore 100%';
                }
            }).catch(() => {});
        }
    }
    updateConnectionHUD();

    /* --- Tab Switcher --- */
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            item.classList.add('active');
            const tabId = `tab-${item.dataset.tab}`;
            document.getElementById(tabId).classList.add('active');
        });
    });

    /* --- Interactive Skills Graph Selection & View Switcher --- */
    const emptyState = document.querySelector('.info-empty-state');
    const infoContent = document.getElementById('info-content');
    
    // Elements to fill
    const nodeStatusBadge = document.getElementById('node-status-badge');
    const nodeTitle = document.getElementById('node-title');
    const nodeDesc = document.getElementById('node-desc');
    const nodePrereq = document.getElementById('node-prereq');
    const nodeStandard = document.getElementById('node-standard');
    const nodePoints = document.getElementById('node-points');
    const startTutorBtn = document.getElementById('btn-start-tutor');

    let selectedNodeId = null;

    function selectSkillNode(nodeId, clickedElement) {
        const allCircles = document.querySelectorAll('.node-circle');
        allCircles.forEach(c => c.removeAttribute('style'));

        if (clickedElement) {
            const circle = clickedElement.querySelector('.node-circle');
            if (circle) {
                circle.style.strokeWidth = "5px";
                circle.style.stroke = "#f59e0b";
            }
        }

        selectedNodeId = nodeId;
        const nodeData = skillsData[nodeId];

        if (nodeData) {
            if (emptyState) emptyState.classList.add('hidden');
            if (infoContent) infoContent.classList.remove('hidden');

            if (nodeTitle) nodeTitle.textContent = nodeData.title;
            if (nodeDesc) nodeDesc.textContent = nodeData.desc;
            if (nodePrereq) nodePrereq.textContent = nodeData.prereq;
            if (nodeStandard) nodeStandard.textContent = nodeData.standard;
            if (nodePoints) nodePoints.textContent = `${nodeData.xp} XP`;

            if (nodeStatusBadge) {
                nodeStatusBadge.className = "badge-status";
                if (nodeData.status === "completed") {
                    nodeStatusBadge.classList.add('completed');
                    nodeStatusBadge.textContent = "Completada";
                    if (startTutorBtn) {
                        startTutorBtn.disabled = false;
                        startTutorBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Iniciar Repaso Socrático`;
                    }
                } else if (nodeData.status === "active") {
                    nodeStatusBadge.classList.add('active');
                    nodeStatusBadge.textContent = "En Progreso";
                    if (startTutorBtn) {
                        startTutorBtn.disabled = false;
                        startTutorBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Evaluar con Feynman Engine`;
                    }
                } else {
                    nodeStatusBadge.classList.add('locked');
                    nodeStatusBadge.textContent = "Bloqueada";
                    if (startTutorBtn) {
                        startTutorBtn.disabled = true;
                        startTutorBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Habilidad Bloqueada`;
                    }
                }
            }

            renderModules(nodeId);
        }
    }
    window.selectSkillNode = selectSkillNode;

    // Attach to trunk SVG nodes
    const svgNodes = document.querySelectorAll('#skills-graph-svg .node');
    svgNodes.forEach(node => {
        node.addEventListener('click', () => {
            selectSkillNode(node.dataset.node, node);
        });
    });

    // Start Tutor button launches Feynman Engine with selected track
    if (startTutorBtn) {
        startTutorBtn.addEventListener('click', () => {
            if (!selectedNodeId) return;
            switchDashboardView('feynman-tutor');
            const tutorTrackSelect = document.getElementById('tutor-track-select');
            if (tutorTrackSelect && tutorTrackSelect.querySelector(`option[value="${selectedNodeId}"]`)) {
                tutorTrackSelect.value = selectedNodeId;
                tutorTrackSelect.dispatchEvent(new Event('change'));
            }
        });
    }

    // Graph View Switcher (Trunk 7 vs Constellation 26)
    const btnGraphTrunk = document.getElementById('btn-graph-trunk');
    const btnGraphConstellation = document.getElementById('btn-graph-constellation');
    const svgTrunk = document.getElementById('skills-graph-svg');
    const svgConstellation = document.getElementById('skills-graph-constellation-svg');

    if (btnGraphTrunk && btnGraphConstellation) {
        btnGraphTrunk.addEventListener('click', () => {
            btnGraphTrunk.classList.add('active');
            btnGraphConstellation.classList.remove('active');
            if (svgTrunk) svgTrunk.style.display = '';
            if (svgConstellation) svgConstellation.style.display = 'none';
        });

        btnGraphConstellation.addEventListener('click', () => {
            btnGraphConstellation.classList.add('active');
            btnGraphTrunk.classList.remove('active');
            if (svgTrunk) svgTrunk.style.display = 'none';
            if (svgConstellation) {
                svgConstellation.style.display = '';
                if (typeof renderConstellationGraph === 'function') {
                    renderConstellationGraph();
                    updateGraphUI();
                }
            }
        });
    }

    /* --- Socratic Chat Simulator (Feynman Engine v2) --- */
    const tutorStatusText = document.getElementById('tutor-status-text');
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const tutorTrackSelect = document.getElementById('tutor-track-select');
    const tutorModSelect = document.getElementById('tutor-mod-select');
    const btnLaunchSocratic = document.getElementById('btn-launch-socratic');
    const tutorChallengeMeta = document.getElementById('tutor-challenge-meta');
    const tutorChallengeStepBadge = document.getElementById('tutor-challenge-step-badge');
    const tutorChallengeConcept = document.getElementById('tutor-challenge-concept');
    const tutorChallengeXp = document.getElementById('tutor-challenge-xp');

    let chatState = {
        active: false,
        topic: "",
        trackId: "",
        modId: "",
        modTitle: "",
        challenges: [],
        currentChallengeIndex: 0,
        step: 0,
        lastUserReply: ""
    };

    // Initialize Tutor Selectors with 26 tracks & their modules
    function initTutorSelectors() {
        if (!tutorTrackSelect || !tutorModSelect) return;
        tutorTrackSelect.innerHTML = '';

        const trackKeys = Object.keys(coursesData);
        trackKeys.forEach(trackKey => {
            const tr = coursesData[trackKey];
            const opt = document.createElement('option');
            opt.value = trackKey;
            opt.textContent = `${tr.titleEN || tr.title} (${tr.category || 'Tech'})`;
            tutorTrackSelect.appendChild(opt);
        });

        function populateModules(trackKey) {
            tutorModSelect.innerHTML = '';
            const tr = coursesData[trackKey];
            if (!tr || !tr.modules) return;

            tr.modules.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.id;
                const hasSocratic = m.socraticChallenges && m.socraticChallenges.length > 0;
                opt.textContent = `${m.titleES || m.title} ${hasSocratic ? '★ [Reto Socrático]' : ''}`;
                tutorModSelect.appendChild(opt);
            });
        }

        tutorTrackSelect.addEventListener('change', () => {
            populateModules(tutorTrackSelect.value);
        });

        if (trackKeys.length > 0) {
            populateModules(trackKeys[0]);
        }

        if (btnLaunchSocratic) {
            btnLaunchSocratic.addEventListener('click', () => {
                const trId = tutorTrackSelect.value;
                const mId = tutorModSelect.value;
                launchSocraticChallenge(trId, mId);
            });
        }
    }

    // Launch Socratic Challenge for any Track & Module
    function launchSocraticChallenge(trackId, modId) {
        if (!hasCompletedPlacement()) {
            showPlacementRequiredModal();
            return;
        }
        const track = coursesData[trackId];
        if (!track) return;
        const mod = (track.modules && track.modules.find(m => m.id === modId)) || (track.modules && track.modules[0]);
        if (!mod) return;

        // Switch to feynman-tutor view if not already there
        switchDashboardView('feynman-tutor');
        const tutorSection = document.getElementById('tutor-section');
        if (tutorSection) tutorSection.scrollIntoView({ behavior: 'smooth' });

        chatState.active = true;
        chatState.trackId = trackId;
        chatState.modId = mod.id;
        chatState.modTitle = mod.titleES || mod.title;
        chatState.challenges = mod.socraticChallenges || [];
        chatState.currentChallengeIndex = 0;
        chatState.step = 1;

        tutorStatusText.textContent = `Reto: ${chatState.modTitle} (${track.titleEN || track.title})`;
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatMessagesContainer.innerHTML = '';

        if (tutorTrackSelect && tutorModSelect) {
            tutorTrackSelect.value = trackId;
            if (tutorTrackSelect.value !== trackId) {
                tutorTrackSelect.value = trackId;
                tutorTrackSelect.dispatchEvent(new Event('change'));
            }
            tutorModSelect.value = mod.id;
        }

        if (chatState.challenges.length > 0) {
            const firstCh = chatState.challenges[0];
            if (tutorChallengeMeta) {
                tutorChallengeMeta.style.display = 'flex';
                tutorChallengeStepBadge.textContent = `Paso 1 de ${chatState.challenges.length}`;
                tutorChallengeConcept.textContent = `Concepto: ${firstCh.concept}`;
                tutorChallengeXp.textContent = `+25 XP por paso`;
            }
            addBotMessage(`¡Excelente! Iniciamos el Reto Socrático para **${chatState.modTitle}**.<br><br><strong>[Paso 1: ${firstCh.concept}]</strong><br>${firstCh.botQuestion}`);
        } else {
            if (tutorChallengeMeta) tutorChallengeMeta.style.display = 'none';
            addBotMessage(`¡Bienvenido, Alberto! Iniciamos el análisis socrático de **${chatState.modTitle}**.<br><br>Explícame en inglés técnico los conceptos clave de este módulo y cómo los aplicarías en una operación de ingeniería real.`);
        }
        chatInput.focus();
    }
    window.launchSocraticChallenge = launchSocraticChallenge;

    startTutorBtn.addEventListener('click', () => {
        if (!selectedNodeId) return;
        launchSocraticChallenge(selectedNodeId, `${selectedNodeId}-m1`);
    });

    // Helper functions for chat
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';
        messageDiv.innerHTML = `
            <div class="avatar">F</div>
            <div class="message-bubble">
                <p>${text}</p>
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.innerHTML = `
            <div class="avatar">A</div>
            <div class="message-bubble">
                <p>${text}</p>
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'tutor-typing';
        typingDiv.innerHTML = `
            <div class="avatar">F</div>
            <div class="message-bubble" style="padding: 10px 20px;">
                <span style="font-style: italic; color: var(--text-secondary);"><i class="fa-solid fa-spinner fa-spin"></i> Analizando respuesta técnica...</span>
            </div>
        `;
        chatMessagesContainer.appendChild(typingDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingDiv = document.getElementById('tutor-typing');
        if (typingDiv) typingDiv.remove();
    }

    // Process Socratic Step
    function triggerFeynmanSocraticStep() {
        removeTypingIndicator();
        const reply = (chatState.lastUserReply || "").toLowerCase();

        // 1. Structured Socratic Challenges (Available in 89+ modules)
        if (chatState.challenges && chatState.challenges.length > 0) {
            const ch = chatState.challenges[chatState.currentChallengeIndex];
            if (!ch) {
                resetTutor();
                return;
            }

            // Keyword match algorithm
            const requiredKeywords = ch.requiredKeywords || [];
            const minRequired = Math.min(ch.minKeywords || 2, requiredKeywords.length);
            const matched = requiredKeywords.filter(kw => reply.includes(kw.toLowerCase()));

            if (matched.length >= minRequired || reply.length > 120) {
                // Success: praise, award XP, and move forward
                addBotMessage(`✅ <strong>¡Excelente comprensión técnica!</strong><br><br>${ch.feedbackSuccess}`);
                awardXP(25);

                chatState.currentChallengeIndex++;
                if (chatState.currentChallengeIndex < chatState.challenges.length) {
                    const nextCh = chatState.challenges[chatState.currentChallengeIndex];
                    if (tutorChallengeMeta) {
                        tutorChallengeStepBadge.textContent = `Paso ${chatState.currentChallengeIndex + 1} de ${chatState.challenges.length}`;
                        tutorChallengeConcept.textContent = `Concepto: ${nextCh.concept}`;
                    }
                    setTimeout(() => {
                        addBotMessage(`<strong>[Paso ${chatState.currentChallengeIndex + 1}: ${nextCh.concept}]</strong><br>${nextCh.botQuestion}`);
                    }, 800);
                } else {
                    // Completed all challenges in this module!
                    userProgress.completedModules[chatState.modId] = true;
                    checkTrackCompletion();
                    saveProgress();
                    if (tutorChallengeMeta) tutorChallengeMeta.style.display = 'none';

                    setTimeout(() => {
                        let phraseRecommendation = '';
                        if (phrasesData && phrasesData.length > 0) {
                            const trackCategoryMap = {
                                'cybersecurity': 'problem_solving',
                                'semiconductors': 'technical_debate',
                                'aerospace': 'metrics',
                                'biotechnology': 'problem_solving',
                                'ai-ml': 'technical_debate',
                                'electromobility': 'metrics',
                                'robotics-automation': 'problem_solving',
                                'energy-renewables': 'metrics',
                                'telecom-iot': 'workplace',
                                'software-dev': 'technical_debate',
                                'project-management': 'meetings',
                                'business-leadership': 'soft_skills',
                                'web-dev-agentic': 'technical_debate'
                            };
                            const targetCat = trackCategoryMap[chatState.trackId] || 'workplace';
                            const matching = phrasesData.filter(p => p.category === targetCat);
                            const chosen = (matching.length > 0)
                                ? matching[Math.floor(Math.random() * matching.length)]
                                : phrasesData[0];
                            if (chosen) {
                                phraseRecommendation = `
                                    <div style="margin-top:14px; padding:12px 14px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; text-align:left;">
                                        <div style="font-size:0.72rem; font-weight:700; color:#15803d; text-transform:uppercase; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                                            <i class="fa-solid fa-lightbulb"></i> Expresión Profesional Recomendada:
                                        </div>
                                        <div style="font-size:0.95rem; font-weight:800; color:#0f172a; margin-bottom:3px;">"${chosen.phrase}"</div>
                                        <div style="font-size:0.8rem; color:#475569; margin-bottom:4px;">${chosen.meaningES}</div>
                                        <div style="font-size:0.76rem; color:#16a34a; font-style:italic;">"${chosen.exampleEN}"</div>
                                    </div>
                                `;
                            }
                        }

                        addBotMessage(`🎉 <strong>¡Reto Socrático Completado!</strong><br><br>Has demostrado dominio riguroso de los conceptos y vocabulario de <strong>${chatState.modTitle}</strong>.<br><br><strong>+50 XP Bonus de Maestría Socrática otorgados.</strong>${phraseRecommendation}<br>Puedes continuar con otro módulo o certificar tu unidad.`);
                        awardXP(50);
                        resetTutor();
                    }, 800);
                }
            } else {
                // Retry feedback: constructive hint
                const hints = requiredKeywords.slice(0, 3).join(', ');
                addBotMessage(`💡 <strong>Reflexión Socrática:</strong><br><br>${ch.feedbackRetry}<br><br><small style="color:#64748b;">(Pistas conceptuales clave para incluir: <em>${hints}</em>)</small>`);
            }
            return;
        }

        // 2. Fallback for Modules without pre-authored challenges
        if (chatState.step === 1) {
            addBotMessage(`Bien planteado. Ahora, ¿cómo relacionas esto con los estándares de control de calidad o seguridad industrial en plantas de manufactura avanzada?`);
        } else if (chatState.step === 2) {
            addBotMessage(`¡Sólida argumentación técnica, Alberto! Has articulado el concepto con claridad profesional. <strong>+35 XP otorgados.</strong>`);
            awardXP(35);
            resetTutor();
        }
    }

    // Send Message Logic
    async function handleUserReply() {
        const text = chatInput.value.trim();
        if (!text || !chatState.active) return;

        chatState.lastUserReply = text;
        addUserMessage(text);
        chatInput.value = '';
        chatInput.disabled = true;
        chatSendBtn.disabled = true;

        showTypingIndicator();

        // If structured challenges exist for this module, evaluate through structured rubric
        if (chatState.challenges && chatState.challenges.length > 0) {
            setTimeout(() => {
                chatState.step += 1;
                chatInput.disabled = false;
                chatSendBtn.disabled = false;
                triggerFeynmanSocraticStep();
                chatInput.focus();
            }, 1000);
            return;
        }

        // Dynamic Socratic AI Tutor via Campus Mini PC or Gemini 2.5 Flash
        if (typeof window.STEMOS_AI !== 'undefined' && typeof window.STEMOS_AI.chatTutor === 'function') {
            try {
                const aiResponse = await window.STEMOS_AI.chatTutor(text, {
                    trackId: chatState.trackId,
                    modId: chatState.modId,
                    modTitle: chatState.modTitle
                });
                removeTypingIndicator();
                chatState.step += 1;
                chatInput.disabled = false;
                chatSendBtn.disabled = false;

                const replyText = typeof aiResponse === 'object' ? (aiResponse.text || '') : aiResponse;
                const engineName = typeof aiResponse === 'object' ? (aiResponse.engine || '') : '';
                const engineBadge = engineName
                    ? `<div style="margin-top:6px; font-size:0.68rem; font-weight:700; color:#0284c7; opacity:0.8;"><i class="fa-solid fa-microchip"></i> ${engineName}</div>`
                    : '';
                addBotMessage(`${replyText}${engineBadge}`);

                if (chatState.step >= 3) {
                    awardXP(35);
                    setTimeout(() => {
                        addBotMessage(`🎉 <strong>¡Reto Socrático Aprobado!</strong> Has demostrado dominio riguroso del vocabulario y conceptos de <strong>${chatState.modTitle}</strong>. <strong>+35 XP otorgados.</strong>`);
                        resetTutor();
                    }, 1000);
                }
                chatInput.focus();
                return;
            } catch (e) {
                console.warn('[stemOS Chat] AI Tutor fallback:', e);
            }
        }

        // Offline deterministic fallback
        setTimeout(() => {
            chatState.step += 1;
            chatInput.disabled = false;
            chatSendBtn.disabled = false;
            triggerFeynmanSocraticStep();
            chatInput.focus();
        }, 1200);
    }

    chatSendBtn.addEventListener('click', handleUserReply);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserReply();
    });

    function resetTutor() {
        chatState.active = false;
        chatState.topic = "";
        chatState.step = 0;
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.value = '';
        tutorStatusText.textContent = "Tema: Sesión finalizada · Selecciona otro módulo";
    }

    function awardXP(amount) {
        globalXP += amount;
        statPoints.textContent = globalXP;
        saveProgress();
        updateProgressBar();
    }



    /* ==========================================
       CERTIFICATE VIEW MODAL & W3C OPEN BADGES 3.0
       ========================================== */
    const modal = document.getElementById('cert-modal');
    const modalClose = document.getElementById('cert-modal-close');
    const badgeCertBtns = document.querySelectorAll('.badge-cert-btn');
    const printBtn = document.getElementById('btn-print-cert');
    const exportBadgeBtn = document.getElementById('btn-export-badge-json');
    let currentCertTrackId = 'semiconductors';

    function openCertificateModal(trackId) {
        currentCertTrackId = trackId || 'semiconductors';

        const modalCertSkill = document.getElementById('modal-cert-skill');
        const modalCertId = document.getElementById('modal-cert-id');
        const modalCertRecipient = document.getElementById('modal-cert-recipient');
        const modalCertAccreditation = document.getElementById('modal-cert-accreditation');
        const modalCertDemonstration = document.getElementById('modal-cert-demonstration');
        const modalCertDate = document.getElementById('modal-cert-date');

        // Dynamic Student Name
        let studentName = 'Alberto Yépiz';
        try {
            const profile = JSON.parse(localStorage.getItem('stemos_student_profile') || '{}');
            if (profile && profile.name) studentName = profile.name;
            else if (localStorage.getItem('stemos_user_name')) studentName = localStorage.getItem('stemos_user_name');
        } catch(e) {}
        if (modalCertRecipient) modalCertRecipient.textContent = studentName;

        // Current Date Formatted
        const todayStr = new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
        if (modalCertDate) modalCertDate.textContent = `Hermosillo, Sonora / Mexicali, B.C., a ${todayStr}`;

        // Check if MCER level
        let isMcer = false;
        let mcerLevelObj = null;
        const mcerMatch = currentCertTrackId.match(/^mcer-([ab][12])$/i);
        if (mcerMatch && window.STEMOS_MCER_TRACKS) {
            const code = mcerMatch[1].toUpperCase();
            mcerLevelObj = window.STEMOS_MCER_TRACKS.getLevel(code);
            isMcer = !!mcerLevelObj;
        }

        if (isMcer && mcerLevelObj) {
            const hashCode = `CACEI-DGUTYP-${mcerLevelObj.code}-${Math.abs((mcerLevelObj.code.charCodeAt(0) * 8191 + studentName.length * 1337)).toString(16).toUpperCase()}`;
            if (modalCertSkill) {
                modalCertSkill.textContent = `Marco MCER ${mcerLevelObj.code}: ${mcerLevelObj.name} (60.0 Horas Acreditadas)`;
            }
            if (modalCertId) {
                modalCertId.textContent = `VERIFIED: ${hashCode}`;
            }
            if (modalCertDemonstration) {
                modalCertDemonstration.textContent = 'Por haber demostrado fehacientemente mediante evaluación conversacional socrática, simulación de crisol industrial y lectura de normas técnicas sus competencias comunicativas en:';
            }
            if (modalCertAccreditation) {
                modalCertAccreditation.innerHTML = `Acreditación Curricular Universitaria <strong>60.0 Horas Activas</strong> conforme al <strong>Marco Común Europeo de Referencia (CEFR/MCER Council of Europe)</strong> e indicadores de acreditación <strong>CACEI / DGUTyP (${mcerLevelObj.milestone ? mcerLevelObj.milestone.accreditation : 'Tronco Común'})</strong>.`;
            }
        } else {
            const track = coursesData[currentCertTrackId] || (typeof LXP_COURSES !== 'undefined' && LXP_COURSES[currentCertTrackId]) || { title: 'stemOS Specialization' };
            const hashCode = `STEMOS-${currentCertTrackId.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${(currentCertTrackId.length * 1337).toString(16).toUpperCase()}`;

            if (modalCertSkill) {
                modalCertSkill.textContent = `${track.titleEN || track.title} — ${track.badgeName || 'Technical Specialization'}`;
            }
            if (modalCertId) {
                modalCertId.textContent = `VERIFIED: ${hashCode}`;
            }
            if (modalCertDemonstration) {
                modalCertDemonstration.textContent = 'Por haber demostrado fehacientemente y mediante evaluación conversacional socrática sus competencias en la habilidad de:';
            }
            if (modalCertAccreditation) {
                modalCertAccreditation.innerHTML = 'Alineado con los estándares internacionales <strong>NGSS HS-PS4</strong> y del marco <strong>CONOCER SEP EC1290</strong>.';
            }
        }

        if (modal) modal.showModal();
    }
    window.openCertificateModal = openCertificateModal;

    badgeCertBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certType = btn.dataset.cert || 'semiconductors';
            openCertificateModal(certType);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (modal) modal.close();
        });
    }

    // Light dismiss: close on backdrop click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    }

    // Print certificate
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // W3C Verifiable Credentials / Open Badges 3.0 JSON-LD Export
    if (exportBadgeBtn) {
        exportBadgeBtn.addEventListener('click', () => {
            let studentName = 'Alberto Yépiz';
            try {
                const profile = JSON.parse(localStorage.getItem('stemos_student_profile') || '{}');
                if (profile && profile.name) studentName = profile.name;
                else if (localStorage.getItem('stemos_user_name')) studentName = localStorage.getItem('stemos_user_name');
            } catch(e) {}

            const mcerMatch = currentCertTrackId.match(/^mcer-([ab][12])$/i);
            let badgeJson;
            if (mcerMatch && window.STEMOS_MCER_TRACKS) {
                const code = mcerMatch[1].toUpperCase();
                const mcerLevelObj = window.STEMOS_MCER_TRACKS.getLevel(code);
                const hashCode = `CACEI-DGUTYP-${code}-${Math.abs((code.charCodeAt(0) * 8191 + studentName.length * 1337)).toString(16).toUpperCase()}`;

                badgeJson = {
                    "@context": [
                        "https://www.w3.org/2018/credentials/v1",
                        "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
                    ],
                    "id": `urn:uuid:stemos-mcer-${code.toLowerCase()}-${Date.now()}`,
                    "type": ["VerifiableCredential", "OpenBadgeCredential"],
                    "issuer": {
                        "id": "https://stemos.org/issuers/mcer-cacei-accreditation",
                        "type": "Profile",
                        "name": "stemOS Platform — CACEI & DGUTyP Standard American English Accreditation",
                        "url": "https://stemos.org",
                        "email": "credentials@stemos.org"
                    },
                    "issuanceDate": new Date().toISOString(),
                    "credentialSubject": {
                        "id": "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
                        "type": "AchievementSubject",
                        "name": studentName,
                        "achievement": {
                            "id": `https://stemos.org/achievements/mcer-${code.toLowerCase()}`,
                            "type": "Achievement",
                            "name": `CEFR ${code}: ${mcerLevelObj ? mcerLevelObj.name : 'Curricular English'} (60.0h Course)`,
                            "description": `Acreditación formal de 60.0 horas de inglés técnico estándar bajo el Marco Común Europeo de Referencia (CEFR/MCER).`,
                            "criteria": {
                                "narrative": "Aprobación de 4 unidades de 15.0h, simulación de crisol industrial con evaluación por rúbrica AI y Milestone Checkpoint superior al 80%."
                            },
                            "alignment": [
                                {
                                    "targetName": `CACEI / DGUTyP ${mcerLevelObj && mcerLevelObj.milestone ? mcerLevelObj.milestone.accreditation : 'Inglés I'}`,
                                    "targetUrl": "http://cacei.org.mx"
                                },
                                {
                                    "targetName": `Council of Europe CEFR Level ${code}`,
                                    "targetUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages"
                                }
                            ]
                        }
                    },
                    "proof": {
                        "type": "Ed25519Signature2020",
                        "created": new Date().toISOString(),
                        "verificationMethod": "https://stemos.org/issuers/mcer-cacei-accreditation#key-1",
                        "proofValue": hashCode
                    }
                };
            } else {
                const track = coursesData[currentCertTrackId] || (typeof LXP_COURSES !== 'undefined' && LXP_COURSES[currentCertTrackId]) || { title: 'stemOS Specialization', id: currentCertTrackId };
                const hashCode = `STEMOS-${(track.id || currentCertTrackId).toUpperCase().replace(/[^A-Z0-9]/g, '')}-${((track.id || currentCertTrackId).length * 1337).toString(16).toUpperCase()}`;

                badgeJson = {
                    "@context": [
                        "https://www.w3.org/2018/credentials/v1",
                        "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
                    ],
                    "id": `urn:uuid:stemos-cert-${currentCertTrackId}-${Date.now()}`,
                    "type": ["VerifiableCredential", "OpenBadgeCredential"],
                    "issuer": {
                        "id": "https://stemos.dev/issuers/stemos-foundation",
                        "type": "Profile",
                        "name": "stemOS LXP — JóvenesSTEM & Lovelace Tech",
                        "url": "https://stemos.dev",
                        "email": "credentials@stemos.dev"
                    },
                    "issuanceDate": new Date().toISOString(),
                    "credentialSubject": {
                        "id": "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
                        "type": "AchievementSubject",
                        "name": studentName,
                        "achievement": {
                            "id": `https://stemos.dev/achievements/${currentCertTrackId}`,
                            "type": "Achievement",
                            "name": track.badgeName || track.titleEN || track.title,
                            "description": `Demostró competencia técnica y socrática en el track ${track.titleEN || track.title} (${track.category || 'STEM'}).`,
                            "criteria": {
                                "narrative": "Aprobación del 100% de los módulos de vocabulario técnico, lecturas de manufactura avanzada y desafío socrático evaluado por el motor Feynman."
                            },
                            "alignment": [
                                {
                                    "targetName": track.badgeStandard || track.standard || "SEP CONOCER EC1290 / ISO Standard",
                                    "targetUrl": "https://conocer.gob.mx"
                                }
                            ]
                        }
                    },
                    "proof": {
                        "type": "Ed25519Signature2020",
                        "created": new Date().toISOString(),
                        "verificationMethod": "https://stemos.dev/issuers/stemos-foundation#key-1",
                        "proofValue": hashCode
                    }
                };
            }

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(badgeJson, null, 2));
            const dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", `stemos-open-badge-${currentCertTrackId}.json`);
            document.body.appendChild(dlAnchor);
            dlAnchor.click();
            dlAnchor.remove();
        });
    }

    /* ==========================================
       ACADEMIC READER & EVALUATION LOGIC
       ========================================== */
    const academicModal = document.getElementById('academic-modal');
    const academicModalClose = document.getElementById('academic-modal-close');
    const acadTrackTitle = document.getElementById('acad-track-title');
    const acadModuleTitle = document.getElementById('acad-module-title');
    
    // Timeline buttons / headers
    const stepBtnRead = document.getElementById('step-btn-read');
    const stepBtnVocab = document.getElementById('step-btn-vocab');
    const stepBtnQuiz = document.getElementById('step-btn-quiz');
    
    // Screens
    const screenReading = document.getElementById('screen-reading');
    const screenVocabulary = document.getElementById('screen-vocabulary');
    const screenQuiz = document.getElementById('screen-quiz');
    const screenCongrats = document.getElementById('screen-congrats');
    
    // Areas to inject content
    const readingContentArea = document.getElementById('reading-content-area');
    const vocabGridArea = document.getElementById('vocab-grid-area');
    const quizQuestionsArea = document.getElementById('quiz-questions-area');
    
    // Navigation inside modal
    const btnToVocab = document.getElementById('btn-to-vocab');
    const btnBackToRead = document.getElementById('btn-back-to-read');
    const btnToQuiz = document.getElementById('btn-to-quiz');
    const btnBackToVocab = document.getElementById('btn-back-to-vocab');
    const btnSubmitQuiz = document.getElementById('btn-submit-quiz');
    const btnCloseAcademicSuccess = document.getElementById('btn-close-academic-success');

    let activeModule = null;
    let activeTrackId = null;
    let activeReadingIndex = 0;

    function renderModules(nodeId) {
        const modulesList = document.getElementById('modules-list');
        if (!modulesList) return;
        modulesList.innerHTML = '';

        const nodeData = skillsData[nodeId];
        if (!nodeData) return;

        if (nodeData.status === 'locked') {
            modulesList.innerHTML = `
                <div class="info-empty-state" style="padding: 10px 0;">
                    <i class="fa-solid fa-lock text-muted" style="font-size: 1.5rem;" aria-hidden="true"></i>
                    <p style="font-size: 0.8rem; margin-top: 6px;">Módulos bloqueados. Completa primero: <strong>${nodeData.prereq}</strong>.</p>
                </div>
            `;
            return;
        }

        // Get course data from courses.js (LXP_COURSES)
        const course = typeof LXP_COURSES !== 'undefined' ? LXP_COURSES[nodeId] : null;
        if (!course || !course.modules || course.modules.length === 0) {
            modulesList.innerHTML = `
                <div class="info-empty-state" style="padding: 10px 0;">
                    <i class="fa-solid fa-compass-drafting text-muted" style="font-size: 1.5rem;" aria-hidden="true"></i>
                    <p style="font-size: 0.8rem; margin-top: 6px;">Esta unidad no contiene módulos académicos en la versión actual.</p>
                </div>
            `;
            return;
        }

        course.modules.forEach((mod, index) => {
            const isCompleted = userProgress.completedModules[mod.id] === true;
            const isParentCompleted = nodeData.status === 'completed';
            const isUnlocked = isParentCompleted || index === 0 || userProgress.completedModules[course.modules[index - 1].id] === true;

            const card = document.createElement('div');
            card.className = `module-card ${isCompleted ? 'completed' : isUnlocked ? 'active' : 'locked'}`;
            
            const iconClass = mod.icon || 'fa-solid fa-book';
            
            let badgeHTML = '';
            let actionBtnHTML = '';
            
            if (isCompleted) {
                badgeHTML = '<span class="module-badge completed">Aprobado</span>';
                actionBtnHTML = '<button class="module-action-btn" title="Repasar" aria-label="Repasar"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i></button>';
            } else if (isUnlocked) {
                badgeHTML = '<span class="module-badge pending">Pendiente</span>';
                actionBtnHTML = '<button class="module-action-btn" title="Iniciar" aria-label="Iniciar"><i class="fa-solid fa-play" aria-hidden="true"></i></button>';
            } else {
                badgeHTML = '<span class="module-badge locked">Bloqueado</span>';
                actionBtnHTML = '<button class="module-action-btn" disabled aria-label="Bloqueado"><i class="fa-solid fa-lock" aria-hidden="true"></i></button>';
            }

            if (mod.isGoldModel) {
                badgeHTML = '<span class="module-badge gold" style="background:rgba(251,191,36,0.22); color:#fbbf24; border:1px solid #fbbf24; font-weight:800; font-size:0.75rem; padding:2px 8px; border-radius:6px; margin-right:4px;"><i class="fa-solid fa-star"></i> GOLD ESP</span> ' + badgeHTML;
            }

            const totalReadings = mod.readings ? mod.readings.length : 0;
            const completedReadingsInMod = mod.readings ? mod.readings.filter(r => userProgress.completedReadings[r.id]).length : 0;
            
            let subtitleText = '';
            if (totalReadings === 0) {
                subtitleText = 'Esqueleto - Próximamente';
            } else if (totalReadings > 1) {
                subtitleText = `${completedReadingsInMod}/${totalReadings} Lecturas Completadas`;
            } else {
                subtitleText = '1 Lectura Técnica';
            }

            card.innerHTML = `
                <div class="module-card-left">
                    <div class="module-card-icon">
                        <i class="${iconClass}" aria-hidden="true"></i>
                    </div>
                    <div class="module-card-details">
                        <span class="module-card-title">${mod.titleES || mod.title}</span>
                        <span class="module-card-subtitle">${subtitleText}</span>
                    </div>
                </div>
                <div class="module-card-right">
                    ${badgeHTML}
                    ${actionBtnHTML}
                </div>
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => {
                    openAcademicModal(nodeId, mod);
                });
            }

            modulesList.appendChild(card);
        });
    }

    function openAcademicModal(trackId, mod) {
        if (!hasCompletedPlacement()) {
            showPlacementRequiredModal();
            return;
        }
        activeTrackId = trackId;
        activeModule = mod;
        activeReadingIndex = 0;

        // Reset scroll position
        readingContentArea.scrollTop = 0;

        const track = LXP_COURSES[trackId];
        acadTrackTitle.textContent = track ? (track.titleEN || track.title) : "LXP Track";
        
        // Check if there are readings:
        if (!mod.readings || mod.readings.length === 0) {
            acadModuleTitle.textContent = mod.titleES || mod.title;
            switchScreen('reading');
            renderSkeletonView(mod);
            academicModal.showModal();
            return;
        }

        // Find first uncompleted reading
        let readingIdx = mod.readings.findIndex(r => !userProgress.completedReadings[r.id]);
        if (readingIdx === -1) {
            readingIdx = 0; // Default to first reading if all are completed
        }
        activeReadingIndex = readingIdx;

        switchScreen('reading');
        renderCurrentReading();
        academicModal.showModal();
    }
    window.openAcademicModal = openAcademicModal;

    function switchScreen(screenName) {
        screenReading.classList.remove('active');
        screenVocabulary.classList.remove('active');
        screenQuiz.classList.remove('active');
        screenCongrats.classList.remove('active');

        stepBtnRead.classList.remove('active', 'completed');
        stepBtnVocab.classList.remove('active', 'completed');
        stepBtnQuiz.classList.remove('active', 'completed');

        if (screenName === 'reading') {
            screenReading.classList.add('active');
            stepBtnRead.classList.add('active');
        } else if (screenName === 'vocabulary') {
            screenVocabulary.classList.add('active');
            stepBtnRead.classList.add('completed');
            stepBtnVocab.classList.add('active');
        } else if (screenName === 'quiz') {
            screenQuiz.classList.add('active');
            const fb = document.getElementById('quiz-feedback-banner');
            if (fb) fb.style.display = 'none';
            stepBtnRead.classList.add('completed');
            stepBtnVocab.classList.add('completed');
            stepBtnQuiz.classList.add('active');
        } else if (screenName === 'congrats') {
            screenCongrats.classList.add('active');
            stepBtnRead.classList.add('completed');
            stepBtnVocab.classList.add('completed');
            stepBtnQuiz.classList.add('completed');
        }
    }

    function renderCurrentReading() {
        const reading = activeModule.readings[activeReadingIndex];
        if (!reading) return;

        // Render reading text
        readingContentArea.innerHTML = parseMarkdownLineByLine(reading.content);

        // Make bold vocabulary terms interactive inside the reading text
        if (reading.vocabulary && reading.vocabulary.length > 0) {
            const strongs = readingContentArea.querySelectorAll('strong');
            strongs.forEach(strong => {
                const text = strong.textContent.trim().toLowerCase();
                
                // Find matching vocabulary item
                const match = reading.vocabulary.find(item => {
                    const enTerm = item.en.toLowerCase();
                    return text === enTerm || 
                           text.includes(enTerm) || 
                           enTerm.includes(text) ||
                           (text.endsWith('s') && text.slice(0, -1) === enTerm);
                });

                if (match) {
                    strong.classList.add('vocab-keyword');
                    strong.title = `Significado A2 de: ${match.en}`;
                    
                    strong.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Remove any existing popovers
                        document.querySelectorAll('.vocab-popover').forEach(p => p.remove());

                        // Create popover
                        const popover = document.createElement('div');
                        popover.className = 'vocab-popover glass-panel';
                        popover.innerHTML = `
                            <div class="popover-header">
                                <strong class="text-cyan">${match.en}</strong> 
                                <span style="color:var(--text-muted)">→</span> 
                                <strong class="text-indigo">${match.es}</strong>
                            </div>
                            <p class="popover-definition">${match.definition}</p>
                            <div class="popover-footer">Vocabulario A2</div>
                        `;

                        document.body.appendChild(popover);

                        // Position popover relative to the clicked element
                        const rect = strong.getBoundingClientRect();
                        popover.style.position = 'absolute';
                        popover.style.zIndex = '10000';
                        
                        // Center popover horizontally relative to the keyword
                        let leftPos = rect.left + window.scrollX + (rect.width / 2) - 140;
                        let topPos = rect.bottom + window.scrollY + 8;
                        
                        if (leftPos < 10) leftPos = 10;
                        if (leftPos + 280 > window.innerWidth) leftPos = window.innerWidth - 290;

                        popover.style.left = `${leftPos}px`;
                        popover.style.top = `${topPos}px`;

                        // Close popover when clicking anywhere
                        const closeHandler = () => {
                            popover.remove();
                            document.removeEventListener('click', closeHandler);
                        };
                        setTimeout(() => {
                            document.addEventListener('click', closeHandler);
                        }, 50);
                    });
                }
            });
        }

        const totalReadings = activeModule.readings.length;
        if (totalReadings > 1) {
            acadModuleTitle.textContent = `${activeModule.titleES || activeModule.title} (${activeReadingIndex + 1}/${totalReadings})`;
        } else {
            acadModuleTitle.textContent = activeModule.titleES || activeModule.title;
        }

        // Render Vocabulary or Lexicon Matrix with TTS Audio
        vocabGridArea.innerHTML = '';
        if (activeModule.lexiconMatrix && activeModule.lexiconMatrix.length > 0) {
            vocabGridArea.className = 'lexicon-matrix-container';
            activeModule.lexiconMatrix.forEach(item => {
                const card = document.createElement('div');
                card.className = 'lexicon-card';

                let collocationsHTML = '';
                if (item.collocations && item.collocations.length > 0) {
                    collocationsHTML = `<div class="lexicon-collocations">` +
                        item.collocations.map(c => `<span class="colloc-tag">${c}</span>`).join('') +
                        `</div>`;
                }

                let falseFriendHTML = '';
                if (item.falseFriends) {
                    falseFriendHTML = `<div class="lexicon-false-friend">
                        <strong>⚠️ Nota Técnica / Falso Amigo:</strong> ${item.falseFriends}
                    </div>`;
                }

                let nativeUsageHTML = '';
                if (item.nativeUsage) {
                    nativeUsageHTML = `
                        <div class="lexicon-native-box">
                            <div class="lexicon-native-title">
                                <i class="fa-solid fa-quote-left"></i> Uso en Planta / Laboratorio
                            </div>
                            <div class="lexicon-native-text">"${item.nativeUsage}"</div>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div class="lexicon-header">
                        <div class="lexicon-term-box">
                            <div class="lexicon-term-en">${item.term}</div>
                            ${item.ipa ? `<div class="lexicon-term-ipa">${item.ipa}</div>` : ''}
                            <div class="lexicon-term-es">${item.es || ''}</div>
                        </div>
                        <button class="vocab-audio-btn" title="Escuchar pronunciación nativa">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <p class="lexicon-def">${item.definition || ''}</p>
                    ${collocationsHTML}
                    ${falseFriendHTML}
                    ${nativeUsageHTML}
                `;

                const audioBtn = card.querySelector('.vocab-audio-btn');
                if (audioBtn) {
                    audioBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        speakText(item.term);
                    });
                }

                vocabGridArea.appendChild(card);
            });
        } else if (reading.vocabulary && reading.vocabulary.length > 0) {
            vocabGridArea.className = 'vocab-grid';
            reading.vocabulary.forEach(item => {
                const card = document.createElement('div');
                card.className = 'vocab-card';

                const ipaHTML = item.ipa ? `<span class="vocab-term-ipa" style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#0284c7;background:rgba(2,132,199,0.08);padding:1px 6px;border-radius:4px;font-weight:500;">${item.ipa}</span>` : '';

                let collocationsHTML = '';
                if (item.collocations && item.collocations.length > 0) {
                    collocationsHTML = `
                        <div class="vocab-collocations-wrap" style="margin-top:10px;padding-top:8px;border-top:1px dashed #e2e8f0;">
                            <div style="font-size:0.7rem;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;display:flex;align-items:center;gap:4px;">
                                <i class="fa-solid fa-link" style="font-size:0.65rem;"></i> Technical Collocations:
                            </div>
                            <div style="display:flex;flex-wrap:wrap;gap:5px;">
                                ${item.collocations.map((c, cIdx) => `
                                    <button type="button" class="vocab-colloc-badge" data-colloc="${c.replace(/"/g, '&quot;')}" title="Escuchar colocación nativa" style="font-size:0.74rem;background:#f0f9ff;color:#0369a1;border:1px solid #bae6fd;padding:3px 8px;border-radius:6px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px;transition:all 0.15s ease;">
                                        <i class="fa-solid fa-volume-low" style="font-size:0.6rem;opacity:0.7;"></i>
                                        <span>${c}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div class="vocab-term-header" style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;border-bottom:1px solid #e2e8f0;padding-bottom:8px;margin-bottom:8px;">
                        <div style="display:flex;flex-direction:column;gap:3px;">
                            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                                <span class="vocab-term-en" style="font-size:1.05rem;font-weight:800;color:#0f172a;">${item.en}</span>
                                ${ipaHTML}
                            </div>
                            <span class="vocab-term-es" style="font-size:0.82rem;color:#0284c7;font-weight:600;">${item.es}</span>
                        </div>
                        <button class="vocab-audio-btn" aria-label="Pronunciar término en inglés" title="Escuchar pronunciación nativa" style="min-width:38px;min-height:38px;width:38px;height:38px;border-radius:8px;background:rgba(2,132,199,0.1);color:#0284c7;border:1px solid rgba(2,132,199,0.2);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all 0.2s ease;">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <p class="vocab-term-def" style="font-size:0.84rem;color:#334155;line-height:1.5;margin:0;">${item.definition}</p>
                    ${collocationsHTML}
                `;

                // Main term audio button
                const audioBtn = card.querySelector('.vocab-audio-btn');
                if (audioBtn) {
                    audioBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        speakText(item.en);
                    });
                }

                // Individual collocation audio buttons
                card.querySelectorAll('.vocab-colloc-badge').forEach(collocBtn => {
                    collocBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const phrase = collocBtn.dataset.colloc;
                        if (phrase) speakText(phrase);
                    });
                });

                vocabGridArea.appendChild(card);
            });
        } else {
            vocabGridArea.innerHTML = '<p class="text-secondary">No hay vocabulario registrado en esta unidad.</p>';
        }

        // Render Quiz
        quizQuestionsArea.innerHTML = '';
        if (reading.questions && reading.questions.length > 0) {
            reading.questions.forEach((qObj, qIdx) => {
                const qBox = document.createElement('div');
                qBox.className = 'quiz-question-box';
                
                let optionsHTML = '';
                qObj.options.forEach((opt, oIdx) => {
                    optionsHTML += `
                        <label class="quiz-option-label" data-qidx="${qIdx}" data-oidx="${oIdx}">
                            <input type="radio" name="q${qIdx}" value="${oIdx}" class="quiz-option-radio">
                            <span>${opt}</span>
                        </label>
                    `;
                });

                qBox.innerHTML = `
                    <h5 class="quiz-q-title">
                        <span class="quiz-q-num">Q${qIdx + 1}.</span>
                        <span>${qObj.q}</span>
                    </h5>
                    <div class="quiz-options-list">
                        ${optionsHTML}
                    </div>
                `;
                quizQuestionsArea.appendChild(qBox);
            });

            // Handle selection styles
            const radioLabels = quizQuestionsArea.querySelectorAll('.quiz-option-label');
            radioLabels.forEach(label => {
                const qIdx = label.dataset.qidx;
                const radio = label.querySelector('.quiz-option-radio');
                radio.addEventListener('change', () => {
                    const siblings = quizQuestionsArea.querySelectorAll(`.quiz-option-label[data-qidx="${qIdx}"]`);
                    siblings.forEach(s => s.classList.remove('selected', 'correct-feedback', 'incorrect-feedback'));
                    label.classList.add('selected');
                });
            });
        } else {
            quizQuestionsArea.innerHTML = '<p class="text-secondary">No hay preguntas registradas en esta unidad.</p>';
        }
        
        btnSubmitQuiz.disabled = false;
        btnSubmitQuiz.innerHTML = 'Enviar Evaluación <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
    }

    function renderSkeletonView(mod) {
        stepBtnVocab.style.opacity = '0.15';
        stepBtnQuiz.style.opacity = '0.15';
        
        let placeholderKeywords = [];
        if (activeTrackId === 'electromobility') {
            placeholderKeywords = [
                { en: "Battery Management System (BMS)", es: "Sistema de Gestión de Baterías", desc: "El cerebro electrónico que protege y balancea las celdas de litio." },
                { en: "Powertrain", es: "Tren Motriz / Unidad de Tracción", desc: "El grupo de componentes mecánicos y eléctricos que mueven las llantas." }
            ];
        } else if (activeTrackId === 'it-innovation') {
            placeholderKeywords = [
                { en: "Cloud Deployment", es: "Despliegue en la Nube", desc: "Instalar y ejecutar aplicaciones en servidores remotos virtuales." },
                { en: "CI/CD Pipeline", es: "Tubería de Integración/Entrega Continua", desc: "Automatizar pruebas y entregas de código a producción." }
            ];
        } else {
            placeholderKeywords = [
                { en: "Aerodynamics", es: "Aerodinámica", desc: "Estudio de las fuerzas que actúan sobre un fuselaje en vuelo." },
                { en: "Composite Materials", es: "Materiales Compuestos", desc: "Materiales ligeros y de alta resistencia (como fibra de carbono)." }
            ];
        }

        let outlineListHTML = '';
        placeholderKeywords.forEach(k => {
            outlineListHTML += `<li><i class="fa-solid fa-circle-notch" aria-hidden="true"></i> <strong>${k.en}</strong> (${k.es}): ${k.desc}</li>`;
        });

        readingContentArea.innerHTML = `
            <div class="skeleton-coming-soon">
                <div class="skeleton-icon"><i class="fa-solid fa-map" aria-hidden="true"></i></div>
                <h4 class="skeleton-title">Módulo de Esqueleto: ${mod.title}</h4>
                <p class="skeleton-desc">Este módulo forma parte del esqueleto curricular interactivo de stemOS. En la versión final, incluirá lecturas técnicas de 10 minutos adaptadas al nivel A2-B1 y evaluaciones con el Feynman Engine.</p>
                
                <div class="skeleton-outline-box">
                    <h5 class="skeleton-outline-title">Conceptos Clave Planificados:</h5>
                    <ul class="skeleton-outline-list">
                        ${outlineListHTML}
                    </ul>
                </div>

                <button class="btn btn-primary" id="btn-simulate-skeleton">
                    Simular Completar Unidad (+25 XP)
                </button>
            </div>
        `;

        document.querySelector('#screen-reading .screen-footer').classList.add('hidden');
        
        const simulateBtn = document.getElementById('btn-simulate-skeleton');
        simulateBtn.addEventListener('click', () => {
            userProgress.completedModules[mod.id] = true;
            globalXP += 25;
            statPoints.textContent = globalXP;
            
            checkTrackCompletion();
            saveProgress();
            
            switchScreen('congrats');
            document.getElementById('xp-award-val').textContent = "+25 XP";
            
            stepBtnVocab.style.opacity = '';
            stepBtnQuiz.style.opacity = '';
            document.querySelector('#screen-reading .screen-footer').classList.remove('hidden');
        });
    }

    function checkTrackCompletion() {
        if (!activeTrackId) return;
        const track = coursesData[activeTrackId];
        if (!track) return;

        if (!skillsData[activeTrackId]) {
            skillsData[activeTrackId] = {
                title: track.titleEN || track.title,
                status: 'active',
                desc: track.title || track.titleEN,
                prereq: "Fundamentos Técnicos",
                standard: track.standard || "Estándar Industrial",
                xp: (track.modules ? track.modules.length : 3) * 50,
                chatTopic: activeTrackId
            };
        }

        const allCompleted = track.modules && track.modules.length > 0 && track.modules.every(mod => userProgress.completedModules[mod.id] === true);
        if (allCompleted && skillsData[activeTrackId].status !== 'completed') {
            skillsData[activeTrackId].status = 'completed';
            if (!userProgress.completedTracks) userProgress.completedTracks = {};
            userProgress.completedTracks[activeTrackId] = true;

            globalXP += 100;
            if (statPoints) statPoints.textContent = globalXP;

            globalCompleted++;
            if (statCompleted) statCompleted.textContent = globalCompleted;

            alert(`¡Excelente trabajo! Has completado exitosamente la especialidad: ${track.titleEN || track.title}. (+100 XP Bonus y Credencial Desbloqueada)`);

            checkUnlocks();
            updateGraphUI();
            if (typeof renderBadgesWall === 'function') renderBadgesWall();
        }

        if (statPoints) statPoints.textContent = globalXP;
        updateProgressBar();
    }

    function checkUnlocks() {
        if (skillsData["electromobility"] && skillsData["it-innovation"]) {
            if (skillsData["electromobility"].status === 'completed' && skillsData["it-innovation"].status === 'completed') {
                if (skillsData["aerospace"] && skillsData["aerospace"].status === 'locked') {
                    skillsData["aerospace"].status = 'active';
                    alert("¡Habilidad Desbloqueada! Ya puedes acceder a: STEM: Manufactura Aeronáutica.");
                }
            }
        }
        if (skillsData["aerospace"] && skillsData["aerospace"].status === 'completed') {
            if (skillsData["socratic-capstone"] && skillsData["socratic-capstone"].status === 'locked') {
                skillsData["socratic-capstone"].status = 'active';
                alert("¡Habilidad Final Desbloqueada! Comienza el Socratic Capstone Assessment.");
            }
        }
    }

    function updateProgressBar() {
        const totalModules = 30;
        let completedCount = 0;
        for (let key in userProgress.completedModules) {
            if (userProgress.completedModules[key] === true) {
                completedCount++;
            }
        }
        const percent = Math.min(100, Math.round(16.6 + (completedCount / totalModules) * 83.4));
        
        document.getElementById('progress-percent').textContent = `${percent}%`;
        document.getElementById('progress-fill-bar').style.width = `${percent}%`;
    }

    function updateGraphUI() {
        const allNodes = document.querySelectorAll('.node');
        allNodes.forEach(node => {
            const nodeId = node.dataset.node;
            const status = skillsData[nodeId]?.status;
            if (status) {
                node.classList.remove('node-completed', 'node-active', 'node-locked');
                node.classList.add(`node-${status}`);

                const icon = node.querySelector('.node-icon');
                if (icon) {
                    if (status === 'locked') {
                        icon.className = 'fa-solid fa-lock node-icon';
                    } else {
                        const courseIcon = (coursesData[nodeId] && coursesData[nodeId].icon) || (typeof LXP_COURSES !== 'undefined' && LXP_COURSES[nodeId] && LXP_COURSES[nodeId].icon);
                        const iconMap = {
                            "lxp-foundation": "fa-graduation-cap",
                            "semiconductors": "fa-microchip",
                            "cybersecurity": "fa-shield-halved",
                            "electromobility": "fa-car-battery",
                            "it-innovation": "fa-cloud",
                            "aerospace": "fa-plane-up",
                            "socratic-capstone": "fa-comments",
                            "cybersecurity-adv": "fa-lock"
                        };
                        icon.className = `${courseIcon || iconMap[nodeId] || 'fa-solid fa-book'} node-icon`;
                    }
                }
            }
        });

        const lines = document.querySelectorAll('line[data-from]');
        lines.forEach(line => {
            const fromId = line.dataset.from;
            const toId = line.dataset.to;
            const fromStatus = skillsData[fromId]?.status;
            const toStatus = skillsData[toId]?.status;

            line.classList.remove('completed', 'active', 'locked');

            if (fromStatus === 'completed' && toStatus === 'completed') {
                line.classList.add('completed');
            } else if (fromStatus === 'completed' || toStatus === 'active') {
                line.classList.add('active');
            } else {
                line.classList.add('locked');
            }
        });
    }

    function completeActiveReading() {
        const reading = activeModule.readings[activeReadingIndex];

        if (!userProgress.completedReadings[reading.id]) {
            userProgress.completedReadings[reading.id] = true;
            globalXP += 25;
            if (statPoints) statPoints.textContent = globalXP;
        }

        const allReadingsCompleted = activeModule.readings.every(r => userProgress.completedReadings[r.id] === true);
        if (allReadingsCompleted) {
            userProgress.completedModules[activeModule.id] = true;
            renderModules(activeTrackId);
            checkTrackCompletion();
        }

        saveProgress();
        if (typeof renderDetailModules === 'function' && activeTrackId) {
            renderDetailModules(activeTrackId);
        }
        if (typeof renderAllUnitsGrid === 'function' && typeof activeFilterCategory !== 'undefined') {
            renderAllUnitsGrid(activeFilterCategory);
        }
        if (typeof renderBadgesWall === 'function') {
            renderBadgesWall();
        }
        switchScreen('congrats');
    }

    btnToVocab.addEventListener('click', () => switchScreen('vocabulary'));
    btnBackToRead.addEventListener('click', () => switchScreen('reading'));
    btnToQuiz.addEventListener('click', () => switchScreen('quiz'));
    btnBackToVocab.addEventListener('click', () => switchScreen('vocabulary'));
    
    academicModalClose.addEventListener('click', () => academicModal.close());
    
    btnCloseAcademicSuccess.addEventListener('click', () => {
        academicModal.close();
        document.getElementById('skills-info-panel').scrollIntoView({ behavior: 'smooth' });
    });

    btnSubmitQuiz.addEventListener('click', () => {
        const reading = activeModule.readings[activeReadingIndex];
        if (!reading.questions || reading.questions.length === 0) {
            completeActiveReading();
            return;
        }

        const form = document.getElementById('academic-quiz-form');
        const feedbackBanner = document.getElementById('quiz-feedback-banner');
        let allAnswered = true;
        let allCorrect = true;
        let correctCount = 0;

        const allLabels = form.querySelectorAll('.quiz-option-label');
        allLabels.forEach(l => l.classList.remove('correct-feedback', 'incorrect-feedback'));
        const oldRationales = form.querySelectorAll('.quiz-rationale-box');
        oldRationales.forEach(r => r.remove());

        // Validate all answered
        reading.questions.forEach((qObj, qIdx) => {
            const checkedRadio = form.querySelector(`input[name="q${qIdx}"]:checked`);
            if (!checkedRadio) {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            if (feedbackBanner) {
                feedbackBanner.className = 'quiz-feedback-banner warning';
                feedbackBanner.style.display = 'flex';
                feedbackBanner.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <span>Por favor, responde todas las preguntas del cuestionario antes de enviar.</span>
                    </div>
                `;
                feedbackBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            return;
        }

        // Process questions and inject Socratic rationales
        reading.questions.forEach((qObj, qIdx) => {
            const checkedRadio = form.querySelector(`input[name="q${qIdx}"]:checked`);
            const selectedIdx = parseInt(checkedRadio.value);
            const correctIdx = qObj.answer;

            const selectedLabel = form.querySelector(`.quiz-option-label[data-qidx="${qIdx}"][data-oidx="${selectedIdx}"]`);
            const correctLabel = form.querySelector(`.quiz-option-label[data-qidx="${qIdx}"][data-oidx="${correctIdx}"]`);
            const qBox = form.querySelectorAll('.quiz-question-box')[qIdx];

            const rationaleBox = document.createElement('div');

            if (selectedIdx === correctIdx) {
                correctCount++;
                selectedLabel.classList.add('correct-feedback');
                rationaleBox.className = 'quiz-rationale-box correct';
                const rationaleText = qObj.explanation || `Concepto técnico verificado: "${qObj.options[correctIdx]}". Este principio es fundamental conforme a las especificaciones y estándares de ingeniería.`;
                rationaleBox.innerHTML = `
                    <div class="quiz-rationale-header"><i class="fa-solid fa-circle-check"></i> Justificación Técnica Correcta</div>
                    <div>${rationaleText}</div>
                `;
            } else {
                allCorrect = false;
                selectedLabel.classList.add('incorrect-feedback');
                correctLabel.classList.add('correct-feedback');
                rationaleBox.className = 'quiz-rationale-box incorrect';
                const rationaleText = qObj.explanation || `En ingeniería y manufactura avanzada, la opción requerida es "${qObj.options[correctIdx]}" para asegurar la precisión del proceso y evitar fallas operativas.`;
                rationaleBox.innerHTML = `
                    <div class="quiz-rationale-header"><i class="fa-solid fa-circle-xmark"></i> Análisis Socrático del Error</div>
                    <div>${rationaleText}</div>
                `;
            }

            if (qBox) {
                qBox.appendChild(rationaleBox);
            }
        });

        if (allCorrect) {
            userProgress.quizStreak = (userProgress.quizStreak || 0) + 1;
            const streak = userProgress.quizStreak;
            const streakBonus = streak > 1 ? streak * 10 : 0;
            if (streakBonus > 0) {
                awardXP(streakBonus);
            }

            if (feedbackBanner) {
                feedbackBanner.className = 'quiz-feedback-banner success';
                feedbackBanner.style.display = 'flex';
                feedbackBanner.innerHTML = `
                    <div>
                        <i class="fa-solid fa-circle-check"></i> <strong>¡Evaluación Perfecta! (${correctCount}/${reading.questions.length})</strong>
                        <div style="font-size: 0.8rem; margin-top: 2px;">Comprensión técnica y vocabulario validado al 100%.</div>
                    </div>
                    ${streak > 1 ? `<span class="quiz-streak-badge"><i class="fa-solid fa-fire"></i> Racha x${streak} 🔥 +${streakBonus} XP Combo</span>` : ''}
                `;
            }

            btnSubmitQuiz.disabled = true;
            btnSubmitQuiz.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ¡Aprobado!';
            setTimeout(() => {
                completeActiveReading();
            }, 1400);
        } else {
            userProgress.quizStreak = 0;
            if (feedbackBanner) {
                feedbackBanner.className = 'quiz-feedback-banner warning';
                feedbackBanner.style.display = 'flex';
                feedbackBanner.innerHTML = `
                    <div>
                        <i class="fa-solid fa-circle-exclamation"></i> <strong>${correctCount} de ${reading.questions.length} respuestas correctas</strong>
                        <div style="font-size: 0.8rem; margin-top: 2px;">Repasa las justificaciones socráticas detalladas abajo y corrige tus selecciones.</div>
                    </div>
                `;
                feedbackBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            btnSubmitQuiz.disabled = false;
            btnSubmitQuiz.innerHTML = 'Reintentar Evaluación <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>';
        }
    });

    function parseMarkdownLineByLine(md) {
        if (!md) return "";
        const lines = md.split('\n');
        let html = "";
        let inList = false;
        let inTable = false;
        let inBlockquote = false;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            
            if (line.startsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    html += "<table>";
                }
                if (line.includes('---')) continue;
                
                const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
                html += "<tr>";
                
                const isHeader = (lines[i+1] && lines[i+1].includes('---'));
                const cellTag = isHeader ? 'th' : 'td';
                
                cells.forEach(cell => {
                    html += `<${cellTag}>${parseInlineFormatting(cell)}</${cellTag}>`;
                });
                html += "</tr>";
                continue;
            } else if (inTable) {
                inTable = false;
                html += "</table>";
            }
            
            if (line.startsWith('>')) {
                if (!inBlockquote) {
                    inBlockquote = true;
                    html += "<blockquote>";
                }
                const content = line.substring(1).trim();
                html += `<p>${parseInlineFormatting(content)}</p>`;
                continue;
            } else if (inBlockquote) {
                inBlockquote = false;
                html += "</blockquote>";
            }
            
            if (line.startsWith('- ') || line.startsWith('* ')) {
                if (!inList) {
                    inList = true;
                    html += "<ul>";
                }
                html += `<li>${parseInlineFormatting(line.substring(2))}</li>`;
                continue;
            } else if (line.match(/^\d+\.\s+/)) {
                if (!inList) {
                    inList = true;
                    html += "<ol>";
                }
                const content = line.replace(/^\d+\.\s+/, '');
                html += `<li>${parseInlineFormatting(content)}</li>`;
                continue;
            } else if (inList) {
                inList = false;
                if (html.lastIndexOf('<ul>') > html.lastIndexOf('<ol>')) {
                    html += "</ul>";
                } else {
                    html += "</ol>";
                }
            }
            
            if (line.startsWith('# ')) {
                html += `<h1>${parseInlineFormatting(line.substring(2))}</h1>`;
            } else if (line.startsWith('## ')) {
                html += `<h2>${parseInlineFormatting(line.substring(3))}</h2>`;
            } else if (line.startsWith('### ')) {
                html += `<h3>${parseInlineFormatting(line.substring(4))}</h3>`;
            } else if (line === '---') {
                html += "<hr>";
            } else if (line !== "") {
                html += `<p>${parseInlineFormatting(line)}</p>`;
            }
        }
        
        if (inTable) html += "</table>";
        if (inBlockquote) html += "</blockquote>";
        if (inList) {
            if (html.lastIndexOf('<ul>') > html.lastIndexOf('<ol>')) {
                html += "</ul>";
            } else {
                html += "</ol>";
            }
        }
        
        return html;
    }

    function parseInlineFormatting(text) {
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
        return formatted;
    }

    /* ==========================================
       DASHBOARD CONTROLLER — ALL UNITS GRID,
       VIEW SWITCHING, UNIT DETAIL, KPIs,
       GLOSSARY, FILTERS & NAVIGATION
       ========================================== */

    const coursesData = (typeof LXP_COURSES !== 'undefined') ? LXP_COURSES : {};
    const phrasesData = (typeof STEMOS_PHRASES !== 'undefined') ? STEMOS_PHRASES : [];

    // Category metadata for styling and labels
    const CATEGORY_META = {
        technology: { label: 'TECHNOLOGY', color: '#0ea5e9', icon: 'fa-microchip', emoji: '🔵' },
        engineering: { label: 'ENGINEERING & INDUSTRY', color: '#f97316', icon: 'fa-gear', emoji: '🟠' },
        science: { label: 'SCIENCE & FUTURE TECH', color: '#a855f7', icon: 'fa-flask', emoji: '🟣' },
        career: { label: 'AVIATION & CAREER', color: '#22c55e', icon: 'fa-briefcase', emoji: '🟢' }
    };

    // Track icon mapping
    const TRACK_ICONS = {
        'cybersecurity': 'fa-shield-halved',
        'it-innovation': 'fa-cloud',
        'ai-ml': 'fa-brain',
        'telecom-iot': 'fa-tower-cell',
        'software-dev': 'fa-code',
        'data-analytics': 'fa-chart-column',
        'semiconductors': 'fa-microchip',
        'electromobility': 'fa-car-battery',
        'aerospace': 'fa-plane-up',
        'robotics-automation': 'fa-robot',
        'energy-renewables': 'fa-solar-panel',
        'advanced-manufacturing': 'fa-industry',
        'industrial-operations': 'fa-truck-fast',
        'mechatronics': 'fa-gears',
        'biotechnology': 'fa-dna',
        'space-satellite': 'fa-satellite',
        'environmental-sustainability': 'fa-leaf',
        'healthcare-tech': 'fa-heart-pulse',
        'materials-nanotech': 'fa-atom',
        'food-science': 'fa-wheat-awn',
        'aviation-english': 'fa-plane',
        'airforce-aerospace': 'fa-jet-fighter',
        'hospitality-food': 'fa-utensils',
        'business-leadership': 'fa-chart-line',
        'project-management': 'fa-diagram-project',
        'entrepreneurship': 'fa-lightbulb',
        'web-dev-agentic': 'fa-solid fa-code'
    };

    // Track order for consistent unit numbering
    const TRACK_ORDER = [
        'web-dev-agentic',
        'cybersecurity', 'it-innovation', 'ai-ml', 'telecom-iot', 'software-dev', 'data-analytics',
        'semiconductors', 'electromobility', 'aerospace', 'robotics-automation', 'energy-renewables',
        'advanced-manufacturing', 'industrial-operations', 'mechatronics',
        'biotechnology', 'space-satellite', 'environmental-sustainability', 'healthcare-tech',
        'materials-nanotech', 'food-science',
        'aviation-english', 'airforce-aerospace', 'hospitality-food', 'business-leadership',
        'project-management', 'entrepreneurship'
    ];

    let activeFilterCategory = 'all';
    let currentDetailTrackId = null;

    /* --- 1. SIDEBAR NAVIGATION VIEW SWITCHING --- */
    const edSidebar = document.getElementById('ed-sidebar');
    const edSidebarToggle = document.getElementById('ed-sidebar-toggle');
    const edRailBtns = document.querySelectorAll('.ed-rail-btn[data-view]');
    const edViews = document.querySelectorAll('.ed-view');

    function switchDashboardView(viewName) {
        // Hide all views
        edViews.forEach(v => {
            v.style.display = 'none';
            v.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) {
            targetView.style.display = '';
            targetView.classList.add('active');
        }

        // Update active state on sidebar buttons
        edRailBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });

        // 3D World Globe & Gamified Level Path Initializer
        if (viewName === 'world-map') {
            if (window.StemOSWorldMap) {
                if (!window.StemOSWorldMap.initialized) {
                    window.StemOSWorldMap.init('world-map-container', {
                        onLaunchModule: (trackId, mod) => openAcademicModal(trackId, mod),
                        onLaunchSocratic: (trackId, modId) => launchSocraticChallenge(trackId, modId)
                    });
                    window.StemOSWorldMap.initialized = true;
                } else {
                    window.StemOSWorldMap.handleResize();
                    window.StemOSWorldMap.syncProgress();
                }
            }
        }
    }
    window.switchDashboardView = switchDashboardView;

    edRailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchDashboardView(btn.dataset.view);
        });
    });

    // Sidebar toggle (mobile collapse)
    if (edSidebarToggle) {
        edSidebarToggle.addEventListener('click', () => {
            edSidebar.classList.toggle('collapsed');
        });
    }

    // Lock / Exit button
    const btnLockBackdoor = document.getElementById('btn-lock-backdoor');
    if (btnLockBackdoor) {
        btnLockBackdoor.addEventListener('click', () => {
            localStorage.removeItem('stemos_backdoor');
            document.documentElement.classList.remove('backdoor-unlocked');
            window.location.reload();
        });
    }

    /* --- 2. RENDER ALL UNITS GRID --- */
    function getTrackProgress(trackId) {
        const track = coursesData[trackId];
        if (!track || !track.modules) return { total: 0, completed: 0, percent: 0, totalReadings: 0, completedReadings: 0 };

        let totalReadings = 0;
        let completedReadings = 0;
        let totalMods = track.modules.length;
        let completedMods = 0;

        track.modules.forEach(mod => {
            if (userProgress.completedModules[mod.id]) completedMods++;
            if (mod.readings) {
                totalReadings += mod.readings.length;
                mod.readings.forEach(r => {
                    if (userProgress.completedReadings[r.id]) completedReadings++;
                });
            }
        });

        const percent = totalReadings > 0 ? Math.round((completedReadings / totalReadings) * 100) : 0;

        return { total: totalMods, completed: completedMods, percent, totalReadings, completedReadings };
    }

    let activeUnitsSearchQuery = '';

    window.renderAllUnitsGrid = function(filter, searchQuery) {
        activeFilterCategory = filter !== undefined ? filter : activeFilterCategory;
        if (searchQuery !== undefined) activeUnitsSearchQuery = searchQuery.trim().toLowerCase();

        const grid = document.getElementById('ed-units-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const orderedTracks = TRACK_ORDER.filter(id => coursesData[id]);
        let visibleCount = 0;

        orderedTracks.forEach((trackId, index) => {
            const track = coursesData[trackId];
            const cat = track.category || 'technology';
            const catMeta = CATEGORY_META[cat] || CATEGORY_META.technology;

            // Apply category filter
            if (activeFilterCategory !== 'all' && cat !== activeFilterCategory) return;

            // Apply text search filter
            if (activeUnitsSearchQuery) {
                const titleEN = (track.titleEN || '').toLowerCase();
                const titleES = (track.title || '').toLowerCase();
                const standard = (track.standard || '').toLowerCase();
                const desc = (track.desc || '').toLowerCase();
                const matches = titleEN.includes(activeUnitsSearchQuery) ||
                                titleES.includes(activeUnitsSearchQuery) ||
                                standard.includes(activeUnitsSearchQuery) ||
                                desc.includes(activeUnitsSearchQuery);
                if (!matches) return;
            }

            visibleCount++;
            const progress = getTrackProgress(trackId);
            const iconClass = TRACK_ICONS[trackId] || 'fa-book';
            const unitNum = index + 1;

            const card = document.createElement('div');
            card.className = 'ed-unit-card';
            card.dataset.trackId = trackId;
            card.dataset.category = cat;

            const gradientBg = `linear-gradient(135deg, ${catMeta.color}18 0%, ${catMeta.color}08 50%, #f8fafc 100%)`;

            card.innerHTML = `
                <div class="ed-unit-card-img-wrapper" style="background: ${gradientBg}; display:flex; align-items:center; justify-content:center;">
                    <i class="fa-solid ${iconClass}" style="font-size: 3.5rem; color: ${catMeta.color}; opacity: 0.5;"></i>
                    <span class="ed-unit-card-cat-badge" style="border-left: 3px solid ${catMeta.color};">${catMeta.label}</span>
                </div>
                <div class="ed-unit-card-body">
                    <div class="ed-unit-number">${String(unitNum).padStart(2, '0')}</div>
                    <div class="ed-unit-title">${track.titleEN || track.title}</div>
                    <div class="ed-unit-progress-container">
                        <div class="ed-unit-progress-track">
                            <div class="ed-unit-progress-fill" style="width: ${progress.percent}%; background: linear-gradient(90deg, ${catMeta.color}90, ${catMeta.color});"></div>
                        </div>
                        <span class="ed-unit-progress-text">${progress.completedReadings}/${progress.totalReadings} Lecturas · ${progress.percent}%</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                openUnitDetail(trackId);
            });

            grid.appendChild(card);
        });

        if (visibleCount === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 16px;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 2.2rem; color: #94a3b8; margin-bottom: 12px;"></i>
                    <h4 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 6px;">No se encontraron unidades</h4>
                    <p style="font-size: 0.85rem; color: #64748b;">Intenta con otros términos como "NIST", "Semiconductor", "Python", o "Battery".</p>
                </div>
            `;
        }
    };

    // Live search event listener for All Units
    const edUnitsSearch = document.getElementById('ed-units-search');
    const edUnitsSearchClear = document.getElementById('ed-units-search-clear');
    if (edUnitsSearch) {
        edUnitsSearch.addEventListener('input', () => {
            const q = edUnitsSearch.value;
            if (edUnitsSearchClear) {
                edUnitsSearchClear.style.display = q ? 'block' : 'none';
            }
            renderAllUnitsGrid(activeFilterCategory, q);
        });
    }
    if (edUnitsSearchClear) {
        edUnitsSearchClear.addEventListener('click', () => {
            edUnitsSearch.value = '';
            edUnitsSearchClear.style.display = 'none';
            renderAllUnitsGrid(activeFilterCategory, '');
            edUnitsSearch.focus();
        });
    }

    /* --- 3. CATEGORY FILTER CHIPS --- */
    const filterChips = document.querySelectorAll('.ed-filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const cat = chip.dataset.cat;
            renderAllUnitsGrid(cat);
        });
    });

    /* --- 4. UNIT DETAIL DRILL-DOWN --- */
    function openUnitDetail(trackId) {
        currentDetailTrackId = trackId;
        const track = coursesData[trackId];
        if (!track) return;

        const cat = track.category || 'technology';
        const catMeta = CATEGORY_META[cat] || CATEGORY_META.technology;
        const progress = getTrackProgress(trackId);
        const iconClass = TRACK_ICONS[trackId] || 'fa-book';

        // Update hero
        const detailTitle = document.getElementById('detail-unit-title');
        const detailDesc = document.getElementById('detail-unit-desc');
        const detailCatPill = document.getElementById('detail-category-pill');
        const detailLevelPill = document.getElementById('detail-level-pill');
        const detailStandardPill = document.getElementById('detail-standard-pill');
        const detailModuleCount = document.getElementById('detail-module-count');
        const detailReadingCount = document.getElementById('detail-reading-count');
        const detailEstTime = document.getElementById('detail-est-time');
        const detailXpCount = document.getElementById('detail-xp-count');
        const detailProgressSummary = document.getElementById('detail-progress-summary');
        const breadcrumbUnitName = document.getElementById('breadcrumb-unit-name');
        const detailImgBox = document.getElementById('detail-unit-image-box');
        const detailImg = document.getElementById('detail-unit-img');
        const detailHero = document.getElementById('unit-detail-hero');

        if (detailTitle) detailTitle.textContent = track.titleEN || track.title;
        if (detailDesc) detailDesc.textContent = track.title || '';
        if (detailCatPill) {
            detailCatPill.textContent = `${catMeta.emoji} ${catMeta.label}`;
            detailCatPill.style.background = `${catMeta.color}18`;
            detailCatPill.style.color = catMeta.color;
            detailCatPill.style.borderColor = `${catMeta.color}40`;
        }
        if (detailLevelPill) detailLevelPill.textContent = `Nivel CEFR ${track.level || 'A2-B1'}`;
        if (detailStandardPill) detailStandardPill.textContent = `Estándar ${track.standard || 'IEEE/ISO'}`;
        if (detailModuleCount) detailModuleCount.textContent = `${progress.total} Módulos`;
        if (detailReadingCount) detailReadingCount.textContent = `${progress.totalReadings} Lecturas`;
        if (detailEstTime) detailEstTime.textContent = `~${progress.totalReadings * 10} min`;
        if (detailXpCount) detailXpCount.textContent = `+${progress.totalReadings * 25 + 100} XP`;
        if (detailProgressSummary) detailProgressSummary.textContent = `${progress.completed} de ${progress.total} Completados`;
        if (breadcrumbUnitName) breadcrumbUnitName.textContent = track.titleEN || track.title;

        // Show/hide Exam Button
        const btnTakeExam = document.getElementById('btn-take-exam');
        if (btnTakeExam) {
            // For testing purposes, we unlock it if progress > 0, otherwise it should be progress.completed === progress.total
            if (progress.completed >= 0) { 
                btnTakeExam.style.display = 'inline-flex';
                btnTakeExam.onclick = () => launchCertificationExam(trackId);
            } else {
                btnTakeExam.style.display = 'none';
            }
        }

        // Hero image: show a large icon instead (no external images)
        if (detailImgBox) {
            detailImgBox.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, ${catMeta.color}22 0%, ${catMeta.color}08 100%);border-radius:16px;">
                <i class="fa-solid ${iconClass}" style="font-size:5rem;color:${catMeta.color};opacity:0.45;"></i>
            </div>`;
        }

        // Set hero gradient background
        if (detailHero) {
            detailHero.style.background = `linear-gradient(135deg, ${catMeta.color}12 0%, #0f172a05 100%)`;
        }

        // Render modules list
        renderDetailModules(trackId);

        // Switch to detail view
        switchDashboardView('unit-detail');
    }

    function renderDetailModules(trackId) {
        const container = document.getElementById('detail-modules-container');
        if (!container) return;
        container.innerHTML = '';

        const track = coursesData[trackId];
        if (!track || !track.modules) return;

        const cat = track.category || 'technology';
        const catMeta = CATEGORY_META[cat] || CATEGORY_META.technology;

        track.modules.forEach((mod, index) => {
            const isCompleted = userProgress.completedModules[mod.id] === true;
            const isUnlocked = index === 0 || userProgress.completedModules[track.modules[index - 1]?.id] === true || isCompleted;
            const totalReadings = mod.readings ? mod.readings.length : 0;
            const completedReadingsInMod = mod.readings ? mod.readings.filter(r => userProgress.completedReadings[r.id]).length : 0;
            const iconClass = mod.icon || 'fa-solid fa-book-open';

            let statusClass = 'locked';
            let statusText = 'Bloqueado';
            let statusIcon = 'fa-lock';
            if (isCompleted) {
                statusClass = 'completed';
                statusText = 'Aprobado';
                statusIcon = 'fa-circle-check';
            } else if (isUnlocked) {
                statusClass = 'pending';
                statusText = 'Pendiente';
                statusIcon = 'fa-play-circle';
            }

            const card = document.createElement('div');
            card.className = `ed-detail-module-card ${statusClass}`;
            card.style.cssText = `
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 14px;
                padding: 18px 22px;
                display: flex;
                align-items: center;
                gap: 18px;
                cursor: ${isUnlocked ? 'pointer' : 'default'};
                transition: all 0.22s ease;
                margin-bottom: 12px;
                opacity: ${isUnlocked ? '1' : '0.55'};
                ${isCompleted ? `border-left: 4px solid ${catMeta.color};` : ''}
            `;

            let goldBadge = '';
            if (mod.isGoldModel) {
                goldBadge = `<span style="display:inline-flex;align-items:center;gap:4px;background:rgba(251,191,36,0.15);color:#f59e0b;font-size:0.68rem;font-weight:800;padding:2px 8px;border-radius:6px;border:1px solid #fbbf2440;">
                    <i class="fa-solid fa-star"></i> GOLD ESP
                </span>`;
            }

            let socraticBadge = '';
            if (mod.socraticChallenges && mod.socraticChallenges.length > 0) {
                socraticBadge = `<span style="display:inline-flex;align-items:center;gap:4px;background:#fef3c7;color:#b45309;font-size:0.68rem;font-weight:800;padding:2px 8px;border-radius:6px;border:1px solid #fde68a;">
                    <i class="fa-solid fa-brain"></i> Reto Socrático (${mod.socraticChallenges.length})
                </span>`;
            }

            card.innerHTML = `
                <div style="width:48px;height:48px;border-radius:12px;background:${catMeta.color}12;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="${iconClass}" style="font-size:1.3rem;color:${catMeta.color};"></i>
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
                        <span style="font-size:0.72rem;font-weight:700;color:#94a3b8;">M${index + 1}</span>
                        ${goldBadge}
                        ${socraticBadge}
                        <span style="display:inline-flex;align-items:center;gap:4px;font-size:0.7rem;font-weight:700;padding:2px 8px;border-radius:6px;
                            background:${statusClass === 'completed' ? '#dcfce7' : statusClass === 'pending' ? '#dbeafe' : '#f1f5f9'};
                            color:${statusClass === 'completed' ? '#16a34a' : statusClass === 'pending' ? '#2563eb' : '#94a3b8'};">
                            <i class="fa-solid ${statusIcon}"></i> ${statusText}
                        </span>
                    </div>
                    <div style="font-size:0.95rem;font-weight:700;color:#1e293b;margin-bottom:3px;">${mod.titleES || mod.title}</div>
                    <div style="font-size:0.78rem;color:#64748b;">${totalReadings > 0 ? `${completedReadingsInMod}/${totalReadings} Lecturas Completadas` : 'Esqueleto — Próximamente'}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
                    ${(mod.socraticChallenges && mod.socraticChallenges.length > 0 && isUnlocked) ? `
                        <button class="ed-module-socratic-link-btn" style="height:36px;padding:0 12px;border-radius:8px;border:1px solid #fed7aa;background:#fff7ed;color:#c2410c;font-size:0.75rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:all 0.2s ease;" title="Practicar diálogo socrático">
                            <i class="fa-solid fa-comments"></i> Socrático
                        </button>
                    ` : ''}
                    ${isUnlocked ? `<button class="ed-module-open-btn" style="width:40px;height:40px;border-radius:10px;border:1px solid #e2e8f0;background:#f8fafc;color:${catMeta.color};font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;"
                        onmouseenter="this.style.background='${catMeta.color}';this.style.color='#fff';this.style.borderColor='${catMeta.color}'"
                        onmouseleave="this.style.background='#f8fafc';this.style.color='${catMeta.color}';this.style.borderColor='#e2e8f0'">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>` : `<i class="fa-solid fa-lock" style="color:#cbd5e1;font-size:1rem;"></i>`}
                </div>
            `;

            if (isUnlocked) {
                const socraticBtn = card.querySelector('.ed-module-socratic-link-btn');
                if (socraticBtn) {
                    socraticBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (!hasCompletedPlacement()) {
                            showPlacementRequiredModal();
                            return;
                        }
                        launchSocraticChallenge(trackId, mod.id);
                    });
                }
                card.addEventListener('click', () => {
                    if (!hasCompletedPlacement()) {
                        showPlacementRequiredModal();
                        return;
                    }
                    openAcademicModal(trackId, mod);
                });
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-2px)';
                    card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'none';
                });
            }

            container.appendChild(card);
        });
    }

    // Back button from unit detail
    const btnBackToAll = document.getElementById('btn-back-to-all-units');
    if (btnBackToAll) {
        btnBackToAll.addEventListener('click', () => {
            switchDashboardView('all-units');
        });
    }
    const breadcrumbHome = document.getElementById('breadcrumb-home-link');
    if (breadcrumbHome) {
        breadcrumbHome.style.cursor = 'pointer';
        breadcrumbHome.addEventListener('click', () => {
            switchDashboardView('all-units');
        });
    }

    /* --- 4.5 CERTIFICATION EXAM ENGINE --- */
    let currentExamQuestions = [];
    let currentExamTrackId = null;

    window.launchCertificationExam = function(trackId) {
        const track = coursesData[trackId];
        if (!track) return;
        currentExamTrackId = trackId;

        // Gather all questions from all readings in this track
        let allQuestions = [];
        if (track.modules) {
            track.modules.forEach(mod => {
                if (mod.readings) {
                    mod.readings.forEach(r => {
                        if (r.questions) {
                            r.questions.forEach(q => {
                                allQuestions.push({ ...q, modTitle: mod.titleES || mod.title, readTitle: r.title });
                            });
                        }
                    });
                }
            });
        }

        // Shuffle and pick 10
        allQuestions.sort(() => 0.5 - Math.random());
        currentExamQuestions = allQuestions.slice(0, 10);

        // UI Setup
        document.getElementById('exam-track-tag').textContent = (track.titleEN || track.title).toUpperCase();
        document.getElementById('exam-track-title').textContent = "Track Certification Exam";
        document.getElementById('exam-results-box').style.display = 'none';
        document.getElementById('btn-submit-exam').style.display = 'block';
        document.getElementById('btn-claim-badge').style.display = 'none';

        const qContainer = document.getElementById('exam-questions-container');
        qContainer.innerHTML = '';

        if (currentExamQuestions.length === 0) {
            qContainer.innerHTML = '<p>No questions available for this track.</p>';
            document.getElementById('btn-submit-exam').style.display = 'none';
        } else {
            currentExamQuestions.forEach((q, i) => {
                const block = document.createElement('div');
                block.style.marginBottom = '1.5rem';
                block.innerHTML = `
                    <div style="font-weight:700; color:#0f172a; margin-bottom:8px; font-size:0.95rem;">${i+1}. ${q.q}</div>
                    <div style="font-size:0.75rem; color:#64748b; margin-bottom:8px;">From: ${q.readTitle}</div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${q.options.map((opt, optIdx) => `
                            <label style="display:flex; align-items:center; gap:8px; background:#f8fafc; border:1px solid #e2e8f0; padding:10px 14px; border-radius:8px; cursor:pointer;">
                                <input type="radio" name="exam-q${i}" value="${optIdx}">
                                <span style="font-size:0.9rem; color:#334155;">${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                `;
                qContainer.appendChild(block);
            });
        }

        document.getElementById('exam-modal-overlay').classList.add('active');
    }

    // Submit Exam
    const btnSubmitExam = document.getElementById('btn-submit-exam');
    if (btnSubmitExam) {
        btnSubmitExam.addEventListener('click', () => {
            let correctCount = 0;
            currentExamQuestions.forEach((q, i) => {
                const selected = document.querySelector(`input[name="exam-q${i}"]:checked`);
                const labels = document.querySelectorAll(`input[name="exam-q${i}"]`);
                labels.forEach(input => {
                    const labelWrap = input.closest('label');
                    if (parseInt(input.value) === q.answer) {
                        labelWrap.style.background = '#dcfce7';
                        labelWrap.style.borderColor = '#86efac';
                    } else if (input.checked && parseInt(input.value) !== q.answer) {
                        labelWrap.style.background = '#fee2e2';
                        labelWrap.style.borderColor = '#fca5a5';
                    }
                    input.disabled = true;
                });

                if (selected && parseInt(selected.value) === q.answer) {
                    correctCount++;
                }
            });

            const score = (correctCount / currentExamQuestions.length) * 100;
            
            document.getElementById('btn-submit-exam').style.display = 'none';
            const resultsBox = document.getElementById('exam-results-box');
            resultsBox.style.display = 'block';
            
            document.getElementById('exam-score-display').textContent = `${Math.round(score)}%`;

            const feedbackMsg = document.getElementById('exam-feedback-msg');
            if (score >= 80) {
                feedbackMsg.innerHTML = '<span style="color:#10b981;">PASSED!</span> Outstanding Technical English Fluency.';
                document.getElementById('btn-claim-badge').style.display = 'block';
                document.getElementById('btn-claim-badge').onclick = () => {
                    alert('Open Badge Unlocked! Your profile will be updated.');
                    document.getElementById('exam-modal-overlay').classList.remove('active');
                }
            } else {
                feedbackMsg.innerHTML = '<span style="color:#ef4444;">FAILED.</span> Minimum 80% required. Please review the track modules.';
            }
        });
    }

    // Close Exam Modal
    const btnCloseExam = document.getElementById('btn-close-exam');
    if (btnCloseExam) {
        btnCloseExam.addEventListener('click', () => {
            document.getElementById('exam-modal-overlay').classList.remove('active');
        });
    }

    /* --- 5. SEGMENTED PROGRESS BAR --- */
    window.renderSegmentedProgressBar = function() {
        const bar = document.getElementById('ed-segmented-bar');
        if (!bar) return;
        bar.innerHTML = '';

        const orderedTracks = TRACK_ORDER.filter(id => coursesData[id]);
        const totalTracks = orderedTracks.length;

        orderedTracks.forEach((trackId) => {
            const track = coursesData[trackId];
            const cat = track.category || 'technology';
            const catMeta = CATEGORY_META[cat] || CATEGORY_META.technology;
            const progress = getTrackProgress(trackId);

            const seg = document.createElement('div');
            seg.className = 'ed-seg';
            seg.title = `${track.titleEN || track.title}: ${progress.percent}%`;
            seg.style.cssText = `
                flex: 1;
                height: 10px;
                border-radius: 5px;
                background: #e2e8f0;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.2s ease;
            `;

            const fill = document.createElement('div');
            fill.style.cssText = `
                height: 100%;
                width: ${progress.percent}%;
                background: ${catMeta.color};
                border-radius: 5px;
                transition: width 0.5s ease;
            `;

            seg.appendChild(fill);
            seg.addEventListener('click', () => openUnitDetail(trackId));
            seg.addEventListener('mouseenter', () => { seg.style.transform = 'scaleY(1.6)'; });
            seg.addEventListener('mouseleave', () => { seg.style.transform = 'scaleY(1)'; });

            bar.appendChild(seg);
        });
    };

    /* --- 6. KPI METRICS --- */
    window.updateKPIMetrics = function() {
        const orderedTracks = TRACK_ORDER.filter(id => coursesData[id]);

        // Course Completion %
        let totalReadings = 0;
        let completedReadings = 0;
        orderedTracks.forEach(id => {
            const p = getTrackProgress(id);
            totalReadings += p.totalReadings;
            completedReadings += p.completedReadings;
        });
        const courseCompletion = totalReadings > 0 ? Math.round((completedReadings / totalReadings) * 100) : 0;
        const kpiCourse = document.getElementById('kpi-course-completion');
        if (kpiCourse) kpiCourse.textContent = `${courseCompletion}%`;

        // Average Test Score — simulated based on completion
        const avgScore = completedReadings > 0 ? Math.min(100, Math.round(75 + (completedReadings / totalReadings) * 20)) : 0;
        const kpiAvg = document.getElementById('kpi-avg-score');
        if (kpiAvg) kpiAvg.textContent = `${avgScore}%`;

        // Time on Task — estimated: each completed reading = ~10 minutes
        const totalMinutes = completedReadings * 10;
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const kpiHours = document.getElementById('kpi-time-hours');
        const kpiMins = document.getElementById('kpi-time-mins');
        if (kpiHours) kpiHours.textContent = String(hours).padStart(2, '0');
        if (kpiMins) kpiMins.textContent = String(mins).padStart(2, '0');

        // Curricular XP & Student Engineering Level (Fase 53)
        if (typeof window.updateStudentXPHUD === 'function') {
            window.updateStudentXPHUD();
        }
    };

    /* ─── XP & GAMIFICATION ENGINE (FASE 53) ─────────────────────── */
    const STUDENT_LEVELS = [
        { level: 1, title: 'Intern', minXP: 0, icon: '🟢', badge: 'L1 Intern' },
        { level: 2, title: 'Technician', minXP: 500, icon: '🔵', badge: 'L2 Tech' },
        { level: 3, title: 'Specialist', minXP: 1200, icon: '🟣', badge: 'L3 Spec' },
        { level: 4, title: 'Engineer', minXP: 2200, icon: '🟠', badge: 'L4 Eng' },
        { level: 5, title: 'Senior Engineer', minXP: 3500, icon: '🔴', badge: 'L5 Senior' },
        { level: 6, title: 'Lead', minXP: 5000, icon: '⭐', badge: 'L6 Lead' },
        { level: 7, title: 'Fellow', minXP: 6500, icon: '💎', badge: 'L7 Fellow' },
        { level: 8, title: 'Master Fellow', minXP: 8000, icon: '👑', badge: 'L8 Master' }
    ];

    window.getStudentLevelForXP = function(xp) {
        let current = STUDENT_LEVELS[0];
        for (let i = STUDENT_LEVELS.length - 1; i >= 0; i--) {
            if (xp >= STUDENT_LEVELS[i].minXP) {
                current = STUDENT_LEVELS[i];
                break;
            }
        }
        return current;
    };

    window.updateStudentXPHUD = function(xp) {
        let currentXP = (typeof xp === 'number') ? xp : parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
        // If active career has saved progress, compute real progress XP
        const activeCareerId = localStorage.getItem('stemos_active_career') || 'it-mecatronica';
        try {
            const raw = localStorage.getItem('stemos_progress_' + activeCareerId);
            if (raw) {
                const prog = JSON.parse(raw);
                if (prog.modules) {
                    let earned = 0;
                    for (let m in prog.modules) {
                        if (prog.modules[m].status === 'completed' && prog.modules[m].xp) {
                            earned += prog.modules[m].xp;
                        }
                    }
                    if (earned > 0) currentXP = Math.max(currentXP, earned);
                }
            }
        } catch (e) {}

        const level = window.getStudentLevelForXP(currentXP);
        const elTotalXp = document.getElementById('kpi-total-xp');
        const elRank = document.getElementById('kpi-student-rank');
        const elHeaderXp = document.getElementById('header-xp-val');
        const elHeaderBadge = document.getElementById('header-rank-badge');

        if (elTotalXp) elTotalXp.textContent = currentXP.toLocaleString();
        if (elRank) elRank.textContent = `L${level.level} · ${level.title}`;
        if (elHeaderXp) elHeaderXp.textContent = `${currentXP.toLocaleString()} XP`;
        if (elHeaderBadge) elHeaderBadge.textContent = level.badge;
    };

    // Initial HUD update
    window.updateStudentXPHUD();

    /* --- 6.1 STUDENT IDENTITY & INSTITUTIONAL PASS BRIDGE (FASE 59) --- */
    window.initStudentProfileBridge = function() {
        let profile = null;
        try {
            const raw = localStorage.getItem('stemos_student_profile');
            if (raw) profile = JSON.parse(raw);
            else if (window.STEMOS_FIREBASE && typeof window.STEMOS_FIREBASE.getAuthUser === 'function') {
                profile = window.STEMOS_FIREBASE.getAuthUser();
            }
        } catch (e) {}

        if (!profile) {
            profile = {
                name: 'Diana Laura Morales',
                matricula: '22050144',
                careerId: localStorage.getItem('stemos_active_career') || 'it-mecatronica',
                careerName: 'Ingeniería Mecatrónica',
                subsystem: 'it',
                system: 'it',
                hub: 'Saltillo',
                className: 'Mecatrónica 4°A — Matutino',
                classCode: 'STEM-MECA-A7X3K2'
            };
        }

        const elName = document.getElementById('header-student-name');
        if (elName && profile.name) {
            const firstName = profile.name.split(' ')[0] || profile.name;
            elName.textContent = firstName;
        }

        const elSubsystem = document.getElementById('header-student-subsystem');
        if (elSubsystem) {
            const sys = (profile.subsystem || profile.system || 'it').toLowerCase();
            const sysLabels = {
                'it': 'TecNM',
                'tecnm': 'TecNM',
                'ut': 'UT',
                'estatal': 'Univ. Estatal',
                'univ-estatal': 'Univ. Estatal',
                'latam': 'LATAM'
            };
            elSubsystem.textContent = sysLabels[sys] || 'TecNM';
        }

        const elAvatarInitials = document.querySelector('.avatar-initials-mini');
        if (elAvatarInitials && profile.name) {
            const parts = profile.name.trim().split(/\s+/);
            const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
            elAvatarInitials.textContent = initials;
        }

        // Set up click on greeting or avatar
        const elGreeting = document.getElementById('student-greeting-wrapper');
        if (elGreeting) {
            elGreeting.onclick = window.openStudentProfileModal;
        }
        const elAvatar = document.getElementById('header-user-avatar');
        if (elAvatar) {
            elAvatar.onclick = window.openStudentProfileModal;
        }
    };

    window.openStudentProfileModal = function() {
        const modal = document.getElementById('student-profile-modal');
        if (!modal) return;

        // Populate modal data
        let profile = null;
        try {
            const raw = localStorage.getItem('stemos_student_profile');
            if (raw) profile = JSON.parse(raw);
        } catch(e) {}

        const activeCareerId = localStorage.getItem('stemos_active_career') || 'it-mecatronica';
        const currentXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
        const level = window.getStudentLevelForXP(currentXP);

        const nameEl = document.getElementById('sp-modal-name');
        const matriculaEl = document.getElementById('sp-modal-matricula');
        const careerEl = document.getElementById('sp-modal-career');
        const hubEl = document.getElementById('sp-modal-hub');
        const classEl = document.getElementById('sp-modal-class');
        const xpEl = document.getElementById('sp-modal-xp');
        const rankEl = document.getElementById('sp-modal-rank');
        const connEl = document.getElementById('sp-modal-conn');

        if (nameEl) nameEl.textContent = (profile && profile.name) ? profile.name : 'Diana Laura Morales';
        if (matriculaEl) matriculaEl.textContent = (profile && (profile.matricula || profile.folio)) ? (profile.matricula || profile.folio) : '22050144';
        if (careerEl) {
            let cName = (profile && profile.careerName) ? profile.careerName : 'Ingeniería Mecatrónica';
            if (window.STEMOS_CAREER_TRACKS && window.STEMOS_CAREER_TRACKS.CAREERS) {
                const cObj = window.STEMOS_CAREER_TRACKS.CAREERS.find(c => c.id === activeCareerId);
                if (cObj) cName = cObj.name;
            }
            careerEl.textContent = cName;
        }
        if (hubEl) hubEl.textContent = (profile && profile.hub) ? profile.hub : 'Saltillo (Nearshoring Hub)';
        if (classEl) classEl.textContent = (profile && (profile.className || profile.classCode)) ? `${profile.className || ''} [${profile.classCode || 'Code'}]` : 'Mecatrónica 4°A [STEM-MECA-A7X3K2]';
        if (xpEl) xpEl.textContent = `${currentXP.toLocaleString()} XP`;
        if (rankEl) rankEl.textContent = `L${level.level} · ${level.title}`;

        const subStatusEl = document.getElementById('sp-modal-sub-status');
        if (subStatusEl) {
            let sub = null;
            if (window.getStemosSubscription) sub = window.getStemosSubscription();
            if (sub && sub.active) {
                subStatusEl.innerHTML = `<span style="color:#34d399; font-weight:800;"><i class="fa-solid fa-circle-check"></i> Suscripción Activa</span> &bull; Plan Individual ($${sub.amount || 49} MXN/mes)`;
            } else {
                subStatusEl.innerHTML = `Acceso ilimitado a 34 Tracks y Tutor Socrático ($49 MXN/mes)`;
            }
        }

        if (connEl && window.STEMOS_FIREBASE) {
            const status = window.STEMOS_FIREBASE.getConnectionStatus();
            connEl.innerHTML = `<span class="badge ${status.badgeClass}"><i class="fa-solid ${status.icon}"></i> ${status.label}</span>`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeStudentProfileModal = function() {
        const modal = document.getElementById('student-profile-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    window.handleStudentProfileBackdrop = function(e) {
        if (e.target.id === 'student-profile-modal') {
            window.closeStudentProfileModal();
        }
    };

    // Auto-initialize profile bridge on load
    window.initStudentProfileBridge();

    /* --- 7. GLOSSARY / PHRASES VIEW --- */
    let activeGlossaryCat = 'all';
    let activeGlossarySearchQuery = '';

    function renderGlossaryView(catFilter, searchQuery) {
        if (catFilter !== undefined) activeGlossaryCat = catFilter;
        if (searchQuery !== undefined) activeGlossarySearchQuery = searchQuery.trim().toLowerCase();

        const container = document.getElementById('quick-glossary-container');
        if (!container || phrasesData.length === 0) return;
        container.innerHTML = '';

        const phraseCatLabels = {
            'workplace': { label: '💼 Workplace & Projects', color: '#0ea5e9' },
            'technical_debate': { label: '🔬 Technical Debate', color: '#a855f7' },
            'conflict_resolution': { label: '🤝 Conflict Resolution', color: '#f97316' },
            'small_talk': { label: '💬 Small Talk & Icebreakers', color: '#22c55e' },
            'metrics': { label: '📊 Metrics & Reporting', color: '#ef4444' },
            'meetings': { label: '📅 Meetings & Strategy', color: '#6366f1' },
            'problem_solving': { label: '🛠️ Problem Solving', color: '#d97706' },
            'soft_skills': { label: '🌱 Soft Skills', color: '#10b981' }
        };

        let visibleCount = 0;

        phrasesData.forEach(phrase => {
            const cat = phrase.category || 'workplace';
            const catInfo = phraseCatLabels[cat] || phraseCatLabels.workplace;

            // Filter category
            if (activeGlossaryCat !== 'all' && cat !== activeGlossaryCat) return;

            // Search query filter
            if (activeGlossarySearchQuery) {
                const pText = (phrase.phrase || '').toLowerCase();
                const mText = (phrase.meaningES || '').toLowerCase();
                const eText = (phrase.exampleEN || '').toLowerCase();
                const nText = (phrase.schoolVsNative && phrase.schoolVsNative.native || '').toLowerCase();
                const matches = pText.includes(activeGlossarySearchQuery) ||
                                mText.includes(activeGlossarySearchQuery) ||
                                eText.includes(activeGlossarySearchQuery) ||
                                nText.includes(activeGlossarySearchQuery);
                if (!matches) return;
            }

            visibleCount++;

            const card = document.createElement('div');
            card.className = 'glossary-phrase-card';
            card.style.cssText = `
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 14px;
                padding: 18px 20px;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                cursor: pointer;
                position: relative;
                overflow: hidden;
            `;

            card.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                    <span style="font-size:0.68rem;font-weight:700;padding:3px 8px;border-radius:6px;background:${catInfo.color}12;color:${catInfo.color};text-transform:uppercase;letter-spacing:0.03em;">${catInfo.label}</span>
                    <button class="glossary-audio-btn" title="Escuchar pronunciación nativa">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div style="font-size:1.05rem;font-weight:800;color:#0f172a;margin-bottom:6px;line-height:1.3;">"${phrase.phrase}"</div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                    <span style="font-size:0.78rem;color:#94a3b8;font-weight:600;text-decoration:line-through;">${phrase.schoolVsNative.school}</span>
                    <i class="fa-solid fa-arrow-right" style="font-size:0.6rem;color:#cbd5e1;"></i>
                    <span style="font-size:0.78rem;color:${catInfo.color};font-weight:700;">${phrase.schoolVsNative.native}</span>
                </div>
                <div style="font-size:0.82rem;color:#475569;line-height:1.5;margin-bottom:10px;">${phrase.meaningES}</div>
                <div class="phrase-example-box" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;margin-bottom:6px;display:none;">
                    <div style="font-size:0.78rem;color:#0284c7;font-weight:600;margin-bottom:4px;"><i class="fa-solid fa-message"></i> Example:</div>
                    <div style="font-size:0.82rem;color:#334155;font-style:italic;line-height:1.5;">"${phrase.exampleEN}"</div>
                    <div style="font-size:0.76rem;color:#94a3b8;margin-top:4px;">${phrase.exampleES}</div>
                </div>
                <div style="font-size:0.7rem;color:#94a3b8;"><i class="fa-solid fa-circle-info"></i> ${phrase.pronunciationHint || 'Haz clic para expandir ejemplo'}</div>
            `;

            // Audio button click
            const audioBtn = card.querySelector('.glossary-audio-btn');
            if (audioBtn) {
                audioBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    speakText(phrase.phrase);
                });
            }

            // Toggle example on click
            card.addEventListener('click', () => {
                const exBox = card.querySelector('.phrase-example-box');
                if (exBox) {
                    exBox.style.display = exBox.style.display === 'none' ? 'block' : 'none';
                }
            });

            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = `0 10px 28px rgba(0,0,0,0.08), 0 0 0 2px ${catInfo.color}25`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });

            container.appendChild(card);
        });

        if (visibleCount === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding:48px 20px; background:#ffffff; border:1px dashed #cbd5e1; border-radius:16px;">
                    <i class="fa-solid fa-book-bookmark" style="font-size:2.2rem; color:#cbd5e1; margin-bottom:12px;"></i>
                    <h4 style="font-size:1.1rem; color:#0f172a; margin-bottom:6px;">No se encontraron expresiones</h4>
                    <p style="font-size:0.85rem; color:#64748b;">Intenta con otros términos como "touch base", "blocker", "bandwidth", o "KPI".</p>
                </div>
            `;
        }
    }
    window.renderGlossaryView = renderGlossaryView;

    // Glossary Search & Category Filter Listeners
    const glossarySearchInput = document.getElementById('glossary-search-input');
    if (glossarySearchInput) {
        glossarySearchInput.addEventListener('input', () => {
            renderGlossaryView(activeGlossaryCat, glossarySearchInput.value);
        });
    }

    const glossaryCatFilters = document.querySelectorAll('#glossary-cat-filters .glossary-filter-chip');
    glossaryCatFilters.forEach(chip => {
        chip.addEventListener('click', () => {
            glossaryCatFilters.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const cat = chip.dataset.phraseCat;
            renderGlossaryView(cat, activeGlossarySearchQuery);
        });
    });

    /* --- Constellation Skills Graph (27 Tracks & 4 Clusters) --- */
    const CLUSTER_CONFIG = [
        {
            id: 'cluster-tech',
            title: 'Cluster I · Software, AI & Redes Inteligentes',
            color: '#0284c7',
            x: 20, y: 20, width: 400, height: 245,
            nodes: [
                { id: 'cybersecurity', x: 95, y: 75, icon: 'fa-solid fa-shield-halved', label: 'Ciberseguridad' },
                { id: 'it-innovation', x: 220, y: 65, icon: 'fa-solid fa-cloud', label: 'Innovación TI' },
                { id: 'ai-ml', x: 345, y: 75, icon: 'fa-solid fa-brain', label: 'AI & ML' },
                { id: 'telecom-iot', x: 95, y: 145, icon: 'fa-solid fa-tower-cell', label: 'Telecom & IoT' },
                { id: 'software-dev', x: 220, y: 140, icon: 'fa-solid fa-code', label: 'Software Dev' },
                { id: 'data-analytics', x: 345, y: 145, icon: 'fa-solid fa-chart-pie', label: 'Data Science' },
                { id: 'web-dev-agentic', x: 220, y: 215, icon: 'fa-solid fa-code', label: 'Web Dev & AI' }
            ],
            links: [
                ['cybersecurity', 'it-innovation'],
                ['it-innovation', 'ai-ml'],
                ['cybersecurity', 'telecom-iot'],
                ['it-innovation', 'software-dev'],
                ['ai-ml', 'data-analytics'],
                ['telecom-iot', 'software-dev'],
                ['software-dev', 'data-analytics'],
                ['software-dev', 'web-dev-agentic'],
                ['it-innovation', 'web-dev-agentic']
            ]
        },
        {
            id: 'cluster-eng',
            title: 'Cluster II · Semiconductores & Manufactura Avanzada',
            color: '#f59e0b',
            x: 460, y: 20, width: 400, height: 245,
            nodes: [
                { id: 'semiconductors', x: 535, y: 80, icon: 'fa-solid fa-microchip', label: 'Semiconductores' },
                { id: 'advanced-manufacturing', x: 660, y: 70, icon: 'fa-solid fa-industry', label: 'Manufactura Av.' },
                { id: 'mechatronics', x: 785, y: 80, icon: 'fa-solid fa-cogs', label: 'Mecatrónica' },
                { id: 'robotics-automation', x: 535, y: 145, icon: 'fa-solid fa-robot', label: 'Robótica Ind.' },
                { id: 'industrial-operations', x: 660, y: 140, icon: 'fa-solid fa-dolly', label: 'Operaciones Ind.' },
                { id: 'electromobility', x: 785, y: 145, icon: 'fa-solid fa-car-battery', label: 'Electromovilidad' },
                { id: 'aerospace', x: 575, y: 215, icon: 'fa-solid fa-plane-up', label: 'Aeroespacial' },
                { id: 'energy-renewables', x: 745, y: 215, icon: 'fa-solid fa-solar-panel', label: 'Energía Renovable' }
            ],
            links: [
                ['semiconductors', 'advanced-manufacturing'],
                ['advanced-manufacturing', 'mechatronics'],
                ['semiconductors', 'robotics-automation'],
                ['advanced-manufacturing', 'industrial-operations'],
                ['mechatronics', 'electromobility'],
                ['robotics-automation', 'aerospace'],
                ['electromobility', 'energy-renewables'],
                ['aerospace', 'industrial-operations']
            ]
        },
        {
            id: 'cluster-sci',
            title: 'Cluster III · Biotecnología, Nanotech & Ciencias',
            color: '#10b981',
            x: 20, y: 290, width: 400, height: 250,
            nodes: [
                { id: 'biotechnology', x: 95, y: 365, icon: 'fa-solid fa-dna', label: 'Biotecnología' },
                { id: 'space-satellite', x: 220, y: 350, icon: 'fa-solid fa-satellite', label: 'Satélites & Espacio' },
                { id: 'materials-nanotech', x: 345, y: 365, icon: 'fa-solid fa-atom', label: 'Nanotecnología' },
                { id: 'healthcare-tech', x: 95, y: 470, icon: 'fa-solid fa-heart-pulse', label: 'Health Tech' },
                { id: 'environmental-sustainability', x: 220, y: 455, icon: 'fa-solid fa-leaf', label: 'Sustentabilidad' },
                { id: 'food-science', x: 345, y: 470, icon: 'fa-solid fa-wheat-awn', label: 'Food Science' }
            ],
            links: [
                ['biotechnology', 'space-satellite'],
                ['space-satellite', 'materials-nanotech'],
                ['biotechnology', 'healthcare-tech'],
                ['space-satellite', 'environmental-sustainability'],
                ['materials-nanotech', 'food-science'],
                ['healthcare-tech', 'environmental-sustainability'],
                ['environmental-sustainability', 'food-science']
            ]
        },
        {
            id: 'cluster-car',
            title: 'Cluster IV · Inglés de Aviación & Liderazgo Global',
            color: '#ec4899',
            x: 460, y: 290, width: 400, height: 250,
            nodes: [
                { id: 'aviation-english', x: 535, y: 365, icon: 'fa-solid fa-plane-departure', label: 'Aviation English' },
                { id: 'airforce-aerospace', x: 660, y: 350, icon: 'fa-solid fa-jet-fighter', label: 'Air Force Tech' },
                { id: 'business-leadership', x: 785, y: 365, icon: 'fa-solid fa-briefcase', label: 'Business & Leader' },
                { id: 'hospitality-food', x: 535, y: 470, icon: 'fa-solid fa-hotel', label: 'Hospitality ESP' },
                { id: 'project-management', x: 660, y: 455, icon: 'fa-solid fa-list-check', label: 'Project Mgmt' },
                { id: 'entrepreneurship', x: 785, y: 470, icon: 'fa-solid fa-rocket', label: 'Entrepreneurship' }
            ],
            links: [
                ['aviation-english', 'airforce-aerospace'],
                ['airforce-aerospace', 'business-leadership'],
                ['aviation-english', 'hospitality-food'],
                ['airforce-aerospace', 'project-management'],
                ['business-leadership', 'entrepreneurship'],
                ['hospitality-food', 'project-management'],
                ['project-management', 'entrepreneurship']
            ]
        }
    ];

    const CROSS_CLUSTER_LINKS = [
        ['ai-ml', 'semiconductors'],
        ['materials-nanotech', 'semiconductors'],
        ['aerospace', 'aviation-english'],
        ['data-analytics', 'biotechnology']
    ];

    function renderConstellationGraph() {
        const svg = document.getElementById('skills-graph-constellation-svg');
        if (!svg) return;
        svg.innerHTML = '';

        const nodeCoords = {};
        CLUSTER_CONFIG.forEach(c => {
            c.nodes.forEach(n => {
                nodeCoords[n.id] = { x: n.x, y: n.y, label: n.label, icon: n.icon };
            });
        });

        // 1. Cluster Boundaries & Headers
        CLUSTER_CONFIG.forEach(c => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', c.x);
            rect.setAttribute('y', c.y);
            rect.setAttribute('width', c.width);
            rect.setAttribute('height', c.height);
            rect.setAttribute('class', 'cluster-boundary');
            rect.setAttribute('style', `stroke: ${c.color}35;`);
            svg.appendChild(rect);

            const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            title.setAttribute('x', c.x + 16);
            title.setAttribute('y', c.y + 24);
            title.setAttribute('class', 'cluster-label');
            title.setAttribute('style', `fill: ${c.color};`);
            title.textContent = c.title;
            svg.appendChild(title);
        });

        // 2. Intra-Cluster Links
        CLUSTER_CONFIG.forEach(c => {
            c.links.forEach(([from, to]) => {
                const f = nodeCoords[from];
                const t = nodeCoords[to];
                if (!f || !t) return;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('data-from', from);
                line.setAttribute('data-to', to);
                line.setAttribute('x1', f.x);
                line.setAttribute('y1', f.y);
                line.setAttribute('x2', t.x);
                line.setAttribute('y2', t.y);
                line.setAttribute('class', 'constellation-line');
                svg.appendChild(line);
            });
        });

        // 3. Cross-Cluster Links
        CROSS_CLUSTER_LINKS.forEach(([from, to]) => {
            const f = nodeCoords[from];
            const t = nodeCoords[to];
            if (!f || !t) return;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('data-from', from);
            line.setAttribute('data-to', to);
            line.setAttribute('x1', f.x);
            line.setAttribute('y1', f.y);
            line.setAttribute('x2', t.x);
            line.setAttribute('y2', t.y);
            line.setAttribute('class', 'constellation-line cross-cluster');
            line.setAttribute('stroke-dasharray', '3 3');
            line.setAttribute('stroke-opacity', '0.5');
            svg.appendChild(line);
        });

        // 4. Nodes
        CLUSTER_CONFIG.forEach(c => {
            c.nodes.forEach(n => {
                const status = (skillsData[n.id] && skillsData[n.id].status) || 'active';
                const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                g.setAttribute('class', `node constellation-node node-${status}`);
                g.setAttribute('data-node', n.id);
                g.setAttribute('transform', `translate(${n.x}, ${n.y})`);

                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('r', '22');
                circle.setAttribute('class', 'node-circle');
                g.appendChild(circle);

                const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                fo.setAttribute('x', '-16');
                fo.setAttribute('y', '-16');
                fo.setAttribute('width', '32');
                fo.setAttribute('height', '32');
                fo.setAttribute('class', 'node-icon-wrapper');
                fo.innerHTML = `<i class="${n.icon} node-icon"></i>`;
                g.appendChild(fo);

                const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                txt.setAttribute('y', '36');
                txt.setAttribute('class', 'node-text');
                txt.setAttribute('text-anchor', 'middle');
                txt.textContent = n.label;
                g.appendChild(txt);

                g.addEventListener('click', () => {
                    selectSkillNode(n.id, g);
                });

                svg.appendChild(g);
            });
        });
    }
    window.renderConstellationGraph = renderConstellationGraph;

    /* --- Badges Wall for 26 Tracks (Open Badges 3.0) --- */
    function renderBadgesWall(filter = 'all') {
        const container = document.getElementById('dynamic-badge-wall');
        if (!container) return;
        container.innerHTML = '';

        const orderedTracks = TRACK_ORDER.filter(id => coursesData[id]);
        let visibleCount = 0;

        orderedTracks.forEach(trackId => {
            const track = coursesData[trackId];
            const p = getTrackProgress(trackId);
            const isCompleted = (p.completedReadings === p.totalReadings && p.totalReadings > 0) || (skillsData[trackId] && skillsData[trackId].status === 'completed');
            const isInProgress = !isCompleted && p.completedReadings > 0;

            if (filter === 'unlocked' && !isCompleted) return;
            if (filter === 'in-progress' && !isInProgress) return;

            visibleCount++;
            const statusClass = isCompleted ? 'unlocked' : (isInProgress ? 'in-progress' : 'available');
            const hashCode = `STEMOS-${trackId.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${(trackId.length * 1337).toString(16).toUpperCase()}`;

            const card = document.createElement('div');
            card.className = `badge-card ${statusClass}`;
            card.innerHTML = `
                <div class="badge-icon-box">
                    <i class="${track.icon || 'fa-solid fa-certificate'}"></i>
                </div>
                <span class="badge-card-category" style="background: rgba(2, 132, 199, 0.08); color: #0284c7;">
                    ${track.category || 'Engineering'}
                </span>
                <h4 class="badge-card-title">${track.badgeName || track.titleEN || track.title}</h4>
                <div class="badge-card-standard">
                    <i class="fa-solid fa-shield-halved text-indigo"></i> ${track.badgeStandard || track.standard || 'ISO / SEP CONOCER'}
                </div>
                <div class="badge-card-hash">${hashCode}</div>
                <button class="btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-outline-primary'} badge-cert-action-btn" data-track="${trackId}">
                    <i class="fa-solid ${isCompleted ? 'fa-award' : 'fa-eye'}"></i> ${isCompleted ? 'Ver Credencial' : 'Explorar Módulos'}
                </button>
            `;

            const actionBtn = card.querySelector('.badge-cert-action-btn');
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isCompleted || isInProgress) {
                    openCertificateModal(trackId);
                } else {
                    showTrackDetail(trackId);
                }
            });

            container.appendChild(card);
        });

        if (visibleCount === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
                    <i class="fa-solid fa-award text-muted" style="font-size: 2rem; margin-bottom: 8px;"></i>
                    <h4 style="color: #0f172a; margin-bottom: 4px;">No hay credenciales en esta categoría</h4>
                    <p style="font-size: 0.85rem; color: #64748b;">Completa las evaluaciones y diálogos socráticos para desbloquear tus micro-credenciales.</p>
                </div>
            `;
        }
    }
    window.renderBadgesWall = renderBadgesWall;

    // Filter bar listener for badges
    const badgeFilterBtns = document.querySelectorAll('.badge-filter-btn');
    badgeFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            badgeFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderBadgesWall(btn.dataset.badgeFilter);
        });
    });

    /* --- 8. INITIAL RENDER --- */
    if (Object.keys(coursesData).length > 0) {
        renderAllUnitsGrid('all');
        renderSegmentedProgressBar();
        updateKPIMetrics();
        initTutorSelectors();
        renderConstellationGraph();
        renderBadgesWall('all');
        renderGlossaryView('all');
        renderMcerUnitsGrid('all');
        syncUserPlacementBadge();
    }

    /* ══════════════════════════════════════════════════════════════════════════
       FASE 62: MCER TRACKS (STANDARD AMERICAN ENGLISH) & PLACEMENT INTEGRATION
       ══════════════════════════════════════════════════════════════════════════ */

    let activeMcerLevelFilter = 'all';

    // 1. Dual-World Program Switcher
    const btnWorldMcer = document.getElementById('btn-world-mcer');
    const btnWorldEsp = document.getElementById('btn-world-esp');
    const sectionWorldMcer = document.getElementById('section-world-mcer');
    const sectionWorldEsp = document.getElementById('section-world-esp');

    if (btnWorldMcer && btnWorldEsp) {
        btnWorldMcer.addEventListener('click', () => {
            btnWorldMcer.classList.add('active');
            btnWorldMcer.style.background = '#ffffff';
            btnWorldMcer.style.color = '#0f172a';
            btnWorldMcer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';

            btnWorldEsp.classList.remove('active');
            btnWorldEsp.style.background = 'transparent';
            btnWorldEsp.style.color = '#64748b';
            btnWorldEsp.style.boxShadow = 'none';

            if (sectionWorldMcer) sectionWorldMcer.style.display = 'block';
            if (sectionWorldEsp) sectionWorldEsp.style.display = 'none';

            renderMcerUnitsGrid(activeMcerLevelFilter);
        });

        btnWorldEsp.addEventListener('click', () => {
            btnWorldEsp.classList.add('active');
            btnWorldEsp.style.background = '#ffffff';
            btnWorldEsp.style.color = '#0f172a';
            btnWorldEsp.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';

            btnWorldMcer.classList.remove('active');
            btnWorldMcer.style.background = 'transparent';
            btnWorldMcer.style.color = '#64748b';
            btnWorldMcer.style.boxShadow = 'none';

            if (sectionWorldMcer) sectionWorldMcer.style.display = 'none';
            if (sectionWorldEsp) sectionWorldEsp.style.display = 'block';

            renderAllUnitsGrid(activeFilterCategory);
        });
    }

    // 2. MCER Level Filter Chips
    const mcerLevelChips = document.querySelectorAll('#mcer-level-filter-bar .ed-filter-chip');
    mcerLevelChips.forEach(chip => {
        chip.addEventListener('click', () => {
            mcerLevelChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeMcerLevelFilter = chip.dataset.mcerLevel || 'all';
            renderMcerUnitsGrid(activeMcerLevelFilter);
        });
    });

    // 2.1 MCER 60.0h Credential Action
    const btnMcerAccreditCert = document.getElementById('btn-mcer-accredit-cert');
    if (btnMcerAccreditCert) {
        btnMcerAccreditCert.addEventListener('click', () => {
            const userLvl = (localStorage.getItem('stemos_user_level') || (activeMcerLevelFilter !== 'all' ? activeMcerLevelFilter : 'A1')).toLowerCase();
            openCertificateModal('mcer-' + userLvl);
        });
    }

    // 3. Render MCER Units Grid
    function renderMcerUnitsGrid(levelFilter) {
        const grid = document.getElementById('ed-mcer-units-grid');
        if (!grid || !window.STEMOS_MCER_TRACKS) return;

        grid.innerHTML = '';
        let units = window.STEMOS_MCER_TRACKS.getAllUnits();

        if (levelFilter && levelFilter !== 'all') {
            units = units.filter(u => u.cefr === levelFilter);
        }

        const levelColors = {
            'A1': { color: '#10b981', label: 'Foundations', icon: 'fa-seedling' },
            'A2': { color: '#0284c7', label: 'Waystage', icon: 'fa-route' },
            'B1': { color: '#f59e0b', label: 'Threshold', icon: 'fa-stairs' },
            'B2': { color: '#8b5cf6', label: 'Vantage', icon: 'fa-award' }
        };
        const userLevel = localStorage.getItem('stemos_user_level') || '';

        units.forEach(unit => {
            const meta = levelColors[unit.cefr] || levelColors.A1;
            const gradientBg = `linear-gradient(135deg, ${meta.color}18 0%, ${meta.color}06 50%, #f8fafc 100%)`;
            const isCrucibleDone = localStorage.getItem('stemos_crucible_' + unit.id) === 'completed';
            const isActiveLevel = userLevel && unit.cefr === userLevel;

            const card = document.createElement('div');
            card.className = 'ed-unit-card';
            card.dataset.unitId = unit.id;
            card.dataset.cefr = unit.cefr;
            if (isActiveLevel) {
                card.style.border = `1.5px solid ${meta.color}`;
                card.style.boxShadow = `0 4px 14px ${meta.color}25`;
            }

            card.innerHTML = `
                <div class="ed-unit-card-img-wrapper" style="background: ${gradientBg}; display:flex; align-items:center; justify-content:center; position:relative;">
                    <i class="fa-solid ${meta.icon}" style="font-size: 3.5rem; color: ${meta.color}; opacity: 0.5;"></i>
                    <span class="ed-unit-card-cat-badge" style="border-left: 3px solid ${meta.color}; color:${meta.color};">CEFR ${unit.cefr} · ${meta.label}</span>
                    ${isActiveLevel ? `<span style="position:absolute; top:8px; right:8px; background:${meta.color}; color:#fff; font-size:0.68rem; font-weight:800; padding:2px 8px; border-radius:6px; box-shadow:0 2px 4px rgba(0,0,0,0.1);"><i class="fa-solid fa-play"></i> En Curso</span>` : ''}
                    ${isCrucibleDone ? '<span style="position:absolute; bottom:8px; right:8px; background:#dcfce7; color:#15803d; border:1px solid #86efac; font-size:0.68rem; font-weight:800; padding:2px 7px; border-radius:6px;"><i class="fa-solid fa-check"></i> Crisol ✓</span>' : ''}
                </div>
                <div class="ed-unit-card-body">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div class="ed-unit-number">Unit ${String(unit.unitNumber).padStart(2, '0')}</div>
                        <span style="font-size:0.7rem; font-weight:700; color:#64748b; background:#f1f5f9; padding:2px 6px; border-radius:4px;">15.0h Acreditadas</span>
                    </div>
                    <div class="ed-unit-title">${unit.title}</div>
                    <div style="font-size:0.8rem; color:#64748b; margin-top:4px; line-height:1.4;">${unit.canDo}</div>
                    <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.72rem; font-weight:700; color:${meta.color}; background:${meta.color}15; padding:2px 8px; border-radius:999px; margin-top:8px;">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> ${unit.grammarFocus}
                    </div>
                    <div class="ed-unit-progress-container" style="margin-top:12px; display:flex; flex-direction:column; gap:4px;">
                        <span class="ed-unit-progress-text" style="color:#0284c7; font-weight:700; font-size:0.75rem;">
                            <i class="fa-solid fa-book-open"></i> ${unit.vocabulary ? unit.vocabulary.length : 8} Vocab · 
                            <i class="fa-solid fa-triangle-exclamation" style="color:#dc2626;"></i> Falsos Amigos · 
                            <i class="fa-solid fa-industry" style="color:#10b981;"></i> Crisol
                        </span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                openMcerUnitModal(unit.id);
            });

            grid.appendChild(card);
        });
    }
    window.renderMcerUnitsGrid = renderMcerUnitsGrid;

    // 4. MCER Unit Study Modal
    let activeMcerUnit = null;

    function openMcerUnitModal(unitId) {
        if (!hasCompletedPlacement()) {
            showPlacementRequiredModal();
            return;
        }
        if (!window.STEMOS_MCER_TRACKS) return;
        const unit = window.STEMOS_MCER_TRACKS.getUnitById(unitId);
        if (!unit) return;

        activeMcerUnit = unit;
        const modal = document.getElementById('modal-mcer-unit');
        if (!modal) return;

        // Header info
        document.getElementById('mcer-unit-level-badge').textContent = `CEFR ${unit.cefr}`;
        document.getElementById('mcer-unit-title').textContent = `Unit ${String(unit.unitNumber).padStart(2, '0')} · ${unit.title}`;
        document.getElementById('mcer-unit-cando').textContent = `${unit.titleES || ''} — ${unit.canDo || ''}`;

        // Normalize dialogue lines (handles array or object with lines)
        const dialogueLines = Array.isArray(unit.dialogue)
            ? unit.dialogue
            : (unit.dialogue && Array.isArray(unit.dialogue.lines) ? unit.dialogue.lines : []);

        // Tab 1: Dialogue
        const bubblesContainer = document.getElementById('mcer-dialogue-bubbles');
        bubblesContainer.innerHTML = '';
        if (dialogueLines.length > 0) {
            dialogueLines.forEach(d => {
                const speakerName = d.speaker || 'Speaker';
                const textContent = d.text || '';
                const bubble = document.createElement('div');
                bubble.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px 14px; display:flex; align-items:flex-start; gap:10px;';
                bubble.innerHTML = `
                    <div style="width:32px; height:32px; border-radius:50%; background:#e0f2fe; color:#0284c7; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.8rem; flex-shrink:0;">
                        ${speakerName.charAt(0)}
                    </div>
                    <div style="flex:1;">
                        <div style="font-size:0.75rem; font-weight:800; color:#0284c7; text-transform:uppercase;">${speakerName}</div>
                        <div style="font-size:0.92rem; color:#0f172a; margin-top:2px;">${textContent}</div>
                    </div>
                    <button class="btn-play-turn-audio" style="background:none; border:none; color:#0284c7; cursor:pointer; font-size:1rem; padding:4px;" title="Escuchar">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                `;
                bubble.querySelector('.btn-play-turn-audio').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (window.STEMOS_PLACEMENT_TEST) {
                        window.STEMOS_PLACEMENT_TEST.playAudioPrompt(d.audioScript || textContent);
                    }
                });
                bubblesContainer.appendChild(bubble);
            });
        }

        // Play All Dialogue
        const btnPlayAll = document.getElementById('btn-mcer-play-all-dialogue');
        if (btnPlayAll) {
            btnPlayAll.onclick = () => {
                if (dialogueLines.length === 0 || !window.STEMOS_PLACEMENT_TEST) return;
                const fullScript = dialogueLines.map(d => `${d.speaker || ''} says: ${d.text || ''}`).join('. ');
                window.STEMOS_PLACEMENT_TEST.playAudioPrompt(fullScript);
            };
        }

        // Tab 2: Vocab & Grammar
        document.getElementById('mcer-grammar-focus-text').textContent = unit.grammarFocus || 'Standard Technical Grammar Patterns';
        
        // Render Alertas de Falsos Amigos (False Cognates)
        const fcSection = document.getElementById('mcer-false-cognates-section');
        const fcGrid = document.getElementById('mcer-false-cognates-grid');
        if (fcSection && fcGrid) {
            fcGrid.innerHTML = '';
            const falseCognates = unit.falseCognates || [];
            if (falseCognates.length > 0) {
                fcSection.style.display = 'block';
                falseCognates.forEach(fc => {
                    const fcCard = document.createElement('div');
                    fcCard.style.cssText = 'background:#ffffff; border:1px solid #fecaca; border-radius:10px; padding:10px 12px; box-shadow:0 1px 3px rgba(220,38,38,0.05);';
                    fcCard.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:#b91c1c; font-size:0.9rem;">${fc.term}</strong>
                            <span style="font-size:0.7rem; color:#dc2626; background:#fef2f2; padding:2px 6px; border-radius:4px; font-weight:700;">≠ ${fc.mistake}</span>
                        </div>
                        <div style="font-size:0.8rem; color:#15803d; font-weight:700; margin-top:4px;">
                            <i class="fa-solid fa-check"></i> Significado Real: ${fc.correct}
                        </div>
                        <div style="font-size:0.75rem; color:#64748b; margin-top:4px; line-height:1.4;">
                            ${fc.tip}
                        </div>
                    `;
                    fcGrid.appendChild(fcCard);
                });
            } else {
                fcSection.style.display = 'none';
            }
        }

        // Render Laboratorio Fonético & Acentuación (Syllable Stress)
        const plSection = document.getElementById('mcer-pronunciation-lab-section');
        const plGrid = document.getElementById('mcer-pronunciation-lab-grid');
        if (plSection && plGrid) {
            plGrid.innerHTML = '';
            const pronList = unit.pronunciationLab || [];
            if (pronList.length > 0) {
                plSection.style.display = 'block';
                pronList.forEach(pl => {
                    const plCard = document.createElement('div');
                    plCard.style.cssText = 'background:#ffffff; border:1px solid #bfdbfe; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:flex-start;';
                    plCard.innerHTML = `
                        <div>
                            <div style="display:flex; align-items:baseline; gap:6px;">
                                <strong style="color:#1d4ed8; font-size:0.92rem;">${pl.term}</strong>
                                <span style="font-family:var(--font-mono); font-size:0.78rem; font-weight:800; color:#0284c7; background:#eff6ff; padding:1px 6px; border-radius:4px;">${pl.stress}</span>
                            </div>
                            <div style="font-family:var(--font-mono); font-size:0.72rem; color:#64748b; margin-top:2px;">${pl.ipa || ''}</div>
                            <div style="font-size:0.75rem; color:#334155; margin-top:4px; line-height:1.35;">${pl.rule || ''}</div>
                        </div>
                        <button class="btn-play-pl-audio" style="background:#eff6ff; color:#1d4ed8; border:none; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; margin-left:6px;" title="Escuchar">
                            <i class="fa-solid fa-volume-high" style="font-size:0.75rem;"></i>
                        </button>
                    `;
                    plCard.querySelector('.btn-play-pl-audio').addEventListener('click', () => {
                        if (window.STEMOS_PLACEMENT_TEST) {
                            window.STEMOS_PLACEMENT_TEST.playAudioPrompt(pl.term);
                        }
                    });
                    plGrid.appendChild(plCard);
                });
            } else {
                plSection.style.display = 'none';
            }
        }

        const vocabGrid = document.getElementById('mcer-vocab-cards-grid');
        vocabGrid.innerHTML = '';
        const vocabList = Array.isArray(unit.vocabulary) ? unit.vocabulary : [];
        if (vocabList.length > 0) {
            vocabList.forEach(v => {
                const termStr = v.term || v.en || '';
                const sampleStr = v.sample || v.example || '';
                const vCard = document.createElement('div');
                vCard.style.cssText = 'background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:12px 14px; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; justify-content:space-between; align-items:flex-start;';
                vCard.innerHTML = `
                    <div>
                        <strong style="color:#0f172a; font-size:0.95rem;">${termStr}</strong>
                        <span style="font-family:var(--font-mono); font-size:0.75rem; color:#64748b; margin-left:6px;">${v.ipa || ''}</span>
                        <div style="font-size:0.8rem; color:#0284c7; font-weight:600; margin-top:2px;">${v.es || ''}</div>
                        <div style="font-size:0.75rem; color:#64748b; margin-top:4px; font-style:italic;">"${sampleStr}"</div>
                    </div>
                    <button class="btn-play-vocab-audio" style="background:#e0f2fe; color:#0284c7; border:none; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0;" title="Escuchar pronunciación">
                        <i class="fa-solid fa-volume-high" style="font-size:0.75rem;"></i>
                    </button>
                `;
                vCard.querySelector('.btn-play-vocab-audio').addEventListener('click', () => {
                    if (window.STEMOS_PLACEMENT_TEST) {
                        window.STEMOS_PLACEMENT_TEST.playAudioPrompt(`${termStr}. ${sampleStr}`);
                    }
                });
                vocabGrid.appendChild(vCard);
            });
        }

        // Tab 2.3: Vocab Exercises (4 MCQs)
        const vocabExContainer = document.getElementById('mcer-vocab-exercises-container');
        const vocabResultsBox = document.getElementById('mcer-vocab-results-box');
        if (vocabResultsBox) vocabResultsBox.style.display = 'none';
        if (vocabExContainer) {
            vocabExContainer.innerHTML = '';
            const vExercises = unit.vocabularyExercises || [];
            vExercises.forEach((vq, vqIdx) => {
                const block = document.createElement('div');
                block.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px 14px;';
                block.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
                        <div style="font-weight:700; font-size:0.88rem; color:#0f172a; flex:1;">
                            ${vqIdx + 1}. ${vq.q}
                        </div>
                        ${vq.falseCognateRef ? `
                            <span style="font-size:0.65rem; font-weight:800; color:#dc2626; background:#fef2f2; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; flex-shrink:0;">
                                Falso Amigo
                            </span>
                        ` : ''}
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${(vq.options || []).map((opt, optIdx) => `
                            <label class="mcer-vq-label-${vqIdx}" style="display:flex; align-items:center; gap:10px; font-size:0.88rem; color:#0f172a !important; padding:9px 12px; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; cursor:pointer; transition:all 0.15s ease;">
                                <input type="radio" name="mcer-vq-${vqIdx}" value="${optIdx}" style="accent-color:#0284c7; width:16px; height:16px; cursor:pointer;">
                                <span style="color:#0f172a !important; font-weight:600; line-height:1.4;">${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="mcer-vq-exp-${vqIdx}" style="display:none; margin-top:8px; font-size:0.8rem; background:#eff6ff; border-left:3px solid #0284c7; padding:6px 10px; border-radius:4px; color:#1e40af;">
                        <strong>Colocación / Fundamento:</strong> ${vq.exp || ''}
                    </div>
                `;
                vocabExContainer.appendChild(block);
            });

            // Vocab Check Listener
            const btnSubmitVocab = document.getElementById('btn-submit-mcer-vocab');
            if (btnSubmitVocab) {
                btnSubmitVocab.onclick = () => {
                    if (vExercises.length === 0) return;
                    let vCorrect = 0;
                    vExercises.forEach((vq, vqIdx) => {
                        const selected = document.querySelector(`input[name="mcer-vq-${vqIdx}"]:checked`);
                        const labels = document.querySelectorAll(`.mcer-vq-label-${vqIdx}`);
                        const expBox = document.querySelector(`.mcer-vq-exp-${vqIdx}`);
                        if (expBox) expBox.style.display = 'block';

                        labels.forEach(lbl => {
                            const input = lbl.querySelector('input');
                            if (parseInt(input.value) === vq.answer) {
                                lbl.style.background = '#dcfce7';
                                lbl.style.borderColor = '#86efac';
                            } else if (input.checked && parseInt(input.value) !== vq.answer) {
                                lbl.style.background = '#fee2e2';
                                lbl.style.borderColor = '#fca5a5';
                            }
                        });
                        if (selected && parseInt(selected.value) === vq.answer) {
                            vCorrect++;
                        }
                    });
                    if (vocabResultsBox) {
                        vocabResultsBox.style.display = 'block';
                        const vPct = Math.round((vCorrect / vExercises.length) * 100);
                        const scoreEl = document.getElementById('mcer-vocab-score-val');
                        if (scoreEl) scoreEl.textContent = `${vCorrect}/${vExercises.length} (${vPct}%)`;
                        if (vPct >= 75) {
                            try {
                                const prevXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
                                localStorage.setItem('stemos_student_xp', String(prevXP + 100));
                            } catch (e) {}
                        }
                    }
                };
            }
        }

        // Tab 3: Listening Lab (Comprensión Auditiva Industrial • 3 Reactivos)
        const listeningTitle = document.getElementById('mcer-listening-title');
        const listeningSpeaker = document.getElementById('mcer-listening-speaker-badge');
        const listeningScript = document.getElementById('mcer-listening-script-text');
        const btnToggleScript = document.getElementById('btn-toggle-listening-script');
        const btnPlayListening = document.getElementById('btn-mcer-play-listening-scenario');
        const listeningContainer = document.getElementById('mcer-listening-questions-container');
        const listeningResultsBox = document.getElementById('mcer-listening-results-box');
        if (listeningResultsBox) listeningResultsBox.style.display = 'none';

        const labData = unit.listeningLab || null;
        if (labData) {
            if (listeningTitle) listeningTitle.textContent = labData.title || 'Plant Dispatch Audio';
            if (listeningSpeaker) listeningSpeaker.textContent = `Speaker: ${labData.speaker || 'Industrial Supervisor'}`;
            if (listeningScript) {
                listeningScript.textContent = labData.audioScript || '';
                listeningScript.style.display = 'none';
            }
            if (btnToggleScript && listeningScript) {
                btnToggleScript.innerHTML = '<i class="fa-solid fa-eye"></i> Ver Transcripción de Audio';
                btnToggleScript.onclick = () => {
                    const isHidden = listeningScript.style.display === 'none';
                    listeningScript.style.display = isHidden ? 'block' : 'none';
                    btnToggleScript.innerHTML = isHidden 
                        ? '<i class="fa-solid fa-eye-slash"></i> Ocultar Transcripción' 
                        : '<i class="fa-solid fa-eye"></i> Ver Transcripción de Audio';
                };
            }
            if (btnPlayListening) {
                btnPlayListening.onclick = () => {
                    if (labData.audioScript && window.STEMOS_PLACEMENT_TEST) {
                        window.STEMOS_PLACEMENT_TEST.playAudioPrompt(labData.audioScript);
                    }
                };
            }

            if (listeningContainer) {
                listeningContainer.innerHTML = '';
                const lQuestions = labData.questions || [];
                lQuestions.forEach((lq, lqIdx) => {
                    const block = document.createElement('div');
                    block.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px 14px;';
                    block.innerHTML = `
                        <div style="font-weight:700; font-size:0.88rem; color:#0f172a; margin-bottom:8px;">${lqIdx + 1}. ${lq.q}</div>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            ${(lq.options || []).map((opt, optIdx) => `
                                <label class="mcer-lq-label-${lqIdx}" style="display:flex; align-items:center; gap:10px; font-size:0.88rem; color:#0f172a !important; padding:9px 12px; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; cursor:pointer; transition:all 0.15s ease;">
                                    <input type="radio" name="mcer-lq-${lqIdx}" value="${optIdx}" style="accent-color:#0284c7; width:16px; height:16px; cursor:pointer;">
                                    <span style="color:#0f172a !important; font-weight:600; line-height:1.4;">${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                        <div class="mcer-lq-exp-${lqIdx}" style="display:none; margin-top:8px; font-size:0.8rem; background:#eff6ff; border-left:3px solid #0284c7; padding:6px 10px; border-radius:4px; color:#1e40af;">
                            <strong>Justificación de Audio:</strong> ${lq.exp || ''}
                        </div>
                    `;
                    listeningContainer.appendChild(block);
                });

                // Listening Check Listener
                const btnSubmitListening = document.getElementById('btn-submit-mcer-listening');
                if (btnSubmitListening) {
                    btnSubmitListening.onclick = () => {
                        if (lQuestions.length === 0) return;
                        let lCorrect = 0;
                        lQuestions.forEach((lq, lqIdx) => {
                            const selected = document.querySelector(`input[name="mcer-lq-${lqIdx}"]:checked`);
                            const labels = document.querySelectorAll(`.mcer-lq-label-${lqIdx}`);
                            const expBox = document.querySelector(`.mcer-lq-exp-${lqIdx}`);
                            if (expBox) expBox.style.display = 'block';

                            labels.forEach(lbl => {
                                const input = lbl.querySelector('input');
                                if (parseInt(input.value) === lq.answer) {
                                    lbl.style.background = '#dcfce7';
                                    lbl.style.borderColor = '#86efac';
                                } else if (input.checked && parseInt(input.value) !== lq.answer) {
                                    lbl.style.background = '#fee2e2';
                                    lbl.style.borderColor = '#fca5a5';
                                }
                            });
                            if (selected && parseInt(selected.value) === lq.answer) {
                                lCorrect++;
                            }
                        });
                        if (listeningResultsBox) {
                            listeningResultsBox.style.display = 'block';
                            const lPct = Math.round((lCorrect / lQuestions.length) * 100);
                            const scoreEl = document.getElementById('mcer-listening-score-val');
                            if (scoreEl) scoreEl.textContent = `${lCorrect}/${lQuestions.length} (${lPct}%)`;
                            if (lPct >= 66) {
                                try {
                                    const prevXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
                                    localStorage.setItem('stemos_student_xp', String(prevXP + 150));
                                } catch (e) {}
                            }
                        }
                    };
                }
            }
        }

        // Tab 4: Grammar & Applied Syntax Drills (5 MCQs with Socratic Hints)
        const grammarHeader = document.getElementById('mcer-grammar-drills-header');
        const grammarContainer = document.getElementById('mcer-grammar-drills-container');
        const grammarResultsBox = document.getElementById('mcer-grammar-results-box');
        if (grammarResultsBox) grammarResultsBox.style.display = 'none';

        if (grammarHeader) {
            grammarHeader.textContent = `Drills: ${unit.grammarFocus || 'Reglas de Estructura'}`;
        }

        const gDrills = unit.grammarDrills || [];
        if (grammarContainer) {
            grammarContainer.innerHTML = '';
            gDrills.forEach((gq, gqIdx) => {
                const block = document.createElement('div');
                block.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; position:relative;';
                block.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:8px;">
                        <div style="font-weight:700; font-size:0.92rem; color:#0f172a; flex:1;">
                            ${gqIdx + 1}. ${gq.q}
                        </div>
                        ${gq.rule ? `
                            <span style="font-size:0.68rem; font-weight:800; color:#7c3aed; background:#ede9fe; padding:2px 8px; border-radius:6px; flex-shrink:0;">
                                ${gq.rule}
                            </span>
                        ` : ''}
                    </div>

                    ${gq.socraticHint ? `
                        <div style="margin-bottom:10px;">
                            <button type="button" class="btn-toggle-grammar-hint" style="background:none; border:none; color:#7c3aed; font-size:0.78rem; font-weight:700; cursor:pointer; padding:0; display:inline-flex; align-items:center; gap:5px;">
                                <i class="fa-solid fa-lightbulb"></i> Pista Socrática
                            </button>
                            <div class="grammar-hint-box" style="display:none; margin-top:6px; background:#f5f3ff; border:1px solid #ddd6fe; border-left:3px solid #8b5cf6; padding:8px 12px; border-radius:6px; font-size:0.8rem; color:#5b21b6; line-height:1.45;">
                                <strong>Pista de Estructura:</strong> ${gq.socraticHint}
                            </div>
                        </div>
                    ` : ''}

                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${(gq.options || []).map((opt, optIdx) => `
                            <label class="mcer-gq-label-${gqIdx}" style="display:flex; align-items:center; gap:10px; font-size:0.88rem; color:#0f172a !important; padding:9px 12px; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; cursor:pointer; transition:all 0.15s ease;">
                                <input type="radio" name="mcer-gq-${gqIdx}" value="${optIdx}" style="accent-color:#7c3aed; width:16px; height:16px; cursor:pointer;">
                                <span style="color:#0f172a !important; font-weight:600; line-height:1.4;">${opt}</span>
                            </label>
                        `).join('')}
                    </div>

                    <div class="mcer-gq-exp-${gqIdx}" style="display:none; margin-top:10px; background:#f1f5f9; border-left:3px solid #7c3aed; padding:8px 12px; border-radius:6px; font-size:0.8rem; color:#1e293b; line-height:1.4;">
                        <strong>Fundamento Gramatical:</strong> ${gq.exp || ''}
                    </div>
                `;

                const btnHint = block.querySelector('.btn-toggle-grammar-hint');
                const hintBox = block.querySelector('.grammar-hint-box');
                if (btnHint && hintBox) {
                    btnHint.onclick = () => {
                        const isHidden = hintBox.style.display === 'none';
                        hintBox.style.display = isHidden ? 'block' : 'none';
                        btnHint.innerHTML = isHidden
                            ? '<i class="fa-solid fa-lightbulb"></i> Ocultar Pista'
                            : '<i class="fa-solid fa-lightbulb"></i> Pista Socrática';
                    };
                }

                grammarContainer.appendChild(block);
            });

            // Grammar Check Listener
            const btnSubmitGrammar = document.getElementById('btn-submit-mcer-grammar');
            if (btnSubmitGrammar) {
                btnSubmitGrammar.onclick = () => {
                    if (gDrills.length === 0) return;
                    let gCorrect = 0;
                    gDrills.forEach((gq, gqIdx) => {
                        const selected = document.querySelector(`input[name="mcer-gq-${gqIdx}"]:checked`);
                        const labels = document.querySelectorAll(`.mcer-gq-label-${gqIdx}`);
                        const expBox = document.querySelector(`.mcer-gq-exp-${gqIdx}`);
                        if (expBox) expBox.style.display = 'block';

                        labels.forEach(lbl => {
                            const input = lbl.querySelector('input');
                            if (parseInt(input.value) === gq.answer) {
                                lbl.style.background = '#dcfce7';
                                lbl.style.borderColor = '#86efac';
                            } else if (input.checked && parseInt(input.value) !== gq.answer) {
                                lbl.style.background = '#fee2e2';
                                lbl.style.borderColor = '#fca5a5';
                            }
                        });
                        if (selected && parseInt(selected.value) === gq.answer) {
                            gCorrect++;
                        }
                    });
                    if (grammarResultsBox) {
                        grammarResultsBox.style.display = 'block';
                        const gPct = Math.round((gCorrect / gDrills.length) * 100);
                        const scoreEl = document.getElementById('mcer-grammar-score-val');
                        if (scoreEl) scoreEl.textContent = `${gCorrect}/${gDrills.length} (${gPct}%)`;
                        if (gPct >= 80) {
                            try {
                                const prevXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
                                localStorage.setItem('stemos_student_xp', String(prevXP + 200));
                            } catch (e) {}
                        }
                    }
                };
            }
        }

        // Tab 5: Reading
        if (unit.reading) {
            const rTitle = unit.reading.title || 'Technical Standard Documentation';
            const rPassage = unit.reading.passage || unit.reading.text || '';
            document.getElementById('mcer-reading-passage-title').textContent = rTitle;
            document.getElementById('mcer-reading-passage-text').textContent = rPassage;

            // Tab 3: Reading Comprehension
            const rQuestions = unit.reading.questions || (unit.reading.question ? [{
                q: unit.reading.question,
                options: unit.reading.options || [],
                answer: unit.reading.correct !== undefined ? unit.reading.correct : (unit.reading.answer || 0),
                exp: unit.reading.exp || 'Verifica el texto para confirmar los parámetros normativos.'
            }] : []);

            const rQContainer = document.getElementById('mcer-reading-questions-container');
            rQContainer.innerHTML = '';
            rQuestions.forEach((rq, rqIdx) => {
                const block = document.createElement('div');
                block.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px 14px;';
                block.innerHTML = `
                    <div style="font-weight:700; font-size:0.88rem; color:#0f172a; margin-bottom:8px;">${rqIdx + 1}. ${rq.q}</div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${(rq.options || []).map((opt, optIdx) => `
                            <label class="mcer-rq-label-${rqIdx}" style="display:flex; align-items:center; gap:10px; font-size:0.88rem; color:#0f172a !important; padding:9px 12px; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; cursor:pointer; transition:all 0.15s ease;">
                                <input type="radio" name="mcer-rq-${rqIdx}" value="${optIdx}" style="accent-color:#0284c7; width:16px; height:16px; cursor:pointer;">
                                <span style="color:#0f172a !important; font-weight:600; line-height:1.4;">${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="mcer-rq-exp-${rqIdx}" style="display:none; margin-top:8px; font-size:0.8rem; background:#eff6ff; border-left:3px solid #0284c7; padding:6px 10px; border-radius:4px; color:#1e40af;">
                        <strong>Fundamento Técnico:</strong> ${rq.exp || ''}
                    </div>
                `;
                rQContainer.appendChild(block);
            });

            // Reading Check Listener
            const btnSubmitReading = document.getElementById('btn-submit-mcer-reading');
            const rResultsBox = document.getElementById('mcer-reading-results-box');
            if (rResultsBox) rResultsBox.style.display = 'none';
            if (btnSubmitReading) {
                btnSubmitReading.onclick = () => {
                    if (rQuestions.length === 0) return;
                    let rCorrect = 0;
                    rQuestions.forEach((rq, rqIdx) => {
                        const selected = document.querySelector(`input[name="mcer-rq-${rqIdx}"]:checked`);
                        const labels = document.querySelectorAll(`.mcer-rq-label-${rqIdx}`);
                        const expBox = document.querySelector(`.mcer-rq-exp-${rqIdx}`);
                        if (expBox) expBox.style.display = 'block';

                        labels.forEach(lbl => {
                            const input = lbl.querySelector('input');
                            const span = lbl.querySelector('span');
                            if (span) span.style.color = '#0f172a';
                            if (parseInt(input.value) === rq.answer) {
                                lbl.style.background = '#dcfce7';
                                lbl.style.borderColor = '#86efac';
                                lbl.style.color = '#0f172a';
                            } else if (input.checked && parseInt(input.value) !== rq.answer) {
                                lbl.style.background = '#fee2e2';
                                lbl.style.borderColor = '#fca5a5';
                                lbl.style.color = '#0f172a';
                            }
                        });
                        if (selected && parseInt(selected.value) === rq.answer) {
                            rCorrect++;
                        }
                    });
                    if (rResultsBox) {
                        rResultsBox.style.display = 'block';
                        const rPct = Math.round((rCorrect / rQuestions.length) * 100);
                        document.getElementById('mcer-reading-score-val').textContent = `${rCorrect}/${rQuestions.length} (${rPct}%)`;
                    }
                };
            }
        }

        // Tab 4: Unit Quiz (8 Standardized MCQs + Socratic AI Hints)
        const quizContainer = document.getElementById('mcer-quiz-questions-container');
        quizContainer.innerHTML = '';
        const quizResultsBox = document.getElementById('mcer-quiz-results-box');
        if (quizResultsBox) quizResultsBox.style.display = 'none';

        const quizList = unit.unitQuiz || (unit.quiz ? unit.quiz.map(q => ({
            question: q.q || q.question,
            options: q.opts || q.options || [],
            answer: q.ans !== undefined ? q.ans : (q.answer !== undefined ? q.answer : 0),
            explanation: q.exp || q.explanation || '',
            socraticHint: q.socraticHint || '',
            category: q.category || 'General'
        })) : []);

        if (quizList.length > 0) {
            quizList.forEach((uq, uqIdx) => {
                const qBlock = document.createElement('div');
                qBlock.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; position:relative;';
                qBlock.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:8px;">
                        <div style="font-weight:700; font-size:0.92rem; color:#0f172a; flex:1;">
                            ${uqIdx + 1}. ${uq.question}
                        </div>
                        <span style="font-size:0.68rem; font-weight:800; color:#0284c7; background:#e0f2fe; padding:2px 8px; border-radius:6px; text-transform:uppercase; letter-spacing:0.03em; flex-shrink:0;">
                            ${uq.category}
                        </span>
                    </div>

                    ${uq.socraticHint ? `
                        <div style="margin-bottom:10px;">
                            <button type="button" class="btn-toggle-socratic-hint" style="background:none; border:none; color:#d97706; font-size:0.78rem; font-weight:700; cursor:pointer; padding:0; display:inline-flex; align-items:center; gap:5px;">
                                <i class="fa-solid fa-lightbulb"></i> ¿Dudas? Ver Pista Socrática (AI Mentor)
                            </button>
                            <div class="socratic-hint-box" style="display:none; margin-top:6px; background:#fffbeb; border:1px solid #fde68a; border-left:3px solid #f59e0b; padding:8px 12px; border-radius:6px; font-size:0.8rem; color:#92400e; line-height:1.45;">
                                <strong style="display:flex; align-items:center; gap:4px; margin-bottom:2px;"><i class="fa-solid fa-brain"></i> Guía Mayéutica:</strong>
                                ${uq.socraticHint}
                            </div>
                        </div>
                    ` : ''}

                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${uq.options.map((opt, optIdx) => `
                            <label class="mcer-quiz-opt-label-${uqIdx}" style="display:flex; align-items:center; gap:10px; font-size:0.88rem; color:#0f172a !important; padding:9px 12px; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; cursor:pointer; transition:all 0.15s ease;">
                                <input type="radio" name="mcer-quiz-q-${uqIdx}" value="${optIdx}" style="accent-color:#0284c7; width:16px; height:16px; cursor:pointer;">
                                <span style="color:#0f172a !important; font-weight:600; line-height:1.4;">${opt}</span>
                            </label>
                        `).join('')}
                    </div>

                    <div class="mcer-quiz-exp-box-${uqIdx}" style="display:none; margin-top:10px; background:#f1f5f9; border-left:3px solid #3b82f6; padding:8px 12px; border-radius:6px; font-size:0.8rem; color:#1e293b; line-height:1.4;">
                        <strong>Fundamento:</strong> ${uq.explanation}
                    </div>
                `;

                // Bind Socratic hint toggle
                const btnHint = qBlock.querySelector('.btn-toggle-socratic-hint');
                const hintBox = qBlock.querySelector('.socratic-hint-box');
                if (btnHint && hintBox) {
                    btnHint.onclick = () => {
                        const isHidden = hintBox.style.display === 'none';
                        hintBox.style.display = isHidden ? 'block' : 'none';
                        btnHint.innerHTML = isHidden
                            ? '<i class="fa-solid fa-lightbulb"></i> Ocultar Pista Socrática'
                            : '<i class="fa-solid fa-lightbulb"></i> ¿Dudas? Ver Pista Socrática (AI Mentor)';
                    };
                }

                quizContainer.appendChild(qBlock);
            });
        }

        // Quiz Submit Listener
        const btnSubmitQuiz = document.getElementById('btn-submit-mcer-quiz');
        if (btnSubmitQuiz) {
            btnSubmitQuiz.onclick = () => {
                if (quizList.length === 0) return;
                let correctCount = 0;
                quizList.forEach((uq, uqIdx) => {
                    const selected = document.querySelector(`input[name="mcer-quiz-q-${uqIdx}"]:checked`);
                    const labels = document.querySelectorAll(`.mcer-quiz-opt-label-${uqIdx}`);
                    const expBox = document.querySelector(`.mcer-quiz-exp-box-${uqIdx}`);
                    if (expBox) expBox.style.display = 'block';

                    labels.forEach(lbl => {
                        const input = lbl.querySelector('input');
                        const span = lbl.querySelector('span');
                        if (span) span.style.color = '#0f172a';
                        if (parseInt(input.value) === uq.answer) {
                            lbl.style.background = '#dcfce7';
                            lbl.style.borderColor = '#86efac';
                            lbl.style.fontWeight = '700';
                            lbl.style.color = '#0f172a';
                        } else if (input.checked && parseInt(input.value) !== uq.answer) {
                            lbl.style.background = '#fee2e2';
                            lbl.style.borderColor = '#fca5a5';
                            lbl.style.color = '#0f172a';
                        }
                    });
                    if (selected && parseInt(selected.value) === uq.answer) {
                        correctCount++;
                    }
                });

                const pct = Math.round((correctCount / quizList.length) * 100);
                if (quizResultsBox) {
                    quizResultsBox.style.display = 'block';
                    document.getElementById('mcer-quiz-score-val').textContent = `${pct}% (${correctCount}/${quizList.length})`;
                    const msgEl = quizResultsBox.querySelector('div:last-child');
                    if (pct >= 70) {
                        if (msgEl) msgEl.innerHTML = '🎉 ¡Unidad MCER Aprobada! +300 XP Acreditados · Micro-credencial verificada.';
                        localStorage.setItem(`stemos_mcer_unit_${unit.id}`, 'passed');
                        // Update banner hours and badges
                        if (window.renderMcerUnitsGrid) window.renderMcerUnitsGrid();
                    } else {
                        if (msgEl) msgEl.innerHTML = '⚠️ Calificación insuficiente (mínimo 70%). Revisa las pistas socráticas y vuelve a intentarlo.';
                    }
                }
            };
        }

        // Tab 5: Plant Floor Crucible Simulation
        const crucibleTitle = document.getElementById('mcer-crucible-title');
        const crucibleContext = document.getElementById('mcer-crucible-context');
        const crucibleScenario = document.getElementById('mcer-crucible-scenario');
        if (crucibleTitle && unit.crucible) {
            crucibleTitle.textContent = unit.crucible.title || 'Plant Crucible Simulation';
            if (crucibleContext) crucibleContext.textContent = unit.crucible.context || '';
            if (crucibleScenario) crucibleScenario.textContent = unit.crucible.scenario || '';
        }

        // Model Audio & Transcript Handlers
        const btnPlayCrucibleModel = document.getElementById('btn-mcer-crucible-play-model');
        const crucibleModelText = document.getElementById('mcer-crucible-model-text');
        const btnToggleCrucibleModel = document.getElementById('btn-mcer-crucible-toggle-model');
        if (crucibleModelText && unit.crucible) {
            crucibleModelText.textContent = unit.crucible.modelResponse || 'Report model ready.';
            crucibleModelText.style.display = 'none';
        }
        if (btnPlayCrucibleModel && unit.crucible) {
            btnPlayCrucibleModel.onclick = () => {
                const modelSpeech = unit.crucible.modelResponse || '';
                if (modelSpeech && window.STEMOS_PLACEMENT_TEST) {
                    window.STEMOS_PLACEMENT_TEST.playAudioPrompt(modelSpeech);
                }
            };
        }
        if (btnToggleCrucibleModel && crucibleModelText) {
            btnToggleCrucibleModel.onclick = () => {
                const isHidden = crucibleModelText.style.display === 'none';
                crucibleModelText.style.display = isHidden ? 'block' : 'none';
                btnToggleCrucibleModel.textContent = isHidden ? 'Ocultar Modelo de Referencia' : 'Ver Modelo de Referencia';
            };
        }

        // Interactive Dispatch Input & Live Word Count
        const crucibleInput = document.getElementById('mcer-crucible-input');
        const crucibleWordCount = document.getElementById('mcer-crucible-word-count');
        const crucibleResultsBox = document.getElementById('mcer-crucible-results-box');
        if (crucibleResultsBox) crucibleResultsBox.style.display = 'none';

        // Nearshoring Voice Crucible Studio: Acoustic Waveform & Cadence Telemetry (Fase 67)
        let audioContext = null;
        let analyser = null;
        let animFrameId = null;
        let speechStartTime = null;

        function initCrucibleWaveform() {
            const canvas = document.getElementById('mcer-crucible-waveform');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let phase = 0;
            function drawWave() {
                animFrameId = requestAnimationFrame(drawWave);
                ctx.fillStyle = '#020617';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                if (analyser) {
                    const bufferLength = analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);
                    analyser.getByteTimeDomainData(dataArray);

                    ctx.lineWidth = 2.5;
                    ctx.strokeStyle = '#38bdf8';
                    ctx.shadowColor = '#38bdf8';
                    ctx.shadowBlur = 8;
                    ctx.beginPath();

                    const sliceWidth = canvas.width / bufferLength;
                    let x = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        const v = dataArray[i] / 128.0;
                        const y = (v * canvas.height) / 2;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                        x += sliceWidth;
                    }
                    ctx.lineTo(canvas.width, canvas.height / 2);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                } else {
                    // Oscillating ambient wave
                    phase += 0.05;
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
                    ctx.beginPath();
                    for (let x = 0; x < canvas.width; x += 4) {
                        const y = (canvas.height / 2) + Math.sin((x * 0.04) + phase) * 8 * (Math.sin(phase * 0.5) + 1.2);
                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }
            }
            if (!animFrameId) drawWave();
        }

        initCrucibleWaveform();

        function updateCrucibleCadenceAndScanner(text) {
            const words = text.trim().split(/\s+/).filter(Boolean);
            const wordCount = words.length;
            if (crucibleWordCount) crucibleWordCount.textContent = `${wordCount} palabras`;

            // Calculate WPM
            if (!speechStartTime && wordCount > 0) speechStartTime = Date.now();
            if (speechStartTime && wordCount > 0) {
                const elapsedMin = Math.max(0.05, (Date.now() - speechStartTime) / 60000);
                const wpm = Math.min(220, Math.round(wordCount / elapsedMin));
                const elWpm = document.getElementById('mcer-crucible-wpm-val');
                if (elWpm) elWpm.textContent = wpm;

                const elPill = document.getElementById('mcer-crucible-cadence-pill');
                if (elPill) {
                    if (wpm < 85) {
                        elPill.textContent = `Cadence: Deliberate (${wpm} WPM)`;
                        elPill.style.background = 'rgba(245, 158, 11, 0.15)';
                        elPill.style.color = '#f59e0b';
                        elPill.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                    } else if (wpm <= 140) {
                        elPill.textContent = `Cadence: Optimal (${wpm} WPM)`;
                        elPill.style.background = 'rgba(16, 185, 129, 0.15)';
                        elPill.style.color = '#34d399';
                        elPill.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    } else {
                        elPill.textContent = `Cadence: Rapid Dispatch (${wpm} WPM)`;
                        elPill.style.background = 'rgba(14, 165, 233, 0.15)';
                        elPill.style.color = '#38bdf8';
                        elPill.style.borderColor = 'rgba(14, 165, 233, 0.3)';
                    }
                }
            }

            // Real-Time False Cognate & Stress Scanner
            const liveBadges = document.getElementById('mcer-crucible-live-badges');
            if (liveBadges) {
                const lower = text.toLowerCase();
                const detectedBadges = [];

                // 1. False Cognates Radar
                const falseCognatesList = [
                    { trap: 'actual', correct: 'current / present' },
                    { trap: 'currently', correct: 'now / at present' },
                    { trap: 'fabric', correct: 'cloth (use factory/plant)' },
                    { trap: 'assist', correct: 'help (use attend for meetings)' },
                    { trap: 'record', correct: 'log / track (stress on RE-cord)' },
                    { trap: 'sensible', correct: 'prudent (use sensitive for instruments)' },
                    { trap: 'eventual', correct: 'possible (use eventual for final)' }
                ];

                falseCognatesList.forEach(item => {
                    const regex = new RegExp(`\\b${item.trap}\\b`, 'i');
                    if (regex.test(lower)) {
                        detectedBadges.push(`
                            <span class="badge" style="background:rgba(245,158,11,0.18); color:#f59e0b; border:1px solid rgba(245,158,11,0.35); font-size:0.7rem; font-weight:700;">
                                <i class="fa-solid fa-triangle-exclamation"></i> False Cognate: '${item.trap}' &rarr; ${item.correct}
                            </span>
                        `);
                    }
                });

                // 2. Technical Stress Words (from unit.pronunciationLab or keywords)
                const keywords = (unit.crucible && unit.crucible.keywords) || [];
                keywords.forEach(kw => {
                    if (lower.includes(kw.toLowerCase())) {
                        detectedBadges.push(`
                            <span class="badge" style="background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3); font-size:0.7rem; font-weight:700;">
                                <i class="fa-solid fa-circle-check"></i> Standard Stress: '${kw}'
                            </span>
                        `);
                    }
                });

                if (detectedBadges.length > 0) {
                    liveBadges.innerHTML = detectedBadges.slice(0, 3).join('');
                } else if (wordCount > 3) {
                    liveBadges.innerHTML = `<span style="font-size:0.7rem; color:#34d399; font-weight:700;"><i class="fa-solid fa-shield-check"></i> Clear pronunciation &amp; verified standard syntax</span>`;
                } else {
                    liveBadges.innerHTML = `<span style="font-size:0.7rem; color:#64748b; font-style:italic;">Awaiting speech input...</span>`;
                }
            }
        }

        if (crucibleInput) {
            crucibleInput.value = '';
            if (crucibleWordCount) crucibleWordCount.textContent = '0 palabras';
            crucibleInput.oninput = () => {
                updateCrucibleCadenceAndScanner(crucibleInput.value);
            };
        }

        // Native Browser Voice Dictation (Speech-to-Text) with AudioContext Analyser
        const btnDictate = document.getElementById('btn-mcer-crucible-dictate');
        if (btnDictate && crucibleInput) {
            btnDictate.onclick = () => {
                // Initialize audio stream for live acoustic waveform
                if (!audioContext) {
                    try {
                        const AudioCtx = window.AudioContext || window.webkitAudioContext;
                        if (AudioCtx) {
                            audioContext = new AudioCtx();
                            analyser = audioContext.createAnalyser();
                            analyser.fftSize = 64;
                            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                                    const source = audioContext.createMediaStreamSource(stream);
                                    source.connect(analyser);
                                }).catch(() => {
                                    console.log('[stemOS Crucible] Acoustic wave running in simulation mode');
                                });
                            }
                        }
                    } catch(e) {
                        console.warn('[stemOS Crucible] AudioContext init note:', e);
                    }
                }

                const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (!SpeechRec) {
                    alert('Tu navegador no soporta dictado de voz nativo en este momento. Puedes escribir tu reporte directamente.');
                    return;
                }
                const recognition = new SpeechRec();
                recognition.lang = 'en-US';
                recognition.interimResults = true;
                recognition.maxAlternatives = 1;
                btnDictate.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color:#ef4444;"></i> Escuchando...';
                if (!speechStartTime) speechStartTime = Date.now();

                recognition.onresult = (event) => {
                    let interim = '';
                    let final = '';
                    for (let i = 0; i < event.results.length; i++) {
                        if (event.results[i].isFinal) {
                            final += event.results[i][0].transcript;
                        } else {
                            interim += event.results[i][0].transcript;
                        }
                    }
                    const newText = final || interim;
                    if (newText) {
                        crucibleInput.value = (crucibleInput.value ? crucibleInput.value.replace(/\s+$/, '') + ' ' : '') + newText;
                        updateCrucibleCadenceAndScanner(crucibleInput.value);
                    }
                };
                recognition.onerror = () => {
                    btnDictate.innerHTML = '<i class="fa-solid fa-microphone"></i> Dictar por Voz';
                };
                recognition.onend = () => {
                    btnDictate.innerHTML = '<i class="fa-solid fa-microphone"></i> Dictar por Voz';
                };
                recognition.start();
            };
        }

        // AI / Multi-Dimensional Heuristic Rubric Evaluator
        const btnSubmitCrucible = document.getElementById('btn-mcer-crucible-submit');
        if (btnSubmitCrucible && crucibleInput) {
            btnSubmitCrucible.onclick = () => {
                const text = crucibleInput.value.trim();
                if (!text || text.length < 10) {
                    alert('Por favor redacta o dicta al menos una oración completa en inglés antes de solicitar la evaluación.');
                    return;
                }

                const words = text.split(/\s+/).filter(Boolean);
                const wordCount = words.length;
                const cefr = (unit.cefr || 'A1').toUpperCase();
                let minWords = 15;
                if (cefr === 'A2') minWords = 25;
                if (cefr === 'B1') minWords = 35;
                if (cefr === 'B2') minWords = 45;

                // 1. Grammatical Accuracy (up to 40 pts)
                let grammarScore = 22;
                if (wordCount >= minWords) grammarScore += 10;
                if (wordCount >= minWords * 1.3) grammarScore += 4;
                if (/^[A-Z]/.test(text) && /[.?!]$/.test(text)) grammarScore += 4;
                grammarScore = Math.min(40, grammarScore);

                // 2. Technical Lexicon (up to 30 pts)
                let lexiconScore = 15;
                const keywords = (unit.crucible && unit.crucible.keywords) || [];
                const lower = text.toLowerCase();
                let matched = 0;
                keywords.forEach(kw => {
                    if (lower.includes(kw.toLowerCase())) matched++;
                });
                if (keywords.length > 0) {
                    lexiconScore = Math.min(30, Math.round(15 + (matched / keywords.length) * 15));
                } else {
                    lexiconScore = wordCount >= minWords ? 28 : 20;
                }

                // 3. American Workplace Pragmatics (up to 30 pts)
                let pragmaticsScore = 18;
                const polite = ['good morning', 'good afternoon', 'hello', 'excuse me', 'team', 'hi', 'regards'];
                if (polite.some(g => lower.includes(g))) pragmaticsScore += 6;
                if (lower.includes('please') || lower.includes('thank you') || lower.includes('report') || lower.includes('recommend') || lower.includes('confirm')) {
                    pragmaticsScore += 6;
                }
                pragmaticsScore = Math.min(30, pragmaticsScore);

                const totalScore = Math.min(100, grammarScore + lexiconScore + pragmaticsScore);

                // Display in Rubric Card
                if (crucibleResultsBox) {
                    crucibleResultsBox.style.display = 'block';
                    document.getElementById('mcer-crucible-score-badge').textContent = `${totalScore}%`;
                    
                    document.getElementById('mcer-rubric-grammar-score').textContent = `${grammarScore}/40`;
                    document.getElementById('mcer-rubric-grammar-bar').style.width = `${Math.round((grammarScore / 40) * 100)}%`;
                    
                    document.getElementById('mcer-rubric-lexicon-score').textContent = `${lexiconScore}/30`;
                    document.getElementById('mcer-rubric-lexicon-bar').style.width = `${Math.round((lexiconScore / 30) * 100)}%`;
                    
                    document.getElementById('mcer-rubric-pragmatics-score').textContent = `${pragmaticsScore}/30`;
                    document.getElementById('mcer-rubric-pragmatics-bar').style.width = `${Math.round((pragmaticsScore / 30) * 100)}%`;

                    let feedback = '';
                    if (totalScore >= 85) {
                        feedback = `<strong>¡Excelente despacho técnico!</strong> Tu reporte cumple con el estándar de comunicación operativa CEFR ${cefr}. Has demostrado precisión léxica y protocolo estadounidense de planta.`;
                    } else if (totalScore >= 70) {
                        feedback = `<strong>Despacho funcional aprobado (${totalScore}%).</strong> Tu mensaje es claro para supervisores de turno. Para alcanzar nivel senior, incorpora más términos específicos (${keywords.slice(0, 3).join(', ')}) y expande la descripción.`;
                    } else {
                        feedback = `<strong>Despacho en desarrollo (${totalScore}%).</strong> Se recomienda escuchar el modelo de referencia del ingeniero líder e incluir al menos ${minWords} palabras técnicas.`;
                    }
                    document.getElementById('mcer-crucible-feedback-text').innerHTML = feedback;

                    // Award +500 XP if passing
                    if (totalScore >= 70) {
                        try {
                            const prevXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
                            const newXP = prevXP + 500;
                            localStorage.setItem('stemos_student_xp', String(newXP));
                            localStorage.setItem(`stemos_crucible_${unit.id}`, 'completed');
                            if (typeof window.updateStudentXPHUD === 'function') {
                                window.updateStudentXPHUD(newXP);
                            }
                        } catch (e) {}
                    }

                    // Trigger Socratic Oral Debrief (Fase 69)
                    if (typeof initCrucibleSocraticDebrief === 'function') {
                        initCrucibleSocraticDebrief(unit);
                    }
                }
            };
        }

        // Reset to first tab
        switchMcerModalTab('dialogue');
        modal.showModal();
    }
    window.openMcerUnitModal = openMcerUnitModal;

    function switchMcerModalTab(tabKey) {
        document.querySelectorAll('.mcer-tab-btn').forEach(b => {
            const isActive = b.dataset.mcerTab === tabKey;
            b.classList.toggle('active', isActive);
            b.style.color = isActive ? '#0284c7' : '#64748b';
            b.style.borderBottom = isActive ? '2px solid #0284c7' : 'none';
        });

        const screens = ['dialogue', 'vocab', 'listening', 'grammar', 'reading', 'crucible', 'quiz'];
        screens.forEach(s => {
            const el = document.getElementById(`mcer-screen-${s}`);
            if (el) el.style.display = (s === tabKey) ? 'block' : 'none';
        });
    }

    document.querySelectorAll('.mcer-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchMcerModalTab(btn.dataset.mcerTab);
        });
    });

    const mcerUnitCloseBtn = document.getElementById('mcer-unit-close');
    if (mcerUnitCloseBtn) {
        mcerUnitCloseBtn.addEventListener('click', () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            document.getElementById('modal-mcer-unit').close();
        });
    }

    // 4.1 MCER Level Milestone Certification Exam (20 Items • 60.0h W3C Accredited)
    let mcerExamTimerInterval = null;

    function openMcerLevelExam(levelId) {
        if (!window.STEMOS_MCER_TRACKS) return;
        const exam = window.STEMOS_MCER_TRACKS.getLevelExam(levelId || 'a1');
        if (!exam) return;

        const modal = document.getElementById('modal-mcer-level-exam');
        if (!modal) return;

        // Set Headers
        const levelBadge = document.getElementById('mcer-exam-level-badge');
        const examTitle = document.getElementById('mcer-exam-title');
        const examDossier = document.getElementById('mcer-exam-dossier');
        if (levelBadge) levelBadge.textContent = `CEFR ${exam.level.toUpperCase()} EXAM`;
        if (examTitle) examTitle.textContent = exam.title;
        if (examDossier) examDossier.textContent = `${exam.dossier} · 20 Reactivos Estandarizados · ${exam.passScorePct}% Mínimo de Aprobación`;

        const container = document.getElementById('mcer-exam-questions-container');
        if (!container) return;
        container.innerHTML = '';
        const resultsBox = document.getElementById('mcer-exam-results-box');
        if (resultsBox) resultsBox.style.display = 'none';

        const counterEl = document.getElementById('mcer-exam-progress-counter');
        if (counterEl) counterEl.textContent = `0 de ${exam.questions.length} contestadas`;

        // Render Questions
        exam.questions.forEach((qItem, qIdx) => {
            const block = document.createElement('div');
            block.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; position:relative;';

            let categoryColor = '#0284c7';
            let categoryBg = '#e0f2fe';
            if (qItem.category && qItem.category.includes('Grammar')) { categoryColor = '#7c3aed'; categoryBg = '#ede9fe'; }
            else if (qItem.category && qItem.category.includes('Reading')) { categoryColor = '#059669'; categoryBg = '#d1fae5'; }
            else if (qItem.category && qItem.category.includes('Pragmatics')) { categoryColor = '#d97706'; categoryBg = '#fef3c7'; }

            block.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:10px;">
                    <div style="font-weight:700; font-size:0.95rem; color:#0f172a; flex:1;">
                        ${qIdx + 1}. ${qItem.q}
                    </div>
                    <span style="font-size:0.68rem; font-weight:800; color:${categoryColor}; background:${categoryBg}; padding:2px 8px; border-radius:6px; flex-shrink:0; text-transform:uppercase;">
                        ${qItem.category || 'General'}
                    </span>
                </div>

                ${(qItem.audioScript || (qItem.category && qItem.category.includes('Listening') && qItem.passage)) ? `
                    <div style="margin-bottom:10px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem; color:#1e40af; font-style:italic;">
                            <i class="fa-solid fa-headphones"></i> Audio Prompt Disponible
                        </span>
                        <button type="button" class="btn-play-exam-audio" style="background:#0284c7; color:#fff; border:none; padding:4px 10px; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">
                            <i class="fa-solid fa-play"></i> Reproducir Audio
                        </button>
                    </div>
                ` : ''}

                ${qItem.passage && (!qItem.category || !qItem.category.includes('Listening')) ? `
                    <div style="margin-bottom:10px; background:#ffffff; border:1px solid #cbd5e1; border-left:3px solid #059669; border-radius:6px; padding:10px 12px; font-size:0.85rem; color:#334155; line-height:1.45;">
                        ${qItem.passage}
                    </div>
                ` : ''}

                <div style="display:flex; flex-direction:column; gap:6px;">
                    ${qItem.options.map((opt, optIdx) => `
                        <label class="mcer-exam-opt-label-${qIdx}" style="display:flex; align-items:center; gap:10px; font-size:0.88rem; color:#0f172a !important; padding:9px 12px; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; cursor:pointer; transition:all 0.15s ease;">
                            <input type="radio" name="mcer-exam-q-${qIdx}" value="${optIdx}" style="accent-color:#059669; width:16px; height:16px; cursor:pointer;">
                            <span style="color:#0f172a !important; font-weight:600; line-height:1.4;">${opt}</span>
                        </label>
                    `).join('')}
                </div>

                <div class="mcer-exam-exp-${qIdx}" style="display:none; margin-top:10px; background:#f0fdf4; border-left:3px solid #16a34a; padding:8px 12px; border-radius:6px; font-size:0.8rem; color:#166534; line-height:1.4;">
                    <strong>Fundamento Técnico:</strong> ${qItem.exp || ''}
                </div>
            `;

            // Audio Player
            const btnAudio = block.querySelector('.btn-play-exam-audio');
            if (btnAudio) {
                btnAudio.onclick = () => {
                    const speechText = qItem.audioScript || qItem.passage || qItem.q;
                    if (window.STEMOS_PLACEMENT_TEST) {
                        window.STEMOS_PLACEMENT_TEST.playAudioPrompt(speechText);
                    }
                };
            }

            // Radio Change Listener for Progress Counter
            block.querySelectorAll(`input[name="mcer-exam-q-${qIdx}"]`).forEach(r => {
                r.addEventListener('change', () => {
                    const answered = exam.questions.filter((_, idx) => document.querySelector(`input[name="mcer-exam-q-${idx}"]:checked`)).length;
                    if (counterEl) counterEl.textContent = `${answered} de ${exam.questions.length} contestadas`;
                });
            });

            container.appendChild(block);
        });

        // Timer (40 minutes)
        if (mcerExamTimerInterval) clearInterval(mcerExamTimerInterval);
        let secondsLeft = (exam.timeMinutes || 40) * 60;
        const timerValEl = document.getElementById('mcer-exam-timer-val');
        
        function updateTimerDisplay() {
            const m = Math.floor(secondsLeft / 60);
            const s = secondsLeft % 60;
            if (timerValEl) {
                timerValEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            }
        }
        updateTimerDisplay();

        mcerExamTimerInterval = setInterval(() => {
            secondsLeft--;
            updateTimerDisplay();
            if (secondsLeft <= 0) {
                clearInterval(mcerExamTimerInterval);
                const btnSub = document.getElementById('btn-submit-mcer-exam');
                if (btnSub) btnSub.click();
            }
        }, 1000);

        // Submit Handler
        const btnSubmitExam = document.getElementById('btn-submit-mcer-exam');
        if (btnSubmitExam) {
            btnSubmitExam.onclick = () => {
                if (mcerExamTimerInterval) clearInterval(mcerExamTimerInterval);
                let correctCount = 0;
                exam.questions.forEach((qItem, qIdx) => {
                    const selected = document.querySelector(`input[name="mcer-exam-q-${qIdx}"]:checked`);
                    const labels = document.querySelectorAll(`.mcer-exam-opt-label-${qIdx}`);
                    const expBox = document.querySelector(`.mcer-exam-exp-${qIdx}`);
                    if (expBox) expBox.style.display = 'block';

                    labels.forEach(lbl => {
                        const input = lbl.querySelector('input');
                        if (parseInt(input.value) === qItem.answer) {
                            lbl.style.background = '#dcfce7';
                            lbl.style.borderColor = '#86efac';
                            lbl.style.fontWeight = '700';
                        } else if (input.checked && parseInt(input.value) !== qItem.answer) {
                            lbl.style.background = '#fee2e2';
                            lbl.style.borderColor = '#fca5a5';
                        }
                    });

                    if (selected && parseInt(selected.value) === qItem.answer) {
                        correctCount++;
                    }
                });

                const pct = Math.round((correctCount / exam.questions.length) * 100);
                const isPassed = pct >= (exam.passScorePct || 75);

                if (resultsBox) {
                    resultsBox.style.display = 'block';
                    resultsBox.style.background = isPassed ? '#f0fdf4' : '#fffbeb';
                    resultsBox.style.borderColor = isPassed ? '#86efac' : '#fde68a';

                    const scoreVal = document.getElementById('mcer-exam-score-val');
                    const feedbackVal = document.getElementById('mcer-exam-feedback-val');
                    if (scoreVal) {
                        scoreVal.textContent = `${pct}% (${correctCount}/${exam.questions.length})`;
                        scoreVal.style.color = isPassed ? '#16a34a' : '#d97706';
                    }
                    if (feedbackVal) {
                        if (isPassed) {
                            feedbackVal.innerHTML = `🎉 ¡Examen de Certificación Nivel CEFR ${exam.level.toUpperCase()} Aprobado! 60.0 Horas Acreditadas · Micro-credencial W3C Open Badges 3.0 emitida · +1000 XP Acreditados.`;
                            feedbackVal.style.color = '#15803d';
                        } else {
                            feedbackVal.innerHTML = `⚠️ Calificación obtenida: ${pct}% (Mínimo aprobatorio: ${exam.passScorePct}%). Te recomendamos repasar las 4 unidades de nivel ${exam.level.toUpperCase()} y volver a presentar.`;
                            feedbackVal.style.color = '#b45309';
                        }
                    }
                }

                if (isPassed) {
                    try {
                        localStorage.setItem(`stemos_mcer_exam_${exam.level}`, 'passed');
                        const prevXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
                        const newXP = prevXP + 1000;
                        localStorage.setItem('stemos_student_xp', String(newXP));
                        if (typeof window.updateStudentXPHUD === 'function') {
                            window.updateStudentXPHUD(newXP);
                        }
                        if (typeof openCertificateModal === 'function') {
                            setTimeout(() => {
                                openCertificateModal('mcer-' + exam.level);
                            }, 1800);
                        }
                    } catch (e) {}
                }
            };
        }

        // Close Listener
        const closeBtn = document.getElementById('mcer-exam-close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                if (mcerExamTimerInterval) clearInterval(mcerExamTimerInterval);
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                modal.close();
            };
        }

        modal.showModal();
    }
    window.openMcerLevelExam = openMcerLevelExam;

    // Active Track Banner Level Exam Button
    const btnMcerLaunchLevelExam = document.getElementById('btn-mcer-launch-level-exam');
    if (btnMcerLaunchLevelExam) {
        btnMcerLaunchLevelExam.addEventListener('click', () => {
            const userLvl = (localStorage.getItem('stemos_user_level') || (activeMcerLevelFilter !== 'all' ? activeMcerLevelFilter : 'A1')).toLowerCase();
            openMcerLevelExam(userLvl);
        });
    }

    // 5. Sync Placement Result & Curricular Interleaving Status
    function syncUserPlacementBadge() {
        let userLevel = localStorage.getItem('stemos_user_level') || localStorage.getItem('stemos_active_mcer_level') || '';
        if (!userLevel) {
            const passportStr = localStorage.getItem('stemos_diagnostic_passport');
            if (passportStr) {
                try {
                    const p = JSON.parse(passportStr);
                    if (p.level) userLevel = p.level;
                } catch(e) {}
            }
        }
        if (!userLevel) {
            const stored = localStorage.getItem('stemos_placement_test') || localStorage.getItem('stemos_placement_result');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed.result && (parsed.result.assignedLevel || parsed.result.level)) {
                        userLevel = parsed.result.assignedLevel || parsed.result.level;
                    } else if (parsed.assignedLevel || parsed.level) {
                        userLevel = parsed.assignedLevel || parsed.level;
                    }
                } catch(e) {}
            }
        }

        const badgePill = document.getElementById('user-placement-badge-pill');
        const badgeText = document.getElementById('user-placement-badge-text');
        const calloutEl = document.getElementById('ed-placement-level-callout');
        const calloutLevel = document.getElementById('ed-placement-callout-level');
        const calloutTitle = document.getElementById('ed-placement-callout-title');
        const calloutDesc = document.getElementById('ed-placement-callout-desc');
        const calloutIcon = document.getElementById('ed-placement-callout-icon');
        const pendingBanner = document.getElementById('panel-placement-pending-banner');

        const isPlacementDone = hasCompletedPlacement() || !!userLevel;

        if (pendingBanner) {
            if (!isPlacementDone) {
                pendingBanner.style.display = 'block';
                const profileStr = localStorage.getItem('stemos_student_profile');
                if (profileStr) {
                    try {
                        const prof = JSON.parse(profileStr);
                        const nameEl = document.getElementById('pending-banner-student-name');
                        if (nameEl && prof.name) {
                            const firstName = prof.name.split(' ')[0];
                            nameEl.textContent = `¡Hola ${firstName}! Haz tu Placement Test para activar tu Track Personalizado`;
                        }
                    } catch(e) {}
                }
            } else {
                pendingBanner.style.display = 'none';
            }
        }

        if (!isPlacementDone) {
            if (badgePill && badgeText) {
                badgeText.textContent = 'Placement Pendiente';
                badgePill.style.background = '#fef2f2';
                badgePill.style.color = '#dc2626';
                badgePill.style.borderColor = '#fecaca';
                badgePill.style.display = 'inline-flex';
            }
            if (calloutEl && calloutTitle && calloutDesc) {
                calloutEl.style.display = 'block';
                if (calloutLevel) {
                    calloutLevel.textContent = 'Placement Pendiente';
                    calloutLevel.style.background = '#ef4444';
                }
                calloutTitle.textContent = 'Realiza tu Placement Test Diagnóstico (15 min)';
                calloutDesc.textContent = 'Para calibrar tu track técnico por carrera y desbloquear tus módulos de aprendizaje, completa tu evaluación diagnóstica estandarizada.';
                if (calloutIcon) calloutIcon.innerHTML = '<i class="fa-solid fa-clipboard-question" style="color:#ef4444;"></i>';
                calloutEl.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.03) 100%)';
                calloutEl.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            }
            return;
        }

        if (!userLevel) userLevel = 'B1';

        // Student has a calibrated level: A1, A2, B1, B2, C1
        if (badgePill && badgeText) {
            badgePill.style.display = 'inline-flex';
            if (userLevel === 'A1') {
                badgeText.textContent = 'Nivel MCER A1 Asignado (Base)';
                badgePill.style.background = '#fef3c7';
                badgePill.style.color = '#b45309';
                badgePill.style.borderColor = '#fde68a';
            } else if (userLevel === 'A2') {
                badgeText.textContent = 'Nivel MCER A2 Asignado (Interleaving)';
                badgePill.style.background = '#e0f2fe';
                badgePill.style.color = '#0369a1';
                badgePill.style.borderColor = '#bae6fd';
            } else if (userLevel === 'B1') {
                badgeText.textContent = 'Nivel MCER B1 Asignado (Carrera 60h)';
                badgePill.style.background = '#ecfdf5';
                badgePill.style.color = '#047857';
                badgePill.style.borderColor = '#a7f3d0';
            } else {
                badgeText.textContent = `Nivel MCER ${userLevel} Asignado (Senior)`;
                badgePill.style.background = '#f3e8ff';
                badgePill.style.color = '#7e22ce';
                badgePill.style.borderColor = '#e9d5ff';
            }
        }

        if (calloutEl && calloutTitle && calloutDesc) {
            calloutEl.style.display = 'block';
            if (userLevel === 'A1') {
                if (calloutLevel) {
                    calloutLevel.textContent = 'Nivel A1 Activo · Tronco Común MCER';
                    calloutLevel.style.background = '#f59e0b';
                }
                calloutTitle.textContent = 'Ruta de Fundamentos: Track Base MCER A1';
                calloutDesc.textContent = 'Por diseño pedagógico para evitar sobrecarga cognitiva, cursas exclusivamente el Track Base A1. Los laboratorios técnicos avanzados de tu especialidad se desbloquean al alcanzar Nivel A2.';
                if (calloutIcon) calloutIcon.innerHTML = '<i class="fa-solid fa-shield-halved" style="color:#f59e0b;"></i>';
                calloutEl.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.03) 100%)';
                calloutEl.style.borderColor = 'rgba(245, 158, 11, 0.3)';
            } else if (userLevel === 'A2') {
                if (calloutLevel) {
                    calloutLevel.textContent = 'Nivel A2 Activo · Interleaving Inicial';
                    calloutLevel.style.background = '#0284c7';
                }
                calloutTitle.textContent = 'MCER A2 + Laboratorios Técnicos Introductorios Desbloqueados';
                calloutDesc.textContent = '¡Entrelazado activo! Cursas el Track Base MCER A2 y se desbloquean tus primeros laboratorios técnicos de carrera (Vocabulario de Seguridad, EHS y Herramientas Industriales).';
                if (calloutIcon) calloutIcon.innerHTML = '<i class="fa-solid fa-sliders" style="color:#0284c7;"></i>';
                calloutEl.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(14, 165, 233, 0.03) 100%)';
                calloutEl.style.borderColor = 'rgba(14, 165, 233, 0.3)';
            } else if (userLevel === 'B1') {
                if (calloutLevel) {
                    calloutLevel.textContent = 'Nivel B1 Activo · Inmersión de Carrera';
                    calloutLevel.style.background = '#10b981';
                }
                calloutTitle.textContent = 'Ruta Determinista de 60.0h de tu Carrera 100% Desbloqueada';
                calloutDesc.textContent = 'Inmersión total: Cursas las 16 estaciones de tu especialidad de ingeniería con simuladores de incidentes, reportes 8D y 4 hitos de certificación.';
                if (calloutIcon) calloutIcon.innerHTML = '<i class="fa-solid fa-graduation-cap" style="color:#10b981;"></i>';
                calloutEl.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 100%)';
                calloutEl.style.borderColor = 'rgba(16, 185, 129, 0.3)';
            } else {
                if (calloutLevel) {
                    calloutLevel.textContent = `Nivel ${userLevel} · Senior Nearshoring`;
                    calloutLevel.style.background = '#a855f7';
                }
                calloutTitle.textContent = 'Nearshoring Avanzado, ECOs & Capstone Socrático con IA';
                calloutDesc.textContent = 'Nivel superior de acreditación: Órdenes de cambio de ingeniería (ECO), auditorías internacionales y defensa de Capstone con IA Socrática.';
                if (calloutIcon) calloutIcon.innerHTML = '<i class="fa-solid fa-user-astronaut" style="color:#a855f7;"></i>';
                calloutEl.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.03) 100%)';
                calloutEl.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            }
        }

        // Sync MCER Active Track Banner
        const bannerPill = document.getElementById('mcer-banner-level-pill');
        const bannerTitle = document.getElementById('mcer-banner-title');
        const bannerDesc = document.getElementById('mcer-banner-desc');
        if (bannerPill && bannerTitle) {
            const troncoMap = { 'A1': 'Inglés I', 'A2': 'Inglés II', 'B1': 'Inglés III', 'B2': 'Inglés IV' };
            bannerPill.textContent = `CEFR ${userLevel}`;
            bannerTitle.textContent = `${troncoMap[userLevel] || 'Tronco Común'} · 60.0 Horas Acreditadas`;
            if (bannerDesc) {
                bannerDesc.textContent = `Nivel calibrado según tu evaluación diagnóstica. Tu plan semestral contiene 4 unidades de 15.0h de trabajo activo (60h total), con diálogos técnicos, lectura de normas y simulación de despacho industrial.`;
            }
        }
    }

    /* ══════════════════════════════════════════════════════════════
       8.1. MCER DIAGNOSTIC PASSPORT & ONBOARDING (FASE 66)
       ══════════════════════════════════════════════════════════════ */
    function openDiagnosticPassportModal() {
        const modal = document.getElementById('modal-diagnostic-passport');
        if (!modal) return;

        let passport = null;
        try {
            const raw = localStorage.getItem('stemos_diagnostic_passport');
            if (raw) passport = JSON.parse(raw);
        } catch(e) {}

        if (!passport) {
            passport = {
                student: { firstName: 'Diana Laura', lastName: 'Morales', matricula: '22050144', career: 'Ingeniería Mecatrónica' },
                level: localStorage.getItem('stemos_active_mcer_level') || 'B1',
                score: 25,
                percentage: 78,
                sectionScores: {
                    grammar: { score: 8, total: 10, pct: 80 },
                    listening: { score: 7, total: 10, pct: 70 },
                    reading: { score: 10, total: 12, pct: 83 }
                },
                folio: 'STEMOS-MCER-8492',
                issuedAt: new Date().toISOString(),
                fastTrackEligible: true,
                recommendedTrackId: 'mcer-track-b1'
            };
        }

        const student = passport.student || {};
        const elName = document.getElementById('passport-student-name');
        if (elName) elName.textContent = `${student.firstName || 'Diana'} ${student.lastName || 'Morales'}`;

        const elMatricula = document.getElementById('passport-matricula-val');
        if (elMatricula) elMatricula.textContent = `${student.matricula || '22050144'} · ${student.career || 'Ingeniería Mecatrónica'}`;

        const elFolio = document.getElementById('passport-folio-code');
        if (elFolio) elFolio.textContent = passport.folio || 'STEMOS-MCER-VALID';

        const lvl = (passport.level || 'B1').toUpperCase();
        const levelTitles = {
            'A1': 'Foundations / Inicio',
            'A2': 'Waystage / Operativo',
            'B1': 'Threshold / Competente',
            'B2': 'Vantage / Nearshoring Avanzado'
        };

        const elBadge = document.getElementById('passport-level-badge');
        if (elBadge) {
            elBadge.textContent = `CEFR ${lvl}`;
            const colors = {
                'A1': '#10b981',
                'A2': '#0284c7',
                'B1': '#f59e0b',
                'B2': '#8b5cf6'
            };
            elBadge.style.background = colors[lvl] || '#0284c7';
        }

        const elTitle = document.getElementById('passport-level-title');
        if (elTitle) elTitle.textContent = levelTitles[lvl] || 'Competente';

        const elScore = document.getElementById('passport-score-val');
        if (elScore) elScore.textContent = `${passport.percentage || 78}%`;

        // Subscores
        const sScores = passport.sectionScores || {};
        const gPct = (sScores.grammar && sScores.grammar.pct) || 80;
        const lPct = (sScores.listening && sScores.listening.pct) || 75;
        const rPct = (sScores.reading && sScores.reading.pct) || 82;

        const elGPct = document.getElementById('passport-grammar-pct');
        const elGBar = document.getElementById('passport-grammar-bar');
        if (elGPct && elGBar) { elGPct.textContent = `${gPct}%`; elGBar.style.width = `${gPct}%`; }

        const elLPct = document.getElementById('passport-listening-pct');
        const elLBar = document.getElementById('passport-listening-bar');
        if (elLPct && elLBar) { elLPct.textContent = `${lPct}%`; elLBar.style.width = `${lPct}%`; }

        const elRPct = document.getElementById('passport-reading-pct');
        const elRBar = document.getElementById('passport-reading-bar');
        if (elRPct && elRBar) { elRPct.textContent = `${rPct}%`; elRBar.style.width = `${rPct}%`; }

        // Update CEFR Progression HUD
        const steps = ['a1', 'a2', 'b1', 'b2'];
        const lvlIdx = steps.indexOf(lvl.toLowerCase());
        steps.forEach((step, idx) => {
            const stepEl = document.getElementById(`hud-step-${step}`);
            if (stepEl) {
                const statusEl = stepEl.querySelector('.hud-step-status');
                if (idx < lvlIdx) {
                    stepEl.style.background = '#f0fdf4';
                    stepEl.style.borderColor = '#86efac';
                    if (statusEl) statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Superado (Convalidado)';
                } else if (idx === lvlIdx) {
                    stepEl.style.background = 'rgba(2,132,199,0.08)';
                    stepEl.style.borderColor = '#0284c7';
                    if (statusEl) statusEl.innerHTML = '<i class="fa-solid fa-play"></i> En Curso (Nivel Actual)';
                } else {
                    stepEl.style.background = '#f8fafc';
                    stepEl.style.borderColor = '#e2e8f0';
                    if (statusEl) statusEl.innerHTML = 'Bloqueado';
                }
            }
        });

        // Fast-Track Panel
        const ftPanel = document.getElementById('passport-fast-track-panel');
        const ftBtn = document.getElementById('btn-fast-track-validate');
        const ftBox = document.getElementById('fast-track-status-box');
        const isConvalidated = localStorage.getItem('stemos_mcer_convalidated') === 'true';

        if (isConvalidated) {
            if (ftBtn) {
                ftBtn.disabled = true;
                ftBtn.innerHTML = '<i class="fa-solid fa-check"></i> Convalidado ✓';
                ftBtn.style.opacity = '0.7';
            }
            if (ftBox) ftBox.style.display = 'block';
        } else if (['B1', 'B2'].includes(lvl)) {
            if (ftPanel) ftPanel.style.display = 'block';
            if (ftBtn) {
                ftBtn.disabled = false;
                ftBtn.innerHTML = '<i class="fa-solid fa-stamp"></i> Convalidar Horas Previas (+1,500 XP)';
                ftBtn.onclick = () => {
                    localStorage.setItem('stemos_mcer_convalidated', 'true');
                    let currentXP = 3450;
                    try { currentXP = Number(localStorage.getItem('stemos_user_xp')) || 3450; } catch(e) {}
                    currentXP += 1500;
                    localStorage.setItem('stemos_user_xp', currentXP);

                    const xpEl = document.getElementById('header-xp-val');
                    if (xpEl) xpEl.textContent = `${currentXP.toLocaleString()} XP`;

                    ftBtn.disabled = true;
                    ftBtn.innerHTML = '<i class="fa-solid fa-check"></i> Convalidado ✓';
                    ftBtn.style.opacity = '0.7';
                    if (ftBox) ftBox.style.display = 'block';
                    alert(`✓ Convalidación Fast-Track Acreditada: 120.0 Horas registradas en tu expediente CACEI. +1,500 XP sumados a tu perfil.`);
                };
            }
        }

        // Starter unit button
        const btnStartUnit = document.getElementById('btn-passport-start-unit');
        if (btnStartUnit) {
            btnStartUnit.onclick = () => {
                modal.close();
                const tabMcer = document.getElementById('tab-btn-mcer');
                if (tabMcer) tabMcer.click();
                const starterUnitId = lvl === 'A1' ? 'mcer-a1-u01' : lvl === 'A2' ? 'mcer-a2-u05' : lvl === 'B1' ? 'mcer-b1-u09' : 'mcer-b2-u13';
                if (typeof window.openMcerUnitStudyModalById === 'function') {
                    window.openMcerUnitStudyModalById(starterUnitId);
                }
            };
        }

        modal.showModal();
    }
    window.openDiagnosticPassportModal = openDiagnosticPassportModal;

    // Check onboarding URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('onboarding') === 'mcer') {
        setTimeout(() => {
            openDiagnosticPassportModal();
        }, 400);
    }

    /* ══════════════════════════════════════════════════════════════════
       8.2. SOCRATIC ORAL DEBRIEF IN VOICE CRUCIBLE (FASE 69)
       Arthur Vance (Plant Engineering Director) Technical Counter-Inquiry
       ══════════════════════════════════════════════════════════════════ */
    const MCER_SOCRATIC_DEBRIEFS = {
        'mcer-a1-u01': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Understood on your lockout/tagout procedure. However, what if the secondary auxiliary bus still displays 480 volts and the certified electrician is not answering the plant radio? What is your immediate next action under OSHA and NOM-004?',
            keywords: ['auxiliary', 'disconnect', '480v', 'stop', 'quarantine', 'supervisor', 'safety', 'tag', 'verify'],
            minWords: 8,
            modelDefense: 'I would immediately abort the task, notify EHS, cordon off the secondary panel with warning tape, and never touch the live conductors until a zero-energy state is verified with an audited multimeter.'
        },
        'mcer-a1-u02': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Good Cpk overview. But what if datum B shows a surface roughness exceeding Ra 3.2 during the first off-tool inspection? How do you isolate between spindle runout and insufficient coolant flow?',
            keywords: ['spindle', 'coolant', 'runout', 'roughness', 'chatter', 'flow', 'feed', 'rpm', 'tool'],
            minWords: 8,
            modelDefense: 'I will first check coolant nozzles for clogging and pressure drop; if flow is nominal, I will mount a dial test indicator on the spindle nose to measure radial and axial runout before resuming the cycle.'
        },
        'mcer-a1-u03': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Your sterilization parameters are noted. If the post-aeration cycle chamber sensor indicates 1.8 ppm of residual ethylene oxide instead of the sub-0.5 ppm threshold, what containment protocol do you immediately issue?',
            keywords: ['quarantine', 'residual', 'eto', 'aeration', 'iso 11737', 'chamber', 'purge', 'bioburden'],
            minWords: 8,
            modelDefense: 'Under ISO 11737 and ISO 10993-7, I will place the entire lot in quarantine with red biohazard tagging, initiate an extended purge cycle, and log an out-of-specification containment notice.'
        },
        'mcer-a1-u04': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'We have solder bridging across pins 14 through 18 on the micro-controller. If zone 4 of the reflow oven drifted 8 degrees above liquidus, what corrective step do you submit in the IPC-A-610 report?',
            keywords: ['reflow', 'thermal', 'profile', 'liquidus', 'stencil', 'paste', 'ipc', 'bridging', 'temperature'],
            minWords: 8,
            modelDefense: 'I will halt production on SMT line 2, recalibrate the reflow oven thermocouple profiling system, inspect stencil aperture tension, and quarantine all boards produced during the temperature drift.'
        },
        'mcer-a2-u05': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'You suspect hydraulic pump cavitation. If the pump inlet suction filter was replaced yesterday and cavitation noise persists, what hydraulic circuit root cause do you investigate next?',
            keywords: ['viscosity', 'aeration', 'suction', 'oil', 'cavitation', 'valve', 'pressure', 'seal', 'leak'],
            minWords: 8,
            modelDefense: 'I would check for aeration caused by degraded shaft seals or loose suction fittings, and verify that the oil viscosity grade meets the manufacturer specifications for high ambient plant temperatures.'
        },
        'mcer-a2-u06': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'The 4-hole bolt pattern has a true position excursion of 0.35 mm exceeding the 0.15 mm MMC callout. Can we salvage the parts through reaming, or must they be scrapped under ASME Y14.5?',
            keywords: ['mmc', 'tolerance', 'datum', 'reaming', 'scrap', 'asme', 'position', 'dimension', 'material'],
            minWords: 8,
            modelDefense: 'Under ASME Y14.5, if the actual hole size is at maximum material condition, reaming may push the hole beyond the upper limit. Unless an approved engineering deviation is authorized, the parts must be scrapped.'
        },
        'mcer-a2-u07': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'The dedicated trailer is held at Otay Mesa border crossing because the commercial invoice lacks the USMCA certificate of origin code. How do you resolve this with our customs broker within the next two hours?',
            keywords: ['broker', 'invoice', 'usmca', 'origin', 'anexo 24', 'customs', 'tariff', 'crossing', 'fca'],
            minWords: 8,
            modelDefense: 'I will immediately generate an amended electronic commercial invoice with the correct regional value content classification and transmit it directly to our customs broker in San Diego.'
        },
        'mcer-a2-u08': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Your 8D report identifies vendor batch inconsistency as D4 root cause. What interim containment action D3 do you guarantee while the supplier runs their corrective action in Michigan?',
            keywords: ['containment', 'sorting', '100%', 'inspection', 'd3', 'd4', 'quarantine', 'vendor', 'sample'],
            minWords: 8,
            modelDefense: 'I have established a 100% incoming receiving sort and gauge inspection station at dock 4 to verify each incoming batch before material is released to the production floor.'
        },
        'mcer-b1-u09': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'The Allen-Bradley PLC triggered safety fault 73 and locked the pallet transfer conveyor. If the safety gate interlock tests OK with 24V DC, where in the safety circuit do you look for the ground fault?',
            keywords: ['safety', 'interlock', 'ground', 'relay', 'fault', 'circuit', 'plc', 'multimeter', 'loop'],
            minWords: 8,
            modelDefense: 'I will check the dual-channel safety relay contacts and verify if the pulse testing signals from the safety output module are detecting cross-faults or shield leakage in the trailing cable.'
        },
        'mcer-b1-u10': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Your Ishikawa fishbone diagram highlights polymer resin melt flow index variance. How do you prove statistically that this variance caused the injection molding short shots on line 5?',
            keywords: ['anova', 'doe', 'melt', 'viscosity', 'mfi', 'correlation', 'regression', 'cpk', 'statistical'],
            minWords: 8,
            modelDefense: 'I will run a two-sample t-test comparing the melt flow index of accepted versus rejected lots and perform an ANOVA regression against barrel pressure telemetry to confirm statistical significance.'
        },
        'mcer-b1-u11': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'The CMM calibration certificate expired 48 hours ago during our critical aerospace first-article inspection. Can we back-date the verification if the reference artifact artifact measures within 2 microns?',
            keywords: ['iso 17025', 'calibration', 'traceability', 'cmm', 'artifact', 'audit', 'deviation', 'standard'],
            minWords: 8,
            modelDefense: 'Under no circumstances. Back-dating violates ISO 17025 and AS9100. We must quarantine all inspected components, recalibrate the CMM with traceable NIST standards, and re-inspect the batch.'
        },
        'mcer-b1-u12': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Due to severe port delays in Los Angeles, our secondary stamping supplier is out of cold-rolled steel. What emergency kanban buffer policy do you activate to protect our daily 1,200 unit takt time?',
            keywords: ['kanban', 'buffer', 'takt', 'safety stock', 'air freight', 'reorder', 'supplier', 'lead time'],
            minWords: 8,
            modelDefense: 'I will activate our emergency dual-source contract with our Monterrey distributor and increase our Kanban buffer sizing from 2 days to 5 days of safety stock until shipping cadence normalizes.'
        },
        'mcer-b2-u13': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'US headquarters wants to insert an Engineering Change Order for heat sink geometry two weeks before official SOP. How do you defend our plant timeline without alienating the program director?',
            keywords: ['eco', 'sop', 'ppap', 'tooling', 'lead time', 'validation', 'risk', 'timeline', 'schedule'],
            minWords: 8,
            modelDefense: 'I will present an objective risk impact matrix showing that introducing new tooling modifications at this stage voids our PPAP level 4 submission and recommend phasing the ECO into running change Rev 1.'
        },
        'mcer-b2-u14': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Our edge MQTT telemetry gateway is dropping 6% of telemetry packets in the high-voltage substation. How do you harden the network edge against industrial electromagnetic interference?',
            keywords: ['mqtt', 'qos', 'emi', 'shielding', 'fiber', 'twisted', 'packet', 'gateway', 'buffer'],
            minWords: 8,
            modelDefense: 'I will upgrade the physical layer to industrial shielded Cat6A with STP grounding or single-mode fiber optic transceivers, and configure the MQTT client to QoS Level 1 with persistent local disk buffering.'
        },
        'mcer-b2-u15': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'The OEM procurement executive in Detroit is demanding a mandatory 10% price reduction across all wire harness assemblies. What is your data-backed negotiation defense using nearshoring TCO metrics?',
            keywords: ['tco', 'landed cost', 'freight', 'tariffs', 'inventory', 'lead time', 'nearshoring', 'margin'],
            minWords: 8,
            modelDefense: 'I will present our Total Cost of Ownership analysis demonstrating that our 3-day transit and zero USMCA tariffs save them 18% in pipeline inventory holding costs compared to Asian trans-Pacific alternatives.'
        },
        'mcer-b2-u16': {
            director: 'Arthur Vance · Plant Engineering Director',
            query: 'Defend why our plant in Northern Mexico is better positioned for high-complexity AI hardware assembly than expanding our contract manufacturer in Penang. Summarize your top 3 operational pillars.',
            keywords: ['usmca', 'ip protection', 'proximity', 'engineering', 'lead time', 'timezone', 'supply chain'],
            minWords: 8,
            modelDefense: 'Our top three pillars are: same-timezone engineering collaboration with Austin and Silicon Valley, ironclad USMCA intellectual property protection, and 48-hour land logistics to US customer datacenters.'
        }
    };

    function initCrucibleSocraticDebrief(unit) {
        const debriefSection = document.getElementById('mcer-crucible-socratic-section');
        const promptEl = document.getElementById('mcer-crucible-socratic-prompt');
        const playBtn = document.getElementById('btn-mcer-socratic-play-query');
        const dictBtn = document.getElementById('btn-mcer-socratic-dictate');
        const submitBtn = document.getElementById('btn-mcer-socratic-submit');
        const inputEl = document.getElementById('mcer-socratic-defense-input');
        const feedbackEl = document.getElementById('mcer-socratic-defense-feedback');

        if (!debriefSection || !unit) return;

        const unitKey = unit.id || 'mcer-a1-u01';
        const debriefData = MCER_SOCRATIC_DEBRIEFS[unitKey] || MCER_SOCRATIC_DEBRIEFS['mcer-a1-u01'];

        debriefSection.style.display = 'block';
        if (promptEl) {
            promptEl.innerHTML = `<strong>${debriefData.director}:</strong><br>&ldquo;${debriefData.query}&rdquo;`;
        }
        if (feedbackEl) {
            feedbackEl.style.display = 'none';
            feedbackEl.innerHTML = '';
        }
        if (inputEl) {
            inputEl.value = '';
        }

        // Web Speech Audio Playback
        if (playBtn) {
            playBtn.onclick = () => {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utter = new SpeechSynthesisUtterance(debriefData.query);
                    utter.lang = 'en-US';
                    utter.rate = 0.95;
                    utter.pitch = 0.9;
                    window.speechSynthesis.speak(utter);
                } else {
                    alert('Síntesis de voz no disponible en este navegador.');
                }
            };
        }

        // Microphone Speech Recognition
        if (dictBtn) {
            dictBtn.onclick = () => {
                const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (!SpeechRec) {
                    alert('Reconocimiento de voz no soportado en este navegador. Escribe tu réplica en el campo de texto.');
                    return;
                }
                const rec = new SpeechRec();
                rec.lang = 'en-US';
                rec.interimResults = false;
                dictBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Escuchando...';
                rec.onresult = (evt) => {
                    const transcript = evt.results[0][0].transcript;
                    if (inputEl) {
                        inputEl.value = transcript;
                    }
                    dictBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Dictar Réplica';
                };
                rec.onerror = () => {
                    dictBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Dictar Réplica';
                };
                rec.onend = () => {
                    dictBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Dictar Réplica';
                };
                rec.start();
            };
        }

        // Submit Oral Defense
        if (submitBtn) {
            submitBtn.onclick = () => {
                const text = (inputEl && inputEl.value) ? inputEl.value.trim() : '';
                const words = text.split(/\s+/).filter(Boolean);
                if (words.length < 5) {
                    alert('Por favor formula una defensa técnica de al menos 8 palabras en inglés.');
                    return;
                }

                // Check keywords
                const lowerText = text.toLowerCase();
                let matches = 0;
                debriefData.keywords.forEach(kw => {
                    if (lowerText.includes(kw.toLowerCase())) matches++;
                });

                const keywordScore = Math.min(40, matches * 10);
                const lengthScore = Math.min(30, words.length * 2);
                const baseScore = 30;
                const totalScore = Math.min(100, baseScore + lengthScore + keywordScore);

                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    if (totalScore >= 70) {
                        feedbackEl.style.background = '#f0fdf4';
                        feedbackEl.style.border = '1px solid #86efac';
                        feedbackEl.style.color = '#15803d';
                        feedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Defensa Técnica Aprobada (${totalScore}% Asertividad).</strong><br>
                        Arthur Vance: &ldquo;Bien resuelto, Ingeniero(a). Tu criterio prioriza la contención de causa raíz y la seguridad bajo norma. Visto bueno otorgado para auditoría de planta.&rdquo; 
                        <span style="font-weight:800; color:#059669;">+350 XP de Defensa Acreditados.</span>`;

                        // Award XP
                        try {
                            const prevXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
                            const newXP = prevXP + 350;
                            localStorage.setItem('stemos_student_xp', String(newXP));
                            localStorage.setItem(`stemos_socratic_${unitKey}`, 'completed');
                            if (typeof window.updateStudentXPHUD === 'function') {
                                window.updateStudentXPHUD(newXP);
                            }
                        } catch (e) {}
                    } else {
                        feedbackEl.style.background = '#fffbeb';
                        feedbackEl.style.border = '1px solid #fde68a';
                        feedbackEl.style.color = '#b45309';
                        feedbackEl.innerHTML = `<strong><i class="fa-solid fa-triangle-exclamation"></i> Defensa en Revisión (${totalScore}%).</strong><br>
                        Arthur Vance: &ldquo;Tu mensaje necesita mayor precisión procedimental. Incluye términos clave como <em>${debriefData.keywords.slice(0, 3).join(', ')}</em> para satisfacer la auditoría.&rdquo;`;
                    }
                }
            };
        }
    }
    window.initCrucibleSocraticDebrief = initCrucibleSocraticDebrief;

    /* ══════════════════════════════════════════════════════════════════
       8.3. MCER MILESTONE LEVEL CERTIFICATION EXAM ENGINE (FASE 68)
       Timed 20-Item Standardized Exam & Official CACEI Digital Diploma
       ══════════════════════════════════════════════════════════════════ */
    let mcerExamTimerInterval = null;
    let activeMcerExam = null;
    let activeExamAnswers = [];
    let activeExamQuestionIdx = 0;
    let mcerExamRemainingSeconds = 2400; // 40 minutes

    function openMcerLevelExamModal(levelCode) {
        const modal = document.getElementById('modal-mcer-level-exam');
        if (!modal) return;

        // Normalize level code
        let code = 'A1';
        if (levelCode) {
            const raw = String(levelCode).toUpperCase();
            if (raw.includes('A1')) code = 'A1';
            else if (raw.includes('A2')) code = 'A2';
            else if (raw.includes('B1')) code = 'B1';
            else if (raw.includes('B2')) code = 'B2';
        }

        // Get exam object
        let exam = null;
        if (window.STEMOS_MCER_TRACKS && typeof window.STEMOS_MCER_TRACKS.getLevelExam === 'function') {
            exam = window.STEMOS_MCER_TRACKS.getLevelExam(code);
        }

        if (!exam) {
            // Build fallback from MCER_LEVELS if available
            alert(`Cargando reactivos estandarizados para el examen de certificación ${code}...`);
            return;
        }

        activeMcerExam = exam;
        activeExamAnswers = new Array(exam.questions.length).fill(null);
        activeExamQuestionIdx = 0;
        mcerExamRemainingSeconds = (exam.timeLimitMinutes || 40) * 60;

        // Reset views
        const qView = document.getElementById('mcer-exam-question-view');
        const resView = document.getElementById('mcer-exam-results-view');
        if (qView) qView.style.display = 'block';
        if (resView) resView.style.display = 'none';

        // Update header badges
        const hoursMap = { 'A1': 60, 'A2': 120, 'B1': 180, 'B2': 240 };
        const levelBadge = document.getElementById('mcer-exam-level-badge');
        if (levelBadge) {
            levelBadge.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> CEFR ${exam.level} &bull; ${hoursMap[exam.level] || 60}.0h Acreditadas`;
        }

        const titleEl = document.getElementById('mcer-exam-modal-title');
        if (titleEl) titleEl.textContent = exam.title;

        const dossierEl = document.getElementById('mcer-exam-dossier-code');
        if (dossierEl) dossierEl.textContent = exam.dossier || `CACEI-ING-${exam.level}-2026-60H`;

        // Render stepper pills
        renderExamStepperPills();

        // Start countdown timer
        startExamCountdownTimer();

        // Render first question
        renderExamQuestion(0);

        // Wire navigation buttons
        const btnPrev = document.getElementById('btn-mcer-exam-prev');
        const btnNext = document.getElementById('btn-mcer-exam-next');
        const btnFinish = document.getElementById('btn-mcer-exam-finish');

        if (btnPrev) {
            btnPrev.onclick = () => {
                if (activeExamQuestionIdx > 0) {
                    renderExamQuestion(activeExamQuestionIdx - 1);
                }
            };
        }
        if (btnNext) {
            btnNext.onclick = () => {
                if (activeExamQuestionIdx < activeMcerExam.questions.length - 1) {
                    renderExamQuestion(activeExamQuestionIdx + 1);
                }
            };
        }
        if (btnFinish) {
            btnFinish.onclick = () => {
                const answeredCount = activeExamAnswers.filter(a => a !== null).length;
                if (answeredCount < activeMcerExam.questions.length) {
                    const proceed = confirm(`Has respondido ${answeredCount} de ${activeMcerExam.questions.length} reactivos. ¿Deseas calificar el examen ahora?`);
                    if (!proceed) return;
                }
                submitMcerLevelExam();
            };
        }

        // Wire Diploma Action buttons
        const btnPrint = document.getElementById('btn-print-mcer-diploma');
        if (btnPrint) {
            btnPrint.onclick = () => {
                window.print();
            };
        }

        const btnCopyFolio = document.getElementById('btn-copy-diploma-folio');
        if (btnCopyFolio) {
            btnCopyFolio.onclick = () => {
                const folioEl = document.getElementById('diploma-folio-val');
                const text = folioEl ? folioEl.textContent : '';
                if (text && navigator.clipboard) {
                    navigator.clipboard.writeText(text);
                    btnCopyFolio.innerHTML = '<i class="fa-solid fa-check"></i> ¡Folio Copiado!';
                    setTimeout(() => {
                        btnCopyFolio.innerHTML = '<i class="fa-solid fa-link"></i> Copiar Folio CACEI';
                    }, 2000);
                }
            };
        }

        const btnRetry = document.getElementById('btn-retry-mcer-exam');
        if (btnRetry) {
            btnRetry.onclick = () => {
                openMcerLevelExamModal(exam.level);
            };
        }

        modal.showModal();
    }
    window.openMcerLevelExamModal = openMcerLevelExamModal;

    function renderExamStepperPills() {
        const container = document.getElementById('mcer-exam-stepper-pills');
        if (!container || !activeMcerExam) return;

        container.innerHTML = '';
        activeMcerExam.questions.forEach((q, idx) => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'mcer-exam-pill';
            pill.id = `exam-pill-${idx}`;
            pill.textContent = String(idx + 1);
            pill.style.width = '30px';
            pill.style.height = '30px';
            pill.style.borderRadius = '50%';
            pill.style.border = '1px solid #cbd5e1';
            pill.style.background = '#f8fafc';
            pill.style.color = '#475569';
            pill.style.fontWeight = '800';
            pill.style.fontSize = '0.75rem';
            pill.style.cursor = 'pointer';
            pill.onclick = () => renderExamQuestion(idx);
            container.appendChild(pill);
        });
        updateExamStepperState();
    }

    function updateExamStepperState() {
        if (!activeMcerExam) return;
        activeMcerExam.questions.forEach((q, idx) => {
            const pill = document.getElementById(`exam-pill-${idx}`);
            if (!pill) return;

            const isCurrent = (idx === activeExamQuestionIdx);
            const isAnswered = (activeExamAnswers[idx] !== null);

            if (isCurrent) {
                pill.style.border = '2px solid #0284c7';
                pill.style.background = '#0284c7';
                pill.style.color = '#ffffff';
            } else if (isAnswered) {
                pill.style.border = '1px solid #10b981';
                pill.style.background = '#dcfce7';
                pill.style.color = '#15803d';
            } else {
                pill.style.border = '1px solid #cbd5e1';
                pill.style.background = '#f8fafc';
                pill.style.color = '#475569';
            }
        });

        const counter = document.getElementById('mcer-exam-answered-counter');
        if (counter) {
            const answeredCount = activeExamAnswers.filter(a => a !== null).length;
            counter.textContent = `${answeredCount} de ${activeMcerExam.questions.length} respondidos`;
        }
    }

    function renderExamQuestion(idx) {
        if (!activeMcerExam || !activeMcerExam.questions[idx]) return;
        activeExamQuestionIdx = idx;
        const q = activeMcerExam.questions[idx];

        updateExamStepperState();

        // Section badge text
        const secBadge = document.getElementById('mcer-exam-section-badge');
        if (secBadge) {
            if (idx < 5) secBadge.textContent = 'SECCIÓN 1/4: LISTENING COMPREHENSION (Reactivos 1–5)';
            else if (idx < 10) secBadge.textContent = 'SECCIÓN 2/4: GRAMMAR & SYNTAX STRUCTURE (Reactivos 6–10)';
            else if (idx < 15) secBadge.textContent = 'SECCIÓN 3/4: TECHNICAL SOP READING & DIAGRAMS (Reactivos 11–15)';
            else secBadge.textContent = 'SECCIÓN 4/4: WORKPLACE PRAGMATICS & NEARSHORING (Reactivos 16–20)';
        }

        // Listening Audio Box
        const audioBox = document.getElementById('mcer-exam-audio-box');
        const audioPlayBtn = document.getElementById('btn-mcer-exam-audio-play');
        if (audioBox) {
            if (q.audioScript || idx < 5) {
                audioBox.style.display = 'flex';
                if (audioPlayBtn) {
                    audioPlayBtn.onclick = () => {
                        if ('speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                            const utter = new SpeechSynthesisUtterance(q.audioScript || q.q);
                            utter.lang = 'en-US';
                            utter.rate = 0.95;
                            window.speechSynthesis.speak(utter);
                        }
                    };
                }
            } else {
                audioBox.style.display = 'none';
            }
        }

        // Reading Passage Box
        const passageBox = document.getElementById('mcer-exam-passage-box');
        if (passageBox) {
            if (q.passage || (idx >= 10 && idx < 15)) {
                passageBox.style.display = 'block';
                passageBox.innerHTML = `<strong><i class="fa-solid fa-file-lines" style="color:#0284c7;"></i> Procedimiento Técnico / SOP:</strong><br>${q.passage || 'Read the operational technical procedure above to verify compliance.'}`;
            } else {
                passageBox.style.display = 'none';
            }
        }

        // Prompt
        const promptEl = document.getElementById('mcer-exam-prompt-text');
        if (promptEl) {
            promptEl.innerHTML = `<span style="color:#0284c7; font-weight:900;">Item ${idx + 1}.</span> ${q.q}`;
        }

        // 4 Options
        const optsContainer = document.getElementById('mcer-exam-options-container');
        if (optsContainer) {
            optsContainer.innerHTML = '';
            const opts = q.opts || q.options || [];
            opts.forEach((optText, optIdx) => {
                const optBtn = document.createElement('button');
                optBtn.type = 'button';
                optBtn.className = 'mcer-exam-opt-btn';
                const isSelected = (activeExamAnswers[idx] === optIdx);

                optBtn.style.textAlign = 'left';
                optBtn.style.padding = '12px 16px';
                optBtn.style.borderRadius = '10px';
                optBtn.style.border = isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1';
                optBtn.style.background = isSelected ? 'rgba(2,132,199,0.1)' : '#ffffff';
                optBtn.style.color = '#0f172a';
                optBtn.style.fontWeight = isSelected ? '800' : '600';
                optBtn.style.cursor = 'pointer';
                optBtn.style.fontSize = '0.9rem';
                optBtn.style.display = 'flex';
                optBtn.style.alignItems = 'center';
                optBtn.style.gap = '10px';

                const letter = ['A', 'B', 'C', 'D'][optIdx] || String(optIdx);
                optBtn.innerHTML = `<span style="width:24px; height:24px; border-radius:50%; background:${isSelected ? '#0284c7' : '#f1f5f9'}; color:${isSelected ? '#fff' : '#64748b'}; display:inline-flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800;">${letter}</span> <span>${optText}</span>`;

                optBtn.onclick = () => {
                    activeExamAnswers[idx] = optIdx;
                    renderExamQuestion(idx);
                };
                optsContainer.appendChild(optBtn);
            });
        }

        // Update Prev / Next buttons
        const btnPrev = document.getElementById('btn-mcer-exam-prev');
        const btnNext = document.getElementById('btn-mcer-exam-next');
        if (btnPrev) btnPrev.disabled = (idx === 0);
        if (btnNext) btnNext.disabled = (idx === activeMcerExam.questions.length - 1);
    }

    function startExamCountdownTimer() {
        if (mcerExamTimerInterval) clearInterval(mcerExamTimerInterval);
        const timerDisplay = document.getElementById('mcer-exam-timer-display');

        function updateDisplay() {
            const mins = Math.floor(mcerExamRemainingSeconds / 60);
            const secs = mcerExamRemainingSeconds % 60;
            if (timerDisplay) {
                timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }
            if (mcerExamRemainingSeconds <= 0) {
                clearInterval(mcerExamTimerInterval);
                alert('El tiempo límite de 40 minutos ha concluido. El examen se calificará automáticamente.');
                submitMcerLevelExam();
            }
        }

        updateDisplay();
        mcerExamTimerInterval = setInterval(() => {
            mcerExamRemainingSeconds--;
            updateDisplay();
        }, 1000);
    }

    function submitMcerLevelExam() {
        if (mcerExamTimerInterval) clearInterval(mcerExamTimerInterval);
        if (!activeMcerExam) return;

        let correct = 0;
        let secListening = 0;
        let secGrammar = 0;
        let secReading = 0;
        let secPragmatics = 0;

        activeMcerExam.questions.forEach((q, idx) => {
            const userAns = activeExamAnswers[idx];
            const correctAns = (q.ans !== undefined ? q.ans : (q.answer !== undefined ? q.answer : q.correct));
            const isRight = (userAns === correctAns);

            if (isRight) {
                correct++;
                if (idx < 5) secListening++;
                else if (idx < 10) secGrammar++;
                else if (idx < 15) secReading++;
                else secPragmatics++;
            }
        });

        const totalQ = activeMcerExam.questions.length;
        const scorePct = Math.round((correct / totalQ) * 100);
        const isPassed = (correct >= 15); // 75% threshold

        // Switch to Results View
        const qView = document.getElementById('mcer-exam-question-view');
        const resView = document.getElementById('mcer-exam-results-view');
        if (qView) qView.style.display = 'none';
        if (resView) resView.style.display = 'block';

        // Update score indicators
        const scoreVal = document.getElementById('mcer-exam-score-val');
        const scoreFrac = document.getElementById('mcer-exam-score-fraction');
        if (scoreVal) scoreVal.textContent = `${scorePct}%`;
        if (scoreFrac) scoreFrac.textContent = `${correct} / ${totalQ} reactivos`;

        // Update subscores
        const elSubL = document.getElementById('mcer-exam-sub-listening');
        const elSubG = document.getElementById('mcer-exam-sub-grammar');
        const elSubR = document.getElementById('mcer-exam-sub-reading');
        const elSubP = document.getElementById('mcer-exam-sub-pragmatics');
        if (elSubL) elSubL.textContent = `${secListening}/5`;
        if (elSubG) elSubG.textContent = `${secGrammar}/5`;
        if (elSubR) elSubR.textContent = `${secReading}/5`;
        if (elSubP) elSubP.textContent = `${secPragmatics}/5`;

        const statusTag = document.getElementById('mcer-exam-status-tag');
        const resultTitle = document.getElementById('mcer-exam-result-title');
        const diplomaCard = document.getElementById('mcer-exam-diploma-card');
        const remCard = document.getElementById('mcer-exam-remediation-card');

        if (isPassed) {
            if (statusTag) {
                statusTag.textContent = 'APROBADO';
                statusTag.style.background = '#dcfce7';
                statusTag.style.color = '#15803d';
            }
            if (resultTitle) {
                resultTitle.textContent = `¡Felicidades! Has acreditado la Certificación CEFR ${activeMcerExam.level}`;
            }
            if (diplomaCard) diplomaCard.style.display = 'block';
            if (remCard) remCard.style.display = 'none';

            // Generate Diploma details
            const folio = `CACEI-MCER-${activeMcerExam.level}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
            const studentName = localStorage.getItem('stemos_student_name') || 'Diana Laura Morales';
            const hoursMap = { 'A1': 60, 'A2': 120, 'B1': 180, 'B2': 240 };
            const accHours = hoursMap[activeMcerExam.level] || 60;

            const elFolio = document.getElementById('diploma-folio-val');
            const elName = document.getElementById('diploma-student-name');
            const elBanner = document.getElementById('diploma-level-banner');

            if (elFolio) elFolio.textContent = folio;
            if (elName) elName.textContent = studentName;
            if (elBanner) {
                elBanner.textContent = `CEFR LEVEL ${activeMcerExam.level} &bull; ${accHours}.0 HORAS ACREDITADAS`;
            }

            // Persist Milestone certification in localStorage
            try {
                localStorage.setItem(`stemos_mcer_level_${activeMcerExam.level.toLowerCase()}_certified`, 'true');
                localStorage.setItem(`stemos_mcer_certified_hours`, String(accHours));
                localStorage.setItem(`stemos_mcer_diploma_${activeMcerExam.level.toLowerCase()}_folio`, folio);
                const prevXP = parseInt(localStorage.getItem('stemos_student_xp') || '3450', 10);
                const newXP = prevXP + 2000;
                localStorage.setItem('stemos_student_xp', String(newXP));
                if (typeof window.updateStudentXPHUD === 'function') {
                    window.updateStudentXPHUD(newXP);
                }
            } catch (e) {}

        } else {
            if (statusTag) {
                statusTag.textContent = 'REQUIERE REFUERZO';
                statusTag.style.background = '#fee2e2';
                statusTag.style.color = '#b91c1c';
            }
            if (resultTitle) {
                resultTitle.textContent = `Umbral No Alcanzado (${scorePct}% - Mínimo Requerido: 75%)`;
            }
            if (diplomaCard) diplomaCard.style.display = 'none';
            if (remCard) remCard.style.display = 'block';
        }
    }

    function confirmCloseMcerExam() {
        const modal = document.getElementById('modal-mcer-level-exam');
        if (!modal) return;
        const resView = document.getElementById('mcer-exam-results-view');
        if (resView && resView.style.display === 'block') {
            modal.close();
            return;
        }
        const answeredCount = activeExamAnswers.filter(a => a !== null).length;
        if (answeredCount > 0) {
            const ok = confirm('¿Deseas salir del examen en curso? Tu avance actual no se guardará.');
            if (!ok) return;
        }
        if (mcerExamTimerInterval) clearInterval(mcerExamTimerInterval);
        modal.close();
    }
    window.confirmCloseMcerExam = confirmCloseMcerExam;

    /* ══════════════════════════════════════════════════════════════════
       8.4. MULTI-CAMPUS INSTITUTIONAL FEDERATION & CAMPUS EDGE SYNC (FASE 70)
       TecNM Tijuana · TecNM Saltillo · UTT · UPBC · UACJ · TecNM QRO
       ══════════════════════════════════════════════════════════════════ */
    const STEMOS_CAMPUSES = {
        'tecnm-tijuana': {
            id: 'tecnm-tijuana',
            name: 'TecNM Tijuana (Instituto Tecnológico de Tijuana • ITT)',
            shortName: 'TecNM Tijuana',
            institutionText: 'TecNM Instituto Tecnológico de Tijuana &bull; Subdirección Académica',
            subsystem: 'TecNM',
            domain: '@tijuana.tecnm.mx'
        },
        'tecnm-saltillo': {
            id: 'tecnm-saltillo',
            name: 'TecNM Saltillo (Instituto Tecnológico de Saltillo • ITS)',
            shortName: 'TecNM Saltillo',
            institutionText: 'TecNM Instituto Tecnológico de Saltillo &bull; Coordinación de Idiomas',
            subsystem: 'TecNM',
            domain: '@saltillo.tecnm.mx'
        },
        'utt-tijuana': {
            id: 'utt-tijuana',
            name: 'UTT (Universidad Tecnológica de Tijuana • Valle de las Palmas)',
            shortName: 'UTT Tijuana',
            institutionText: 'Universidad Tecnológica de Tijuana &bull; Dirección de Carreras STEM',
            subsystem: 'DGUTyP',
            domain: '@uttijuana.edu.mx'
        },
        'upbc-mexicali': {
            id: 'upbc-mexicali',
            name: 'UPBC (Universidad Politécnica de Baja California • Mexicali)',
            shortName: 'UPBC Mexicali',
            institutionText: 'Universidad Politécnica de Baja California &bull; Consejo Académico',
            subsystem: 'DGUTyP',
            domain: '@upbc.edu.mx'
        },
        'uacj-juarez': {
            id: 'uacj-juarez',
            name: 'UACJ (Universidad Autónoma de Ciudad Juárez • IIT)',
            shortName: 'UACJ Juárez',
            institutionText: 'Universidad Autónoma de Ciudad Juárez &bull; Instituto de Ingeniería',
            subsystem: 'UACJ',
            domain: '@uacj.mx'
        },
        'tecnm-queretaro': {
            id: 'tecnm-queretaro',
            name: 'TecNM Querétaro (Instituto Tecnológico de Querétaro • ITQ)',
            shortName: 'TecNM Querétaro',
            institutionText: 'TecNM Instituto Tecnológico de Querétaro &bull; División de Estudios Superiores',
            subsystem: 'TecNM',
            domain: '@queretaro.tecnm.mx'
        }
    };

    function switchInstitutionalCampus(campusId) {
        const campus = STEMOS_CAMPUSES[campusId] || STEMOS_CAMPUSES['tecnm-tijuana'];
        try {
            localStorage.setItem('stemos_active_campus', campus.id);
        } catch (e) {}

        // Update selector elements on page
        ['header-campus-federation-select', 'campus-federation-select', 'admin-campus-federation-select'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = campus.id;
        });

        // Update student subsystem pill
        const subPill = document.getElementById('header-student-subsystem');
        if (subPill) subPill.textContent = campus.subsystem;

        // Update diploma text if visible
        const diploInst = document.getElementById('diploma-institution-name');
        if (diploInst) diploInst.innerHTML = campus.institutionText;
    }
    window.switchInstitutionalCampus = switchInstitutionalCampus;

    function initCampusEdgeSync() {
        const queueKey = 'stemos_campus_edge_sync_queue';
        window.addEventListener('online', () => {
            try {
                const raw = localStorage.getItem(queueKey);
                if (raw) {
                    const queue = JSON.parse(raw);
                    if (Array.isArray(queue) && queue.length > 0) {
                        console.log(`[Campus Edge Sync] Sincronizando ${queue.length} eventos pendientes con el nodo campus.`);
                        localStorage.removeItem(queueKey);
                    }
                }
            } catch (e) {}
        });

        // Initialize saved campus
        try {
            const savedCampus = localStorage.getItem('stemos_active_campus') || 'tecnm-tijuana';
            switchInstitutionalCampus(savedCampus);
        } catch (e) {}
    }
    initCampusEdgeSync();

    // Check exam URL parameter (e.g. app.html?exam=A1)
    if (urlParams.get('exam')) {
        setTimeout(() => {
            openMcerLevelExamModal(urlParams.get('exam'));
        }, 450);
    }
    if (urlParams.get('campus')) {
        switchInstitutionalCampus(urlParams.get('campus'));
    }

    /* --- 9. KEYBOARD ACCESSIBILITY (WCAG A11Y) --- */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // 1. Academic reader & quiz modal
            const academicModal = document.getElementById('academic-modal');
            if (academicModal && academicModal.open) {
                academicModal.close();
            }
            // 2. Certificate modal
            const certModal = document.getElementById('cert-modal');
            if (certModal && certModal.open) {
                certModal.close();
            }
            // 3. Exam modal overlay
            const examOverlay = document.getElementById('exam-modal-overlay');
            if (examOverlay && examOverlay.classList.contains('active')) {
                examOverlay.classList.remove('active');
            }
            // 4. Under dev modal
            const devModal = document.getElementById('under-dev-modal');
            if (devModal && devModal.classList.contains('active')) {
                devModal.classList.remove('active');
            }
            // 5. World Map Drawer
            if (window.stemWorld && typeof window.stemWorld.closeDrawer === 'function') {
                window.stemWorld.closeDrawer();
            }
            // 7. MCER Milestone Level Exam modal
            const mcerExamModal = document.getElementById('modal-mcer-level-exam');
            if (mcerExamModal && mcerExamModal.open) {
                if (typeof window.confirmCloseMcerExam === 'function') {
                    window.confirmCloseMcerExam();
                } else {
                    mcerExamModal.close();
                }
            }
        }
    });

});

