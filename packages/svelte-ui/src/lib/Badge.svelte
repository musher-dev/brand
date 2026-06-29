<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from './utils.js';

	type Variant = 'success' | 'warning' | 'error' | 'info' | 'action' | 'neutral';
	type Size = 'sm' | 'md';

	interface Props {
		variant?: Variant;
		size?: Size;
		dot?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { variant = 'neutral', size = 'md', dot = false, class: className = '', children }: Props = $props();
</script>

<span class={cn('badge', `badge--${variant}`, `badge--${size}`, className)}>
	{#if dot}<span class="badge__dot" aria-hidden="true"></span>{/if}
	{@render children?.()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-1);
		font-family: var(--font-family-sans);
		font-weight: var(--font-weight-medium);
		line-height: 1;
		white-space: nowrap;
		border: var(--border-width-thin) solid;
		border-radius: var(--radius-full);
		/* color set per variant; background/border derive from it */
		background-color: color-mix(in oklab, currentcolor 12%, transparent);
		border-color: color-mix(in oklab, currentcolor 30%, transparent);
	}

	.badge--sm {
		padding: var(--spacing-1) var(--spacing-2);
		font-size: var(--font-size-label);
	}
	.badge--md {
		padding: var(--spacing-1) var(--spacing-3);
		font-size: var(--font-size-data);
	}

	.badge--success {
		color: var(--signal-success);
	}
	.badge--warning {
		color: var(--signal-warning);
	}
	.badge--error {
		color: var(--signal-error);
	}
	.badge--info {
		color: var(--signal-info);
	}
	.badge--action {
		color: var(--signal-info);
	}
	.badge--neutral {
		color: var(--text-secondary);
	}

	.badge__dot {
		width: var(--spacing-2);
		height: var(--spacing-2);
		border-radius: var(--radius-full);
		background-color: currentcolor;
	}
</style>
