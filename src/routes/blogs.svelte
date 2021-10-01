<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/blogs.json');
		const values = (await res.json()).content;
		if (res.ok) {
			return {
				props: { values }
			};
		}
	}
</script>

<script>
	export let values;
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/texme@1.0.0"></script>
	<title>Blogs</title>
</svelte:head>

<div id="blogs-seg" class="md:pl-80 md:pt-1 md:pb-3 md:text-left pl-4">
	<h1 class="md:text-4xl md:mb-5 text-pink-800">Blogs:</h1>
	<ul class="list-disc md:px-10">
		{#each values as value}
			<!--I don't understand regex enough to do this more beautifully-->
			<li class="p-1">
				<a
					class="text-lg text-blue-900 hover:font-bold"
					href="/{value.date}-{value.title
						.replace(/[!?] */g, '')
						.replace(/ /g, '_')
						.toLowerCase()}">{value.title} [{value.date}]</a
				>
			</li>
		{/each}
	</ul>
</div>
