<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '../lib/Card.svelte';

	const { Story } = defineMeta({
		title: 'Components/Card',
		component: Card,
		argTypes: {
			padding: { control: { type: 'select' }, options: ['none', 'sm', 'md', 'lg'] },
			hover: { control: 'boolean' },
			elevated: { control: 'boolean' },
		},
	});
</script>

<Story name="Default" args={{ padding: 'md' }}>
	{#snippet template(args)}
		<div style="max-width:320px;">
			<Card {...args}>
				<h3 style="margin:0 0 4px; color:var(--text-primary);">Card title</h3>
				<p style="margin:0; color:var(--text-secondary);">Body content themed by tokens.</p>
			</Card>
		</div>
	{/snippet}
</Story>

<Story name="Elevated + hover" args={{ padding: 'md', elevated: true, hover: true }}>
	{#snippet template(args)}
		<div style="max-width:320px;">
			<Card {...args}>Hover me</Card>
		</div>
	{/snippet}
</Story>
