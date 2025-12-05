// src/routes/about-us/+page.server.ts
import type { PageServerLoad } from './$types';
import type { SeoConfig } from '@pouchlab/svead';

export const load: PageServerLoad = () => ({
	pageMetaTags: {
		title: 'About AeroVital - Our Story and Team',
		description: 'Discover the team behind AeroVital and our mission to innovate.'
	} satisfies Partial<SeoConfig>
});
