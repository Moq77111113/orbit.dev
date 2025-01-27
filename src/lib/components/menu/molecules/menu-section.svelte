<script lang="ts">
  import * as Collapsible from '$lib/components/ui/collapsible/index.js';

  import type { Icon } from 'lucide-svelte/icons';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import type { Snippet } from 'svelte';

  type Props = {
    icon?: typeof Icon;
    title: string;
    children: Snippet;
    open?: boolean;
  };

  const {
    icon: I = ChevronsUpDown,
    title,
    children,
    open = true,
  }: Props = $props();
</script>

<Collapsible.Root {open}>
  <Collapsible.Trigger class="w-full ">
    <div
      class="w-full text-foreground/70 flex cursor-pointer justify-between py-2
    ring-ring h-8 shrink-0 items-center rounded-md px-2 text-sm font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
    >
      {title}

      <I class="size-6" />
    </div>
  </Collapsible.Trigger>

  <Collapsible.Content>
    {@render children()}
  </Collapsible.Content>
</Collapsible.Root>
