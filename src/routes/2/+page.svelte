<script lang="ts">
  import { useRadar } from '~/lib/radar/radar.svelte.js';

  let svg: SVGElement;

  const radar = useRadar();
</script>

<!-- 
<svg
  bind:this={svg}
  id="radar-svg"
  class="relative bg-background rounded-lg p-8"
  viewBox="0 0 800 800"
/> -->

<pre>{JSON.stringify(radar.state, null, 2)}</pre>
