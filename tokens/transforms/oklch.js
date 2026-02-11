/**
 * Oklch to Hex color conversion
 *
 * Converts oklch(L% C H) values to #RRGGBB hex format for browser compatibility.
 * Based on the Oklab color space by Bjorn Ottosson.
 */

/**
 * Parse an oklch string to its components
 * @param {string} oklchString - e.g., "oklch(14% 0.005 285)"
 * @returns {{ l: number, c: number, h: number } | null}
 */
function parseOklch(oklchString) {
	const match = oklchString.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/i);
	if (!match) return null;

	let l = parseFloat(match[1]);
	// Handle percentage vs decimal lightness
	if (l > 1) l = l / 100;

	return {
		l: l,
		c: parseFloat(match[2]),
		h: parseFloat(match[3]),
	};
}

/**
 * Convert oklch to oklab
 * @param {number} l - Lightness (0-1)
 * @param {number} c - Chroma
 * @param {number} h - Hue (degrees)
 * @returns {{ L: number, a: number, b: number }}
 */
function oklchToOklab(l, c, h) {
	const hRad = (h * Math.PI) / 180;
	return {
		L: l,
		a: c * Math.cos(hRad),
		b: c * Math.sin(hRad),
	};
}

/**
 * Convert oklab to linear sRGB
 * @param {number} L - Lightness
 * @param {number} a - a component
 * @param {number} b - b component
 * @returns {{ r: number, g: number, b: number }}
 */
function oklabToLinearSrgb(L, a, b) {
	// Convert to LMS
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;

	// LMS to linear sRGB
	return {
		r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	};
}

/**
 * Apply gamma correction (linear to sRGB)
 * @param {number} c - Linear color component
 * @returns {number}
 */
function linearToSrgb(c) {
	if (c <= 0.0031308) {
		return 12.92 * c;
	}
	return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

/**
 * Clamp a value between 0 and 1
 * @param {number} value
 * @returns {number}
 */
function clamp(value) {
	return Math.max(0, Math.min(1, value));
}

/**
 * Convert a component to hex
 * @param {number} c - Component value (0-1)
 * @returns {string}
 */
function componentToHex(c) {
	const value = Math.round(clamp(c) * 255);
	return value.toString(16).padStart(2, '0');
}

/**
 * Convert oklch color string to hex
 * @param {string} oklchString - e.g., "oklch(14% 0.005 285)"
 * @returns {string} - e.g., "#161616"
 */
export function oklchToHex(oklchString) {
	// Handle non-oklch values (pass through)
	if (!oklchString || typeof oklchString !== 'string') {
		return oklchString;
	}

	if (!oklchString.toLowerCase().startsWith('oklch')) {
		return oklchString;
	}

	const parsed = parseOklch(oklchString);
	if (!parsed) {
		console.warn(`Could not parse oklch value: ${oklchString}`);
		return oklchString;
	}

	const { l, c, h } = parsed;
	const oklab = oklchToOklab(l, c, h);
	const linearRgb = oklabToLinearSrgb(oklab.L, oklab.a, oklab.b);

	const r = linearToSrgb(linearRgb.r);
	const g = linearToSrgb(linearRgb.g);
	const b = linearToSrgb(linearRgb.b);

	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
}

/**
 * Check if a value is an oklch color
 * @param {string} value
 * @returns {boolean}
 */
export function isOklch(value) {
	return typeof value === 'string' && value.toLowerCase().startsWith('oklch');
}

export default { oklchToHex, isOklch };
