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
import Avatar from "react-avatar";
import { format } from "date-fns";

let InnerCard = ({ material }) => {
  return (
    <Box>
      <Grid id="detailCard" columns={["1fr", null, "1.5fr 2fr"]}>
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

        <Grid pb={[3]}>
          {/* topBar */}
          {Object.keys(material).length > 0 && (
            <Flex
              p={[3]}
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

          {Object.keys(material).length > 0 && (
            <Box px={[3]}>
              <Text variant="headline4">{material.name}</Text>

              <Flex my={3} sx={{ alignItems: "center" }}>
                <Avatar name={material.author.authorName} size={45} round />
                <Box ml={2} variant="label">
                  <Text variant="label" sx={{ color: "darker" }}>
                    {material.author.authorName}
                  </Text>
                  <Text variant="label">
                    uploaded {format(new Date(material.created), "MM/dd/yyyy")}
                  </Text>
                </Box>
              </Flex>

              <Text variant="body" my="2">
                {material.desc}
              </Text>
            </Box>
          )}

          {Object.keys(material).length > 0 && (
            <Box px={[3]}>
              <InfoMenu material={material} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

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

      <Container sx={{ display: ["none", null, "block"] }}>
        <Grid
          as="section"
          sx={{ justifyContent: "center" }}
          columns={["100%", "80%"]}
          my={[5, null, 6]}
          p={["2"]}
        >
          <Box
            my={[5]}
            p={3}
            sx={{ borderRadius: "extra", boxShadow: "modal" }}
          >
            <InnerCard material={material} />
          </Box>
        </Grid>
      </Container>

      <Box
        my={[5]}
        p={0}
        sx={{
          display: ["block", null, "none"],
        }}
      >
        <InnerCard material={material} />
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
