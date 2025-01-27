<script lang="ts">
  type Props = {
    title: string;
  };

  let { title }: Props = $props();
</script>

<h3 class="text-lg font-semibold text-center self-end">{title}</h3>
