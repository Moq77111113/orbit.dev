<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { cn } from '$lib/utils/ui.js';
  import type { Icon } from 'lucide-svelte';

  type Trigger = {
    name: string;
    icon: typeof Icon;
    onclick: () => void;
  };
  type Props = {
    triggers: Trigger[];
    class?: string;
  };

  const { triggers, class: clazz }: Props = $props();
</script>

<div class={cn('flex space-x-4', clazz)}>
  {#each triggers as trigger (trigger.name)}
    <Popover.Trigger>
      <Button variant="outline" size="icon" onclick={() => trigger.onclick()}>
        {@const I = trigger.icon}
        <I />
        <span class="sr-only">{trigger.name}</span>
      </Button>
    </Popover.Trigger>
  {/each}
</div>
