<script>
	// @ts-nocheck
	import aarongimage from '$lib/images/Aarong Logo Vector.svg';
	import allen from '$lib/images/Allen.svg';
	import apex from '$lib/images/apex.png';
	import Slider from '$lib/components/Slider.svelte';

	export let data;
	let { session, supabase, userNow, item, itemCount, cartok } = data;
	$: ({ session, supabase, userNow, item, itemCount, cartok } = data);
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
						<li><a>Settings</a></li>
						<li><a>Logout</a></li>
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
				<a href={item.payload.Link}>
					<p class="text-[70px] leading-0 font-bold leading-tight">{item.payload.Name}</p>
				</a>
				<p>
					<span class="font-semibold">Category &gt</span>
					<span class="font-light">{item.payload.Category}</span>
				</p>
				<p class="text-[24px] text-justify my-4 text-[#5a5a59]">{item.payload.Description}</p>

				<div class="flex justify-between border-b-[2px] border-black p-2">
					<p class="text-[24px] font-bold">Reviews/Blogs</p>
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aut excepturi voluptate?
						Consectetur odio, quas doloremque temporibus reiciendis omnis rerum laborum rem culpa
						nihil nostrum vel voluptate. Modi alias labore eius aperiam, qui optio architecto
						eveniet dicta nesciunt dolorum voluptatum!
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
	</div>

	<!-- related product -->
	<div>
		<p class="text-[40px] mt-5">Related Products</p>

		<!-- cart show -->
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
