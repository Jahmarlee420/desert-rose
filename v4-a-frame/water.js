// v4: detailed black-figure hydria vases and live water (tapered pour, droplets, shine).
// mode "frame": the pours feed a glassy channel that borders the page, with a trickle into the rose's sand.
// mode "calm": each vase pours a short stream that fades into the night.
const WATER = (() => {
  const K = 1.6; // horizontal drift of a falling stream: dx = K * sqrt(dy)
  const BODY = "M47 16 L73 16 C73 24 75 30 82 34 C100 42 104 60 100 80 C96 100 84 114 72 120 L70 128 L74 134 L46 134 L50 128 L48 120 C36 114 24 100 20 80 C16 60 20 42 38 34 C45 30 47 24 47 16Z";

  function palmette(x, y) {
    const fronds = [-60, -30, 0, 30, 60].map(a => `<ellipse cx="${x}" cy="${y - 7}" rx="2.2" ry="7" transform="rotate(${a} ${x} ${y})" fill="#1b120c"/>`).join("");
    return `${fronds}<path d="M${x - 6} ${y + 2} q6 -5 12 0" stroke="#1b120c" stroke-width="1.8" fill="none"/><circle cx="${x}" cy="${y}" r="2.2" fill="#1b120c"/>`;
  }
  function vase(id) {
    const tongues = Array.from({ length: 9 }, (_, i) => { const x = 38 + i * 5.5; return `<path d="M${x} 36 q2.75 9 5.5 0" fill="#1b120c"/>`; }).join("");
    const key = Array.from({ length: 12 }, (_, i) => { const x = 20 + i * 7; return `<path d="M${x} 104 v-5 h5 v3 h-2" stroke="#1b120c" stroke-width="1.3" fill="none"/>`; }).join("");
    return `<svg viewBox="-20 -20 160 190" aria-hidden="true">
      <defs>
        <radialGradient id="${id}clay" cx="44" cy="58" r="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f7b98a"/><stop offset=".33" stop-color="#da7c46"/><stop offset=".74" stop-color="#9c4520"/><stop offset="1" stop-color="#5a240e"/>
        </radialGradient>
        <linearGradient id="${id}glaze" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a281c"/><stop offset=".35" stop-color="#5a4232"/><stop offset="1" stop-color="#0f0905"/></linearGradient>
        <clipPath id="${id}body"><path d="${BODY}"/></clipPath>
        <filter id="${id}soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.8"/></filter>
        <filter id="${id}drop" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <g transform="rotate(-62 60 75)" filter="url(#${id}drop)">
        <path d="M74 20 C 98 12, 106 36, 92 47" stroke="#6e2e13" stroke-width="7.5" fill="none" stroke-linecap="round"/>
        <path d="M74 20 C 96 14, 103 35, 91 45" stroke="#c96d3c" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
        <path d="M31 46 C 13 40, 11 62, 25 63" stroke="#6e2e13" stroke-width="5.5" fill="none" stroke-linecap="round"/>
        <path d="M89 46 C 107 40, 109 62, 95 63" stroke="#6e2e13" stroke-width="5.5" fill="none" stroke-linecap="round"/>
        <path d="${BODY}" fill="url(#${id}clay)"/>
        <g clip-path="url(#${id}body)">
          <path d="M40 0 H80 V34 H40Z" fill="url(#${id}glaze)"/>
          ${tongues}
          <rect x="0" y="52" width="120" height="2.6" fill="#1b120c"/>
          ${palmette(40, 76)}${palmette(80, 76)}
          <g transform="translate(60 74)"><circle r="7.5" fill="#1b120c"/>${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-10" rx="2" ry="3.4" transform="rotate(${i * 45})" fill="#1b120c"/>`).join("")}<circle r="3" fill="#c96d3c" opacity=".7"/></g>
          <rect x="0" y="94" width="120" height="2.2" fill="#1b120c"/>
          ${key}
          <path d="M0 110 H120 V140 H0Z" fill="url(#${id}glaze)"/>
          <path d="M20 112 C 40 116, 80 116, 100 112" stroke="#d07a4a" stroke-width=".8" fill="none" opacity=".5"/>
          <path d="M24 40 C 18 60, 20 92, 38 112" stroke="#000" stroke-width="10" fill="none" opacity=".08" transform="translate(66 0) scale(.9 1)"/>
        </g>
        <ellipse cx="37" cy="66" rx="5" ry="21" transform="rotate(-12 37 66)" fill="#fff" opacity=".28" filter="url(#${id}soft)"/>
        <ellipse cx="41" cy="47" rx="2.4" ry="6" transform="rotate(-20 41 47)" fill="#fff" opacity=".55" filter="url(#${id}soft)"/>
        <path d="M46 134 L74 134 L77 141 L43 141Z" fill="url(#${id}glaze)"/>
        <path d="M44 138 H76" stroke="#7a5a44" stroke-width=".7"/>
        <ellipse cx="60" cy="15" rx="15.5" ry="4.6" fill="#24170f"/>
        <ellipse cx="60" cy="14.4" rx="12" ry="3" fill="#060403"/>
        <path d="M45 15.5 a15.5 4.6 0 0 0 31 0" stroke="#8a6a52" stroke-width="1" fill="none"/>
        <ellipse cx="54" cy="14.8" rx="5" ry="1.4" fill="#8fe0dc" opacity=".55"/>
        <circle class="mouth" cx="54" cy="14" r="1" fill="none"/>
      </g>
    </svg>`;
  }

  function init(mode) {
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
      const H = mode === "frame" ? document.documentElement.scrollHeight : Math.max(mL.y, mR.y) + 110;
      svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.textContent = "";
      const defs = el("defs", {}, svg);
      const glow = el("filter", { id: "wglow", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs); el("feGaussianBlur", { stdDeviation: "1.4" }, glow);
      const streams = [{ m: mL, dir: -1, cx: 8 }, { m: mR, dir: 1, cx: W - 8 }].map((s, i) => {
        const fall = mode === "frame" ? Math.max(26, (Math.abs(s.m.x - s.cx) / K) ** 2) : 78;
        const grad = el("linearGradient", { id: "wf" + i, gradientUnits: "userSpaceOnUse", x1: 0, y1: s.m.y, x2: 0, y2: s.m.y + fall }, defs);
        if (mode === "frame") { el("stop", { offset: 0, "stop-color": "#bdf1ee", "stop-opacity": .85 }, grad); el("stop", { offset: 1, "stop-color": "#5fc9c2", "stop-opacity": .7 }, grad); }
        else { el("stop", { offset: 0, "stop-color": "#bdf1ee", "stop-opacity": .85 }, grad); el("stop", { offset: .6, "stop-color": "#6fd0c9", "stop-opacity": .45 }, grad); el("stop", { offset: 1, "stop-color": "#6fd0c9", "stop-opacity": 0 }, grad); }
        return { ...s, fall, grad: "wf" + i };
      });
      const g = { W, H, streams, channels: [], glints: [] };
      if (mode === "frame") {
        const bottom = H - 16, r = 24;
        const m = document.querySelector(".rose .mound").getBoundingClientRect();
        const bedY = m.bottom + sy - 6, bedX = m.left + m.width / 2 + sx;
        const paths = streams.map(s => {
          const jy = s.m.y + s.fall, inward = -s.dir;
          s.join = { x: s.cx, y: jy };
          return `M${s.cx} ${jy} L${s.cx} ${bottom - r} Q${s.cx} ${bottom} ${s.cx + inward * r} ${bottom} L${W / 2} ${bottom}`;
        });
        paths.push(`M8 ${bedY - 16} C 22 ${bedY - 16}, 26 ${bedY}, 48 ${bedY} L${bedX} ${bedY}`);
        paths.forEach((d, i) => {
          const thin = i === 2;
          el("path", { d, stroke: "#3fb7b0", "stroke-opacity": thin ? .35 : .3, "stroke-width": thin ? 3 : 6, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, svg);
          el("path", { d, stroke: "#9fe6e0", "stroke-opacity": .5, "stroke-width": thin ? 1 : 1.6, fill: "none", "stroke-linecap": "round" }, svg);
          const flow = el("path", { d, stroke: "#e6fffd", "stroke-opacity": .7, "stroke-width": thin ? .8 : 1.1, fill: "none", "stroke-linecap": "round", "stroke-dasharray": "2 26" }, svg);
          g.channels.push({ flow, len: flow.getTotalLength(), path: flow });
        });
        for (let i = 0; i < 6; i++) g.glints.push({ ch: g.channels[i % 3], s: Math.random(), el: el("circle", { r: 2, fill: "#ffffff", opacity: .8, filter: "url(#wglow)" }, svg) });
        streams.forEach(s => { s.ripples = [0, .5].map(p => ({ p, el: el("ellipse", { cx: s.join.x, cy: s.join.y, fill: "none", stroke: "#bff0ec", "stroke-width": 1 }, svg) })); });
      }
      streams.forEach(s => {
        s.body = el("path", { fill: `url(#${s.grad})` }, svg);
        s.edge = el("path", { fill: "none", stroke: "#ffffff", "stroke-opacity": .28, "stroke-width": .7 }, svg);
        s.core = el("path", { fill: "none", stroke: "#ffffff", "stroke-opacity": .65, "stroke-width": 1.1, "stroke-linecap": "round", "stroke-dasharray": "5 9" }, svg);
      });
      g.dropLayer = el("g", {}, svg);
      G = g; drops = [];
      if (reduce) draw(performance.now());
    }

    function streamPts(s, time) {
      const pts = [], N = 34;
      for (let i = 0; i <= N; i++) {
        const u = i / N, dy = u * s.fall;
        const x = s.m.x + s.dir * K * Math.sqrt(dy);
        const wob = (Math.sin(dy * .2 - time * 9) * .9 + Math.sin(dy * .08 + time * 4) * .6) * u;
        const w = Math.max(1.8, 6.6 - 4.4 * u);
        pts.push({ x: x + wob, y: s.m.y + dy, w, u });
      }
      return pts;
    }

    function draw(now) {
      if (!G) return;
      const time = now / 1000, dt = Math.min((now - last) / 1000, .05); last = now;
      G.streams.forEach(s => {
        const p = streamPts(s, reduce ? 0 : time);
        const L = p.map(q => `${(q.x - q.w / 2).toFixed(1)} ${q.y.toFixed(1)}`), R = p.map(q => `${(q.x + q.w / 2).toFixed(1)} ${q.y.toFixed(1)}`).reverse();
        s.body.setAttribute("d", `M${L.join(" L")} L${R.join(" L")}Z`);
        s.edge.setAttribute("d", `M${L.join(" L")}`);
        s.core.setAttribute("d", "M" + p.map(q => `${(q.x - s.dir * q.w * .15).toFixed(1)} ${q.y.toFixed(1)}`).join(" L"));
        s.core.setAttribute("stroke-dashoffset", (-time * 70).toFixed(1));
        if (!reduce) {
          const spawnAt = mode === "frame" ? 1 : .35 + Math.random() * .4;
          if (Math.random() < dt * (mode === "frame" ? 9 : 5)) {
            const q = p[Math.round(spawnAt * (p.length - 1))];
            drops.push({ x: q.x, y: q.y, vx: (Math.random() - .5) * 40 - s.dir * (mode === "frame" ? 25 : 0), vy: mode === "frame" ? -30 - Math.random() * 40 : 10 + Math.random() * 25, life: 1, r: .8 + Math.random() * 1.2, fade: mode === "calm" });
          }
        }
        if (s.ripples) s.ripples.forEach(rp => { const k = ((reduce ? .3 : time * .9) + rp.p) % 1; rp.el.setAttribute("rx", 2 + k * 11); rp.el.setAttribute("ry", 1 + k * 3); rp.el.setAttribute("opacity", (1 - k) * .6); });
      });
      G.channels.forEach(c => c.flow.setAttribute("stroke-dashoffset", (-time * 34).toFixed(1)));
      G.glints.forEach(gl => { gl.s = (gl.s + dt * 55 / gl.ch.len) % 1; const pt = gl.ch.path.getPointAtLength(gl.s * gl.ch.len); gl.el.setAttribute("cx", pt.x); gl.el.setAttribute("cy", pt.y); gl.el.setAttribute("opacity", (.35 + .45 * Math.sin(time * 3 + gl.s * 20) ** 2).toFixed(2)); });
      G.dropLayer.textContent = "";
      drops = drops.filter(d => (d.life -= dt * 1.6) > 0);
      drops.forEach(d => {
        d.vy += 420 * dt; d.x += d.vx * dt; d.y += d.vy * dt;
        el("circle", { cx: d.x.toFixed(1), cy: d.y.toFixed(1), r: d.r, fill: "#c9f4f1", opacity: (d.life * (d.fade ? .7 : .85)).toFixed(2) }, G.dropLayer);
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
