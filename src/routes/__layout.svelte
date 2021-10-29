<script>
	import '../app.postcss';
	import Button from '$lib/Dark.svelte';
	import SideBar from '$lib/SideBar.svelte';
	import '../conf.css';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/base16/gruvbox-light-medium.min.css"
		integrity="sha512-YOLBTZnIcnB3qm7sPFlGHx0no3yEGWvVTAI9uA6uaZGUBQui/DP9vh0FLmCJbOL5TxHJWwaiI23cCEJsmIeMew=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.13.20/dist/katex.css"
		integrity="sha384-wjt/jHbKw4nAJqVnNc7zWaJBA5QFR96PGZI1Jsx+qV7jXW4eFbTbXcKXTI3T5k6f"
		crossorigin="anonymous"
	/>
	<script
		defer
		src="https://cdn.jsdelivr.net/npm/katex@0.13.20/dist/katex.js"
		integrity="sha384-beJRVDYZ96syXlHODMSPeqGcca1LyrYLLgXf5tHkiGKkqaM7Bwr01/V3fGSWoDU1"
		crossorigin="anonymous"></script>
</svelte:head>
<SideBar />
<Button />
<slot />
