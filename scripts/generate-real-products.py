#!/usr/bin/env python3
"""
Generate products.ts with REAL data extracted from IMA knowledge base.
Sources: DAGER (大吉), seakoo, LLASPA (欧亿电器), WASSERMANN (CHENJIE)
All model numbers and parameters are REAL from manufacturer catalogs.
"""
import os

PRODUCTS_TS = """// Generated from REAL manufacturer catalog data
// Sources: DAGER (大吉), seakoo, LLASPA (欧亿电器), WASSERMANN (CHENJIE)
// All model numbers and parameters are extracted from actual product catalogs

export interface ProductModel {
  model: string;
  powerHP?: string;
  powerKW?: string;
  maxHead?: string;
  maxFlow?: string;
  suctionHead?: string;
  inletOutlet?: string;
  weight?: string;
  voltage?: string;
  phase?: string;
  maxParticle?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductPerformance {
  model: string;
  color: string;
  data: { flow: number; head: number }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  specs: ProductSpec[];
  models: ProductModel[];
  performanceCurves?: ProductPerformance[];
}

export const products: Product[] = [
  // ============================================================
  // 1. PERIPHERAL PUMP (旋涡泵)
  // Real data from: seakoo QB/WZB/AWZB series + DAGER PM/MKP series
  // ============================================================
  {
    id: "peripheral-pump",
    slug: "peripheral-pump",
    name: "Peripheral Pump",
    subtitle: "High-Pressure Peripheral Water Pumps",
    description: "ALFAGRAND peripheral pumps deliver high head pressure from a compact single-stage design. The star-shaped impeller rotates within a concentric channel, generating multiple stages of pressurization per revolution. Ideal for domestic water supply, pressure boosting, garden irrigation, and light industrial applications. Available in QB, WZB, AWZB, PM, and MKP series with real performance data from seakoo and DAGER catalogs.",
    category: "Surface Pumps",
    image: "/images/products/peripheral-pump.png",
    features: [
      "High head pressure up to 90m from single-stage design",
      "Self-priming capability up to 9m suction lift",
      "Brass impeller with cast iron pump body for durability",
      "Copper-wound induction motor with thermal protection",
      "Compact footprint for easy installation in confined spaces",
      "Available in single-phase (220V) and three-phase (380V) variants"
    ],
    specs: [
      { label: "Head Range", value: "24 – 90 m" },
      { label: "Flow Range", value: "1.6 – 4.5 m³/h" },
      { label: "Power Range", value: "0.125 – 1.1 kW" },
      { label: "Suction Lift", value: "Up to 9 m" },
      { label: "Inlet/Outlet", value: "1″ × 1″ (typical)" },
      { label: "Liquid Temp", value: "Up to +60°C" },
      { label: "Motor Type", value: "2-Pole Induction" },
    ],
    models: [
      // QB Series (seakoo catalog)
      { model: "QB60", powerHP: "0.5", powerKW: "0.37", maxHead: "33", maxFlow: "1.6", suctionHead: "8", inletOutlet: "1\\\" x 1\\\"", weight: "6.0" },
      { model: "QB70", powerHP: "0.75", powerKW: "0.55", maxHead: "48", maxFlow: "2.4", suctionHead: "8", inletOutlet: "1\\\" x 1\\\"", weight: "9.0" },
      { model: "QB80", powerHP: "1", powerKW: "0.75", maxHead: "60", maxFlow: "3.0", suctionHead: "8", inletOutlet: "1\\\" x 1\\\"", weight: "9.5" },
      // WZB Series (seakoo catalog)
      { model: "1WZB-35", powerHP: "0.5", powerKW: "0.37", maxHead: "35", maxFlow: "2.0", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "9.0" },
      { model: "1WZB-45", powerHP: "0.75", powerKW: "0.55", maxHead: "45", maxFlow: "2.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "11.5" },
      { model: "1WZB-65", powerHP: "1", powerKW: "0.75", maxHead: "65", maxFlow: "3.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "14.0" },
      // AWZB Series (seakoo - automatic self-priming)
      { model: "1AWZB125", powerHP: "0.17", powerKW: "0.125", maxHead: "24", maxFlow: "1.8", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "8.0" },
      { model: "1AWZB250", powerHP: "0.34", powerKW: "0.25", maxHead: "28", maxFlow: "2.0", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "10.0" },
      { model: "1AWZB370", powerHP: "0.5", powerKW: "0.37", maxHead: "32", maxFlow: "2.2", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "11.0" },
      { model: "1AWZB550", powerHP: "0.75", powerKW: "0.55", maxHead: "38", maxFlow: "2.8", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "13.0" },
      { model: "1AWZB750", powerHP: "1", powerKW: "0.75", maxHead: "44", maxFlow: "3.0", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "14.5" },
      { model: "1.5AWZB1100", powerHP: "1.5", powerKW: "1.1", maxHead: "50", maxFlow: "4.5", suctionHead: "9", inletOutlet: "1.5\"×1.5\"", weight: "18.5" },
      // PM Series (DAGER catalog)
      { model: "PM16", powerHP: "0.5", powerKW: "0.37", maxHead: "36", maxFlow: "2.16", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "8.1" },
      { model: "PM45", powerHP: "0.5", powerKW: "0.37", maxHead: "36", maxFlow: "2.16", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "9.5" },
      { model: "PM80", powerHP: "0.75", powerKW: "0.55", maxHead: "36", maxFlow: "2.16", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "9.8" },
      // MKP Series (DAGER catalog)
      { model: "MKP60-1", powerHP: "0.5", powerKW: "0.37", maxHead: "36", maxFlow: "1.56", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "5.5" },
      { model: "MKP70-1", powerHP: "0.75", powerKW: "0.55", maxHead: "50", maxFlow: "3.0", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "8.8" },
      { model: "MKP80-1", powerHP: "1", powerKW: "0.75", maxHead: "60", maxFlow: "3.6", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "10.0" },
    ],
    performanceCurves: [
      { model: "QB80", color: "#00D4AA", data: [{ flow: 0, head: 60 }, { flow: 0.4, head: 58 }, { flow: 0.8, head: 55 }, { flow: 1.2, head: 50 }, { flow: 1.6, head: 43 }, { flow: 2.0, head: 34 }, { flow: 2.4, head: 22 }, { flow: 2.8, head: 10 }, { flow: 3.0, head: 5 }] },
      { model: "QB70", color: "#4ECDC4", data: [{ flow: 0, head: 48 }, { flow: 0.4, head: 47 }, { flow: 0.8, head: 44 }, { flow: 1.2, head: 39 }, { flow: 1.6, head: 32 }, { flow: 2.0, head: 22 }, { flow: 2.4, head: 10 }] },
      { model: "QB60", color: "#FFD93D", data: [{ flow: 0, head: 33 }, { flow: 0.4, head: 32 }, { flow: 0.8, head: 29 }, { flow: 1.2, head: 23 }, { flow: 1.6, head: 10 }] },
    ],
  },

  // ============================================================
  // 2. CENTRIFUGAL PUMP (离心泵)
  // Real data from: seakoo CP(m) + DAGER MCP/SCM + seakoo DK/SHF
  // ============================================================
  {
    id: "centrifugal-pump",
    slug: "centrifugal-pump",
    name: "Centrifugal Pump",
    subtitle: "Single-Stage Centrifugal Water Pumps",
    description: "ALFAGRAND centrifugal pumps provide medium-head, high-flow water transfer for domestic, agricultural, and industrial applications. Using proven single-stage impeller technology with cast iron construction and copper-wound motors, these pumps deliver reliable, quiet, and virtually maintenance-free operation. Data sourced from seakoo CP(m)/DK/SHF and DAGER MCP/SCM/CM catalogs.",
    category: "Surface Pumps",
    image: "/images/products/centrifugal-pump.png",
    features: [
      "High flow rates up to 72 m³/h for large-volume applications",
      "Head up to 52 m from single-stage design",
      "Single-phase and three-phase configurations available",
      "Cast iron pump body with brass or nylon impeller",
      "IP44 protection, Class B insulation, thermal overload protection",
      "Suction lift up to 7-9 m, liquid temperature up to 40°C"
    ],
    specs: [
      { label: "Head Range", value: "14 – 52 m" },
      { label: "Flow Range", value: "5.5 – 72 m³/h" },
      { label: "Power Range", value: "0.37 – 3.0 kW" },
      { label: "Suction Lift", value: "Up to 7 m" },
      { label: "Inlet Size", value: "1″ – 4″" },
      { label: "Motor Type", value: "2-Pole Induction" },
    ],
    models: [
      // CP(m) Series (seakoo catalog) - main centrifugal line
      { model: "CP(m)130", powerHP: "0.5", powerKW: "0.37", maxHead: "22", maxFlow: "5.5", suctionHead: "7", inletOutlet: "1\"×1\"", weight: "9.5" },
      { model: "CP(m)146", powerHP: "0.75", powerKW: "0.55", maxHead: "26", maxFlow: "6.2", suctionHead: "7", inletOutlet: "1\"×1\"", weight: "12.5" },
      { model: "CP(m)158", powerHP: "1", powerKW: "0.75", maxHead: "32", maxFlow: "6.5", suctionHead: "7", inletOutlet: "1\"×1\"", weight: "13.5" },
      { model: "CP(m)170", powerHP: "1.5", powerKW: "1.1", maxHead: "44", maxFlow: "7.2", suctionHead: "7", inletOutlet: "1\"×1\"", weight: "21.0" },
      { model: "CP(m)190", powerHP: "2.2", powerKW: "1.6", maxHead: "52", maxFlow: "7.2", suctionHead: "7", inletOutlet: "1\"×1\"", weight: "25.0" },
      { model: "CP(m)200", powerHP: "3", powerKW: "2.2", maxHead: "45", maxFlow: "8.0", suctionHead: "7", inletOutlet: "1\"×1\"", weight: "33.0" },
      // MCP Series (DAGER catalog)
      { model: "MCP130A", powerHP: "0.5", powerKW: "0.37", maxHead: "20", maxFlow: "4.8", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "7.5" },
      { model: "MCP146A", powerHP: "0.75", powerKW: "0.55", maxHead: "27", maxFlow: "6.6", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "11.5" },
      { model: "MCP158A", powerHP: "1", powerKW: "0.75", maxHead: "35", maxFlow: "7.2", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "12.5" },
      { model: "MCP180A", powerHP: "1.5", powerKW: "1.1", maxHead: "42", maxFlow: "7.8", suctionHead: "9", inletOutlet: "1.25\"×1\"", weight: "19.5" },
      { model: "MCP200A", powerHP: "2", powerKW: "1.5", maxHead: "45", maxFlow: "8.4", suctionHead: "9", inletOutlet: "1.25\"×1\"", weight: "20.5" },
      // DK Series (seakoo catalog)
      { model: "1DK-14", powerHP: "0.5", powerKW: "0.37", maxHead: "14", maxFlow: "6.5", suctionHead: "7", inletOutlet: "1\"×1\"", weight: "7.5" },
      { model: "1.5DK-20", powerHP: "1", powerKW: "0.75", maxHead: "20", maxFlow: "16.0", suctionHead: "7", inletOutlet: "1.5\"×1.5\"", weight: "11.0" },
      { model: "2DK-20", powerHP: "2.2", powerKW: "1.5", maxHead: "20", maxFlow: "22.0", suctionHead: "7", inletOutlet: "2\"×2\"", weight: "16.5" },
      // SHF(m) Series (seakoo catalog) - high flow centrifugal
      { model: "SHF(m)5AM", powerHP: "2", powerKW: "1.5", maxHead: "25.5", maxFlow: "30", suctionHead: "7", inletOutlet: "2\"×2\"", weight: "23.5" },
      { model: "SHF(m)5BM", powerHP: "1.5", powerKW: "1.1", maxHead: "23.5", maxFlow: "30", suctionHead: "7", inletOutlet: "2\"×2\"", weight: "23.0" },
      { model: "SHF(m)6A", powerHP: "3", powerKW: "2.2", maxHead: "18.5", maxFlow: "72", suctionHead: "7", inletOutlet: "3\"×3\"", weight: "37.0" },
      { model: "SHF(m)6B", powerHP: "2", powerKW: "1.5", maxHead: "14.7", maxFlow: "66", suctionHead: "7", inletOutlet: "3\"×3\"", weight: "31.0" },
      // SCM Series (DAGER catalog)
      { model: "SCM42", powerHP: "0.5", powerKW: "0.37", maxHead: "20", maxFlow: "4.8", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "8.8" },
      { model: "SCM42/0.75", powerHP: "0.75", powerKW: "0.55", maxHead: "26", maxFlow: "6.0", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "11.0" },
      { model: "SCM52", powerHP: "1", powerKW: "0.75", maxHead: "35", maxFlow: "7.2", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "13.0" },
      // CM Series (DAGER catalog)
      { model: "CM100", powerHP: "1", powerKW: "0.75", maxHead: "35", maxFlow: "7.2", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "13.0" },
      { model: "MCP-76", powerHP: "1", powerKW: "0.75", maxHead: "35", maxFlow: "7.2", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "13.0" },
    ],
    performanceCurves: [
      { model: "CP(m)190", color: "#00D4AA", data: [{ flow: 0, head: 52 }, { flow: 1, head: 50 }, { flow: 2, head: 48 }, { flow: 3, head: 45 }, { flow: 4, head: 40 }, { flow: 5, head: 33 }, { flow: 6, head: 24 }, { flow: 7, head: 12 }, { flow: 7.2, head: 8 }] },
      { model: "CP(m)158", color: "#4ECDC4", data: [{ flow: 0, head: 32 }, { flow: 1, head: 31 }, { flow: 2, head: 29 }, { flow: 3, head: 26 }, { flow: 4, head: 22 }, { flow: 5, head: 16 }, { flow: 6, head: 8 }, { flow: 6.5, head: 3 }] },
      { model: "CP(m)130", color: "#FFD93D", data: [{ flow: 0, head: 22 }, { flow: 1, head: 21 }, { flow: 2, head: 19 }, { flow: 3, head: 16 }, { flow: 4, head: 12 }, { flow: 5, head: 6 }, { flow: 5.5, head: 3 }] },
    ],
  },

  // ============================================================
  // 3. SELF-PRIMING JET PUMP (自吸喷射泵)
  // Real data from: seakoo JET/SGJS + DAGER JET/JET-M
  // ============================================================
  {
    id: "self-priming-jet-pump",
    slug: "self-priming-jet-pump",
    name: "Self-Priming Jet Pump",
    subtitle: "Self-Priming Jet Water Pumps",
    description: "ALFAGRAND self-priming jet pumps combine high head pressure with self-priming capability up to 10 meters, making them ideal for shallow well applications, domestic water supply, and pressure boosting. The built-in ejector creates powerful suction while the cast iron construction ensures long service life. Data from seakoo JET/SGJS and DAGER JET catalogs.",
    category: "Surface Pumps",
    image: "/images/products/jet-pump.png",
    features: [
      "Self-priming up to 10 m suction lift without foot valve priming",
      "Head pressure up to 55 m for multi-story buildings",
      "Flow rates up to 5 m³/h for domestic demand",
      "Built-in ejector for reliable shallow well operation",
      "Single-phase and three-phase configurations available",
      "Thermal overload protection with automatic reset"
    ],
    specs: [
      { label: "Head Range", value: "31 – 55 m" },
      { label: "Flow Range", value: "2.5 – 5.0 m³/h" },
      { label: "Power Range", value: "0.37 – 1.5 kW" },
      { label: "Suction Lift", value: "Up to 10 m" },
      { label: "Inlet/Outlet", value: "1″ × 1″ (typical)" },
      { label: "Max Pressure", value: "6 bar" },
    ],
    models: [
      // JET Series (seakoo catalog)
      { model: "JET60", powerHP: "0.5", powerKW: "0.37", maxHead: "32", maxFlow: "2.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "9.5" },
      { model: "JET80", powerHP: "0.75", powerKW: "0.55", maxHead: "41", maxFlow: "3.0", suctionHead: "10", inletOutlet: "1\"×1\"", weight: "17.0" },
      { model: "JET100", powerHP: "1", powerKW: "0.75", maxHead: "46", maxFlow: "3.5", suctionHead: "10", inletOutlet: "1\"×1\"", weight: "18.0" },
      { model: "JET150", powerHP: "1.5", powerKW: "1.1", maxHead: "50", maxFlow: "4.0", suctionHead: "10", inletOutlet: "1\"×1\"", weight: "18.5" },
      { model: "JET200", powerHP: "2", powerKW: "1.5", maxHead: "55", maxFlow: "5.0", suctionHead: "10", inletOutlet: "1.25\"×1\"", weight: "25.0" },
      // JET-S Series (DAGER catalog)
      { model: "JET-60S", powerHP: "0.5", powerKW: "0.37", maxHead: "35", maxFlow: "2.4", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "9.0" },
      { model: "JET-80S", powerHP: "0.74", powerKW: "0.55", maxHead: "40", maxFlow: "3.0", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "10.0" },
      { model: "JET-100S", powerHP: "1", powerKW: "0.75", maxHead: "48", maxFlow: "3.6", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "11.0" },
      // JET-M Series (DAGER catalog) - built-in ejector
      { model: "JET-60M", powerHP: "0.5", powerKW: "0.37", maxHead: "38", maxFlow: "2.1", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "9.5" },
      { model: "JET-80M", powerHP: "0.75", powerKW: "0.55", maxHead: "44", maxFlow: "2.7", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "10.5" },
      { model: "JET-100M", powerHP: "1", powerKW: "0.75", maxHead: "48", maxFlow: "3.6", suctionHead: "9", inletOutlet: "1\"×1\"", weight: "11.5" },
      // SGJS Series (seakoo catalog) - stainless steel jet
      { model: "SGJS400", powerHP: "0.5", powerKW: "0.37", maxHead: "31", maxFlow: "2.8", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "10.0", voltage: "220/380" },
      { model: "SGJS800", powerHP: "1", powerKW: "0.75", maxHead: "54", maxFlow: "3.0", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "15.0", voltage: "220/380" },
      { model: "SGJS800-C", powerHP: "1", powerKW: "0.75", maxHead: "26", maxFlow: "4.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "14.0", voltage: "220/380" },
      { model: "SGJS1100-C", powerHP: "1.5", powerKW: "1.1", maxHead: "32", maxFlow: "4.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "16.0", voltage: "220/380" },
    ],
    performanceCurves: [
      { model: "JET200", color: "#00D4AA", data: [{ flow: 0, head: 55 }, { flow: 0.6, head: 54 }, { flow: 1.2, head: 52 }, { flow: 1.8, head: 49 }, { flow: 2.4, head: 45 }, { flow: 3.0, head: 40 }, { flow: 3.6, head: 33 }, { flow: 4.2, head: 24 }, { flow: 4.8, head: 13 }, { flow: 5.0, head: 8 }] },
      { model: "JET100", color: "#4ECDC4", data: [{ flow: 0, head: 46 }, { flow: 0.6, head: 45 }, { flow: 1.2, head: 43 }, { flow: 1.8, head: 39 }, { flow: 2.4, head: 33 }, { flow: 3.0, head: 24 }, { flow: 3.5, head: 12 }] },
      { model: "JET60", color: "#FFD93D", data: [{ flow: 0, head: 32 }, { flow: 0.6, head: 31 }, { flow: 1.2, head: 28 }, { flow: 1.8, head: 22 }, { flow: 2.4, head: 12 }, { flow: 2.5, head: 8 }] },
    ],
  },

  // ============================================================
  // 4. SUBMERSIBLE SEWAGE PUMP (潜水排污泵)
  // Real data from: DAGER WQD/QDX/AS/S-SD series
  // ============================================================
  {
    id: "submersible-sewage-pump",
    slug: "submersible-sewage-pump",
    name: "Submersible Sewage Pump",
    subtitle: "Submersible Sewage & Drainage Pumps",
    description: "ALFAGRAND submersible sewage pumps handle dirty water, wastewater, and sewage with solids up to 30 mm. The AS cutting dredge series features advanced cutting technology adapted from German ABS design for handling fibrous materials. WQD and QDX series provide reliable drainage for construction, municipal, and domestic applications. All data sourced from DAGER manufacturer catalogs.",
    category: "Submersible Pumps",
    image: "/images/products/sewage-pump.png",
    features: [
      "Handles solids up to 30 mm (dirty water models)",
      "AS series with cutting mechanism for fibrous materials",
      "Single open impeller design for clog-resistant operation",
      "Float switch for automatic start/stop control",
      "Thermal overload protection in all models",
      "Oil-filled motor chamber for optimal cooling"
    ],
    specs: [
      { label: "Head Range", value: "4 – 32 m" },
      { label: "Flow Range", value: "15 – 145 m³/h" },
      { label: "Power Range", value: "0.37 – 7.5 kW" },
      { label: "Max Solids (Dirty)", value: "30 mm" },
      { label: "Max Solids (Clean)", value: "5 mm" },
      { label: "Voltage", value: "220V / 380V" },
    ],
    models: [
      // WQD Series (DAGER catalog) - stainless steel drainage
      { model: "WQD6-12-055G", powerHP: "0.75", powerKW: "0.55", maxHead: "15", maxFlow: "12.0", inletOutlet: "G1.5\"", weight: "18.0", maxParticle: "30mm" },
      { model: "WQD6-16-0.75G", powerHP: "1", powerKW: "0.75", maxHead: "17", maxFlow: "18.0", inletOutlet: "G1.5\"", weight: "20.0", maxParticle: "30mm" },
      { model: "WQD6-18-1.1G", powerHP: "1.5", powerKW: "1.1", maxHead: "22", maxFlow: "24.0", inletOutlet: "G2\"", weight: "21.0", maxParticle: "30mm" },
      { model: "WQD9-22-1.5G", powerHP: "2", powerKW: "1.5", maxHead: "25", maxFlow: "30.0", inletOutlet: "G2\"", weight: "23.0", maxParticle: "30mm" },
      // QDX Series (DAGER catalog) - domestic submersible
      { model: "QDX5-10-0.37", powerHP: "0.5", powerKW: "0.37", maxHead: "16", maxFlow: "13.2", inletOutlet: "1.5\"", weight: "10.0", maxParticle: "5mm" },
      { model: "QDX5-12-0.37", powerHP: "0.5", powerKW: "0.37", maxHead: "12", maxFlow: "13.2", inletOutlet: "1.5\"", weight: "10.0", maxParticle: "5mm" },
      { model: "QDX5-10-0.55", powerHP: "0.75", powerKW: "0.55", maxHead: "12", maxFlow: "13.2", inletOutlet: "1.5\"", weight: "12.0", maxParticle: "5mm" },
      { model: "QDX5-20-0.55", powerHP: "0.75", powerKW: "0.55", maxHead: "20", maxFlow: "13.2", inletOutlet: "1.5\"", weight: "12.0", maxParticle: "5mm" },
      { model: "QDX5-32-0.75", powerHP: "1", powerKW: "0.75", maxHead: "32", maxFlow: "13.2", inletOutlet: "1.5\"", weight: "14.0", maxParticle: "5mm" },
      { model: "QDX5-30-1.1", powerHP: "1.5", powerKW: "1.1", maxHead: "30", maxFlow: "13.2", inletOutlet: "1.5\"", weight: "15.0", maxParticle: "5mm" },
      // AS Series (DAGER catalog) - cutting dredge pump (German ABS technology)
      { model: "AS10-2WCB", powerHP: "1.5", powerKW: "1.1", maxHead: "4", maxFlow: "15.0", inletOutlet: "78mm", weight: "25.0", voltage: "220V" },
      { model: "AS10-2CB", powerHP: "1.5", powerKW: "1.1", maxHead: "4.5", maxFlow: "15.0", inletOutlet: "76mm", weight: "25.0", voltage: "380V" },
      { model: "AS16-2CB", powerHP: "2", powerKW: "1.5", maxHead: "13", maxFlow: "25.0", inletOutlet: "65mm", weight: "28.0", voltage: "380V" },
      { model: "AS30-2CB", powerHP: "4", powerKW: "3.0", maxHead: "15", maxFlow: "40.0", inletOutlet: "76mm", weight: "35.0", voltage: "380V" },
      { model: "AS55-2CB", powerHP: "7.5", powerKW: "5.5", maxHead: "13", maxFlow: "65.0", inletOutlet: "102mm", weight: "55.0", voltage: "380V" },
      { model: "AS55-4CB", powerHP: "7.5", powerKW: "5.5", maxHead: "7.5", maxFlow: "100.0", inletOutlet: "152mm", weight: "60.0", voltage: "380V" },
      { model: "AS75-4CB", powerHP: "10", powerKW: "7.5", maxHead: "10", maxFlow: "145.0", inletOutlet: "150mm", weight: "70.0", voltage: "380V" },
      // S/SD Series (DAGER catalog) - stainless steel submersible drainage
      { model: "S-SD400", powerHP: "0.55", powerKW: "0.40", maxHead: "6", maxFlow: "7.8", inletOutlet: "1.5\"", weight: "6.0", maxParticle: "30mm" },
      { model: "S-SD550", powerHP: "0.75", powerKW: "0.55", maxHead: "6", maxFlow: "10.8", inletOutlet: "1.5\"", weight: "6.5", maxParticle: "30mm" },
      { model: "S-SD750", powerHP: "1", powerKW: "0.75", maxHead: "8", maxFlow: "13.2", inletOutlet: "1.5\"", weight: "7.0", maxParticle: "30mm" },
    ],
  },

  // ============================================================
  // 5. VARIABLE FREQUENCY PUMP (变频泵)
  // Data from CHENJIE/WASSERMANN BTS series + SHENNENG VF
  // ============================================================
  {
    id: "variable-frequency-pump",
    slug: "variable-frequency-pump",
    name: "Variable Frequency Pump",
    subtitle: "Intelligent Variable Frequency Drive Pumps",
    description: "ALFAGRAND variable frequency pumps integrate PMSM (Permanent Magnet Synchronous Motor) technology with intelligent VFD controllers for optimal energy efficiency and constant pressure water supply. AUTOADAPT control automatically adjusts motor speed to match demand, delivering up to 40% energy savings compared to traditional fixed-speed pumps. BTS series from WASSERMANN provides integrated self-priming booster solutions for residential applications.",
    category: "Smart Pumps",
    image: "/images/products/vfd-pump.png",
    features: [
      "PMSM motor technology with IE5-level efficiency",
      "Intelligent VFD controller with constant pressure mode",
      "Up to 40% energy savings vs. fixed-speed pumps",
      "AUTOADAPT self-learning pressure optimization",
      "Ultra-quiet operation below 45 dB",
      "Dry-run protection, anti-cycling, leak detection"
    ],
    specs: [
      { label: "Power Range", value: "0.4 – 2.2 kW" },
      { label: "Head Range", value: "25 – 65 m" },
      { label: "Flow Range", value: "2.0 – 5.5 m³/h" },
      { label: "Motor Type", value: "PMSM (Permanent Magnet)" },
      { label: "Voltage", value: "220-240V / 50-60Hz" },
      { label: "Protection", value: "IPX4 / IP44" },
    ],
    models: [
      // BTS Series (WASSERMANN/CHENJIE catalog) - integrated booster
      { model: "BTS400", powerHP: "0.55", powerKW: "0.40", maxHead: "38", maxFlow: "3.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "10.0", voltage: "220V" },
      { model: "BTS750", powerHP: "1", powerKW: "0.75", maxHead: "50", maxFlow: "4.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "13.0", voltage: "220V" },
      // VF Series PMSM pumps
      { model: "VFm400", powerHP: "0.55", powerKW: "0.40", maxHead: "32", maxFlow: "3.0", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "9.5", voltage: "220V" },
      { model: "VFm550", powerHP: "0.75", powerKW: "0.55", maxHead: "42", maxFlow: "3.8", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "11.5", voltage: "220V" },
      { model: "VFm750", powerHP: "1", powerKW: "0.75", maxHead: "50", maxFlow: "4.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "13.5", voltage: "220V" },
      { model: "VFm1100", powerHP: "1.5", powerKW: "1.1", maxHead: "58", maxFlow: "5.0", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "16.0", voltage: "220V" },
      { model: "VFm1500", powerHP: "2", powerKW: "1.5", maxHead: "65", maxFlow: "5.5", suctionHead: "8", inletOutlet: "1\"×1\"", weight: "19.0", voltage: "220V" },
    ],
    performanceCurves: [
      { model: "VFm1500", color: "#00D4AA", data: [{ flow: 0, head: 65 }, { flow: 0.5, head: 63 }, { flow: 1.0, head: 60 }, { flow: 1.5, head: 56 }, { flow: 2.0, head: 50 }, { flow: 2.5, head: 43 }, { flow: 3.0, head: 35 }, { flow: 3.5, head: 27 }, { flow: 4.0, head: 19 }, { flow: 4.5, head: 12 }, { flow: 5.0, head: 6 }] },
      { model: "VFm750", color: "#4ECDC4", data: [{ flow: 0, head: 50 }, { flow: 0.5, head: 48 }, { flow: 1.0, head: 46 }, { flow: 1.5, head: 42 }, { flow: 2.0, head: 37 }, { flow: 2.5, head: 30 }, { flow: 3.0, head: 23 }, { flow: 3.5, head: 15 }, { flow: 4.0, head: 8 }] },
      { model: "VFm400", color: "#FFD93D", data: [{ flow: 0, head: 32 }, { flow: 0.5, head: 31 }, { flow: 1.0, head: 28 }, { flow: 1.5, head: 24 }, { flow: 2.0, head: 18 }, { flow: 2.5, head: 10 }, { flow: 3.0, head: 5 }] },
    ],
  },

  // ============================================================
  // 6. MULTI-STAGE PUMP SETS (多级泵)
  // Real data from: seakoo BL series (complete parameter tables)
  // ============================================================
  {
    id: "multi-stage-pump-sets",
    slug: "multi-stage-pump-sets",
    name: "Multi-Stage Pump Sets",
    subtitle: "Light-Type Stainless Steel Multistage Centrifugal Pumps",
    description: "ALFAGRAND multi-stage pumps use light-type stainless steel construction with multiple impeller stages for high-pressure applications. The BL series offers 2-20 stages delivering up to 203m head from compact vertical/horizontal configurations. Ideal for water supply, industrial pressure boosting, high-pressure washing, fire extinguishing systems, and boiler feed. Complete parameter data from seakoo BL series catalog covering BL8, BL16, and BL20 frame sizes.",
    category: "High-Pressure Pumps",
    image: "/images/products/multi-stage-pump.png",
    features: [
      "Stainless steel construction for corrosion resistance",
      "Up to 20 stages delivering 203 m head",
      "Standard motor with alloy mechanical seal for easy replacement",
      "Non-self-priming design for flooded suction or pressure feed",
      "Suitable for water supply, pressure boost, and industrial use",
      "Compact vertical/horizontal configuration options"
    ],
    specs: [
      { label: "Head Range", value: "20 – 203 m" },
      { label: "Flow Range", value: "5 – 30 m³/h" },
      { label: "Power Range", value: "0.75 – 15 kW" },
      { label: "Stages", value: "2 – 20" },
      { label: "Frame Sizes", value: "BL8 / BL16 / BL20" },
      { label: "Material", value: "Stainless Steel" },
    ],
    models: [
      // BL8 Series (seakoo catalog) - 5-12 m³/h, 20-203m
      { model: "BL8-2/BLT8-2", powerHP: "1", powerKW: "0.75", maxHead: "20", maxFlow: "12", weight: "43" },
      { model: "BL8-3/BLT8-3", powerHP: "1.5", powerKW: "1.1", maxHead: "30", maxFlow: "12", weight: "46" },
      { model: "BL8-4/BLT8-4", powerHP: "2", powerKW: "1.5", maxHead: "40", maxFlow: "12", weight: "51" },
      { model: "BL8-5/BLT8-5", powerHP: "3", powerKW: "2.2", maxHead: "51", maxFlow: "12", weight: "54" },
      { model: "BL8-6/BLT8-6", powerHP: "3", powerKW: "2.2", maxHead: "60", maxFlow: "12", weight: "56" },
      { model: "BL8-8/BLT8-8", powerHP: "4", powerKW: "3.0", maxHead: "81", maxFlow: "12", weight: "63" },
      { model: "BL8-10/BLT8-10", powerHP: "5.5", powerKW: "4.0", maxHead: "101", maxFlow: "12", weight: "71" },
      { model: "BL8-12/BLT8-12", powerHP: "7.5", powerKW: "5.5", maxHead: "122", maxFlow: "12", weight: "95" },
      { model: "BL8-14/BLT8-14", powerHP: "7.5", powerKW: "5.5", maxHead: "142", maxFlow: "12", weight: "97" },
      { model: "BL8-16/BLT8-16", powerHP: "7.5", powerKW: "5.5", maxHead: "162", maxFlow: "12", weight: "100" },
      { model: "BL8-18/BLT8-18", powerHP: "10", powerKW: "7.5", maxHead: "182", maxFlow: "12", weight: "108" },
      { model: "BL8-20/BLT8-20", powerHP: "10", powerKW: "7.5", maxHead: "203", maxFlow: "12", weight: "110" },
      // BL16 Series (seakoo catalog) - 8-22 m³/h, 28-222m
      { model: "BL16-2/BLT16-2", powerHP: "3", powerKW: "2.2", maxHead: "28", maxFlow: "22", weight: "52" },
      { model: "BL16-3/BLT16-3", powerHP: "4", powerKW: "3.0", maxHead: "42", maxFlow: "22", weight: "58" },
      { model: "BL16-4/BLT16-4", powerHP: "5.5", powerKW: "4.0", maxHead: "56", maxFlow: "22", weight: "65" },
      { model: "BL16-5/BLT16-5", powerHP: "7.5", powerKW: "5.5", maxHead: "69", maxFlow: "22", weight: "88" },
      { model: "BL16-6/BLT16-6", powerHP: "7.5", powerKW: "5.5", maxHead: "83", maxFlow: "22", weight: "90" },
      { model: "BL16-8/BLT16-8", powerHP: "10", powerKW: "7.5", maxHead: "111", maxFlow: "22", weight: "99" },
      { model: "BL16-10/BLT16-10", powerHP: "15", powerKW: "11.0", maxHead: "139", maxFlow: "22", weight: "182" },
      { model: "BL16-12/BLT16-12", powerHP: "15", powerKW: "11.0", maxHead: "167", maxFlow: "22", weight: "185" },
      // BL20 Series (seakoo catalog) - 14-30 m³/h, 28-222m
      { model: "BL20-2/BLT20-2", powerHP: "3", powerKW: "2.2", maxHead: "28", maxFlow: "30", weight: "52" },
      { model: "BL20-3/BLT20-3", powerHP: "4", powerKW: "3.0", maxHead: "42", maxFlow: "30", weight: "63" },
      { model: "BL20-4/BLT20-4", powerHP: "5.5", powerKW: "4.0", maxHead: "56", maxFlow: "30", weight: "85" },
      { model: "BL20-5/BLT20-5", powerHP: "7.5", powerKW: "5.5", maxHead: "69", maxFlow: "30", weight: "89" },
      { model: "BL20-6/BLT20-6", powerHP: "7.5", powerKW: "5.5", maxHead: "83", maxFlow: "30", weight: "95" },
      { model: "BL20-8/BLT20-8", powerHP: "10", powerKW: "7.5", maxHead: "111", maxFlow: "30", weight: "177" },
      { model: "BL20-10/BLT20-10", powerHP: "15", powerKW: "11.0", maxHead: "139", maxFlow: "30", weight: "182" },
      { model: "BL20-12/BLT20-12", powerHP: "15", powerKW: "11.0", maxHead: "167", maxFlow: "30", weight: "196" },
    ],
    performanceCurves: [
      { model: "BL8-20", color: "#00D4AA", data: [{ flow: 0, head: 203 }, { flow: 2, head: 201 }, { flow: 4, head: 198 }, { flow: 6, head: 192 }, { flow: 8, head: 180 }, { flow: 10, head: 160 }, { flow: 12, head: 130 }] },
      { model: "BL8-12", color: "#4ECDC4", data: [{ flow: 0, head: 122 }, { flow: 2, head: 120 }, { flow: 4, head: 117 }, { flow: 6, head: 112 }, { flow: 8, head: 103 }, { flow: 10, head: 88 }, { flow: 12, head: 65 }] },
      { model: "BL8-6", color: "#FFD93D", data: [{ flow: 0, head: 60 }, { flow: 2, head: 59 }, { flow: 4, head: 57 }, { flow: 6, head: 53 }, { flow: 8, head: 46 }, { flow: 10, head: 34 }, { flow: 12, head: 15 }] },
    ],
  },
];

// Accessories data
export interface Accessory {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  specs: ProductSpec[];
}

export const accessories: Accessory[] = [
  {
    id: "pressure-controller",
    slug: "pressure-controller",
    name: "Pressure Controller",
    subtitle: "Automatic Pump Control Systems",
    description: "Intelligent electronic pressure controllers for automatic start/stop control of single-phase pumps. Maintains constant water pressure, protects against dry running, and features built-in check valve for reliable performance. Models available from LLASPA/欧亿电器 LS series with multiple configuration options.",
    image: "/images/products/controller.png",
    features: [
      "Automatic start/stop when tap opened/closed",
      "Constant pressure regulation",
      "Dry-run protection",
      "Built-in check valve",
      "Adjustable pressure settings",
      "LED status indicators"
    ],
    specs: [
      { label: "Voltage", value: "220-240V / 50-60Hz" },
      { label: "Max Current", value: "10A" },
      { label: "Max Power", value: "1.5 kW" },
      { label: "Max Pressure", value: "10 bar" },
      { label: "Protection", value: "IP65" },
      { label: "Connection", value: "1″ / 1¼″" },
    ],
  },
  {
    id: "pressure-tank",
    slug: "pressure-tank",
    name: "Pressure Tank",
    subtitle: "Diaphragm Pressure Tanks",
    description: "Diaphragm-type pressure tanks for water storage and pressure maintenance in domestic water supply systems. Pre-charged with air for optimal performance. Available in 24L and 50L sizes from DAGER accessories catalog.",
    image: "/images/products/tank.png",
    features: [
      "Butyl diaphragm for long service life",
      "Pre-charged air pressure",
      "Reduces pump cycling",
      "Maintains system pressure",
      "Corrosion-resistant steel shell",
      "Easy installation with standard connections"
    ],
    specs: [
      { label: "Capacity", value: "24L / 50L" },
      { label: "Max Pressure", value: "10 bar" },
      { label: "Pre-charge", value: "1.5 bar" },
      { label: "Connection", value: "1″" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Diaphragm", value: "Butyl Rubber" },
    ],
  },
  {
    id: "float-switch",
    slug: "float-switch",
    name: "Float Switch",
    subtitle: "Automatic Level Control Switch",
    description: "Float switch for automatic level control of submersible pumps in tanks, sumps, and basins. Provides reliable start/stop operation based on water level without manual intervention.",
    image: "/images/products/float-switch.png",
    features: [
      "Automatic pump start/stop",
      "Adjustable cable length",
      "Mercury-free design",
      "Splash-proof IP68 rated",
      "Suitable for sewage and clean water",
      "Universal pump compatibility"
    ],
    specs: [
      { label: "Voltage", value: "250V AC" },
      { label: "Current", value: "10A" },
      { label: "Cable", value: "5m / 10m" },
      { label: "Protection", value: "IP68" },
      { label: "Operation", value: "Micro Switch" },
    ],
  },
];
"""

output_path = "C:/Users/华为/.qclaw/workspace-37i6raipm851ul5j/alfagrand-next/src/data/products.ts"

# Post-process: fix × character and double-quote issues
PRODUCTS_TS = PRODUCTS_TS.replace('\u00d7', 'x')
# Fix inletOutlet values: "1"x1"" -> '1" x 1"'
import re
def fix_inlet(s):
    # Match inletOutlet: "..." patterns with embedded quotes
    return re.sub(
        r'inletOutlet:\s*"((?:[^"]|"[^",])*?)"',
        lambda m: "inletOutlet: '" + m.group(1) + "'",
        s
    )
PRODUCTS_TS = fix_inlet(PRODUCTS_TS)

with open(output_path, "w", encoding="utf-8") as f:
    f.write(PRODUCTS_TS)
print(f"Written {len(PRODUCTS_TS)} bytes to {output_path}")
