<script lang="ts">
	// 导入两个独立的 Action 文件
	import { chartAction } from '../actions/chartAction';
	import { observe } from '../actions/observe';

	import {
		Chart as ChartJS,
		BarController,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		type ChartConfiguration,
		type TooltipItem,
		type ChartTypeRegistry
	} from 'chart.js';

	// 注册 Chart.js 所需的组件
	ChartJS.register(BarController, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	// 🚀 新增状态：控制图表是否已进入视口
	let isChartVisible = $state(false);

	// 回调函数：由 observe Action 调用
	function handleVisibility(isVisible: boolean) {
		console.log("handleVisibility....................")
		if (isVisible) {
			// 只有当图表进入视口时，才允许其显示
			isChartVisible = true;
		}
		// 由于我们设置了 once: true，它只会触发一次
	}

	// --- 1. 定义数据结构 ---
	const data = {
		labels: ['方案 A', '方案 B'], // X 轴（方案名称）
		datasets: [
			{
				label: '所需小时数',
				data: [12, 4], // Y 轴（小时数）
				backgroundColor: [
					'rgba(239, 68, 68, 0.8)', // 方案 A: 红色
					'rgba(16, 185, 129, 0.8)' // 方案 B: 绿色
				],
				borderColor: ['rgba(239, 68, 68, 1)', 'rgba(16, 185, 129, 1)'],
				borderWidth: 1
			}
		]
	};

	// --- 2. 定义图表配置项 ---
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: 'x' as const,

		// 柱图原生动画是默认启用的，当 <canvas> 被渲染时自动播放

		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: '方案耗时对比',
				font: { size: 18 }
			},
			// Tooltip 悬停数据说明
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				titleFont: { size: 14 },
				bodyFont: { size: 14 },
				callbacks: {
					label: function (context: TooltipItem<keyof ChartTypeRegistry>) {
						let label = context.dataset.label || '';
						if (label) {
							label += ': ';
						}
						const hours = context.raw;
						if (hours !== null && typeof hours === 'number') {
							label += `${hours} 小时`;
						}
						return label;
					}
				}
			}
		},

		scales: {
			x: {
				title: { display: true, text: '方案 (Plan)' },
				beginAtZero: true
			},
			y: {
				title: { display: true, text: '小时 (H)' },
				beginAtZero: true,
				max: 12,
				ticks: { stepSize: 2 }
			}
		}
	};

	// --- 3. 完整的 Chart 配置对象 ---
	const chartConfig: ChartConfiguration = {
		type: 'bar',
		data: data,
		options: options
	};

	// --- 4. observe Action 配置 ---
	const observeOptions = {
		// 不应用任何 CSS 类名，我们只使用它的回调功能
		classToApply: '',
		classToRemove: '',
		once: true,
		rootMargin: '0px 0px -100px 0px',
		// 🚀 将 Svelte 函数传递给 Action
		callback: handleVisibility
	};
</script>

<div
	class="p-6 bg-white rounded-xl shadow-2xl mx-auto"
	style="max-width: 600px; height: 600px;"
	use:observe={observeOptions}
>
	{#if isChartVisible}
		<canvas use:chartAction={chartConfig}></canvas>
	{:else}
		<!-- 占位符，确保滚动高度不变 -->
		<div class="w-full h-full flex items-center justify-center text-gray-500">...</div>
	{/if}
</div>
