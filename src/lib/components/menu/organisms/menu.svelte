<script lang="ts">
  import DesktopMenu from '../desktop/organisms/desktop-menu.svelte';

  import MobileMenuContainer from '../mobile/organisms/mobile-menu-container.svelte';
  import MobileMenu from '../mobile/organisms/mobile-menu.svelte';
</script>

<MobileMenuContainer class="md:hidden">
  <MobileMenu />
</MobileMenuContainer>

<DesktopMenu />
