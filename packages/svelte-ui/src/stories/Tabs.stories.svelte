<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from '../lib/Tabs.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tabs',
		component: Tabs,
	});
</script>

<script lang="ts">
	let activeTab = $state('overview');
	const tabs = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'activity', label: 'Activity' },
		{ id: 'settings', label: 'Settings', disabled: true },
	];
</script>

<Story name="Default">
	{#snippet template()}
		<div style="max-width:480px;">
			<Tabs bind:activeTab {tabs} ariaLabel="Project sections" />
			<p style="margin-top:12px; color:var(--text-secondary);">Active: {activeTab}</p>
		</div>
	{/snippet}
</Story>
