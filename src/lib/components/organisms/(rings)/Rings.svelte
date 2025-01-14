<script lang="ts">
  import AddButton from '$lib/components/atoms/AddButton.svelte';
  import RingActions from '$lib/components/organisms/(rings)/RingActions.svelte';

  import * as List from '$lib/components/ui/list/index.js';
  import { addRing } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import { color } from '$lib/utils/color.js';

  const radar = useRadar();
  const createOne = () => {
    const name = prompt('Enter the name of the ring');
    if (name) {
      radar.execute(addRing, { name, color: color(name) });
    }
  };
</script>

<div class="flex flex-col py-4">
  <List.Root class="gap-2 flex">
    {#each radar.state.radar.rings as ring}
      <List.Item title={ring.name}>
        <RingActions {ring} />
      </List.Item>
    {/each}
  </List.Root>
  <AddButton onclick={createOne} />
</div>
