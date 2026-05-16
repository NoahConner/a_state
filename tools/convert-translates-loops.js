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

  // match any {{ ... | translate }} and capture the expression before the pipe
  const regex = /\{\{\s*([^\}]+?)\s*\|\s*translate\s*\}\}/g;
  let match;
  const replacements = [];

  while ((match = regex.exec(text)) !== null) {
    const expr = match[1].trim();
    const idx = match.index;

    // skip replacements inside a <button> ... </button>
    const before = text.lastIndexOf('<button', idx);
    const beforeClose = text.lastIndexOf('</button>', idx);
    if (before !== -1 && before > beforeClose) {
      continue;
    }

    // skip if already replaced (contains translateHtml)
    const snippet = text.slice(idx, idx + match[0].length + 50);
    if (/translateHtml/.test(snippet)) continue;

    // We'll replace any expression (static key OR concatenated/dynamic) with a span using translateHtml | async
    // Ensure the expression is parenthesized if it contains + or starts with '('
    let bindingExpr = expr;
    if (!/^\(.+\)$/.test(expr) && /\+/.test(expr)) {
      bindingExpr = '(' + expr + ')';
    }

    replacements.push({ idx, len: match[0].length, expr: bindingExpr });
  }

  if (replacements.length === 0) return;

  // Do replacements from end to start to preserve indexes
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    const span = `<span [innerHTML]="${r.expr} | translateHtml | async"></span>`;
    text = text.slice(0, r.idx) + span + text.slice(r.idx + r.len);
  }

  if (text !== original) {
    fs.writeFileSync(filePath, text, 'utf8');
    changedFiles.push(filePath);
  }
}

walk(root);

console.log('Changed files:', changedFiles.length);
changedFiles.forEach(f => console.log(' -', f));
