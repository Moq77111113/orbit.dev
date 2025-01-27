<script lang="ts">
  import WriteOnly from '$lib/components/radar/app/organisms/write-only.svelte';
  import CustomizationMenu from './customization-menu.svelte';
  import SettingsMenu from './settings-menu.svelte';
</script>

<div class="hidden md:flex z-10">
  <SettingsMenu class="absolute top-16 left-4 " />
  <WriteOnly
    ><CustomizationMenu
      class="absolute bottom-16 right-4 [&_button]:bg-primary [&_button]:text-primary-foreground [&_button]:size-10
      [&_button]:hover:bg-primary/90 [&_button]:hover:text-primary-foreground [&_button]:hover:shadow [&_button]:rounded-full"
    /></WriteOnly
  >
</div>
