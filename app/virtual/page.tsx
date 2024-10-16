import ContentContainer from "@/components/server/ContentContainer";
import ContentHeader from "@/components/server/ContentHeader";
import { formatData } from "@/components/server/utils";
import GraphQLUtils from "@/shared/utils/graphQLUtils";
import IGraphQLQueryFilter from "@/shared/types/iGraphQLQueryFilter";
import InfiniteScrollWrapper from "@/components/client/InfiniteScroll";
import { pageMetadata } from "@/shared/constants/pageMetadata";
import Utils from "@/shared/utils/miscUtils";
import Link from "next/link";

export const metadata = pageMetadata;
// Using this option may result in unexpected problems like "429 - Too many requests" in REST APIs on scrolling of a page with sublinks.
// Also, this option must be used in pair with the same option enabled on the linked page (the sublevel page) to make it working.
//export const experimental_ppr = true;

export default async function VirtualHomePage() {
  const filter: IGraphQLQueryFilter | undefined = undefined;
  const gql = new GraphQLUtils();
  const data = await gql.getData(Utils.getQueryFilter(filter), 0);

  return (
    <>
      <nav className="absolute underline top-5 left-5 font-semibold text-blue-500 hover:text-blue-700  dark:text-gray-400 dark:hover:text-white">
        <Link href="/">&laquo; Back to static grid</Link>
      </nav>
      <main className="flex flex-col gap-5 justify-center items-center h-screen">
        <ContentContainer>
          <ContentHeader />
          <InfiniteScrollWrapper
            data={formatData(data, undefined, undefined, "/virtual") || []}
          />
        </ContentContainer>
      </main>
    </>
  );
}
