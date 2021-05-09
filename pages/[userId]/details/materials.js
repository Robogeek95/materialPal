import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Input,
  Link,
  Text,
} from "@theme-ui/components";
import Nav from "../../../components/nav";
import React, { useEffect, useState } from "react";
import material from "../../../lib/materials.json";
import { css } from "@emotion/core";
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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";

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
    <Grid columns={[3]}>
      {hits.map((hit) => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </Grid>
  );
};

const CustomHits = connectHits(Hits);

const materials = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState();
  const [fetchError, setFetchError] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchData = async () => {
    try {
      // get user id
      let userId = window.location.pathname.split("/")[1];
      const response = await fetch("../../api/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.status !== 200) {
        setLoadingUser(false);
        setFetchError(await response.text());
      }

      response.json().then((jsonData) => {
        setLoadingUser(false);
        setUser(jsonData.data);
      });
    } catch (error) {
      setFetchError(error);
    }
  };

  fetchData();

  const resetQuery = () => {
    setQuery("");
  };

  function handleChange(e) {
    setQuery(e.target.value);
  }

  if (fetchError) return <div>failed to load</div>;
  if (!user) return <div>loading...</div>;

  return (
    <Box>
      <Nav />

      <Container mt="6">
        <InstantSearch indexName="materials" searchClient={searchClient}>
          <Box mb={2}>
            <Text mb={3} variant="headline4">
              Materials uploaded by {user.fname}
            </Text>

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

          <Grid columns="3fr 9fr" mt="4" gap="4">
            <Box>
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
              <Link href={`/${user.uid}`} sx={{ textDecoration: "none" }}>
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
                    {user.fname} {user.lname}
                  </Text>
                  <Text variant="capitalized" color="dark200">
                    {user.school.department}
                  </Text>
                  <Text variant="lead" color="primary" mt="4">
                    {user.materialCount} Uploaded materials
                  </Text>
                </Box>
              </Link>
            </Box>

            {/* InstantSearch */}
            <Box>
              <Configure
                query={query}
                filters={`objectID:${user.uid}`}
                hitsPerPage={20}
                clickAnalytics
              />
              <Grid columns={"6fr 3fr"}>
                <Box>
                  <CustomHits />

                  <Box mt={[4]}>
                    <Pagination />
                  </Box>
                </Box>

                {/* filters */}
                <Box>
                  <Text variant="blockquote" mb={[3]} color="dark300">
                    Categories
                  </Text>

                  <RefinementList attribute="category" />
                  <ClearRefinements />
                </Box>
              </Grid>
            </Box>
          </Grid>
        </InstantSearch>
      </Container>

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
