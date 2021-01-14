import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Text } from "theme-ui";
import BarModal from "./barModal";

export default function MoreMenu() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);

  return (
    <>
      <Box ref={boxRef} id="more">
        <Button variant="roundIconButton" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon size="lg" icon={faEllipsisH} />
        </Button>
      </Box>

      <BarModal
        isOpen={open}
        displayAreaRef={displayAreaRef}
        parentRef={boxRef}
        onClose={() => setOpen(false)}
        parentID="more"
      >
        <Grid
          ref={displayAreaRef}
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
      </BarModal>
    </>
  );
}
