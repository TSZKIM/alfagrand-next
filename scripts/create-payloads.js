const fs = require('fs');
const tmpDir = 'C:/Users/华为/AppData/Local/Temp';

// Hero background
let content = fs.readFileSync(tmpDir + '/hero-bg.txt', 'utf8').trim();
let payload = JSON.stringify({message: 'assets: replace hero background image', content: content, sha: 'bf659f61cbc365770a8fcf348a92b8da233bb40a'});
fs.writeFileSync(tmpDir + '/payload_hero-bg.json', payload);
console.log('hero-bg payload:', payload.length);

// Certification images
for (const name of ['ce', 'iso9001', 'rohs', 'tuv']) {
    content = fs.readFileSync(tmpDir + '/' + name + '.txt', 'utf8').trim();
    payload = JSON.stringify({message: 'assets: add ' + name.toUpperCase() + ' certification logo', content: content});
    fs.writeFileSync(tmpDir + '/payload_' + name + '.json', payload);
    console.log(name + ' payload:', payload.length);
}
