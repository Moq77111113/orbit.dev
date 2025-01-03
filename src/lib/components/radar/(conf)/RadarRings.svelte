<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';

  import * as List from '$lib/components/ui/list/index.js';
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import ArrowUp from 'lucide-svelte/icons/arrow-up';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Plus from 'lucide-svelte/icons/plus';
  import Trash from 'lucide-svelte/icons/trash';
  import type { Ring } from '~/types/radar.js';
  import { useRadar } from '../context.svelte.js';
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
        radar.removeRing(ring);
      },
    },
    {
      icon: ArrowUp,
      title: 'Move up',
      handle: (ring: Ring) => radar.moveRing(ring, -1),
    },
    {
      icon: ArrowDown,
      title: 'Move down',
      handle: (ring: Ring) => radar.moveRing(ring, 1),
    },
  ];

  const addRing = () => {
    const name = prompt('Enter the name of the ring');
    if (name) {
      radar.addRing(name);
    }
  };

  let ringEdit: Ring | null = $state(null);

  let dialogOpen = $state(false);
</script>

<div class="flex flex-col py-4">
  <List.Root class="gap-2 flex">
    {#each radar.rings as ring}
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
    onclick={addRing}><Plus class="size-4" /></Button
  >
</div>

{#if ringEdit !== null}
  <RingEdit
    ring={ringEdit}
    bind:open={dialogOpen}
    onChange={(e) => {
      dialogOpen = false;
      if (ringEdit) {
        radar.updateRing({ ...e, id: ringEdit.id });
      }
    }}
  />
{/if}
