# Musher Brand

Brand assets and design tokens for the [Musher](https://musher.dev) platform.

## Quick Start

```bash
task setup && task build
```

## Directory Overview

```
brand/
├── tokens/        Design token system (@musher/design-tokens)
│   ├── primitives/    Tier 1: raw values (colors, typography, spacing, etc.)
│   ├── semantic/      Tier 2: dark.json + light.json
│   ├── transforms/    oklch.js color conversion
│   └── dist/          Generated CSS + Tailwind output (gitignored)
│
├── src/           Source/editable master assets
│   ├── logo/          Mark, wordmark, lockup SVGs + design files
│   ├── icon/          Favicon, PWA, iOS, Android sources
│   ├── social/        Avatars, banners, OG templates
│   └── background/    Hero, pattern, gradient sources
│
├── dist/          Optimized production exports (committed)
│   ├── logo/          Optimized SVGs + rasterized PNGs
│   ├── icon/          Full favicon/PWA/mobile icon sets
│   ├── social/        Platform-specific social assets
│   └── background/    Production backgrounds
│
├── docs/          Minimal brand documentation
├── scripts/       Automation (optimize, export, validate)
└── .devcontainer/ Dev environment for brand asset work
```

## Naming Convention

Pattern: `musher-{asset}-{variant}-{color}-{size}.{ext}`

Examples:
- `musher-logo-lockup-horizontal-dark.svg`
- `musher-logo-mark-dark-512.png`
- `musher-icon-pwa-maskable-512.png`
- `musher-social-og-default-1200x630.png`
- `musher-social-banner-x-dark-1500x500.png`

## Design Tokens

The token system lives in `tokens/` and is published as [`@musher/design-tokens`](https://www.npmjs.com/package/@musher/design-tokens).

```bash
# Build tokens
task build

# Output
tokens/dist/css/variables.css        # CSS custom properties
tokens/dist/tailwind/theme.css       # Tailwind v4 @theme format
```

See [tokens/README.md](tokens/README.md) for architecture, color system, and usage.

## Scripts

| Command | Description |
|---------|-------------|
| `task setup` | Install token dependencies |
| `task build` | Build design tokens |
| `task optimize` | Optimize SVGs and PNGs in `src/` |
| `task export` | Export optimized assets from `src/` to `dist/` |
| `task validate` | Validate naming conventions in `dist/` |
| `task clean` | Remove build artifacts |

## License

[MIT](LICENSE)
