# Emergency Glass Repair Canada (pSEO)

Next.js 16 programmatic SEO site for **emergencyglassrepair.com**, generated from `scripts/pseo-glass-canada.xlsx`.

## Stack

- Next.js App Router, standalone Docker output
- 37 routes: 14 national services + 23 city emergency pages
- Pillar: `/emergency-glass-repair`

## Commands

```bash
npm install
npm run generate:pages   # refresh lib/pages.ts from Excel
npm run dev
npm run build
npm run validate:seo
```

## Environment

Copy `.env.example` to `.env.local` and set real phone numbers and `NEXT_PUBLIC_SITE_URL`.

## Content

- `lib/page-copy.ts` — H1, intros, FAQs, sections (glass / Canada)
- `lib/location-facts.ts` — unique facts per metro
- `scripts/validate-seo.ts` — pre-launch checks

## Design

Navy / ice / amber split hero (distinct from Ireland septic and elevator repair templates).
