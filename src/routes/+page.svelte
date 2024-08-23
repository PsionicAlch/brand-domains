<script lang="ts">
	import BenefitsCard from '$lib/components/BenefitsCard.svelte';
	import SocialReviewCard from '$lib/components/SocialReviewCard.svelte';

	import brandDomainsExample from '$lib/assets/images/brand_domains_example.png';
	import akhromieiev from '$lib/assets/images/akhromieiev.jpg';
	import francisboi from '$lib/assets/images/franciscboicu.jpg';
	import dmgoodman from '$lib/assets/images/dm_goodman.jpg';
</script>

<section
	id="hero"
	class="container mx-auto px-10 mt-10 flex flex-col items-center justify-center text-center md:mt-20"
>
	<h1 class="text-3xl font-extrabold mb-5 capitalize md:text-5xl lg:text-7xl">
		Find the perfect domain name for your next brand
	</h1>

	<h2 class="text-base text-gray-500 mb-10 md:text-lg lg:text-2xl">
		Use the power of cutting edge A.I. to help surpass your creative block and gain some new
		inspiration
	</h2>

	<form action="/generate/" method="post">
		<input type="hidden" name="keywords" id="keywords" value="gardening, nature, plants, life" />
		<input type="hidden" name="extensions" id="extensions" value=".com, .net, .online" />
		<input
			type="hidden"
			name="description"
			id="description"
			value="An eCommerce site dedicated to the sale of plants, herbs, and equipment necessary to grow your own plants."
		/>

		<button
			class="capitalize px-4 py-2 bg-black hover:bg-neutral-900 text-white rounded-xl mb-8 md:mb-16"
		>
			Try it now!
		</button>
	</form>

	<div class="bg-neutral-200 p-3 rounded-2xl shadow-lg lg:max-w-[60vw]">
		<img src={brandDomainsExample} alt="Brand Domains in action" class="rounded-xl" />
	</div>
</section>

<section class="container mx-auto mt-20 grid grid-cols-1 gap-5 text-center px-10 lg:grid-cols-3">
	<BenefitsCard title="Completely Free">
		Brand Domains is completely free to use with zero hidden costs. No sign-up required.
	</BenefitsCard>

	<BenefitsCard title="Latest A.I. Tech">
		Brand Domains uses ChatGPT's latest A.I. model so you can be sure that you're getting the best
		results.
	</BenefitsCard>

	<BenefitsCard title="Domain Availability Check">
		Quickly and easily see which domains are available for purchase with the click of a button.
	</BenefitsCard>
</section>

<section class="container mx-auto mt-20 px-10">
	<h2 class="text-base font-bold mb-5 md:mb-10 md:text-3xl text-center">People Love It</h2>

	<div class="grid grid-cols-1 gap-5 text-center px-10 lg:grid-cols-3">
		<SocialReviewCard
			src={akhromieiev}
			name="Roman A"
			tag="akhromieiev"
			review="This tool is awesome. You can test a combinations directly on a single page. Tried on my phone and its easily to validate ⚡️"
			link="https://x.com/akhromieiev/status/1823460537197379968"
		/>

		<SocialReviewCard
			src={francisboi}
			name="🟢 Francisc @ uprace.me"
			tag="franciscboicu"
			review="Such a simple and obvious tool to create - but SO affective. I think most of the domain sellers should have tools like this. Brand Domains really helps a lot - rather than going back and forth with an AI prompt and then querying a domain seller."
			link="https://x.com/franciscboicu/status/1826179822713753667"
		/>

		<SocialReviewCard
			src={dmgoodman}
			name="Dima Ibragimov ✨ Indie"
			tag="dm_goodman"
			review="👨‍💻 For the guys who are building as fast as I wish 💊 Here's a pill for the headache of choosing and checking a domain 🤝 No thanks Brand Domains"
			link="https://x.com/dm_goodman/status/1826688356924661855"
		/>
	</div>
</section>

<section class="container mx-auto mt-20 text-center">
	<h2 class="text-base font-bold mb-5 md:mb-10 md:text-3xl">As simple as it gets</h2>
	<div class="px-10 mx-auto space-y-2 lg:max-w-[50vw]">
		<p class="hyphens-auto text-justify text-gray-500 text-xs md:text-base">
			Everything happens on the
			<a href="/generate" class="hover:underline text-neutral-950">
				<b>Generate</b>
			</a>
			page.
		</p>
		<p class="hyphens-auto text-justify text-gray-500 text-xs md:text-base">
			<b class="text-neutral-950">Step 1:</b> Answer 2-3 short questions.
		</p>
		<p class="hyphens-auto text-justify text-gray-500 text-xs md:text-base">
			<b class="text-neutral-950">Step 2:</b> Click the "Generate" button.
		</p>
		<p class="hyphens-auto text-justify text-gray-500 text-xs md:text-base">
			<b class="text-neutral-950">Step 2:</b> [Optional] Purchase your favorite domain/s.
		</p>
		<p class="hyphens-auto text-justify text-gray-500 text-xs md:text-base">That's it!</p>
	</div>
</section>

<section class="container mx-auto my-20 text-center">
	<h2 class="text-base font-bold mb-5 md:mb-10 md:text-3xl">Contact Me</h2>
	<p class="text-gray-500 px-10 text-xs md:text-base">
		For any bugs, questions or feature requests, please message me on
		<a href="https://x.com/psionicalch" target="_blank" class="hover:underline text-neutral-950">
			𝕏
		</a>
	</p>
</section>
