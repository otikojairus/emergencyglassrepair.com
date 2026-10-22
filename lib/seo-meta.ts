import { pick, wordCount } from "./content-utils";
import type { SeoPage } from "./pages";
import { SITE_NAME, locationName } from "./pages";

export function trimTitle(title: string, min = 50, max = 60) {
  let t = title.trim();
  if (t.length > max) {
    const cut = t.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    t = (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…";
  }
  if (t.length < min && t.length + 3 <= max) {
    t = `${t} | CA`;
  }
  return t;
}

export function trimDescription(text: string, min = 150, max = 160) {
  let clean = text.replace(/\s+/g, " ").trim();
  const suffix = " Call now for board-up and measured glass.";
  if (clean.length < min) {
    clean = `${clean}${clean.endsWith(".") ? "" : "."}${suffix}`;
  }
  if (clean.length > max) {
    const cut = clean.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    clean = (lastSpace >= min ? cut.slice(0, lastSpace) : cut).trim() + "…";
  }
  return clean.slice(0, max);
}

function titleCaseKeyword(keyword: string) {
  return keyword.trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function metaTitleFor(page: SeoPage) {
  const kw = titleCaseKeyword(page.keyword || page.slug.replace(/-/g, " "));
  const place = locationName(page);
  let title: string;
  if (page.kind === "city") {
    title = `${kw} ${place} | ${SITE_NAME}`;
  } else {
    title = `${kw} Canada | ${SITE_NAME}`;
  }
  return trimTitle(title);
}

export function metaDescriptionFor(page: SeoPage, introLead: string, phone: string) {
  const kw = page.keyword.trim();
  const place = locationName(page);
  const cta = `Call ${phone} now.`;

  const variants = [
    `${kw} in ${place || "Canada"}—board-up, tempered glass, and storefront doors. ${cta}`,
    `Need ${kw}${place ? ` in ${place}` : " across Canada"}? Share address, access, and photos to dispatch. ${cta}`,
    `${titleCaseKeyword(kw)}${place ? ` near ${place}` : ""}. Storms and break-ins spike demand—call early. ${cta}`,
    `Trusted ${kw} help${place ? ` for ${place}` : ""}. We secure the opening before glass is cut. ${cta}`,
  ];

  const chosen = pick(page.slug, "meta", variants);
  const introSnippet = introLead.split(/\s+/).slice(0, 22).join(" ");
  const blended =
    wordCount(chosen) < 18
      ? `${introSnippet}. ${cta}`
      : chosen;
  return trimDescription(blended);
}

export { SITE_NAME as BRAND };
