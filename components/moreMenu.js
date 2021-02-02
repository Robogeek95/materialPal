import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Text } from "theme-ui";
import BarModal from "./barModal";

export default function MoreMenu() {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);
  const detailsDisplayAreaRef = useRef(null);

  return (
    <>
      <Box ref={boxRef} id="more">
        <Button variant="roundIconButton" onClick={() => setOpen(!open)}>
          <Box sx={{ width: "20px", height: "20px" }}>
            <FontAwesomeIcon size="lg" icon={faEllipsisH} />
          </Box>
        </Button>
      </Box>

      {/* <BarModal
        isOpen={detailsOpen}
        displayAreaRef={detailsDisplayAreaRef}
        parentRef={boxRef}
        onClose={() => setOpen(false)}
        parentID="detailCard"
      >
        <Grid
          columns={["100%", null, "60%", "45%"]}
          // ref={reference}
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            // position: "fixed",
            overflow: "auto",
            width: "100%",
            height: "100%",
            zIndex: "1000",
            top: 0,
            left: 0,
            alignItems: "center",
            justifyContent: "center",
            py: 5,
            // mb: 5,
          }}
        >
          <Text variant="display2">Details</Text>
        </Grid>
      </BarModal> */}

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
          <Button
            variant="textButton"
            // onClick={() => setDetailsOpen(!detailsOpen)}
            sx={{ textAlign: "left" }}
          >
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
