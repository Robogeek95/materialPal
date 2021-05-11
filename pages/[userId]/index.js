import {
  Badge,
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
import Avatar from "react-avatar";
import LoadErrorPage from "../../components/loadErrorPage";

const userId = () => {
  const router = useRouter();
  const [user, setUser] = useState({ data: null, error: null, loading: true });
  const [materials, setMaterials] = useState({
    data: null,
    error: null,
    loading: true,
  });

  let userId;
  if (typeof window != "undefined") {
    userId = window.location.pathname.split("/")[1];
  }

  const routeToUserMaterials = () => {
    router.push(`${userId}/details/materials`);
  };

  const routeToUploadMaterial = () => {
    router.push(`materials/upload`);
  };

  // fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get user id
        const response = await fetch("../../api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (response.status !== 200) {
          setUser({ ...user, loading: false, error: await response.text() });
          return;
        }

        response.json().then((jsonData) => {
          setUser({ ...user, loading: false, data: jsonData.data });
        });
      } catch (error) {
        setUser({ ...user, loading: false, error });
      }
    };

    fetchData();
  }, []);

  // fetch materials
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get user id
        let limit = 4;
        const response = await fetch("../../api/getUserMaterials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ limit, userId }),
        });

        if (response.status !== 200) {
          setMaterials({
            ...materials,
            loading: false,
            error: await response.text(),
          });
          return;
        }

        response.json().then((jsonData) => {
          if (jsonData.data.length > 1) {
            return setMaterials({
              ...materials,
              loading: false,
              data: jsonData.data,
            });
          }
          return;
        });
      } catch (error) {
        setMaterials({ ...materials, loading: false, error });
      }
    };

    fetchData();
  }, []);

  if (user.error) return <LoadErrorPage />;
  if (materials.error) return <LoadErrorPage />;

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
        <Grid columns={[1, 1, "9fr 4fr"]}>
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

              <Box sx={{ marginTop: "-45px", mx: [2, 4] }} mb="3">
                <Box
                  sx={{
                    borderRadius: "circle",
                    p: 1,
                    bg: "gray100",
                    width: "fit-content",
                  }}
                >
                  <Avatar size={90} round />
                </Box>

                {user.data ? (
                  <Text variant="headline4" mt="3">
                    {user.data.fname} {user.data.lname}
                  </Text>
                ) : (
                  ""
                )}

                {user.data ? (
                  <Text variant="headline5">{user.data.school.schoolName}</Text>
                ) : (
                  ""
                )}
                <Flex mt="3" sx={{ alignItems: "center" }}>
                  <Button onClick={routeToUploadMaterial} mr="3">
                    Upload Material
                  </Button>

                  <Button variant="roundIconButton">
                    <Box sx={{ width: "15px", height: "15px" }}>
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </Box>
                  </Button>
                </Flex>
              </Box>
            </Box>

            {/* uploads */}
            <Box my="5">
              <Flex mb={3} sx={{ alignItems: "center" }}>
                <Text variant="body">Uploaded Materials</Text>
                <Badge sx={{ color: "gray500", ml: 2 }} variant="outline">
                  {materials.data ? user.data.materialCount : 0}
                </Badge>
              </Flex>

              {materials.data ? (
                <Grid columns={[2, 4]} mt="2">
                  {materials.data.map((material) => (
                    <Link
                      key={material.materialId}
                      sx={{ textDecoration: "none" }}
                      href={`/materials/`}
                    >
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
                            {material.name}
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
                              {material.courseCode}
                            </Text>
                          </Box>
                          <Grid columns={2}>
                            <Text variant="lead">{material.pages} Pages</Text>
                            <Text variant="lead">{material.rating} Rating</Text>
                          </Grid>
                        </Box>
                      </Card>
                    </Link>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: "center", py: [5], px: [3, 5] }}>
                  <Text>You have not uploaded any materials yet</Text>
                </Box>
              )}

              <Box
                sx={{
                  borderRadius: "10px",
                  borderColor: "dark100",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  boxShadow: "card",
                  height: "60px",
                  cursor: "pointer",
                }}
                onClick={
                  materials.data ? routeToUserMaterials : routeToUploadMaterial
                }
              >
                <Flex
                  sx={{
                    alignItems: "center",
                    px: 3,
                    justifyContent: "center",
                    height: "100%",
                    textAlign: "center",
                  }}
                >
                  {materials.data ? (
                    <Text variant="body">See All Your Uploaded Materials</Text>
                  ) : (
                    <Text variant="body">Start Uploading Materials</Text>
                  )}
                  <Box sx={{ width: "20px", height: "20px", ml: 3 }}>
                    <FontAwesomeIcon icon={faArrowRight} size="2x" />
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>

      <Footer dark />
    </Box>
  );
};

export default userId;
