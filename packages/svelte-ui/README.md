# @musher-dev/svelte-ui

Shared Svelte 5 component library for the Musher platform, themed entirely by
[`@musher-dev/design-tokens`](../design-tokens). Components carry structure,
behavior, and accessibility; all visual values come from design-token CSS
variables (enforced by Stylelint — no hardcoded colors or spacing).

## Install

```bash
bun add @musher-dev/svelte-ui @musher-dev/design-tokens
```

`@musher-dev/design-tokens` is a peer dependency. Load its CSS once at your app
root so the component variables resolve:

```svelte
<!-- +layout.svelte -->
<script>
  import '@musher-dev/design-tokens/css';        // dark :root defaults
  import '@musher-dev/design-tokens/css/light';   // optional light override
</script>
```

## Usage

```svelte
<script lang="ts">
  import { Button, Modal } from '@musher-dev/svelte-ui';
  let open = $state(false);
</script>

<Button variant="primary" onclick={() => (open = true)}>Open</Button>

<Modal {open} onclose={() => (open = false)}>
  {#snippet header()}Confirm{/snippet}
  Are you sure?
</Modal>
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
