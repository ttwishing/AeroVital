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
    	{ name: 'Solutions Ecosystem', href: '/#solutions', isInternal: true },
    	{ name: 'Product Specs', href: '/#products', isInternal: true },
    	{ name: 'Data & ROI', href: '/#data', isInternal: true },
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
    
    if (item.isInternal) {
        event.preventDefault(); 
        closeNavbar();

        // 提取 ID：从 "/#solutions" 提取出 "#solutions"
        const anchorId = item.href.includes('#') ? '#' + item.href.split('#')[1] : item.href;
        const currentPath = window.location.pathname;

        if (currentPath === '/') {
            await scrollToTarget(anchorId);
        } else {
            // 如果不在首页，先跳回首页
            await goto('/');
            // 这里的 tick 很重要，等待首页挂载后再滚动
            await tick();
            setTimeout(() => scrollToTarget(anchorId), 100); // 给一点点延迟确保渲染
        }
    } else {
        // 正常页面跳转不需要 preventDefault
        isNavbarOpen = false;
    }
}

	/**
	 * 计算当前活跃锚点：遍历内部锚点，检查滚动位置是否在 section 范围内。
	 */
	function updateActiveSection(scrollY: number): void {
    if (!browser) return;
    let newActive = '';
    
    // 如果在首页，才计算锚点高亮
    if (window.location.pathname === '/') {
        for (const item of navItems) {
            if (!item.isInternal) continue;
            
            // 从 "/#solutions" 提取 "#solutions" 用作选择器
            const selector = '#' + item.href.split('#')[1];
            const targetElement = document.querySelector(selector) as HTMLElement;
            
            if (targetElement) {
                const elementTop = targetElement.offsetTop - HEADER_OFFSET - 50; // 稍微提前一点激活
                const elementBottom = targetElement.offsetTop + targetElement.offsetHeight - HEADER_OFFSET;

                if (scrollY >= elementTop && scrollY < elementBottom) {
                    newActive = item.href; // 匹配为 "/#solutions"
                    break;
                }
            }
        }
    } else {
        // 如果在 about-us 页面，直接激活 About us 项
        const currentPath = window.location.pathname;
        const activeItem = navItems.find(i => i.href === currentPath);
        if (activeItem) newActive = activeItem.href;
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
					<img src="/logo.png" alt="AeroVital" class="h-7 w-auto" />
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
