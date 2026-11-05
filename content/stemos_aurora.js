/**
 * stemOS Living Aurora & Mathematical Grid Engine
 * Ported from JóvenesSTEM® (ReactBits Architecture)
 * Animated ethereal orbs + interactive dot grid on high-performance Canvas
 * Brand colors: #0284c7 (Sky), #00a896 (Teal), #277eff (Electric Blue), #38bdf8 (Cyan)
 * Fixed-viewport GPU-accelerated backdrop with visibility pause (0% CPU/Battery in background).
 */
(function () {
  'use strict';

  const BRAND = {
    primary:  [2, 132, 199],   // #0284c7
    teal:     [0, 168, 150],   // #00a896
    mid:      [39, 126, 255],  // #277eff
    deep:     [30, 58, 138],   // #1e3a8a
    accent:   [56, 189, 248],  // #38bdf8
  };

  function lerpColor(a, b, t) {
    return a.map((v, i) => Math.round(v + (b[i] - v) * t));
  }

  class StemosAuroraCanvas {
    constructor(container, options = {}) {
      this.container = container || document.body;
      this.isFixed = options.fixed !== undefined ? options.fixed : true;
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.orbs = [];
      this.dots = [];
      this.mouse = { x: -9999, y: -9999 };
      this.time = 0;
      this.raf = null;
      this.lastUserInteraction = 0;
      this.isVisible = true;
      this._setup();
    }

    _setup() {
      const c = this.canvas;
      c.className = 'aurora-viewport-canvas';
      if (this.isFixed) {
        Object.assign(c.style, {
          position: 'fixed',
          inset: '0',
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: '0',
        });
        document.body.insertBefore(c, document.body.firstChild);
      } else {
        Object.assign(c.style, {
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: '0',
        });
        this.container.style.position = 'relative';
        this.container.insertBefore(c, this.container.firstChild);
      }

      this._resize();
      this._initOrbs();
      this._initDots();

      // Optimize: Pause RAF when tab is hidden (0% CPU/Battery)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.isVisible = false;
          if (this.raf) {
            cancelAnimationFrame(this.raf);
            this.raf = null;
          }
        } else {
          this.isVisible = true;
          if (!this.raf) {
            this.raf = requestAnimationFrame(() => this._tick());
          }
        }
      });

      window.addEventListener('resize', () => {
        this._resize();
        this._initDots();
      });

      window.addEventListener('mousemove', (e) => {
        if (this.isFixed) {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
        } else {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.x = e.clientX - rect.left;
          this.mouse.y = e.clientY - rect.top;
        }
        this.lastUserInteraction = Date.now();
      }, { passive: true });

      const handleTouch = (e) => {
        if (!e.touches || !e.touches[0]) return;
        if (this.isFixed) {
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
        } else {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.x = e.touches[0].clientX - rect.left;
          this.mouse.y = e.touches[0].clientY - rect.top;
        }
        this.lastUserInteraction = Date.now();
      };
      window.addEventListener('touchstart', handleTouch, { passive: true });
      window.addEventListener('touchmove', handleTouch, { passive: true });

      this._tick();
    }

    _resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = this.isFixed ? window.innerWidth : this.container.offsetWidth;
      const h = this.isFixed ? window.innerHeight : this.container.offsetHeight;
      this.canvas.width  = w * dpr;
      this.canvas.height = h * dpr;
      this.canvas.style.width  = w + 'px';
      this.canvas.style.height = h + 'px';
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
      this.W = w;
      this.H = h;
    }

    _initOrbs() {
      const colorSets = [
        [BRAND.primary, BRAND.mid],
        [BRAND.teal, BRAND.accent],
        [BRAND.mid, BRAND.teal],
        [BRAND.primary, BRAND.deep],
      ];
      this.orbs = colorSets.map(([c1, c2], i) => ({
        x: (this.W / 4) * i + this.W / 8,
        y: this.H * (0.3 + 0.4 * Math.sin(i * 1.5)),
        baseR: Math.min(this.W, this.H) * (0.35 + 0.1 * (i % 2)),
        color1: c1,
        color2: c2,
        phase: (i * Math.PI) / 2,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        tSpeed: 0.0003 + i * 0.0001,
      }));
    }

    _initDots() {
      this.dots = [];
      const SPACING = 36;
      const cols = Math.ceil(this.W / SPACING) + 1;
      const rows = Math.ceil(this.H / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          this.dots.push({
            origX: c * SPACING,
            origY: r * SPACING,
            x: c * SPACING,
            y: r * SPACING,
            proximity: 0,
          });
        }
      }
    }

    _tick() {
      if (!this.isVisible) return;
      this.time += 1;
      const { ctx, W, H } = this;

      // Soft light canvas clear (fuses seamlessly with #f8fafc)
      ctx.clearRect(0, 0, W, H);

      // Draw living aurora floating blobs
      this.orbs.forEach((orb) => {
        orb.x += orb.vx + Math.sin(this.time * orb.tSpeed + orb.phase) * 0.5;
        orb.y += orb.vy + Math.cos(this.time * orb.tSpeed + orb.phase * 1.3) * 0.4;

        if (orb.x < -orb.baseR) orb.x = W + orb.baseR;
        if (orb.x > W + orb.baseR) orb.x = -orb.baseR;
        if (orb.y < -orb.baseR) orb.y = H + orb.baseR;
        if (orb.y > H + orb.baseR) orb.y = -orb.baseR;

        const pulse = 1 + Math.sin(this.time * 0.006 + orb.phase) * 0.08;
        const r = orb.baseR * pulse;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        const col = lerpColor(orb.color1, orb.color2, (Math.sin(this.time * 0.003 + orb.phase) + 1) / 2);
        grad.addColorStop(0, `rgba(${col.join(',')}, 0.13)`);
        grad.addColorStop(0.5, `rgba(${col.join(',')}, 0.05)`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.save();
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Interactive Mathematical Dot Grid
      const MAX_DIST = 110;
      const isInteracting = (Date.now() - this.lastUserInteraction) < 1800;

      for (let i = 0; i < this.dots.length; i++) {
        const d = this.dots[i];
        if (isInteracting) {
          const dx = this.mouse.x - d.origX;
          const dy = this.mouse.y - d.origY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const force = (1 - dist / MAX_DIST);
            const targetProx = force;
            d.proximity += (targetProx - d.proximity) * 0.2;
            const push = force * 10;
            const angle = Math.atan2(dy, dx);
            d.x = d.origX - Math.cos(angle) * push;
            d.y = d.origY - Math.sin(angle) * push;
          } else {
            d.proximity += (0 - d.proximity) * 0.08;
            d.x += (d.origX - d.x) * 0.12;
            d.y += (d.origY - d.y) * 0.12;
          }
        } else {
          d.proximity += (0 - d.proximity) * 0.08;
          d.x += (d.origX - d.x) * 0.12;
          d.y += (d.origY - d.y) * 0.12;
        }

        // Draw dot
        const baseAlpha = 0.035;
        const alpha = baseAlpha + d.proximity * 0.35;
        const r = 1 + d.proximity * 1.5;

        ctx.fillStyle = d.proximity > 0.05 ? `rgba(2, 132, 199, ${alpha})` : `rgba(15, 23, 42, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      this.raf = requestAnimationFrame(() => this._tick());
    }

    destroy() {
      if (this.raf) cancelAnimationFrame(this.raf);
      this.canvas.remove();
    }
  }

  let instance = null;

  function init() {
    if (instance) return;
    instance = new StemosAuroraCanvas(document.body, { fixed: true });
    window._stemosAuroraInstance = instance;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.StemosAuroraCanvas = StemosAuroraCanvas;
  window.initStemosAurora = init;
})();

