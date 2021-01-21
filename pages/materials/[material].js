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
import MoreMenu from "../../components/moreMenu";
import InfoMenu from "../../components/infoMenu";
import { useEffect, useState } from "react";

const materialPage = ({ materialId }) => {
  const [material, setMaterial] = useState({});

  useEffect(() => {
    db.doc(`/materials/${materialId}`).onSnapshot((doc) => {
      if (!doc.exists) {
        return console.log({ error: "Material not found" });
      }
      let materialData = doc.data();
      materialData.materialId = doc.id;

      return setMaterial(materialData);
    });

    // return () => {
    //   cleanup
    // };
  }, []);

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
            id="detailCard"
            mt={[2, null, 0]}
            p={["3"]}
            sx={{
              boxShadow: "card",
              borderRadius: "extra",
              bg: "gray200",
              boxShadow: "modal",
            }}
            columns={["1fr", null, "1.5fr 2fr"]}
          >
            <Box
              sx={{
                display: ["none", null, "block"],
                // background: `URL("/28502.jpg")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight: [null, null, null, "400px"],
                borderRadius: "extra",
              }}
            >
              <Image variant="balmain" src="/28502.jpg" />
            </Box>

            <Grid
              p={[0, 2]}
              pb={[3]}
              // sx={{
              //   display: "flex",
              //   flexDirection: "column",
              // }}
              sx={{
                gridTemplateAreas: `"top" "bottom"`,
              }}
            >
              <Box sx={{ gridArea: "top" }}>
                {/* topBar */}
                {Object.keys(material).length > 0 && (
                  <Flex
                    mb={[3]}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <MoreMenu />
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
                )}
                {/* image shows on mobile */}
                <Box sx={{ display: ["block", null, "none"] }}>
                  <Image variant="balmain" src="/28502.jpg" />
                </Box>

                {/* </Flex> */}
                <Text variant="headline4"> {material.name} </Text>
                <Text variant="label">
                  uploaded by{" "}
                  {Object.keys(material).length > 0 && (
                    <Text as="span" variant="headline6">
                      {material.author.authorName}
                    </Text>
                  )}
                </Text>
                <Text variant="body" my="2">
                  {material.desc}
                </Text>
              </Box>

              {Object.keys(material).length > 0 && (
                <Box sx={{ gridArea: "bottom" }}>
                  <InfoMenu material={material} />
                </Box>
              )}
            </Grid>
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

  // Get the paths we want to pre-render based on materials
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

  // let material = await db
  //   .doc(`/materials/${params.material}`)
  //   .get()
  //   .then((doc) => {
  //     if (!doc.exists) {
  //       return console.log({ error: "Material not found" });
  //     }
  //     let materialData = doc.data();
  //     materialData.materialId = doc.id;

  //     return materialData;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  // const post = await res.json();

  // Pass post data to the page via props
  return { props: { materialId: params.material }, revalidate: 1 };
}

export default materialPage;
