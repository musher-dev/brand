# Musher Brand & Design System

The design-system monorepo for the [Musher](https://musher.dev) platform: design tokens, a shared Svelte component library, and brand assets. Consumed by the apps in [`musher-dev/platform`](https://github.com/musher-dev/platform) via GitHub Packages.

## Packages

| Package | Name | Description |
|---------|------|-------------|
| [`packages/design-tokens`](packages/design-tokens) | `@musher-dev/design-tokens` | Single source of truth for visual design — DTCG tokens built into CSS variables, Tailwind v4 `@theme`, typed TS, and JSON, per surface (console / marketing / backstage) × mode (dark / light). |
| [`packages/svelte-ui`](packages/svelte-ui) | `@musher-dev/svelte-ui` | Shared Svelte 5 component library, themed entirely by design-token CSS variables. |
| [`packages/brand-assets`](packages/brand-assets) | `@musher-dev/brand-assets` | Logos, icons, illustrations, social, and background assets + the optimize/export pipeline (private). |

## Quick start

The devcontainer provides everything. Otherwise install [Bun](https://bun.sh), Node.js 22+, and [Task](https://taskfile.dev).

```bash
bun install                  # install the whole workspace (single root bun.lock)
bun run --filter '*' build   # build every package
task build                   # equivalent via Task

bun run dev:ui               # build tokens, then run the svelte-ui Storybook
```

## Common commands

| Command | Description |
|---------|-------------|
| `bun run --filter '*' build` | Build all packages |
| `bun run --filter '*' check` | Token symmetry + `svelte-check` + asset validation |
| `bun run --filter '*' lint` | Stylelint (blocks hardcoded hex/px in components) |
| `bun run --filter '*' publint` | Validate package exports |
| `bun run dev:ui` | Storybook dev server for `svelte-ui` |
| `bun run storybook:build` | Static Storybook build |
| `task optimize` / `task export` / `task validate` | Brand-asset pipeline (delegates to `brand-assets`) |

## Architecture

- **Bun workspace** (`packages/*`), single root `bun.lock`. No app code lives here — apps consume the published packages.
- **Three token tiers**: primitives → semantic (theming) → component. Colors authored in oklch; CSS/Tailwind emit native oklch, JSON/TS also carry computed hex. See [`packages/design-tokens/README.md`](packages/design-tokens/README.md).
- **Components** carry structure/behavior/a11y and are styled only through token CSS variables (Stylelint-enforced) — portable to any consumer regardless of its Tailwind setup. See [`packages/svelte-ui/README.md`](packages/svelte-ui/README.md).

## Publishing & consumption

Packages publish to **GitHub Packages** (`@musher-dev` scope) via [release-please](https://github.com/googleapis/release-please) (one release PR per package; see `config/release/`). Consuming repos need an `.npmrc`:

```ini
@musher-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**Adopting the packages in the platform apps?** See the migration guide: [`docs/consuming-packages.md`](docs/consuming-packages.md).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Token or brand changes are requested via GitHub issues on this repo; the platform apps treat this repo as the source of truth.

## License

[MIT](LICENSE)
