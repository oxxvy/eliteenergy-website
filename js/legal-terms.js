/* EliteEnergy — terms page behaviour */
(function () {
  const init = () => {
const SLUG = 'terms';
    const C = window.ELITE_LEGAL || {};
    const str = k => { const v = C[k]; return (typeof v === 'string' && v.trim()) ? v.trim() : null; };
    const on = k => { const v = C[k]; return typeof v === 'boolean' ? v : !!str(k); };

    document.querySelectorAll('[data-legal-if]').forEach(el => {
      const k = el.getAttribute('data-legal-if');
      const keep = k.charAt(0) === '!' ? !on(k.slice(1)) : on(k);
      if (!keep) el.remove();
    });
    document.querySelectorAll('[data-legal]').forEach(el => {
      const v = str(el.getAttribute('data-legal'));
      if (v) el.textContent = v;
    });
    document.querySelectorAll('[data-legal-href]').forEach(el => {
      const v = str(el.getAttribute('data-legal-href'));
      if (v) { el.href = v; el.target = '_blank'; el.rel = 'noopener'; }
    });
    document.querySelectorAll('[data-legal-link]').forEach(el => {
      const v = str(el.getAttribute('data-legal-link'));
      if (!v) return;
      const a = document.createElement('a');
      a.href = v; a.target = '_blank'; a.rel = 'noopener'; a.textContent = el.textContent;
      el.replaceWith(a);
    });

    const secs = Array.from(document.querySelectorAll('.doc .sec'));
    secs.forEach((s, i) => {
      const n = s.querySelector('.s-n');
      if (n) n.textContent = String(i + 1).padStart(2, '0');
    });
    const count = document.querySelector('[data-sec-count]');
    if (count) count.textContent = secs.length + ' sections';

    const base = (str('siteUrl') || 'https://eliteenergy.example').replace(/\/+$/, '');
    const url = base + '/' + SLUG;
    const can = document.querySelector('link[rel="canonical"]');
    if (can) can.href = url;
    const og = document.querySelector('meta[property="og:url"]');
    if (og) og.content = url;

    const det = document.querySelector('.toc details');
    const mq = matchMedia('(min-width:1000px)');
    const sync = () => { if (det && mq.matches) det.open = true; };
    sync();
    mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);

    const links = Array.from(document.querySelectorAll('.toc a'));
    const map = new Map();
    links.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    if ('IntersectionObserver' in window && map.size) {
      let active = null;
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const a = map.get(e.target);
          if (!a || a === active) return;
          if (active) { active.classList.remove('on'); active.removeAttribute('aria-current'); }
          a.classList.add('on');
          a.setAttribute('aria-current', 'true');
          active = a;
          const ol = a.closest('ol');
          if (ol && ol.scrollHeight > ol.clientHeight) {
            const t = a.offsetTop - ol.clientHeight / 2;
            ol.scrollTo({ top: Math.max(0, t), behavior: 'smooth' });
          }
        });
      }, { rootMargin: '-96px 0px -68% 0px', threshold: 0 });
      map.forEach((a, sec) => io.observe(sec));
    }
  
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
