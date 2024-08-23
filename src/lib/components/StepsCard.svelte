<script lang="ts">
	export let title: string;
	export let text: string;
	export let img: string;
	export let alt: string;
	export let id: string = '';
</script>

<div
	class="flex flex-col text-start mb-10 gap-5 lg:gap-10 lg:flex-row lg:items-center lg:justify-between"
	{id}
>
	<div class="flex-1 space-y-2 lg:space-y-5">
		<h3 class="text-sm font-bold md:text-xl">{title}</h3>
		<p class="text-gray-500">{text}</p>
	</div>
	<div class="flex-1 bg-neutral-200 p-3 rounded-2xl shadow-lg lg:max-w-[40vw]">
		<img src={img} {alt} />
	</div>
</div>
