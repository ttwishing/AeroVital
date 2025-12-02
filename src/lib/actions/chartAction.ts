import type { Action } from 'svelte/action';
import { Chart, type ChartConfiguration } from 'chart.js';

/**
 * Svelte Action for initializing and managing a Chart.js instance on a <canvas> element.
 * * @param node - The HTMLCanvasElement to attach the chart to.
 * @param config - The initial ChartConfiguration object.
 */
export const chartAction: Action<HTMLCanvasElement, ChartConfiguration> = (node, config) => {
	// 确保传递了配置，并创建图表实例
	if (!config || !config.type) {
		console.error('Chart.js configuration is missing type or data.');
		return {};
	}

	// 创建新的 Chart 实例
	const chart = new Chart(node, config);

	return {
		// 当 Svelte 的响应式数据发生变化时，更新图表配置
		update(newConfig) {
			if (chart) {
				// 修复：使用 ?? {} 确保类型不为 undefined，消除 TypeScript 错误
				chart.data = newConfig.data ?? {};
				chart.options = newConfig.options ?? {};
				chart.update(); // 平滑更新图表
			}
		},
		// 组件销毁时，销毁 Chart 实例以释放内存
		destroy() {
			if (chart) {
				chart.destroy();
			}
		}
	};
};
