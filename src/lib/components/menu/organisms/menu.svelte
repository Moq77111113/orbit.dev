<script lang="ts">
  import DesktopMenu from './desktop-menu.svelte';

  import MobileMenuContainer from './mobile-menu-container.svelte';
  import MobileMenu from './mobile-menu.svelte';
</script>

<MobileMenuContainer class="md:hidden">
  <MobileMenu />
</MobileMenuContainer>

<DesktopMenu />
