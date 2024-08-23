<script lang="ts">
	import { enhance, applyAction } from '$app/forms';

	import { createToast } from '$lib/components/toaster/toaster.js';
	import {
		validateDescription,
		validateExtensions,
		validateKeywords
	} from '$lib/validators/validators.js';

	import DomainContainer from '$lib/components/DomainContainer.svelte';
	import TextArea from '$lib/components/form/TextArea.svelte';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import Globe from '$lib/components/icons/Globe.svelte';

	import type { ActionData } from './$types.js';
	import type { InputDataType } from './types.js';

	export let form;

	let loading: boolean = false;

	let keywords: InputDataType = form?.keywords || { value: '', errors: [] };
	let extensions: InputDataType = form?.extensions || { value: '', errors: [] };
	let description: InputDataType = form?.description || { value: '', errors: [] };
	let domains: { domain: string; available: boolean }[] = form?.domains! || [];

	function handleData(data: ActionData | null) {
		if (data) {
			keywords = data.keywords || keywords;
			extensions = data.extensions || extensions;
			description = data.description || description;
			domains = data.domains || domains;
		}
	}

	const sendToast = createToast();
</script>

<section
	class="container mx-auto px-10 flex flex-col mb-10 gap-10 lg:flex-row lg:h-[80vh] lg:gap-24"
>
	<div class="flex-1 flex flex-col justify-center items-center">
		<div class="w-full">
			<h2 class="text-base font-bold mb-1 md:text-xl">Generate Domain Names</h2>

			<p class="text-xs text-neutral-500 font-light mb-5 md:text-base">
				Answer three short questions to get suggestions that are a great fit for your brand.
			</p>
			<ol class="list-decimal text-xs text-neutral-500 font-light mb-5 px-5 md:text-base">
				<li>What keywords are associated with your brand?</li>
				<li>What should your domain end in?</li>
				<li>A description of your project.</li>
			</ol>

			<form
				class="space-y-5"
				method="post"
				action="/generate"
				use:enhance={() => {
					loading = true;

					return async ({ result }) => {
						if (result.status === 500) {
							sendToast('An unexpected error has occurred.');
						}

						handleData(result.data || null);

						await applyAction(result);

						loading = false;
					};
				}}
			>
				<TextInput
					name="keywords"
					label="Comma Separated Keywords"
					placeholder="sleek, modern, aesthetic"
					bind:value={keywords.value}
					errors={keywords.errors}
					on:input={() => (keywords.errors = validateKeywords(keywords.value))}
				/>

				<TextInput
					name="extensions"
					label="Comma Separated Domains"
					placeholder=".com, .net, .dev"
					bind:value={extensions.value}
					errors={extensions.errors}
					on:input={() => (extensions.errors = validateExtensions(extensions.value))}
				/>

				<TextArea
					name="description"
					label="Description"
					placeholder="A description of your business to help us understand your vision."
					bind:value={description.value}
					errors={description.errors}
					on:input={() => (description.errors = validateDescription(description.value))}
				/>

				<button
					class="text-xs bg-black text-white py-2 px-5 rounded-xl hover:bg-neutral-800 disabled:bg-neutral-500 disabled:cursor-not-allowed md:text-base"
					data-umami-event="Domain Generate Button"
					data-umami-event-keywords={keywords.value}
					data-umami-event-extensions={extensions.value}
					data-umami-event-description={description.value}
					disabled={loading}
				>
					{loading ? 'Generating...' : 'Generate'}
				</button>
			</form>
		</div>
	</div>
	{#if domains.length > 0}
		<div class="flex-1 space-y-5 overflow-auto px-0 lg:px-10">
			{#each domains as { domain, available } (crypto.randomUUID())}
				<DomainContainer {domain} {available} />
			{/each}
		</div>
	{:else}
		<div
			class="flex-1 flex flex-col justify-center items-center text-center border-8 {loading
				? 'animate-pulse border-neutral-300'
				: 'border-neutral-200'} border-dashed rounded-xl select-none p-5 lg:gap-10"
		>
			<Globe className="size-20 {loading ? 'text-neutral-300' : 'text-neutral-200'} md:size-32" />
			<h2
				class="text-base font-extrabold px-10 {loading
					? 'text-neutral-300'
					: 'text-neutral-200'} md:text-3xl"
			>
				Let's find you the perfect domain for your brand!
			</h2>
		</div>
	{/if}
</section>
