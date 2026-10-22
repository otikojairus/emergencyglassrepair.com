"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { PHONE_DISPLAY, PHONE_E164, SITE_NAME } from "@/lib/pages";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Cities" },
  { href: "/emergency-glass-repair", label: "Emergency" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="alert-strip">
        <div className="wrap alert-strip-inner">
          <span>24/7 board-up and emergency glass</span>
          <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
        </div>
      </div>
      <header className="masthead">
        <div className="wrap masthead-row">
          <Link href="/" className="masthead-logo" onClick={() => setOpen(false)} aria-label={`${SITE_NAME} home`}>
            <BrandLogo />
          </Link>
          <nav className={`masthead-nav ${open ? "is-open" : ""}`} aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="masthead-phone" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
          <button type="button" className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            Menu
          </button>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-grid">
        <div>
          <BrandLogo />
          <p className="site-footer-blurb">
            Emergency storefront glass, commercial doors, and board-up across Canada. One number for security tonight and measured glass tomorrow.
          </p>
        </div>
        <div className="site-footer-cols">
          <div>
            <p className="site-footer-label">Urgent</p>
            <Link href="/board-up-services">Board-up</Link>
            <Link href="/24-hour-glass-repair">24 hour glass</Link>
          </div>
          <div>
            <p className="site-footer-label">Cities</p>
            <Link href="/locations">All metros</Link>
            <Link href="/emergency-glass-repair-toronto">Toronto</Link>
            <Link href="/emergency-glass-repair-vancouver">Vancouver</Link>
          </div>
        </div>
        <a className="site-footer-call" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
      </div>
      <div className="wrap site-footer-meta">
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
      </div>
    </footer>
  );
}

export function StickyMobileCta() {
  return (
    <div className="mobile-dial">
      <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
    </div>
  );
}
