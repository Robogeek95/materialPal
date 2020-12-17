import Link from "next/link";
import { Box, Grid } from "theme-ui";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <Grid columns={["40%"]} sx={{ justifyContent: "center" }} py={5}>
      <Box>
        <ResetPasswordForm />
      </Box>
    </Grid>
  );
};

export default ResetPasswordPage;
