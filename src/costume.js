/* Candy Costume Workshop: drawing core shared by the browser app and the
   share-card image function. Defines globalThis.CandyCostumeCore(lang). */
(function (root) {
  "use strict";
  function createCore(LANG) {
    const tr = (v) => (v && typeof v === "object" ? v[LANG] : v);

    /* ---------- parts ---------- */
    const PARTS = {
      hat: { label: { ja: "帽子", en: "Hat" }, items: [
        { id: "witch",   name: { ja: "板チョコの魔女帽子", en: "Chocolate Witch Hat" }, kcal: 420, sw: "#4a2a18" },
        { id: "corn",    name: { ja: "キャンディコーン帽", en: "Candy Corn Cap" },      kcal: 140, sw: "#ff9a1f" },
        { id: "cupcake", name: { ja: "カップケーキ帽",     en: "Cupcake Hat" },         kcal: 380, sw: "#ff9ec4" },
        { id: "donut",   name: { ja: "ドーナツの輪っか",   en: "Donut Halo" },          kcal: 290, sw: "#d9984c" },
        { id: "none",    name: { ja: "なし",               en: "None" },                kcal: 0,   sw: "transparent" }
      ]},
      face: { label: { ja: "顔", en: "Face" }, items: [
        { id: "vampire", name: { ja: "グミの牙", en: "Gummy Fangs" },                         role: { ja: "吸血鬼", en: "Vampire" },          kcal: 90,  sw: "#eb2850" },
        { id: "pumpkin", name: { ja: "かぼちゃキャンディの仮面", en: "Pumpkin Candy Mask" },  role: { ja: "かぼちゃ大王", en: "Pumpkin King" }, kcal: 160, sw: "#ff8a1f" },
        { id: "mummy",   name: { ja: "マシュマロ包帯", en: "Marshmallow Wraps" },             role: { ja: "ミイラ", en: "Mummy" },            kcal: 230, sw: "#fffaf4" },
        { id: "cat",     name: { ja: "チョコ耳とグミのヒゲ", en: "Choco Ears & Gummy Whiskers" }, role: { ja: "黒猫", en: "Black Cat" },    kcal: 180, sw: "#2a1a14" },
        { id: "ghost",   name: { ja: "綿あめのシーツ", en: "Cotton Candy Sheet" },            role: { ja: "おばけ", en: "Ghost" },            kcal: 110, sw: "#ffd3e8" }
      ]},
      outfit: { label: { ja: "服", en: "Outfit" }, items: [
        { id: "choco", name: { ja: "板チョコのマント", en: "Chocolate Bar Cape" },         adj: { ja: "ビターな", en: "Bittersweet " }, kcal: 560, sw: "#7a4a2c", sleeve: "#7a4a2c" },
        { id: "lolli", name: { ja: "ペロペロキャンディのローブ", en: "Lollipop Robe" },     adj: { ja: "ぐるぐるの", en: "Swirly " },    kcal: 300, sw: "#ff9ec4", sleeve: "#ff9ec4" },
        { id: "wafer", name: { ja: "ウエハースの鎧", en: "Wafer Armor" },                  adj: { ja: "サクサクの", en: "Crunchy " },   kcal: 450, sw: "#e8b86d", sleeve: "#e8b86d" },
        { id: "bean",  name: { ja: "ジェリービーンズのドレス", en: "Jelly Bean Dress" },    adj: { ja: "つやつやの", en: "Glossy " },    kcal: 340, sw: "#7b5cd6", sleeve: "#7b5cd6" }
      ]},
      prop: { label: { ja: "小物", en: "Prop" }, items: [
        { id: "cane",   name: { ja: "キャンディケインの杖", en: "Candy Cane Staff" }, kcal: 150, sw: "#e8263f" },
        { id: "lolli",  name: { ja: "ジャンボロリポップ",   en: "Giant Lollipop" },   kcal: 220, sw: "#ffd23f" },
        { id: "churro", name: { ja: "チュロスのほうき",     en: "Churro Broom" },     kcal: 380, sw: "#d99a4f" },
        { id: "cookie", name: { ja: "クッキーの盾",         en: "Cookie Shield" },    kcal: 480, sw: "#d8a25c" },
        { id: "none",   name: { ja: "なし",                 en: "None" },             kcal: 0,   sw: "transparent" }
      ]},
      bg: { label: { ja: "背景", en: "Background" }, items: [
        { id: "moon", name: { ja: "満月の夜",   en: "Full Moon Night" },   kcal: 0, sw: "#2b1850" },
        { id: "dusk", name: { ja: "夕焼けの丘", en: "Sunset Hill" },       kcal: 0, sw: "#ff7a6b" },
        { id: "mist", name: { ja: "綿あめの霧", en: "Cotton Candy Mist" }, kcal: 0, sw: "#a9c6e6" }
      ]}
    };

    const STR = {
      ja: {
        levels: ["ひとくちサイズ", "おやつ規模", "パーティー級", "胸やけ注意"],
        share: (t) => `私のハロウィン仮装は「${t.name}」🎃\n総カロリー ${t.kcalText}kcal（${t.level}）\n#おかし仮装工房 #ハロウィン`,
        saved: "画像を保存しました",
        file: "okashi-kaso",
        locale: "ja-JP",
        unit: "kcal",
        sep: "・",
        nameFont: '"Dela Gothic One","Hiragino Sans","Yu Gothic",sans-serif',
        kcalFont: '700 13px "Zen Maru Gothic","Hiragino Maru Gothic ProN",sans-serif'
      },
      en: {
        levels: ["Bite-size", "Snack-size", "Party-size", "Sugar overload"],
        share: (t) => `My Halloween costume: the ${t.name} 🎃\n${t.kcalText} calories (${t.level})\n#CandyCostumeWorkshop #Halloween`,
        saved: "Image saved",
        file: "candy-costume",
        locale: "en-US",
        unit: "cal",
        sep: " · ",
        nameFont: '"Dela Gothic One","Arial Black",sans-serif',
        kcalFont: '800 13px "Nunito","Trebuchet MS",sans-serif'
      }
    }[LANG];

    const item = (cat, id) => PARTS[cat].items.find((i) => i.id === id);

    /* ---------- drawing helpers (400 x 440 logical units) ---------- */
    let ctx = null;
    const SKIN = "#f7d6b5";
    const SPRINK = ["#ff6f91", "#ffd23f", "#7fe0c4", "#fff3e6", "#9b7bff"];
    const TAU = Math.PI * 2;

    function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
    function circle(x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
    function ell(x, y, rx, ry, rot, fill) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot || 0, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function line(x1, y1, x2, y2, c, w) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = "round"; ctx.stroke(); }
    function tri(a, b, c, fill) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
    function spiral(cx, cy, maxR, turns, color, w) {
      ctx.beginPath(); const end = turns * TAU;
      for (let t = 0; t <= end; t += 0.12) { const r = maxR * t / end; const x = cx + Math.cos(t) * r, y = cy + Math.sin(t) * r; t ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = "round"; ctx.stroke();
    }
    function sprinkles(seed, n, x0, y0, w, h, colors, len) {
      const r = rng(seed);
      for (let i = 0; i < n; i++) {
        const x = x0 + r() * w, y = y0 + r() * h, a = r() * Math.PI, l = len || 5;
        line(x - Math.cos(a) * l / 2, y - Math.sin(a) * l / 2, x + Math.cos(a) * l / 2, y + Math.sin(a) * l / 2, colors[i % colors.length], 2.6);
      }
    }
    function bat(x, y, s, c) {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath();
      ctx.moveTo(0, 0); ctx.quadraticCurveTo(-8, -10, -22, -4); ctx.quadraticCurveTo(-16, -2, -14, 4);
      ctx.quadraticCurveTo(-9, 0, -6, 5); ctx.quadraticCurveTo(-3, 2, 0, 6); ctx.quadraticCurveTo(3, 2, 6, 5);
      ctx.quadraticCurveTo(9, 0, 14, 4); ctx.quadraticCurveTo(16, -2, 22, -4); ctx.quadraticCurveTo(8, -10, 0, 0);
      ctx.fillStyle = c; ctx.fill(); ctx.restore();
    }
    function cloud(x, y, s, c) { [[0, 0, 18], [18, -8, 20], [38, 0, 16], [20, 6, 16]].forEach(([dx, dy, r]) => circle(x + dx * s, y + dy * s, r * s, c)); }
    function pumpkin(x, y, s) {
      ["#e86d12", "#ff8a1f", "#e86d12"].forEach((c, i) => ell(x + (i - 1) * 9 * s, y, 11 * s, 13 * s, 0, c));
      ell(x, y, 9 * s, 13 * s, 0, "#ff9a33");
      rr(x - 2 * s, y - 18 * s, 4 * s, 7 * s, 2 * s); ctx.fillStyle = "#4f8a3a"; ctx.fill();
    }

    /* ---------- scene ---------- */
    const BG = {
      moon() {
        const g = ctx.createLinearGradient(0, 0, 0, 400); g.addColorStop(0, "#170d2e"); g.addColorStop(1, "#3b2160");
        ctx.fillStyle = g; ctx.fillRect(0, 0, 400, 400);
        const r = rng(11); for (let i = 0; i < 40; i++) circle(r() * 400, r() * 300, .6 + r() * 1.4, `rgba(255,244,214,${.4 + r() * .6})`);
        circle(322, 78, 56, "rgba(255,241,193,.10)"); circle(322, 78, 36, "#fff1c1");
        circle(310, 70, 6, "#f2dfa4"); circle(332, 92, 4, "#f2dfa4"); circle(334, 64, 3, "#f2dfa4");
        bat(70, 96, 1, "#120a20"); bat(108, 72, .7, "#120a20");
      },
      dusk() {
        const g = ctx.createLinearGradient(0, 0, 0, 400); g.addColorStop(0, "#ffb36b"); g.addColorStop(.5, "#ff6f7d"); g.addColorStop(1, "#5b2a6e");
        ctx.fillStyle = g; ctx.fillRect(0, 0, 400, 400);
        circle(92, 300, 74, "rgba(255,226,150,.35)"); circle(92, 300, 52, "#ffd884");
        bat(300, 80, 1.1, "#3a1530"); bat(340, 110, .75, "#3a1530"); bat(268, 120, .6, "#3a1530");
      },
      mist() {
        const g = ctx.createLinearGradient(0, 0, 0, 400); g.addColorStop(0, "#7fc6cf"); g.addColorStop(1, "#c3a3e6");
        ctx.fillStyle = g; ctx.fillRect(0, 0, 400, 400);
        cloud(30, 90, 1.1, "rgba(255,214,234,.9)"); cloud(270, 60, 1.3, "rgba(255,255,255,.75)");
        cloud(300, 190, .9, "rgba(255,214,234,.8)"); cloud(20, 230, .8, "rgba(255,255,255,.6)");
      }
    };
    function ground() {
      ctx.beginPath(); ctx.moveTo(0, 358); ctx.quadraticCurveTo(200, 328, 400, 358); ctx.lineTo(400, 400); ctx.lineTo(0, 400); ctx.closePath();
      ctx.fillStyle = "#3a2217"; ctx.fill();
      ctx.save(); ctx.clip(); sprinkles(3, 40, 0, 344, 400, 56, SPRINK, 5); ctx.restore();
      pumpkin(52, 356, 1); pumpkin(352, 362, .8);
    }
    function legs() {
      rr(179, 312, 16, 46, 7); ctx.fillStyle = "#3a2a4a"; ctx.fill();
      rr(205, 312, 16, 46, 7); ctx.fill();
      ell(186, 360, 13, 7, 0, "#ff6f91"); ell(214, 360, 13, 7, 0, "#ff6f91");
    }

    /* ---------- outfits ---------- */
    const OUTFIT = {
      choco: {
        back() {
          ctx.beginPath(); ctx.moveTo(162, 214); ctx.lineTo(112, 346); ctx.quadraticCurveTo(200, 366, 288, 346); ctx.lineTo(238, 214); ctx.closePath();
          ctx.fillStyle = "#5a3420"; ctx.fill();
          ctx.beginPath(); ctx.moveTo(166, 222); ctx.lineTo(124, 340); ctx.quadraticCurveTo(200, 356, 276, 340); ctx.lineTo(234, 222); ctx.closePath();
          ctx.fillStyle = "#c0324a"; ctx.fill();
          tri([168, 214], [140, 170], [190, 204], "#5a3420"); tri([232, 214], [260, 170], [210, 204], "#5a3420");
          tri([170, 210], [150, 182], [186, 204], "#c0324a"); tri([230, 210], [250, 182], [214, 204], "#c0324a");
        },
        front() {
          rr(162, 212, 76, 110, 20); ctx.fillStyle = "#7a4a2c"; ctx.fill();
          ctx.save(); ctx.clip();
          [188, 212].forEach((x) => line(x, 212, x, 322, "#5e3620", 3));
          [242, 270, 298].forEach((y) => line(162, y, 238, y, "#5e3620", 3));
          ctx.fillStyle = "rgba(255,255,255,.08)"; ctx.fillRect(162, 212, 76, 14);
          ctx.restore();
        }
      },
      lolli: {
        back() {},
        front() {
          ctx.beginPath(); ctx.moveTo(172, 212); ctx.lineTo(228, 212); ctx.lineTo(258, 330); ctx.quadraticCurveTo(200, 340, 142, 330); ctx.closePath();
          ctx.fillStyle = "#ff9ec4"; ctx.fill();
          ctx.save(); ctx.clip();
          spiral(182, 252, 14, 2.5, "#fff6fb", 3); spiral(224, 288, 15, 2.5, "#fff6fb", 3);
          spiral(178, 306, 11, 2, "#fff6fb", 3); spiral(220, 236, 9, 2, "#fff6fb", 3);
          ctx.restore();
          rr(168, 272, 64, 8, 4); ctx.fillStyle = "#ffd23f"; ctx.fill();
        }
      },
      wafer: {
        back() {},
        front() {
          rr(158, 212, 84, 108, 14); ctx.fillStyle = "#e8b86d"; ctx.fill();
          ctx.save(); ctx.clip();
          for (let k = -120; k < 120; k += 12) { line(158 + k, 212, 158 + k + 108, 320, "#c99245", 2); line(242 - k, 212, 242 - k - 108, 320, "#c99245", 2); }
          ctx.restore();
          rr(156, 276, 88, 12, 4); ctx.fillStyle = "#fff3dc"; ctx.fill();
          rr(192, 274, 16, 16, 3); ctx.fillStyle = "#ff6f91"; ctx.fill();
          ell(162, 222, 17, 11, -.3, "#f2c98a"); ell(238, 222, 17, 11, .3, "#f2c98a");
        }
      },
      bean: {
        back() {},
        front() {
          ctx.beginPath(); ctx.moveTo(178, 212); ctx.lineTo(222, 212); ctx.lineTo(264, 334); ctx.quadraticCurveTo(200, 348, 136, 334); ctx.closePath();
          ctx.fillStyle = "#7b5cd6"; ctx.fill();
          ctx.save(); ctx.clip();
          const r = rng(9), cols = ["#ff6f91", "#ffd23f", "#7fe0c4", "#fff3e6", "#ff9a1f", "#9be564"];
          for (let i = 0; i < 22; i++) { const x = 140 + r() * 120, y = 250 + r() * 90, a = r() * Math.PI; ell(x, y, 6.5, 4.2, a, cols[i % cols.length]); ell(x - 1.5, y - 1.5, 2, 1.2, a, "rgba(255,255,255,.6)"); }
          ctx.restore();
          rr(172, 240, 56, 9, 4.5); ctx.fillStyle = "#ffd23f"; ctx.fill();
        }
      }
    };
    function arms(sleeve) {
      line(168, 228, 140, 286, sleeve, 15); line(232, 228, 262, 282, sleeve, 15);
      circle(140, 291, 9, SKIN); circle(264, 288, 9, SKIN);
    }

    /* ---------- props ---------- */
    const PROP = {
      none: { overHand: false, draw() {} },
      cane: { overHand: true, draw() {
        ctx.beginPath(); ctx.moveTo(266, 352); ctx.lineTo(266, 214); ctx.arc(282, 214, 16, Math.PI, 0); ctx.lineTo(298, 228);
        ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 10; ctx.strokeStyle = "#fffaf4"; ctx.stroke();
        ctx.setLineDash([7, 7]); ctx.strokeStyle = "#e8263f"; ctx.stroke(); ctx.setLineDash([]);
      }},
      lolli: { overHand: true, draw() {
        line(266, 345, 266, 236, "#f6efe6", 5);
        circle(266, 212, 31, "#ffd23f"); spiral(266, 212, 28, 3, "#ff6f91", 7);
        ctx.beginPath(); ctx.arc(266, 212, 31, 0, TAU); ctx.strokeStyle = "#e8b400"; ctx.lineWidth = 2; ctx.stroke();
      }},
      churro: { overHand: true, draw() {
        for (let i = -4; i <= 4; i++) line(236, 350, 230 + i * 6, 380, "#b86a2b", 3);
        circle(236, 350, 6, "#ff6f91");
        ctx.beginPath(); ctx.moveTo(236, 350); ctx.lineTo(300, 206); ctx.lineCap = "round"; ctx.lineWidth = 11; ctx.strokeStyle = "#d99a4f"; ctx.stroke();
        ctx.setLineDash([3, 7]); ctx.strokeStyle = "#b9772f"; ctx.stroke(); ctx.setLineDash([]);
        const r = rng(21); for (let i = 0; i < 14; i++) { const t = .1 + r() * .85; circle(236 + 64 * t + (r() - .5) * 5, 350 - 144 * t, 1.1, "#fffaf0"); }
      }},
      cookie: { overHand: false, draw() {
        circle(272, 290, 33, "#d8a25c");
        ctx.beginPath(); ctx.arc(272, 290, 33, 0, TAU); ctx.strokeStyle = "#b98140"; ctx.lineWidth = 3; ctx.stroke();
        [[260, 276, 5], [284, 280, 4.5], [270, 300, 5.5], [288, 302, 4], [256, 298, 3.5], [276, 268, 3]].forEach(([x, y, s]) => ell(x, y, s, s * .8, s, "#4a2a18"));
      }}
    };

    /* ---------- faces ---------- */
    function head() { rr(192, 203, 16, 16, 4); ctx.fillStyle = SKIN; ctx.fill(); circle(200, 165, 50, SKIN); }
    function cheeks() { circle(172, 186, 7, "rgba(255,111,145,.35)"); circle(228, 186, 7, "rgba(255,111,145,.35)"); }
    const FACE = {
      vampire: { hatY: 0, draw() {
        head();
        ctx.beginPath(); ctx.arc(200, 165, 52, Math.PI, 0); ctx.lineTo(236, 140); ctx.lineTo(200, 154); ctx.lineTo(164, 140); ctx.closePath();
        ctx.fillStyle = "#24140e"; ctx.fill();
        line(175, 160, 190, 165, "#24140e", 3); line(225, 160, 210, 165, "#24140e", 3);
        ell(184, 174, 4.5, 5.5, 0, "#2b1838"); ell(216, 174, 4.5, 5.5, 0, "#2b1838");
        circle(185.5, 172, 1.6, "#fff"); circle(217.5, 172, 1.6, "#fff");
        cheeks();
        ctx.beginPath(); ctx.arc(200, 186, 11, .15 * Math.PI, .85 * Math.PI); ctx.strokeStyle = "#7a2a3a"; ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.stroke();
        [193, 207].forEach((x) => { tri([x - 4.5, 195], [x + 4.5, 195], [x, 209], "rgba(235,40,80,.9)"); line(x - 1.5, 197, x - .5, 203, "rgba(255,255,255,.6)", 1.4); });
      }},
      pumpkin: { hatY: -6, draw() {
        rr(194, 100, 12, 16, 4); ctx.fillStyle = "#4f8a3a"; ctx.fill();
        circle(200, 165, 57, "#ff8a1f");
        ctx.lineWidth = 3; ctx.strokeStyle = "#e06a10";
        ctx.beginPath(); ctx.ellipse(200, 165, 22, 56, 0, 0, TAU); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(200, 165, 42, 56, 0, 0, TAU); ctx.stroke();
        ell(176, 138, 11, 6, -.5, "rgba(255,255,255,.35)");
        const glow = "#ffe36e";
        tri([170, 172], [183, 150], [196, 172], glow); tri([204, 172], [217, 150], [230, 172], glow);
        tri([195, 184], [200, 176], [205, 184], glow);
        ctx.beginPath(); ctx.moveTo(166, 190); ctx.lineTo(177, 198); ctx.lineTo(186, 191); ctx.lineTo(194, 200); ctx.lineTo(200, 193);
        ctx.lineTo(206, 200); ctx.lineTo(214, 191); ctx.lineTo(223, 198); ctx.lineTo(234, 190); ctx.quadraticCurveTo(200, 226, 166, 190);
        ctx.fillStyle = glow; ctx.fill();
      }},
      mummy: { hatY: 0, draw() {
        head();
        ctx.save(); ctx.beginPath(); ctx.arc(200, 165, 50, 0, TAU); ctx.clip();
        [[128, -.12], [142, .1], [156, -.05], [190, .08], [203, -.1], [216, .06]].forEach(([y, a], i) => {
          ctx.save(); ctx.translate(200, y); ctx.rotate(a); rr(-70, -6.5, 140, 13, 5);
          ctx.fillStyle = i % 2 ? "#ffe2ee" : "#fffaf4"; ctx.fill(); ctx.strokeStyle = "#e8d3c4"; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
        });
        ctx.restore();
        circle(184, 173, 8, "#fff"); circle(216, 172, 10, "#fff");
        circle(185, 175, 3.5, "#2b1838"); circle(217, 174, 4.5, "#2b1838");
      }},
      cat: { hatY: 0, draw() {
        head();
        tri([152, 142], [160, 92], [194, 120], "#2a1a14"); tri([248, 142], [240, 92], [206, 120], "#2a1a14");
        tri([160, 132], [164, 104], [184, 121], "#ff9ec4"); tri([240, 132], [236, 104], [216, 121], "#ff9ec4");
        ctx.beginPath(); ctx.arc(200, 165, 52, Math.PI, 0); ctx.quadraticCurveTo(232, 138, 200, 150); ctx.quadraticCurveTo(168, 138, 148, 165); ctx.closePath();
        ctx.fillStyle = "#2a1a14"; ctx.fill();
        ell(184, 172, 7, 8, 0, "#9be564"); ell(216, 172, 7, 8, 0, "#9be564");
        ell(184, 172, 2, 7, 0, "#1b1020"); ell(216, 172, 2, 7, 0, "#1b1020");
        tri([195, 184], [205, 184], [200, 190], "#ff6f91");
        ctx.lineWidth = 2; ctx.strokeStyle = "#5a2a2a"; ctx.lineCap = "round";
        ctx.beginPath(); ctx.arc(195, 191, 5, 0, Math.PI); ctx.stroke(); ctx.beginPath(); ctx.arc(205, 191, 5, 0, Math.PI); ctx.stroke();
        cheeks();
        [[170, 184, 144, 178], [170, 191, 143, 193], [230, 184, 256, 178], [230, 191, 257, 193]].forEach((w) => line(w[0], w[1], w[2], w[3], "#d42a3c", 3));
      }},
      ghost: { hatY: -10, draw() {
        ctx.beginPath(); ctx.moveTo(146, 176); ctx.lineTo(254, 176); ctx.lineTo(268, 238);
        ctx.quadraticCurveTo(256, 250, 244, 238); ctx.quadraticCurveTo(232, 250, 220, 238); ctx.quadraticCurveTo(208, 250, 196, 238);
        ctx.quadraticCurveTo(184, 250, 172, 238); ctx.quadraticCurveTo(160, 250, 148, 238); ctx.quadraticCurveTo(140, 246, 132, 238); ctx.closePath();
        ctx.fillStyle = "#ffd3e8"; ctx.fill();
        circle(200, 168, 58, "#ffd3e8");
        for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; circle(200 + Math.cos(a) * 55, 168 + Math.sin(a) * 55, 14, i % 2 ? "#ffd3e8" : "#f1dcff"); }
        circle(200, 168, 52, "#ffe0ef");
        circle(178, 140, 9, "rgba(255,255,255,.7)"); circle(190, 132, 5, "rgba(255,255,255,.7)");
        ell(184, 168, 6, 9, 0, "#2b1838"); ell(216, 168, 6, 9, 0, "#2b1838");
        ell(200, 190, 6, 8, 0, "#2b1838");
        circle(170, 184, 7, "rgba(255,111,145,.35)"); circle(230, 184, 7, "rgba(255,111,145,.35)");
      }}
    };

    /* ---------- hats ---------- */
    const HAT = {
      none() {},
      witch() {
        ell(200, 122, 74, 13, 0, "#5b3420");
        ctx.beginPath(); ctx.moveTo(160, 120); ctx.lineTo(204, 36); ctx.quadraticCurveTo(216, 26, 230, 38); ctx.quadraticCurveTo(220, 40, 214, 52); ctx.lineTo(240, 120); ctx.closePath();
        ctx.fillStyle = "#4a2a18"; ctx.fill();
        ctx.save(); ctx.clip(); sprinkles(5, 30, 160, 30, 82, 72, SPRINK, 6); ctx.restore();
        rr(164, 104, 72, 12, 3); ctx.fillStyle = "#ff6f91"; ctx.fill();
      },
      corn() {
        ctx.beginPath(); ctx.moveTo(158, 122); ctx.quadraticCurveTo(200, 134, 242, 122); ctx.lineTo(204, 30); ctx.quadraticCurveTo(200, 25, 196, 30); ctx.closePath();
        ctx.save(); ctx.clip();
        ctx.fillStyle = "#fffaf0"; ctx.fillRect(150, 20, 100, 46);
        ctx.fillStyle = "#ff9a1f"; ctx.fillRect(150, 66, 100, 30);
        ctx.fillStyle = "#ffd23f"; ctx.fillRect(150, 96, 100, 44);
        line(190, 50, 176, 118, "rgba(255,255,255,.45)", 4);
        ctx.restore();
      },
      cupcake() {
        ctx.beginPath(); ctx.moveTo(158, 122); ctx.lineTo(242, 122); ctx.lineTo(232, 92); ctx.lineTo(168, 92); ctx.closePath();
        ctx.fillStyle = "#7fe0c4"; ctx.fill();
        ctx.save(); ctx.clip(); for (let x = 160; x < 245; x += 10) line(x, 90, x + (x - 200) * .12, 124, "#5cc4a8", 3); ctx.restore();
        ell(200, 88, 46, 15, 0, "#ff9ec4"); ell(200, 74, 36, 14, 0, "#ffb3d1"); ell(200, 61, 24, 11, 0, "#ff9ec4"); ell(200, 50, 12, 8, 0, "#ffb3d1");
        sprinkles(8, 16, 166, 56, 68, 34, ["#ffd23f", "#7fe0c4", "#fff3e6", "#9b7bff"], 5);
        line(204, 36, 212, 24, "#4f8a3a", 2.5); circle(204, 38, 8, "#e8263f"); circle(201, 35, 2.2, "rgba(255,255,255,.7)");
      },
      donut() {
        ctx.beginPath(); ctx.ellipse(200, 96, 48, 13, 0, 0, TAU); ctx.lineWidth = 15; ctx.strokeStyle = "#d9984c"; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(200, 93, 48, 12, 0, 0, TAU); ctx.lineWidth = 9; ctx.strokeStyle = "#ff8fb8"; ctx.stroke();
        for (let i = 0; i < 18; i++) { const a = i / 18 * TAU, x = 200 + Math.cos(a) * 48, y = 93 + Math.sin(a) * 12; line(x - 2.5, y - 1, x + 2.5, y + 1, SPRINK[i % SPRINK.length], 2.2); }
        circle(150, 84, 2, "#fff6c9"); circle(254, 80, 2.4, "#fff6c9"); circle(244, 104, 1.6, "#fff6c9");
      }
    };

    /* ---------- composition ---------- */
    function drawCharacter(st) {
      const o = OUTFIT[st.outfit], f = FACE[st.face], p = PROP[st.prop];
      ell(200, 364, 58, 8, 0, "rgba(0,0,0,.3)");
      o.back(); legs(); o.front(); arms(item("outfit", st.outfit).sleeve);
      p.draw(); if (p.overHand) circle(264, 288, 9, SKIN);
      f.draw();
      ctx.save(); ctx.translate(0, f.hatY); HAT[st.hat](); ctx.restore();
    }

    function totals(st) {
      const kcal = ["hat", "face", "outfit", "prop"].reduce((s, c) => s + item(c, st[c]).kcal, 0);
      const level = STR.levels[kcal < 800 ? 0 : kcal < 1200 ? 1 : kcal < 1600 ? 2 : 3];
      const name = tr(item("outfit", st.outfit).adj) + tr(item("face", st.face).role);
      return { kcal, kcalText: kcal.toLocaleString(STR.locale), level, name };
    }

    function label(t) {
      ctx.fillStyle = "#fff3e6"; ctx.fillRect(0, 400, 400, 40);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 400, 400, 6); ctx.clip();
      ctx.fillStyle = "#ff6f91";
      for (let x = -10; x < 410; x += 16) { ctx.beginPath(); ctx.moveTo(x, 400); ctx.lineTo(x + 8, 400); ctx.lineTo(x + 2, 406); ctx.lineTo(x - 6, 406); ctx.closePath(); ctx.fill(); }
      ctx.restore();
      const k = t.kcalText + " " + STR.unit;
      ctx.font = STR.kcalFont;
      const kw = ctx.measureText(k).width;
      ctx.fillStyle = "#c2477a"; ctx.textAlign = "right"; ctx.textBaseline = "middle"; ctx.fillText(k, 384, 424);
      let size = 20; const maxW = 384 - 16 - kw - 16;
      do { ctx.font = `${size}px ${STR.nameFont}`; size--; } while (ctx.measureText(t.name).width > maxW && size > 11);
      ctx.fillStyle = "#2b1838"; ctx.textAlign = "left"; ctx.fillText(t.name, 16, 424);
    }

    function renderCard(context, st) {
      ctx = context;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      ctx.clearRect(0, 0, 400, 440);
      BG[st.bg](); ground(); drawCharacter(st);
      const t = totals(st); label(t);
      return t;
    }


    return {
      LANG, PARTS, STR, item, tr, totals, renderCard,
      drawCharacter(context, st) { ctx = context; drawCharacter(st); },
      helpers: { setCtx: (c) => { ctx = c; }, circle, rng, sprinkles, pumpkin, bat, rr }
    };
  }
  root.CandyCostumeCore = createCore;
})(typeof globalThis !== "undefined" ? globalThis : this);
