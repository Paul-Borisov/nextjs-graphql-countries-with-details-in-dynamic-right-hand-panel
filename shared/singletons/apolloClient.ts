import "server-only";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const singleton = (endpointUri: string) => {
  return new ApolloClient({
    uri: endpointUri,
    cache: new InMemoryCache(),
  });
};

declare const globalThis: {
  apolloClientGlobal: Record<string, ReturnType<typeof singleton>>;
} & typeof global;

const getApolloCLient = (endpointUri: string) => {
  globalThis.apolloClientGlobal = globalThis.apolloClientGlobal || {};
  let client = globalThis.apolloClientGlobal[endpointUri];
  //if (!client || process.env.NODE_ENV !== "production") {
  if (!client) {
    client = singleton(endpointUri);
    globalThis.apolloClientGlobal[endpointUri] = client;
  }
  return client;
};

export default getApolloCLient;
