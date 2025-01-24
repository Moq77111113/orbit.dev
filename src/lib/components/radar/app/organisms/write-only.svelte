<script lang="ts">
  import { useOrbit } from '$lib/radar/state/app-state.svelte.js';
  import type { Component, Snippet } from 'svelte';

  const orbit = useOrbit();
  type WithChildren = {
    children: Snippet;
  };

  type WithComponent = {
    component: Component;
  };
  type Props = WithChildren | WithComponent;

  const props: Props = $props();
</script>


{#if !orbit.readonly}
  {#if 'component' in props}
    {@const Component = props.component}
    <Component />
  {/if}

  {#if 'children' in props}
    {@render props.children()}
    {/if}
{/if}
