// Config
const focusableSelectors = "a[href]:not([disabled='true']), button:not([disabled='true']), [tabIndex]";

interface Props {
  toggleElement: HTMLElement;
  closeCallback: () => void;
  shouldTrap: boolean;
}

// Function
export function trapFocus(element: HTMLElement, props: Props) {
  const focusableEls = Array.from(element.querySelectorAll(focusableSelectors)) as HTMLElement[];
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];
  let isTrap = false;

  const handleTrapFocus = (e: KeyboardEvent) => {
    const isTabPressed = e.key === "Tab";
    const isEscPressed = e.key === "Escape";
    if (!isTabPressed && !isEscPressed) return;
    if (isEscPressed) return props.closeCallback();
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  const start = () => {
    if (isTrap) return;
    isTrap = true;
    firstFocusable.focus();
    element.addEventListener("keydown", handleTrapFocus);
  };

  const stop = () => {
    if (!isTrap) return;
    isTrap = false;
    element.removeEventListener("keydown", handleTrapFocus);
    props.toggleElement.focus();
  };

  props.shouldTrap ? start() : stop();

  return {
    update(newProps: Props) {
      props = newProps;
      props.shouldTrap ? start() : stop();
    },
    destroy() {
      stop();
    },
  };
}
