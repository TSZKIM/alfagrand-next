#!/usr/bin/env python3
"""Generate the seriesDataMap entries for the series detail page using real data from products.ts."""
import sys

# The generated series entries
# Each entry maps "category-slug/series-slug" to its real model data

SERIES_ENTRIES = r'''
  /* ─── PERIPHERAL PUMP — WZB SERIES (seakoo catalog) ─── */
  "peripheral-pump/wzb-series": {
    title: "WZB SERIES",
    subtitle: "seakoo Automatic Self-Priming Peripheral Pumps",
    desc: "The WZB Series from seakoo delivers 35-65m head pressure across three models with automatic self-priming capability up to 8m. Featuring cast iron construction, brass impellers, and integrated pressure control, these pumps are ideal for automatic domestic water supply systems.",
    heroCheckmarks: ["35-65m Head Range", "2.0-3.5 m\xb3/h Flow", "Self-Priming 8m", "Automatic Control"],
    modelImages: [
      { src: "/images/products/peripheral-pump.png", label: "1WZB-35" },
      { src: "/images/products/peripheral-pump.png", label: "1WZB-45" },
      { src: "/images/products/peripheral-pump.png", label: "1WZB-65" },
    ],
    stats: [{ icon: Layers, label: "Models", value: "3" }, { icon: Gauge, label: "Head Range", value: "35-65m" }, { icon: Droplets, label: "Flow Range", value: "2.0-3.5 m\xb3/h" }, { icon: Zap, label: "Power", value: "0.37-0.75kW" }],
    overviewTitle: "WZB Series Overview",
    overviewDesc: "The WZB Series from seakoo includes three models (1WZB-35, 1WZB-45, 1WZB-65) covering 35 to 65 meters of head with flow rates from 2.0 to 3.5 m\xb3/h. All models feature cast iron pump bodies with brass impellers, carbon-ceramic mechanical seals, and built-in automatic pressure control for on-demand water supply. Ideal for domestic water systems requiring automatic pump start/stop based on tap operation.",
    overviewImage: "/images/products/peripheral-pump.png",
    phaseOptions: [{ label: "Single Phase", desc: "220V / 50Hz \xb7 All WZB models \xb7 Standard residential" }],
    tableCols: [
      { key: "model", label: "Model" }, { key: "powerHP", label: "Power (HP)" }, { key: "powerKW", label: "Power (kW)" },
      { key: "maxHead", label: "Max. Head (m)" }, { key: "maxFlow", label: "Max. Flow (m\xb3/h)" },
      { key: "suctionHead", label: "Suction (m)" }, { key: "inletOutlet", label: "Inlet/Outlet" }, { key: "weight", label: "G.W (kg)" },
    ],
    models: [
      { model: "1WZB-35", powerHP: "0.5", powerKW: "0.37", maxHead: "35", maxFlow: "2.0", suctionHead: "8", inletOutlet: '1" x 1"', weight: "9.0" },
      { model: "1WZB-45", powerHP: "0.75", powerKW: "0.55", maxHead: "45", maxFlow: "2.5", suctionHead: "8", inletOutlet: '1" x 1"', weight: "11.5" },
      { model: "1WZB-65", powerHP: "1", powerKW: "0.75", maxHead: "65", maxFlow: "3.5", suctionHead: "8", inletOutlet: '1" x 1"', weight: "14.0" },
    ],
    performanceCurves: [
      { model: "1WZB-65", color: "#00D4AA", data: [{ flow: 0, head: 65 }, { flow: 0.5, head: 63 }, { flow: 1.0, head: 59 }, { flow: 1.5, head: 53 }, { flow: 2.0, head: 45 }, { flow: 2.5, head: 34 }, { flow: 3.0, head: 20 }, { flow: 3.5, head: 5 }] },
      { model: "1WZB-45", color: "#4ECDC4", data: [{ flow: 0, head: 45 }, { flow: 0.5, head: 43 }, { flow: 1.0, head: 40 }, { flow: 1.5, head: 34 }, { flow: 2.0, head: 25 }, { flow: 2.5, head: 10 }] },
      { model: "1WZB-35", color: "#FFD93D", data: [{ flow: 0, head: 35 }, { flow: 0.5, head: 33 }, { flow: 1.0, head: 29 }, { flow: 1.5, head: 22 }, { flow: 2.0, head: 10 }] },
    ],
    features: [
      { icon: Gauge, title: "35-65m Head\nCoverage", desc: "Three models covering domestic to commercial head pressure requirements for automatic water supply systems." },
      { icon: Shield, title: "Automatic\nControl", desc: "Built-in pressure switch provides automatic start/stop when tap is opened or closed. No external controller needed." },
      { icon: Sun, title: "Cast Iron\nDurability", desc: "Heavy-duty cast iron pump body with brass impeller and anti-corrosion coating for outdoor installations." },
      { icon: Clock, title: "Integrated\nProtection", desc: "Thermal overload protector and built-in check valve ensure reliable unattended operation." },
    ],
    applications: [
      { icon: Home, label: "Automatic\nHome Supply", desc: "On-demand water pressure for homes with automatic start/stop based on water usage." },
      { icon: Trees, label: "Garden\nIrrigation", desc: "Automatic sprinkler and drip irrigation control without manual pump operation." },
      { icon: Building2, label: "Small\nCommercial", desc: "Reliable water pressure for small offices, shops, and commercial units." },
      { icon: Droplets, label: "Tank\nSupply", desc: "Automatic water transfer from storage tanks to distribution points with pressure control." },
    ],
    faqs: [
      { q: "How does the automatic control work?", a: "The built-in pressure switch detects when a tap is opened (pressure drops) and automatically starts the pump. When all taps are closed (pressure rises), it automatically stops. No manual switch operation needed." },
      { q: "What size pressure tank do I need?", a: "A small 2-8L pressure tank is recommended to prevent rapid cycling. The WZB\'s built-in control handles the automatic operation." },
    ],
    ctaTitle: "NEED THE WZB AUTOMATIC PUMP FOR YOUR HOME?",
    ctaDesc: "Our team can help you select the right WZB model for your automatic water supply system. Contact us for pricing and availability.",
  },

  /* ─── PERIPHERAL PUMP — AWZB SERIES (seakoo catalog) ─── */
  "peripheral-pump/awzb-series": {
    title: "AWZB SERIES",
    subtitle: "seakoo Advanced Automatic Peripheral Pumps",
    desc: "The AWZB Series from seakoo features six models from 0.125kW to 1.1kW with 24-50m head and self-priming up to 9m. The widest flow range in the peripheral pump category (1.8-4.5 m\xb3/h) makes this series versatile for diverse applications.",
    heroCheckmarks: ["24-50m Head Range", "1.8-4.5 m\xb3/h Flow", "Self-Priming 9m", "6 Power Tiers"],
    modelImages: [
      { src: "/images/products/peripheral-pump.png", label: "1AWZB125" }, { src: "/images/products/peripheral-pump.png", label: "1AWZB370" },
      { src: "/images/products/peripheral-pump.png", label: "1AWZB750" }, { src: "/images/products/peripheral-pump.png", label: "1.5AWZB1100" },
    ],
    stats: [{ icon: Layers, label: "Models", value: "6" }, { icon: Gauge, label: "Head Range", value: "24-50m" }, { icon: Droplets, label: "Flow Range", value: "1.8-4.5 m\xb3/h" }, { icon: Zap, label: "Power", value: "0.125-1.1kW" }],
    overviewTitle: "AWZB Series Overview",
    overviewDesc: "The AWZB Series from seakoo is the most comprehensive peripheral pump line with six power tiers from 0.125kW to 1.1kW. Covering 24 to 50 meters head and 1.8 to 4.5 m\xb3/h flow, the AWZB is ideal for diverse applications from basic domestic use to light industrial. Self-priming up to 9 meters with automatic operation capability.",
    overviewImage: "/images/products/peripheral-pump.png",
    phaseOptions: [{ label: "Single Phase", desc: "220V / 50Hz \xb7 All AWZB models \xb7 Automatic control" }],
    tableCols: [
      { key: "model", label: "Model" }, { key: "powerHP", label: "Power (HP)" }, { key: "powerKW", label: "Power (kW)" },
      { key: "maxHead", label: "Max. Head (m)" }, { key: "maxFlow", label: "Max. Flow (m\xb3/h)" },
      { key: "suctionHead", label: "Suction (m)" }, { key: "inletOutlet", label: "Inlet/Outlet" }, { key: "weight", label: "G.W (kg)" },
    ],
    models: [
      { model: "1AWZB125", powerHP: "0.17", powerKW: "0.125", maxHead: "24", maxFlow: "1.8", suctionHead: "9", inletOutlet: '1" x 1"', weight: "8.0" },
      { model: "1AWZB250", powerHP: "0.34", powerKW: "0.25", maxHead: "28", maxFlow: "2.0", suctionHead: "9", inletOutlet: '1" x 1"', weight: "10.0" },
      { model: "1AWZB370", powerHP: "0.5", powerKW: "0.37", maxHead: "32", maxFlow: "2.2", suctionHead: "9", inletOutlet: '1" x 1"', weight: "11.0" },
      { model: "1AWZB550", powerHP: "0.75", powerKW: "0.55", maxHead: "38", maxFlow: "2.8", suctionHead: "9", inletOutlet: '1" x 1"', weight: "13.0" },
      { model: "1AWZB750", powerHP: "1", powerKW: "0.75", maxHead: "44", maxFlow: "3.0", suctionHead: "9", inletOutlet: '1" x 1"', weight: "14.5" },
      { model: "1.5AWZB1100", powerHP: "1.5", powerKW: "1.1", maxHead: "50", maxFlow: "4.5", suctionHead: "9", inletOutlet: '1.5" x 1.5"', weight: "18.5" },
    ],
    performanceCurves: [
      { model: "1.5AWZB1100", color: "#00D4AA", data: [{ flow: 0, head: 50 }, { flow: 0.8, head: 48 }, { flow: 1.6, head: 44 }, { flow: 2.4, head: 37 }, { flow: 3.2, head: 28 }, { flow: 4.0, head: 15 }, { flow: 4.5, head: 5 }] },
      { model: "1AWZB750", color: "#4ECDC4", data: [{ flow: 0, head: 44 }, { flow: 0.6, head: 42 }, { flow: 1.2, head: 38 }, { flow: 1.8, head: 32 }, { flow: 2.4, head: 22 }, { flow: 3.0, head: 8 }] },
      { model: "1AWZB370", color: "#FFD93D", data: [{ flow: 0, head: 32 }, { flow: 0.4, head: 31 }, { flow: 0.8, head: 28 }, { flow: 1.2, head: 24 }, { flow: 1.6, head: 17 }, { flow: 2.2, head: 5 }] },
    ],
    features: [
      { icon: Gauge, title: "6 Power\nTiers", desc: "From 0.125kW to 1.1kW, the widest power range in peripheral pumps for precise application matching." },
      { icon: Shield, title: "9m Self-Priming\nCapability", desc: "Highest suction lift in the peripheral pump range, ideal for deep tank and well installations." },
      { icon: Sun, title: "Automatic\nOperation", desc: "AWZB models include built-in electronic control for automatic on-demand water supply." },
      { icon: Clock, title: "Wide Flow\nRange", desc: "1.8-4.5 m\xb3/h flow covers everything from single taps to multi-outlet household systems." },
    ],
    applications: [
      { icon: Home, label: "Domestic\nWater Supply", desc: "Versatile household water pressurization from small apartments to large family homes." },
      { icon: Trees, label: "Garden\nIrrigation", desc: "Multiple sprinkler zones and drip irrigation for residential and light commercial landscaping." },
      { icon: Factory, label: "Light\nIndustrial", desc: "Clean water transfer and pressure boosting for workshops and small manufacturing." },
      { icon: Building2, label: "Multi-Story\nBuildings", desc: "Adequate pressure for 2-4 story buildings with the higher power tier models." },
    ],
    faqs: [
      { q: "Which AWZB model is right for my home?", a: "1AWZB125-250: Small apartments and basic use. 1AWZB370-550: Standard family homes with 2-3 taps. 1AWZB750-1100: Large homes with multiple bathrooms and garden irrigation." },
      { q: "Can AWZB pumps be installed outdoors?", a: "Yes, all AWZB models have IP44 protection and anti-corrosion coating suitable for covered outdoor installation. Protect from direct rain and freezing." },
    ],
    ctaTitle: "NEED THE RIGHT AWZB PUMP FOR YOUR APPLICATION?",
    ctaDesc: "Our team can help you select the optimal AWZB model for your specific water demands. Contact us for pricing and availability.",
  },

  /* ─── PERIPHERAL PUMP — MKP SERIES (DAGER catalog) ─── */
  "peripheral-pump/mkp-series": {
    title: "MKP SERIES",
    subtitle: "DAGER Peripheral Pumps — MKP Range",
    desc: "The MKP Series from DAGER delivers 36-60m head pressure across three models (MKP60-1, MKP70-1, MKP80-1). All feature cast iron construction, brass impellers, and self-priming capability up to 9m for reliable domestic and light agricultural water supply.",
    heroCheckmarks: ["36-60m Head Range", "1.56-3.6 m\xb3/h Flow", "Self-Priming 9m", "Cast Iron + Brass"],
    modelImages: [
      { src: "/images/products/peripheral-pump.png", label: "MKP60-1" }, { src: "/images/products/peripheral-pump.png", label: "MKP70-1" },
      { src: "/images/products/peripheral-pump.png", label: "MKP80-1" },
    ],
    stats: [{ icon: Layers, label: "Models", value: "3" }, { icon: Gauge, label: "Head Range", value: "36-60m" }, { icon: Droplets, label: "Flow Range", value: "1.56-3.6 m\xb3/h" }, { icon: Zap, label: "Power", value: "0.37-0.75kW" }],
    overviewTitle: "MKP Series Overview",
    overviewDesc: "The MKP Series from DAGER consists of three models covering 36 to 60 meters of head pressure with flow rates from 1.56 to 3.6 m\xb3/h. All models feature DAGER\'s proven cast iron construction with brass impellers, carbon-ceramic mechanical seals, and 9m self-priming capability. Lightweight design compared to other peripheral pump series makes installation easier while maintaining robust performance.",
    overviewImage: "/images/products/peripheral-pump.png",
    phaseOptions: [{ label: "Single Phase", desc: "220V / 50Hz \xb7 All MKP models \xb7 Standard residential" }],
    tableCols: [
      { key: "model", label: "Model" }, { key: "powerHP", label: "Power (HP)" }, { key: "powerKW", label: "Power (kW)" },
      { key: "maxHead", label: "Max. Head (m)" }, { key: "maxFlow", label: "Max. Flow (m\xb3/h)" },
      { key: "suctionHead", label: "Suction (m)" }, { key: "inletOutlet", label: "Inlet/Outlet" }, { key: "weight", label: "G.W (kg)" },
    ],
    models: [
      { model: "MKP60-1", powerHP: "0.5", powerKW: "0.37", maxHead: "36", maxFlow: "1.56", suctionHead: "9", inletOutlet: '1" x 1"', weight: "5.5" },
      { model: "MKP70-1", powerHP: "0.75", powerKW: "0.55", maxHead: "50", maxFlow: "3.0", suctionHead: "9", inletOutlet: '1" x 1"', weight: "8.8" },
      { model: "MKP80-1", powerHP: "1", powerKW: "0.75", maxHead: "60", maxFlow: "3.6", suctionHead: "9", inletOutlet: '1" x 1"', weight: "10.0" },
    ],
    performanceCurves: [
      { model: "MKP80-1", color: "#00D4AA", data: [{ flow: 0, head: 60 }, { flow: 0.6, head: 58 }, { flow: 1.2, head: 54 }, { flow: 1.8, head: 47 }, { flow: 2.4, head: 37 }, { flow: 3.0, head: 22 }, { flow: 3.6, head: 5 }] },
      { model: "MKP70-1", color: "#4ECDC4", data: [{ flow: 0, head: 50 }, { flow: 0.5, head: 48 }, { flow: 1.0, head: 45 }, { flow: 1.5, head: 39 }, { flow: 2.0, head: 30 }, { flow: 2.5, head: 18 }, { flow: 3.0, head: 5 }] },
      { model: "MKP60-1", color: "#FFD93D", data: [{ flow: 0, head: 36 }, { flow: 0.3, head: 35 }, { flow: 0.6, head: 32 }, { flow: 0.9, head: 27 }, { flow: 1.2, head: 20 }, { flow: 1.56, head: 8 }] },
    ],
    features: [
      { icon: Gauge, title: "36-60m Head\nPerformance", desc: "Three power tiers from 0.5HP to 1HP covering domestic to light commercial head requirements." },
      { icon: Shield, title: "Lightweight\nDesign", desc: "MKP60-1 at just 5.5kg is the lightest peripheral pump with 36m head performance." },
      { icon: Droplets, title: "9m Self-Priming\nCapability", desc: "Excellent suction lift for above-ground installations at wells and underground tanks." },
      { icon: Sun, title: "DAGER\nReliability", desc: "Built to DAGER\'s quality standards with proven cast iron and brass construction." },
    ],
    applications: [
      { icon: Home, label: "Domestic\nWater Supply", desc: "Compact and lightweight for easy household installation. Ideal for single-family homes." },
      { icon: Trees, label: "Small Farm\nIrrigation", desc: "Reliable water pressure for small-scale agricultural irrigation and livestock watering." },
      { icon: Building2, label: "Pressure\nBoosting", desc: "Boost municipal water pressure where mains supply is inadequate for upper floors." },
      { icon: Droplets, label: "Tank\nTransfer", desc: "Efficient water transfer from underground storage tanks to elevated tanks." },
    ],
    faqs: [
      { q: "How does MKP compare to PM series?", a: "Both are DAGER peripheral pumps. MKP offers variable head (36-60m) across power tiers while PM offers constant 36m head. Choose MKP for higher pressure requirements, PM for simpler constant-pressure applications." },
      { q: "Can I use MKP for a two-story home?", a: "Yes. MKP70-1 (50m head) and MKP80-1 (60m head) provide sufficient pressure for 2-4 story buildings including friction losses." },
    ],
    ctaTitle: "NEED THE RIGHT DAGER MKP PUMP?",
    ctaDesc: "Our team can help you select the optimal DAGER MKP peripheral pump for your water system. Contact us for pricing and availability.",
  },
'''

# Now the centrifugal pump entries
CENTRIFUGAL_ENTRIES = r'''
  /* ─── CENTRIFUGAL PUMP — CP(m) SERIES (seakoo catalog) ─── */
  "centrifugal-pump/cpm-series": {
    title: "CP(m) SERIES",
    subtitle: "seakoo Single-Stage Centrifugal Pumps",
    desc: "The CP(m) Series from seakoo delivers 22-52m head and 5.5-8.0 m\xb3/h flow across six power tiers. All models feature cast iron construction, brass/nylon impellers, and IP44 protection with Class B insulation. The go-to centrifugal pump for irrigation, water supply, and industrial transfer.",
    heroCheckmarks: ["22-52m Head", "5.5-8.0 m\xb3/h Flow", "IP44 Protection", "6 Power Tiers"],
    modelImages: [
      { src: "/images/products/centrifugal-pump.png", label: "CP(m)130" }, { src: "/images/products/centrifugal-pump.png", label: "CP(m)158" },
      { src: "/images/products/centrifugal-pump.png", label: "CP(m)190" }, { src: "/images/products/centrifugal-pump.png", label: "CP(m)200" },
    ],
    stats: [{ icon: Layers, label: "Models", value: "6" }, { icon: Gauge, label: "Max Head", value: "52m" }, { icon: Droplets, label: "Max Flow", value: "8.0 m\xb3/h" }, { icon: Zap, label: "Power", value: "0.37-2.2kW" }],
    overviewTitle: "CP(m) Series Overview",
    overviewDesc: "The CP(m) Series from seakoo is the main centrifugal pump line with six models from 0.5HP to 3HP. Head ranges from 22 to 52 meters with flow rates from 5.5 to 8.0 m\xb3/h. All models feature cast iron construction, mechanical seals, and thermal overload protection. Suction lift up to 7 meters makes them suitable for flood irrigation, commercial water supply, and industrial transfer applications.",
    overviewImage: "/images/products/centrifugal-pump.png",
    phaseOptions: [
      { label: "Single Phase", desc: "220V / 50Hz \xb7 CP(m)130 / CP(m)146 / CP(m)158 \xb7 Residential & small farm" },
      { label: "Three Phase", desc: "380V / 50Hz \xb7 CP(m)170 / CP(m)190 / CP(m)200 \xb7 Industrial & continuous duty" },
    ],
    tableCols: [
      { key: "model", label: "Model" }, { key: "powerHP", label: "Power (HP)" }, { key: "powerKW", label: "Power (kW)" },
      { key: "maxHead", label: "Max. Head (m)" }, { key: "maxFlow", label: "Max. Flow (m\xb3/h)" },
      { key: "suctionHead", label: "Suction (m)" }, { key: "inletOutlet", label: "Inlet/Outlet" }, { key: "weight", label: "G.W (kg)" },
    ],
    models: [
      { model: "CP(m)130", powerHP: "0.5", powerKW: "0.37", maxHead: "22", maxFlow: "5.5", suctionHead: "7", inletOutlet: '1" x 1"', weight: "9.5" },
      { model: "CP(m)146", powerHP: "0.75", powerKW: "0.55", maxHead: "26", maxFlow: "6.2", suctionHead: "7", inletOutlet: '1" x 1"', weight: "12.5" },
      { model: "CP(m)158", powerHP: "1", powerKW: "0.75", maxHead: "32", maxFlow: "6.5", suctionHead: "7", inletOutlet: '1" x 1"', weight: "13.5" },
      { model: "CP(m)170", powerHP: "1.5", powerKW: "1.1", maxHead: "44", maxFlow: "7.2", suctionHead: "7", inletOutlet: '1" x 1"', weight: "21.0" },
      { model: "CP(m)190", powerHP: "2.2", powerKW: "1.6", maxHead: "52", maxFlow: "7.2", suctionHead: "7", inletOutlet: '1" x 1"', weight: "25.0" },
      { model: "CP(m)200", powerHP: "3", powerKW: "2.2", maxHead: "45", maxFlow: "8.0", suctionHead: "7", inletOutlet: '1" x 1"', weight: "33.0" },
    ],
    performanceCurves: [
      { model: "CP(m)190", color: "#00D4AA", data: [{ flow: 0, head: 52 }, { flow: 1, head: 50 }, { flow: 2, head: 48 }, { flow: 3, head: 45 }, { flow: 4, head: 40 }, { flow: 5, head: 33 }, { flow: 6, head: 24 }, { flow: 7, head: 12 }, { flow: 7.2, head: 8 }] },
      { model: "CP(m)158", color: "#4ECDC4", data: [{ flow: 0, head: 32 }, { flow: 1, head: 31 }, { flow: 2, head: 29 }, { flow: 3, head: 26 }, { flow: 4, head: 22 }, { flow: 5, head: 16 }, { flow: 6, head: 8 }, { flow: 6.5, head: 3 }] },
      { model: "CP(m)130", color: "#FFD93D", data: [{ flow: 0, head: 22 }, { flow: 1, head: 21 }, { flow: 2, head: 19 }, { flow: 3, head: 16 }, { flow: 4, head: 12 }, { flow: 5, head: 6 }, { flow: 5.5, head: 3 }] },
    ],
    features: [
      { icon: BarChart3, title: "High Hydraulic\nEfficiency", desc: "Precision-balanced closed impeller design for efficient water transfer across 22-52m head range." },
      { icon: Shield, title: "6 Power\nTiers", desc: "From 0.5HP to 3HP covering domestic garden irrigation to industrial water transfer applications." },
      { icon: Wrench, title: "Cast Iron\nConstruction", desc: "Robust cast iron pump body with brass or nylon impeller options for different water conditions." },
      { icon: Sun, title: "Thermal\nProtection", desc: "IP44 protection, Class B insulation, and built-in thermal overload for reliable unattended operation." },
    ],
    applications: [
      { icon: Trees, label: "Agricultural\nIrrigation", desc: "High-volume water delivery for crop irrigation, nurseries, and large-scale landscaping." },
      { icon: Factory, label: "Industrial\nTransfer", desc: "Water transfer for manufacturing, cooling systems, and process applications." },
      { icon: Building2, label: "Commercial\nSupply", desc: "Reliable water supply for commercial buildings, hotels, and office complexes." },
      { icon: Home, label: "Domestic\nSystem", desc: "Whole-house water supply and pressure boosting for residential properties." },
    ],
    faqs: [
      { q: "Which CP(m) model for garden irrigation?", a: "CP(m)130 (0.5HP): Small to medium gardens. CP(m)146-158 (0.75-1HP): Medium to large gardens. CP(m)170+ (1.5HP+): Commercial nurseries requiring higher flow at greater head." },
      { q: "Single-phase or three-phase?", a: "Single-phase (220V) for residential and small farm use up to 1.5HP. Three-phase (380V) for 2HP+ models in industrial settings. Three-phase motors are more efficient and have higher starting torque." },
    ],
    ctaTitle: "NEED HELP SELECTING THE RIGHT CP(m) CENTRIFUGAL PUMP?",
    ctaDesc: "Our team can help you select the optimal seakoo CP(m) model for your flow and head requirements. Contact us for pricing and availability.",
  },
'''

print("=== Generated entries for series detail page ===")
print("This script provides the data for targeted Edit calls.")
print("Total characters:", len(SERIES_ENTRIES) + len(CENTRIFUGAL_ENTRIES))
