import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Text,
} from "@theme-ui/components";
import { useRouter } from "next/router";
import React from "react";
import { db } from "../../config/firebase";
import Nav from "../../components/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCommentDots,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer";
import Link from "next/link";
import { css } from "@emotion/core";
import material from "../../lib/materials.json";

const userId = ({ userId }) => {
  console.log(userId);

  return (
    <Box>
      <Nav />
      <Box
        sx={{
          mt: ["70px"],
          display: ["block", "none"],
          height: ["150px"],
          bg: "red",
          backgroundImage: "url('./baghetti.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "16px 16px 0px 0px",
        }}
      ></Box>

      <Container mt={[0, "75px"]}>
        <Grid columns={[1, "9fr 4fr"]}>
          <Box>
            {/* profile card */}
            <Box sx={{ gridAutoRows: "" }}>
              <Box
                sx={{
                  display: ["none", "block"],
                  height: ["250px"],
                  bg: "red",
                  backgroundImage: "url('./baghetti.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "16px 16px 0px 0px",
                }}
              ></Box>

              <Box sx={{ marginTop: "-30px", mx: [2, 4] }} mb="3">
                <Avatar size={8} />
                <Text variant="headline4"> Nelson Bighetti</Text>
                <Text variant="headline5">Lagos State University</Text>

                <Flex mt="3" sx={{ alignItems: "center" }}>
                  <Button mr="3">Upload Material</Button>
                  <Button variant="outlineRounded" mr="3">
                    Edit Profile
                  </Button>
                  <Button variant="roundIconButton">
                    <Box sx={{ width: "20px", height: "20px" }}>
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </Box>
                  </Button>
                </Flex>
              </Box>
            </Box>

            {/* uploads */}
            <Box my="5">
              <Box>
                <Text variant="body">Uploaded Materials</Text>
                <Text variant="smallLabel" color="secondary">
                  520 materials
                </Text>
              </Box>

              <Grid columns={[2, 4]} mt="2">
                <Link sx={{ textDecoration: "none" }} href={`/materials/`}>
                  <Card variant="detailCard" pb="2" mb={3}>
                    <Box
                      sx={{
                        height: "180px",
                        background: `URL("28502.jpg")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      {/* <Image
                      src="/28502.jpg"
                      alt={`cover photo for ${material.name}`}
                      sx={{ width: "100%", height: "270px" }}
                    ></Image> */}
                    </Box>
                    <Box my="3">
                      {/* <Flex sx={{ minHeight: "50px", alignItems: "center" }}> */}
                      <Box
                        sx={css`
                          -webkit-line-clamp: 3;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                        `}
                      >
                        {/* <Highlight material={material} attribute="name" /> */}
                      </Box>

                      {/* </Flex> */}
                      <Box
                        sx={css`
                          -webkit-line-clamp: 1;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                        `}
                      >
                        <Text variant="smallLabel" color="dark300">
                          {material[0].courseCode}
                        </Text>
                      </Box>
                      <Grid columns={2}>
                        <Text variant="lead">{material[0].rating} Pages</Text>
                        <Text variant="lead">{material[0].rating} Rating</Text>
                      </Grid>
                    </Box>
                  </Card>
                </Link>
              </Grid>

              <Link href={`${userId}/details/materials`}>
                <Box
                  sx={{
                    borderRadius: "10px",
                    borderColor: "dark100",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    height: "72px",
                    cursor: "pointer",
                  }}
                >
                  <Flex
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Text variant="body">See All Your Uploaded Materials</Text>
                    <Box sx={{ width: "20px", height: "20px", ml: 3 }}>
                      <FontAwesomeIcon icon={faArrowRight} size="2x" />
                    </Box>
                  </Flex>
                </Box>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Container>

      <Footer dark />
    </Box>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let users = await db
    .collection("users")
    .get()
    .then((snapshot) => {
      let users = [];

      snapshot.forEach((doc) => {
        users.push({
          userId: doc.id,
          ...doc.data(),
        });
      });

      return users;
    })
    .catch((error) => {
      console.log(error);
    });

  // Get the paths we want to pre-render based on materials
  const paths = users.map((user) => `/${user.userId}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { userId: params.userId } };
}

export default userId;
