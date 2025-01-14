<script lang="ts">
  import SectionCreate from '$lib/components/molecules/section-create.svelte';
  import SectionList from '$lib/components/molecules/section-list.svelte';
  import { addSection } from '$lib/radar/features/actions/index.js';

  import { useRadar } from '$lib/radar/state/state.svelte.js';
  import SectionActions from './section-actions.svelte';

  const radar = useRadar();

  const add = (name: string) => {
    radar.execute(addSection, { name });
  };
</script>

<div class="flex flex-col py-4">
  <SectionList sections={radar.state.radar.sections}>
    {#snippet actions(section)}
      <SectionActions {section} />
    {/snippet}
  </SectionList>
  <SectionCreate oncreate={add} />
</div>
