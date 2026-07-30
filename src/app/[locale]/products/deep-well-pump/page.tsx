import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { deepWellSeries, seriesFamilies, totalDeepWellModels } from "@/data/deep-well-pump-series";
import type { DeepWellSeries } from "@/data/deep-well-pump-series";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  CheckCircle,
  HeadphonesIcon,
  Target,
  Gauge,
  ShieldCheck,
  Zap,
  Droplets,
  Wrench,
  Trees,
  Home,
  Building2,
  Factory,
  Leaf,
  Lightbulb,
} from "lucide-react";
import { locales, defaultLocale } from "../../config";

type Props = { params: Promise<{ locale: string }> };

/* ═══════════════════════════════════════════════════════════════════
   Group series by borehole / type (matching solar pump grouping pattern)
   ═══════════════════════════════════════════════════════════════════ */
const groupSmall = deepWellSeries.filter((s) =>
  s.family === "2SD" || s.family === "2.5SD" || s.family === "3SD"
);
const groupMedium = deepWellSeries.filter((s) =>
  s.family === "4SD" || s.family === "4SP"
);
const groupLarge = deepWellSeries.filter((s) =>
  s.family === "5SR" || s.family === "6SR" || s.family === "6SP"
);
const groupSpecial = deepWellSeries.filter((s) =>
  s.family === "4SK" || s.family === "QG"
);

/* ── Benefits ── */
const benefits = [
  { icon: Gauge, title: "Deep Extraction", desc: "Multi-stage design extracts water from depths up to 457m. Covers boreholes from 2\" to 6\"." },
  { icon: ShieldCheck, title: "Stainless Steel 304", desc: "Pump body, shaft and impellers in AISI 304 stainless steel for superior corrosion resistance." },
  { icon: Zap, title: "High Efficiency", desc: "Precision-cast impellers with optimized vane geometry achieve up to 78% hydraulic efficiency." },
  { icon: Droplets, title: "Sand Resistant", desc: "Floating impeller design with sand-resistant bearings tolerates sandy borehole conditions." },
  { icon: Wrench, title: "Easy Maintenance", desc: "Modular multi-stage design allows individual stage replacement without full pump teardown." },
  { icon: Target, title: "OEM & ODM Ready", desc: "Custom branding, packaging and technical specifications for your market requirements." },
];

/* ── Applications ── */
const applications = [
  { label: "Agricultural Irrigation", icon: Trees },
  { label: "Industrial Water Supply", icon: Factory },
  { label: "Remote Communities", icon: Home },
  { label: "Livestock Watering", icon: Leaf },
  { label: "Municipal Water", icon: Building2 },
  { label: "Groundwater Control", icon: Droplets },
];

/* ═══════════════════════════════════════════════════════════════════
   Metadata
   ═══════════════════════════════════════════════════════════════════ */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://alfagrandpumps.com";
  const title = "Deep Well Pump Series — 2\"–6\" Submersible Borehole Pumps | ALFAGRAND";
  const desc = `ALFAGRAND offers ${deepWellSeries.length} deep well pump series with ${totalDeepWellModels}+ models. 2" to 6" boreholes, up to 457m head, 304 stainless steel, single & three phase. ISO 9001 certified.`;
  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${locale}/products/deep-well-pump`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/products/deep-well-pump`])),
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${locale}/products/deep-well-pump`,
      images: [{ url: `${baseUrl}/images/deep-well-pump/hero-collection.png`, width: 800, height: 546 }],
      type: "website",
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════════════ */
export default async function DeepWellPumpCategoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Deep Well Pump Series",
    description: `ALFAGRAND Deep Well Pumps — ${deepWellSeries.length} series of 2" to 6" submersible borehole pumps for agriculture, industrial, and municipal water supply. ISO 9001 certified factory.`,
    image: "https://alfagrandpumps.com/images/products/deep-well-pump.png",
    brand: { "@type": "Brand", name: "ALFAGRAND" },
    manufacturer: { "@type": "Organization", name: "ALFAGRAND", url: "https://alfagrandpumps.com" },
    category: "Water Pump",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Navbar />

      <main className="bg-[#06141d] text-white min-h-screen">

        {/* ════════════ ① HERO ════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/deep-well-pump/hero-collection.png" alt="" className="w-full h-full object-contain object-right" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#041018]/80 via-[#071a28]/50 to-[#0a2e46]/20" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-20 lg:py-24 min-h-[450px]">
              <div>
                <nav className="text-xs text-[#a7c6d0] mb-8 flex items-center gap-2">
                  <Link href={`${basePath}/`} className="hover:text-white transition-colors">Home</Link>
                  <span>›</span>
                  <Link href={`${basePath}/products`} className="hover:text-white transition-colors">Products</Link>
                  <span>›</span>
                  <span className="text-text-secondary">Deep Well Pump</span>
                </nav>
                <h1 className="text-5xl font-black uppercase tracking-tight mb-3 leading-none">
                  Deep Well<br />Pump Series
                </h1>
                <h2 className="text-2xl text-accent-cyan font-semibold mb-3">
                  {deepWellSeries.length} Series. {totalDeepWellModels}+ Models. 1 &amp; 3 Phase.
                </h2>
                <p className="text-[#d9e9ef] text-sm max-w-lg leading-relaxed mb-8">
                  ALFAGRAND offers a comprehensive range of {deepWellSeries.length} deep well pump series — from
                  ultra-slim 2&quot; borehole pumps to heavy-duty 6&quot; industrial units. Single and three-phase
                  options available, all with AISI 304 stainless steel construction and high-efficiency hydraulics.
                </p>

                <div className="flex flex-wrap gap-8">
                  {[
                    { value: `${deepWellSeries.length}`, label: "Series" },
                    { value: `${totalDeepWellModels}+`, label: "Models" },
                    { value: "457m", label: "Max Head" },
                    { value: "1 & 3 Phase", label: "Power Options" },
                  ].map((s) => (
                    <div key={s.label} className="min-w-[72px]">
                      <div className="text-lg font-black">{s.value}</div>
                      <div className="text-[11px] text-[#a7c6d0] uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ ② SMALL BOREHOLE: 2SD / 2.5SD / 3SD ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-primary text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">Small Borehole Pumps — 2&quot; / 2.5&quot; / 3&quot;</h2>
              <p className="text-text-secondary text-sm max-w-2xl">
                Ultra-compact deep well pumps for narrow boreholes. Ideal for remote domestic water supply,
                small-scale irrigation and livestock watering with single-phase power.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupSmall.map((s) => (
                <SeriesCard key={s.slug} series={s} basePath={basePath} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ③ MEDIUM BOREHOLE: 4SD / 4SP ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-card text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">Medium Borehole Pumps — 4&quot; SD &amp; SP Series</h2>
              <p className="text-text-secondary text-sm max-w-2xl">
                The most popular 4-inch deep well pump families. SD standard series for clean water,
                SP premium series with floating impellers for sandy conditions. Single and three-phase.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupMedium.map((s) => (
                <SeriesCard key={s.slug} series={s} basePath={basePath} variant="light" />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ④ LARGE BOREHOLE: 5SR / 6SR / 6SP ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-primary text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">Large Borehole Pumps — 5&quot; &amp; 6&quot; SR &amp; SP Series</h2>
              <p className="text-text-secondary text-sm max-w-2xl">
                Heavy-duty three-phase deep well pumps for industrial, municipal and large-scale agricultural
                water supply. High flow rates up to 60 m³/h with robust all-stainless steel construction.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupLarge.map((s) => (
                <SeriesCard key={s.slug} series={s} basePath={basePath} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ⑤ SPECIAL PURPOSE: 4SK / QG ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-card text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">Special Purpose Pumps — 4SK &amp; QG</h2>
              <p className="text-text-secondary text-sm max-w-2xl">
                High-speed 8500 RPM pumps for specialized applications. The 4SK submersible and QG
                series deliver compact power for unique deep well and groundwater extraction needs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupSpecial.map((s) => (
                <SeriesCard key={s.slug} series={s} basePath={basePath} variant="light" />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ⑥ KEY BENEFITS ════════════ */}
        <section className="py-12 bg-[#092132]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-4 p-4">
                  <b.icon className="w-7 h-7 text-accent-cyan shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{b.title}</div>
                    <p className="text-xs text-[#a7c6d0] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ⑦ TYPICAL APPLICATIONS ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-primary text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">Typical Applications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app) => (
                <div key={app.label} className="text-center group">
                  <div className="aspect-square bg-bg-card rounded-xl border border-border-default p-4 flex items-center justify-center mb-3 group-hover:border-[#00b8ad]/40 group-hover:shadow-md transition-all duration-300">
                    <app.icon className="w-10 h-10 text-[#0a6b6a]" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold text-white">{app.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ⑧ CTA ════════════ */}
        <section className="py-16 lg:py-20 bg-[#06141d] border-t border-border-default">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Need Help Choosing the Right Deep Well Pump?</h2>
                <p className="text-sm text-text-tertiary">Our experts are ready to help you find the best solution for your borehole depth and water demand.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 justify-center">
                <Link
                  href={`${basePath}/contact`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent-cyan text-white text-sm font-bold hover:bg-[#00e0d2] transition-all shadow-lg"
                >
                  Find Matching Models <ArrowRight size={14} />
                </Link>
                <Link
                  href={`${basePath}/contact`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded border border-border-glow text-white text-sm font-semibold hover:border-[#00b8ad] hover:text-accent-cyan transition-all"
                >
                  Get a Quote <ArrowRight size={14} />
                </Link>
                <a
                  href="https://wa.me/8618657933982"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#0c7b55] text-white text-sm font-semibold hover:bg-[#1fae70] transition-all border border-[#1fae70]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Trust Badges */}
        <section className="border-t border-white/[0.05] py-8 bg-[#06141d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {[
                { icon: Star, label: "High Quality", sub: "ISO 9001 Certified" },
                { icon: CheckCircle, label: "Strict Testing", sub: "100% Factory Tested" },
                { icon: HeadphonesIcon, label: "Global Support", sub: "24/7 Technical Help" },
                { icon: Target, label: "Long Service Life", sub: "18 Months Warranty" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-3">
                  <badge.icon className="w-8 h-8 text-accent-cyan/60" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs font-semibold text-text-secondary">{badge.label}</div>
                    <div className="text-[10px] text-white/35">{badge.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer locale={locale} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable Series Card
   ═══════════════════════════════════════════════════════════════════ */
function SeriesCard({
  series,
  basePath,
  variant,
}: {
  series: DeepWellSeries;
  basePath: string;
  variant?: "light";
}) {
  const bg = variant === "light" ? "bg-bg-primary" : "bg-bg-card";
  const firstModel = series.models[0];
  const lastModel = series.models[series.models.length - 1];
  const maxHead = lastModel?.maxHead ?? 0;
  const maxFlow = Math.max(...series.models.map((m) => m.maxFlow));
  const voltageLabel =
    series.models.length > 0
      ? series.models[0].voltage === "both"
        ? "Single & Three Phase"
        : series.models[0].voltage
      : "";

  return (
    <div
      className={`${bg} rounded-xl border border-border-default p-6 flex flex-col hover:shadow-lg hover:border-[#00b8ad]/40 transition-all duration-300 group`}
    >
      <div className="aspect-[4/3] mb-4 bg-[#f0f5f7] rounded-lg flex items-center justify-center p-4 overflow-hidden">
        <img
          src={`/images/${series.image}`}
          alt={series.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-base font-bold text-white mb-1 leading-tight">
        {series.name} Deep Well Pump
      </h3>
      <p className="text-xs text-accent-cyan font-semibold mb-2">
        {series.family} Series · {series.boreholeSize} Borehole
      </p>
      <p className="text-xs text-text-secondary mb-3 leading-relaxed line-clamp-2">{series.description}</p>
      <ul className="text-xs text-text-secondary space-y-1 mb-4 flex-1">
        <li className="flex items-start gap-2">
          <span className="text-accent-cyan mt-0.5 shrink-0">•</span>
          Flow: {firstModel?.maxFlow} – {maxFlow} m³/h
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent-cyan mt-0.5 shrink-0">•</span>
          Head: Up to {maxHead} m
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent-cyan mt-0.5 shrink-0">•</span>
          Power: {firstModel?.powerKw} – {lastModel?.powerKw} kW
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent-cyan mt-0.5 shrink-0">•</span>
          {voltageLabel} · {series.rpm} RPM
        </li>
      </ul>
      <Link
        href={`${basePath}/products/deep-well-pump/${series.slug}`}
        className="inline-flex items-center gap-1 text-sm font-bold text-accent-cyan hover:text-accent-cyan-dark transition-colors mt-auto"
      >
        View Series <ArrowRight size={14} />
      </Link>
    </div>
  );
}
