// A Galaxy-class starship (side view, facing right) for the sky fly-by, and a Starfleet-style delta badge.
const TREK = (() => {
  // Galaxy-class profile: wide elliptical saucer, short neck, engineering hull with deflector, long nacelles on swept pylons.
  function ship() {
    const row = (x0, x1, y, n, h = .7) => Array.from({ length: n }, (_, i) => `<rect x="${(x0 + (x1 - x0) * i / (n - 1)).toFixed(2)}" y="${y}" width="1.1" height="${h}" fill="#fff1c2" opacity="${(.55 + ((i * 7) % 5) * .1).toFixed(2)}"/>`).join("");
    const grille = Array.from({ length: 14 }, (_, i) => `<path d="M${-23 + i * 2.4} 25.2 v1.5" stroke="#1f6f9a" stroke-width=".35"/>`).join("");
    const nacelle = (dy, shade) => `
      <g transform="translate(0 ${dy})" opacity="${shade}">
        <path d="M-27 23.4 C -26 22, -20 21.6, -10 21.6 L 13 21.6 C 16 21.6, 17.4 22.6, 17.4 24.2 C 17.4 25.8, 16 26.8, 13 26.8 L -10 26.8 C -20 26.8, -26 26.2, -27 25Z" fill="url(#nac)"/>
        <path d="M-25 22.6 H 13" stroke="#f3f6f9" stroke-width=".4" opacity=".8"/>
        <rect class="warp" x="-24" y="25" width="34" height="1.9" rx=".9" fill="url(#coil)"/>
        ${grille}
        <ellipse cx="14.8" cy="24.2" rx="2.6" ry="2.3" fill="url(#bussard)"/>
        <ellipse cx="15.4" cy="23.5" rx=".8" ry=".6" fill="#ffd9cf" opacity=".9"/>
      </g>`;
    return `<svg viewBox="-34 4 120 40" aria-hidden="true">
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset=".5" stop-color="#b3bdc8"/><stop offset="1" stop-color="#6a7582"/></linearGradient>
        <linearGradient id="nac" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e9ef"/><stop offset=".6" stop-color="#a2adb9"/><stop offset="1" stop-color="#66717e"/></linearGradient>
        <linearGradient id="coil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2b8fd0"/><stop offset=".5" stop-color="#9fe6ff"/><stop offset="1" stop-color="#3aa7e6"/></linearGradient>
        <radialGradient id="bussard" cx=".4" cy=".4"><stop offset="0" stop-color="#ffd0c2"/><stop offset=".45" stop-color="#ff3d22"/><stop offset="1" stop-color="#8f160a"/></radialGradient>
        <radialGradient id="dish"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#8fe0ff"/><stop offset=".7" stop-color="#2f9be0"/><stop offset="1" stop-color="#d98a3a"/></radialGradient>
        <radialGradient id="impulse"><stop offset="0" stop-color="#ffd2c4"/><stop offset="1" stop-color="#ff3d22" stop-opacity="0"/></radialGradient>
      </defs>
      ${nacelle(-1.4, .55)}
      <path d="M4 32.6 L -2 25.6 L 1.6 25.6 L 9.6 31.4Z" fill="#8c97a3"/>
      <path d="M2.6 32 L -1.8 26.4" stroke="#d9e0e6" stroke-width=".35"/>
      ${nacelle(0, 1)}
      <path d="M0 31.6 C 2 27.6, 28 26.6, 40 30.4 C 41.6 31.2, 41.6 33, 40 33.8 C 30 37.6, 6 37.6, 0 32.8Z" fill="url(#hull)"/>
      <path d="M4 33.6 C 14 35.6, 30 35.6, 39 33.2" stroke="#5c6774" stroke-width=".35" fill="none"/>
      <path d="M10 29.6 v5.4 M18 29 v6.2 M26 29 v6.2" stroke="#8c97a3" stroke-width=".25"/>
      <rect x="1" y="31" width="3.2" height="1.8" rx=".3" fill="#2b323a"/>
      ${row(8, 34, 31.4, 9, .55)}
      <circle cx="39.4" cy="32.1" r="3.3" fill="#c98b4a"/>
      <circle class="deflector" cx="39.6" cy="32.1" r="2.6" fill="url(#dish)"/>
      <path d="M24 21 L 33.6 21 L 30 29.4 L 21 29.4Z" fill="#a0abb7"/>
      <path d="M25 23.4 h6.6 M24.2 25.8 h6.2" stroke="#fff1c2" stroke-width=".4" opacity=".7" stroke-dasharray=".8 .9"/>
      <ellipse cx="44" cy="18" rx="30" ry="5.4" fill="url(#hull)"/>
      <path d="M14.2 18.2 Q 44 22.6 73.8 18.2" stroke="#56616e" stroke-width=".5" fill="none"/>
      <path d="M15.4 17.4 Q 44 21 72.6 17.4" stroke="#d6a24a" stroke-width=".35" fill="none" opacity=".8"/>
      <path d="M20 15.8 Q 44 13.6 68 15.8" stroke="#8c97a3" stroke-width=".3" fill="none"/>
      ${row(18, 70, 18.9, 17)}
      ${row(23, 65, 16.6, 12, .55)}
      <ellipse cx="44" cy="13.4" rx="9" ry="1.9" fill="#c9d2db"/>
      <path d="M36 13.6 Q 44 11.6 52 13.6" stroke="#eef2f6" stroke-width=".4" fill="none"/>
      <ellipse cx="44" cy="12.2" rx="3.2" ry="1.1" fill="#e9eef3"/>
      <ellipse cx="44" cy="11.4" rx="1.3" ry=".5" fill="#ffffff"/>
      <rect x="14.6" y="16.6" width="2.4" height="1.1" rx=".4" fill="url(#impulse)"/>
      <circle cx="13.6" cy="17.2" r="1.4" fill="url(#impulse)" opacity=".8"/>
      <circle class="navlight" cx="74" cy="18.2" r=".75" fill="#ffffff"/>
      <circle class="navlight red" cx="-27.2" cy="24.2" r=".7" fill="#ff4a2e"/>
    </svg>`;
  }
  function delta(id = "dl") {
    return `<svg viewBox="0 0 40 46" aria-hidden="true">
      <defs>
        <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe7a6"/><stop offset=".5" stop-color="#d9b26a"/><stop offset="1" stop-color="#8a6a2e"/></linearGradient>
        <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef2f5"/><stop offset="1" stop-color="#8d98a3"/></linearGradient>
      </defs>
      <ellipse cx="20" cy="27" rx="17" ry="11" fill="url(#${id}s)" opacity=".9"/>
      <path d="M20 2 C 23.5 14, 28 30, 33 42 C 27 37, 23.5 35.5, 20 35.5 C 16.5 35.5, 13 37, 7 42 C 12 30, 16.5 14, 20 2Z" fill="url(#${id}g)" stroke="#6b5022" stroke-width=".6"/>
      <path d="M20 6 C 22 16, 25 27, 28.5 36" stroke="#fff4cf" stroke-width=".8" fill="none" opacity=".6"/>
    </svg>`;
  }
  return { ship, delta };
})();
