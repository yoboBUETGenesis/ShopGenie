<div class="dropdown">
	<div tabindex="0" role="button" class=" m-1">
		<img
			src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/sun-light-theme-svgrepo-com.svg"
			alt="Dashboard Icon"
			class="h-7 mr-1 hover:rotate-12"
		/>
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content z-[1] p-2 mr-6 shadow-2xl bg-base-300 rounded-box w-52">
		<li>
			<input
				type="radio"
				name="theme-dropdown"
				class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
				aria-label="light"
				value="light"
			/>
		</li>
		<li>
			<input
				type="radio"
				name="theme-dropdown"
				class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
				aria-label="dark"
				value="dark"
			/>
		</li>
	</ul>
</div>
