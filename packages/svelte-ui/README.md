# @musher-dev/svelte-ui

Shared Svelte 5 component library for the Musher platform, themed entirely by
[`@musher-dev/design-tokens`](../design-tokens). Components carry structure,
behavior, and accessibility; all visual values come from design-token CSS
variables (enforced by Stylelint — no hardcoded colors or spacing).

## Install

```bash
bun add @musher-dev/svelte-ui @musher-dev/design-tokens bits-ui
```

Peer dependencies: `svelte` ^5, `@musher-dev/design-tokens`, and `bits-ui` ^2
(used by `Tabs` and `Tooltip`). Load the token CSS once at your app root so the
component variables resolve:

```svelte
<!-- +layout.svelte -->
<script>
  import '@musher-dev/design-tokens/css';        // dark :root defaults
  import '@musher-dev/design-tokens/css/light';   // optional light override
</script>
```

## Components

| Group | Components |
|-------|------------|
| Actions | `Button` (variant · size · loading · href) |
| Display | `Card`, `Badge`, `Alert`, `Spinner`, `EmptyState` |
| Forms | `Input` (label · hint · error · password toggle), `Textarea`, `Select`, `Checkbox` |
| Overlays | `Modal`, `Drawer`, `Tooltip` |
| Navigation | `Tabs`, `SegmentedControl` |
| Feedback | `Toaster` + the `toast` store/API |

Plus `cn()` (clsx + tailwind-merge) from `@musher-dev/svelte-ui/utils`.

## Usage

```svelte
<script lang="ts">
  import { Button, Modal, toast } from '@musher-dev/svelte-ui';
  let open = $state(false);
</script>

<Button variant="primary" size="md" onclick={() => (open = true)}>Open</Button>

<Modal bind:open title="Confirm" size="md" onClose={() => (open = false)}>
  Are you sure?
  {#snippet footer()}
    <Button variant="ghost" size="sm" onclick={() => (open = false)}>Cancel</Button>
    <Button variant="danger" size="sm" onclick={() => toast.success('Done')}>Confirm</Button>
  {/snippet}
</Modal>
```

### Icons are passed in, never bundled

Components never import an icon library. Pass icons via the `icon` snippet so each
app keeps its own set (`@lucide/svelte`, inline SVG, …):

```svelte
<Button>
  {#snippet icon()}<RocketIcon />{/snippet}
  Deploy
</Button>
```

`Button` variants: `primary` | `secondary` | `ghost` | `danger`.

## Development

From the repo root (builds the design tokens first, then runs Storybook):

```bash
bun run dev:ui          # Storybook dev server (http://localhost:6006)
bun run storybook:build # static Storybook build (used by Chromatic)
```

Package-local scripts: `build` (svelte-package + publint), `check`
(svelte-check), `lint` (Stylelint). Visual regression runs via Chromatic — see
`.github/workflows/chromatic.yml`.
