<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import extend from 'just-extend';
	import { page } from '$app/stores';
	import { Head, SchemaOrg, type SchemaOrgProps, type SeoConfig } from '@pouchlab/svead';
	import type { LayoutData } from './$types.js';

	let { children, data } = $props();
	const layoutData = $derived(data as LayoutData);
	const seo_config = $derived<SeoConfig>(
		extend({}, data.baseMetaTags, $page.data?.pageMetaTags) as SeoConfig
	);

	const schema_org = $derived<SchemaOrgProps['schema'] | undefined>(
		$page.data?.pageSchema || layoutData.baseSchema
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link rel="canonical" href={layoutData.currentLangAbsoluteUrl} />
</svelte:head>

<Head {seo_config} />
{#if schema_org}
	{#key JSON.stringify(schema_org)}
		<SchemaOrg schema={schema_org} />
	{/key}
{/if}

<div>
	<Header />
	<main class="mx-auto min-h-screen">
		{@render children()}
	</main>
	<Footer />
</div>
