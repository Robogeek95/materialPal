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
import Footer from "../components/footer";
import { faCheckCircle, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Heading as="h3" variant="headline2" mb={2}>
        {name}
      </Heading>
      <Text
        as="p"
        variant="blockquote"
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
          bg: "gray300",
          pt: [5, 6],
          pb: [4, 5],
          textAlign: "center",
          // backgroundImage: [
          //   'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url(https://cloud-cgq5irgc3.vercel.app/2020-09-09_fmn6e5hb62u7cq8eqrt07gz2gg0jp7ej.png)',
          //   'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url(https://cloud-j0rimxpbu.vercel.app/2020-09-09_4e10mkbdhjrewfzjerjrz5cpdc3dp7cn.png)'
          // ],
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // "@media (hover: hover)": { backgroundAttachment: "fixed" },
        }}
      >
        <Box sx={{ maxWidth: "copyUltra", mx: "auto" }}>
          <AnimSlideDown duration={768}>
            <Heading
              as="h1"
              variant="ultratitle"
              sx={{
                color: "dark400",
                textShadow: "text",
                // filter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.5))",
                // WebkitFilter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.5))",
                maxWidth: [null, "copyUltra"],
                my: [2],
                mx: "auto",
                zIndex: 1,
              }}
            >
              <Text variant="display1" as="span">
                All Materials you seek in&nbsp;
                <Text as="span">Material Pal</Text>.
              </Text>
            </Heading>
          </AnimSlideDown>
          <AnimFadeIn duration={1000}>
            <Text as="p" color="dark300" variant="headline4">
              we are passionate about giving everyone access to Unlimited
              Educational materials. Everywhere, Everytime!
            </Text>

            <Box
              as="div"
              sx={{
                maxWidth: 620,
                px: [3, 0],
                mt: 4,
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

            <Button
              as="a"
              mt="3"
              href="/materials"
              target="_self"
              variant="roundedLg"
            >
              Get Started
            </Button>
          </AnimFadeIn>
        </Box>
      </Box>

      {/* mobile Librrary */}
      <Box as="section" sx={{ py: [4, 5], color: "black" }}>
        <Container>
          <Text as="p" variant="blockquote" sx={{ color: "dark200" }}>
            mobile materials
          </Text>
          <Heading as="h2" variant="headline1" sx={{ maxWidth: "copyPlus" }}>
            Collection of materials for your use.
          </Heading>

          <Grid columns={[null, null, "3fr 2fr"]} gap={[3, 4]} pt={[3, 4]}>
            <Card
              sx={{
                p: [0, 0, 0],
                boxShadow: "elevated",
                borderRadius: "extra",
                position: "relative",
                maxWidth: "100%",
                lineHeight: 0,
                height: "400px",
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
              sx={
                {
                  // span: {
                  //   width: 36,
                  //   height: 36,
                  //   borderRadius: 24,
                  //   display: "inline-block",
                  //   fontSize: 4,
                  //   mt: 1,
                  //   lineHeight: "30px",
                  //   textAlign: "center",
                  //   fontWeight: "bold",
                  // },
                  // p: { mt: 0 },
                  // strong: { display: "block" },
                }
              }
            >
              <Text as="span" color="lighter">
                <FontAwesomeIcon size="2x" icon={faCheckCircle} />
              </Text>
              <Box>
                <Text variant="headline5" mb={[2]}>
                  They were dropping, losing altitude in a canyon of rainbow
                </Text>
                <Text variant="body">
                  The leader (that’s you!) presents for a few minutes, getting
                  the group started building something new.
                </Text>
              </Box>

              <Text as="span" color="lighter">
                <FontAwesomeIcon size="2x" icon={faCheckCircle} />
              </Text>
              <Box>
                <Text variant="headline5" mb={[2]}>
                  They were dropping, losing altitude in a canyon of rainbow
                </Text>
                <Text variant="body">
                  The leader (that’s you!) presents for a few minutes, getting
                  the group started building something new.
                </Text>
              </Box>

              <Text as="span" color="lighter">
                <FontAwesomeIcon size="2x" icon={faCheckCircle} />
              </Text>
              <Box>
                <Text variant="headline5" mb={[2]}>
                  They were dropping, losing altitude in a canyon of rainbow
                </Text>
                <Text variant="body">
                  The leader (that’s you!) presents for a few minutes, getting
                  the group started building something new.
                </Text>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Resources beyond your school */}
      <Box
        as="section"
        bg="gray200"
        py={[4, 5]}
        sx={{
          // bg: 'dark',
          color: "dark500",
          "@media (hover: hover)": { backgroundAttachment: "fixed" },
        }}
      >
        <Container>
          <Grid
            columns={[null, "auto auto"]}
            sx={{ maxWidth: "copyPlus", mx: "auto", alignItems: "center" }}
          >
            <Heading variant="headline2">
              Materials from <br /> beyond your school.
            </Heading>
            <Text variant="body">
              Hack Clubs attend and run hackathons like Windy City Hacks & Hack
              the Fog, run summer programs like Hack Camp, and compete in events
              like the Congressional App Challenge. The hack’s the limit.
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
          <Heading variant="headline1">Materials for every purposes</Heading>
          <Text
            variant="blockquote"
            sx={{ color: "dark400", maxWidth: "copyPlus", mx: "auto" }}
          >
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
                boxShadow: "card",
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
                  backgroundColor: "secondary",
                  color: "gray200",
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
            variant="roundedLg"
            sx={{
              background: "linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)",
            }}
          >
            Get materials →
          </Button>
        </Container>
      </Box>

      {/* features */}
      <Box color="black" py={[4, 5]}>
        <Container sx={{ textAlign: ["left", "center"] }}>
          <Text as="p" variant="blockquote" color="dark200">
            Lets get you Started...
          </Text>
          <Heading variant="headline1">
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
          <Text variant="blockquote" sx={{ maxWidth: "copyPlus", mx: "auto" }}>
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
                backgroundColor: "secondary",
                color: "gray100",
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
                backgroundColor: "secondary",
                color: "gray100",
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
                backgroundColor: "secondary",
                color: "gray100",
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
          <Button as="a" href="#" target="_self" variant="roundedLg">
            Create your free account
          </Button>
        </Container>
      </Box>

      {/* newsletter */}
      <Box
        as="section"
        bg="gray200"
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
              <Heading variant="headline2" mb={[0]}>
                Join Our Newsletter
              </Heading>
              <Text variant="body">
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
