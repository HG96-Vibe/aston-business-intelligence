/* Builds the final Aston BI logo pack into design/assets/ and the site's public/ folder.
   Run: node design/build-assets.mjs */
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import { chromium } from "playwright";
import toIco from "to-ico";

const OUT = "design/assets";
const PUB = "public/brand";
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(PUB, { recursive: true });

// ---- Brand constants (locked) --------------------------------------------
export const BRAND = {
  ink: "#17161F",
  paper: "#FFFFFF",
  gold: "#E9B324",
  goldDeep: "#B47A06",
  goldLight: "#FFE58A",
  goldOnDark: "#FFC93C",
  goldWordOnLight: "#C98A06",
};

// ---- Geometry (120 x 100 grid) -------------------------------------------
const A_OUTER = "M38 4 L0 92 H76 Z";
const A_GAP   = "M38 34 L18 92 H58 Z";
const A_INNER = "M38 48 L27 92 H49 Z";
const B_BODY  = "M45.5 14 H64 A19 19 0 0 1 64 52 H70 A20 20 0 0 1 70 92 H79.5 Z";
const B_CTR_U = "M53 26 H62 A7 7 0 0 1 62 40 H59 Z";
const B_CTR_L = "M66.5 60 H70 A11 11 0 0 1 70 82 H76 Z";
const I_STEM  = "M96 36 H110 V92 H96 Z";
const I_DOT   = "M111 18 A8 8 0 1 1 95 18 A8 8 0 1 1 111 18 Z";

function gradDefs(id, light, mid, deep) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset=".5" stop-color="${mid}"/><stop offset="1" stop-color="${deep}"/></linearGradient>
  <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
}

/* monogram group; `gold` may be a colour or url(#id). Counters are cut with evenodd so the
   mark is transparent where it should be (no paper-coloured fills). */
function monogram({ gold, ink, metallic = false, id = "g" }) {
  return `<g>
    <path fill-rule="evenodd" d="${A_OUTER} ${A_GAP}" fill="${gold}"/>
    <path d="${A_INNER}" fill="${ink}"/>
    <path fill-rule="evenodd" d="${B_BODY} ${B_CTR_U} ${B_CTR_L}" fill="${gold}"/>
    <path d="${I_STEM}" fill="${ink}"/>
    <path d="${I_DOT}" fill="${gold}"/>
    ${metallic ? `<path fill-rule="evenodd" d="${A_OUTER} ${A_GAP}" fill="url(#${id}s)" opacity=".55"/><path fill-rule="evenodd" d="${B_BODY} ${B_CTR_U} ${B_CTR_L}" fill="url(#${id}s)" opacity=".45"/>` : ""}
  </g>`;
}

// ---- Wordmark as outlines -----------------------------------------------
const f800 = opentype.loadSync("node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff");
const f500 = opentype.loadSync("node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff");
function textPath(font, text, x, y, size, letterSpacing = 0) {
  const p = font.getPath(text, x, y, size, { letterSpacing: letterSpacing / size, kerning: true });
  return p.toPathData(2);
}
function textWidth(font, text, size, letterSpacing = 0) {
  return font.getAdvanceWidth(text, size, { letterSpacing: letterSpacing / size, kerning: true });
}

const svg = (vb, body, w, h) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${w ? ` width="${w}" height="${h}"` : ""}>${body}</svg>`;

// ---- Variants --------------------------------------------------------------
const MARK_VB = "-4 0 118 96";
const variants = {};

variants["mark-solid"] = svg(MARK_VB, monogram({ gold: BRAND.gold, ink: BRAND.ink }));
variants["mark-solid-reversed"] = svg(MARK_VB, monogram({ gold: BRAND.goldOnDark, ink: BRAND.paper }));
variants["mark-metallic"] = svg(MARK_VB, gradDefs("mg", BRAND.goldLight, BRAND.gold, BRAND.goldDeep) + monogram({ gold: "url(#mg)", ink: BRAND.ink, metallic: true, id: "mg" }));
variants["mark-mono-ink"] = svg(MARK_VB, monogram({ gold: BRAND.ink, ink: BRAND.ink }));
variants["mark-mono-white"] = svg(MARK_VB, monogram({ gold: BRAND.paper, ink: BRAND.paper }));

// Badge: 512 grid, tile radius 22%
function badge({ tile, gold, ink, metallic, id }) {
  const defs = metallic ? gradDefs(id, BRAND.goldLight, BRAND.gold, BRAND.goldDeep) : "";
  return svg("0 0 512 512", `${defs}<rect width="512" height="512" rx="112" fill="${tile}"/>
    <g transform="translate(64,88) scale(3.35)">${monogram({ gold: metallic ? `url(#${id})` : gold, ink, metallic, id })}</g>`);
}
variants["badge"] = badge({ tile: BRAND.ink, ink: BRAND.paper, metallic: true, id: "bg" });
variants["badge-flat"] = badge({ tile: BRAND.ink, gold: BRAND.goldOnDark, ink: BRAND.paper });
variants["badge-white"] = badge({ tile: BRAND.paper, ink: BRAND.ink, metallic: true, id: "bw" });

// Horizontal lockup: mark + "Aston Business" / "INTELLIGENCE"
function lockup({ gold, ink, wordGold, metallic = false, id = "lg" }) {
  const t1 = textPath(f800, "Aston Business", 138, 47, 36, -0.5);
  const t2 = textPath(f500, "INTELLIGENCE", 138, 84, 30, 4);
  const w = Math.max(textWidth(f800, "Aston Business", 36, -0.5), textWidth(f500, "INTELLIGENCE", 30, 4)) + 138 + 2;
  const defs = metallic ? gradDefs(id, BRAND.goldLight, BRAND.gold, BRAND.goldDeep) : "";
  const body = `${defs}<svg x="0" y="2" width="118" height="96" viewBox="${MARK_VB}">${monogram({ gold: metallic ? `url(#${id})` : gold, ink, metallic, id })}</svg>
    <path d="${t1}" fill="${ink}"/><path d="${t2}" fill="${wordGold}"/>`;
  return { svg: svg(`0 0 ${Math.ceil(w)} 100`, body), w: Math.ceil(w) };
}
const lk = lockup({ gold: BRAND.gold, ink: BRAND.ink, wordGold: BRAND.goldWordOnLight });
variants["lockup-solid"] = lk.svg;
variants["lockup-solid-reversed"] = lockup({ gold: BRAND.goldOnDark, ink: BRAND.paper, wordGold: BRAND.goldOnDark }).svg;
variants["lockup-metallic"] = lockup({ ink: BRAND.ink, wordGold: BRAND.goldWordOnLight, metallic: true, id: "lm" }).svg;
variants["lockup-mono-ink"] = lockup({ gold: BRAND.ink, ink: BRAND.ink, wordGold: BRAND.ink }).svg;
variants["lockup-mono-white"] = lockup({ gold: BRAND.paper, ink: BRAND.paper, wordGold: BRAND.paper }).svg;

// Stacked lockup (centred) for social / square uses
function stacked({ gold, ink, wordGold, metallic = false, id = "sg" }) {
  const W = 420;
  const w1 = textWidth(f800, "Aston Business", 40, -0.5), w2 = textWidth(f500, "INTELLIGENCE", 30, 5);
  const t1 = textPath(f800, "Aston Business", (W - w1) / 2, 200, 40, -0.5);
  const t2 = textPath(f500, "INTELLIGENCE", (W - w2) / 2, 240, 30, 5);
  const defs = metallic ? gradDefs(id, BRAND.goldLight, BRAND.gold, BRAND.goldDeep) : "";
  return svg(`0 0 ${W} 260`, `${defs}<svg x="${(W - 150) / 2}" y="10" width="150" height="122" viewBox="${MARK_VB}">${monogram({ gold: metallic ? `url(#${id})` : gold, ink, metallic, id })}</svg>
    <path d="${t1}" fill="${ink}"/><path d="${t2}" fill="${wordGold}"/>`);
}
variants["stacked-solid"] = stacked({ gold: BRAND.gold, ink: BRAND.ink, wordGold: BRAND.goldWordOnLight });
variants["stacked-solid-reversed"] = stacked({ gold: BRAND.goldOnDark, ink: BRAND.paper, wordGold: BRAND.goldOnDark });

// Social card 1200x630: ink background, metallic stacked lockup
variants["social-card"] = svg("0 0 1200 630", `${gradDefs("sc", BRAND.goldLight, BRAND.gold, BRAND.goldDeep)}
  <rect width="1200" height="630" fill="${BRAND.ink}"/>
  <rect x="0" y="622" width="1200" height="8" fill="url(#sc)"/>
  <g transform="translate(390,150)">${stacked({ ink: BRAND.paper, wordGold: BRAND.goldOnDark, metallic: true, id: "sc2" }).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>
  <text x="600" y="470" text-anchor="middle" font-family="Manrope, sans-serif" font-size="26" fill="#C9C7D2">Business intelligence · Business analysis · AI consulting · Project delivery</text>`, 1200, 630);
// outline that caption too
{
  const cap = "Business intelligence  ·  Business analysis  ·  AI consulting  ·  Project delivery";
  const cw = textWidth(f500, cap, 26, 0);
  variants["social-card"] = variants["social-card"].replace(/<text[\s\S]*?<\/text>/, `<path d="${textPath(f500, cap, (1200 - cw) / 2, 470, 26)}" fill="#C9C7D2"/>`);
}

// ---- Write SVGs -------------------------------------------------------------
for (const [name, s] of Object.entries(variants)) fs.writeFileSync(path.join(OUT, `${name}.svg`), s);

// ---- Rasterise ----------------------------------------------------------------
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
async function png(svgStr, w, h, file, transparent = true) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0;background:${transparent ? "transparent" : "#fff"}">${svgStr.replace("<svg ", `<svg width="${w}" height="${h}" `)}</body></html>`);
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
}
const rasters = [
  ["lockup-solid", 560, 100], ["lockup-solid-reversed", 560, 100], ["lockup-metallic", 560, 100],
  ["stacked-solid", 420, 260], ["stacked-solid-reversed", 420, 260],
  ["mark-solid", 118, 96], ["mark-solid-reversed", 118, 96], ["mark-metallic", 118, 96],
  ["badge", 512, 512], ["badge-flat", 512, 512], ["badge-white", 512, 512],
];
for (const [name, w, h] of rasters) {
  // lockups use their true width
  const m = variants[name].match(/viewBox="0 0 (\d+) (\d+)"/);
  const W = m ? +m[1] : w, H = m ? +m[2] : h;
  for (const scale of [1, 2, 4]) {
    await png(variants[name], Math.round(W * scale), Math.round(H * scale), path.join(OUT, `${name}@${scale}x.png`));
  }
}
await png(variants["social-card"], 1200, 630, path.join(OUT, "social-card.png"), false);

// Favicons from the badge
const favSizes = [16, 32, 48, 180, 192, 512];
const favBufs = {};
for (const s of favSizes) {
  const f = path.join(OUT, `favicon-${s}.png`);
  await png(variants["badge"], s, s, f);
  favBufs[s] = fs.readFileSync(f);
}
fs.writeFileSync(path.join(OUT, "favicon.ico"), await toIco([favBufs[16], favBufs[32], favBufs[48]]));
await browser.close();

// ---- Copy what the site needs -------------------------------------------------
fs.copyFileSync(path.join(OUT, "favicon.ico"), "src/app/favicon.ico");
fs.writeFileSync("src/app/icon.svg", variants["badge"]);
fs.copyFileSync(path.join(OUT, "favicon-180.png"), "src/app/apple-icon.png");
fs.copyFileSync(path.join(OUT, "social-card.png"), "src/app/opengraph-image.png");
for (const n of ["lockup-solid", "lockup-solid-reversed", "mark-solid", "mark-metallic", "badge"]) fs.copyFileSync(path.join(OUT, `${n}.svg`), path.join(PUB, `${n}.svg`));
fs.writeFileSync(path.join(OUT, "brand.json"), JSON.stringify(BRAND, null, 2));
console.log("built", Object.keys(variants).length, "svgs;", fs.readdirSync(OUT).length, "files in", OUT);
