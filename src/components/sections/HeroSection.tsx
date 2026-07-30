import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Award, Globe, Wrench, ShieldCheck, ArrowRight, Download } from "lucide-react";

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default async function HeroSection() {
  const t = await getTranslations("hero");

  const stats = [
    { icon: Award, value: "20+", label: t("stats.years") },
    { icon: Globe, value: "50+", label: t("stats.countries") },
    { icon: Wrench, value: "OEM&ODM", label: t("stats.service.label") },
    { icon: ShieldCheck, value: "100%", label: t("stats.tested.label") },
  ];

  const certifications = [
    { name: "ISO 9001", src: "/images/cert-icons/ISO9001.png", alt: "ISO 9001 Certified" },
    { name: "CE", src: "/images/cert-icons/CE.png", alt: "CE Certified" },
    { name: "RoHS", src: "/images/cert-icons/RoHS.png", alt: "RoHS Compliant" },
    { name: "TUV", src: "/images/cert-icons/TUV.png", alt: "TUV Certified" },
  ];

  const titleLine2 = t("title.line2");
  const spaceIdx = titleLine2.lastIndexOf(" ");
  const firstPart = spaceIdx > -1 ? titleLine2.slice(0, spaceIdx) : titleLine2;
  const lastWord = spaceIdx > -1 ? titleLine2.slice(spaceIdx + 1) : "";

  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden bg-bg-primary">
      {/* Tech grid pattern — subtle */}
      <div className="absolute inset-0 z-0 tech-grid-bg" />

      {/* Ambient glow orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #00E5FF, transparent 70%)" }}
      />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
      />

      {/* Background image — product visible on right */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
          style={{
            backgroundImage: "url(/images/hero-bg.jpg)",
            backgroundPosition: "center 30%",
          }}
        />
        {/* Gradient overlay: deep dark on left (text readability) → fading to transparent on right (product visibility) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, #080C14 0%, rgba(8,12,20,0.85) 25%, rgba(8,12,20,0.35) 45%, rgba(8,12,20,0.06) 60%, rgba(8,12,20,0.12) 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <div className="max-w-2xl">
            {/* Title with gradient */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5">
              <span className="text-white">{t("title.line1")}</span>
              <br />
              <span className="text-white">{firstPart} </span>
              <span className="gradient-text">{lastWord}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary font-light mb-8 leading-relaxed">
              {t("subtitle.line1")}
              <br />
              {t("subtitle.line2")}
            </p>

            {/* Stats row — glowing icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(0,229,255,0.08)",
                      border: "1px solid rgba(0,229,255,0.2)",
                    }}
                  >
                    <Icon size={16} className="text-accent-cyan" />
                  </div>
                  <div>
                    <div className="text-accent-cyan font-bold text-base sm:text-lg leading-tight stat-glow">
                      {value}
                    </div>
                    <div className="text-text-tertiary text-xs leading-tight">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #00E5FF, #7C3AED)",
                  color: "#080C14",
                }}
              >
                {t("cta")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-border-glow text-accent-cyan px-6 py-3 rounded-lg text-sm font-semibold tracking-wide uppercase hover:bg-accent-cyan/10 hover:border-border-glow-strong hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("ctaSecondary")}
                <Download size={16} />
              </Link>
              <a
                href="https://wa.me/8618657933982"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border-default text-text-secondary px-6 py-3 rounded-lg text-sm font-semibold tracking-wide uppercase hover:border-border-glow hover:text-accent-cyan hover:-translate-y-0.5 transition-all duration-300"
              >
                <WhatsAppIcon size={16} />
                {t("ctaWhatsApp")}
              </a>
            </div>

            {/* Certifications — dark glass */}
            <div className="flex items-center gap-6 sm:gap-8">
              {certifications.map(({ name, src, alt }) => (
                <div key={name} className="flex items-center gap-2.5" title={name}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-2.5 flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-contain brightness-0 invert"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-text-secondary text-sm font-semibold tracking-wide hidden sm:block">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom feature bar */}
      <div className="relative z-10 border-t border-border-default glass-card rounded-none !border-x-0 !border-b-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-text-secondary uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
              {t("features.efficiency")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
              {t("features.quality")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
              {t("features.support")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
              {t("features.sustainable")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
