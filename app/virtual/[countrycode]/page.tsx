import CountryPage from "@/app/[countrycode]/page";
import { pageMetadata } from "@/shared/constants/pageMetadata";

export const metadata = pageMetadata;
// This option must be used in pair with the same option in the upper page
//export const experimental_ppr = true;

export default async function VirtualCountryPage({
  params: { countrycode },
}: {
  params: { countrycode: string };
}) {
  return <CountryPage params={{ countrycode }} returnUrl="/virtual" />;
}
