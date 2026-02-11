/**
 * Style Dictionary v4 Build Configuration
 *
 * Generates:
 * - dist/css/variables.css - Standard CSS custom properties
 * - dist/tailwind/theme.css - Tailwind v4 @theme compatible output
 */

import StyleDictionary from 'style-dictionary';
import { oklchToHex, isOklch } from './transforms/oklch.js';

// =============================================================================
// Custom Transforms
// =============================================================================

/**
 * Transform oklch colors to hex for broader compatibility
 */
StyleDictionary.registerTransform({
	name: 'color/oklch-to-hex',
	type: 'value',
	transitive: true,
	filter: (token) => {
		const value = token.$value || token.value;
		return token.$type === 'color' && typeof value === 'string' && isOklch(value);
	},
	transform: (token) => {
		const value = token.$value || token.value;
		return oklchToHex(value);
	},
});

/**
 * Transform shadow objects to CSS box-shadow strings
 */
StyleDictionary.registerTransform({
	name: 'shadow/css',
	type: 'value',
	filter: (token) => token.$type === 'shadow',
	transform: (token) => {
		const value = token.$value || token.value;
		if (typeof value === 'string') return value;
		if (typeof value !== 'object') return value;

		const { offsetX = '0', offsetY = '0', blur = '0', spread = '0', color = 'transparent' } = value;
		return `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
	},
});

/**
 * Transform cubic bezier arrays to CSS timing functions
 */
StyleDictionary.registerTransform({
	name: 'cubicBezier/css',
	type: 'value',
	filter: (token) => token.$type === 'cubicBezier',
	transform: (token) => {
		const value = token.$value || token.value;
		if (Array.isArray(value) && value.length === 4) {
			return `cubic-bezier(${value.join(', ')})`;
		}
		return value;
	},
});

/**
 * Transform font family arrays to CSS font-family strings
 */
StyleDictionary.registerTransform({
	name: 'fontFamily/css',
	type: 'value',
	filter: (token) => token.$type === 'fontFamily',
	transform: (token) => {
		const value = token.$value || token.value;
		if (Array.isArray(value)) {
			return value.map((f) => (f.includes(' ') ? `"${f}"` : f)).join(', ');
		}
		return value;
	},
});

// =============================================================================
// Custom Formats
// =============================================================================

/**
 * CSS Variables format - Standard :root block
 */
StyleDictionary.registerFormat({
	name: 'css/variables-custom',
	format: ({ dictionary }) => {
		const lines = [
			'/**',
			' * Musher Design Tokens',
			' * Auto-generated - do not edit directly',
			' */',
			'',
			':root {',
		];

		// Group tokens by category
		const categories = {};

		dictionary.allTokens.forEach((token) => {
			const parts = token.path;
			const category = parts[0];

			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(token);
		});

		// Output tokens grouped by category
		Object.entries(categories).forEach(([category, tokens]) => {
			lines.push(`  /* ${category.charAt(0).toUpperCase() + category.slice(1)} */`);
			tokens.forEach((token) => {
				const name = token.path.join('-');
				const value = token.$value || token.value;
				lines.push(`  --${name}: ${value};`);
			});
			lines.push('');
		});

		lines.push('}');
		return lines.join('\n');
	},
});

/**
 * Tailwind v4 @theme format
 */
StyleDictionary.registerFormat({
	name: 'css/tailwind-theme',
	format: ({ dictionary }) => {
		const lines = [
			'/**',
			' * Musher Design Tokens - Tailwind v4 Theme',
			' * Auto-generated - do not edit directly',
			' *',
			' * Import this file after @import "tailwindcss" in your CSS:',
			' * @import "tailwindcss";',
			' * @import "@musher/design-tokens/dist/tailwind/theme.css";',
			' */',
			'',
			'@theme {',
		];

		// Map token categories to Tailwind namespace
		const namespaceMap = {
			color: 'color',
			surface: 'color-surface',
			text: 'color-text',
			border: 'color-border',
			signal: 'color-signal',
			interactive: 'color-interactive',
			brand: 'color-brand',
			status: 'color-status',
			categorical: 'color-categorical',
			font: 'font',
			spacing: 'spacing',
			radius: 'radius',
			shadow: 'shadow',
			duration: 'transition-duration',
			easing: 'transition-timing-function',
		};

		// Group and output tokens
		const categories = {};

		dictionary.allTokens.forEach((token) => {
			const category = token.path[0];
			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(token);
		});

		Object.entries(categories).forEach(([category, tokens]) => {
			const namespace = namespaceMap[category] || category;
			lines.push(`  /* ${category.charAt(0).toUpperCase() + category.slice(1)} */`);

			tokens.forEach((token) => {
				// Build the CSS variable name with Tailwind namespace
				const tokenPath = token.path.slice(1).join('-');
				const varName = tokenPath ? `--${namespace}-${tokenPath}` : `--${namespace}`;
				const value = token.$value || token.value;
				lines.push(`  ${varName}: ${value};`);
			});
			lines.push('');
		});

		lines.push('}');
		return lines.join('\n');
	},
});

// =============================================================================
// Build Configuration
// =============================================================================

const sd = new StyleDictionary({
	source: ['primitives/**/*.json', 'semantic/colors.dark.json'],
	platforms: {
		css: {
			transforms: [
				'attribute/cti',
				'name/kebab',
				'color/oklch-to-hex',
				'shadow/css',
				'cubicBezier/css',
				'fontFamily/css',
			],
			buildPath: 'dist/css/',
			files: [
				{
					destination: 'variables.css',
					format: 'css/variables-custom',
				},
			],
		},
		tailwind: {
			transforms: [
				'attribute/cti',
				'name/kebab',
				'color/oklch-to-hex',
				'shadow/css',
				'cubicBezier/css',
				'fontFamily/css',
			],
			buildPath: 'dist/tailwind/',
			files: [
				{
					destination: 'theme.css',
					format: 'css/tailwind-theme',
				},
			],
		},
	},
});

// Build all platforms
console.log('Building design tokens...');
await sd.buildAllPlatforms();
console.log('Done! Output in dist/');
