const fs = require('fs');
const content = fs.readFileSync('src/data/series-data.ts', 'utf-8');

const catNames = {
  'peripheral-pump': 'Peripheral Pump',
  'centrifugal-pump': 'Centrifugal Pump',
  'self-priming-jet-pump': 'Self-Priming Jet Pump',
  'submersible-sewage-pump': 'Submersible Sewage Pump',
  'variable-frequency-pump': 'Variable Frequency Pump',
  'multi-stage-pump-sets': 'Multi-Stage Pump Sets',
};

let entries = [];
let currentSlug = '';
let currentTitle = '';
let inModels = false;
let modelBuffer = '';

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const keyMatch = line.match(/^\s*"([^"]+)":\s*\{/);
  if (keyMatch && keyMatch[1].includes('/')) {
    currentSlug = keyMatch[1];
  }

  const titleMatch = line.match(/^\s+title:\s*`([^`]+)`/);
  if (titleMatch) {
    currentTitle = titleMatch[1];
  }

  if (line.trim() === 'models: [') {
    inModels = true;
    modelBuffer = '';
    continue;
  }

  if (inModels) {
    if (line.trim() === '],') {
      inModels = false;
      continue;
    }

    modelBuffer += line + '\n';

    if (line.trim() === '},') {
      // Match both backtick and double-quote values
      const mM = modelBuffer.match(/model:\s*[`"]([^`"]+)[`"]/);
      const hM = modelBuffer.match(/powerHP:\s*[`"]([^`"]+)[`"]/);
      const kM = modelBuffer.match(/powerKW:\s*[`"]([^`"]+)[`"]/);
      const dhM = modelBuffer.match(/maxHead:\s*[`"]([^`"]+)[`"]/);
      const fM = modelBuffer.match(/maxFlow:\s*[`"]([^`"]+)[`"]/);

      if (mM) {
        const parts = currentSlug.split('/');
        const cat = parts[0];
        entries.push({
          model: mM[1],
          series: currentTitle,
          seriesSlug: currentSlug,
          category: catNames[cat] || cat.replace(/-/g, ' '),
          powerHP: hM ? hM[1] : '',
          powerKW: kM ? kM[1] : '',
          maxHead: dhM ? dhM[1] : '',
          maxFlow: fM ? fM[1] : '',
        });
      }
      modelBuffer = '';
    }
  }
}

// Add category entries for search
Object.entries(catNames).forEach(([slug, name]) => {
  entries.push({ model: name, series: '', seriesSlug: slug, category: name });
});
entries.push({ model: 'Deep Well Pump', series: '', seriesSlug: 'deep-well-pump', category: 'Deep Well Pump' });
entries.push({ model: 'Solar Pump System', series: '', seriesSlug: 'solar-pump-system', category: 'Solar Pump System' });

fs.writeFileSync('public/search-index.json', JSON.stringify(entries));
console.log('Search index: ' + entries.length + ' entries');
const cats = {};
entries.forEach(e => { cats[e.category] = (cats[e.category] || 0) + 1; });
Object.entries(cats).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log('  ' + k + ': ' + v));
