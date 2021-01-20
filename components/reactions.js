import {
  faHeart,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Text } from "theme-ui";
import { auth, db, functions } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import BarModal from "./barModal";
import ModalAuth from "./modalAuth";

const Reactions = ({ material }) => {
  const [open, setOpen] = useState(false);
  const [reactions, setReactions] = useState([]);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);
  let userAuth = useAuth();

  let toggleLike = functions.httpsCallable("toggleLike");
  let react = () => {
    if (userAuth.user) {
      toggleLike(
        { materialId: material.materialId },
        { auth: userAuth.userToken }
      )
        .then((res) => res)
        .catch((err) => console.log(err));
      return;
    }

    setOpen(true);
  };

  useEffect(() => {
    db.collection("likes")
      .orderBy("created", "desc")
      .where("materialId", "==", material.materialId)
      .onSnapshot((querySnapshot) => {
        let reactionsData = [];
        querySnapshot.forEach((doc) => {
          let reaction = doc.data();
          reaction.reactionId = doc.id;
          reactionsData.push(reaction);
        });

        setReactions(reactionsData);
      });

    // return () => {
    //   cleanup
    // };
  }, []);

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
            {reactions.length}
          </Text>
        </Flex>
      </Button>
    </>
  );
};

export default Reactions;
