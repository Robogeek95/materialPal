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
  Link,
  Text,
} from "theme-ui";
import { useAuth } from "../hooks/useAuth";
// interface SignUpData {
//  name: string;
//  email: string;
//  password: string;
// }

const SignUpForm = () => {
  const auth = useAuth();

  const router = useRouter();

  const onSubmit = (data) => {
    return auth.signUp(data).then(() => {
      router.push("/dashboard");
    });
  };

  const { register, errors, handleSubmit, getValues } = useForm();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <Text variant="headline1">Create your Account</Text>
        <Text variant="headline5">Sign up for your account</Text>
      </Box>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid columns={2}>
          <Box mt="4">
            <Label htmlFor="username">First Name</Label>
            <Input
              variant="inputBgMedium"
              type="text"
              name="fname"
              ref={register({
                required: "Please enter your first name",
                minLength: {
                  value: 3,
                  message: "Should have at least 3 characters",
                },
              })}
              id="fname"
              mb={3}
            />

            {errors.fname && <Text color="red">{errors.fname.message}</Text>}
          </Box>

          <Box mt="4">
            <Label htmlFor="lname">Last Name</Label>
            <Input
              variant="inputBgMedium"
              type="text"
              name="lname"
              ref={register({
                required: "Please enter your last name",
                minLength: {
                  value: 6,
                  message: "Should have at least 3 characters",
                },
              })}
              id="lname"
              mb={3}
            />
            {errors.lname && <Text color="red">{errors.lname.message}</Text>}
          </Box>
        </Grid>

        <Box mt="4">
          <Label htmlFor="username">Email Address</Label>
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

        <Grid columns={[2]}>
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

          <Box mt="4">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input
              variant="inputBgMedium"
              type="password"
              id="cpassword"
              name="cpassword"
              ref={register({
                required: "Please Confirm your password",
                minLength: {
                  value: 6,
                  message: "Should have at least 6 characters",
                },
                validate: {
                  match: (value) =>
                    value === getValues("password") || "Passwords do not match",
                },
              })}
              mb={3}
            />
            {errors.cpassword && (
              <Text color="red">{errors.cpassword.message}</Text>
            )}
          </Box>
        </Grid>

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
          <Button variant="outlineRoundedLg">Sign In With Google</Button>

          <Button variant="outlineRoundedLg">Sign In With Facebook</Button>
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

export default SignUpForm;
