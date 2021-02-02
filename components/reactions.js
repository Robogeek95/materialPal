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
            {material.likeCount}
          </Text>
        </Flex>
      </Button>
    </>
  );
};

export default Reactions;
