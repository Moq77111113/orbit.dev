<script lang="ts">
  import AddButton from '$lib/components/atoms/AddButton.svelte';

  import * as List from '$lib/components/ui/list/index.js';
  import { addSection } from '$lib/radar/features/actions/index.js';
  import { useRadar } from '$lib/radar/state/state.svelte.js';

  import SectionActions from './SectionActions.svelte';

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
    {#each radar.state.radar.sections as section}
      <List.Item title={section.name}>
        <SectionActions {section} />
      </List.Item>
    {/each}
  </List.Root>
  <AddButton onclick={createOne} />
</div>
