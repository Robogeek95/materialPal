import { faPhone, faShare, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid } from "theme-ui";
import ReactDOM from "react-dom";
import BarModal from "./barModal";

const Share = () => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);
  return (
    <>
      <Box id="share">
        <Button
          ref={boxRef}
          variant="roundIconButton"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon size="lg" icon={faShare} />
        </Button>
      </Box>
      <BarModal
        isOpen={open}
        displayAreaRef={displayAreaRef}
        parentRef={boxRef}
        onClose={() => setOpen(false)}
        parentID="share"
      >
        <Grid
          ref={displayAreaRef}
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
      </BarModal>
    </>
  );
};

export default Share;
