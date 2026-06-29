<script lang="ts">
	import { cn } from './utils.js';

	interface Segment {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		options: Segment[];
		value?: string;
		ariaLabel?: string;
		class?: string;
		onchange?: (value: string) => void;
	}

	let { options, value = $bindable(''), ariaLabel = 'Options', class: className = '', onchange }: Props = $props();

	function select(next: string) {
		value = next;
		onchange?.(next);
	}
</script>

<div class={cn('segmented', className)} role="radiogroup" aria-label={ariaLabel}>
	{#each options as option (option.value)}
		<button
			type="button"
			class="segmented__item"
			class:segmented__item--active={value === option.value}
			role="radio"
			aria-checked={value === option.value}
			disabled={option.disabled}
			onclick={() => select(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.segmented {
		display: inline-flex;
		gap: var(--spacing-1);
		padding: var(--spacing-1);
		background-color: var(--surface-overlay);
		border: var(--border-width-thin) solid var(--border-subtle);
		border-radius: var(--radius-panel);
	}

	.segmented__item {
		padding: var(--spacing-1) var(--spacing-3);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-data);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		background: transparent;
		border: none;
		border-radius: var(--radius-control);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--easing-ease-out),
			color var(--duration-fast) var(--easing-ease-out);
	}
	.segmented__item:hover:not(.segmented__item--active) {
		color: var(--text-primary);
	}
	.segmented__item--active {
		color: var(--text-primary);
		background-color: var(--surface-muted);
	}
	.segmented__item:disabled {
		opacity: var(--opacity-disabled);
		cursor: not-allowed;
	}
	.segmented__item:focus-visible {
		outline: none;
		box-shadow: 0 0 0 var(--border-width-medium) var(--border-focus);
	}
</style>
