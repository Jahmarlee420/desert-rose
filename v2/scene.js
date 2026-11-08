// v2 hero: a rose blooming on a dune under a dusk sky, with a caravan crossing the far ridge.
const SCENE = (() => {
  const LAYERS = [
    { n: 5, r: 58, rot: 0,  d: 0.9 },
    { n: 5, r: 48, rot: 36, d: 1.1 },
    { n: 5, r: 38, rot: 14, d: 1.3 },
    { n: 4, r: 28, rot: 52, d: 1.5 },
    { n: 3, r: 19, rot: 20, d: 1.7 }
  ];
  function petal(r) {
    const w = r * 0.62;
    return `M0 0 C ${-w * .9} ${-r * .2}, ${-w} ${-r * .9}, ${-w * .35} ${-r} C ${-w * .1} ${-r * 1.05}, ${w * .1} ${-r * 1.05}, ${w * .35} ${-r} C ${w} ${-r * .9}, ${w * .9} ${-r * .2}, 0 0Z`;
  }
  function rose() {
    const layers = LAYERS.map((L, li) => {
      const ps = Array.from({ length: L.n }, (_, k) =>
        `<path d="${petal(L.r)}" transform="rotate(${L.rot + k * 360 / L.n})" fill="url(#petal${li})" stroke="#ff9db4" stroke-width=".7" stroke-opacity=".55"/>`).join("");
      return `<g class="layer" style="--d:${L.d}s" filter="url(#petalShadow)">${ps}</g>`;
    }).join("");
    const grads = LAYERS.map((L, li) => `
      <radialGradient id="petal${li}" cx="0" cy="0" r="${L.r}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#4d0717"/><stop offset=".45" stop-color="#a3122f"/>
        <stop offset=".85" stop-color="#e2405f"/><stop offset="1" stop-color="#ff7d97"/>
      </radialGradient>`).join("");
    return { grads, head: `${layers}
      <g class="layer" style="--d:1.9s">
        <circle r="10" fill="#7a0d27"/>
        <path d="M0 0 a3 3 0 1 1 4 2 a6 6 0 1 1 -9 -3 a9 9 0 1 1 13 5" stroke="#4d0717" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      </g>` };
  }
  const CAMEL = `<path d="M5 30 C5 18 15 12 22 16 C26 6 34 6 37 16 C41 12 46 14 48 10 L52 4 C55 2 58 4 57 7 L54 9 C52 16 50 22 46 26 L46 38 L43 38 L42 28 L20 28 L19 38 L16 38 L15 28 C10 28 6 30 5 30Z"/>`;
  const WALKER = `<path d="M6 8 a3 3 0 1 1 0.1 0 M4 12 h5 l1 12 l2 14 h-3 l-2-11 l-2 11 h-3 l2-14z"/>`;

  function svg() {
    const R = rose();
    return `<svg class="scene-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#070f24"/><stop offset=".38" stop-color="#1b1d48"/>
          <stop offset=".62" stop-color="#4c2c5e"/><stop offset=".8" stop-color="#a5506a"/><stop offset="1" stop-color="#f0a067"/>
        </linearGradient>
        <radialGradient id="moonGlow"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".55"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient>
        <radialGradient id="roseGlow"><stop offset="0" stop-color="#ff5c86" stop-opacity=".55"/><stop offset=".5" stop-color="#ff5c86" stop-opacity=".15"/><stop offset="1" stop-color="#ff5c86" stop-opacity="0"/></radialGradient>
        <linearGradient id="duneFar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b4256"/><stop offset="1" stop-color="#45263f"/></linearGradient>
        <linearGradient id="duneMid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c46a4b"/><stop offset="1" stop-color="#6e3a3e"/></linearGradient>
        <linearGradient id="duneNear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eba869"/><stop offset=".5" stop-color="#c17646"/><stop offset="1" stop-color="#7a4232"/></linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fae4c"/><stop offset="1" stop-color="#3d5a24"/></linearGradient>
        <mask id="crescent"><circle cx="980" cy="130" r="46" fill="#fff"/><circle cx="1000" cy="116" r="42" fill="#000"/></mask>
        <filter id="petalShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#2a0010" flood-opacity=".55"/></filter>
        ${R.grads}
      </defs>
      <rect width="1200" height="700" fill="url(#sky)"/>
      <circle class="moon-glow" cx="980" cy="130" r="140" fill="url(#moonGlow)"/>
      <rect x="900" y="60" width="140" height="140" fill="#ffe3a0" mask="url(#crescent)"/>
      <path d="M0 470 L80 440 L130 452 L190 410 L260 448 L340 430 L420 456 L1200 456 L1200 700 L0 700Z" fill="#3a2446" opacity=".9"/>
      <path d="M0 480 C 180 420, 330 430, 520 462 C 700 492, 860 420, 1200 448 L1200 700 L0 700Z" fill="url(#duneFar)"/>
      <g class="caravan" fill="#24142b">
        <g transform="translate(0 432) scale(.7)">${CAMEL}</g>
        <g transform="translate(46 432) scale(.7)">${CAMEL}</g>
        <g transform="translate(92 436) scale(.6)">${WALKER}</g>
      </g>
      <path d="M0 560 C 220 500, 420 520, 600 548 C 800 578, 980 500, 1200 520 L1200 700 L0 700Z" fill="url(#duneMid)"/>
      <path d="M0 640 C 250 610, 430 560, 600 560 C 780 560, 950 620, 1200 600 L1200 700 L0 700Z" fill="url(#duneNear)"/>
      <path d="M380 600 C 470 575, 540 566, 600 566" stroke="#f7c58c" stroke-width="2" fill="none" opacity=".6"/>
      <circle class="rose-glow" cx="600" cy="400" r="160" fill="url(#roseGlow)"/>
      <g class="plant">
        <path class="stem" d="M600 566 C 596 520, 610 480, 600 410" stroke="#3f5a2a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path class="thorn" d="M601 520 l9 -6 l-7 10z M598 470 l-9 -5 l7 9z" fill="#3f5a2a"/>
        <g class="leaf" style="--d:.7s; transform-origin: 602px 500px"><path d="M602 500 C 630 478, 668 478, 690 490 C 664 512, 628 514, 602 500Z" fill="url(#leaf)"/><path d="M602 500 C 636 494, 664 492, 690 490" stroke="#2f4419" stroke-width="1.4" fill="none"/></g>
        <g class="leaf" style="--d:.85s; transform-origin: 598px 455px"><path d="M598 455 C 570 432, 534 434, 512 446 C 538 468, 574 470, 598 455Z" fill="url(#leaf)"/><path d="M598 455 C 566 450, 536 448, 512 446" stroke="#2f4419" stroke-width="1.4" fill="none"/></g>
        <g transform="translate(600 392) scale(1 .84)"><g class="head">${R.head}</g></g>
      </g>
    </svg>`;
  }

  // Stars, a shooting star, drifting sand and rising rose sparks.
  function animate(canvas, host) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, dpr = 1, stars = [], sand = [], sparks = [], shoot = null, last = performance.now();
    const rnd = (a, b) => a + Math.random() * (b - a);
    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round(W * H / 2600) }, () => ({ x: rnd(0, W), y: rnd(0, H * .55), r: rnd(.4, 1.5), p: rnd(0, 6.28), s: rnd(.6, 2) }));
      sand = Array.from({ length: Math.round(W / 9) }, () => ({ x: rnd(0, W), y: rnd(H * .6, H), v: rnd(12, 40), r: rnd(.5, 1.6), a: rnd(.2, .6) }));
    }
    function roseXY() { // rose head position in screen space (viewBox is xMidYMax slice)
      const s = Math.max(W / 1200, H / 700);
      return { x: W / 2, y: H - (700 - 392) * s, s };
    }
    function frame(t) {
      const dt = Math.min((t - last) / 1000, .05); last = t;
      ctx.clearRect(0, 0, W, H);
      for (const st of stars) {
        const a = reduce ? .7 : .45 + .45 * Math.sin(st.p + t / 1000 * st.s);
        ctx.fillStyle = `rgba(255,240,215,${a})`;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.28); ctx.fill();
      }
      if (!reduce) {
        if (!shoot && Math.random() < dt / 5) shoot = { x: rnd(W * .1, W * .7), y: rnd(10, H * .25), vx: rnd(380, 520), vy: rnd(120, 200), life: 1 };
        if (shoot) {
          shoot.x += shoot.vx * dt; shoot.y += shoot.vy * dt; shoot.life -= dt * 1.2;
          const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * .18, shoot.y - shoot.vy * .18);
          g.addColorStop(0, `rgba(255,236,190,${Math.max(shoot.life, 0)})`); g.addColorStop(1, "rgba(255,236,190,0)");
          ctx.strokeStyle = g; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.vx * .18, shoot.y - shoot.vy * .18); ctx.stroke();
          if (shoot.life <= 0) shoot = null;
        }
        for (const p of sand) {
          p.x += p.v * dt; if (p.x > W + 4) { p.x = -4; p.y = rnd(H * .6, H); }
          ctx.fillStyle = `rgba(250,206,150,${p.a})`;
          ctx.beginPath(); ctx.arc(p.x, p.y + Math.sin((p.x + t / 8) / 40) * 3, p.r, 0, 6.28); ctx.fill();
        }
        const R = roseXY();
        if (t > 2200 && Math.random() < dt * 7) sparks.push({ x: R.x + rnd(-40, 40) * R.s, y: R.y + rnd(-20, 30) * R.s, vy: rnd(-26, -12), vx: rnd(-8, 8), life: 1, r: rnd(1, 2.4) });
        sparks = sparks.filter(s => (s.life -= dt * .35) > 0);
        for (const s of sparks) {
          s.x += s.vx * dt; s.y += s.vy * dt;
          ctx.fillStyle = `rgba(255,${150 + 80 * s.life | 0},${190},${s.life * .9})`;
          ctx.shadowColor = "#ff6f96"; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    size(); addEventListener("resize", size);
    requestAnimationFrame(frame);
  }
  return { svg, animate };
})();
