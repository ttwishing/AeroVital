<script lang="ts">
	import Check from '@lucide/svelte/icons/check';

	export interface Expertise {
		title: string;
		icon: string;
		color: string;
		subtitle: string;
		features: string[];
	}

	export interface Props {
		expertise: Expertise;
	}
	const { expertise, ...props }: Props = $props();
</script>

<div
	class="w-full rounded-xl bg-surface overflow-hidden
           transition-all duration-500 ease-out cursor-pointer
           hover:bg-surface-highest hover:shadow-xl hover:-translate-y-1"
>
	<div class="w-full flex items-center justify-center aspect-square">
		<img src={expertise.icon} alt={expertise.title} class="w-full h-full" />
	</div>
	<div class="gap-4 p-5">
		<h3 class="mb-6 text-title text-left">{expertise.title}</h3>
		<p class="text-left mb-3 text-sm">
			{expertise.subtitle}
		</p>
		<ul>
			{#each expertise.features as feature}
				<li class="flex flex-row items-center gap-3 mb-1">
					<Check class="size-4 bold text-primary" />
					<span class="text-sm">{feature}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
