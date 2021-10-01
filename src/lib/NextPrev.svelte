<script>
	export let prev;
	export let next;
</script>

<div id="next" class="pl-80 p-10">
	{#if prev != undefined}
		<a href="/{prev.link}" class="float-left text-xl font-light">{prev.blog.title}</a>
	{:else}
		<span class="float-left text-xl font-light text-red-800">Oldest</span>
	{/if}
	{#if next != undefined}
		<a href="/{next.link}" class="float-right text-xl font-light">{next.blog.title}</a>
	{:else}
		<span class="float-right text-xl font-light text-red-800">Newest</span>
	{/if}
</div>
