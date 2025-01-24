<script lang="ts">
  import WriteOnly from '$lib/components/radar/app/organisms/write-only.svelte';
  import CustomizationMenu from './customization-menu.svelte';
  import SettingsMenu from './settings-menu.svelte';
</script>

<div class="hidden md:flex z-10">
  <SettingsMenu class="absolute top-16 left-4 " />
  <WriteOnly><CustomizationMenu class="absolute bottom-16 left-4" /></WriteOnly>
</div>
