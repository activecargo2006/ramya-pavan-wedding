/* ============================================================
   SRI RAMYA & PAVAN CHOWDARY — Wedding Invitation
   Rebuild v2 · Section 1: Envelope interaction
   ============================================================ */

(function() {
  'use strict';

  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');

  if (!envelope || !waxSeal) return;

  function openEnvelope() {
    // Crack the seal
    waxSeal.classList.add('cracking');

    // After seal animation, fade out the envelope section
    setTimeout(() => {
      envelope.classList.add('opened');
      // Section 2+ will be revealed here in later blocks
      console.log('Envelope opened — Section 2 will appear here in next build block');
    }, 700);
  }

  // Tap or click to open
  waxSeal.addEventListener('click', openEnvelope);
  waxSeal.addEventListener('touchend', (e) => {
    e.preventDefault();
    openEnvelope();
  });

  // Keyboard accessibility
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

})();
