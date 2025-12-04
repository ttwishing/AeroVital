<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ComparisonChart from '$lib/components/ComparisonChart.svelte';
	import ExpertiseCard, { type Expertise } from '$lib/components/ExpertiseCard.svelte';
	import ProductCard, { type Product } from '$lib/components/ProductCard.svelte';
	import '../app.css';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	export const expertises: Expertise[] = [
		{
			title: 'Smart Agriculture',
			color: 'red',
			subtitle:
				'Automated spraying, seeding, and crop health monitoring. Reduce chemical usage and soil compaction using AI-driven drone technology.',
			features: ['Orchards & Vineyards', 'High-Precision RTK']
		},
		{
			title: 'Remote Inspection',
			color: 'yellow',
			subtitle:
				'Highway maintenance checks, powerline monitoring, and asset digitization in remote areas.',
			features: ['Powerline Safety', 'Road Asset Management']
		},
		{
			title: 'Forestry & Fire',
			color: 'green',
			subtitle:
				'Rapid response surveillance, fire break planning, and post-disaster assessment for bushfire prone regions.',
			features: ['Thermal Imaging', 'Rapid Deployment']
		}
	];

	export const products: Product[] = [
		{
			img: '/images/aerovital_u60.png',
			name: 'AeroVital U60',
			descrition:
				'Designed for large-scale orchards and broadacre farming. Features terrain following radar and obstacle avoidance.',
			params: {
				'Tank Capacity': '55 Liters',
				'Spray Width': '8 - 12 Meters',
				'Max Takeoff Weight': '106 KG',
				Radar: 'IP67 Water/Dust'
			}
		},
		{
			img: '/images/aerovital_u40.png',
			name: 'AeroVital U40',
			descrition:
				'Perfect for smaller plots, spot spraying, and complex terrain where agility is paramount.',
			params: {
				'Tank Capacity': '35 Liters',
				'Spray Width': '6 - 10 Meters',
				'Max Takeoff Weight': '72 KG',
				Radar: 'Included'
			}
		}
	];
</script>

<section class="h-[520px] w-full z-800 relative">
	<div
		style="background-image: url('/images/banner.png');"
		class="banner-content theme-light swiper-lazy swiper-lazy-loaded relative h-full w-full pt-28 text-center text-white bg-center bg-no-repeat bg-size-[auto_800px] bg-gray-100 max-xl:pt-18 max-xl:bg-cover"
	>
		<div
			class="container px-6 lg:px-12 mx-auto flex flex-col items-start justify-center h-full gap-6"
		>
			<h1 class="text-4xl font-bold">
				Intelligent Solutions for<br /><span class="mt-1 block">The Australian Horizon</span>
			</h1>
			<p class="text-on-background">
				We provide complete aerial automation ecosystems for agriculture, infrastructure <br />
				inspection, and emergency response. Rooted in Queensland, serving the nation.
			</p>
			<div>
				<Button variant="primary">
					<div class="flex flex-row items-center gap-1">
						<div>Explore Solutions</div>
						<ArrowRight class="size-5" />
					</div>
				</Button>
			</div>
		</div>
	</div>
</section>

<section id="solutions">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12 lg:py-24">
		<span class="text-base text-primary font-bold">Our Expertise</span>
		<h2 class="text-title mt-6">Specialized Industry Applications</h2>
		<p class="mt-3">
			We don't just sell hardware; we deliver operational workflows tailored to rugged Australian
			environments.
		</p>
		<div class="mt-6 flex flex-col lg:flex-row gap-6 justify-between">
			{#each expertises as expertise}
				<ExpertiseCard {expertise} />
			{/each}
		</div>
	</div>
</section>

<section id="success-stories" class="bg-surface-low">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12 lg:py-24">
		<div class="flex flex-col lg:flex-row shadow-2xl">
			<div
				class="w-full lg:w-1/2 bg-surface-container-high p-6 rounded-tl-2xl rounded-tr-2xl rounded-bl-none round-br-none lg:rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-tr-none lg:round-br-none text-left space-y-6"
			>
				<h2 class="bg-green p-2 rounded-2xl inline-block">Case Study Showcase</h2>
				<div class="text-title">John Lemon Farm: Transforming Orchard Efficiency</div>
				<p class="text-sm">
					Located in Gruyere, VIC, this 135-acre lemon orchard faced rising labor costs and soil
					compaction issues. AeroVital implemented an automated U60 drone system to replace
					traditional tractors.
				</p>

				<div class="grid grid-cols-2 gap-6">
					<div class="border-l-4 border-green pl-4">
						<p class="text-headline font-bold text-green">300%</p>
						<p class="text-sm">Efficiency Gain</p>
					</div>
					<div class="border-l-4 border-green pl-4">
						<p class="text-headline font-bold text-green">~65k</p>
						<p class="text-sm" data-translate="case_stat2">Initial Investment (AUD)</p>
					</div>
					<div class="border-l-4 border-green pl-4">
						<p class="text-headline font-bold text-green">4 Hrs</p>
						<p class="text-sm" data-translate="case_stat3">Full Farm Spray Time</p>
					</div>
					<div class="border-l-4 border-green pl-4">
						<p class="text-headline font-bold text-green">0</p>
						<p class="text-sm" data-translate="case_stat4">Soil Compaction</p>
					</div>
				</div>
			</div>
			<div
				class="w-full lg:w-1/2 bg-surface-container-highest rounded-br-2xl rounded-bl-2xl round-tl-none rounded-tr-none lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:round-br-2xl"
			>
				<ComparisonChart />
			</div>
		</div>
	</div>
</section>

<section id="technology" class="">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12 lg:py-24">
		<h2 class="text-headline mt-6">Core Technology Platforms</h2>
		<p class="mt-3">Robust, IP67-rated aerial systems designed for high-intensity work.</p>
		<div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>
