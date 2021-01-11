import {
  faClock,
  faDotCircle,
  faDownload,
  faEllipsisH,
  faFile,
  faPager,
  faSchool,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { db } from "../../config/firebase";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Download from "../../components/download";
import Reactions from "../../components/reactions";
import Share from "../../components/share";

const materialPage = ({ material }) => {
  // let material = props.material[0];
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
              boxShadow: "modal",
            }}
            columns={["1.5fr 2fr"]}
          >
            <Box>
              <Image variant="balmain" src={material.images[0].imageUrl} />
            </Box>

            <Box p={3}>
              {/* topBar */}
              {/* <Flex
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              > */}

              <Flex
                mb={[3]}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Button variant="roundIconButton">
                  <FontAwesomeIcon size="lg" icon={faEllipsisH} />
                </Button>

                <Reactions material={material} />

                <Grid
                  gap={[3]}
                  columns={["auto auto"]}
                  sx={{ alignItems: "center" }}
                >
                  <Share />

                  <Download material={material} />
                </Grid>
              </Flex>

              {/* </Flex> */}

              <Text variant="headline4"> {material.name} </Text>
              <Text variant="body">
                uploaded by{" "}
                <Text as="span" variant="headline6">
                  {material.author.authorName}
                </Text>
              </Text>
              <Text variant="body" my="2">
                {material.description}
              </Text>

              <Box my={3}>
                <hr />
              </Box>

              <Box>
                <Text ml={2} variant="headline6">
                  Details
                </Text>

                <Box>
                  <Grid columns={["auto auto"]} gap={[2]}>
                    {/* date */}
                    <Flex mt={3} sx={{ alignItems: "center" }}>
                      <Text as="span" color="darker">
                        <FontAwesomeIcon icon={faClock} />
                      </Text>
                      <Text ml={2} variant="smallBody">
                        Published{" "}
                        {formatDistanceToNow(new Date(material.created), {
                          addSuffix: true,
                        })}
                      </Text>
                    </Flex>

                    {/* downloaads */}
                    <Flex mt={3} sx={{ alignItems: "center" }}>
                      <Text as="span" color="darker">
                        <FontAwesomeIcon icon={faDownload} />
                      </Text>
                      <Text ml={2} variant="smallBody">
                        {material.downloads} downloads
                      </Text>
                    </Flex>
                  </Grid>

                  <Grid columns={["auto auto auto"]} gap={[2]}>
                    {/* pages */}
                    <Flex mt={3} sx={{ alignItems: "center" }}>
                      <Text as="span" color="darker">
                        <FontAwesomeIcon icon={faPager} />
                      </Text>
                      <Text ml={2} variant="smallBody">
                        {material.pages} pages
                      </Text>
                    </Flex>

                    {/* size */}
                    <Flex mt={3} sx={{ alignItems: "center" }}>
                      <Text as="span" color="darker">
                        <FontAwesomeIcon icon={faDotCircle} />
                      </Text>
                      <Text ml={2} variant="smallBody">
                        {material.pages} size
                      </Text>
                    </Flex>

                    {/* format */}
                    <Flex mt={3} sx={{ alignItems: "center" }}>
                      <Text as="span" color="darker">
                        <FontAwesomeIcon icon={faFile} />
                      </Text>
                      <Text ml={2} variant="smallBody">
                        {material.pages} format
                      </Text>
                    </Flex>
                  </Grid>

                  <Grid columns={["auto auto"]} gap={[2]}>
                    <Flex mt={3} sx={{ alignItems: "center" }}>
                      <Text as="span" color="darker">
                        <FontAwesomeIcon icon={faSchool} />
                      </Text>
                      <Text ml={2} variant="smallBody">
                        {material.school}
                      </Text>
                    </Flex>

                    <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
                      <Text as="span" color="darker">
                        <FontAwesomeIcon icon={faDotCircle} />
                      </Text>
                      <Text ml={2} variant="smallBody">
                        {material.course}
                      </Text>
                    </Flex>
                  </Grid>

                  {/* tags */}
                  <Flex mt={3} sx={{ alignItems: "center" }}>
                    <Text as="span" color="darker">
                      <FontAwesomeIcon icon={faTags} />
                    </Text>
                    <Text ml={2} variant="smallBody">
                      {material.tags}
                      {/* {material.tags.map((tag) => (
                        <Text variant="smallBody" color="dark300">
                          {tag}
                        </Text>
                      ))} */}
                    </Text>
                  </Flex>
                </Box>
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
  let materials = await db
    .collection("materials")
    .orderBy("created", "desc")
    .get()
    .then((snapshot) => {
      let materials = [];

      snapshot.forEach((doc) => {
        materials.push({
          materialId: doc.id,
          ...doc.data(),
        });
      });

      return materials;
    })
    .catch((error) => {
      console.log(error);
    });

  // Get the paths we want to pre-render based on posts
  const paths = materials.map(
    (material) => `/materials/${material.materialId}`
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`);
  let materialData = {};
  let material = await db
    .doc(`/materials/${params.material}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return console.log({ error: "Material not found" });
      }
      materialData = doc.data();
      materialData.materialId = doc.id;
      //   return db
      //     .collection("comments")
      //     .orderBy("created", "desc")
      //     .where("materialId", "==", params.material)
      //     .get();
      // })
      // .then((data) => {
      //   materialData.comments = [];
      //   data.forEach((doc) => {
      //     materialData.comments.push(doc.data());
      //   });
      //   return materialData;
      // })
      // .then(() => {
      //   return db
      //     .collection("likes")
      //     .orderBy("created", "desc")
      //     .where("materialId", "==", params.material)
      //     .get();
      // })
      // .then((data) => {
      //   materialData.likes = [];
      //   data.forEach((doc) => {
      //     materialData.likes.push(doc.data());
      //   });

      return materialData;
    })
    .catch((err) => {
      console.error(err);
    });

  // const post = await res.json();

  // Pass post data to the page via props
  return { props: { material } };
}

export default materialPage;
