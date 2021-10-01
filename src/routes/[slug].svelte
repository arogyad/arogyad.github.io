<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch(`/${page.params.slug}.json`);
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
		index: false
	};
</script>

<BlogShow {...value} />
