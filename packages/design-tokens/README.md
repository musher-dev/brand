# Musher Design Tokens

The single source of truth for visual design decisions across all Musher platform applications.

## Philosophy

### Dark Mode First

Dark mode is the **default**, not an afterthought. Light mode is an override.

- Console: Dark-only (Safety Dark Palette for trustworthy control plane)
- Docs: Dark default with light mode support
- Marketing: Dark default with light mode support

### Engineering Teal

The primary brand color is **Engineering Teal** (`oklch(65% 0.14 195)`):

- Embodies "Human Interface Layer" positioning
- Bridges trust (blue) and forward movement (green)
- Distinct from competitors (Stripe purple, Terraform violet, Auth0 orange)

## Architecture

Three-tier token hierarchy following W3C DTCG 2025.10 format:

```
+-------------------------------------------------------------+
| PRIMITIVES (Tier 1)                                         |
|  Raw, immutable values - Oklch colors, px dimensions        |
|  Example: color.neutral.5 = "oklch(14% 0.005 285)"         |
|  +--------------------------------------------------------+ |
|  | SEMANTIC (Tier 2)                                      | |
|  |  Purpose-driven aliases that reference primitives      | |
|  |  Example: surface.base = "{color.neutral.5}"           | |
|  |  +---------------------------------------------------+ | |
|  |  | COMPONENT (Tier 3)                                | | |
|  |  |  Component-specific tokens (semantic refs only)   | | |
|  |  |  Example: button.primary.bg = "{interactive.primary}"| |
|  |  +---------------------------------------------------+ | |
|  +--------------------------------------------------------+ |
+-------------------------------------------------------------+
```

## Directory Structure

```
packages/design-tokens/
├── README.md              # This file
├── build/
│   └── config.js          # Style Dictionary matrix build (surfaces x modes)
├── scripts/
│   └── validate-tokens.mjs # Dark/light override symmetry gate
├── src/
│   ├── primitives/        # Tier 1: Raw values
│   │   ├── colors.json    # Oklch color palette
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   ├── radii.json
│   │   ├── shadows.json
│   │   ├── motion.json    # duration, easing, stagger delays
│   │   ├── opacity.json   # disabled/muted/hover/active/scrim
│   │   ├── borders.json   # border-width + stroke-width
│   │   ├── z-index.json   # dropdown…modal…toast…tooltip layering
│   │   ├── layout.json    # container + breakpoint scales
│   │   └── size.json      # icon + control sizes
│   ├── semantic/          # Tier 2: Purpose-driven aliases (console baseline)
│   │   ├── colors.dark.json   # DEFAULT - dark mode semantics
│   │   └── colors.light.json  # OVERRIDE - light mode semantics
│   ├── surfaces/          # Per-surface theme overrides (sparse DTCG)
│   │   ├── console/       # Canonical baseline - no overrides
│   │   ├── marketing/     # Vivid full-saturation brand for landing pages
│   │   └── backstage/     # Distinct slate + amber internal-tool theme
│   └── components/        # Tier 3: Component tokens (button, modal, input)
└── dist/                  # Generated (gitignored): <surface>/{css,tailwind,ts,json}/
```

### Surfaces

All consuming apps share the same primitives and base semantic language; a
**surface** is a small override layer for visual distinction. Override files are
sparse — they list only the tokens that differ from the baseline and inherit the
rest. `console` is the baseline (no overrides). Backstage additionally emits
`--bui-*`-prefixed CSS for the Backstage UI variable convention.

## Token Format (W3C DTCG 2025.10)

Every token is a JSON object with:

| Property | Required | Description |
|----------|----------|-------------|
| `$value` | Yes | The token value (color, dimension, etc.) |
| `$type` | Yes | Token type (color, dimension, fontFamily, etc.) |
| `$description` | Recommended | Usage documentation |

Example:
```json
{
  "color": {
    "brand": {
      "teal": {
        "500": {
          "$value": "oklch(65% 0.14 195)",
          "$type": "color",
          "$description": "Primary brand color - Engineering Teal"
        }
      }
    }
  }
}
```

## Aliasing (References)

Semantic tokens reference primitives using `{path.to.token}` syntax:

```json
{
  "surface": {
    "base": {
      "$value": "{color.neutral.5}",
      "$description": "App background - references primitive"
    }
  }
}
```

## Color System

### Brand Colors

| Token | Oklch | Hex (approx) | Usage |
|-------|-------|--------------|-------|
| `brand.teal.500` | `oklch(65% 0.14 195)` | #00A3A0 | Primary brand, marketing CTAs |
| `brand.teal.400` | `oklch(72% 0.10 195)` | #4DB8B5 | Dark mode variant |

### Signal Colors (Safety Palette)

| Token | Oklch | Hex (approx) | Usage |
|-------|-------|--------------|-------|
| `signal.error` | `oklch(65% 0.22 25)` | #FA4D56 | Block/Failure |
| `signal.warning` | `oklch(72% 0.18 55)` | #FF832B | Low Confidence/Latency |
| `signal.success` | `oklch(72% 0.17 145)` | #42BE65 | Deterministic Pass |
| `signal.action` | `oklch(59% 0.24 255)` | #4589FF | Primary Interaction |
| `signal.human` | `oklch(62% 0.27 290)` | #A56EFF | Human-in-loop/Governance |
| `signal.replay` | `oklch(75% 0.15 90)` | #D2A106 | Time Travel Mode |

### Surface Colors (Dark Mode Default)

| Token | Oklch | Hex (approx) | Usage |
|-------|-------|--------------|-------|
| `neutral.5` | `oklch(14% 0.005 285)` | #161616 | Surface 01 - Base |
| `neutral.10` | `oklch(20% 0.005 285)` | #262626 | Surface 02 - Elevated |
| `neutral.15` | `oklch(27% 0.005 285)` | #393939 | Surface 03 - Overlay |
| `neutral.20` | `oklch(36% 0.005 285)` | #525252 | Surface 04 - Muted |

## Naming Convention

Context-Object-Modifier (C-O-M) taxonomy:

```
[context].[object].[modifier]
```

Examples:
- `color.brand.teal.500` - Primitive color
- `surface.base` - Semantic surface
- `text.primary` - Semantic text
- `signal.error` - Semantic signal
- `interactive.primary-hover` - Semantic interactive state

Rules:
- Use **kebab-case** for multi-word modifiers (`primary-hover`)
- Use **dot notation** for nesting (`color.neutral.5`)
- Use **semantic names**, not visual descriptions (`text.error`, not `text.red`)

## Usage by Platform

The package exposes clean subpath exports. `console` is the default surface;
`marketing` and `backstage` are available under their own subpaths.

| Export | File |
|--------|------|
| `@musher-dev/design-tokens/css` | console CSS variables (dark, `:root`) |
| `@musher-dev/design-tokens/css/light` | console light override (`[data-theme="light"]`) |
| `@musher-dev/design-tokens/theme` | console Tailwind v4 `@theme` |
| `@musher-dev/design-tokens/json` | console flat JSON (oklch + hex) |
| `@musher-dev/design-tokens` / `…/ts` | console typed TS constants |
| `@musher-dev/design-tokens/marketing/css` | marketing CSS variables |
| `@musher-dev/design-tokens/backstage/css` | backstage CSS variables |
| `@musher-dev/design-tokens/backstage/css/bui` | backstage `--bui-*` variables |

### Console / Docs (Tailwind v4)

```css
@import 'tailwindcss';
@import '@musher-dev/design-tokens/theme';
```

### Any framework (CSS variables)

```css
@import '@musher-dev/design-tokens/css';
@import '@musher-dev/design-tokens/css/light'; /* optional light mode */
```

#### Body text tokens at a glance

| Context | Font Size Token | Line Height Token | When to use |
|---------|----------------|-------------------|-------------|
| Console UI, dashboards | `body` (14px) | `body` (1.57) | Default for dense UI |
| Docs, blog, help articles | `body-reading` (16px) | `body-reading` (1.65) | Long-form prose (WCAG 1.4.8) |
| Introductions, callouts | `body-large` (16px) | `body` (1.57) | Visually prominent short text |

### Marketing (Tailwind v3)

Future migration to Tailwind v4 with same pattern as Console.

## Installation

The package is published to GitHub Packages as `@musher-dev/design-tokens`.

### 1. Configure GitHub Packages registry

Add an `.npmrc` to your project root (or the repo root if using a monorepo):

```ini
@musher-dev:registry=https://npm.pkg.github.com
```

For CI, set the `NODE_AUTH_TOKEN` environment variable to a token with `read:packages` scope. Locally, authenticate with:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@musher-dev
```

### 2. Install the package

```bash
# bun
bun add @musher-dev/design-tokens

# npm
npm install @musher-dev/design-tokens
```

### 3. Import tokens

**Tailwind v4** (Console, Docs):
```css
@import 'tailwindcss';
@import '@musher-dev/design-tokens/theme';
```

**CSS custom properties** (any framework):
```css
@import '@musher-dev/design-tokens/css';
```

**Typed constants** (scripts, JS/TS logic — colors carry `oklch` + `hex`):
```ts
import { tokens } from '@musher-dev/design-tokens';
tokens.surface.base.oklch; // "oklch(14% 0.005 285)"
tokens.surface.base.hex;   // "#09090b"
```

**Raw DTCG source** (tooling, design-tool sync):
```js
import colors from '@musher-dev/design-tokens/src/primitives/colors.json' with { type: 'json' };
```

### CI/CD

In GitHub Actions, GitHub Packages authentication is automatic via `GITHUB_TOKEN`:

```yaml
- uses: actions/setup-node@v4
  with:
    registry-url: 'https://npm.pkg.github.com'
    scope: '@musher-dev'

- run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Build System

Tokens are built with Style Dictionary v5 via a matrix build (`build/config.js`)
that iterates every surface × mode. For each combination it generates:

- `dist/<surface>/css/variables.<mode>.css` - CSS custom properties (native oklch)
- `dist/<surface>/tailwind/theme.<mode>.css` - Tailwind v4 `@theme`
- `dist/<surface>/ts/tokens.<mode>.{js,d.ts}` - typed constants (oklch + hex)
- `dist/<surface>/json/tokens.<mode>.json` - flat resolved JSON (oklch + hex)
- `dist/backstage/css/bui.<mode>.css` - Backstage `--bui-*` variables

Colors stay **native oklch** in CSS/Tailwind (perceptual uniformity, modern
browser support); accurate hex is computed via `culori` only for the JSON/TS
consumers that need a plain scalar.

### Building Tokens

```bash
bun run build      # Build all surfaces and modes
bun run check      # Build + validate dark/light override symmetry
bun run clean      # Remove dist/
```

## Why Oklch?

Oklch (Oklab Lightness Chroma Hue) provides:

1. **Perceptual uniformity** - Equal steps in lightness appear equally different to humans
2. **Better color interpolation** - Gradients don't go through gray
3. **Easier accessibility math** - Lightness directly correlates to contrast
4. **Modern browser support** - Supported in all modern browsers

Converting from hex to Oklch:
```
#161616 -> oklch(14% 0.005 285)
#4589FF -> oklch(59% 0.24 255)
```

## Related Documentation

- [Brand README](../README.md) - Repository overview
- [Activation Checklist](../docs/activation-checklist.md) - Rollout plan
- [Audit Guide](../docs/audit-guide.md) - Content audit process
