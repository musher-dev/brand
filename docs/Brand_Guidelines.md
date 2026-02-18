# Musher Brand Guidelines

Comprehensive reference for the Musher visual identity. All values are authoritative and sourced from the design token system in `tokens/`.

---

## Color Palette

### Named Brand Colors

These are the canonical brand colors used across logos, marketing, and asset production. Token paths reference `tokens/primitives/colors.json`.

| Name | Hex | Oklch | Token Path | Usage |
|------|-----|-------|------------|-------|
| Obsidian | `#0B0F14` | `oklch(16.7% 0.012 254)` | `color.surface-brand.obsidian` | Primary dark background |
| Cool Silver | `#CBD5E1` | `oklch(86.9% 0.020 253)` | `color.surface-brand.cool-silver` | Primary foreground on dark |
| Platinum | `#D1D5DB` | `oklch(87.2% 0.009 258)` | `color.surface-brand.platinum` | Secondary foreground |
| Engineering Teal | — | `oklch(65% 0.14 195)` | `color.brand.teal.500` | Primary brand accent |
| White | `#FFFFFF` | `oklch(100% 0 0)` | `color.neutral.100` | Light backgrounds |

### Gradient Accent Colors

| Name | Hex | Oklch | Token Path |
|------|-----|-------|------------|
| Teal Deep | `#042F2E` | `oklch(27.7% 0.045 193)` | `color.accent.teal-deep` |
| Indigo | `#1E1B4B` | `oklch(25.7% 0.086 281)` | `color.accent.indigo` |
| Navy | `#0D1B2A` | `oklch(21.8% 0.036 251)` | `color.accent.navy` |

### Signal Colors (Safety Palette)

| Role | Token Path | Description |
|------|------------|-------------|
| Error | `color.signal.error` | Block/Failure — Red |
| Warning | `color.signal.warning` | Low Confidence/Latency — Orange |
| Success | `color.signal.success` | Deterministic Pass — Green |
| Action | `color.signal.action` | Primary Interaction — Blue |
| Human | `color.signal.human` | Human-in-loop/Governance — Purple |
| Replay | `color.signal.replay` | Time Travel Mode — Amber |

### Recommended Combinations

- **Dark mode (default):** Obsidian background + Cool Silver foreground marks/text
- **Light mode:** White background + Obsidian foreground marks/text
- **Gradients:** Obsidian base blended toward Teal Deep, Indigo, or Navy (see `src/background/gradient/gradients.css`)

---

## Logo Usage

### Variants

| Variant | When to Use | Available Themes |
|---------|-------------|------------------|
| **Mark** (icon only) | Avatars, favicons, app icons, small placements | dark, light, dark-transparent, light-transparent |
| **Lockup** (icon + wordmark) | Headers, marketing, brand-heavy contexts | dark, transparent |
| **Wordmark** (text only) | When the icon would be too small or cluttered | dark, light |

### Formats

- **SVG** (vector): `dist/logo/svg/` — use for web, documentation, and scalable contexts
- **PNG** (raster): `dist/logo/png/` — use for social media, presentations, and fixed-size contexts

### Available Files

| File | Size | Description |
|------|------|-------------|
| `musher-logo-mark-dark.svg` | Vector | Mark on Obsidian background |
| `musher-logo-mark-dark-transparent.svg` | Vector | Mark, transparent background, Cool Silver fill |
| `musher-logo-mark-light.svg` | Vector | Mark on white background |
| `musher-logo-mark-light-transparent.svg` | Vector | Mark, transparent background, Obsidian fill |
| `musher-logo-lockup-dark.svg` | Vector | Full lockup on Obsidian |
| `musher-logo-lockup-transparent.svg` | Vector | Full lockup, transparent background |
| `musher-logo-wordmark-dark.svg` | Vector | Wordmark, Cool Silver |
| `musher-logo-wordmark-light.svg` | Vector | Wordmark, Obsidian |
| `musher-logo-mark-dark-512.png` | 512px | Mark raster, dark |
| `musher-logo-mark-dark-1024.png` | 1024px | Mark raster, dark |
| `musher-logo-lockup-dark-512.png` | 512w | Lockup raster, dark |
| `musher-logo-lockup-dark-1024.png` | 1024w | Lockup raster, dark |

### Clear Space

Keep clear space around the logo of at least **10% of the icon height** on all sides. Increase on busy or photographic backgrounds.

### Don'ts

- Don't stretch, skew, or rotate the mark
- Don't redraw or simplify the icon details
- Don't add drop shadows, outlines, or effects to the core mark
- Don't use low-contrast color combinations (e.g., Cool Silver on white)
- Don't place the mark on busy backgrounds without sufficient clear space

---

## Icon Specifications

### Favicon

| File | Size | Usage |
|------|------|-------|
| `musher-icon-favicon.svg` | Vector | Modern browsers (preferred) |
| `musher-icon-favicon.ico` | Multi | Legacy browsers (16/32/48) |
| `musher-icon-favicon-16.png` | 16x16 | Smallest favicon |
| `musher-icon-favicon-32.png` | 32x32 | Standard favicon |
| `musher-icon-favicon-48.png` | 48x48 | High-DPI favicon |

### Mobile / PWA

| File | Size | Platform |
|------|------|----------|
| `musher-icon-apple-touch-180.png` | 180x180 | iOS home screen |
| `musher-icon-android-192.png` | 192x192 | Android home screen |
| `musher-icon-android-512.png` | 512x512 | Android splash / Play Store |
| `musher-icon-mstile-150.png` | 150x150 | Windows tiles |

### PWA Manifests

| File | Description |
|------|-------------|
| `musher-manifest.webmanifest` | PWA web app manifest |
| `musher-browserconfig.xml` | Windows tile configuration |

---

## Social Media

### Avatars

General-purpose profile images. Use across platforms that accept square avatars.

| File | Size | Description |
|------|------|-------------|
| `musher-social-avatar-dark-512.png` | 512x512 | Mark on Obsidian |
| `musher-social-avatar-dark-1024.png` | 1024x1024 | Mark on Obsidian (high-res) |
| `musher-social-avatar-dark.svg` | Vector | Mark on Obsidian (scalable) |
| `musher-social-avatar-light-512.png` | 512x512 | Mark on white |
| `musher-social-avatar-light-1024.png` | 1024x1024 | Mark on white (high-res) |
| `musher-social-avatar-astronaut-dark-512.png` | 512x512 | Astronaut variant, dark |
| `musher-social-avatar-astronaut-dark-1024.png` | 1024x1024 | Astronaut variant, dark (high-res) |
| `musher-social-avatar-astronaut-light-512.png` | 512x512 | Astronaut variant, light |
| `musher-social-avatar-astronaut-light-1024.png` | 1024x1024 | Astronaut variant, light (high-res) |

### Platform Banners

| Platform | File | Dimensions |
|----------|------|------------|
| X (Twitter) | `musher-social-banner-x-dark.png` | 1500x500 |
| LinkedIn | `musher-social-banner-linkedin-dark.png` | 1584x396 |
| YouTube | `musher-social-banner-youtube-dark.png` | 2560x1440 |
| Instagram | `musher-social-banner-instagram-dark.png` | 1080x1080 |

### Discord

| File | Size | Usage |
|------|------|-------|
| `musher-social-discord-icon-512.png` | 512x512 | Server icon |
| `musher-social-discord-icon-fullmark-512.png` | 512x512 | Server icon with full mark |
| `musher-social-discord-banner-540.png` | 960x540 | Server banner (standard) |
| `musher-social-discord-banner-1080.png` | 1920x1080 | Server banner (high-res) |
| `musher-social-discord-avatar-dark-512.png` | 512x512 | Bot/user avatar |

### GitHub

| File | Size | Usage |
|------|------|-------|
| `musher-social-github-preview-640.png` | 1280x640 | Organization social preview |
| `musher-social-github-preview-1280.png` | 2560x1280 | Organization social preview (high-res) |

### Open Graph

| File | Description |
|------|-------------|
| `musher-social-og-default.png` | Default OG image (1200x630 recommended) |

### Official Profiles

See [`docs/social-links.json`](social-links.json) for machine-readable Schema.org JSON-LD with all confirmed profile URLs.

---

## Typography

### Font Families

| Token | Family | Usage |
|-------|--------|-------|
| `font.family.display` | Inter Display | Wordmark, marketing headlines, display text |
| `font.family.sans` | Inter | UI body text, labels, buttons |
| `font.family.mono` | JetBrains Mono | Code, data values, terminal output |

Font files are located in `src/fonts/`. See `src/fonts/README.md` for licensing and file details.

### Type Scale

From `tokens/primitives/typography.json`:

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `font.size.label` | 11px | 1.45 | Labels, metadata, uppercase caps |
| `font.size.data` | 13px | 1.54 | Data values, tables |
| `font.size.body` | 14px | 1.57 | Primary body text |
| `font.size.body-large` | 16px | — | Introductions, large body |
| `font.size.heading-sm` | 16px | 1.5 | Small headings, section labels |
| `font.size.heading` | 20px | 1.4 | Section headings |
| `font.size.title` | 24px | 1.33 | Page titles |
| `font.size.display` | 48px | 1.1 | Marketing headlines |
| `font.size.display-lg` | 64px | 1.1 | Hero headlines |

### Weights

| Token | Value | Usage |
|-------|-------|-------|
| `font.weight.normal` | 400 | Default text |
| `font.weight.medium` | 500 | Emphasized text, labels |
| `font.weight.semibold` | 600 | Headings, buttons |
| `font.weight.bold` | 700 | Strong emphasis, wordmark |

---

## Backgrounds

### Gradients

Three gradient variants available at 1080px and 1440px widths. Each blends Obsidian into one accent color at 135 degrees.

| Variant | CSS Class | Colors |
|---------|-----------|--------|
| Teal | `.bg-musher-obsidian-teal` | Obsidian to Teal Deep |
| Indigo | `.bg-musher-obsidian-indigo` | Obsidian to Indigo |
| Navy | `.bg-musher-obsidian-navy` | Obsidian to Navy |

CSS custom properties and utility classes are defined in `src/background/gradient/gradients.css`.

### Hero Images

| File | Size | Usage |
|------|------|-------|
| `musher-bg-hero-1080.png` | 1920x1080 | Standard hero background |
| `musher-bg-hero-1440.png` | 2560x1440 | High-res hero background |
| `musher-bg-hero-1920-portrait.png` | 1080x1920 | Portrait/mobile hero |

### Pattern

| File | Usage |
|------|-------|
| `musher-bg-pattern-tile.svg` | Repeating tile (vector) |
| `musher-bg-pattern-tile-512.png` | Repeating tile (raster, 512x512) |
| `musher-bg-pattern-preview-1080.png` | Full preview of tiled pattern |

---

## Accessibility

### Contrast Requirements

All text and UI elements must meet WCAG 2.1 AA minimum contrast ratios:

| Context | Minimum Ratio |
|---------|---------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (>= 18px bold or >= 24px) | 3:1 |
| UI components and graphical objects | 3:1 |

### Tested Combinations

| Foreground | Background | Approximate Ratio | Pass |
|------------|------------|-------------------|------|
| Cool Silver (`#CBD5E1`) | Obsidian (`#0B0F14`) | ~12:1 | AA / AAA |
| Platinum (`#D1D5DB`) | Obsidian (`#0B0F14`) | ~12:1 | AA / AAA |
| Obsidian (`#0B0F14`) | White (`#FFFFFF`) | ~18:1 | AA / AAA |
| Cool Silver (`#CBD5E1`) | White (`#FFFFFF`) | ~1.5:1 | Fail |

### Color-Blind Considerations

- Signal colors (error, warning, success) should never rely on color alone. Pair with icons, labels, or patterns.
- The Engineering Teal brand color is distinguishable from signal green in most forms of color blindness but should not be the sole differentiator in data visualizations.

---

## Naming Convention

All production assets follow the pattern:

```
musher-{category}-{variant}-{modifier}-{size}.{ext}
```

Examples:
- `musher-logo-mark-dark-512.png`
- `musher-social-banner-x-dark.png`
- `musher-icon-favicon-32.png`
- `musher-bg-gradient-teal-1080.png`

See the project [README.md](../README.md) for the full naming convention reference.

---

## Asset Quick Reference

What to use where:

| Context | Recommended Asset |
|---------|-------------------|
| Website favicon | `dist/icon/favicon/musher-icon-favicon.svg` |
| iOS home screen | `dist/icon/ios/musher-icon-apple-touch-180.png` |
| Android home screen | `dist/icon/android/musher-icon-android-192.png` |
| PWA splash | `dist/icon/android/musher-icon-android-512.png` |
| Website header | `dist/logo/svg/musher-logo-lockup-dark.svg` |
| GitHub org avatar | `dist/social/avatar/musher-social-avatar-dark-512.png` |
| GitHub social preview | `dist/social/github/musher-social-github-preview-640.png` |
| Discord server icon | `dist/social/discord/musher-social-discord-icon-512.png` |
| Discord server banner | `dist/social/discord/musher-social-discord-banner-540.png` |
| X/Twitter banner | `dist/social/banner/x/musher-social-banner-x-dark.png` |
| LinkedIn banner | `dist/social/banner/linkedin/musher-social-banner-linkedin-dark.png` |
| Open Graph default | `dist/social/og/musher-social-og-default.png` |
| Dark background | `dist/background/gradient/musher-bg-gradient-teal-1080.png` |
| Presentation hero | `dist/background/hero/musher-bg-hero-1440.png` |
