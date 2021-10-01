<script>
	export let prev;
	export let next;
</script>

<div class="ml-4">
	{#if prev != undefined}
		<a sveltekit:prefetch href="/{prev.link}" class="text-xl float-left font-light pb-3">Prev</a>
	{:else}
		<span class="text-xl font-light text-red-800 pb-3 float-left">Oldest</span>
	{/if}
	{#if next != undefined}
		<a sveltekit:prefetch href="/{next.link}" class="text-xl font-light pb-3 float-right">Next</a>
	{:else}
		<span class="text-xl font-light text-red-800 pb-3 float-right">Newest</span>
	{/if}
</div>
