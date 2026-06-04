/**
 * dedup-component-tokens.js
 *
 * Fixes duplicate CSS custom property declarations within any CSS rule block
 * in geeklego.css. When a property is declared multiple times in the same CSS block
 * (e.g., a "Content flexibility" section that overrides tokens defined earlier),
 * this script removes the earlier declarations, keeping only the last (winning) one.
 *
 * Scans the ENTIRE file — not just generated component blocks — to catch duplicates
 * in semantic sections, @theme blocks, and component token blocks alike.
 *
 * Also validates that no duplicate component blocks exist (same component name
 * appearing more than once in the file).
 *
 * Usage:
 *   node scripts/dedup-component-tokens.js [--check] [--dry-run]
 *
 *   --check    Exit with code 1 if duplicates exist (CI validation mode)
 *   --dry-run  Show what would be removed without modifying the file
 */

const fs = require('fs');
const path = require('path');

const GEEKLEGO_CSS = path.resolve(__dirname, '..', 'design-system', 'geeklego.css');

const args = process.argv.slice(2);
const CHECK_ONLY = args.includes('--check');
const DRY_RUN = args.includes('--dry-run');

function main() {
  const content = fs.readFileSync(GEEKLEGO_CSS, 'utf-8');
  const lines = content.split('\n');
  const original = [...lines];

  // Step 1: Find component block boundaries for duplicate-name detection
  const componentBoundaries = [];
  for (let i = 0; i < lines.length; i++) {
    if (/generated\s+20\d\d-\d\d-\d\d/.test(lines[i])) {
      componentBoundaries.push(i);
    }
  }

  // Validate — check for duplicate component names (separate blocks)
  const componentNames = [];
  for (const idx of componentBoundaries) {
    const match = lines[idx].match(/\/\*\s*(?:──\s*)?(\w+)(?:\s*──)?/);
    if (match) {
      componentNames.push({ name: match[1], line: idx + 1 });
    }
  }

  const nameCounts = {};
  for (const { name, line } of componentNames) {
    if (!nameCounts[name]) nameCounts[name] = [];
    nameCounts[name].push(line);
  }

  const duplicateBlocks = Object.entries(nameCounts).filter(([, lines]) => lines.length > 1);
  if (duplicateBlocks.length > 0) {
    console.error('❌ Duplicate component blocks found (same name, different locations):');
    for (const [name, lines] of duplicateBlocks) {
      console.error(`   ${name}: lines ${lines.join(', ')}`);
    }
    if (CHECK_ONLY) {
      process.exit(1);
    }
  }

  // Step 2: Scan the ENTIRE file for within-block duplicate declarations.
  // Tracks CSS rule blocks by counting braces. Each time we enter a new {...}
  // pair (depth goes 0 -> 1), we start a fresh dedup scope. Within that scope,
  // if a property appears more than once, we keep only the last declaration.
  const linesToRemove = new Set();
  let depth = 0;
  let currentBlockProps = {}; // propName -> lastLineIndex

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;

    // Starting a new CSS rule block (depth was 0, now > 0)
    if (opens > 0 && depth === 0) {
      currentBlockProps = {};
    }

    depth += opens;

    // Process declaration lines within a CSS rule block
    if (depth >= 1) {
      const match = line.match(/^\s*(--[\w-]+)\s*:/);
      if (match) {
        const prop = match[1];
        if (currentBlockProps[prop] !== undefined) {
          const prevLineIdx = currentBlockProps[prop];
          if (!linesToRemove.has(prevLineIdx)) {
            linesToRemove.add(prevLineIdx);
          }
        }
        currentBlockProps[prop] = i;
      }
    }

    depth -= closes;

    // CSS rule block ended (depth back to 0)
    if (closes > 0 && depth === 0) {
      currentBlockProps = {};
    }
  }

  // Step 3: Build report — scan the entire file for duplicate props
  const reportLines = [];
  let currentSection = 'file';
  depth = 0;
  const reportBlockProps = {};

  // Track which section we're in by looking for component headers or semantic markers
  const sectionLabels = [];
  for (let i = 0; i < lines.length; i++) {
    const genMatch = lines[i].match(/\/\*\s*(──\s*)?(\w[\w\s]*?)\s*(?:—|─).*generated/);
    if (genMatch) {
      sectionLabels[i] = genMatch[2].trim();
    }
  }
  // Find the nearest preceding section label for each position
  function sectionName(lineIdx) {
    let label = null;
    for (let s = lineIdx; s >= 0; s--) {
      if (sectionLabels[s]) {
        label = sectionLabels[s];
        break;
      }
    }
    return label || 'semantic-section';
  }

  depth = 0;
  let dupScopeProps = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;

    if (opens > 0 && depth === 0) dupScopeProps = {};
    depth += opens;

    if (depth >= 1) {
      const match = line.match(/^\s*(--[\w-]+)\s*:\s*(.*?)\s*;/);
      if (match) {
        const prop = match[1];
        const value = match[2];
        if (dupScopeProps[prop] !== undefined) {
          const prevIdx = dupScopeProps[prop];
          const prevMatch = lines[prevIdx].match(/^\s*--[\w-]+\s*:\s*(.*?)\s*;/);
          const prevValue = prevMatch ? prevMatch[1] : '?';
          reportLines.push({
            section: sectionName(i),
            prop,
            prevLine: prevIdx + 1,
            prevValue,
            thisLine: i + 1,
            thisValue: value,
            willRemove: linesToRemove.has(prevIdx),
          });
        }
        dupScopeProps[prop] = i;
      }
    }

    depth -= closes;
    if (closes > 0 && depth === 0) dupScopeProps = {};
  }

  // Step 4: Print report grouped by section
  if (reportLines.length === 0) {
    console.log('✅ No duplicate declarations found in geeklego.css.');
    if (CHECK_ONLY) process.exit(0);
    return;
  }

  // Group by section
  const sectionGroups = {};
  for (const r of reportLines) {
    if (!sectionGroups[r.section]) sectionGroups[r.section] = [];
    sectionGroups[r.section].push(r);
  }

  let totalDups = reportLines.length;
  console.log(`\n📊 Found ${totalDups} duplicate declaration(s) in geeklego.css:\n`);

  for (const [section, dups] of Object.entries(sectionGroups)) {
    console.log(`  ${section}:`);
    for (const d of dups) {
      console.log(`    [L${d.prevLine}] → [L${d.thisLine}]  ${d.prop}`);
      console.log(`      "${d.prevValue}" → "${d.thisValue}"${d.willRemove ? '  ✂️ will remove' : ''}`);
    }
    console.log('');
  }

  if (CHECK_ONLY) {
    console.log('❌ Duplicates found. Run without --check to fix.');
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log(`🧪 Dry-run: would remove ${linesToRemove.size} lines. No changes made.`);
    return;
  }

  // Step 5: Write cleaned file
  const result = lines.filter((_, i) => !linesToRemove.has(i));
  fs.writeFileSync(GEEKLEGO_CSS, result.join('\n'), 'utf-8');
  console.log(`✅ Removed ${linesToRemove.size} duplicate declaration lines from ${GEEKLEGO_CSS}`);
  console.log(`   File size: ${formatSize(content.length)} → ${formatSize(Buffer.byteLength(result.join('\n'), 'utf-8'))}`);
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

main();
