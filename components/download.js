import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Button, Flex, Text } from "theme-ui";

export default function Download(props) {
  const [material, setMaterial] = useState(props.material);
  //   const downloadFile = () => {
  //     console.log({
  //       materialId: material.materialId,
  //     });
  //     axios
  //       .post(`http://localhost:5000/material-pal/us-central1/api/download`, {
  //         materialId: material.materialId,
  //       })
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   };

  return (
    <Button
      as="a"
      href={material.file.fileURL}
      target="blank"
      variant="roundIconButton"
      color="purple"
    >
      <Flex sx={{ alignItems: "center" }}>
        <FontAwesomeIcon icon={faDownload} />
        <Text ml={2} variant="label">
          {material.downloads}
        </Text>
      </Flex>
    </Button>
  );
}
