<script lang="ts">
	import type { Snippet } from 'svelte';
	import { focusTrap } from './internal/focus-trap.js';

	type Side = 'right' | 'left';

	interface Props {
		open?: boolean;
		title?: string;
		subtitle?: string;
		side?: Side;
		class?: string;
		onClose?: () => void;
		children?: Snippet;
		footer?: Snippet;
		headerActions?: Snippet;
	}

	let {
		open = $bindable(false),
		title = '',
		subtitle = '',
		side = 'right',
		class: className = '',
		onClose,
		children,
		footer,
		headerActions,
	}: Props = $props();

	const titleId = `drawer-title-${Math.random().toString(36).slice(2, 9)}`;

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

		<div use:focusTrap class="drawer drawer--{side} {className}" tabindex="-1">
			<header class="drawer__header">
				<div class="drawer__heading">
					{#if title}<h2 id={titleId} class="drawer__title">{title}</h2>{/if}
					{#if subtitle}<p class="drawer__subtitle">{subtitle}</p>{/if}
				</div>
				<div class="drawer__header-actions">
					{@render headerActions?.()}
					<button type="button" class="drawer__close" onclick={close} aria-label="Close">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</header>

			<div class="drawer__content">
				{@render children?.()}
			</div>

			{#if footer}
				<footer class="drawer__footer">{@render footer()}</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-drawer);
		display: flex;
	}
	.overlay__scrim {
		position: fixed;
		inset: 0;
		border: none;
		cursor: default;
		background-color: var(--modal-overlay-bg);
		opacity: var(--opacity-scrim);
	}

	.drawer {
		position: relative;
		z-index: var(--z-index-drawer);
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--container-md);
		height: 100%;
		background-color: var(--surface-elevated);
		box-shadow: var(--shadow-modal);
	}
	.drawer--right {
		margin-left: auto;
		border-left: var(--border-width-thin) solid var(--border-subtle);
	}
	.drawer--left {
		margin-right: auto;
		border-right: var(--border-width-thin) solid var(--border-subtle);
	}

	.drawer__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--spacing-3);
		padding: var(--spacing-4) var(--spacing-6);
		border-bottom: var(--border-width-thin) solid var(--border-subtle);
	}
	.drawer__title {
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-heading-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
	}
	.drawer__subtitle {
		margin: var(--spacing-1) 0 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-label);
		color: var(--text-secondary);
	}
	.drawer__header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}
	.drawer__close {
		display: inline-flex;
		padding: var(--spacing-1);
		border: none;
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		border-radius: var(--radius-control);
	}
	.drawer__close:hover {
		color: var(--text-primary);
	}
	.drawer__close svg {
		width: var(--size-icon-md);
		height: var(--size-icon-md);
	}

	.drawer__content {
		flex: 1;
		overflow: auto;
		padding: var(--spacing-4) var(--spacing-6);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		color: var(--text-primary);
	}
	.drawer__footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--spacing-3);
		padding: var(--spacing-4) var(--spacing-6);
		border-top: var(--border-width-thin) solid var(--border-subtle);
		background-color: var(--surface-overlay);
	}
</style>
