import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FileText, MessageSquare, Factory, Calendar, Globe, Package, Settings } from "lucide-react";

export default async function CTASection() {
  const t = await getTranslations("cta");

  const actions = [
    { key: "quote", icon: FileText, accent: "#00E5FF", glowHex: "rgba(0,229,255,0.2)" },
    { key: "whatsapp", icon: MessageSquare, accent: "#7C3AED", glowHex: "rgba(124,58,237,0.2)" },
    { key: "oem", icon: Factory, accent: "#00E5FF", glowHex: "rgba(0,229,255,0.2)" },
  ];

  const stats = [
    { value: "20+", labelKey: "stats.experience", icon: Calendar, color: "#00E5FF" },
    { value: "50+", labelKey: "stats.countries", icon: Globe, color: "#7C3AED" },
    { value: "100+", labelKey: "stats.models", icon: Package, color: "#00E5FF" },
    { value: "OEM/ODM", labelKey: "stats.oem", icon: Settings, color: "#7C3AED" },
  ];

  return (
    <section className="relative bg-bg-primary overflow-hidden py-20">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #00E5FF 0%, #7C3AED 50%, transparent 70%)" }}
      />
      <div className="absolute inset-0 tech-grid-bg-light" />

      <div className="relative z-10">
        {/* Hero title area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <span className="tech-badge mb-4 inline-block">{t("label")}</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-white">{t("titleLine1")}</span>{" "}
            <span className="gradient-text">{t("titleLine2")}</span>
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Action Cards Grid — 3 columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.key} className="glass-card p-6 flex flex-col hover:border-border-glow transition-all duration-300 group">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center border-2"
                      style={{
                        backgroundColor: `${action.accent}10`,
                        borderColor: `${action.accent}40`,
                        boxShadow: `0 0 20px ${action.glowHex}`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: action.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wide" style={{ color: action.accent }}>
                      {t(`actions.${action.key}.title`)}
                    </h3>
                  </div>

                  <p className="text-text-secondary text-xs leading-relaxed mb-5 flex-1">
                    {t(`actions.${action.key}.desc`)}
                  </p>

                  {/* Image */}
                  <div className="mb-5 rounded-xl overflow-hidden border border-border-default aspect-[4/3]">
                    {action.key === "quote" && (
                      <img src="/images/cta/quote-form.jpg" alt="Get a Quote" className="w-full h-full object-cover" />
                    )}
                    {action.key === "whatsapp" && (
                      <img src="/images/cta/whatsapp-chat.jpg" alt="WhatsApp Chat" className="w-full h-full object-cover" />
                    )}
                    {action.key === "oem" && (
                      <img src="/images/cta/oem-wireframe.jpg" alt="OEM & ODM" className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={action.key === "whatsapp" ? "https://wa.me/8618657933982" : action.key === "oem" ? "/oem" : "/contact"}
                    target={action.key === "whatsapp" ? "_blank" : undefined}
                    rel={action.key === "whatsapp" ? "noopener noreferrer" : undefined}
                    className="w-full text-center text-white text-xs font-semibold py-3 rounded-lg transition-all hover:opacity-90 shadow-lg uppercase tracking-wide mb-3"
                    style={{ background: `linear-gradient(135deg, ${action.accent}, ${action.accent}cc)` }}
                  >
                    {t(`actions.${action.key}.btn`)}
                  </a>

                  <p className="text-text-tertiary text-[10px] text-center tracking-wide uppercase">
                    {action.key === "quote" ? "Fast Response" : action.key === "whatsapp" ? "Instant Chat" : "Tailored Solutions"}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div className="mt-12">
            <div className="glass-card p-6 sm:p-8 rounded-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={stat.labelKey} className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
                      >
                        <StatIcon className="w-5 h-5" style={{ color: stat.color }} strokeWidth={1.5} />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold stat-glow" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider -mt-1">
                        {t(stat.labelKey)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
