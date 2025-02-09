<script lang="ts">
  import RadarCustomization from '$lib/components/radar/app/organisms/radar-customization.svelte';

  import { Icons } from '$lib/icons/index.js';
  import PopoverMenu from '../molecules/popover-menu.svelte';

  const { class: clazz }: { class?: string } = $props();
</script>

<PopoverMenu class={clazz}>
  {#snippet icon()}
    <Icons.pencil />
    <span class="sr-only">{'Customization'}</span>
  {/snippet}

  {#snippet children()}
    <RadarCustomization />
  {/snippet}
</PopoverMenu>
