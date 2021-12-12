<script>
	export let storageAllowed = false;
</script>

{#if !storageAllowed}
	<h1>⚠️REPL STORAGE NOTICE</h1>
	<p>
		REPL blocks access to window.localStorage due to security concerns.<br />
		This example will use an emulated storage instance that <b>will not persist data</b> between page
		refreshes.
	</p>
{/if}
