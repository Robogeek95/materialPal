import {
  faHeart,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Flex, Text } from "theme-ui";

const Reactions = ({ material }) => {
  return (
    <Flex>
      <Button variant="roundIconButton">
        <Flex sx={{ alignItems: "center" }}>
          <FontAwesomeIcon size="lg" icon={faHeart} />
          <Text ml={2} variant="label">
            {material.likeCount}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default Reactions;
