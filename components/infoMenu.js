import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Button, Card, Flex, Grid, Image, Input, Text } from "theme-ui";

export default function InfoMenu({ material }) {
  return (
    <Box sx={{ height: "100%" }}>
      {/* <Button variant="textButton"> Pictures </Button> */}
      <Box my="3" sx={{ fontWeight: "bold" }} variant="textButton">
        <Text>Comments</Text>
      </Box>

      <Box
        sx={{
          display: "Grid",
          height: "100%",
        }}
      >
        <Text variant="label">Share something about this material...</Text>

        <Grid
          columns={["1fr auto"]}
          sx={{ height: "40px", alignItems: "center" }}
        >
          <Input
            sx={{
              borderRadius: "extra",
              outlineColor: "primary",
              backgroundColor: "gray300",
            }}
            placeholder="Type a comment"
          />

          <Button
            variant="roundIconButton"
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
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}
