<script lang="ts">
  type Props = {
    class: string;
  };

  const { class: clazz }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class={clazz}>
  <defs>
    <radialGradient
      id="proPlanetGradient"
      cx="50%"
      cy="50%"
      r="50%"
      fx="50%"
      fy="50%"
    >
      <stop offset="0%" stop-color="hsl(30, 90%, 55%)" />

      <stop offset="100%" stop-color="hsl(30, 90%, 40%)" />
    </radialGradient>

    <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />

      <stop offset="100%" stop-color="hsl(30, 90%, 40%)" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- Outer Orbit Glow -->

  <circle
    cx="50"
    cy="50"
    r="48"
    fill="none"
    stroke="hsl(30, 90%, 45%)"
    stroke-width="2"
    opacity="0.5"
  />

  <!-- Main Planet Body -->

  <circle cx="50" cy="50" r="38" fill="url(#proPlanetGradient)" />

  <!-- Subtle Highlight -->

  <path
    d="M35 42 C45 28, 65 28, 75 42"
    fill="none"
    stroke="url(#highlightGradient)"
    stroke-width="3"
    stroke-linecap="round"
  />

  <!-- Rings -->

  <ellipse
    cx="50"
    cy="50"
    rx="45"
    ry="20"
    fill="none"
    stroke="hsl(30, 90%, 50%)"
    stroke-width="2"
    opacity="0.8"
  />

  <ellipse
    cx="50"
    cy="50"
    rx="40"
    ry="18"
    fill="none"
    stroke="#ffffff"
    stroke-width="1.5"
    opacity="0.5"
  />

  <!-- Inner Details -->

  <circle cx="50" cy="50" r="6" fill="#ffffff" opacity="0.3" />

  <circle cx="55" cy="45" r="3" fill="hsl(30, 90%, 55%)" />
</svg>
