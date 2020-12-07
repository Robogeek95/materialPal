import {
  faBars,
  faGolfBall,
  faMinusCircle,
  faStar,
  faTenge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Text,
} from "theme-ui";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import materials from "../../lib/materials.json";
import mymaterials from "../../lib/materials.json";

const materialPage = (props) => {
  let material = props.material[0];
  return (
    <>
      <Nav />

      <Container>
        <Grid
          as="section"
          sx={{ justifyContent: "center" }}
          columns={"80%"}
          my={[6]}
          p={["2"]}
        >
          <Grid
            p={["3"]}
            sx={{
              boxShadow: "card",
              borderRadius: "extra",
              bg: "gray200",
            }}
            columns={["1.5fr 2fr"]}
          >
            <Box>
              <Image
                variant="balmain"
                src="/search/austrian-national-library.jpg"
              />
            </Box>

            <Box p={3}>
              {/* filter */}
              <Flex
                sx={{
                  mb: [3],
                  "button:not(:last-child)": {
                    mr: [3],
                  },
                }}
              >
                <Button variant="textButton">Free</Button>
                <Button variant="rounded">Download</Button>
                <Button variant="outlineRounded">Save</Button>
              </Flex>

              <Text variant="headline4"> {material.name} </Text>
              <Text variant="body">
                uploaded by{" "}
                <Text as="span" variant="headline6">
                  {material.author}
                </Text>
              </Text>
              <Text variant="body" my="2">
                {material.description}
              </Text>

              <Box my={3}>
                <hr />
              </Box>

              <Box>
                <Flex>
                  <FontAwesomeIcon
                    sx={{ alignItems: "center" }}
                    icon={faMinusCircle}
                  />
                  <Text ml={2} variant="headline6">
                    Hide Details
                  </Text>
                </Flex>

                <Grid columns={["auto auto auto"]}>
                  <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faGolfBall} />
                    <Text ml={2} variant="smallBody">
                      {material.details.rating} stars
                    </Text>
                  </Flex>

                  <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallBody">
                      {material.details.pages} pages
                    </Text>
                  </Flex>

                  <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallBody">
                      {material.details.downloads} downloads
                    </Text>
                  </Flex>

                  <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallBody">
                      {material.details.tags.map((tag) => (
                        <Text variant="smallBody" color="dark300">
                          {tag}
                        </Text>
                      ))}
                    </Text>
                  </Flex>

                  <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallBody">
                      {material.details.date}
                    </Text>
                  </Flex>

                  <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallBody">
                      {material.details.school}
                    </Text>
                  </Flex>

                  <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallBody">
                      {material.details.course}
                    </Text>
                  </Flex>
                </Grid>
              </Box>

              <Box my={3}>
                <hr />
              </Box>

              <Box>
                <Flex
                  sx={{
                    div: {
                      p: [0],
                      mr: [3],
                    },
                  }}
                >
                  <Card variant="interactive" sx={{ cursor: "pointer" }}>
                    <Image variant="balmain" src="/search/book.png" />
                  </Card>

                  <Card variant="interactive" sx={{ cursor: "pointer" }}>
                    <Image variant="balmain" src="/search/book.png" />
                  </Card>

                  <Card variant="interactive" sx={{ cursor: "pointer" }}>
                    <Image variant="balmain" src="/search/book.png" />
                  </Card>
                </Flex>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

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
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const materials = mymaterials;

  // Get the paths we want to pre-render based on posts
  const paths = materials.map((material) => `/materials/${material.id}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`);
  const material = materials.filter(
    (material) => material.id.toString() === params.material
  );

  console.log(material);
  // const post = await res.json();

  // Pass post data to the page via props
  return { props: { material } };
}

export default materialPage;
