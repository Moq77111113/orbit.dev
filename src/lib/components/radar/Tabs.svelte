<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import Configuration from './Configuration.svelte';
  import Entries from './Entries.svelte';
</script>

<Tabs.Root value={'config'}>
  <Tabs.List class="grid w-full space-x-2 grid-cols-2">
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
