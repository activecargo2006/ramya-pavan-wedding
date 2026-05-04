/* ===========================================================
   ANIMATIONS — GSAP + ScrollTrigger + Lenis smooth scroll
   =========================================================== */

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);

// Scroll progress bar
const progressEl = document.getElementById('progress');
lenis.on('scroll', ({ scroll, limit }) => {
  const pct = limit > 0 ? (scroll / limit) * 100 : 0;
  progressEl.style.width = pct + '%';
});

// ============== Letter-by-letter name reveal ==============
function splitNames() {
  document.querySelectorAll('.name').forEach((el, idx) => {
    const txt = el.dataset.name;
    el.innerHTML = '';
    [...txt].forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'ltr';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(span);
    });
  });
}

// ============== Initialize all animations after envelope opens ==============
window.__initAnimations = function () {
  // Hero entrance — staggered reveals
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Kolam draws in
  tl.fromTo('.kolam',
    { opacity: 0, scale: .4, rotation: -90 },
    { opacity: 1, scale: 1, rotation: 0, duration: 1.2 }, 0.2
  );

  // Telugu blessing
  tl.fromTo('.bless',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .9 }, 0.5
  );
  tl.fromTo('.together',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .9 }, 0.7
  );

  // Names — letter by letter
  splitNames();
  tl.to('.name:first-of-type .ltr',
    { opacity: 1, y: 0, duration: .7, stagger: .04 }, 0.9
  );

  // Ampersand
  tl.fromTo('.amp',
    { opacity: 0, scale: .6, rotation: -10 },
    { opacity: 1, scale: 1, rotation: 0, duration: .9, ease: 'back.out(1.4)' }, 1.4
  );

  tl.to('.name:last-of-type .ltr',
    { opacity: 1, y: 0, duration: .7, stagger: .04 }, 1.7
  );

  tl.fromTo('.invite-text, .date-block, .time-line, .venue-line',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .8, stagger: .12 }, 2.4
  );

  tl.fromTo('.scroll-cue',
    { opacity: 0 },
    { opacity: 1, duration: 1 }, 3.2
  );

  // ============== Scroll-triggered section reveals ==============

  // EVENTS
  gsap.from('.events .section-head > *', {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: .15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.events',
      start: 'top 70%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.event', {
    opacity: 0,
    y: 60,
    duration: 1,
    stagger: .15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.events-grid',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  // COUNTDOWN
  gsap.from('.countdown .section-head > *', {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: .15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.countdown',
      start: 'top 70%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.cd-cell', {
    opacity: 0,
    y: 40,
    scale: .92,
    duration: 1,
    stagger: .12,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: '.cd-grid',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.cd-msg', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: .5,
    scrollTrigger: {
      trigger: '.cd-msg',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  // MESSAGE
  gsap.from('.msg-wrap > *', {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: .15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.message',
      start: 'top 70%',
      toggleActions: 'play none none none',
    }
  });

  // FOOTER
  gsap.from('.footer > *', {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: .12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  });

  // Parallax on hero leaves (subtle)
  gsap.to('.leaf-tl, .leaf-tr', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
  gsap.to('.leaf-bl, .leaf-br', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
};

// ============== Floating jasmine petals ==============
const field = document.getElementById('petalField');
let petalsStarted = false;

window.__startPetals = function () {
  if (petalsStarted) return;
  petalsStarted = true;
  for (let i = 0; i < 10; i++) setTimeout(spawnPetal, i * 700);
  setInterval(spawnPetal, 1600);
};

function spawnPetal() {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.classList.add('petal-jasmine');
  const sz = 10 + Math.random() * 14;
  s.style.width = sz + 'px';
  s.style.height = sz + 'px';
  s.style.left = (Math.random() * 100) + 'vw';
  const dur = 11 + Math.random() * 9;
  s.style.animationDuration = dur + 's';
  s.style.animationDelay = (-Math.random() * dur) + 's';
  s.innerHTML = '<use href="#jasmine"/>';
  field.appendChild(s);
  setTimeout(() => s.remove(), (dur + 1) * 1000);
}
