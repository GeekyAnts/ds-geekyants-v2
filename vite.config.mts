/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const DESIGN_SYSTEM_DIR = path.join(dirname, 'design-system');
// v2 cockpit I/O — the three files v2 components actually consume.
const V2_DIR = path.join(DESIGN_SYSTEM_DIR, 'v2');
const V2_PRIMITIVES = path.join(V2_DIR, 'primitives.css');
const V2_SEMANTICS = path.join(V2_DIR, 'semantics.css');
const V2_DARK = path.join(V2_DIR, 'themes', 'dark.css');
const V2_DEFAULTS_DIR = path.join(DESIGN_SYSTEM_DIR, 'v2-defaults');
// Token metadata (descriptions/categories/tags) — committed by /api/merge-metadata.
const METADATA_FILE = path.join(DESIGN_SYSTEM_DIR, 'tokens.metadata.json');

// Snapshot the three v2 files into v2-defaults/ once, lazily, before the first overwrite.
// Separate dir (not *.default.css siblings) so index.css can never @import a snapshot.
async function ensureV2DefaultsSnapshot(): Promise<void> {
  try { await fs.access(V2_DEFAULTS_DIR); return; } catch { /* take it */ }
  await fs.mkdir(V2_DEFAULTS_DIR, { recursive: true });
  await Promise.all([
    fs.copyFile(V2_PRIMITIVES, path.join(V2_DEFAULTS_DIR, 'primitives.css')),
    fs.copyFile(V2_SEMANTICS, path.join(V2_DEFAULTS_DIR, 'semantics.css')),
    fs.copyFile(V2_DARK, path.join(V2_DEFAULTS_DIR, 'dark.css')),
  ]);
}

function tokenApiPlugin(): Plugin {
  return {
    name: 'geeklego-token-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url === '/api/load-tokens' && req.method === 'GET') {
          try {
            const { parseGeeklegoV2 } = await import('./app/src/utils/cssParser');
            const [primCss, semCss, darkCss] = await Promise.all([
              fs.readFile(V2_PRIMITIVES, 'utf-8'),
              fs.readFile(V2_SEMANTICS, 'utf-8'),
              fs.readFile(V2_DARK, 'utf-8'),
            ]);
            const tokens = parseGeeklegoV2(primCss, semCss, darkCss);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, tokens }));
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        if (url === '/api/save-tokens' && req.method === 'POST') {
          try {
            const { generateGeeklegoV2 } = await import('./app/src/utils/cssGenerator');
            const body: string = await new Promise((resolve, reject) => {
              let d = ''; req.on('data', c => d += c); req.on('end', () => resolve(d)); req.on('error', reject);
            });
            const tokens = JSON.parse(body);
            const out = generateGeeklegoV2(tokens);
            await ensureV2DefaultsSnapshot();
            await Promise.all([
              fs.writeFile(V2_PRIMITIVES, out.primitives, 'utf-8'),
              fs.writeFile(V2_SEMANTICS, out.semantics, 'utf-8'),
              fs.writeFile(V2_DARK, out.dark, 'utf-8'),
            ]);
            if (server.hot) server.hot.send('geeklego:tokens-updated', {});
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        if (url === '/api/restore-default' && req.method === 'POST') {
          try {
            try { await fs.access(V2_DEFAULTS_DIR); } catch {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 404;
              res.end(JSON.stringify({ success: false, error: 'Default snapshot not found (no save yet)' }));
              return;
            }
            const [prim, sem, dark] = await Promise.all([
              fs.readFile(path.join(V2_DEFAULTS_DIR, 'primitives.css'), 'utf-8'),
              fs.readFile(path.join(V2_DEFAULTS_DIR, 'semantics.css'), 'utf-8'),
              fs.readFile(path.join(V2_DEFAULTS_DIR, 'dark.css'), 'utf-8'),
            ]);
            await Promise.all([
              fs.writeFile(V2_PRIMITIVES, prim, 'utf-8'),
              fs.writeFile(V2_SEMANTICS, sem, 'utf-8'),
              fs.writeFile(V2_DARK, dark, 'utf-8'),
            ]);
            if (server.hot) server.hot.send('geeklego:tokens-restored', {});
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        // Commit staged token-metadata edits (descriptions/categories/tags) into
        // design-system/tokens.metadata.json. Body: { stagedChanges }. Reuses the same
        // pure merge the cockpit uses, reads-modifies-writes the file, bumps lastUpdated.
        if (url === '/api/merge-metadata' && req.method === 'POST') {
          try {
            const { mergeMetadataWithStaged, getDefaultMetadata, normalizeMetadata } =
              await import('./app/src/state/metadataLoader');
            const body: string = await new Promise((resolve, reject) => {
              let d = ''; req.on('data', c => d += c); req.on('end', () => resolve(d)); req.on('error', reject);
            });
            const { stagedChanges } = JSON.parse(body || '{}');

            let current;
            try {
              current = normalizeMetadata(JSON.parse(await fs.readFile(METADATA_FILE, 'utf-8')));
            } catch {
              current = getDefaultMetadata();
            }

            const merged = mergeMetadataWithStaged(current, stagedChanges ?? {});
            merged.lastUpdated = new Date().toISOString();
            await fs.writeFile(METADATA_FILE, JSON.stringify(merged, null, 2) + '\n', 'utf-8');

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        if (url === '/api/sync-build' && req.method === 'POST') {
          try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);

            await execAsync('npm run sync-build', { cwd: dirname });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        // Generate the W3C DTCG JSON IR by shelling out to the deterministic script
        // (scripts/export-ir.ts reads design-system/v2/*.css on disk and writes dist/ir/tokens.json).
        // Returns the freshly-written file contents so the cockpit can offer a download.
        if (url === '/api/export-ir' && req.method === 'POST') {
          try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);

            await execAsync('npm run export-ir', { cwd: dirname });

            const outPath = path.join(dirname, 'dist', 'ir', 'tokens.json');
            const content = await fs.readFile(outPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, path: 'dist/ir/tokens.json', content }));
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        // Generate the human-readable design.md by shelling out to the deterministic script.
        // export-design-md consumes the IR, so we run export-ir first to keep the doc in sync
        // with the on-disk tokens. Returns the file contents for download.
        if (url === '/api/export-design-md' && req.method === 'POST') {
          try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);

            // design.md reads the IR — regenerate the IR first so it reflects the current tokens.
            await execAsync('npm run export-ir', { cwd: dirname });
            await execAsync('npm run export-design-md', { cwd: dirname });

            const outPath = path.join(dirname, 'dist', 'ir', 'design-system.md');
            const content = await fs.readFile(outPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, path: 'dist/ir/design-system.md', content }));
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
          return;
        }

        next();
      });
    }
  };
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tokenApiPlugin(),
  ],
  css: {},
  server: {
    port: 5176
  },
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['app/src/**/*.test.ts'],
        }
      }
    ]
  }
});
