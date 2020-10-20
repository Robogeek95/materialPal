import Footer from "../../components/footer";
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
import Link from "next/link";
import materials from "../../lib/materials.json";

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
          variant="headline"
          mb={[3]}
          sx={{
            textShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Material Pal
        </Text>

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
        <Grid columns={["1fr", null, null, "8fr 4fr"]}>
          <Box as="form" onSubmit={(e) => e.preventDefault()}>
            <Grid
              columns="1fr 1fr auto"
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
                <Input placeholder="School" />
              </Box>
              <Box as="div">
                <Input placeholder="Department" />
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
        <Grid columns={["1fr", null, null, "8fr 4fr"]} gap={[4]}>
          <Box>
            <Grid
              my={[4]}
              columns={[2, 4]}
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
                  as="a"
                  href={`/materials/${material.id}`}
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
                    <Text as="P" variant="subheadline" mb={[0]} sx={{}}>
                      {material.name}
                    </Text>
                    <Text
                      as="P"
                      my={[2]}
                      sx={{ color: "cyan", fontSize: "16px" }}
                    >
                      {material.author}
                    </Text>
                    <Grid columns={["1fr 1fr"]}>
                      <Text variant="small" as="P">
                        {material.rating} stars
                      </Text>
                      <Text variant="small" as="P">
                        {material.pages} pages
                      </Text>
                    </Grid>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Box>

          <Box mt={[4]}>
            <Card variant="detailCard">
              <Grid columns={["auto 1fr"]}>
                <Box
                  sx={{
                    width: "100px",
                    height: "150px",
                  }}
                >
                  <Image src="/search/lasu_logo.png" />
                </Box>
                <Box>
                  <Text variant="headline" m={[0]}>
                    Lagos State University
                  </Text>
                  <Text variant="subtitle">Lagos, Nigeria</Text>
                  <Link href="https://lasu.edu.ng/">www.lasu.edu.ng</Link>
                </Box>
              </Grid>
              <Box mt={[3]}>
                <Text sx={{ color: "steel" }}>Departments</Text>
                <Text
                  sx={{
                    color: "darkBlue",
                    fontWeight: "bold",
                    fontSize: 2,
                    my: 1,
                  }}
                >
                  26
                </Text>

                <hr />

                <Text sx={{ color: "steel" }}>Courses</Text>
                <Text
                  sx={{
                    color: "darkBlue",
                    fontWeight: "bold",
                    fontSize: 2,
                    my: 1,
                  }}
                >
                  30
                </Text>

                <hr />

                <Text>Materials on material pal</Text>
                <Text
                  sx={{
                    color: "darkBlue",
                    fontWeight: "bold",
                    fontSize: 2,
                    my: 1,
                  }}
                >
                  341
                </Text>
              </Box>
            </Card>
          </Box>
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
