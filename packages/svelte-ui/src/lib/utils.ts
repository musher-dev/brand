import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names, de-duplicating conflicting Tailwind utilities.
 * Re-exported so consuming apps share a single `cn` implementation.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export type { ClassValue };
