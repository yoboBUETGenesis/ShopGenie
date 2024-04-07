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

	let image;
	let textquery;
	let audio;
	let showaddmodal = true;

	function addclassmodal() {
		showaddmodal = true;
	}

	function closeclassmodal() {
		showaddmodal = false;
	}

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
					<a href="/auth/home" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-7 mr-1 hover:rotate-12"
						/>
						Home</a
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
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
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
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a href="/auth/profile" class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><button on:click={handleSignOut}>Logout</button></li>
				</ul>
			</div>
		</div>
	</div>
</nav>

{#if showaddmodal}
	<div class="bg-blue-200 p-6 rounded-lg shadow-lg w-full m-4 dark:bg-[#212020]">
		<div class="flex flex-col justify-center items-center mb-3">
			<h2 class="text-2xl font-bold">Add a new class</h2>
		</div>

		<form
			use:enhance
			action="?/upload"
			method="POST"
			class="flex flex-row space-x-4"
			on:submit={() => {
				closeclassmodal();
			}}
		>
			<div>
				<h1>Textual Query</h1>

				<input
					class="input dark:placeholder:text-[#ffffff9e] w-full max-w-xs"
					type="text"
					id="textquery"
					name="textquery"
					bind:value={textquery}
					placeholder="Enter The Query"
				/>

				<label class="label text-left mb-3">
					<span>Photo (optional)</span>

					<input
						class="file-input w-full max-w-xs"
						type="file"
						id="image"
						name="image"
						bind:value={image}
					/>
				</label>
				<button
					type="submit"
					class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
{/if}

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
