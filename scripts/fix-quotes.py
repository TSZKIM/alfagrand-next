#!/usr/bin/env python3
"""Post-process generated products.ts to fix quoting/encoding issues"""
import re

path = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\data\products.ts"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Strategy: we have inletOutlet values like "1"x1"" which is broken TS
# We need to either:
# 1. Replace the whole field to use single quotes: inletOutlet: '1" x 1"'
# 2. Or remove inch marks: inletOutlet: "1 x 1"

# Let's do option 1: use single quotes for inletOutlet values

def fix_inletOutlet_line(line):
    """Fix a line containing inletOutlet with broken quoting"""
    # Match inletOutlet: "value" pattern
    # The value may contain unescaped double quotes
    m = re.match(r'^(.*inletOutlet:\s*)(.*?)(,?\s*)$', line)
    if not m:
        return line
    
    prefix = m.group(1)
    value_part = m.group(2)
    suffix = m.group(3)
    
    # The value_part starts with " and ends with " but has internal quotes
    # Strategy: replace all " in the value with just inch-mark text
    # Remove the outer quotes and all inner quotes, then use single quotes
    
    # Extract the raw value by stripping outer quotes
    raw = value_part.strip()
    if raw.startswith('"') and raw.endswith('"'):
        inner = raw[1:-1]
    elif raw.startswith('"') and raw.endswith('",'):
        inner = raw[1:-2]
    else:
        return line
    
    # Replace " (inch) inside with a safe character sequence
    # Keep the inch marks but wrap in single quotes
    return prefix + "'" + inner + "'" + suffix

lines = content.split('\n')
fixed = []
for line in lines:
    if 'inletOutlet: "' in line and 'inletOutlet:' not in line.split('//')[0]:
        # Only fix lines that aren't comments
        line = fix_inletOutlet_line(line)
    fixed.append(line)

content = '\n'.join(fixed)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {path}")

# Verify
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Check for any remaining ×
has_x = any('\u00d7' in l for l in lines)
print(f"Has multiplication sign: {has_x}")

# Check a few fixed lines
for i, l in enumerate(lines):
    if 'inletOutlet' in l and "'1" in l:
        print(f"  Line {i+1}: {l.rstrip()[:100]}")
