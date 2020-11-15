import React, { Component } from "react";
import { Box, Button, Container, Grid, Text } from "theme-ui";

class SearchNav extends Component {
  render() {
    return (
      <>
        <Box
          as="header"
          sx={{
            bg: "snow",
            pt: [3, 3],
            pb: [3, 3],
            // borderBlockEnd: "2px solid blue"
          }}
        >
          <Container>
            <Grid
              gap={[4, 3, 4]}
              columns={[null, "3fr 1fr"]}
              sx={{
                svg: { fill: "currentColor" },
                display: "none",
                "@media (min-width: 56em)": {
                  display: "grid",
                },
              }}
            >
              {/* Logo */}
              <Text
                as="p"
                variant="headline"
                mb={[3]}
                sx={{
                  textShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                Material Pal
              </Text>

              <Box
                sx={{
                  display: "flex",
                  columnGap: "15px",
                  height: "50px",
                }}
              >
                <Button as="a" href="#" target="_self" variant="ctaLg">
                  SignIn
                </Button>

                <Button as="a" href="#" target="_self" variant="outlineLg">
                  SignUp
                </Button>
              </Box>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default SearchNav;
