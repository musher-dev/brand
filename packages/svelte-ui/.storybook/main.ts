import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
	framework: '@storybook/svelte-vite',
	stories: ['../src/**/*.stories.@(js|ts|svelte)'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
};

export default config;
