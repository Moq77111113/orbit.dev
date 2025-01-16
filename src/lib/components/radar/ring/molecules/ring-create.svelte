<script lang="ts">
  import AddButton from '$lib/components/shared/atoms/add-button.svelte';
  import { color } from '$lib/utils/color.js';
  type Props = {
    oncreate: (name: string, color: string) => void;
  };

  const { oncreate }: Props = $props();
  const createOne = () => {
    const name = prompt('Enter the name of the ring');
    if (!name) return;
    oncreate(name, color(name));
  };
</script>

<AddButton onclick={createOne} />
