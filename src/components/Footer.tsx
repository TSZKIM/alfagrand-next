import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { locales, defaultLocale } from "../app/[locale]/config";
import { MapPin, Phone, Mail } from "lucide-react";

const productLinks = [
  { name: "Peripheral Pump", href: "/products/peripheral-pump" },
  { name: "Centrifugal Pump", href: "/products/centrifugal-pump" },
  { name: "Solar Pump System", href: "/products/solar-pump-system" },
  { name: "Deep Well Pump", href: "/products/deep-well-pump" },
  { name: "Variable Frequency Pump", href: "/products/variable-frequency-pump" },
  { name: "Multi-Stage Pump & Pump Sets", href: "/products/multi-stage-pump-sets" },
  { name: "Self-Priming Jet Pump", href: "/products/self-priming-jet-pump" },
];

const knowledgeLinks = [
  { name: "Technical Insights", href: "/#knowledge" },
  { name: "Installation & Maintenance", href: "/#knowledge" },
  { name: "Industry Solutions", href: "/#industries" },
  { name: "Case Studies", href: "/#knowledge" },
  { name: "FAQs", href: "/#knowledge" },
  { name: "Download Center", href: "/#knowledge" },
  { name: "All Articles", href: "/news" },
];

const socialIcons = {
  facebook: {
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    href: "https://www.facebook.com/alfagrandpumps",
    label: "Facebook",
  },
  instagram: {
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z",
    href: "https://www.instagram.com/grand_pumps/",
    label: "Instagram",
  },
  youtube: {
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    href: "https://www.youtube.com/channel/UCuJ9btHDZo5ymO6ZyRxTAag/featured",
    label: "YouTube",
  },
  x: {
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    href: "https://x.com/Grandpumps",
    label: "X",
  },
  linkedin: {
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    href: "https://www.linkedin.com/in/grandpumps/",
    label: "LinkedIn",
  },
};

const certBadges = [
  { name: "ISO 9001", src: "/images/cert-icons/ISO9001.png", alt: "ISO 9001" },
  { name: "CE", src: "/images/cert-icons/CE.png", alt: "CE" },
  { name: "RoHS", src: "/images/cert-icons/RoHS.png", alt: "RoHS" },
  { name: "TUV", src: "/images/cert-icons/TUV.png", alt: "TUV" },
];

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const isDefault = locale === defaultLocale;
  const basePath = isDefault ? "" : `/${locale}`;

  return (
    <footer className="bg-bg-primary relative">
      {/* Top decorative gradient line */}
      <div className="section-divider" />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="lg:pr-4">
            <Link href={`${basePath}/`} className="inline-block mb-5">
              <img
                src="/logo.png"
                alt="ALFAGRAND"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="gradient-text text-sm font-bold tracking-[0.25em] uppercase mb-4">
              WATER PUMP SOLUTIONS
            </p>
            <p className="text-sm leading-relaxed mb-6 text-text-secondary">
              {t("description")}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {Object.entries(socialIcons).map(([key, { path, href, label }]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/[0.06] border border-border-default flex items-center justify-center hover:border-border-glow hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300 group"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-text-secondary group-hover:text-accent-cyan transition-colors">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">
              {t("products")}
            </h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`${basePath}${item.href}`}
                    className="text-text-secondary hover:text-accent-cyan transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Knowledge Center */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">
              {t("knowledge")}
            </h3>
            <ul className="space-y-3 text-sm">
              {knowledgeLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href.startsWith("/#") ? item.href : `${basePath}${item.href}`}
                    className="text-text-secondary hover:text-accent-cyan transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">
              {t("contact")}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent-cyan mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{t("address")}</span>
              </li>
              <li>
                <a
                  href="tel:+8618657933982"
                  className="flex items-start gap-3 hover:text-accent-cyan transition-colors group"
                >
                  <Phone size={16} className="text-accent-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary group-hover:text-accent-cyan">+86-18657933982</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8618657933982"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-accent-cyan transition-colors group"
                >
                  <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-cyan" aria-hidden="true">
                    <path d="M6.7 25.3L8.05 20.9C6.95 19.25 6.35 17.32 6.35 15.35C6.35 9.82 10.83 5.35 16.35 5.35C21.88 5.35 26.35 9.82 26.35 15.35C26.35 20.88 21.88 25.35 16.35 25.35C14.47 25.35 12.63 24.82 11.05 23.85L6.7 25.3Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.45 11.15C12.75 10.52 13.08 10.47 13.55 10.47H14.2C14.43 10.47 14.73 10.55 14.85 10.95L15.58 13.12C15.65 13.35 15.62 13.62 15.43 13.85L14.93 14.45C14.75 14.67 14.75 14.88 14.92 15.12C15.5 15.95 16.05 16.62 16.77 17.22C17.5 17.83 18.25 18.28 19.15 18.65C19.42 18.77 19.63 18.75 19.82 18.52L20.42 17.8C20.62 17.57 20.88 17.5 21.15 17.58L23.15 18.5C23.52 18.67 23.6 18.93 23.55 19.23C23.42 20.13 22.7 21.47 21.35 21.47C20.12 21.47 17.77 20.75 15.43 18.73C13.05 16.68 11.5 14.22 11.5 12.62C11.5 11.98 11.95 11.55 12.45 11.15Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-text-secondary group-hover:text-accent-cyan">+86-18657933982</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@grandpumps.com"
                  className="flex items-start gap-3 hover:text-accent-cyan transition-colors group"
                >
                  <Mail size={16} className="text-accent-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary group-hover:text-accent-cyan">info@grandpumps.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-text-tertiary">
              &copy; {new Date().getFullYear()} ALFAGRAND. {t("copyright")}
            </span>
            <div className="flex items-center gap-3 text-xs text-text-tertiary">
              <Link href={`${basePath}/privacy`} className="hover:text-accent-cyan transition-colors">{t("privacy")}</Link>
              <span className="text-border-default">|</span>
              <Link href={`${basePath}/terms`} className="hover:text-accent-cyan transition-colors">{t("terms")}</Link>
              <span className="text-border-default">|</span>
              <Link href="/sitemap.xml" className="hover:text-accent-cyan transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
