import re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

content = open('src/data/series-data.ts', encoding='utf-8').read()

# 找出所有系列key
key_pattern = re.compile(r'"([a-z-]+/[a-z0-9/. -]+-series[^"]*)"\s*:\s*\{')
keys = key_pattern.findall(content)

# 对每个key统计model数量
model_pattern = re.compile(r'model:\s*`([^`]+)`')
positions = [(m.start(), m.group(1)) for m in key_pattern.finditer(content)]

results = {}
for i, (pos, key) in enumerate(positions):
    end_pos = positions[i+1][0] if i+1 < len(positions) else len(content)
    block = content[pos:end_pos]
    models = model_pattern.findall(block)
    results[key] = models

for key, models in results.items():
    print(f'{key}: {len(models)} -> {models}')
