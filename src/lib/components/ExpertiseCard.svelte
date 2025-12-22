<script lang="ts">
	import Check from '@lucide/svelte/icons/check';

	export interface Expertise {
		title: string;
		icon: string;
		subtitle: string;
		features: Record<string, string>;
		keyCapability: string;
	}

	export interface Props {
		expertise: Expertise;
	}
	const { expertise, ...props }: Props = $props();
</script>

<div
	class="w-full flex flex-col rounded-xl bg-surface overflow-hidden
           transition-all duration-500 ease-out cursor-pointer
           hover:bg-surface-highest hover:shadow-xl hover:-translate-y-1 h-full"
>
	<div class="w-full flex items-center justify-center aspect-2/1 shrink-0 bg-[#1F2531]">
		<img src={expertise.icon} alt={expertise.title} class="w-50 h-50 object-cover" />
	</div>

	<div class="p-5 flex flex-col grow">
		<div class="grow mb-6">
			<h3 class="mb-6 text-title text-left">{expertise.title}</h3>
			<p class="text-left mb-3 text-sm">
				{expertise.subtitle}
			</p>
			<ul>
				{#each Object.entries(expertise.features) as [key, value]}
					<li class="flex flex-row items-start gap-3 mb-1">
						<Check class="size-4 bold text-primary mt-0.5 shrink-0" />
						<div class="text-sm text-left">
							<span class="text-on-background"><strong>{key}:</strong></span>
							{value}
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex justify-between items-center">
			<span class="text-muted text-xs"><strong>Key Capability</strong></span>
			<div class="rounded-2xl bg-green/20 px-2 py-1 text-green font-bold text-xs">
				{expertise.keyCapability}
			</div>
		</div>
	</div>
</div>
