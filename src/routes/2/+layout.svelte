<script lang="ts">
  import { createRadarState } from '~/lib/radar/state/radar.svelte.js';
  const { children } = $props();

  createRadarState({
    app: 'radar',
  });
</script>

FOO
{@render children?.()}
