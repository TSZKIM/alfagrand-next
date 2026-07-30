#!/usr/bin/env python3
"""Fix inletOutlet quoting in products.ts"""
import re

INPUT = "C:/Users/华为/.qclaw/workspace-37i6raipm851ul5j/alfagrand-next/src/data/products.ts"

with open(INPUT, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern 1: inletOutlet: 'N'xM"" -> inletOutlet: 'N" x M"'
# Example: inletOutlet: '1'x1"" -> inletOutlet: '1" x 1"'
# The broken pattern is: single quote, number, single quote, x, number, two double quotes
content = re.sub(
    r"inletOutlet:\s*'(\d+(?:\.\d+)?)'x(\d+(?:\.\d+)?)\"\"",
    r"inletOutlet: '\1\" x \2\"'",
    content
)

# Pattern 2: inletOutlet: 'GN'" -> inletOutlet: 'GN"'
content = re.sub(
    r"inletOutlet:\s*'(G\d+(?:\.\d+)?)'\"",
    r"inletOutlet: '\1\"'",
    content
)

# Pattern 3: inletOutlet: 'N'" -> inletOutlet: 'N"'
# For WQD/QDX/S-SD with simple numbers like 1.5"
content = re.sub(
    r"inletOutlet:\s*'(\d+(?:\.\d+)?)'\"",
    r"inletOutlet: '\1\"'",
    content
)

with open(INPUT, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed inletOutlet quoting.")
print(f"File size: {len(content)} bytes")

# Verify: check for any remaining broken patterns
broken = re.findall(r"inletOutlet:\s*'\d+'\D", content)
if broken:
    print(f"WARNING: {len(broken)} potentially broken inletOutlet values remaining:")
    for b in broken[:10]:
        print(f"  {b}")
else:
    print("All inletOutlet values look correct!")
