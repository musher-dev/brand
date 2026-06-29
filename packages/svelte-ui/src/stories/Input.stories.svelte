<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from '../lib/Input.svelte';

	const { Story } = defineMeta({
		title: 'Components/Input',
		component: Input,
	});
</script>

<script lang="ts">
	let value = $state('');
	let password = $state('');
</script>

<Story name="Default">
	{#snippet template()}
		<div style="max-width:320px;">
			<Input bind:value label="Project name" placeholder="my-project" hint="Lowercase, no spaces" />
		</div>
	{/snippet}
</Story>

<Story name="Error">
	{#snippet template()}
		<div style="max-width:320px;">
			<Input value="bad value" label="Slug" error="Slug is already taken" required />
		</div>
	{/snippet}
</Story>

<Story name="Password">
	{#snippet template()}
		<div style="max-width:320px;">
			<Input bind:value={password} type="password" label="API token" />
		</div>
	{/snippet}
</Story>
