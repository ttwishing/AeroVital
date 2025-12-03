<script lang="ts">
	import Check from '@lucide/svelte/icons/check';

	export interface Expertise {
		title: string;
		color: string;
		subtitle: string;
		features: string[];
	}

	export interface Props {
		expertise: Expertise;
	}
	const { expertise, ...props }: Props = $props();

	function getBackgroundClass(color: string) {
		if (color === 'red') {
			return 'bg-red/10';
		}
		if (color === 'yellow') {
			return 'bg-yellow/10';
		}
		if (color === 'green') {
			return 'bg-green/10';
		}
		return '';
	}

	function getIconClass(color: string) {
		if (color === 'red') {
			return 'bg-red';
		}
		if (color === 'yellow') {
			return 'bg-yellow';
		}
		if (color === 'green') {
			return 'bg-green';
		}
		return '';
	}
</script>

<div
	class="w-full rounded-xl bg-surface-container-high overflow-hidden
           transition-all duration-500 ease-out cursor-pointer
           hover:bg-surface-container-highest hover:shadow-xl hover:-translate-y-1"
>
	<div
		class="w-full flex items-center justify-center aspect-2/1 {getBackgroundClass(expertise.color)}"
	>
		<div class="w-20 h-10 rounded-full {getIconClass(expertise.color)}"></div>
	</div>
	<div class="gap-4 p-5">
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
