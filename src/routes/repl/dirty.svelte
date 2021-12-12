<script>
	import { onMount } from 'svelte';
	import { chain, jsonChainLink, dirtyStore, storageChainLink } from 'svelte-chainstore';
	import { storageAllowed, storageMock, StorageNotice } from 'svelte-repl-storagemock';

	const storageKey = 'chainUser';
	const dirty = dirtyStore();
	let user;
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
		user = chain(jsonChainLink())
			.chain(dirty.chainLink)
			.chain(storageChainLink(storageKey, storage))
			.store({
				name: 'John',
				age: 18
			});
	});
</script>

<StorageNotice show={replEnv} />

{#if user}
	<h1>Please enter user details:</h1>
	<div>Is user details dirty? <b>{$dirty ? 'YES' : 'NO'}</b></div>
	<div>
		Name:<br />
		<input bind:value={$user.name} placeholder="Name" />
	</div>
	<div>
		Age:<br />
		<input bind:value={$user.age} type="number" min="0" max="150" placeholder="Age" />
	</div>
	<div>
		Change the details and then refresh. It should load the page with your saved user details.
	</div>
{/if}
