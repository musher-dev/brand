<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from '../lib/Alert.svelte';

	const { Story } = defineMeta({
		title: 'Components/Alert',
		component: Alert,
		argTypes: {
			variant: { control: { type: 'select' }, options: ['info', 'success', 'warning', 'error'] },
			dismissible: { control: 'boolean' },
		},
	});
</script>

<Story name="Default" args={{ variant: 'info', title: 'Heads up' }}>
	{#snippet template(args)}
		<div style="max-width:420px;">
			<Alert {...args}>This is an informational message.</Alert>
		</div>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div style="display:flex; flex-direction:column; gap:8px; max-width:420px;">
			<Alert variant="success" title="Saved">Your changes were saved.</Alert>
			<Alert variant="warning" title="Heads up">Low confidence result.</Alert>
			<Alert variant="error" title="Failed" dismissible>Something went wrong.</Alert>
		</div>
	{/snippet}
</Story>
