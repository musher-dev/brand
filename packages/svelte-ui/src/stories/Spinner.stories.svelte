<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from '../lib/Spinner.svelte';

	const { Story } = defineMeta({
		title: 'Components/Spinner',
		component: Spinner,
		argTypes: {
			size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
			variant: { control: { type: 'select' }, options: ['default', 'action', 'success', 'warning', 'error'] },
		},
	});
</script>

<Story name="Default" args={{ size: 'md' }}>
	{#snippet template(args)}
		<Spinner {...args} />
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div style="display:flex; align-items:center; gap:16px;">
			<Spinner size="sm" />
			<Spinner size="md" variant="action" />
			<Spinner size="lg" variant="success" />
		</div>
	{/snippet}
</Story>
