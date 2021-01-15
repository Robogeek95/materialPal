import { faCaretDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Button, Grid, IconButton, Text } from "theme-ui";

export default function Filter() {
  return (
    <Grid
      columns="1fr auto"
      gap={[3, 4]}
      pt={[3, 4]}
      sx={{
        ".input_container": {
          background: "#FFFFFF",
          boxShadow: "small",
          borderRadius: "default",
          border: "1px solid black",
          ":hover": {
            boxShadow: "elevated",
          },
          px: [3],
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <Button
          variant="textButton"
          sx={{ textTransform: "none", color: "dark400" }}
        >
          <Text variant="mediumLabel">
            School
            <Text ml="3" as="span">
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </Text>
          </Text>
        </Button>

        <Button
          variant="textButton"
          sx={{ textTransform: "none", color: "dark400" }}
        >
          <Text variant="mediumLabel">
            Department
            <Text ml="3" as="span">
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </Text>
          </Text>
        </Button>

        <Button
          variant="textButton"
          sx={{ textTransform: "none", color: "dark400" }}
        >
          <Text variant="mediumLabel">
            Course
            <Text ml="3" as="span">
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </Text>
          </Text>
        </Button>
      </Box>

      <IconButton
        sx={{
          display: "flex",
          alignItems: "center",
          width: "35px",
          height: "35px",
          border: "none",
          backgroundColor: "lighter",
          borderRadius: "default",
          boxShadow: "card",
          color: "gray200",
          // mt: ["25px"],
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faFilter} />
      </IconButton>
    </Grid>
  );
}
