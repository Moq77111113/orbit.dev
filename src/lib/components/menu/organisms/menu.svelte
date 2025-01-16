<script lang="ts">
  import DesktopMenuContainer from './desktop-menu-container.svelte';
  import DesktopMenu from './desktop-menu.svelte';

  import MobileMenuContainer from './mobile-menu-container.svelte';
  import MobileMenu from './mobile-menu.svelte';
</script>

<MobileMenuContainer class="md:hidden">
  <MobileMenu />
</MobileMenuContainer>

<DesktopMenuContainer class="hidden md:flex">
  <DesktopMenu />
</DesktopMenuContainer>
