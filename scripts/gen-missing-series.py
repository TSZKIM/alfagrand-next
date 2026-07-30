"""Generate missing series data entries for chloe-products.ts"""
import json

# Read the current chloe-products.ts to get the format reference
# Read products.ts to get the model data

path_products = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\data\products.ts"
path_chloe = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\data\chloe-products.ts"

# Product data for the 8 missing series
# Each entry: key, title, subtitle, models array, desc
series_data = [
    # ===== PERIPHERAL PUMP =====
    {
        "key": "peripheral-pump/wzb-series",
        "title": "WZB SERIES",
        "subtitle": "Peripheral Pumps — Automatic Self-Priming",
        "desc": "The WZB Series delivers 35-65m head pressure across three power tiers with automatic self-priming design. Ideal for domestic water supply, garden irrigation, and pressure boosting from wells and tanks.",
        "heroCheckmarks": ["35-65m Head Range", "Up to 3.5 m³/h Flow", "Automatic Self-Priming", "Thermal Overload Protection"],
        "models": [
            {"model": "1WZB-35", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "35", "maxFlow": "2.0", "suctionHead": "8", "inletOutlet": "1\" x 1\"", "weight": "9.0"},
            {"model": "1WZB-45", "powerHP": "0.75", "powerKW": "0.55", "maxHead": "45", "maxFlow": "2.5", "suctionHead": "8", "inletOutlet": "1\" x 1\"", "weight": "11.5"},
            {"model": "1WZB-65", "powerHP": "1", "powerKW": "0.75", "maxHead": "65", "maxFlow": "3.5", "suctionHead": "8", "inletOutlet": "1\" x 1\"", "weight": "14.0"},
        ],
        "stats": {"Models": "3", "Head Range": "35-65m", "Flow Range": "2.0-3.5 m³/h", "Power Range": "0.37-0.75kW"},
        "overviewTitle": "WZB Series Overview",
        "overviewDesc": "The WZB Series features automatic self-priming peripheral pumps with cast iron construction and copper-wound motors. Built-in thermal overload protection and reliable mechanical seals ensure long service life. Suitable for domestic water supply, garden irrigation, and pressure boosting applications.",
        "perfCurves": [
            {"model": "1WZB-65", "color": "#00D4AA", "points": [(0,65), (0.5,62), (1.0,57), (1.5,50), (2.0,40), (2.5,28), (3.0,14), (3.5,4)]},
            {"model": "1WZB-45", "color": "#4ECDC4", "points": [(0,45), (0.5,43), (1.0,39), (1.5,33), (2.0,24), (2.5,12)]},
            {"model": "1WZB-35", "color": "#FFD93D", "points": [(0,35), (0.5,33), (1.0,29), (1.5,22), (2.0,12)]},
        ],
        "feats": [
            ("Gauge", "35-65m Head\nCoverage", "Three power tiers cover residential water supply and pressure boosting with consistent performance."),
            ("Shield", "Cast Iron\nBody", "Durable cast iron pump body with brass impeller ensures extended service life in daily duty."),
            ("Droplets", "Self-Priming\nUp to 8m", "Automatic self-priming design eliminates manual priming, ideal for above-ground installations."),
            ("Zap", "Thermal\nProtection", "Built-in overload protector with automatic reset safeguards motor from overheating damage."),
        ],
        "apps": [
            ("Home", "Domestic Water", "Residential water supply from wells, tanks, and municipal sources."),
            ("Sprout", "Garden Irrigation", "Drip irrigation, sprinkler systems, and greenhouse watering."),
            ("Building2", "Pressure Boosting", "Boosting water pressure for multi-story buildings and remote taps."),
            ("Wrench", "Light Industrial", "Small workshops, car washing, and general water transfer."),
        ],
        "faqs": [
            ("What is the maximum suction lift?", "The WZB Series can achieve up to 8 meters of suction lift when properly primed, making it suitable for shallow well and tank applications."),
            ("Can I use this pump continuously?", "Yes, the WZB Series is designed for intermittent to semi-continuous duty with thermal protection. For 24/7 continuous operation, consider our centrifugal pump range."),
            ("Is a pressure tank required?", "A pressure tank is recommended to reduce pump cycling frequency and maintain consistent water pressure, especially for domestic supply systems."),
            ("What maintenance is needed?", "Periodic inspection of the mechanical seal and cleaning of the inlet strainer. No routine oiling required as bearings are sealed and lubricated for life."),
            ("Is the pump self-priming after initial setup?", "Yes, once the pump body is filled with water, it will maintain prime and automatically re-prime between cycles."),
        ],
    },
    {
        "key": "peripheral-pump/awzb-series",
        "title": "AWZB SERIES",
        "subtitle": "Peripheral Pumps — Full-Auto Self-Priming",
        "desc": "The AWZB Series features fully automatic self-priming peripheral pumps with integrated pressure control, delivering 24-50m head across six models. Ideal for automated domestic water supply systems.",
        "heroCheckmarks": ["24-50m Head Range", "Up to 4.5 m³/h Flow", "Full-Auto Pressure Control", "Self-Priming up to 9m"],
        "models": [
            {"model": "1AWZB125", "powerHP": "0.17", "powerKW": "0.125", "maxHead": "24", "maxFlow": "1.8", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "8.0"},
            {"model": "1AWZB250", "powerHP": "0.34", "powerKW": "0.25", "maxHead": "28", "maxFlow": "2.0", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "10.0"},
            {"model": "1AWZB370", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "32", "maxFlow": "2.2", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "11.0"},
            {"model": "1AWZB550", "powerHP": "0.75", "powerKW": "0.55", "maxHead": "38", "maxFlow": "2.8", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "13.0"},
            {"model": "1AWZB750", "powerHP": "1", "powerKW": "0.75", "maxHead": "44", "maxFlow": "3.0", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "14.5"},
            {"model": "1.5AWZB1100", "powerHP": "1.5", "powerKW": "1.1", "maxHead": "50", "maxFlow": "4.5", "suctionHead": "9", "inletOutlet": "1.5\" x 1.5\"", "weight": "18.5"},
        ],
        "stats": {"Models": "6", "Head Range": "24-50m", "Flow Range": "1.8-4.5 m³/h", "Power Range": "0.125-1.1kW"},
        "overviewTitle": "AWZB Series Overview",
        "overviewDesc": "The AWZB Series combines peripheral pump technology with fully automatic pressure control. Once installed, the pump automatically starts when a tap opens and stops when it closes. Integrated dry-run protection and thermal overload ensure safe unattended operation. Ideal for fully automated domestic water supply systems.",
        "perfCurves": [
            {"model": "1.5AWZB1100", "color": "#00D4AA", "points": [(0,50), (0.5,48), (1.0,45), (1.5,40), (2.0,34), (2.5,27), (3.0,19), (3.5,10), (4.0,3)]},
            {"model": "1AWZB750", "color": "#4ECDC4", "points": [(0,44), (0.5,42), (1.0,39), (1.5,34), (2.0,27), (2.5,18), (3.0,8)]},
            {"model": "1AWZB370", "color": "#FFD93D", "points": [(0,32), (0.5,30), (1.0,27), (1.5,22), (2.0,14), (2.2,6)]},
        ],
        "feats": [
            ("Gauge", "24-50m Head\nCoverage", "Six models covering light domestic to heavy residential pressure requirements."),
            ("Zap", "Full-Auto\nControl", "Automatic start/stop based on tap operation. No manual intervention needed for daily use."),
            ("Droplets", "9m Suction\nLift", "Superior self-priming capability reaches deeper water sources than standard peripheral pumps."),
            ("ShieldCheck", "Dry-Run\nProtection", "Integrated protection prevents pump damage when water source runs dry."),
        ],
        "apps": [
            ("Home", "Home Supply", "Automatic water supply for households with wells, tanks, or low-pressure mains."),
            ("Sprout", "Garden Auto", "Automated garden and lawn irrigation with pressure-sensitive control."),
            ("Building2", "Pressure Maint.", "Maintaining consistent pressure in multi-tap domestic installations."),
            ("Droplets", "Rainwater", "Rainwater harvesting and greywater reuse systems with automatic control."),
        ],
        "faqs": [
            ("How does the auto-start/stop work?", "The AWZB Series has a built-in pressure switch and flow sensor. When you open a tap, the pressure drops and the pump starts. When you close the tap, pressure builds and the pump stops automatically."),
            ("Do I still need a pressure tank?", "A small pressure tank (24L) is recommended to reduce start/stop frequency, especially for low-flow uses like dripping taps."),
            ("Can it run dry?", "The pump has dry-run protection that shuts off the motor if no water is detected. However, extended dry running should be avoided."),
            ("What is the maximum suction depth?", "Up to 9 meters with a properly sealed suction line and foot valve installed at the water source."),
            ("Is it suitable for well water?", "Yes, for shallow wells up to 9m depth. For deeper wells, consider our submersible pump range."),
        ],
    },
    {
        "key": "peripheral-pump/mkp-series",
        "title": "MKP SERIES",
        "subtitle": "Peripheral Pumps — Compact Design",
        "desc": "The MKP Series delivers 36-60m head in a lightweight, compact design. Perfect for applications where space is limited but high pressure is required.",
        "heroCheckmarks": ["36-60m Head Range", "Up to 3.6 m³/h Flow", "Compact Lightweight Design", "Thermal Overload Protection"],
        "models": [
            {"model": "MKP60-1", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "36", "maxFlow": "1.56", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "5.5"},
            {"model": "MKP70-1", "powerHP": "0.75", "powerKW": "0.55", "maxHead": "50", "maxFlow": "3.0", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "8.8"},
            {"model": "MKP80-1", "powerHP": "1", "powerKW": "0.75", "maxHead": "60", "maxFlow": "3.6", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "10.0"},
        ],
        "stats": {"Models": "3", "Head Range": "36-60m", "Flow Range": "1.6-3.6 m³/h", "Power Range": "0.37-0.75kW"},
        "overviewTitle": "MKP Series Overview",
        "overviewDesc": "The MKP Series is a compact peripheral pump line designed for installations where space is at a premium. Weighing as little as 5.5 kg, these pumps deliver impressive head pressure from a small footprint. The brass impeller and cast iron body ensure durability, while the copper-wound motor provides efficient operation.",
        "perfCurves": [
            {"model": "MKP80-1", "color": "#00D4AA", "points": [(0,60), (0.5,57), (1.0,52), (1.5,45), (2.0,35), (2.5,22), (3.0,10), (3.6,3)]},
            {"model": "MKP70-1", "color": "#4ECDC4", "points": [(0,50), (0.5,48), (1.0,44), (1.5,38), (2.0,30), (2.5,18), (3.0,6)]},
            {"model": "MKP60-1", "color": "#FFD93D", "points": [(0,36), (0.4,34), (0.8,30), (1.2,23), (1.56,10)]},
        ],
        "feats": [
            ("Gauge", "36-60m Head\nin Compact Form", "High-pressure output from a pump weighing just 5.5-10 kg. Ideal for tight installations."),
            ("Box", "Space-Saving\nDesign", "Compact dimensions allow installation in pump houses, under sinks, or in utility closets."),
            ("Shield", "Cast Iron +\nBrass Impeller", "Premium materials for long-lasting performance in continuous water transfer duty."),
            ("Sun", "Thermal\nProtection", "Automatic thermal cutoff prevents overheating during extended operation."),
        ],
        "apps": [
            ("Home", "Home Pressure", "Boosting water pressure for showers, taps, and appliances in single-family homes."),
            ("Sprout", "Garden Care", "Small to medium garden irrigation, greenhouse watering, and lawn sprinklers."),
            ("Factory", "Light Industry", "Car wash stations, small workshops, and commercial cleaning applications."),
            ("Ship", "Mobile Use", "Lightweight design suitable for mobile installations and temporary water supply."),
        ],
        "faqs": [
            ("How does MKP differ from QB Series?", "The MKP Series offers a more compact, lightweight design while maintaining similar head performance. It's ideal for space-constrained installations."),
            ("What is the noise level?", "MKP pumps operate at approximately 60-65 dB, similar to other peripheral pumps. Sound-dampening mounts are recommended for indoor installations."),
            ("Can I install it outdoors?", "Yes, with proper weather protection (IP44 motor). Avoid direct rain exposure on the motor housing."),
            ("Does it need a foot valve?", "Yes, a foot valve at the suction line end is recommended to maintain prime between pump cycles."),
            ("What pipe size is recommended?", "1 inch (25mm) suction and discharge pipes are standard. Use the same diameter as the pump inlet/outlet."),
        ],
    },
    # ===== CENTRIFUGAL PUMP =====
    {
        "key": "centrifugal-pump/mcp-series",
        "title": "MCP SERIES",
        "subtitle": "Centrifugal Pumps — Standard Single-Stage",
        "desc": "The MCP Series delivers 20-45m head with flow rates up to 8.4 m³/h across five power tiers. Proven single-stage design for reliable water transfer.",
        "heroCheckmarks": ["20-45m Head Range", "Up to 8.4 m³/h Flow", "Single-Stage Centrifugal", "Thermal Overload Protection"],
        "models": [
            {"model": "MCP130A", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "20", "maxFlow": "4.8", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "7.5"},
            {"model": "MCP146A", "powerHP": "0.75", "powerKW": "0.55", "maxHead": "27", "maxFlow": "6.6", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "11.5"},
            {"model": "MCP158A", "powerHP": "1", "powerKW": "0.75", "maxHead": "35", "maxFlow": "7.2", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "12.5"},
            {"model": "MCP180A", "powerHP": "1.5", "powerKW": "1.1", "maxHead": "42", "maxFlow": "7.8", "suctionHead": "9", "inletOutlet": "1.25\" x 1\"", "weight": "19.5"},
            {"model": "MCP200A", "powerHP": "2", "powerKW": "1.5", "maxHead": "45", "maxFlow": "8.4", "suctionHead": "9", "inletOutlet": "1.25\" x 1\"", "weight": "20.5"},
        ],
        "stats": {"Models": "5", "Head Range": "20-45m", "Flow Range": "4.8-8.4 m³/h", "Power Range": "0.37-1.5kW"},
        "overviewTitle": "MCP Series Overview",
        "overviewDesc": "The MCP Series is a robust single-stage centrifugal pump line for general-purpose water transfer. The cast iron body with brass impeller delivers reliable performance for domestic, agricultural, and light industrial applications. Models available from 0.5HP to 2HP with single-phase and three-phase motor options.",
        "perfCurves": [
            {"model": "MCP200A", "color": "#00D4AA", "points": [(0,45), (1,43), (2,41), (3,38), (4,34), (5,28), (6,20), (7,10), (8.4,3)]},
            {"model": "MCP158A", "color": "#4ECDC4", "points": [(0,35), (1,34), (2,32), (3,29), (4,24), (5,18), (6,10), (7.2,3)]},
            {"model": "MCP130A", "color": "#FFD93D", "points": [(0,20), (1,19), (2,17), (3,14), (4,8), (4.8,3)]},
        ],
        "feats": [
            ("Gauge", "20-45m Head\nCoverage", "Five models spanning light domestic to light commercial water transfer requirements."),
            ("Droplets", "Up to 8.4 m³/h\nFlow Rate", "High-volume water transfer suitable for irrigation, tank filling, and supply systems."),
            ("Shield", "Cast Iron\nConstruction", "Heavy-duty cast iron pump body with replaceable brass impeller for long life."),
            ("Zap", "Single/3-Phase\nOptions", "Flexible power configurations for residential (220V) and industrial (380V) applications."),
        ],
        "apps": [
            ("Home", "Domestic Supply", "Home water supply, pressure boosting, and garden irrigation systems."),
            ("Sprout", "Agriculture", "Crop irrigation, livestock watering, and greenhouse water circulation."),
            ("Building2", "Building Supply", "Multi-story building water supply and pressure boosting."),
            ("Wrench", "Light Industry", "General water transfer, cooling circulation, and process water supply."),
        ],
        "faqs": [
            ("Does MCP need priming?", "Yes, the pump body must be filled with water before first startup. A foot valve keeps the suction line primed."),
            ("What is the maximum suction lift?", "Up to 9 meters with a properly sealed suction line and foot valve at the water source."),
            ("Can I run it continuously?", "Yes, MCP pumps are designed for continuous duty (S1) operation within rated specifications."),
            ("What maintenance is required?", "Annual inspection of mechanical seal, impeller clearance, and motor bearings. Clean inlet strainer regularly."),
            ("Single-phase or three-phase?", "Single-phase (220V) for residential use. Three-phase (380V) for industrial or agricultural applications where available."),
        ],
    },
    {
        "key": "centrifugal-pump/dk-series",
        "title": "DK SERIES",
        "subtitle": "Centrifugal Pumps — Dual-Impeller High Flow",
        "desc": "The DK Series dual-impeller centrifugal pumps deliver high flow rates up to 22 m³/h with 14-20m head. Ideal for large-volume water transfer applications.",
        "heroCheckmarks": ["14-20m Head Range", "Up to 22 m³/h Flow", "Dual-Impeller Design", "1\" to 2\" Port Sizes"],
        "models": [
            {"model": "1DK-14", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "14", "maxFlow": "6.5", "suctionHead": "7", "inletOutlet": "1\" x 1\"", "weight": "7.5"},
            {"model": "1.5DK-20", "powerHP": "1", "powerKW": "0.75", "maxHead": "20", "maxFlow": "16.0", "suctionHead": "7", "inletOutlet": "1.5\" x 1.5\"", "weight": "11.0"},
            {"model": "2DK-20", "powerHP": "2.2", "powerKW": "1.5", "maxHead": "20", "maxFlow": "22.0", "suctionHead": "7", "inletOutlet": "2\" x 2\"", "weight": "16.5"},
        ],
        "stats": {"Models": "3", "Head Range": "14-20m", "Flow Range": "6.5-22 m³/h", "Power Range": "0.37-1.5kW"},
        "overviewTitle": "DK Series Overview",
        "overviewDesc": "The DK Series uses a dual-impeller centrifugal design optimized for high flow rates rather than high head. Three port sizes (1, 1.5, and 2 inches) match different volume requirements. Ideal for agricultural irrigation, pond filling, construction dewatering, and large-tank water transfer.",
        "perfCurves": [
            {"model": "2DK-20", "color": "#00D4AA", "points": [(0,20), (4,19), (8,18), (12,16), (16,12), (20,6), (22,2)]},
            {"model": "1.5DK-20", "color": "#4ECDC4", "points": [(0,20), (3,19), (6,17), (9,14), (12,10), (15,4), (16,1)]},
            {"model": "1DK-14", "color": "#FFD93D", "points": [(0,14), (1.5,13), (3,12), (4.5,9), (6,4), (6.5,1)]},
        ],
        "feats": [
            ("Droplets", "Up to 22 m³/h\nHigh Flow", "Dual-impeller design prioritizes volume over pressure for rapid water movement."),
            ("Gauge", "14-20m\nModerate Head", "Sufficient head for surface-level water transfer, filling, and irrigation."),
            ("Wrench", "3 Port Sizes\n1\" to 2\"", "Progressive port sizes matching flow requirements from 6.5 to 22 m³/h."),
            ("Shield", "Cast Iron\nDurability", "Robust cast iron body for continuous duty in demanding agricultural environments."),
        ],
        "apps": [
            ("Sprout", "Farm Irrigation", "Field and crop irrigation requiring high water volumes at moderate pressure."),
            ("Droplets", "Pond/Tank Fill", "Rapid filling of water storage tanks, ponds, and reservoirs."),
            ("Building2", "Construction", "Construction site dewatering and temporary water supply systems."),
            ("Fish", "Aquaculture", "Water circulation and transfer in fish farms and aquaculture facilities."),
        ],
        "faqs": [
            ("What is the difference between DK and CP(m)?", "DK focuses on high flow (up to 22 m³/h) at lower head (14-20m), while CP(m) balances flow and head. Choose DK for volume-critical applications."),
            ("Can DK handle dirty water?", "DK pumps are designed for clean water only. For dirty water or sewage, use our submersible sewage pump range."),
            ("What pipe diameter should I use?", "Match the pump port size: 1DK uses 1\", 1.5DK uses 1.5\", 2DK uses 2\". Larger suction pipes can improve performance."),
            ("Is a foot valve needed?", "Yes, a foot valve on the suction line maintains prime and prevents backflow during pump stops."),
            ("What is the noise level?", "DK pumps operate at approximately 65-70 dB. Outdoor or pump-house installation is recommended."),
        ],
    },
    {
        "key": "centrifugal-pump/shfm-series",
        "title": "SHF(m) SERIES",
        "subtitle": "Centrifugal Pumps — High-Volume Transfer",
        "desc": "The SHF(m) Series delivers the highest flow rates in our centrifugal range — up to 72 m³/h. Designed for large-scale water transfer, irrigation, and industrial applications.",
        "heroCheckmarks": ["14.7-25.5m Head Range", "Up to 72 m³/h Flow", "2\" to 3\" Ports", "2-3HP Motor"],
        "models": [
            {"model": "SHF(m)6B", "powerHP": "2", "powerKW": "1.5", "maxHead": "14.7", "maxFlow": "66", "suctionHead": "7", "inletOutlet": "3\" x 3\"", "weight": "31.0"},
            {"model": "SHF(m)5BM", "powerHP": "1.5", "powerKW": "1.1", "maxHead": "23.5", "maxFlow": "30", "suctionHead": "7", "inletOutlet": "2\" x 2\"", "weight": "23.0"},
            {"model": "SHF(m)5AM", "powerHP": "2", "powerKW": "1.5", "maxHead": "25.5", "maxFlow": "30", "suctionHead": "7", "inletOutlet": "2\" x 2\"", "weight": "23.5"},
            {"model": "SHF(m)6A", "powerHP": "3", "powerKW": "2.2", "maxHead": "18.5", "maxFlow": "72", "suctionHead": "7", "inletOutlet": "3\" x 3\"", "weight": "37.0"},
        ],
        "stats": {"Models": "4", "Head Range": "14.7-25.5m", "Flow Range": "30-72 m³/h", "Power Range": "1.1-2.2kW"},
        "overviewTitle": "SHF(m) Series Overview",
        "overviewDesc": "The SHF(m) Series represents our highest-capacity centrifugal pump line, capable of moving up to 72,000 liters per hour. The 3-inch port models are ideal for agricultural irrigation systems, flood control, and industrial water circulation. The 2-inch variants balance high flow with increased head pressure.",
        "perfCurves": [
            {"model": "SHF(m)6A", "color": "#00D4AA", "points": [(0,18.5), (12,17.5), (24,16), (36,14), (48,11), (60,7), (72,2)]},
            {"model": "SHF(m)5AM", "color": "#4ECDC4", "points": [(0,25.5), (5,24.5), (10,23), (15,20), (20,16), (25,10), (30,3)]},
            {"model": "SHF(m)6B", "color": "#FFD93D", "points": [(0,14.7), (13,14), (26,12.5), (39,10), (52,7), (66,3)]},
        ],
        "feats": [
            ("Droplets", "Up to 72 m³/h\nMaximum Flow", "Move 72,000 liters per hour — ideal for large-scale water management."),
            ("Gauge", "3\" Large\nPort Size", "Oversized 3-inch ports minimize flow resistance and maximize throughput."),
            ("Shield", "Heavy-Duty\nConstruction", "Reinforced cast iron body weighing up to 37 kg for continuous industrial duty."),
            ("Zap", "2-3HP\nMotor", "Powerful induction motors with thermal protection for reliable 24/7 operation."),
        ],
        "apps": [
            ("Sprout", "Large Irrigation", "Field irrigation systems, canal pumping, and agricultural water supply networks."),
            ("Droplets", "Flood Control", "Flood water removal, drainage of large areas, and emergency dewatering."),
            ("Factory", "Industrial", "Cooling water circulation, process water supply, and factory water systems."),
            ("Building2", "Municipal", "Public water supply, fire hydrant boosting, and municipal water management."),
        ],
        "faqs": [
            ("What pipe size should I use?", "Use pipe matching the pump port: 2\" for 5AM/5BM models, 3\" for 6A/6B models. Use smooth-bore pipes to minimize friction losses."),
            ("Can I run it on single-phase power?", "The larger models (6A, 6B) require three-phase 380V power. The 5BM model may be available in single-phase."),
            ("How often does it need maintenance?", "Annual inspection of mechanical seal, bearings, and impeller. Check suction strainer monthly. Motor bearings are sealed for life."),
            ("Is a soft starter needed?", "For 3HP+ three-phase models, a soft starter or star-delta starter is recommended to reduce startup current surge."),
            ("What's the maximum operating temperature?", "Up to 40°C for standard models. For hot water applications, contact us for high-temperature seal options."),
        ],
    },
    {
        "key": "centrifugal-pump/scm-series",
        "title": "SCM SERIES",
        "subtitle": "Centrifugal Pumps — Standard Medium-Flow",
        "desc": "The SCM Series offers reliable 20-35m head performance across three power tiers. A versatile centrifugal pump for domestic and light commercial water applications.",
        "heroCheckmarks": ["20-35m Head Range", "Up to 7.2 m³/h Flow", "Single-Stage Design", "1\" Inlet/Outlet"],
        "models": [
            {"model": "SCM42", "powerHP": "0.5", "powerKW": "0.37", "maxHead": "20", "maxFlow": "4.8", "suctionHead": "8", "inletOutlet": "1\" x 1\"", "weight": "8.8"},
            {"model": "SCM42/0.75", "powerHP": "0.75", "powerKW": "0.55", "maxHead": "26", "maxFlow": "6.0", "suctionHead": "8", "inletOutlet": "1\" x 1\"", "weight": "11.0"},
            {"model": "SCM52", "powerHP": "1", "powerKW": "0.75", "maxHead": "35", "maxFlow": "7.2", "suctionHead": "8", "inletOutlet": "1\" x 1\"", "weight": "13.0"},
        ],
        "stats": {"Models": "3", "Head Range": "20-35m", "Flow Range": "4.8-7.2 m³/h", "Power Range": "0.37-0.75kW"},
        "overviewTitle": "SCM Series Overview",
        "overviewDesc": "The SCM Series is a versatile single-stage centrifugal pump line for general-purpose water applications. With cast iron construction and copper-wound induction motors, these pumps provide reliable performance for domestic water supply, irrigation, and light industrial use. All models feature 1\" threaded ports for easy integration with standard plumbing.",
        "perfCurves": [
            {"model": "SCM52", "color": "#00D4AA", "points": [(0,35), (1.2,34), (2.4,32), (3.6,28), (4.8,23), (6.0,15), (7.2,5)]},
            {"model": "SCM42/0.75", "color": "#4ECDC4", "points": [(0,26), (1.2,25), (2.4,23), (3.6,19), (4.8,13), (6.0,5)]},
            {"model": "SCM42", "color": "#FFD93D", "points": [(0,20), (1.2,19), (2.4,16), (3.6,12), (4.8,5)]},
        ],
        "feats": [
            ("Gauge", "20-35m Head\nCoverage", "Three power tiers covering residential water supply and light commercial applications."),
            ("Shield", "Cast Iron\nBody", "Durable cast iron construction with brass impeller for years of reliable service."),
            ("Droplets", "Up to 7.2 m³/h\nFlow", "Sufficient flow for multi-tap domestic supply and small-scale irrigation."),
            ("Wrench", "Standard 1\"\nPorts", "Common 1-inch threaded connections for easy installation with standard plumbing."),
        ],
        "apps": [
            ("Home", "Home Supply", "Domestic water supply, garden taps, and household pressure systems."),
            ("Sprout", "Small Irrigation", "Vegetable gardens, flower beds, and greenhouse watering systems."),
            ("Building2", "Light Commercial", "Small hotels, guesthouses, and commercial building water supply."),
            ("Wrench", "Workshops", "Car washing, equipment cleaning, and workshop water supply."),
        ],
        "faqs": [
            ("Does SCM need priming?", "Yes, fill the pump body with water before first use. A foot valve maintains prime in suction-lift installations."),
            ("Can I use it with a pressure controller?", "Yes, SCM works well with electronic pressure controllers and mechanical pressure switches for automatic operation."),
            ("What is the difference between SCM and MCP?", "Both are single-stage centrifugal pumps. SCM uses slightly different hydraulic design. Performance is comparable within similar power ratings."),
            ("Is it self-priming?", "No, standard centrifugal pumps require manual priming. For self-priming capability, see our Jet Pump or Peripheral Pump ranges."),
            ("What maintenance is needed?", "Periodic cleaning of the inlet strainer and annual inspection of the mechanical seal. The sealed bearings require no lubrication."),
        ],
    },
    {
        "key": "centrifugal-pump/cm-series",
        "title": "CM SERIES",
        "subtitle": "Centrifugal Pumps — Compact Design",
        "desc": "The CM Series provides 35m head in a compact single-stage centrifugal design. Simple, reliable water transfer for domestic and light commercial use.",
        "heroCheckmarks": ["35m Head", "7.2 m³/h Flow", "Single-Stage Design", "Compact Footprint"],
        "models": [
            {"model": "CM100", "powerHP": "1", "powerKW": "0.75", "maxHead": "35", "maxFlow": "7.2", "suctionHead": "8", "inletOutlet": "1\" x 1\"", "weight": "13.0"},
            {"model": "MCP-76", "powerHP": "1", "powerKW": "0.75", "maxHead": "35", "maxFlow": "7.2", "suctionHead": "9", "inletOutlet": "1\" x 1\"", "weight": "13.0"},
        ],
        "stats": {"Models": "2", "Head Range": "35m", "Flow Range": "7.2 m³/h", "Power Range": "0.75kW"},
        "overviewTitle": "CM Series Overview",
        "overviewDesc": "The CM Series is a streamlined centrifugal pump line offering a focused 35m head / 7.2 m³/h performance point. Two model variants provide installation flexibility. The compact design fits standard plumbing installations without modification. Ideal for consistent-demand applications where a single performance specification meets requirements.",
        "perfCurves": [
            {"model": "CM100", "color": "#00D4AA", "points": [(0,35), (1.2,34), (2.4,32), (3.6,28), (4.8,23), (6.0,15), (7.2,5)]},
            {"model": "MCP-76", "color": "#FFD93D", "points": [(0,35), (1.2,34), (2.4,32), (3.6,28), (4.8,23), (6.0,15), (7.2,5)]},
        ],
        "feats": [
            ("Target", "Focused\nPerformance", "Single performance point (35m / 7.2 m³/h) simplifies selection for standard applications."),
            ("Box", "Compact\nDesign", "Space-efficient footprint fits standard pump houses and utility rooms."),
            ("Shield", "Cast Iron\nBody", "Durable construction with replaceable brass impeller for extended service life."),
            ("Zap", "1HP Motor\n0.75kW", "Efficient copper-wound induction motor with thermal overload protection."),
        ],
        "apps": [
            ("Home", "Domestic Supply", "Consistent water supply for single-family homes and small apartment buildings."),
            ("Sprout", "Garden Watering", "Irrigation for medium-sized gardens, lawns, and landscaping projects."),
            ("Building2", "Pressure Boost", "Boosting municipal water pressure for upper-floor taps and showers."),
            ("Wrench", "Workshop", "General water supply for workshops, car washing, and equipment cleaning."),
        ],
        "faqs": [
            ("What is the difference between CM100 and MCP-76?", "Both deliver the same performance (35m, 7.2 m³/h). The MCP-76 has slightly higher suction lift capability (9m vs 8m) and different body design."),
            ("Can it be used with well water?", "Yes, for shallow wells up to 8-9m depth with proper suction line and foot valve installation."),
            ("Is it suitable for continuous operation?", "Yes, the S1 duty rating allows continuous operation within rated specifications."),
            ("What pipe size is recommended?", "1-inch (25mm) pipes match the pump ports. Use smooth-bore pipes to minimize friction losses."),
            ("Does it need a pressure tank?", "A pressure tank reduces cycling frequency but is not required. Direct-on-tap operation is possible for simple applications."),
        ],
    },
]

# Now generate the TypeScript entries
print("Generating entries for", len(series_data), "series...")
all_entries = []

for s in series_data:
    key = s["key"]
    title = s["title"]
    subtitle = s["subtitle"]
    desc = s["desc"]
    checks = s["heroCheckmarks"]
    
    # Model images (use product image)
    model_img = f'/images/products/centrifugal-pump.png' if 'centrifugal' in key else f'/images/products/peripheral-pump.png'
    
    img_labels = [m["model"] for m in s["models"][:3]]
    model_imgs = ",\n        ".join(f'{{ src: "{model_img}", label: "{l}" }}' for l in img_labels)
    
    # Stats
    stats = s["stats"]
    stat_icons = {"Models": "Layers", "Head Range": "Gauge", "Flow Range": "Droplets", "Power Range": "Zap"}
    stat_str = ",\n        ".join(f'{{ icon: "{stat_icons.get(k, "Star")}", label: "{k}", value: "{v}" }}' for k, v in stats.items())
    
    # Models
    model_str = ",\n        ".join(
        f'{{ model: "{m["model"]}", powerHP: "{m["powerHP"]}", powerKW: "{m["powerKW"]}", maxHead: "{m["maxHead"]}", maxFlow: "{m["maxFlow"]}", suctionHead: "{m["suctionHead"]}", inletOutlet: \'{m["inletOutlet"]}\', weight: "{m["weight"]}" }}'
        for m in s["models"]
    )
    
    # Performance curves
    curve_str = ",\n        ".join(
        f'{{ model: "{c["model"]}", color: "{c["color"]}", data: [{", ".join(f"{{ flow: {p[0]}, head: {p[1]} }}" for p in c["points"])}] }}'
        for c in s["perfCurves"]
    )
    
    # Features
    feat_str = ",\n        ".join(
        f'{{ icon: "{icon}", title: "{title_}", desc: "{desc_}" }}'
        for icon, title_, desc_ in s["feats"]
    )
    
    # Applications
    app_str = ",\n        ".join(
        f'{{ icon: "{icon}", label: "{label}", desc: "{desc_}" }}'
        for icon, label, desc_ in s["apps"]
    )
    
    # FAQs
    faq_str = ",\n        ".join(
        f'{{ q: "{q}", a: "{a}" }}'
        for q, a in s["faqs"]
    )
    
    entry = f'''
  /* ─── {key.upper()} ─── */
  "{key}": {{
    title: "{title}",
    subtitle: "{subtitle}",
    desc: "{desc}",
    heroCheckmarks: [
        "{checks[0]}",
        "{checks[1]}",
        "{checks[2]}",
        "{checks[3]}",
    ],
    modelImages: [
        {model_imgs},
    ],
    stats: [
        {stat_str},
    ],
    overviewTitle: "{s["overviewTitle"]}",
    overviewDesc: "{s["overviewDesc"]}",
    overviewImage: "{model_img}",
    phaseOptions: [
        {{ label: "Single Phase", desc: "220V / 50Hz · Residential power supply" }},
    ],
    tableCols: [
        {{ key: "model", label: "Model" }},
        {{ key: "powerHP", label: "Power (HP)" }},
        {{ key: "powerKW", label: "Power (kW)" }},
        {{ key: "maxHead", label: "Max. Head (m)" }},
        {{ key: "maxFlow", label: "Max. Flow (m³/h)" }},
        {{ key: "suctionHead", label: "Suction (m)" }},
        {{ key: "inletOutlet", label: "Inlet/Outlet" }},
        {{ key: "weight", label: "G.W (kg)" }},
    ],
    models: [
        {model_str},
    ],
    performanceCurves: [
        {curve_str},
    ],
    features: [
        {feat_str},
    ],
    applications: [
        {app_str},
    ],
    faqs: [
        {faq_str},
    ],
    ctaTitle: "Get {title} Quote",
    ctaDesc: "Contact us for pricing, technical specifications, and availability. Our team is ready to help you select the right pump for your application.",
  }},'''
    
    all_entries.append(entry)

out_path = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\scripts\generated-series.ts"
with open(out_path, "w", encoding="utf-8") as f:
    f.write("/* Auto-generated missing series data - append to chloe-products.ts */\n")
    f.write("\n".join(all_entries))
    f.write("\n")

print("Generated " + str(len(series_data)) + " series entries -> scripts/generated-series.ts")
