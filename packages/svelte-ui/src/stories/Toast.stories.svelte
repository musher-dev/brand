<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toaster from '../lib/Toaster.svelte';

	const { Story } = defineMeta({
		title: 'Components/Toast',
		component: Toaster,
	});
</script>

<script lang="ts">
	import Button from '../lib/Button.svelte';
	import { toast } from '../lib/toast.js';
</script>

<Story name="Default">
	{#snippet template()}
		<div style="display:flex; gap:8px; flex-wrap:wrap;">
			<Button size="sm" onclick={() => toast.success('Deployment succeeded')}>Success</Button>
			<Button size="sm" variant="secondary" onclick={() => toast.info('Build started')}>Info</Button>
			<Button size="sm" variant="danger" onclick={() => toast.error('Deployment failed', { duration: 0 })}>
				Error
			</Button>
		</div>
		<Toaster placement="bottom-right" />
	{/snippet}
</Story>
