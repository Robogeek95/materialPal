import algoliasearch from "algoliasearch/lite";

const algolia = {
  appID: process.env.NEXT_PUBLIC_ALGOLIA_ID,
  apiKey: process.env.NEXT_PUBLIC_ALGOLIA_KEY,
};

const searchClient = algoliasearch(algolia.appID, algolia.apiKey);

export { searchClient };
