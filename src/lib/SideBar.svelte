<svelte:head>
	<script src="https://use.fontawesome.com/c5d5ee5034.js"></script>
</svelte:head>

<div
	id="sidebar"
	class="md:h-full md:w-60 md:fixed bg-red-300 text-white duration-300 text-center text-sm"
>
	<div id="items" class="md:pt-40 grid text-center">
		<a href="/" class="font-bold text-6xl font-serif hover:underline text-white">Arogya Dahal</a>
		<span class="font-extralight p-5 text-white">Welcome to my blog!</span>
		<a href="/" class="font-normal p-1 text-xl text-white hover:text-2xl duration-300">Home</a>
		<a href="/about" class="font-normal md:pb-1 text-xl text-white hover:text-2xl duration-300"
			>About</a
		>
		<a href="/blogs" class="font-normal text-xl text-white hover:text-2xl duration-300">Blogs</a>
	</div>
	<a href="https://github.com/arogyad/" target="_blank"
		><i class="fa fa-github fa-2x hover:text-4xl text-white duration-200 ml-3" /></a
	>
	<a href="https://www.instagram.com/arogya_dahal/" target="_blank"
		><i class="fa fa-instagram fa-2x hover:text-4xl text-white duration-200 m-4" /></a
	>
</div>

<style>
	#sidebar {
		background-color: #0f302a;
	}
</style>
