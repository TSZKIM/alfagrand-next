import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Star, CheckCircle, HeadphonesIcon, Target, Sun, Zap, Shield, Wrench } from "lucide-react";
import { locales, defaultLocale } from "../../config";

type Props = { params: Promise<{ locale: string }> };

/* ─── Assets ─── */
const S = (name: string) => `/images/solar/${name}`;

/* ═══════════════════════════════════════════════════════════════════
   Series data — 21 product series from 2025-1 Solar Pumps catalog
   ═══════════════════════════════════════════════════════════════════ */

interface SeriesEntry {
  name: string;
  tagline: string;
  desc: string;
  specs: string[];
  img: string;
  slug: string;
  group: "dc-borehole" | "dc-surface" | "acdc";
}

const allSeries: SeriesEntry[] = [
  /* ── DC SOLAR PUMP ── */
  // Borehole / Deep Well
  { name: '2" DC Screw/Impeller Solar Pump', tagline: "Compact Deep Well Solution", desc: "Ultra-slim 2-inch design for narrow boreholes. Screw and impeller types available for different head/flow requirements.", specs: ["Flow: Up to 3 m³/h", "Head: Up to 120 m", "Power: 210W - 600W", "Voltage: 24V / 36V / 48V DC"], img: S("products/2inch-dc-screw-impeller.jpg"), slug: "2inch-dc-screw-impeller", group: "dc-borehole" },
  { name: '3" 4" DC Screw Solar Pump', tagline: "High-Head Deep Well", desc: "3-inch and 4-inch screw-type solar pumps for deep wells. Excellent for high-head applications with steady flow.", specs: ["Flow: Up to 5 m³/h", "Head: Up to 350 m", "Power: 370W - 2200W", "Voltage: 36V / 48V / 72V / 110V DC"], img: S("products/3-4inch-dc-screw.jpg"), slug: "3-4inch-dc-screw", group: "dc-borehole" },
  { name: '3" DC Plastic Impeller Solar Pump', tagline: "Economical Deep Well", desc: "Cost-effective 3-inch plastic impeller design. Lightweight and corrosion-resistant for clean water applications.", specs: ["Flow: Up to 4 m³/h", "Head: Up to 160 m", "Power: 370W - 1100W", "Voltage: 36V / 48V / 72V DC"], img: S("products/3inch-dc-plastic-impeller.jpg"), slug: "3inch-dc-plastic-impeller", group: "dc-borehole" },
  { name: '3" DC Stainless Steel Impeller Solar Pump', tagline: "Durable Deep Well", desc: "All stainless steel impeller construction for enhanced durability and longer service life in demanding conditions.", specs: ["Flow: Up to 4.5 m³/h", "Head: Up to 180 m", "Power: 370W - 1500W", "Voltage: 36V / 48V / 72V / 110V DC"], img: S("products/3inch-dc-ss-impeller.jpg"), slug: "3inch-dc-ss-impeller", group: "dc-borehole" },
  { name: '4" DC Plastic Impeller Solar Pump', tagline: "High-Flow Deep Well", desc: "4-inch diameter design with plastic impeller for higher flow rates. Ideal for medium-depth wells and boreholes.", specs: ["Flow: Up to 8 m³/h", "Head: Up to 200 m", "Power: 550W - 2200W", "Voltage: 48V / 72V / 110V DC"], img: S("products/4inch-dc-plastic-impeller.jpg"), slug: "4inch-dc-plastic-impeller", group: "dc-borehole" },
  { name: '4"-6" DC Stainless Steel Impeller Solar Pump', tagline: "Heavy-Duty Borehole", desc: "Premium stainless steel 4-6 inch pumps for the most demanding deep well applications. Maximum durability and efficiency.", specs: ["Flow: Up to 12 m³/h", "Head: Up to 350 m", "Power: 750W - 7500W", "Voltage: 48V / 72V / 110V / 220V DC"], img: S("products/4-6inch-dc-ss-impeller.jpg"), slug: "4-6inch-dc-ss-impeller", group: "dc-borehole" },

  // Surface Pumps
  { name: "PSQB DC Solar Surface Pump", tagline: "Compact Surface Solution", desc: "Lightweight DC surface pump for shallow water sources, tanks and transfer applications.", specs: ["Flow: Up to 4.5 m³/h", "Head: Up to 55 m", "Power: 370W - 1100W", "Voltage: 24V / 48V DC"], img: S("products/psqb-dc-surface.jpg"), slug: "psqb-dc-surface", group: "dc-surface" },
  { name: "PSGJ DC Solar Surface Pump", tagline: "Medium-Duty Surface", desc: "Robust DC surface pump with higher flow capacity for irrigation and water supply systems.", specs: ["Flow: Up to 10 m³/h", "Head: Up to 50 m", "Power: 550W - 1500W", "Voltage: 48V / 72V DC"], img: S("products/psgj-dc-surface.jpg"), slug: "psgj-dc-surface", group: "dc-surface" },
  { name: "PHF DC Solar Surface Pump", tagline: "High-Flow Surface", desc: "High-capacity DC surface pump designed for large-volume water transfer and agricultural applications.", specs: ["Flow: Up to 18 m³/h", "Head: Up to 45 m", "Power: 750W - 2200W", "Voltage: 48V / 72V / 110V DC"], img: S("products/phf-dc-surface.jpg"), slug: "phf-dc-surface", group: "dc-surface" },
  { name: "PZSU DC Solar Surface Pump", tagline: "Self-Priming Surface", desc: "Self-priming DC surface pump with excellent suction capability for various water source types.", specs: ["Flow: Up to 8 m³/h", "Head: Up to 60 m", "Power: 550W - 1500W", "Voltage: 48V / 72V DC"], img: S("products/pzsu-dc-surface.jpg"), slug: "pzsu-dc-surface", group: "dc-surface" },

  // Special Purpose
  { name: "PSP DC Swimming Pool Solar Pump", tagline: "Pool Circulation", desc: "Dedicated DC solar pool pump with high efficiency and corrosion-resistant construction for swimming pools.", specs: ["Flow: Up to 16 m³/h", "Head: Up to 18 m", "Power: 370W - 1100W", "Voltage: 24V / 48V DC"], img: S("products/psp-dc-pool.jpg"), slug: "psp-dc-pool", group: "dc-surface" },
  { name: "PEQDX DC Solar Submersible Pump", tagline: "Portable Submersible", desc: "Compact portable DC submersible pump for flexible water extraction from various sources.", specs: ["Flow: Up to 6 m³/h", "Head: Up to 40 m", "Power: 210W - 750W", "Voltage: 12V / 24V / 48V DC"], img: S("products/peqdx-dc-submersible.jpg"), slug: "peqdx-dc-submersible", group: "dc-surface" },
  { name: "PSG DC Solar Submersible Pump", tagline: "Heavy Submersible", desc: "Robust DC submersible pump for continuous duty in rivers, lakes and large water bodies.", specs: ["Flow: Up to 15 m³/h", "Head: Up to 25 m", "Power: 550W - 2200W", "Voltage: 48V / 72V / 110V DC"], img: S("products/psg-dc-submersible.jpg"), slug: "psg-dc-submersible", group: "dc-surface" },

  /* ── AC/DC SOLAR PUMP ── */
  { name: '3" AC/DC Plastic Impeller Solar Pump', tagline: "Universal Deep Well", desc: "Dual power 3-inch deep well pump — runs on solar DC or grid AC. Plastic impeller for clean water.", specs: ["Flow: Up to 4 m³/h", "Head: Up to 160 m", "Power: 370W - 1100W", "Voltage: DC 36-72V / AC 110-240V"], img: S("products/3inch-acdc-plastic-impeller.jpg"), slug: "3inch-acdc-plastic-impeller", group: "acdc" },
  { name: '3" AC/DC Stainless Steel Impeller Solar Pump', tagline: "Premium Universal Deep Well", desc: "Dual power with stainless steel impeller. Maximum flexibility — solar by day, grid by night or cloudy days.", specs: ["Flow: Up to 4.5 m³/h", "Head: Up to 180 m", "Power: 370W - 1500W", "Voltage: DC 36-110V / AC 110-240V"], img: S("products/3inch-acdc-ss-impeller.jpg"), slug: "3inch-acdc-ss-impeller", group: "acdc" },
  { name: '4" AC/DC Plastic Impeller Solar Pump', tagline: "High-Flow Universal Deep Well", desc: "4-inch dual power pump with plastic impeller. Higher flow rates with solar or grid power options.", specs: ["Flow: Up to 8 m³/h", "Head: Up to 200 m", "Power: 550W - 2200W", "Voltage: DC 48-110V / AC 110-240V"], img: S("products/4inch-acdc-plastic-impeller.jpg"), slug: "4inch-acdc-plastic-impeller", group: "acdc" },
  { name: '4"-6" AC/DC Stainless Steel Impeller Solar Pump', tagline: "Flagship Universal Borehole", desc: "Top-tier dual power stainless steel pump. Maximum performance and durability for critical water supply.", specs: ["Flow: Up to 12 m³/h", "Head: Up to 380 m", "Power: 750W - 7500W", "Voltage: DC 48-220V / AC 110-380V"], img: S("products/4-6inch-acdc-ss-impeller.jpg"), slug: "4-6inch-acdc-ss-impeller", group: "acdc" },
  { name: "PZSU-H AC/DC Solar Surface Pump", tagline: "Universal Self-Priming", desc: "Self-priming dual power surface pump. Reliable water supply with solar or grid power.", specs: ["Flow: Up to 8 m³/h", "Head: Up to 60 m", "Power: 550W - 1500W", "Voltage: DC 48-72V / AC 110-240V"], img: S("products/pzsu-acdc-surface.jpg"), slug: "pzsu-acdc-surface", group: "acdc" },
  { name: "PHF-H AC/DC Solar Surface Pump", tagline: "Universal High-Flow Surface", desc: "High-capacity dual power surface pump for large-scale agricultural and industrial water supply.", specs: ["Flow: Up to 18 m³/h", "Head: Up to 45 m", "Power: 750W - 2200W", "Voltage: DC 48-110V / AC 110-240V"], img: S("products/phf-acdc-surface.jpg"), slug: "phf-acdc-surface", group: "acdc" },
  { name: "PSP-H AC/DC Swimming Pool Solar Pump", tagline: "Universal Pool Pump", desc: "Dual power pool circulation pump. Energy-efficient operation with automatic solar/grid switching.", specs: ["Flow: Up to 16 m³/h", "Head: Up to 18 m", "Power: 370W - 1100W", "Voltage: DC 24-48V / AC 110-240V"], img: S("products/psp-acdc-pool.jpg"), slug: "psp-acdc-pool", group: "acdc" },
  { name: "PSG-H AC/DC Solar Submersible Pump", tagline: "Universal Heavy Submersible", desc: "Dual power heavy-duty submersible pump for rivers, lakes and large water transfer projects.", specs: ["Flow: Up to 15 m³/h", "Head: Up to 25 m", "Power: 550W - 2200W", "Voltage: DC 48-110V / AC 110-240V"], img: S("products/psg-acdc-submersible.jpg"), slug: "psg-acdc-submersible", group: "acdc" },
];

const dcBorehole = allSeries.filter(s => s.group === "dc-borehole");
const dcSurface = allSeries.filter(s => s.group === "dc-surface");
const acdcSeries = allSeries.filter(s => s.group === "acdc");

/* ── Page sections data ── */
const benefits = [
  { icon: Sun, title: "100% Solar Powered", desc: "Zero fuel cost, zero emissions. Sustainable water pumping for any remote location." },
  { icon: Zap, title: "MPPT Smart Control", desc: "Maximum Power Point Tracking maximizes energy harvest from every ray of sunlight." },
  { icon: Shield, title: "Full Protection", desc: "Built-in dry-run, overload, over-voltage, under-voltage and reverse polarity protection." },
  { icon: Wrench, title: "Plug & Play Design", desc: "Pre-configured systems with matched pump, controller and panel recommendations." },
  { icon: Star, title: "Premium Quality", desc: "ISO 9001 certified factory with 100% performance testing before shipment." },
  { icon: Target, title: "OEM & ODM Ready", desc: "Custom branding, packaging and specifications to meet your market requirements." },
];

const applications = [
  { label: "Agricultural Irrigation", img: S("app-irrigation.jpg") },
  { label: "Livestock Watering", img: S("app-livestock.jpg") },
  { label: "Domestic Water Supply", img: S("app-domestic.jpg") },
  { label: "Community Water Projects", img: S("app-storage.jpg") },
  { label: "Remote Area Supply", img: S("app-remote.jpg") },
  { label: "Swimming Pool Circulation", img: S("app-other.jpg") },
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
  const title = "Solar Pump System — DC & AC/DC | ALFAGRAND";
  const desc = "ALFAGRAND offers 21 solar pump series: DC screw, impeller, surface, submersible and AC/DC dual-power pumps. 2\"-6\" borehole, up to 380m head, MPPT control. ISO 9001 certified.";
  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${locale}/products/solar-pump-system`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/products/solar-pump-system`])),
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${locale}/products/solar-pump-system`,
      images: [{ url: `${baseUrl}${S("products/solar-panel-field.png")}`, width: 800, height: 600 }],
      type: "website",
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════════════ */
export default async function SolarPumpSystemCategoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Solar Pump System",
    description: "ALFAGRAND Solar Pump Systems — 21 series of DC and AC/DC solar-powered water pumps for agriculture, domestic, and industrial use. ISO 9001 certified factory.",
    image: `https://alfagrandpumps.com${S("products/solar-panel-field.png")}`,
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
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img src="/images/products/solar-pump-hero-bg.png" alt="" className="w-full h-full object-contain object-right" />
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
                  <span className="text-text-secondary">Solar Pump System</span>
                </nav>
                <h1 className="text-5xl font-black uppercase tracking-tight mb-3 leading-none">
                  Solar Pump<br />System
                </h1>
                <h2 className="text-2xl text-accent-cyan font-semibold mb-3">
                  21 Series. DC &amp; AC/DC. 100% Solar.
                </h2>
                <p className="text-[#d9e9ef] text-sm max-w-lg leading-relaxed mb-8">
                  ALFAGRAND offers a comprehensive range of 21 solar pump series — from ultra-slim 2&quot; borehole
                  pumps to heavy-duty 6&quot; stainless steel units. DC-only and AC/DC dual-power options available,
                  all with intelligent MPPT control for maximum efficiency in any sunlight condition.
                </p>

                <div className="flex flex-wrap gap-8">
                  {[
                    { value: "21", label: "Series" },
                    { value: "200+", label: "Models" },
                    { value: "380m", label: "Max Head" },
                    { value: "DC+AC/DC", label: "Dual Power" },
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

        {/* ════════════ ② DC DEEP WELL PUMPS ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-primary text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">DC Solar Borehole Pumps</h2>
              <p className="text-text-secondary text-sm max-w-2xl">
                Deep well submersible pumps powered entirely by solar panels. Screw and impeller types available
                in 2&quot; to 6&quot; diameters with MPPT controllers — ideal for remote boreholes without grid access.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dcBorehole.map((s) => (
                <SeriesCard key={s.slug} series={s} basePath={basePath} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ③ DC SURFACE &amp; SPECIAL PUMPS ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-card text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">DC Solar Surface &amp; Special Purpose Pumps</h2>
              <p className="text-text-secondary text-sm max-w-2xl">
                Surface-mounted and portable solar pumps for shallow water sources, swimming pools, tanks,
                and flexible water extraction applications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dcSurface.map((s) => (
                <SeriesCard key={s.slug} series={s} basePath={basePath} variant="light" />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ④ AC/DC DUAL POWER SERIES ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-primary text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">AC/DC Dual Power Solar Pumps</h2>
              <p className="text-text-secondary text-sm max-w-2xl">
                The ultimate flexibility — run on solar DC power when the sun shines, and switch to grid AC
                power at night or on cloudy days. Perfect for 24/7 water supply reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {acdcSeries.map((s) => (
                <SeriesCard key={s.slug} series={s} basePath={basePath} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ⑤ KEY BENEFITS ════════════ */}
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

        {/* ════════════ ⑥ TYPICAL APPLICATIONS ════════════ */}
        <section className="py-16 lg:py-20 bg-bg-primary text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">Typical Applications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {applications.map((app) => (
                <div key={app.label} className="text-center group">
                  <div className="aspect-square bg-bg-card rounded-xl border border-border-default p-4 flex items-center justify-center mb-3 group-hover:border-[#00b8ad]/40 group-hover:shadow-md transition-all duration-300">
                    <img src={app.img} alt={app.label} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs font-semibold text-white">{app.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ ⑦ CTA ════════════ */}
        <section className="py-16 lg:py-20 bg-[#06141d] border-t border-border-default">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Need Help Choosing the Right Solar Pump System?</h2>
                <p className="text-sm text-text-tertiary">Our experts are ready to help you find the best solution for your needs.</p>
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
function SeriesCard({ series, basePath, variant }: { series: SeriesEntry; basePath: string; variant?: "light" }) {
  const bg = variant === "light" ? "bg-bg-primary" : "bg-bg-card";
  return (
    <div className={`${bg} rounded-xl border border-border-default p-6 flex flex-col hover:shadow-lg hover:border-[#00b8ad]/40 transition-all duration-300 group`}>
      <div className="aspect-[4/3] mb-4 bg-[#f0f5f7] rounded-lg flex items-center justify-center p-4 overflow-hidden">
        <img src={series.img} alt={series.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
      </div>
      <h3 className="text-base font-bold text-white mb-1 leading-tight">{series.name}</h3>
      <p className="text-xs text-accent-cyan font-semibold mb-2">{series.tagline}</p>
      <p className="text-xs text-text-secondary mb-3 leading-relaxed">{series.desc}</p>
      <ul className="text-xs text-text-secondary space-y-1 mb-4 flex-1">
        {series.specs.map((sp) => (
          <li key={sp} className="flex items-start gap-2">
            <span className="text-accent-cyan mt-0.5 shrink-0">•</span>
            {sp}
          </li>
        ))}
      </ul>
      <Link
        href={`${basePath}/products/solar-pump-system/${series.slug}`}
        className="inline-flex items-center gap-1 text-sm font-bold text-accent-cyan hover:text-accent-cyan-dark transition-colors mt-auto"
      >
        View Series <ArrowRight size={14} />
      </Link>
    </div>
  );
}
