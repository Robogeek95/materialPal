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
import { useAuth } from "../hooks/useAuth";
import { functions } from "../config/firebase";
import Avatar from "react-avatar";
import { format } from "date-fns";

export default function InfoMenu({ material }) {
  const { register, errors, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentComments, setCurrentComments] = useState([]);

  let userAuth = useAuth();

  let addComment = functions.httpsCallable("addComment");
  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);

    addComment(
      { materialId: material.materialId, comment: data.comment },
      { auth: userAuth.userToken }
    )
      .then((res) => {
        reset({ comment: "" });
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log("toggling");
    return;
  };

  const incrementIndex = () => {
    setIndex(index.length + 5);
    return index;
  };

  let incrementComments = () => {
    let newComments = material.comments.slice(index, index + 5);
    let currentData = currentComments;
    let newData = newComments.map((newComment) => {
      console.log(newComment);
      currentData.push(newComment);
      return currentData;
    });

    setCurrentComments(newData);

    console.log(currentComments);
    return currentComments;
  };

  const Inccomments = () => {
    incrementComments();
    return;
  };

  return (
    <Grid
      sx={{
        mt: [3],
        height: "100%",
        gridTemplateAreas: `"header" "comments" "message"`,
      }}
    >
      {/* <Button variant="textButton"> Pictures </Button> */}
      <Box sx={{ fontWeight: "bold", gridArea: "header" }} variant="textButton">
        <Text>Comments</Text>
      </Box>

      <Box sx={{ gridArea: "comments" }}>
        {isLoading && <Spinner />}
        {material.comments ? (
          // incrementComments().map((comment) => {
          // return (
          material.comments.slice(0, 2).map((comment) => (
            <Box my={[3]}>
              <UserComment comment={comment} />
            </Box>
          ))
        ) : (
          // );
          // })
          <Text variant="label">Say something about this material...</Text>
        )}
      </Box>

      <Grid
        columns={["1fr auto"]}
        sx={{ alignItems: "center", gridArea: "message" }}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <Input
            sx={{
              borderRadius: "extra",
              outlineColor: "primary",
              backgroundColor: "gray400",
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

const UserComment = ({ comment }) => {
  return (
    <Box>
      <Grid
        columns={["auto 1fr"]}
        sx={{ alignItems: "center", gridArea: "message" }}
      >
        <Button
          variant="roundIconButton"
          sx={{
            borderRadius: "circle",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
            // height: "40px",
            // width: "40px",
          }}
        >
          <Avatar
            email={comment.userHandle}
            name={comment.userHandle}
            size={50}
            round
          />
        </Button>
        <Box
          sx={{
            borderRadius: "extra",
            backgroundColor: "gray400",
            p: [2],
            px: [3],
          }}
        >
          <Flex my="2" sx={{ justifyContent: "space-between" }}>
            {/* name */}
            <Text variant="smallText" color="secondary">
              {comment.userHandle}
            </Text>
            {/* date */}
            <Text variant="smallText">
              {format(new Date(comment.created), "MM/dd/yyyy")}
            </Text>
          </Flex>
          <Text>{comment.comment}</Text>
        </Box>
      </Grid>
    </Box>
  );
};
