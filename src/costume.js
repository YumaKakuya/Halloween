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
        { id: "crown",   name: { ja: "マカロンの王冠",     en: "Macaron Crown" },       kcal: 330, sw: "#c9a7ff" },
        { id: "icecream",name: { ja: "さかさまアイス",     en: "Upside-Down Ice Cream" }, kcal: 270, sw: "#e0a458" },
        { id: "horns",   name: { ja: "シナモンキャンディの角", en: "Cinnamon Candy Horns" }, kcal: 160, sw: "#e8263f" },
        { id: "none",    name: { ja: "なし",               en: "None" },                kcal: 0,   sw: "transparent" }
      ]},
      face: { label: { ja: "顔", en: "Face" }, items: [
        { id: "vampire", name: { ja: "グミの牙", en: "Gummy Fangs" },                         role: { ja: "吸血鬼", en: "Vampire" },          kcal: 90,  sw: "#eb2850" },
        { id: "pumpkin", name: { ja: "かぼちゃキャンディの仮面", en: "Pumpkin Candy Mask" },  role: { ja: "かぼちゃ大王", en: "Pumpkin King" }, kcal: 160, sw: "#ff8a1f" },
        { id: "mummy",   name: { ja: "マシュマロ包帯", en: "Marshmallow Wraps" },             role: { ja: "ミイラ", en: "Mummy" },            kcal: 230, sw: "#fffaf4" },
        { id: "cat",     name: { ja: "チョコ耳とグミのヒゲ", en: "Choco Ears & Gummy Whiskers" }, role: { ja: "黒猫", en: "Black Cat" },    kcal: 180, sw: "#2a1a14" },
        { id: "ghost",   name: { ja: "綿あめのシーツ", en: "Cotton Candy Sheet" },            role: { ja: "おばけ", en: "Ghost" },            kcal: 110, sw: "#ffd3e8" },
        { id: "skull",   name: { ja: "ホワイトチョコのドクロ", en: "White Chocolate Skull" },  role: { ja: "ガイコツ", en: "Skeleton" },        kcal: 200, sw: "#fbf6ee" },
        { id: "frank",   name: { ja: "ミントグミの顔とリコリスのボルト", en: "Mint Gummy Face & Licorice Bolts" }, role: { ja: "フランケン", en: "Frankenstein" }, kcal: 170, sw: "#a8e6a1" },
        { id: "wolf",    name: { ja: "チョコの毛皮とキャンディコーンの牙", en: "Choco Fur & Candy Corn Fangs" }, role: { ja: "オオカミ男", en: "Werewolf" }, kcal: 260, sw: "#6b4423" }
      ]},
      outfit: { label: { ja: "服", en: "Outfit" }, items: [
        { id: "choco", name: { ja: "板チョコのマント", en: "Chocolate Bar Cape" },         adj: { ja: "ビターな", en: "Bittersweet " }, kcal: 560, sw: "#7a4a2c", sleeve: "#7a4a2c" },
        { id: "lolli", name: { ja: "ペロペロキャンディのローブ", en: "Lollipop Robe" },     adj: { ja: "ぐるぐるの", en: "Swirly " },    kcal: 300, sw: "#ff9ec4", sleeve: "#ff9ec4" },
        { id: "wafer", name: { ja: "ウエハースの鎧", en: "Wafer Armor" },                  adj: { ja: "サクサクの", en: "Crunchy " },   kcal: 450, sw: "#e8b86d", sleeve: "#e8b86d" },
        { id: "bean",  name: { ja: "ジェリービーンズのドレス", en: "Jelly Bean Dress" },    adj: { ja: "つやつやの", en: "Glossy " },    kcal: 340, sw: "#7b5cd6", sleeve: "#7b5cd6" },
        { id: "ginger", name: { ja: "ジンジャーブレッドのスーツ", en: "Gingerbread Suit" },   adj: { ja: "スパイシーな", en: "Spicy " },  kcal: 520, sw: "#b86a2b", sleeve: "#b86a2b" },
        { id: "marsh",  name: { ja: "マシュマロのダウン", en: "Marshmallow Puffer" },        adj: { ja: "ふわふわの", en: "Fluffy " },   kcal: 410, sw: "#fffaf4", sleeve: "#fffaf4" },
        { id: "tux",    name: { ja: "リコリスのタキシード", en: "Licorice Tuxedo" },         adj: { ja: "おしゃれな", en: "Dapper " },   kcal: 380, sw: "#1b1020", sleeve: "#1b1020" }
      ]},
      prop: { label: { ja: "小物", en: "Prop" }, items: [
        { id: "cane",   name: { ja: "キャンディケインの杖", en: "Candy Cane Staff" }, kcal: 150, sw: "#e8263f" },
        { id: "lolli",  name: { ja: "ジャンボロリポップ",   en: "Giant Lollipop" },   kcal: 220, sw: "#ffd23f" },
        { id: "churro", name: { ja: "チュロスのほうき",     en: "Churro Broom" },     kcal: 380, sw: "#d99a4f" },
        { id: "cookie", name: { ja: "クッキーの盾",         en: "Cookie Shield" },    kcal: 480, sw: "#d8a25c" },
        { id: "apple",  name: { ja: "キャラメルりんご",     en: "Caramel Apple" },    kcal: 290, sw: "#c98a3d" },
        { id: "bucket", name: { ja: "お菓子いっぱいのかぼちゃバケツ", en: "Candy Pumpkin Bucket" }, kcal: 650, sw: "#ff8a1f" },
        { id: "wings",  name: { ja: "チョコのコウモリの羽", en: "Chocolate Bat Wings" }, kcal: 340, sw: "#4a2a18" },
        { id: "none",   name: { ja: "なし",                 en: "None" },             kcal: 0,   sw: "transparent" }
      ]},
      bg: { label: { ja: "背景", en: "Background" }, items: [
        { id: "moon", name: { ja: "満月の夜",   en: "Full Moon Night" },   kcal: 0, sw: "#2b1850" },
        { id: "dusk", name: { ja: "夕焼けの丘", en: "Sunset Hill" },       kcal: 0, sw: "#ff7a6b" },
        { id: "mist", name: { ja: "綿あめの霧", en: "Cotton Candy Mist" }, kcal: 0, sw: "#a9c6e6" },
        { id: "house", name: { ja: "お菓子のおばけ屋敷", en: "Gingerbread Haunted House" }, kcal: 0, sw: "#355c7d" },
        { id: "grave", name: { ja: "クッキーの墓場", en: "Cookie Graveyard" }, kcal: 0, sw: "#5d6e5a" }
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
      },
      house() {
        const g = ctx.createLinearGradient(0, 0, 0, 400); g.addColorStop(0, "#13213f"); g.addColorStop(1, "#355c7d");
        ctx.fillStyle = g; ctx.fillRect(0, 0, 400, 400);
        const r = rng(41); for (let i = 0; i < 34; i++) circle(r() * 400, r() * 200, .6 + r() * 1.2, `rgba(255,244,214,${.35 + r() * .55})`);
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 400, 400); ctx.arc(91, 63, 24, 0, TAU, true); ctx.clip("evenodd");
        circle(78, 72, 26, "#fff1c1"); ctx.restore();
        // gingerbread house
        rr(284, 238, 82, 116, 4); ctx.fillStyle = "#b86a2b"; ctx.fill();
        tri([270, 244], [325, 184], [380, 244], "#7a4a2c");
        ctx.beginPath();
        for (let i = 0; i <= 10; i++) { const x = 270 + i * 11, y = 244 + (i % 2 ? 5 : 0); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.strokeStyle = "#fff8ee"; ctx.lineWidth = 4; ctx.lineJoin = "round"; ctx.stroke();
        line(272, 242, 325, 186, "#fff8ee", 4); line(325, 186, 378, 242, "#fff8ee", 4);
        [[300, 228, "#ff6f91"], [325, 206, "#ffd23f"], [350, 228, "#7fe0c4"]].forEach(([x, y, c]) => circle(x, y, 6, c));
        [[296, 262], [334, 262]].forEach(([x, y]) => { rr(x, y, 20, 22, 4); ctx.fillStyle = "#ffd884"; ctx.fill(); line(x + 10, y, x + 10, y + 22, "#b86a2b", 2); line(x, y + 11, x + 20, y + 11, "#b86a2b", 2); });
        rr(315, 302, 20, 48, 9); ctx.fillStyle = "#5a3420"; ctx.fill(); circle(330, 328, 2, "#ffd23f");
        // a small ghost peeking out of the left window
        ell(306, 276, 7, 9, 0, "#fffaf4"); circle(303.5, 274, 1.4, "#2b1838"); circle(308.5, 274, 1.4, "#2b1838");
        bat(120, 120, .8, "#0b1530");
      },
      grave() {
        const g = ctx.createLinearGradient(0, 0, 0, 400); g.addColorStop(0, "#1f2a3d"); g.addColorStop(1, "#5d6e5a");
        ctx.fillStyle = g; ctx.fillRect(0, 0, 400, 400);
        circle(300, 86, 54, "rgba(233,245,208,.12)"); circle(300, 86, 38, "#e9f5d0");
        bat(90, 80, .9, "#141b28"); bat(126, 60, .6, "#141b28");
        [[58, 66], [116, 48], [296, 54], [354, 72]].forEach(([x, h]) => {
          const top = 352 - h;
          ctx.beginPath(); ctx.moveTo(x - 19, 362); ctx.lineTo(x - 19, top + 19); ctx.arc(x, top + 19, 19, Math.PI, 0); ctx.lineTo(x + 19, 362); ctx.closePath();
          ctx.fillStyle = "#d8a25c"; ctx.fill(); ctx.strokeStyle = "#fff3e6"; ctx.lineWidth = 2.5; ctx.stroke();
          line(x, top + 12, x, top + 32, "#7a4a2c", 3); line(x - 7, top + 19, x + 7, top + 19, "#7a4a2c", 3);
          circle(x - 9, top + 42, 2.2, "#7a4a2c"); circle(x + 8, top + 46, 2.2, "#7a4a2c");
        });
        [[0, 312, 400], [-40, 330, 300], [120, 300, 320]].forEach(([x, y, w]) => ell(x + w / 2, y, w / 2, 10, 0, "rgba(255,255,255,.10)"));
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
    Object.assign(OUTFIT, {
      ginger: {
        back() {},
        front() {
          rr(160, 212, 80, 110, 22); ctx.fillStyle = "#b86a2b"; ctx.fill();
          const wave = (y) => { ctx.beginPath(); for (let x = 164; x <= 236; x += 2) { const yy = y + Math.sin((x - 164) / 4) * 3; x === 164 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.strokeStyle = "#fff8ee"; ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.stroke(); };
          wave(222); wave(312);
          [[246, "#ff6f91"], [270, "#7fe0c4"], [294, "#ffd23f"]].forEach(([y, c]) => { circle(200, y, 6.5, c); circle(198, y - 2, 2, "rgba(255,255,255,.55)"); });
        }
      },
      marsh: {
        back() {},
        front() {
          [218, 244, 270, 296].forEach((y) => { rr(156, y, 88, 28, 14); ctx.fillStyle = "#fffaf4"; ctx.fill(); ctx.strokeStyle = "#e3d6ca"; ctx.lineWidth = 2; ctx.stroke(); });
          ell(200, 214, 28, 8, 0, "#ffd3e8");
          line(200, 222, 200, 322, "#e3d6ca", 2);
        }
      },
      tux: {
        back() {},
        front() {
          rr(162, 212, 76, 110, 18); ctx.fillStyle = "#1b1020"; ctx.fill();
          tri([184, 212], [216, 212], [200, 266], "#fff3e6");
          tri([180, 212], [200, 266], [168, 252], "#e8263f"); tri([220, 212], [200, 266], [232, 252], "#e8263f");
          tri([188, 214], [188, 228], [200, 221], "#e8263f"); tri([212, 214], [212, 228], [200, 221], "#e8263f"); circle(200, 221, 3.2, "#b51d34");
          circle(200, 284, 3.5, "#e8263f"); circle(200, 302, 3.5, "#e8263f");
          for (let x = 170; x <= 230; x += 12) line(x, 316, x + 6, 322, "rgba(255,255,255,.12)", 2);
        }
      }
    });
    function arms(sleeve) {
      line(168, 228, 140, 286, sleeve, 15); line(232, 228, 262, 282, sleeve, 15);
      circle(140, 291, 9, SKIN); circle(264, 288, 9, SKIN);
    }

    /* ---------- props ---------- */
    const PROP = {
      none: { overHand: false, draw() {} },
      apple: { overHand: true, draw() {
        line(264, 300, 264, 232, "#e8d2a8", 5);
        circle(264, 216, 24, "#d42a3c");
        ctx.save(); ctx.beginPath(); ctx.arc(264, 216, 24, 0, TAU); ctx.clip();
        ell(264, 203, 30, 19, 0, "#c98a3d");
        [[247, 220, 4], [258, 225, 5], [272, 223, 4.5], [283, 217, 3.5]].forEach(([x, y, r]) => circle(x, y, r, "#c98a3d"));
        const rr2 = rng(7); for (let i = 0; i < 12; i++) circle(246 + rr2() * 36, 196 + rr2() * 16, 1.2, "#f3d9a8");
        ctx.restore();
        ell(254, 208, 5, 3, -.5, "rgba(255,255,255,.5)");
      }},
      bucket: { overHand: true, draw() {
        ctx.beginPath(); ctx.moveTo(244, 314); ctx.quadraticCurveTo(264, 268, 284, 314); ctx.strokeStyle = "#2b1838"; ctx.lineWidth = 3; ctx.stroke();
        [[252, 306, "#ff6f91"], [264, 302, "#ffd23f"], [276, 306, "#7fe0c4"], [258, 300, "#9b7bff"]].forEach(([x, y, c]) => { circle(x, y, 6, c); tri([x - 6, y], [x - 11, y - 4], [x - 11, y + 4], c); });
        ell(264, 326, 23, 20, 0, "#ff8a1f");
        ctx.lineWidth = 2; ctx.strokeStyle = "#e06a10";
        ctx.beginPath(); ctx.ellipse(264, 326, 9, 20, 0, 0, TAU); ctx.stroke();
        ell(264, 308, 18, 4.5, 0, "#c95a0c");
        tri([253, 324], [258, 316], [263, 324], "#2b1838"); tri([265, 324], [270, 316], [275, 324], "#2b1838");
        ctx.beginPath(); ctx.moveTo(253, 332); ctx.quadraticCurveTo(264, 342, 275, 332); ctx.strokeStyle = "#2b1838"; ctx.lineWidth = 2.5; ctx.stroke();
      }},
      wings: { overHand: false, back() {
        for (const side of [1, -1]) {
          ctx.save();
          if (side < 0) { ctx.translate(400, 0); ctx.scale(-1, 1); }
          ctx.beginPath(); ctx.moveTo(186, 232);
          ctx.quadraticCurveTo(140, 176, 88, 192);
          ctx.quadraticCurveTo(104, 212, 98, 236);
          ctx.quadraticCurveTo(118, 228, 126, 248);
          ctx.quadraticCurveTo(144, 238, 154, 262);
          ctx.quadraticCurveTo(168, 248, 186, 256);
          ctx.closePath(); ctx.fillStyle = "#4a2a18"; ctx.fill();
          [[98, 236], [126, 248], [154, 262]].forEach(([x, y]) => line(184, 236, x, y, "#2e190d", 2.5));
          ell(150, 210, 14, 4, -.35, "rgba(255,255,255,.08)");
          ctx.restore();
        }
      }, draw() {} },
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

    Object.assign(FACE, {
      skull: { hatY: 0, draw() {
        rr(192, 203, 16, 16, 4); ctx.fillStyle = "#efe6d8"; ctx.fill();
        circle(200, 165, 50, "#fbf6ee");
        ell(182, 166, 12, 13, 0, "#2b1838"); ell(218, 166, 12, 13, 0, "#2b1838");
        circle(186, 162, 2.6, "#fff"); circle(222, 162, 2.6, "#fff");
        tri([195, 187], [205, 187], [200, 178], "#2b1838");
        line(178, 199, 222, 199, "#2b1838", 2.5);
        for (let x = 184; x <= 216; x += 8) line(x, 194, x, 204, "#2b1838", 2);
        ctx.beginPath(); ctx.moveTo(226, 128); ctx.lineTo(232, 138); ctx.lineTo(228, 144); ctx.lineTo(235, 152); ctx.strokeStyle = "#cbbfae"; ctx.lineWidth = 2; ctx.stroke();
      }},
      frank: { hatY: -4, draw() {
        rr(192, 203, 16, 16, 4); ctx.fillStyle = "#93d48c"; ctx.fill();
        rr(138, 168, 16, 12, 3); ctx.fillStyle = "#1b1020"; ctx.fill(); rr(246, 168, 16, 12, 3); ctx.fill();
        circle(200, 165, 50, "#a8e6a1");
        ctx.save(); ctx.beginPath(); ctx.arc(200, 165, 53, 0, TAU); ctx.clip();
        ctx.beginPath(); ctx.moveTo(146, 154); ctx.lineTo(146, 108); ctx.lineTo(254, 108); ctx.lineTo(254, 154);
        ctx.lineTo(242, 142); ctx.lineTo(230, 152); ctx.lineTo(216, 140); ctx.lineTo(200, 152); ctx.lineTo(184, 140); ctx.lineTo(170, 152); ctx.lineTo(158, 142); ctx.closePath();
        ctx.fillStyle = "#1b1020"; ctx.fill();
        ctx.restore();
        circle(184, 174, 4.5, "#2b1838"); circle(216, 174, 4.5, "#2b1838");
        line(175, 169, 193, 169, "#2b1838", 3); line(207, 169, 225, 169, "#2b1838", 3);
        line(188, 195, 212, 195, "#2b1838", 3);
        line(166, 186, 182, 180, "#4e8a49", 2); [[170, 179, 168, 187], [176, 177, 174, 185]].forEach((w) => line(w[0], w[1], w[2], w[3], "#4e8a49", 1.6));
      }},
      wolf: { hatY: 0, draw() {
        tri([154, 140], [158, 94], [190, 122], "#6b4423"); tri([246, 140], [242, 94], [210, 122], "#6b4423");
        tri([162, 130], [164, 106], [182, 122], "#c98b5e"); tri([238, 130], [236, 106], [218, 122], "#c98b5e");
        head();
        ctx.beginPath(); ctx.arc(200, 165, 53, Math.PI, 0);
        ctx.lineTo(244, 152); ctx.lineTo(232, 140); ctx.lineTo(222, 152); ctx.lineTo(210, 140); ctx.lineTo(200, 152);
        ctx.lineTo(190, 140); ctx.lineTo(178, 152); ctx.lineTo(168, 140); ctx.lineTo(156, 152); ctx.closePath();
        ctx.fillStyle = "#6b4423"; ctx.fill();
        tri([151, 166], [140, 190], [162, 184], "#6b4423"); tri([249, 166], [260, 190], [238, 184], "#6b4423");
        ell(182, 167, 6.5, 5.5, 0, "#ffd23f"); ell(218, 167, 6.5, 5.5, 0, "#ffd23f");
        circle(182, 167, 2.6, "#2b1838"); circle(218, 167, 2.6, "#2b1838");
        line(174, 158, 190, 162, "#4a2a18", 3); line(226, 158, 210, 162, "#4a2a18", 3);
        ell(200, 188, 17, 12, 0, "#e8c39e"); ell(200, 181, 6.5, 4.5, 0, "#2b1838");
        line(200, 185, 200, 192, "#2b1838", 2);
        ctx.beginPath(); ctx.moveTo(190, 194); ctx.quadraticCurveTo(200, 199, 210, 194); ctx.strokeStyle = "#2b1838"; ctx.lineWidth = 2; ctx.stroke();
        [192, 208].forEach((x) => { tri([x - 4, 195], [x + 4, 195], [x, 207], "#ff9a1f"); tri([x - 2.2, 202], [x + 2.2, 202], [x, 207], "#fffaf0"); tri([x - 4, 195], [x + 4, 195], [x, 198], "#ffd23f"); });
      }}
    });

    /* ---------- hats ---------- */
    const HAT = {
      none() {},
      crown() {
        rr(158, 106, 84, 15, 7); ctx.fillStyle = "#f2c230"; ctx.fill();
        [[176, "#ff6f91"], [200, "#7fe0c4"], [224, "#9b7bff"]].forEach(([x, c]) => circle(x, 113.5, 3.5, c));
        const mac = (x, y, s, c) => { ell(x, y - 4 * s, 10 * s, 6 * s, 0, c); ell(x, y, 10 * s, 2.6 * s, 0, "#fff3e6"); ell(x, y + 4 * s, 10 * s, 6 * s, 0, c); ell(x - 3 * s, y - 6 * s, 3 * s, 1.5 * s, -.3, "rgba(255,255,255,.45)"); };
        mac(166, 98, .9, "#ff9ec4"); mac(234, 98, .9, "#c9a7ff");
        mac(182, 90, 1, "#7fe0c4"); mac(218, 90, 1, "#ffd23f");
        mac(200, 82, 1.25, "#ff9ec4");
      },
      icecream() {
        ctx.beginPath(); ctx.moveTo(168, 114); ctx.lineTo(200, 22); ctx.lineTo(232, 114); ctx.closePath();
        ctx.fillStyle = "#e0a458"; ctx.fill();
        ctx.save(); ctx.clip();
        for (let k = -100; k < 100; k += 11) { line(160 + k, 20, 160 + k + 90, 120, "#b97a35", 2); line(240 - k, 20, 240 - k - 90, 120, "#b97a35", 2); }
        ctx.restore();
        ell(200, 116, 46, 16, 0, "#ff9ec4");
        [[162, 124, 7], [178, 130, 6], [196, 131, 5], [214, 129, 7], [234, 124, 6]].forEach(([x, y, r]) => circle(x, y, r, "#ff9ec4"));
        sprinkles(12, 12, 166, 106, 68, 14, ["#ffd23f", "#7fe0c4", "#fff3e6", "#9b7bff"], 5);
        ell(182, 110, 10, 4, -.2, "rgba(255,255,255,.4)");
      },
      horns() {
        ctx.beginPath(); ctx.arc(200, 165, 54, Math.PI * 1.13, Math.PI * 1.87); ctx.strokeStyle = "#2b1838"; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.stroke();
        for (const side of [1, -1]) {
          ctx.save();
          if (side < 0) { ctx.translate(400, 0); ctx.scale(-1, 1); }
          ctx.beginPath(); ctx.moveTo(160, 128); ctx.quadraticCurveTo(146, 98, 164, 80); ctx.quadraticCurveTo(166, 104, 186, 120); ctx.closePath();
          ctx.fillStyle = "#e8263f"; ctx.fill();
          ctx.save(); ctx.clip();
          for (let y = 84; y < 130; y += 10) line(140, y + 8, 190, y - 6, "#fff6f0", 3.5);
          ctx.restore();
          ctx.restore();
        }
      },
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
      o.back(); if (p.back) p.back(); legs(); o.front(); arms(item("outfit", st.outfit).sleeve);
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
