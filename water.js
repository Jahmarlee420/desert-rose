// v5: slimmer black-figure hydria vases and layered live water (sheath, core, caustics, mist).
// The pours feed a glassy channel that borders the page, with a trickle into the rose's sand.
const WATER = (() => {
  const K = 1.6; // horizontal drift of a falling stream: dx = K * sqrt(dy)
  const BODY = "M49 14 L71 14 C71 22 72 28 78 32 C90 38 93 56 91 76 C89 96 81 110 72 118 L70 126 L74 133 L46 133 L50 126 L48 118 C39 110 31 96 29 76 C27 56 30 38 42 32 C48 28 49 22 49 14Z";
  const INK = "#1b120c", INCISE = "#d98a5a";

  function palmette(x, y, s) {
    const fronds = [-64, -40, -16, 8, 32, 56].map(a => `<ellipse cx="${x}" cy="${y - 6 * s}" rx="${1.6 * s}" ry="${6 * s}" transform="rotate(${a + 4} ${x} ${y})" fill="${INK}"/>`).join("");
    return `${fronds}<path d="M${x - 5 * s} ${y + 2 * s} q${5 * s} ${-4 * s} ${10 * s} 0" stroke="${INK}" stroke-width="${1.4 * s}" fill="none"/><circle cx="${x}" cy="${y}" r="${1.8 * s}" fill="${INK}"/>`;
  }
  // Black-figure woman carrying a hydria on her head (hydrophoros), with incised details.
  function hydrophoros(x) {
    return `<g>
      <path d="M${x - 3.6} 49 h7.2 l-1 -2.6 h-5.2z" fill="${INK}"/>
      <ellipse cx="${x}" cy="51.4" rx="4.4" ry="3" fill="${INK}"/>
      <circle cx="${x}" cy="57.4" r="3.1" fill="${INK}"/><circle cx="${x - 2.6}" cy="56.4" r="1.9" fill="${INK}"/>
      <path d="M${x - 1.6} 60.2 h3.2 l2.4 6.6 l2.4 22.4 h-13.6 l2.4 -22.4z" fill="${INK}"/>
      <path d="M${x + 1.2} 61.6 L${x + 4.6} 53.2" stroke="${INK}" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M${x - 1.2} 62 L${x - 5.2} 70.4" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M${x - 3.4} 67 H${x + 3.4} M${x - 2.6} 69 L${x - 4.4} 88 M${x} 69 L${x} 88 M${x + 2.6} 69 L${x + 4.4} 88 M${x - 2.2} 51.2 h4.4" stroke="${INCISE}" stroke-width=".45" fill="none"/>
      <circle cx="${x + 1.2}" cy="56.8" r=".45" fill="${INCISE}"/>
      <path d="M${x - 5.5} 89.6 h4 M${x + 1.5} 89.6 h4" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>
    </g>`;
  }
  function vase(id) {
    const tongues = Array.from({ length: 7 }, (_, i) => { const x = 43 + i * 5; return `<path d="M${x} 33 q2.5 7 5 0" fill="${INK}"/><path d="M${x + 2.5} 34 v3" stroke="${INCISE}" stroke-width=".35"/>`; }).join("");
    const ivy = `<path d="M50 6 q2.5 -3 5 0 t5 0 t5 0 t5 0" stroke="${INCISE}" stroke-width=".6" fill="none"/>` +
      [52, 57, 62, 67].map((x, i) => `<path d="M${x} ${i % 2 ? 7.6 : 4.4} c-1.6 -1.2 -1.6 ${i % 2 ? 2.8 : -2.8} 0 ${i % 2 ? 2.4 : -2.4} c1.6 ${i % 2 ? .4 : -.4} 1.6 ${i % 2 ? -1.6 : 1.6} 0 ${i % 2 ? -2.4 : 2.4}z" fill="${INCISE}" opacity=".85"/>`).join("") +
      `<path d="M50 21 h20 M51 24 h18" stroke="${INCISE}" stroke-width=".5"/>`;
    const key = Array.from({ length: 10 }, (_, i) => { const x = 28 + i * 6.6; return `<path d="M${x} 104.5 v-5 h4.6 v3.2 h-2" stroke="${INK}" stroke-width="1.2" fill="none"/>`; }).join("");
    const rays = Array.from({ length: 8 }, (_, i) => { const x = 36 + i * 6.2; return `<path d="M${x} 118 L${x + 3.1} 107.5 L${x + 6.2} 118Z" fill="${INK}"/>`; }).join("");
    return `<svg viewBox="-20 -20 160 190" aria-hidden="true">
      <defs>
        <radialGradient id="${id}clay" cx="46" cy="56" r="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f8bf92"/><stop offset=".32" stop-color="#dc7f48"/><stop offset=".72" stop-color="#9e4621"/><stop offset="1" stop-color="#5a240e"/>
        </radialGradient>
        <linearGradient id="${id}turn" x1="29" y1="0" x2="91" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".42"/>
        </linearGradient>
        <linearGradient id="${id}glaze" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a281c"/><stop offset=".3" stop-color="#5e4535"/><stop offset="1" stop-color="#0d0805"/></linearGradient>
        <clipPath id="${id}body"><path d="${BODY}"/></clipPath>
        <filter id="${id}soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="${id}drop" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <g transform="rotate(-62 60 75)" filter="url(#${id}drop)">
        <path d="M71 19 C 92 12, 99 32, 86 44" stroke="#6e2e13" stroke-width="6.5" fill="none" stroke-linecap="round"/>
        <path d="M71 19 C 90 14, 96 31, 85 42" stroke="#cf7442" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>
        <path d="M34 44 C 19 39, 18 59, 30 60" stroke="#6e2e13" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M86 44 C 101 39, 102 59, 90 60" stroke="#6e2e13" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="${BODY}" fill="url(#${id}clay)"/>
        <g clip-path="url(#${id}body)">
          <path d="M40 0 H80 V31 H40Z" fill="url(#${id}glaze)"/>
          ${ivy}
          ${tongues}
          <rect x="0" y="40" width="120" height="1.8" fill="${INK}"/>
          ${palmette(39, 74, .8)}${palmette(81, 74, .8)}
          ${hydrophoros(60)}
          <rect x="0" y="93" width="120" height="1.8" fill="${INK}"/>
          ${key}
          <rect x="0" y="105.6" width="120" height="1.2" fill="${INK}"/>
          ${rays}
          <path d="M0 118 H120 V140 H0Z" fill="url(#${id}glaze)"/>
          <rect x="0" y="0" width="120" height="140" fill="url(#${id}turn)"/>
        </g>
        <ellipse cx="41" cy="64" rx="4" ry="20" transform="rotate(-10 41 64)" fill="#fff" opacity=".26" filter="url(#${id}soft)"/>
        <ellipse cx="44" cy="44" rx="2" ry="5.5" transform="rotate(-18 44 44)" fill="#fff" opacity=".55" filter="url(#${id}soft)"/>
        <path d="M46 133 L74 133 L77 140 L43 140Z" fill="url(#${id}glaze)"/>
        <path d="M44 137 H76" stroke="#7a5a44" stroke-width=".7"/>
        <ellipse cx="60" cy="14.6" rx="13.5" ry="4.2" fill="#24170f"/>
        <ellipse cx="60" cy="13.2" rx="13.5" ry="4" fill="none" stroke="#6b4c37" stroke-width=".9"/>
        <ellipse cx="60" cy="14" rx="10.4" ry="2.8" fill="#050302"/>
        <ellipse cx="55" cy="14.4" rx="4.6" ry="1.3" fill="#9fe6e0" opacity=".6"/>
        <circle class="mouth" cx="54" cy="14" r="1" fill="none"/>
      </g>
    </svg>`;
  }

  // A meandering stream: bends that loosen as it nears the sand, smoothed into one curve (Catmull-Rom to cubic Bezier).
  function winding(x0, y0, x1, y1) {
    const N = 9, pts = [];
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const sway = 15 * (1 - t) ** 1.2 * Math.sin(t * Math.PI * 3.2);
      pts.push([x0 + (x1 - x0) * (t * .85 + .15 * t * t), Math.min(y1 + 2, y0 + (y1 - y0) * Math.sqrt(t) + sway)]);
    }
    pts.unshift([x0, y0 - 6]); pts.push([x1 + 10, y1]);
    let d = `M${pts[1][0].toFixed(1)} ${pts[1][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 2; i++) {
      const [p0, p1, p2, p3] = [pts[i - 1], pts[i], pts[i + 1], pts[i + 2]];
      d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)}, ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }

  function init() {
    const svg = document.getElementById("water");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const NS = "http://www.w3.org/2000/svg";
    const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };
    let G = null, drops = [], last = performance.now();

    function layout() {
      const W = document.documentElement.clientWidth, sx = scrollX, sy = scrollY;
      const at = q => { const r = document.querySelector(q).getBoundingClientRect(); return { x: r.left + r.width / 2 + sx, y: r.top + r.height / 2 + sy }; };
      svg.setAttribute("height", 0);
      const mL = at(".vase.l .mouth"), mR = at(".vase.r .mouth");
      const H = document.documentElement.scrollHeight;
      svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.textContent = "";
      const defs = el("defs", {}, svg);
      const blur = el("filter", { id: "wglow", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs); el("feGaussianBlur", { stdDeviation: "1.4" }, blur);
      const mist = el("filter", { id: "wmist", x: "-100%", y: "-100%", width: "300%", height: "300%" }, defs); el("feGaussianBlur", { stdDeviation: "2.5" }, mist);
      const streams = [{ m: mL, dir: -1, cx: 8 }, { m: mR, dir: 1, cx: W - 8 }].map((s, i) => {
        const fall = Math.max(26, (Math.abs(s.m.x - s.cx) / K) ** 2);
        const grad = el("linearGradient", { id: "wf" + i, gradientUnits: "userSpaceOnUse", x1: 0, y1: s.m.y, x2: 0, y2: s.m.y + fall }, defs);
        el("stop", { offset: 0, "stop-color": "#d4f7f4", "stop-opacity": .9 }, grad); el("stop", { offset: 1, "stop-color": "#5fc9c2", "stop-opacity": .65 }, grad);
        return { ...s, fall, grad: "wf" + i };
      });
      const g = { W, H, streams, channels: [], glints: [] };
      const bottom = H - 16, r = 24;
      const m = document.querySelector(".rose .mound").getBoundingClientRect();
      const bedY = m.bottom + sy - 6, bedX = m.left + m.width / 2 + sx;
      const paths = streams.map(s => {
        const jy = s.m.y + s.fall, inward = -s.dir;
        s.join = { x: s.cx, y: jy };
        return `M${s.cx} ${jy} L${s.cx} ${bottom - r} Q${s.cx} ${bottom} ${s.cx + inward * r} ${bottom} L${W / 2} ${bottom}`;
      });
      paths.push(winding(8, bedY - 58, bedX, bedY));
      paths.forEach((d, i) => {
        const thin = i === 2, k = thin ? .55 : 1;
        el("path", { d, stroke: "#1f6f6b", "stroke-opacity": .35, "stroke-width": 8 * k, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, svg);
        el("path", { d, stroke: "#3fb7b0", "stroke-opacity": .45, "stroke-width": 5 * k, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, svg);
        el("path", { d, stroke: "#c9f4f1", "stroke-opacity": .3, "stroke-width": 1.4 * k, fill: "none", "stroke-linecap": "round", transform: `translate(${-1.2 * k} 0)` }, svg);
        // braided current: several highlight strands with irregular gaps, each moving at its own speed
        const strands = [
          { dash: "9 5 3 14 6 21", w: 1.6, o: .38, sp: 26, off: -1.4, blur: true },
          { dash: "4 11 2 7 12 19", w: 1, o: .6, sp: 41, off: .2 },
          { dash: "2 9 5 16 1 12", w: .7, o: .8, sp: 58, off: 1.3 },
          { dash: "14 30 6 24", w: 2.6, o: .18, sp: 17, off: 0, blur: true }
        ].map(st => ({ ...st, el: el("path", { d, stroke: "#e9fffd", "stroke-opacity": st.o, "stroke-width": st.w * k, fill: "none", "stroke-linecap": "round", "stroke-dasharray": st.dash, transform: `translate(${st.off * k} 0)`, ...(st.blur ? { filter: "url(#wglow)" } : {}) }, svg) }));
        g.channels.push({ strands, len: strands[0].el.getTotalLength(), path: strands[1].el });
      });
      for (let i = 0; i < 8; i++) g.glints.push({ ch: g.channels[i % 3], s: Math.random(), v: 40 + Math.random() * 30, el: el("circle", { r: 1.8, fill: "#ffffff", opacity: .8, filter: "url(#wglow)" }, svg) });
      streams.forEach(s => {
        // aerated water where the pour merges into the border: a soft glow plus drifting foam bubbles, no rings
        s.mist = el("ellipse", { cx: s.join.x, cy: s.join.y + 4, rx: 6, ry: 10, fill: "#d4f7f4", opacity: .25, filter: "url(#wmist)" }, svg);
        s.foam = Array.from({ length: 9 }, (_, i) => ({ ph: Math.random() * 6.28, sp: 1.5 + Math.random() * 2.5, dy: Math.random() * 22, el: el("circle", { r: .7 + Math.random() * 1.6, fill: "#f2fffe" }, svg) }));
        s.sheath = el("path", { fill: "#7fd6d0", "fill-opacity": .22 }, svg);
        s.body = el("path", { fill: `url(#${s.grad})` }, svg);
        s.edge = el("path", { fill: "none", stroke: "#ffffff", "stroke-opacity": .35, "stroke-width": .6 }, svg);
        s.core = el("path", { fill: "none", stroke: "#ffffff", "stroke-opacity": .75, "stroke-width": 1, "stroke-linecap": "round", "stroke-dasharray": "4 7" }, svg);
        s.core2 = el("path", { fill: "none", stroke: "#e8fffd", "stroke-opacity": .5, "stroke-width": .6, "stroke-linecap": "round", "stroke-dasharray": "2 13" }, svg);
      });
      g.dropLayer = el("g", {}, svg);
      G = g; drops = [];
      if (reduce) draw(performance.now());
    }

    function streamPts(s, time) {
      const pts = [], N = 40;
      for (let i = 0; i <= N; i++) {
        const u = i / N, dy = u * s.fall;
        const x = s.m.x + s.dir * K * Math.sqrt(dy);
        // the shared breeze bows the falling water slightly downwind (left to right)
        const breeze = typeof WIND === "function" ? (WIND(time * 1000) - 1) * 1.8 * u * u : 0;
        const wob = (Math.sin(dy * .22 - time * 10) * .8 + Math.sin(dy * .09 + time * 4.3) * .55) * u + breeze;
        const neck = Math.exp(-((u - .55) ** 2) / .02) * .8; // a slight pinch partway down, like a real pour
        const w = Math.max(1.6, 6.8 - 4.6 * u - neck);
        pts.push({ x: x + wob, y: s.m.y + dy, w, u });
      }
      return pts;
    }
    const line = (pts, off) => "M" + pts.map(q => `${(q.x + off(q)).toFixed(1)} ${q.y.toFixed(1)}`).join(" L");

    function draw(now) {
      if (!G) return;
      const time = now / 1000, dt = Math.min((now - last) / 1000, .05); last = now;
      G.streams.forEach(s => {
        const p = streamPts(s, reduce ? 0 : time);
        const poly = (k) => { const L = p.map(q => `${(q.x - q.w * k / 2).toFixed(1)} ${q.y.toFixed(1)}`), R = p.map(q => `${(q.x + q.w * k / 2).toFixed(1)} ${q.y.toFixed(1)}`).reverse(); return `M${L.join(" L")} L${R.join(" L")}Z`; };
        s.sheath.setAttribute("d", poly(1.9));
        s.body.setAttribute("d", poly(1));
        s.edge.setAttribute("d", line(p, q => -q.w / 2));
        s.core.setAttribute("d", line(p, q => -s.dir * q.w * .18));
        s.core.setAttribute("stroke-dashoffset", (-time * 80).toFixed(1));
        s.core2.setAttribute("d", line(p, q => s.dir * q.w * .22));
        s.core2.setAttribute("stroke-dashoffset", (-time * 55).toFixed(1));
        s.mist.setAttribute("opacity", (.2 + .08 * Math.sin(time * 2.4)).toFixed(2));
        s.foam.forEach(f => {
          // bubbles get carried down the border, drifting side to side, then recycle at the join
          f.dy = (f.dy + dt * (18 + f.sp * 6)) % 26;
          const fx = s.join.x + Math.sin(f.ph + time * f.sp) * 2.2, fy = s.join.y - 2 + f.dy;
          f.el.setAttribute("cx", fx.toFixed(1)); f.el.setAttribute("cy", fy.toFixed(1));
          f.el.setAttribute("opacity", ((1 - f.dy / 26) * .65).toFixed(2));
        });
        if (!reduce) {
          if (Math.random() < dt * 5) { const q = p[p.length - 1]; drops.push({ x: q.x, y: q.y - 2, vx: (Math.random() - .5) * 26 - s.dir * 12, vy: -18 - Math.random() * 26, life: .8, r: .5 + Math.random() * .9 }); }
          if (Math.random() < dt * 3) { const q = p[Math.round((.3 + Math.random() * .5) * (p.length - 1))]; drops.push({ x: q.x + s.dir * q.w / 2, y: q.y, vx: s.dir * (8 + Math.random() * 14), vy: 10, life: .8, r: .6 + Math.random() * .7 }); }
        }
      });
      G.channels.forEach(c => c.strands.forEach(st => st.el.setAttribute("stroke-dashoffset", (-time * st.sp).toFixed(1))));
      G.glints.forEach(gl => { gl.s = (gl.s + dt * gl.v / gl.ch.len) % 1; const pt = gl.ch.path.getPointAtLength(gl.s * gl.ch.len); gl.el.setAttribute("cx", pt.x); gl.el.setAttribute("cy", pt.y); gl.el.setAttribute("opacity", (.3 + .5 * Math.sin(time * 3 + gl.s * 20) ** 2).toFixed(2)); });
      G.dropLayer.textContent = "";
      drops = drops.filter(d => (d.life -= dt * 1.7) > 0);
      drops.forEach(d => {
        d.vy += 420 * dt; d.x += d.vx * dt; d.y += d.vy * dt;
        el("circle", { cx: d.x.toFixed(1), cy: d.y.toFixed(1), r: d.r, fill: "#d9f8f5", opacity: (d.life * .85).toFixed(2) }, G.dropLayer);
      });
      if (!reduce) requestAnimationFrame(draw);
    }

    layout();
    if (!reduce) requestAnimationFrame(draw);
    addEventListener("resize", layout);
    document.fonts && document.fonts.ready.then(layout);
    setTimeout(layout, 3000);
  }
  return { vase, init };
})();
