<script context="module">
	import { storyblokInit, apiPlugin } from '@storyblok/svelte';
	import Page from '../components/page.svelte';
	import Hero from '../components/bloks/hero.svelte';
	import Products from '../components/bloks/products.svelte';
	import Contact from '../components/bloks/contact.svelte';
	import Navigation from '../components/navigation.svelte';

	storyblokInit({
		accessToken:
			import.meta.env.MODE === 'development'
				? import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN
				: import.meta.env.VITE_STORYBLOK_PUBLIC_TOKEN,
		use: [apiPlugin],
        bridge: true,
		components: {
			page: Page,
			hero: Hero,
			products: Products,
			contact: Contact,
		},
	});
</script>

<main>
	<Navigation />
	<slot />
</main>

<style lang="scss" global>
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}

	/* HTML5 display-role reset for older browsers */

	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section {
		display: block;
	}

	body {
		line-height: 1;
	}

	ol,
	ul {
		list-style: none;
	}

	blockquote,
	q {
		quotes: none;
	}

	blockquote {
		&:before,
		&:after {
			content: '';
			content: none;
		}
	}

	q {
		&:before,
		&:after {
			content: '';
			content: none;
		}
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	body {
		overflow: overlay;
	}

	a {
		color: white;
		text-decoration: none;
		&:visited {
			color: inherit;
		}
	}

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
