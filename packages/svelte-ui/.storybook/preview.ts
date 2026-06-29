import type { Preview } from '@storybook/svelte';

// Design tokens drive all component styling. Dark is the :root default; light is
// applied via [data-theme="light"]. (Built on demand — run the design-tokens
// build before Storybook; the root `dev:ui` script handles ordering.)
import '@musher-dev/design-tokens/css';
import '@musher-dev/design-tokens/css/light';

const preview: Preview = {
	parameters: {
		backgrounds: { disable: true },
	},
	globalTypes: {
		theme: {
			description: 'Design token theme',
			defaultValue: 'dark',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: ['dark', 'light'],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		(story, context) => {
			document.documentElement.setAttribute('data-theme', context.globals.theme);
			document.body.style.background = 'var(--surface-base)';
			document.body.style.color = 'var(--text-primary)';
			return story();
		},
	],
};

export default preview;
