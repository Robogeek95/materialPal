import axios from "axios";
import React, { useState } from "react";
import { Button } from "theme-ui";

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
      variant="roundedLg"
    >
      Download
    </Button>
  );
}
