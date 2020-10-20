import { useRouter } from "next/router";
import { Box, Container, Grid, Image, Text } from "theme-ui";
import Nav from "../../components/nav";
import materials from "../../lib/materials.json";

const Material = () => {
  const router = useRouter();
  const { material } = router.query;
  console.log(material);
  let selectedMaterial = [];

  if (material) {
    console.log(material);

    selectedMaterial = materials.filter((mat) =>
      console.log(mat.id === material)
    );
  }

  console.log(material);
  console.log(selectedMaterial);
  return (
    <>
      <Nav />
      <Box as="section" sx={{ pt: [5, 6], pb: [4, 5] }}>
        <Container>
          {/* filter */}
          <Grid columns={["1fr", null, null, "8fr 4fr"]}>
            <Grid columns={["1fr", null, null, "4fr 8fr"]} sx={{ bg: "snow" }}>
              <Box>
                <Image src="/search/book.png" height="100%" width="100%" />
              </Box>

              <Box>
                <Text variant="subtitle">{selectedMaterial.name}</Text>
                <Text as="P" my={[2]} sx={{ color: "cyan", fontSize: "16px" }}>
                  {selectedMaterial.author}
                </Text>

                <hr />

                <Grid columns="auto auto auto auto">
                  <Text>{selectedMaterial.rating}</Text>
                  <Text>{selectedMaterial.pages}</Text>
                  <Text>{selectedMaterial.pages}</Text>
                  <Text>{selectedMaterial.pages}</Text>
                </Grid>

                <Box></Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Material;
