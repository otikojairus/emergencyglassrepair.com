export type ImageKey =
  | "hero-home"
  | "hero-service"
  | "hero-local"
  | "emergency"
  | "night"
  | "storefront"
  | "commercial"
  | "commercial-replacement"
  | "replacement"
  | "board-up"
  | "commercial-door"
  | "emergency-commercial-door"
  | "door"
  | "door-glass-replacement"
  | "door-glass-repair"
  | "storefront-window"
  | "aluminum-door";

type Photo = { src: string; alt: string; caption: string; credit: string };

const photos: Record<ImageKey, Photo> = {
  "hero-home": {
    src: "/images/hero-home.webp",
    alt: "Modern building with large glass openings",
    caption: "Secure the opening before measuring replacement glass.",
    credit: "Unsplash",
  },
  "hero-service": {
    src: "/images/hero-service.webp",
    alt: "Construction crew working on a commercial build",
    caption: "Field crews for tempered panels and door hardware.",
    credit: "Unsplash",
  },
  "hero-local": {
    src: "/images/hero-local.webp",
    alt: "Downtown skyline above city streets",
    caption: "Local dispatch knows alleys, loading zones, and after-hours access.",
    credit: "Unsplash",
  },
  emergency: {
    src: "/images/emergency.webp",
    alt: "Emergency trade tools ready for a glass service call",
    caption: "Emergency — stabilize the opening and board if needed tonight.",
    credit: "Unsplash",
  },
  night: {
    src: "/images/night.webp",
    alt: "City street at night with illuminated buildings",
    caption: "24/7 — restaurants, retail, and plazas after close.",
    credit: "Unsplash",
  },
  storefront: {
    src: "/images/storefront.webp",
    alt: "Retail shop with wide storefront display windows",
    caption: "Storefront repair — rails, tempered lites, and gaskets.",
    credit: "Unsplash",
  },
  commercial: {
    src: "/images/commercial.webp",
    alt: "High-rise commercial tower with curtain-wall glass",
    caption: "Commercial repair — curtain wall and lobby glazing.",
    credit: "Unsplash",
  },
  "commercial-replacement": {
    src: "/images/commercial-replacement.webp",
    alt: "Office interior with large glass partition walls",
    caption: "Commercial replacement — measured panels and code-compliant glass.",
    credit: "Unsplash",
  },
  replacement: {
    src: "/images/replacement.webp",
    alt: "Construction site preparing for facade and glazing work",
    caption: "Storefront replacement — sized from field measurements.",
    credit: "Unsplash",
  },
  "board-up": {
    src: "/images/board-up.webp",
    alt: "Technician working at a window opening",
    caption: "Board-up — plywood or polycarbonate until glass is cut.",
    credit: "Unsplash",
  },
  "commercial-door": {
    src: "/images/commercial-door.webp",
    alt: "Commercial office entrance with glass doors",
    caption: "Commercial door repair — closers and latching hardware.",
    credit: "Unsplash",
  },
  "emergency-commercial-door": {
    src: "/images/emergency-commercial-door.webp",
    alt: "Urban commercial street with glass-front businesses",
    caption: "Emergency commercial door — life-safety hardware first.",
    credit: "Unsplash",
  },
  door: {
    src: "/images/door.webp",
    alt: "Glass-paneled storefront entry door",
    caption: "Storefront door — pivots, hinges, and tempered lites.",
    credit: "Unsplash",
  },
  "door-glass-replacement": {
    src: "/images/door-glass-replacement.webp",
    alt: "Minimal interior showing a glazed door opening",
    caption: "Door glass replacement — thickness and notch verified before order.",
    credit: "Unsplash",
  },
  "door-glass-repair": {
    src: "/images/door-glass-repair.webp",
    alt: "Modern space with floor-to-ceiling glass panels",
    caption: "Door glass repair — assess stress cracks before polishing.",
    credit: "Unsplash",
  },
  "storefront-window": {
    src: "/images/storefront-window.webp",
    alt: "Building exterior with large fixed window walls",
    caption: "Fixed lites and window walls — measure each opening.",
    credit: "Unsplash",
  },
  "aluminum-door": {
    src: "/images/aluminum-door.webp",
    alt: "Glass and aluminum partition system in a commercial space",
    caption: "Aluminum storefront doors — rails, thresholds, and hardware.",
    credit: "Unsplash",
  },
};

/** One distinct image per national service — no two services share a file. */
const NATIONAL_SLUG_IMAGE: Record<string, ImageKey> = {
  "emergency-glass-repair": "emergency",
  "24-hour-glass-repair": "night",
  "storefront-glass-repair": "storefront",
  "commercial-glass-repair": "commercial",
  "storefront-glass-replacement": "replacement",
  "commercial-glass-replacement": "commercial-replacement",
  "storefront-window-replacement": "storefront-window",
  "storefront-door-repair": "door",
  "emergency-commercial-door-repair": "emergency-commercial-door",
  "commercial-door-repair": "commercial-door",
  "commercial-door-glass-replacement": "door-glass-replacement",
  "commercial-door-glass-repair": "door-glass-repair",
  "aluminum-storefront-door-repair": "aluminum-door",
  "board-up-services": "board-up",
};

export function imageForServiceSlug(slug: string): ImageKey {
  const national = NATIONAL_SLUG_IMAGE[slug];
  if (national) return national;
  if (slug.startsWith("emergency-glass-repair-")) return "emergency";
  return "hero-service";
}

export function getPhoto(key: ImageKey): Photo {
  return photos[key];
}

/** All national services use unique image keys (for SEO / QA scripts). */
export function nationalServiceImageKeys(): ImageKey[] {
  return Object.values(NATIONAL_SLUG_IMAGE);
}
