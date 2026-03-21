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

The Musher logo mark is the **astronaut head**. It uses negative-space cutouts for detail — on transparent versions, the background shows through.

### Variants

| Variant | When to Use | Available Themes |
|---------|-------------|------------------|
| **Mark** (astronaut icon) | Avatars, favicons, app icons, small placements | dark, light, dark-transparent, light-transparent |
| **Lockup — Horizontal** (icon + wordmark) | Headers, marketing, brand-heavy contexts (primary) | dark, light, dark-transparent, light-transparent |
| **Lockup — Stacked** (icon above wordmark) | Square placements, social profiles, presentations | dark, light, dark-transparent, light-transparent |
| **Wordmark** (text only) | When the icon would be too small or cluttered | dark, light |

### Formats

- **SVG** (vector): `dist/logo/svg/` — outlined paths, no font dependency. Use for web, documentation, and scalable contexts.
- **PNG** (raster): `dist/logo/png/` — pre-rendered at standard sizes. Use for social media, presentations, and fixed-size contexts.
- **Source SVGs**: `src/logo/` also contains `*-text.svg` variants with editable text (requires Inter Display Bold). These are design sources, not production assets.

### Available Files (dist/)

**Mark (astronaut)**

| File | Size | Description |
|------|------|-------------|
| `musher-logo-mark-dark.svg` | Vector | Astronaut mark on Obsidian background |
| `musher-logo-mark-dark-transparent.svg` | Vector | Astronaut mark, transparent background, Cool Silver fill |
| `musher-logo-mark-light.svg` | Vector | Astronaut mark on white background |
| `musher-logo-mark-light-transparent.svg` | Vector | Astronaut mark, transparent background, Obsidian fill |
| `musher-logo-mark-dark-{256,512,1024}.png` | 256–1024px | Raster marks, dark |
| `musher-logo-mark-light-{256,512,1024}.png` | 256–1024px | Raster marks, light |
| `musher-logo-mark-{dark,light}-transparent-{256,512,1024}.png` | 256–1024px | Raster marks, transparent |

**Lockup — Horizontal** (astronaut left, wordmark right)

| File | Size | Description |
|------|------|-------------|
| `musher-logo-lockup-horizontal-dark.svg` | Vector | Horizontal lockup on Obsidian |
| `musher-logo-lockup-horizontal-light.svg` | Vector | Horizontal lockup on white |
| `musher-logo-lockup-horizontal-{dark,light}-transparent.svg` | Vector | Transparent background |
| `musher-logo-lockup-horizontal-*-1400x512.png` | 1400x512 | Raster (1x) |
| `musher-logo-lockup-horizontal-*-2800x1024.png` | 2800x1024 | Raster (2x) |

**Lockup — Stacked** (astronaut above wordmark)

| File | Size | Description |
|------|------|-------------|
| `musher-logo-lockup-stacked-dark.svg` | Vector | Stacked lockup on Obsidian |
| `musher-logo-lockup-stacked-light.svg` | Vector | Stacked lockup on white |
| `musher-logo-lockup-stacked-{dark,light}-transparent.svg` | Vector | Transparent background |
| `musher-logo-lockup-stacked-*-1024x1024.png` | 1024x1024 | Raster (1x) |
| `musher-logo-lockup-stacked-*-2048x2048.png` | 2048x2048 | Raster (2x) |

**Wordmark** ("Musher" text, set in Inter Display Bold)

| File | Size | Description |
|------|------|-------------|
| `musher-logo-wordmark-dark.svg` | Vector | Cool Silver wordmark (for dark backgrounds) |
| `musher-logo-wordmark-light.svg` | Vector | Obsidian wordmark (for light backgrounds) |
| `musher-logo-wordmark-dark-{943x266,1886x532}.png` | 943–1886px | Raster, dark |
| `musher-logo-wordmark-light-{943x266,1886x532}.png` | 943–1886px | Raster, light |

### Clear Space

Keep clear space around the logo of at least **10% of the icon height** on all sides. Increase on busy or photographic backgrounds.

### Don'ts

- Don't stretch, skew, or rotate the mark
- Don't redraw or simplify the icon details
- Don't add drop shadows, outlines, or effects to the core mark
- Don't use low-contrast color combinations (e.g., Cool Silver on white)
- Don't place the mark on busy backgrounds without sufficient clear space

---

## Musher Hub (Igloo) Branding

The [Musher Hub](https://hub.musher.dev/) sub-product has its own logo mark — the **igloo** — along with dedicated lockups, wordmark, and favicon bundle. All Hub assets follow the same naming convention with a `musher-hub-` prefix.

### Mark (igloo icon)

| File | Size | Description |
|------|------|-------------|
| `musher-hub-mark-on-obsidian.svg` | Vector | Igloo on Obsidian background |
| `musher-hub-mark-on-white.svg` | Vector | Igloo on white background |
| `musher-hub-mark-cool-silver.svg` | Vector | Cool Silver igloo, transparent |
| `musher-hub-mark-obsidian.svg` | Vector | Obsidian igloo, transparent |
| `musher-hub-mark-currentcolor.svg` | Vector | CSS `currentColor` — style via CSS |
| `musher-hub-mark-*-{256,512,1024}.png` | 256–1024px | Raster variants |

### Lockup — Horizontal (igloo left, "Musher Hub" right)

Recommended default for the Hub header nav bar.

| File | Description |
|------|-------------|
| `musher-hub-lockup-horizontal-cool-silver-transparent.svg` | For dark backgrounds (recommended) |
| `musher-hub-lockup-horizontal-obsidian-transparent.svg` | For light backgrounds |
| `musher-hub-lockup-horizontal-on-obsidian.svg` | On Obsidian |
| `musher-hub-lockup-horizontal-on-white.svg` | On white |
| `musher-hub-lockup-horizontal-stacktext-*.svg` | Narrower variant with stacked text |

### Lockup — Stacked (igloo above "Musher Hub")

| File | Description |
|------|-------------|
| `musher-hub-lockup-stacked-cool-silver-transparent.svg` | Transparent, Cool Silver |
| `musher-hub-lockup-stacked-on-obsidian.svg` | On Obsidian |
| `musher-hub-lockup-stacked-on-white.svg` | On white |
| `musher-hub-lockup-stacked-twoline-on-obsidian.svg` | Two-line text variant |

### Wordmark ("Musher Hub" text only)

| File | Description |
|------|-------------|
| `musher-hub-wordmark-cool-silver.svg` | Cool Silver (for dark backgrounds) |
| `musher-hub-wordmark-obsidian.svg` | Obsidian (for light backgrounds) |
| `musher-hub-wordmark-on-obsidian.svg` | On Obsidian background |
| `musher-hub-wordmark-on-white.svg` | On white background |

### Hub Favicon Bundle

Located in `dist/icon/hub/favicon/`. Drop-in set for hub.musher.dev.

| File | Description |
|------|-------------|
| `musher-hub-favicon.ico` | Legacy favicon |
| `musher-hub-favicon.svg` | Modern SVG favicon |
| `musher-hub-apple-touch-180.png` | Apple touch icon |
| `musher-hub-pwa-192.png` | PWA icon 192px |
| `musher-hub-pwa-512.png` | PWA icon 512px |
| `musher-hub-pwa-maskable-512.png` | PWA maskable icon |
| `musher-hub-manifest.webmanifest` | Web app manifest |

Source files: `src/logo/hub/` and `src/icon/hub/favicon/`
Production files: `dist/logo/hub/` and `dist/icon/hub/favicon/`

### Colors

Hub assets use the standard Musher palette:
- **Obsidian** `#0B0F14` — primary dark background
- **Cool Silver** `#CBD5E1` — primary foreground on dark

---

## Illustration

The original musher/sled/robots scene has been reclassified as a brand illustration. It is not part of the primary logo system but remains available for decorative and marketing use.

### Available Files

| File | Description |
|------|-------------|
| `musher-illustration-scene-dark.svg` | Scene on Obsidian background |
| `musher-illustration-scene-dark-transparent.svg` | Scene, transparent background, Cool Silver fill |
| `musher-illustration-scene-light.svg` | Scene on white background |
| `musher-illustration-scene-light-transparent.svg` | Scene, transparent background, Obsidian fill |
| `musher-illustration-scene-lockup-dark.svg` | Scene with wordmark, Obsidian |
| `musher-illustration-scene-lockup-transparent.svg` | Scene with wordmark, transparent |

Source files: `src/illustration/scene/`
Design masters: `src/illustration/masters/`
Production files: `dist/illustration/svg/` and `dist/illustration/png/`

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

General-purpose profile images. The default avatars use the astronaut mark. Scene-based avatars (old musher/sled) are available as alternates.

| File | Size | Description |
|------|------|-------------|
| `musher-social-avatar-dark-512.png` | 512x512 | Astronaut mark on Obsidian |
| `musher-social-avatar-dark-1024.png` | 1024x1024 | Astronaut mark on Obsidian (high-res) |
| `musher-social-avatar-light-512.png` | 512x512 | Astronaut mark on white |
| `musher-social-avatar-light-1024.png` | 1024x1024 | Astronaut mark on white (high-res) |
| `musher-social-avatar-scene-dark.svg` | Vector | Scene illustration on Obsidian |
| `musher-social-avatar-scene-light-512.png` | 512x512 | Scene illustration on white |
| `musher-social-avatar-scene-light-1024.png` | 1024x1024 | Scene illustration on white (high-res) |

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
- `musher-logo-lockup-horizontal-dark-1400x512.png`
- `musher-illustration-scene-dark.svg`
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
| Website header | `dist/logo/svg/musher-logo-lockup-horizontal-dark.svg` |
| GitHub org avatar | `dist/social/avatar/musher-social-avatar-dark-512.png` |
| GitHub social preview | `dist/social/github/musher-social-github-preview-640.png` |
| Discord server icon | `dist/social/discord/musher-social-discord-icon-512.png` |
| Discord server banner | `dist/social/discord/musher-social-discord-banner-540.png` |
| X/Twitter banner | `dist/social/banner/x/musher-social-banner-x-dark.png` |
| LinkedIn banner | `dist/social/banner/linkedin/musher-social-banner-linkedin-dark.png` |
| Open Graph default | `dist/social/og/musher-social-og-default.png` |
| Dark background | `dist/background/gradient/musher-bg-gradient-teal-1080.png` |
| Presentation hero | `dist/background/hero/musher-bg-hero-1440.png` |
