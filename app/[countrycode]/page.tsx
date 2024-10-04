import ContentContainer from "@/components/server/ContentContainer";
import ContentHomeCountry from "@/components/server/ContentHomeCountry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.pagetitlehome,
  description: process.env.pagedescriptionhome,
};

export default async function CountryCapital({
  params: { countrycode },
}: {
  params: { countrycode: string };
}) {
  return (
    <>
      <main className="flex flex-col gap-5 justify-center items-center h-screen">
        <ContentContainer>
          <ContentHomeCountry countrycode={countrycode} />
        </ContentContainer>
      </main>
      {/true|1/i.test(process.env.showVerticalScrollbar || "") ? (
        <footer className="h-[200vh]" />
      ) : null}
    </>
  );
}
