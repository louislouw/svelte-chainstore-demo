<script>
	import { onDestroy } from 'svelte';
	import { chain, dirtyStore, autoSave } from 'svelte-chainstore';

	/**
	 * 1. Try to close tab while dirty indicator is red. You will be asked for confirmation.
	 * 2. If you navigate away to another page, autoSave will immediately save when "autoSaveDestroy" is called.
	 * 3. Any change will reset the timer with the current configuration. So it will only save once you stop typing.
	 * 4. In production you typically want to use a much shorter duration between 100ms and 500ms.
	 */

	const dirty = dirtyStore();
	const user = chain(dirty.chainLink).store({ name: 'John', age: 18 });
	dirty.reset();

	const autoSaveDestroy = autoSave(saveUser, dirty, user, { delay: 3000, preventClose: true });
	onDestroy(autoSaveDestroy);

	let saveCount = 0;
	function saveUser(data) {
		++saveCount;
		//Save user details to database, do REST call, etc.
		console.log('User data saved', data);
	}
</script>

<div>
	<span class:dirty={$dirty} class:saved={!$dirty}>⬤</span>
	{#if $dirty}
		Dirty, waiting to save...<br />
	{:else}
		Saved {saveCount} times.
	{/if}
</div>

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

<p><b>TIP:</b> Try to close tab while dirty indicator is red.</p>

<style>
	.saved {
		color: green;
	}

	.dirty {
		color: maroon;
	}
</style>
