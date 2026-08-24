/* EliteEnergy — landing page behaviour
   Calculator rates and Telegram links live in CONFIG below. */
const CONFIG = {
  botUrl: "https://t.me/EliteEnergybot",
  supportUrl: "https://t.me/xeriy",
  burnCostPerTransfer: 6.5,   // TRX burned per TRC-20 transfer with no energy
  rentPricePerTransfer: 3     // TRX charged per transfer when renting
};
class App {
  get props() { return CONFIG; }









  initGL() {
    const cv = document.getElementById('gl');
    if (!cv || this._renderer) return;
    const T = window.THREE;
    const w = () => innerWidth, hh = () => innerHeight;
    const scene = new T.Scene();
    scene.fog = new T.FogExp2(0x050810, 0.052);
    const cam = new T.PerspectiveCamera(56, w() / hh(), 0.1, 120);
    cam.position.set(0, 0, 26);
    const renderer = new T.WebGLRenderer({ canvas: cv, alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    const mob = innerWidth < 760;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mob ? 1.15 : 1.5));
    renderer.setSize(w(), hh(), false);
    this._renderer = renderer;

    const small = w() < 760;
    const N = small ? 700 : (w() < 1100 ? 1500 : 2200);
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), spd = new Float32Array(N);
    const gold = new T.Color(0xF0AE38), ice = new T.Color(0x7BA6DE);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 78;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 62;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 48 - 8;
      const c = Math.random() < 0.22 ? gold : ice;
      const k = 0.35 + Math.random() * 0.65;
      col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k;
      spd[i] = 0.6 + Math.random() * 1.9;
    }
    const pg = new T.BufferGeometry();
    pg.setAttribute('position', new T.BufferAttribute(pos, 3));
    pg.setAttribute('color', new T.BufferAttribute(col, 3));
    const field = new T.Points(pg, new T.PointsMaterial({
      size: small ? 0.13 : 0.11, vertexColors: true, transparent: true, opacity: 0.85,
      depthWrite: false, blending: T.AdditiveBlending, sizeAttenuation: true
    }));
    scene.add(field);

    const core = new T.Group();
    const shellGeo = new T.IcosahedronGeometry(7.4, 1);
    core.add(new T.LineSegments(new T.WireframeGeometry(shellGeo),
      new T.LineBasicMaterial({ color: 0xF0AE38, transparent: true, opacity: 0.115, blending: T.AdditiveBlending, depthWrite: false })));
    const inner = new T.IcosahedronGeometry(4.3, 0);
    core.add(new T.LineSegments(new T.WireframeGeometry(inner),
      new T.LineBasicMaterial({ color: 0x7BA6DE, transparent: true, opacity: 0.16, blending: T.AdditiveBlending, depthWrite: false })));
    core.position.set(small ? 0 : 13, 3, -6);
    scene.add(core);

    const ringGeo = new T.RingGeometry(11.6, 11.7, 96);
    const ring = new T.Mesh(ringGeo, new T.MeshBasicMaterial({
      color: 0xF0AE38, transparent: true, opacity: 0.09, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false
    }));
    ring.position.copy(core.position);
    ring.rotation.x = 1.14;
    scene.add(ring);

    this._onResize = () => {
      cam.aspect = w() / hh();
      cam.updateProjectionMatrix();
      renderer.setSize(w(), hh(), false);
    };
    addEventListener('resize', this._onResize);

    let hidden = false;
    document.addEventListener('visibilitychange', () => { hidden = document.hidden; });
    const clock = new T.Clock();
    const scrollNorm = () => {
      const max = Math.max(1, document.body.scrollHeight - innerHeight);
      return Math.min(1, Math.max(0, (window.scrollY || 0) / max));
    };
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      if (hidden) return;
      const t = clock.getElapsedTime(), s = scrollNorm();
      const p = pg.attributes.position.array;
      for (let i = 0; i < N; i++) {
        p[i * 3 + 1] += spd[i] * 0.012;
        if (p[i * 3 + 1] > 31) p[i * 3 + 1] = -31;
      }
      pg.attributes.position.needsUpdate = true;
      field.rotation.y = t * 0.012 + s * 0.5;
      core.rotation.y = t * 0.055 + s * 2.4;
      core.rotation.x = Math.sin(t * 0.14) * 0.16 + s * 0.5;
      ring.rotation.z = t * 0.06;
      cam.position.y = -s * 9;
      cam.position.x = Math.sin(t * 0.1) * 0.7;
      cam.lookAt(0, cam.position.y * 0.5, 0);
      renderer.render(scene, cam);
    };
    tick();
  }

  initMotion() {
    if (this._motion) return;
    this._motion = true;
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(['#how .fs', '#how .fs-n', '.pane', '.glow', '.cc'], { clearProps: 'all' });
    ScrollTrigger.getAll().forEach(t => {
      if (!t.trigger || !document.contains(t.trigger)) { try { t.kill(); } catch (e) {} }
    });
    const trigs = this._trigs = [];
    const track = tw => { if (tw && tw.scrollTrigger) trigs.push(tw.scrollTrigger); return tw; };

    if (window.Lenis) {
      const lenis = window.__lenis || new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
      if (!window.__lenis) {
        window.__lenis = lenis;
        gsap.ticker.add(time => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        document.documentElement.style.scrollBehavior = 'auto';
      }
      lenis.on('scroll', ScrollTrigger.update);
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
          const el = document.querySelector(a.getAttribute('href'));
          if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -84 }); }
        });
      });
    }

    const heavyOk = innerWidth >= 900 && matchMedia('(hover: hover)').matches;
    if (heavyOk) gsap.utils.toArray('.pane').forEach(el => {
      track(gsap.fromTo(el, { yPercent: 2.4 }, {
        yPercent: -2.4, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      }));
    });

    gsap.utils.toArray('.glow').forEach((el, i) => {
      track(gsap.to(el, {
        yPercent: (innerWidth < 760 ? (i % 2 ? -10 : 12) : (i % 2 ? -22 : 26)), ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 }
      }));
    });

    const cc = document.querySelector('.cc');
    if (cc && innerWidth >= 1040) {
      track(gsap.to(cc, {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
      }));
    }

    const steps = gsap.utils.toArray('#how .fs');
    if (steps.length && innerWidth >= 900) {
      steps.forEach(s => {
        const st = { trigger: s, start: 'top 86%', end: 'top 48%', scrub: 0.4 };
        track(gsap.fromTo(s, { opacity: 0.42 },
          { opacity: 1, ease: 'none', immediateRender: false, scrollTrigger: st }));
        const n = s.querySelector('.fs-n');
        if (n) track(gsap.fromTo(n, { color: '#334263' },
          { color: '#F0AE38', ease: 'none', immediateRender: false, scrollTrigger: st }));
      });
    }

    ScrollTrigger.refresh();

    if (!this._bpWatch) {
      this._bpWatch = true;
      let last = innerWidth;
      addEventListener('resize', () => {
        if (Math.abs(innerWidth - last) < 60) return;
        last = innerWidth;
        clearTimeout(this._bpT);
        this._bpT = setTimeout(() => ScrollTrigger.refresh(), 260);
      }, { passive: true });
    }
  }

  componentDidMount() {
    const nf = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

    const reduceMo = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ready = (test, cb, tries = 60) => {
      if (test()) return cb();
      if (tries <= 0) return;
      setTimeout(() => ready(test, cb, tries - 1), 100);
    };

    if (!reduceMo) ready(() => window.THREE, () => this.initGL());
    if (!reduceMo) ready(() => window.gsap && window.ScrollTrigger, () => this.initMotion());

    const slider = document.getElementById('tx');
    const el = {
      v: document.getElementById('txv'), b: document.getElementById('burn'), r: document.getElementById('rent'),
      s: document.getElementById('save'), p: document.getElementById('pct'), c: document.getElementById('ctx'),
      bar: document.getElementById('rentbar')
    };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf, shown = 1050;

    const tween = target => {
      if (reduce) { shown = target; el.s.textContent = nf(target); return; }
      cancelAnimationFrame(raf);
      const from = shown, t0 = performance.now(), dur = 520;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        shown = from + (target - from) * e;
        el.s.textContent = nf(shown);
        if (k < 1) raf = requestAnimationFrame(step);
      };
      step(t0);
    };

    const update = () => {
      if (!slider || !el.v) return;
      const burnCost = Math.max(0, +(this.props.burnCostPerTransfer ?? 6.5));
      const rentCost = Math.max(0, +(this.props.rentPricePerTransfer ?? 3));
      const perDay = +slider.value, m = perDay * 30;
      const burn = m * burnCost, rent = m * rentCost;
      const saved = Math.max(0, burn - rent);
      const ratio = burn > 0 ? Math.min(1, rent / burn) : 1;
      el.v.textContent = perDay;
      el.b.textContent = nf(burn) + ' TRX';
      el.r.textContent = nf(rent) + ' TRX';
      el.p.textContent = saved > 0
        ? Math.round((1 - ratio) * 100) + '% less than burning'
        : 'No saving at these rates';
      el.c.textContent = 'Based on ' + nf(m) + ' transfers per month';
      el.bar.style.width = Math.max(3, ratio * 100) + '%';
      tween(saved);
    };
    this._recalc = update;
    if (slider) { slider.addEventListener('input', update); update(); }

    document.documentElement.classList.add('js');
    const nodes = document.querySelectorAll('.rv');
    const revealAll = () => nodes.forEach(n => n.classList.add('in'));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => {
        es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: .06, rootMargin: '0px 0px -60px 0px' });
      nodes.forEach((n, i) => { n.style.transitionDelay = Math.min(i % 3, 2) * 100 + 'ms'; io.observe(n); });
      setTimeout(revealAll, 4000);
    } else { revealAll(); }

  }
}

document.addEventListener('DOMContentLoaded', () => new App().componentDidMount());
