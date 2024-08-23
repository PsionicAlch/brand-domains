<script lang="ts">
	export let title: string;
</script>

<div class="col-span-1 shadow-xl rounded-xl border border-neutral-200 px-5 py-10 md:px-10 md:py-20">
	<h2 class="capitalize font-bold mb-5 text-base md:text-2xl">
		{title}
	</h2>
	<p class="leading-relaxed text-gray-500 text-xs md:text-base">
		<slot></slot>
	</p>
</div>
