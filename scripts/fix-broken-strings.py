"""Fix broken string literals where \n in data became actual newlines."""
import os

path = r"src/app/[locale]/products/[slug]/[series]/page.tsx"

with open(path, 'rb') as f:
    raw = f.read()

lines = raw.split(b'\r\n')
if len(lines) == 1:
    lines = raw.split(b'\n')

# Structural line starters that should NOT be joined
STRUCTURAL = (
    b'//', b'/*', b'*', b'import', b'export', b'type ', b'interface',
    b'const ', b'function', b'return', b'</', b'/>', b'...', b'if ',
    b'for ', b'while ', b'try ', b'catch', b'finally', b'class ',
    b'enum ', b'module', b'declare', b'async', b'await', b'yield',
    b'switch', b'case ', b'default', b'break', b'continue',
    b'new ', b'this.', b'super.', b'void ', b'typeof', b'delete',
    b'import(', b'require(', b'console.', b'debugger',
)

NON_STRUCTURAL_FIRST = set(b'})[]<>&|+-*=:;,./#')

fixed = []
i = 0
while i < len(lines):
    line = lines[i]
    stripped = line.lstrip()
    
    # Count unescaped double quotes
    quotes = 0
    j = 0
    while j < len(line):
        if line[j:j+1] == b'"' and (j == 0 or line[j-1:j] != bytes([0x5c])):
            quotes += 1
        j += 1
    
    # If odd number of quotes, string is unclosed
    if quotes % 2 == 1 and i + 1 < len(lines):
        next_line = lines[i + 1]
        next_stripped = next_line.lstrip()
        
        if not next_stripped:
            # Empty line - don't join
            fixed.append(line)
            i += 1
            continue
        
        first_byte = next_stripped[:1]
        
        # Don't join if next line is clearly structural
        is_structural = (
            first_byte in NON_STRUCTURAL_FIRST or
            any(next_stripped.startswith(s) for s in STRUCTURAL)
        )
        
        if not is_structural:
            # Join: prev line + literal backslash-n + next line content
            # literal backslash + n (two bytes: 0x5c 0x6e)
            merged = line + bytes([0x5c, 0x6e]) + next_line
            fixed.append(merged)
            i += 2
            continue
    
    fixed.append(line)
    i += 1

result = b'\r\n'.join(fixed)
with open(path, 'wb') as f:
    f.write(result)

print(f'Joined {len(lines) - len(fixed)} broken lines')
print(f'Original lines: {len(lines)}, Fixed lines: {len(fixed)}')
