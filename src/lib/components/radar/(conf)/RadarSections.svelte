<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as List from '$lib/components/ui/list/index.js';
  import { addSection } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import Pencil from 'lucide-svelte/icons/pencil';
  import Plus from 'lucide-svelte/icons/plus';
  import Trash from 'lucide-svelte/icons/trash';

  const radar = useRadar();
  const createOne = () => {
    const name = prompt('Enter the name of the section');
    if (name) {
      radar.execute(addSection, { name });
    }
  };
</script>

<div class="flex flex-col py-4">
  <List.Root class="gap-2 flex">
    {#each radar.state.radar.sections as item}
      <List.Item title={item.name}>
        <List.Actions>
          <List.Action title={'Edit'} icon={Pencil} />
          <List.Action title={'Delete'} icon={Trash} />
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
