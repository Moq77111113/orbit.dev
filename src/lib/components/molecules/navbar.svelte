<script lang="ts">
  import type { SiteConfig } from '$lib/config/site.js';

  import NavLink from '../atoms/nav-link.svelte';

  type Link = SiteConfig['links'][number];
  type Props = {
    links: Link[];
  };

  const { links }: Props = $props();
</script>

<nav class="flex items-center">
  {#each links as link}
    <NavLink href={link.href} label={link.label}>
      <link.icon class="size-4" />
    </NavLink>
  {/each}
</nav>
