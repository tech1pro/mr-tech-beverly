const fs = require('node:fs');
for (const page of ['index.html', 'custom-gaming.html', 'upgrades.html', 'recycling.html']) {
  const html = fs.readFileSync(page, 'utf8');
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|tel:|sms:|data:)/.test(href)) continue;
    const [file, anchor] = href.split('#');
    const target = file || page;
    if (!fs.existsSync(target)) throw new Error('Missing file: ' + target);
    if (anchor && !fs.readFileSync(target, 'utf8').includes('id="' + anchor + '"')) throw new Error('Missing anchor: ' + href);
  }
  for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(script[1]);
  console.log(page + ': links and scripts valid');
}
JSON.parse(fs.readFileSync('free-items.json', 'utf8'));
new Function(fs.readFileSync('free-items.js', 'utf8'));
