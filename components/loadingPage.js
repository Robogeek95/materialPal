import { Box, Container, Spinner } from "@theme-ui/components";
import React from "react";

export default function loadingPage() {
  return (
    <Box>
      <Nav />

      <Container>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Spinner />
        </Flex>
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
