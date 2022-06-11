<script>
	import Navigation from '../components/navigation.svelte';
	import Contact from '../components/bloks/contact.svelte';
	import Hero from '../components/bloks/hero.svelte';
	import Products from '../components/bloks/products.svelte';
</script>

<main>
	<Navigation />
	<Hero />
	<Products />
	<Contact />
</main>

<style>
	:root::-webkit-scrollbar {
		width: 0.6em;
		height: 0.6em;
		background-color: transparent;
		margin-block: 0.5rem;
	}

	:root::-webkit-scrollbar-track {
		background-color: rgb(255, 245, 249);
		border-radius: 100vw;
		margin-block: 0.5rem;
	}

	:root::-webkit-scrollbar-thumb {
		background-color: rgb(255, 146, 188);
		height: 20px;
		border-radius: 100vw;
	}
</style>
