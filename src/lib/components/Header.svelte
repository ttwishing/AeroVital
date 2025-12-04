<script lang="ts">
	// SvelteKit imports
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Button from './Button.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	// State variables for the header's behavior
	let isCollapsed: boolean = $state(false);
	let isHeaderFixed: boolean = $state(false);

	// Navigation State
	let isNavbarOpen = $state(false);

	// DOM element references for click outside logic
	let navbarContainer: HTMLElement | null = $state<HTMLElement | null>(null);
	let navbarToggler: HTMLButtonElement | null = $state<HTMLButtonElement | null>(null);

	// Navigation links data
	const navItems = [
		{ name: 'Solutions', href: '#solutions' },
		{ name: 'Success Stories', href: '#success-stories' },
		{ name: 'Technology', href: '#technology' },
		{ name: 'About us', href: '/about-us' }
	];

	// Scroll handling variables
	let ticking: boolean = false;
	let lastScrollY: number = 0;
	const COLLAPSE_THRESHOLD = 100;

	/**
	 * Handles the scroll event using requestAnimationFrame for performance.
	 * Toggles isHeaderFixed, isCollapsed, and closes the mobile navbar.
	 */
	function handleScroll(): void {
		if (!ticking) {
			requestAnimationFrame(() => {
				const scrollY: number = window.scrollY;

				// 1. 自动关闭导航栏：任何滑动行为都会关闭打开的移动导航栏
				if (isNavbarOpen) {
					isNavbarOpen = false;
				}

				// 2. Determine if the header should be fixed (always true after the initial scroll)
				isHeaderFixed = scrollY > 0;

				// 3. Determine if the header should collapse (shrink height)
				// Collapse only when scrolling down AND past the threshold
				if (scrollY > lastScrollY && scrollY > COLLAPSE_THRESHOLD) {
					isCollapsed = true;
				}
				// Uncollapse when scrolling up AND back below the threshold
				else if (scrollY < lastScrollY && scrollY < COLLAPSE_THRESHOLD) {
					isCollapsed = false;
				}

				// 4. Force uncollapsed when at the very top (scrollY <= 0)
				if (scrollY <= 0) {
					isCollapsed = false;
				}

				lastScrollY = scrollY;
				ticking = false;
			});
			ticking = true;
		}
	}

	/**
	 * Handles document clicks to close the navbar if the click is outside
	 * the navigation container or the toggler button.
	 */
	function handleClickOutside(event: MouseEvent) {
		if (!isNavbarOpen) {
			return;
		}

		const target = event.target as Node;

		// Check if the click is outside the nav container AND outside the toggler button
		if (
			navbarContainer &&
			!navbarContainer.contains(target) &&
			navbarToggler &&
			!navbarToggler.contains(target)
		) {
			isNavbarOpen = false;
		}
	}

	/**
	 * Closes the navbar when a link inside it is clicked.
	 */
	function closeNavbar() {
		if (isNavbarOpen) {
			isNavbarOpen = false;
		}
	}

	// Lifecycle hooks
	onMount(() => {
		if (browser) {
			const initialScrollY = window.scrollY;

			// Initialize state based on the initial scroll position
			isHeaderFixed = initialScrollY > 0;
			isCollapsed = initialScrollY > COLLAPSE_THRESHOLD;

			// Attach scroll listener
			window.addEventListener('scroll', handleScroll);

			// Attach global click listener for click-outside
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (browser) {
			// Clean up listeners
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
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
					class="text-title tracking-tight text-on-surface flex flex-row items-center"
				>
					<img src="/logo.png" alt="AeroVital" class="h-9 w-auto"/>
					AeroVital
				</a>
			</div>

			<div class="shrink-0 mr-6">
				<a
					href="/"
					aria-label="AeroVital Logo"
					class="text-title tracking-tight text-on-surface flex flex-row items-center"
				>
					<img src="/logo_full.png" alt="AeroVital" class="h-7 w-auto"/>
				</a>
			</div>

			<nav
				bind:this={navbarContainer}
				id="navbarCollapse"
				class="absolute top-full right-4 w-full max-w-[270px] rounded-lg bg-black/80 py-5 shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none xl:px-6 {isNavbarOpen
					? 'block'
					: 'hidden'}"
			>
				<ul class="block lg:flex 2xl:ml-10">
					{#each navItems as item (item.name)}
						<li class="group relative">
							<a
								href={item.href}
								onclick={closeNavbar}
								class="mx-8 flex py-4 text-title text-on-background group-hover:text-primary lg:mx-3 lg:mr-3 lg:inline-flex lg:px-0 lg:py-6"
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="flex flex-row items-center gap-4">
			<ThemeSwitcher />
			<Button variant="primary" className="h-9">Contact</Button>

			<button
				id="navbarToggler"
				aria-label="Toggle Navigation"
				onclick={() => (isNavbarOpen = !isNavbarOpen)}
				class="rounded-lg px-3 py-1.5 ring-primary focus:ring-2 lg:hidden {isNavbarOpen
					? 'navbarTogglerActive'
					: ''}"
			>
				<span class="relative my-1.5 block h-0.5 w-[30px] bg-white"></span>
				<span class="relative my-1.5 block h-0.5 w-[30px] bg-white"></span>
				<span class="relative my-1.5 block h-0.5 w-[30px] bg-white"></span>
			</button>
		</div>
	</div>
</header>
