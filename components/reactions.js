import {
  faHeart,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Button, Flex, Text } from "theme-ui";
import { auth, functions } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import BarModal from "./barModal";
import ModalAuth from "./modalAuth";

const Reactions = ({ material }) => {
  const [likeCount, setLikeCount] = useState(material.likeCount);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);
  let userAuth = useAuth();

  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    db.collection("comments")
      .orderBy("created", "desc")
      .where("materialId", "==", material.materialId)
      .onSnapshot((querySnapshot) => {
        let commentsData = [];
        querySnapshot.forEach((doc) => {
          let comment = doc.data();
          comment.commentId = doc.id;
          commentsData.push(comment);
        });

        setComments(commentsData);
      });

    // return () => {
    //   cleanup
    // };
  }, []);

  let toggleLike = functions.httpsCallable("toggleLike");
  let react = () => {
    if (userAuth.user) {
      toggleLike(
        { materialId: material.materialId },
        { auth: userAuth.userToken }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log("toggling");
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <BarModal
        isOpen={open}
        displayAreaRef={displayAreaRef}
        parentRef={boxRef}
        onClose={() => setOpen(false)}
        parentID="__next"
      >
        <ModalAuth onClose={() => setOpen(false)} reference={displayAreaRef} />
      </BarModal>

      <Button variant="roundIconButton">
        <Flex sx={{ alignItems: "center" }}>
          <FontAwesomeIcon size="lg" onClick={react} icon={faHeart} />
          <Text ml={2} variant="label">
            {likeCount}
          </Text>
        </Flex>
      </Button>
    </>
  );
};

export default Reactions;
