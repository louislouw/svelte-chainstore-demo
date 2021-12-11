<script>
	import { chain, whitelistChainLink } from 'svelte-chainstore';

	const startUser = {
		_id: 123,
		firstName: 'John',
		lastName: 'Smith',
		password: 'Password123'
	};

	const user = chain(whitelistChainLink(['firstName', 'lastName']).writer)
		.sync() //Write modified data into store at this point in the chain
		.store({ instructions: 'Click button to assign user data' });

	const prettyJson = (val) => JSON.stringify(val, null, 2);
</script>

<div>Initial User</div>
<pre>
	{prettyJson(startUser)}
</pre>

<p><button on:click={() => ($user = startUser)}>Update User</button></p>

<div>User with only whitelisted properties</div>
<pre>
	{prettyJson($user)}
</pre>
