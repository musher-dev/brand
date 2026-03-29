# Contributing to Musher Brand

## Setup

```bash
task setup        # Installs asset tools (svgo, sharp-cli) and token dependencies
```

## Adding or Updating Assets

1. Place source files in the appropriate `src/` subdirectory.
2. Follow the naming convention: `musher-{category}-{variant}-{modifier}-{size}.{ext}`
3. Run the pipeline:

```bash
task optimize     # Optimize SVGs and PNGs in src/
task export       # Copy optimized assets to dist/
task validate     # Verify naming and directory structure
```

4. Commit both `src/` and `dist/` changes.

## Design Tokens

Token sources live in `tokens/primitives/` and `tokens/semantic/`. To rebuild:

```bash
task build        # Builds CSS variables and Tailwind v4 theme files
```

## Pull Requests

- CI checks that `dist/` matches a fresh `task export` run. If CI fails with drift, run `task export` locally and commit.
- All shell scripts must pass ShellCheck.
- See `docs/Brand_Guidelines.md` for the full asset specification.
