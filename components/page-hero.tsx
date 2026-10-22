import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/images";
import { getPhoto } from "@/lib/images";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/pages";

type PageHeroProps = {
  kicker?: string;
  title: string;
  lead: ReactNode;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "home" | "page";
  imageKey?: ImageKey;
};

export function PageHero({
  kicker,
  title,
  lead,
  ctaLabel = "Call now",
  secondaryHref,
  secondaryLabel,
  variant = "page",
  imageKey = "hero-service",
}: PageHeroProps) {
  const photo = getPhoto(variant === "home" ? "hero-home" : imageKey);

  return (
    <section className={`shard-hero shard-hero--${variant}`}>
      <div className="shard-hero-copy">
        {kicker && <p className="shard-kicker">{kicker}</p>}
        <h1>{title}</h1>
        <div className="shard-lead">{lead}</div>
        <div className="shard-actions">
          <a className="btn btn-amber" href={`tel:${PHONE_E164}`}>
            <span className="btn-label">{ctaLabel}</span>
            <span className="btn-value">{PHONE_DISPLAY}</span>
          </a>
          {secondaryHref && secondaryLabel && (
            <Link className="btn btn-ghost" href={secondaryHref}>{secondaryLabel}</Link>
          )}
        </div>
      </div>
      <div className="shard-hero-visual">
        <div className="shard-frame">
          <Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 900px) 100vw, 50vw" className="shard-img" />
        </div>
        <p className="shard-caption">{photo.caption}</p>
      </div>
    </section>
  );
}
