<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';

  import * as List from '$lib/components/ui/list/index.js';
  import type { Ring } from '$lib/radar/core/elements/ring.js';
  import {
    addRing,
    moveRing,
    reColorRing,
    removeRing,
    renameRing,
  } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import { color } from '$lib/utils/color.js';
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import ArrowUp from 'lucide-svelte/icons/arrow-up';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Plus from 'lucide-svelte/icons/plus';
  import Trash from 'lucide-svelte/icons/trash';
  import RingEdit from './RingDialog.svelte';

  const radar = useRadar();

  const actions = [
    {
      icon: Pencil,
      title: 'Edit',
      handle: (ring: Ring) => {
        dialogOpen = true;
        ringEdit = { ...ring };
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
      handle: (ring: Ring) =>
        radar.execute(moveRing, {
          id: ring.id,
          direction: 'up',
        }),
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
  ];

  const createOne = () => {
    const name = prompt('Enter the name of the ring');
    if (name) {
      radar.execute(addRing, { name, color: color(name) });
    }
  };

  const updateOne = (ring: Partial<Omit<Ring, 'id'>> & Pick<Ring, 'id'>) => {
    ring.color &&
      radar.execute(reColorRing, { id: ring.id, color: ring.color });

    ring.name && radar.execute(renameRing, { id: ring.id, name: ring.name });
  };
  let ringEdit: Ring | null = $state(null);

  let dialogOpen = $state(false);
</script>

<div class="flex flex-col py-4">
  <List.Root class="gap-2 flex">
    {#each radar.state.radar.rings as ring}
      <List.Item title={ring.name}>
        <List.Actions>
          {#each actions as action}
            <List.Action
              icon={action.icon}
              onclick={() => action.handle(ring)}
              title={action.title}
            />
          {/each}
        </List.Actions>
      </List.Item>
    {/each}
  </List.Root>
  <Button
    size="icon"
    variant="ghost"
    class="hover:bg-inherit hover:scale-110"
    onclick={createOne}><Plus class="size-4" /></Button
  >
</div>

{#if ringEdit !== null}
  <RingEdit
    ring={ringEdit}
    bind:open={dialogOpen}
    onChange={(e) => {
      dialogOpen = false;
      if (ringEdit) {
        updateOne({ ...e, id: ringEdit.id });
      }
    }}
  />
{/if}
