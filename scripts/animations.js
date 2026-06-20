/* ============================================================
   Sri Ramya & Pavan Chowdary — vanilla JS
   Section fade-in on scroll + live countdown
   ============================================================ */
(function () {
  'use strict';

  // ---------- Section fade-in ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.page-inner').forEach((el) => observer.observe(el));

  // ---------- Countdown to 27 August 2026, 11:47 AM IST ----------
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
})();
