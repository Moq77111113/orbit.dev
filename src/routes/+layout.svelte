<script lang="ts">
  import { createRadarState } from '~/lib/components/radar/context.svelte.js';
  import '../app.css';
  import { RadarService } from '~/lib/radar/radar.js';
  import { data } from '~/lib/utils/radar.conf.js';

  const { children } = $props();

  createRadarState({
    radar: new RadarService(data),
  });
</script>

{@render children?.()}
