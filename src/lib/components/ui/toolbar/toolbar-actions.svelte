<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Icon } from 'lucide-svelte';
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import type { Snippet } from 'svelte';
  type Props = {
    icon?: typeof Icon;
    children: Snippet;
  };
  const { icon = Ellipsis, children }: Props = $props();
</script>

<DropdownMenu.Root>
  {@const Icon = icon}
  <DropdownMenu.Trigger><Icon /></DropdownMenu.Trigger>

  <DropdownMenu.Content>
    {@render children()}
  </DropdownMenu.Content>
</DropdownMenu.Root>
