<script lang="ts">
  import Menu from '$lib/components/menu/organisms/menu.svelte';
  import { createOrbitState } from '$lib/radar/state/app-state.svelte.js';

  import RadarView from './radar-view.svelte';

  type Props = {
    readonly?: boolean;
  };

  const { readonly = false }: Props = $props();

  createOrbitState({});

  let svg: SVGElement = $state<SVGElement>({} as SVGElement);
</script>

{#if !readonly}
  <Menu />
{/if}

<div class="relative w-full flex flex-1 items-center justify-center">
  <RadarView bind:svg />
</div>
