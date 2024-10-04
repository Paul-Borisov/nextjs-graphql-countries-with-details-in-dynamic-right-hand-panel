import ContentContainer from "@/components/server/ContentContainer";
import ContentHeader from "@/components/server/ContentHeader";
import ContentHome from "@/components/server/ContentHome";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
//import { unstable_after } from "next/server";
// import Loading from "@/components/server/Loading";
// import { Suspense } from "react";

export const metadata: Metadata = {
  title: process.env.pagetitlehome,
  description: process.env.pagedescriptionhome,
};

// Uncomment the following line in case you want to use searchParams
export const dynamic = "force-dynamic"; // This works in layout.tsx as well as in page.tsx

// unstable_after(() => {
//   setInterval(() => {
//     console.log("unstable_after");
//     revalidatePath("/", "page");
//   }, 5000);
// });

export default async function Home() {
  // ({
  //   searchParams,
  // }: {
  //   searchParams: Record<string, string>;
  // }) {
  // console.log(searchParams);
  return (
    <>
      <main className="flex flex-col gap-5 justify-center items-center h-screen">
        <ContentContainer>
          <ContentHeader />
          {/* This is possible to place Suspense here, but it is more elegant to use loading.tsx instead */}
          {/* <Suspense
          fallback={
            <div className="max-w-[80vw] h-[50vh] overflow-y-auto whitespace-pre-wrap">
              <Loading />
            </div>
          }
        > */}
          <ContentHome />
          {/* </Suspense> */}
        </ContentContainer>
      </main>
      {/* {/true|1/i.test(process.env.showVerticalScrollbar || "") ? (
        <footer className="h-[200vh]" />
      ) : null} */}
    </>
  );
}
