<script lang="ts">
  import type { Ring } from '$lib/radar/core/elements/ring.js';
  import ResponsiveDialog from '../ResponsiveDialog.svelte';
  import RingForm from './RingForm.svelte';

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

<ResponsiveDialog bind:open>
  {#snippet title()}
    Edit {ring.name}
  {/snippet}
  {#snippet content()}
    <RingForm {ring} onSave={onChange} />
  {/snippet}
</ResponsiveDialog>
