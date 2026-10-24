// Shared helpers for the share page and the card image.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
export const KEYS = ["hat", "face", "outfit", "prop", "bg"];
export const DEFAULT = { hat: "witch", face: "vampire", outfit: "choco", prop: "cane", bg: "moon" };

let createCore;
export function core(lang) {
  if (!createCore) {
    const sandbox = {};
    vm.runInNewContext(readFileSync(join(ROOT, "src", "costume.js"), "utf8"), sandbox);
    createCore = sandbox.CandyCostumeCore;
  }
  return createCore(lang);
}

export function readTemplate(lang) {
  return lang === "ja"
    ? readFileSync(join(ROOT, "src", "ja", "index.html"), "utf8")
    : readFileSync(join(ROOT, "src", "index.html"), "utf8");
}

export function fontFiles() {
  return {
    dela: readFileSync(join(ROOT, "fonts", "DelaGothicOne-Regular.ttf")),
    zen: readFileSync(join(ROOT, "fonts", "ZenMaruGothic-Bold.ttf")),
    nunito: readFileSync(join(ROOT, "fonts", "Nunito-ExtraBold.woff2"))
  };
}

// Read lang + costume from the query, keeping only parts that exist.
export function parse(reqUrl, forceLang) {
  const url = new URL(reqUrl, "http://localhost");
  const lang = forceLang || (url.searchParams.get("lang") === "ja" ? "ja" : "en");
  const c = core(lang);
  const st = { ...DEFAULT };
  for (const k of KEYS) {
    const v = url.searchParams.get(k);
    if (v && c.item(k, v)) st[k] = v;
  }
  return { lang, st, c };
}

export function siteFrom(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const proto = req.headers["x-forwarded-proto"] || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
