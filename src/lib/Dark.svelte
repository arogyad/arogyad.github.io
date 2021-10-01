<script>
	function toogleTheme() {
		window.document.body.classList.toggle('dark');
	}
</script>

<button on:click={toogleTheme} class="float-right"> a </button>
