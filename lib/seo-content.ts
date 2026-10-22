import { hashSlug } from "./content-utils";
import { seoAnchorCityToService, seoAnchorFor } from "./seo-anchors";
import {
  breadcrumbLabels,
  faqHeadingFor,
  faqsFor,
  h1For,
  heroLeadFor,
  introFor,
  sectionsFor,
  type ContentSection,
  type FaqItem,
} from "./page-copy";
import { metaDescriptionFor, metaTitleFor } from "./seo-meta";
import {
  CITY_PAGES,
  NATIONAL_PAGES,
  PILLAR_SLUG,
  type SeoPage,
  PAGES,
  PHONE_DISPLAY,
  getPage,
  serviceBaseSlug,
} from "./pages";

export type { FaqItem, ContentSection };
export type InternalLink = { href: string; anchor: string };

export {
  breadcrumbLabels,
  faqHeadingFor,
  faqsFor,
  h1For,
  heroLeadFor,
  introFor,
  sectionsFor,
};

const CITY_SERVICE_SLUGS = [
  "storefront-glass-repair",
  "storefront-glass-replacement",
  "board-up-services",
  "24-hour-glass-repair",
  "commercial-door-repair",
  "storefront-door-repair",
] as const;

function pickCityPages(page: SeoPage, min: number, max: number): SeoPage[] {
  const span = max - min + 1;
  const count = min + (hashSlug(page.slug) % span);
  const start = hashSlug(`${page.slug}:cities`) % CITY_PAGES.length;
  const out: SeoPage[] = [];
  for (let i = 0; i < count; i++) {
    out.push(CITY_PAGES[(start + i) % CITY_PAGES.length]!);
  }
  return out;
}

function isEmergencyNational(page: SeoPage) {
  if (page.kind !== "national") return false;
  const base = serviceBaseSlug(page.slug);
  return (
    base === PILLAR_SLUG ||
    base.includes("emergency") ||
    base.includes("24-hour") ||
    base.includes("board-up")
  );
}

export function internalLinksFor(page: SeoPage): InternalLink[] {
  const links: InternalLink[] = [];
  const seen = new Set<string>();
  const base = serviceBaseSlug(page.slug);
  const pillar = getPage(PILLAR_SLUG)!;
  const boardUp = getPage("board-up-services");
  const twentyFour = getPage("24-hour-glass-repair");

  const add = (target: SeoPage | undefined, anchor?: string) => {
    if (!target) return;
    const href = `/${target.slug}`;
    if (href === `/${page.slug}` || seen.has(href)) return;
    seen.add(href);
    links.push({ href, anchor: anchor ?? seoAnchorFor(target) });
  };

  if (page.kind === "national") {
    if (page.slug !== PILLAR_SLUG) {
      add(pillar, seoAnchorFor(pillar));
    }

    if (base === PILLAR_SLUG) {
      for (const city of CITY_PAGES) add(city);
    } else if (isEmergencyNational(page)) {
      for (const city of pickCityPages(page, 2, 5)) add(city);
    } else {
      for (const city of pickCityPages(page, 2, 4)) add(city);
    }

    if (boardUp && page.slug !== "board-up-services") add(boardUp, seoAnchorFor(boardUp));
    if (twentyFour && page.slug !== "24-hour-glass-repair") add(twentyFour, seoAnchorFor(twentyFour));

    const siblings = NATIONAL_PAGES.filter((p) => p.slug !== page.slug && serviceBaseSlug(p.slug) !== base);
    const start = hashSlug(page.slug) % Math.max(1, siblings.length);
    for (const s of siblings.slice(start, start + 3)) add(s);

    return links;
  }

  if (page.kind === "city") {
    add(pillar, seoAnchorFor(pillar));
    const serviceStart = hashSlug(page.slug) % CITY_SERVICE_SLUGS.length;
    for (let i = 0; i < 4; i++) {
      const slug = CITY_SERVICE_SLUGS[(serviceStart + i) % CITY_SERVICE_SLUGS.length]!;
      const national = getPage(slug);
      if (national) add(national, seoAnchorCityToService(page, national));
    }
    add(boardUp, boardUp ? seoAnchorCityToService(page, boardUp) : undefined);
    const others = CITY_PAGES.filter((c) => c.slug !== page.slug);
    const start = hashSlug(page.slug) % Math.max(1, others.length - 2);
    for (const c of others.slice(start, start + 3)) add(c);
    return links;
  }

  add(pillar);
  return links;
}

export function pageSeoMeta(page: SeoPage) {
  const intro = introFor(page);
  return {
    title: metaTitleFor(page),
    description: metaDescriptionFor(page, intro, PHONE_DISPLAY),
  };
}

export function allSlugsLinkedFromPillar() {
  return PAGES.map((p) => p.slug);
}
