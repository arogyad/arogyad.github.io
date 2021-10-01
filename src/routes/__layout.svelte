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
</svelte:head>

<SideBar />
<Button />
<slot />
