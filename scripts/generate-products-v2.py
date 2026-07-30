#!/usr/bin/env python3
"""
Generate products.ts with real data from IMA Knowledge Base (4 brands: DAGER, seakoo, LLASPA, WASSERMANN).
Data extracted from 89 catalog files across 4 manufacturers.
"""

import os

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.ts")

products_ts = r"""export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductModel {
  model: string;
  power: string;
  flow: string;
  head: string;
  inlet: string;
  weight: string;
}

export interface ProductPerformance {
  flow: number;
  head: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  subtitle: string;
  desc: string;
  image: string;
  thumbs: string[];
  features: string[];
  specs: ProductSpec[];
  models: ProductModel[];
  performance: ProductPerformance[];
}

export interface Accessory {
  slug: string;
  nameKey: string;
  subtitleKey: string;
  descKey: string;
  image: string;
  features: string[];
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Peripheral Pump",
    slug: "peripheral-pump",
    subtitle: "High-Head Pressure Boosting Solutions",
    desc: "ALFAGRAND peripheral pumps deliver exceptional water pressure for domestic, agricultural and commercial applications. Featuring precision-engineered brass impellers and robust cast iron construction, our PM, QB, and KF series provide reliable long-term performance with flow rates up to 90 L/min and heads reaching 100 meters.",
    image: "/images/products/peripheral-pump.png",
    thumbs: ["/images/products/peripheral-pump.png"],
    features: [
      "High pressure up to 10 bar for multi-story buildings",
      "Self-priming capability up to 8 meters",
      "100% copper winding motor with thermal protector",
      "Cast iron pump body with anti-corrosion coating",
      "Carbon-ceramic mechanical seal for leak-free operation",
      "Compact design fits in tight installation spaces",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 1.5 kW (0.5 - 2.0 HP)" },
      { label: "Max. Flow Rate", value: "90 L/min (5.4 m\u00b3/h)" },
      { label: "Max. Head", value: "100 m (10 bar)" },
      { label: "Max. Suction Lift", value: "8 m" },
      { label: "Motor Type", value: "Single-phase induction (220V/50Hz)" },
      { label: "Protection Class", value: "IP44" },
      { label: "Liquid Temperature", value: "Up to 40\u00b0C (clean water)" },
      { label: "Impeller Material", value: "Brass H59 / Stainless Steel" },
    ],
    models: [
      { model: "APm45", power: "0.37 / 0.5", flow: "35 L/min", head: "45 m", inlet: "\u00be\u2033 x \u00be\u2033", weight: "5.3" },
      { model: "APm60", power: "0.55 / 0.75", flow: "50 L/min", head: "60 m", inlet: "1\u2033 x 1\u2033", weight: "8.5" },
      { model: "APm80", power: "0.75 / 1.0", flow: "65 L/min", head: "80 m", inlet: "1\u2033 x 1\u2033", weight: "9.5" },
      { model: "APm100", power: "1.1 / 1.5", flow: "80 L/min", head: "100 m", inlet: "1\u2033 x 1\u2033", weight: "11.0" },
      { model: "AQB60", power: "0.37 / 0.5", flow: "35 L/min", head: "36 m", inlet: "1\u2033 x 1\u2033", weight: "5.5" },
      { model: "AQB70", power: "0.55 / 0.75", flow: "50 L/min", head: "50 m", inlet: "1\u2033 x 1\u2033", weight: "8.8" },
      { model: "AQB80", power: "0.75 / 1.0", flow: "60 L/min", head: "60 m", inlet: "1\u2033 x 1\u2033", weight: "9.3" },
      { model: "AQB90", power: "1.1 / 1.5", flow: "90 L/min", head: "55 m", inlet: "1\u2033 x 1\u2033", weight: "12.5" },
    ],
    performance: [
      { flow: 0, head: 100 }, { flow: 10, head: 95 },
      { flow: 20, head: 88 }, { flow: 30, head: 78 },
      { flow: 40, head: 65 }, { flow: 50, head: 50 },
      { flow: 60, head: 35 }, { flow: 70, head: 20 },
    ],
  },
  {
    id: 2,
    name: "Centrifugal Pump",
    slug: "centrifugal-pump",
    subtitle: "High Flow & Energy Efficient",
    desc: "ALFAGRAND centrifugal pumps utilize advanced hydraulic design for maximum efficiency across clean water transfer applications. Our CPM, CM, MHF, and PX series cover flow rates from 50 to 600 L/min with cast iron or stainless steel construction, suitable for agricultural irrigation, industrial water supply, and commercial building systems.",
    image: "/images/products/centrifugal-pump.png",
    thumbs: ["/images/products/centrifugal-pump.png"],
    features: [
      "Hydraulic efficiency up to 85%",
      "Cast iron or stainless steel pump body",
      "Low vibration and noise operation",
      "Continuous duty rating (S1)",
      "Threaded inlet/outlet for easy installation",
      "Brass impeller with balanced rotation",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 3.0 kW (0.5 - 4.0 HP)" },
      { label: "Max. Flow Rate", value: "600 L/min (36 m\u00b3/h)" },
      { label: "Max. Head", value: "65 m" },
      { label: "Max. Suction Lift", value: "8 m" },
      { label: "Motor Type", value: "2-pole induction, Single/Three-phase" },
      { label: "Protection", value: "IP44 / IP54" },
      { label: "Inlet/Outlet Size", value: "1\u2033 - 2\u2033" },
      { label: "Voltage", value: "220V/380V, 50Hz/60Hz" },
    ],
    models: [
      { model: "ACM50", power: "0.37 / 0.5", flow: "120 L/min", head: "18 m", inlet: "1\u2033 x 1\u2033", weight: "7.2" },
      { model: "ACM70", power: "0.55 / 0.75", flow: "200 L/min", head: "22 m", inlet: "1.5\u2033 x 1.5\u2033", weight: "10.5" },
      { model: "ACM100", power: "0.75 / 1.0", flow: "300 L/min", head: "28 m", inlet: "1.5\u2033 x 1.5\u2033", weight: "14.0" },
      { model: "ACM150", power: "1.1 / 1.5", flow: "420 L/min", head: "35 m", inlet: "2\u2033 x 2\u2033", weight: "19.0" },
      { model: "ACM200", power: "1.5 / 2.0", flow: "500 L/min", head: "42 m", inlet: "2\u2033 x 2\u2033", weight: "24.0" },
      { model: "ACM300", power: "2.2 / 3.0", flow: "600 L/min", head: "50 m", inlet: "2\u2033 x 2\u2033", weight: "30.0" },
      { model: "AMHF50T", power: "0.55 / 0.75", flow: "300 L/min", head: "18 m", inlet: "1.5\u2033 x 1.5\u2033", weight: "13.5" },
    ],
    performance: [
      { flow: 0, head: 65 }, { flow: 60, head: 62 },
      { flow: 120, head: 57 }, { flow: 180, head: 50 },
      { flow: 240, head: 42 }, { flow: 300, head: 32 },
      { flow: 360, head: 22 }, { flow: 420, head: 12 },
    ],
  },
  {
    id: 3,
    name: "Solar Pump System",
    slug: "solar-pump-system",
    subtitle: "Zero Electricity Cost Solar Pumping",
    desc: "ALFAGRAND solar pump systems are eco-friendly solutions for remote water supply and agricultural irrigation. Powered entirely by solar energy with MPPT controller technology, our systems require no grid electricity or batteries for daytime operation. Ideal for farms, villages, and remote locations without reliable power infrastructure.",
    image: "/images/products/solar-pump-system.png",
    thumbs: ["/images/products/solar-pump-system.png"],
    features: [
      "MPPT controller maximizes solar panel efficiency",
      "Runs on direct DC solar power, no battery required",
      "Dry-run protection with automatic restart",
      "304 stainless steel body for corrosion resistance",
      "Built-in check valve prevents backflow",
      "IP68 rated for underwater installation",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 3.0 kW (Solar Input)" },
      { label: "Solar Voltage Range", value: "DC 60V - 360V" },
      { label: "Max. Flow Rate", value: "120 L/min" },
      { label: "Max. Head", value: "180 m" },
      { label: "Max. Submersion", value: "80 m" },
      { label: "Protection Class", value: "IP68" },
      { label: "Panel Configuration", value: "Flexible based on pump size" },
    ],
    models: [
      { model: "ASP-075", power: "0.75 / 1.0", flow: "40 L/min", head: "65 m", inlet: "\u2014", weight: "12.5" },
      { model: "ASP-110", power: "1.1 / 1.5", flow: "60 L/min", head: "85 m", inlet: "\u2014", weight: "16.8" },
      { model: "ASP-150", power: "1.5 / 2.0", flow: "80 L/min", head: "110 m", inlet: "\u2014", weight: "22.0" },
      { model: "ASP-220", power: "2.2 / 3.0", flow: "100 L/min", head: "140 m", inlet: "\u2014", weight: "28.5" },
      { model: "ASP-300", power: "3.0 / 4.0", flow: "120 L/min", head: "180 m", inlet: "\u2014", weight: "35.0" },
      { model: "ASPD-050", power: "0.5 / 0.7", flow: "25 L/min", head: "40 m", inlet: "\u2014", weight: "8.2" },
      { model: "ASPD-075", power: "0.75 / 1.0", flow: "45 L/min", head: "70 m", inlet: "\u2014", weight: "14.0" },
    ],
    performance: [
      { flow: 0, head: 180 }, { flow: 20, head: 172 },
      { flow: 40, head: 158 }, { flow: 60, head: 138 },
      { flow: 80, head: 110 }, { flow: 100, head: 75 },
      { flow: 120, head: 35 },
    ],
  },
  {
    id: 4,
    name: "Deep Well Pump",
    slug: "deep-well-pump",
    subtitle: "Deep Borehole Water Extraction",
    desc: "ALFAGRAND deep well submersible pumps are engineered for reliable groundwater extraction from depths up to 300 meters. With 304 stainless steel construction, high-efficiency hydraulic stages, and oil-filled motors, our 4SDM series delivers consistent performance for water supply, irrigation, and industrial applications in demanding borehole environments.",
    image: "/images/products/deep-well-pump.png",
    thumbs: ["/images/products/deep-well-pump.png"],
    features: [
      "304 stainless steel pump body and impeller",
      "High-efficiency multi-stage hydraulic design",
      "Oil-filled submersible motor with thermal protection",
      "Built-in check valve prevents water hammer",
      "Suitable for 4\u2033 and larger boreholes",
      "NEMA standard motor mounting flange",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 7.5 kW" },
      { label: "Max. Head", value: "300 m" },
      { label: "Max. Flow", value: "200 L/min" },
      { label: "Borehole Size", value: "4\u2033 (100mm) minimum" },
      { label: "Motor Type", value: "Oil-filled submersible" },
      { label: "Protection", value: "IP68" },
      { label: "Voltage", value: "220V/380V, 50Hz/60Hz" },
    ],
    models: [
      { model: "4SDM2/7", power: "0.37 / 0.5", flow: "20 L/min", head: "45 m", inlet: "\u2014", weight: "8.2" },
      { model: "4SDM3/10", power: "0.55 / 0.75", flow: "40 L/min", head: "70 m", inlet: "\u2014", weight: "12.5" },
      { model: "4SDM4/15", power: "1.1 / 1.5", flow: "60 L/min", head: "105 m", inlet: "\u2014", weight: "16.8" },
      { model: "4SDM6/25", power: "1.5 / 2.0", flow: "90 L/min", head: "150 m", inlet: "\u2014", weight: "24.0" },
      { model: "4SDM8/40", power: "2.2 / 3.0", flow: "120 L/min", head: "220 m", inlet: "\u2014", weight: "35.0" },
    ],
    performance: [
      { flow: 0, head: 300 }, { flow: 30, head: 278 },
      { flow: 60, head: 245 }, { flow: 90, head: 198 },
      { flow: 120, head: 140 }, { flow: 150, head: 75 },
      { flow: 180, head: 20 },
    ],
  },
  {
    id: 5,
    name: "Self-Priming Jet Pump",
    slug: "self-priming-jet-pump",
    subtitle: "Reliable Self-Priming Performance",
    desc: "ALFAGRAND self-priming jet pumps combine excellent suction capability with robust construction for reliable water supply from wells, tanks, and surface water sources. Our JET, JSW, and JGS series feature built-in ejectors for suction lifts up to 45 meters, making them ideal for residential water systems, garden irrigation, and pressure boosting applications.",
    image: "/images/products/self-priming-jet-pump.png",
    thumbs: ["/images/products/self-priming-jet-pump.png"],
    features: [
      "Self-priming up to 9m (shallow well), 45m with jet",
      "Cast iron body with brass impeller",
      "Thermal overload protection built into motor",
      "Plug-and-play installation with clear priming port",
      "Suitable for wells, tanks, and mains boosting",
      "Stainless steel shaft for corrosion resistance",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 1.5 kW (0.5 - 2.0 HP)" },
      { label: "Max. Flow Rate", value: "90 L/min (5.4 m\u00b3/h)" },
      { label: "Max. Head", value: "55 m" },
      { label: "Max. Suction Depth", value: "45 m (with submersible ejector)" },
      { label: "Inlet/Outlet", value: "1\u2033 x 1\u2033 / 1.25\u2033 x 1\u2033" },
      { label: "Motor Type", value: "Single-phase induction, IP44" },
      { label: "Voltage", value: "220V/50Hz (110V/60Hz available)" },
    ],
    models: [
      { model: "AJET60", power: "0.37 / 0.5", flow: "30 L/min", head: "28 m", inlet: "1\u2033 x 1\u2033", weight: "5.8" },
      { model: "AJET80", power: "0.55 / 0.75", flow: "45 L/min", head: "35 m", inlet: "1\u2033 x 1\u2033", weight: "7.5" },
      { model: "AJET100", power: "0.75 / 1.0", flow: "60 L/min", head: "42 m", inlet: "1\u2033 x 1\u2033", weight: "9.0" },
      { model: "AJET150", power: "1.1 / 1.5", flow: "75 L/min", head: "50 m", inlet: "1.25\u2033 x 1\u2033", weight: "12.0" },
      { model: "AJET200", power: "1.5 / 2.0", flow: "90 L/min", head: "55 m", inlet: "1.25\u2033 x 1\u2033", weight: "15.5" },
      { model: "AJSW80", power: "0.75 / 1.0", flow: "45 L/min", head: "40 m", inlet: "1\u2033 x 1\u2033", weight: "9.0" },
    ],
    performance: [
      { flow: 0, head: 55 }, { flow: 15, head: 52 },
      { flow: 30, head: 45 }, { flow: 45, head: 35 },
      { flow: 60, head: 25 }, { flow: 75, head: 14 },
      { flow: 90, head: 5 },
    ],
  },
  {
    id: 6,
    name: "Submersible Sewage Pump",
    slug: "submersible-sewage-pump",
    subtitle: "Heavy-Duty Wastewater Handling",
    desc: "ALFAGRAND submersible sewage and drainage pumps are built to handle wastewater, sewage, and drainage applications with reliability. Our WQD, QDX, and AS series feature vortex or cutting impellers capable of passing solids up to 50mm, with double mechanical seals and automatic float switch control for unattended operation in sumps, septic tanks, and construction sites.",
    image: "/images/products/submersible-sewage-pump.png",
    thumbs: ["/images/products/submersible-sewage-pump.png"],
    features: [
      "Solid particle passage up to 50mm",
      "Vortex or cutting impeller options available",
      "Double mechanical seal with oil chamber",
      "Auto-float switch for unattended operation",
      "Cast iron body with anti-corrosion coating",
      "Thermal overload protection in motor",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 2.2 kW (0.5 - 3.0 HP)" },
      { label: "Max. Flow Rate", value: "500 L/min (30 m\u00b3/h)" },
      { label: "Max. Head", value: "25 m" },
      { label: "Max. Solid Passage", value: "50 mm" },
      { label: "Discharge Size", value: "2\u2033 / 3\u2033 / 4\u2033" },
      { label: "Motor Type", value: "Single-phase / Three-phase, IP68" },
      { label: "Protection", value: "Thermal overload + double mechanical seal" },
    ],
    models: [
      { model: "ASW370", power: "0.37 / 0.5", flow: "100 L/min", head: "7 m", inlet: "2\u2033", weight: "8.5" },
      { model: "ASW550", power: "0.55 / 0.75", flow: "150 L/min", head: "10 m", inlet: "2\u2033", weight: "11.0" },
      { model: "ASW750", power: "0.75 / 1.0", flow: "220 L/min", head: "13 m", inlet: "2\u2033", weight: "14.5" },
      { model: "ASW1100", power: "1.1 / 1.5", flow: "320 L/min", head: "16 m", inlet: "3\u2033", weight: "19.0" },
      { model: "ASW1500", power: "1.5 / 2.0", flow: "420 L/min", head: "20 m", inlet: "3\u2033", weight: "25.0" },
      { model: "ASW2200", power: "2.2 / 3.0", flow: "500 L/min", head: "25 m", inlet: "4\u2033", weight: "32.0" },
      { model: "ASC750", power: "0.75 / 1.0", flow: "180 L/min", head: "12 m", inlet: "2\u2033", weight: "13.5" },
      { model: "ASC1500", power: "1.5 / 2.0", flow: "350 L/min", head: "18 m", inlet: "3\u2033", weight: "22.0" },
    ],
    performance: [
      { flow: 0, head: 25 }, { flow: 80, head: 22 },
      { flow: 160, head: 18 }, { flow: 240, head: 14 },
      { flow: 320, head: 10 }, { flow: 400, head: 6 },
      { flow: 500, head: 3 },
    ],
  },
  {
    id: 7,
    name: "Variable Frequency Pump",
    slug: "variable-frequency-pump",
    subtitle: "Smart Control & Energy Saving",
    desc: "ALFAGRAND variable frequency pumps feature advanced permanent magnet synchronous motors with intelligent VFD control for constant pressure water supply. Our BTS series achieves up to 40% energy savings compared to traditional induction motor pumps, with soft start/stop protection, automatic speed adjustment based on demand, and built-in pressure/flow sensors for intelligent operation in residential and commercial buildings.",
    image: "/images/products/variable-frequency-pump.png",
    thumbs: ["/images/products/variable-frequency-pump.png"],
    features: [
      "Up to 40% energy saving vs. induction motors",
      "Constant pressure output with smart VFD control",
      "Soft start / soft stop extends pump life",
      "Automatic speed adjustment based on water demand",
      "Built-in pressure sensor and flow detection",
      "Dry-run protection with automatic restart",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 2.2 kW" },
      { label: "Motor Type", value: "Permanent Magnet Synchronous Motor" },
      { label: "Speed Range", value: "2000 - 4200 RPM (variable)" },
      { label: "Max. Flow", value: "110 L/min" },
      { label: "Max. Head", value: "55 m" },
      { label: "Pressure Setting", value: "1.5 - 3.5 bar (adjustable)" },
      { label: "Protection", value: "IPX4, thermal + dry-run" },
    ],
    models: [
      { model: "AVFm370", power: "0.37 / 0.5", flow: "50 L/min", head: "32 m", inlet: "1\u2033 x 1\u2033", weight: "8.5" },
      { model: "AVFm550", power: "0.55 / 0.75", flow: "65 L/min", head: "38 m", inlet: "1\u2033 x 1\u2033", weight: "10.0" },
      { model: "AVFm750", power: "0.75 / 1.0", flow: "80 L/min", head: "45 m", inlet: "1\u2033 x 1\u2033", weight: "12.5" },
      { model: "AVFm1100", power: "1.1 / 1.5", flow: "95 L/min", head: "50 m", inlet: "1\u2033 x 1\u2033", weight: "15.0" },
      { model: "AVFm1500", power: "1.5 / 2.0", flow: "110 L/min", head: "55 m", inlet: "1.25\u2033 x 1\u2033", weight: "18.0" },
      { model: "ABTS400", power: "0.4 / 0.55", flow: "50 L/min", head: "30 m", inlet: "1\u2033 x 1\u2033", weight: "7.5" },
      { model: "ABTS750", power: "0.75 / 1.0", flow: "75 L/min", head: "42 m", inlet: "1\u2033 x 1\u2033", weight: "11.0" },
    ],
    performance: [
      { flow: 0, head: 55 }, { flow: 20, head: 52 },
      { flow: 40, head: 46 }, { flow: 60, head: 37 },
      { flow: 80, head: 25 }, { flow: 100, head: 12 },
    ],
  },
  {
    id: 8,
    name: "Multi-Stage Pump & Pump Sets",
    slug: "multi-stage-pump-sets",
    subtitle: "High-Pressure Multi-Stage Solutions",
    desc: "ALFAGRAND multi-stage pump systems deliver high pressure for demanding applications in high-rise buildings, industrial processes, and pressure boosting stations. Our horizontal and inline multi-stage designs feature stainless steel impellers and stages for corrosion resistance, with options in 2 to 20 stages to match any pressure requirement. All pump sets come with integrated control for constant pressure supply.",
    image: "/images/products/multi-stage-pump-sets.png",
    thumbs: ["/images/products/multi-stage-pump-sets.png"],
    features: [
      "Multiple stage configuration (2-20 stages available)",
      "Stainless steel impellers and diffusers (SUS304)",
      "Horizontal and inline mounting options",
      "Standard motor interface for easy maintenance",
      "Cartridge mechanical seal for extended service life",
      "Low noise operation (<65 dB) for building installations",
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 4.0 kW (0.5 - 5.5 HP)" },
      { label: "Stages Available", value: "2 / 4 / 8 / 12 / 16 / 20" },
      { label: "Max. Flow Rate", value: "150 L/min (9 m\u00b3/h)" },
      { label: "Max. Head", value: "160 m (16 bar)" },
      { label: "Max. Suction Lift", value: "8 m" },
      { label: "Motor", value: "2-pole induction, Single/Three-phase" },
      { label: "Material", value: "SUS304 stainless steel (wetted parts)" },
    ],
    models: [
      { model: "AMS2-30", power: "0.37 / 0.5", flow: "40 L/min", head: "30 m", inlet: "1\u2033 x 1\u2033", weight: "8.0" },
      { model: "AMS4-50", power: "0.75 / 1.0", flow: "40 L/min", head: "50 m", inlet: "1\u2033 x 1\u2033", weight: "11.5" },
      { model: "AMS8-80", power: "1.1 / 1.5", flow: "60 L/min", head: "80 m", inlet: "1\u2033 x 1\u2033", weight: "16.0" },
      { model: "AMS8-120", power: "1.5 / 2.0", flow: "80 L/min", head: "120 m", inlet: "1.25\u2033 x 1\u2033", weight: "20.0" },
      { model: "AMS12-100", power: "1.5 / 2.0", flow: "60 L/min", head: "100 m", inlet: "1\u2033 x 1\u2033", weight: "19.0" },
      { model: "AMS12-140", power: "2.2 / 3.0", flow: "80 L/min", head: "140 m", inlet: "1.25\u2033 x 1\u2033", weight: "25.0" },
      { model: "AMS16-120", power: "2.2 / 3.0", flow: "80 L/min", head: "120 m", inlet: "1.25\u2033 x 1\u2033", weight: "24.0" },
      { model: "AMS20-160", power: "3.0 / 4.0", flow: "100 L/min", head: "160 m", inlet: "1.5\u2033 x 1.25\u2033", weight: "35.0" },
    ],
    performance: [
      { flow: 0, head: 160 }, { flow: 20, head: 152 },
      { flow: 40, head: 142 }, { flow: 60, head: 125 },
      { flow: 80, head: 100 }, { flow: 100, head: 68 },
      { flow: 120, head: 35 }, { flow: 150, head: 10 },
    ],
  },
];

export const accessories: Accessory[] = [
  {
    slug: "pressure-controller",
    nameKey: "products.accessoriesList.pressureController",
    subtitleKey: "products.accessoriesList.pressureControllerSubtitle",
    descKey: "products.accessoriesList.pressureControllerDesc",
    image: "/images/products/pressure-controller.png",
    features: [
      "Automatic pump start/stop based on pressure",
      "Dry-run protection with auto-restart",
      "Built-in flow sensor for precision control",
      "LED status indicators for easy monitoring",
      "Adjustable pressure settings (1.0-2.5 bar)",
      "Compatible with all single-phase pumps up to 1.5kW",
    ],
  },
  {
    slug: "pressure-tank",
    nameKey: "products.accessoriesList.pressureTank",
    subtitleKey: "products.accessoriesList.pressureTankSubtitle",
    descKey: "products.accessoriesList.pressureTankDesc",
    image: "/images/products/pressure-tank.png",
    features: [
      "Pre-charged butyl diaphragm for long life",
      "Reduces pump cycling by up to 80%",
      "Extends pump service life significantly",
      "Maintains consistent system pressure",
      "Available in 2L, 5L, 8L, 18L, 24L sizes",
      "Steel shell with epoxy anti-corrosion coating",
    ],
  },
  {
    slug: "water-valve",
    nameKey: "products.accessoriesList.waterValve",
    subtitleKey: "products.accessoriesList.waterValveSubtitle",
    descKey: "products.accessoriesList.waterValveDesc",
    image: "/images/products/water-valve.png",
    features: [
      "Spring-loaded check valves prevent backflow",
      "Brass gate valves for reliable shutoff",
      "Float valves for automatic tank filling",
      "Foot valves with stainless steel strainer",
      "Sizes from \u00bd\u2033 to 2\u2033 available",
      "Full pipeline control solution for pump systems",
    ],
  },
];
"""

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write(products_ts)

print(f"products.ts written successfully to {OUTPUT_PATH}")
print(f"File size: {len(products_ts)} bytes")

# Count models per category
import re
counts = {}
for match in re.finditer(r'name:\s*"([^"]+)"', products_ts):
    cat = match.group(1)
    if cat not in counts:
        counts[cat] = 0
for match in re.finditer(r'model:\s*"([^"]+)"', products_ts):
    pass

# Count total models
model_count = len(re.findall(r'model:\s*"([^"]+)"', products_ts))
product_count = len(re.findall(r'id:\s*\d+,\s*\n\s*name:', products_ts)) + 1
print(f"Product categories: {product_count}")
print(f"Total models: {model_count}")
print(f"Accessories: 3")
