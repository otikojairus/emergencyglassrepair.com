/**
 * Renders service-specific SVG art to WebP (no generic stock photos).
 * Run: node scripts/generate-service-images.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public/images");
const W = 1400;
const H = 1050;

const palette = {
  coal: "#141210",
  cream: "#f3efe6",
  paper: "#ebe5d9",
  flame: "#e85d04",
  teal: "#1f6b68",
  glass: "#a8d4e6",
  glassDark: "#6ba3b8",
  wood: "#8b6914",
  woodDark: "#5c4610",
  night: "#0d1b2a",
  amber: "#ffb347",
};

function svgWrap(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="${palette.paper}"/>
  ${body}
</svg>`;
}

/** @type {Record<string, string>} */
const scenes = {
  "hero-home": `
  <rect x="80" y="120" width="1240" height="810" fill="${palette.coal}" rx="4"/>
  <rect x="140" y="200" width="520" height="620" fill="${palette.glass}" opacity="0.35"/>
  <path d="M140 200 L400 420 L660 200 Z" fill="${palette.glass}" opacity="0.5"/>
  <path d="M200 350 L350 500 L500 350 L350 200 Z" stroke="${palette.flame}" stroke-width="8" fill="none"/>
  <line x1="280" y1="220" x2="420" y2="580" stroke="${palette.cream}" stroke-width="3" opacity="0.7"/>
  <line x1="350" y1="200" x2="380" y2="600" stroke="${palette.cream}" stroke-width="2" opacity="0.5"/>
  <text x="720" y="380" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="56" font-weight="700">Broken storefront</text>
  <text x="720" y="450" fill="${palette.flame}" font-family="system-ui,sans-serif" font-size="36">Secure the opening first</text>
  `,

  "hero-service": `
  <rect x="100" y="280" width="900" height="520" fill="${palette.coal}" rx="4"/>
  <rect x="160" y="340" width="340" height="400" fill="${palette.glass}" opacity="0.4"/>
  <rect x="520" y="340" width="420" height="400" fill="${palette.glass}" opacity="0.25"/>
  <rect x="200" y="180" width="280" height="420" fill="${palette.glassDark}" opacity="0.6" transform="rotate(-8 340 390)"/>
  <rect x="240" y="200" width="200" height="380" fill="${palette.glass}" opacity="0.5" transform="rotate(-8 340 390)"/>
  <circle cx="1100" cy="350" r="120" fill="${palette.teal}"/>
  <text x="1020" y="360" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="28" font-weight="700">GLAZIER</text>
  <text x="720" y="900" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="42" font-weight="700">Commercial glazing crews</text>
  `,

  "hero-local": `
  <rect x="0" y="650" width="${W}" height="400" fill="${palette.coal}"/>
  <rect x="60" y="380" width="180" height="320" fill="${palette.glass}" opacity="0.5"/>
  <rect x="260" y="320" width="200" height="380" fill="${palette.glass}" opacity="0.45"/>
  <rect x="480" y="350" width="220" height="350" fill="${palette.glass}" opacity="0.4"/>
  <rect x="720" y="300" width="240" height="400" fill="${palette.glass}" opacity="0.5"/>
  <rect x="980" y="360" width="200" height="340" fill="${palette.glass}" opacity="0.45"/>
  <rect x="1200" y="400" width="160" height="300" fill="${palette.glass}" opacity="0.4"/>
  <text x="80" y="120" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="52" font-weight="700">Metro storefront strip</text>
  <text x="80" y="190" fill="${palette.teal}" font-family="system-ui,sans-serif" font-size="32">Local dispatch · parking · after-hours access</text>
  `,

  emergency: `
  <rect x="120" y="140" width="1160" height="770" fill="${palette.coal}" rx="6"/>
  <rect x="200" y="220" width="480" height="580" fill="${palette.glass}" opacity="0.3"/>
  <polygon points="200,220 440,450 680,220" fill="${palette.glass}" opacity="0.15"/>
  <path d="M250 280 L420 520 M380 240 L520 560 M300 600 L550 350" stroke="${palette.flame}" stroke-width="6"/>
  <rect x="780" y="280" width="420" height="200" fill="${palette.flame}" rx="4"/>
  <text x="820" y="380" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="48" font-weight="800">EMERGENCY</text>
  <text x="820" y="440" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="28">Broken glass · call now</text>
  <rect x="780" y="520" width="420" height="120" fill="${palette.teal}" rx="4"/>
  <text x="820" y="595" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="32" font-weight="600">Board-up if needed tonight</text>
  `,

  night: `
  <rect width="100%" height="100%" fill="${palette.night}"/>
  <circle cx="200" cy="160" r="70" fill="${palette.amber}" opacity="0.9"/>
  <rect x="80" y="400" width="200" height="500" fill="${palette.glass}" opacity="0.35"/>
  <rect x="300" y="350" width="240" height="550" fill="${palette.glass}" opacity="0.4"/>
  <rect x="560" y="380" width="220" height="520" fill="${palette.glass}" opacity="0.35"/>
  <rect x="800" y="420" width="260" height="480" fill="${palette.glass}" opacity="0.45"/>
  <rect x="1080" y="450" width="200" height="450" fill="${palette.glass}" opacity="0.3"/>
  <text x="80" y="320" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="56" font-weight="700">24 / 7</text>
  <text x="80" y="380" fill="${palette.flame}" font-family="system-ui,sans-serif" font-size="34">After-hours glass &amp; board-up</text>
  `,

  storefront: `
  <rect x="100" y="200" width="1200" height="700" fill="${palette.coal}" rx="4"/>
  <rect x="160" y="260" width="1080" height="80" fill="${palette.cream}" opacity="0.15"/>
  <rect x="180" y="360" width="320" height="480" fill="${palette.glass}" opacity="0.55"/>
  <rect x="540" y="360" width="320" height="480" fill="${palette.glass}" opacity="0.5"/>
  <rect x="900" y="360" width="300" height="480" fill="${palette.glass}" opacity="0.55"/>
  <rect x="160" y="340" width="1040" height="20" fill="${palette.cream}" opacity="0.4"/>
  <text x="140" y="160" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="48" font-weight="700">Storefront glass repair</text>
  <text x="140" y="115" fill="${palette.teal}" font-family="system-ui,sans-serif" font-size="28">Aluminum rails · tempered lites</text>
  `,

  commercial: `
  <rect x="400" y="80" width="520" height="920" fill="${palette.coal}"/>
  <rect x="440" y="120" width="80" height="120" fill="${palette.glass}" opacity="0.5"/>
  <rect x="540" y="120" width="80" height="120" fill="${palette.glass}" opacity="0.45"/>
  <rect x="640" y="120" width="80" height="120" fill="${palette.glass}" opacity="0.5"/>
  <rect x="740" y="120" width="80" height="120" fill="${palette.glass}" opacity="0.4"/>
  <rect x="440" y="280" width="380" height="60" fill="${palette.glass}" opacity="0.35"/>
  <rect x="440" y="380" width="380" height="60" fill="${palette.glass}" opacity="0.35"/>
  <rect x="440" y="480" width="380" height="60" fill="${palette.glass}" opacity="0.35"/>
  <rect x="440" y="580" width="380" height="60" fill="${palette.glass}" opacity="0.35"/>
  <rect x="440" y="680" width="380" height="60" fill="${palette.glass}" opacity="0.35"/>
  <rect x="440" y="780" width="380" height="120" fill="${palette.glass}" opacity="0.5"/>
  <text x="80" y="200" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="44" font-weight="700">Commercial</text>
  <text x="80" y="260" fill="${palette.teal}" font-family="system-ui,sans-serif" font-size="28">Curtain wall · lobby glass</text>
  `,

  replacement: `
  <rect x="80" y="500" width="1240" height="40" fill="${palette.coal}"/>
  <rect x="200" y="200" width="500" height="320" fill="${palette.glassDark}" opacity="0.5" transform="rotate(-12 450 360)"/>
  <rect x="240" y="230" width="420" height="260" fill="${palette.glass}" opacity="0.65" transform="rotate(-12 450 360)"/>
  <rect x="700" y="280" width="480" height="360" fill="${palette.coal}" rx="4"/>
  <rect x="740" y="320" width="400" height="280" fill="${palette.glass}" opacity="0.4"/>
  <text x="80" y="140" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="48" font-weight="700">Glass replacement</text>
  <text x="80" y="200" fill="${palette.flame}" font-family="system-ui,sans-serif" font-size="30">Field measure → custom tempered panel</text>
  `,

  "board-up": `
  <rect x="150" y="150" width="500" height="700" fill="${palette.coal}" rx="4"/>
  <rect x="200" y="200" width="400" height="600" fill="${palette.wood}" stroke="${palette.woodDark}" stroke-width="6"/>
  <line x1="400" y1="200" x2="400" y2="800" stroke="${palette.woodDark}" stroke-width="4"/>
  <line x1="200" y1="350" x2="600" y2="350" stroke="${palette.woodDark}" stroke-width="3"/>
  <line x1="200" y1="500" x2="600" y2="500" stroke="${palette.woodDark}" stroke-width="3"/>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${palette.woodDark}" stroke-width="3"/>
  <rect x="750" y="200" width="500" height="500" fill="${palette.flame}" rx="6"/>
  <text x="790" y="420" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="56" font-weight="800">BOARD-UP</text>
  <text x="790" y="490" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="28">Plywood / polycarbonate</text>
  <text x="790" y="540" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="24">Until permanent glass arrives</text>
  `,

  "commercial-door": `
  <rect x="350" y="120" width="700" height="860" fill="${palette.coal}" rx="4"/>
  <rect x="500" y="200" width="400" height="700" fill="${palette.glass}" opacity="0.45"/>
  <rect x="480" y="180" width="440" height="40" fill="${palette.cream}" opacity="0.3"/>
  <rect x="620" y="750" width="160" height="24" fill="${palette.flame}"/>
  <text x="540" y="820" fill="${palette.cream}" font-family="system-ui,sans-serif" font-size="22">PANIC BAR</text>
  <circle cx="850" cy="500" r="28" fill="${palette.teal}"/>
  <text x="80" y="160" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="42" font-weight="700">Commercial door glass</text>
  `,

  door: `
  <rect x="420" y="100" width="560" height="900" fill="${palette.coal}" rx="4"/>
  <rect x="480" y="160" width="440" height="760" fill="${palette.glass}" opacity="0.5"/>
  <rect x="460" y="140" width="480" height="36" fill="${palette.cream}" opacity="0.35"/>
  <rect x="660" y="820" width="80" height="120" fill="${palette.teal}"/>
  <text x="80" y="200" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="44" font-weight="700">Storefront door</text>
  <text x="80" y="260" fill="${palette.teal}" font-family="system-ui,sans-serif" font-size="28">Pivots · closers · tempered lite</text>
  `,

  "storefront-window": `
  <rect x="120" y="180" width="1160" height="720" fill="${palette.coal}" rx="4"/>
  <rect x="180" y="240" width="500" height="600" fill="${palette.glass}" opacity="0.5"/>
  <rect x="720" y="240" width="500" height="280" fill="${palette.glass}" opacity="0.45"/>
  <rect x="720" y="560" width="500" height="280" fill="${palette.glass}" opacity="0.45"/>
  <rect x="170" y="230" width="1060" height="16" fill="${palette.cream}" opacity="0.35"/>
  <rect x="710" y="240" width="16" height="600" fill="${palette.cream}" opacity="0.35"/>
  <text x="140" y="140" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="42" font-weight="700">Fixed storefront windows</text>
  `,

  "aluminum-door": `
  <rect x="380" y="120" width="640" height="880" fill="#4a5568" rx="2"/>
  <rect x="420" y="160" width="560" height="800" fill="${palette.coal}"/>
  <rect x="460" y="200" width="480" height="720" fill="${palette.glass}" opacity="0.45"/>
  <rect x="440" y="180" width="520" height="28" fill="#9ca3af"/>
  <rect x="440" y="910" width="520" height="28" fill="#9ca3af"/>
  <rect x="440" y="200" width="20" height="720" fill="#9ca3af"/>
  <rect x="940" y="200" width="20" height="720" fill="#9ca3af"/>
  <text x="80" y="180" fill="${palette.coal}" font-family="system-ui,sans-serif" font-size="40" font-weight="700">Aluminum storefront door</text>
  <text x="80" y="235" fill="${palette.teal}" font-family="system-ui,sans-serif" font-size="26">Rail · threshold · hardware</text>
  `,
};

await mkdir(outDir, { recursive: true });

for (const [name, body] of Object.entries(scenes)) {
  const svg = svgWrap(body);
  const webp = await sharp(Buffer.from(svg)).webp({ quality: 88 }).toBuffer();
  await writeFile(path.join(outDir, `${name}.webp`), webp);
  console.log(`wrote ${name}.webp (${webp.length} bytes)`);
}

const attribution = `# Images

Service illustrations generated locally (\`node scripts/generate-service-images.mjs\`).
Each file matches a specific glazing service—no generic stock photography.

Replace with licensed job-site photos before launch if you prefer photography.
`;

await writeFile(path.join(outDir, "ATTRIBUTION.md"), attribution);
console.log("done");
