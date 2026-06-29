<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Drawer from '../lib/Drawer.svelte';

	const { Story } = defineMeta({
		title: 'Components/Drawer',
		component: Drawer,
	});
</script>

<script lang="ts">
	import Button from '../lib/Button.svelte';
	let open = $state(false);
</script>

<Story name="Default">
	{#snippet template()}
		<Button onclick={() => (open = true)}>Open drawer</Button>
		<Drawer bind:open title="Filters" subtitle="Refine the activity stream" onClose={() => (open = false)}>
			<p style="margin:0; color:var(--text-secondary);">Drawer body content.</p>
			{#snippet footer()}
				<Button variant="ghost" size="sm" onclick={() => (open = false)}>Reset</Button>
				<Button variant="primary" size="sm" onclick={() => (open = false)}>Apply</Button>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>
