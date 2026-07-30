"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star, CheckCircle, HeadphonesIcon, Target, Download } from "lucide-react";
import type { SolarSeriesData, SolarModel } from "@/data/solar-pump-models";

/* ─── Helpers ─── */
const SOLAR = (name: string) => `/images/solar/${name}`;

/* ─── Filter options ─── */
const flowRanges = [
  { value: "all", label: "All Flow" },
  { value: "0-3", label: "0 - 3 m³/h" },
  { value: "3-6", label: "3 - 6 m³/h" },
  { value: "6-10", label: "6 - 10 m³/h" },
  { value: "10+", label: "10+ m³/h" },
];

const headRanges = [
  { value: "all", label: "All Head" },
  { value: "0-50", label: "0 - 50 m" },
  { value: "50-100", label: "50 - 100 m" },
  { value: "100-200", label: "100 - 200 m" },
  { value: "200+", label: "200 m+" },
];

function inRange(value: number, range: string): boolean {
  if (range === "all") return true;
  if (range.endsWith("+")) return value >= parseFloat(range);
  const [lo, hi] = range.split("-").map(Number);
  return value >= lo && value <= hi;
}

/* ─── SVG Performance Curve ─── */
function PerformanceCurve({ model }: { model: SolarModel }) {
  const w = 460, h = 300, pad = 42;
  const qMax = Math.max(3, model.maxFlow * 1.3);
  const hMax = Math.ceil(model.maxHead * 1.25 / 50) * 50;

  let curve = "";
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const q = (qMax * i) / steps;
    const ratio = q / qMax;
    const headVal = model.maxHead * (1 - Math.pow(ratio, 2.1));
    const cx = pad + (w - pad * 1.4) * (q / qMax);
    const cy = h - pad - (h - pad * 1.6) * (Math.max(0, headVal) / hMax);
    curve += i === 0 ? `M${cx.toFixed(1)},${cy.toFixed(1)}` : `L${cx.toFixed(1)},${cy.toFixed(1)}`;
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-label={`Performance curve for ${model.model}`}>
      {/* Grid */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = pad + ((w - pad * 1.4) * i) / 5;
        const y = h - pad - ((h - pad * 1.6) * i) / 5;
        return (
          <g key={i}>
            <line x1={x} y1={pad / 2} x2={x} y2={h - pad} stroke="#1A2240" strokeWidth="1" />
            <text x={x - 8} y={h - pad + 22} fill="#5A6480" fontSize="11" fontFamily="Arial" textAnchor="middle">{(qMax * i / 5).toFixed(1)}</text>
            <line x1={pad} y1={y} x2={w - pad / 2} y2={y} stroke="#1A2240" strokeWidth="1" />
            <text x="6" y={y + 5} fill="#5A6480" fontSize="11" fontFamily="Arial">{Math.round(hMax * i / 5)}</text>
          </g>
        );
      })}
      <text x={w / 2 - 30} y={h - 5} fill="#FFFFFF" fontSize="12" fontFamily="Arial" fontWeight="bold">Flow Rate (m³/h)</text>
      <text x="8" y={h / 2 + 40} fill="#FFFFFF" fontSize="12" fontFamily="Arial" fontWeight="bold" transform={`rotate(-90, 8, ${h / 2 + 40})`}>Head (m)</text>
      <path d={curve} fill="none" stroke="#00b8ad" strokeWidth="4" strokeLinejoin="round" />
      <text x={w - 120} y={34} fill="#008b87" fontSize="13" fontFamily="Arial" fontWeight="bold">{model.model}</text>
    </svg>
  );
}

/* ─── Power type badge ─── */
function PowerBadge({ type }: { type: "dc" | "acdc" }) {
  if (type === "acdc") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#f59e0b] to-[#ef7c00] text-white">
        ⚡ AC/DC Dual Power
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent-cyan/15 text-accent-cyan-dark">
      ☀️ DC Solar
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════════ */
export default function SolarSeriesPage({ data, locale, basePath }: { data: SolarSeriesData; locale: string; basePath: string }) {
  const [flowFilter, setFlowFilter] = useState("all");
  const [headFilter, setHeadFilter] = useState("all");
  const [selectedModel, setSelectedModel] = useState<SolarModel>(data.models[Math.min(2, data.models.length - 1)]);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const res = data.models.filter(m => inRange(m.maxFlow, flowFilter) && inRange(m.maxHead, headFilter));
    return res.length > 0 ? res : data.models;
  }, [flowFilter, headFilter, data.models]);

  // Keep selection valid
  if (!filtered.includes(selectedModel) && filtered.length > 0) {
    setSelectedModel(filtered[0]);
  }

  const visible = expanded ? filtered : filtered.slice(0, 9);

  return (
    <main className="bg-bg-primary text-white min-h-screen">

      {/* ════════ ① HERO ════════ */}
      <section className="relative overflow-hidden text-white" style={{ background: "radial-gradient(circle at 70% 35%, #174b67 0%, #071a28 46%, #041018 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center gap-8 py-16 lg:py-20 min-h-[430px]">
            <div>
              <nav className="text-xs text-[#a7c6d0] mb-8 flex items-center gap-2 flex-wrap">
                <Link href={`${basePath}/`} className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href={`${basePath}/products`} className="hover:text-white transition-colors">Products</Link>
                <span>›</span>
                <Link href={`${basePath}/products/solar-pump-system`} className="hover:text-white transition-colors">Solar Pump System</Link>
                <span>›</span>
                <span className="text-text-secondary">{data.name}</span>
              </nav>
              <PowerBadge type={data.powerType} />
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mt-3 mb-3 leading-none">
                {data.name}
              </h1>
              <h2 className="text-xl sm:text-2xl text-accent-cyan font-semibold mb-3">
                {data.tagline}
              </h2>
              <p className="text-[#d9e9ef] text-sm max-w-lg leading-relaxed mb-8">
                {data.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { value: String(data.models.length), label: "Models" },
                  { value: `${data.models[0].maxHead}-${data.models[data.models.length - 1].maxHead}m`, label: "Head Range" },
                  { value: `${data.models[0].maxFlow}-${data.models[data.models.length - 1].maxFlow}m³/h`, label: "Flow Range" },
                  { value: data.powerType === "acdc" ? "DC+AC" : "DC", label: "Power" },
                ].map((s) => (
                  <div key={s.label} className="min-w-[72px]">
                    <div className="text-base font-black">{s.value}</div>
                    <div className="text-[10px] text-[#a7c6d0] uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-end">
              <img
                src={SOLAR(`products/${data.slug}.jpg`)}
                alt={data.name}
                className="w-full max-w-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ② FILTER ════════ */}
      <section className="py-10 bg-bg-card border-b border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-1">Find The Right Model</h2>
            <p className="text-sm text-text-secondary">Filter by your required flow and head to find matching pump models.</p>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <label className="flex flex-col gap-1 min-w-[170px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Required Flow</span>
              <select value={flowFilter} onChange={(e) => setFlowFilter(e.target.value)} className="bg-bg-primary border border-border-default rounded px-3 py-2.5 text-sm text-white focus:border-border-glow outline-none">
                {flowRanges.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 min-w-[170px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Total Dynamic Head</span>
              <select value={headFilter} onChange={(e) => setHeadFilter(e.target.value)} className="bg-bg-primary border border-border-default rounded px-3 py-2.5 text-sm text-white focus:border-border-glow outline-none">
                {headRanges.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <button onClick={() => { setFlowFilter("all"); setHeadFilter("all"); }} className="text-sm font-bold text-accent-cyan-dark hover:text-accent-cyan transition-colors cursor-pointer bg-transparent border-0 mb-0.5">
              Clear All
            </button>
          </div>
        </div>
      </section>

      {/* ════════ ③ MODEL TABLE + DETAILS ════════ */}
      <section className="py-12 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {/* Table */}
            <div className="bg-bg-card rounded-xl border border-border-default overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                <h2 className="text-base font-bold">
                  Model Specifications{" "}
                  <span className="text-text-secondary font-normal">({filtered.length} models)</span>
                </h2>
                {filtered.length > 9 && (
                  <button onClick={() => setExpanded(!expanded)} className="text-sm font-bold text-accent-cyan-dark hover:text-accent-cyan transition-colors bg-transparent border-0 cursor-pointer">
                    {expanded ? "Show Less" : `View All ${filtered.length} Models`}
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-bg-primary text-left text-text-secondary text-xs uppercase tracking-wider">
                      <th className="px-5 py-3 w-10"></th>
                      <th className="px-5 py-3">Model</th>
                      <th className="px-5 py-3">Power</th>
                      <th className="px-5 py-3">Voltage</th>
                      <th className="px-5 py-3">Max Flow</th>
                      <th className="px-5 py-3">Max Head</th>
                      <th className="px-5 py-3">Outlet</th>
                      <th className="px-5 py-3">Panels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((m) => (
                      <tr
                        key={m.model}
                        onClick={() => setSelectedModel(m)}
                        className={`border-t border-border-default cursor-pointer transition-colors hover:bg-bg-primary ${
                          m.model === selectedModel.model ? "bg-[#e6f7f6] border-l-2 border-l-[#00b8ad]" : ""
                        }`}
                      >
                        <td className="px-5 py-3">
                          <input type="radio" name="model" checked={m.model === selectedModel.model} onChange={() => setSelectedModel(m)} className="accent-accent-cyan" />
                        </td>
                        <td className="px-5 py-3 font-semibold text-white">{m.model}</td>
                        <td className="px-5 py-3 text-text-secondary">{m.powerW}W</td>
                        <td className="px-5 py-3 text-text-secondary">{m.voltage}</td>
                        <td className="px-5 py-3 text-text-secondary">{m.maxFlow} m³/h</td>
                        <td className="px-5 py-3 text-text-secondary">{m.maxHead} m</td>
                        <td className="px-5 py-3 text-text-secondary">{m.outlet}</td>
                        <td className="px-5 py-3 text-text-secondary">{m.panels}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Model Details */}
            <div className="space-y-4">
              <div className="bg-bg-card rounded-xl border border-border-default p-5">
                <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Model Details</h3>
                <div className="text-lg font-black text-white mb-1">{selectedModel.model}</div>
                <PowerBadge type={data.powerType} />
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm mt-4">
                  <dt className="text-text-secondary font-medium">Power</dt><dd className="text-white font-semibold">{selectedModel.powerW}W</dd>
                  <dt className="text-text-secondary font-medium">Voltage</dt><dd className="text-white">{selectedModel.voltage}</dd>
                  <dt className="text-text-secondary font-medium">Max Flow</dt><dd className="text-white">{selectedModel.maxFlow} m³/h</dd>
                  <dt className="text-text-secondary font-medium">Max Head</dt><dd className="text-white">{selectedModel.maxHead} m</dd>
                  <dt className="text-text-secondary font-medium">Outlet</dt><dd className="text-white">{selectedModel.outlet}</dd>
                  <dt className="text-text-secondary font-medium">Panels</dt><dd className="text-white">{selectedModel.panels}</dd>
                  {data.diameter && (<><dt className="text-text-secondary font-medium">Diameter</dt><dd className="text-white">{data.diameter}</dd></>)}
                  {data.impeller && (<><dt className="text-text-secondary font-medium">Impeller</dt><dd className="text-white capitalize">{data.impeller}</dd></>)}
                </dl>
              </div>

              {/* Performance Curve */}
              <div className="bg-bg-card rounded-xl border border-border-default p-5">
                <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Performance Curve</h3>
                <PerformanceCurve model={selectedModel} />
                <p className="text-[10px] text-text-secondary mt-2">Theoretical H-Q curve. Actual performance depends on installation and operating conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ④ FEATURES ════════ */}
      <section className="py-12 bg-bg-card border-t border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-8">Key Features</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {data.features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <CheckCircle className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-sm text-white leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ⑤ APPLICATIONS ════════ */}
      <section className="py-12 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Typical Applications</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.applications.map((app, i) => (
              <div key={i} className="bg-bg-card rounded-xl border border-border-default p-4 text-center hover:border-[#00b8ad]/40 hover:shadow-md transition-all duration-300">
                <Target className="w-8 h-8 text-accent-cyan/50 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-xs font-semibold text-white">{app}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ⑥ FAQ ════════ */}
      {(() => {
        const faqItems = [
          { q: "What is the maximum well depth this pump can handle?", a: `This series can handle up to ${data.models[data.models.length - 1].maxHead}m total dynamic head.` },
          { q: "Can it run without batteries?", a: "Yes, all our solar pumps can run directly from solar panels through the MPPT controller without batteries. AC/DC models support grid backup." },
          { q: "How many solar panels do I need?", a: `Panel requirements vary by model from ${data.models[0].panels} to ${data.models[data.models.length - 1].panels}.` },
          { q: "What is the warranty period?", a: "Standard warranty is 2-3 years depending on the model and market. Extended warranty options are available for volume orders." },
          { q: "Can I get OEM branding?", a: "Yes, ALFAGRAND offers full OEM/ODM service including custom branding, packaging, cable length, and voltage configurations." },
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
              { q: "What is the maximum well depth this pump can handle?", a: `This series can handle up to ${data.models[data.models.length - 1].maxHead}m total dynamic head. The actual well depth depends on the water level and required pressure at the surface.` },
              { q: "Can it run without batteries?", a: "Yes, all our solar pumps can run directly from solar panels through the MPPT controller without batteries. For AC/DC models, grid power can be used as backup." },
              { q: "How many solar panels do I need?", a: `Panel requirements vary by model from ${data.models[0].panels} to ${data.models[data.models.length - 1].panels}. Check the specifications table for your selected model.` },
              { q: "What is the warranty period?", a: "Standard warranty is 2-3 years depending on the model and market. Extended warranty options are available for volume orders." },
              { q: "Can I get OEM branding?", a: "Yes, ALFAGRAND offers full OEM/ODM service including custom branding, packaging, cable length, and voltage configurations." },
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

      {/* ════════ ⑦ CTA ════════ */}
      <section className="py-12 bg-[#071622] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Interested in the {data.name}?</h2>
              <p className="text-sm text-[#a7c6d0]">Contact our sales team for pricing, technical specifications, and OEM options.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <Link href={`${basePath}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded text-white text-sm font-bold bg-gradient-to-r from-[#00b8ad] to-[#029a93] hover:opacity-90 transition-all shadow-lg">
                Request a Quote
              </Link>
              <a href="https://wa.me/8618657933982" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded text-white text-sm font-bold bg-[#0c7b55] hover:bg-[#1fae70] transition-all border border-[#1fae70]">
                WhatsApp Inquiry
              </a>
              <Link href={`${basePath}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#9fb8c2] text-white text-sm font-bold hover:border-white transition-all">
                OEM & ODM Options
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
