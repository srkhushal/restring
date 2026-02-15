<script>
	import { SvelteDate } from 'svelte/reactivity';

	const date = new SvelteDate();

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<footer>
	<span>
		<!-- &copy;  -->
		{date.toJSON()}
		<!-- <a
			class="gh-profile"
			href="http://github.com/srkhushal"
			target="_blank"
			rel="noopener noreferrer"
		>
			Khushal
		</a> -->
	</span>
	<a
		class="gh-profile"
		href="http://github.com/srkhushal"
		target="_blank"
		rel="noopener noreferrer"
	>
		GitHub
	</a>
</footer>

<style>
	footer {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		font-size: calc(var(--base-size) * 0.75);

		border: 1px solid;
		border-color: var(--subtle-border);
		border-radius: 3px;
		padding: calc(0.5 * var(--base-size)) calc(1 * var(--base-size));
	}
	span {
		opacity: 0.5;
	}
</style>
