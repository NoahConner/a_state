// Runs the Angular CLI with a bigger Node heap. With ~100 city pages, `ng serve` and `ng build`
// go past Node's default ~2 GB limit and crash with "JavaScript heap out of memory".
// Usage: node tools/ng.mjs serve | build ... (any ng arguments). Override the size with NG_HEAP_MB.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const heapMb = process.env.NG_HEAP_MB || '4096';
const ngBin = fileURLToPath(new URL('../node_modules/@angular/cli/bin/ng.js', import.meta.url));

// NODE_OPTIONS (not a node flag) so the CLI's worker processes get the bigger heap too.
const nodeOptions = [process.env.NODE_OPTIONS, `--max-old-space-size=${heapMb}`]
  .filter(Boolean)
  .join(' ');

const child = spawn(process.execPath, [ngBin, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
});

child.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
