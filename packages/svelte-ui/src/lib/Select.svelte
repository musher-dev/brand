<script lang="ts">
	interface Option {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		value?: string;
		options: Option[];
		label?: string;
		placeholder?: string;
		hint?: string;
		error?: string;
		disabled?: boolean;
		required?: boolean;
		id?: string;
		onchange?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		options,
		label = '',
		placeholder = '',
		hint = '',
		error = '',
		disabled = false,
		required = false,
		id,
		onchange,
	}: Props = $props();

	const fallbackId = `select-${Math.random().toString(36).slice(2, 9)}`;
	let uid = $derived(id ?? fallbackId);
	let describedBy = $derived(error ? `${uid}-error` : hint ? `${uid}-hint` : undefined);

	function handleChange(event: Event) {
		value = (event.currentTarget as HTMLSelectElement).value;
		onchange?.(value);
	}
</script>

<div class="field">
	{#if label}
		<label class="field__label" for={uid}>
			{label}{#if required}<span class="field__required" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	<div class="field__control">
		<select
			id={uid}
			bind:value
			{disabled}
			{required}
			class="select"
			class:select--invalid={!!error}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedBy}
			onchange={handleChange}
		>
			{#if placeholder}
				<option value="" disabled selected={!value}>{placeholder}</option>
			{/if}
			{#each options as option (option.value)}
				<option value={option.value} disabled={option.disabled}>{option.label}</option>
			{/each}
		</select>
		<span class="select__chevron" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6" />
			</svg>
		</span>
	</div>

	{#if error}
		<p id="{uid}-error" class="field__error">{error}</p>
	{:else if hint}
		<p id="{uid}-hint" class="field__hint">{hint}</p>
	{/if}
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}
	.field__label {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-data);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
	}
	.field__required {
		color: var(--signal-error);
		margin-left: var(--spacing-1);
	}
	.field__control {
		position: relative;
		display: flex;
		align-items: center;
	}

	.select {
		width: 100%;
		min-height: var(--size-control-md);
		padding: 0 var(--spacing-8) 0 var(--spacing-3);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		color: var(--input-fg);
		background-color: var(--input-bg);
		border: var(--border-width-thin) solid var(--input-border);
		border-radius: var(--radius-control);
		appearance: none;
		cursor: pointer;
		transition: border-color var(--duration-fast) var(--easing-ease-out);
	}
	.select:focus {
		outline: none;
		border-color: var(--input-border-focus);
		box-shadow: 0 0 0 var(--border-width-thin) var(--input-border-focus);
	}
	.select:disabled {
		opacity: var(--opacity-disabled);
		cursor: not-allowed;
	}
	.select--invalid {
		border-color: var(--signal-error);
	}

	.select__chevron {
		position: absolute;
		right: var(--spacing-2);
		display: inline-flex;
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
		color: var(--text-tertiary);
		pointer-events: none;
	}

	.field__hint {
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-label);
		color: var(--text-tertiary);
	}
	.field__error {
		margin: 0;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-label);
		color: var(--signal-error);
	}
</style>
