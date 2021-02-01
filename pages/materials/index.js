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
  faCircle,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer";
import { searchClient } from "../../config/algolia";

const Search = () => {
  let router = useRouter();

  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(router.query.q);
  }, [router.query.q]);

  const resetQuery = () => {
    router.push(`/materials?q=`);
  };

  return (
    <>
      <Nav />

      <Box my={[5]}>
        <Container py={[2]}>
          <div className="ais-InstantSearch">
            {/* <h1>React InstantSearch Test</h1> */}

            <InstantSearch indexName="materials" searchClient={searchClient}>
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

                <div className="left-panel">
                  <Text variant="blockquote" mb={[3]} color="dark300">
                    Categories
                  </Text>
                  <RefinementList attribute="category" />
                  <ClearRefinements />
                  <Configure hitsPerPage={20} />
                </div>
              </Grid>
            </InstantSearch>
          </div>
        </Container>
      </Box>

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
        <Highlight hit={hit} attribute="name" />
        {/* </Flex> */}
        <Flex>
          <Text variant="smallLabel" color="dark300">
            {hit.courseTitle}
          </Text>
        </Flex>
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

const CustomSearchBox = connectSearchBox(SearchBox);
// usage

// function Hit(props) {
//   return (
//     <div>
//       {/* <img src={props.hit.image} align="left" alt={props.hit.name} />
//       <div className="hit-name">
//         <Highlight attribute="name" hit={props.hit} />
//       </div>
//       <div className="hit-description">
//         <Highlight attribute="description" hit={props.hit} />
//       </div>
//       <div className="hit-price">${props.hit.price}</div> */}

//       <Card variant="detailCard" pb="2">
//         <Box
//         // sx={{
//         //   height: "180px",
//         //   background: `URL("28502.jpg")`,
//         //   backgroundPosition: "center",
//         //   backgroundSize: "cover",
//         // }}
//         >
//           <Image
//             src={props.hit.image}
//             alt={props.hit.name}
//             //   sx={{ width: "100%", height: "270px" }}
//           ></Image>
//         </Box>
//         <Box p="2">
//           <Flex sx={{ minHeight: "50px", alignItems: "center" }}>
//             <Highlight attribute="name" hit={props.hit} />
//           </Flex>

//           <Flex>
//             {/* {material.tags.map((tag) => (
//                         <Text variant="smallLabel" color="dark300">
//                           {tag}
//                         </Text>
//                       ))} */}
//           </Flex>

//           <Flex
//             sx={{
//               mt: "2",
//               color: "darker",
//               justifyContent: "space-between",
//             }}
//           >
//             <Flex>
//               <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
//               <Text ml="2" variant="smallText">
//                 PDF
//               </Text>
//             </Flex>

//             <Flex>
//               <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon>
//               <Text ml="2" variant="smallText">
//                 Pages
//               </Text>
//             </Flex>
//           </Flex>
//         </Box>
//       </Card>
//     </div>
//   );
// }

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
