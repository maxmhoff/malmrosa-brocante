<script context="module">
	import { useStoryblokApi } from '@storyblok/svelte';

	export async function load() {
		const storyblokApi = useStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/navigation', {
			version: import.meta.env.MODE === 'development' ? 'draft' : 'published',
		});
		return {
			props: data.story.content,
		};
	}
</script>

<script lang="ts">
	import { gsap, Power1 } from 'gsap/dist/gsap.js';
	import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin.js';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
	import { onMount } from 'svelte';

	let props;

	let navbar: HTMLDivElement;
	let currentScrollY: number;
	let previousScrollY: number;

	const hideNavTimeline = gsap.timeline({ paused: true });

	const handleScroll = () => {
		if (currentScrollY > previousScrollY) {
			hideNavTimeline.play();
		} else {
			hideNavTimeline.reverse();
		}
		previousScrollY = currentScrollY;
	};

	gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
	const slideDuration = 1;

	const handleClick = (id: string) => {
		switch (id.toLowerCase()) {
			case '#contact':
				return gsap.to(window, {
					scrollTo: '#contact',
					duration: slideDuration,
					ease: Power1.easeInOut,
				});
			case '#hero':
				return gsap.to(window, {
					scrollTo: '#hero',
					duration: slideDuration,
					ease: Power1.easeInOut,
				});
			case '#products':
				return gsap.to(window, {
					scrollTo: '#products',
					duration: slideDuration,
					ease: Power1.easeInOut,
				});
		}
	};

	const initAnimations = () => {
		hideNavTimeline.to(navbar, {
			yPercent: -200,
			duration: 0.3,
		});
	};

	onMount(() => {
		initAnimations();
		load().then((res) => {
			props = res;
		});
	});
</script>

<svelte:window on:scroll={handleScroll} bind:scrollY={currentScrollY} />

<nav bind:this={navbar} class="navigation">
	<div class="navigation__container">
		{#if props}
			{#each props.props.links as link}
				<button on:click={() => handleClick(link.anchor_id)} class="navigation__button"
					>{link.label}</button
				>
			{/each}
		{/if}
	</div>
</nav>

<style lang="scss">
	.navigation {
		z-index: 999;
		position: fixed;
		top: 0.85rem;
		width: 100%;

		&__container {
			display: flex;
			justify-content: space-between;
			max-width: 1280px;
			padding: 0 1rem;
			margin-left: auto;
			margin-right: auto;
		}

		&__button {
			width: 100%;
			background-color: transparent;
			color: white;
			font-family: 'Patrick Hand';
			font-size: 1.4rem;
			text-transform: uppercase;
			border: none;
			cursor: pointer;
			z-index: 1;

			&:focus {
				outline: none;
				text-decoration: underline;
			}
		}
	}
</style>
