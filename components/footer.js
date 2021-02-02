import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Container,
  Image,
  Grid,
  Heading,
  Link,
  Text,
  Button,
} from "theme-ui";
import theme from "@hackclub/theme";
// import Icon from './icon'

const Base = styled(Box)`
  background: ${(props) =>
    props.dark
      ? `${theme.colors.darker} radial-gradient(${theme.colors.black} 1px, transparent 1px)`
      : `${theme.colors.snow} url('https://hackclub.com/pattern.svg') repeat`};
  ${(props) =>
    props.dark &&
    `
      background-size: ${theme.space[4]}px ${theme.space[4]}px;
    `} @media print {
    display: none;
  }
`;

const Footer = ({ dark = false, children, ...props }) => (
  <Base
    color={dark ? "muted" : "slate"}
    py={[4, 5]}
    dark={dark}
    sx={{ textAlign: "left" }}
    as="footer"
    {...props}
  >
    {children}
    <Container px={[3, null, 4]}>
      <Grid
        as="article"
        gap={[20, 4]}
        columns={["1fr 1fr", "4fr 2fr 2fr 3fr"]}
        sx={{
          px: 0,
          a: {
            textDecoration: "none",
            color: "muted",
            transition: "0.125s color ease-in-out",
            ":hover,:focus": { color: "slate" },
          },
          "> div > a": {
            display: "block",
            mb: 2,
          },
          "h2,p": { color: "muted" },
          h2: { fontSize: 3 },
        }}
      >
        <Box>
          <Text
            variant="headline2"
            sx={
              {
                // color: "#07184a",
                // textShadow: "text",
                // filter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.5))",
                // WebkitFilter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.5))",
                // fontSize: "50px",
              }
            }
          >
            Material Pal
          </Text>

          <Heading variant="headline4" mb={3}>
            Ready to get started?
          </Heading>
          <Box as="div">
            <Button as="a" href="#" target="_self" variant="roundedLg">
              Get Started
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: ["block", "none"] }}></Box>

        <Box>
          <Heading variant="headline4" mb={3}>
            Services
          </Heading>
          <Link href="#" children="Slack" />
          <Link href="#" children="Donate" />
          <Link href="#" children="Team" />
          <Link href="#" children="Philosophy" />
          <Link href="#" children="Branding" />
          <Link href="#" children="Press Inquiries" />
        </Box>
        <Box>
          <Heading variant="headline4" mb={3}>
            About
          </Heading>
          <Link href="#" children="Code of Conduct" />
          <Link href="#" children="Our Story" />
          <Link href="#" children="Benefits" />
          <Link href="#" children="Team" />
          <Link href="#" children="Careers" />
        </Box>

        <Box>
          <Heading variant="headline4" mb={3}>
            Help
          </Heading>
          <Link href="#" children="Code of Conduct" />
        </Box>
      </Grid>
      <Text as="p" variant="caption" sx={{ mt: 3 }}>
        © {new Date().getFullYear()} MaterialPal
      </Text>
    </Container>
  </Base>
);

export default Footer;
