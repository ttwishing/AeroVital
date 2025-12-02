<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children: Snippet;
		size?: 'sm' | 'md';
		variant?: 'primary' | 'outline';
		onClick?: () => void;
		disabled?: boolean;
		className?: string;
	}

	const {
		children,
		size = 'sm',
		variant = 'primary',
		onClick,
		className = '',
		disabled = false
	}: ButtonProps = $props();

	const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
		sm: 'px-4 py-3 text-base',
		md: 'px-5 py-3.5 text-base'
	};

	const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
		primary:
			'bg-primary/70 text-white/80 shadow-theme-xs hover:bg-primary/60 disabled:bg-primary/30',
		outline: 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
	};

	const buttonClasses = $derived(
		`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
			sizeClasses[size]
		} ${variantClasses[variant]} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`
	);
</script>

<button class={buttonClasses} onclick={onClick} {disabled}>
	{@render children()}
</button>
