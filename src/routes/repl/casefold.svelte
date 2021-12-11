<script>
	import { chain } from 'svelte-chainstore';

	const startUser = {
		_id: 123,
		firstName: 'John',
		lastName: 'Smith',
		password: 'Password123'
	};

	const user = chain((v) => {
		return {
			...v,
			casefolded_firstName: v.firstName.toLowerCase(),
			casefolded_lastName: v.lastName.toLowerCase()
		};
	})
		.sync() //Write modified data into store at this point in the chain
		.store({ instructions: 'Click button to assign user data' });

	const prettyJson = (val) => JSON.stringify(val, null, 2);
</script>

<h2>Case Folded Information</h2>

<div>Initial User</div>
<pre>
	{prettyJson(startUser)}
</pre>

<p><button on:click={() => ($user = startUser)}>Update User</button></p>

<div>User with case-folded fields added</div>
<pre>
	{prettyJson($user)}
</pre>

<h2>Case Folding Explained</h2>
<p>
	The <a href="https://firebase.google.com/docs/firestore" target="_blank">FireStore</a> NoSql type database
	only allows case sensitive sorting. Enabling case insensitive sorting requires duplicating fields and
	storing the values in a case insensitive manner.
</p>
<p>
	⚠️ This example is not a complete solution. See this <a
		href="https://stackoverflow.com/questions/48096063/cloud-firestore-case-insensitive-sorting-using-query"
		target="_blank">stackoverflow post</a
	>
	for more details.
</p>
