/* ===========================================================
   ENVELOPE OPENING — wax seal crack & open animation
   =========================================================== */

const envScreen = document.getElementById('envelope-screen');
const wax = document.getElementById('waxSeal');
const main = document.getElementById('main');
let opened = false;

// lock scroll until envelope opens
document.body.style.overflow = 'hidden';

function spawnDust() {
  const stage = wax.getBoundingClientRect();
  const cx = stage.left + stage.width / 2;
  const cy = stage.top + stage.height / 2;
  for (let i = 0; i < 28; i++) {
    const d = document.createElement('div');
    Object.assign(d.style, {
      position: 'fixed',
      left: cx + 'px',
      top: cy + 'px',
      width: (3 + Math.random() * 5) + 'px',
      height: (3 + Math.random() * 5) + 'px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, #b83646, #3a0e16)',
      pointerEvents: 'none',
      zIndex: 9500,
      opacity: '1'
    });
    document.body.appendChild(d);
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 200;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist + 100;
    d.animate(
      [
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0 }
      ],
      { duration: 900 + Math.random() * 600, easing: 'cubic-bezier(.3,.6,.4,1)', fill: 'forwards' }
    );
    setTimeout(() => d.remove(), 1700);
  }
}

function openEnvelope() {
  if (opened) return;
  opened = true;
  envScreen.classList.add('opened');
  spawnDust();

  // After flap opens, reveal main content
  setTimeout(() => {
    main.classList.add('revealed');
    document.body.style.overflow = 'auto';

    // Trigger the rest of the orchestration
    if (window.__initAnimations) window.__initAnimations();
    if (window.__startPetals) window.__startPetals();
  }, 1600);

  // Remove envelope screen entirely after fade
  setTimeout(() => {
    envScreen.style.display = 'none';
  }, 3600);
}

wax.addEventListener('click', openEnvelope);
wax.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openEnvelope();
  }
});
