import Link from "next/link";
import { products } from "@/data/products";
import { getTranslations } from "next-intl/server";
import {
  Gauge, CircleDot, Waves, Zap, Flower2, Wrench, ArrowDownToLine,
  Activity, ArrowRight, Droplets, Layers,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  "peripheral-pump": Gauge,
  "centrifugal-pump": CircleDot,
  "solar-pump-system": Waves,
  "deep-well-pump": Zap,
  "self-priming-jet-pump": Flower2,
  "submersible-sewage-pump": Wrench,
  "variable-frequency-pump": ArrowDownToLine,
  "multi-stage-pump-sets": Activity,
};

const PRODUCT_NUMBER = ["01", "02", "03", "04", "05", "06", "07", "08"];

const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  "peripheral-pump": "Peripheral Pump",
  "centrifugal-pump": "Centrifugal Pump",
  "solar-pump-system": "Solar Pump System",
  "deep-well-pump": "Deep Well Pumps",
  "self-priming-jet-pump": "Self-Priming Jet Pump",
  "submersible-sewage-pump": "Submersible Sewage Pumps",
  "variable-frequency-pump": "Variable Frequency Pumps",
  "multi-stage-pump-sets": "Multi-Stage Pumps & Pump Sets",
};

const productDescriptions: Record<string, string> = {
  "peripheral-pump": "High-head, pressure-boosting, precise delivery",
  "centrifugal-pump": "High efficiency & low noise, built for continuous operation.",
  "solar-pump-system": "Zero electricity costs, eco-friendly solution for remote irrigation",
  "deep-well-pump": "High head & stable performance, engineered for deep well extraction",
  "self-priming-jet-pump": "Excellent suction lift, perfect for wells and unstable water sources",
  "submersible-sewage-pump": "Versatile submersible solutions for both clean water and drainage",
  "variable-frequency-pump": "Smart control & energy-saving, stable performance for long-lasting operation",
  "multi-stage-pump-sets": "High head & constant pressure, engineered for high-rise water supply",
};

export default async function ProductsSection({ locale }: { locale: string }) {
  const t = await getTranslations("products");
  const basePath = locale === "en" ? "" : `/${locale}`;

  return (
    <section id="products" className="relative py-20 overflow-hidden bg-bg-primary">
      {/* Tech grid bg */}
      <div className="absolute inset-0 tech-grid-bg-light" />
      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="tech-badge mb-4 inline-block">PRODUCT SOLUTIONS</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mt-5">
            <span className="text-white">OUR </span>
            <span className="gradient-text">PRODUCT SOLUTIONS</span>
          </h2>
          <p className="text-text-tertiary mt-5 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Engineered for performance. Built for reliability. Trusted around the world.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => {
            const Icon = ICON_MAP[product.slug] || Gauge;
            const number = PRODUCT_NUMBER[index];
            const desc = productDescriptions[product.slug] || product.subtitle;
            const displayName = PRODUCT_DISPLAY_NAMES[product.slug] || product.name;

            return (
              <Link
                key={product.slug}
                href={`${basePath}/products/${product.slug}`}
                className="group relative rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 glow-border bg-bg-card"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                  style={{
                    boxShadow: "0 0 30px rgba(0,229,255,0.08), inset 0 0 30px rgba(0,229,255,0.03)",
                  }}
                />

                {/* Image area */}
                <div className="relative h-52 flex items-center justify-center overflow-hidden bg-bg-elevated">
                  {/* Image bg glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.06), transparent 70%)" }}
                  />

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center z-10"
                    style={{
                      background: "rgba(0,229,255,0.08)",
                      border: "1px solid rgba(0,229,255,0.2)",
                    }}
                  >
                    <Icon size={18} className="text-accent-cyan" />
                  </div>

                  <img
                    src={product.image}
                    alt={displayName}
                    className="relative z-[1] max-h-44 max-w-[85%] w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Card content */}
                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xs font-bold tabular-nums text-accent-cyan">{number}</span>
                    <h3 className="text-white font-bold text-[15px] leading-snug group-hover:text-accent-cyan transition-colors duration-300">
                      {displayName}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">{desc}</p>
                  <div className="flex items-center gap-1.5 text-accent-cyan text-sm font-semibold">
                    <span className="group-hover:underline underline-offset-2 transition-all">{t("viewProducts")}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:translate-x-1"
                      style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)" }}
                    >
                      <ArrowRight size={12} className="text-accent-cyan" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="mt-14 flex justify-center">
          <div className="section-divider w-32" />
        </div>
      </div>
    </section>
  );
}
