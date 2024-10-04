import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  //ApolloProvider,
  gql,
} from "@apollo/client";
import IGraphQLQueryFilter from "@/shared/types/iGraphQLQueryFilter";

export default class GraphQLUtils {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    const defaulturl = "https://countries.trevorblades.com/";
    this.client = new ApolloClient({
      uri: process.env.endpointGraphqlCountries || defaulturl,
      cache: new InMemoryCache(),
    });
  }

  getQueryFilter = (filter?: IGraphQLQueryFilter) => {
    return filter
      ? `(filter: ${JSON.stringify(filter)
          .replace(/"/g, "")
          .replace(/'/g, '"')})`
      : "";
  };

  getData = async (queryFilter: string, delay: number = 2000) => {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));

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
    });
  };
}
