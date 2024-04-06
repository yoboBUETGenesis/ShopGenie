<script lang="ts">
  import {  slider } from "$lib/helpers";
  import Lightbox from "./Lightbox.svelte";
  export let imgs: Array<string>; // Props
  let lightboxToggleEl: HTMLElement;
  let lightboxOpen: boolean = false;
  const toggleLightboxOpen = () => (lightboxOpen = !lightboxOpen);
  $: slides = imgs;

  let innerWidth = 0;
  $: lighboxActive = innerWidth >= 1024;
</script>

<svelte:window bind:innerWidth />

<div use:slider class="lg:max-w-md">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    data-slider-wrapper
    tabindex="0"
    on:click={() => lighboxActive && toggleLightboxOpen()}
    bind:this={lightboxToggleEl}
    on:keydown={(e) => {
      if (e.key === "Enter" && lighboxActive) {
        e.preventDefault();
        toggleLightboxOpen();
      }
    }}
    class="relative w-full max-h-[28rem] lg:max-h-full lg:rounded-xl overflow-hidden cursor-pointer"
  >
    <!-- Previous -->
    <button
      aria-label="Previous slide"
      disabled
      data-slider-prev
      class="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 px-3 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-10 disabled:bg-neutral-100/25 transition-colors duration-300"
    >
      <svg class="w-3 pr-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1 3 9l8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
      </svg>
    </button>
    <!-- Next -->
    <button
      aria-label="Next slide"
      data-slider-next
      class="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 px-3 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-10 disabled:bg-neutral-100/25 transition-colors duration-300"
    >
      <svg class="w-3 pl-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
        <path d="m2 1 8 8-8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
      </svg>
    </button>
    <!-- Inner slider-->
    <ul data-slider-inner class="max-h-[70vh] flex transition-transform duration-300">
      <!-- Slides -->
      {#each slides as img, index (index)}
        <li class="basis-full shrink-0">
          <img src={img} alt="" class="w-full object-cover" />
        </li>
      {/each}
    </ul>
  </div>
  <!-- Pagination -->
  <ul class="hidden lg:flex lg:justify-center lg:gap-2 lg:mt-2">
    {#each slides as img, index (`thumbnail ${index}`)}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <li
        data-slider-pagination={index}
        class:pagination-disabled={index === 0}
        tabindex="0"
        class="max-w-[25%] rounded-xl overflow-hidden cursor-pointer transition-all hover:opacity-50 duration-300"
      >
        <img src={img} alt="" class="w-full aspect-square" />
      </li>
    {/each}
  </ul>
</div>
<Lightbox {imgs} isOpen={lightboxOpen} toggleCallBack={toggleLightboxOpen} toggleElement={lightboxToggleEl} />
