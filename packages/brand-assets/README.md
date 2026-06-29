# @musher-dev/brand-assets

Musher brand assets — logos, icons, illustrations, social images, and backgrounds — plus the optimize/export pipeline that produces them. Private package (not published to npm; `dist/` is committed and Git-LFS tracked).

## Structure

```
packages/brand-assets/
├── src/            Editable master assets
│   ├── logo/           Astronaut mark, wordmark, lockups, Hub (igloo) sub-brand
│   ├── illustration/   Brand illustrations + design masters
│   ├── icon/           Favicon / PWA / iOS / Android sources
│   ├── social/         Discord + GitHub avatars, banners, OG templates
│   ├── background/     Hero, pattern, gradient sources
│   └── fonts/          Inter, Inter Display, JetBrains Mono
├── dist/           Optimized production exports (committed, LFS)
└── scripts/        optimize.sh · export.sh · validate.sh
```

## Naming convention

`musher-{asset}-{variant}-{color}-{size}.{ext}` — e.g. `musher-logo-lockup-horizontal-dark.svg`, `musher-icon-pwa-maskable-512.png`.

## Commands

Run from the repo root:

```bash
task optimize     # Optimize SVGs and PNGs in src/ (svgo + sharp-cli)
task export       # Export optimized assets from src/ to dist/
task validate     # Validate naming conventions and expected files
```

Or per-package: `bun run --filter @musher-dev/brand-assets <optimize|export|validate>`.

> CI verifies that `dist/` matches a fresh `export`. Because assets are LFS-tracked, run `git lfs pull` before diffing locally.
