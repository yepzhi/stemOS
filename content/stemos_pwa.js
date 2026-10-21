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

  // 2. Real-Time Network State HUD (Online / Offline Indicator)
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
        'padding: 10px 20px',
        'border-radius: 9999px',
        'font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif',
        'font-size: 0.82rem',
        'font-weight: 700',
        'display: flex',
        'align-items: center',
        'gap: 10px',
        'backdrop-filter: blur(24px)',
        '-webkit-backdrop-filter: blur(24px)',
        'box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45)',
        'transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'pointer-events: none',
        'opacity: 0'
      ].join(';');
      document.body.appendChild(toast);
    }

    if (status === 'offline') {
      toast.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#f59e0b;display:inline-block;box-shadow:0 0 10px #f59e0b;"></span> Modo Sin Conexión — Contenido en caché disponible';
      toast.style.background = 'rgba(15, 23, 42, 0.94)';
      toast.style.color = '#fef3c7';
      toast.style.border = '1px solid rgba(245, 158, 11, 0.4)';
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    } else {
      toast.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 10px #10b981;"></span> Conexión Reestablecida — Sincronizado';
      toast.style.background = 'rgba(15, 23, 42, 0.94)';
      toast.style.color = '#d1fae5';
      toast.style.border = '1px solid rgba(16, 185, 129, 0.4)';
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

  // 3. Custom PWA Install Experience
  let deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar on mobile Chrome
    e.preventDefault();
    deferredInstallPrompt = e;

    // Do not prompt if already dismissed recently
    const dismissedTime = localStorage.getItem('stemos_pwa_dismissed_at');
    if (dismissedTime && (Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 60 * 60 * 1000)) {
      return;
    }

    // Show after slight delay to not interrupt immediate task
    setTimeout(renderInstallBanner, 2500);
  });

  function renderInstallBanner() {
    if (!deferredInstallPrompt || document.getElementById('stemos-pwa-install-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'stemos-pwa-install-banner';
    banner.style.cssText = [
      'position: fixed',
      'bottom: max(24px, env(safe-area-inset-bottom))',
      'right: max(20px, env(safe-area-inset-right))',
      'z-index: 999998',
      'background: rgba(15, 23, 42, 0.95)',
      'backdrop-filter: blur(24px)',
      '-webkit-backdrop-filter: blur(24px)',
      'border: 1px solid rgba(56, 189, 248, 0.35)',
      'box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(2, 132, 199, 0.25)',
      'border-radius: 20px',
      'padding: 16px 20px',
      'max-width: 350px',
      'color: #f8fafc',
      'font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif',
      'animation: pwaSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    ].join(';');

    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
        <img src="/icon-192.svg" width="40" height="40" style="border-radius:10px;box-shadow:0 4px 14px rgba(2,132,199,0.4);" alt="stemOS Logo">
        <div>
          <div style="font-weight:800;font-size:0.96rem;line-height:1.2;">Instalar stemOS</div>
          <div style="font-size:0.75rem;color:#94a3b8;line-height:1.3;margin-top:2px;">Práctica offline y acceso directo en tu dispositivo</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button id="pwa-dismiss-btn" style="background:transparent;border:none;color:#94a3b8;padding:8px 14px;border-radius:10px;font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.2s;">Más tarde</button>
        <button id="pwa-install-btn" style="background:linear-gradient(135deg,#0284c7,#38bdf8);border:none;color:#ffffff;padding:8px 16px;border-radius:999px;font-size:0.82rem;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(2,132,199,0.35);transition:all 0.2s;">Instalar App</button>
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

