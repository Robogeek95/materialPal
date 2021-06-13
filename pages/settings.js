import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Input,
  Label,
  Text,
  Textarea,
  Checkbox,
  Button,
  Select,
  Spinner,
} from "@theme-ui/components";
import React, { useEffect, useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Nav from "../components/nav";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const bars = [
  {
    name: "profile",
    content: <ProfileSettings />,
  },
  {
    name: "notifications",
    content: <NotificationSettings />,
  },
  {
    name: "account",
    content: <AccountSetting />,
  },
];

function Settings() {
  const auth = useAuth();
  let authUser = auth.user;
  const [activeBar, setActiveBar] = useState(bars[0]);

  if (!authUser) {
    return (
      <Grid justifyContent="center" alignItems="center">
        <Spinner />
      </Grid>
    );
  }

  return (
    <>
      <Nav />
      <Container
        sx={{
          my: ["100px"],
          width: ["auto", null, "80%", "70%"],
        }}
      >
        {/* <Text>Settings for {authUser.fname}</Text> */}
        <Grid columns={["1fr", null, null, "3fr 9fr"]}>
          <Box
            sx={{
              overflowX: ["auto", null, null, "none"],
            }}
          >
            {bars.map((bar) => (
              <Box
                mb="3"
                mr={[3, null, null, 0]}
                sx={{ float: ["left", null, null, "none"] }}
              >
                <Bar
                  bar={bar}
                  activeBar={activeBar}
                  setActiveBar={setActiveBar}
                />
              </Box>
            ))}
          </Box>
          <Box>
            <ToastContainer />
            {activeBar.content}
          </Box>
        </Grid>
      </Container>
      <Footer dark />
    </>
  );
}

function ProfileSettings() {
  const auth = useAuth();
  let authUser = auth.user;

  return authUser ? (
    <ProfileSettingsForm user={authUser} />
  ) : (
    <Grid justifyContent="center" alignItems="center">
      <Spinner />
    </Grid>
  );
}

function ProfileSettingsForm({ user }) {
  const [updating, setUpdating] = useState(false);

  let preloadedData = {
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    location: user.location,
    school: user.school.schoolName,
    department: user.school.department,
    bio: user.bio,
    displayEmail: user.displayEmail,
  };

  const { register, errors, handleSubmit, getValues } = useForm({
    defaultValues: preloadedData,
  });

  async function onUpdateData(data) {
    try {
      setUpdating(true);
      await fetch(`../../api/users/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      }).then(async (response) => {
        setUpdating(false);

        const resData = await response.json();

        if (response.status !== 200) {
          return toast.error(resData.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        toast.success(resData.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } catch (error) {
      setUpdating(false);

      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <Grid as="form" gap={4} onSubmit={handleSubmit(onUpdateData)}>
      <Card>
        <Text variant="headline2">User</Text>

        <Grid columns={2}>
          <Box mt="4">
            <Label htmlFor="fname">First Name</Label>
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
            />
            {errors.lname && <Text color="red">{errors.lname.message}</Text>}
          </Box>
        </Grid>

        <Box mt="4">
          <Label htmlFor="username">Email</Label>
          <Input
            variant="inputBgMedium"
            type="email"
            name="email"
            ref={register({
              required: "Please enter your first name",
              minLength: {
                value: 3,
                message: "Should have at least 3 characters",
              },
            })}
            id="email"
            mb={3}
          />

          {errors.email && <Text color="red">{errors.email.message}</Text>}
        </Box>

        <Box mt="4">
          <Label htmlFor="avatar">Profile image</Label>
          <Flex>
            <Avatar round size="30" mr="3" />

            <Input
              variant="inputBgMedium"
              type="file"
              name="avatar"
              id="avatar"
              mb={3}
            />

            {errors.avatar && <Text color="red">{errors.avatar.message}</Text>}
          </Flex>
        </Box>
      </Card>

      <Card>
        <Text variant="headline2">Basic</Text>

        <Box mt="4">
          <Label htmlFor="location">Location</Label>
          <Input
            variant="inputBgMedium"
            type="text"
            name="location"
            ref={register({
              minLength: {
                value: 3,
                message: "Should have at least 3 characters",
              },
            })}
            id="location"
            mb={3}
          />

          {errors.location && (
            <Text color="red">{errors.location.message}</Text>
          )}
        </Box>

        <Box mt="4">
          <Label htmlFor="school">School</Label>
          <Select
            variant="inputBgMedium"
            type="text"
            name="school"
            ref={register()}
            id="school"
            mb={3}
          >
            <option>Lagos State University</option>
          </Select>

          {errors.school && <Text color="red">{errors.school.message}</Text>}
        </Box>

        <Box mt="4">
          <Label htmlFor="department">Department</Label>
          <Select
            variant="inputBgMedium"
            type="text"
            name="department"
            ref={register()}
            id="department"
            mb={3}
          >
            <option>Computer Science</option>
          </Select>

          {errors.department && (
            <Text color="red">{errors.department.message}</Text>
          )}
        </Box>

        <Box mt="4">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            variant="inputBgMedium"
            name="bio"
            ref={register({
              minLength: {
                value: 10,
                message: "Should have at least 10 characters",
              },
            })}
            id="bio"
            mb={3}
          />

          {errors.bio && <Text color="red">{errors.bio.message}</Text>}
        </Box>

        <Box mt="4">
          <Flex>
            <Checkbox defaultChecked={true} />
            <Label htmlFor="displayEmail">Display email on profile</Label>
          </Flex>
        </Box>
      </Card>

      <Card>
        <Button isLoading={updating} sx={{ width: "100%" }}>
          {updating ? "saving..." : "save"}
        </Button>
      </Card>
    </Grid>
  );
}

function NotificationSettings() {
  const auth = useAuth();
  let authUser = auth.user;
  const [notifications, setNotifications] = useState(null);
  // let notifications = [
  //   {
  //     type: "email notifications",
  //     details: [
  //       {
  //         label: "Send me weekly newsletter emails",
  //         active: false,
  //       },
  //       {
  //         label: "Send me a periodic digest of top posts from my tags",
  //         active: false,
  //       },
  //       {
  //         label:
  //           "Send me occasional reminders that I have unread notifications",
  //         active: false,
  //       },
  //     ],
  //   },
  //   {
  //     type: "general notifications",
  //     details: [
  //       {
  //         label:
  //           "Send me occasional tips on how to enhance my learning experience",
  //         active: false,
  //       },
  //       {
  //         label: "Send notifications when someone reacts to my materials",
  //         active: false,
  //       },
  //     ],
  //   },
  // ];

  function extractNotifications() {
    let notifications = {};
    authUser.settings.notifications.map((notification) =>
      notification.details.map((detail) => {
        let label = detail.label;
        notifications[label] = detail.active;
      })
    );

    return notifications;
  }

  useEffect(() => {
    let extractedNotifications = extractNotifications();
    setNotifications(extractedNotifications);
  }, []);

  return notifications ? (
    <NotificationSettingsForm user={authUser} notifications={notifications} />
  ) : (
    <Grid justifyContent="center" alignItems="center">
      <Spinner />
    </Grid>
  );
}

function NotificationSettingsForm({ user, notifications }) {
  const [updating, setUpdating] = useState(false);

  let preloadedData = {
    ...user.settings.notifications,
  };

  const { register, errors, handleSubmit, getValues } = useForm({
    defaultValues: preloadedData,
  });

  async function onUpdateData(data) {
    try {
      let dataValues = Object.keys(data);
      console.log(
        dataValues.map((value) => {
          for (
            let index = 0;
            index < user.settings.notifications.length;
            index++
          ) {
            const notification = user.settings.notifications[index];
            notification.details.map((detail) => {
              console.log(detail.label === value);
            });
          }
        })
      );
      // setUpdating(true);
      // await fetch(`../../api/users/${user.uid}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ data }),
      // }).then(async (response) => {
      //   setUpdating(false);

      //   const resData = await response.json();

      //   if (response.status !== 200) {
      //     return toast.error(resData.message, {
      //       position: toast.POSITION.TOP_CENTER,
      //     });
      //   }

      //   toast.success(resData.message, {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      // });
    } catch (error) {
      setUpdating(false);

      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <Grid as="form" gap={4} onSubmit={handleSubmit(onUpdateData)}>
      {user.settings.notifications.map((notification) => (
        <Card>
          <Text mb={4} sx={{ textTransform: "capitalize" }} variant="headline2">
            {notification.type}
          </Text>

          {notification.details.map((detail) => (
            <Box mb={3}>
              <label key={detail.label}>
                <input
                  type="checkbox"
                  // value={detail.active}
                  name={detail.label}
                  ref={register}
                />
                {detail.label}
              </label>
            </Box>
          ))}
        </Card>
      ))}

      <Card>
        <Button isLoading={updating} sx={{ width: "100%" }}>
          {updating ? "saving..." : "save"}
        </Button>
      </Card>
    </Grid>
  );
}

function AccountSetting() {
  const { register, errors, handleSubmit, getValues } = useForm();

  return (
    <>
      <Card>
        <Text variant="headline2">Set new password</Text>

        <Box mt="4">
          <Label htmlFor="password">Current password</Label>
          <Input
            variant="inputBgMedium"
            type="password"
            name="currentPassword"
            ref={register({
              required: "Please enter your current password",
              minLength: {
                value: 3,
                message: "Should have at least 3 characters",
              },
            })}
            id="password"
            mb={3}
          />

          {errors.name && <Text color="red">{errors.name.message}</Text>}
        </Box>

        <Box mt="4">
          <Label htmlFor="password">Password</Label>
          <Input
            variant="inputBgMedium"
            type="password"
            name="newPassword"
            ref={register({
              required: "Please enter your new password",
              minLength: {
                value: 3,
                message: "Should have at least 3 characters",
              },
            })}
            id="newPassword"
            mb={3}
          />

          {errors.newPassword && (
            <Text color="red">{errors.newPassword.message}</Text>
          )}
        </Box>

        <Box mt="4">
          <Label htmlFor="password">Confirm new password</Label>
          <Input
            variant="inputBgMedium"
            type="password"
            name="confirmPassword"
            ref={register({
              required: "Please confirm your password",
              minLength: {
                value: 3,
                message: "Should have at least 3 characters",
              },
            })}
            id="confirmPassword"
            mb={3}
          />

          {errors.confirmPassword && (
            <Text color="red">{errors.confirmPassword.message}</Text>
          )}
        </Box>

        <Button>Set new password</Button>
      </Card>

      <Card mt={4}>
        <Text variant="headline2">Account emails</Text>
        <Flex mt={4}>
          <Text color="dark300" mr={3}>
            Primary email
          </Text>
          <Text>user.emailAddress</Text>
        </Flex>
      </Card>

      <Card mt={4}>
        <Text variant="headline2" color="red">
          Danger zone
        </Text>
        <Text color="dark300" mr={3}>
          Delete account
        </Text>
        <Text color="dark300" mr={3}>
          Deleting your account will:
        </Text>
        <ul>
          <li>
            Delete your profile, along with your authentication associations.
          </li>
          <li> Delete any and all content you have, such as materials. </li>
          <li>Allow your username to become available to anyone.</li>
        </ul>
        <Button variant="roundedDanger">Delete Account</Button>
      </Card>
    </>
  );
}

function Bar({ bar, activeBar, setActiveBar }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    activeBar.name === bar.name ? setActive(true) : setActive(false);
  }, [activeBar]);

  let bg = active ? "lighter" : hover ? "gray200" : "gray300";
  let color = active ? "gray100" : hover ? "dark300" : "";
  return (
    <Card
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setActiveBar(bar)}
      sx={{
        bg: bg,
        color: color,
        p: "16px !important",
        textTransform: "capitalize",
        cursor: "pointer",
      }}
    >
      {bar.name}
    </Card>
  );
}

export default Settings;
