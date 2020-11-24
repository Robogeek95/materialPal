import Footer from "../../components/footer";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Image,
  Input,
  Label,
  Select,
  Text,
} from "theme-ui";

import Link from "next/link";
import materials from "../../lib/materials.json";
import SearchBar from "../../components/SearchBar";
import MaterialModal from "../../components/MaterialModal";

const Search = () => (
  <>
    {/* Search Bar */}
    <SearchBar />

    <Box>
      <Container>
        {/* filter */}
        <MaterialModal />

        <Grid columns={["1fr", null, null, "8fr 4fr"]}>
          <Box as="form" onSubmit={(e) => e.preventDefault()}>
            <Grid
              columns="1fr 1fr auto"
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
              <Box>
                <Label htmlFor="school" sx={{ color: "muted" }}>
                  <Text variant="small">School</Text>
                </Label>
                <Box className="input_container">
                  <Select name="school" placeholder="Enter School">
                    <option>Lagos State University</option>
                  </Select>
                </Box>
              </Box>

              <Box>
                <Label htmlFor="school" sx={{ color: "muted" }}>
                  <Text variant="small">Deartment</Text>
                </Label>
                <Box className="input_container">
                  <Select name="department" placeholder="Enter Department" />
                </Box>
              </Box>

              <IconButton
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "35px",
                  height: "35px",
                  border: "none",
                  background: "#FFFFFF",
                  borderRadius: "default",
                  boxShadow: "card",
                  mt: ["25px"],
                  cursor: "pointer",
                }}
              >
                <Icon
                  icon={filterIcon}
                  style={{ color: "#01333f", fontSize: "24px" }}
                />
              </IconButton>
            </Grid>

            <Box></Box>
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
                    <Grid columns={[]}>
                      <Text variant="small" as="P">
                        {material.pages} pages
                      </Text>
                    </Grid>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Box>

          <Box mt={[4]} sx={{ display: ["none", null, "block"] }}>
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
