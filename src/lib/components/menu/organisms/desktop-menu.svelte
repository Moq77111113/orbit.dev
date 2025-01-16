<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { Icons } from '$lib/icons/index.js';
  import { cn } from '$lib/utils/ui.js';

  import Tabs from './menu-tabs.svelte';

  const sidebar = Sidebar.useSidebar();
</script>

<div class="hidden md:flex z-10">
  <Button
    class="absolute bottom-16 left-4"
    variant={'outline'}
    size={'icon'}
    onclick={sidebar.toggle}
    ><Icons.hamburger
      class={cn(
        !sidebar.open && 'rotate-180',
        'transition-transform duration-300 ease-in-out '
      )}
    /></Button
  >
  <Sidebar.Root variant="floating">
    <Sidebar.Header />
    <Sidebar.Content class="px-2">
      <Tabs />
    </Sidebar.Content>
    <Sidebar.Footer />
  </Sidebar.Root>
</div>
