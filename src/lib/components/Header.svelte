<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// 状态变量
	let isCollapsed: boolean = $state(false);
	let isHeaderFixed: boolean = $state(false);
	let isNavbarOpen = $state(false);
	let currentActive: string = $state(''); 

	// 衍生状态
	let isAboutUs = $derived($page.url.pathname.startsWith('/about-us'));

	// 关键：当 URL 路径变化时，自动更新活跃状态（Svelte 5 语法）
	$effect(() => {
		if (browser) {
			updateActiveSection(window.scrollY);
		}
	});

	let navbarContainer: HTMLElement | null = $state<HTMLElement | null>(null);
	let navbarToggler: HTMLButtonElement | null = $state<HTMLButtonElement | null>(null);

	const navItems = [
		{ name: 'Solutions Ecosystem', href: '/#solutions', isInternal: true },
		{ name: 'Product Specs', href: '/#products', isInternal: true },
		{ name: 'Data & ROI', href: '/#data', isInternal: true },
		{ name: 'About Us', href: '/about-us', isInternal: false }
	];

	let ticking: boolean = false;
	let lastScrollY: number = 0;
	const COLLAPSE_THRESHOLD = 100;
	const HEADER_OFFSET = 40; 

	async function scrollToTarget(cleanHref: string): Promise<void> {
		if (!browser) return;
		if (cleanHref === '#contact-us') {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		} else {
			const targetElement = document.querySelector(cleanHref) as HTMLElement;
			if (targetElement) {
				const targetPosition = targetElement.offsetTop - HEADER_OFFSET;
				window.scrollTo({ top: targetPosition, behavior: 'smooth' });
			}
		}
	}

	async function handleNavClick(event: MouseEvent, item: (typeof navItems)[0]) {
		if (!browser) return;
		if (item.isInternal) {
			event.preventDefault(); 
			isNavbarOpen = false;
			const anchorId = item.href.includes('#') ? '#' + item.href.split('#')[1] : item.href;
			const currentPath = window.location.pathname;
			if (currentPath === '/') {
				await scrollToTarget(anchorId);
			} else {
				await goto('/');
				await tick();
				setTimeout(() => scrollToTarget(anchorId), 100);
			}
		} else {
			isNavbarOpen = false;
			// 非内部链接交给 SvelteKit 正常跳转
		}
	}

	function updateActiveSection(scrollY: number): void {
		if (!browser) return;
		let newActive = '';
		
		// 1. 如果在首页，计算锚点高亮
		if ($page.url.pathname === '/') {
			for (const item of navItems) {
				if (!item.isInternal) continue;
				const parts = item.href.split('#');
				if (parts.length < 2) continue;
				
				const selector = '#' + parts[1];
				const targetElement = document.querySelector(selector) as HTMLElement;
				if (targetElement) {
					const elementTop = targetElement.offsetTop - HEADER_OFFSET - 80;
					const elementBottom = targetElement.offsetTop + targetElement.offsetHeight - HEADER_OFFSET;
					if (scrollY >= elementTop && scrollY < elementBottom) {
						newActive = item.href;
						break;
					}
				}
			}
		} 
		
		// 2. 如果以上没匹配到（在其他页面），检查路径精确匹配
		if (!newActive) {
			const currentPath = $page.url.pathname;
			const activeItem = navItems.find(i => i.href === currentPath || currentPath.startsWith(i.href + '/'));
			if (activeItem) newActive = activeItem.href;
		}

		currentActive = newActive;
	}

	function handleScroll(): void {
		if (!browser) return;
		if (!ticking) {
			requestAnimationFrame(() => {
				const scrollY: number = window.scrollY;
				if (isNavbarOpen) isNavbarOpen = false;
				isHeaderFixed = scrollY > 0;

				if (scrollY > lastScrollY && scrollY > COLLAPSE_THRESHOLD) {
					isCollapsed = true;
				} else if (scrollY < lastScrollY && scrollY < COLLAPSE_THRESHOLD) {
					isCollapsed = false;
				}

				if (scrollY <= 0) isCollapsed = false;
				updateActiveSection(scrollY);
				lastScrollY = scrollY;
				ticking = false;
			});
			ticking = true;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (!browser || !isNavbarOpen) return;
		const target = event.target as Node;
		if (navbarContainer && !navbarContainer.contains(target) && navbarToggler && !navbarToggler.contains(target)) {
			isNavbarOpen = false;
		}
	}

	onMount(() => {
		if (browser) {
			isHeaderFixed = window.scrollY > 0;
			isCollapsed = window.scrollY > COLLAPSE_THRESHOLD;
			updateActiveSection(window.scrollY);
			window.addEventListener('scroll', handleScroll);
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<header
	id="site-header"
	class="w-full z-[1000] transition-all duration-300 font-sans text-on-background"
	class:absolute={!isHeaderFixed && !isAboutUs}
	class:fixed={isHeaderFixed || isAboutUs}
	class:top-0={isHeaderFixed || isAboutUs}
	class:bg-surface-deepest={isHeaderFixed || isAboutUs}
	class:bg-transparent={!isHeaderFixed && !isAboutUs}
	class:shadow-lg={isHeaderFixed || isAboutUs}
	style:backdrop-filter={isHeaderFixed || isAboutUs ? 'blur(8px)' : 'none'}
	class:h-16={!isHeaderFixed || (isHeaderFixed && !isCollapsed) || (isAboutUs && !isCollapsed)}
	class:h-12={isCollapsed && (isHeaderFixed || isAboutUs)}
>
	<div class="container mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
		<div class="flex items-center h-full">
			<div class="shrink-0 mr-6">
				<a
					href="/"
					aria-label="AeroVital Logo"
					class="text-title tracking-tight text-on-surface flex flex-row items-center"
				>
					<img src="/logo.webp" alt="AeroVital" class="h-7 w-75" />
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
								onclick={(e) => handleNavClick(e, item)}
								class="mx-8 flex py-4 text-title text-on-background group-hover:text-primary lg:mx-3 lg:mr-3 lg:inline-flex lg:px-0 lg:py-6 {currentActive ===
								item.href
									? 'text-primary'
									: ''}"
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="flex flex-row items-center gap-4">
			<a
				href="#contact-us"
				onclick={(e) =>
					handleNavClick(e, { name: 'Contact', href: '#contact-us', isInternal: true })}
				class="inline-flex items-center justify-center h-9 grow rounded-lg px-8 text-on-background text-sm font-medium text-nowrap shadow-sm hover:bg-primary/90 active:bg-primary/80 transition-all"
				style="background-image: linear-gradient(to right, #1342FF, #0411A0);"
			>
				Contact
			</a>
			<button
				bind:this={navbarToggler}
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
