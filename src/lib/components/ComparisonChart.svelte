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
		if (isVisible) {
			// 只有当图表进入视口时，才允许其显示
			isChartVisible = true;
		}
		// 由于我们设置了 once: true，它只会触发一次
	}

	// --- 1. 定义数据结构 ---
	const data = {
		labels: ['Traditional Tractor', 'AeroVital U60'], // X 轴（方案名称）
		datasets: [
			{
				label: 'Time to Complete: ',
				data: [14, 4], // Y 轴（小时数）
				backgroundColor: [
					'rgba(239, 68, 68, 0.8)', // 方案 A: 红色
					'rgba(16, 185, 129, 0.8)' // 方案 B: 绿色
				],
				borderColor: ['rgba(239, 68, 68, 1)', 'rgba(34, 197, 94, 1)'],
				borderWidth: 0,
				barThickness: 50,
				borderRadius: {
					topLeft: 10, // 左上角圆角 10px
					topRight: 10, // 右上角圆角 10px
					bottomLeft: 0,
					bottomRight: 0
				},
				hoverBackgroundColor: [
					'rgba(239, 68, 68, 1)', // 红色全不透明
					'rgba(34, 197, 94, 1)' // 绿色全不透明
				],
				hoverBorderWidth: 2 // dark下加粗边框，让小绿柱也易hover
			}
		]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: 'x' as const,
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
							label += `${hours} Hours`;
						}
						return label;
					}
				}
			}
		},

		scales: {
			x: {
				title: { display: false, text: 'Plan' },
				beginAtZero: true,
				barPercentage: 0.2, // 柱子占据其类别宽度的 60%
				categoryPercentage: 0.8 // 类别宽度占据可用空间的 80% (可选，但推荐)
			},
			y: {
				title: { display: true, text: 'Hours' },
				beginAtZero: true,
				max: 14,
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

<!--
    关键修改：
    1. 根容器添加 h-full 和 flex flex-col，确保占据父容器的所有高度并启用 Flex 布局。
    2. 移除 chart div 上的 h-full。
    3. chart div 使用 flex-grow 和 mt-6，使其占据剩余空间，并提供顶部间距。
    4. canvas 添加 w-full h-full 以填满其父 div。
-->
<div class="p-6 mx-auto text-left w-full h-full flex flex-col" use:observe={observeOptions}>
	<!-- 头部文本：占据所需空间 -->
	<div>
		<h2 class="text-title">Efficiency Analysis: Tractor vs AeroVital U60</h2>
		<p class="text-sm mt-3">Time required to spray 135 acres (John Lemon Farm Data)</p>
	</div>

	<!-- 图表容器：使用 mt-6 创建间距，使用 flex-grow 占据剩余高度 -->
	<div class="mt-6 grow relative">
		{#if isChartVisible}
			<!-- canvas 必须填满 flex-grow 容器的全部尺寸 -->
			<canvas class="w-full h-full" use:chartAction={chartConfig}></canvas>
		{:else}
			<div class="w-full h-full flex items-center justify-center text-gray-500">
				Chart Loading...
			</div>
		{/if}
	</div>
</div>
