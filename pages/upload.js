import {
  Box,
  Button,
  Container,
  Grid,
  Image,
  Input,
  Label,
  Select,
  Text,
  Textarea,
} from "theme-ui";
import Footer from "../components/footer";
import { faFileImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../components/nav";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useUpload from "../hooks/useUpload";
import { storageRef } from "../config/firebase";
import firebase from "firebase/app";
import { resolveHref } from "next/dist/next-server/lib/router/router";
import { useAuth } from "../hooks/useAuth";

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

const FileUpload = (props) => {
  const [file, setFile] = useState();

  const {
    isDragActive,
    acceptedFiles,
    isDragReject,
    isDragAccept,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  // Send the file object to the parent component via props
  useEffect(() => {
    props.onSelectFile(file);
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: ["290px", "390px"],
        border: "2px dashed #DBDBDB",
        borderRadius: "7px",
      }}
    >
      <Box variant="inputBox" {...getRootProps({ className: "dropzone" })}>
        <FontAwesomeIcon size="5x" icon={faFilePdf} />
        <input {...getInputProps()} />
        <Text sx={{ textAlign: "center" }} variant="body" mt="4">
          {isDragAccept && "Drop file here"}
          {isDragReject &&
            "File format is not supported, please ensure it is a pdf format"}
          {!isDragActive && "Drag and drop file or click to upload"}
        </Text>

        {file && (
          <Box>
            <Text
              sx={{ textAlign: "center" }}
              variant="blockquote"
              color="text"
            >
              {file.name} - {file.size} bytes
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const ImageUpload = (props) => {
  const [images, setImages] = useState([]);
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
      setImages(
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
      // revoke the data uris to avoid memory leaks
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [images]
  );

  useEffect(() => {
    props.onSelectImages(images);
  });

  return (
    <Grid columns={[2, 3, 3]}>
      <Box
        sx={{
          width: "100%",
          height: "170px",
          border: "2px dashed #DBDBDB",
          borderRadius: "7px",
        }}
      >
        <Box variant="inputBox" {...getRootProps({ className: "dropzone" })}>
          <FontAwesomeIcon size="3x" icon={faFileImage} />
          <input {...getInputProps()} />
          <Text sx={{ textAlign: "center" }} variant="body" mt="1">
            {isDragAccept && "Drop file here"}
            {isDragReject &&
              "File format is not supported, please ensure it is a pdf format"}
            {!isDragActive && "Drag and drop image or click to upload"}
          </Text>
        </Box>
      </Box>

      {images.map((file) => (
        <Image
          key={file.path}
          sx={{ width: "100%", height: "150px", borderRadius: "7px" }}
          src={file.preview}
        />
      ))}
    </Grid>
  );
};

export default function Upload() {
  const { register, handleSubmit, errors } = useForm();

  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const auth = useAuth();

  let user = auth.user;

  const handleFile = (file) => {
    setFile(file);
  };

  const handleImages = (images) => {
    setImages(images);
  };

  const uploader = useUpload();

  const onSubmit = (data) => {
    let {
      name,
      category,
      courseCode,
      courseTitle,
      department,
      description,
      school,
      tags,
    } = data;

    let materialData = {
      name,
      tags,
      school,
      rating: 0,
      category,
      courseCode,
      courseTitle,
      department,
      desc: description,
      author: {
        authorHandle: user.email,
        authorName: `${user.fname} ${user.lname}`,
      },
      file: {},
      images: [],
      created: new Date().toISOString(),
      likeCount: 0,
      disLikeCount: 0,
      commentCount: 0,
      downloads: 0,
    };

    uploader
      .storeImages(images)
      .then((imageUrl) => {
        let image = {
          imageUrl,
        };
        materialData.images.push(image);
        return uploader.storeFile(file);
      })
      .then((fileURL) => {
        materialData.file.fileURL = fileURL;
        console.log(materialData);
        uploader.storeMaterial(materialData);
      })
      .then((res) => {
        console.log(res);
      });
  };

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
          mb: [4, "-80px"],
        }}
      ></Box>

      <Container>
        <Grid columns={[1, 1, "80%", "50%"]} sx={{ justifyContent: "center" }}>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <FileUpload onSelectFile={handleFile} />

            <Box mt={[4]}>
              <Label mb={[2]} htmlFor="password">
                Add some Images
              </Label>

              <ImageUpload onSelectImages={handleImages} />
            </Box>

            <Box mt={[4]}>
              <Label htmlFor="name">Name</Label>
              <Input
                variant="inputBgMedium"
                type="text"
                placeholder="What material is this?"
                id="name"
                name="name"
                mb={3}
                ref={register({
                  required: "Please enter the material name",
                  minLength: {
                    value: 3,
                    message: "Title too short...",
                  },
                })}
              />
              {errors.name && <Text color="red">{errors.name.message}</Text>}
            </Box>

            <Box mt={[4]}>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                variant="inputBgMedium"
                type="text"
                placeholder="What material is this?"
                name="courseTitle"
                mb={3}
                ref={register({
                  required: "Please enter the course name",
                  minLength: {
                    value: 3,
                    message: "Course name too short...",
                  },
                })}
              />
              {errors.courseTitle && (
                <Text color="red">{errors.courseTitle.message}</Text>
              )}
            </Box>

            <Box mt={[4]}>
              <Label htmlFor="name">Course Code</Label>
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
              <Label htmlFor="name">Description</Label>
              <Textarea
                variant="inputBgMedium"
                type="text"
                placeholder="Tell us about this material"
                name="description"
                mb={3}
                ref={register}
              />
              {errors.description && (
                <Text color="red">{errors.description.message}</Text>
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
                mb={3}
                ref={register({
                  validate: {
                    match: (value) =>
                      value != "Select Category" ||
                      "Select a category from the list",
                  },
                })}
              >
                <option>Select Category</option>
                {categories.map((category) => (
                  <option>{category}</option>
                ))}
              </Select>

              {errors.category && (
                <Text color="red">{errors.category.message}</Text>
              )}
            </Box>

            <Box mt={[4]}>
              <Label htmlFor="school">School</Label>

              <Select
                variant="inputBgMedium"
                defaultValue={false}
                name="school"
                mb={3}
                ref={register({
                  validate: {
                    match: (value) =>
                      value != "Select School" ||
                      "Select a School from the list",
                  },
                })}
              >
                <option>Select School</option>
                <option>Lagos State University</option>
                <option>Lagos State University</option>
                <option>Lagos State University</option>
                <option>Lagos State University</option>
              </Select>

              {errors.school && (
                <Text color="red">{errors.school.message}</Text>
              )}
            </Box>

            <Box mt={[4]}>
              <Label htmlFor="password">Department</Label>

              <Select
                variant="inputBgMedium"
                defaultValue={false}
                name="department"
                mb={3}
                ref={register({
                  validate: {
                    match: (value) =>
                      value != "Select Department" || "select a department",
                  },
                })}
              >
                <option>Select Department</option>
                <option> Computer Science</option>
                <option>Economics</option>
                <option>Fisheries</option>
                <option>Transport</option>
              </Select>

              {errors.department && (
                <Text color="red">{errors.department.message}</Text>
              )}
            </Box>

            <Box my={[4]} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="roundedLg">Upload</Button>
            </Box>
          </Box>
        </Grid>
      </Container>

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
