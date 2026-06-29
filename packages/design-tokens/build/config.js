/**
 * Musher Design Tokens - matrix build
 *
 * Produces, per surface (console/marketing/backstage) and mode (dark/light):
 *   dist/<surface>/css/variables.<mode>.css   - CSS custom properties (native oklch)
 *   dist/<surface>/tailwind/theme.<mode>.css  - Tailwind v4 @theme (native oklch)
 *   dist/<surface>/ts/tokens.<mode>.js + .d.ts - typed constants (oklch + hex)
 *   dist/<surface>/json/tokens.<mode>.json    - flat resolved JSON (oklch + hex)
 * Backstage additionally emits dist/backstage/css/bui.<mode>.css (--bui-* names).
 *
 * Color values stay native oklch in CSS/Tailwind (perceptual uniformity, modern
 * browsers). Hex is computed accurately via culori only for JSON/TS consumers.
 */

import StyleDictionary from 'style-dictionary';
import { existsSync } from 'node:fs';
import { formatHex, clampChroma } from 'culori';

// =============================================================================
// Helpers
// =============================================================================

/** Accurate oklch -> #rrggbb with sRGB gamut mapping. Non-oklch values pass through. */
function oklchToHex(value) {
	if (typeof value !== 'string' || !value.startsWith('oklch')) return null;
	try {
		return formatHex(clampChroma(value, 'oklch')) ?? formatHex(value);
	} catch {
		return null;
	}
}

const tokenValue = (token) => token.$value ?? token.value;
const isColor = (token) => token.$type === 'color';
const isPrimitive = (token) => token.path[0] === 'color';

/** Tokens to emit for a given output mode. */
function selectTokens(dictionary, mode) {
	if (mode === 'base') return dictionary.allTokens; // :root - everything
	// override (light) - only semantic/component color tokens change between modes
	return dictionary.allTokens.filter((t) => isColor(t) && !isPrimitive(t));
}

// =============================================================================
// Transforms (composite -> CSS string). Color is left as native oklch.
// =============================================================================

StyleDictionary.registerTransform({
	name: 'shadow/css',
	type: 'value',
	filter: (token) => token.$type === 'shadow',
	transform: (token) => {
		const value = tokenValue(token);
		if (typeof value === 'string') return value;
		if (typeof value !== 'object') return value;
		const { offsetX = '0', offsetY = '0', blur = '0', spread = '0', color = 'transparent' } = value;
		return `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
	},
});

StyleDictionary.registerTransform({
	name: 'cubicBezier/css',
	type: 'value',
	filter: (token) => token.$type === 'cubicBezier',
	transform: (token) => {
		const value = tokenValue(token);
		return Array.isArray(value) && value.length === 4 ? `cubic-bezier(${value.join(', ')})` : value;
	},
});

StyleDictionary.registerTransform({
	name: 'fontFamily/css',
	type: 'value',
	filter: (token) => token.$type === 'fontFamily',
	transform: (token) => {
		const value = tokenValue(token);
		return Array.isArray(value) ? value.map((f) => (f.includes(' ') ? `"${f}"` : f)).join(', ') : value;
	},
});

const TRANSFORMS = ['attribute/cti', 'shadow/css', 'cubicBezier/css', 'fontFamily/css'];

// =============================================================================
// Formats
// =============================================================================

/** CSS custom properties, grouped by category. selector + prefix + mode are options. */
StyleDictionary.registerFormat({
	name: 'css/variables-themed',
	format: ({ dictionary, options }) => {
		const selector = options?.selector ?? ':root';
		const prefix = options?.prefix ? `${options.prefix}-` : '';
		const tokens = selectTokens(dictionary, options?.mode ?? 'base');

		const groups = {};
		tokens.forEach((t) => {
			(groups[t.path[0]] ??= []).push(t);
		});

		const lines = ['/**', ' * Musher Design Tokens', ' * Auto-generated - do not edit directly', ' */', '', `${selector} {`];
		Object.entries(groups).forEach(([category, group]) => {
			lines.push(`  /* ${category[0].toUpperCase() + category.slice(1)} */`);
			group.forEach((t) => lines.push(`  --${prefix}${t.path.join('-')}: ${tokenValue(t)};`));
			lines.push('');
		});
		lines.push('}');
		return lines.join('\n');
	},
});

const TAILWIND_NAMESPACE = {
	color: 'color',
	surface: 'color-surface',
	text: 'color-text',
	border: 'color-border',
	signal: 'color-signal',
	interactive: 'color-interactive',
	brand: 'color-brand',
	status: 'color-status',
	warmth: 'color-warmth',
	categorical: 'color-categorical',
	internal: 'color-internal',
	button: 'color-button',
	modal: 'color-modal',
	input: 'color-input',
	font: 'font',
	spacing: 'spacing',
	radius: 'radius',
	shadow: 'shadow',
	duration: 'transition-duration',
	delay: 'transition-delay',
	easing: 'transition-timing-function',
	// Native Tailwind v4 theme namespaces (generate utilities)
	breakpoint: 'breakpoint',
	container: 'container',
	// Var-only categories (no Tailwind utility, consumed via var(--…))
	opacity: 'opacity',
	'border-width': 'border-width',
	'stroke-width': 'stroke-width',
	'z-index': 'z-index',
	size: 'size',
};
const TAILWIND_FONT_SUB = { weight: 'font-weight', lineHeight: 'leading', letterSpacing: 'tracking' };
const TEXT_SIZE_NAMES = ['label', 'data', 'body', 'body-large', 'body-reading', 'heading-sm', 'heading', 'title', 'display', 'display-lg'];

StyleDictionary.registerFormat({
	name: 'css/tailwind-theme',
	format: ({ dictionary, options }) => {
		const tokens = selectTokens(dictionary, options?.mode ?? 'base');

		// Assert every emitted category has a Tailwind namespace (no silent fallthrough).
		const unmapped = [...new Set(tokens.map((t) => t.path[0]))].filter((c) => !TAILWIND_NAMESPACE[c]);
		if (unmapped.length) {
			console.warn(`  [tailwind] WARNING: unmapped categories -> non-utility vars: ${unmapped.join(', ')}`);
		}

		const groups = {};
		tokens.forEach((t) => {
			(groups[t.path[0]] ??= []).push(t);
		});

		const lines = ['/**', ' * Musher Design Tokens - Tailwind v4 @theme', ' * Auto-generated - do not edit directly', ' */', '', '@theme {'];
		Object.entries(groups).forEach(([category, group]) => {
			const namespace = TAILWIND_NAMESPACE[category] || category;
			lines.push(`  /* ${category[0].toUpperCase() + category.slice(1)} */`);
			group.forEach((t) => {
				let ns = namespace;
				let rest = t.path.slice(1);
				if (category === 'font' && t.path.length >= 3 && TAILWIND_FONT_SUB[t.path[1]]) {
					ns = TAILWIND_FONT_SUB[t.path[1]];
					rest = t.path.slice(2);
				}
				const tail = rest.join('-');
				lines.push(`  ${tail ? `--${ns}-${tail}` : `--${ns}`}: ${tokenValue(t)};`);
			});
			lines.push('');
		});

		// text-* utility aliases -> font-size tokens (dark/base only, fonts are mode-invariant)
		if ((options?.mode ?? 'base') === 'base') {
			lines.push('  /* Text Utilities */');
			TEXT_SIZE_NAMES.forEach((n) => lines.push(`  --text-${n}: var(--font-size-${n});`));
			lines.push('');
		}
		lines.push('}');
		return lines.join('\n');
	},
});

/** Flat resolved JSON. Colors carry both oklch and computed hex. */
StyleDictionary.registerFormat({
	name: 'musher/json-flat',
	format: ({ dictionary }) => {
		const out = {};
		dictionary.allTokens.forEach((t) => {
			const name = t.path.join('-');
			const value = tokenValue(t);
			const hex = oklchToHex(value);
			out[name] = hex ? { $type: t.$type, oklch: value, hex } : { $type: t.$type, value };
		});
		return JSON.stringify(out, null, 2);
	},
});

/** Build a nested object of resolved values (colors -> {oklch, hex}). */
function nestedValues(dictionary) {
	const root = {};
	dictionary.allTokens.forEach((t) => {
		const value = tokenValue(t);
		const hex = oklchToHex(value);
		const leaf = hex ? { oklch: value, hex } : value;
		let node = root;
		t.path.forEach((seg, i) => {
			if (i === t.path.length - 1) node[seg] = leaf;
			else node = node[seg] ??= {};
		});
	});
	return root;
}

StyleDictionary.registerFormat({
	name: 'javascript/tokens',
	format: ({ dictionary }) => {
		const nested = nestedValues(dictionary);
		return `// Auto-generated - do not edit directly\nexport const tokens = ${JSON.stringify(nested, null, 2)};\nexport default tokens;\n`;
	},
});

/** Recursive literal TS type for the nested values object. */
function tsType(value, indent = 0) {
	if (typeof value !== 'object' || value === null) return JSON.stringify(value);
	const pad = '\t'.repeat(indent + 1);
	const entries = Object.entries(value).map(([k, v]) => `${pad}readonly ${JSON.stringify(k)}: ${tsType(v, indent + 1)};`);
	return `{\n${entries.join('\n')}\n${'\t'.repeat(indent)}}`;
}

StyleDictionary.registerFormat({
	name: 'typescript/tokens-dts',
	format: ({ dictionary }) => {
		const nested = nestedValues(dictionary);
		const names = [...new Set(dictionary.allTokens.map((t) => t.path.join('-')))].sort();
		const union = names.map((n) => `\t| ${JSON.stringify(n)}`).join('\n');
		return [
			'// Auto-generated - do not edit directly',
			`export declare const tokens: ${tsType(nested, 0)};`,
			'export default tokens;',
			'export type Tokens = typeof tokens;',
			`export type TokenName =\n${union};`,
			'',
		].join('\n');
	},
});

// =============================================================================
// Build matrix
// =============================================================================

const SURFACES = {
	console: { components: true, bui: false },
	marketing: { components: true, bui: false },
	backstage: { components: true, bui: true },
};
const MODES = ['dark', 'light'];

function sources(surface, mode, opts) {
	const list = ['src/primitives/**/*.json', `src/semantic/colors.${mode}.json`];
	const dir = `src/surfaces/${surface}`;
	if (existsSync(`${dir}/primitives.json`)) list.push(`${dir}/primitives.json`);
	if (existsSync(`${dir}/colors.${mode}.json`)) list.push(`${dir}/colors.${mode}.json`);
	if (opts.components) list.push('src/components/**/*.json');
	return list;
}

function platforms(surface, mode, opts) {
	const isDark = mode === 'dark';
	const outMode = isDark ? 'base' : 'override';
	const selector = isDark ? ':root' : '[data-theme="light"]';
	const base = `dist/${surface}`;
	const p = {
		css: {
			transforms: TRANSFORMS,
			buildPath: `${base}/css/`,
			files: [{ destination: `variables.${mode}.css`, format: 'css/variables-themed', options: { selector, mode: outMode } }],
		},
		tailwind: {
			transforms: TRANSFORMS,
			buildPath: `${base}/tailwind/`,
			files: [{ destination: `theme.${mode}.css`, format: 'css/tailwind-theme', options: { mode: outMode } }],
		},
		ts: {
			transforms: TRANSFORMS,
			buildPath: `${base}/ts/`,
			files: [
				{ destination: `tokens.${mode}.js`, format: 'javascript/tokens' },
				{ destination: `tokens.${mode}.d.ts`, format: 'typescript/tokens-dts' },
			],
		},
		json: {
			transforms: TRANSFORMS,
			buildPath: `${base}/json/`,
			files: [{ destination: `tokens.${mode}.json`, format: 'musher/json-flat' }],
		},
	};
	if (opts.bui) {
		p.bui = {
			transforms: TRANSFORMS,
			buildPath: `${base}/css/`,
			files: [{ destination: `bui.${mode}.css`, format: 'css/variables-themed', options: { selector, prefix: 'bui', mode: outMode } }],
		};
	}
	return p;
}

console.log('Building design tokens (surfaces x modes)...');
for (const [surface, opts] of Object.entries(SURFACES)) {
	for (const mode of MODES) {
		const sd = new StyleDictionary({
			source: sources(surface, mode, opts),
			platforms: platforms(surface, mode, opts),
			log: { verbosity: 'silent', warnings: 'warn' },
		});
		await sd.buildAllPlatforms();
		console.log(`  ✔︎ ${surface} / ${mode}`);
	}
}
console.log('Done! Output in dist/');
