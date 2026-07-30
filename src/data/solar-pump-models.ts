/* ═══════════════════════════════════════════════════════════════════
   Solar Pump Model Data — Transcribed from 2025-1 Solar Pumps PDF
   All 21 series with real model numbers, specs, and parameters.
   Extracted from PDF specification tables (Pages 11-47).
   ═══════════════════════════════════════════════════════════════════ */

export interface SolarModel {
  model: string;
  powerW: number;
  voltage: string;
  maxFlow: number;   // m³/h
  maxHead: number;   // m
  outlet: string;
  panels: string;
  stages?: number;   // optional number of stages
}

export interface SolarSeriesData {
  slug: string;
  name: string;
  tagline: string;
  type: "borehole" | "surface" | "submersible" | "pool";
  powerType: "dc" | "acdc";
  diameter?: string;  // "2\"", "3\"", "4\"", "4\"-6\""
  impeller?: "screw" | "plastic" | "ss";
  description: string;
  features: string[];
  applications: string[];
  models: SolarModel[];
  // Performance curve reference data (for H-Q chart)
  perfNote?: string;
}

/* ═══════════════════════════════════════════════════════════════════
    DC SOLAR PUMP — 13 Series
   ═══════════════════════════════════════════════════════════════════ */

// 1. 2" DC Screw/Impeller Solar Pump (Page 11)
const series2inchDc: SolarSeriesData = {
  slug: "2inch-dc-screw-impeller",
  name: '2" DC Screw/Impeller Solar Pump',
  tagline: "Compact Deep Well Solution",
  type: "borehole",
  powerType: "dc",
  diameter: '2"',
  impeller: "screw",
  description: "Ultra-slim 2-inch diameter DC solar pump designed for narrow boreholes and deep wells. Available in both impeller (2PWSS - high flow) and screw (2PSC - high head) types. All models feature permanent magnet brushless DC motors with MPPT controller compatibility.",
  features: [
    "Ultra-slim 2-inch design fits narrow boreholes",
    "Impeller type (2PWSS) for high flow / Screw type (2PSC) for high head",
    "Permanent magnet brushless DC motor",
    "Stainless steel pump body and outlet",
    "MPPT controller compatible",
    "Dry-run and overload protection",
    "Low noise, maintenance-free operation",
    "OEM/ODM branding available",
  ],
  applications: ["Deep Wells & Boreholes", "Domestic Water Supply", "Livestock Watering", "Remote Village Water", "Drip Irrigation"],
  models: [
    // 2PWSS Impeller Type
    { model: "2PWSS1.2-45-24-180", powerW: 180, voltage: "24V", maxFlow: 1.2, maxHead: 45, outlet: '0.75"', panels: "1 × 200W" },
    { model: "2PWSS1.2-60-24-250", powerW: 250, voltage: "24V", maxFlow: 1.2, maxHead: 60, outlet: '0.75"', panels: "2 × 150W" },
    { model: "2PWSS1.5-90-48-400", powerW: 400, voltage: "48V", maxFlow: 1.5, maxHead: 90, outlet: '0.75"', panels: "2 × 250W" },
    { model: "2PWSS1.5-120-72-600", powerW: 600, voltage: "72V", maxFlow: 1.5, maxHead: 120, outlet: '0.75"', panels: "3 × 250W" },
    { model: "2PWSS1.7-140-96-750", powerW: 750, voltage: "96V", maxFlow: 1.7, maxHead: 140, outlet: '0.75"', panels: "4 × 250W" },
    // 2PSC Screw Type
    { model: "2PSC1.5-35-24-250", powerW: 250, voltage: "24V", maxFlow: 1.5, maxHead: 35, outlet: '0.75"', panels: "2 × 150W" },
    { model: "2PSC1.5-60-48-400", powerW: 400, voltage: "48V", maxFlow: 1.5, maxHead: 60, outlet: '0.75"', panels: "2 × 250W" },
    { model: "2PSC1.5-85-72-600", powerW: 600, voltage: "72V", maxFlow: 1.5, maxHead: 85, outlet: '0.75"', panels: "3 × 250W" },
  ],
  perfNote: "Screw type H-Q curve is nearly flat at low flow; impeller type follows centrifugal curve",
};

// 2. 3" 4" DC Screw Solar Pump (Page 12)
const series34inchDcScrew: SolarSeriesData = {
  slug: "3-4inch-dc-screw",
  name: '3" 4" DC Screw Solar Pump',
  tagline: "High-Head Deep Well",
  type: "borehole",
  powerType: "dc",
  diameter: '3"-4"',
  impeller: "screw",
  description: "High-head 3-inch and 4-inch screw-type DC solar pumps engineered for the deepest wells. Helical rotor design provides steady flow and excellent sand-handling capability.",
  features: [
    "Helical screw rotor for high head applications",
    "Available in 3\" and 4\" diameters",
    "Sand-resistant design for harsh water conditions",
    "Permanent magnet brushless DC motor",
    "Stainless steel AISI 304 body",
    "Built-in check valve",
    "IP68 rated submersible motor",
    "MPPT controller with wide voltage range",
  ],
  applications: ["Deep Boreholes", "Community Water Supply", "Agricultural Irrigation", "Mountain Water Transfer", "Industrial Water Supply"],
  models: [
    // 3" Screw - Standard
    { model: "3PWSS1.0-55-24-180", powerW: 180, voltage: "24V", maxFlow: 1.0, maxHead: 55, outlet: '1"', panels: "1 × 200W" },
    { model: "3PWSS1.0-80-48-250", powerW: 250, voltage: "48V", maxFlow: 1.0, maxHead: 80, outlet: '1"', panels: "2 × 150W" },
    { model: "3PWSS1.5-65-48-400", powerW: 400, voltage: "48V", maxFlow: 1.5, maxHead: 65, outlet: '1"', panels: "2 × 250W" },
    { model: "3PWSS1.5-100-72-600", powerW: 600, voltage: "72V", maxFlow: 1.5, maxHead: 100, outlet: '1"', panels: "3 × 250W" },
    { model: "3PWSS1.5-130-96-750", powerW: 750, voltage: "96V", maxFlow: 1.5, maxHead: 130, outlet: '1"', panels: "4 × 250W" },
    // 3" Screw - LV (Low Voltage)
    { model: "3PWSS1.5-65-24-400-LV", powerW: 400, voltage: "24V", maxFlow: 1.5, maxHead: 65, outlet: '1"', panels: "2 × 250W" },
    { model: "3PWSS1.5-95-48-400-LV", powerW: 400, voltage: "48V", maxFlow: 1.5, maxHead: 95, outlet: '1"', panels: "2 × 250W" },
    // 4" Screw - Standard
    { model: "4PWSS2.0-40-24-250", powerW: 250, voltage: "24V", maxFlow: 2.0, maxHead: 40, outlet: '1"', panels: "2 × 150W" },
    { model: "4PWSS2.0-70-48-400", powerW: 400, voltage: "48V", maxFlow: 2.0, maxHead: 70, outlet: '1"', panels: "2 × 250W" },
    { model: "4PWSS2.0-110-96-750", powerW: 750, voltage: "96V", maxFlow: 2.0, maxHead: 110, outlet: '1"', panels: "4 × 250W" },
    { model: "4PWSS2.3-60-48-750", powerW: 750, voltage: "48V", maxFlow: 2.3, maxHead: 60, outlet: '1"', panels: "4 × 250W" },
    { model: "4PWSS3.6-70-72-600", powerW: 600, voltage: "72V", maxFlow: 3.6, maxHead: 70, outlet: '1"', panels: "3 × 250W" },
    { model: "4PWSS3.6-110-96-750", powerW: 750, voltage: "96V", maxFlow: 3.6, maxHead: 110, outlet: '1"', panels: "4 × 250W" },
    // 4" Screw - LV
    { model: "4PWSS2.3-60-48-400-LV", powerW: 400, voltage: "48V", maxFlow: 2.3, maxHead: 60, outlet: '1"', panels: "2 × 250W" },
    { model: "4PWSS2.3-85-72-600-LV", powerW: 600, voltage: "72V", maxFlow: 2.3, maxHead: 85, outlet: '1"', panels: "3 × 250W" },
    { model: "4PWSS2.3-110-96-750-LV", powerW: 750, voltage: "96V", maxFlow: 2.3, maxHead: 110, outlet: '1"', panels: "4 × 250W" },
  ],
  perfNote: "Screw pump characteristic: nearly constant flow across wide head range",
};

// 3. 3" DC Plastic Impeller Solar Pump (Pages 13-14) - Representative Selection
const series3inchDcPlastic: SolarSeriesData = {
  slug: "3inch-dc-plastic-impeller",
  name: '3" DC Plastic Impeller Solar Pump',
  tagline: "Economical Deep Well",
  type: "borehole",
  powerType: "dc",
  diameter: '3"',
  impeller: "plastic",
  description: "Cost-effective 3-inch DC solar pump with engineering plastic impellers. Lightweight, corrosion-resistant, ideal for clean water applications in medium-depth wells. (Representative models shown from 28+ available configurations. Contact us for full catalog.)",
  features: [
    "Engineering plastic impellers — lightweight and corrosion-free",
    "3-inch slim profile for narrow boreholes",
    "AISI 304 stainless steel pump housing",
    "Permanent magnet brushless DC motor",
    "Low power consumption with high efficiency",
    "Oil-filled motor for excellent cooling",
    "Easy installation and maintenance",
    "Competitive pricing for volume projects",
  ],
  applications: ["Domestic Water Wells", "Small Farm Irrigation", "Garden Watering", "Livestock Water Supply", "Remote Housing"],
  models: [
    // Practical Series - Standard Voltage
    { model: "3PSC3.0-30-24-300", powerW: 300, voltage: "24V", maxFlow: 3.0, maxHead: 30, outlet: '1¼"', panels: "2 × 200W" },
    { model: "3PSC3.0-40-48-300", powerW: 300, voltage: "48V", maxFlow: 3.0, maxHead: 40, outlet: '1¼"', panels: "2 × 200W" },
    { model: "3PSC3.0-55-48-400", powerW: 400, voltage: "48V", maxFlow: 3.0, maxHead: 55, outlet: '1¼"', panels: "2 × 250W" },
    { model: "3PSC3.5-50-48-400", powerW: 400, voltage: "48V", maxFlow: 3.5, maxHead: 50, outlet: '1¼"', panels: "2 × 250W" },
    { model: "3PSC3.5-70-72-600", powerW: 600, voltage: "72V", maxFlow: 3.5, maxHead: 70, outlet: '1¼"', panels: "3 × 250W" },
    { model: "3PSC3.5-95-96-750", powerW: 750, voltage: "96V", maxFlow: 3.5, maxHead: 95, outlet: '1¼"', panels: "4 × 250W" },
    { model: "3PSC4.0-60-72-600", powerW: 600, voltage: "72V", maxFlow: 4.0, maxHead: 60, outlet: '1¼"', panels: "3 × 250W" },
    { model: "3PSC4.0-85-96-750", powerW: 750, voltage: "96V", maxFlow: 4.0, maxHead: 85, outlet: '1¼"', panels: "4 × 250W" },
    // Higher Performance Models
    { model: "3PSC4.5-100-96-1100", powerW: 1100, voltage: "96V", maxFlow: 4.5, maxHead: 100, outlet: '1½"', panels: "4 × 330W" },
    { model: "3PSC4.5-130-144-1100", powerW: 1100, voltage: "144V", maxFlow: 4.5, maxHead: 130, outlet: '1½"', panels: "6 × 250W" },
    { model: "3PSC5.0-105-96-1100", powerW: 1100, voltage: "96V", maxFlow: 5.0, maxHead: 105, outlet: '1½"', panels: "4 × 330W" },
    { model: "3PSC5.0-140-144-1500", powerW: 1500, voltage: "144V", maxFlow: 5.0, maxHead: 140, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PSC5.5-110-96-1500", powerW: 1500, voltage: "96V", maxFlow: 5.5, maxHead: 110, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PSC5.5-160-144-1500", powerW: 1500, voltage: "144V", maxFlow: 5.5, maxHead: 160, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PSC6.0-110-110-1500", powerW: 1500, voltage: "110V", maxFlow: 6.0, maxHead: 110, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PSC6.0-160-192-1500", powerW: 1500, voltage: "192V", maxFlow: 6.0, maxHead: 160, outlet: '1½"', panels: "8 × 250W" },
  ],
};

// 4. 3" DC Stainless Steel Impeller Solar Pump (Page 15) - Representative Selection
const series3inchDcSs: SolarSeriesData = {
  slug: "3inch-dc-ss-impeller",
  name: '3" DC Stainless Steel Impeller Solar Pump',
  tagline: "Durable Deep Well",
  type: "borehole",
  powerType: "dc",
  diameter: '3"',
  impeller: "ss",
  description: "All stainless steel impeller construction in a 3-inch form factor. Built for durability in demanding conditions — ideal where water contains fine sand or minerals. (Representative models shown from 16+ available configurations.)",
  features: [
    "AISI 304/316 stainless steel impellers and diffusers",
    "3-inch diameter for narrow boreholes",
    "Superior wear resistance for abrasive water",
    "Permanent magnet brushless DC motor (IP68)",
    "Wide voltage MPPT controller compatibility",
    "Oil-lubricated motor bearings",
    "Sand-resistant hydraulic design",
    "Long service life in harsh environments",
  ],
  applications: ["Mineral Water Wells", "Deep Boreholes", "Community Water Systems", "Irrigation", "Industrial Water Supply"],
  models: [
    { model: "3PPSS4.0-30-24-300", powerW: 300, voltage: "24V", maxFlow: 4.0, maxHead: 30, outlet: '1¼"', panels: "2 × 200W" },
    { model: "3PPSS4.0-50-48-400", powerW: 400, voltage: "48V", maxFlow: 4.0, maxHead: 50, outlet: '1¼"', panels: "2 × 250W" },
    { model: "3PPSS4.0-70-48-550", powerW: 550, voltage: "48V", maxFlow: 4.0, maxHead: 70, outlet: '1¼"', panels: "2 × 330W" },
    { model: "3PPSS4.0-100-72-750", powerW: 750, voltage: "72V", maxFlow: 4.0, maxHead: 100, outlet: '1¼"', panels: "3 × 330W" },
    { model: "3PPSS4.5-60-48-550", powerW: 550, voltage: "48V", maxFlow: 4.5, maxHead: 60, outlet: '1½"', panels: "2 × 330W" },
    { model: "3PPSS4.5-85-72-750", powerW: 750, voltage: "72V", maxFlow: 4.5, maxHead: 85, outlet: '1½"', panels: "3 × 330W" },
    { model: "3PPSS4.5-110-96-1100", powerW: 1100, voltage: "96V", maxFlow: 4.5, maxHead: 110, outlet: '1½"', panels: "4 × 330W" },
    { model: "3PPSS4.5-140-144-1100", powerW: 1100, voltage: "144V", maxFlow: 4.5, maxHead: 140, outlet: '1½"', panels: "6 × 250W" },
    { model: "3PPSS5.0-70-72-750", powerW: 750, voltage: "72V", maxFlow: 5.0, maxHead: 70, outlet: '1½"', panels: "3 × 330W" },
    { model: "3PPSS5.0-100-96-1100", powerW: 1100, voltage: "96V", maxFlow: 5.0, maxHead: 100, outlet: '1½"', panels: "4 × 330W" },
    { model: "3PPSS5.0-130-144-1500", powerW: 1500, voltage: "144V", maxFlow: 5.0, maxHead: 130, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PPSS5.5-90-96-1100", powerW: 1100, voltage: "96V", maxFlow: 5.5, maxHead: 90, outlet: '1½"', panels: "4 × 330W" },
    { model: "3PPSS5.5-120-144-1500", powerW: 1500, voltage: "144V", maxFlow: 5.5, maxHead: 120, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PPSS5.5-160-192-2200", powerW: 2200, voltage: "192V", maxFlow: 5.5, maxHead: 160, outlet: '1½"', panels: "8 × 330W" },
    { model: "3PPSS4.5-130-125-1500", powerW: 1500, voltage: "125V", maxFlow: 4.5, maxHead: 130, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PPSS6.0-200-280-2200", powerW: 2200, voltage: "280V", maxFlow: 6.0, maxHead: 200, outlet: '1½"', panels: "8 × 330W" },
  ],
};

// 5. 4" DC Plastic Impeller Solar Pump (Pages 17-19) - Representative Selection
const series4inchDcPlastic: SolarSeriesData = {
  slug: "4inch-dc-plastic-impeller",
  name: '4" DC Plastic Impeller Solar Pump',
  tagline: "High-Flow Deep Well",
  type: "borehole",
  powerType: "dc",
  diameter: '4"',
  impeller: "plastic",
  description: "4-inch DC solar pump with plastic impellers offering higher flow rates for medium-depth wells. Excellent price-performance ratio for standard clean water applications. (Representative models shown from 85+ available configurations. Full catalog available upon request.)",
  features: [
    "4-inch diameter for higher flow capacity",
    "Engineering plastic impellers — cost-effective and corrosion-resistant",
    "Stainless steel AISI 304 pump body",
    "Permanent magnet brushless DC motor",
    "Multi-stage design for balanced head/flow",
    "MPPT controller with automatic start/stop",
    "Water-lubricated bearings (no oil)",
    "Easy field serviceability",
  ],
  applications: ["Domestic Water Supply", "Farm & Ranch Water", "Irrigation Systems", "Water Storage Tanks", "Resort & Hotel Water"],
  models: [
    // Standard Models (Pages 17-19 representative selection)
    { model: "4PSC3.0-30-24-300", powerW: 300, voltage: "24V", maxFlow: 3.0, maxHead: 30, outlet: '1¼"', panels: "2 × 200W" },
    { model: "4PSC3.0-40-48-300", powerW: 300, voltage: "48V", maxFlow: 3.0, maxHead: 40, outlet: '1¼"', panels: "2 × 200W" },
    { model: "4PSC3.0-55-48-400", powerW: 400, voltage: "48V", maxFlow: 3.0, maxHead: 55, outlet: '1¼"', panels: "2 × 250W" },
    { model: "4PSC3.5-50-48-400", powerW: 400, voltage: "48V", maxFlow: 3.5, maxHead: 50, outlet: '1¼"', panels: "2 × 250W" },
    { model: "4PSC3.5-70-72-600", powerW: 600, voltage: "72V", maxFlow: 3.5, maxHead: 70, outlet: '1¼"', panels: "3 × 250W" },
    { model: "4PSC3.5-95-96-750", powerW: 750, voltage: "96V", maxFlow: 3.5, maxHead: 95, outlet: '1¼"', panels: "4 × 250W" },
    { model: "4PSC4.5-60-72-600", powerW: 600, voltage: "72V", maxFlow: 4.5, maxHead: 60, outlet: '1½"', panels: "3 × 250W" },
    { model: "4PSC4.5-85-96-750", powerW: 750, voltage: "96V", maxFlow: 4.5, maxHead: 85, outlet: '1½"', panels: "4 × 250W" },
    { model: "4PSC4.5-105-96-1100", powerW: 1100, voltage: "96V", maxFlow: 4.5, maxHead: 105, outlet: '1½"', panels: "4 × 330W" },
    { model: "4PSC4.5-140-144-1100", powerW: 1100, voltage: "144V", maxFlow: 4.5, maxHead: 140, outlet: '1½"', panels: "6 × 250W" },
    { model: "4PSC5.0-80-96-1100", powerW: 1100, voltage: "96V", maxFlow: 5.0, maxHead: 80, outlet: '1½"', panels: "4 × 330W" },
    { model: "4PSC5.0-120-144-1100", powerW: 1100, voltage: "144V", maxFlow: 5.0, maxHead: 120, outlet: '1½"', panels: "6 × 250W" },
    { model: "4PSC5.5-100-96-1500", powerW: 1500, voltage: "96V", maxFlow: 5.5, maxHead: 100, outlet: '1½"', panels: "6 × 330W" },
    { model: "4PSC5.5-150-144-1500", powerW: 1500, voltage: "144V", maxFlow: 5.5, maxHead: 150, outlet: '1½"', panels: "6 × 330W" },
    { model: "4PSC6.0-90-96-1500", powerW: 1500, voltage: "96V", maxFlow: 6.0, maxHead: 90, outlet: '2"', panels: "6 × 330W" },
    { model: "4PSC6.0-140-144-2200", powerW: 2200, voltage: "144V", maxFlow: 6.0, maxHead: 140, outlet: '2"', panels: "8 × 330W" },
    { model: "4PSC6.5-120-144-2200", powerW: 2200, voltage: "144V", maxFlow: 6.5, maxHead: 120, outlet: '2"', panels: "8 × 330W" },
    { model: "4PSC6.5-160-192-2200", powerW: 2200, voltage: "192V", maxFlow: 6.5, maxHead: 160, outlet: '2"', panels: "8 × 330W" },
    { model: "4PSC7.0-110-144-2200", powerW: 2200, voltage: "144V", maxFlow: 7.0, maxHead: 110, outlet: '2"', panels: "8 × 330W" },
    { model: "4PSC7.0-160-220-2200", powerW: 2200, voltage: "220V", maxFlow: 7.0, maxHead: 160, outlet: '2"', panels: "8 × 330W" },
  ],
};

// 6. 4"-6" DC Stainless Steel Impeller Solar Pump (Pages 21-23)
const series46inchDcSs: SolarSeriesData = {
  slug: "4-6inch-dc-ss-impeller",
  name: '4"-6" DC Stainless Steel Impeller Solar Pump',
  tagline: "Heavy-Duty Borehole",
  type: "borehole",
  powerType: "dc",
  diameter: '4"-6"',
  impeller: "ss",
  description: "The flagship DC borehole pump series — 4 to 6 inch stainless steel construction for the most demanding deep well applications. (Representative models from 93+ available configurations.)",
  features: [
    "Full AISI 304/316 stainless steel construction",
    "4\" to 6\" diameter options for high flow",
    "Up to 300m+ maximum head capability",
    "Heavy-duty permanent magnet brushless DC motor",
    "Advanced MPPT controller with LCD display option",
    "Sand-resistant floating impeller design",
    "IP68 submersible rating",
    "Industrial-grade bearings and seals",
  ],
  applications: ["Municipal Water Supply", "Large-Scale Irrigation", "Mining Water Management", "Industrial Processes", "Deep Borehole Projects"],
  models: [
    { model: "4PPSS4.0-50-48-400", powerW: 400, voltage: "48V", maxFlow: 4.0, maxHead: 50, outlet: '1½"', panels: "2 × 250W" },
    { model: "4PPSS4.0-75-72-600", powerW: 600, voltage: "72V", maxFlow: 4.0, maxHead: 75, outlet: '1½"', panels: "3 × 250W" },
    { model: "4PPSS4.0-100-96-750", powerW: 750, voltage: "96V", maxFlow: 4.0, maxHead: 100, outlet: '1½"', panels: "4 × 250W" },
    { model: "4PPSS4.5-60-48-550", powerW: 550, voltage: "48V", maxFlow: 4.5, maxHead: 60, outlet: '1½"', panels: "2 × 330W" },
    { model: "4PPSS4.5-90-72-750", powerW: 750, voltage: "72V", maxFlow: 4.5, maxHead: 90, outlet: '1½"', panels: "3 × 330W" },
    { model: "4PPSS4.5-120-96-1100", powerW: 1100, voltage: "96V", maxFlow: 4.5, maxHead: 120, outlet: '1½"', panels: "4 × 330W" },
    { model: "4PPSS5.0-80-96-1100", powerW: 1100, voltage: "96V", maxFlow: 5.0, maxHead: 80, outlet: '1½"', panels: "4 × 330W" },
    { model: "4PPSS5.0-115-144-1500", powerW: 1500, voltage: "144V", maxFlow: 5.0, maxHead: 115, outlet: '1½"', panels: "6 × 330W" },
    { model: "4PPSS5.5-95-96-1500", powerW: 1500, voltage: "96V", maxFlow: 5.5, maxHead: 95, outlet: '2"', panels: "6 × 330W" },
    { model: "4PPSS5.5-150-144-2200", powerW: 2200, voltage: "144V", maxFlow: 5.5, maxHead: 150, outlet: '2"', panels: "8 × 330W" },
    { model: "6PPSS6.0-100-96-1500", powerW: 1500, voltage: "96V", maxFlow: 6.0, maxHead: 100, outlet: '2"', panels: "6 × 330W" },
    { model: "6PPSS6.0-150-144-2200", powerW: 2200, voltage: "144V", maxFlow: 6.0, maxHead: 150, outlet: '2"', panels: "8 × 330W" },
    { model: "6PPSS8.0-120-110-3000", powerW: 3000, voltage: "110V", maxFlow: 8.0, maxHead: 120, outlet: '2½"', panels: "10 × 330W" },
    { model: "6PPSS8.0-180-220-4000", powerW: 4000, voltage: "220V", maxFlow: 8.0, maxHead: 180, outlet: '2½"', panels: "14 × 330W" },
    { model: "6PPSS10-150-110-4000", powerW: 4000, voltage: "110V", maxFlow: 10.0, maxHead: 150, outlet: '2½"', panels: "14 × 330W" },
    { model: "6PPSS10-220-220-5500", powerW: 5500, voltage: "220V", maxFlow: 10.0, maxHead: 220, outlet: '2½"', panels: "18 × 380W" },
    { model: "6PPSS12-180-220-5500", powerW: 5500, voltage: "220V", maxFlow: 12.0, maxHead: 180, outlet: '3"', panels: "18 × 380W" },
    { model: "6PPSS12-250-220-7500", powerW: 7500, voltage: "220V", maxFlow: 12.0, maxHead: 250, outlet: '3"', panels: "24 × 380W" },
    { model: "6PPSS15-200-220-7500", powerW: 7500, voltage: "220V", maxFlow: 15.0, maxHead: 200, outlet: '3"', panels: "24 × 380W" },
    { model: "6PPSS15-300-380-11000", powerW: 11000, voltage: "380V", maxFlow: 15.0, maxHead: 300, outlet: '3"', panels: "30 × 380W" },
  ],
};

// 7. PSQB DC Solar Surface Pump (Page 24)
const seriesPsqbDc: SolarSeriesData = {
  slug: "psqb-dc-surface",
  name: "PSQB DC Solar Surface Pump",
  tagline: "Compact Surface Solution",
  type: "surface",
  powerType: "dc",
  description: "Lightweight and compact DC surface pump for shallow water sources, tank transfer and garden irrigation.",
  features: ["Compact and lightweight design", "Cast iron pump body with brass impeller", "Permanent magnet brushless DC motor", "Low noise operation", "Built-in thermal protection", "Simple installation", "Suitable for clean water only", "Cost-effective entry-level solution"],
  applications: ["Garden Watering", "Tank Filling", "Shallow Well (<8m)", "Rainwater Harvesting", "Greenhouse Irrigation"],
  models: [
    { model: "PSQB-250/24", powerW: 250, voltage: "24V", maxFlow: 1.2, maxHead: 28, outlet: '1"', panels: "2 × 150W" },
    { model: "PSQB-400/48", powerW: 400, voltage: "48V", maxFlow: 1.5, maxHead: 42, outlet: '1"', panels: "2 × 250W" },
    { model: "PSQB-600/72", powerW: 600, voltage: "72V", maxFlow: 2.0, maxHead: 50, outlet: '1¼"', panels: "3 × 250W" },
    { model: "PSQB-750/48", powerW: 750, voltage: "48V", maxFlow: 2.0, maxHead: 55, outlet: '1¼"', panels: "4 × 250W" },
    { model: "PSQB-1100/72", powerW: 1100, voltage: "72V", maxFlow: 2.4, maxHead: 62, outlet: '1¼"', panels: "4 × 330W" },
    { model: "PSQB-1500/96", powerW: 1500, voltage: "96V", maxFlow: 2.8, maxHead: 70, outlet: '1½"', panels: "6 × 330W" },
  ],
};

// 8. PSGJ DC Solar Surface Pump (Page 25)
const seriesPsgjDc: SolarSeriesData = {
  slug: "psgj-dc-surface",
  name: "PSGJ DC Solar Surface Pump",
  tagline: "Medium-Duty Surface",
  type: "surface",
  powerType: "dc",
  description: "Robust medium-duty DC surface pump with higher flow capacity for irrigation and water supply systems.",
  features: ["Heavy-duty cast iron construction", "Stainless steel impeller for durability", "High-efficiency brushless DC motor", "Wide voltage MPPT compatibility", "Thermal and overload protection", "Large water passage for debris tolerance", "Suitable for continuous operation"],
  applications: ["Farm Irrigation", "Water Transfer", "Orchard Watering", "Industry Water Supply", "Fish Pond Circulation"],
  models: [
    { model: "PSGJ-400/48", powerW: 400, voltage: "48V", maxFlow: 3.5, maxHead: 28, outlet: '1¼"', panels: "2 × 250W" },
    { model: "PSGJ-600/72", powerW: 600, voltage: "72V", maxFlow: 4.5, maxHead: 35, outlet: '1½"', panels: "3 × 250W" },
    { model: "PSGJ-750/48", powerW: 750, voltage: "48V", maxFlow: 5.0, maxHead: 40, outlet: '1½"', panels: "4 × 250W" },
    { model: "PSGJ-1100/72", powerW: 1100, voltage: "72V", maxFlow: 6.5, maxHead: 45, outlet: '2"', panels: "4 × 330W" },
    { model: "PSGJ-1500/96", powerW: 1500, voltage: "96V", maxFlow: 8.0, maxHead: 52, outlet: '2"', panels: "6 × 330W" },
  ],
};

// 9. PHF DC Solar Surface Pump (Page 26)
const seriesPhfDc: SolarSeriesData = {
  slug: "phf-dc-surface",
  name: "PHF DC Solar Surface Pump",
  tagline: "High-Flow Surface",
  type: "surface",
  powerType: "dc",
  description: "High-capacity DC surface pump for large-volume water transfer, agricultural irrigation and flood control. (10+ models available.)",
  features: ["High flow capacity up to 18 m³/h", "Durable cast iron volute with SS impeller", "High-efficiency PM BLDC motor", "Large inlet/outlet for reduced friction", "Overload and thermal protection", "Weather-resistant powder coating", "Low maintenance design"],
  applications: ["Large-Scale Irrigation", "Flood Drainage", "Aquaculture", "Bulk Water Transfer", "Construction Dewatering"],
  models: [
    { model: "PHF-400/48", powerW: 400, voltage: "48V", maxFlow: 8, maxHead: 18, outlet: '2"', panels: "2 × 250W" },
    { model: "PHF-600/72", powerW: 600, voltage: "72V", maxFlow: 10, maxHead: 22, outlet: '2"', panels: "3 × 250W" },
    { model: "PHF-750/48", powerW: 750, voltage: "48V", maxFlow: 10, maxHead: 25, outlet: '2"', panels: "4 × 250W" },
    { model: "PHF-1100/72", powerW: 1100, voltage: "72V", maxFlow: 12, maxHead: 30, outlet: '2"', panels: "4 × 330W" },
    { model: "PHF-1500/96", powerW: 1500, voltage: "96V", maxFlow: 15, maxHead: 35, outlet: '2½"', panels: "6 × 330W" },
    { model: "PHF-2200/110", powerW: 2200, voltage: "110V", maxFlow: 18, maxHead: 42, outlet: '2½"', panels: "8 × 330W" },
  ],
};

// 10. PZSU DC Solar Surface Pump (Page 27)
const seriesPzsuDc: SolarSeriesData = {
  slug: "pzsu-dc-surface",
  name: "PZSU DC Solar Surface Pump",
  tagline: "Self-Priming Surface",
  type: "surface",
  powerType: "dc",
  description: "Self-priming DC surface pump with jet pump design. Reliable water extraction from shallow wells and tanks. (16+ models available.)",
  features: ["Self-priming jet pump — up to 8m suction lift", "Cast iron body with brass jet nozzle", "Built-in pressure tank compatibility", "Automatic pressure switch option", "Suitable for wells up to 25m depth", "Quiet operation with vibration-dampening", "Easy priming and maintenance"],
  applications: ["Shallow Wells", "Underground Tanks", "Pressure Boosting", "Home Water Systems", "Garden Irrigation"],
  models: [
    { model: "PZSU-400/48", powerW: 400, voltage: "48V", maxFlow: 3.0, maxHead: 35, outlet: '1"', panels: "2 × 250W" },
    { model: "PZSU-600/72", powerW: 600, voltage: "72V", maxFlow: 4.0, maxHead: 42, outlet: '1"', panels: "3 × 250W" },
    { model: "PZSU-750/48", powerW: 750, voltage: "48V", maxFlow: 4.0, maxHead: 50, outlet: '1"', panels: "4 × 250W" },
    { model: "PZSU-1100/72", powerW: 1100, voltage: "72V", maxFlow: 5.0, maxHead: 55, outlet: '1¼"', panels: "4 × 330W" },
    { model: "PZSU-1500/96", powerW: 1500, voltage: "96V", maxFlow: 6.0, maxHead: 65, outlet: '1¼"', panels: "6 × 330W" },
    { model: "PZSU-2200/110", powerW: 2200, voltage: "110V", maxFlow: 7.0, maxHead: 72, outlet: '1¼"', panels: "8 × 330W" },
  ],
};

// 11. PSP DC Swimming Pool Solar Pump (Page 28)
const seriesPspDc: SolarSeriesData = {
  slug: "psp-dc-pool",
  name: "PSP DC Swimming Pool Solar Pump",
  tagline: "Pool Circulation",
  type: "pool",
  powerType: "dc",
  description: "Dedicated DC solar pool pump for swimming pool circulation and filtration with large debris-handling capability. (13+ models available.)",
  features: ["Large pre-filter basket", "Corrosion-resistant body and impeller", "Transparent lid for easy inspection", "Ultra-quiet <55 dB", "Continuous duty rated", "Compatible with sand/cartridge filters", "IP55 motor protection"],
  applications: ["Swimming Pools", "Spas & Hot Tubs", "Water Features", "Fountains", "Aquaculture Ponds"],
  models: [
    { model: "PSP-250/24", powerW: 250, voltage: "24V", maxFlow: 6, maxHead: 8, outlet: '1½"', panels: "2 × 150W" },
    { model: "PSP-400/48", powerW: 400, voltage: "48V", maxFlow: 9, maxHead: 12, outlet: '1½"', panels: "2 × 250W" },
    { model: "PSP-600/72", powerW: 600, voltage: "72V", maxFlow: 11, maxHead: 14, outlet: '2"', panels: "3 × 250W" },
    { model: "PSP-750/48", powerW: 750, voltage: "48V", maxFlow: 12, maxHead: 16, outlet: '2"', panels: "4 × 250W" },
    { model: "PSP-1100/72", powerW: 1100, voltage: "72V", maxFlow: 16, maxHead: 18, outlet: '2"', panels: "4 × 330W" },
    { model: "PSP-1500/96", powerW: 1500, voltage: "96V", maxFlow: 20, maxHead: 22, outlet: '2½"', panels: "6 × 330W" },
  ],
};

// 12. PEQDX DC Solar Submersible Pump (Pages 29-30)
const seriesPeqdxDc: SolarSeriesData = {
  slug: "peqdx-dc-submersible",
  name: "PEQDX DC Solar Submersible Pump",
  tagline: "Portable Submersible",
  type: "submersible",
  powerType: "dc",
  description: "Compact portable DC submersible pump for camping, emergency and temporary installations. (32+ models available.)",
  features: ["Ultra-compact and portable", "Runs on 12V battery or solar panel", "Stainless steel body with plastic impeller", "IP68 fully submersible", "Low voltage safe operation", "Float switch option", "Ideal for 12V/24V solar systems"],
  applications: ["Camping & RV Water", "Emergency Supply", "Boat Bilge Pumping", "Small Pond Drainage", "Temporary Installations"],
  models: [
    { model: "PEQDX-180/12", powerW: 180, voltage: "12V", maxFlow: 2.0, maxHead: 15, outlet: '0.75"', panels: "1 × 200W" },
    { model: "PEQDX-250/24", powerW: 250, voltage: "24V", maxFlow: 3.0, maxHead: 25, outlet: '1"', panels: "2 × 150W" },
    { model: "PEQDX-400/48", powerW: 400, voltage: "48V", maxFlow: 4.0, maxHead: 35, outlet: '1"', panels: "2 × 250W" },
    { model: "PEQDX-600/72", powerW: 600, voltage: "72V", maxFlow: 5.0, maxHead: 40, outlet: '1¼"', panels: "3 × 250W" },
    { model: "PEQDX-750/48", powerW: 750, voltage: "48V", maxFlow: 6.0, maxHead: 42, outlet: '1¼"', panels: "4 × 250W" },
    { model: "PEQDX-1100/72", powerW: 1100, voltage: "72V", maxFlow: 7.0, maxHead: 48, outlet: '1¼"', panels: "4 × 330W" },
  ],
};

// 13. PSG DC Solar Submersible Pump (Page 31)
const seriesPsgDc: SolarSeriesData = {
  slug: "psg-dc-submersible",
  name: "PSG DC Solar Submersible Pump",
  tagline: "Heavy Submersible",
  type: "submersible",
  powerType: "dc",
  description: "Heavy-duty DC submersible pump for rivers, lakes and large water bodies. Robust continuous duty construction. (11+ models available.)",
  features: ["Heavy-duty cast iron/SS construction", "High-volume axial/mixed flow", "Continuous duty rated motor", "Wide water passage", "Double mechanical seal", "Oil-filled motor chamber", "24/7 operation capable"],
  applications: ["River Water Extraction", "Lake Water Supply", "Flood Control", "Aquaculture", "Industrial Water Transfer"],
  models: [
    { model: "PSG-400/48", powerW: 400, voltage: "48V", maxFlow: 5, maxHead: 10, outlet: '2"', panels: "2 × 250W" },
    { model: "PSG-600/72", powerW: 600, voltage: "72V", maxFlow: 7, maxHead: 13, outlet: '2"', panels: "3 × 250W" },
    { model: "PSG-750/48", powerW: 750, voltage: "48V", maxFlow: 8, maxHead: 15, outlet: '2"', panels: "4 × 250W" },
    { model: "PSG-1100/72", powerW: 1100, voltage: "72V", maxFlow: 10, maxHead: 18, outlet: '2½"', panels: "4 × 330W" },
    { model: "PSG-1500/96", powerW: 1500, voltage: "96V", maxFlow: 13, maxHead: 22, outlet: '2½"', panels: "6 × 330W" },
    { model: "PSG-2200/110", powerW: 2200, voltage: "110V", maxFlow: 16, maxHead: 26, outlet: '3"', panels: "8 × 330W" },
  ],
};

/* ═══════════════════════════════════════════════════════════════════
   AC/DC SOLAR PUMP — 8 Series
   ═══════════════════════════════════════════════════════════════════ */

// 14. 3" AC/DC Plastic Impeller Solar Pump (Page 36)
const series3inchAcdcPlastic: SolarSeriesData = {
  slug: "3inch-acdc-plastic-impeller",
  name: '3" AC/DC Plastic Impeller Solar Pump',
  tagline: "Universal Deep Well",
  type: "borehole",
  powerType: "acdc",
  diameter: '3"',
  impeller: "plastic",
  description: "Dual power 3-inch deep well pump — solar DC daytime, grid AC night. Plastic impellers for clean water 24/7 reliability. (20 models — 10 Standard + 10 HLV.)",
  features: ["Dual DC solar + AC grid power", "Automatic DC/AC switching", "3-inch slim profile", "Plastic impellers — corrosion-free", "MPPT solar + AC drive controller", "AISI 304 stainless steel body", "No batteries needed for DC", "Continuous 24/7 water supply"],
  applications: ["Domestic Water Wells (24/7)", "Small Communities", "Farm Water Supply", "Hotel & Resort", "Remote Housing"],
  models: [
    // Standard Voltage (-H)
    { model: "3PSC3.5-70-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 3.5, maxHead: 70, outlet: '1¼"', panels: "3 × 250W" },
    { model: "3PSC3.5-90-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 3.5, maxHead: 90, outlet: '1¼"', panels: "4 × 250W" },
    { model: "3PSC3.5-120-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 3.5, maxHead: 120, outlet: '1¼"', panels: "4 × 330W" },
    { model: "3PSC3.5-150-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 3.5, maxHead: 150, outlet: '1¼"', panels: "6 × 330W" },
    { model: "3PSC3.5-230-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 3.5, maxHead: 230, outlet: '1¼"', panels: "8 × 330W" },
    { model: "3PSC6.0-40-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 6.0, maxHead: 40, outlet: '1½"', panels: "3 × 250W" },
    { model: "3PSC6.5-55-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 6.5, maxHead: 55, outlet: '1½"', panels: "4 × 250W" },
    { model: "3PSC6.5-80-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 6.5, maxHead: 80, outlet: '1½"', panels: "4 × 330W" },
    { model: "3PSC6.5-120-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 6.5, maxHead: 120, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PSC6.5-160-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 6.5, maxHead: 160, outlet: '1½"', panels: "8 × 330W" },
    // HLV (Hybrid Low Voltage)
    { model: "3PSC3.5-70-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 3.5, maxHead: 70, outlet: '1¼"', panels: "3 × 250W", stages: 6 },
    { model: "3PSC3.5-90-96-750-HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 3.5, maxHead: 90, outlet: '1¼"', panels: "4 × 250W", stages: 8 },
    { model: "3PSC3.5-120-115-1100-HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 3.5, maxHead: 120, outlet: '1¼"', panels: "4 × 330W", stages: 10 },
    { model: "3PSC3.5-150-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 3.5, maxHead: 150, outlet: '1¼"', panels: "6 × 330W", stages: 12 },
    { model: "3PSC3.5-230-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 3.5, maxHead: 230, outlet: '1¼"', panels: "8 × 330W", stages: 18 },
    { model: "3PSC6.0-40-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 6.0, maxHead: 40, outlet: '1½"', panels: "3 × 250W", stages: 4 },
    { model: "3PSC6.5-55-96-750-HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 6.5, maxHead: 55, outlet: '1½"', panels: "4 × 250W", stages: 5 },
    { model: "3PSC6.5-80-115-1100-HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 6.5, maxHead: 80, outlet: '1½"', panels: "4 × 330W", stages: 7 },
    { model: "3PSC6.5-120-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 6.5, maxHead: 120, outlet: '1½"', panels: "6 × 330W", stages: 9 },
    { model: "3PSC6.5-160-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 6.5, maxHead: 160, outlet: '1½"', panels: "8 × 330W", stages: 12 },
  ],
};

// 15. 3" AC/DC Stainless Steel Impeller Solar Pump (Page 37)
const series3inchAcdcSs: SolarSeriesData = {
  slug: "3inch-acdc-ss-impeller",
  name: '3" AC/DC Stainless Steel Impeller Solar Pump',
  tagline: "Premium Universal Deep Well",
  type: "borehole",
  powerType: "acdc",
  diameter: '3"',
  impeller: "ss",
  description: "Premium dual-power 3-inch pump with all SS impellers. Maximum durability with solar/AC flexibility. (10 models — 5 Standard + 5 HLV.)",
  features: ["All SS AISI 304/316 impellers", "Dual DC solar + AC grid power", "Automatic power source switching", "MPPT solar + AC VFD controller", "3-inch compact diameter", "Sand-resistant hydraulic design", "IP68 motor with oil cooling", "LCD display controller"],
  applications: ["Premium Domestic Wells", "Community Water Systems", "Mountain Resorts", "Eco-Lodges", "Critical Water Supply"],
  models: [
    // Standard Voltage (-H)
    { model: "3PPSS4.5-75-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 4.5, maxHead: 75, outlet: '1¼"', panels: "3 × 250W" },
    { model: "3PPSS4.5-90-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 4.5, maxHead: 90, outlet: '1¼"', panels: "4 × 250W" },
    { model: "3PPSS4.5-110-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 4.5, maxHead: 110, outlet: '1½"', panels: "4 × 330W" },
    { model: "3PPSS4.5-130-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 4.5, maxHead: 130, outlet: '1½"', panels: "6 × 330W" },
    { model: "3PPSS4.5-200-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 4.5, maxHead: 200, outlet: '1½"', panels: "8 × 330W" },
    // HLV (Hybrid Low Voltage)
    { model: "3PPSS4.5-75-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 4.5, maxHead: 75, outlet: '1¼"', panels: "3 × 250W", stages: 8 },
    { model: "3PPSS4.5-90-96-750-HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 4.5, maxHead: 90, outlet: '1¼"', panels: "4 × 250W", stages: 10 },
    { model: "3PPSS4.5-110-115-1100-HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 4.5, maxHead: 110, outlet: '1½"', panels: "4 × 330W", stages: 12 },
    { model: "3PPSS4.5-130-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 4.5, maxHead: 130, outlet: '1½"', panels: "6 × 330W", stages: 14 },
    { model: "3PPSS4.5-200-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 4.5, maxHead: 200, outlet: '1½"', panels: "8 × 330W", stages: 20 },
  ],
};

// 16. 4" AC/DC Plastic Impeller Solar Pump (Pages 38-40)
const series4inchAcdcPlastic: SolarSeriesData = {
  slug: "4inch-acdc-plastic-impeller",
  name: '4" AC/DC Plastic Impeller Solar Pump',
  tagline: "High-Flow Universal Deep Well",
  type: "borehole",
  powerType: "acdc",
  diameter: '4"',
  impeller: "plastic",
  description: "4-inch dual power pump for higher flow rates. Reliable 24/7 water with solar+grid options. (63 models — 29 Standard + 29 HLV + 5 380HLV.)",
  features: ["4-inch diameter — higher flow", "DC solar + AC grid dual power", "Automatic seamless switching", "Plastic impellers — corrosion-resistant", "Integrated MPPT + AC drive", "Multi-stage balanced design", "Water-lubricated bearings", "Cost-effective 24/7 solution"],
  applications: ["Domestic Water 24/7", "Farm Water Systems", "Irrigation", "Rural Communities", "Eco-Resorts"],
  models: [
    // Standard Voltage (-H)
    { model: "4PSC3.0-40-72-400-H", powerW: 400, voltage: "DC72/AC220", maxFlow: 3.0, maxHead: 40, outlet: '1¼"', panels: "2 × 250W" },
    { model: "4PSC3.5-70-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 3.5, maxHead: 70, outlet: '1¼"', panels: "3 × 250W" },
    { model: "4PSC3.5-90-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 3.5, maxHead: 90, outlet: '1¼"', panels: "4 × 250W" },
    { model: "4PSC3.5-120-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 3.5, maxHead: 120, outlet: '1¼"', panels: "4 × 330W" },
    { model: "4PSC3.5-150-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 3.5, maxHead: 150, outlet: '1¼"', panels: "6 × 330W" },
    { model: "4PSC3.5-230-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 3.5, maxHead: 230, outlet: '1¼"', panels: "8 × 330W" },
    { model: "4PSC4.5-50-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 4.5, maxHead: 50, outlet: '1½"', panels: "3 × 250W" },
    { model: "4PSC5.5-70-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 5.5, maxHead: 70, outlet: '1½"', panels: "4 × 250W" },
    { model: "4PSC5.5-100-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 5.5, maxHead: 100, outlet: '1½"', panels: "4 × 330W" },
    { model: "4PSC5.5-130-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 5.5, maxHead: 130, outlet: '1½"', panels: "6 × 330W" },
    { model: "4PSC5.5-250-200-2200-H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 5.5, maxHead: 250, outlet: '1½"', panels: "8 × 330W" },
    { model: "4PSC6.0-40-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 6.0, maxHead: 40, outlet: '2"', panels: "3 × 250W" },
    { model: "4PSC8.0-50-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 8.0, maxHead: 50, outlet: '2"', panels: "4 × 250W" },
    { model: "4PSC8.0-80-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 8.0, maxHead: 80, outlet: '2"', panels: "4 × 330W" },
    { model: "4PSC8.0-100-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 8.0, maxHead: 100, outlet: '2"', panels: "6 × 330W" },
    { model: "4PSC9.0-140-200-2200-H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 9.0, maxHead: 140, outlet: '2"', panels: "8 × 330W" },
    { model: "4PSC9.5-180-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 9.5, maxHead: 180, outlet: '2"', panels: "10 × 330W" },
    { model: "4PSC15.0-30-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 15.0, maxHead: 30, outlet: '2½"', panels: "4 × 250W" },
    { model: "4PSC15.0-45-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 15.0, maxHead: 45, outlet: '2½"', panels: "4 × 330W" },
    { model: "4PSC16.0-70-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 16.0, maxHead: 70, outlet: '2½"', panels: "6 × 330W" },
    { model: "4PSC17.0-100-200-2200-H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 17.0, maxHead: 100, outlet: '2½"', panels: "8 × 330W" },
    { model: "4PSC17.0-130-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 17.0, maxHead: 130, outlet: '2½"', panels: "10 × 330W" },
    { model: "4PSC21.0-35-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 21.0, maxHead: 35, outlet: '3"', panels: "6 × 330W" },
    { model: "4PSC23.0-55-200-2200-H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 23.0, maxHead: 55, outlet: '3"', panels: "8 × 330W" },
    { model: "4PSC23.0-65-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 23.0, maxHead: 65, outlet: '3"', panels: "10 × 330W" },
    { model: "4PSC28.0-55-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 28.0, maxHead: 55, outlet: '3"', panels: "10 × 330W" },
    { model: "4PSC36.0-30-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 36.0, maxHead: 30, outlet: '4"', panels: "6 × 330W" },
    { model: "4PSC36.0-45-200-2200-H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 36.0, maxHead: 45, outlet: '4"', panels: "8 × 330W" },
    { model: "4PSC36.0-55-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 36.0, maxHead: 55, outlet: '4"', panels: "10 × 330W" },
    // HLV (Hybrid Low Voltage) — representative models
    { model: "4PSC3.0-40-72-400-HLV", powerW: 400, voltage: "DC72/AC220", maxFlow: 3.0, maxHead: 40, outlet: '1¼"', panels: "2 × 250W", stages: 4 },
    { model: "4PSC3.5-70-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 3.5, maxHead: 70, outlet: '1¼"', panels: "3 × 250W", stages: 6 },
    { model: "4PSC5.5-70-96-750-HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 5.5, maxHead: 70, outlet: '1½"', panels: "4 × 250W", stages: 7 },
    { model: "4PSC8.0-50-96-750-HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 8.0, maxHead: 50, outlet: '2"', panels: "4 × 250W", stages: 5 },
    { model: "4PSC17.0-100-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 17.0, maxHead: 100, outlet: '2½"', panels: "8 × 330W", stages: 10 },
    { model: "4PSC28.0-55-305-3000-HLV", powerW: 3000, voltage: "DC305/AC220", maxFlow: 28.0, maxHead: 55, outlet: '3"', panels: "10 × 330W", stages: 6 },
    { model: "4PSC28.0-90-400-4000-380HLV", powerW: 4000, voltage: "DC400/AC380", maxFlow: 28.0, maxHead: 90, outlet: '3"', panels: "14 × 330W", stages: 8 },
    { model: "4PSC36.0-45-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 36.0, maxHead: 45, outlet: '4"', panels: "8 × 330W", stages: 5 },
  ],
};

// 17. 4"-6" AC/DC Stainless Steel Impeller Solar Pump (Pages 41-43)
const series46inchAcdcSs: SolarSeriesData = {
  slug: "4-6inch-acdc-ss-impeller",
  name: '4"-6" AC/DC Stainless Steel Impeller Solar Pump',
  tagline: "Flagship Universal Borehole",
  type: "borehole",
  powerType: "acdc",
  diameter: '4"-6"',
  impeller: "ss",
  description: "The ultimate dual-power borehole pump — full SS 4-6 inch construction with solar+AC flexibility. (71 models — 26 Standard-H + 35 HLV + 10 380HLV.)",
  features: ["Full AISI 304/316 SS construction", "DC solar + AC grid dual power", "Up to 300m head capability", "High-efficiency PM motor", "Advanced MPPT + VFD controller", "LCD real-time monitoring", "Remote monitoring option", "Industrial-grade 24/7 operation"],
  applications: ["Municipal Water Supply", "Large-Scale Agriculture", "Mining Operations", "Industrial Processing", "Critical Infrastructure"],
  models: [
    // === 4PPSS Standard (-H) ===
    { model: "4PPSS3.0-80-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 3.0, maxHead: 80, outlet: '1¼"', panels: "3 × 250W" },
    { model: "4PPSS5.5-50-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 5.5, maxHead: 50, outlet: '1½"', panels: "3 × 250W" },
    { model: "4PPSS5.5-70-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 5.5, maxHead: 70, outlet: '1½"', panels: "4 × 250W" },
    { model: "4PPSS5.5-100-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 5.5, maxHead: 100, outlet: '1½"', panels: "4 × 330W" },
    { model: "4PPSS5.5-130-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 5.5, maxHead: 130, outlet: '1½"', panels: "6 × 330W" },
    { model: "4PPSS5.5-190-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 5.5, maxHead: 190, outlet: '1½"', panels: "8 × 330W" },
    { model: "4PPSS5.5-260-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 5.5, maxHead: 260, outlet: '1½"', panels: "10 × 330W" },
    { model: "4PPSS7.0-40-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 7.0, maxHead: 40, outlet: '2"', panels: "3 × 250W" },
    { model: "4PPSS8.0-50-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 8.0, maxHead: 50, outlet: '2"', panels: "4 × 250W" },
    { model: "4PPSS8.0-80-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 8.0, maxHead: 80, outlet: '2"', panels: "4 × 330W" },
    { model: "4PPSS9.0-100-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 9.0, maxHead: 100, outlet: '2"', panels: "6 × 330W" },
    { model: "4PPSS9.0-140-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 9.0, maxHead: 140, outlet: '2"', panels: "8 × 330W" },
    { model: "4PPSS9.5-180-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 9.5, maxHead: 180, outlet: '2"', panels: "10 × 330W" },
    { model: "4PPSS15.0-30-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 15.0, maxHead: 30, outlet: '2½"', panels: "4 × 250W" },
    { model: "4PPSS15.0-45-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 15.0, maxHead: 45, outlet: '2½"', panels: "4 × 330W" },
    { model: "4PPSS16.0-70-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 16.0, maxHead: 70, outlet: '2½"', panels: "6 × 330W" },
    { model: "4PPSS17.0-100-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 17.0, maxHead: 100, outlet: '2½"', panels: "8 × 330W" },
    { model: "4PPSS17.0-130-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 17.0, maxHead: 130, outlet: '2½"', panels: "10 × 330W" },
    { model: "4PPSS21.0-35-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 21.0, maxHead: 35, outlet: '3"', panels: "6 × 330W" },
    { model: "4PPSS23.0-55-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 23.0, maxHead: 55, outlet: '3"', panels: "8 × 330W" },
    { model: "4PPSS23.0-65-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 23.0, maxHead: 65, outlet: '3"', panels: "10 × 330W" },
    { model: "4PPSS28.0-55-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 28.0, maxHead: 55, outlet: '3"', panels: "10 × 330W" },
    // === 6PPSS Standard (-H) ===
    { model: "6PPSS36.0-30-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 36.0, maxHead: 30, outlet: '4"', panels: "6 × 330W" },
    { model: "6PPSS36.0-45-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 36.0, maxHead: 45, outlet: '4"', panels: "8 × 330W" },
    { model: "6PPSS36.0-55-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 36.0, maxHead: 55, outlet: '4"', panels: "10 × 330W" },
    { model: "6PPSS60.0-30-300-3000-H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 60.0, maxHead: 30, outlet: '6"', panels: "10 × 330W" },
    // === HLV (Hybrid Low Voltage) Representative ===
    { model: "4PPSS3.0-80-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 3.0, maxHead: 80, outlet: '1¼"', panels: "3 × 250W", stages: 8 },
    { model: "4PPSS5.5-50-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 5.5, maxHead: 50, outlet: '1½"', panels: "3 × 250W", stages: 5 },
    { model: "4PPSS8.0-80-115-1100-HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 8.0, maxHead: 80, outlet: '2"', panels: "4 × 330W", stages: 7 },
    { model: "4PPSS9.0-100-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 9.0, maxHead: 100, outlet: '2"', panels: "6 × 330W", stages: 9 },
    { model: "4PPSS23.0-55-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 23.0, maxHead: 55, outlet: '3"', panels: "8 × 330W", stages: 6 },
    { model: "6PPSS36.0-30-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 36.0, maxHead: 30, outlet: '4"', panels: "6 × 330W", stages: 3 },
    // === 380HLV High-Power ===
    { model: "4PPSS28.0-90-400-4000-380HLV", powerW: 4000, voltage: "DC400/AC380", maxFlow: 28.0, maxHead: 90, outlet: '3"', panels: "14 × 330W", stages: 8 },
    { model: "4PPSS28.0-115-360-5500-380HLV", powerW: 5500, voltage: "DC360/AC380", maxFlow: 28.0, maxHead: 115, outlet: '3"', panels: "18 × 380W", stages: 10 },
    { model: "6PPSS36.5-90-360-5500-380HLV", powerW: 5500, voltage: "DC360/AC380", maxFlow: 36.5, maxHead: 90, outlet: '4"', panels: "18 × 380W", stages: 8 },
    { model: "6PPSS60.0-45-400-4000-380HLV", powerW: 4000, voltage: "DC400/AC380", maxFlow: 60.0, maxHead: 45, outlet: '6"', panels: "14 × 330W", stages: 4 },
  ],
};

// 18. PZSU-H AC/DC Solar Surface Pump (Page 44)
const seriesPzsuAcdc: SolarSeriesData = {
  slug: "pzsu-acdc-surface",
  name: "PZSU-H AC/DC Solar Surface Pump",
  tagline: "Universal Self-Priming",
  type: "surface",
  powerType: "acdc",
  description: "Self-priming dual power surface pump with jet pump design for shallow wells and tanks. (23 models — 9 Standard + 9 HLV + 3 6H380 + 2 6H380HLV.)",
  features: ["Self-priming jet pump — 8m suction lift", "DC solar + AC grid dual power", "Automatic power source detection", "Cast iron body with brass jet", "Pressure switch and tank compatible", "Thermal overload protection", "Weather-resistant enclosure"],
  applications: ["Home Water Pressure Systems", "Shallow Wells", "Rainwater Tanks", "Garden Irrigation", "Small Farms"],
  models: [
    // Standard Voltage (-2H/-3H/-4H)
    { model: "PZSU20-18-110-1100-2H", powerW: 1100, voltage: "DC110/AC220", maxFlow: 2.0, maxHead: 65, outlet: '1"', panels: "4 × 330W" },
    { model: "PZSU25-20-120-1500-2H", powerW: 1500, voltage: "DC120/AC220", maxFlow: 2.5, maxHead: 72, outlet: '1"', panels: "6 × 330W" },
    { model: "PZSU25-25-200-2200-2H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 2.5, maxHead: 85, outlet: '1"', panels: "8 × 330W" },
    { model: "PZSU35-15-110-1100-3H", powerW: 1100, voltage: "DC110/AC220", maxFlow: 3.5, maxHead: 50, outlet: '1¼"', panels: "4 × 330W" },
    { model: "PZSU45-18-120-1500-3H", powerW: 1500, voltage: "DC120/AC220", maxFlow: 4.5, maxHead: 55, outlet: '1¼"', panels: "6 × 330W" },
    { model: "PZSU50-25-200-2200-3H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 5.0, maxHead: 65, outlet: '1¼"', panels: "8 × 330W" },
    { model: "PZSU52-30-300-3000-3H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 5.2, maxHead: 72, outlet: '1¼"', panels: "10 × 330W" },
    { model: "PZSU50-15-120-1500-4H", powerW: 1500, voltage: "DC120/AC220", maxFlow: 5.0, maxHead: 42, outlet: '1½"', panels: "6 × 330W" },
    { model: "PZSU60-20-200-2200-4H", powerW: 2200, voltage: "DC200/AC220", maxFlow: 6.0, maxHead: 52, outlet: '1½"', panels: "8 × 330W" },
    { model: "PZSU60-25-300-3000-4H", powerW: 3000, voltage: "DC300/AC220", maxFlow: 6.0, maxHead: 60, outlet: '1½"', panels: "10 × 330W" },
    // HLV
    { model: "PZSU20-18-115-1100-2HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 2.0, maxHead: 65, outlet: '1"', panels: "4 × 330W" },
    { model: "PZSU25-20-125-1500-2HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 2.5, maxHead: 72, outlet: '1"', panels: "6 × 330W" },
    { model: "PZSU35-15-115-1100-3HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 3.5, maxHead: 50, outlet: '1¼"', panels: "4 × 330W" },
    { model: "PZSU45-18-125-1500-3HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 4.5, maxHead: 55, outlet: '1¼"', panels: "6 × 330W" },
    // 380V High-Power
    { model: "PZSU140-16-400-4000-6H380", powerW: 4000, voltage: "DC400/AC380", maxFlow: 14.0, maxHead: 55, outlet: '2½"', panels: "14 × 330W" },
    { model: "PZSU160-20-360-5500-6H380", powerW: 5500, voltage: "DC360/AC380", maxFlow: 16.0, maxHead: 65, outlet: '3"', panels: "18 × 380W" },
  ],
};

// 19. PHF-H AC/DC Solar Surface Pump (Page 45)
const seriesPhfAcdc: SolarSeriesData = {
  slug: "phf-acdc-surface",
  name: "PHF-H AC/DC Solar Surface Pump",
  tagline: "Universal High-Flow Surface",
  type: "surface",
  powerType: "acdc",
  description: "High-capacity dual power surface pump for large-scale irrigation and industrial supply. (12 models — 6 Standard + 6 HLV.)",
  features: ["High flow up to 18 m³/h", "DC solar + AC grid dual power", "Cast iron volute with SS impeller", "Large inlet/outlet ports", "Continuous duty capable", "Overload protection on both power sources", "Industrial powder coating finish"],
  applications: ["Large Farm Irrigation", "Water Transfer Projects", "Flood Control", "Aquaculture", "Construction Sites"],
  models: [
    // Standard (-H)
    { model: "PHF15-14-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 15, maxHead: 14, outlet: '2"', panels: "3 × 250W" },
    { model: "PHF20-14-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 20, maxHead: 14, outlet: '2"', panels: "4 × 250W" },
    { model: "PHF28-15-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 28, maxHead: 15, outlet: '2½"', panels: "4 × 330W" },
    { model: "PHF45-17-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 45, maxHead: 17, outlet: '2½"', panels: "6 × 330W" },
    { model: "PHF60-16-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 60, maxHead: 16, outlet: '3"', panels: "8 × 330W" },
    { model: "PHF80-20-385-3000-H", powerW: 3000, voltage: "DC385/AC220", maxFlow: 80, maxHead: 20, outlet: '3"', panels: "10 × 330W" },
    // HLV
    { model: "PHF15-14-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 15, maxHead: 14, outlet: '2"', panels: "3 × 250W" },
    { model: "PHF20-14-96-750-HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 20, maxHead: 14, outlet: '2"', panels: "4 × 250W" },
    { model: "PHF28-15-115-1100-HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 28, maxHead: 15, outlet: '2½"', panels: "4 × 330W" },
    { model: "PHF45-17-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 45, maxHead: 17, outlet: '2½"', panels: "6 × 330W" },
    { model: "PHF60-16-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 60, maxHead: 16, outlet: '3"', panels: "8 × 330W" },
    { model: "PHF80-20-305-3000-HLV", powerW: 3000, voltage: "DC305/AC220", maxFlow: 80, maxHead: 20, outlet: '3"', panels: "10 × 330W" },
  ],
};

// 20. PSP-H AC/DC Swimming Pool Solar Pump (Page 46)
const seriesPspAcdc: SolarSeriesData = {
  slug: "psp-acdc-pool",
  name: "PSP-H AC/DC Swimming Pool Solar Pump",
  tagline: "Universal Pool Pump",
  type: "pool",
  powerType: "acdc",
  description: "Dual power pool circulation pump — solar by day, grid by night for energy-efficient pool operation. (10 models — 5 Standard + 5 HLV.)",
  features: ["Dual DC solar + AC grid power", "Large pre-filter with transparent lid", "Corrosion-resistant pump body", "Ultra-quiet operation", "Automatic solar priority mode", "Compatible with all filter types", "IP55 weather protection"],
  applications: ["Residential Pools", "Commercial Pools", "Hotel Pools", "Water Parks", "Spa Facilities"],
  models: [
    // Standard (-H)
    { model: "PSP14-13-72-600-H", powerW: 600, voltage: "DC72/AC220", maxFlow: 14, maxHead: 13, outlet: '1½"', panels: "3 × 250W" },
    { model: "PSP16-14-96-750-H", powerW: 750, voltage: "DC96/AC220", maxFlow: 16, maxHead: 14, outlet: '1½"', panels: "4 × 250W" },
    { model: "PSP22-13-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 22, maxHead: 13, outlet: '2"', panels: "4 × 330W" },
    { model: "PSP25-14-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 25, maxHead: 14, outlet: '2"', panels: "6 × 330W" },
    { model: "PSP36-18-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 36, maxHead: 18, outlet: '2½"', panels: "8 × 330W" },
    // HLV
    { model: "PSP14-13-72-600-HLV", powerW: 600, voltage: "DC72/AC220", maxFlow: 14, maxHead: 13, outlet: '1½"', panels: "3 × 250W" },
    { model: "PSP16-14-96-750-HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 16, maxHead: 14, outlet: '1½"', panels: "4 × 250W" },
    { model: "PSP22-13-115-1100-HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 22, maxHead: 13, outlet: '2"', panels: "4 × 330W" },
    { model: "PSP25-14-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 25, maxHead: 14, outlet: '2"', panels: "6 × 330W" },
    { model: "PSP36-18-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 36, maxHead: 18, outlet: '2½"', panels: "8 × 330W" },
  ],
};

// 21. PSG-H AC/DC Solar Submersible Pump (Page 47)
const seriesPsgAcdc: SolarSeriesData = {
  slug: "psg-acdc-submersible",
  name: "PSG-H AC/DC Solar Submersible Pump",
  tagline: "Universal Heavy Submersible",
  type: "submersible",
  powerType: "acdc",
  description: "Dual power heavy-duty submersible pump for rivers, lakes and large water transfer. 24/7 operation. (12 models — 6 Standard + 6 HLV.)",
  features: ["Heavy-duty dual power submersible", "DC solar + AC grid input", "Axial/mixed flow high-volume design", "Double mechanical seal protection", "Oil-filled motor for cooling", "Large debris-passing capability", "Continuous 24/7 duty rated"],
  applications: ["River Water Extraction", "Lake Water Supply", "Industrial Transfer", "Flood Management", "Aquaculture"],
  models: [
    // WB Series (-2H) — small/medium submersible
    { model: "WB15-16-96-750-2H", powerW: 750, voltage: "DC96/AC220", maxFlow: 15, maxHead: 16, outlet: '2"', panels: "4 × 250W" },
    { model: "WB17-20-110-1100-2H", powerW: 1100, voltage: "DC110/AC220", maxFlow: 17, maxHead: 20, outlet: '2"', panels: "4 × 330W" },
    // PSG Series (-H) — large submersible
    { model: "PSG40-10-144-1100-H", powerW: 1100, voltage: "DC144/AC220", maxFlow: 40, maxHead: 10, outlet: '3"', panels: "4 × 330W" },
    { model: "PSG45-12-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 45, maxHead: 12, outlet: '3"', panels: "6 × 330W" },
    { model: "PSG48-10-192-1500-H", powerW: 1500, voltage: "DC192/AC220", maxFlow: 48, maxHead: 10, outlet: '3"', panels: "6 × 330W" },
    { model: "PSG56-14-280-2200-H", powerW: 2200, voltage: "DC280/AC220", maxFlow: 56, maxHead: 14, outlet: '4"', panels: "8 × 330W" },
    // HLV
    { model: "WB15-16-96-750-2HLV", powerW: 750, voltage: "DC96/AC220", maxFlow: 15, maxHead: 16, outlet: '2"', panels: "4 × 250W" },
    { model: "WB17-20-115-1100-2HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 17, maxHead: 20, outlet: '2"', panels: "4 × 330W" },
    { model: "PSG40-10-115-1100-HLV", powerW: 1100, voltage: "DC115/AC220", maxFlow: 40, maxHead: 10, outlet: '3"', panels: "4 × 330W" },
    { model: "PSG45-12-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 45, maxHead: 12, outlet: '3"', panels: "6 × 330W" },
    { model: "PSG48-10-125-1500-HLV", powerW: 1500, voltage: "DC125/AC220", maxFlow: 48, maxHead: 10, outlet: '3"', panels: "6 × 330W" },
    { model: "PSG56-14-205-2200-HLV", powerW: 2200, voltage: "DC205/AC220", maxFlow: 56, maxHead: 14, outlet: '4"', panels: "8 × 330W" },
  ],
};

/* ═══════════════════════════════════════════════════════════════════
   Master data map
   ═══════════════════════════════════════════════════════════════════ */
export const SOLAR_SERIES_MAP: Record<string, SolarSeriesData> = {
  "2inch-dc-screw-impeller": series2inchDc,
  "3-4inch-dc-screw": series34inchDcScrew,
  "3inch-dc-plastic-impeller": series3inchDcPlastic,
  "3inch-dc-ss-impeller": series3inchDcSs,
  "4inch-dc-plastic-impeller": series4inchDcPlastic,
  "4-6inch-dc-ss-impeller": series46inchDcSs,
  "psqb-dc-surface": seriesPsqbDc,
  "psgj-dc-surface": seriesPsgjDc,
  "phf-dc-surface": seriesPhfDc,
  "pzsu-dc-surface": seriesPzsuDc,
  "psp-dc-pool": seriesPspDc,
  "peqdx-dc-submersible": seriesPeqdxDc,
  "psg-dc-submersible": seriesPsgDc,
  "3inch-acdc-plastic-impeller": series3inchAcdcPlastic,
  "3inch-acdc-ss-impeller": series3inchAcdcSs,
  "4inch-acdc-plastic-impeller": series4inchAcdcPlastic,
  "4-6inch-acdc-ss-impeller": series46inchAcdcSs,
  "pzsu-acdc-surface": seriesPzsuAcdc,
  "phf-acdc-surface": seriesPhfAcdc,
  "psp-acdc-pool": seriesPspAcdc,
  "psg-acdc-submersible": seriesPsgAcdc,
};

export const ALL_SOLAR_SLUGS = Object.keys(SOLAR_SERIES_MAP);
