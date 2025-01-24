<script lang="ts">
  import { Icons } from '$lib/icons/index.js';
  import Code2 from 'lucide-svelte/icons/code';
  import Layers from 'lucide-svelte/icons/layers';
  import Settings from 'lucide-svelte/icons/settings';
  import Feature from '../molecules/feature.svelte';
</script>

<div class="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-16">
  <Feature
    label="Comprehensive Landscape"
    description="Gain a holistic view of emerging and established technologies across industries and domains."
    icon={Layers}
  />
  <Feature
    label="Strategic Insights"
    description="Deep-dive analytics that help you understand technology adoption trends, risks, and potential."
    icon={Code2}
  />
  <Feature
    label="Adaptive Perspectives"
    description="Customize and fine-tune your technology radar to match your organization's unique technology strategy."
    icon={Settings}
  />
  <Feature
    label="Interactive Exploration"
    description="Dynamically map, explore, and share technology ecosystems with real-time collaboration features."
    icon={Icons.radar}
  />
</div>
