<script>
	import { Logo, ThemeDot } from '.';

	let n;
</script>

<header>
	<Logo />
	<ThemeDot />
</header>

<style>
	header {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		border: 1px solid;
		border-color: var(--subtle-border);
		border-radius: 3px;
		padding: calc(0.5 * var(--base-size)) calc(1 * var(--base-size));
	}
</style>
