import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "theme-ui";

const Share = () => {
  return (
    <Button variant="roundIconButton">
      <FontAwesomeIcon size="lg" icon={faShare} />
    </Button>
  );
};

export default Share;
