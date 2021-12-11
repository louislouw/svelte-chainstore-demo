<script>
	import { onMount } from 'svelte';
	import { chain, jsonChainLink, storageChainLink } from 'svelte-chainstore';

	const storageKey = 'chainUser';
	let isREPL = true;
	let user;

	onMount(() => {
		/**
		 * Note:
		 * 1. This demo will NOT work on REPL as access to localStorage is blocked for security reasons.
		 * 2. storageChainLink requires values to be string, so we need to use jsonChainLink to convert to/from string.
		 * 3. window.localStorage only available at mount, so we can only create during this lifecycle phase.
		 */

		user = chain(jsonChainLink()).chain(storageChainLink(storageKey, replStorageCheck())).store({
			name: 'John',
			age: 18
		});
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
</script>

{#if isREPL}
	<h1>REPL NOTICE</h1>
	<p>
		This example will unfortunately not perist data if run on REPL.<br />
		REPL blocks access to window.localStorage due to security concerns.<br />
		Thus you will have to run code locally to see it in action.
	</p>
{/if}

{#if user}
	<h1>Please enter user details:</h1>
	<div>
		Name:<br />
		<input bind:value={$user.name} placeholder="Name" />
	</div>
	<div>
		Age:<br />
		<input bind:value={$user.age} placeholder="Age" />
	</div>
	<div>
		Change the details and then refresh. It should load the page with your saved user details.
	</div>
{/if}
