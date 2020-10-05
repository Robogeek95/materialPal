import Head from "next/head";
import { Box, Heading, Select, Text } from "theme-ui";
import AnimFadeIn from "../components/aminFadeIn";
import AnimSlideDown from "../components/animSlideDown";
import Nav from "../components/nav";

export default function Home() {
  return (
    <>
      <meta
        as={Head}
        title="Material pal is the better way to share resources - we are passionate about giving everyone Access to Unlimited Educational Resources. Everywhere, Everytime!"
      />
      <Nav />
      <Box
        as="section"
        sx={{
          bg: "blue",
          pt: [5, 6],
          pb: [4, 5],
          textAlign: "center",
          // backgroundImage: [
          //   'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url(https://cloud-cgq5irgc3.vercel.app/2020-09-09_fmn6e5hb62u7cq8eqrt07gz2gg0jp7ej.png)',
          //   'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url(https://cloud-j0rimxpbu.vercel.app/2020-09-09_4e10mkbdhjrewfzjerjrz5cpdc3dp7cn.png)'
          // ],
          backgroundPosition: "center",
          backgroundSize: "cover",
          "@media (hover: hover)": { backgroundAttachment: "fixed" },
        }}
      >
        <AnimSlideDown duration={768}>
          <Heading
            as="h1"
            variant="ultratitle"
            sx={{
              color: "white",
              textShadow: "text",
              filter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.5))",
              WebkitFilter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.5))",
              maxWidth: [null, "copyUltra"],
              my: [3, 4],
              mx: "auto",
              zIndex: 1,
            }}
          >
            <Text
              as="span"
              sx={{
                lineHeight: 0.875,
                display: "block",
                pb: 3,
              }}
            >
              All Materials you seek in&nbsp;{" "}
              <Text
                as="span"
                sx={{
                  WebkitTextStroke: "currentColor",
                  WebkitTextStrokeWidth: ["2px", "3px"],
                  WebkitTextFillColor: "transparent",
                }}
              >
                Material Pal
              </Text>
              .
            </Text>
          </Heading>
        </AnimSlideDown>
        <AnimFadeIn duration={1000}>
          <Text
            as="p"
            variant="lead"
            sx={{
              color: "white",
              textShadow: "text",
              maxWidth: 620,
              mt: 0,
              mx: "auto",
              mb: [3, 4],
            }}
          >
            we are passionate about giving everyone access to Unlimited
            Educational materials. Everywhere, Everytime!
          </Text>

          <Box
            as="div"
            sx={{
              maxWidth: 620,
              mt: 0,
              mx: "auto",
              mb: [3, 4],
            }}
          >
            <Select
              sx={{
                color: "#737373",
                px: 30,
                height: 60,
              }}
            >
              <option>Select your school to begin</option>
              <option>Lagos State University</option>
              <option>University of Lagos</option>
              <option>Kwara State University</option>
            </Select>
          </Box>
          {/* <Button as="a" variant="ctaLg" href="https://apply.hackclub.com">
          Apply now
        </Button> */}
        </AnimFadeIn>
      </Box>
    </>
  );
}
