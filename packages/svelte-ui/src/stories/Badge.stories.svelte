<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from '../lib/Badge.svelte';

	const { Story } = defineMeta({
		title: 'Components/Badge',
		component: Badge,
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['success', 'warning', 'error', 'info', 'action', 'neutral'],
			},
			size: { control: { type: 'select' }, options: ['sm', 'md'] },
			dot: { control: 'boolean' },
		},
	});
</script>

<Story name="Default" args={{ variant: 'neutral' }}>
	{#snippet template(args)}
		<Badge {...args}>Neutral</Badge>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div style="display:flex; gap:8px; flex-wrap:wrap;">
			<Badge variant="success" dot>Success</Badge>
			<Badge variant="warning" dot>Warning</Badge>
			<Badge variant="error" dot>Error</Badge>
			<Badge variant="info" dot>Info</Badge>
			<Badge variant="neutral">Neutral</Badge>
		</div>
	{/snippet}
</Story>
