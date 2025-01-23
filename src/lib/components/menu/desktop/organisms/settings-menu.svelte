<script lang="ts">
  import Settings from '$lib/components/settings/organisms/settings.svelte';

  import { Icons } from '$lib/icons/index.js';
  import PopoverMenu from '../molecules/popover-menu.svelte';

  const { class: clazz}: { class?: string } = $props();
</script>

<PopoverMenu class={clazz}>
  {#snippet icon()}
    <Icons.hamburger />
    <span class="sr-only">{'Settings'}</span>
  {/snippet}

  {#snippet children()}
    <Settings />
  {/snippet}
</PopoverMenu>
