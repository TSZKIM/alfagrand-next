import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Home, Leaf, Building2, Sun, Factory, Droplets, ShieldCheck, Zap, Wrench, Headphones, Globe } from "lucide-react";

export default async function ApplicationIndustries() {
  const t = await getTranslations("industries");

  // Product name fragments → category slug mapping (p1..p3 keys use these for href)
  const productSlugMap: Record<string, string> = {
    "Peripheral Pump": "peripheral-pump",
    "Self-Priming Jet Pump": "self-priming-jet-pump",
    "Variable Frequency Pump": "variable-frequency-pump",
    "Multi-stage Pump & Pump Sets": "multi-stage-pump-sets",
    "Multi-stage Pump": "multi-stage-pump-sets",
    "Centrifugal Pump": "centrifugal-pump",
    "Deep Well Pump": "deep-well-pump",
    "Solar Pump System": "solar-pump-system",
    "Submersible Sewage Pump": "submersible-sewage-pump",
  };

  const cards = [
    { num: "01", icon: Home, key: "residential", productCount: 3, img: "/images/industries/residential.jpg" },
    { num: "02", icon: Leaf, key: "agricultural", productCount: 3, img: "/images/industries/agricultural.jpg" },
    { num: "03", icon: Building2, key: "commercial", productCount: 3, img: "/images/industries/commercial.jpg" },
    { num: "04", icon: Sun, key: "solar", productCount: 2, img: "/images/industries/solar.jpg" },
    { num: "05", icon: Factory, key: "industrial", productCount: 3, img: "/images/industries/wastewater.jpg" },
    { num: "06", icon: Droplets, key: "wastewater", productCount: 2, img: "/images/industries/irrigation.jpg" },
  ] as const;

  const features = [
    { icon: ShieldCheck, key: "reliable" },
    { icon: Zap, key: "efficient" },
    { icon: Wrench, key: "maintenance" },
    { icon: Headphones, key: "support" },
    { icon: Globe, key: "global" },
  ];

  return (
    <section id="industries" className="relative py-20 sm:py-28 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 tech-grid-bg-light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="tech-badge mb-4 inline-block">{t("label")}</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-white">{t("titleLine1")}</span>{" "}
            <span className="gradient-text">{t("titleLine2")}</span>
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 6 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            const products = Array.from(
              { length: card.productCount },
              (_, i) => t(`cards.${card.key}.p${i + 1}`)
            );
            return (
              <div key={card.key} className="group glow-border bg-bg-card rounded-xl overflow-hidden">
                <div className="aspect-[16/10] bg-bg-elevated relative overflow-hidden">
                  <img
                    src={card.img}
                    alt={t(`cards.${card.key}.title`)}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-bg-card/90 border border-border-default rounded-lg px-2.5 py-1 z-10">
                    <span className="text-accent-cyan/60 text-xs font-mono font-semibold">{card.num}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-base font-semibold mb-2 group-hover:text-accent-cyan transition-colors">
                    {t(`cards.${card.key}.title`)}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {t(`cards.${card.key}.desc`)}
                  </p>
                  <div>
                    <p className="text-accent-cyan/70 text-xs font-medium mb-2 tracking-wide">
                      {t("suitableProducts")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {products.map((product, i) => {
                        const slug = productSlugMap[product] || "products";
                        return (
                          <Link key={i} href={`/products/${slug}`}
                            className="text-xs text-text-secondary bg-bg-elevated border border-border-default rounded-full px-2.5 py-1 hover:text-accent-cyan hover:border-border-glow transition-colors"
                          >
                            {product}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom feature bar */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.key} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg hover:bg-bg-card transition-colors">
                <div className="w-10 h-10 rounded-full bg-bg-card border border-border-default flex items-center justify-center">
                  <Icon className="w-4 h-4 text-accent-cyan/60" strokeWidth={1.5} />
                </div>
                <span className="text-text-secondary text-xs font-medium">{t(`features.${feat.key}`)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
