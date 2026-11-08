// A Galaxy-class starship (side view, facing right) for the sky fly-by, and a Starfleet-style delta badge.
const TREK = (() => {
  function ship() {
    const windows = Array.from({ length: 11 }, (_, i) => `<rect x="${20 + i * 3.6}" y="18.6" width="1.4" height=".7" fill="#fff3c4" opacity="${.6 + (i % 3) * .15}"/>`).join("");
    return `<svg viewBox="-30 0 104 44" aria-hidden="true">
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6ebf0"/><stop offset=".55" stop-color="#a9b4bf"/><stop offset="1" stop-color="#6c7784"/></linearGradient>
        <linearGradient id="nac" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7dee5"/><stop offset="1" stop-color="#7d8894"/></linearGradient>
        <radialGradient id="redglow"><stop offset="0" stop-color="#ffb3a0"/><stop offset=".45" stop-color="#ff4a2e"/><stop offset="1" stop-color="#ff4a2e" stop-opacity="0"/></radialGradient>
        <radialGradient id="blueglow"><stop offset="0" stop-color="#e8fbff"/><stop offset=".45" stop-color="#4fc3ff"/><stop offset="1" stop-color="#4fc3ff" stop-opacity="0"/></radialGradient>
      </defs>
      <path d="M-22 22.5 h34 q3 0 3 2 q0 2 -3 2 h-34 q-2 0 -2 -2 q0 -2 2 -2z" fill="url(#nac)"/>
      <rect class="warp" x="-20" y="25.4" width="30" height="1" rx=".5" fill="#7fd8ff"/>
      <circle cx="13.6" cy="24.5" r="3.2" fill="url(#redglow)"/>
      <path d="M6 33 L1 26.5 L4 26.5 L11 32Z" fill="#8f9aa6"/>
      <path d="M2 31.5 C 4 27.5, 30 27, 40 31 C 37 36.5, 8 37, 2 31.5Z" fill="url(#hull)"/>
      <path d="M8 34.3 H34" stroke="#5e6976" stroke-width=".4"/>
      <circle class="deflector" cx="38.5" cy="31.6" r="2.8" fill="url(#blueglow)"/>
      <path d="M26 21.5 L33 21.5 L28 29 L20 29Z" fill="#9aa5b1"/>
      <ellipse cx="42" cy="18.5" rx="27" ry="5.6" fill="url(#hull)"/>
      <path d="M15.4 18.6 Q 42 22.4 68.6 18.6" stroke="#5e6976" stroke-width=".5" fill="none"/>
      ${windows}
      <ellipse cx="42" cy="13.6" rx="7" ry="1.9" fill="#c7d0d9"/>
      <ellipse cx="42" cy="12.5" rx="2.6" ry="1" fill="#e6ebf0"/>
      <circle cx="-23" cy="24.5" r="1" fill="#ff4a2e" opacity=".7"/>
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
