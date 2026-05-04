/* ===========================================================
   GARLAND — programmatic marigold + jasmine garland generator
   Creates a hanging garland strand using SVG marigolds
   =========================================================== */

function buildGarland(container, options = {}) {
  if (!container) return;
  const {
    bloomCount = 26,
    minWidth = 700,
    bloomSize = 30,
    arc = 70  // how much the garland droops (px)
  } = options;

  const w = Math.max(minWidth, container.offsetWidth);
  const startX = (container.offsetWidth - Math.min(w, container.offsetWidth + 100)) / 2;
  const totalW = container.offsetWidth + 80;

  // Create an SVG that acts as the strand path
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', totalW);
  svg.setAttribute('height', arc + bloomSize + 20);
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '-40px';
  svg.style.overflow = 'visible';

  // Place blooms along a curve y = arc * sin((x/totalW) * π)
  for (let i = 0; i < bloomCount; i++) {
    const t = i / (bloomCount - 1);
    const x = t * totalW;
    const y = arc * Math.sin(t * Math.PI);

    const g = document.createElementNS(ns, 'g');
    g.setAttribute('transform', `translate(${x - bloomSize/2}, ${y})`);

    const use = document.createElementNS(ns, 'use');
    // alternate marigold and jasmine
    const isJasmine = (i % 5 === 0);
    use.setAttribute('href', isJasmine ? '#jasmine' : '#marigold');
    use.setAttribute('width', isJasmine ? bloomSize * .85 : bloomSize);
    use.setAttribute('height', isJasmine ? bloomSize * .85 : bloomSize);
    if (isJasmine) {
      use.setAttribute('x', bloomSize * .075);
      use.setAttribute('y', bloomSize * .075);
    }

    // gentle bob animation per bloom
    g.style.transformOrigin = `${bloomSize/2}px 0`;
    g.style.animation = `bloom-bob 3s ease-in-out infinite`;
    g.style.animationDelay = `${(i % 4) * -.6}s`;

    svg.appendChild(g);
  }

  // also add a subtle string line behind the blooms
  const str = document.createElementNS(ns, 'path');
  let pathD = `M 0 0 `;
  for (let i = 1; i <= 30; i++) {
    const t = i / 30;
    const x = t * totalW;
    const y = arc * Math.sin(t * Math.PI);
    pathD += `L ${x} ${y} `;
  }
  str.setAttribute('d', pathD);
  str.setAttribute('stroke', '#7a5618');
  str.setAttribute('stroke-width', '1');
  str.setAttribute('fill', 'none');
  str.setAttribute('opacity', '.4');

  // insert string first so blooms render over it
  svg.insertBefore(str, svg.firstChild);

  // rope tassels at each end
  const tasselL = document.createElementNS(ns, 'g');
  tasselL.innerHTML = `
    <line x1="0" y1="0" x2="0" y2="50" stroke="#7a5618" stroke-width="2"/>
    <circle cx="0" cy="55" r="6" fill="#d4a445" stroke="#7a5618" stroke-width="1"/>
    <line x1="-4" y1="58" x2="-6" y2="75" stroke="#d4a445" stroke-width="1.5"/>
    <line x1="0" y1="60" x2="0" y2="80" stroke="#d4a445" stroke-width="1.5"/>
    <line x1="4" y1="58" x2="6" y2="75" stroke="#d4a445" stroke-width="1.5"/>
  `;
  svg.appendChild(tasselL);

  const tasselR = document.createElementNS(ns, 'g');
  tasselR.setAttribute('transform', `translate(${totalW}, 0)`);
  tasselR.innerHTML = `
    <line x1="0" y1="0" x2="0" y2="50" stroke="#7a5618" stroke-width="2"/>
    <circle cx="0" cy="55" r="6" fill="#d4a445" stroke="#7a5618" stroke-width="1"/>
    <line x1="-4" y1="58" x2="-6" y2="75" stroke="#d4a445" stroke-width="1.5"/>
    <line x1="0" y1="60" x2="0" y2="80" stroke="#d4a445" stroke-width="1.5"/>
    <line x1="4" y1="58" x2="6" y2="75" stroke="#d4a445" stroke-width="1.5"/>
  `;
  svg.appendChild(tasselR);

  container.innerHTML = '';
  container.appendChild(svg);
}

window.__buildGarlands = function () {
  const heroGarland = document.getElementById('garland');
  if (heroGarland) buildGarland(heroGarland, { bloomCount: 28, arc: 80 });

  const ftrGarland = document.querySelector('.ftr-garland');
  if (ftrGarland) buildGarland(ftrGarland, { bloomCount: 22, arc: 30, bloomSize: 24 });
};

// build on load and resize
window.addEventListener('load', () => {
  window.__buildGarlands();
});
window.addEventListener('resize', () => {
  clearTimeout(window.__garlandResize);
  window.__garlandResize = setTimeout(() => window.__buildGarlands(), 200);
});
