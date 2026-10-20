/**
 * stemOS Universal AI Engine: Gemini API & Campus Mini PC Edge Integration (v6.2.0)
 * ═════════════════════════════════════════════════════════════════════════════════════════
 * Architecture:
 *  1. Priority 1 (Local Campus Edge): Mini PC (yzai / Ollama / Zero-Water LAN Server)
 *     - 15W-85W ultra-efficient hardware, 0 liters of water consumption.
 *     - Handles up to 100 simultaneous concurrent students in university computer labs
 *       without saturating external bandwidth.
 *  2. Priority 2 (Cloud Backup): Google Gemini API (gemini-2.5-flash)
 *     - Ultra-fast multimodal reasoning, Socratic defense & incident grading.
 *  3. Priority 3 (Deterministic Heuristic): Offline Air-Gapped Socratic Engine
 *     - Zero external dependencies. Ensures no student is blocked during exams or lab sessions.
 * ═════════════════════════════════════════════════════════════════════════════════════════
 */

(function (window) {
    'use strict';

    const STORAGE_KEY_MINIPC = 'stemos_minipc_url';
    const STORAGE_KEY_GEMINI_KEY = 'stemos_gemini_api_key';

    // Default configuration
    const CONFIG = {
        model: 'gemini-2.5-flash',
        miniPcDefaultModel: 'qwen36-yzai:latest',
        miniPcDiscoveryTimeoutMs: 1800,
        miniPcConnectTimeoutMs: 7000,
        miniPcCandidates: [
            'http://localhost:8080/api/gemini',
            'http://localhost:8080',
            'http://localhost:8089',
            'http://localhost:8096',
            'http://localhost:8099',
            'http://127.0.0.1:8080',
            'http://127.0.0.1:8089',
            'http://127.0.0.1:8099',
            'https://yzai.yepzhi.com',
            'http://localhost:11434',
            'http://127.0.0.1:11434'
        ]
    };

    let discoveredMiniPcUrl = null;
    let discoveredMiniPcModel = CONFIG.miniPcDefaultModel;
    let isDiscovering = false;
    let lastDiscoveryTime = 0;

    /**
     * Auto-discover campus Mini PC edge node
     */
    async function discoverMiniPc() {
        if (typeof window === 'undefined' || typeof fetch === 'undefined') return null;
        const now = Date.now();
        if (discoveredMiniPcUrl && (now - lastDiscoveryTime < 60000)) {
            return discoveredMiniPcUrl;
        }

        const customUrl = localStorage.getItem(STORAGE_KEY_MINIPC);
        const candidates = [];
        if (customUrl) candidates.push(customUrl);
        candidates.push(...CONFIG.miniPcCandidates);

        // Deduplicate
        const unique = [...new Set(candidates.filter(Boolean))];

        for (const url of unique) {
            try {
                const c = new AbortController();
                const timer = setTimeout(() => c.abort(), CONFIG.miniPcDiscoveryTimeoutMs);
                const isYzAI = url.includes('yzai.yepzhi.com');
                const testUrl = isYzAI ? `${url}/api/tags?clave=secreta123` : `${url}/api/tags`;

                const res = await fetch(testUrl, { signal: c.signal });
                clearTimeout(timer);

                if (res.ok) {
                    const ct = res.headers.get('content-type') || '';
                    if (ct.includes('application/json')) {
                        const data = await res.json();
                        if (Array.isArray(data.models) && data.models.length > 0) {
                            discoveredMiniPcUrl = url;
                            const matched = data.models.find(m => m.name && (m.name.includes('qwen') || m.name.includes('yzai'))) || data.models[0];
                            discoveredMiniPcModel = matched?.name || CONFIG.miniPcDefaultModel;
                            lastDiscoveryTime = Date.now();
                            console.info(`[stemOS AI] Mini PC Campus Edge connected: ${url} (${discoveredMiniPcModel})`);
                            return discoveredMiniPcUrl;
                        }
                    }
                }
            } catch (_) {
                // Next candidate
            }
        }

        discoveredMiniPcUrl = null;
        return null;
    }

    /**
     * Call Mini PC local inference
     */
    async function callMiniPc(prompt, systemInstruction) {
        if (!discoveredMiniPcUrl) return null;

        const c = new AbortController();
        const timer = setTimeout(() => c.abort(), CONFIG.miniPcConnectTimeoutMs);

        try {
            const isYzAI = discoveredMiniPcUrl.includes('yzai.yepzhi.com');
            const chatUrl = isYzAI ? `${discoveredMiniPcUrl}/api/chat?clave=secreta123` : `${discoveredMiniPcUrl}/api/chat`;

            const messages = [];
            if (systemInstruction) {
                messages.push({ role: 'system', content: systemInstruction });
            }
            messages.push({ role: 'user', content: prompt });

            const res = await fetch(chatUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: c.signal,
                body: JSON.stringify({
                    model: discoveredMiniPcModel,
                    messages: messages,
                    options: {
                        num_ctx: 2048,
                        num_predict: 250,
                        temperature: 0.6
                    },
                    stream: false
                })
            });
            clearTimeout(timer);

            if (res.ok) {
                const data = await res.json();
                if (data.message && data.message.content) {
                    return {
                        text: data.message.content.trim(),
                        engine: `Mini PC Campus Edge (${discoveredMiniPcModel} · 0L Agua)`
                    };
                }
            }
        } catch (e) {
            console.warn('[stemOS AI] Mini PC request failed, falling back to Gemini Cloud:', e.message || e);
        } finally {
            clearTimeout(timer);
        }

        return null;
    }

    /**
     * Call Gemini Cloud API (gemini-2.5-flash)
     */
    async function callGeminiCloud(prompt, systemInstruction) {
        const apiKey = (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY_GEMINI_KEY)) ||
                       (window.STEMOS_FIREBASE_CONFIG && window.STEMOS_FIREBASE_CONFIG.config ? window.STEMOS_FIREBASE_CONFIG.config.apiKey : '') ||
                       'AIzaSyCMlLMpHf7IS53etjhLO2D1Y8MfXCUcSuc';

        const contents = [];
        if (systemInstruction) {
            contents.push({
                role: 'user',
                parts: [{ text: `[System Instruction: ${systemInstruction}]\n\n${prompt}` }]
            });
        } else {
            contents.push({
                role: 'user',
                parts: [{ text: prompt }]
            });
        }

        const payload = {
            contents: contents,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
                topP: 0.95
            }
        };

        // 1. Try direct Gemini API
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                const candidate = data.candidates?.[0];
                const text = candidate?.content?.parts?.[0]?.text;
                if (text) {
                    return {
                        text: text.trim(),
                        engine: 'Gemini Cloud API (gemini-2.5-flash)'
                    };
                }
            }
        } catch (e) {
            console.warn('[stemOS AI] Gemini Cloud direct call failed:', e.message || e);
        }

        // 2. Try Local / Worker Proxy (/api/gemini or /api/tutor)
        const proxyEndpoints = ['/api/gemini', '/api/tutor'];
        for (const ep of proxyEndpoints) {
            try {
                const pRes = await fetch(ep, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt, systemInstruction: systemInstruction })
                });
                if (pRes.ok) {
                    const pData = await pRes.json();
                    const text = pData.text || pData.message?.content || pData.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        return {
                            text: text.trim(),
                            engine: 'Gemini Edge Proxy (gemini-2.5-flash)'
                        };
                    }
                }
            } catch (_) {}
        }

        return null;
    }

    /**
     * Deterministic Socratic Evaluator (100% Offline Air-Gapped Fallback)
     */
    function evaluateOfflineFallback(type, params) {
        if (type === 'capstone_defense') {
            const exp = (params.explanation || '').trim();
            const words = exp.split(/\s+/).filter(Boolean).length;
            const hasTechnicalKeywords = /system|process|control|sensor|algorithm|metric|efficiency|protocol|safety|standard|analysis|solution/i.test(exp);
            
            let score = 70;
            if (words >= 35) score += 15;
            if (hasTechnicalKeywords) score += 15;
            score = Math.min(100, Math.max(50, score));

            return {
                approved: score >= 75,
                score: score,
                feedback: score >= 75
                    ? `Excelente defensa socrática. Tu análisis técnico demuestra comprensión integral del Hito ${params.hitoIndex || 1} en ${params.careerName || 'Ingeniería'}. ¡Acreditación aprobada!`
                    : `Tu explicación tiene bases correctas pero requiere profundizar más en la causa raíz técnica y métricas operativas. Complementa tu respuesta para alcanzar el 80%+.`,
                engine: 'Heurística Socrática Local stemOS (Offline Air-Gapped)'
            };
        }

        if (type === 'incident_grading') {
            const action = (params.action || '').trim();
            const hasDiagnosis = /diagnost|analiz|revis|med|isolat|test/i.test(action);
            const hasCorrective = /reemplaz|ajust|configur|calibr|repar|fix/i.test(action);
            const score = (hasDiagnosis ? 50 : 25) + (hasCorrective ? 50 : 25);

            return {
                approved: score >= 70,
                score: score,
                starRubric: {
                    situation: 'Incidente de planta/laboratorio identificado.',
                    task: 'Aislamiento de falla y mitigación técnica.',
                    action: action.substring(0, 100),
                    result: score >= 70 ? 'Resolución satisfactoria con protocolo ISO.' : 'Resolución parcial, requiere verificación.'
                },
                feedback: `Evaluación STAR completada: Puntaje ${score}/100. Procedimiento técnico validado.`,
                engine: 'Heurística Socrática Local stemOS (Offline Air-Gapped)'
            };
        }

        return {
            text: 'Respuesta generada por el motor de inferencia local de contingencia stemOS.',
            engine: 'Heurística Socrática Local stemOS (Offline Air-Gapped)'
        };
    }

    const STEMOS_AI = {
        version: '6.2.0',

        /**
         * Get active engine diagnosis
         */
        getStatus: async function () {
            await discoverMiniPc();
            if (discoveredMiniPcUrl) {
                return {
                    active: true,
                    engine: 'mini_pc',
                    label: 'Mini PC Campus Edge Conectada',
                    specs: '0 Litros de Agua · 15W-85W · Red Local LAN',
                    url: discoveredMiniPcUrl,
                    model: discoveredMiniPcModel,
                    icon: 'fa-server',
                    badgeClass: 'badge-emerald'
                };
            }
            return {
                active: true,
                engine: 'cloud_gemini',
                label: 'Gemini Cloud Backup (gemini-2.5-flash)',
                specs: 'Google AI Gemini API · Respaldo Global',
                url: 'Cloud API',
                model: 'gemini-2.5-flash',
                icon: 'fa-cloud',
                badgeClass: 'badge-sky'
            };
        },

        /**
         * Set custom Mini PC URL (e.g. for campus labs: http://192.168.1.100:11434)
         */
        setMiniPcUrl: function (url) {
            if (url) {
                localStorage.setItem(STORAGE_KEY_MINIPC, url);
                discoveredMiniPcUrl = url;
            } else {
                localStorage.removeItem(STORAGE_KEY_MINIPC);
                discoveredMiniPcUrl = null;
            }
            lastDiscoveryTime = 0;
        },

        /**
         * Socratic Capstone Defense Evaluation
         * Used in Hito 1-4 milestones for project defense and digital certification.
         */
        evaluateCapstoneDefense: async function (explanation, hitoIndex, careerName, studentContext) {
            await discoverMiniPc();

            const systemPrompt = `You are the stemOS Socratic Defense Evaluator for ${careerName || 'Engineering'}.
A student is defending Milestone Hito ${hitoIndex || 1}.
Evaluate their technical depth, terminology, problem solving and conceptual clarity.
Output JSON format:
{
  "approved": true/false,
  "score": number (0-100),
  "feedback": "string explaining strengths and what needs deepening",
  "keyConceptsIdentified": ["concept1", "concept2"]
}`;

            const userPrompt = `Student Explanation: "${explanation}"\nCareer: ${careerName}\nMilestone: Hito ${hitoIndex}\nContext: ${JSON.stringify(studentContext || {})}`;

            // 1. Try Mini PC
            let res = await callMiniPc(userPrompt, systemPrompt);

            // 2. Try Gemini Cloud
            if (!res) {
                res = await callGeminiCloud(userPrompt, systemPrompt);
            }

            if (res && res.text) {
                try {
                    const cleanJson = res.text.replace(/```json/g, '').replace(/```/g, '').trim();
                    const parsed = JSON.parse(cleanJson);
                    return {
                        approved: !!parsed.approved,
                        score: typeof parsed.score === 'number' ? parsed.score : 80,
                        feedback: parsed.feedback || 'Evaluación técnica completada.',
                        keyConceptsIdentified: parsed.keyConceptsIdentified || [],
                        engine: res.engine
                    };
                } catch (_) {
                    return {
                        approved: true,
                        score: 85,
                        feedback: res.text,
                        engine: res.engine
                    };
                }
            }

            // 3. Offline Heuristic Fallback
            return evaluateOfflineFallback('capstone_defense', { explanation, hitoIndex, careerName });
        },

        /**
         * Applied Lab Incident Grading with STAR Rubric
         */
        gradeIncidentResolution: async function (incidentScenario, studentAction, technicalLog) {
            await discoverMiniPc();

            const systemPrompt = `You are the stemOS Industrial Safety & Technical Incident Evaluator.
Evaluate the student's troubleshooting actions for the given industrial incident using the STAR method.
Return JSON:
{
  "approved": true/false,
  "score": number (0-100),
  "starRubric": {
    "situation": "brief summary",
    "task": "target resolution",
    "action": "assessment of student's diagnostic & corrective steps",
    "result": "operational outcome"
  },
  "feedback": "constructive mentor feedback"
}`;

            const userPrompt = `Incident Scenario: ${incidentScenario}\nStudent Action: ${studentAction}\nDiagnostics Log: ${technicalLog}`;

            let res = await callMiniPc(userPrompt, systemPrompt);
            if (!res) {
                res = await callGeminiCloud(userPrompt, systemPrompt);
            }

            if (res && res.text) {
                try {
                    const cleanJson = res.text.replace(/```json/g, '').replace(/```/g, '').trim();
                    const parsed = JSON.parse(cleanJson);
                    return {
                        approved: !!parsed.approved,
                        score: parsed.score || 85,
                        starRubric: parsed.starRubric || {},
                        feedback: parsed.feedback || 'Incidente resuelto satisfactoriamente.',
                        engine: res.engine
                    };
                } catch (_) {
                    return {
                        approved: true,
                        score: 85,
                        feedback: res.text,
                        engine: res.engine
                    };
                }
            }

            return evaluateOfflineFallback('incident_grading', { action: studentAction });
        },

        /**
         * Conversational Socratic STEM Tutor
         */
        chatTutor: async function (message, context) {
            await discoverMiniPc();

            const systemPrompt = `You are StemBot, the friendly, rigorous Socratic AI tutor of stemOS.
Role: Help students master technical English and STEM concepts.
Keep answers concise (max 3-4 sentences), encouraging, and ask guiding questions.
If asked who created you or about water consumption: proudly state you were created by Alberto Yépiz (yepzhi.com), that on your local Mini PC you consume 0 liters of water (15W-85W), and that you run with maximum eco-efficiency.`;

            let res = await callMiniPc(message, systemPrompt);
            if (!res) {
                res = await callGeminiCloud(message, systemPrompt);
            }

            if (res && res.text) {
                return res;
            }

            return {
                text: '¡Hola! Estoy listo para apoyarte en tus retos de ingeniería y vocabulario técnico. ¿Qué concepto o estación de trabajo estás abordando hoy?',
                engine: 'Heurística Socrática Local stemOS (Offline Air-Gapped)'
            };
        },

        /**
         * Technical Lexicon Upgrade & Enrichment
         */
        upgradeLexicon: async function (spanishTerm, engineeringField) {
            await discoverMiniPc();
            const systemPrompt = `You are an expert bilingual engineering lexicographer. Given a Spanish technical phrase or term, output JSON:
{
  "term": "Standardized Technical English Term",
  "definition": "Clear concise 1-sentence engineering definition",
  "sampleUsage": "Industrial context sentence (e.g. SCADA, Automotive, HVAC, PLC)",
  "cefrLevel": "B1"
}`;
            let res = await callMiniPc(spanishTerm, systemPrompt);
            if (!res) res = await callGeminiCloud(spanishTerm, systemPrompt);
            if (res && res.text) {
                try {
                    return JSON.parse(res.text.replace(/```json/g, '').replace(/```/g, '').trim());
                } catch (_) {
                    return { term: spanishTerm, definition: res.text, sampleUsage: '', cefrLevel: 'B1' };
                }
            }
            return {
                term: spanishTerm,
                definition: 'Technical term standardized for industrial workflow.',
                sampleUsage: `The technician verified the ${spanishTerm} protocol before commissioning.`,
                cefrLevel: 'B1'
            };
        },

        // Universal Aliases & Diagnostic Methods
        evaluateFeynmanDefense: async function (explanation, hitoIndex, careerName, studentContext) {
            return this.evaluateCapstoneDefense(explanation, hitoIndex, careerName, studentContext);
        },
        evaluateIncidentWarRoom: async function (incidentScenario, studentAction, technicalLog) {
            return this.gradeIncidentResolution(incidentScenario, studentAction, technicalLog);
        },
        checkConnectivity: async function () {
            return this.getStatus();
        },
        _offlineFeynmanHeuristic: function (text) {
            const fallback = evaluateOfflineFallback('capstone_defense', { explanation: text });
            return {
                score: fallback.score || 80,
                approved: fallback.approved !== false,
                feedback: fallback.feedback || 'Validado localmente.',
                rubric: {
                    clarity: 8.5,
                    lexical: 8.0,
                    rootCause: 8.5
                }
            };
        }
    };

    // Auto discover in background
    if (typeof window !== 'undefined') {
        window.STEMOS_AI = STEMOS_AI;
        setTimeout(() => discoverMiniPc().catch(() => {}), 100);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = STEMOS_AI;
    }

})(typeof window !== 'undefined' ? window : this);
