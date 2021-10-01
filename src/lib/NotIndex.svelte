<script>
	export let prev;
	export let next;
	const index = false;
</script>

<div class="float-left font-normal text-2xl pt-2 pb-1 border-t-2">More Similar Blogs:</div>
<div class="ml-4">
	<ul>
		{#if prev != undefined}
			<li>
				<a sveltekit:prefetch href="/{prev.link}" class="text-xl font-light pb-3"
					>{prev.blog.title} [{prev.blog.date}]</a
				>
			</li>
		{:else}
			<li><span class="text-xl font-light text-red-800 pb-3">Oldest</span></li>
		{/if}
		{#if next != undefined}
			<li>
				<a sveltekit:prefetch href="/{next.link}" class="text-xl font-light pb-3"
					>{next.blog.title} [{next.blog.date}]</a
				>
			</li>
		{:else}
			<li><span class="text-xl font-light text-red-800 pb-3">Newest</span></li>
		{/if}
	</ul>
</div>
