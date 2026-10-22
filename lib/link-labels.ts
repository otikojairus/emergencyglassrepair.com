import type { SeoPage } from "./pages";
import { locationName } from "./pages";
import { serviceLabelFromSlug } from "./service-labels";

export function pageLinkLabel(page: SeoPage) {
  if (page.kind === "city") {
    return locationName(page);
  }
  const short: Record<string, string> = {
    "emergency-glass-repair": "Emergency line",
    "24-hour-glass-repair": "24/7 glass",
    "storefront-glass-repair": "Storefront repair",
    "commercial-glass-repair": "Commercial repair",
    "storefront-glass-replacement": "Storefront replacement",
    "commercial-glass-replacement": "Commercial replacement",
    "storefront-window-replacement": "Window replacement",
    "storefront-door-repair": "Door repair",
    "emergency-commercial-door-repair": "Emergency doors",
    "commercial-door-repair": "Commercial doors",
    "commercial-door-glass-replacement": "Door glass swap",
    "commercial-door-glass-repair": "Door glass repair",
    "aluminum-storefront-door-repair": "Aluminum doors",
    "board-up-services": "Board-up",
  };
  return short[page.slug] ?? serviceLabelFromSlug(page.slug);
}
