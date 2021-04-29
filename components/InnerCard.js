import { Box, Flex, Grid, Image, Text } from "theme-ui";
import Download from "./download";
import Reactions from "./reactions";
import Share from "./share";
import MoreMenu from "./moreMenu";
import InfoMenu from "./infoMenu";
import Avatar from "react-avatar";
import { format } from "date-fns";

const InnerCard = ({ material }) => {
  return (
    <Box>
      <Grid id="detailCard" columns={["1fr", null, "1.5fr 2fr"]}>
        <Box
          sx={{
            display: ["none", null, "block"],
            // background: `URL("/28502.jpg")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: [null, null, null, "400px"],
            borderRadius: "extra",
          }}
        >
          <Image variant="balmain" src="/28502.jpg" />
        </Box>

        <Grid pb={[3]}>
          {/* topBar */}
          {Object.keys(material).length > 0 && (
            <Flex
              p={[3]}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MoreMenu />
              <Download material={material} />
              <Grid
                gap={[3]}
                columns={["auto auto"]}
                sx={{ alignItems: "center" }}
              >
                <Share />

                <Reactions material={material} />
              </Grid>
            </Flex>
          )}
          {/* image shows on mobile */}
          <Box sx={{ display: ["block", null, "none"] }}>
            <Image variant="balmain" src="/28502.jpg" />
          </Box>

          {Object.keys(material).length > 0 && (
            <Box px={[3]}>
              <Text variant="headline4">{material.name}</Text>

              <Flex my={3} sx={{ alignItems: "center" }}>
                <Avatar name={material.author.authorName} size={45} round />
                <Box ml={2} variant="label">
                  <Text variant="label" sx={{ color: "darker" }}>
                    {material.author.authorName}
                  </Text>
                  <Text variant="label">
                    uploaded {format(new Date(material.created), "MM/dd/yyyy")}
                  </Text>
                </Box>
              </Flex>

              <Text variant="body" my="2">
                {material.desc}
              </Text>
            </Box>
          )}

          {Object.keys(material).length > 0 && (
            <Box px={[3]}>
              <InfoMenu material={material} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InnerCard;
