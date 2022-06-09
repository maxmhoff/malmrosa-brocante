<script lang="ts">
	import gsap from 'gsap/dist/gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);
	let contact: HTMLDivElement;
	let image: HTMLImageElement;

	let scrollTrigger: gsap.plugins.ScrollTriggerInstance;
	let innerWidth: number;

	const onResize = () => {
        if (scrollTrigger) {
            gsap.set(image, {clearProps: true});
            scrollTrigger.kill();
        }
        if (innerWidth >= 1024) {
            initAnimation();
        }
    };

	const initAnimation = () => {
		const animation = gsap.fromTo(
			image,
			{
				y: 800,
				rotate: '10deg',
			},
			{
				y: -75,
				rotate: '-2deg',
			},
		);
		scrollTrigger = ScrollTrigger.create({
			trigger: contact,
			animation: animation,
			start: 'top bottom',
			end: 'top top',
			scrub: true,
		});
	};

	onMount(() => {
        if (innerWidth >= 1024) {
            initAnimation();
        }

		return () => {
			scrollTrigger?.kill();
		};
	});
</script>

<svelte:window bind:innerWidth on:resize={onResize} />

<div bind:this={contact} id="contact" class="contact">
	<div class="contact__grid">
		<h2 class="contact__title">Mød Sophie</h2>
		<img
			bind:this={image}
			class="contact__image"
			src="https://images.unsplash.com/photo-1591084728795-1149f32d9866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
			alt="person"
		/>
		<div class="contact__content">
			<p class="contact__description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt saepe, labore quidem, minus
				officia ea incidunt cum aperiam maiores vel excepturi aspernatur. Natus fugit adipisci
				eligendi, nam eveniet voluptatem ex. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Dolores est a quam maiores adipisci non officiis ipsam voluptatum consectetur sapiente,
				excepturi ex reiciendis expedita assumenda, \n facilis atque obcaecati earum deserunt. Lorem,
				ipsum dolor sit amet consectetur adipisicing elit. Distinctio eveniet labore quod, nulla
				laboriosam tempora ex sint et quas reprehenderit natus expedita voluptas illo perferendis nam
				mollitia? Repellendus, sunt inventore.
			</p>
			<div class="contact__some">
				<a class="contact__icon-link" href="https://www.instagram.com/malmrosa.brocante/" target="_blank" rel="noopener noreferrer">
					<img src="/icons/instagram.svg" height="36" width="36" alt="facebook icon" />
				</a>
				<a class="contact__icon-link" href="https://www.facebook.com/sophie.malmros.5" target="_blank" rel="noopener noreferrer">
					<img src="/icons/facebook.svg" height="36" width="36" alt="facebook icon" />
				</a>
				<span>|</span> 
				<a href="tel:29807525">tlf: 8888 8888</a>
				<span>|</span> 
				<a href="mailto:malmrosa.brocante@gmail.com">malmrosa.brocante@gmail.com</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.contact {
		z-index: 1;
		min-height: 100vh;
		width: calc(100% - 1.5rem);
		background-color: #dd8585;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 0.75rem;
		overflow-x: hidden;

		@media screen and (min-width: 768px) {
			width: calc(100% - 8rem);
			padding: 0 4rem;
		}

		&__grid {
			width: 100%;
			max-width: 1280px;
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 1rem;
			overflow-y: hidden;
			padding: 10px;

			@media screen and (min-width: 1024px) {
				grid-template-columns: repeat(12, minmax(0, 1fr));
				column-gap: 1rem;
				row-gap: 3rem;
			}
		}

		&__title {
			font-family: 'Shadows Into Light';
			font-size: 4rem;
			color: white;
			grid-column: span 4 / span 4;

			@media screen and (min-width: 1024px) {
				font-size: 6rem;
				grid-column: span 6 / span 6;
				grid-column-start: 6;
			}
		}

		&__image {
			width: 100%;
			aspect-ratio: 3 / 4;
			object-fit: cover;
			grid-column: span 4 / span 4;
			grid-template-rows: repeat(4, minmax(0, 1fr));
			border: .5rem solid white;
			border-radius: 1rem;
			max-width: 444px;

			@media screen and (min-width: 1024px) {
				grid-column: span 4 / span 4;
				grid-column-start: 1;
			}
		}

		&__content {
			color: white;
			font-family: 'Source Sans Pro';
			font-size: 1.25rem;
			line-height: 1.75;
			grid-column: span 4 / span 4;

			@media screen and (min-width: 1024px) {
				grid-column: span 6 / span 6;
				grid-column-start: 6;
			}
		}

		&__description {
			margin-bottom: 3rem;
		}

		&__some {
			font-size: 20px;
			gap: 1rem;
			display: flex;
			align-items: center;
		}

		&__icon-link {
			height: 36px;
		}
	}
</style>
