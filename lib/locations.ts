import { CITY_PAGES, locationName } from "./pages";

/** One link per city — place name only on the locations hub. */
export function cityLocationEntries(): { name: string; href: string }[] {
  return CITY_PAGES.map((page) => ({
    name: locationName(page),
    href: `/${page.slug}`,
  })).sort((a, b) => a.name.localeCompare(b.name));
}
