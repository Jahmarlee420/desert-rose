// v5: a white dove in flight carrying an olive branch, built from individual feathers.
const DOVE = (() => {
  // One feather pointing "up" (-y) from its base, rotated by a degrees.
  function feather(x, y, a, len, w, fill, edge) {
    const d = `M0 0 C ${w * .62} ${-len * .22}, ${w * .55} ${-len * .82}, ${w * .12} ${-len} C ${-w * .2} ${-len * .98}, ${-w * .6} ${-len * .8}, ${-w * .58} ${-len * .25} Z`;
    return `<g transform="translate(${x} ${y}) rotate(${a})"><path d="${d}" fill="${fill}" stroke="${edge}" stroke-width=".6"/><path d="M0 0 Q ${w * .05} ${-len * .5}, ${w * .08} ${-len * .95}" stroke="${edge}" stroke-width=".5" fill="none" opacity=".8"/></g>`;
  }
  // A wing: primaries fan from the bone tip, secondaries from the bone, coverts as overlapping scallops.
  function wing(root, tip, spread, id, near) {
    const lerp = (t) => [root[0] + (tip[0] - root[0]) * t, root[1] + (tip[1] - root[1]) * t];
    const bone = Math.atan2(tip[1] - root[1], tip[0] - root[0]) * 180 / Math.PI + 90;
    const shade = near ? `url(#${id}wn)` : `url(#${id}wf)`, edge = near ? "#9fb4b9" : "#8ea3a8";
    let out = "";
    for (let i = 0; i < 8; i++) { const t = .2 + i * .085; const [x, y] = lerp(t); out += feather(x, y, bone - 70 + i * 4 - spread, 34 + i * 2, 11, shade, edge); }
    for (let i = 0; i < 8; i++) { const t = .78 + i * .03; const [x, y] = lerp(Math.min(t, 1)); out += feather(x, y, bone - 48 + i * 7 - spread, 62 - i * 2.2, 10, shade, edge); }
    for (let row = 0; row < 3; row++) for (let i = 0; i < 6 - row; i++) {
      const [x, y] = lerp(.12 + i * .13 + row * .04);
      out += `<path d="M${x - 7} ${y + row * 7} q7 ${9 - row} 14 0" fill="${near ? "#f4f8f8" : "#e1eaec"}" stroke="${edge}" stroke-width=".5"/>`;
    }
    return out;
  }
  function svg(id = "d") {
    const tail = [150, 162, 174, 186, 198, 208].map((a, i) => feather(52, 70 + i * .6, a + 90, 40 - Math.abs(i - 2.5) * 2, 11, `url(#${id}t)`, "#a9bcc0")).join("");
    const leaves = [[172, 60, -18], [178, 70, 34], [170, 74, 118], [185, 80, 58], [176, 86, 126], [190, 92, 76], [183, 98, 112], [196, 102, 64]];
    const branch = leaves.map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-11 0 Q 0 -4.2, 11 0 Q 0 4.2, -11 0Z" fill="#617232"/><path d="M-11 0 Q 0 -1.4, 11 0" stroke="#a9b97e" stroke-width=".7" fill="none"/><path d="M-11 0 Q 0 4.2, 11 0" fill="#8d9c5c" opacity=".55"/></g>`).join("");
    return `<svg viewBox="0 -48 215 178" aria-hidden="true">
      <defs>
        <radialGradient id="${id}b" cx="120" cy="52" r="85" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e9f0f1"/><stop offset="1" stop-color="#b9c9cd"/></radialGradient>
        <linearGradient id="${id}wn" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d3dfe2"/></linearGradient>
        <linearGradient id="${id}wf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#dfe8ea"/><stop offset="1" stop-color="#aebfc3"/></linearGradient>
        <linearGradient id="${id}t" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#f3f7f8"/><stop offset="1" stop-color="#c3d2d5"/></linearGradient>
        <filter id="${id}sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity=".35"/></filter>
      </defs>
      <g filter="url(#${id}sh)">
        <g class="wing far">${wing([98, 58], [74, 14], 8, id, false)}</g>
        ${tail}
        <path d="M44 68 C 62 54, 96 52, 124 56 C 136 49, 148 46, 156 51 C 163 55, 163 62, 157 65 L 149 67 C 143 78, 122 88, 98 88 C 74 88, 54 80, 44 68Z" fill="url(#${id}b)"/>
        <path d="M70 74 q6 5 12 0 M86 78 q6 5 12 0 M102 79 q6 5 12 0 M78 66 q6 5 12 0 M94 69 q6 5 12 0 M118 71 q6 5 12 0" stroke="#c4d3d6" stroke-width=".7" fill="none"/>
        <path d="M140 52 C 146 58, 146 66, 141 72" stroke="#d6e1e3" stroke-width="1.2" fill="none"/>
        <circle cx="152" cy="54.5" r="3" fill="#eef3f4"/><circle cx="152" cy="54.5" r="2" fill="#1c1410"/><circle cx="152.7" cy="53.8" r=".6" fill="#ffffff"/>
        <ellipse cx="159" cy="55.5" rx="2.4" ry="1.4" fill="#f5f2ee"/>
        <path d="M160 55 L171 57.5 L160 60.5 Z" fill="#c9895a"/><path d="M160 57.8 L170 57.8" stroke="#8f5a36" stroke-width=".5"/>
        <path d="M168 58 C 176 64, 184 80, 194 104" stroke="#4f5f24" stroke-width="2" fill="none" stroke-linecap="round"/>
        ${branch}
        <circle cx="181" cy="76" r="3.4" fill="#2f3a18"/><circle cx="180" cy="75" r="1" fill="#8a9a5e"/>
        <circle cx="188" cy="90" r="3.4" fill="#36421c"/><circle cx="187" cy="89" r="1" fill="#8a9a5e"/>
        <g class="wing near">${wing([104, 62], [84, 8], -6, id, true)}</g>
      </g>
    </svg>`;
  }
  return { svg };
})();
