import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';

const serverOutput = 'dist/myapp/server/server.mjs';

function run(command, args, label) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', (code, signal) => {
    if (signal || code === 0) {
      return;
    }

    console.error(`[${label}] exited with code ${code}`);
    shutdown(1);
  });

  return child;
}

async function waitForFile(filePath) {
  for (;;) {
    try {
      await access(filePath, constants.F_OK);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

let children = [];
let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(exitCode);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

const browserBuild = run('ng', ['build', '--configuration', 'development', '--watch'], 'build');

children = [browserBuild];

await waitForFile(serverOutput);

const ssrServer = run('node', ['--watch', serverOutput], 'ssr');
children.push(ssrServer);
