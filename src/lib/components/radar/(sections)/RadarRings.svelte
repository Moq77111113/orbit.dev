<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as List from '$lib/components/ui/list/index.js';
  import { Icon } from 'lucide-svelte';
  import ArrowDown from 'lucide-svelte/icons/arrow-down';
  import ArrowUp from 'lucide-svelte/icons/arrow-up';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Plus from 'lucide-svelte/icons/plus';
  import Trash from 'lucide-svelte/icons/trash';
  import { useRadar } from '../context.svelte.js';

  const radar = useRadar();

  const actions = [
    { icon: Pencil, title: 'Edit' },
    { icon: Trash, title: 'Remove' },
    { icon: ArrowUp, title: 'Move up' },
    { icon: ArrowDown, title: 'Move down' },
  ];

  const addRing = () => {
    const name = prompt('Enter the name of the ring');
    if (name) {
      radar.addRing(name);
    }
  };
</script>

{#snippet listAction(icon: typeof Icon, title: string)}
  <List.Action>
    {@const Icon = icon}
    <div class="flex items-center">
      <Button variant="ghost"
        ><Icon class="mr-2 size-4" /> <span>{title}</span></Button
      >
    </div>
  </List.Action>
{/snippet}

<div class="flex flex-col py-4">
  <List.Root items={radar.rings} text={(r) => r.name} class="gap-2 flex">
    <List.Actions>
      {#each actions as action}
        {@render listAction(action.icon, action.title)}
      {/each}
    </List.Actions>
  </List.Root>
  <Button
    size="icon"
    variant="ghost"
    class="hover:bg-inherit hover:scale-110"
    onclick={addRing}><Plus class="size-4" /></Button
  >
</div>
