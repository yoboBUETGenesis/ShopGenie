export function slider(element: HTMLElement) {
  const prevBtn = element.querySelector("[data-slider-prev]") as HTMLElement;
  const nextBtn = element.querySelector("[data-slider-next]") as HTMLElement;
  const wrapper = element.querySelector("[data-slider-wrapper]") as HTMLElement;
  const inner = element.querySelector("[data-slider-inner]") as HTMLElement;
  const paginationEls = Array.from(element.querySelectorAll("[data-slider-pagination]")) as HTMLElement[];
  const maxIndex = inner!.childNodes.length - 1;
  let slideWidth = wrapper.clientWidth;
  let currIndex = 0;
  let moving = false;

  const enableAllBtns = () => {
    prevBtn.removeAttribute("disabled");
    prevBtn.removeAttribute("aria-disabled");
    nextBtn.removeAttribute("disabled");
    nextBtn.removeAttribute("aria-disabled");
  };

  const enableAllPaginationEls = () =>
    paginationEls.forEach((el) => {
      el.classList.remove("pagination-disabled");
      el.removeAttribute("aria-disabled");
      el.style.cursor = "pointer";
    });

  const handleDisableBtn = () => {
    if (currIndex === 0) prevBtn.setAttribute("disabled", "true");
    if (currIndex === maxIndex) nextBtn.setAttribute("disabled", "true");
  };

  const handleDisablePagination = () => {
    paginationEls[currIndex].classList.add("pagination-disabled");
    paginationEls[currIndex].style.cursor = "auto";
    paginationEls[currIndex].setAttribute("aria-disabled", "true");
  };

  const updateIndex = (event: Event) => {
    if (event.currentTarget === prevBtn || event.currentTarget === nextBtn) {
      if (event.currentTarget === prevBtn && currIndex === 0) return false;
      if (event.currentTarget === nextBtn && currIndex === maxIndex) return false;
      event.currentTarget === prevBtn ? currIndex-- : currIndex++;
    } else {
      const newIndex = parseInt((event.currentTarget as HTMLElement).dataset.sliderPagination as string);
      if (newIndex === currIndex) return false;
      currIndex = newIndex;
    }
    return true;
  };

  const translate = () => (inner.style.transform = `translateX(-${currIndex * slideWidth}px)`);

  const move = (e: Event) => {
    e.stopPropagation();
    if (moving || updateIndex(e) === false) return;
    moving = true;
    enableAllBtns();
    enableAllPaginationEls();
    translate();
  };

  const paginationEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") move(e);
  };

  const sliderResizeObserver = new ResizeObserver((entries) => {
    slideWidth = Math.round(entries[0].contentRect.width);
    translate();
  });

  const transitionStart = () => {
    handleDisableBtn();
    handleDisablePagination();
  };
  const transitionEnd = () => (moving = false);

  const destroySlider = () => {
    prevBtn.removeEventListener("click", move);
    nextBtn.removeEventListener("click", move);
    paginationEls.forEach((el) => {
      el.removeEventListener("click", move);
      el.removeEventListener("keydown", paginationEnter);
    });
    inner.removeEventListener("transitionstart", transitionStart);
    inner.removeEventListener("transitionend", transitionEnd);
    sliderResizeObserver.disconnect();
  };

  (function initSLider() {
    prevBtn.addEventListener("click", move);
    nextBtn.addEventListener("click", move);
    paginationEls.forEach((el) => {
      el.addEventListener("click", move);
      el.addEventListener("keydown", paginationEnter);
    });
    inner.addEventListener("transitionstart", transitionStart);
    inner.addEventListener("transitionend", transitionEnd);
    sliderResizeObserver.observe(wrapper);
  })();

  return {
    destroy() {
      destroySlider();
    },
  };
}
