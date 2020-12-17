import { Box, Flex, Grid, Text } from "theme-ui";
import SignUpForm from "../components/SignupForm";
const SignUpPage = () => {
  return (
    <Grid columns={["1fr", null, null, "1fr 1.2fr"]}>
      <Box p={[4, null, 6, 4]}>
        <SignUpForm />
      </Box>

      <Box
        sx={{
          display: ["none", null, null, "flex"],
          backgroundImage: ' url("/auth/authbg.png") ',
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          justifyContent: "center",
          textAlign: "center",
          p: [3],
        }}
      >
        <Text mt="6" color="gray100" variant="display2">
          Let’s help you Experience the best comfort while learning{" "}
        </Text>
      </Box>
    </Grid>
  );
};
export default SignUpPage;
