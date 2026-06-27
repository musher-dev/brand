<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		children?: Snippet;
	}

	let { variant = 'primary', children, ...rest }: Props = $props();
</script>

<button class="btn btn--{variant}" {...rest}>
	{@render children?.()}
</button>

<style>
	/* All visual values are delegated to design tokens (CSS custom properties).
	   Structural rules (display, cursor) are intentionally not tokenized. */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		font-weight: var(--font-weight-medium);
		line-height: 1;
		padding: var(--spacing-2) var(--spacing-4);
		border: 1px solid transparent;
		border-radius: var(--radius-control);
		cursor: pointer;
		transition: background-color var(--duration-fast) var(--easing-ease-out);
	}

	.btn--primary {
		background-color: var(--button-primary-bg);
		color: var(--button-primary-fg);
		border-color: var(--button-primary-border);
	}
	.btn--primary:hover {
		background-color: var(--button-primary-bg-hover);
	}

	.btn--secondary {
		background-color: var(--button-secondary-bg);
		color: var(--button-secondary-fg);
		border-color: var(--button-secondary-border);
	}
	.btn--secondary:hover {
		background-color: var(--button-secondary-bg-hover);
	}

	.btn--ghost {
		background-color: var(--button-ghost-bg);
		color: var(--button-ghost-fg);
	}
	.btn--ghost:hover {
		background-color: var(--button-ghost-bg-hover);
	}

	.btn--danger {
		background-color: var(--button-danger-bg);
		color: var(--button-danger-fg);
	}
	.btn--danger:hover {
		background-color: var(--button-danger-bg-hover);
	}
</style>
