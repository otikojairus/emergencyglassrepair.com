export const SERVICE_LABELS: Record<string, string> = {
  "emergency-glass-repair": "Emergency glass repair",
  "24-hour-glass-repair": "24 hour glass repair",
  "storefront-glass-repair": "Storefront glass repair",
  "commercial-glass-repair": "Commercial glass repair",
  "storefront-glass-replacement": "Storefront glass replacement",
  "commercial-glass-replacement": "Commercial glass replacement",
  "storefront-window-replacement": "Storefront window replacement",
  "storefront-door-repair": "Storefront door repair",
  "emergency-commercial-door-repair": "Emergency commercial door repair",
  "commercial-door-repair": "Commercial door repair",
  "commercial-door-glass-replacement": "Commercial door glass replacement",
  "commercial-door-glass-repair": "Commercial door glass repair",
  "aluminum-storefront-door-repair": "Aluminum storefront door repair",
  "board-up-services": "Board up services",
};

const CITY_SUFFIXES = [
  "calgary",
  "winnipeg",
  "edmonton",
  "ottawa",
  "montreal",
  "laval",
  "hamilton",
  "st-catharines",
  "markham",
  "north-york",
  "london-ontario",
  "surrey-bc",
  "mississauga",
  "toronto",
  "halifax",
  "regina",
  "vancouver",
  "vaughan",
  "etobicoke",
  "barrie",
  "woodbridge",
  "thornhill",
  "abbotsford",
];

export function serviceLabelFromSlug(slug: string) {
  let base = slug;
  for (const city of CITY_SUFFIXES) {
    if (base.endsWith(`-${city}`)) {
      base = base.slice(0, -(city.length + 1));
      break;
    }
  }
  return SERVICE_LABELS[base] ?? base.replace(/-/g, " ");
}
