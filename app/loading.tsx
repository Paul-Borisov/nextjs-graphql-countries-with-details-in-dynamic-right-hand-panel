import ContentHeader from "@/components/server/ContentHeader";
import Loading from "@/components/server/Loading";
import Shimmer from "@/components/server/Shimmer";

export default async function HomePageLoading() {
  return (
    <article className="flex flex-col gap-5 justify-center items-center h-screen">
      <ContentHeader />
      <div className="max-w-[80vw] h-[50vh] overflow-hidden whitespace-pre-wrap">
        <Shimmer width="80vw" height="50vh" borderRadius="1em">
          <Loading
            content={`Loading data from ${process.env.endpointGraphqlCountries}`}
          />
        </Shimmer>
      </div>
    </article>
  );
}
