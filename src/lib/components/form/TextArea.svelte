<script lang="ts">
	export let name: string;
	export let label: string;
	export let placeholder: string;
	export let value: string;
	export let errors: string[];

	let classes: string;
	$: if (errors.length > 0) {
		classes = 'caret-red-400 border-red-200 focus:!border-red-400 text-red-400';
	} else if (value) {
		classes = 'caret-emerald-500 border-emerald-200 focus:!border-emerald-400 text-emerald-500';
	} else {
		classes = 'caret-neutral-400 border-neutral-200 focus:!border-neutral-400';
	}
</script>

<div class="flex flex-col gap-2 text-neutral-500 focus-within:text-neutral-800">
	<label for={name} class="font-light text-xs md:text-base">{label}</label>
	<div class="px-3">
		<textarea
			{name}
			id={name}
			{placeholder}
			bind:value
			on:input
			class="px-3 py-2 w-full rounded-lg border {classes} shadow-md focus:ring-0 text-xs placeholder:text-neutral-400 md:text-sm"
			rows={6}
		></textarea>
		{#each errors as error (Math.floor(Math.random() * 1_000_000_000))}
			<div class="px-10">
				<ul class="list-disc text-red-500">
					<li><small>{error}</small></li>
				</ul>
			</div>
		{/each}
	</div>
</div>
