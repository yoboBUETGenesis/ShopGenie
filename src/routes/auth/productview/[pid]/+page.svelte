<script>
	import { enhance } from '$app/forms';

	export let data;
	let { session, supabase, userNow, item } = data;
	$: ({ session, supabase, userNow, item } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};
</script>

<!-- design kor. keep in mind that image er number kintu vary korte pare -->
<pre>{JSON.stringify(item, null, 2)}</pre>
