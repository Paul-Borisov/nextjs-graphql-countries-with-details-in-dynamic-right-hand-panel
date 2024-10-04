export default interface IGraphQLQueryFilter {
  code?: { eq: string };
  currency?: {
    eq: "'EUR'" | "'USD'";
  };
}
