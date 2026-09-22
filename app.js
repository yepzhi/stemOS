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
                                'business-leadership': 'soft_skills'
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
    function handleUserReply() {
        const text = chatInput.value.trim();
        if (!text || !chatState.active) return;

        chatState.lastUserReply = text;
        addUserMessage(text);
        chatInput.value = '';
        chatInput.disabled = true;
        chatSendBtn.disabled = true;

        showTypingIndicator();

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
        const track = coursesData[currentCertTrackId] || (typeof LXP_COURSES !== 'undefined' && LXP_COURSES[currentCertTrackId]) || { title: 'stemOS Specialization' };
        const modalCertSkill = document.getElementById('modal-cert-skill');
        const modalCertId = document.getElementById('modal-cert-id');
        const hashCode = `STEMOS-${currentCertTrackId.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${(currentCertTrackId.length * 1337).toString(16).toUpperCase()}`;

        if (modalCertSkill) {
            modalCertSkill.textContent = `${track.titleEN || track.title} — ${track.badgeName || 'Technical Specialization'}`;
        }
        if (modalCertId) {
            modalCertId.textContent = `VERIFIED: ${hashCode}`;
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
            const track = coursesData[currentCertTrackId] || (typeof LXP_COURSES !== 'undefined' && LXP_COURSES[currentCertTrackId]) || { title: 'stemOS Specialization', id: currentCertTrackId };
            const hashCode = `STEMOS-${(track.id || currentCertTrackId).toUpperCase().replace(/[^A-Z0-9]/g, '')}-${((track.id || currentCertTrackId).length * 1337).toString(16).toUpperCase()}`;

            const badgeJson = {
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
                    "name": "Alberto Yépiz",
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
        'entrepreneurship': 'fa-lightbulb'
    };

    // Track order for consistent unit numbering
    const TRACK_ORDER = [
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
                        launchSocraticChallenge(trackId, mod.id);
                    });
                }
                card.addEventListener('click', () => {
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
    };

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

    /* --- Constellation Skills Graph (26 Tracks & 4 Clusters) --- */
    const CLUSTER_CONFIG = [
        {
            id: 'cluster-tech',
            title: 'Cluster I · Software, AI & Redes Inteligentes',
            color: '#0284c7',
            x: 20, y: 20, width: 400, height: 245,
            nodes: [
                { id: 'cybersecurity', x: 95, y: 90, icon: 'fa-solid fa-shield-halved', label: 'Ciberseguridad' },
                { id: 'it-innovation', x: 220, y: 80, icon: 'fa-solid fa-cloud', label: 'Innovación TI' },
                { id: 'ai-ml', x: 345, y: 90, icon: 'fa-solid fa-brain', label: 'AI & ML' },
                { id: 'telecom-iot', x: 95, y: 195, icon: 'fa-solid fa-tower-cell', label: 'Telecom & IoT' },
                { id: 'software-dev', x: 220, y: 185, icon: 'fa-solid fa-code', label: 'Software Dev' },
                { id: 'data-analytics', x: 345, y: 195, icon: 'fa-solid fa-chart-pie', label: 'Data Science' }
            ],
            links: [
                ['cybersecurity', 'it-innovation'],
                ['it-innovation', 'ai-ml'],
                ['cybersecurity', 'telecom-iot'],
                ['it-innovation', 'software-dev'],
                ['ai-ml', 'data-analytics'],
                ['telecom-iot', 'software-dev'],
                ['software-dev', 'data-analytics']
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
            // 6. Dev Studio Drawer
            if (typeof window.closeDrawer === 'function') {
                window.closeDrawer();
            }
        }
    });

});

