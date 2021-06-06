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
} from "@theme-ui/components";
import React, { useEffect, useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Nav from "../components/nav";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";

const bars = [
  {
    name: "profile",
    content: <ProfileSettingsContent />,
  },
  {
    name: "notifications",
    content: <NotificationSettingsContent />,
  },
  {
    name: "account",
    content: <AccountSettingContent />,
  },
];

export default function Settings() {
  //   const auth = useRequireAuth();
  //   let authUser = auth.user;
  const [activeBar, setActiveBar] = useState(bars[0]);

  return (
    <>
      <Nav />
      <Container
        sx={{
          my: ["100px"],
          width: "70%",
        }}
      >
        {/* <Text>Settings for {authUser.fname}</Text> */}
        <Grid columns="3fr 9fr">
          <Box>
            {bars.map((bar) => (
              <Box mb="3">
                <Bar
                  bar={bar}
                  activeBar={activeBar}
                  setActiveBar={setActiveBar}
                />
              </Box>
            ))}
          </Box>
          <Box>{activeBar.content}</Box>
        </Grid>
      </Container>
      <Footer dark />
    </>
  );
}

function ProfileSettingsContent() {
  return (
    <Grid gap={4}>
      <UserDetailsCard />
      <BasicDetailsCard />

      <Card>
        <Button sx={{ width: "100%" }}>Save</Button>
      </Card>
    </Grid>
  );
}

function NotificationSettingsContent() {
  const notifications = [
    {
      type: "email notifications",
      details: [
        {
          label: "Send me weekly newsletter emails",
          active: false,
        },
        {
          label: "Send me a periodic digest of top posts from my tags",
          active: false,
        },
        {
          label:
            "Send me occasional reminders that I have unread notifications",
          active: false,
        },
      ],
    },
    {
      type: "general notifications",
      details: [
        {
          label:
            "Send me occasional tips on how to enhance my learning experience",
          active: false,
        },
        {
          label: "Send notifications when someone reacts to my materials",
          active: false,
        },
      ],
    },
  ];

  return (
    <Grid gap={4}>
      {notifications.map((notification) => (
        <Card>
          <Text mb={4} sx={{ textTransform: "capitalize" }} variant="headline2">
            {notification.type}
          </Text>

          {notification.details.map((detail) => (
            <Flex mb={3}>
              <Checkbox defaultChecked={detail.active} />
              <Label htmlFor="label">{detail.label}</Label>
            </Flex>
          ))}
        </Card>
      ))}

      <Card>
        <Button sx={{ width: "100%" }}>Save</Button>
      </Card>
    </Grid>
  );
}

function AccountSettingContent() {
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
        <Button bg="red" color="dark400">
          Delete Account
        </Button>
      </Card>
    </>
  );
}

function UserDetailsCard() {
  const { register, errors, handleSubmit, getValues } = useForm();

  return (
    <Card>
      <Text variant="headline2">User</Text>

      <Box mt="4">
        <Label htmlFor="username">Name</Label>
        <Input
          variant="inputBgMedium"
          type="text"
          name="name"
          ref={register({
            required: "Please enter your first name",
            minLength: {
              value: 3,
              message: "Should have at least 3 characters",
            },
          })}
          id="name"
          mb={3}
        />

        {errors.name && <Text color="red">{errors.name.message}</Text>}
      </Box>

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
        <Label htmlFor="username">Username</Label>
        <Input
          variant="inputBgMedium"
          type="text"
          name="username"
          ref={register({
            required: "Please enter your first name",
            minLength: {
              value: 3,
              message: "Should have at least 3 characters",
            },
          })}
          id="username"
          mb={3}
        />

        {errors.username && <Text color="red">{errors.username.message}</Text>}
      </Box>

      <Box mt="4">
        <Label htmlFor="username">Profile image</Label>
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
  );
}

function BasicDetailsCard() {
  const { register, errors, handleSubmit, getValues } = useForm();

  return (
    <Card>
      <Text variant="headline2">Basic</Text>

      <Box mt="4">
        <Label htmlFor="location">Location</Label>
        <Input
          variant="inputBgMedium"
          type="text"
          name="location"
          ref={register({
            required: "Please enter your first location",
            minLength: {
              value: 3,
              message: "Should have at least 3 characters",
            },
          })}
          id="location"
          mb={3}
        />

        {errors.location && <Text color="red">{errors.location.message}</Text>}
      </Box>

      <Box mt="4">
        <Label htmlFor="username">Bio</Label>
        <Textarea
          variant="inputBgMedium"
          name="bio"
          ref={register({
            required: "Please enter your first name",
            minLength: {
              value: 10,
              message: "Should have at least 3 characters",
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
          <Label htmlFor="username">Display email on profile</Label>
        </Flex>
      </Box>
    </Card>
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
