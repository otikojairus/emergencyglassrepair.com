export type PageKind = "national" | "city";

export type SeoPage = {
  id: number;
  title: string;
  slug: string;
  keyword: string;
  secondary: string[];
  area: string;
  priority: "Top Priority" | "High" | "Medium";
  kind: PageKind;
  volume?: number;
};

const row = (
  id: number, title: string, slug: string, keyword: string, secondary: string,
  area = "Canada", priority: SeoPage["priority"] = "Medium", kind: PageKind = "city", volume?: number,
): SeoPage => ({
  id, title, slug, keyword,
  secondary: secondary ? secondary.split("|").map((s) => s.trim()).filter(Boolean) : [],
  area, priority, kind, volume,
});

export const PILLAR_SLUG = "emergency-glass-repair";

export const PAGES: SeoPage[] = [
  row(1, "Emergency Glass Repair | Call Now", "emergency-glass-repair", "emergency glass repair", "", "Canada (National)", "Top Priority", "national", 300),
  row(2, "24 Hour Glass Repair | Call Now", "24-hour-glass-repair", "24 hour glass repair", "", "Canada (National)", "High", "national", 80),
  row(3, "Storefront Glass Repair | Call Now", "storefront-glass-repair", "storefront glass repair", "", "Canada (National)", "High", "national", 80),
  row(4, "Commercial Glass Repair | Call Now", "commercial-glass-repair", "commercial glass repair", "", "Canada (National)", "Medium", "national", 60),
  row(5, "Storefront Glass Replacement | Call Now", "storefront-glass-replacement", "storefront glass replacement", "", "Canada (National)", "Top Priority", "national", 200),
  row(6, "Commercial Glass Replacement | Call Now", "commercial-glass-replacement", "commercial glass replacement", "", "Canada (National)", "High", "national", 100),
  row(7, "Storefront Window Replacement | Call Now", "storefront-window-replacement", "storefront window replacement", "", "Canada (National)", "Medium", "national", 10),
  row(8, "Storefront Door Repair | Call Now", "storefront-door-repair", "storefront door repair", "", "Canada (National)", "High", "national", 150),
  row(9, "Emergency Commercial Door Repair | Call Now", "emergency-commercial-door-repair", "emergency commercial door repair", "", "Canada (National)", "High", "national", 100),
  row(10, "Commercial Door Repair | Call Now", "commercial-door-repair", "commercial door repair near me", "commercial door repair", "Canada (National)", "High", "national", 90),
  row(11, "Commercial Door Glass Replacement | Call Now", "commercial-door-glass-replacement", "commercial door glass replacement", "", "Canada (National)", "Medium", "national", 50),
  row(12, "Commercial Door Glass Repair | Call Now", "commercial-door-glass-repair", "commercial door glass repair", "", "Canada (National)", "Medium", "national", 10),
  row(13, "Aluminum Storefront Door Repair | Call Now", "aluminum-storefront-door-repair", "aluminum storefront door repair", "", "Canada (National)", "Medium", "national", 20),
  row(14, "Board Up Services | Call Now", "board-up-services", "board up services", "", "Canada (National)", "Medium", "national", 10),
  row(15, "Emergency Glass Repair Calgary | Call Now", "emergency-glass-repair-calgary", "emergency glass repair", "", "Calgary", "Medium", "city"),
  row(16, "Emergency Glass Repair Winnipeg | Call Now", "emergency-glass-repair-winnipeg", "emergency glass repair", "", "Winnipeg", "Medium", "city"),
  row(17, "Emergency Glass Repair Edmonton | Call Now", "emergency-glass-repair-edmonton", "emergency glass repair", "", "Edmonton", "Medium", "city"),
  row(18, "Emergency Glass Repair Ottawa | Call Now", "emergency-glass-repair-ottawa", "emergency glass repair", "", "Ottawa", "Medium", "city"),
  row(19, "Emergency Glass Repair Montreal | Call Now", "emergency-glass-repair-montreal", "emergency glass repair", "", "Montreal", "Medium", "city"),
  row(20, "Emergency Glass Repair Laval | Call Now", "emergency-glass-repair-laval", "emergency glass repair", "", "Laval", "Medium", "city"),
  row(21, "Emergency Glass Repair Hamilton | Call Now", "emergency-glass-repair-hamilton", "emergency glass repair", "", "Hamilton", "Medium", "city"),
  row(22, "Emergency Glass Repair St Catharines | Call Now", "emergency-glass-repair-st-catharines", "emergency glass repair", "", "St Catharines", "Medium", "city"),
  row(23, "Emergency Glass Repair Markham | Call Now", "emergency-glass-repair-markham", "emergency glass repair", "", "Markham", "Medium", "city"),
  row(24, "Emergency Glass Repair North York | Call Now", "emergency-glass-repair-north-york", "emergency glass repair", "", "North York", "Medium", "city"),
  row(25, "Emergency Glass Repair London Ontario | Call Now", "emergency-glass-repair-london-ontario", "emergency glass repair", "", "London, Ontario", "Medium", "city"),
  row(26, "Emergency Glass Repair Surrey BC | Call Now", "emergency-glass-repair-surrey-bc", "emergency glass repair", "", "Surrey, BC", "Medium", "city"),
  row(27, "Emergency Glass Repair Mississauga | Call Now", "emergency-glass-repair-mississauga", "emergency glass repair", "", "Mississauga", "Medium", "city"),
  row(28, "Emergency Glass Repair Toronto | Call Now", "emergency-glass-repair-toronto", "emergency glass repair", "", "Toronto", "Medium", "city"),
  row(29, "Emergency Glass Repair Halifax | Call Now", "emergency-glass-repair-halifax", "emergency glass repair", "", "Halifax", "Medium", "city"),
  row(30, "Emergency Glass Repair Regina | Call Now", "emergency-glass-repair-regina", "emergency glass repair", "", "Regina", "Medium", "city"),
  row(31, "Emergency Glass Repair Vancouver | Call Now", "emergency-glass-repair-vancouver", "emergency glass repair", "", "Vancouver", "Medium", "city"),
  row(32, "Emergency Glass Repair Vaughan | Call Now", "emergency-glass-repair-vaughan", "emergency glass repair", "", "Vaughan", "Medium", "city"),
  row(33, "Emergency Glass Repair Etobicoke | Call Now", "emergency-glass-repair-etobicoke", "emergency glass repair", "", "Etobicoke", "Medium", "city"),
  row(34, "Emergency Glass Repair Barrie | Call Now", "emergency-glass-repair-barrie", "emergency glass repair", "", "Barrie", "Medium", "city"),
  row(35, "Emergency Glass Repair Woodbridge | Call Now", "emergency-glass-repair-woodbridge", "emergency glass repair", "", "Woodbridge", "Medium", "city"),
  row(36, "Emergency Glass Repair Thornhill | Call Now", "emergency-glass-repair-thornhill", "emergency glass repair", "", "Thornhill", "Medium", "city"),
  row(37, "Emergency Glass Repair Abbotsford | Call Now", "emergency-glass-repair-abbotsford", "emergency glass repair", "", "Abbotsford", "Medium", "city"),
];

export const NATIONAL_PAGES = PAGES.filter((p) => p.kind === "national");
export const CITY_PAGES = PAGES.filter((p) => p.kind === "city");

const PHONE_DISPLAY_DEFAULT = "1-888-XXX-XXXX";
const PHONE_E164_DEFAULT = "+1888XXXXXXX";

function isPlaceholderPhone(value?: string) {
  return !value || /x{2,}/i.test(value) || value.includes("XXX");
}

export const PHONE_DISPLAY = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_DISPLAY)
  ? PHONE_DISPLAY_DEFAULT : process.env.NEXT_PUBLIC_PHONE_DISPLAY!;
export const PHONE_E164 = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_E164)
  ? PHONE_E164_DEFAULT : process.env.NEXT_PUBLIC_PHONE_E164!;
export const SITE_NAME = "Emergency Glass Repair Canada";

export function getPage(slug: string) { return PAGES.find((p) => p.slug === slug); }
export function cleanTitle(title: string) { return title.split("|")[0].trim(); }

export function locationName(page: SeoPage) {
  if (page.area.startsWith("Canada")) return "Canada";
  return page.area.split(",")[0].trim();
}

export function serviceBaseSlug(slug: string) {
  if (slug.startsWith("emergency-glass-repair-")) return "emergency-glass-repair";
  return slug;
}

export function absoluteUrl(path = "") {
  const root = process.env.NEXT_PUBLIC_SITE_URL || "https://emergencyglassrepair.com";
  return `${root.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
