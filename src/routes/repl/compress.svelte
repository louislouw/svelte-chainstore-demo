<script>
	import { onMount } from 'svelte';
	import { chain, jsonChainLink, storageChainLink } from 'svelte-chainstore';
	import LZString from 'lz-string';
	import { storageAllowed, storageMock, StorageNotice } from 'svelte-repl-storagemock';

	const storageKey = 'compressedChainPoem';
	let user;
	let uncompressedSize = 0;
	let compressedSize = 0;
	let saving = '0.0';
	let replEnv = true;

	onMount(() => {
		/**
		 * Note:
		 * 1. This demo will NOT PERSIST data on REPL as access to localStorage is blocked for security reasons.
		 * 2. storageChainLink requires values to be string, so we need to use jsonChainLink to convert to/from string.
		 * 3. window.localStorage only available at mount, so we can only create during this lifecycle phase.
		 */

		replEnv = !storageAllowed(); //If storage is not allowed, we assume we are running on REPL
		const storage = replEnv ? storageMock() : window.localStorage;
		user = chain(jsonChainLink())
			.chain((v) => {
				uncompressedSize = new Blob([v]).size;
				return v;
			})
			.chain(LZString.compress, LZString.decompress)
			.chain(storageChainLink(storageKey, storage))
			.chain((v) => {
				compressedSize = new Blob([v]).size;
				return v;
			})
			.store({
				author: 'Edgar Allan',
				poem: `The Bells by Edgar Allan
To the swinging and the ringing
of the bells, bells, bells
Of the bells, bells, bells, bells
Bells, bells, bells
To the rhyming and the chiming of the bells!`
			});
	});

	$: saving = (((uncompressedSize - compressedSize) / uncompressedSize) * 100).toFixed(1);
</script>

<StorageNotice show={replEnv} />

{#if user}
	<h1>Edit Poem</h1>
	<div>
		Author:<br />
		<input bind:value={$user.author} placeholder="Author" />
	</div>
	<div>
		<textarea bind:value={$user.poem} rows="8" cols="60" />
	</div>
	<div>
		Uncompressed size is {uncompressedSize} and the compressed is {compressedSize}, giving a
		<b>{saving}%</b> saving.
	</div>
{/if}
