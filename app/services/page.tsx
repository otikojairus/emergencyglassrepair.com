import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/visuals";
import { getPhoto, imageForServiceSlug } from "@/lib/images";
import { NATIONAL_PAGES, PHONE_DISPLAY, PHONE_E164, SITE_NAME, absoluteUrl } from "@/lib/pages";
import { pageLinkLabel } from "@/lib/link-labels";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle(`Commercial Glass Services Canada | ${SITE_NAME}`),
  description: trimDescription(
    `Emergency glass repair, storefront replacement, commercial doors, and board-up across Canada. Pick a service below or call ${PHONE_DISPLAY} to secure your opening tonight.`,
  ),
  alternates: { canonical: "/services" },
};

const servicesIntro =
  "Every national service page below covers one job type—emergency board-up, measured storefront replacement, commercial door glass, or 24-hour security work. " +
  "Start with the closest match to your opening; if a shattered door and a cracked fixed lite both need attention, tell dispatch on the same call so we load the right tempered sheets and hardware. " +
  "Canadian plazas, restaurants, and office towers share the same phone line—share your address, photos, and whether the site must latch before morning.";

const indexFaqs = [
  {
    q: "Board-up vs replacement—which comes first?",
    a: "Security first. We board or glaze temporarily, measure tempered or laminated glass, then install when the panel is ready.",
  },
  {
    q: "Can one visit cover door and window glass?",
    a: "Often yes—tell dispatch about both openings so we bring the right hardware and glass samples.",
  },
  {
    q: "How do I book?",
    a: "Pick the closest service below, then call " + PHONE_DISPLAY + " with photos of the damage.",
  },
];

const breadcrumbs = [
  { name: "Home", href: absoluteUrl() },
  { name: "Services", href: absoluteUrl("services") },
];

export default function ServicesPage() {
  const hero = getPhoto("hero-service");

  return (
    <main>
      <BreadcrumbJsonLd crumbs={breadcrumbs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: indexFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />

      <nav className="breadcrumb wrap" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Services</span>
      </nav>

      <header className="page-intro">
        <div className="wrap">
          <div className="inline-photo">
            <Image src={hero.src} alt={hero.alt} fill sizes="100vw" priority />
          </div>
          <p className="eyebrow">Services</p>
          <h1>Commercial glazing services in Canada</h1>
          <p className="lede">{servicesIntro}</p>
          <a className="btn btn-primary" href={`tel:${PHONE_E164}`}>
            <span className="btn-value">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      <div className="wrap">
        <h2 className="content-section">All national services</h2>
        <div className="service-list">
          {NATIONAL_PAGES.map((page) => {
            const key = imageForServiceSlug(page.slug);
            const img = getPhoto(key);
            return (
              <Link href={`/${page.slug}`} key={page.slug} className="service-row">
                <div className="service-row-thumb">
                  <Image src={img.src} alt={img.alt} fill sizes="120px" loading="lazy" />
                </div>
                <div>
                  <h3>{pageLinkLabel(page)}</h3>
                  <p>{img.caption}</p>
                </div>
                <span className="service-row-arrow" aria-hidden="true">→</span>
              </Link>
            );
          })}
        </div>

        <FaqSection title="Questions" items={indexFaqs} />
      </div>
    </main>
  );
}
