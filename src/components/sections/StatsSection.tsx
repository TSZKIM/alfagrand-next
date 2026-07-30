import { getTranslations } from "next-intl/server";

export default async function StatsSection() {
  const t = await getTranslations("hero");

  const stats = [
    { value: "8+", label: t("stats.years") },
    { value: "50+", label: t("stats.countries") },
    { value: "$18M+", label: t("stats.turnover") },
    { value: "700 TEU", label: t("stats.shipping") },
  ];

  return (
    <section className="py-16 bg-bg-secondary">
      <div className="absolute inset-0 tech-grid-bg-light" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold gradient-text stat-glow">{stat.value}</div>
              <div className="text-text-secondary mt-2 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
