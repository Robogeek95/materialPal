import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Image,
  Input,
  Spinner,
  Text,
} from "theme-ui";
import { useForm } from "react-hook-form";

export default function InfoMenu({ material }) {
  const { register, errors, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(!isLoading);
  };

  return (
    <Grid
      sx={{ height: "100%", gridTemplateAreas: `"header" "comments" "message"` }}
    >
      {/* <Button variant="textButton"> Pictures </Button> */}
      <Box
        my="3"
        sx={{ fontWeight: "bold", gridArea: "header" }}
        variant="textButton"
      >
        <Text>Comments</Text>
      </Box>

      <Box sx={{ gridArea: "comments" }}>
        {isLoading && <Spinner />}

        {material.comments ? (
          "comments are present"
        ) : (
          <Text variant="label">Say something about this material...</Text>
        )}
      </Box>

      <Grid
        columns={["1fr auto"]}
        sx={{ height: "40px", alignItems: "center", gridArea: "message" }}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <Input
            sx={{
              borderRadius: "extra",
              outlineColor: "primary",
              backgroundColor: "gray300",
              px: [3],
              "::placeholder": {
                color: "dark200",
              },
            }}
            id="comment"
            name="comment"
            ref={register({
              // required: "Please enter your password",
              // minLength: {
              //   value: 6,
              //   message: "Should have at least 6 characters",
              // },
            })}
            placeholder="Type a comment"
          />
        </Box>

        <Button
          variant="roundIconButton"
          sx={{
            borderRadius: "circle",
            bg: "primary",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            width: "40px",
            color: "gray100",
            ":hover": {
              bg: "lighter",
            },
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Grid>
    </Grid>
  );
}
