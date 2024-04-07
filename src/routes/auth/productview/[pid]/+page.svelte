<script>
	// @ts-nocheck
	import aarongimage from '$lib/images/Aarong Logo Vector.svg';
	import { enhance } from '$app/forms';
	import allen from '$lib/images/Allen.svg';
	import apex from '$lib/images/apex.png';
	import Slider from '$lib/components/Slider.svelte';

	export let data;
	let { session, supabase, userNow, item, itemCount, cartok, recommendation, reviews } = data;
	$: ({ session, supabase, userNow, item, itemCount, cartok, recommendation, reviews } = data);
	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/login', '_self');
	};

	import genie from '$lib/images/genie.png';
	import Themeswitcher from '$lib/themeswitcher.svelte';

	function gotocart() {
		window.open('/auth/cart', '_self');
	}

	let isOpenReview = false;
	let isOpenSpec = false;

	let productid;
	let body;

	let showaddmodal = false;
	function addReviewModel() {
		showaddmodal = true;
		console.log('click new class');
	}

	function closeReviewModel() {
		showaddmodal = false;
	}
</script>

<div>
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
							<a class="justify-between"> Profile </a>
						</li>

						<li><button on:click={handleSignOut}>Logout</button></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<div class="w-full flex justify-center">
		<div class="w-4/5 md:space-x-4 flex flex-col md:flex-row justify-center">
			<div class="w-full md:w-1/2">
				<Slider imgs={item.payload.Image_links} />
			</div>

			<div class="w-full md:w-1/2 h-full flex flex-col justify-center">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="flex flex-row justify-between">
					<div class="flex flex-row space-x-3">
						{#if item.payload.Company === 'Aarong'}
							<img src={aarongimage} alt="" class="w-20 h-20" />
						{:else if item.payload.Company === 'Allen Solly'}
							<img src={allen} alt="" class="w-20 h-20" />
						{:else}
							<img src={apex} alt="" class="w-20 h-20" />
						{/if}
						<!-- <p class="font-extrabold text-xl mt-1">{item.payload.Company}</p> -->
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="flex flex-row space-x-3 p-2 items-center justify-center rounded-lg bg-gray-200 hover:scale-105 hover:bg-gray-400"
						on:click={addReviewModel}
					>
						<img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/plus-add-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 mr-1 hover:rotate-12"
						/>
						<h1>Add New Review</h1>
					</div>
				</div>

				<a href={item.payload.Link}>
					<p class="text-[70px] leading-0 font-bold leading-tight">{item.payload.Name}</p>
				</a>
				<p>
					<span class="font-semibold">Category &gt</span>
					<span class="font-light">{item.payload.Category}</span>
				</p>
				<p class="text-[24px] text-justify my-4 text-[#5a5a59]">{item.payload.Description}</p>

				<div class="flex justify-between border-b-[2px] border-black p-2">
					<p class="text-[24px] font-bold">Reviews</p>
					<div>
						{#if isOpenReview}
							<button on:click={() => (isOpenReview = !isOpenReview)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
								</svg>
							</button>
						{:else}
							<button on:click={() => (isOpenReview = !isOpenReview)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
							</button>
						{/if}
					</div>
				</div>
				{#if isOpenReview}
					<div class="text-[23px] ml-4 text-justify text-[#5a5a59]">
						<h1 class="font-semibold">Positive Reviews</h1>
						{#each reviews as review}
							{#if review.sentiment === 'positive'}
								<p>
									{review.body}
								</p>
							{/if}
						{/each}
						<h1 class="font-semibold">Negative Reviews</h1>
						{#each reviews as review}
							{#if review.sentiment === 'negative'}
								<p>
									{review.body}
								</p>
							{/if}
						{/each}
						<h1 class="font-semibold">Neutral Reviews</h1>
						{#each reviews as review}
							{#if review.sentiment === 'neutral'}
								<p>
									{review.body}
								</p>
							{/if}
						{/each}
					</div>
				{/if}

				<div class="flex justify-between border-b-[2px] border-black p-2">
					<p class="text-[24px] font-bold">Specification</p>
					<div>
						{#if isOpenSpec}
							<button on:click={() => (isOpenSpec = !isOpenSpec)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
								</svg>
							</button>
						{:else}
							<button on:click={() => (isOpenSpec = !isOpenSpec)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
							</button>
						{/if}
					</div>
				</div>
				{#if isOpenSpec}
					<div class="text-[23px] ml-4 text-justify my-4 text-[#5a5a59] mt-0 pt-0">
						{item.payload.Specifications}
					</div>
				{/if}

				<!-- <p class="text-[24px] font-bold">Specification:</p>
				<p>
					{item.payload.Specifications}
				</p> -->

				<div class="flex flex-col md:flex-row justify-between mt-5">
					<p class="text-[40px] font-bold">{item.payload.Price}</p>
					{#if cartok.length > 0}
						<button class="flex items-center border-[2px] border-black p-3 px-8" disabled={true}>
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
							<span class="text-[23px] p-1">Already Added</span>
						</button>
					{:else}
						<form action="?/addtoCart" method="POST">
							<button class="flex items-center border-[2px] border-black p-3 px-8" type="submit">
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
								<span class="text-[23px] p-1">Add to Cart</span>
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
		{#if showaddmodal}
			<div
				class="fixed inset-0 bg-sky-100 bg-opacity-50 flex justify-center items-center z-50 transition-opacity dark:text-[#e1e1e1]"
			>
				<div class="bg-blue-200 p-4 rounded-lg shadow-lg max-w-md w-full dark:bg-[#212020]">
					<div class="flex justify-between items-center mb-3">
						<h2 class="text-2xl font-bold">Add a Review</h2>
						<button class=" text-lg" on:click={closeReviewModel}>&times;</button>
					</div>

					<form
						use:enhance
						class="flex flex-col items-center justify-center"
						action="?/review"
						method="POST"
						on:submit={() => {
							closeReviewModel();
						}}
					>
						<div>
							<h1 class="font-semibold">Review Body</h1>
							<label class="label">
								<textarea
									class="textarea textarea-bordered dark:placeholder:text-[#ffffff9e]"
									rows="4"
									placeholder="Your Review"
									id="body"
									name="body"
									bind:value={body}
								/>
							</label>
							<div class="flex flex-col items-center justify-center">
								<button
									type="submit"
									class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		{/if}
	</div>

	<!-- related product -->
	<div>
		<p class="text-[40px] mt-5 ml-10">Related Products</p>

		<section
			id="Projects"
			class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
		>
			{#each recommendation as item}
				<div
					class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
				>
					<a href="/auth/productview/{item.id}">
						<img
							src={item.payload.Image_links[0]}
							alt="Product"
							class="h-80 w-72 object-cover rounded-t-xl"
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
					>
						<button type="submit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-trash"
								viewBox="0 0 16 16"
								data-toggle="tooltip"
								data-placement="top"
								style="transition: transform 0.3s"
								onmouseover="this.style.transform = 'rotate(360deg)'"
								onmouseout="this.style.transform = 'rotate(0deg)'"
							>
								<path
									d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
								/>
								<path
									fill-rule="evenodd"
									d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
								/>
							</svg>
						</button>
					</form>
				</div>
			{/each}
			<!--   ✅ Product card 1 - Starts Here 👇 -->
		</section>
	</div>
</div>
<pre>{JSON.stringify(item, null, 2)}</pre>

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
