import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/visuals";
import { getPhoto } from "@/lib/images";
import { cityLocationEntries } from "@/lib/locations";
import { PHONE_DISPLAY, PHONE_E164, SITE_NAME, absoluteUrl } from "@/lib/pages";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle(`Emergency Glass Repair Cities | ${SITE_NAME}`),
  description: trimDescription(
    `Emergency glass repair in Toronto, Vancouver, Calgary, Montreal, and metros across Canada. Open your city page for local notes, then call ${PHONE_DISPLAY} when you need board-up tonight.`,
  ),
  alternates: { canonical: "/locations" },
};

const locationsIntro =
  "Metro pages focus on how crews reach your storefront—not a repeat of every national service name. " +
  "Each city link below opens emergency glass repair for that area with neighbourhood context, landmark routing, and climate notes that affect tempered glass and aluminum doors. " +
  "If your suburb is not listed, call with your street address; most pages cover the wider urban region. " +
  "Have photos of the break, panic hardware details, and property manager contacts ready when you dial.";

const locFaqs = [
  {
    q: "My suburb is not listed—can you still come?",
    a: "Usually yes. Metro pages cover the wider urban area. Call " + PHONE_DISPLAY + " with your street address.",
  },
  {
    q: "Why is each city only one page?",
    a: "You land on emergency glass for your city. National service pages cover storefront, doors, and board-up for all of Canada.",
  },
  {
    q: "Do you work after hours?",
    a: "Yes—board-up and security work runs 24/7. Permanent glass install may follow supplier lead times.",
  },
];

const breadcrumbs = [
  { name: "Home", href: absoluteUrl() },
  { name: "Cities", href: absoluteUrl("locations") },
];

export default function LocationsPage() {
  const cities = cityLocationEntries();
  const photo = getPhoto("hero-local");

  return (
    <main>
      <BreadcrumbJsonLd crumbs={breadcrumbs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: locFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />

      <nav className="breadcrumb wrap" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Cities</span>
      </nav>

      <header className="page-intro">
        <div className="wrap">
          <div className="inline-photo">
            <Image src={photo.src} alt={photo.alt} fill sizes="100vw" priority />
          </div>
          <p className="eyebrow">Cities</p>
          <h1>Emergency glass repair by Canadian metro</h1>
          <p className="lede">{locationsIntro}</p>
          <a className="btn btn-primary" href={`tel:${PHONE_E164}`}>
            <span className="btn-value">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      <div className="wrap panel">
        <h2 className="content-section">Choose your city</h2>
        <ul className="city-grid">
          {cities.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <section className="panel panel--ice">
        <div className="wrap">
          <FaqSection title="Before you call" items={locFaqs} />
        </div>
      </section>
    </main>
  );
}
