<script lang="ts">
  import RingList from '$lib/components/features/ring/molecules/ring-list.svelte';
  import type { Ring } from '$lib/radar/core/elements/types.js';
  import {
    addRing,
    moveRing,
    reColorRing,
    removeRing,
    renameRing,
  } from '$lib/radar/features/actions/index.js';

  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import RingActions from '../molecules/ring-actions.svelte';
  import RingCreate from '../molecules/ring-create.svelte';
  import RingEdit from './ring-edit.svelte';

  const radar = useRadar();

  let selected = $state<Ring | null>(null);
  let open = $state(false);

  const add = (name: string, color: string) => {
    radar.execute(addRing, { name, color });
  };

  const edit = (ring: Ring) => {
    selected = ring;
    open = true;
  };

  const remove = (ring: Ring) => {
    radar.execute(removeRing, ring.id);
  };

  const move = (ring: Ring, direction: 'up' | 'down') => {
    radar.execute(moveRing, { id: ring.id, direction });
  };

  const update = (ring: Partial<Omit<Ring, 'id'>> & Pick<Ring, 'id'>) => {
    ring.color &&
      radar.execute(reColorRing, { id: ring.id, color: ring.color });

    ring.name && radar.execute(renameRing, { id: ring.id, name: ring.name });
    selected = null;
    open = false;
  };
</script>

<div class="flex flex-col py-4">
  <RingList rings={radar.state.radar.rings}>
    {#snippet actions(ring)}
      <RingActions
        {ring}
        actions={{
          onEdit: edit,
          onRemove: remove,
          onMove: move,
        }}
      />
    {/snippet}
  </RingList>
  <RingCreate oncreate={add} />
</div>

{#if selected}
  <RingEdit
    bind:open
    ring={selected}
    onChange={(r) => update({ ...r, id: selected!.id })}
  />
{/if}
