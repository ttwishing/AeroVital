<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ComparisonChart from '$lib/components/ComparisonChart.svelte';
	import ExpertiseCard, { type Expertise } from '$lib/components/ExpertiseCard.svelte';
	import ProductCard, { type Product } from '$lib/components/ProductCard.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	export const expertises: Expertise[] = [
		{
			title: 'Smart Agriculture',
			icon: '/images/icon_feature_smart_agriculture.png',
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
			icon: '/images/icon_feature_remote_inspection.png',
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
			icon: '/images/icon_feature_remote_inspection.png',
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
			icon: '/images/icon_feature_forestry_fire.png',
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
			img: '/images/aerovital_u60.png',
			name: 'AeroVital U60',
			descrition:
				'Heavy-Lift Agricultural & Industrial Platform',
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
			img: '/images/aerovital_u40.png',
			name: 'AeroVital U40',
			descrition:
				'Agile Precision Platform',
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
		class="relative h-full w-full pt-28 text-center bg-center bg-no-repeat bg-size-[auto_800px] max-xl:pt-18 max-xl:bg-cover bg-[url('/images/banner.png')] max-md:bg-[url('/images/banner-mobile.png')]
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
		<div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each expertises as expertise}
				<ExpertiseCard {expertise} />
			{/each}
		</div>
	</div>
</section>

<section id="success-stories" class="bg-surface-low">
	<div class="container mx-auto text-center px-6 lg:px-12 py-12">
		<h2 class="text-headline">Case Study Showcase</h2>
		<div class="flex flex-col lg:flex-row border-2 border-outline/30 rounded-2xl mt-6">
			<div
				class="w-full bg-surface-deep lg:w-1/2 p-6 rounded-tl-2xl rounded-tr-2xl rounded-bl-none round-br-none lg:rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-tr-none lg:round-br-none text-left space-y-6"
			>
				<h3 class="text-title">John Lemon Farm: Transforming Orchard Efficiency</h3>
				<p class="text-sm">
					Located in Gruyere, VIC, this 135-acre lemon orchard faced rising labor costs and soil
					compaction issues. AeroVital implemented an automated U60 drone system to replace
					traditional tractors.
				</p>

				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
					<div class="border-l-4 border-green pl-4">
						<p class="text-title lg:text-headline font-semibold text-green">300%</p>
						<p class="text-sm">Efficiency Gain</p>
					</div>
					<div class="border-l-4 border-green pl-4">
						<p class="text-title lg:text-headline font-semibold text-green">~65k</p>
						<p class="text-sm">Initial Investment (AUD)</p>
					</div>
					<div class="border-l-4 border-green pl-4">
						<p class="text-title lg:text-headline font-semibold text-green">4 Hrs</p>
						<p class="text-sm">Full Farm Spray Time</p>
					</div>
					<div class="border-l-4 border-green pl-4">
						<p class="text-title lg:text-headline font-semibold text-green">0</p>
						<p class="text-sm">Soil Compaction</p>
					</div>
				</div>
			</div>
			<div
				class="w-full lg:w-1/2 bg-[#374251] rounded-br-2xl rounded-bl-2xl round-tl-none rounded-tr-none lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:round-br-2xl"
			>
				<ComparisonChart />
			</div>
		</div>
	</div>
</section>

<section id="technology" class="">
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
