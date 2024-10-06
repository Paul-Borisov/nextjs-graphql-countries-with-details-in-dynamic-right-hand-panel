import CountryPage from "@/app/[countrycode]/page";
import { pageMetadata } from "@/shared/constants/pageMetadata";

export const metadata = pageMetadata;

export default async function VirtualCountryPage({
  params: { countrycode },
}: {
  params: { countrycode: string };
}) {
  return <CountryPage params={{ countrycode }} returnUrl="/virtual" />;
}
