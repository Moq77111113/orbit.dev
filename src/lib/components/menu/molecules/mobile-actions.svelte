<script lang="ts">
  import MobileAction from '../atoms/mobile-action.svelte';
  import type { MenuActionHandler } from './menu-actions.svelte';

  type Props = {
    actions: MenuActionHandler<void>[];
  };

  const { actions }: Props = $props();
</script>

<ul class="flex justify-between items-center p-2">
  {#each actions as action, i (i)}
    <MobileAction onclick={() => action.handle()} class={action.class}>
      {@const Icon = action.icon}
      <Icon />
      <span class="sr-only">{action.title}</span>
    </MobileAction>
  {/each}
</ul>
