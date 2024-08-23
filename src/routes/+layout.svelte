<script lang="ts">
	import { PUBLIC_NODE_ENV } from '$env/static/public';

	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { createToaster } from '$lib/components/toaster/toaster';

	import '../app.css';

	const { toaster, props } = createToaster();

	const title = 'Brand Domains by PsionicAlch';
	const description =
		'Brand Domains helps you to find the perfect domain name for your brand using cutting edge A.I. technology.';
	const website = 'https://branddomains.psionicalch.com';
	const keywords = [
		'A.I.',
		'Cutting Edge',
		'Brand',
		'Name',
		'Brand Name',
		'Branding',
		'Domain',
		'Domain Name'
	].join(', ');
</script>

<svelte:head>
	<link rel="icon" type="image/svg" href="/icon.svg" />

	<title>{title}</title>

	<meta name="description" content={description} />

	<meta name="keywords" content={keywords} />

	<meta name="author" content="Jean-Jacques Strydom" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="/BrandDomains_og_image.png" />
	<meta property="og:url" content={website} />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="/BrandDomains_og_image.png" />
	<meta name="twitter:site" content="@psionicalch" />

	<link rel="canonical" href={website} />

	{#if PUBLIC_NODE_ENV === 'production'}
		<script
			defer
			src="https://umami.psionicalch.com/script.js"
			data-website-id="beee9f07-bb55-4527-ab36-4df9e15ad3a8"
		></script>
	{/if}
</svelte:head>

<NavBar />

<main class="container mx-auto">
	<slot></slot>
</main>

<Footer />

<svelte:component this={toaster} {...props} />
