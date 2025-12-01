<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let isCollapsed: boolean = false;
	let isHeaderFixed: boolean = false;

	const navItems = [
		{ name: 'Solutions', href: '/' },
		{ name: 'Success Stories', href: '/' },
		{ name: 'Technology', href: '/' },
		{ name: 'About us', href: '/' }
	];

	let ticking: boolean = false;
	let lastScrollY: number = 0;
	const COLLAPSE_THRESHOLD = 100;

	function handleScroll(): void {
		if (!ticking) {
			requestAnimationFrame(() => {
				const scrollY: number = window.scrollY;
				if (scrollY > 0) {
					isHeaderFixed = true;
				} else {
					isHeaderFixed = false;
				}

				if (scrollY > lastScrollY && scrollY > COLLAPSE_THRESHOLD) {
					isCollapsed = true;
				} else if (scrollY < lastScrollY && scrollY < COLLAPSE_THRESHOLD) {
					isCollapsed = false;
				}

				if (scrollY <= 0) {
					isCollapsed = false;
				}

				lastScrollY = scrollY;
				ticking = false;
			});
			ticking = true;
		}
	}

	onMount(() => {
		if (browser) {
			const initialScrollY = window.scrollY;

			if (initialScrollY > 0) {
				isHeaderFixed = true;
			} else {
				isHeaderFixed = false;
			}

			if (initialScrollY > COLLAPSE_THRESHOLD) {
				isCollapsed = true;
			} else {
				isCollapsed = false;
			}

			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<nav
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
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
		<div class="flex items-center h-full">
			<div class="shrink-0 mr-6">
				<a href="/" aria-label="AeroVital Logo" class="text-headline tracking-tight text-on-surface"
					>AeroVital</a
				>
			</div>

			<div class="hidden lg:block h-full">
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
			</div>
		</div>
		<ul class="flex items-center space-x-4">
			<li>
				<a
					href="/"
					aria-label="Go to DJI Store"
					class="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center"
				>
					Contact
				</a>
			</li>
		</ul>
	</div>
</nav>
