<script lang="ts">
  import * as Collapsible from '$lib/components/ui/collapsible/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import type { Icon } from 'lucide-svelte/icons';
  import type { Snippet } from 'svelte';

  type Props = {
    icon?: typeof Icon;
    title: string;
    children: Snippet;
    open?: boolean;
  };

  const { icon, title, children, open = true }: Props = $props();
</script>

<Collapsible.Root {open}>
  <Collapsible.Trigger class="w-full">
    <Sidebar.GroupLabel
      class="flex w-full cursor-pointer items-center justify-between py-2"
    >
      {title}
      {#if icon}
        {@const I = icon}
        <I class="size-6" />
      {/if}
    </Sidebar.GroupLabel>
  </Collapsible.Trigger>

  <Collapsible.Content>
    <Sidebar.GroupContent>
      <Sidebar.Menu>{@render children()}</Sidebar.Menu>
    </Sidebar.GroupContent>
  </Collapsible.Content>
</Collapsible.Root>
