# AGENTS.md

## Cursor Cloud specific instructions

This is a **TanStack Start** full-stack React app targeting **Cloudflare Workers**, using npm as the package manager.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Dev server | `npm run dev` | 3000 | Vite + Cloudflare Workers local runtime (workerd) |

### Common commands

See `package.json` scripts and `README.md` for full details. Key commands:

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Tests:** `npm run test` (vitest)
- **Type check:** `npx tsc --noEmit`

### Caveats

- **Vitest startup error:** `npm run test` may fail with a `ReferenceError: module is not defined` in `tiny-warning` due to the Cloudflare Workers (workerd) SSR environment not supporting CommonJS. This is a pre-existing issue in the scaffolded template, not caused by code changes. There are currently no test files in the codebase.
- **Supabase integration:** The app connects to Supabase via `@supabase/supabase-js`. Credentials are read from `process.env` (populated by `.dev.vars` locally, Cloudflare Worker secrets in production). See `.dev.vars.example` for required variables.
- **Cloudflare env vars via `process.env`:** With `nodejs_compat` enabled in `wrangler.jsonc`, Worker env vars (from `.dev.vars` locally) are available via `process.env`. No custom server entry or middleware needed.
- **TanStack Start server routes:** API routes must use `createFileRoute` with `server.handlers` — bare `export async function GET()` won't be recognized by the router. See `src/routes/api/supabase.ts` for the correct pattern.
- **Import alias:** Use `@/` (mapped in `tsconfig.json` paths) for imports from `src/`. The `#/` alias from `package.json` imports works at runtime but TypeScript doesn't resolve it.
