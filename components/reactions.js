import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Flex, Text } from "theme-ui";

const Reactions = ({ material }) => {
  return (
    <Flex>
      <Button variant="textButton" color="purple">
        <Flex sx={{ alignItems: "center" }}>
          <FontAwesomeIcon size="lg" icon={faThumbsUp} />
          <Text ml={2} variant="label">
            {material.likeCount}
          </Text>
        </Flex>
      </Button>

      <Button variant="textButton" color="purple">
        <Flex sx={{ alignItems: "center" }}>
          <FontAwesomeIcon size="lg" icon={faThumbsDown} />
          <Text ml={2} variant="label">
            {material.disLikeCount}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default Reactions;
