<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from './utils.js';

	type Variant = 'info' | 'success' | 'warning' | 'error';

	interface Props {
		variant?: Variant;
		title?: string;
		dismissible?: boolean;
		class?: string;
		icon?: Snippet;
		children?: Snippet;
		onDismiss?: () => void;
	}

	let { variant = 'info', title = '', dismissible = false, class: className = '', icon, children, onDismiss }: Props = $props();
</script>

<div class={cn('alert', `alert--${variant}`, className)} role="alert">
	{#if icon}<div class="alert__icon">{@render icon()}</div>{/if}
	<div class="alert__body">
		{#if title}<p class="alert__title">{title}</p>{/if}
		{#if children}<div class="alert__content">{@render children()}</div>{/if}
	</div>
	{#if dismissible}
		<button type="button" class="alert__dismiss" onclick={onDismiss} aria-label="Dismiss">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.alert {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-4);
		border: var(--border-width-thin) solid;
		border-left-width: var(--border-width-thick);
		border-radius: var(--radius-panel);
		background-color: color-mix(in oklab, currentcolor 10%, var(--surface-elevated));
		border-color: color-mix(in oklab, currentcolor 30%, transparent);
	}

	.alert--info {
		color: var(--signal-info);
	}
	.alert--success {
		color: var(--signal-success);
	}
	.alert--warning {
		color: var(--signal-warning);
	}
	.alert--error {
		color: var(--signal-error);
	}

	.alert__icon {
		display: inline-flex;
		flex-shrink: 0;
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
		margin-top: var(--spacing-1);
	}

	.alert__body {
		flex: 1;
		min-width: 0;
	}

	.alert__title {
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
	}

	.alert__content {
		margin-top: var(--spacing-1);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-data);
		color: var(--text-secondary);
	}

	.alert__dismiss {
		display: inline-flex;
		flex-shrink: 0;
		padding: var(--spacing-1);
		border: none;
		background: transparent;
		color: var(--text-tertiary);
		cursor: pointer;
		border-radius: var(--radius-control);
	}
	.alert__dismiss:hover {
		color: var(--text-secondary);
	}
	.alert__dismiss svg {
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
	}
</style>
