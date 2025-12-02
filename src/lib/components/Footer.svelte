<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let currentYear = 2025;

	onMount(() => {
		currentYear = new Date().getFullYear();
	});
</script>

<footer class="relative overflow-hidden">
	<div class="container mx-auto px-6 lg:px-12">
		<div class="relative z-10 py-8 lg:py-12">
			<div class="container mx-auto">
				<div class="flex flex-col lg:flex-row gap-12">
					<div class="w-full lg:flex-1 mb-6">
						<h2 class="text-title mb-6">About AeroVital Solutions</h2>
						<p class="mb-3 text-sm">
							AeroVital Solutions Pty Ltd (ACN 651 431 748) is an Australian proprietary company
							dedicated to bringing advanced aerial automation to the local market.
						</p>
						<p class="text-sm">
							Headquartered in Newstead, Queensland, we bridge the gap between global manufacturing
							excellence and local Australian needs. Our mission is to empower farmers and
							infrastructure managers with turnkey solutions.
						</p>
					</div>
					<div
						class="w-full lg:flex-1 bg-surface-container-low border border-outline/30 rounded-2xl p-3 lg:p-6"
					>
						<h2>Contact Us</h2>
					</div>
				</div>
			</div>
		</div>
		<div class="border-t border-outline/50">
			<div class="container relative z-10 px-5 mx-auto sm:px-7">
				<div class="py-5 text-center">
					<p class="text-sm">
						© {currentYear} AeroVital Solutions Pty Ltd. All Rights Reserved.
					</p>
				</div>
			</div>
		</div>
	</div>
</footer>
