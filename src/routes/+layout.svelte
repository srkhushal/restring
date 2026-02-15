<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Footer, Header } from '$lib/components';
	import { onMount } from 'svelte';
	import '../styles/app.css';
	import { theme } from '$lib/utils/theme.svelte';

	let { children } = $props();
	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />

<style>
	main {
		flex: 1;
	}
	:global(body) {
		padding: var(--base-size);
	}
</style>
