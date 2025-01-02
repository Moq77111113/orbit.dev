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

  const radar = useRadar();

  const actions = [
    { icon: Pencil, title: 'Edit', handle: (ring: Ring) => {} },
    { icon: Trash, title: 'Remove', handle: (ring: Ring) => {} },
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
</script>

{#snippet listAction(ring: Ring, action: (typeof actions)[number])}
  <List.Action>
    {@const Icon = action.icon}
    <div class="flex items-center">
      <Button variant="ghost" onclick={() => action.handle(ring)}
        ><Icon class="mr-2 size-4" /><span>{action.title}</span></Button
      >
    </div>
  </List.Action>
{/snippet}

<div class="flex flex-col py-4">
  <List.Root class="gap-2 flex">
    {#each radar.rings as ring}
      <List.Item title={ring.name}>
        <List.Actions>
          {#each actions as action}
            {@render listAction(ring, action)}
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
