<script lang="ts">
	export let domain: string;
	export let available: boolean;

	const affiliateLink = 'https://namecheap.pxf.io/EKnjJK';
	const namecheapLink = `https://www.namecheap.com/domains/registration/results/?domain=${domain}`;
	const href = `${affiliateLink}?url=${encodeURIComponent(namecheapLink)}`;

	let color: 'red' | 'emerald';
	$: if (available) {
		color = 'emerald';
	} else {
		color = 'red';
	}
</script>

<div
	class={`w-full rounded-lg border border-${color}-200 shadow-md text-${color}-500 text-xs flex flex-row items-center justify-between py-3 px-5`}
>
	<div>
		<h3 class="text-sm font-bold mb-2 md:text-base">
			{domain}
		</h3>
		<p class="text-xs md:text-base">
			Availability: <b>{available ? 'Available' : 'Unavailable'}</b>
		</p>
	</div>
	{#if available}
		<a
			{href}
			target="_blank"
			rel="nofollow"
			data-umami-event="Buy Domain"
			data-umami-event-domain={domain}
			class="text-xs md:text-base"
		>
			Buy Domain
		</a>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width={1.5}
			stroke="currentColor"
			class={`size-6`}
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
			/>
		</svg>
	{/if}
</div>
