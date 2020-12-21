import { Box, Button, Grid, Image, Input, Label, Select, Text } from "theme-ui";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { faFileImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

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

const FileUpload = () => {
  const {
    isDragActive,
    acceptedFiles,
    isDragReject,
    isDragAccept,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "application/pdf",
  });

  const files = acceptedFiles.map((file) => (
    <Box key={file.path}>
      <Text sx={{ textAlign: "center" }} variant="blockquote" color="text">
        {file.path} - {file.size} bytes
      </Text>
    </Box>
  ));

  return (
    <Box
      sx={{
        width: "100%",
        height: "390px",
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
          color: "secondary",
          cursor: `${isDragReject ? "no-drop" : "copy"}`,
          outline: "none",
          ":hover": {
            backgroundColor: "gray400",
          },
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <FontAwesomeIcon size="5x" icon={faFilePdf} />
        <input {...getInputProps()} />
        <Text sx={{ textAlign: "center" }} variant="body" mt="4">
          {isDragAccept && "Drop file here"}
          {isDragReject &&
            "File format is not supported, please ensure it is a pdf format"}
          {!isDragActive && "Drag and drop file here or click to upload"}
        </Text>

        {files}
      </Box>
    </Box>
  );
};

const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const {
    isDragActive,
    acceptedFiles,
    isDragReject,
    isDragAccept,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: true,
    maxFiles: 2,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Grid columns={3}>
      <Box
        sx={{
          width: "100%",
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
            p: [3],
            color: "secondary",
            cursor: `${isDragReject ? "no-drop" : "copy"}`,
            outline: "none",
            ":hover": {
              backgroundColor: "gray400",
            },
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <FontAwesomeIcon size="3x" icon={faFileImage} />
          <input {...getInputProps()} />
          <Text sx={{ textAlign: "center" }} variant="body" mt="1">
            {isDragAccept && "Drop file here"}
            {isDragReject &&
              "File format is not supported, please ensure it is a pdf format"}
            {!isDragActive && "Drag and drop image here or click to upload"}
          </Text>
        </Box>
      </Box>

      {files.map((file) => (
        <Image
          sx={{ width: "100%", height: "150px", borderRadius: "7px" }}
          src={file.preview}
        />
      ))}
    </Grid>
  );
};

export default function Dashboard() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => alert(JSON.stringify(data));

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
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FileUpload />

          <Box mt={[4]}>
            <Label mb={[2]} htmlFor="password">
              Add some Images
            </Label>

            <ImageUpload />
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="title">Title</Label>
            <Input
              variant="inputBgMedium"
              type="text"
              placeholder="What material is this?"
              id="title"
              name="title"
              mb={3}
              ref={register({
                required: "Please enter the material name or title",
                minLength: {
                  value: 3,
                  message: "Title too short...",
                },
              })}
            />
            {errors.title && <Text color="red">{errors.title.message}</Text>}
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="title">Course Title</Label>
            <Input
              variant="inputBgMedium"
              type="text"
              placeholder="What material is this?"
              name="courseTitle"
              mb={3}
              ref={register({
                required: "Please enter the course title",
                minLength: {
                  value: 3,
                  message: "Course title too short...",
                },
              })}
            />
            {errors.courseTitle && (
              <Text color="red">{errors.courseTitle.message}</Text>
            )}
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="title">Course Code</Label>
            <Input
              variant="inputBgMedium"
              type="text"
              placeholder="The course code for the material"
              name="courseCode"
              mb={3}
              ref={register({
                required: "Please enter the course Code",
                minLength: {
                  value: 3,
                  message: "Course Code too short...",
                },
              })}
            />
            {errors.courseCode && (
              <Text color="red">{errors.courseCode.message}</Text>
            )}
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="password">Tags</Label>

            <Input
              variant="inputBgMedium"
              type="tags"
              name="tags"
              mb={3}
              ref={register}
            />
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="category">Category</Label>

            <Select
              variant="inputBgMedium"
              defaultValue={false}
              name="category"
              ref={register}
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
              defaultValue={false}
              name="school"
              ref={register}
            >
              <option>Select School</option>
              <option>Lagos State University</option>
              <option>Lagos State University</option>
              <option>Lagos State University</option>
              <option>Lagos State University</option>
            </Select>
          </Box>

          <Box mt={[4]}>
            <Label htmlFor="password">Department</Label>

            <Select
              variant="inputBgMedium"
              defaultValue={false}
              name="department"
              ref={register}
            >
              <option>Select Department</option>
              <option> Computer Science</option>
              <option>Economics</option>
              <option>Fisheries</option>
              <option>Transport</option>
            </Select>
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
