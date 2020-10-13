import Nav from "../components/nav";
import Footer from "../components/footer";
import {
  Box,
  Card,
  Container,
  Grid,
  Image,
  Input,
  Label,
  Text,
} from "theme-ui";

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
    <Nav />

    {/* Header */}
    <Box
      as="header"
      sx={{
        bg: "snow",
        pt: [5, 6],
        pb: [4, 5],
      }}
    >
      <Container>
        {/* sitemap */}
        <Text as="p" variant="subtitle">
          Search{">"} course
        </Text>

        <Input defaultValue="CSC 111" />
        {/* <Text>CSC 111</Text> */}

        {/* filter */}
        <Box as="form" onSubmit={(e) => e.preventDefault()}>
          <Grid columns="auto 1fr 1fr 1fr" gap={[3, 4]} pt={[3, 4]}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text as="p">Filter by</Text>
            </Box>

            <Box as="div">
              <Label htmlFor="username">School</Label>
              <Input defaultValue="School" />
            </Box>
            <Box as="div">
              <Label htmlFor="username">Department</Label>
              <Input defaultValue="Department" />
            </Box>
            <Box as="div">
              <Label htmlFor="username">Course</Label>
              <Input defaultValue="Course" />
            </Box>
          </Grid>
        </Box>
      </Container>
    </Box>

    <Box>
      <Container>
        <Grid columns={[null, "8fr 2fr"]}>
          <Box>
            <Grid
              my={[4]}
              gap={[4, 4]}
              columns={[null, 5]}
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
                  <Image src="/search/book.png" />
                  <Text as="P">{material.name}</Text>
                  <Text as="P">by {material.author}</Text>
                  <Text as="P">rating {material.rating}</Text>
                  <Text as="P">pages {material.pages}</Text>
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
