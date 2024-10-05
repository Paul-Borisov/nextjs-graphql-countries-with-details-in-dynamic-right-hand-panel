import "server-only";

import {
  ApolloClient,
  //InMemoryCache,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";
import getApolloCLient from "@/shared/singletons/apolloClient";

// const defaultUrl = "https://countries.trevorblades.com/";
// const apolloClient = new ApolloClient({
//   uri: process.env.endpointGraphqlCountries || defaultUrl,
//   cache: new InMemoryCache(),
// });

export default class GraphQLUtils {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    // Declaring a separate singleton for ApolloClient does not have much sense because the client already uses a singleton internally.
    // Anyway, this is possible to implement and use it conditionally.
    // - For instance, to support multiple endpointUris, to use singleton in production but not in development to skip caching.
    const defaultUrl = "https://countries.trevorblades.com/";
    const endpointUri = process.env.endpointGraphqlCountries || defaultUrl;
    this.client = getApolloCLient(endpointUri);
    //this.client = apolloClient;
  }

  getApiKey = () => process.env.apiKeyGql || ""; // Get you API key or jwt auth token here

  getData = async (queryFilter: string, delay: number = 2000) => {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));

    const authToken = this.getApiKey();

    return this.client.query({
      query: gql` 
        query {
          countries${queryFilter} {
            name: awsRegion
            capital
            code
            continent {
              code
              name
            }
            currencies
            currency
            languages {
              code
              name
              native
            }
            phone
            phones
            states {
              code
              country {
                name
              }
              name
            }
          }
        }
      `,
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    });
  };
}
