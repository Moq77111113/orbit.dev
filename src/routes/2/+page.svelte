<script lang="ts">
  import Button from '~/lib/components/ui/button/button.svelte';
  import {
    addRing,
    moveRing,
    reColorRing,
    removeRing,
  } from '~/lib/radar/actions/index.js';

  import { useRadar } from '~/lib/radar/state/radar.svelte.js';

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

<div class="flex gap-4">
  <Button onclick={() => radar.execute(addRing, { name: 'Foo', color: 'red' })}
    >RED</Button
  >
  <Button onclick={() => radar.execute(addRing, { name: 'Bar', color: 'blue' })}
    >BLUE</Button
  >
  <Button
    onclick={() =>
      radar.execute(moveRing, {
        id: radar.state.radar.rings[0].id,
        direction: 'down',
      })}>MOVE UP</Button
  >
  <Button
    onclick={() =>
      radar.execute(moveRing, {
        id: radar.state.radar.rings[1].id,
        direction: 'up',
      })}
  >
    MOVE 1 DOWN</Button
  >
  <Button
    onclick={() => radar.execute(removeRing, radar.state.radar.rings[0].id)}
    >REMOVE 0</Button
  >

  <Button
    onclick={() =>
      radar.execute(reColorRing, {
        id: radar.state.radar.rings[0].id,
        color: 'green',
      })}>CHANGE COLOR</Button
  >
</div>
