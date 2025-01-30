

<script lang="ts">
import { page } from "$app/state";
import Button from "$lib/components/ui/button/button.svelte";
import { routes } from "$lib/config/routes.js";
import { Icons } from "$lib/icons/index.js";
</script>

<div class="flex flex-col font-hand text-primary flex-1 items-center justify-center gap-5">
	<h2 class="text-5xl">Ooops</h2>
	<span class="text-2xl text-muted-foreground">{page.error?.message}</span>
	<Button size="sm" href={routes.home}>
        Go Back
		<Icons.left class="size-4"/>
	
	</Button>
</div>