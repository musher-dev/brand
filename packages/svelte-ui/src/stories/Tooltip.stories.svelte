<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from '../lib/Tooltip.svelte';
	import Button from '../lib/Button.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tooltip',
		component: Tooltip,
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div style="padding:48px;">
			<Tooltip text="Redeploy the latest commit" side="top">
				<Button variant="secondary" size="sm">Redeploy</Button>
			</Tooltip>
		</div>
	{/snippet}
</Story>
