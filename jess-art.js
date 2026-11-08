// Shared art + content for Jess's vouchers (digital + print).
const ART = {
  rose(id) {
    const petals = [0, 1, 2, 3, 4].map(k => `
      <g transform="rotate(${k * 72})">
        <path d="M0 0 C 14 -8, 36 -30, 24 -58 C 14 -73, -8 -71, -15 -56 C -21 -38, -10 -14, 0 0Z" fill="url(#pet-${id})" stroke="#9c1f45" stroke-width=".8"/>
        <path d="M0 -6 L 4 -26 M0 -6 L -2 -24 M0 -6 L 9 -22" stroke="#a3214a" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>
      </g>`).join("");
    return `<svg viewBox="-82 -82 164 164" aria-hidden="true">
      <defs>
        <radialGradient id="pet-${id}" cx="0" cy="0" r="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff5f1"/><stop offset=".32" stop-color="#fbd6dd"/>
          <stop offset=".72" stop-color="#e5648d"/><stop offset="1" stop-color="#b3264f"/>
        </radialGradient>
      </defs>
      <path d="M6 22 C 34 40, 58 62, 76 70 C 50 76, 18 60, 6 22Z" fill="#6b7a35"/>
      <path d="M6 22 C 30 44, 54 62, 76 70" stroke="#4a5622" stroke-width="1.2" fill="none"/>
      <path d="M-8 20 C -36 30, -62 52, -74 66 C -48 68, -18 52, -8 20Z" fill="#7d8c3f"/>
      <path d="M-8 20 C -34 36, -58 54, -74 66" stroke="#4a5622" stroke-width="1.2" fill="none"/>
      <g transform="rotate(-8)">${petals}</g>
      <circle r="11" fill="#8e1d3c"/><circle r="5" fill="#f2c94c"/>
    </svg>`;
  },
  amphora: `<svg viewBox="0 0 40 60" aria-hidden="true"><path d="M15 3h10v5c0 3 9 6 9 19 0 13-8 22-9 27H15c-1-5-9-14-9-27 0-13 9-16 9-19z" fill="currentColor"/><path d="M15 10c-7 0-9 7-4 11M25 10c7 0 9 7 4 11" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M8 30h24M9 36h22" stroke="var(--band)" stroke-width="1.6"/><path d="M12 33l3-3 3 3 3-3 3 3 3-3 3 3" stroke="var(--band)" stroke-width="1.2" fill="none"/></svg>`,
  owl: `<svg viewBox="0 0 40 60" aria-hidden="true"><path d="M8 14 L12 4 L17 11 Q20 10 23 11 L28 4 L32 14 Q36 22 34 36 Q32 52 20 56 Q8 52 6 36 Q4 22 8 14Z" fill="currentColor"/><circle cx="14" cy="20" r="6" fill="var(--band)"/><circle cx="26" cy="20" r="6" fill="var(--band)"/><circle cx="14" cy="20" r="2.6" fill="currentColor"/><circle cx="26" cy="20" r="2.6" fill="currentColor"/><path d="M18 26l2 4 2-4z" fill="var(--band)"/><path d="M13 36q3 2 6 0q3 2 6 0M13 42q3 2 6 0q3 2 6 0M15 48q2.5 2 5 0q2.5 2 5 0" stroke="var(--band)" stroke-width="1.3" fill="none"/></svg>`,
  olive: `<svg viewBox="0 0 120 30" aria-hidden="true"><path d="M4 18 Q60 8 116 16" stroke="#6b7a35" stroke-width="2" fill="none"/>${[14,30,46,62,78,94].map((x,i)=>`<ellipse cx="${x}" cy="${i%2?20:9}" rx="8" ry="3" transform="rotate(${i%2?18:-18} ${x} ${i%2?20:9})" fill="#7d8c3f"/>`).join("")}<circle cx="38" cy="22" r="3.2" fill="#2f3a18"/><circle cx="86" cy="8" r="3.2" fill="#2f3a18"/></svg>`,
  flag: `<svg viewBox="0 0 30 15" aria-hidden="true"><rect width="30" height="5" fill="#111"/><rect y="5" width="30" height="5" fill="#fff"/><rect y="10" width="30" height="5" fill="#149954"/><path d="M0 0L11 7.5L0 15z" fill="#e4312b"/></svg>`
};
// Greek key (meander) and tatreez cross-stitch tiles as CSS backgrounds.
const MEANDER = c => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M0 21H19V3H5V15H13V9H9' fill='none' stroke='${c}' stroke-width='2.2'/></svg>`)}")`;
const TATREEZ = (c, c2) => {
  const xs = [[8,2],[5,5],[11,5],[2,8],[14,8],[5,11],[11,11],[8,14]].map(([x,y]) => `<path d='M${x-1.6} ${y-1.6}l3.2 3.2M${x+1.6} ${y-1.6}l-3.2 3.2' stroke='${c}' stroke-width='1.2'/>`).join("");
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>${xs}<path d='M6.4 6.4l3.2 3.2M9.6 6.4l-3.2 3.2' stroke='${c2}' stroke-width='1.2'/></svg>`)}")`;
};
const GREEK_NUM = ["α΄", "β΄", "γ΄", "δ΄", "ε΄", "ϛ΄", "ζ΄"];
const VOUCHERS = [
  { id: "d1", kind: "dinner", title: "Dinner out, your pick", body: "Any restaurant you want. Order whatever, don't look at the prices.", fine: "Includes dessert. Non-negotiable." },
  { id: "s1", kind: "study", title: "Quiet-house study night", body: "Phone on silent, house on lockdown, tea and snacks delivered to your desk on a schedule.", fine: "Interruptions only for refills." },
  { id: "d2", kind: "dinner", title: "Home-cooked, you name it", body: "Pick the dish, I shop, cook, plate it and do every last dish after.", fine: "Kitchen cleanup included." },
  { id: "s2", kind: "study", title: "Flashcard quiz master", body: "I drill you on whatever you're studying for as long as you want, with zero complaining.", fine: "Correct answers earn snacks." },
  { id: "d3", kind: "dinner", title: "Takeout, any spot", body: "Your favourite takeout. I order it, pick it up and set it all out.", fine: "Movie of your choice comes with it." },
  { id: "s3", kind: "study", title: "Chore-free study day", body: "Dishes, laundry, errands: all mine for the day so you can just focus.", fine: "Ends with a back rub." },
  { id: "d4", kind: "dinner", title: "Date-night dinner", body: "Dressed up, reservation booked, I plan the whole night start to finish.", fine: "Ride there and back sorted." }
];
const KIND = { dinner: { label: "Dinner · Symposion, a Greek feast", icon: ART.amphora }, study: { label: "Study · Athena, goddess of wisdom", icon: ART.owl } };
