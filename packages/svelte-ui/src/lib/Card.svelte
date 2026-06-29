<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from './utils.js';

	type Padding = 'none' | 'sm' | 'md' | 'lg';

	interface Props {
		padding?: Padding;
		hover?: boolean;
		elevated?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { padding = 'md', hover = false, elevated = false, class: className = '', children }: Props = $props();
</script>

<div class={cn('card', `card--pad-${padding}`, hover && 'card--hover', elevated && 'card--elevated', className)}>
	{@render children?.()}
</div>

<style>
	.card {
		background-color: var(--surface-elevated);
		border: var(--border-width-thin) solid var(--border-subtle);
		border-radius: var(--radius-card);
		transition:
			border-color var(--duration-fast) var(--easing-ease-out),
			box-shadow var(--duration-fast) var(--easing-ease-out);
	}

	.card--elevated {
		box-shadow: var(--shadow-elevated);
	}

	.card--hover:hover {
		border-color: var(--border-default);
		box-shadow: var(--shadow-elevated);
	}

	.card--pad-sm {
		padding: var(--spacing-3);
	}
	.card--pad-md {
		padding: var(--spacing-4);
	}
	.card--pad-lg {
		padding: var(--spacing-6);
	}
</style>
