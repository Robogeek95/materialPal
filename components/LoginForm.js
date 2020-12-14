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
const LoginForm = () => {
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();

  const router = useRouter();

  const onSubmit = (data) => {
    return auth.signIn(data).then(() => {
      router.push("/dashboard");
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <Text variant="headline1">Welcome Back</Text>
        <Text variant="headline5">Sign into your account</Text>
      </Box>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box mt="4">
          <Label htmlFor="username">Username</Label>
          <Input
            type="email"
            name="email"
            ref={register({
              required: "Please enter an email",
              pattern: {
                value: `/^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/`,
                message: "Not a valid email",
              },
            })}
            id="email"
            mb={3}
          />
          {errors.email && (
            <div className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </div>
          )}
        </Box>

        <Box mt="4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            ref={register({
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Should have at least 6 characters",
              },
            })}
            mb={3}
          />
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

    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="rounded-md">
    //     <label
    //       htmlFor="email"
    //       className="block text-sm font-medium leading-5 text-gray-700"
    //     >
    //       Email address
    //     </label>
    //     <div className="mt-1 rounded-md">
    //       <input
    //         id="email"
    //         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
    //         type="email"
    //         name="email"
    //         ref={register({
    //           required: "Please enter an email",
    //           pattern: {
    //             value: `/^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/`,
    //             message: "Not a valid email",
    //           },
    //         })}
    //       />
    //       {errors.email && (
    //         <div className="mt-2 text-xs text-red-600">
    //           {errors.email.message}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <label
    //       htmlFor="password"
    //       className="block text-sm font-medium leading-5 text-gray-700"
    //     >
    //       Password
    //     </label>
    //     <div className="mt-1 rounded-md">
    //       <input
    //         id="password"
    //         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
    //         type="password"
    //         name="password"
    //         ref={register({
    //           required: "Please enter a password",
    //           minLength: {
    //             value: 6,
    //             message: "Should have at least 6 characters",
    //           },
    //         })}
    //       />
    //       {errors.password && (
    //         <div className="mt-2 text-xs text-red-600">
    //           {errors.password.message}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <span className="block w-full rounded-md shadow-sm">
    //       <button
    //         type="submit"
    //         className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
    //       >
    //         Log in
    //       </button>
    //     </span>
    //   </div>
    // </form>
  );
};
export default LoginForm;
