<script lang="ts">
  type Props = {
    description: string;
  };

  let { description }: Props = $props();
</script>

<p
  class="text-sm text-muted-foreground text-center mx-auto self-center line-clamp-3"
>
  {description}
</p>
