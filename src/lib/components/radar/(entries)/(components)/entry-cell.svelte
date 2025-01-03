<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import Erase from 'lucide-svelte/icons/eraser';

  const { entry, onChange }: { entry: string; onChange: (v: string) => void } =
    $props();

  let value = $state(entry);

  let editing = $state(false);

  const handleChange = () => {
    onChange(value);
    editing = false;
  };

  const toggle = () => {
    editing = !editing;
  };
</script>

<div class="flex space-x-2">
  <Button
    variant="ghost"
    ondblclick={toggle}
    class="hover:bg-inherit text-left flex items-center px-2"
  >
    {#if editing}
      <Input
        bind:value
        ondblclick={toggle}
        onblur={handleChange}
        onkeydown={(e) => {
          if (e.key === 'Enter') {
            handleChange();
          }
        }}
      />
    {:else}
      <span>{value}</span>
    {/if}
  </Button>
  {#if editing}
    <Button variant="ghost" onclick={toggle} size="icon"><Erase /></Button>
  {/if}
</div>
