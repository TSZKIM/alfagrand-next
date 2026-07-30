"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { DeepWellSeries, DeepWellModel } from "@/data/deep-well-pump-series";
import {
  ArrowRight,
  ChevronDown,
  Star,
  CheckCircle,
  HeadphonesIcon,
  Target,
  Gauge,
  Zap,
  Droplets,
  Ruler,
  Download,
  ShieldCheck,
} from "lucide-react";

interface Props {
  series: DeepWellSeries;
  basePath: string;
}

/* ─── Filter helpers ─── */
function buildFlowOptions(models: DeepWellModel[]) {
  const maxFlow = Math.max(...models.map((m) => m.maxFlow));
  if (maxFlow <= 3) return [
    { value: "0-1", label: "0 - 1 m³/h" },
    { value: "1-2", label: "1 - 2 m³/h" },
    { value: "2+", label: "2+ m³/h" },
  ];
  if (maxFlow <= 12) return [
    { value: "0-3", label: "0 - 3 m³/h" },
    { value: "3-8", label: "3 - 8 m³/h" },
    { value: "8+", label: "8+ m³/h" },
  ];
  if (maxFlow <= 40) return [
    { value: "0-15", label: "0 - 15 m³/h" },
    { value: "15-30", label: "15 - 30 m³/h" },
    { value: "30+", label: "30+ m³/h" },
  ];
  return [
    { value: "0-30", label: "0 - 30 m³/h" },
    { value: "30-60", label: "30 - 60 m³/h" },
    { value: "60+", label: "60+ m³/h" },
  ];
}

function buildHeadOptions(models: DeepWellModel[]) {
  const maxHead = Math.max(...models.map((m) => m.maxHead));
  if (maxHead <= 100) return [
    { value: "0-40", label: "0 - 40 m" },
    { value: "40-80", label: "40 - 80 m" },
    { value: "80+", label: "80 m+" },
  ];
  if (maxHead <= 250) return [
    { value: "0-80", label: "0 - 80 m" },
    { value: "80-180", label: "80 - 180 m" },
    { value: "180+", label: "180 m+" },
  ];
  return [
    { value: "0-120", label: "0 - 120 m" },
    { value: "120-300", label: "120 - 300 m" },
    { value: "300+", label: "300 m+" },
  ];
}

function inRange(value: number, range: string): boolean {
  if (range.endsWith("+")) return value >= parseFloat(range);
  const [min, max] = range.split("-").map(Number);
  return value >= min && value <= max;
}

/* ─── SVG Performance Curve ─── */
function PerformanceCurve({ model }: { model: DeepWellModel }) {
  const w = 460, h = 300, pad = 42;
  const points = model.performance;
  if (points.length < 2) {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <text x={w / 2} y={h / 2} textAnchor="middle" fill="#6c7a89" fontSize="12">No curve data</text>
      </svg>
    );
  }

  const maxFlow = Math.max(model.maxFlow * 1.15, points[points.length - 1].flow * 1.1);
  const maxHead = Math.ceil(Math.max(model.maxHead, points[0].head) * 1.15 / 10) * 10;

  let curvePath = "";
  for (let i = 0; i < points.length; i++) {
    const cx = pad + (w - pad * 1.4) * (points[i].flow / maxFlow);
    const cy = h - pad - (h - pad * 1.6) * (points[i].head / maxHead);
    curvePath += i === 0 ? `M${cx},${cy}` : `L${cx},${cy}`;
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-label="Performance curve">
      {/* Grid */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = pad + ((w - pad * 1.4) * i) / 5;
        const y = h - pad - ((h - pad * 1.6) * i) / 5;
        const xLabel = ((maxFlow * i) / 5).toFixed(1);
        const yLabel = Math.round((maxHead * i) / 5);
        return (
          <g key={i}>
            <line x1={x} y1={pad / 2} x2={x} y2={h - pad} stroke="#1A2240" strokeWidth="1" />
            <text x={x - 8} y={h - pad + 22} fill="#5A6480" fontSize="11" fontFamily="Arial">{xLabel}</text>
            <line x1={pad} y1={y} x2={w - pad / 2} y2={y} stroke="#1A2240" strokeWidth="1" />
            <text x="6" y={y + 5} fill="#5A6480" fontSize="11" fontFamily="Arial">{yLabel}</text>
          </g>
        );
      })}
      {/* Axis labels */}
      <text x={w / 2 - 40} y={h - 5} fill="#FFFFFF" fontSize="12" fontFamily="Arial" fontWeight="bold">Flow Rate (m³/h)</text>
      <text x="6" y={h / 2 + 40} fill="#FFFFFF" fontSize="12" fontFamily="Arial" fontWeight="bold" transform={`rotate(-90, 6, ${h / 2 + 40})`}>Head (m)</text>
      {/* Curve */}
      <path d={curvePath} fill="none" stroke="#00b8ad" strokeWidth="4" strokeLinejoin="round" />
      {/* Data points */}
      {points.map((p, i) => {
        const cx = pad + (w - pad * 1.4) * (p.flow / maxFlow);
        const cy = h - pad - (h - pad * 1.6) * (p.head / maxHead);
        return <circle key={i} cx={cx} cy={cy} r={3.5} fill="white" stroke="#00b8ad" strokeWidth="2" />;
      })}
      {/* Model label */}
      <text x={w - 100} y={26} fill="#008b87" fontSize="13" fontFamily="Arial" fontWeight="bold">{model.model}</text>
    </svg>
  );
}

/* ─── Main Component ─── */
export default function DeepWellSeriesPage({ series, basePath }: Props) {
  const flowOptions = useMemo(() => buildFlowOptions(series.models), [series.models]);
  const headOptions = useMemo(() => buildHeadOptions(series.models), [series.models]);

  const [flowFilter, setFlowFilter] = useState(flowOptions[0]?.value ?? "0-10");
  const [headFilter, setHeadFilter] = useState(headOptions[0]?.value ?? "0-100");
  const [selectedModel, setSelectedModel] = useState<DeepWellModel>(series.models[0]);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const result = series.models.filter(
      (m) => inRange(m.maxFlow, flowFilter) && inRange(m.maxHead, headFilter)
    );
    return result.length > 0 ? result : series.models;
  }, [series.models, flowFilter, headFilter]);

  // Keep selected model in filtered set — React-safe: only use filtered[0] as fallback
  const displayModel = filtered.includes(selectedModel) ? selectedModel : filtered[0];

  const visibleModels = expanded ? filtered : filtered.slice(0, 9);

  const maxHead = series.models.length > 0
    ? series.models[series.models.length - 1].maxHead
    : 0;
  const powerRange = series.models.length > 0
    ? `${series.models[0].powerKw} – ${series.models[series.models.length - 1].powerKw} kW`
    : "N/A";

  const voltageLabel = series.models.length > 0
    ? series.models[0].voltage === "both"
      ? "Single & Three Phase"
      : series.models[0].voltage
    : "";

  return (
    <main className="bg-bg-primary text-white min-h-screen">

      {/* ════════════ ① HERO ════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "radial-gradient(circle at 70% 35%, #1a3a5c 0%, #0a1a2e 46%, #040f1c 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center gap-8 py-16 lg:py-20 min-h-[430px]">
            <div>
              <nav className="text-xs text-[#a7c6d0] mb-8 flex items-center gap-2">
                <Link href={`${basePath}/`} className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href={`${basePath}/products`} className="hover:text-white transition-colors">Products</Link>
                <span>›</span>
                <Link href={`${basePath}/products/deep-well-pump`} className="hover:text-white transition-colors">Deep Well Pump</Link>
                <span>›</span>
                <span className="text-text-secondary">{series.name}</span>
              </nav>
              <h1 className="text-5xl font-black uppercase tracking-tight mb-3 leading-none">
                {series.name}<br />Deep Well Pump
              </h1>
              <h2 className="text-2xl text-accent-cyan font-semibold mb-3">
                {series.family} Series · Reliable Groundwater Extraction
              </h2>
              <p className="text-[#d9e9ef] text-sm max-w-lg leading-relaxed mb-8">
                {series.description}
              </p>

              {/* 5 Hero badges */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Ruler, label: series.boreholeSize, sub: "Borehole" },
                  { icon: Gauge, label: `${maxHead}m`, sub: "Max Head" },
                  { icon: Zap, label: `${series.rpm}`, sub: "RPM" },
                  { icon: Droplets, label: `${series.modelCount}`, sub: "Models" },
                  { icon: Star, label: "Stainless", sub: "Steel" },
                ].map((b) => (
                  <div key={b.sub} className="min-w-[72px] font-black text-center">
                    <b.icon className="w-8 h-8 mx-auto mb-1 text-accent-cyan" strokeWidth={1.5} />
                    <div className="text-sm">{b.label}</div>
                    <div className="text-[10px] text-[#a7c6d0] uppercase tracking-wider">{b.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-end">
              <div className="w-full max-w-xl flex items-center justify-center">
                <img
                  src={`/images/${series.image}`}
                  alt={series.name}
                  className="max-h-[340px] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ② FIND THE RIGHT MODEL — FILTER ════════════ */}
      <section className="py-12 bg-bg-card border-b border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-1">Find The Right Model</h2>
            <p className="text-sm text-text-secondary">Select your requirements and find the most suitable {series.name} pump model.</p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            {/* Required Head */}
            <label className="flex flex-col gap-1 min-w-[160px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Required Head</span>
              <select
                value={headFilter}
                onChange={(e) => setHeadFilter(e.target.value)}
                className="bg-bg-primary border border-border-default rounded px-3 py-2.5 text-sm text-white focus:border-border-glow outline-none"
              >
                {headOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>

            {/* Required Flow */}
            <label className="flex flex-col gap-1 min-w-[160px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Required Flow</span>
              <select
                value={flowFilter}
                onChange={(e) => setFlowFilter(e.target.value)}
                className="bg-bg-primary border border-border-default rounded px-3 py-2.5 text-sm text-white focus:border-border-glow outline-none"
              >
                {flowOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>

            {/* Voltage */}
            <label className="flex flex-col gap-1 min-w-[150px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Voltage</span>
              <select className="bg-bg-primary border border-border-default rounded px-3 py-2.5 text-sm text-white focus:border-border-glow outline-none">
                <option value={voltageLabel}>{voltageLabel}</option>
              </select>
            </label>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => {
                  setHeadFilter(headOptions[0]?.value ?? "0-100");
                  setFlowFilter(flowOptions[0]?.value ?? "0-10");
                }}
                className="text-sm font-bold text-accent-cyan-dark hover:text-accent-cyan transition-colors cursor-pointer bg-transparent border-0"
              >
                Clear All
              </button>
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
                  <span className="text-text-secondary font-normal">({filtered.length} models found)</span>
                </h2>
                {filtered.length > 9 && (
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
                      <th className="px-5 py-3">Model</th>
                      {series.models[0]?.threePhase && (
                        <th className="px-5 py-3">3-Phase</th>
                      )}
                      <th className="px-5 py-3">Power</th>
                      <th className="px-5 py-3">HP</th>
                      <th className="px-5 py-3">Max. Flow</th>
                      <th className="px-5 py-3">Max. Head</th>
                      <th className="px-5 py-3">Outlet</th>
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
                        <td className="px-5 py-3 font-semibold text-white">{m.model}</td>
                        {series.models[0]?.threePhase && (
                          <td className="px-5 py-3 text-text-secondary text-xs">
                            {m.threePhase || "—"}
                          </td>
                        )}
                        <td className="px-5 py-3 text-text-secondary">{m.powerKw} kW</td>
                        <td className="px-5 py-3 text-text-secondary">{m.hp}</td>
                        <td className="px-5 py-3 text-text-secondary">{m.maxFlow} m³/h</td>
                        <td className="px-5 py-3 font-semibold text-white">{m.maxHead} m</td>
                        <td className="px-5 py-3 text-text-secondary">{m.outlet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="p-8 text-center text-text-secondary">
                    No models match your filter criteria. Try adjusting the values.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Model Details Card */}
            <div className="space-y-4">
              <div className="bg-bg-card rounded-xl border border-border-default p-5">
                <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Model Details</h3>
                <div className="text-lg font-black text-white mb-3">{displayModel.model}</div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
                  <dt className="text-text-secondary font-medium">Power</dt>
                  <dd className="text-white">{displayModel.powerKw} kW</dd>
                  <dt className="text-text-secondary font-medium">Horsepower</dt>
                  <dd className="text-white">{displayModel.hp} HP</dd>
                  <dt className="text-text-secondary font-medium">Max. Flow</dt>
                  <dd className="text-white">{displayModel.maxFlow} m³/h</dd>
                  <dt className="text-text-secondary font-medium">Max. Head</dt>
                  <dd className="text-white">{displayModel.maxHead} m</dd>
                  <dt className="text-text-secondary font-medium">Outlet</dt>
                  <dd className="text-white">{displayModel.outlet}</dd>
                  <dt className="text-text-secondary font-medium">Voltage</dt>
                  <dd className="text-white">
                    {displayModel.voltage === "both" ? "1~ / 3~" : displayModel.voltage}
                  </dd>
                  {displayModel.threePhase && (
                    <>
                      <dt className="text-text-secondary font-medium">3-Phase Model</dt>
                      <dd className="text-white">{displayModel.threePhase}</dd>
                    </>
                  )}
                </dl>
                <button
                  onClick={() => {
                    const csv = [
                      "Flow (m³/h),Head (m)",
                      ...displayModel.performance.map((p) => `${p.flow},${p.head}`),
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
              </div>

              {/* Performance Curve */}
              <div className="bg-bg-card rounded-xl border border-border-default p-5">
                <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Performance Curve</h3>
                <PerformanceCurve model={displayModel} />
                <p className="text-[10px] text-text-secondary mt-2">
                  Curve data from official 2022 catalog. Tolerance according to ISO 9906.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ④ FEATURES STRIP ════════════ */}
      <section className="py-10 bg-bg-card border-y border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Zap, title: "High Efficiency", desc: "Multi-stage hydraulic design delivers up to 78% efficiency for energy savings." },
              { icon: Droplets, title: "Sand Resistant", desc: "Floating impeller design tolerates sandy water conditions in boreholes." },
              { icon: ShieldCheck, title: "Stainless Steel", desc: "AISI 304 pump body, shaft and impellers for corrosion resistance." },
              { icon: Gauge, title: "Deep Extraction", desc: `Extracts water from ${series.boreholeSize} boreholes up to ${maxHead}m depth.` },
              { icon: CheckCircle, title: "OEM & ODM", desc: "Custom branding, packaging and technical support available." },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <f.icon className="w-10 h-10 mx-auto mb-2 text-[#0a6b6a]" strokeWidth={1.5} />
                <div className="text-sm font-bold text-white mb-1">{f.title}</div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
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
                {[
                  { label: "Agricultural Irrigation", icon: Droplets },
                  { label: "Industrial Water Supply", icon: Zap },
                  { label: "Remote Communities", icon: HomeIcon },
                  { label: "Livestock Watering", icon: Droplets },
                ].map((app) => (
                  <div key={app.label} className="bg-bg-card rounded-xl border border-border-default p-4 text-center group hover:border-[#00b8ad]/40 hover:shadow-md transition-all duration-300">
                    <app.icon className="w-10 h-10 mx-auto mb-2 text-[#0a6b6a]" strokeWidth={1.5} />
                    <p className="text-xs font-bold text-white">{app.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Overview Card */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Technical Overview</h2>
              <div className="bg-bg-card rounded-xl border border-border-default p-6">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-text-secondary text-xs uppercase mb-1">Borehole Size</dt>
                    <dd className="font-bold text-white">{series.boreholeSize}</dd>
                  </div>
                  <div>
                    <dt className="text-text-secondary text-xs uppercase mb-1">RPM</dt>
                    <dd className="font-bold text-white">{series.rpm}</dd>
                  </div>
                  <div>
                    <dt className="text-text-secondary text-xs uppercase mb-1">Total Models</dt>
                    <dd className="font-bold text-white">{series.modelCount}</dd>
                  </div>
                  <div>
                    <dt className="text-text-secondary text-xs uppercase mb-1">Max Head</dt>
                    <dd className="font-bold text-white">{maxHead} m</dd>
                  </div>
                  <div>
                    <dt className="text-text-secondary text-xs uppercase mb-1">Power Range</dt>
                    <dd className="font-bold text-white">{powerRange}</dd>
                  </div>
                  <div>
                    <dt className="text-text-secondary text-xs uppercase mb-1">Voltage</dt>
                    <dd className="font-bold text-white">{voltageLabel}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-text-secondary text-xs uppercase mb-1">Series Family</dt>
                    <dd className="font-bold text-white">{series.family}</dd>
                  </div>
                </dl>
                <p className="text-xs text-text-secondary mt-4 leading-relaxed">{series.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ⑥ FAQ ════════════ */}
      {(() => {
        const faqItems = [
          { q: `How deep can the ${series.name} pump extract water from?`, a: `The ${series.name} series delivers water from boreholes up to ${maxHead}m deep through ${series.boreholeSize} diameter wells.` },
          { q: "What is the difference between single-phase and three-phase models?", a: "Single-phase runs on standard 220-240V household power. Three-phase models run on 380-415V industrial power for higher efficiency." },
          { q: "How do I choose the right model for my well?", a: "Use the filter to set your required head and flow. Choose the model near the best efficiency point. Contact us for professional sizing." },
          { q: "What material is the pump made of?", a: "All ALFAGRAND deep well pumps feature AISI 304 stainless steel construction for pump body, shaft, and impellers for excellent corrosion resistance." },
          { q: "What is the warranty period?", a: "Standard warranty is 3 years. Extended warranty options available for OEM/ODM orders." },
        ];
        return (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqItems.map((f) => ({
                  "@type": "Question", name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        );
      })()}
      <section className="py-12 bg-bg-card border-t border-border-default">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: `How deep can the ${series.name} pump extract water from?`,
                a: `The ${series.name} series delivers water from boreholes up to ${maxHead}m deep through ${series.boreholeSize} diameter wells. The multi-stage design ensures stable pressure even at maximum depth.`,
              },
              {
                q: `What is the difference between single-phase and three-phase models?`,
                a: `Single-phase (M suffix, e.g. ${series.models[0]?.model}) runs on standard 220-240V household power. Three-phase models run on 380-415V industrial power for higher efficiency. Both deliver the same hydraulic performance.`,
              },
              {
                q: "How do I choose the right model for my well?",
                a: "Use the filter above to set your required head (depth + elevation + pipe friction) and flow. Choose the model that operates near the best efficiency point of the curve. Contact us for professional sizing assistance.",
              },
              {
                q: "What material is the pump made of?",
                a: "All ALFAGRAND deep well pumps feature AISI 304 stainless steel construction for the pump body, shaft, coupling, and impellers. This ensures excellent corrosion resistance and long service life in groundwater applications.",
              },
              {
                q: "What is the warranty period?",
                a: "Standard warranty is 3 years. Extended warranty options available for OEM/ODM orders. Warranty covers manufacturing defects under normal operating conditions.",
              },
            ].map((faq, idx) => (
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Need Help Choosing The Right Deep Well Pump?</h2>
              <p className="text-sm text-[#a7c6d0]">Our experts are ready to help you find the best {series.name} model for your application.</p>
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
  );
}

/* ─── Home icon (inline SVG since lucide-react doesn't have a generic one beyond "Home") ─── */
function HomeIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
