<script lang="ts">
	// SvelteKit imports
	import { onMount, onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	// State variables for the header's behavior
	let isCollapsed: boolean = $state(false);
	let isHeaderFixed: boolean = $state(false);

	// Navigation State
	let isNavbarOpen = $state(false);
	let currentActive: string = $state(''); // 当前活跃锚点 (e.g., '#solutions')

	// DOM element references for click outside logic
	let navbarContainer: HTMLElement | null = $state<HTMLElement | null>(null);
	let navbarToggler: HTMLButtonElement | null = $state<HTMLButtonElement | null>(null);

	// Navigation links data - 统一语义：内部用 #xx，外部用 /xx，标记 isInternal
	const navItems = [
		{ name: 'Solutions', href: '#solutions', isInternal: true },
		{ name: 'Success Stories', href: '#success-stories', isInternal: true },
		{ name: 'Technology', href: '#technology', isInternal: true },
		{ name: 'About us', href: '/about-us', isInternal: false }
	];

	// Scroll handling variables
	let ticking: boolean = false;
	let lastScrollY: number = 0;
	const COLLAPSE_THRESHOLD = 100;
	const HEADER_OFFSET = 40; // header 高度偏移，用于 active 计算 (调整根据你的 h-16/h-12)

	/**
	 * 滚动到目标位置（内部方法）
	 * @param cleanHref - 清理后的锚点 (e.g., '#solutions')
	 */
	async function scrollToTarget(cleanHref: string): Promise<void> {
		if (!browser) return;
		if (cleanHref === '#contact-us') {
			window.scrollTo({
				top: document.body.scrollHeight, // 直滚底
				behavior: 'smooth'
			});
		} else {
			const targetElement = document.querySelector(cleanHref) as HTMLElement;
			if (targetElement) {
				const targetPosition = targetElement.offsetTop - HEADER_OFFSET;
				window.scrollTo({ top: targetPosition, behavior: 'smooth' });
			}
		}
	}

	/**
	 * 处理导航点击 - 手动滚动 + 关闭菜单（不更新URL，避免带#xx）
	 * @param event - 点击事件
	 * @param item - 导航项
	 */
	async function handleNavClick(event: MouseEvent, item: (typeof navItems)[0]) {
		if (!browser) return;
		event.preventDefault(); // 阻止默认锚点跳转
		closeNavbar(); // 关闭移动导航

		if (item.isInternal) {
			// 内部锚点链接（主页 sections）
			const cleanHref = item.href; // 已 #xx
			const currentPath = window.location.pathname;

			if (currentPath === '/') {
				// 已在主页：手动滚动，不更新 URL hash
				await scrollToTarget(cleanHref);
			} else {
				// 非主页：导航到主页（无 hash）+ 手动滚动
				await goto('/');
				await tick(); // 确保 DOM 渲染完成
				await scrollToTarget(cleanHref);
			}
		} else {
			// 页面链接（如 /about-us）：使用 goto 导航
			goto(item.href);
		}
	}

	/**
	 * 计算当前活跃锚点：遍历内部锚点，检查滚动位置是否在 section 范围内。
	 */
	function updateActiveSection(scrollY: number): void {
		if (!browser) return;
		let newActive = '';
		for (const item of navItems) {
			if (!item.isInternal) continue; // 只处理内部锚点

			const selector = item.href; // 已 #xx
			const targetElement = document.querySelector(selector) as HTMLElement;
			if (!targetElement) continue;

			const elementTop = targetElement.offsetTop - HEADER_OFFSET;
			const elementBottom = targetElement.offsetTop + targetElement.offsetHeight - HEADER_OFFSET;

			if (scrollY >= elementTop && scrollY < elementBottom) {
				newActive = item.href; // 保持原 href 格式 '#solutions' 用于匹配
				break; // 只匹配第一个
			}
		}

		// 如果没有匹配到主页 section，且当前在 about-us 页面，激活 'About us'
		if (newActive === '' && window.location.pathname === '/about-us') {
			const aboutItem = navItems.find((i) => i.name === 'About us');
			newActive = aboutItem?.href || '';
		}

		currentActive = newActive;
	}

	/**
	 * Handles the scroll event using requestAnimationFrame for performance.
	 * Toggles isHeaderFixed, isCollapsed, closes mobile navbar, and updates active section.
	 */
	function handleScroll(): void {
		if (!browser) return;
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

				// 5. 更新活跃 section
				updateActiveSection(scrollY);

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
		if (!browser || !isNavbarOpen) {
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

			// 初始计算活跃 section
			updateActiveSection(initialScrollY);

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
	class:bg-surface-deepest={isHeaderFixed}
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
					<img src="/logo_full.png" alt="AeroVital" class="h-7 w-auto" />
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
								class="mx-8 flex py-4 text-title text-on-background group-hover:text-primary lg:mx-3
								lg:mr-3 lg:inline-flex lg:px-0 lg:py-6 {item.href === currentActive ? 'text-primary' : ''}"
								class:active={item.href === currentActive}
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="flex flex-row items-center gap-4">
			<!-- <ThemeSwitcher /> -->
			<a
				href="#contact-us"
				onclick={(e) =>
					handleNavClick(e, { name: 'Contact', href: '#contact-us', isInternal: true })}
				class="inline-flex items-center justify-center h-9 grow rounded-lg px-8 text-on-background text-sm font-medium text-nowrap shadow-sm hover:bg-primary/90 active:bg-primary/80 focus:outline-transparent focus-visible:outline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-solar-500 focus-visible:ring-offset-2 disabled:bg-surface-container-highest disabled:text-on-surface disabled:cursor-not-allowed disabled:opacity-30 transition-all"
				style="background-image: linear-gradient(to right, #1342FF, #0411A0);"
			>
				Contact
			</a>
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
