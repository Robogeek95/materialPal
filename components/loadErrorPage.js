import { Box, Container, Flex, Grid, Spinner, Text } from "@theme-ui/components";
import React from "react";
import Footer from "./footer";
import Nav from "./nav";

export default function LoadErrorPage() {
  return (
    <Box>
      <Nav />

      <Container>
        <Grid
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "100%",
            width: "100%",
            my: 7,
          }}
        >
          <Text variant="headline3" color="dark400">Oops! Something went wrong</Text>
          <Text variant="headline4" color="dark300">Please check your network and give it another try</Text>
        </Grid>
      </Container>

      <Footer
        mt="5"
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
    </Box>
  );
}
