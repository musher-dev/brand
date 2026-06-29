<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip } from 'bits-ui';

	type Side = 'top' | 'right' | 'bottom' | 'left';

	interface Props {
		text: string;
		side?: Side;
		delayDuration?: number;
		children?: Snippet;
	}

	let { text, side = 'top', delayDuration = 200, children }: Props = $props();
</script>

<Tooltip.Provider {delayDuration}>
	<Tooltip.Root>
		<Tooltip.Trigger class="musher-tooltip__trigger">
			{@render children?.()}
		</Tooltip.Trigger>
		<Tooltip.Content {side} sideOffset={6} class="musher-tooltip__content">
			{text}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<style>
	:global(.musher-tooltip__trigger) {
		display: inline-flex;
		background: transparent;
		border: none;
		padding: 0;
		cursor: default;
		color: inherit;
		font: inherit;
	}
	:global(.musher-tooltip__content) {
		z-index: var(--z-index-tooltip);
		max-width: var(--container-sm);
		padding: var(--spacing-1) var(--spacing-2);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-label);
		color: var(--text-primary);
		background-color: var(--surface-overlay);
		border: var(--border-width-thin) solid var(--border-default);
		border-radius: var(--radius-control);
		box-shadow: var(--shadow-elevated);
	}
</style>
