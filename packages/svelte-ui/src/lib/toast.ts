import { writable } from 'svelte/store';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
	id: string;
	message: string;
	variant: ToastVariant;
	duration: number;
}

export interface ToastOptions {
	variant?: ToastVariant;
	/** ms before auto-dismiss; 0 disables auto-dismiss. */
	duration?: number;
}

export const toasts = writable<ToastItem[]>([]);

let counter = 0;

export function dismissToast(id: string): void {
	toasts.update((items) => items.filter((item) => item.id !== id));
}

function show(message: string, options: ToastOptions = {}): string {
	const id = `toast-${++counter}`;
	const item: ToastItem = {
		id,
		message,
		variant: options.variant ?? 'info',
		duration: options.duration ?? 4000,
	};
	toasts.update((items) => [...items, item]);
	if (item.duration > 0 && typeof setTimeout !== 'undefined') {
		setTimeout(() => dismissToast(id), item.duration);
	}
	return id;
}

/** Imperative toast API: `toast.success('Saved')`, `toast.error('Failed', { duration: 0 })`. */
export const toast = Object.assign(show, {
	info: (message: string, options?: ToastOptions) => show(message, { ...options, variant: 'info' }),
	success: (message: string, options?: ToastOptions) => show(message, { ...options, variant: 'success' }),
	warning: (message: string, options?: ToastOptions) => show(message, { ...options, variant: 'warning' }),
	error: (message: string, options?: ToastOptions) => show(message, { ...options, variant: 'error' }),
	dismiss: dismissToast,
});
