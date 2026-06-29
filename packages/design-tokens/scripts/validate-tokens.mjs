/**
 * Token quality gate (runs after the build, which already fails on unresolved
 * aliases). Asserts that every surface override defines a symmetric set of token
 * keys across dark and light modes, so a token never exists in one mode only
 * (which would leak an asymmetric [data-theme="light"] variable).
 */
import { readFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';

const SURFACES_DIR = new URL('../src/surfaces/', import.meta.url);

/** Collect leaf token paths (ignoring $-prefixed metadata) from a DTCG object. */
function leafPaths(obj, prefix = []) {
	const out = [];
	for (const [key, val] of Object.entries(obj)) {
		if (key.startsWith('$')) continue;
		if (val && typeof val === 'object' && !('$value' in val)) {
			out.push(...leafPaths(val, [...prefix, key]));
		} else {
			out.push([...prefix, key].join('.'));
		}
	}
	return out;
}

function keySet(file) {
	if (!existsSync(file)) return new Set();
	return new Set(leafPaths(JSON.parse(readFileSync(file, 'utf8'))));
}

let failures = 0;
const surfaces = (await readdir(SURFACES_DIR, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);

for (const surface of surfaces) {
	const base = new URL(`${surface}/`, SURFACES_DIR);
	const dark = keySet(new URL('colors.dark.json', base));
	const light = keySet(new URL('colors.light.json', base));

	const onlyDark = [...dark].filter((k) => !light.has(k));
	const onlyLight = [...light].filter((k) => !dark.has(k));

	if (onlyDark.length || onlyLight.length) {
		failures++;
		console.error(`✗ surface "${surface}" has asymmetric dark/light overrides:`);
		if (onlyDark.length) console.error(`    only in dark:  ${onlyDark.join(', ')}`);
		if (onlyLight.length) console.error(`    only in light: ${onlyLight.join(', ')}`);
	} else if (dark.size) {
		console.log(`✓ surface "${surface}" overrides symmetric (${dark.size} keys)`);
	} else {
		console.log(`✓ surface "${surface}" is the baseline (no overrides)`);
	}
}

if (failures) {
	console.error(`\n${failures} surface(s) failed symmetry validation.`);
	process.exit(1);
}
console.log('\nAll surface overrides are symmetric.');
