import {
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
import React, { useState, useEffect } from "react";
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
import Avatar from "react-avatar";

const userId = () => {
  const [user, setUser] = useState();
  const [fetchError, setFetchError] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get user id
        let userId = window.location.pathname.split("/")[1];
        const response = await fetch("../../api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (response.status !== 200) {
          setLoadingUser(false);
          setFetchError(await response.text());
          return;
        }

        response.json().then((jsonData) => {
          setLoadingUser(false);
          setUser(jsonData.data);
        });
      } catch (error) {
        setFetchError(error);
      }
    };

    fetchData();
  }, []);

  if (fetchError) return <LoadErrorPage />;

  if (!user) return <div>loading...</div>;

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
                <Avatar size={60} round />
                <Text variant="headline4" mt="3">
                  {user.fname} {user.lname}
                </Text>
                <Text variant="headline5">{user.school.schoolName}</Text>

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
                  {user.materialCount} materials
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

export default userId;
