"""Second pass: fix grammar artifacts from CHLOE removal"""
import re

path = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\data\chloe-products.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix grammatical artifacts
fixes = [
    ("from our delivers", "delivers"),
    ("from our", ""),
    ("from ", "from "),  # no-op, placeholder
    ("is 's ", "is "),
    ("'s ", " "),
    ("( catalog P", "(P"),
    ("( catalog", ""),
    (" P01)", ""),
    (" P02)", ""),
    (" P08)", ""),
    (" P09)", ""),
    (" P10)", ""),
    (" P12)", ""),
    (" P13)", ""),
    (" P17)", ""),
    (" P18)", ""),
    (" P19)", ""),
    (" P20)", ""),
    (" P21)", ""),
    (" P23)", ""),
    (" P24)", ""),
    ("PUMP CATALOGUE", "Product Catalog"),
    # Clean up remaining parenthetical artifacts  
    ("()", ""),
    ("( )", ""),
    ("  ", " "),
]

for old, new in fixes:
    content = content.replace(old, new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Second-pass cleanup done")
