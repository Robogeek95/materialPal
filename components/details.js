import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Flex, Grid, Text } from "theme-ui";
import {
  faClock,
  faDotCircle,
  faDownload,
  faEllipsisH,
  faFile,
  faPager,
  faSchool,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function Details() {
  return (
    <Box>
      <Text ml={2} variant="headline6">
        Details
      </Text>

      <Box>
        <Grid columns={["auto auto"]} gap={[2]}>
          {/* date */}
          <Flex mt={3} sx={{ alignItems: "center" }}>
            <Text as="span" color="darker">
              <FontAwesomeIcon icon={faClock} />
            </Text>
            <Text ml={2} variant="smallBody">
              Published{" "}
              {formatDistanceToNow(new Date(material.created), {
                addSuffix: true,
              })}
            </Text>
          </Flex>

          {/* downloaads */}
          <Flex mt={3} sx={{ alignItems: "center" }}>
            <Text as="span" color="darker">
              <FontAwesomeIcon icon={faDownload} />
            </Text>
            <Text ml={2} variant="smallBody">
              {material.downloads} downloads
            </Text>
          </Flex>
        </Grid>

        <Grid columns={["auto auto auto"]} gap={[2]}>
          {/* pages */}
          <Flex mt={3} sx={{ alignItems: "center" }}>
            <Text as="span" color="darker">
              <FontAwesomeIcon icon={faPager} />
            </Text>
            <Text ml={2} variant="smallBody">
              {material.pages} pages
            </Text>
          </Flex>

          {/* size */}
          <Flex mt={3} sx={{ alignItems: "center" }}>
            <Text as="span" color="darker">
              <FontAwesomeIcon icon={faDotCircle} />
            </Text>
            <Text ml={2} variant="smallBody">
              {material.pages} size
            </Text>
          </Flex>

          {/* format */}
          <Flex mt={3} sx={{ alignItems: "center" }}>
            <Text as="span" color="darker">
              <FontAwesomeIcon icon={faFile} />
            </Text>
            <Text ml={2} variant="smallBody">
              {material.pages} format
            </Text>
          </Flex>
        </Grid>

        <Grid columns={["auto auto"]} gap={[2]}>
          <Flex mt={3} sx={{ alignItems: "center" }}>
            <Text as="span" color="darker">
              <FontAwesomeIcon icon={faSchool} />
            </Text>
            <Text ml={2} variant="smallBody">
              {material.school}
            </Text>
          </Flex>

          <Flex mt={3} color="primary" sx={{ alignItems: "center" }}>
            <Text as="span" color="darker">
              <FontAwesomeIcon icon={faDotCircle} />
            </Text>
            <Text ml={2} variant="smallBody">
              {material.course}
            </Text>
          </Flex>
        </Grid>

        {/* tags */}
        <Flex mt={3} sx={{ alignItems: "center" }}>
          <Text as="span" color="darker">
            <FontAwesomeIcon icon={faTags} />
          </Text>
          <Text ml={2} variant="smallBody">
            {material.tags}
            {/* {material.tags.map((tag) => (
                <Text variant="smallBody" color="dark300">
                  {tag}
                </Text>
              ))} */}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
