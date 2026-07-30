import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Link from "next/link";
import {
  Package,
  Layers,
  Settings,
  ShieldCheck,
  Box,
  Wrench,
  Home,
  Leaf,
  Building2,
  Factory,
  MessageCircle,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";
import { locales, defaultLocale } from "../config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://alfagrandpumps.com";
  return {
    title: "Products | ALFAGRAND Water Pumps",
    description:
      "Explore our full range of water pumps: peripheral, centrifugal, self-priming jet, submersible, solar, deep well, variable frequency and multi-stage pumps. OEM/ODM available.",
    alternates: {
      canonical: `${baseUrl}/${locale}/products`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/products`])
      ),
    },
    openGraph: {
      title: "Product Solutions | ALFAGRAND Water Pumps",
      description:
        "Professional water pump solutions for residential, agricultural, commercial and industrial applications.",
    },
  };
}

/* ─── Product category data matching reference order (01–08) ─── */
const productCategories = [
  {
    id: 1,
    name: "PERIPHERAL PUMP",
    slug: "peripheral-pump",
    shortDesc:
      "High-head pressure boosting solutions for residential water supply.",
    image: "/images/products/peripheral-pump.png",
  },
  {
    id: 2,
    name: "CENTRIFUGAL PUMP",
    slug: "centrifugal-pump",
    shortDesc:
      "Reliable and efficient for clean water transfer in domestic, agricultural and industrial use.",
    image: "/images/products/centrifugal-pump.png",
  },
  {
    id: 3,
    name: "SELF-PRIMING JET PUMP",
    slug: "self-priming-jet-pump",
    shortDesc:
      "Excellent self-priming capability for wells and tanks; ideal for household water systems.",
    image: "/images/products/self-priming-jet-pump.png",
  },
  {
    id: 4,
    name: "SUBMERSIBLE SEWAGE PUMP",
    slug: "submersible-sewage-pump",
    shortDesc:
      "Built for drainage and wastewater handling, solid particle management.",
    image: "/images/products/submersible-sewage-pump.png",
  },
  {
    id: 5,
    name: "SOLAR PUMP SYSTEM",
    slug: "solar-pump-system",
    shortDesc: "Eco-friendly solar pumping solution for irrigation and remote water supply.",
    image: "/images/products/solar-pump-system.png",
  },
  {
    id: 6,
    name: "DEEP WELL PUMP",
    slug: "deep-well-pump",
    shortDesc:
      "High-efficiency deep well pumps for groundwater extraction and irrigation.",
    image: "/images/products/deep-well-pump.png",
  },
  {
    id: 7,
    name: "VARIABLE FREQUENCY PUMP",
    slug: "variable-frequency-pump",
    shortDesc:
      "Constant pressure water supply with smart inverter control, saving energy up to 30%.",
    image: "/images/products/variable-frequency-pump.png",
  },
  {
    id: 8,
    name: "MULTI-STAGE PUMP & PUMP SETS",
    slug: "multi-stage-pump-sets",
    shortDesc:
      "High-rise building water supply and industrial boosting applications.",
    image: "/images/products/multi-stage-pump-sets.png",
  },
];

/* ─── Application guide data ─── */
const applicationGuide = [
  {
    icon: Home,
    label: "RESIDENTIAL WATER SUPPLY",
    imageBg: "from-slate-800 to-slate-900",
    products: [
      { name: "Peripheral Pump", slug: "peripheral-pump" },
      { name: "Self-Priming Jet Pump", slug: "self-priming-jet-pump" },
      { name: "Variable Frequency Pump", slug: "variable-frequency-pump" },
    ],
  },
  {
    icon: Leaf,
    label: "AGRICULTURAL IRRIGATION",
    imageBg: "from-emerald-900 to-green-950",
    products: [
      { name: "Solar Pump System", slug: "solar-pump-system" },
      { name: "Deep Well Pump", slug: "deep-well-pump" },
      { name: "Centrifugal Pump", slug: "centrifugal-pump" },
    ],
  },
  {
    icon: Building2,
    label: "COMMERCIAL BUILDINGS",
    imageBg: "from-blue-900 to-indigo-950",
    products: [
      { name: "Multi-Stage Pump", slug: "multi-stage-pump-sets" },
      { name: "Variable Frequency Pump", slug: "variable-frequency-pump" },
      { name: "Peripheral Pump", slug: "peripheral-pump" },
    ],
  },
  {
    icon: Factory,
    label: "INDUSTRIAL APPLICATIONS",
    imageBg: "from-gray-800 to-zinc-900",
    products: [
      { name: "Centrifugal Pump", slug: "centrifugal-pump" },
      { name: "Submersible Sewage Pump", slug: "submersible-sewage-pump" },
      { name: "Multi-Stage Pump", slug: "multi-stage-pump-sets" },
    ],
  },
];

/* ─── Why ALFAGRAND features ─── */
const whyFeatures = [
  {
    icon: Settings,
    title: "Precision Engineering",
    desc: "Advanced technology for superior performance.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Quality",
    desc: "Strict quality control ensures long service life.",
  },
  {
    icon: Box,
    title: "Wide Product Range",
    desc: "Complete solutions for diverse applications.",
  },
  {
    icon: Wrench,
    title: "OEM & ODM Support",
    desc: "Customized solutions to meet your needs.",
  },
];

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <>
      <Navbar />
      <main className="bg-bg-primary text-white min-h-screen">
        {/* ════════════════ HERO SECTION ════════════════ */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <img
            src="/images/products/product-collection.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 via-bg-primary/70 to-bg-primary/85" />

          {/* Content */}
          <div className="relative z-10 pt-32 pb-16 lg:pt-40 lg:pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <nav className="text-sm text-text-tertiary mb-6 flex items-center gap-2">
                <Link href={`${basePath}/`} className="hover:text-accent-cyan transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-text-secondary">Products</span>
              </nav>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                PRODUCT<br />SOLUTIONS
              </h1>
              <p className="text-accent-cyan text-lg font-semibold mb-2">
                Professional{" "}
                <span className="text-white">water pump solutions</span> for
              </p>
              <p className="text-base text-text-secondary max-w-md leading-relaxed mb-8">
                residential, agricultural, commercial, and industrial applications.
              </p>

              {/* Stats bar */}
              <div className="flex flex-wrap gap-6 md:gap-10 mt-8">
                <div className="flex items-center gap-3">
                  <Package className="w-7 h-7 text-accent-cyan shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-xs text-text-tertiary uppercase tracking-wider">
                      Product Categories
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-7 h-7 text-accent-cyan shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-xs text-text-tertiary uppercase tracking-wider">
                      Models Available
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-7 h-7 text-accent-cyan shrink-0" />
                  <div>
                    <div className="text-lg font-bold leading-tight">
                      Customized Solutions
                    </div>
                    <div className="text-xs text-text-tertiary uppercase tracking-wider">
                      OEM & ODM Available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ EXPLORE PRODUCT CATEGORIES ════════════════ */}
        <section className="relative py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-2">
                — EXPLORE OUR PRODUCT CATEGORIES —
              </h2>
              <p className="text-sm text-text-tertiary">
                A complete range of water pump solutions designed for every application need.
              </p>
            </div>

            {/* Product grid — 4 columns x 2 rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {productCategories.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`${basePath}/products/${cat.slug}`}
                  className="group relative bg-bg-card/80 border border-border-default rounded-xl p-5 hover:border-accent-cyan/30 hover:bg-bg-card transition-all duration-300"
                >
                  {/* Number badge */}
                  <span className="absolute top-3 left-4 text-sm font-bold text-accent-cyan/60 tabular-nums">
                    0{idx + 1}
                  </span>

                  {/* Product image area */}
                  <div className="aspect-square bg-gradient-to-br from-[#0a1628] to-[#06101a] rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:bg-gradient-to-br group-hover:from-[#0d1e33] group-hover:to-[#081520] transition-colors">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title + Desc */}
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-accent-cyan transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-tertiary leading-relaxed line-clamp-2 mb-3">
                    {cat.shortDesc}
                  </p>

                  {/* Explore link */}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan group-hover:gap-2 transition-all">
                    Explore Series <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ PRODUCT SELECTION GUIDE ════════════════ */}
        <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-2">
                — PRODUCT SELECTION GUIDE —
              </h2>
              <p className="text-sm text-text-tertiary">
                Choose by application to find the most suitable pump solution.
              </p>
            </div>

            {/* Application cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {applicationGuide.map((app) => (
                <div
                  key={app.label}
                  className="bg-bg-card/80 border border-border-default rounded-xl overflow-hidden hover:border-accent-cyan/20 transition-all duration-300"
                >
                  {/* Icon + Title */}
                  <div className="p-5 pb-3 flex items-center gap-3">
                    <app.icon className="w-8 h-8 text-accent-cyan/80 shrink-0" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/90 leading-tight">
                      {app.label.split(" ").map((w, i) =>
                        i === 0 ? (
                          <span key={i}>
                            {w} <br />
                          </span>
                        ) : (
                          <span key={i}>{w} </span>
                        )
                      )}
                    </h3>
                  </div>

                  {/* Image placeholder area with gradient bg */}
                  <div
                    className={`mx-4 h-28 rounded-lg bg-gradient-to-br ${app.imageBg} flex items-center justify-center overflow-hidden`}
                  >
                    <div className="text-white/10 text-4xl font-black opacity-20">
                      {app.label[0]}
                    </div>
                  </div>

                  {/* Product links */}
                  <ul className="p-4 space-y-1.5">
                    {app.products.map((p) => (
                      <li key={p.name}>
                        <Link
                          href={`${basePath}/products/${p.slug}`}
                          className="flex items-center gap-1.5 text-xs text-accent-cyan hover:text-white transition-colors group/link"
                        >
                          <ArrowRight size={10} className="opacity-0 -ml-3 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ WHY ALFAGRAND PRODUCTS ════════════════ */}
        <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-2">
                — WHY ALFAGRAND PRODUCTS —
              </h2>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="bg-bg-card/60 border border-white/[0.05] rounded-xl p-6 hover:border-accent-cyan/20 transition-all duration-300 group"
                >
                  <feat.icon className="w-10 h-10 text-accent-cyan/70 mb-4 group-hover:text-accent-cyan transition-colors" />
                  <h3 className="text-sm font-bold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-xs text-text-tertiary leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ BOTTOM CTA ════════════════ */}
        <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-bg-card to-[#0a1525] border border-border-default rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Text side */}
              <div className="lg:max-w-md">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                  NEED HELP FINDING<br />
                  THE RIGHT PUMP SOLUTION?
                </h2>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Our engineering team can help you select the right pump,
                  provide technical support and customize solutions for your
                  project.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`${basePath}/contact`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent-cyan text-[#060F1E] text-sm font-bold hover:opacity-80 transition-all shadow-lg shadow-accent-cyan/15"
                >
                  <MessageCircle size={16} />
                  GET A QUOTE
                  <span className="text-[10px] font-normal opacity-70 ml-1">
                    Tell us your requirements
                  </span>
                </a>
                <a
                  href={`https://wa.me/8618657933982`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-transparent border border-border-glow text-white text-sm font-semibold hover:border-accent-cyan/50 hover:text-accent-cyan transition-all"
                >
                  <HeadphonesIcon size={16} />
                  CONTACT OUR EXPERTS
                  <span className="text-[10px] font-normal opacity-50 ml-1">
                    Get professional advice
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
