// Copies src/ to dist/ and fills in the site's own URL, so the X card image
// works on whatever domain Vercel gives the project. No dependencies.
import { cpSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const host =
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "";
const site = host ? (host.startsWith("http") ? host : `https://${host}`).replace(/\/+$/, "") : "";

rmSync("dist", { recursive: true, force: true });
cpSync("src", "dist", { recursive: true });

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) writeFileSync(p, readFileSync(p, "utf8").replaceAll("__SITE_URL__", site));
  }
}
walk("dist");

console.log(site ? `Built for ${site}` : "Built without a site URL: the X card image needs one. Set SITE_URL.");
