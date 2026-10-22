import { JsonLd } from "@/components/visuals";

export type Crumb = { name: string; href: string };

export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.href,
        })),
      }}
    />
  );
}
