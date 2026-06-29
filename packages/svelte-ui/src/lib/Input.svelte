<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'value'> {
		value?: string;
		label?: string;
		hint?: string;
		error?: string;
		monospace?: boolean;
		id?: string;
	}

	let {
		value = $bindable(''),
		label = '',
		hint = '',
		error = '',
		monospace = false,
		disabled = false,
		required = false,
		type = 'text',
		id,
		...rest
	}: Props = $props();

	const fallbackId = `input-${Math.random().toString(36).slice(2, 9)}`;
	let uid = $derived(id ?? fallbackId);
	let showPassword = $state(false);
	let isPassword = $derived(type === 'password');
	let inputType = $derived(isPassword && showPassword ? 'text' : type);
	let describedBy = $derived(error ? `${uid}-error` : hint ? `${uid}-hint` : undefined);
</script>

<div class="field">
	{#if label}
		<label class="field__label" for={uid}>
			{label}{#if required}<span class="field__required" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	<div class="field__control">
		<input
			{...rest}
			id={uid}
			type={inputType}
			bind:value
			{disabled}
			{required}
			class="input"
			class:input--mono={monospace}
			class:input--invalid={!!error}
			class:input--has-toggle={isPassword}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedBy}
		/>
		{#if isPassword}
			<button
				type="button"
				class="field__toggle"
				onclick={() => (showPassword = !showPassword)}
				aria-label={showPassword ? 'Hide password' : 'Show password'}
				tabindex="-1"
			>
				{showPassword ? 'Hide' : 'Show'}
			</button>
		{/if}
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

	.input {
		width: 100%;
		min-height: var(--size-control-md);
		padding: 0 var(--spacing-3);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		color: var(--input-fg);
		background-color: var(--input-bg);
		border: var(--border-width-thin) solid var(--input-border);
		border-radius: var(--radius-control);
		transition: border-color var(--duration-fast) var(--easing-ease-out);
	}

	.input--mono {
		font-family: var(--font-family-mono);
	}

	.input--has-toggle {
		padding-right: var(--spacing-12);
	}

	.input::placeholder {
		color: var(--input-placeholder);
	}

	.input:focus {
		outline: none;
		border-color: var(--input-border-focus);
		box-shadow: 0 0 0 var(--border-width-thin) var(--input-border-focus);
	}

	.input:disabled {
		opacity: var(--opacity-disabled);
		cursor: not-allowed;
	}

	.input--invalid {
		border-color: var(--signal-error);
	}

	.field__toggle {
		position: absolute;
		right: var(--spacing-2);
		border: none;
		background: transparent;
		color: var(--text-tertiary);
		font-size: var(--font-size-label);
		cursor: pointer;
	}
	.field__toggle:hover {
		color: var(--text-secondary);
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
