<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EmptyState from '../lib/EmptyState.svelte';
	import Button from '../lib/Button.svelte';

	const { Story } = defineMeta({
		title: 'Components/EmptyState',
		component: EmptyState,
	});
</script>

<Story name="Default">
	{#snippet template()}
		<EmptyState title="No deployments yet" description="Create your first deployment to see it here.">
			<Button variant="primary" size="sm">New deployment</Button>
		</EmptyState>
	{/snippet}
</Story>
