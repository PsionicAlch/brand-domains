<script lang="ts">
	import Toast from './Toast.svelte';

	export let toasts;
</script>

<div class="absolute top-0 right-0 pt-10 pr-10 w-[25rem] space-y-5">
	{#each $toasts as { id, close, ...rest } (id)}
		<Toast {...rest} on:close={close} />
	{/each}
</div>
