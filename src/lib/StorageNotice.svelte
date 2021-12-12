<script>
	export let show = false;
</script>

{#if show}
	<div class="notice">
		⚠️ REPL blocks access to window.localStorage due to security concerns.<br />
		This example will use an emulated storage instance that <b>will not persist data</b> between reloads.
	</div>
{/if}

<style>
	.notice {
		display: inline-block;
		background: rgb(240, 234, 147);
		padding: 15px;
		border-radius: 5px;
		border: 2px dashed #bbb;
		margin: 15px 5px;
		text-align: center;
	}
</style>
