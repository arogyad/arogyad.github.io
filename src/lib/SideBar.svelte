<svelte:head>
	<script src="https://use.fontawesome.com/c5d5ee5034.js"></script>
</svelte:head>

<div
	id="sidebar"
	class="md:h-full md:w-60 md:fixed bg-green-900 dark:bg-black text-white duration-300 text-center text-sm"
>
	<div id="items" class="py-4 md:pt-40 grid text-center">
		<a href="/" class="font-bold text-6xl font-serif hover:underline text-white">Arogya Dahal</a>
		<span class="font-extralight p-5 text-white">Welcome to my blog!</span>
		<a href="/" class="font-normal p-1 text-xl text-white hover:text-2xl duration-300">Home</a>
		<a href="/about" class="font-normal md:pb-1 text-xl text-white hover:text-2xl duration-300"
			>About</a
		>
		<a href="/blogs" class="font-normal text-xl text-white hover:text-2xl duration-300">Blogs</a>
	</div>
	<a href="https://github.com/arogyad/" target="_blank"
		><i class="fa fa-github fa-2x hover:text-4xl text-white duration-200 md:ml-20" /></a
	>
	<a href="https://instagram.com/arogyad/" target="_blank"
		><i class="fa fa-instagram fa-2x hover:text-4xl text-white duration-200 m-4" /></a
	>
</div>

<style>
	@media (min-width: 48em) {
		#sidebar {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			width: 15rem;
			text-align: left;
		}
	}
</style>
