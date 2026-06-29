<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from '../lib/Modal.svelte';

	const { Story } = defineMeta({
		title: 'Components/Modal',
		component: Modal,
	});
</script>

<script lang="ts">
	import Button from '../lib/Button.svelte';
	let open = $state(false);
</script>

<Story name="Default">
	{#snippet template()}
		<Button onclick={() => (open = true)}>Open modal</Button>
		<Modal bind:open title="Delete project" size="md" onClose={() => (open = false)}>
			<p style="margin:0;">This action cannot be undone. Are you sure?</p>
			{#snippet footer()}
				<Button variant="ghost" size="sm" onclick={() => (open = false)}>Cancel</Button>
				<Button variant="danger" size="sm" onclick={() => (open = false)}>Delete</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>
