import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Text } from "theme-ui";
import ReactDOM from "react-dom";

export default function MoreMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box id="more">
        <Button variant="roundIconButton" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon size="lg" icon={faEllipsisH} />
        </Button>
      </Box>

      <Modal
        message="Hello World!"
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

const Modal = ({ message, isOpen, onClose }) => {
  let container;
  let displayAreaRef;
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div");
    const parentElem = document.querySelector("#more");
    parentElem.appendChild(rootContainer);
    container = rootContainer;
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { path } = event;
    if (!path.includes(displayAreaRef)) {
      onClose();
    }
  };

  const elem = isOpen ? (
    <Grid
      ref={(ref) => (displayAreaRef = ref)}
      sx={{
        position: "absolute",
        bg: "gray300",
        p: [2],
        mt: [3],
        borderRadius: "default",
      }}
    >
      <Button variant="textButton" sx={{ textAlign: "left" }}>
        Details
      </Button>
      <Button variant="textButton" sx={{ color: "red" }}>
        Report or flag
      </Button>
    </Grid>
  ) : null;

  return container ? ReactDOM.createPortal(elem, container) : null;
};
