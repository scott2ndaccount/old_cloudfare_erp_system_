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
- **No external dependencies:** No databases, Docker, or external APIs are required. The app is fully self-contained.
- **No `.env` needed:** The `wrangler.jsonc` has all bindings commented out; no environment variables are required to run locally.
