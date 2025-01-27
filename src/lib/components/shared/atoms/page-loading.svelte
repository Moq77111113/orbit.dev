<script lang="ts">
  const { show }: { show: boolean } = $props();
</script>

<div
  class={`fixed flex flex-col space-y-32 items-center justify-center inset-0 bg-slate-900 transition-opacity duration-300 p-12
  ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
>
  <div class="relative">
    <div
      class="w-16 h-16 rounded-full bg-gradient-to-br group from-orange-700 to-orange-500 shadow-lg shadow-orange-400/50 relative"
    >
      <div
        class="absolute -inset-8 animate-[spin_3s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite]"
      >
        <div
          class="w-4 h-4 rounded-full bg-gradient-to-l from-cyan-500 to-white absolute -left-2"
        ></div>
      </div>

      <div
        class="absolute -inset-12 animate-[spin_5s_linear_infinite] group-hover:animate-[spin_3s_linear_infinite]"
      >
        <div
          class="w-6 h-6 rounded-full bg-gradient-to-t from-red-400 to-zinc-600 absolute -bottom-3"
        ></div>
      </div>

      <div
        class="absolute -inset-16 animate-[spin_7s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite]"
      >
        <div
          class="w-5 h-5 rounded-full bg-gradient-to-b from-green-400 to-blue-600 absolute -top-2.5"
        ></div>
      </div>

      <div
        class="absolute -inset-20 animate-[spin_6s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]"
      >
        <div
          class="w-4 h-4 rounded-full bg-gradient-to-t from-yellow-400 to-yellow-800 absolute -left-2"
        ></div>
      </div>
    </div>
  </div>
  <p
    class="text-muted text-sm md:text-2xl font-hand text-center mt-8 md:mt-12 font-light animate-pulse"
  >
    Launching Orbit...
  </p>
</div>

<style>
  .-inset-8::before {
    content: '';
    @apply inset-0  rounded-[45%] rotate-12;
    position: absolute;
    transform: scaleX(1.2);
  }

  .-inset-12::before {
    content: '';
    @apply inset-0  rounded-[40%] -rotate-6;
    position: absolute;
    transform: scaleX(1.4) scaleY(0.9);
  }

  .-inset-16::before {
    content: '';
    @apply inset-0 rounded-[35%] rotate-3;
    position: absolute;
    transform: scaleX(1.6) scaleY(0.85);
  }

  .-inset-20::before {
    content: '';
    @apply inset-0 rounded-[30%] -rotate-90;
    position: absolute;
    transform: scaleX(1.8) scaleY(0.8);
  }
</style>
