import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { products, type Product } from "@/data/products";
import Link from "next/link";
import {
 Package,
 Layers,
 Zap,
 Shield,
 CheckCircle,
 MessageCircle,
 HeadphonesIcon,
 ArrowRight,
 ChevronDown,
 Home,
 Droplets,
 Trees,
 Building2,
 Factory,
 Gauge,
 Thermometer,
 Wrench,
 BarChart3,
 Cpu,
 Timer,
 Star,
 Target,
 Lightbulb,
} from "lucide-react";
import { locales, defaultLocale } from "../../config";

type Props = { params: Promise<{ locale: string; slug: string }> };

/* ─── Category-specific data ─── */
interface SeriesModel {
 name: string;
 slug: string | null; // null = no detail page yet → "Coming Soon"
 models: string;
 specLine1: string;
 specLine2: string;
 specLine3: string;
 image: string;
}

interface CategoryFAQ {
 q: string;
 a: string;
}

interface CategoryData {
 heroTitle: string;
 heroSubtitle: string;
 heroDesc: string;
 heroImage: string;
 stats: { icon: React.ComponentType<any>; label: string; value: string }[];
 whatIs: string;
 whatIsDesc: string;
 whatIsCutaway: string;
 whatIsCutawayAlt: string;
  applications: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  applicationsImage?: string; // optional: single image replacing the 4 icon cards
  features: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; image: string }[];
 series: SeriesModel[];
 faqs: CategoryFAQ[];
 ctaTitle: string;
 ctaDesc: string;
}

const categoryDataMap: Record<string, CategoryData> = {
 /* ─── PERIPHERAL PUMP (peripheral-pump) ─── */
 "peripheral-pump": {
  heroTitle: "PERIPHERAL PUMP SERIES",
  heroSubtitle: "High-Pressure Water Transfer Solutions",
  heroDesc: "ALFAGRAND peripheral pumps deliver exceptional water pressure for domestic, agricultural, and light commercial applications. Engineered with precision impellers and robust cast iron construction for reliable long-term performance.",
  heroImage: "/images/products/peripheral-pump-hero-bg.png",
  stats: [
   { icon: Package, label: "Product Series", value: "9" },
   { icon: Layers, label: "Models Available", value: "40" },
   { icon: Gauge, label: "Max. Head", value: "Up to 65m" },
   { icon: Shield, label: "Power Range", value: "0.125-1.5kW" },
  ],
  whatIs: "What is a Peripheral Pump?",
  whatIsDesc: "A peripheral pump is a centrifugal pump variant designed for high-pressure, low-flow applications. Unlike standard centrifugal pumps, peripheral pumps use a star-shaped impeller that rotates in a concentric casing channel. This unique design creates multiple stages of pressurization within a single impeller revolution, delivering superior head pressure from a compact footprint. They excel in clean water transfer, pressure boosting, and irrigation systems where space is limited but performance cannot be compromised.",
  whatIsCutaway: "/images/products/what.png",
  whatIsCutawayAlt: "Peripheral pump cutaway diagram",
  applications: [
   { icon: Home, label: "Residential\nWater Supply" },
   { icon: Gauge, label: "Pressure\nBoosting" },
   { icon: Trees, label: "Garden\nIrrigation" },
   { icon: Building2, label: "Light Commercial\nUse" },
  ],
  applicationsImage: "/images/products/applications.png",
  features: [
   { icon: Gauge, title: "High Pressure\nPerformance", desc: "Brass impeller with peripheral channel structure provides stable high pressure", image: "/images/products/brass-impeller.png" },
   { icon: Lightbulb, title: "Energy Efficient\nMotor", desc: "100% copper winding motor with high-efficiency design reduces electricity consumption by up to 15%.", image: "/images/products/motor.png" },
   { icon: Shield, title: "Compact &\nDurable", desc: "Cast iron pump body with anti-corrosion coating. Compact design fits in tight installation spaces.", image: "/images/products/cast-iron.png" },
   { icon: Wrench, title: "Mechanical\nSeal", desc: "Carbon-ceramic mechanical seal ensures leak-free operation and extended service intervals.", image: "/images/products/mechanical-seal.png" },
  ],
  series: [
   { name: "PM Series", slug: "pm-series", models: "PM16A / PM45 / PM70 / PM80", specLine1: "4 Models", specLine2: "Peripheral Pump", specLine3: "Head: 35–45m", image: "/images/products/PM.png" },
   { name: "PKM Series", slug: "pkm-series", models: "Pkm60 / Pkm70 / Pkm80", specLine1: "3 Models", specLine2: "Peripheral Pump", specLine3: "Head: 35–55m", image: "/images/products/pkm.png" },
   { name: "PS/GP Series", slug: "ps-series", models: "PS126 / PS130 / GP125 / GP200", specLine1: "4 Models", specLine2: "Self-Priming Peripheral", specLine3: "Head: 30–35m", image: "/images/products/PS-GP.png" },
   { name: "QB Series", slug: "qb-series", models: "QB50 / QB60 / QB70 / QB80", specLine1: "4 Models", specLine2: "Standard Peripheral Pump", specLine3: "Head: 23–52m", image: "/images/products/QB.png" },
   { name: "1WZB Series", slug: "1wzb-series", models: "1WZB-35 / 1WZB-45 / 1WZB-65", specLine1: "3 Models", specLine2: "Peripheral Pump w/ Handle", specLine3: "Head: 35–50m", image: "/images/products/1WZB.png" },
   { name: "AWZB Series", slug: "awzb-series", models: "AWZB200 – AWZB1500A", specLine1: "14 Models", specLine2: "Auto Self-Priming Peripheral", specLine3: "Head: 24–60m", image: "/images/products/AWZB.png" },
   { name: "PW Series", slug: "pw-series", models: "PW125 / PW250 / PW370 / PW550 / PW750", specLine1: "5 Models", specLine2: "Garden & Domestic Peripheral", specLine3: "Head: 24–50m", image: "/images/products/PW.png" },
   { name: "AUTOQB Series", slug: "autoqb-series", models: "AUTOQB60 / AUTOQB70 / AUTOQB80", specLine1: "3 Models", specLine2: "Auto Station Peripheral", specLine3: "Head: 36–60m", image: "/images/products/AUTOQB.png" },
  ],
  faqs: [
   { q: "What is a peripheral pump?", a: "A peripheral pump (also called a side-channel or turbine pump) is a centrifugal pump variant designed for high-pressure, low-flow applications. Unlike standard centrifugal pumps, it uses a star-shaped impeller rotating in a concentric channel to generate multiple pressure stages per single revolution. This allows it to achieve much higher pressures than similarly-sized centrifugal pumps, making it ideal for pressure boosting, domestic water supply, and garden irrigation where strong water pressure is needed from a compact pump." },
   { q: "What is the maximum suction height?", a: "ALFAGRAND peripheral pumps offer self-priming capability up to 8 meters. For optimal performance, we recommend installing the pump as close to the water source as possible. If the water source is deeper than 8 meters, we recommend using a deep well jet pump or submersible pump instead." },
   { q: "Can peripheral pumps be used for hot water?", a: "Standard peripheral pumps are designed for clean cold water up to 40°C. For hot water applications up to 90°C, we offer specialized hot water circulation pump models with high-temperature mechanical seals and thermal-resistant components. Please consult our engineering team for hot water applications." },
   { q: "What is the difference between peripheral and centrifugal pumps?", a: "The key difference: peripheral pumps generate higher pressure (up to 8-10 bar) with lower flow rates, making them ideal for pressure boosting and multi-story water supply. Centrifugal pumps produce higher flow rates at lower pressure, better suited for large-volume water transfer and irrigation. Peripheral pumps are also generally more compact and cost-effective for domestic applications. Choose based on your priority: high pressure → peripheral; high flow → centrifugal." },
  ],
  ctaTitle: "NEED HELP CHOOSING THE RIGHT PERIPHERAL PUMP?",
  ctaDesc: "Our engineering team can help you select the optimal peripheral pump for your water pressure requirements. Contact us for technical support, pricing, and OEM/ODM solutions.",
 },

 /* ─── CENTRIFUGAL PUMP ─── */
 "centrifugal-pump": {
  heroTitle: "CENTRIFUGAL PUMP SERIES",
  heroSubtitle: "High-Efficiency Water Transfer Solutions",
  heroDesc: "ALFAGRAND centrifugal pumps deliver superior hydraulic efficiency for large-volume water transfer across agricultural, industrial, and commercial applications. Precision-balanced impellers and corrosion-resistant construction ensure reliable performance.",
  heroImage: "/images/products/centrifugal-pump-hero-bg.png",
  stats: [
   { icon: Package, label: "Product Series", value: "8" },
   { icon: Layers, label: "Models Available", value: "34" },
   { icon: Gauge, label: "Max. Flow", value: "72 m³/h" },
   { icon: Shield, label: "Max. Head", value: "52m" },
  ],
  whatIs: "What is a Centrifugal Pump?",
  whatIsDesc: "A centrifugal pump is the most widely used pump type in the world, operating on the principle of centrifugal force. The rotating impeller accelerates fluid outward from the center of rotation, converting kinetic energy into pressure. ALFAGRAND centrifugal pumps feature dynamically balanced impellers, heavy-duty bearings, and premium mechanical seals. They are ideal for irrigation, water supply systems, circulation, and industrial liquid transfer applications where high flow rates are required.",
  whatIsCutaway: "/images/products/centrifugal-pump.png",
  whatIsCutawayAlt: "Centrifugal pump structure",
  applications: [
   { icon: Trees, label: "Agricultural\nIrrigation" },
   { icon: Factory, label: "Industrial\nTransfer" },
   { icon: Building2, label: "Commercial\nWater Supply" },
   { icon: Home, label: "Domestic\nSystem" },
  ],
  features: [
   { icon: BarChart3, title: "High Hydraulic\nEfficiency", desc: "Precision-balanced closed impeller design achieves over 85% hydraulic efficiency for energy savings.", image: "/images/products/centrifugal-pump.png" },
   { icon: Lightbulb, title: "Premium IE3\nMotor", desc: "100% copper winding IE3 efficiency class motor ensures low electricity consumption and cool operation.", image: "/images/products/centrifugal-pump.png" },
   { icon: Shield, title: "Corrosion\nResistant", desc: "Cast iron body with anti-corrosion epoxy coating or full 304 stainless steel construction available.", image: "/images/products/centrifugal-pump.png" },
   { icon: Wrench, title: "Easy\nMaintenance", desc: "Simple back pull-out design allows rotor removal without disconnecting pipework, reducing downtime.", image: "/images/products/centrifugal-pump.png" },
  ],
  series: [
   { name: "CPM Series", slug: "cpm-series", models: "CPM130 / CPM146 / CPM158 / CPM170 / CPM190 / CPM200", specLine1: "6 Models", specLine2: "Centrifugal Pump", specLine3: "", image: "/images/products/CPM.png" },
   { name: "DK Series", slug: "dk-series", models: "1DK-14 / 1DK-20 / 1.5DK-20 / 2DK-20", specLine1: "4 Models", specLine2: "Centrifugal Pump", specLine3: "", image: "/images/products/DK.png" },
   { name: "CP Series", slug: "cp-series", models: "CP130 / CP158 / CP200", specLine1: "3 Models", specLine2: "Centrifugal Pump", specLine3: "", image: "/images/products/CP.png" },
   { name: "HFM Series", slug: "hfm-series", models: "HFM-70 ~ HFM-105", specLine1: "8 Models", specLine2: "High-Flow Centrifugal", specLine3: "", image: "/images/products/HFM.png" },
   { name: "HCT Series", slug: "hct-series", models: "HCT-18 / HCT-20 / HCT-26 / HCT-30 / HCT-33", specLine1: "5 Models", specLine2: "Centrifugal Pump", specLine3: "", image: "/images/products/HCT.png" },
   { name: "SCM Series", slug: "scm-series", models: "SCM-30 / SCM-36", specLine1: "2 Models", specLine2: "Centrifugal Pump", specLine3: "", image: "/images/products/SCM.png" },
   { name: "HNF Series", slug: "hnf-series", models: "HNF-128A ~ HNF-131A", specLine1: "8 Models", specLine2: "Horizontal Centrifugal", specLine3: "", image: "/images/products/HNF.png" },
   { name: "2CP Series", slug: "2cp-series", models: "2CP-130 / 2CP-140 / 2CP-160 / 2CP-180 / 2CP-200", specLine1: "5 Models", specLine2: "Twin-Impeller Centrifugal", specLine3: "", image: "/images/products/2CP.png" },
  ],
  faqs: [
   { q: "How do I calculate the right pump size?", a: "Calculate your required flow rate (L/min) and total dynamic head (TDH) including vertical lift and friction losses. Then match these to the pump curve on our performance charts. As a rough guide: a typical family home needs 30-50 L/min at 25-35m head; agricultural irrigation may need 100-200 L/min at 40-60m head. Contact our engineers with your specific requirements for an accurate recommendation." },
   { q: "Can centrifugal pumps run dry?", a: "Standard centrifugal pumps should NOT run dry as the pumped liquid lubricates and cools the mechanical seal. Dry running can destroy the seal within seconds. If dry-running is a concern, we recommend models with dry-run protection sensors, or consider a submersible or self-priming pump that can better handle occasional air in the system." },
   { q: "What maintenance is required?", a: "Regular maintenance includes: checking seal leakage monthly, inspecting impeller clearance annually, lubricating bearings (greased models), and monitoring vibration levels. ALFAGRAND centrifugal pumps are designed for minimal maintenance with 10,000+ hour seal life under normal operating conditions." },
   { q: "Single-phase vs three-phase centrifugal pumps?", a: "Single-phase (220V) pumps are standard for residential and small commercial use. Three-phase (380V) motors are more efficient, have higher starting torque, and are recommended for industrial applications and pumps above 2 HP. ALFAGRAND offers both options across our centrifugal pump range." },
  ],
  ctaTitle: "NEED HELP CHOOSING THE RIGHT CENTRIFUGAL PUMP?",
  ctaDesc: "Our engineering team can help you select the optimal centrifugal pump for your flow rate requirements. Contact us for technical support, pricing, and OEM/ODM solutions.",
 },

 /* ─── SELF-PRIMING JET PUMP (self-priming-jet-pump) ─── */
 "self-priming-jet-pump": {
  heroTitle: "SELF-PRIMING JET PUMP SERIES",
  heroSubtitle: "Reliable Well & Tank Water Solutions",
  heroDesc: "ALFAGRAND self-priming jet pumps combine excellent suction capability with robust construction for household water systems, garden irrigation, and well water extraction. Engineered for easy operation and maintenance-free reliability.",
  heroImage: "/images/products/self-priming-jet-pump-hero-bg.png",
  stats: [
   { icon: Package, label: "Product Series", value: "8" },
   { icon: Layers, label: "Models Available", value: "29" },
   { icon: Gauge, label: "Max. Head", value: "80m" },
   { icon: Shield, label: "Max. Flow", value: "100 L/min" },
  ],
  whatIs: "What is a Self-Priming Jet Pump?",
  whatIsDesc: "A self-priming jet pump combines centrifugal pump mechanics with a built-in ejector (jet) assembly to create strong suction for lifting water from wells, tanks, or underground sources. Unlike standard pumps that require manual priming, self-priming jet pumps use a built-in ejector nozzle that creates a vacuum effect — allowing automatic repriming even after water interruption. JET and JSW series deliver 32-55m head with stainless steel or cast iron construction for household water supply systems, rainwater tanks, and garden irrigation.",
  whatIsCutaway: "/images/products/self-priming-jet-pump.png",
  whatIsCutawayAlt: "Self-priming jet pump diagram",
  applications: [
   { icon: Home, label: "Household\nWater System" },
   { icon: Droplets, label: "Well Water\nSupply" },
   { icon: Trees, label: "Garden\nIrrigation" },
   { icon: Building2, label: "Small Farm\nSupply" },
  ],
  features: [
   { icon: Droplets, title: "Superior\nSelf-Priming", desc: "Built-in ejector assembly achieves up to 8m self-priming height, automatically reprimes after water stoppage.", image: "/images/products/self-priming-jet-pump.png" },
   { icon: Shield, title: "Cast Iron +\nStainless Steel", desc: "JET series cast iron durability. JSW series full AISI 304 stainless steel for corrosion resistance.", image: "/images/products/self-priming-jet-pump.png" },
   { icon: Lightbulb, title: "Low Noise\nOperation", desc: "Optimized hydraulic design and vibration-dampening base reduce operating noise below 65 dB for residential use.", image: "/images/products/self-priming-jet-pump.png" },
   { icon: Thermometer, title: "Thermal Overload\nProtection", desc: "Built-in thermal protector automatically shuts off motor during overload conditions to prevent damage.", image: "/images/products/self-priming-jet-pump.png" },
  ],
  series: [
   { name: "JET-A Series", slug: "jeta-series", models: "JET-60A / JET-80A / JET-100A / JET-150A / JET-200A", specLine1: "5 Models", specLine2: "Classic Self-Priming Jet", specLine3: "", image: "/images/products/JET-A.png" },
   { name: "JET-B/C Series", slug: "jetbc-series", models: "JET-60B/C / JET-80B/C / JET-100B/C / JET-150B/C", specLine1: "4 Models", specLine2: "Standard Self-Priming Jet", specLine3: "", image: "/images/products/JET-B.png" },
   { name: "JSP Series", slug: "jsp-series", models: "JSP-60 / JSP-80 / JSP-100 / JSP-150 / JSP-200", specLine1: "5 Models", specLine2: "Heavy-Duty Cast Iron Jet", specLine3: "", image: "/images/products/JSP.png" },
   { name: "KJM Series", slug: "kjm-series", models: "KJM-10 / KJM-15", specLine1: "2 Models", specLine2: "Pedrollo Design Jet", specLine3: "", image: "/images/products/KJM.png" },
   { name: "JSW Series", slug: "jsw-series", models: "JSW-10M / JSW-15M", specLine1: "2 Models", specLine2: "Shallow Well Jet", specLine3: "", image: "/images/products/JSW.png" },
   { name: "SJET Series", slug: "sjet-series", models: "SJET-60 / SJET-80 / SJET-100", specLine1: "3 Models", specLine2: "Stainless Steel Jet", specLine3: "", image: "/images/products/SJET.png" },
   { name: "DP Series", slug: "dp-series", models: "DP-255 / DP-370 / DP-550 / DP-505 / DP-750", specLine1: "5 Models", specLine2: "Deep Well Self-Priming Jet", specLine3: "", image: "/images/products/DP.png" },
   { name: "AUTOJET Series", slug: "autojet-series", models: "AUTOJET-60B/C / AUTOJET-80B/C / AUTOJET-100B/C", specLine1: "3 Models", specLine2: "Auto Station Self-Priming Jet", specLine3: "", image: "/images/products/AUTOJET.png" },
  ],
  faqs: [
   { q: "What is the difference between a jet pump and a self-priming pump?", a: "A self-priming jet pump is a type of jet pump that includes a built-in ejector (jet) mechanism for automatic priming. While all jet pumps use an ejector for suction, 'self-priming' specifically means the pump can automatically clear air from the suction line and resume pumping without manual intervention." },
   { q: "How deep can a self-priming jet pump draw water from?", a: "For shallow well applications, standard self-priming jet pumps can lift water from depths up to 8 meters. For deep well applications (up to 45 meters), we offer deep well jet pumps with a two-pipe ejector system installed in the well." },
   { q: "Can I use this pump for pressurizing my home water system?", a: "Yes. Self-priming jet pumps are excellent for household pressure boosting. When paired with a pressure tank and pressure switch, they create a complete automatic water supply system. JET and JSW series support automatic pressure control with standard accessories." },
   { q: "What maintenance does a self-priming jet pump require?", a: "Maintenance is minimal: check and clean the foot valve/strainer annually, inspect the pressure tank pre-charge every 6 months, and monitor for any seal leakage. The mechanical seal typically lasts 3-5 years under normal operation." },
  ],
  ctaTitle: "NEED HELP CHOOSING THE RIGHT JET PUMP?",
  ctaDesc: "Our engineering team can help you select the optimal self-priming jet pump for your household or garden needs. Contact us for technical support, pricing, and OEM/ODM solutions.",
 },

 /* ─── SUBMERSIBLE SEWAGE PUMP (submersible-sewage-pump) ─── */
 "submersible-sewage-pump": {
  heroTitle: "SUBMERSIBLE SEWAGE PUMP SERIES",
  heroSubtitle: "Heavy-Duty Wastewater Solutions",
  heroDesc: "ALFAGRAND submersible sewage pumps handle challenging wastewater, sewage, and drainage applications with robust construction and high solids-passing capability. Engineered for long service life in the most demanding environments.",
  heroImage: "/images/products/submersible-sewage-pump-hero-bg.png",
  stats: [
   { icon: Package, label: "Product Series", value: "5" },
   { icon: Layers, label: "Models Available", value: "59" },
   { icon: Gauge, label: "Max. Flow", value: "25 m³/h" },
   { icon: Shield, label: "Solids Handling", value: "Up to 35mm" },
  ],
  whatIs: "What is a Submersible Sewage Pump?",
  whatIsDesc: "A submersible sewage pump is designed to operate while fully submerged in the liquid it pumps. V(WQ) series sewage pumps feature vortex impellers that pass solid particles up to 35mm, double mechanical seals for leak protection, and automatic float switches for unattended sump and lift station operation. The QDX(QD) series handles light drainage with up to 5mm solids. Essential for wastewater treatment, basement drainage, septic systems, and storm water management.",
  whatIsCutaway: "/images/products/submersible-sewage-pump.png",
  whatIsCutawayAlt: "Submersible sewage pump cutaway",
  applications: [
   { icon: Factory, label: "Wastewater\nTreatment" },
   { icon: Home, label: "Basement\nDrainage" },
   { icon: Building2, label: "Septic\nSystems" },
   { icon: Droplets, label: "Storm Water\nManagement" },
  ],
  features: [
   { icon: Wrench, title: "Large Solids\nPassage", desc: "V(WQ) vortex impeller design handles solids up to 35mm without clogging, even with fibrous materials.", image: "/images/products/submersible-sewage-pump.png" },
   { icon: Shield, title: "Double\nMechanical Seal", desc: "Silicon carbide double mechanical seal with oil chamber provides triple-layer protection against water ingress.", image: "/images/products/submersible-sewage-pump.png" },
   { icon: Target, title: "Automatic Float\nSwitch", desc: "Built-in float switch for automatic start/stop operation. No manual intervention required for sump drainage.", image: "/images/products/submersible-sewage-pump.png" },
   { icon: Shield, title: "Cast Iron\nDurability", desc: "Heavy-duty cast iron construction with anti-corrosion coating withstands aggressive wastewater environments.", image: "/images/products/submersible-sewage-pump.png" },
  ],
  series: [
   { name: "QDX Series", slug: "qdx-series", models: "QDX1.5-16-0.37 ~ QDX6-25-1.1", specLine1: "15 Models", specLine2: "Submersible Drainage Pump", specLine3: "", image: "/images/products/QDX.png" },
   { name: "WQD/V Series", slug: "wqd-series", models: "WQD250 / WQD550 / WQD1100 / WQD1500 / WQD2200", specLine1: "6 Models", specLine2: "Submersible Sewage Pump", specLine3: "", image: "/images/products/WQD.png" },
   { name: "V Series", slug: "v-series", models: "V1100DF / V1500DF / V2200DF", specLine1: "3 Models", specLine2: "Submersible Pump", specLine3: "", image: "/images/products/v.png" },
   { name: "QD Series", slug: "qd-series", models: "QD3-30/2-0.75 ~ QD3-96/6-2.2", specLine1: "14 Models", specLine2: "Clean Water Submersible", specLine3: "", image: "/images/products/QD.png" },
   { name: "WQ Series", slug: "wq-series", models: "WQ5-15-0.75 ~ WQ65-26-7.5", specLine1: "21 Models", specLine2: "Heavy-Duty Sewage Pump", specLine3: "", image: "/images/products/WQ.png" },
  ],
  faqs: [
   { q: "What size solids can a sewage pump handle?", a: "V(WQ) series handles up to 35mm solids — sufficient for typical domestic wastewater. For applications with larger debris or fibrous materials, choose the cutter impeller (WQKm Series) or heavy-duty series for clog-free operation." },
   { q: "Do I need a float switch?", a: "Float switches provide automatic on/off control based on water level — essential for sump pits, lift stations, and automatic drainage. All sewage pump models have built-in float switch options." },
   { q: "What is the difference between a sewage pump and a drainage pump?", a: "Sewage pumps (V(WQ) Series) handle solids-laden water up to 35mm. Drainage pumps (QDX Series) handle clean/light-particle water up to 5mm. Choose based on your water quality requirements." },
   { q: "Can sewage pumps handle hot water?", a: "Standard submersible sewage pumps handle water up to 40°C. For higher temperatures (up to 90°C), contact us for heat-resistant models with high-temperature seals and oil." },
  ],
  ctaTitle: "NEED HELP CHOOSING THE RIGHT SEWAGE PUMP?",
  ctaDesc: "Our engineering team can help you select the optimal sewage pump for your wastewater application. Contact us for technical support, pricing, and custom solutions.",
 },

 /* ─── MULTI-STAGE PUMP & PUMP SETS (multi-stage-pump-sets) ─── */
 "variable-frequency-pump": {
  heroTitle: "VARIABLE FREQUENCY PUMP SERIES",
  heroSubtitle: "Smart Constant Pressure Water Solutions",
  heroDesc: "ALFAGRAND variable frequency pumps combine permanent magnet synchronous motors with intelligent VFD controllers. Achieve constant water pressure with up to 40% energy savings compared to traditional fixed-speed pumps.",
  heroImage: "/images/products/variable-frequency-pump-hero-bg.png",
  stats: [
   { icon: Package, label: "Product Series", value: "1" },
   { icon: Layers, label: "Models Available", value: "4" },
   { icon: Lightbulb, label: "Energy Saving", value: "Up to 40%" },
   { icon: Shield, label: "Max. Head", value: "70m" },
  ],
  whatIs: "What is a Variable Frequency Pump?",
  whatIsDesc: "A variable frequency pump uses a permanent magnet synchronous motor (PMSM) controlled by a variable frequency drive (VFD) inverter. Unlike traditional pumps that run at a constant speed, VFD pumps continuously adjust motor speed to match real-time water demand. T400/T600/T800/T1000 series deliver constant water pressure with up to 40% energy savings, soft start/stop to eliminate water hammer, and smart protection against dry-run, over-pressure, and power anomalies.",
  whatIsCutaway: "/images/products/variable-frequency-pump.png",
  whatIsCutawayAlt: "Variable frequency pump with VFD controller",
  applications: [
   { icon: Home, label: "Smart Home\nWater Supply" },
   { icon: Building2, label: "Commercial\nBuilding" },
   { icon: Factory, label: "Industrial\nProcess" },
   { icon: Trees, label: "Precision\nIrrigation" },
  ],
  features: [
   { icon: Cpu, title: "Intelligent\nVFD Control", desc: "Built-in inverter with PID controller maintains constant pressure. LCD display panel for easy setup and monitoring.", image: "/images/products/variable-frequency-pump.png" },
   { icon: Lightbulb, title: "40% Energy\nSavings", desc: "Permanent magnet motor achieves IE5 efficiency class. Automatic speed reduction during low demand saves electricity.", image: "/images/products/variable-frequency-pump.png" },
   { icon: Timer, title: "Soft Start &\nSoft Stop", desc: "Gradual ramp-up eliminates water hammer and inrush current. Extends pump, pipe, and valve service life.", image: "/images/products/variable-frequency-pump.png" },
   { icon: Shield, title: "Multi-Protection\nSystem", desc: "Over-voltage, under-voltage, over-current, dry-run, and phase-loss protection built into the VFD controller.", image: "/images/products/variable-frequency-pump.png" },
  ],
  series: [
   { name: "AIGP Series", slug: "aigp-series", models: "AIGP300 / AIGP400 / AIGP500 / AIGP750 / AIGP1100A / AIGP1500A", specLine1: "6 Models", specLine2: "VFD Pump", specLine3: "", image: "/images/products/AIGP.png" },
   { name: "CMB Series", slug: "cmb-series", models: "CMB200 / CMB300 / CMB400 / CMB500 / CMB750 / CMB1100 / CMB1500", specLine1: "7 Models", specLine2: "VFD Pump", specLine3: "", image: "/images/products/CMB.png" },
   { name: "T Series", slug: "t-series", models: "T450 / T550", specLine1: "2 Models", specLine2: "VFD Pump", specLine3: "", image: "/images/products/T.png" },
  ],
  faqs: [
   { q: "How much energy can I save with a VFD pump?", a: "Typical energy savings range from 20-40% compared to fixed-speed pumps, depending on your usage pattern. The T Series permanent magnet motor alone is 8-12% more efficient than standard induction motors." },
   { q: "What is constant pressure control?", a: "Constant pressure control means the VFD pump automatically adjusts speed to maintain the same water pressure regardless of how many outlets are open. No pressure fluctuations, no temperature swings in showers." },
   { q: "Can I connect the VFD pump to my building management system?", a: "Yes. T Series models include communication ports for integration with BMS and SCADA systems. Remote monitoring of pressure, flow, and fault diagnostics is available." },
   { q: "Do VFD pumps require special installation?", a: "VFD pumps install like standard pumps but require adequate ventilation around the controller and proper electrical grounding. The built-in controller simplifies installation by eliminating external pressure switches and control panels." },
  ],
  ctaTitle: "NEED HELP CHOOSING THE RIGHT VFD PUMP?",
  ctaDesc: "Our engineering team can help you select the optimal variable frequency pump for your smart water supply system. Contact us for technical support, pricing, and OEM/ODM solutions.",
 },

 /* ─── MULTI-STAGE PUMP & PUMP SETS (multi-stage-pump-sets) ─── */
 "multi-stage-pump-sets": {
  heroTitle: "MULTI-STAGE PUMP & PUMP SETS",
  heroSubtitle: "High-Rise Building & Industrial Boosting Solutions",
  heroDesc: "ALFAGRAND multi-stage pumps and complete pump sets deliver high-pressure water for multi-story buildings, industrial processes, and municipal boosting. Modular designs offer flexible configurations from 2 to 20+ stages.",
  heroImage: "/images/products/multi-stage-pump-hero-bg.png",
  stats: [
   { icon: Package, label: "Product Series", value: "2" },
   { icon: Layers, label: "Models Available", value: "12" },
   { icon: Gauge, label: "Max. Head", value: "Up to 102m" },
   { icon: Shield, label: "Max. Flow", value: "8.0 m³/h" },
  ],
  whatIs: "What is a Multi-Stage Pump?",
  whatIsDesc: "A multi-stage pump contains multiple impellers (stages) mounted on a single shaft, each stage adding pressure to the fluid. HMC series self-priming multistage pumps deliver up to 56m head from a compact horizontal design. CDLF/CDL series lightweight vertical multistage pumps in AISI 304 stainless steel achieve up to 102m head — ideal for pressure boosting, boiler feed, and industrial water circulation.",
  whatIsCutaway: "/images/products/multi-stage-pump-sets.png",
  whatIsCutawayAlt: "Multi-stage pump and pump set diagram",
  applications: [
   { icon: Building2, label: "High-Rise\nWater Supply" },
   { icon: Factory, label: "Industrial\nBoosting" },
   { icon: Droplets, label: "Fire Protection\nSystems" },
   { icon: Target, label: "Boiler Feed\nWater" },
  ],
  features: [
   { icon: BarChart3, title: "Stackable\nPressure Stages", desc: "Modular multi-stage design with 2 to 15+ impellers on a single shaft, achieving up to 102m head pressure.", image: "/images/products/multi-stage-pump-sets.png" },
   { icon: Shield, title: "Stainless Steel\nHydraulics", desc: "CDLF/CDL series use stamped 304 stainless steel impellers and diffusers for superior corrosion resistance.", image: "/images/products/multi-stage-pump-sets.png" },
   { icon: Lightbulb, title: "Self-Priming\nOption", desc: "HMC series combines multistage performance with self-priming capability — no foot valve needed for tank suction.", image: "/images/products/multi-stage-pump-sets.png" },
   { icon: Cpu, title: "Smart Control\nIntegration", desc: "Optional PLC control panel with VFD for automatic pressure regulation, pump alternation, and remote monitoring.", image: "/images/products/multi-stage-pump-sets.png" },
  ],
  series: [
   { name: "CHT Series", slug: "cht-series", models: "CHT1-20 ~ CHT20-20", specLine1: "29 Models", specLine2: "Multi-Stage Centrifugal", specLine3: "", image: "/images/products/CHT.png" },
   { name: "CHI Series", slug: "chi-series", models: "CHI 1-2 ~ CHI 5-7", specLine1: "30 Models", specLine2: "Inline Multi-Stage", specLine3: "", image: "/images/products/CHI.png" },
   { name: "MCS Series", slug: "mcs-series", models: "MCS-3 / MCS-4 / MCS-5", specLine1: "3 Models", specLine2: "Multi-Stage Pump", specLine3: "", image: "/images/products/MCS.png" },
   { name: "CDLF/CDL Series", slug: "cdlf-series", models: "CDL(F)2-2 ~ CDL(F)3-29", specLine1: "32 Models", specLine2: "Vertical Multi-Stage SS", specLine3: "", image: "/images/products/CDLF.png" },
  ],
  faqs: [
   { q: "How many stages do I need for my building?", a: "Each stage adds approximately 6-12m of head. Select the number of stages based on your required discharge pressure. Our engineers can calculate the exact configuration based on your building specifications." },
   { q: "What is the difference between HMC and CDLF?", a: "HMC series: self-priming horizontal multistage with cast iron construction, ideal for tank suction and domestic boosting. CDLF/CDL series: vertical multistage with AISI 304 stainless steel, ideal for high-head applications and industrial processes." },
   { q: "Can I get a complete pump set with everything included?", a: "Yes. ALFAGRAND offers complete pump sets including pump, motor, control panel, pressure tank, and piping manifold. Simply connect inlet, outlet, and power — no field assembly required." },
   { q: "What is a jockey pump and do I need one?", a: "A jockey pump maintains system pressure during low-flow conditions to prevent frequent starting of the main pump. ALFAGRAND fire pump sets include a matched jockey pump with automatic alternation control." },
  ],
  ctaTitle: "NEED HELP CHOOSING THE RIGHT MULTI-STAGE PUMP?",
  ctaDesc: "Our engineering team can design and supply the optimal multi-stage pump set for your high-rise building or industrial pressure boosting application. Contact us for technical support, pricing, and OEM/ODM solutions.",
 },

};

/* ─── Helper: get category data ─── */
function getCategoryData(slug: string): CategoryData | null {
 return categoryDataMap[slug] ?? null;
}

export function generateStaticParams() {
 const excludedSlugs = ["deep-well-pump", "solar-pump-system"];
 return locales.flatMap((locale) =>
  products
   .filter((product) => !excludedSlugs.includes(product.slug))
   .map((product) => ({
    locale,
    slug: product.slug,
   }))
 );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { locale, slug } = await params;
 const product = products.find((p) => p.slug === slug);
 if (!product) return { title: "Product Not Found" };

 const catData = getCategoryData(slug);
 const baseUrl = "https://alfagrandpumps.com";
 const title = catData
  ? `${catData.heroTitle.replace(" SERIES", "")} Series | ALFAGRAND`
  : `${product.name} | ALFAGRAND`;

 return {
  title,
  description: catData?.heroDesc ?? product.description,
  alternates: {
   canonical: `${baseUrl}/${locale}/products/${slug}`,
   languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/products/${slug}`])),
  },
  openGraph: {
   title,
   description: catData?.heroDesc ?? product.description,
   url: `${baseUrl}/${locale}/products/${slug}`,
   images: [{ url: `${baseUrl}${product.image}`, width: 800, height: 800 }],
   type: "website",
  },
 };
}

export default async function ProductDetailPage({ params }: Props) {
 const { locale, slug } = await params;
 setRequestLocale(locale);
 const product = products.find((p) => p.slug === slug);
 if (!product) notFound();

 const catData = getCategoryData(slug);
 const basePath = locale === defaultLocale ? "" : `/${locale}`;

 const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: catData?.heroDesc ?? product.description,
  image: `https://alfagrandpumps.com${product.image}`,
  brand: { "@type": "Brand", name: "ALFAGRAND" },
  manufacturer: { "@type": "Organization", name: "ALFAGRAND", url: "https://alfagrandpumps.com" },
  category: "Water Pump",
 };

 // Fallback: if no category data, show simple product page
 if (!catData) {
  return (
   <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    <Navbar />
    <main className="bg-bg-primary text-white min-h-screen pt-28 pb-16">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-text-tertiary mb-8 flex items-center gap-2">
       <Link href={`${basePath}/`} className="hover:text-accent-cyan">Home</Link>
       <span>/</span>
       <Link href={`${basePath}/products`} className="hover:text-accent-cyan">Products</Link>
       <span>/</span>
       <span className="text-text-secondary">{product.name}</span>
      </nav>
      <div className="bg-gradient-to-br from-[#1a3a2a] to-bg-card rounded-2xl p-8 border border-border-subtle">
       <img src={product.image} alt={product.name} className="max-w-sm mx-auto mb-6 object-contain" />
       <h1 className="text-3xl font-bold text-center mb-3">{product.name}</h1>
       <p className="text-text-secondary text-center max-w-lg mx-auto">{product.description}</p>
      </div>
     </div>
    </main>
    <Footer locale={locale} />
   </>
  );
 }

 const d = catData;

 return (
  <>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
   <Navbar />
   <main className="bg-bg-primary text-white min-h-screen">

    {/* ════════════ ① HERO SECTION ════════════ */}
    <section className="relative overflow-hidden min-h-[500px]">
     <img src={d.heroImage} alt="" className="absolute inset-0 w-full h-full object-contain object-right" />
     <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/50 to-bg-primary/20" />

     <div className="relative z-10 pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       {/* Breadcrumb */}
       <Breadcrumbs
        locale={locale}
        items={[
         { label: "Products", href: `${basePath}/products` },
         { label: d.heroTitle.split(" SERIES")[0], href: `${basePath}/products/${slug}` },
        ]}
       />

       <div>
        <p className="text-accent-cyan text-base font-semibold uppercase tracking-widest mb-3">
         — {d.heroSubtitle} —
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
         {d.heroTitle}
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-8">
         {d.heroDesc}
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-6 md:gap-10">
         {d.stats.map((stat) => {
          const Icon = stat.icon;
          return (
           <div key={stat.label} className="flex items-center gap-3 min-w-[120px]">
            <Icon className="w-7 h-7 text-accent-cyan shrink-0" strokeWidth={1.5} />
            <div>
             <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
             <div className="text-[10px] text-text-tertiary uppercase tracking-wider">{stat.label}</div>
            </div>
           </div>
          );
         })}
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* ════════════ ② WHAT IS [PUMP TYPE]? ════════════ */}
    <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
       {/* Left: Cutaway image */}
       <div className="bg-gradient-to-br from-bg-card to-[#060F1E] rounded-2xl border border-border-default p-4 flex items-center justify-center aspect-square lg:aspect-auto lg:min-h-[360px]">
        <img
         src={d.whatIsCutaway}
         alt={d.whatIsCutawayAlt}
         className="max-w-full max-h-full object-contain rounded-lg"
        />
       </div>

       {/* Center: Text */}
       <div className="lg:flex lg:flex-col lg:justify-center">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider mb-4">
         {d.whatIs}
        </h2>
        <p className="text-sm text-text-tertiary leading-relaxed mb-6">
         {d.whatIsDesc}
        </p>
        <Link
         href={`${basePath}/contact`}
         className="inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan hover:text-white transition-colors group"
        >
         Learn More
         <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
       </div>

       {/* Right: Application cards or image */}
       {d.applicationsImage ? (
        <div className="bg-gradient-to-br from-bg-card to-[#060F1E] rounded-2xl border border-border-default p-4 flex items-center justify-center aspect-square lg:aspect-auto lg:min-h-[360px]">
         <img
          src={d.applicationsImage}
          alt="Applications"
          className="max-w-full max-h-full object-contain rounded-lg"
         />
        </div>
       ) : (
        <div className="grid grid-cols-2 gap-3">
         {d.applications.map((app) => {
          const AppIcon = app.icon;
          return (
           <div
            key={app.label}
            className="bg-bg-card/80 border border-border-default rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-accent-cyan/20 transition-all group"
           >
            <AppIcon className="w-6 h-6 text-accent-cyan/70 group-hover:text-accent-cyan transition-colors" />
            <span className="text-[10px] text-text-secondary leading-tight whitespace-pre-line">
             {app.label}
            </span>
           </div>
          );
         })}
        </div>
       )}
      </div>
     </div>
    </section>

    {/* ════════════ ③ KEY FEATURES & BENEFITS ════════════ */}
    <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
       <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest">
        — KEY FEATURES & BENEFITS —
       </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {d.features.map((feat) => {
        const FeatIcon = feat.icon;
        return (
         <div
          key={feat.title}
          className="bg-bg-card/60 border border-white/[0.05] rounded-xl overflow-hidden hover:border-accent-cyan/20 transition-all duration-300 group"
         >
          {/* Feature image */}
          <div className="h-40 bg-gradient-to-br from-[#0a1628] to-[#06101a] flex items-center justify-center overflow-hidden">
           <img
            src={feat.image}
            alt={feat.title}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-all duration-500"
           />
          </div>
          {/* Content */}
          <div className="p-5">
           <div className="flex items-start gap-3 mb-2">
            <FeatIcon className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
            <h3 className="text-sm font-bold text-white leading-tight whitespace-pre-line">
             {feat.title}
            </h3>
           </div>
           <p className="text-xs text-text-tertiary leading-relaxed pl-8">
            {feat.desc}
           </p>
          </div>
         </div>
        );
       })}
      </div>
     </div>
    </section>

    {/* ════════════ ④ EXPLORE OUR [TYPE] SERIES ════════════ */}
    <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
       <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-2">
        — EXPLORE OUR {d.heroTitle} —
       </h2>
       <p className="text-sm text-text-tertiary">
        Choose the right series for your application.
       </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
       {d.series.map((s, idx) => (
        <div
         key={s.name}
         className={`bg-bg-card/80 border border-border-default rounded-xl p-5 transition-all duration-300 group ${s.slug ? "hover:border-accent-cyan/20" : "opacity-70"}`}
        >
         {/* Number badge */}
         <span className="text-xs font-bold text-accent-cyan/60 mb-3 block">
          0{idx + 1}
         </span>

         {/* Series image */}
         <div className="aspect-square bg-gradient-to-br from-[#0a1628] to-[#06101a] rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
          <img
           src={s.image}
           alt={s.name}
           className={`w-full h-full object-contain p-3 transition-transform duration-500 ${s.slug ? "group-hover:scale-105" : ""}`}
          />
          {!s.slug && (
           <span className="absolute top-2 right-2 bg-amber-500/20 text-amber-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
            COMING SOON
           </span>
          )}
         </div>

         {/* Info */}
         <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
          {s.name}
         </h3>
         <p className="text-xs text-text-tertiary mb-0.5">{s.models} · {s.specLine1}</p>
         <p className="text-xs text-text-tertiary mb-0.5">{s.specLine2}</p>
         <p className="text-xs text-text-tertiary mb-3">{s.specLine3}</p>

         {/* CTA */}
         {s.slug ? (
          <Link
           href={`${basePath}/products/${slug}/${s.slug}`}
           className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan group-hover:gap-2 transition-all cursor-pointer"
          >
           VIEW SERIES <ArrowRight size={12} />
          </Link>
         ) : (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/25 cursor-default">
           DETAILS COMING SOON
          </span>
         )}
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* ════════════ ⑤ FAQ ════════════ */}
    {d.faqs.length > 0 && (
     <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
       __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: d.faqs.map((f) => ({
         "@type": "Question",
         name: f.q,
         acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
       }),
      }}
     />
    )}
    <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
     <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
       <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-2">
        — FREQUENTLY ASKED QUESTIONS —
       </h2>
      </div>

      <div className="space-y-3">
       {d.faqs.map((faq, idx) => (
        <details key={idx} className="group bg-bg-card/60 border border-border-default rounded-xl overflow-hidden">
         <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-bg-card transition-colors list-none">
          <span className="text-sm font-medium text-white/90 pr-8">{faq.q}</span>
          <ChevronDown className="w-5 h-5 text-text-tertiary shrink-0 group-open:rotate-180 transition-transform" />
         </summary>
         <div className="px-5 pb-5 pt-0">
          <p className="text-sm text-text-tertiary leading-relaxed">{faq.a}</p>
         </div>
        </details>
       ))}
      </div>

      {/* Knowledge Center link */}
      <div className="text-center mt-8">
       <Link
        href={`${basePath}/#knowledge`}
        className="inline-flex items-center gap-2 text-sm text-accent-cyan hover:text-white transition-colors group"
       >
        Visit Our Knowledge Center for More Technical Articles
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
       </Link>
      </div>
     </div>
    </section>

    {/* ════════════ ⑥ BOTTOM CTA ════════════ */}
    <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-bg-card to-[#0a1525] border border-border-default rounded-2xl p-6 lg:p-10">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Text + buttons */}
        <div>
         <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
          {d.ctaTitle}
         </h2>
         <p className="text-sm text-text-tertiary leading-relaxed mb-6">
          {d.ctaDesc}
         </p>

         <div className="flex flex-wrap gap-4">
          <Link
           href={`${basePath}/contact`}
           className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent-cyan text-[#060F1E] text-sm font-bold hover:opacity-80 transition-all shadow-lg shadow-accent-cyan/15"
          >
           <MessageCircle size={16} />
           GET A QUOTE
           <span className="text-[10px] font-normal opacity-70 ml-1">
            Fast Response
           </span>
          </Link>
          <a
           href="https://wa.me/8618657933982"
           target="_blank"
           rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-transparent border border-border-glow text-white text-sm font-semibold hover:border-accent-cyan/50 hover:text-accent-cyan transition-all"
          >
           <HeadphonesIcon size={16} />
           CONTACT OUR EXPERTS
           <span className="text-[10px] font-normal opacity-50 ml-1">
            Instant Chat
           </span>
          </a>
         </div>
        </div>

        {/* Right: Product image */}
        <div className="hidden lg:flex items-center justify-end">
         <div className="w-full max-w-xs aspect-square bg-gradient-to-br from-[#0a1628] to-[#06101a] rounded-xl border border-white/[0.05] flex items-center justify-center p-6">
          <img
           src={d.heroImage}
           alt={d.heroTitle}
           className="max-w-full max-h-full object-contain"
          />
         </div>
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* ════════════ Footer Trust Badges ════════════ */}
    <section className="border-t border-white/[0.05] py-8">
     <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
       {[
        { icon: Star, label: "High Quality", sub: "ISO 9001 Certified" },
        { icon: CheckCircle, label: "Strict Testing", sub: "100% Factory Tested" },
        { icon: HeadphonesIcon, label: "Global Support", sub: "24/7 Technical Help" },
        { icon: Target, label: "Long Service Life", sub: "18 Months Warranty" },
       ].map((badge) => (
        <div key={badge.label} className="flex items-center gap-3">
         <badge.icon className="w-8 h-8 text-accent-cyan/50" strokeWidth={1.5} />
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
