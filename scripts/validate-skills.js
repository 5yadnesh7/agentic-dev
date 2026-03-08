#!/usr/bin/env node
/**
 * Validate skills against SKILL_CONTRACT:
 * - Metadata: name, description, tags, layer (always)
 * - Skill contract: Input, Output (with --strict)
 *
 * Usage: node scripts/validate-skills.js [--strict]
 *   --strict  Also require | **Input** | and | **Output** | rows
 * Exit: 0 if all pass, 1 if any fail
 */

const fs = require('fs');
const path = require('path');

const STRICT = process.argv.includes('--strict');
const SKILLS_DIR = path.join(__dirname, '..', '.cursor', 'skills');
const REQUIRED_META = ['name', 'description', 'tags', 'layer'];
const REQUIRED_CONTRACT = ['Input', 'Output'];

function findSkillFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      const skillPath = path.join(full, 'SKILL.md');
      if (fs.existsSync(skillPath)) files.push(skillPath);
    }
  }
  return files.sort();
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const meta = {};
  const lines = match[1].split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  return meta;
}

function hasSkillContractField(content, field) {
  // Check for | **Field** | value | row (table format)
  const pattern = new RegExp(`\\|\\s*\\*\\*${field}\\*\\*\\s*\\|`, 'm');
  return pattern.test(content);
}

function validateSkill(filePath) {
  const errors = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(path.join(__dirname, '..'), filePath);

  // Metadata (frontmatter)
  const meta = parseFrontmatter(content);
  if (!meta) {
    errors.push(`[${rel}] Missing or invalid frontmatter (--- ... ---)`);
    return errors;
  }

  for (const key of REQUIRED_META) {
    const val = meta[key];
    if (!val || (typeof val === 'string' && val.length === 0)) {
      errors.push(`[${rel}] Missing metadata: ${key}`);
    }
  }

  if (meta.layer) {
    const valid = ['executive', 'strategic', 'operational'];
    if (!valid.includes(meta.layer)) {
      errors.push(`[${rel}] Invalid layer: "${meta.layer}" (must be executive|strategic|operational)`);
    }
  }

  // Skill contract: Input, Output (only in --strict mode)
  if (STRICT) {
    for (const field of REQUIRED_CONTRACT) {
      const found = hasSkillContractField(content, field);
      if (!found) {
        errors.push(`[${rel}] Missing skill contract: **${field}** (add | **${field}** | ... | row)`);
      }
    }
  }

  return errors;
}

function main() {
  const files = findSkillFiles(SKILLS_DIR);
  const allErrors = [];

  for (const f of files) {
    const errs = validateSkill(f);
    allErrors.push(...errs);
  }

  if (allErrors.length > 0) {
    console.error('Skill validation failed:\n');
    allErrors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }

  const msg = STRICT
    ? `✓ All ${files.length} skills passed (metadata + input + output)`
    : `✓ All ${files.length} skills passed (metadata). Use --strict for input/output.`;
  console.log(msg);
  process.exit(0);
}

main();
