// v5: a garden rose seen from the side, rising from a small sand mound.
// A tight spiral bud, cupped petals wrapping it, and outer petals that flare with rolled, lit edges.
// Each petal records its hinge (bx, by) and how far it folds in when closed (a degrees, s scale),
// so the page can bloom it open from a bud; drawn open by default (print, reduced motion).
const ROSE = (() => {
  const mirror = d => d.replace(/(-?\d+(\.\d+)?) (-?\d+(\.\d+)?)/g, (m, x, _a, y) => `${-parseFloat(x)} ${y}`);
  const L1 = "M-4 26 C -34 22, -62 4, -60 -22 C -52 -31, -38 -31, -27 -37 C -19 -41, -10 -39, -6 -31 C -8 -6, -6 12, -4 26Z";
  const L1lip = "M-60 -22 C -52 -31, -38 -31, -27 -37 C -19 -41, -10 -39, -6 -31";
  const M1 = "M-2 28 C -30 24, -45 0, -41 -26 C -31 -19, -18 -17, -8 -23 C -4 0, -2 14, -2 28Z";
  const M1lip = "M-41 -26 C -31 -19, -18 -17, -8 -23";
  const F1 = "M-26 18 C -48 16, -64 0, -62 -16 C -52 -8, -40 -3, -30 5Z";
  const F1lip = "M-62 -16 C -52 -8, -40 -3, -30 5";
  // [path, lip, hinge x, hinge y, closed angle, closed scale, bloom order 0..1, gradient, ruffles in wind]
  const PETALS = [
    ["M-16 12 C -27 -16, -22 -48, 0 -52 C 22 -48, 27 -16, 16 12Z", "M-21 -36 C -15 -50, 15 -50, 21 -36", 0, 12, 0, .55, .3, "p", 0],
    [L1, L1lip, -4, 26, 38, .8, .55, "p", 1],
    [mirror(L1), mirror(L1lip), 4, 26, -38, .8, .55, "p", 1],
    [M1, M1lip, -2, 28, 24, .85, .35, "p", 0],
    [mirror(M1), mirror(M1lip), 2, 28, -24, .85, .35, "p", 0],
    ["M-17 0 C -21 -28, -8 -48, 3 -48 C 15 -46, 21 -30, 17 -2 C 9 2, -9 2, -17 0Z", "", 0, 0, 0, .8, 0, "b", 0],
    ["M-21 0 C -23 -22, -15 -35, -2 -37 C -10 -25, -8 -11, 3 1 C -6 3, -14 3, -21 0Z", "M-23 -22 C -19 -31, -11 -36, -2 -37", -6, 2, 12, .9, .12, "b", 0],
    ["M21 0 C 23 -20, 16 -30, 8 -32 C 12 -20, 10 -8, 2 2 C 8 3, 15 3, 21 0Z", "M23 -20 C 20 -27, 14 -31, 8 -32", 6, 2, -12, .9, .15, "b", 0],
    [F1, F1lip, -26, 18, 50, .7, .7, "f", 1],
    [mirror(F1), mirror(F1lip), 26, 18, -50, .7, .7, "f", 1],
    ["M-28 18 C -31 2, -20 -8, 0 -5 C 20 -8, 31 2, 28 18 C 17 31, -17 31, -28 18Z", "M-28 18 C -31 2, -20 -8, 0 -5 C 20 -8, 31 2, 28 18", 0, 28, 0, .35, .6, "f", 0]
  ];
  // id keeps gradient ids unique when the rose appears twice on a page.
  function svg(id = "r") {
    const head = `<ellipse cx="0" cy="33" rx="8" ry="6" fill="#4f6a2c"/>` + PETALS.map(([d, lip, bx, by, a, s, o, g, ruffle], i) => `
      <g class="pt${ruffle ? " ruffle" : ""}" data-bx="${bx}" data-by="${by}" data-a="${a}" data-s="${s}" data-o="${o}" filter="url(#${id}sh)">
        <path d="${d}" fill="url(#${id}${g})"/>
        <path d="${d}" fill="url(#${id}sheen)" opacity=".5"/>
        ${lip ? `<path d="${lip}" stroke="#ffa9bd" stroke-width="${g === "f" ? 1.8 : 1.3}" fill="none" stroke-linecap="round" opacity=".75"/>` : ""}
        ${i === 5 ? `<path d="M-10 -34 C -3 -45, 11 -41, 9 -30 C 7 -20, -7 -23, -5 -32 M-13 -14 C -9 -28, 7 -30, 11 -16 M-14 -4 C -10 -10, 8 -12, 13 -4" stroke="#3e0510" stroke-width="1.3" fill="none" opacity=".75"/><path d="M-6 -44 C 0 -47, 8 -45, 11 -38" stroke="#e2405f" stroke-width="1" fill="none" opacity=".8"/>` : ""}
      </g>`).join("");
    return `<svg viewBox="-125 -95 250 345" aria-hidden="true">
      <defs>
        <linearGradient id="${id}p" x1="0" y1="30" x2="0" y2="-60" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5a0718"/><stop offset=".45" stop-color="#a3132f"/><stop offset=".85" stop-color="#e2405f"/><stop offset="1" stop-color="#ff7f99"/></linearGradient>
        <linearGradient id="${id}b" x1="0" y1="2" x2="0" y2="-42" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4d0717"/><stop offset=".6" stop-color="#8e1230"/><stop offset="1" stop-color="#c22a4c"/></linearGradient>
        <linearGradient id="${id}f" x1="0" y1="30" x2="0" y2="-20" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a0b24"/><stop offset=".5" stop-color="#c62845"/><stop offset="1" stop-color="#f4637f"/></linearGradient>
        <radialGradient id="${id}sheen" cx=".35" cy=".3" r=".6"><stop offset="0" stop-color="#ffd6df" stop-opacity=".35"/><stop offset="1" stop-color="#ffd6df" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}glow"><stop offset="0" stop-color="#ff5c86" stop-opacity=".4"/><stop offset=".55" stop-color="#ff5c86" stop-opacity=".08"/><stop offset="1" stop-color="#ff5c86" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fae4c"/><stop offset="1" stop-color="#3d5a24"/></linearGradient>
        <linearGradient id="${id}stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f4419"/><stop offset=".5" stop-color="#55762f"/><stop offset="1" stop-color="#2f4419"/></linearGradient>
        <linearGradient id="${id}sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c08a"/><stop offset="1" stop-color="#a87a4c"/></linearGradient>
        <filter id="${id}sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#1e0009" flood-opacity=".6"/></filter>
      </defs>
      <circle class="glow" cx="0" cy="-14" r="110" fill="url(#${id}glow)"/>
      <g class="plant">
        <path class="stem" d="M0 232 C 18 192, -22 142, 6 92 C 18 64, 4 46, 0 32" stroke="url(#${id}stem)" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path class="thorn" d="M5 196 l10 -5 l-8 10z M-11 150 l-10 -3 l8 8z M9 74 l9 -6 l-7 10z" fill="#3a5220"/>
        <g class="leaf r" style="--d:.55s"><path d="M-1 164 C 26 140, 64 138, 88 148 C 62 172, 26 176, -1 164Z" fill="url(#${id}leaf)"/><path d="M-1 164 C 32 156, 62 152, 88 148" stroke="#2f4419" stroke-width="1.3" fill="none"/><path d="M30 158 l8 -10 M50 154 l8 -9 M30 159 l6 9 M50 155 l6 8" stroke="#2f4419" stroke-width=".7" opacity=".7"/></g>
        <g class="leaf l" style="--d:.7s"><path d="M-4 120 C -32 98, -68 98, -90 110 C -64 132, -28 134, -4 120Z" fill="url(#${id}leaf)"/><path d="M-4 120 C -36 114, -64 112, -90 110" stroke="#2f4419" stroke-width="1.3" fill="none"/><path d="M-34 114 l-8 -9 M-54 112 l-8 -8 M-34 115 l-6 9 M-54 113 l-6 8" stroke="#2f4419" stroke-width=".7" opacity=".7"/></g>
        <path class="sepals" d="M-4 30 C -14 33, -24 38, -32 46 M4 30 C 14 33, 24 38, 32 46 M0 33 C -2 39, -4 45, -7 51" stroke="#3f5a2a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g><g class="spin"><g class="head">${head}</g></g></g>
      </g>
      <path class="mound" d="M-110 248 C -70 222, -30 214, 0 214 C 32 214, 72 224, 112 248Z" fill="url(#${id}sand)"/>
      <clipPath id="${id}mclip"><path d="M-110 248 C -70 222, -30 214, 0 214 C 32 214, 72 224, 112 248Z"/></clipPath>
      <radialGradient id="${id}wet"><stop offset="0" stop-color="#4a2c14" stop-opacity=".9"/><stop offset=".55" stop-color="#6e4422" stop-opacity=".55"/><stop offset="1" stop-color="#7a4d27" stop-opacity="0"/></radialGradient>
      <g clip-path="url(#${id}mclip)">
        <ellipse class="wet" cx="-72" cy="240" rx="62" ry="20" fill="url(#${id}wet)"/>
        <ellipse class="wet wet2" cx="-22" cy="236" rx="58" ry="16" fill="url(#${id}wet)" opacity=".8"/>
        <path d="M-110 248 C -96 238, -82 236, -66 238" stroke="#3f2a16" stroke-width="2" fill="none" opacity=".5"/>
        <g class="glisten" fill="#e9fffd"><ellipse cx="-74" cy="241" rx="2.2" ry=".8"/><ellipse cx="-46" cy="236" rx="1.6" ry=".6"/><ellipse cx="-22" cy="244" rx="1.8" ry=".7"/><ellipse cx="-60" cy="246" rx="1.2" ry=".5"/></g>
      </g>
      <path d="M-70 236 C -40 226, -16 222, 4 222 M -20 240 C 10 232, 40 232, 70 240" stroke="#f3d6a6" stroke-width="1.2" fill="none" opacity=".55"/>
    </svg>`;
  }
  return { svg };
})();
