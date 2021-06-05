import { Box, Container, Grid, Text } from "@theme-ui/components";
import React from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";

export default function Settings() {
  //   const auth = useRequireAuth();

  //   let authUser = auth.user;
  return (
    <>
      <Container>
        {/* <Text>Settings for {authUser.fname}</Text> */}
        <Grid columns="4fr 8fr">
          <Box>Profile</Box>
          <Box>user</Box>
        </Grid>
      </Container>
    </>
  );
}
