<script lang="ts">
  import { blur } from "svelte/transition";
  import { slider, trapFocus } from "$lib/helpers";
  export let imgs: Array<string>; // Props
  $: slides = imgs;

  export let isOpen: boolean;
  export let toggleElement: HTMLElement;
  export let toggleCallBack: () => void;
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    transition:blur={{ duration: 300 }}
    use:trapFocus={{ shouldTrap: isOpen, closeCallback: toggleCallBack, toggleElement }}
    on:click|stopPropagation|self={toggleCallBack}
    class="flex fixed inset-0 justify-center items-center bg-neutral-400/90 z-50 transition-opacity duration-300 cursor-pointer"
  >
    <div use:slider class="max-w-lg">
      <div class="relative">
        <!-- Close -->
        <button
          aria-label="Close lightbox"
          on:click={toggleCallBack}
          class="mb-1 absolute bottom-full -right-2 z-50 text-neutral-100 hover:text-primary transition-colors duration-300 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 aspect-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Previous -->
        <button
          aria-label="Previous slide"
          disabled
          data-slider-prev
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-50 disabled:bg-neutral-100/25 transition-colors duration-300"
        >
          <svg class="w-3 pr-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1 3 9l8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
          </svg>
        </button>
        <!-- Next -->
        <button
          aria-label="Next slide"
          data-slider-next
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 px-4 aspect-square grid place-content-center bg-neutral-100 hover:enabled:text-primary rounded-full z-50 disabled:bg-neutral-100/25 transition-colors duration-300"
        >
          <svg class="w-3 pl-0.5" viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
            <path d="m2 1 8 8-8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
          </svg>
        </button>
        <div data-slider-wrapper class="rounded-xl overflow-hidden">
          <!-- Inner slider-->
          <ul data-slider-inner class="flex max-h-[70vh] transition-transform duration-300">
            <!-- Slides -->
            {#each slides as full, index (index)}
              <li class="basis-full shrink-0">
                <img src={full} alt="" class="w-full object-cover object-center" />
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <!-- Pagination -->
      <ul class="flex justify-center gap-2 mt-2 px-2">
        {#each slides as img, index (`thumbnail ${index}`)}
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <li
            data-slider-pagination={index}
            class:pagination-disabled={index === 0}
            tabindex={isOpen ? 0 : -1}
            class="max-w-[25%] rounded-xl overflow-hidden cursor-pointer transition-all hover:opacity-50 duration-300"
          >
            <img src={img} alt="" class="w-full aspect-square" />
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}
