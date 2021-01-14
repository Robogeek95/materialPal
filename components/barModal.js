import React, { useEffect, useRef } from "react";
import { Button, Grid } from "theme-ui";
import ReactDOM from "react-dom";

export default function BarModal({
  isOpen,
  onClose,
  parentRef,
  displayAreaRef,
  children,
  parentID,
}) {
  let container;
  // since next.js renders on node.js environment, wait until the code gets into browser
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div");
    const parentElem = document.querySelector(`#${parentID}`);
    console.log(`#${parentID}`);
    parentElem.appendChild(rootContainer);
    container = rootContainer;
  }

  // tracks isOpen state from more icon, and adds click handler if the modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }
  }, [isOpen]);

  // the click handler enables to close the modal when user clicks outside the modal
  // by checking if the modal ref was contained in the click event path
  function handleClickOutside(event) {
    const { path } = event;
    if (
      !path.includes(displayAreaRef.current) &&
      !path.includes(parentRef.current)
    ) {
      document.removeEventListener("click", handleClickOutside, true);
      onClose();
    }
  }

  // conditionally return the element based on isOpen state
  const elem = isOpen ? children : null;

  // if container is not defined (still in node environment), return null
  return container ? ReactDOM.createPortal(elem, container) : null;
}
