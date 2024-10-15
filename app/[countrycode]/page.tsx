import ContentContainer from "@/components/server/ContentContainer";
import ContentHomeCountry from "@/components/server/ContentHomeCountry";
import Link from "next/link";
import { pageMetadata } from "@/shared/constants/pageMetadata";

export const metadata = pageMetadata;
// This option must be used in pair with the same option in the upper page
//export const experimental_ppr = true;

export default async function CountryPage({
  params: { countrycode },
  returnUrl = "/",
}: {
  params: { countrycode: string };
  returnUrl: string;
}) {
  //await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <>
      <Link
        className="absolute underline top-5 left-5 font-semibold text-blue-500 hover:text-blue-700  dark:text-gray-400 dark:hover:text-white"
        href={returnUrl}
      >
        &laquo; Back to all countries
      </Link>
      <main className="flex flex-col gap-5 justify-center items-center h-screen -mt-5">
        <ContentContainer>
          <ContentHomeCountry countrycode={countrycode} returnUrl={returnUrl} />
        </ContentContainer>
      </main>
      {/true|1/i.test(process.env.showVerticalScrollbar || "") &&
      returnUrl === "/" ? (
        <footer className="h-[200vh]" />
      ) : null}
    </>
  );
}
