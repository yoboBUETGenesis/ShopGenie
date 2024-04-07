<script>
	import ShortFooter from '$lib/components/shortFooter.svelte';
	import genie from '$lib/images/genie.png';
	import aarongimage from '$lib/images/Aarong Logo Vector.svg';
	import allen from '$lib/images/Allen.svg';
	import apex from '$lib/images/apex.png';
	import cloth from '$lib/images/clothes-svgrepo-com.svg';
	import userface from '$lib/images/user-circle.svg';
	import brand from '$lib/images/brand.svg';
	import { enhance } from '$app/forms';
	import femaleModel from '$lib/images/femaleModel.jpeg';
	import maleModel from '$lib/images/maleModel.jpg';
	import boyModel from '$lib/images/boyModel.jpg';
	import girlModel from '$lib/images/girlModel.jpeg'
	import { onMount } from 'svelte';

	import Themeswitcher from '$lib/themeswitcher.svelte';
	let numProducts = 20833;
	let displayednumProducts = 0;
	let numcompanies = 5;
	let displayednumcompanies = 0;
	let totalUser = 100;
	let displayedtotalUser = 0;

	export let data;
	let { session, supabase, userNow, itemCount, items } = data;
	$: ({ session, supabase, userNow, itemCount, items } = data);
	const animateValue = (start, end, duration, incrementStep, callback) => {
		const range = end - start;
		let current = start;
		const increment = end > start ? incrementStep : -incrementStep;
		const stepTime = Math.abs(Math.floor(duration / (range / incrementStep)));
		const timer = setInterval(function () {
			current += increment;
			if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
				current = end;
				clearInterval(timer);
			}
			callback(current);
		}, stepTime);
	};
	async function getAnimation() {
		animateValue(0, numProducts, 1000, 2786, (val) => (displayednumProducts = val));
		animateValue(0, numcompanies, 1500, 1, (val) => (displayednumcompanies = val));
		animateValue(0, totalUser, 1000, 10, (val) => (displayedtotalUser = val));
	}

	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	function gotocart() {
		window.open('/auth/cart', '_self');
	}
	onMount(() => {
		getAnimation();
	});
</script>

<div>
	<nav class="fixed w-full top-0">
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
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div tabindex="0" role="button" class="btn btn-ghost btn-circle " on:click={gotocart}>
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
					<!-- <div
						tabindex="0"
						class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
					>
						<div class="card-body">
							<span class="font-bold text-lg">{itemCount} Items</span>
							<div class="card-actions">
								<button class="btn btn-primary btn-block" on:click={gotocart}>View cart</button>
							</div>
						</div>
					</div> -->
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
							<a class="justify-between" href="/auth/profile">
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

	<section class="md:pt-[100px] flex flex-col items-center justify-center space-x-8 mt-6">
		<h1 class="font-extrabold text-3xl font-serif">
			Stay with Us!! The Largest fashion Collection at your hand
		</h1>
		<div class="stats shadow">
			<div class="stat mr-6">
				<div class="stat-figure text-primary">
					<img
						src={cloth}
						alt="Prescription Icon"
						class="w-16 h-16 transform transition duration-300 hover:rotate-12"
					/>
				</div>
				<div class="stat-title">Total Products</div>
				<div class="stat-value text-primary">
					{displayednumProducts}
				</div>
			</div>
			<div class="stat mr-6">
				<div class="stat-figure text-secondary">
					<img
						src={brand}
						alt="Prescription Icon"
						class="w-16 h-16 transform transition duration-300 hover:rotate-12"
					/>
				</div>
				<div class="stat-title">Total Companies</div>
				<div class="stat-value text-secondary">
					{displayednumcompanies}
				</div>
			</div>
			<div class="stat">
				<div class="stat-figure text-secondary">
					<img
						src={userface}
						alt="Prescription Icon"
						class="w-16 h-16 transform transition duration-300 hover:rotate-12"
					/>
				</div>
				<div class="stat-title">Total User</div>
				<div class="stat-value text-accent">
					{displayedtotalUser}
				</div>
			</div>
		</div>
	</section>

	

	<div class="w-full flex">
		<div class="w-1/5 md:flex justify-center ">
			<div class="w-full m-3 pl-4">
				<div class="grid grid-rows-4  md:sticky top-[350px] space-y-[.5px]">
					<a href="/auth/products/men" class="cursor-pointer hover:scale-105">

						<div class="h-[100px] border-[2px] flex items-center">
								<img src={maleModel} alt="" class="h-[100px] w-[80px]" />
							
							<p class="px-2 text-[22px]">Men</p>
						</div>
					</a>
					<a href="/auth/products/women" class="cursor-pointer hover:scale-105">
						<div class="h-[100px] border-[2px] flex items-center">
							
								<img src={femaleModel} alt="" class="h-[100px] w-[80px]" />
							<p class="px-2  text-[22px]">Women</p>
						</div>
					</a>
					<a href="/auth/products/kids/boy" class="cursor-pointer hover:scale-105">
						<div class="h-[100px] border-[2px] flex items-center">
							
								<img src={boyModel} alt="" class="h-[100px] w-[80px]" />
							
							<p class="px-2  text-[22px]">Boy</p>
						</div>
					</a>
					<a href="/auth/products/kids/girl" class="cursor-pointer hover:scale-105">
						<div class="h-[100px] border-[2px] flex items-center">
							
								<img src={girlModel} alt="" class="h-[100px] w-[80px]" />
							
							<p class="px-2  text-[22px]">Girl</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	
		<div class="w-4/5 border-l-[1px]">
			<div class="flex flex-col items-center justify-center mt-10">
				<h1 class="font-extrabold text-2xl">Recommended for You</h1>
			</div>
			<section
				id="Projects"
				class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
			>
				{#each items as item}
					<div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
						<a href="/auth/productview/{item.id}">
							<img
								src={item.payload.Image_links[0]}
								alt="Product"
								class="h-80 w-72 object-top rounded-t-xl"
							/>
							<div class="px-4 py-3 w-72">
								<!-- <span class="text-gray-400 mr-3 uppercase text-xs">{item.payload.Company}</span> -->
								<div class="flex flex-row space-x-3">
									{#if item.payload.Company === 'Aarong'}
										<img src={aarongimage} alt="" class="w-12 h-12" />
									{:else if item.payload.Company === 'Allen Solly'}
										<img src={allen} alt="" class="w-12 h-12" />
									{:else}
										<img src={apex} alt="" class="w-12 h-12" />
									{/if}
									<!-- <p class="font-semibold">{item.payload.Company}</p> -->
								</div>
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
				<!--   ✅ Product card 1 - Starts Here 👇 -->
			</section>
		</div>
	</div>

	<ShortFooter />
</div>

<!-- <pre>{JSON.stringify(items, null, 2)}</pre> -->

<style>
	.stat {
		background-color: #fff;
		padding: 30px;
		border-radius: 10px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.stat-figure {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		background-color: #f3f4f6; /* Light gray */
		border-radius: 50%;
	}

	.stat-title {
		font-weight: 500;
		margin-top: 10px;
		margin-bottom: 5px;
	}

	.stat-value {
		font-size: 1.5em;
		font-weight: bold;
	}
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
