import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

export default async function NewsSection({ locale }: { locale: string }) {
  const t = await getTranslations("news");
  const basePath = locale === "en" ? "" : `/${locale}`;

  const newsItems = [
    { slug: "iso-certification-renewed", category: "company" },
    { slug: "dubai-exhibition-2025", category: "company" },
    { slug: "water-pump-selection-guide", category: "knowledge" },
  ];

  return (
    <section id="news" className="py-20 bg-bg-primary relative">
      <div className="absolute inset-0 tech-grid-bg-light" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="tech-badge mb-3 inline-block">{t("subtitle")}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">{t("title")}</h2>
          </div>
          <Link
            href={`${basePath}/news`}
            className="hidden sm:flex items-center gap-1 text-accent-cyan font-medium hover:gap-2 transition-all"
          >
            {t("readMore")} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`${basePath}/news/${item.slug}`}
              className="group glow-border bg-bg-card rounded-xl overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 flex items-center justify-center">
                <span className="text-5xl text-accent-cyan/10 font-bold font-mono">{i + 1}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm mb-3">
                  <span className="tech-badge text-[10px]">
                    {item.category === "company" ? "Company" : "Knowledge"}
                  </span>
                </div>
                <h3 className="font-bold text-white group-hover:text-accent-cyan transition-colors">
                  News Article {i + 1}
                </h3>
                <p className="text-sm text-text-secondary mt-2">Read the full article on our knowledge center.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
