import { getTranslations } from "next-intl/server";
import { Cpu, Cog, Gauge, ClipboardCheck, Wrench, Truck } from "lucide-react";

export default async function ManufacturingCapability() {
  const t = await getTranslations("manufacturing");

  const cards = [
    { icon: Cpu, key: "cnc", img: "/images/manufacturing/cnc.jpg" },
    { icon: Cog, key: "automated", img: "/images/manufacturing/automated.jpg" },
    { icon: Gauge, key: "testing", img: "/images/manufacturing/testing.jpg" },
    { icon: ClipboardCheck, key: "quality", img: "/images/manufacturing/quality.jpg" },
    { icon: Wrench, key: "assembly", img: "/images/manufacturing/assembly.jpg" },
    { icon: Truck, key: "warehouse", img: "/images/manufacturing/warehouse.jpg" },
  ];

  const stats = [
    { value: "5000+", unit: "m²", labelKey: "stats.area" },
    { value: "200+", labelKey: "stats.employees" },
    { value: "20+", labelKey: "stats.experience" },
    { value: "100%", labelKey: "stats.tested" },
    { value: "8+", labelKey: "stats.lines" },
    { value: "30+", labelKey: "stats.equipment" },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 tech-grid-bg-light" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.02]"
        style={{ background: "radial-gradient(circle, #00E5FF, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tech-badge mb-4 inline-block">{t("label")}</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.rich("title", {
              bold1: (chunks: any) => <span className="gradient-text">{chunks}</span>,
              bold2: (chunks: any) => <span className="gradient-text">{chunks}</span>,
            })}
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 6 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.key} className="group glow-border bg-bg-card rounded-xl overflow-hidden">
                <div className="aspect-[16/10] bg-bg-elevated relative overflow-hidden">
                  <img
                    src={card.img}
                    alt={t(`cards.${card.key}.title`)}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-bg-card/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border-default">
                      <Icon className="w-4 h-4 text-accent-cyan" strokeWidth={1.5} />
                      <span className="text-accent-cyan/80 text-xs tracking-wider uppercase font-medium">
                        {t(`cards.${card.key}.title`)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-base font-semibold mb-2 group-hover:text-accent-cyan transition-colors">
                    {t(`cards.${card.key}.title`)}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`cards.${card.key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="bg-bg-card border border-border-default rounded-lg p-4 text-center hover:border-border-glow transition-colors">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-accent-cyan stat-glow">{stat.value}</span>
                {stat.unit && <span className="text-xs text-text-tertiary">{stat.unit}</span>}
              </div>
              <p className="mt-1 text-xs text-text-secondary leading-tight">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-text-tertiary text-sm max-w-4xl mx-auto leading-relaxed">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
