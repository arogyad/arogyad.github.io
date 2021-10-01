<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/from_index.json`);
		const values = (await res.json()).content;
		if (res.ok) {
			return {
				props: { values }
			};
		}
	}
</script>

<script>
	import BlogShow from '$lib/BlogShow.svelte';
	export let values;
	$: value = {
		body: values.out.body,
		attributes: values.out.attributes,
		next: values.next,
		prev: values.prev,
		index: true
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<BlogShow {...value} />
