/* ===========================================================
   ANIMATIONS — GSAP + ScrollTrigger + Lenis smooth scroll
   =========================================================== */

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);

const progressEl = document.getElementById('progress');
lenis.on('scroll', ({ scroll, limit }) => {
  const pct = limit > 0 ? (scroll / limit) * 100 : 0;
  progressEl.style.width = pct + '%';
});

function splitNames() {
  document.querySelectorAll('.name').forEach((el) => {
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

window.__initAnimations = function () {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Kalasham descends from top
  tl.fromTo('.kalasham',
    { opacity: 0, y: -60, scale: .7 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 0
  );

  // Peacocks slide in from sides
  tl.fromTo('.peacock-l',
    { opacity: 0, x: -100, rotation: -20 },
    { opacity: 1, x: 0, rotation: -6, duration: 1.4, ease: 'power2.out' }, 0.3
  );
  tl.fromTo('.peacock-r',
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 1.4, ease: 'power2.out' }, 0.3
  );

  // Diyas
  tl.fromTo('.diya',
    { opacity: 0, y: 30, scale: .6 },
    { opacity: 1, y: 0, scale: 1, duration: .9, stagger: .15, ease: 'back.out(1.4)' }, 0.8
  );

  // Garland drops down
  tl.fromTo('.garland',
    { opacity: 0, y: -40 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'bounce.out' }, 0.4
  );

  // Kolam
  tl.fromTo('.kolam',
    { opacity: 0, scale: .4, rotation: -90 },
    { opacity: 1, scale: 1, rotation: 0, duration: 1 }, 0.6
  );

  tl.fromTo('.bless',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .8 }, 0.9
  );
  tl.fromTo('.together',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .8 }, 1.1
  );

  splitNames();
  tl.to('.name:first-of-type .ltr',
    { opacity: 1, y: 0, duration: .6, stagger: .04 }, 1.3
  );

  tl.fromTo('.amp',
    { opacity: 0, scale: .6, rotation: -10 },
    { opacity: 1, scale: 1, rotation: 0, duration: .8, ease: 'back.out(1.4)' }, 1.7
  );

  tl.to('.name:last-of-type .ltr',
    { opacity: 1, y: 0, duration: .6, stagger: .04 }, 2.0
  );

  tl.fromTo('.invite-text, .date-block, .time-line, .venue-line',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .7, stagger: .1 }, 2.6
  );

  tl.fromTo('.scroll-cue',
    { opacity: 0 },
    { opacity: 1, duration: 1 }, 3.4
  );

  // Scroll-triggered reveals

  gsap.from('.events .section-head > *', {
    opacity: 0, y: 40, duration: 1, stagger: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.events', start: 'top 70%', toggleActions: 'play none none none' }
  });
  gsap.from('.event', {
    opacity: 0, y: 60, duration: 1, stagger: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.events-grid', start: 'top 75%', toggleActions: 'play none none none' }
  });

  gsap.from('.countdown .section-head > *', {
    opacity: 0, y: 40, duration: 1, stagger: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.countdown', start: 'top 70%', toggleActions: 'play none none none' }
  });
  gsap.from('.cd-cell', {
    opacity: 0, y: 40, scale: .92, duration: 1, stagger: .12, ease: 'back.out(1.2)',
    scrollTrigger: { trigger: '.cd-grid', start: 'top 75%', toggleActions: 'play none none none' }
  });

  gsap.from('.msg-wrap > *', {
    opacity: 0, y: 40, duration: 1, stagger: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.message', start: 'top 70%', toggleActions: 'play none none none' }
  });

  gsap.from('.msg-marigold-tl, .msg-marigold-br', {
    opacity: 0, scale: .6, duration: 1.2, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.message', start: 'top 70%', toggleActions: 'play none none none' }
  });

  gsap.from('.footer > *', {
    opacity: 0, y: 30, duration: 1, stagger: .12, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer', start: 'top 85%', toggleActions: 'play none none none' }
  });

  // Subtle parallax
  gsap.to('.palm-back', {
    yPercent: 12, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.leaf-tl, .leaf-tr', {
    yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.peacock', {
    yPercent: -5, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
};

// Floating petals — mix of jasmine and marigold
const field = document.getElementById('petalField');
let petalsStarted = false;

window.__startPetals = function () {
  if (petalsStarted) return;
  petalsStarted = true;
  for (let i = 0; i < 12; i++) setTimeout(spawnPetal, i * 600);
  setInterval(spawnPetal, 1400);
};

function spawnPetal() {
  const isMarigold = Math.random() < 0.45;
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', isMarigold ? '0 0 40 40' : '0 0 24 24');
  s.classList.add(isMarigold ? 'petal-marigold' : 'petal-jasmine');
  const sz = isMarigold ? 16 + Math.random() * 12 : 12 + Math.random() * 10;
  s.style.width = sz + 'px';
  s.style.height = sz + 'px';
  s.style.left = (Math.random() * 100) + 'vw';
  const dur = 11 + Math.random() * 9;
  s.style.animationDuration = dur + 's';
  s.style.animationDelay = (-Math.random() * dur) + 's';
  s.innerHTML = isMarigold ? '<use href="#marigold"/>' : '<use href="#jasmine"/>';
  field.appendChild(s);
  setTimeout(() => s.remove(), (dur + 1) * 1000);
}
