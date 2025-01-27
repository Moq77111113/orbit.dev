<script lang="ts">
  type Props = {
    color: string;
    title: string;
  };

  const { color, title }: Props = $props();
</script>

<span
  style="--color: {color}"
  {title}
  class="size-1 rounded-full ring-2 ring-[--color]"
></span>
