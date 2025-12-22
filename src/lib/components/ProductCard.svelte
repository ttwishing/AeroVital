<script lang="ts">
	import { observe } from '$lib/actions/observe';

	export interface Product {
		img: string;
		name: string;
		descrition: string;
		main: Record<string, string>;
		params: Record<string, string>;
	}

	export interface Props {
		product: Product;
	}

	const { product, ...props }: Props = $props();

	const classesToAdd = 'opacity-100 translate-y-0';
	const classesToRemove = 'opacity-0 translate-y-8';
</script>

<div
	class="group
           opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 bg-surface rounded-2xl
           relative"
	use:observe={{
		classToApply: classesToAdd,
		classToRemove: classesToRemove,
		rootMargin: '0px 0px -15% 0px'
	}}
>
	<div class="overflow-hidden rounded-tl-2xl rounded-tr-2xl">
		<img
			src={product.img}
			alt={product.name}
			class="ease-linear w-full duration-500 scale-100 group-hover:scale-125"
		/>
	</div>
	<div class="p-3 lg:p-6">
		<h3 class="text-title mb-3">{product.name}</h3>
		<p class="mb-6">{product.descrition}</p>
		<div class="grid grid-cols-2 gap-3 mb-6">
			{#each Object.entries(product.main) as [key, value]}
				<div class="px-3 py-2 bg-white/2 border border-white/3 rounded-lg text-left">
					<p class="text-sm">
						{key}
					</p>
					<span class="text-title font-bold">{value}</span>
				</div>
			{/each}
		</div>
		<p class="text-left mb-3">Technical Specifications</p>
		<div class="grid grid-cols-2 gap-3">
			{#each Object.entries(product.params) as [key, value]}
				<div class="px-3 py-2 bg-white/2 border border-white/3 rounded-lg text-left">
					<p class="text-sm">
						{key}
					</p>
					<span class="text-base">{value}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
