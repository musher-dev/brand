<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from './utils.js';

	interface Props {
		title?: string;
		description?: string;
		class?: string;
		icon?: Snippet;
		children?: Snippet;
	}

	let { title = '', description = '', class: className = '', icon, children }: Props = $props();
</script>

<div class={cn('empty', className)}>
	{#if icon}<div class="empty__icon">{@render icon()}</div>{/if}
	{#if title}<p class="empty__title">{title}</p>{/if}
	{#if description}<p class="empty__description">{description}</p>{/if}
	{#if children}<div class="empty__actions">{@render children()}</div>{/if}
</div>

<style>
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: var(--spacing-2);
		padding: var(--spacing-8) var(--spacing-4);
	}

	.empty__icon {
		display: inline-flex;
		width: var(--size-icon-xl);
		height: var(--size-icon-xl);
		color: var(--text-tertiary);
		margin-bottom: var(--spacing-2);
	}

	.empty__title {
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body-large);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
	}

	.empty__description {
		margin: 0;
		max-width: var(--container-sm);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		color: var(--text-secondary);
	}

	.empty__actions {
		display: flex;
		gap: var(--spacing-2);
		margin-top: var(--spacing-2);
	}
</style>
