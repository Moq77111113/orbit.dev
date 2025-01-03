<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';

  import Tabs from './Tabs.svelte';
</script>

<Sidebar.Root variant="floating">
  <Sidebar.Header />
  <Sidebar.Content class="px-2">
    <Tabs />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
