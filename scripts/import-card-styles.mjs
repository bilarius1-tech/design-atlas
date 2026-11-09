import fs from "node:fs";
import path from "node:path";

const root = "C:/Users/bilar/proekt/stil";
const out = path.resolve(".");
const src = fs.readFileSync(path.join(root, "app.js"), "utf8");

const stylesStart = src.indexOf("const styles = ");
const rulesStart = src.indexOf("\nconst rules =");
const enStart = src.indexOf("const enStyles = ");
const activeStart = src.indexOf("\nconst activeStyleIds");

if (stylesStart < 0 || rulesStart < 0 || enStart < 0 || activeStart < 0) {
  console.error("Could not locate style blocks in stil/app.js");
  process.exit(1);
}

const stylesLiteral = src.slice(stylesStart + "const styles = ".length, rulesStart).trim().replace(/;$/, "");
const enLiteral = src.slice(enStart + "const enStyles = ".length, activeStart).trim().replace(/;$/, "");

const styles = eval(stylesLiteral);
const enStyles = eval(`(${enLiteral})`);

const active = new Set([
  "blueprint",
  "catalog",
  "market",
  "neon",
  "eco",
  "clinical",
  "premium",
  "vintage",
]);

const titles = {
  blueprint: ["Инженерный чертёж", "Engineering blueprint"],
  catalog: ["Спокойный журнал", "Calm editorial"],
  market: ["Дерзкий streetwear", "Bold streetwear"],
  neon: ["Неоновый техно", "Neon tech"],
  eco: ["Эко-ботанический", "Eco botanical"],
  clinical: ["Клинический минимализм", "Clinical minimal"],
  premium: ["Тёплый премиум", "Warm premium"],
  vintage: ["Премиум золото винтаж", "Vintage gold"],
};

const tags = {
  blueprint: ["ТЕХНИЧНЫЙ", "TECHNICAL"],
  catalog: ["МЯГКИЙ EDITORIAL", "SOFT EDITORIAL"],
  market: ["МОЛОДЁЖНЫЙ", "YOUTH"],
  neon: ["NEON TECH", "NEON TECH"],
  eco: ["НАТУРАЛЬНЫЙ", "NATURAL"],
  clinical: ["ЧИСТЫЙ МИНИМАЛИЗМ", "CLEAN MINIMAL"],
  premium: ["ПРЕМИУМ", "PREMIUM"],
  vintage: ["ВИНТАЖНЫЙ ЛЮКС", "VINTAGE LUXE"],
};

const cats = {
  blueprint: ["Техно и индустриальный", "Tech & industrial"],
  catalog: ["Журнальный", "Editorial"],
  market: ["Streetwear", "Streetwear"],
  neon: ["Технологии", "Technology"],
  eco: ["Эко и крафт", "Eco & craft"],
  clinical: ["Чистая подача", "Clean presentation"],
  premium: ["Премиум", "Premium"],
  vintage: ["Премиум", "Premium"],
};

const enDesc = {
  blueprint: "Precision, diagrams, and a fine grid — for products where every detail matters.",
  catalog: "Soft light, delicate typography, and a calm editorial composition.",
  market: "Contrast, large type, and dynamic street-campaign energy.",
  neon: "Dark stage, light contours, and a tech presentation for electronics.",
  eco: "Paper textures, soft botanical shadows, and natural tones.",
  clinical: "Clean light scene, strict grid, and precise information blocks.",
  premium: "Noble materials, soft light, and restrained luxury presentation.",
  vintage: "Warm paper, heritage typography, and fine gold details.",
};

const pub = path.join(out, "public/cards/results");
fs.mkdirSync(pub, { recursive: true });

const index = { schemaVersion: "1.0.0", styles: [] };

for (const s of styles.filter((x) => active.has(x.id))) {
  const id = `card-${s.id}`;
  const dir = path.join(out, "content/card-styles", id);
  fs.mkdirSync(dir, { recursive: true });

  const samples = [];
  for (const sample of s.samples || []) {
    const base = path.basename(sample);
    const from = path.join(root, sample.replace("./", ""));
    const toName = `${id}-${base}`;
    const to = path.join(pub, toName);
    if (fs.existsSync(from)) {
      fs.copyFileSync(from, to);
      samples.push(`/cards/results/${toName}`);
      console.log("copied", toName);
    } else {
      console.warn("missing sample", from);
    }
  }

  const json = {
    schemaVersion: "1.0.0",
    id,
    status: "published",
    title: { ru: titles[s.id][0], en: titles[s.id][1] },
    tag: { ru: tags[s.id][0], en: tags[s.id][1] },
    category: { ru: cats[s.id][0], en: cats[s.id][1] },
    description: { ru: s.desc, en: enDesc[s.id] },
    kind: s.kind,
    fonts: s.fonts,
    colors: s.colors,
    background: s.bg,
    ink: s.ink,
    prompt: { ru: s.prompt, en: enStyles[s.id] },
    samples,
    active: true,
  };

  fs.writeFileSync(path.join(dir, "style.json"), `${JSON.stringify(json, null, 2)}\n`);
  index.styles.push({ id, path: `content/card-styles/${id}` });
}

index.styles.sort((a, b) => a.id.localeCompare(b.id));
fs.mkdirSync(path.join(out, "content/card-styles"), { recursive: true });
fs.writeFileSync(
  path.join(out, "content/card-styles/index.json"),
  `${JSON.stringify(index, null, 2)}\n`,
);
console.log("wrote", index.styles.length, "card styles");
