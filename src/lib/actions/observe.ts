import type { Action } from 'svelte/action';

// 接口现在接受单个字符串或字符串数组
interface ObserveOptions {
	classToApply: string | string[];
	classToRemove?: string | string[];
	rootMargin?: string;
	once?: boolean;
	// 🚀 确保 callback 属性存在于接口中
	callback?: (isVisible: boolean) => void;
}

// 辅助函数：处理单个或多个类名的添加/移除
function handleClasses(node: HTMLElement, classList: string | string[], action: 'add' | 'remove') {
	// 确保 classList 是一个数组，如果它是字符串，则按空格拆分
	const classes = Array.isArray(classList)
		? classList
		: classList.split(' ').filter((c) => c.length > 0);

	classes.forEach((className) => {
		if (action === 'add') {
			node.classList.add(className);
		} else {
			node.classList.remove(className);
		}
	});
}

const defaultOptions: ObserveOptions = {
	classToApply: 'is-visible',
	classToRemove: '',
	rootMargin: '0px 0px -10% 0px',
	once: true
};

/**
 * Svelte Action using Intersection Observer to apply a class when an element enters the viewport.
 * Usage: use:observe={{ classToApply: 'opacity-100 translate-y-0', callback: handleVisibility }}
 */
export const observe: Action<HTMLElement, ObserveOptions> = (node, options) => {
	const finalOptions = { ...defaultOptions, ...options };

	// 检查浏览器支持
	if (!('IntersectionObserver' in window)) {
		handleClasses(node, finalOptions.classToApply, 'add');
		// 如果不支持，立即执行回调
		if (finalOptions.callback) finalOptions.callback(true);
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const isVisible = entry.isIntersecting;

				// 1. 🚀 修复的关键：执行回调（通知 Svelte 状态变化）
				if (finalOptions.callback) {
					finalOptions.callback(isVisible);
				}

				// 2. 处理 CSS 类名
				if (isVisible) {
					if (finalOptions.classToRemove) {
						handleClasses(node, finalOptions.classToRemove, 'remove');
					}

					// 元素进入视口，调用辅助函数添加类
					handleClasses(node, finalOptions.classToApply, 'add');

					if (finalOptions.once) {
						// 只触发一次后停止观察
						observer.unobserve(node);
					}
				} else if (!finalOptions.once) {
					// 如果允许重复触发，元素离开视口时移除类
					handleClasses(node, finalOptions.classToApply, 'remove');
				}
			});
		},
		{
			rootMargin: finalOptions.rootMargin
		}
	);

	observer.observe(node);

	return {
		update(_newOptions) {
			// 保持 update 存在，但忽略参数以避免 TS 警告
		},
		destroy() {
			// 清理 observer
			observer.unobserve(node);
		}
	};
};
