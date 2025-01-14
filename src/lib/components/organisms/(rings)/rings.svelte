<script lang="ts">
  import RingCreate from '$lib/components/molecules/ring-create.svelte';
  import RingList from '$lib/components/molecules/ring-list.svelte';
  import { addRing } from '$lib/radar/features/actions/index.js';

  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import RingActions from './ring-actions.svelte';

  const radar = useRadar();

  const add = (name: string, color: string) => {
    radar.execute(addRing, { name, color });
  };
</script>

<div class="flex flex-col py-4">
  <RingList rings={radar.state.radar.rings}>
    {#snippet actions(ring)}
      <RingActions {ring} />
    {/snippet}
  </RingList>
  <RingCreate oncreate={add} />
</div>
