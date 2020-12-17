import Link from "next/link";
import { Box, Grid, Text } from "theme-ui";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <Grid
      columns={["80%", null, "60%", "40%"]}
      sx={{ justifyContent: "center" }}
      pt={5}
    >
      <Box>
        <ResetPasswordForm />
      </Box>
    </Grid>
  );
};

export default ResetPasswordPage;
