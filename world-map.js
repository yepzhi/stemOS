/**
 * ==========================================================================
 * stemOS LXP - 3D World Globe & Gamified Level Path (Super Mario / Duolingo)
 * Pure Vanilla JavaScript & HTML5 Canvas, zero external libraries.
 * Fast, lightweight, hardware-accelerated, touch & gesture friendly.
 * ==========================================================================
 */

(function (window, document) {
    'use strict';

    // Track icon fallback mapping
    const DEFAULT_TRACK_ICONS = {
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

    const REALM_META = {
        technology: { label: 'Tecnología & Redes', color: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.5)', icon: 'fa-microchip' },
        engineering: { label: 'Ingeniería & Industria', color: '#f97316', glow: 'rgba(249, 115, 22, 0.5)', icon: 'fa-gear' },
        science: { label: 'Ciencias & Futuro', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)', icon: 'fa-flask' },
        career: { label: 'Aviación & Carrera', color: '#22c55e', glow: 'rgba(34, 197, 94, 0.5)', icon: 'fa-plane' }
    };

    // stemBOT Dialogue & STEM Guidance Phrases
    const STEMBOT_PHRASES = [
        "¡Hola! ¿Listo para conquistar este reto?",
        "¡Bip bup! Cada módulo suma XP a tu perfil STEM.",
        "¡Tu cerebro de ingeniero está en máxima potencia!",
        "¡Recuerda: la ciencia se aprende experimentando!",
        "¡Un paso más cerca de tu certificación aeroespacial!",
        "¡Impresionante avance! Sigue con este ritmo.",
        "¡Haz clic para iniciar tu próxima misión!",
        "¡Los grandes científicos nunca se rinden!",
        "¡Sistemas listos! Modo aprendizaje al 100%."
    ];

    // Synthesized Sound Effects (Web Audio API - Zero external assets)
    class SoundFX {
        constructor() {
            this.ctx = null;
            this.muted = localStorage.getItem('stemos_sound_muted') === 'true';
        }

        init() {
            if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        toggleMute() {
            this.muted = !this.muted;
            localStorage.setItem('stemos_sound_muted', this.muted ? 'true' : 'false');
            return this.muted;
        }

        playBlip(freq = 587, duration = 0.08) {
            if (this.muted) return;
            try {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) {}
        }

        playWarp() {
            if (this.muted) return;
            try {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.35);
                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.4);
            } catch (e) {}
        }

        playVictory() {
            if (this.muted) return;
            try {
                this.init();
                if (!this.ctx) return;
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                notes.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    const startTime = this.ctx.currentTime + idx * 0.09;
                    osc.frequency.setValueAtTime(freq, startTime);
                    gain.gain.setValueAtTime(0.16, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(startTime);
                    osc.stop(startTime + 0.24);
                });
            } catch (e) {}
        }

        playRobotGreet() {
            if (this.muted) return;
            try {
                this.init();
                if (!this.ctx) return;
                const notes = [523.25, 659.25, 783.99, 987.77, 1046.50]; // C5, E5, G5, B5, C6
                notes.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    const startTime = this.ctx.currentTime + idx * 0.055;
                    osc.frequency.setValueAtTime(freq, startTime);
                    gain.gain.setValueAtTime(0.12, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.16);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(startTime);
                    osc.stop(startTime + 0.18);
                });
            } catch (e) {}
        }

        playRobotChirp() {
            if (this.muted) return;
            try {
                this.init();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                // Playful double-tone chirp
                [0, 0.08].forEach((delay, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'triangle';
                    const t = now + delay;
                    const startF = idx === 0 ? 660 : 980;
                    const endF = idx === 0 ? 1200 : 1560;
                    osc.frequency.setValueAtTime(startF, t);
                    osc.frequency.exponentialRampToValueAtTime(endF, t + 0.065);
                    gain.gain.setValueAtTime(0.12, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(t);
                    osc.stop(t + 0.075);
                });
            } catch (e) {}
        }

        playRobotHop() {
            if (this.muted) return;
            try {
                this.init();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(260, now);
                osc.frequency.exponentialRampToValueAtTime(680, now + 0.15);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.23);
            } catch (e) {}
        }

        playRobotCelebrate() {
            if (this.muted) return;
            try {
                this.init();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const fanfare = [
                    { f: 523.25, d: 0.08, t: 0 },
                    { f: 659.25, d: 0.08, t: 0.08 },
                    { f: 783.99, d: 0.08, t: 0.16 },
                    { f: 1046.50, d: 0.28, t: 0.24 }
                ];
                fanfare.forEach(note => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'triangle';
                    const startTime = now + note.t;
                    osc.frequency.setValueAtTime(note.f, startTime);
                    gain.gain.setValueAtTime(0.15, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(startTime);
                    osc.stop(startTime + note.d + 0.02);
                });
            } catch (e) {}
        }
    }

    class StemOSWorldMapEngine {
        constructor() {
            this.container = null;
            this.canvas = null;
            this.ctx = null;
            this.sound = new SoundFX();

            // 3D Sphere state
            this.radius = 240;
            this.pitch = 0.25; // X rotation in radians
            this.yaw = 0.35;    // Y rotation in radians
            this.targetPitch = 0.25;
            this.targetYaw = 0.35;
            this.zoom = 1.0;
            this.targetZoom = 1.0;
            this.minZoom = 0.65;
            this.maxZoom = 2.4;

            // Physics / Inertia
            this.vx = 0;
            this.vy = 0;
            this.autoRotate = true;
            this.isDragging = false;
            this.lastPointerX = 0;
            this.lastPointerY = 0;
            this.pinchDist = null;

            // Data & Nodes
            this.courses = {};
            this.nodes = [];
            this.stars = [];
            this.hoveredNode = null;
            this.selectedTrackId = null;
            this.activeFilter = 'all';

            // Active callbacks
            this.launchModuleCallback = null;
            this.launchSocraticCallback = null;

            // DOM Elements
            this.els = {};
            this.animFrameId = null;
            this.botPhraseIdx = 0;
        }

        init(containerId = 'world-map-container', options = {}) {
            this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!this.container) {
                console.warn(`[stemOS World Map] Container #${containerId} not found.`);
                return;
            }

            if (options.onLaunchModule) this.launchModuleCallback = options.onLaunchModule;
            if (options.onLaunchSocratic) this.launchSocraticCallback = options.onLaunchSocratic;

            // Fetch course data from global LXP_COURSES
            if (typeof LXP_COURSES !== 'undefined') {
                this.courses = LXP_COURSES;
            }

            this.buildDOM();
            this.setupStars(140);
            this.buildSphereNodes();
            this.bindEvents();
            this.startLoop();

            // Initial resize
            this.handleResize();
            window.addEventListener('resize', () => this.handleResize());

            // Check URL params for direct track opening
            const urlParams = new URLSearchParams(window.location.search);
            const directTrack = urlParams.get('world') || urlParams.get('track');
            if (directTrack && this.courses[directTrack]) {
                setTimeout(() => this.openWorldPath(directTrack), 300);
            }
        }

        buildDOM() {
            this.container.innerHTML = `
                <div class="world-experience-wrap" id="world-experience-wrap">
                    <!-- Dynamic Colorful Tech Auroras Background -->
                    <div class="world-aurora-bg" aria-hidden="true">
                        <div class="world-aurora-blob aurora-blob-1"></div>
                        <div class="world-aurora-blob aurora-blob-2"></div>
                        <div class="world-aurora-blob aurora-blob-3"></div>
                        <div class="world-aurora-blob aurora-blob-4"></div>
                    </div>

                    <!-- Top HUD -->
                    <div class="world-hud-top">
                        <div class="world-title-badge">
                            <div class="world-brand-icon"><i class="fa-solid fa-earth-americas"></i></div>
                            <div class="world-title-text">
                                <span class="world-title-main">Mundo stemOS <span style="font-size:0.7rem;font-weight:800;color:#0284c7;background:rgba(2,132,199,0.12);padding:2px 8px;border-radius:6px;border:1px solid rgba(2,132,199,0.3);">3D ESP</span></span>
                                <span class="world-title-sub">Ruta secuencial gamificada de 26 mundos &bull; Modo Tech White</span>
                            </div>
                        </div>

                        <!-- Realm Filters -->
                        <div class="world-realm-filters">
                            <button class="realm-filter-btn active" data-cat="all">
                                <i class="fa-solid fa-route"></i> Todos (26)
                            </button>
                            <button class="realm-filter-btn" data-cat="technology">
                                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#0284c7;"></span> Tecnología
                            </button>
                            <button class="realm-filter-btn" data-cat="engineering">
                                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ea580c;"></span> Ingeniería
                            </button>
                            <button class="realm-filter-btn" data-cat="science">
                                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#9333ea;"></span> Ciencias
                            </button>
                            <button class="realm-filter-btn" data-cat="career">
                                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#16a34a;"></span> Aviación
                            </button>
                        </div>

                        <!-- Tools -->
                        <div class="world-hud-tools">
                            <button class="world-tool-btn ${!this.sound.muted ? 'active' : ''}" id="wm-btn-sound" title="Sonidos / Audio FX">
                                <i class="fa-solid ${!this.sound.muted ? 'fa-volume-high' : 'fa-volume-xmark'}"></i>
                            </button>
                            <button class="world-tool-btn" id="wm-btn-reset-cam" title="Centrar en Inicio (Paso 1)">
                                <i class="fa-solid fa-crosshairs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- 3D Canvas Viewport -->
                    <div class="world-globe-viewport" id="world-globe-viewport">
                        <canvas id="world-globe-canvas"></canvas>
                    </div>

                    <!-- Floating Zoom Controls -->
                    <div class="world-floating-controls">
                        <button class="world-ctrl-btn" id="wm-btn-zoom-in" title="Acercar (Zoom In)"><i class="fa-solid fa-plus"></i></button>
                        <button class="world-ctrl-btn" id="wm-btn-zoom-out" title="Alejar (Zoom Out)"><i class="fa-solid fa-minus"></i></button>
                        <button class="world-ctrl-btn active" id="wm-btn-autorotate" title="Pausar/Reanudar Giro"><i class="fa-solid fa-arrows-rotate"></i></button>
                    </div>

                    <!-- Gesture Hint -->
                    <div class="world-gesture-hint" id="world-gesture-hint">
                        <i class="fa-solid fa-hand-pointer"></i>
                        <span>Arrastra para girar 360° &bull; Rueda o Pellizca para Zoom &bull; Clic para entrar</span>
                    </div>

                    <!-- Holographic Tooltip -->
                    <div class="world-hover-tooltip" id="world-hover-tooltip">
                        <div class="wtt-cat-tag" id="wtt-cat-tag">INGENIERÍA</div>
                        <div class="wtt-title" id="wtt-title">Manufactura Aeronáutica</div>
                        <div class="wtt-meta-row">
                            <span id="wtt-modules-count"><i class="fa-solid fa-cubes"></i> 9 Módulos</span>
                            <span id="wtt-stars-count"><i class="fa-solid fa-star" style="color:#fbbf24;"></i> 2 Ganadas</span>
                        </div>
                        <div class="wtt-cta">
                            <span>Explorar Camino &bull; Duolingo/Mario</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>

                    <!-- stemBOT 3D Globe Companion HUD Widget -->
                    <div class="stembot-hud-widget" id="stembot-globe-hud" role="button" tabindex="0" title="Copiloto stemBOT - Clic para escuchar un tip">
                        <div class="stembot-hud-avatar">
                            <svg viewBox="0 0 64 64" width="28" height="28" fill="none">
                                <line x1="32" y1="14" x2="32" y2="7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
                                <circle cx="32" cy="5" r="4" fill="#00f5d4"/>
                                <rect x="14" y="14" width="36" height="24" rx="9" fill="#ffffff" stroke="#38bdf8" stroke-width="1.8"/>
                                <rect x="18" y="18" width="28" height="15" rx="5" fill="#0f172a"/>
                                <ellipse cx="26" cy="25" rx="3" ry="3.5" fill="#00f5d4"/>
                                <ellipse cx="38" cy="25" rx="3" ry="3.5" fill="#00f5d4"/>
                                <rect x="28" y="37" width="8" height="3" rx="1" fill="#64748b"/>
                                <path d="M 20 40 L 44 40 L 42 49 L 22 49 Z" fill="#ffffff"/>
                                <circle cx="32" cy="44.5" r="2.5" fill="#0284c7"/>
                            </svg>
                        </div>
                        <div class="stembot-hud-info">
                            <div class="stembot-hud-title">
                                <span class="stembot-bubble-bot-tag" style="font-size:0.58rem;padding:2px 6px;"><i class="fa-solid fa-bolt"></i> COPILOTO</span>
                                stemBOT
                            </div>
                            <div class="stembot-hud-subtitle" id="stembot-hud-phrase">
                                ¡Gira el mundo o elige tu próxima aventura!
                            </div>
                        </div>
                    </div>

                    <!-- Level Path View (Super Mario & Duolingo Winding Trail) -->
                    <div class="world-level-path-view" id="world-level-path-view">
                        <!-- Top Bar in Path -->
                        <div class="path-header-card">
                            <button class="path-back-btn" id="path-btn-back">
                                <i class="fa-solid fa-arrow-left"></i>
                                <span>Volver al Globo 3D</span>
                            </button>

                            <div class="path-track-info">
                                <div class="path-track-badges">
                                    <span class="path-cat-badge" id="path-cat-badge">TECNOLOGÍA</span>
                                    <span class="path-standard-badge" id="path-standard-badge">CEFR B1 &bull; AS9100</span>
                                </div>
                                <h2 class="path-track-title" id="path-track-title">Manufactura Aeronáutica</h2>
                            </div>

                            <div class="path-track-stats-row">
                                <div class="path-stat-pill" id="path-stat-progress">
                                    <i class="fa-solid fa-award"></i>
                                    <span id="path-stat-progress-text">3/9 Módulos</span>
                                </div>
                                <select class="path-track-select" id="path-track-select" aria-label="Cambiar de Mundo">
                                    <!-- Options injected dynamically -->
                                </select>
                            </div>
                        </div>

                        <!-- Winding Trail SVG & Stepping Stones -->
                        <div class="path-winding-trail-wrap" id="path-winding-trail-wrap">
                            <svg class="path-svg-trail" id="path-svg-trail" preserveAspectRatio="none">
                                <path class="path-svg-line-bg" id="path-svg-line-bg" d=""></path>
                                <path class="path-svg-line-glow" id="path-svg-line-glow" d=""></path>
                            </svg>
                            <div class="path-nodes-layer" id="path-nodes-layer">
                                <!-- Stepping stone nodes injected here -->
                            </div>
                        </div>
                    </div>

                    <!-- Module Inspection Bottom Drawer -->
                    <div class="wmd-backdrop" id="wmd-backdrop"></div>
                    <div class="world-module-drawer" id="world-module-drawer">
                        <div class="wmd-handle"></div>
                        <div class="wmd-header">
                            <div class="wmd-title-box">
                                <div class="wmd-tag-row">
                                    <span class="path-cat-badge" id="wmd-cat-tag">TECNOLOGÍA</span>
                                    <span class="path-standard-badge" id="wmd-mod-code">MÓDULO 1</span>
                                    <span class="path-standard-badge" id="wmd-level-tag">CEFR A2-B1</span>
                                </div>
                                <h3 class="wmd-title" id="wmd-title">OT/ICS Zero-Trust Architecture</h3>
                                <div class="wmd-subtitle" id="wmd-subtitle">Arquitectura Zero-Trust en OT/ICS y Redes Aisladas</div>
                            </div>
                            <button class="wmd-close-btn" id="wmd-btn-close"><i class="fa-solid fa-xmark"></i></button>
                        </div>

                        <div class="wmd-stats-grid">
                            <div class="wmd-stat-box">
                                <span class="wmd-stat-lbl">Lecturas ESP</span>
                                <span class="wmd-stat-val" id="wmd-stat-readings">2 Lecturas</span>
                            </div>
                            <div class="wmd-stat-box">
                                <span class="wmd-stat-lbl">Tiempo Estimado</span>
                                <span class="wmd-stat-val" id="wmd-stat-time">~18 min</span>
                            </div>
                            <div class="wmd-stat-box">
                                <span class="wmd-stat-lbl">Recompensa</span>
                                <span class="wmd-stat-val" id="wmd-stat-xp" style="color:#fbbf24;">+150 XP</span>
                            </div>
                            <div class="wmd-stat-box">
                                <span class="wmd-stat-lbl">Estado</span>
                                <span class="wmd-stat-val" id="wmd-stat-status" style="color:#38bdf8;">En Curso</span>
                            </div>
                        </div>

                        <div class="wmd-readings-list" id="wmd-readings-list">
                            <!-- Readings injected here -->
                        </div>

                        <div class="wmd-actions-row">
                            <button class="wmd-btn-primary" id="wmd-btn-launch-primary">
                                <i class="fa-solid fa-rocket"></i>
                                <span>Iniciar Módulo Directo</span>
                            </button>
                            <button class="wmd-btn-secondary" id="wmd-btn-launch-socratic" style="display:none;">
                                <i class="fa-solid fa-brain"></i>
                                <span>Reto Socrático</span>
                            </button>
                            <button class="wmd-btn-secondary" id="wmd-btn-toggle-complete">
                                <i class="fa-solid fa-circle-check"></i>
                                <span id="wmd-toggle-complete-text">Marcar Completado</span>
                            </button>
                        </div>
                    </div>

                    <!-- Toast Notification -->
                    <div class="world-toast" id="world-toast">
                        <i class="fa-solid fa-sparkles" style="color:#fbbf24;"></i>
                        <span id="world-toast-text">¡Módulo Desbloqueado!</span>
                    </div>
                </div>
            `;

            // Cache DOM references
            this.els.wrap = document.getElementById('world-experience-wrap');
            this.els.canvas = document.getElementById('world-globe-canvas');
            this.els.viewport = document.getElementById('world-globe-viewport');
            this.els.tooltip = document.getElementById('world-hover-tooltip');
            this.els.pathView = document.getElementById('world-level-path-view');
            this.els.drawer = document.getElementById('world-module-drawer');
            this.els.backdrop = document.getElementById('wmd-backdrop');
            this.els.toast = document.getElementById('world-toast');

            this.canvas = this.els.canvas;
            this.ctx = this.canvas.getContext('2d');

            // Populate Track Select Dropdown
            const trackSelect = document.getElementById('path-track-select');
            if (trackSelect) {
                trackSelect.innerHTML = '';
                for (let trKey in this.courses) {
                    const tr = this.courses[trKey];
                    const opt = document.createElement('option');
                    opt.value = trKey;
                    opt.textContent = `${tr.titleEN || tr.title} (${tr.modules ? tr.modules.length : 0} M)`;
                    trackSelect.appendChild(opt);
                }
                trackSelect.addEventListener('change', (e) => {
                    this.openWorldPath(e.target.value);
                });
            }
        }

        setupStars(count = 140) {
            this.stars = [];
            for (let i = 0; i < count; i++) {
                this.stars.push({
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                    z: Math.random() * 0.8 + 0.2,
                    size: Math.random() * 1.8 + 0.6,
                    baseAlpha: Math.random() * 0.7 + 0.3,
                    twinkleSpeed: Math.random() * 0.04 + 0.01,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        buildSphereNodes() {
            this.nodes = [];

            // Canonical 26-course sequential learning route (Super Mario / Duolingo Expedition)
            const CURRICULUM_SEQUENCE = [
                'cybersecurity',
                'it-innovation',
                'ai-ml',
                'telecom-iot',
                'software-dev',
                'data-analytics',
                'semiconductors',
                'electromobility',
                'aerospace',
                'robotics-automation',
                'energy-renewables',
                'advanced-manufacturing',
                'industrial-operations',
                'mechatronics',
                'biotechnology',
                'space-satellite',
                'environmental-sustainability',
                'healthcare-tech',
                'materials-nanotech',
                'food-science',
                'aviation-english',
                'airforce-aerospace',
                'hospitality-food',
                'business-leadership',
                'project-management',
                'entrepreneurship'
            ];

            // Build ordered list from courses
            const orderedTracks = [];
            const addedSet = new Set();

            CURRICULUM_SEQUENCE.forEach(id => {
                if (this.courses[id]) {
                    orderedTracks.push({ id, ...this.courses[id] });
                    addedSet.add(id);
                }
            });

            // Append any extra tracks that may exist in catalog
            for (let trKey in this.courses) {
                if (!addedSet.has(trKey)) {
                    orderedTracks.push({ id: trKey, ...this.courses[trKey] });
                    addedSet.add(trKey);
                }
            }

            const total = orderedTracks.length;
            if (total === 0) return;

            orderedTracks.forEach((track, idx) => {
                const cat = track.category || 'technology';
                const stepNumber = idx + 1;
                const isStart = (idx === 0);
                const isFinish = (idx === total - 1);

                // Smooth spherical spiral progression around the 3D globe:
                // Traversing ~2.2 full revolutions from North (+0.65 rad) down to South (-0.65 rad)
                const frac = total > 1 ? idx / (total - 1) : 0.5;
                const lon = 0.35 + frac * (4.4 * Math.PI);
                let lat = 0.65 - frac * 1.30 + (Math.sin(idx * 1.35) * 0.08);
                lat = Math.max(-1.15, Math.min(1.15, lat));

                // Spherical to Cartesian coordinates on unit sphere (Radius = 1)
                const x = Math.cos(lat) * Math.sin(lon);
                const y = Math.sin(lat);
                const z = Math.cos(lat) * Math.cos(lon);

                this.nodes.push({
                    id: track.id,
                    stepNumber: stepNumber,
                    isStart: isStart,
                    isFinish: isFinish,
                    title: track.titleEN || track.title,
                    titleES: track.title,
                    category: cat,
                    standard: track.standard || 'IEEE/ISO',
                    modules: track.modules || [],
                    icon: DEFAULT_TRACK_ICONS[track.id] || 'fa-book-open',
                    // Unit sphere position
                    ux: x,
                    uy: y,
                    uz: z,
                    // Projected 2D screen coordinates
                    sx: 0,
                    sy: 0,
                    sz: 0,
                    screenRadius: 18,
                    visible: true
                });
            });
        }

        getUserProgress() {
            let prog = {
                completedReadings: {},
                completedModules: {},
                completedTracks: {}
            };
            try {
                const saved = localStorage.getItem('stemos_user_progress');
                if (saved) {
                    prog = JSON.parse(saved);
                }
            } catch (e) {}
            return prog;
        }

        handleResize() {
            if (!this.canvas || !this.els.viewport) return;
            const rect = this.els.viewport.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const w = rect.width;
            const h = rect.height;

            this.canvas.width = Math.round(w * dpr);
            this.canvas.height = Math.round(h * dpr);
            this.canvas.style.width = `${w}px`;
            this.canvas.style.height = `${h}px`;

            // Adjust base sphere radius based on viewport
            this.radius = Math.min(w, h) * 0.38;
            if (w < 600) this.radius = Math.min(w, h) * 0.42;
        }

        bindEvents() {
            const vp = this.els.viewport;
            if (!vp) return;

            // Touch / Mouse Down
            const onDown = (clientX, clientY) => {
                this.isDragging = true;
                this.autoRotate = false;
                this.lastPointerX = clientX;
                this.lastPointerY = clientY;
                vp.classList.add('dragging');
            };

            // Touch / Mouse Move
            const onMove = (clientX, clientY) => {
                if (!this.isDragging) {
                    // Check hover
                    this.checkHover(clientX, clientY);
                    return;
                }

                const dx = clientX - this.lastPointerX;
                const dy = clientY - this.lastPointerY;

                this.vx = dx * 0.005;
                this.vy = dy * 0.005;

                this.targetYaw += this.vx;
                this.targetPitch += this.vy; // Natural scroll: dragging up moves globe up

                // Clamp pitch to avoid gimbal flip
                this.targetPitch = Math.max(-1.3, Math.min(1.3, this.targetPitch));

                this.lastPointerX = clientX;
                this.lastPointerY = clientY;
            };

            // Touch / Mouse Up
            const onUp = (clientX, clientY, isClick) => {
                if (this.isDragging) {
                    this.isDragging = false;
                    vp.classList.remove('dragging');
                }
                if (isClick && this.hoveredNode) {
                    this.sound.playWarp();
                    this.openWorldPath(this.hoveredNode.id);
                }
            };

            // Pointer / Mouse events
            let startClickX = 0, startClickY = 0;
            vp.addEventListener('mousedown', (e) => {
                startClickX = e.clientX;
                startClickY = e.clientY;
                onDown(e.clientX, e.clientY);
            });

            window.addEventListener('mousemove', (e) => {
                onMove(e.clientX, e.clientY);
            });

            window.addEventListener('mouseup', (e) => {
                const dist = Math.hypot(e.clientX - startClickX, e.clientY - startClickY);
                const isClick = dist < 6;
                onUp(e.clientX, e.clientY, isClick);
            });

            // Wheel for zoom
            vp.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + delta));
            }, { passive: false });

            // Touch support
            vp.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    startClickX = e.touches[0].clientX;
                    startClickY = e.touches[0].clientY;
                    onDown(e.touches[0].clientX, e.touches[0].clientY);
                } else if (e.touches.length === 2) {
                    this.pinchDist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            }, { passive: true });

            vp.addEventListener('touchmove', (e) => {
                if (e.touches.length === 1) {
                    onMove(e.touches[0].clientX, e.touches[0].clientY);
                } else if (e.touches.length === 2 && this.pinchDist) {
                    const newDist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    const diff = (newDist - this.pinchDist) * 0.005;
                    this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + diff));
                    this.pinchDist = newDist;
                }
            }, { passive: true });

            vp.addEventListener('touchend', (e) => {
                if (e.touches.length === 0) {
                    const lastTouch = e.changedTouches[0];
                    const dist = Math.hypot(lastTouch.clientX - startClickX, lastTouch.clientY - startClickY);
                    const isClick = dist < 12;
                    this.pinchDist = null;
                    onUp(lastTouch.clientX, lastTouch.clientY, isClick);
                }
            }, { passive: true });

            // Realm Filter Chips
            const filterBtns = this.container.querySelectorAll('.realm-filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.setRealmFilter(btn.dataset.cat);
                });
            });

            // HUD Controls
            const btnZoomIn = document.getElementById('wm-btn-zoom-in');
            const btnZoomOut = document.getElementById('wm-btn-zoom-out');
            const btnAuto = document.getElementById('wm-btn-autorotate');
            const btnReset = document.getElementById('wm-btn-reset-cam');
            const btnSound = document.getElementById('wm-btn-sound');

            if (btnZoomIn) btnZoomIn.addEventListener('click', () => {
                this.targetZoom = Math.min(this.maxZoom, this.targetZoom + 0.25);
                this.sound.playBlip(700, 0.05);
            });
            if (btnZoomOut) btnZoomOut.addEventListener('click', () => {
                this.targetZoom = Math.max(this.minZoom, this.targetZoom - 0.25);
                this.sound.playBlip(500, 0.05);
            });
            if (btnAuto) btnAuto.addEventListener('click', () => {
                this.autoRotate = !this.autoRotate;
                btnAuto.classList.toggle('active', this.autoRotate);
                this.sound.playBlip(600, 0.05);
            });
            if (btnReset) btnReset.addEventListener('click', () => {
                this.targetPitch = 0.25;
                this.targetYaw = 0.35;
                this.targetZoom = 1.0;
                this.autoRotate = true;
                this.sound.playBlip(800, 0.06);
            });
            if (btnSound) btnSound.addEventListener('click', () => {
                const muted = this.sound.toggleMute();
                btnSound.classList.toggle('active', !muted);
                btnSound.innerHTML = `<i class="fa-solid ${!muted ? 'fa-volume-high' : 'fa-volume-xmark'}"></i>`;
                this.showToast(!muted ? 'Audio FX activado' : 'Audio FX silenciado');
                if (!muted) this.sound.playBlip(750, 0.08);
            });

            // stemBOT 3D Globe HUD Companion
            const botHud = document.getElementById('stembot-globe-hud');
            if (botHud) {
                botHud.addEventListener('click', () => {
                    this.triggerStemBotHudTip();
                });
                botHud.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.triggerStemBotHudTip();
                    }
                });
            }

            // Level Path Back Button
            const btnBack = document.getElementById('path-btn-back');
            if (btnBack) {
                btnBack.addEventListener('click', () => {
                    this.closeWorldPath();
                });
            }

            // Module Drawer Close & Backdrop
            const btnCloseDrawer = document.getElementById('wmd-btn-close');
            if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', () => this.closeDrawer());
            if (this.els.backdrop) this.els.backdrop.addEventListener('click', () => this.closeDrawer());
        }

        setRealmFilter(cat) {
            this.activeFilter = cat;
            this.sound.playBlip(650, 0.06);

            // Rotate smoothly to center that realm's starting node along the sequential route
            if (cat === 'all') {
                this.targetYaw = 0.35;
                this.targetPitch = 0.25;
            } else {
                const targetNode = this.nodes.find(n => n.category === cat);
                if (targetNode) {
                    this.targetYaw = -Math.atan2(targetNode.ux, targetNode.uz);
                    this.targetPitch = Math.atan2(targetNode.uy, Math.hypot(targetNode.ux, targetNode.uz));
                    this.targetPitch = Math.max(-0.8, Math.min(0.8, this.targetPitch));
                }
            }
            this.targetZoom = 1.15;
            this.autoRotate = false;
        }

        checkHover(clientX, clientY) {
            if (!this.canvas || this.isDragging) return;
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = clientX - rect.left;
            const mouseY = clientY - rect.top;

            let closest = null;
            let minDist = 34; // hit radius

            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                if (!node.visible || node.sz <= 0) continue; // Only front-facing nodes
                if (this.activeFilter !== 'all' && node.category !== this.activeFilter) continue;

                const dist = Math.hypot(mouseX - node.sx, mouseY - node.sy);
                if (dist < minDist) {
                    minDist = dist;
                    closest = node;
                }
            }

            if (closest !== this.hoveredNode) {
                this.hoveredNode = closest;
                if (this.hoveredNode) {
                    this.sound.playBlip(880, 0.03);
                    this.showTooltip(this.hoveredNode, rect);
                } else {
                    this.hideTooltip();
                }
            }
        }

        showTooltip(node, canvasRect) {
            const tip = this.els.tooltip;
            if (!tip) return;

            const catMeta = REALM_META[node.category] || REALM_META.technology;
            const prog = this.getUserProgress();
            const trackMods = node.modules || [];
            let completedCount = 0;
            trackMods.forEach(m => {
                if (prog.completedModules && prog.completedModules[m.id]) completedCount++;
            });

            document.getElementById('wtt-cat-tag').textContent = catMeta.label;
            document.getElementById('wtt-cat-tag').style.background = `${catMeta.color}22`;
            document.getElementById('wtt-cat-tag').style.color = catMeta.color;
            document.getElementById('wtt-cat-tag').style.border = `1px solid ${catMeta.color}55`;

            document.getElementById('wtt-title').textContent = node.title;
            document.getElementById('wtt-modules-count').innerHTML = `<i class="fa-solid fa-cubes"></i> ${trackMods.length} Módulos`;
            document.getElementById('wtt-stars-count').innerHTML = `<i class="fa-solid fa-star" style="color:#fbbf24;"></i> ${completedCount} / ${trackMods.length} Aprobados`;

            tip.style.left = `${node.sx}px`;
            tip.style.top = `${node.sy}px`;
            tip.classList.add('visible');
        }

        hideTooltip() {
            if (this.els.tooltip) {
                this.els.tooltip.classList.remove('visible');
            }
        }

        /* ─── 3D PROJECTION & RENDERING LOOP ───────────────────────── */
        startLoop() {
            const render = () => {
                this.updatePhysics();
                this.draw();
                this.animFrameId = requestAnimationFrame(render);
            };
            this.animFrameId = requestAnimationFrame(render);
        }

        updatePhysics() {
            // Smooth yaw and pitch damping
            this.yaw += (this.targetYaw - this.yaw) * 0.12;
            this.pitch += (this.targetPitch - this.pitch) * 0.12;
            this.zoom += (this.targetZoom - this.zoom) * 0.15;

            // Auto-rotate if enabled
            if (this.autoRotate && !this.isDragging) {
                this.targetYaw += 0.0028;
            }

            // Inertia decay
            if (!this.isDragging) {
                this.targetYaw += this.vx;
                this.targetPitch += this.vy; // Natural scroll inertia
                this.targetPitch = Math.max(-1.3, Math.min(1.3, this.targetPitch));
                this.vx *= 0.92;
                this.vy *= 0.92;
            }
        }

        draw() {
            if (!this.ctx || !this.canvas) return;
            const ctx = this.ctx;
            const dpr = window.devicePixelRatio || 1;
            const width = this.canvas.width / dpr;
            const height = this.canvas.height / dpr;
            const cx = width / 2;
            const cy = height / 2;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Starfield (Micro-quantum particles for White Mode)
            this.drawStarfield(ctx, width, height, cx, cy);

            // 2. Draw 3D Globe Core (Pearl White Sphere & Aurora Halo)
            const curRadius = this.radius * this.zoom;
            this.drawGlobeAtmosphere(ctx, cx, cy, curRadius);

            // 3. Draw Latitude & Longitude Coordinate Grid (Holographic Slate/Cyan)
            this.draw3DGridLines(ctx, cx, cy, curRadius);

            // 4. Project all Nodes in 3D
            const cosPitch = Math.cos(this.pitch);
            const sinPitch = Math.sin(this.pitch);
            const cosYaw = Math.cos(this.yaw);
            const sinYaw = Math.sin(this.yaw);

            this.nodes.forEach(node => {
                // Apply 3D Rotation Matrix:
                // First rotate around Y axis (Yaw)
                const x1 = node.ux * cosYaw + node.uz * sinYaw;
                const y1 = node.uy;
                const z1 = -node.ux * sinYaw + node.uz * cosYaw;

                // Then rotate around X axis (Pitch)
                const x2 = x1;
                const y2 = y1 * cosPitch - z1 * sinPitch;
                const z2 = y1 * sinPitch + z1 * cosPitch;

                // Perspective projection
                const camDistance = 2.4;
                const scale = (camDistance / (camDistance - z2 * 0.45)) * this.zoom;

                node.sx = cx + x2 * this.radius * scale;
                node.sy = cy - y2 * this.radius * scale;
                node.sz = z2; // depth
                node.screenRadius = Math.max(12, 18 * scale);
            });

            // 5. Draw Sequential Curriculum Expedition Path (Step 1 -> 2 -> ... -> 26)
            this.drawSequentialCurriculumPath(ctx, cx, cy, curRadius);

            // 6. Draw Back-facing Nodes (Translucent depth cues)
            this.nodes.forEach(node => {
                if (node.sz <= 0) {
                    this.drawNode(ctx, node, false);
                }
            });

            // 7. Draw Globe Front Rim Glow
            this.drawGlobeRimGlow(ctx, cx, cy, curRadius);

            // 8. Draw Front-facing Nodes (White Tech Pucks & Step Numbers)
            const frontNodes = this.nodes.filter(n => n.sz > 0).sort((a, b) => a.sz - b.sz);
            frontNodes.forEach(node => {
                this.drawNode(ctx, node, true);
            });

            ctx.restore();
        }

        drawStarfield(ctx, width, height, cx, cy) {
            const time = Date.now() * 0.001;
            const colors = [
                'rgba(14, 165, 233, ',  // sky cyan
                'rgba(168, 85, 247, ',  // violet
                'rgba(52, 211, 153, ',  // emerald
                'rgba(245, 158, 11, '   // amber
            ];

            this.stars.forEach((star, idx) => {
                const alpha = Math.max(0.1, Math.min(0.65, star.baseAlpha + Math.sin(time * star.twinkleSpeed * 40 + star.phase) * 0.25));
                const x = cx + star.x * (width * 0.55) + Math.sin(this.yaw * 0.2) * 20 * star.z;
                const y = cy + star.y * (height * 0.55) + Math.sin(this.pitch * 0.2) * 20 * star.z;
                const colPrefix = colors[idx % colors.length];

                ctx.fillStyle = `${colPrefix}${alpha * 0.45})`;
                ctx.beginPath();
                ctx.arc(x, y, star.size * 0.9, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        drawGlobeAtmosphere(ctx, cx, cy, radius) {
            ctx.save();

            // 1. Pearl White Spherical Core with subtle technological gradient
            const grad = ctx.createRadialGradient(
                cx - radius * 0.25, cy - radius * 0.25, radius * 0.05,
                cx, cy, radius
            );
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.45, '#f8fafc');
            grad.addColorStop(0.80, '#f1f5f9');
            grad.addColorStop(0.95, '#e2e8f0');
            grad.addColorStop(1.0, '#cbd5e1');

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            // 2. Tech Aurora Outer Halo
            const outerGlow = ctx.createRadialGradient(cx, cy, radius * 0.96, cx, cy, radius * 1.25);
            outerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
            outerGlow.addColorStop(0.45, 'rgba(168, 85, 247, 0.14)');
            outerGlow.addColorStop(0.8, 'rgba(52, 211, 153, 0.06)');
            outerGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');

            ctx.beginPath();
            ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
            ctx.fillStyle = outerGlow;
            ctx.fill();

            ctx.restore();
        }

        draw3DGridLines(ctx, cx, cy, radius) {
            ctx.save();
            ctx.lineWidth = 1;

            const cosPitch = Math.cos(this.pitch);
            const sinPitch = Math.sin(this.pitch);
            const cosYaw = Math.cos(this.yaw);
            const sinYaw = Math.sin(this.yaw);

            // Parallels (Latitudes)
            const latitudes = [-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9];
            latitudes.forEach(lat => {
                const yUnit = Math.sin(lat);
                const rUnit = Math.cos(lat);
                const segments = 48;

                ctx.beginPath();
                let started = false;

                for (let i = 0; i <= segments; i++) {
                    const lon = (i / segments) * Math.PI * 2;
                    const ux = rUnit * Math.sin(lon);
                    const uy = yUnit;
                    const uz = rUnit * Math.cos(lon);

                    const x1 = ux * cosYaw + uz * sinYaw;
                    const y1 = uy;
                    const z1 = -ux * sinYaw + uz * cosYaw;

                    const x2 = x1;
                    const y2 = y1 * cosPitch - z1 * sinPitch;
                    const z2 = y1 * sinPitch + z1 * cosPitch;

                    const px = cx + x2 * radius;
                    const py = cy - y2 * radius;

                    if (z2 > 0) {
                        ctx.strokeStyle = lat === 0 ? 'rgba(14, 165, 233, 0.38)' : 'rgba(148, 163, 184, 0.28)';
                        ctx.lineWidth = lat === 0 ? 1.4 : 0.9;
                        if (!started) {
                            ctx.moveTo(px, py);
                            started = true;
                        } else {
                            ctx.lineTo(px, py);
                        }
                    } else {
                        started = false;
                    }
                }
                ctx.stroke();
            });

            // Meridians (Longitudes)
            const meridians = 12;
            for (let m = 0; m < meridians; m++) {
                const lon = (m / meridians) * Math.PI * 2;
                const segments = 32;
                ctx.beginPath();
                ctx.lineWidth = 0.9;
                let started = false;

                for (let i = 0; i <= segments; i++) {
                    const lat = -Math.PI / 2 + (i / segments) * Math.PI;
                    const ux = Math.cos(lat) * Math.sin(lon);
                    const uy = Math.sin(lat);
                    const uz = Math.cos(lat) * Math.cos(lon);

                    const x1 = ux * cosYaw + uz * sinYaw;
                    const y1 = uy;
                    const z1 = -ux * sinYaw + uz * cosYaw;

                    const x2 = x1;
                    const y2 = y1 * cosPitch - z1 * sinPitch;
                    const z2 = y1 * sinPitch + z1 * cosPitch;

                    const px = cx + x2 * radius;
                    const py = cy - y2 * radius;

                    if (z2 > 0) {
                        ctx.strokeStyle = 'rgba(148, 163, 184, 0.20)';
                        if (!started) {
                            ctx.moveTo(px, py);
                            started = true;
                        } else {
                            ctx.lineTo(px, py);
                        }
                    } else {
                        started = false;
                    }
                }
                ctx.stroke();
            }

            ctx.restore();
        }

        drawSequentialCurriculumPath(ctx, cx, cy, curRadius) {
            if (this.nodes.length < 2) return;

            const cosPitch = Math.cos(this.pitch);
            const sinPitch = Math.sin(this.pitch);
            const cosYaw = Math.cos(this.yaw);
            const sinYaw = Math.sin(this.yaw);
            const camDist = 2.4;

            const prog = this.getUserProgress();
            const time = Date.now() * 0.001;

            ctx.save();

            // Project a unit sphere vector into screen coordinates and depth
            const projectVec = (ux, uy, uz) => {
                const x1 = ux * cosYaw + uz * sinYaw;
                const y1 = uy;
                const z1 = -ux * sinYaw + uz * cosYaw;

                const x2 = x1;
                const y2 = y1 * cosPitch - z1 * sinPitch;
                const z2 = y1 * sinPitch + z1 * cosPitch;

                const scale = (camDist / (camDist - z2 * 0.45)) * this.zoom;
                return {
                    x: cx + x2 * this.radius * scale,
                    y: cy - y2 * this.radius * scale,
                    z: z2
                };
            };

            // 1. Draw all consecutive path segments (from Step 1 to Step N)
            for (let i = 0; i < this.nodes.length - 1; i++) {
                const nA = this.nodes[i];
                const nB = this.nodes[i + 1];

                const isCompletedA = prog.completedTracks && prog.completedTracks[nA.id];
                const isFilterDim = (this.activeFilter !== 'all' && nA.category !== this.activeFilter && nB.category !== this.activeFilter);

                // Spherical arc sampling (10 points between nA and nB)
                const arcSteps = 10;
                const arcPoints = [];

                for (let s = 0; s <= arcSteps; s++) {
                    const frac = s / arcSteps;
                    // Spherical linear interpolation / normalized lerp
                    const ux = (1 - frac) * nA.ux + frac * nB.ux;
                    const uy = (1 - frac) * nA.uy + frac * nB.uy;
                    const uz = (1 - frac) * nA.uz + frac * nB.uz;
                    const len = Math.hypot(ux, uy, uz) || 1;
                    const p = projectVec(ux / len, uy / len, uz / len);
                    arcPoints.push(p);
                }

                // Draw Back Arc (when behind the globe)
                ctx.save();
                ctx.setLineDash([4, 6]);
                ctx.lineWidth = 1.5 * this.zoom;
                ctx.strokeStyle = isFilterDim ? 'rgba(203, 213, 225, 0.15)' : 'rgba(148, 163, 184, 0.25)';
                ctx.beginPath();
                let backStarted = false;
                for (let k = 0; k < arcPoints.length; k++) {
                    const pt = arcPoints[k];
                    if (pt.z <= 0) {
                        if (!backStarted) {
                            ctx.moveTo(pt.x, pt.y);
                            backStarted = true;
                        } else {
                            ctx.lineTo(pt.x, pt.y);
                        }
                    } else {
                        backStarted = false;
                    }
                }
                ctx.stroke();
                ctx.restore();

                // Draw Front Arc (luminous glowing path line)
                ctx.save();
                ctx.setLineDash([]);
                let frontStarted = false;

                // Pass 1: Outer soft neon aura
                ctx.beginPath();
                for (let k = 0; k < arcPoints.length; k++) {
                    const pt = arcPoints[k];
                    if (pt.z > -0.05) {
                        if (!frontStarted) {
                            ctx.moveTo(pt.x, pt.y);
                            frontStarted = true;
                        } else {
                            ctx.lineTo(pt.x, pt.y);
                        }
                    } else {
                        frontStarted = false;
                    }
                }
                ctx.lineWidth = Math.max(5, 7.5 * this.zoom);
                ctx.strokeStyle = isCompletedA 
                    ? (isFilterDim ? 'rgba(52, 211, 153, 0.12)' : 'rgba(52, 211, 153, 0.30)')
                    : (isFilterDim ? 'rgba(14, 165, 233, 0.10)' : 'rgba(14, 165, 233, 0.28)');
                ctx.stroke();

                // Pass 2: Core solid tech line
                ctx.lineWidth = Math.max(2.2, 3.2 * this.zoom);
                ctx.strokeStyle = isCompletedA
                    ? (isFilterDim ? 'rgba(16, 185, 129, 0.35)' : '#10b981')
                    : (isFilterDim ? 'rgba(2, 132, 199, 0.30)' : '#0284c7');
                ctx.stroke();

                // Pass 3: Directional Flow Indicator (Arrow chevrons along path)
                const midIdx = Math.floor(arcSteps / 2);
                const pMid = arcPoints[midIdx];
                const pNext = arcPoints[midIdx + 1];
                if (pMid.z > 0.1 && pNext && !isFilterDim) {
                    const angle = Math.atan2(pNext.y - pMid.y, pNext.x - pMid.x);
                    const arrowLen = 6 * this.zoom;
                    ctx.save();
                    ctx.translate(pMid.x, pMid.y);
                    ctx.rotate(angle);
                    ctx.beginPath();
                    ctx.moveTo(-arrowLen, -arrowLen * 0.6);
                    ctx.lineTo(0, 0);
                    ctx.lineTo(-arrowLen, arrowLen * 0.6);
                    ctx.strokeStyle = isCompletedA ? '#059669' : '#0284c7';
                    ctx.lineWidth = 2 * this.zoom;
                    ctx.stroke();
                    ctx.restore();
                }

                ctx.restore();
            }

            // 2. Animated Energy Comet Pulse traversing along the path (Step 1 -> Step N)
            const totalSegments = this.nodes.length - 1;
            const cometPos = (time * 0.9 * totalSegments * 0.35) % totalSegments;
            const segIndex = Math.floor(cometPos);
            const segFrac = cometPos - segIndex;

            if (segIndex >= 0 && segIndex < totalSegments) {
                const nA = this.nodes[segIndex];
                const nB = this.nodes[segIndex + 1];
                const ux = (1 - segFrac) * nA.ux + segFrac * nB.ux;
                const uy = (1 - segFrac) * nA.uy + segFrac * nB.uy;
                const uz = (1 - segFrac) * nA.uz + segFrac * nB.uz;
                const len = Math.hypot(ux, uy, uz) || 1;
                const cPt = projectVec(ux / len, uy / len, uz / len);

                if (cPt.z > 0.05) {
                    // Pulsing luminous energy orb
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(cPt.x, cPt.y, 11 * this.zoom, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(cPt.x, cPt.y, 5 * this.zoom, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#0284c7';
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.restore();
                }
            }

            ctx.restore();
        }

        drawGlobeRimGlow(ctx, cx, cy, radius) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.45)';
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.restore();
        }

        drawNode(ctx, node, isFront) {
            const catMeta = REALM_META[node.category] || REALM_META.technology;
            const isHovered = this.hoveredNode === node;
            const isFilterDim = this.activeFilter !== 'all' && node.category !== this.activeFilter;

            ctx.save();

            if (!isFront) {
                // Back-facing node: semi-transparent, subtle depth fog
                ctx.globalAlpha = isFilterDim ? 0.04 : 0.22;
                ctx.beginPath();
                ctx.arc(node.sx, node.sy, node.screenRadius * 0.65, 0, Math.PI * 2);
                ctx.fillStyle = catMeta.color;
                ctx.fill();
                ctx.restore();
                return;
            }

            // Front-facing node (White Tech Mode Puck)
            ctx.globalAlpha = isFilterDim ? 0.25 : 1;

            // Hover Halo
            if (isHovered) {
                ctx.beginPath();
                ctx.arc(node.sx, node.sy, node.screenRadius * 1.6, 0, Math.PI * 2);
                ctx.fillStyle = catMeta.glow;
                ctx.fill();
            }

            // Step 1 START Beacon: Pulsing radar rings
            if (node.isStart && !isFilterDim) {
                const pulse = (Date.now() * 0.0025) % 1;
                ctx.beginPath();
                ctx.arc(node.sx, node.sy, node.screenRadius + pulse * 18 * this.zoom, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(2, 132, 199, ${(1 - pulse) * 0.8})`;
                ctx.lineWidth = 2.2;
                ctx.stroke();
            }

            // Outer drop shadow on white sphere
            ctx.save();
            ctx.shadowColor = 'rgba(15, 23, 42, 0.14)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 3;

            // Disc Background: Crisp White Puck
            ctx.beginPath();
            ctx.arc(node.sx, node.sy, node.screenRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.restore();

            // Disc Border: Realm Colored Ring
            ctx.beginPath();
            ctx.arc(node.sx, node.sy, node.screenRadius, 0, Math.PI * 2);
            ctx.lineWidth = isHovered ? 3.8 : 2.8;
            ctx.strokeStyle = isHovered ? '#0284c7' : catMeta.color;
            ctx.stroke();

            // Inner Step Number inside Puck
            ctx.font = `800 ${Math.max(10, Math.round(node.screenRadius * 0.88))}px Outfit, 'Plus Jakarta Sans', sans-serif`;
            ctx.fillStyle = catMeta.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.stepNumber || '', node.sx, node.sy + 0.5);

            // Progress status check
            const prog = this.getUserProgress();
            const isCompleted = prog.completedTracks && prog.completedTracks[node.id];

            if (isCompleted) {
                // Completed indicator green badge
                ctx.fillStyle = '#10b981';
                ctx.beginPath();
                ctx.arc(node.sx + node.screenRadius * 0.72, node.sy - node.screenRadius * 0.72, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            // Step 1 START Flag / Badge Pill
            if (node.isStart && node.sz > 0.15 && !isFilterDim) {
                const badgeText = 'INICIO 1';
                ctx.font = '800 9.5px Outfit, sans-serif';
                const m = ctx.measureText(badgeText);
                const bW = m.width + 12;
                const bH = 16;
                const bX = node.sx - bW / 2;
                const bY = node.sy - node.screenRadius - 18;

                ctx.fillStyle = '#0284c7';
                ctx.beginPath();
                ctx.roundRect(bX, bY, bW, bH, 8);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(badgeText, node.sx, bY + bH / 2);
            }

            // Step 26 META Flag / Badge Pill
            if (node.isFinish && node.sz > 0.15 && !isFilterDim) {
                const badgeText = 'META 26';
                ctx.font = '800 9.5px Outfit, sans-serif';
                const m = ctx.measureText(badgeText);
                const bW = m.width + 12;
                const bH = 16;
                const bX = node.sx - bW / 2;
                const bY = node.sy - node.screenRadius - 18;

                ctx.fillStyle = '#d97706';
                ctx.beginPath();
                ctx.roundRect(bX, bY, bW, bH, 8);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(badgeText, node.sx, bY + bH / 2);
            }

            // Node Title Pill (Floating text badge below node)
            if (node.sz > 0.22 && !isFilterDim) {
                const cleanTitle = node.title.length > 20 ? node.title.substring(0, 18) + '…' : node.title;
                const labelText = `${node.stepNumber}. ${cleanTitle}`;
                ctx.font = '700 11px Outfit, Inter, sans-serif';
                const textMetrics = ctx.measureText(labelText);
                const padX = 8;
                const pillW = textMetrics.width + padX * 2;
                const pillH = 19;
                const pillX = node.sx - pillW / 2;
                const pillY = node.sy + node.screenRadius + 4;

                // Pill background in White Mode
                ctx.save();
                ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 2;
                ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.94)';
                ctx.beginPath();
                ctx.roundRect(pillX, pillY, pillW, pillH, 6);
                ctx.fill();
                ctx.restore();

                ctx.lineWidth = 1;
                ctx.strokeStyle = isHovered ? catMeta.color : 'rgba(203, 213, 225, 0.9)';
                ctx.stroke();

                // Pill Text
                ctx.fillStyle = '#0f172a';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(labelText, node.sx, pillY + pillH / 2);
            }

            ctx.restore();
        }

        /* ==========================================================================
           LEVEL PATH VIEW (SUPER MARIO BROS & DUOLINGO WINDING PATH)
           ========================================================================== */
        openWorldPath(trackId) {
            const track = this.courses[trackId];
            if (!track) return;
            this.selectedTrackId = trackId;

            this.hideTooltip();
            const catMeta = REALM_META[track.category] || REALM_META.technology;
            const prog = this.getUserProgress();

            // 1. Update Header Card
            const catBadge = document.getElementById('path-cat-badge');
            const stdBadge = document.getElementById('path-standard-badge');
            const titleEl = document.getElementById('path-track-title');
            const statProg = document.getElementById('path-stat-progress-text');
            const selectEl = document.getElementById('path-track-select');

            if (catBadge) {
                catBadge.textContent = catMeta.label.toUpperCase();
                catBadge.style.background = `${catMeta.color}22`;
                catBadge.style.color = catMeta.color;
                catBadge.style.border = `1px solid ${catMeta.color}55`;
            }
            if (stdBadge) stdBadge.textContent = `Nivel ${track.level || 'A2-B1'} &bull; ${track.standard || 'IEEE/ISO'}`;
            if (titleEl) titleEl.textContent = track.titleEN || track.title;
            if (selectEl) selectEl.value = trackId;

            // Compute Progress
            const modules = track.modules || [];
            let completedCount = 0;
            modules.forEach(m => {
                if (prog.completedModules && prog.completedModules[m.id]) completedCount++;
            });

            if (statProg) {
                statProg.textContent = `${completedCount}/${modules.length} Módulos Conquistados (${Math.round((completedCount / (modules.length || 1)) * 100)}%)`;
            }

            // 2. Render Winding Path Steps
            this.renderWindingPath(track, prog);

            // 3. Open Path View with animation
            if (this.els.pathView) {
                this.els.pathView.classList.add('active');
                this.els.pathView.scrollTop = 0;
            }

            // Greet user with stemBOT musical chime
            this.sound.playRobotGreet();
        }

        closeWorldPath() {
            if (this.els.pathView) {
                this.els.pathView.classList.remove('active');
            }
            this.selectedTrackId = null;
            this.sound.playBlip(550, 0.05);
        }

        renderWindingPath(track, prog) {
            const container = document.getElementById('path-nodes-layer');
            const svgTrail = document.getElementById('path-svg-trail');
            const bgPath = document.getElementById('path-svg-line-bg');
            const glowPath = document.getElementById('path-svg-line-glow');
            if (!container) return;

            container.innerHTML = '';
            const modules = track.modules || [];
            if (modules.length === 0) {
                container.innerHTML = `<div style="text-align:center;padding:40px;color:#94a3b8;">No hay módulos registrados en este mundo.</div>`;
                return;
            }

            const alignments = ['align-left', 'align-center', 'align-right', 'align-center'];
            let activeNodeFound = false;

            modules.forEach((mod, idx) => {
                const isCompleted = prog.completedModules && prog.completedModules[mod.id] === true;
                const isPrevCompleted = idx === 0 || (prog.completedModules && prog.completedModules[modules[idx - 1].id] === true);
                const isUnlocked = isCompleted || isPrevCompleted;
                const isActive = isUnlocked && !isCompleted && !activeNodeFound;
                if (isActive) activeNodeFound = true;

                const alignClass = alignments[idx % alignments.length];
                const iconClass = mod.icon || 'fa-solid fa-microchip';
                const totalReadings = mod.readings ? mod.readings.length : 0;

                const stepEl = document.createElement('div');
                stepEl.className = `path-level-step ${alignClass} ${isCompleted ? 'completed' : isActive ? 'active-node' : isUnlocked ? 'unlocked' : 'locked'}`;

                let statusPill = `<span class="plc-status-pill" style="background:#0284c722;color:#0284c7;">En Curso</span>`;
                if (isCompleted) {
                    statusPill = `<span class="plc-status-pill" style="background:#05966922;color:#059669;"><i class="fa-solid fa-check-double"></i> Aprobado</span>`;
                } else if (!isUnlocked) {
                    statusPill = `<span class="plc-status-pill" style="background:rgba(15,23,42,0.06);color:#64748b;"><i class="fa-solid fa-lock"></i> Bloqueado</span>`;
                }

                // stemBOT Mascot HTML if this is the active node
                const mascotHtml = isActive ? this.createStemBotHtml({ isChampion: false }) : '';

                // Star crown if completed
                const starCrownHtml = isCompleted ? `
                    <div class="path-star-crown">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                ` : '';

                stepEl.innerHTML = `
                    <div class="path-node-disc" data-mod-id="${mod.id}" title="${mod.title}">
                        ${mascotHtml}
                        ${starCrownHtml}
                        <span class="node-m-num">M${idx + 1}</span>
                        <i class="${isUnlocked ? iconClass : 'fa-solid fa-lock'} node-m-icon"></i>
                    </div>

                    <div class="path-level-card">
                        ${statusPill}
                        <div class="plc-title">${mod.titleES || mod.title}</div>
                        <div class="plc-meta"><i class="fa-solid fa-book-open"></i> ${totalReadings} Lecturas &bull; ~${totalReadings * 8 + 5} min</div>
                    </div>
                `;

                // Click event on stepping stone disc
                const disc = stepEl.querySelector('.path-node-disc');
                if (disc) {
                    disc.addEventListener('click', () => {
                        this.sound.playBlip(750, 0.06);
                        this.openModuleDrawer(track.id, mod, idx, isUnlocked, isCompleted);
                    });
                }

                container.appendChild(stepEl);
            });

            // If all are completed, place mascot on the final node in champion mode!
            if (!activeNodeFound && modules.length > 0) {
                const lastStep = container.querySelector('.path-level-step:last-child .path-node-disc');
                if (lastStep) {
                    lastStep.insertAdjacentHTML('afterbegin', this.createStemBotHtml({ isChampion: true }));
                }
            }

            // Attach interactive click & hover handlers to stemBOT
            const stemBotMascot = container.querySelector('#path-stembot-mascot');
            if (stemBotMascot) {
                stemBotMascot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.onStemBotClicked(stemBotMascot);
                });
                stemBotMascot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        this.onStemBotClicked(stemBotMascot);
                    }
                });
            }

            // Draw SVG Bezier Curve Trail connecting discs
            setTimeout(() => this.drawSvgCurveTrail(), 60);
        }

        drawSvgCurveTrail() {
            const wrap = document.getElementById('path-winding-trail-wrap');
            const bgPath = document.getElementById('path-svg-line-bg');
            const glowPath = document.getElementById('path-svg-line-glow');
            if (!wrap || !bgPath || !glowPath) return;

            const discs = wrap.querySelectorAll('.path-node-disc');
            if (discs.length < 2) return;

            const wrapRect = wrap.getBoundingClientRect();
            const points = [];

            discs.forEach(disc => {
                const rect = disc.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) - wrapRect.left;
                const y = (rect.top + rect.height / 2) - wrapRect.top;
                points.push({ x, y });
            });

            // Build smooth cubic bezier curve SVG path
            let d = `M ${points[0].x} ${points[0].y}`;
            for (let i = 0; i < points.length - 1; i++) {
                const p0 = points[i];
                const p1 = points[i + 1];
                const midY = (p0.y + p1.y) / 2;
                d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
            }

            bgPath.setAttribute('d', d);
            glowPath.setAttribute('d', d);
        }

        /* ─── stemBOT ROBOTIC MASCOT COMPANION ENGINE ─────────────────── */
        createStemBotHtml(options = {}) {
            const isChampion = options.isChampion || false;
            const tagText = isChampion ? '¡CAMPEÓN!' : 'stemBOT';
            const tagIcon = isChampion ? '<i class="fa-solid fa-trophy"></i>' : '<i class="fa-solid fa-bolt"></i>';
            const initialSpeech = options.speech || (isChampion 
                ? "¡Mundo dominado al 100%! ¡Eres una leyenda!" 
                : STEMBOT_PHRASES[Math.floor(Math.random() * STEMBOT_PHRASES.length)]);

            return `
                <div class="path-player-mascot ${isChampion ? 'champion' : ''}" id="path-stembot-mascot" role="button" aria-label="Mascota stemBOT: Copiloto de aprendizaje" tabindex="0">
                    <div class="stembot-speech-bubble visible" id="stembot-bubble">
                        <span class="stembot-bubble-bot-tag">${tagIcon} ${tagText}</span>
                        <span class="stembot-bubble-text">${initialSpeech}</span>
                    </div>
                    <div class="stembot-body">
                        <svg class="stembot-svg" width="60" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="sbHeadGrad" x1="14" y1="14" x2="50" y2="38" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#ffffff"/>
                                    <stop offset="100%" stop-color="#dbeafe"/>
                                </linearGradient>
                                <linearGradient id="sbBodyGrad" x1="18" y1="39" x2="46" y2="51" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#f8fafc"/>
                                    <stop offset="100%" stop-color="#e2e8f0"/>
                                </linearGradient>
                                <linearGradient id="sbFlameGrad" x1="32" y1="53" x2="32" y2="63" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#00f5d4"/>
                                    <stop offset="60%" stop-color="#0284c7"/>
                                    <stop offset="100%" stop-color="rgba(2, 132, 199, 0)"/>
                                </linearGradient>
                            </defs>

                            <!-- Antenna Rod & Beacon -->
                            <line x1="32" y1="14" x2="32" y2="7" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
                            <circle class="stembot-beacon" cx="32" cy="5" r="4.5" fill="${isChampion ? '#fbbf24' : '#00f5d4'}"/>

                            <!-- Outer Head / Helmet -->
                            <rect x="14" y="14" width="36" height="24" rx="9" fill="url(#sbHeadGrad)" stroke="#38bdf8" stroke-width="1.8"/>

                            <!-- Side Ear Bolts -->
                            <rect x="10" y="21" width="4" height="8" rx="2" fill="#0284c7"/>
                            <rect x="50" y="21" width="4" height="8" rx="2" fill="#0284c7"/>

                            <!-- Visor Display -->
                            <rect x="18" y="18" width="28" height="15" rx="5" fill="#0f172a"/>
                            <!-- Visor Glass Glare -->
                            <path d="M 20 19 L 26 19 L 22 32 L 18 32 Z" fill="rgba(255, 255, 255, 0.16)"/>

                            <!-- LED Expressive Eyes -->
                            <ellipse class="stembot-eye" cx="26" cy="25" rx="3.2" ry="4" fill="${isChampion ? '#fbbf24' : '#00f5d4'}"/>
                            <circle cx="27.2" cy="23.5" r="1" fill="#ffffff"/>
                            <ellipse class="stembot-eye" cx="38" cy="25" rx="3.2" ry="4" fill="${isChampion ? '#fbbf24' : '#00f5d4'}"/>
                            <circle cx="39.2" cy="23.5" r="1" fill="#ffffff"/>

                            <!-- Neck Joint -->
                            <rect x="28" y="37" width="8" height="3" rx="1.5" fill="#64748b"/>

                            <!-- Torso Body -->
                            <path d="M 18 41 Q 18 39 21 39 L 43 39 Q 46 39 46 41 L 44 49 Q 44 51 41 51 L 23 51 Q 20 51 20 49 Z" fill="url(#sbBodyGrad)" stroke="#38bdf8" stroke-width="1.5"/>

                            <!-- Chest Reactor Core -->
                            <circle cx="32" cy="45" r="3.5" fill="#0284c7"/>
                            <circle cx="32" cy="45" r="2" fill="${isChampion ? '#fbbf24' : '#00f5d4'}"/>

                            <!-- Left Arm (Floating Rest) -->
                            <path d="M 18 42 Q 12 45 14 50" stroke="#0284c7" stroke-width="3" stroke-linecap="round" fill="none"/>
                            <circle cx="14" cy="50" r="2.5" fill="#38bdf8"/>

                            <!-- Right Arm (Waving Hand!) -->
                            <g class="stembot-arm-right">
                                <path d="M 46 42 Q 52 38 52 32" stroke="#0284c7" stroke-width="3" stroke-linecap="round" fill="none"/>
                                <circle cx="52" cy="31" r="3" fill="${isChampion ? '#fbbf24' : '#00f5d4'}"/>
                            </g>

                            <!-- Anti-Gravity Nozzle & Plasma Jet -->
                            <polygon points="27,51 37,51 35,55 29,55" fill="#475569"/>
                            <polygon class="stembot-flame" points="29,54 35,54 32,63" fill="url(#sbFlameGrad)"/>
                        </svg>
                    </div>
                    <div class="stembot-shadow"></div>
                </div>
            `;
        }

        triggerStemBotHudTip() {
            this.sound.playRobotChirp();
            const hud = document.getElementById('stembot-globe-hud');
            const phraseEl = document.getElementById('stembot-hud-phrase');
            if (hud) {
                hud.style.transform = 'translateY(-4px) scale(1.06)';
                setTimeout(() => {
                    hud.style.transform = '';
                }, 220);
            }
            if (phraseEl) {
                this.botPhraseIdx = ((this.botPhraseIdx || 0) + 1) % STEMBOT_PHRASES.length;
                phraseEl.textContent = STEMBOT_PHRASES[this.botPhraseIdx];
            }
        }

        onStemBotClicked(mascotEl) {
            if (!mascotEl) return;
            this.sound.playRobotChirp();

            // Trigger enthusiastic arm wave
            mascotEl.classList.add('stembot-waving');
            setTimeout(() => mascotEl.classList.remove('stembot-waving'), 1300);

            // Burst colorful sparkles
            this.createSparkleBurst(mascotEl);

            // Cycle speech bubble encouragement
            const bubbleText = mascotEl.querySelector('.stembot-bubble-text');
            const bubble = mascotEl.querySelector('.stembot-speech-bubble');
            if (bubbleText) {
                this.botPhraseIdx = ((this.botPhraseIdx || 0) + 1) % STEMBOT_PHRASES.length;
                bubbleText.textContent = STEMBOT_PHRASES[this.botPhraseIdx];
                if (bubble) {
                    bubble.classList.remove('visible');
                    void bubble.offsetWidth; // force DOM reflow
                    bubble.classList.add('visible');
                }
            }
        }

        createSparkleBurst(container) {
            if (!container) return;
            let sparklesWrap = container.querySelector('.stembot-sparkles-wrap');
            if (!sparklesWrap) {
                sparklesWrap = document.createElement('div');
                sparklesWrap.className = 'stembot-sparkles-wrap';
                container.appendChild(sparklesWrap);
            }
            sparklesWrap.innerHTML = '';
            const colors = ['#00f5d4', '#38bdf8', '#fbbf24', '#a855f7', '#34d399'];
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
                const dist = 28 + Math.random() * 22;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist;
                const sparkle = document.createElement('div');
                sparkle.className = 'stembot-sparkle';
                sparkle.style.setProperty('--sparkle-dx', `${dx}px`);
                sparkle.style.setProperty('--sparkle-dy', `${dy}px`);
                sparkle.style.background = colors[i % colors.length];
                sparklesWrap.appendChild(sparkle);
            }
            setTimeout(() => {
                if (sparklesWrap && sparklesWrap.parentNode) {
                    sparklesWrap.innerHTML = '';
                }
            }, 850);
        }

        playStemBotAdvance(fromDisc, toDisc) {
            if (!fromDisc || !toDisc) return;
            const mascot = fromDisc.querySelector('.path-player-mascot');
            if (!mascot) return;

            this.sound.playRobotHop();
            mascot.classList.add('stembot-hopping');

            setTimeout(() => {
                mascot.classList.remove('stembot-hopping');
                toDisc.appendChild(mascot);
                mascot.classList.add('stembot-celebrating');
                this.sound.playRobotCelebrate();
                this.createSparkleBurst(mascot);

                const bubbleText = mascot.querySelector('.stembot-bubble-text');
                if (bubbleText) {
                    bubbleText.textContent = "¡Nivel desbloqueado! ¡Excelente trabajo!";
                }

                setTimeout(() => {
                    mascot.classList.remove('stembot-celebrating');
                }, 1000);
            }, 800);
        }

        /* ─── MODULE INSPECTION DRAWER ─────────────────────────────────── */
        openModuleDrawer(trackId, mod, modIndex, isUnlocked, isCompleted) {
            const track = this.courses[trackId];
            if (!track) return;

            const catMeta = REALM_META[track.category] || REALM_META.technology;
            const readings = mod.readings || [];
            const prog = this.getUserProgress();

            document.getElementById('wmd-cat-tag').textContent = catMeta.label.toUpperCase();
            document.getElementById('wmd-cat-tag').style.background = `${catMeta.color}22`;
            document.getElementById('wmd-cat-tag').style.color = catMeta.color;

            document.getElementById('wmd-mod-code').textContent = `MÓDULO ${modIndex + 1}`;
            document.getElementById('wmd-level-tag').textContent = `Nivel ${track.level || 'A2-B1'}`;

            document.getElementById('wmd-title').textContent = mod.title;
            document.getElementById('wmd-subtitle').textContent = mod.titleES || mod.title;

            document.getElementById('wmd-stat-readings').textContent = `${readings.length} Lecturas`;
            document.getElementById('wmd-stat-time').textContent = `~${readings.length * 8 + 5} min`;
            document.getElementById('wmd-stat-xp').textContent = `+${readings.length * 50 + 50} XP`;

            const statusEl = document.getElementById('wmd-stat-status');
            if (isCompleted) {
                statusEl.innerHTML = '<i class="fa-solid fa-check"></i> Aprobado';
                statusEl.style.color = '#10b981';
            } else if (isUnlocked) {
                statusEl.innerHTML = '<i class="fa-solid fa-play"></i> Disponible';
                statusEl.style.color = '#0284c7';
            } else {
                statusEl.innerHTML = '<i class="fa-solid fa-lock"></i> Bloqueado';
                statusEl.style.color = '#64748b';
            }

            // Readings breakdown list
            const readingsList = document.getElementById('wmd-readings-list');
            readingsList.innerHTML = '';
            if (readings.length > 0) {
                readings.forEach((r, rIdx) => {
                    const isRCompleted = prog.completedReadings && prog.completedReadings[r.id];
                    const item = document.createElement('div');
                    item.className = 'wmd-reading-item';
                    item.innerHTML = `
                        <div class="wmd-r-title">
                            <span style="color:#64748b;font-size:0.75rem;margin-right:6px;">R${rIdx + 1}</span>
                            ${r.title}
                        </div>
                        <div class="wmd-r-meta">
                            <span><i class="fa-solid fa-clock"></i> ${r.duration || '8 min'}</span>
                            <i class="fa-solid ${isRCompleted ? 'fa-circle-check' : 'fa-circle'}" style="color:${isRCompleted ? '#10b981' : 'rgba(203,213,225,0.7)'};margin-left:8px;"></i>
                        </div>
                    `;
                    readingsList.appendChild(item);
                });
            } else {
                readingsList.innerHTML = `<div style="color:#64748b;font-size:0.8rem;padding:8px;">Contenido programático en desarrollo.</div>`;
            }

            // Buttons
            const btnPrimary = document.getElementById('wmd-btn-launch-primary');
            const btnSocratic = document.getElementById('wmd-btn-launch-socratic');
            const btnToggle = document.getElementById('wmd-btn-toggle-complete');
            const toggleText = document.getElementById('wmd-toggle-complete-text');

            // Launch Primary action
            btnPrimary.onclick = () => {
                this.closeDrawer();
                this.sound.playWarp();
                if (this.launchModuleCallback) {
                    this.launchModuleCallback(trackId, mod);
                } else if (typeof window.openAcademicModal === 'function') {
                    window.openAcademicModal(trackId, mod);
                } else if (typeof window.openDrawer === 'function') {
                    window.openDrawer(trackId, mod.id, this.courses);
                }
            };

            // Socratic Dialogue action
            if (mod.socraticChallenges && mod.socraticChallenges.length > 0) {
                btnSocratic.style.display = 'inline-flex';
                btnSocratic.onclick = () => {
                    this.closeDrawer();
                    this.sound.playWarp();
                    if (this.launchSocraticCallback) {
                        this.launchSocraticCallback(trackId, mod.id);
                    } else if (typeof window.launchSocraticChallenge === 'function') {
                        window.launchSocraticChallenge(trackId, mod.id);
                    }
                };
            } else {
                btnSocratic.style.display = 'none';
            }

            // Toggle completed status (gamification test)
            if (toggleText) {
                toggleText.textContent = isCompleted ? 'Desmarcar Aprobado' : 'Marcar Aprobado (+150 XP)';
            }
            btnToggle.onclick = () => {
                this.toggleModuleCompletion(trackId, mod.id);
            };

            // Show drawer
            this.els.drawer.classList.add('open');
            this.els.backdrop.classList.add('open');
        }

        closeDrawer() {
            if (this.els.drawer) this.els.drawer.classList.remove('open');
            if (this.els.backdrop) this.els.backdrop.classList.remove('open');
        }

        toggleModuleCompletion(trackId, modId) {
            let prog = this.getUserProgress();
            if (!prog.completedModules) prog.completedModules = {};
            if (!prog.completedReadings) prog.completedReadings = {};

            const wasCompleted = prog.completedModules[modId] === true;
            prog.completedModules[modId] = !wasCompleted;

            // Mark readings as well
            const track = this.courses[trackId];
            const mod = track?.modules?.find(m => m.id === modId);
            if (mod && mod.readings) {
                mod.readings.forEach(r => {
                    prog.completedReadings[r.id] = !wasCompleted;
                });
            }

            if (!wasCompleted) {
                prog.xp = (prog.xp || 450) + 150;
                this.sound.playVictory();
                this.sound.playRobotCelebrate();
                this.showToast('¡Módulo Conquistado! +150 XP');
            } else {
                prog.xp = Math.max(0, (prog.xp || 450) - 150);
                this.showToast('Progreso actualizado.');
            }

            localStorage.setItem('stemos_user_progress', JSON.stringify(prog));

            // Refresh level path UI
            this.openWorldPath(trackId);
            this.closeDrawer();

            // Notify stemOS dashboard if functions exist
            if (typeof window.loadProgress === 'function') window.loadProgress();
            if (typeof window.renderSegmentedProgressBar === 'function') window.renderSegmentedProgressBar();
            if (typeof window.updateKPIMetrics === 'function') window.updateKPIMetrics();
        }

        showToast(message) {
            const toast = this.els.toast;
            const text = document.getElementById('world-toast-text');
            if (!toast || !text) return;
            // Strict regex stripping all emoji ranges and variation selectors to enforce clean UI
            text.textContent = (message || '')
                .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}]/gu, '')
                .replace(/\s+/g, ' ')
                .trim();
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3200);
        }

        syncProgress() {
            if (this.selectedTrackId) {
                this.openWorldPath(this.selectedTrackId);
            }
        }
    }

    // Export to global scope
    window.StemOSWorldMap = new StemOSWorldMapEngine();

})(window, document);
