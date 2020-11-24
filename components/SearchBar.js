import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  Text,
} from "theme-ui";
import SearchNav from "./SearchNav";

const categories = [
  "All",
  "Assessment",
  "Note",
  "Test",
  "Syllabus",
  "Lessons",
  "Reports",
  "Assignments",
  "Past Questions",
  "Text Books",
  "Handouts",
];

class SearchBar extends Component {
  render() {
    return (
      <>
        <SearchNav />

        <Box
          as="header"
          sx={{
            bg: "snow",
            pb: [3, 3],
            // borderBlockEnd: "2px solid blue"
          }}
        >
          <Container>
            <Grid columns={["1fr", null, null, "8fr 4fr"]}>
              <Box>
                {/* search bar */}
                <Box
                  as="form"
                  sx={{
                    background: "#FFFFFF",
                    boxShadow: "small",
                    borderRadius: "default",
                    ":hover": {
                      boxShadow: "elevated",
                    },
                    height: "56px",
                    px: [3],
                  }}
                >
                  <Grid sx={{ height: "inherit" }} columns={["1fr auto"]}>
                    <Input
                      sx={{
                        height: "100%",
                      }}
                      defaultValue="CSC 111"
                    />

                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton aria-label="Search Icon" color="lighter">
                        <FontAwesomeIcon size="lg" icon={faSearch} />
                      </IconButton>
                    </Box>
                  </Grid>
                </Box>

                {/* categories */}
                <Box
                  pt={[4]}
                  pb={[3]}
                  pl={[2]}
                  sx={{
                    color: "#000000",
                    textTransform: "uppercase",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Button
                    variant="outline"
                    as="a"
                    mr={[3]}
                    sx={{
                      color: "#247B87",
                      display: "inline-block",
                      opacity: "1",
                    }}
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      variant="outline"
                      as="a"
                      mr={[3]}
                      sx={{
                        display: "inline-block",
                        opacity: "0.3",
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* <Text>CSC 111</Text> */}
          </Container>
        </Box>
      </>
    );
  }
}

export default SearchBar;
