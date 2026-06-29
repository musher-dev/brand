<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from './utils.js';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		variant?: Variant;
		size?: Size;
		disabled?: boolean;
		loading?: boolean;
		href?: string;
		class?: string;
		icon?: Snippet;
		children?: Snippet;
		onclick?: (event: MouseEvent) => void;
		[key: string]: unknown;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		href,
		class: className = '',
		icon,
		children,
		onclick,
		...rest
	}: Props = $props();

	let isLink = $derived(!!href && !disabled && !loading);
	let isDisabled = $derived(disabled || loading);
	let classes = $derived(cn('btn', `btn--${variant}`, `btn--${size}`, className));
</script>

{#snippet content()}
	{#if loading}
		<span class="btn__spinner" aria-hidden="true"></span>
	{:else if icon}
		<span class="btn__icon">{@render icon()}</span>
	{/if}
	{@render children?.()}
{/snippet}

{#if isLink}
	<a {href} class={classes} aria-busy={loading} {...rest}>
		{@render content()}
	</a>
{:else}
	<button type="button" class={classes} disabled={isDisabled} aria-busy={loading} {onclick} {...rest}>
		{@render content()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		font-family: var(--font-family-sans);
		font-weight: var(--font-weight-medium);
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
		border: var(--border-width-thin) solid transparent;
		border-radius: var(--radius-panel);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--easing-ease-out),
			color var(--duration-fast) var(--easing-ease-out),
			border-color var(--duration-fast) var(--easing-ease-out);
	}

	.btn:focus-visible {
		outline: none;
		box-shadow: 0 0 0 var(--border-width-medium) var(--border-focus);
	}

	.btn:disabled,
	.btn[aria-busy='true'] {
		opacity: var(--opacity-disabled);
		cursor: not-allowed;
	}

	/* Sizes */
	.btn--sm {
		min-height: var(--size-control-sm);
		padding: 0 var(--spacing-3);
		font-size: var(--font-size-data);
	}
	.btn--md {
		min-height: var(--size-control-md);
		padding: 0 var(--spacing-4);
		font-size: var(--font-size-body);
	}
	.btn--lg {
		min-height: var(--size-control-lg);
		padding: 0 var(--spacing-5);
		font-size: var(--font-size-body-large);
	}

	/* Variants */
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

	.btn__icon {
		display: inline-flex;
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
	}

	.btn__spinner {
		display: inline-block;
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
		border: var(--border-width-medium) solid currentcolor;
		border-right-color: transparent;
		border-radius: var(--radius-full);
		animation: btn-spin var(--duration-slow) linear infinite;
	}

	@keyframes btn-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
