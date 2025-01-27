<script lang="ts">
  import ResponsiveDialog from '$lib/components/shared/organisms/responsive-dialog.svelte';
  import { cn } from '$lib/utils/ui.js';

  import SaveMenuItem, {
    type SaveMenuItemProps,
  } from './save-menu-item.svelte';

  export type SaveMenuOption = Omit<SaveMenuItemProps, 'svg' | 'class'>;

  type Props = {
    svg: SVGElement;
    open: boolean;
    options: [
      first: SaveMenuOption,
      second?: SaveMenuOption,
      third?: SaveMenuOption,
    ];
    class?: string;
  };

  let {
    svg,
    open = $bindable<boolean>(),
    options,
    class: clazz,
  }: Props = $props();
</script>

<ResponsiveDialog bind:open>
  {#snippet title()}
    Save Radar to...
  {/snippet}
  {#snippet content()}
    <div class={cn('grid grid-cols-3 gap-4', clazz)}>
      {#each options as option}
        {#if option}
          <div class="col-span-1">
            <SaveMenuItem {svg} {...option} />
          </div>
        {/if}
      {/each}
    </div>
  {/snippet}
</ResponsiveDialog>
