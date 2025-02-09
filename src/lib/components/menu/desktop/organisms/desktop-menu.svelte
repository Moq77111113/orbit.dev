<script lang="ts">
  import WriteOnly from '$lib/components/radar/app/organisms/write-only.svelte';
  import CustomizationMenu from './customization-menu.svelte';
  import SettingsMenu from './settings-menu.svelte';
</script>

<div class="hidden md:flex z-10">
  <SettingsMenu class="absolute top-16 left-4 " />
  <WriteOnly
    ><CustomizationMenu
      class="absolute bottom-16 right-4 bg-primary text-primary-foreground size-12 [&_svg]:size-6
      hover:bg-primary/90 hover:text-primary-foreground hover:shadow rounded-full"
    /></WriteOnly
  >
</div>
