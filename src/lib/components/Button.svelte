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
			'inline-flex grow rounded-lg bg-primary px-8 text-on-background  focus:outline-transparent focus-visible:outline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-solar-500 disabled:bg-surface-container-highest disabled:text-on-surface',
		outline:
			'flex grow rounded-lg px-8  text-primary ring-2 ring-inset ring-outline focus-visible:outline-hidden focus-visible:ring-solar-500  hover:active:ring-outline  disabled:text-on-surface  disabled:hover:bg-transparent disabled:hover:ring-on-surface/12 disabled:ring-on-surface/12'
	};

	const buttonClasses = $derived(
		`group/button relative cursor-pointer items-center justify-center text-center text-base font-medium text-nowrap transition-opacity disabled:cursor-not-allowed disabled:opacity-30 ${className} ${
			sizeClasses[size]
		} ${variantClasses[variant]}'}`
	);
</script>

<button class={buttonClasses} onclick={onClick} {disabled}>
	<div
		class="state-layer pointer-events-none absolute inset-0 rounded-[inherit] bg-current opacity-0 transition-opacity group-hover/button:opacity-8 group-focus-visible/button:opacity-10 group-active/button:group-hover/button:opacity-16 group-disabled/button:hidden"
	></div>
	{@render children()}
</button>
