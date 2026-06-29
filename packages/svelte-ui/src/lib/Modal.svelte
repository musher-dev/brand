<script lang="ts">
	import type { Snippet } from 'svelte';
	import { focusTrap } from './internal/focus-trap.js';

	type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';

	interface Props {
		open?: boolean;
		title?: string;
		size?: Size;
		class?: string;
		onClose?: () => void;
		children?: Snippet;
		footer?: Snippet;
		headerActions?: Snippet;
	}

	let {
		open = $bindable(false),
		title = '',
		size = 'md',
		class: className = '',
		onClose,
		children,
		footer,
		headerActions,
	}: Props = $props();

	const titleId = `modal-title-${Math.random().toString(36).slice(2, 9)}`;

	function close() {
		open = false;
		onClose?.();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
	<div class="overlay" role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined}>
		<button type="button" class="overlay__scrim" aria-label="Close" tabindex="-1" onclick={close}></button>

		<div use:focusTrap class="modal modal--{size} {className}" tabindex="-1">
			{#if title || headerActions}
				<header class="modal__header">
					{#if title}<h2 id={titleId} class="modal__title">{title}</h2>{/if}
					<div class="modal__header-actions">
						{@render headerActions?.()}
						<button type="button" class="modal__close" onclick={close} aria-label="Close">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</header>
			{/if}

			<div class="modal__content">
				{@render children?.()}
			</div>

			{#if footer}
				<footer class="modal__footer">
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-modal);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-4);
	}

	.overlay__scrim {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-overlay);
		border: none;
		cursor: default;
		background-color: var(--modal-overlay-bg);
		opacity: var(--opacity-scrim);
	}

	.modal {
		position: relative;
		z-index: var(--z-index-modal);
		display: flex;
		flex-direction: column;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		background-color: var(--modal-surface-bg);
		border: var(--border-width-thin) solid var(--modal-surface-border);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-modal);
	}

	/* Sizes map to container tokens */
	.modal--sm {
		max-width: var(--container-sm);
	}
	.modal--md {
		max-width: var(--container-md);
	}
	.modal--lg {
		max-width: var(--container-lg);
	}
	.modal--xl {
		max-width: var(--container-xl);
	}
	.modal--2xl {
		max-width: var(--container-2xl);
	}
	.modal--4xl {
		max-width: var(--container-4xl);
	}

	.modal__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-3);
		padding: var(--spacing-4) var(--spacing-6);
		border-bottom: var(--border-width-thin) solid var(--modal-surface-border);
	}

	.modal__title {
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-heading-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
	}

	.modal__header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	.modal__close {
		display: inline-flex;
		padding: var(--spacing-1);
		border: none;
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		border-radius: var(--radius-control);
		transition: color var(--duration-fast) var(--easing-ease-out);
	}
	.modal__close:hover {
		color: var(--text-primary);
	}
	.modal__close svg {
		width: var(--size-icon-md);
		height: var(--size-icon-md);
	}

	.modal__content {
		flex: 1;
		overflow: auto;
		padding: var(--spacing-4) var(--spacing-6);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		color: var(--text-primary);
	}

	.modal__footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--spacing-3);
		padding: var(--spacing-4) var(--spacing-6);
		border-top: var(--border-width-thin) solid var(--modal-surface-border);
		background-color: var(--surface-overlay);
	}
</style>
