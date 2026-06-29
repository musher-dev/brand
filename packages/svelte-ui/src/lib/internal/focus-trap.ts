/**
 * Focus-trap Svelte action shared by overlay components (Modal, Drawer).
 *
 * Because overlays are rendered inside `{#if open}`, the element mounts when the
 * overlay opens and unmounts when it closes — so the action's lifecycle maps
 * exactly to the open state: it focuses the first focusable on mount, cycles Tab
 * within the node, and restores focus to the previously-active element on
 * destroy. Escape handling stays in the component.
 */
const FOCUSABLE_SELECTOR =
	'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function focusTrap(node: HTMLElement) {
	const previouslyFocused = (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;

	function focusable(): HTMLElement[] {
		return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
			(el) => el.offsetParent !== null || el === document.activeElement
		);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab') return;
		const elements = focusable();
		if (elements.length === 0) {
			event.preventDefault();
			node.focus();
			return;
		}
		const first = elements[0];
		const last = elements[elements.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	requestAnimationFrame(() => {
		const elements = focusable();
		(elements[0] ?? node).focus();
	});
	node.addEventListener('keydown', onKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', onKeydown);
			previouslyFocused?.focus?.();
		},
	};
}
