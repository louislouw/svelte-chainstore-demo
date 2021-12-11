<script>
	import { chain, whitelistChainLink } from 'svelte-chainstore';

	const userV1 = {
		version: 1,
		_id: 123,
		firstName: 'John',
		lastName: 'Smith'
	};

	const user = chain((v) => {
		if (!v) return v;
		if (v.version == 1) {
			//We started using string IDs from object version 2
			v._id = 'UID-' + v._id.toString();
			v.version = 2;
		}
		return v;
	})
		.sync() //Write modified data into store at this point in the chain
		.store({ instructions: 'Click button to assign user data' });

	function prettyJson(val) {
		return JSON.stringify(val, null, 2);
	}
</script>

<div>Initial User</div>
<pre>
	{prettyJson(userV1)}
</pre>

<p><button on:click={() => ($user = userV1)}>Update User</button></p>

<div>User object migrated to v2</div>
<pre>
	{prettyJson($user)}
</pre>
