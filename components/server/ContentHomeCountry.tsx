import CountryUtils from "@/shared/utils/countryUtils";
import { Button, Tooltip } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { findFirstCountryName, formatData } from "./utils";
import GraphQLUtils from "@/shared/utils/graphQLUtils";
import IGraphQLQueryFilter from "@/shared/types/iGraphQLQueryFilter";
import Link from "next/link";
import Utils from "@/shared/utils/miscUtils";

// Using dynamic loading prevents SSR errors related to unavailable window object
const RightHandSidePanel = dynamic(
  () => import("@/components/client/RightHandSidePanel"),
  { ssr: false }
);

export default async function ContentHomeCountry({
  countrycode: countryCode,
}: {
  countrycode: string;
}) {
  const filter: IGraphQLQueryFilter = { code: { eq: `'${countryCode}'` } };

  const gql = new GraphQLUtils();
  const data = await gql.getData(Utils.getQueryFilter(filter), 0);
  const countries = formatData(data, true);
  let countryName = findFirstCountryName(data) ?? countryCode;

  if (countryName === countryCode) {
    const name = await CountryUtils.tryGetCountryNameByCountryCode(countryCode);
    if (name) countryName = name;
  }

  const hasData = !!countries?.length;

  return (
    <>
      <div className="grid gap-10 border rounded w-[30rem] h-[30rem] place-content-center pt-0 shadow-2xl">
        <div className="text-3xl font-semibold pt-5 text-center opacity-40">
          {countryName}
          {!hasData ? " not found" : ""}
        </div>
        <div className="flex justify-center">
          <section className="overflow-y-auto whitespace-pre-wrap break-words">
            {hasData && <ol>{countries}</ol>}
          </section>
        </div>
        <Link
          className="underline font-semibold text-blue-500 text-center"
          href="/"
        >
          &laquo; Back to all countries
        </Link>
        {hasData && (
          <RightHandSidePanel
            className="!absolute !top-0 right-0 !h-screen !rounded-none"
            title={countryName}
            description={"Information about this country"}
            disableLightClosing={/true|1/i.test(
              process.env.disableSidePanelLightClosing || ""
            )}
            controlToOpenDialog={
              <Button
                //className={[className ? className : undefined].join(" ").trim()}
                className="!w-32 !h-10 !font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded"
                //onClick={() => console.log("Details")}
              >
                <Tooltip content="Open details in a right-hand side panel">
                  <span>Details</span>
                </Tooltip>
              </Button>
            }
          >
            {countries}
          </RightHandSidePanel>
        )}
      </div>
    </>
  );
}
