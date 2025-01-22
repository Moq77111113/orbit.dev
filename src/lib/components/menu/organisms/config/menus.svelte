<script lang="ts" module>
  import ArrowDownToLine from 'lucide-svelte/icons/arrow-down-to-line';
  import type { MenuElementLink } from '../../molecules/menu-nav.svelte';

  export const exportMenu = [
    {
      title: 'Export to SVG',
      label: 'test',
      icon: ArrowDownToLine,
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Services',
      href: '/services',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ] satisfies MenuElementLink[];
</script>
