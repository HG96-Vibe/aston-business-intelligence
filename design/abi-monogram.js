/* ABi monogram — shared geometry for all treatments.
   Canvas 120 x 100. The A's right leg is the B's spine (as in the original mark).
   Exports window.ABI = { shapes, svg(treatment, opts) } */
(function () {
  // A outer triangle, gap (paper), inner counter triangle
  const A_OUTER = "M38 4 L0 92 H76 Z";
  const A_GAP   = "M38 34 L18 92 H58 Z";
  const A_INNER = "M38 48 L27 92 H49 Z";
  // B: left edge is the A's outer right leg; two bowls, baseline 92
  const B_BODY  = "M45.5 14 H64 A19 19 0 0 1 64 52 H70 A20 20 0 0 1 70 92 H79.5 Z";
  const B_CTR_U = "M53 26 H62 A7 7 0 0 1 62 40 H59 Z";
  const B_CTR_L = "M66.5 60 H70 A11 11 0 0 1 70 82 H76 Z";
  // i: stem + dot
  const I_STEM  = "M96 36 H110 V92 H96 Z";
  const I_DOT   = { cx: 103, cy: 18, r: 8 };
  // Chamfered (tech) B: 45° corners instead of round bowls
  const B_TECH  = "M45.5 14 H72 L84 26 V40 L74 52 L88 62 V80 L76 92 H79.5 Z";
  const B_TECH_U= "M53 26 H68 L72 30 V36 L68 40 H59 Z";
  const B_TECH_L= "M66.5 60 H74 L78 64 V78 L74 82 H76 Z";

  function defs(id, g) {
    return `<defs>
      <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${g.light}"/><stop offset=".5" stop-color="${g.mid}"/><stop offset="1" stop-color="${g.deep}"/>
      </linearGradient>
      <linearGradient id="${id}-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <filter id="${id}-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>`;
  }

  /* treatment: solid | metallic | outline | tech | badge
     opts: { ink, gold:{light,mid,deep}, paper, id } */
  function mark(t, o) {
    const id = o.id || "m";
    const G = t === "metallic" ? `url(#${id}-gold)` : o.gold.mid;
    const monogram = (bodyB, ctrU, ctrL, fillGold, fillInk, paper) => `
      <path d="${A_OUTER}" fill="${fillGold}"/>
      <path d="${A_GAP}" fill="${paper}"/>
      <path d="${A_INNER}" fill="${fillInk}"/>
      <path d="${bodyB}" fill="${fillGold}"/>
      <path d="${ctrU}" fill="${paper}"/>
      <path d="${ctrL}" fill="${paper}"/>
      <path d="${I_STEM}" fill="${fillInk}"/>
      <circle cx="${I_DOT.cx}" cy="${I_DOT.cy}" r="${I_DOT.r}" fill="${fillGold}"/>`;

    if (t === "solid")
      return `<svg viewBox="-4 0 118 96" xmlns="http://www.w3.org/2000/svg">${monogram(B_BODY, B_CTR_U, B_CTR_L, o.gold.mid, o.ink, o.paper)}</svg>`;

    if (t === "metallic")
      return `<svg viewBox="-4 0 118 96" xmlns="http://www.w3.org/2000/svg">${defs(id, o.gold)}
        ${monogram(B_BODY, B_CTR_U, B_CTR_L, G, o.ink, o.paper)}
        <path d="${A_OUTER}" fill="url(#${id}-sheen)" opacity=".5"/>
        <path d="${B_BODY}" fill="url(#${id}-sheen)" opacity=".4"/></svg>`;

    if (t === "tech")
      return `<svg viewBox="-4 0 118 96" xmlns="http://www.w3.org/2000/svg">
        ${monogram(B_TECH, B_TECH_U, B_TECH_L, o.gold.mid, o.ink, o.paper)}
        <rect x="96" y="36" width="14" height="3" fill="${o.gold.light}" opacity=".9"/></svg>`;

    if (t === "outline")
      return `<svg viewBox="-6 -4 124 104" xmlns="http://www.w3.org/2000/svg">${defs(id, o.gold)}
        <g fill="none" stroke="${o.gold.mid}" stroke-width="3" stroke-linejoin="round">
          <path d="${A_OUTER}"/><path d="${A_GAP}"/><path d="${B_BODY}"/><path d="${B_CTR_U}"/><path d="${B_CTR_L}"/>
        </g>
        <path d="${A_INNER}" fill="${o.ink}"/>
        <path d="${I_STEM}" fill="none" stroke="${o.ink}" stroke-width="3"/>
        <circle cx="${I_DOT.cx}" cy="${I_DOT.cy}" r="${I_DOT.r}" fill="${o.gold.light}" filter="url(#${id}-glow)"/></svg>`;

    if (t === "badge")
      return `<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">${defs(id, o.gold)}
        <rect width="140" height="140" rx="30" fill="${o.tile || o.ink}"/>
        <g transform="translate(14,22) scale(0.95)">${monogram(B_BODY, B_CTR_U, B_CTR_L, `url(#${id}-gold)`, o.tileInk || "#ffffff", o.tile || o.ink)}</g></svg>`;
  }

  function lockup(t, o) {
    const id = o.id || "l";
    const m = mark(t === "badge" ? "solid" : t, { ...o, id });
    const inner = m.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
    const vb = t === "outline" ? "-6 -4 124 104" : "-4 0 118 96";
    return `<svg viewBox="0 0 560 100" xmlns="http://www.w3.org/2000/svg">
      <svg x="0" y="2" width="118" height="96" viewBox="${vb}">${inner}</svg>
      <text x="138" y="47" font-family="Manrope, sans-serif" font-weight="800" font-size="36" letter-spacing="-0.5" fill="${o.ink}">Aston Business</text>
      <text x="138" y="84" font-family="Manrope, sans-serif" font-weight="500" font-size="30" letter-spacing="4" fill="${o.wordGold || o.gold.mid}">INTELLIGENCE</text>
    </svg>`;
  }

  window.ABI = { mark, lockup };
})();
