<script context="module">
	import { useStoryblokApi } from '@storyblok/svelte';

	export async function load() {
		const storyblokApi = useStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/home', {
			version: import.meta.env.MODE === 'development' ? 'draft' : 'published',
		});
		return {
			props: { story: data.story },
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import type { StoryblokStory } from '../model/storyblok';

	export let story: StoryblokStory;

	onMount(() => {
		useStoryblokBridge(story.id, (newStory: StoryblokStory) => (story = newStory));
	});
</script>

<div>
	{#if story}
		<StoryblokComponent blok={story.content} />
	{/if}
</div>
