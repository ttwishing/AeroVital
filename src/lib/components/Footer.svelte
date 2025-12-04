<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import UserRound from '@lucide/svelte/icons/user-round';
	import Wrench from '@lucide/svelte/icons/wrench';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Mail from '@lucide/svelte/icons/mail';
	import Phone from '@lucide/svelte/icons/phone';
	import Button from './Button.svelte';

	let currentYear = 2025;

	onMount(() => {
		currentYear = new Date().getFullYear();
	});
</script>

<footer class="relative overflow-hidden bg-surface-low">
	<div class="container mx-auto px-6 lg:px-12">
		<div class="relative z-10 py-12">
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

						<div class="mt-8">
							<h3 class="text-lg font-bold mb-4">Leadership &amp; Support</h3>
							<div class="flex items-start gap-4 mb-4">
								<div class="p-3 rounded bg-black/10">
									<UserRound class="size-4 text-success" />
								</div>
								<div>
									<p class="font-bold text-on-background">Yin Zhao &amp; Yongmin Wang</p>
									<p class="text-sm">Directors</p>
									<p class="text-xs mt-1">Strategic Direction &amp; Operations</p>
								</div>
							</div>
							<div class="flex items-start gap-4">
								<div class="bg-black/10 p-3 rounded">
									<Wrench class="text-success size-4" />
								</div>
								<div>
									<p class="font-bold text-on-background">Technical Support Team</p>
									<p class="text-sm">Brisbane Based</p>
									<p class="text-xs mt-1">Maintenance, Training, and Parts Supply</p>
								</div>
							</div>
						</div>
					</div>
					<div
						id="contact-us"
						class="w-full lg:flex-1 bg-surface-deep border border-outline/30 rounded-2xl p-3 lg:p-6"
					>
						<h2 class="text-title mb-6">Contact Us</h2>
						<div class="space-y-6">
							<div class="flex items-start">
								<MapPin class="mt-1 mr-4 text-success size-4" />
								<div>
									<p class="text-sm uppercase tracking-wider">Head Office</p>
									<p class="text-on-background">
										Level 1, 50 Commercial Road<br />Newstead, QLD 4006
									</p>
								</div>
							</div>
							<div class="flex items-start">
								<Mail class="mt-1 mr-4 text-success size-4" />
								<div>
									<p class="text-sm text-gray-400 uppercase tracking-wider">Email</p>
									<p class="text-on-background">info@aerovital.com.au</p>
								</div>
							</div>
							<div class="flex items-start">
								<Phone class="mt-1 mr-4 text-success size-4" />
								<div>
									<p class="text-sm uppercase tracking-wider">Support</p>
									<p class="text-on-background">1300 AERO VITAL</p>
								</div>
							</div>
						</div>
						<div class="border-t border-outline/50 mt-6"></div>
						<div class=" mt-6">
							<Button variant="primary" class="w-full">Request a Consultation</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="border-t border-outline/30">
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
