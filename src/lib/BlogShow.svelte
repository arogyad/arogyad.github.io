<script>
	import MoreContent from './MoreContent.svelte';
	export let attributes;
	export let body;
	export let next;
	export let prev;
	export let index;
</script>

<svelte:head>
	<title>{attributes.title}</title>
</svelte:head>

<div id="blog" class="md:pl-72 md:pr-10 md:pt-10 p-10 md:text-justify">
	<h1 class="md:">{attributes.title}</h1>
	<span class="font-light">{attributes.date}</span>
	{@html body}
	<MoreContent {next} {prev} {index} />
</div>
