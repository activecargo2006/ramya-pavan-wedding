/* ============================================================
   Sri Ramya & Pavan Chowdary — vanilla JS
   - Scroll-triggered section/element reveals (directional)
   - Live countdown to muhurtham (IST)
   - Subtle scroll parallax for decor + background
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // 1. Reveal-on-scroll (page-inner + .reveal* utilities)
  // ============================================================
  const revealSelector = [
    '.page-inner',
    '.reveal',
    '.reveal-left',
    '.reveal-right',
    '.reveal-scale',
    '.reveal-stagger',
  ].join(',');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible', 'is-in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll(revealSelector).forEach((el) => revealObserver.observe(el));

  // ============================================================
  // 2. Countdown to 27 August 2026, 11:47 AM IST
  // ============================================================
  const target = new Date('2026-08-27T11:47:00+05:30').getTime();
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
  };

  if (els.days) {
    const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        els.days.textContent = els.hours.textContent =
        els.mins.textContent = els.secs.textContent = '00';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      els.days.textContent  = pad(d);
      els.hours.textContent = pad(h);
      els.mins.textContent  = pad(m);
      els.secs.textContent  = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  // ============================================================
  // 3. Scroll parallax — translate .parallax* elements smoothly
  //    by writing CSS var --p in range roughly -1..1 per section.
  // ============================================================
  if (!prefersReduced) {
    const parallaxItems = Array.from(document.querySelectorAll(
      '.parallax, .parallax-sm, .parallax-lg'
    ));

    let ticking = false;
    function updateParallax() {
      const vh = window.innerHeight;
      parallaxItems.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Center-of-element distance from viewport center, normalized
        const center = rect.top + rect.height / 2;
        const p = (center - vh / 2) / vh; // ~ -1 (above) to +1 (below)
        // Inverted so element drifts UPWARD as it scrolls into view
        el.style.setProperty('--p', (-p).toFixed(3));
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateParallax();
  }

  // ============================================================
  // 4. Body background tint follows the active section
  //    (slow fade between palette stops as user scrolls)
  // ============================================================
  if (!prefersReduced) {
    const sections = Array.from(document.querySelectorAll('section.page'));
    // Tint per section id (subtle wash behind the page bgs)
    const tintMap = {
      cover:      '#fbf3df',
      invitation: '#eef4ec',
      muhurtham:  '#0f1d2c',
      venue:      '#fdebd9',
      blessings:  '#fde7e3',
    };
    function pickActive() {
      const mid = window.innerHeight / 2;
      let active = sections[0];
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { active = s; break; }
      }
      const tint = tintMap[active.id] || '#fbf3df';
      document.documentElement.style.setProperty('--page-tint', tint);
    }
    let tinting = false;
    function onTintScroll() {
      if (!tinting) {
        window.requestAnimationFrame(() => { pickActive(); tinting = false; });
        tinting = true;
      }
    }
    window.addEventListener('scroll', onTintScroll, { passive: true });
    pickActive();
  }
})();
