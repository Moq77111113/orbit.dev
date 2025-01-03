<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import Input from '$lib/components/ui/input/input.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import type { Ring } from '~/types/radar.js';
  type Props = {
    ring: Ring;
    open: boolean;
    onChange: (ring: Omit<Ring, 'id'>) => void;
  };

  let { ring, open = $bindable<boolean>(), onChange }: Props = $props();

  const listen = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    }
  ) => {
    if (e.key === 'Escape') {
      open = false;
    }
    if (e.key === 'Enter') {
      onChange({ ...ring });
    }
  };
</script>

<svelte:window on:keydown={listen} />

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Title>Edit {ring.name}</Dialog.Title>

    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input id="name" bind:value={ring.name} class="col-span-3" />
      </div>

      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="ring-color" class="text-right">Color</Label>
        <Input
          id="ring-color"
          type="color"
          bind:value={ring.color}
          class="col-span-1 cursor-pointer"
        />
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit" onclick={() => onChange({ ...ring })}
        >Save changes</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
