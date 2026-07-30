import { getTranslations } from "next-intl/server";
import { ShieldCheck, Globe, CheckCircle, TrendingUp } from "lucide-react";

const certifications = [
  { key: "iso9001", color: "#00E5FF", img: "/images/certifications/iso9001.png" },
  { key: "ce", color: "#7C3AED", img: "/images/certifications/ce.png" },
  { key: "rohs", color: "#00E5FF", img: "/images/certifications/rohs.png" },
  { key: "tuv", color: "#7C3AED", img: "/images/certifications/tuv.png" },
];

const stats = [
  { key: "standards", color: "#00E5FF", Icon: ShieldCheck },
  { key: "countries", color: "#7C3AED", Icon: Globe },
  { key: "quality", color: "#00E5FF", Icon: CheckCircle },
  { key: "annual", color: "#7C3AED", Icon: TrendingUp },
];

export default async function CertificatesStandards() {
  const t = await getTranslations("certificates");

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 tech-grid-bg-light" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.02]"
        style={{ background: "radial-gradient(circle, #00E5FF, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tech-badge mb-4 inline-block">{t("label")}</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-white">{t("titleLine1")}</span>{" "}
            <span className="gradient-text">{t("titleLine2")}</span>
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Cert Badges 2x2 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert) => (
              <div key={cert.key} className="group glow-border bg-bg-card rounded-xl overflow-hidden">
                <div className="aspect-[3/4] relative overflow-hidden bg-white/[0.01] p-6 flex items-center justify-center">
                  <img
                    src={cert.img}
                    alt={t(`certs.${cert.key}.title`)}
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bg-card/80 to-transparent pointer-events-none" />
                </div>
                <div className="border-t border-border-default p-4 text-center">
                  <span className="text-white text-sm font-bold tracking-wide">
                    {t(`certs.${cert.key}.label`)}
                  </span>
                  <p className="text-text-secondary text-xs mt-0.5">{t(`certs.${cert.key}.title`)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detail row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {certifications.map((cert) => (
              <div key={`detail-${cert.key}`} className="flex items-start gap-3 p-4 bg-bg-card/50 border border-border-subtle rounded-lg hover:border-border-glow transition-all">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: cert.color }} />
                <div>
                  <h4 className="text-white text-xs font-semibold mb-1">{t(`certs.${cert.key}.desc`)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-bg-card border border-border-default rounded-xl overflow-hidden p-8">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, #00E5FF 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
          <div className="relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s) => {
                const StatIcon = s.Icon;
                return (
                  <div key={s.key} className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}
                    >
                      <StatIcon className="w-6 h-6" style={{ color: s.color }} strokeWidth={1.5} />
                    </div>
                    <div className="text-xl font-bold mb-1 stat-glow" style={{ color: s.color }}>
                      {t(`stats.${s.key}`)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
