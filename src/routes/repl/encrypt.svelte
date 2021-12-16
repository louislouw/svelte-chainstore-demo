<script>
	import { onMount } from 'svelte';
	import { chain, readDefaultChainLink, jsonChainLink, storageChainLink } from 'svelte-chainstore';
	import { storageAllowed, storageMock, StorageNotice } from 'svelte-repl-storagemock';
	import { AES } from 'crypto-es/lib/aes';
	import { Utf8 } from 'crypto-es/lib/core';

	const secretKey = 'MySuperSecretKey';
	const storageKey = 'encryptedChainUser';
	let user;
	let replEnv = true;
	let storedEncryptedString;

	const defaultUser = {
		name: 'John',
		age: 18
	};

	const aesChainLink = (secretKey) => {
		function writer(value) {
			return AES.encrypt(value, secretKey).toString();
		}

		function reader(value) {
			if (!value) return null;
			const decrypted = AES.decrypt(value, secretKey);
			return decrypted ? decrypted.toString(Utf8) : null;
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
			.chain(encryptedData, encryptedData) //Intercept encrypted data in chain for display
			.chain(storageChainLink(storageKey, storage))
			.store();
	});

	const encryptedData = (v) => (storedEncryptedString = v);
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
{/if}
<h2>Stored Encrypted String</h2>
<pre>
	{storedEncryptedString}
</pre>
