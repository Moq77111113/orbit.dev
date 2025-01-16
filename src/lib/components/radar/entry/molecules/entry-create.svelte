<script lang="ts">
  import AddButton from '$lib/components/shared/atoms/add-button.svelte';

  type Props = {
    oncreate: () => void;
  };

  const { oncreate }: Props = $props();
</script>

<AddButton onclick={oncreate} />
