// v3: a single layered rose on its stem, drawn alone (no landscape).
const ROSE = (() => {
  const LAYERS = [
    { n: 5, r: 58, rot: 0,  d: 0.5 },
    { n: 5, r: 48, rot: 36, d: 0.7 },
    { n: 5, r: 38, rot: 14, d: 0.9 },
    { n: 4, r: 28, rot: 52, d: 1.1 },
    { n: 3, r: 19, rot: 20, d: 1.3 }
  ];
  function petal(r) {
    const w = r * 0.62;
    return `M0 0 C ${-w * .9} ${-r * .2}, ${-w} ${-r * .9}, ${-w * .35} ${-r} C ${-w * .1} ${-r * 1.05}, ${w * .1} ${-r * 1.05}, ${w * .35} ${-r} C ${w} ${-r * .9}, ${w * .9} ${-r * .2}, 0 0Z`;
  }
  // id keeps gradient ids unique when the rose appears twice on a page.
  function svg(id = "r") {
    const grads = LAYERS.map((L, li) => `
      <radialGradient id="${id}p${li}" cx="0" cy="0" r="${L.r}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#4d0717"/><stop offset=".45" stop-color="#a3122f"/>
        <stop offset=".85" stop-color="#e2405f"/><stop offset="1" stop-color="#ff7d97"/>
      </radialGradient>`).join("");
    const layers = LAYERS.map((L, li) => `<g class="layer" style="--d:${L.d}s" filter="url(#${id}sh)">${
      Array.from({ length: L.n }, (_, k) => `<path d="${petal(L.r)}" transform="rotate(${L.rot + k * 360 / L.n})" fill="url(#${id}p${li})" stroke="#ff9db4" stroke-width=".7" stroke-opacity=".5"/>`).join("")
    }</g>`).join("");
    return `<svg viewBox="-110 -90 220 300" aria-hidden="true">
      <defs>${grads}
        <radialGradient id="${id}glow"><stop offset="0" stop-color="#ff5c86" stop-opacity=".45"/><stop offset=".55" stop-color="#ff5c86" stop-opacity=".1"/><stop offset="1" stop-color="#ff5c86" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fae4c"/><stop offset="1" stop-color="#3d5a24"/></linearGradient>
        <filter id="${id}sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#2a0010" flood-opacity=".55"/></filter>
      </defs>
      <circle class="glow" cx="0" cy="0" r="105" fill="url(#${id}glow)"/>
      <path class="stem" d="M0 205 C -4 160, 10 110, 0 30" stroke="#3f5a2a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path class="thorn" d="M1 160 l9 -6 l-7 10z M-2 110 l-9 -5 l7 9z" fill="#3f5a2a"/>
      <g class="leaf" style="--d:.5s; transform-origin: 2px 140px"><path d="M2 140 C 30 118, 68 118, 90 130 C 64 152, 28 154, 2 140Z" fill="url(#${id}leaf)"/><path d="M2 140 C 36 134, 64 132, 90 130" stroke="#2f4419" stroke-width="1.4" fill="none"/></g>
      <g class="leaf" style="--d:.65s; transform-origin: -2px 95px"><path d="M-2 95 C -30 72, -66 74, -88 86 C -62 108, -26 110, -2 95Z" fill="url(#${id}leaf)"/><path d="M-2 95 C -34 90, -64 88, -88 86" stroke="#2f4419" stroke-width="1.4" fill="none"/></g>
      <g transform="scale(1 .86)"><g class="head">${layers}
        <g class="layer" style="--d:1.5s"><circle r="10" fill="#7a0d27"/><path d="M0 0 a3 3 0 1 1 4 2 a6 6 0 1 1 -9 -3 a9 9 0 1 1 13 5" stroke="#4d0717" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
      </g></g>
    </svg>`;
  }
  return { svg };
})();
