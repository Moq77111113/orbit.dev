<script lang="ts">
  import Entries from '$lib/components/radar/entry/organisms/entries.svelte';
  import * as Tabs from '$lib/components/ui/tabs/index.js';

  import Configuration from './radar-configuration.svelte';

  const tabs = [
    { title: 'customization', component: Configuration },
    { title: 'entries', component: Entries },
  ];
</script>

<Tabs.Root class="relative" value="customization">
  <Tabs.List
    class="grid w-full space-x-2 grid-cols-2 top-0 left-0 z-10 mb-2 sticky backdrop-blur bg-background/60"
  >
    {#each tabs as { title }, i (i)}
      <Tabs.Trigger class="capitalize" value={title}>{title}</Tabs.Trigger>
    {/each}
  </Tabs.List>

  {#each tabs as { title, component }, i (i)}
    <Tabs.Content value={title} class="space-y-2">
      {@const Component = component}
      <Component />
    </Tabs.Content>
  {/each}
</Tabs.Root>
