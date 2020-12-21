import { Box, Button, Grid, Input, Label, Select, Text } from "theme-ui";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { faFileImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const categories = [
  "Assessment",
  "Note",
  "Test",
  "Syllabus",
  "Lessons",
  "Reports",
  "Assignments",
  "Past Questions",
  "Text Books",
  "Handouts",
];

export default function Dashboard() {
  const [fileName, setFileName] = useState({
    name: "",
    size: "",
  });

  const fileInput = useRef(null);
  const imageInput = useRef(null);

  // fileInput.addEventListener("change");

  function updateImageDisplay() {
    // while (preview.firstChild) {
    //   preview.removeChild(preview.firstChild);
    // }

    const curFiles = fileInput.files;
    if (!curFiles.length) {
      // const para = document.createElement('p');
      // para.textContent = 'No files currently selected for upload';
      // preview.appendChild(para);

      setFileName({ name: "No files currently selected for upload" });
    }
    // else {
    //   const list = document.createElement("ol");
    //   preview.appendChild(list);

    //   for (const file of curFiles) {
    //     const listItem = document.createElement("li");
    //     const para = document.createElement("p");
    //     if (validFileType(file)) {
    //       para.textContent = `File name ${
    //         file.name
    //       }, file size ${returnFileSize(file.size)}.`;
    //       const image = document.createElement("img");
    //       image.src = URL.createObjectURL(file);

    //       listItem.appendChild(image);
    //       listItem.appendChild(para);
    //     } else {
    //       para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
    //       listItem.appendChild(para);
    //     }

    //     list.appendChild(listItem);
    //   }
    // }
  }

  return (
    <>
      <Nav />
      <Box
        as="section"
        sx={{
          bg: "gray300",
          pt: [5, 6],
          pb: [4, 5],
          textAlign: "center",
          mb: "-80px",
        }}
      ></Box>

      <Grid columns={["40%"]} sx={{ justifyContent: "center" }}>
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "390px",
              border: "2px dashed #DBDBDB",
              borderRadius: "7px",
            }}
          >
            <Box
              onClick={() => fileInput.current.click()}
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                bg: "gray100",
                p: [4],
                color: "secondary",
                cursor: "copy",
                ":hover": {
                  backgroundColor: "gray400",
                },
              }}
            >
              <FontAwesomeIcon size="5x" icon={faFilePdf} />
              <Text variant="body" mt="4">
                Upload material by drag and drop or click to upload.
                <Input
                  sx={{
                    visibility: "hidden",
                  }}
                  ref={fileInput}
                  type="file"
                  onChange={updateImageDisplay}
                />
                <Text>{fileName.name}</Text>
              </Text>
            </Box>
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="password">Add some Images</Label>

            <Grid columns={3}>
              <Box
                sx={{
                  // width: "100%",
                  height: "150px",
                  border: "2px dashed #DBDBDB",
                  borderRadius: "7px",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    bg: "gray100",
                    p: [4],
                    cursor: "copy",
                    color: "secondary",
                    ":hover": {
                      backgroundColor: "gray400",
                    },
                  }}
                  onClick={() => imageInput.current.click()}
                >
                  <FontAwesomeIcon size="3x" icon={faFileImage} />
                  <Text mt={[2]}> Add Image</Text>
                  <Input
                    sx={{
                      visibility: "hidden",
                    }}
                    ref={imageInput}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                  />
                </Box>
              </Box>
            </Grid>
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="password">Title</Label>
            <Input
              variant="inputBgMedium"
              type="text"
              placeholder="What material is this?"
              name="title"
              mb={3}
            />
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="password">Tags</Label>
            <Input variant="inputBgMedium" type="tags" name="tags" mb={3} />
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="category">Category</Label>

            <Select
              variant="inputBgMedium"
              defaultValue="Lagos State University"
            >
              <option>Select Category</option>
              {categories.map((category) => (
                <option>{category}</option>
              ))}
            </Select>
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="school">School</Label>

            <Select
              variant="inputBgMedium"
              defaultValue="Lagos State University"
            >
              <option>Lagos State University</option>
              <option>Lagos Stete University</option>
              <option>Lagos Stete University</option>
              <option>Lagos Stete University</option>
            </Select>
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="password">Department</Label>
            <Input
              variant="inputBgMedium"
              type="text"
              name="department"
              mb={3}
            />
          </Box>

          <Box my={[4]} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlineRoundedLg" mr={[3]}>
              Cancel
            </Button>
            <Button variant="roundedLg">Upload</Button>
          </Box>
        </Box>
      </Grid>

      <Footer
        dark
        sx={{
          textShadow: "0 1px 2px rgba(0,0,0,0.375)",
          "h2,span,p,a": { color: "white !important" },
          svg: {
            fill: "white",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
          },
        }}
      ></Footer>
    </>
  );
}
