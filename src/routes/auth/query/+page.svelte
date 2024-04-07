<script lang="ts">
	import genie from '$lib/images/genie.png';
	import { enhance } from '$app/forms';
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { onMount } from 'svelte';
	import { json } from '@sveltejs/kit';
	// import { Pulse } from 'svelte-loading-spinners';

	let recognizedSpeech = '';
	let hearingRunning = false;
	let mediaRecorder: any;
	let chunks: any[] = [];

	function handleHearingStart() {
		hearingRunning = true;
		startRecording();
	}

	function handleHearingStop() {
		stopRecording();
		hearingRunning = false;
	}
	async function startRecording() {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = function (e) {
			chunks.push(e.data);
		};

		mediaRecorder.onstop = async function () {
			const blob = await new Blob(chunks, { type: 'audio/mp3' });
			const recordedAudioFile = await new File([blob], 'recorded_audio.mp3', { type: 'audio/mp3' });
			// console.log(recordedAudioFile)

			const formData = new FormData();
			formData.append('audioFile', recordedAudioFile);

			// const ret = await fetch('/api/transcribe', {
			// 	method: 'POST',
			// 	body: formData
			// });

			// const res = await ret.json();
			// recognizedSpeech = res['text'];

			chunks = [];
		};

		mediaRecorder.start();
	}

	function stopRecording() {
		mediaRecorder.stop();
	}

	onMount(() => {});

	export let data;
	export let form;
	let { session, supabase, userNow, itemCount } = data;
	$: ({ session, supabase, userNow, itemCount } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	let image: any;
	let textquery: string;
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
	// $: {
	// 	if (form?.success === 'done') {
	// 		console.log(form.text);
	// 	}
	// 	form?.success = "";
	// }

	let textSearchResult = []
	let imageSearchResult = []

	async function textSubmit() {
		// console.log(textquery);
		let payload = {text: textquery}
		// console.log(payload)
		
		// console.log("Here")
		const ret = await fetch('/api/summary-search', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		// console.log(ret)

		const res = await ret.json()
		// console.log(res)
		textSearchResult = res["list"]

		// console.log(textSearchResult) 
		// console.log("Here")
		textquery = ""
	}

	async function imageSubmit(event: Event) {
		const formData = new FormData(event.target as HTMLFormElement);
		
		const ret = await fetch('/api/image-search', {
			method: 'POST',
			body: formData
		});
		const res = await ret.json()
		imageSearchResult = res["list"]

		console.log(imageSearchResult)
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

<div class="p-6 rounded-lg w-full m-4 dark:bg-[#212020]">
	<div class="flex flex-col justify-center items-center mb-3">
		<h2 class="text-2xl font-bold font-serif">Input For Query</h2>
	</div>

		<div class="flex flex-row space-x-10">
			<div class="w-1/3">
				<h1>Textual Query</h1>
				<form
					on:submit|preventDefault={textSubmit}
				>
					<input
						class="input input-bordered dark:placeholder:text-[#ffffff9e] w-full max-w-xs"
						type="text"
						id="textquery"
						name="textquery"
						bind:value={textquery}
						placeholder="Enter The Query"
					/>
					<button
						type="submit"
						class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
					>
						Submit
					</button>
				</form>
			</div>
			<div class="w-1/3">
				<h1>Photo (optional)</h1>
				<form
					on:submit|preventDefault={imageSubmit}
					enctype="multipart/form-data"
				>
				<input
					class="file-input w-full max-w-xs"
					type="file"
					id="image"
					name="image"
					bind:value={image}
				/>
				<button
					type="submit"
					class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
				>
					Submit
				</button>
			</form>
			</div>
			{#if hearingRunning}
				<button
					class="bg-green-300 text-base text-black hover:bg-green-500 m-5 gap-1 rounded-md p-2"
					disabled={true}
					on:click={handleHearingStart}
				>
					Recording
				</button>
			{:else}
				<button
					class="bg-green-300 text-base text-black hover:bg-green-500 m-5 gap-1 rounded-md p-2"
					on:click={handleHearingStart}>Hearing Start</button
				>
			{/if}
			{#if hearingRunning}
				<button
					class="bg-red-500 text-base text-black hover:bg-red-700 m-5 gap-1 rounded-md p-2"
					on:click={handleHearingStop}>Hearing Stop</button
				>
			{:else}
				<button
					class="bg-red-500 text-base text-black hover:bg-red-700 m-5 gap-1 rounded-md p-2"
					disabled
					on:click={handleHearingStop}>Hearing Stop</button
				>
			{/if}
		</div>
		<div class="mt-9 flex flex-col items-center justify-center">
			<button
				type="submit"
				class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
			>
				Submit
			</button>
		</div>

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
