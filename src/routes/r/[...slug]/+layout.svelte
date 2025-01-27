<script lang="ts">
  import { createOrbitState } from '$lib/radar/state/app-state.svelte.js';
  import type { Snippet } from 'svelte';

  createOrbitState({
    mode: 'read',
  });

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

{@render children()}
