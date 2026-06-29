<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from '../lib/Textarea.svelte';

	const { Story } = defineMeta({
		title: 'Components/Textarea',
		component: Textarea,
	});
</script>

<script lang="ts">
	let value = $state('');
</script>

<Story name="Default">
	{#snippet template()}
		<div style="max-width:360px;">
			<Textarea bind:value label="Description" placeholder="What does this service do?" rows={4} />
		</div>
	{/snippet}
</Story>
