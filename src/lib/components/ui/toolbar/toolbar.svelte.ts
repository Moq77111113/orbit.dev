import { type Component, type Snippet, getContext, setContext } from "svelte";

export type StackItem<
	StackItemProps extends Record<string, unknown> = Record<string, unknown>,
> = {
	content: Component<StackItemProps>;
	props: StackItemProps;
	title?: Snippet | string;
};

type ToolbarProps = {
	open: () => boolean;
	setOpen: (open: boolean) => void;
};

export class ToolbarState {
	#islandOpen = $derived.by(() => this.props.open());
	setOpen: ToolbarProps["setOpen"];
	// biome-ignore lint/suspicious/noExplicitAny: Acts as a list
	#stack = $state<StackItem<any>[]>([]);

	constructor(readonly props: ToolbarProps) {
		this.setOpen = props.setOpen;
	}

	get island() {
		return this.#islandOpen;
	}

	push<StackItemProps extends Record<string, unknown>>(
		...stackItem: StackItem<StackItemProps>[]
	) {
		this.#stack.push(...stackItem);
	}

	clearStack() {
		this.#stack = [];
	}

	pop() {
		this.#stack.pop();
	}

	get hasPrev() {
		return this.#stack.length > 1;
	}
	get current(): StackItem | undefined {
		return this.#stack[this.#stack.length - 1];
	}
}

const SYMBOL_KEY = "orb-toolbar";

export function setToolbar(props: ToolbarProps): ToolbarState {
	return setContext(Symbol.for(SYMBOL_KEY), new ToolbarState(props));
}

export function useToolbar(): ToolbarState {
	return getContext(Symbol.for(SYMBOL_KEY));
}
