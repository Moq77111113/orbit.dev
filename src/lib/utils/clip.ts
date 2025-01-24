import { secureOnly } from "./secure.js";

export const clip = secureOnly((value: string) => {
	navigator.clipboard.writeText(value);
});
