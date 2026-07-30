"""Fix multiline strings in chloe-products.ts"""
import re

path = r"C:\Users\华为\.qclaw\workspace-37i6raipm851ul5j\alfagrand-next\src\data\chloe-products.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

def fix_multiline_strings(text):
    """Replace literal newlines within TypeScript string literals with \\n escapes"""
    lines = text.split("\n")
    result = []
    i = 0
    props = ["title", "desc", "label", "a", "q", "subtitle", "ctaDesc", "ctaTitle", "heroCheckmark"]
    
    while i < len(lines):
        line = lines[i]
        fixed = False
        
        for prop in props:
            prefix = prop + ': "'
            if prefix in line:
                after_prefix = line[line.index(prefix) + len(prefix):]
                # Check if string closes on same line
                if '"' not in after_prefix or not after_prefix.strip().endswith(('",', '"')):
                    # Multiline - merge
                    merged = line
                    j = i + 1
                    while j < len(lines):
                        merged = merged.rstrip("\n") + "\\n" + lines[j].strip()
                        if lines[j].strip().endswith(('",', '"')):
                            break
                        j += 1
                    result.append(merged)
                    i = j
                    fixed = True
                    break
                    
        if not fixed:
            result.append(line)
        i += 1
    
    return "\n".join(result)

content = fix_multiline_strings(content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

# Verify
check = re.findall(r'(?:title|desc|label|a|q|subtitle|ctaDesc|ctaTitle): "[^"\n]*\n[^"]*"', content)
print(f"Remaining multiline strings: {len(check)}")
if len(check) == 0:
    print("All fixed!")
