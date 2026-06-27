<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../lib/Button.svelte';

	const { Story } = defineMeta({
		title: 'Components/Button',
		component: Button,
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'ghost', 'danger'],
			},
		},
	});
</script>

<Story name="Primary" args={{ variant: 'primary' }}>
	{#snippet template(args)}
		<Button {...args}>Primary</Button>
	{/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
	{#snippet template(args)}
		<Button {...args}>Secondary</Button>
	{/snippet}
</Story>

<Story name="Danger" args={{ variant: 'danger' }}>
	{#snippet template(args)}
		<Button {...args}>Delete</Button>
	{/snippet}
</Story>
