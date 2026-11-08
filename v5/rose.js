// v5: a garden rose rising from a small sand mound.
// The head is generated: ~two dozen petals placed on a golden-angle spiral, each shaped in 3D
// (cupped across, rim rolling outward), viewed from slightly above, shaded by which way it faces,
// and drawn back to front. head(P) gives the rose at bloom P (0 tight bud, 1 full bloom);
// like a real rose it opens from the outside in.
const ROSE = (() => {
  const N = 26, GOLD = 2.39996, TILT = 13 * Math.PI / 180, CA = Math.cos(TILT), SA = Math.sin(TILT), K = 1.38;
  const clamp = v => Math.max(0, Math.min(1, v)), ease = v => v * v * (3 - 2 * v);
  const sstep = (a, b, v) => ease(clamp((v - a) / (b - a)));
  const proj = ([x, y, z]) => [x, 30 - (y * CA - z * SA), y * SA + z * CA];   // base of the head sits at y 30
  const mix = (a, b, k) => "#" + [0, 2, 4].map(i => Math.round(parseInt(a.substr(i + 1, 2), 16) * (1 - k) + parseInt(b.substr(i + 1, 2), 16) * k).toString(16).padStart(2, "0")).join("");
  // smooth closed curve through points (Catmull-Rom as cubic Bezier)
  const smooth = pts => {
    const n = pts.length, p = i => pts[(i + n) % n];
    let d = `M${p(0)[0].toFixed(1)} ${p(0)[1].toFixed(1)}`;
    for (let i = 0; i < n; i++) {
      const [a, b, c, e] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
      d += `C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
    }
    return d + "Z";
  };
  function head(P, id, wind = 0, time = 0) {
    const petals = [], defs = [];
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);                                   // 0 innermost .. 1 outermost
      const th = i * GOLD + .4;
      const q = ease(clamp((P - (1 - t) * .5) / .5));         // outer petals open first
      // closed: petals lean in and wrap the bud; open: a tall upright centre with outer petals flaring
      const phiBud = -3 + 10 * t, phiOpen = 3 + 54 * Math.pow(t, 1.5);
      const phi = phiBud + (phiOpen - phiBud) * q + wind * t * (1.6 + Math.sin(time * 3 + i));
      const roll = Math.pow(t, .8) * q;                        // rims curl outward as they open, most on the outer petals
      const w = K * (8 + 20 * t), h = K * (37 + 12 * t), cup = (1 - .5 * t) * (1.15 - .25 * q), r0 = K * (1 + 5 * t * (.25 + .75 * q));
      const R = [Math.cos(th), 0, Math.sin(th)], T = [-Math.sin(th), 0, Math.cos(th)];
      const S = 12, line = [[r0 * R[0], 0, r0 * R[2]]];
      for (let s = 1; s <= S; s++) {
        // open rims roll outward; closed petals curl inward near the tip, so the bud tapers to a point
        const v = s / S, a = (phi + roll * 75 * sstep(.5, 1, v) - (1 - q) * 30 * sstep(.3, 1, v)) * Math.PI / 180, c = line[s - 1], k = h / S;
        line.push([c[0] + k * Math.sin(a) * R[0], c[1] + k * Math.cos(a), c[2] + k * Math.sin(a) * R[2]]);
      }
      const at = (u, v) => {
        const f = v * S, j = Math.min(S - 1, Math.floor(f)), r = f - j, c = line[j].map((x, d) => x + (line[j + 1][d] - x) * r);
        const s = (.22 + .78 * Math.sin(Math.min(1, v * 1.15) * Math.PI / 2)) * (1 - .12 * v) * (1 - (1 - q) * .5 * sstep(.45, 1, v));
        const cupIn = cup * w * s * u * u * .6;
        return [c[0] + u * w * s * T[0] - cupIn * R[0], c[1] + cupIn * .15, c[2] + u * w * s * T[2] - cupIn * R[2]];
      };
      const top = u => 1 - .1 * u * u - .05 * Math.exp(-u * u / .03);
      const pts3 = [];
      for (let k = 0; k <= 7; k++) pts3.push(at(-1, top(-1) * k / 7));
      for (let k = 1; k < 10; k++) { const u = -1 + 2 * k / 10; pts3.push(at(u, top(u))); }
      for (let k = 7; k >= 0; k--) pts3.push(at(1, top(1) * k / 7));
      const pts = pts3.map(proj);
      // facing: normal of the petal surface near its middle, after the camera tilt
      const A = at(-.3, .6), B = at(.3, .6), C = at(0, .45), D = at(0, .75);
      const du = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], dv = [D[0] - C[0], D[1] - C[1], D[2] - C[2]];
      const nrm = [du[1] * dv[2] - du[2] * dv[1], du[2] * dv[0] - du[0] * dv[2], du[0] * dv[1] - du[1] * dv[0]];
      const nz = nrm[1] * SA + nrm[2] * CA, nl = Math.hypot(...nrm) || 1, facing = nz / nl;
      const inner = facing > 0;                                // we see the petal's inside (deeper red)
      const lit = .55 + .45 * Math.abs(facing);
      const base = proj(line[0]), tip = proj(line[S]);
      const g = `${id}g${i}`;
      const c0 = inner ? "#45040f" : "#6e0f27", c1 = inner ? mix("#9c0f2b", "#d8213f", lit) : mix("#b8233f", "#ef5574", lit), c2 = inner ? "#f0486a" : "#ff8fa8";
      defs.push(`<linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="${base[0].toFixed(1)}" y1="${base[1].toFixed(1)}" x2="${tip[0].toFixed(1)}" y2="${tip[1].toFixed(1)}"><stop offset="0" stop-color="${c0}"/><stop offset=".55" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`);
      const rim = pts.slice(8, 17).map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L");
      const depth = (line[S / 2][1] * SA + line[S / 2][2] * CA);
      petals.push({ depth, svg: `<path d="${smooth(pts)}" fill="url(#${g})" stroke="#4a0818" stroke-width=".3" stroke-opacity=".35"/>` +
        (roll > .35 ? `<path d="M${rim}" fill="none" stroke="#ffc4d2" stroke-width="${(.4 + .5 * roll).toFixed(2)}" stroke-opacity="${(.08 + .14 * roll).toFixed(2)}" stroke-linecap="round"/>` : "") });
    }
    petals.sort((a, b) => a.depth - b.depth);
    return `<defs>${defs.join("")}</defs><ellipse cx="0" cy="34" rx="7" ry="5" fill="#4f6a2c"/>` + petals.map(p => p.svg).join("");
  }
  // id keeps gradient ids unique when the rose appears twice on a page.
  function svg(id = "r", P = 1) {
    return `<svg viewBox="-125 -95 250 345" aria-hidden="true">
      <defs>
        <linearGradient id="${id}p" x1="0" y1="30" x2="0" y2="-60" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5a0718"/><stop offset=".45" stop-color="#a3132f"/><stop offset=".85" stop-color="#e2405f"/><stop offset="1" stop-color="#ff7f99"/></linearGradient>
        <linearGradient id="${id}b" x1="0" y1="2" x2="0" y2="-48" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8a0d2b"/><stop offset=".5" stop-color="#cc1f43"/><stop offset="1" stop-color="#f45a7a"/></linearGradient>
        <linearGradient id="${id}f" x1="0" y1="30" x2="0" y2="-20" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a0b24"/><stop offset=".5" stop-color="#c62845"/><stop offset="1" stop-color="#f4637f"/></linearGradient>
        <radialGradient id="${id}sheen" cx=".35" cy=".3" r=".6"><stop offset="0" stop-color="#ffd6df" stop-opacity=".35"/><stop offset="1" stop-color="#ffd6df" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}glow"><stop offset="0" stop-color="#ff5c86" stop-opacity=".4"/><stop offset=".55" stop-color="#ff5c86" stop-opacity=".08"/><stop offset="1" stop-color="#ff5c86" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fae4c"/><stop offset="1" stop-color="#3d5a24"/></linearGradient>
        <linearGradient id="${id}stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f4419"/><stop offset=".5" stop-color="#55762f"/><stop offset="1" stop-color="#2f4419"/></linearGradient>
        <linearGradient id="${id}sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c08a"/><stop offset="1" stop-color="#a87a4c"/></linearGradient>
        <filter id="${id}sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#1e0009" flood-opacity=".6"/></filter>
      </defs>
      <circle class="glow" cx="0" cy="-26" r="118" fill="url(#${id}glow)"/>
      <g class="plant">
        <path class="stem" d="M0 232 C 18 192, -22 142, 6 92 C 18 64, 4 46, 0 32" stroke="url(#${id}stem)" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path class="thorn" d="M5 196 l10 -5 l-8 10z M-11 150 l-10 -3 l8 8z M9 74 l9 -6 l-7 10z" fill="#3a5220"/>
        <g class="leaf r" style="--d:.55s"><path d="M-1 164 C 26 140, 64 138, 88 148 C 62 172, 26 176, -1 164Z" fill="url(#${id}leaf)"/><path d="M-1 164 C 32 156, 62 152, 88 148" stroke="#2f4419" stroke-width="1.3" fill="none"/><path d="M30 158 l8 -10 M50 154 l8 -9 M30 159 l6 9 M50 155 l6 8" stroke="#2f4419" stroke-width=".7" opacity=".7"/></g>
        <g class="leaf l" style="--d:.7s"><path d="M-4 120 C -32 98, -68 98, -90 110 C -64 132, -28 134, -4 120Z" fill="url(#${id}leaf)"/><path d="M-4 120 C -36 114, -64 112, -90 110" stroke="#2f4419" stroke-width="1.3" fill="none"/><path d="M-34 114 l-8 -9 M-54 112 l-8 -8 M-34 115 l-6 9 M-54 113 l-6 8" stroke="#2f4419" stroke-width=".7" opacity=".7"/></g>
        <g class="sepals">
          <path class="sep" data-bx="-4" data-by="30" data-a="112" d="M-4 30 C -14 32, -24 37, -33 46 C -26 42, -16 38, -4 33Z" fill="#46632a" stroke="#3a5220" stroke-width="1.2" stroke-linejoin="round"/>
          <path class="sep" data-bx="4" data-by="30" data-a="-112" d="M4 30 C 14 32, 24 37, 33 46 C 26 42, 16 38, 4 33Z" fill="#46632a" stroke="#3a5220" stroke-width="1.2" stroke-linejoin="round"/>
          <path d="M0 33 C -2 39, -4 45, -7 51" stroke="#3f5a2a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        </g>
        <!-- the head is drawn compact, then stretched upward from its base into a tall, high-centred rose -->
        <g><g class="spin"><g class="head" filter="url(#${id}sh)">${head(P, id)}</g></g></g>
      </g>
      <path class="mound" d="M-110 248 C -70 222, -30 214, 0 214 C 32 214, 72 224, 112 248Z" fill="url(#${id}sand)"/>
      <clipPath id="${id}mclip"><path d="M-110 248 C -70 222, -30 214, 0 214 C 32 214, 72 224, 112 248Z"/></clipPath>
      <!-- the stream ends in a shallow pool lapping at the foot of the mound; the sand darkens upward from the waterline as it soaks in -->
      <linearGradient id="${id}wet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3519" stop-opacity="0"/><stop offset=".45" stop-color="#5a3519" stop-opacity=".45"/><stop offset="1" stop-color="#3c220e" stop-opacity=".9"/></linearGradient>
      <linearGradient id="${id}pool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fe0da" stop-opacity=".75"/><stop offset=".5" stop-color="#3fb7b0" stop-opacity=".7"/><stop offset="1" stop-color="#1f6f6b" stop-opacity=".85"/></linearGradient>
      <g clip-path="url(#${id}mclip)">
        <path class="wet" d="M-112 250 L-112 232 C -100 229, -90 235, -78 231 C -64 227, -54 236, -40 233 C -26 231, -16 238, -2 237 C 14 236, 26 242, 42 241 C 58 240, 70 245, 86 245 L 114 250Z" fill="url(#${id}wet)"/>
        <path class="wet wet2" d="M-112 250 L-112 238 C -96 236, -84 241, -68 238 C -50 236, -36 242, -20 241 C -4 240, 10 245, 30 245 L 60 250Z" fill="url(#${id}wet)" opacity=".7"/>
        <path d="M-112 232 C -100 229, -90 235, -78 231 C -64 227, -54 236, -40 233 C -26 231, -16 238, -2 237 C 14 236, 26 242, 42 241 C 58 240, 70 245, 86 245" stroke="#3f2612" stroke-width=".8" fill="none" opacity=".35"/>
      </g>
      <g class="pool">
        <path d="M-126 249.5 C -121 244.5, -106 243.6, -88 244.4 C -60 245.4, -24 246.4, 12 247.3 C 26 247.7, 36 248.2, 40 249 C 30 251.4, -6 252.6, -46 253.2 C -82 253.6, -112 253.2, -122 252 C -125 251.3, -126.5 250.4, -126 249.5Z" fill="url(#${id}pool)"/>
        <path d="M-122 247.6 C -108 244.8, -88 244.6, -62 245.4 C -32 246.2, 0 246.9, 30 247.8" stroke="#e9fffd" stroke-width=".9" fill="none" opacity=".55" stroke-linecap="round"/>
        <path d="M-112 251.2 C -90 251.8, -60 251.6, -30 251" stroke="#bff3ef" stroke-width=".6" fill="none" opacity=".35" stroke-linecap="round"/>
        <g class="glisten" fill="#f2fffe"><ellipse cx="-104" cy="248.6" rx="3" ry=".7"/><ellipse cx="-76" cy="249.6" rx="2.2" ry=".55"/><ellipse cx="-44" cy="249.4" rx="2.6" ry=".6"/><ellipse cx="-14" cy="249" rx="1.6" ry=".45"/></g>
      </g>
      <path d="M-70 236 C -40 226, -16 222, 4 222 M -20 240 C 10 232, 40 232, 70 240" stroke="#f3d6a6" stroke-width="1.2" fill="none" opacity=".55"/>
    </svg>`;
  }
  return { svg, head };
})();
