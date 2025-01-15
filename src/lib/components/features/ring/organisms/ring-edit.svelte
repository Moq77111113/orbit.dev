<script lang="ts">
  import ResponsiveDialog from '$lib/components/shared/organisms/responsive-dialog.svelte';
  import type { Ring } from '$lib/radar/core/elements/types.js';

  import RingForm from '../molecules/ring-form.svelte';

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
