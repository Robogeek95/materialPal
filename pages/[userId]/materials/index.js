import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  IconButton,
  Input,
  Link,
  Text,
} from "@theme-ui/components";
import Nav from "../../../components/nav";
import React, { useEffect, useState } from "react";
import {
  Configure,
  connectHits,
  InstantSearch,
} from "react-instantsearch-core";
import { searchClient } from "../../../config/algolia";
import {
  ClearRefinements,
  Highlight,
  Pagination,
  RefinementList,
  Stats,
} from "react-instantsearch-dom";
import Footer from "../../../components/footer";
import SearchBox from "../../../components/searchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import LoadErrorPage from "../../../components/loadErrorPage";

// insights client initialized and exposed as `window.aa`
const Hit = ({ hit }) => (
  <Link sx={{ textDecoration: "none" }} href={`/materials/${hit.objectID}`}>
    <Card variant="detailCard" pb="2" mb={3}>
      <Box
        sx={{
          height: "180px",
          background: `url("/28502.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box my="3">
        {/* <Flex sx={{ minHeight: "50px", alignItems: "center" }}> */}
        <Box
          sx={css`
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
          `}
        >
          <Highlight hit={hit} attribute="name" />
        </Box>

        {/* </Flex> */}
        <Box
          sx={css`
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
          `}
        >
          <Text variant="smallLabel" color="dark300">
            {hit.courseCode}
          </Text>
        </Box>
        <Grid columns={2}>
          <Text variant="lead">{hit.rating} Pages</Text>
          <Text variant="lead">{hit.rating} Rating</Text>
        </Grid>
      </Box>
    </Card>
  </Link>
);

const Hits = ({ hits }) => {
  return (
    <Grid columns={[2, 3]}>
      {hits.map((hit) => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </Grid>
  );
};

const CustomHits = connectHits(Hits);

const materials = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState({ data: null, error: null, loading: true });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // get user id
        let userId = window.location.pathname.split("/")[1];
        const response = await fetch("../../api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (response.status !== 200) {
          setUser({ ...user, loading: false, error: await response.text() });
          return;
        }

        response.json().then((jsonData) => {
          setUser({ ...user, loading: false, data: jsonData.data });
        });
      } catch (error) {
        setUser({ ...user, loading: false, error });
      }
    };

    fetchUserData();
  }, []);

  const resetQuery = () => {
    setQuery("");
  };

  function handleChange(e) {
    setQuery(e.target.value);
  }

  if (user.error) return <LoadErrorPage />;
  if (!user.data) return <div>loading...</div>;

  return (
    <Box>
      <Nav />

      <Box mt="6">
        <InstantSearch indexName="materials" searchClient={searchClient}>
          <Box sx={{ display: ["box", null, null, "none"] }}>
            <Flex
              sx={{
                justifyContent: "space-between",
                cursor: "pointer",
                width: "100%",
                mb: 3,
                bg: "gray300",
                boxShadow: "button",
                alignItems: "center",
                px: 3,
                pt: 1,
              }}
              onClick={() => setOpen(!open)}
            >
              <Text variant="blockquote" mb={[0]} color="dark300">
                Categories
              </Text>

              <Box sx={{ width: "20px" }}>
                {open ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
              </Box>
            </Flex>

            {open ? (
              <Container>
                <RefinementList attribute="category" />
                <ClearRefinements />
              </Container>
            ) : (
              ""
            )}
          </Box>

          <Container>
            <Box mb={2}>
              <Text mb={3} variant="headline4">
                Materials uploaded by {user.data.fname}
              </Text>

              {/* search box */}
              <Grid
                columns={"1fr auto"}
                as="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{
                  alignItems: "center",
                  background: "white",
                  height: "45px",
                  border: "1px solid",
                  borderColor: "#E5E5E5",
                  width: "100%",
                  borderRadius: "4px",
                  px: "18px",
                  bg: "gray200",
                  display: ["box", null, null, "none"],
                }}
              >
                <Input
                  placeholder={
                    user.data
                      ? `Search ${user.data.fname}'s Materials...`
                      : "Search Materials..."
                  }
                  sx={{
                    px: 10,
                    bg: "inherit",
                    height: "100%",
                    "&:focus, &:active": {
                      outline: "none",
                      border: "0px",
                    },
                  }}
                  type="text"
                  name="query"
                  value={query}
                  onChange={handleChange}
                />

                <Box>
                  <IconButton
                    sx={{ cursor: "pointer", width: "28px" }}
                    aria-label="Search Icon"
                    color="lighter"
                  >
                    <FontAwesomeIcon size="lg" icon={faSearch} />
                  </IconButton>
                </Box>
              </Grid>

              {/* stats */}
              {query && (
                <>
                  <Stats
                    translations={{
                      stats(nbHits, timeSpentMS) {
                        return `${nbHits} material${
                          nbHits.length > 1 ? "s" : ""
                        } found for '${query}' in ${timeSpentMS}ms`;
                      },
                    }}
                  />

                  <Button variant="textButton" onClick={resetQuery}>
                    Reset
                  </Button>
                </>
              )}
            </Box>

            <Grid columns={[1, null, "3fr 9fr"]} mt="4" gap="4">
              <Box sx={{ display: ["none", null, null, "block"] }}>
                {/* search box */}
                <Grid
                  columns={"1fr auto"}
                  as="form"
                  onSubmit={(e) => e.preventDefault()}
                  sx={{
                    alignItems: "center",
                    background: "white",
                    height: "45px",
                    border: "1px solid",
                    borderColor: "#E5E5E5",
                    width: "100%",
                    borderRadius: "4px",
                    px: "18px",
                    bg: "gray200",
                  }}
                >
                  <Input
                    placeholder="Search materials..."
                    sx={{
                      px: 10,
                      bg: "inherit",
                      height: "100%",
                      "&:focus, &:active": {
                        outline: "none",
                        border: "0px",
                      },
                    }}
                    type="text"
                    name="query"
                    value={query}
                    onChange={handleChange}
                  />

                  <Box>
                    <IconButton
                      sx={{ cursor: "pointer", width: "28px" }}
                      aria-label="Search Icon"
                      color="lighter"
                    >
                      <FontAwesomeIcon size="lg" icon={faSearch} />
                    </IconButton>
                  </Box>
                </Grid>

                {/* profile card */}
                {Object.keys(user).length > 0 && (
                  <Link
                    href={`/${user.data.uid}`}
                    sx={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        border: "1px solid",
                        borderColor: "dark100",
                        borderRadius: "16px",
                        p: 3,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "card",
                        mt: 3,
                      }}
                    >
                      <Avatar size={60} round />
                      <Text variant="headline5" mt="3">
                        {user.data.fname} {user.data.lname}
                      </Text>
                      <Text variant="capitalized" color="dark200">
                        {user.data.school.department}
                      </Text>
                      <Text variant="lead" color="primary" mt="4">
                        {user.data.materialCount} Uploaded material
                        {user.data.materialCount > 1 ? "s" : ""}
                      </Text>
                    </Box>
                  </Link>
                )}
              </Box>

              <Box>
                <Configure
                  query={query}
                  filters={`uid:${user.data.uid}`}
                  hitsPerPage={20}
                  clickAnalytics
                />
                <Grid columns={[1, 1, "6fr 3fr"]}>
                  <Box>
                    <CustomHits />

                    <Box mt={[4]}>
                      <Pagination />
                    </Box>
                  </Box>

                  {/* filters */}
                  <Box sx={{ display: ["none", null, null, "block"] }}>
                    <Text variant="blockquote" mb={[3]} color="dark300">
                      Categories
                    </Text>

                    <RefinementList attribute="category" />
                    <ClearRefinements />
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Container>
        </InstantSearch>
      </Box>

      <Footer
        mt="5"
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
    </Box>
  );
};

export default materials;
