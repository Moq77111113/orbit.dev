<script lang="ts">
  import { Icons } from '../icons/index.js';
  import { cn } from '../utils/ui.js';
  import { buttonVariants } from './ui/button/button.svelte';
</script>

<header
  class="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
>
  <div class="container flex h-14 max-w-screen-2xl items-center">
    <div class="flex mr-4">
      <a href="/" class="mr-6 flex items-center space-x-2">
        <Icons.logo class="size-8 rotate-45" />
        <span
          class="hidden xl:inline-block font-hand tracking-widest text-lg font-bold text-muted-foreground"
        >
          Orbit.dev
        </span>
      </a>
    </div>
    <div
      class="flex flex-1 items-center justify-between space-x-2 md:justify-end"
    >
      <nav class="flex items-center">
        <a href={'#'} target="_blank" rel="noopener noreferrer">
          <div
            class={cn(
              buttonVariants({
                size: 'sm',
                variant: 'ghost',
              }),
              'h-8 w-8 px-0'
            )}
          >
            <Icons.gitHub class="size-4" />
            <span class="sr-only">GitHub</span>
          </div>
        </a>
      </nav>
    </div>
  </div>
</header>
