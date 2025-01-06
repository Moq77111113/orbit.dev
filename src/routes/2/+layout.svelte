<script lang="ts">
  import { createRadarState } from '~/lib/radar/radar.svelte.js';
  import { data } from '~/lib/utils/radar.conf.js';
  const { children } = $props();

  createRadarState({
    radar: data,
    app: 'radar',
  });
</script>

FOO
{@render children?.()}
