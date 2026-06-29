<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLTextareaAttributes, 'value'> {
		value?: string;
		label?: string;
		hint?: string;
		error?: string;
		id?: string;
	}

	let {
		value = $bindable(''),
		label = '',
		hint = '',
		error = '',
		rows = 4,
		disabled = false,
		required = false,
		id,
		...rest
	}: Props = $props();

	const fallbackId = `textarea-${Math.random().toString(36).slice(2, 9)}`;
	let uid = $derived(id ?? fallbackId);
	let describedBy = $derived(error ? `${uid}-error` : hint ? `${uid}-hint` : undefined);
</script>

<div class="field">
	{#if label}
		<label class="field__label" for={uid}>
			{label}{#if required}<span class="field__required" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	<textarea
		{...rest}
		id={uid}
		bind:value
		{rows}
		{disabled}
		{required}
		class="textarea"
		class:textarea--invalid={!!error}
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={describedBy}
	></textarea>

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

	.textarea {
		width: 100%;
		padding: var(--spacing-2) var(--spacing-3);
		font-family: var(--font-family-sans);
		font-size: var(--font-size-body);
		line-height: var(--font-lineHeight-body);
		color: var(--input-fg);
		background-color: var(--input-bg);
		border: var(--border-width-thin) solid var(--input-border);
		border-radius: var(--radius-control);
		resize: vertical;
		transition: border-color var(--duration-fast) var(--easing-ease-out);
	}
	.textarea::placeholder {
		color: var(--input-placeholder);
	}
	.textarea:focus {
		outline: none;
		border-color: var(--input-border-focus);
		box-shadow: 0 0 0 var(--border-width-thin) var(--input-border-focus);
	}
	.textarea:disabled {
		opacity: var(--opacity-disabled);
		cursor: not-allowed;
	}
	.textarea--invalid {
		border-color: var(--signal-error);
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
