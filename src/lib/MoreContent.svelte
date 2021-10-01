<script>
	export let prev;
	export let next;
	/* export let index; */
	import NotIndex from './NotIndex.svelte';
	/* import Index from '$lib/Index.svelte'; */
</script>

<div id="next" class="grid pt-10">
	<!--	{#if index}
		<Index {prev} {next} />
	{:else}
		<NotIndex {prev} {next} />
{/if}-->
	<NotIndex {prev} {next} />
</div>
