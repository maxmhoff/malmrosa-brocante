<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import { gsap } from 'gsap/dist/gsap.js';
	import { Draggable } from 'gsap/dist/Draggable.js';
	import { InertiaPlugin } from 'gsap/dist/InertiaPlugin.js';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';

	import type { ProductProps } from 'src/model/props';

	export let blok: ProductProps;

	let innerWidth: number;
	let slider: HTMLUListElement;
	let cards: HTMLLIElement[];
	let activeCard = 0;
	let cardWidth = 464;
	let margin = 32;
	let containerWidth = 0;

	cards = [];

	let helper: HTMLImageElement;

	const throttleDuration = 100;
	let throttleIsActive = false;

	const onResize = () => {
		killAnimations();
		updateSizes();
		initDraggable();
		initHelper();
	};

	const updateSizes = () => {
		if (innerWidth >= 1024) {
			cardWidth = 464;
			margin = 32;
		} else {
			cardWidth = 316;
			margin = 24;
		}
	};

	function handleOnThrowUpdate() {
		if (!throttleIsActive) {
			throttleIsActive = true;
			setTimeout(() => (throttleIsActive = false), throttleDuration);
			return (activeCard = Math.round(Math.abs(this.x) / (cardWidth + margin)));
		}
	}

	function handleClick(e) {
		const idx = cards.indexOf(e.target);
		if (idx !== -1) {
			return setActiveCard(idx, 0.7);
		}
	}

	const setActiveCard = (idx: number, duration?: number) => {
		if (gsap.getTweensOf(slider)) {
			gsap.getTweensOf(slider).forEach((tween: gsap.core.Tween) => tween.kill());
		}
		gsap.to(slider, {
			duration: duration ? duration : 0,
			x: () => -Math.abs(idx * (cardWidth + margin)),
			onUpdate: () => (activeCard = idx),
		});
	};

	const initDraggable = () => {
		containerWidth = (cards.length - 1) * (cardWidth + margin);
		Draggable.create(slider, {
			id: 'draggable',
			throwProps: true,
			type: 'x',
			trigger: slider,
			bounds: { minX: 0, maxX: -Math.abs(containerWidth), minY: 0, maxY: 0 },
			inertia: true,
			onClick: handleClick,
			onThrowUpdate: handleOnThrowUpdate,
			snap: { x: gsap.utils.snap(cardWidth + margin) },
		});
		setActiveCard(activeCard);
	};

	const initHelper = () => {
		const helperTimeline = gsap
			.timeline()
			.to(helper, { x: -50, delay: 1, duration: 0.2 })
			.to(helper, { x: 50, duration: 0.4 })
			.to(helper, { x: 0, duration: 0.2 })
			.to(helper, { opacity: 0 });
		ScrollTrigger.create({
			id: 'helperScrollTrigger',
			animation: helperTimeline,
			trigger: helper,
			start: 'bottom bottom',
			toggleActions: 'restart none none none'
		});
	};
	
	const killAnimations = () => {
		gsap.set(helper, {clearProps: true});
		ScrollTrigger.getById('helperScrollTrigger')?.kill();
		Draggable.get('draggable')?.kill();
	}

	onMount(() => {
		gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);
		updateSizes();
		initDraggable();
		initHelper();
		if (cards.length >= 3) {
			setActiveCard(1);
		}
		return () => {
			killAnimations();
		};
	});
</script>

<svelte:window bind:innerWidth on:resize={onResize} />

<div
	use:storyblokEditable={blok}
	id="products"
	class="products"
	style="background-color: {blok.background_color.color}"
>
	<h2 class="products__title">{blok.title}</h2>
	<div class="products__grid">
		<p class="products__description">
			{blok.description}
		</p>
	</div>
	<div class="products__scrollable-area">
		<ul bind:this={slider} class="products__slider">
			{#each blok.products as product, i}
				<li
					bind:this={cards[i]}
					class="products__card"
					class:products__card--active={i === activeCard}
					class:products__card--prev={i - activeCard < 0}
					class:products__card--next={i - activeCard > 0}
					draggable="true"
				>
					<img
						class="products__image"
						src={product.image.filename + '/m/0x580'}
						alt={product.image.alt}
					/>
					{#if product.title}<p class="products__card-title">{product.title}</p>{/if}
					{#if product.price}<p class="products__card-price">{product.price},-</p>{/if}
				</li>
			{/each}
		</ul>
		<img
			bind:this={helper}
			class="products__slider-helper"
			src="/icons/swipe-arrow.svg"
			alt="a finger with arrows to each side, to indicate area is swipeable "
		/>
	</div>
</div>

<style lang="scss">
	$card-width-mobile: 316px;
	$card-height-mobile: 460px;
	$card-margin-mobile: 8px;
	$card-width-desktop: 464px;
	$card-height-desktop: 656px;
	$card-margin-desktop: 16px;

	.products {
		width: 100%;
		background-color: rgb(170, 216, 193);
		padding: 4rem 0 6rem;
		overflow-x: hidden;
		@media screen and (min-width: 1024px) {
			padding: 6rem 0 8rem;
		}

		&__title {
			text-align: left;
			width: 100%;
			font-family: 'Shadows Into Light Two', Georgia, serif;
			font-size: 4rem;
			padding-left: 1rem;
			color: white;

			@media screen and (min-width: 1024px) {
				padding: 0;
				text-align: center;
				font-size: 6rem;
			}
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			row-gap: 2rem;
			padding: 2rem 1rem;

			@media screen and (min-width: 1024px) {
				grid-template-columns: repeat(12, minmax(0, 1fr));
				margin-left: auto;
				margin-right: auto;
				column-gap: 1rem;
				row-gap: 3rem;
				max-width: 1280px;
				padding: 3rem 1rem;
			}
		}

		&__description {
			color: white;
			font-family: 'Source Sans Pro', Helvetica, sans-serif;
			grid-column: span 4 / span 4;
			font-size: 1.25rem;
			line-height: 1.7;
			@media screen and (min-width: 1024px) {
				grid-column: span 6 / span 6;
				grid-column-start: 4;
			}
		}

		&__scrollable-area {
			position: relative;
		}

		&__slider {
			display: grid;
			grid-auto-flow: column;
			white-space: nowrap;
			gap: $card-margin-mobile;
			padding: 0 $card-margin-mobile;
			scroll-padding-inline: $card-margin-mobile;

			@media screen and (min-width: 1024px) {
				gap: $card-margin-desktop;
				padding: 0 $card-margin-desktop;
				scroll-padding-inline: $card-margin-desktop;
			}

			&::-webkit-scrollbar {
				display: none;
			}
		}

		&__slider-helper {
			position: absolute;
			$icon-size: 50px;
			height: $icon-size;
			left: calc(50% - $icon-size / 2);
			bottom: calc(($icon-size + 1rem) * -1);

			@media screen and (min-width: 500px) {
				display: none;
			}
		}

		&__card {
			position: relative;
			display: inline-block;
			background-color: white;
			width: $card-width-mobile;
			height: $card-height-mobile;
			border: 0.5rem solid white;
			border-radius: 4%;
			overflow: hidden;
			transform-origin: center;
			scroll-snap-align: start;
			transition: transform 0.7s ease;

			@media screen and (min-width: 1024px) {
				width: $card-width-desktop;
				height: $card-height-desktop;
			}
			&:first-child {
				margin-left: calc(50vw - $card-width-mobile / 2 - $card-margin-mobile - 8px);

				@media screen and (min-width: 1024px) {
					margin-left: calc(50vw - $card-width-desktop / 2 - $card-margin-desktop);
				}
			}

			&--prev {
				transform: scale(0.8) rotate(-3deg);
			}

			&--active {
				transform: scale(1);
				& .products__card-price {
					opacity: 1;
					transition: opacity 0.2s ease-in-out;
					transition-delay: 0.5s;
				}
			}

			&--next {
				transform: scale(0.8) rotate(3deg);
			}
		}

		&__image {
			width: 100%;
			aspect-ratio: 4 / 5;
			object-fit: cover;
			border-radius: 2% 2% 0 0;
			object-position: center;
			margin-bottom: 0.75rem;
			pointer-events: none;

			@supports not (aspect-ratio: auto) {
				height: 395px;
				@media screen and (min-width: 1024px) {
					height: 580px;
				}
			}
		}

		&__card-title {
			min-height: 50px;
			font-family: 'Shadows Into Light Two', Georgia, serif;
			font-size: 2.3rem;
			pointer-events: none;
			white-space: nowrap;
  			overflow: hidden;
  			text-overflow: ellipsis;

			@media screen and (min-width: 1024px) {
				min-height: 58px;
				font-size: 3rem;
			}
		}

		&__card-price {
			$transparent-white: rgba(255, 255, 255, 0.8);
			position: absolute;
			text-align: center;
			padding: 3px 16px;
			transform: rotate(19deg);
			font-family: 'Patrick Hand';
			opacity: 0;
			background: linear-gradient(
					45deg,
					transparent 30%,
					$transparent-white 30%,
					$transparent-white 70%,
					transparent 70%
				),
				linear-gradient(
					-45deg,
					transparent 30%,
					$transparent-white 30%,
					$transparent-white 70%,
					transparent 70%
				);
			width: 100px;
			top: 1.1rem;
			right: -1.7rem;
			background-position: -14px -24px;
			background-size: 154px 8px;
			font-size: 1.3rem;

			@media screen and (min-width: 1024px) {
				width: 150px;
				top: 1.9rem;
				right: -1.6rem;
				background-size: 228px 8px;
				background-position: -25px -24px;
				font-size: 1.7rem;
			}
		}
	}
</style>
