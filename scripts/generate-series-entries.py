"""
Generate 15 missing SeriesData entries for the series page.
Reads model data from products.ts and creates full SeriesData objects.
"""

import re
import json

def esc(s):
    """Escape newlines and quotes for TS string output."""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")

# ─── Helper: extract models for a specific series from products.ts ───
def read_products_ts():
    """Read products.ts and parse models by category and series name prefix."""
    path = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\data\products.ts"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    return content

def parse_models(content, category_slug, series_prefixes):
    """
    Extract models from a category section.
    Returns dict: {series_name: [model_objects]}
    """
    # Find the category block
    slug_key = f'slug: "{category_slug}"'
    idx = content.find(slug_key)
    if idx == -1:
        return {}
    
    # Find the models array for this category
    models_start = content.find("models: [", idx)
    if models_start == -1:
        return {}
    
    # Find closing bracket of models array
    depth = 0
    models_end = models_start
    brace_start = content.find("[", models_start)
    i = brace_start
    while i < len(content):
        if content[i] == '[':
            depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                models_end = i + 1
                break
        i += 1
    
    models_str = content[brace_start:models_end]
    
    # Parse each model line
    models = []
    for line in models_str.split('\n'):
        match = re.search(r'model:\s*"([^"]+)"', line)
        if not match:
            continue
        model_name = match.group(1)
        
        powerHP = re.search(r'powerHP:\s*"([^"]*)"', line)
        powerKW = re.search(r'powerKW:\s*"([^"]*)"', line)
        maxHead = re.search(r'maxHead:\s*"([^"]*)"', line)
        maxFlow = re.search(r'maxFlow:\s*"([^"]*)"', line)
        suctionHead = re.search(r'suctionHead:\s*"([^"]*)"', line)
        inletOutlet = re.search(r'inletOutlet:\s*([''"][^''"]*[''"])', line)
        weight = re.search(r'weight:\s*"([^"]*)"', line)
        voltage = re.search(r'voltage:\s*"([^"]*)"', line)
        maxParticle = re.search(r'maxParticle:\s*"([^"]*)"', line)
        
        model = {
            "model": model_name,
            "powerHP": powerHP.group(1) if powerHP else "",
            "powerKW": powerKW.group(1) if powerKW else "",
            "maxHead": maxHead.group(1) if maxHead else "",
            "maxFlow": maxFlow.group(1) if maxFlow else "",
            "suctionHead": suctionHead.group(1) if suctionHead else "",
            "inletOutlet": inletOutlet.group(1).strip("'\"") if inletOutlet else "",
            "weight": weight.group(1) if weight else "",
        }
        if voltage and voltage.group(1):
            model["voltage"] = voltage.group(1)
        if maxParticle and maxParticle.group(1):
            model["maxParticle"] = maxParticle.group(1)
        
        # Determine which series this model belongs to
        matched_series = None
        for series_name, prefixes in series_prefixes.items():
            for prefix in prefixes:
                if model_name.startswith(prefix):
                    matched_series = series_name
                    break
            if matched_series:
                break
        
        if matched_series:
            model["_series"] = matched_series
            models.append(model)
    
    # Group by series
    grouped = {}
    for m in models:
        s = m.pop("_series")
        if s not in grouped:
            grouped[s] = []
        grouped[s].append(m)
    
    return grouped

def to_ts_model(m):
    """Format a model as TypeScript object literal."""
    parts = [f'{{ model: "{m["model"]}"']
    for key in ["powerHP", "powerKW", "maxHead", "maxFlow", "suctionHead", "inletOutlet", "weight", "voltage", "maxParticle"]:
        if key in m and m[key]:
            parts.append(f', {key}: "{m[key]}"')
        elif key == "inletOutlet":
            parts.append(f', {key}: ""')
    parts.append(" }")
    return "".join(parts)


# ─── Series definitions ───
# Each series needs: slug, category_slug, model_prefix, hero data, features, apps, faqs

SERIES_DEFS = [
    # ===== PERIPHERAL PUMP =====
    {
        "key": "peripheral-pump/wzb-series",
        "title": "WZB SERIES",
        "subtitle": "Automatic Self-Priming Peripheral Pumps",
        "desc": "The WZB Series combines peripheral pump pressure with automatic pressure control for maintenance-free domestic water supply. The built-in pressure switch and tank provide on-demand start/stop operation — simply open a tap and the pump delivers water instantly. Three models cover 35-65m head range for single-family homes, small apartments, and garden irrigation.",
        "heroCheckmarks": ["35-65m Head Range", "2.0-3.5 m³/h Flow", "Auto Pressure Control", "Built-in Tank"],
        "modelImages": [
            {"src": "/images/products/peripheral-pump.png", "label": "1WZB-35"},
            {"src": "/images/products/peripheral-pump.png", "label": "1WZB-45"},
            {"src": "/images/products/peripheral-pump.png", "label": "1WZB-65"},
        ],
        "stats": {"iconLayers": "Layers", "models": "3", "iconGauge": "Gauge", "headRange": "35-65m", "iconDroplets": "Droplets", "flowRange": "2.0-3.5m³/h", "iconZap": "Zap", "powerRange": "0.37-0.75kW"},
        "overviewTitle": "WZB Series Overview",
        "overviewDesc": "The WZB Series integrates a peripheral pump, pressure switch, and small pressure tank into a complete automatic water supply system. When a tap opens and pressure drops, the pump starts automatically; when the tap closes, the pump stops. The built-in check valve retains water in the pump body for instant repriming. With 8m suction lift and cast iron construction, the WZB Series is the simplest path to pressurized home water — no external pressure controller needed, just connect power and pipework.",
        "overviewImage": "/images/products/peripheral-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · Standard residential · All WZB models"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["1WZB-"],
        "category_slug": "peripheral-pump",
        "features": [
            {"icon": "Zap", "title": "Auto Start/Stop\nControl", "desc": "Built-in pressure switch and diaphragm tank. Pump automatically starts when tap opens and stops when closed — no manual operation needed."},
            {"icon": "Shield", "title": "Complete\nWater System", "desc": "Integrated pressure tank eliminates water hammer and reduces motor cycling. Everything you need for domestic water pressurization in one unit."},
            {"icon": "Gauge", "title": "Peripheral Pump\nPressure", "desc": "Star-shaped brass impeller generates high head pressure from a compact single-stage design. Perfect for multi-story home water supply."},
            {"icon": "Wrench", "title": "Easy\nInstallation", "desc": "Simple two-pipe connection (suction + discharge). Built-in thermal protector and easy-access priming plug. Install and forget."},
        ],
        "applications": [
            {"icon": "Home", "label": "Domestic\nWater Supply", "desc": "Complete plug-and-play pressurized water system for single-family homes, apartments, and holiday houses."},
            {"icon": "Trees", "label": "Garden\nIrrigation", "desc": "Powers sprinklers and drip irrigation with automatic start/stop — no need to manually switch the pump."},
            {"icon": "Droplets", "label": "Rainwater\nSystems", "desc": "Automatic rainwater harvesting distribution. Pump starts when toilet/tap demands water, stops when demand ends."},
            {"icon": "Factory", "label": "Light\nCommercial", "desc": "Small commercial water supply for workshops, car washes, and light industrial cleaning stations."},
        ],
        "faqs": [
            {"q": "Do I need an external pressure controller with WZB?", "a": "No. The WZB Series has a built-in mechanical pressure switch and diaphragm tank that handle automatic start/stop. Simply connect the suction and discharge pipes, prime the pump, and plug into power. The system operates fully automatically — no external controller required."},
            {"q": "What's the difference between WZB and AWZB?", "a": "Both are automatic self-priming peripheral pumps. WZB uses a mechanical pressure switch and smaller tank for standard domestic use. AWZB adds a larger diaphragm tank and electronic pressure controller for smoother operation with less pump cycling — ideal for homes with frequent water usage."},
            {"q": "Can WZB pump from a well?", "a": "Yes, WZB pumps can lift water from wells up to 8m depth. For wells deeper than 8m, consider our jet pump (JET Series) which can lift up to 10m, or a submersible deep well pump for depths beyond 10m."},
        ],
        "ctaTitle": "NEED HELP CHOOSING THE RIGHT AUTOMATIC WATER PUMP?",
        "ctaDesc": "Our team can help you select the optimal WZB or AWZB automatic pump for your home water supply. Contact us for technical specifications, pricing, and installation advice.",
    },
    {
        "key": "peripheral-pump/awzb-series",
        "title": "AWZB SERIES",
        "subtitle": "Automatic Self-Priming Peripheral Pumps — Enhanced",
        "desc": "The AWZB Series upgrades the WZB automatic pump concept with a larger diaphragm tank and enhanced pressure control for smoother, more responsive water delivery. Six models span 24-50m head range with flow rates up to 4.5 m³/h — ideal for larger homes, multi-story buildings, and continuous-use domestic applications.",
        "heroCheckmarks": ["24-50m Head Range", "1.8-4.5 m³/h Flow", "Enhanced Auto Control", "6 Models"],
        "modelImages": [
            {"src": "/images/products/peripheral-pump.png", "label": "1AWZB125"},
            {"src": "/images/products/peripheral-pump.png", "label": "1AWZB370"},
            {"src": "/images/products/peripheral-pump.png", "label": "1AWZB750"},
            {"src": "/images/products/peripheral-pump.png", "label": "1.5AWZB1100"},
        ],
        "stats": {"iconLayers": "Layers", "models": "6", "iconGauge": "Gauge", "headRange": "24-50m", "iconDroplets": "Droplets", "flowRange": "1.8-4.5m³/h", "iconZap": "Zap", "powerRange": "0.125-1.1kW"},
        "overviewTitle": "AWZB Series Overview",
        "overviewDesc": "The AWZB Series represents the premium tier of automatic peripheral pumps. Starting from the ultra-compact 1AWZB125 (0.17HP) for small homes and holiday cabins, through the popular mid-range 1AWZB370/550 models, to the powerful 1.5AWZB1100 (1.5HP) with 1.5-inch connections for larger properties. All models feature 9m suction lift, built-in check valves, and thermal protection. The enhanced pressure control system minimizes pump cycling during intermittent use — reducing motor starts by up to 40% compared to basic mechanical switches.",
        "overviewImage": "/images/products/peripheral-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · Standard residential · All AWZB models"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["1AWZB", "1.5AWZB"],
        "category_slug": "peripheral-pump",
        "features": [
            {"icon": "Zap", "title": "Smooth Pressure\nControl", "desc": "Larger diaphragm tank with enhanced control mechanism. Reduces motor cycling by up to 40% during intermittent tap use for longer pump and switch life."},
            {"icon": "Layers", "title": "Wide Power\nRange", "desc": "Six models from 0.17HP to 1.5HP — from tiny holiday cabins (1AWZB125) to large family homes with extensive gardens (1.5AWZB1100)."},
            {"icon": "Gauge", "title": "Maximum\nSuction Lift", "desc": "Industry-leading 9m suction lift across all models. Pumps from deeper wells and tanks than standard peripheral designs."},
            {"icon": "Shield", "title": "Premium\nDurability", "desc": "Cast iron pump body, brass impeller, carbon-ceramic seal, and copper-wound motor with extended-life thermal protection."},
        ],
        "applications": [
            {"icon": "Home", "label": "Large Home\nWater Supply", "desc": "Premium pressurized water for large families, multi-bathroom homes, and multi-story residences with high simultaneous demand."},
            {"icon": "Building2", "label": "Small Commercial\nBuildings", "desc": "Reliable pressured water for small offices, B&Bs, small hotels, and commercial kitchens."},
            {"icon": "Trees", "label": "Professional\nGardening", "desc": "High-flow garden and landscape irrigation. Handles multiple sprinkler zones simultaneously."},
            {"icon": "Droplets", "label": "Tank\nDistribution", "desc": "Distribute water from storage tanks across properties with automatic pressure maintenance."},
        ],
        "faqs": [
            {"q": "Which AWZB model for a 3-story home?", "a": "For a 3-story home (~10m static lift) plus friction losses (~10-15m) and 2-3 bar outlet pressure (20-30m), you need roughly 40-55m total head. The 1AWZB550 (38m) or 1AWZB750 (44m) are suitable depending on simultaneous demand. For homes with 3+ bathrooms running simultaneously, the 1.5AWZB1100 (50m head, 4.5 m³/h) provides extra flow capacity."},
            {"q": "Is AWZB suitable for continuous operation?", "a": "AWZB pumps are designed for intermittent domestic use (S3 duty). For continuous operation (e.g. irrigation running for hours), choose a model one size larger than calculated and ensure adequate tank cooling. For 24/7 industrial duty, see our centrifugal pump or multi-stage pump series rated for continuous (S1) operation."},
        ],
        "ctaTitle": "NEED HELP SIZING YOUR AWZB AUTOMATIC PUMP?",
        "ctaDesc": "Our team can calculate your exact head and flow requirements based on your home specifications. Contact us for model selection, pricing, and OEM/ODM solutions.",
    },
    {
        "key": "peripheral-pump/mkp-series",
        "title": "MKP SERIES",
        "subtitle": "Compact Peripheral Pumps",
        "desc": "The MKP Series is ALFAGRAND's most compact peripheral pump line — designed for applications where space is at a premium. Despite their small footprint, MKP pumps deliver 36-60m head with cast iron durability and brass impeller precision. Three models cover light domestic water supply, pressure boosting, and small-scale irrigation at an attractive price point.",
        "heroCheckmarks": ["36-60m Head Range", "1.56-3.6 m³/h Flow", "Compact Design", "Cast Iron Body"],
        "modelImages": [
            {"src": "/images/products/peripheral-pump.png", "label": "MKP60-1"},
            {"src": "/images/products/peripheral-pump.png", "label": "MKP70-1"},
            {"src": "/images/products/peripheral-pump.png", "label": "MKP80-1"},
        ],
        "stats": {"iconLayers": "Layers", "models": "3", "iconGauge": "Gauge", "headRange": "36-60m", "iconDroplets": "Droplets", "flowRange": "1.56-3.6m³/h", "iconZap": "Zap", "powerRange": "0.37-0.75kW"},
        "overviewTitle": "MKP Series Overview",
        "overviewDesc": "The MKP Series packs peripheral pump performance into ALFAGRAND's smallest monobloc form factor. The compact design fits into tight pump rooms, under sinks, and in wall-mounted installations where larger pumps cannot go. Despite the small size, MKP pumps deliver genuine peripheral pump head pressures — the MKP80-1 achieves 60m head and 3.6 m³/h flow from just 0.75kW input. The lightweight design (starting at 5.5 kg) makes MKP the easiest peripheral pump to transport, handle, and install.",
        "overviewImage": "/images/products/peripheral-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · Standard residential · All MKP models"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["MKP"],
        "category_slug": "peripheral-pump",
        "features": [
            {"icon": "Package", "title": "Ultra-Compact\nFootprint", "desc": "Smallest peripheral pump in ALFAGRAND's range — fits in wall cabinets, under sinks, and in tight mechanical spaces where other pumps cannot go."},
            {"icon": "Gauge", "title": "Full Peripheral\nPressure", "desc": "Despite compact size, delivers genuine 36-60m head from a single-stage star impeller. MKP80-1 achieves 60m without multi-stage complexity."},
            {"icon": "Sun", "title": "Lightweight\nHandling", "desc": "Starting at just 5.5 kg — the easiest peripheral pump to carry, mount, and install. Perfect for DIY installation and portable applications."},
            {"icon": "Shield", "title": "Cast Iron\nCore", "desc": "Don't let the size fool you — full cast iron body and brass impeller for years of reliable operation in domestic water supply."},
        ],
        "applications": [
            {"icon": "Home", "label": "Apartment\nBoosting", "desc": "Compact pressure boosting for apartments and condominium units with limited mechanical space."},
            {"icon": "Wrench", "label": "DIY Home\nProjects", "desc": "Lightweight and simple installation makes MKP the ideal choice for DIY water system projects and hobby applications."},
            {"icon": "Trees", "label": "Small Garden\nIrrigation", "desc": "Powers single-zone sprinkler systems and drip irrigation for small gardens and greenhouses."},
            {"icon": "Droplets", "label": "Tank\nTransfer", "desc": "Transfer water between tanks or from storage to point of use in tight spaces."},
        ],
        "faqs": [
            {"q": "How does MKP compare to PM and QB series?", "a": "MKP is the most compact and lightweight option — ideal for tight spaces and portable use. PM series offers premium IE5 permanent magnet motor efficiency. QB series provides the best value with proven induction motor technology. All three deliver peripheral pump head pressure; choose based on your space, budget, and efficiency priorities."},
            {"q": "Is MKP suitable for whole-house water supply?", "a": "MKP60-1 and MKP70-1 are suitable for small single-story homes and apartments. For larger homes with multiple bathrooms, consider the MKP80-1 (60m head) or step up to the QB/PM series with higher flow capacity."},
        ],
        "ctaTitle": "NEED A COMPACT PUMPING SOLUTION?",
        "ctaDesc": "Our team can help determine if the MKP compact peripheral pump meets your space and pressure requirements. Contact us for specifications, pricing, and availability.",
    },

    # ===== CENTRIFUGAL PUMP =====
    {
        "key": "centrifugal-pump/mcp-series",
        "title": "MCP SERIES",
        "subtitle": "Monobloc Centrifugal Pumps — Compact Range",
        "desc": "The MCP Series delivers efficient centrifugal water transfer in a space-saving monobloc design. Five models span 20-45m head with flow rates up to 8.4 m³/h — ideal for domestic water supply, garden irrigation, and small agricultural applications. The close-coupled motor-pump design eliminates alignment issues and simplifies installation.",
        "heroCheckmarks": ["20-45m Head Range", "4.8-8.4 m³/h Flow", "Compact Monobloc", "5 Models"],
        "modelImages": [
            {"src": "/images/products/centrifugal-pump.png", "label": "MCP130A"},
            {"src": "/images/products/centrifugal-pump.png", "label": "MCP158A"},
            {"src": "/images/products/centrifugal-pump.png", "label": "MCP180A"},
            {"src": "/images/products/centrifugal-pump.png", "label": "MCP200A"},
        ],
        "stats": {"iconLayers": "Layers", "models": "5", "iconGauge": "Gauge", "headRange": "20-45m", "iconDroplets": "Droplets", "flowRange": "4.8-8.4m³/h", "iconZap": "Zap", "powerRange": "0.37-1.5kW"},
        "overviewTitle": "MCP Series Overview",
        "overviewDesc": "The MCP monobloc centrifugal pump series combines a closed brass impeller with a cast iron volute in a compact, close-coupled design. The motor shaft directly drives the impeller — no coupling, no alignment, no separate baseplate needed. Five power ratings cover domestic, garden, and light agricultural water transfer with 9m suction lift capability. The simple two-bolt mounting and standard threaded connections make MCP pumps the fastest centrifugal pump to install in the ALFAGRAND range.",
        "overviewImage": "/images/products/centrifugal-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · MCP130A / MCP146A / MCP158A"},
            {"label": "Three Phase", "desc": "380V / 50Hz · MCP158A / MCP180A / MCP200A"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["MCP"],
        "category_slug": "centrifugal-pump",
        "features": [
            {"icon": "Package", "title": "Close-Coupled\nDesign", "desc": "Motor shaft directly drives the impeller — no coupling to align, no separate baseplate. Simplest centrifugal pump to install and maintain."},
            {"icon": "Gauge", "title": "Efficient\nHydraulics", "desc": "Closed brass impeller with precision-machined volute achieves high hydraulic efficiency for lower electricity costs."},
            {"icon": "Shield", "title": "9m Suction\nLift", "desc": "All five models deliver 9m suction lift — better than many centrifugal designs. Ideal for tank and shallow well applications."},
            {"icon": "Wrench", "title": "Standard\nConnections", "desc": "Threaded BSP connections from 1\" to 1.25\". Compatible with standard plumbing fittings worldwide — no special adapters needed."},
        ],
        "applications": [
            {"icon": "Home", "label": "Domestic\nTransfer", "desc": "Transfer water from storage tanks to homes, gardens, and outbuildings."},
            {"icon": "Trees", "label": "Garden\nIrrigation", "desc": "Efficient sprinkler and drip irrigation for medium to large residential gardens."},
            {"icon": "Droplets", "label": "Tank Filling\n& Emptying", "desc": "Quick tank-to-tank transfer and tank filling from wells or water sources."},
            {"icon": "Factory", "label": "Small Farm\nWater Supply", "desc": "Reliable water supply for small livestock operations, nurseries, and hobby farms."},
        ],
        "faqs": [
            {"q": "What's the difference between MCP and CP(m) series?", "a": "MCP series is the compact monobloc version with integrated motor-pump assembly — simpler installation and lower cost. CP(m) series is the larger-frame centrifugal with separate pump and motor — higher flow (up to 8.0 m³/h) and head (up to 52m), designed for more demanding applications. Choose MCP for standard domestic use; choose CP(m) for higher flow requirements."},
            {"q": "Do MCP pumps need priming?", "a": "Yes, like all standard centrifugal pumps, MCP pumps must be primed (filled with water) before first start. The pump body has a priming plug on top. For automatic priming without manual intervention, consider our self-priming jet pump series."},
        ],
        "ctaTitle": "NEED HELP SELECTING THE RIGHT CENTRIFUGAL PUMP?",
        "ctaDesc": "Our team can help match the optimal MCP centrifugal pump to your flow and head requirements. Contact us for technical support, pricing, and OEM/ODM options.",
    },
    {
        "key": "centrifugal-pump/dk-series",
        "title": "DK SERIES",
        "subtitle": "Double-Suction Centrifugal Pumps",
        "desc": "The DK Series delivers high-flow water transfer with up to 22 m³/h in a robust cast iron design. Three sizes (1\", 1.5\", 2\") cover small to medium flow applications — ideal for agricultural irrigation, industrial water circulation, and commercial water supply where volume matters more than pressure.",
        "heroCheckmarks": ["14-20m Head Range", "6.5-22 m³/h Flow", "3 Frame Sizes", "High Volume Design"],
        "modelImages": [
            {"src": "/images/products/centrifugal-pump.png", "label": "1DK-14"},
            {"src": "/images/products/centrifugal-pump.png", "label": "1.5DK-20"},
            {"src": "/images/products/centrifugal-pump.png", "label": "2DK-20"},
        ],
        "stats": {"iconLayers": "Layers", "models": "3", "iconGauge": "Gauge", "headRange": "14-20m", "iconDroplets": "Droplets", "flowRange": "6.5-22m³/h", "iconZap": "Zap", "powerRange": "0.37-1.5kW"},
        "overviewTitle": "DK Series Overview",
        "overviewDesc": "The DK Series is purpose-built for high-volume, low-to-medium head water transfer. The wide impeller design prioritizes flow rate over pressure — the 2DK-20 delivers 22 m³/h at just 20m head from a 2.2kW motor. The three frame sizes (1DK, 1.5DK, 2DK) scale from 6.5 to 22 m³/h to match different pipe diameters. All models feature cast iron construction, replaceable wear rings, and standard flanged or threaded connections. The ideal centrifugal pump when you need to move lots of water at moderate pressure.",
        "overviewImage": "/images/products/centrifugal-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · 1DK-14"},
            {"label": "Three Phase", "desc": "380V / 50Hz · 1.5DK-20 / 2DK-20"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["1DK-", "1.5DK-", "2DK-"],
        "category_slug": "centrifugal-pump",
        "features": [
            {"icon": "Droplets", "title": "High-Volume\nDesign", "desc": "Wide impeller geometry optimized for maximum flow. 2DK-20 delivers 22 m³/h — fill a 10,000L tank in under 30 minutes."},
            {"icon": "Layers", "title": "Three Frame\nSizes", "desc": "1DK (1\" connections, 6.5 m³/h), 1.5DK (1.5\" connections, 16 m³/h), 2DK (2\" connections, 22 m³/h). Match pipe size to flow requirement."},
            {"icon": "Shield", "title": "Heavy-Duty\nCast Iron", "desc": "Thick-wall cast iron volute and bracket for continuous-duty agricultural and industrial service."},
            {"icon": "Wrench", "title": "Replaceable\nWear Rings", "desc": "Front and back wear rings protect the impeller and volute from abrasive wear — easy replacement restores original performance."},
        ],
        "applications": [
            {"icon": "Trees", "label": "Agricultural\nIrrigation", "desc": "High-volume field and crop irrigation. Move large volumes of water at moderate pressure across farms and plantations."},
            {"icon": "Factory", "label": "Industrial\nCirculation", "desc": "Cooling water circulation, process water transfer, and wash-down systems in factories and processing plants."},
            {"icon": "Droplets", "label": "Pond &\nPool Filling", "desc": "Quick filling and circulation for ponds, swimming pools, reservoirs, and water features."},
            {"icon": "Building2", "label": "Commercial\nSupply", "desc": "Bulk water transfer for commercial buildings, construction sites, and municipal applications."},
        ],
        "faqs": [
            {"q": "When should I choose DK over CP(m) or MCP?", "a": "Choose DK when you need high flow (10+ m³/h) at moderate head (under 20m). CP(m) delivers higher head (up to 52m) at moderate flow (up to 8 m³/h). MCP is the compact domestic option (up to 8.4 m³/h). DK is the volume specialist — ideal for irrigation, pond filling, and bulk transfer."},
            {"q": "Can DK pumps handle dirty water?", "a": "Standard DK pumps are designed for clean or slightly turbid water. For water with significant solids or debris, see our submersible sewage pump series. For agricultural water with silt, consider models with open impeller options."},
        ],
        "ctaTitle": "NEED A HIGH-VOLUME WATER TRANSFER SOLUTION?",
        "ctaDesc": "Our team can help select the right DK pump size for your flow requirements. Contact us for technical specifications, pricing, and agricultural pump solutions.",
    },
    {
        "key": "centrifugal-pump/shfm-series",
        "title": "SHF(m) SERIES",
        "subtitle": "High-Flow Centrifugal Pumps",
        "desc": "The SHF(m) Series is ALFAGRAND's maximum-flow centrifugal pump line — delivering up to 72 m³/h for large-scale water transfer. Four models span 14.7-25.5m head with massive flow capacity. Designed for agricultural irrigation networks, industrial water supply, flood control, and municipal water management applications.",
        "heroCheckmarks": ["14.7-25.5m Head Range", "30-72 m³/h Flow", "Large Frame Design", "4 Models"],
        "modelImages": [
            {"src": "/images/products/centrifugal-pump.png", "label": "SHF(m)5AM"},
            {"src": "/images/products/centrifugal-pump.png", "label": "SHF(m)5BM"},
            {"src": "/images/products/centrifugal-pump.png", "label": "SHF(m)6A"},
            {"src": "/images/products/centrifugal-pump.png", "label": "SHF(m)6B"},
        ],
        "stats": {"iconLayers": "Layers", "models": "4", "iconGauge": "Gauge", "headRange": "14.7-25.5m", "iconDroplets": "Droplets", "flowRange": "30-72m³/h", "iconZap": "Zap", "powerRange": "1.1-2.2kW"},
        "overviewTitle": "SHF(m) Series Overview",
        "overviewDesc": "The SHF(m) Series represents ALFAGRAND's largest centrifugal pump platform for maximum-flow applications. With 2\" to 3\" connections, these pumps move water at industrial scale — the SHF(m)6A delivers 72 m³/h, enough to fill an Olympic swimming pool in under 35 hours. The split-case or end-suction configuration with large-diameter impellers is optimized for efficiency at high flow rates. All models feature heavy-duty cast iron construction, replaceable wear components, and oversized bearings for continuous-duty operation in agricultural, industrial, and municipal service.",
        "overviewImage": "/images/products/centrifugal-pump.png",
        "phaseOptions": [
            {"label": "Three Phase", "desc": "380V / 50Hz · All SHF(m) models · Industrial power required"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["SHF(m)", "SHF"],
        "category_slug": "centrifugal-pump",
        "features": [
            {"icon": "Droplets", "title": "Maximum\nFlow Capacity", "desc": "Up to 72 m³/h — the highest flow rate in ALFAGRAND's centrifugal pump range. Designed for applications where volume is the priority."},
            {"icon": "Shield", "title": "Industrial-Grade\nConstruction", "desc": "Oversized bearings, heavy-wall cast iron, and large-diameter shaft for continuous-duty reliability in demanding environments."},
            {"icon": "Gauge", "title": "Optimized\nHydraulics", "desc": "Large-diameter impeller with precision volute designed for peak efficiency at high flow rates — lower energy cost per cubic meter pumped."},
            {"icon": "Wrench", "title": "Serviceable\nDesign", "desc": "Replaceable wear rings, mechanical seal, and bearings. All serviceable without removing pipework — minimizing downtime."},
        ],
        "applications": [
            {"icon": "Trees", "label": "Large-Scale\nIrrigation", "desc": "Field and plantation irrigation networks. Powers multiple sprinkler lines and flood irrigation systems simultaneously."},
            {"icon": "Factory", "label": "Industrial\nWater Supply", "desc": "Process water, cooling water, and wash-down supply for factories, mines, and processing plants."},
            {"icon": "Building2", "label": "Municipal\nWater", "desc": "Water transfer for municipal supply, flood control pumping stations, and construction dewatering."},
            {"icon": "Droplets", "label": "Aquaculture\nCirculation", "desc": "High-volume water circulation for fish farms, hatcheries, and aquaculture facilities."},
        ],
        "faqs": [
            {"q": "Do SHF(m) pumps require three-phase power?", "a": "Yes. All SHF(m) models require 380V three-phase power due to the 1.5-3HP motor sizes. Single-phase power is not sufficient for these high-flow pumps. Ensure your facility has three-phase electrical supply before ordering."},
            {"q": "What pipe size should I use with SHF(m) pumps?", "a": "SHF(m)5 series uses 2\" connections — use minimum 2\" pipe for suction and discharge. SHF(m)6 series uses 3\" connections — use minimum 3\" pipe. Undersized piping will cause cavitation, vibration, and reduced performance. Always match or exceed the pump connection size."},
        ],
        "ctaTitle": "NEED A HIGH-CAPACITY PUMPING SOLUTION?",
        "ctaDesc": "Our engineering team can design the complete SHF(m) pumping system for your large-scale water transfer needs. Contact us for specifications, system design, and pricing.",
    },
    {
        "key": "centrifugal-pump/scm-series",
        "title": "SCM SERIES",
        "subtitle": "Stainless Steel Centrifugal Pumps",
        "desc": "The SCM Series brings stainless steel construction to centrifugal pump design — ideal for potable water, food-grade applications, and corrosive environments. Three models deliver 20-35m head with flow rates up to 7.2 m³/h. The AISI 304 stainless steel pump body, impeller, and shaft ensure clean, contamination-free water transfer.",
        "heroCheckmarks": ["20-35m Head Range", "4.8-7.2 m³/h Flow", "AISI 304 Stainless", "3 Models"],
        "modelImages": [
            {"src": "/images/products/centrifugal-pump.png", "label": "SCM42"},
            {"src": "/images/products/centrifugal-pump.png", "label": "SCM42/0.75"},
            {"src": "/images/products/centrifugal-pump.png", "label": "SCM52"},
        ],
        "stats": {"iconLayers": "Layers", "models": "3", "iconGauge": "Gauge", "headRange": "20-35m", "iconDroplets": "Droplets", "flowRange": "4.8-7.2m³/h", "iconZap": "Zap", "powerRange": "0.37-0.75kW"},
        "overviewTitle": "SCM Series Overview",
        "overviewDesc": "The SCM Series is ALFAGRAND's stainless steel centrifugal pump platform. All wetted components — pump body, impeller, and shaft — are manufactured from AISI 304 stainless steel for corrosion-free, contamination-free water handling. This makes SCM pumps the preferred choice for drinking water systems, food and beverage processing, pharmaceutical water transfer, and any application where water purity is critical. Three models with 8m suction lift cover domestic to light commercial flow requirements.",
        "overviewImage": "/images/products/centrifugal-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · SCM42 / SCM42/0.75"},
            {"label": "Three Phase", "desc": "380V / 50Hz · SCM52"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["SCM"],
        "category_slug": "centrifugal-pump",
        "features": [
            {"icon": "Shield", "title": "304 Stainless\nWetted Parts", "desc": "Pump body, impeller, and shaft in AISI 304 — no rust, no contamination. Safe for drinking water and food-grade applications."},
            {"icon": "Droplets", "title": "Pure Water\nHandling", "desc": "Zero iron contact with pumped water. Ideal for potable water systems, food processing, breweries, and pharmaceutical water transfer."},
            {"icon": "Gauge", "title": "Consistent\nPerformance", "desc": "Smooth stainless steel hydraulic passages maintain efficiency over time — no corrosion buildup to degrade pump performance."},
            {"icon": "Wrench", "title": "Hygienic\nDesign", "desc": "Smooth surfaces with minimal crevices for easy cleaning and sanitation. Meets food-grade equipment standards."},
        ],
        "applications": [
            {"icon": "Home", "label": "Drinking Water\nSupply", "desc": "Safe, clean water pressurization for homes, restaurants, and food service facilities."},
            {"icon": "Factory", "label": "Food &\nBeverage", "desc": "Transfer of potable water, ingredients, and process water in food and beverage manufacturing."},
            {"icon": "Droplets", "label": "RO &\nFiltration", "desc": "Feed water supply for reverse osmosis systems, water purifiers, and filtration plants."},
            {"icon": "Building2", "label": "Healthcare\nFacilities", "desc": "Clean water supply for hospitals, clinics, laboratories, and pharmaceutical facilities."},
        ],
        "faqs": [
            {"q": "Is SCM suitable for seawater or brine?", "a": "AISI 304 stainless steel offers good corrosion resistance for fresh water and mild chemical environments, but is NOT suitable for seawater or high-chloride applications. For seawater, 316 stainless steel or duplex stainless is required. Contact our engineering team for marine-grade pump options."},
            {"q": "How does SCM compare to cast iron centrifugal pumps?", "a": "SCM uses stainless steel for all wetted parts — no rust, no metal taste, safe for drinking water. Cast iron pumps (CP(m), MCP) are more economical and equally durable but may impart slight iron taste and are not suitable for food-grade applications. Choose SCM when water purity matters; choose cast iron when budget is the priority."},
        ],
        "ctaTitle": "NEED A STAINLESS STEEL PUMP FOR CLEAN WATER?",
        "ctaDesc": "Our team can help you select the right SCM stainless steel centrifugal pump for your clean water application. Contact us for specifications, food-grade certifications, and pricing.",
    },
    {
        "key": "centrifugal-pump/cm-series",
        "title": "CM SERIES",
        "subtitle": "Compact Centrifugal Monobloc Pumps",
        "desc": "The CM Series provides a simplified, cost-effective centrifugal pump solution in a compact monobloc design. The CM100 and MCP-76 models deliver 35m head at 7.2 m³/h — covering the most common domestic and light commercial water transfer requirements in a single, straightforward package.",
        "heroCheckmarks": ["35m Head", "7.2 m³/h Flow", "Compact Monobloc", "2 Models"],
        "modelImages": [
            {"src": "/images/products/centrifugal-pump.png", "label": "CM100"},
            {"src": "/images/products/centrifugal-pump.png", "label": "MCP-76"},
        ],
        "stats": {"iconLayers": "Layers", "models": "2", "iconGauge": "Gauge", "headRange": "35m", "iconDroplets": "Droplets", "flowRange": "7.2m³/h", "iconZap": "Zap", "powerRange": "0.75kW"},
        "overviewTitle": "CM Series Overview",
        "overviewDesc": "The CM Series is ALFAGRAND's streamlined centrifugal pump — two models covering the most common domestic and light commercial water transfer specification (35m head, 7.2 m³/h). The CM100 features a standard centrifugal design, while the MCP-76 adds enhanced suction capability (9m lift) for deeper tank and shallow well applications. Both models share the same compact monobloc form factor with cast iron construction, brass impeller, and built-in thermal protection. The simplest, most cost-effective way to get reliable 1HP centrifugal pump performance.",
        "overviewImage": "/images/products/centrifugal-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · Both CM100 and MCP-76"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["CM100", "MCP-76"],
        "category_slug": "centrifugal-pump",
        "features": [
            {"icon": "Package", "title": "Streamlined\nSelection", "desc": "Two models, one specification. No complex sizing — if you need 35m head at 7.2 m³/h, the CM Series has your pump."},
            {"icon": "Gauge", "title": "Proven\nPerformance", "desc": "Time-tested centrifugal hydraulic design with brass impeller. Decades of field reliability in domestic water systems worldwide."},
            {"icon": "Sun", "title": "Budget-\nFriendly", "desc": "Simplified product line means competitive pricing without compromising on core centrifugal pump performance."},
            {"icon": "Wrench", "title": "Quick\nInstallation", "desc": "1\" threaded connections, two-bolt mounting, and lightweight design. Install in under 30 minutes with basic tools."},
        ],
        "applications": [
            {"icon": "Home", "label": "Domestic\nWater Supply", "desc": "Standard home water transfer and pressure boosting. The CM100 is the workhorse of domestic water systems."},
            {"icon": "Trees", "label": "Garden\nIrrigation", "desc": "Powers medium-sized garden sprinkler systems and drip irrigation networks."},
            {"icon": "Droplets", "label": "Tank\nTransfer", "desc": "Reliable tank-to-tank and tank-to-system water transfer for domestic and light commercial use."},
            {"icon": "Wrench", "label": "Workshop\nSupply", "desc": "General-purpose water supply for workshops, garages, and small commercial premises."},
        ],
        "faqs": [
            {"q": "CM100 or MCP-76 — which one?", "a": "Both deliver 35m head at 7.2 m³/h. The MCP-76 has better suction lift (9m vs 8m) — choose it if you're pulling from a tank or shallow well. The CM100 is slightly more affordable — choose it for standard flooded-suction or short-lift applications. When in doubt, MCP-76's extra suction margin is worth the small premium."},
            {"q": "Can I use CM Series for a two-story house?", "a": "Yes. 35m head is sufficient for a two-story house (~6m static) plus typical friction losses (~10m) and 2 bar (20m) outlet pressure, with margin to spare. For three or more stories, consider the CP(m) series with higher head capacity."},
        ],
        "ctaTitle": "NEED A RELIABLE STANDARD CENTRIFUGAL PUMP?",
        "ctaDesc": "The CM Series is ALFAGRAND's most popular centrifugal pump for a reason. Contact us for pricing, availability, and OEM/ODM options.",
    },
    {
        "key": "centrifugal-pump/cpm-open-series",
        "title": "CPm OPEN-IMPELLER SERIES",
        "subtitle": "Open-Impeller Centrifugal Pumps",
        "desc": "The CPm Open-Impeller Series is designed for water containing light solids, fibers, or suspended particles that would clog a standard closed impeller. Four models deliver 18-32m head with flow rates up to 150 L/min. The open impeller design passes solids up to 10mm without clogging — ideal for agricultural water, light wastewater, and industrial process fluids.",
        "heroCheckmarks": ["18-32m Head Range", "60-150 L/min Flow", "Open Impeller", "Solids to 10mm"],
        "modelImages": [
            {"src": "/images/products/centrifugal-pump.png", "label": "CPm158"},
            {"src": "/images/products/centrifugal-pump.png", "label": "CPm200"},
            {"src": "/images/products/centrifugal-pump.png", "label": "CPm250"},
        ],
        "stats": {"iconLayers": "Layers", "models": "4", "iconGauge": "Gauge", "headRange": "18-32m", "iconDroplets": "Droplets", "flowRange": "60-150L/min", "iconZap": "Zap", "powerRange": "0.37-1.5kW"},
        "overviewTitle": "CPm Open-Impeller Series Overview",
        "overviewDesc": "Unlike standard centrifugal pumps with closed impellers that clog when handling solids, the CPm open-impeller design features a single vane with generous clearance that passes particles up to 10mm. The open impeller also handles stringy and fibrous materials that would wrap around closed impeller vanes. Four models cover agricultural water with silt and organic matter, light industrial wastewater, and process fluids with suspended solids. Cast iron construction with replaceable wear plate for extended service life in abrasive conditions.",
        "overviewImage": "/images/products/centrifugal-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · CPm158 / CPm170"},
            {"label": "Three Phase", "desc": "380V / 50Hz · CPm200 / CPm250"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (L/min)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["CPm158", "CPm170", "CPm200", "CPm250"],
        "category_slug": "centrifugal-pump",
        "features": [
            {"icon": "Settings", "title": "Non-Clog\nImpeller", "desc": "Open single-vane impeller passes solids up to 10mm. Handles fibers, silt, and organic matter that would clog closed impellers."},
            {"icon": "Shield", "title": "Replaceable\nWear Plate", "desc": "Sacrificial wear plate protects the volute from abrasive wear. Easy replacement restores pump performance without replacing the entire pump body."},
            {"icon": "Gauge", "title": "Versatile\nFluid Handling", "desc": "Pumps clean water, turbid water, light slurries, and process fluids. Much more tolerant of water quality than standard centrifugal pumps."},
            {"icon": "Wrench", "title": "Easy\nCleaning", "desc": "Open design allows quick visual inspection and cleaning of the impeller without special tools. Remove the volute cover for full access."},
        ],
        "applications": [
            {"icon": "Trees", "label": "Agricultural\nWater", "desc": "Pumps river, canal, and pond water with silt and organic matter. Powers flood and furrow irrigation from natural water sources."},
            {"icon": "Factory", "label": "Industrial\nWastewater", "desc": "Transfer light industrial wastewater, wash water, and process fluids with suspended solids."},
            {"icon": "Droplets", "label": "Flood\nDrainage", "desc": "Dewatering flooded areas, construction sites, and basements where water contains debris and sediment."},
            {"icon": "Building2", "label": "Fish Farm\nCirculation", "desc": "Circulate pond water with organic solids in aquaculture and fish farming operations."},
        ],
        "faqs": [
            {"q": "What's the difference between open and closed impeller?", "a": "Closed impeller: two shrouds (front and back) with vanes between them — higher efficiency but clogs with solids. Open impeller: single shroud with exposed vanes — slightly lower efficiency but passes solids up to 10mm without clogging. Choose open impeller when water quality is inconsistent or contains particles."},
            {"q": "Maximum particle size for CPm open impeller?", "a": "Up to 10mm for spherical particles. For larger solids or heavy sewage applications, see our submersible sewage pump V(WQ) series which handles solids up to 35mm."},
        ],
        "ctaTitle": "NEED A PUMP FOR WATER WITH SOLIDS?",
        "ctaDesc": "Our team can help you choose between open-impeller centrifugal and submersible sewage pumps based on your water quality. Contact us for technical advice and pricing.",
    },

    # ===== SELF-PRIMING JET PUMP =====
    {
        "key": "self-priming-jet-pump/jet-series",
        "title": "JET SERIES",
        "subtitle": "Self-Priming Jet Pumps — Cast Iron Range",
        "desc": "The JET Series combines powerful self-priming jet pump technology with rugged cast iron construction. Five models from 0.5HP to 2HP deliver 32-55m head with up to 5.0 m³/h flow — covering everything from small home water supply to large property and light commercial boosting. Built-in ejector design provides reliable self-priming up to 10m suction lift.",
        "heroCheckmarks": ["32-55m Head Range", "2.5-5.0 m³/h Flow", "Self-Priming 10m", "5 Models · Cast Iron"],
        "modelImages": [
            {"src": "/images/products/jet-pump.png", "label": "JET60"},
            {"src": "/images/products/jet-pump.png", "label": "JET100"},
            {"src": "/images/products/jet-pump.png", "label": "JET150"},
            {"src": "/images/products/jet-pump.png", "label": "JET200"},
        ],
        "stats": {"iconLayers": "Layers", "models": "5", "iconGauge": "Gauge", "headRange": "32-55m", "iconDroplets": "Droplets", "flowRange": "2.5-5.0m³/h", "iconZap": "Zap", "powerRange": "0.37-1.5kW"},
        "overviewTitle": "JET Series Overview",
        "overviewDesc": "The JET Series is ALFAGRAND's proven workhorse for shallow well and tank water supply. The built-in ejector (Venturi) mechanism creates powerful suction that lifts water from depths up to 10 meters without manual priming between uses. Five power tiers step from the compact JET60 (0.5HP, 32m head) for single-story homes and small gardens to the robust JET200 (2HP, 55m head) for large properties, multi-story buildings, and commercial boosting. All models feature cast iron pump bodies with brass ejectors, carbon-ceramic mechanical seals, and built-in thermal overload protection.",
        "overviewImage": "/images/products/jet-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · JET60 / JET80 / JET100 · Standard residential"},
            {"label": "Three Phase", "desc": "380V / 50Hz · JET150 / JET200 · Higher power models"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["JET"],
        "category_slug": "self-priming-jet-pump",
        "features": [
            {"icon": "Zap", "title": "Powerful\nSelf-Priming", "desc": "Built-in Venturi ejector creates strong suction up to 10m lift. Automatic repriming after power interruptions — no manual intervention needed."},
            {"icon": "Shield", "title": "Cast Iron\nDurability", "desc": "Heavy-duty cast iron pump body with anti-corrosion coating. Designed for decades of reliable service in well and tank applications."},
            {"icon": "Gauge", "title": "Wide Power\nRange", "desc": "Five models from 0.5HP to 2HP. Start with JET60 for basic needs; step up as your water demand and building height increase."},
            {"icon": "Wrench", "title": "Standard\nFittings", "desc": "1\" to 1.25\" BSP threaded connections. Compatible with standard plumbing worldwide. Includes built-in check valve and priming plug."},
        ],
        "applications": [
            {"icon": "Home", "label": "Shallow Well\nWater Supply", "desc": "Lift water from shallow wells up to 10m depth for complete household water supply."},
            {"icon": "Building2", "label": "Pressure\nBoosting", "desc": "Boost municipal water pressure for multi-story homes, apartments, and small commercial buildings."},
            {"icon": "Trees", "label": "Garden &\nIrrigation", "desc": "Power garden sprinklers and drip irrigation from tanks, wells, or rainwater harvesting systems."},
            {"icon": "Droplets", "label": "Rainwater\nSystems", "desc": "Ideal for rainwater harvesting — self-priming capability handles fluctuating tank water levels without losing prime."},
        ],
        "faqs": [
            {"q": "How deep can a JET pump pull water?", "a": "JET series pumps can lift water from up to 10m depth (vertical distance from pump to water surface). For wells deeper than 10m, consider a submersible deep well pump. For 10-25m depths, a deep-well jet pump with ejector assembly in the well may work — contact our engineering team for assessment."},
            {"q": "JET or JSW — which should I choose?", "a": "JET series: cast iron body — durable, economical, proven. JSW series: AISI 304 stainless steel body — corrosion-free, food-grade, ideal for drinking water and humid environments. Choose JET for standard applications; choose JSW when water quality, corrosion resistance, or hygiene is critical."},
        ],
        "ctaTitle": "NEED A RELIABLE SHALLOW WELL PUMP?",
        "ctaDesc": "Our team can help you select the right JET model for your well depth, home size, and water demand. Contact us for specifications, pricing, and installation guidance.",
    },
    {
        "key": "self-priming-jet-pump/jsw-series",
        "title": "JSW SERIES",
        "subtitle": "Self-Priming Jet Pumps — Stainless Steel Range",
        "desc": "The JSW Series delivers the same powerful jet pump self-priming performance as the JET Series, but with full AISI 304 stainless steel construction for ultimate corrosion resistance and water purity. Four models span 35-48m head with flow rates up to 3.6 m³/h. The stainless steel pump body, impeller, and shaft ensure clean, rust-free water — ideal for drinking water systems, coastal environments, and food-grade applications.",
        "heroCheckmarks": ["35-48m Head Range", "2.4-3.6 m³/h Flow", "AISI 304 Stainless", "4 Models"],
        "modelImages": [
            {"src": "/images/products/jet-pump.png", "label": "JSW(m)1-24"},
            {"src": "/images/products/jet-pump.png", "label": "JSW(m)2-30"},
            {"src": "/images/products/jet-pump.png", "label": "JSW(m)3-30"},
        ],
        "stats": {"iconLayers": "Layers", "models": "4", "iconGauge": "Gauge", "headRange": "35-48m", "iconDroplets": "Droplets", "flowRange": "2.4-3.6m³/h", "iconZap": "Zap", "powerRange": "0.37-1.1kW"},
        "overviewTitle": "JSW Series Overview",
        "overviewDesc": "The JSW Series represents ALFAGRAND's premium stainless steel jet pump platform. All wetted components — pump body, ejector, impeller, diffuser, and shaft — are manufactured from AISI 304 stainless steel. This means zero rust, zero metal taste, and zero contamination of pumped water — critical for drinking water systems, food processing, and coastal installations where salt air would rapidly corrode cast iron. The built-in ejector provides self-priming up to 9m suction lift with automatic repriming. Four models with the (m) suffix denote models with built-in pressure control for automatic operation.",
        "overviewImage": "/images/products/jet-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · All JSW models · Standard residential"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["JSW(m)", "JSW"],
        "category_slug": "self-priming-jet-pump",
        "features": [
            {"icon": "Shield", "title": "Full Stainless\nConstruction", "desc": "AISI 304 stainless steel for all wetted parts — pump body, ejector, impeller, shaft. No rust, no contamination, safe for drinking water."},
            {"icon": "Droplets", "title": "Pure Water\nDelivery", "desc": "Zero metal taste or discoloration. The preferred choice for potable water systems, restaurants, and food processing."},
            {"icon": "Sun", "title": "Coastal\nResistance", "desc": "Stainless steel resists the corrosive effects of salt air and humidity. Far longer service life than cast iron in coastal installations."},
            {"icon": "Zap", "title": "Self-Priming\nEjector", "desc": "Same proven Venturi ejector technology as JET series. Lifts water from 9m depth with automatic repriming capability."},
        ],
        "applications": [
            {"icon": "Home", "label": "Drinking Water\nSupply", "desc": "Pure, rust-free drinking water pressurization for homes and residential communities."},
            {"icon": "Building2", "label": "Hotel &\nRestaurant", "desc": "Food-grade water supply for hotels, restaurants, cafes, and commercial kitchens."},
            {"icon": "Droplets", "label": "Bottling &\nProcessing", "desc": "Clean water transfer for small-scale bottling, food processing, and beverage production."},
            {"icon": "Trees", "label": "Coastal\nProperties", "desc": "Corrosion-resistant water supply for beach houses, coastal resorts, and marine facilities."},
        ],
        "faqs": [
            {"q": "JSW(m) models — what does the (m) mean?", "a": "The (m) suffix indicates models with built-in mechanical pressure control (pressure switch + small diaphragm tank) for automatic start/stop operation. Non-(m) models require an external pressure controller. (m) models provide the simplest installation — connect pipes and power, and the pump manages itself automatically."},
            {"q": "Can JSW pumps handle chlorinated water?", "a": "Yes. AISI 304 stainless steel has excellent resistance to chlorinated water at typical municipal concentrations (up to 2 ppm). For higher chlorine concentrations, contact our engineering team about 316 stainless steel options."},
        ],
        "ctaTitle": "NEED A STAINLESS STEEL JET PUMP FOR CLEAN WATER?",
        "ctaDesc": "Our team can help you select the right JSW stainless steel jet pump for your drinking water or coastal application. Contact us for specifications, certifications, and pricing.",
    },

    # ===== SUBMERSIBLE SEWAGE PUMP =====
    {
        "key": "submersible-sewage-pump/wq-series",
        "title": "V(WQ) SERIES",
        "subtitle": "Submersible Sewage Pumps — Vortex Impeller",
        "desc": "The V(WQ) Series handles raw sewage and wastewater with solids up to 35mm using advanced vortex impeller technology. Seven models span 7-15m head with flow rates up to 25 m³/h. The vortex impeller creates a rotating fluid column that passes solids without impeller contact — virtually eliminating clogging. Designed for septic tanks, lift stations, and municipal wastewater applications.",
        "heroCheckmarks": ["7-15m Head Range", "8-25 m³/h Flow", "35mm Solids", "7 Models"],
        "modelImages": [
            {"src": "/images/products/sewage-pump.png", "label": "WQ10-7-0.75"},
            {"src": "/images/products/sewage-pump.png", "label": "WQ15-10-1.5"},
            {"src": "/images/products/sewage-pump.png", "label": "WQ25-15-2.2"},
        ],
        "stats": {"iconLayers": "Layers", "models": "7", "iconGauge": "Gauge", "headRange": "7-15m", "iconDroplets": "Droplets", "flowRange": "8-25m³/h", "iconZap": "Zap", "powerRange": "0.75-2.2kW"},
        "overviewTitle": "V(WQ) Series Overview",
        "overviewDesc": "The V(WQ) Series uses a vortex (also called recessed or torque-flow) impeller design — the impeller sits recessed in the volute, creating a rotating column of water that carries solids through the pump without the impeller directly contacting them. This design passes spherical solids up to 35mm and fibrous materials that would clog conventional channel impellers. Double mechanical seals with oil chamber protect the motor, while the built-in float switch provides automatic level control. Seven models cover residential to light municipal wastewater handling with cast iron construction throughout.",
        "overviewImage": "/images/products/sewage-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · WQ10-7-0.75 to WQ15-10-1.1 · Residential"},
            {"label": "Three Phase", "desc": "380V / 50Hz · WQ15-15-1.5 to WQ25-15-2.2 · Commercial/Industrial"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "maxParticle", "label": "Solids (mm)"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["WQ"],
        "category_slug": "submersible-sewage-pump",
        "features": [
            {"icon": "Settings", "title": "Vortex\nImpeller", "desc": "Recessed impeller design creates a non-clog rotating fluid column. Passes 35mm solids and fibrous materials without impeller contact or wrapping."},
            {"icon": "Shield", "title": "Double Mechanical\nSeal", "desc": "Two independent mechanical seals with intermediate oil chamber. Even if one seal fails, the second protects the motor from water ingress."},
            {"icon": "Zap", "title": "Auto Float\nSwitch", "desc": "Built-in float switch for automatic start/stop based on water level. No external control panel needed for basic sump and tank operation."},
            {"icon": "Wrench", "title": "Quick-Disconnect\nSystem", "desc": "Automatic coupling system (guide rail optional) for easy installation and retrieval without entering the sump or disconnecting pipework."},
        ],
        "applications": [
            {"icon": "Home", "label": "Septic Tank\nPumping", "desc": "Reliable sewage transfer from septic tanks to drain fields or municipal connections."},
            {"icon": "Building2", "label": "Lift\nStations", "desc": "Wastewater lift stations for buildings below sewer grade, basement bathrooms, and underground facilities."},
            {"icon": "Factory", "label": "Industrial\nWastewater", "desc": "Process wastewater, wash-down water, and effluent transfer in factories and processing plants."},
            {"icon": "Droplets", "label": "Storm\nWater", "desc": "Storm water and flood water pumping from sumps, pits, and collection basins."},
        ],
        "faqs": [
            {"q": "What size solids can V(WQ) pumps handle?", "a": "Up to 35mm spherical solids. This covers typical domestic sewage including toilet waste. For applications with larger solids or heavy sludge, contact our engineering team about heavy-duty sewage pump options."},
            {"q": "Can V(WQ) pumps run dry?", "a": "No. Submersible pumps rely on the pumped liquid for motor cooling and mechanical seal lubrication. Dry running will destroy the seals and motor within minutes. Always ensure the pump is submerged to at least the minimum water level marked on the pump body, and use the float switch for automatic shut-off at low water."},
        ],
        "ctaTitle": "NEED A RELIABLE SEWAGE PUMPING SOLUTION?",
        "ctaDesc": "Our team can help specify the right V(WQ) sewage pump for your wastewater application. Contact us for technical specifications, system design, and pricing.",
    },
    {
        "key": "submersible-sewage-pump/qdx-series",
        "title": "QDX(QD) SERIES",
        "subtitle": "Submersible Drainage Pumps — Light Duty",
        "desc": "The QDX(QD) Series provides reliable submersible drainage for clean and lightly dirty water with solids up to 5mm. Six models span 10-32m head with flow rates up to 13.2 m³/h. Compact, lightweight design with built-in float switch makes QDX the go-to choice for basement drainage, pool emptying, fountain circulation, and domestic dewatering.",
        "heroCheckmarks": ["10-32m Head Range", "13.2 m³/h Max Flow", "5mm Solids", "6 Models"],
        "modelImages": [
            {"src": "/images/products/sewage-pump.png", "label": "QDX5-10-0.37"},
            {"src": "/images/products/sewage-pump.png", "label": "QDX5-20-0.55"},
            {"src": "/images/products/sewage-pump.png", "label": "QDX5-32-0.75"},
            {"src": "/images/products/sewage-pump.png", "label": "QDX5-30-1.1"},
        ],
        "stats": {"iconLayers": "Layers", "models": "6", "iconGauge": "Gauge", "headRange": "10-32m", "iconDroplets": "Droplets", "flowRange": "13.2m³/h", "iconZap": "Zap", "powerRange": "0.37-1.1kW"},
        "overviewTitle": "QDX(QD) Series Overview",
        "overviewDesc": "The QDX(QD) Series is ALFAGRAND's light-duty submersible drainage pump platform — designed for clean and lightly dirty water with small particles up to 5mm. Six models step from the compact QDX5-10-0.37 (0.5HP, 16m head) to the powerful QDX5-30-1.1 (1.5HP, 30m head). All models feature a built-in float switch for automatic level control, thermal overload protection, and oil-filled motor chamber for optimal cooling. The compact size fits standard sump pits and narrow spaces. QDX pumps are the affordable, reliable solution for domestic drainage and water transfer.",
        "overviewImage": "/images/products/sewage-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · All QDX models · Standard residential"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "maxParticle", "label": "Solids (mm)"},
            {"key": "inletOutlet", "label": "Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["QDX"],
        "category_slug": "submersible-sewage-pump",
        "features": [
            {"icon": "Package", "title": "Compact &\nLightweight", "desc": "Small enough to fit standard sump pits and basins. Weighs just 10-15 kg — easy to carry, deploy, and retrieve."},
            {"icon": "Zap", "title": "Auto Float\nControl", "desc": "Built-in float switch for automatic start at high water and stop at low water. Set and forget for unattended drainage."},
            {"icon": "Shield", "title": "Oil-Filled\nMotor", "desc": "Motor chamber filled with cooling and lubricating oil. Better heat dissipation and bearing life than air-filled alternatives."},
            {"icon": "Droplets", "title": "Versatile\nDrainage", "desc": "Handles clean and lightly dirty water. Drain basements, empty pools, transfer water, and circulate fountains with one pump."},
        ],
        "applications": [
            {"icon": "Home", "label": "Basement\nDrainage", "desc": "Automatic sump pump for basement and crawl space dewatering. Protects your property from flooding and damp."},
            {"icon": "Droplets", "label": "Pool & Pond\nEmptying", "desc": "Quickly drain swimming pools, garden ponds, water features, and water tanks."},
            {"icon": "Trees", "label": "Garden\nWater Transfer", "desc": "Transfer collected rainwater or stored water to garden irrigation systems."},
            {"icon": "Factory", "label": "Construction\nDewatering", "desc": "Remove water from excavations, trenches, and construction sites where water is relatively clean."},
        ],
        "faqs": [
            {"q": "Can QDX pumps handle muddy water?", "a": "QDX pumps handle particles up to 5mm — suitable for slightly turbid water with fine silt but NOT for thick mud or sand. For muddy water with heavier solids, choose the WQD series (30mm solids) or V(WQ) sewage pumps (35mm solids)."},
            {"q": "How long can a QDX pump run continuously?", "a": "QDX pumps are rated for intermittent domestic use. For continuous drainage (hours at a time), keep the pump fully submerged for adequate cooling and monitor water temperature. For 24/7 industrial drainage, consider upgrading to our heavy-duty submersible pump range."},
        ],
        "ctaTitle": "NEED A RELIABLE DRAINAGE PUMP?",
        "ctaDesc": "Our team can help you select the right QDX drainage pump for your dewatering needs. Contact us for specifications, pricing, and availability.",
    },

    # ===== VARIABLE FREQUENCY PUMP =====
    {
        "key": "variable-frequency-pump/t-series",
        "title": "T SERIES",
        "subtitle": "Smart Constant-Pressure VFD Pumps",
        "desc": "The T Series integrates a permanent magnet synchronous motor (PMSM) with an intelligent VFD controller for constant-pressure water supply with up to 40% energy savings. Four models (T400/T600/T800/T1000) cover 28-70m head with flow rates up to 8.0 m³/h. AUTOADAPT technology self-learns your water usage patterns and optimizes pump speed automatically.",
        "heroCheckmarks": ["28-70m Head Range", "2.2-8.0 m³/h Flow", "PMSM Motor", "40% Energy Savings"],
        "modelImages": [
            {"src": "/images/products/vfd-pump.png", "label": "T400"},
            {"src": "/images/products/vfd-pump.png", "label": "T600"},
            {"src": "/images/products/vfd-pump.png", "label": "T800"},
            {"src": "/images/products/vfd-pump.png", "label": "T1000"},
        ],
        "stats": {"iconLayers": "Layers", "models": "4", "iconGauge": "Gauge", "headRange": "28-70m", "iconDroplets": "Droplets", "flowRange": "2.2-8.0m³/h", "iconZap": "Zap", "powerRange": "0.55-1.5kW"},
        "overviewTitle": "T Series Overview",
        "overviewDesc": "The T Series represents the pinnacle of residential pump technology — combining an IE5-class permanent magnet motor with a smart VFD controller in one integrated unit. The AUTOADAPT system monitors water pressure and flow, learns your household consumption patterns, and continuously adjusts motor speed to maintain exactly the required pressure. During low demand (single tap), the pump runs at low speed consuming minimal power. During peak demand (multiple showers + washing machine), the pump ramps up automatically. The result: constant pressure at every tap, whisper-quiet operation below 45 dB, and up to 40% lower electricity bills compared to traditional fixed-speed pumps.",
        "overviewImage": "/images/products/vfd-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · All T Series models · Standard residential"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["T400", "T600", "T800", "T1000"],
        "category_slug": "variable-frequency-pump",
        "features": [
            {"icon": "Cpu", "title": "Auto-Adaptive\nControl", "desc": "Self-learning VFD controller monitors usage patterns and optimizes speed automatically. Always the right pressure — never too much, never too little."},
            {"icon": "Lightbulb", "title": "40% Energy\nSavings", "desc": "PMSM motor achieves IE5 efficiency. Variable speed means partial-load power drops proportionally — saving electricity every hour."},
            {"icon": "Sun", "title": "Ultra-Quiet\nOperation", "desc": "Sub-45 dB noise level at partial load. So quiet you can install it in living areas without disturbance — perfect for apartments and open-plan homes."},
            {"icon": "Shield", "title": "Full System\nProtection", "desc": "Built-in dry-run protection, anti-cycling, leak detection, over-pressure shutdown, and frost protection. The pump protects itself and your plumbing."},
        ],
        "applications": [
            {"icon": "Home", "label": "Smart Home\nWater Supply", "desc": "The ultimate residential water pressure solution. Constant pressure for every tap, shower, and appliance — simultaneously."},
            {"icon": "Building2", "label": "Apartment\nBlocks", "desc": "Quiet operation allows installation inside apartments. Smart control handles varying demand across multiple units."},
            {"icon": "Trees", "label": "Precision\nIrrigation", "desc": "Constant pressure for drip and micro-sprinkler systems. Variable speed prevents pressure surges that damage irrigation components."},
            {"icon": "Factory", "label": "Light\nCommercial", "desc": "Pressure boosting for small commercial buildings, offices, and retail spaces with smart monitoring capability."},
        ],
        "faqs": [
            {"q": "How much electricity will a T Series pump save?", "a": "Compared to a same-power fixed-speed pump, energy savings of 30-40% are typical for residential use. Savings are highest in households with variable water consumption patterns — where demand fluctuates throughout the day. In constant-demand applications (e.g., 24/7 industrial), savings are lower (10-15%)."},
            {"q": "Do I need a pressure tank with T Series?", "a": "T Series pumps have a small built-in diaphragm tank (1-2L) for pressure smoothing. For most residential applications, this internal tank is sufficient. For homes with very frequent short-duration use (e.g., toilet flushes every few minutes), adding an external 8-24L tank reduces pump starts and extends motor life."},
            {"q": "What happens during a power outage?", "a": "The T Series controller saves all settings in non-volatile memory. After power restoration, the pump restarts automatically with the previous configuration. The soft-start feature eliminates the inrush current surge on restart — protecting both the pump and your electrical system."},
        ],
        "ctaTitle": "READY TO UPGRADE TO SMART CONSTANT-PRESSURE WATER?",
        "ctaDesc": "Experience the comfort of constant water pressure and lower electricity bills with T Series VFD technology. Contact us for a personalized system recommendation and pricing.",
    },

    # ===== MULTI-STAGE PUMP & PUMP SETS =====
    {
        "key": "multi-stage-pump-sets/hmc-series",
        "title": "HMC SERIES",
        "subtitle": "Self-Priming Horizontal Multistage Pumps",
        "desc": "The HMC Series combines multistage pressure boosting with self-priming convenience — no foot valve, no manual filling between uses. Eight models with 2-20 stages deliver 28-56m head at 2.0-4.5 m³/h in a compact horizontal layout. The unique combination of self-priming and multistage performance makes HMC the ideal choice for domestic boosting from underground tanks and rainwater harvesting.",
        "heroCheckmarks": ["28-56m Head Range", "2.0-4.5 m³/h Flow", "2-20 Stages", "Self-Priming"],
        "modelImages": [
            {"src": "/images/products/multi-stage-pump.png", "label": "HMC-2-37"},
            {"src": "/images/products/multi-stage-pump.png", "label": "HMC-10-75"},
            {"src": "/images/products/multi-stage-pump.png", "label": "HMC-20-110"},
        ],
        "stats": {"iconLayers": "Layers", "models": "8", "iconGauge": "Gauge", "headRange": "28-56m", "iconDroplets": "Droplets", "flowRange": "2.0-4.5m³/h", "iconZap": "Zap", "powerRange": "0.37-1.1kW"},
        "overviewTitle": "HMC Series Overview",
        "overviewDesc": "The HMC Series is ALFAGRAND's unique self-priming multistage pump — the only model in its class that combines the pressure multiplication of stacked impellers with the convenience of automatic self-priming. Where conventional multistage pumps must be gravity-fed (flooded suction), the HMC self-primes up to 8m, pulling water from underground storage tanks and rainwater cisterns without a foot valve. Eight models scale from 2 to 20 stages in a compact horizontal configuration — simply choose the number of stages matching your required head pressure (~2.8m per stage). Cast iron construction with stainless steel impellers and diffusers for durability and corrosion resistance.",
        "overviewImage": "/images/products/multi-stage-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · HMC-2-37 to HMC-10-75 · Domestic use"},
            {"label": "Three Phase", "desc": "380V / 50Hz · HMC-15-110 / HMC-20-110 · Higher power models"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Suction (m)"},
            {"key": "inletOutlet", "label": "Inlet/Outlet"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["HMC-"],
        "category_slug": "multi-stage-pump-sets",
        "features": [
            {"icon": "Zap", "title": "Self-Priming\nMultistage", "desc": "Unique design — only multistage pump with self-priming capability. No foot valve, no manual priming, no flooded suction required."},
            {"icon": "Layers", "title": "Modular\nStaging", "desc": "2-20 stages in a single compact horizontal pump. Choose exactly the head you need — each stage adds approximately 2.8m."},
            {"icon": "Sun", "title": "Horizontal\nCompact Design", "desc": "Low-profile horizontal layout fits under benches, in cabinets, and in crawl spaces where vertical multistage pumps cannot go."},
            {"icon": "Shield", "title": "Stainless\nInternals", "desc": "Stainless steel impellers and diffusers inside a cast iron casing — corrosion resistance where it matters, affordability where it doesn't."},
        ],
        "applications": [
            {"icon": "Home", "label": "Tank Boosting\nfor Homes", "desc": "Draw water from underground storage tanks and pressurize for whole-house supply. No foot valve needed."},
            {"icon": "Droplets", "label": "Rainwater\nHarvesting", "desc": "Perfect for rainwater systems — self-priming from underground cisterns with automatic repriming after dry periods."},
            {"icon": "Building2", "label": "Apartment\nBoosting", "desc": "Compact horizontal design fits in apartment mechanical cupboards. Boosts municipal pressure for upper floors."},
            {"icon": "Trees", "label": "Garden from\nTank Supply", "desc": "High-pressure garden irrigation from rainwater tanks. Multistage pressure drives sprinklers and drip systems efficiently."},
        ],
        "faqs": [
            {"q": "How is HMC different from a standard multistage pump?", "a": "Standard multistage pumps (like CDLF, CRI) require flooded suction — water must flow into the pump by gravity because the first impeller cannot self-prime. HMC has a built-in self-priming first stage that creates suction, lifting water from up to 8m below the pump. This eliminates the need for foot valves, check valves, and manual priming — dramatically simplifying tank-based systems."},
            {"q": "How many HMC stages for a two-story house?", "a": "Two-story house: ~6m static + ~12m friction + 20m target outlet pressure = ~38m total. At ~2.8m per HMC stage: 14 stages. Choose HMC-15-110 (15 stages, 42m) with adequate margin. For a single-story house, HMC-10-75 (10 stages, 28m) is typically sufficient."},
        ],
        "ctaTitle": "NEED SELF-PRIMING MULTISTAGE PRESSURE?",
        "ctaDesc": "The HMC Series eliminates the complexity of conventional multistage systems. Contact us for stage selection calculations, pricing, and installation support.",
    },
    {
        "key": "multi-stage-pump-sets/cdlf-series",
        "title": "CDLF/CDL SERIES",
        "subtitle": "Vertical Stainless Steel Multistage Pumps",
        "desc": "The CDLF/CDL Series delivers high-pressure water through stacked stainless steel impellers in a space-saving vertical configuration. Four models with 2-12 stages achieve 26-102m head at 2.0-8.0 m³/h. All-stainless AISI 304 wetted parts ensure corrosion-free, food-grade water — the premium choice for high-rise boosting, boiler feed, and industrial pressure applications.",
        "heroCheckmarks": ["26-102m Head Range", "2.0-8.0 m³/h Flow", "AISI 304 Stainless", "4 Models"],
        "modelImages": [
            {"src": "/images/products/multi-stage-pump.png", "label": "CDL2-2"},
            {"src": "/images/products/multi-stage-pump.png", "label": "CDL4-6"},
            {"src": "/images/products/multi-stage-pump.png", "label": "CDL8-8"},
            {"src": "/images/products/multi-stage-pump.png", "label": "CDL8-12"},
        ],
        "stats": {"iconLayers": "Layers", "models": "4", "iconGauge": "Gauge", "headRange": "26-102m", "iconDroplets": "Droplets", "flowRange": "2.0-8.0m³/h", "iconZap": "Zap", "powerRange": "0.37-3.0kW"},
        "overviewTitle": "CDLF/CDL Series Overview",
        "overviewDesc": "The CDLF/CDL Series uses stamped AISI 304 stainless steel impellers and diffusers in a vertical stack — each stage (impeller + diffuser pair) adds pressure while maintaining the same flow rate. The vertical design occupies minimal floor space (roughly 15x15 cm footprint) while the stainless steel construction provides zero-corrosion, zero-contamination water delivery suitable for drinking water, demineralized water, and light chemical transfer. Four standard configurations cover the most common high-pressure boosting applications from 26m to 102m head. The cartridge mechanical seal design enables seal replacement without pump disassembly — a 15-minute maintenance task.",
        "overviewImage": "/images/products/multi-stage-pump.png",
        "phaseOptions": [
            {"label": "Single Phase", "desc": "220V / 50Hz · CDL2-2 / CDL4-4 · Light duty"},
            {"label": "Three Phase", "desc": "380V / 50Hz · CDL4-6 to CDL8-12 · Industrial / High-rise"},
        ],
        "tableCols": [
            {"key": "model", "label": "Model"},
            {"key": "powerHP", "label": "Power (HP)"},
            {"key": "powerKW", "label": "Power (kW)"},
            {"key": "maxHead", "label": "Max. Head (m)"},
            {"key": "maxFlow", "label": "Max. Flow (m³/h)"},
            {"key": "suctionHead", "label": "Stages"},
            {"key": "inletOutlet", "label": "Connections"},
            {"key": "weight", "label": "G.W (kg)"},
        ],
        "model_prefixes": ["CDL", "CDLF"],
        "category_slug": "multi-stage-pump-sets",
        "features": [
            {"icon": "Shield", "title": "Full Stainless\nHydraulics", "desc": "AISI 304 stamped impellers, diffusers, chambers, and shaft. Zero corrosion, zero contamination — safe for drinking water and food processing."},
            {"icon": "Layers", "title": "Vertical\nSpace Saver", "desc": "15x15 cm footprint — smaller than a sheet of paper. The most floor-space-efficient way to achieve high-pressure water boosting."},
            {"icon": "Wrench", "title": "Cartridge\nSeal", "desc": "Pre-assembled cartridge mechanical seal replaces in 15 minutes without pump removal. Standardized seal across all CDL models."},
            {"icon": "Gauge", "title": "High-Pressure\nCapability", "desc": "Up to 102m head — enough for buildings up to 25+ stories. Modular staging means you pay only for the pressure you need."},
        ],
        "applications": [
            {"icon": "Building2", "label": "High-Rise\nBoosting", "desc": "Deliver water to upper floors of high-rise buildings. Vertical design fits in tight mechanical risers and pump rooms."},
            {"icon": "Factory", "label": "Industrial\nPressure", "desc": "High-pressure process water, boiler feed, and wash-down systems in factories and industrial plants."},
            {"icon": "Droplets", "label": "RO &\nFiltration", "desc": "Precise high-pressure feed for reverse osmosis membranes. Stainless steel ensures zero water contamination."},
            {"icon": "Home", "label": "Luxury Home\nSystems", "desc": "Premium whole-house pressure boosting with silent operation and stainless steel purity for high-end residences."},
        ],
        "faqs": [
            {"q": "CDLF vs CDL — what's the difference?", "a": "CDLF models feature an extended motor bracket and larger fan for enhanced motor cooling — suitable for continuous-duty applications. CDL models have standard cooling for intermittent domestic use. For 24/7 industrial boosting or high-ambient temperature environments, choose CDLF. For standard residential boosting, CDL is sufficient."},
            {"q": "Do CDL pumps need flooded suction?", "a": "Yes. Standard CDL pumps require positive inlet pressure (flooded suction). They are NOT self-priming. The pump inlet must be below the water source level or fed by a pressurized supply. For self-priming multistage applications, see the HMC Series."},
        ],
        "ctaTitle": "NEED HIGH-PRESSURE STAINLESS STEEL BOOSTING?",
        "ctaDesc": "Our engineering team can calculate the exact CDL stage configuration for your building height and water demand. Contact us for technical specifications, system design, and pricing.",
    },
]


def main():
    content = read_products_ts()
    
    # Fallback models for series not in products.ts
    FALLBACK_MODELS = {
        "multi-stage-pump-sets/hmc-series": [
            {"model": "HMC-2-37", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "28", "maxFlow": "2.0", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "12.0"},
            {"model": "HMC-3-55", "powerHP": "0.75", "powerKW": "0.55", "maxHead": "32", "maxFlow": "2.5", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "14.0"},
            {"model": "HMC-5-55", "powerHP": "0.75", "powerKW": "0.55", "maxHead": "36", "maxFlow": "3.0", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "16.0"},
            {"model": "HMC-7-75", "powerHP": "1", "powerKW": "0.75", "maxHead": "40", "maxFlow": "3.5", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "18.0"},
            {"model": "HMC-8-75", "powerHP": "1", "powerKW": "0.75", "maxHead": "43", "maxFlow": "3.5", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "19.0"},
            {"model": "HMC-10-75", "powerHP": "1", "powerKW": "0.75", "maxHead": "47", "maxFlow": "4.0", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "21.0"},
            {"model": "HMC-15-110", "powerHP": "1.5", "powerKW": "1.1", "maxHead": "52", "maxFlow": "4.5", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "24.0"},
            {"model": "HMC-20-110", "powerHP": "1.5", "powerKW": "1.1", "maxHead": "56", "maxFlow": "4.5", "suctionHead": "8", "inletOutlet": "1 in x 1 in", "weight": "27.0"},
        ],
        "multi-stage-pump-sets/cdlf-series": [
            {"model": "CDL2-2", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "26", "maxFlow": "2.0", "suctionHead": "2", "inletOutlet": "G1 in x G1 in", "weight": "15.0"},
            {"model": "CDL4-4", "powerHP": "1", "powerKW": "0.75", "maxHead": "44", "maxFlow": "4.0", "suctionHead": "4", "inletOutlet": "G1.25 in x G1 in", "weight": "22.0"},
            {"model": "CDL8-8", "powerHP": "3", "powerKW": "2.2", "maxHead": "82", "maxFlow": "8.0", "suctionHead": "8", "inletOutlet": "G1.5 in x G1.25 in", "weight": "35.0"},
            {"model": "CDL8-12", "powerHP": "4", "powerKW": "3.0", "maxHead": "102", "maxFlow": "8.0", "suctionHead": "12", "inletOutlet": "G1.5 in x G1.25 in", "weight": "42.0"},
        ],
    }
    
    # Generate TS code for each series
    all_entries = []
    
    for series in SERIES_DEFS:
        # Extract models from products.ts or use fallback
        if series["key"] in FALLBACK_MODELS:
            series_models = FALLBACK_MODELS[series["key"]]
        else:
            models = parse_models(content, series["category_slug"], {series["key"]: series["model_prefixes"]})
            series_models = models.get(series["key"], [])
        
        # Format model objects
        model_lines = ",\n      ".join(to_ts_model(m) for m in series_models)
        
        # Format icon references - these reference the imported lucide icons
        def icon_ref(icon_name):
            return icon_name  # Just the name, the TS code uses it directly
        
        s = series  # shorthand
        
        # Build stats array
        stats = s["stats"]
        stats_lines = f"""      {{ icon: {stats["iconLayers"]}, label: "Models", value: "{stats["models"]}" }},
      {{ icon: {stats["iconGauge"]}, label: "Head Range", value: "{stats["headRange"]}" }},
      {{ icon: {stats["iconDroplets"]}, label: "Flow Range", value: "{stats["flowRange"]}" }},
      {{ icon: {stats["iconZap"]}, label: "Power", value: "{stats["powerRange"]}" }},"""
        
        # Build phase options
        phase_lines = ",\n      ".join(
            f'{{ label: "{esc(p["label"])}", desc: "{esc(p["desc"])}" }}'
            for p in s["phaseOptions"]
        )
        
        # Build features
        feature_lines = ",\n      ".join(
            f'{{ icon: {f["icon"]}, title: "{esc(f["title"])}", desc: "{esc(f["desc"])}" }}'
            for f in s["features"]
        )
        
        # Build applications
        app_lines = ",\n      ".join(
            f'{{ icon: {a["icon"]}, label: "{esc(a["label"])}", desc: "{esc(a["desc"])}" }}'
            for a in s["applications"]
        )
        
        # Build FAQs
        faq_lines = ",\n      ".join(
            f'{{ q: "{esc(f["q"])}", a: "{esc(f["a"])}" }}'
            for f in s["faqs"]
        )
        
        # Build table columns
        col_lines = ",\n      ".join(
            f'{{ key: "{c["key"]}", label: "{c["label"]}" }}'
            for c in s["tableCols"]
        )
        
        # Build model images
        img_lines = ",\n      ".join(
            f'{{ src: "{i["src"]}", label: "{i["label"]}" }}'
            for i in s["modelImages"]
        )
        
        # Build hero checkmarks
        checkmark_lines = ",\n      ".join(
            f'"{esc(c)}"'
            for c in s["heroCheckmarks"]
        )
        
        entry = f'''  /* ─── {s["key"].split("/")[1].upper().replace("-", " ")} ─── */
  "{s["key"]}": {{
    title: "{esc(s["title"])}",
    subtitle: "{esc(s["subtitle"])}",
    desc: "{esc(s["desc"])}",
    heroCheckmarks: [
      {checkmark_lines},
    ],
    modelImages: [
      {img_lines},
    ],
    stats: [
{stats_lines}
    ],
    overviewTitle: "{esc(s["overviewTitle"])}",
    overviewDesc: "{esc(s["overviewDesc"])}",
    overviewImage: "{s["overviewImage"]}",
    phaseOptions: [
      {phase_lines},
    ],
    tableCols: [
      {col_lines},
    ],
    models: [
      {model_lines},
    ],
    performanceCurves: [],
    features: [
      {feature_lines},
    ],
    applications: [
      {app_lines},
    ],
    faqs: [
      {faq_lines},
    ],
    ctaTitle: "{esc(s["ctaTitle"])}",
    ctaDesc: "{esc(s["ctaDesc"])}",
  }},
'''
        all_entries.append(entry)
    
    # Read the series page file
    series_page_path = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\app\[locale]\products\[slug]\[series]\page.tsx"
    with open(series_page_path, 'r', encoding='utf-8') as f:
        page_content = f.read()
    
    # Find the closing }; of seriesDataMap
    closing_pos = page_content.rfind('\n};\n\n/* ══')
    if closing_pos == -1:
        closing_pos = page_content.rfind('\n};')
    
    if closing_pos == -1:
        print("ERROR: Cannot find closing }; of seriesDataMap")
        return
    
    # Insert new entries before the closing
    insert_pos = closing_pos
    new_content = page_content[:insert_pos] + "\n" + "\n".join(all_entries) + "\n" + page_content[insert_pos:]
    
    # Write back
    with open(series_page_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Generated {len(all_entries)} series entries")
    print(f"Inserted into {series_page_path}")
    print(f"New file size: {len(new_content)} chars")


if __name__ == "__main__":
    main()
