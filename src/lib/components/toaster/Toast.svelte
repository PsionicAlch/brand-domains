<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import type { EasingFunction, TransitionConfig } from 'svelte/transition';

	import XMark from '../icons/XMark.svelte';
	import Info from '../icons/Info.svelte';
	import Success from '../icons/Success.svelte';
	import Error from '../icons/Error.svelte';

	import type { Level } from './toaster';

	type SlideParams = {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
	};

	export let message: string;
	export let level: Level = 'info';
	export let delay: number = 3000;

	const dispatch = createEventDispatcher<{ close: void }>();

	const slide = (node: Element, params?: SlideParams | undefined): TransitionConfig => {
		const duration = params?.duration || 300;
		const delay = params?.delay || 0;
		const easing = params?.easing || sineInOut;

		return {
			duration,
			delay,
			easing,
			css: (t) => {
				return `
                    transform: translateX(${100 * (1 - t)}%)
                `;
			}
		};
	};

	let showBtn = false;
	let timeoutId: number;

	onMount(() => (timeoutId = setTimeout(() => dispatch('close'), delay)));
	onDestroy(() => clearTimeout(timeoutId));

	let classes: string;
	$: switch (level) {
		case 'success':
			classes = 'border-emerald-200 bg-emerald-50 text-emerald-500';
			break;
		case 'error':
			classes = 'border-red-200 bg-red-50 text-red-500';
			break;
		default:
			classes = 'border-neutral-200 bg-white text-neutral-500';
	}
</script>

<div
	class="flex flex-row justify-between border rounded-2xl w-96 px-5 py-3 shadow-lg {classes}"
	role="alert"
	on:mouseenter={() => (showBtn = true)}
	on:mouseleave={() => (showBtn = false)}
	transition:slide
>
	<p>{message}</p>

	<div class="flex justify-center items-center">
		{#if showBtn}
			<button on:click={() => dispatch('close')}>
				<XMark classes="size-6" />
			</button>
		{:else if level === 'success'}
			<Success classes="size-6" />
		{:else if level === 'error'}
			<Error classes="size-6" />
		{:else}
			<Info classes="size-6" />
		{/if}
	</div>
</div>
