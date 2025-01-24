<script lang="ts">
  type Props = {
    class?: string;
  };

  const { class: clazz }: Props = $props();
</script>

<svg class={clazz} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect width="24" height="24" fill="#cccccc" />
  <rect width="12" height="12" fill="#ffffff" />
  <rect x="12" y="12" width="12" height="12" fill="#ffffff" />
</svg>
