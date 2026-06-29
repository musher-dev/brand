<script lang="ts">
	import { cn } from './utils.js';

	type Size = 'sm' | 'md' | 'lg';
	type Variant = 'default' | 'action' | 'success' | 'warning' | 'error';

	interface Props {
		size?: Size;
		variant?: Variant;
		class?: string;
		label?: string;
	}

	let { size = 'md', variant = 'default', class: className = '', label = 'Loading' }: Props = $props();
</script>

<span
	class={cn('spinner', `spinner--${size}`, `spinner--${variant}`, className)}
	role="status"
	aria-label={label}
></span>

<style>
	.spinner {
		display: inline-block;
		border: var(--border-width-medium) solid currentcolor;
		border-right-color: transparent;
		border-radius: var(--radius-full);
		animation: spinner-rotate var(--duration-slow) linear infinite;
	}

	.spinner--sm {
		width: var(--size-icon-sm);
		height: var(--size-icon-sm);
	}
	.spinner--md {
		width: var(--size-icon-md);
		height: var(--size-icon-md);
	}
	.spinner--lg {
		width: var(--size-icon-lg);
		height: var(--size-icon-lg);
	}

	.spinner--default {
		color: var(--text-secondary);
	}
	.spinner--action {
		color: var(--signal-info);
	}
	.spinner--success {
		color: var(--signal-success);
	}
	.spinner--warning {
		color: var(--signal-warning);
	}
	.spinner--error {
		color: var(--signal-error);
	}

	@keyframes spinner-rotate {
		to {
			transform: rotate(360deg);
		}
	}
</style>
