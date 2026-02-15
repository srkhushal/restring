<script lang="ts">
	import { availableStringOps, type StringOp, type TransformerStep } from '$lib/utils';
	import { onMount } from 'svelte';

	let transformers = $state<TransformerStep[]>([]);

	function addTransformer(label: string, action: StringOp) {
		const obj = {
			id: crypto.randomUUID(),
			label,
			action
		};
		transformers.push(obj);
	}

	function removeTransformer(label: string) {
		const index = transformers.findIndex((i) => i.label === label);
		if (index !== -1) {
			transformers.splice(index, 1);
		}
		return;
	}

	function isAppliedOp(label: string) {
		const output = transformers.find((i) => i.label === label);
		return Boolean(output);
	}

	let inputRef: HTMLTextAreaElement;
	let input = $state('');
	let output = $derived.by(() => {
		let op = input;
		transformers.forEach((t) => {
			op = t.action(op);
		});
		return op;
	});
	let opKeysWithFn = $derived(
		Object.entries(availableStringOps).sort((a, b) => a[0].localeCompare(b[0]))
	);

	$effect(() => {
		if (inputRef) {
			inputRef.focus();
		}
	});
</script>

<div class="string-manips">
	<label>
		<span>Input</span>
		<textarea
			bind:this={inputRef}
			class="input"
			placeholder="input..."
			bind:value={input}
			name="input"
		></textarea>
	</label>
	{@render op_pool()}
	<!-- {@render applied_ops()} -->
	<label>
		<span>Output</span>
		<textarea readonly class="output" placeholder="output..." bind:value={output} name="output">
		</textarea>
	</label>
</div>

{#snippet op_pool()}
	<div class="operations-pool">
		{#each opKeysWithFn as [keyString, fn], index (index)}
			{@const isApplied = isAppliedOp(keyString)}
			{@const opKey = !keyString.startsWith('!!') ? keyString : keyString.substring(2)}
			<button
				lang="en"
				data-method={availableStringOps?.['slug']?.(opKey)}
				class="t-btn"
				class:applied={isApplied}
				onclick={() => {
					if (isApplied) {
						removeTransformer(keyString);
					} else {
						addTransformer(keyString, fn);
					}
				}}
			>
				{!keyString.startsWith('!!')
					? availableStringOps?.[keyString](keyString)
					: keyString.substring(2)}
			</button>
		{/each}
	</div>
{/snippet}

<!-- <select name="operations">
	<optgroup label="Utilities">
		<option value="extractEmails">Extract Emails</option>
		<option value="extractURLs">Extract URLs</option>
	</optgroup>
	<optgroup label="Case Transformation">
		<option value="toLowerCase()">Lower Case</option>
		<option value="toUpperCase()">Upper Case</option>
		<option value="toTitleCase()">Title Case</option>
		<option value="toCamelCase()">Camel Case</option>
		<option value="toSnakeCase()">Snake Case</option>
		<option value="toKebabCase()">Kebab Case</option>
	</optgroup>
	<optgroup label="String Manipulation">
		<option value="reverse">Reverse</option>
		<option value="truncate">Truncate</option>
		<option value="removeWhitespace">Remove Whitespaces</option>
		<option value="slugify">URL-friendly</option>
	</optgroup>
	<optgroup label="Analysis">
		<option value="countWords">Count Words</option>
		<option value="countChars">Count Chars</option>
		<option value="countVowels">Count Vowels</option>
		<option value="isPalindrome">Panidrome Check</option>
	</optgroup>
</select> -->

<style>
	.string-manips {
		width: 100%;
		margin-top: var(--base-size);
		display: flex;
		flex-direction: column;
		gap: calc(0.5 * var(--base-size));
	}
	label,
	.operations-pool,
	.input,
	.output {
		width: 100%;
		background: none;
		border: 1px solid;
		border-color: var(--subtle-border);
		border-radius: 4px;
		font-size: var(--base-size);
		padding: calc(0.5 * var(--base-size));
		position: relative;
	}
	label {
		border: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		position: relative;
		span {
			position: absolute;
			background: var(--subtle-border);
			color: var(--text);
			top: 4px;
			left: 4px;
			border-radius: 2px;
			backdrop-filter: blur(10px);
			font-size: 12px;
			padding-inline: calc(var(--base-size) * 0.5);
		}
	}
	.input,
	.output {
		resize: vertical;
		min-height: 150px;
		padding-top: 1.75rem;
		&::placeholder {
			font-size: 14px;
			opacity: 0;
		}
	}
	.input {
		&:focus {
			outline: none;
		}
	}
	.output {
		outline: none;
	}
	.operations-pool {
		border-style: dashed;
		display: flex;
		flex-wrap: wrap;
		overflow: scroll;
		gap: calc(0.5 * var(--base-size));
	}
	.t-btn {
		padding: calc(var(--base-size) * 0.5);
		border-radius: 4px;
		color: var(--text);
		border: none;
		cursor: pointer;
		border: none;
		&.applied {
			background: var(--text);
			color: var(--background);
		}
	}
</style>
