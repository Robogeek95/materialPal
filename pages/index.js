import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Select,
  Text,
} from "theme-ui";
import AnimFadeIn from "../components/aminFadeIn";
import AnimSlideDown from "../components/animSlideDown";
import Nav from "../components/nav";
import { Icon, InlineIcon } from "@iconify/react";
import iconjarIcon from "@iconify/icons-cib/iconjar";

export default function Home() {
  return (
    <>
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
              All Materials you seek in&nbsp;
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

      <Box as="section" sx={{ py: [4, 5], color: "black" }}>
        <Container>
          <Text as="p" variant="eyebrow">
            mobile materials
          </Text>
          <Heading as="h2" variant="title" sx={{ maxWidth: "copyPlus" }}>
            Evergrowing Collection of materials for your use.
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: "copyPlus" }}>
            {/* lo */}
          </Text>
          <Grid columns={[null, null, "3fr 2fr"]} gap={[3, 4]} pt={[3, 4]}>
            <Card
              sx={{
                p: [0, 0, 0],
                boxShadow: "elevated",
                borderRadius: "extra",
                position: "relative",
                maxWidth: "100%",
                lineHeight: 0,
              }}
            >
              <Image
                src="/home/mobile_library.jpg"
                alt="mobile library"
                loading="lazy"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Card>
            <Grid
              columns="auto 1fr"
              gap={3}
              sx={{
                span: {
                  width: 36,
                  height: 36,
                  borderRadius: 24,
                  display: "inline-block",
                  fontSize: 4,
                  mt: 1,
                  lineHeight: "30px",
                  textAlign: "center",
                  fontWeight: "bold",
                },
                p: { mt: 0 },
                strong: { display: "block" },
              }}
            >
              <Text as="span" color="green">
                <Icon icon={iconjarIcon} />
              </Text>
              <Text as="p" variant="subtitle">
                <strong>
                  They were dropping, losing altitude in a canyon of rainbow
                </strong>
                The leader (that’s you!) presents for a few minutes, getting the
                group started building something new.
              </Text>
              <Text as="span" color="green">
                <Icon icon={iconjarIcon} />
              </Text>
              <Text as="p" variant="subtitle">
                <strong>
                  They were dropping, losing altitude in a canyon of rainbow
                </strong>
                The leader (that’s you!) presents for a few minutes, getting the
                group started building something new.
              </Text>
              <Text as="span" color="green">
                <Icon icon={iconjarIcon} />
              </Text>
              <Text as="p" variant="subtitle">
                <strong>
                  They were dropping, losing altitude in a canyon of rainbow
                </strong>
                The leader (that’s you!) presents for a few minutes, getting the
                group started building something new.
              </Text>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
