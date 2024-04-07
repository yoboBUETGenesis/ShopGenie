<script>
	// @ts-nocheck

	import rightArrow from '$lib/images/right-arrow-svgrepo-com.svg';
	import { enhance } from '$app/forms';
	// import Themeswitcher from '$lib/themeswitcher.svelte';
	import Productnavbar from '$lib/components/productnavbar.svelte';
	import {onMount} from 'svelte'

	let isLoading = true;
	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	});

	export let data;
	let { session, supabase, userNow, boyAll, itemCount } = data;
	$: ({ session, supabase, userNow, boyAll, itemCount } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	function gotocart() {
		window.open('/auth/cart', '_self');
	}
	function gotoCategory(key) {
		window.open(`/auth/allproduct/boy/${key}`, '_self');
	}
	function scrollToElement(id) {
		const element = document.getElementById(id);
		if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<Productnavbar {userNow} {itemCount} />



<div class="pt-[100px]">
	{#if isLoading}
	<div class="flex justify-center">
		<div class="w-1/5 ">
				
			<div class="list-none md:mt-16 md:sticky top-44">
				<p class="skeleton w-4/5 h-4"></p>
				{#each Array(6) as _,i}
					<li class="skeleton h-4 w-1/3 my-2  ">
					</li>
				{/each}
			</div>

		</div>
		<div class="w-3/5">
			{#each Array(5) as _,i}
				<div class="my-5">
					<div class="skeleton h-6 w-56 p-4 m-4"></div>

					<div class="flex md:gap-4">
						{#each Array(3) as _,j}
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
		<div class="flex justify-center">
			<div class="w-1/5 ">
				
				<div class="list-none md:mt-16 md:sticky top-44">
					<p class="px-5 pl-6 text-[30px] font-bold border-b-[2px]">Category</p>
					{#each Object.keys(boyAll) as key}
						<li class="cursor-pointer p-0 pl-6 m-2 mx-5  text-[24px] uppercase border-b-2 hover:scale-105">
							<button on:click={()=>scrollToElement(key)}>{key}</button>
						</li>
					{/each}
				</div>

			</div>
			<div class="w-3/5">
				{#each Object.keys(boyAll) as key}
					<div class="my-5" id={key}>
						<div class="flex flex-row justify-between">
							<p class="text-[35px] font-bold uppercase py-5">{key}</p>
							<button class="flex flex-row space-x-2 py-5 mt-2" on:click={() => gotoCategory(key)}>
								<p class="font-semibold mt-1 hover:font-bold">View All</p>
								<img
									src={rightArrow}
									alt="Product"
									class="h-8 object-top rounded-t-xl hover:scale-125"
								/>
							</button>
						</div>
		
						<div class="flex md:gap-4">
							{#each boyAll[key]['points'] as item}
								<div class="">
									<div
										class="w-72 bg-white shadow-md rounded-xl overflow-hidden duration-500 hover:shadow-xl"
									>
										<a href="/auth/productview/{item.id}">
											<img
												src={item.payload.Image_links[0]}
												alt="Product"
												class="h-80 w-72 object-top rounded-t-xl hover:scale-105"
											/>
											<div class="px-4 py-3 w-72">
												<span class="text-gray-400 mr-3 uppercase text-xs">{item.payload.Company}</span>
												<p class="text-lg font-bold text-black truncate block capitalize">
													{item.payload.Name}
												</p>
												<div class="flex items-center">
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

<!-- <pre>{JSON.stringify(menAll, null, 2)}</pre> -->
