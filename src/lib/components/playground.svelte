<script lang="ts">
  import type { Ring } from '$lib/radar/core/elements/ring.js';

  import ResponsiveDialog from './organisms/responsive-dialog.svelte';

  import RingForm from './organisms/(rings)/ring-form.svelte';
  import Button from './ui/button/button.svelte';

  const ring: Ring = {
    id: 'rng-1',
    color: '#F3F3A1',
    name: 'foo',
  };
  let open = $state(false);
</script>

<Button onclick={() => (open = !open)}>Toggle</Button>

<ResponsiveDialog bind:open>
  {#snippet title()}
    <h1>Ring Form</h1>
  {/snippet}
  {#snippet content()}
    <RingForm {ring} onSave={console.log} />
  {/snippet}
</ResponsiveDialog>
