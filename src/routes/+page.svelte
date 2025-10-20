<script lang="ts">
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import Home from '$lib/components/widgets/home.svelte';
	import Footer from '$lib/components/widgets/footer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Navbar />
<Home {data} />
<Footer />
