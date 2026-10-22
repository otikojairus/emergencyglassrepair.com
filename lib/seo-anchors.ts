import type { SeoPage } from "./pages";
import { locationName } from "./pages";

export function seoAnchorFor(target: SeoPage): string {
  const keyword = target.keyword.trim() || target.title.split("|")[0].trim();
  const place = locationName(target);

  if (target.kind === "city") {
    return `${keyword} ${place}`;
  }
  if (target.kind === "national") {
    return `${keyword} Canada`;
  }
  return keyword;
}

/** Keyword-rich anchor from a city page to a national service page. */
export function seoAnchorCityToService(cityPage: SeoPage, service: SeoPage): string {
  const place = locationName(cityPage);
  const keyword = service.keyword.trim() || service.slug.replace(/-/g, " ");
  return `${keyword} ${place}`;
}
