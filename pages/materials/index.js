import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/nav";

// Import components
import {
  InstantSearch,
  // Hits,
  // SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectHits,
  connectHitInsights,
  connectSearchBox,
  Stats,
  SortBy,
} from "react-instantsearch-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  IconButton,
  Image,
  Input,
  Link,
  Text,
} from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketballBall,
  faBook,
  faCaretUp,
  faCaretDown,
  faCircle,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer";
import { searchClient } from "../../config/algolia";
import { css } from "@emotion/core";

const Search = () => {
  let router = useRouter();

  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(router.query.q);
  }, [router.query.q]);

  const resetQuery = () => {
    router.push(`/materials?q=`);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav />
      <InstantSearch indexName="materials" searchClient={searchClient}>
        <Box my={[5]}>
          <Box>
            <Flex
              sx={{
                justifyContent: "space-between",
                cursor: "pointer",
                width: "100%",
                display: ["flex", null, null, "none"],
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

          <Container py={[1]}>
            <div className="ais-InstantSearch">
              {/* <h1>React InstantSearch Test</h1> */}

              <Configure query={query} />

              {/* <SortBy
                defaultRefinement="created"
                items={[
                  { value: "created", label: "newest" },
                  { value: "instant_search_price_asc", label: "Likes asc" },
                  { value: "instant_search_price_desc", label: "Likes desc." },
                ]}
              /> */}
              {/* <CustomSearchBox defaultRefinement={query} /> */}

              {query && (
                <>
                  <Stats
                    translations={{
                      stats(nbHits, timeSpentMS) {
                        return `${nbHits} materials found for '${query}' in ${timeSpentMS}ms`;
                      },
                    }}
                  />

                  <Button variant="textButton" onClick={resetQuery}>
                    Reset
                  </Button>
                </>
              )}

              <Grid gap={[5]} mt={[3]} columns={[1, 1, "9fr 3fr"]}>
                <div className="right-panel">
                  {/* <CustomSearchBox
                focusShortcuts={["m"]}
                translations={{
                  submitTitle: "Submit your search query.",
                  resetTitle: "Clear your search query.",
                  placeholder:
                    "Search for materials name, categories, author and more...",
                }}
                showLoadingIndicator
              /> */}
                  <Configure clickAnalytics />
                  <CustomHits />

                  <Box mt={[4]}>
                    <Pagination />
                  </Box>
                </div>

                <Configure hitsPerPage={20} />

                <Box sx={{ display: ["none", null, null, "block"] }}>
                  <Text variant="blockquote" mb={[3]} color="dark300">
                    Categories
                  </Text>

                  <RefinementList attribute="category" />
                  <ClearRefinements />
                </Box>
              </Grid>
            </div>
          </Container>
        </Box>
      </InstantSearch>

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
      />
    </>
  );
};

// insights client initialized and exposed as `window.aa`
const Hit = ({ hit }) => (
  <Link sx={{ textDecoration: "none" }} href={`/materials/${hit.objectID}`}>
    <Card variant="detailCard" pb="2" mb={3}>
      <Box
        sx={{
          height: "180px",
          background: `URL("28502.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* <Image
                      src="/28502.jpg"
                      alt={`cover photo for ${material.name}`}
                      sx={{ width: "100%", height: "270px" }}
                    ></Image> */}
      </Box>
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

// const HitWithInsights = connectHitInsights(window.aa)(Hit);

const Hits = ({ hits }) => {
  return (
    <Grid columns={[2, 3, 3, 5]}>
      {hits.map((hit) => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </Grid>
  );
};

const CustomHits = connectHits(Hits);

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    <button
      onClick={(e) => {
        e.preventDefault;
        refine("");
      }}
    >
      Reset query
    </button>
    {isSearchStalled ? "My search is stalled" : ""}
  </form>
);

export default Search;

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts

//   let materials = await db
//     .collection("materials")
//     .orderBy("created", "desc")
//     .get()
//     .then((snapshot) => {
//       let materials = [];

//       snapshot.forEach((doc) => {
//         materials.push({
//           materialId: doc.id,
//           ...doc.data(),
//         });
//       });

//       return materials;
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   // const materials = myMaterials;
//   const categories = myCategories;
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: { materials, categories },
//     revalidate: 1,
//   };
// }
