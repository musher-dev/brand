<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { cn } from './utils.js';

	interface Tab {
		id: string;
		label: string;
		disabled?: boolean;
		title?: string;
	}

	interface Props {
		tabs?: Tab[];
		activeTab?: string;
		onchange?: (tabId: string) => void;
		ariaLabel?: string;
		class?: string;
	}

	let { tabs = [], activeTab = $bindable(''), onchange, ariaLabel = 'Tabs', class: className = '' }: Props = $props();

	$effect(() => {
		if (!activeTab && tabs[0]) activeTab = tabs[0].id;
	});
</script>

<Tabs.Root
	value={activeTab}
	onValueChange={(value) => {
		activeTab = value;
		onchange?.(value);
	}}
	class={cn('musher-tabs', className)}
>
	<Tabs.List class="musher-tabs__list" aria-label={ariaLabel}>
		{#each tabs as tab (tab.id)}
			<Tabs.Trigger value={tab.id} disabled={tab.disabled} title={tab.title} class="musher-tabs__trigger">
				{tab.label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
</Tabs.Root>

<style>
	/* bits-ui renders its own DOM, so target via :global with a prefixed class. */
	:global(.musher-tabs) {
		border-bottom: var(--border-width-thin) solid var(--border-subtle);
	}
	:global(.musher-tabs__list) {
		display: flex;
		gap: var(--spacing-6);
	}
	:global(.musher-tabs__trigger) {
		padding: var(--spacing-3) var(--spacing-1);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-data);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		background: transparent;
		border: none;
		border-bottom: var(--border-width-medium) solid transparent;
		cursor: pointer;
		transition:
			color var(--duration-fast) var(--easing-ease-out),
			border-color var(--duration-fast) var(--easing-ease-out);
	}
	:global(.musher-tabs__trigger:hover) {
		color: var(--text-primary);
		border-bottom-color: var(--border-strong);
	}
	:global(.musher-tabs__trigger[data-state='active']) {
		color: var(--signal-info);
		border-bottom-color: var(--signal-info);
	}
	:global(.musher-tabs__trigger:disabled) {
		opacity: var(--opacity-disabled);
		cursor: not-allowed;
	}
	:global(.musher-tabs__trigger:focus-visible) {
		outline: none;
		box-shadow: 0 0 0 var(--border-width-medium) var(--border-focus);
	}
</style>
