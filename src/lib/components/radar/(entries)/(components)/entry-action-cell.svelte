<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import type { Entry, Ring, Section } from '~/types/radar.js';
  import EntryDialog from './entry-dialog.svelte';

  type Props = {
    entry: Entry;
    sections: Section[];
    rings: Ring[];
  };
  let { entry, sections, rings }: Props = $props();

  const toggleEdit = () => {
    edit = !edit;
  };
  let edit = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="ghost" class="data-[state=open]:bg-muted flex h-8 w-8 p-0">
      <Ellipsis />
      <span class="sr-only">Open Menu</span>
    </Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content class="w-[160px]" align="end">
    <DropdownMenu.Item onclick={toggleEdit}>Edit</DropdownMenu.Item>

    <DropdownMenu.Separator />
    <DropdownMenu.Item onclick={toggleEdit}>
      Delete
      <DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<EntryDialog {entry} {sections} {rings} bind:open={edit} onChange={() => {}} />
