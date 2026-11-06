/**
 * stemOS — Universal Online Payments & Subscriptions Engine
 * Implements:
 * 1. Individual Student Subscription ($49 MXN / month minimum)
 * 2. Online Payment Gateway (Stripe Checkout with Apple Pay, Google Pay, Credit/Debit Cards)
 * 3. Institutional Scholarship Code / Folio Voucher Redemption
 * 4. Instant automatic reconciliation, voluntary contribution tracking, and local/cloud persistence
 * 5. Modern White Glassmorphic Design System (Light Theme)
 */

(function () {
  'use strict';

  function escapeHTML(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- 1. Subscription State Management ---
  const SUBSCRIPTION_STORAGE_KEY = 'stemos_subscription';

  function getSubscription() {
    try {
      const raw = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      status: 'FREE_TRIAL',
      plan: 'free',
      amount: 0,
      active: false
    };
  }

  function setSubscription(subData) {
    try {
      localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(subData));
      // Also update student profile if present
      const profRaw = localStorage.getItem('stemos_student_profile');
      if (profRaw) {
        const prof = JSON.parse(profRaw);
        prof.hasActiveSubscription = true;
        prof.subscriptionPlan = subData.plan || 'individual_monthly';
        prof.subscriptionPaidAt = subData.paidAt || new Date().toISOString();
        localStorage.setItem('stemos_student_profile', JSON.stringify(prof));
      }
    } catch (e) {
      console.warn('[stemOS Payments] Storage write failed:', e);
    }
  }

  // --- 2. Payment Modal Controller (Clean White Theme) ---
  function openPaymentModal(initialAmount = 49) {
    let modal = document.getElementById('stemos-payment-modal') || document.getElementById('spei-checkout-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'stemos-payment-modal';
      modal.className = 'modal-overlay stemos-payment-modal-overlay';
      document.body.appendChild(modal);
    }

    // Identify student profile
    let userName = 'Estudiante';
    let userEmail = '';
    let userId = 'student_' + Math.floor(1000 + Math.random() * 9000);

    try {
      const profRaw = localStorage.getItem('stemos_student_profile');
      if (profRaw) {
        const p = JSON.parse(profRaw);
        if (p.name) userName = p.name;
        if (p.email) userEmail = p.email;
        if (p.folio || p.matricula) userId = p.folio || p.matricula;
      }
    } catch (e) {}

    const minPrice = 49;
    const currencyLabel = 'MXN';
    let selectedAmount = Math.max(minPrice, Number(initialAmount) || 69);

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderCheckoutStep();

    function renderCheckoutStep() {
      const pill1 = 69;
      const pill2 = 199;
      const pill3 = 49;

      modal.innerHTML = `
        <div class="stemos-payment-dialog" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; width:100%; max-width:540px; padding:32px; box-shadow:0 25px 70px rgba(15,23,42,0.18), 0 4px 16px rgba(15,23,42,0.06); position:relative; max-height:92vh; overflow-y:auto; color:#0f172a; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
          
          <!-- Close Button -->
          <button type="button" onclick="window.closeStemosPaymentModal()" style="position:absolute; top:20px; right:20px; background:#f8fafc; border:1px solid #e2e8f0; color:#64748b; cursor:pointer; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <!-- Modal Header -->
          <div style="display:flex; align-items:center; gap:14px; margin-bottom:18px;">
            <div style="background:linear-gradient(135deg, #0284c7, #2563eb); color:#ffffff; width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(2,132,199,0.28); flex-shrink:0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <div>
              <div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#0284c7;">stemOS &bull; Acceso Individual Alumno</div>
              <h2 style="font-family:'Outfit',sans-serif; font-size:1.35rem; font-weight:800; color:#0f172a; margin:2px 0 0;">Suscripción stemOS • Plan Individual</h2>
            </div>
          </div>

          <!-- Description -->
          <p style="font-size:0.88rem; color:#475569; line-height:1.55; margin-bottom:18px;">
            El registro es <strong>100% gratuito</strong>. Con tu plan cuatrimestral de <strong>$69 MXN</strong> (o anual de $199 MXN) desbloqueas acceso total e ilimitado a todos los módulos y acreditaciones de stemOS:
          </p>

          <!-- Benefits Checklist -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:16px 18px; margin-bottom:22px; font-size:0.84rem; color:#334155; display:flex; flex-direction:column; gap:9px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="color:#10b981; font-weight:900; font-size:1rem;">✓</span>
              <span><strong>34 Tracks de Especialidad Técnica ESP</strong> (Semiconductores, IA, Robótica)</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="color:#10b981; font-weight:900; font-size:1rem;">✓</span>
              <span><strong>Simuladores Industriales Interactivos</strong> (Cleanroom, STAR Interview, War Room)</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="color:#10b981; font-weight:900; font-size:1rem;">✓</span>
              <span><strong>Certificados Oficiales &amp; Open Badges 3.0</strong> verificables con hash SHA-256</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="color:#10b981; font-weight:900; font-size:1rem;">✓</span>
              <span><strong>Práctica desde celular, laptop o PC</strong> con modo PWA offline</span>
            </div>
          </div>

          <!-- Selector de Aporte / Presets -->
          <label style="display:block; font-size:0.75rem; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px;">Elige tu plan:</label>
          
          <div style="display:flex; gap:10px; margin-bottom:16px;">
            <button type="button" class="spei-amount-pill ${selectedAmount === pill1 ? 'active' : ''}" onclick="window.setStemosPaymentAmount(${pill1})">
              $${pill1} ${currencyLabel}<br><span style="font-size:0.68rem; opacity:0.8;">(Cuatrimestral - 4 meses)</span>
            </button>
            <button type="button" class="spei-amount-pill ${selectedAmount === pill2 ? 'active' : ''}" onclick="window.setStemosPaymentAmount(${pill2})">
              $${pill2} ${currencyLabel}<br><span style="font-size:0.68rem; opacity:0.8;">(Anual - Mejor Valor)</span>
            </button>
            <button type="button" class="spei-amount-pill ${selectedAmount === pill3 ? 'active' : ''}" onclick="window.setStemosPaymentAmount(${pill3})">
              $${pill3} ${currencyLabel}<br><span style="font-size:0.68rem; opacity:0.8;">(Aporte Mensual)</span>
            </button>
          </div>

          <div style="margin-bottom:22px;">
            <label style="font-size:0.75rem; color:#64748b; font-weight:600; display:block; margin-bottom:5px;">O introduce un monto personalizado (mínimo $${minPrice} ${currencyLabel}):</label>
            <div style="position:relative;">
              <span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); font-weight:800; color:#0284c7; font-size:1.1rem;">$</span>
              <input type="number" id="stemos-custom-amount" min="${minPrice}" step="1" value="${selectedAmount}" oninput="window.setCustomStemosAmount(this.value)" style="width:100%; box-sizing:border-box; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:12px; padding:12px 14px 12px 30px; color:#0f172a; font-weight:700; font-size:1rem; outline:none; transition:border-color 0.2s;">
            </div>
          </div>

          <!-- Action Buttons (Stripe Online Checkout & Folio Only) -->
          <div style="display:flex; flex-direction:column; gap:12px;">
            <!-- Stripe Checkout (Card, Apple Pay, Google Pay) -->
            <button type="button" class="btn-primary" style="width:100%; padding:15px; font-size:0.95rem; font-weight:800; border-radius:14px; background:linear-gradient(135deg, #0284c7, #2563eb); color:#ffffff; border:none; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 6px 18px rgba(2,132,199,0.28); transition:transform 0.15s, box-shadow 0.15s;" onclick="window.startStripeCheckoutFromModal('${escapeHTML(userId)}')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <span>Pagar con Tarjeta, Apple Pay o Google Pay</span>
            </button>

            <!-- Supported Payment Brands Strip -->
            <div style="display:flex; align-items:center; justify-content:center; gap:14px; color:#94a3b8; font-size:0.75rem; font-weight:700; margin-top:2px;">
              <span><i class="fa-brands fa-cc-visa"></i> Visa</span>
              <span>&bull;</span>
              <span><i class="fa-brands fa-cc-mastercard"></i> Mastercard</span>
              <span>&bull;</span>
              <span><i class="fa-brands fa-apple"></i> Apple Pay</span>
              <span>&bull;</span>
              <span><i class="fa-brands fa-google-pay"></i> Google Pay</span>
            </div>
            
            <!-- Folio / Voucher Redemption -->
            <button type="button" class="btn-voucher" style="width:100%; padding:11px; font-size:0.82rem; font-weight:700; border-radius:12px; background:#f8fafc; color:#64748b; border:1.5px dashed #cbd5e1; cursor:pointer; margin-top:4px; transition:all 0.15s ease;" onclick="window.redeemFolioCode('${escapeHTML(userId)}')">
              <i class="fa-solid fa-ticket"></i> Tengo un código de beca institucional / Folio
            </button>
          </div>
        </div>
      `;
    }

    window.setStemosPaymentAmount = function(amt) {
      selectedAmount = amt;
      renderCheckoutStep();
    };

    window.setCustomStemosAmount = function(val) {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed) && parsed >= minPrice) {
        selectedAmount = parsed;
      }
    };

    window.closeStemosPaymentModal = function() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    window.startStripeCheckoutFromModal = async function(uId) {
      const btn = modal.querySelector('.btn-primary');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>Conectando con pasarela segura Stripe...</span>';
      }

      try {
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uId, customAmount: selectedAmount, currency: 'mxn' })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          window.location.href = data.url;
        } else if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
          // Local development sandbox fallback only
          simulateSuccessfulPayment({
            id: 'stripe_mock_' + Date.now(),
            method: 'Stripe Card / Apple Pay (Sandbox)',
            amountReceived: selectedAmount,
            voluntaryContribution: Math.max(0, selectedAmount - 49)
          });
        } else {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Pagar con Tarjeta, Apple Pay o Google Pay</span>';
          }
          alert('El servicio de cobro con tarjeta está actualizándose temporalmente. Puedes ingresar con tu código de beca institucional o intentar nuevamente.');
        }
      } catch (err) {
        if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
          simulateSuccessfulPayment({
            id: 'stripe_mock_' + Date.now(),
            method: 'Stripe Online Checkout (Sandbox)',
            amountReceived: selectedAmount,
            voluntaryContribution: Math.max(0, selectedAmount - 49)
          });
        } else {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Pagar con Tarjeta, Apple Pay o Google Pay</span>';
          }
          alert('No se pudo conectar con la pasarela Stripe. Por favor revisa tu conexión o ingresa tu código de beca institucional.');
        }
      }
    };

    window.redeemFolioCode = function(uId) {
      const code = prompt('Ingresa tu código de beca institucional o Folio universitario (ej. STEM-2026-XXXX, UPBC-XXXX):');
      if (!code || !code.trim()) return;

      const cleanCode = code.trim().toUpperCase();
      const validInstitutionalPattern = /^(STEM|UPBC|TECNM|UTT|UACJ|BECA)-[A-Z0-9-]{4,20}$/;
      if (validInstitutionalPattern.test(cleanCode)) {
        simulateSuccessfulPayment({
          id: 'voucher_' + cleanCode,
          method: 'Beca Universitaria / Folio [' + cleanCode + ']',
          amountReceived: 0,
          voluntaryContribution: 0,
          isVoucher: true
        });
      } else {
        alert('Código de folio inválido. El folio debe tener formato institucional oficial (ej. STEM-XXXX o UPBC-XXXX).');
      }
    };

    function simulateSuccessfulPayment(order) {
      const subRecord = {
        status: 'ACTIVE',
        plan: 'individual_monthly',
        amount: order.amountReceived,
        method: order.method,
        paidAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        transactionId: order.id,
        benefits: '34_TRACKS_UNLIMITED'
      };
      setSubscription(subRecord);

      renderSuccess(order);
    }

    function renderSuccess(order) {
      const extraThanks = (order.voluntaryContribution > 0)
        ? `<div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:14px; padding:12px 14px; margin-bottom:18px; font-size:0.84rem; color:#065f46; font-weight:700; text-align:left;">
             🚀 ¡Muchísimas gracias por tu aporte voluntario adicional de $${order.voluntaryContribution} MXN! Tu generosidad ayuda a sostener los laboratorios y la infraestructura gratuita para miles de estudiantes.
           </div>`
        : '';

      modal.innerHTML = `
        <div class="stemos-payment-dialog" style="background:#ffffff; border:1.5px solid #10b981; border-radius:24px; width:100%; max-width:540px; padding:36px; box-shadow:0 25px 70px rgba(15,23,42,0.18), 0 0 30px rgba(16,185,129,0.12); position:relative; text-align:center; color:#0f172a; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
          
          <div style="width:72px; height:72px; margin:0 auto 16px auto; border-radius:50%; background:linear-gradient(135deg, #10b981, #059669); display:flex; align-items:center; justify-content:center; font-size:2.2rem; color:#ffffff; box-shadow:0 8px 24px rgba(16,185,129,0.35);">
            ✓
          </div>

          <h2 style="font-family:'Outfit',sans-serif; font-size:1.6rem; font-weight:900; color:#0f172a; margin-bottom:6px;">¡Acceso Individual Desbloqueado!</h2>
          <span style="font-size:0.82rem; color:#059669; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; display:block; margin-bottom:18px;">Suscripción Activa &bull; Todos los Beneficios Incluidos</span>

          ${extraThanks}

          <p style="font-size:0.9rem; color:#475569; line-height:1.55; margin-bottom:24px;">
            Tu suscripción mediante <strong>${escapeHTML(order.method)}</strong> ha sido activada con éxito. Tu cuenta ahora cuenta con acceso total a los <strong>34 Tracks de Especialidad</strong>, los simuladores de planta y las micro-credenciales <strong>Open Badges 3.0</strong>.
          </p>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <a href="/app.html" class="btn-primary" style="width:100%; box-sizing:border-box; padding:14px; font-size:0.95rem; font-weight:800; border-radius:14px; background:linear-gradient(135deg, #10b981, #0284c7); color:#ffffff; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 16px rgba(16,185,129,0.35);">
              <span>Entrar a la Plataforma (Campus Virtual)</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <button type="button" class="btn-secondary" style="width:100%; padding:10px; font-size:0.82rem; font-weight:700; border-radius:10px; background:#f8fafc; color:#64748b; border:1px solid #e2e8f0; cursor:pointer;" onclick="window.closeStemosPaymentModal()">
              Permanecer en esta página
            </button>
          </div>
        </div>
      `;
    }
  }

  // --- 3. Expose Global Payment API ---
  window.openStemosPaymentModal = openPaymentModal;
  window.openSpeiCheckoutModal = openPaymentModal; // Compatible alias
  window.closeStemosPaymentModal = function () {
    const modal = document.getElementById('stemos-payment-modal') || document.getElementById('spei-checkout-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  window.closeSpeiModal = window.closeStemosPaymentModal;
  window.getStemosSubscription = getSubscription;
  window.setStemosSubscription = setSubscription;

  // Auto-init helper on click of any .btn-trigger-payment
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-trigger-payment').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const amt = parseInt(this.getAttribute('data-amount') || '49', 10);
        openPaymentModal(amt);
      });
    });
  });
})();
