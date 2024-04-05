<script>
	import { enhance } from '$app/forms';

	export let data;
	let { session, supabase, userNow } = data;
	$: ({ session, supabase, userNow } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	function calculateAge(dob) {
		const today = new Date();
		const birthDate = new Date(dob);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
	let dob = userNow.dob;
	let dobModal = false;
	function adddobModal() {
		dobModal = true;
	}

	function closedobModal() {
		dobModal = false;
	}

	let pic = userNow.image;
	let picModal = false;
	function addpicModal() {
		picModal = true;
	}

	function closepicModal() {
		picModal = false;
	}
</script>

<section class="min-h-screen pl-16 pr-16 dark:text-[#e1e1e1] dark:bg-[#212020]">
	<div class="flex flex-row space-x-24">
		<div class="flex flex-col w-1/3 mt-4">
			<!-- svelte-ignore missing-declaration -->
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				src={userNow.image}
				alt="User Image"
				class="rounded-full w-36 h-36 ml-10 mb-4 object-cover"
				on:click={addpicModal}
			/>

			<h1 class="text-4xl font-extrabold">
				{userNow.name}
			</h1>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-img-redundant-alt -->

			{#if userNow.gender === 'Male'}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<div class="flex flex-row space-x-2 mt-9 mb-2">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/male-student-13-svgrepo-com.svg"
						alt="male"
						class="rounded-full w-8 h-8 object-cover"
					/>
					<h1 class="font-semibold">Male</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
				</div>
			{:else if userNow.gender === 'Female'}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="flex flex-row space-x-2 mt-9 mb-2">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/female-person-svgrepo-com.svg"
						alt="female"
						class="rounded-full w-8 h-8 object-cover"
					/>
					<h1 class="font-semibold">Female</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				</div>
			{:else}
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<div class="flex flex-row space-x-2 mt-9 mb-2">
					<h1 class="font-semibold">Gender is undefined</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={addgenderModal}
					/>
				</div>
			{/if}
			{#if userNow.dob}
				<div class="flex flex-row space-x-1 mt-6 mb-2">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/date-question-svgrepo-com.svg"
						alt="age"
						class="rounded-full w-7 h-7 mr-2 object-cover"
					/>
					<h1 class="font-semibold">Age: {calculateAge(userNow.dob)}</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={adddobModal}
					/>
				</div>
			{:else}
				<div class="mt-6 flex flex-row">
					<h1 class="font-semibold">Age is undefined</h1>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/edit-svgrepo-com.svg"
						alt="Bout us"
						class="rounded-full w-6 h-6 object-cover hover:rotate-12"
						on:click={adddobModal}
					/>
				</div>
			{/if}
			<div class="flex flex-row space-x-2 mt-9 mb-2">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connect-svgrepo-com.svg"
					alt="Bout us"
					class="rounded-full w-8 h-8 object-cover"
				/>
				<h1 class="font-bold text-xl">Communicate</h1>
			</div>
			<div class="flex flex-row mt-4">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
					alt="User Image"
					class="w-5 h-5 mr-3 hover:scale-105 hover:rotate-12"
				/>
				<h1>{userNow.email}</h1>
			</div>
		</div>
	</div>

	{#if picModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Add a new Profile picture</h2>
					<button class=" text-lg" on:click={closepicModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addPic"
					method="POST"
					enctype="multipart/form-data"
					on:submit={() => {
						closepicModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Photo</span>

							<input class="input" type="file" id="pic" name="pic" bind:value={pic} />
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	{#if dobModal}
		<div
			class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition-opacity backdrop-blur-sm"
		>
			<div class="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full m-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Date of Birth</h2>
					<button class=" text-lg" on:click={closedobModal}>&times;</button>
				</div>

				<form
					use:enhance
					action="?/addDob"
					method="POST"
					on:submit={() => {
						closedobModal();
					}}
				>
					<div class="flex flex-col space-y-6">
						<label class="label text-left mb-3">
							<span>Date of Birth</span>

							<input class="input" type="date" id="dob" name="dob" bind:value={dob} />
						</label>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</section>
