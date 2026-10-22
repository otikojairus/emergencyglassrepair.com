/**
 * Downloads one unique Unsplash photo per image key (no shared IDs or duplicate bytes).
 * Run: npm run fetch:images
 */
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public/images");

/** @type {Record<string, { id: string; label: string }>} */
const assets = {
  "hero-home": { id: "1600585152915-d208bec867a1", label: "Modern home with floor-to-ceiling glass" },
  "hero-service": { id: "1504307651254-35680f356dfd", label: "Construction crew on site" },
  "hero-local": { id: "1477959858617-67f85cf4f1df", label: "Downtown skyline" },
  emergency: { id: "1621905252507-b35492cc74b4", label: "Emergency service tools" },
  night: { id: "1514565131-fce0801e5785", label: "City at night" },
  storefront: { id: "1441986300917-64674bd600d8", label: "Retail interior with display windows" },
  commercial: { id: "1486406146926-c627a92ad1ab", label: "Commercial tower facade" },
  "commercial-replacement": { id: "1600607687644-c7171b42498f", label: "Bright interior with glass partitions" },
  replacement: { id: "1541888946425-d81bb19240f5", label: "Construction and facade work" },
  "board-up": { id: "1581578731548-c64695cc6952", label: "Worker securing a window opening" },
  "commercial-door": { id: "1497366216548-37526070297c", label: "Office glass entry" },
  "emergency-commercial-door": { id: "1449824913935-59a10b8d2000", label: "Urban commercial street frontage" },
  door: { id: "1560448204-e02f11c3d0e2", label: "Glass entry door" },
  "door-glass-replacement": { id: "1600210492486-724fe5c67fb0", label: "Minimal interior with glazed opening" },
  "door-glass-repair": { id: "1600607687920-4e2a09cf159d", label: "Modern living space with glass walls" },
  "storefront-window": { id: "1570129477492-45c003edd2be", label: "House with large exterior windows" },
  "aluminum-door": { id: "1497366811353-6870744d04b2", label: "Glass and aluminum office partitions" },
};

function unsplashUrl(photoId) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1400&q=85`;
}

const usedIds = new Set();
for (const [key, { id }] of Object.entries(assets)) {
  if (usedIds.has(id)) throw new Error(`Duplicate Unsplash ID "${id}" for ${key}`);
  usedIds.add(id);
}

await mkdir(outDir, { recursive: true });
const hashes = new Map();

for (const [name, { id, label }] of Object.entries(assets)) {
  const url = unsplashUrl(id);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const hash = createHash("sha256").update(buf).digest("hex");
  if (hashes.has(hash)) throw new Error(`${name} duplicates bytes of ${hashes.get(hash)}`);
  hashes.set(hash, name);

  const webp = await sharp(buf).resize(1400, null, { withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();
  await writeFile(path.join(outDir, `${name}.webp`), webp);
  console.log(`wrote ${name}.webp ← photo-${id}`);
}

const attribution = `# Images

Unsplash — **${Object.keys(assets).length} unique photos**, one per service image key.
Refresh: \`npm run fetch:images\`

| File | Unsplash |
|------|----------|
${Object.entries(assets)
  .map(([k, v]) => `| ${k}.webp | [photo-${v.id}](https://unsplash.com/photos/${v.id}) — ${v.label} |`)
  .join("\n")}
`;

await writeFile(path.join(outDir, "ATTRIBUTION.md"), attribution);
console.log(`done — ${hashes.size} unique photos`);
