import type { PageLoad } from "./$types.js";

export const load = (async () => {
	return {
        title: "New Radar",
    };
}) satisfies PageLoad;
