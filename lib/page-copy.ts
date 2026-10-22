import { capitalizeSentence, pick, wordCount } from "./content-utils";
import { factsForPage } from "./location-facts";
import type { SeoPage } from "./pages";
import { PHONE_DISPLAY, locationName, serviceBaseSlug } from "./pages";
import { serviceLabelFromSlug } from "./service-labels";

export type FaqItem = { q: string; a: string };
export type ContentSection = { h2: string; paragraphs: string[] };

function isUrgent(page: SeoPage) {
  const base = serviceBaseSlug(page.slug);
  return base.includes("repair") || base.includes("board-up") || base.includes("24-hour") || base === "emergency-glass-repair";
}

function wordTarget(page: SeoPage): number {
  if (page.kind === "national") return 800;
  if (isUrgent(page)) return 500;
  return 400;
}

function keywordPhrase(page: SeoPage) {
  return page.keyword.trim() || serviceLabelFromSlug(page.slug).toLowerCase();
}

export function h1For(page: SeoPage): string {
  const kw = keywordPhrase(page);
  const place = locationName(page);
  if (page.kind === "city") return `${capitalizeSentence(kw)} in ${place}`;
  if (page.kind === "national") return `${capitalizeSentence(kw)} in Canada`;
  return capitalizeSentence(kw);
}

const serviceHooks: Record<string, string[]> = {
  "emergency-glass-repair": [
    "A shattered storefront is a safety and security problem until the opening is secured.",
    "We board up first, measure tempered or laminated glass, and schedule install when the panel is ready.",
  ],
  "24-hour-glass-repair": [
    "Night break-ins and storm damage do not wait for business hours—dispatch runs around the clock.",
    "After-hours crews carry plywood, polycarbonate, and tools to make the site safe before dawn.",
  ],
  "storefront-glass-repair": [
    "Cracked tempered glass can fail without warning—tape is not a long-term fix on a busy sidewalk.",
    "We match aluminum rail profiles and door hardware common on Canadian retail strips.",
  ],
  "commercial-glass-repair": [
    "Office towers and low-rise plazas both need correct safety glass markings and wind-load ratings.",
    "We coordinate with property managers on access cards, loading docks, and after-hours elevators.",
  ],
  "storefront-glass-replacement": [
    "Replacement starts with accurate field measurements—off-the-shelf sheets rarely fit modern storefront systems.",
    "We source tempered or laminated lites that meet local building codes before removing the broken panel.",
  ],
  "commercial-glass-replacement": [
    "Large commercial replacements may need crane or boom access—tell us about overhead wires and lane closures.",
    "We stage interior protection when replacing glass above merchandise or reception desks.",
  ],
  "storefront-window-replacement": [
    "Fixed storefront lites and door glass often differ in thickness—measure both before ordering.",
    "We label each opening so installers do not swap panels on multi-bay fronts.",
  ],
  "storefront-door-repair": [
    "A dragging aluminum door can shatter the lite on the next slam—hinge and pivot adjustment matters.",
    "We stock common closers, pivots, and weatherstripping for Canadian winters.",
  ],
  "emergency-commercial-door-repair": [
    "If panic hardware fails inspection, the door stays closed until parts arrive—we prioritize life-safety hardware.",
    "Vandalized closers and bent rails are common after forced entry—photos help us load the right parts.",
  ],
  "commercial-door-repair": [
    "Automatic operators and manual storefront doors share the same tempered glass risks when misaligned.",
    "We test latching, sweeps, and ADA clearances after every door glass swap.",
  ],
  "commercial-door-glass-replacement": [
    "Door glass is not interchangeable—thickness, notch, and heat-soak requirements vary by manufacturer.",
    "We verify whether the lite is tempered, laminated, or insulated before cutting a replacement order.",
  ],
  "commercial-door-glass-repair": [
    "Small chips at door corners often mean the lite is stressed—replacement is safer than polishing.",
    "We can reglaze some aluminum door rails on site when the frame is still square.",
  ],
  "aluminum-storefront-door-repair": [
    "Aluminum rails corrode at sidewalk level from salt and pressure washing—check the bottom rail before reusing glass.",
    "We align pivots and header bars so new glass does not bind in the frame.",
  ],
  "board-up-services": [
    "Board-up is about liability: sharp glass, weather, and theft risk until permanent glazing returns.",
    "We use plywood or clear polycarbonate depending on whether you need visibility for security cameras.",
  ],
};

function hookFor(page: SeoPage): string {
  const base = serviceBaseSlug(page.slug);
  const hooks = serviceHooks[base] ?? [
    "Commercial glazing needs straight talk on timing, security, and code—not a vague callback window.",
    "We explain what we can do tonight versus what waits on a measured order.",
  ];
  return pick(page.slug, "hook", hooks);
}

function localDemographicsSentence(page: SeoPage): string {
  const place = locationName(page);
  const f = factsForPage(page.area, "city");
  if (!f) return `In ${place}, loading zones and plaza parking rules shape how fast we can stage glass and door hardware.`;
  return pick(page.slug, "demo", [
    `${place} (${f.population}) mixes high-footfall strips such as ${f.neighbourhood} with landmark retail near ${f.landmark}.`,
    `Dispatch for ${place}—about ${f.population}—often stages trucks along ${f.neighbourhood} before rolling to sites by ${f.landmark}.`,
    `Property managers in ${place} (${f.population}) know ${f.landmark}; our crews plan parking around ${f.neighbourhood} plazas.`,
  ]);
}

function localClimateSentence(page: SeoPage): string {
  const place = locationName(page);
  const f = factsForPage(page.area, "city");
  if (!f) return `Seasonal weather in ${place} can stress older storefront seals—mention recent storms when you call.`;
  return pick(page.slug, "climate", [
    `Local climate note for ${place}: ${f.climate}`,
    `Around ${f.landmark}, ${f.climate.toLowerCase()}`,
    `${place} weather patterns matter—${f.climate}`,
  ]);
}

const closings = [
  `Call ${PHONE_DISPLAY} with the address, photos of the break, and whether the opening is exposed to weather.`,
  `Reach us at ${PHONE_DISPLAY}—tell us if you need board-up tonight and permanent glass later.`,
  `Dial ${PHONE_DISPLAY} for a clear timeline on security, measurement, and install.`,
];

export function introFor(page: SeoPage): string {
  const kw = keywordPhrase(page);
  const place = locationName(page);
  const parts: string[] = [];

  parts.push(hookFor(page));

  if (page.kind === "national") {
    parts.push(
      pick(`${page.slug}:${page.id}`, "nat1", [
        `This page is for anyone searching ${kw} across Canada—retail, restaurants, offices, and property managers with a broken opening.`,
        `We coordinate ${kw} from coast to coast, pairing emergency board-up with measured glass orders.`,
        `National ${kw} routing covers every province—share your postal code so we assign the nearest metro crew.`,
      ]),
    );
    parts.push(
      pick(`${page.slug}:${page.id}`, "nat2", [
        `Canadian winters, vandalism, and vehicle strikes all show up on our dispatch board—tell us which scenario you are in.`,
        `Ceiling height, door hardware, and whether the lite is tempered or laminated help us quote accurately.`,
        `Franchise and multi-site managers use this line for ${kw}—note brand standards if glass tint or logos matter.`,
      ]),
    );
    if (page.volume) {
      parts.push(
        pick(page.slug, "vol", [
          `Search demand for ${kw} stays high year-round—volume in the hundreds of monthly lookups reflects how often storefronts fail without warning.`,
          `When ${kw} spikes after holidays, early calls secure board-up slots before supplier queues grow.`,
        ]),
      );
    }
  } else if (page.kind === "city") {
    parts.push(
      pick(page.slug, "city-book", [
        `You are booking ${kw} in ${place}—crews know local parking bylaws and after-hours access for plazas.`,
        `This ${kw} visit in ${place} often means securing a corner unit before morning foot traffic.`,
      ]),
    );
    parts.push(localDemographicsSentence(page));
    parts.push(localClimateSentence(page));
    parts.push(
      pick(`${page.slug}:${page.id}`, "city-extra", [
        `If the break is on a door with panic hardware, mention it—we bring life-safety parts when needed.`,
        `Photos of the rail label and any remaining glass shards help us order the right thickness.`,
        `Night calls in ${place} need a site contact with keys—security desks at ${place} towers often require COI paperwork.`,
      ]),
    );
  }

  if (page.secondary.length) {
    parts.push(`Related searches such as ${page.secondary[0]} are handled on the same line.`);
  }

  parts.push(pick(page.slug, "close", closings));

  let text = parts.join(" ");
  const fillers = [
    ` We document measurements, board-up method, and install date in plain language.`,
    ` If you are unsure whether you need repair or full replacement, describe the crack pattern when you call.`,
    ` Insurance claims move faster when you have timestamps and photos—we can note them on the work order.`,
  ];
  let i = 0;
  while (wordCount(text) < 80 && i < fillers.length) {
    text += fillers[i++] ?? "";
  }
  return text;
}

function extraParagraph(page: SeoPage, salt: string): string {
  const kw = keywordPhrase(page);
  const place = locationName(page);
  return pick(page.slug, salt, [
    `Before we arrive for ${kw}, clear broken glass only if it is safe—leave sharp shards for the crew when possible.`,
    `Photos of the full opening from inside and outside help when ${place} addresses share a plaza sign.`,
    `If you are leasing in ${place || "Canada"}, notify your landlord—many require approved vendors for storefront work.`,
    `Keep customers away from hanging glass—tempered panels can collapse without warning.`,
    `Winter storms in Canada push more board-up calls; mention if heat is off in the space overnight.`,
  ]);
}

function padSections(page: SeoPage, sections: ContentSection[], intro: string): ContentSection[] {
  const target = wordTarget(page);
  const out = sections.map((s) => ({ ...s, paragraphs: [...s.paragraphs] }));
  let total = wordCount(intro) + out.reduce((n, s) => n + wordCount(s.paragraphs.join(" ")), 0);
  let salt = 0;
  while (total < target && salt < 60) {
    const idx = salt % out.length;
    out[idx].paragraphs.push(extraParagraph(page, `pad-${salt}`));
    total = wordCount(intro) + out.reduce((n, s) => n + wordCount(s.paragraphs.join(" ")), 0);
    salt++;
  }
  return out;
}

export function sectionsFor(page: SeoPage): ContentSection[] {
  const place = locationName(page);
  const kw = keywordPhrase(page);
  const intro = introFor(page);
  const sections: ContentSection[] = [];

  if (page.kind === "city") {
    sections.push({
      h2: `Why ${place} storefronts need a local plan for ${kw}`,
      paragraphs: [
        localDemographicsSentence(page),
        localClimateSentence(page),
        pick(`${page.slug}:${page.id}`, "local2", [
          `Plaza landlords often require COI and after-hours rules—share contact info for security or property management.`,
          `Corner units see more wind-driven debris; mention exposure when you book ${kw}.`,
          `Alley deliveries in ${place} can block crane access—tell us if the opening faces a laneway.`,
        ]),
      ],
    });
  } else {
    sections.push({
      h2: `${capitalizeSentence(kw)} routes we run weekly`,
      paragraphs: [
        pick(page.slug, "routes1", [
          `Dispatch groups ${kw} by metro so measurement and install crews are not crossing provinces unnecessarily.`,
          `We batch ${kw} board-ups at night when retail strips are quiet and parking is available.`,
        ]),
        pick(page.slug, "routes2", [
          `Holiday weekends spike break-in calls for ${kw}—book security glass or polycarbonate if you are closed several days.`,
          `Construction sites nearby sometimes vibrate older storefront seals—mention recent work next door.`,
        ]),
      ],
    });
    sections.push({
      h2: `How ${kw} works in Canada`,
      paragraphs: [
        pick(page.slug, "how1", [
          `Safety glass markings, wind load, and local bylaws matter—we confirm before ordering custom tempered sheets.`,
          `Property managers often need photos for insurance—we provide them after board-up and after install.`,
        ]),
        pick(page.slug, "how2", [
          `We do not remove the last stable lite without a plan to secure the opening the same day.`,
          `If replacement makes more sense than a risky repair, we say so before you pay for a short-term fix.`,
        ]),
      ],
    });
  }

  if (isUrgent(page)) {
    sections.push({
      h2: "When to call immediately",
      paragraphs: [
        `Hanging glass, exposed openings to weather, or a door that will not latch are urgent—say so on ${PHONE_DISPLAY}.`,
        `If anyone is injured, seek medical help first, then cordon off the area until the opening is secured.`,
      ],
    });
  }

  sections.push({
    h2: "What to tell us on the phone",
    paragraphs: [
      `Street address, unit or suite, ${kw} needs, and whether you need board-up before glass is cut.`,
      `Access notes for ${place || "your plaza"}—loading docks, elevator sizes, and security codes all affect routing.`,
    ],
  });

  sections.push({
    h2: "On site",
    paragraphs: [
      `We remove loose shards safely, board or glaze temporarily, and measure for ${kw} where permanent glass is required.`,
      `You get a verbal summary suitable for insurers, landlords, or franchise compliance teams.`,
    ],
  });

  sections.push({
    h2: "After the visit",
    paragraphs: [
      pick(page.slug, "after1", [
        `We confirm lead time on tempered orders and whether heat-soak or laminated glass is required.`,
        `If you need a different service in ${place || "Canada"}, ask on the call—we can often combine door and window work.`,
      ]),
      extraParagraph(page, "after2"),
    ],
  });

  return padSections(page, sections, intro);
}

export function faqsFor(page: SeoPage): FaqItem[] {
  const kw = keywordPhrase(page);
  const place = locationName(page);
  const areaLabel = place || "Canada";

  const base: FaqItem[] = [
    {
      q: pick(page.slug, "fq1", [
        `How much does ${kw} cost in ${areaLabel}?`,
        `What affects the price of ${kw} in ${areaLabel}?`,
        `Is ${kw} in ${areaLabel} priced per pane or per opening?`,
      ]),
      a: pick(page.slug, "fa1", [
        `Price depends on glass type, size, access, and whether board-up is needed tonight. Call ${PHONE_DISPLAY} with photos for a range before we book.`,
        `We do not publish one national price because door hardware and tempered thickness vary. ${PHONE_DISPLAY} outlines typical costs for ${areaLabel}.`,
      ]),
    },
    {
      q: pick(page.slug, "fq2", [
        `How soon can you do ${kw} in ${areaLabel}?`,
        `What is the lead time for ${kw} near ${areaLabel}?`,
        `Can you prioritize ${kw} if the opening is exposed in ${areaLabel}?`,
      ]),
      a: pick(page.slug, "fa2", [
        `Board-up can often happen the same night; custom glass depends on supplier lead times. Share urgency when you dial ${PHONE_DISPLAY}.`,
        `Exposed openings and security risks move you up the queue—say so clearly when you call ${PHONE_DISPLAY}.`,
      ]),
    },
    {
      q: pick(page.slug, "fq3", [
        `Do I need to be on site for ${kw} in ${areaLabel}?`,
        `Can you work with my property manager for ${kw} in ${areaLabel}?`,
        `What should I prepare before ${kw} in ${areaLabel}?`,
      ]),
      a: pick(page.slug, "fa3", [
        `Someone with keys and authority to approve board-up saves time. If you are remote, send a site contact—call ${PHONE_DISPLAY} either way.`,
        `Clear a path to the opening and note ceiling height limits for long glass panels.`,
      ]),
    },
    {
      q: pick(page.slug, "fq4", [
        `Is ${kw} in ${areaLabel} the same line as the rest of Canada?`,
        `Does this page change the phone number for ${kw}?`,
        `Can I book ${kw} for a franchise location in ${areaLabel}?`,
      ]),
      a: pick(page.slug, "fa4", [
        `Yes—${PHONE_DISPLAY} is the same nationwide. This page adds local context for ${areaLabel}.`,
        `Franchise and multi-site managers can book; tell us brand standards if glass tint or logo placement matters.`,
      ]),
    },
  ];

  if (page.kind === "city") {
    const f = factsForPage(page.area, "city");
    if (f) {
      base.push({
        q: `Does weather around ${f.landmark} affect storefront glass?`,
        a: `Yes—${f.climate} Mention recent storms or vandalism when you call ${PHONE_DISPLAY}.`,
      });
    }
  }

  return base.slice(0, Math.max(3, 4 + (page.id % 2)));
}

export function faqHeadingFor(page: SeoPage) {
  const place = locationName(page);
  if (page.kind === "city") return `FAQs about ${keywordPhrase(page)} in ${place}`;
  return `FAQs about ${keywordPhrase(page)} in Canada`;
}

export function heroLeadFor(page: SeoPage) {
  const kw = keywordPhrase(page);
  const place = locationName(page);
  if (page.kind === "city") {
    return pick(page.slug, "hero-lead", [
      `${capitalizeSentence(kw)} in ${place}—board-up tonight, measured glass when the panel is ready.`,
      `Broken opening in ${place}? We secure the site first, then order tempered or laminated ${kw} glass.`,
      `${place} crews for ${kw}: photos, access notes, and panic hardware details speed dispatch.`,
    ]);
  }
  return pick(page.slug, "hero-lead", [
    `${capitalizeSentence(kw)} across Canada—retail, restaurants, and offices on one emergency line.`,
    `National ${kw}: security first, then field measurements for code-compliant replacement glass.`,
    `From coast to coast, ${kw} dispatch pairs plywood or polycarbonate with permanent lites.`,
  ]);
}

export function breadcrumbLabels(page: SeoPage) {
  const place = locationName(page);
  const kw = capitalizeSentence(keywordPhrase(page));
  if (page.kind === "national") {
    return { hub: "Services", hubPath: "/services", parent: null, current: `${kw} Canada` };
  }
  return { hub: "Cities", hubPath: "/locations", parent: place, current: `${kw} ${place}` };
}
