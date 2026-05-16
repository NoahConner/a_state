const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src', 'app', 'pages');
let changedFiles = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.html')) processFile(full);
  }
}

function processFile(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  const original = text;

  // Regex: match tags where inner content is exactly the translate interpolation
  const re = /<(\w+)([^>]*)>\s*\{\{\s*'([^']+)'\s*\|\s*translate\s*\}\}\s*<\/\1>/g;

  text = text.replace(re, (m, tag, attrs, key) => {
    if (tag.toLowerCase() === 'button') return m; // skip buttons
    // don't change if attr already has innerHTML
    if (/\[innerHTML\]=/.test(attrs)) return m;
    // Build replacement preserving attributes spacing
    return `<${tag}${attrs} [innerHTML]="'${key}' | translateHtml | async"></${tag}>`;
  });

  // Also replace cases where tag content is the interpolation but tag closing on separate line (common in templates)
  const reMultiline = /<(\w+)([^>]*)>\s*\n\s*\{\{\s*'([^']+)'\s*\|\s*translate\s*\}\}\s*\n\s*<\/\1>/g;
  text = text.replace(reMultiline, (m, tag, attrs, key) => {
    if (tag.toLowerCase() === 'button') return m;
    if (/\[innerHTML\]=/.test(attrs)) return m;
    return `<${tag}${attrs} [innerHTML]="'${key}' | translateHtml | async"></${tag}>`;
  });

  if (text !== original) {
    fs.writeFileSync(filePath, text, 'utf8');
    changedFiles.push(filePath);
  }
}

walk(root);

console.log('Changed files:', changedFiles.length);
changedFiles.forEach(f => console.log(' -', f));
