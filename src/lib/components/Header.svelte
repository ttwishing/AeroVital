<script lang="ts">
	// SvelteKit imports
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// State variables for the header's behavior
	let isCollapsed: boolean = false;
	let isHeaderFixed: boolean = false;

	// Navigation links data
	const navItems = [
		{ name: 'Solutions', href: '/' },
		{ name: 'Success Stories', href: '/' },
		{ name: 'Technology', href: '/' },
		{ name: 'About us', href: '/' }
	];

	// Scroll handling variables
	let ticking: boolean = false;
	let lastScrollY: number = 0;
	const COLLAPSE_THRESHOLD = 100;

	/**
	 * Handles the scroll event using requestAnimationFrame for performance.
	 * Toggles isHeaderFixed (when scrollY > 0) and isCollapsed (when scrolling down past the threshold).
	 */
	function handleScroll(): void {
		if (!ticking) {
			requestAnimationFrame(() => {
				const scrollY: number = window.scrollY;

				// 1. Determine if the header should be fixed (always true after the initial scroll)
				if (scrollY > 0) {
					isHeaderFixed = true;
				} else {
					// Back at the very top of the page
					isHeaderFixed = false;
				}

				// 2. Determine if the header should collapse (shrink height)
				// Collapse only when scrolling down AND past the threshold
				if (scrollY > lastScrollY && scrollY > COLLAPSE_THRESHOLD) {
					isCollapsed = true;
				}
				// Uncollapse when scrolling up AND back below the threshold
				else if (scrollY < lastScrollY && scrollY < COLLAPSE_THRESHOLD) {
					isCollapsed = false;
				}

				// 3. Force uncollapsed when at the very top (scrollY <= 0)
				if (scrollY <= 0) {
					isCollapsed = false;
				}

				lastScrollY = scrollY;
				ticking = false;
			});
			ticking = true;
		}
	}

	// Lifecycle hooks
	onMount(() => {
		// Only run client-side logic in the browser
		if (browser) {
			const initialScrollY = window.scrollY;

			// Initialize state based on the initial scroll position
			isHeaderFixed = initialScrollY > 0;
			isCollapsed = initialScrollY > COLLAPSE_THRESHOLD;

			// Attach the debounced scroll listener
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		// Clean up the event listener when the component is destroyed
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<header
	id="site-header"
	class="w-full z-1000 transition-all duration-300 font-sans text-on-background"
	class:absolute={!isHeaderFixed}
	class:bg-transparent={!isHeaderFixed}
	class:fixed={isHeaderFixed}
	class:top-0={isHeaderFixed}
	class:bg-surface-container={isHeaderFixed}
	class:shadow-lg={isHeaderFixed}
	style:backdrop-filter={isHeaderFixed ? 'blur(8px)' : 'none'}
	class:h-16={!isHeaderFixed || (isHeaderFixed && !isCollapsed)}
	class:h-12={isHeaderFixed && isCollapsed}
>
	<div class="container mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
		<div class="flex items-center h-full">
			<div class="shrink-0 mr-6">
				<a
					href="/"
					aria-label="AeroVital Logo"
					class="text-headline tracking-tight text-on-surface"
				>
					AeroVital
				</a>
			</div>

			<div class="hidden h-full lg:flex items-center ml-12">
				<nav>
					<ul class="flex space-x-6 xl:space-x-8 h-full">
						{#each navItems as item}
							<li class="flex items-center h-full">
								<a
									href={item.href}
									class="text-base hover:text-primary transition-colors py-1 flex items-center text-on-surface"
								>
									{item.name}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>

		<ul class="flex items-center space-x-4">
			<li>
				<a
					href="/"
					aria-label="Contact us"
					class="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center"
				>
					Contact
				</a>
			</li>
		</ul>
	</div>
</header>
