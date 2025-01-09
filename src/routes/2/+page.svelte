<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '~/lib/components/ui/button/button.svelte';
  import {
    addEntry,
    addRing,
    addSection,
    reColorRing,
    removeEntry,
    removeRing,
    removeSection,
  } from '~/lib/radar/actions/index.js';
  import { RadarRenderer } from '~/lib/radar/state/observers/radar-observer.svelte.js';

  import { useRadar } from '~/lib/radar/state/radar.svelte.js';
  import { color } from '~/lib/utils/color.js';

  let svg: SVGElement;

  const radar = useRadar();

  onMount(() => {
    radar.addObserver(
      new RadarRenderer({
        target: svg,
        container: { width: 500, height: 500 },
      })
    );
  });
</script>

<main class="flex flex-1 items-center justify-center">
  <svg
    bind:this={svg}
    id="radar-svg"
    class="relative bg-background rounded-lg p-8"
    viewBox="0 0 800 800"
  />

  {radar.state.radar.rings.length}
  <div class="grid grid-cols-3 grid-auto-rows gap-4 max-h-80">
    <Button
      onclick={() => {
        const name = Math.random().toString(36).substring(7);
        radar.execute(addRing, { name, color: color(name) });
      }}>add</Button
    >
    <Button
      onclick={() => {
        radar.execute(reColorRing, {
          id: radar.state.radar.rings[0].id,
          color: color(),
        });
      }}>color</Button
    >

    <Button
      onclick={() => {
        radar.execute(removeRing, radar.state.radar.rings[0].id);
      }}>Rem</Button
    >
    <Button
      class="col-span-2"
      onclick={() => {
        const name = Math.random().toString(36).substring(7);
        radar.execute(addSection, { name });
      }}>add section</Button
    >
    <Button
      onclick={() => {
        radar.execute(removeSection, radar.state.radar.sections[0].id);
      }}>Rem sections</Button
    >

    <Button
      onclick={() => {
        radar.execute(addEntry, {
          name: Math.random().toString(36).substring(7),
          ringId: radar.state.radar.rings[0].id,
          sectionId: radar.state.radar.sections[0].id,
          description: 'An open-source project',
          tags: ['open-source', 'project', 'foo', 'bar'],
        });
      }}>add</Button
    >

    <Button
      class="col-span-2"
      onclick={() => {
        radar.execute(removeEntry, radar.state.radar.entries[0].id);
      }}>Rem entry</Button
    >
  </div>
</main>
