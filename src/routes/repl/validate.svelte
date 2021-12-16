<script>
	import { chain } from 'svelte-chainstore';
	import { default as validate } from 'validate.js';

	//Validation using https://validatejs.org/
	const constraints = {
		name: {
			presence: { allowEmpty: false }
		},
		email: {
			presence: { allowEmpty: false },
			email: true
		}
	};

	let validationErrors;
	const validator = (v) => {
		validationErrors = validate(v, constraints);
		return v;
	};

	const user = chain(validator).store({ name: '', email: '' });
	//Note: These is no sync() as only need to listen for changes in store

	function submitForm() {
		if (!validationErrors) validator($user);
		if (!validationErrors) alert('No validation errors detected');
	}
</script>

<h1>Please enter your details</h1>

<div>
	Name:<br />
	<input bind:value={$user.name} class:error={validationErrors?.name} />
</div>

<div>
	Email:<br />
	<input bind:value={$user.email} class:error={validationErrors?.email} />
</div>
<div>
	<button on:click={submitForm} disabled={validationErrors}>Next</button>
</div>

{#if validationErrors}
	<h2>Validation Errors</h2>
	<pre>
		{JSON.stringify(validationErrors, null, 2)}
	</pre>
{/if}

<style>
	.error,
	.error:focus {
		outline: none;
		border: 2px solid red;
	}
</style>
