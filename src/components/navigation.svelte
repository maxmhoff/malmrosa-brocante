<script context="module">
	import { useStoryblokApi } from '@storyblok/svelte';

	export async function load() {
		const storyblokApi = useStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/navigation', { version: import.meta.env.MODE === 'development' ? 'draft' : 'published' });
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

	export let props;

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

	onMount(() => {
		load().then((res) => {
			props = res;
			console.log(props);
		});
	});
</script>

<nav class="navigation">
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
