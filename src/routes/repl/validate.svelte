<script>
	import { chain } from 'svelte-chainstore';
	import { validate } from 'validate.js';

	//Validation using https://validatejs.org/
	const constraints = {
		name: {
			presence: { allowEmpty: false }
		},
		email: {
			email: true
		}
	};

	let validatorErrors;
	const user = chain((v) => {
		validatorErrors = validate(v, constraints);
		return v;
	}).store({ name: '', email: '' });
	//Note: These is no sync() as only need to listen for changes in store

	function submitForm() {
		if (!validatorErrors) alert('No validation errors detected');
	}
</script>

<h1>Please enter your details</h1>

<div>
	Name:<br />
	<input bind:value={$user.name} class:error={validatorErrors?.name} />
</div>

<div>
	Email:<br />
	<input bind:value={$user.email} class:error={validatorErrors?.email} />
</div>
<div>
	<button on:click={submitForm} disabled={validatorErrors}>Next</button>
</div>

{#if validatorErrors}
	<h2>Validation Errors</h2>
	<pre>
		{JSON.stringify(validatorErrors, null, 2)}
	</pre>
{/if}

<style>
	.error,
	.error:focus {
		outline: none;
		border: 2px solid red;
	}
</style>
