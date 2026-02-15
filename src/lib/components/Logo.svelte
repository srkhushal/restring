<script lang="ts">
	import { onMount } from 'svelte';

	const str = 'restring'.split('');
	let activeIndex = $state(0);
	let completed = $state(false);
	$effect(() => {
		if (completed) return;
		const interval = setInterval(() => {
			activeIndex = activeIndex + 1;
			if (activeIndex === str.length) completed = true;
			activeIndex %= str.length;
		}, 250);
		return () => clearInterval(interval);
	});
</script>

<div>
	{#each str as char, i}
		<span class:logo-bold={i === activeIndex}>
			{char}
		</span>
	{/each}
</div>

<style>
	.logo-bold {
		font-weight: bold;
		transition: all 250ms;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
