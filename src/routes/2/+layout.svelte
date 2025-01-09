<script lang="ts">
  import { createRadarState } from '~/lib/radar/state/state.svelte.js';
  const { children } = $props();

  createRadarState({
    app: 'radar',
  });
</script>

{@render children?.()}
