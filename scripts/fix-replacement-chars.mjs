#!/usr/bin/env node
// Repair U+FFFD (`�`) replacement-character corruption in component docs/fixtures.
// Dry-run by default. Pass --write to apply.
//
// See plan: ~/.claude/plans/read-this-file-users-bittasingha-documen-temporal-whisper.md

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const TARGET = path.join(ROOT, "packages/geeklego/components");
const WRITE = process.argv.includes("--write");

const R = "�"; // single replacement char
const R3 = R + R + R;

// Rules run in order. Each rule has a label, regex, replacer, and a sample collector.
const rules = [
  {
    label: "1. dimension: NN��NNpx → NN×NNpx",
    // exactly two replacement chars between digits, before "px"
    re: new RegExp(`(\\d+)${R}${R}(\\d+)px`, "g"),
    replace: (_m, a, b) => `${a}×${b}px`,
  },
  {
    label: "6. JSON solo: \"���\" → \"…\"",
    re: new RegExp(`"${R3}"`, "g"),
    replace: () => `"…"`,
  },
  {
    label: "3. table cell: | ��� | → | — |",
    re: new RegExp(`\\| ${R3} \\|`, "g"),
    replace: () => `| — |`,
  },
  {
    label: "2. word-final ellipsis: <letter>��� before <, \", whitespace, or EOL → …",
    re: new RegExp(`([\\p{L}\\p{N}])${R3}(?=[<"\\s]|$)`, "gu"),
    replace: (_m, ch) => `${ch}…`,
  },
  {
    label: "4. prose dash:  ���  → — (space-padded)",
    re: new RegExp(` ${R3} `, "g"),
    replace: () => ` — `,
  },
  {
    label: "5. tag-wrapped solo: >���< → >…<",
    re: new RegExp(`>${R3}<`, "g"),
    replace: () => `>…<`,
  },
];

// Walk TARGET recursively; return *.md and *.json files containing U+FFFD.
function listAffectedFiles() {
  const out = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) {
        walk(full);
      } else if (st.isFile() && /\.(md|json)$/.test(entry)) {
        const buf = readFileSync(full);
        // Look for EF BF BD bytes
        for (let i = 0; i < buf.length - 2; i++) {
          if (buf[i] === 0xef && buf[i + 1] === 0xbf && buf[i + 2] === 0xbd) {
            out.push(full);
            break;
          }
        }
      }
    }
  }
  walk(TARGET);
  return out;
}

function countMarkers(s) {
  return (s.match(new RegExp(R, "g")) || []).length;
}

function sampleMatches(content, re, max = 3) {
  const samples = [];
  for (const m of content.matchAll(re)) {
    if (samples.length >= max) break;
    const start = Math.max(0, m.index - 25);
    const end = Math.min(content.length, m.index + m[0].length + 25);
    const ctx = content.slice(start, end).replace(/\n/g, "\\n");
    samples.push(ctx);
  }
  return samples;
}

const files = listAffectedFiles();
console.log(`\nFound ${files.length} affected files under ${path.relative(ROOT, TARGET)}\n`);

const totalsByRule = Object.fromEntries(rules.map((r) => [r.label, 0]));
const samplesByRule = Object.fromEntries(rules.map((r) => [r.label, []]));
let beforeTotal = 0;
let afterTotal = 0;
let jsonParseFailures = [];

for (const file of files) {
  const original = readFileSync(file, "utf8");
  beforeTotal += countMarkers(original);

  let content = original;
  for (const rule of rules) {
    // Collect samples (from current content, before this rule replaces)
    if (samplesByRule[rule.label].length < 3) {
      for (const s of sampleMatches(content, rule.re, 3 - samplesByRule[rule.label].length)) {
        samplesByRule[rule.label].push(`${path.relative(ROOT, file)}: …${s}…`);
      }
    }
    const matches = content.match(rule.re);
    const hits = matches ? matches.length : 0;
    totalsByRule[rule.label] += hits;
    content = content.replace(rule.re, rule.replace);
  }

  afterTotal += countMarkers(content);

  // JSON validation guard
  if (file.endsWith(".json") && content !== original) {
    try {
      JSON.parse(content);
    } catch (e) {
      jsonParseFailures.push({ file: path.relative(ROOT, file), error: e.message });
      content = original; // do not modify a file we'd break
    }
  }

  if (WRITE && content !== original) {
    writeFileSync(file, content, "utf8");
  }
}

console.log("Per-rule hits (in order applied):\n");
for (const rule of rules) {
  console.log(`  ${rule.label}`);
  console.log(`    hits: ${totalsByRule[rule.label]}`);
  for (const s of samplesByRule[rule.label]) {
    console.log(`    sample: ${s}`);
  }
  console.log("");
}

console.log(`Total U+FFFD before: ${beforeTotal}`);
console.log(`Total U+FFFD after rules: ${afterTotal}`);
console.log(`Residue for Phase B: ${afterTotal}`);

if (jsonParseFailures.length > 0) {
  console.log("\n⚠️  JSON parse failures (file reverted, NOT written):");
  for (const f of jsonParseFailures) {
    console.log(`  - ${f.file}: ${f.error}`);
  }
}

console.log(`\nMode: ${WRITE ? "WRITE (files modified)" : "DRY-RUN (no files modified, pass --write to apply)"}`);
