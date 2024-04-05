<script>
	import genie from '$lib/images/genie.png';
	import { enhance } from '$app/forms';
	import Themeswitcher from '$lib/themeswitcher.svelte';

	export let data;
	let { session, supabase, userNow, itemCount } = data;
	$: ({ session, supabase, userNow, itemCount } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	function gotocart() {
		window.open('/auth/cart', '_self');
	}
</script>

<nav class="p-4">
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<div class="flex-1">
				<a class="text-xl" href="/auth/home">
					<div class="flex items-center">
						<img src={genie} alt="" class="h-[50px] hover:scale-105" />
						<p class="text-[28px] hover:scale-105 font-semibold">ShopGenie</p>
					</div>
				</a>
			</div>
		</div>
		<div class="flex-none">
			<ul class="links">
				<Themeswitcher />
				<li>
					<a href="/auth/query" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/artificial-intelligence.png"
							alt="Dashboard Icon"
							class="h-7 mr-1 hover:rotate-12"
						/>
						Query</a
					>
				</li>
				<li>
					<a href="/auth/reviews" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/review-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-7 mr-1 hover:rotate-12"
						/>
						Reviews</a
					>
				</li>
			</ul>
			<div class="dropdown dropdown-end ml-5">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/></svg
						>
						<span class="badge badge-sm indicator-item">{itemCount}</span>
					</div>
				</div>
				<div
					tabindex="0"
					class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
				>
					<div class="card-body">
						<span class="font-bold text-lg">{itemCount} Items</span>
						<div class="card-actions">
							<button class="btn btn-primary btn-block" on:click={gotocart}>View cart</button>
						</div>
					</div>
				</div>
			</div>
			<div class="dropdown dropdown-end ml-3">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="Tailwind CSS Navbar component" src={userNow.image} />
					</div>
				</div>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><a>Settings</a></li>
					<li><a>Logout</a></li>
				</ul>
			</div>
		</div>
	</div>
</nav>

<style>
	.links {
		display: flex;
		list-style: none;
		margin: 0;
	}

	.links li {
		margin-left: 2rem;
	}

	.links a {
		text-decoration: none;

		transition: color 0.2s ease-in-out;
	}

	.links a:hover {
		color: #007bff; /* Accent color from Skeleton UI */
	}
</style>
