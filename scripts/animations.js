/* ============================================================
   SRI RAMYA & PAVAN CHOWDARY — Hero Scene Animations
   Stage 2 · Act 2 · GSAP + Lenis choreography
   ============================================================ */

(function() {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // LENIS SMOOTH SCROLL
  // ============================================================
  let lenis;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    lenis = new Lenis({
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
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ============================================================
  // GRAND ENTRY ANIMATION
  // ============================================================
  function playEntryAnimation() {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: startPerpetualAnimations
    });

    // Phase 1: Sky atmosphere (0.0 – 1.5s)
    tl.from('.css-cloud', { opacity: 0, duration: 1.5, stagger: 0.2 }, 0);
    tl.from('.css-moon', { opacity: 0, scale: 0.7, duration: 1.2 }, 0.3);
    tl.from('.css-light-rays', { opacity: 0, duration: 1.5 }, 0.4);

    // Phase 2: Distant horizon (0.5 – 1.8s)
    tl.fromTo('.gopuram-distant',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 0.85, duration: 1.3, ease: 'power2.out' }, 0.5);
    tl.to('.small-temple', { opacity: 0.75, duration: 1, stagger: 0.15 }, 0.7);
    tl.to('.river-godavari', { opacity: 0.55, duration: 1.5 }, 0.6);

    // Phase 3: Trees grow from below (1.0 – 2.5s)
    tl.fromTo('.tree',
      { scaleY: 0.3, opacity: 0 },
      { scaleY: 1, opacity: 0.85, duration: 1.4, ease: 'back.out(1.2)',
        stagger: 0.08, transformOrigin: 'bottom center' }, 1.0);

    // Phase 4: Mid-ground bushes & vines (1.5 – 2.8s)
    tl.fromTo('.bush',
      { scaleY: 0.2, opacity: 0, y: 20 },
      { scaleY: 1, opacity: 1, y: 0, duration: 1.1, ease: 'back.out(1.4)',
        stagger: 0.05, transformOrigin: 'bottom center' }, 1.5);

    tl.fromTo(['.bougainvillea-1', '.bougainvillea-2'],
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1.3, ease: 'power3.out',
        stagger: 0.2, transformOrigin: 'top center' }, 1.7);

    tl.fromTo(['.jasmine-vine-left', '.jasmine-vine-right'],
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1, stagger: 0.15,
        transformOrigin: 'bottom center' }, 1.9);

    tl.fromTo(['.lotus-bloom', '.lily-pad'],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.95, duration: 0.8, ease: 'back.out(1.5)',
        stagger: 0.08, transformOrigin: 'center center' }, 2.0);

    // Phase 5: Mandap architecture (2.2 – 3.5s)
    tl.fromTo(['.mandap-pillar-left', '.mandap-pillar-right'],
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1, ease: 'power2.out',
        stagger: 0.1, transformOrigin: 'bottom center' }, 2.2);

    tl.fromTo(['.mango-toranam-left', '.mango-toranam-right'],
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.1 }, 2.4);

    tl.fromTo('.garland',
      { y: -60, opacity: 0, scaleY: 0.6 },
      { y: 0, opacity: 1, scaleY: 1, duration: 1.2, ease: 'bounce.out',
        stagger: 0.12, transformOrigin: 'top center' }, 2.6);

    tl.fromTo(['.jasmine-garland-1', '.jasmine-garland-2'],
      { y: -40, opacity: 0 },
      { y: 0, opacity: 0.92, duration: 1, ease: 'power2.out',
        stagger: 0.1, transformOrigin: 'top center' }, 2.8);

    tl.fromTo('.puja-bell',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 0.95, duration: 0.8, ease: 'bounce.out',
        stagger: 0.1, transformOrigin: 'top center' }, 3.0);

    tl.fromTo('.elephant-statue',
      { x: (i) => i === 0 ? -100 : 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }, 3.0);

    // Phase 6: Living scene (3.2 – 4.2s)
    tl.fromTo('.kalasham',
      { y: -80, opacity: 0, scale: 0.7 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.5)' }, 3.2);

    tl.fromTo('.ganesha-symbol',
      { opacity: 0, scale: 0.5 },
      { opacity: 0.95, scale: 1, duration: 0.8, ease: 'back.out(1.8)' }, 3.4);

    tl.fromTo('.peacock-left',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 3.3);
    tl.fromTo('.peacock-right',
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 3.3);

    tl.fromTo('.diya',
      { y: 30, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)',
        stagger: 0.07 }, 3.5);

    // Phase 7: Atmospheric foreground (3.8 – 4.5s)
    tl.fromTo('.kolam',
      { opacity: 0, scale: 0.6 },
      { opacity: 0.7, scale: 1, duration: 1, ease: 'power2.out',
        stagger: 0.1, transformOrigin: 'center center' }, 3.8);

    tl.fromTo('.incense-smoke',
      { opacity: 0, y: 20 },
      { opacity: 0.3, y: 0, duration: 1.2, stagger: 0.2 }, 4.0);

    // Phase 8: Invitation card (4.2 – 5.2s)
    tl.to('.invitation-card', {
      opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out'
    }, 4.2);
    tl.to('.invocation', { opacity: 1, duration: 0.6 }, 4.6);
    tl.to('.subhalekha-title', { opacity: 1, duration: 0.6 }, 4.7);
    tl.to('.subhalekha-en', { opacity: 1, duration: 0.5 }, 4.9);
    tl.to('.card-divider', { opacity: 1, duration: 0.5, stagger: 0.1 }, 5.0);
    tl.to('.invitation-intro', { opacity: 1, duration: 0.6 }, 5.2);

    // Phase 9: Names letter-by-letter (5.8 – 7.0s)
    tl.to('.bride-name span', {
      opacity: 1, duration: 0.05, stagger: 0.06, ease: 'none'
    }, 5.8);
    tl.to('.parent-line', { opacity: 1, duration: 0.6, stagger: 0.4 }, 6.3);
    tl.to('.ampersand', {
      opacity: 1, duration: 0.8, scale: 1, ease: 'back.out(2)'
    }, 6.5);
    tl.to('.groom-name span', {
      opacity: 1, duration: 0.05, stagger: 0.06, ease: 'none'
    }, 6.8);

    // Phase 10: Date & venue (7.8 – 8.8s)
    tl.to('.wedding-date', { opacity: 1, duration: 0.6 }, 7.8);
    tl.to('.wedding-time', { opacity: 1, duration: 0.6 }, 8.0);
    tl.to('.wedding-venue', { opacity: 1, duration: 0.6 }, 8.2);

    return tl;
  }

  // ============================================================
  // PERPETUAL ANIMATIONS — wind blowing through the scene
  // ============================================================
  function startPerpetualAnimations() {

    // Trees sway
    gsap.utils.toArray('.tree').forEach((tree, i) => {
      gsap.to(tree, {
        rotation: gsap.utils.random(-2.5, 2.5),
        duration: gsap.utils.random(5, 8),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: 'bottom center', delay: i * 0.3
      });
    });

    // Bushes sway
    gsap.utils.toArray('.bush').forEach((bush, i) => {
      gsap.to(bush, {
        rotation: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(3, 5),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: 'bottom center', delay: i * 0.2
      });
    });

    // Bougainvillea drift
    gsap.utils.toArray(['.bougainvillea-1', '.bougainvillea-2']).forEach((el, i) => {
      gsap.to(el, {
        rotation: i === 0 ? gsap.utils.random(-4, 4) : gsap.utils.random(4, -4),
        duration: gsap.utils.random(4, 6),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: i === 0 ? 'top left' : 'top right'
      });
    });

    // Jasmine vines flutter
    gsap.utils.toArray(['.jasmine-vine-left', '.jasmine-vine-right']).forEach((el, i) => {
      gsap.to(el, {
        rotation: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(3, 4.5),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: 'bottom center', delay: i * 0.4
      });
    });

    // Marigold garlands swing
    gsap.utils.toArray('.garland').forEach((g, i) => {
      gsap.to(g, {
        rotation: gsap.utils.random(-2, 2),
        duration: gsap.utils.random(4, 6),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: 'top center', delay: i * 0.3
      });
    });

    // Jasmine garlands
    gsap.utils.toArray(['.jasmine-garland-1', '.jasmine-garland-2']).forEach((g, i) => {
      gsap.to(g, {
        rotation: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(3.5, 5),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: 'top center', delay: i * 0.4
      });
    });

    // Puja bells swing
    gsap.utils.toArray('.puja-bell').forEach((bell, i) => {
      gsap.to(bell, {
        rotation: gsap.utils.random(-4, 4),
        duration: gsap.utils.random(5, 7),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: 'top center', delay: i * 0.5
      });
    });

    // Peacocks bob
    gsap.utils.toArray('.peacock').forEach((p, i) => {
      gsap.to(p, {
        y: '+=8',
        duration: gsap.utils.random(3, 4),
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4
      });
    });

    // Kalasham breathing
    gsap.to('.kalasham', {
      scale: 1.04, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    // Ganesha pulse
    gsap.to('.ganesha-symbol', {
      opacity: 0.7, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    // Diya flicker
    gsap.utils.toArray('.diya').forEach((diya, i) => {
      gsap.to(diya, {
        scale: gsap.utils.random(0.96, 1.06),
        duration: gsap.utils.random(0.6, 1.2),
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.15
      });
    });

    // Clouds drift
    gsap.to('.css-cloud-1', { x: '+=80', duration: 30, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.css-cloud-2', { x: '-=60', duration: 35, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.css-cloud-3', { x: '+=40', duration: 40, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Light rays pulse
    gsap.to('.css-light-rays', {
      opacity: 0.45, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    // Incense smoke rises
    gsap.utils.toArray('.incense-smoke').forEach((s, i) => {
      gsap.to(s, {
        y: -20, opacity: 0.15, duration: 5,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 1.2
      });
    });

    // Particle systems
    spawnPetals('petal-marigold-single.png', 8);
    spawnPetals('petal-rose-single.png', 6);
    spawnPetals('petal-jasmine-single.png', 6);
    spawnFireflies(isMobile ? 8 : 15);
  }

  // ============================================================
  // FALLING PETALS
  // ============================================================
  function spawnPetals(filename, count) {
    const foreground = document.getElementById('foregroundLayer');
    if (!foreground) return;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('img');
      petal.src = `assets/images/${filename}`;
      petal.className = 'petal';
      petal.style.left = gsap.utils.random(0, 100) + '%';
      petal.style.top = '-5%';
      petal.style.width = gsap.utils.random(0.8, 2.2) + '%';
      petal.style.opacity = gsap.utils.random(0.6, 0.95);
      foreground.appendChild(petal);
      animatePetal(petal);
    }
  }

  function animatePetal(petal) {
    const duration = gsap.utils.random(8, 16);
    const horizontalDrift = gsap.utils.random(-15, 15);
    const rotation = gsap.utils.random(-180, 360);

    gsap.fromTo(petal,
      { y: 0, x: 0, rotation: 0 },
      {
        y: '110vh',
        x: horizontalDrift + 'vw',
        rotation: rotation,
        duration: duration,
        ease: 'none',
        onComplete: () => {
          petal.style.left = gsap.utils.random(0, 100) + '%';
          animatePetal(petal);
        }
      }
    );
  }

  // ============================================================
  // FIREFLIES
  // ============================================================
  function spawnFireflies(count) {
    const foreground = document.getElementById('foregroundLayer');
    if (!foreground) return;

    for (let i = 0; i < count; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      firefly.style.left = gsap.utils.random(5, 95) + '%';
      firefly.style.top = gsap.utils.random(20, 80) + '%';
      foreground.appendChild(firefly);
      animateFirefly(firefly);
    }
  }

  function animateFirefly(firefly) {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(0, 2) });
    tl.to(firefly, {
      opacity: gsap.utils.random(0.4, 0.9),
      duration: gsap.utils.random(1, 2.5),
      ease: 'sine.inOut'
    })
    .to(firefly, {
      x: gsap.utils.random(-100, 100) + 'px',
      y: gsap.utils.random(-80, 80) + 'px',
      duration: gsap.utils.random(4, 8),
      ease: 'sine.inOut'
    }, 0)
    .to(firefly, {
      opacity: 0,
      duration: gsap.utils.random(1, 2.5),
      ease: 'sine.inOut'
    });
  }

  // ============================================================
  // PARALLAX ON SCROLL
  // ============================================================
  function setupParallax() {
    if (prefersReducedMotion || isMobile) return;

    gsap.to('.sky-layer', {
      y: -50, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.horizon-layer', {
      y: -100, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.garden-bg-layer', {
      y: -150, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.midground-layer', {
      y: -200, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.foreground-layer', {
      y: -250, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }

  // ============================================================
  // BOOT
  // ============================================================
  function init() {
    initLenis();
    setupParallax();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        playEntryAnimation();
      });
    } else {
      setTimeout(playEntryAnimation, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
