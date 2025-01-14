<script lang="ts">
  import AddButton from '$lib/components/atoms/add.button.svelte';

  type Props = {
    oncreate: (name: string) => void;
  };

  const { oncreate }: Props = $props();
  const createOne = () => {
    const name = prompt('Enter the name of the section');
    if (!name) return;
    oncreate(name);
  };
</script>

<AddButton onclick={createOne} />
