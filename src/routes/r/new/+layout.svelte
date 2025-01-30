<script lang="ts">
import { dev } from "$app/environment";
import SizeIndicator from "$lib/components/shared/atoms/size-indicator.svelte";
import { createOrbitState } from "$lib/radar/state/app-state.svelte.js";
import type { Snippet } from "svelte";

createOrbitState({
	mode: "read-write",
});

type Props = {
	children: Snippet;
};

const { children }: Props = $props();
</script>

{@render children()}


{#if dev}
<SizeIndicator />
{/if}