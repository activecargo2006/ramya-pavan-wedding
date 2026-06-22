/* ============================================================
   Sri Ramya & Vangalapati Pavan Chowdary — vanilla JS
   - Scroll-triggered reveals (per element + section .in-view)
   - Countdown to muhurtham
   - Modern UX: scroll-progress bar, nav-dots active, sticky countdown chip,
                share FAB, calendar .ics export, magnetic map buttons,
                parallax, body tint, global drifting particles
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 720px)').matches;

  // ============================================================
  // 1. Per-element reveal
  // ============================================================
  const revealSelector = [
    '.page-inner',
    '.reveal', '.reveal-left', '.reveal-right',
    '.reveal-scale', '.reveal-stagger',
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
  // 2. Section-level .in-view — drives side-entry decor
  //    Also toggles will-change on/off for perf
  // ============================================================
  const sections = Array.from(document.querySelectorAll('section.page'));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const s = entry.target;
      if (entry.isIntersecting) {
        s.classList.add('in-view');
        // turn on will-change for active section's decor
        s.querySelectorAll('.section-decor img').forEach((img) => {
          img.style.willChange = 'transform, opacity';
        });
        setTimeout(() => {
          s.querySelectorAll('.section-decor img').forEach((img) => {
            img.style.willChange = 'auto';
          });
        }, 2400);
      }
    });
  }, { threshold: [0, 0.12, 0.4] });

  sections.forEach((s) => sectionObserver.observe(s));

  // ============================================================
  // 3. Countdown to 27 August 2026, 11:47 AM IST
  // ============================================================
  const target = new Date('2026-08-27T11:47:00+05:30').getTime();
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
    ccDays:  document.getElementById('cc-days'),
    ccHours: document.getElementById('cc-hours'),
    ccMins:  document.getElementById('cc-mins'),
  };

  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      ['days','hours','mins','secs','ccDays','ccHours','ccMins'].forEach((k) => {
        if (els[k]) els[k].textContent = '00';
      });
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (els.days)  els.days.textContent  = pad(d);
    if (els.hours) els.hours.textContent = pad(h);
    if (els.mins)  els.mins.textContent  = pad(m);
    if (els.secs)  els.secs.textContent  = pad(s);
    if (els.ccDays)  els.ccDays.textContent  = pad(d);
    if (els.ccHours) els.ccHours.textContent = pad(h);
    if (els.ccMins)  els.ccMins.textContent  = pad(m);
  }
  if (els.days) {
    tick();
    setInterval(tick, 1000);
  }

  // ============================================================
  // 4. Scroll parallax — write CSS var --p in range roughly -1..1 per element
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
        const center = rect.top + rect.height / 2;
        const p = (center - vh / 2) / vh;
        el.style.setProperty('--p', (-p).toFixed(3));
      });
      ticking = false;
    }
    function onScrollParallax() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    window.addEventListener('resize', onScrollParallax);
    updateParallax();
  }

  // ============================================================
  // 5. Body background tint per active section
  // ============================================================
  if (!prefersReduced) {
    const tintMap = {
      cover:           '#F4ECDB',
      invitation:      '#DDE7DC',
      muhurtham:       '#0c1a2a',
      events:          '#F8EFD8',
      blessings:       '#FDE8E4',
      'signoff-section': '#E8DCC2',
    };
    function pickActive() {
      const mid = window.innerHeight / 2;
      let active = sections[0];
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { active = s; break; }
      }
      const id = active.id || active.classList[1];
      const tint = tintMap[id] || tintMap[active.classList[1]] || '#F4ECDB';
      document.documentElement.style.setProperty('--page-tint', tint);
      document.body.style.backgroundColor = tint;
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

  // ============================================================
  // 6. Scroll-progress bar + nav-dots active state + sticky countdown chip
  // ============================================================
  const progressBar = document.getElementById('scrollProgress');
  const navDots = Array.from(document.querySelectorAll('.nav-dots a'));
  const chip = document.getElementById('countdownChip');
  const muhurthamEl = document.getElementById('muhurtham');
  const blessingsEl = document.getElementById('blessings');
  let chipDismissed = false;

  function onScrollProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${pct})`;

    // active nav dot
    const mid = window.innerHeight / 2;
    let activeId = null;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) { activeId = s.id; break; }
    }
    navDots.forEach((d) => {
      d.classList.toggle('active', d.dataset.target === activeId);
    });

    // sticky countdown chip: show after muhurtham scrolls past, hide on blessings
    if (chip && !chipDismissed && muhurthamEl && blessingsEl) {
      const muhR = muhurthamEl.getBoundingClientRect();
      const blR  = blessingsEl.getBoundingClientRect();
      const muhPassed = muhR.bottom < window.innerHeight * 0.3;
      const onBlessings = blR.top < window.innerHeight * 0.7;
      chip.classList.toggle('show', muhPassed && !onBlessings);
    }
  }
  window.addEventListener('scroll', onScrollProgress, { passive: true });
  window.addEventListener('resize', onScrollProgress);
  onScrollProgress();

  // nav dot smooth-scroll
  navDots.forEach((d) => {
    d.addEventListener('click', (e) => {
      e.preventDefault();
      const tgt = document.getElementById(d.dataset.target);
      if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // chip close
  const ccClose = document.getElementById('ccClose');
  if (ccClose && chip) {
    ccClose.addEventListener('click', () => {
      chip.classList.remove('show');
      chipDismissed = true;
    });
  }

  // ============================================================
  // 7. Share FAB — navigator.share + clipboard fallback + toast
  // ============================================================
  const fab = document.getElementById('shareFab');
  const toast = document.getElementById('shareToast');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }
  if (fab) {
    fab.addEventListener('click', async () => {
      const data = {
        title: 'Sri Ramya & Pavan Chowdary — Wedding',
        text: 'You are invited — 27 August 2026 · Rajahmundry',
        url: window.location.href,
      };
      try {
        if (navigator.share) {
          await navigator.share(data);
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          showToast('Link copied to clipboard');
        } else {
          showToast(window.location.href);
        }
      } catch (err) {
        if (err && err.name !== 'AbortError') {
          showToast('Could not share — copy the URL');
        }
      }
    });
  }

  // ============================================================
  // 8. Calendar .ics export for each ti-cal button
  // ============================================================
  function icsEscape(s) {
    return String(s).replace(/[\\,;]/g, (m) => '\\' + m).replace(/\n/g, '\\n');
  }
  function buildIcs({ title, date, time, venue, map }) {
    // date "YYYY-MM-DD", time "HH:MM"  (assumed IST)
    const [Y, M, D] = date.split('-');
    const [hh, mm] = time.split(':');
    // 2-hour default duration
    const start = `${Y}${M}${D}T${hh}${mm}00`;
    const endH = String((parseInt(hh, 10) + 2) % 24).padStart(2, '0');
    const end = `${Y}${M}${D}T${endH}${mm}00`;
    const desc = [venue, map].filter(Boolean).join(' — ');
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ramya-Pavan Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${start}-${Math.random().toString(36).slice(2)}@ramya-pavan-wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').slice(0,15)}Z`,
      `DTSTART;TZID=Asia/Kolkata:${start}`,
      `DTEND;TZID=Asia/Kolkata:${end}`,
      `SUMMARY:${icsEscape(title)}`,
      `LOCATION:${icsEscape(venue || '')}`,
      `DESCRIPTION:${icsEscape(desc)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  }
  document.querySelectorAll('[data-cal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ics = buildIcs({
        title: btn.dataset.title,
        date:  btn.dataset.date,
        time:  btn.dataset.time,
        venue: btn.dataset.venue,
        map:   btn.dataset.map,
      });
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (btn.dataset.title || 'event').replace(/\s+/g, '-').toLowerCase() + '.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('Calendar event downloaded');
    });
  });

  // ============================================================
  // 9. Magnetic effect on .ti-map and .ti-cal buttons (desktop only)
  // ============================================================
  if (!isMobile && !prefersReduced) {
    document.querySelectorAll('.ti-map, .ti-cal').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.15;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.15;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================================
  // 10. Global drifting petals — small DOM, animated by CSS
  // ============================================================
  if (!prefersReduced && !isMobile) {
    const field = document.getElementById('globalParticles');
    if (field) {
      const petalSrcs = [
        'assets/images/petal-jasmine-single.png',
        'assets/images/petal-marigold-single.png',
        'assets/images/petal-rose-single.png',
      ];
      const count = 8;
      for (let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.src = petalSrcs[i % petalSrcs.length];
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        const left = Math.round(Math.random() * 100);
        const dur = 14 + Math.random() * 10;
        const delay = -Math.random() * dur;
        const size = 14 + Math.random() * 14;
        img.style.cssText = `left: ${left}%; width: ${size}px;
          animation: drift${i % 2 === 0 ? '1' : '2'} ${dur.toFixed(1)}s linear ${delay.toFixed(1)}s infinite;`;
        field.appendChild(img);
      }
    }
  }

})();
