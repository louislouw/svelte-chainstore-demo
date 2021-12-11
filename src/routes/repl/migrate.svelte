<script>
	import { chain } from 'svelte-chainstore';

	const userV1 = {
		version: 1,
		_id: 123,
		firstName: 'John',
		lastName: 'Smith',
		state: 'Texas'
	};

	const user = chain((v) => {
		if (!v) return v;
		if (v.version == 1) {
			//We started using string IDs from object version 2
			v._id = 'UID-' + v._id.toString();
			//And only a single name field
			v.name = v.firstName + ' ' + v.lastName;
			delete v.firstName;
			delete v.lastName;
			v.version = 2;
		}
		return v;
	})
		.chain((v) => {
			if (!v) return v;
			if (v.version == 2) {
				//Using ISO2 state codes since v3
				v.state = isoLookup(v.state);
				v.version = 3;
			}
			return v;
		})
		.sync() //Write modified data into store at this point in the chain
		.store({ instructions: 'Click button to assign user data' });

	function isoLookup(state) {
		state = state.toLowerCase();
		if (state == 'texas') return 'TX';
		throw Error('State not found'); //This is demo afterall...
	}

	const prettyJson = (val) => JSON.stringify(val, null, 2);
</script>

<div>Initial User</div>
<pre>
	{prettyJson(userV1)}
</pre>

<p><button on:click={() => ($user = userV1)}>Update User</button></p>

<div>User object migrated to v2 and then v3</div>
<pre>
	{prettyJson($user)}
</pre>
