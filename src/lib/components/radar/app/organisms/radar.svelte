<script lang="ts">
  import Menu from '$lib/components/menu/organisms/menu.svelte';
  import { createOrbitState } from '$lib/radar/state/app-state.svelte.js';
  import RadarActions from './radar-actions.svelte';
  import RadarView from './radar-view.svelte';

  type Props = {
    readonly?: boolean;
  };

  const { readonly = false }: Props = $props();

  createOrbitState({});

  let svg: SVGElement;
</script>

{#if !readonly}
  <Menu />
{/if}

<div class="relative w-full flex flex-1 items-center justify-center">
  <RadarView bind:svg />
  <RadarActions class="absolute top-0 right-0 mt-4 mr-4" />
</div>
