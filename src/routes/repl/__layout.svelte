<script lang="ts">
	const examples = [
		{
			name: 'persist',
			path: '/repl/persist',
			url: 'https://svelte.dev/repl/3a4642b78c8d45889b20ef240c79be83?version=3.44.3'
		},
		{
			name: 'persistStore',
			path: '/repl/persistStore',
			url: 'https://svelte.dev/repl/0a840bddea794866a4ce94da96df0ff1?version=3.44.3'
		},
		{
			name: 'compress',
			path: '/repl/compress',
			url: 'https://svelte.dev/repl/371de319ed614cf19bd76a43fbe1ef52?version=3.44.3'
		},
		{
			name: 'encrypt',
			path: '/repl/encrypt',
			url: 'https://svelte.dev/repl/b4a4c4dbed534706b4b565aeb6a0ed3c?version=3.44.3'
		},
		{
			name: 'validate',
			path: '/repl/validate',
			url: 'https://svelte.dev/repl/36e9ee5147324bc8b5821e43b75b307f?version=3.44.3'
		},
		{
			name: 'blacklist',
			path: '/repl/blacklist',
			url: 'https://svelte.dev/repl/90a669317b574318a02dd234e30fcbbb?version=3.44.3'
		},
		{
			name: 'whitelist',
			path: '/repl/whitelist',
			url: 'https://svelte.dev/repl/091bafb8fe3a4a98ac31678fbb2e1f84?version=3.44.3'
		},
		{
			name: 'migrate',
			path: '/repl/migrate',
			url: 'https://svelte.dev/repl/07a68bee9dc54f57a10d003a378f3843?version=3.44.3'
		},
		{
			name: 'sanitise',
			path: '/repl/sanitise',
			url: 'https://svelte.dev/repl/79d3a6d39459490b8af30338910129a9?version=3.44.3'
		},
		{
			name: 'defaults',
			path: '/repl/defaults',
			url: 'https://svelte.dev/repl/b461fd94808e44728a1dc624af6cc95d?version=3.44.3'
		},
		{
			name: 'casefold',
			path: '/repl/casefold',
			url: 'https://svelte.dev/repl/5499e4e957e3432cba1b8b26a3be350c?version=3.44.3'
		},
		{
			name: 'dirtyStore',
			path: '/repl/dirty',
			url: 'https://svelte.dev/repl/f8f16d509e94450d936fd45c78e12771?version=3.44.3'
		},
		{
			name: 'busyStore',
			path: '/repl/busy',
			url: 'https://svelte.dev/repl/798016510eab4c5092ac70ca23c8c866?version=3.44.3'
		},
		{
			name: 'autoSave',
			path: '/repl/autosave',
			url: 'https://svelte.dev/repl/6ca8cf8052434b9bb5846a1204f3301a?version=3.44.3'
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
