<script lang="ts">
	import ComparisonChart from '$lib/components/ComparisonChart.svelte';
	import ExpertiseCard, { type Expertise } from '$lib/components/ExpertiseCard.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import '../app.css';

	export const expertises: Expertise[] = [
		{
			title: 'Smart Agriculture',
			subtitle:
				'Automated spraying, seeding, and crop health monitoring. Reduce chemical usage and soil compaction using AI-driven drone technology.',
			features: [
				'Orchards & Vineyards Management',
				'High-Precision RTK Navigation',
				'Integrated Crop Health Analysis'
			]
		},
		{
			title: 'Remote Inspection',
			subtitle:
				'Highway maintenance checks, powerline monitoring, and asset digitization in remote areas.',
			features: [
				'Powerline Safety',
				'Optimized Route Planning',
				'Real-Time Site Mapping',
				'Last-Mile Delivery Solutions'
			]
		},
		{
			title: 'Environmental Monitoring',
			subtitle:
				'Conducting high-resolution surveys for pollution detection, wildlife tracking, and infrastructure integrity assessment in remote or hazardous areas.',
			features: [
				'Air & Water Quality Sampling',
				'Thermal Imaging for Leak Detection',
				'Wildlife Population Census',
				'Coastal Erosion Analysis'
			]
		}
	];
</script>

<section class="h-[760px] w-full z-800 relative">
	<div
		style="background-image: url('/images/banner_bg.jpg');"
		class="banner-content theme-light swiper-lazy swiper-lazy-loaded relative h-full w-full pt-28 text-center text-white bg-center bg-no-repeat bg-[length:auto_800px] bg-gray-100 max-xl:pt-18 max-xl:bg-cover"
	></div>
</section>

<section class="">
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

<section class="h-[640px] bg-white/3">
	<ComparisonChart />
</section>

<section class="h-[640px]">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12 lg:py-24">
		<h2 class="text-headline mt-6">Core Technology Platforms</h2>
		<p class="mt-3">Robust, IP67-rated aerial systems designed for high-intensity work.</p>
		<div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
			<ProductCard />
			<ProductCard />
		</div>
	</div>
</section>

<section class="h-[640px] bg-white/3"></section>
