<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import type { Snippet } from 'svelte';
  type Props = {
    children: Snippet;
  };
  const { children }: Props = $props();
</script>

<DropdownMenu.Item>{@render children()}</DropdownMenu.Item>
