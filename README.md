# Musher Brand

Brand assets and design tokens for the [Musher](https://musher.dev) platform.

## Quick Start

The devcontainer provides all tools automatically. Outside the devcontainer, ensure you have [Task](https://taskfile.dev), Node.js 22+, and [Bun](https://bun.sh) installed.

```bash
task setup && task build
```

## Directory Overview

```
brand/
├── tokens/        Design token system (@musher-dev/design-tokens)
│   ├── primitives/    Tier 1: raw values (colors, typography, spacing, etc.)
│   ├── semantic/      Tier 2: dark.json + light.json
│   ├── transforms/    oklch.js color conversion
│   └── dist/          Generated CSS + Tailwind output (gitignored)
│
├── src/           Source/editable master assets
│   ├── logo/          Astronaut mark, wordmark, lockup SVGs
│   │   ├── mark/          Astronaut head icon (4 color schemes)
│   │   ├── lockup/        Icon + wordmark combinations
│   │   │   ├── horizontal/    Primary: icon left, wordmark right
│   │   │   └── stacked/       Icon above wordmark
│   │   ├── wordmark/      "Musher" text (outlined + editable variants)
│   │   └── hub/           Musher Hub (igloo) sub-product branding
│   │       ├── mark/          Igloo icon (5 color schemes + PNGs)
│   │       ├── lockup/        Hub icon + "Musher Hub" wordmark
│   │       │   ├── horizontal/    Horizontal + stacked-text variants
│   │       │   └── stacked/       Icon above wordmark
│   │       └── wordmark/      "Musher Hub" text-only
│   ├── illustration/  Brand illustrations
│   │   ├── scene/         Musher/sled/robots artwork
│   │   └── masters/       Design source files
│   ├── icon/          Favicon, PWA, iOS, Android sources
│   │   └── hub/           Musher Hub favicon bundle
│   │       └── favicon/       ico, svg, apple-touch, pwa, manifest
│   ├── social/        Avatars, banners, OG templates
│   │   ├── discord/       Server icon, banner, avatar
│   │   └── github/        Organization social preview
│   ├── background/    Hero, pattern, gradient sources
│   └── fonts/         Inter, Inter Display, JetBrains Mono
│
├── dist/          Optimized production exports (committed)
│   ├── logo/          Outlined SVGs + rasterized PNGs
│   │   └── hub/           Hub igloo logo exports
│   │       ├── svg/           Hub mark, lockup, wordmark SVGs
│   │       └── png/           Hub mark rasters (256–1024)
│   ├── illustration/  Scene illustration exports
│   ├── icon/          Full favicon/PWA/mobile icon sets
│   │   └── hub/           Hub-specific icon exports
│   │       └── favicon/       Hub favicon bundle
│   ├── social/        Platform-specific social assets
│   │   ├── discord/       Discord server icon, banner, avatar
│   │   └── github/        GitHub organization social preview
│   └── background/    Production backgrounds
│
├── docs/          Brand documentation
│   ├── Brand_Guidelines.md   Comprehensive brand reference
│   └── social-links.json     Official profile links (Schema.org JSON-LD)
│
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

The token system lives in `tokens/` and is published as [`@musher-dev/design-tokens`](tokens/README.md).

```bash
# Build tokens
task build

# Output
tokens/dist/css/variables.css            # CSS custom properties (dark)
tokens/dist/css/variables.light.css      # CSS custom properties (light)
tokens/dist/tailwind/theme.css           # Tailwind v4 @theme (dark)
tokens/dist/tailwind/theme.light.css     # Tailwind v4 @theme (light)
```

See [tokens/README.md](tokens/README.md) for architecture, color system, and usage.

## Scripts

| Command | Description |
|---------|-------------|
| `task setup` | Install all dependencies (tokens + asset pipeline tools) |
| `task build` | Build design tokens |
| `task optimize` | Optimize SVGs and PNGs in `src/` |
| `task export` | Export optimized assets from `src/` to `dist/` |
| `task validate` | Validate naming conventions in `dist/` |
| `task clean` | Remove build artifacts |

## License

[MIT](LICENSE)
