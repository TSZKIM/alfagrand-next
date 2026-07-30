import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type Crumb = {
  label: string;
  href: string;
};

type Props = {
  items: Crumb[];
  locale: string;
};

export default function Breadcrumbs({ items, locale }: Props) {
  const baseUrl = "https://alfagrandpumps.com";
  const langPath = locale === "en" ? "" : `/${locale}`;

  const allItems: Crumb[] = [
    { label: "Home", href: langPath || "/" },
    ...items,
  ];

  // BreadcrumbList Schema.org
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${baseUrl}${langPath}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-tertiary py-3">
        <Link
          href={langPath || "/"}
          className="hover:text-accent-cyan transition-colors flex items-center gap-1"
        >
          <Home size={13} />
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-border-emphasis" />
            {i === items.length - 1 ? (
              <span className="text-accent-cyan/80 font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-accent-cyan transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
