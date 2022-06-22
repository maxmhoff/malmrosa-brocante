import type { StoryblokColor, StoryblokMedia } from './storyblok';

export type ContactProps = {
	title: string;
	text: string;
	image: StoryblokMedia;
	facebook: string;
	instagram: string;
	phone: string;
	email: string;
	background_color: StoryblokColor;
};

export type HeroProps = {
	image: StoryblokMedia;
	background_image: StoryblokMedia;
	keywords: {
		text: string;
	}[];
	background_color: StoryblokColor;
};

export type NavigationProps = {
	links: {
		label: string;
		anchor_id: string;
	}[];
};

export type ProductProps = {
	title: string;
	description: string;
	products: {
		title: string;
		price: number;
		image: StoryblokMedia;
	}[];
	background_color: StoryblokColor;
};
