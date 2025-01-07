<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '~/lib/components/ui/button/button.svelte';
  import { addSection } from '~/lib/radar/actions/index.js';
  import { SectionRenderer } from '~/lib/radar/state/observers/renderer/radar-renderer.svelte.js';

  import { useRadar } from '~/lib/radar/state/radar.svelte.js';

  let svg: SVGElement;

  const radar = useRadar();

  onMount(() => {
    radar.addObserver(
      new SectionRenderer({ target: svg, container: { width: 500, height: 500 } })
    );
  });
</script>

<svg
  bind:this={svg}
  id="radar-svg"
  class="relative bg-background rounded-lg p-8"
  viewBox="0 0 800 800"
/>

<div class="flex gap-4">
  <Button onclick={() => radar.execute(addSection, { name: 'Foo' })}>RED</Button
  >
</div>
