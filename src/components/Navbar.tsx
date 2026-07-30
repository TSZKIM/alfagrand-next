"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronDown, Globe, Search } from "lucide-react";
import { Link, usePathname, useRouter } from "../app/[locale]/config";
import SearchModal from "./SearchModal";

const navLinks = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.products", href: "/products" },
  { labelKey: "nav.application", href: "/#industries" },
  { labelKey: "nav.knowledge", href: "/#knowledge" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.contact", href: "/contact" },
];

const localeLabels: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  ar: "العربية",
  pt: "Português",
  ru: "Русский",
};

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === "ar";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Detect active nav item (strips locale prefix from pathname)
  const isActive = useCallback((href: string) => {
    // Hash links: only active on homepage when no locale suffix distorts comparison
    if (href.includes("#")) {
      // Strip locale prefix: pathname is like "/" or "/en" → normalize to "/"
      const normalized = pathname.endsWith("/") ? pathname.slice(0, -1) || "/" : pathname;
      // Check if we're on homepage (path is "/" or "/<locale>")
      const isHome = normalized === "/" || /^\/[a-z]{2}$/.test(normalized);
      if (!isHome) return false;
      // On homepage, mark hash links as not exactly "active" but subtly highlighted
      return false;
    }
    // Exact match: strip locale prefix
    const cleanPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    return cleanPath === href;
  }, [pathname]);

  // Handle hash link navigation (Next.js App Router needs help with cross-page hash scrolling)
  const handleHashNav = useCallback((e: React.MouseEvent, href: string) => {
    const [path, hash] = href.split("#");
    // If already on the target page, scroll to hash
    const cleanPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    if (cleanPath === path || (cleanPath === "/" && path === "")) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    // Otherwise, let the Link navigate, then manually scroll after navigation
    // We use router.push with the hash
    e.preventDefault();
    const targetPath = `${path || "/"}${path ? "#" : "#"}${hash}`;
    router.push(targetPath as any);
  }, [pathname, router]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg-overlay backdrop-blur-xl border-b border-border-default"
          : "bg-transparent"
      } ${isRTL ? "dir-rtl" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0 mr-4">
          <img
            src="/logo.png"
            alt="ALFAGRAND"
            className="h-8 lg:h-10 w-auto max-w-[160px] lg:max-w-[200px] object-contain object-left group-hover:opacity-80 transition-opacity brightness-0 invert"
          />
        </Link>

        {/* Desktop nav */}
        <div className={`hidden lg:flex items-center gap-0 ${isRTL ? "flex-row-reverse" : ""} shrink-0`}>
          {navLinks.map((l) => {
            const active = isActive(l.href);
            const hasHash = l.href.includes("#");
            return (
              <Link
                key={l.labelKey}
                href={l.href}
                onClick={hasHash ? (e) => handleHashNav(e, l.href) : undefined}
                className={`px-2.5 xl:px-3 py-2 text-xs lg:text-sm transition-colors relative group whitespace-nowrap ${
                  active
                    ? "text-accent-cyan font-semibold"
                    : "text-text-secondary hover:text-accent-cyan cyan-underline"
                }`}
              >
                {t(l.labelKey)}
              </Link>
            );
          })}
          {/* Search Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            className="p-2 text-text-secondary hover:text-accent-cyan transition-colors rounded-lg hover:bg-bg-card/50 ml-1"
            title="Search (Ctrl+K)"
          >
            <Search size={18} />
          </button>

          {/* CTA Button */}
          <Link
            href="/contact"
            className={`ml-2 px-3 xl:px-4 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap ${
              isActive("/contact")
                ? "ring-2 ring-accent-cyan/50"
                : ""
            }`}
            style={{
              background: "var(--gradient-cyan-purple)",
              color: "#080C14",
            }}
          >
            {t("nav.getQuote")}
          </Link>

          {/* Language Switcher */}
          <div ref={langRef} className="ml-1 relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-text-secondary text-sm px-2 py-1 rounded hover:text-accent-cyan hover:bg-white/5 transition-colors"
            >
              <Globe size={14} />
              {localeLabels[locale] || locale.toUpperCase()}
              <ChevronDown size={14} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-bg-card border border-border-default backdrop-blur-xl rounded-xl py-1 min-w-[130px] shadow-2xl shadow-black/40 z-50">
                {Object.entries(localeLabels).map(([loc, label]) => (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc as "en" | "es" | "fr" | "ar" | "pt" | "ru"}
                    onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      loc === locale
                        ? "text-accent-cyan bg-accent-cyan/10"
                        : "text-text-secondary hover:text-accent-cyan hover:bg-white/[0.03]"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg-overlay backdrop-blur-2xl border-t border-border-default max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-6 flex flex-col gap-1">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              const hasHash = l.href.includes("#");
              return (
                <Link
                  key={l.labelKey}
                  href={l.href}
                  onClick={(e) => {
                    if (hasHash) handleHashNav(e, l.href);
                    else setMobileOpen(false);
                  }}
                  className={`px-4 py-3 transition-colors rounded-lg ${
                    active
                      ? "text-accent-cyan bg-accent-cyan/10 border border-border-glow font-semibold"
                      : "text-text-secondary hover:text-accent-cyan hover:bg-white/[0.04]"
                  }`}
                >
                  {t(l.labelKey)}
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-3 text-center text-sm font-semibold rounded-lg"
              style={{
                background: "var(--gradient-cyan-purple)",
                color: "#080C14",
              }}
            >
              {t("nav.getQuote")}
            </Link>

            {/* Mobile Language Selector */}
            <div className="mt-4 pt-4 border-t border-border-default">
              <p className="text-xs text-text-tertiary mb-3 px-4">Language</p>
              <div className="grid grid-cols-2 gap-2 px-4">
                {Object.entries(localeLabels).map(([loc, label]) => (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc as "en" | "es" | "fr" | "ar" | "pt" | "ru"}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2.5 text-sm rounded-lg text-center transition-colors ${
                      loc === locale
                        ? "text-accent-cyan bg-accent-cyan/10 border border-border-glow"
                        : "text-text-secondary bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <SearchModal />
    </nav>
  );
}
