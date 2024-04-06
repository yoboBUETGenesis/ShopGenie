<script>
	import genie from '$lib/images/genie.png';
	import { enhance } from '$app/forms';
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import rightArrow from '$lib/images/right-arrow-svgrepo-com.svg';

	import {onMount} from 'svelte'

	let isLoading = true;
	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	});

	export let data;
	let { session, supabase, userNow, girlAll, itemCount } = data;
	$: ({ session, supabase, userNow, girlAll, itemCount } = data);
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
<!-- href="/auth/product/man/{category}" -->



<div>
	{#if isLoading}
		<div class="flex items-center justify-center">
			<div class="w-4/5">
				{#each Array(5) as _,i}
					<div class="my-5">
						<div class="skeleton h-6 w-56 p-4 m-4"></div>

						<div class="flex md:gap-4">
							{#each Array(4) as _,j}
								<div class="">
									<div
										class="w-72 bg-white  shadow-md rounded-xl overflow-hidden duration-500 hover:shadow-xl"
									>
											
											<div class="skeleton h-80 w-72"></div>
											<div class="px-4 py-3 w-72">
												<span class="skeleton h-2"></span>
												<p class="text-lg skeleton h-4 w-full font-bold text-black truncate block capitalize"></p>
												<div class="flex items-center ">
													<p class="h-6 w-1/2 skeleton my-3">
													</p>
												</div>
											</div>
										
									</div>
								</div>
							{/each}
						</div>
					</div>	
				{/each}
			</div>
		</div>
	{:else}
	<div class="flex  justify-center">
		<div class="w-1/5 ">
				
			<div class="list-none md:mt-16 md:sticky top-44">
				<p class="px-5 pl-6 text-[30px] font-bold border-b-[2px]">Category</p>
				{#each Object.keys(girlAll) as key}
					<li class="cursor-pointer p-0 pl-6 m-2 mx-5  text-[24px] uppercase border-b-2 hover:scale-105">
						<a href={"#"+key}>{key}</a> 
					</li>
				{/each}
			</div>

		</div>
		<div class="w-3/5">
			{#each Object.keys(girlAll) as key}
				<div class="my-5">
					<div class="flex flex-row justify-between">
						<p class="text-[35px] font-bold uppercase py-5">{key}</p>
						<button class="flex flex-row space-x-2 py-5 mt-2" on:click={() => gotoCategory(key)}>
							<p class="font-semibold mt-1 hover:font-bold">View All</p>
							<img
								src={rightArrow}
								alt="Product"
								class="h-8 object-cover rounded-t-xl hover:scale-125"
							/>
						</button>
					</div>
					<div class="flex md:gap-4">
						{#each girlAll[key]['points'] as item}
							<div class="">
								<div
									class="w-72 bg-white shadow-md rounded-xl overflow-hidden duration-500 hover:shadow-xl"
								>
									<a href="/auth/productview/{item.id}">
										<img
											src={item.payload.Image_links[0]}
											alt="Product"
											class="h-80 w-72 object-cover rounded-t-xl hover:scale-105"
										/>
										<div class="px-4 py-3 w-72">
											<span class="text-gray-400 mr-3 uppercase text-xs">{item.payload.Company}</span>
											<p class="text-lg font-bold text-black truncate block capitalize">
												{item.payload.Name}
											</p>
											<div class="flex items-center ">
												<p class="text-lg font-semibold text-black cursor-auto my-3">
													{item.payload.Price}
												</p>
											</div>
										</div>
									</a>
									<form
										action="?/deleteCartItem&id={item.id}"
										method="POST"
										class="flex flex-col items-center justify-center mb-2"
									></form>
								</div>
							</div>
						{/each}
					</div>
				</div>	
			{/each}
		</div>
	</div>
	
	{/if}
</div>

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
