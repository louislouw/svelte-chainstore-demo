<script>
	import { onMount } from 'svelte';
	import { chain, readDefaultChainLink, jsonChainLink, storageChainLink } from 'svelte-chainstore';
	import { storageAllowed, storageMock, StorageNotice } from 'svelte-repl-storagemock';
	import CryptoJS from 'crypto-js';

	const secretKey = 'MySuperSecretKey';
	const storageKey = 'encryptedChainUser';
	let user;
	let replEnv = true;

	const defaultUser = {
		name: 'John',
		age: 18
	};

	const aesChainLink = (secretKey) => {
		function writer(value) {
			return CryptoJS.AES.encrypt(value, secretKey).toString();
		}

		function reader(value) {
			if (!value) return null;
			const decrypted = CryptoJS.AES.decrypt(value, secretKey);
			return decrypted ? decrypted.toString(CryptoJS.enc.Utf8) : null;
		}
		return {
			writer,
			reader
		};
	};

	onMount(() => {
		/**
		 * Note:
		 * 1. This demo will NOT work on REPL as access to localStorage is blocked for security reasons.
		 * 2. storageChainLink requires values to be string, so we need to use jsonChainLink to convert to/from string.
		 * 3. window.localStorage only available at mount, so we can only create during this lifecycle phase.
		 */

		replEnv = !storageAllowed(); //If storage is not allowed, we assume we are running on REPL
		const storage = replEnv ? storageMock() : window.localStorage;
		user = chain(readDefaultChainLink(defaultUser))
			.chain(jsonChainLink())
			.chain(aesChainLink(secretKey))
			.chain(storageChainLink(storageKey, storage))
			.store();
	});
</script>

<StorageNotice show={replEnv} />

{#if user}
	<h1>Please enter user details:</h1>
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
