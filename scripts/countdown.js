/* ===========================================================
   COUNTDOWN — to 27 August 2026, 11:00 AM IST
   =========================================================== */

const target = new Date('2026-08-27T11:00:00+05:30').getTime();
const dEl = document.getElementById('cdD');
const hEl = document.getElementById('cdH');
const mEl = document.getElementById('cdM');
const sEl = document.getElementById('cdS');
const pad = (n, w = 2) => String(n).padStart(w, '0');

function tick() {
  let diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hrs  = Math.floor(diff / 3600000);  diff -= hrs * 3600000;
  const mins = Math.floor(diff / 60000);    diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);
  dEl.textContent = pad(days, 3);
  hEl.textContent = pad(hrs);
  mEl.textContent = pad(mins);
  sEl.textContent = pad(secs);
}
tick();
setInterval(tick, 1000);
