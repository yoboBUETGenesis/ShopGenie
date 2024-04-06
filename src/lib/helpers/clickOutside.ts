interface Props {
  callback: () => void;
  toggleElement: HTMLElement;
  shouldListen: boolean;
}

export function clickOutside(element: HTMLElement, props: Props) {
  let listening = false,
    childs: HTMLElement[] = [];

  const addChildNode = (node: HTMLElement) => childs.push(node);
  function getAllChildNodes(element: HTMLElement) {
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i] as HTMLElement;
      addChildNode(node);
      getAllChildNodes(node);
    }
  }
  getAllChildNodes(element);

  function onClick(e: MouseEvent) {
    if (!childs.includes(e.target as HTMLElement)) {
      props.callback();
    }
  }

  function start() {
    if (listening) return;
    listening = true;
    document.body.addEventListener("click", onClick);
  }

  function stop() {
    if (!listening) return;
    listening = false;
    document.body.removeEventListener("click", onClick);
    props.toggleElement.focus();
  }

  props.shouldListen ? start() : stop();

  return {
    update(newProps: Props) {
      props = newProps;
      props.shouldListen ? start() : stop();
    },
    destroy() {
      stop();
    },
  };
}
