export const Store = {
	UPDATE: "update",
	NONE: "none",
} as const;

export type StoreType = (typeof Store)[keyof typeof Store];
