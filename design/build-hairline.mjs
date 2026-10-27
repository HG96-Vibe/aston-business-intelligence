/* Builds the Aston BI "Hairline ring" logo: ASTON in Libre Caslon Display with the O drawn as a
   fine Amber-leaf gold ring, a thin rule, and BUSINESS INTELLIGENCE set to the exact width of ASTON.
   All lettering is outlined, so the SVGs look the same everywhere (no web fonts needed).
   Writes the pack to design/assets/hairline/ and wires it into the site: public/brand/
   (lockup-solid.svg for light pages, lockup-solid-reversed.svg for dark), the favicon,
   the Apple touch icon and the social card.
   Run: node design/build-hairline.mjs   (needs Playwright, installed globally or locally) */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import opentype from "opentype.js";
import toIco from "to-ico";
const { chromium } = createRequire(import.meta.url)("playwright");

const OUT = "design/assets/hairline";
const PUB = "public/brand";
fs.mkdirSync(OUT, { recursive: true });

export const BRAND = {
  ink: "#17161F",
  inkOnDark: "#F3F1F7",
  // Amber leaf: lighter sheen on dark backgrounds, slightly deeper on white so a hairline still holds.
  goldOnDark: ["#FFE2A1", "#FFB93A", "#FFF0C8", "#F7A928", "#FFD27A"],
  goldOnLight: ["#FFCF6B", "#F4A51F", "#FFD98A", "#E8961A", "#FFC55A"],
  goldFlat: "#F4A51F", // single colour for print, embroidery, one-colour uses
};

const fm = "node_modules/@fontsource";
const DISPLAY = opentype.loadSync(`${fm}/libre-caslon-display/files/libre-caslon-display-latin-400-normal.woff`);
const TEXT = opentype.loadSync(`${fm}/libre-caslon-text/files/libre-caslon-text-latin-400-normal.woff`);
const MANROPE = opentype.loadSync(`${fm}/manrope/files/manrope-latin-500-normal.woff`);

function width(font, s, size, ls = 0) {
  const g = font.stringToGlyphs(s);
  let w = 0;
  g.forEach((gl, i) => {
    w += (gl.advanceWidth / font.unitsPerEm) * size;
    if (i < g.length - 1) w += (font.getKerningValue(gl, g[i + 1]) / font.unitsPerEm) * size + ls;
  });
  return w;
}
const outline = (font, s, x, y, size, ls = 0) =>
  font.getPath(s, x, y, size, { kerning: true, letterSpacing: ls / size }).toPathData(2);
const capHeight = (font, size) => {
  const bb = font.getPath("H", 0, 0, size).getBoundingBox();
  return -bb.y1;
};

// ---- Geometry (same rules as the approved board option) ---------------------
const SIZE = 62, LS = 6, RING = 2.4, PAD = 4;
const BASE = SIZE * 0.95 + 6;
const CH = capHeight(DISPLAY, SIZE);
const D = CH * 1.06;
const GAP = LS + SIZE * 0.045;
const wBefore = width(DISPLAY, "AST", SIZE, LS);
const cx = PAD + wBefore + GAP + D / 2;
const cy = BASE - CH / 2;
const xN = cx + D / 2 + GAP;
const WORD_W = xN + width(DISPLAY, "N", SIZE, LS) - PAD;
const RULE_Y = BASE + SIZE * 0.17;
const SUB_Y = BASE + SIZE * 0.42, SUB_SIZE = 10.5, SUB = "BUSINESS INTELLIGENCE";
const subNatural = width(TEXT, SUB, SUB_SIZE, 0);
const SUB_LS = (WORD_W - 2 - subNatural) / (SUB.length - 1);
const W = +(WORD_W + PAD * 2).toFixed(2), H = +(SUB_Y + 8).toFixed(2);

const P = {
  AST: outline(DISPLAY, "AST", PAD, BASE, SIZE, LS),
  N: outline(DISPLAY, "N", xN, BASE, SIZE, LS),
  SUB: outline(TEXT, SUB, PAD + 1, SUB_Y, SUB_SIZE, SUB_LS),
  // screen cut: larger subline, still spanning exactly the width of ASTON
  SUB_S: outline(TEXT, SUB, PAD + 1, SUB_Y + 1.2, 12.6, (WORD_W - 2 - width(TEXT, SUB, 12.6, 0)) / (SUB.length - 1)),
  A_MARK: outline(DISPLAY, "A", 50 - width(DISPLAY, "A", 54) / 2, 68, 54),
  A_ICON: outline(DISPLAY, "A", 50 - width(DISPLAY, "A", 60) / 2, 71, 60),
};

const svg = (vb, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`;
const gradient = (id, stops) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${stops.map((c, i) => `<stop offset="${(i / (stops.length - 1)).toFixed(3)}" stop-color="${c}"/>`).join("")}</linearGradient>`;

/* `screen` is the small-size cut used on the website: the same shapes, with hairlines thickened by a
   fine outline, a heavier ring, a darker rule and a full-strength subline, so it stays crisp at 50–70px tall.
   The default cut is the full-detail master for print and large sizes. */
function lockup({ ink, gold, id, screen = false }) {
  const paint = Array.isArray(gold) ? `url(#${id})` : gold;
  const ring = screen ? 3.8 : RING;
  const thicken = (w) => (screen ? ` stroke="${ink}" stroke-width="${w}" stroke-linejoin="round"` : "");
  return svg(`0 0 ${W} ${H}`, `${Array.isArray(gold) ? `<defs>${gradient(id, gold)}</defs>` : ""}
  <path d="${P.AST}" fill="${ink}"${thicken(1.15)}/>
  <path d="${P.N}" fill="${ink}"${thicken(1.15)}/>
  <circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${(D / 2 - ring / 2).toFixed(2)}" fill="none" stroke="${paint}" stroke-width="${ring}"/>
  <rect x="${PAD}" y="${RULE_Y.toFixed(2)}" width="${WORD_W.toFixed(2)}" height="${screen ? 1.4 : 1.2}" fill="${ink}" fill-opacity="${screen ? ".4" : ".22"}"/>
  <path d="${screen ? P.SUB_S : P.SUB}" fill="${ink}" fill-opacity="${screen ? "1" : ".8"}"${thicken(0.35)}/>`);
}
// Symbol: the hairline ring with a serif A. `icon` thickens the ring so it survives at 16–48 px.
function mark({ ink, gold, id, icon = false, tile = null }) {
  const paint = Array.isArray(gold) ? `url(#${id})` : gold;
  const sw = icon ? 7 : 3, r = icon ? 42 : 43;
  return svg("0 0 100 100", `${Array.isArray(gold) ? `<defs>${gradient(id, gold)}</defs>` : ""}
  ${tile ? `<rect width="100" height="100" rx="22" fill="${tile}"/>` : ""}
  <circle cx="50" cy="50" r="${r}" fill="none" stroke="${paint}" stroke-width="${sw}"/>
  <path d="${icon ? P.A_ICON : P.A_MARK}" fill="${ink}"/>`);
}

const v = {
  "lockup": lockup({ ink: BRAND.ink, gold: BRAND.goldOnLight, id: "hl" }),
  "lockup-reversed": lockup({ ink: BRAND.inkOnDark, gold: BRAND.goldOnDark, id: "hd" }),
  "lockup-screen": lockup({ ink: BRAND.ink, gold: BRAND.goldOnLight, id: "hsl", screen: true }),
  "lockup-screen-reversed": lockup({ ink: BRAND.inkOnDark, gold: BRAND.goldOnDark, id: "hsd", screen: true }),
  "lockup-flat": lockup({ ink: BRAND.ink, gold: BRAND.goldFlat }),
  "lockup-mono-ink": lockup({ ink: BRAND.ink, gold: BRAND.ink }),
  "lockup-mono-white": lockup({ ink: "#FFFFFF", gold: "#FFFFFF" }),
  "mark": mark({ ink: BRAND.ink, gold: BRAND.goldOnLight, id: "ml" }),
  "mark-reversed": mark({ ink: BRAND.inkOnDark, gold: BRAND.goldOnDark, id: "md" }),
  "icon": mark({ ink: BRAND.ink, gold: BRAND.goldOnLight, id: "il", icon: true, tile: "#FFFFFF" }),
  "icon-dark": mark({ ink: BRAND.inkOnDark, gold: BRAND.goldOnDark, id: "id", icon: true, tile: BRAND.ink }),
};
{
  const inner = v["lockup-reversed"].replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const scale = 560 / W, w = W * scale, h = H * scale;
  const cap = "Business intelligence  ·  Business analysis  ·  AI consulting  ·  Project delivery";
  const cw = width(MANROPE, cap, 26);
  v["social-card"] = svg("0 0 1200 630", `<defs>${gradient("sc", BRAND.goldOnDark)}</defs>
  <rect width="1200" height="630" fill="${BRAND.ink}"/>
  <g transform="translate(${(1200 - w) / 2},${190 - h / 2 + 40}) scale(${scale})">${inner}</g>
  <path d="${outline(MANROPE, cap, (1200 - cw) / 2, 470, 26)}" fill="#C9C7D2"/>
  <rect x="0" y="622" width="1200" height="8" fill="url(#sc)"/>`);
}
for (const [name, s] of Object.entries(v)) fs.writeFileSync(path.join(OUT, `${name}.svg`), s);

// ---- PNGs -----------------------------------------------------------------------
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
async function png(svgStr, w, h, file, transparent = true) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0;background:${transparent ? "transparent" : "#fff"}">${svgStr.replace("<svg ", `<svg width="${w}" height="${h}" `)}</body></html>`);
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
}
for (const name of ["lockup", "lockup-reversed", "lockup-flat"]) for (const s of [2, 4]) await png(v[name], Math.round(W * s), Math.round(H * s), path.join(OUT, `${name}@${s}x.png`));
for (const name of ["mark", "mark-reversed"]) for (const s of [2, 4]) await png(v[name], 100 * s, 100 * s, path.join(OUT, `${name}@${s}x.png`));
await png(v["social-card"], 1200, 630, path.join(OUT, "social-card.png"), false);
const fav = {};
for (const s of [16, 32, 48, 180, 512]) {
  const f = path.join(OUT, `icon-${s}.png`);
  await png(v["icon"], s, s, f, s !== 180); // Apple icon gets an opaque white tile
  fav[s] = fs.readFileSync(f);
}
fs.writeFileSync(path.join(OUT, "favicon.ico"), await toIco([fav[16], fav[32], fav[48]]));
await browser.close();

// ---- Wire into the site ------------------------------------------------------------
// The website shows the logo small, so it uses the screen cut.
fs.copyFileSync(path.join(OUT, "lockup-screen.svg"), path.join(PUB, "lockup-solid.svg"));
fs.copyFileSync(path.join(OUT, "lockup-screen-reversed.svg"), path.join(PUB, "lockup-solid-reversed.svg"));
fs.copyFileSync(path.join(OUT, "mark.svg"), path.join(PUB, "mark-solid.svg"));
fs.copyFileSync(path.join(OUT, "icon.svg"), path.join(PUB, "badge.svg"));
fs.copyFileSync(path.join(OUT, "favicon.ico"), "src/app/favicon.ico");
fs.writeFileSync("src/app/icon.svg", v["icon"]);
fs.copyFileSync(path.join(OUT, "icon-180.png"), "src/app/apple-icon.png");
fs.copyFileSync(path.join(OUT, "social-card.png"), "src/app/opengraph-image.png");
fs.writeFileSync(path.join(OUT, "brand.json"), JSON.stringify({ ...BRAND, lockupViewBox: [W, H] }, null, 2));
console.log("built", Object.keys(v).length, "svgs; lockup", W, "x", H, "ratio", (W / H).toFixed(3));
