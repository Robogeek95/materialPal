import {
  faHeart,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Flex, Text } from "theme-ui";
import { auth, functions } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";

const Reactions = ({ material }) => {
  const [likeCount, setLikeCount] = useState(material.likeCount);

  console.log(likeCount);
  let userAuth = useAuth();

  let toggleLike = functions.httpsCallable("toggleLike");
  let react = () => {
    if (!userAuth.user) {
      console.log("user not logged in");
      return;
    }

    let userToken = auth.currentUser
      .getIdToken(true)
      .then(function (token) {
        // You got the user token
        return token;
      })
      .catch(function (err) {
        console.error(err);
      });

    console.log(userToken);

    toggleLike({ materialId: material.materialId })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log("toggling");
    return;
  };

  return (
    <Button variant="roundIconButton">
      <Flex sx={{ alignItems: "center" }}>
        <FontAwesomeIcon size="lg" onClick={react} icon={faHeart} />
        <Text ml={2} variant="label">
          {likeCount}
        </Text>
      </Flex>
    </Button>
  );
};

export default Reactions;
