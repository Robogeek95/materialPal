import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  Text,
} from "theme-ui";
import AnimFadeIn from "../components/aminFadeIn";
import AnimSlideDown from "../components/animSlideDown";
import Nav from "../components/nav";
import { Icon, InlineIcon } from "@iconify/react";
import iconjarIcon from "@iconify/icons-cib/iconjar";
import Footer from "../components/footer";

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

const Feature = ({ icon, color, name, desc, children, ...props }) => (
  <Box {...props}>
    <Box>
      <Heading as="h3" variant="headline" mb={2}>
        {name}
      </Heading>
      <Text
        as="p"
        variant="subtitle"
        sx={{ mt: 0, pb: 2, a: { variant: "styles.a", color: "blue" } }}
      >
        {desc}
      </Text>
    </Box>
  </Box>
);

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
                lineHeight: 1.2,
              }}
            >
              All Materials you seek in&nbsp;
              <Text
                as="span"
                sx={{
                  borderRadius: "default",
                  px: 2,
                  ml: [-2, 0],
                  whiteSpace: "nowrap",
                  color: "#07184a",
                  background: "#5bc0de",
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
              px: [3, 0],
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

      {/* mobile Librrary */}
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

      {/* Resources beyond your school */}
      <Box
        as="section"
        bg="snow"
        py={[4, 5]}
        sx={{
          // bg: 'dark',
          // color: 'white',
          "h2,p": { textShadow: "text" },
          "@media (hover: hover)": { backgroundAttachment: "fixed" },
        }}
      >
        <Container>
          <Grid
            columns={[null, "1fr 2fr"]}
            sx={{ maxWidth: "copyUltra", mx: "auto", alignItems: "center" }}
          >
            <Heading
              as="h3"
              variant="headline"
              sx={{ fontSize: [4, 4], mb: 0 }}
            >
              materials from beyond your school.
            </Heading>
            <Text
              as="p"
              variant="lead"
              sx={{ mt: 0, a: { variant: "styles.a", color: "blue" } }}
            >
              Images formed and reformed: a flickering montage of the Sprawl’s
              towers and ragged Fuller domes, dim figures moving toward him in
              the center of his closed left eyelid. Case felt the edge of the
              car’s floor.
            </Text>
          </Grid>
        </Container>
      </Box>

      {/* categories  */}
      <Box
        as="section"
        sx={{
          py: 5,
          // bg: 'dark',
          // color: 'white',
          textAlign: [null, "center"],
          "@media (hover: hover)": { backgroundAttachment: "fixed" },
        }}
      >
        <Container>
          <Text as="p" variant="eyebrow" sx={{ color: "white", opacity: 0.75 }}>
            Stories
          </Text>
          <Heading as="h2" variant="title">
            Materials for every occassions
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: "copyPlus", mx: "auto" }}>
            Its hands were holograms that altered to match the convolutions of
            the arcade showed him broken lengths of damps. good stuffs.
          </Text>

          <Grid
            pt={[3, 4]}
            pb={[4, 5]}
            gap={[4, 3, 4]}
            columns={[null, 5]}
            sx={{
              textAlign: "left",
              "> a, > div": {
                borderRadius: "extra",
                boxShadow: "elevated",
                px: [3, null, 4],
                py: [4, null, 5],
              },
              span: {
                boxShadow:
                  "-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)",
              },
              svg: { fill: "currentColor" },
            }}
          >
            {categories.map((category) => (
              <Card
                variant="interactive"
                sx={{
                  background: "#1b4758",
                  color: "#f7f2f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "x-large",
                  textAlign: "center",
                  height: "100px",
                  overflowWrap: "break-word",
                  cursor: "default",
                  padding: 0,
                }}
              >
                #{category}
              </Card>
            ))}
          </Grid>

          <Button
            as="a"
            href="#"
            variant="ctaLg"
            sx={{
              background: "linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)",
            }}
          >
            Get materials →
          </Button>
        </Container>
      </Box>

      {/* features */}
      <Box color="black" py={[4, 6]}>
        <Container sx={{ textAlign: ["left", "center"] }}>
          <Text as="p" variant="eyebrow">
            Lets get you Started...
          </Text>
          <Heading as="h2" variant="title">
            Start sharing your{" "}
            <Text
              as="span"
              sx={{
                borderRadius: "default",
                px: 2,
                ml: [-2, 0],
                whiteSpace: "nowrap",
                color: "#fb558e",
                bg: "#6f31b7",
              }}
            >
              materials
            </Text>
            .
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: "copyPlus", mx: "auto" }}>
            He’d taken the drug to blunt SAS, nausea, but the muted purring of
            the blowers and the amplified breathing of the fighters.
          </Text>
          <Grid
            pt={[3, 4]}
            pb={[4, 5]}
            gap={[4, 3, 4]}
            columns={[null, 3]}
            sx={{
              textAlign: "left",
              "> a, > div": {
                borderRadius: "extra",
                boxShadow: "elevated",
                px: [3, null, 4],
                py: [4, null, 5],
              },
              span: {
                boxShadow:
                  "-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)",
              },
              svg: { fill: "currentColor" },
            }}
          >
            <Card
              as="a"
              // href="https://apply.hackclub.com/"
              variant="interactive"
              sx={{
                background: "#1b4758",
                color: "#f7f2f6",
                cursor: "pointer",
              }}
            >
              <Feature
                icon="send"
                color="white"
                name="Create your account"
                desc="Create your free account with us or simply login if you already have one."
              />
            </Card>
            <Card
              sx={{
                background: "#1b4758",
                color: "#f7f2f6",
              }}
            >
              <Feature
                icon="emoji"
                color="white"
                name="Share materials"
                desc="Upload or download materials of different formats like pdfs Epub and more."
              />
            </Card>
            <Card
              sx={{
                background: "#1b4758",
                color: "#f7f2f6",
              }}
            >
              <Feature
                icon="event-check"
                color="white"
                name="Score points and top leaderboard"
                desc="Other students rates the materials you've shared, and you top the leaderboard"
              />
            </Card>
          </Grid>
          <Button as="a" href="#" target="_self" variant="ctaLg">
            Create your free account
          </Button>
        </Container>
      </Box>

      {/* newsletter */}
      <Box
        as="section"
        bg="snow"
        py={[4, 5]}
        sx={{
          // bg: 'dark',
          // color: 'white',
          "h2,p": { textShadow: "text" },
          "@media (hover: hover)": { backgroundAttachment: "fixed" },
        }}
      >
        <Container>
          <Grid
            columns={[null, "3fr 4fr"]}
            sx={{ maxWidth: "copyUltra", mx: "auto", alignItems: "center" }}
          >
            <dv>
              <Heading
                as="h3"
                variant="headline"
                sx={{ fontSize: [4, 4], mb: 0 }}
              >
                Subscribe to Our Newsletter
              </Heading>
              <Text>
                Be the first to get notified when new resources are available
                for you!
              </Text>
            </dv>

            <div>
              <Input
                placeholder="Email Address"
                sx={{
                  height: "60px",
                  px: 30,
                  border: "1px solid",
                  borderColor: "#E5E5E5",
                }}
              />
            </div>
          </Grid>
        </Container>
      </Box>

      {/* footer */}
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
