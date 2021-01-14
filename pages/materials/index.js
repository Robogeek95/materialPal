import Footer from "../../components/footer";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  IconButton,
  Image,
  Input,
  Label,
  Select,
  Text,
} from "theme-ui";

import Link from "next/link";
import myMaterials from "../../lib/materials.json";
import myCategories from "../../lib/categories.json";
import SearchBar from "../../components/SearchBar";
import MaterialModal from "../../components/MaterialModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../components/nav";
import {
  faBaseballBall,
  faBasketballBall,
  faBook,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "../../config/firebase";

const Materials = ({ materials, categories }) => {
  return (
    <>
      <Nav />

      <Box bg="gray300" pt={[4]} pb={[0]}>
        <Container pt={[4, 5]}>
          <Grid columns={["1fr", null, null, "8fr 4fr"]}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                py: [4],
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outlineRounded"
                  // as="a"
                  mr={[3]}
                  sx={{
                    display: "inline-block",
                    opacity: "0.3",
                    px: [3],
                    flex: "0 0 auto",
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Grid>
        </Container>
      </Box>

      <Container>
        <Box as="form" onSubmit={(e) => e.preventDefault()}>
          <Grid
            columns="1fr auto"
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
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                div: {
                  width: "220px",
                  pr: "3",
                  flex: "0 0 auto",
                },
              }}
            >
              <Box>
                <Select defaultValue="Hello">
                  <option>School</option>
                  <option>Hi</option>
                  <option>Beep</option>
                  <option>Boop</option>
                </Select>
              </Box>

              <Box>
                <Select defaultValue="Hello">
                  <option>Department</option>
                  <option>Hi</option>
                  <option>Beep</option>
                  <option>Boop</option>
                </Select>
              </Box>

              <Box>
                <Select defaultValue="Hello">
                  <option>Course</option>
                  <option>Hi</option>
                  <option>Beep</option>
                  <option>Boop</option>
                </Select>
              </Box>
            </Box>

            <IconButton
              sx={{
                display: "flex",
                alignItems: "center",
                width: "35px",
                height: "35px",
                border: "none",
                backgroundColor: "lighter",
                borderRadius: "default",
                boxShadow: "card",
                color: "gray200",
                // mt: ["25px"],
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </Grid>

          <Box></Box>
        </Box>

        <Grid columns={["1fr", null, null, "8fr 4fr"]} my={[4]}>
          <Grid columns={[2, 3]}>
            {materials.map((material) => (
              <Link
                key={material.materialId}
                href={`./materials/${material.materialId}`}
              >
                <Card variant="detailCard" pb="2">
                  <Box
                    sx={{
                      height: "180px",
                      background: `URL("${material.images[0].imageUrl}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    {/* <Image
                      src="./search/book.png"
                      alt={`cover photo for ${material.name}`}
                      sx={{ width: "100%", height: "270px" }}
                    ></Image> */}
                  </Box>
                  <Box p="2">
                    <Flex sx={{ minHeight: "50px", alignItems: "center" }}>
                      <Text variant="lead">{material.name}</Text>
                    </Flex>

                    <Flex>
                      {/* {material.tags.map((tag) => (
                        <Text variant="smallLabel" color="dark300">
                          {tag}
                        </Text>
                      ))} */}
                    </Flex>

                    <Text variant="mediumLabel" color="darker">
                      {material.author.authorName}
                    </Text>

                    <Flex
                      sx={{
                        mt: "2",
                        color: "darker",
                        justifyContent: "space-between",
                      }}
                    >
                      <Flex>
                        <FontAwesomeIcon
                          icon={faBasketballBall}
                        ></FontAwesomeIcon>
                        <Text ml="2" variant="smallText">
                          {material.rating} Pages
                        </Text>
                      </Flex>

                      <Box sx={{ display: ["none", "none", "flex"] }}>
                        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                        <Text ml="2" variant="smallText">
                          {material.pages} 378kb
                        </Text>
                      </Box>

                      <Flex>
                        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                        <Text ml="2" variant="smallText">
                          {material.pages} PDF
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Card>
              </Link>
            ))}
          </Grid>

          {/* <Box sx={{ display: ["none", null, "block"] }}>
            <Card variant="infoCard" p={[4]}>
              <Grid columns={["auto 1fr"]}>
                <Box
                  sx={{
                    width: "100px",
                    height: "150px",
                  }}
                >
                  <Image
                    alt={`cover photo for lasu`}
                    src="/search/lasu_logo.png"
                  />
                </Box>
                <Box>
                  <Text variant="headline4" color="darker" m={[0]}>
                    Lagos State University
                  </Text>
                  <Text variant="largeaLabel">Lagos, Nigeria</Text>
                  <Text variant="body" color="lighter">
                    <Link href="https://lasu.edu.ng/" target="blank">
                      www.lasu.edu.ng
                    </Link>
                  </Text>
                </Box>
              </Grid>
              <Box mt={[3]}>
                <Text variant="mediumLabel" color="dark200">
                  Departments
                </Text>
                <Text variant="headline6" color="darker">
                  26
                </Text>
                <hr />

                <Text variant="mediumLabel" color="dark200">
                  Courses
                </Text>
                <Text variant="headline6" color="darker">
                  30
                </Text>

                <hr />

                <Text variant="mediumLabel" color="dark200">
                  Materials on material pal
                </Text>
                <Text variant="headline6" color="darker">
                  341
                </Text>
              </Box>
            </Card>
          </Box>
         */}
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

export async function getStaticProps() {
  // Call an external API endpoint to get posts

  // let materials = await db
  //   .collection("materials")
  //   .orderBy("created", "desc")
  //   .get()
  //   .then((snapshot) => {
  //     let materials = [];

  //     snapshot.forEach((doc) => {
  //       materials.push({
  //         materialId: doc.id,
  //         ...doc.data(),
  //       });
  //     });

  //     return materials;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const materials = [
    {
      materialId: "jhIEf5uhBGhQrEJpgchm",
      author: {
        authorHandle: "azeezlukman95@gmail.com",
        authorName: "Azeez Lukman",
      },
      category: "Text Books",
      commentCount: 0,
      courseCode: "man101",
      courseTitle: "Manchine Learning",
      created: "2021-01-10T14:37:27.731Z",
      department: "Computer Science",
      desc: "Manchine learning for everyone including beginners",
      disLikeCount: 0,
      downloads: 0,
      likeCount: 1,
      name: "Manchine Learning for everyone",
      rating: 0,
      school: "Lagos State University",
      tags: "computer science",
      file: {
        fileURL:
          "https://firebasestorage.googleapis.com/v0/b/material-pal.appspot.com/o/files%2FMachine%20Learning%20With%20Python%20For%20Everyone%20by%20Mark%20E.%20Fenner%20(z-lib.org).pdf?alt=media&token=ab983f5e-f912-4988-969e-d7c6c0c8f565",
      },
      images: [
        {
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/material-pal.appspot.com/o/images%2FGolang-fprint-fprintf-fprintln-fmt-package.png?alt=media&token=9f5e7855-5a9f-48fe-a4a5-127e6c3ebc8e",
        },
      ],
    },
  ];

  // const materials = myMaterials;
  const categories = myCategories;
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: { materials, categories },
  };
}

export default Materials;
