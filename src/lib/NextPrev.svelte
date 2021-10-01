<script>
	export let prev;
	export let next;
</script>

<div id="next" class="flex pt-2 border-t-2">
	<div id="pr" class="w-2/4 flex-1 hover:text-green-800">
		{#if prev != undefined}
			<i class="fa fa-caret-left fa-sm" />
			<a href="/{prev.link}" class="text-xl font-light"
				>{prev.blog.title} <span class="font-light text-sm">[{prev.blog.date}]</span>
			</a>
		{:else}
			<span class="text-xl font-light text-green-800">Oldest</span>
		{/if}
	</div>
	<div id="nxt" class="w-2/4 hover:text-red-800 text-right">
		{#if next != undefined}
			<a href="/{next.link}" class="text-xl font-light"
				>{next.blog.title} <span class="font-light text-sm">[{next.blog.date}]</span></a
			>
			<i class="fa fa-caret-right fa-sm" />
		{:else}
			<span class="float-right text-xl font-light text-red-800">Newest</span>
		{/if}
	</div>
</div>
