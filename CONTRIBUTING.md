# Contributing to the Musher Design System

This is a [Bun](https://bun.sh) workspace with three packages under `packages/`: `design-tokens`, `svelte-ui`, and `brand-assets`.

## Setup

```bash
bun install        # install the whole workspace (single root bun.lock)
```

## Design tokens (`packages/design-tokens`)

Token sources are DTCG JSON under `packages/design-tokens/src/`:

- `primitives/` — raw values (colors, typography, spacing, opacity, z-index, …)
- `semantic/` — purpose-driven aliases (`colors.dark.json` / `colors.light.json`)
- `surfaces/` — per-surface overrides (console baseline, marketing, backstage)
- `components/` — Tier 3 component tokens

```bash
bun run --filter @musher-dev/design-tokens build   # regenerate dist/
bun run --filter @musher-dev/design-tokens check   # build + dark/light symmetry gate
```

## Svelte components (`packages/svelte-ui`)

Components are styled **only** through design-token CSS variables (no hardcoded hex/px — enforced by Stylelint). Icons are passed in as snippets; the library never imports an icon set.

```bash
bun run dev:ui                                  # Storybook dev server
bun run --filter @musher-dev/svelte-ui check    # svelte-check
bun run --filter @musher-dev/svelte-ui lint     # Stylelint
```

## Brand assets (`packages/brand-assets`)

```bash
task optimize     # Optimize SVGs and PNGs in packages/brand-assets/src/
task export       # Copy optimized assets to packages/brand-assets/dist/
task validate     # Verify naming and directory structure
```

Commit both `src/` and `dist/` changes (assets are Git-LFS tracked).

## Pull requests

- CI runs `bun run --filter '*' build/check/lint/publint` and validates that `packages/brand-assets/dist/` matches a fresh export. If the asset drift check fails, run `task export` locally and commit.
- All shell scripts must pass ShellCheck.
- Versioning/publishing is automated by release-please (one release PR per package). Use [Conventional Commits](https://www.conventionalcommits.org/).
- See `docs/Brand_Guidelines.md` for the asset specification and `docs/consuming-packages.md` for how the platform apps adopt the packages.
