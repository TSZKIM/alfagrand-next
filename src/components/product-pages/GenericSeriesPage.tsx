"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  SeriesData,
  ModelVariant,
  SeriesPerformancePoint,
} from "@/data/series-data";
import {
  ArrowRight,
  ChevronDown,
  Check,
  MessageCircle,
  HeadphonesIcon,
  Star,
  Target,
  Gauge,
  Zap,
  Droplets,
  Download,
  FileText,
  Layers,
  Shield,
  Sun,
  Clock,
  Settings,
  Wrench,
  Cpu,
  Lightbulb,
  BarChart3,
  Home,
  Trees,
  Building2,
  Factory,
  Package,
  Ruler,
  CheckCircle,
} from "lucide-react";

/* ─── Icon name → Component resolver ─── */
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  ArrowRight, ChevronDown, Check, MessageCircle, HeadphonesIcon,
  Star, Target, Gauge, Zap, Droplets, Download, FileText,
  Layers, Shield, Sun, Clock, Settings, Wrench, Cpu, Lightbulb,
  BarChart3, Home, Trees, Building2, Factory, Package, Ruler, CheckCircle,
};

function IconResolver({ name, className, strokeWidth = 1.5 }: { name: string; className?: string; strokeWidth?: number }) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp className={className} strokeWidth={strokeWidth} />;
}

interface Props {
  data: SeriesData;
  basePath: string;
  productSlug: string;
  categoryName: string;
}

/* ─── SVG Performance Curve ─── */
function PerformanceCurve({ curves }: { curves: SeriesPerformancePoint[] }) {
  const w = 460, h = 280, pad = 40;
  if (curves.length === 0) {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <text x={w / 2} y={h / 2} textAnchor="middle" fill="#5A6480" fontSize="12">No curve data</text>
      </svg>
    );
  }

  let maxF = 0, maxH = 0;
  curves.forEach((c) =>
    c.data.forEach((p) => {
      if (p.flow > maxF) maxF = p.flow;
      if (p.head > maxH) maxH = p.head;
    })
  );
  maxF = Math.ceil(maxF * 1.1);
  maxH = Math.ceil(maxH * 1.15);

  const toX = (flow: number) => pad + (w - pad * 1.4) * (flow / maxF);
  const toY = (head: number) => h - pad - (h - pad * 1.6) * (head / maxH);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-label="Performance curve">
      {/* Grid */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = pad + ((w - pad * 1.4) * i) / 5;
        const y = h - pad - ((h - pad * 1.6) * i) / 5;
        const xLabel = ((maxF * i) / 5).toFixed(1);
        const yLabel = Math.round((maxH * i) / 5);
        return (
          <g key={i}>
            <line x1={x} y1={pad / 2} x2={x} y2={h - pad} stroke="#1A2240" strokeWidth="1" />
            <text x={x - 10} y={h - pad + 22} fill="#5A6480" fontSize="11" fontFamily="Arial">{xLabel}</text>
            <line x1={pad} y1={y} x2={w - pad / 2} y2={y} stroke="#1A2240" strokeWidth="1" />
            <text x="6" y={y + 5} fill="#5A6480" fontSize="11" fontFamily="Arial">{yLabel}</text>
          </g>
        );
      })}
      {/* Axis labels */}
      <text x={w / 2 - 40} y={h - 5} fill="#FFFFFF" fontSize="12" fontFamily="Arial" fontWeight="bold">Flow Rate (m³/h)</text>
      <text x="6" y={h / 2 + 40} fill="#FFFFFF" fontSize="12" fontFamily="Arial" fontWeight="bold" transform={`rotate(-90, 6, ${h / 2 + 40})`}>Head (m)</text>
      {/* Curves */}
      {curves.map((curve) => {
        const points = curve.data.map((p, i) => {
          const cx = toX(p.flow);
          const cy = toY(p.head);
          return i === 0 ? `M${cx},${cy}` : `L${cx},${cy}`;
        }).join("");
        return (
          <g key={curve.model}>
            <path d={points} fill="none" stroke={curve.color} strokeWidth="3" strokeLinejoin="round" />
            {curve.data.map((p, i) => {
              const cx = toX(p.flow);
              const cy = toY(p.head);
              return <circle key={i} cx={cx} cy={cy} r={3} fill="white" stroke={curve.color} strokeWidth="2" />;
            })}
          </g>
        );
      })}
      {/* Legend */}
      {curves.map((curve, i) => (
        <g key={`legend-${curve.model}`}>
          <rect x={pad + 8 + i * 100} y={pad / 2 + 2} width={10} height={10} fill={curve.color} rx={2} />
          <text x={pad + 22 + i * 100} y={pad / 2 + 11} fill="#9aa" fontSize="10" fontFamily="Arial">{curve.model}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─── Model detail label resolver ─── */
const COLUMN_LABELS: Record<string, string> = {
  powerHP: "HP",
  powerKW: "kW",
  maxHead: "Max. Head",
  maxFlow: "Max. Flow",
  suctionHead: "Suction",
  inletOutlet: "Inlet/Outlet",
  weight: "Weight",
  maxParticle: "Solids",
};

/* ─── Main Component ─── */
export default function GenericSeriesPage({ data, basePath, productSlug, categoryName }: Props) {
  const [selectedModel, setSelectedModel] = useState<ModelVariant>(data.models[0]);
  const [expanded, setExpanded] = useState(false);

  const displayModel = selectedModel;

  const visibleModels = expanded ? data.models : data.models.slice(0, 9);

  // Build dynamic detail columns (exclude "model" which is always shown)
  const detailColumns = data.tableCols.filter((c) => c.key !== "model");

  return (
    <main className="bg-bg-primary text-white min-h-screen">

      {/* ════════════ ① HERO ════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "radial-gradient(circle at 70% 35%, #1a3a5c 0%, #0a1a2e 46%, #040f1c 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center gap-8 py-16 lg:py-20 min-h-[480px]">
            <div>
              {/* Breadcrumb */}
              <nav className="text-xs text-[#a7c6d0] mb-8 flex items-center gap-2">
                <Link href={`${basePath}/`} className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href={`${basePath}/products`} className="hover:text-white transition-colors">Products</Link>
                <span>›</span>
                <Link href={`${basePath}/products/${productSlug}`} className="hover:text-white transition-colors">
                  {categoryName}
                </Link>
                <span>›</span>
                <span className="text-text-secondary">{data.title}</span>
              </nav>

              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-3 leading-none">
                {data.title}
              </h1>
              <h2 className="text-xl sm:text-2xl text-accent-cyan font-semibold mb-3">
                {data.subtitle}
              </h2>
              <p className="text-[#d9e9ef] text-sm max-w-lg leading-relaxed mb-8">
                {data.desc}
              </p>

              {/* Hero badges from stats */}
              <div className="flex flex-wrap gap-6">
                {data.stats.slice(0, 5).map((stat) => {
                  return (
                    <div key={stat.label} className="min-w-[72px] font-black text-center">
                      <IconResolver name={stat.icon} className="w-8 h-8 mx-auto mb-1 text-accent-cyan" strokeWidth={1.5} />
                      <div className="text-sm">{stat.value}</div>
                      <div className="text-[10px] text-[#a7c6d0] uppercase tracking-wider">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Model images */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {data.modelImages.slice(0, 4).map((img, idx) => (
                <div
                  key={img.label}
                  className={`bg-gradient-to-br from-[#0a1628] to-[#06101a] border border-border-default rounded-xl overflow-hidden ${idx === 0 ? "row-span-2 col-span-2 lg:row-span-2 lg:col-span-2" : ""}`}
                >
                  <div className="flex items-center justify-center p-4 bg-gradient-to-br from-[#0a1628] to-[#06101a]">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="max-h-[160px] w-auto object-contain"
                    />
                  </div>
                  <div className="p-2 border-t border-white/[0.04]">
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ③ MATCHING MODELS + SIDEBAR ════════════ */}
      <section className="py-12 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {/* Left: Table */}
            <div className="bg-bg-card rounded-xl border border-border-default overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                <h2 className="text-base font-bold">
                  Matching Models{" "}
                  <span className="text-text-secondary font-normal">({data.models.length} models)</span>
                </h2>
                {data.models.length > 9 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-sm font-bold text-accent-cyan-dark hover:text-accent-cyan transition-colors bg-transparent border-0 cursor-pointer"
                  >
                    {expanded ? "Show Less" : "View More Models"}
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-bg-primary text-left text-text-secondary text-xs uppercase tracking-wider">
                      <th className="px-5 py-3 w-10"></th>
                      {data.tableCols.map((col) => (
                        <th key={col.key} className="px-5 py-3 whitespace-nowrap">{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleModels.map((m) => (
                      <tr
                        key={m.model}
                        onClick={() => setSelectedModel(m)}
                        className={`border-t border-border-default cursor-pointer transition-colors hover:bg-bg-primary ${
                          m.model === selectedModel.model
                            ? "bg-[#e6f7f6] border-l-2 border-l-[#00b8ad]"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-3">
                          <input
                            type="radio"
                            name="model"
                            checked={m.model === selectedModel.model}
                            onChange={() => setSelectedModel(m)}
                            className="accent-accent-cyan"
                          />
                        </td>
                        <td className="px-5 py-3 font-semibold text-white whitespace-nowrap">{m.model}</td>
                        {data.tableCols.slice(1).map((col) => (
                          <td key={col.key} className="px-5 py-3 text-text-secondary whitespace-nowrap">
                            {m[col.key as keyof ModelVariant] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Model Details + Performance Curve */}
            <div className="space-y-4">
              <div className="bg-bg-card rounded-xl border border-border-default p-5">
                <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Model Details</h3>
                <div className="text-lg font-black text-white mb-3">{displayModel.model}</div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
                  {detailColumns.map((col) => (
                    <>
                      <dt key={`dt-${col.key}`} className="text-text-secondary font-medium">
                        {COLUMN_LABELS[col.key as keyof typeof COLUMN_LABELS] || col.label}
                      </dt>
                      <dd key={`dd-${col.key}`} className="text-white">
                        {displayModel[col.key as keyof ModelVariant] || "—"}
                      </dd>
                    </>
                  ))}
                </dl>
                {/* CSV Export */}
                {data.performanceCurves.length > 0 && (
                  <button
                    onClick={() => {
                      const perf = data.performanceCurves.find((c) => c.model.includes(displayModel.model));
                      if (!perf) return;
                      const csv = [
                        "Flow (m³/h),Head (m)",
                        ...perf.data.map((p) => `${p.flow},${p.head}`),
                      ].join("\n");
                      const blob = new Blob([csv], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${displayModel.model}-performance.csv`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded border border-[#d4e3e8] text-sm font-bold text-[#0a6b6a] hover:bg-bg-primary transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Download Data Sheet
                  </button>
                )}
              </div>

              {/* Performance Curve */}
              {data.performanceCurves.length > 0 && (
                <div className="bg-bg-card rounded-xl border border-border-default p-5">
                  <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Performance Curve</h3>
                  <PerformanceCurve curves={data.performanceCurves} />
                  <p className="text-[10px] text-text-secondary mt-2">
                    Curve data from official catalog. Tolerance according to ISO 9906.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ④ FEATURES STRIP ════════════ */}
      <section className="py-10 bg-bg-card border-y border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.features.map((feat) => {
              return (
                <div key={feat.title} className="text-center">
                  <IconResolver name={feat.icon} className="w-10 h-10 mx-auto mb-2 text-[#0a6b6a]" strokeWidth={1.5} />
                  <div className="text-sm font-bold text-white mb-1 whitespace-pre-line">{feat.title}</div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ ⑤ TYPICAL APPLICATIONS + TECHNICAL SPECS ════════════ */}
      <section className="py-12 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Applications */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Typical Applications</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.applications.map((app) => {
                  return (
                    <div key={app.label} className="bg-bg-card rounded-xl border border-border-default p-4 text-center group hover:border-[#00b8ad]/40 hover:shadow-md transition-all duration-300">
                      <IconResolver name={app.icon} className="w-10 h-10 mx-auto mb-2 text-[#0a6b6a]" strokeWidth={1.5} />
                      <p className="text-xs font-bold text-white whitespace-pre-line">{app.label}</p>
                      <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">{app.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Overview */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Technical Overview</h2>
              <div className="bg-bg-card rounded-xl border border-border-default p-6">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  {data.stats.map((stat) => {
                    return (
                      <div key={stat.label}>
                        <dt className="text-text-secondary text-xs uppercase mb-1 flex items-center gap-1.5">
                          <IconResolver name={stat.icon} className="w-3.5 h-3.5 text-accent-cyan/60" />
                          {stat.label}
                        </dt>
                        <dd className="font-bold text-white">{stat.value}</dd>
                      </div>
                    );
                  })}
                  <div className="col-span-2">
                    <dt className="text-text-secondary text-xs uppercase mb-1">Description</dt>
                    <p className="text-xs text-text-secondary leading-relaxed">{data.overviewDesc}</p>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ⑥ FAQ ════════════ */}
      {data.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: data.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
      <section className="py-12 bg-bg-card border-t border-border-default">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-bg-primary border border-border-default rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-[#eef3f5] transition-colors list-none">
                  <span className="text-sm font-medium text-white pr-8">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-text-secondary shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ ⑦ CTA ════════════ */}
      <section className="py-12 bg-[#071622] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{data.ctaTitle}</h2>
              <p className="text-sm text-[#a7c6d0]">{data.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-white text-sm font-bold bg-gradient-to-r from-[#00b8ad] to-[#029a93] hover:opacity-90 transition-all shadow-lg"
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/8618657933982"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-white text-sm font-bold bg-[#0c7b55] hover:bg-[#1fae70] transition-all border border-[#1fae70]"
              >
                Contact Our Experts
              </a>
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#9fb8c2] text-white text-sm font-bold hover:border-white transition-all"
              >
                OEM & ODM Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Trust Badges */}
      <section className="border-t border-white/[0.05] py-8 bg-[#071622]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {[
              { icon: Star, label: "High Quality", sub: "ISO 9001 Certified" },
              { icon: Check, label: "Strict Testing", sub: "100% Factory Tested" },
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
  );
}
