import Image from "next/image";
import Link from "next/link";
import type { ImageKey } from "@/lib/images";
import { getPhoto } from "@/lib/images";

type PhotoCardProps = {
  href: string;
  title: string;
  subtitle?: string;
  imageKey: ImageKey;
};

export function PhotoCard({ href, title, subtitle, imageKey }: PhotoCardProps) {
  const photo = getPhoto(imageKey);
  return (
    <Link href={href} className="tile-card">
      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" className="tile-card-img" />
      <div className="tile-card-bar">
        <span className="tile-card-title">{title}</span>
        {subtitle && <span className="tile-card-sub">{subtitle}</span>}
      </div>
    </Link>
  );
}
