/**
 * stemOS Progressive Skeleton & Zero-CLS Content Loader (Phase 95)
 * ═══════════════════════════════════════════════════════════════════════════
 * Replaces generic spinners with dimension-matched structural placeholders.
 * Enforces Zero Cumulative Layout Shift (CLS = 0) and Progressive Staged Arrival:
 *   Stage 1: Numbers & Metric KPIs (Instantaneous)
 *   Stage 2: Charts, Graphs & Maps (Intermediate)
 *   Stage 3: Data Tables, Feeds & Card Catalogs (Final)
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function (window) {
    'use strict';

    const StemOSSkeleton = {
        version: '1.0.0',

        /**
         * Generates dimension-matched KPI metric card skeletons
         */
        renderKpiSkeletons: function (count = 4) {
            let html = '';
            for (let i = 0; i < count; i++) {
                html += `
                    <div class="skeleton-kpi-card stemos-skeleton-kpi-wrap">
                        <div class="skeleton-kpi-top">
                            <span class="stemos-skeleton skeleton-text sm skeleton-w-50"></span>
                            <div class="stemos-skeleton skeleton-circle" style="width: 28px; height: 28px;"></div>
                        </div>
                        <div class="stemos-skeleton skeleton-kpi-number"></div>
                        <div class="stemos-skeleton skeleton-text sm skeleton-w-70" style="margin-bottom:0;"></div>
                    </div>
                `;
            }
            return html;
        },

        /**
         * Generates dimension-matched chart / graph container skeleton
         */
        renderChartSkeleton: function (heightPx = 280, barCount = 7) {
            let barsHtml = '';
            const barHeights = [45, 75, 60, 90, 80, 65, 85];
            for (let i = 0; i < barCount; i++) {
                const h = barHeights[i % barHeights.length];
                barsHtml += `<div class="stemos-skeleton skeleton-chart-bar-item" style="height: ${h}%;"></div>`;
            }

            return `
                <div class="skeleton-chart-box" style="min-height: ${heightPx}px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <span class="stemos-skeleton skeleton-text lg skeleton-w-40"></span>
                        <span class="stemos-skeleton skeleton-pill"></span>
                    </div>
                    <span class="stemos-skeleton skeleton-text sm skeleton-w-60" style="margin-bottom:24px;"></span>
                    <div class="skeleton-chart-bars">
                        ${barsHtml}
                    </div>
                </div>
            `;
        },

        /**
         * Generates dimension-matched Table skeletons with header and striped rows
         */
        renderTableSkeleton: function (rows = 5, cols = 5) {
            let rowsHtml = '';
            const colWidths = ['25%', '25%', '20%', '15%', '15%'];

            for (let r = 0; r < rows; r++) {
                let cellsHtml = '';
                for (let c = 0; c < cols; c++) {
                    const w = colWidths[c % colWidths.length];
                    cellsHtml += `<div class="stemos-skeleton skeleton-text md" style="width: ${w}; margin-bottom:0;"></div>`;
                }
                rowsHtml += `
                    <div class="skeleton-table-row">
                        ${cellsHtml}
                    </div>
                `;
            }

            return `
                <div class="skeleton-table-wrapper" aria-busy="true" aria-label="Cargando datos...">
                    <div class="skeleton-table-row" style="background: rgba(255,255,255,0.03); border-bottom: 1.5px solid var(--skel-border);">
                        ${colWidths.slice(0, cols).map(w => `<div class="stemos-skeleton skeleton-text sm" style="width:${w}; margin-bottom:0;"></div>`).join('')}
                    </div>
                    ${rowsHtml}
                </div>
            `;
        },

        /**
         * Generates dimension-matched Unit / Catalog Card Skeletons
         */
        renderUnitCardsSkeleton: function (count = 4) {
            let html = '';
            for (let i = 0; i < count; i++) {
                html += `
                    <div class="skeleton-unit-card-match">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                                <span class="stemos-skeleton skeleton-pill" style="height:22px; width:70px;"></span>
                                <span class="stemos-skeleton skeleton-text sm" style="width:60px; margin:0;"></span>
                            </div>
                            <div class="stemos-skeleton skeleton-text lg skeleton-w-80" style="margin-bottom:10px;"></div>
                            <div class="stemos-skeleton skeleton-text md skeleton-w-100" style="margin-bottom:6px;"></div>
                            <div class="stemos-skeleton skeleton-text md skeleton-w-70" style="margin-bottom:16px;"></div>
                            <div class="stemos-skeleton" style="height:36px; border-radius:10px; margin-bottom:16px;"></div>
                        </div>
                        <div class="stemos-skeleton skeleton-btn"></div>
                    </div>
                `;
            }
            return html;
        },

        /**
         * Generates dimension-matched Snake Path Skeletons (Interactive Path)
         */
        renderSnakePathSkeleton: function (unitCount = 2) {
            let html = '';
            for (let u = 0; u < unitCount; u++) {
                html += `
                    <div class="skeleton-snake-section">
                        <div class="stemos-skeleton skeleton-snake-banner"></div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:16px; width:100%;">
                            <div class="stemos-skeleton skeleton-snake-stone" style="transform: translateX(-40px);"></div>
                            <div class="stemos-skeleton skeleton-snake-stone" style="transform: translateX(0px);"></div>
                            <div class="stemos-skeleton skeleton-snake-stone" style="transform: translateX(40px);"></div>
                            <div class="stemos-skeleton skeleton-snake-stone" style="transform: translateX(20px);"></div>
                            <div class="stemos-skeleton skeleton-snake-stone" style="width: 84px; height: 84px;"></div>
                        </div>
                    </div>
                `;
            }
            return html;
        },

        /**
         * Progressive Staged Reveal (Numbers -> Charts -> Tables)
         * Executes sequential reveal with micro-staggers:
         *   - Stage 1: Numbers & Metric KPIs
         *   - Stage 2: Charts, Graphs & Interactive Canvas
         *   - Stage 3: Tabular Content, Card Catalogs & Detailed Feeds
         */
        progressiveReveal: function (stages = {}, config = {}) {
            const delayStage1 = config.delay1 !== undefined ? config.delay1 : 60;
            const delayStage2 = config.delay2 !== undefined ? config.delay2 : 220;
            const delayStage3 = config.delay3 !== undefined ? config.delay3 : 420;

            // Stage 1: Numbers & KPIs
            setTimeout(() => {
                if (typeof stages.stage1 === 'function') {
                    stages.stage1();
                }
                const stage1Els = document.querySelectorAll('.stemos-stage-1');
                stage1Els.forEach(el => {
                    el.classList.remove('stemos-stage-loading');
                    el.classList.add('stemos-stage-resolved');
                });
            }, delayStage1);

            // Stage 2: Graphs & Charts
            setTimeout(() => {
                if (typeof stages.stage2 === 'function') {
                    stages.stage2();
                }
                const stage2Els = document.querySelectorAll('.stemos-stage-2');
                stage2Els.forEach(el => {
                    el.classList.remove('stemos-stage-loading');
                    el.classList.add('stemos-stage-resolved');
                });
            }, delayStage2);

            // Stage 3: Tables & Lists
            setTimeout(() => {
                if (typeof stages.stage3 === 'function') {
                    stages.stage3();
                }
                const stage3Els = document.querySelectorAll('.stemos-stage-3');
                stage3Els.forEach(el => {
                    el.classList.remove('stemos-stage-loading');
                    el.classList.add('stemos-stage-resolved');
                });
            }, delayStage3);
        }
    };

    window.StemOSSkeleton = StemOSSkeleton;

})(typeof window !== 'undefined' ? window : this);

