import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Flex, Grid, Input, Label, Link, Text } from "theme-ui";
import AuthButton from "./AuthButton";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ResetPasswordForm = () => {
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data) => {
    setIsLoading(true);
    auth
      .sendPasswordResetEmail(data.email)
      .then((data) => {
        setIsLoading(false);
        toast.success("Reset Password Instructions Sent", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const routeToLogin = () => {
    router.push("/login");
  };
  return (
    <Box sx={{ textAlign: "center" }}>
      <ToastContainer />
      <Text variant="headline1" color="darker">
        Forgot Password?
      </Text>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box mt="4">
          <Label htmlFor="username">Username</Label>
          <Input
            variant="inputBgMedium"
            type="email"
            name="email"
            ref={register({
              required: "Please enter your email address",
              pattern: {
                value: `/^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/`,
                message: "Not a valid email",
              },
            })}
            id="email"
            mb={3}
          />
          {errors.email && <Text color="red">{errors.email.message}</Text>}
        </Box>

        <AuthButton
          variant="roundedLg"
          mt="3"
          type="submit"
          isLoading={isLoading}
        >
          Send Recovery Link
        </AuthButton>
      </Box>

      <Box py="3">
        <hr />
      </Box>

      <Button variant="outlineRoundedLg" onClick={routeToLogin}>
        Return To Login
      </Button>

      <Flex sx={{ justifyContent: "center" }} mt="4">
        <Link>
          <Text mr={4}>Login Help</Text>
        </Link>
        <Link>
          <Text>Contact Support</Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default ResetPasswordForm;
