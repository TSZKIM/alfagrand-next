#!/usr/bin/env python3
"""Generate enriched ALFAGRAND products.ts data file"""

content = r'''export interface ProductSpec {
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
    subtitle: "Compact & High-Pressure",
    desc: "High-head peripheral pumps designed for clean water transfer, pressure boosting, and domestic water supply. Excellent self-priming capability with compact design suitable for residential, agricultural and light industrial applications.",
    image: "/images/products/peripheral-pump.png",
    thumbs: ["/images/products/peripheral-pump.png"],
    features: [
      "Self-priming up to 8m suction lift",
      "Flow rate up to 100 L/min (6.0 m3/h)",
      "Max head up to 55m",
      "Low noise operation",
      "Cast iron pump body with brass impeller",
      "IP44 protection, Class B insulation",
      "Single-phase 220V/50Hz and 60Hz available",
      "Thermal overload protection"
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 1.5 kW (0.5 - 2.0 HP)" },
      { label: "Max. Flow Rate", value: "100 L/min (6.0 m3/h)" },
      { label: "Max. Head", value: "55 m" },
      { label: "Max. Suction Lift", value: "8 m" },
      { label: "Liquid Temperature", value: "Up to +40 C" },
      { label: "Inlet/Outlet", value: "G1 x G1  to G1.5 x G1.5" },
      { label: "Protection Class", value: "IP44" },
      { label: "Insulation", value: "Class B / Class F" },
    ],
    models: [
      { model: "APm40", power: "0.37 / 0.5", flow: "35 L/min", head: "35 m", inlet: "1x1", weight: "5.3" },
      { model: "APm60", power: "0.55 / 0.75", flow: "50 L/min", head: "42 m", inlet: "1x1", weight: "7.8" },
      { model: "APm80", power: "0.75 / 1.0", flow: "65 L/min", head: "48 m", inlet: "1x1", weight: "9.2" },
      { model: "APm100", power: "1.1 / 1.5", flow: "85 L/min", head: "52 m", inlet: "1x1", weight: "11.5" },
      { model: "APm150", power: "1.5 / 2.0", flow: "100 L/min", head: "55 m", inlet: "1.5x1.5", weight: "14.0" },
    ],
    performance: [
      { flow: 0, head: 55 }, { flow: 10, head: 53 },
      { flow: 20, head: 50 }, { flow: 30, head: 46 },
      { flow: 40, head: 40 }, { flow: 50, head: 32 },
      { flow: 60, head: 24 }, { flow: 70, head: 15 },
      { flow: 80, head: 8 }, { flow: 90, head: 3 },
    ],
  },
  {
    id: 2,
    name: "Centrifugal Pump",
    slug: "centrifugal-pump",
    subtitle: "High Flow and Energy Efficient",
    desc: "Single-stage centrifugal pumps engineered for maximum hydraulic efficiency. Designed for clean water transfer, irrigation, water supply systems and industrial circulation with robust construction ensuring long service life.",
    image: "/images/products/centrifugal-pump.png",
    thumbs: ["/images/products/centrifugal-pump.png"],
    features: [
      "Hydraulic efficiency up to 85 percent",
      "Large flow rates up to 500 L/min",
      "Cast iron / Stainless steel pump body",
      "Low vibration, quiet operation",
      "Continuous duty rated (S1)",
      "Built-in thermal protector",
      "Easy maintenance with back pull-out design",
      "CE, RoHS certified"
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 4.0 kW (0.5 - 5.5 HP)" },
      { label: "Max. Flow Rate", value: "500 L/min (30 m3/h)" },
      { label: "Max. Head", value: "65 m" },
      { label: "Liquid Temperature", value: "Up to +60 C" },
      { label: "Inlet/Outlet", value: "G1.5 to G3" },
      { label: "Protection Class", value: "IP44 / IP54" },
      { label: "Insulation", value: "Class F" },
    ],
    models: [
      { model: "ACM50", power: "0.37 / 0.5", flow: "50 L/min", head: "28 m", inlet: "1.5x1.5", weight: "7.0" },
      { model: "ACM80", power: "0.55 / 0.75", flow: "80 L/min", head: "35 m", inlet: "1.5x1.5", weight: "9.5" },
      { model: "ACM100", power: "0.75 / 1.0", flow: "120 L/min", head: "40 m", inlet: "2x2", weight: "12.0" },
      { model: "ACM150", power: "1.1 / 1.5", flow: "180 L/min", head: "45 m", inlet: "2x2", weight: "15.5" },
      { model: "ACM200", power: "1.5 / 2.0", flow: "280 L/min", head: "50 m", inlet: "2x2", weight: "18.0" },
      { model: "ACM300", power: "2.2 / 3.0", flow: "380 L/min", head: "58 m", inlet: "3x3", weight: "25.0" },
      { model: "ACM550", power: "4.0 / 5.5", flow: "500 L/min", head: "65 m", inlet: "3x3", weight: "32.0" },
    ],
    performance: [
      { flow: 0, head: 65 }, { flow: 50, head: 62 },
      { flow: 100, head: 57 }, { flow: 150, head: 50 },
      { flow: 200, head: 42 }, { flow: 300, head: 30 },
      { flow: 400, head: 18 }, { flow: 500, head: 6 },
    ],
  },
  {
    id: 3,
    name: "Solar Pump System",
    slug: "solar-pump-system",
    subtitle: "Zero-Cost Solar Water Pumping",
    desc: "Complete solar-powered water pumping solutions with DC brushless motors, MPPT controllers and high-efficiency solar panels. Ideal for remote irrigation, livestock watering and off-grid water supply.",
    image: "/images/products/solar-pump-system.png",
    thumbs: ["/images/products/solar-pump-system.png"],
    features: [
      "Zero electricity cost - powered by solar energy",
      "Permanent magnet DC brushless motor (90%+ efficiency)",
      "Intelligent MPPT controller with dry-run protection",
      "Plug and play installation, no grid connection needed",
      "Wide voltage range: DC 24V - 380V",
      "Auto start/stop based on sunlight intensity",
      "Remote monitoring via mobile app (optional)",
      "Submersible and surface pump options available"
    ],
    specs: [
      { label: "Power Range", value: "0.15 - 7.5 kW" },
      { label: "Max. Flow Rate", value: "800 L/min (48 m3/h)" },
      { label: "Max. Head", value: "280 m" },
      { label: "Solar Panel", value: "Monocrystalline / Polycrystalline" },
      { label: "Controller", value: "MPPT with LCD display" },
    ],
    models: [
      { model: "ASP-150W", power: "0.15", flow: "18 L/min", head: "25 m", inlet: "G1.5", weight: "5.5" },
      { model: "ASP-400W", power: "0.40", flow: "40 L/min", head: "50 m", inlet: "G2", weight: "8.0" },
      { model: "ASP-750W", power: "0.75", flow: "80 L/min", head: "70 m", inlet: "G2", weight: "12.0" },
      { model: "ASP-1500W", power: "1.50", flow: "160 L/min", head: "100 m", inlet: "G2.5", weight: "18.0" },
      { model: "ASP-2200W", power: "2.20", flow: "250 L/min", head: "130 m", inlet: "G3", weight: "25.0" },
      { model: "ASP-4000W", power: "4.00", flow: "500 L/min", head: "180 m", inlet: "G4", weight: "45.0" },
      { model: "ASP-7500W", power: "7.50", flow: "800 L/min", head: "280 m", inlet: "G4", weight: "65.0" },
    ],
    performance: [
      { flow: 0, head: 280 }, { flow: 50, head: 260 },
      { flow: 100, head: 220 }, { flow: 200, head: 170 },
      { flow: 400, head: 110 }, { flow: 600, head: 60 },
      { flow: 800, head: 20 },
    ],
  },
  {
    id: 4,
    name: "Deep Well Pump",
    slug: "deep-well-pump",
    subtitle: "High-Head Deep Well Solutions",
    desc: "Stainless steel submersible deep well pumps engineered for reliable water extraction from deep boreholes. Available in 3 to 10 inch diameters with extensive model range for domestic, agricultural and industrial water supply.",
    image: "/images/products/deep-well-pump.png",
    thumbs: ["/images/products/deep-well-pump.png"],
    features: [
      "304/316 stainless steel construction",
      "Floating impeller design for sand resistance",
      "NEMA standard submersible motors",
      "Head up to 600m, flow up to 50 m3/h",
      "Built-in check valve",
      "Suitable for 4 inch to 10 inch boreholes",
      "50Hz and 60Hz configurations"
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 37 kW" },
      { label: "Max. Flow Rate", value: "50 m3/h" },
      { label: "Max. Head", value: "600 m" },
      { label: "Pump Diameter", value: "3 inch / 4 inch / 6 inch / 8 inch / 10 inch" },
      { label: "Material", value: "SS304 / SS316" },
    ],
    models: [
      { model: "4SDM2/7", power: "0.37", flow: "2.0 m3/h", head: "42 m", inlet: "G1.25", weight: "8.5" },
      { model: "4SDM3/10", power: "0.55", flow: "3.0 m3/h", head: "60 m", inlet: "G1.25", weight: "10.0" },
      { model: "4SDM4/12", power: "0.75", flow: "4.0 m3/h", head: "80 m", inlet: "G1.5", weight: "12.0" },
      { model: "4SDM6/15", power: "1.5", flow: "6.0 m3/h", head: "110 m", inlet: "G1.5", weight: "16.0" },
      { model: "4SDM10/20", power: "3.0", flow: "10 m3/h", head: "160 m", inlet: "G2", weight: "25.0" },
    ],
    performance: [
      { flow: 0, head: 280 }, { flow: 5, head: 250 },
      { flow: 10, head: 220 }, { flow: 20, head: 160 },
      { flow: 30, head: 100 }, { flow: 40, head: 50 },
      { flow: 50, head: 15 },
    ],
  },
  {
    id: 5,
    name: "Self-Priming Jet Pump",
    slug: "self-priming-jet-pump",
    subtitle: "Deep Suction and High Pressure",
    desc: "Self-priming jet pumps with excellent suction lift performance. Suitable for shallow and deep wells, pressure boosting and water distribution. Robust cast iron construction with built-in ejector for reliable operation.",
    image: "/images/products/self-priming-jet-pump.png",
    thumbs: ["/images/products/self-priming-jet-pump.png"],
    features: [
      "Superior self-priming up to 45m depth (with ejector)",
      "Shallow well self-priming up to 9m",
      "Built-in or external ejector options",
      "Pressure tank compatible for automatic operation",
      "High pressure for multi-story buildings",
      "Cast iron body with stainless steel shaft",
      "Brass impeller and venturi",
      "Thermal overload protection"
    ],
    specs: [
      { label: "Power Range", value: "0.55 - 2.2 kW (0.75 - 3.0 HP)" },
      { label: "Max. Flow Rate", value: "100 L/min (6.0 m3/h)" },
      { label: "Max. Head", value: "85 m" },
      { label: "Max. Suction Depth", value: "9m (shallow) / 45m (deep well ejector)" },
      { label: "Liquid Temperature", value: "Up to +40 C" },
      { label: "Inlet/Outlet", value: "G1 to G2" },
      { label: "Protection Class", value: "IP44" },
      { label: "Tank Capacity", value: "24L / 50L (auto models)" },
    ],
    models: [
      { model: "AJET60", power: "0.55 / 0.75", flow: "40 L/min", head: "38 m", inlet: "1x1", weight: "9.0" },
      { model: "AJET80", power: "0.75 / 1.0", flow: "55 L/min", head: "45 m", inlet: "1x1", weight: "11.5" },
      { model: "AJET100", power: "1.0 / 1.5", flow: "65 L/min", head: "52 m", inlet: "1x1", weight: "14.0" },
      { model: "AJET150", power: "1.5 / 2.0", flow: "80 L/min", head: "68 m", inlet: "1.5x1", weight: "17.5" },
      { model: "AJET200", power: "2.0 / 2.5", flow: "95 L/min", head: "75 m", inlet: "2x2", weight: "21.0" },
      { model: "AJET220", power: "2.2 / 3.0", flow: "100 L/min", head: "85 m", inlet: "2x2", weight: "23.0" },
    ],
    performance: [
      { flow: 0, head: 85 }, { flow: 10, head: 82 },
      { flow: 20, head: 76 }, { flow: 30, head: 68 },
      { flow: 40, head: 58 }, { flow: 50, head: 46 },
      { flow: 60, head: 34 }, { flow: 70, head: 22 },
      { flow: 80, head: 12 }, { flow: 90, head: 5 },
    ],
  },
  {
    id: 6,
    name: "Submersible Sewage Pump",
    slug: "submersible-sewage-pump",
    subtitle: "Heavy-Duty Wastewater Handling",
    desc: "Robust submersible pumps designed for sewage, wastewater and drainage applications. Features large solids passage, cutting mechanisms and corrosion-resistant construction for reliable operation in harsh environments.",
    image: "/images/products/submersible-sewage-pump.png",
    thumbs: ["/images/products/submersible-sewage-pump.png"],
    features: [
      "Solids passage up to 50mm diameter",
      "Optional cutting/grinding mechanism",
      "Cast iron / Stainless steel construction",
      "Double mechanical seal with oil chamber",
      "Automatic float switch control",
      "Submersible up to 10m depth",
      "Non-clog single/two-channel impeller",
      "Explosion-proof motor option available"
    ],
    specs: [
      { label: "Power Range", value: "0.25 - 15 kW (0.33 - 20 HP)" },
      { label: "Max. Flow Rate", value: "800 L/min (48 m3/h)" },
      { label: "Max. Head", value: "35 m" },
      { label: "Max. Solids Passage", value: "50 mm" },
      { label: "Max. Submersion", value: "10 m" },
      { label: "Outlet Size", value: "G1.5 to G4" },
      { label: "Protection Class", value: "IP68" },
      { label: "Insulation", value: "Class F" },
    ],
    models: [
      { model: "ASW250", power: "0.25 / 0.33", flow: "80 L/min", head: "8 m", inlet: "1.5", weight: "6.0" },
      { model: "ASW370", power: "0.37 / 0.5", flow: "120 L/min", head: "10 m", inlet: "2", weight: "8.0" },
      { model: "ASW550", power: "0.55 / 0.75", flow: "180 L/min", head: "12 m", inlet: "2", weight: "11.0" },
      { model: "ASW750", power: "0.75 / 1.0", flow: "250 L/min", head: "16 m", inlet: "2", weight: "14.5" },
      { model: "ASW1100", power: "1.1 / 1.5", flow: "350 L/min", head: "20 m", inlet: "3", weight: "22.0" },
      { model: "ASW1500", power: "1.5 / 2.0", flow: "450 L/min", head: "25 m", inlet: "3", weight: "28.0" },
      { model: "ASW2200C", power: "2.2 / 3.0", flow: "580 L/min", head: "30 m", inlet: "4", weight: "38.0" },
      { model: "ASW3000C", power: "3.0 / 4.0", flow: "800 L/min", head: "35 m", inlet: "4", weight: "48.0" },
    ],
    performance: [
      { flow: 0, head: 35 }, { flow: 50, head: 34 },
      { flow: 100, head: 32 }, { flow: 200, head: 28 },
      { flow: 300, head: 23 }, { flow: 400, head: 18 },
      { flow: 600, head: 10 }, { flow: 800, head: 3 },
    ],
  },
  {
    id: 7,
    name: "Variable Frequency Pump",
    slug: "variable-frequency-pump",
    subtitle: "Smart and Energy-Saving Control",
    desc: "Intelligent variable frequency drive (VFD) pump systems with permanent magnet motors. Automatically adjusts speed to maintain constant pressure while achieving up to 40 percent energy savings compared to traditional fixed-speed pumps.",
    image: "/images/products/variable-frequency-pump.png",
    thumbs: ["/images/products/variable-frequency-pump.png"],
    features: [
      "Permanent magnet synchronous motor (IE5 efficiency)",
      "Built-in VFD with PID pressure control",
      "Up to 40 percent energy savings vs fixed-speed pumps",
      "Constant pressure regulation with soft start/stop",
      "Automatic sleep/wake based on demand",
      "Dry-run, over-pressure, over-current protection",
      "LCD display with real-time monitoring",
      "Compact integrated design, easy installation"
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 7.5 kW" },
      { label: "Max. Flow Rate", value: "400 L/min (24 m3/h)" },
      { label: "Max. Head", value: "80 m" },
      { label: "Constant Pressure", value: "1.5 - 10 bar (adjustable)" },
      { label: "Speed Range", value: "1000 - 4200 RPM" },
      { label: "Motor Type", value: "Permanent Magnet Synchronous" },
      { label: "Protection", value: "IP55" },
      { label: "Display", value: "LCD with touch panel" },
    ],
    models: [
      { model: "AVFm40", power: "0.37 / 0.5", flow: "40 L/min", head: "35 m", inlet: "1x1", weight: "8.0" },
      { model: "AVFm75", power: "0.75 / 1.0", flow: "75 L/min", head: "45 m", inlet: "1.5x1.5", weight: "12.0" },
      { model: "AVFm110", power: "1.1 / 1.5", flow: "110 L/min", head: "55 m", inlet: "1.5x1.5", weight: "16.0" },
      { model: "AVFm150", power: "1.5 / 2.0", flow: "150 L/min", head: "62 m", inlet: "2x2", weight: "20.0" },
      { model: "AVFm220", power: "2.2 / 3.0", flow: "220 L/min", head: "68 m", inlet: "2x2", weight: "25.0" },
      { model: "AVFm400", power: "4.0 / 5.5", flow: "300 L/min", head: "75 m", inlet: "2x2", weight: "35.0" },
      { model: "AVFm550", power: "5.5 / 7.5", flow: "400 L/min", head: "80 m", inlet: "2.5x2.5", weight: "45.0" },
    ],
    performance: [
      { flow: 0, head: 80 }, { flow: 50, head: 78 },
      { flow: 100, head: 72 }, { flow: 150, head: 63 },
      { flow: 200, head: 52 }, { flow: 250, head: 38 },
      { flow: 300, head: 25 }, { flow: 350, head: 14 },
      { flow: 400, head: 5 },
    ],
  },
  {
    id: 8,
    name: "Multi-Stage Pump Sets",
    slug: "multi-stage-pump-sets",
    subtitle: "High-Pressure Multi-Stage Solution",
    desc: "Horizontal and vertical multi-stage centrifugal pump sets designed for high-pressure water supply in high-rise buildings, industrial processes, boiler feed and water treatment systems. Available in stainless steel and cast iron variants.",
    image: "/images/products/multi-stage-pump-sets.png",
    thumbs: ["/images/products/multi-stage-pump-sets.png"],
    features: [
      "Multiple impeller stages for high head output",
      "Stainless steel stamped/welded construction",
      "Lightweight compact design",
      "High efficiency with minimal noise",
      "Cartridge mechanical seal for easy maintenance",
      "Constant pressure with VFD option",
      "Horizontal and vertical installation",
      "Suitable for clean, non-corrosive liquids"
    ],
    specs: [
      { label: "Power Range", value: "0.37 - 15 kW (0.5 - 20 HP)" },
      { label: "Max. Flow Rate", value: "750 L/min (45 m3/h)" },
      { label: "Max. Head", value: "320 m" },
      { label: "Stages", value: "2 - 32 stages" },
      { label: "Liquid Temperature", value: "-15 C to +120 C" },
      { label: "Material", value: "SS304 / Cast Iron" },
      { label: "Protection Class", value: "IP55" },
      { label: "Mechanical Seal", value: "Cartridge type, SiC/SiC" },
    ],
    models: [
      { model: "AMS2-4", power: "0.37 / 0.5", flow: "40 L/min", head: "35 m", inlet: "1.25x1", weight: "8.5" },
      { model: "AMS2-6", power: "0.55 / 0.75", flow: "40 L/min", head: "54 m", inlet: "1.25x1", weight: "11.0" },
      { model: "AMS4-5", power: "0.75 / 1.0", flow: "80 L/min", head: "45 m", inlet: "1.5x1.5", weight: "14.0" },
      { model: "AMS8-8", power: "1.5 / 2.0", flow: "140 L/min", head: "72 m", inlet: "2x2", weight: "22.0" },
      { model: "AMS16-10", power: "3.0 / 4.0", flow: "280 L/min", head: "120 m", inlet: "2.5x2.5", weight: "38.0" },
      { model: "AMS32-14", power: "5.5 / 7.5", flow: "450 L/min", head: "185 m", inlet: "3x3", weight: "55.0" },
      { model: "AMS45-18", power: "11.0 / 15.0", flow: "650 L/min", head: "260 m", inlet: "4x4", weight: "85.0" },
      { model: "AMS64-22", power: "15.0 / 20.0", flow: "750 L/min", head: "320 m", inlet: "4x4", weight: "105.0" },
    ],
    performance: [
      { flow: 0, head: 320 }, { flow: 50, head: 310 },
      { flow: 100, head: 290 }, { flow: 200, head: 250 },
      { flow: 300, head: 200 }, { flow: 400, head: 150 },
      { flow: 500, head: 100 }, { flow: 600, head: 60 },
      { flow: 700, head: 25 }, { flow: 750, head: 5 },
    ],
  },
];

export const allAccessories: Accessory[] = [
  {
    slug: "control-box",
    nameKey: "accessory.controlBox",
    subtitleKey: "accessory.controlBoxSub",
    descKey: "accessory.controlBoxDesc",
    image: "/images/accessories/control-box.webp",
    features: [
      "acc.controlBox.f1", "acc.controlBox.f2",
      "acc.controlBox.f3", "acc.controlBox.f4",
    ],
  },
  {
    slug: "vfd-controller",
    nameKey: "accessory.vfd",
    subtitleKey: "accessory.vfdSub",
    descKey: "accessory.vfdDesc",
    image: "/images/accessories/vfd-controller.webp",
    features: [
      "acc.vfd.f1", "acc.vfd.f2",
      "acc.vfd.f3", "acc.vfd.f4",
    ],
  },
  {
    slug: "pressure-tank",
    nameKey: "accessory.pressureTank",
    subtitleKey: "accessory.pressureTankSub",
    descKey: "accessory.pressureTankDesc",
    image: "/images/accessories/pressure-tank.webp",
    features: [
      "acc.pressureTank.f1", "acc.pressureTank.f2",
      "acc.pressureTank.f3", "acc.pressureTank.f4",
    ],
  },
];
'''

output_path = 'src/data/products.ts'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"products.ts written successfully to {output_path}")
print(f"File size: {len(content)} bytes")
