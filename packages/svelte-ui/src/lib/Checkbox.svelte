<script lang="ts">
	interface Props {
		checked?: boolean;
		label?: string;
		description?: string;
		disabled?: boolean;
		required?: boolean;
		id?: string;
	}

	let {
		checked = $bindable(false),
		label = '',
		description = '',
		disabled = false,
		required = false,
		id,
	}: Props = $props();

	const fallbackId = `checkbox-${Math.random().toString(36).slice(2, 9)}`;
	let uid = $derived(id ?? fallbackId);
</script>

<div class="checkbox" class:checkbox--disabled={disabled}>
	<input
		id={uid}
		type="checkbox"
		bind:checked
		{disabled}
		{required}
		class="checkbox__input"
		aria-describedby={description ? `${uid}-desc` : undefined}
	/>
	<div class="checkbox__text">
		{#if label}<label class="checkbox__label" for={uid}>{label}</label>{/if}
		{#if description}<p id="{uid}-desc" class="checkbox__description">{description}</p>{/if}
	</div>
</div>

<style>
	.checkbox {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-2);
	}
	.checkbox--disabled {
		opacity: var(--opacity-disabled);
	}

	.checkbox__input {
		flex-shrink: 0;
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
		margin-top: var(--spacing-1);
		accent-color: var(--interactive-primary);
		cursor: pointer;
	}
	.checkbox__input:disabled {
		cursor: not-allowed;
	}

	.checkbox__text {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.checkbox__label {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		color: var(--text-primary);
		cursor: pointer;
	}

	.checkbox__description {
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-label);
		color: var(--text-tertiary);
	}
</style>
