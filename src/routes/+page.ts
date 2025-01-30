import type { PageLoad } from './$types.js';

export const load = (async () => {
	return {
		title: 'Your Technology Exploration Platform',
	};
}) satisfies PageLoad;
