/* ===========================================================
   MAIN — music toggle, ambient drone synth
   =========================================================== */

const musicBtn = document.getElementById('musicBtn');
let audioCtx = null;
let masterGain = null;
let oscList = [];
let musicOn = false;

function startMusic() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioCtx.destination);

  // soft raga-flavoured chord (Sa Ga Pa Ni)
  const freqs = [146.8, 196, 220, 293.6];
  freqs.forEach((f, i) => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = i % 2 ? 'triangle' : 'sine';
    o.frequency.value = f;
    g.gain.value = .07 - i * .012;

    // slow LFO for shimmer
    const lfo = audioCtx.createOscillator();
    const lg = audioCtx.createGain();
    lfo.frequency.value = .08 + i * .06;
    lg.gain.value = 1.5;
    lfo.connect(lg).connect(o.frequency);
    lfo.start();

    o.connect(g).connect(masterGain);
    o.start();
    oscList.push({ o, lfo });
  });

  masterGain.gain.linearRampToValueAtTime(.16, audioCtx.currentTime + 1.4);
}

function stopMusic() {
  if (!audioCtx || !masterGain) return;
  const t = audioCtx.currentTime;
  masterGain.gain.cancelScheduledValues(t);
  masterGain.gain.linearRampToValueAtTime(0, t + .6);
  setTimeout(() => {
    oscList.forEach(({ o, lfo }) => {
      try { o.stop(); lfo.stop(); } catch (e) {}
    });
    oscList = [];
  }, 800);
}

musicBtn.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) {
    startMusic();
    musicBtn.classList.add('playing');
  } else {
    stopMusic();
    musicBtn.classList.remove('playing');
  }
});
