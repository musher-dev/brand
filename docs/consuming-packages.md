# Consuming the Musher design-system packages

How the [`musher-dev/platform`](https://github.com/musher-dev/platform) apps adopt `@musher-dev/design-tokens` and `@musher-dev/svelte-ui`, and how to migrate off local copies. This repo is the source of truth; request changes via GitHub issues here.

> Audience: the platform front-end team. Nothing here changes automatically — these are the steps each app takes when it upgrades.

## Registry & auth

All `@musher-dev/*` packages publish to GitHub Packages. Each app needs an `.npmrc` (marketing-site is the only app currently missing one):

```ini
@musher-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

CI already grants `packages: read` and injects `NODE_AUTH_TOKEN` via the `setup-frontend` action — no CI changes are required to add either package.

---

## 1. `@musher-dev/design-tokens` 2.x → 3.0 (breaking)

### 1a. Import path changed

The export map was cleaned up. Update the one import line in each app's `src/app.css`:

```diff
- @import '@musher-dev/design-tokens/dist/tailwind/theme.css';
+ @import '@musher-dev/design-tokens/theme';
```

Affected: `console`, `hub`, `backstage`, `investors`, `docs` (all import the Tailwind `@theme`).

| Need | New specifier |
|------|---------------|
| Tailwind `@theme` (dark) | `@musher-dev/design-tokens/theme` |
| CSS variables (dark) | `@musher-dev/design-tokens/css` |
| Light overrides | `…/css/light` · `…/theme/light` |
| Flat JSON / typed TS | `…/json` · `…` (default import) |
| Marketing surface | `…/marketing/theme` |
| Backstage surface | `…/backstage/theme` |
| Backstage `--bui-*` vars | `…/backstage/css/bui` |

### 1b. Colors are now native oklch

CSS/Tailwind output emits `oklch(…)` instead of hex. Apps consume via `var(--…)` and Tailwind utilities, so this is transparent — but exact rendered colors shift slightly to their true oklch values (more accurate than the old hex approximation). JSON/TS still carry a computed `hex` for non-CSS consumers.

### 1c. New token categories

Previously-local tokens are now centralized — delete app-level polyfills and use these instead:

| Category | Vars | Replaces |
|----------|------|----------|
| Opacity | `--opacity-disabled/muted/hover/active/scrim` | marketing-site inline `@theme` |
| Border / stroke width | `--border-width-*`, `--stroke-width-*` | marketing-site `--stroke-width-*` |
| Z-index | `--z-index-{dropdown,drawer,overlay,modal,popover,toast,tooltip,…}` | magic numbers |
| Container | `--container-{sm…8xl}` (Tailwind `max-w-*`) | docs `--container-8xl` polyfill |
| Breakpoints | `--breakpoint-{sm…2xl}` | — |
| Icon / control sizes | `--size-icon-*`, `--size-control-*` | marketing-site `--spacing-icon-*` |
| Transition delays | `--delay-stagger-{1,2,3}` | marketing-site |

`body-reading` typography (`--font-size-body-reading`, `--leading-body-reading`, `--text-body-reading`) already ships — drop the docs polyfill.

### 1d. Onboard marketing-site

It currently inlines a full `@theme` with hardcoded hex. To adopt the package:

1. Add the `.npmrc` above.
2. Add `"@musher-dev/design-tokens": "^3.0.0"` to `package.json`.
3. In `src/app.css`, replace the inline `@theme { … }` block with `@import '@musher-dev/design-tokens/marketing/theme';` (the marketing surface keeps the vivid landing-page brand).
4. `bun install`.

---

## 2. `@musher-dev/svelte-ui`

### Install

```bash
bun add @musher-dev/svelte-ui
```

Peer dependencies (apps already have the first two): `svelte` ^5, `@musher-dev/design-tokens`, and `bits-ui` ^2 (used by `Tabs`/`Tooltip`). Load the token CSS once at the app root (`+layout.svelte` / `app.css`) so component variables resolve.

### Usage

```svelte
<script lang="ts">
  import { Button, Modal, toast } from '@musher-dev/svelte-ui';
  import { cn } from '@musher-dev/svelte-ui/utils';
  let open = $state(false);
</script>

<Button variant="primary" size="md" loading={false} onclick={() => (open = true)}>Deploy</Button>
```

**Icons are passed in, never bundled.** Components that show an icon accept an `icon` snippet, so each app keeps using its own icon set (`@lucide/svelte` or inline SVG):

```svelte
<Button>
  {#snippet icon()}<RocketIcon />{/snippet}
  Deploy
</Button>
```

`cn()` (clsx + tailwind-merge) is re-exported from `@musher-dev/svelte-ui/utils` so apps share one implementation.

### Component map (delete the local copy, import from the package)

| Package component | Local copies it replaces (per app) |
|-------------------|-------------------------------------|
| `Button` | backstage·console `components/ui/Button`, hub·investors `components/primitives/Button` |
| `Card` | backstage·console `ui`, hub·investors `primitives`, docs |
| `Badge` | backstage·console `ui`, hub `primitives`, docs |
| `Modal` | backstage·console `ui/Modal` |
| `Input` · `Select` · `Spinner` · `SegmentedControl` · `Tabs` | backstage·console `ui/*` (console `Tabs` was already bits-ui) |
| `Checkbox` · `Textarea` · `Alert` · `Toast`(`Toaster`+`toast`) | console `ui` / `primitives` |
| `Drawer` | backstage `ui/Drawer`, console `primitives/Drawer` |
| `EmptyState` | backstage·console `ui`, hub `primitives` |
| `Tooltip` | backstage `ui/Tooltip` |

Component APIs mirror the existing platform components (e.g. `Button` keeps `variant`/`size`/`loading`/`href`; `Modal` keeps `open`/`title`/`size`/`footer`/`headerActions`/`onClose`), so adoption is close to a find-and-replace of the import path. Keep app-specific compositions (ConfirmModal, DropdownMenu, KpiTile, business widgets) local.

### Recommended sequence per app

1. Bump `@musher-dev/design-tokens` and fix the `app.css` import (§1a).
2. Add `@musher-dev/svelte-ui` + `bits-ui`; `bun install`.
3. Swap imports for one component (start with `Button`/`Card`), delete the local file, run `task <app>:check`.
4. Repeat; commit per component or per small group.
