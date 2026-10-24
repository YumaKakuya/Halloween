// /c?hat=…&face=… (and /ja/c): the full app page, with X card tags that
// point at an image of this exact costume.
import { KEYS, esc, parse, readTemplate, siteFrom } from "./_lib.js";

const COPY = {
  en: {
    title: (n) => `${n} · Candy Costume Workshop`,
    desc: (t) => `A Halloween costume made entirely of candy. ${t.kcalText} calories (${t.level}). Build your own.`,
    alt: (n) => `${n}: a character in a Halloween costume made of candy`
  },
  ja: {
    title: (n) => `${n}｜おかし仮装工房`,
    desc: (t) => `ぜんぶお菓子でできたハロウィンの仮装。総カロリー${t.kcalText}kcal（${t.level}）。あなたも作ってみよう。`,
    alt: (n) => `お菓子でできたハロウィンの仮装をしたキャラクター「${n}」`
  }
};

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  return html.replace(re, `$1${esc(value)}$2`);
}

export function makeHandler(lang) {
  return (req, res) => render(lang, req, res);
}

export default makeHandler("en");

function render(lang, req, res) {
  const { st, c } = parse(req.url, lang);
  const site = siteFrom(req);
  const t = c.totals(st);
  const q = new URLSearchParams();
  KEYS.forEach((k) => q.set(k, st[k]));
  const pageUrl = `${site}${lang === "ja" ? "/ja" : ""}/c?${q}`;
  const imgUrl = `${site}/api/og?${q}&lang=${lang}`;
  const copy = COPY[lang];

  let html = readTemplate(lang).replaceAll("__SITE_URL__", site);
  html = setMeta(html, "property", "og:url", pageUrl);
  html = setMeta(html, "property", "og:title", copy.title(t.name));
  html = setMeta(html, "property", "og:description", copy.desc(t));
  html = setMeta(html, "property", "og:image", imgUrl);
  html = setMeta(html, "name", "twitter:title", copy.title(t.name));
  html = setMeta(html, "name", "twitter:description", copy.desc(t));
  html = setMeta(html, "name", "twitter:image", imgUrl);
  html = setMeta(html, "name", "twitter:image:alt", copy.alt(t.name));

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800");
  res.statusCode = 200;
  res.end(html);
}
