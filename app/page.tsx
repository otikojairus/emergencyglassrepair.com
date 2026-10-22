import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PhotoCard } from "@/components/photo-card";
import { JsonLd } from "@/components/visuals";
import { getPhoto, imageForServiceSlug } from "@/lib/images";
import { cityLocationEntries } from "@/lib/locations";
import { NATIONAL_PAGES, PHONE_DISPLAY, PHONE_E164, PILLAR_SLUG, SITE_NAME, absoluteUrl } from "@/lib/pages";
import { pageLinkLabel } from "@/lib/link-labels";
import { FaqSection } from "@/components/faq-section";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle(`Emergency Glass Repair Canada | 24/7 Board-Up`),
  description: trimDescription(
    `Broken storefront or door glass? Board-up and measured replacement across Canada. Call ${PHONE_DISPLAY} any time.`,
  ),
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "Do you board up before glass arrives?",
    a: "Yes—security comes first. We secure the opening with plywood or polycarbonate, then measure for tempered or laminated replacement.",
  },
  {
    q: "Which cities do you cover?",
    a: "Major metros from Toronto and Vancouver to Calgary and Halifax. Open the Cities page or call " + PHONE_DISPLAY + " with your address.",
  },
  {
    q: "What should I send when I call?",
    a: "Street address, photos of the break, whether the door must latch tonight, and any property manager contact.",
  },
];

const featured = NATIONAL_PAGES.filter((p) => p.slug === PILLAR_SLUG || p.priority === "High" || p.priority === "Top Priority").slice(0, 6);

export default function HomePage() {
  const cities = cityLocationEntries();

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: absoluteUrl(),
            telephone: PHONE_E164,
            areaServed: "Canada",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />

      <PageHero
        variant="home"
        kicker="Canada · 24/7"
        title="Broken glass? Secure the opening first."
        lead={
          <p>
            Storefronts, commercial doors, and plaza entries—we dispatch board-up crews and glaziers who speak security, insurance, and building code—not scripts.
          </p>
        }
        ctaLabel="Call now"
        secondaryHref="/locations"
        secondaryLabel="Pick your city"
      />

      <section className="panel panel--ice">
        <div className="wrap">
          <h2>What we handle</h2>
          <p className="lede">Start with the closest service. If two apply—say a shattered door and a cracked fixed lite—mention both.</p>
          <ul className="tile-grid">
            {featured.map((page) => {
              const photo = getPhoto(imageForServiceSlug(page.slug));
              return (
                <li key={page.slug}>
                  <PhotoCard
                    href={`/${page.slug}`}
                    title={pageLinkLabel(page)}
                    subtitle={photo.caption}
                    imageKey={imageForServiceSlug(page.slug)}
                  />
                </li>
              );
            })}
            <li>
              <PhotoCard href="/services" title="All services" subtitle="Full list" imageKey="hero-service" />
            </li>
          </ul>
        </div>
      </section>

      <section className="panel">
        <div className="wrap">
          <h2>Metro dispatch</h2>
          <p className="lede">City pages focus on local access and weather—not a repeat of every service name.</p>
          <ul className="city-grid">
            {cities.slice(0, 12).map((c) => (
              <li key={c.href}>
                <Link href={c.href}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/locations">All cities</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="panel panel--ice">
        <div className="wrap">
          <FaqSection title="Quick answers" items={homeFaqs} />
        </div>
      </section>
    </main>
  );
}
