// /api/og?hat=…&face=…&lang=en — a 1200×630 PNG of this costume for the X card.
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { fontFiles, parse } from "./_lib.js";

let fontsReady = false;
function loadFonts() {
  if (fontsReady) return;
  const f = fontFiles();
  GlobalFonts.register(f.dela, "Dela Gothic One");
  GlobalFonts.register(f.zen, "Zen Maru Gothic");
  GlobalFonts.register(f.nunito, "Nunito");
  fontsReady = true;
}

const COPY = {
  en: { eyebrow: "MY HALLOWEEN COSTUME", site: "Candy Costume Workshop", cta: "Make yours at", unit: "calories", body: '800 30px "Nunito"', small: '800 24px "Nunito"' },
  ja: { eyebrow: "私のハロウィン仮装", site: "おかし仮装工房", cta: "あなたも作ろう", unit: "kcal", body: '700 30px "Zen Maru Gothic"', small: '700 24px "Zen Maru Gothic"' }
};

function wrapName(ctx, name, maxW, lang) {
  // English wraps on spaces; Japanese splits after 「な」「の」 when it has to.
  for (let size = 92; size >= 48; size -= 4) {
    ctx.font = `${size}px "Dela Gothic One"`;
    if (ctx.measureText(name).width <= maxW) return { size, lines: [name] };
    let parts;
    if (lang === "ja") {
      const i = Math.max(name.lastIndexOf("な", name.length - 2), name.lastIndexOf("の", name.length - 2));
      parts = i > 0 ? [name.slice(0, i + 1), name.slice(i + 1)] : null;
    } else {
      const sp = name.trim().indexOf(" ");
      parts = sp > 0 ? [name.slice(0, sp), name.slice(sp + 1)] : null;
    }
    if (parts && parts.every((p) => ctx.measureText(p).width <= maxW)) return { size, lines: parts };
  }
  ctx.font = '48px "Dela Gothic One"';
  return { size: 48, lines: [name] };
}

export function renderOg(lang, st, c, host) {
  loadFonts();
  const copy = COPY[lang];
  const W = 1200, H = 630;
  const cv = createCanvas(W, H);
  const x = cv.getContext("2d");
  const h = c.helpers;

  // night sky
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#170d2e"); g.addColorStop(1, "#3d2262");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  h.setCtx(x);
  const r = h.rng(29);
  for (let i = 0; i < 80; i++) h.circle(r() * 640, r() * 600, .7 + r() * 1.5, `rgba(255,244,214,${.3 + r() * .5})`);
  h.bat(560, 92, 1.2, "#120a20"); h.bat(600, 66, .8, "#120a20");

  // the costume card itself, exactly as the app draws it
  const card = createCanvas(800, 880);
  const t = c.renderCard(card.getContext("2d"), st);
  const ch = 560, cw = ch * 800 / 880, cx = W - cw - 46, cy = (H - ch) / 2;
  x.save();
  x.shadowColor = "rgba(0,0,0,.45)"; x.shadowBlur = 40; x.shadowOffsetY = 14;
  h.setCtx(x); h.rr(cx, cy, cw, ch, 28); x.fillStyle = "#2a1c42"; x.fill();
  x.restore();
  x.save(); h.rr(cx, cy, cw, ch, 28); x.clip(); x.drawImage(card, cx, cy, cw, ch); x.restore();
  x.save(); h.rr(cx - 3, cy - 3, cw + 6, ch + 6, 31); x.lineWidth = 6; x.strokeStyle = "#4a3566"; x.stroke(); x.restore();

  // text column
  const L = 70, maxW = cx - L - 50;
  x.textAlign = "left"; x.textBaseline = "alphabetic";
  x.font = copy.small; x.fillStyle = "#ffb347";
  x.fillText(copy.eyebrow, L, 132);

  const nm = wrapName(x, t.name, maxW, lang);
  const lh = nm.size * 1.12;
  let y = 132 + 30 + nm.size;
  nm.lines.forEach((line) => {
    x.font = `${nm.size}px "Dela Gothic One"`;
    x.fillStyle = "#ff6f91"; x.fillText(line, L + 5, y + 5);
    x.fillStyle = "#fff3e6"; x.fillText(line, L, y);
    y += lh;
  });

  y += 14;
  x.font = `42px "Dela Gothic One"`; x.fillStyle = "#ffb347";
  const kc = `${t.kcalText} ${copy.unit}`;
  x.fillText(kc, L, y);
  const kw = x.measureText(kc).width;
  x.font = copy.body; x.fillStyle = "#ff6f91";
  x.fillText(t.level, L + kw + 18, y - 2);

  // footer
  x.font = copy.small; x.fillStyle = "#c4b0d6";
  x.fillText(copy.cta, L, H - 98);
  x.font = '30px "Dela Gothic One"'; x.fillStyle = "#fff3e6";
  x.fillText(host, L, H - 56);

  return cv.toBuffer("image/png");
}

export default function handler(req, res) {
  const { lang, st, c } = parse(req.url);
  const host = (req.headers["x-forwarded-host"] || req.headers.host || "candy-costume-site.vercel.app").replace(/:\d+$/, "");
  const png = renderOg(lang, st, c, host);
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=31536000, immutable");
  res.statusCode = 200;
  res.end(png);
}
