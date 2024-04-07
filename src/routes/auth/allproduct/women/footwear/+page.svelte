<script lang="ts">
	import genie from '$lib/images/genie.png';
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import type { ActionData, PageData } from './$types';

	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let form: ActionData;

	const userData = data.userNow;

	let allproducts: any = null;
	let newProducts: any = null;

	$: allproducts = data.allproducts;
	$: allproducts = [...allproducts, ...newProducts];

	$: {
		// console.log(form?.success);
		newProducts = [];
		if (form?.success == 'loadmore') {
			for (let i = 0; i < form.loadProducts.length; i++) {
				newProducts.push(form.loadProducts[i]);
			}
			form.success = '';
		}
		// console.log(newProducts);
	}
	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/login', '_self');
	};

	function gotocart() {
		window.open('/auth/cart', '_self');
	}

	const womenAll = ["new arrivals", "Bags", "casual", "daily life","footwear" , "panjabi-kurta", "saree","Western","winter wear" ]
	const gotoCategory=(key)=>{
		window.open(`/auth/allproduct/women/${key}`, '_self');
	}

</script>

<nav class="fixed w-full">
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
						<span class="badge badge-sm indicator-item">{data.cartitems.length}</span>
					</div>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div
					tabindex="0"
					class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
				>
					<div class="card-body">
						<span class="font-bold text-lg">{data.cartitems.length} Items</span>
						<div class="card-actions">
							<button class="btn btn-primary btn-block" on:click={gotocart}>View cart</button>
						</div>
					</div>
				</div>
			</div>
			<div class="dropdown dropdown-end ml-3">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="Tailwind CSS Navbar component" src={data.userNow.image} />
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

<div class="md:pt-[100px]">
	{#if !allproducts}
		<div class="flex h-full w-full items-center justify-center">"Loading..."</div>
	{:else}

		<div class="flex justify-center">
			<div class="w-1/5 ">
				
				<div class="list-none md:mt-16 md:sticky top-44">
					<p class="px-5 pl-6 text-[30px] font-bold border-b-[2px] ml-4">Category</p>
					{#each womenAll as key}
						<li class="cursor-pointer p-0 pl-6 m-2 mx-5  text-[24px] uppercase border-b-2 hover:scale-105">
							<button on:click={()=>gotoCategory(key)}>
								{#if key.toString().toLowerCase()=="footwear".toLowerCase()}
									<span class="text-red-500 text-2xl">{key}</span>
								{:else}
									<span class="text-gray-500">{key}</span>
								{/if}
							</button>
						</li>
					{/each}
				</div>

			</div>
			<div class="w-3/5">
				<h1 class="font-extrabold text-4xl text-center font-serif">Footwear for Women</h1>
				<section
					id="Projects"
					class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
				>
					{#each allproducts as item}
						<div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
							<a href="/auth/productview/{item.id}">
								<img
									src={item.payload.Image_links[0]}
									alt="Product"
									class="h-80 w-72 object-top rounded-t-xl"
								/>
								<div class="px-4 py-3 w-72">
									<span class="text-gray-400 mr-3 uppercase text-xs">{item.payload.Company}</span>
									<p class="text-lg font-bold text-black truncate block capitalize">
										{item.payload.Name}
									</p>
									<div class="flex items-center">
										<p class="text-lg font-semibold text-black cursor-auto my-3">{item.payload.Price}</p>
									</div>
								</div>
							</a>
						</div>
					{/each}
				</section>
				<form
					class="mt-5 flex flex-col items-center justify-center mb-6"
					use:enhance={() => {
						return async ({ update }) => {
							update({ reset: false, invalidateAll: false });
						};
					}}
					action="?/search"
					method="post"
				>
					<button class="btn rounded-md bg-green-500 hover:bg-green-700 font-bold" type="submit"
						>Load More</button
					>
				</form>
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
