<script lang="ts">
  import RingList from '$lib/components/radar/ring/molecules/ring-list.svelte';
  import type { Ring } from '$lib/radar/core/elements/types.js';
  import {
    addRing,
    moveRing,
    reColorRing,
    removeRing,
    renameRing,
  } from '$lib/radar/features/actions/index.js';

  import { useOrbit } from '$lib/radar/state/state.svelte.js';
  import RingActions from '../molecules/ring-actions.svelte';
  import RingCreate from '../molecules/ring-create.svelte';
  import RingEdit from './ring-edit.svelte';

  const orbit = useOrbit();

  let selected = $state<Ring | null>(null);
  let open = $state(false);

  const add = (name: string, color: string) => {
    orbit.execute(addRing, { name, color });
  };

  const edit = (ring: Ring) => {
    selected = ring;
    open = true;
  };

  const remove = (ring: Ring) => {
    orbit.execute(removeRing, ring.id);
  };

  const move = (ring: Ring, direction: 'up' | 'down') => {
    orbit.execute(moveRing, { id: ring.id, direction });
  };

  const update = (ring: Partial<Omit<Ring, 'id'>> & Pick<Ring, 'id'>) => {
    ring.color &&
    orbit.execute(reColorRing, { id: ring.id, color: ring.color });

    ring.name && orbit.execute(renameRing, { id: ring.id, name: ring.name });
    selected = null;
    open = false;
  };
</script>

<div class="flex flex-col py-4">
  <RingList rings={orbit.state.radar.rings}>
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
