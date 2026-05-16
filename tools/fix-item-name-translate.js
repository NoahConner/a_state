const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src', 'app', 'pages');

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.html')) processFile(full);
  }
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const lines = original.split(/\r?\n/);
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    if (/(item\?\.name|item\.name)\s*\|\s*translateHtml\s*\|\s*async/.test(lines[i])) {
      lines[i] = lines[i].replace(/item\?\.name\s*\|\s*translateHtml\s*\|\s*async/g, 'item.name | translateHtml | async');
      changed = true;

      for (let j = i - 1; j >= 0 && j >= i - 8; j--) {
        const line = lines[j];
        if (/\<div\b[^>]*class=["']chip["'][^>]*>/i.test(line)) {
          if (!/\*ngIf\s*=/.test(line)) {
            lines[j] = line.replace(/<div(\b[^>]*)>/i, '<div$1 *ngIf="item.name">');
            changed = true;
          }
          break;
        }
      }
    }
  }

  if (changed && lines.join('\n') !== original) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    return true;
  }
  return false;
}

const changedFiles = [];
walk(root);
console.log('Done.');
