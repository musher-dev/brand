<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		onclose?: () => void;
		header?: Snippet;
		children?: Snippet;
	}

	let { open = false, onclose, header, children }: Props = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') onclose?.();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="backdrop"
		role="presentation"
		onclick={() => onclose?.()}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(event) => event.stopPropagation()}
		>
			{#if header}
				<header class="modal__header">{@render header()}</header>
			{/if}
			<div class="modal__content">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--modal-overlay-bg);
		/* token color carries no alpha; soften the scrim structurally */
		opacity: 0.98;
	}

	.modal {
		display: flex;
		flex-direction: column;
		max-width: 90vw;
		max-height: 90vh;
		overflow: auto;
		background-color: var(--modal-surface-bg);
		border: 1px solid var(--modal-surface-border);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-modal);
	}

	.modal__header {
		padding: var(--spacing-4);
		border-bottom: 1px solid var(--modal-surface-border);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-heading);
		color: var(--text-primary);
	}

	.modal__content {
		padding: var(--spacing-4);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		color: var(--text-primary);
	}
</style>
