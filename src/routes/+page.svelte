<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ComparisonChartEfficiency from '$lib/components/ComparisonChartEfficiency.svelte';
	import ComparisonChartTime from '$lib/components/ComparisonChartTime.svelte';
	import ExpertiseCard, { type Expertise } from '$lib/components/ExpertiseCard.svelte';
	import ProductCard, { type Product } from '$lib/components/ProductCard.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	export const expertises: Expertise[] = [
		{
			title: 'Smart Agriculture',
			icon: '/images/icon_feature_smart_agriculture.webp',
			subtitle:
				'The core of our current offering. Leveraging the U60\'s heavy-lift capability for broadacre and orchard applications.',
			features: {
				"Precision Spraying":"50-500μm centrifugal atomization for perfect coverage.",
				"Orchard Management":"High-penetration airflow systems for dense canopies (e.g., Lemon/Citrus farms).",
				"Multispectral Analysis":"Integration with mapping drones for targeted fertilizer application."
			},
			keyCapability:'High-Efficiency Spraying',
		},
		{
			title: 'Remote Inspection',
			icon: '/images/icon_feature_remote_inspection.webp',
			subtitle:
				'High-resolution asset digitization and monitoring. Keeping personnel safe while gathering critical data.',
			features: {
				"Infrastructure":"Power line and solar farm inspection using high-zoom optics.",
				"Asset Integrity":"Thermal imaging to detect overheating components or structural fatigue.",
				"Data Integration":"Automated report generation for maintenance teams."
			},
			keyCapability:'Safety & Precision',
		},
		{
			title: 'Forestry & Environment',
			icon: '/images/icon_feature_forestry_environment.webp',
			subtitle:
				'Scalable solutions for large-scale environmental management and rehabilitation.',
			features: {
				'Seed Spreading':'Heavy-lift spreading for reforestation projects in difficult terrain.',
				'Canopy Analysis':'LiDAR and multispectral monitoring of forest health.',
				'Invasive Species Control':'Targeted spraying for weed management in sensitive ecosystems.',

			},
			keyCapability:'Large Scale Rehabilitation'
		},
		{
			title: 'Forestry & Fire',
			icon: '/images/icon_feature_forestry_fire.webp',
			subtitle:
				'Rapid response capabilities for emergency services and private land protection.',
			features: {
				'Situational Awareness':'Real-time thermal feeds for hotspot detection.',
				'Payload Delivery':'Transporting emergency supplies or fire retardants to inaccessible areas.',
				'Post-Fire Assessment':'Quick mapping of damage to plan recovery efforts.',

			},
			keyCapability:'Rapid Response'
		}
	];

	export const products: Product[] = [
		{
			img: '/images/aerovital_u60.webp',
			name: 'AeroVital U60',
			descrition:
				'Heavy-Lift Agricultural & Industrial Platform',
			main:{
				'Max Payload':'60 KG',
				'Radar':'Millimeter Wave',
			},
			params: {
				'Spray Tank Capacity': '55 Liters',
				'Spread Tank Capacity': '80 Liters',
				'Max Efficiency': '20 Hectares / Hour',
				'Spray Width': '8 - 12 Meters',
				'Nozzle Type': 'Centrifugal (50-500μm)',
				'Battery Life': '1000 Cycles Warranty'
			}
		},
		{
			img: '/images/aerovital_u40.webp',
			name: 'AeroVital U40',
			descrition:
				'Agile Precision Platform',
					main:{
				'Max Payload':'40 KG',
				'Radar':'Millimeter Wave',
			},
			params: {
				'Spray Tank Capacity': '35 Liters',
				'Spread Tank Capacity': '50 Liters',
				'Max Efficiency': '12 Hectares / Hour',
				'Spray Width': '6 - 10 Meters',
				'Nozzle Type': 'Centrifugal (50-500μm)',
				'Battery Life': '1000 Cycles Warranty',
			}
		}
	];
</script>
<section class="h-[520px] w-full z-800 relative">
	<div
		class="relative h-full w-full pt-28 text-center bg-center bg-no-repeat bg-size-[auto_800px] max-xl:pt-18 max-xl:bg-cover bg-[url('/images/banner.webp')] max-md:bg-[url('/images/banner-mobile.webp')]
	"
	>
		<div
			class="absolute inset-0 hidden max-md:block pointer-events-none max-md:bg-linear-to-b max-md:from-black/40 max-md:to-black/60"
		></div>
		<div
			class="relative container z-100 px-6 lg:px-12 mx-auto flex flex-col items-start justify-center h-full gap-6"
		>
			<h1 class="text-headline lg:text-4xl font-bold">
				Intelligent Solutions for <br /><span class="mt-1 block">The Australian Horizon</span>
			</h1>
			<p class="text-on-background text-left">
				We provide complete aerial automation ecosystems for agriculture, infrastructure <br />
				inspection, and emergency response. Rooted in Queensland, serving the nation.
			</p>
			<div>
				<Button variant="gradient" href="#solutions">
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
	<div class="container mx-auto text-center px-6 lg:px-12 py-12">
		<span class="text-base text-primary font-bold">Our Expertise</span>
		<h2 class="text-headline mt-6">Beyond Agriculture</h2>
		<p class="mt-3">
			AeroVital applies its sovereign capabilities across multiple critical sectors.
		</p>
		<div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
			{#each expertises as expertise, index}
				<ExpertiseCard {expertise} {index} />
			{/each}
		</div>
	</div>
</section>

<section id="products" class="bg-surface-low">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12">
		<h2 class="text-headline mt-6">Core Technology Platforms</h2>
		<p class="mt-3">Robust, IP67-rated aerial systems designed for high-intensity work.</p>
		<div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>

<section id="data" class="">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12">
		<h2 class="text-headline">The Business Case</h2>
		<p class="mt-3">John Lemon Farm: Transforming Orchard Efficiency</p>

		<div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="bg-[#374251] rounded-xl">
				<ComparisonChartTime />
			</div>

			<div class="bg-[#374251] rounded-xl">
				<ComparisonChartEfficiency />
			</div>
		</div>

		<ul class="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
			<li class="flex flex-col bg-blue/8 rounded-lg text-blue py-2 gap-1 border-blue/10 border">
				<span class="text-headline font-bold">~60kg</span>
				<span>Max Payload</span>
			</li>
			<li class="flex flex-col bg-green/8 rounded-lg text-green py-2 gap-1 border-green/10 border">
				<span class="text-headline font-bold">4 Hrs</span>
				<span>Total Farm Coverage</span>
			</li>
			<li
				class="flex flex-col bg-purple/8 rounded-lg text-purple py-2 gap-1 border-purple/10 border"
			>
				<span class="text-headline font-bold">IP67</span>
				<span>Protection Level</span>
			</li>
			<li
				class="flex flex-col bg-orange/8 rounded-lg text-orange py-2 gap-1 border-orange/10 border"
			>
				<span class="text-headline font-bold">-60%</span>
				<span>Labor Reduction</span>
			</li>
		</ul>
	</div>
</section>
