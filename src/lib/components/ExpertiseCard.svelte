<script lang="ts">
	import Check from '@lucide/svelte/icons/check';

	export interface Expertise {
		title: string;
		subtitle: string;
		features: string[];
	}

	export interface Props {
		expertise: Expertise;
	}
	const { expertise, ...props }: Props = $props();
</script>

<div
	class="w-full rounded-xl bg-white/10 overflow-hidden
           transition-all duration-1000 ease-out cursor-pointer
           hover:shadow-2xl hover:bg-white/20 hover:-translate-y-1"
>
	<div class="w-full bg-white/10 flex items-center justify-center aspect-2/1">
		<div class="bg-success size-8 rounded-full"></div>
	</div>
	<div class="p-3 lg:p-6">
		<h3 class="mb-6 text-title text-left">{expertise.title}</h3>
		<p class="text-left mb-3 text-sm">
			{expertise.subtitle}
		</p>
		<ul>
			{#each expertise.features as feature}
				<li class="flex flex-row items-center gap-3 mb-1">
					<Check class="size-4 text-success" />
					<span class="text-sm">{feature}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
