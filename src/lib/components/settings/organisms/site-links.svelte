<script lang="ts">
  import { site } from "$lib/config/site.js";
  import NavLinks from "../molecules/nav-links.svelte";

    const links = site.links.map((_) => ({
        title: _.label,
        href: _.href,
        icon: _.icon,
      }))
</script>

<NavLinks {links} />