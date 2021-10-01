<script>
	import NextPrev from './NextPrev.svelte';
	export let attributes;
	export let body;
	export let next;
	export let prev;
</script>

<svelte:head>
	<title>{attributes.title}</title>
</svelte:head>

<div id="blog" class="md:pl-72 md:pr-10 md:pt-10 p-10 md:text-justify">
	<h1 class="md:">{attributes.title}</h1>
	<span class="font-light">{attributes.date}</span>
	{@html body}
	<div id="pad" class="pt-8">
		<NextPrev {next} {prev} />
	</div>
</div>
