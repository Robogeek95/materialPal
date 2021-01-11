import React from "react";
import { Box, Button, Card, Flex, Grid, Image } from "theme-ui";

export default function InfoMenu({ material }) {
  return (
    <Box>
      <Flex my={[2]}>
        <Button variant="textButton"> Pictures </Button>
        <Button variant="textButton"> Comments </Button>
      </Flex>

      <Flex
        sx={{
          div: {
            p: [0],
            mr: [3],
          },
        }}
      >
        {material.images.map((image) => (
          <Grid columns={[3]}>
            <Image
              key={image.imageUrl}
              variant="balmain"
              src={image.imageUrl}
            />
          </Grid>
        ))}
      </Flex>
    </Box>
  );
}
