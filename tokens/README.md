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
|  |  | COMPONENT (Tier 3) - Future                       | | |
|  |  |  Component-specific tokens                        | | |
|  |  |  Example: button.primary.bg = "{interactive.primary}"| |
|  |  +---------------------------------------------------+ | |
|  +--------------------------------------------------------+ |
+-------------------------------------------------------------+
```

## Directory Structure

```
tokens/
├── README.md              # This file
├── primitives/            # Tier 1: Raw values
│   ├── colors.json        # Oklch color palette
│   ├── typography.json    # Font families, sizes, weights
│   ├── spacing.json       # 4px/8px grid scale
│   ├── radii.json         # Border radius values
│   ├── shadows.json       # Box shadow definitions
│   └── motion.json        # Animation durations, easings
├── semantic/              # Tier 2: Purpose-driven aliases
│   ├── colors.dark.json   # DEFAULT - dark mode semantics
│   └── colors.light.json  # OVERRIDE - light mode semantics
└── component/             # Tier 3: Future expansion
```

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

### Console (Tailwind v4)

The console uses Tailwind v4 with CSS-first `@theme` configuration. Tokens are defined directly in `src/app.css`:

```css
@import 'tailwindcss';

@theme {
  --color-surface-base: #161616;
  --color-surface-elevated: #262626;
  /* ... */
}
```

Future: Import generated tokens:
```css
@import 'tailwindcss';
@import '@musher/design-tokens/dist/tailwind/theme.css';
```

### Docs (Tailwind v4 + CSS)

Future integration via CSS variables:
```css
@import '@musher/design-tokens/dist/css/variables.css';
```

### Marketing (Tailwind v3)

Future migration to Tailwind v4 with same pattern as Console.

## Build System

Tokens are built using Style Dictionary v4. The build generates:

- `dist/css/variables.css` - Standard CSS custom properties
- `dist/tailwind/theme.css` - Tailwind v4 `@theme` compatible output

### Building Tokens

```bash
task build         # Build tokens
task clean         # Clean build output
```

Or with npm directly:
```bash
npm install
npm run build
```

### Migration Status

- [x] Define primitive tokens (colors, typography, spacing)
- [x] Define semantic tokens (dark mode default)
- [x] Define light mode overrides
- [x] Add build tooling (Style Dictionary 4.0)
- [x] Generate Tailwind v4 @theme output
- [x] Upgrade Console to Tailwind v4
- [ ] Migrate Console components to consume brand tokens
- [ ] Migrate Docs to use CSS variables
- [ ] Migrate Marketing to use presets

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
