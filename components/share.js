import {
  faPen,
  faPhone,
  faCopy,
  faShare,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "theme-ui";
import ReactDOM from "react-dom";

const Share = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box id="share">
        <Button variant="roundIconButton" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon size="lg" icon={faShare} />
        </Button>
      </Box>

      <Modal
        message="Hello World!"
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Share;

const Modal = ({ message, isOpen, onClose }) => {
  let container;
  let displayAreaRef;
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div");
    const parentElem = document.querySelector("#share");
    parentElem.appendChild(rootContainer);
    container = rootContainer;
  }

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // });

  const handleClickOutside = (event) => {
    const { path } = event;
    if (!path.includes(displayAreaRef)) {
      onClose();
    }
  };

  const elem = isOpen ? (
    <Grid
      ref={(ref) => (displayAreaRef = ref)}
      columns={["auto auto"]}
      sx={{
        position: "absolute",
        bg: "gray300",
        p: [2],
        mt: [3],
        borderRadius: "default",
      }}
    >
      <Button variant="roundIconButton">
        <FontAwesomeIcon size="lg" icon={faLink} />
      </Button>
      <Button variant="roundIconButton">
        <FontAwesomeIcon size="lg" icon={faPhone} />
      </Button>

      <Button variant="roundIconButton">
        <FontAwesomeIcon size="lg" icon={faPhone} />
      </Button>
    </Grid>
  ) : null;

  return container ? ReactDOM.createPortal(elem, container) : "";
};
