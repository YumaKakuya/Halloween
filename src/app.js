"use strict";
(function () {
  const LANG = (document.documentElement.lang || "en").startsWith("ja") ? "ja" : "en";
  const { PARTS, STR, item, tr, totals, renderCard } = window.CandyCostumeCore(LANG);

  const cv = document.getElementById("stage");
  if (!cv) return;
  const stageCtx = cv.getContext("2d");
  const state = { hat: "witch", face: "vampire", outfit: "choco", prop: "cane", bg: "moon" };

  // Restore a shared costume from the link (?hat=…&face=…)
  const params = new URLSearchParams(location.search);
  Object.keys(PARTS).forEach((cat) => { const v = params.get(cat); if (v && item(cat, v)) state[cat] = v; });

  const groupsEl = document.getElementById("groups");
  Object.entries(PARTS).forEach(([cat, def]) => {
    const g = document.createElement("div"); g.className = "group";
    const h = document.createElement("h2"); h.textContent = tr(def.label);
    const chips = document.createElement("div"); chips.className = "chips"; chips.setAttribute("role", "group"); chips.setAttribute("aria-label", tr(def.label));
    def.items.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.id = `chip-${cat}-${it.id}`; b.dataset.cat = cat; b.dataset.id = it.id;
      const sw = document.createElement("span"); sw.className = "sw" + (it.sw === "transparent" ? " sw-none" : ""); if (it.sw !== "transparent") sw.style.background = it.sw;
      const nm = document.createElement("span"); nm.textContent = tr(it.name);
      b.append(sw, nm);
      if (it.kcal) { const sm = document.createElement("small"); sm.textContent = it.kcal; b.append(sm); }
      b.addEventListener("click", () => { state[cat] = it.id; update(); });
      chips.appendChild(b);
    });
    g.append(h, chips); groupsEl.appendChild(g);
  });

  function query() { return new URLSearchParams(state).toString(); }
  function shareURL() { return `${location.origin}${LANG === "ja" ? "/ja" : ""}/c?${query()}`; }

  function update() {
    const t = renderCard(stageCtx, state);
    document.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", String(state[b.dataset.cat] === b.dataset.id)));
    document.getElementById("name").textContent = t.name;
    const mats = ["hat", "face", "outfit", "prop"].map((c) => item(c, state[c])).filter((i) => i.id !== "none").map((i) => tr(i.name));
    document.getElementById("items").textContent = mats.join(STR.sep);
    document.getElementById("kcal").textContent = t.kcalText;
    document.getElementById("unit").textContent = STR.unit;
    document.getElementById("level").textContent = t.level;
    document.getElementById("meter").style.width = Math.min(100, t.kcal / 2000 * 100) + "%";
    try { history.replaceState(null, "", `?${query()}`); } catch (e) { /* ignore */ }
  }

  document.getElementById("random").addEventListener("click", () => {
    Object.keys(PARTS).forEach((cat) => {
      const items = PARTS[cat].items; let pick;
      do { pick = items[Math.floor(Math.random() * items.length)].id; } while (pick === state[cat] && Math.random() < .7);
      state[cat] = pick;
    });
    update();
  });

  /* ---------- save & share ---------- */
  function canvasBlob() {
    const bin = atob(cv.toDataURL("image/png").split(",")[1]);
    const u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return new Blob([u], { type: "image/png" });
  }
  function fileName() { return `${STR.file}-${state.outfit}-${state.face}.png`; }
  function isMobile() { return window.matchMedia("(pointer: coarse)").matches; }
  function canShareFile(file) { try { return !!(navigator.canShare && navigator.canShare({ files: [file] })); } catch (e) { return false; } }

  function download(blob) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = fileName();
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }

  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 3800);
  }

  document.getElementById("save").addEventListener("click", () => {
    const blob = canvasBlob();
    const file = new File([blob], fileName(), { type: "image/png" });
    if (isMobile() && canShareFile(file)) {
      // iOS / Android share sheet offers "Save Image"
      navigator.share({ files: [file] }).catch((e) => { if (e && e.name !== "AbortError") { download(blob); toast(STR.saved); } });
      return;
    }
    download(blob); toast(STR.saved);
  });

  document.getElementById("share").addEventListener("click", () => {
    // The /c link shows this exact costume as the X card image, so nothing needs attaching.
    const t = totals(state), text = STR.share(t);
    const intent = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareURL())}`;
    // No "noopener" feature here: with it, window.open always returns null.
    const win = window.open(intent, "_blank");
    if (win) { try { win.opener = null; } catch (e) { /* ignore */ } }
    else location.href = intent;
  });

  update();
  if (document.fonts && document.fonts.load) {
    const sample = totals(state).name + " " + STR.unit + " 0123456789";
    Promise.all([document.fonts.load(`20px ${STR.nameFont}`, sample), document.fonts.load(STR.kcalFont, sample)])
      .then(update).catch(() => {});
  }
})();
