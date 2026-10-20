/**
 * stemOS — Build Production index.html
 * Merges the best of dev.html (Hero, Value Proposition, Constructive Standards, Institutional 60h Ecosystem)
 * with the new Institutional Pricing & Commercial Proposal Section (Mario's 1500 students flat license),
 * interactive lab calculator, WhatsApp and Zoom CTAs, and bilingual ES | EN controller.
 */

const fs = require('fs');
const path = require('path');

const devHtmlPath = path.join(__dirname, '../dev.html');
const dev = fs.readFileSync(devHtmlPath, 'utf8');

// 1. Head
const headEnd = dev.indexOf('</head>');
let head = dev.slice(0, headEnd);

// Replace title & description for production
head = head.replace('<title>stemOS — English for Specific Purposes | Advanced Industry ESP Platform</title>',
  '<title>stemOS — El Sistema Operativo de Inglés Técnico para la Industria de Alta Tecnología</title>');

// Extra styles for bilingual switch, pricing section, calculator and zoom modal
const extraStyles = `
  <style>
    /* ─── BILINGUAL SWITCHER CAPSULE ─── */
    .lang-switch-capsule {
      display: inline-flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 2px 4px;
      gap: 2px;
      margin-left: 10px;
    }
    .lang-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .lang-btn:hover {
      color: #ffffff;
    }
    .lang-btn.active {
      background: #0ea5e9;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
    }

    /* ─── CATALOG PREVIEW CALLOUT BANNER ─── */
    .catalog-preview-banner {
      width: 100%;
      max-width: 1320px;
      margin: 40px auto 0 auto;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .preview-banner-inner {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.7) 100%);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 20px;
      padding: 32px 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 28px;
      flex-wrap: wrap;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(14px);
    }
    .preview-banner-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(14, 165, 233, 0.16);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
    .preview-banner-title {
      font-size: 1.55rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }
    .preview-banner-desc {
      font-size: 0.95rem;
      color: #94a3b8;
      margin: 0;
      max-width: 720px;
      line-height: 1.55;
    }
    .btn-open-tracks-studio {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
      color: #ffffff;
      padding: 14px 26px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(14, 165, 233, 0.35);
      transition: all 0.25s ease;
      white-space: nowrap;
    }
    .btn-open-tracks-studio:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(14, 165, 233, 0.5);
      color: #ffffff;
    }

    /* ─── INSTITUTIONAL PRICING SECTION ─── */
    .pricing-institutional-section {
      padding: 80px 0 100px 0;
      position: relative;
    }
    .badge-pricing-institutional {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34d399;
    }
    
    /* Memorandum Card */
    .pricing-memo-card {
      max-width: 1040px;
      margin: 0 auto 50px auto;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(17, 24, 39, 0.85) 100%);
      border: 1px solid rgba(56, 189, 248, 0.28);
      border-left: 5px solid #0ea5e9;
      border-radius: 16px;
      padding: 28px 32px;
      display: flex;
      gap: 22px;
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(14px);
    }
    .pricing-memo-icon {
      font-size: 2.2rem;
      color: #38bdf8;
      opacity: 0.6;
      flex-shrink: 0;
      margin-top: 4px;
    }
    .pricing-memo-content {
      flex: 1;
    }
    .pricing-memo-quote {
      font-size: 1.08rem;
      line-height: 1.7;
      color: #e2e8f0;
      margin: 0 0 16px 0;
      font-style: normal;
    }
    .pricing-memo-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 12px;
    }
    .pricing-memo-author {
      font-size: 0.85rem;
      font-weight: 700;
      color: #38bdf8;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .pricing-memo-tag {
      font-size: 0.78rem;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.05);
      padding: 4px 10px;
      border-radius: 6px;
    }

    /* 3 Pricing Cards Grid */
    .pricing-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      max-width: 1240px;
      margin: 0 auto 50px auto;
    }
    @media (max-width: 980px) {
      .pricing-cards-grid {
        grid-template-columns: 1fr;
      }
    }
    .pricing-card {
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 20px;
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: all 0.3s ease;
      backdrop-filter: blur(14px);
    }
    .pricing-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
    }
    .pricing-card.featured-plan {
      background: linear-gradient(180deg, rgba(14, 165, 233, 0.12) 0%, rgba(15, 23, 42, 0.88) 100%);
      border: 1.5px solid rgba(56, 189, 248, 0.55);
      box-shadow: 0 16px 40px rgba(14, 165, 233, 0.22);
    }
    .pricing-card-badge-glow {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #0ea5e9, #10b981);
      color: #ffffff;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      padding: 4px 16px;
      border-radius: 9999px;
      white-space: nowrap;
      box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
    }
    .pricing-card-badge-normal {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 800;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 3px 10px;
      border-radius: 9999px;
      width: fit-content;
      margin-bottom: 12px;
    }
    .pricing-card-badge-muted {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 800;
      color: #f59e0b;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 3px 10px;
      border-radius: 9999px;
      width: fit-content;
      margin-bottom: 12px;
    }
    .pricing-plan-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .pricing-plan-name {
      font-size: 1.45rem;
      font-weight: 800;
      color: #ffffff;
      margin: 4px 0 8px 0;
    }
    .pricing-plan-summary {
      font-size: 0.88rem;
      color: #94a3b8;
      line-height: 1.5;
      min-height: 42px;
      margin: 0 0 20px 0;
    }
    .pricing-price-box {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 18px 0;
      margin-bottom: 22px;
    }
    .pricing-amount-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .pricing-currency {
      font-size: 1.5rem;
      font-weight: 800;
      color: #38bdf8;
    }
    .pricing-value {
      font-size: 2.5rem;
      font-weight: 900;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -0.03em;
    }
    .pricing-term {
      font-size: 0.88rem;
      font-weight: 700;
      color: #94a3b8;
    }
    .pricing-period {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 4px;
    }
    .pricing-unit-metric {
      margin-top: 10px;
      font-size: 0.82rem;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.25);
      color: #34d399;
      padding: 6px 10px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pricing-features-list {
      list-style: none;
      padding: 0;
      margin: 0 0 26px 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .pricing-features-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.86rem;
      color: #cbd5e1;
      line-height: 1.45;
    }
    .pricing-features-list li i.fa-check {
      color: #10b981;
      margin-top: 3px;
      font-size: 0.8rem;
      flex-shrink: 0;
    }
    .btn-pricing-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      padding: 13px 20px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.92rem;
      text-decoration: none;
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    .btn-pricing-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 26px rgba(16, 185, 129, 0.5);
      color: #ffffff;
    }
    .btn-pricing-secondary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 13px 20px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.92rem;
      text-decoration: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    .btn-pricing-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: #38bdf8;
      color: #38bdf8;
      transform: translateY(-2px);
    }

    /* Interactive Lab Calculator & Scheduling Box */
    .pricing-interactive-hub {
      max-width: 1040px;
      margin: 0 auto;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.8) 100%);
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 20px;
      padding: 36px 40px;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(14px);
    }
    .pricing-hub-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      font-weight: 800;
      color: #38bdf8;
      background: rgba(14, 165, 233, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    .pricing-hub-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 8px 0;
    }
    .pricing-hub-desc {
      font-size: 1.02rem;
      color: #94a3b8;
      margin: 0 0 28px 0;
      line-height: 1.6;
    }
    .pricing-calc-box {
      background: rgba(10, 15, 29, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 30px;
    }
    .calc-input-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .calc-label {
      font-size: 0.95rem;
      font-weight: 700;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .calc-input-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .calc-input-wrapper input[type="range"] {
      width: 180px;
      accent-color: #0ea5e9;
      cursor: pointer;
    }
    .calc-input-wrapper input[type="number"] {
      width: 80px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 6px 10px;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 800;
      text-align: center;
      font-family: inherit;
    }
    .calc-unit {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 600;
    }
    .calc-results-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 18px;
    }
    @media (max-width: 640px) {
      .calc-results-grid {
        grid-template-columns: 1fr;
      }
    }
    .calc-res-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .calc-res-item.highlight {
      background: rgba(16, 185, 129, 0.08);
      border-color: rgba(16, 185, 129, 0.3);
    }
    .calc-res-lbl {
      font-size: 0.78rem;
      color: #94a3b8;
      font-weight: 700;
      text-transform: uppercase;
    }
    .calc-res-val {
      font-size: 1.35rem;
      font-weight: 900;
      color: #ffffff;
    }
    .calc-res-sub {
      font-size: 0.76rem;
      color: #64748b;
    }
    .pricing-actions-bar {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .btn-hub-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #25D366;
      color: #ffffff;
      padding: 14px 24px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.95rem;
      text-decoration: none;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
      transition: all 0.25s ease;
    }
    .btn-hub-whatsapp:hover {
      background: #20bd5a;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.5);
      color: #ffffff;
    }
    .btn-hub-zoom {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #0b5cff;
      color: #ffffff;
      border: none;
      padding: 14px 24px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.95rem;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(11, 92, 255, 0.35);
      transition: all 0.25s ease;
      font-family: inherit;
    }
    .btn-hub-zoom:hover {
      background: #004ee6;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(11, 92, 255, 0.5);
    }
    .btn-hub-email {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: #cbd5e1;
      padding: 14px 20px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-hub-email:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      transform: translateY(-1px);
    }

    /* Zoom Modal */
    .stemos-zoom-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: rgba(3, 7, 18, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .stemos-zoom-modal-content {
      background: #0f172a;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 20px;
      max-width: 540px;
      width: 100%;
      padding: 32px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
      position: relative;
    }
    .btn-close-zoom-modal {
      position: absolute;
      top: 18px;
      right: 18px;
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 4px;
    }
    .btn-close-zoom-modal:hover {
      color: #ffffff;
    }
  </style>
</head>`;

head = head.replace('</head>', '') + extraStyles;

// 2. Nav Header
const navStart = dev.indexOf('<header class="supaste-nav-wrapper">');
const navEnd = dev.indexOf('</header>') + 9;
let nav = dev.slice(navStart, navEnd);

// Brand link points to /
nav = nav.replace('<a href="#" class="supaste-brand-link" id="brand-home-link">', 
                  '<a href="/" class="supaste-brand-link" id="brand-home-link">');

// Replace nav links
const navLinksNew = `
      <div class="supaste-nav-links">
        <a href="#industry-standards-section" class="nav-link" data-i18n="nav_standards">
          <i class="fa-solid fa-scale-balanced" style="color:#0ea5e9;"></i>
          <span>Estándares vs Academia</span>
        </a>
        <a href="#institutional-academic-section" class="nav-link" data-i18n="nav_academic">
          <i class="fa-solid fa-graduation-cap" style="color:#38bdf8;"></i>
          <span>Sistema Académico 60h</span>
        </a>
        <a href="/tracks.html" class="nav-link" data-i18n="nav_catalog">
          <i class="fa-solid fa-layer-group" style="color:#10b981;"></i>
          <span>Catálogo ESP</span>
          <span class="nav-badge" style="background:#10b981; color:#0f172a; font-weight:800; font-size:0.65rem; padding:2px 6px; border-radius:9999px; margin-left:4px;">34</span>
        </a>
        <a href="/placement.html" class="nav-link" data-i18n="nav_placement">
          <i class="fa-solid fa-vial" style="color:#f59e0b;"></i>
          <span>Placement Test (30m)</span>
        </a>
        <a href="#pricing-institutional-section" class="nav-link highlight-link" data-i18n="nav_pricing" style="color:#34d399; font-weight:700;">
          <i class="fa-solid fa-file-invoice-dollar"></i>
          <span>Precios &amp; Licencias</span>
        </a>
      </div>
`;

// Replace from <div class="supaste-nav-links"> to right before <a href="javascript:void(0)" class="nav-profile-badge"
const navLinksStartIndex = nav.indexOf('<div class="supaste-nav-links">');
const navProfileBadgeIndex = nav.indexOf('<a href="javascript:void(0)" class="nav-profile-badge"');
if (navLinksStartIndex !== -1 && navProfileBadgeIndex !== -1) {
  nav = nav.slice(0, navLinksStartIndex) + navLinksNew + nav.slice(navProfileBadgeIndex);
}

// Right before <button id="supaste-nav-mobile-toggle", insert .supaste-nav-right with .lang-switch-capsule and CTA
const mobileToggleIndex = nav.indexOf('<button id="supaste-nav-mobile-toggle"');
const navRightBlock = `
      <div class="supaste-nav-right">
        <!-- Bilingual Language Switcher (Index ONLY) -->
        <div class="lang-switch-capsule" role="group" aria-label="Selector de idioma">
          <button type="button" class="lang-btn active" id="lang-btn-es" onclick="window.setPlatformLanguage('es')">ES</button>
          <button type="button" class="lang-btn" id="lang-btn-en" onclick="window.setPlatformLanguage('en')">EN</button>
        </div>

        <a href="https://calendly.com/yepzhi/30min" target="_blank" rel="noopener noreferrer" class="btn-signup-pill" style="border-color:rgba(16,185,129,0.5); background:rgba(16,185,129,0.15); color:#34d399; font-weight:800; margin-left:8px;" title="Agendar Zoom 15m vía Calendly">
          <i class="fa-solid fa-video"></i>
          <span data-i18n="btn_zoom_nav">Agendar Zoom 15m</span>
        </a>
      </div>
`;
if (mobileToggleIndex !== -1) {
  nav = nav.slice(0, mobileToggleIndex) + navRightBlock + nav.slice(mobileToggleIndex);
}

// 3. Hero Section
const heroStart = dev.indexOf('<section class="supaste-hero-section">');
const valuePropStart = dev.indexOf('<section class="promo-section" id="value-proposition">');
let hero = dev.slice(heroStart, valuePropStart);

// Update hero subtitle with data-i18n
hero = hero.replace(/<p class="supaste-hero-subtitle soft-element"[^>]*>[\s\S]*?<\/p>/, `
      <p class="supaste-hero-subtitle soft-element" style="--delay: 0.82s" data-i18n="hero_subtitle">
        <strong>34 tracks especializados de industria</strong> (ESP) y tracks de nivelación MCER (A1 a C1) &mdash; diseñados para fabricación de semiconductores, aviónica aeroespacial, robótica industrial, ingeniería automotriz, dispositivos médicos, logística internacional, calidad y EHS, centros de datos y nearshoring. Alineados con estándares IEEE, SEMI, ISO, IATF, FDA, OSHA y T-MEC.
      </p>
`);

// Update hero CTAs
const heroActionsOld = hero.match(/<div class="supaste-hero-actions">[\s\S]*?<\/div>/);
if (heroActionsOld) {
  const heroActionsNew = `
        <div class="supaste-hero-actions">
          <a href="/placement.html" class="supaste-btn-secondary" id="hero-btn-take-placement" style="border-color: rgba(16, 185, 129, 0.6); background: rgba(16, 185, 129, 0.18); color: #34d399; font-weight: 700;">
            <i class="fa-solid fa-vial" style="color:#10b981;"></i>
            <span data-i18n="btn_take_placement">Placement Test (30 min)</span>
          </a>
          <a href="/tracks.html" class="supaste-btn-primary">
            <span data-i18n="btn_tracks">Explorar 34 Tracks &amp; Labs</span>
            <i class="fa-solid fa-arrow-right btn-arrow"></i>
          </a>
          <a href="#pricing-institutional-section" class="supaste-btn-secondary" id="hero-btn-view-pricing" style="border-color: rgba(56, 189, 248, 0.4); background: rgba(14, 165, 233, 0.12); color: #38bdf8;">
            <i class="fa-solid fa-file-invoice-dollar"></i>
            <span data-i18n="btn_pricing">Ver Propuesta &amp; Precios</span>
          </a>
        </div>
  `;
  hero = hero.replace(heroActionsOld[0], heroActionsNew.trim());
}

// Replace the 40-pill wall in hero-simulators-dock with curated 1-row hub dock
const dockOld = hero.match(/<div class="hero-simulators-dock" id="hero-simulators-dock">[\s\S]*?<\/div>\s*<\/div>/);
if (dockOld) {
  const dockNew = `
        <div class="hero-simulators-dock" id="hero-simulators-dock">
          <div class="dock-header">
            <span class="dock-badge-title">
              <i class="fa-solid fa-bolt" style="color:#f59e0b;"></i>
              <span data-i18n="dock_title">Simuladores &amp; Labs de Nearshoring:</span>
            </span>
          </div>
          <div class="dock-pills-row">
            <a href="#institutional-academic-section" class="dock-pill highlight-pill" id="hero-academic-btn" title="Sistema Académico Institucional (TecNM, UT, Estatales) &amp; 25 Carreras 60h" style="background:rgba(14,165,233,0.16); border-color:rgba(56,189,248,0.45); color:#38bdf8; font-weight:800;">
              <i class="fa-solid fa-graduation-cap" style="color:#0ea5e9;"></i>
              <span data-i18n="dock_academic">Sistema Académico 60h (25)</span>
            </a>
            <a href="#industry-standards-section" class="dock-pill highlight-pill" id="hero-standards-btn" title="Estándares Internacionales vs. Academia" style="background:rgba(2,132,199,0.12); border-color:rgba(2,132,199,0.35); color:#0284c7; font-weight:800;">
              <i class="fa-solid fa-scale-balanced" style="color:#0ea5e9;"></i>
              <span data-i18n="dock_standards">Estándares vs. Academia</span>
            </a>
            <a href="#pricing-institutional-section" class="dock-pill" id="hero-pricing-btn" title="Propuesta Institucional y Opciones de Precio" style="background:rgba(16,185,129,0.14); border-color:rgba(16,185,129,0.4); color:#34d399; font-weight:800;">
              <i class="fa-solid fa-file-invoice-dollar" style="color:#10b981;"></i>
              <span data-i18n="dock_pricing">Propuesta &amp; Precios</span>
            </a>
            <a href="/tracks.html" class="dock-pill" id="hero-tracks-btn" title="Catálogo de 34 Tracks &amp; Crucibles">
              <i class="fa-solid fa-layer-group" style="color:#a855f7;"></i>
              <span data-i18n="dock_catalog">34 Tracks &amp; Labs ↗</span>
            </a>
            <a href="/placement.html" class="dock-pill" id="hero-placement-btn" title="Placement Test A1-C1">
              <i class="fa-solid fa-vial" style="color:#f59e0b;"></i>
              <span data-i18n="dock_placement">Placement Test A1–C1</span>
            </a>
            <a href="/app.html" class="dock-pill" id="hero-app-btn" title="Campus LXP &amp; Mundo 3D">
              <i class="fa-solid fa-earth-americas" style="color:#38bdf8;"></i>
              <span data-i18n="dock_lxp">Campus LXP 3D</span>
            </a>
          </div>
        </div>
      </div>
  `;
  hero = hero.replace(dockOld[0], dockNew.trim());
}

// 4. Value Proposition
const standardsStart = dev.indexOf('<section class="promo-section industry-standards-section" id="industry-standards-section">');
const valueProp = dev.slice(valuePropStart, standardsStart);

// 5. Industry Standards Section (Constructive Rewording)
const academicStart = dev.indexOf('<section class="promo-section institutional-academic-section" id="institutional-academic-section">');
let standards = dev.slice(standardsStart, academicStart);

// Reword header
standards = standards.replace('ESTÁNDARES GLOBALES VS. DESFASE ACADÉMICO', 'ESTÁNDARES GLOBALES &bull; EL PUENTE ACADÉMICO-INDUSTRIAL');
standards = standards.replace('No a Planes Universitarios Desactualizados', 'El Puente de Especialización para la Ingeniería');
standards = standards.replace(/Los programas de inglés técnico en las universidades tradicionales[\s\S]*?Tier-1 globales\./, 
  'Las universidades construyen los cimientos esenciales de gramática, sintaxis y rigor académico. <strong>stemOS proporciona el puente de especialización operativa</strong>, conectando el aula directamente con los estándares normativos internacionales que auditan y certifican a los Tier-1 globales.');

// Reword Left Column (Academic)
standards = standards.replace('INGLÉS UNIVERSITARIO TRADICIONAL', 'FORMACIÓN LINGÜÍSTICA GENERAL & FUNDAMENTOS');
standards = standards.replace('El Desfase Curricular Teórico', 'La Base Académica Esencial');
standards = standards.replace('Planes de estudio creados por comités académicos burocráticos desconectados de las exigencias operativas de la manufactura avanzada.', 
  'Formación universitaria centrada en gramática fundamental, lecto-comprensión y comunicación académica general.');
standards = standards.replace('Diseñado por comités pedagógicos sin horas de planta', 'Fundamentos sólidos de estructura y sintaxis lingüística');
standards = standards.replace('Lingüistas generales y profesores teóricos sin un solo turno de experiencia operativa en cuartos limpios, plantas de ensamble ni líneas de alta tensión.', 
  'Gramática estructural, vocabulario general y habilidades básicas de comunicación escrita y oral indispensables para el estudiante.');
standards = standards.replace('Syllabus estático y con décadas de antigüedad', 'Planes de estudio enfocados en competencias generales');
standards = standards.replace('Libros de texto impresos hace 10 o 15 años que enseñan cómo pedir en restaurantes, hacer reservaciones de hotel o memorizar gramática pasiva descontextualizada.', 
  'Programas diseñados para un espectro amplio de profesiones y preparación integral en etapas tempranas de formación profesional.');
standards = standards.replace('Cero rigor de seguridad y normas de ingeniería', 'Enfoque en lectura técnica y comprensión pasiva');
standards = standards.replace('Nunca abordan protocolos LOTO (cero energía), cuartos limpios ISO 14644, arnés ESD, seguridad funcional ISO 26262 ni estándares de semiconductores SEMI.', 
  'Comprensión de manuales y textos teóricos sin exposición intensiva a incidentes operativos de planta ni normas normativas.');
standards = standards.replace('Pedagogía pasiva y exámenes teóricos de papel', 'Evaluaciones académicas formativas y sumativas');
standards = standards.replace('Exámenes de opción múltiple descontextualizados; ninguna práctica de presión real, War Rooms de incidentes con clientes ni reportes 8D.', 
  'Evaluación periódica mediante exámenes y tareas orientadas al cumplimiento curricular y certificación de nivel de egreso.');
standards = standards.replace('12 a 18 meses de brecha y reentrenamiento', 'Necesidad de especialización posterior para la industria');
standards = standards.replace('Cuando el egresado ingresa a Tesla, Intel, Boeing o GM, la empresa debe volver a capacitarlo desde cero porque no domina la jerga técnica internacional.', 
  'Al egresar hacia plantas de manufactura avanzada o nearshoring, el ingeniero requiere un puente de especialización en estándares Tier-1.');
standards = standards.replace('Resultado: Inseguridad técnica en planta, riesgo de fallas operativas y rechazo en entrevistas técnicas de Nearshoring.', 
  'Etapa Fundacional: Base indispensable que se complementa con la especialización en planta y estándares de Nearshoring.');

// 6. Institutional Academic Section & Station Modal
const catalogSectionStart = dev.indexOf('<section class="catalog-section" id="catalog-section">');
const academicSection = dev.slice(academicStart, catalogSectionStart);

// 7. Preview Banner pointing to tracks.html
const previewBanner = `
  <!-- ── Catalog & Labs Preview Callout Banner ── -->
  <div class="catalog-preview-banner" id="catalog-preview-banner">
    <div class="preview-banner-inner">
      <div class="preview-banner-left">
        <div class="preview-banner-badge">
          <i class="fa-solid fa-layer-group"></i> CATÁLOGO CURRICULAR &bull; 34 TRACKS ESP &bull; LABORATORIOS
        </div>
        <h3 class="preview-banner-title">
          34 Tracks Especializados &amp; Laboratorios de Simulación Industrial
        </h3>
        <p class="preview-banner-desc">
          Cada alumno accede a sus laboratorios técnicos (Output Lab 8D, SM-2 Spaced Repetition, STAR Interview, War Room de Incidentes, SCADA Digital Twin) integrados directamente dentro de su track asignado o en la pestaña especializada de laboratorios.
        </p>
      </div>
      <div class="preview-banner-right">
        <a href="/tracks.html" class="btn-open-tracks-studio">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          <span>Abrir Pestaña de 34 Tracks &amp; Simuladores</span>
        </a>
      </div>
    </div>
  </div>
`;

// 8. Institutional Pricing & Commercial Proposal Section
const pricingSection = `
  <!-- ── Institutional Pricing & Commercial Proposal Section ── -->
  <section class="promo-section pricing-institutional-section" id="pricing-institutional-section">
    <div class="promo-container">
      
      <!-- Section Header -->
      <div class="section-header-center">
        <span class="section-badge badge-pricing-institutional">
          <i class="fa-solid fa-file-invoice-dollar"></i> LICENCIA INSTITUCIONAL PLANA &bull; PROPUESTA UNIVERSITARIA
        </span>
        <h2 class="section-title">
          Inversión Institucional para Universidades, <br>
          <span style="background: linear-gradient(135deg, #10b981 0%, #38bdf8 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Una Sola Factura y Cero Cobro a los Alumnos
          </span>
        </h2>
        <p class="section-subtitle">
          Modelo transparente sin compra obligatoria de libros, sin cobro individual a los estudiantes y con acceso ilimitado para toda la matrícula de ingeniería.
        </p>
      </div>

      <!-- Executive Memorandum Box -->
      <div class="pricing-memo-card">
        <div class="pricing-memo-icon">
          <i class="fa-solid fa-quote-left"></i>
        </div>
        <div class="pricing-memo-content">
          <p class="pricing-memo-quote" data-i18n="memo_quote">
            &ldquo;<strong>Mario, gracias por la confianza.</strong> Con lo que me cuentas (<strong>≈1,500 alumnos</strong>, sin límite de uso por estudiante y sin compra de libros), te propongo una <strong>licencia institucional plana</strong>: una sola factura para la Universidad y cero cobro a los alumnos.
            <br><br>
            Todas las opciones incluyen <strong>acceso ilimitado para los ~1,500 alumnos</strong> y un <strong>panel para que los docentes de inglés</strong> vean la práctica de cada grupo.&rdquo;
          </p>
          <div class="pricing-memo-meta">
            <span class="pricing-memo-author"><i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Propuesta Institucional stemOS</span>
            <span class="pricing-memo-tag" data-i18n="memo_tag">Atención Especial: Universidad &bull; Cohorte ≈1,500 Alumnos</span>
          </div>
        </div>
      </div>

      <!-- 3 Pricing Cards Grid -->
      <div class="pricing-cards-grid">
        
        <!-- Option 1: Piloto Cuatrimestral (Recommended / Most Complete) -->
        <div class="pricing-card featured-plan">
          <div class="pricing-card-badge-glow">
            <i class="fa-solid fa-star"></i> MÁS RECOMENDADA &bull; LA MÁS COMPLETA
          </div>
          <div class="pricing-card-header">
            <span class="pricing-plan-tag">Opción 1 &bull; Cobertura Total</span>
            <h3 class="pricing-plan-name" data-i18n="plan_1_name">Piloto Cuatrimestral</h3>
            <p class="pricing-plan-summary" data-i18n="plan_1_summary">Cubre los laboratorios y además el acceso desde casa o celular sin costo extra.</p>
          </div>

          <div class="pricing-price-box">
            <div class="pricing-amount-row">
              <span class="pricing-currency">$</span>
              <span class="pricing-value">95,000</span>
              <span class="pricing-term">MXN + IVA</span>
            </div>
            <div class="pricing-period">por cuatrimestre</div>
            <div class="pricing-unit-metric">
              <i class="fa-solid fa-calculator" style="color:#10b981;"></i>
              <span>Equivale a <strong>~$63 pesos por alumno</strong> en todo el cuatrimestre</span>
            </div>
          </div>

          <ul class="pricing-features-list">
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Acceso ilimitado</strong> para los ~1,500 alumnos matriculados</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Cubre los laboratorios</strong> del centro de cómputo en campus</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Acceso móvil y remoto:</strong> práctica desde casa o celular sin costo extra</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Panel docente de inglés:</strong> seguimiento de práctica en vivo por grupo</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Cero cobro a los alumnos:</strong> sin compra obligatoria de libros</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>34 Tracks ESP + Nivelación MCER</strong> y simuladores de nearshoring incluidos</span>
            </li>
          </ul>

          <div class="pricing-card-action">
            <a href="https://wa.me/5215500000000?text=Hola%20Mario%2C%20me%20interesa%20iniciar%20con%20la%20Opci%C3%B3n%201%20(Piloto%20cuatrimestral%20%2495%2C000%20MXN)%20para%20nuestros%20~1%2C500%20alumnos." target="_blank" class="btn-pricing-primary">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Elegir Piloto Cuatrimestral</span>
            </a>
          </div>
        </div>

        <!-- Option 2: Licencia Anual de Campus (Best Value) -->
        <div class="pricing-card">
          <div class="pricing-card-badge-normal">
            <i class="fa-solid fa-shield-halved"></i> MEJOR VALOR ANUAL &bull; PRECIO CONGELADO
          </div>
          <div class="pricing-card-header">
            <span class="pricing-plan-tag">Opción 2 &bull; Garantía Anual</span>
            <h3 class="pricing-plan-name" data-i18n="plan_2_name">Licencia Anual de Campus</h3>
            <p class="pricing-plan-summary" data-i18n="plan_2_summary">Plan integral institucional para 3 cuatrimestres con soporte docente prioritario.</p>
          </div>

          <div class="pricing-price-box">
            <div class="pricing-amount-row">
              <span class="pricing-currency">$</span>
              <span class="pricing-value">240,000</span>
              <span class="pricing-term">MXN + IVA</span>
            </div>
            <div class="pricing-period">por 3 cuatrimestres ($80,000 por cuatrimestre)</div>
            <div class="pricing-unit-metric" style="color:#38bdf8; background:rgba(56,189,248,0.1);">
              <i class="fa-solid fa-piggy-bank"></i>
              <span><strong>Ahorro de $45,000 MXN</strong> respecto a cuatrimestres individuales</span>
            </div>
          </div>

          <ul class="pricing-features-list">
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Todo lo de la Opción 1</strong> (Campus + Casa/Celular para ~1,500 alumnos)</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Precio congelado por un año completo</strong> (3 cuatrimestres)</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Soporte técnico y pedagógico prioritario</strong> para la plantilla docente</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Actualización continua de contenidos</strong> por carrera y normas industriales</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Emisión de certificados y Open Badges 3.0</strong> institucionales con hash SHA-256</span>
            </li>
          </ul>

          <div class="pricing-card-action">
            <a href="https://wa.me/5215500000000?text=Hola%20Mario%2C%20nos%20interesa%20la%20Opci%C3%B3n%202%20(Licencia%20anual%20de%20campus%20%24240%2C000%20MXN)%20con%20precio%20congelado%20para%20la%20universidad." target="_blank" class="btn-pricing-secondary">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Solicitar Licencia Anual</span>
            </a>
          </div>
        </div>

        <!-- Option 3: Solo Laboratorio (On-Premise) -->
        <div class="pricing-card">
          <div class="pricing-card-badge-muted">
            <i class="fa-solid fa-desktop"></i> ON-PREMISE &bull; SALAS DE CÓMPUTO
          </div>
          <div class="pricing-card-header">
            <span class="pricing-plan-tag">Opción 3 &bull; Centros de Cómputo</span>
            <h3 class="pricing-plan-name" data-i18n="plan_3_name">Solo Laboratorio</h3>
            <p class="pricing-plan-summary" data-i18n="plan_3_summary">Acceso en las computadoras del centro de cómputo para todos los turnos.</p>
          </div>

          <div class="pricing-price-box">
            <div class="pricing-amount-row">
              <span class="pricing-currency">$</span>
              <span class="pricing-value">1,000</span>
              <span class="pricing-term">MXN + IVA</span>
            </div>
            <div class="pricing-period">por equipo / computadora por cuatrimestre</div>
            <div class="pricing-unit-metric" style="color:#f59e0b; background:rgba(245,158,11,0.1);">
              <i class="fa-solid fa-network-wired"></i>
              <span>Ejemplo: <strong>80 computadoras = $80,000 MXN + IVA</strong></span>
            </div>
          </div>

          <ul class="pricing-features-list">
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Acceso en las computadoras</strong> del centro de cómputo escolar</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Válido para todos los alumnos</strong> en sus distintos turnos (matutino/vespertino)</span>
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              <span><strong>Panel docente local</strong> para monitoreo en aula de cómputo</span>
            </li>
            <li style="opacity:0.65;">
              <i class="fa-solid fa-xmark" style="color:#ef4444;"></i>
              <span><em>No incluye acceso remoto desde casa o celular</em></span>
            </li>
          </ul>

          <div class="pricing-card-action">
            <a href="#lab-calculator-anchor" onclick="document.getElementById('input-lab-equipos').focus();" class="btn-pricing-secondary">
              <i class="fa-solid fa-calculator"></i>
              <span data-i18n="btn_calc_lab">Calcular por Equipos</span>
            </a>
          </div>
        </div>

      </div>

      <!-- Interactive Lab Calculator & 15-Min Zoom Demo Box -->
      <div class="pricing-interactive-hub" id="lab-calculator-anchor">
        <div class="pricing-hub-header">
          <div class="pricing-hub-badge">
            <i class="fa-solid fa-comments"></i> CONVERSACIÓN DIRECTA &bull; DIAGNÓSTICO INSTITUCIONAL
          </div>
          <h3 class="pricing-hub-title" data-i18n="hub_title">
            ¿Cuántos equipos tienen entre todos sus laboratorios?
          </h3>
          <p class="pricing-hub-desc" data-i18n="hub_desc">
            Y si te late, lo vemos <strong>15 min por Zoom</strong> y te muestro el portal en vivo, las 25 carreras y el panel docente.
          </p>
        </div>

        <!-- Live Interactive Calculator -->
        <div class="pricing-calc-box">
          <div class="calc-input-row">
            <label for="input-lab-equipos" class="calc-label">
              <i class="fa-solid fa-desktop" style="color:#38bdf8;"></i>
              <span>Número de computadoras en laboratorios:</span>
            </label>
            <div class="calc-input-wrapper">
              <input type="range" id="slider-lab-equipos" min="10" max="300" step="5" value="80" oninput="updateLabCalc(this.value)">
              <input type="number" id="input-lab-equipos" min="1" max="1000" value="80" oninput="updateLabCalc(this.value)">
              <span class="calc-unit">equipos</span>
            </div>
          </div>

          <div class="calc-results-grid">
            <div class="calc-res-item">
              <span class="calc-res-lbl">Inversión Opción 3 (Solo Lab):</span>
              <span class="calc-res-val" id="calc-val-op3">$80,000 MXN + IVA</span>
              <span class="calc-res-sub">($1,000 por equipo / cuatrimestre)</span>
            </div>
            <div class="calc-res-item highlight">
              <span class="calc-res-lbl">Inversión Opción 1 (Piloto Total):</span>
              <span class="calc-res-val" style="color:#10b981;">$95,000 MXN + IVA</span>
              <span class="calc-res-sub">¡Incluye acceso en casa/celular para los 1,500 alumnos!</span>
            </div>
          </div>
        </div>

        <!-- Action Callout Buttons -->
        <div class="pricing-actions-bar">
          <a href="https://wa.me/5215500000000?text=Hola%20Mario%2C%20gracias%20por%20la%20propuesta.%20Nos%20gustar%C3%ADa%20agendar%20la%20sesi%C3%B3n%20de%2015%20min%20por%20Zoom%20para%20revisar%20el%20portal%20de%20stemOS%20y%20el%20panel%20docente%20para%20la%20universidad." target="_blank" class="btn-hub-whatsapp">
            <i class="fa-brands fa-whatsapp"></i>
            <span data-i18n="btn_whatsapp">Contactar por WhatsApp Directo</span>
          </a>

          <a href="https://calendly.com/yepzhi/30min" target="_blank" rel="noopener noreferrer" class="btn-hub-zoom" id="btn-hub-zoom-link" title="Agendar sesión de 15 min en Zoom vía Calendly">
            <i class="fa-solid fa-video"></i>
            <span data-i18n="btn_zoom">Agendar 15 min por Zoom</span>
          </a>

          <a href="mailto:director@stemos.org?subject=Propuesta%20Institucional%20stemOS%20-%20Reuni%C3%B3n%20Zoom&body=Hola%20Mario,%20recibimos%20la%20propuesta%20institucional.%20Nos%20gustar%C3%ADa%20coordinar%20los%2015%20min%20por%20Zoom." class="btn-hub-email">
            <i class="fa-solid fa-envelope"></i>
            <span>Enviar Correo Oficial</span>
          </a>
        </div>

      </div>

    </div>
  </section>
`;

// 9. Footer
const footerStart = dev.indexOf('<footer class="supaste-footer">');
const footerEnd = dev.indexOf('</footer>') + 9;
let footer = dev.slice(footerStart, footerEnd);

// 10. Zoom Modal
const zoomModal = `
  <!-- ── Interactive Zoom Demo Scheduling Modal ── -->
  <div class="stemos-zoom-modal-overlay" id="stemos-zoom-modal" style="display:none;" aria-hidden="true">
    <div class="stemos-zoom-modal-content">
      <button type="button" class="btn-close-zoom-modal" onclick="closeZoomDemoModal()"><i class="fa-solid fa-xmark"></i></button>
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
        <div style="width:36px; height:36px; border-radius:10px; background:#0b5cff; display:flex; align-items:center; justify-content:center; color:#fff;">
          <i class="fa-solid fa-video"></i>
        </div>
        <h3 style="font-size:1.25rem; color:#fff; font-weight:800; margin:0;">Agendar Sesión de 15 min en Zoom</h3>
      </div>
      <p style="font-size:0.88rem; color:#94a3b8; line-height:1.5; margin:0 0 20px 0;">
        Demostración ejecutiva del portal stemOS, recorrido por las 25 carreras de 60 horas y revisión del panel docente de seguimiento de grupos.
      </p>
      
      <form id="zoom-demo-form" onsubmit="submitZoomRequest(event)" style="display:flex; flex-direction:column; gap:12px;">
        <div>
          <label style="display:block; font-size:0.8rem; font-weight:700; color:#cbd5e1; margin-bottom:4px;">Nombre y Cargo:</label>
          <input type="text" id="zoom-input-name" required placeholder="Ej. Dr. Mario González — Director de Carrera" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:10px 12px; color:#fff; font-family:inherit;">
        </div>
        <div>
          <label style="display:block; font-size:0.8rem; font-weight:700; color:#cbd5e1; margin-bottom:4px;">Institución / Universidad:</label>
          <input type="text" id="zoom-input-inst" required placeholder="Ej. Tecnológico de Monterrey / TecNM Saltillo" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:10px 12px; color:#fff; font-family:inherit;">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#cbd5e1; margin-bottom:4px;">Correo Institucional:</label>
            <input type="email" id="zoom-input-email" required placeholder="mario@universidad.edu.mx" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:10px 12px; color:#fff; font-family:inherit;">
          </div>
          <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#cbd5e1; margin-bottom:4px;">WhatsApp / Teléfono:</label>
            <input type="tel" id="zoom-input-phone" required placeholder="+52 844 123 4567" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:10px 12px; color:#fff; font-family:inherit;">
          </div>
        </div>
        <div>
          <label style="display:block; font-size:0.8rem; font-weight:700; color:#cbd5e1; margin-bottom:4px;">Horario sugerido para los 15 min:</label>
          <select id="zoom-input-time" style="width:100%; box-sizing:border-box; background:#1e293b; border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:10px 12px; color:#fff; font-family:inherit;">
            <option value="Mañana (10:00 AM - 12:00 PM)">Mañana (10:00 AM - 12:00 PM)</option>
            <option value="Mediodía (12:00 PM - 2:00 PM)">Mediodía (12:00 PM - 2:00 PM)</option>
            <option value="Tarde (4:00 PM - 6:00 PM)" selected>Tarde (4:00 PM - 6:00 PM)</option>
          </select>
        </div>
        <div style="margin-top:8px;">
          <button type="submit" style="width:100%; background:linear-gradient(135deg, #0b5cff, #004ee6); color:#fff; border:none; border-radius:10px; padding:13px; font-weight:800; font-size:0.95rem; cursor:pointer; box-shadow:0 6px 18px rgba(11,92,255,0.4); font-family:inherit;">
            Confirmar y Solicitar Enlace Zoom
          </button>
        </div>
      </form>
      <div id="zoom-success-msg" style="display:none; text-align:center; padding:20px; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); border-radius:12px; margin-top:14px; color:#34d399; font-weight:700;">
        <i class="fa-solid fa-circle-check" style="font-size:1.8rem; margin-bottom:8px; display:block;"></i>
        ¡Sesión solicitada con éxito! Te contactaremos vía WhatsApp y correo con el enlace de Zoom.
      </div>
    </div>
  </div>
`;

// 11. Scripts (courses.js, dev.js, etc.)
const scriptsStart = dev.indexOf('<script src="/content/courses.js?v=5.12.0"></script>');
const scriptsBlock = dev.slice(scriptsStart);

// 12. Bilingual i18n & Interactive Pricing Controller
const i18nAndCalcScript = `
  <script>
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
      e.preventDefault();
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

    // ─── BILINGUAL I18N CONTROLLER (ES | EN) ───
    var STEMOS_I18N = {
      en: {
        nav_standards: 'Standards vs Academia',
        nav_academic: '60h Academic System',
        nav_catalog: 'ESP Catalog',
        nav_placement: 'Placement Test (30m)',
        nav_pricing: 'Pricing &amp; Licenses',

        hero_subtitle: '<strong>34 specialized industry tracks</strong> of English for Specific Purposes (ESP) &amp; CEFR leveling tracks (A1 to C1) &mdash; engineered for semiconductor fabrication, aerospace avionics, industrial robotics, automotive engineering, medical devices, cross-border trade logistics, quality &amp; EHS, mission-critical energy &amp; data centers, AUTOSAR embedded firmware &amp; Edge AI, and nearshoring supply chain SCM. Aligned with IEEE, SEMI, ISO, IATF, FDA, OSHA, and USMCA standards.',
        btn_take_placement: 'Placement Test (30 min)',
        btn_tracks: 'Explore 34 Tracks &amp; Labs',
        btn_pricing: 'View Proposal &amp; Pricing',
        btn_zoom_nav: 'Schedule Zoom 15m',

        dock_title: 'Nearshoring Simulation &amp; Accreditation:',
        dock_academic: '60h Academic System (25)',
        dock_standards: 'Standards vs. Academia',
        dock_pricing: 'Proposal &amp; Pricing',
        dock_catalog: '34 Tracks &amp; Labs ↗',
        dock_placement: 'Placement Test A1–C1',
        dock_lxp: 'Campus LXP 3D',

        memo_quote: '&ldquo;<strong>Mario, thank you for your trust.</strong> Based on your context (<strong>≈1,500 students</strong>, unlimited student usage, and no book purchases), I propose a <strong>flat institutional license</strong>: a single invoice for the University and zero cost to the students.<br><br>All options include <strong>unlimited access for the ~1,500 students</strong> and a <strong>faculty dashboard for English teachers</strong> to monitor group practice.&rdquo;',
        memo_tag: 'Special Attention: University &bull; Cohort ≈1,500 Students',
        plan_1_name: 'Semester Pilot',
        plan_1_summary: 'Covers on-campus computer labs plus remote mobile and home access at no extra cost.',
        plan_2_name: 'Annual Campus License',
        plan_2_summary: 'Comprehensive institutional plan for 3 consecutive trimesters with locked pricing and faculty support.',
        plan_3_name: 'Computer Lab Only',
        plan_3_summary: 'Access on computer lab workstations for all students across rotating shifts. No remote access.',
        hub_title: 'How many workstations do you have across all your labs?',
        hub_desc: 'If this aligns with your goals, let us schedule a 15-minute Zoom call and I will guide you through the live portal.',
        btn_calc_lab: 'Calculate by Workstations',
        btn_whatsapp: 'Contact via Direct WhatsApp',
        btn_zoom: 'Schedule 15 min via Zoom',

        metric_tracks_lbl: 'ESP Tracks',
        metric_modules_lbl: 'Modules',
        metric_readings_lbl: 'Readings',
        metric_idioms_lbl: 'Native Idioms',
        metric_standards_lbl: 'Standards Aligned',
        footer_copy: '&copy; 2026 Lovelace Feynman Technologies SAPI de CV. All rights reserved.',
        footer_dev: 'Developed by @yepzhi'
      },
      es: {
        nav_standards: 'Estándares vs Academia',
        nav_academic: 'Sistema Académico 60h',
        nav_catalog: 'Catálogo ESP',
        nav_placement: 'Test de Ubicación (30m)',
        nav_pricing: 'Precios &amp; Licencias',

        hero_subtitle: '<strong>34 tracks especializados de industria</strong> (ESP) y tracks de nivelación MCER (A1 a C1) &mdash; diseñados para fabricación de semiconductores, aviónica aeroespacial, robótica industrial, ingeniería automotriz, dispositivos médicos, logística internacional, calidad y EHS, centros de datos y nearshoring. Alineados con estándares IEEE, SEMI, ISO, IATF, FDA, OSHA y T-MEC.',
        btn_take_placement: 'Placement Test (30 min)',
        btn_tracks: 'Explorar 34 Tracks &amp; Labs',
        btn_pricing: 'Ver Propuesta &amp; Precios',
        btn_zoom_nav: 'Agendar Zoom 15m',

        dock_title: 'Simuladores &amp; Labs de Nearshoring:',
        dock_academic: 'Sistema Académico 60h (25)',
        dock_standards: 'Estándares vs. Academia',
        dock_pricing: 'Propuesta &amp; Precios',
        dock_catalog: '34 Tracks &amp; Labs ↗',
        dock_placement: 'Placement Test A1–C1',
        dock_lxp: 'Campus LXP 3D',

        memo_quote: '&ldquo;<strong>Mario, gracias por la confianza.</strong> Con lo que me cuentas (<strong>≈1,500 alumnos</strong>, sin límite de uso por estudiante y sin compra de libros), te propongo una <strong>licencia institucional plana</strong>: una sola factura para la Universidad y cero cobro a los alumnos.<br><br>Todas las opciones incluyen <strong>acceso ilimitado para los ~1,500 alumnos</strong> y un <strong>panel para que los docentes de inglés</strong> vean la práctica de cada grupo.&rdquo;',
        memo_tag: 'Atención Especial: Universidad &bull; Cohorte ≈1,500 Alumnos',
        plan_1_name: 'Piloto Cuatrimestral',
        plan_1_summary: 'Cubre los laboratorios y además el acceso desde casa o celular sin costo extra.',
        plan_2_name: 'Licencia Anual de Campus',
        plan_2_summary: 'Plan integral institucional para 3 cuatrimestres con soporte docente prioritario.',
        plan_3_name: 'Solo Laboratorio',
        plan_3_summary: 'Acceso en las computadoras del centro de cómputo para todos los turnos.',
        hub_title: '¿Cuántos equipos tienen entre todos sus laboratorios?',
        hub_desc: 'Y si te late, lo vemos 15 min por Zoom y te muestro el portal en vivo, las 25 carreras y el panel docente.',
        btn_calc_lab: 'Calcular por Equipos',
        btn_whatsapp: 'Contactar por WhatsApp Directo',
        btn_zoom: 'Agendar 15 min por Zoom',

        metric_tracks_lbl: 'Tracks ESP',
        metric_modules_lbl: 'Módulos',
        metric_readings_lbl: 'Lecturas',
        metric_idioms_lbl: 'Modismos Nativos',
        metric_standards_lbl: 'Alineado a Estándares',
        footer_copy: '&copy; 2026 Lovelace Feynman Technologies SAPI de CV. Todos los derechos reservados.',
        footer_dev: 'Desarrollado por @yepzhi'
      }
    };

    function setPlatformLanguage(lang) {
      if (!STEMOS_I18N[lang]) lang = 'es';
      try {
        localStorage.setItem('stemos_lang', lang);
      } catch (e) {}

      document.documentElement.lang = lang;

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
    }

    window.STEMOS_I18N = STEMOS_I18N;
    window.setPlatformLanguage = setPlatformLanguage;

    document.addEventListener('DOMContentLoaded', function() {
      var savedLang = 'es';
      try {
        savedLang = localStorage.getItem('stemos_lang') || 'es';
      } catch (e) {}
      setPlatformLanguage(savedLang);
    });
  </script>
`;

// Assemble the final index.html
let finalIndex = head + '\n<body class="supaste-theme">\n' + nav + '\n' + hero + '\n' + valueProp + '\n' + standards + '\n' + academicSection + '\n' + previewBanner + '\n' + pricingSection + '\n' + footer + '\n' + zoomModal + '\n' + scriptsBlock;

// Append i18n controller before </body> using function replacer to prevent $' pattern interpretation
finalIndex = finalIndex.replace('</body>', () => i18nAndCalcScript + '\n</body>');

const outputPath = path.join(__dirname, '../index.html');
fs.writeFileSync(outputPath, finalIndex, 'utf8');
console.log('index.html written successfully, length:', finalIndex.length);
