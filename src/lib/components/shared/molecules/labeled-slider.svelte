<script lang="ts" module>
  export type SliderProps = {
    min: number;
    max: number;
    label: string;
    step?: number;
    value: number;
    class?: string;
    onchange?: (v: number) => void;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils/ui.js';
  import Labeled from '../atoms/labeled-field.svelte';
  import * as Slider from '$lib/components/ui/slider/index.js';

  let {
    label,
    value = $bindable(),
    class: clazz,
    onchange: onChange,
    ...rest
  }: SliderProps = $props();
</script>

<Labeled {label}>
  <Slider.Root
    type="single"
    onValueChange={onChange}
    class={cn('w-full cursor-pointer', clazz)}
    {...rest}
    bind:value
  />
</Labeled>
