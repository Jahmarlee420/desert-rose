// v3: a single rose rising from a small sand mound. Petals are notched, cupped and edge-lit for a more natural look.
const ROSE = (() => {
  const LAYERS = [
    { n: 6, r: 62, rot: 4,  d: 0.5 },
    { n: 5, r: 54, rot: 38, d: 0.65 },
    { n: 5, r: 46, rot: 12, d: 0.8 },
    { n: 5, r: 38, rot: 50, d: 0.95 },
    { n: 4, r: 30, rot: 22, d: 1.1 },
    { n: 4, r: 23, rot: 64, d: 1.25 }
  ];
  const jit = (a, b) => { const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453; return x - Math.floor(x); };
  function petal(r) {
    const w = r * 0.7;
    return {
      body: `M0 0 C ${-w * .85} ${-r * .15}, ${-w * 1.05} ${-r * .75}, ${-w * .5} ${-r * .98} Q ${-w * .2} ${-r * 1.08}, 0 ${-r * .96} Q ${w * .2} ${-r * 1.08}, ${w * .5} ${-r * .98} C ${w * 1.05} ${-r * .75}, ${w * .85} ${-r * .15}, 0 0Z`,
      light: `M0 ${-r * .18} C ${-w * .7} ${-r * .3}, ${-w * .82} ${-r * .8}, ${-w * .38} ${-r * .92} C ${-w * .52} ${-r * .62}, ${-w * .3} ${-r * .38}, 0 ${-r * .18}Z`,
      curl: `M${-w * .5} ${-r * .98} Q ${-w * .2} ${-r * 1.08}, 0 ${-r * .96} Q ${w * .2} ${-r * 1.08}, ${w * .5} ${-r * .98}`,
      vein: `M0 ${-r * .1} Q ${w * .08} ${-r * .5}, 0 ${-r * .85}`
    };
  }
  // id keeps gradient ids unique when the rose appears twice on a page.
  function svg(id = "r") {
    const grads = LAYERS.map((L, li) => `
      <radialGradient id="${id}p${li}" cx="0" cy="0" r="${L.r}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#3d0512"/><stop offset=".4" stop-color="#8c0f2a"/>
        <stop offset=".78" stop-color="#d1304f"/><stop offset="1" stop-color="#f26a86"/>
      </radialGradient>`).join("");
    const layers = LAYERS.map((L, li) => `<g class="layer" style="--d:${L.d}s" filter="url(#${id}sh)">${
      Array.from({ length: L.n }, (_, k) => {
        const p = petal(L.r * (.93 + jit(li, k) * .12));
        const rot = L.rot + k * 360 / L.n + (jit(k, li) - .5) * 12;
        return `<g transform="rotate(${rot.toFixed(1)})">
          <path d="${p.body}" fill="url(#${id}p${li})"/>
          <path d="${p.light}" fill="#ffd6df" opacity=".14"/>
          <path d="${p.vein}" stroke="#5a0a1c" stroke-width=".6" fill="none" opacity=".35"/>
          <path d="${p.curl}" stroke="#ffb3c4" stroke-width="1.3" fill="none" opacity=".55" stroke-linecap="round"/>
        </g>`;
      }).join("")
    }</g>`).join("");
    const bud = Array.from({ length: 6 }, (_, k) => {
      const s = 1 + k * .45;
      return `<path d="M${-6 * s} 0 A ${8 * s} ${8 * s} 0 0 1 ${8 * s} ${-2 * s} A ${6 * s} ${6 * s} 0 0 0 ${-6 * s} 0Z" transform="rotate(${k * 67})" fill="${k % 2 ? "#7a0d27" : "#94142f"}" stroke="#c93355" stroke-width=".5" stroke-opacity=".6"/>`;
    }).reverse().join("");
    return `<svg viewBox="-125 -95 250 345" aria-hidden="true">
      <defs>${grads}
        <radialGradient id="${id}glow"><stop offset="0" stop-color="#ff5c86" stop-opacity=".4"/><stop offset=".55" stop-color="#ff5c86" stop-opacity=".08"/><stop offset="1" stop-color="#ff5c86" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fae4c"/><stop offset="1" stop-color="#3d5a24"/></linearGradient>
        <linearGradient id="${id}stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f4419"/><stop offset=".5" stop-color="#55762f"/><stop offset="1" stop-color="#2f4419"/></linearGradient>
        <linearGradient id="${id}sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c08a"/><stop offset="1" stop-color="#a87a4c"/></linearGradient>
        <filter id="${id}sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#1e0009" flood-opacity=".6"/></filter>
      </defs>
      <circle class="glow" cx="0" cy="0" r="110" fill="url(#${id}glow)"/>
      <g class="plant">
        <path class="stem" d="M0 232 C 18 192, -22 142, 6 92 C 18 64, 4 46, 0 32" stroke="url(#${id}stem)" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path class="thorn" d="M5 196 l10 -5 l-8 10z M-11 150 l-10 -3 l8 8z M9 74 l9 -6 l-7 10z" fill="#3a5220"/>
        <g class="leaf r" style="--d:.55s"><path d="M-1 164 C 26 140, 64 138, 88 148 C 62 172, 26 176, -1 164Z" fill="url(#${id}leaf)"/><path d="M-1 164 C 32 156, 62 152, 88 148" stroke="#2f4419" stroke-width="1.3" fill="none"/><path d="M30 158 l8 -10 M50 154 l8 -9 M30 159 l6 9 M50 155 l6 8" stroke="#2f4419" stroke-width=".7" opacity=".7"/></g>
        <g class="leaf l" style="--d:.7s"><path d="M-4 120 C -32 98, -68 98, -90 110 C -64 132, -28 134, -4 120Z" fill="url(#${id}leaf)"/><path d="M-4 120 C -36 114, -64 112, -90 110" stroke="#2f4419" stroke-width="1.3" fill="none"/><path d="M-34 114 l-8 -9 M-54 112 l-8 -8 M-34 115 l-6 9 M-54 113 l-6 8" stroke="#2f4419" stroke-width=".7" opacity=".7"/></g>
        <path d="M-6 40 C -14 30, -16 20, -10 14 M6 40 C 14 30, 16 20, 10 14 M0 42 C 0 30, -2 22, 0 16" stroke="#3f5a2a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g transform="scale(1 .86)"><g class="spin"><g class="head">${layers}
          <g class="layer" style="--d:1.4s">${bud}</g>
        </g></g></g>
      </g>
      <path class="mound" d="M-110 248 C -70 222, -30 214, 0 214 C 32 214, 72 224, 112 248Z" fill="url(#${id}sand)"/>
      <clipPath id="${id}mclip"><path d="M-110 248 C -70 222, -30 214, 0 214 C 32 214, 72 224, 112 248Z"/></clipPath>
      <radialGradient id="${id}wet"><stop offset="0" stop-color="#5e3a1c" stop-opacity=".85"/><stop offset=".55" stop-color="#7a4d27" stop-opacity=".5"/><stop offset="1" stop-color="#7a4d27" stop-opacity="0"/></radialGradient>
      <g clip-path="url(#${id}mclip)">
        <ellipse class="wet" cx="-58" cy="250" rx="78" ry="26" fill="url(#${id}wet)"/>
        <ellipse class="wet wet2" cx="-10" cy="252" rx="54" ry="16" fill="url(#${id}wet)" opacity=".7"/>
        <g class="glisten" fill="#e9fffd"><ellipse cx="-74" cy="241" rx="2.2" ry=".8"/><ellipse cx="-46" cy="236" rx="1.6" ry=".6"/><ellipse cx="-22" cy="244" rx="1.8" ry=".7"/><ellipse cx="-60" cy="246" rx="1.2" ry=".5"/></g>
      </g>
      <path d="M-70 236 C -40 226, -16 222, 4 222 M -20 240 C 10 232, 40 232, 70 240" stroke="#f3d6a6" stroke-width="1.2" fill="none" opacity=".55"/>
    </svg>`;
  }
  return { svg };
})();
