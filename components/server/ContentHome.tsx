import { formatData } from "./utils";
import GraphQLUtils from "@/shared/utils/graphQLUtils";
import IGraphQLQueryFilter from "@/shared/types/iGraphQLQueryFilter";

export default async function ContentHome() {
  //const filter: IGraphQLQueryFilter = { currency: { eq: "'EUR'" } };
  const filter: IGraphQLQueryFilter | undefined = undefined;
  const gql = new GraphQLUtils();
  const data = await gql.getData(gql.getQueryFilter(filter), 0);

  return (
    <>
      <div className="text-3xl font-semibold fixed opacity-40">Countries</div>
      <section className="w-[80vw] h-[50vh] overflow-y-auto whitespace-pre-wrap break-words">
        <ol className="grid grid-cols-5 gap-5">
          {formatData(data, false, process.env.NODE_ENV === "production")}
          {/* {formatData(data, false, process.env.NODE_ENV === "development")} */}
        </ol>
      </section>
    </>
  );
}
