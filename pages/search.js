import Nav from "../components/nav";
import Footer from "../components/footer";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Image,
  Input,
  Label,
  Text,
} from "theme-ui";

import { Icon, InlineIcon } from "@iconify/react";
import filterIcon from "@iconify/icons-mi/filter";
import baselineSearch from "@iconify/icons-ic/baseline-search";

const categories = [
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

const materials = [
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
  {
    name: "CSC 111 past questions ",
    author: "Micheal Andrew",
    rating: "4.9",
    pages: "10",
  },
];

const Search = () => (
  <>
    {/* Search Bar */}

    <Box
      as="header"
      sx={{
        bg: "snow",
        pt: [3, 3],
        pb: [3, 3],
      }}
    >
      <Container>
        {/* Logo */}
        <Text
          as="p"
          variant="subtitle"
          mb={[3]}
          sx={{
            textShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
            fontFamily: "Princess Sofia",
            fontSize: "26px",
          }}
        >
          Material Pal
        </Text>

        <Grid columns={["8fr 4fr"]}>
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
                  sx={{ height: "100%", display: "flex", alignItems: "center" }}
                >
                  <Icon icon={baselineSearch} height="24px" width="24px" />
                </Box>
              </Grid>
            </Box>

            {/* categories */}
            <Box
              mt={[4]}
              sx={{
                color: "#000000",
                textTransform: "uppercase",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Text
                as="a"
                mr={[3]}
                sx={{
                  color: "#247B87",
                  display: "inline-block",
                  opacity: "1",
                }}
              >
                All
              </Text>
              {categories.map((category) => (
                <Text
                  as="a"
                  mr={[3]}
                  sx={{
                    display: "inline-block",
                    opacity: "0.3",
                  }}
                >
                  {category}
                </Text>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* <Text>CSC 111</Text> */}
      </Container>
    </Box>

    <Box>
      <Container>
        {/* filter */}
        <Grid columns={["8fr 4fr"]}>
          <Box as="form" onSubmit={(e) => e.preventDefault()}>
            <Grid
              columns="1fr 1fr 1fr auto"
              gap={[3, 4]}
              pt={[3, 4]}
              sx={{
                div: {
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
              <Box as="div">
                <Input defaultValue="School" />
              </Box>
              <Box as="div">
                <Input defaultValue="Department" />
              </Box>
              <Box as="div">
                <Input defaultValue="Course" />
              </Box>

              <IconButton
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "35px",
                  height: "35px",
                  left: "861px",
                  top: "272px",
                  border: "none",
                  background: "#FFFFFF",
                  borderRadius: "default",
                  boxShadow: "card",
                }}
              >
                <Icon
                  icon={filterIcon}
                  style={{ color: "#01333f", fontSize: "24px" }}
                />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>

    <Box>
      <Container>
        <Grid columns={[null, "8fr 4fr"]}>
          <Box>
            <Grid
              my={[4]}
              gap={[4, 4]}
              columns={[null, 4]}
              sx={{
                textAlign: "left",
                "> a, > div": {
                  borderRadius: "extra",
                  boxShadow: "elevated",
                  px: [3, null, 4],
                  py: [4, null, 5],
                },
                span: {
                  boxShadow:
                    "-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)",
                },
                svg: { fill: "currentColor" },
              }}
            >
              {materials.map((material) => (
                <Card
                  variant="interactive"
                  sx={{
                    background: "#1b4758",
                    color: "#f7f2f6",
                    fontSize: "x-large",
                    cursor: "pointer",
                    padding: "0 !important",
                    paddingBottom: [4],
                  }}
                >
                  <Image
                    src="/search/book.png"
                    sx={{ width: "100%", height: "175px" }}
                  />
                  <Box sx={{ padding: "16px" }}>
                    <Text as="P">{material.name}</Text>
                    <Text as="P">by {material.author}</Text>
                    <Text as="P">rating {material.rating}</Text>
                    <Text as="P">pages {material.pages}</Text>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Box>

          <Box
            sx={
              {
                //   background: "green",
              }
            }
          ></Box>
        </Grid>
      </Container>
    </Box>

    <Footer
      dark
      sx={{
        textShadow: "0 1px 2px rgba(0,0,0,0.375)",
        "h2,span,p,a": { color: "white !important" },
        svg: {
          fill: "white",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
        },
      }}
    ></Footer>
  </>
);

export default Search;
