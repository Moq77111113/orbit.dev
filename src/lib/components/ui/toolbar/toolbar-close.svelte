<script lang="ts">
  import { Icons } from '../../../icons/index.js';
  import { cn } from '$lib/utils/ui.js';
  import Button from '../button/button.svelte';
  import { useToolbar } from './toolbar.svelte.js';

  type Props = {
    class?: string;
  };

  const { class: clazz }: Props = $props();
  const toolbar = useToolbar();
</script>

<Button
  size="icon"
  variant="ghost"
  class={cn('bg-muted hover:bg-primary/60', clazz)}
  onclick={() => {
    toolbar.clearStack();
    toolbar.setOpen(false);
  }}
>
  <Icons.close />
</Button>
