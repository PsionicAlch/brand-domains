<script lang="ts">
	export let src: string;
	export let name: string;
	export let tag: string;
	export let review: string;
	export let link: string;
</script>

<div
	class="w-full h-full flex flex-col gap-5 border border-neutral-200 shadow-xl rounded-2xl px-10 py-5 text-start"
>
	<a href={link} target="_blank">
		<div class="flex flex-row items-center gap-5">
			<div>
				<img {src} alt={`Profile picture of ${name}`} class="rounded-full size-12" />
			</div>
			<div>
				<p class="font-medium">{name}</p>
				<small class="text-gray-500">@{tag}</small>
			</div>
		</div>
	</a>
	<div>
		<p class="leading-relaxed text-gray-500 text-xs md:text-base">
			{review}
		</p>
	</div>
</div>
