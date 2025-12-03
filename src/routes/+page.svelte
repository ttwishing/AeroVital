<script lang="ts">
	import ComparisonChart from '$lib/components/ComparisonChart.svelte';
	import ExpertiseCard, { type Expertise } from '$lib/components/ExpertiseCard.svelte';
	import ProductCard, { type Product } from '$lib/components/ProductCard.svelte';
	import '../app.css';

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
			img: '/images/aerovital_u60.jpg',
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
			img: '/images/aerovital_u40.jpg',
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

<section class="h-[760px] w-full z-800 relative">
	<div
		style="background-image: url('/images/banner_bg.jpg');"
		class="banner-content theme-light swiper-lazy swiper-lazy-loaded relative h-full w-full pt-28 text-center text-white bg-center bg-no-repeat bg-[length:auto_800px] bg-gray-100 max-xl:pt-18 max-xl:bg-cover"
	></div>
</section>

<section id="solutions" class="bg-surface-container-low">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12 lg:py-24">
		<span class="text-base text-primary">Our Expertise</span>
		<h2 class="text-headline mt-6">Specialized Industry Applications</h2>
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

<section id="success-stories" class="">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12 lg:py-24">
		<div class="flex flex-col lg:flex-row shadow-2xl">
			<div
				class="w-full lg:w-1/2 bg-surface-container-highest p-6 rounded-tl-2xl rounded-tr-2xl rounded-bl-none round-br-none lg:rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-tr-none lg:round-br-none text-left space-y-6"
			>
				<div class="bg-success-container p-2 rounded-2xl inline-block">Case Study Showcase</div>
				<h2 class=" text-headline">John Lemon Farm: Transforming Orchard Efficiency</h2>
				<p>
					Located in Gruyere, VIC, this 135-acre lemon orchard faced rising labor costs and soil
					compaction issues. AeroVital implemented an automated U60 drone system to replace
					traditional tractors.
				</p>

				<div class="grid grid-cols-2 gap-6">
					<div class="border-l-4 border-success pl-4">
						<p class="text-headline font-bold text-success">300%</p>
						<p class="text-sm">Efficiency Gain</p>
					</div>
					<div class="border-l-4 border-success pl-4">
						<p class="text-headline font-bold text-success">~65k</p>
						<p class="text-sm text-gray-400" data-translate="case_stat2">
							Initial Investment (AUD)
						</p>
					</div>
					<div class="border-l-4 border-success pl-4">
						<p class="text-headline font-bold text-success">4 Hrs</p>
						<p class="text-sm text-gray-400" data-translate="case_stat3">Full Farm Spray Time</p>
					</div>
					<div class="border-l-4 border-success pl-4">
						<p class="text-headline font-bold text-success">0</p>
						<p class="text-sm text-gray-400" data-translate="case_stat4">Soil Compaction</p>
					</div>
				</div>
			</div>
			<div class="w-full lg:w-1/2 bg-surface-container rounded-br-2xl rounded-bl-2xl round-tl-none rounded-tr-none lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:round-br-2xl">
				<ComparisonChart />
			</div>
		</div>
	</div>
</section>

<section id="technology" class="bg-surface-container-low">
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
