import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
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
import Download from "../../components/download";
import Reactions from "../../components/reactions";
import Share from "../../components/share";
import InfoMenu from "../../components/infoMenu";

const materialPage = ({ material }) => {
  // let material = props.material[0];
  return (
    <>
      <Nav />

      <Container>
        <Grid
          as="section"
          sx={{ justifyContent: "center" }}
          columns={["100%", "80%"]}
          my={[5, null, 6]}
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
            columns={["1fr", null, "1.5fr 2fr"]}
          >
            <Box sx={{ display: ["none", null, "block"] }}>
              <Image variant="balmain" src={material.images[0].imageUrl} />
            </Box>

            <Box p={[0, 3]}>
              {/* topBar */}
              <Flex
                mb={[3]}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Button variant="roundIconButton">
                  <FontAwesomeIcon size="lg" icon={faEllipsisH} />
                </Button>

                <Download material={material} />

                <Grid
                  gap={[3]}
                  columns={["auto auto"]}
                  sx={{ alignItems: "center" }}
                >
                  <Share />

                  <Reactions material={material} />
                </Grid>
              </Flex>

              {/* image shows on mobile */}
              <Box sx={{ display: ["block", null, "none"] }}>
                <Image variant="balmain" src={material.images[0].imageUrl} />
              </Box>

              {/* </Flex> */}
              <Text variant="headline4"> {material.name} </Text>
              <Text variant="label">
                uploaded by{" "}
                <Text as="span" variant="headline6">
                  {material.author.authorName}
                </Text>
              </Text>
              <Text variant="body" my="2">
                {material.desc}
              </Text>

              <Box mt={4}>
                <InfoMenu material={material} />
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
