<script>
	import { onMount } from 'svelte';
	import { chain, defaultsChainLink, jsonChainLink, storageChainLink } from 'svelte-chainstore';

	const defaultEditorSettings = {
		theme: 'dark',
		scrollSpeed: 10,
		autoSave: true
	};

	const storageKey = 'chainEditorSettings';
	let isREPL = true;
	let editorSettings;
	let storedEditorSettingsJSON;

	onMount(() => {
		/**
		 * Note:
		 * 1. This demo will NOT work on REPL as access to localStorage is blocked for security reasons.
		 * 2. storageChainLink requires values to be string, so we need to use jsonChainLink to convert to/from string.
		 * 3. window.localStorage only available at mount, so we can only create during this lifecycle phase.
		 */

		editorSettings = chain(defaultsChainLink(defaultEditorSettings))
			.chain(jsonChainLink())
			.chain(storageChainLink(storageKey, replStorageCheck()))
			.chain((v) => (storedEditorSettingsJSON = v))
			.store({ version: 1, ...defaultEditorSettings }); //Add version in case defaults change in the future
	});

	function replStorageCheck() {
		let storage;
		//Due to security we are not allowed to use storage on REPL
		//Thus we use a dummy storage mockup
		//Note: This storage mockup will unfortunately not persist data between browser refreshes
		try {
			storage = window.localStorage;
			isREPL = false;
		} catch (e) {
			storage = storageMock();
		}
		return storage;
	}

	const storageMock = () => {
		let internalStore = {};
		return {
			getItem: (key) => internalStore[key],
			setItem: (key, value) => {
				internalStore[key] = value;
			},
			clear: () => {
				internalStore = {};
			},
			key: (index) => Object.keys(internalStore)[index],
			removeItem: (key) => {
				internalStore[key] = null;
			},
			length: Object.keys(internalStore).length
		};
	};

	const themes = ['light', 'dark', 'classic'];
</script>

{#if isREPL}
	<h1>REPL NOTICE</h1>
	<p>
		This example will unfortunately not perist data if run on REPL.<br />
		REPL blocks access to window.localStorage due to security concerns.<br />
		Thus you will have to run code locally to see it in action.
	</p>
{/if}

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
