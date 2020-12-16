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
// interface LoginData {
//  email: string;
//  password: string;
// }

import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();

  const router = useRouter();

  const onSubmit = (data) => {
    return auth
      .signIn(data)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const signInWithGoogle = () => {
    return auth
      .signInWithGoogle()
      .then((user) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const signInWithFacebook = () => {
    return auth
      .signInWithFacebook()
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
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

        <Button type="submit" variant="roundedLg" mt="4">
          Continue To Material Pal
        </Button>
      </Box>

      <Box mt="4">
        <Text variant="capitalized" color="dark300">
          OR
        </Text>

        <Grid columns={[2]} my="4">
          <Button variant="outlineRoundedLg" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>

          <Button variant="outlineRoundedLg" onClick={signInWithFacebook}>
            Sign In With Facebook
          </Button>
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
