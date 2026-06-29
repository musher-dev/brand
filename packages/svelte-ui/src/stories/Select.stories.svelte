<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from '../lib/Select.svelte';

	const { Story } = defineMeta({
		title: 'Components/Select',
		component: Select,
	});
</script>

<script lang="ts">
	let value = $state('');
	const options = [
		{ value: 'us-east', label: 'US East' },
		{ value: 'us-west', label: 'US West' },
		{ value: 'eu', label: 'Europe', disabled: true },
	];
</script>

<Story name="Default">
	{#snippet template()}
		<div style="max-width:320px;">
			<Select bind:value {options} label="Region" placeholder="Select a region" />
		</div>
	{/snippet}
</Story>
