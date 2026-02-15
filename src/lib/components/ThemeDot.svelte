<script>
	import { theme } from '$lib/utils/theme.svelte';
</script>

<div class="theme-comp">
	<span class="theme-name">[ {theme.value} ]</span>
	<button
		onclick={() => {
			theme.toggle();
		}}
		class="theme-button"
		class:system={theme.value === 'system'}
	>
		<span>.</span>
	</button>
</div>

<style>
	.theme-comp {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: calc(var(--base-size) * 0.5);
	}
	.theme-name {
		text-transform: lowercase;
		font-size: calc(var(--base-size) * 0.75);
	}
	.theme-button {
		min-width: var(--base-size);
		min-height: var(--base-size);
		cursor: pointer;
		background: var(--text);
		border: none;
		span {
			opacity: 0;
			user-select: none;
		}
		&.system {
			border-radius: 50%;
		}
	}
</style>
