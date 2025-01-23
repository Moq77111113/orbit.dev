<script lang="ts">
  import * as Popover from '$lib/components/ui/popover/index.js';

  import Button from '$lib/components/ui/button/button.svelte';
  import { randomId } from '$lib/utils/random.js';
  import type { Snippet } from 'svelte';

  type Props = {
    id?: string;
    icon: Snippet;
    children: Snippet;
    class?: string;
  };

  const {
    icon,
    children,
    class: clazz,
    id = randomId('pop'),
  }: Props = $props();
</script>

<Popover.Root>
  <Popover.Trigger class={clazz} {id}>
    <Button variant="outline" size="icon">
      {@render icon()}
    </Button>
  </Popover.Trigger>

  <Popover.Content
    class="min-h-[25svh] max-h-[75svh] overflow-auto ml-4 rounded-xl p-2 shadow-xl"
  >
    {@render children()}
  </Popover.Content>
</Popover.Root>
