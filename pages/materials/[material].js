import { faStar, faTenge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Box, Container, Flex, Grid, Image, Text } from "theme-ui";
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
          columns={"10fr 2fr"}
          mt={[6]}
          p="2"
          sx={{ boxShadow: "card" }}
        >
          <Grid columns={[2]}>
            <Box>
              <Image
                height="auto"
                width="100%"
                src="/search/austrian-national-library.jpg"
              />
            </Box>

            <Box>
              {/* filter */}
              <Text variant="headline4"> {material.name} </Text>
              <Text variant="body">
                uploaded by{" "}
                <Text as="span" variant="headline6">
                  {material.author}
                </Text>
              </Text>
              <Text variant="body" mt="2">
                {material.description}
              </Text>
              {material.name}

              <hr />

              <Box>
                <Flex>
                  <FontAwesomeIcon
                    sx={{ alignItems: "center" }}
                    icon={faTenge}
                  />
                  <Text ml={2} variant="headline6">
                    Hide Details
                  </Text>
                </Flex>

                <Grid columns={["auto auto auto"]}>
                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallText">
                      {material.details.rating} stars
                    </Text>
                  </Flex>

                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallText">
                      {material.details.pages} pages
                    </Text>
                  </Flex>

                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallText">
                      {material.details.downloads} downloads
                    </Text>
                  </Flex>

                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallText">
                      {material.details.tags.map((tag) => (
                        <Text variant="smallLabel" color="dark300">
                          {tag}
                        </Text>
                      ))}
                    </Text>
                  </Flex>

                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallText">
                      {material.details.date}
                    </Text>
                  </Flex>

                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallText">
                      {material.details.school}
                    </Text>
                  </Flex>

                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <FontAwesomeIcon icon={faStar} />
                    <Text ml={2} variant="smallText">
                      {material.details.course}
                    </Text>
                  </Flex>
                </Grid>
              </Box>

              <hr />

              <Box>
                <Box>
                  <Image src="/search/book.png" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
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
