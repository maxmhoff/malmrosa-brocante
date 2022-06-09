<script lang="ts">
	import gsap from 'gsap/dist/gsap';
	import Draggable from 'gsap/dist/Draggable';
	import InertiaPlugin from 'gsap/dist/InertiaPlugin';
	import { onMount } from 'svelte';

	let slider: HTMLDivElement;
	let cards: HTMLLIElement[];
	cards = [];
	let activeCard = 0;
	const cardWidth = 464;
	const margin = 32;
	let containerWidth = 0;

	let draggable: gsap.plugins.DraggableInstance;

	const throttleDuration = 100;
	let throttleIsActive = false;

	function handleOnThrowUpdate() {
		if (!throttleIsActive) {
			throttleIsActive = true;
			setTimeout(() => (throttleIsActive = false), throttleDuration);
			return (activeCard = Math.round(Math.abs(this.x) / (cardWidth + margin)));
		}
	}

	function handleClick(el) {
		const idx = cards.indexOf(el.target);
		if (idx !== -1) {
			return setActiveCard(idx, 0.7);
		}
	}

	function setActiveCard(idx: number, duration?: number) {
		if (draggable[0]?.tween) {
			draggable[0].tween.kill();
		}
		gsap.to(slider, {
			duration: duration ? duration : 0,
			x: () => -Math.abs(idx * (cardWidth + margin)),
			onUpdate: () => (activeCard = idx),
		});
	}

	onMount(() => {
		containerWidth = (cards.length - 1) * (cardWidth + margin);
		gsap.registerPlugin(Draggable, InertiaPlugin);
		draggable = Draggable.create(slider, {
			throwProps: true,
			type: 'x',
			trigger: slider,
			bounds: { minX: 0, maxX: -Math.abs(containerWidth) },
			inertia: true,
			onClick: handleClick,
			onThrowUpdate: handleOnThrowUpdate,
			snap: { x: gsap.utils.snap(cardWidth + margin) },
		});
		if (cards.length >= 3) {
			setActiveCard(1);
		}
	});

	const products = [
		{
			description:
				'Lancashire chalk and cheese bavarian bergkase. Monterey jack monterey jack paneer cheese strings bavarian bergkase port-salut cheese and biscuits airedale. Red leicester rubber cheese st. agur blue cheese bocconcini the big cheese halloumi everyone loves fromage. Everyone loves emmental st. agur blue cheese camembert de normandie cheddar st. agur blue cheese port-salut.',
			image: {
				filename:
					'https://images.unsplash.com/photo-1560295888-44704dea4ea7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
				alt: 'furniture',
			},
			title: 'Stole',
			price: 250,
		},
		{
			description: 'something something',
			image: {
				filename:
					'https://images.unsplash.com/photo-1560088032-d21fe602f4bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
				alt: 'furniture',
			},
			title: 'Tingeltangel pr. stk. 10,-',
			price: 50,
		},
		{
			description: 'Ostestol med meget ost',
			image: {
				filename:
					'https://images.unsplash.com/photo-1601392740426-907c7b028119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
				alt: 'furniture',
			},
			title: 'Ostestol fra 1800-tallet',
			price: 120,
		},
		{
			description:
				'Lancashire chalk and cheese bavarian bergkase. Monterey jack monterey jack paneer cheese strings bavarian bergkase port-salut cheese and biscuits airedale. Red leicester rubber cheese st. agur blue cheese bocconcini the big cheese halloumi everyone loves fromage. Everyone loves emmental st. agur blue cheese camembert de normandie cheddar st. agur blue cheese port-salut.',
			image: {
				filename:
					'https://images.unsplash.com/photo-1531919948234-852fce12468f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
				alt: 'furniture',
			},
			title: 'andre stole',
			price: 300,
		},
		{
			description: 'something something',
			image: {
				filename:
					'https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=696&q=80',
				alt: 'furniture',
			},
			title: 'Skrivemaskine',
			price: 1200,
		},
		{
			description: 'Ostestol med meget ost',
			image: {
				filename:
					'https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
				alt: 'furniture',
			},
			title: 'Vækkeur',
			price: 450,
		},
		{
			description:
				'Lancashire chalk and cheese bavarian bergkase. Monterey jack monterey jack paneer cheese strings bavarian bergkase port-salut cheese and biscuits airedale. Red leicester rubber cheese st. agur blue cheese bocconcini the big cheese halloumi everyone loves fromage. Everyone loves emmental st. agur blue cheese camembert de normandie cheddar st. agur blue cheese port-salut.',
			image: {
				filename:
					'https://images.unsplash.com/photo-1457608135803-4827addc43e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=763&q=80',
				alt: 'furniture',
			},
			title: 'Fransk kamera',
			price: 99999,
		},
	];
</script>

<div id="products" class="products">
	<div class="products__wrapper">
		<div class="products__content">
			<div class="products__scrollable-area">
				<ul bind:this={slider} class="products__slider">
					{#each products as product, i}
						<li
							bind:this={cards[i]}
							class="products__card"
							class:products__card--active={i === activeCard}
							class:products__card--prev={i - activeCard < 0}
							class:products__card--next={i - activeCard > 0}
							draggable="true"
						>
							<img class="products__image" src={product.image.filename} alt={product.image.alt} />
							{#if product.title}<p class="products__title">{product.title}</p>{/if}
							{#if product.price}<p class="products__price">{product.price},-</p>{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	$card-width-desktop: 464px;
	$card-margin: 32px;

	.products {
		height: 100vh;
		padding: 2rem 0;
		width: 100%;
		background-color: rgb(170, 216, 193);

		&__wrapper {
			display: flex;
			width: 100%;
			height: 100%;
			padding: 2rem 0;
			top: 0;
			left: 0;
			justify-content: center;
			align-items: center;
			z-index: 1;
			overflow: hidden;
		}

		&__content {
			width: 100%;
			height: fit-content;
			margin-left: auto;
			margin-right: auto;
		}

		&__slider {
			display: grid;
			grid-auto-flow: column;
			gap: $card-margin;
			padding: 0 $card-margin;
			white-space: nowrap;
			padding-bottom: 1rem;
			scroll-padding-inline: $card-margin;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		&__card {
			position: relative;
			display: inline-block;
			background-color: white;
			width: $card-width-desktop;
			height: 656px;
			max-width: 28rem;
			max-height: 40rem;
			border: 0.5rem solid white;
			border-radius: 4%;
			overflow: hidden;
			transform-origin: center;
			scroll-snap-align: start;
			transition: transform 0.7s ease;

			&:first-child {
				margin-left: calc(50vw - $card-width-desktop / 2 - $card-margin);
			}

			&--prev {
				transform: scale(0.8) rotate(-3deg);
			}

			&--active {
				transform: scale(1);
				& .products__price {
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
		}

		&__title {
			font-size: 3rem;
			font-family: 'Shadows Into Light';
			pointer-events: none;
		}

		&__price {
			$transparent-white: rgba(255, 255, 255, .8);
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
			background-size: 228px 8px;
			background-position: -25px -24px;
			position: absolute;
			width: 150px;
			text-align: center;
			padding: 3px 16px;
			font-size: 1.7rem;
			top: 1.9rem;
			right: -1.6rem;
			transform: rotate(19deg);
			font-family: 'Patrick Hand';
			opacity: 0;
		}
	}
</style>
