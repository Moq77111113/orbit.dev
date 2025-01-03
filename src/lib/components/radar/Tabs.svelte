<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import Configuration from './Configuration.svelte';
  import Entries from './Entries.svelte';
</script>

<Tabs.Root value={'config'} class="relative">
  <Tabs.List
    class="grid w-full space-x-2 grid-cols-2 top-0 left-0 bg-white z-10 mb-2 sticky "
  >
    <Tabs.Trigger value={'config'}>Customization</Tabs.Trigger>
    <Tabs.Trigger value={'entries'}>Entries</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="config" class="space-y-2">
    <Configuration />
  </Tabs.Content>
  <Tabs.Content value="entries">
    <Entries />
  </Tabs.Content>
</Tabs.Root>
