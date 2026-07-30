"""Clean CHLOE brand references from chloe-products.ts"""
import re

path = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\data\chloe-products.ts"
with open(path, "r", encoding="utf-8-sig") as f:
    content = f.read()

replacements = [
    # Header
    ("CHLOE", "ALFAGRAND"),
    ("CHLOE PUMP CATALOGUE.pdf", "product catalogs"),
    # Subtitle patterns
    ("ALFAGRAND Peripheral Pumps", "Peripheral Pumps"),
    ("ALFAGRAND Peripheral Series", "Peripheral Series"),
    ("ALFAGRAND Centrifugal Pumps", "Centrifugal Pumps"),
    ("ALFAGRAND High-Flow Centrifugal Pumps", "High-Flow Centrifugal Pumps"),
    ("ALFAGRAND Dual-Impeller Pumps", "Dual-Impeller Pumps"),
    ("ALFAGRAND Self-Priming Jet Pumps", "Self-Priming Jet Pumps"),
    ("ALFAGRAND Submersible Pumps", "Submersible Pumps"),
    ("ALFAGRAND Sewage Pumps", "Sewage Pumps"),
    ("ALFAGRAND Intelligent VFD Pumps", "Intelligent VFD Pumps"),
    ("ALFAGRAND Vertical Multistage Pumps", "Vertical Multistage Pumps"),
    ("ALFAGRAND Submersible Series", "Submersible Series"),
    ("ALFAGRAND Sewage Series", "Sewage Series"),
    ("ALFAGRAND VFD Series", "VFD Series"),
    ("ALFAGRAND Multistage Series", "Multistage Series"),
    ("ALFAGRAND Surface Pumps", "Surface Pumps"),
    # Clean up over-replacements
    ("the ALFAGRAND", "the"),
    ("from ALFAGRAND", "from our"),
    ("of ALFAGRAND", "of our"),
    ("ALFAGRAND delivers", "delivers"),
    ("ALFAGRAND offers", "offers"),
    ("ALFAGRAND model", "Model"),
    ("ALFAGRAND is", "This"),
    ("ALFAGRAND uses", "uses"),
    ("ALFAGRAND", ""),
    # Clean up
    ("  ", " "),
    (" .", "."),
    ("\n\n\n", "\n\n"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("chloe-products.ts cleaned")
print(f"CHLOE references remaining: {content.count('CHLOE')}")
