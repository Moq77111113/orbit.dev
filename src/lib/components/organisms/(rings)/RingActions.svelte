<script lang="ts">
  import Actions from '$lib/components/molecules/Actions.svelte';
  import type { ActionHandle } from '$lib/components/molecules/Actions.svelte';
  import type { Ring } from '$lib/radar/core/elements/ring.js';
  import {
    moveRing,
    reColorRing,
    removeRing,
    renameRing,
  } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import ArrowUp from 'lucide-svelte/icons/arrow-up';
  import Pencil from 'lucide-svelte/icons/pencil';

  import Trash from 'lucide-svelte/icons/trash';
  import RingEdit from './RingEdit.svelte';

  const radar = useRadar();
  type Props = {
    ring: Ring;
  };

  const { ring }: Props = $props();
  let edit = $state<Ring | null>();
  const actions = [
    {
      icon: Pencil,
      title: 'Edit',
      handle: (ring: Ring) => {
        edit = ring;
      },
    },
    {
      icon: Trash,
      title: 'Remove',
      handle: (ring: Ring) => {
        radar.execute(removeRing, ring.id);
      },
    },
    {
      icon: ArrowUp,
      title: 'Move up',
      handle: (ring: Ring) => {
        radar.execute(moveRing, {
          id: ring.id,
          direction: 'up',
        });
      },
    },
    {
      icon: ArrowDown,
      title: 'Move down',
      handle: (ring: Ring) => {
        radar.execute(moveRing, {
          id: ring.id,
          direction: 'down',
        });
      },
    },
  ] satisfies ActionHandle<Ring>[];

  const updateOne = (ring: Partial<Omit<Ring, 'id'>> & Pick<Ring, 'id'>) => {
    ring.color &&
      radar.execute(reColorRing, { id: ring.id, color: ring.color });

    ring.name && radar.execute(renameRing, { id: ring.id, name: ring.name });
    edit = null;
  };
</script>

<Actions {actions} item={ring} />

{#if edit}
  <RingEdit
    open={!!edit}
    ring={edit}
    onChange={(r) => updateOne({ ...r, id: ring.id })}
  />
{/if}
