import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const required = [
  'apps',
  'packages',
  'services',
  'modules',
  'docs',
  'infrastructure',
  'tests',
  'tools',
  '.codex',
  '.codex/AGENTS.md',
  '.codex/tasks',
];

let ok = true;
for (const p of required) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) {
    console.error(`[structure] missing: ${p}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('[structure] OK');
