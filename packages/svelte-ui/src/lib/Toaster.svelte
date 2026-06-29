<script lang="ts">
	import { toasts, dismissToast } from './toast.js';

	type Placement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

	interface Props {
		placement?: Placement;
	}

	let { placement = 'bottom-right' }: Props = $props();
</script>

<div class="toaster toaster--{placement}" role="region" aria-label="Notifications" aria-live="polite">
	{#each $toasts as item (item.id)}
		<div class="toast toast--{item.variant}" role="status">
			<span class="toast__dot" aria-hidden="true"></span>
			<p class="toast__message">{item.message}</p>
			<button type="button" class="toast__dismiss" onclick={() => dismissToast(item.id)} aria-label="Dismiss">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/each}
</div>

<style>
	.toaster {
		position: fixed;
		z-index: var(--z-index-toast);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		max-width: var(--container-sm);
		padding: var(--spacing-4);
		pointer-events: none;
	}
	.toaster--top-right {
		top: 0;
		right: 0;
	}
	.toaster--top-left {
		top: 0;
		left: 0;
	}
	.toaster--bottom-right {
		bottom: 0;
		right: 0;
	}
	.toaster--bottom-left {
		bottom: 0;
		left: 0;
	}

	.toast {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-4);
		background-color: var(--surface-overlay);
		border: var(--border-width-thin) solid var(--border-default);
		border-left-width: var(--border-width-thick);
		border-radius: var(--radius-panel);
		box-shadow: var(--shadow-elevated);
		pointer-events: auto;
	}
	.toast--info {
		border-left-color: var(--signal-info);
	}
	.toast--success {
		border-left-color: var(--signal-success);
	}
	.toast--warning {
		border-left-color: var(--signal-warning);
	}
	.toast--error {
		border-left-color: var(--signal-error);
	}

	.toast__dot {
		flex-shrink: 0;
		width: var(--spacing-2);
		height: var(--spacing-2);
		border-radius: var(--radius-full);
		background-color: currentcolor;
	}
	.toast--info .toast__dot {
		color: var(--signal-info);
	}
	.toast--success .toast__dot {
		color: var(--signal-success);
	}
	.toast--warning .toast__dot {
		color: var(--signal-warning);
	}
	.toast--error .toast__dot {
		color: var(--signal-error);
	}

	.toast__message {
		flex: 1;
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-data);
		color: var(--text-primary);
	}

	.toast__dismiss {
		display: inline-flex;
		flex-shrink: 0;
		padding: var(--spacing-1);
		border: none;
		background: transparent;
		color: var(--text-tertiary);
		cursor: pointer;
	}
	.toast__dismiss:hover {
		color: var(--text-primary);
	}
	.toast__dismiss svg {
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
	}
</style>
