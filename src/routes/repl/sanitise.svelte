<script>
	import { chain } from 'svelte-chainstore';

	const fitlhyMessage = 'I like banana and peach fruit salad.';
	const badWords = {
		banana: '🍌',
		melon: '🍈',
		peach: '🍑',
		apple: '🍎',
		eggplant: '🍆',
		taco: '🌮',
		pear: '🍐'
	};
	const badWordList = Object.keys(badWords);

	function cleanBadWords(text) {
		let cleanText = text;
		for (let i = 0; i < badWordList.length; i++) {
			const badWord = badWordList[i];
			cleanText = cleanText.replace(badWord, badWords[badWord]);
		}
		return cleanText;
	}

	const text = chain(cleanBadWords)
		.sync() //Write modified data into store at this point in the chain
		.store(fitlhyMessage);
</script>

<textarea bind:value={$text} rows="5" cols="80" />

<p>Try to type any of these bad words:<br /> {badWordList.join(', ')}</p>
