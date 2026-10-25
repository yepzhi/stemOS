/**
 * stemOS Enterprise PWA & Offline Resiliency Module
 * Handles:
 * - Service Worker registration & lifecycle management
 * - Network state listeners & floating glassmorphic offline indicator
 * - beforeinstallprompt capture & customized PWA installation banner
 * - Cache synchronization trigger for offline university lab use
 */

(function() {
  'use strict';

  // 1. Service Worker Universal Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('[stemOS PWA] Service Worker registered successfully with scope:', registration.scope);

          // Check for service worker updates
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[stemOS PWA] New version available — will activate on next visit.');
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[stemOS PWA] Service Worker registration failed:', err);
        });
    });
  }

  // 1.1 Request Persistent Storage Quota for Offline Durability
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then((granted) => {
      console.log('[stemOS Storage] Persistent storage quota granted:', granted);
    }).catch(() => {});
  }

  // 2. Real-Time Network State HUD (Online / Offline Indicator — Pure Light Theme)
  function showNetworkToast(status) {
    let toast = document.getElementById('stemos-network-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'stemos-network-toast';
      toast.style.cssText = [
        'position: fixed',
        'bottom: max(20px, env(safe-area-inset-bottom))',
        'left: 50%',
        'transform: translateX(-50%) translateY(80px)',
        'z-index: 999999',
        'padding: 12px 22px',
        'border-radius: 9999px',
        'font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif',
        'font-size: 0.84rem',
        'font-weight: 700',
        'display: flex',
        'align-items: center',
        'gap: 10px',
        'background: #ffffff',
        'color: #0f172a',
        'box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.06)',
        'border: 1px solid #e2e8f0',
        'transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'pointer-events: none',
        'opacity: 0'
      ].join(';');
      document.body.appendChild(toast);
    }

    if (status === 'offline') {
      toast.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#f59e0b;display:inline-block;box-shadow:0 0 8px #f59e0b;"></span> Modo Sin Conexión — Contenido en caché disponible';
      toast.style.background = '#fffbeb';
      toast.style.color = '#92400e';
      toast.style.border = '1px solid #fde68a';
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    } else {
      toast.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 8px #10b981;"></span> Conexión Reestablecida — Sincronizado';
      toast.style.background = '#f0fdf4';
      toast.style.color = '#166534';
      toast.style.border = '1px solid #bbf7d0';
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(80px)';
      }, 3500);
    }
  }

  window.addEventListener('online', () => showNetworkToast('online'));
  window.addEventListener('offline', () => showNetworkToast('offline'));

  // Check initial state if already offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => showNetworkToast('offline'), 1200);
    });
  }

  // 3. Custom PWA Install Experience (Android Chrome / Desktop + iOS Safari Guide)
  let deferredInstallPrompt = null;

  function isStandaloneApp() {
    return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone === true);
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar on mobile Chrome
    e.preventDefault();
    deferredInstallPrompt = e;

    if (isStandaloneApp()) return;

    // Do not prompt if already dismissed recently (7 days)
    const dismissedTime = localStorage.getItem('stemos_pwa_dismissed_at');
    if (dismissedTime && (Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 60 * 60 * 1000)) {
      return;
    }

    setTimeout(renderInstallBanner, 2500);
  });

  function renderInstallBanner() {
    if (!deferredInstallPrompt || isStandaloneApp() || document.getElementById('stemos-pwa-install-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'stemos-pwa-install-banner';
    banner.style.cssText = [
      'position: fixed',
      'bottom: max(24px, env(safe-area-inset-bottom))',
      'right: max(20px, env(safe-area-inset-right))',
      'z-index: 999998',
      'background: #ffffff',
      'border: 1px solid #e2e8f0',
      'box-shadow: 0 20px 45px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.05)',
      'border-radius: 20px',
      'padding: 16px 20px',
      'max-width: 360px',
      'color: #0f172a',
      'font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif',
      'animation: pwaSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    ].join(';');

    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
        <div style="padding:8px 12px;background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.2);border-radius:12px;display:inline-flex;align-items:center;flex-shrink:0;">
          <span style="font-weight:900;font-size:1.1rem;letter-spacing:-0.02em;color:#0f172a;">stem<span style="color:#0284c7;">OS</span><sup style="font-size:0.55em;color:#0284c7;margin-left:2px;">&reg;</sup></span>
        </div>
        <div>
          <div style="font-weight:800;font-size:0.96rem;line-height:1.2;color:#0f172a;">Instalar stemOS</div>
          <div style="font-size:0.75rem;color:#64748b;line-height:1.3;margin-top:2px;">Práctica y audio offline garantizados en tu dispositivo</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button id="pwa-dismiss-btn" style="background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;min-height:44px;min-width:44px;padding:0 16px;border-radius:9999px;font-size:0.82rem;font-weight:600;cursor:pointer;transition:all 0.2s;">Más tarde</button>
        <button id="pwa-install-btn" style="background:#0284c7;border:none;color:#ffffff;min-height:44px;min-width:44px;padding:0 18px;border-radius:9999px;font-size:0.82rem;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(2,132,199,0.3);transition:all 0.2s;">Instalar App</button>
      </div>
    `;

    document.body.appendChild(banner);

    const dismissBtn = document.getElementById('pwa-dismiss-btn');
    const installBtn = document.getElementById('pwa-install-btn');

    if (dismissBtn) {
      dismissBtn.onclick = () => {
        banner.remove();
        localStorage.setItem('stemos_pwa_dismissed_at', Date.now().toString());
      };
    }

    if (installBtn) {
      installBtn.onclick = () => {
        banner.remove();
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          deferredInstallPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('[stemOS PWA] User accepted the install prompt');
            }
            deferredInstallPrompt = null;
          });
        }
      };
    }
  }

  // 3.1 iOS Safari Add-to-Home-Screen Bottom Sheet Guide
  function checkIosSafariInstallPrompt() {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIos || isStandaloneApp()) return;

    // Check 7-day dismissal
    const dismissedTime = localStorage.getItem('stemos_ios_pwa_dismissed_at');
    if (dismissedTime && (Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 60 * 60 * 1000)) {
      return;
    }

    if (document.getElementById('stemos-ios-install-sheet')) return;

    setTimeout(() => {
      if (document.getElementById('stemos-ios-install-sheet')) return;

      const sheet = document.createElement('div');
      sheet.id = 'stemos-ios-install-sheet';
      sheet.style.cssText = [
        'position: fixed',
        'bottom: 0',
        'left: 0',
        'right: 0',
        'z-index: 999998',
        'background: #ffffff',
        'border-top: 1px solid #e2e8f0',
        'box-shadow: 0 -10px 40px rgba(15, 23, 42, 0.12)',
        'border-radius: 24px 24px 0 0',
        'padding: 22px 20px max(24px, env(safe-area-inset-bottom))',
        'color: #0f172a',
        'font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif',
        'animation: pwaSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      ].join(';');

      sheet.innerHTML = `
        <div style="max-width: 480px; margin: 0 auto;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="padding:6px 12px;background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.2);border-radius:10px;font-weight:900;color:#0f172a;font-size:0.95rem;">
                stem<span style="color:#0284c7;">OS</span><sup style="font-size:0.55em;color:#0284c7;margin-left:2px;">&reg;</sup>
              </div>
              <h4 style="margin:0;font-size:0.95rem;font-weight:800;color:#0f172a;">Instala en tu iPhone / iPad</h4>
            </div>
            <button id="ios-pwa-close-btn" style="background:#f1f5f9;border:none;color:#64748b;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:0.9rem;">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <p style="margin:0 0 14px;font-size:0.8rem;color:#64748b;line-height:1.4;">
            Instala la aplicación para estudiar audio y módulos en modo 100% offline sin consumir datos móviles:
          </p>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:10px 14px;border-radius:12px;border:1px solid #e2e8f0;font-size:0.82rem;color:#334155;">
              <span style="width:28px;height:28px;border-radius:50%;background:#e0f2fe;color:#0284c7;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0;">1</span>
              <span>Toca el botón <strong style="color:#0284c7;"><i class="fa-solid fa-arrow-up-from-bracket"></i> Compartir</strong> en la barra inferior de Safari.</span>
            </div>
            <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:10px 14px;border-radius:12px;border:1px solid #e2e8f0;font-size:0.82rem;color:#334155;">
              <span style="width:28px;height:28px;border-radius:50%;background:#dcfce7;color:#166534;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0;">2</span>
              <span>Desliza hacia abajo y elige <strong style="color:#166534;"><i class="fa-regular fa-square-plus"></i> Agregar a inicio</strong>.</span>
            </div>
          </div>
          <button id="ios-pwa-dismiss-btn" style="width:100%;min-height:44px;background:#0284c7;border:none;color:#ffffff;border-radius:12px;font-size:0.88rem;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(2,132,199,0.25);">
            Entendido
          </button>
        </div>
      `;

      document.body.appendChild(sheet);

      const closeBtn = document.getElementById('ios-pwa-close-btn');
      const dismissBtn = document.getElementById('ios-pwa-dismiss-btn');
      const closeHandler = () => {
        sheet.remove();
        localStorage.setItem('stemos_ios_pwa_dismissed_at', Date.now().toString());
      };
      if (closeBtn) closeBtn.onclick = closeHandler;
      if (dismissBtn) dismissBtn.onclick = closeHandler;
    }, 4000);
  }

  // Initialize iOS check on DOM load
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkIosSafariInstallPrompt);
    } else {
      checkIosSafariInstallPrompt();
    }
  }

  // 4. Modern Web Hardware APIs (Phase 85)
  let wakeLockSentinel = null;

  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        wakeLockSentinel = await navigator.wakeLock.request('screen');
        wakeLockSentinel.addEventListener('release', () => {
          console.log('[stemOS WakeLock] Screen wake lock released');
          wakeLockSentinel = null;
        });
        console.log('[stemOS WakeLock] Screen wake lock acquired');
        return true;
      } catch (err) {
        console.warn('[stemOS WakeLock] Could not acquire wake lock:', err.message);
      }
    }
    return false;
  }

  async function releaseWakeLock() {
    if (wakeLockSentinel) {
      try {
        await wakeLockSentinel.release();
        wakeLockSentinel = null;
      } catch (err) {}
    }
  }

  // Re-acquire wake lock if page becomes visible again
  document.addEventListener('visibilitychange', async () => {
    if (wakeLockSentinel !== null && document.visibilityState === 'visible') {
      await requestWakeLock();
    }
  });

  // Haptic feedback helper
  function vibrate(pattern) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern || 25);
      } catch (e) {}
    }
  }

  // Badging API
  function setBadge(count) {
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(count).catch(() => {});
    }
  }

  function clearBadge() {
    if ('clearAppBadge' in navigator) {
      navigator.clearAppBadge().catch(() => {});
    }
  }

  // ARIA Live Announcer for Screen Readers
  function announce(message, politeness) {
    let announcer = document.getElementById('stemos-a11y-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'stemos-a11y-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', politeness || 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }

  // 5. Universal Keyboard Accessibility: Escape key modal dismissal & Light-Dismiss
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const openModals = document.querySelectorAll(
        '.modal-overlay.active, .stemos-payment-modal-overlay[style*="display: block"], .cs-modal-overlay.active, [id*="modal"][style*="display: flex"], [id*="modal"][style*="display: block"]'
      );
      openModals.forEach((modal) => {
        if (modal.id === 'modal-google-signin' && typeof window.closeGoogleModal === 'function') {
          window.closeGoogleModal();
        } else if (modal.id === 'stemos-payment-modal') {
          modal.style.display = 'none';
        } else if (modal.classList.contains('active')) {
          modal.classList.remove('active');
        } else {
          modal.style.display = 'none';
        }
      });

      const navPanel = document.getElementById('supaste-mobile-nav-panel');
      if (navPanel && navPanel.classList.contains('open')) {
        if (typeof window.toggleMobileNav === 'function') window.toggleMobileNav(false);
      }
    }
  });

  // 6. Expose Global stemOS PWA & Hardware Utility
  window.stemOS_PWA = {
    triggerOfflineSync: function() {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ action: 'CACHE_EVERYTHING' });
        showNetworkToast('online');
      }
    },
    isStandalone: function() {
      return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone === true);
    },
    requestWakeLock: requestWakeLock,
    releaseWakeLock: releaseWakeLock,
    vibrate: vibrate,
    setBadge: setBadge,
    clearBadge: clearBadge,
    announce: announce
  };
})();

