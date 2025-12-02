<script lang="ts">
	// 假设 observe.ts 位于 src/lib/actions/observe.ts
	import { observe } from '$lib/actions/observe';

	const classesToAdd = 'opacity-100 translate-y-0';
	const classesToRemove = 'opacity-0 translate-y-8';
</script>

<div
	class="group
           opacity-0 translate-y-8 transition-all duration-500 ease-out delay-100
           relative"
	use:observe={{
		classToApply: classesToAdd,
		classToRemove: classesToRemove,
		rootMargin: '0px 0px -15% 0px'
	}}
>
	<div class="mb-6 overflow-hidden rounded-xl">
		<img
			src="https://ai-tool-tailwind.preview.uideck.com/images/blog-01.png"
			alt="test"
			class="ease-linear w-full duration-500 scale-100 group-hover:scale-125"
		/>
	</div>
	<div>
		<h3>my product</h3>
	</div>
</div>
