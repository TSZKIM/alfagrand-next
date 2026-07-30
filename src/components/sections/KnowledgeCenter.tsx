import { getTranslations } from "next-intl/server";
import { BarChart3, Wrench, Building2, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default async function KnowledgeCenter({ locale }: { locale: string }) {
  const t = await getTranslations("knowledge");
  const newsPath = `/${locale}/news`;

  const categories = [
    { key: "technical", icon: BarChart3, color: "#00E5FF" },
    { key: "maintenance", icon: Wrench, color: "#7C3AED" },
    { key: "solutions", icon: Building2, color: "#00E5FF" },
  ];

  const articles = [
    { key: "deepWell", date: "May 12, 2024", readTime: "8 min read", img: "/images/knowledge/maintenance.jpg" },
    { key: "centrifugal", date: "Apr 28, 2024", readTime: "6 min read", img: "/images/knowledge/energy-efficiency.jpg" },
    { key: "performance", date: "Apr 15, 2024", readTime: "7 min read", img: "/images/knowledge/solutions.jpg" },
  ];

  return (
    <section id="knowledge" className="relative py-20 sm:py-28 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 tech-grid-bg-light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="tech-badge mb-4 inline-block">{t("label")}</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t("titleLine1")} <span className="gradient-text">{t("titleLine2")}</span>
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 3 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const articles_list = (t.raw(`categories.${cat.key}.articles`) as string[]) || [];
            return (
              <div key={cat.key} className="glow-border bg-bg-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}10` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wide">
                    {t(`categories.${cat.key}.title`)}
                  </h3>
                </div>
                <p className="text-text-secondary text-xs leading-relaxed mb-5">
                  {t(`categories.${cat.key}.desc`)}
                </p>
                <ul className="space-y-3 mb-6">
                  {Array.isArray(articles_list) && articles_list.map((article, i) => (
                    <li key={i}>
                      <Link href={newsPath} className="flex items-start gap-2 group/item text-text-secondary hover:text-accent-cyan text-xs transition-colors leading-relaxed">
                        <span className="mt-1.5 block w-1 h-1 rounded-full bg-border-emphasis shrink-0 group-hover/item:bg-accent-cyan transition-colors" />
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={newsPath} className="inline-flex items-center gap-1.5 text-accent-cyan/70 hover:text-accent-cyan text-xs font-medium transition-colors">
                  {t(`categories.${cat.key}.viewAll`)} <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Latest Articles */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-white text-xl sm:text-2xl font-bold">{t("latestTitle")}</h3>
              <p className="text-text-secondary text-sm mt-2">{t("latestSubtitle")}</p>
            </div>
            <Link href={newsPath} className="hidden sm:inline-flex items-center gap-1.5 text-accent-cyan/70 hover:text-accent-cyan text-sm font-medium transition-colors">
              {t("viewAll")} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {articles.map((article) => (
              <Link key={article.key} href={newsPath} className="group glow-border bg-bg-card rounded-xl overflow-hidden">
                <div className="aspect-[16/10] bg-bg-elevated overflow-hidden relative">
                  <img
                    src={article.img}
                    alt={t(`articles.${article.key}.title`)}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/30 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-text-tertiary mb-2">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border-emphasis" />
                    <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                  </div>
                  <h4 className="text-white text-sm font-semibold leading-snug group-hover:text-accent-cyan transition-colors">
                    {t(`articles.${article.key}.title`)}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
