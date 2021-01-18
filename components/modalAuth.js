import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Button, Grid } from "theme-ui";
import SignUpForm from "./SignupForm";

export default function ModalAuth({ onClose, reference }) {
  return (
    <Grid
      columns={["100%", null, "60%", "45%"]}
      ref={reference}
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
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
      <Box sx={{ bg: "gray100", p: [4], borderRadius: "default" }}>
        <Grid columns="auto" sx={{ justifyContent: "end" }}>
          <Button
            variant="roundIconButton"
            onClick={() => onClose()}
            sx={{
              borderRadius: "circle",
              bg: "primary",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              width: "40px",
              color: "gray100",
              ":hover": {
                bg: "lighter",
              },
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Grid>
        <SignUpForm />
      </Box>
    </Grid>
  );
}
