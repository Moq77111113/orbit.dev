<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import type { NavElement } from '../atoms/setting-item.svelte';
  import NavItem from '../atoms/setting-item.svelte';
  type Props = {
    links: NavElement[];
    class?: string;
  };

  const { links, class: clazz }: Props = $props();
</script>

<nav class={cn('grid', clazz)}>
  {#each links as link (link.title)}
    <NavItem navElement={link} />
  {/each}
</nav>
