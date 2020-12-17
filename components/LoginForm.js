import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  Label,
  Text,
  Link,
} from "theme-ui";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import AuthButton from "./AuthButton";

// interface LoginData {
//  email: string;
//  password: string;
// }

const LoginForm = () => {
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setIsFacebookAuthLoading] = useState(false);

  const auth = useAuth();

  const router = useRouter();

  const onSubmit = (data) => {
    setIsLoading(true);
    return auth
      .signIn(data)
      .then(() => {
        setIsLoading(false);
        router.push("/materials");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const signInWithGoogle = () => {
    setIsGoogleAuthLoading(true);
    return auth
      .signInWithGoogle()
      .then((user) => {
        setIsGoogleAuthLoading(false);
        router.push("/materials");
      })
      .catch((error) => {
        setIsGoogleAuthLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const signInWithFacebook = () => {
    setIsFacebookAuthLoading(true);
    return auth
      .signInWithFacebook()
      .then(() => {
        setIsFacebookAuthLoading(false);
        router.push("/materials");
      })
      .catch((error) => {
        setIsFacebookAuthLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <ToastContainer />
        <Text variant="headline1">Welcome Back</Text>
        <Text variant="headline5">Sign into your account</Text>
      </Box>

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

        <Box mt="4">
          <Label htmlFor="password">Password</Label>
          <Input
            variant="inputBgMedium"
            type="password"
            id="password"
            name="password"
            ref={register({
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Should have at least 6 characters",
              },
            })}
            mb={3}
          />
          {errors.password && (
            <Text color="red">{errors.password.message}</Text>
          )}
        </Box>

        <Grid columns={"auto 1fr"} mt="4">
          <Label>
            <Checkbox />
          </Label>
          <Label>Remember me?</Label>
        </Grid>

        <AuthButton
          variant="roundedLg"
          mt="4"
          type="submit"
          isLoading={isLoading}
        >
          Continue To Material Pal
        </AuthButton>
      </Box>

      <Box mt="4">
        <Text variant="capitalized" color="dark300">
          OR
        </Text>

        <Grid columns={[1, 1, 2]} my="4">
          <AuthButton
            variant="outlineRoundedLg"
            isLoading={isGoogleAuthLoading}
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </AuthButton>

          <AuthButton
            variant="outlineRoundedLg"
            isLoading={isFacebookAuthLoading}
            onClick={signInWithFacebook}
          >
            Sign In With Facebook
          </AuthButton>
        </Grid>

        <hr />

        <Box my={[4]}>
          <Flex mb="2" sx={{ justifyContent: "center" }}>
            <Link href="/reset-password">
              <Text mr="4" variant="mediumLabel" color="dark300">
                Cant Log in?
              </Text>
            </Link>

            <Link href="/signup">
              <Text variant="mediumLabel" color="dark300">
                Sign up for an account
              </Text>
            </Link>
          </Flex>

          <Flex sx={{ justifyContent: "center" }}>
            <Link href="#">
              <Text variant="mediumLabel" color="dark300" mr="3">
                Privacy Policy
              </Text>
            </Link>

            <Link href="#">
              <Text variant="mediumLabel" color="dark300">
                Terms & Conditions
              </Text>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default LoginForm;
