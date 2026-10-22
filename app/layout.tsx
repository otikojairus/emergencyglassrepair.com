import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteFooter, SiteHeader, StickyMobileCta } from "@/components/site-chrome";
import { absoluteUrl, SITE_NAME } from "@/lib/pages";
import "./globals.css";

const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "700"], display: "swap" });
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: { default: "Emergency Glass Repair Canada | Board-Up & Storefront", template: "%s" },
  description: "24/7 emergency glass repair, storefront replacement, and board-up services across Canada. Call to secure your opening.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_NAME,
    title: "Emergency Glass Repair Canada",
    description: "National emergency glazing with city dispatch across Canada.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${body.variable} ${display.variable}`}>
      <body>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <StickyMobileCta />
      </body>
    </html>
  );
}
