#!/usr/bin/env node
/**
 * Validate 3-tier agent system:
 * - AGENT_SKILL_MAP exists; all referenced skills exist in .cursor/skills
 * - All sub-agents have agent files in .cursor/agents
 * - ORCHESTRATOR has CTO + sub-agent invocations (/name)
 * - SKILL_INDEX has CTO + sub-agent entries
 * - ROUTING.md exists and documents precedence
 * - All .cursor/rules/*.mdc have non-empty description (shows in rule picker)
 * - All skills have non-empty single-line description (no YAML multiline)
 *
 * Usage: node scripts/validate-agent-system.js
 * Exit: 0 if all pass, 1 if any fail
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const AGENT_SYSTEM = path.join(ROOT, 'agent-system');
const AGENTS_DIR = path.join(ROOT, '.cursor', 'agents');
const SKILLS_DIR = path.join(ROOT, '.cursor', 'skills');
const RULES_DIR = path.join(ROOT, '.cursor', 'rules');

const REQUIRED_SUB_AGENTS = [
  'architect', 'worker', 'tester', 'researcher', 'planner',
  'reviewer', 'devops', 'security', 'designer',
];

const REQUIRED_INVOCATIONS = [
  '/cto', '/architect', '/tester', '/planner', '/devops',
  '/security', '/designer',
];

function extractSkillsFromMap(content) {
  const skills = new Set();
  const lines = content.split(/\n/);
  for (const line of lines) {
    const match = line.match(/((?:workflow|role|domain)-[\w-]+)/g);
    if (match) {
      match.forEach(s => skills.add(s.trim()));
    }
  }
  return Array.from(skills);
}

function skillExists(skillName) {
  const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');
  return fs.existsSync(skillPath);
}

/** Extract description from YAML frontmatter. Returns { description, isMultiline }. */
function extractDescription(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return { description: '', isMultiline: false };
  const fm = fmMatch[1];
  const descMatch = fm.match(/^description:\s*(.+)$/m);
  if (!descMatch) return { description: '', isMultiline: false };
  const raw = descMatch[1].trim();
  if (raw === '>' || raw === '|') return { description: '', isMultiline: true };
  if (raw.startsWith('>') || raw.startsWith('|')) return { description: raw.slice(1).trim(), isMultiline: true };
  return { description: raw.replace(/^["']|["']$/g, ''), isMultiline: false };
}

function main() {
  const errors = [];

  // 1. AGENT_SKILL_MAP exists and skills exist
  const mapPath = path.join(AGENT_SYSTEM, 'AGENT_SKILL_MAP.md');
  if (!fs.existsSync(mapPath)) {
    errors.push('agent-system/AGENT_SKILL_MAP.md does not exist');
  } else {
    const mapContent = fs.readFileSync(mapPath, 'utf8');
    const skills = extractSkillsFromMap(mapContent);
    for (const skill of skills) {
      if (!skillExists(skill)) {
        errors.push(`AGENT_SKILL_MAP references "${skill}" but .cursor/skills/${skill}/SKILL.md not found`);
      }
    }
  }

  // 2. CTO and sub-agent files exist
  if (!fs.existsSync(path.join(AGENTS_DIR, 'cto.md'))) {
    errors.push('Missing .cursor/agents/cto.md');
  }
  for (const agent of REQUIRED_SUB_AGENTS) {
    const p = path.join(AGENTS_DIR, `${agent}.md`);
    if (!fs.existsSync(p)) {
      errors.push(`Missing .cursor/agents/${agent}.md`);
    }
  }

  // 3. ORCHESTRATOR has triggers
  const orchPath = path.join(AGENT_SYSTEM, 'ORCHESTRATOR.md');
  if (fs.existsSync(orchPath)) {
    const orch = fs.readFileSync(orchPath, 'utf8');
    for (const inv of REQUIRED_INVOCATIONS) {
      if (!orch.includes(inv)) errors.push(`ORCHESTRATOR.md missing invocation: ${inv}`);
    }
    if (!orch.includes('3-tier') && !orch.includes('CTO')) {
      errors.push('ORCHESTRATOR.md missing 3-tier / CTO section');
    }
  } else {
    errors.push('agent-system/ORCHESTRATOR.md does not exist');
  }

  // 4. SKILL_INDEX has CTO and sub-agents
  const idxPath = path.join(AGENT_SYSTEM, 'SKILL_INDEX.md');
  if (fs.existsSync(idxPath)) {
    const idx = fs.readFileSync(idxPath, 'utf8');
    if (!idx.includes('CTO') || !idx.includes('/cto')) {
      errors.push('SKILL_INDEX.md missing CTO entry');
    }
    if (!idx.includes('Sub-agent') && !idx.includes('/architect')) {
      errors.push('SKILL_INDEX.md missing sub-agent invocations');
    }
  } else {
    errors.push('agent-system/SKILL_INDEX.md does not exist');
  }

  // 5. ROUTING.md exists with precedence
  const routingPath = path.join(AGENT_SYSTEM, 'ROUTING.md');
  if (!fs.existsSync(routingPath)) {
    errors.push('agent-system/ROUTING.md does not exist');
  } else {
    const routing = fs.readFileSync(routingPath, 'utf8');
    if (!routing.toLowerCase().includes('precedence')) {
      errors.push('ROUTING.md should document Precedence');
    }
    if (!routing.includes('Tier 1') || !routing.includes('Tier 2') || !routing.includes('Tier 3')) {
      errors.push('ROUTING.md should document 3-tier model');
    }
  }

  // 6. Sub-agent files have YAML frontmatter (name, description)
  for (const agent of REQUIRED_SUB_AGENTS) {
    const p = path.join(AGENTS_DIR, `${agent}.md`);
    if (fs.existsSync(p)) {
      const c = fs.readFileSync(p, 'utf8');
      if (!c.includes('---') || !c.includes('name:') || !c.includes('description:')) {
        errors.push(`.cursor/agents/${agent}.md should have YAML frontmatter (name, description)`);
      }
    }
  }
  const ctoPath = path.join(AGENTS_DIR, 'cto.md');
  if (fs.existsSync(ctoPath)) {
    const c = fs.readFileSync(ctoPath, 'utf8');
    if (!c.includes('---') || !c.includes('name:') || !c.includes('description:')) {
      errors.push('.cursor/agents/cto.md should have YAML frontmatter (name, description)');
    }
  }

  // 7. Sub-agent files have Self-review
  for (const agent of REQUIRED_SUB_AGENTS) {
    const p = path.join(AGENTS_DIR, `${agent}.md`);
    if (fs.existsSync(p)) {
      const c = fs.readFileSync(p, 'utf8');
      if (!c.includes('Self-review') && !c.includes('self-review')) {
        errors.push(`.cursor/agents/${agent}.md should have Self-review section`);
      }
    }
  }

  // 8. Rules: each .mdc has non-empty description
  if (fs.existsSync(RULES_DIR)) {
    const ruleFiles = fs.readdirSync(RULES_DIR).filter((f) => f.endsWith('.mdc'));
    for (const f of ruleFiles) {
      const p = path.join(RULES_DIR, f);
      const c = fs.readFileSync(p, 'utf8');
      const { description } = extractDescription(c);
      if (!description || description.length < 10) {
        errors.push(`.cursor/rules/${f} has missing or too-short description (Cursor uses it for rule picker)`);
      }
    }
  }

  // 9. Skills: each SKILL.md has non-empty single-line description
  if (fs.existsSync(SKILLS_DIR)) {
    const dirs = fs.readdirSync(SKILLS_DIR);
    for (const d of dirs) {
      const skillPath = path.join(SKILLS_DIR, d, 'SKILL.md');
      if (!fs.existsSync(skillPath)) continue;
      const c = fs.readFileSync(skillPath, 'utf8');
      const { description, isMultiline } = extractDescription(c);
      if (isMultiline) {
        errors.push(`.cursor/skills/${d}/SKILL.md: use single-line description (multiline YAML may not display in Cursor)`);
      } else if (!description || description.length < 10) {
        errors.push(`.cursor/skills/${d}/SKILL.md has missing or too-short description`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('Agent system validation failed:\n');
    errors.forEach(e => console.error('  ' + e));
    process.exit(1);
  }

  console.log('✓ Agent system validation passed');
  process.exit(0);
}

main();
