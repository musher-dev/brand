<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from '../lib/Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Components/Checkbox',
		component: Checkbox,
	});
</script>

<script lang="ts">
	let checked = $state(true);
</script>

<Story name="Default">
	{#snippet template()}
		<Checkbox bind:checked label="Enable notifications" description="Receive deploy status updates by email." />
	{/snippet}
</Story>
