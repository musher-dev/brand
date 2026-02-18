# Fonts

This repo uses:

- **Inter** (sans-serif) for UI/body text
- **Inter Display** (sans-serif) for large headings and the Musher wordmark
- **JetBrains Mono** (monospace) for code/terminal

## Self-hosting strategy (recommended)

This bundle includes the Inter / Inter Display files (OTF + WOFF2) in:

- `src/fonts/inter/`

Add JetBrains Mono one of two ways:

### Option A — Self-host JetBrains Mono (preferred for full offline reliability)

1. Download JetBrains Mono (WOFF2 or OTF) from the official release.
2. Place files in:
   - `src/fonts/jetbrains-mono/`
3. Add `@font-face` entries (example below).

### Option B — Use a CDN (fastest to ship)

Use Google Fonts or Fontsource and document the dependency in your app.

## Example CSS

```css
/* Inter */
@font-face {
  font-family: "Inter";
  src: url("/src/fonts/inter/Inter-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("/src/fonts/inter/Inter-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("/src/fonts/inter/Inter-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("/src/fonts/inter/Inter-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Inter Display (wordmark / large headings) */
@font-face {
  font-family: "Inter Display";
  src: url("/src/fonts/inter/InterDisplay-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## Notes

- **Inter Display** is a separate optical-size family meant to look better at larger sizes.
- Both Inter and JetBrains Mono are typically distributed under the SIL Open Font License (OFL).
