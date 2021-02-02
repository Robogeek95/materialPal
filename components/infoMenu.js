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
  const [index, setIndex] = useState(0);
  const [currentComments, setCurrentComments] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    // if index is 0 then the component just mounted
    if (index == 0) {
      let currIndex = index;

      if (material.commentCount > 0) {
        if (material.commentCount >= 3) {
          setIndex(3);
          currIndex = 3;
        } else {
          setIndex(material.commentCount);
          currIndex = material.commentCount;
        }

        fetchComments(currIndex);
      }
    } else {
      fetchComments(index);
    }
  }, [index]);

  const fetchComments = (currIndex) => {
    db.collection("comments")
      .orderBy("created", "desc")
      .where("materialId", "==", material.materialId)
      .limit(currIndex)
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
  };

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
        gap: [0],
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
          <Box py={4}>
            <Text variant="label">
              Be the first to say something about this material...
            </Text>
          </Box>
        )}
      </Box>

      <Box>
        {material.commentCount > 0 && (
          <Button
            onClick={incrementIndex}
            sx={{ gridArea: "increment" }}
            variant="textButton"
          >
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ width: "14px" }}>
                <FontAwesomeIcon icon={faArrowDown} />
              </Box>
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
              borderColor: "primary",
              p: 0,
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
            <Box sx={{ width: "20px", height: "20px" }}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Box>
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}

const UserComment = ({ comment }) => {
  return (
    <Box>
      <Grid
        columns={["auto 1fr"]}
        sx={{ alignItems: "start", gridArea: "message" }}
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
          <Avatar name={comment.userHandle} size={45} round />
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
