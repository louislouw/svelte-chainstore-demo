<script lang="ts">
	const examples = [
		{
			name: 'persist',
			path: '/repl/persist',
			url: 'https://svelte.dev/repl/ddc1d945360d4ea880165916c7f123d9?version=3.44.2'
		},
		{
			name: 'compress',
			path: '/repl/compress',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'encrypt',
			path: '/repl/encrypt',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'validate',
			path: '/repl/validate',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'blacklist',
			path: '/repl/blacklist',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'whitelist',
			path: '/repl/whitelist',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'migrate',
			path: '/repl/migrate',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'sanitise',
			path: '/repl/sanitise',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'defaults',
			path: '/repl/defaults',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'casefold',
			path: '/repl/casefold',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'dirtyStore',
			path: '/repl/dirty',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		},
		{
			name: 'busyStore',
			path: '/repl/busy',
			url: 'https://svelte.dev/repl/todo?version=3.44.2'
		}
	];
</script>

<slot />
<hr />
<h3>Examples</h3>
<ul>
	{#each examples as example}
		<li>
			<a href={example.path}>{example.name}</a> [<a href={example.url} target="_blank">REPL</a>]
		</li>
	{/each}
</ul>
