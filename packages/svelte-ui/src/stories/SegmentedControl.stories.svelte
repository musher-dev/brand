<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SegmentedControl from '../lib/SegmentedControl.svelte';

	const { Story } = defineMeta({
		title: 'Components/SegmentedControl',
		component: SegmentedControl,
	});
</script>

<script lang="ts">
	let value = $state('grid');
	const options = [
		{ value: 'grid', label: 'Grid' },
		{ value: 'list', label: 'List' },
		{ value: 'board', label: 'Board' },
	];
</script>

<Story name="Default">
	{#snippet template()}
		<SegmentedControl bind:value {options} ariaLabel="View mode" />
	{/snippet}
</Story>
