<script lang="ts">
import { dev } from '$app/environment';
import { page } from '$app/state';
import { site } from '$lib/config/site.js';

const title = $derived(
	page.data?.title ? `${page.data.title} | ${site.name}` : site.name,
);
</script>



<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<meta name="keywords" content={site.keywords} />
	<meta name="author" content="moq77111113" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={site.url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content={site.og} />
	<meta name="twitter:image:alt" content={site.name} />
	<meta name="twitter:creator" content="moq77111113" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={site.url + page.url.pathname} />
	<meta property="og:image" content={site.og} />
	<meta property="og:image:alt" content={site.name} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:description" content={site.description} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="EN_US" />
	<link rel="shortcut icon" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
    {#if !dev}
    <script defer data-domain="orbit.moqdev.space" src="https://pulse.moqdev.space/js/script.js"></script>
	{/if}
</svelte:head>