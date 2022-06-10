<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let hero: HTMLDivElement;
	let image: HTMLImageElement;
	let content: HTMLDivElement;

	let scrollTriggers: gsap.plugins.ScrollTriggerInstance[] = [];

	onMount(() => {
		const parallaxAnim = gsap.fromTo(
			image,
			{
				yPercent: 0,
			},
			{
				yPercent: 50,
				ease: 'none',
			},
		);
		const fadeContent = gsap.fromTo(
			content,
			{
				opacity: 1,
			},
			{
				opacity: 0,
			},
		);

		scrollTriggers.push(
			ScrollTrigger.create({
				animation: parallaxAnim,
				trigger: hero,
				start: 'top top',
				end: 'center top',
				pin: image,
				scrub: true,
			}),
		);
		scrollTriggers.push(
			ScrollTrigger.create({
				trigger: hero,
				start: 'top top',
				end: 'center top',
				pin: content,
			}),
		);
		scrollTriggers.push(
			ScrollTrigger.create({
				animation: fadeContent,
				trigger: hero,
				start: 'bottom 30%',
				end: 'bottom top',
				scrub: true,
			}),
		);
		return () => scrollTriggers.forEach((st) => st.kill());
	});
</script>

<div bind:this={hero} id="hero" class="hero">
	<img
		bind:this={image}
		class="hero__image"
		src="https://images.unsplash.com/photo-1527498326504-ab06d60f3cc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
		alt="hero"
	/>
	<div bind:this={content} class="hero__content">
		<h1 class="hero__title">Malmrosa Brocante</h1>
	</div>
</div>
<div class="introduction">
	<div class="introduction__container">
		<div class="introduction__grid">
			<p class="introduction__text">
				Velkommen til min butik med franske fund. Hos Malmrosa finder du smukke håndplukkede ting
				fra brocantemarkeder i Sydfrankrig og Belgien.
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.hero {
		position: relative;
		width: 100%;
		height: 100vh;
		background-size: cover;
		background-image: url('https://images.unsplash.com/photo-1570475735025-6cd1cd5c779d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
		pointer-events: none;

		&__image {
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			height: 100vh;
			object-fit: cover;
		}

		&__content {
			display: flex;
			position: absolute;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100vh;
			margin-left: auto;
			margin-right: auto;
			z-index: 2;
		}

		&__title {
			color: white;
			text-align: center;
			font-size: 5rem;
			font-family: 'Shadows Into Light';

			@media screen and (min-width: 768px) {
				font-size: 8rem;
			}
		}
	}
	.introduction {
		position: relative;
		width: 100%;
		height: 100.1vh;

		&__container {
			position: absolute;
			background-color: #9eaed7;
			top: 0;
			left: 0;
			width: 100%;
			height: 100.1vh;
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__grid {
			padding: 2rem;
			max-width: 1280px;
			display: grid;
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 1rem;

			@media screen and (min-width: 1024px) {
				grid-template-columns: repeat(12, minmax(0, 1fr));
				column-gap: 1rem;
				row-gap: 3rem;
			}
		}

		&__text {
			color: white;
			font-family: 'Source Sans Pro';
			font-size: 1.9rem;
			line-height: 1.7;
			grid-column: span 4 / span 4;

			@media screen and (min-width: 1024px) {
				grid-column: span 6 / span 6;
				grid-column-start: 4;
			}
		}
	}
</style>
