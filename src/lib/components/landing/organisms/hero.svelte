<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { routes } from '$lib/config/routes.js';
  import { Icons } from '$lib/icons/index.js';
  import LandingSectionTitle from '../atoms/landing-section-title.svelte';
</script>

<div class="text-center py-16 bg-background">
  <LandingSectionTitle
    >Orbit: Your Technology Exploration Platform</LandingSectionTitle
  >
  <p class="text-xl text-muted-foreground mb-8">
    Navigate the complex landscape of technology with an intelligent,
    collaborative tech radar that adapts to your team's evolving needs.
  </p>
  <Button href={routes.new}>
    Explore Radar <Icons.radar class="ml-2" />
  </Button>
</div>
