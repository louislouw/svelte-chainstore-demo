<script>
	import { onMount } from 'svelte';
	import { chain, defaultsChainLink, jsonChainLink, storageChainLink } from 'svelte-chainstore';
	import { storageAllowed, storageMock, StorageNotice } from 'svelte-repl-storagemock';

	const defaultEditorSettings = {
		theme: 'dark',
		scrollSpeed: 10,
		autoSave: true
	};

	const storageKey = 'chainEditorSettings';
	let editorSettings;
	let storedEditorSettingsJSON;
	let replEnv = true;

	onMount(() => {
		/**
		 * Note:
		 * 1. This demo will NOT work on REPL as access to localStorage is blocked for security reasons.
		 * 2. storageChainLink requires values to be string, so we need to use jsonChainLink to convert to/from string.
		 * 3. window.localStorage only available at mount, so we can only create during this lifecycle phase.
		 */

		replEnv = !storageAllowed(); //If storage is not allowed, we assume we are running on REPL
		const storage = replEnv ? storageMock() : window.localStorage;
		editorSettings = chain(defaultsChainLink(defaultEditorSettings))
			.chain(jsonChainLink())
			.chain(storageChainLink(storageKey, storage))
			.chain((v) => (storedEditorSettingsJSON = v))
			.store({ version: 1, ...defaultEditorSettings }); //Add version in case defaults change in the future
	});

	const themes = ['light', 'dark', 'classic'];
</script>

<StorageNotice show={replEnv} />

{#if editorSettings}
	<h1>Editor Settings</h1>
	<div>
		Theme:
		<select bind:value={$editorSettings.theme}>
			{#each themes as theme}
				<option value={theme}>
					{theme}
				</option>
			{/each}
		</select>
	</div>
	<div>
		Scroll Speed: <input
			bind:value={$editorSettings.scrollSpeed}
			type="range"
			min="1"
			max="10"
			placeholder="Scroll Speed"
		/>
	</div>
	<div>
		<label><input type="checkbox" bind:checked={$editorSettings.autoSave} /> Auto Save</label>
	</div>
{/if}

<h2>Editor Settings Object</h2>
<pre>
	{JSON.stringify($editorSettings)}
</pre>

<h2>Stored JSON String</h2>
<pre>
	{storedEditorSettingsJSON}
</pre>

<style>
	label,
	select,
	input {
		cursor: pointer;
	}
</style>
