"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star, CheckCircle, HeadphonesIcon, Target } from "lucide-react";

/* ─── Helpers ─── */
const SOLAR = (name: string) => `/images/solar/${name}`;

/* ─── Model data ─── */
interface SolarModel {
  model: string;
  power: string;
  kw: number;
  flow: number;   // m³/h
  head: number;   // m
  outlet: string;
  voltage: string;
  panels: string;
  controller: string;
  motor: string;
  protection: string;
}

const allModels: SolarModel[] = [
  { model: "4SSM2/8",  power: "550W",  kw: 0.55, flow: 2.0,  head: 50,   outlet: '1¼"', voltage: "48",  panels: "2 × 300W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM2/12", power: "750W",  kw: 0.75, flow: 2.0,  head: 75,   outlet: '1¼"', voltage: "48",  panels: "3 × 300W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM2/18", power: "1100W", kw: 1.1,  flow: 2.0,  head: 110,  outlet: '1¼"', voltage: "72",  panels: "4 × 330W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM3/15", power: "1100W", kw: 1.1,  flow: 3.0,  head: 90,   outlet: '1¼"', voltage: "72",  panels: "4 × 330W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM3/25", power: "1500W", kw: 1.5,  flow: 3.0,  head: 150,  outlet: '1¼"', voltage: "96",  panels: "2 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM3/35", power: "2200W", kw: 2.2,  flow: 3.0,  head: 200,  outlet: '1¼"', voltage: "110", panels: "4 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM4/15", power: "1500W", kw: 1.5,  flow: 4.0,  head: 80,   outlet: '1¼"', voltage: "96",  panels: "2 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM4/25", power: "2200W", kw: 2.2,  flow: 4.0,  head: 130,  outlet: '1¼"', voltage: "110", panels: "4 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM4/40", power: "3000W", kw: 3.0,  flow: 4.0,  head: 200,  outlet: '1¼"', voltage: "110", panels: "6 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM5/20", power: "2200W", kw: 2.2,  flow: 5.0,  head: 105,  outlet: '2"',   voltage: "110", panels: "4 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM6/15", power: "3000W", kw: 3.0,  flow: 6.0,  head: 95,   outlet: '2"',   voltage: "220", panels: "6 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM8/12", power: "4000W", kw: 4.0,  flow: 8.0,  head: 90,   outlet: '2"',   voltage: "220", panels: "8 × 550W",  controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
  { model: "4SSM10/10", power: "5500W", kw: 5.5, flow: 10.0, head: 80,   outlet: '2½"',  voltage: "220", panels: "10 × 550W", controller: "MPPT Controller", motor: "Brushless DC Motor", protection: "IP68" },
];

/* ─── Filter options ─── */
const flowOptions = [
  { value: "0-5", label: "0 - 5 m³/h" },
  { value: "5-10", label: "5 - 10 m³/h" },
  { value: "10-20", label: "10 - 20 m³/h" },
  { value: "20+", label: "20+ m³/h" },
];
const headOptions = [
  { value: "0-50", label: "0 - 50 m" },
  { value: "50-100", label: "50 - 100 m" },
  { value: "100-200", label: "100 - 200 m" },
  { value: "200+", label: "200 m+" },
];
const voltageOptions = [
  { value: "48", label: "48V DC" },
  { value: "72", label: "72V DC" },
  { value: "96", label: "96V DC" },
  { value: "110", label: "110V DC" },
  { value: "220", label: "220V DC" },
  { value: "any", label: "Any Voltage" },
];

function inRange(value: number, range: string): boolean {
  if (range === "any") return true;
  if (range.endsWith("+")) return value >= parseFloat(range);
  const [min, max] = range.split("-").map(Number);
  return value >= min && value <= max;
}

/* ─── SVG Performance Curve ─── */
function PerformanceCurve({ model }: { model: SolarModel }) {
  const w = 460, h = 300, pad = 42;
  const maxFlow = Math.max(3.5, model.flow * 1.25);
  const maxHead = Math.ceil(model.head * 1.25 / 50) * 50;

  // Build curve path
  let curvePath = "";
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const q = (maxFlow * i) / steps;
    const headVal = model.head * (1 - Math.pow(q / maxFlow, 2.1));
    const cx = pad + (w - pad * 1.4) * (q / maxFlow);
    const cy = h - pad - (h - pad * 1.6) * (Math.max(0, headVal) / maxHead);
    curvePath += i === 0 ? `M${cx},${cy}` : `L${cx},${cy}`;
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-label="Performance curve">
      {/* Grid lines */}
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
      {/* Model label */}
      <text x={w - 100} y={34} fill="#008b87" fontSize="13" fontFamily="Arial" fontWeight="bold">{model.model}</text>
    </svg>
  );
}

/* ─── Main Component ─── */
export default function SolarSubmersibleSeriesPage({ locale, basePath }: { locale: string; basePath: string }) {
  const [flowFilter, setFlowFilter] = useState("0-5");
  const [headFilter, setHeadFilter] = useState("100-200");
  const [voltageFilter, setVoltageFilter] = useState("96");
  const [selectedModel, setSelectedModel] = useState<SolarModel>(allModels.find(m => m.model === "4SSM3/25") || allModels[0]);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const result = allModels.filter(m =>
      inRange(m.flow, flowFilter) &&
      inRange(m.head, headFilter) &&
      (voltageFilter === "any" || m.voltage === voltageFilter)
    );
    return result.length > 0 ? result : allModels;
  }, [flowFilter, headFilter, voltageFilter]);

  // Keep selected model in filtered set
  const safeSelected = filtered.includes(selectedModel) ? selectedModel : filtered[0];
  if (safeSelected !== selectedModel) setSelectedModel(safeSelected);

  const visibleModels = expanded ? filtered : filtered.slice(0, 9);

  return (
    <main className="bg-bg-primary text-white min-h-screen">

      {/* ════════════ ① HERO ════════════ */}
      <section className="relative overflow-hidden text-white" style={{ background: "radial-gradient(circle at 70% 35%, #174b67 0%, #071a28 46%, #041018 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center gap-8 py-16 lg:py-20 min-h-[430px]">
            <div>
              <nav className="text-xs text-[#a7c6d0] mb-8 flex items-center gap-2">
                <Link href={`${basePath}/`} className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href={`${basePath}/products`} className="hover:text-white transition-colors">Products</Link>
                <span>›</span>
                <Link href={`${basePath}/products/solar-pump-system`} className="hover:text-white transition-colors">Solar Pump System</Link>
                <span>›</span>
                <span className="text-text-secondary">Solar Submersible Pump Series</span>
              </nav>
              <h1 className="text-5xl font-black uppercase tracking-tight mb-3 leading-none">
                Solar Submersible<br />Pump Series
              </h1>
              <h2 className="text-2xl text-accent-cyan font-semibold mb-3">
                Powerful. Efficient. Fully Submersible.
              </h2>
              <p className="text-[#d9e9ef] text-sm max-w-lg leading-relaxed mb-8">
                ALFAGRAND solar submersible pumps are designed for deep well water extraction with high
                efficiency, MPPT control and stable operation in remote areas without grid power.
              </p>

              {/* 5 Hero badges */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: SOLAR("icon-solar.svg"), label: "100%", sub: "Solar Powered" },
                  { icon: SOLAR("icon-efficiency.svg"), label: "High", sub: "Efficiency" },
                  { icon: SOLAR("icon-controller.svg"), label: "MPPT", sub: "Technology" },
                  { icon: SOLAR("icon-shield.svg"), label: "Dry Run", sub: "Protection" },
                  { icon: SOLAR("icon-steel.svg"), label: "Stainless", sub: "Steel" },
                ].map((b) => (
                  <div key={b.sub} className="min-w-[72px] font-black text-center">
                    <img src={b.icon} alt="" className="w-8 h-8 mx-auto mb-1" />
                    <div className="text-sm">{b.label}</div>
                    <div className="text-[10px] text-[#a7c6d0] uppercase tracking-wider">{b.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-end">
              <img src={SOLAR("hero-solar-submersible.svg")} alt="Solar submersible pump system" className="w-full max-w-xl object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ② FIND THE RIGHT MODEL — FILTER ════════════ */}
      <section className="py-12 bg-bg-card border-b border-border-default">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-1">Find The Right Model</h2>
            <p className="text-sm text-text-secondary">Select your requirements and find the most suitable solar submersible pump models.</p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            {/* Water Source */}
            <label className="flex flex-col gap-1 min-w-[140px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Water Source</span>
              <select className="bg-bg-primary border border-border-default rounded px-3 py-2.5 text-sm text-white focus:border-border-glow outline-none">
                <option>Deep Well</option>
                <option>Reservoir</option>
                <option>River</option>
                <option>Tank</option>
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

            {/* Total Dynamic Head */}
            <label className="flex flex-col gap-1 min-w-[160px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Total Dynamic Head</span>
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

            {/* Solar Voltage */}
            <label className="flex flex-col gap-1 min-w-[150px]">
              <span className="text-[11px] font-semibold text-text-secondary uppercase">Solar Voltage</span>
              <select
                value={voltageFilter}
                onChange={(e) => setVoltageFilter(e.target.value)}
                className="bg-bg-primary border border-border-default rounded px-3 py-2.5 text-sm text-white focus:border-border-glow outline-none"
              >
                {voltageOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => { setFlowFilter("0-5"); setHeadFilter("100-200"); setVoltageFilter("96"); }}
                className="text-sm font-bold text-accent-cyan-dark hover:text-accent-cyan transition-colors cursor-pointer bg-transparent border-0"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ③ MATCHING MODELS ════════════ */}
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
                      <th className="px-5 py-3">Power</th>
                      <th className="px-5 py-3">Max. Flow</th>
                      <th className="px-5 py-3">Max. Head</th>
                      <th className="px-5 py-3">Outlet</th>
                      <th className="px-5 py-3">Solar Voltage</th>
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
                        <td className="px-5 py-3 text-text-secondary">{m.power}</td>
                        <td className="px-5 py-3 text-text-secondary">{m.flow.toFixed(1)} m³/h</td>
                        <td className="px-5 py-3 text-text-secondary">{m.head} m</td>
                        <td className="px-5 py-3 text-text-secondary">{m.outlet}</td>
                        <td className="px-5 py-3 text-text-secondary">{m.voltage}V DC</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Model Details */}
            <div className="space-y-4">
              <div className="bg-bg-card rounded-xl border border-border-default p-5">
                <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Model Details</h3>
                <div className="text-lg font-black text-white mb-3">{selectedModel.model}</div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
                  <dt className="text-text-secondary font-medium">Power</dt>
                  <dd className="text-white">{selectedModel.power}</dd>
                  <dt className="text-text-secondary font-medium">Max. Flow</dt>
                  <dd className="text-white">{selectedModel.flow.toFixed(1)} m³/h</dd>
                  <dt className="text-text-secondary font-medium">Max. Head</dt>
                  <dd className="text-white">{selectedModel.head} m</dd>
                  <dt className="text-text-secondary font-medium">Outlet</dt>
                  <dd className="text-white">{selectedModel.outlet}</dd>
                  <dt className="text-text-secondary font-medium">Solar Voltage</dt>
                  <dd className="text-white">{selectedModel.voltage}V DC</dd>
                  <dt className="text-text-secondary font-medium">Panels</dt>
                  <dd className="text-white">{selectedModel.panels}</dd>
                  <dt className="text-text-secondary font-medium">Controller</dt>
                  <dd className="text-white">{selectedModel.controller}</dd>
                  <dt className="text-text-secondary font-medium">Motor</dt>
                  <dd className="text-white">{selectedModel.motor}</dd>
                  <dt className="text-text-secondary font-medium">Protection</dt>
                  <dd className="text-white">{selectedModel.protection}</dd>
                </dl>
                <a
                  href={SOLAR(`datasheet-${selectedModel.model.replace("/", "-")}.txt`)}
                  download
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded border border-[#d4e3e8] text-sm font-bold text-[#0a6b6a] hover:bg-bg-primary transition-colors"
                >
                  Download Data Sheet
                </a>
              </div>

              {/* Performance Curve */}
              <div className="bg-bg-card rounded-xl border border-border-default p-5">
                <h3 className="text-sm font-bold uppercase text-text-secondary mb-3">Performance Curve</h3>
                <PerformanceCurve model={selectedModel} />
                <p className="text-[10px] text-text-secondary mt-2">
                  Curve tolerance according to ISO 9906 Grade 3B. Demo data for layout development.
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
              { icon: SOLAR("icon-efficiency.svg"), title: "High Efficiency", desc: "Permanent magnet motor provides high efficiency and longer life." },
              { icon: SOLAR("icon-controller.svg"), title: "MPPT Controller", desc: "Maximize solar energy utilization for stable operation." },
              { icon: SOLAR("icon-steel.svg"), title: "Stainless Steel", desc: "AISI 304/316 body for corrosion resistance." },
              { icon: SOLAR("icon-shield.svg"), title: "Dry Run Protection", desc: "Built-in protection for dry run, overload and voltage fluctuation." },
              { icon: SOLAR("icon-tools.svg"), title: "OEM & ODM", desc: "Branding, packaging and technical support available." },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <img src={f.icon} alt="" className="w-10 h-10 mx-auto mb-2" />
                <div className="text-sm font-bold text-white mb-1">{f.title}</div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ ⑤ TYPICAL APPLICATIONS + SYSTEM COMPONENTS ════════════ */}
      <section className="py-12 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Applications */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Typical Applications</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Agricultural Irrigation", img: SOLAR("app-irrigation.svg") },
                  { label: "Domestic Water Supply", img: SOLAR("app-domestic.svg") },
                  { label: "Livestock Watering", img: SOLAR("app-livestock.svg") },
                  { label: "Remote Storage & Transfer", img: SOLAR("app-remote.svg") },
                ].map((app) => (
                  <div key={app.label} className="bg-bg-card rounded-xl border border-border-default p-4 text-center group hover:border-[#00b8ad]/40 hover:shadow-md transition-all duration-300">
                    <img src={app.img} alt={app.label} className="w-16 h-16 mx-auto mb-2 object-contain" />
                    <p className="text-xs font-bold text-white">{app.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Components */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-6">System Components</h2>
              <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 bg-bg-card rounded-xl border border-border-default p-6">
                {[
                  { label: "Solar Panels", img: SOLAR("component-panel.svg") },
                  { label: "MPPT Controller", img: SOLAR("component-controller.svg") },
                  { label: "Submersible Pump", img: SOLAR("component-pump.svg") },
                  { label: "Cables", img: SOLAR("component-cable.svg") },
                  { label: "Accessories", img: SOLAR("component-accessories.svg") },
                ].map((c, idx, arr) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="flex flex-col items-center gap-1">
                      <img src={c.img} alt="" className="w-10 h-10" />
                      <span className="text-[10px] font-semibold text-white">{c.label}</span>
                    </span>
                    {idx < arr.length - 1 && (
                      <span className="text-[#d9e7ec] text-xl font-bold">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ⑥ FAQ ════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { q: "How deep can the pump work?", a: "Depending on selected model, maximum head can range from 50m to 300m+." },
              { q: "Can it run without batteries?", a: "Yes, most solar pump systems can run directly from solar panels with MPPT controller." },
              { q: "How many solar panels do I need?", a: "The required panel quantity depends on motor power, voltage and local sunlight conditions." },
              { q: "What is the water temperature range?", a: "Typical clean water temperature range is 0-40°C unless otherwise specified." },
            ].map((f) => ({
              "@type": "Question", name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <section className="py-12 bg-bg-card border-t border-border-default">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "How deep can the pump work?", a: "Depending on selected model, maximum head can range from 50m to 300m+." },
              { q: "Can it run without batteries?", a: "Yes, most solar pump systems can run directly from solar panels with MPPT controller." },
              { q: "How many solar panels do I need?", a: "The required panel quantity depends on motor power, voltage and local sunlight conditions." },
              { q: "What is the water temperature range?", a: "Typical clean water temperature range is 0-40°C unless otherwise specified." },
              { q: "What is the warranty period?", a: "Warranty can be confirmed according to market and order requirements." },
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Need Help Choosing The Right Solar Pump?</h2>
              <p className="text-sm text-[#a7c6d0]">Our experts are ready to help you find the best solution for your needs.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <Link href={`${basePath}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded text-white text-sm font-bold bg-gradient-to-r from-[#00b8ad] to-[#029a93] hover:opacity-90 transition-all shadow-lg">
                Get a Quote
              </Link>
              <a href="https://wa.me/8618657933982" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded text-white text-sm font-bold bg-[#0c7b55] hover:bg-[#1fae70] transition-all border border-[#1fae70]">
                Contact Our Experts
              </a>
              <Link href={`${basePath}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#9fb8c2] text-white text-sm font-bold hover:border-white transition-all">
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
