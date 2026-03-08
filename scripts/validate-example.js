#!/usr/bin/env node
/**
 * Validate example project structure.
 * Checks examples/saas-example has required spec files.
 *
 * Usage: node scripts/validate-example.js
 * Exit: 0 if valid, 1 if invalid
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EXAMPLE = path.join(ROOT, 'examples', 'saas-example');

const REQUIRED = [
  'IDEA.md',
  'docs/roadmap.md',
  'docs/architecture.md',
  'tasks/001-auth-setup.md',
];

function main() {
  const errors = [];

  if (!fs.existsSync(EXAMPLE)) {
    console.error('Example not found:', EXAMPLE);
    process.exit(1);
  }

  for (const rel of REQUIRED) {
    const full = path.join(EXAMPLE, rel);
    if (!fs.existsSync(full)) {
      errors.push(`Missing: examples/saas-example/${rel}`);
    }
  }

  if (errors.length > 0) {
    console.error('Example validation failed:\n');
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }

  console.log('✓ Example project structure valid');
  process.exit(0);
}

main();
