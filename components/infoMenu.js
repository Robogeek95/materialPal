import {
  faArrowDown,
  faCross,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
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
import { db, functions } from "../config/firebase";
import Avatar from "react-avatar";
import { format, formatDistanceToNowStrict } from "date-fns";
import ReactDOM from "react-dom";
import SignupForm from "./SignupForm";
import BarModal from "./barModal";
import ModalAuth from "./modalAuth";

export default function InfoMenu({ material }) {
  const { register, errors, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(3);
  const [currentComments, setCurrentComments] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    db.collection("comments")
      .orderBy("created", "desc")
      .where("materialId", "==", material.materialId)
      .limit(index)
      .onSnapshot((querySnapshot) => {
        let commentsData = [];
        querySnapshot.forEach(
          (doc) => {
            let comment = doc.data();
            comment.commentId = doc.id;
            commentsData.push(comment);
          },
          (error) => {
            console.log(error);
          }
        );

        setComments(commentsData);
      });

    // return () => {
    //   cleanup
    // };
  }, [index]);

  let userAuth = useAuth();

  let addComment = functions.httpsCallable("addComment");
  const onSubmit = (data) => {
    if (userAuth.user) {
      return addComment(
        { materialId: material.materialId, comment: data.comment },
        { auth: userAuth.userToken }
      )
        .then((res) => {
          reset({ comment: "" });
          setIsLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }

    setOpen(true);
  };

  const incrementIndex = () => {
    if (index >= material.commentCount || index + 5 >= material.commentCount) {
      return setIndex(material.commentCount);
    }
    setIndex(index + 5);
  };

  return (
    <Grid
      sx={{
        mt: [3],
        height: "100%",
        gridTemplateAreas: `"header" "comments" "increment" "message"`,
      }}
    >
      <BarModal
        isOpen={open}
        displayAreaRef={displayAreaRef}
        parentRef={boxRef}
        onClose={() => setOpen(false)}
        parentID="__next"
      >
        <ModalAuth onClose={() => setOpen(false)} reference={displayAreaRef} />
      </BarModal>

      {/* <Button variant="textButton"> Pictures </Button> */}
      <Box sx={{ fontWeight: "bold", gridArea: "header" }} variant="textButton">
        <Text>Comments</Text>
      </Box>

      <Box sx={{ gridArea: "comments" }}>
        {isLoading && <Spinner />}
        {comments.length > 0 ? (
          // incrementComments().map((comment) => {
          // return (
          comments.map((comment) => (
            <Box my={[3]} key={comment.commentId}>
              <UserComment comment={comment} />
            </Box>
          ))
        ) : (
          <Text variant="label">Say something about this material...</Text>
        )}
      </Box>
      {material.commentCount > 0 && (
        <Button
          onClick={incrementIndex}
          sx={{ gridArea: "increment" }}
          variant="textButton"
        >
          <Flex sx={{ alignItems: "center" }}>
            <FontAwesomeIcon icon={faArrowDown} />
            <Text
              sx={{ textTransform: "none", color: "dark500" }}
              ml={2}
              variant="smallBody"
            >
              Showing {index} of {material.commentCount} comments
            </Text>
          </Flex>
        </Button>
      )}

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
              required: "Please enter your password",
              minLength: {
                value: 1,
                message: "Cannot send an empty comment",
              },
            })}
            placeholder="Leave a comment"
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
