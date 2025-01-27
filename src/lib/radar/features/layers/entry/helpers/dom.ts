import type { EnrichedEntry } from "../../base/types.js";

export function className(id: EnrichedEntry["id"], selection = false) {
	const base = `entry-${id}` as const;
	return selection ? `.${base}` : base;
}

export function html(entry: EnrichedEntry) {
	const { name, description, tags, moved, isNew } = entry;
	const parts = [`<h3>${name}</h3>`];

	if (description) {
		parts.push(`<p>${description}</p>`);
	}

	if (tags?.length) {
		parts.push(`
          <div class="tags">
            ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        `);
	}

	if (isNew) {
		parts.push('<div class="new">New</div>');
	}

	if (moved) {
		parts.push(`
          <div class="moved ${moved > 0 ? "moved-up" : "moved-down"}">
            ${moved > 0 ? "↑" : "↓"}
          </div>
        `);
	}

	return parts.join("");
}
